#!/usr/bin/env node

/**
 * Test Suite for validate-cross-references.js
 *
 * Tests the cross-reference validation logic without external test frameworks.
 * Uses Node.js assert module for assertions and fs for test fixture management.
 *
 * Test Categories:
 * 1. Path format validation (leading slash, backslashes, relative paths)
 * 2. JSON parsing (valid/invalid JSON)
 * 3. File existence checks
 * 4. Schema reference extraction
 * 5. Edge cases (empty schemas, missing fields)
 *
 * Usage: node .agent-context/validation/__tests__/validate-cross-references.test.js
 *
 * Exit Codes:
 * @returns {number} 0 - All tests passed
 * @returns {number} 1 - One or more tests failed
 *
 * @fileoverview Test suite for cross-reference validation
 * @module validate-cross-references.test
 */

const assert = require("assert")
const fs = require("fs")
const path = require("path")

// Test result tracking
let testsRun = 0
let testsPassed = 0
let testsFailed = 0
const failedTests = []

/**
 * Run a single test case
 * @param {string} description - Test description
 * @param {Function} testFn - Test function to execute
 */
function test(description, testFn) {
  testsRun++
  try {
    testFn()
    testsPassed++
    console.log(`  ✅ ${description}`)
  } catch (error) {
    testsFailed++
    failedTests.push({ description, error: error.message })
    console.log(`  ❌ ${description}`)
    console.log(`     Error: ${error.message}`)
  }
}

/**
 * Group tests under a describe block
 * @param {string} suiteName - Suite description
 * @param {Function} suiteFn - Suite function containing tests
 */
function describe(suiteName, suiteFn) {
  console.log(`\n📋 ${suiteName}`)
  suiteFn()
}

// =============================================================================
// Import functions from validate-cross-references.js
// We need to extract the pure functions for unit testing
// =============================================================================

/**
 * Path format validation regex patterns (copy from main script for testing)
 * @constant {Object}
 */
const PATH_PATTERNS = {
  noLeadingSlash: /^[^/]/,
  forwardSlashesOnly: /^[^\\]+$/,
  isRelative: /^(?!\/|[a-zA-Z]:)/,
}

/**
 * Validate path format follows project conventions
 * Copy of function from validate-cross-references.js for unit testing
 * @param {string} filePath - Path to validate
 * @returns {Object} - { valid: boolean, errors: string[] }
 */
