import path from "path"

import { expect, test } from "@playwright/test"

import questionBank from "@/data/quizzes/questionBank"

import {
  loadEnglishMessages,
  quizKeys,
  scanTranslations,
  type TranslationRef,
} from "@/scripts/intl-keys"

const root = path.resolve(__dirname, "../../..")
const messages = loadEnglishMessages(root)
let refs: TranslationRef[] = []

test.describe("translation keys", () => {
  test.describe.configure({ mode: "default" })

  test.beforeAll(() => {
    test.setTimeout(180_000)
    refs = scanTranslations(root).refs
  })

  test("the scan resolves most translator calls", () => {
    const literal = refs.filter((r) => r.key.kind === "lit")
    const skipped = refs.length - literal.length
    test.info().annotations.push({
      type: "scan",
      description: `${literal.length} literal keys checked, ${skipped} template/variable keys skipped`,
    })
    expect(literal.filter((r) => r.ns !== null).length).toBeGreaterThan(4000)
    expect(skipped).toBeLessThan(literal.length / 5)
  })

  test("every literal key exists in its English namespace", () => {
    const missing = refs.flatMap(({ at, ns, key, colon }) => {
      if (key.kind !== "lit" || ns === null || colon) return []
      return key.value in (messages[ns] ?? {})
        ? []
        : [`${at} ${ns}: ${key.value}`]
    })
    expect(missing).toEqual([])
  })

  test("keys on translators of unknown namespace exist somewhere", () => {
    const all = new Set(Object.values(messages).flatMap(Object.keys))
    const missing = refs.flatMap(({ at, ns, key }) =>
      key.kind === "lit" && ns === null && !all.has(key.value)
        ? [`${at} ${key.value}`]
        : []
    )
    expect(missing).toEqual([])
  })

  test('no t("ns:key") on a namespace-bound translator', () => {
    const colon = refs.flatMap(({ at, key, colon }) =>
      colon && key.kind === "lit" ? [`${at} ${key.value}`] : []
    )
    expect(colon).toEqual([])
  })

  test("the quiz question bank only produces existing learn-quizzes keys", () => {
    const keys = quizKeys(questionBank)
    expect(keys.size).toBeGreaterThan(100)
    const missing = [...keys].filter((k) => !(k in messages["learn-quizzes"]))
    expect(missing).toEqual([])
  })
})
