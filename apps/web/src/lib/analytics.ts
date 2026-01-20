/**
 * Analytics utility for tracking user interactions and conversions
 *
 * This module provides comprehensive tracking for:
 * - Form interactions (start, field focus, field complete, submit, abandon)
 * - CTA clicks (buttons, phone links, quote links)
 * - Page views (service pages, city pages)
 * - Gallery interactions (filter, image view)
 * - Navigation (menu, dropdowns)
 * - External link clicks (social, maps, email)
 *
 * All events are sent to Databuddy for analysis.
 */

type EventProperties = Record<string, unknown>;

// Core tracking function
function track(event: string, properties?: EventProperties): void {
  try {
    window.databuddy?.track(event, {
      ...properties,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      path: window.location.pathname,
    });
  } catch (error) {
    console.error("[Analytics] Failed to track event:", event, error);
  }
}

// ============================================
// FORM TRACKING
// ============================================

export type FormType = "quote_form" | "contact_form";

export interface FormFieldInfo {
  field: string;
  form: FormType;
  value?: string;
}

/**
 * Track when user starts interacting with a form (first field focus)
 */
export function trackFormStart(form: FormType, source?: string): void {
  track("form_started", {
    form,
    source: source || "direct",
  });
}

/**
 * Track when user focuses on a specific field
 */
export function trackFieldFocus(info: FormFieldInfo): void {
  track("form_field_focused", {
    form: info.form,
    field: info.field,
  });
}

/**
 * Track when user completes a field (blur with value)
 */
export function trackFieldComplete(info: FormFieldInfo): void {
  track("form_field_completed", {
    form: info.form,
    field: info.field,
    has_value: Boolean(info.value?.trim()),
  });
}

/**
 * Track when user encounters a validation error
 */
export function trackFieldError(info: FormFieldInfo & { error: string }): void {
  track("form_field_error", {
    form: info.form,
    field: info.field,
    error: info.error,
  });
}

/**
 * Track successful form submission
 */
export function trackFormSubmit(
  form: FormType,
  properties?: EventProperties
): void {
  track("form_submitted", {
    form,
    ...properties,
  });
}

/**
 * Track form submission failure
 */
export function trackFormError(form: FormType, error: string): void {
  track("form_submission_error", {
    form,
    error,
  });
}

/**
 * Track when user abandons a form (navigates away with partial data)
 */
export function trackFormAbandon(
  form: FormType,
  fieldsCompleted: string[]
): void {
  track("form_abandoned", {
    form,
    fields_completed: fieldsCompleted,
    fields_completed_count: fieldsCompleted.length,
  });
}

// ============================================
// CTA & BUTTON TRACKING
// ============================================

export type CTALocation =
  | "header"
  | "hero"
  | "hero_mobile"
  | "quote_section"
  | "cta_banner"
  | "service_page"
  | "city_page"
  | "mobile_sticky"
  | "footer"
  | "about_page"
  | "contact_page";

/**
 * Track CTA button clicks (Get Free Quote buttons)
 */
export function trackCTAClick(
  location: CTALocation,
  buttonText?: string
): void {
  track("cta_clicked", {
    location,
    button_text: buttonText || "Get Free Quote",
    cta_type: "quote",
  });
}

/**
 * Track phone call link clicks
 */
export function trackPhoneClick(location: CTALocation): void {
  track("phone_click", {
    location,
    phone_number: "(248) 561-7790",
  });
}

/**
 * Track email link clicks
 */
export function trackEmailClick(location: CTALocation): void {
  track("email_click", {
    location,
    email: "btggutters@gmail.com",
  });
}

// ============================================
// PAGE VIEW TRACKING
// ============================================

/**
 * Track service page views
 */
export function trackServicePageView(serviceName: string): void {
  track("service_page_viewed", {
    service: serviceName,
  });
}

/**
 * Track city/service area page views
 */
export function trackCityPageView(cityName: string): void {
  track("city_page_viewed", {
    city: cityName,
  });
}

// ============================================
// GALLERY TRACKING
// ============================================

