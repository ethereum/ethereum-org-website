/**
 * remarkFlowchart (src/lib/md/remarkFlowchart.ts): the nested list inside
 * `<Flowchart>` becomes boxes, arrows and decisions, read from structure only.
 */

import { expect, test } from "@playwright/test"

import { remarkFlowchart } from "../../../src/lib/md/remarkFlowchart"

type Node = {
  type: string
  value?: string
  data?: { hProperties?: { className?: string[] } }
  children?: Node[]
}

/** Parses `md` with the site's MDX parser and returns the tree after the plugin. */
async function run(md: string, warn: (message: string) => void = () => {}) {
  const { serialize } = await import("next-mdx-remote/serialize")
  const { default: remarkGfm } = await import("remark-gfm")
  let after: Node | undefined
  await serialize(md, {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        [remarkFlowchart, { warn }],
        () => (tree: Node) => {
          after = tree
        },
      ],
    },
  } as never)
  return after!
}

const classesOf = (node: Node) => node.data?.hProperties?.className ?? []

const all = (node: Node, className: string): Node[] => [
  ...(classesOf(node).includes(className) ? [node] : []),
  ...(node.children ?? []).flatMap((child) => all(child, className)),
]

const textOf = (node: Node): string =>
  node.value ?? (node.children ?? []).map(textOf).join("")

/** Text of the box inside an item. */
const boxOf = (item: Node) => textOf(all(item, "flowchart-node")[0])

const DECISION = `<Flowchart>

- Start
  - Ready?
    - **Yes** Go
    - **No** Wait

</Flowchart>`

test("an item with two labelled exits is a decision", async () => {
  const after = await run(DECISION)
  const decisions = all(after, "flowchart-decision").map(textOf)
  expect(decisions).toEqual(["Ready?"])
  expect(all(after, "flowchart-edge").map(textOf)).toEqual(["Yes", "No"])
  expect(all(after, "flowchart-node").map(textOf)).toEqual([
    "Start",
    "Ready?",
    "Go",
    "Wait",
  ])
})

test("an unlabelled fork is not a decision", async () => {
  const after = await run(`<Flowchart>

- Start
  - One
  - Two

</Flowchart>`)
  expect(all(after, "flowchart-decision")).toEqual([])
  expect(all(after, "flowchart-edge")).toEqual([])
})

test("a decision with exactly one exit that ends at once draws it beside the box", async () => {
  const after = await run(`<Flowchart>

- Start
  - Is it A?
    - **Yes** Handle A
    - **No** Is it B?
      - **Yes** Handle B
      - **No** Fall back
        - Done

</Flowchart>`)
  const heads = all(after, "flowchart-head")
  expect(heads.map((head) => boxOf(head))).toEqual(["Is it A?", "Is it B?"])
  expect(all(after, "flowchart-side").map((side) => boxOf(side))).toEqual([
    "Handle A",
    "Handle B",
  ])
  // Both decisions and the straight run into the first one shift off-center.
  expect(all(after, "flowchart-shift").map(boxOf)).toEqual([
    "Start",
    "Is it A?",
    "Is it B?",
  ])
})

test("a decision whose exits both continue keeps them below", async () => {
  const after = await run(`<Flowchart>

- Is it A?
  - **Yes** Handle A
    - Done
  - **No** Handle B
    - Done

</Flowchart>`)
  expect(all(after, "flowchart-head")).toEqual([])
  expect(all(after, "flowchart-shift")).toEqual([])
})

test("a <strong> label (the sanitizer's CJK form) is a label", async () => {
  const after = await run(`<Flowchart>

- 开始
  - 准备好了吗？
    - <strong>是</strong>出发
    - <strong>否</strong>等待

</Flowchart>`)
  expect(all(after, "flowchart-decision").map(textOf)).toEqual(["准备好了吗？"])
  expect(all(after, "flowchart-edge").map(textOf)).toEqual(["是", "否"])
})

test("a list split by a changed bullet character is read as one", async () => {
  const after = await run(`<Flowchart>

- Start
  - Ready?
    - **Yes** Go
    * **No** Wait

</Flowchart>`)
  expect(all(after, "flowchart-decision").map(textOf)).toEqual(["Ready?"])
})

test("a chart without a list fails with a hint", async () => {
  await expect(run(`<Flowchart>- Start - End</Flowchart>`)).rejects.toThrow(
    /must contain a markdown list \(check the blank lines around it\)/
  )
})

test("a second paragraph in an item is reported, not silently dropped", async () => {
  const warnings: string[] = []
  await run(
    `<Flowchart>

- Start

  More about the start.

  - End

</Flowchart>`,
    (message) => warnings.push(message)
  )
  expect(warnings).toEqual([
    "<Flowchart> draws only the first paragraph of an item; dropped paragraph",
  ])
})
