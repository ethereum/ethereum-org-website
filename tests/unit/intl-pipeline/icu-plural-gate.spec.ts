/**
 * ICU placeholder checks in verifyJson.
 *
 * Counting every placeholder occurrence rejects correct translations: a plural
 * carries one branch per CLDR category, so Czech (one/few/other) repeats
 * `{count}` three times where English (one/other) repeats it twice. Five
 * locales were translated, gated, discarded and quarantined over exactly that
 * before this was fixed. Names are compared as a set; occurrences are counted
 * only for names no branch uses, so a dropped repeat in flat prose still fails.
 */

import { expect, test } from "@playwright/test"

import { verifyJson } from "../../../src/scripts/intl-pipeline/lib/verify-structure"

const json = (v: string) => JSON.stringify({ k: v })
const checks = (en: string, tr: string) =>
  verifyJson(json(en), json(tr), "f.json").map((f) => f.check)

// The live strings from PR #19474.
const EN_UPTIME = "{years, plural, one {{count} year} other {{count} years}}"

test("czech one/few/other passes against english one/other", () => {
  const cs =
    "{years, plural, one {{count} rok} few {{count} roky} other {{count} let}}"
  expect(checks(EN_UPTIME, cs)).toEqual([])
})

test("polish four-branch plural passes", () => {
  const pl =
    "{years, plural, one {{count} rok} few {{count} lata} many {{count} lat} other {{count} roku}}"
  expect(checks(EN_UPTIME, pl)).toEqual([])
})

test("arabic six-branch plural passes", () => {
  const ar =
    "{years, plural, zero {{count} سنة} one {{count} سنة} two {{count} سنتان} few {{count} سنوات} many {{count} سنة} other {{count} سنة}}"
  expect(checks(EN_UPTIME, ar)).toEqual([])
})

test("the real find-wallet fallback passes for czech", () => {
  const en =
    "{wallet} — Ethereum wallet for {devices}. Supports {networkCount, plural, one {{networkCountFormatted} network} other {{networkCountFormatted} networks}}."
  const cs =
    "{wallet} — Ethereum peněženka pro {devices}. Podporuje {networkCount, plural, one {{networkCountFormatted} síť} few {{networkCountFormatted} sítě} other {{networkCountFormatted} sítí}}."
  expect(checks(en, cs)).toEqual([])
})

// --- still strict ----------------------------------------------------------

test("a dropped placeholder fails", () => {
  expect(checks("{a} and {b}", "{a} a")).toEqual(["json-placeholder"])
})

test("a renamed placeholder fails", () => {
  expect(checks("{count} items", "{cuenta} elementos")).toEqual([
    "json-placeholder",
  ])
})

test("an extra placeholder fails", () => {
  expect(checks("{a}", "{a} {b}")).toEqual(["json-placeholder"])
})

test("a dropped repeat in flat prose still fails", () => {
  // The case a plain set comparison would let through.
  expect(checks("{x} then {x} again", "{x} potom znovu")).toEqual([
    "json-placeholder",
  ])
})

test("a repeat inside a plural branch is not counted", () => {
  const en = "{n, plural, one {{x} a {x}} other {{x} b {x}}}"
  const cs = "{n, plural, one {{x}} few {{x} c {x}} other {{x}}}"
  expect(checks(en, cs)).toEqual([])
})

test("a placeholder dropped from the other branch fails", () => {
  // `other` is mandatory and is the catch-all, so losing a name there is
  // unambiguous.
  const tr = "{years, plural, one {{count} rok} few {{count} roky} other {let}}"
  expect(checks(EN_UPTIME, tr)).toEqual(["json-plural-placeholder"])
})

test("a placeholder dropped from a counted branch fails", () => {
  // The defect a set comparison alone cannot see: {count} survives in two
  // branches, so the name set still matches, but Czech 2-4 years loses its
  // number.
  const tr = "{years, plural, one {{count} rok} few {roky} other {{count} let}}"
  expect(checks(EN_UPTIME, tr)).toEqual(["json-plural-branch"])
  expect(
    verifyJson(json(EN_UPTIME), json(tr), "f.json").map((f) => f.severity)
  ).toEqual(["error"])
})

test("one and zero may omit the number, as a warning", () => {
  // "a year" and "no years" read naturally without the numeral.
  const tr = "{years, plural, one {rok} few {{count} roky} other {{count} let}}"
  const f = verifyJson(json(EN_UPTIME), json(tr), "f.json")
  expect(f.map((x) => `${x.severity}:${x.check}`)).toEqual([
    "warn:json-plural-branch",
  ])
})

test("the arabic dual may omit the number", () => {
  // "سنتان" already means "two years"; the dual noun carries the count. This
  // failed ar/page-organizations-enterprise on the first recovery run.
  const ar =
    "{years, plural, zero {{count} سنة} one {سنة} two {سنتان} few {{count} سنوات} many {{count} سنة} other {{count} سنة}}"
  const f = verifyJson(json(EN_UPTIME), json(ar), "f.json")
  expect(f.filter((x) => x.severity === "error")).toEqual([])
})

test("few and many still need their number", () => {
  const ar =
    "{years, plural, zero {{count} سنة} one {سنة} two {سنتان} few {سنوات} many {{count} سنة} other {{count} سنة}}"
  expect(
    verifyJson(json(EN_UPTIME), json(ar), "f.json")
      .filter((x) => x.severity === "error")
      .map((x) => x.check)
  ).toEqual(["json-plural-branch"])
})

test("malformed plural syntax fails", () => {
  expect(
    checks(EN_UPTIME, "{years, plural, one {{count} rok} other {")
  ).toEqual(["json-icu-parse"])
})

test("english that does not parse is not this file's problem", () => {
  expect(checks("{broken", "anything at all")).toEqual([])
})

// --- tags ------------------------------------------------------------------

test("a dropped tag fails", () => {
  expect(checks("a <strong>b</strong>", "a b")).toEqual(["json-tag"])
})

test("an unbalanced tag fails", () => {
  expect(checks("a <strong>b</strong>", "a <strong>b")).toEqual([
    "json-tag-unbalanced",
  ])
})

test("a tag repeated per plural branch passes", () => {
  const en =
    "{n, plural, one {<strong>{n}</strong> x} other {<strong>{n}</strong> y}}"
  const cs =
    "{n, plural, one {<strong>{n}</strong> a} few {<strong>{n}</strong> b} other {<strong>{n}</strong> c}}"
  expect(checks(en, cs)).toEqual([])
})

test("html with attributes is left to the tag check, not ICU", () => {
  const en = 'See our <a href="/contributing">guide</a>.'
  const tr = 'Viz náš <a href="/contributing">průvodce</a>.'
  expect(checks(en, tr)).toEqual([])
})

test("a string with an attribute-bearing tag still gets the balance check", () => {
  // 213 English strings carry `<a href=...>`. Seeing only their `</a>` made
  // them look unbalanced, which skipped the check for the whole string.
  const en = 'See our <a href="/contributing">guide</a>.'
  const tr = 'Viz <a href="/contributing">pruvodce.'
  expect(checks(en, tr)).toEqual(["json-tag-unbalanced"])
})

test("a void tag does not unbalance", () => {
  expect(checks("a<br>b", "x<br>y")).toEqual([])
  expect(checks("a<br />b", "x<br />y")).toEqual([])
})

test("placeholder residue is still reported", () => {
  expect(checks("{a}", "{a} HTML-PLACEHOLDER-LINK-ab12")).toEqual([
    "placeholder-residue",
  ])
})
