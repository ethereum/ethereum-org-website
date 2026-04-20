---
title: "Code is law? Smart contracts explained"
description: "Exploring the concept of 'code is law' through the lens of smart contracts on Ethereum and DeFi. This video covers what smart contracts are, how they work, and the philosophical question of whether code should be the ultimate arbiter."
lang: en
youtubeId: "pWGLtjG-F5c"
uploadDate: 2020-11-18
duration: "0:15:25"
educationLevel: beginner
topic:
  - "smart-contracts"
format: explainer
author: Finematics
breadcrumb: "Smart Contracts"
---

An explainer by **Finematics** exploring the concept of "code is law" through the lens of smart contracts on Ethereum, covering what smart contracts are, how they work, their advantages over traditional contracts, and why they are the building blocks of decentralized finance.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=pWGLtjG-F5c) published by Finematics. It has been lightly edited for readability.*

#### Introduction (0:00) {#introduction-000}

Have you ever heard the expression "code is law," where technology is used to enforce rules? In that case, do we even need lawyers? Or maybe we can live in a fully automated world where code dictates what we can and cannot do. With the current development of smart contracts, this futuristic scenario may be closer than we think.

A smart contract is a piece of code that can be executed automatically and in a deterministic way. The smart contract code is usually stored and executed on the blockchain to make it trustless and secure. Smart contracts also have the capability of receiving, storing, and sending funds — and even calling other smart contracts. They follow if-then semantics, which makes them fairly easy to program.

Smart contracts aim at removing the human factor from decision-making. The human factor is often proven to be the most error-prone and unreliable element of standard traditional contracts.

A vending machine comes up very often as a good analogy to a smart contract, as it shares some similarities. A typical vending machine is programmed in a way that allows certain actions and state transitions based on the input. It also works in a fully deterministic way. For example, if you want to buy a can of coke that costs two dollars and you only have one dollar, no matter how many times you try, you won't be able to get the drink. On the other hand, if you insert three dollars, the machine will give you a can of coke and appropriate change. Even the change given is selected in a predefined and programmed way based on which coins are available and which coins the machine wants to get rid of first.

A smart contract can rely purely on the information available on the blockchain — for example, "if you give me ten tokens A, I'll give you ten tokens B." Or it can rely on an external data source, for example, on the ETH or S&P 500 price. The latter example makes smart contracts more difficult, as they have to trust real-world data. The needed trust can be minimized by using oracle services, but even oracle services have to be trusted. There are already a few projects that, by using certain incentives, make oracles more likely to provide correct data. Chainlink is a project that clearly stands out in this category.

#### Ethereum smart contracts (3:09) {#ethereum-smart-contracts-309}

Ethereum is a blockchain that supports smart contracts and makes it possible for a programmer to implement their own smart contracts. A smart contract can be written in a programming language called Solidity, which was created specifically for that purpose. In Ethereum, all deployed smart contracts are immutable — this means that once deployed, they cannot be modified, which creates certain risks that we're going to discuss later.

Smart contracts on Ethereum are also decentralized, which means there is no single machine controlling the contract. In fact, all the nodes on the Ethereum network store the same contract with exactly the same state. Although Ethereum is currently the most popular general-purpose smart contract platform, it is not the only one and it has a few competitors, including Cardano, Tezos, EOS, and Tron — but not all of them share the same characteristics.

#### Smart contract definition (4:23) {#smart-contract-definition-423}

The term "smart contract" was coined by well-known cryptographer Nick Szabo in the early 1990s. The name, although not the most self-explanatory, stuck and it's commonly used, especially in the blockchain industry. To see the benefits of smart contracts, let's compare a hypothetical smart contract to its equivalent in the traditional space.

#### Smart contract example (4:46) {#smart-contract-example-446}

Let's say we want to write the following contract: if Alice sends X number of tokens A and Bob sends the same number of tokens B, the tokens will be swapped — Alice will receive Bob's tokens and Bob will receive Alice's tokens.

In a non-smart-contract world, one way of achieving that without Alice having to trust Bob and Bob having to trust Alice would be to create an escrow contract with a third party. The third party would collect tokens A from Alice, wait for the same number of tokens B from Bob, and send Alice and Bob the respective swapped tokens.

#### Smart contract problems (5:45) {#smart-contract-problems-545}

This approach already shows a few problems that Alice and Bob may be facing:

- **Trusting intermediaries** — there is no guarantee that the third party will not run away with the tokens after receiving funds from Alice and Bob. We have to rely on the reputation of the intermediary and potential insurance.
- **Non-deterministic outcomes** — if something goes wrong, it may have different outputs depending on multiple factors, including the jurisdiction where a potential case would be settled.

On the other hand, a smart contract would work in a fully automated and deterministic way, making sure both parties receive funds when they meet the initial criteria of depositing tokens. Smart contracts can also hold funds within themselves, which is not possible to achieve in the traditional world.

