---
title: Style Guide
description: Style Guide for ethereum.org
lang: en
sidebar: true
---

# Ethereum.org Style Guide {#style-guide}

Content on [Etheruem.org](http://etheruem.org) is crowdsourced and primarily written by our incredible contributors. This style guide aims to standardize certain aspects of contributing content to make the contribution process smoother.

## Who can submit content to Ethereum.org {#who-can-help}

Anyone! [Ethereum.org](http://ethereum.org) is entirely open source, and many of its best pages are submitted by curious learners who expanded their notes into documentation pages now living on the site!

## Audience {#audience}

[Ethereum.org](http://ethereum.org) content caters to a large and varied audience. Loosely we can categorize them as:

#### Individuals

App users, investors, enthusiasts, people who are "new to Ethereum"

#### Developers

Developers or others who want technical information about Ethereum.

#### Enterprises

People, businesses, and other organizations who want to understand Ethereum's value in an enterprise setting

Because [Ethereum.org](http://ethereum.org) caters to a wide variety of users, all content on the site should make an effort to explain any technologies and concepts as simply as possible.

## Objectivity {#objectivity}

[Ethereum.org](http://ethereum.org) documentation aims to maintain a credibly neutral source of truth to inform readers about Ethereum and its ecosystem. Some examples of things that we don't want in the content on Ethereum.org:

**Grand, unverifiable claims about Ethereum or adjacent technologies**

> e.g. _ "Ethereum will take over the world because..."_

**Hostile or confrontational language aimed at any organization or person**

> e.g. _ "Company X is bad because they are centralized!"_

**Politically charged rhetoric**

> e.g. _ "This political party are better for decentralization because..."_

## Tone {#tone}

The tone of the content on the site should be welcoming, friendly and authoritative. Where possible, jargon should be minimized and simple language used instead.

## Best Practices {#best-practices}

### Use American English {#american-english}

For words that have multiple spellings, use American English over British English.

**For example:**

- `decentralized` over `decentralised`
- `color` over `colour`
- `analyze` over `analyse`

### Acroynyms {#acroynyms}

When introducing an unfamiliar acronym, spell out the full term, and put the acronym in parentheses. Put both the full term and acronym in bold.

**For example:**

"Ethereum, like Bitcoin, currently uses a consensus protocol called **Proof-of-work (PoW)**."

### Consistency {#consistency}

Many of the topics covered on [Ethereum.org](http://ethereum.org) are technically complex. To reduce confusion to the reader, terms should be used consistently. For example, don't cycle back-and-forth between proof-of-work and PoW at random.

### Mainnet {#mainnet}

When referring to the Ethereum Mainnet (i.e. not referring to a testnet) use the proper noun. Proper nouns help avoid confusion and build greater understanding.

**Correct usage:**

- Mainnet
- Ethereum Mainnet

**Incorrect usage:**

- main net
- mainnet
- Main net
- Ethereum mainnet

### Proof-of-work {#proof-of-work}

Proof-of-work should be capitalized at the beginning of a sentence or when the term is introduced for the first time on a page, in any other instance, all letters should be lower case. In either case, proof-of-work should be hyphenated between each word.

**Correct usage:**

- Proof-of-work
- proof-of-work

**Incorrect usage:**

- Proof-of-Work
- Proof of work
- proof of work

### Proof-of-stake {#proof-of-stake}

The same rules we apply to proof-of-stake are applicable to proof-of-stake.

**Correct usage:**

- Proof-of-stake
- proof-of-stake

**Incorrect usage:**

- Proof-of-Stake
- Proof of stake
- proof of stake

### Use Active Voice {#use-active-voice}

Sentences using active voice are more concise and efficient, making your writing more engaging and easier to comprehend.

**Active voice sentence:** an actor acts on a target

> _ "The man bought a car."_

**Passive voice sentence:** a target acts on an actor

> _ "The car was bought by a man."_

[Read more on active voice](https://www.grammarly.com/blog/active-vs-passive-voice/)

_This isn't an easy one, especially for non-native English speakers. If you aren't sure, don't worry. We'll help with this one._

### Linking to internal pages {#internal-links}

When linking to another page on Ethereum.org, use the relative path over the absolute path. This maintains consistency across different language versions of the site and ensures links work correctly in local development.

```md
<--- Good --->

Read more about [smart contracts](/docs/developers/smart-contracts)

<--- Bad --->

Read more about [smart contracts](https://ethereum.org/en/docs/developers/smart-contracts)
```

### Linking to images {#images}

When adding an image to a page, the image should be downloaded and placed in the same folder as the markdown file. You can reference the image like this:

`![alt text for image](./image.png)`

```md
<--- Good --->

![How to mint your NFT](./mintYourNFT.gif)

<--- Bad --->

![How to mint your NFT](https://cdn-images-1.medium.com/max/2000/0342fj_fsdfs.gif)
```

### Using Emojis {#images}

Everyone loves emojis <Emoji text="🥰" size={1} /> To stanardize the appearence of all Emojis across browsers [Ethereum.org](http://ethereum.org) uses an `Emoji` component.

```md
<--- Good --->

The London Upgrade is live <Emoji text=":heart:" size={1} />

The London Upgrade is live <Emoji text="❤️" size={1} />

<--- Bad --->

The London Upgrade is live ❤️
```

## Anything else? {#anything-else}

Like everything on Ethereum.org, the style guide is an open-source work-in-progress with room for improvement. If there is anything you think should be added to improve this document please [edit it on GitHub](https://github.com/ethereum/ethereum-org-website/blob/dev/src/content/contributing/style-guide/index.md).
