---
title: Kuthibitisha mikataba mahiri
description: Muhtasari wa uthibitishaji wa msimbo chanzo kwa mikataba mahiri ya Ethereum
lang: sw
---

[Mikataba mahiri](/developers/docs/smart-contracts/) imeundwa kuwa "bila hitaji la uaminifu", ikimaanisha watumiaji hawapaswi kuamini wahusika wengine (k.m., wasanidi na kampuni) kabla ya kuingiliana na mkataba. Kama sharti la hali ya kutohitaji kuamini, watumiaji na wasanidi wengine lazima waweze kuthibitisha msimbo chanzo wa mkataba mahiri. Uthibitishaji wa msimbo chanzo unawahakikishia watumiaji na wasanidi kwamba msimbo wa mkataba uliochapishwa ni msimbo uleule unaoendeshwa kwenye anwani ya mkataba kwenye mnyororo wa vitalu wa Ethereum.

Ni muhimu kutofautisha kati ya "uthibitishaji wa msimbo chanzo" na "[uthibitishaji rasmi](/developers/docs/smart-contracts/formal-verification/)". Uthibitishaji wa msimbo chanzo, ambao utaelezwa kwa kina hapa chini, unarejelea kuthibitisha kwamba msimbo chanzo uliotolewa wa mkataba mahiri katika lugha ya kiwango cha juu (k.m., Solidity) unakusanywa kuwa msimbo wa baiti uleule utakaotekelezwa kwenye anwani ya mkataba. Hata hivyo, uthibitishaji rasmi unaelezea kuthibitisha usahihi wa mkataba mahiri, ikimaanisha mkataba unafanya kazi kama inavyotarajiwa. Ingawa inategemea muktadha, uthibitishaji wa mkataba kwa kawaida unarejelea uthibitishaji wa msimbo chanzo.

## Uthibitishaji wa msimbo chanzo ni nini? {#what-is-source-code-verification}

Kabla ya kusambaza mkataba mahiri katika [Mashine Pepe ya Ethereum (EVM)](/developers/docs/evm/), wasanidi [hukusanya](/developers/docs/smart-contracts/compiling/) msimbo chanzo wa mkataba—maagizo [yaliyoandikwa katika Solidity](/developers/docs/smart-contracts/languages/) au lugha nyingine ya upangaji programu ya kiwango cha juu—kuwa msimbo wa baiti. Kwa kuwa EVM haiwezi kufasiri maagizo ya kiwango cha juu, kukusanya msimbo chanzo kuwa msimbo wa baiti (yaani, maagizo ya kiwango cha chini, ya mashine) ni muhimu kwa kutekeleza mantiki ya mkataba katika EVM.

Uthibitishaji wa msimbo chanzo ni kulinganisha msimbo chanzo wa mkataba mahiri na msimbo wa baiti uliokusanywa uliotumika wakati wa kuunda mkataba ili kugundua tofauti zozote. Kuthibitisha mikataba mahiri ni muhimu kwa sababu msimbo wa mkataba uliotangazwa unaweza kuwa tofauti na kile kinachoendeshwa kwenye mnyororo wa vitalu.

Uthibitishaji wa mkataba mahiri huwezesha kuchunguza kile ambacho mkataba unafanya kupitia lugha ya kiwango cha juu uliyoandikwa, bila kulazimika kusoma msimbo wa mashine. Kazi, thamani, na kwa kawaida majina ya vigezo na maoni hubaki sawa na msimbo chanzo asili uliokusanywa na kusambazwa. Hii inafanya usomaji wa msimbo kuwa rahisi zaidi. Uthibitishaji wa chanzo pia hutoa nafasi kwa nyaraka za msimbo, ili watumiaji wa mwisho wajue mkataba mahiri umeundwa kufanya nini.

### Ulinganifu kamili ni nini? {#full-verification}

Kuna baadhi ya sehemu za msimbo chanzo ambazo haziathiri msimbo wa baiti uliokusanywa kama vile maoni au majina ya vigezo. Hiyo inamaanisha misimbo chanzo miwili yenye majina tofauti ya vigezo na maoni tofauti yote ingeweza kuthibitisha mkataba uleule. Kwa hilo, mhusika mwenye nia mbaya anaweza kuongeza maoni ya kudanganya au kutoa majina ya vigezo yanayopotosha ndani ya msimbo chanzo na kufanya mkataba uthibitishwe kwa msimbo chanzo tofauti na msimbo chanzo asili.

