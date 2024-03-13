import * as dotenv from "dotenv"

import { fetchGFIs } from "../lib/api/fetchGFIs"

dotenv.config({ path: `.env.local` })

const run = async () => {
  const issues = await fetchGFIs()

  const embeds = issues
    .map((issue) => ({
      title: issue.title,
      url: issue.html_url,
      timestamp: issue.created_at,
      color: 10181046,
      footer: {
        text: "Good First Issue",
      },
      author: {
        name: issue.user.login,
        url: issue.user.html_url,
        icon_url: issue.user.avatar_url,
      },
    }))
    .slice(0, 1)
  const message = {
    content:
      issues.length > 1
        ? `## (${issues.length}) New good first issues! 🎉`
        : "## New good first issue! 🎉",
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
