---
title: Ethereum Energy Consumption
description: The basic information you need to understand Ethereum's energy consumption.
lang: en
sidebar: true
---

# Ethereum energy consumption {#introduction}

[The Merge](/upgrades/merge/index.md) from [proof-of-work (PoW)](/developers/docs/consensus-mechanisms/#proof-of-work) to [proof-of-stake (PoS)](/developers/docs/consensus-mechanisms/pos) will reduce Ethereum's energy consumption by [~99.95%](https://blog.ethereum.org/2021/05/18/country-power-no-more/). After the Merge Ethereum will use dramatically less carbon to be more secure.

Since inception, Ethereum has aimed to implement a PoS consensus mechanism, but doing this without sacrificing security and decentralization has taken years of focused research and development. Therefore, the network started by using PoW consensus. PoW consensus requires miners to use their computing hardware to solve a puzzle. The solution to this puzzle acts as proof that some energy has been expended by the miner which in turn demonstrates that they have invested some real-world value for the right to add to the blockchain. PoW is just a mechanism to decide who gets to add the next block, as is PoS. Swapping PoW for PoS, where the real world value invested comes from ether staked directly in a smart contract, removes the need for miners to burn energy to add to the blockchain. Therefore, the environmental cost of securing the network is drastically reduced.

## The Merge {#the-merge}

A PoS blockchain known as the "Beacon Chain" has been running since November 2020 alongside the PoW Ethereum Mainnet. In 2022 several custom devnets have been merged with their own Beacon Chains to aid in debugging Ethereum clients in advance of the real merge. More recently, Ethereum developers have started merging public testnets (Kiln, Kintsugi, Ropsten) and shadow-forks (forks of Ethereum Mainnet) as the final stage of testing. Merging Ethereum Mainnet with the Beacon Chain is expected to happen in the second half of 2022. At the moment of the merge, Ethereum's PoW mining will be switched off, PoS consensus will take over, and the energy consumed by the network will drop to <0.05% of its pre-merge amount.

## Why proof-of-stake is greener than proof-of-work {#why-pos-is-greener-than-pow}

PoW is a robust way to secure the network. Transactions on the Ethereum blockchain are validated by [miners](/developers/docs/consensus-mechanisms/pow/mining). Miners bundle together transactions into ordered blocks and add them to the Ethereum blockchain. The new blocks get broadcast to all the other node operators who run the transactions independently and verify that they are valid. Any dishonesty shows up as an inconsistency between different nodes. Honest blocks are added to the blockchain and become an immutable part of history.
The ability for any miner to add new blocks only works if there is a cost associated with mining and unpredictability about which specific node submits the next block. These conditions are met by imposing PoW. To be eligible to submit a block of transactions, a miner must be the first to submit the solution to a computationally expensive puzzle. To successfully take control of the blockchain, a dishonest miner would have to consistently win the PoW race by investing in sufficient hardware and energy to outperform the majority of other miners.

This mechanism of securing the network is problematic for several reasons. Miners can increase their odds of success by investing in more and more powerful hardware, creating conditions for an arms race with miners acquiring increasingly power-hungry mining equipment. This increases the network's energy consumption and generates hardware waste. Ethereum's PoW protocol currently has a total annualized power consumption approximately equal to that of Finland <sup>[^1]</sup> and carbon footprint similar to Switzerland<sup>[^1]</sup>.

PoS uses validators instead of miners. Validators perform the same function as miners except that instead of expending their assets up-front in the form of energy expenditure, they stake ETH as collateral against dishonest behavior. This staked ether can be destroyed if the validator misbehaves, with more severe penalties for more nefarious actions. This strongly incentivizes active and honest participation in securing the network without requiring large energy expenditure. Since almost all of the energy expended securing the PoW network comes from the mining algorithm, switching to PoS reduces the energy expenditure dramatically. There is also no benefit to be had by investing in more powerful hardware under PoS, so there is no arms-race condition and less electronic waste. Ethereum validators can run on normal laptops or even low-power devices such as [Raspberry Pi](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/user-guide/ethereum2.0.html).

Read more detailed information about [how PoS is implemented in Ethereum](/developers/docs/consensus-mechanisms/pos) and how it compares to PoW.

## Proof-of-stake energy expenditure {#proof-of-stake-energy}

Estimates based on the current Beacon Chain suggest that the merge to PoS could result in a 99.95% reduction in total energy use, with PoS being ~2000x more energy-efficient than PoW. The energy expenditure of Ethereum will be roughly equal to the cost of running a modest laptop for each node on the network.

Many articles estimate "per-transaction" energy expenditure to compare blockchains to other industries. The benefit of this is that it is easy to understand, but the energy required to mine a block is independent of the number of transactions within it. A per transaction unit of energy expenditure implies that fewer transactions would lead to smaller energy expenditure, and vice-versa, which is not the case. A per-transaction estimate is highly dependent upon how a blockchain's transaction throughput is defined, and tweaking this definition can be gamed to make the value seem larger or smaller.

For example, for Ethereum the transaction throughput is not only that of the base layer - it is also the sum of the transaction throughput of all of its “[layer 2](/layer-2/)” rollups, which are not generally included in calculations and would drastically reduce them. This is why tools that compare energy consumption per transaction across platforms are misleading.

More relevant is the overall energy consumption and carbon footprint of the network as a whole. From those values one can examine what that network offers to its users and to society at large and make a more holistic evaluation of whether that energy expenditure is justified or not. Per transaction measurements, on the other hand, imply the value of the network only comes from its role in transferring crypto between accounts and prohibit an honest cost-benefit analysis.

Whole-network energy consumption and carbon footprints for Bitcoin and Ethereum are estimated at [Digiconomist](https://digiconomist.net/ethereum-energy-consumption). At the time of writing this article Ethereum’s total energy consumption is ~112 TWh/yr, equivalent to that of the Netherlands, with a Carbon emission equivalent to that of Singapore (53 MT/yr). For comparison, Bitcoin currently expends about 200 TWh/yr energy and emits about 100 MT/yr C, while also generating about 32,000 T of electrical waste from obsolete hardware per year. Switching off Ethereum’s PoW in favor of PoS will reduce this energy expenditure by more than 99.95%, implying that the total energy expenditure for securing Ethereum is expected to be closer to **0.01 TWh/yr**.

To put this in context we can compare to annualized estimates for other industries. If we take Ethereum to be a platform for securely holding digital assets as investments, perhaps we can compare to mining gold, which has been estimated to expend about [240 TWh/yr](https://www.kitco.com/news/2021-05-17/Gold-s-energy-consumption-doubles-that-of-bitcoin-Galaxy-Digital.html). As a digital payments platform we could perhaps compare to PayPal (about [0.26 TWh/yr](https://app.impaakt.com/analyses/paypal-consumed-264100-mwh-of-energy-in-2020-24-from-non-renewable-sources-27261)). As an entertainment platform we could perhaps compare to the gaming industry which has been estimated to expend about [34 TW/yr](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential), or Netflix which expends about [94 TWh/yr](https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix), or Youtube which has been estimated to expend about [244 TWh/yr](https://thefactsource.com/how-much-electricity-does-youtube-use/). Estimates of Youtube’s energy expenditure have even been broken down by channel and even further by individual videos. [Those estimates](https://thefactsource.com/how-much-electricity-does-youtube-use/) imply that at least 45x more energy was expended watching Gangnam Style in 2019 than will be expended in a year of securing PoS Ethereum.

## A greener Ethereum {#green-ethereum}

While Ethereum's energy consumption has historically been substantial, there has been a major investment of developer time and intellect into transitioning from energy-hungry to energy-efficient block production. To quote [Bankless](http://podcast.banklesshq.com/), the best way to reduce the energy consumed by PoW is simply to "turn it off", which is the approach Ethereum has committed to take. At the same time, there is a substantial, growing and highly active "ReFi" (Regenerative Finance) community building on Ethereum. ReFi refers to applications that use DeFi components to build financial applicatiosn that have positive externalities benfiting the environment. This is part of a wider "Solarpunk" movement that is closely aligned with Ethereum and aims to couple technological advancement and environmental stewardship. The decentralized, permissionless, composable nature of Ethereum makes it the ideal base layer for the ReFi and solarpunk communities. After the merge, the technology and philosophy of Ethereum will finally reconcile and Ethereum should become an overall environmentally-positive technology.

<InfoBanner emoji=":evergreen_tree:">
  If you think these stats are incorrect or can be made more accurate, please raise an issue or PR. These are estimates by the ethereum.org team made using publicly accessible information and the current Ethereum roadmap. These statements don't represent an official promise from the Ethereum Foundation. 
</InfoBanner>

## Further reading {#further-reading}

- [A country's worth of power, no more](https://blog.ethereum.org/2021/05/18/country-power-no-more/) – _Carl Beekhuizen, May 18 2021_
- [Ethereum's energy consumption](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)
- [Ethereum Emissions: A Bottom-up Estimate](https://kylemcdonald.github.io/ethereum-emissions/) _ Kyle McDonald_
- [Ethereum Energy Consumption Index](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) — *[@InsideTheSim](https://twitter.com/InsideTheSim)*

## Related topics {#related-topics}

- [Ethereum's vision](/upgrades/vision/)
- [The Beacon Chain](/upgrades/beacon-chain)
- [The Merge](/upgrades/merge/)
- [Sharding](/upgrades/beacon-chain/)
