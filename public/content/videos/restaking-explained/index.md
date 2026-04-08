---
title: "Explanation of restaking"
description: "An explainer on restaking, which uses already-staked ETH to provide security for additional protocols and services beyond Ethereum's base layer."
lang: en
youtubeId: "rOJo7VwPh7I"
uploadDate: 2024-02-05
duration: "0:12:33"
educationLevel: intermediate
topic:
  - "restaking"
  - "security"
format: explainer
author: CBER Forum
breadcrumb: "Restaking"
---

A presentation by **Mike Neuder** at a CBER Forum event covering how restaking works. The presentation defines self-staking, delegated staking, native and non-native restaking, the mechanics of liquid staking and liquid restaking tokens, and how slashing interacts with restaked positions.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=rOJo7VwPh7I) published by CBER Forum. It has been lightly edited for readability.*

#### Introduction (0:00) {#introduction-000}

Hey everyone, I'm Mike. I'm going to be talking about LRTs and LSTs. LRTs — is restaking the new staking? I'm going to start with a second question and use that to motivate the discussion about LSTs and LRTs, defining what those are. This is mostly a graphical presentation, so hopefully we can start from the beginning and build up together.

Quick outline: starting from the very beginning, we're going to define two modes of staking. First is self-staking, second is delegated staking. Then we'll get into the concept of restaking and defining it. There are four different models I want to explore — using the self and delegated separation, then focusing on native restaking versus non-native restaking. Then we'll go into liquification, talking about liquid tokens — liquid staking tokens and liquid restaking tokens. We'll motivate this by looking at slashing and restaking, and then both token types. Lastly, we'll finish up with some data around staking as it exists today in Ethereum.

#### Self-staking (0:48) {#self-staking-048}

Starting very much at the beginning, we have staking where Alice is doing it herself. She interacts directly with the protocol, puts stake into the protocol, and she's rewarded for doing so through the issuance of the native token. In the Ethereum case, Alice stakes 32 ETH and gets rewarded in ETH terms for participating in consensus.

There are two things to focus on here. First, staking serves as this anti-Sybil mechanism — you can't trick the network into saying that you have many identities because each identity costs a certain amount of this fixed supply of tokens. Second is collateral at risk — this is the protocol rule stuff in terms of slashing. If Alice misbehaves according to some very well-defined specification, the protocol will take away her capital and punish her for doing so.

#### Delegated staking (2:52) {#delegated-staking-252}

Delegated staking adds another layer in the middle between Alice and the protocol. Alice now delegates to Bob, who stakes to the Ethereum protocol. The rewards are sent to Bob, and the rewards less fees are forwarded onto Alice. This is the simplest version of delegated staking — Alice doesn't want to run the software herself, maybe she doesn't have 32 full ETH, or doesn't have the hardware or technical expertise to run a validator.

There are many different modes of this delegation at various levels of trust. The most trusted version is custodial — you send your ETH to Coinbase and say "stake on my behalf." You effectively trust them entirely because they custody the asset in your name. There's a non-custodial but DAO-governed version where you delegate your stake to someone determined by a DAO that votes on who gets to run the nodes — this is the Lido-style staking. The third is a trust-minimized version where both Alice and Bob put up some collateral. Alice subsidizes the rest of Bob's collateral, and if Bob misbehaves and gets slashed, his collateral is the first tranche that gets removed. I say "trust-minimized" and not "trustless" because no matter what, there are worlds in which Alice's collateral is completely wiped depending on what Bob does.

#### Self-restaking with native ETH (4:42) {#self-restaking-with-native-eth-442}

Now we can talk about what restaking is. This is a brand new concept — it's been around since Sreeram and EigenLayer introduced the term maybe a year and a half or two years ago.

In this model, Alice does the same thing she was doing before — she sends her stake to the Ethereum protocol and gets rewards for participating in consensus. Now we have a new protocol — call it "Retheum" — which Alice restakes to. The important thing here is she's using the same tokens that she's staking in the Ethereum protocol to secure this second protocol.

