import type {
  List,
  ListItem,
  Nodes,
  Paragraph,
  Parent,
  PhrasingContent,
  Root,
} from "mdast"

// MDX JSX nodes, typed here because mdast-util-mdx-jsx isn't a direct dependency.
type JsxNode = Parent & { type: `mdxJsx${string}Element`; name: string | null }

type FlowchartNode = {
  type: "flowchart"
  data: { hName: string; hProperties: Record<string, unknown> }
  children: (FlowchartNode | PhrasingContent)[]
}

type Warn = (message: string) => void

const element = (
  hName: string,
  className: string[],
  children: FlowchartNode["children"],
  attributes: Record<string, string> = {}
): FlowchartNode => ({
  type: "flowchart",
  data: { hName, hProperties: { className, ...attributes } },
  children,
})

const isJsx = (
  node: { type: string } | undefined,
  type: string,
  name: string
) => node?.type === type && (node as JsxNode).name === name

const paragraphOf = (item: ListItem): Paragraph | undefined =>
  item.children[0]?.type === "paragraph" ? item.children[0] : undefined

// The intl sanitizer rewrites `**label**` followed by CJK text to
// `<strong>label</strong>`, so both forms are labels.
const isLabel = (node?: PhrasingContent) =>
  node?.type === "strong" || isJsx(node, "mdxJsxTextElement", "strong")

const hasEdgeLabel = (item: ListItem) => isLabel(paragraphOf(item)?.children[0])

// A changed bullet character splits a markdown list in two; read them as one.
const itemsOf = (node: Parent): ListItem[] =>
  node.children.flatMap((child) =>
    child.type === "list" ? (child as List).children : []
  )

const isLeaf = (item: ListItem) => !itemsOf(item).length

// A decision whose one exit ends at once draws that exit beside it, so chains
// of checks run down the page instead of spreading sideways.
const sideExitOf = (item: ListItem) => {
  const outs = itemsOf(item)
  return outs.filter(hasEdgeLabel).length === 2 &&
    outs.length === 2 &&
    outs.filter(isLeaf).length === 1
    ? outs.find(isLeaf)
    : undefined
}

// Items drawn off-center: a side-exit decision, or a straight run into one.
const isShifted = (item: ListItem): boolean => {
  const outs = itemsOf(item)
  return (
    sideExitOf(item) !== undefined || (outs.length === 1 && isShifted(outs[0]))
  )
}

const toList = (items: ListItem[], className: string[], warn: Warn) =>
  element(
    "div",
    ["flowchart-list", ...className],
    items.map((item) => toItem(item, warn)),
    { role: "list" }
  )

function toItem(item: ListItem, warn: Warn): FlowchartNode {
  const content = [...(paragraphOf(item)?.children ?? [])]
  const label = isLabel(content[0]) ? content.shift() : undefined
  if (label && content[0]?.type === "text")
    content[0] = { ...content[0], value: content[0].value.trimStart() }

  const dropped = item.children.filter(
    (child, i) =>
      child.type !== "list" && !(i === 0 && child.type === "paragraph")
  )
  if (dropped.length)
    warn(
      `<Flowchart> draws only the first paragraph of an item; dropped ${dropped.map((child) => child.type).join(", ")}`
    )

  const outs = itemsOf(item)
  // Shape comes from structure, never wording, so translations can't break it.
  const isDecision = outs.filter(hasEdgeLabel).length >= 2
  const sideExit = sideExitOf(item)

  const node = element(
    "div",
    isDecision ? ["flowchart-node", "flowchart-decision"] : ["flowchart-node"],
    content
  )
  const children: FlowchartNode[] = []
  if (label)
    children.push(
      element(
        "span",
        ["flowchart-edge"],
        (label as Parent).children as PhrasingContent[]
      )
    )
  if (sideExit) {
    children.push(
      element(
        "div",
        ["flowchart-head"],
        [node, toList([sideExit], ["flowchart-side"], warn)]
      )
    )
    children.push(
      toList(
        outs.filter((out) => out !== sideExit),
        [],
        warn
      )
    )
  } else {
    children.push(node)
    if (outs.length) children.push(toList(outs, [], warn))
  }
  return element(
    "div",
    isShifted(item)
      ? ["flowchart-item", "flowchart-shift"]
      : ["flowchart-item"],
    children,
    { role: "listitem" }
  )
}

const isFlowchart = (node: { type: string }): node is JsxNode =>
  isJsx(node, "mdxJsxFlowElement", "Flowchart")

function rootItemsOf(node: JsxNode) {
  const items = itemsOf(node)
  if (!items.length)
    throw new Error(
      "<Flowchart> must contain a markdown list (check the blank lines around it)"
    )
  return items
}

// A local walk instead of unist-util-visit: the unit-test runner loads this
// plugin from a CJS build that can't import that ESM-only package.
function transform(node: Nodes, warn: Warn) {
  if (isFlowchart(node)) {
    const chart = toList(rootItemsOf(node), ["flowchart-root"], warn)
    node.children = [chart as unknown as Paragraph]
    return
  }
  if ("children" in node)
    (node.children as Nodes[]).forEach((child) => transform(child, warn))
}

// Turns the nested list inside `<Flowchart>` into boxes and arrows: an item's
// first line is a box, its nested items are the arrows out of it, and a leading
// **bold** word labels the arrow. A box with two or more labelled arrows is a
// decision. The markdown stays a plain list, so it translates and reads as text.
export function remarkFlowchart({ warn = console.warn }: { warn?: Warn } = {}) {
  return (tree: Root) => transform(tree, warn)
}
