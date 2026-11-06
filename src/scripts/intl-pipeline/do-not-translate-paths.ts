/**
 * Paths that should never be translated. Dependency-free so client code can
 * import it without pulling in the rest of the pipeline.
 */
export const DO_NOT_TRANSLATE_PATHS = [
  // Legal pages
  "/cookie-policy/",
  "/privacy-policy/",
  "/terms-of-use/",
  "/terms-and-conditions/",
  // Contributing pages
  "/style-guide/",
]
