---
title: Data na uchanganuzi
description: Jinsi ya kupata uchanganuzi na data mnyororoni kwa matumizi katika programu tumizi zilizogatuliwa (dapps) zako
lang: sw
---

## Utangulizi {#introduction}

Kadiri matumizi ya mtandao yanavyoendelea kukua, kiasi kinachoongezeka cha taarifa muhimu kitakuwepo katika data mnyororoni. Kadiri kiasi cha data kinavyoongezeka kwa kasi, kukokotoa na kujumuisha taarifa hizi ili kutoa ripoti au kuendesha programu tumizi iliyogatuliwa (dapp) kunaweza kuwa kazi inayochukua muda na mchakato mzito.

Kutumia watoa huduma wa data waliopo kunaweza kuharakisha usanidi, kutoa matokeo sahihi zaidi, na kupunguza juhudi za matengenezo zinazoendelea. Hii itawezesha timu kuzingatia utendaji mkuu ambao mradi wao unajaribu kutoa.

## Masharti {#prerequisites}

Unapaswa kuelewa dhana ya msingi ya [Vichunguzi vya Vitalu](/developers/docs/data-and-analytics/block-explorers/) ili kuelewa vyema matumizi yake katika muktadha wa uchanganuzi wa data. Kwa kuongezea, jifahamishe na dhana ya [faharisi](/glossary/#index) ili kuelewa faida wanazoongeza kwenye muundo wa mfumo.

Kwa upande wa misingi ya usanifu, kuelewa [API](https://www.wikipedia.org/wiki/API) na [REST](https://www.wikipedia.org/wiki/Representational_state_transfer) ni nini, hata kwa nadharia.

## Vichunguzi vya vitalu {#block-explorers}

[Vichunguzi vya Vitalu](/developers/docs/data-and-analytics/block-explorers/) vingi hutoa lango la [API](https://www.wikipedia.org/wiki/API) za [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) ambazo zitawapa wasanidi uwezo wa kuona data ya wakati halisi kuhusu vitalu, miamala, wathibitishaji, akaunti, na shughuli zingine mnyororoni.

Wasanidi wanaweza kisha kuchakata na kubadilisha data hii ili kuwapa watumiaji wao maarifa ya kipekee na mwingiliano na [mnyororo wa vitalu](/glossary/#blockchain). Kwa mfano, [Etherscan](https://etherscan.io) na [Blockscout](https://eth.blockscout.com) hutoa data ya utekelezaji na mwafaka kwa kila sloti ya sekunde 12.

## The Graph {#the-graph}

[The Graph](https://thegraph.com/) ni itifaki ya kufaharisi ambayo hutoa njia rahisi ya kuuliza data ya mnyororo wa vitalu kupitia API wazi zinazojulikana kama grafu ndogo.

Pamoja na The Graph, wasanidi wanaweza kufaidika na:

- Ufaharisishaji uliogatuliwa: Huwezesha kufaharisi data ya mnyororo wa vitalu kupitia wafaharisishaji wengi, hivyo kuondoa hatari ya kutegemea sehemu moja pekee
- Maswali ya GraphQL: Hutoa kiolesura chenye nguvu cha GraphQL cha kuuliza data iliyofaharisiwa, na kufanya urejeshaji wa data kuwa rahisi sana
- Ubinafsishaji: Fafanua mantiki yako mwenyewe ya kubadilisha na kuhifadhi data ya mnyororo wa vitalu, na utumie tena grafu ndogo zilizochapishwa na wasanidi wengine kwenye Mtandao wa The Graph

Fuata mwongozo huu wa [kuanza haraka](https://thegraph.com/docs/en/quick-start/) ili kuunda, kusambaza, na kuuliza grafu ndogo ndani ya dakika 5.

## Anuwai ya wateja {#client-diversity}

[Anuwai ya wateja](/developers/docs/nodes-and-clients/client-diversity/) ni muhimu kwa afya ya jumla ya mtandao wa Ethereum kwa sababu inatoa uthabiti dhidi ya hitilafu na unyonyaji. Sasa kuna dashibodi kadhaa za anuwai ya wateja zikiwemo [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://www.rated.network), [supermajority.info](https://supermajority.info//) na [Ethernodes](https://ethernodes.org/).

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) huchakata mapema data ya mnyororo wa vitalu kuwa majedwali ya hifadhidata husiani (DuneSQL), huruhusu watumiaji kuuliza data ya mnyororo wa vitalu kwa kutumia SQL na kuunda dashibodi kulingana na matokeo ya swali. Data mnyororoni hupangwa katika majedwali 4 ghafi: `blocks`, `transactions`, (tukio) `logs` na (wito) `traces`. Mikataba na itifaki maarufu zimesimbuliwa, na kila moja ina seti yake ya majedwali ya matukio na wito. Majedwali hayo ya matukio na wito huchakatwa zaidi na kupangwa katika majedwali ya ufupisho kulingana na aina ya itifaki, kwa mfano, dex, ukopeshaji, sarafu dhabiti (stablecoins), n.k.

## SQD {#sqd}

[SQD](https://sqd.dev/) ni jukwaa la data iliyogatuliwa inayoweza kupanuka sana iliyoboreshwa kwa kutoa ufikiaji mzuri, bila ruhusa kwa idadi kubwa ya data. Kwa sasa inahudumia data ya kihistoria mnyororoni, ikijumuisha kumbukumbu za matukio, risiti za muamala, ufuatiliaji, na tofauti za hali kwa kila muamala. SQD inatoa zana yenye nguvu ya kuunda uchimbaji wa data maalum na njia za usindikaji, kufikia kasi ya kufaharisi ya hadi vitalu 150k kwa sekunde.

Ili kuanza, tembelea [nyaraka](https://docs.sqd.dev/) au tazama [mifano ya EVM](https://github.com/subsquid-labs/squid-evm-examples) ya kile unachoweza kujenga na SQD.

## Mtandao wa SubQuery {#subquery-network}

[SubQuery](https://subquery.network/) ni mfaharisishaji mkuu wa data anayewapa wasanidi API za haraka, za kutegemewa, zilizogatuliwa, na zilizobinafsishwa kwa miradi yao ya Web3. SubQuery inawawezesha wasanidi kutoka zaidi ya mifumo ikolojia 165+ (ikiwa ni pamoja na Ethereum) na data tajiri iliyofaharisiwa ili kujenga uzoefu angavu na wa kina kwa watumiaji wao. Mtandao wa SubQuery huwezesha programu zako zisizozuilika kwa mtandao wa miundombinu thabiti na iliyogatuliwa. Tumia zana za msanidi wa mnyororo wa vitalu wa SubQuery ili kujenga programu tumizi za Web3 za siku zijazo, bila kutumia muda kujenga mazingira ya nyuma maalum kwa shughuli za usindikaji wa data.

Ili kuanza, tembelea [mwongozo wa kuanza haraka wa Ethereum](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html) ili kuanza kufaharisi data ya mnyororo wa vitalu wa Ethereum kwa dakika chache katika mazingira ya ndani ya Docker kwa majaribio kabla ya kwenda moja kwa moja kwenye [huduma inayosimamiwa ya SubQuery](https://managedservice.subquery.network/) au kwenye [mtandao uliogatuliwa wa SubQuery](https://app.subquery.network/dashboard).

## Codex {#codex}

[Codex](https://www.codex.io/) ni API ya data ya mnyororo wa vitalu ya wakati halisi inayotoa data iliyoboreshwa kwa tokeni milioni 70+ kwenye mitandao 80+. Wasanidi wanaweza kufikia bei za tokeni zilizopangwa, salio la mikoba, historia ya muamala, na uchanganuzi uliojumuishwa (kiasi, ukwasi, mikoba ya kipekee) bila kudumisha miundombinu maalum ya kufaharisi. Codex inasaidia uwasilishaji wa data wa chini ya sekunde kupitia miunganisho ya WebSocket na webhook.

Ili kuanza, tembelea [nyaraka](https://docs.codex.io), jaribu [Kichunguzi](https://docs.codex.io/explore), au jisajili kwenye [dashibodi](https://dashboard.codex.io/signup).

## Lugha ya Kuuliza ya EVM {#evm-query-language}

Lugha ya Kuuliza ya EVM (EQL) ni lugha inayofanana na SQL iliyoundwa kuuliza minyororo ya EVM (Mashine Pepe ya Ethereum). Lengo kuu la EQL ni kusaidia maswali changamano ya uhusiano kwenye raia wa daraja la kwanza wa mnyororo wa EVM (vitalu, akaunti, na miamala) huku ikiwapa wasanidi na watafiti sintaksia rahisi kwa matumizi ya kila siku. Pamoja na EQL, wasanidi wanaweza kuchukua data ya mnyororo wa vitalu kwa kutumia sintaksia inayofahamika kama ya SQL na kuondoa hitaji la msimbo changamano wa boilerplate. EQL inasaidia maombi ya kawaida ya data ya mnyororo wa vitalu (k.m., kurejesha nonsi na salio la akaunti kwenye Ethereum au kuchukua ukubwa wa kitalu cha sasa na muhuri wa muda) na inaendelea kuongeza usaidizi kwa maombi na seti za vipengele changamano zaidi.

## Usomaji Zaidi {#further-reading}

- [Kuchunguza Data ya Kripto I: Usanifu wa Mtiririko wa Data](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [Muhtasari wa Mtandao wa Graph](https://thegraph.com/docs/en/about/)
- [Uwanja wa Kuuliza wa Graph](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Mifano ya msimbo wa API kwenye EtherScan](https://etherscan.io/apis#contracts)
- [Nyaraka za API kwenye Blockscout](https://docs.blockscout.com/devs/apis)
- [Kichunguzi cha Mnyororo wa Beacon cha Beaconcha.in](https://beaconcha.in)
- [Misingi ya Dune](https://docs.dune.com/#dune-basics)
- [Mwongozo wa Kuanza Haraka wa Ethereum wa SubQuery](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [Muhtasari wa Mtandao wa SQD](https://docs.sqd.dev/)
- [Lugha ya Kuuliza ya EVM](https://eql.sh/blog/alpha-release-notes)

## Mafunzo: Data na uchanganuzi / SQL kwenye Ethereum {#tutorials}

- [Jifunze Mada za Msingi za Ethereum kwa SQL](/developers/tutorials/learn-foundational-ethereum-topics-with-sql/) _– Uliza data ya Ethereum mnyororoni kwa SQL ili kuelewa misingi ya miamala, vitalu, na gesi._