Inawezekana kuepuka hili kwa kuambatisha data ya ziada kwenye msimbo wa baiti ili kutumika kama _dhamana ya kificho_ kwa usahihi wa msimbo chanzo, na kama _alama ya kidole_ ya taarifa ya ukusanyaji. Taarifa muhimu inapatikana katika [data fafanuzi ya mkataba wa Solidity](https://docs.soliditylang.org/en/latest/metadata.html), na heshi ya faili hili inaambatishwa mwishoni mwa msimbo wa baiti wa mkataba. Unaweza kuiona ikifanya kazi katika [uwanja wa majaribio wa data fafanuzi](https://playground.sourcify.dev)

Faili la data fafanuzi lina taarifa kuhusu ukusanyaji wa mkataba, ikijumuisha mipangilio ya kikusanyaji na majina na heshi za faili za chanzo. Ikimaanisha, ikiwa mipangilio yoyote ya ukusanyaji au hata baiti moja katika mojawapo ya faili za chanzo itabadilika, faili la data fafanuzi hubadilika. Kwa sababu hiyo heshi ya faili la data fafanuzi, ambayo imeambatishwa kwenye msimbo wa baiti, pia inabadilika. Hiyo inamaanisha ikiwa msimbo wa baiti wa mkataba + heshi ya data fafanuzi iliyoambatishwa inalingana na msimbo chanzo uliotolewa na mipangilio ya ukusanyaji, tunaweza kuwa na uhakika huu ni msimbo chanzo uleule uliotumika katika ukusanyaji asili, hata baiti moja si tofauti.

Aina hii ya uthibitishaji inayotumia heshi ya data fafanuzi inaitwa **"[ulinganifu kamili](https://docs.sourcify.dev/docs/exact-match-vs-match/)"** (zamani ulinganifu "kamili" au "kamilifu"). Ikiwa heshi za data fafanuzi hazilingani au hazizingatiwi katika uthibitishaji, ni **"ulinganifu"** (zamani "ulinganifu wa kiasi"): msimbo wa mkataba unathibitishwa, lakini faili zake za chanzo zinaweza kutofautiana na zile asili, kwa mfano katika maoni au majina ya faili. Inawezekana [kuingiza msimbo wenye nia mbaya](https://samczsun.com/hiding-in-plain-sight/) ambao haungeonekana katika msimbo chanzo uliothibitishwa bila ulinganifu kamili. Wasanidi wengi hawafahamu kuhusu ulinganifu kamili na hawatunzi faili la data fafanuzi la ukusanyaji wao, kwa hivyo ulinganifu bila heshi ya data fafanuzi umekuwa njia ya kawaida zaidi ya kuthibitisha mikataba hadi sasa.

## Kwa nini uthibitishaji wa msimbo chanzo ni muhimu? {#importance-of-source-code-verification}

### Hali ya kutohitaji kuamini {#trustlessness}

Hali ya kutohitaji kuamini bila shaka ni msingi mkubwa zaidi kwa mikataba mahiri na [programu tumizi zilizogatuliwa (dapps)](/developers/docs/dapps/). Mikataba mahiri ni "isiyobadilika" na haiwezi kubadilishwa; mkataba utatekeleza tu mantiki ya biashara iliyofafanuliwa katika msimbo wakati wa usambazaji. Hii inamaanisha wasanidi na biashara hawawezi kuchezea msimbo wa mkataba baada ya kusambaza kwenye Ethereum.

Ili mkataba mahiri uwe bila hitaji la uaminifu, msimbo wa mkataba unapaswa kupatikana kwa uthibitishaji huru. Ingawa msimbo wa baiti uliokusanywa kwa kila mkataba mahiri unapatikana hadharani kwenye mnyororo wa vitalu, lugha ya kiwango cha chini ni ngumu kuelewa—kwa wasanidi na watumiaji.

Miradi hupunguza dhana za uaminifu kwa kuchapisha msimbo chanzo wa mikataba yao. Lakini hii inasababisha tatizo jingine: ni vigumu kuthibitisha kwamba msimbo chanzo uliochapishwa unalingana na msimbo wa baiti wa mkataba. Katika hali hii, thamani ya hali ya kutohitaji kuamini inapotea kwa sababu watumiaji wanapaswa kuamini wasanidi kutobadilisha mantiki ya biashara ya mkataba (yaani, kwa kubadilisha msimbo wa baiti) kabla ya kuusambaza kwenye mnyororo wa vitalu.

Zana za uthibitishaji wa msimbo chanzo hutoa hakikisho kwamba faili za msimbo chanzo za mkataba mahiri zinalingana na msimbo wa assembli. Matokeo yake ni mfumo ikolojia usiohitaji uaminifu, ambapo watumiaji hawaamini wahusika wengine kipofu na badala yake huthibitisha msimbo kabla ya kuweka fedha kwenye mkataba.

### Usalama wa Mtumiaji {#user-safety}

Kwa mikataba mahiri, kwa kawaida kuna pesa nyingi zilizowekwa dhamana. Hii inahitaji hakikisho la juu la usalama na uthibitishaji wa mantiki ya mkataba mahiri kabla ya kuutumia. Tatizo ni kwamba wasanidi wasio waaminifu wanaweza kuwadanganya watumiaji kwa kuingiza msimbo wenye nia mbaya katika mkataba mahiri. Bila uthibitishaji, mikataba mahiri yenye nia mbaya inaweza kuwa na [milango ya nyuma](https://www.trustnodes.com/2018/11/10/concerns-rise-over-backdoored-smart-contracts), mifumo yenye utata ya udhibiti wa ufikiaji, udhaifu unaoweza kutumiwa vibaya, na mambo mengine yanayohatarisha usalama wa mtumiaji ambayo hayangegunduliwa.

Kuchapisha faili za msimbo chanzo za mkataba mahiri hurahisisha kwa wale wanaovutiwa, kama vile wakaguzi, kutathmini mkataba kwa njia zinazowezekana za mashambulizi. Pamoja na pande nyingi kuthibitisha mkataba mahiri kwa uhuru, watumiaji wana hakikisho lenye nguvu zaidi la usalama wake.

## Jinsi ya kuthibitisha msimbo chanzo kwa mikataba mahiri ya Ethereum {#source-code-verification-for-ethereum-smart-contracts}

[Kusambaza mkataba mahiri kwenye Ethereum](/developers/docs/smart-contracts/deploying/) kunahitaji kutuma muamala wenye mzigo wa data (msimbo wa baiti uliokusanywa) kwa anwani maalum. Mzigo wa data unazalishwa kwa kukusanya msimbo chanzo, pamoja na [hoja za konstrukta](https://docs.soliditylang.org/en/v0.8.14/contracts.html#constructor) za mfano wa mkataba zilizoambatishwa kwenye mzigo wa data katika muamala. Ukusanyaji ni wa kubainisha, ikimaanisha kila wakati hutoa matokeo yaleyale (yaani, msimbo wa baiti wa mkataba) ikiwa faili za chanzo zilezile, na mipangilio ya ukusanyaji (k.m., toleo la kikusanyaji, kiboreshaji) inatumika. Majina na njia za faili za chanzo pia ni sehemu ya ingizo hilo: zinarekodiwa katika data fafanuzi, kwa hivyo kubadilisha jina la faili hubadilisha heshi ya data fafanuzi.

<SourceVerifyDiagram />

Kuthibitisha mkataba mahiri kimsingi kunahusisha hatua zifuatazo:

1. Ingiza faili za chanzo na mipangilio ya ukusanyaji kwenye kikusanyaji.

2. Kikusanyaji hutoa msimbo wa baiti wa mkataba

3. Pata msimbo wa baiti wa mkataba uliosambazwa kwenye anwani iliyotolewa (kwa `eth_getCode`)

4. Linganisha msimbo wa baiti uliosambazwa na msimbo wa baiti uliokusanywa upya. Ikiwa misimbo inalingana, mkataba unathibitishwa kwa msimbo chanzo uliotolewa na mipangilio ya ukusanyaji.

5. Zaidi ya hayo, ikiwa heshi za data fafanuzi mwishoni mwa msimbo wa baiti zinalingana, utakuwa ulinganifu kamili.

Wahakiki wanaweza pia kulinganisha msimbo wa baiti wa uundaji wa mkataba: msimbo uliousambaza (kwa mkataba uliosambazwa moja kwa moja kutoka kwa akaunti, ingizo la muamala wa kusambaza), ambao ni msimbo wa baiti uliokusanywa ukifuatiwa na [hoja za konstrukta](https://docs.soliditylang.org/en/latest/contracts.html#constructor) zilizosimbwa.

Kumbuka kwamba huu ni maelezo rahisi ya uthibitishaji na kuna tofauti nyingi ambazo hazingefanya kazi na hii kama vile kuwa na [vigezo visivyobadilika](https://docs.sourcify.dev/docs/immutables/).

## Zana za uthibitishaji wa msimbo chanzo {#source-code-verification-tools}

Mchakato wa jadi wa kuthibitisha mikataba unaweza kuwa mgumu. Hii ndiyo sababu tuna zana za kuthibitisha msimbo chanzo kwa mikataba mahiri iliyosambazwa kwenye Ethereum. Zana hizi hufanya sehemu kubwa za uthibitishaji wa msimbo chanzo kujiendesha na pia huratibu mikataba iliyothibitishwa kwa manufaa ya watumiaji.

### Etherscan {#etherscan}

Ingawa inajulikana zaidi kama [kichunguzi cha mnyororo wa vitalu cha Ethereum](/developers/docs/data-and-analytics/block-explorers/), Etherscan pia inatoa [huduma ya uthibitishaji wa msimbo chanzo](https://etherscan.io/verifyContract) kwa wasanidi na watumiaji wa mikataba mahiri.

Etherscan inakuruhusu kukusanya upya msimbo wa baiti wa mkataba kutoka kwa mzigo asili wa data (msimbo chanzo, anwani ya maktaba, mipangilio ya kikusanyaji, anwani ya mkataba, n.k.) Ikiwa msimbo wa baiti uliokusanywa upya unahusishwa na msimbo wa baiti (na vigezo vya konstrukta) vya mkataba mnyororoni, basi [mkataba unathibitishwa](https://info.etherscan.com/types-of-contract-verification/).

Baada ya kuthibitishwa, msimbo chanzo wa mkataba wako hupokea lebo ya "Imethibitishwa" na huchapishwa kwenye Etherscan ili wengine waukague. Pia huongezwa kwenye sehemu ya [Mikataba Iliyothibitishwa](https://etherscan.io/contractsVerified/)—hifadhi ya mikataba mahiri yenye misimbo chanzo iliyothibitishwa.

Etherscan ndiyo zana inayotumika zaidi kwa kuthibitisha mikataba. Inaweka lebo kwa kila mkataba uliothibitishwa kulingana na [jinsi ulivyolingana](https://info.etherscan.com/types-of-contract-verification/): ulinganifu kamili wa msimbo wa baiti wa uundaji wa mkataba na hoja za konstrukta, ulinganifu wa wakati wa utekelezaji wa msimbo wake wa baiti uliosambazwa pekee, au ulinganifu sawa, unaotolewa kiotomatiki wakati msimbo wa baiti wa mkataba unalingana na ule wa mkataba ambao tayari umethibitishwa. Ulinganifu kamili wa Etherscan unahusu msimbo wa baiti wa uundaji na hoja za konstrukta; si tofauti sawa na ulinganifu kamili na ulinganifu ulioelezwa hapo juu.

[Zaidi kuhusu kuthibitisha mikataba kwenye Etherscan](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327).

### Blockscout {#blockscout}

[Blockscout](https://blockscout.com/) ni kichunguza mnyororo wa vitalu cha chanzo wazi ambacho pia hutoa [huduma ya uthibitishaji wa mkataba](https://eth.blockscout.com/contract-verification) kwa wasanidi na watumiaji wa mikataba mahiri. Kama mbadala wa chanzo wazi, Blockscout inatoa uwazi katika jinsi uthibitishaji unavyofanywa na kuwezesha michango ya jamii kuboresha mchakato wa uthibitishaji.

Sawa na huduma nyingine za uthibitishaji, Blockscout inakuruhusu kuthibitisha msimbo chanzo wa mkataba wako kwa kukusanya upya msimbo wa baiti na kuulinganisha na mkataba uliosambazwa. Baada ya kuthibitishwa, mkataba wako hupokea hali ya uthibitishaji na msimbo chanzo unapatikana hadharani kwa ukaguzi na mwingiliano. Mikataba iliyothibitishwa pia imeorodheshwa katika [hifadhi ya mikataba iliyothibitishwa](https://eth.blockscout.com/verified-contracts) ya Blockscout kwa uvinjari na ugunduzi rahisi.

### Sourcify {#sourcify}

[Sourcify](https://verify.sourcify.dev) ni zana nyingine ya kuthibitisha mikataba ambayo ni ya chanzo wazi na iliyogatuliwa. Siyo kichunguza bloku na inathibitisha tu mikataba kwenye [mitandao tofauti inayotegemea EVM](https://docs.sourcify.dev/docs/chains). Inafanya kazi kama miundombinu ya umma kwa zana nyingine kujenga juu yake, na inalenga kuwezesha mwingiliano wa mkataba unaofaa zaidi kwa binadamu kwa kutumia [kiolesura cha jozi cha programu (ABI)](/developers/docs/smart-contracts/compiling/#web-applications) na maoni ya [NatSpec](https://docs.soliditylang.org/en/v0.8.15/natspec-format.html) yanayopatikana katika faili la data fafanuzi.

Sourcify inaripoti ikiwa mkataba ni ulinganifu kamili, na heshi ya data fafanuzi, au ulinganifu bila hiyo, kwa uundaji wake na msimbo wake wa baiti uliosambazwa. Mikataba yake iliyothibitishwa ni ya umma: inaweza kuuliziwa kupitia Kiolesura cha Kupanga Programu Tumizi (API) chake na kupakuliwa kama [seti ya data](https://docs.sourcify.dev/docs/repository/). Sourcify hupitisha uthibitishaji wake kwa vichunguzi vya bloku ikiwa ni pamoja na Blockscout, Routescan na Etherscan, na inashiriki hifadhidata ya mikataba iliyothibitishwa na Blockscout na Routescan kupitia [Muungano wa Wahakiki](https://verifieralliance.org/).

Faili la data fafanuzi pia linashikilia heshi za IPFS za faili za chanzo, na heshi ya data fafanuzi iliyoambatishwa kwenye msimbo wa baiti yenyewe ni heshi ya IPFS. Ikiwa msanidi atachapisha data fafanuzi na faili za chanzo kwenye [IPFS](https://docs.ipfs.tech/concepts/what-is-ipfs/), mtu yeyote anaweza kuchukua vyanzo kamili vya mkataba kutoka kwa msimbo wake wa baiti pekee, mradi tu faili zibaki kupatikana kwenye IPFS. Mkataba unaweza kuthibitishwa kwa kutoa faili la data fafanuzi na faili za chanzo kupitia API yake au [UI](https://verify.sourcify.dev), au kutumia programu-jalizi kwa zana za usanidi kama vile Hardhat na Foundry. [Kifuatiliaji](https://docs.sourcify.dev/docs/monitoring/) cha Sourcify pia huangalia mikataba mipya kwenye minyororo inayoifuata na kuithibitisha kiotomatiki wakati data fafanuzi na faili zao za chanzo zinapochapishwa kwenye IPFS.

[Zaidi kuhusu kuthibitisha mikataba kwenye Sourcify](https://soliditylang.org/blog/2020/06/25/sourcify-faq/).

### Tenderly {#tenderly}

[Jukwaa la Tenderly](https://tenderly.co/) huwawezesha wasanidi wa Web3 kujenga, kujaribu, kufuatilia, na kuendesha mikataba mahiri. Kwa kuchanganya zana za utatuzi na uwezo wa kuonekana na vizuizi vya ujenzi wa miundombinu, Tenderly inasaidia wasanidi kuharakisha usanidi wa mkataba mahiri. Ili kuwezesha kikamilifu vipengele vya Tenderly, wasanidi wanahitaji [kufanya uthibitishaji wa msimbo chanzo](https://docs.tenderly.co/contract-verification) kwa kutumia mbinu kadhaa.

Inawezekana kuthibitisha mkataba kwa faragha au hadharani. Ikiwa imethibitishwa kwa faragha, mkataba mahiri unaonekana kwako tu (na wanachama wengine katika mradi wako). Kuthibitisha mkataba hadharani hufanya uonekane kwa kila mtu anayetumia jukwaa la Tenderly.

Unaweza kuthibitisha mikataba yako ukitumia [Dashibodi](https://docs.tenderly.co/contract-verification), [programu-jalizi ya Tenderly Hardhat](https://docs.tenderly.co/contract-verification/hardhat), au [Foundry](https://docs.tenderly.co/contract-verification/foundry).

Unapothibitisha mikataba kupitia Dashibodi, unahitaji kuingiza faili la chanzo au faili la data fafanuzi lililozalishwa na kikusanyaji cha Solidity, anwani/mtandao, na mipangilio ya kikusanyaji.

Kutumia programu-jalizi ya Tenderly Hardhat inaruhusu udhibiti zaidi juu ya mchakato wa uthibitishaji kwa juhudi kidogo, kukuwezesha kuchagua kati ya uthibitishaji wa kiotomatiki (bila msimbo) na wa mwongozo (unaotegemea msimbo).

## Usomaji zaidi {#further-reading}

- [Kuthibitisha msimbo chanzo wa mkataba](https://programtheblockchain.com/posts/2018/01/16/verifying-contract-source-code/)
