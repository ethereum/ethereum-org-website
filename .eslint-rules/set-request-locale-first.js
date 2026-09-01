/**
 * Requires `setRequestLocale(locale)` before any next-intl API that resolves the
 * request locale, in route entry points (default export, `generateMetadata`,
 * `generateViewport`). Without it next-intl reads `headers()`, which turns a
 * prerendered route dynamic and 500s on on-demand renders.
 *
 * docs/solutions/architecture/setrequestlocale-static-to-dynamic-rendering.md
 */
"use strict"

// Safe when passed an explicit `locale`: next-intl's getConfig then skips the
// header read entirely.
const OPTIONAL_LOCALE = new Set([
  "getTranslations",
  "getMessages",
  "getFormatter",
  "getNow",
  "getTimeZone",
])

// No override parameter, so it always resolves the request locale.
const ALWAYS = new Set(["getLocale"])

const NAMED_ENTRIES = new Set(["generateMetadata", "generateViewport"])
const EAGER_CALLBACK_METHODS = new Set([
  "every",
  "filter",
  "find",
  "findIndex",
  "findLast",
  "findLastIndex",
  "flatMap",
  "forEach",
  "map",
  "reduce",
  "reduceRight",
  "some",
  "sort",
])

const isFunction = (node) =>
  node?.type === "FunctionDeclaration" ||
  node?.type === "FunctionExpression" ||
  node?.type === "ArrowFunctionExpression"

const staticName = (node) => {
  if (!node) return null
  if (node.type === "Identifier") return node.name
  if (node.type === "Literal" && typeof node.value === "string")
    return node.value
  return null
}

const hasExplicitLocale = (arg) =>
  arg?.type === "ObjectExpression" &&
  arg.properties.some(
    (property) =>
      property.type === "Property" &&
      !property.computed &&
      !property.method &&
      property.kind === "init" &&
      staticName(property.key) === "locale"
  )

