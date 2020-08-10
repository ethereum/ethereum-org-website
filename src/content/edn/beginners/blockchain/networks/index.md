---
title: Networks
description:
lang: en
sidebar: true
---

# Networks

**Original author:** Wil Barnes  
**Link:** https://kauri.io/ethereum-101-part-6-mainnet-testnets/3eba08b801a44776a07607b9e046dd08/a

<Divider />

The Ethereum you use to hold your ETH and send transactions is known as Mainnet. But there are also test networks that allow you to use Ethereum without spending your ETH.

## Prerequisites

## Overview of networks

Generally speaking, consumers will interact with the Ethereum mainnet. Developers, projects, and researchers will use testnets to experiment new features, test transactions, and calibrate gas costs without paying gas fees.

- **Mainnet**
  the live public Ethereum production blockchain, where actual valued transactions occur on the distributed ledger.

- **Public Testnet(s)**
  public Ethereum blockchain(s) designed for testing, running on valueless ether available from "faucets," that mock the mainnet environment as best as possible.
  Examples: Ropsten, Kovan, Rinkeby, Görli

- **Local Testnet(s)**
  local, running on your machine or on a small scale, private Ethereum blockchains.
  Examples: [Ganache](https://www.trufflesuite.com/docs/ganache/quickstart), eth-tester, private client network clusters (e.g. Geth with custom genesis file, Parity with '--dev' argument)

## Testnets

| Network                                                | Consensus protocol                                | Supported Clients  | Block Times | Mineable? | Faucet                                    |
| ------------------------------------------------------ | ------------------------------------------------- | ------------------ | ----------- | --------- | ----------------------------------------- |
| [**Mainnet**](https://ethstats.net/)                   | Proof of Work (ethash)                            | Multi-client       | ~15 seconds | Yes       | [Get ETH](/en/get-eth/)                   |
| [**Ropsten**](https://github.com/ethereum/ropsten)     | Proof of Work (best emulates mainnet environment) | Both Geth / Parity | ~15 seconds | Yes       | [Faucet](https://faucet.ropsten.be/)      |
| [**Kovan**](https://github.com/kovan-testnet/proposal) | Proof of Authority                                | Parity only        | ~4 seconds  | No        | [Faucet](https://faucet.kovan.network/)   |
| [**Rinkeby**](https://www.rinkeby.io/)                 | Proof of Authority (Clique)                       | Geth only          | ~15 seconds | No        | [Faucet](https://faucet.rinkeby.io/)      |
| [**Görli**](https://goerli.net/)                       | Proof of Authority (Clique)                       | Multi-client       | ~16 seconds | No        | [Faucet](https://goerli-faucet.slock.it/) |

## Ropsten using Proof of Work

The Ropsten testnet, by virtue of using a Proof of Work consensus protocol and being mineable, generally best emulates the current Ethereum production network.

## Rinkeby and Kovan using Proof of Authority

Kovan and Rinkeby both utilize a Proof of Authority (PoA) protocol. Instead of nodes solving arbitrarily difficult mathematical proof of work puzzles, a set of authorities (called ‘sealers’) are given the explicit permission to create new blocks and update the state of the test blockchain.

Under a Proof of Authority protocol, adversaries operating from an unwanted connection are unable to overwhelm or spam the network. The implementation of Proof of Authority testnets was the result of a series of attacks exploiting the proof of work algorithm on prior testnets (originating on Morden, which has since been voluntarily deactivated). To learn more of the historical details surrounding the testnets, please see the additional reading section.

### Single client testnets

Single client testnets also offer auxiliary debugging information. If Rinkeby is experiencing issues, a reasonable assumption can be made that there is a bug in the Geth client. Diagnosing issues on the mainnet can be more nebulous due to the multitude of different clients maintaining sync.

### Multi client testnets

Likewise, multi client testnets create environments that allow for testing of client interoperability. Ropsten supports both Geth and Parity clients. Görli, a new testnet with its genesis block starting Jan. 31, 2019, supports Parity, Geth, Nethermind, Pantheon, and EthereumJS.

## What network do you need?

**I want to use real Ether and use DApps, what network do I use?**  
Mainnet. Be vigilant, you will be using real digital assets!

**I'm a developer, what network do I use?**

- _Are you simply testing small, private transactions?_ Try starting with [Ganache](https://www.trufflesuite.com/docs/ganache/quickstart) or a private Geth or Parity chain.
- _Are you working with a DApp?_ Try deploying to a public testnet suitable to your needs (e.g. single client, multi-client, or do you need a specific blocktime? Check the table above.)
- _Full faith and confidence in your DApp?_ Deploy to mainnet and expect some attention. [More on deployment](/en/edn/ethereum-development/smart-contracts/deploying-smart-contracts/)
