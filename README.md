</p>https://github.com/DANISHAHMED111/GITHUB-DANISHAHMED111-ETHEREUM-ORG-WEBSITE/edit/dev/README.md</p>

[![Netlify Status](https://api.netlify.com/api/v1/badges/e8f2e766-888b-4954-8500-1b647d84db99/deploy-status)](https://app.netlify.com/sites/ethereumorg/deploys)
[![All Contributors](https://img.shields.io/github/all-contributors/ethereum/ethereum-org-website?color=orange&style=flat-square)](#contributors-)
[![Discord](https://img.shields.io/discord/714888181740339261?color=1C1CE1&label=ethereum.org%20%7C%20Discord%20%F0%9F%91%8B%20&style=flat-square)](https://discord.gg/ethereum-org)
[![Twitter Follow](https://img.shields.io/twitter/follow/ethdotorg.svg?style=social)](https://x.com/ethdotorg)
[![Crowdin](https://badges.crowdin.net/ethereum-org/localized.svg)](https://crowdin.com/project/ethereum-org)
[![gitpoap badge](https://public-api.gitpoap.io/v1/repo/ethereum/ethereum-org-website/badge)](https://www.gitpoap.io/gh/ethereum/ethereum-org-website)

<div align="center" style="margin-top: 1em; margin-bottom: 3em;">
  <a href="https://ethereum.org"><img alt="ethereum logo" src="./public/images/assets/eth-transparent.png" alt="ethereum.org" width="125"></a>
  <h1>👋 Welcome to ethereum.org!</h1>
</div>

This is the repo for the [ethereum.org](https://ethereum.org) website, a resource for the Ethereum community. The site's purpose is to _“Be the best portal to Ethereum for our growing global community"_ - read more about what this means [here](https://ethereum.org/en/about/).

[ethereum.org](https://ethereum.org) is being improved and changed over time through the contributions of community members who submit content, give feedback, or volunteer their time to manage its evolution. If you’re interested in helping to improve [ethereum.org](https://ethereum.org), find out [how to contribute](https://ethereum.org/en/contributing/).

## Looking for the Ethereum blockchain's code?

If you're looking for the Ethereum blockchain itself, there is no single repo. Instead, Ethereum has multiple implementations of the protocol written in different programming languages for security and diversity. [Check out the different implementations](https://ethereum.org/en/developers/docs/nodes-and-clients/#execution-clients)

<hr style="margin-top: 3em; margin-bottom: 3em;">

## Table of contents

- [Translation Program](docs/translation-program.md)
- [The ethereum.org website stack](docs/stack.md)
- [Website conventions / best practices](docs/best-practices.md)

## How to contribute

This project follows the [all-contributors](https://allcontributors.org/docs/en/overview) specification. Contributions of any kind are welcome!

### 1. Submit an issue

- Create a [new issue](https://github.com/ethereum/ethereum-org-website/issues/new/choose).
- Comment on the issue (if you'd like to be assigned to it) - that way [our team can assign the issue to you](https://github.blog/2019-06-25-assign-issues-to-issue-commenters/).

More information on the issue creation process, and expectations around creating issues can be [found here](docs/github-issue-triage-process.md).

### 2. Fork the repository (repo)

- If you're not sure, here's how to [fork the repo](https://help.github.com/en/articles/fork-a-repo).

### 3. Set up your local environment (optional)

If you're ready to contribute and create your PR, it will help to set up a local environment so you can see your changes.

1. Clone your fork

If this is your first time forking our repo, this is all you need to do for this step:

```sh
git clone git@github.com:[your_github_handle]/ethereum-org-website.git && cd ethereum-org-website
```

If you've already forked the repo, you'll want to ensure your fork is configured and that it's up to date. This will save you the headache of potential merge conflicts.

To [configure your fork](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/configuring-a-remote-for-a-fork):

```sh
git remote add upstream https://github.com/ethereum/ethereum-org-website.git
```

To [sync your fork with the latest changes](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork):

```sh
git checkout dev
git fetch upstream
git merge upstream/dev
```

2. Install dependencies

We recommend using a node manager to use multiple node versions in your system. We use [Volta](https://volta.sh/). In case you don't use a manager or you use `nvm`, you can check the currently supported versions under the `"volta"` section on our `package.json` file.

```sh
yarn
```

### 4. Make awesome changes!

1. Create new branch for your changes

```sh
git checkout -b new_branch_name
```

2. Start developing!

```sh
yarn dev
```

- Open this directory in your favorite text editor / IDE, and see your changes live by visiting `localhost:3000` from your browser
- Pro Tip:
  - Explore scripts within `package.json` for more build options
  - Get **faster** production builds by building only one language. E.g. in your `.env` file, set `BUILD_LOCALES=en` to build the content only in English
  - To build the site in other selected languages too, you need to set them in `BUILD_LOCALES`, eg: `BUILD_LOCALES=en,es` if you also want to build only English (required) and Spanish.
  - To build all languages, simply comment this line out with a hash mark, eg: `# BUILD_LOCALES=`

By default the script will build all the languages (complete list in `i18n.config.json`).

3. Commit and prepare for pull request (PR). In your PR commit message, reference the issue it resolves (see [how to link a commit message to an issue using a keyword](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword)).

```sh
git commit -m "brief description of changes [Fixes #1234]"
```

4. Push to your GitHub account

```sh
git push
```

### 5. Submit your PR

- After your changes are committed to your GitHub fork, submit a pull request (PR) to the `dev` branch of the `ethereum/ethereum-org-website` repo
- In your PR description, reference the issue it resolves (see [linking a pull request to an issue using a keyword](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword))
  - ex. `Updates out of date content [Fixes #1234]`
- Netlify (our hosting service for build previews) deploys all PRs to a publicly accessible preview URL, e.g.: ![Netlify deploy preview](public/images/preview-deploy.png)
- _Confirm that your Netlify preview deploy looks and functions as expected_
- Why not say hi and draw attention to your PR in [our discord server](https://discord.gg/ethereum-org)?

### 6. Wait for review

- The website team reviews every PR
- See [how decisions are made on content changes](https://ethereum.org/en/contributing/#how-decisions-about-the-site-are-made)
- Acceptable PRs will be approved & merged into the `dev` branch

Learn more about how we review pull requests [here](docs/review-process.md).

### 7. Release

- `master` is continually synced to Netlify and will automatically deploy new commits to ethereum.org
- Learn more about how we deploy the site [here](docs/deploy-process.md)
- You can [view the history of releases](https://github.com/ethereum/ethereum-org-website/releases), which include PR highlights

<hr style="margin-top: 3em; margin-bottom: 3em;">

![POAP Logo](public/images/poap-logo.svg)

## Claim your POAP and OATs!

### What is a POAP?

> The Proof of Attendance Protocol is a dapp that distributes badges in the form of ERC-721 tokens to prove you participated in an event. [More on POAPs](https://www.poap.xyz/).

### GitPOAP

- If you've made at least one contribution and that gets merged into ethereum.org, GitPOAP will also auto recognize it and let you mint a unique contributor POAP for the specific year.
  [More on GitPOAP](https://www.gitpoap.io).

### What is an OAT?

> An Onchain Achievement Token (OAT) is a special badge on [Galxe](https://app.galxe.com/quest/ethereumorg). It's a proof of your contribution to the ecosystem. [More on OATs](https://medium.com/galxe-news/introducing-galaxy-oat-on-chain-achievement-token-7e89779242b4).

### ethereum.org 2024 Contributor OATs

- If you have committed any changes in 2024 so far that were merged into our repo or if you have translated a certain amount of words, you can claim your OATs!
- There are OATs for GitHub, content, design and translation contributions.

  [![Discord](https://img.shields.io/discord/714888181740339261?color=1C1CE1&label=Claim%20Your%20POAP!%20%7C%20Discord%20%F0%9F%91%8B%20&style=flat)](https://discord.gg/ethereum-org)

- 👆 To claim your Contributor OATs, join our Discord server, create a post and paste links to your contributions in the `#🥇 | proof-of-contribution` [channel](https://discord.com/channels/714888181740339261/1212737737916948530)

- Wait for a member of our team to assign you a role on Discord and send you links to your OATs.

- To help with verification we request GitHub contributors connect their GitHub account with their Discord account (Discord > Settings > Connections > GitHub). Crowdin contributors will be verified directly through Crowdin by our team.

If you haven't contributed yet and would like to earn a POAP/OATs to show your loyalty to the Ethereum space, head over to the [issues](https://github.com/ethereum/ethereum-org-website/issues/) tab to get started! If you would like to contribute to translations check out our [Translation Program](https://ethereum.org/en/contributing/translation-program/). 

<hr style="margin-top: 3em; margin-bottom: 3em;">
