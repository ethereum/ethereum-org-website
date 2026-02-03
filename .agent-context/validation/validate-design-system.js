#!/usr/bin/env node

/**
 * Standalone validation script for design-system.json
 *
 * This script validates the design system schema against JSON Schema Draft-07
 * and checks structural requirements (descriptions, examples, version, etc.).
 *
 * NO EXTERNAL DEPENDENCIES - runs with plain Node.js
 *
 * Usage: node .agent-context/validation/validate-design-system.js
 */

const fs = require("fs")
const path = require("path")

function validateDesignSystem() {
  const result = {
    valid: true,
    errors: [],
    warnings: [],
  }

  const schemaPath = path.resolve(__dirname, "../design-system.json")

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

  // Validate version field
  if (!schema["version"]) {
    result.errors.push('Missing required "version" field.')
    result.valid = false
  } else if (typeof schema["version"] !== "string") {
    result.errors.push('"version" field must be a string.')
    result.valid = false
  }

  // Validate maintenance section
  if (!schema["maintenance"]) {
    result.errors.push('Missing required "maintenance" section.')
    result.valid = false
  }

  // Validate sourceMapping section
  if (!schema["sourceMapping"]) {
    result.errors.push('Missing required "sourceMapping" section.')
    result.valid = false
  }

  // Required top-level sections
  const requiredSections = [
    "colorTokens",
    "semanticTokens",
    "typography",
    "spacing",
    "shadows",
    "zIndex",
    "theming",
    "componentPatterns",
    "examples",
  ]

  for (const section of requiredSections) {
    if (!schema[section]) {
      result.warnings.push(`Missing section: ${section}`)
    } else {
      const sectionData = schema[section]
      if (!sectionData["description"] && section !== "examples") {
        result.warnings.push(
          `Section "${section}" is missing a "description" field.`
        )
      }
    }
  }

  // Validate examples array
  if (schema["examples"]) {
    if (!Array.isArray(schema["examples"])) {
      result.errors.push('"examples" must be an array.')
      result.valid = false
    } else if (schema["examples"].length === 0) {
      result.warnings.push('"examples" array is empty.')
    }
  } else {
    result.errors.push('Missing required "examples" array.')
    result.valid = false
  }

  return result
}

// Main execution
const result = validateDesignSystem()

console.log("\n=== Design System Schema Validation ===\n")

if (result.errors.length > 0) {
  console.log("❌ Errors:")
  result.errors.forEach((err) => console.log(`   - ${err}`))
}

if (result.warnings.length > 0) {
  console.log("\n⚠️  Warnings:")
  result.warnings.forEach((warn) => console.log(`   - ${warn}`))
}

if (result.valid) {
  console.log("✅ Design system schema is valid!\n")
  process.exit(0)
} else {
  console.log("\n❌ Validation failed.\n")
  process.exit(1)
}
