// Ensure this is treated as a module.
// ref. https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-8.html#example-6
export {}

declare global {
  interface Window {
    // Used by matomo
    _paq: any
    dev: boolean
  }

  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_TOKEN: string
      ALGOLIA_ADMIN_KEY: string
      ETHERSCAN_API_KEY: string
      GATSBY_ALGOLIA_APP_ID: string
      GATSBY_ALGOLIA_SEARCH_KEY: string
      GATSBY_GITHUB_TOKEN_READ_ONLY: string
      GATSBY_FUNCTIONS_PATH: string
      CROWDIN_API_KEY: string
    }
  }
}
