/**
 * Types for JSX attribute extraction and translation
 */

/** Regex to match JSX/HTML-style attributes with quoted values */
export const JSX_ATTRIBUTE_REGEX =
  /\b([a-zA-Z][\w-]*)\s*=\s*(?:"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)')/g

/** Regex to identify JSX component opening tags */
export const JSX_COMPONENT_REGEX = /<([A-Z][a-zA-Z0-9]*)\s+([^>]*?)(?:\/>|>)/g

/** Attributes that contain human-readable text requiring translation */
export const TRANSLATABLE_ATTRIBUTES = [
  "title",
  "description",
  "alt",
  "label",
  "aria-label",
  "placeholder",
  "buttonLabel",
  "name",
  "caption",
  "contentPreview",
  "location",
] as const

export type TranslatableAttribute = (typeof TRANSLATABLE_ATTRIBUTES)[number]

/** A single extracted attribute from a JSX component */
export interface ExtractedAttribute {
  /** File path the attribute was found in */
  filePath: string
  /** Line number (1-indexed) where the attribute appears */
  line: number
  /** Column position where the attribute value starts */
  column: number
  /** The attribute name (e.g., "title", "description") */
  attributeName: TranslatableAttribute
  /** The component name (e.g., "Card", "ExpandableCard") */
  componentName: string
  /** The original English attribute value */
  originalValue: string
  /** Surrounding context (1-2 sentences before/after) for translation accuracy */
  context: string
}

/** Result of extracting attributes from a single file */
export interface FileExtractionResult {
  filePath: string
  attributes: ExtractedAttribute[]
  /** Original file content for re-insertion */
  content: string
}

/** A translated attribute ready for re-insertion */
export interface TranslatedAttribute extends ExtractedAttribute {
  translatedValue: string
}

/** Result of translating attributes for a file */
export interface FileTranslationResult {
  filePath: string
  translatedAttributes: TranslatedAttribute[]
  /** Updated file content with translations inserted */
  updatedContent: string
  /** Whether any attributes were translated */
  hasChanges: boolean
}

/** Summary of JSX attribute translation for a batch of files */
export interface JsxTranslationSummary {
  /** Total files processed */
  filesProcessed: number
  /** Files that had attributes translated */
  filesWithChanges: number
  /** Total attributes translated */
  attributesTranslated: number
  /** Attributes that failed translation */
  attributesFailed: number
  /** Whether Gemini API was available */
  geminiAvailable: boolean
  /** Files with updated content */
  updatedFiles: FileTranslationResult[]
}
