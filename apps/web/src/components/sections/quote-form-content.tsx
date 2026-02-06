import { api } from "@btgwebsite-new/backend/convex/_generated/api";
import { env } from "@btgwebsite-new/env/web";
import { AddressAutocompleteInput } from "@noisemakerjon/react-address-autocomplete";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "convex/react";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import {
  createFormAnalyticsState,
  type FormAnalyticsState,
  trackAddressSelected,
  trackFieldComplete,
  trackFieldError,
  trackFieldFocus,
  trackFormError,
  trackFormStart,
  trackQuoteConversion,
} from "@/lib/analytics";
import { extractPhoneDigits, formatPhoneNumber } from "@/lib/form-validation";

// Field-level schemas for validation
const nameSchema = z
  .string()
  .min(1, "Name is required")
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name is too long")
  .refine((val) => !/\d/.test(val), {
    message: "Name should not contain numbers",
  });

const phoneSchema = z
  .string()
  .min(1, "Phone number is required")
  .refine((val) => extractPhoneDigits(val).length === 10, {
    message: "Please enter a valid 10-digit phone number",
  });

const addressSchema = z.string().max(500, "Address is too long");

const messageSchema = z.string().max(2000, "Message is too long");

// Form schema
const quoteFormSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  address: addressSchema,
  city: z.string(),
  description: messageSchema,
});

// Helper to extract error message from Standard Schema error
function getErrorMessage(error: unknown): string {
  if (typeof error === "string") {
    return error;
  }
  if (error && typeof error === "object" && "message" in error) {
    return String((error as { message: unknown }).message);
  }
  return String(error);
}

