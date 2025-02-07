---
title: Content standardization
description: Guide to use consistent terminology in content writing
lang: en
---

# Content standardization {#content-standardization}

This style guide aims to standardize certain aspects of writing content to make the contribution process smoother.

## Use American English {#american-english}

For words that have multiple spellings, use American English over British English.

**For example:**

- "decentralized" over "decentralised"
- "color" over "colour"
- "analyze" over "analyse"

## Terminology {#Terminology}

### Ethereum {#ethereum}

Ethereum is a proper noun and should always be capitalized.

- "Ethereum" not "ethereum"

### Ether {#ether}

Ether is a common noun and should not be capitalized unless at the beginning of a sentence. ETH, on the other hand, is a currency abbreviation (and ticker symbol) and should always be capitalized.

- "ether" not "Ether"
- "ETH" not "eth or Eth"

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

### Proof-of-work / Proof-of-stake {#proof-of}

Proof-of-work should be capitalized only when at the beginning of a sentence. In any other instance, all letters should be lower case. In either case, proof-of-work should be hyphenated between each word.

**Correct usage:**

- Proof-of-work
- proof-of-work

**Incorrect usage:**

- Proof-of-Work
- Proof of work
- proof of work

The same rules we apply to proof-of-work are applicable to proof-of-stake, proof-of-authority, proof-of-humanity, proof-of-individuality, etc.

### Smart contract {#smart-contract}

Smart contract is a common noun and should only be capitalized at the beginning of a sentence. In any other instance, all letters should be lowercase.

**Correct usage:**

- Smart contract
- smart contract

** Incorrect usage:**

- Smart Contract

### The Merge {#the-merge}

When referring to The Merge, treat it as a proper noun. Always capitalize the first letter in each word.

**Correct usage:**

- The Merge

**Incorrect usage:**

- The merge
- the Merge

### Zero-knowledge {#zero-knowledge}

Zero-knowledge is a common noun and should only be capitalized at the beginning of a sentence. In any other instance, all letters should be lowercase. In either case, zero-knowledge should be hyphenated between each word.

**Correct usage:**

- Zero-knowledge
- zero-knowledge

**Incorrect usage:**

- Zero-Knowledge
- Zero knowledge
- zero knowledge

### ZK-proof {#ZK-proof}

When using the abbreviated form of zero-knowledge proof you should shorten zero-knowledge to ZK, and hyphenate the abbreviation.

**Correct usage:**

- ZK-proof

**Incorrect usage:**

- Zk-proof
- zK-proof
- zk-proof
- Zk proof
- zK proof
- zk proof

### ZK-rollup {#ZK-rollup}

When using the abbreviated form of zero-knowledge rollup you should shorten zero-knowledge to ZK, and hyphenate the abbreviation.

**Correct usage:**

- ZK-rollup

**Incorrect usage:**

- Zk-rollup
- zK-rollup
- zk-rollup
- Zk rollup
- zK rollup
- zk rollup

### Use active voice {#use-active-voice}

Sentences using active voice are more concise and efficient, making your writing more engaging and easier to comprehend.

**Active voice sentence:** an actor acts on a target

> _"The man bought a car."_

**Passive voice sentence:** a target acts on an actor

> _"The car was bought by a man."_

[Read more on active voice](https://www.grammarly.com/blog/active-vs-passive-voice/)

_This isn't an easy one, especially for non-native English speakers. If you aren't sure, don't worry. We'll help with any of these._

### Date Format {#date-format}

When including dates in markdown content across Ethereum documentation, it is essential to maintain a consistent and clear presentation. In order to achieve this, we recommend the following guidelines:

**Format:**

Use the "D-Mon-YYYY" format for dates. This format eliminates ambiguity between the month and day, providing a standardized and easily understandable representation.

**Examples:**

- Preferred: 2-Nov-2023, 11-Feb-2023
- Avoid: Nov-2-2023, 2/11/2023, 11/2/2023

By adhering to these guidelines, we create a unified approach to presenting dates, fostering clarity and comprehension throughout Ethereum documentation.

### Linking to internal pages {#internal-links}

When linking to another page on Ethereum.org, use the relative path over the absolute path. Do not hard-code the language path (i.e. `/en/`) in any links. This maintains consistent functionality across different language versions of the site.

```md
<!-- Good -->

Read more about [smart contracts](/docs/developers/smart-contracts/)

<!-- Bad -->

Read more about [smart contracts](/en/docs/developers/smart-contracts)
Read more about [smart contracts](https://ethereum.org/en/docs/developers/smart-contracts)
```

Please also add a trailing slash to all links. This keeps links consistent and avoids redirects, which hurts site performance.

```md
<!-- Good -->

Read more about [smart contracts](/docs/developers/smart-contracts/)

<!-- Bad -->

Read more about [smart contracts](/docs/developers/smart-contracts)
```

### Linking to images {#images}

When adding an image to a page, the image should be downloaded and placed in the same folder as the markdown file. You can reference the image like this:

`![alt text for image](./image.png)`

```md
<!-- Good -->

![How to mint your NFT](./mintYourNFT.gif)

<!-- Bad -->

![How to mint your NFT](https://cdn-images-1.medium.com/max/2000/0342fj_fsdfs.gif)
```

This helps us ensure the image will be available.

### Using emojis {#images}

Everyone loves emojis <Emoji text="🥰" size={1} /> To standardize the appearance of all Emojis across browsers, ethereum.org uses an `<Emoji />` React component.

```md
<--- Good --->

The London Upgrade is live <Emoji text=":tada:" size={1} />

The London Upgrade is live <Emoji text="🎉" size={1} />

<--- Bad --->

The London Upgrade is live 🎉
```

### Header casing {#header-casing}

This site uses **sentence casing** for header names as a convention. Only the first word and proper nouns are capitalized. This applies to all markdown files on lines that begin with hashes (#).

```md
<!-- Good -->

## Minting your NFT

### Setting up your wallet

### Get enough ether

<!-- Bad -->

## Minting Your NFT

### Setting Up Your Wallet

### Getting Enough ether
```

### Article authors {#authors}

When citing articles from a specific author or organization, use the article's name as a link, followed by a dash, then the author's name italicized.

```md
<--- Good --->

- [A rollup-centric ethereum roadmap](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) — _Vitalik Buterin_
- [The History of Ethereum Testnets](https://consensys.net/blog/news/the-history-of-ethereum-testnets/) – _ConsenSys_

<--- Bad--->

- [A rollup-centric ethereum roadmap by Vitalik Buterin](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [ConsenSys on The History of Ethereum Testnets](https://consensys.net/blog/news/the-history-of-ethereum-testnets/) – _ConsenSys_
```
