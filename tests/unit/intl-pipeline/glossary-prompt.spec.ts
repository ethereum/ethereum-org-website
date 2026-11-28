/**
 * How ETHGlossary entries reach the prompts.
 *
 * known-patterns 113: names of software, clients, wallets, protocols and
 * companies stay in Latin script in every locale, but the glossary transliterates
 * many of them and the prompt said "use these exact translations".
 * known-patterns 112: a "long form (ABBR)" entry shown whole led the model to
 * add the long form where English writes only the abbreviation.
 *
 * Fixtures are real `/filter` and `/style-guide` responses (2026-11-27).
 */

import { expect, test } from "@playwright/test"

import { buildIncrementalPrompt } from "@/scripts/intl-pipeline/lib/llm/incremental-translate"
import {
  buildAttributePrompt,
  extractAttributeLeaves,
} from "@/scripts/intl-pipeline/lib/llm/jsx-attribute-translator"
import {
  getLanguageGroup,
  getSiteSpecificNotes,
} from "@/scripts/intl-pipeline/lib/llm/language-groups"
import { planIncrementalBatches } from "@/scripts/intl-pipeline/lib/llm/plan"
import {
  buildCommentPrompt,
  englishAbbreviation,
  FileGlossary,
  formatGlossary,
  keepsLatinName,
  loadGlossary,
  STYLE_GUIDE_RETRY,
} from "@/scripts/intl-pipeline/lib/llm/prompt-builder"

const ROLES: Array<[string, string]> = [
  ["Binance", "brand-or-project"],
  ["Microsoft", "brand-or-project"],
  ["block builder", "concept"],
  ["Chainlink", "brand-or-project"],
  ["Uniswap", "brand-or-project"],
  ["Slither", "brand-or-project"],
  ["ether", "concept"],
  ["Go Ethereum (Geth)", "brand-or-project"],
  ["Besu", "brand-or-project"],
  ["Bitcoin", "brand-or-project"],
  ["Ethereum", "brand-or-project"],
  ["Lighthouse", "brand-or-project"],
  ["MetaMask", "brand-or-project"],
  ["Teku", "brand-or-project"],
  ["Shanghai", "network-name"],
  ["The Merge", "network-name"],
  ["layer 2 (L2)", "concept"],
  ["application binary interface (ABI)", "concept"],
  ["smart contract", "concept"],
  ["Solidity", "programming-language"],
  ["Vitalik Buterin", "person-name"],
  ["Coinbase", "brand-or-project"],
]

const FILTER: Record<string, Record<string, string>> = {
  mr: {
    "layer 2 (L2)": "स्तर २ (l2)",
    MetaMask: "मेटामास्क",
    Uniswap: "युनिस्वॅप",
    Lighthouse: "लाइटहाऊस",
    Teku: "टेकू",
    Besu: "बेसू",
    "smart contract": "स्मार्ट कॉन्ट्रॅक्ट",
    Slither: "स्लिदर",
    Chainlink: "चेनलिंक",
    "block builder": "ब्लॉक निर्माता",
    ether: "इथर",
    Bitcoin: "बिटकॉइन",
    Solidity: "Solidity",
    Coinbase: "कॉइनबेस्",
    Ethereum: "इथेरियम",
  },
  ja: {
    "layer 2 (L2)": "レイヤー2 (L2)",
    MetaMask: "メタマスク",
    Uniswap: "ユニスワップ",
    Lighthouse: "ライトハウス",
    Teku: "テク",
    Besu: "ベス",
    "smart contract": "スマート・コントラクト",
    Slither: "スリザー",
    Chainlink: "チェーンリンク",
    "block builder": "ブロック・ビルダー",
    ether: "イーサ",
    Bitcoin: "ビットコイン",
    Solidity: "Solidity",
    Coinbase: "コインベース",
    Ethereum: "イーサリアム",
    "Vitalik Buterin": "ヴィタリック・ブテリン",
    "The Merge": "マージ",
    "Go Ethereum (Geth)": "ゴー・イーサリアム（ゲス）",
  },
  ru: {
    "layer 2 (L2)": "уровень 2 (l2)",
    MetaMask: "МетаМаск",
    Uniswap: "Юнисвоп",
    Lighthouse: "Лайтхаус",
    Teku: "Теку",
    Besu: "Бесу",
    "smart contract": "смарт-контракт",
    Slither: "Слизер",
    Chainlink: "Чейнлинк",
    "block builder": "сборщик блоков",
    ether: "эфир",
    Bitcoin: "Биткоин",
    Solidity: "Solidity",
    Coinbase: "Coinbase",
    Ethereum: "Эфириум",
  },
  ur: {
    "layer 2 (L2)": "لیئر ۲ (l2)",
    MetaMask: "میٹاماسک",
    Uniswap: "یونی سویپ",
    Lighthouse: "لائٹ ہاؤس",
    Teku: "ٹیکو",
    Besu: "بیسو",
    "smart contract": "سمارٹ کنٹریکٹ",
    Slither: "سلدر",
    Chainlink: "چین لنک",
    "block builder": "بلاک بلڈر",
    ether: "ایتھر",
    Bitcoin: "بٹ کوائن",
    Solidity: "Solidity",
    Coinbase: "کوائن بیس",
    Ethereum: "ایتھیریم",
    "application binary interface (ABI)":
      "ایپلیکیشن بائنری انٹرفیس (اے بی آئی)",
  },
  zh: {
    "layer 2 (L2)": "二层网络 (l2)",
    MetaMask: "梅塔马斯克",
    Uniswap: "尤尼斯瓦普",
    Lighthouse: "莱特豪斯",
    Teku: "泰库",
    Besu: "贝苏",
    "smart contract": "智能合约",
    Slither: "斯莱瑟",
    Chainlink: "切恩林克",
    "block builder": "区块构建者",
    ether: "以太币",
    Bitcoin: "比特币",
    Solidity: "Solidity",
    Coinbase: "Coinbase",
    Ethereum: "以太坊",
    "Vitalik Buterin": "维塔利克·布特林",
    "The Merge": "合并",
    "Go Ethereum (Geth)": "Go以太坊 (Geth)",
    Binance: "币安",
    Microsoft: "微软",
  },
}

