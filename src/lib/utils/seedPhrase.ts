import { WORDLISTS } from "./generateSeed"

// Matched against the English BIP-39 wordlist rather than by shape: a false positive
// would redact a real question.
const SHORTEST_PHRASE = 12

let wordlist: Set<string> | null = null
const isWordlistWord = (word: string) => {
  wordlist ??= new Set(WORDLISTS.en)
  return wordlist.has(word)
}

const REDACTED_SEED_PHRASE = "[redacted seed phrase]"

/**
 * Replace any run of twelve or more consecutive wordlist words. The whole run goes, not a
 * standard-length window: "seed" and "phrase" are wordlist words themselves.
 */
export const redactSeedPhrase = (text: string): string => {
  const parts = text.split(/(\s+)/)
  const plain = (token: string) => token.toLowerCase().replace(/[^a-z]/g, "")
  const out: string[] = []
  let run: string[] = []

  const flush = () => {
    const words = run.filter((_, index) => index % 2 === 0)
    out.push(
      words.length >= SHORTEST_PHRASE ? REDACTED_SEED_PHRASE : run.join("")
    )
    run = []
  }

  for (let index = 0; index < parts.length; index += 1) {
    const token = parts[index]
    if (index % 2 === 1) {
      // Whitespace belongs to the run only while one is open.
      if (run.length) run.push(token)
      else out.push(token)
      continue
    }
    if (isWordlistWord(plain(token))) {
      run.push(token)
      continue
    }
    if (run.length) {
      // The trailing space separated the run from this word, so it is not part of it.
      const tail = run.length % 2 === 0 ? run.pop() : undefined
      flush()
      if (tail) out.push(tail)
    }
    out.push(token)
  }
  if (run.length) flush()
  return out.join("")
}
