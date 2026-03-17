---
title: Utofauti wa wateja
description: Ufafanuzi wa kiwango cha juu wa umuhimu wa utofauti wa wateja wa Ethereum.
lang: sw
sidebarDepth: 2
---

Mwenendo wa nodi ya Ethereum unadhibitiwa na programu ya mteja inayoendesha. Kuna wateja kadhaa wa Ethereum wa kiwango cha uzalishaji, kila mmoja akitengenezwa na kudumishwa kwa lugha tofauti na timu tofauti. Wateja wameundwa kwa vipimo vya kawaida vinavyohakikisha wateja wanawasiliana bila mshono na wana utendakazi sawa na kutoa hali ya utumiaji sawa kwa mtumiaji. Hata hivyo, kwa sasa usambazaji wa wateja kwenye nodi hauko sawa vya kutosha ili kuimarisha mtandao huu kwa uwezo wake kamili. Kimsingi, watumiaji wanapaswa kugawanywa takribani kwa usawa kati ya wateja mbalimbali ili kuleta utofauti wa wateja iwezekanavyo kwenye mtandao.

## Mahitaji ya awali {#prerequisites}

Ikiwa bado huelewi nodi na wateja ni nini, angalia [nodi na wateja](/developers/docs/nodes-and-clients/). Safu za [Utekelezaji](/glossary/#execution-layer) na [makubaliano](/glossary/#consensus-layer) zimefafanuliwa katika faharasa.

## Kwa nini kuna wateja wengi? {#why-multiple-clients}

Wateja wengi, waliotengenezwa na kudumishwa kwa uhuru, wapo kwa sababu utofauti wa wateja hufanya mtandao kuwa thabiti zaidi dhidi ya mashambulizi na hitilafu. Kuwa na wateja wengi ni nguvu ya kipekee kwa Ethereum - minyororo mingine ya bloku hutegemea kutokukosea kwa mteja mmoja. Hata hivyo, haitoshi tu kuwa na wateja wengi wanaopatikana, lazima wakubaliwe na jumuiya na jumla ya nodi zinazotumika zigawiwe kwa usawa kati yao.

## Kwa nini utofauti wa wateja ni muhimu? {#client-diversity-importance}

Kuwa na wateja wengi waliotengenezwa na kudumishwa kwa uhuru ni muhimu kwa afya ya mtandao uliogatuliwa. Hebu tuchunguze sababu zake.

### Hitilafu {#bugs}

Hitilafu katika mteja mmoja ni hatari ndogo kwa mtandao inapowakilisha idadi ndogo ya nodi za Ethereum. Kwa usambazaji sawa wa nodi kwa wateja wengi, uwezekano wa wateja wengi kupata tatizo la pamoja ni mdogo, na matokeo yake, mtandao unakuwa imara zaidi.

### Ustahimilivu dhidi ya mashambulizi {#resilience}

Utofauti wa wateja pia hutoa ustahimilivu dhidi ya mashambulizi. Kwa mfano, shambulio [linalodanganya mteja fulani](https://twitter.com/vdWijden/status/1437712249926393858) kwenye tawi fulani la mnyororo haliwezekani kufanikiwa kwa sababu wateja wengine hawawezi kunyonywa kwa njia ile ile na mnyororo mkuu unabaki bila kuharibiwa. Utofauti mdogo wa wateja huongeza hatari inayohusishwa na udukuzi kwa mteja mkuu. Utofauti wa wateja tayari umethibitisha kuwa ulinzi muhimu dhidi ya mashambulizi hasidi kwenye mtandao, kwa mfano shambulio la Shanghai la kukataliwa kwa huduma mwaka 2016 liliwezekana kwa sababu washambuliaji waliweza kumdanganya mteja mkuu (Geth) kutekeleza operesheni ya polepole ya i/o ya diski makumi ya maelfu ya mara kwa kila bloku. Kwa sababu wateja mbadala walikuwa pia mtandaoni ambao hawakuwa na udhaifu huo, Ethereum iliweza kupinga shambulio hilo na kuendelea kufanya kazi huku udhaifu katika Geth ukirekebishwa.

### Mwisho wa uthibitisho wa hisa {#finality}

Hitilafu katika mteja wa makubaliano aliye na zaidi ya 33% ya nodi za Ethereum inaweza kuzuia safu ya makubaliano kukamilika, ikimaanisha watumiaji wasingeweza kuamini kwamba miamala haitarejeshwa au kubadilishwa wakati fulani. Hili lingekuwa tatizo kubwa kwa programu nyingi zilizojengwa juu ya Ethereum, hasa DeFi.

<Emoji text="🚨" className="me-4" /> Mbaya zaidi, hitilafu kubwa katika mteja aliye na theluthi mbili ya walio wengi inaweza kusababisha mnyororo <a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">kugawanyika na kukamilika kimakosa</a>, na kusababisha kundi kubwa la wathibitishaji kukwama kwenye mnyororo batili. Ikiwa wanataka kujiunga tena na mnyororo sahihi, wathibitishaji hawa hukabiliwa na adhabu ya kupunguzwa kwa hisa au kujiondoa polepole na kwa gharama nafuu na kuanzisha upya. Ukubwa wa adhabu ya kupunguzwa kwa hisa huongezeka kulingana na idadi ya nodi zenye hatia, huku theluthi mbili ya walio wengi wakipunguzwa kwa kiwango cha juu (ETH 32).

Ingawa hizi ni hali zisizowezekana, mfumo-ikolojia wa Ethereum unaweza kupunguza hatari yake kwa kusawazisha usambazaji wa wateja kwenye nodi zinazotumika. Kimsingi, hakuna mteja wa makubaliano anayepaswa kufikia hisa ya 33% ya jumla ya nodi.

### Wajibu wa pamoja {#responsibility}

Pia kuna gharama ya kibinadamu ya kuwa na wateja walio wengi. Huweka mkazo na jukumu kubwa kwa timu ndogo ya maendeleo. Kadiri utofauti wa wateja unavyopungua, ndivyo mzigo wa jukumu kwa wasanidi programu wanaodumisha mteja aliye na wengi unavyoongezeka. Kusambaza jukumu hili kwa timu nyingi ni nzuri kwa afya ya mtandao wa nodi za Ethereum na mtandao wake wa watu.

## Utofauti wa sasa wa wateja {#current-client-diversity}

### Wateja wa Utekelezaji {#execution-clients-breakdown}

<PieChart
data={[
{ name: "Geth", value: 41 },
{ name: "Nethermind", value: 38 },
{ name: "Besu", value: 16 },
{ name: "Erigon", value: 3 },
{ name: "Reth", value: 2 }
]}
/>

### Wateja wa Makubaliano {#consensus-clients-breakdown}

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

Mchoro huu unaweza kuwa umepitwa na wakati — nenda [ethernodes.org](https://ethernodes.org) na [clientdiversity.org](https://clientdiversity.org) kwa taarifa za kisasa.

Chati mbili za pai hapo juu zinaonyesha picha za utofauti wa sasa wa wateja kwa safu za utekelezaji na makubaliano (wakati wa kuandika mnamo Oktoba 2025). Utofauti wa wateja umeimarika kwa miaka mingi, na safu ya utekelezaji imeona kupungua kwa utawala wa [Geth](https://geth.ethereum.org/), huku [Nethermind](https://www.nethermind.io/nethermind-client) ikiwa ya pili kwa ukaribu, [Besu](https://besu.hyperledger.org/) ya tatu na [Erigon](https://github.com/ledgerwatch/erigon) ya nne, huku wateja wengine wakijumuisha chini ya 3% ya mtandao. Mteja anayetumiwa zaidi kwenye safu ya makubaliano—[Lighthouse](https://lighthouse.sigmaprime.io/)—yuko karibu sana na wa pili anayetumiwa zaidi. [Prysm](https://prysmaticlabs.com/#projects) na [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) zinachukua ~31% na ~14% mtawalia, na wateja wengine hutumiwa mara chache.

Data ya safu ya utekelezaji ilipatikana kutoka [supermajority.info](https://supermajority.info/) mnamo 26-Okt-2025. Data ya wateja wa makubaliano ilipatikana kutoka kwa [Michael Sproul](https://github.com/sigp/blockprint). Data ya wateja wa makubaliano ni ngumu zaidi kupata kwa sababu wateja wa safu ya makubaliano huwa hawana alama zisizo na utata ambazo zinaweza kutumika kuzitambua. Data ilitengenezwa kwa kutumia algoriti ya uainishaji ambayo wakati mwingine huchanganya baadhi ya wateja wachache (tazama [hapa](https://twitter.com/sproulM_/status/1440512518242197516) kwa maelezo zaidi). Katika mchoro ulio hapo juu, uainishaji huu usio na utata hushughulikiwa na lebo ya ama/au (k.m. Nimbus/Teku). Hata hivyo, ni wazi kwamba mtandao mwingi unaendesha Prysm. Licha ya kuwa picha za muda tu, thamani katika mchoro hutoa hisia nzuri ya jumla ya hali ya sasa ya utofauti wa wateja.

Data ya kisasa ya utofauti wa wateja kwa safu ya makubaliano sasa inapatikana katika [clientdiversity.org](https://clientdiversity.org/).

## Safu ya utekelezaji {#execution-layer}

Hadi sasa, mazungumzo kuhusu utofauti wa wateja yamejikita zaidi kwenye safu ya makubaliano. Hata hivyo, mteja wa utekelezaji [Geth](https://geth.ethereum.org) kwa sasa anachangia karibu 85% ya nodi zote. Asilimia hii ni tatizo kwa sababu sawa na kwa wateja wa makubaliano. Kwa mfano, hitilafu katika Geth inayoathiri ushughulikiaji wa miamala au uundaji wa mizigo ya utekelezaji inaweza kusababisha wateja wa makubaliano kukamilisha miamala yenye matatizo au hitilafu. Kwa hivyo, Ethereum ingekuwa na afya bora kwa usambazaji sawa wa wateja wa utekelezaji, na ikiwezekana bila mteja yeyote anayewakilisha zaidi ya 33% ya mtandao.

## Tumia mteja wa walio wachache {#use-minority-client}

Kushughulikia utofauti wa wateja kunahitaji zaidi ya watumiaji binafsi kuchagua wateja wa walio wachache - inahitaji mabwawa ya wathibitishaji na taasisi kama vile mfumo mtawanyo wa kimamlaka makuu na masoko ya kubadilishana fedha kubadili wateja pia. Hata hivyo, watumiaji wote wanaweza kufanya sehemu yao katika kurekebisha usawa uliopo na kuhalalisha matumizi ya programu zote za Ethereum zinazopatikana. Baada ya Muungano, waendeshaji wote wa nodi watatakiwa kuendesha mteja wa utekelezaji na mteja wa makubaliano. Kuchagua mchanganyiko wa wateja waliopendekezwa hapa chini kutasaidia kuongeza utofauti wa wateja.

### Wateja wa utekelezaji {#execution-clients}

- [Besu](https://www.hyperledger.org/use/besu)
- [Nethermind](https://downloads.nethermind.io/)
- [Erigon](https://github.com/ledgerwatch/erigon)
- [Go-Ethereum](https://geth.ethereum.org/)
- [Reth](https://reth.rs/)

### Wateja wa makubaliano {#consensus-clients}

- [Nimbus](https://nimbus.team/)
- [Lighthouse](https://github.com/sigp/lighthouse)
- [Teku](https://consensys.io/teku)
- [Lodestar](https://github.com/ChainSafe/lodestar)
- [Prysm](https://prysm.offchainlabs.com/docs/)
- [Grandine](https://docs.grandine.io/)

Watumiaji wa kiufundi wanaweza kusaidia kuharakisha mchakato huu kwa kuandika mafunzo na nyaraka zaidi kwa wateja wachache na kuwahimiza wenzao wanaoendesha nodi kuhama kutoka kwa wateja wakuu. Miongozo ya kubadili hadi kwa mteja wa makubaliano wa walio wachache inapatikana kwenye [clientdiversity.org](https://clientdiversity.org/).

## Dashibodi za utofauti wa wateja {#client-diversity-dashboards}

Dashibodi kadhaa hutoa takwimu za wakati halisi za utofauti wa wateja kwa safu ya utekelezaji na makubaliano.

**Safu ya makubaliano:**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)

**Safu ya utekelezaji:**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## Masomo zaidi {#further-reading}

- [Utofauti wa wateja kwenye safu ya makubaliano ya Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [Muungano wa Ethereum: Endesha mteja wa walio wengi kwa hatari yako mwenyewe!](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest, Machi 24 2022_
- [Umuhimu wa utofauti wa wateja](https://our.status.im/the-importance-of-client-diversity/)
- [Orodha ya huduma za nodi za Ethereum](https://ethereumnodes.com/)
- [Maswali "Matano ya Kwa Nini" ya tatizo la utofauti wa wateja](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [Utofauti wa Ethereum na Jinsi ya Kuutatua (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## Mada zinazohusiana {#related-topics}

- [Endesha nodi ya Ethereum](/run-a-node/)
- [Nodi na wateja](/developers/docs/nodes-and-clients/)
