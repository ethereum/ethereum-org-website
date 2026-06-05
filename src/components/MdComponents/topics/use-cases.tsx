import AiAgentProductLists from "@/components/Content/ai-agents/AiAgentProductLists"
import BuildYourOwnAIAgent from "@/components/Content/ai-agents/BuildYourOwnAIAgent"
import CategoryAppsGrid from "@/components/Content/apps/CategoryAppsGrid"
import PredictionMarketLists from "@/components/Content/prediction-markets/PredictionMarketLists"
import { RestakingList } from "@/components/Content/restaking/RestakingList"
import TabbedSection from "@/components/Content/restaking/RestakingTab"

// MDX components available to use-cases markdown pages.
// The layout itself lives in `src/layouts/Topic.tsx`; per-section config is
// in `src/data/topics/use-cases.ts`.
export const useCasesComponents = {
  AiAgentProductLists,
  BuildYourOwnAIAgent,
  CategoryAppsGrid,
  RestakingList,
  TabbedSection,
  PredictionMarketLists,
}
