import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import {
  isEmailAllowlisted,
  normalizeEmail,
  ROOT_ADMIN_EMAIL,
  requireAdminUser,
} from "./adminGuard";
import { authComponent } from "./auth";

export const getAllowedSignupEmails = query({
  args: {},
  handler: async (ctx) => {
    const records = await (async () => {
      try {
        return await ctx.db.query("adminUsers").collect();
      } catch {
        return [];
      }
    })();
    const emails = new Set<string>([ROOT_ADMIN_EMAIL]);
    for (const record of records) {
      emails.add(record.email);
    }
    return Array.from(emails).sort();
  },
});

export const isCurrentUserAllowed = query({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!(user && user.email)) {
      return {
        allowed: false,
        email: null,
      };
    }

    const normalizedEmail = normalizeEmail(user.email);
    const allowlisted = await isEmailAllowlisted(ctx, normalizedEmail);

    return {
      allowed: allowlisted,
      email: normalizedEmail,
    };
  },
});

export const listAllowedAdmins = query({
  args: {},
  handler: async (ctx) => {
    await requireAdminUser(ctx);

    const records = await (async () => {
      try {
        return await ctx.db.query("adminUsers").collect();
      } catch {
        return [];
      }
    })();
    const emails = new Set<string>([ROOT_ADMIN_EMAIL]);
    for (const record of records) {
      emails.add(record.email);
    }

    return Array.from(emails)
      .sort()
      .map((email) => ({
        email,
        isRoot: email === ROOT_ADMIN_EMAIL,
      }));
  },
});

export const addAllowedAdmin = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const requesterEmail = await requireAdminUser(ctx);

    const normalizedEmail = normalizeEmail(args.email);
    if (!(normalizedEmail.includes("@") && normalizedEmail.includes("."))) {
      throw new Error("Please provide a valid email address.");
    }

    if (normalizedEmail === ROOT_ADMIN_EMAIL) {
      return { created: false };
    }

    const existing = await ctx.db
      .query("adminUsers")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .first();

    if (existing) {
      return { created: false };
    }

    await ctx.db.insert("adminUsers", {
      email: normalizedEmail,
      createdAt: Date.now(),
      createdByEmail: requesterEmail,
    });

    return { created: true };
  },
});

export const removeAllowedAdmin = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAdminUser(ctx);

    const normalizedEmail = normalizeEmail(args.email);
    if (normalizedEmail === ROOT_ADMIN_EMAIL) {
      throw new Error("The root admin account cannot be removed.");
    }

    const existing = await ctx.db
      .query("adminUsers")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .first();

    if (!existing) {
      return { removed: false };
    }

    await ctx.db.delete(existing._id);
    return { removed: true };
  },
});
