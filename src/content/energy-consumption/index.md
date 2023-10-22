---
title: Ethereum Energy Consumption
description: The basic information you need to understand Ethereum's energy consumption.
lang: en
---

# Ethereum's energy expenditure {#proof-of-stake-energy}

Ethereum is a green blockchain. Ethereum's [proof-of-stake](/developers/docs/consensus-mechanisms/pos) consensus mechanism uses ETH instead of [energy to secure the network](/developers/docs/consensus-mechanisms/pow). Ethereum's energy consumption is approximately [~0.0026 TWh/yr](https://carbon-ratings.com/eth-report-2022) across the entire global network.

The energy consumption estimate for Ethereum comes from a [CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com) study. They generated bottom-up estimates of the electricity consumption and carbon footprint of the Ethereum network ([see the report](https://carbon-ratings.com/eth-report-2022)). They measured the electricity consumption of different nodes with various hardware and client software configurations. The estimated **2,601 MWh** (0.0026 TWh) for the network’s annual electricity consumption corresponds to yearly carbon emissions of **870 tonnes CO2e** applying regional-specific carbon intensity factors. This value changes as nodes enter and leave the network - you can keep track using a rolling 7-day average estimate by the [Cambridge Blockchain network Sustainability Index](https://ccaf.io/cbnsi/ethereum) (note that they use a slightly different method for their estimates - details available on their site).

To contextualize Ethereum's energy consumption, we can compare annualized estimates for some other products and industries. This helps us better understand whether the estimate for Ethereum is high or low.

<EnergyConsumptionChart />

The chart above displays the estimated energy consumption in TWh/yr for Ethereum, compared to several other products and industries. The estimates provided are sourced from publicly available information, accessed in July 2023, with links to the sources available in the table below.

|                     | Annualized energy consumption (TWh) | Comparison to PoS Ethereum |                                                                                      Source                                                                                       |
| :------------------ | :---------------------------------: | :------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Global data centers |                 190                 |          73,000x           |                                    [source](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| Bitcoin             |                 149                 |          53,000x           |                                                                 [source](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Gold mining         |                 131                 |          50,000x           |                                                                 [source](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Gaming in USA\*     |                 34                  |          13,000x           |                 [source](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| PoW Ethereum        |                 21                  |           8,100x           |                                                                    [source](https://ccaf.io/cbnsi/ethereum/1)                                                                     |
| Google              |                 19                  |           7,300x           |                                           [source](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| Netflix             |                0.457                |            176x            | [source](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal              |                0.26                 |            100x            |                                 [source](<https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-(1).pdf>)                                  |
| AirBnB              |                0.02                 |             8x             |                              [source](<https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf>)                              |
| **PoS Ethereum**    |             **0.0026**              |           **1x**           |                                                               [source](https://carbon-ratings.com/eth-report-2022)                                                                |

\*Includes end user devices such as PCs, laptops, and gaming consoles.

Getting accurate estimates for energy consumption is complicated, especially when what is being measured has a complex supply chain or deployment details that influence its efficiency. For example, estimates of energy consumption for Netflix and Google vary depending upon whether they only include the energy used to maintain their systems and deliver content to users (_direct expenditure_) or whether they include the expenditure required to produce content, run corporate offices, advertise, etc (_indirect expenditure_). Indirect expenditure could also include the energy required to consume content on end-user devices such as TVs, computers and mobiles.

The estimates above are not perfect comparisons. The amount of indirect expenditure that is accounted for varies by source, and rarely includes the energy from end-user devices. Each underlying source includes more details on what is being measured.

The table and chart above also include comparisons to Bitcoin and proof-of-work Ethereum. It is important to note that the energy consumption of proof-of-work networks is not static and changes day-to-day. Estimates can also vary widely between sources. The topic attracts nuanced [debate](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/), not only about the amount of energy consumed, but also about the sources of that energy and the related ethics. Energy consumption does not necessarily map precisely to environmental footprint because different projects might use different energy sources, including a lesser or greater proportion of renewables. For example, [Cambridge Bitcoin Electricity Consumption Index](https://ccaf.io/cbnsi/cbeci/comparisons) indicates that the Bitcoin network demand could theoretically be powered by gas flaring or electricity that would otherwise be lost in transmission and distribution. Ethereum's route to sustainability was to replace the energy-hungry part of the network with a green alternative.

You can browse energy consumption and carbon emission estimates for many industries on the [Cambridge Blockchain Network Sustainability Index site](https://ccaf.io/cbnsi/ethereum).

## Per-transaction estimates {#per-transaction-estimates}

Many articles estimate "per-transaction" energy expenditure for blockchains. This can be misleading because the energy required to propose and validate a block is independent of the number of transactions within it. A per-transaction unit of energy expenditure implies that fewer transactions would lead to smaller energy expenditure and vice-versa, which is not the case. Also, per-transaction estimates are very sensitive to how a blockchain's transaction throughput is defined, and tweaking this definition can be gamed to make the value seem larger or smaller.

On Ethereum, for example, the transaction throughput is not only that of the base layer - it is also the sum of the transaction throughput of all of its "[layer 2](/layer-2/)" rollups. Layer 2's are not generally included in calculations, but accounting for the additional energy consumed by sequencers (small) and the number of transactions they process (large) would likely drastically reduce per-transaction estimates. This is one reason why comparisons of per-transaction energy consumption across platforms can be misleading.

## Ethereum's carbon debt {#carbon-debt}

Ethereum's energy expenditure is very low, but this has not always been the case. Ethereum originally used proof-of-work which had a much greater environmental cost than the current proof-of-stake mechanism.

From the very beginning, Ethereum planned to implement a proof-of-stake based consensus mechanism, but doing so without sacrificing security and decentralization took years of focused research and development. Therefore, a proof-of-work mechanism was used to get the network started. Proof-of-work requires miners to use their computing hardware to calculate a value, expending energy in the process.

![Comparing Ethereum's energy consumption pre- and post-Merge, using the Eiffel Tower (330 meters tall) on the left to symbolize the high energy consumption before The Merge, and a small 4 cm tall Lego figure on the right to represent the dramatic reduction in energy usage after The Merge](energy_consumption_pre_post_merge.png)

CCRI estimates that The Merge reduced Ethereum's annualized electricity consumption by more than **99.988%**. Likewise, Ethereum’s carbon footprint was decreased by approximately **99.992%** (from 11,016,000 to 870 tonnes CO2e). To put this in perspective, the reduction in emissions is like going from the height of the Eiffel Tower to a small plastic toy figure, as illustrated in the figure above. As a result, the environmental cost of securing the network is drastically reduced. At the same time, the network's security is believed to have improved.

## A green application layer {#green-applications}

While Ethereum's energy consumption is very low, there is also a substantial, growing, and highly active [**regenerative finance (ReFi)**](/refi/) community building on Ethereum. ReFi applications use DeFi components to build financial applications that have positive externalities benefiting the environment. ReFi is part of a wider ["solarpunk"](https://en.wikipedia.org/wiki/Solarpunk) movement that is closely aligned with Ethereum and aims to couple technological advancement and environmental stewardship. The decentralized, permissionless, and composable nature of Ethereum makes it the ideal base layer for the ReFi and solarpunk communities.

Web3 native public goods funding platforms such as [Gitcoin](https://gitcoin.co) run climate rounds to stimulate environmentally conscious building on Ethereum's application layer. Through the development of these initiatives (and others, e.g. [DeSci](/desci/)), Ethereum is becoming an environmentally and socially net-positive technology.

<InfoBanner emoji=":evergreen_tree:">
  If you think this page can be made more accurate, please raise an issue or PR. The stats on this page are estimates based on publicly available data - they do not represent an official statement or promise from the ethereum.org team, or the Ethereum Foundation.
</InfoBanner>

## Further reading {#further-reading}

- [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum)
- [White House report on proof-of-work blockchains](https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Ethereum Emissions: A Bottom-up Estimate](https://kylemcdonald.github.io/ethereum-emissions/) - _Kyle McDonald_
- [Ethereum Energy Consumption Index](https://digiconomist.net/ethereum-energy-consumption/) - _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [The Merge - Implications on the Electricity Consumption and Carbon Footprint of the Ethereum Network](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [Ethereum's energy consumption](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## Related topics {#related-topics}

- [Ethereum's vision](/roadmap/vision/)
- [The Beacon Chain](/roadmap/beacon-chain)
- [The Merge](/roadmap/merge/)
