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
});
