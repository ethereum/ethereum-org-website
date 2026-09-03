import { ESLint } from "eslint"
import path from "node:path"
import { expect, test } from "@playwright/test"

const cwd = path.resolve(__dirname, "../../..")
const eslint = new ESLint({ cwd })

const unsafeRoute = `
  import {getLocale} from "next-intl/server"
  export default async function Route() {
    return <div>{await getLocale()}</div>
  }
`

const localMessages = async (filePath: string, code = unsafeRoute) => {
  const [result] = await eslint.lintText(code, { filePath })
  return result.messages.filter(
    (message) => message.ruleId === "local/set-request-locale-first"
  )
}

for (const fileName of [
  "page.tsx",
  "layout.tsx",
  "template.tsx",
  "default.tsx",
  "loading.tsx",
  "not-found.tsx",
  "opengraph-image.tsx",
]) {
  test(`actual ESLint config checks ${fileName} route files`, async () => {
    const messages = await localMessages(`app/[locale]/fixture/${fileName}`)
    expect(messages).toHaveLength(1)
    expect(messages[0].messageId).toBe("missing")
  })
}

test("actual ESLint config does not check descendant component files", async () => {
  expect(
    await localMessages("app/[locale]/fixture/_components/content.tsx")
  ).toEqual([])
})

test("root not-found stays valid with an explicit locale", async () => {
  const code = `
    import {getMessages} from "next-intl/server"
    export default async function GlobalNotFound() {
      const messages = await getMessages({locale: "en"})
      return <html><body>{JSON.stringify(messages)}</body></html>
    }
  `
  expect(await localMessages("app/not-found.tsx", code)).toEqual([])
})
