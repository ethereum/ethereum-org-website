---
title: Upatikanaji wa data
description: Muhtasari wa matatizo na suluhisho zinazohusiana na upatikanaji wa data kwenye Ethereum
lang: sw
---

"Usiamini, thibitisha" ni msemo wa kawaida katika Ethereum. Wazo ni kwamba nodi yako inaweza kuthibitisha kwa kujitegemea kuwa taarifa inayopokea ni sahihi kwa kutekeleza miamala yote katika vitalu inavyopokea kutoka kwa wenzao ili kuhakikisha kuwa mabadiliko yaliyopendekezwa yanalingana kikamilifu na yale yaliyokokotolewa kwa kujitegemea na nodi. Hii inamaanisha nodi hazilazimiki kuamini kwamba watumaji wa kitalu ni waaminifu. Hili haliwezekani ikiwa data inakosekana.

**Upatikanaji wa data** unarejelea ujasiri ambao mtumiaji anaweza kuwa nao kwamba data inayohitajika kuthibitisha kitalu inapatikana kweli kwa washiriki wote wa mtandao. Kwa nodi kamili kwenye tabaka la 1 (l1) la [Ethereum](/) hii ni rahisi kiasi; nodi kamili hupakua nakala ya data yote katika kila kitalu - data _lazima_ ipatikane ili upakuaji uwezekane. Kitalu chenye data inayokosekana kitatupiliwa mbali badala ya kuongezwa kwenye mnyororo wa vitalu. Huu ni "upatikanaji wa data mnyororoni" na ni kipengele cha minyororo ya vitalu ya monolitiki. Nodi kamili haziwezi kudanganywa kukubali miamala batili kwa sababu zinapakua na kutekeleza kila muamala zenyewe. Hata hivyo, kwa minyororo ya vitalu ya kawaida, mikusanyiko ya tabaka la 2 (l2) na viteja vyepesi, mazingira ya upatikanaji wa data ni magumu zaidi, yakihitaji taratibu za uthibitishaji za kisasa zaidi.

## Mahitaji ya awali {#prerequisites}

Unapaswa kuwa na uelewa mzuri wa [misingi ya mnyororo wa vitalu](/developers/docs/intro-to-ethereum/), hasa [mbinu za mwafaka](/developers/docs/consensus-mechanisms/). Ukurasa huu pia unachukulia kuwa msomaji anafahamu [vitalu](/developers/docs/blocks/), [miamala](/developers/docs/transactions/), [nodi](/developers/docs/nodes-and-clients/), [suluhisho za kuongeza uwezo](/developers/docs/scaling/), na mada nyingine husika.

## Tatizo la upatikanaji wa data {#the-data-availability-problem}

Tatizo la upatikanaji wa data ni hitaji la kuthibitisha kwa mtandao mzima kwamba muhtasari wa baadhi ya data za muamala zinazoongezwa kwenye mnyororo wa vitalu unawakilisha kweli seti ya miamala halali, lakini kufanya hivyo bila kuhitaji nodi zote kupakua data yote. Data kamili ya muamala ni muhimu kwa kuthibitisha vitalu kwa kujitegemea, lakini kuhitaji nodi zote kupakua data yote ya muamala ni kikwazo cha kuongeza uwezo. Suluhisho za tatizo la upatikanaji wa data zinalenga kutoa hakikisho la kutosha kwamba data kamili ya muamala ilipatikana kwa uthibitishaji kwa washiriki wa mtandao ambao hawapakui na kuhifadhi data wenyewe.

[Nodi nyepesi](/developers/docs/nodes-and-clients/light-clients) na [mikusanyiko ya tabaka la 2 (l2)](/developers/docs/scaling) ni mifano muhimu ya washiriki wa mtandao wanaohitaji hakikisho dhabiti la upatikanaji wa data lakini hawawezi kupakua na kuchakata data ya muamala wenyewe. Kuepuka kupakua data ya muamala ndiko kunakofanya nodi nyepesi kuwa nyepesi na kuwezesha mikusanyiko kuwa suluhisho bora za kuongeza uwezo.

