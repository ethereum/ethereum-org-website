import published from "@/data/published.json"

// Pinned in visual-test builds: a changing date reflows the footer and flakes
// every Chromatic snapshot (data-chromatic="ignore" can't mask the reflow).
export const getLastDeployDate = () =>
  process.env.IS_VISUAL_TEST === "true"
    ? "2024-01-01T00:00:00.000Z"
    : new Date(published.date).toISOString()
