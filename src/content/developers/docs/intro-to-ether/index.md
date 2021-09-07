---
title: Intro to ether
description: A dapp developer's introduction to the ether cryptocurrency.
lang: en
sidebar: true
---

## Prerequisites {#prerequisites}

To help you better understand this page, we recommend you first read [Introduction to Ethereum](/developers/docs/intro-to-ethereum/).

## What is a cryptocurrency? {#what-is-a-cryptocurrency}

A cryptocurrency is a medium of exchange secured by a blockchain-based ledger.

A medium of exchange is anything that is widely accepted as payment for goods and services, and a ledger is a data store that keeps track of transactions. Blockchain technology allows users to make transactions on the ledger without reliance upon a trusted third party to maintain the ledger.

The first-ever cryptocurrency was Bitcoin, created by Satoshi Nakamoto. Since Bitcoin's release in 2009, people have made thousands of cryptocurrencies across many different types of blockchains.

## What is ether? {#what-is-ether}

Ether (ETH) is the cryptocurrency used to pay for computing services on the [Ethereum blockchain](/developers/docs/intro-to-ethereum).

It is [common](https://www.reuters.com/article/us-crypto-currencies-lending-insight-idUSKBN25M0GP#:~:text=price%20of%20ethereum) [to](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845#:~:text=cryptocurrencies%20including%20ethereum) [conflate](https://www.cnn.com/2021/03/14/tech/nft-art-buying/index.html#:~:text=price%20of%20ethereum) Ethereum and ether — when people reference the "price of Ethereum," they are almost always describing the price of ether.

The Ethereum blockchain allows developers to create [decentralized applications (dapps)](/developers/docs/dapps), which all share a pool of computing power. This shared pool is finite, so Ethereum needs to determine who gets access to the computing power. Otherwise, a dapp with an accidental infinite loop or another malicious program could consume the entire network.

The ether cryptocurrency supports a pricing mechanism for Ethereum's computing power. When users want to make a transaction, they must pay ether to have their transaction recognized on the blockchain. These usage costs are called gas fees, and they depend on the total amount of computing required by a transaction, as well as the network-wide demand for computing when the transaction is submitted.

Thus, even if a malicious dapp submitted an infinite loop, the transaction would eventually run out of ether and terminate, allowing the network to return to normal.

[More on gas](/developers/docs/gas/)

## Minting ether {#minting-ether}

Minting is a process in which new ether is created on the Ethereum ledger. The new ether is created by the underlying Ethereum protocol, and it is not possible for a user to create new ether.

Ether is minted when a miner creates a block on the Ethereum blockchain. As an incentive to miners, the protocol grants a reward in each block, incrementing the balance of an address set by the block's miner. The block reward has changed over time, and today it is 2 ETH per block.

## Burning ether {#burning-ether}

Just as ether can be created by minting, ether can be destroyed by a process called burning. When burn occurs, ether is removed from the Ethereum ledger.

Ether burn occurs in every transaction on Ethereum. When a user pays for their transaction, their base gas fee is automatically destroyed by the Ethereum protocol. [In some blocks](https://etherscan.io/block/12965263), more ether are burned than minted due to base fee burn.

[More on gas base-fees](/developers/docs/gas/#base-fee)

## Denominations of ether {#denominations}

Since many transactions on Ethereum are small, ether has several denominations which may be referenced for smaller amounts. Of these denominations, Wei and gwei are particularly important.

Wei is the smallest possible amount of ether, and as a result, many technical implementations, such as the [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf), will base all calculations in Wei.

Gwei, short for giga-Wei, is often used to describe gas costs on the Ethereum network.

| Denomination | Value in ether   | Common Usage              |
| ------------ | ---------------- | ------------------------- |
| Wei          | 10<sup>-18</sup> | Technical implementations |
| Gwei         | 10<sup>-9</sup>  | Human-readable gas fees   |

## Transferring ether {#transferring-ether}

Each transaction in the Ethereum blockchain contains a `value` field, which transfers a specified amount of ether, denominated in Wei, to send from the sender's address to the recipient address.

When the recipient address is a [smart contract](/developers/docs/smart-contracts/), this transferred ether may be used to pay for gas when the smart contract executes its code.

[More on transactions](/developers/docs/transactions/)

## Querying ether {#querying-ether}

Users can query the ether balance of any [account](/developers/docs/accounts/) by inspecting the account's `balance` field, which shows ether holdings denominated in wei.

[Etherscan](https://etherscan.io) is a popular tool to inspect address balances via a web-based application. For example, [this Etherscan page](https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae) shows the balance for the Ethereum Foundation.

## Further reading {#further-reading}

- [Ethereum Whitepaper](/whitepaper/): The original proposal for Ethereum. This document includes a description of ether and the motivations behind its creation.
- [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf): A technical description of Ethereum's implementation. This document describes the underlying logic of the Ethereum blockchain and ether cryptocurrency.

_Know of a community resource that helped you? Edit this page and add it!_
