---
title: Ethereum Energy Consumption
description: The basic information you need to understand Ethereum's energy consumption.
lang: en
---

## Ethereum's energy expenditure {#proof-of-stake-energy}

Ethereum is a green blockchain. It uses a [proof-of-stake](/developers/docs/consensus-mechanisms/pos) consensus mechanism that uses ETH rather than [energy](/developers/docs/consensus-mechanisms/pow) to secure the network. Ethereum's proof-of-stake mechanism uses just [~0.0026 TWh/yr](https://carbon-ratings.com/eth-report-2022) across the entire global network.

[CCRI](https://carbon-ratings.com) (Crypto Carbon Ratings Institute) generated bottom-up estimates of the electricity consumption and the carbon footprint of the Ethereum network (see [the report](https://carbon-ratings.com/eth-report-2022)). They measured the electricity consumption of different nodes with various hardware and client software configurations. This yielded an estimate of **2.601 MWh** (0.0026 TWh) for the network’s annual electricity consumption (September 2022), which corresponds to yearly carbon emissions of **870 tonnes CO2e** applying regional specific carbon intensity factors.

<EnergyConsumptionChart />

The figure above shows the estimated annual energy consumption in TWh/yr for various industries (retrieved in June 2022).
_Note that the estimates presented in the plot are from publicly available sources that have been linked to in the text below. CEBCI refers to the Cambridge Bitcoin Electricity Consumption index. The values are illustrative and do not represent an official estimate, promise or forecast._

To put Ethereum's energy consumption in context, we can compare annualized estimates for other industries - this allows us to better understand whether 0.0026 TWh is a lot or a little.

Taking Ethereum to be a platform for creating and securely holding digital assets, perhaps we can compare to mining gold, which has been estimated to expend between about [130](https://ccaf.io/cbeci/index/comparisons) and [240 TWh/yr](https://www.kitco.com/news/2021-05-17/Gold-s-energy-consumption-doubles-that-of-bitcoin-Galaxy-Digital.html).

As a digital payments platform we could perhaps compare to PayPal (estimated to consume about [0.26 TWh/yr](https://app.impaakt.com/analyses/paypal-consumed-264100-mwh-of-energy-in-2020-24-from-non-renewable-sources-27261)). As an entertainment platform we could perhaps compare to the gaming industry which has been estimated to expend about [34 TW/yr](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential) _in the United States alone_. As a globally accessible data platform, it could be compared to global data centers that have been estimated to consume [200 TWh](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches).

Estimates of energy consumption by Netflix range dramatically between [about 0.45TWhr/yr](https://s22.q4cdn.com/959853165/files/doc_downloads/2020/02/0220_Netflix_EnvironmentalSocialGovernanceReport_FINAL.pdf) (their own self-reported estimates reported in 2019) up to about 94 TWh/yr (as estimated by [Shift Project](https://theshiftproject.org/en/article/unsustainable-use-online-video/)) - there is some discussion about the assumptions underlying these estimates available on [Carbon Brief](https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix).

Alternatively, Ethereum could be compared to Youtube which has been estimated to expend about [244 TWh/yr](https://thefactsource.com/how-much-electricity-does-youtube-use/), although the energy consumption depends a lot on the type of device videos are streamed on and the energy-efficiency of underlying infrastructure such as data centers - suitable values for these parameters are hard to estimate so there is substantial uncertainty.

Estimates of YouTube's energy expenditure have been broken down by channel and individual videos. [Those estimates](https://thefactsource.com/how-much-electricity-does-youtube-use/) imply that people consumed >175 times more energy watching Gangnam Style in 2019 alone than the entire Ethereum network uses per year.

The chart above also includes comparisons to Bitcoin and to "PoW Ethereum". Estimates for Bitcoin's energy consumption vary widely between sources and it is a topic that attracts a lot of nuanced [debate](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/). The estimate of ~100 TWh included in the chart is from the [Cambridge Bitcoin Electricity Consumption Index](https://ccaf.io/cbeci/index/comparisons). Digiconomist estimates that the energy consumption is greater, at around 130 TWh at the time of writing. Ethereum has not always used a low carbon consensus mechanism - it originally used proof-of-work. The energy consumption of the old proof-of-work Ethereum was estimated at around [78 TWh](https://digiconomist.net/ethereum-energy-consumption) shortly before it was swapped for low-energy proof-of-stake. There is more discussion of proof-of-work [further down this page](#why-proof-of-stake-is-greener-than-proof-of-work).

Many articles estimate "per-transaction" energy expenditure for blockchains. The benefit of this is that it is intuitive. However, transaction-based estimates can be misleading because the energy required to propose and validate a block is independent of the number of transactions within it. A per transaction unit of energy expenditure implies that fewer transactions would lead to smaller energy expenditure and vice-versa, which is not the case. Also, per-transaction estimates are very sensitive to how a blockchain's transaction throughput is defined, and tweaking this definition can be gamed to make the value seem larger or smaller.

For example, on Ethereum, the transaction throughput is not only that of the base layer - it is also the sum of the transaction throughput of all of its "[layer 2](/layer-2/)" rollups, which are not generally included in calculations and would drastically reduce them. This is one reason why comparisons of energy consumption per transaction across platforms can be misleading.

## A green application layer {#green-applications}

While Ethereum's energy consumption is very low, there is also a substantial, growing, and highly active **regenerative finance (ReFi)** community building on Ethereum. ReFi applications use DeFi components to build financial applications that have positive externalities benefiting the environment. ReFi is part of a wider ["solarpunk"](https://en.wikipedia.org/wiki/Solarpunk) movement that is closely aligned with Ethereum and aims to couple technological advancement and environmental stewardship. The decentralized, permissionless, composable nature of Ethereum makes it the ideal base layer for the ReFi and solarpunk communities.

Web3 native public goods funding platforms such as Gitcoin have run climate rounds specifically in order to stimulate environmentally conscious building on Ethereum's application layer.

Through the development of these initiatives (and others, e.g. [DeSci](/desci/)), Ethereum is becoming an environmentally and socially-positive technology.

## Ethereum's carbon debt {#carbon-debt}

Ethereum's energy expenditure is very low, but this has not always been the case. Ethereum originally used proof-of-work which had a much greater environmental cost than the current proof-of-stake mechanism.

Since its inception, Ethereum aimed to implement a proof-of-stake consensus mechanism, but doing so without sacrificing security and decentralization took years of focused research and development. Therefore, a proof-of-work mechanism was used to get the network started. Proof-of-work consensus requires miners to use their computing hardware to calculate a value, expending energy in the process. Providing the correct value proves that energy has been expended, demonstrating that a specific miner has invested real-world value for the right to add to the blockchain. Ethereum's total energy consumption peaked during the apex of the crypto bull market in February 2022 at just under 94 TWh/yr. Just before the switch to proof-of-stake, the energy consumption was closer to [78 TWh/yr](https://digiconomist.net/ethereum-energy-consumption), comparable to that of Uzbekistan, with a carbon emission equivalent to that of Azerbaijan (33 MT/yr). The switch to proof-of-stake solved this problem.

![Energy consumption comparison of pre- and post-Merge Ethereum. Displayed is on the left the Eiffel tower with 330 meters height and on the right a plastic toy figure with 4 cm height within a magnifying glass.](energy_consumption_pre_post_merge.png)

[CCRI](https://carbon-ratings.com) examined the impact of Ethereum’s merge from proof-of-work to proof-of-stake. The annualized electricity consumption was reduced by more than **99.988 %**. Likewise, Ethereum’s carbon footprint was decreased by approximately **99.992 %** (from 11,016,000 to 870 tonnes CO2e). Depicted metaphorically, this corresponds to a reduction in emissions from the height of the Eiffel Tower to a small plastic toy figure, as shown in the figure above.

Both proof-of-work and proof-of-stake are just mechanisms to decide who gets to add the next block. Swapping proof-of-work for proof-of-stake, where the real-world value invested comes from ETH staked directly in a smart contract, removes the need for miners to burn energy to add to the blockchain. Therefore, the environmental cost of securing the network is drastically reduced. Simultaneously, the security of the network is thought to have increased.

<InfoBanner emoji=":evergreen_tree:">
  If you think these stats are incorrect or can be made more accurate, please raise an issue or PR. The stats on this page are estimates based on publicly available data - they do not represent an official statement or promise from the Ethereum Foundation. 
</InfoBanner>

## Further reading {#further-reading}

- [A country's worth of power, no more](https://blog.ethereum.org/2021/05/18/country-power-no-more/) – _Carl Beekhuizen, May 18 2021_
- [Ethereum's energy consumption](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)
- [Ethereum Emissions: A Bottom-up Estimate](https://kylemcdonald.github.io/ethereum-emissions/) _ Kyle McDonald_
- [Ethereum Energy Consumption Index](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) — *[@InsideTheSim](https://twitter.com/InsideTheSim)*
- [The Merge - Implications on the Electricity Consumption and Carbon Footprint of the Ethereum Network](https://carbon-ratings.com/eth-report-2022) - _CCRI_

## Related topics {#related-topics}

- [Ethereum's vision](/upgrades/vision/)
- [The Beacon Chain](/upgrades/beacon-chain)
- [The Merge](/upgrades/merge/)
- [Sharding](/upgrades/beacon-chain/)
