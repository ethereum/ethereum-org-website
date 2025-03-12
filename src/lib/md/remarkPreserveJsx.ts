import { visit } from "unist-util-visit"

// TODO: migrate all md files to use v2 or v3 mdx syntax

// this is a temporary solution to preserve JSX nodes in v1 mdx syntax
// ref. https://mdxjs.com/migrating/v2/#jsx
export function remarkPreserveJsx() {
  return (tree) => {
    visit(tree, "mdxJsxFlowElement", (node) => {
      // Remove paragraph wrapper from JSX nodes
      if (
        node.children &&
        node.children.length === 1 &&
        node.children[0].type === "paragraph"
      ) {
        Object.assign(node.children, node.children[0].children)
      }
    })
  }
}
