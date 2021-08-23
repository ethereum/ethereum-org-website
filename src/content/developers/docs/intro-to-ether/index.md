---
title: Intro to Ether
description: A dapp developer's introduction to the Ether cryptocurrency.
lang: en
sidebar: true
---

## Prerequisites {#prerequisites}

To help you better understand this page, we recommend you first read [Introduction to Ethereum](/developers/docs/intro-to-ethereum/).

## What is a cryptocurrency? {#what-is-a-cryptocurrency}

A cryptocurrency is a medium of exchange secured by a blockchain-based ledger.

A "medium of exchange" is anything that is widely accepted as payment for goods and services, and a "ledger" is a data store that keeps track of transactions. Blockchain technology allows users to make transactions on the ledger without reliance upon a trusted third party to maintain the ledger.

The original cryptocurrency was Bitcoin, released in 2009 by the pseudonymous Satoshi Nakamoto. In this first implementation, the Bitcoin cryptocurrency was a medium of exchange used to pay for one specific service: validating transactions on the bitcoin blockchain. Today, the Bitcoin crytpocurrency is used to pay for goods and services ouside the bitcoin blockchain.

Since Bitcoin's release, developers have created many different types of cryptocurrencies across many different types of blockchains.

## What is Ether? {#what-is-ether}

Ether (ETH) is the cryptocurrency that pays for computing services on the [Ethereum blockchain](/developers/docs/intro-to-ethereum).

The Ethereum blockchain allows developers to create [decentralized applications (dapps)](/developers/docs/intro-to-dapps), sharing a common pool of computing power. Because this shared pool has a finite amount of power, Ethereum needs a way to determine who gets access to the computing resources — otherwise, a dapp could consume the entire network by submitting an infinite loop or other malicious program.

The Ether cryptocurrency provides a pricing mechanism for Ethereum's computing power. When users want to make a transaction, they must pay an amount of Ether that is proportional to the total amount of computing the transaction requires. Thus, even if a malicious dapp submitted an infinite loop, the transaction would eventually run out of Ether and terminate, allowing the network to return to normal.

It is [common](https://www.reuters.com/article/us-crypto-currencies-lending-insight-idUSKBN25M0GP#:~:text=price%20of%20ethereum) [to](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845#:~:text=cryptocurrencies%20including%20ethereum) [conflate](https://www.cnn.com/2021/03/14/tech/nft-art-buying/index.html#:~:text=price%20of%20ethereum) Ethereum and Ether — when people reference the "price of Ethereum," they are almost always describing the price of Ether.

## Pricing a Transaction in Ether {#pricing-a-transaction}

The price of a transaction on Ethereum is determined by two variables: gas and gas fees. By multiplying these variables, users can determine the price of their transaction — which is paid in Ether.

[Gas](/developers/docs/gas/#what-is-gas) is proportional to the number of operations a given transaction must execute before completing. Some transactions might be very simple; for example, moving Ether from one account to another. Other transactions are much more intensive; for example, calculating the first trillion Fibonacci numbers. Tracking gas ensures each user pays a proportional amount for their usage of the Ethereum network's computing power.

Gas fees are a measure of the short-term demand for the Ethereum network's computing power. When many users are trying to use Ethereum, gas fees increase (and vice versa).

Gas fees are made up of two components: [base fee](/developers/docs/gas/#base-fee) and [priority fee](/developers/docs/gas/#priority-fee) (also called a tip). The base fee is set by the protocol in reaction to network demand, and the priority fee is set by users hoping to be included into the next block. Senders can set their priority fee as high as they prefer; however, the miners who include transactions into blocks are incentivized to pick transactions offering the highest gas fees.

Thus, gas fees functions as an auction mechanism for inclusion in the next Ethereum block. As a result, two transactions with the same amount of gas may cost more or less depending on when they are submitted to Ethereum.

[More on gas](/developers/docs/gas/)

## Minting Ether {#minting-ether}

Ether is minted by the Ethereum protocol when a miner creates a block. To incentivize block creation, the protocol grants a "reward" in each block, incrementing the balance of an address set by the block's miner. The block reward has changed over time, and today it is 2 ETH per block.

Ethereum also provides smaller rewards to miners who create ["uncle blocks"](/developers/docs/data-and-analytics/block-explorers/#blocks), which are beyond the scope of this introduction.

## Burning Ether {#burning-ether}

Ether burn occurs in every transaction on Ethereum. When a user pays for their transaction, their [base fee](/developers/docs/gas/#base-fee) is automatically destroyed. [In some blocks](https://etherscan.io/block/12965263), more Ether are burned than minted due to base fee burn.

## Denominations of Ether {#denominations}

Since many transactions on Ethereum are small, Ether has several denominations which may be referenced for smaller amounts.

The denominations below can be found in the [Ethereum Whitepaper](/whitepaper/#currency-and-issuance). Others have been proposed, but Wei, Szabo, and Finney remain the most commonly used denominations. Each is named after a famous member of the cypherpunks, a group of cryptographers whose work influenced today's blockchain space.

| Denomination | Value in Ether   | Background                                                                                                                                                                                                        |
| ------------ | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Wei          | 10<sup>-18</sup> | Computer scientist whose [b-money](http://www.weidai.com/bmoney.txt) system was a foundational work in blockchain development.                                                                                    |
| Szabo        | 10<sup>-6</sup>  | Computer scientist who helped [define the concept of smart contracts](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html). |
| Finney       | 10<sup>-3</sup>  | Digital rights activist and first user of Bitcoin after Satoshi Nakamoto.                                                                                                                                         |

Of these denominations, Wei is particularly important, as it is the smallest possible amount of Ether. As a result, many technical implementations, such as the [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf), will base all calculations in Wei.

Giga-wei or "gwei" is often used to describe gas costs on the Ethereum network.

## Transferring Ether {#transferring-ether}

Each [transaction](/developers/docs/transactions/#whats-a-transaction) in the Ethereum blockchain contains a `value` field, which transfers a specified amount of Ether, denominated in Wei, to send from the sender's address to the recipient address.

When the recipient address is a [smart contract](/developers/docs/smart-contracts/), this transferred Ether may be used to pay for gas when the smart contract executes its code.

[More on transactions](/developers/docs/transactions/)

## Querying Ether {#querying-ether}

Users can query the Ether balance of any [account](/developers/docs/accounts/) by inspecting the account's `balance` field, which shows Ether holdings denominated in wei.

[Etherscan](https://etherscan.io) is a popular tool to inspect address balances via a web-based application. For example, [this Etherscan page](https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae) shows the balance for the Ethereum Foundation.

## Further reading {#further-reading}

- [Ethereum Whitepaper](/whitepaper/): The original proposal for Ethereum. This document includes a description of Ether and the motivations behind its creation.
- [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf): A technical description of Ethereum's implementation. This document describes the underlying logic of the Ethereum blockchain and Ether cryptocurrency.

_Know of a community resource that helped you? Edit this page and add it!_
