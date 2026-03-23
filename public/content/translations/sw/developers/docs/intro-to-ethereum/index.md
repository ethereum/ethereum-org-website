---
title: Utangulizi wa kiufundi wa Ethereum
description: Utangulizi wa msanidi programu wa dapp kwa dhana za msingi za Ethereum.
lang: sw
---

## Blockchain ni nini? {#what-is-a-blockchain}

Mnyororo wa bloku ni hifadhidata ya umma ambayo husasishwa na kushirikiwa katika kompyuta nyingi kwenye mtandao.

"Bloku" inarejelea data na hali kuhifadhiwa katika makundi mfululizo yanayojulikana kama "bloku". Ukimtumia mtu mwingine ETH, data ya muamala inahitaji kuongezwa kwenye bloku ili ifanikiwe.

"Mnyororo" inarejelea ukweli kwamba kila bloku hurejelea bloku iliyotangulia kwa njia ya kriptografia. Kwa maneno mengine, bloku huunganishwa pamoja. Data katika bloku haiwezi kubadilika bila kubadilisha bloku zote zinazofuata, jambo ambalo lingehitaji makubaliano ya mtandao mzima.

Kila kompyuta kwenye mtandao lazima ikubaliane juu ya kila bloku mpya na mnyororo kwa ujumla. Kompyuta hizi zinajulikana kama "nodi". Nodi huhakikisha kila mtu anayeingiliana na mnyororo wa bloku ana data sawa. Ili kukamilisha makubaliano haya yaliyosambazwa, minyororo ya bloku inahitaji utaratibu wa makubaliano.

Ethereum hutumia [utaratibu wa makubaliano unaotegemea uthibitisho-wa-hisa](/developers/docs/consensus-mechanisms/pos/). Yeyote anayetaka kuongeza bloku mpya kwenye mnyororo lazima aweke hisa ya ETH - sarafu asili ya Ethereum - kama dhamana na aendeshe programu ya mthibitishaji. "Wathibitishaji" hawa wanaweza kisha kuchaguliwa kwa nasibu kupendekeza bloku ambazo wathibitishaji wengine huangalia na kuongeza kwenye mnyororo wa bloku. Kuna mfumo wa zawadi na adhabu unaowahamasisha sana washiriki kuwa waaminifu na kupatikana mtandaoni kadri iwezekanavyo.

Ikiwa ungependa kuona jinsi data ya mnyororo wa bloku inavyopigwa hashi na kisha kuongezwa kwenye historia ya marejeleo ya bloku, hakikisha umeangalia [onyesho hili](https://andersbrownworth.com/blockchain/blockchain) la Anders Brownworth na utazame video inayoambatana hapa chini.

Tazama Anders akielezea hashi katika minyororo ya bloku:

<YouTube id="_160oMzblY8" />

## Ethereum ni nini? {#what-is-ethereum}

Ethereum ni mnyororo wa bloku wenye kompyuta iliyopachikwa ndani yake. Ni msingi wa kujenga programu na mashirika kwa njia iliyogatuliwa, isiyo na ruhusa, na inayostahimili udhibiti.

Katika ulimwengu wa Ethereum, kuna kompyuta moja, ya kisheria (inayoitwa Mashine Halisi ya Ethereum, au EVM) ambayo hali yake kila mtu kwenye mtandao wa Ethereum anakubaliana nayo. Kila mtu anayeshiriki katika mtandao wa Ethereum (kila nodi ya Ethereum) huweka nakala ya hali ya kompyuta hii. Zaidi ya hayo, mshiriki yeyote anaweza kutangaza ombi kwa kompyuta hii kufanya hesabu yoyote. Wakati wowote ombi kama hilo linapotangazwa, washiriki wengine kwenye mtandao huhakiki, huthibitisha, na kutekeleza ("execute") hesabu hiyo. Utekelezaji huu husababisha mabadiliko ya hali katika EVM, ambayo huwekwa na kuenezwa katika mtandao mzima.

Maombi ya hesabu huitwa maombi ya muamala; rekodi ya miamala yote na hali ya sasa ya EVM huhifadhiwa kwenye mnyororo wa bloku, ambayo nayo huhifadhiwa na kukubaliwa na nodi zote.

Taratibu za kriptografia huhakikisha kwamba mara tu miamala inapohakikiwa kuwa halali na kuongezwa kwenye mnyororo wa bloku, haiwezi kuchezewa baadaye. Taratibu hizo hizo pia huhakikisha kwamba miamala yote inasainiwa na kutekelezwa kwa "ruhusa" zinazofaa (hakuna mtu anayepaswa kuweza kutuma mali za kidijitali kutoka kwa akaunti ya Alice, isipokuwa Alice mwenyewe).

## Ether ni nini? {#what-is-ether}

**Ether (ETH)** ni sarafu asili ya kidijitali ya Ethereum. Madhumuni ya ETH ni kuruhusu soko la hesabu. Soko kama hilo hutoa motisha wa kiuchumi kwa washiriki kuhakiki na kutekeleza maombi ya muamala na kutoa rasilimali za kikokotozi kwa mtandao.

Mshiriki yeyote anayetangaza ombi la muamala lazima pia atoe kiasi fulani cha ETH kwa mtandao kama fadhila. Mtandao utachoma sehemu ya fadhila na kutoa zawadi ya iliyobaki kwa yeyote atakayefanya kazi ya kuhakiki muamala, kuutekeleza, kuuweka kwenye mnyororo wa bloku, na kuutangaza kwenye mtandao.

Kiasi cha ETH kinacholipwa kinalingana na rasilimali zinazohitajika kufanya hesabu. Fadhila hizi pia huzuia washiriki wenye nia mbaya kuziba mtandao kimakusudi kwa kuomba utekelezaji wa hesabu isiyo na kikomo au hati zingine zinazotumia rasilimali nyingi, kwani washiriki hawa lazima walipe rasilimali za hesabu.

ETH pia hutumika kutoa usalama wa kiuchumi wa kikripto kwa mtandao kwa njia tatu kuu: 1) hutumika kama njia ya kuwazawadia wathibitishaji wanaopendekeza bloku au kuripoti tabia isiyo ya uaminifu ya wathibitishaji wengine; 2) Huwekwa hisa na wathibitishaji, ikifanya kazi kama dhamana dhidi ya tabia isiyo ya uaminifu—ikiwa wathibitishaji watajaribu kutenda isivyofaa ETH yao inaweza kuharibiwa; 3) hutumika kupima 'kura' za bloku mpya zilizopendekezwa, na kuchangia katika sehemu ya uteuzi wa uma ya utaratibu wa makubaliano.

