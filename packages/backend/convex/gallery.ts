import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ============ QUERIES ============

/**
 * Get all gallery items ordered by sortOrder
 */
export const getAllGalleryItems = query({
  args: {},
  handler: async (ctx) => {
    const items = await ctx.db
      .query("galleryItems")
      .withIndex("by_sortOrder")
      .collect();
    return items;
  },
});

/**
 * Get gallery items by category, ordered by sortOrder
 */
export const getGalleryItemsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("galleryItems")
      .withIndex("by_category_and_order")
      .filter((q) => q.eq(q.field("category"), args.category))
      .collect();
    return items;
  },
});

/**
 * Get all visible gallery items (for public gallery)
 */
export const getVisibleGalleryItems = query({
  args: {},
  handler: async (ctx) => {
    const items = await ctx.db
      .query("galleryItems")
      .filter((q) => q.eq(q.field("isVisible"), true))
      .collect();
    // Sort by sortOrder
    return items.sort((a, b) => a.sortOrder - b.sortOrder);
  },
});

/**
 * Get visible gallery items by category
 */
export const getVisibleGalleryItemsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("galleryItems")
      .filter((q) =>
        q.and(
          q.eq(q.field("category"), args.category),
          q.eq(q.field("isVisible"), true)
        )
      )
      .collect();
    // Sort by sortOrder
    return items.sort((a, b) => a.sortOrder - b.sortOrder);
  },
});

// ============ MUTATIONS ============

/**
 * Create a new gallery item
 */
export const createGalleryItem = mutation({
  args: {
    src: v.string(),
    category: v.string(),
    title: v.string(),
    location: v.string(),
    description: v.string(),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Get the maximum sortOrder to append to end
    let sortOrder = args.sortOrder;
    if (sortOrder === undefined) {
      const allItems = await ctx.db.query("galleryItems").collect();
      const maxOrder = allItems.reduce(
        (max, item) => Math.max(max, item.sortOrder),
        -1
      );
      sortOrder = maxOrder + 1;
    }

    const id = await ctx.db.insert("galleryItems", {
      src: args.src,
      category: args.category,
      title: args.title,
      location: args.location,
      description: args.description,
      sortOrder,
      isVisible: true,
      createdAt: now,
      updatedAt: now,
    });

    return id;
  },
});

/**
 * Update a gallery item
 */
export const updateGalleryItem = mutation({
  args: {
    id: v.id("galleryItems"),
    src: v.optional(v.string()),
    category: v.optional(v.string()),
    title: v.optional(v.string()),
    location: v.optional(v.string()),
    description: v.optional(v.string()),
    isVisible: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const now = Date.now();

    await ctx.db.patch(id, {
      ...updates,
      updatedAt: now,
    });

    return id;
  },
});

/**
 * Delete a gallery item
 */
export const deleteGalleryItem = mutation({
  args: { id: v.id("galleryItems") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

/**
 * Reorder gallery items - moves an item to a new position
 * @param itemId - The ID of the item to move
 * @param newSortOrder - The new sortOrder value
 */
export const reorderGalleryItem = mutation({
  args: {
    itemId: v.id("galleryItems"),
    newSortOrder: v.number(),
  },
  handler: async (ctx, args) => {
    const { itemId, newSortOrder } = args;

    // Get the item being moved
    const item = await ctx.db.get(itemId);
    if (!item) {
      throw new Error("Item not found");
    }

    const oldSortOrder = item.sortOrder;

    if (oldSortOrder === newSortOrder) {
      // No change needed
      return;
    }

    if (newSortOrder > oldSortOrder) {
      // Moving down - shift items between old and new position up
      const itemsToShift = await ctx.db
        .query("galleryItems")
        .filter((q) =>
          q.and(
            q.gt(q.field("sortOrder"), oldSortOrder),
            q.lte(q.field("sortOrder"), newSortOrder)
          )
        )
        .collect();

      for (const itemToShift of itemsToShift) {
        await ctx.db.patch(itemToShift._id, {
          sortOrder: itemToShift.sortOrder - 1,
          updatedAt: Date.now(),
        });
      }
    } else {
      // Moving up - shift items between new and old position down
      const itemsToShift = await ctx.db
        .query("galleryItems")
        .filter((q) =>
          q.and(
            q.gte(q.field("sortOrder"), newSortOrder),
            q.lt(q.field("sortOrder"), oldSortOrder)
          )
        )
        .collect();

      for (const itemToShift of itemsToShift) {
        await ctx.db.patch(itemToShift._id, {
          sortOrder: itemToShift.sortOrder + 1,
          updatedAt: Date.now(),
        });
      }
    }

    // Update the moved item
    await ctx.db.patch(itemId, {
      sortOrder: newSortOrder,
      updatedAt: Date.now(),
    });
  },
});

/**
 * Batch reorder multiple items at once (for drag-drop final state)
 * @param items - Array of { id, sortOrder } pairs
 */
export const batchReorderGalleryItems = mutation({
  args: {
    items: v.array(
      v.object({
        id: v.id("galleryItems"),
        sortOrder: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    for (const item of args.items) {
      await ctx.db.patch(item.id, {
        sortOrder: item.sortOrder,
        updatedAt: now,
      });
    }
  },
});

/**
 * Initialize gallery with existing static data (one-time migration)
 */
export const initializeGalleryFromStatic = mutation({
  args: {
    items: v.array(
      v.object({
        src: v.string(),
        category: v.string(),
        title: v.string(),
        location: v.string(),
        description: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Delete existing items
    const existing = await ctx.db.query("galleryItems").collect();
    for (const item of existing) {
      await ctx.db.delete(item._id);
    }

    // Insert new items with initial sortOrder based on array index
    for (const [index, item] of args.items.entries()) {
      await ctx.db.insert("galleryItems", {
        ...item,
        sortOrder: index,
        isVisible: true,
        createdAt: now,
        updatedAt: now,
      });
    }
  },
});
