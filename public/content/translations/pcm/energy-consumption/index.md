---
title: Ethereum Energy Konsumpshon
description: Di basik infomashon yu nid ondastand Ethereum energy konsumpshon.
lang: pcm
---

# Ethereum energy ekspendishure {#proof-of-stake-energy}

Ethereum na green blockchain. Ethereum [proof-of-stake](/developers/docs/consensus-mechanisms/pos) konsensus metod dey yus ETH insted of [energy to sekure di netwok](/developers/docs/consensus-mechanisms/pow). Di energy wey Ethereum dey konsume around di full netwok dey around [~0.0026 TWh/yr](https://carbon-ratings.com/eth-report-2022).

Di energy konsumpshon dey estimate for Ethereum dey kome from one [CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com) study. Dem generate botom-up estimate of di elektrisity konsumpshon and karbon footprint of di Ethereum netwok ([si di report](https://carbon-ratings.com/eth-report-2022)). Dem don meshure di elektrisity konsumpshon of difren nodes wit difren hardwia and klient softwia konfigurashons. Di **2,601 MWh** (0.0026 TWh) for di netwok annual elektrik konsumpshon dey korespond to efri year karbon emishons of **870 tonnes CO2e** wey dey apply regional-spesifik faktors. Dis value shanjis as nodes dey enta and leave di netwok - yu fit dey track to yus one rolling 7-day averaj estimate by di [Cambridge Blockchain network Sustainability Index](https://ccaf.io/cbnsi/ethereum) (kip am for mind sey dem yu smoll difren metod for dia estimates - ditails wey dey afailabol on dem site).

To make ondastand Ethereum energy konsumpshon, wi fit konoia efri year estimate for some oda products and industris. Dis dey helep sabi weda di estimate for Ethereum dey high abi low.

<EnergyConsumptionChart />

Di chart above dey displays di energy konsumpshon wey dem estimate in TWh/yr, as kompia to plenti oda products and industris. Dem si di estimates wey dem provide from infomashon afailabol for publik, wey dem access in July 2023, wit links to di sorsis afailabol in di tabol bilow.

|                    | Energy consumption per year (TWh) | Kompia to PoS Ethereum |                                                                                      Source                                                                                       |
|:------------------ |:---------------------------------:|:----------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| Global data sentas |                190                |        73,000x         |                                    [source](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| Bitcoin            |                149                |        53,000x         |                                                                 [source](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Gold mining        |                131                |        50,000x         |                                                                 [source](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Gaming in USA\*  |                34                 |        13,000x         |                 [source](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| PoW Ethereum       |                21                 |         8,100x         |                                                                    [source](https://ccaf.io/cbnsi/ethereum/1)                                                                     |
| Google             |                19                 |         7,300x         |                                           [source](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| Netflix            |               0.457               |          176x          | [source](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal             |               0.26                |          100x          |                                  [source](https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-(1).pdf)                                   |
| AirBnB             |               0.02                |           8X           |                               [source](https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf)                               |
| **PoS Ethereum**   |            **0.0026**             |         **1x**         |                                                               [source](https://carbon-ratings.com/eth-report-2022)                                                                |

\*Inklude end user devices such as PCs, laptops, and gaming konsoles.

To dye get koret estimate for energy konsumpshon dey kard, espeshialy wen wetin dem meashure get hard supply chain abi dey deploy ditails wey dey afekt im effishiensy. Make wi si one eksampol, di estimate for hau Netflix and Google dey konsume energy nor bi do same as e dipend on weda dem only inklude di energy dem yus to dey maintain dem system and diliva kontent to users (_diret ekxpendishure_) abi weda dem inklude di ekspendishure dem nid to produs kontent, run korprate offices, advertise, etc (_indiret ekspendishure_). Indiret ekspendishure fit also inklude di energy dem nid to konsume kontent on end-user devices such as TVs, komputas and mobiles.

Di estimates above nor bi pafet komparisons. Di amount of indiret ekspendishure wey dem akant for nor bi di same by sorse, and nor to dey inklude di energy from end-user devices. Ish onderlying sorse inklude more ditails on wetin dem don meshure.

Di tabol and chart above also inklude komparison to Bitcoin and proof-of-work Ethereum. Im dey impotant to note sey di energy konsumpshon of proof-of-work netwok nor dey statik and dey shanj day-to-day. Estimates fit also shanj wella bitwin sorsis. Di topik dey attract nuance [debate](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/), nor bi only about di amoujnt of energy konsume, but also about di sorsis of dat energy and di ethiks wey rilate. Energy konsumpshon nor dey rily map wella to environmental footprint bikos difren projects fit yus difren energy sorsis, wey inklude one lesser abi greata proporshon of renewabols. For eksampol, [Cambridge Bitcoin Electricity Konsumpshon Index](https://ccaf.io/cbnsi/cbeci/comparisons) dey show sey di Bitcoin netwok dimand fit wok by gas flaring abi electricity wey fit lost in transmishon and distribushon. Ethereum route to sustainability suppose riplase di energy-hungry part of di netwok wit one green alternative.

Yu fit browse energy konsumpshon and karbon emishon estimates for many industris on di [Cambridge Blockchain Network Sustainability Index site](https://ccaf.io/cbnsi/ethereum).

## Estimates per-transakshon {#per-transaction-estimates}

Many artikols estimate "per-transakshon" energy ekspendishure for blockchains. Dis fit dey mislead bikos di energy nid to propose and validate one block dey indipendent of di numba of transakshon inside am. One per-transakshon unit of energy expendishure wey means dat fewer transakshons go lead to energy ekspendishure smoll pass and vice-versa, wey nor bi di kase. Also, per-transakshon dey estimate very sensitive to hau dem difine one blockchain transakshon throughput, and tweaking dis difinishon fit game to make di value wey look laik sey dem large abi smoll pass.

On Ethereum, for eksampol, di transakshon throughput nor only base on layer - im also bi di sum of di transakshon throughput of all of im "[layer 2](/layer-2/)" rollups. Layer 2's generaly nor dey for di kalkulashon, but dey akant for di adishonal energy wey dem sekwensa (smoll) konsume and di numba of transakshons dem process (large) go ridus wella per-transakshon estimates. Dis na one rizin why komparison of per-transakshon energy konsumpshon akross platfoms fit dey mislead.

## Carbon wey Ethereum dey owe {#carbon-debt}

Di energy wey Ethereum dey yus dey very smoll, but nor bi hau e bi bifor. Normal, Ethereum dey yus proof-of-work wey get environmental kost pass di proof-of-stake wey dem dey yus nau.

From di start, Ethereum don plan to yus one proof-of-stake wey dey yus konsensus metod, but im dey do so witout sakrifising sekurity and disentralizashon don take plenti years of fokus riseach and divelopment. So na why, dem yus proof-of-work metod to start di netwok. Proof-of-work nid miners to yus dem komputing hardwia to kalkulate one value, dey ekspend energy in di process.

![If wi wan kompia di energy wey Ethererum dey konsume bifor and afta di Merge hapun, wi fit yus di Eiffel Tower (330 meters) wey dey left to show as di konsumpshon plenti bifor di Merge, make wi kon yus di Lego figure wey bi 4 sentimeters wey dey rite show as di energy wey e dey yus take drop afta di Merge hapun](energy_consumption_pre_post_merge.png)

CCRI dey estimate sey Di Merge wey occur ridus di electricity wey Ethereum dey konsume by ova **99.988%**. Also, karbon footprint of Ethereum ridus by laik **99.992%** (from 11,016,000 to 870 tonnes CO2e). So yu go fit onderstand, di way di emishon take ridus na laik sey make somtin wey toll reach Eiffel Tower to one smoll plastik toy figure, as dey show am in di figure above. As a rizut, di environmental kost to dey sekure di netwok don ridus wella. For di same taim, dem biliv sey di netwok sekurity don impruf.

## One green aplikashon layer {#green-applications}

As Ethereum energy konsumpshon dey very low, im still get big, growin, and aktive [**regenerative finans(ReFi)**](/refi/) komunity building wey dey Ethereum. ReFi aplikashons dey take DeFi parts yus am build finanshial aplikashons wey get positiv impact on di environment. ReFi dey part of di ["solarpunk"](https://en.wikipedia.org/wiki/Solarpunk) movement wey dey work very klose wit Ethereum and wey bi sey dem goal na to kombine teknologikal advansment and environmental stewardship. Di Ethereum wey dey disentralize, wey nor get pamishon, and komposabol dey make am one good base layer for ReFi and solarpunk komunitis.

Web3 native publik goods wey dey fund platfoms laik [Gitcoin](https://gitcoin.co) dey run klimate rounds so dem go fit promote building on aplikashon layer of Ethereum wey go konsida di environment. Thru di divelopment of dis initiatives ( and odas, laik [DeSci](/desci/)), Ethereum dey turn teknology wey dey good environmentally and socially.

<InfoBanner emoji=":evergreen_tree:">
  If yu feel sey dis page fit dey more akurate, abeg try raise issue abi PR. Dem estimate di stats on dis page base on publik data wey dey afailabol - dem nor reprisent offishial statement abi promise from di ethereum.org team, abi di Ethereum Foundashon.
</InfoBanner>

## Further reading {#further-reading}

- [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum)
- [White House report on proof-of-work blockchains](https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Ethereum Emissions: Estimate wey start from down go up](https://kylemcdonald.github.io/ethereum-emissions/) - _Kyle McDonald_
- [Ethereum Energy Consumption Index](https://digiconomist.net/ethereum-energy-consumption/) - _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [The Merge - How e take affect as the Ethereum Network dey take consume Electricity and hin carbon footprints](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [As Ethereum dey take consume energy](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## Related topics {#related-topics}

- [Vision wey Ethereum get](/roadmap/vision/)
- [Di Beacon Chain](/roadmap/beacon-chain)
- [De Merge](/roadmap/merge/)