const unwrapExpression = (node) => {
  let current = node
  while (current) {
    if (current.type === "AwaitExpression") {
      current = current.argument
    } else if (
      current.type === "ChainExpression" ||
      current.type === "TSAsExpression" ||
      current.type === "TSNonNullExpression" ||
      current.type === "TSSatisfiesExpression"
    ) {
      current = current.expression
    } else {
      break
    }
  }
  return current
}

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Require setRequestLocale(locale) before next-intl APIs that read the request locale",
    },
    schema: [],
    messages: {
      first:
        "Call setRequestLocale(locale) before {{api}}(), otherwise this route reads headers() and renders dynamically at runtime.",
      missing:
        "This route calls {{api}}() without ever calling setRequestLocale(locale), so it reads headers() and renders dynamically at runtime.",
    },
  },

  create(context) {
    const imported = new Map() // local name -> next-intl export name
    const namespaces = new Set() // `import * as intl from "next-intl/server"`
    const bindings = new Map() // local name -> initializer/declaration, null if ambiguous
    const namedExports = new Map() // exported name -> local name
    let defaultExport = null // expression that resolves to the default entry

    const addBinding = (name, value) => {
      if (!bindings.has(name)) {
        bindings.set(name, value)
      } else if (bindings.get(name) !== value) {
        bindings.set(name, null)
      }
    }

    const importedApi = (call) => {
      const callee = unwrapExpression(call.callee)
      if (callee?.type === "Identifier") return imported.get(callee.name)
      if (
        callee?.type === "MemberExpression" &&
        callee.object.type === "Identifier" &&
        namespaces.has(callee.object.name)
      ) {
        return staticName(callee.property)
      }
      return undefined
    }

    const isRiskyCall = (node) => {
      const api = importedApi(node)
      return (
        ALWAYS.has(api) ||
        (OPTIONAL_LOCALE.has(api) && !hasExplicitLocale(node.arguments[0]))
      )
    }

    const hasRealArgument = (call) => {
      const arg = call.arguments[0]
      return (
        arg &&
        arg.type !== "SpreadElement" &&
        !(arg.type === "Identifier" && arg.name === "undefined") &&
        !(arg.type === "Literal" && arg.value === null)
      )
    }

    const primeCall = (statement) => {
      if (statement.type !== "ExpressionStatement") return null
      const expression = unwrapExpression(statement.expression)
      if (
        expression?.type !== "CallExpression" ||
        importedApi(expression) !== "setRequestLocale" ||
        !hasRealArgument(expression)
      ) {
        return null
      }
      return expression
    }

    const resolveFunction = (node, seen = new Set()) => {
      const value = unwrapExpression(node)
      if (!value || seen.has(value)) return null
      seen.add(value)

      if (isFunction(value)) return value
      if (value.type === "Identifier") {
        return resolveFunction(bindings.get(value.name), seen)
      }
      if (value.type === "CallExpression") {
        for (const arg of [...value.arguments].reverse()) {
          if (arg.type === "SpreadElement") continue
          const resolved = resolveFunction(arg, seen)
          if (resolved) return resolved
        }
      }
      return null
    }

    const childNodes = (node) => {
      if (!node) return []
      const children = []
      for (const [key, value] of Object.entries(node)) {
        if (
          key === "parent" ||
          key === "range" ||
          key === "loc" ||
          key === "tokens" ||
          key === "comments"
        ) {
          continue
        }
        if (Array.isArray(value)) {
          children.push(
            ...value.filter((item) => item && typeof item.type === "string")
          )
        } else if (value && typeof value.type === "string") {
          children.push(value)
        }
      }
      return children
    }

    const findRiskInFunction = (fn, visited) => {
      if (visited.has(fn)) return null
      const nextVisited = new Set(visited)
      nextVisited.add(fn)
      return findRisk(fn.body, nextVisited)
    }

    const findRisk = (node, visited) => {
      if (!node || isFunction(node)) return null

      if (node.type === "CallExpression") {
        const callee = unwrapExpression(node.callee)

        const calleeRisk = findRisk(callee, visited)
        if (calleeRisk) return calleeRisk
        for (const arg of node.arguments) {
          if (arg.type === "SpreadElement") {
            const risk = findRisk(arg.argument, visited)
            if (risk) return risk
          } else if (!isFunction(arg)) {
            const risk = findRisk(arg, visited)
            if (risk) return risk
          }
        }

        if (isRiskyCall(node)) return node

        const calledFunction = resolveFunction(callee)
        if (calledFunction) {
          const risk = findRiskInFunction(calledFunction, visited)
          if (risk) return risk
        }

        const method =
          callee?.type === "MemberExpression"
            ? staticName(callee.property)
            : null
        if (method && EAGER_CALLBACK_METHODS.has(method)) {
          for (const arg of node.arguments) {
            if (arg.type === "SpreadElement") continue
            const callback = resolveFunction(arg)
            if (!callback) continue
            const risk = findRiskInFunction(callback, visited)
            if (risk) return risk
          }
        }
        return null
      }

      if (node.type === "NewExpression") {
        for (const arg of node.arguments) {
          if (arg.type === "SpreadElement") {
            const risk = findRisk(arg.argument, visited)
            if (risk) return risk
          } else if (!isFunction(arg)) {
            const risk = findRisk(arg, visited)
            if (risk) return risk
          }
        }
        if (
          node.callee.type === "Identifier" &&
          node.callee.name === "Promise" &&
          node.arguments[0]?.type !== "SpreadElement"
        ) {
          const executor = resolveFunction(node.arguments[0])
          if (executor) return findRiskInFunction(executor, visited)
        }
        return null
      }

      for (const child of childNodes(node)) {
        const risk = findRisk(child, visited)
        if (risk) return risk
      }
      return null
    }

    return {
      ImportDeclaration(node) {
        if (node.source.value !== "next-intl/server") return

        for (const s of node.specifiers) {
          if (s.type === "ImportSpecifier") {
            imported.set(s.local.name, staticName(s.imported))
          } else if (s.type === "ImportNamespaceSpecifier") {
            namespaces.add(s.local.name)
          }
        }
      },

      ExportDefaultDeclaration(node) {
        defaultExport = node.declaration
      },

      ExportNamedDeclaration(node) {
        if (node.declaration?.type === "FunctionDeclaration") {
          const name = node.declaration.id?.name
          if (name) namedExports.set(name, name)
        } else if (node.declaration?.type === "VariableDeclaration") {
          for (const declaration of node.declaration.declarations) {
            if (declaration.id.type === "Identifier") {
              namedExports.set(declaration.id.name, declaration.id.name)
            }
          }
        }
        for (const specifier of node.specifiers) {
          const exported = staticName(specifier.exported)
          const local = staticName(specifier.local)
          if (exported && local) namedExports.set(exported, local)
        }
      },

      FunctionDeclaration(node) {
        if (node.id) addBinding(node.id.name, node)
      },

      VariableDeclarator(node) {
        if (node.id.type === "Identifier" && node.init)
          addBinding(node.id.name, node.init)
      },

      "Program:exit"() {
        const entries = new Set()
        const defaultEntry = resolveFunction(defaultExport)
        if (defaultEntry) entries.add(defaultEntry)
        for (const name of NAMED_ENTRIES) {
          const local = namedExports.get(name)
          if (!local) continue
          const entry = resolveFunction(bindings.get(local))
          if (entry) entries.add(entry)
        }

        for (const entry of entries) {
          const statements =
            entry.body.type === "BlockStatement"
              ? entry.body.body
              : [{ type: "ReturnStatement", argument: entry.body }]
          const hasPrime = statements.some(primeCall)

          for (const statement of statements) {
            const risk = findRisk(statement, new Set([entry]))
            if (risk) {
              context.report({
                node: risk,
                messageId: hasPrime ? "first" : "missing",
                data: { api: importedApi(risk) },
              })
              break
            }
            if (primeCall(statement)) break
          }
        }
      },
    }
  },
}
