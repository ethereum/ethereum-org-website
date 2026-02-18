---
title: Data na Uchambuzi
description: Jinsi ya kupata takwimu na data za onchain kwa matumizi katika mfumo mtawanyo wa kimamlaka wako
lang: sw
---

## Utangulizi {#Introduction}

Matumizi ya Mtandao yanapoendelea kukua, kiasi kinachoongezeka cha habari muhimu kitakuwepo katika data ya onchain. Kadiri kiasi cha data kinavyoongezeka haraka, kukokotoa na kujumlisha habari hii ili kuripoti au kuendesha mfumo mtawanyo wa kimamlaka kunaweza kuwa jambo la kuchukua muda mwingi na mchakato mzito.

Kutumia watoa huduma wa data waliopo kunaweza kuharakisha usanidi, kutoa matokeo sahihi zaidi, na kupunguza juhudi za matengenezo zinazoendelea. Hii itawezesha timu kuzingatia utendakazi mkuu ambao mradi wao unajaribu kutoa.

## Mahitaji ya awali {#prerequisites}

Unapaswa kuelewa dhana ya msingi ya [Wachunguzi wa Bloku](/developers/docs/data-and-analytics/block-explorers/) ili kuelewa vizuri matumizi yao katika muktadha wa uchanganuzi wa data. Aidha, jifahamishe na dhana ya [faharasa](/glossary/#index) ili kuelewa manufaa wanayoongeza kwenye muundo wa mfumo.

Kwa upande wa misingi ya usanifu, kuelewa [API](https://www.wikipedia.org/wiki/API) na [REST](https://www.wikipedia.org/wiki/Representational_state_transfer) ni nini, hata kwa nadharia.

## Wachunguzi wa bloku {#block-explorers}

[Wachunguzi wengi wa Bloku](/developers/docs/data-and-analytics/block-explorers/) hutoa lango za [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API) ambazo zitawapa wasanidi programu mwonekano wa data ya muda halisi kuhusu bloku, miamala, wathibitishaji, akaunti na shughuli zingine za onchain.

Wasanidi programu wanaweza kisha kuchakata na kubadilisha data hii ili kuwapa watumiaji wao maarifa ya kipekee na mwingiliano na [mnyororo wa bloku](/glossary/#blockchain). Kwa mfano, [Etherscan](https://etherscan.io) na [Blockscout](https://eth.blockscout.com) hutoa data ya utekelezaji na makubaliano kwa kila nafasi ya sekunde 12.

## The Graph {#the-graph}

[The Graph](https://thegraph.com/) ni itifaki ya uorodheshaji ambayo hutoa njia rahisi ya kuuliza data ya mnyororo wa bloku kupitia API wazi zinazojulikana kama grafu ndogo.

Kwa kutumia The Graph, wasanidi programu wanaweza kunufaika na:

- Uorodheshaji uliogatuliwa: Huwezesha kuorodhesha data ya mnyororo wa bloku kupitia viorodheshaji vingi, na hivyo kuondoa sehemu yoyote moja ya kutofaulu.
- Hoja za GraphQL: Hutoa kiolesura chenye nguvu cha GraphQL cha kuuliza data iliyoorodheshwa, na kufanya urejeshaji wa data kuwa rahisi sana.
- Ubinafsishaji: Bainisha mantiki yako mwenyewe ya kubadilisha na kuhifadhi data ya mnyororo wa bloku, na utumie tena grafu ndogo zilizochapishwa na wasanidi programu wengine kwenye Mtandao wa The Graph.

Fuata mwongozo huu wa [kuanza-haraka](https://thegraph.com/docs/en/quick-start/) ili kuunda, kutuma, na kuuliza grafu ndogo ndani ya dakika 5.

## Utofauti wa wateja {#client-diversity}

[Utofauti wa wateja](/developers/docs/nodes-and-clients/client-diversity/) ni muhimu kwa afya ya jumla ya mtandao wa Ethereum kwa sababu unatoa ustahimilivu kwa hitilafu na unyonyaji. Sasa kuna dashibodi kadhaa za utofauti wa wateja zikiwemo [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://www.rated.network), [supermajority.info](https://supermajority.info//) na [Ethernodes](https://ethernodes.org/).

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) huchakata awali data ya mnyororo wa bloku kuwa majedwali ya hifadhidata ya uhusiano (DuneSQL), huruhusu watumiaji kuuliza data ya mnyororo wa bloku kwa kutumia SQL na kuunda dashibodi kulingana na matokeo ya hoja. Data ya Onchain imepangwa katika majedwali 4 ghafi: `blocks`, `transactions`, `logs` (za matukio) na `traces` (za wito). Mikataba na itifaki maarufu zimeondolewa usimbaji, na kila moja ina seti yake ya majedwali ya matukio na wito. Majedwali hayo ya matukio na wito huchakatwa zaidi na kupangwa katika majedwali ya kufikirika kulingana na aina ya itifaki, kwa mfano, dex, ukopeshaji, stablecoins, n.k.

## SQD {#sqd}

[SQD](https://sqd.dev/) ni jukwaa la data lililogatuliwa na lenye uwezo mkubwa wa kupanuka lililoboreshwa ili kutoa ufikiaji bora, usio na ruhusa kwa kiasi kikubwa cha data. Kwa sasa inatoa data ya kihistoria ya on-chain, ikiwa ni pamoja na kumbukumbu za matukio, risiti za miamala, ufuatiliaji, na tofauti za hali kwa kila muamala. SQD hutoa zana yenye nguvu ya kuunda mifumo maalum ya uchimbaji na uchakataji wa data, na kufikia kasi ya uorodheshaji ya hadi bloku 150k kwa sekunde.

Ili kuanza, tembelea [nyaraka](https://docs.sqd.dev/) au tazama [mifano ya EVM](https://github.com/subsquid-labs/squid-evm-examples) ya kile unachoweza kuunda na SQD.

## Mtandao wa SubQuery {#subquery-network}

[SubQuery](https://subquery.network/) ni kiorodheshaji data kinachoongoza ambacho huwapa wasanidi programu API za haraka, za kuaminika, zilizogatuliwa na zilizobinafsishwa kwa ajili ya miradi yao ya web3. SubQuery huwawezesha wasanidi programu kutoka kwa zaidi ya mifumo ikolojia 165+ (ikiwa ni pamoja na Ethereum) na data tele iliyoorodheshwa ili kuunda uzoefu angavu na wa kina kwa watumiaji wao. Mtandao wa SubQuery huwezesha programu zako zisizozuilika na mtandao thabiti na uliogatuliwa wa miundombinu. Tumia zana ya wasanidi programu wa mnyororo wa bloku ya SubQuery kuunda programu za web3 za siku zijazo, bila kupoteza muda kuunda backend maalum kwa shughuli za uchakataji wa data.

Ili kuanza, tembelea [mwongozo wa kuanza haraka wa Ethereum](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html) ili kuanza kuorodhesha data ya mnyororo wa bloku ya Ethereum kwa dakika katika mazingira ya ndani ya Docker kwa ajili ya majaribio kabla ya kuanza kutumika kwenye [huduma inayosimamiwa na SubQuery](https://managedservice.subquery.network/) au kwenye [mtandao uliogatuliwa wa SubQuery](https://app.subquery.network/dashboard).

## Lugha ya Hoja ya EVM {#evm-query-language}

Lugha ya Hoja ya EVM (EQL) ni lugha inayofanana na SQL iliyoundwa kuuliza minyororo ya EVM (mashine halisi ya ethereum). Lengo kuu la EQL ni kusaidia hoja changamano za uhusiano kwenye raia wa daraja la kwanza la mnyororo wa EVM (bloku, akaunti, na miamala) huku ikiwapa wasanidi programu na watafiti sintaksia rahisi kwa matumizi ya kila siku. Kwa EQL, wasanidi programu wanaweza kupata data ya mnyororo wa bloku kwa kutumia sintaksia inayojulikana kama SQL na kuondoa hitaji la msimbo changamano wa boilerplate. EQL inasaidia maombi ya kawaida ya data ya mnyororo wa bloku (k.m., kupata nonce na salio la akaunti kwenye Ethereum au kupata ukubwa wa sasa wa bloku na mhuri wa muda) na inaendelea kuongeza usaidizi kwa maombi na seti za vipengele changamano zaidi.

## Masomo zaidi {#further-reading}

- [Kuchunguza Data za Crypto I: Usanifu wa Mtiririko wa Data](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [Muhtasari wa Mtandao wa Graph](https://thegraph.com/docs/en/about/)
- [Uwanja wa Michezo wa Hoja za Graph](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Mifano ya msimbo wa API kwenye EtherScan](https://etherscan.io/apis#contracts)
- [Nyaraka za API kwenye Blockscout](https://docs.blockscout.com/devs/apis)
- [Mchunguzi wa Mnyororo Kioleza wa Beaconcha.in](https://beaconcha.in)
- [Misingi ya Dune](https://docs.dune.com/#dune-basics)
- [Mwongozo wa Kuanza Haraka wa Ethereum wa SubQuery](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [Muhtasari wa Mtandao wa SQD](https://docs.sqd.dev/)
- [Lugha ya Hoja ya EVM](https://eql.sh/blog/alpha-release-notes)
