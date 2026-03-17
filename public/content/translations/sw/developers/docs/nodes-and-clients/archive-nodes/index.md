---
title: Nodi ya Kumbukumbu ya Ethereum
description: Muhtasari wa nodi za kumbukumbu
lang: sw
sidebarDepth: 2
---

Nodi ya kumbukumbu ni mfano wa mteja wa Ethereum uliosanidiwa kujenga kumbukumbu ya hali zote za kihistoria. Ni zana muhimu kwa matumizi fulani lakini inaweza kuwa ngumu zaidi kuiendesha kuliko nodi kamili.

## Mahitaji ya awali {#prerequisites}

Unapaswa kuelewa dhana ya [nodi ya Ethereum](/developers/docs/nodes-and-clients/), [usanifu wake](/developers/docs/nodes-and-clients/node-architecture/), [mikakati ya kusawazisha](/developers/docs/nodes-and-clients/#sync-modes), mazoea ya [kuiendesha](/developers/docs/nodes-and-clients/run-a-node/) na [kuitumia](/developers/docs/apis/json-rpc/).

## Nodi ya kumbukumbu ni nini

Ili kuelewa umuhimu wa nodi ya kumbukumbu, hebu tufafanue dhana ya "hali". Ethereum inaweza kurejelewa kama _mashine ya hali inayotegemea muamala_. Inajumuisha akaunti na programu zinazotekeleza miamala ambayo inabadilisha hali zao. Data ya kimataifa yenye habari kuhusu kila akaunti na mkataba huhifadhiwa katika hifadhidata ya trie inayoitwa hali. Hii inashughulikiwa na mteja wa safu ya utekelezaji (EL) na inajumuisha:

- Salio za akaunti na nonces
- Msimbo wa mkataba na ghala
- Data inayohusiana na makubaliano, k.m., Mkataba wa Amana ya Kusimamisha

Ili kuingiliana na mtandao, kuhakiki na kutoa bloku mpya, wateja wa Ethereum wanapaswa kwenda sambamba na mabadiliko ya hivi karibuni (ncha ya mnyororo) na kwa hivyo hali ya sasa. Mteja wa safu ya utekelezaji aliyesanidiwa kama nodi kamili huhakiki na kufuata hali ya hivi karibuni ya mtandao lakini huhifadhi kwa muda hali chache zilizopita, k.m., hali inayohusishwa na bloku 128 za mwisho, ili iweze kushughulikia upangaji upya wa mnyororo na kutoa ufikiaji wa haraka kwa data ya hivi karibuni. Hali ya hivi karibuni ndiyo wateja wote wanahitaji ili kuhakiki miamala inayoingia na kutumia mtandao.

Unaweza kufikiria hali kama picha ya mtandao ya muda katika bloku fulani na kumbukumbu kama kurudia historia.

Hali za kihistoria zinaweza kupunguzwa kwa usalama kwa sababu si muhimu kwa mtandao kufanya kazi na ingekuwa ni kujirudia bila maana kwa mteja kuhifadhi data yote iliyopitwa na wakati. Hali zilizokuwepo kabla ya bloku fulani ya hivi karibuni (k.m., bloku 128 kabla ya ncha) kwa ufanisi hutupwa mbali. Nodi kamili huhifadhi tu data ya kihistoria ya mnyororo wa bloku (bloku na miamala) na picha za kihistoria za mara kwa mara ambazo zinaweza kutumika kuzalisha upya hali za zamani zinapohitajika. Hufanya hivi kwa kutekeleza upya miamala ya zamani katika EVM, jambo ambalo linaweza kuhitaji nguvu kubwa ya kukokotoa wakati hali inayotakiwa iko mbali na picha ya karibu zaidi.

Hata hivyo, hii inamaanisha kwamba kufikia hali ya kihistoria kwenye nodi kamili hutumia ukokotoaji mwingi. Mteja anaweza kuhitaji kutekeleza miamala yote ya zamani na kukokotoa hali moja ya kihistoria kutoka genesis. Nodi za kumbukumbu hutatua hili kwa kuhifadhi sio tu hali za hivi karibuni bali kila hali ya kihistoria iliyoundwa baada ya kila bloku. Kimsingi hufanya maelewano na hitaji kubwa zaidi la nafasi kwenye diski.

Ni muhimu kuzingatia kwamba mtandao hautegemei nodi za kumbukumbu kuhifadhi na kutoa data zote za kihistoria. Kama ilivyotajwa hapo juu, hali zote za mpito za kihistoria zinaweza kutolewa kwenye nodi kamili. Miamala huhifadhiwa na nodi yoyote kamili (kwa sasa chini ya 400G) na inaweza kurudiwa ili kujenga kumbukumbu nzima.

### Tumia kesi

Matumizi ya kawaida ya Ethereum kama vile kutuma miamala, kupeleka mikataba, kuhakiki makubaliano, n.k. hayahitaji ufikiaji wa hali za kihistoria. Watumiaji hawahitaji kamwe nodi ya kumbukumbu kwa maingiliano ya kawaida na mtandao.

Faida kuu ya kumbukumbu ya hali ni ufikiaji wa haraka wa maswali kuhusu hali za kihistoria. Kwa mfano, nodi ya kumbukumbu ingerejesha matokeo mara moja kama vile:

- _Akaunti 0x1337... ilikuwa na salio gani la ETH katika bloku 15537393?_
- _Je, salio la tokeni 0x ni nini katika mkataba 0x kwenye bloku 1920000?_

Kama ilivyoelezwa hapo juu, nodi kamili ingehitaji kuzalisha data hii kwa utekelezaji wa EVM ambao hutumia CPU na huchukua muda. Nodi za kumbukumbu huzifikia kwenye diski na hutoa majibu mara moja. Hiki ni kipengele muhimu kwa sehemu fulani za miundombinu, kwa mfano:

- Watoa huduma kama vile wachunguzi wa bloku
- Watafiti
- Wachambuzi wa usalama
- Wasanidi programu wa Dapp
- Ukaguzi na ufuataji

Kuna [huduma](/developers/docs/nodes-and-clients/nodes-as-a-service/) mbalimbali za bure ambazo pia huruhusu ufikiaji wa data ya kihistoria. Kwa vile inahitaji nguvu zaidi kuendesha nodi ya kumbukumbu, ufikiaji huu mara nyingi una mipaka na hufanya kazi tu kwa ufikiaji wa mara kwa mara. Ikiwa mradi wako unahitaji ufikiaji wa kila wakati wa data ya kihistoria, unapaswa kufikiria kuiendesha mwenyewe.

## Utekelezaji na matumizi

Nodi ya kumbukumbu katika muktadha huu inamaanisha data inayotolewa na wateja wa safu ya utekelezaji wanaomkabili mtumiaji wanaposhughulikia hifadhidata ya hali na kutoa sehemu za mwisho za JSON-RPC. Chaguo za usanidi, muda wa kusawazisha na ukubwa wa hifadhidata vinaweza kutofautiana kulingana na mteja. Kwa maelezo zaidi, tafadhali rejelea nyaraka zilizotolewa na mteja wako.

Kabla ya kuanzisha nodi yako mwenyewe ya kumbukumbu, jifunze kuhusu tofauti kati ya wateja na hasa [mahitaji mbalimbali ya maunzi](/developers/docs/nodes-and-clients/run-a-node/#requirements). Wateja wengi hawajaboreshwa kwa kipengele hiki na kumbukumbu zao zinahitaji zaidi ya 12TB ya nafasi. Kinyume chake, utekelezaji kama Erigon unaweza kuhifadhi data sawa katika chini ya 3TB jambo ambalo huwafanya kuwa njia bora zaidi ya kuendesha nodi ya kumbukumbu.

## Mazoea yaliyopendekezwa

Mbali na [mapendekezo ya jumla ya kuendesha nodi](/developers/docs/nodes-and-clients/run-a-node/), nodi ya kumbukumbu inaweza kuhitaji zaidi upande wa maunzi na matengenezo. Kwa kuzingatia [vipengele muhimu](https://github.com/ledgerwatch/erigon#key-features) vya Erigon, njia inayofaa zaidi ni kutumia utekelezaji wa mteja wa [Erigon](/developers/docs/nodes-and-clients/#erigon).

### Vifaa

Daima hakikisha unahakiki mahitaji ya maunzi kwa hali fulani katika nyaraka za mteja.
Hitaji kubwa zaidi kwa nodi za kumbukumbu ni nafasi ya diski. Kulingana na mteja, inatofautiana kutoka 3TB hadi 12TB. Hata kama HDD inaweza kuchukuliwa kuwa suluhisho bora kwa kiasi kikubwa cha data, kuisawazisha na kusasisha mara kwa mara ncha ya mnyororo itahitaji diski za SSD. Diski za [SATA](https://www.cleverfiles.com/help/sata-hard-drive.html) zinatosha lakini zinapaswa kuwa za ubora wa kuaminika, angalau [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences). Diski zinaweza kuwekwa kwenye kompyuta ya mezani au seva yenye nafasi za kutosha. Vifaa maalum kama hivyo ni bora kwa kuendesha nodi yenye muda mrefu wa kufanya kazi. Inawezekana kabisa kuiendesha kwenye laptop lakini uwezo wa kuhamishika utakuja na gharama ya ziada.

Data yote inahitaji kutoshea kwenye gombo moja, kwa hivyo diski zinapaswa kuunganishwa, k.m., na [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) au LVM. Inaweza pia kufaa kufikiria kutumia [ZFS](https://en.wikipedia.org/wiki/ZFS) kwani inasaidia "Nakili-wakati-wa-kuandika" ambayo inahakikisha data inaandikwa kwa usahihi kwenye diski bila makosa yoyote ya kiwango cha chini.

Kwa uthabiti na usalama zaidi katika kuzuia uharibifu wa hifadhidata kwa bahati mbaya, hasa katika usanidi wa kitaalamu, fikiria kutumia [memori ya ECC](https://en.wikipedia.org/wiki/ECC_memory) ikiwa mfumo wako unaiunga mkono. Ukubwa wa RAM kwa ujumla unashauriwa kuwa sawa na ule wa nodi kamili lakini RAM zaidi inaweza kusaidia kuharakisha usawazishaji.

Wakati wa usawazishaji wa awali, wateja katika hali ya kumbukumbu watatekeleza kila muamala tangu genesis. Kasi ya utekelezaji mara nyingi hupunguzwa na CPU, hivyo CPU ya haraka zaidi inaweza kusaidia na muda wa usawazishaji wa awali. Kwenye kompyuta ya kawaida ya mtumiaji, usawazishaji wa awali unaweza kuchukua hadi mwezi mmoja.

## Masomo zaidi {#further-reading}

- [Nodi Kamili ya Ethereum dhidi ya Nodi ya Kumbukumbu](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) - _QuickNode, Septemba 2022_
- [Kujenga Nodi Yako Mwenyewe ya Kumbukumbu ya Ethereum](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) - _Thomas Jay Rush, Agosti 2021_
- [Jinsi ya kusanidi Erigon, RPC ya Erigon na TrueBlocks (scrape na API) kama huduma](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson, ilisasishwa Septemba 2022_

## Mada zinazohusiana {#related-topics}

- [Nodi na wateja](/developers/docs/nodes-and-clients/)
- [Kuendesha nodi](/developers/docs/nodes-and-clients/run-a-node/)