function validatePathFormat(filePath) {
  const errors = []

  if (!PATH_PATTERNS.noLeadingSlash.test(filePath)) {
    errors.push(`Path has leading slash: ${filePath}`)
  }

  if (!PATH_PATTERNS.forwardSlashesOnly.test(filePath)) {
    errors.push(`Path contains backslashes: ${filePath}`)
  }

  if (!PATH_PATTERNS.isRelative.test(filePath)) {
    errors.push(`Path is not relative: ${filePath}`)
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Validate that a JSON file exists and is parseable
 * Copy of function from validate-cross-references.js for unit testing
 * @param {string} absolutePath - Absolute path to the JSON file
 * @param {string} displayPath - Path for display in error messages
 * @returns {Object} - { valid: boolean, errors: string[], data: Object|null }
 */
function validateJsonFile(absolutePath, displayPath) {
  const result = {
    valid: true,
    errors: [],
    data: null,
  }

  if (!fs.existsSync(absolutePath)) {
    result.valid = false
    result.errors.push(`File not found: ${displayPath}`)
    return result
  }

  try {
    const content = fs.readFileSync(absolutePath, "utf-8")
    result.data = JSON.parse(content)
  } catch (error) {
    result.valid = false
    result.errors.push(`Invalid JSON in ${displayPath}: ${error.message}`)
  }

  return result
}

/**
 * Extract all schema paths from context-bible.json
 * Copy of function from validate-cross-references.js for unit testing
 * @param {Object} contextBible - Parsed context-bible.json content
 * @returns {Array<{name: string, path: string}>} - Array of schema references
 */
function extractSchemaReferences(contextBible) {
  const references = []

  if (contextBible.schemas && typeof contextBible.schemas === "object") {
    for (const [name, schema] of Object.entries(contextBible.schemas)) {
      if (name === "description") continue

      if (schema && typeof schema === "object" && schema.path) {
        references.push({
          name,
          path: schema.path,
        })
      }
    }
  }

  return references
}

// =============================================================================
// Test Fixtures Setup
// =============================================================================

const FIXTURES_DIR = path.join(__dirname, "fixtures")
const VALID_JSON = { test: "value", nested: { key: "data" } }
const INVALID_JSON_CONTENT = '{ "broken": json }'

/**
 * Create test fixtures directory and files
 */
function setupFixtures() {
  // Create fixtures directory if it doesn't exist
  if (!fs.existsSync(FIXTURES_DIR)) {
    fs.mkdirSync(FIXTURES_DIR, { recursive: true })
  }

  // Create valid JSON fixture
  fs.writeFileSync(
    path.join(FIXTURES_DIR, "valid.json"),
    JSON.stringify(VALID_JSON, null, 2)
  )

  // Create invalid JSON fixture
  fs.writeFileSync(
    path.join(FIXTURES_DIR, "invalid.json"),
    INVALID_JSON_CONTENT
  )

  // Create test context-bible.json with valid structure
  fs.writeFileSync(
    path.join(FIXTURES_DIR, "context-bible-valid.json"),
    JSON.stringify(
      {
        schemas: {
          description: "Test schemas container",
          testSchema: {
            description: "Test schema",
            path: ".agent-context/validation/__tests__/fixtures/valid.json",
          },
        },
      },
      null,
      2
    )
  )

  // Create test context-bible.json with missing description
  fs.writeFileSync(
    path.join(FIXTURES_DIR, "context-bible-no-desc.json"),
    JSON.stringify(
      {
        schemas: {
          testSchema: {
            path: ".agent-context/validation/__tests__/fixtures/valid.json",
            // Missing: description field
          },
        },
      },
      null,
      2
    )
  )

  // Create test context-bible.json with empty schemas
  fs.writeFileSync(
    path.join(FIXTURES_DIR, "context-bible-empty.json"),
    JSON.stringify(
      {
        schemas: {},
      },
      null,
      2
    )
  )

  // Create test context-bible.json with duplicate paths
  fs.writeFileSync(
    path.join(FIXTURES_DIR, "context-bible-duplicates.json"),
    JSON.stringify(
      {
        schemas: {
          schema1: {
            description: "First schema",
            path: ".agent-context/validation/__tests__/fixtures/valid.json",
          },
          schema2: {
            description: "Second schema - duplicate path",
            path: ".agent-context/validation/__tests__/fixtures/valid.json",
          },
        },
      },
      null,
      2
    )
  )
}

/**
 * Clean up test fixtures
 */
function teardownFixtures() {
  if (fs.existsSync(FIXTURES_DIR)) {
    const files = fs.readdirSync(FIXTURES_DIR)
    files.forEach((file) => {
      fs.unlinkSync(path.join(FIXTURES_DIR, file))
    })
    fs.rmdirSync(FIXTURES_DIR)
  }
}

// =============================================================================
// Test Suites
// =============================================================================

console.log("\n=== validate-cross-references.js Test Suite ===\n")
console.log("Setting up test fixtures...")
setupFixtures()

// -----------------------------------------------------------------------------
// Test Suite: Path Format Validation
// -----------------------------------------------------------------------------

describe("validatePathFormat - Leading Slash Detection", () => {
  test("should pass for relative path without leading slash", () => {
    const result = validatePathFormat(".agent-context/schema.json")
    assert.strictEqual(result.valid, true)
    assert.strictEqual(result.errors.length, 0)
  })

  test("should fail for path with leading slash", () => {
    const result = validatePathFormat("/absolute/path.json")
    assert.strictEqual(result.valid, false)
    assert.ok(result.errors.some((e) => e.includes("leading slash")))
  })

  test("should pass for path starting with dot", () => {
    const result = validatePathFormat("./relative/path.json")
    assert.strictEqual(result.valid, true)
  })
})

describe("validatePathFormat - Backslash Detection", () => {
  test("should pass for forward slashes only", () => {
    const result = validatePathFormat("path/to/file.json")
    assert.strictEqual(result.valid, true)
  })

  test("should fail for path with backslashes", () => {
    const result = validatePathFormat("path\\to\\file.json")
    assert.strictEqual(result.valid, false)
    assert.ok(result.errors.some((e) => e.includes("backslashes")))
  })

  test("should fail for mixed slashes", () => {
    const result = validatePathFormat("path/to\\file.json")
    assert.strictEqual(result.valid, false)
  })
})

describe("validatePathFormat - Absolute Path Detection", () => {
  test("should pass for relative path", () => {
    const result = validatePathFormat(".agent-context/file.json")
    assert.strictEqual(result.valid, true)
  })

  test("should fail for Unix absolute path", () => {
    const result = validatePathFormat("/home/user/file.json")
    assert.strictEqual(result.valid, false)
    assert.ok(
      result.errors.some(
        (e) => e.includes("leading slash") || e.includes("not relative")
      )
    )
  })

  test("should fail for Windows drive path", () => {
    const result = validatePathFormat("C:/path/to/file.json")
    assert.strictEqual(result.valid, false)
    assert.ok(result.errors.some((e) => e.includes("not relative")))
  })
})

// -----------------------------------------------------------------------------
// Test Suite: JSON File Validation
// -----------------------------------------------------------------------------

describe("validateJsonFile - File Existence", () => {
  test("should pass for existing valid JSON file", () => {
    const filePath = path.join(FIXTURES_DIR, "valid.json")
    const result = validateJsonFile(filePath, "fixtures/valid.json")
    assert.strictEqual(result.valid, true)
    assert.deepStrictEqual(result.data, VALID_JSON)
  })

  test("should fail for non-existent file", () => {
    const filePath = path.join(FIXTURES_DIR, "does-not-exist.json")
    const result = validateJsonFile(filePath, "fixtures/does-not-exist.json")
    assert.strictEqual(result.valid, false)
    assert.ok(result.errors.some((e) => e.includes("not found")))
    assert.strictEqual(result.data, null)
  })
})

describe("validateJsonFile - JSON Parsing", () => {
  test("should fail for invalid JSON content", () => {
    const filePath = path.join(FIXTURES_DIR, "invalid.json")
    const result = validateJsonFile(filePath, "fixtures/invalid.json")
    assert.strictEqual(result.valid, false)
    assert.ok(result.errors.some((e) => e.includes("Invalid JSON")))
    assert.strictEqual(result.data, null)
  })

  test("should return parsed data for valid JSON", () => {
    const filePath = path.join(FIXTURES_DIR, "valid.json")
    const result = validateJsonFile(filePath, "fixtures/valid.json")
    assert.strictEqual(result.valid, true)
    assert.ok(result.data !== null)
    assert.strictEqual(result.data.test, "value")
  })
})

// -----------------------------------------------------------------------------
// Test Suite: Schema Reference Extraction
// -----------------------------------------------------------------------------

describe("extractSchemaReferences - Valid Structure", () => {
  test("should extract schema references from valid context-bible", () => {
    const contextBible = {
      schemas: {
        description: "Schemas container",
        navigationSchema: {
          description: "Nav schema",
          path: ".agent-context/navigation-schema.json",
        },
        dataBible: {
          description: "Data bible",
          path: ".agent-context/data-bible.json",
        },
      },
    }
    const refs = extractSchemaReferences(contextBible)
    assert.strictEqual(refs.length, 2)
    assert.strictEqual(refs[0].name, "navigationSchema")
    assert.strictEqual(refs[0].path, ".agent-context/navigation-schema.json")
  })

  test("should skip description field in schemas object", () => {
    const contextBible = {
      schemas: {
        description: "Should be skipped",
        testSchema: {
          description: "Test",
          path: "test.json",
        },
      },
    }
    const refs = extractSchemaReferences(contextBible)
    assert.strictEqual(refs.length, 1)
    assert.strictEqual(refs[0].name, "testSchema")
  })
})

describe("extractSchemaReferences - Empty/Missing Schemas", () => {
  test("should return empty array for empty schemas object", () => {
    const contextBible = { schemas: {} }
    const refs = extractSchemaReferences(contextBible)
    assert.strictEqual(refs.length, 0)
  })

  test("should return empty array for missing schemas", () => {
    const contextBible = { other: "data" }
    const refs = extractSchemaReferences(contextBible)
    assert.strictEqual(refs.length, 0)
  })

  test("should return empty array for null input", () => {
    const refs = extractSchemaReferences({})
    assert.strictEqual(refs.length, 0)
  })
})

describe("extractSchemaReferences - Invalid Schema Objects", () => {
  test("should skip schema objects without path field", () => {
    const contextBible = {
      schemas: {
        validSchema: {
          description: "Has path",
          path: "valid.json",
        },
        invalidSchema: {
          description: "No path field",
          // Missing: path
        },
      },
    }
    const refs = extractSchemaReferences(contextBible)
    assert.strictEqual(refs.length, 1)
    assert.strictEqual(refs[0].name, "validSchema")
  })

  test("should skip non-object schema entries", () => {
    const contextBible = {
      schemas: {
        stringEntry: "just a string",
        numberEntry: 123,
        validSchema: {
          path: "valid.json",
        },
      },
    }
    const refs = extractSchemaReferences(contextBible)
    assert.strictEqual(refs.length, 1)
  })
})

// -----------------------------------------------------------------------------
// Test Suite: Integration Tests with Real Files
// -----------------------------------------------------------------------------

describe("Integration - Real context-bible.json", () => {
  // Path from .agent-context/validation/__tests__/ up 3 levels to project root
  const projectRoot = path.resolve(__dirname, "../../..")
  const realContextBible = path.join(
    projectRoot,
    ".agent-context",
    "context-bible.json"
  )

  test("should validate real context-bible.json exists", () => {
    const result = validateJsonFile(
      realContextBible,
      ".agent-context/context-bible.json"
    )
    assert.strictEqual(
      result.valid,
      true,
      "Real context-bible.json should be valid JSON"
    )
  })

  test("should extract 3 schema references from real context-bible.json", () => {
    const result = validateJsonFile(
      realContextBible,
      ".agent-context/context-bible.json"
    )
    if (result.valid) {
      const refs = extractSchemaReferences(result.data)
      assert.strictEqual(refs.length, 3, "Should have 3 schema references")

      // Verify expected schemas exist
      const schemaNames = refs.map((r) => r.name)
      assert.ok(
        schemaNames.includes("navigationSchema"),
        "Should have navigationSchema"
      )
      assert.ok(schemaNames.includes("dataBible"), "Should have dataBible")
      assert.ok(
        schemaNames.includes("designSystem"),
        "Should have designSystem"
      )
    }
  })

  test("should validate all referenced schema paths are relative", () => {
    const result = validateJsonFile(
      realContextBible,
      ".agent-context/context-bible.json"
    )
    if (result.valid) {
      const refs = extractSchemaReferences(result.data)
      refs.forEach((ref) => {
        const pathResult = validatePathFormat(ref.path)
        assert.strictEqual(
          pathResult.valid,
          true,
          `Path ${ref.path} should be valid relative path`
        )
      })
    }
  })

  test("should verify all referenced files exist", () => {
    const result = validateJsonFile(
      realContextBible,
      ".agent-context/context-bible.json"
    )
    if (result.valid) {
      const refs = extractSchemaReferences(result.data)
      refs.forEach((ref) => {
        const absolutePath = path.join(projectRoot, ref.path)
        assert.ok(
          fs.existsSync(absolutePath),
          `Referenced file ${ref.path} should exist`
        )
      })
    }
  })
})

// =============================================================================
// Test Cleanup and Summary
// =============================================================================

console.log("\n\nCleaning up test fixtures...")
teardownFixtures()

console.log("\n=== Test Summary ===\n")
console.log(`Total tests: ${testsRun}`)
console.log(`Passed: ${testsPassed}`)
console.log(`Failed: ${testsFailed}`)

if (failedTests.length > 0) {
  console.log("\n❌ Failed Tests:")
  failedTests.forEach(({ description, error }) => {
    console.log(`  - ${description}: ${error}`)
  })
  console.log(`\n❌ ${testsFailed} test(s) failed\n`)
  process.exit(1)
} else {
  console.log(`\n✅ All ${testsRun} tests passed!\n`)
  process.exit(0)
}
