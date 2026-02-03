#!/usr/bin/env node

/**
 * Cross-Reference Validation Script for Context Bible
 *
 * Validates that all paths referenced in context-bible.json point to existing files
 * and follow the required path format conventions.
 *
 * Validations performed:
 * - All schema paths in context-bible.json point to existing files
 * - All files are valid JSON (parseable without errors)
 * - All paths follow format conventions (relative, no leading slash, forward slashes)
 * - Schema objects have required description fields (project-context.md Rule #3)
 * - Dynamic discovery ensures no orphaned schema files exist
 * - Duplicate path and circular reference detection
 *
 * NO EXTERNAL DEPENDENCIES - runs with plain Node.js
 *
 * Usage: node .agent-context/validation/validate-cross-references.js
 *        VALIDATION_FORMAT=json node .agent-context/validation/validate-cross-references.js
 *
 * @fileoverview Cross-reference validation for the Context Bible project.
 * @module validate-cross-references
 *
 * Exit Codes:
 * @returns {number} 0 - All cross-references valid, all files exist and parse correctly
 * @returns {number} 1 - One or more cross-references failed validation
 */

const fs = require("fs")
const path = require("path")

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * Expected number of schema files in .agent-context/ directory
 * @constant {number}
 */
const EXPECTED_SCHEMA_COUNT = 4

/**
 * Context Bible filename (master index)
 * @constant {string}
 */
const CONTEXT_BIBLE_FILENAME = "context-bible.json"

/**
 * Maximum allowed file size for JSON files (10MB)
 * Prevents denial-of-service from extremely large files
 * @constant {number}
 */
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024

/**
 * Path format validation regex patterns
 *
 * These patterns enforce the project path conventions:
 * - No leading slashes (relative paths only)
 * - Forward slashes only (no backslashes)
 * - No absolute paths (Unix or Windows)
 * - No UNC paths or file:// URLs
 *
 * @constant {Object}
 * @property {RegExp} noLeadingSlash - Path must not start with /
 * @property {RegExp} forwardSlashesOnly - Path must not contain backslashes
 * @property {RegExp} isRelative - Path must be relative (no drive letters, UNC, URLs)
 * @property {RegExp} hasContent - Path must not be empty and must have content
 * @property {RegExp} noPathTraversal - Path must not contain .. (security)
 */
const PATH_PATTERNS = {
  // Must not be empty AND must not start with slash
  noLeadingSlash: /^[^/].+$/,
  // Must not contain backslashes
  forwardSlashesOnly: /^[^\\]+$/,
  // Must be relative (not absolute, not UNC, not URL)
  isRelative: /^(?!\/|[a-zA-Z]:|\\\\|file:)/,
  // Must have actual content (not empty or whitespace)
  hasContent: /\S/,
  // Must not have path traversal (security)
  noPathTraversal: /^(?!.*\.\.)/,
}

/**
 * Whether to output structured JSON (for CI/CD integration)
 * Set via environment variable: VALIDATION_FORMAT=json
 * @constant {boolean}
 */
const STRUCTURED_OUTPUT = process.env.VALIDATION_FORMAT === "json"

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Log output, respecting structured output mode
 * @param {string} message - Message to log (ignored in structured mode)
 * @param {Object} [structuredData] - Structured data for JSON output
 */
function log(message, structuredData = null) {
  if (STRUCTURED_OUTPUT && structuredData) {
    console.log(JSON.stringify(structuredData))
  } else if (!STRUCTURED_OUTPUT) {
    console.log(message)
  }
}

/**
 * Validate path format follows project conventions
 *
 * Validates that a file path adheres to the project's path format rules:
 * - No leading slash (must be relative)
 * - Forward slashes only (no Windows backslashes)
 * - Must be a relative path (no drive letters or absolute paths)
 * - Must not be empty
 * - Must not contain path traversal sequences (..)
 *
 * @param {string} filePath - Path to validate
 * @returns {Object} Validation result
 * @returns {boolean} returns.valid - Whether the path is valid
 * @returns {string[]} returns.errors - Array of error messages
 *
 * @example
 * const result = validatePathFormat('.agent-context/schema.json');
 * // => { valid: true, errors: [] }
 *
 * @example
 * const result = validatePathFormat('/absolute/path.json');
 * // => { valid: false, errors: ['Path has leading slash: /absolute/path.json'] }
 */