#### Speed (6:47) {#speed-647}

Depending on the intermediary, Alice and Bob may have to wait even a few days or weeks to settle the transition of tokens. What if they want to swap tokens on a Sunday and the intermediary is not operating? With smart contracts, these kinds of problems go away, and the contract can be fulfilled seconds after the initial criteria are met.

#### Cost (7:16) {#cost-716}

Traditional contracts are not only expensive because of the intermediary that has to make a profit — there is also a huge risk of hidden costs for things like arbitration and enforcement if there are any problems with the contract.

Reusability is another advantage: the same smart contract responsible for swapping Alice's and Bob's tokens could be used by anyone else who wants to swap tokens. In the traditional world, they would all have to sign separate contracts and pay the respective fees to the intermediary.

#### Fraud (7:58) {#fraud-758}

Fraud is yet another hidden cost, this time for the intermediary itself. The intermediary would have to make sure that both Alice's and Bob's tokens are legitimate before initializing a swap. Fraud is very common in traditional finance, and most companies have huge teams working purely on preventing fraud. With smart contracts, the tokens can be verified on the blockchain, and with digital signatures, it's clear straight away whether both Alice and Bob are eligible for spending their tokens.

#### Use cases (8:42) {#use-cases-842}

Smart contracts have a growing number of use cases ranging from payments and decentralized finance to supply chain and crowdfunding. Smart contracts are also the basic building blocks for decentralized applications, or dapps.

#### DeFi (9:07) {#defi-907}

Decentralized finance, or DeFi, is one of the new industries that relies heavily on smart contracts. Some of the things that have already been built in this space include:

- **Decentralized stablecoins** — with clever use of smart contracts and certain incentives, we can create a stablecoin pegged to the U.S. dollar without having to store dollars in the real world. MakerDAO is one of the projects that makes this possible.
- **Automated liquidity provisioning** — a set of smart contracts can allow users to provide liquidity and swap tokens in a completely permissionless and decentralized fashion. Uniswap and Kyber Network are good examples of such protocols.

#### Crowdfunding and supply chains (10:05) {#crowdfunding-and-supply-chains-1005}

Another use case is providing more transparency to supply chains, where protocols like OriginTrail come into play. When it comes to crowdfunding, you can imagine a contract that unlocks funds as soon as certain goals are met and verified by the community.

#### Future smart contracts (10:29) {#future-smart-contracts-1029}

What if smart contracts could facilitate things like ride-sharing, apartment rentals, and much more? How about charity? You can imagine a fully automated fund that would send money directly to the people who need it the most, without any intermediaries. For example, the fund could determine that a certain region was struck by a hurricane and redirect funds to that part of the world. For now, it sounds quite impossible, but all the necessary elements to make something like this happen are being built as we speak.

The use cases for smart contracts are almost infinite, but before we can achieve all of that, we have to tackle a few problems:

- **Bugs** — one of the main risks when it comes to smart contracts is something that haunts every other piece of software. The best example is the DAO hack, which resulted in millions of dollars worth of Ether lost as the attacker was able to drain funds from the smart contract. This caused Ethereum to hard fork and created a lot of disagreement in the Ethereum community. Since the DAO hack, the Ethereum community has come up with a lot of extra security measures. These days, pretty much all popular smart contracts have gone through a security audit, often by multiple teams. There is also a trend for using formal verification methods to prove that certain contracts will always behave in an expected way.
- **Protocol changes** — even if a smart contract doesn't have any bugs and has been audited, we still cannot guarantee that a change on the platform level will not cause problems. An upgrade to the protocol itself may cause certain smart contracts to start behaving differently than expected.
- **Real-world data** — oracle services can provide a reliable way of getting information from the real world into the blockchain. But imagine you rented an apartment or a car and made some accidental damage. How would a smart contract, without any human intervention, possibly know about it? There are multiple examples where it's hard to imagine how something unexpected that happens in the real world can be visible to a smart contract.

Besides the above, there are also risks involving regulation and tax, but these can all eventually be solved.

#### Can we replace lawyers? (13:58) {#can-we-replace-lawyers-1358}

So can we actually replace lawyers with code? Not quite — at least not right now. In the future, more and more contracts will likely be automated, especially in finance. But even in a fully automated world, lawyers can provide valuable knowledge that can be translated into code. There are also a lot of regulatory challenges around the crypto industry that will keep lawyers very busy for a while. Nevertheless, if I were a lawyer, I would start learning about smart contracts and coding, as they will play a big role in the future.

#### Summary (14:53) {#summary-1453}

Smart contract pros:

- Fully automated
- Deterministic results
- Trustless
- Fast, precise, and secure
- Cost-efficient and transparent

Smart contract cons:

- Software bugs
- Protocol changes
- Regulatory and tax uncertainty

Even though smart contracts carry certain risks, we are still very early, and most of the current problems are solvable.
