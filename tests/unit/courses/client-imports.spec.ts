/**
 * Course data (every lesson's steps, every exam question) stays on the
 * server: client components get what they need as props and import routes
 * and keys from the data-free `@/lib/courses/constants`. Likewise every
 * course illustration at once: client code uses `art/lazy-course-art.tsx`.
 * This walks the value imports of every client module and fails on any path
 * into either.
 */

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import path from "node:path"
import ts from "typescript"
import { expect, test } from "@playwright/test"

const REPO_ROOT = path.resolve(__dirname, "../../..")
const DATA_DIR = path.join(REPO_ROOT, "src/data/courses")
// Types only, so nothing of it reaches a bundle
const DATA_TYPES = path.join(DATA_DIR, "types.ts")
const ALL_ART = path.join(
  REPO_ROOT,
  "src/components/Courses/art/course-art.tsx"
)
const USE_CLIENT = /^(?:\s|\/\/[^\n]*\n|\/\*[\s\S]*?\*\/)*["']use client["']/

const sourceFiles = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory())
      return entry.name === "node_modules" ? [] : sourceFiles(full)
    return /\.tsx?$/.test(entry.name) && !entry.name.endsWith(".d.ts")
      ? [full]
      : []
  })

const resolveImport = (from: string, spec: string) => {
  const base = spec.startsWith("@/")
    ? path.join(REPO_ROOT, "src", spec.slice(2))
    : spec.startsWith(".")
      ? path.resolve(path.dirname(from), spec)
      : null
  if (!base) return undefined
  return [".ts", ".tsx", "/index.ts", "/index.tsx", ""]
    .map((ext) => base + ext)
    .find(
      (file) =>
        /\.tsx?$/.test(file) && existsSync(file) && statSync(file).isFile()
    )
}

/** Local modules `file` loads at runtime: type-only imports are erased */
const valueImports = (file: string): string[] => {
  const source = ts.createSourceFile(
    file,
    readFileSync(file, "utf8"),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  )
  const specs: string[] = []
  const walk = (node: ts.Node) => {
    if (ts.isImportDeclaration(node)) {
      const clause = node.importClause
      const bindings = clause?.namedBindings
      const typeOnly =
        !!clause &&
        (clause.isTypeOnly ||
          (!clause.name &&
            !!bindings &&
            ts.isNamedImports(bindings) &&
            bindings.elements.every((el) => el.isTypeOnly)))
      if (!typeOnly && ts.isStringLiteral(node.moduleSpecifier))
        specs.push(node.moduleSpecifier.text)
    } else if (
      ts.isExportDeclaration(node) &&
      !node.isTypeOnly &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      specs.push(node.moduleSpecifier.text)
    } else if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      node.arguments[0] &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      specs.push(node.arguments[0].text)
    }
    ts.forEachChild(node, walk)
  }
  walk(source)
  return specs
    .map((spec) => resolveImport(file, spec))
    .filter((dep): dep is string => !!dep)
}

test("no client module bundles the course data or all course art", () => {
  const clientFiles = ["src", "app"]
    .flatMap((dir) => sourceFiles(path.join(REPO_ROOT, dir)))
    .filter((file) => USE_CLIENT.test(readFileSync(file, "utf8")))
  expect(clientFiles.length).toBeGreaterThan(100)

  // Breadth-first, so each module's recorded path is a shortest one
  const via = new Map<string, string[]>(
    clientFiles.map((file) => [file, [file]])
  )
  const queue = [...clientFiles]
  const leaks: string[] = []
  for (const file of queue) {
    for (const dep of valueImports(file)) {
      if (via.has(dep)) continue
      const chain = [...via.get(file)!, dep]
      via.set(dep, chain)
      if (
        dep === ALL_ART ||
        (dep.startsWith(`${DATA_DIR}${path.sep}`) && dep !== DATA_TYPES)
      )
        leaks.push(chain.map((f) => path.relative(REPO_ROOT, f)).join(" -> "))
      else queue.push(dep)
    }
  }
  expect(leaks).toEqual([])
})
