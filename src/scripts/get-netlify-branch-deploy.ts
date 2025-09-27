// Fetches the latest published Netlify deploy for the current branch and outputs its URL for GitHub Actions

import fs from "fs"

import fetch from "node-fetch"

const siteId = process.env.NETLIFY_SITE_ID
const branch = process.env.GITHUB_REF_NAME
const token = process.env.NETLIFY_TOKEN

if (!siteId || !branch || !token) {
  console.error("Missing NETLIFY_SITE_ID, GITHUB_REF_NAME, or NETLIFY_TOKEN")
  process.exit(1)
}

type NetlifyDeploy = {
  state: string
  branch: string
  published: boolean
  deploy_ssl_url?: string
  deploy_url?: string
}
;(async () => {
  const url = `https://api.netlify.com/api/v1/sites/${siteId}/deploys?branch=${branch}`
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) {
    console.error(
      "Failed to fetch Netlify deploys:",
      res.status,
      await res.text()
    )
    process.exit(1)
  }
  const deploys: NetlifyDeploy[] = await res.json()
  // Find the latest published deploy for this branch
  const latest = deploys.find(
    (d) => d.state === "ready" && d.branch === branch && d.published
  )
  if (!latest) {
    console.error("No published deploy found for branch:", branch)
    process.exit(1)
  }
  // Use GitHub Actions recommended output syntax (GITHUB_OUTPUT)
  const output = `url=${latest.deploy_ssl_url || latest.deploy_url}`
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, output + "\n")
  } else {
    // Fallback for local/dev
    console.log(output)
  }
})()
