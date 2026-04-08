---
title: "What is proof of work?"
description: "A beginner-friendly explanation of the proof of work (PoW) consensus mechanism, including how miners solve cryptographic puzzles to validate transactions and secure the blockchain network."
lang: en
youtubeId: "3EUAcxhuoU4"
uploadDate: 2019-02-22
duration: "0:05:31"
educationLevel: beginner
topic:
  - "consensus"
  - "pow"
format: explainer
author: Binance Academy
breadcrumb: "Proof of Work"
---

An explainer by **Binance Academy** covering the proof of work (PoW) consensus mechanism, including its origins, how miners compete to solve cryptographic puzzles, and how it secures the blockchain network.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=3EUAcxhuoU4) published by Binance Academy. It has been lightly edited for readability.*

#### Origins of proof of work (0:00) {#origins-of-proof-of-work-000}

Originally dating back to 1993, the proof-of-work concept was developed to prevent denial-of-service attacks and other service abuse such as spam on a network, by requiring some work from the service user — usually meaning processing time by a computer.

In 2009, Bitcoin introduced an innovative way of using proof of work as a consensus algorithm to validate transactions and broadcast new blocks to the blockchain. It has since spread to become a widely used consensus algorithm in many cryptocurrencies.

#### How proof of work works (0:33) {#how-proof-of-work-works-033}

In short, miners on a network compete against each other to solve complex computational puzzles. These puzzles are difficult to solve but easy to verify once someone finds the correct solution.

Once a miner has found the solution to the puzzle, they can broadcast the block to the network, where all the other miners will verify that the solution is correct.

#### Bitcoin mining example (0:56) {#bitcoin-mining-example-056}

Bitcoin is a blockchain-based system maintained by the collective work of decentralized nodes. Some of these nodes are known as miners and are responsible for adding new blocks to the blockchain.

In order to do so, miners need to try and guess a pseudo-random number known as a nonce. This number, when combined with the data provided in the block and passed through a hash function, must produce a result that matches given conditions — for example, a hash starting with four zeros.

When a matching result is found, the other nodes verify the validity of the outcome, and the miner node is rewarded with the block reward. Therefore, it is impossible to add a new block to the main chain without first finding a valid nonce, which in turn generates the solution for that specific block — called the block hash.

#### Why it's called "proof of work" (1:46) {#why-its-called-proof-of-work-146}

Each validated block contains a block hash that represents the work done by the miner. This is why it is called proof of work.

#### Security benefits (1:54) {#security-benefits-154}

Proof of work helps protect the network against numerous different attacks. A successful attack would require a lot of computational power and a lot of time to do the calculations. Therefore, it would be inefficient since the cost incurred would be greater than the potential rewards for attacking the network.

#### Limitations (2:10) {#limitations-210}

One issue with proof of work is that mining requires expensive computer hardware that consumes a large amount of power. While the complicated algorithm calculations guarantee the security of the network, these calculations aren't able to be utilized beyond that.

#### Looking ahead (2:25) {#looking-ahead-225}

While proof of work may not be the most efficient solution, it is still one of the most popular methods of reaching consensus in blockchains. There are already alternative methods and approaches trying to solve these problems, but only time will tell what method will be the successor of proof of work.