She gets rewards for that. This seems great — Alice now has double the reward potentially for the same amount of stake. But the risk is that the capital she has staked in both protocols is now encumbered by both protocols' rules. If Alice misbehaves in Ethereum, she can lose her capital by being slashed. If she misbehaves in "Retheum," she can also get slashed. With additional yield comes additional responsibilities — protocol behaviors that are mandated and punishable in further ways if you encumber your staking token across many different protocols.

#### Delegated native restaking (8:28) {#delegated-native-restaking-828}

The second version is delegated restaking with native ETH. Alice is staking with Ethereum, and now she wants to use Bob to delegate her stake to the "Retheum" protocol. She delegates to Bob, Bob restakes, the protocol issues rewards to Bob, and Bob issues the rewards less fees to Alice.

Under this model, the 32 ETH in the Ethereum protocol is accountable for the actions of both Alice and Bob — two people who could potentially get this ETH slashed. The token is encumbered by two different sets of protocol rules.

**Audience question:** When you stake ETH in the Ethereum protocol, the protocol has to give you something that you then present — what is that something?

In this native version, Alice stakes and has what's called a withdrawal credential from the Ethereum ecosystem. That withdrawal credential can be pointed to a contract on Ethereum which handles the second layer of staking. It's a contract that controls the assets when you withdraw them from Ethereum — it's like trustless custody in the smart contract that enforces the second layer of slashing penalties.

Why is this called "native?" Because Alice is still interacting directly with Ethereum — her stake is the 32 ETH she owns, used to secure the Ethereum consensus layer.

#### Non-native restaking (10:57) {#non-native-restaking-1057}

Self-restaking in the non-native setting: Alice is interacting with only the "Retheum" protocol. She's not running a node on Ethereum. She restakes — though I put "re" in quotes because she's not really restaking, it's staking in the first place. The only reason it's called restaking is because this takes place through a protocol that also facilitates other types of restaking.

She takes non-native tokens — this could be USDC, a euro stablecoin, wrapped Bitcoin, whatever — she provides it as economic security and Sybil resistance to the protocol and earns rewards. This is redefining restaking as a marketplace for decentralized trust, where trust refers to the economic value of the capital at risk.

Delegated restaking with non-native tokens follows the same pattern — Alice delegates through Bob and receives rewards less fees.

#### Slashing and restaking (13:55) {#slashing-and-restaking-1355}

Before we get into liquidity, let's talk about slashing. In the normal slashing mode, Alice is staking in the Ethereum protocol. If she does something that the protocol sees as wrong — for example, an equivocation, where she uses her cryptographic key to sign two pieces of information that are in conflict with each other — that is an objective fault. Everyone can verify both signatures were signed by Alice, and that is sufficient proof to slash her tokens.

How does restaking and slashing interact? In the simplest version — self-restaking with the native asset — Alice stakes to Ethereum and also restakes through "Retheum." If Alice continues to do her job on the "Retheum" protocol but equivocates on Ethereum, now we have a problem: she's slashed on Ethereum, but "Retheum" hasn't seen anything attributable to her that's wrong according to their rules. There has to be some communication between the two protocols.

This direction of communication is actually quite easy because "Retheum" is a smart contract on Ethereum — it can read from the Ethereum state and say "this validator has been slashed according to Ethereum," so on the second-order protocol, Alice is slashed as well.

The other direction is harder. If Alice gets slashed on the restaking platform, Ethereum would need to be informed. But Ethereum is intentionally oblivious to everything happening on its contract layer in terms of the consensus mechanism.

**Audience question:** Why would that matter? Ethereum needs the stake for what it does, but the restake amount is a derivative of the original.

The issue is that if Alice gets slashed on the restaking platform, she doesn't actually own that stake anymore. She can do whatever she wants on the Ethereum protocol with no actual capital at risk — which is the whole point of having stake in the first place. It's like you were using money for two things, it disappeared on one thing, and the other thing has to become aware that money is no longer yours. It still has economic value in some sense, but you don't control it — so you don't care what happens to it because it's already gone.
