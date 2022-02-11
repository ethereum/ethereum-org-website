---
title: Ethereum Energy Consumption
description: The basic information you need to understand Ethereum's energy consumption.
lang: en
sidebar: true
---

# Ethereum energy consumption {#introduction}

Ethereum's current energy expenditure with [proof-of-work](/developers/docs/consensus-mechanisms/#proof-of-work) is too high and unsustainable. Resolving energy expenditure concerns without sacrificing security and decentralization is a significant technical challenge and has been a focus of research and development for years. Let's explore why building Ethereum has had a high environmental impact and how the upcoming network upgrade to [proof-of-stake](/developers/docs/consensus-mechanisms/pos) will dramatically change this.

## Energy secures the network {#energy-secures-the-network}

Transactions on the Ethereum blockchain are validated by [miners](/developers/docs/consensus-mechanisms/pow/mining). Miners bundle together transactions into ordered blocks and add them to the Ethereum blockchain. The new blocks get broadcast to all the other node operators who run the transactions independently and verify that they are valid. Any dishonesty shows up as an inconsistency between different nodes. Honest blocks are added to the blockchain and become an immutable part of history.

The ability for any miner to add new blocks only works if there is a cost associated with mining and unpredictability about which specific node submits the next block. These conditions are met by imposing proof-of-work (PoW). To be eligible to submit a block of transactions, a miner must solve an arbitrary computational puzzle faster than any other miner. Solving this puzzle creates competition between miners and costs in the form of energy expenditure. To successfully defraud the blockchain, a dishonest miner would have to consistently win the proof-of-work race, which is very unlikely and prohibitively expensive.

Ethereum has used proof-of-work since genesis. Migrating off of proof-of-work and onto proof-of-stake has always been a fundamental goal of Ethereum. However, developing a proof-of-stake system that adheres to Ethereum's core principles of security and decentralization is not trivial. It has required a lot of research and breakthroughs in cryptography, cryptoeconomics, and mechanism design to get to a point where the transition is possible.

## Proof-of-work energy expenditure {#proof-of-work}

Proof-of-work is a robust way to secure the network and enforce honest changes to the blockchain, but it is problematic for several reasons. Since the right to mine a block requires solving an arbitrary computational puzzle, miners can increase their odds of success by investing in more powerful hardware. These incentives cause an arms race with miners acquiring increasingly power-hungry mining equipment. Ethereum's proof-of-work protocol currently has a total annualized power consumption approximately equal to that of Finland <sup>[^1]</sup> and carbon footprint similar to Switzerland<sup>[^1]</sup>.

## Proof-of-stake {#proof-of-stake}

A greener future for Ethereum is already being built in the form of a [**proof-of-stake (PoS)** chain](/upgrades/beacon-chain/). Under [proof-of-stake](/developers/docs/consensus-mechanisms/pos/), arbitrary puzzle-solving is unnecessary. Removing puzzle-solving drastically reduces the energy expenditure required to secure the network. Miners get replaced by validators who perform the same function except that instead of expending their assets up-front in the form of computational work, they stake ETH as collateral against dishonest behavior. If the validator is lazy (offline when they are supposed to fulfill some validator duty) their staked ETH can slowly leak away, while provably dishonest behavior results in the staked assets being "slashed". This strongly incentivizes active and honest participation in securing the network.

