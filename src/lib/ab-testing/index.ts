// Types (safe for both client and server)
export type { ABTestAssignment, ABTestConfig, ABTestVariants } from "./types"

// Server utilities (only import these in server components)
export {
  getABTestAssignment,
  getABTestConfigs,
  getVariantIndex,
} from "./server"

// Note: Server actions are exported from ./actions, not here
// This prevents client components from accidentally importing server-only code
