/**
 * Which `page-courses-widget-*` strings a lesson widget can read, from the
 * AST: start at the widget's export in the registry, follow every binding
 * and local import it uses, and collect the key literals and template
 * prefixes found on the way. A fully dynamic head (`page-courses-widget-${name}`)
 * resolves to the string literals bound to `name` in that code (props,
 * config fields, defaults), kept only where some key starts with the result.
 */

import { existsSync, readFileSync, statSync } from "node:fs"
import path from "node:path"
import ts from "typescript"

export const REPO_ROOT = path.resolve(__dirname, "../../..")
export const WIDGET_KEY_BASE = "page-courses-widget-"
export const WIDGET_REGISTRY =
  "src/components/Courses/steps/interactive-step.tsx"

/** Keys starting with `prefix` (a whole key matches itself) may be read */
export type WidgetKeyUsage =
  | { prefix: string; at: string }
  | { unresolved: string; at: string }

const sources = new Map<string, ts.SourceFile>()
const parse = (file: string) => {
  let source = sources.get(file)
  if (!source) {
    source = ts.createSourceFile(
      file,
      readFileSync(file, "utf8"),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX
    )
    sources.set(file, source)
  }
  return source
}

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

const isLiteral = (
  node: ts.Node | undefined
): node is ts.StringLiteral | ts.NoSubstitutionTemplateLiteral =>
  !!node &&
  (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))

const nameText = (name: ts.Node) =>
  ts.isIdentifier(name) || isLiteral(name) ? name.text : undefined

const boundNames = (name: ts.BindingName): string[] =>
  ts.isIdentifier(name)
    ? [name.text]
    : name.elements.flatMap((el) =>
        ts.isOmittedExpression(el) ? [] : boundNames(el.name)
      )

interface Scope {
  locals: Map<string, ts.Node[]>
  imports: Map<string, { file: string; name: string }>
  /** Top-level statements that run on import */
  effects: ts.Node[]
}

const scopes = new Map<string, Scope>()
const scopeOf = (file: string): Scope => {
  const cached = scopes.get(file)
  if (cached) return cached
  const scope: Scope = { locals: new Map(), imports: new Map(), effects: [] }
  const add = (name: string, node: ts.Node) =>
    scope.locals.set(name, [...(scope.locals.get(name) ?? []), node])
  const specifier = (node?: ts.Expression) =>
    node && ts.isStringLiteral(node)
      ? resolveImport(file, node.text)
      : undefined

  for (const stmt of parse(file).statements) {
    if (ts.isImportDeclaration(stmt)) {
      const clause = stmt.importClause
      const target = specifier(stmt.moduleSpecifier)
      if (!clause || clause.isTypeOnly || !target) continue
      if (clause.name)
        scope.imports.set(clause.name.text, { file: target, name: "default" })
      const bindings = clause.namedBindings
      if (bindings && ts.isNamespaceImport(bindings))
        scope.imports.set(bindings.name.text, { file: target, name: "*" })
      if (bindings && ts.isNamedImports(bindings))
        for (const el of bindings.elements)
          if (!el.isTypeOnly)
            scope.imports.set(el.name.text, {
              file: target,
              name: (el.propertyName ?? el.name).text,
            })
    } else if (ts.isVariableStatement(stmt)) {
      for (const decl of stmt.declarationList.declarations)
        for (const name of boundNames(decl.name)) add(name, decl)
    } else if (ts.isFunctionDeclaration(stmt) || ts.isClassDeclaration(stmt)) {
      if (stmt.name) add(stmt.name.text, stmt)
      if (stmt.modifiers?.some((m) => m.kind === ts.SyntaxKind.DefaultKeyword))
        add("default", stmt)
    } else if (ts.isExportAssignment(stmt)) {
      add("default", stmt.expression)
    } else if (ts.isExportDeclaration(stmt)) {
      if (!stmt.exportClause || !ts.isNamedExports(stmt.exportClause)) continue
      const target = specifier(stmt.moduleSpecifier)
      for (const el of stmt.exportClause.elements) {
        const local = el.propertyName ?? el.name
        if (target)
          scope.imports.set(el.name.text, { file: target, name: local.text })
        else add(el.name.text, local)
      }
    } else if (
      !ts.isInterfaceDeclaration(stmt) &&
      !ts.isTypeAliasDeclaration(stmt)
    ) {
      scope.effects.push(stmt)
    }
  }
  scopes.set(file, scope)
  return scope
}

/** Identifiers that name a property or declare something, not a reference */
const isReference = (node: ts.Identifier) => {
  const parent = node.parent
  return !(
    ((ts.isPropertyAccessExpression(parent) ||
      ts.isPropertyAssignment(parent) ||
      ts.isPropertySignature(parent) ||
      ts.isMethodDeclaration(parent) ||
      ts.isJsxAttribute(parent) ||
      ts.isBindingElement(parent) ||
      ts.isParameter(parent) ||
      ts.isVariableDeclaration(parent) ||
      ts.isFunctionDeclaration(parent)) &&
      parent.name === node) ||
    (ts.isBindingElement(parent) && parent.propertyName === node) ||
    (ts.isQualifiedName(parent) && parent.right === node)
  )
}

