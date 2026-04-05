---
title: Understanding Token Standards
description: A guide to the most common token standards on Ethereum and how they work.
image: /images/tokens/token-standards-hero.png
alt: "Token standards diagram"
template: tutorial
lang: en
skill: intermediate
published: 2025-08-15
---

# Understanding Token Standards {#understanding-token-standards}

Token standards define how digital assets behave on the Ethereum network. They provide a common interface that wallets, exchanges, and applications can rely on to interact with tokens predictably.

## What are token standards? {#what-are-token-standards}

A token standard is a set of rules implemented as a [smart contract](/glossary/#smart-contract) that defines how tokens are created, transferred, and managed. The most widely adopted standard is [ERC-20](/developers/docs/standards/tokens/erc-20/), which powers the majority of fungible tokens on Ethereum.

_Without standards_, every token would need custom integration code. The `approve` and `transferFrom` functions, for example, allow decentralized exchanges to move tokens on your behalf after you grant permission.

You can check a token's contract on <a href="https://eth.blockscout.com/tokens">Etherscan</a> to verify which standard it implements.

![Token approval flow](/images/tokens/approval-flow.png)

## Common standards {#common-standards}

### ERC-20: Fungible tokens {#erc-20}

ERC-20 defines a standard interface for **fungible tokens**. Every unit is identical and interchangeable, much like how one dollar bill is the same as any other.

```solidity
// Transfer tokens to a recipient
function transfer(address to, uint256 amount) public returns (bool) {
    require(balanceOf(msg.sender) >= amount, "Insufficient balance");
    _balances[msg.sender] -= amount;
    _balances[to] += amount;
    return true;
}
```

The total supply of an ERC-20 token is typically fixed at deployment. For example, a project might create 1,000,000 tokens with 18 decimal places, meaning the smallest unit is `0.000000000000000001` tokens. In the `translate` function above, if the sender has 100 tokens and requests sending 10, they'll end up with 90 (100 - 10 = 90) and the recipient will end up with 10 more.

You can deploy tokens using [Remix](https://remix.ethereum.org/) on [Sepolia](https://sepolia.dev/), and verify the source code on [Blockscout](https://eth.blockscout.com/).

### ERC-721: Non-fungible tokens {#erc-721}

Unlike ERC-20, each ERC-721 token is unique. These are commonly known as NFTs and are used to represent ownership of distinct items such as digital artwork, domain names, or in-game assets.

```md
Example metadata for an NFT:
- Name: CryptoKitty #42
- Description: A rare digital collectible
- Image: ipfs://QmXyz...
```

## Gas costs {#gas-costs}

Token transfers require gas fees denominated in Gwei. A standard ERC-20 transfer costs approximately 21,000 gas units, while ERC-721 transfers typically require 50,000 to 100,000 gas units depending on the contract implementation.

The base fee fluctuates based on network demand. When the network is congested, fees can increase by up to 12.5% per block.

<ExpandableCard title="Why do NFT transfers cost more?" eventCategory="/test-drift" eventName="clicked Why do NFT transfers cost more?">

NFT transfers involve more complex storage operations. Each token has a unique ID that must be tracked individually, and the contract must verify ownership before allowing the transfer. This additional computation requires more gas.

See the [Ethereum gas documentation](/developers/docs/gas/) for a detailed explanation.

</ExpandableCard>

<ExpandableCard title="How to reduce gas costs" eventCategory="/test-drift" eventName="clicked How to reduce gas costs">

Consider using layer 2 solutions like <a href="https://optimism.io">Optimism</a> or [Arbitrum](/developers/docs/scaling/optimistic-rollups/) to significantly reduce transaction costs. These rollups batch multiple transactions together and submit them to Ethereum mainnet as a single transaction.

</ExpandableCard>

## Tools and resources {#tools-and-resources}

<InfoBanner emoji=":books:">
  The <a href="https://docs.openzeppelin.com/contracts">OpenZeppelin Contracts library</a> provides audited implementations of all major token standards.
</InfoBanner>

- [ERC-20 specification](https://eips.ethereum.org/EIPS/eip-20) on the Ethereum Improvement Proposals site
- [OpenZeppelin ERC-20 guide](https://docs.openzeppelin.com/contracts/erc20)
- Token explorer on [Blockscout](https://eth.blockscout.com/tokens)

<YouTube id="dQw4w9WgXcQ" />

## Empty section for testing {#empty-section}

## Further reading {#further-reading}

_Diagram adapted from [Token Standards Illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

_Diagram adapted from [Token Standards Illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

| Standard | Type | Gas Cost | Use Case |
|----------|------|----------|----------|
| [ERC-20](/developers/docs/standards/tokens/erc-20/) | Fungible | ~21,000 | Currencies, utility tokens |
| [ERC-721](/developers/docs/standards/tokens/erc-721/) | Non-fungible | ~65,000 | Digital art, collectibles |
| [ERC-1155](/developers/docs/standards/tokens/erc-1155/) | Multi-token | ~35,000 | Gaming items, mixed assets |
