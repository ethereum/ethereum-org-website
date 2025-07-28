import { NextRequest, NextResponse } from "next/server"

const ENTERPRISE_EMAIL = "broiler.valleys-8u@icloud.com" // TODO: Testing only; revert to enterprise
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3

// Simple in-memory rate limiting (in production, use Redis or similar)
const ipRequestHistory = new Map<string, number[]>()

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")

  if (forwarded) return forwarded.split(",")[0].trim()
  if (realIP) return realIP
  return "unknown"
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const requests = ipRequestHistory.get(ip) || []

  // Filter out requests outside the current window
  const recentRequests = requests.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  )

  // Update the history
  ipRequestHistory.set(ip, recentRequests)

  // Check if we're over the limit
  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) return true

  // Add this request
  recentRequests.push(now)
  ipRequestHistory.set(ip, recentRequests)

  return false
}

function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .replace(/&lt;script/gi, "")
    .replace(/&lt;\/script/gi, "")
    .trim()
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request)

    // Rate limiting
    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { email, message } = body

    // Validate input
    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedEmail = sanitizeInput(email)
    const sanitizedMessage = sanitizeInput(message)

    // Validate email format
    if (!validateEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Create email content
    const emailSubject = "Enterprise Inquiry from ethereum.org"
    const emailBody = `
New enterprise inquiry received:

From: ${sanitizedEmail}
IP: ${clientIP}
Timestamp: ${new Date().toISOString()}

Message:
${sanitizedMessage}

---
This message was sent via the enterprise contact form on ethereum.org/enterprise.
    `.trim()

    // Submit to Netlify Forms
    try {
      const formData = new URLSearchParams()
      formData.append("form-name", "enterprise-contact")
      formData.append("subject", emailSubject)
      formData.append("bot-field", "") // Honeypot field (should be empty)
      formData.append("email", sanitizedEmail)
      formData.append("message", sanitizedMessage)

      // Get the base URL for absolute URL construction
      const baseUrl =
        request.nextUrl.origin || `https://${request.headers.get("host")}`

      const netlifyResponse = await fetch(`${baseUrl}/__forms.html`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      })

      if (!netlifyResponse.ok) {
        throw new Error(`Netlify Forms error: ${netlifyResponse.status}`)
      }
    } catch (netlifyError) {
      console.error("Netlify Forms submission failed:", netlifyError)
      // Log the submission details for manual follow-up
      console.log("Enterprise Contact Form Submission (Netlify failed):", {
        to: ENTERPRISE_EMAIL,
        subject: emailSubject,
        body: emailBody,
        from: sanitizedEmail,
        ip: clientIP,
        timestamp: new Date().toISOString(),
      })
      // Continue without throwing - we don't want to show user an error
      // if Netlify is down but the form validation passed
    }

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Enterprise contact form error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
