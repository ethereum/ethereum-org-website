import { expect, request, test } from "@playwright/test"

// Regression coverage for #18978: `TabsContent` rendered inactive panels as
// empty shells, so crawlers and non-JS clients received only the default panel.
//
// These fetch raw HTML over HTTP and never execute JavaScript, which is exactly
// what such a client sees. Scripts are stripped first because the RSC flight
// payload embeds panel content inside <script>self.__next_f.push(...)> -- a
// naive search would find the text there and pass even when the bug is present.

const TAB_PAGES = [
  "/en/10years",
  "/en/stablecoins",
  "/en/founders",
  "/en/restaking",
  "/en/staking/withdrawals",
]

const stripScripts = (html: string) =>
  html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<template\b[^>]*>[\s\S]*?<\/template>/gi, "")

/** Inner HTML of the <div> opening at `start`, matching nested divs. */
const innerHtml = (html: string, start: number): string => {
  const openEnd = html.indexOf(">", start)
  if (openEnd === -1) return ""
  if (html[openEnd - 1] === "/") return ""

  const tagRe = /<(\/?)div\b[^>]*?(\/?)>/gi
  tagRe.lastIndex = openEnd + 1
  let depth = 1
  let match: RegExpExecArray | null

  while ((match = tagRe.exec(html))) {
    if (match[2] === "/") continue // self-closing
    depth += match[1] === "/" ? -1 : 1
    if (depth === 0) return html.slice(openEnd + 1, match.index)
  }
  return ""
}

const tabPanels = (html: string) => {
  const panels: { state: string; inner: string }[] = []
  const panelRe = /<div\b[^>]*role="tabpanel"[^>]*>/gi
  let match: RegExpExecArray | null

  while ((match = panelRe.exec(html))) {
    panels.push({
      state: match[0].match(/data-state="([^"]*)"/)?.[1] ?? "",
      inner: innerHtml(html, match.index),
    })
  }
  return panels
}

test.describe("Tab panels in server HTML", () => {
  for (const path of TAB_PAGES) {
    test(`${path} ships every tab panel's content`, async ({ baseURL }) => {
      const apiRequest = await request.newContext()
      const response = await apiRequest.get(baseURL + path)
      expect(response.status()).toBe(200)

      const html = stripScripts(await response.text())
      const panels = tabPanels(html)

      // Guard against the assertions silently passing on a page that no longer
      // renders tabs at all.
      expect(panels.length).toBeGreaterThan(1)

      const empty = panels.filter(({ inner }) => inner.trim().length === 0)
      expect(
        empty,
        `${empty.length} of ${panels.length} tab panels are empty in server HTML`
      ).toHaveLength(0)

      // Exactly one panel is active; the rest stay inactive for CSS to hide.
      expect(panels.filter(({ state }) => state === "active")).toHaveLength(1)

      await apiRequest.dispose()
    })
  }
})
