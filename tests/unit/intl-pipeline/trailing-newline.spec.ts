/**
 * File endings on pipeline output.
 *
 * The full path emits what the model returned, and a model drops the trailing
 * newline often enough to matter; the incremental path keeps it only because
 * it splices into the existing file. Output mirrors its English source rather
 * than following a house rule, so the six English files that end without a
 * newline keep translations that match them.
 */

import { expect, test } from "@playwright/test"

import { matchTrailingNewline } from "../../../src/scripts/intl-pipeline/lib/workflows/utils"

test("adds the newline the model dropped", () => {
  expect(matchTrailingNewline("<QuizWidget />", "<QuizWidget />\n")).toBe(
    "<QuizWidget />\n"
  )
})

test("leaves output that already matches", () => {
  expect(matchTrailingNewline("text\n", "english\n")).toBe("text\n")
})

test("is idempotent", () => {
  const once = matchTrailingNewline("a", "b\n")
  expect(matchTrailingNewline(once, "b\n")).toBe(once)
})

test("does not add one when English has none", () => {
  expect(matchTrailingNewline("text\n", "english")).toBe("text")
})

test("mirrors a multi-newline ending exactly", () => {
  expect(matchTrailingNewline("text\n", "english\n\n")).toBe("text\n\n")
  expect(matchTrailingNewline("text\n\n\n", "english\n")).toBe("text\n")
})

test("leaves interior newlines alone", () => {
  expect(matchTrailingNewline("a\n\nb", "en\n")).toBe("a\n\nb\n")
})

test("empty output stays empty", () => {
  expect(matchTrailingNewline("", "english\n")).toBe("")
})
