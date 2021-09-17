---
title: Ethereum Energy Consumption
description: The basic information you need to understand Ethereum's energy consumption.
lang: en
sidebar: true
---

# Introduction to Ethereum's Energy Consumption {#introduction-to-ethereum-energy-consumption}

Ethereum is now on the cusp of becoming a truly low-carbon blockchain. Achieving this without sacrificing decentralization has been a major technical challenge for Ethereum developers. This page will explain why building out Ethereum to its current state has required a significant upfront carbon cost and how this will be remediated in future ugrades.

## Energy secures the network {energy-secures-the-network}

Transactions on the Ethereum blockchain are validated by [miners](/developers/docs/consensus-mechanisms/pow/mining). Miners bundle together transactions into ordered blocks and add them to the Ethereum blockchain. The new blocks are broadcast to all the other node operators who run the transactions independently and verify that they are valid. Any dishonesty shows up as an inconsistency between different nodes. Honest blocks are added to the blockchain and become an immutable part of history.

This only works if there is a cost associated with mining and some unpredictability about which specific node submits the next block. These conditions are met by imposing [proof-of-work](/developers/docs/consensus-mechanisms/pow/) (PoW). To be eligible to submit a block of transactions a miner must solve an arbitrary computational puzzle faster than any other miner. This creates competition between miners and cost in the form of energy expenditure. In order to successfully defraud the blockchain, a dishonest miner would have to consistently win the PoW race which is both very unlikely and prohibitively expensive. PoW is therefore a way to secure the network.

Ethereum has implemented the PoW protocol since its inception. While migration away from PoW has always been a fundamental goal of Ethereum, it has also arguably been the most philosophically and technologically challenging because the viable alternatives all required some compromise in one of Ethereum's core principles.

## PoW energy expenditure

PoW is a very robust way to secure the against dishonest changes to the blockchain, but it is problematic for several reasons. Since the right to mine a block requires solving a computational puzzle, miners can increase their odds of success by investing in more powerful hardware, leading to an arms race of increasingly expensive and power-hungry mining equipment. Ethereum's PoW protocol currently consumes as much energy as a medium-sized country.

## PoS

A greener future for Ethereum is already being built in the form of a proof-of-stake (PoS) chain. Under proof-of-stake, arbitrary puzzle-solving is unnecessary. This drastically reduces the energy expenditure required to secure the network. Miners get replaced by validators who perform the same function except that instead of expending their assets up-front in the form of computational work, they stake ETH as collateral against dishonest behaviour. If the validator's node is non-responsive or a fraudulent block gets submitted to the chain, the staked assets can be "slashed", strongly incentivizing honesty and securing the network.

Similarly to proof-of-work, to maintain a fraudulent blockchain, a validator would require 51% of the total ETH staked in the network. However, unlike proof-of-work, consensus is not based on the longest chain, but a mechanism known as ["Casper"](https://arxiv.org/abs/1710.09437). Migrating from proof-of-work to proof-of-stake eliminates the need to expend energy on arbitrary computations.

## The merge

There is now a functional proof-of-stake chain called the [Beacon Chain]("https://ethereum.org/en/eth2/beacon-chain/") that has been running since December 2020 that is demonstrating the viability of the proof-of-stake protocol. The merge refers to the point in time when Ethereum leaves proof-of-work behind and fully adopts proof-of-stake. The merge is expected to happen ~Q4 2021/Q1 2022.

## PoS energy expenditure

As well as building confidence in the PoS mechanism, the Beacon Chain also enables estimates of Ethereum's post-merge energy usage. A recent [blog post on this site](https://blog.ethereum.org/2021/05/18/country-power-no-more/) suggested that the merge to PoS could result in a 99.95% reduction in total energy use, with PoS being ~2000x more efficient than PoW. The energy-expenditure of Ethereum will be roughly equal to the cost of running a home computer for each node on the network.

![image](energy_use_per_transaction.png)

We can use this data to compare Ethereum to a global service like Visa. 100,000 Visa transactions uses 149kWh of energy<sup>[^2]</sup>. Assuming sharding has been implemented, Ethereum's current transaction rate (15 transactions per second) will be increased by at least 64x (the number of shards) not accounting for additional optimisation from rollups. A realistic estimate for post-merge, sharded Ethereum with rollups is [25000 - 100000](https://twitter.com/VitalikButerin/status/1312905884549300224?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1312905886327664640%7Ctwgr%5E%7Ctwcon%5Es2_&ref_url=https%3A%2F%2Fwww.coinspeaker.com%2Fvitalik-buterin-ethereum-layer-2%2F) transactions per second. We can use this information to estimate a maximum and minimum energy expenditure per 100,000 transactions.

- 25000 transactions per second.
- `100,000 / 25000 = 4` seconds to process 100,000 transactions.

We can also estimate Ethereum's energy expenditure per second, making a conservative estimate that there are 200,000 active validators securing the network:

`1.44kWh daily usage * 200,000 network nodes = 288,000kWh` per day.
There are 86,400 seconds in a day, so `288,000 / 86,400 = 3.3333 kWh` per second.

If we multiply that by the amount of time it takes to process 100,000 transaction: `3.333 * 4 = 13.333 kWh`.

This is ~9% of the energy used by Visa for the same number of transactions, or a reduction in energy expenditure by a factor of ~11.

Repeating the calculation with the maximum transactions-per-second yields 3.33 kWh per second which is about 2% of the energy expenditure of Visa, or a reduction of ~49x.

_We’ve provided the basic comparison to Visa to baseline your understanding of post-merge Ethereum energy consumption against a familiar name. However, in practice, it’s not really correct to compare based on number of transactions. Ethereum’s energy output is time-based. If Ethereum did more or less transactions from one minute to the next, the energy output would stay the same._

_It’s also important to remember that Ethereum does more than just financial transactions, it’s a platform for applications, so a fairer comparison might be to many companies/industries including Visa, AWS and more!_

## Summary

While Ethereum's energy consumption has historically been substantial, there has been major investment of developer time and intellect into transitioning from energy-hungry to energy-efficient block validation. To quote [Bankless](http://podcast.banklesshq.com/) the best way to conserve the energy being burned by PoW is simply to "turn it off", which is the approach Ethereum has committed to take.

<InfoBanner emoji=":evergreen_tree:">
  If you think these stats are incorrect or can be made more accurate, please raise an issue or PR. These are estimates by the ethereum.org team made using publicly accessible information and the current Ethereum roadmap. This doesn't represent an official promise from the Ethereum Foundation. 
</InfoBanner>
