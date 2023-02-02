---
title: Ethereum Energy Consumption
description: The basic information you need to understand Ethereum's energy consumption.
lang: en
---

# Ethereum's energy expenditure {#proof-of-stake-energy}

Ethereum is a green blockchain. It uses a [proof-of-stake](/developers/docs/consensus-mechanisms/pos) consensus mechanism, using ETH instead of [energy to secure the network](/developers/docs/consensus-mechanisms/pow). Ethereum's proof-of-stake mechanism only uses [~0.0026 TWh/yr](https://carbon-ratings.com/eth-report-2022) across the entire global network.

[CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com) generated bottom-up estimates of the electricity consumption and the carbon footprint of the Ethereum network ([see the report](https://carbon-ratings.com/eth-report-2022)). They measured the electricity consumption of different nodes with various hardware and client software configurations. This yielded an estimate of **2.601 MWh** (0.0026 TWh) for the network’s annual electricity consumption (September 2022), which corresponds to yearly carbon emissions of **870 tonnes CO2e** applying regional-specific carbon intensity factors.

<EnergyConsumptionChart />

The chart above shows the estimated annual energy consumption in TWh/yr for various industries (retrieved in June 2022). Note that the estimates presented in the plot are from publicly available sources that have been linked to in the table below. CEBCI refers to the Cambridge Bitcoin Electricity Consumption index. The values are illustrative and do not represent an official estimate, promise, or forecast.

To put Ethereum's energy consumption in context, we can compare annualized estimates for other industries - this allows us to better understand whether 0.0026 TWh is a lot or a little. The data is summarized in the bar chart above, but more detail is provided in the table below:

|                     | Annualized energy consumption (TWh) | Comparison to PoS Ethereum | Source                                                                                                                                            |
| :------------------ | :---------------------------------: | :------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gold mining         |                 240                 |          92,000x           | [source](https://www.kitco.com/news/2021-05-17/Gold-s-energy-consumption-doubles-that-of-bitcoin-Galaxy-Digital.html)                             |
| Gold mining         |                 130                 |          50,000x           | [source](https://ccaf.io/cbeci/index/comparisons)                                                                                                 |
| Bitcoin             |                 130                 |          50,000x           | [source](https://digiconomist.net/bitcoin-energy-consumption)                                                                                     |
| Bitcoin             |                 100                 |          38,000x           | [source](https://ccaf.io/cbeci/index/comparisons)                                                                                                 |
| YouTube             |                 244                 |          94,000x           | [source](https://thefactsource.com/how-much-electricity-does-youtube-use/)                                                                        |
| Global data centers |                 200                 |          78,000x           | [source](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                       |
| Netflix             |                0.45                 |            175x            | [source](https://s22.q4cdn.com/959853165/files/doc_downloads/2020/02/0220_Netflix_EnvironmentalSocialGovernanceReport_FINAL.pdf)                  |
| Netflix             |                 94                  |          36,000x           | [source](https://theshiftproject.org/en/article/unsustainable-use-online-video/)                                                                  |
| PayPal              |                0.26                 |            100x            | [source](https://app.impaakt.com/analyses/paypal-consumed-264100-mwh-of-energy-in-2020-24-from-non-renewable-sources-27261)                       |
| Gaming in USA       |                 34                  |          13,000x           | [source](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential) |
| PoW Ethereum        |                 78                  |          30,000x           | [source](https://digiconomist.net/ethereum-energy-consumption)                                                                                    |
| PoS Ethereum        |               0.0026                |             1x             | [source](https://carbon-ratings.com/eth-report-2022)                                                                                              |

Estimates of YouTube's energy expenditure have also been broken down by channel and individual videos. [Those estimates](https://thefactsource.com/how-much-electricity-does-youtube-use/) show YouTube used over 175 times more energy watching Gangnam Style in 2019 than Ethereum uses per year.

It is complicated to get accurate estimates for energy consumption, especially when what is being measured has a complex supply chain or deployment details that influences its efficiency. For example, we have included an upper and lower estimate for gold mining that differ by about 90 TWh. Estimates of energy consumption by Netflix range dramatically depending on the source. Their own self-reported estimates are about 20x smaller than an independent estimate - there is some discussion about the reasons for this on [Carbon Brief](https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix). Similarly, YouTube has been estimated to expend about [244 TWh/yr](https://thefactsource.com/how-much-electricity-does-youtube-use/), although the energy consumption depends a lot on the type of device videos are streamed on, and the energy-efficiency of underlying infrastructure such as data centers - suitable values for these parameters are hard to estimate so there is substantial uncertainty.

The chart above also includes comparisons to Bitcoin and to Ethereum when it used proof-of-work. Estimates for Bitcoin's energy consumption vary widely between sources and it is a topic that attracts a lot of nuanced [debate](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/) about not only the amount of energy consumed but the sources of that energy and the related ethics.

Many articles estimate "per-transaction" energy expenditure for blockchains. This can be misleading because the energy required to propose and validate a block is independent of the number of transactions within it. A per transaction unit of energy expenditure implies that fewer transactions would lead to smaller energy expenditure and vice-versa, which is not the case. Also, per-transaction estimates are very sensitive to how a blockchain's transaction throughput is defined, and tweaking this definition can be gamed to make the value seem larger or smaller.

For example, on Ethereum, the transaction throughput is not only that of the base layer - it is also the sum of the transaction throughput of all of its "[layer 2](/layer-2/)" rollups. Layer 2's are not generally included in calculations, but accounting for the additional energy consumed by sequencers (small) and the number of transactions they process (large) would likely drastically reduce per-transaction estimates. This is one reason why comparisons of energy consumption per transaction across platforms can be misleading.

## Ethereum's carbon debt {#carbon-debt}

Ethereum's energy expenditure is very low, but this has not always been the case. Ethereum originally used proof-of-work which had a much greater environmental cost than the current proof-of-stake mechanism.

From the very beginning, Ethereum planned to implement a proof-of-stake based consensus mechanism, but doing so without sacrificing security and decentralization took years of focused research and development. Therefore, a proof-of-work mechanism was used to get the network started. Proof-of-work requires miners to use their computing hardware to calculate a value, expending energy in the process. Ethereum's total energy consumption peaked during the apex of the crypto bull market in February 2022 at just under 94 TWh/yr. Just before the switch to proof-of-stake, the energy consumption was closer to [78 TWh/yr](https://digiconomist.net/ethereum-energy-consumption), comparable to that of Uzbekistan, with a carbon emission equivalent to that of Azerbaijan (33 MT/yr).

![Energy consumption comparison of pre- and post-Merge Ethereum. Displayed is on the left the Eiffel tower with 330 meters height and on the right a plastic toy figure with 4 cm height within a magnifying glass.](energy_consumption_pre_post_merge.png)

CCRI examined the impact of Ethereum’s transition from proof-of-work to proof-of-stake. The annualized electricity consumption was reduced by more than **99.988 %**. Likewise, Ethereum’s carbon footprint was decreased by approximately **99.992 %** (from 11,016,000 to 870 tonnes CO2e). Depicted metaphorically, this corresponds to a reduction in emissions from the height of the Eiffel Tower to a small plastic toy figure, as shown in the figure above. Therefore, the environmental cost of securing the network is drastically reduced. Simultaneously, the security of the network is thought to have increased.

## A green application layer {#green-applications}

While Ethereum's energy consumption is very low, there is also a substantial, growing, and highly active **regenerative finance (ReFi)** community building on Ethereum. ReFi applications use DeFi components to build financial applications that have positive externalities benefiting the environment. ReFi is part of a wider ["solarpunk"](https://en.wikipedia.org/wiki/Solarpunk) movement that is closely aligned with Ethereum and aims to couple technological advancement and environmental stewardship. The decentralized, permissionless, and composable nature of Ethereum makes it the ideal base layer for the ReFi and solarpunk communities.

Web3 native public goods funding platforms such as [Gitcoin](https://gitcoin.co) run climate rounds to stimulate environmentally conscious building on Ethereum's application layer. Through the development of these initiatives (and others, e.g. [DeSci](/desci/)), Ethereum is becoming an environmentally and socially net-positive technology.

<InfoBanner emoji=":evergreen_tree:">
  If you think this page can be made more accurate, please raise an issue or PR. The stats on this page are estimates based on publicly available data - they do not represent an official statement or promise from the ethereum.org team, or the Ethereum Foundation. 
</InfoBanner>

## Further reading {#further-reading}

- [White House report on proof-of-work blockchains](https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
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