## Mikataba erevu ni nini? {#what-are-smart-contracts}

Katika utendaji, washiriki hawaandiki msimbo mpya kila mara wanapotaka kuomba hesabu kwenye EVM. Badala yake, wasanidi programu wa programu-tumizi hupakia programu (vijisehemu vya msimbo vinavyoweza kutumika tena) kwenye hali ya EVM, na watumiaji hufanya maombi ya kutekeleza vijisehemu hivi vya msimbo na vigezo mbalimbali. Programu zilizopakiwa na kutekelezwa na mtandao tunaziita "mikataba-erevu".

Katika kiwango cha msingi kabisa, unaweza kufikiria mkataba-erevu kama aina ya mashine ya kuuza bidhaa: hati ambayo, inapoitwa na vigezo fulani, hufanya vitendo au hesabu fulani ikiwa masharti fulani yametimizwa. Kwa mfano, mkataba-erevu rahisi wa muuzaji unaweza kuunda na kugawa umiliki wa mali ya kidijitali ikiwa mpigaji atatuma ETH kwa mpokeaji maalum.

Msanidi programu yeyote anaweza kuunda mkataba-erevu na kuuafanya kuwa wa umma kwa mtandao, akitumia mnyororo wa bloku kama safu yake ya data, kwa ada inayolipwa kwa mtandao. Mtumiaji yeyote anaweza kisha kuita mkataba-erevu kutekeleza msimbo wake, tena kwa ada inayolipwa kwa mtandao.

Hivyo, kwa kutumia mikataba-erevu, wasanidi programu wanaweza kujenga na kupeleka programu na huduma changamano zinazoelekezwa kwa watumiaji kama vile: masoko, vyombo vya kifedha, michezo, n.k.

## Istilahi {#terminology}

### Mnyororo wa bloku {#blockchain}

Mfuatano wa bloku zote ambazo zimewekwa kwenye mtandao wa Ethereum katika historia ya mtandao. Imeitwa hivyo kwa sababu kila bloku ina rejeleo la bloku iliyotangulia, jambo ambalo hutusaidia kudumisha mpangilio juu ya bloku zote (na hivyo juu ya historia sahihi).

### ETH {#eth}

**Ether (ETH)** ni sarafu asili ya kidijitali ya Ethereum. Watumiaji hulipa ETH kwa watumiaji wengine ili maombi yao ya utekelezaji wa msimbo yatimizwe.

[Zaidi kuhusu ETH](/developers/docs/intro-to-ether/)

### EVM {#evm}

Mashine Halisi ya Ethereum ni kompyuta halisi ya kimataifa ambayo hali yake kila mshiriki kwenye mtandao wa Ethereum huhifadhi na kukubaliana nayo. Mshiriki yeyote anaweza kuomba utekelezaji wa msimbo wowote kwenye EVM; utekelezaji wa msimbo hubadilisha hali ya EVM.

[Zaidi kuhusu EVM](/developers/docs/evm/)

