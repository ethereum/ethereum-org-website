---
title: Kuhakiki mikataba erevu
description: Muhtasari wa uthibitishaji wa msimbo chanzo kwa mikataba-erevu ya Ethereum
lang: sw
---

[Mikataba-erevu](/developers/docs/smart-contracts/) imeundwa kuwa ya "bila kuaminiana", kumaanisha watumiaji hawapaswi kuamini washirika wengine (k.m., wasanidi programu na kampuni) kabla ya kuingiliana na mkataba. Kama sharti la kutokuwa na haja ya kuaminiana, watumiaji na wasanidi programu wengine lazima waweze kuthibitisha msimbo chanzo wa mkataba-erevu. Uthibitishaji wa msimbo chanzo huwahakikishia watumiaji na wasanidi programu kwamba msimbo wa mkataba uliochapishwa ni msimbo uleule unaoendeshwa kwenye anwani ya mkataba kwenye mnyororo wa bloku wa Ethereum.

Ni muhimu kutofautisha kati ya "uthibitishaji wa msimbo chanzo" na "[uthibitishaji rasmi](/developers/docs/smart-contracts/formal-verification/)". Uthibitishaji wa msimbo chanzo, ambao utaelezwa kwa undani hapa chini, unarejelea kuthibitisha kwamba msimbo chanzo uliotolewa wa mkataba-erevu katika lugha ya kiwango cha juu (k.m., Solidity) huandaliwa kuwa msimbo wa baiti uleule utakaotekelezwa kwenye anwani ya mkataba. Hata hivyo, uthibitishaji rasmi unaelezea kuthibitisha usahihi wa mkataba-erevu, ikimaanisha kuwa mkataba unafanya kazi kama inavyotarajiwa. Ingawa inategemea muktadha, uthibitishaji wa mkataba kwa kawaida hurejelea uthibitishaji wa msimbo chanzo.

## Uthibitishaji wa msimbo chanzo ni nini? {#what-is-source-code-verification}

Kabla ya kupeleka mkataba-erevu katika [Mashine ya mtandaoni ya Ethereum (EVM)](/developers/docs/evm/), wasanidi programu [huandaa](/developers/docs/smart-contracts/compiling/) msimbo chanzo wa mkataba—maagizo [yaliyoandikwa katika Solidity](/developers/docs/smart-contracts/languages/) au lugha nyingine ya programu ya kiwango cha juu— kuwa msimbo wa baiti. Kwa kuwa EVM haiwezi kutafsiri maagizo ya kiwango cha juu, kuandaa msimbo chanzo kuwa msimbo wa baiti (yaani, maagizo ya kiwango cha chini, ya mashine) ni muhimu kwa ajili ya kutekeleza mantiki ya mkataba katika EVM.

Uthibitishaji wa msimbo chanzo ni kulinganisha msimbo chanzo wa mkataba-erevu na msimbo wa baiti ulioandaliwa uliotumika wakati wa uundaji wa mkataba ili kugundua tofauti zozote. Kuthibitisha mikataba-erevu ni muhimu kwa sababu msimbo wa mkataba uliotangazwa unaweza kuwa tofauti na ule unaoendeshwa kwenye mnyororo wa bloku.

Uthibitishaji wa mkataba-erevu huwezesha kuchunguza kile mkataba hufanya kupitia lugha ya kiwango cha juu iliyoandikwa, bila kulazimika kusoma msimbo wa mashine. Majukumu, thamani, na kwa kawaida majina ya vigezo na maoni hubaki sawa na msimbo chanzo asilia ambao umeandaliwa na kupelekwa. Hii hurahisisha kusoma msimbo. Uthibitishaji wa chanzo pia hutoa nafasi ya nyaraka za msimbo, ili watumiaji wa mwisho wajue kile ambacho mkataba-erevu umeundwa kufanya.

### Uthibitishaji kamili ni nini? {#full-verification}

