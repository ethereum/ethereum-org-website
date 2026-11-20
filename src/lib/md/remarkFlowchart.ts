import { visit } from "unist-util-visit"

type MdNode = {
  type: string
  value?: string
  name?: string | null
  children?: MdNode[]
  data?: Record<string, unknown>
}

const element = (
  hName: string,
  className: string[],
  children: MdNode[],
  attributes: Record<string, string> = {}
): MdNode => ({
  type: "flowchart",
  data: { hName, hProperties: { className, ...attributes } },
  children,
})

const paragraphOf = (item: MdNode) =>
  item.children?.[0]?.type === "paragraph" ? item.children[0] : undefined

const hasEdgeLabel = (item: MdNode) =>
  paragraphOf(item)?.children?.[0]?.type === "strong"

const isLeaf = (item: MdNode) =>
  !item.children?.some((child) => child.type === "list")

const toList = (items: MdNode[], className: string[]): MdNode =>
  element("div", ["flowchart-list", ...className], items.map(toItem), {
    role: "list",
  })

const outsOf = (item: MdNode) =>
  item.children?.find((child) => child.type === "list")?.children ?? []

// A decision whose one exit ends at once draws that exit beside it, so chains
// of checks run down the page instead of spreading sideways.
const sideExitOf = (item: MdNode) => {
  const outs = outsOf(item)
  return outs.filter(hasEdgeLabel).length === 2 &&
    outs.length === 2 &&
    outs.filter(isLeaf).length === 1
    ? outs.find(isLeaf)
    : undefined
}

// Items drawn off-center: a side-exit decision, or a straight run into one.
const isShifted = (item: MdNode): boolean => {
  const outs = outsOf(item)
  return (
    sideExitOf(item) !== undefined || (outs.length === 1 && isShifted(outs[0]))
  )
}

function toItem(item: MdNode): MdNode {
  const content = [...(paragraphOf(item)?.children ?? [])]
  const label = content[0]?.type === "strong" ? content.shift() : undefined
  if (label && content[0]?.type === "text")
    content[0] = { ...content[0], value: content[0].value?.trimStart() }

  const outs = outsOf(item)
  // Shape comes from structure, never wording, so translations can't break it.
  const isDecision = outs.filter(hasEdgeLabel).length >= 2
  const sideExit = sideExitOf(item)

  const node = element(
    "div",
    isDecision ? ["flowchart-node", "flowchart-decision"] : ["flowchart-node"],
    content
  )
  const children: MdNode[] = []
  if (label)
    children.push(element("span", ["flowchart-edge"], label.children ?? []))
  if (sideExit) {
    children.push(
      element(
        "div",
        ["flowchart-head"],
        [node, toList([sideExit], ["flowchart-side"])]
      )
    )
    children.push(
      toList(
        outs.filter((out) => out !== sideExit),
        []
      )
    )
  } else {
    children.push(node)
    if (outs.length) children.push(toList(outs, []))
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

// Turns the nested list inside `<Flowchart>` into boxes and arrows: an item's
// first line is a box, its nested items are the arrows out of it, and a leading
// **bold** word labels the arrow. A box with two or more labelled arrows is a
// decision. The markdown stays a plain list, so it translates and reads as text.
export function remarkFlowchart() {
  return (tree: MdNode) => {
    visit(tree, "mdxJsxFlowElement", (node: MdNode) => {
      if (node.name !== "Flowchart") return
      const list = node.children?.find((child) => child.type === "list")
      if (!list) throw new Error("<Flowchart> must contain a markdown list")
      node.children = [toList(list.children ?? [], ["flowchart-root"])]
    })
  }
}
