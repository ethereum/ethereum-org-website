---
title: Beacon Chain
description: Узнайте о Beacon Chain — обновлении, которое представило Ethereum с доказательством владения (Proof-of-Stake).
lang: ru
template: upgrade
sidebar: true
image: ../../../../../assets/upgrades/core.png
summaryPoint1: Сеть Beacon Chain ничего не меняет в том Ethereum, который мы используем сегодня.
summaryPoint2: Она ввела в экосистему Ethereum доказательство владения.
summaryPoint3: Она будет координировать работу сети, выступая в качестве уровня консенсуса.
summaryPoint4: It is an essential precursor to upcoming scaling upgrades, such as sharding.
---

<UpgradeStatus isShipped dateKey="page-upgrades-beacon-date">
  The Beacon Chain shipped on December 1, 2020. Чтобы узнать больше, <a href="https://beaconscan. com/">ознакомьтесь с данными</a>. Если вы хотите помочь с проверкой цепочки, вы можете <a href="/staking/">вложить свои ETH</a>.
</UpgradeStatus>

## Что делает Beacon Chain? {#what-does-the-beacon-chain-do}

The Beacon Chain is a ledger of accounts that conducts and coordinates the network of [stakers](/staking/). It isn't quite like the [Ethereum Mainnet](/glossary/#mainnet) of today. It does not process transactions or handle smart contract interactions.

It is a new consensus engine (or "consensus layer") that will soon take the place of proof-of-work mining, bringing many significant improvements with it.

The Beacon Chain's role will change over time, but it's a foundational component for [the secure, environmentally friendly and scalable Ethereum we’re working towards](/upgrades/vision/).

## Beacon Chain impact {#beacon-chain-features}

### Введение стейкинга {#introducing-staking}

The Beacon Chain introduced [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) to Ethereum. Это новый способ обеспечить безопасность работы Ethereum. Он взаимовыгоден для участников, делая Ethereum безопаснее и позволяя получать участникам ETH в процессе. In practice, staking involves you staking ETH in order to activate validator software. As a staker, you'll run node software that processes transactions and creates new blocks in the chain.

Staking serves a similar purpose to [mining](/developers/docs/mining/), but is different in many ways. Mining requires large up-front expenditures in the form of powerful hardware and energy consumption, resulting in economies of scale, and promoting centralization. Mining also does not come with any requirement to lock up assets as collateral, limiting the protocol's ability to punish bad actors after an attack.

The transition to proof-of-stake will make Ethereum significantly more secure and decentralized by comparison. The more people that participate in the network, the more decentralized and safe from attacks it becomes.

<InfoBanner emoji=":money_bag:">
  If you're interested in becoming a validator and helping secure the Ethereum, <a href="/staking/">learn more about staking</a>.
</InfoBanner>

### The Merge and the end of mining {#the-merge}

While the Beacon Chain (or "consensus layer") is already live, it has existed as a separate chain from Mainnet (or the "execution layer") since its genesis. The plan is to swap out the current proof-of-work algorithm on the execution layer today and replace it with the proof-of-stake consensus protocol that the Beacon Chain provides.

This process is known as **The Merge**, as it will 'merge' the new consensus layer with the existing execution layer and stop the use of mining.

The Merge will have an immediate and profound impact on the carbon footprint of the Ethereum network. It also sets the stage for future scalability upgrades such as sharding.

[Learn more about Ethereum energy consumption](/energy-consumption/)

[Learn more about The Merge](/upgrades/merge/)

### Setting up for sharding {#setting-up-for-sharding}

After Mainnet merges with the Beacon Chain, the next major upgrade will introduce sharding to the network.

Proof-of-stake has the advantage of having a registry of all approved block producers at any given time, each with ETH at stake. This registry sets the stage for the ability to divide and conquer but reliably split up specific network responsibilities.

This responsibility is in contrast to proof-of-work, where miners have no obligation to the network and could stop mining and turn their node software off permanently in an instant without repercussion. There is also no registry of known block proposers and no reliable way to split network responsibilities safely.

[Подробнее о шардинге](/upgrades/sharding/)

## Взаимосвязь между обновлениями {#relationship-between-upgrades}

Все обновления Ethereum в некоторой степени взаимосвязаны. Поэтому резюмируем, как Beacon Chain влияет на другие улучшения.

### Beacon Chain and The Merge {#merge-and-beacon-chain}

Сначала Beacon Chain будет существовать отдельно от основной сети Ethereum, которую мы используем сегодня. Но в конечном счете они будут связаны. План состоит в том, чтобы «объединить» основную сеть с системой доказательства владения, которая контролируется и координируется с помощью Beacon Chain.

<ButtonLink to="/upgrades/merge/">
  Слияние
</ButtonLink>

### Осколки и Beacon Chain {#shards-and-beacon-chain}

Sharding can only safely enter the Ethereum ecosystem with a proof-of-stake consensus mechanism in place. The Beacon Chain introduced staking, which when 'merged' with Mainnet will pave the way for sharding to help further scale Ethereum.

<ButtonLink to="/upgrades/sharding/">
  Цепочки-осколки
</ButtonLink>

<Divider />

## Взаимодействие с Beacon Chain {#interact-with-beacon-chain}

<BeaconChainActions />
