---
title: Uwepo wa data
description: Muhtasari wa matatizo na suluhu zinazohusiana na upatikanaji wa data katika Ethereum
lang: sw
---

"Usiamini, thibitisha" ni kauli mbiu ya kawaida katika Ethereum. Wazo ni kwamba nodi yako inaweza kuthibitisha kwa kujitegemea kuwa taarifa inayopokea ni sahihi kwa kutekeleza miamala yote katika bloku inazopokea kutoka kwa rika ili kuhakikisha kuwa mabadiliko yaliyopendekezwa yanalingana hasa na yale yaliyokokotolewa kwa kujitegemea na nodi. Hii inamaanisha nodi hazilazimiki kuamini kwamba watumaji wa bloku ni waaminifu. Hii haiwezekani ikiwa data haipo.

**Upatikanaji wa data** unarejelea ujasiri ambao mtumiaji anaweza kuwa nao kwamba data inayohitajika kuthibitisha bloku inapatikana kweli kwa washiriki wote wa mtandao. Kwa nodi kamili kwenye safu ya 1 ya Ethereum hii ni rahisi kiasi; nodi kamili hupakua nakala ya data zote katika kila bloku - data _lazima_ iwepo ili upakuaji uwezekane. Bloku yenye data isiyokamilika itatupwa badala ya kuongezwa kwenye mnyororo wa bloku. Huu ni "upatikanaji wa data kwenye mnyororo" na ni hulka ya minyororo ya bloku ya monolithic. Nodi kamili haziwezi kudanganywa kukubali miamala batili kwa sababu zinapakua na kutekeleza kila muamala zenyewe. Hata hivyo, kwa minyororo ya bloku ya modula, unda-mpya za safu ya 2 na wateja wepesi, mandhari ya upatikanaji wa data ni changamano zaidi, inayohitaji taratibu za uthibitishaji za kisasa zaidi.

## Mahitaji ya awali {#prerequisites}

Unapaswa kuwa na uelewa mzuri wa [misingi ya mnyororo wa bloku](/developers/docs/intro-to-ethereum/), hasa [taratibu za makubaliano](/developers/docs/consensus-mechanisms/). Ukurasa huu pia unachukulia kuwa msomaji anafahamu [bloku](/developers/docs/blocks/), [miamala](/developers/docs/transactions/), [nodi](/developers/docs/nodes-and-clients/), [suluhisho za uongezwaji](/developers/docs/scaling/), na mada nyingine muhimu.

## Tatizo la upatikanaji wa data {#the-data-availability-problem}

Tatizo la upatikanaji wa data ni hitaji la kuthibitisha kwa mtandao mzima kuwa muhtasari wa data fulani ya muamala unaoongezwa kwenye mnyororo wa bloku unawakilisha kweli seti ya miamala halali, lakini kufanya hivyo bila kuhitaji nodi zote kupakua data zote. Data kamili ya muamala ni muhimu kwa ajili ya kuthibitisha bloku kwa kujitegemea, lakini kuhitaji nodi zote kupakua data yote ya muamala ni kizuizi kwa uongezwaji. Suluhisho za tatizo la upatikanaji wa data zinalenga kutoa uhakikisho wa kutosha kwamba data kamili ya muamala ilipatikana kwa ajili ya uthibitishaji kwa washiriki wa mtandao ambao hawapakui na kuhifadhi data wenyewe.

[Nodi nyepesi](/developers/docs/nodes-and-clients/light-clients) na [unda-mpya za safu ya 2](/developers/docs/scaling) ni mifano muhimu ya washiriki wa mtandao wanaohitaji uhakikisho thabiti wa upatikanaji wa data lakini hawawezi kupakua na kuchakata data ya muamala wao wenyewe. Kuepuka kupakua data ya muamala ndiko kunakofanya nodi nyepesi ziwe nyepesi na kuwezesha unda-mpya kuwa suluhisho bora za uongezwaji.

