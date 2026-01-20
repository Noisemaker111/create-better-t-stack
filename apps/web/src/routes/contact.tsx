import { api } from "@btgwebsite-new/backend/convex/_generated/api";
import { env } from "@btgwebsite-new/env/web";
import { AddressAutocompleteInput } from "@noisemakerjon/react-address-autocomplete";
import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "convex/react";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Facebook,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import {
  createFormAnalyticsState,
  type FormAnalyticsState,
  trackAddressSelected,
  trackContactConversion,
  trackEmailClick,
  trackFieldComplete,
  trackFieldError,
  trackFieldFocus,
  trackFormError,
  trackFormStart,
  trackMapsClick,
  trackPhoneClick,
  trackSocialClick,
} from "@/lib/analytics";
import { extractPhoneDigits, formatPhoneNumber } from "@/lib/form-validation";

const PHONE_NUMBER = "(248) 561-7790";
const PHONE_LINK = "tel:+12485617790";
const EMAIL = "btggutters@gmail.com";
const EMAIL_LINK = "mailto:btggutters@gmail.com";
const GOOGLE_MAPS_LINK = "https://goo.gl/maps/rrgMHbdWMzNdDjvk9";
const FACEBOOK_LINK = "https://www.facebook.com/BTGgutters/";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      {
        title: "Contact BTG Gutters | Free Estimate in Garden City, MI",
      },
      {
        name: "description",
        content:
          "Contact BTG Gutters for professional gutter services in Garden City, MI. Call (248) 561-7790 for free estimates on gutter installation, repair, and leaf guards.",
      },
      {
        name: "keywords",
        content:
          "contact gutter company, free gutter estimate, gutter services Garden City MI, call BTG Gutters",
      },
      {
        property: "og:title",
        content: "Contact BTG Gutters | Free Estimate in Garden City, MI",
      },
      {
        property: "og:description",
        content:
          "Get your free gutter estimate today! Family-owned gutter company serving Southeast Michigan with 22+ years experience.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "Contact BTG Gutters | Free Estimate in Garden City, MI",
      },
      {
        name: "twitter:description",
        content:
          "Get your free gutter estimate today! Call (248) 561-7790 for professional gutter services.",
      },
    ],
  }),
});

const services = [
  "Gutter Installation & Replacement",
  "Gutter Repair",
  "Leaf Guards & Gutter Guards",
  "Soffit & Fascia Repairs",
  "Commercial Gutters",
  "Gutter Cleaning",
  "Not Sure - Need Consultation",
];

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

const emailSchema = z
  .string()
  .refine(
    (val) => val.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    { message: "Please enter a valid email address" }
  );

const addressSchema = z.string().max(500, "Address is too long");

const messageSchema = z
  .string()
  .min(1, "Message is required")
  .min(10, "Please provide more detail (at least 10 characters)")
  .max(2000, "Message is too long");

// Form schema
const contactFormSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  email: emailSchema,
  address: addressSchema,
  city: z.string(),
  service: z.string(),
  message: messageSchema,
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

