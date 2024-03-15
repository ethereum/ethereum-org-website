import * as dotenv from "dotenv"

import { rawLabelsToText } from "@/lib/utils/gh"

import { fetchGFIs } from "../lib/api/fetchGFIs"

dotenv.config({ path: `.env.local` })

const run = async () => {
  // Calculate the start of the last hour
  const now = new Date()
  const sinceDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours() - 1
  ).toISOString()

  const issues = await fetchGFIs(sinceDate)

  if (!issues.length) {
    console.log("No new good first issues found.")
    return
  }

  const embeds = issues.map((issue) => ({
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
  }))

  const allLabels = issues
    .map((issue) => issue.labels.map((label) => label.name))
    .flat()
  const uniqueLabels = Array.from(new Set(allLabels))
  const labels = rawLabelsToText(uniqueLabels)
  const labelsText = labels ? ` - ${labels}` : ""

  const message = {
    content:
      issues.length > 1
        ? `## (${issues.length}) New good first issues${labelsText}`
        : `## New good first issue${labelsText}`,
    embeds,
  }

  const webhookUrl = `https://discord.com/api/webhooks/${process.env.DISCORD_ID}/${process.env.DISCORD_TOKEN}`

  const res = await fetch(webhookUrl, {
    method: "post",
    body: JSON.stringify(message),
    headers: { "Content-Type": "application/json" },
  })

  if (!res.ok) {
    const error = await res.json()
    console.log(error, res)
    throw new Error(`Error: ${res.status} ${res.statusText}`)
  }

  console.log("Message sent successfully!")
}

run()
