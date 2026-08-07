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

// Project helpers that reach next-intl internally with no way to pass a locale
// through, so the caller must still prime the request locale. `getMetadata`
// accepts a `locale` but never forwards it to its own `getTranslations` call.
const RISKY_HELPERS = new Map([
  ["@/lib/utils/metadata", new Set(["getMetadata"])],
])

const RISKY_HELPER_NAMES = new Set(
  [...RISKY_HELPERS.values()].flatMap((names) => [...names])
)

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

// Innermost-first, so index 0 is the function that literally contains the call.
const functionChain = (node) => {
  const chain = []
  for (let cur = node.parent; cur; cur = cur.parent) {
    if (isFunction(cur)) chain.push(cur)
  }
  return chain
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
    const entries = new Set() // function nodes that are route entry points
    const byName = new Map() // declared name -> function node
    const calls = [] // { chain, node, api }
    let defaultExport = null

    const record = (node, api) => {
      calls.push({ chain: functionChain(node), node, api })
    }

    return {
      ImportDeclaration(node) {
        const source = node.source.value
        const helpers = RISKY_HELPERS.get(source)
        if (source !== "next-intl/server" && !helpers) return

        for (const s of node.specifiers) {
          if (s.type === "ImportSpecifier") {
            if (helpers && !helpers.has(s.imported.name)) continue
            imported.set(s.local.name, s.imported.name)
          } else if (
            s.type === "ImportNamespaceSpecifier" &&
            source === "next-intl/server"
          ) {
            namespaces.add(s.local.name)
          }
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
        const callee = node.callee
        if (callee.type === "Identifier") {
          const api = imported.get(callee.name)
          if (api) record(node, api)
          return
        }
        if (
          callee.type === "MemberExpression" &&
          !callee.computed &&
          callee.object.type === "Identifier" &&
          namespaces.has(callee.object.name)
        ) {
          record(node, callee.property.name)
        }
      },

      "Program:exit"() {
        if (defaultExport && byName.has(defaultExport))
          entries.add(byName.get(defaultExport))

        const isRisky = (c) =>
          ALWAYS.has(c.api) ||
          RISKY_HELPER_NAMES.has(c.api) ||
          (OPTIONAL_LOCALE.has(c.api) &&
            !hasExplicitLocale(c.node.arguments[0]))

        for (const fn of entries) {
          // Attribute each call to the entry it sits under, and remember whether
          // it is in the entry's own body or deferred inside a nested closure.
          const own = []
          const nested = []
          for (const c of calls) {
            const idx = c.chain.indexOf(fn)
            if (idx === -1) continue
            // A call under a *nearer* entry belongs to that one, not this.
            if (c.chain.slice(0, idx).some((f) => entries.has(f))) continue
            ;(idx === 0 ? own : nested).push(c)
          }
          own.sort((a, b) => a.node.range[0] - b.node.range[0])

          const set = own.find((c) => c.api === "setRequestLocale")
          const risk = own.find(isRisky)

          if (risk && (!set || set.node.range[0] > risk.node.range[0])) {
            context.report({
              node: risk.node,
              messageId: "first",
              data: { api: risk.api },
            })
            continue
          }

          // Execution order of a closure is not knowable statically, so only
          // flag deferred calls when the entry never primes the locale at all.
          if (set) continue
          const deferred = nested.find(isRisky)
          if (deferred) {
            context.report({
              node: deferred.node,
              messageId: "missing",
              data: { api: deferred.api },
            })
          }
        }
      },
    }
  },
}