const NAMES = [
  "MetaMask",
  "Uniswap",
  "Lighthouse",
  "Besu",
  "Teku",
  "Slither",
  "Chainlink",
]

const SOURCE =
  "Install MetaMask and swap on Uniswap. Run Lighthouse or Teku with Besu. " +
  "Audit a smart contract with Slither; Chainlink feeds a block builder. " +
  "Ether on Ethereum, unlike Bitcoin, pays L2 fees. Solidity, Coinbase, " +
  "the ABI, Vitalik Buterin, The Merge, Geth, Binance, Microsoft."

/** Live notes that argue for the lowercased form the pipeline corrects */
const NOTES: Record<string, Record<string, string>> = {
  ru: {
    "layer 2 (L2)": "Kept entirely lowercased as strictly requested.",
    Teku: "Transliteration of the product name Teku.",
  },
}

let apiCounter = 0
STYLE_GUIDE_RETRY.delayMs = 0

/** loadGlossary against canned /filter and /style-guide replies */
async function glossaryFor(
  locale: string,
  roles: "ok" | "down" | "flaky" | "empty" | "renamed" = "ok",
  apiUrl = `https://glossary.test/${locale}/${apiCounter++}`,
  calls: string[] = []
) {
  const realFetch = globalThis.fetch
  globalThis.fetch = (async (input: string | URL | Request) => {
    const url = String(input)
    calls.push(url)
    if (url === `${apiUrl}/style-guide`) {
      const tries = calls.filter((c) => c === url).length
      if (roles === "down" || (roles === "flaky" && tries < 3))
        return new Response("down", { status: 503 })
      return Response.json({
        terms: ROLES.map(([term, termRole]) =>
          roles === "empty"
            ? { term }
            : { term, termRole: roles === "renamed" ? "brand" : termRole }
        ),
      })
    }
    if (url === `${apiUrl}/filter`) {
      return Response.json({
        terms: Object.entries(FILTER[locale]).map(([english, translation]) => ({
          english,
          translation,
          note: NOTES[locale]?.[english],
          occurrences: 1,
        })),
      })
    }
    throw new Error(`unexpected fetch ${url}`)
  }) as typeof fetch
  try {
    return await loadGlossary(SOURCE, "markdown", locale, apiUrl)
  } finally {
    globalThis.fetch = realFetch
  }
}

