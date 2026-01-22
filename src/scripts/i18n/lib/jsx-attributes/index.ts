/**
 * JSX attribute extraction and translation module
 */

export {
  countExtractedAttributes,
  extractAttributesFromContent,
  extractAttributesFromFile,
  extractAttributesFromFiles,
} from "./extract"
export {
  reinsertTranslatedAttributes,
  reinsertTranslationsForFiles,
} from "./reinsert"
export {
  type ExtractedAttribute,
  type FileExtractionResult,
  type FileTranslationResult,
  type JsxTranslationSummary,
  TRANSLATABLE_ATTRIBUTES,
  type TranslatableAttribute,
  type TranslatedAttribute,
} from "./types"
