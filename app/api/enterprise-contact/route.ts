import { NextRequest, NextResponse } from "next/server"
import { SendRawEmailCommand, SESClient } from "@aws-sdk/client-ses"

const ENTERPRISE_EMAIL = "enterprise@ethereum.org"
const SES_FROM_EMAIL = "enterprise-contact@ethereum.org"

// Configure SES client
const sesClient = new SESClient({
  region: process.env.SES_REGION || "us-east-2",
  credentials: {
    accessKeyId: process.env.SES_ACCESS_KEY_ID!,
    secretAccessKey: process.env.SES_SECRET_ACCESS_KEY!,
  },
})

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

function createRawEmail(
  fromEmail: string,
  toEmail: string,
  replyToEmail: string,
  subject: string,
  textBody: string
): string {
  const boundary = `----=_Part_${Date.now()}_${Math.random().toString(36)}`

  return [
    `From: ${fromEmail}`,
    `To: ${toEmail}`,
    `Reply-To: ${replyToEmail}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    ``,
    `--${boundary}`,
    `Content-Type: text/plain; charset=UTF-8`,
    `Content-Transfer-Encoding: 7bit`,
    ``,
    textBody,
    ``,
    `--${boundary}--`,
  ].join("\r\n")
}

async function sendEmail(userEmail: string, message: string): Promise<void> {
  const subject = "Enterprise Inquiry from ethereum.org"
  const textBody = `
New enterprise inquiry received:

From: ${userEmail}
Timestamp: ${new Date().toISOString()}

Message:
${message}

---
This message was sent via the enterprise contact form on ethereum.org/enterprise.
Reply to this email to respond directly to the sender.
  `.trim()

  const rawEmail = createRawEmail(
    SES_FROM_EMAIL,
    ENTERPRISE_EMAIL,
    userEmail,
    subject,
    textBody
  )

  const command = new SendRawEmailCommand({
    RawMessage: {
      Data: new TextEncoder().encode(rawEmail),
    },
  })

  await sesClient.send(command)
}

export async function POST(request: NextRequest) {
  try {
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

    // Send email via AWS SES
    try {
      await sendEmail(sanitizedEmail, sanitizedMessage)
    } catch (emailError) {
      console.error("AWS SES email sending failed:", emailError)
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 500 }
      )
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
