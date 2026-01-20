/**
 * Form validation utilities
 * Phone number formatting and extraction functions for use with form inputs
 */

/**
 * Formats a phone number as user types: (XXX) XXX-XXXX
 * Strips non-digits and applies formatting progressively
 */
export function formatPhoneNumber(value: string): string {
  // Strip all non-digits
  const digits = value.replace(/\D/g, "");

  // Limit to 10 digits
  const limited = digits.slice(0, 10);

  // Apply formatting based on length
  if (limited.length === 0) {
    return "";
  }
  if (limited.length <= 3) {
    return `(${limited}`;
  }
  if (limited.length <= 6) {
    return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
  }
  return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`;
}

/**
 * Extracts raw digits from a formatted phone number
 */
export function extractPhoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Validates that a phone number has exactly 10 digits
 */
export function isValidPhoneNumber(value: string): boolean {
  const digits = extractPhoneDigits(value);
  return digits.length === 10;
}
