import fs from "fs"
import path from "path"
import { pathToFileURL } from "url"

import ts from "typescript"
import {
  type MessageFormatElement,
  parse,
  TYPE,
} from "@formatjs/icu-messageformat-parser"

import type { QuestionBank } from "@/lib/types"

type KeyExpr =
  | { kind: "lit"; value: string }
  | { kind: "template"; re: string }
  | { kind: "unknown" }

export interface TranslationRef {
  at: string
  /** null when the binding's namespace can't be resolved (e.g. `t` passed as a prop) */
  ns: string | null
  key: KeyExpr
  /** `t("ns:key")` on a namespace-bound translator */
  colon: boolean
}

export interface TranslationScan {
  refs: TranslationRef[]
  literals: Set<string>
  /** Template literals with a literal head, anywhere in source */
  looseTemplates: RegExp[]
  /** `<DiagramMessages prefix>`: ships every `component-diagrams` key with that prefix */
  diagramPrefixes: Set<string>
}

const HOOKS = new Set(["useTranslations", "getTranslations"])
const METHODS = new Set(["rich", "raw", "markup", "has"])

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

function walk(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (e.name !== "node_modules" && !p.endsWith(path.join("src", "intl")))
        walk(p, out)
    } else if (/\.(ts|tsx|js|jsx|mjs)$/.test(e.name)) out.push(p)
  }
  return out
}

