// Ensure this is treated as a module.
// ref. https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-8.html#example-6
export {}

declare global {
  interface Window {
    // Used by matomo
    _paq: unknown
    dev: boolean
  }

  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_TOKEN: string
      ALGOLIA_ADMIN_KEY: string
      ETHERSCAN_API_KEY: string
      CROWDIN_API_KEY: string
    }
  }
}
