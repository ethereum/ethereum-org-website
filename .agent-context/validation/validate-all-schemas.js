#!/usr/bin/env node

/**
 * Master validation script for all Context Bible schemas
 *
 * Validates all 4 schema files:
 * - context-bible.json
 * - navigation-schema.json
 * - data-bible.json
 * - design-system.json
 *
 * NO EXTERNAL DEPENDENCIES - runs with plain Node.js
 *
 * Usage: node .agent-context/validation/validate-all-schemas.js
 *
 * @fileoverview Schema validation for the Context Bible project.
 * @module validate-all-schemas
 *
 * Exit Codes:
 * @returns {number} 0 - All schemas valid, no errors (warnings may exist)
 * @returns {number} 1 - One or more schemas failed validation (has errors)
 */

const fs = require("fs")
const path = require("path")

/**
 * Minimum number of properties an object must have to require a description field.
 * Objects with only 1 property are considered trivial and don't need descriptions.
 * @constant {number}
 */
const MIN_PROPERTIES_FOR_DESCRIPTION = 2

/**
 * JSON Schema structural keywords that are containers for schema objects,
 * not data objects that need descriptions. Their parent objects already have
 * descriptions (e.g., the navSection has a description, its properties just define fields).
 *
 * We skip these during description validation but still recurse into their children.
 *
 * CUSTOM KEYWORDS:
 * - 'fields': Used in data-bible.json as a container for field definitions
 *   (e.g., schemas.docs.fields). This is NOT a JSON Schema standard keyword
 *   but follows the same structural pattern as 'properties'.
 *
 * @constant {string[]}
 */
const JSON_SCHEMA_STRUCTURAL_KEYWORDS = [
  "properties", // Object property definitions
  "patternProperties", // Pattern-matched property definitions
  "definitions", // Reusable schema definitions (Draft-07)
  "$defs", // Reusable schema definitions (Draft 2019-09+)
  "items", // Array item schema
  "oneOf", // Schema alternatives
  "allOf", // Schema composition
  "anyOf", // Schema alternatives
  "not", // Schema negation
  "if", // Conditional schema
  "then", // Conditional schema
  "else", // Conditional schema
  "additionalProperties", // Additional property schema
  "additionalItems", // Additional item schema
  "dependentSchemas", // Dependent schemas
  "fields", // Field definitions container (data-bible.json pattern)
]

function validateSchema(schemaName, schemaPath, requiredFields = []) {
  const result = {
    valid: true,
    errors: [],
    warnings: [],
  }

  // Check file exists
  if (!fs.existsSync(schemaPath)) {
    result.valid = false
    result.errors.push(`File not found: ${schemaPath}`)
    return result
  }

  // Parse JSON
  let schema
  try {
    const content = fs.readFileSync(schemaPath, "utf-8")
    schema = JSON.parse(content)
  } catch (error) {
    result.valid = false
    result.errors.push(`Invalid JSON: ${error.message}`)
    return result
  }

  // Validate $schema reference
  if (schema["$schema"] !== "http://json-schema.org/draft-07/schema#") {
    result.errors.push(
      "Missing or incorrect $schema reference. Expected Draft-07."
    )
    result.valid = false
  }

  // Check required fields
  for (const field of requiredFields) {
    if (!schema[field]) {
      result.warnings.push(`Missing recommended field: ${field}`)
    }
  }

  // Check for description fields on major properties
  const checkDescriptions = (obj, path = "") => {
    if (typeof obj !== "object" || obj === null) {
      return
    }

    // Handle arrays: recurse into array elements (addresses array description check review item)
    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        checkDescriptions(item, `${path}[${index}]`)
      })
      return
    }

    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key

      // Skip certain keys that are known to not need descriptions
      if (key === "$schema" || key === "examples" || key === "_comment") {
        continue
      }

      // Skip JSON Schema structural keywords (using the constant defined at module level)
      // Still recurse into structural keywords to check their children,
      // but don't flag the structural keyword itself as missing description
      if (JSON_SCHEMA_STRUCTURAL_KEYWORDS.includes(key)) {
        if (typeof value === "object" && value !== null) {
          checkDescriptions(value, currentPath)
        }
        continue
      }

      // Check if this is a major object (has nested properties)
      // Edge case: Objects with exactly MIN_PROPERTIES_FOR_DESCRIPTION (2) properties trigger
      // description warning. E.g., { "foo": 1, "bar": 2 } requires description, { "foo": 1 } does not.
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        const hasEnoughProps =
          Object.keys(value).length >= MIN_PROPERTIES_FOR_DESCRIPTION
        const hasDescription =
          value.description && typeof value.description === "string"
        const isDescriptionEmpty =
          hasDescription && value.description.trim() === ""

        if (!hasDescription && hasEnoughProps) {
          result.warnings.push(`Missing description at: ${currentPath}`)
        } else if (isDescriptionEmpty && hasEnoughProps) {
          result.warnings.push(`Empty description at: ${currentPath}`)
        }
        checkDescriptions(value, currentPath)
      }
    }
  }

  checkDescriptions(schema)

  return result
}

// Main execution
console.log("\n=== Context Bible Schema Validation ===\n")

const baseDir = path.resolve(__dirname, "..")
const schemas = [
  {
    name: "Context Bible (Master Index)",
    path: path.join(baseDir, "context-bible.json"),
    requiredFields: ["schemas", "techStack", "projectStructure"],
  },
  {
    name: "Navigation Schema",
    path: path.join(baseDir, "navigation-schema.json"),
    requiredFields: ["description"],
  },
  {
    name: "Data Bible",
    path: path.join(baseDir, "data-bible.json"),
    requiredFields: ["description", "schemas"],
  },
  {
    name: "Design System",
    path: path.join(baseDir, "design-system.json"),
    requiredFields: ["version", "maintenance", "colorTokens"],
  },
]

let allValid = true
const results = []

for (const { name, path: schemaPath, requiredFields } of schemas) {
  console.log(`Validating ${name}...`)
  const result = validateSchema(name, schemaPath, requiredFields)
  results.push({ name, result })

  if (!result.valid) {
    allValid = false
    console.log(`  ❌ FAILED`)
    result.errors.forEach((err) => console.log(`     - ${err}`))
  } else if (result.warnings.length > 0) {
    console.log(`  ⚠️  PASSED with warnings`)
    result.warnings.forEach((warn) => console.log(`     - ${warn}`))
  } else {
    console.log(`  ✅ PASSED`)
  }
  console.log("")
}

// Summary
console.log("=== Summary ===\n")

const passed = results.filter((r) => r.result.valid).length
const failed = results.filter((r) => !r.result.valid).length
const warnings = results.reduce((sum, r) => sum + r.result.warnings.length, 0)

console.log(`Total schemas: ${schemas.length}`)
console.log(`Passed: ${passed}`)
console.log(`Failed: ${failed}`)
console.log(`Warnings: ${warnings}`)

if (allValid) {
  console.log("\n✅ All schemas are valid!\n")
  process.exit(0)
} else {
  console.log("\n❌ Some schemas failed validation.\n")
  process.exit(1)
}