/**
 * Track gallery category filter
 */
export function trackGalleryFilter(category: string): void {
  track("gallery_filtered", {
    category,
  });
}

/**
 * Track gallery image view (lightbox open)
 */
export function trackGalleryImageView(imageInfo: {
  id: number;
  title: string;
  category: string;
  location: string;
}): void {
  track("gallery_image_viewed", {
    image_id: imageInfo.id,
    image_title: imageInfo.title,
    image_category: imageInfo.category,
    image_location: imageInfo.location,
  });
}

// ============================================
// NAVIGATION TRACKING
// ============================================

/**
 * Track mobile menu open/close
 */
export function trackMobileMenuToggle(isOpen: boolean): void {
  track("mobile_menu_toggled", {
    action: isOpen ? "opened" : "closed",
  });
}

/**
 * Track services dropdown open
 */
export function trackServicesDropdownOpen(): void {
  track("services_dropdown_opened", {});
}

/**
 * Track navigation link clicks
 */
export function trackNavClick(
  linkName: string,
  location: "header" | "footer" | "mobile_menu"
): void {
  track("navigation_clicked", {
    link: linkName,
    location,
  });
}

// ============================================
// EXTERNAL LINK TRACKING
// ============================================

/**
 * Track social media link clicks
 */
export function trackSocialClick(platform: "facebook" | "google_maps"): void {
  track("social_clicked", {
    platform,
  });
}

/**
 * Track Google Maps link clicks
 */
export function trackMapsClick(location: CTALocation): void {
  track("maps_clicked", {
    location,
  });
}

// ============================================
// ADDRESS AUTOCOMPLETE TRACKING
// ============================================

/**
 * Track when user selects an address from autocomplete
 */
export function trackAddressSelected(form: FormType, city?: string): void {
  track("address_autocomplete_used", {
    form,
    city_detected: city || "unknown",
  });
}

// ============================================
// CONVERSION TRACKING
// ============================================

/**
 * Track quote request conversion (high-value event)
 */
export function trackQuoteConversion(properties: {
  form: FormType;
  has_address: boolean;
  has_description: boolean;
  city?: string;
  source?: string;
}): void {
  track("quote_submitted", properties);
}

/**
 * Track contact form conversion
 */
export function trackContactConversion(properties: {
  has_email: boolean;
  has_address: boolean;
  service_selected?: string;
}): void {
  track("contact_submitted", properties);
}

// ============================================
// FORM STATE HELPER HOOK
// ============================================

export interface FormAnalyticsState {
  hasStarted: boolean;
  focusedFields: Set<string>;
  completedFields: Set<string>;
}

/**
 * Create initial form analytics state
 */
export function createFormAnalyticsState(): FormAnalyticsState {
  return {
    hasStarted: false,
    focusedFields: new Set(),
    completedFields: new Set(),
  };
}

/**
 * Handle field focus with analytics
 */
export function handleFieldFocusWithAnalytics(
  state: FormAnalyticsState,
  field: string,
  form: FormType,
  source?: string
): FormAnalyticsState {
  const newState = { ...state };

  // Track form start on first field focus
  if (!state.hasStarted) {
    trackFormStart(form, source);
    newState.hasStarted = true;
  }

  // Track field focus (only first time)
  if (!state.focusedFields.has(field)) {
    trackFieldFocus({ field, form });
    newState.focusedFields = new Set(state.focusedFields).add(field);
  }

  return newState;
}

/**
 * Handle field blur with analytics
 */
export function handleFieldBlurWithAnalytics(
  state: FormAnalyticsState,
  field: string,
  value: string,
  form: FormType
): FormAnalyticsState {
  const newState = { ...state };

  // Track field completion (only first time with value)
  if (value?.trim() && !state.completedFields.has(field)) {
    trackFieldComplete({ field, form, value });
    newState.completedFields = new Set(state.completedFields).add(field);
  }

  return newState;
}

/**
 * Get list of completed fields for abandon tracking
 */
export function getCompletedFieldsList(state: FormAnalyticsState): string[] {
  return Array.from(state.completedFields);
}
