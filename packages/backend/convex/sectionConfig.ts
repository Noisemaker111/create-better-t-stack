import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ============ QUERIES ============

/**
 * Get configuration for a specific section
 */
export const getSectionConfig = query({
  args: { sectionId: v.string() },
  handler: async (ctx, args) => {
    const config = await ctx.db
      .query("sectionConfigs")
      .withIndex("by_sectionId")
      .filter((q) => q.eq(q.field("sectionId"), args.sectionId))
      .first();
    return config;
  },
});

/**
 * Get all section configurations
 */
export const getAllSectionConfigs = query({
  args: {},
  handler: async (ctx) => {
    const configs = await ctx.db.query("sectionConfigs").collect();
    return configs;
  },
});

/**
 * Get all visible images across sections (for gallery-style display)
 */
export const getAllVisibleSectionImages = query({
  args: {},
  handler: async (ctx) => {
    const configs = await ctx.db
      .query("sectionConfigs")
      .filter((q) => q.eq(q.field("isVisible"), true))
      .collect();
    return configs.filter((c) => c.imageSrc);
  },
});

// ============ MUTATIONS ============

/**
 * Upsert section configuration (create or update)
 */
export const upsertSectionConfig = mutation({
  args: {
    sectionId: v.string(),
    imageSrc: v.optional(v.string()),
    imageAlt: v.optional(v.string()),
    positionX: v.optional(v.number()),
    positionY: v.optional(v.number()),
    scale: v.optional(v.number()),
    isVisible: v.optional(v.boolean()),
    customContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Check if config exists
    const existing = await ctx.db
      .query("sectionConfigs")
      .withIndex("by_sectionId")
      .filter((q) => q.eq(q.field("sectionId"), args.sectionId))
      .first();

    if (existing) {
      // Update existing
      await ctx.db.patch(existing._id, {
        ...args,
        updatedAt: now,
      });
      return existing._id;
    }
    // Create new
    const id = await ctx.db.insert("sectionConfigs", {
      ...args,
      isVisible: args.isVisible ?? true,
      createdAt: now,
      updatedAt: now,
    });
    return id;
  },
});

/**
 * Update image position (for drag operations)
 */
export const updateImagePosition = mutation({
  args: {
    sectionId: v.string(),
    positionX: v.number(),
    positionY: v.number(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    const existing = await ctx.db
      .query("sectionConfigs")
      .withIndex("by_sectionId")
      .filter((q) => q.eq(q.field("sectionId"), args.sectionId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        positionX: args.positionX,
        positionY: args.positionY,
        updatedAt: now,
      });
      return existing._id;
    }
    // Create new with position
    const id = await ctx.db.insert("sectionConfigs", {
      sectionId: args.sectionId,
      positionX: args.positionX,
      positionY: args.positionY,
      isVisible: true,
      createdAt: now,
      updatedAt: now,
    });
    return id;
  },
});

/**
 * Update image scale/zoom
 */
export const updateImageScale = mutation({
  args: {
    sectionId: v.string(),
    scale: v.number(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    const existing = await ctx.db
      .query("sectionConfigs")
      .withIndex("by_sectionId")
      .filter((q) => q.eq(q.field("sectionId"), args.sectionId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        scale: args.scale,
        updatedAt: now,
      });
      return existing._id;
    }
    const id = await ctx.db.insert("sectionConfigs", {
      sectionId: args.sectionId,
      scale: args.scale,
      isVisible: true,
      createdAt: now,
      updatedAt: now,
    });
    return id;
  },
});

/**
 * Delete section configuration
 */
export const deleteSectionConfig = mutation({
  args: { sectionId: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("sectionConfigs")
      .withIndex("by_sectionId")
      .filter((q) => q.eq(q.field("sectionId"), args.sectionId))
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
    }
  },
});

/**
 * Initialize default section configurations
 */
export const initializeDefaultSections = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const defaultSections = [
      {
        sectionId: "hero",
        imageSrc: "/images/hero-bg.jpeg",
        imageAlt: "Gutter Installation",
        positionX: 50,
        positionY: 50,
        scale: 100,
        isVisible: true,
      },
      {
        sectionId: "services-installation",
        imageSrc: "/images/gallery/013.jpg",
        imageAlt: "Gutter Installation Service",
        positionX: 50,
        positionY: 50,
        scale: 100,
        isVisible: true,
      },
      {
        sectionId: "services-guards",
        imageSrc: "/images/gallery/049.jpg",
        imageAlt: "Leaf Guard Service",
        positionX: 50,
        positionY: 50,
        scale: 100,
        isVisible: true,
      },
      {
        sectionId: "services-repair",
        imageSrc: "/images/gallery/005.jpg",
        imageAlt: "Gutter Repair Service",
        positionX: 50,
        positionY: 50,
        scale: 100,
        isVisible: true,
      },
      {
        sectionId: "services-soffit",
        imageSrc: "/images/gallery/032.jpg",
        imageAlt: "Soffit and Fascia Service",
        positionX: 50,
        positionY: 50,
        scale: 100,
        isVisible: true,
      },
      {
        sectionId: "services-commercial",
        imageSrc: "/images/gallery/072.jpg",
        imageAlt: "Commercial Gutter Service",
        positionX: 50,
        positionY: 50,
        scale: 100,
        isVisible: true,
      },
      {
        sectionId: "services-cleaning",
        imageSrc: "/images/gallery/001.jpg",
        imageAlt: "Gutter Cleaning Service",
        positionX: 50,
        positionY: 50,
        scale: 100,
        isVisible: true,
      },
    ];

    for (const section of defaultSections) {
      const existing = await ctx.db
        .query("sectionConfigs")
        .withIndex("by_sectionId")
        .filter((q) => q.eq(q.field("sectionId"), section.sectionId))
        .first();

      if (existing) {
        await ctx.db.patch(existing._id, {
          ...section,
          updatedAt: now,
        });
      } else {
        await ctx.db.insert("sectionConfigs", {
          ...section,
          createdAt: now,
          updatedAt: now,
        });
      }
    }

    return defaultSections.length;
  },
});