export default function QuoteFormContent() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submitForm = useMutation(api.forms.submitForm);

  // Analytics state to track form interactions
  const [analyticsState, setAnalyticsState] = useState<FormAnalyticsState>(
    createFormAnalyticsState
  );

  // Track form start on first field focus
  const handleFieldFocus = (fieldName: string) => {
    if (!analyticsState.hasStarted) {
      trackFormStart("quote_form", "homepage");
      setAnalyticsState((prev) => ({ ...prev, hasStarted: true }));
    }
    if (!analyticsState.focusedFields.has(fieldName)) {
      trackFieldFocus({ field: fieldName, form: "quote_form" });
      setAnalyticsState((prev) => ({
        ...prev,
        focusedFields: new Set(prev.focusedFields).add(fieldName),
      }));
    }
  };

  // Track field completion on blur with value
  const handleFieldBlur = (fieldName: string, value: string) => {
    if (value?.trim() && !analyticsState.completedFields.has(fieldName)) {
      trackFieldComplete({ field: fieldName, form: "quote_form", value });
      setAnalyticsState((prev) => ({
        ...prev,
        completedFields: new Set(prev.completedFields).add(fieldName),
      }));
    }
  };

  // Track validation errors
  const handleFieldError = (fieldName: string, errorMsg: string) => {
    trackFieldError({ field: fieldName, form: "quote_form", error: errorMsg });
  };

  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      city: "",
      description: "",
    },
    validators: {
      onSubmit: quoteFormSchema,
    },
    onSubmit: async ({ value }) => {
      setError(null);
      try {
        await submitForm({
          formType: "Quote",
          name: value.name.trim(),
          phone: value.phone,
          address: value.address.trim() || undefined,
          city: value.city.trim() || undefined,
          message: value.description.trim() || undefined,
          to: "btggutters@gmail.com",
          from: "noreply@btggutters.com",
        });

        // Track successful conversion with detailed info
        trackQuoteConversion({
          form: "quote_form",
          has_address: Boolean(value.address?.trim()),
          has_description: Boolean(value.description?.trim()),
          city: value.city?.trim() || undefined,
          source: "homepage",
        });

        setIsSubmitted(true);
      } catch {
        console.error("Failed to submit quote request");
        trackFormError("quote_form", "submission_failed");
        setError("Failed to submit. Please try again or call us directly.");
      }
    },
  });

  return (
    <div className="relative">
      <div
        aria-hidden={isSubmitted}
        className={`transition-opacity duration-300 ${isSubmitted ? "pointer-events-none opacity-0" : "opacity-100"}`}
      >
        <div className="mb-4">
          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 text-sm">
              {error}
            </div>
          ) : null}
        </div>
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field
            children={(field) => (
              <div>
                <label
                  className="mb-0.5 block font-medium text-gray-700 text-sm"
                  htmlFor={field.name}
                >
                  Your Name *
                </label>
                <input
                  className={`w-full rounded-lg border px-4 py-2 text-gray-900 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
                    field.state.meta.errors.length > 0
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  id={field.name}
                  name={field.name}
                  onBlur={() => {
                    field.handleBlur();
                    handleFieldBlur("name", field.state.value);
                    if (field.state.meta.errors.length > 0) {
                      handleFieldError(
                        "name",
                        getErrorMessage(field.state.meta.errors[0])
                      );
                    }
                  }}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onFocus={() => handleFieldFocus("name")}
                  placeholder="Your Name Here"
                  required
                  type="text"
                  value={field.state.value}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="mt-0.5 text-red-600 text-sm">
                    {getErrorMessage(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            )}
            name="name"
            validators={{
              onBlur: nameSchema,
            }}
          />

          <form.Field
            children={(field) => (
              <div>
                <label
                  className="mb-0.5 block font-medium text-gray-700 text-sm"
                  htmlFor={field.name}
                >
                  Phone Number *
                </label>
                <input
                  className={`w-full rounded-lg border px-4 py-2 text-gray-900 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
                    field.state.meta.errors.length > 0
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  id={field.name}
                  name={field.name}
                  onBlur={() => {
                    field.handleBlur();
                    handleFieldBlur("phone", field.state.value);
                    if (field.state.meta.errors.length > 0) {
                      handleFieldError(
                        "phone",
                        getErrorMessage(field.state.meta.errors[0])
                      );
                    }
                  }}
                  onChange={(e) => {
                    const formatted = formatPhoneNumber(e.target.value);
                    field.handleChange(formatted);
                  }}
                  onFocus={() => handleFieldFocus("phone")}
                  placeholder="(248) 555-1234"
                  required
                  type="tel"
                  value={field.state.value}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="mt-0.5 text-red-600 text-sm">
                    {getErrorMessage(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            )}
            name="phone"
            validators={{
              onBlur: phoneSchema,
            }}
          />

          <form.Field
            children={(field) => (
              <div>
                <label
                  className="mb-0.5 block font-medium text-gray-700 text-sm"
                  htmlFor={field.name}
                >
                  Address
                </label>
                <AddressAutocompleteInput
                  apiKey={env.VITE_GOOGLE_MAPS_API_KEY}
                  className={
                    field.state.meta.errors.length > 0
                      ? "border-red-300 bg-red-50"
                      : ""
                  }
                  id={field.name}
                  name={field.name}
                  onBlur={() => {
                    field.handleBlur();
                    handleFieldBlur("address", field.state.value);
                  }}
                  onChange={(val) => {
                    field.handleChange(val);
                    // Track when address is selected from autocomplete
                    if (val?.includes(",")) {
                      trackAddressSelected(
                        "quote_form",
                        form.getFieldValue("city")
                      );
                    }
                  }}
                  onFocus={() => handleFieldFocus("address")}
                  placeholder="Start typing your address..."
                  value={field.state.value}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="mt-0.5 text-red-600 text-sm">
                    {getErrorMessage(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            )}
            name="address"
          />

          {/* Hidden city field */}
          <form.Field children={() => null} name="city" />

          <form.Field
            children={(field) => (
              <div>
                <label
                  className="mb-0.5 block font-medium text-gray-700 text-sm"
                  htmlFor={field.name}
                >
                  Description (Optional)
                </label>
                <textarea
                  className={`w-full resize-none rounded-lg border px-4 py-2 text-gray-900 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
                    field.state.meta.errors.length > 0
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  id={field.name}
                  name={field.name}
                  onBlur={() => {
                    field.handleBlur();
                    handleFieldBlur("description", field.state.value);
                  }}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onFocus={() => handleFieldFocus("description")}
                  placeholder="Tell us about your project..."
                  rows={3}
                  value={field.state.value}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="mt-0.5 text-red-600 text-sm">
                    {getErrorMessage(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            )}
            name="description"
            validators={{
              onBlur: messageSchema,
            }}
          />

          <form.Subscribe
            children={([canSubmit, isSubmitting]) => (
              <button
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1eeb00] px-8 py-3 font-bold text-black text-lg shadow-md transition-all hover:bg-[#19c600] hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                disabled={!canSubmit || isSubmitting}
                type="submit"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Get My Free Quote
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            )}
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          />
          <p className="text-center font-semibold text-[10px] text-gray-400 uppercase tracking-widest">
            Free, no-obligation estimate
          </p>
          <p className="mt-2 text-center text-[10px] text-gray-400">
            By submitting, you agree BTG Gutters may contact you by call or text
            about your project. Text messaging is welcome.
          </p>
        </form>
      </div>
      <div
        aria-hidden={!isSubmitted}
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isSubmitted ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="py-8 text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
          <h3 className="font-bold text-gray-900 text-xl">Thank You!</h3>
          <p className="mt-2 text-gray-600">
            We will follow up soon about your project.
          </p>
        </div>
      </div>
    </div>
  );
}
