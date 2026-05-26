import type { ChildOnlyProp } from "@/lib/types"

// TODO: Standardize CardGrid across all MdComponents
const CardGrid = (props: ChildOnlyProp) => (
  <div className="my-8 grid grid-cols-fill-4 gap-4" {...props} />
)

// MDX components available to ai-agents markdown pages.
// The layout itself lives in `src/layouts/Topic.tsx`; per-section config is
// in `src/data/topics/ai-agents.ts`.
export const aiAgentsComponents = {
  CardGrid,
}
