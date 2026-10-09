import { NextResponse } from "next/server"

import { normalizeLabels } from "@/lib/utils/gh"

import {
  readWebhookBody,
  verifyGitHubWebhookSignature,
  WebhookBodyTooLargeError,
} from "./security"

const LABELS_TO_EMOJI = {
  content: "📝",
  design: "🎨",
  dev: "🛠️",
  docs: "📚",
  translation: "🌐",
  event: "🗓️",
}

const GFI_LABEL = "good first issue"

interface GitHubLabel {
  name: string
}

interface GitHubUser {
  login: string
  html_url: string
  avatar_url: string
}

interface GitHubIssue {
  assignee?: unknown
  title: string
  html_url: string
  created_at: string
  labels: GitHubLabel[]
  user: GitHubUser | null
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function isGitHubUser(value: unknown): value is GitHubUser {
  return (
    isRecord(value) &&
    typeof value.login === "string" &&
    typeof value.html_url === "string" &&
    typeof value.avatar_url === "string"
  )
}

function isGitHubIssue(value: unknown): value is GitHubIssue {
  return (
    isRecord(value) &&
    typeof value.title === "string" &&
    typeof value.html_url === "string" &&
    typeof value.created_at === "string" &&
    Array.isArray(value.labels) &&
    value.labels.every(
      (label) => isRecord(label) && typeof label.name === "string"
    ) &&
    (value.user === null || isGitHubUser(value.user))
  )
}

export async function POST(req: Request) {
  const secret = process.env.GITHUB_WEBHOOK_SECRET
  if (!secret) {
    console.error("GITHUB_WEBHOOK_SECRET is not configured")
    return NextResponse.json(
      { message: "Webhook is not configured" },
      { status: 500 }
    )
  }

  const signature = req.headers.get("x-hub-signature-256")
  if (!signature) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  let rawBody: Uint8Array
  try {
    rawBody = await readWebhookBody(req)
  } catch (error) {
    if (error instanceof WebhookBodyTooLargeError) {
      return NextResponse.json(
        { message: "Payload too large" },
        { status: 413 }
      )
    }
    throw error
  }

  if (!verifyGitHubWebhookSignature(rawBody, signature, secret)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  let payload: unknown
  try {
    payload = JSON.parse(
      new TextDecoder("utf-8", { fatal: true }).decode(rawBody)
    )
  } catch {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 })
  }

  if (!isRecord(payload)) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 })
  }

  const { action } = payload

  if (action !== "labeled") {
    return NextResponse.json({ message: "Not a label action" }, { status: 200 })
  }

  const { label } = payload
  if (!isRecord(label) || typeof label.name !== "string") {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 })
  }

  if (label.name !== GFI_LABEL) {
    return NextResponse.json(
      { message: "Not a good first issue" },
      { status: 200 }
    )
  }

  const { issue } = payload
  if (!isGitHubIssue(issue)) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 })
  }

  if (issue.assignee) {
    return NextResponse.json(
      { message: "Issue already assigned" },
      { status: 200 }
    )
  }

  // send a notification to discord webhook
  const webhookUrl = `https://discord.com/api/webhooks/${process.env.DISCORD_ID}/${process.env.DISCORD_TOKEN}`

  const embeds = [
    {
      title: issue.title,
      url: issue.html_url,
      timestamp: issue.created_at,
      description: issue.labels.map((label) => label.name).join(" • "),
      color: 10181046, // purple
      // `issue.user` is null for issues authored by deleted ("ghost") accounts.
      ...(issue.user && {
        author: {
          name: issue.user.login,
          url: issue.user.html_url,
          icon_url: issue.user.avatar_url,
        },
      }),
    },
  ]

  const allLabels = issue.labels.map((label) => label.name)
  const [firstLabel] = normalizeLabels(allLabels)

  let content: string
  if (firstLabel) {
    const labelsText = ` - ${firstLabel}`
    const emoji = LABELS_TO_EMOJI[firstLabel]
    const emojiText = emoji ? `${emoji} ` : ""
    content = `### ${emojiText}New good first issue${labelsText}`
  } else {
    content = `### New good first issue`
  }

  const message = {
    content,
    embeds,
  }

  const discordRes = await fetch(webhookUrl, {
    method: "post",
    body: JSON.stringify(message),
    headers: { "Content-Type": "application/json" },
  })

  if (!discordRes.ok) {
    const error = await discordRes.json()
    console.log(error)
    return NextResponse.json(
      { message: "Error sending GFI to Discord" },
      { status: 500 }
    )
  }

  return NextResponse.json(
    { message: "New GFI sent to Discord!" },
    { status: 200 }
  )
}
