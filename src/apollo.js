import fetch from "cross-fetch"
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

// Note: for this API to work locally you'll need to create a personal GitHub API token:
// https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token
// When selecting scopes in step 7, leave everything unchecked (the data we fetch doesn't require any scope)
// https://docs.github.com/en/developers/apps/scopes-for-oauth-apps#available-scopes
// In local repo root directory: make a copy of `.env.example` and name it `.env`
// Copy & paste your new GitHub API token in `.env`, e.g.
// GATSBY_GITHUB_TOKEN_READ_ONLY=48f84de812090000demo00000000697cf6e6a059
const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://api.github.com/graphql`,
    fetch,
    headers: {
      Authorization: `Bearer ${process.env.GATSBY_GITHUB_TOKEN_READ_ONLY}`,
    },
  }),
  cache: new InMemoryCache(),
})

export default client
