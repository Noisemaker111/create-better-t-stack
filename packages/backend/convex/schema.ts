import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Form submissions (using form-to-inbox pattern)
  formSubmissions: defineTable({
    // Form identification
    formType: v.string(),

    // Contact info
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),

    // Location
    address: v.optional(v.string()),
    city: v.optional(v.string()),

    // Form-specific data
    subject: v.optional(v.string()),
    message: v.optional(v.string()),

    // Custom fields (key-value pairs for flexibility)
    customFields: v.optional(
      v.array(
        v.object({
          key: v.string(),
          value: v.string(),
        })
      )
    ),

    // Email config (stored for reference)
    to: v.string(),
    from: v.string(),

    // Metadata
    status: v.string(),
    createdAt: v.number(),
    notes: v.optional(v.string()),
  })
    .index("by_formType", ["formType"])
    .index("by_status", ["status"])
    .index("by_createdAt", ["createdAt"]),

  // Gallery items for CMS-managed gallery
  galleryItems: defineTable({
    // Image reference (path relative to public folder)
    src: v.string(),
    category: v.string(),

    // Metadata
    title: v.string(),
    location: v.string(),
    description: v.string(),

    // Ordering (lower = appears first)
    sortOrder: v.number(),

    // Visibility
    isVisible: v.boolean(),

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_sortOrder", ["sortOrder"])
    .index("by_category_and_order", ["category", "sortOrder"]),

  // Page section configurations (for visual editing)
  sectionConfigs: defineTable({
    // Section identifier (e.g., "hero", "services", "project-showcase")
    sectionId: v.string(),

    // Image configuration
    imageSrc: v.optional(v.string()),
    imageAlt: v.optional(v.string()),

    // Image positioning (percentage 0-100)
    positionX: v.optional(v.number()),
    positionY: v.optional(v.number()),
    scale: v.optional(v.number()),

    // Visibility
    isVisible: v.optional(v.boolean()),

    // Custom content (JSON for flexible section-specific data)
    customContent: v.optional(v.string()),

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_sectionId", ["sectionId"]),

  // Admin allowlist for CMS access
  adminUsers: defineTable({
    email: v.string(),
    createdAt: v.number(),
    createdByEmail: v.string(),
  }).index("by_email", ["email"]),
});
