---
title: "Server components for web3 apps"
description: After this tutorial, you will be able to write TypeScript servers that listen to events on a blockchain and respond accordingly with their own transactions. This will enable you to write applications that are centralized (because the server is a point of failure), but can interact with web3 entities.
author: Ori Pomerantz
lang: en
tags: ["server", "offchain", "centralized"]
skill: beginner
published: 2024-07-15
---

## Introduction {#introduction}

In most cases, a decentralized app uses a server to distribute the software, but all the actual interaction happens between the client (typically, web browser) and the blockchain.

![Normal interaction between web server, client, and blockchain](./fig-1.svg)

However, there are some cases where an application would benefit from having a server component that runs independently. Such a server would be able to respond to events, and to requests that come from other sources, such as an API, by issuing transactions.

![The interaction with the addition of a server](./fig-2.svg)

There are several possible tasks for such a server could fulfill.

- Secret state. In gaming it is often useful not to have all the information that the game knows available to the players. However, *there are no secrets on the blockchain*, any information that is in the blockchain is easy for anybody to figure out. Therefore, if part of the game state is to be kept secret, it has to be stored elsewhere (and possibly have the effects of that state verified using [zero-knowledge proofs](/zero-knowledge-proofs)).

- Centralized oracle. If the stakes are sufficiently low, an external server that reads some information online and then posts it to the chain may be good enough to use as an [oracle](/developers/docs/oracles/).

- Agent. Nothing happens on the blockchain without a transaction to activate it. A server can act on behalf of a user to perform actions such as [arbitrage](/developers/docs/mev/#mev-examples-dex-arbitrage) when the opportunity presents itself.

### The sample program {#sample-program}

## Getting started {#getting-started}

## Listening to events {#listen-events}

## Responding with transactions {#respond-txns}

## Conclusion {#conclusion}