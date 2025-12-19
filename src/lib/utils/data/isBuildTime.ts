// src/lib/utils/isBuildTime.ts
export const isBuildTime =
  process.env.NETLIFY === "true" ||
  process.env.NETLIFY_BUILD === "true" ||
  process.env.NEXT_PHASE === "phase-production-build"