Upatikanaji wa data pia ni suala muhimu kwa wateja wa Ethereum wa baadaye ["wasio na hali"](/roadmap/statelessness) ambao hawahitaji kupakua na kuhifadhi data ya hali ili kuthibitisha vitalu. Wateja wasio na hali bado wanahitaji kuwa na uhakika kwamba data inapatikana _mahali fulani_ na kwamba imechakatwa kwa usahihi.

## Suluhisho za upatikanaji wa data {#data-availability-solutions}

### Sampuli ya upatikanaji wa data (DAS) {#data-availability-sampling}

Sampuli ya Upatikanaji wa Data (DAS) ni njia ya mtandao kuangalia kuwa data inapatikana bila kuweka mzigo mkubwa kwenye nodi yoyote binafsi. Kila nodi (ikiwa ni pamoja na nodi zisizoweka dhamana) hupakua sehemu ndogo, iliyochaguliwa kwa nasibu ya data yote. Kupakua sampuli kwa ufanisi kunathibitisha kwa ujasiri mkubwa kwamba data yote inapatikana. Hii inategemea usimbaji wa ufutaji wa data, ambao hupanua seti fulani ya data na taarifa za ziada (njia hii inafanywa ni kutosheleza utendakazi unaojulikana kama _polinomiali_ juu ya data na kutathmini polinomiali hiyo katika pointi za ziada). Hii inaruhusu data asili kurejeshwa kutoka kwa data ya ziada inapohitajika. Matokeo ya uundaji huu wa data ni kwamba ikiwa _yoyote_ ya data asili haipatikani, _nusu_ ya data iliyopanuliwa itakosekana! Kiasi cha sampuli za data zinazopakuliwa na kila nodi kinaweza kurekebishwa ili iwe na uwezekano _mkubwa sana_ kwamba angalau moja ya vipande vya data vilivyochukuliwa sampuli na kila mteja vitakosekana _ikiwa_ chini ya nusu ya data inapatikana kweli.