function validatePathFormat(filePath) {
  const errors = []

  // Check for empty or whitespace-only path
  if (!filePath || !PATH_PATTERNS.hasContent.test(filePath)) {
    errors.push(
      `Path is empty or whitespace-only\n  → Fix: Provide a valid relative path`
    )
    return { valid: false, errors }
  }

  if (!PATH_PATTERNS.noLeadingSlash.test(filePath)) {
    errors.push(
      `Path has leading slash: ${filePath}\n  → Fix: Use relative path (e.g., ".agent-context/file.json")`
    )
  }

  if (!PATH_PATTERNS.forwardSlashesOnly.test(filePath)) {
    errors.push(
      `Path contains backslashes: ${filePath}\n  → Fix: Use forward slashes only`
    )
  }

  if (!PATH_PATTERNS.isRelative.test(filePath)) {
    errors.push(
      `Path is not relative: ${filePath}\n  → Fix: Remove drive letter, absolute prefix, or URL scheme`
    )
  }

  if (!PATH_PATTERNS.noPathTraversal.test(filePath)) {
    errors.push(
      `Security: Path traversal detected: ${filePath}\n  → Fix: Remove ".." from path`
    )
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Validate that a JSON file exists, is within size limits, and is parseable
 *
 * Performs comprehensive validation of a JSON file:
 * 1. Checks file exists at the given path
 * 2. Validates file size is within acceptable limits (DoS protection)
 * 3. Attempts to parse JSON and returns parsed data
 *
 * @param {string} absolutePath - Absolute path to the JSON file on disk
 * @param {string} displayPath - Relative path for display in error messages
 * @returns {Object} Validation result
 * @returns {boolean} returns.valid - Whether the file is valid
 * @returns {string[]} returns.errors - Array of error messages
 * @returns {Object|null} returns.data - Parsed JSON data, or null if invalid
 *
 * @example
 * const result = validateJsonFile('/path/to/schema.json', 'schema.json');
 * if (result.valid) {
 *   console.log(result.data); // Parsed JSON object
 * }
 */
function validateJsonFile(absolutePath, displayPath) {
  const result = {
    valid: true,
    errors: [],
    data: null,
  }

  // Check file exists
  if (!fs.existsSync(absolutePath)) {
    result.valid = false
    result.errors.push(
      `File not found: ${displayPath}\n  → Fix: Create the file or update the path in context-bible.json`
    )
    return result
  }

  // Check file size (DoS protection)
  try {
    const stats = fs.statSync(absolutePath)
    if (stats.size > MAX_FILE_SIZE_BYTES) {
      result.valid = false
      result.errors.push(
        `File too large: ${displayPath} (${(stats.size / 1024 / 1024).toFixed(2)}MB)\n` +
          `  → Fix: File exceeds ${MAX_FILE_SIZE_BYTES / 1024 / 1024}MB limit`
      )
      return result
    }
  } catch (error) {
    result.valid = false
    result.errors.push(
      `Cannot read file stats: ${displayPath}: ${error.message}`
    )
    return result
  }

  // Parse JSON
  try {
    const content = fs.readFileSync(absolutePath, "utf-8")
    result.data = JSON.parse(content)
  } catch (error) {
    result.valid = false
    const lineMatch = error.message.match(/position (\d+)/)
    const positionHint = lineMatch ? ` (near position ${lineMatch[1]})` : ""
    result.errors.push(
      `Invalid JSON in ${displayPath}${positionHint}: ${error.message}\n` +
        `  → Fix: Validate JSON syntax using a JSON linter`
    )
  }

  return result
}

/**
 * Extract all schema paths from context-bible.json
 *
 * Iterates through the `schemas` object and collects all entries that have
 * a `path` property. Skips the `description` field of the schemas container.
 * Also validates that each schema object has a description field per project rules.
 *
 * @param {Object} contextBible - Parsed context-bible.json content
 * @param {Object} [contextBible.schemas] - Schemas container object
 * @returns {Object} Extraction result
 * @returns {Array<{name: string, path: string, hasDescription: boolean}>} returns.references - Schema references
 * @returns {string[]} returns.warnings - Validation warnings (missing descriptions)
 *
 * @example
 * const result = extractSchemaReferences(bible);
 * console.log(result.references);
 * // => [{name: 'navigationSchema', path: '.agent-context/navigation-schema.json', hasDescription: true}]
 */
function extractSchemaReferences(contextBible) {
  const references = []
  const warnings = []

  if (contextBible.schemas && typeof contextBible.schemas === "object") {
    for (const [name, schema] of Object.entries(contextBible.schemas)) {
      // Skip the description field of the schemas container
      if (name === "description") continue

      if (schema && typeof schema === "object" && schema.path) {
        // Check for required description field (project-context.md Rule #3)
        const hasDescription =
          schema.description &&
          typeof schema.description === "string" &&
          schema.description.trim() !== ""

        if (!hasDescription) {
          warnings.push(
            `Schema "${name}" missing description field\n` +
              `  → Fix: Add "description" field per project-context.md Rule #3`
          )
        }

        references.push({
          name,
          path: schema.path,
          hasDescription,
        })
      }
    }
  }

  return { references, warnings }
}

/**
 * Discover all JSON schema files in .agent-context/ directory
 *
 * Dynamically finds all .json files in the agent context directory,
 * excluding the context-bible.json master index.
 *
 * @param {string} agentContextDir - Absolute path to .agent-context/ directory
 * @returns {string[]} Array of schema filenames (e.g., ['navigation-schema.json'])
 */
function discoverSchemaFiles(agentContextDir) {
  if (!fs.existsSync(agentContextDir)) {
    return []
  }

  return fs.readdirSync(agentContextDir).filter(
    (f) =>
      f.endsWith(".json") && f !== CONTEXT_BIBLE_FILENAME && !f.startsWith(".") // Skip hidden files
  )
}

/**
 * Check for duplicate schema paths in references
 *
 * @param {Array<{name: string, path: string}>} references - Schema references
 * @returns {Object} Duplicate check result
 * @returns {boolean} returns.hasDuplicates - Whether duplicates were found
 * @returns {Array<{path: string, count: number, names: string[]}>} returns.duplicates - Duplicate path details
 */
function checkDuplicatePaths(references) {
  const pathCounts = {}
  references.forEach((ref) => {
    if (!pathCounts[ref.path]) {
      pathCounts[ref.path] = { count: 0, names: [] }
    }
    pathCounts[ref.path].count++
    pathCounts[ref.path].names.push(ref.name)
  })

  const duplicates = Object.entries(pathCounts)
    .filter(([_, data]) => data.count > 1)
    .map(([path, data]) => ({
      path,
      count: data.count,
      names: data.names,
    }))

  return {
    hasDuplicates: duplicates.length > 0,
    duplicates,
  }
}

/**
 * Check for circular self-references
 *
 * @param {Array<{name: string, path: string}>} references - Schema references
 * @returns {Object} Circular reference check result
 * @returns {boolean} returns.hasCircular - Whether circular references were found
 * @returns {string[]} returns.circularRefs - Names of schemas with circular refs
 */
function checkCircularReferences(references) {
  const circularRefs = references
    .filter((ref) => ref.path.includes(CONTEXT_BIBLE_FILENAME))
    .map((ref) => ref.name)

  return {
    hasCircular: circularRefs.length > 0,
    circularRefs,
  }
}

// =============================================================================
// MAIN EXECUTION
// =============================================================================

log("\n=== Context Bible Cross-Reference Validation ===\n")

const projectRoot = path.resolve(__dirname, "../..")
const agentContextDir = path.join(projectRoot, ".agent-context")
const contextBiblePath = path.join(agentContextDir, CONTEXT_BIBLE_FILENAME)

let allValid = true
const results = {
  contextBible: null,
  schemaReferences: [],
  pathFormatErrors: [],
  fileExistenceErrors: [],
  jsonParseErrors: [],
  descriptionWarnings: [],
  duplicatePathErrors: [],
  circularRefErrors: [],
  orphanedSchemas: [],
}

// Step 1: Validate context-bible.json exists and is valid JSON
log("Step 1: Validating context-bible.json...")
const contextBibleResult = validateJsonFile(
  contextBiblePath,
  ".agent-context/context-bible.json"
)

if (!contextBibleResult.valid) {
  log("  ❌ FAILED", { step: 1, status: "fail", file: "context-bible.json" })
  contextBibleResult.errors.forEach((err) => log(`     - ${err}`))
  process.exit(1)
}
log("  ✅ context-bible.json is valid JSON\n", {
  step: 1,
  status: "pass",
  file: "context-bible.json",
})
results.contextBible = contextBibleResult.data

// Step 2: Extract schema references and check for description warnings
log("Step 2: Extracting schema references...")
const extractResult = extractSchemaReferences(results.contextBible)
const schemaRefs = extractResult.references
results.schemaReferences = schemaRefs
results.descriptionWarnings = extractResult.warnings

if (schemaRefs.length === 0) {
  log("  ⚠️  No schema references found in context-bible.json")
} else {
  log(`  Found ${schemaRefs.length} schema references:`)
  schemaRefs.forEach((ref) => {
    const descStatus = ref.hasDescription ? "✅" : "⚠️"
    log(`     ${descStatus} ${ref.name}: ${ref.path}`)
  })
}

// Report description warnings (but don't fail on them - treat as warnings)
if (extractResult.warnings.length > 0) {
  log("\n  ⚠️  Description field warnings:")
  extractResult.warnings.forEach((warn) => log(`     - ${warn}`))
}
log("")

// Step 3: Check for duplicate paths
log("Step 3: Checking for duplicate paths...")
const duplicateResult = checkDuplicatePaths(schemaRefs)
if (duplicateResult.hasDuplicates) {
  allValid = false
  log("  ❌ Duplicate schema paths detected:")
  duplicateResult.duplicates.forEach((dup) => {
    const error = `Path "${dup.path}" referenced ${dup.count} times by: ${dup.names.join(", ")}\n  → Fix: Each schema should have a unique path`
    results.duplicatePathErrors.push(error)
    log(`     - ${error}`)
  })
} else {
  log("  ✅ No duplicate paths found")
}
log("")

// Step 4: Check for circular references
log("Step 4: Checking for circular references...")
const circularResult = checkCircularReferences(schemaRefs)
if (circularResult.hasCircular) {
  allValid = false
  log("  ❌ Circular references detected:")
  circularResult.circularRefs.forEach((name) => {
    const error = `Schema "${name}" references ${CONTEXT_BIBLE_FILENAME} (self-reference)\n  → Fix: context-bible.json cannot reference itself`
    results.circularRefErrors.push(error)
    log(`     - ${error}`)
  })
} else {
  log("  ✅ No circular references found")
}
log("")

// Step 5: Validate path formats
log("Step 5: Validating path formats...")
for (const ref of schemaRefs) {
  const formatResult = validatePathFormat(ref.path)
  if (!formatResult.valid) {
    allValid = false
    results.pathFormatErrors.push(...formatResult.errors)
    log(`  ❌ ${ref.name}:`, { step: 5, status: "fail", schema: ref.name })
    formatResult.errors.forEach((err) => log(`     - ${err}`))
  } else {
    log(`  ✅ ${ref.name}: path format valid`, {
      step: 5,
      status: "pass",
      schema: ref.name,
    })
  }
}
log("")

// Step 6: Validate file existence and JSON parsing
log("Step 6: Validating file existence and JSON syntax...")
for (const ref of schemaRefs) {
  const absolutePath = path.join(projectRoot, ref.path)

  // Check existence
  if (!fs.existsSync(absolutePath)) {
    allValid = false
    const error = `Schema "${ref.name}" references non-existent file: ${ref.path}\n  → Fix: Create the file or update the path in context-bible.json`
    results.fileExistenceErrors.push(error)
    log(`  ❌ ${ref.name}: file not found at ${ref.path}`)
    continue
  }

  // Validate JSON
  const jsonResult = validateJsonFile(absolutePath, ref.path)
  if (!jsonResult.valid) {
    allValid = false
    results.jsonParseErrors.push(...jsonResult.errors)
    log(`  ❌ ${ref.name}: ${jsonResult.errors.join(", ")}`)
  } else {
    log(`  ✅ ${ref.name}: exists and valid JSON`, {
      step: 6,
      status: "pass",
      schema: ref.name,
    })
  }
}
log("")

// Step 7: Dynamic discovery - verify all schema files are referenced
log("Step 7: Verifying all schema files are referenced (dynamic discovery)...")
const discoveredSchemas = discoverSchemaFiles(agentContextDir)
const referencedPaths = schemaRefs.map((ref) => path.basename(ref.path))

const orphanedSchemas = discoveredSchemas.filter(
  (schema) => !referencedPaths.includes(schema)
)

if (orphanedSchemas.length > 0) {
  allValid = false
  log("  ❌ Found schema files not referenced in context-bible.json:")
  orphanedSchemas.forEach((schema) => {
    const error = `Orphaned schema: ${schema}\n  → Fix: Add reference in context-bible.json or remove the file`
    results.orphanedSchemas.push(error)
    log(`     - ${error}`)
  })
} else {
  log(
    `  ✅ All ${discoveredSchemas.length} discovered schema files are referenced`
  )
}
log("")

// Step 8: Verify expected schema count
log(
  `Step 8: Verifying expected schema count (${EXPECTED_SCHEMA_COUNT} schemas)...`
)
const allSchemaFiles = [CONTEXT_BIBLE_FILENAME, ...discoveredSchemas]

if (allSchemaFiles.length !== EXPECTED_SCHEMA_COUNT) {
  log(
    `  ⚠️ Found ${allSchemaFiles.length} schema files, expected ${EXPECTED_SCHEMA_COUNT}`
  )
  log(`     Current files: ${allSchemaFiles.join(", ")}`)
} else {
  log(`  ✅ ${EXPECTED_SCHEMA_COUNT} schema files confirmed:`)
  allSchemaFiles.forEach((file) => {
    const status = fs.existsSync(path.join(agentContextDir, file)) ? "✅" : "❌"
    log(`     ${status} ${file}`)
  })
}
log("")

// Summary
log("=== Summary ===\n")

log(`Schema references checked: ${schemaRefs.length}`)
log(`Path format errors: ${results.pathFormatErrors.length}`)
log(`File existence errors: ${results.fileExistenceErrors.length}`)
log(`JSON parse errors: ${results.jsonParseErrors.length}`)
log(`Description warnings: ${results.descriptionWarnings.length}`)
log(`Duplicate path errors: ${results.duplicatePathErrors.length}`)
log(`Circular reference errors: ${results.circularRefErrors.length}`)
log(`Orphaned schema files: ${results.orphanedSchemas.length}`)

if (allValid) {
  log("\n✅ All cross-references are valid!\n")
  log("Cross-reference validation confirms:")
  log(`  - All ${EXPECTED_SCHEMA_COUNT} schema files exist in .agent-context/`)
  log("  - All paths in context-bible.json point to existing files")
  log("  - All referenced files are valid JSON")
  log("  - All paths follow format conventions (relative, no leading slash)")
  log("  - No duplicate paths or circular references")
  log("  - All discovered schemas are referenced in context-bible.json")

  if (results.descriptionWarnings.length > 0) {
    log(
      `\n⚠️  Note: ${results.descriptionWarnings.length} description warning(s) found (non-blocking)`
    )
  }

  if (STRUCTURED_OUTPUT) {
    console.log(
      JSON.stringify({
        status: "pass",
        schemasChecked: schemaRefs.length,
        warnings: results.descriptionWarnings.length,
      })
    )
  }
  process.exit(0)
} else {
  log("\n❌ Cross-reference validation failed.\n")

  if (results.pathFormatErrors.length > 0) {
    log("Path format errors:")
    results.pathFormatErrors.forEach((err) => log(`  - ${err}`))
  }

  if (results.fileExistenceErrors.length > 0) {
    log("File existence errors:")
    results.fileExistenceErrors.forEach((err) => log(`  - ${err}`))
  }

  if (results.jsonParseErrors.length > 0) {
    log("JSON parse errors:")
    results.jsonParseErrors.forEach((err) => log(`  - ${err}`))
  }

  if (results.duplicatePathErrors.length > 0) {
    log("Duplicate path errors:")
    results.duplicatePathErrors.forEach((err) => log(`  - ${err}`))
  }

  if (results.circularRefErrors.length > 0) {
    log("Circular reference errors:")
    results.circularRefErrors.forEach((err) => log(`  - ${err}`))
  }

  if (results.orphanedSchemas.length > 0) {
    log("Orphaned schema files:")
    results.orphanedSchemas.forEach((err) => log(`  - ${err}`))
  }

  if (STRUCTURED_OUTPUT) {
    console.log(
      JSON.stringify({
        status: "fail",
        errors: {
          pathFormat: results.pathFormatErrors.length,
          fileExistence: results.fileExistenceErrors.length,
          jsonParse: results.jsonParseErrors.length,
          duplicatePath: results.duplicatePathErrors.length,
          circularRef: results.circularRefErrors.length,
          orphanedSchemas: results.orphanedSchemas.length,
        },
      })
    )
  }
  process.exit(1)
}
