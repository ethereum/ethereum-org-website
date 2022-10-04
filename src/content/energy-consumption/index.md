---
title: Ethereum Energy Consumption
description: The basic information you need to understand Ethereum's energy consumption.
lang: en
---

# Ethereum energy consumption {#introduction}

Ethereum is a green blockchain. It uses a [proof-of-stake](/developers/docs/consensus-mechanisms/pos) consensus mechanism that can be run on low-powered devices and does not require heavy computation to participate. Ethereum's proof-of-stake mechanism secures the network by using staked ETH rather than expended energy, like in [proof-of-work](/developers/docs/consensus-mechanisms/pos). The switch to proof-of-stake means the energy expended by the Ethereum network is relatively small - on the order of 0.01 TWh/yr.

## Proof-of-stake energy expenditure {#proof-of-stake-energy}

The energy expenditure of Ethereum is roughly equal to the cost of running a modest laptop for each node on the network.

Many articles estimate "per-transaction" energy expenditure to compare blockchains to other industries. The benefit of this is that it is easy to understand. However, transaction-based estimates can be misleading because the energy required to propose and validate a block is independent of the number of transactions within it. A per transaction unit of energy expenditure implies that fewer transactions would lead to smaller energy expenditure and vice-versa, which is not the case. A per-transaction estimate is highly dependent upon how a blockchain's transaction throughput is defined, and tweaking this definition can be gamed to make the value seem larger or smaller.

For example, on Ethereum, the transaction throughput is not only that of the base layer - it is also the sum of the transaction throughput of all of its "[layer 2](/layer-2/)" rollups, which are not generally included in calculations and would drastically reduce them. This is one reason why tools that compare energy consumption per transaction across platforms are misleading.

More relevant is the overall energy consumption and carbon footprint of the network as a whole. From those values, we can examine what that network offers to its users and society at large and make a more holistic evaluation of whether that energy expenditure is justified or not. Per transaction measurements, on the other hand, imply the value of the network only comes from its role in transferring crypto between accounts and prohibits an honest cost-benefit analysis.

