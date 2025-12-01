// GitHub PR review comment helper with scoped @mentions
import { config, gitHubBearerHeaders } from "../../config"
import type { QaLevel } from "../qa-routing"
import { fetchWithRetry } from "../utils/fetch"

/**
 * Post a follow-up comment on a PR with AI reviewer mentions and clear scope
 * @param prNumber The PR number
 * @param qaPlan The QA plan mapping languages to review levels
 */
export async function postPrReviewComment(
  prNumber: number,
  qaPlan: Record<string, QaLevel>
): Promise<void> {
  const copilotLangs: string[] = []
  const claudeLangs: string[] = []

  for (const [lang, level] of Object.entries(qaPlan)) {
    if (level === "copilot") {
      copilotLangs.push(lang)
    } else if (level === "copilot+claude") {
      copilotLangs.push(lang)
      claudeLangs.push(lang)
    }
  }

  if (copilotLangs.length === 0 && claudeLangs.length === 0) {
    console.log("[PR-COMMENT] No AI review needed, skipping comment")
    return
  }

  let comment = "## AI Translation Review Request\n\n"
  comment +=
    "This PR contains automated translations that need quality review.\n\n"

  // Compact snapshot of canonical prompt rules and glossary/TM awareness
  comment += "### Prompt Rules Snapshot\n\n"
  comment += "Key non-negotiables for review:\n"
  comment += "- Protected names include `ethereum.org`; do not change casing.\n"
  comment += "- Header IDs `{#...}` must remain identical to English.\n"
  comment +=
    "- URL/path destinations must be preserved character-for-character (case, hyphens, slashes, fragments, query params). This also applies to links inside JSON strings.\n"
  comment +=
    '- JSON escaping: inside JSON values, escape quotes ("), backslashes (\\), newlines (\\n), tabs (\\t).\n\n'
  comment +=
    "Canonical prompt source: `src/scripts/i18n/lib/crowdin/pre-translate-prompt.txt` (synced to Crowdin before pre-translation).\n\n"
  comment +=
    "Glossary/TM note: Community glossary/TM is synced from Supabase into Crowdin at the start of the run to guide terminology consistency.\n\n"

  if (copilotLangs.length > 0) {
    comment += "### @copilot\n\n"
    comment +=
      "@copilot Please review the translations for the following languages and check for:\n"
    comment += "- Accuracy and natural phrasing\n"
    comment += "- Consistent use of technical terminology\n"
    comment += "- Proper handling of Markdown/code syntax\n"
    comment += "- Appropriate tone and formality\n\n"
    comment += `**Languages:** ${copilotLangs.join(", ")}\n\n`
  }

  if (claudeLangs.length > 0) {
    comment += "### @claude\n\n"
    comment +=
      "@claude Please provide a thorough review of translations for the following languages, focusing on:\n"
    comment += "- Semantic accuracy and cultural appropriateness\n"
    comment += "- Technical term consistency\n"
    comment += "- Grammar and idiomatic expressions\n"
    comment += "- Any potential ambiguities or mistranslations\n\n"
    comment += `**Languages:** ${claudeLangs.join(", ")}\n\n`
  }

  comment +=
    "---\n*This review request was automatically generated based on language quality trust scores.*"

  const url = `https://api.github.com/repos/${config.ghOrganization}/${config.ghRepo}/issues/${prNumber}/comments`

  const response = await fetchWithRetry(url, {
    method: "POST",
    headers: {
      ...gitHubBearerHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body: comment }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.warn(
      `[PR-COMMENT] Failed to post review comment (${response.status}): ${errorText}`
    )
    return
  }

  console.log(`[PR-COMMENT] Posted AI review comment on PR #${prNumber}`)
}
