/**
 * Unit tests for the lowercase-ethereum transform script.
 */

import { expect, test } from "@playwright/test"

import { _testOnly } from "@/scripts/lowercase-ethereum"

const {
  lowercaseEthereum,
  isProperNounCompound,
  isEventPattern,
  isSentenceStart,
  isFirstWordOfValue,
  getTextBeforeSkippingTags,
  PROPER_NOUN_ALLOWLIST,
} = _testOnly

test.describe("lowercaseEthereum", () => {
  test.describe("Mid-sentence lowercasing", () => {
    test("lowercases 'on Ethereum'", () => {
      const { text } = lowercaseEthereum("Built on Ethereum today")
      expect(text).toBe("Built on ethereum today")
    })

    test("lowercases 'the Ethereum network'", () => {
      const { text } = lowercaseEthereum("Using the Ethereum network daily")
      expect(text).toBe("Using the ethereum network daily")
    })

    test("lowercases 'with Ethereum'", () => {
      const { text } = lowercaseEthereum("Build with Ethereum tools")
      expect(text).toBe("Build with ethereum tools")
    })

    test("lowercases after comma", () => {
      const { text } = lowercaseEthereum("Bitcoin, Ethereum, and Solana")
      expect(text).toBe("Bitcoin, ethereum, and Solana")
    })

    test("lowercases 'What is Ethereum?'", () => {
      const { text } = lowercaseEthereum("What is Ethereum?")
      expect(text).toBe("What is ethereum?")
    })
  })

  test.describe("Possessives", () => {
    test("lowercases 'Ethereum's' mid-sentence", () => {
      const { text } = lowercaseEthereum("Using Ethereum's network")
      expect(text).toBe("Using ethereum's network")
    })

    test("preserves 'Ethereum's' at sentence start", () => {
      const { text } = lowercaseEthereum("Ethereum's network is strong.")
      expect(text).toBe("Ethereum's network is strong.")
    })
  })

  test.describe("Proper noun preservation", () => {
    for (const compound of PROPER_NOUN_ALLOWLIST) {
      test(`preserves "${compound}"`, () => {
        const input = `Learn about ${compound} today`
        const { text } = lowercaseEthereum(input)
        expect(text).toContain(compound)
      })
    }

    test("preserves 'Ethereum Foundation' but lowercases standalone", () => {
      const input = "The Ethereum Foundation supports the Ethereum community"
      const { text } = lowercaseEthereum(input)
      expect(text).toBe(
        "The Ethereum Foundation supports the ethereum community"
      )
    })

    test("preserves 'Ethereum Improvement Proposals' (plural via startsWith)", () => {
      const input = "Read the Ethereum Improvement Proposals"
      const { text } = lowercaseEthereum(input)
      expect(text).toBe("Read the Ethereum Improvement Proposals")
    })
  })

  test.describe("Sentence start preservation", () => {
    test("preserves at position 0", () => {
      const { text } = lowercaseEthereum("Ethereum is a blockchain.")
      expect(text).toBe("Ethereum is a blockchain.")
    })

    test("preserves after period-space", () => {
      const { text } = lowercaseEthereum("Done. Ethereum is next.")
      expect(text).toBe("Done. Ethereum is next.")
    })

    test("preserves after exclamation", () => {
      const { text } = lowercaseEthereum("Wow! Ethereum is amazing.")
      expect(text).toBe("Wow! Ethereum is amazing.")
    })

    test("preserves after question mark", () => {
      const { text } = lowercaseEthereum("Really? Ethereum changed things.")
      expect(text).toBe("Really? Ethereum changed things.")
    })

    test("lowercases mid-sentence even with nearby period", () => {
      const input = "We use Ethereum. It powers the Ethereum network."
      const { text } = lowercaseEthereum(input)
      // First "Ethereum" is mid-sentence -> lowercase
      // "It" starts the next sentence
      // Second "Ethereum" is mid-sentence -> lowercase
      expect(text).toBe("We use ethereum. It powers the ethereum network.")
    })
  })

  test.describe("First-word-of-value preservation", () => {
    test("preserves when Ethereum is the first word", () => {
      const { text } = lowercaseEthereum("Ethereum wallets")
      expect(text).toBe("Ethereum wallets")
    })

    test("preserves when Ethereum is first word (heading)", () => {
      const { text } = lowercaseEthereum("Ethereum roadmap")
      expect(text).toBe("Ethereum roadmap")
    })

    test("lowercases 'What is Ethereum?' (mid-heading)", () => {
      const { text } = lowercaseEthereum("What is Ethereum?")
      expect(text).toBe("What is ethereum?")
    })
  })

  test.describe("HTML tag transparency", () => {
    test("preserves at start of value behind opening tag", () => {
      const { text } = lowercaseEthereum("<strong>Ethereum</strong> is great")
      expect(text).toBe("<strong>Ethereum</strong> is great")
    })

    test("preserves at start of value behind nested tags", () => {
      const { text } = lowercaseEthereum(
        "<em><strong>Ethereum</strong></em> network"
      )
      expect(text).toBe("<em><strong>Ethereum</strong></em> network")
    })

    test("lowercases mid-sentence even inside tags", () => {
      const { text } = lowercaseEthereum(
        "Built on <strong>Ethereum</strong> today"
      )
      expect(text).toBe("Built on <strong>ethereum</strong> today")
    })

    test("preserves after sentence-ending punctuation behind tags", () => {
      const { text } = lowercaseEthereum("Done.</p><p>Ethereum is next.")
      expect(text).toBe("Done.</p><p>Ethereum is next.")
    })

    test("lowercases mid-sentence with link tag", () => {
      const { text } = lowercaseEthereum(
        'Learn about <a href="/eth">Ethereum</a> today'
      )
      expect(text).toBe('Learn about <a href="/eth">ethereum</a> today')
    })
  })

  test.describe("Event pattern preservation", () => {
    test("preserves 'Ethereum Austin'", () => {
      const { text } = lowercaseEthereum("Join Ethereum Austin this year")
      expect(text).toContain("Ethereum Austin")
    })

    test("preserves 'Ethereum London'", () => {
      const { text } = lowercaseEthereum("Attend Ethereum London next month")
      expect(text).toContain("Ethereum London")
    })

    test("does not treat 'Ethereum network' as event", () => {
      const { text } = lowercaseEthereum("the Ethereum network is strong")
      expect(text).toBe("the ethereum network is strong")
    })
  })

  test.describe("Mixed scenarios", () => {
    test("handles multiple occurrences with different rules", () => {
      const input =
        "Ethereum is a platform. The Ethereum Foundation supports the Ethereum network."
      const { text } = lowercaseEthereum(input)
      expect(text).toBe(
        "Ethereum is a platform. The Ethereum Foundation supports the ethereum network."
      )
    })

    test("handles Ethereum.org references", () => {
      // "Ethereum.org" at start of value -> preserved (first word)
      const { text: t1 } = lowercaseEthereum("Ethereum.org community")
      expect(t1).toBe("Ethereum.org community")

      // "Ethereum.org" mid-sentence -> note: the period triggers sentence-start detection
      // for the next word, but "Ethereum.org" itself: the "." after Ethereum
      // means it looks like end-of-sentence, so the transform sees "Ethereum" alone
      const { text: t2 } = lowercaseEthereum("Visit the Ethereum.org website")
      // "Ethereum" is mid-sentence, no allowlist match -> lowercase
      expect(t2).toBe("Visit the ethereum.org website")
    })
  })

  test.describe("Edge cases", () => {
    test("empty string", () => {
      const { text, changes } = lowercaseEthereum("")
      expect(text).toBe("")
      expect(changes).toHaveLength(0)
    })

    test("no matches", () => {
      const { text, changes } = lowercaseEthereum("Hello world")
      expect(text).toBe("Hello world")
      expect(changes).toHaveLength(0)
    })

    test("'Ethereum' alone", () => {
      const { text } = lowercaseEthereum("Ethereum")
      // First word of value -> preserved
      expect(text).toBe("Ethereum")
    })

    test("'ethereum' already lowercase -- no match", () => {
      const { text, changes } = lowercaseEthereum("on ethereum already")
      expect(text).toBe("on ethereum already")
      expect(changes).toHaveLength(0)
    })

    test("adjacent punctuation", () => {
      const { text } = lowercaseEthereum("(Ethereum) is great")
      // Opening paren is not sentence-ending, not first word of value
      // "(" is present before -> not empty -> not first word
      // Not after .!? -> not sentence start
      expect(text).toBe("(ethereum) is great")
    })
  })
})

