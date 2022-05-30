declare global {
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

export {}
