---
title: Waraka Mweupe wa Ethereum
description: Waraka wa utangulizi wa Ethereum, uliochapishwa mwaka wa 2013 kabla ya kuzinduliwa kwake.
lang: sw
sidebarDepth: 2
hideEditButton: true
authors: ["Vitalik Buterin"]
---

<WhitepaperBridge />

_Ingawa una umri wa miaka kadhaa, tunadumisha waraka asili hapa chini kwa sababu unaendelea kutumika kama rejeleo muhimu na uwakilishi sahihi wa [Ethereum](/) na maono yake._

## Jukwaa la Kizazi Kijacho la Mkataba Mahiri na Programu Tumizi Iliyogatuliwa {#a-next-generation-smart-contract-and-decentralized-application-platform}

Uundaji wa Bitcoin uliofanywa na Satoshi Nakamoto mnamo 2009 mara nyingi umesifiwa kama maendeleo makubwa katika pesa na sarafu, ukiwa mfano wa kwanza wa rasilimali ya dijitali ambayo kwa wakati mmoja haina dhamana au "[thamani ya asili](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)" na haina mtoaji au mdhibiti aliyewekwa kati. Hata hivyo, sehemu nyingine, ambayo inaweza kusemwa kuwa muhimu zaidi, ya jaribio la Bitcoin ni teknolojia ya msingi ya mnyororo wa vitalu kama zana ya mwafaka uliosambazwa, na umakini unaanza kuhamia kwa kasi kwenye kipengele hiki kingine cha Bitcoin. Matumizi mbadala yanayotajwa mara kwa mara ya teknolojia ya mnyororo wa vitalu yanajumuisha kutumia rasilimali za dijitali zilizo kwenye mnyororo wa vitalu kuwakilisha sarafu maalum na zana za kifedha ("[sarafu za rangi](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)"), umiliki wa kifaa halisi cha msingi ("[mali mahiri](https://en.bitcoin.it/wiki/Smart_Property)"), rasilimali zisizoweza kubadilishana kama vile majina ya kikoa ("[Namecoin](http://namecoin.org)"), pamoja na programu tumizi ngumu zaidi zinazohusisha kuwa na rasilimali za dijitali zinazodhibitiwa moja kwa moja na kipande cha msimbo kinachotekeleza sheria za kiholela ("[mikataba mahiri](http://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/idea.html)") au hata "[mashirika yanayojitegemea yaliyogatuliwa](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)" (DAOs) yanayotegemea mnyororo wa vitalu. Kile ambacho Ethereum inakusudia kutoa ni mnyororo wa vitalu wenye lugha ya programu iliyokamilika ya Turing iliyojengewa ndani inayoweza kutumika kuunda "mikataba" inayoweza kutumika kusimba vitendaji vya kiholela vya mpito wa hali, kuruhusu watumiaji kuunda mfumo wowote kati ya iliyoelezwa hapo juu, pamoja na mingine mingi ambayo bado hatujafikiria, kwa kuandika tu mantiki katika mistari michache ya msimbo.

## Utangulizi wa Bitcoin na Dhana Zilizopo {#introduction-to-bitcoin-and-existing-concepts}

### Historia {#history}

