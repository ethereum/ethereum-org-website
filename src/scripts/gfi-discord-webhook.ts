import { fetchGFIs } from "../lib/api/fetchGFIs"

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
    color: 10181046,
    author: {
      name: issue.user.login,
      url: issue.user.html_url,
      icon_url: issue.user.avatar_url,
    },
  }))
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
