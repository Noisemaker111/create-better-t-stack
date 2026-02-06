import type { MutationCtx, QueryCtx } from "./_generated/server";
import { authComponent } from "./auth";

export const ROOT_ADMIN_EMAIL = "btggutters@gmail.com";

export const normalizeEmail = (email: string) => email.trim().toLowerCase();

type AdminCtx = QueryCtx | MutationCtx;

export const isEmailAllowlisted = async (ctx: AdminCtx, email: string) => {
  const normalized = normalizeEmail(email);
  if (normalized === ROOT_ADMIN_EMAIL) {
    return true;
  }

  try {
    const existing = await ctx.db
      .query("adminUsers")
      .withIndex("by_email", (q) => q.eq("email", normalized))
      .first();

    return Boolean(existing);
  } catch {
    return false;
  }
};

export const requireAdminUser = async (ctx: AdminCtx) => {
  const user = await authComponent.safeGetAuthUser(ctx);
  if (!(user && user.email)) {
    throw new Error("You must be signed in.");
  }

  const allowed = await isEmailAllowlisted(ctx, user.email);
  if (!allowed) {
    throw new Error("You are not allowed to perform this action.");
  }

  return normalizeEmail(user.email);
};
