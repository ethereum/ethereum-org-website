---
title: Pagkonsumo ng Enerhiya ng Ethereum
description: Ang pangunahing impormasyong kailangan mo para maunawaan ang pagkonsumo ng enerhiya ng Ethereum.
lang: fil
---

# Paggamit ng enerhiya ng Ethereum {#proof-of-stake-energy}

Ang Ethereum ay isang "green" na blockchain. Ang consensus mechanism ng Ethereum na [patunay ng stake](/developers/docs/consensus-mechanisms/pos) ay gumagamit ng ETH sa halip na [enerhiya upang i-secure ang network](/developers/docs/consensus-mechanisms/pow). Ang kinokonsumong enerhiya ng Ethereum ay humigit-kumulang [~0.0026 TWh/taon](https://carbon-ratings.com/eth-report-2022) sa buong pandaigdigang network.

Ang pagtatantya sa kinokonsumong enerhiya ng Ethereum ay mula sa isang pag-aaral ng [CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com). Kinuha nila ang mga bottom-up estimate ng kinokonsumong kuryente at ang carbon footprint ng Ethereum network ([tingnan ang ulat](https://carbon-ratings.com/eth-report-2022)). Sinukat nila ang kinokonsimong kuryente ng iba't ibang node sa iba't ibang hardware at client software configuration. Ang tinatantyang **2,601 MWh** (0.0026 TWh) para sa kinokonsumong kuryente ng network kada taon ay katumbas ng taunang carbon emission na **870 toneladang CO2e** sa pamamagitan ng paggamit ng mga carbon intensity factor na partikular sa rehiyon. Ang halagang ito ay nagbabago habang pumapasok at umaalis sa network ang mga node - maaari mo itong subaybayan gamit ang isang rolling 7-day average na pagtatantya ng [Cambridge Blockchain network Sustainability Index](https://ccaf.io/cbnsi/ethereum) (tandaang gumagamit sila ng bahagyang naiibang pamamaraan para sa kanilang mga pagtatantya - makikita ang mga detalye sa kanilang site).

Upang maipaliwanag ang kinokonsumong enerhiya ng Ethereum, maaari nating ikumpara ang mga pagtatantya kada taon ng iba pang industriya. Makakatulong ito para mas maunawaan natin kung masyadong mataas o mababa ang pagtatantya para sa Ethereum.

<EnergyConsumptionChart />

Ipinapakita ng chart sa itaas ang tinatantyang kinokonsumong enerhiya kada taon sa TWh/taon para sa Ethereum, kumpara sa ilan pang industriya. Ang mga pagtatantyang ibinigay ay galing sa mga impormasyong available sa pampubliko na kinuha noong Mayo 2023. Makikita sa talahanayan sa ibaba ang mga link sa mga source:

|                        | Kinokonsumong enerhiya kada taon (TWh) | Paghahambing sa PoS Ethereum | 起源                                                                                                                                                                            |
| :--------------------- | :------------------------------------: | :--------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mga global data center |                  200                   |           77,000x            | [source](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                                                     |
| Gold mining            |                  131                   |           50,000x            | [起源](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                                                                                 |
| Bitcoin                |                  131                   |           50,000x            | [起源](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                                                                                 |
| PoW Ethereum           |                   78                   |           30,000x            | [起源](https://digiconomist.net/ethereum-energy-consumption)                                                                                                                    |
| YouTube (direkta lang) |                   12                   |            4600x             | [起源](https://www.gstatic.com/gumdrop/sustainability/google-2020-environmental-report.pdf)                                                                                     |
| Gaming sa USA          |                   34                   |           13,000x            | [起源](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                                 |
| Netflix                |                 0.451                  |             173x             | [起源](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal                 |                  0.26                  |             100x             | [起源](https://app.impaakt.com/analyses/paypal-consumed-264100-mwh-of-energy-in-2020-24-from-non-renewable-sources-27261)                                                       |
| AirBnB                 |                  0.02                  |              8x              | [起源](<https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf>)                                                           |
| PoS Ethereum           |                 0.0026                 |              1x              | [起源](https://carbon-ratings.com/eth-report-2022)                                                                                                                              |

Mahirap makakuha ng mga tumpak na pagtatantya para sa kinokonsumong kuryente, lalo na kung ang sinusukat ay may kumplikadong supply chain o mga detalye ng deployment na nakakaapekto sa pagiging epektibo nito. Tingnan ang Netflix o Youtube bilang mga halimbawa. Ang mga pagtatantya ng kinokonsumong enerhiya ng mga ito ay nag-iiba depende kung ang enerhiya lang na ginagamit upang panatilihin ang kanilang mga sistema at maipadala ang content sa mga user (_direct expenditure_) ang isasama o kung isasama ang gastos na kinakailangan upang gumawa ng content, pamahalaan ang opisina ng kumpanya, mag-advertise, atbp (_indirect expenditure_). Maaaring kasama rin sa hindi direktang paggamit ang enerhiyang kailangan para gumamit ng content sa mga device ng end user tulad ng mga TV, computer at mobile, na nakadepende naman sa kung aling mga device ang ginagamit.

Pinag-usapan ang isyung ito sa [Carbon Brief](https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix). Sa talahanayan sa itaas, kasama sa halagang iniulat para sa Netflix ang kanilang _direkta_ at _hindi direktang_ paggamit na sila mismo ang nag-ulat. Nagbigay lang ang YouTube ng pagtatantya ng sarili nilang _direktang_ paggamit ng enerhiya, na umaabot ng mga [12 TWh/taon](https://www.gstatic.com/gumdrop/sustainability/google-2020-environmental-report.pdf).

Kasama rin sa talahanayan at chart sa itaas ang mga pagkukumpara sa Bitcoin at sa patunay ng gawain na Ethereum. Mahalagang tandaan na ang kinokonsumong enerhiya ng mga network na gumagamit ng patunay ng gawain ay hindi static - nagbabago ito araw-araw. Ang halagang ginamit para sa patunay ng gawain na Ethereum ang halagang ginagamit bago ang [The Merge](/roadmap/merge/) hanggang sa patunay ng stake, gaya ng sinabi ng [Digiconomist](https://digiconomist.net/ethereum-energy-consumption). Tinatantya ng iba pang source, tulad ng [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum/1), na mas mababa ang kinokonsumong enerhiya (mas malapit sa 20 TWh/taon). Malaki rin ang pagkakaiba ng mga pagtatantya para sa kinokonsumong enerhiya ng Bitcoin, depende sa mga source at isa itong paksang [pinag-uusapan](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/) hindi lang kaugnay ng dami ng enerhiyang kinokonsumo, kundi maging kaugnay ng mga pinagmulan ng enerhiyang iyon at mga nauugnay na etika. Hindi tumpak na maiuugnay ang kinokonsumong enerhiya sa environmental footprint dahil maaaring gumamit ng iba't ibang pinagmulan ng enerhiya ang iba't ibang proyekto, halimbawa mas maliit o mas malaking bahagi ng renewables. Halimbawa, isinasaad ng [Cambridge Bitcoin Electricity Consumption Index](https://ccaf.io/cbnsi/cbeci/comparisons) na ang demand ng Bitcoin network ay maaaring gamitan ng gas flaring o kuryente na makokonsumo sa transmission at distribusyon. Para makamit ang sustainability, pinalitan ng Ethereum ng green na alternatibo ang bahagi ng network na malakas kumonsumo ng enerhiya.

Puwede kang mag-browse ng mga pagtatantya ng kinokonsumong enerhiya at carbon emission para sa maraming industriya sa [site ng Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum).

## Mga pagtatantya kada transaksyon {#per-transaction-estimates}

Tinatantya ng maraming artikulo ang ginagamit na enerhiya ng mga blockchain kada transaksyon. Maaari itong makalito dahil ang enerhiyang kailangan para mag-propose at mag-validate ng isang block ay hindi nakasalalay sa bilang ng mga transaksyon dito. Sa unit na kada transaksyon ng paggamit ng enerhiya, ipinagpapalagay na mas maliit ang magagamit na enerhiya kapag mas kaunti ang mga transaksyon at vice-versa, na hindi naman totoo. Gayundin, ang mga pagtatantya na kada transaksyon ay napakasensitibo sa kung paano tinutukoy ang throughput ng transaksyon ng isang blockchain, at maaaring dayain ang definition na ito para magmukhang mas malaki o maliit ang halaga.

Halimbawa, sa Ethereum, ang transaction throughput ay hindi lang sa base layer - ito rin ang kabuuang halaga ng throughput ng transaksyon ng lahat ng "[layer 2](/layer-2/)" rollup nito. Hindi karaniwang isinasama ang mga layer 2 sa mga kalkulasyon, pero kapag isinaalang-alang ang karagdagang enerhiyang kinokonsumo ng mga sequencer (maliit) at ang bilang ng mga transaksyong ipinoproseso ng mga ito (malaki), lubhang liliit ang mga pagtatantya na kada transaksyon. Isa ito sa mga dahilan kung bakit maaaring makalito ang pagkukumpara ng kinokonsumong enerhiya ng mga platform kada transaksyon.

## Ang carbon debt ng Ethereum {#carbon-debt}

Nakapakaunti ng enerhiyang ginagamit ng Ethereum, pero hindi ito palaging ganito. Dati, gumagamit ang Ethereum ng patunay ng gawain na may mas malaking environmental cost kaysa sa kasalukuyang mekanismong patunay ng stake.

Sa simula pa lang, pinlano ng Ethereum na magpatupad ng consensus mechanism na bayau sa patunay ng stake, pero gumugol ng maraming taon ng nakalaang pananaliksik at pag-develop ang pagsasakatuparan nito nang hindi pinapabayaan ang seguridad at decentralization. Kung kaya, gumamit ng mekanismong patunay ng gawain para simulan ang network. Sa patunay ng gawain, kailangang gamitin ng mga miner ang kanilang computing hardware para magkalkula ng halaga, at gumagamit ang prosesong ito ng enerhiya.

![Pagkukumpara ng kinokonsumong enerhiya ng Ethereum bago at matapos ang Merge gamit ang Eiffel Tower (may taas na 330 metro) sa kaliwa upang katawanin ang mataas na enerhiyang kinokonsumo bago ang The Merge, at isang maliit na 4 cm na Lego figure sa kanan upang katawanin ang malaking kabawasan sa ginagamit na enerhiya matapos ang The Merge](energy_consumption_pre_post_merge.png)

Ayon sa pagtatantya ng CCRI, binawasan ng The Merge ang kinokonsumong enerhiya kada taon ng Ethereum ng mahigit **99.988%**. Gayundin, ang carbon footprint ng Ethereum ay nabawasan ng mga **99.992%** (naging 870 mula sa mula sa 11,016,000 tonnes CO2e). Upang maisalarawan ito, ipagpalagay na ang pagkabawas ng mga emission ay parang paglipat sa taas ng maliit na toy figure mula sa taas ng Eiffel Tower, gaya ng ipinapakita sa figure sa itaas. Bilang resulta, malaki ang mababawas sa environmental cost ng pag-secure sa network. Gayundin, pinaniniwalang napaigting ang seguridad ng network.

## Isang green na application layer {#green-applications}

Bagama't napakaliit ng kinokonsumong enerhiya ng Ethereum, mayroon ding mahalaga, lumalaki, at napakaaktibong komunidad ng [**regenerative finance (ReFi)**](/refi/) na nabubuo sa Ethereum. Ang mga ReFi application ay gumagamit ng mga DeFi component upang lumikha ng mga pinansyal na application na may positibong epekto sa kalikasan. Ang ReFi ay bahagi ng mas malawakang kilusang ["solarpunk"](https://en.wikipedia.org/wiki/Solarpunk) na malapit na nauugnay sa Ethereum at naglalayong pagsamahin ang teknolohikal na pag-unlad at pangangalaga sa kalikasan. Ang Ethereum ay decentralized, permissionless, at composable, kaya naman naaangkop itong base layer para sa mga komunidad ng ReFi at solarpunk.

Ang mga public goods funding platform na native sa Web3 tulad ng [Gitcoin](https://gitcoin.co) ay nagsasagawa ng mga climate round upang isulong ang environmentally conscious na paggawa sa application layer ng Ethereum. Sa pamamagitan ng paggawa ng mga inisyatibang ito (at iba pa, hal., [DeSci](/desci/)), ang Ethereum ay nagiging isang teknolohiyang may positibong epekto sa kapaligiran at lipunan.

<InfoBanner emoji=":evergreen_tree:">
  Kung sa tingin mo ay mas mapapatumpak pa ang page na ito, maghain ng isyu o pull request (PR). Ang stats sa page na ito ay mga pagtatantya batay sa data na available sa publiko - hindi kumakatawan ang mga ito sa isang opisyal na pahayag o pangako mula sa ethereum.org team, o sa Ethereum Foundation.
</InfoBanner>

## Karagdagang pagbabasa {#further-reading}

- [Indeks ng Sustainable Network ng Cambridge Blockchain](https://ccaf.io/cbnsi/ethereum)
- [Ulat mula sa White House tungkol sa mga blockchain na patunay ng gawain](https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Mga Emission ng Ethereum: Isang Bottom-up na Pagtatantya](https://kylemcdonald.github.io/ethereum-emissions/) - _Kyle McDonald_
- [Ethereum Energy Consumption Index](https://digiconomist.net/ethereum-energy-consumption/) - _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [The Merge - Mga Epekto sa Pagkonsumo ng Kuryente at Carbon Footprint ng Ethereum Network](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [Ang kinokonsumong enerhiya ng Ethereum](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## Related topics {#related-topics}

- [Ang mithiin ng Ethereum](/roadmap/vision/)
- [Ang Beacon Chain](/roadmap/beacon-chain)
- [Ang Pag-merge](/roadmap/merge/)
