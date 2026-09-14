import { Linter } from "eslint"
import { createRequire } from "node:module"
import { expect, test } from "@playwright/test"

const req = createRequire(__filename)
const rule = req("../../../.eslint-rules/set-request-locale-first.js")

const lint = (code: string) => {
  const linter = new Linter()
  linter.defineParser("typescript", req("@typescript-eslint/parser"))
  linter.defineRule("set-request-locale-first", rule)
  return linter
    .verify(
      code,
      {
        parser: "typescript",
        parserOptions: {
          ecmaVersion: "latest",
          sourceType: "module",
          ecmaFeatures: { jsx: true },
        },
        rules: { "set-request-locale-first": "error" },
      },
      "app/[locale]/example/page.tsx"
    )
    .map((message) => message.messageId)
}

test("accepts a top-level prime before a direct API", () => {
  expect(
    lint(`
      import { getTranslations, setRequestLocale } from "next-intl/server"
      export default async function Page({ params }) {
        const { locale } = await params
        setRequestLocale(locale)
        return <div>{(await getTranslations("common"))("x")}</div>
      }
    `)
  ).toEqual([])
})

test("accepts an explicit locale key, quoted or not", () => {
  expect(
    lint(`
      import { getExtracted, getTranslations } from "next-intl/server"
      export default async function Page({ params }) {
        const { locale } = await params
        await getExtracted({ locale })
        return <div>{(await getTranslations({ "locale": locale, namespace: "common" }))("x")}</div>
      }
    `)
  ).toEqual([])
})

test("flags a bare getExtracted call", () => {
  expect(
    lint(`
      import { getExtracted } from "next-intl/server"
      export default async function Page() {
        return <div>{JSON.stringify(await getExtracted("common"))}</div>
      }
    `)
  ).toEqual(["missing"])
})

test("accepts getMetadata and getMdMetadata that already receive locale", () => {
  expect(
    lint(`
      import { getMetadata } from "@/lib/utils/metadata"
      import { getMdMetadata } from "@/lib/md/metadata"
      export async function generateMetadata({ params }) {
        const { locale } = await params
        return getMetadata({ locale, slug: [], title: "t" }) ?? getMdMetadata({ locale, slug: [] })
      }
    `)
  ).toEqual([])
})

test("ignores generateMetadata unless it is exported as that name", () => {
  expect(
    lint(`
      import { getLocale } from "next-intl/server"
      async function generateMetadata() {
        return { title: await getLocale() }
      }
      export default function Page() {
        return <div />
      }
    `)
  ).toEqual([])
})

test("flags an unsafe Page even when generateMetadata is safe", () => {
  expect(
    lint(`
      import { getTranslations } from "next-intl/server"
      export async function generateMetadata({ params }) {
        const { locale } = await params
        return { title: (await getTranslations({ locale, namespace: "common" }))("title") }
      }
      export default async function Page() {
        return <div>{(await getTranslations("common"))("x")}</div>
      }
    `)
  ).toEqual(["missing"])
})

test("rejects a spread without an explicit locale property", () => {
  expect(
    lint(`
      import { getMessages } from "next-intl/server"
      export default async function Page({ params }) {
        return <div>{JSON.stringify(await getMessages({ ...params }))}</div>
      }
    `)
  ).toEqual(["missing"])
})

test("follows a same-file helper called before the prime", () => {
  expect(
    lint(`
      import { getLocale, setRequestLocale } from "next-intl/server"
      const readLocale = () => getLocale()
      export default async function Page({ params }) {
        const value = await readLocale()
        const { locale } = await params
        setRequestLocale(locale)
        return <div>{value}</div>
      }
    `)
  ).toEqual(["first"])
})

test("flags an IIFE and an eagerly invoked callback", () => {
  expect(
    lint(`
      import { getLocale, getTranslations } from "next-intl/server"
      export default async function Page() {
        await (async () => getTranslations("common"))()
        await Promise.all([1].map(() => getLocale()))
        return <div />
      }
    `)
  ).toEqual(["missing"])
})

test("rejects a conditional or no-arg prime", () => {
  expect(
    lint(`
      import { getLocale, setRequestLocale } from "next-intl/server"
      export default async function Page({ params }) {
        const { locale } = await params
        if (locale) setRequestLocale(locale)
        setRequestLocale()
        return <div>{await getLocale()}</div>
      }
    `)
  ).toEqual(["missing"])
})

test("resolves a wrapped default export", () => {
  expect(
    lint(`
      import { getLocale } from "next-intl/server"
      const Page = async () => <div>{await getLocale()}</div>
      export default withAuth(Page)
    `)
  ).toEqual(["missing"])
})

test("treats generateMetadata as an entry only via its exported name", () => {
  expect(
    lint(`
      import * as intl from "next-intl/server"
      const metadata = async () => ({ title: await intl.getLocale() })
      export { metadata as generateMetadata }
      export default function Page() {
        return <div />
      }
    `)
  ).toEqual(["missing"])
})
