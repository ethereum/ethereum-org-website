/**
 * Unit tests for sanitizer warning functions.
 * These functions detect issues and return warnings without modifying content.
 */

import { expect, test } from "@playwright/test"

import { _testOnly } from "@/scripts/i18n/post_import_sanitize"

const {
  warnPunctuationOnlyHeadings,
  warnCodeFenceContentDrift,
  warnCatastrophicCodeFenceDrift,
  fixTranslatedHrefs,
  detectCrossScriptContamination,
  warnExposedMdxTags,
  warnTranslatedInlineCode,
  fixBareRtlDates,
  fixBareRtlEquations,
  warnTranslatedTechnicalNumerals,
} = _testOnly

test.describe("Warning Functions", () => {
  test.describe("warnPunctuationOnlyHeadings", () => {
    test("warns on heading with only punctuation text", () => {
      const input = "## \u3002 {#who-is-involved}"
      const warnings = warnPunctuationOnlyHeadings(input)
      expect(warnings.length).toBe(1)
      expect(warnings[0]).toContain("only punctuation")
    })

    test("does not warn on real heading text", () => {
      const input = "## Real heading {#id}"
      const warnings = warnPunctuationOnlyHeadings(input)
      expect(warnings).toHaveLength(0)
    })

    test("warns on question-mark-only heading", () => {
      const input = "## ??? {#faq}"
      const warnings = warnPunctuationOnlyHeadings(input)
      expect(warnings.length).toBe(1)
      expect(warnings[0]).toContain("only punctuation")
    })
  })

  test.describe("warnCodeFenceContentDrift", () => {
    test("no warning when fences are identical", () => {
      const content = "```js\nconst x = 1\n```"
      const warnings = warnCodeFenceContentDrift(content, content)
      expect(warnings).toHaveLength(0)
    })

    test("warns when code content was translated", () => {
      const english = "```js\nconst x = 1\n```"
      const translated = "```js\nconst x = 1\u306E\u5024\n```"
      const warnings = warnCodeFenceContentDrift(translated, english)
      expect(warnings.length).toBe(1)
      expect(warnings[0]).toContain("content differs")
    })

    test("warns on fence count mismatch", () => {
      const english = "```js\ncode1\n```\n\n```py\ncode2\n```"
      const translated = "```js\ncode1\n```"
      const warnings = warnCodeFenceContentDrift(translated, english)
      expect(warnings.length).toBe(1)
      expect(warnings[0]).toContain("count mismatch")
    })
  })

  test.describe("warnCatastrophicCodeFenceDrift", () => {
    test("detects prose inside fences that should contain code", () => {
      const english = [
        "Some prose here.",
        "",
        "```python",
        "def foo(x, y):",
        "  if x > y:",
        "    return x",
        "  return y",
        "```",
        "",
        "More prose.",
      ].join("\n")
      const translated = [
        "Du texte ici.",
        "",
        "```python",
        "Voici une explication de la fonction.",
        "```",
        "",
        "def foo(x, y):",
        "  if x > y:",
        "    return x",
        "  return y",
        "",
        "Plus de texte.",
      ].join("\n")
      const warnings = warnCatastrophicCodeFenceDrift(translated, english)
      expect(warnings.length).toBeGreaterThan(0)
      expect(warnings[0]).toContain("CATASTROPHIC")
    })

    test("detects code keywords outside fences", () => {
      const english = [
        "```python",
        "def unknown2e7ba6ef(uint256 _param1):",
        "  require _param2 == addr(_param2)",
        "  if currentWindow <= _param1:",
        "    revert with 0, 'error'",
        "```",
      ].join("\n")
      const translated = [
        "```python",
        "Voici ce que le decompilateur nous donne.",
        "```",
        "",
        "def unknown2e7ba6ef(uint256 _param1):",
        "  require _param2 == addr(_param2)",
        "  if currentWindow <= _param1:",
        "    revert with 0, 'error'",
      ].join("\n")
      const warnings = warnCatastrophicCodeFenceDrift(translated, english)
      expect(warnings.length).toBeGreaterThan(0)
      const hasCodeOutsideFence = warnings.some(
        (w) => w.includes("code keyword") || w.includes("CATASTROPHIC")
      )
      expect(hasCodeOutsideFence).toBe(true)
    })

    test("no warning when fences match correctly", () => {
      const content = [
        "Some prose.",
        "",
        "```python",
        "def foo():",
        "  return 1",
        "```",
        "",
        "More prose.",
      ].join("\n")
      const warnings = warnCatastrophicCodeFenceDrift(content, content)
      expect(warnings).toHaveLength(0)
    })

    test("detects detached heading anchor IDs", () => {
      const english = ["### claim {#claim}", "", "Some text about claim."].join(
        "\n"
      )
      const translated = [
        "### Du texte ici.",
        "",
        "claim {#claim} Le code est complexe.",
      ].join("\n")
      const warnings = warnCatastrophicCodeFenceDrift(translated, english)
      const hasDetachedAnchor = warnings.some((w) => w.includes("anchor"))
      expect(hasDetachedAnchor).toBe(true)
    })

    test("no false positive on anchor IDs properly on heading lines", () => {
      const content = [
        "### La revendication {#claim}",
        "",
        "Some text about claim.",
      ].join("\n")
      const warnings = warnCatastrophicCodeFenceDrift(content, content)
      const anchorWarnings = warnings.filter((w) => w.includes("anchor"))
      expect(anchorWarnings).toHaveLength(0)
    })
  })

  test.describe("fixTranslatedHrefs (warn-only)", () => {
    test("NEVER modifies content", () => {
      const english = "See [docs](/docs) and [about](/about)"
      const translated =
        "See [\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8](/wrong-path) and [\u6982\u8981](/about)"
      const { content, fixCount } = fixTranslatedHrefs(translated, english)
      expect(content).toBe(translated)
      expect(fixCount).toBe(0)
    })

    test("warns about missing English hrefs", () => {
      const english = "See [docs](/docs) and [about](/about)"
      const translated = "See [\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8](/docs)"
      const { warnings } = fixTranslatedHrefs(translated, english)
      const missingWarning = warnings.find((w) => w.includes("/about"))
      expect(missingWarning).toBeDefined()
      expect(missingWarning).toContain("Missing href")
    })

    test("warns about translation-only hrefs", () => {
      const english = "See [docs](/docs)"
      const translated =
        "See [\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8](/docs) and [\u4ED6](/other)"
      const { warnings } = fixTranslatedHrefs(translated, english)
      const invalidWarning = warnings.find((w) => w.includes("/other"))
      expect(invalidWarning).toBeDefined()
      expect(invalidWarning).toContain("Invalid internal href")
    })

    test("no warnings when all hrefs match", () => {
      const content = "See [text](/docs) and [more](/about)"
      const { warnings } = fixTranslatedHrefs(content, content)
      expect(warnings).toHaveLength(0)
    })

    test("warns on block count mismatch without modifying content", () => {
      const english = "Block one\n\nBlock two\n\nBlock three"
      const translated = "Block one\n\nBlock two"
      const { content, warnings } = fixTranslatedHrefs(translated, english)
      expect(content).toBe(translated)
      const blockWarning = warnings.find((w) => w.includes("Block count"))
      expect(blockWarning).toBeDefined()
    })
  })

  test.describe("detectCrossScriptContamination", () => {
    test("warns on Cyrillic chars in Japanese content", () => {
      const content =
        "\u30A4\u30FC\u30B5\u30EA\u30A2\u30E0\u306F \u0410\u0411\u0412 \u3067\u3059"
      const warnings = detectCrossScriptContamination(content, "ja")
      expect(warnings.length).toBe(1)
      expect(warnings[0]).toContain("Cyrillic")
    })

    test("warns on Devanagari chars in Bengali content", () => {
      const content =
        "\u09AC\u09BE\u0982\u09B2\u09BE \u0915\u0916\u0917 \u099F\u09C7\u0995\u09CD\u09B8\u099F"
      const warnings = detectCrossScriptContamination(content, "bn")
      expect(warnings.length).toBe(1)
      expect(warnings[0]).toContain("Devanagari")
    })

    test("warns on CJK chars in Tamil content", () => {
      const content =
        "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD \u4E2D\u6587 \u0B89\u0BB0\u0BC8"
      const warnings = detectCrossScriptContamination(content, "ta")
      expect(warnings.length).toBe(1)
      expect(warnings[0]).toContain("CJK")
    })

    test("returns no warnings for unknown locale", () => {
      const content = "some \u0410\u0411\u0412 text"
      const warnings = detectCrossScriptContamination(content, "xx-unknown")
      expect(warnings).toHaveLength(0)
    })

    test("skips characters inside code blocks", () => {
      const content = "```\n\u0410\u0411\u0412\n```\n\u30C6\u30B9\u30C8"
      const warnings = detectCrossScriptContamination(content, "ja")
      // Cyrillic is inside code block, should be skipped
      expect(warnings).toHaveLength(0)
    })

    test("skips characters inside inline code", () => {
      const content =
        "\u30C6\u30B9\u30C8 `\u0410\u0411\u0412` \u30C6\u30B9\u30C8"
      const warnings = detectCrossScriptContamination(content, "ja")
      expect(warnings).toHaveLength(0)
    })
  })

  test.describe("warnExposedMdxTags", () => {
    test("warns on bare </> outside backticks", () => {
      const content =
        "React \uCEF4\uD3EC\uB10C\uD2B8(`<> ...` </>`) \uC0AC\uC6A9"
      const warnings = warnExposedMdxTags(content)
      expect(warnings.length).toBeGreaterThan(0)
      expect(warnings[0]).toContain("</>")
    })

    test("warns on bare <contract> outside backticks", () => {
      const content =
        "\uC774\uB294 `<contract>.<function name>` \uAD6C\uBB38\uC744 \uC0AC\uC6A9\uD560 \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4.()` \uAD6C\uBB38\uC744 \uC0AC\uC6A9\uD558\uB294 \uAC83\uBCF4\uB2E4 (`<contract>.call()` \uB4F1)"
      const warnings = warnExposedMdxTags(content)
      expect(warnings.length).toBeGreaterThan(0)
    })

    test("no warning when tags are inside backticks", () => {
      const content = "Use `<contract>.<function name>()` syntax"
      const warnings = warnExposedMdxTags(content)
      expect(warnings).toHaveLength(0)
    })

    test("no warning on known MDX components", () => {
      const content =
        '<ExpandableCard title="test">\ncontent\n</ExpandableCard>'
      const warnings = warnExposedMdxTags(content)
      expect(warnings).toHaveLength(0)
    })

    test("no warning on AlertEmoji and other safe components", () => {
      const content = [
        '<AlertEmoji text=":eyes:"/>',
        '<GlossaryDefinition term="fork" />',
        '<YouTube id="abc123" />',
        '<NetworkUpgradeSummary name="daoFork" />',
        '<SocialListItem socialIcon="reddit">',
        "</SocialListItem>",
      ].join("\n")
      const warnings = warnExposedMdxTags(content)
      expect(warnings).toHaveLength(0)
    })

    test("no warning on DocLink (registered MDX component)", () => {
      const content = [
        '<DocLink href="/guides/how-to-use-a-wallet/">',
        "  How to use a wallet",
        "</DocLink>",
      ].join("\n")
      const warnings = warnExposedMdxTags(content)
      expect(warnings).toHaveLength(0)
    })

    test("no warning on any PascalCase tag (future-proof)", () => {
      const content = '<FutureComponent prop="value">content</FutureComponent>'
      const warnings = warnExposedMdxTags(content)
      expect(warnings).toHaveLength(0)
    })

    test("still warns on lowercase non-HTML tags outside backticks", () => {
      const content = "The <contract>.<method>() pattern"
      const warnings = warnExposedMdxTags(content)
      expect(warnings.length).toBeGreaterThan(0)
    })
  })

  test.describe("warnTranslatedInlineCode", () => {
    test("warns when translation has fewer inline code spans than English", () => {
      const english = [
        "We use `deployContract` method from `Waffle` to deploy.",
        "Pass `wallet`, the compiled json file.",
      ].join("\n")
      const translated = [
        "Usamos o `deployContract` metodo de `Waffle` para publicar.",
        "Passar a carteira `, o arquivo json compilado.",
      ].join("\n")
      const warnings = warnTranslatedInlineCode(translated, english)
      expect(warnings.length).toBeGreaterThan(0)
      expect(warnings[0]).toContain("inline code")
    })

    test("no warning when inline code counts match", () => {
      const english = "Use `deployContract` from `Waffle` with `wallet`."
      const translated = "Use `deployContract` de `Waffle` com `wallet`."
      const warnings = warnTranslatedInlineCode(translated, english)
      expect(warnings).toHaveLength(0)
    })

    test("no warning when English has no inline code", () => {
      const english = "This is plain text without code."
      const translated = "Este e texto simples sem codigo."
      const warnings = warnTranslatedInlineCode(translated, english)
      expect(warnings).toHaveLength(0)
    })

    test("ignores code spans inside fenced code blocks", () => {
      const english = [
        "```",
        "const x = `template`",
        "```",
        "Use `wallet` here.",
      ].join("\n")
      const translated = [
        "```",
        "const x = `template`",
        "```",
        "Use `wallet` aqui.",
      ].join("\n")
      const warnings = warnTranslatedInlineCode(translated, english)
      expect(warnings).toHaveLength(0)
    })

    test("warns on orphaned backtick even when count diff is small", () => {
      // Many code spans match, but one line has a stray backtick
      const spans = Array.from({ length: 20 }, (_, i) => `\`code${i}\``)
      const english = spans.join(" text ") + " and `wallet` here."
      const translated = spans.join(" text ") + " e a carteira `, aqui."
      const warnings = warnTranslatedInlineCode(translated, english)
      const orphanWarning = warnings.find((w) => w.includes("Orphaned"))
      expect(orphanWarning).toBeDefined()
    })
  })

  test.describe("fixBareRtlDates", () => {
    test("wraps bare YYYY-MM-DD date in Arabic file", () => {
      const input = "تم الإطلاق في 2026-03-15 على الشبكة"
      const { content, fixCount } = fixBareRtlDates(input, "ar")
      expect(content).toBe(
        'تم الإطلاق في <span dir="ltr">2026-03-15</span> على الشبكة'
      )
      expect(fixCount).toBe(1)
    })

    test("wraps bare DD/MM/YYYY date", () => {
      const input = "التاريخ هو 15/03/2026 للإطلاق"
      const { content, fixCount } = fixBareRtlDates(input, "ar")
      expect(content).toBe(
        'التاريخ هو <span dir="ltr">15/03/2026</span> للإطلاق'
      )
      expect(fixCount).toBe(1)
    })

    test("skips date already in backticks", () => {
      const input = "تم الإطلاق في `2026-03-15` على الشبكة"
      const { content, fixCount } = fixBareRtlDates(input, "ar")
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips date already in dir=ltr span", () => {
      const input = 'تم الإطلاق في <span dir="ltr">2026-03-15</span> على الشبكة'
      const { content, fixCount } = fixBareRtlDates(input, "ar")
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("no change for non-RTL locale", () => {
      const input = "Date: 2026-03-15"
      const { content, fixCount } = fixBareRtlDates(input, "de")
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips code blocks", () => {
      const input = "```\n2026-03-15\n```"
      const { content, fixCount } = fixBareRtlDates(input, "ar")
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips dates inside markdown link URLs", () => {
      const input = "[link](/blog/2026-03-15/post) تاريخ"
      const { content, fixCount } = fixBareRtlDates(input, "ar")
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips dates at end of full URLs in markdown links", () => {
      const input =
        "(https://www.reuters.com/technology/crypto-payment-ban-looms-2021-04-28/)"
      const { content, fixCount } = fixBareRtlDates(input, "ar")
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips dates in bare https URLs", () => {
      const input = "https://example.com/post/2026-03-15 هو الرابط"
      const { content, fixCount } = fixBareRtlDates(input, "ar")
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips dates inside HTML attributes", () => {
      const input = '<time datetime="2026-03-15">مارس</time>'
      const { content, fixCount } = fixBareRtlDates(input, "ar")
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips already-wrapped dates (idempotent)", () => {
      const input = 'تم في <span dir="ltr">2026-03-15</span> الإطلاق'
      const { content, fixCount } = fixBareRtlDates(input, "ar")
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips frontmatter dates", () => {
      const input =
        '---\npublished: 2026-03-15\ntitle: "test"\n---\nContent with 2026-03-15 here.'
      const { content, fixCount } = fixBareRtlDates(input, "ar")
      // Only the body date should be wrapped, not the frontmatter one
      expect(content).toContain("published: 2026-03-15")
      expect(content).toContain('<span dir="ltr">2026-03-15</span> here')
      expect(fixCount).toBe(1)
    })
  })

  test.describe("fixBareRtlEquations", () => {
    // === Basic patterns ===
    test("wraps simple subtraction equation", () => {
      const input = "الحساب هو 1150 - 187 = 963 في المجموع"
      const { content, fixCount } = fixBareRtlEquations(input, "ar")
      expect(content).toBe(
        'الحساب هو <span dir="ltr">1150 - 187 = 963</span> في المجموع'
      )
      expect(fixCount).toBe(1)
    })

    test("wraps addition equation", () => {
      const input = "المجموع 5+3 = 8 دائما"
      const { content, fixCount } = fixBareRtlEquations(input, "ar")
      expect(content).toContain('<span dir="ltr">5+3 = 8</span>')
      expect(fixCount).toBe(1)
    })

    test("wraps division equation", () => {
      const input = "النتيجة 114.632 / 120 = 0.955 تقريبا"
      const { content, fixCount } = fixBareRtlEquations(input, "ar")
      expect(content).toContain('<span dir="ltr">114.632 / 120 = 0.955</span>')
      expect(fixCount).toBe(1)
    })

    test("wraps multiplication equation with raw *", () => {
      const input = "القيمة 3*4 = 12 هنا"
      const { content, fixCount } = fixBareRtlEquations(input, "ar")
      expect(content).toContain('<span dir="ltr">3*4 = 12</span>')
      expect(fixCount).toBe(1)
    })

    // === Escaped markdown operators ===
    test("wraps equation with escaped asterisk (\\*)", () => {
      const input = "تأكد من أن المرسل لديه 2000 \\* 0.001 = 2 إيثر"
      const { content, fixCount } = fixBareRtlEquations(input, "ar")
      expect(content).toContain('<span dir="ltr">2000 \\* 0.001 = 2</span>')
      expect(fixCount).toBe(1)
    })

    test("wraps equation with escaped slash (\\/)", () => {
      const input = "الناتج 10 \\/ 2 = 5 بالتأكيد"
      const { content, fixCount } = fixBareRtlEquations(input, "ar")
      expect(content).toContain('<span dir="ltr">10 \\/ 2 = 5</span>')
      expect(fixCount).toBe(1)
    })

    // === Exponentiation ===
    test("wraps equation with ^ exponentiation after equals", () => {
      const input = "_0-1=2^256-1_"
      const { content, fixCount } = fixBareRtlEquations(input, "ar")
      expect(content).toBe('_<span dir="ltr">0-1=2^256-1</span>_')
      expect(fixCount).toBe(1)
    })

    test("wraps equation with ^ before equals", () => {
      const input = "القيمة 2^8-1=255 هي الحد الأقصى"
      const { content, fixCount } = fixBareRtlEquations(input, "ar")
      expect(content).toContain('<span dir="ltr">2^8-1=255</span>')
      expect(fixCount).toBe(1)
    })

    // === Multi-term chains ===
    test("wraps full multi-term equation before equals", () => {
      const input = "القيمة هي 20+10\\*0.907 = 29.07 في المجموع"
      const { content, fixCount } = fixBareRtlEquations(input, "ar")
      expect(content).toContain('<span dir="ltr">20+10\\*0.907 = 29.07</span>')
      expect(fixCount).toBe(1)
    })

    test("wraps three-term addition chain", () => {
      const input = "أصغر ما يمكنها الحصول عليه هو 6+4+2=12 ثم تقوم"
      const { content, fixCount } = fixBareRtlEquations(input, "ar")
      expect(content).toContain('<span dir="ltr">6+4+2=12</span>')
      expect(fixCount).toBe(1)
    })

    test("wraps Uniswap cumulative price chain", () => {
      const input = "| 29.07+70\\*0.890 = 91.37 |"
      const { content, fixCount } = fixBareRtlEquations(input, "ar")
      expect(content).toContain(
        '<span dir="ltr">29.07+70\\*0.890 = 91.37</span>'
      )
      expect(fixCount).toBe(1)
    })

    test("wraps long Uniswap chain with 4-digit decimals", () => {
      const input = "| 99.63+40\\*1.1018 = 143.702 |"
      const { content, fixCount } = fixBareRtlEquations(input, "ar")
      expect(content).toContain(
        '<span dir="ltr">99.63+40\\*1.1018 = 143.702</span>'
      )
      expect(fixCount).toBe(1)
    })

    test("wraps equation with operators after equals", () => {
      const input = "النتيجة 143.702 - 29.07 = 114.632 هي الفرق"
      const { content, fixCount } = fixBareRtlEquations(input, "ar")
      expect(content).toContain(
        '<span dir="ltr">143.702 - 29.07 = 114.632</span>'
      )
      expect(fixCount).toBe(1)
    })

    // === Multiple equations ===
    test("wraps multiple equations in same paragraph", () => {
      const input =
        "الغاز هو 2000 \\* 0.001 = 2 إيثر والباقي 963 \\* 0.001 = 0.963 إيثر"
      const { content, fixCount } = fixBareRtlEquations(input, "ar")
      expect(fixCount).toBe(2)
      expect(content).toContain('<span dir="ltr">2000 \\* 0.001 = 2</span>')
      expect(content).toContain('<span dir="ltr">963 \\* 0.001 = 0.963</span>')
    })

    // === Equation at start/end of line ===
    test("wraps equation at start of line", () => {
      const input = "112+32=256 هو المجموع"
      const { content, fixCount } = fixBareRtlEquations(input, "ar")
      expect(content).toBe('<span dir="ltr">112+32=256</span> هو المجموع')
      expect(fixCount).toBe(1)
    })

    test("wraps equation at end of line", () => {
      const input = "المجموع هو 112+32=256"
      const { content, fixCount } = fixBareRtlEquations(input, "ar")
      expect(content).toBe('المجموع هو <span dir="ltr">112+32=256</span>')
      expect(fixCount).toBe(1)
    })

    test("wraps equation inside parentheses", () => {
      const input = "تتضمن جميعها (112+32=256)"
      const { content, fixCount } = fixBareRtlEquations(input, "ar")
      expect(content).toContain('(<span dir="ltr">112+32=256</span>)')
      expect(fixCount).toBe(1)
    })

    // === Skip zones ===
    test("skips equation in backticks", () => {
      const input = "الحساب هو `1150 - 187 = 963` في المجموع"
      const { content, fixCount } = fixBareRtlEquations(input, "ar")
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips equation in fenced code block", () => {
      const input = "```\n1150 - 187 = 963\n```"
      const { content, fixCount } = fixBareRtlEquations(input, "ar")
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips frontmatter but wraps body", () => {
      const input = "---\nvalue: 5+3 = 8\n---\nContent 5+3 = 8 here."
      const { content, fixCount } = fixBareRtlEquations(input, "ar")
      expect(content).toContain("value: 5+3 = 8")
      expect(content).toContain('<span dir="ltr">5+3 = 8</span>')
      expect(fixCount).toBe(1)
    })

    test("skips already-wrapped equations (idempotent)", () => {
      const input = 'النتيجة <span dir="ltr">1150 - 187 = 963</span> صحيحة'
      const { content, fixCount } = fixBareRtlEquations(input, "ar")
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    // === Non-RTL locale ===
    test("no change for non-RTL locale", () => {
      const input = "1150 - 187 = 963"
      const { content, fixCount } = fixBareRtlEquations(input, "de")
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    // === False positive guards ===
    test("does not match markdown bold syntax", () => {
      const input = "**نص عريض** = 10"
      const { fixCount } = fixBareRtlEquations(input, "ar")
      expect(fixCount).toBe(0)
    })

    test("does not match list items", () => {
      const input = "- عنصر في القائمة = مهم"
      const { fixCount } = fixBareRtlEquations(input, "ar")
      expect(fixCount).toBe(0)
    })

    test("does not match version strings", () => {
      const input = "الإصدار v1.2.3 متاح"
      const { fixCount } = fixBareRtlEquations(input, "ar")
      expect(fixCount).toBe(0)
    })
  })

  test.describe("warnTranslatedTechnicalNumerals", () => {
    test("warns on ERC with Arabic-Indic digits", () => {
      const warnings = warnTranslatedTechnicalNumerals(
        "معيار ERC-\u0662\u0660 للرموز"
      )
      expect(warnings.length).toBe(1)
      expect(warnings[0]).toContain("ERC")
    })

    test("warns on EIP with Extended Arabic-Indic digits", () => {
      const warnings = warnTranslatedTechnicalNumerals(
        "ترقية EIP-\u06F1\u06F5\u06F5\u06F9"
      )
      expect(warnings.length).toBe(1)
      expect(warnings[0]).toContain("EIP")
    })

    test("no warning on correct Western digits", () => {
      const warnings = warnTranslatedTechnicalNumerals(
        "معيار ERC-20 و EIP-1559"
      )
      expect(warnings).toHaveLength(0)
    })

    test("skips code blocks", () => {
      const warnings = warnTranslatedTechnicalNumerals(
        "```\nERC-\u0662\u0660\n```"
      )
      expect(warnings).toHaveLength(0)
    })
  })
})