Upatikanaji wa data pia ni jambo la muhimu sana kwa wateja wa Ethereum wa siku zijazo ["wasiokuwa na hali"](/roadmap/statelessness) ambao hawahitaji kupakua na kuhifadhi data ya hali ili kuthibitisha bloku. Wateja wasiokuwa na hali bado wanahitaji kuwa na uhakika kwamba data inapatikana _mahali fulani_ na kwamba imechakatwa ipasavyo.

## Suluhisho za upatikanaji wa data {#data-availability-solutions}

### Sampuli ya upatikanaji wa data (DAS) {#data-availability-sampling}

Sampuli ya Upatikanaji wa Data (DAS) ni njia ya mtandao kuangalia kama data inapatikana bila kuweka mkazo mwingi kwenye nodi yoyote binafsi. Kila nodi (ikiwa ni pamoja na nodi zisizohusisha hisa) hupakua sehemu ndogo, iliyochaguliwa kwa nasibu ya jumla ya data. Kufanikiwa kupakua sampuli kunathibitisha kwa ujasiri mkubwa kwamba data yote inapatikana. Hii inategemea uwekaji msimbo wa kufuta data, ambao huongeza seti fulani ya data na taarifa za ziada (njia hii inafanywa ni kwa kutoshea kazi inayojulikana kama _polynomial_ juu ya data na kutathmini polynomial hiyo katika nukta za ziada). Hii inaruhusu data asili kurejeshwa kutoka kwa data ya ziada inapohitajika. Matokeo ya uundaji huu wa data ni kwamba ikiwa _yoyote_ ya data asili haipatikani, _nusu_ ya data iliyopanuliwa itakosekana! Kiasi cha sampuli za data zilizopakuliwa na kila nodi kinaweza kurekebishwa ili iwe _uwezekano mkubwa sana_ kwamba angalau moja ya vipande vya data vilivyosampuliwa na kila mteja vitakosekana _ikiwa_ chini ya nusu ya data inapatikana kweli.

