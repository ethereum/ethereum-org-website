import { visit } from "unist-util-visit"

const DIAGRAM = /^[A-Z]\w*Diagram$/

// Numbers the interactive diagrams (`<GasTxDiagram />`, ...) in page order by
// injecting `fig={n}`, which renders "Fig. N" and the `#fig-N` anchor. Images
// aren't counted. A `fig` written in the markdown is kept as is.
export function remarkFigureNumbers() {
  return (tree) => {
    let n = 0
    visit(tree, "mdxJsxFlowElement", (node) => {
      if (!DIAGRAM.test(node.name ?? "")) return
      n += 1
      if (node.attributes.some((a) => a.name === "fig")) return
      node.attributes.push({
        type: "mdxJsxAttribute",
        name: "fig",
        value: {
          type: "mdxJsxAttributeValueExpression",
          value: String(n),
          data: {
            estree: {
              type: "Program",
              sourceType: "module",
              comments: [],
              body: [
                {
                  type: "ExpressionStatement",
                  expression: { type: "Literal", value: n, raw: String(n) },
                },
              ],
            },
          },
        },
      })
    })
  }
}
