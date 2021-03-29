import fetch from "cross-fetch"
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

const GITHUB_TOKEN_READ_ONLY =
  process.env.CONTEXT === "production"
    ? process.env.GITHUB_TOKEN_READ_ONLY_PROD
    : process.env.CONTEXT === "deploy-preview"
    : process.env.GITHUB_TOKEN_READ_ONLY_DEV

const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://api.github.com/graphql`,
    fetch,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN_READ_ONLY}`,
    },
  }),
  cache: new InMemoryCache(),
})

export default client