export function scanTranslations(root: string): TranslationScan {
  const files = ["src", "app"].flatMap((d) => walk(path.join(root, d)))
  const program = ts.createProgram(files, {
    jsx: ts.JsxEmit.Preserve,
    allowJs: true,
    noResolve: true,
    noLib: true,
    target: ts.ScriptTarget.ESNext,
  })
  const checker = program.getTypeChecker()
  const fileSet = new Set(files)

  const declOf = (id: ts.Identifier) => {
    const sym = checker.getSymbolAtLocation(id)
    return sym?.valueDeclaration ?? sym?.declarations?.[0]
  }

  const resolve = (expr: ts.Expression | undefined, seen = 0): KeyExpr[] => {
    if (!expr || seen > 10) return [{ kind: "unknown" }]
    if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr))
      return [{ kind: "lit", value: expr.text }]
    if (
      ts.isAsExpression(expr) ||
      ts.isParenthesizedExpression(expr) ||
      ts.isSatisfiesExpression(expr)
    )
      return resolve(expr.expression, seen + 1)
    if (ts.isIdentifier(expr)) {
      const d = declOf(expr)
      if (d && ts.isVariableDeclaration(d) && d.initializer)
        return resolve(d.initializer, seen + 1)
      return [{ kind: "unknown" }]
    }
    if (ts.isConditionalExpression(expr))
      return [
        ...resolve(expr.whenTrue, seen + 1),
        ...resolve(expr.whenFalse, seen + 1),
      ]
    if (ts.isTemplateExpression(expr)) {
      let re = escapeRe(expr.head.text)
      for (const s of expr.templateSpans)
        re += "(.+)" + escapeRe(s.literal.text)
      return [{ kind: "template", re: `^${re}$` }]
    }
    if (
      ts.isBinaryExpression(expr) &&
      expr.operatorToken.kind === ts.SyntaxKind.PlusToken
    ) {
      const part = (e: ts.Expression) => {
        const [r] = resolve(e, seen + 1)
        if (r.kind === "lit") return escapeRe(r.value)
        if (r.kind === "template") return r.re.slice(1, -1)
        return "(.+)"
      }
      return [
        { kind: "template", re: `^${part(expr.left)}${part(expr.right)}$` },
      ]
    }
    return [{ kind: "unknown" }]
  }

  const unwrap = (e: ts.Expression | undefined) => {
    while (e && (ts.isAwaitExpression(e) || ts.isParenthesizedExpression(e)))
      e = e.expression
    return e
  }
  const hookCall = (e: ts.Expression | undefined) => {
    e = unwrap(e)
    return e &&
      ts.isCallExpression(e) &&
      ts.isIdentifier(e.expression) &&
      HOOKS.has(e.expression.text)
      ? e
      : undefined
  }
  const hookNs = (call: ts.CallExpression): string | null => {
    const arg = call.arguments[0]
    if (!arg) return ""
    let expr: ts.Expression | undefined = arg
    if (ts.isObjectLiteralExpression(arg)) {
      const p = arg.properties.find((p) => p.name?.getText() === "namespace")
      if (!p) return ""
      expr = ts.isShorthandPropertyAssignment(p)
        ? p.name
        : ts.isPropertyAssignment(p)
          ? p.initializer
          : undefined
    }
    const r = resolve(expr)
    return r.length === 1 && r[0].kind === "lit" ? r[0].value : null
  }

  // undefined: not a translator; null: translator with unresolvable namespace
  const bindingNs = (id: ts.Identifier): string | null | undefined => {
    const d = declOf(id)
    if (!d) return undefined
    if (ts.isVariableDeclaration(d)) {
      const c = hookCall(d.initializer)
      return c ? hookNs(c) : undefined
    }
    if (ts.isBindingElement(d) && ts.isArrayBindingPattern(d.parent)) {
      const init = unwrap(d.parent.parent.initializer)
      const arr = init && ts.isCallExpression(init) && init.arguments[0]
      if (
        init &&
        ts.isCallExpression(init) &&
        init.expression.getText() === "Promise.all" &&
        arr &&
        ts.isArrayLiteralExpression(arr)
      ) {
        const c = hookCall(arr.elements[d.parent.elements.indexOf(d)])
        if (c) return hookNs(c)
      }
      return undefined
    }
    if (ts.isParameter(d) || ts.isBindingElement(d))
      return /^t([A-Z]\w*)?$/.test(id.text) ? null : undefined
    return undefined
  }

  const refs: TranslationRef[] = []
  const literals = new Set<string>()
  const looseTemplates: RegExp[] = []
  const diagramPrefixes = new Set<string>()
  const refArgs = new Set<ts.Node>()
  const isRefArg = (n: ts.Node): boolean =>
    refArgs.has(n) ||
    ((ts.isConditionalExpression(n.parent) ||
      ts.isParenthesizedExpression(n.parent)) &&
      isRefArg(n.parent))

  const push = (
    at: string,
    ns: string | null,
    keys: KeyExpr[],
    colonAllowed: boolean
  ) => {
    for (const key of keys) {
      let refNs = ns
      let k = key
      let colon = false
      if (k.kind === "lit") {
        const sep = colonAllowed ? ":" : ns === "" ? "." : null
        const i = sep ? k.value.indexOf(sep) : -1
        if (i > 0) {
          refNs = k.value.slice(0, i)
          k = { kind: "lit", value: k.value.slice(i + 1) }
        } else if (ns !== "" && /^[\w-]+:[\w-]+$/.test(k.value)) colon = true
      }
      refs.push({ at, ns: refNs === "" ? null : refNs, key: k, colon })
    }
  }

  for (const sf of program.getSourceFiles()) {
    if (!fileSet.has(sf.fileName)) continue
    const rel = path.relative(root, sf.fileName)
    const at = (n: ts.Node) =>
      `${rel}:${sf.getLineAndCharacterOfPosition(n.getStart(sf)).line + 1}`

    const visit = (node: ts.Node) => {
      if (
        ts.isStringLiteral(node) ||
        ts.isNoSubstitutionTemplateLiteral(node)
      ) {
        if (!isRefArg(node)) literals.add(node.text)
      } else if (
        ts.isTemplateExpression(node) &&
        // Heads like `p${i}` or `nav-${id}` (DOM ids) would otherwise hide whole key families
        (node.head.text.match(/-/g)?.length ?? 0) >= 2
      ) {
        const [r] = resolve(node)
        if (r.kind === "template") looseTemplates.push(new RegExp(r.re))
      } else if (ts.isCallExpression(node)) {
        const callee = node.expression
        let id: ts.Identifier | undefined
        if (ts.isIdentifier(callee)) id = callee
        else if (
          ts.isPropertyAccessExpression(callee) &&
          ts.isIdentifier(callee.expression) &&
          METHODS.has(callee.name.text)
        )
          id = callee.expression
        const ns = id && !HOOKS.has(id.text) ? bindingNs(id) : undefined
        if (ns !== undefined && node.arguments[0]) {
          push(at(node), ns, resolve(node.arguments[0]), false)
          refArgs.add(node.arguments[0])
        }
      } else if (
        ts.isJsxSelfClosingElement(node) ||
        ts.isJsxOpeningElement(node)
      ) {
        const tag = node.tagName.getText()
        const attr = (name: string) => {
          const a = node.attributes.properties.find(
            (p) => ts.isJsxAttribute(p) && p.name.getText() === name
          )
          const init = a && ts.isJsxAttribute(a) ? a.initializer : undefined
          return init && ts.isJsxExpression(init) ? init.expression : init
        }
        if (tag === "DiagramMessages")
          for (const p of resolve(attr("prefix")))
            if (p.kind === "lit") diagramPrefixes.add(p.value)
        const id = tag === "Translation" ? attr("id") : undefined
        if (id) {
          const nsAttr = attr("ns")
          const [ns] = nsAttr ? resolve(nsAttr) : []
          push(
            at(node),
            !nsAttr ? "common" : ns.kind === "lit" ? ns.value : null,
            resolve(id),
            true
          )
          refArgs.add(id)
        }
      }
      ts.forEachChild(node, visit)
    }
    visit(sf)
  }

  return { refs, literals, looseTemplates, diagramPrefixes }
}

