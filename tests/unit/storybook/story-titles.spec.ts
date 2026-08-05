// Enforces the repo-mirrored Storybook taxonomy (issue #18967). The top-level
// title segment is derived from the file's location, so "which section does
// this belong in" is never a judgment call and the sidebar can't re-accrete
// competing schemes. Titles are read from the AST, not a regex, because
// Prettier wraps long title values onto their own line.

import { readdirSync, readFileSync, statSync } from "node:fs"
import path from "node:path"
import ts from "typescript"
import { expect, test } from "@playwright/test"

const REPO_ROOT = path.resolve(__dirname, "../../..")

/**
 * Longest prefix wins, so `src/components/ui/` must be checked before
 * `src/components/`. Keep in sync with the `stories` globs in
 * `.storybook/main.ts`.
 */
const TAXONOMY = [
  { prefix: "src/components/ui/", section: "UI" },
  { prefix: "src/components/", section: "Components" },
  { prefix: "src/layouts/", section: "Layouts" },
  { prefix: "src/styles/", section: "Design System" },
  { prefix: "app/", section: "Pages" },
] as const

const SEARCH_ROOTS = ["src", "app"]
const SKIP_DIRS = new Set(["node_modules", ".next", "storybook-static"])

/** `Section / Group / Name` -- " / "-separated, no bare slashes in a segment. */
const TITLE_FORMAT = /^[^/]+(?: \/ [^/]+)+$/

/** `app-card.stories.tsx` -- kebab-case, matching the repo's file convention. */
const FILENAME_FORMAT = /^[a-z0-9]+(-[a-z0-9]+)*\.stories\.tsx?$/

const findStoryFiles = (dir: string): string[] => {
  const out: string[] = []
  for (const entry of readdirSync(path.join(REPO_ROOT, dir))) {
    if (SKIP_DIRS.has(entry)) continue
    const rel = path.join(dir, entry)
    if (statSync(path.join(REPO_ROOT, rel)).isDirectory()) {
      out.push(...findStoryFiles(rel))
    } else if (/\.stories\.tsx?$/.test(entry)) {
      out.push(rel)
    }
  }
  return out
}

/** Strips `satisfies Meta<...>`, `as const`, and parens off an initializer. */
const unwrap = (node: ts.Expression): ts.Expression => {
  if (
    ts.isSatisfiesExpression(node) ||
    ts.isAsExpression(node) ||
    ts.isParenthesizedExpression(node)
  ) {
    return unwrap(node.expression)
  }
  return node
}

/**
 * The story meta object: `const meta = {...}` (the dominant form) or a bare
 * `export default {...}`.
 */
const findMetaObject = (
  source: ts.SourceFile
): ts.ObjectLiteralExpression | null => {
  for (const stmt of source.statements) {
    if (ts.isVariableStatement(stmt)) {
      for (const decl of stmt.declarationList.declarations) {
        if (
          ts.isIdentifier(decl.name) &&
          decl.name.text === "meta" &&
          decl.initializer
        ) {
          const init = unwrap(decl.initializer)
          if (ts.isObjectLiteralExpression(init)) return init
        }
      }
    }
    if (ts.isExportAssignment(stmt) && !stmt.isExportEquals) {
      const expr = unwrap(stmt.expression)
      if (ts.isObjectLiteralExpression(expr)) return expr
    }
  }
  return null
}

const readMetaTitle = (relPath: string): string | null => {
  const source = ts.createSourceFile(
    relPath,
    readFileSync(path.join(REPO_ROOT, relPath), "utf8"),
    ts.ScriptTarget.Latest,
    /* setParentNodes */ false,
    ts.ScriptKind.TSX
  )
  const meta = findMetaObject(source)
  if (!meta) return null

  for (const prop of meta.properties) {
    if (!ts.isPropertyAssignment(prop)) continue
    const key = ts.isIdentifier(prop.name)
      ? prop.name.text
      : ts.isStringLiteral(prop.name)
        ? prop.name.text
        : null
    if (key !== "title") continue
    const value = prop.initializer
    if (
      ts.isStringLiteral(value) ||
      ts.isNoSubstitutionTemplateLiteral(value)
    ) {
      return value.text
    }
    return null
  }
  return null
}

const storyFiles = SEARCH_ROOTS.flatMap(findStoryFiles).sort()

const sectionFor = (relPath: string): string | null =>
  TAXONOMY.find(({ prefix }) => relPath.startsWith(prefix))?.section ?? null

test.describe("Storybook title taxonomy", () => {
  test("story files are discovered", () => {
    // Guards against a silently broken walker turning the rest into no-ops.
    expect(storyFiles.length).toBeGreaterThan(100)
  })

  test("story filenames are kebab-case", () => {
    const wrong = storyFiles.filter(
      (f) => !FILENAME_FORMAT.test(path.basename(f))
    )
    expect(
      wrong,
      "story filenames are kebab-case (app-card.stories.tsx) even inside a " +
        "PascalCase component directory -- component filenames are a separate " +
        "migration and are not covered by this rule"
    ).toEqual([])
  })

  test("every story file lives somewhere the taxonomy covers", () => {
    const orphans = storyFiles.filter((f) => sectionFor(f) === null)
    expect(
      orphans,
      "story files outside every taxonomy prefix -- add a rule to TAXONOMY " +
        "here and a glob to .storybook/main.ts, or move the story"
    ).toEqual([])
  })

  test("every story file declares an explicit string meta.title", () => {
    const untitled = storyFiles.filter((f) => readMetaTitle(f) === null)
    expect(
      untitled,
      "stories without an explicit meta.title get one auto-derived from the " +
        "file path, which lands outside the taxonomy"
    ).toEqual([])
  })

  test("titles use the ' / ' segment separator", () => {
    const malformed = storyFiles
      .map((f) => [f, readMetaTitle(f)] as const)
      .filter(([, title]) => title !== null && !TITLE_FORMAT.test(title))
      .map(([f, title]) => `${f}: ${title}`)
    expect(
      malformed,
      "titles must read 'Section / Group / Name' with spaces around each slash"
    ).toEqual([])
  })

  test("the top-level segment matches the file's location", () => {
    const mismatched = storyFiles.flatMap((f) => {
      const title = readMetaTitle(f)
      const expected = sectionFor(f)
      if (title === null || expected === null) return []
      const actual = title.split(" / ")[0]
      return actual === expected
        ? []
        : [`${f}: "${actual}" should be "${expected}" (title: ${title})`]
    })
    expect(mismatched).toEqual([])
  })

  test("no two story files share a title", () => {
    const byTitle = new Map<string, string[]>()
    for (const f of storyFiles) {
      const title = readMetaTitle(f)
      if (title === null) continue
      byTitle.set(title, [...(byTitle.get(title) ?? []), f])
    }
    const collisions = [...byTitle.entries()]
      .filter(([, files]) => files.length > 1)
      .map(([title, files]) => `${title}: ${files.join(", ")}`)
    expect(
      collisions,
      "duplicate titles collapse into a single sidebar entry -- Storybook " +
        "gives no warning"
    ).toEqual([])
  })
})
