import { mdxDiagramComponents } from "@/components/Diagrams/mdx-diagram-components"

// MDX components available to roadmap markdown pages.
// The layout itself lives in `src/layouts/Topic.tsx`; per-section config is
// in `src/data/topics/roadmap.ts`.
//
// Beyond the defaults in `MdComponents`, roadmap pages can use the
// interactive diagrams (e.g. `<VerkleTreeDiagram />`), as docs pages do.
export const roadmapComponents = {
  ...mdxDiagramComponents,
}