Dhana ya sarafu ya dijitali iliyogatuliwa, pamoja na programu mbadala kama vile sajili za mali, imekuwepo kwa miongo kadhaa. Itifaki za pesa za kielektroniki zisizojulikana za miaka ya 1980 na 1990, zikitegemea zaidi msingi wa kriptografia unaojulikana kama Chaumian blinding, zilitoa sarafu yenye kiwango cha juu cha faragha, lakini itifaki hizo kwa kiasi kikubwa zilishindwa kupata umaarufu kwa sababu ya kutegemea mpatanishi aliyewekwa kati. Mnamo 1998, [b-money](http://www.weidai.com/bmoney.txt) ya Wei Dai ikawa pendekezo la kwanza kuanzisha wazo la kuunda pesa kupitia kutatua mafumbo ya kimahesabu pamoja na mwafaka uliogatuliwa, lakini pendekezo hilo lilikuwa na maelezo machache kuhusu jinsi mwafaka uliogatuliwa ungeweza kutekelezwa kiuhalisia. Mnamo 2005, Hal Finney alianzisha dhana ya "[uthibitisho wa kazi unaoweza kutumika tena](https://nakamotoinstitute.org/finney/rpow/)", mfumo ambao unatumia mawazo kutoka kwa b-money pamoja na mafumbo magumu ya kimahesabu ya Hashcash ya Adam Back ili kuunda dhana ya sarafu-fiche, lakini kwa mara nyingine tena ilishindwa kufikia lengo kwa kutegemea kompyuta inayoaminika kama mfumo wa nyuma. Mnamo 2009, sarafu iliyogatuliwa ilitekelezwa kwa vitendo kwa mara ya kwanza na Satoshi Nakamoto, ikichanganya misingi iliyothibitishwa ya kusimamia umiliki kupitia kriptografia ya ufunguo wa umma na algoriti ya mwafaka ya kufuatilia nani anamiliki sarafu, inayojulikana kama "Uthibitisho wa Kazi (PoW)".

Utaratibu ulio nyuma ya Uthibitisho wa Kazi (PoW) ulikuwa mafanikio makubwa katika nyanja hii kwa sababu ulitatua matatizo mawili kwa wakati mmoja. Kwanza, ulitoa algoriti rahisi na yenye ufanisi wa wastani ya mwafaka, ikiruhusu nodi katika mtandao kukubaliana kwa pamoja juu ya seti ya masasisho rasmi kwa hali ya leja ya Bitcoin. Pili, ulitoa utaratibu wa kuruhusu kuingia kwa uhuru katika mchakato wa mwafaka, kutatua tatizo la kisiasa la kuamua nani anapata kushawishi mwafaka, huku ukizuia mashambulizi ya sybil kwa wakati mmoja. Inafanya hivi kwa kubadilisha kizuizi rasmi cha ushiriki, kama vile hitaji la kusajiliwa kama chombo cha kipekee kwenye orodha fulani, na kizuizi cha kiuchumi - uzito wa nodi moja katika mchakato wa kupiga kura wa mwafaka unalingana moja kwa moja na nguvu ya kompyuta ambayo nodi inaleta. Tangu wakati huo, mbinu mbadala imependekezwa inayoitwa _Uthibitisho wa Dau (PoS)_, ikikokotoa uzito wa nodi kuwa unalingana na umiliki wake wa sarafu na sio rasilimali za kimahesabu; mjadala wa faida za kulinganisha za mbinu hizi mbili uko nje ya upeo wa waraka huu lakini inapaswa kuzingatiwa kuwa mbinu zote mbili zinaweza kutumika kutumika kama uti wa mgongo wa sarafu-fiche.

### Bitcoin Kama Mfumo wa Mpito wa Hali {#bitcoin-as-a-state-transition-system}

![Ethereum state transition](./ethereum-state-transition.png)

Kutoka kwa mtazamo wa kiufundi, leja ya sarafu-fiche kama vile Bitcoin inaweza kufikiriwa kama mfumo wa mpito wa hali, ambapo kuna "hali" inayojumuisha hali ya umiliki wa bitcoins zote zilizopo na "kazi ya mpito wa hali" ambayo inachukua hali na muamala na kutoa hali mpya ambayo ni matokeo. Katika mfumo wa kawaida wa kibenki, kwa mfano, hali ni mizania, muamala ni ombi la kuhamisha $X kutoka A hadi B, na kazi ya mpito wa hali inapunguza thamani katika akaunti ya A kwa $X na kuongeza thamani katika akaunti ya B kwa $X. Ikiwa akaunti ya A ina chini ya $X hapo awali, kazi ya mpito wa hali inarudisha hitilafu. Kwa hivyo, mtu anaweza kufafanua rasmi:

```
APPLY(S,TX) -> S' or ERROR
```

Katika mfumo wa kibenki uliofafanuliwa hapo juu:

```js
APPLY({ Alice: $50, Bob: $50 },"send $20 from Alice to Bob") = { Alice: $30, Bob: $70 }
```

Lakini:

```js
APPLY({ Alice: $50, Bob: $50 },"send $70 from Alice to Bob") = ERROR
```

"Hali" katika Bitcoin ni mkusanyiko wa sarafu zote (kiufundi, "matokeo ya muamala ambayo hayajatumika" au UTXO) ambazo zimeundwa na bado hazijatumika, huku kila UTXO ikiwa na thamani na mmiliki (iliyofafanuliwa na anwani ya baiti 20 ambayo kimsingi ni ufunguo wa umma wa kriptografia<sup>[fn1](#notes)</sup>). Muamala una ingizo moja au zaidi, huku kila ingizo likiwa na rejeleo la UTXO iliyopo na sahihi ya kriptografia inayozalishwa na ufunguo wa siri unaohusishwa na anwani ya mmiliki, na pato moja au zaidi, huku kila pato likiwa na UTXO mpya ya kuongezwa kwenye hali.

Kazi ya mpito wa hali `APPLY(S,TX) -> S'` inaweza kufafanuliwa kwa ufupi kama ifuatavyo:

<ol>
  <li>
    Kwa kila ingizo katika <code>TX</code>:
    <ul>
    <li>
        Ikiwa UTXO iliyorejelewa haipo katika <code>S</code>, rudisha hitilafu.
    </li>
    <li>
        Ikiwa sahihi iliyotolewa hailingani na mmiliki wa UTXO, rudisha hitilafu.
    </li>
    </ul>
  </li>
  <li>
    Ikiwa jumla ya thamani za UTXO zote za ingizo ni chini ya jumla ya thamani za UTXO zote za pato, rudisha hitilafu.
  </li>
  <li>
    Rudisha <code>S</code> huku UTXO zote za ingizo zikiondolewa na UTXO zote za pato zikiongezwa.
  </li>
</ol>

Nusu ya kwanza ya hatua ya kwanza inazuia watumaji wa muamala kutumia sarafu ambazo hazipo, nusu ya pili ya hatua ya kwanza inazuia watumaji wa muamala kutumia sarafu za watu wengine, na hatua ya pili inatekeleza uhifadhi wa thamani. Ili kutumia hii kwa malipo, itifaki ni kama ifuatavyo. Tuseme Alice anataka kutuma 11.7 BTC kwa Bob. Kwanza, Alice atatafuta seti ya UTXO zinazopatikana anazomiliki ambazo jumla yake ni angalau 11.7 BTC. Kiuhalisia, Alice hataweza kupata 11.7 BTC kamili; tuseme kwamba ndogo zaidi anayoweza kupata ni 6+4+2=12. Kisha anaunda muamala na maingizo hayo matatu na matokeo mawili. Pato la kwanza litakuwa 11.7 BTC na anwani ya Bob kama mmiliki wake, na pato la pili litakuwa "chenji" iliyobaki ya 0.3 BTC, huku mmiliki akiwa Alice mwenyewe.

### Uchimbaji {#mining}

![Ethereum blocks](./ethereum-blocks.png)

Ikiwa tungekuwa na ufikiaji wa huduma inayoaminika iliyowekwa kati, mfumo huu ungekuwa rahisi sana kutekeleza; ungeweza tu kuwekwa msimbo kama ilivyoelezwa, kwa kutumia diski kuu ya seva iliyowekwa kati kufuatilia hali. Hata hivyo, kwa Bitcoin tunajaribu kujenga mfumo wa sarafu iliyogatuliwa, kwa hivyo tutahitaji kuchanganya mfumo wa muamala wa hali na mfumo wa mwafaka ili kuhakikisha kwamba kila mtu anakubaliana juu ya mpangilio wa miamala. Mchakato wa mwafaka uliogatuliwa wa Bitcoin unahitaji nodi katika mtandao kujaribu mfululizo kuzalisha vifurushi vya miamala vinavyoitwa "vitalu". Mtandao unakusudiwa kuzalisha takriban kitalu kimoja kila baada ya dakika kumi, huku kila kitalu kikiwa na muhuri wa muda, nonsi, rejeleo la (yaani, heshi ya) kitalu kilichotangulia na orodha ya miamala yote ambayo imefanyika tangu kitalu kilichotangulia. Baada ya muda, hii inaunda "mnyororo wa vitalu" unaoendelea, unaokua kila wakati ambao unasasishwa kila mara ili kuwakilisha hali ya hivi punde ya leja ya Bitcoin.

Algoriti ya kuangalia ikiwa kitalu ni halali, iliyoonyeshwa katika dhana hii, ni kama ifuatavyo:

1. Angalia ikiwa kitalu kilichotangulia kilichorejelewa na kitalu kipo na ni halali.
2. Angalia kwamba muhuri wa muda wa kitalu ni mkubwa kuliko ule wa kitalu kilichotangulia<sup>[fn2](#notes)</sup> na chini ya saa 2 katika siku zijazo
3. Angalia kwamba Uthibitisho wa Kazi (PoW) kwenye kitalu ni halali.
4. Acha `S[0]` iwe hali mwishoni mwa kitalu kilichotangulia.
5. Tuseme `TX` ni orodha ya muamala ya kitalu yenye miamala `n`. Kwa `i` zote katika `0...n-1`, weka `S[i+1] = APPLY(S[i],TX[i])` Ikiwa programu yoyote inarudisha hitilafu, toka na urudishe uongo (false).
6. Rudisha kweli (true), na usajili `S[n]` kama hali mwishoni mwa kitalu hiki.

Kimsingi, kila muamala katika kitalu lazima utoe mpito halali wa hali kutoka kwa kile kilichokuwa hali rasmi kabla ya muamala kutekelezwa hadi hali fulani mpya. Kumbuka kwamba hali haijasimbwa katika kitalu kwa njia yoyote; ni dhana tu ya kukumbukwa na nodi inayothibitisha na inaweza tu kukokotolewa (kwa usalama) kwa kitalu chochote kwa kuanzia kwenye hali ya asili na kutumia kwa mfuatano kila muamala katika kila kitalu. Zaidi ya hayo, kumbuka kwamba mpangilio ambao mchimbaji anajumuisha miamala kwenye kitalu ni muhimu; ikiwa kuna miamala miwili A na B katika kitalu kiasi kwamba B inatumia UTXO iliyoundwa na A, basi kitalu kitakuwa halali ikiwa A inakuja kabla ya B lakini si vinginevyo.

Sharti moja la uhalali lililopo katika orodha iliyo hapo juu ambalo halipatikani katika mifumo mingine ni hitaji la "Uthibitisho wa Kazi (PoW)". Sharti kamili ni kwamba heshi ya SHA-256 mara mbili ya kila kitalu, inayochukuliwa kama nambari ya biti 256, lazima iwe chini ya lengo linalorekebishwa kwa nguvu, ambalo wakati wa kuandika haya ni takriban 2<sup>187</sup>. Madhumuni ya hii ni kufanya uundaji wa kitalu kuwa "mgumu" kimahesabu, na hivyo kuzuia washambuliaji wa sybil kutengeneza upya mnyororo wa vitalu wote kwa faida yao. Kwa sababu SHA-256 imeundwa kuwa kazi ya nasibu isiyotabirika kabisa, njia pekee ya kuunda kitalu halali ni kujaribu na kukosea, kuongeza nonsi mara kwa mara na kuona ikiwa heshi mpya inalingana.

Katika lengo la sasa la ~2<sup>187</sup>, mtandao lazima ufanye wastani wa majaribio ~2<sup>69</sup> kabla ya kitalu halali kupatikana; kwa ujumla, lengo hurekebishwa upya na mtandao kila vitalu 2016 ili kwa wastani kitalu kipya kitolewe na nodi fulani katika mtandao kila baada ya dakika kumi. Ili kufidia wachimbaji kwa kazi hii ya kimahesabu, mchimbaji wa kila kitalu ana haki ya kujumuisha muamala unaojipa 25 BTC kutoka kusikojulikana. Zaidi ya hayo, ikiwa muamala wowote una jumla ya thamani kubwa katika maingizo yake kuliko katika matokeo yake, tofauti hiyo pia huenda kwa mchimbaji kama "ada ya muamala". Kando na hayo, huu pia ndio utaratibu pekee ambao BTC hutolewa; hali ya asili haikuwa na sarafu hata kidogo.

Ili kuelewa vyema madhumuni ya uchimbaji, hebu tuchunguze kile kinachotokea katika tukio la mshambuliaji mwenye nia mbaya. Kwa kuwa kriptografia ya msingi ya Bitcoin inajulikana kuwa salama, mshambuliaji atalenga sehemu moja ya mfumo wa Bitcoin ambayo hailindwi na kriptografia moja kwa moja: mpangilio wa miamala. Mkakati wa mshambuliaji ni rahisi:

1. Tuma 100 BTC kwa mfanyabiashara badala ya bidhaa fulani (ikiwezekana bidhaa ya dijitali inayoletwa haraka)
2. Subiri uletaji wa bidhaa
3. Zalisha muamala mwingine ukituma 100 BTC hizo hizo kwake mwenyewe
4. Jaribu kushawishi mtandao kwamba muamala wake kwake mwenyewe ndio uliokuja kwanza.

Mara tu hatua ya (1) imefanyika, baada ya dakika chache mchimbaji fulani atajumuisha muamala katika kitalu, tuseme kitalu nambari 270000. Baada ya takriban saa moja, vitalu vingine vitano vitakuwa vimeongezwa kwenye mnyororo baada ya kitalu hicho, huku kila kimoja cha vitalu hivyo kikielekeza kwa njia isiyo ya moja kwa moja kwenye muamala na hivyo "kuuthibitisha". Katika hatua hii, mfanyabiashara atakubali malipo kama yaliokamilishwa na kuleta bidhaa; kwa kuwa tunachukulia hii ni bidhaa ya dijitali, uletaji ni wa papo hapo. Sasa, mshambuliaji anaunda muamala mwingine akituma 100 BTC kwake mwenyewe. Ikiwa mshambuliaji ataiachilia tu katika matumizi halisi, muamala hautachakatwa; wachimbaji watajaribu kuendesha `APPLY(S,TX)` na kugundua kuwa `TX` inatumia UTXO ambayo haipo tena katika hali. Kwa hivyo badala yake, mshambuliaji anaunda "mchepuo" wa mnyororo wa vitalu, akianza kwa kuchimba toleo lingine la kitalu 270000 linaloelekeza kwenye kitalu kile kile cha 269999 kama mzazi lakini na muamala mpya badala ya ule wa zamani. Kwa sababu data ya kitalu ni tofauti, hii inahitaji kufanya upya Uthibitisho wa Kazi (PoW). Zaidi ya hayo, toleo jipya la mshambuliaji la kitalu 270000 lina heshi tofauti, kwa hivyo vitalu vya asili 270001 hadi 270005 "havielekezi" kwake; hivyo, mnyororo wa asili na mnyororo mpya wa mshambuliaji vimetengana kabisa. Sheria ni kwamba katika mchepuo mnyororo wa vitalu mrefu zaidi unachukuliwa kuwa ukweli, na hivyo wachimbaji halali watafanya kazi kwenye mnyororo wa 270005 wakati mshambuliaji peke yake anafanya kazi kwenye mnyororo wa 270000. Ili mshambuliaji afanye mnyororo wake wa vitalu kuwa mrefu zaidi, angehitaji kuwa na nguvu zaidi ya kimahesabu kuliko mtandao wote uliounganishwa ili kuwafikia (kwa hivyo, "shambulio la asilimia 51").

### Miti ya Merkle {#merkle-trees}

![SPV in Bitcoin](./spv-bitcoin.png)

_Kushoto: inatosha kuwasilisha idadi ndogo tu ya nodi katika mti wa Merkle ili kutoa uthibitisho wa uhalali wa tawi._

_Kulia: jaribio lolote la kubadilisha sehemu yoyote ya mti wa Merkle hatimaye litasababisha kutofautiana mahali fulani juu ya mnyororo._

Kipengele muhimu cha uwezo wa kuongezeka cha Bitcoin ni kwamba kitalu kinahifadhiwa katika muundo wa data wa viwango vingi. "Heshi" ya kitalu kwa kweli ni heshi tu ya kichwa cha kizuizi, kipande cha data cha takriban baiti 200 ambacho kina muhuri wa muda, nonsi, heshi ya kitalu kilichotangulia na heshi ya mzizi ya muundo wa data unaoitwa mti wa Merkle unaohifadhi miamala yote katika kitalu. Mti wa Merkle ni aina ya mti wa mfumo wa namba mbili (binary tree), unaojumuisha seti ya nodi zilizo na idadi kubwa ya nodi za majani chini ya mti zilizo na data ya msingi, seti ya nodi za kati ambapo kila nodi ni heshi ya watoto wake wawili, na hatimaye nodi moja ya mzizi, pia inayoundwa kutoka kwa heshi ya watoto wake wawili, inayowakilisha "kilele" cha mti. Madhumuni ya mti wa Merkle ni kuruhusu data katika kitalu kuwasilishwa kidogo kidogo: nodi inaweza kupakua tu kichwa cha kizuizi kutoka chanzo kimoja, sehemu ndogo ya mti inayohusiana nao kutoka chanzo kingine, na bado kuwa na uhakika kwamba data yote ni sahihi. Sababu kwa nini hii inafanya kazi ni kwamba heshi huenea kwenda juu: ikiwa mtumiaji mwenye nia mbaya atajaribu kubadilisha muamala bandia chini ya mti wa Merkle, mabadiliko haya yatasababisha mabadiliko katika nodi iliyo hapo juu, na kisha mabadiliko katika nodi iliyo juu ya hiyo, hatimaye kubadilisha mzizi wa mti na kwa hivyo heshi ya kitalu, na kusababisha itifaki kuisajili kama kitalu tofauti kabisa (karibu hakika na Uthibitisho wa Kazi (PoW) batili).

Itifaki ya mti wa Merkle bila shaka ni muhimu kwa uendelevu wa muda mrefu. "Nodi kamili" katika mtandao wa Bitcoin, ile inayohifadhi na kuchakata ukamilifu wa kila kitalu, inachukua takriban GB 15 za nafasi ya diski katika mtandao wa Bitcoin kufikia Aprili 2014, na inakua kwa zaidi ya gigabaiti moja kwa mwezi. Kwa sasa, hii inawezekana kwa baadhi ya kompyuta za mezani na sio simu, na baadaye katika siku zijazo ni biashara na wapenda burudani tu ndio wataweza kushiriki. Itifaki inayojulikana kama "uthibitishaji wa malipo uliorahisishwa" (SPV) inaruhusu darasa lingine la nodi kuwepo, linaloitwa "nodi nyepesi", ambazo hupakua vichwa vya kizuizi, kuthibitisha Uthibitisho wa Kazi (PoW) kwenye vichwa vya kizuizi, na kisha kupakua tu "matawi" yanayohusiana na miamala ambayo ni muhimu kwao. Hii inaruhusu nodi nyepesi kuamua kwa dhamana dhabiti ya usalama hali ya muamala wowote wa Bitcoin, na salio lao la sasa, ni nini huku wakipakua sehemu ndogo sana tu ya mnyororo wa vitalu wote.

### Programu Mbadala za Mnyororo wa Vitalu {#alternative-blockchain-applications}

Wazo la kuchukua wazo la msingi la mnyororo wa vitalu na kulitumia kwa dhana zingine pia lina historia ndefu. Mnamo 2005, Nick Szabo alikuja na dhana ya "[hati miliki salama za mali zenye mamlaka ya mmiliki](https://nakamotoinstitute.org/library/secure-property-titles/)", waraka unaoelezea jinsi "maendeleo mapya katika teknolojia ya hifadhidata iliyonakiliwa" yataruhusu mfumo unaotegemea mnyororo wa vitalu kwa kuhifadhi sajili ya nani anamiliki ardhi gani, na kuunda mfumo wa kina unaojumuisha dhana kama vile umiliki wa makazi, umiliki hasi na kodi ya ardhi ya Kijojiajia. Hata hivyo, kwa bahati mbaya hakukuwa na mfumo madhubuti wa hifadhidata iliyonakiliwa uliopatikana wakati huo, na kwa hivyo itifaki haikuwahi kutekelezwa kwa vitendo. Baada ya 2009, hata hivyo, mara tu mwafaka uliogatuliwa wa Bitcoin ulipotengenezwa, idadi ya programu mbadala zilianza kuibuka kwa kasi.

- **Namecoin** - iliyoundwa mnamo 2010, [Namecoin](https://namecoin.org/) inaelezewa vyema kama hifadhidata ya usajili wa majina iliyogatuliwa. Katika itifaki zilizogatuliwa kama Tor, Bitcoin na BitMessage, kunahitaji kuwa na njia fulani ya kutambua akaunti ili watu wengine waweze kuingiliana nazo, lakini katika suluhisho zote zilizopo aina pekee ya kitambulisho kinachopatikana ni heshi ya nasibu kama `1LW79wp5ZBqaHW1jL5TCiBCrhQYtHagUWy`. Kimsingi, mtu angependa kuweza kuwa na akaunti yenye jina kama "george". Hata hivyo, tatizo ni kwamba ikiwa mtu mmoja anaweza kuunda akaunti inayoitwa "george" basi mtu mwingine anaweza kutumia mchakato huo huo kusajili "george" kwa ajili yao pia na kujifanya kuwa wao. Suluhisho pekee ni dhana ya wa kwanza kuwasilisha, ambapo msajili wa kwanza anafanikiwa na wa pili anashindwa - tatizo linalofaa kikamilifu kwa itifaki ya mwafaka ya Bitcoin. Namecoin ndio utekelezaji wa zamani zaidi, na wenye mafanikio zaidi, wa mfumo wa usajili wa majina kwa kutumia wazo kama hilo.
- **Sarafu za rangi (Colored coins)** - madhumuni ya [sarafu za rangi](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit) ni kutumika kama itifaki ya kuruhusu watu kuunda sarafu zao za dijitali - au, katika kesi muhimu ndogo ya sarafu yenye kitengo kimoja, tokeni za dijitali, kwenye mnyororo wa vitalu wa Bitcoin. Katika itifaki ya sarafu za rangi, mtu "hutoa" sarafu mpya kwa kugawa rangi hadharani kwa UTXO maalum ya Bitcoin, na itifaki inafafanua kwa kujirudia rangi ya UTXO zingine kuwa sawa na rangi ya maingizo ambayo muamala uliounda ulitumia (baadhi ya sheria maalum hutumika katika kesi ya maingizo ya rangi mchanganyiko). Hii inaruhusu watumiaji kudumisha pochi zilizo na UTXO za rangi maalum pekee na kuzituma kama bitcoins za kawaida, wakirudi nyuma kupitia mnyororo wa vitalu ili kubaini rangi ya UTXO yoyote wanayopokea.
- **Metacoins** - wazo nyuma ya metacoin ni kuwa na itifaki inayoishi juu ya Bitcoin, ikitumia miamala ya Bitcoin kuhifadhi miamala ya metacoin lakini ikiwa na kazi tofauti ya mpito wa hali, `APPLY'`. Kwa sababu itifaki ya metacoin haiwezi kuzuia miamala batili ya metacoin kuonekana katika mnyororo wa vitalu wa Bitcoin, sheria inaongezwa kwamba ikiwa `APPLY'(S,TX)` inarudisha hitilafu, itifaki inarudi kwa chaguo-msingi la `APPLY'(S,TX) = S`. Hii inatoa utaratibu rahisi wa kuunda itifaki ya sarafu-fiche kiholela, ikiwezekana na vipengele vya hali ya juu ambavyo haviwezi kutekelezwa ndani ya Bitcoin yenyewe, lakini kwa gharama ndogo sana ya maendeleo kwani ugumu wa uchimbaji na mtandao tayari unashughulikiwa na itifaki ya Bitcoin. Metacoins zimetumika kutekeleza baadhi ya madarasa ya mikataba ya kifedha, usajili wa majina na ubadilishanaji uliogatuliwa.

Hivyo, kwa ujumla, kuna mbinu mbili za kujenga itifaki ya mwafaka: kujenga mtandao unaojitegemea, na kujenga itifaki juu ya Bitcoin. Mbinu ya kwanza, ingawa imefanikiwa kwa kiasi katika kesi ya programu kama Namecoin, ni ngumu kutekeleza; kila utekelezaji wa mtu binafsi unahitaji kuanzisha mnyororo wa vitalu unaojitegemea, pamoja na kujenga na kupima msimbo wote muhimu wa mpito wa hali na mtandao. Zaidi ya hayo, tunatabiri kwamba seti ya programu za teknolojia ya mwafaka iliyogatuliwa itafuata usambazaji wa sheria ya nguvu ambapo idadi kubwa ya programu zingekuwa ndogo sana kuhalalisha mnyororo wao wa vitalu, na tunaona kwamba kuna madarasa makubwa ya programu tumizi zilizogatuliwa (dapps), haswa mashirika yanayojitegemea yaliyogatuliwa, ambayo yanahitaji kuingiliana.

Mbinu inayotegemea Bitcoin, kwa upande mwingine, ina kasoro kwamba hairithi vipengele vya uthibitishaji wa malipo uliorahisishwa wa Bitcoin. SPV inafanya kazi kwa Bitcoin kwa sababu inaweza kutumia kina cha mnyororo wa vitalu kama mbadala wa uhalali; wakati fulani, mara tu wahenga wa muamala wanaporudi nyuma vya kutosha, ni salama kusema kwamba walikuwa sehemu halali ya hali. Itifaki-meta zinazotegemea mnyororo wa vitalu, kwa upande mwingine, haziwezi kulazimisha mnyororo wa vitalu kutojumuisha miamala ambayo si halali ndani ya muktadha wa itifaki zao wenyewe. Kwa hivyo, utekelezaji salama kabisa wa itifaki-meta ya SPV ungehitaji kuchanganua nyuma hadi mwanzo wa mnyororo wa vitalu wa Bitcoin ili kubaini ikiwa miamala fulani ni halali au la. Kwa sasa, utekelezaji wote "mwepesi" wa itifaki-meta zinazotegemea Bitcoin unategemea seva inayoaminika kutoa data, bila shaka matokeo yasiyofaa sana haswa wakati moja ya madhumuni ya msingi ya sarafu-fiche ni kuondoa hitaji la uaminifu.

### Uandishi wa Hati (Scripting) {#scripting}

Hata bila viendelezi vyovyote, itifaki ya Bitcoin kwa kweli inawezesha toleo dhaifu la dhana ya "mikataba mahiri". UTXO katika Bitcoin inaweza kumilikiwa sio tu na ufunguo wa umma, bali pia na hati ngumu zaidi iliyoonyeshwa katika lugha rahisi ya programu inayotegemea rundo. Katika dhana hii, muamala unaotumia UTXO hiyo lazima utoe data inayokidhi hati. Hakika, hata utaratibu wa msingi wa umiliki wa ufunguo wa umma unatekelezwa kupitia hati: hati inachukua sahihi ya tao la duaradufu kama ingizo, inathibitisha dhidi ya muamala na anwani inayomiliki UTXO, na inarudisha 1 ikiwa uthibitishaji umefanikiwa na 0 vinginevyo. Hati zingine, ngumu zaidi, zipo kwa kesi mbalimbali za ziada za matumizi. Kwa mfano, mtu anaweza kuunda hati inayohitaji sahihi kutoka kwa funguo mbili kati ya tatu za siri zilizotolewa ili kuthibitisha ("saini-nyingi"), usanidi muhimu kwa akaunti za kampuni, akaunti salama za akiba na baadhi ya hali za amana za mfanyabiashara. Hati pia zinaweza kutumika kulipa fadhila kwa suluhisho la shida za kimahesabu, na mtu anaweza hata kuunda hati inayosema kitu kama "UTXO hii ya Bitcoin ni yako ikiwa unaweza kutoa uthibitisho wa SPV kwamba ulinitumia muamala wa Dogecoin wa thamani hii", kimsingi ikiruhusu ubadilishanaji uliogatuliwa wa sarafu-fiche tofauti.

Hata hivyo, lugha ya uandishi wa hati kama ilivyotekelezwa katika Bitcoin ina mapungufu kadhaa muhimu:

- **Ukosefu wa ukamilifu wa Turing** - yaani, ingawa kuna kitengo kikubwa cha hesabu ambacho lugha ya uandishi wa hati ya Bitcoin inasaidia, haisaidii karibu kila kitu. Kategoria kuu inayokosekana ni vitanzi (loops). Hili linafanywa ili kuepuka vitanzi visivyo na mwisho wakati wa uthibitishaji wa muamala; kinadharia ni kikwazo kinachoweza kushindwa kwa watengenezaji wa hati, kwani kitanzi chochote kinaweza kuigwa kwa kurudia tu msimbo wa msingi mara nyingi na taarifa ya 'if', lakini inasababisha hati ambazo hazina ufanisi sana wa nafasi. Kwa mfano, kutekeleza algoriti mbadala ya sahihi ya tao la duaradufu kunaweza kuhitaji raundi 256 za kuzidisha zinazorudiwa zote zikijumuishwa kibinafsi kwenye msimbo.
- **Upofu wa thamani** - hakuna njia kwa hati ya UTXO kutoa udhibiti mzuri juu ya kiasi kinachoweza kutolewa. Kwa mfano, kesi moja yenye nguvu ya matumizi ya mkataba wa orakeli itakuwa mkataba wa kuzuia hasara, ambapo A na B wanaweka BTC yenye thamani ya $1000 na baada ya siku 30 hati inatuma BTC yenye thamani ya $1000 kwa A na iliyobaki kwa B. Hii ingehitaji orakeli kuamua thamani ya 1 BTC katika USD, lakini hata hivyo ni uboreshaji mkubwa katika suala la uaminifu na mahitaji ya miundombinu juu ya suluhisho zilizowekwa kati kikamilifu ambazo zinapatikana sasa. Hata hivyo, kwa sababu UTXO ni zote-au-hakuna, njia pekee ya kufanikisha hili ni kupitia udukuzi usio na ufanisi sana wa kuwa na UTXO nyingi za thamani tofauti (k.m., UTXO moja ya 2<sup>k</sup> kwa kila k hadi 30) na kuwa na orakeli kuchagua ni UTXO gani ya kutuma kwa A na ipi kwa B.
- **Ukosefu wa hali** - UTXO inaweza kutumika au kutotumika; hakuna fursa ya mikataba ya hatua nyingi au hati ambazo huweka hali nyingine yoyote ya ndani zaidi ya hiyo. Hii inafanya iwe vigumu kufanya mikataba ya chaguzi za hatua nyingi, matoleo ya ubadilishanaji uliogatuliwa au itifaki za ufungumanisho wa kriptografia za hatua mbili (muhimu kwa fadhila salama za kimahesabu). Pia inamaanisha kuwa UTXO inaweza tu kutumika kujenga mikataba rahisi, ya mara moja na sio mikataba ngumu zaidi "yenye hali" kama vile mashirika yaliyogatuliwa, na inafanya itifaki-meta kuwa ngumu kutekeleza. Hali ya mfumo wa namba mbili (binary) pamoja na upofu wa thamani pia inamaanisha kuwa programu nyingine muhimu, vikomo vya utoaji, haiwezekani.
- **Upofu wa mnyororo wa vitalu** - UTXO ni vipofu kwa data ya mnyororo wa vitalu kama vile nonsi, muhuri wa muda na heshi ya kitalu kilichotangulia. Hii inazuia sana programu katika kamari, na kategoria zingine kadhaa, kwa kunyima lugha ya uandishi wa hati chanzo cha thamani cha unasibu.

Hivyo, tunaona mbinu tatu za kujenga programu za hali ya juu juu ya sarafu-fiche: kujenga mnyororo wa vitalu mpya, kutumia uandishi wa hati juu ya Bitcoin, na kujenga itifaki-meta juu ya Bitcoin. Kujenga mnyororo wa vitalu mpya kunaruhusu uhuru usio na kikomo katika kujenga seti ya vipengele, lakini kwa gharama ya muda wa maendeleo, juhudi za kuanzisha na usalama. Kutumia uandishi wa hati ni rahisi kutekeleza na kusanifisha, lakini ni mdogo sana katika uwezo wake, na itifaki-meta, ingawa ni rahisi, zinakabiliwa na makosa katika uwezo wa kuongezeka. Kwa Ethereum, tunakusudia kujenga mfumo mbadala ambao unatoa faida kubwa zaidi katika urahisi wa maendeleo pamoja na sifa zenye nguvu zaidi za kiteja chepesi, huku kwa wakati huo huo ukiruhusu programu kushiriki mazingira ya kiuchumi na usalama wa mnyororo wa vitalu.

## Ethereum {#ethereum}

Nia ya Ethereum ni kuunda itifaki mbadala ya kujenga programu tumizi zilizogatuliwa (dapps), ikitoa seti tofauti ya mabadilishano ambayo tunaamini itakuwa muhimu sana kwa kundi kubwa la programu tumizi zilizogatuliwa, kwa kutilia mkazo hasa katika hali ambapo muda wa haraka wa uundaji, usalama kwa programu tumizi ndogo na zinazotumiwa mara chache, na uwezo wa programu tumizi tofauti kuingiliana kwa ufanisi sana, ni muhimu. Ethereum inafanya hivi kwa kujenga kile ambacho kimsingi ni tabaka la msingi la kufikirika la mwisho: mnyororo wa vitalu wenye lugha ya programu iliyojengewa ndani iliyokamilika kwa Turing, inayoruhusu mtu yeyote kuandika mikataba mahiri na programu tumizi zilizogatuliwa ambapo wanaweza kuunda sheria zao wenyewe za kiholela za umiliki, miundo ya miamala na vitendaji vya mpito wa hali. Toleo la msingi sana la Namecoin linaweza kuandikwa katika mistari miwili ya msimbo, na itifaki zingine kama sarafu na mifumo ya sifa inaweza kujengwa kwa chini ya ishirini. Mikataba mahiri, "masanduku" ya kriptografia ambayo yana thamani na kuifungua tu ikiwa masharti fulani yametimizwa, pia inaweza kujengwa juu ya jukwaa, ikiwa na nguvu kubwa zaidi kuliko ile inayotolewa na uandishi wa msimbo wa Bitcoin kwa sababu ya nguvu zilizoongezwa za ukamilifu wa Turing, ufahamu wa thamani, ufahamu wa mnyororo wa vitalu na hali.

### Akaunti za Ethereum {#ethereum-accounts}

Katika Ethereum, hali inaundwa na vitu vinavyoitwa "akaunti", huku kila akaunti ikiwa na anwani ya baiti 20 na mipito ya hali ikiwa ni uhamisho wa moja kwa moja wa thamani na taarifa kati ya akaunti. Akaunti ya Ethereum ina sehemu nne:

- **Nonsi**, kihesabio kinachotumika kuhakikisha kila muamala unaweza kuchakatwa mara moja tu
- **Salio la etha** la sasa la akaunti
- **Msimbo wa mkataba** wa akaunti, ikiwa upo
- **Hifadhi** ya akaunti (tupu kwa chaguo-msingi)

"Etha" ndio mafuta makuu ya ndani ya kripto ya Ethereum, na inatumika kulipia ada za muamala. Kwa ujumla, kuna aina mbili za akaunti: **akaunti zinazomilikiwa na nje**, zinazodhibitiwa na funguo za siri, na **akaunti za mkataba**, zinazodhibitiwa na msimbo wao wa mkataba. Akaunti inayomilikiwa na nje haina msimbo, na mtu anaweza kutuma jumbe kutoka kwa akaunti inayomilikiwa na nje kwa kuunda na kusaini muamala; katika akaunti ya mkataba, kila wakati akaunti ya mkataba inapopokea ujumbe msimbo wake huwashwa, na kuiruhusu kusoma na kuandika kwenye hifadhi ya ndani na kutuma jumbe zingine au kuunda mikataba kwa zamu.

Kumbuka kwamba "mikataba" katika Ethereum haipaswi kuonekana kama kitu ambacho kinapaswa "kutimizwa" au "kuzingatiwa"; badala yake, ni kama "mawakala wanaojitegemea" wanaoishi ndani ya mazingira ya utekelezaji ya Ethereum, kila wakati wakitekeleza kipande maalum cha msimbo wanapo "chokozwa" na ujumbe au muamala, na kuwa na udhibiti wa moja kwa moja juu ya salio lao la etha na hifadhi yao ya ufunguo/thamani ili kufuatilia vigezo vya kudumu.

### Jumbe na Miamala {#messages-and-transactions}

Neno "muamala" linatumika katika Ethereum kurejelea kifurushi cha data kilichosainiwa ambacho huhifadhi ujumbe utakaotumwa kutoka kwa akaunti inayomilikiwa na nje. Miamala ina:

- Mpokeaji wa ujumbe
- Sahihi inayomtambulisha mtumaji
- Kiasi cha etha cha kuhamisha kutoka kwa mtumaji kwenda kwa mpokeaji
- Sehemu ya data ya hiari
- Thamani ya `STARTGAS`, inayowakilisha idadi ya juu zaidi ya hatua za kimahesabu ambazo utekelezaji wa muamala unaruhusiwa kuchukua
- Thamani ya `GASPRICE`, inayowakilisha ada ambayo mtumaji analipa kwa kila hatua ya kimahesabu

Tatu za kwanza ni sehemu za kawaida zinazotarajiwa katika sarafu-fiche yoyote. Sehemu ya data haina kazi kwa chaguo-msingi, lakini mashine pepe ina msimbo wa operesheni ambao mkataba unaweza kutumia kufikia data; kama mfano wa matumizi, ikiwa mkataba unafanya kazi kama huduma ya usajili wa kikoa mnyororoni, basi inaweza kutaka kutafsiri data inayopitishwa kwake kama ina "sehemu" mbili, sehemu ya kwanza ikiwa ni kikoa cha kusajili na sehemu ya pili ikiwa ni anwani ya IP ya kukisajili. Mkataba ungesoma thamani hizi kutoka kwa data ya ujumbe na kuziweka ipasavyo kwenye hifadhi.

Sehemu za `STARTGAS` na `GASPRICE` ni muhimu kwa muundo wa Ethereum wa kuzuia kunyimwa huduma. Ili kuzuia mizunguko isiyo na kikomo ya bahati mbaya au ya uhasama au upotevu mwingine wa kimahesabu katika msimbo, kila muamala unahitajika kuweka kikomo cha hatua ngapi za kimahesabu za utekelezaji wa msimbo unaweza kutumia. Kipimo cha msingi cha mahesabu ni "gesi"; kwa kawaida, hatua ya kimahesabu inagharimu gesi 1, lakini baadhi ya operesheni zinagharimu kiasi kikubwa cha gesi kwa sababu ni ghali zaidi kimahesabu, au zinaongeza kiasi cha data ambacho lazima kihifadhiwe kama sehemu ya hali. Pia kuna ada ya gesi 5 kwa kila baiti katika data ya muamala. Nia ya mfumo wa ada ni kumhitaji mshambuliaji kulipa kwa uwiano kwa kila rasilimali anayotumia, ikiwa ni pamoja na mahesabu, kipimo data na hifadhi; kwa hivyo, muamala wowote unaosababisha mtandao kutumia kiasi kikubwa cha rasilimali hizi lazima uwe na ada ya gesi inayolingana takriban na ongezeko hilo.

### Jumbe {#messages}

Mikataba ina uwezo wa kutuma "jumbe" kwa mikataba mingine. Jumbe ni vitu pepe ambavyo havijawahi kufuatiliwa na vipo tu katika mazingira ya utekelezaji ya Ethereum. Ujumbe una:

- Mtumaji wa ujumbe (iliyodokezwa)
- Mpokeaji wa ujumbe
- Kiasi cha etha cha kuhamisha pamoja na ujumbe
- Sehemu ya data ya hiari
- Thamani ya `STARTGAS`

Kimsingi, ujumbe ni kama muamala, isipokuwa unazalishwa na mkataba na sio mhusika wa nje. Ujumbe unazalishwa wakati mkataba unaotekeleza msimbo kwa sasa unatekeleza msimbo wa operesheni wa `CALL`, ambao unazalisha na kutekeleza ujumbe. Kama muamala, ujumbe husababisha akaunti inayopokea kuendesha msimbo wake. Hivyo, mikataba inaweza kuwa na uhusiano na mikataba mingine kwa njia sawa kabisa na wahusika wa nje wanavyoweza.

Kumbuka kwamba kibali cha gesi kilichotolewa na muamala au mkataba kinatumika kwa jumla ya gesi inayotumiwa na muamala huo na utekelezaji mdogo wote. Kwa mfano, ikiwa mhusika wa nje A anatuma muamala kwa B na gesi 1000, na B anatumia gesi 600 kabla ya kutuma ujumbe kwa C, na utekelezaji wa ndani wa C unatumia gesi 300 kabla ya kurudi, basi B anaweza kutumia gesi nyingine 100 kabla ya kuishiwa na gesi.

### Kitendaji cha Mpito wa Hali ya Ethereum {#ethereum-state-transition-function}

![Ether state transition](./ether-state-transition.png)

Kitendaji cha mpito wa hali ya Ethereum, `APPLY(S,TX) -> S'` kinaweza kufafanuliwa kama ifuatavyo:

1. Angalia ikiwa muamala umeundwa vizuri (yaani, una idadi sahihi ya thamani), sahihi ni halali, na nonsi inalingana na nonsi katika akaunti ya mtumaji. Ikiwa sivyo, rudisha hitilafu.
2. Kokotoa ada ya muamala kama `STARTGAS * GASPRICE`, na ubaini anwani ya kutuma kutoka kwenye sahihi. Toa ada kutoka kwenye salio la akaunti ya mtumaji na uongeze nonsi ya mtumaji. Ikiwa hakuna salio la kutosha la kutumia, rudisha hitilafu.
3. Anzisha `GAS = STARTGAS`, na uondoe kiasi fulani cha gesi kwa kila baiti ili kulipia baiti katika muamala.
4. Hamisha thamani ya muamala kutoka kwenye akaunti ya mtumaji kwenda kwenye akaunti inayopokea. Ikiwa akaunti inayopokea bado haipo, iunde. Ikiwa akaunti inayopokea ni mkataba, endesha msimbo wa mkataba hadi ukamilike au hadi utekelezaji uishiwe na gesi.
5. Ikiwa uhamisho wa thamani umeshindwa kwa sababu mtumaji hakuwa na pesa za kutosha, au utekelezaji wa msimbo uliishiwa na gesi, tengua mabadiliko yote ya hali isipokuwa malipo ya ada, na uongeze ada kwenye akaunti ya mchimbaji.
6. Vinginevyo, rudisha ada kwa gesi yote iliyosalia kwa mtumaji, na utume ada zilizolipwa kwa gesi iliyotumika kwa mchimbaji.

Kwa mfano, tuseme kwamba msimbo wa mkataba ni:

```py
if !self.storage[calldataload(0)]:
  self.storage[calldataload(0)] = calldataload(32)
```

Kumbuka kwamba kiuhalisia msimbo wa mkataba umeandikwa katika msimbo wa kiwango cha chini wa EVM; mfano huu umeandikwa katika Serpent, mojawapo ya lugha zetu za kiwango cha juu, kwa uwazi, na inaweza kukusanywa hadi kwenye msimbo wa EVM. Tuseme kwamba hifadhi ya mkataba inaanza ikiwa tupu, na muamala unatumwa ukiwa na thamani ya etha 10, gesi 2000, bei ya gesi ya etha 0.001, na baiti 64 za data, huku baiti 0-31 zikiwakilisha nambari `2` na baiti 32-63 zikiwakilisha mfuatano `CHARLIE`<sup>[fn3](#notes)</sup>. Mchakato wa kitendaji cha mpito wa hali katika kesi hii ni kama ifuatavyo:

1. Angalia kwamba muamala ni halali na umeundwa vizuri.
2. Angalia kwamba mtumaji wa muamala ana angalau 2000 \* 0.001 = etha 2. Ikiwa ndivyo, basi toa etha 2 kutoka kwenye akaunti ya mtumaji.
3. Anzisha gesi = 2000; ukichukulia muamala una urefu wa baiti 170 na ada ya baiti ni 5, toa 850 ili kubaki na gesi 1150.
4. Toa etha 10 zaidi kutoka kwenye akaunti ya mtumaji, na uiongeze kwenye akaunti ya mkataba.
5. Endesha msimbo. Katika kesi hii, hii ni rahisi: inaangalia ikiwa hifadhi ya mkataba kwenye faharisi `2` inatumika, inagundua kuwa haitumiki, na hivyo inaweka hifadhi kwenye faharisi `2` kuwa thamani `CHARLIE`. Tuseme hii inachukua gesi 187, kwa hivyo kiasi kilichosalia cha gesi ni 1150 - 187 = 963
6. Ongeza 963 \* 0.001 = etha 0.963 kurudi kwenye akaunti ya mtumaji, na urudishe hali inayotokana.

Ikiwa hakukuwa na mkataba upande wa kupokea wa muamala, basi jumla ya ada ya muamala ingekuwa sawa tu na `GASPRICE` iliyotolewa ikizidishwa na urefu wa muamala katika baiti, na data iliyotumwa pamoja na muamala isingekuwa na umuhimu.

Kumbuka kwamba jumbe hufanya kazi sawa na miamala katika suala la kutengua: ikiwa utekelezaji wa ujumbe utaishiwa na gesi, basi utekelezaji wa ujumbe huo, na utekelezaji mwingine wote ulioanzishwa na utekelezaji huo, hutengua, lakini utekelezaji mkuu hauhitaji kutengua. Hii inamaanisha kuwa ni "salama" kwa mkataba kuita mkataba mwingine, kana kwamba A anaita B na gesi G basi utekelezaji wa A umehakikishiwa kupoteza gesi G pekee. Hatimaye, kumbuka kwamba kuna msimbo wa operesheni, `CREATE`, ambao unaunda mkataba; mbinu zake za utekelezaji kwa ujumla zinafanana na `CALL`, isipokuwa kwamba matokeo ya utekelezaji huamua msimbo wa mkataba mpya ulioundwa.

### Utekelezaji wa Msimbo {#code-execution}

Msimbo katika mikataba ya Ethereum umeandikwa katika lugha ya msimbo wa baiti ya kiwango cha chini, inayotegemea staki, inayojulikana kama "msimbo wa mashine pepe ya Ethereum" au "msimbo wa EVM". Msimbo unajumuisha mfululizo wa baiti, ambapo kila baiti inawakilisha operesheni. Kwa ujumla, utekelezaji wa msimbo ni mzunguko usio na kikomo ambao unajumuisha kutekeleza mara kwa mara operesheni kwenye kihesabio cha programu cha sasa (ambacho huanza kwa sifuri) na kisha kuongeza kihesabio cha programu kwa moja, hadi mwisho wa msimbo ufikiwe au hitilafu au maagizo ya `STOP` au `RETURN` yagunduliwe. Operesheni zina ufikiaji wa aina tatu za nafasi za kuhifadhi data:

- **Staki**, kontena la anayeingia-mwisho-hutoka-kwanza ambalo thamani zinaweza kusukumwa na kutolewa
- **Kumbukumbu**, safu ya baiti inayoweza kupanuliwa bila kikomo
- **Hifadhi** ya muda mrefu ya mkataba, hifadhi ya ufunguo/thamani. Tofauti na staki na kumbukumbu, ambazo huwekwa upya baada ya mahesabu kuisha, hifadhi hudumu kwa muda mrefu.

Msimbo pia unaweza kufikia thamani, mtumaji na data ya ujumbe unaoingia, pamoja na data ya kichwa cha kizuizi, na msimbo pia unaweza kurudisha safu ya baiti ya data kama matokeo.

Muundo rasmi wa utekelezaji wa msimbo wa EVM ni rahisi kwa kushangaza. Wakati mashine pepe ya Ethereum inafanya kazi, hali yake kamili ya kimahesabu inaweza kufafanuliwa na tuple `(block_state, transaction, message, code, memory, stack, pc, gas)`, ambapo `block_state` ni hali ya kimataifa iliyo na akaunti zote na inajumuisha salio na hifadhi. Mwanzoni mwa kila mzunguko wa utekelezaji, maagizo ya sasa yanapatikana kwa kuchukua baiti ya `pc` ya `code` (au 0 ikiwa `pc >= len(code)`), na kila agizo lina ufafanuzi wake kulingana na jinsi linavyoathiri tuple. Kwa mfano, `ADD` inatoa vitu viwili kutoka kwenye staki na kusukuma jumla yake, inapunguza `gas` kwa 1 na kuongeza `pc` kwa 1, na `SSTORE` inatoa vitu viwili vya juu kutoka kwenye staki na kuingiza kitu cha pili kwenye hifadhi ya mkataba kwenye faharisi iliyobainishwa na kitu cha kwanza. Ingawa kuna njia nyingi za kuboresha utekelezaji wa mashine pepe ya Ethereum kupitia ukusanyaji wa wakati-sahihi, utekelezaji wa msingi wa Ethereum unaweza kufanywa katika mistari mia chache ya msimbo.

### Mnyororo wa vitalu na Uchimbaji {#blockchain-and-mining}

![Ethereum apply block diagram](./ethereum-apply-block-diagram.png)

Mnyororo wa vitalu wa Ethereum kwa njia nyingi unafanana na mnyororo wa vitalu wa Bitcoin, ingawa una tofauti kadhaa. Tofauti kuu kati ya Ethereum na Bitcoin kuhusiana na usanifu wa mnyororo wa vitalu ni kwamba, tofauti na Bitcoin, vitalu vya Ethereum vina nakala ya orodha ya miamala na hali ya hivi karibuni. Mbali na hayo, thamani nyingine mbili, nambari ya kitalu na ugumu, pia zimehifadhiwa kwenye kitalu. Kanuni ya msingi ya uthibitishaji wa kitalu katika Ethereum ni kama ifuatavyo:

1. Angalia ikiwa kitalu kilichotangulia kilichorejelewa kipo na ni halali.
2. Angalia kwamba muhuri wa muda wa kitalu ni mkubwa kuliko ule wa kitalu kilichotangulia kilichorejelewa na chini ya dakika 15 katika siku zijazo
3. Angalia kwamba nambari ya kitalu, ugumu, mzizi wa muamala, mzizi wa mjomba na kikomo cha gesi (dhana mbalimbali za kiwango cha chini mahususi kwa Ethereum) ni halali.
4. Angalia kwamba Uthibitisho wa Kazi (PoW) kwenye kitalu ni halali.
5. Acha `S[0]` iwe hali mwishoni mwa kitalu kilichotangulia.
6. Acha `TX` iwe orodha ya miamala ya kitalu, na miamala `n`. Kwa `i` zote katika `0...n-1`, weka `S[i+1] = APPLY(S[i],TX[i])`. Ikiwa programu tumizi yoyote itarudisha hitilafu, au ikiwa jumla ya gesi iliyotumika kwenye kitalu hadi wakati huu inazidi `GASLIMIT`, rudisha hitilafu.
7. Acha `S_FINAL` iwe `S[n]`, lakini ukiongeza tuzo ya bloku inayolipwa kwa mchimbaji.
8. Angalia ikiwa mzizi wa mti wa Merkle wa hali `S_FINAL` ni sawa na mzizi wa hali ya mwisho uliotolewa kwenye kichwa cha kizuizi. Ikiwa ndivyo, kitalu ni halali; vinginevyo, si halali.

Mbinu hii inaweza kuonekana kuwa isiyofaa sana kwa mtazamo wa kwanza, kwa sababu inahitaji kuhifadhi hali nzima na kila kitalu, lakini kiuhalisia ufanisi unapaswa kulinganishwa na ule wa Bitcoin. Sababu ni kwamba hali imehifadhiwa katika muundo wa mti, na baada ya kila kitalu ni sehemu ndogo tu ya mti inahitaji kubadilishwa. Hivyo, kwa ujumla, kati ya vitalu viwili vilivyo karibu sehemu kubwa ya mti inapaswa kuwa sawa, na kwa hivyo data inaweza kuhifadhiwa mara moja na kurejelewa mara mbili kwa kutumia viashiria (yaani, heshi za miti midogo). Aina maalum ya mti inayojulikana kama "mti wa Patricia" inatumika kukamilisha hili, ikijumuisha marekebisho ya dhana ya mti wa Merkle ambayo inaruhusu nodi kuingizwa na kufutwa, na sio tu kubadilishwa, kwa ufanisi. Zaidi ya hayo, kwa sababu taarifa zote za hali ni sehemu ya kitalu cha mwisho, hakuna haja ya kuhifadhi historia nzima ya mnyororo wa vitalu - mkakati ambao, ikiwa ungeweza kutumika kwa Bitcoin, unaweza kuhesabiwa kutoa uokoaji wa nafasi mara 5-20.

Swali linaloulizwa mara kwa mara ni "wapi" msimbo wa mkataba unatekelezwa, kwa upande wa maunzi halisi. Hili lina jibu rahisi: mchakato wa kutekeleza msimbo wa mkataba ni sehemu ya ufafanuzi wa kitendaji cha mpito wa hali, ambacho ni sehemu ya kanuni ya uthibitishaji wa kitalu, kwa hivyo ikiwa muamala utaongezwa kwenye kitalu `B` utekelezaji wa msimbo ulioanzishwa na muamala huo utatekelezwa na nodi zote, sasa na katika siku zijazo, ambazo zinapakua na kuthibitisha kitalu `B`.

## Programu Tumizi {#applications}

Kwa ujumla, kuna aina tatu za programu tumizi juu ya Ethereum. Kitengo cha kwanza ni programu tumizi za kifedha, zinazowapa watumiaji njia zenye nguvu zaidi za kusimamia na kuingia katika mikataba kwa kutumia pesa zao. Hii inajumuisha sarafu ndogo, vitokanavyo na fedha, mikataba ya kujikinga, pochi za akiba, wosia, na hatimaye hata baadhi ya madaraja ya mikataba kamili ya ajira. Kitengo cha pili ni programu tumizi za nusu-kifedha, ambapo pesa inahusika lakini pia kuna upande mkubwa usio wa kifedha kwa kile kinachofanywa; mfano kamili ni zawadi zinazojitekeleza kwa suluhu za matatizo ya ukokotoaji. Hatimaye, kuna programu tumizi kama vile upigaji kura mtandaoni na utawala uliogatuliwa ambazo si za kifedha hata kidogo.

### Mifumo ya Tokeni {#token-systems}

Mifumo ya tokeni kwenye mnyororo wa vitalu ina matumizi mengi kuanzia sarafu ndogo zinazowakilisha rasilimali kama vile USD au dhahabu hadi hisa za kampuni, tokeni za kibinafsi zinazowakilisha mali mahiri, kuponi salama zisizoweza kughushiwa, na hata mifumo ya tokeni isiyo na uhusiano wowote na thamani ya kawaida, inayotumika kama mifumo ya pointi kwa ajili ya kutoa motisha. Mifumo ya tokeni ni rahisi kushangaza kutekeleza katika Ethereum. Jambo kuu la kuelewa ni kwamba kimsingi sarafu, au mfumo wa tokeni, ni hifadhidata yenye operesheni moja: toa vitengo X kutoka kwa A na upe vitengo X kwa B, kwa sharti kwamba (i) A alikuwa na angalau vitengo X kabla ya muamala na (2) muamala umeidhinishwa na A. Kile kinachohitajika ili kutekeleza mfumo wa tokeni ni kutekeleza mantiki hii katika mkataba.

Msimbo wa msingi wa kutekeleza mfumo wa tokeni katika Serpent unaonekana kama ifuatavyo:

```py
def send(to, value):
  if self.storage[msg.sender] >= value:
    self.storage[msg.sender] = self.storage[msg.sender] - value
    self.storage[to] = self.storage[to] + value
```

Kimsingi huu ni utekelezaji halisi wa chaguo la kukokotoa la mpito wa hali la "mfumo wa kibenki" lililoelezwa hapo juu katika waraka huu. Mistari michache ya ziada ya msimbo inahitaji kuongezwa ili kutoa hatua ya awali ya kusambaza vitengo vya sarafu hapo kwanza na matukio mengine machache ya kipekee, na kwa hakika chaguo la kukokotoa lingeongezwa ili kuruhusu mikataba mingine kuulizia salio la anwani. Lakini hivyo ndivyo ilivyo. Kinadharia, mifumo ya tokeni inayotegemea Ethereum inayofanya kazi kama sarafu ndogo inaweza kujumuisha kipengele kingine muhimu ambacho sarafu kuu zinazotegemea Bitcoin mnyororoni zinakosa: uwezo wa kulipa ada za muamala moja kwa moja katika sarafu hiyo. Njia ambayo hii ingetekelezwa ni kwamba mkataba ungedumisha salio la etha ambalo lingetumika kurejesha etha iliyotumika kulipa ada kwa mtumaji, na ingejaza tena salio hili kwa kukusanya vitengo vya sarafu ya ndani inavyochukua kama ada na kuviuza tena katika mnada unaoendelea kila wakati. Kwa hivyo watumiaji wangehitaji "kuwezesha" akaunti zao kwa etha, lakini mara tu etha inapokuwepo ingeweza kutumika tena kwa sababu mkataba ungeirejesha kila wakati.

### Vitokanavyo na fedha na Sarafu zenye Thamani Imara {#financial-derivatives-and-stable-value-currencies}

Vitokanavyo na fedha ndio matumizi ya kawaida ya "mkataba mahiri", na mojawapo ya rahisi zaidi kutekeleza katika msimbo. Changamoto kuu katika kutekeleza mikataba ya kifedha ni kwamba mingi inahitaji kurejelea kiashiria cha bei cha nje; kwa mfano, programu tumizi inayohitajika sana ni mkataba mahiri unaojikinga dhidi ya kubadilikabadilika kwa etha (au sarafu-fiche nyingine) kuhusiana na dola ya Marekani, lakini kufanya hivi kunahitaji mkataba kujua thamani ya ETH/USD ni nini. Njia rahisi zaidi ya kufanya hivi ni kupitia mkataba wa "mlisho wa data" unaodumishwa na mhusika mahususi (k.m., NASDAQ) ulioundwa ili mhusika huyo awe na uwezo wa kusasisha mkataba inapohitajika, na kutoa kiolesura kinachoruhusu mikataba mingine kutuma ujumbe kwa mkataba huo na kupata majibu yanayotoa bei.

Kwa kuzingatia kiungo hicho muhimu, mkataba wa kujikinga ungeonekana kama ifuatavyo:

1. Subiri mhusika A aweke etha 1000.
2. Subiri mhusika B aweke etha 1000.
3. Rekodi thamani ya USD ya etha 1000, iliyokokotolewa kwa kuulizia mkataba wa mlisho wa data, katika hifadhi, tuseme hii ni $x.
4. Baada ya siku 30, ruhusu A au B "kuwezesha tena" mkataba ili kutuma etha yenye thamani ya $x (iliyokokotolewa kwa kuulizia mkataba wa mlisho wa data tena ili kupata bei mpya) kwa A na iliyosalia kwa B.

Mkataba kama huo ungekuwa na uwezo mkubwa katika biashara ya kripto. Moja ya matatizo makuu yanayotajwa kuhusu sarafu-fiche ni ukweli kwamba inabadilikabadilika sana; ingawa watumiaji na wafanyabiashara wengi wanaweza kutaka usalama na urahisi wa kushughulika na rasilimali za kriptografia, huenda wasitake kukabiliana na uwezekano huo wa kupoteza 23% ya thamani ya fedha zao kwa siku moja. Hadi sasa, suluhisho linalopendekezwa zaidi limekuwa rasilimali zinazoungwa mkono na mtoaji; wazo ni kwamba mtoaji anaunda sarafu ndogo ambapo ana haki ya kutoa na kufuta vitengo, na kutoa kitengo kimoja cha sarafu kwa mtu yeyote anayewapa (nje ya mtandao) kitengo kimoja cha rasilimali maalum ya msingi (k.m., dhahabu, USD). Kisha mtoaji anaahidi kutoa kitengo kimoja cha rasilimali ya msingi kwa mtu yeyote anayerudisha kitengo kimoja cha rasilimali ya kripto. Utaratibu huu unaruhusu rasilimali yoyote isiyo ya kriptografia "kuinuliwa" kuwa rasilimali ya kriptografia, mradi tu mtoaji anaweza kuaminika.

Katika utendaji, hata hivyo, watoaji si mara zote waaminifu, na katika baadhi ya matukio miundombinu ya kibenki ni dhaifu sana, au ina uadui sana, kwa huduma kama hizo kuwepo. Vitokanavyo na fedha hutoa mbadala. Hapa, badala ya mtoaji mmoja kutoa fedha za kuunga mkono rasilimali, soko lililogatuliwa la walanguzi, wanaoweka dau kwamba bei ya rasilimali ya marejeleo ya kriptografia (k.m., ETH) itapanda, huchukua jukumu hilo. Tofauti na watoaji, walanguzi hawana chaguo la kukiuka upande wao wa makubaliano kwa sababu mkataba wa kujikinga unashikilia fedha zao katika amana. Kumbuka kwamba mbinu hii haijagatuliwa kikamilifu, kwa sababu chanzo kinachoaminika bado kinahitajika ili kutoa kiashiria cha bei, ingawa inaweza kujadiliwa kuwa hata hivyo huu ni uboreshaji mkubwa katika suala la kupunguza mahitaji ya miundombinu (tofauti na kuwa mtoaji, kutoa mlisho wa bei hakuhitaji leseni na kunaweza kuainishwa kama uhuru wa kujieleza) na kupunguza uwezekano wa udanganyifu.

### Mifumo ya Utambulisho na Sifa {#identity-and-reputation-systems}

Sarafu-fiche mbadala ya mapema zaidi kuliko zote, [Namecoin](http://namecoin.org/), ilijaribu kutumia mnyororo wa vitalu unaofanana na Bitcoin kutoa mfumo wa usajili wa majina, ambapo watumiaji wanaweza kusajili majina yao katika hifadhidata ya umma pamoja na data nyingine. Kesi kuu ya matumizi iliyotajwa ni kwa mfumo wa [DNS](https://wikipedia.org/wiki/Domain_Name_System), unaounganisha majina ya kikoa kama "bitcoin.org" (au, katika kesi ya Namecoin, "bitcoin.bit") kwa anwani ya IP. Kesi nyingine za matumizi zinajumuisha uthibitishaji wa barua pepe na uwezekano wa mifumo ya sifa iliyoboreshwa zaidi. Hapa kuna mkataba wa msingi wa kutoa mfumo wa usajili wa majina unaofanana na Namecoin kwenye Ethereum:

```py
def register(name, value):
  if !self.storage[name]:
    self.storage[name] = value
```

Mkataba ni rahisi sana; kimsingi ni hifadhidata ndani ya mtandao wa Ethereum ambayo inaweza kuongezwa, lakini haiwezi kurekebishwa au kuondolewa. Mtu yeyote anaweza kusajili jina lenye thamani fulani, na usajili huo kisha unadumu milele. Mkataba wa usajili wa majina ulioboreshwa zaidi pia utakuwa na "kifungu cha chaguo la kukokotoa" kinachoruhusu mikataba mingine kuuulizia, pamoja na utaratibu wa "mmiliki" (yaani, msajili wa kwanza) wa jina kubadilisha data au kuhamisha umiliki. Mtu anaweza hata kuongeza utendaji wa sifa na mtandao-wa-uaminifu juu yake.

### Hifadhi ya Faili Iliyogatuliwa {#decentralized-file-storage}

Katika miaka michache iliyopita, kumeibuka idadi ya kampuni changa maarufu za hifadhi ya faili mtandaoni, maarufu zaidi ikiwa ni Dropbox, zinazotafuta kuruhusu watumiaji kupakia nakala rudufu ya diski kuu zao na kufanya huduma ihifadhi nakala hiyo na kuruhusu mtumiaji kuifikia badala ya ada ya kila mwezi. Hata hivyo, kwa wakati huu soko la hifadhi ya faili wakati mwingine halina ufanisi kiasi; mtazamo wa haraka wa suluhu mbalimbali zilizopo unaonyesha kwamba, hasa katika kiwango cha "bonde la ajabu" cha GB 20-200 ambapo hakuna viwango vya bure wala punguzo la kiwango cha biashara vinavyotumika, bei za kila mwezi kwa gharama kuu za hifadhi ya faili ni kiasi kwamba unalipa zaidi ya gharama ya diski kuu nzima katika mwezi mmoja. Mikataba ya Ethereum inaweza kuruhusu uundaji wa mfumo ikolojia wa hifadhi ya faili iliyogatuliwa, ambapo watumiaji binafsi wanaweza kupata kiasi kidogo cha pesa kwa kukodisha diski kuu zao wenyewe na nafasi isiyotumika inaweza kutumika kupunguza zaidi gharama za hifadhi ya faili.

Sehemu kuu ya msingi ya kifaa kama hicho itakuwa kile tulichokiita "mkataba wa Dropbox uliogatuliwa". Mkataba huu unafanya kazi kama ifuatavyo. Kwanza, mtu anagawanya data inayohitajika katika vitalu, akisimba kila kitalu kwa ajili ya faragha, na kujenga mti wa Merkle kutoka kwayo. Kisha mtu anafanya mkataba na sheria kwamba, kila vitalu N, mkataba ungechagua faharisi ya nasibu katika mti wa Merkle (kwa kutumia heshi ya kitalu kilichotangulia, inayofikika kutoka kwa msimbo wa mkataba, kama chanzo cha unasibu), na kutoa etha X kwa huluki ya kwanza kutoa muamala wenye uthibitisho unaofanana na uthibitishaji wa malipo uliorahisishwa wa umiliki wa kitalu katika faharisi hiyo maalum kwenye mti. Wakati mtumiaji anataka kupakua tena faili lake, anaweza kutumia itifaki ya njia ya malipo madogo (k.m., kulipa szabo 1 kwa kila kilobaiti 32) ili kurejesha faili; mbinu yenye ufanisi zaidi wa ada ni kwa mlipaji kutochapisha muamala hadi mwisho, badala yake kubadilisha muamala na mwingine wenye faida kidogo zaidi wenye nonsi sawa baada ya kila kilobaiti 32.

Kipengele muhimu cha itifaki ni kwamba, ingawa inaweza kuonekana kama mtu anatumaini nodi nyingi za nasibu zisiamue kusahau faili, mtu anaweza kupunguza hatari hiyo hadi karibu na sifuri kwa kugawanya faili katika vipande vingi kupitia ushiriki wa siri, na kutazama mikataba ili kuona kila kipande bado kiko katika milki ya nodi fulani. Ikiwa mkataba bado unalipa pesa, hiyo inatoa uthibitisho wa kriptografia kwamba kuna mtu huko nje bado anahifadhi faili.

### Mashirika Yanayojitegemea Yaliyogatuliwa {#decentralized-autonomous-organizations}

Dhana ya jumla ya "shirika linalojitegemea lililogatuliwa" ni ile ya huluki pepe ambayo ina kundi fulani la wanachama au wanahisa ambao, labda kwa wingi wa 67%, wana haki ya kutumia fedha za huluki na kurekebisha msimbo wake. Wanachama wangeamua kwa pamoja jinsi shirika linapaswa kutenga fedha zake. Mbinu za kutenga fedha za DAO zinaweza kuanzia zawadi, mishahara hadi taratibu za kigeni zaidi kama vile sarafu ya ndani ili kutoa tuzo kwa kazi. Kimsingi hii inaiga misingi ya kisheria ya kampuni ya kitamaduni au isiyo ya faida lakini ikitumia tu teknolojia ya mnyororo wa vitalu wa kriptografia kwa utekelezaji. Kufikia sasa mazungumzo mengi kuhusu DAO yamekuwa karibu na mtindo wa "kibepari" wa "shirika linalojitegemea lililogatuliwa" (DAC) lenye wanahisa wanaopokea gawio na hisa zinazoweza kuuzwa; mbadala, labda unaoelezewa kama "jamii inayojitegemea iliyogatuliwa", ingekuwa na wanachama wote kuwa na sehemu sawa katika kufanya maamuzi na kuhitaji 67% ya wanachama waliopo kukubaliana kuongeza au kuondoa mwanachama. Sharti kwamba mtu mmoja anaweza tu kuwa na uanachama mmoja basi lingehitaji kutekelezwa kwa pamoja na kikundi.

Muhtasari wa jumla wa jinsi ya kuweka msimbo wa DAO ni kama ifuatavyo. Muundo rahisi zaidi ni kipande cha msimbo kinachojirekebisha ambacho hubadilika ikiwa theluthi mbili ya wanachama wanakubaliana na mabadiliko. Ingawa msimbo kinadharia ni isiyobadilika, mtu anaweza kuepuka hili kwa urahisi na kuwa na ubadilikaji wa kiutendaji kwa kuwa na vipande vya msimbo katika mikataba tofauti, na kuwa na anwani ya mikataba ipi ya kuita iliyohifadhiwa katika hifadhi inayoweza kurekebishwa. Katika utekelezaji rahisi wa mkataba kama huo wa DAO, kungekuwa na aina tatu za muamala, zinazotofautishwa na data iliyotolewa katika muamala:

- `[0,i,K,V]` kusajili pendekezo lenye faharisi `i` ili kubadilisha anwani kwenye faharisi ya hifadhi `K` kuwa thamani `V`
- `[1,i]` kusajili kura inayounga mkono pendekezo `i`
- `[2,i]` kukamilisha pendekezo `i` ikiwa kura za kutosha zimepigwa

Mkataba basi ungekuwa na vifungu kwa kila moja ya haya. Ungedumisha rekodi ya mabadiliko yote ya hifadhi yaliyo wazi, pamoja na orodha ya nani aliyezipigia kura. Pia ungekuwa na orodha ya wanachama wote. Wakati mabadiliko yoyote ya hifadhi yanapofikia theluthi mbili ya wanachama wanaoyapigia kura, muamala wa kukamilisha unaweza kutekeleza mabadiliko hayo. Muundo ulioboreshwa zaidi pia ungekuwa na uwezo wa kupiga kura uliojengewa ndani kwa vipengele kama vile kutuma muamala, kuongeza wanachama na kuondoa wanachama, na unaweza hata kutoa ukaimishaji wa kura wa mtindo wa [Demokrasia Kimiminika](https://wikipedia.org/wiki/Liquid_democracy) (yaani, mtu yeyote anaweza kumpangia mtu kumpigia kura, na upangaji ni wa kupitishwa kwa hivyo ikiwa A anampangia B na B anampangia C basi C huamua kura ya A). Muundo huu ungeruhusu DAO kukua kiasili kama jamii iliyogatuliwa, kuruhusu watu hatimaye kukaimisha jukumu la kuchuja nani ni mwanachama kwa wataalamu, ingawa tofauti na "mfumo wa sasa" wataalamu wanaweza kuibuka na kutoweka kwa urahisi kadiri muda unavyopita huku wanachama binafsi wa jamii wakibadilisha misimamo yao.

Mtindo mbadala ni kwa shirika lililogatuliwa, ambapo akaunti yoyote inaweza kuwa na hisa sifuri au zaidi, na theluthi mbili ya hisa zinahitajika ili kufanya uamuzi. Muundo kamili ungehusisha utendaji wa usimamizi wa rasilimali, uwezo wa kutoa ofa ya kununua au kuuza hisa, na uwezo wa kukubali ofa (ikiwezekana na utaratibu wa kulinganisha maagizo ndani ya mkataba). Ukaimishaji pia ungekuwepo kwa mtindo wa Demokrasia Kimiminika, ukijumuisha dhana ya "bodi ya wakurugenzi".

### Matumizi Zaidi {#further-applications}

**1. Pochi za akiba**. Tuseme kwamba Alice anataka kuweka fedha zake salama, lakini ana wasiwasi kwamba atapoteza au mtu atadukua ufunguo wa siri wake. Anaweka etha katika mkataba na Bob, benki, kama ifuatavyo:

- Alice pekee anaweza kutoa kiwango cha juu cha 1% ya fedha kwa siku.
- Bob pekee anaweza kutoa kiwango cha juu cha 1% ya fedha kwa siku, lakini Alice ana uwezo wa kufanya muamala na ufunguo wake kuzima uwezo huu.
- Alice na Bob kwa pamoja wanaweza kutoa kiasi chochote.

Kwa kawaida, 1% kwa siku inatosha kwa Alice, na ikiwa Alice anataka kutoa zaidi anaweza kuwasiliana na Bob kwa msaada. Ikiwa ufunguo wa Alice utadukuliwa, anakimbilia kwa Bob ili kuhamisha fedha kwenye mkataba mpya. Ikiwa atapoteza ufunguo wake, Bob atatoa fedha hizo hatimaye. Ikiwa Bob atageuka kuwa mwovu, basi anaweza kuzima uwezo wake wa kutoa.

**2. Bima ya mazao**. Mtu anaweza kufanya mkataba wa vitokanavyo na fedha kwa urahisi lakini akitumia mlisho wa data wa hali ya hewa badala ya faharisi yoyote ya bei. Ikiwa mkulima huko Iowa atanunua derivative inayolipa kinyume kulingana na mvua huko Iowa, basi ikiwa kuna ukame, mkulima atapokea pesa moja kwa moja na ikiwa kuna mvua ya kutosha mkulima atafurahi kwa sababu mazao yake yatafanya vizuri. Hii inaweza kupanuliwa kwa bima ya majanga ya asili kwa ujumla.

**3. Mlisho wa data uliogatuliwa**. Kwa mikataba ya kifedha ya tofauti, inaweza kuwezekana kugatua mlisho wa data kupitia itifaki inayoitwa "[SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed)". SchellingCoin kimsingi inafanya kazi kama ifuatavyo: Wahusika N wote wanaweka kwenye mfumo thamani ya data fulani (k.m., bei ya ETH/USD), thamani zinapangwa, na kila mtu kati ya asilimia ya 25 na 75 anapata tokeni moja kama tuzo. Kila mtu ana motisha ya kutoa jibu ambalo kila mtu mwingine atatoa, na thamani pekee ambayo idadi kubwa ya wachezaji wanaweza kukubaliana kiuhalisia ni chaguo-msingi dhahiri: ukweli. Hii inaunda itifaki iliyogatuliwa ambayo kinadharia inaweza kutoa idadi yoyote ya thamani, ikiwa ni pamoja na bei ya ETH/USD, halijoto huko Berlin au hata matokeo ya ukokotoaji fulani mgumu.

**4. Amana mahiri ya saini-nyingi**. Bitcoin inaruhusu mikataba ya muamala ya saini-nyingi ambapo, kwa mfano, funguo tatu kati ya tano zilizotolewa zinaweza kutumia fedha. Ethereum inaruhusu unyumbufu zaidi; kwa mfano, nne kati ya tano zinaweza kutumia kila kitu, tatu kati ya tano zinaweza kutumia hadi 10% kwa siku, na mbili kati ya tano zinaweza kutumia hadi 0.5% kwa siku. Zaidi ya hayo, saini-nyingi ya Ethereum ni isiyosawazishwa - pande mbili zinaweza kusajili sahihi zao kwenye mnyororo wa vitalu kwa nyakati tofauti na sahihi ya mwisho itatuma muamala moja kwa moja.

**5. Ukokotoaji wa wingu**. Teknolojia ya EVM pia inaweza kutumika kuunda mazingira ya ukokotoaji yanayoweza kuthibitishwa, kuruhusu watumiaji kuwauliza wengine kufanya ukokotoaji na kisha kwa hiari kuomba uthibitisho kwamba ukokotoaji katika vituo fulani vya ukaguzi vilivyochaguliwa kwa unasibu ulifanywa kwa usahihi. Hii inaruhusu kuundwa kwa soko la ukokotoaji wa wingu ambapo mtumiaji yeyote anaweza kushiriki na kompyuta yake ya mezani, kompyuta mpakato au seva maalum, na ukaguzi wa papo hapo pamoja na amana za usalama zinaweza kutumika kuhakikisha kwamba mfumo ni wa kuaminika (yaani, nodi haziwezi kudanganya kwa faida). Ingawa mfumo kama huo unaweza usiwe unafaa kwa kazi zote; kazi zinazohitaji kiwango cha juu cha mawasiliano kati ya michakato, kwa mfano, haziwezi kufanywa kwa urahisi kwenye wingu kubwa la nodi. Kazi nyingine, hata hivyo, ni rahisi sana kufanya sambamba; miradi kama SETI@home, folding@home na algoriti za kijeni zinaweza kutekelezwa kwa urahisi juu ya jukwaa kama hilo.

**6. Kamari ya rika-kwa-rika**. Idadi yoyote ya itifaki za kamari za rika-kwa-rika, kama vile [Cyberdice](http://www.cl.cam.ac.uk/~fms27/papers/2008-StajanoCla-cyberdice.pdf) ya Frank Stajano na Richard Clayton, inaweza kutekelezwa kwenye mnyororo wa vitalu wa Ethereum. Itifaki rahisi zaidi ya kamari kwa kweli ni mkataba wa tofauti kwenye heshi ya kitalu kinachofuata, na itifaki za hali ya juu zaidi zinaweza kujengwa kutoka hapo, na kuunda huduma za kamari zenye ada karibu na sifuri ambazo hazina uwezo wa kudanganya.

**7. Masoko ya utabiri**. Ikipewa orakeli au SchellingCoin, masoko ya utabiri pia ni rahisi kutekeleza, na masoko ya utabiri pamoja na SchellingCoin yanaweza kuthibitika kuwa programu tumizi kuu ya kwanza ya [futarchy](https://mason.gmu.edu/~rhanson/futarchy.html) kama itifaki ya utawala kwa mashirika yaliyogatuliwa.

**8. Masoko yaliyogatuliwa mnyororoni**, kwa kutumia mfumo wa utambulisho na sifa kama msingi.

## Mambo Mengine na Wasiwasi {#miscellanea-and-concerns}

### Utekelezaji Ulioboreshwa wa GHOST {#modified-ghost-implementation}

Itifaki ya "Greedy Heaviest Observed Subtree" (GHOST) ni ubunifu ulioanzishwa kwa mara ya kwanza na Yonatan Sompolinsky na Aviv Zohar mnamo [Desemba 2013](https://eprint.iacr.org/2013/881.pdf). Motisha nyuma ya GHOST ni kwamba minyororo ya vitalu yenye nyakati za uthibitisho wa haraka kwa sasa inakabiliwa na usalama uliopunguzwa kutokana na kiwango kikubwa cha vitalu vilivyopitwa na wakati (stale rate) - kwa sababu vitalu huchukua muda fulani kusambaa kwenye mtandao, ikiwa mchimbaji A atachimba kitalu na kisha mchimbaji B akachimba kitalu kingine kabla ya kitalu cha mchimbaji A kusambaa kwa B, kitalu cha mchimbaji B kitaishia kupotea na hakitachangia katika usalama wa mtandao. Zaidi ya hayo, kuna suala la uwekaji kati: ikiwa mchimbaji A ni bwawa la uchimbaji lenye asilimia 30 ya nguvu ya heshi na B ana asilimia 10 ya nguvu ya heshi, A atakuwa na hatari ya kuzalisha kitalu kilichopitwa na wakati asilimia 70 ya wakati (kwa kuwa asilimia 30 nyingine ya wakati A alizalisha kitalu cha mwisho na hivyo atapata data ya uchimbaji mara moja) wakati B atakuwa na hatari ya kuzalisha kitalu kilichopitwa na wakati asilimia 90 ya wakati. Hivyo, ikiwa muda kati ya vitalu ni mfupi kiasi cha kufanya kiwango cha kupitwa na wakati kuwa juu, A atakuwa na ufanisi zaidi kwa sababu tu ya ukubwa wake. Kwa athari hizi mbili kuunganishwa, minyororo ya vitalu inayozalisha vitalu haraka ina uwezekano mkubwa wa kusababisha bwawa moja la uchimbaji kuwa na asilimia kubwa ya kutosha ya nguvu ya heshi ya mtandao ili kuwa na udhibiti kamili juu ya mchakato wa uchimbaji.

Kama ilivyoelezwa na Sompolinsky na Zohar, GHOST inatatua suala la kwanza la upotevu wa usalama wa mtandao kwa kujumuisha vitalu vilivyopitwa na wakati katika hesabu ya mnyororo upi ni "mrefu zaidi"; yaani, si tu mzazi na wahenga zaidi wa kitalu, bali pia wazao waliopitwa na wakati wa mwanzilishi wa kitalu (katika msamiati wa Ethereum, "wajomba" au "uncles") huongezwa kwenye hesabu ya kitalu kipi kina jumla kubwa zaidi ya Uthibitisho wa Kazi (PoW) inayokiunga mkono. Ili kutatua suala la pili la upendeleo wa uwekaji kati, tunaenda mbali zaidi ya itifaki iliyoelezwa na Sompolinsky na Zohar, na pia kutoa tuzo za bloku kwa vitalu vilivyopitwa na wakati: kitalu kilichopitwa na wakati hupokea asilimia 87.5 ya tuzo yake ya msingi, na mpwa anayejumuisha kitalu kilichopitwa na wakati hupokea asilimia 12.5 iliyobaki. Hata hivyo, ada za muamala hazitolewi kwa wajomba.

Ethereum inatekeleza toleo lililorahisishwa la GHOST ambalo hushuka chini kwa viwango saba pekee. Hasa, inafafanuliwa kama ifuatavyo:

- Kitalu lazima kibainishe mzazi, na lazima kibainishe wajomba 0 au zaidi
- Mjomba aliyejumuishwa katika kitalu B lazima awe na sifa zifuatazo:
  - Lazima awe mtoto wa moja kwa moja wa kizazi cha k cha mwanzilishi wa B, ambapo `2 <= k <= 7`.
  - Hawezi kuwa mwanzilishi wa B
  - Mjomba lazima awe kichwa cha kizuizi halali, lakini hahitaji kuwa kitalu kilichothibitishwa hapo awali au hata kitalu halali
  - Mjomba lazima awe tofauti na wajomba wote waliojumuishwa katika vitalu vilivyotangulia na wajomba wengine wote waliojumuishwa katika kitalu kile kile (kuepuka ujumuishaji mara mbili)
- Kwa kila mjomba U katika kitalu B, mchimbaji wa B anapata asilimia 3.125 ya ziada iliyoongezwa kwenye tuzo yake ya coinbase na mchimbaji wa U anapata asilimia 93.75 ya tuzo ya kawaida ya coinbase.

Toleo hili lenye kikomo la GHOST, lenye wajomba wanaoweza kujumuishwa hadi vizazi 7 pekee, lilitumika kwa sababu mbili. Kwanza, GHOST isiyo na kikomo ingejumuisha matatizo mengi sana katika hesabu ya wajomba wapi kwa kitalu fulani ni halali. Pili, GHOST isiyo na kikomo yenye fidia kama inavyotumika katika Ethereum huondoa motisha kwa mchimbaji kuchimba kwenye mnyororo mkuu na si mnyororo wa mshambuliaji wa umma.

### Ada {#fees}

Kwa sababu kila muamala unaochapishwa kwenye mnyororo wa vitalu huweka gharama kwenye mtandao ya kuhitaji kuupakua na kuuthibitisha, kuna haja ya utaratibu fulani wa udhibiti, kwa kawaida ukihusisha ada za muamala, ili kuzuia matumizi mabaya. Mbinu ya msingi, inayotumika katika Bitcoin, ni kuwa na ada za hiari kabisa, ikitegemea wachimbaji kufanya kazi kama walinzi na kuweka viwango vya chini vinavyobadilika. Mbinu hii imepokelewa vizuri sana katika jamii ya Bitcoin hasa kwa sababu "inategemea soko", ikiruhusu usambazaji na mahitaji kati ya wachimbaji na watumaji wa miamala kuamua bei. Hata hivyo, tatizo la hoja hii ni kwamba usindikaji wa miamala si soko; ingawa inavutia kiasili kuchukulia usindikaji wa miamala kama huduma ambayo mchimbaji anatoa kwa mtumaji, kiuhalisia kila muamala ambao mchimbaji anaujumuisha utahitaji kusindikwa na kila nodi kwenye mtandao, hivyo sehemu kubwa ya gharama ya usindikaji wa miamala inabebwa na wahusika wengine na si mchimbaji anayefanya uamuzi wa kuujumuisha au la. Hivyo, matatizo ya janga la rasilimali za umma (tragedy-of-the-commons) yana uwezekano mkubwa wa kutokea.

Hata hivyo, inavyoonekana kasoro hii katika utaratibu unaotegemea soko, inapopewa dhana fulani isiyo sahihi ya kurahisisha, inajifuta yenyewe kimuujiza. Hoja ni kama ifuatavyo. Tuseme kwamba:

1. Muamala unasababisha operesheni `k`, ukitoa tuzo `kR` kwa mchimbaji yeyote anayeujumuisha ambapo `R` imewekwa na mtumaji na `k` na `R` zinaonekana (kwa kiasi fulani) kwa mchimbaji mapema.
2. Operesheni ina gharama ya usindikaji ya `C` kwa nodi yoyote (yaani, nodi zote zina ufanisi sawa)
3. Kuna nodi za uchimbaji `N`, kila moja ikiwa na nguvu sawa kabisa ya usindikaji (yaani, `1/N` ya jumla)
4. Hakuna nodi kamili zisizo za uchimbaji zilizopo.

Mchimbaji atakuwa tayari kusindika muamala ikiwa tuzo inayotarajiwa ni kubwa kuliko gharama. Hivyo, tuzo inayotarajiwa ni `kR/N` kwa kuwa mchimbaji ana nafasi ya `1/N` ya kusindika kitalu kinachofuata, na gharama ya usindikaji kwa mchimbaji ni `kC` tu. Hivyo, wachimbaji watajumuisha miamala ambapo `kR/N > kC`, au `R > NC`. Kumbuka kwamba `R` ni ada kwa kila operesheni inayotolewa na mtumaji, na hivyo ni kiwango cha chini cha faida ambayo mtumaji anapata kutokana na muamala, na `NC` ni gharama kwa mtandao mzima kwa pamoja ya kusindika operesheni. Hivyo, wachimbaji wana motisha ya kujumuisha tu miamala ambayo faida ya jumla ya matumizi inazidi gharama.

Hata hivyo, kuna mikengeuko kadhaa muhimu kutoka kwa dhana hizo katika uhalisia:

1. Mchimbaji hulipa gharama kubwa zaidi kusindika muamala kuliko nodi nyingine zinazothibitisha, kwa kuwa muda wa ziada wa uthibitishaji huchelewesha usambazaji wa kitalu na hivyo kuongeza nafasi ya kitalu kupitwa na wakati.
2. Kuna nodi kamili zisizo za uchimbaji.
3. Usambazaji wa nguvu ya uchimbaji unaweza kuishia kuwa usio na usawa kabisa katika vitendo.
4. Wafanyabiashara wa kubahatisha, maadui wa kisiasa na watu wenye nia mbaya ambao lengo lao linajumuisha kusababisha madhara kwa mtandao wapo, na wanaweza kuanzisha mikataba kwa ujanja ambapo gharama yao ni ndogo sana kuliko gharama inayolipwa na nodi nyingine zinazothibitisha.

(1) inatoa mwelekeo kwa mchimbaji kujumuisha miamala michache, na
(2) inaongeza `NC`; hivyo, athari hizi mbili angalau kwa kiasi fulani zinafutana.<sup>[Vipi?](https://web.archive.org/web/20250427212319/https://github.com/ethereum/wiki/issues/447#issuecomment-316972260#issuecomment-316972260)</sup>
(3) na (4) ndiyo suala kuu; ili kuyatatua tunaweka tu kikomo kinachobadilika: hakuna kitalu kinachoweza kuwa na operesheni zaidi ya mara
`BLK_LIMIT_FACTOR` ya wastani wa muda mrefu wa kielelezo unaosonga (long-term exponential moving average).
Hasa:

```js
blk.oplimit = floor((blk.parent.oplimit \* (EMAFACTOR - 1) +
floor(parent.opcount \* BLK\_LIMIT\_FACTOR)) / EMA\_FACTOR)
```

`BLK_LIMIT_FACTOR` na `EMA_FACTOR` ni namba zisizobadilika ambazo zitawekwa kuwa 65536 na 1.5 kwa wakati huu, lakini huenda zikabadilishwa baada ya uchambuzi zaidi.

Kuna sababu nyingine inayovunja moyo ukubwa mkubwa wa vitalu katika Bitcoin: vitalu vilivyo vikubwa vitachukua muda mrefu kusambaa, na hivyo kuwa na uwezekano mkubwa wa kupitwa na wakati. Katika Ethereum, vitalu vinavyotumia gesi nyingi pia vinaweza kuchukua muda mrefu kusambaa kwa sababu ni vikubwa kimaumbile na kwa sababu vinachukua muda mrefu kusindika mabadiliko ya hali ya muamala ili kuthibitisha. Kizuizi hiki cha ucheleweshaji ni jambo muhimu la kuzingatia katika Bitcoin, lakini si sana katika Ethereum kwa sababu ya itifaki ya GHOST; hivyo, kutegemea vikomo vya vitalu vilivyodhibitiwa hutoa msingi imara zaidi.

### Ukokotoaji na Ukamilifu wa Turing (Turing-Completeness) {#computation-and-turing-completeness}

Dokezo muhimu ni kwamba mashine pepe ya Ethereum imekamilika ki-Turing (Turing-complete); hii inamaanisha kuwa msimbo wa EVM unaweza kusimba ukokotoaji wowote unaoweza kufikirika kufanywa, ikiwa ni pamoja na mizunguko isiyo na mwisho (infinite loops). Msimbo wa EVM unaruhusu mizunguko kwa njia mbili. Kwanza, kuna maagizo ya `JUMP` yanayoruhusu programu kuruka nyuma kwenye eneo la awali katika msimbo, na maagizo ya `JUMPI` kufanya urukaji wa masharti, kuruhusu taarifa kama `while x < 27: x = x * 2`. Pili, mikataba inaweza kuita mikataba mingine, na hivyo kuruhusu uwezekano wa mizunguko kupitia kujirudia (recursion). Hili kwa asili linasababisha tatizo: je, watumiaji wenye nia mbaya wanaweza kimsingi kuzima wachimbaji na nodi kamili kwa kuwalazimisha kuingia kwenye mzunguko usio na mwisho? Suala hili linatokea kwa sababu ya tatizo katika sayansi ya kompyuta linalojulikana kama tatizo la kusimama (halting problem): hakuna njia ya kujua, kwa ujumla, kama programu fulani itawahi kusimama au la.

Kama ilivyoelezwa katika sehemu ya mabadiliko ya hali, suluhisho letu linafanya kazi kwa kuhitaji muamala kuweka idadi ya juu zaidi ya hatua za ukokotoaji inazoruhusiwa kuchukua, na ikiwa utekelezaji utachukua muda mrefu zaidi ukokotoaji unatenguliwa lakini ada bado zinalipwa. Ujumbe hufanya kazi kwa njia sawa. Ili kuonyesha motisha nyuma ya suluhisho letu, fikiria mifano ifuatayo:

- Mshambuliaji anaunda mkataba ambao unaendesha mzunguko usio na mwisho, na kisha anatuma muamala unaowasha mzunguko huo kwa mchimbaji. Mchimbaji atasindika muamala, akiendesha mzunguko usio na mwisho, na kusubiri uishiwe gesi. Ingawa utekelezaji unaishiwa gesi na kusimama katikati, muamala bado ni halali na mchimbaji bado anadai ada kutoka kwa mshambuliaji kwa kila hatua ya ukokotoaji.
- Mshambuliaji anaunda mzunguko mrefu sana usio na mwisho kwa nia ya kumlazimisha mchimbaji kuendelea kukokotoa kwa muda mrefu sana kiasi kwamba kufikia wakati ukokotoaji unakamilika vitalu vichache zaidi vitakuwa vimetoka na haitawezekana kwa mchimbaji kujumuisha muamala ili kudai ada. Hata hivyo, mshambuliaji atahitajika kuwasilisha thamani ya `STARTGAS` inayoweka kikomo cha idadi ya hatua za ukokotoaji ambazo utekelezaji unaweza kuchukua, hivyo mchimbaji atajua mapema kwamba ukokotoaji utachukua idadi kubwa sana ya hatua.
- Mshambuliaji anaona mkataba wenye msimbo wa aina fulani kama `send(A,contract.storage[A]); contract.storage[A] = 0`, na anatuma muamala wenye gesi ya kutosha tu kuendesha hatua ya kwanza lakini si ya pili (yaani, kufanya utoaji lakini kutoruhusu salio kupungua). Mwandishi wa mkataba hahitaji kuwa na wasiwasi kuhusu kujilinda dhidi ya mashambulizi kama hayo, kwa sababu ikiwa utekelezaji utasimama katikati mabadiliko yanatenguliwa.
- Mkataba wa kifedha unafanya kazi kwa kuchukua wastani wa milisho tisa ya data ya umiliki ili kupunguza hatari. Mshambuliaji anachukua udhibiti wa mmoja wa milisho ya data, ambayo imeundwa kurekebishika kupitia utaratibu wa wito wa anwani inayobadilika (variable-address-call) ulioelezwa katika sehemu ya DAO, na kuibadilisha ili kuendesha mzunguko usio na mwisho, na hivyo kujaribu kulazimisha majaribio yoyote ya kudai fedha kutoka kwa mkataba wa kifedha kuishiwa gesi. Hata hivyo, mkataba wa kifedha unaweza kuweka kikomo cha gesi kwenye ujumbe ili kuzuia tatizo hili.

Mbadala wa ukamilifu wa Turing ni kutokamilika kwa Turing (Turing-incompleteness), ambapo `JUMP` na `JUMPI` hazipo na nakala moja tu ya kila mkataba inaruhusiwa kuwepo kwenye rundo la wito (call stack) kwa wakati wowote. Kwa mfumo huu, mfumo wa ada ulioelezwa na kutokuwa na uhakika kuhusu ufanisi wa suluhisho letu huenda visiwe vya lazima, kwani gharama ya kutekeleza mkataba ingewekewa kikomo cha juu na ukubwa wake. Zaidi ya hayo, kutokamilika kwa Turing si kizuizi kikubwa hivyo; kati ya mifano yote ya mikataba tuliyofikiria ndani, hadi sasa ni mmoja tu uliohitaji mzunguko, na hata mzunguko huo ungeweza kuondolewa kwa kufanya marudio 26 ya kipande cha msimbo cha mstari mmoja. Kwa kuzingatia athari kubwa za ukamilifu wa Turing, na faida ndogo, kwa nini tusiwe tu na lugha isiyokamilika ki-Turing? Kiuhalisia, hata hivyo, kutokamilika kwa Turing ni mbali na kuwa suluhisho zuri kwa tatizo hili. Ili kuona kwa nini, fikiria mikataba ifuatayo:

```sh
C0: call(C1); call(C1);
C1: call(C2); call(C2);
C2: call(C3); call(C3);
...
C49: call(C50); call(C50);
C50: (run one step of a program and record the change in storage)
```

Sasa, tuma muamala kwa A. Hivyo, katika miamala 51, tuna mkataba unaochukua hatua za ukokotoaji 2<sup>50</sup>. Wachimbaji wangeweza kujaribu kugundua mabomu kama haya ya kimantiki mapema kwa kudumisha thamani kando ya kila mkataba inayobainisha idadi ya juu zaidi ya hatua za ukokotoaji inayoweza kuchukua, na kukokotoa hili kwa mikataba inayoita mikataba mingine kwa kujirudia, lakini hilo lingehitaji wachimbaji kukataza mikataba inayounda mikataba mingine (kwa kuwa uundaji na utekelezaji wa mikataba yote 26 hapo juu ungeweza kuunganishwa kwa urahisi kuwa mkataba mmoja). Jambo lingine lenye matatizo ni kwamba uwanja wa anwani wa ujumbe ni kigezo kinachobadilika, hivyo kwa ujumla inaweza hata isiwezekane kujua ni mikataba gani mingine ambayo mkataba fulani utaita mapema. Hivyo, kwa ujumla, tuna hitimisho la kushangaza: ukamilifu wa Turing ni rahisi kushangaza kusimamia, na ukosefu wa ukamilifu wa Turing ni mgumu kushangaza kusimamia isipokuwa udhibiti ule ule ukiwepo - lakini katika hali hiyo kwa nini usiruhusu tu itifaki iwe kamili ki-Turing?

### Sarafu na Utoaji {#currency-and-issuance}

Mtandao wa Ethereum unajumuisha sarafu yake iliyojengewa ndani, etha, ambayo inatumika kwa madhumuni mawili ya kutoa safu ya msingi ya ukwasi ili kuruhusu ubadilishanaji mzuri kati ya aina mbalimbali za rasilimali za dijitali na, muhimu zaidi, kutoa utaratibu wa kulipia ada za muamala. Kwa urahisi na kuepuka mabishano ya baadaye (tazama mjadala wa sasa wa mBTC/uBTC/satoshi katika Bitcoin), viwango vitapewa majina mapema:

- 1: wei
- 10<sup>12</sup>: szabo
- 10<sup>15</sup>: finney
- 10<sup>18</sup>: etha

Hii inapaswa kuchukuliwa kama toleo lililopanuliwa la dhana ya "dola" na "senti" au "BTC" na "satoshi". Katika siku za usoni, tunatarajia "etha" itatumika kwa miamala ya kawaida, "finney" kwa miamala midogo sana na "szabo" na "wei" kwa majadiliano ya kiufundi kuhusu ada na utekelezaji wa itifaki; viwango vilivyobaki vinaweza kuwa na manufaa baadaye na havipaswi kujumuishwa katika wateja (clients) kwa wakati huu.

Muundo wa utoaji utakuwa kama ifuatavyo:

- Etha itatolewa katika mauzo ya sarafu kwa bei ya etha 1000-2000 kwa kila BTC, utaratibu uliokusudiwa kufadhili shirika la Ethereum na kulipia maendeleo ambao umetumika kwa mafanikio na majukwaa mengine kama Mastercoin na NXT. Wanunuzi wa mapema watafaidika na punguzo kubwa zaidi. BTC itakayopatikana kutokana na mauzo itatumika kikamilifu kulipa mishahara na zawadi kwa watengenezaji na kuwekezwa katika miradi mbalimbali ya faida na isiyo ya faida katika mfumo wa ikolojia wa Ethereum na sarafu-fiche.
- 0.099x ya kiasi chote kilichouzwa (ETH 60102216) kitatengwa kwa shirika ili kufidia wachangiaji wa mapema na kulipa gharama zinazotokana na ETH kabla ya kitalu cha asili.
- 0.099x ya kiasi chote kilichouzwa kitadumishwa kama akiba ya muda mrefu.
- 0.26x ya kiasi chote kilichouzwa kitatengwa kwa wachimbaji kwa mwaka milele baada ya hatua hiyo.

| Kundi | Wakati wa uzinduzi | Baada ya mwaka 1 | Baada ya miaka 5 |
| ---------------------- | --------- | ------------ | ------------- |
| Vitengo vya sarafu | 1.198X | 1.458X | 2.498X |
| Wanunuzi | 83.5% | 68.6% | 40.0% |
| Akiba iliyotumika kabla ya mauzo | 8.26% | 6.79% | 3.96% |
| Akiba iliyotumika baada ya mauzo | 8.26% | 6.79% | 3.96% |
| Wachimbaji | 0% | 17.8% | 52.0% |

#### Kiwango cha Ukuaji wa Usambazaji wa Muda Mrefu (asilimia) {#long-term-supply-growth-rate-percent}

![Ethereum inflation](./ethereum-inflation.png)

_Licha ya utoaji wa sarafu wa mstari (linear), kama ilivyo kwa Bitcoin kadiri muda unavyopita kiwango cha ukuaji wa usambazaji hata hivyo huelekea sifuri._

Chaguzi mbili kuu katika muundo ulio hapo juu ni (1) uwepo na ukubwa wa bwawa la majaliwa (endowment pool), na (2) uwepo wa usambazaji wa mstari unaokua daima, tofauti na usambazaji wenye kikomo kama katika Bitcoin. Uhalalishaji wa bwawa la majaliwa ni kama ifuatavyo. Ikiwa bwawa la majaliwa halingekuwepo, na utoaji wa mstari ukapungua hadi 0.217x ili kutoa kiwango sawa cha mfumuko wa bei, basi jumla ya kiasi cha etha ingekuwa chini kwa asilimia 16.5 na hivyo kila kitengo kingekuwa na thamani zaidi kwa asilimia 19.8. Hivyo, katika usawa asilimia 19.8 zaidi ya etha ingenunuliwa katika mauzo, hivyo kila kitengo kingekuwa tena na thamani sawa na hapo awali. Shirika pia lingekuwa na BTC mara 1.198 zaidi, ambayo inaweza kuchukuliwa kuwa imegawanywa katika vipande viwili: BTC ya asili, na 0.198x ya ziada. Hivyo, hali hii ni _sawa kabisa_ na majaliwa, lakini kwa tofauti moja muhimu: shirika linashikilia BTC pekee, na hivyo halina motisha ya kuunga mkono thamani ya kitengo cha etha.

Muundo wa ukuaji wa usambazaji wa mstari wa kudumu unapunguza hatari ya kile ambacho baadhi wanaona kama mkusanyiko mkubwa wa utajiri katika Bitcoin, na kuwapa watu wanaoishi katika enzi za sasa na zijazo nafasi nzuri ya kupata vitengo vya sarafu, huku wakati huo huo ukihifadhi motisha kubwa ya kupata na kushikilia etha kwa sababu "kiwango cha ukuaji wa usambazaji" kama asilimia bado huelekea sifuri kadiri muda unavyopita. Pia tunatoa nadharia kwamba kwa sababu sarafu hupotea kila wakati kutokana na uzembe, kifo, n.k., na upotevu wa sarafu unaweza kuigwa kama asilimia ya jumla ya usambazaji kwa mwaka, kwamba jumla ya usambazaji wa sarafu katika mzunguko kwa kweli hatimaye itatengemaa katika thamani sawa na utoaji wa kila mwaka uliogawanywa na kiwango cha upotevu (k.m., kwa kiwango cha upotevu cha asilimia 1, mara tu usambazaji unapofikia 26X basi 0.26X itachimbwa na 0.26X kupotea kila mwaka, na kuunda usawa).

Kumbuka kwamba katika siku zijazo, kuna uwezekano kwamba Ethereum itabadilika kwenda kwenye muundo wa Uthibitisho wa Dau (PoS) kwa ajili ya usalama, na kupunguza hitaji la utoaji hadi kati ya sifuri na 0.05X kwa mwaka. Katika tukio ambalo shirika la Ethereum linapoteza ufadhili au kwa sababu nyingine yoyote linatoweka, tunaacha wazi "mkataba wa kijamii": mtu yeyote ana haki ya kuunda toleo la mgombea la baadaye la Ethereum, na sharti pekee likiwa kwamba kiasi cha etha lazima kiwe sawa na angalau `60102216 * (1.198 + 0.26 * n)` ambapo `n` ni idadi ya miaka baada ya kitalu cha asili. Waumbaji wako huru kuuza kwa umma (crowd-sell) au vinginevyo kugawa baadhi au tofauti yote kati ya upanuzi wa usambazaji unaoendeshwa na PoS na upanuzi wa juu zaidi unaoruhusiwa wa usambazaji ili kulipia maendeleo. Maboresho ya wagombea ambayo hayatii mkataba wa kijamii yanaweza kwa haki kuchepushwa (forked) kuwa matoleo yanayotii.

### Uwekaji Kati wa Uchimbaji {#mining-centralization}

Kanuni ya uchimbaji ya Bitcoin inafanya kazi kwa kuwa na wachimbaji wanaokokotoa SHA256 kwenye matoleo yaliyobadilishwa kidogo ya kichwa cha kizuizi mamilioni ya mara tena na tena, hadi hatimaye nodi moja inakuja na toleo ambalo heshi yake ni chini ya lengo (kwa sasa karibu 2<sup>192</sup>). Hata hivyo, kanuni hii ya uchimbaji iko hatarini kwa aina mbili za uwekaji kati. Kwanza, mfumo wa ikolojia wa uchimbaji umekuja kutawaliwa na ASIC (application-specific integrated circuits), chipsi za kompyuta zilizoundwa kwa ajili ya, na hivyo kuwa na ufanisi mara maelfu zaidi katika, kazi maalum ya uchimbaji wa Bitcoin. Hii inamaanisha kuwa uchimbaji wa Bitcoin si tena shughuli iliyogatuliwa sana na yenye usawa, ikihitaji mamilioni ya dola za mtaji ili kushiriki kikamilifu. Pili, wachimbaji wengi wa Bitcoin kwa kweli hawafanyi uthibitishaji wa kitalu ndani ya nchi; badala yake, wanategemea bwawa la uchimbaji lililowekwa kati kutoa vichwa vya vizuizi. Tatizo hili bila shaka ni baya zaidi: kufikia wakati wa kuandika haya, mabwawa matatu ya juu ya uchimbaji yanadhibiti kwa njia isiyo ya moja kwa moja takriban asilimia 50 ya nguvu ya usindikaji katika mtandao wa Bitcoin, ingawa hii inapunguzwa na ukweli kwamba wachimbaji wanaweza kubadili kwenda kwenye mabwawa mengine ya uchimbaji ikiwa bwawa au muungano utajaribu shambulio la asilimia 51.

Nia ya sasa katika Ethereum ni kutumia kanuni ya uchimbaji ambapo wachimbaji wanatakiwa kuchukua data ya nasibu kutoka kwenye hali, kukokotoa baadhi ya miamala iliyochaguliwa kwa nasibu kutoka kwa vitalu N vya mwisho katika mnyororo wa vitalu, na kurudisha heshi ya matokeo. Hii ina faida mbili muhimu. Kwanza, mikataba ya Ethereum inaweza kujumuisha aina yoyote ya ukokotoaji, hivyo ASIC ya Ethereum kimsingi ingekuwa ASIC kwa ukokotoaji wa jumla - yaani, CPU bora zaidi. Pili, uchimbaji unahitaji ufikiaji wa mnyororo mzima wa vitalu, na kuwalazimisha wachimbaji kuhifadhi mnyororo mzima wa vitalu na angalau kuwa na uwezo wa kuthibitisha kila muamala. Hii inaondoa hitaji la mabwawa ya uchimbaji yaliyowekwa kati; ingawa mabwawa ya uchimbaji bado yanaweza kutumika kwa jukumu halali la kusawazisha unasibu wa usambazaji wa tuzo, kazi hii inaweza kutumika vizuri vile vile na mabwawa ya rika-kwa-rika bila udhibiti wa kati.

Muundo huu haujajaribiwa, na kunaweza kuwa na matatizo njiani katika kuepuka uboreshaji fulani wa kijanja wakati wa kutumia utekelezaji wa mkataba kama kanuni ya uchimbaji. Hata hivyo, kipengele kimoja cha kuvutia sana cha kanuni hii ni kwamba inaruhusu mtu yeyote "kutia sumu kisimani", kwa kuanzisha idadi kubwa ya mikataba kwenye mnyororo wa vitalu iliyoundwa mahususi kuzuia ASIC fulani. Motisha za kiuchumi zipo kwa watengenezaji wa ASIC kutumia mbinu kama hiyo kushambuliana. Hivyo, suluhisho tunalotengeneza hatimaye ni suluhisho la kiuchumi la kibinadamu linalobadilika badala ya kuwa la kiufundi pekee.

### Ukuaji (Scalability) {#scalability}

Wasiwasi mmoja wa kawaida kuhusu Ethereum ni suala la ukuaji. Kama Bitcoin, Ethereum inakabiliwa na kasoro kwamba kila muamala unahitaji kusindikwa na kila nodi kwenye mtandao. Kwa Bitcoin, ukubwa wa mnyororo wa vitalu wa sasa unakaa karibu GB 15, ukikua kwa karibu MB 1 kwa saa. Ikiwa mtandao wa Bitcoin ungesindika miamala 2000 ya Visa kwa sekunde, ungekua kwa MB 1 kwa sekunde tatu (GB 1 kwa saa, TB 8 kwa mwaka). Ethereum ina uwezekano wa kuteseka na muundo sawa wa ukuaji, unaozidishwa na ukweli kwamba kutakuwa na programu nyingi juu ya mnyororo wa vitalu wa Ethereum badala ya sarafu tu kama ilivyo kwa Bitcoin, lakini inaboreshwa na ukweli kwamba nodi kamili za Ethereum zinahitaji kuhifadhi hali tu badala ya historia nzima ya mnyororo wa vitalu.

Tatizo la ukubwa mkubwa wa mnyororo wa vitalu ni hatari ya uwekaji kati. Ikiwa ukubwa wa mnyororo wa vitalu utaongezeka hadi, tuseme, TB 100, basi hali inayowezekana itakuwa kwamba idadi ndogo sana ya biashara kubwa zingeendesha nodi kamili, huku watumiaji wote wa kawaida wakitumia nodi nyepesi za SPV. Katika hali kama hiyo, kunaibuka wasiwasi unaowezekana kwamba nodi kamili zingeweza kuungana na zote kukubaliana kudanganya kwa njia fulani yenye faida (k.m., kubadilisha tuzo ya bloku, kujipa BTC). Nodi nyepesi hazingekuwa na njia ya kugundua hili mara moja. Bila shaka, angalau nodi kamili moja ya uaminifu ingekuwepo, na baada ya saa chache taarifa kuhusu udanganyifu huo zingevuja kupitia njia kama Reddit, lakini wakati huo ingekuwa imechelewa sana: ingekuwa juu ya watumiaji wa kawaida kuandaa juhudi za kuweka kwenye orodha nyeusi vitalu hivyo, tatizo kubwa na ambalo huenda lisiwezekane la uratibu kwa kiwango sawa na kile cha kufanikisha shambulio la asilimia 51. Katika kesi ya Bitcoin, hili kwa sasa ni tatizo, lakini kuna marekebisho ya mnyororo wa vitalu [yaliyopendekezwa na Peter Todd](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/) ambayo yatapunguza suala hili.

Katika muda mfupi ujao, Ethereum itatumia mikakati miwili ya ziada kukabiliana na tatizo hili. Kwanza, kwa sababu ya kanuni za uchimbaji zinazotegemea mnyororo wa vitalu, angalau kila mchimbaji atalazimika kuwa nodi kamili, na kuunda kiwango cha chini cha idadi ya nodi kamili. Pili na muhimu zaidi, hata hivyo, tutajumuisha mzizi wa mti wa hali ya kati katika mnyororo wa vitalu baada ya kusindika kila muamala. Hata kama uthibitishaji wa kitalu umewekwa kati, mradi tu nodi moja ya uaminifu inayothibitisha ipo, tatizo la uwekaji kati linaweza kuepukwa kupitia itifaki ya uthibitishaji. Ikiwa mchimbaji atachapisha kitalu kisicho halali, kitalu hicho lazima kiwe kimepangiliwa vibaya, au hali `S[n]` si sahihi. Kwa kuwa `S[0]` inajulikana kuwa sahihi, lazima kuwe na hali ya kwanza `S[i]` ambayo si sahihi ambapo `S[i-1]` ni sahihi. Nodi inayothibitisha ingetoa faharisi `i`, pamoja na "uthibitisho wa kutokuwa halali" unaojumuisha kitengo kidogo cha nodi za mti wa Patricia zinazohitaji kusindika `APPLY(S[i-1],TX[i]) -> S[i]`. Nodi zingeweza kutumia nodi hizo kuendesha sehemu hiyo ya ukokotoaji, na kuona kwamba `S[i]` iliyozalishwa hailingani na `S[i]` iliyotolewa.

Shambulio lingine, la kisasa zaidi, lingehusisha wachimbaji wenye nia mbaya kuchapisha vitalu visivyokamilika, hivyo taarifa kamili hata haipo ili kubaini kama vitalu ni halali au la. Suluhisho la hili ni itifaki ya changamoto-majibu (challenge-response protocol): nodi za uthibitishaji hutoa "changamoto" kwa njia ya faharisi za miamala lengwa, na baada ya kupokea nodi, nodi nyepesi huchukulia kitalu kama kisichoaminika hadi nodi nyingine, iwe mchimbaji au mhakiki mwingine, itoe kitengo kidogo cha nodi za Patricia kama uthibitisho wa uhalali.

## Hitimisho {#conclusion}

Itifaki ya Ethereum awali ilibuniwa kama toleo lililoboreshwa la sarafu-fiche, ikitoa vipengele vya hali ya juu kama vile amana ya dhamana kwenye mnyororo wa vitalu, vikomo vya utoaji, mikataba ya kifedha, masoko ya kamari na kadhalika kupitia lugha ya utayarishaji inayoweza kutumika kwa mambo mengi. Itifaki ya Ethereum "haiauni" programu tumizi zozote moja kwa moja, lakini kuwepo kwa lugha ya utayarishaji iliyokamilika ki-Turing kunamaanisha kuwa mikataba yoyote ile inaweza kinadharia kuundwa kwa aina yoyote ya muamala au programu tumizi. Hata hivyo, kinachovutia zaidi kuhusu Ethereum, ni kwamba itifaki ya Ethereum inakwenda mbali zaidi ya kuwa sarafu tu. Itifaki zinazohusu uhifadhi wa faili uliogatuliwa, ukokotoaji uliogatuliwa na masoko ya ubashiri yaliyogatuliwa, miongoni mwa makumi ya dhana nyingine kama hizo, zina uwezo wa kuongeza kwa kiasi kikubwa ufanisi wa tasnia ya ukokotoaji, na kutoa msukumo mkubwa kwa itifaki nyingine za rika-kwa-rika kwa kuongeza kwa mara ya kwanza tabaka la kiuchumi. Hatimaye, pia kuna kundi kubwa la programu tumizi ambazo hazihusiani na pesa hata kidogo.

Dhana ya utendakazi wa mpito wa hali wowote ule kama inavyotekelezwa na itifaki ya Ethereum inatoa jukwaa lenye uwezo wa kipekee; badala ya kuwa itifaki iliyofungwa, yenye dhumuni moja iliyokusudiwa kwa kundi maalum la programu tumizi katika uhifadhi wa data, kamari au fedha, Ethereum iko wazi kwa muundo wake, na tunaamini kuwa inafaa sana kutumika kama tabaka la msingi kwa idadi kubwa sana ya itifaki za kifedha na zisizo za kifedha katika miaka ijayo.

## Vidokezo na Usomaji Zaidi {#notes-and-further-reading}

### Vidokezo {#notes}

1. Msomaji makini anaweza kugundua kuwa kwa kweli anwani ya Bitcoin ni heshi ya ufunguo wa umma wa tao la duaradufu, na sio ufunguo wa umma wenyewe. Hata hivyo, kwa kweli ni istilahi halali kabisa ya kriptografia kurejelea heshi ya ufunguo wa umma kama ufunguo wa umma wenyewe. Hii ni kwa sababu kriptografia ya Bitcoin inaweza kuchukuliwa kuwa algoriti maalum ya sahihi ya kidijitali, ambapo ufunguo wa umma unajumuisha heshi ya ufunguo wa umma wa ECC, sahihi inajumuisha ufunguo wa umma wa ECC uliounganishwa na sahihi ya ECC, na algoriti ya uthibitishaji inahusisha kuangalia ufunguo wa umma wa ECC katika sahihi dhidi ya heshi ya ufunguo wa umma wa ECC iliyotolewa kama ufunguo wa umma na kisha kuthibitisha sahihi ya ECC dhidi ya ufunguo wa umma wa ECC.
2. Kitaalam, mediani ya vitalu 11 vilivyotangulia.
3. Kwa ndani, 2 na "CHARLIE" zote ni nambari, huku ya mwisho ikiwa katika uwakilishi wa kianzia-kikubwa wa msingi wa 256. Nambari zinaweza kuwa angalau 0 na isizidi 2<sup>256</sup>-1.

### Usomaji Zaidi {#further-reading}

1. [Thamani ya asili](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)
2. [Mali mahiri](https://en.bitcoin.it/wiki/Smart_Property)
3. [Mikataba mahiri](https://en.bitcoin.it/wiki/Contracts)
4. [B-money](http://www.weidai.com/bmoney.txt)
5. [Uthibitisho wa kazi unaoweza kutumika tena](https://nakamotoinstitute.org/finney/rpow/)
6. [Hati miliki salama zenye mamlaka ya mmiliki](https://nakamotoinstitute.org/library/secure-property-titles/)
7. [Waraka mweupe wa Bitcoin](https://bitcoin.org/bitcoin.pdf)
8. [Namecoin](https://namecoin.org/)
9. [Pembetatu ya Zooko](https://wikipedia.org/wiki/Zooko's_triangle)
10. [Waraka mweupe wa sarafu za rangi](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)
11. [Waraka mweupe wa Mastercoin](https://github.com/mastercoin-MSC/spec)
12. [Mashirika yanayojitegemea yaliyogatuliwa, Jarida la Bitcoin](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)
13. [Uthibitishaji wa malipo uliorahisishwa](https://en.bitcoin.it/wiki/Scalability#Simplified_payment_verification)
14. [Miti ya Merkle](https://wikipedia.org/wiki/Merkle_tree)
15. [Miti ya Patricia](https://wikipedia.org/wiki/Patricia_tree)
16. [GHOST](https://eprint.iacr.org/2013/881.pdf)
17. [StorJ na Mawakala Wanaojitegemea, Jeff Garzik](http://garzikrants.blogspot.ca/2013/01/storj-and-bitcoin-autonomous-agents.html)
18. [Mike Hearn kuhusu Mali Mahiri kwenye Tamasha la Turing](https://www.youtube.com/watch?v=MVyv4t0OKe4)
19. [RLP ya Ethereum](/developers/docs/data-structures-and-encoding/rlp/)
20. [Miti ya Merkle Patricia ya Ethereum](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/)
21. [Peter Todd kuhusu miti ya jumla ya Merkle](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/)

_Kwa historia ya waraka mweupe, tazama [wiki hii](https://web.archive.org/web/20250427212319/https://ethereum.org/whitepaper/)._

_Ethereum, kama miradi mingi ya programu huria inayoendeshwa na jamii, imebadilika tangu kuanzishwa kwake kwa mara ya kwanza. Ili kujifunza kuhusu maendeleo ya hivi punde ya Ethereum, na jinsi mabadiliko kwenye itifaki yanavyofanywa, tunapendekeza [mwongozo huu](/learn/)._