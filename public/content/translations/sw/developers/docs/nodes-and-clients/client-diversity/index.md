---
title: Anuwai ya wateja
description: Maelezo ya kiwango cha juu ya umuhimu wa anuwai ya wateja wa Ethereum.
lang: sw
sidebarDepth: 2
---

Tabia ya nodi ya [Ethereum](/) inadhibitiwa na programu ya mteja inayoendesha. Kuna wateja kadhaa wa Ethereum wa kiwango cha uzalishaji, kila mmoja akiundwa na kudumishwa katika lugha tofauti na timu tofauti. Wateja hujengwa kwa vipimo vya kawaida ambavyo vinahakikisha wateja wanawasiliana bila mshono na kila mmoja na wana utendaji sawa na kutoa uzoefu sawa wa mtumiaji. Hata hivyo, kwa sasa usambazaji wa wateja kwenye nodi haulingani vya kutosha kutambua uimarishaji huu wa mtandao kwa uwezo wake kamili. Kimsingi, watumiaji hugawanyika kwa usawa katika wateja mbalimbali ili kuleta anuwai ya wateja iwezekanavyo kwenye mtandao.

## Masharti {#prerequisites}

Ikiwa bado hauelewi nodi na wateja ni nini, angalia [nodi na wateja](/developers/docs/nodes-and-clients/). Tabaka za [utekelezaji](/glossary/#execution-layer) na [mwafaka](/glossary/#consensus-layer) zimefafanuliwa katika faharasa.

## Kwa nini kuna wateja wengi? {#why-multiple-clients}

Wateja wengi, waliotengenezwa na kudumishwa kwa kujitegemea wapo kwa sababu anuwai ya wateja hufanya mtandao kuwa thabiti zaidi dhidi ya mashambulizi na hitilafu. Wateja wengi ni nguvu ya kipekee kwa Ethereum - minyororo mingine ya vizuizi inategemea kutokosea kwa mteja mmoja. Hata hivyo, haitoshi tu kuwa na wateja wengi wanaopatikana, lazima wakubaliwe na jamii na jumla ya nodi zinazofanya kazi zisambazwe kwa usawa kiasi kati yao.

## Kwa nini anuwai ya wateja ni muhimu? {#client-diversity-importance}

Kuwa na wateja wengi waliotengenezwa na kudumishwa kwa kujitegemea ni muhimu kwa afya ya mtandao uliogatuliwa. Hebu tuchunguze sababu kwa nini.

### Hitilafu {#bugs}

Hitilafu katika mteja binafsi ni hatari ndogo kwa mtandao wakati inawakilisha idadi ndogo ya nodi za Ethereum. Pamoja na usambazaji sawa wa nodi kwa wateja wengi, uwezekano wa wateja wengi kuteseka kutokana na suala la pamoja ni mdogo, na kwa sababu hiyo, mtandao unakuwa imara zaidi.

### Ustahimilivu dhidi ya mashambulizi {#resilience}

Anuwai ya wateja pia inatoa ustahimilivu dhidi ya mashambulizi. Kwa mfano, shambulio ambalo [linamhadaa mteja fulani](https://twitter.com/vdWijden/status/1437712249926393858) kwenye tawi fulani la mnyororo haliwezekani kufanikiwa kwa sababu wateja wengine hawawezekani kutumiwa vibaya kwa njia sawa na mnyororo wa kisheria unabaki bila kuharibiwa. Anuwai ndogo ya wateja huongeza hatari inayohusishwa na udukuzi kwa mteja mkuu. Anuwai ya wateja tayari imethibitisha kuwa ulinzi muhimu dhidi ya mashambulizi mabaya kwenye mtandao, kwa mfano shambulio la kunyimwa huduma la Shanghai mnamo 2016 liliwezekana kwa sababu washambuliaji waliweza kumhadaa mteja mkuu (Geth) kutekeleza operesheni ya polepole ya diski i/o makumi ya maelfu ya mara kwa kila kitalu. Kwa sababu wateja mbadala pia walikuwa mtandaoni ambao hawakuwa na udhaifu huo, Ethereum iliweza kupinga shambulio hilo na kuendelea kufanya kazi wakati udhaifu katika Geth ulirekebishwa.

### Ukamilifu wa Uthibitisho wa Dau {#finality}

Hitilafu katika mteja wa mwafaka aliye na zaidi ya 33% ya nodi za Ethereum inaweza kuzuia tabaka la mwafaka kukamilisha, ikimaanisha watumiaji hawangeweza kuamini kwamba miamala haitarejeshwa au kubadilishwa wakati fulani. Hii itakuwa shida sana kwa programu nyingi zilizojengwa juu ya Ethereum, haswa fedha zilizogatuliwa (DeFi).

<Emoji text="🚨" className="me-4" /> Kibaya zaidi, hitilafu kubwa katika mteja aliye na theluthi mbili ya wingi mkuu inaweza kusababisha mnyororo <a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">kugawanyika na kukamilika vibaya</a>, na kusababisha kundi kubwa la wathibitishaji kukwama kwenye mnyororo batili. Ikiwa wanataka kujiunga tena na mnyororo sahihi, wathibitishaji hawa wanakabiliwa na ukataji au utoaji wa hiari wa polepole na wa gharama kubwa na uanzishaji upya. Ukubwa wa ukataji huongezeka kulingana na idadi ya nodi zenye hatia huku theluthi mbili ya wingi mkuu ikikatwa kwa kiwango cha juu (32 ETH).

Ingawa hizi ni hali zisizowezekana, mfumo wa ikolojia wa Ethereum unaweza kupunguza hatari yao kwa kusawazisha usambazaji wa wateja kwenye nodi zinazofanya kazi. Kimsingi, hakuna mteja wa mwafaka ambaye angewahi kufikia asilimia 33 ya jumla ya nodi.

### Wajibu wa pamoja {#responsibility}

Pia kuna gharama ya kibinadamu ya kuwa na wateja wengi. Inaweka mkazo na wajibu mkubwa kwa timu ndogo ya maendeleo. Kadiri anuwai ya wateja inavyokuwa ndogo, ndivyo mzigo wa wajibu unavyokuwa mkubwa kwa watengenezaji wanaodumisha mteja mkuu. Kusambaza wajibu huu kwa timu nyingi ni nzuri kwa afya ya mtandao wa nodi wa Ethereum na mtandao wake wa watu.

## Anuwai ya wateja ya sasa {#current-client-diversity}

### Viteja vya Utekelezaji {#execution-clients-breakdown}

<PieChart
data={[
{ name: "Geth", value: 41 },
{ name: "Nethermind", value: 38 },
{ name: "Besu", value: 16 },
{ name: "Erigon", value: 3 },
{ name: "Reth", value: 2 }
]}
/>

### Wateja wa Mwafaka {#consensus-clients-breakdown}

<PieChart
data={[
{ name: "Lighthouse", value: 42.71 },
{ name: "Prysm", value: 30.91},
{ name: "Teku", value: 13.86},
{ name: "Nimbus", value: 8.74},
{ name: "Lodestar", value: 2.67 },
{ name: "Grandine", value: 1.04 },
{ name: "Other", value: 0.07 }
]}
/>

Mchoro huu unaweza kuwa umepitwa na wakati — nenda kwenye [ethernodes.org](https://ethernodes.org) na [clientdiversity.org](https://clientdiversity.org) kwa taarifa za kisasa.

Chati mbili za pai hapo juu zinaonyesha picha za anuwai ya wateja ya sasa kwa tabaka za utekelezaji na mwafaka (wakati wa kuandika mnamo Oktoba 2025). Anuwai ya wateja imeboreka kwa miaka mingi, na tabaka la utekelezaji limeona kupungua kwa utawala wa [Geth](https://geth.ethereum.org/), huku [Nethermind](https://www.nethermind.io/nethermind-client) ikiwa ya pili kwa karibu, [Besu](https://besu.hyperledger.org/) ya tatu na [Erigon](https://github.com/ledgerwatch/erigon) ya nne, huku wateja wengine wakijumuisha chini ya 3% ya mtandao. Mteja anayetumiwa sana kwenye tabaka la mwafaka—[Lighthouse](https://lighthouse.sigmaprime.io/)—yuko karibu sana na anayetumiwa zaidi wa pili. [Prysm](https://prysmaticlabs.com/#projects) na [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) zinaunda ~31% na ~14% mtawalia, na wateja wengine hutumiwa mara chache.

Data ya tabaka la utekelezaji ilipatikana kutoka [supermajority.info](https://supermajority.info/) mnamo 26-Okt-2025. Data ya wateja wa mwafaka ilipatikana kutoka kwa [Michael Sproul](https://github.com/sigp/blockprint). Data ya mteja wa mwafaka ni ngumu zaidi kupata kwa sababu wateja wa tabaka la mwafaka hawana kila wakati alama zisizo na utata zinazoweza kutumika kuwatambua. Data ilitolewa kwa kutumia algoriti ya uainishaji ambayo wakati mwingine inachanganya baadhi ya wateja wachache (tazama [hapa](https://twitter.com/sproulM_/status/1440512518242197516) kwa maelezo zaidi). Katika mchoro hapo juu, uainishaji huu usio wazi unashughulikiwa na lebo ya ama/au (k.m. Nimbus/Teku). Hata hivyo, ni wazi kwamba idadi kubwa ya mtandao inaendesha Prysm. Licha ya kuwa picha tu, maadili katika mchoro hutoa hisia nzuri ya jumla ya hali ya sasa ya anuwai ya wateja.

Data ya kisasa ya anuwai ya wateja kwa tabaka la mwafaka sasa inapatikana kwenye [clientdiversity.org](https://clientdiversity.org/).

## Tabaka la utekelezaji {#execution-layer}

Hadi sasa, mazungumzo kuhusu anuwai ya wateja yamezingatia zaidi tabaka la mwafaka. Hata hivyo, kiteja cha utekelezaji cha [Geth](https://geth.ethereum.org) kwa sasa kinachukua karibu 85% ya nodi zote. Asilimia hii ni tatizo kwa sababu sawa na za wateja wa mwafaka. Kwa mfano, hitilafu katika Geth inayoathiri ushughulikiaji wa muamala au kuunda mizigo ya utekelezaji inaweza kusababisha wateja wa mwafaka kukamilisha miamala yenye matatizo au hitilafu. Kwa hivyo, Ethereum itakuwa na afya zaidi na usambazaji sawa zaidi wa viteja vya utekelezaji, kimsingi bila mteja anayewakilisha zaidi ya 33% ya mtandao.

## Tumia mteja wa wachache {#use-minority-client}

Kushughulikia anuwai ya wateja kunahitaji zaidi ya watumiaji binafsi kuchagua wateja wa wachache - inahitaji mabwawa ya wathibitishaji na taasisi kama vile programu tumizi zilizogatuliwa (dapps) kuu na mabadilishano kubadili wateja pia. Hata hivyo, watumiaji wote wanaweza kufanya sehemu yao katika kurekebisha usawa wa sasa na kurekebisha matumizi ya programu zote za Ethereum zinazopatikana. Baada ya Unganisho, waendeshaji wote wa nodi watahitajika kuendesha kiteja cha utekelezaji na mteja wa mwafaka. Kuchagua michanganyiko ya wateja iliyopendekezwa hapa chini itasaidia kuongeza anuwai ya wateja.

### Viteja vya utekelezaji {#execution-clients}

- [Besu](https://www.hyperledger.org/use/besu)
- [Nethermind](https://downloads.nethermind.io/)
- [Erigon](https://github.com/ledgerwatch/erigon)
- [Go-Ethereum](https://geth.ethereum.org/)
- [Reth](https://reth.rs/)

### Wateja wa mwafaka {#consensus-clients}

- [Nimbus](https://nimbus.team/)
- [Lighthouse](https://github.com/sigp/lighthouse)
- [Teku](https://consensys.io/teku)
- [Lodestar](https://github.com/ChainSafe/lodestar)
- [Prysm](https://prysm.offchainlabs.com/docs/)
- [Grandine](https://docs.grandine.io/)

Watumiaji wa kiufundi wanaweza kusaidia kuharakisha mchakato huu kwa kuandika mafunzo na nyaraka zaidi kwa wateja wa wachache na kuwahimiza wenzao wanaoendesha nodi kuhama kutoka kwa wateja wakuu. Miongozo ya kubadili kwa mteja wa mwafaka wa wachache inapatikana kwenye [clientdiversity.org](https://clientdiversity.org/).

## Dashibodi za anuwai ya wateja {#client-diversity-dashboards}

Dashibodi kadhaa hutoa takwimu za wakati halisi za anuwai ya wateja kwa tabaka la utekelezaji na mwafaka.

**Tabaka la mwafaka:**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)

**Tabaka la utekelezaji:**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## Usomaji zaidi {#further-reading}

- [Anuwai ya wateja kwenye tabaka la mwafaka la Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [Unganisho la Ethereum: Endesha mteja mkuu kwa hatari yako mwenyewe!](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest, Machi 24 2022_
- [Umuhimu wa anuwai ya wateja](https://our.status.im/the-importance-of-client-diversity/)
- [Orodha ya huduma za nodi za Ethereum](https://ethereumnodes.com/)
- ["Kwa Nini Tano" za tatizo la anuwai ya wateja](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [Anuwai ya Ethereum na Jinsi ya Kuitatua (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## Mada zinazohusiana {#related-topics}

- [Endesha nodi ya Ethereum](/run-a-node/)
- [Nodi na wateja](/developers/docs/nodes-and-clients/)
