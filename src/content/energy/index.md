---
title: Ethereum's Energy Consumption
description: TL;DR: Ethereum will use at least ~99.95% less energy post merge.
lang: en
sidebar: true
sidebarDepth: 1
---

# Ethereum's Energy Consumption {#ethereum-energy-consumption}

**TL;DR: Ethereum will use at least ~99.95% less energy post merge.**

Ethereum will be completing the transition to Proof-of-Stake in the upcoming months, which brings a myriad of improvements that have been theorized for years. But now that the Beacon chain has been running for a few months, we can actually dig into the numbers. One area that we’re excited to explore involves new energy-use estimates, as we end the process of expending a country’s worth of energy on consensus.

There aren’t any concrete statistics on energy consumption (or even what hardware is used) as of yet, so what follows is a ball-park estimation of the energy consumption of the future of Ethereum.

As many people are running multiple validators, we will use the number of unique addresses that made deposits as a proxy for how many servers are out there today. Many stakers could have used multiple eth1 addresses, but this largely cancels out against those with redundant setups.

At the time of writing, there are 140,592 validators from 16,405 unique addresses. Obviously this is heavily skewed by exchanges and staking services, so removing them leaves 87,897 validators assumed to be staking from home. As a sanity check, this implies that the average home-staker runs 5.4 validators which seems like a reasonable estimate to me.

## Power Requirements {power-requirements}

![](https://storage.googleapis.com/ethereum-hackmd/upload_5d69a63da0d4ebb6cc7b808b9a58e00f.png)

How much power does it take to run a beacon node (BN), 5.4 validator clients (VC), and an eth1 full-node? Using my personal setup as a base, it’s around 15 watt. Joe Clapis (a Rocket Pool dev) recently ran 10 VCs, a Nimbus BN, and a Geth full node off of a 10Ah USB battery bank for 10 hours, meaning that this setup averaged 5W. It is unlikely that the average staker is running such an optimised setup, so let’s call it 100W all in.

Multiplying this with the 87k validators from before means that home-stakers consume ~1.64 megawatt. Estimating the power consumed by custodial stakers is a bit harder, they run tens of thousands of validator clients with redundancy and backups.

To make life easy, let’s also just assume that they use 100W per 5.5 validators. Based off of the staking infrustructure teams I have spoken to, this is a **gross** over-estimate. The real answer is something like 50x less (And if you are a custodial staking team consuming more than 5W/ validator hit me up, I’m sure I can help you out).

In total, a Proof-of-Stake Ethereum therefore consumes something on the order of 2.62 megawatt. This is not on the scale of countries, provinces, or even cities, but that of a small town (around 2100 American homes).

For reference, Proof-of-Work (PoW) consensus on Ethereum currently consumes the energy equivalent of a medium-sized country, but this is actually necessary to keep a PoW chain safe. As the name suggests, PoW reaches consensus based off of which fork has the most “work” done on it. There are two ways to increase the rate of “work” being done, increase the efficiency of mining hardware and using more hardware at the same time. To prevent a chain from being successfully attacked, miners must be doing “work” at a rate greater than an attacker could. As an attacker is likely to have similar hardware, miners must keep large amounts of efficient hardware running to prevent an attacker from out-mining them and all this hardware uses a lot of power.

Under PoW, as the price of ETH and the hashrate are positively correlated. Therefore, as as the price increases, in equilibrium so too does the power consumed by the network. Under Proof-of-Stake, when the price of ETH increases, the security of the network does too (the value of the ETH at-stake is worth more), but the energy requirements remain unchanged.

## Some Comparisons {comparisons}

[Digiconomist estimates](https://digiconomist.net/ethereum-energy-consumption/) that Ethereum miners currently consume 44.49 TWh per year which works out to 5.13 gigawatt on a continuing basis. This means that PoS is ~2000x more energy efficient based on the conservative estimates above, which reflects a reduction of at least 99.95% in total energy use.

If energy consumption per-transaction is more your speed, that’s ~35Wh/tx (avg ~60K gas/tx) or about 20 minutes of TV. By contrast, Ethereum PoW uses the equivalent energy of a house for 2.8 days per transaction and Bitcoin consumes 38 house-days worth.

![](https://storage.googleapis.com/ethereum-hackmd/upload_886e58d3609b2541ae71feace1bbe2d3.png)

## Looking Forward {looking-forward}

While Ethereum continues to use PoW for now, that won’t be the case for much longer. In the past few weeks, [we have seen](https://twitter.com/protolambda/status/1388093066993668098) the emergence of the first testnets for _The Merge_, the name given to the moment Ethereum switches to from PoW to PoS. Several teams of engineers are working overtime to ensure that _The Merge_ arrives as soon as possible, and without compromising on safety.

Scaling solutions (such as rollups and sharding) will help further decrease the energy consumed per-transaction by leveraging economies of scale.

Ethereum’s power-hungry days are numbered, and hopefully that’s true for the rest of the industry too.

_This article was adapted from Ethereum researcher Carl Beekhuizen's [blog post](https://blog.ethereum.org/2021/05/18/country-power-no-more/) on the topic_
