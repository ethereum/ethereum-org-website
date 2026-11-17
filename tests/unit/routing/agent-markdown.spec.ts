// The agent copy of a page replaces each diagram tag with its figure as text.
// Values come from the models the players use, so a string that gains a
// param its model doesn't fill must fail here, not ship "{amount}" to agents.

import { expect, test } from "@playwright/test"

import { DIAGRAM_FIGURE_TEXT } from "@/components/Diagrams/figure-text"

import en from "@/intl/en/component-diagrams.json"
import {
  diagramFigureText,
  diagramTextFromMessages,
  toAgentMarkdown,
} from "@/lib/md/diagram-text"

const text = diagramTextFromMessages("en", en)
const resolve = (markdown: string) =>
  toAgentMarkdown(markdown, {
    dir: "/content/developers/docs/gas/",
    figures: DIAGRAM_FIGURE_TEXT,
    text,
  })

test("every diagram tag reads in full, with every value filled", () => {
  for (const [tag, figure] of Object.entries(DIAGRAM_FIGURE_TEXT)) {
    const out = diagramFigureText(figure, 1, text)
    expect(out, tag).toMatch(/^\*\*Figure 1: .+\.\*\*\n\n.+\n\n.+$/)
    expect(out, tag).not.toMatch(/[{}]/)
  }
})

test("figures are numbered in page order, and a written fig wins", () => {
  const out = resolve(
    ["<GasEvmDiagram />", "", "Text.", "", "<GasTxDiagram fig={5} />"].join(
      "\n"
    )
  )
  expect(out).toContain("**Figure 1: Gas inside the EVM.**")
  expect(out).toContain("**Figure 5: Message call.**")
  expect(out).toContain("intrinsic cost of 21,000 gas")
  expect(out).not.toContain("Diagram")
})

test("the description quotes the model's numbers", () => {
  const out = resolve("<VaultInterfaceDiagram />")
  expect(out).toContain("holds 1,050 assets for 1,000 shares, 1.05 assets")
})

test("numbers follow the locale", () => {
  const ur = diagramTextFromMessages("ur", en)
  const out = toAgentMarkdown("<GasEvmDiagram fig={2} />", {
    dir: "/content/translations/ur/developers/docs/gas/",
    figures: DIAGRAM_FIGURE_TEXT,
    text: ur,
  })
  expect(out).toContain("**Figure ۲:")
  expect(out).toContain("۲۱٬۰۰۰")
})

test("code, inline code and indentation are respected", () => {
  const out = resolve(
    [
      "```jsx",
      "<GasTxDiagram />",
      "```",
      "Write `<GasTxDiagram />` on its own line.",
      "- Item",
      "  <GasTxDiagram />",
    ].join("\n")
  )
  expect(out).toContain("```jsx\n<GasTxDiagram />\n```")
  expect(out).toContain("Write `<GasTxDiagram />` on its own line.")
  expect(out).toContain("  **Figure 1: Message call.**")
})

test("relative links point back at the source's directory", () => {
  const out = resolve(
    '![Schematic](./gas.png) [EVM](../evm/) <img src="./a.png" />'
  )
  expect(out).toBe(
    '![Schematic](/content/developers/docs/gas/gas.png) [EVM](/content/developers/docs/evm/) <img src="/content/developers/docs/gas/a.png" />'
  )
  expect(resolve("[Docs](/developers/docs/)")).toBe("[Docs](/developers/docs/)")
})

test("an unknown tag, an unsupported form or a missing value fails", () => {
  expect(() => resolve("<NewDiagram />")).toThrow(/no entry/)
  expect(() => resolve("<GasTxDiagram initialPreset='x' />")).toThrow(
    /stand alone/
  )
  expect(() => resolve("See <GasTxDiagram /> here.")).toThrow(/stand alone/)
  expect(() =>
    toAgentMarkdown("<GasEvmDiagram />", {
      dir: "/content/",
      figures: { GasEvmDiagram: { prefix: "gas-evm", values: () => ({}) } },
      text,
    })
  ).toThrow(/intrinsic/)
})
