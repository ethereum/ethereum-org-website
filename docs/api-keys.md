# APIs we use in our website

1. Add personal GitHub API token (free)

We recommend setting this up when running the project locally, as we use the GitHub API to fetch repository data for many projects & files.

> - [Follow these instructions](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) to create a personal GitHub API token
>   - When selecting scopes in step 8, leave everything unchecked (the data we fetch doesn't require any [scope](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps#available-scopes))
> - In local repo root directory: Make a copy of `.env.example` and name it `.env`
> - Copy & paste your new GitHub API token into `.env`

```sh
# .env Example:
GITHUB_TOKEN_READ_ONLY=48f84de812090000demo00000000697cf6e6a059
```

2. Add Etherscan API token (free)

> - [Create an account](https://etherscan.io/) on Etherscan
> - Navigate to your Account Settings page
> - In the sidebar, click on 'API-KEYs' and add a new token
> - Copy & paste your API-Key Token from Etherscan into `.env`

```sh
# .env Example:
ETHERSCAN_API_KEY=K6NUTARFJZJCIXHF1F1E1YGJZ8RQ29BE4U
```
