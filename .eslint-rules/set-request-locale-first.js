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

const isFunction = (node) =>
  node?.type === "FunctionDeclaration" ||
  node?.type === "FunctionExpression" ||
  node?.type === "ArrowFunctionExpression"

const hasExplicitLocale = (arg) =>
  arg?.type === "ObjectExpression" &&
  // a spread might carry `locale`, so don't claim a violation
  arg.properties.some(
    (p) => p.type === "SpreadElement" || p.key?.name === "locale"
  )

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
    },
  },

  create(context) {
    const imported = new Map() // local name -> next-intl export name
    const entries = new Set() // function nodes that are route entry points
    const byName = new Map() // declared name -> function node
    const calls = [] // { fn, node, api }
    let defaultExport = null

    const enclosingEntry = (node) => {
      for (const a of context.getAncestors()) if (isFunction(a)) return a
      return isFunction(node) ? node : null
    }

    return {
      ImportDeclaration(node) {
        if (node.source.value !== "next-intl/server") return
        for (const s of node.specifiers) {
          if (s.type === "ImportSpecifier")
            imported.set(s.local.name, s.imported.name)
        }
      },

      ExportDefaultDeclaration(node) {
        if (isFunction(node.declaration)) entries.add(node.declaration)
        else if (node.declaration.type === "Identifier")
          defaultExport = node.declaration.name
      },

      FunctionDeclaration(node) {
        if (!node.id) return
        byName.set(node.id.name, node)
        if (NAMED_ENTRIES.has(node.id.name)) entries.add(node)
      },

      VariableDeclarator(node) {
        if (node.id.type !== "Identifier" || !isFunction(node.init)) return
        byName.set(node.id.name, node.init)
        if (NAMED_ENTRIES.has(node.id.name)) entries.add(node.init)
      },

      CallExpression(node) {
        if (node.callee.type !== "Identifier") return
        const api = imported.get(node.callee.name)
        if (!api) return
        const fn = enclosingEntry(node)
        if (fn) calls.push({ fn, node, api })
      },

      "Program:exit"() {
        if (defaultExport && byName.has(defaultExport))
          entries.add(byName.get(defaultExport))

        for (const fn of entries) {
          const own = calls
            .filter((c) => c.fn === fn)
            .sort((a, b) => a.node.range[0] - b.node.range[0])

          const risk = own.find(
            (c) =>
              ALWAYS.has(c.api) ||
              (OPTIONAL_LOCALE.has(c.api) &&
                !hasExplicitLocale(c.node.arguments[0]))
          )
          if (!risk) continue

          const set = own.find((c) => c.api === "setRequestLocale")
          if (!set || set.node.range[0] > risk.node.range[0]) {
            context.report({
              node: risk.node,
              messageId: "first",
              data: { api: risk.api },
            })
          }
        }
      },
    }
  },
}
