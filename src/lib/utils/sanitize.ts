/**
 * Lightweight sanitizer for user input to prevent XSS attacks
 * Specifically designed for plain text content
 *
 * @param input - The string to sanitize
 * @returns Sanitized string with dangerous content removed
 */
export function sanitizeInput(input: string): string {
  return (
    input
      // Remove script tags (any variation)
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(
        /&lt;script\b[^<]*(?:(?!&lt;\/script&gt;)[^<]*)*&lt;\/script&gt;/gi,
        ""
      )

      // Remove iframe tags
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
      .replace(
        /&lt;iframe\b[^<]*(?:(?!&lt;\/iframe&gt;)[^<]*)*&lt;\/iframe&gt;/gi,
        ""
      )

      // Remove object and embed tags
      .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "")
      .replace(/<embed\b[^<]*(?:(?!\/>)[^<]*)*\/?>/gi, "")

      // Remove javascript: protocols
      .replace(/javascript:/gi, "")
      .replace(/vbscript:/gi, "")
      .replace(/data:/gi, "")

      // Remove event handlers
      .replace(/on\w+\s*=/gi, "")

      // Remove any remaining HTML-like tags (aggressive cleanup for plain text)
      .replace(/<[^>]*>/g, "")
      .replace(/&lt;[^&]*&gt;/g, "")

      // Clean up whitespace
      .trim()
      .replace(/\s+/g, " ")
  )
}