test.describe("brand and tool names stay Latin (known-patterns 113)", () => {
  for (const locale of Object.keys(FILTER)) {
    test(`${locale}: transliterated names render as keep-Latin`, async () => {
      const glossary = await glossaryFor(locale)
      const block = formatGlossary(glossary, SOURCE)
      for (const name of NAMES) {
        expect(block).toContain(`"${name}" -> "${name}"`)
        expect(block).not.toContain(FILTER[locale][name])
      }
      // Concept entries keep their translations
      for (const concept of ["smart contract", "block builder"]) {
        expect(block).toContain(`"${concept}" -> "${FILTER[locale][concept]}"`)
      }
      // Ethereum, Ether and Bitcoin follow the glossary
      for (const glossaryName of ["Ethereum", "ether", "Bitcoin"]) {
        expect(block).toContain(
          `"${glossaryName}" -> "${FILTER[locale][glossaryName]}"`
        )
      }
      expect(block).toContain(`"Solidity" -> "Solidity"`)
    })
  }

  test("people and upgrade names follow the glossary", async () => {
    const block = formatGlossary(await glossaryFor("ja"), SOURCE)
    expect(block).toContain(`"Vitalik Buterin" -> "ヴィタリック・ブテリン"`)
    expect(block).toContain(`"The Merge" -> "マージ"`)
  })

  test("a name already Latin in the glossary is untouched", async () => {
    const glossary = await glossaryFor("ru")
    expect(glossary.keepLatin.has("Coinbase")).toBe(false)
    expect(glossary.get("Coinbase")).toBe("Coinbase")
    expect((await glossaryFor("ja")).keepLatin.has("Coinbase")).toBe(true)
  })

  test("without term roles after 3 tries, loading fails loudly", async () => {
    const realWarn = console.warn
    console.warn = () => {}
    try {
      for (const roles of ["down", "empty"] as const) {
        const calls: string[] = []
        const apiUrl = `https://glossary.test/fail/${apiCounter++}`
        await expect(glossaryFor("zh", roles, apiUrl, calls)).rejects.toThrow(
          /style guide unavailable after 3 attempts/
        )
        expect(calls.filter((c) => c.endsWith("/style-guide"))).toHaveLength(3)
        // No /filter call: nothing gets translated with transliterated names
        expect(calls.filter((c) => c.endsWith("/filter"))).toHaveLength(0)
      }
    } finally {
      console.warn = realWarn
    }
  })

  test("a style guide that recovers within 3 tries is used", async () => {
    const realWarn = console.warn
    console.warn = () => {}
    try {
      const calls: string[] = []
      const glossary = await glossaryFor(
        "ja",
        "flaky",
        `https://glossary.test/flaky/${apiCounter++}`,
        calls
      )
      expect(calls.filter((c) => c.endsWith("/style-guide"))).toHaveLength(3)
      expect(glossary.keepLatin.has("MetaMask")).toBe(true)
    } finally {
      console.warn = realWarn
    }
  })

  test("warns when the style guide has none of the name roles", async () => {
    const realWarn = console.warn
    const warnings: string[] = []
    console.warn = (msg: string) => warnings.push(msg)
    try {
      const glossary = await glossaryFor("ja", "renamed")
      expect(glossary.keepLatin.size).toBe(0)
    } finally {
      console.warn = realWarn
    }
    expect(warnings.join("\n")).toContain("::warning::[glossary]")
    expect(warnings.join("\n")).toContain("brand-or-project")
  })

  test("a loaded style guide is fetched once per run", async () => {
    const apiUrl = `https://glossary.test/once/${apiCounter++}`
    const calls: string[] = []
    await glossaryFor("ja", "ok", apiUrl, calls)
    await glossaryFor("ja", "ok", apiUrl, calls)
    await glossaryFor("ru", "ok", apiUrl, calls)
    expect(calls.filter((c) => c.endsWith("/style-guide"))).toHaveLength(1)
    expect(calls.filter((c) => c.endsWith("/filter"))).toHaveLength(3)
  })

  test("a note on an entry the pipeline corrected is dropped", async () => {
    const ru = await glossaryFor("ru")
    expect(ru.get("layer 2 (L2)")).toBe("уровень 2 (L2)")
    expect(ru.get("Teku")).toBe(
      "Теку (Transliteration of the product name Teku.)"
    )
  })

  test("official Chinese brand names keep their glossary forms", async () => {
    const block = formatGlossary(await glossaryFor("zh"), SOURCE)
    expect(block).toContain(`"Binance" -> "币安"`)
    expect(block).toContain(`"Microsoft" -> "微软"`)
    expect(
      keepsLatinName("Microsoft", "微軟", "brand-or-project", "zh-tw")
    ).toBe(false)
    // Only in Chinese: elsewhere the same brands stay Latin
    expect(
      keepsLatinName("Binance", "バイナンス", "brand-or-project", "ja")
    ).toBe(true)
    expect(
      keepsLatinName("Microsoft", "Майкрософт", "brand-or-project", "ru")
    ).toBe(true)
  })

  test("any form other than the English name is overridden", () => {
    const brand = "brand-or-project"
    // Live /filter forms, 2026-11-27
    expect(keepsLatinName("MetaMask", "メタマスク", brand, "ja")).toBe(true)
    expect(keepsLatinName("Casper-FFG", "キャスパー・FFG", brand, "ja")).toBe(
      true
    )
    expect(keepsLatinName("Casper-FFG", "Каспер FFG", brand, "ru")).toBe(true)
    expect(keepsLatinName("Swarm", "enjambre", brand, "es")).toBe(true)
    expect(keepsLatinName("Swarm", "Kundi", brand, "sw")).toBe(true)
    expect(keepsLatinName("Swarm", "Mạng lưới Swarm", brand, "vi")).toBe(true)
    expect(
      keepsLatinName("Portal Network", "Portal-Netzwerk", brand, "de")
    ).toBe(true)
    expect(keepsLatinName("Portal Network", "Potal Netwoki", brand, "sw")).toBe(
      true
    )
    expect(keepsLatinName("MetaMask", "MetaMask 钱包", brand, "zh")).toBe(true)
    // Same name up to case, spaces and hyphens
    expect(keepsLatinName("Casper-FFG", "Casper FFG", brand, "es")).toBe(false)
    expect(
      keepsLatinName("Portal Network", "Portal Network", brand, "vi")
    ).toBe(false)
    // Not a name role, or no role at all
    expect(
      keepsLatinName("Vitalik Buterin", "维塔利克·布特林", "person-name", "zh")
    ).toBe(false)
    expect(keepsLatinName("smart contract", "智能合约", "concept", "zh")).toBe(
      false
    )
    expect(keepsLatinName("MetaMask", "メタマスク", undefined, "ja")).toBe(
      false
    )
  })

  test("Ethereum, Ether and Bitcoin follow the glossary; Geth stays Latin", async () => {
    const brand = "brand-or-project"
    expect(keepsLatinName("Bitcoin", "比特币", brand, "zh")).toBe(false)
    expect(keepsLatinName("Ethereum", "イーサリアム", brand, "ja")).toBe(false)
    expect(
      keepsLatinName(
        "Go Ethereum (Geth)",
        "ゴー・イーサリアム（Geth）",
        brand,
        "ja"
      )
    ).toBe(false)
    const ja = await glossaryFor("ja")
    expect(ja.get("Go Ethereum (Geth)")).toBe("ゴー・イーサリアム（Geth）")
    // Text with Geth alone gets the bare abbreviation
    expect(formatGlossary(ja, "Run Geth.")).toContain(`"Geth" -> "Geth"`)
  })

  test("every prompt path shows the keep-Latin form", async () => {
    const glossary = await glossaryFor("zh")
    const comment = buildCommentPrompt({
      comments: ["Connect MetaMask first"],
      languageName: "Chinese",
      glossaryTerms: glossary,
    })
    expect(comment).toContain(`"MetaMask" -> "MetaMask"`)
    expect(comment).not.toContain("梅塔马斯克")

    const incremental = buildIncrementalPrompt({
      filePath: "x.md",
      fileType: "markdown",
      targetLanguage: "zh",
      languageName: "Chinese",
      sections: [{ id: "a", action: "TRANSLATE", content: "Swap on Uniswap." }],
      glossaryTerms: glossary,
    })
    expect(incremental).toContain(`"Uniswap" -> "Uniswap"`)
    expect(incremental).not.toContain("尤尼斯瓦普")

    const leaves = extractAttributeLeaves(
      `<Card title="Audit with Slither" />\n`
    )
    const attr = buildAttributePrompt(leaves, "zh", glossary)
    expect(attr).toContain(`"Slither" -> "Slither"`)
    expect(attr).not.toContain("斯莱瑟")
  })

  test("the rules no longer invite transliterated names", () => {
    for (const locale of ["hi", "ja", "ko", "zh", "ru", "ar", "es"]) {
      const notes = getSiteSpecificNotes(
        getLanguageGroup(locale),
        "markdown",
        locale
      )
      expect(notes).not.toContain("phonetic transliteration")
      expect(notes).not.toMatch(/should be transliterated/)
      expect(notes).toContain("stay in Latin script exactly as written")
      expect(notes).toContain("Only Ethereum, Ether and Bitcoin follow")
    }
    for (const locale of ["ja", "ko"]) {
      expect(
        getSiteSpecificNotes("cjk-phonetic", "markdown", locale)
      ).toContain("Ethereum, Ether and Bitcoin still take their glossary forms")
    }
    // zh-tw shares the zh rules, so no Simplified form may be named there
    const zhTw = getSiteSpecificNotes("cjk-semantic", "markdown", "zh-tw")
    expect(zhTw).not.toContain("比特币")
    expect(zhTw).not.toContain("币安")
  })
})

