/**
 * Hidden form for Netlify Forms detection during build time.
 * This form is never visible to users and is only used so Netlify
 * can detect and register the enterprise contact form during deployment.
 */
export default function NetlifyFormsDetection() {
  return (
    <form
      name="enterprise-contact"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      hidden
      aria-hidden="true"
    >
      {/* Honeypot field for spam protection */}
      <input type="text" name="bot-field" />

      {/* Form fields must match the React form exactly */}
      <input type="email" name="email" />
      <textarea name="message"></textarea>
    </form>
  )
}