Kuna baadhi ya sehemu za msimbo chanzo ambazo haziathiri msimbo wa baiti ulioandaliwa kama vile maoni au majina ya vigezo. Hiyo inamaanisha misimbo miwili chanzo yenye majina tofauti ya vigezo na maoni tofauti yote yangeweza kuthibitisha mkataba mmoja. Kwa hiyo, mhusika mwenye nia mbaya anaweza kuongeza maoni ya udanganyifu au kutoa majina ya vigezo yanayopotosha ndani ya msimbo chanzo na kufanya mkataba uthibitishwe na msimbo chanzo tofauti na msimbo chanzo asilia.

Inawezekana kuepuka hili kwa kuongeza data ya ziada kwenye msimbo wa baiti ili kutumika kama _dhamana ya kriptografia_ ya usahihi wa msimbo chanzo, na kama _alama ya vidole_ ya taarifa za uandaaji. Taarifa muhimu hupatikana katika [metadata ya mkataba wa Solidity](https://docs.soliditylang.org/en/v0.8.15/metadata.html), na hashi ya faili hili huongezwa kwenye msimbo wa baiti wa mkataba. Unaweza kuiona ikifanya kazi katika [uwanja wa michezo wa metadata](https://playground.sourcify.dev)

Faili la metadata lina taarifa kuhusu uandaaji wa mkataba ikiwa ni pamoja na faili chanzo na hashi zao. Ikimaanisha, ikiwa mipangilio yoyote ya uandaaji au hata baiti moja katika faili chanzo itabadilika, faili la metadata hubadilika. Kwa hivyo, hashi ya faili la metadata, ambayo huongezwa kwenye msimbo wa baiti, pia hubadilika. Hiyo inamaanisha ikiwa msimbo wa baiti wa mkataba + hashi ya metadata iliyoongezwa vinalingana na msimbo chanzo uliotolewa na mipangilio ya uandaaji, tunaweza kuwa na uhakika huu ndio msimbo chanzo uleule uliotumika katika uandaaji asilia, hakuna hata baiti moja tofauti.

Aina hii ya uthibitishaji inayotumia hashi ya metadata inajulikana kama **"[uthibitishaji kamili](https://docs.sourcify.dev/docs/full-vs-partial-match/)"** (pia "uthibitishaji kamilifu"). Ikiwa hashi za metadata hazilingani au hazizingatiwi katika uthibitishaji itakuwa "ulinganifu wa sehemu", ambayo kwa sasa ndiyo njia ya kawaida zaidi ya kuthibitisha mikataba. Inawezekana [kuingiza msimbo wenye nia mbaya](https://samczsun.com/hiding-in-plain-sight/) ambao hauonekani katika msimbo chanzo uliothibitishwa bila uthibitishaji kamili. Wasanidi programu wengi hawafahamu kuhusu uthibitishaji kamili na hawatunzi faili la metadata la uandaaji wao, kwa hivyo uthibitishaji wa sehemu umekuwa ndiyo njia halisi ya kuthibitisha mikataba hadi sasa.

## Kwa nini uthibitishaji wa msimbo chanzo ni muhimu? {#importance-of-source-code-verification}

### Hali ya Kutohitaji Uaminifu {#trustlessness}

Hali ya kutohitaji uaminifu bila shaka ndiyo msingi mkuu wa mikataba-erevu na [mfumo uliotawanywa (dapps)](/developers/docs/dapps/). Mikataba-erevu "haibadiliki" na haiwezi kubadilishwa; mkataba utatekeleza tu mantiki ya biashara iliyofafanuliwa katika msimbo wakati wa kupelekwa. Hii inamaanisha wasanidi programu na makampuni hawawezi kuchezea msimbo wa mkataba baada ya kuupeleka kwenye Ethereum.

Ili mkataba-erevu usiwe wa kuhitaji uaminifu, msimbo wa mkataba unapaswa kupatikana kwa ajili ya uthibitishaji huru. Ingawa msimbo wa baiti ulioandaliwa kwa kila mkataba-erevu unapatikana hadharani kwenye mnyororo wa bloku, lugha ya kiwango cha chini ni ngumu kuelewa—kwa wasanidi programu na watumiaji.

Miradi hupunguza dhana za uaminifu kwa kuchapisha msimbo chanzo wa mikataba yao. Lakini hii inasababisha tatizo lingine: ni vigumu kuthibitisha kwamba msimbo chanzo uliochapishwa unalingana na msimbo wa baiti wa mkataba. Katika hali hii, thamani ya kutokuwa na haja ya kuaminiana inapotea kwa sababu watumiaji wanapaswa kuwaamini wasanidi programu wasibadili mantiki ya biashara ya mkataba (yaani, kwa kubadilisha msimbo wa baiti) kabla ya kuupeleka kwenye mnyororo wa bloku.

Zana za uthibitishaji wa msimbo chanzo hutoa dhamana kwamba faili za msimbo chanzo za mkataba-erevu zinalingana na msimbo wa kusanyiko. Matokeo yake ni mfumo ikolojia usiohitaji uaminifu, ambapo watumiaji hawaamini wahusika wengine bila kufikiria na badala yake huthibitisha msimbo kabla ya kuweka fedha kwenye mkataba.

### Usalama wa Mtumiaji {#user-safety}

Kwa mikataba-erevu, kwa kawaida kuna pesa nyingi hatarini. Hii inahitaji dhamana ya juu ya usalama na uthibitishaji wa mantiki ya mkataba-erevu kabla ya kuutumia. Tatizo ni kwamba wasanidi programu wasio waaminifu wanaweza kuwadanganya watumiaji kwa kuingiza msimbo wenye nia mbaya katika mkataba-erevu. Bila uthibitishaji, mikataba-erevu yenye nia mbaya inaweza kuwa na [milango ya nyuma](https://www.trustnodes.com/2018/11/10/concerns-rise-over-backdoored-smart-contracts), mifumo yenye utata ya udhibiti wa ufikiaji, udhaifu unaoweza kutumiwa, na mambo mengine yanayohatarisha usalama wa mtumiaji ambayo yangebaki bila kugunduliwa.

Kuchapisha faili za msimbo chanzo za mkataba-erevu hurahisisha wale wanaopendezwa, kama vile wakaguzi, kutathmini mkataba kwa ajili ya mianya inayoweza kushambuliwa. Pamoja na pande nyingi kuthibitisha mkataba-erevu kwa uhuru, watumiaji wanapata dhamana imara zaidi ya usalama wake.

## Jinsi ya kuthibitisha msimbo chanzo kwa mikataba-erevu ya Ethereum {#source-code-verification-for-ethereum-smart-contracts}

[Kupeleka mkataba-erevu kwenye Ethereum](/developers/docs/smart-contracts/deploying/) kunahitaji kutuma muamala wenye shehena ya data (msimbo wa baiti ulioandaliwa) kwenye anwani maalum. Shehena ya data inatengenezwa kwa kuandaa msimbo chanzo, pamoja na [hoja za kiunda](https://docs.soliditylang.org/en/v0.8.14/contracts.html#constructor) za mfano wa mkataba zilizoongezwa kwenye shehena ya data katika muamala. Uandaaji ni wa kubainika, ikimaanisha daima hutoa matokeo sawa (yaani, msimbo wa baiti wa mkataba) ikiwa faili chanzo zilezile, na mipangilio ya uandaaji (k.m., toleo la kiandaaji, kiboreshaji) inatumiwa.

![Mchoro unaoonyesha uthibitishaji wa msimbo chanzo wa mkataba-erevu](./source-code-verification.png)

Kuthibitisha mkataba-erevu kimsingi kunahusisha hatua zifuatazo:

1. Weka faili chanzo na mipangilio ya uandaaji kwenye kiandaaji.

2. Kiandaaji hutoa msimbo wa baiti wa mkataba

3. Pata msimbo wa baiti wa mkataba uliopelekwa katika anwani fulani

4. Linganisha msimbo wa baiti uliopelekwa na msimbo wa baiti ulioandaliwa upya. Ikiwa misimbo inalingana, mkataba unathibitishwa na msimbo chanzo uliotolewa na mipangilio ya uandaaji.

5. Zaidi ya hayo, ikiwa hashi za metadata mwishoni mwa msimbo wa baiti zinalingana, itakuwa ulinganifu kamili.

Kumbuka kwamba hili ni maelezo rahisi ya uthibitishaji na kuna vighairi vingi ambavyo havifanyi kazi na hili kama vile kuwa na [vigezo visivyobadilika](https://docs.sourcify.dev/docs/immutables/).

## Zana za uthibitishaji wa msimbo chanzo {#source-code-verification-tools}

Mchakato wa jadi wa kuthibitisha mikataba unaweza kuwa mgumu. Hii ndiyo sababu tuna zana za kuthibitisha msimbo chanzo kwa mikataba-erevu iliyopelekwa kwenye Ethereum. Zana hizi hubinafsisha sehemu kubwa za uthibitishaji wa msimbo chanzo na pia huratibu mikataba iliyothibitishwa kwa manufaa ya watumiaji.

### Etherscan {#etherscan}

Ingawa inajulikana zaidi kama [kichunguzi cha mnyororo wa bloku wa Ethereum](/developers/docs/data-and-analytics/block-explorers/), Etherscan pia inatoa [huduma ya uthibitishaji wa msimbo chanzo](https://etherscan.io/verifyContract) kwa wasanidi programu wa mikataba-erevu na watumiaji.

Etherscan hukuruhusu kuandaa upya msimbo wa baiti wa mkataba kutoka kwa shehena ya data asilia (msimbo chanzo, anwani ya maktaba, mipangilio ya kiandaaji, anwani ya mkataba, n.k.) Ikiwa msimbo wa baiti ulioandaliwa upya unahusishwa na msimbo wa baiti (na vigezo vya kiunda) vya mkataba ulio kwenye mnyororo, basi [mkataba unathibitishwa](https://info.etherscan.com/types-of-contract-verification/).

Baada ya kuthibitishwa, msimbo chanzo wa mkataba wako hupokea lebo ya "Imethibitishwa" na huchapishwa kwenye Etherscan ili wengine wakague. Pia huongezwa kwenye sehemu ya [Mikataba Iliyothibitishwa](https://etherscan.io/contractsVerified/)—hifadhi ya mikataba-erevu yenye misimbo chanzo iliyothibitishwa.

Etherscan ndiyo zana inayotumika zaidi kwa kuthibitisha mikataba. Hata hivyo, uthibitishaji wa mkataba wa Etherscan una dosari: unashindwa kulinganisha **hashi ya metadata** ya msimbo wa baiti ulio kwenye mnyororo na msimbo wa baiti ulioandaliwa upya. Kwa hivyo, ulinganifu katika Etherscan ni ulinganifu wa sehemu.

[Zaidi kuhusu kuthibitisha mikataba kwenye Etherscan](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327).

### Blockscout {#blockscout}

[Blockscout](https://blockscout.com/) ni kichunguzi huria cha mnyororo wa bloku ambacho pia hutoa [huduma ya uthibitishaji wa mkataba](https://eth.blockscout.com/contract-verification) kwa wasanidi programu na watumiaji wa mikataba-erevu. Kama njia mbadala ya chanzo huria, Blockscout inatoa uwazi katika jinsi uthibitishaji unavyofanywa na huwezesha michango ya jamii kuboresha mchakato wa uthibitishaji.

Sawa na huduma zingine za uthibitishaji, Blockscout hukuruhusu kuthibitisha msimbo chanzo wa mkataba wako kwa kuandaa upya msimbo wa baiti na kuulinganisha na mkataba uliopelekwa. Baada ya kuthibitishwa, mkataba wako hupokea hali ya uthibitishaji na msimbo chanzo unakuwa wazi kwa umma kwa ajili ya ukaguzi na mwingiliano. Mikataba iliyothibitishwa pia imeorodheshwa katika [hifadhi ya mikataba iliyothibitishwa](https://eth.blockscout.com/verified-contracts) ya Blockscout kwa kuvinjari na ugunduzi rahisi.

### Sourcify {#sourcify}

[Sourcify](https://sourcify.dev/#/verifier) ni zana nyingine ya kuthibitisha mikataba ambayo ni ya chanzo-wazi na iliyogatuliwa. Siyo kichunguzi cha bloku na inathibitisha tu mikataba kwenye [mitandao tofauti inayotumia EVM](https://docs.sourcify.dev/docs/chains). Inafanya kazi kama miundombinu ya umma kwa zana zingine kujenga juu yake, na inalenga kuwezesha mwingiliano wa mikataba unaoeleweka zaidi na binadamu kwa kutumia maoni ya [ABI](/developers/docs/smart-contracts/compiling/#web-applications) na [NatSpec](https://docs.soliditylang.org/en/v0.8.15/natspec-format.html) yanayopatikana kwenye faili la metadata.

Tofauti na Etherscan, Sourcify inasaidia ulinganifu kamili na hashi ya metadata. Mikataba iliyothibitishwa hutolewa katika [hifadhi yake ya umma](https://docs.sourcify.dev/docs/repository/) kwenye HTTP na [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/#what-is-ipfs), ambayo ni ghala iliyogatuliwa, ya [kushughulikiwa na maudhui](https://docs.storacha.network/concepts/content-addressing/). Hii inaruhusu kupata faili la metadata la mkataba kupitia IPFS kwa kuwa hashi ya metadata iliyoongezwa ni hashi ya IPFS.

Zaidi ya hayo, mtu anaweza pia kupata faili za msimbo chanzo kupitia IPFS, kwa kuwa hashi za IPFS za faili hizi pia hupatikana kwenye metadata. Mkataba unaweza kuthibitishwa kwa kutoa faili la metadata na faili chanzo kupitia API yake au [UI](https://sourcify.dev/#/verifier), au kwa kutumia programu-jalizi. Zana ya ufuatiliaji ya Sourcify pia husikiliza uundaji wa mikataba kwenye bloku mpya na hujaribu kuthibitisha mikataba ikiwa metadata na faili zao chanzo zimechapishwa kwenye IPFS.

[Zaidi kuhusu kuthibitisha mikataba kwenye Sourcify](https://soliditylang.org/blog/2020/06/25/sourcify-faq/).

### Tenderly {#tenderly}

[Jukwaa la Tenderly](https://tenderly.co/) huwawezesha wasanidi programu wa Web3 kujenga, kupima, kufuatilia, na kuendesha mikataba-erevu. Kwa kuchanganya zana za utatuzi na uonekanaji na vizuizi vya ujenzi wa miundombinu, Tenderly husaidia wasanidi programu kuharakisha uundaji wa mkataba-erevu. Ili kuwezesha kikamilifu vipengele vya Tenderly, wasanidi programu wanahitaji [kufanya uthibitishaji wa msimbo chanzo](https://docs.tenderly.co/monitoring/contract-verification) kwa kutumia mbinu kadhaa.

Inawezekana kuthibitisha mkataba kwa faragha au hadharani. Ikithibitishwa kwa faragha, mkataba-erevu unaonekana kwako pekee (na wanachama wengine katika mradi wako). Kuthibitisha mkataba hadharani kunaufanya uonekane kwa kila mtu anayetumia jukwaa la Tenderly.

Unaweza kuthibitisha mikataba yako kwa kutumia [Dashibodi](https://docs.tenderly.co/contract-verification), [programu-jalizi ya Tenderly Hardhat](https://docs.tenderly.co/contract-verification/hardhat), au [CLI](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-cli).

Wakati wa kuthibitisha mikataba kupitia Dashibodi, unahitaji kuingiza faili chanzo au faili la metadata lililotengenezwa na kiandaaji cha Solidity, anwani/mtandao, na mipangilio ya kiandaaji.

Kutumia programu-jalizi ya Tenderly Hardhat kunaruhusu udhibiti zaidi juu ya mchakato wa uthibitishaji kwa juhudi kidogo, kukuwezesha kuchagua kati ya uthibitishaji wa kiotomatiki (bila-msimbo) na wa mwongozo (unaotegemea-msimbo).

## Masomo zaidi {#further-reading}

- [Kuthibitisha msimbo chanzo wa mkataba](https://programtheblockchain.com/posts/2018/01/16/verifying-contract-source-code/)