Similarly to proof-of-work, a malicious entity would require at least 51% of the total ETH staked in the network to execute a [51% attack](/glossary/#51-attack). However, unlike on proof-of-work, where the potential loss of a failed attack is only the cost of generating the hash power needed to mine, on proof-of-stake, the possible loss of an attack is the entire amount of ETH used as collateral. This disincentive structure allows for network security with proof-of-stake while eliminating the need to expend energy on arbitrary computations. Detailed explanations of the network security under proof-of-stake can be found [here](/developers/docs/consensus-mechanisms/pos/) and [here](https://vitalik.ca/general/2017/12/31/pos_faq.html).

## The Merge {#the-merge}

There is a functional proof-of-stake chain called the [Beacon Chain](/upgrades/beacon-chain/) that has been running since December 2020 that is demonstrating the viability of the proof-of-stake protocol. The Merge refers to the point in time when Ethereum leaves proof-of-work behind and fully adopts proof-of-stake. The Merge is expected to happen ~Q2 2022. [More on The Merge](/upgrades/merge/).

## Proof-of-stake energy expenditure {#proof-of-stake-energy}

As well as building confidence in the proof-of-stake mechanism, the Beacon Chain also enables estimates of Ethereum's post-merge energy usage. A [recent estimate](https://blog.ethereum.org/2021/05/18/country-power-no-more/) suggested that The Merge to proof-of-stake could result in a 99.95% reduction in total energy use, with proof-of-stake being ~2000x more energy-efficient than proof-of-work. The energy expenditure of Ethereum will be roughly equal to the cost of running a home computer for each node on the network.

![image](energy_use_per_transaction.png)

<p style="text-align: center;"><small><i>Estimate of PoW energy consumption per tx used in figure based on <a href="https://blog.ethereum.org/2021/05/18/country-power-no-more/" target="_blank" rel="noopener noreferrer">May 2021 data</a>, at time of writing the same source suggested up to <a href="https://digiconomist.net/ethereum-energy-consumption" target="_blank" rel="noopener noreferrer">175.56 Kwh</a></i></small></p>

Let's compare these numbers to a service such as Visa. 100,000 Visa transactions uses 149kWh of energy<sup>[^2]</sup>. Assuming sharding has been implemented, Ethereum's current transaction rate (15 transactions per second) will be increased by at least 64x (the number of shards), not accounting for additional optimization from rollups. A realistic estimate for post-merge, sharded Ethereum with rollups is [25,000 - 100,000](https://twitter.com/VitalikButerin/status/1312905884549300224?s=20) transactions per second. We can use this information to estimate maximum and minimum energy expenditure per 100,000 transactions.

- 25,000 transactions per second.
- `100,000 / 25,000 = 4` seconds to process 100,000 transactions.

We can also estimate Ethereum's energy expenditure per second, making a conservative estimate that 10,000 active validators are securing the network (there are over [250,000 validators on the Beacon Chain](https://beaconscan.com/) at the moment, but many validators can operate on a single node. Currently, there are estimated to be 3,000-4,000 individual nodes, so 10,000 is a conservative estimate for post-merge):

`1.44kWh daily usage * 10,000 network nodes = 14,400kWh` per day.
There are 86,400 seconds in a day, so `14,400 / 86,400 = 0.1667 kWh` per second.

If we multiply that by the amount of time it takes to process 100,000 transaction: `0.1667 * 4 = 0.667 kWh`.

This is ~0.4% of the energy used by Visa for the same number of transactions, or a reduction in energy expenditure by a factor of ~225 compared to Ethereum's current proof-of-work network.

Repeating the calculation with the maximum transactions-per-second yields 0.1667 kWh per second which is about 0.1% of the energy expenditure of Visa, or a reduction of ~894x.

_Note: it's not entirely accurate to compare based on number of transactions as Ethereum's energy usage is time-based. The energy usage of Ethereum is the same in 1 minute regardless if it does 1 or 1,000 transactions._

_We must also consider that Ethereum isn't limited to simple financial transactions but is also a complete platform built for smart contracts and decentralized applications._

## A greener Ethereum {#green-ethereum}

While Ethereum's energy consumption has historically been substantial, there has been a major investment of developer time and intellect into transitioning from energy-hungry to energy-efficient block validation. To quote [Bankless](http://podcast.banklesshq.com/), the best way to reduce the energy consumed by proof-of-work is simply to "turn it off", which is the approach Ethereum has committed to take.

<InfoBanner emoji=":evergreen_tree:">
  If you think these stats are incorrect or can be made more accurate, please raise an issue or PR. These are estimates by the ethereum.org team made using publicly accessible information and the current Ethereum roadmap. These statements don't represent an official promise from the Ethereum Foundation. 
</InfoBanner>

## Further reading {#further-reading}

- [A country's worth of power, no more](https://blog.ethereum.org/2021/05/18/country-power-no-more/) – _Carl Beekhuizen, May 18 2021_
- [Ethereum Emissions: A Bottom-up Estimate](https://kylemcdonald.github.io/ethereum-emissions/) _ Kyle McDonald_
- [Ethereum Energy Consumption Index](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) — *[@InsideTheSim](https://twitter.com/InsideTheSim)*

## Related topics {#related-topics}

- [Ethereum's vision](/upgrades/vision/)
- [The Beacon Chain](/upgrades/beacon-chain)
- [The Merge](/upgrades/merge/)
- [Sharding](/upgrades/beacon-chain/)

### Footnotes and sources {#footnotes-and-sources}

#### 1. Ethereum proof-of-work energy consumption {#fn-1}

[Energy Consumption by Country inc. Ethereum (Annualized TWh)](https://digiconomist.net/ethereum-energy-consumption)

#### 2. Visa energy consumption {#fn-2}

[Bitcoin network average energy consumption per transaction compared to VISA network as of 2020, Statista](https://www.statista.com/statistics/881541/bitcoin-energy-consumption-transaction-comparison-visa/)

[Visa financials report Q4 2020](https://s1.q4cdn.com/050606653/files/doc_financials/2020/q4/Visa-Inc.-Q4-2020-Operational-Performance-Data.pdf)
