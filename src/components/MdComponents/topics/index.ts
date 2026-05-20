// Per-template MDX component bundles. Each named export is registered in
// `componentsMapping` (src/layouts/index.ts) so the slug router pulls the
// right components for a markdown page's `template:` value.
//
// The actual layout for these templates lives in `src/layouts/Topic.tsx`;
// per-section config is in `src/data/topics/<key>.ts`.
//
// See `docs/topic-layout-refactor.md`.
export { aiAgentsComponents } from "./ai-agents"
export { roadmapComponents } from "./roadmap"
export { stakingComponents } from "./staking"
export { upgradeComponents } from "./upgrade"
export { useCasesComponents } from "./use-cases"
