import { RuleTester } from "eslint"
import { createRequire } from "node:module"
import { test } from "@playwright/test"

const req = createRequire(__filename)
const rule = req("../../../.eslint-rules/set-request-locale-first.js")

const ruleTester = new RuleTester({
  parser: req.resolve("@typescript-eslint/parser"),
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
})

const valid = [
  // Primed before the first locale-resolving call.
  `import { getTranslations, setRequestLocale } from "next-intl/server"
   export default async function Page({ params }) {
     const { locale } = await params
     setRequestLocale(locale)
     const t = await getTranslations("common")
     return <div>{t("x")}</div>
   }`,

  // An explicit locale short-circuits next-intl's header read.
  `import { getTranslations } from "next-intl/server"
   export default async function Page({ params }) {
     const { locale } = await params
     const t = await getTranslations({ locale, namespace: "common" })
     return <div>{t("x")}</div>
   }`,

  // A spread may carry `locale`, so it must not be called a violation.
  `import { getMessages } from "next-intl/server"
   export default async function Page({ params }) {
     const opts = await params
     return <div>{JSON.stringify(await getMessages({ ...opts }))}</div>
   }`,

  // Deferred inside a closure that runs after priming: correct code that the
  // old textual-order check reported.
  `import { getTranslations, setRequestLocale } from "next-intl/server"
   export default async function Page({ params }) {
     const { locale } = await params
     const later = async () => await getTranslations("common")
     setRequestLocale(locale)
     const t = await later()
     return <div>{t("x")}</div>
   }`,

  // getMetadata reaches next-intl internally, but the locale is primed first.
  `import { setRequestLocale } from "next-intl/server"
   import { getMetadata } from "@/lib/utils/metadata"
   export async function generateMetadata({ params }) {
     const { locale } = await params
     setRequestLocale(locale)
     return await getMetadata({ locale, slug: [], title: "t" })
   }`,

  // Not a route entry point, so the rule has no opinion.
  `import { getTranslations } from "next-intl/server"
   export async function helper() {
     return await getTranslations("common")
   }`,

  // Entry reached through an identifier default export.
  `import { getLocale, setRequestLocale } from "next-intl/server"
   const Page = async ({ params }) => {
     const { locale } = await params
     setRequestLocale(locale)
     return <div>{await getLocale()}</div>
   }
   export default Page`,

  // A same-named import from an unrelated module must not be tracked.
  `import { getMetadata } from "@/lib/utils/somewhere-else"
   export async function generateMetadata() {
     return await getMetadata({ title: "t" })
   }`,
]

const invalid = [
  // The shape this PR fixed across 14 pages.
  {
    code: `import { getTranslations, setRequestLocale } from "next-intl/server"
           export default async function Page({ params }) {
             const { locale } = await params
             const t = await getTranslations("common")
             setRequestLocale(locale)
             return <div>{t("x")}</div>
           }`,
    errors: [{ messageId: "first" }],
  },

  // getLocale has no override parameter, so it always resolves the request.
  {
    code: `import { getLocale } from "next-intl/server"
           export default async function Page() {
             return <div>{await getLocale()}</div>
           }`,
    errors: [{ messageId: "first" }],
  },

  // The #18800 shape: the only next-intl reach is through getMetadata.
  {
    code: `import { getMetadata } from "@/lib/utils/metadata"
           export async function generateMetadata({ params }) {
             const { locale } = await params
             return await getMetadata({ locale, slug: [], title: "t" })
           }`,
    errors: [{ messageId: "first" }],
  },

  // setRequestLocale sits in a closure that is never invoked, so it primes
  // nothing; the old textual-order check accepted this.
  {
    code: `import { getTranslations, setRequestLocale } from "next-intl/server"
           export default async function Page({ params }) {
             const { locale } = await params
             const prime = () => setRequestLocale(locale)
             const t = await getTranslations("common")
             return <div>{t("x")}</div>
           }`,
    errors: [{ messageId: "first" }],
  },

  // Namespace import reaches the same APIs.
  {
    code: `import * as intl from "next-intl/server"
           export default async function Page() {
             return <div>{await intl.getLocale()}</div>
           }`,
    errors: [{ messageId: "first" }],
  },

  // Deferred call in an entry that never primes at all.
  {
    code: `import { getTranslations } from "next-intl/server"
           export default async function Page() {
             const later = async () => await getTranslations("common")
             const t = await later()
             return <div>{t("x")}</div>
           }`,
    errors: [{ messageId: "missing" }],
  },

  // generateViewport is an entry point too.
  {
    code: `import { getLocale } from "next-intl/server"
           export async function generateViewport() {
             return { themeColor: await getLocale() }
           }`,
    errors: [{ messageId: "first" }],
  },
]

test("set-request-locale-first", () => {
  RuleTester.describe = (_: string, fn: () => void) => fn()
  RuleTester.it = (_: string, fn: () => void) => fn()
  ruleTester.run("set-request-locale-first", rule, { valid, invalid })
})