DAS itatumika kuhakikisha waendeshaji wa rollup wanafanya data yao ya muamala ipatikane baada ya [danksharding Kamili](/roadmap/danksharding/#what-is-danksharding) kutekelezwa. Nodi za Ethereum zitachukua sampuli kwa nasibu za data ya muamala iliyotolewa katika mablobu kwa kutumia mpango wa ziada ulioelezwa hapo juu ili kuhakikisha kuwa data yote ipo. Mbinu hiyo hiyo inaweza pia kutumika kuhakikisha wazalishaji wa kitalu wanafanya data yao yote ipatikane ili kulinda viteja vyepesi. Vile vile, chini ya [utengano wa mpendekezaji na mjengaji (PBS)](/roadmap/pbs), mjenga kizuizi pekee ndiye atahitajika kuchakata kitalu kizima - wathibitishaji wengine wangethibitisha kwa kutumia sampuli ya upatikanaji wa data.

### Kamati za upatikanaji wa data {#data-availability-committees}

Kamati za Upatikanaji wa Data (DACs) ni pande zinazoaminika zinazotoa, au kuthibitisha, upatikanaji wa data. DACs zinaweza kutumika badala ya, [au kwa pamoja na](https://hackmd.io/@vbuterin/sharding_proposal#Why-not-use-just-committees-and-not-DAS) DAS. Dhamana za usalama zinazokuja na kamati zinategemea usanidi maalum. Ethereum hutumia vikundi vidogo vya wathibitishaji vilivyochukuliwa sampuli kwa nasibu kuthibitisha upatikanaji wa data kwa nodi nyepesi, kwa mfano.

DACs pia hutumiwa na baadhi ya validiums. DAC ni seti inayoaminika ya nodi inayohifadhi nakala za data nje ya mtandao. DAC inahitajika kufanya data ipatikane katika tukio la mzozo. Wanachama wa DAC pia huchapisha uthibitisho mnyororoni ili kuthibitisha kwamba data iliyotajwa inapatikana kweli. Baadhi ya validiums hubadilisha DACs na mfumo wa mthibitishaji wa Uthibitisho wa Dau (PoS). Hapa, mtu yeyote anaweza kuwa mthibitishaji na kuhifadhi data nje ya mnyororo. Hata hivyo, lazima watoe "dhamana", ambayo inawekwa katika mkataba mahiri. Katika tukio la tabia mbaya, kama vile mthibitishaji kuzuia data, dhamana inaweza kufanyiwa ukataji. Kamati za upatikanaji wa data za Uthibitisho wa Dau ni salama zaidi kuliko DACs za kawaida kwa sababu zinahamasisha moja kwa moja tabia ya uaminifu.

## Upatikanaji wa data na nodi nyepesi {#data-availability-and-light-nodes}

[Nodi nyepesi](/developers/docs/nodes-and-clients/light-clients) zinahitaji kuthibitisha usahihi wa vichwa vya kizuizi zinazopokea bila kupakua data ya kitalu. Gharama ya wepesi huu ni kutoweza kuthibitisha kwa kujitegemea vichwa vya kizuizi kwa kutekeleza upya miamala ndani kwa ndani kwa njia ambayo nodi kamili hufanya.

Nodi nyepesi za Ethereum zinaamini seti za nasibu za wathibitishaji 512 ambao wamepewa _kamati ya usawazishaji_. Kamati ya usawazishaji hufanya kazi kama DAC inayoashiria kwa viteja vyepesi kwamba data katika kichwa ni sahihi kwa kutumia sahihi ya kificho. Kila siku, kamati ya usawazishaji hujisasisha. Kila kichwa cha kizuizi huarifu nodi nyepesi kuhusu wathibitishaji gani wa kutarajia kutia sahihi kitalu _kijacho_, kwa hivyo haziwezi kudanganywa kuamini kikundi kibaya kinachojifanya kuwa kamati halisi ya usawazishaji.

Hata hivyo, nini kinatokea ikiwa mshambuliaji kwa namna fulani _atafanikiwa_ kupitisha kichwa cha kizuizi kibaya kwa viteja vyepesi na kuwashawishi kwamba kilitiwa sahihi na kamati ya usawazishaji ya uaminifu? Katika hali hiyo, mshambuliaji anaweza kujumuisha miamala batili na kiteja chepesi kitazikubali kwa upofu, kwani hazikagui kwa kujitegemea mabadiliko yote ya hali yaliyofupishwa katika kichwa cha kizuizi. Ili kujilinda dhidi ya hili, kiteja chepesi kinaweza kutumia ushahidi wa udanganyifu.

Njia ambayo ushahidi huu wa udanganyifu hufanya kazi ni kwamba nodi kamili, ikiona mabadiliko batili ya hali yakisambazwa kwenye mtandao, inaweza haraka kuzalisha kipande kidogo cha data kinachoonyesha kwamba mabadiliko ya hali yaliyopendekezwa hayawezi kutokea kutoka kwa seti fulani ya miamala na kutangaza data hiyo kwa wenzao. Nodi nyepesi zinaweza kuchukua ushahidi huo wa udanganyifu na kuutumia kutupa vichwa vibaya vya kizuizi, kuhakikisha zinabaki kwenye mnyororo huo huo wa uaminifu kama nodi kamili.

Hii inategemea nodi kamili kuwa na ufikiaji wa data kamili ya muamala. Mshambuliaji anayetangaza kichwa kibaya cha kizuizi na pia kushindwa kufanya data ya muamala ipatikane ataweza kuzuia nodi kamili kuzalisha ushahidi wa udanganyifu. Nodi kamili zinaweza kuashiria onyo kuhusu kitalu kibaya, lakini hazingeweza kuunga mkono onyo lao kwa ushahidi, kwa sababu data haikupatikana ili kuzalisha ushahidi kutoka kwayo!

Suluhisho la tatizo hili la upatikanaji wa data ni DAS. Nodi nyepesi hupakua vipande vidogo sana vya nasibu vya data kamili ya hali na kutumia sampuli kuthibitisha kuwa seti kamili ya data inapatikana. Uwezekano halisi wa kudhani kimakosa upatikanaji kamili wa data baada ya kupakua vipande N vya nasibu unaweza kukokotolewa ([kwa vipande 100 nafasi ni 10^-30](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html), yaani, haiwezekani sana).

Hata katika hali hii, mashambulizi yanayozuia baiti chache tu yanaweza kupita bila kutambuliwa na wateja wanaofanya maombi ya data ya nasibu. Usimbaji wa ufutaji hurekebisha hili kwa kujenga upya vipande vidogo vya data vinavyokosekana ambavyo vinaweza kutumika kuangalia mabadiliko ya hali yaliyopendekezwa. Ushahidi wa udanganyifu unaweza kisha kujengwa kwa kutumia data iliyojengwa upya, kuzuia nodi nyepesi kukubali vichwa vibaya.

**Kumbuka:** DAS na ushahidi wa udanganyifu bado hazijatekelezwa kwa viteja vyepesi vya Ethereum vya Uthibitisho wa Dau, lakini viko kwenye ramani ya njia, uwezekano mkubwa vikichukua fomu ya ushahidi unaotegemea ZK-SNARK. Viteja vyepesi vya leo vinategemea aina ya DAC: vinathibitisha utambulisho wa kamati ya usawazishaji na kisha kuamini vichwa vya kizuizi vilivyotiwa sahihi vinavyopokea.

## Upatikanaji wa data na mikusanyiko ya tabaka la 2 (l2) {#data-availability-and-layer-2-rollups}

[Suluhisho za kuongeza uwezo za tabaka la 2 (l2)](/layer-2/), kama vile [mikusanyiko](/glossary/#rollups), hupunguza gharama za muamala na kuongeza uwezo wa upitishaji wa Ethereum kwa kuchakata miamala nje ya mnyororo. Miamala ya rollup inabanwa na kuchapishwa kwenye Ethereum kwa makundi. Makundi yanawakilisha maelfu ya miamala ya mtu binafsi ya nje ya mnyororo katika muamala mmoja kwenye Ethereum. Hii inapunguza msongamano kwenye tabaka la msingi na kupunguza ada kwa watumiaji.

Hata hivyo, inawezekana tu kuamini miamala ya 'muhtasari' iliyochapishwa kwenye Ethereum ikiwa mabadiliko ya hali yaliyopendekezwa yanaweza kuthibitishwa kwa kujitegemea na kuthibitishwa kuwa matokeo ya kutumia miamala yote ya mtu binafsi ya nje ya mnyororo. Ikiwa waendeshaji wa rollup hawafanyi data ya muamala ipatikane kwa uthibitishaji huu, basi wanaweza kutuma data isiyo sahihi kwa Ethereum.

[Mikusanyiko yenye matumaini](/developers/docs/scaling/optimistic-rollups/) huchapisha data ya muamala iliyobanwa kwa Ethereum na kusubiri kwa muda fulani (kawaida siku 7) kuruhusu wathibitishaji huru kuangalia data. Ikiwa mtu yeyote atatambua tatizo, anaweza kuzalisha ushahidi wa udanganyifu na kuutumia kupinga rollup. Hii itasababisha mnyororo kurudi nyuma na kuacha kitalu batili. Hili linawezekana tu ikiwa data inapatikana. Kwa sasa, kuna njia mbili ambazo mikusanyiko yenye matumaini huchapisha data ya muamala kwa L1. Baadhi ya mikusanyiko hufanya data ipatikane kudumu kama `CALLDATA` ambayo huishi kudumu mnyororoni. Pamoja na utekelezaji wa EIP-4844, baadhi ya mikusanyiko huchapisha data yao ya muamala kwenye hifadhi ya blobu ya bei nafuu badala yake. Hii sio hifadhi ya kudumu. Wathibitishaji huru wanapaswa kuuliza mablobu na kuibua changamoto zao ndani ya siku ~18 kabla ya data kufutwa kutoka kwa tabaka la 1 (l1) la Ethereum. Upatikanaji wa data unahakikishwa tu na itifaki ya Ethereum kwa dirisha hilo fupi lililowekwa. Baada ya hapo, inakuwa jukumu la vyombo vingine katika mfumo wa ikolojia wa Ethereum. Nodi yoyote inaweza kuthibitisha upatikanaji wa data kwa kutumia DAS, yaani, kwa kupakua sampuli ndogo, za nasibu za data ya blobu.

[Mikusanyiko ya sifuri-maarifa (ZK)](/developers/docs/scaling/zk-rollups) haihitaji kuchapisha data ya muamala kwa kuwa [uthibitisho wa uhalali wa sifuri-maarifa](/glossary/#zk-proof) unahakikisha usahihi wa mabadiliko ya hali. Hata hivyo, upatikanaji wa data bado ni suala kwa sababu hatuwezi kuhakikisha utendakazi wa ZK-rollup (au kuingiliana nayo) bila ufikiaji wa data yake ya hali. Kwa mfano, watumiaji hawawezi kujua salio lao ikiwa mwendeshaji anazuia maelezo kuhusu hali ya rollup. Pia, hawawezi kufanya sasisho za hali kwa kutumia taarifa zilizomo katika kitalu kipya kilichoongezwa.

## Upatikanaji wa data dhidi ya urejeshaji wa data {#data-availability-vs-data-retrievability}

Upatikanaji wa data ni tofauti na urejeshaji wa data. Upatikanaji wa data ni hakikisho kwamba nodi kamili zimeweza kufikia na kuthibitisha seti kamili ya miamala inayohusishwa na kitalu maalum. Haimaanishi lazima kwamba data inapatikana milele.

Urejeshaji wa data ni uwezo wa nodi kurejesha _taarifa za kihistoria_ kutoka kwa mnyororo wa vitalu. Data hii ya kihistoria haihitajiki kwa kuthibitisha vitalu vipya, inahitajika tu kwa usawazishaji wa nodi kamili kutoka kwa kitalu cha asili au kuhudumia maombi maalum ya kihistoria.

Itifaki ya msingi ya Ethereum inahusika kimsingi na upatikanaji wa data, sio urejeshaji wa data. Urejeshaji wa data unaweza kutolewa na idadi ndogo ya nodi za kumbukumbu zinazoendeshwa na wahusika wengine, au inaweza kusambazwa kwenye mtandao kwa kutumia hifadhi ya faili iliyogatuliwa kama vile [Potal Netwoki](https://www.ethportal.net/).

## Usomaji zaidi {#further-reading}

- [Upatikanaji wa Data ni nini?](https://medium.com/blockchain-capital-blog/wtf-is-data-availability-80c2c95ded0f)
- [Upatikanaji wa Data ni Nini?](https://coinmarketcap.com/academy/article/what-is-data-availability)
- [Mwongozo wa ukaguzi wa upatikanaji wa data](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html)
- [Maelezo ya pendekezo la sharding + DAS](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dokezo kuhusu upatikanaji wa data na usimbaji wa ufutaji](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding#can-an-attacker-not-circumvent-this-scheme-by-releasing-a-full-unavailable-block-but-then-only-releasing-individual-bits-of-data-as-clients-query-for-them)
- [Kamati za upatikanaji wa data.](https://medium.com/starkware/data-availability-e5564c416424)
- [Kamati za upatikanaji wa data za Uthibitisho wa Dau.](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Suluhisho za tatizo la urejeshaji wa data](https://notes.ethereum.org/@vbuterin/data_sharding_roadmap#Who-would-store-historical-data-under-sharding)
- [Upatikanaji wa Data Au: Jinsi Mikusanyiko Ilivyojifunza Kuacha Kuwa na Wasiwasi na Kuipenda Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [EIP-7623: Kuongeza Gharama ya Data za Mwito](https://web.archive.org/web/20250515194659/https://research.2077.xyz/eip-7623-increase-calldata-cost)