DAS itatumika kuhakikisha waendeshaji wa unda-mpya wanafanya data zao za miamala zipatikane baada ya [Full Danksharding](/roadmap/danksharding/#what-is-danksharding) kutekelezwa. Nodi za Ethereum zitatwaa sampuli nasibu za data ya muamala iliyotolewa katika blops kwa kutumia mpango wa upungufu ulioelezwa hapo juu ili kuhakikisha kuwa data yote ipo. Mbinu hiyo hiyo inaweza pia kutumika kuhakikisha wazalishaji wa bloku wanafanya data zao zote zipatikane kwa wateja wepesi salama. Vile vile, chini ya [utenganishaji wa mpendekezaji-mjengaji](/roadmap/pbs), ni mjengaji wa bloku tu ndiye angehitajika kuchakata bloku nzima - wathibitishaji wengine wangethibitisha kwa kutumia sampuli ya upatikanaji wa data.

### Kamati za upatikanaji wa data {#data-availability-committees}

Kamati za Upatikanaji wa Data (DACs) ni pande zinazoaminika ambazo hutoa, au kuthibitisha, upatikanaji wa data. DAC zinaweza kutumika badala ya, [au kwa pamoja na](https://hackmd.io/@vbuterin/sharding_proposal#Why-not-use-just-committees-and-not-DAS) DAS. Dhamana za usalama zinazokuja na kamati hutegemea usanidi mahususi. Ethereum hutumia seti ndogo za sampuli nasibu za wathibitishaji ili kuthibitisha upatikanaji wa data kwa nodi nyepesi, kwa mfano.

DACs pia hutumiwa na baadhi ya validiums. DAC ni seti inayoaminika ya nodi zinazohifadhi nakala za data nje ya mtandao. DAC inatakiwa kufanya data ipatikane endapo kutatokea mzozo. Wanachama wa DAC pia huchapisha uthibitishaji kwenye mnyororo ili kuthibitisha kwamba data iliyosemwa inapatikana kweli. Baadhi ya validiums hubadilisha DACs na mfumo wa mthibitishaji wa uthibitisho wa hisa (PoS). Hapa, mtu yeyote anaweza kuwa mthibitishaji na kuhifadhi data nje ya mnyororo. Hata hivyo, lazima watoe "dhamana", ambayo huwekwa katika mkataba-erevu. Katika tukio la tabia hasidi, kama vile mthibitishaji kuzuia data, dhamana inaweza kupunguzwa. Kamati za upatikanaji wa data za uthibitisho wa hisa ni salama zaidi kuliko DACs za kawaida kwa sababu zinahamasisha moja kwa moja tabia ya uaminifu.

## Upatikanaji wa data na nodi nyepesi {#data-availability-and-light-nodes}

[Nodi nyepesi](/developers/docs/nodes-and-clients/light-clients) zinahitaji kuthibitisha usahihi wa vichwa vya bloku wanazopokea bila kupakua data ya bloku. Gharama ya wepesi huu ni kutokuwa na uwezo wa kuthibitisha vichwa vya bloku kwa kujitegemea kwa kutekeleza tena miamala ndani ya nchi kama vile nodi kamili zinavyofanya.

Nodi nyepesi za Ethereum huamini seti nasibu za wathibitishaji 512 ambao wamepewa _kamati ya usawazishaji_. Kamati ya usawazishaji hufanya kama DAC inayoashiria kwa wateja wepesi kwamba data iliyo kwenye kichwa ni sahihi kwa kutumia saini ya kriptografia. Kila siku, kamati ya usawazishaji hujiburudisha. Kila kichwa cha bloku huwaonya nodi nyepesi kuhusu wathibitishaji gani wa kutarajia kutia sahihi bloku _inayofuata_, kwa hivyo hawawezi kudanganywa na kuamini kundi hasidi linalojifanya kuwa kamati halisi ya usawazishaji.

Hata hivyo, nini kitatokea ikiwa mshambuliaji kwa namna fulani _atafaulu_ kupitisha kichwa cha bloku hasidi kwa wateja wepesi na kuwashawishi kwamba kilitiwa saini na kamati ya usawazishaji ya uaminifu? Katika hali hiyo, mshambuliaji anaweza kujumuisha miamala batili na mteja mwepesi angewakubali bila kuangalia, kwani hawaangalii kwa kujitegemea mabadiliko yote ya hali yaliyofupishwa katika kichwa cha bloku. Ili kujilinda dhidi ya hili, mteja mwepesi anaweza kutumia ushahidi wa ulaghai.

Jinsi ushahidi huu wa ulaghai unavyofanya kazi ni kwamba nodi kamili, ikiona mabadiliko batili ya hali yakienezwa kwenye mtandao, inaweza kutoa haraka kipande kidogo cha data kinachoonyesha kwamba mpito wa hali uliopendekezwa hauwezi kutokana na seti fulani ya miamala na kutangaza data hiyo kwa rika. Nodi nyepesi zinaweza kuchukua ushahidi huo wa ulaghai na kuutumia kutupa vichwa vibaya vya bloku, na kuhakikisha zinabaki kwenye mnyororo uleule wa uaminifu kama nodi kamili.

Hii inategemea nodi kamili kuwa na ufikiaji wa data kamili ya muamala. Mshambuliaji anayetangaza kichwa kibaya cha bloku na pia akashindwa kufanya data ya muamala ipatikane ataweza kuzuia nodi kamili kutoa ushahidi wa ulaghai. Nodi kamili zinaweza kuashiria onyo kuhusu bloku mbaya, lakini hazikuweza kuunga mkono onyo lao kwa ushahidi, kwa sababu data haikupatikana ili kutoa ushahidi kutoka kwayo!

Suluhisho la tatizo hili la upatikanaji wa data ni DAS. Nodi nyepesi hupakua vipande vidogo sana vya nasibu vya data kamili ya hali na hutumia sampuli kuthibitisha kwamba seti kamili ya data inapatikana. Uwezekano halisi wa kudhania kimakosa upatikanaji kamili wa data baada ya kupakua vipande N vya nasibu unaweza kukokotolewa ([kwa vipande 100 nafasi ni 10^-30](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html), yaani, haiwezekani sana).

Hata katika hali hii, mashambulizi yanayozuia baiti chache tu yanaweza yasigunduliwe na wateja wanaofanya maombi ya data nasibu. Uwekaji msimbo wa kufuta hurekebisha hili kwa kuunda upya vipande vidogo vya data vilivyokosekana ambavyo vinaweza kutumika kuangalia mabadiliko ya hali yaliyopendekezwa. Ushahidi wa ulaghai unaweza kisha kujengwa kwa kutumia data iliyojengwa upya, na kuzuia nodi nyepesi kukubali vichwa vibaya.

**Kumbuka:** DAS na ushahidi wa ulaghai bado hazijatekelezwa kwa wateja wepesi wa Ethereum wa uthibitisho wa hisa, lakini ziko kwenye ramani ya njia, na kuna uwezekano mkubwa zitakuwa katika mfumo wa ithibati za ZK-SNARK. Wateja wepesi wa leo wanategemea aina ya DAC: wanathibitisha utambulisho wa kamati ya usawazishaji na kisha kuamini vichwa vya bloku vilivyotiwa saini wanavyopokea.

## Upatikanaji wa data na unda-mpya za safu ya 2 {#data-availability-and-layer-2-rollups}

[Suluhisho za uongezwaji wa safu ya 2](/layer-2/), kama vile [unda-mpya](/glossary/#rollups), hupunguza gharama za muamala na kuongeza upitishaji wa Ethereum kwa kuchakata miamala nje ya mnyororo. Miamala ya unda-mpya hubanwa na kuwekwa kwenye Ethereum kwa makundi. Makundi huwakilisha maelfu ya miamala ya mtu binafsi ya nje ya mnyororo katika muamala mmoja kwenye Ethereum. Hii inapunguza msongamano kwenye safu ya msingi na kupunguza ada kwa watumiaji.

Hata hivyo, inawezekana tu kuamini miamala ya 'muhtasari' iliyotumwa kwa Ethereum ikiwa mabadiliko ya hali yaliyopendekezwa yanaweza kuthibitishwa kwa kujitegemea na kuthibitishwa kuwa ni matokeo ya kutumia miamala yote ya mtu binafsi ya nje ya mnyororo. Ikiwa waendeshaji wa unda-mpya hawatoi data ya muamala kwa uthibitisho huu, basi wanaweza kutuma data isiyo sahihi kwa Ethereum.

[Optimistic rollups](/developers/docs/scaling/optimistic-rollups/) huweka data ya muamala iliyobanwa kwenye Ethereum na kusubiri kwa kiasi fulani cha muda (kawaida siku 7) ili kuruhusu wathibitishaji huru kuangalia data. Ikiwa mtu yeyote atatambua tatizo, anaweza kutoa ushahidi wa ulaghai na kuutumia kupinga unda-mpya. Hii ingesababisha mnyororo kurejea nyuma na kuacha bloku batili. Hii inawezekana tu ikiwa data inapatikana. Hivi sasa, kuna njia mbili ambazo optimistic rollups huweka data ya muamala kwa L1. Baadhi ya unda-mpya hufanya data ipatikane kabisa kama `CALLDATA` ambayo huishi kabisa kwenye mnyororo. Kwa utekelezaji wa EIP-4844, baadhi ya unda-mpya huweka data zao za muamala kwenye ghala la blob la bei nafuu badala yake. Hili si ghala la kudumu. Wathibitishaji huru wanapaswa kuuliza blob na kuwasilisha changamoto zao ndani ya ~siku 18 kabla data haijafutwa kutoka kwa safu-1 ya Ethereum. Upatikanaji wa data umehakikishwa tu na itifaki ya Ethereum kwa dirisha hilo fupi lililowekwa. Baada ya hapo, inakuwa jukumu la vyombo vingine katika mfumo ikolojia wa Ethereum. Nodi yoyote inaweza kuthibitisha upatikanaji wa data kwa kutumia DAS, yaani, kwa kupakua sampuli ndogo, za nasibu za data ya blob.

[Unda-mpya za Zero-knowledge (ZK)](/developers/docs/scaling/zk-rollups) hazihitaji kuweka data ya muamala kwani [uthibitisho wa uhalali wa zero-knowledge](/glossary/#zk-proof) huhakikisha usahihi wa mabadiliko ya hali. Hata hivyo, upatikanaji wa data bado ni suala kwa sababu hatuwezi kuhakikisha utendaji wa unda-mpya ya ZK (au kuingiliana nayo) bila kupata data yake ya hali. Kwa mfano, watumiaji hawawezi kujua salio lao ikiwa mwendeshaji atazuia maelezo kuhusu hali ya unda-mpya. Pia, hawawezi kufanya masasisho ya hali kwa kutumia taarifa zilizomo kwenye bloku mpya iliyoongezwa.

## Upatikanaji wa data dhidi ya urejeshaji wa data {#data-availability-vs-data-retrievability}

Upatikanaji wa data ni tofauti na urejeshaji wa data. Upatikanaji wa data ni uhakikisho kwamba nodi kamili zimeweza kufikia na kuthibitisha seti kamili ya miamala inayohusishwa na bloku maalum. Haimaanishi kwamba data itapatikana milele.

Urejeshaji wa data ni uwezo wa nodi kurejesha _taarifa za kihistoria_ kutoka kwenye mnyororo wa bloku. Data hii ya kihistoria haihitajiki kwa ajili ya kuthibitisha bloku mpya, inahitajika tu kwa ajili ya kusawazisha nodi kamili kutoka kwenye bloku ya jenesisi au kutoa maombi maalum ya kihistoria.

Itifaki ya msingi ya Ethereum inahusika hasa na upatikanaji wa data, sio urejeshaji wa data. Urejeshaji wa data unaweza kutolewa na idadi ndogo ya nodi za kumbukumbu zinazoendeshwa na wahusika wengine, au unaweza kusambazwa kwenye mtandao kwa kutumia hifadhi ya faili iliyogatuliwa kama vile [Mtandao wa Portal](https://www.ethportal.net/).

## Masomo zaidi {#further-reading}

- [Upatikanaji wa Data ni Nini Hasa?](https://medium.com/blockchain-capital-blog/wtf-is-data-availability-80c2c95ded0f)
- [Upatikanaji wa Data ni Nini?](https://coinmarketcap.com/academy/article/what-is-data-availability)
- [Utangulizi wa ukaguzi wa upatikanaji wa data](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html)
- [Maelezo ya pendekezo la ugawanyaji + DAS](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dokezo juu ya upatikanaji wa data na uwekaji msimbo wa kufuta](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding#can-an-attacker-not-circumvent-this-scheme-by-releasing-a-full-unavailable-block-but-then-only-releasing-individual-bits-of-data-as-clients-query-for-them)
- [Kamati za upatikanaji wa data.](https://medium.com/starkware/data-availability-e5564c416424)
- [Kamati za upatikanaji wa data za uthibitisho wa hisa.](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Suluhisho za tatizo la urejeshaji wa data](https://notes.ethereum.org/@vbuterin/data_sharding_roadmap#Who-would-store-historical-data-under-sharding)
- [Upatikanaji wa Data au: Jinsi Unda-mpya zilivyojifunza Kuacha Kuhangaika na Kuipenda Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [EIP-7623: Kuongeza Gharama ya Calldata](https://web.archive.org/web/20250515194659/https://research.2077.xyz/eip-7623-increase-calldata-cost)