function ContactPage() {
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
      trackFormStart("contact_form", "contact_page");
      setAnalyticsState((prev) => ({ ...prev, hasStarted: true }));
    }
    if (!analyticsState.focusedFields.has(fieldName)) {
      trackFieldFocus({ field: fieldName, form: "contact_form" });
      setAnalyticsState((prev) => ({
        ...prev,
        focusedFields: new Set(prev.focusedFields).add(fieldName),
      }));
    }
  };

  // Track field completion on blur with value
  const handleFieldBlur = (fieldName: string, value: string) => {
    if (value?.trim() && !analyticsState.completedFields.has(fieldName)) {
      trackFieldComplete({ field: fieldName, form: "contact_form", value });
      setAnalyticsState((prev) => ({
        ...prev,
        completedFields: new Set(prev.completedFields).add(fieldName),
      }));
    }
  };

  // Track validation errors
  const handleFieldError = (fieldName: string, errorMsg: string) => {
    trackFieldError({
      field: fieldName,
      form: "contact_form",
      error: errorMsg,
    });
  };

  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      service: "",
      message: "",
    },
    validators: {
      onSubmit: contactFormSchema,
    },
    onSubmit: async ({ value }) => {
      setError(null);
      try {
        await submitForm({
          formType: "Contact",
          name: value.name.trim(),
          phone: value.phone,
          email: value.email.trim() || undefined,
          address: value.address.trim() || undefined,
          city: value.city.trim() || undefined,
          message: value.message.trim(),
          customFields: value.service
            ? [{ key: "Service", value: value.service }]
            : undefined,
          to: "btggutters@gmail.com",
          from: "noreply@btggutters.com",
        });

        // Track successful contact form conversion
        trackContactConversion({
          has_email: Boolean(value.email?.trim()),
          has_address: Boolean(value.address?.trim()),
          service_selected: value.service || undefined,
        });

        setIsSubmitted(true);
      } catch {
        console.error("Failed to submit contact message");
        trackFormError("contact_form", "submission_failed");
        setError(
          "Failed to send message. Please try again or call us directly."
        );
      }
    },
  });

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-800 via-green-900 to-green-950 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center text-white">
            <span className="mb-4 inline-block rounded-full bg-green-700 px-4 py-1 font-medium text-sm">
              Contact Us
            </span>
            <h1 className="mb-6 font-bold text-4xl md:text-5xl">
              Get in Touch
            </h1>
            <p className="text-green-100 text-xl">
              Have questions or ready for a free estimate? We're here to help.
              Reach out to us by phone, email, or fill out the form below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <div>
              <h2 className="mb-6 font-bold text-2xl text-gray-900 md:text-3xl">
                Contact Information
              </h2>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-100">
                    <Phone className="h-6 w-6 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <a
                      className="text-green-700 text-lg hover:text-green-800"
                      href={PHONE_LINK}
                      onClick={() => trackPhoneClick("contact_page")}
                    >
                      {PHONE_NUMBER}
                    </a>
                    <p className="text-gray-600 text-sm">
                      Call or text anytime
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-100">
                    <Mail className="h-6 w-6 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <a
                      className="text-green-700 text-lg hover:text-green-800"
                      href={EMAIL_LINK}
                      onClick={() => trackEmailClick("contact_page")}
                    >
                      {EMAIL}
                    </a>
                    <p className="text-gray-600 text-sm">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-100">
                    <MapPin className="h-6 w-6 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Location</h3>
                    <a
                      className="text-green-700 text-lg hover:text-green-800"
                      href={GOOGLE_MAPS_LINK}
                      onClick={() => trackMapsClick("contact_page")}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Garden City, MI 48135
                    </a>
                    <p className="text-gray-600 text-sm">
                      Serving all of Southeast Michigan
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-100">
                    <Clock className="h-6 w-6 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Business Hours
                    </h3>
                    <div className="text-gray-700">
                      <p>Monday - Friday: 8:00 AM - 9:00 PM</p>
                      <p>Saturday - Sunday: 9:00 AM - 8:00 PM</p>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Emergency services available
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className="mb-4 font-semibold text-gray-900">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    aria-label="Facebook"
                    className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white transition-colors hover:bg-blue-700"
                    href={FACEBOOK_LINK}
                    onClick={() => trackSocialClick("facebook")}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a
                    aria-label="Google Maps"
                    className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500 text-white transition-colors hover:bg-red-600"
                    href={GOOGLE_MAPS_LINK}
                    onClick={() => trackSocialClick("google_maps")}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <MapPin className="h-6 w-6" />
                  </a>
                </div>
              </div>

              {/* Map */}
              <div className="mt-8 overflow-hidden rounded-xl">
                <iframe
                  allowFullScreen
                  height="300"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d94577.32884968925!2d-83.41716892089844!3d42.32534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883b4e9d12b9b28d%3A0x4ebae67e10b24803!2sGarden%20City%2C%20MI%2048135!5e0!3m2!1sen!2sus!4v1234567890"
                  style={{ border: 0 }}
                  title="BTG Gutters Location"
                  width="100%"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg md:p-8">
                <h2 className="mb-6 font-bold text-2xl text-gray-900">
                  Send Us a Message
                </h2>

                {isSubmitted ? (
                  <div className="py-12 text-center">
                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="mb-2 font-bold text-gray-900 text-xl">
                      Message Sent!
                    </h3>
                    <p className="text-gray-600">
                      We'll get back to you within 24 hours. For immediate
                      assistance, call us at{" "}
                      <a
                        className="font-semibold text-green-700"
                        href={PHONE_LINK}
                      >
                        {PHONE_NUMBER}
                      </a>
                    </p>
                  </div>
                ) : (
                  <>
                    {error && (
                      <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 text-sm">
                        {error}
                      </div>
                    )}
                    <form
                      className="space-y-5"
                      onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                      }}
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <form.Field
                          children={(field) => (
                            <div>
                              <label
                                className="mb-1 block font-medium text-gray-700 text-sm"
                                htmlFor={field.name}
                              >
                                Your Name *
                              </label>
                              <input
                                className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
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
                                      getErrorMessage(
                                        field.state.meta.errors[0]
                                      )
                                    );
                                  }
                                }}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                onFocus={() => handleFieldFocus("name")}
                                placeholder="John Smith"
                                required
                                type="text"
                                value={field.state.value}
                              />
                              {field.state.meta.errors.length > 0 && (
                                <p className="mt-1 text-red-600 text-sm">
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
                                className="mb-1 block font-medium text-gray-700 text-sm"
                                htmlFor={field.name}
                              >
                                Phone Number *
                              </label>
                              <input
                                className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
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
                                      getErrorMessage(
                                        field.state.meta.errors[0]
                                      )
                                    );
                                  }
                                }}
                                onChange={(e) => {
                                  const formatted = formatPhoneNumber(
                                    e.target.value
                                  );
                                  field.handleChange(formatted);
                                }}
                                onFocus={() => handleFieldFocus("phone")}
                                placeholder="(248) 555-1234"
                                required
                                type="tel"
                                value={field.state.value}
                              />
                              {field.state.meta.errors.length > 0 && (
                                <p className="mt-1 text-red-600 text-sm">
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
                      </div>

                      <form.Field
                        children={(field) => (
                          <div>
                            <label
                              className="mb-1 block font-medium text-gray-700 text-sm"
                              htmlFor={field.name}
                            >
                              Email Address
                            </label>
                            <input
                              className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
                                field.state.meta.errors.length > 0
                                  ? "border-red-300 bg-red-50"
                                  : "border-gray-300"
                              }`}
                              id={field.name}
                              name={field.name}
                              onBlur={() => {
                                field.handleBlur();
                                handleFieldBlur("email", field.state.value);
                                if (field.state.meta.errors.length > 0) {
                                  handleFieldError(
                                    "email",
                                    getErrorMessage(field.state.meta.errors[0])
                                  );
                                }
                              }}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              onFocus={() => handleFieldFocus("email")}
                              placeholder="john@example.com"
                              type="email"
                              value={field.state.value}
                            />
                            {field.state.meta.errors.length > 0 && (
                              <p className="mt-1 text-red-600 text-sm">
                                {getErrorMessage(field.state.meta.errors[0])}
                              </p>
                            )}
                          </div>
                        )}
                        name="email"
                        validators={{
                          onBlur: emailSchema,
                        }}
                      />

                      <form.Field
                        children={(field) => (
                          <div>
                            <label
                              className="mb-1 block font-medium text-gray-700 text-sm"
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
                                if (val?.includes(",")) {
                                  trackAddressSelected(
                                    "contact_form",
                                    form.getFieldValue("city")
                                  );
                                }
                              }}
                              onFocus={() => handleFieldFocus("address")}
                              placeholder="Start typing your address..."
                              value={field.state.value}
                            />
                            {field.state.meta.errors.length > 0 && (
                              <p className="mt-1 text-red-600 text-sm">
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
                              className="mb-1 block font-medium text-gray-700 text-sm"
                              htmlFor={field.name}
                            >
                              Service Interested In
                            </label>
                            <select
                              className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                              id={field.name}
                              name={field.name}
                              onBlur={() => {
                                field.handleBlur();
                                handleFieldBlur("service", field.state.value);
                              }}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              onFocus={() => handleFieldFocus("service")}
                              value={field.state.value}
                            >
                              <option value="">
                                Select a service (optional)
                              </option>
                              {services.map((service) => (
                                <option key={service} value={service}>
                                  {service}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                        name="service"
                      />

                      <form.Field
                        children={(field) => (
                          <div>
                            <label
                              className="mb-1 block font-medium text-gray-700 text-sm"
                              htmlFor={field.name}
                            >
                              Your Message *
                            </label>
                            <textarea
                              className={`w-full resize-none rounded-lg border px-4 py-3 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
                                field.state.meta.errors.length > 0
                                  ? "border-red-300 bg-red-50"
                                  : "border-gray-300"
                              }`}
                              id={field.name}
                              name={field.name}
                              onBlur={() => {
                                field.handleBlur();
                                handleFieldBlur("message", field.state.value);
                                if (field.state.meta.errors.length > 0) {
                                  handleFieldError(
                                    "message",
                                    getErrorMessage(field.state.meta.errors[0])
                                  );
                                }
                              }}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              onFocus={() => handleFieldFocus("message")}
                              placeholder="How can we help you?"
                              required
                              rows={4}
                              value={field.state.value}
                            />
                            {field.state.meta.errors.length > 0 && (
                              <p className="mt-1 text-red-600 text-sm">
                                {getErrorMessage(field.state.meta.errors[0])}
                              </p>
                            )}
                          </div>
                        )}
                        name="message"
                        validators={{
                          onBlur: messageSchema,
                        }}
                      />

                      {/* Consent disclaimer */}
                      <p className="text-gray-500 text-xs">
                        By submitting this form, you consent to receive calls
                        and text messages from BTG Gutters.
                      </p>

                      <form.Subscribe
                        children={([canSubmit, isSubmitting]) => (
                          <button
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-8 py-4 font-semibold text-lg text-white transition-all hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70"
                            disabled={!canSubmit || isSubmitting}
                            type="submit"
                          >
                            {isSubmitting ? (
                              <>
                                <svg
                                  className="h-5 w-5 animate-spin"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    fill="none"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  />
                                  <path
                                    className="opacity-75"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    fill="currentColor"
                                  />
                                </svg>
                                Sending...
                              </>
                            ) : (
                              <>
                                Send Message
                                <ArrowRight className="h-5 w-5" />
                              </>
                            )}
                          </button>
                        )}
                        selector={(state) => [
                          state.canSubmit,
                          state.isSubmitting,
                        ]}
                      />
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
