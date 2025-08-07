import { NextResponse } from "next/server"

import { normalizeLabels } from "@/lib/utils/gh"

const LABELS_TO_EMOJI = {
  content: "📝",
  design: "🎨",
  dev: "🛠️",
  docs: "📚",
  translation: "🌐",
  event: "🗓️",
}

const GFI_LABEL = "good first issue"

export async function POST(req: Request) {

  const { action, label, issue } = await req.json()

  if (action !== "labeled") {
    return NextResponse.json({ message: "Not a label action" }, { status: 200 })
  }

  if (label.name !== GFI_LABEL) {
    return NextResponse.json(
      { message: "Not a good first issue" },
      { status: 200 }
    )
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
      author: {
        name: issue.user.login,
        url: issue.user.html_url,
        icon_url: issue.user.avatar_url,
      },
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
