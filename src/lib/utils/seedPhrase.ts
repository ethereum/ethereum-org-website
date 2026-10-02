import { WORDLISTS } from "./generateSeed"

/**
 * Finding a BIP-39 recovery phrase in text the reader typed.
 *
 * English only. The other wordlists exist in the standard but almost no wallet offers
 * them, so an English list is what a phrase someone pastes will be drawn from.
 *
 * Matched against the wordlist rather than by shape. A shape test -- a run of 3-to-8
 * letter lowercase words at one of the standard lengths -- is cheap and mostly works,
 * because English function words are one or two characters and so break the run. But
 * mostly is not good enough once the match is acted on: redacting a false positive
 * destroys a real question, and warning someone that they pasted a secret when they did
 * not is its own kind of alarming.
 */
/** The shortest standard phrase, and so the shortest run worth acting on. */
const SHORTEST_PHRASE = 12

let wordlist: Set<string> | null = null
const isWordlistWord = (word: string) => {
  wordlist ??= new Set(WORDLISTS.en)
  return wordlist.has(word)
}

export const REDACTED_SEED_PHRASE = "[redacted seed phrase]"

/**
 * Replace any run of twelve or more consecutive wordlist words, so the question around it
 * survives: "is this my seed phrase <24 words> i was scammed" keeps everything that makes
 * it answerable and loses the part that must never be stored.
 *
 * The whole run goes, not a window of exactly 12, 15, 18, 21 or 24. The standard lengths
 * are what make a phrase recognizable, but they are the wrong thing to cut on: "seed" and
 * "phrase" are both wordlist words themselves, so a window starting at the reader's own
 * preamble ends twelve words later and leaves the tail of the real phrase behind.
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

export const hasSeedPhrase = (text: string): boolean =>
  redactSeedPhrase(text) !== text