test.describe("isProperNounCompound", () => {
  test("returns true for exact allowlist match", () => {
    expect(isProperNounCompound("Ethereum Foundation is great")).toBe(true)
  })

  test("returns true for prefix match (Improvement Proposals)", () => {
    expect(isProperNounCompound("Ethereum Improvement Proposals (EIPs)")).toBe(
      true
    )
  })

  test("returns false for non-compound", () => {
    expect(isProperNounCompound("Ethereum network")).toBe(false)
  })
})

test.describe("isEventPattern", () => {
  test("detects city name after Ethereum", () => {
    expect(isEventPattern("Ethereum Berlin event")).toBe(true)
  })

  test("does not match common words", () => {
    expect(isEventPattern("Ethereum network powers")).toBe(false)
    expect(isEventPattern("Ethereum is great")).toBe(false)
  })
})

test.describe("isSentenceStart", () => {
  test("position 0 is sentence start", () => {
    expect(isSentenceStart("Ethereum is great", 0)).toBe(true)
  })

  test("after period-space", () => {
    expect(isSentenceStart("Done. Ethereum", 6)).toBe(true)
  })

  test("mid-sentence is not", () => {
    expect(isSentenceStart("the Ethereum", 4)).toBe(false)
  })
})

test.describe("isFirstWordOfValue", () => {
  test("position 0 is first word", () => {
    expect(isFirstWordOfValue("Ethereum wallets", 0)).toBe(true)
  })

  test("behind HTML tag at start is first word", () => {
    expect(isFirstWordOfValue("<strong>Ethereum</strong>", 8)).toBe(true)
  })

  test("mid-sentence is not first word", () => {
    expect(isFirstWordOfValue("the Ethereum network", 4)).toBe(false)
  })
})

test.describe("getTextBeforeSkippingTags", () => {
  test("strips closing tag", () => {
    const result = getTextBeforeSkippingTags("text</strong>Ethereum", 13)
    expect(result).toBe("text")
  })

  test("strips opening tag", () => {
    const result = getTextBeforeSkippingTags("<strong>Ethereum", 8)
    expect(result).toBe("")
  })

  test("strips nested tags", () => {
    const result = getTextBeforeSkippingTags("<em><strong>Ethereum", 12)
    expect(result).toBe("")
  })

  test("preserves content before tags", () => {
    const result = getTextBeforeSkippingTags("hello <strong>Ethereum", 14)
    expect(result).toBe("hello ")
  })
})