test.describe("bare abbreviations stay bare (known-patterns 112)", () => {
  const terms = new Map([
    ["layer 2 (L2)", "couche 2 (L2)"],
    ["decentralized application (dapp)", "application décentralisée (dapp)"],
    [
      "application programming interface (API)",
      "interface de programmation (API)",
    ],
  ])

  test("abbreviation only: shown bare, long form withheld", () => {
    const block = formatGlossary(terms, "Most dapps call an API on L2.")
    expect(block).toContain(`"L2" -> "L2"`)
    expect(block).toContain(`"dapp" -> "dapp"`)
    expect(block).toContain(`"API" -> "API"`)
    expect(block).not.toContain("couche 2")
    expect(block).not.toContain("décentralisée")
    expect(block).not.toContain("interface de programmation")
  })

  test("long form present: the whole entry, spaced or hyphenated", () => {
    for (const text of [
      "What is layer 2 (L2)?",
      "Layer-2 networks scale Ethereum.",
      "Layer 2s, also called L2s, scale Ethereum.",
    ]) {
      expect(formatGlossary(terms, text)).toContain(
        `"layer 2 (L2)" -> "couche 2 (L2)"`
      )
    }
  })

  test("JSON keys never count as the long form", () => {
    const batch = JSON.stringify({
      "page-developers-tools-tag-layer-2": "L2",
      "page-developers-tools-l2-fees": "Cheap L2 fees",
    })
    const block = formatGlossary(terms, batch)
    expect(block).toContain(`"L2" -> "L2"`)
    expect(block).not.toContain("couche 2")
  })

  test("incremental JSON: a section's key never counts as the long form", () => {
    const englishContent = JSON.stringify({
      "page-developers-tools-tag-layer-2": "L2",
      "page-developers-tools-title": "Tools",
    })
    const plan = planIncrementalBatches({
      filePath: "src/intl/en/page-developers-tools.json",
      fileType: "json",
      locale: "fr",
      languageName: "French",
      englishContent,
      localeContent: JSON.stringify({
        "page-developers-tools-title": "Outils",
      }),
      sectionIds: ["page-developers-tools-tag-layer-2"],
      glossaryTerms: terms,
    })
    const prompt = plan!.batches.map((b) => b.prompt).join("\n")
    expect(prompt).toContain(`"L2" -> "L2"`)
    expect(prompt).not.toContain("couche 2")
  })

  test("frontmatter counts: a title with the long form gets the whole entry", () => {
    const page =
      "---\ntitle: What is layer 2?\nlang: en\n---\n\nL2 fees are low."
    expect(formatGlossary(terms, page)).toContain(
      `"layer 2 (L2)" -> "couche 2 (L2)"`
    )
    // Paths and URLs in frontmatter are not text
    const paths =
      "---\ntitle: Fees\nimage: /images/layer-2/hero.png\nsourceUrl: https://x.org/layer-2\n---\n\nL2 fees are low."
    const block = formatGlossary(terms, paths)
    expect(block).toContain(`"L2" -> "L2"`)
    expect(block).not.toContain("couche 2")
  })

  test("only an abbreviation-like parenthetical is split off", () => {
    const entries = new Map([
      ["node (network)", "nœud (réseau)"],
      ["decentralized application (dapp)", "application décentralisée (dapp)"],
    ])
    const block = formatGlossary(entries, "Run a network of dapps.")
    expect(block).not.toContain(`"network" -> "network"`)
    expect(block).toContain(`"node (network)" -> "nœud (réseau)"`)
    expect(block).toContain(`"dapp" -> "dapp"`)
    expect(englishAbbreviation("node (network)", "nœud (réseau)")).toBe(
      "nœud (réseau)"
    )
  })

  test("only names and bare abbreviations are marked as written", async () => {
    // pl has ~164 identity entries (token, blockchain, staking); they inflect
    const pl = new FileGlossary([
      ["blockchain", "blockchain"],
      ["token", "token"],
      ["layer 2 (L2)", "warstwa 2 (L2)"],
    ])
    const block = formatGlossary(pl, "Each token on a blockchain, on L2.")
    expect(block).toContain(`- "blockchain" -> "blockchain"\n`)
    expect(block).toMatch(/- "token" -> "token"(\n|$)/)
    expect(block).toMatch(/- "L2" -> "L2" \(English form, Latin script/)
    expect(block).not.toContain("a term mapped to itself")

    const ja = formatGlossary(await glossaryFor("ja"), SOURCE)
    expect(ja).toMatch(
      /- "MetaMask" -> "MetaMask" \(English form, Latin script/
    )
    expect(ja).toMatch(/- "Solidity" -> "Solidity"(\n|$)/)
  })

  test("short abbreviations match whole words only", () => {
    const short = new Map([
      [
        "integrated development environment (IDE)",
        "environnement de développement intégré (IDE)",
      ],
      ["proof-of-stake (PoS)", "preuve d'enjeu (PoS)"],
      [
        "application programming interface (API)",
        "interface de programmation (API)",
      ],
    ])
    expect(
      formatGlossary(short, "We provide a purpose-built rapid tool.")
    ).toBe("")
    const block = formatGlossary(short, "Most APIs run in an IDE, on PoS.")
    expect(block).toContain(`"API" -> "API"`)
    expect(block).toContain(`"IDE" -> "IDE"`)
    expect(block).toContain(`"PoS" -> "PoS"`)
  })

  test("comment and attribute prompts follow the same rule", () => {
    const comment = buildCommentPrompt({
      comments: ["Deploy to an L2"],
      languageName: "French",
      glossaryTerms: terms,
    })
    expect(comment).toContain(`"L2" -> "L2"`)
    expect(comment).not.toContain("couche")

    const leaves = extractAttributeLeaves(`<Card title="Bridge to L2" />\n`)
    const attr = buildAttributePrompt(leaves, "fr", terms)
    expect(attr).toContain(`"L2" -> "L2"`)
    expect(attr).not.toContain("couche")
  })

  test("a term the file could not place rides in every chunk, bare where only its abbreviation is", () => {
    // Live es: the file says "LSDs", an alias /filter maps to this entry
    const glossary = new FileGlossary([
      ["liquid staking token (LST)", "token de staking líquido (LST)"],
    ]).attribute(
      "LSDs and LST",
      "markdown",
      new Map([["liquid staking token (LST)", 5]])
    )
    expect(glossary.unattributed.has("liquid staking token (LST)")).toBe(true)
    const whole = `"liquid staking token (LST)" -> "token de staking líquido (LST)"`
    expect(formatGlossary(glossary, "Which LST is best?")).toContain(
      `"LST" -> "LST"`
    )
    expect(formatGlossary(glossary, "Which LST is best?")).not.toContain(
      "líquido"
    )
    expect(formatGlossary(glossary, "A liquid staking token (LST)")).toContain(
      whole
    )
    expect(formatGlossary(glossary, "Compare LSDs")).toContain(whole)
  })

  test("the entry's abbreviation keeps the English form", async () => {
    expect(englishAbbreviation("layer 2 (L2)", "स्तर २ (l2)")).toBe(
      "स्तर २ (L2)"
    )
    expect(
      englishAbbreviation(
        "application binary interface (ABI)",
        "ایپلیکیشن بائنری انٹرفیس (اے بی آئی)"
      )
    ).toBe("ایپلیکیشن بائنری انٹرفیس (ABI)")
    expect(
      englishAbbreviation("Go Ethereum (Geth)", "ゴー・イーサリアム（ゲス）")
    ).toBe("ゴー・イーサリアム（Geth）")
    expect(
      englishAbbreviation(
        "proof-of-stake (PoS)",
        "доказательство доли владения"
      )
    ).toBe("доказательство доли владения")
    expect(englishAbbreviation("smart contract", "智能合约 (SC)")).toBe(
      "智能合约 (SC)"
    )
    const ur = await glossaryFor("ur")
    expect(ur.get("layer 2 (L2)")).toBe("لیئر ۲ (L2)")
  })
})
