import { expect, type Locator, test } from "@playwright/test"

/**
 * Guard for the isometric devdocs diagrams (src/components/Diagrams/anatomy).
 *
 * An unresolved CSS variable or a missing utility makes an SVG stroke fall
 * back to `none` and a fill fall back to black, so lines can silently vanish
 * (seen once after a hot reload). This walks every shape in every diagram on
 * each page, for every preset and every step, in light and dark, and fails
 * if a shape that should be stroked has no visible stroke or any fill
 * computes to black.
 *
 * Diagrams opt in by rendering `DiagramStage` (`data-diagram-stage`), marking
 * their drawing `data-anatomy-drawing` and their next-step button
 * `data-diagram-next`; presets are the `aria-pressed` buttons in the stage.
 * At the last step it also focuses every visible label, checking each part's
 * hover state.
 */

const pagesWithDiagrams = [
  "/developers/docs/transactions/",
  "/developers/docs/gas/",
  "/developers/docs/evm/",
]

const findPaintProblems = (stage: Locator) =>
  stage.evaluate((root) => {
    const problems: string[] = []
    const invisible = (value: string) =>
      value === "none" ||
      value === "transparent" ||
      /rgba\([^)]*,\s*0\)$/.test(value)

    root.querySelectorAll("svg *").forEach((el) => {
      if (!(el instanceof SVGGeometryElement)) return
      if (el.closest("clipPath, defs, mask")) return
      const style = getComputedStyle(el)
      const label = `${el.tagName}${el.getAttribute("class") ? `.${el.getAttribute("class")?.split(" ")[0]}` : ""}`

      // Shapes opt out of a stroke explicitly; everything else must show one.
      const noStroke =
        el.getAttribute("stroke") === "none" ||
        el.classList.contains("stroke-none") ||
        el.style.stroke === "none"
      if (!noStroke && invisible(style.stroke))
        problems.push(`${label}: stroke is ${style.stroke}`)

      if (style.fill === "rgb(0, 0, 0)")
        problems.push(`${label}: fill is black`)
    })
    return problems
  })

for (const theme of ["light", "dark"] as const) {
  test.describe(`Diagram strokes and fills (${theme})`, () => {
    for (const url of pagesWithDiagrams) {
      test(url, async ({ page }) => {
        const response = await page.goto(url)
        expect(response?.status(), `failed to load ${url}`).toBeLessThan(400)
        await page.evaluate((dark) => {
          document.documentElement.classList.toggle("dark", dark)
          document.documentElement.classList.toggle("light", !dark)
        }, theme === "dark")

        const stages = page.locator("[data-diagram-stage]")
        const stageCount = await stages.count()
        expect(stageCount, "no diagrams found").toBeGreaterThan(0)

        for (let s = 0; s < stageCount; s++) {
          const stage = stages.nth(s)
          await stage.scrollIntoViewIfNeeded()
          // The drawing is lazy-loaded after hydration.
          await expect(stage.locator("[data-anatomy-drawing]")).toBeVisible()

          const presets = stage.locator("button[aria-pressed]")
          const presetCount = Math.max(await presets.count(), 1)
          for (let p = 0; p < presetCount; p++) {
            if ((await presets.count()) > 0) await presets.nth(p).click()
            const next = stage.locator("[data-diagram-next]")
            let step = 0
            for (;;) {
              const problems = await findPaintProblems(stage)
              expect(
                problems,
                `diagram ${s}, preset ${p}, step ${step} (${theme})`
              ).toEqual([])
              if (!(await next.isEnabled())) break
              await next.click()
              step++
            }
          }

          // Hover state: focusing a label highlights its part.
          const labels = stage.locator("span[data-part] > span[tabindex]")
          for (let l = 0; l < (await labels.count()); l++) {
            const label = labels.nth(l)
            if (!(await label.isVisible())) continue
            await label.focus()
            const problems = await findPaintProblems(stage)
            expect(
              problems,
              `diagram ${s}, hovering label ${l} (${theme})`
            ).toEqual([])
          }
        }
      })
    }
  })
}
