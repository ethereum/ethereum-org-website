import fetch from "cross-fetch"
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

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
