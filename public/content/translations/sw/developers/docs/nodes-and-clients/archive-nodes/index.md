---
title: Nodi ya Kumbukumbu ya Ethereum
description: Muhtasari wa nodi za kumbukumbu
lang: sw
sidebarDepth: 2
---

Nodi ya kumbukumbu ni mfano wa mteja wa [Ethereum](/) aliyesanidiwa kujenga kumbukumbu ya hali zote za kihistoria. Ni zana muhimu kwa matumizi fulani lakini inaweza kuwa ngumu zaidi kuiendesha kuliko nodi kamili.

## Mahitaji ya awali {#prerequisites}

Unapaswa kuelewa dhana ya [nodi ya Ethereum](/developers/docs/nodes-and-clients/), [usanifu wake](/developers/docs/nodes-and-clients/node-architecture/), [mikakati ya usawazishaji](/developers/docs/nodes-and-clients/#sync-modes), mbinu za [kuziendesha](/developers/docs/nodes-and-clients/run-a-node/) na [kuzitumia](/developers/docs/apis/json-rpc/).

## Nodi ya kumbukumbu ni nini {#what-is-an-archive-node}

Ili kuelewa umuhimu wa nodi ya kumbukumbu, hebu tufafanue dhana ya "hali." Ethereum inaweza kurejelewa kama _mashine ya hali inayotegemea miamala_. Inajumuisha akaunti na programu zinazotekeleza miamala ambayo inabadilisha hali zao. Data ya kimataifa yenye taarifa kuhusu kila akaunti na mkataba inahifadhiwa katika hifadhidata ya trie inayoitwa hali. Hili linashughulikiwa na mteja wa tabaka la utekelezaji (EL) na inajumuisha:

- Salio la akaunti na nonces
- Msimbo wa mkataba na hifadhi
- Data inayohusiana na mwafaka, k.m., Mkataba wa Amana ya Uwekaji Dhamana

Ili kuingiliana na mtandao, kuthibitisha na kuzalisha vitalu vipya, wateja wa Ethereum wanapaswa kuendana na mabadiliko ya hivi karibuni (ncha ya mnyororo) na hivyo hali ya sasa. Mteja wa tabaka la utekelezaji aliyesanidiwa kama nodi kamili huthibitisha na kufuata hali ya hivi karibuni ya mtandao lakini huhifadhi tu hali chache zilizopita, k.m., hali inayohusishwa na vitalu 128 vya mwisho, ili aweze kushughulikia upangaji upya wa mnyororo na kutoa ufikiaji wa haraka wa data ya hivi karibuni. Hali ya hivi karibuni ndiyo wateja wote wanahitaji ili kuthibitisha miamala inayoingia na kutumia mtandao.

Unaweza kufikiria hali kama picha ya muda ya mtandao kwenye kitalu fulani na kumbukumbu kama marudio ya historia.

Hali za kihistoria zinaweza kupunguzwa kwa usalama kwa sababu si lazima kwa mtandao kufanya kazi na itakuwa ni marudio yasiyo na maana kwa mteja kuweka data zote zilizopitwa na wakati. Hali zilizokuwepo kabla ya kitalu fulani cha hivi karibuni (k.m., vitalu 128 kabla ya kichwa) hutupwa mbali. Nodi kamili huweka tu data ya kihistoria ya mnyororo wa vitalu (vitalu na miamala) na picha za kihistoria za mara kwa mara wanazoweza kutumia kuzalisha upya hali za zamani wanapoomba. Wanafanya hivi kwa kutekeleza upya miamala iliyopita katika EVM, ambayo inaweza kuhitaji nguvu kubwa ya kompyuta wakati hali inayohitajika iko mbali na picha ya karibu zaidi.

Hata hivyo, hii inamaanisha kuwa kufikia hali ya kihistoria kwenye nodi kamili hutumia nguvu nyingi za kompyuta. Mteja anaweza kuhitaji kutekeleza miamala yote iliyopita na kukokotoa hali moja ya kihistoria kutoka mwanzo (genesis). Nodi za kumbukumbu hutatua hili kwa kuhifadhi si tu hali za hivi karibuni bali kila hali ya kihistoria iliyoundwa baada ya kila kitalu. Kimsingi inafanya maelewano na hitaji kubwa la nafasi ya diski.

Ni muhimu kutambua kwamba mtandao hautegemei nodi za kumbukumbu kuweka na kutoa data zote za kihistoria. Kama ilivyotajwa hapo juu, hali zote za mpito za kihistoria zinaweza kupatikana kwenye nodi kamili. Miamala inahifadhiwa na nodi yoyote kamili (kwa sasa chini ya 400G) na inaweza kurudiwa ili kujenga kumbukumbu nzima.

### Matumizi {#use-cases}

Matumizi ya kawaida ya Ethereum kama vile kutuma miamala, kusambaza mikataba, kuthibitisha mwafaka, n.k. hayahitaji ufikiaji wa hali za kihistoria. Watumiaji hawahitaji kamwe nodi ya kumbukumbu kwa mwingiliano wa kawaida na mtandao.

Faida kuu ya kumbukumbu ya hali ni ufikiaji wa haraka wa maswali kuhusu hali za kihistoria. Kwa mfano, nodi ya kumbukumbu itarudisha matokeo mara moja kama vile:

- _Salio la ETH la akaunti 0x1337... lilikuwa kiasi gani kwenye kitalu 15537393?_
- _Salio la tokeni 0x katika mkataba 0x ni kiasi gani kwenye kitalu 1920000?_

Kama ilivyoelezwa hapo juu, nodi kamili ingehitaji kuzalisha data hii kwa utekelezaji wa EVM ambao hutumia CPU na kuchukua muda. Nodi za kumbukumbu huzifikia kwenye diski na kutoa majibu mara moja. Hiki ni kipengele muhimu kwa sehemu fulani za miundombinu, kwa mfano:

- Watoa huduma kama wachunguzi wa vitalu (block explorers)
- Watafiti
- Wachambuzi wa usalama
- Wasanidi wa programu tumizi iliyogatuliwa (dapp)
- Ukaguzi na uzingatiaji

Kuna [huduma](/developers/docs/nodes-and-clients/nodes-as-a-service/) mbalimbali za bure ambazo pia zinaruhusu ufikiaji wa data ya kihistoria. Kwa kuwa inahitaji nguvu zaidi kuendesha nodi ya kumbukumbu, ufikiaji huu mara nyingi una kikomo na hufanya kazi tu kwa ufikiaji wa mara kwa mara. Ikiwa mradi wako unahitaji ufikiaji wa mara kwa mara wa data ya kihistoria, unapaswa kufikiria kujiendeshea yako mwenyewe.

## Utekelezaji na matumizi {#implementations-and-usage}

Nodi ya kumbukumbu katika muktadha huu inamaanisha data inayotolewa na wateja wa tabaka la utekelezaji wanaokabiliana na mtumiaji wanaposhughulikia hifadhidata ya hali na kutoa vituo vya mwisho vya JSON-RPC. Chaguzi za usanidi, muda wa usawazishaji na ukubwa wa hifadhidata zinaweza kutofautiana kulingana na mteja. Kwa maelezo, tafadhali rejelea nyaraka zilizotolewa na mteja wako.

Kabla ya kuanzisha nodi yako ya kumbukumbu, jifunze kuhusu tofauti kati ya wateja na hasa [mahitaji mbalimbali ya maunzi](/developers/docs/nodes-and-clients/run-a-node/#requirements). Wateja wengi hawajaboreshwa kwa kipengele hiki na kumbukumbu zao zinahitaji zaidi ya 12TB ya nafasi. Kinyume chake, utekelezaji kama Erigon unaweza kuhifadhi data sawa katika chini ya 3TB ambayo inawafanya kuwa njia bora zaidi ya kuendesha nodi ya kumbukumbu.

## Mapendekezo ya vitendo {#recommended-practices}

Mbali na [mapendekezo ya jumla ya kuendesha nodi](/developers/docs/nodes-and-clients/run-a-node/), nodi ya kumbukumbu inaweza kuhitaji zaidi kwenye maunzi na matengenezo. Kwa kuzingatia [vipengele muhimu](https://github.com/ledgerwatch/erigon#key-features) vya Erigon, mbinu ya vitendo zaidi ni kutumia utekelezaji wa mteja wa [Erigon](/developers/docs/nodes-and-clients/#erigon).

### Maunzi {#hardware}

Hakikisha kila wakati unathibitisha mahitaji ya maunzi kwa hali fulani katika nyaraka za mteja.
Hitaji kubwa zaidi kwa nodi za kumbukumbu ni nafasi ya diski. Kulingana na mteja, inatofautiana kutoka 3TB hadi 12TB. Hata kama HDD inaweza kuchukuliwa kuwa suluhisho bora kwa kiasi kikubwa cha data, kuisawazisha na kusasisha mara kwa mara kichwa cha mnyororo itahitaji diski za SSD. Diski za [SATA](https://www.cleverfiles.com/help/sata-hard-drive.html) ni nzuri vya kutosha lakini zinapaswa kuwa za ubora wa kuaminika, angalau [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences). Diski zinaweza kuwekwa kwenye kompyuta ya mezani au seva yenye nafasi za kutosha. Vifaa kama hivyo vilivyojitolea ni bora kwa kuendesha nodi yenye muda mwingi wa kufanya kazi. Inawezekana kabisa kuiendesha kwenye kompyuta mpakato lakini uwezo wa kubebeka utakuja kwa gharama ya ziada.

Data yote inahitaji kutoshea katika kiasi kimoja, kwa hivyo diski zinapaswa kuunganishwa, k.m., na [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) au LVM. Inaweza pia kuwa na thamani ya kufikiria kutumia [ZFS](https://en.wikipedia.org/wiki/ZFS) kwani inasaidia "Copy-on-write" ambayo inahakikisha data imeandikwa kwa usahihi kwenye diski bila makosa yoyote ya kiwango cha chini.

Kwa uthabiti na usalama zaidi katika kuzuia uharibifu wa hifadhidata kwa bahati mbaya, hasa katika usanidi wa kitaalamu, fikiria kutumia [kumbukumbu ya ECC](https://en.wikipedia.org/wiki/ECC_memory) ikiwa mfumo wako unaiunga mkono. Ukubwa wa RAM kwa ujumla unashauriwa kuwa sawa na wa nodi kamili lakini RAM zaidi inaweza kusaidia kuharakisha usawazishaji.

Wakati wa usawazishaji wa awali, wateja katika hali ya kumbukumbu watatekeleza kila muamala tangu mwanzo (genesis). Kasi ya utekelezaji mara nyingi inazuiwa na CPU, kwa hivyo CPU yenye kasi inaweza kusaidia kwa muda wa usawazishaji wa awali. Kwenye kompyuta ya wastani ya mtumiaji, usawazishaji wa awali unaweza kuchukua hadi mwezi mmoja.

## Usomaji zaidi {#further-reading}

- [Nodi Kamili ya Ethereum dhidi ya Nodi ya Kumbukumbu](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) - _QuickNode, Septemba 2022_
- [Kujenga Nodi Yako Mwenyewe ya Kumbukumbu ya Ethereum](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) - _Thomas Jay Rush, Agosti 2021_
- [Jinsi ya kusanidi Erigon, RPC ya Erigon na TrueBlocks (scrape na API) kama huduma](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson, ilisasishwa Septemba 2022_

## Mada zinazohusiana {#related-topics}

- [Nodi na wateja](/developers/docs/nodes-and-clients/)
- [Kuendesha nodi](/developers/docs/nodes-and-clients/run-a-node/)