### Nodi {#nodes}

Mashine halisi za maisha zinazohifadhi hali ya EVM. Nodi huwasiliana ili kueneza taarifa kuhusu hali ya EVM na mabadiliko mapya ya hali. Mtumiaji yeyote anaweza pia kuomba utekelezaji wa msimbo kwa kutangaza ombi la utekelezaji wa msimbo kutoka kwa nodi. Mtandao wa Ethereum wenyewe ni jumla ya nodi zote za Ethereum na mawasiliano yao.

[Zaidi kuhusu nodi](/developers/docs/nodes-and-clients/)

### Akaunti {#accounts}

Ambapo ETH huhifadhiwa. Watumiaji wanaweza kuanzisha akaunti, kuweka ETH kwenye akaunti, na kuhamisha ETH kutoka kwa akaunti zao kwenda kwa watumiaji wengine. Akaunti na salio la akaunti huhifadhiwa katika jedwali kubwa katika EVM; ni sehemu ya hali ya jumla ya EVM.

[Zaidi kuhusu akaunti](/developers/docs/accounts/)

### Miamala {#transactions}

"Ombi la muamala" ni neno rasmi la ombi la utekelezaji wa msimbo kwenye EVM, na "muamala" ni ombi la muamala lililotimizwa na mabadiliko yanayohusiana katika hali ya EVM. Mtumiaji yeyote anaweza kutangaza ombi la muamala kwa mtandao kutoka kwa nodi. Ili ombi la muamala liathiri hali ya EVM iliyokubaliwa, lazima lithibitishwe, litekelezwe, na "kuwekwa kwenye mtandao" na nodi nyingine. Utekelezaji wa msimbo wowote husababisha mabadiliko ya hali katika EVM; baada ya kuwekwa, mabadiliko haya ya hali hutangazwa kwa nodi zote kwenye mtandao. Baadhi ya mifano ya miamala:

- Tuma X ETH kutoka kwa akaunti yangu kwenda kwa akaunti ya Alice.
- Chapisha msimbo fulani wa mkataba-erevu kwenye hali ya EVM.
- Tekeleza msimbo wa mkataba-erevu kwenye anwani X katika EVM, na hoja Y.

[Zaidi kuhusu miamala](/developers/docs/transactions/)

### Bloku {#blocks}

Idadi ya miamala ni kubwa sana, kwa hivyo miamala "huwekwa" kwa makundi, au bloku. Kwa ujumla bloku huwa na miamala kadhaa hadi mamia.

[Zaidi kuhusu vitalu](/developers/docs/blocks/)

### Mikataba-erevu {#smart-contracts}

Kijisehemu cha msimbo kinachoweza kutumika tena (programu) ambacho msanidi programu huchapisha kwenye hali ya EVM. Mtu yeyote anaweza kuomba msimbo wa mkataba-erevu utekelezwe kwa kufanya ombi la muamala. Kwa sababu wasanidi programu wanaweza kuandika programu-tumizi zozote zinazoweza kutekelezwa kwenye EVM (michezo, masoko, vyombo vya kifedha, n.k.) kwa kuchapisha mikataba-erevu, hizi mara nyingi huitwa [dapps, au Programu Zilizogatuliwa](/developers/docs/dapps/).

[Zaidi kuhusu mikataba-erevu](/developers/docs/smart-contracts/)

## Masomo zaidi {#further-reading}

- [Waraka Rasmi wa Ethereum](/whitepaper/)
- [Ethereum inafanyaje kazi, hata hivyo?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369) - _Preethi Kasireddy_ (**NB** rasilimali hii bado ni ya thamani lakini fahamu kuwa ni ya kabla ya [Muungano](/roadmap/merge) na kwa hiyo bado inarejelea utaratibu wa uthibitisho-wa-kazi wa Ethereum - Ethereum kwa kweli sasa inalindwa kwa kutumia [uthibitisho-wa-hisa](/developers/docs/consensus-mechanisms/pos))

### Wewe ni mwanafunzi wa kuona zaidi? {#visual-learner}

Mfululizo huu wa video unatoa uchunguzi wa kina wa mada za msingi:

<YouTube id="j78ZcIIpi0Q"/>

[Orodha ya kucheza ya Misingi ya Ethereum](https://youtube.com/playlist?list=PLqgutSGloqiJyyoL0zvLVFPS-GMD2wKa5&si=kZTf5I7PKGTXDsOZ)

_Unajua rasilimali ya jamii iliyokusaidia?_ Hariri ukurasa huu na uiongeze!_

## Mafunzo yanayohusiana {#related-tutorials}

- [Mwongozo wa msanidi programu wa Ethereum, sehemu ya 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _– Uchunguzi rahisi sana kwa wanaoanza wa Ethereum kwa kutumia Python na web3.py_
