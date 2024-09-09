---
title: Introduction to blockchain bridges
description: Bridges allow users to move their funds across different blockchains
lang: en
---

# Blockchain bridges {#prerequisites}

_Web3 has evolved into an ecosystem of L1 blockchains and L2 scaling solutions, each designed with unique capabilities and trade-offs. As the number of blockchain protocols increases, so does the demand to move assets across chains. To fulfill this demand, we need bridges._

<Divider />

## What are bridges? {#what-are-bridges}

Blockchain bridges work just like the bridges we know in the physical world. Just as a physical bridge connects two physical locations, a blockchain bridge connects two blockchain ecosystems. **Bridges facilitate communication between blockchains through the transfer of information and assets**.

Let's consider an example:

You're from the USA and are planning a trip to Europe. You have USD, but you need EUR to spend. To exchange your USD for EUR you can use a currency exchange for a small fee.

But, what do you do if you want to make a similar exchange to use a different [blockchain](/glossary/#blockchain)? Let's say you want to exchange [ETH](/glossary/#ether) on Ethereum Mainnet for ETH on [Arbitrum](https://arbitrum.io/). Like the currency exchange we made for EUR, we need a mechanism to move our ETH from Ethereum to Arbitrum. Bridges make such a transaction possible. In this case, [Arbitrum has a native bridge](https://bridge.arbitrum.io/) that can transfer ETH from Mainnet onto Arbitrum.

## Why do we need bridges? {#why-do-we-need-bridges}

All blockchains have their limitations. For Ethereum to scale and keep up with demand, it has required [rollups](/glossary/#rollups). Alternatively, L1s like Solana and Avalanche are designed differently to enable higher throughput but at the cost of decentralization.

However, all blockchains develop in isolated environments and have different rules and [consensus](/glossary/#consensus) mechanisms. This means they cannot natively communicate, and tokens cannot move freely between blockchains.

Bridges exist to connect blockchains, allowing the transfer of information and tokens between them.

**Bridges enable**:

- the cross-chain transfer of assets and information.
- [dapps](/glossary/#dapp) to access the strengths of various blockchains – thus enhancing their capabilities (as protocols now have more design space for innovation).
- users to access new platforms and leverage the benefits of different chains.
- developers from different blockchain ecosystems to collaborate and build new platforms for the users.

[How to bridge tokens to layer 2](/guides/how-to-use-a-bridge/)

<Divider />

## Bridge use cases {#bridge-use-cases}

The following are some scenarios where you can use a bridge:

### Lower transaction fees {#transaction-fees}

Let’s say you have ETH on Ethereum Mainnet but want cheaper transaction fees to explore different dapps. By bridging your ETH from the Mainnet to an Ethereum L2 rollup, you can enjoy lower transaction fees.

### Dapps on other blockchains {#dapps-other-chains}

If you’ve been using Aave on Ethereum Mainnet to lend USDT but the interest rate for lending USDT using Aave on Polygon is higher.

### Explore blockchain ecosystems {#explore-ecosystems}

If you have ETH on Ethereum Mainnet and you want to explore an alt L1 to try out their native dapps. You can use a bridge to transfer your ETH from Ethereum Mainnet to the alt L1.

### Own native crypto assets {#own-native}

Let’s say you want to own native Bitcoin (BTC), but you only have funds on Ethereum Mainnet. To gain exposure to BTC on Ethereum, you can buy Wrapped Bitcoin (WBTC). However, WBTC is an [ERC-20](/glossary/#erc-20) token native to the Ethereum network, which means it’s an Ethereum version of Bitcoin and not the original asset on the Bitcoin blockchain. To own native BTC, you would have to bridge your assets from Ethereum to Bitcoin using a bridge. This will bridge your WBTC and convert it into native BTC. Alternatively, you might own BTC and want to use it in Ethereum [DeFi](/glossary/#defi) protocols. This would require bridging the other way, from BTC to WBTC which can then be used as an asset on Ethereum.

<InfoBanner shouldCenter emoji=":bulb:">
  You can also do all of the above using a <a href="/get-eth/">centralized exchange</a>. However, unless your funds are already on an exchange, it would involve multiple steps, and you’d likely be better off using a bridge.
</InfoBanner>

<Divider />

## Types of bridge {#types-of-bridge}

Bridges have many types of designs and intricacies. Generally, bridges fall into two categories: trusted and trustless bridges.

| Trusted Bridges                                                                                                                                         | Trustless Bridges                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Trusted bridges depend upon a central entity or system for their operations.                                                                            | Trustless bridges operate using smart contracts and algorithms.                                        |
| They have trust assumptions with respect to the custody of funds and the security of the bridge. Users mostly rely on the bridge operator's reputation. | They are trustless, i.e., the security of the bridge is the same as that of the underlying blockchain. |
| Users need to give up control of their crypto assets.                                                                                                   | Through [smart contracts](/glossary/#smart-contract), trustless bridges enable users to remain in control of their funds.           |

In a nutshell, we can say that trusted bridges have trust assumptions, whereas trustless bridges are trust-minimized and don’t make new trust assumptions beyond those of the underlying domains. Here’s how these terms can be described:

- **Trustless**: having equivalent security to the underlying domains. As described by [Arjun Bhuptani in this article.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Trust assumptions:** moving away from the security of the underlying domains by adding external verifiers in the system, thus making it less crypto-economically secure.

To develop a better understanding of the key differences between the two approaches, let’s take an example:

Imagine you’re at the airport security checkpoint. There are two types of checkpoints:

1. Manual Checkpoints — operated by officials who manually check all the details of your ticket and identity before handing over the boarding pass.
2. Self Check-In — operated by a machine where you put in your flight details and receive the boarding pass if everything checks out.

A manual checkpoint is similar to a trusted model as it depends upon a third party, i.e., the officials, for its operations. As a user, you trust the officials to make the right decisions and use your private information correctly.

Self check-in is similar to a trustless model as it removes the operator's role and uses technology for its operations. Users always remain in control of their data and don’t have to trust a third party with their private information.

Many bridging solutions adopt models between these two extremes with varying degrees of trustlessness.

<Divider />

## Use bridge {#use-bridge}

Using bridges allows you to move your assets across different blockchains. Here are some resources that can help you find and use bridges:

- **[L2BEAT Bridges Summary](https://l2beat.com/bridges/summary) & [L2BEAT Bridges Risk Analysis](https://l2beat.com/bridges/risk)**: A comprehensive summary of various bridges, including details on market share, bridge type, and destination chains. L2BEAT also has a risk analysis for bridges, helping users make informed decisions when selecting a bridge.
- **[DefiLlama Bridge Summary](https://defillama.com/bridges/Ethereum)**: A summary of bridge volumes across Ethereum networks.

<Divider />

## Risk using bridges {#bridge-risk}

Bridges are in the early stages of development. It is likely that the optimal bridge design has not yet been discovered. Interacting with any type of bridge carries risk:

- **Smart Contract Risk —** the risk of a bug in the code that can cause user funds to be lost
- **Technology Risk —** software failure, buggy code, human error, spam, and malicious attacks can possibly disrupt user operations

Moreover, since trusted bridges add trust assumptions, they carry additional risks such as:

- **Censorship Risk —** bridge operators can theoretically stop users from transferring their assets using the bridge
- **Custodial Risk —** bridge operators can collude to steal the users’ funds

User's funds are at risk if:

- there is a bug in the smart contract
- the user makes an error
- the underlying blockchain is hacked
- the bridge operators have malicious intent in a trusted bridge
- the bridge gets hacked

One recent hack was Solana’s Wormhole bridge, [where 120k wETH ($325 million USD) was stolen during the hack](https://rekt.news/wormhole-rekt/). Many of the [top hacks in blockchains involved bridges](https://rekt.news/leaderboard/).

Bridges are crucial to onboarding users onto Ethereum L2s, and even for users who want to explore different ecosystems. However, given the risks involved in interacting with bridges, users must understand the trade-offs the bridges are making. These are some [strategies for cross-chain security](https://blog.debridge.finance/10-strategies-for-cross-chain-security-8ed5f5879946).

<Divider />

## Further reading {#further-reading}

- [EIP-5164: Cross-Chain Execution](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) _June 18, 2022 - Brendan Asselstine_
- [L2Bridge Risk Framework](https://gov.l2beat.com/t/l2bridge-risk-framework/31) _July 5, 2022 - Bartek Kiepuszewski_
- ["Why the future will be multi-chain, but it will not be cross-chain."](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) _January 8, 2022 - Vitalik Buterin_