[Digiconomist provides whole-network energy consumption and carbon footprints for Bitcoin and Ethereum](https://digiconomist.net/ethereum-energy-consumption). At the time of writing this article, Bitcoin expends about 200 TWh/yr of energy and emits about 100 MT (megatons) of carbon per year, while generating about 32,000 T of electrical waste from obsolete hardware annually. In comparison, the total energy expenditure for securing Ethereum is closer to **0.01 TWh/yr**.

<EnergyConsumptionChart />

The figure above shows the estimated annual energy consumption in TWh/yr for various industries (retrieved in June 2022).
_Note that the estimates presented in the plot are from publicly available sources that have been linked to in the text below. They are
illustrative and do not represent an official estimate, promise or forecast._

To put Ethereum's energy consumption in context, we can compare annualized estimates for other industries. Taking Ethereum to be a platform for securely holding digital assets as investments, perhaps we can compare to mining gold, which has been estimated to expend about [240 TWh/yr](https://www.kitco.com/news/2021-05-17/Gold-s-energy-consumption-doubles-that-of-bitcoin-Galaxy-Digital.html). As a digital payments platform we could perhaps compare to PayPal (estimated to consume about [0.26 TWh/yr](https://app.impaakt.com/analyses/paypal-consumed-264100-mwh-of-energy-in-2020-24-from-non-renewable-sources-27261)). As an entertainment platform we could perhaps compare to the gaming industry which has been estimated to expend about [34 TW/yr](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential) _in the United States alone_. Estimates of energy consumption by Netflix range dramatically between [about 0.45TWhr/yr](https://s22.q4cdn.com/959853165/files/doc_downloads/2020/02/0220_Netflix_EnvironmentalSocialGovernanceReport_FINAL.pdf) (their own estimates reported in 2019) up to about 94 TWh/yr (as estimated by [Shift Project](https://theshiftproject.org/en/article/unsustainable-use-online-video/)) - there is some discussion about the assumptions underlying these estimates available on [Carbon Brief](https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix). Alternatively, Ethereum could be compared to Youtube which has been estimated to expend about [244 TWh/yr](https://thefactsource.com/how-much-electricity-does-youtube-use/), although these values depend a lot on the type of device videos are streamed on and the energy-efficiency of underlying infrastructure such as data centers. Estimates of YouTube's energy expenditure have been broken down by channel and individual videos. [Those estimates](https://thefactsource.com/how-much-electricity-does-youtube-use/) imply that people consumed 45 times more energy watching Gangnam Style in 2019 than proof-of-stake Ethereum uses in a year.

## A green application layer {#green-applications}

While Ethereum's energy consumption is very low, there is also a substantial, growing, and highly active **regenerative finance (ReFi)** community building on Ethereum. ReFi applications use DeFi components to build financial applications that have positive externalities benefiting the environment. ReFi is part of a wider ["solarpunk"](https://en.wikipedia.org/wiki/Solarpunk) movement that is closely aligned with Ethereum and aims to couple technological advancement and environmental stewardship. The decentralized, permissionless, composable nature of Ethereum makes it the ideal base layer for the ReFi and solarpunk communities. Through the development of these (and others, e.g. [DeSci](/desci/)), Ethereum is becoming an environmentally and socially-positive technology.

## Ethereum's carbon debt {#carbon-debt}

Ethereum's current energy expenditure is very low, but this has not always been the case. Ethereum switched on its proof-of-stake consensus mechanism in Q3 2022. However, Ethereum used a proof-of-work mechanism from 2014-2022, which had a much greater environmental cost.

Since its inception, Ethereum aimed to implement a proof-of-stake consensus mechanism, but doing so without sacrificing security and decentralization took years of focused research and development. Therefore, a proof-of-work mechanism was used to get the network started. Proof-of-work consensus requires miners to use their computing hardware to solve a puzzle, expending energy in the process. The solution to the puzzle proves that energy has been expended by the miner, demonstrating that they invested real-world value for the right to add to the blockchain. Ethereum's total energy consumption peaked during the apex of the crypto bull market in February 2022 at just under 94 TWh/yr. In the summer before the switch to proof-of-stake, the energy consumption was closer to 60 TWh/yr, comparable to that of Uzbekistan, with a carbon emission equivalent to that of Azerbaijan (33 MT/yr).

Both proof-of-work and proof-of-stake are just mechanisms to decide who gets to add the next block. Swapping proof-of-work for proof-of-stake, where the real-world value invested comes from ETH staked directly in a smart contract, removes the need for miners to burn energy to add to the blockchain. Therefore, the environmental cost of securing the network is drastically reduced.

## Why proof-of-stake is greener than proof-of-work {#why-pos-is-greener-than-pow}

Proof-of-work is a robust way to secure the network. Transactions on the Ethereum blockchain under the previous proof-of-work system were validated by [miners](/developers/docs/consensus-mechanisms/pow/mining). Miners bundled together transactions into ordered blocks and added them to the Ethereum blockchain. The new blocks got broadcast to all the other node operators who run the transactions independently and verify that they are valid. Any dishonesty showed up as an inconsistency between different nodes. Honest blocks were added to the blockchain and became an immutable part of history.
The ability for any miner to add new blocks only works if there is a cost associated with mining and unpredictability about which specific node submits the next block. These conditions are met by imposing proof-of-work. To be eligible to submit a block of transactions, a miner must be the first to submit the solution to a computationally expensive puzzle. To successfully take control of the blockchain, a dishonest miner would have to consistently win the proof-of-work race by investing in sufficient hardware and energy to outperform the majority of other miners.

This mechanism of securing the network is problematic for several reasons. First, miners would increase their odds of success by investing in more powerful hardware, creating conditions for an arms race with miners acquiring increasingly power-hungry mining equipment. This increased the network's energy consumption and generated hardware waste. Second, Ethereum's proof-of-work protocol (prior to transitioning to proof-of-stake) had a total annualized power consumption approximately equal to that of Finland <sup>[^1]</sup> and a carbon footprint similar to Switzerland<sup>[^1]</sup>.

Proof-of-stake uses validators instead of miners. Validators perform the same function as miners, except that instead of expending their assets up-front as energy expenditure, they stake ETH as collateral against dishonest behavior. This staked ETH can be destroyed if the validator misbehaves, with more severe penalties for more nefarious actions. This strongly incentivizes active and honest participation in securing the network without requiring large energy expenditure. Since almost all of the energy expended securing the proof-of-work network came from the mining algorithm, the switch to proof-of-stake dramatically reduced energy expenditure. There is also no benefit to be had by investing in more powerful hardware under proof-of-stake, so there is no arms-race condition and less electronic waste. Ethereum validators can run on typical laptops or low-power devices such as a [Raspberry Pi](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/index.html).

Read more on [how Ethereum implements proof-of-stake](/developers/docs/consensus-mechanisms/pos) and how it compares to proof-of-work.

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
