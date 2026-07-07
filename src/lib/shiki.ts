import {
  type BundledLanguage,
  type BundledTheme,
  createHighlighter,
  type HighlighterGeneric,
} from "shiki"

const THEMES = {
  light: "vitesse-light",
  dark: "vitesse-dark",
} as const satisfies Record<string, BundledTheme>

const LANGS = [
  "solidity",
  "javascript",
  "typescript",
  "tsx",
  "jsx",
  "python",
  "bash",
  "json",
  "rust",
  "yaml",
  "sql",
  "toml",
  "html",
  "css",
  "markdown",
  "graphql",
  "go",
  "vyper",
] as const satisfies readonly BundledLanguage[]

export type Lang = (typeof LANGS)[number]

const ALIASES = {
  js: "javascript",
  ts: "typescript",
  py: "python",
  sh: "bash",
  shell: "bash",
  md: "markdown",
} as const satisfies Record<string, Lang>

const CANONICAL: ReadonlySet<string> = new Set(LANGS)

type Highlighter = HighlighterGeneric<
  Lang,
  (typeof THEMES)[keyof typeof THEMES]
>

let highlighterPromise: Promise<Highlighter> | null = null

const getHighlighter = (): Promise<Highlighter> => {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [THEMES.light, THEMES.dark],
      langs: [...LANGS],
    })
  }
  return highlighterPromise
}

export const resolveLang = (lang: string): Lang | "text" => {
  const normalized = lang.toLowerCase()
  if (normalized in ALIASES) return ALIASES[normalized as keyof typeof ALIASES]
  if (CANONICAL.has(normalized)) return normalized as Lang
  return "text"
}

export const highlight = async (
  code: string,
  lang: string
): Promise<string> => {
  const highlighter = await getHighlighter()
  return highlighter.codeToHtml(code, {
    lang: resolveLang(lang),
    themes: THEMES,
    defaultColor: false,
  })
}
