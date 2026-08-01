import { createElement, Fragment } from "react"
import { expect, test } from "@playwright/test"

import { getCodeText } from "@/components/Codeblock/getCodeText"

test.describe("getCodeText", () => {
  test("extracts text from nested code elements", () => {
    const children = createElement(
      "code",
      null,
      "const answer = ",
      createElement("span", null, 42),
      createElement(Fragment, null, ";", "\n")
    )

    expect(getCodeText(children)).toBe("const answer = 42;\n")
  })

  test("accepts empty code elements", () => {
    expect(getCodeText(createElement("code"))).toBe("")
  })

  test("ignores values React does not render", () => {
    expect(getCodeText([null, undefined, false, "text"])).toBe("text")
  })

  test("rejects unsupported child structures", () => {
    expect(() => getCodeText({ value: "silently dropped before" })).toThrow(
      "Codeblock children must resolve to text; received [object Object]"
    )
  })
})