/** What the export `exportName` of `file` can read, given the keys there are */
export const widgetKeyUsages = (
  file: string,
  exportName: string,
  keys: readonly string[]
): WidgetKeyUsage[] => {
  const nodes: { file: string; node: ts.Node }[] = []
  const seen = new Set<string>()

  const collect = (file: string, node: ts.Node) => {
    nodes.push({ file, node })
    const scope = scopeOf(file)
    const walk = (n: ts.Node) => {
      if (
        ts.isIdentifier(n) &&
        isReference(n) &&
        (scope.locals.has(n.text) || scope.imports.has(n.text))
      )
        visit(file, n.text)
      ts.forEachChild(n, walk)
    }
    walk(node)
  }

  const visit = (file: string, name: string) => {
    if (seen.has(`${file}#${name}`)) return
    seen.add(`${file}#${name}`)
    const scope = scopeOf(file)
    if (!seen.has(file)) {
      seen.add(file)
      for (const node of scope.effects) collect(file, node)
    }
    const imported = scope.imports.get(name)
    if (imported) return visit(imported.file, imported.name)
    if (name === "*") {
      for (const local of scope.locals.keys()) visit(file, local)
      return
    }
    for (const node of scope.locals.get(name) ?? []) collect(file, node)
  }

  visit(path.resolve(REPO_ROOT, file), exportName)

  const each = (fn: (n: ts.Node, file: string) => void) => {
    for (const { file, node } of nodes) {
      const walk = (n: ts.Node) => {
        fn(n, file)
        ts.forEachChild(n, walk)
      }
      walk(node)
    }
  }

  /** String literals bound to `name`; null if any binding isn't one */
  const bound = (name: string): string[] | null => {
    const values: (string | null)[] = []
    const take = (init: ts.Node | undefined) => {
      if (!init) return
      const value =
        ts.isJsxExpression(init) && init.expression ? init.expression : init
      values.push(isLiteral(value) ? value.text : null)
    }
    each((n) => {
      if (ts.isPropertyAssignment(n) && nameText(n.name) === name)
        take(n.initializer)
      else if (ts.isJsxAttribute(n) && n.name.getText() === name)
        take(n.initializer)
      else if (
        (ts.isBindingElement(n) ||
          ts.isParameter(n) ||
          ts.isVariableDeclaration(n)) &&
        ts.isIdentifier(n.name) &&
        n.name.text === name
      )
        take(n.initializer)
    })
    return values.includes(null) ? null : (values as string[])
  }

  const literalsIn = (node: ts.Node) => {
    const out: string[] = []
    const walk = (n: ts.Node) => {
      if (isLiteral(n)) out.push(n.text)
      ts.forEachChild(n, walk)
    }
    walk(node)
    return out
  }

  const usages: WidgetKeyUsage[] = []
  each((n, file) => {
    const source = parse(file)
    const at = `${path.relative(REPO_ROOT, file)}:${source.getLineAndCharacterOfPosition(n.getStart(source)).line + 1}`
    if (isLiteral(n) && n.text.startsWith(WIDGET_KEY_BASE)) {
      usages.push({ prefix: n.text, at })
    } else if (ts.isTemplateExpression(n)) {
      const head = n.head.text
      if (head.startsWith(WIDGET_KEY_BASE) && head !== WIDGET_KEY_BASE) {
        usages.push({ prefix: head, at })
      } else if (head === WIDGET_KEY_BASE) {
        const [span] = n.templateSpans
        const expr = span.expression
        const literals = literalsIn(expr)
        const name = ts.isIdentifier(expr)
          ? expr.text
          : ts.isPropertyAccessExpression(expr)
            ? expr.name.text
            : undefined
        const values = literals.length ? literals : name ? bound(name) : null
        const prefixes = (values ?? []).map(
          (value) => WIDGET_KEY_BASE + value + span.literal.text
        )
        if (!values?.length) usages.push({ unresolved: n.getText(source), at })
        for (const prefix of prefixes)
          if (keys.some((key) => key.startsWith(prefix)))
            usages.push({ prefix, at })
      } else if (head && WIDGET_KEY_BASE.startsWith(head)) {
        usages.push({ unresolved: n.getText(source), at })
      }
    }
  })
  return usages
}

/** The registry's widgets: id, module and the export it renders */
export const registryWidgets = () => {
  const file = path.join(REPO_ROOT, WIDGET_REGISTRY)
  const source = parse(file)
  const widgets: { id: string; file: string; exportName: string }[] = []
  const unwrap = (node: ts.Expression): ts.Expression =>
    ts.isAsExpression(node) ||
    ts.isSatisfiesExpression(node) ||
    ts.isParenthesizedExpression(node)
      ? unwrap(node.expression)
      : node
  for (const stmt of source.statements) {
    if (!ts.isVariableStatement(stmt)) continue
    for (const decl of stmt.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name) || decl.name.text !== "WIDGETS") continue
      const init = decl.initializer && unwrap(decl.initializer)
      if (!init || !ts.isObjectLiteralExpression(init)) continue
      for (const prop of init.properties) {
        if (!ts.isPropertyAssignment(prop)) continue
        const id = nameText(prop.name)
        let spec: string | undefined
        let exportName = "default"
        const walk = (n: ts.Node) => {
          if (
            ts.isCallExpression(n) &&
            n.expression.kind === ts.SyntaxKind.ImportKeyword &&
            isLiteral(n.arguments[0])
          )
            spec = n.arguments[0].text
          if (
            ts.isCallExpression(n) &&
            ts.isPropertyAccessExpression(n.expression) &&
            n.expression.name.text === "then"
          ) {
            const [callback] = n.arguments
            if (
              callback &&
              ts.isArrowFunction(callback) &&
              ts.isPropertyAccessExpression(callback.body)
            )
              exportName = callback.body.name.text
          }
          ts.forEachChild(n, walk)
        }
        walk(prop.initializer)
        const target = spec && resolveImport(file, spec)
        if (id && target) widgets.push({ id, file: target, exportName })
        else throw new Error(`${WIDGET_REGISTRY}: can't read the entry ${id}`)
      }
    }
  }
  return widgets
}
