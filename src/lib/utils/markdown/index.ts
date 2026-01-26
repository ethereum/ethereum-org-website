/**
 * Markdown Utilities
 *
 * Centralized exports for all markdown-related utilities.
 * These utilities power the markdown page rendering system.
 */

// Content loading
export {
  contentExists,
  getAllMarkdownPaths,
  getContentDir,
  getEditPath,
  loadMarkdownContent,
} from "./content"

// Table of contents extraction
export { extractTableOfContents, getAllHeadingIds } from "./toc"

// MDX preprocessing
export { needsPreprocessing, preprocessContent } from "./preprocess"

// Contributors
export {
  formatLastUpdated,
  getContributors,
  getContributorsSync,
} from "./contributors"

// Image resolution
export {
  getImageFilePath,
  isAnimatedImage,
  resolveHeroImage,
  resolveImagePath,
} from "./images"