export function loadEnglishMessages(root: string) {
  const dir = path.join(root, "src/intl/en")
  const messages: Record<string, Record<string, string>> = {}
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".json")))
    messages[f.slice(0, -5)] = JSON.parse(
      fs.readFileSync(path.join(dir, f), "utf8")
    )
  return messages
}

export const quizKeys = (bank: QuestionBank) =>
  new Set(
    Object.values(bank).flatMap((q) => [
      q.prompt,
      ...q.answers.flatMap((a) => [a.label, a.explanation]),
    ])
  )

/** Directory names of pages: breadcrumbs fall back to the last URL segment as a `common` key */
function pageSegments(root: string) {
  const segs = new Set<string>()
  const collect = (dir: string, skip: RegExp) => {
    if (!fs.existsSync(dir)) return
    for (const e of fs.readdirSync(dir, { withFileTypes: true }))
      if (e.isDirectory() && !skip.test(e.name)) {
        segs.add(e.name)
        collect(path.join(dir, e.name), skip)
      }
  }
  collect(path.join(root, "public/content"), /^translations$/)
  collect(path.join(root, "app/[locale]"), /^[[_(]/)
  return segs
}

/** `ns:key` strings in English markdown, e.g. `<UpgradeStatus dateKey="page-upgrades:...">` */
function markdownKeyRefs(root: string) {
  const refs = new Set<string>()
  const collect = (dir: string) => {
    if (!fs.existsSync(dir)) return
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name)
      if (e.isDirectory()) {
        if (e.name !== "translations") collect(p)
      } else if (e.name.endsWith(".md"))
        for (const [, ref] of fs
          .readFileSync(p, "utf8")
          .matchAll(/["']([a-z0-9-]+:[a-z0-9-]+)["']/g))
          refs.add(ref)
    }
  }
  collect(path.join(root, "public/content"))
  return refs
}

function yamlIds(root: string) {
  const file = path.join(root, "src/data/developer-docs-links.yaml")
  if (!fs.existsSync(file)) return new Set<string>()
  const text = fs.readFileSync(file, "utf8")
  return new Set(
    [...text.matchAll(/\b(?:id|description):\s*"?([\w-]+)/g)].map((m) => m[1])
  )
}

/** `page-courses` lesson and exam keys are `${courseId}-...`, built from course data; tests/unit/courses/strings.spec.ts checks them both ways */
async function courseIds(root: string): Promise<string[]> {
  const file = path.join(root, "src/data/courses/index.ts")
  if (!fs.existsSync(file)) return []
  const { TRACKS }: typeof import("@/data/courses") = await import(
    pathToFileURL(file).href
  )
  return TRACKS.flatMap(({ courses, upcoming = [] }) =>
    [...courses, ...upcoming].map(({ id }) => id)
  )
}

/** Returns "ns key" for each English key nothing references, directly or through a known key family */
export async function findOrphanedKeys(root: string) {
  const { refs, literals, looseTemplates, diagramPrefixes } =
    scanTranslations(root)
  const messages = loadEnglishMessages(root)
  const bankUrl = pathToFileURL(
    path.join(root, "src/data/quizzes/questionBank.ts")
  )
  const quiz = quizKeys((await import(bankUrl.href)).default)
  const pages = pageSegments(root)
  const docsNav = yamlIds(root)
  const courses = await courseIds(root)
  const markdown = markdownKeyRefs(root)

  const direct = new Set<string>()
  const anyNs = new Set<string>()
  const nsTemplates: Record<string, RegExp[]> = {}
  const anyTemplates: RegExp[] = []
  for (const { ns, key } of refs) {
    if (key.kind === "lit")
      ns === null ? anyNs.add(key.value) : direct.add(`${ns} ${key.value}`)
    else if (key.kind === "template")
      (ns === null ? anyTemplates : (nsTemplates[ns] ??= [])).push(
        new RegExp(key.re)
      )
  }

  const orphans: string[] = []
  for (const [ns, keys] of Object.entries(messages))
    for (const key of Object.keys(keys)) {
      const used =
        direct.has(`${ns} ${key}`) ||
        anyNs.has(key) ||
        literals.has(key) ||
        literals.has(`${ns}:${key}`) ||
        markdown.has(`${ns}:${key}`) ||
        literals.has(`${ns}.${key}`) ||
        (ns === "common" &&
          (/^(language|region)-/.test(key) || pages.has(key))) ||
        (ns === "learn-quizzes" && quiz.has(key)) ||
        docsNav.has(key) ||
        (ns === "page-courses" &&
          courses.some((id) => key.startsWith(`${id}-`))) ||
        // getLocalizedDescription: `${prefix}-${slugify(name)}-description`
        (ns.endsWith("-descriptions") && key.endsWith("-description")) ||
        (ns === "component-diagrams" &&
          [...diagramPrefixes, "diagram"].some((p) =>
            key.startsWith(`${p}-`)
          )) ||
        [...(nsTemplates[ns] ?? []), ...anyTemplates, ...looseTemplates].some(
          (re) => re.test(key)
        )
      if (!used) orphans.push(`${ns} ${key}`)
    }
  return orphans.sort()
}

function placeholders(message: string) {
  const names = new Set<string>()
  const collect = (els: MessageFormatElement[]) => {
    for (const el of els) {
      if (el.type === TYPE.tag) {
        names.add(`<${el.value}>`)
        collect(el.children)
      } else if ("value" in el && el.type !== TYPE.literal)
        names.add(`{${el.value}}`)
      if (el.type === TYPE.plural || el.type === TYPE.select)
        for (const o of Object.values(el.options)) collect(o.value)
    }
  }
  try {
    collect(parse(message))
  } catch {
    try {
      collect(parse(message, { ignoreTag: true }))
    } catch {
      return null
    }
  }
  return [...names].sort().join(" ")
}

/** Warnings for English messages whose ICU placeholders changed, and keys renamed with an unchanged value */
export function diffEnglishMessages(baseRoot: string, headRoot: string) {
  const base = loadEnglishMessages(baseRoot)
  const head = loadEnglishMessages(headRoot)
  const warnings: string[] = []
  for (const [ns, keys] of Object.entries(head)) {
    const old = base[ns] ?? {}
    const removed = new Map(
      Object.entries(old)
        .filter(([k]) => !(k in keys))
        .map(([k, v]) => [v, k])
    )
    for (const [key, value] of Object.entries(keys)) {
      if (key in old) {
        const [a, b] = [placeholders(old[key]), placeholders(value)]
        if (old[key] !== value && a !== null && b !== null && a !== b)
          warnings.push(
            `${ns} ${key} changed its placeholders (${a || "none"} -> ${b || "none"}); translations keep the old ones until the intl pipeline reruns, so pass both until then`
          )
      } else if (removed.has(value))
        warnings.push(
          `${ns} ${key} renames "${removed.get(value)}" without changing its text, which drops its translations in 24 locales until the intl pipeline reruns; keep the old key`
        )
    }
  }
  return warnings
}

async function main() {
  const [cmd, ...args] = process.argv.slice(2)
  if (cmd === "orphans")
    console.log((await findOrphanedKeys(args[0] ?? ".")).join("\n"))
  else if (cmd === "message-diff")
    console.log(diffEnglishMessages(args[0], args[1]).join("\n"))
  else {
    console.error(
      "usage: intl-keys.ts orphans [root] | message-diff <base-root> <head-root>"
    )
    process.exit(2)
  }
}

if (process.argv[1]?.endsWith("intl-keys.ts")) main()
