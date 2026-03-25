---
title: Karatasi nyeupe ya Ethereum
description: Karatasi ya utangulizi kwa Ethereum, iliyochapishwa mnamo mwaka wa 2013 kabla ya kuzinduliwa kwake.
lang: sw
sidebarDepth: 2
hideEditButton: true
---

# Karatasi Nyeupe ya Ethereum {#ethereum-whitepaper}

_Karatasi hii ya utangulizi ilichapishwa awali mwaka 2014 na Vitalik Buterin, mwanzilishi wa [Ethereum](/what-is-ethereum/), kabla ya mradi kuzinduliwa mwaka 2015. Ni muhimu kuzingatia kwamba Ethereum, kama miradi mingi ya kijamii, ya chanzo wazi, imebadilika tangu kuanzishwa kwake._

_Wakati tuna miaka kadhaa, tunatunza karatasi hii kwa sababu inaendelea kutumika kama kumbukumbu muhimu na uwakilishi sahihi wa Ethereum na maono yake. Ili kujifunza kuhusu maendeleo ya hivi karibuni ya Ethereum, na jinsi mabadiliko kwenye itifaki yanavyofanywa, tunapendekeza [mwongozo huu](/learn/)._

[Watafiti na wasomi wanaotafuta toleo la kihistoria au la kikanuni la karatasi nyeupe [kutoka Desemba 2014] wanapaswa kutumia PDF hii.](./whitepaper-pdf/Ethereum_Whitepaper_-_Buterin_2014.pdf)

## Jukwaa la Kizazi Kijacho la Mkataba-erevu na Mfumo Uliotawanywa {#a-next-generation-smart-contract-and-decentralized-application-platform}

Maendeleo ya Bitcoin ya Satoshi Nakamoto mnamo 2009 mara nyingi yamesifiwa kama maendeleo makubwa katika pesa na sarafu, ikiwa ni mfano wa kwanza wa mali ya kidijitali ambayo wakati huo huo haina uungwaji mkono au "[thamani ya asili](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)" na haina mtoaji au mdhibiti wa kati. Ingawaje, kando ya hayo, pengime muhimu zaidi, sehemu ya jaribio la Bitcoin ni msingi wa kiteknologia wa blockchain kama kifaa cha makubaliano yaliyosambazwa, na mtazamo unazidi kuanza kuelekezwa kwa mwenendo mwingine wa Bitcoin. Matumizi mbadala ya teknolojia ya mnyororo wa bloku yanayotajwa mara kwa mara ni pamoja na kutumia mali za kidijitali kwenye mnyororo wa bloku kuwakilisha sarafu maalum na zana za kifedha ("[colored coins](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)"), umiliki wa kifaa halisi cha msingi ("[mali-erevu](https://en.bitcoin.it/wiki/Smart_Property)"), mali zisizobadilishika kama vile majina ya vikoa ("[Namecoin](http://namecoin.org)"), pamoja na matumizi tata zaidi yanayohusisha mali za kidijitali kudhibitiwa moja kwa moja na kipande cha msimbo kinachotekeleza sheria holela ("[mikataba-erevu](http://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/idea.html)") au hata "[mashirika huru ya kiotomatiki](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)" (DAOs) yanayotegemea mnyororo wa bloku. Kile Ethereum inakusudia kutoa ni blockchain iliyo na lugha ya programu iliyojengwa ndani kikamili na inayokubaliana na mfumo wa Turing, ambayo imetumika kuunda "mikataba" inayoweza kutumika kusibua hali za kiholela za mpito wa hali, na hivyo kuwawezesha watumiaji kuunda mifumo yeyote kati ya ile iliyotajwa hapo juu, pamoja na mengine ambayo hatujafikiria, kirahisi kwa kuandika kimantiki katika mistari michache ya msimbo.

## Utangulizi wa Bitcoin na Dhana Zilizopo {#introduction-to-bitcoin-and-existing-concepts}

### Historia {#history}

Dhana ya sarafu dijitali isiyotegemea mtaalamu, pamoja na matumizi mbadala kama vile rejista za mali, imekuwepo kwa miongo mingi. Itifaki za e-cash zisizojulikana za miaka ya 1980 na 1990, zilizoegemea zaidi kwenye mbinu ya usimbaji wa siri inayojulikana kama Chaumian blinding, zilitengeneza sarafu yenye kiwango cha juu cha faragha, lakini itifaki hizo kwa kiasi kikubwa hazikuweza kupata umaarufu kutokana na kutegemea kwao mtaalamu wa kati. Mnamo 1998, [b-money](http://www.weidai.com/bmoney.txt) ya Wei Dai ilikuwa pendekezo la kwanza la kuanzisha wazo la kuunda pesa kupitia utatuzi wa mafumbo ya kikokotozi pamoja na makubaliano yaliyogatuliwa, lakini pendekezo hilo lilikuwa na maelezo machache kuhusu jinsi makubaliano yaliyogatuliwa yangeweza kutekelezwa. Mnamo 2005, Hal Finney alianzisha dhana ya "[reusable proofs of work](https://nakamotoinstitute.org/finney/rpow/)", mfumo unaotumia mawazo kutoka kwa b-money pamoja na mafumbo ya Hashcash ya Adam Back ambayo ni magumu kikokotozi ili kuunda dhana ya sarafu ya kidigitali, lakini kwa mara nyingine tena ilipungukiwa na ubora kwa kutegemea kompyuta inayoaminika kama sehemu ya nyuma. Mwaka 2009, sarafu isiyo na mtaalamu wa kati ilitekelezwa kwa mara ya kwanza na Satoshi Nakamoto, akiunganisha mbinu zilizokuwepo za kusimamia umiliki kupitia usimbaji wa funguo za umma pamoja na algoriti ya makubaliano kwa ajili ya kufuatilia nani anamiliki sarafu, inayojulikana kama "proof-of-work".

Mfiduo wa proof-of-work ulikuwa uvumbuzi muhimu katika eneo la sarafu za kidijitali kwa sababu uliongoza kutatua matatizo mawili kwa wakati mmoja. Kwanza, ilitoa algoriti rahisi na yenye ufanisi wa wastani wa makubaliano, ikiruhusu nodi katika mtandao kukubaliana pamoja juu ya seti ya masasisho halali ya hali ya daftari la Bitcoin. Pili, iliweka mfumo unaoruhusu kuingia huru katika mchakato wa makubaliano, ukitatua tatizo la kisiasa la kuamua nani anayeweza kuathiri makubaliano, huku pia ukizuia mashambulizi ya sybil kwa wakati mmoja. Hufanya hivyo kwa kubadilisha kizuizi rasmi cha kushiriki, kama vile sharti la kuandikishwa kama kiumbe cha kipekee kwenye orodha fulani, na kizuizi cha kiuchumi - uzito wa nodi moja katika mchakato wa upigaji kura wa makubaliano unaendana moja kwa moja na nguvu ya kompyuta ambayo nodi hiyo inaleta. Tangu wakati huo, mbinu mbadala imependekezwa iitwayo _proof-of-stake_, inayokokotoa uzito wa nodi kuwa sawia na hisa zake za sarafu na si rasilimali za kikokotozi; mjadala wa sifa za kulinganisha za mbinu hizi mbili uko nje ya upeo wa karatasi hii lakini inapaswa kuzingatiwa kuwa mbinu zote mbili zinaweza kutumika kama uti wa mgongo wa sarafu ya kidigitali.

### Bitcoin Kama Mfumo wa Mpito wa Hali {#bitcoin-as-a-state-transition-system}

![Mpito wa hali ya Ethereum](./ethereum-state-transition.png)

Kutoka mtazamo wa kiufundi, daftari la sarafu ya kidijitali kama Bitcoin linaweza kufikiriwa kama mfumo wa mabadiliko ya hali, ambapo kuna "hali" inayojumuisha hali ya umiliki wa bitcoins zote zilizopo na "kazi ya mabadiliko ya hali" inayochukua hali na muamala na kutoa hali mpya ambayo ni matokeo. Katika mfumo wa kawaida wa benki, kwa mfano, hali ni taarifa ya usawa wa akaunti, muamala ni ombi la kuhamisha kiasi cha dola $X kutoka A kwenda B, na kazi ya mabadiliko ya hali hupunguza thamani katika akaunti ya A kwa dola $X na kuongeza thamani katika akaunti ya B kwa dola $X. Kama akaunti ya A haina angalau dola $X, kazi ya mabadiliko ya hali hurudisha kosa. Hivyo, mtu anaweza kufafanua rasmi:

```
APPLY(S,TX) -> S' or ERROR
```

Katika mfumo wa benki uliofafanuliwa hapo juu:

```js
APPLY({ Alice: $50, Bob: $50 },"tuma $20 kutoka kwa Alice kwenda kwa Bob") = { Alice: $30, Bob: $70 }
```

Lakini:

```js
APPLY({ Alice: $50, Bob: $50 },"tuma $70 kutoka kwa Alice kwenda kwa Bob") = ERROR
```

"State" katika Bitcoin ni mkusanyiko wa sarafu zote (kifundi, "unspent transaction outputs" au UTXO) ambazo zimemintiwa lakini bado hazijatumiwa, ambapo kila UTXO ina thamani na mmiliki (amefafanuliwa kwa anwani ya byte 20 ambayo ni kama funguo za umma za usimbaji wa siri<sup>[fn1](#notes)</sup>). Muamala wa Bitcoin una sehemu kuu mbili: pembejeo na matokeo. Kila pembejeo linajumuisha rejeleo la UTXO iliyopo pamoja na saini ya kryptografia inayotokana na funguo binafsi zinazohusiana na anwani ya mmiliki. Kila matokeo yanajumuisha UTXO mpya inayoongezwa kwenye hali ya mfumo wa Bitcoin. Hii ina maana kwamba pembejeo ni kutumia sarafu zilizotolewa hapo awali, na matokeo ni sarafu mpya zinazoundwa kwa ajili ya mamiliki wapya wa sarafu hizo.

Kazi ya mpito wa hali `APPLY(S,TX) -> S'` inaweza kufafanuliwa takriban kama ifuatavyo:

<ol>
  <li>
    Kwa kila ingizo katika <code>TX</code>:
    <ul>
    <li>
        Ikiwa UTXO inayorejelewa haimo katika <code>S</code>, rudisha hitilafu.
    </li>
    <li>
        Ikiwa saini iliyotolewa hailingani na mmiliki wa UTXO, rudisha hitilafu.
    </li>
    </ul>
  </li>
  <li>
    Ikiwa jumla ya thamani za UTXO zote za ingizo ni ndogo kuliko jumla ya thamani za UTXO zote za towe, rudisha hitilafu.
  </li>
  <li>
    Rejesha <code>S</code> huku UTXO zote za ingizo zimeondolewa na UTXO zote za towe zimeongezwa.
  </li>
</ol>

Sehemu ya kwanza ya hatua ya kwanza hulinda wasafirishi wa muamala wasitumiwe sarafu ambazo hazipo, na sehemu ya pili hulinda wasafirishi wasitumie sarafu za watu wengine bila idhini yao na hatua ya pili inahakikisha uhifadhi wa thamani. Kwa ajili ya kutumia Bitcoin kama malipo, itifaki ya malipo hujumuisha hatua zifuatazo. Ikiwa Alice anataka kutuma 11.7 BTC kwa Bob. Kwanza, Alice atatafuta mkusanyiko wa UTXO anamiliki ulio jumlisha angalau 11.7 BTC. Kweli, Alice haiwezi kupata kwa usahihi 11.7 BTC kutoka kwa UTXO zilizopo, kwa mfano, tuseme anaweza kupata mchanganyiko wa 6+4+2=12. Alice ataunda muamala wenye pembejeo tatu na matokeo mawili. Tokeo la kwanza itakuwa na thamani ya 11.7 BTC na mmiliki wake atakuwa anwani ya Bob, wakati huo tokeo la pili itakuwa na tofauti ya 0.3 BTC kama "badiliko," na mmiliki wake atakuwa Alice mwenyewe.

### Uchimbaji {#mining}

![Bloku za Ethereum](./ethereum-blocks.png)

Ikiwa tungekuwa na huduma ya kuaminika iliyojengewa kati ambayo inasimamia hali, mfumo huu ungebaki rahisi kutekeleza sawa na ilivyoelezwa; ungetumia tu diski ya seva kuu kufuatilia hali. Lakini kwa Bitcoin, tunajaribu kujenga mfumo wa sarafu usio na msimamizi wa kati, hivyo tunahitaji kuunganisha mfumo wa mabadiliko ya hali ya muamala na mfumo wa makubaliano wa kijumla kuhakikisha kila mtu anakubaliana kuhusu mpangilio wa miamala. Mchakato wa makubaliano wa Bitcoin hutegemea nodi katika mtandao zinazojaribu kuunda vifurushi vya miamala vinavyoitwa "blocks." Mtandao umekusudiwa kutoa takriban bloku moja kila dakika kumi, huku kila bloku ikiwa na muhuri wa muda, nonce, rejeleo la (yaani, hashi ya) bloku iliyotangulia na orodha ya miamala yote iliyotokea tangu bloku iliyotangulia. Mtandao huu unakusudia kuzalisha block moja takriban kila dakika kumi, na sarafu zinazoongoza kuunda mnyororo unaoitwa "blockchain" unaoendelea kukua na kuonyesha hali halisi na ya sasa ya daftari la Bitcoin.

Algorithimu ya ukaguzi wa halali ya block katika mfumo wa Bitcoin inaweza kufafanuliwa kama ifuatavyo:

1. Angalia kama block iliyotanguliaipo kwenye blockchain tayari na imethibitishwa kuwa halali.
2. Hakikisha kuwa timestamp ya block ni kubwa kuliko ile ya block iliyotangulia <sup>[fn2](#notes)</sup> na haizidi masaa 2 mbele ya wakati wa sasa
3. Thibitisha kwamba proof-of-work kwenye block ni halali.
4. Wacha `S[0]` iwe hali mwishoni mwa bloku iliyotangulia.
5. Tuseme `TX` ni orodha ya miamala ya bloku yenye miamala `n`. Kwa `i` zote katika `0...n-1`, weka `S[i+1] = APPLY(S[i],TX[i])` Ikiwa utekelezaji wowote utarudisha hitilafu, toka na urudishe false.
6. Rudisha `true`, na sajili `S[n]` kama hali ya mwisho ya bloku hii.

Kwa msingi huu, kila muamala katika block lazima utoe mabadiliko halali ya hali kutoka kwa hali ya kanoni kabla ya muamala kutekelezwa hadi hali mpya. Kumbuka kuwa hali hii haijafichwa kwenye block kwa namna yoyote; ni dhihirisho tu ambalo linahifadhiwa na nodi zinazothibitisha na linaweza kuhesabiwa kwa usalama kwa kuanza kutoka hali ya awali (genesis state) na kutekeleza kila muamala katika kila block mfululizo. Zaidi ya hayo, angalia kwamba mpangilio ambao mchimbaji anajumuisha miamala katika block ni muhimu; ikiwa kuna miamala miwili A na B ndani ya block ambapo B inatumia UTXO iliyoundwa na A, basi block itakuwa halali ikiwa A itajiandaa kabla ya B, lakini haitakuwa halali vinginevyo.

Sharti moja la halali lililopo katika orodha hapo juu ambalo haliwezi kupatikana katika mifumo mingine ni hitaji la "proof-of-work". Sharti halisi ni kwamba hash ya double-SHA256 ya kila block, inayochukuliwa kama nambari ya 256-bit, lazima iwe ndogo kuliko lengo linalo rekebishwa kwa nguvu, ambalo kwa sasa lina takriban thamani ya 2<sup>187</sup>. Kusudi la hili ni kufanya uundaji wa block kuwa gumu kihisabati, hivyo kuzuia washambulizi wa aina ya sybil kutoka kuunda mnyororo mzima wa blockchain kwa faida yao binafsi. Kwa kuwa SHA256 imeundwa kuwa kazi isiyotabirika kabisa na ya nasibu (pseudo-random), njia pekee ya kuunda block halali ni kwa jaribio na makosa, kwa kujaribu kuongezea nonce na kuona ikiwa hash mpya inakidhi vigezo.

Kwa lengo la sasa la takriban ~2<sup>187</sup>, mtandao unapaswa kufanya jaribio la wastani la takriban ~2<sup>69</sup> mara kabla ya kupata block halali; kwa jumla, lengo hili hubadilishwa na mtandao kila blocks 2016 ili kuhakikisha kuwa block mpya inazalishwa takriban kila dakika kumi na nodi fulani mtandaoni. Ili kumpa motisha mchimbaji kupata block, mchimbaji anaruhusiwa kujumuisha muamala unaojipa 25 BTC kwa block hiyo, mtindo wa malipo usiotegemea chochote. Zaidi ya hayo, ikiwa muamala wowote una pembejeo yenye jumla kubwa kuliko matokeo yake, tofauti hiyo hupokelewa na mchimbaji kama "ada ya muamala". Kwa bahati nzuri, hii pia ndiyo njia pekee ambayo BTC hutolewa; hali ya mwanzo (genesis) haikuwa na sarafu yoyote kabisa.

Ili kuelewa vyema kusudi la uchimbaji, tuchunguze kinachotokea wakati wa mwovu. Kwa kuwa usimbaji fiche wa Bitcoin unajulikana kuwa salama, mshambuliaji atalenga sehemu moja tu ya mfumo wa Bitcoin ambayo haikingwi moja kwa moja na usimbaji fiche: mpangilio wa miamala. Mbinu ya mshambuliaji ni rahisi:

1. Tuma 100 BTC kwa muuzaji kwa bidhaa fulani (ikiwa inawezekana bidhaa ya kidijitali inayoweza kusafirishwa haraka)
2. Subiri kuwasilishwa kwa bidhaa
3. Tengeneza muamala mwingine unaotuma 100 BTC hizo kwa mwenyewe
4. Jaribu kuwashawishi washiriki wa mtandao kwamba muamala wake wa kutuma kwa mwenyewe ndio uliotangulia.

Mara baada ya hatua ya kwanza (1) kutekelezwa, ndani ya dakika chache mchimbaji fulani ataingiza muamala kwenye block, sema block nambari 270000. Baada ya takriban saa moja, blocks tano zaidi zitakuwa zimeongezwa mnyoroni kuanzia block hiyo, kila moja likiwahusisha kwa njia isiyo ya moja kwa moja miamala hiyo na hivyo kuthibitisha. Katika hatua hii, muuzaji atakubali malipo kama ya mwisho na kubadilisha bidhaa; kwa kuwa tunazungumzia bidhaa ya kidijitali, usafirishaji ni wa papo hapo. Sasa mshambuliaji anatengeneza muamala mwingine wa kutuma 100 BTC kwa mwenyewe. Ikiwa mshambuliaji atauachilia tu, muamala hautashughulikiwa; wachimbaji watajaribu kuendesha `APPLY(S,TX)` na kugundua kuwa `TX` inatumia UTXO ambayo haipo tena katika hali. Badala yake, mshambuliaji anatengeneza "tawi" la blockchain, kuanzia kwa kuchimba toleo lingine la block 270000 linalorejelea block 269999 kama mzazi lakini likiwa na muamala mpya badala ya wa zamani. Kwa kuwa data ya bloki ni tofauti, hii inahitaji kufanya tena proof-of-work. Zaidi ya hayo, toleo jipya la bloki 270000 linayo mshambuliaji lina hash tofauti, hivyo bloki asilia 270001 hadi 270005 hazijawahi kuitaja; hivyo mnyororo wa asili na mnyororo mpya wa mshambuliaji ni tofauti kabisa. Amri ni kwamba katika tawi, mnyororo mrefu zaidi ndio unaochukuliwa kuwa wa kweli, kwa hiyo wachimbaji halali wataendelea kazi zao kwenye mnyororo wa 270005 wakati mshambuliaji peke yake anafanya kazi kwenye mnyororo wa 270000. Ili mshambuliaji afanikishe kufanya mnyororo wake kuwa mrefu zaidi, anahitaji kuwa na nguvu ya kupanga zenye nguvu zaidi kuliko nodi zote za mtandao kwa pamoja ili kufikia ncha hiyo (hii ndiyo "shambulio la 51%").

### Miti ya Merkle {#merkle-trees}

![SPV katika Bitcoin](./spv-bitcoin.png)

_Kushoto: inatosha kuwasilisha nodes chache tu katika mti wa Merkle ili kutoa ushahidi wa halali ya tawi._

_Kulia: jaribio lolote la kubadilisha sehemu yoyote ya mti wa Merkle hatimaye litaelekea kwenye kutoelewana mahali fulani juu ya mnyororo._

Sifa muhimu ya kuongezeka kwa uwezo ya Bitcoin ni kwamba block huhifadhiwa katika muundo wa data yenye ngazi nyingi. "Hash" ya bloki ni hash tu ya kichwa cha bloki, kipande cha data chenye takriban byte 200 ambacho kina timestamp, nonce, hash ya bloki ya awali, na hash ya mzizi wa muundo wa data unaoitwa mti wa Merkle unaohifadhi miamala yote katika bloki. Mti wa Merkle ni aina ya mti wa binary, unaojumuisha seti ya nodi yenye idadi kubwa ya nodi za majani chini mwa mti zenye data ya msingi, seti ya nodi za kati ambapo kila nodi ni hash ya wanawe wawili, na mwisho mzizi wa nodi moja, pia umetengenezwa kwa hash ya wanawe wawili, unaowakilisha "juu" ya mti. Madhumuni ya mti wa Merkle ni kuruhusu data katika bloki kusambazwa kwa sehemu: nodi inaweza kupakua tu kichwa cha bloki kutoka kwa chanzo kimoja, sehemu ndogo ya mti inayohusiana nayo kutoka chanzo kingine, bado ikihakikiwa kuwa data yote ni sahihi. Sababu ya hili kufanya kazi ni kwamba hash husambazwa juu: kama mtumiaji mbaya atajaribu kubadilisha muamala wa bandia chini mwa mti wa Merkle, mabadiliko haya yataleta mabadiliko kwenye nodi ya juu, kisha mabadiliko kwenye nodi inayofuata juu, hatimaye kubadilisha mzizi wa mti na kwa hivyo hash ya bloki, na kupelekea itajulikana kama bloki tofauti kabisa (ikiwa na proof-of-work isiyo halali).

Itifaki ya mti wa Merkle ni muhimu kwa uendelevu wa muda mrefu. Nodi kamili katika mtandao wa Bitcoin, inayohifadhi na kusindika bloki zote, inachukua takriban gigabaiti 15 za nafasi ya diski kama Aprili 2014, na inaendelea kuongezeka kwa zaidi ya gigabaiti moja kila mwezi. Kwa sasa, hii inawezekana kwa baadhi ya kompyuta za mezani na si simu za mkononi, na baadaye tu biashara na watumiaji wa hiari wataweza kushiriki. Itifaki inayoitwa "simplified payment verification" (SPV) inaruhusu aina nyingine ya nodi inayoitwa "light nodes", ambazo hupakua vichwa vya bloki, kuhakiki proof-of-work kwenye vichwa vya block, na kisha hupakua tu "matawi" yanayohusiana na miamala inayowahusu. Hii inaruhusu light nodes kuamua kwa uhakikisho mkubwa wa usalama hali ya muamala wowote wa Bitcoin, na salio lao la sasa, huku wakipakua sehemu ndogo sana ya blockchain nzima.

### Matumizi Mbadala ya Mnyororo wa Bloku {#alternative-blockchain-applications}

Dhana ya kuchukua wazo la blockchain msingi na kuitumia kwenye dhana nyingine imekuwa na historia ndefu. Mnamo 2005, Nick Szabo alikuja na dhana ya "[hati miliki salama za mali zenye mamlaka ya mmiliki](https://nakamotoinstitute.org/library/secure-property-titles/)", waraka unaoelezea jinsi "maendeleo mapya katika teknolojia ya hifadhidata iliyonakiliwa" yataruhusu mfumo unaotegemea mnyororo wa bloku kwa ajili ya kuhifadhi sajili ya nani anamiliki ardhi gani, na kuunda mfumo wa kina unaojumuisha dhana kama vile makazi, umiliki mbaya na kodi ya ardhi ya Georgia. Hata hivyo, wakati huo hakukuwa na mfumo mzuri wa hifadhidata zilizopigwa maradufu, hivyo itifaki haikutekelezwa vibaya. Baada ya 2009, mara baada ya kusambaa kwa makubaliana ya jumla ya Bitcoin, matumizi mbalimbali yalianza kujitokeza haraka.

- **Namecoin** - iliyoundwa mwaka 2010, [Namecoin](https://namecoin.org/) inaelezewa vyema kama hifadhidata ya usajili wa majina iliyogatuliwa. Katika itifaki zilizogatuliwa kama Tor, Bitcoin na BitMessage, kunahitajika kuwa na njia ya kutambua akaunti ili watu wengine waweze kuingiliana nazo, lakini katika suluhisho zote zilizopo aina pekee ya kitambulisho kinachopatikana ni hashi isiyo ya mpangilio maalum kama `1LW79wp5ZBqaHW1jL5TCiBCrhQYtHagUWy`. Kila mtu angependa kuwa na akaunti yenye jina rahisi kama "george". Ingawaja, tatizo ni kwamba ikiwa mtu mmoja anaweza kuunda akaunti iitwayo "george", mtu mwingine anaweza kutumia njia hiyo hiyo kusajili "george" kwa ajili yake na kudanganya. Suluhisho ya kipekee ni "mtindo wa mwanzilishi wa kwanza" ambapo mwanzilishi wa kwanza nafanikiwa na wa pili anashindwa - tatizo linalofaa kwa itifaki ya makubaliano ya Bitcoin. Namecoin ni utekelezaji wa zamani zaidi na wenye mafanikio zaidi wa mfumo wa usajili wa majina ukitumia wazo hilo.
- **Sarafu za Rangi** - madhumuni ya [sarafu za rangi](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit) ni kutumika kama itifaki ya kuruhusu watu kuunda sarafu zao za kidijitali - au, katika kesi muhimu ndogo ya sarafu yenye kitengo kimoja, tokeni za kidijitali, kwenye mnyororo wa bloku wa Bitcoin. Katika itifaki ya colored coins, mtu "hutangaza" sarafu mpya kwa kuweka rangi maalum kwenye UTXO fulani ya Bitcoin, na itifaki inaeleza mara kwa mara kuwa rangi ya UTXO zingine ni rangi moja na ya pembejeo za muamala zinazozitumia (na sheria maalum kwa pembejeo zilizochanganywa). Hii inawawezesha watumiaji kuhifadhi pochi linalo zima UTXO za rangi fulani na kuzipeleka kama bitcoins kawaida, wakirudi nyuma kwenye blockchain kuona rangi ya UTXO wanazopokea.
- **Metacoins** - wazo la metacoin ni kuwa na itifaki inayoishi juu ya Bitcoin, ikitumia miamala ya Bitcoin kuhifadhi miamala ya metacoin lakini ikiwa na kazi tofauti ya mpito wa hali, `APPLY'`. Kwa sababu itifaki ya metacoin haiwezi kuzuia miamala batili ya metacoin kuonekana kwenye mnyororo wa bloku wa Bitcoin, sheria inaongezwa kwamba ikiwa `APPLY'(S,TX)` itarudisha hitilafu, itifaki inarejea kuwa `APPLY'(S,TX) = S`. Hii inatoa njia rahisi ya kutengeneza itifaki yoyote ya sarafu, labda yenye sifa za hali ya juu zisizoweza kutekelezwa ndani ya Bitcoin, lakini kwa gharama ndogo sana kwa sababu mambo magumu ya uchimbaji na mtandao yanafanywa tayari na itifaki ya Bitcoin. Metacoins zime tumika kutekeleza aina fulani za mikataba ya kifedha, usajili wa majina na kubadilishana kwa njia zisizo za kati.

Kwa hiyo, kwa ujumla, kuna mbinu mbili kuelekea kujenga itifaki ya makubaliano: kujenga mtandao huru, na kujenga itifaki juu ya Bitcoin. Mbinu ya kwanza, ingawa imefanikiwa kwa programu kama Namecoin, ni vigumu kutekeleza; kila utekelezaji unahitaji kuanzisha blockchain huru, pamoja na kuandaa na kujaribu mabadiliko yote ya hali na kofia na usambazaji. Zaidi ya hayo, tunabiri kuwa seti ya matumizi ya teknolojia ya makubaliano isiyo ya kati itafuata usambazaji wa nguvu ambapo matumizi mengi sana yatakuwa madogo mno kuhitaji blockchain yao wenyewe, na kuna makundi makubwa ya matumizi ya programu zisizo za kati, hasa mashirika ya kiotomatiki yasiyo na msimamizi, yanayohitaji mwingiliano.

Mbali na hilo, mbinu inayotegemea Bitcoin ina dosari kuwa haiwezi kurithi sifa za uthibitishaji wa malipo rahisi ya Bitcoin. SPV inafanya kazi kwa Bitcoin kwa sababu inatumia kina cha blockchain kama kinara cha uhalali; sehemu fulani, mara watoto wa muamala wanapokuwa mbali vya kutosha nyuma, ni salama kusema walikuwa sehemu halali ya hali. Lakini itifaki za meta za blockchain siwezi kulazimisha blockchain isiingize miamala isiyo halali ndani ya itifaki zao. Kwa hiyo, utekelezaji salama wa SPV meta-itifaki unahitaji kurudi nyuma kabisa hadi mwanzo wa blockchain ya Bitcoin kuchunguza uhalali wa miamala fulani. Kwa sasa, utekelezaji wote wa "light" wa mitandao ya meta-itifaki zinazotegemea Bitcoin unategemea seva ya kuaminika kutoa data, jambo lisilofaa hasa wakati mojawapo ya madhumuni kuu ya sarafu za kidijitali ni kuondoa haja ya kuamini mtu mwingine.

### Uandishi wa Hati {#scripting}

Hata bila nyongeza yoyote, itifaki ya Bitcoin inaruhusu aina dhaifu ya dhana ya "mikataba-erevu". UTXO katika Bitcoin haiwezi kumilikiwa tu na funguo za umma, bali pia na skripti ngumu zaidi iliyoelezwa kwa lugha rahisi ya kufuli wa vitendo. Katika mfumo huu, muamala unaotumia UTXO lazima utoe data inayokidhi skripti. Kwa kweli, hata mfumo wa umiliki wa funguo za umma unatekelezwa kwa skripti: skripti hupokea saini ya mduara wa elliptic kama pembejeo, kuikagua dhidi ya muamala na anwani inayomiliki UTXO, na kurudisha 1 kama uthibitisho ni mzuri, au 0 vinginevyo. Skripti nyingine, ngumu zaidi, zipo kwa matumizi tofauti. Kwa mfano, mtu anaweza kutengeneza skripti inayotaka sahihi kutoka kwa funguo mbili kati ya tatu zilizopo("multisig"), inayofaa kwa akaunti za kampuni, akaunti za hifadhi salama, na malipo ya mteja. Skripti zinaweza kutumika pia kulipa zawadi kwa kutafuta suluhisho la matatizo ya kompyuta, na mtu anaweza hata kutengeneza skripti inayosema "UTXO hii ni yako kama unaweza kutoa uthibitisho wa SPV kuwa umetuma muamala wa Dogecoin kwa kiasi hiki kwangu", ikiruhusu kubadilishana kati ya sarafu za kidijitali zisizo na msimamizi.

Hata hivyo, lugha ya kuprogramu kama ilivyotekelezwa katika Bitcoin ina mapungufu machache muhimu:

- **Ukosefu wa Ukamilifu wa Turing** - yaani, ingawa kuna sehemu kubwa ya hesabu ambayo lugha ya uandishi wa hati ya Bitcoin inasaidia, haikaribii kusaidia kila kitu. Kundi kuu linalokosekana ni mizunguko (loops). Hii imefanywa kuepuka mizunguko isiyo na mwisho katika uthibitishaji wa miamala; kwa nadharia, mpangaji skripti anaweza kuiga mizunguko kwa kurudia msimbo wa msingi mara nyingi kwa kutumia kauli ya if, lakini hii husababisha skripti zisizokuwa na ufanisi kwa nafasi. Mfano, kutekeleza mbadala wa alama ya mduara wa elliptic pengine ingekuwa na mizunguko 256 ya kuzidisha inayojumuishwa kwenye msimbo moja moja.
- **Upofu wa Thamani** - hakuna njia kwa hati ya UTXO kutoa udhibiti wa kina juu ya kiasi kinachoweza kutolewa. Mfano, mkataba wa oracle una nguvu angalau geuko wa kawaida, ambapo A na B waliweka BTC ya thamani ya dola 1000, na baada ya siku 30 skripti itatuma BTC ya dola 1000 kwa A na sehemu iliyobaki kwa B. Hii ingehitaji oracle kubaini thamani ya BTC 1 kwa dola, lakini bado ni maendeleo makubwa ikilinganishwa na suluhisho kamili za kati zinazopatikana sasa. Hata hivyo, kwa sababu UTXO ni yote-au-sifuri, njia pekee ya kufanikisha hili ni kupitia udukuzi usio na ufanisi wa kuwa na UTXO nyingi za thamani tofauti (k.m., UTXO moja ya 2<sup>k</sup> kwa kila k hadi 30) na kuwa na oracle ikichagua UTXO gani itume kwa A na ipi kwa B.
- **Ukosefu wa hali** - UTXO inaweza kuwa imetumika au haijatumika; hakuna fursa ya mikataba ya hatua nyingi au hati zinazoweka hali nyingine yoyote ya ndani zaidi ya hiyo. Hii inafanya vigumu kutengeneza mikataba ya chaguo nyingi, ofa za kubadilishana zisizo za kati au itifaki za usajili wa siri za hatua mbili (zinazohitajika kwa zawadi za kompyuta salama). Pia inamaanisha UTXO zinatumika tu kutengeneza mikataba rahisi na si mikataba tata ya "hali", na kufanya meta-itifaki zisiwe rahisi kutekeleza. Hali ya binary pamoja na ukosefu wa kuona thamani ina maana hata matumizi muhimu kama mipaka ya uondoaji hauwezekani.
- **Upofu kwa Mnyororo wa Bloku** - UTXO ni vipofu kwa data ya mnyororo wa bloku kama vile nonce, muhuri wa muda na hashi ya bloku iliyotangulia. Hii inapunguza sana matumizi katika kamari na aina nyingine mbalimbali, kwa kuondoa chanzo cha nasibu inayoweza kuwa ya thamani kwa lugha ya kuscripti.

Kwa hiyo, tunaona mbinu tatu za kujenga programu za hali ya juu juu ya sarafu za kidijitali: kujenga blockchain mpya, kutumia kuskripti juu ya Bitcoin, na kujenga meta-itifaki juu ya Bitcoin. Kujenga blockchain mpya kunaruhusu uhuru usio na mipaka wa kujenga sifa, lakini kwa gharama ya muda wa maendeleo, juhudi za kuanzisha na usalama. Kutumia kuskripti ni rahisi kutekeleza na kuainisha, lakini ni na mipaka mikubwa, na meta-itifaki, ingawa rahisi, zinakumbwa na upungufu wa uwezo. Katika Ethereum, tunakusudia kujenga mfumo mbadala unaotoa urahisi zaidi wa maendeleo pamoja na sifa bora zaidi za mteja mwepesi, wakati huo huo kuruhusu programu kushiriki mazingira ya kiuchumi na usalama wa blockchain.

## Ethereum {#ethereum}

Lengo la Ethereum ni kuunda itifaki mbadala ya kujenga programu zisizo na msimamizi wa kati, zikitoa mchanganyiko tofauti wa manufaa ambayo tunaamini yatakuwa muhimu sana kwa daraja kubwa la programu zisizo na msimamizi, kwa mkazo maalum katika hali ambapo muda wa maendeleo ya haraka, usalama kwa programu ndogo zisizotumiwa mara kwa mara, na uwezo wa programu tofauti kuingiliana kwa ufanisi mkubwa ni muhimu. Ethereum hufanikisha hili kwa kujenga kile kinachoitwa tabaka la msingi la muhtasari kabisa: blockchain yenye lugha ya programu ya Turing-complete iliyojengwa ndani, ikiruhusu mtu yeyote kuandika mikataba-erevu na programu iliyogatuliwa ambapo wanaweza kuunda kanuni zao za umiliki, muundo wa miamala, na kazi za mabadiliko ya hali. Toleo la msingi kabisa la Namecoin linaweza kuandikwa kwa mistari miwili tu ya msimbo, na itifaki nyingine kama sarafu na mifumo ya sifa zinaweza kujengwa chini ya mistari ishirini. Mikataba-erevu, "masanduku" ya kriptografia yanayohifadhi thamani na kufunguliwa tu ikiwa masharti fulani yatatimizwa, pia inaweza kujengwa juu ya jukwaa, na yenye nguvu zaidi sana kuliko ile inayotolewa na maandishi ya Bitcoin kwa sababu ya nguvu za ziada za Turing-completeness, ufahamu wa thamani, ufahamu wa blockchain, na hali.

### Akaunti za Ethereum {#ethereum-accounts}

Katika Ethereum, hali inaundwa na vitu vinavyoitwa "akaunti", ambapo kila akaunti ina anwani ya byte 20 na mabadiliko ya hali ni uhamisho wa moja kwa moja wa thamani na taarifa kati ya akaunti. Akaunti ya Ethereum ina sehemu nne:

- **Nonce**, kaunta inayotumika kuhakikisha kila muamala unaweza kushughulikiwa mara moja tu
- Salio la sasa la **ether** la akaunti
- Msimbo wa **mkataba** wa akaunti, ikiwa upo
- **Hifadhi** ya akaunti (tupu kwa chaguo-msingi)

"Ether" ni krypto-mafuta kuu ya ndani ya Ethereum, na hutumika kulipia ada za muamala. Kwa ujumla, kuna aina mbili za akaunti: **akaunti zinazomilikiwa na watu wengine**, zinazodhibitiwa na funguo za faragha, na **akaunti za mkataba**, zinazodhibitiwa na msimbo wa mkataba wao. Akaunti inayomilikiwa na mtu binafsi haina msimbo yoyote, na mtu anaweza kutuma ujumbe kutoka kwa akaunti hiyo kwa kuunda na kusaini muamala; kwa akaunti ya mkataba, kila wakati akaunti inapopokea ujumbe msimbo unatekelezwa, ukiruhusu kutiwa na kusomewa kwa hifadhi ya ndani na kutuma ujumbe mwingine au kuunda mikataba ikifuatana.

Kumbuka kuwa "mikataba" katika Ethereum haipaswi kuonekana kama kitu kinachopaswa "kutimizwa" au "kuzingatiwa"; badala yake, ni kama "wakala huru" wanaoishi ndani ya mazingira ya utekelezaji ya Ethereum, kila wakati wakitekeleza kipande maalum cha msimbo wanapopewa ujumbe au muamala, na kuwa na udhibiti wa moja kwa moja wa salio lao la ether na hifadhi yao ya funguo/thamani kuzingatia vigezo vya kudumu.

### Ujumbe na Miamala {#messages-and-transactions}

Neno "muamala" linatumika katika Ethereum kumaanisha kifurushi cha data kilichosainiwa kinachohifadhi ujumbe unaotumwa kutoka kwa akaunti inayomilikiwa na mtu. Miamala ina:

- Mpokeaji wa ujumbe
- Saini inayotambua mtuma
- Kiasi cha ether cha kuhamishwa kutoka kwa mtuma kwa mpokeaji
- Sehemu ya data chaguo-msingi
- Thamani ya `STARTGAS`, inayowakilisha idadi ya juu zaidi ya hatua za kikokotoo ambazo utekelezaji wa muamala unaruhusiwa kuchukua
- Thamani ya `GASPRICE`, inayowakilisha ada anayolipa mtumaji kwa kila hatua ya kikokotoo

Mambo matatu ya kwanza ni sehemu za kawaida zinazotarajiwa katika sarafu yoyote ya kidijitali. Sehemu ya data haina kazi kwa chaguo-msingi, lakini mashine pepe ina opcode ambayo mkataba unaweza kutumia kupata data hiyo; mfano wa matumizi ni kama mkataba unafanya kazi kama huduma ya usajili wa majina kwenye blockchain, basi unaweza kutafsiri data inayopita kama ikiweka "sehemu mbili", sehemu ya kwanza ikiwa ni jina la kikoa kuandikishwa na sehemu ya pili anwani ya IP kuhusishwa. Mkataba utasoma haya kutoka kwa data ya ujumbe na kuweka ipasavyo katika hifadhi.

Sehemu za `STARTGAS` na `GASPRICE` ni muhimu kwa mfumo wa Ethereum wa kuzuia kunyimwa huduma. Ili kuzuia mizunguko isiyo na mwisho au matumizi mabaya ya rasilimali katika msimbo, kila muamala unahitaji kuweka kikomo cha hatua za kihesabu kinachoweza kutumiwa. Kitengo msingi cha hesabu ni "gesi"; kwa kawaida, hatua ya hesabu huhitaji gesi moja, lakini baadhi ya shughuli huhitaji gesi zaidi kwa sababu ni ngumu zaidi kihesabu, au huongeza kiasi cha data kinachotakiwa kuhifadhiwa kama sehemu ya hali. Pia kuna ada ya gesi 5 kwa kila beyti katika data ya muamala. Lengo la mfumo wa ada ni kumlazimisha mshambuliaji kulipa kwa rasilimali zote anazotumia, ikiwa ni pamoja na hesabu, msongamano wa mtandao, na uhifadhi; hivyo muamala wowote unaoongeza matumizi ya rasilimali hizi lazima uwe na ada ya gesi inayolingana.

### Ujumbe {#messages}

Mikataba ina uwezo wa kutuma "ujumbe" kwa mikataba mingine. Ujumbe ni vitu vya pepe ambavyo havihifadhiwi na vinaishi tu katika mazingira ya utekelezaji ya Ethereum. Ujumbe una:

- Mtuma wa ujumbe(asiyeonekana moja kwa moja)
- Mpokeaji wa ujumbe
- Kiasi cha ether kinachotumwa pamoja na ujumbe
- Sehemu ya data chaguo-msingi
- Thamani ya `STARTGAS`

Asilimia gani, ujumbe ni kama muamala, isipokuwa unazalishwa na mkataba na si mtu wa nje. Ujumbe hutolewa wakati mkataba unaotekeleza msimbo unatekeleza msimbo-endeshaji wa `CALL`, ambao hutoa na kutekeleza ujumbe. Kama muamala, ujumbe unasababisha akaunti mpokeaji kutekeleza msimbo wake. Hii inaruhusu mikataba kuhusiana na mikataba mingine kwa njia sawa kabisa na watu wa nje.

Kumbuka kuwa msamaha wa gesi unaopatikana kwa muamala au mkataba unahusisha gesi yote inayotumiwa na muamala huo na utekelezaji wake mdogo. Mfano, ikiwa mtu A anamtumia mtu B muamala wenye gesi 1000, na B anatumia gesi 600 kabla ya kutuma ujumbe kwa C, na utekelezaji wa C unatumia gesi 300 kabla ya kurudi, basi B anaweza kutumia gesi 100 zaidi kabla ya kukosa gesi.

### Kazi ya Mpito wa Hali ya Ethereum {#ethereum-state-transition-function}

![Mpito wa hali ya Ether](./ether-state-transition.png)

Kazi ya mpito wa hali ya Ethereum, `APPLY(S,TX) -> S'` inaweza kufafanuliwa kama ifuatavyo:

1. Angalia ikiwa muamala umeundwa vizuri (yaani, una idadi sahihi ya thamani), saini ni halali, na nonce inalingana na nonce katika akaunti ya mtumaji. Ikiwa si hivyo, rudisha kosa.
2. Hesabu ada ya muamala kama `STARTGAS * GASPRICE`, na tambua anwani ya mtumaji kutoka kwa saini. Ondoa ada kutoka salio la akaunti ya mtuma na ongeza nonce ya mtuma. Ikiwa hakuna salio la kutosha, rudisha kosa.
3. Anzisha `GAS = STARTGAS`, na toa kiasi fulani cha gesi kwa kila baiti kulipia baiti katika muamala.
4. Hamisha thamani ya muamala kutoka kwa akaunti ya mtuma hadi akaunti ya mpokeaji. Ikiwa akaunti ya mpokeaji haipo, unda akaunti hiyo. Ikiwa akaunti ya mpokeaji ni mkataba, endesha msimbo wa mkataba hadi kumalizika au hadi gesi itakapokamilika.
5. Ikiwa hamisho la thamani limefeli kwa sababu mtuma hana pesa za kutosha, au utekelezaji wa msimbo umekosa gesi, rejea mabadiliko yote ya hali isipokuwa malipo ya ada, na ongeza ada kwa akaunti ya mchimbaji.
6. Vinginevyo, rudisha ada ya gesi iliyobaki kwa mtuma, na tuma ada ya gesi iliyotumika kwa mchimbaji.

Kwa mfano, tuseme mkataba wa msimbo ni:

```py
if !self.storage[calldataload(0)]:
  self.storage[calldataload(0)] = calldataload(32)
```

Kumbuka kuwa katika ukweli msimbo wa mkataba umeandikwa kwa lugha ya chini ya EVM; mfano huu umeandikwa kwa Serpent, moja ya lugha zetu za kiwango cha juu, kwa uwazi, na unaweza kusanifiwa kwa msimbo wa EVM. Tuseme hifadhi ya mkataba inaanza ikiwa tupu, na muamala umetumwa wenye thamani ya ether 10, gesi 2000, bei ya gesi ya ether 0.001, na data ya baiti 64, huku baiti 0-31 zikiwakilisha nambari `2` na baiti 32-63 zikiwakilisha mfuatano `CHARLIE`. Mchakato wa kazi ya mabadiliko ya hali katika kesi hii ni kama ifuatavyo:

1. Hakiki kuwa muamala ni halali na umeandaliwa vizuri.
2. Hakiki kuwa mtuma wa muamala ana angalau ether 2000 \* 0.001 = 2. Ikiwa ni hivyo, toa 2 ether kutoka kwa akaunti ya mtuma.
3. Anzisha gesi = 2000; tukizingatia kuwa muamala ni bole 170 bytes na ada ya byte ni 5, toa 850 ili kubaki gesi 1150.
4. Toa ether 10 zaidi kutoka kwa akaunti ya mtuma, na ongeza kwenye akaunti ya mkataba.
5. Endesha msimbo. Katika kesi hii, ni rahisi: inakagua kama hifadhi ya mkataba kwenye faharasa `2` imetumika, inagundua kuwa haijatumika, na hivyo inaweka hifadhi kwenye faharasa `2` kuwa na thamani `CHARLIE`. Tuchukulie hili linahitaji gesi 187, hivyo gesi iliyobaki ni 1150 - 187 = 963
6. Rudisha ether 963 \* 0.001 = 0.963 kwa akaunti ya mtuma, na rudisha hali inayotokana.

Ikiwa hakuna mkataba upande wa mpokeaji wa muamala, basi jumla ya ada ya muamala itakuwa sawa na `GASPRICE` iliyotolewa ikizidishwa na urefu wa muamala kwa baiti, na data iliyotumwa pamoja na muamala haitakuwa na umuhimu.

Kumbuka kuwa ujumbe hufanya kazi kama muamala katika muktadha wa kurudi nyuma: ikiwa utekelezaji wa ujumbe unakosa gesi, basi utekelezaji wa ujumbe huo, pamoja na utekelezaji mingine yote uliosababishwa na ule, hurudi nyuma, lakini utekelezaji wa mzazi hauhitaji kurudi nyuma. Hii ina maana kuwa ni "salama" kwa mkataba kuituma ujumbe kwa mkataba mwingine, kwani ikiwa A anawasiliana na B kwa gesi G basi utekelezaji wa A unahakikishiwa kupoteza angalau gesi G. Mwishowe, kumbuka kuwa kuna msimbo-endeshaji, `CREATE`, unaounda mkataba; mbinu zake za utekelezaji kwa ujumla zinafanana na `CALL`, isipokuwa kwamba towe la utekelezaji huamua msimbo wa mkataba mpya ulioundwa.

### Utekelezaji wa Msimbo {#code-execution}

Msimbo katika mikataba ya Ethereum umeandikwa kwa lugha ya msimbo wa chini wa staki, unaojulikana kama "msimbo wa mashine pepe ya Ethereum" au "msimbo wa EVM". Msimbo una mfululizo wa bytes, ambapo kila byte inawakilisha shughuli moja. Kwa ujumla, utekelezaji wa msimbo ni kitanzi kisicho na mwisho ambacho kinajumuisha kutekeleza operesheni mara kwa mara kwenye kaunta ya programu ya sasa (inayoanzia sifuri) na kisha kuongeza kaunta ya programu kwa moja, hadi mwisho wa msimbo ufikiwe au hitilafu au maagizo ya `STOP` au `RETURN` yagunduliwe. Shughuli zinaweza kutumia aina tatu za sehemu za kuhifadhi data:

- **Rafu**, chombo cha mwisho-kuingia-kwanza-kutoka ambapo thamani zinaweza kusukumwa na kutolewa
- **Kumbukumbu**, safu ya baiti inayoweza kupanuka bila kikomo
- Hifadhi ya muda mrefu ya mkataba, duka la ufunguo/thamani. Tofauti na staki na kumbukumbu, ambazo hurudishwa kuwa safi baada ya hesabu kumalizika, hifadhi hudumu kwa muda mrefu.

Msimbo pia unaweza kupata thamani, mtuma na data ya ujumbe unaoingia, pamoja na data ya kichwa cha block, na unaweza pia kurudisha safu ya byte kama matokeo.

Mfano rasmi wa utekelezaji wa msimbo wa EVM ni rahisi sana. Wakati mashine halisi ya Ethereum inafanya kazi, hali yake kamili ya kikokotozi inaweza kufafanuliwa na tuple `(block_state, transaction, message, code, memory, stack, pc, gas)`, ambapo `block_state` ni hali ya kimataifa inayojumuisha akaunti zote na inajumuisha salio na hifadhi. Mwanzoni mwa kila raundi ya utekelezaji, maagizo ya sasa yanapatikana kwa kuchukua baiti ya `pc` ya `code` (au 0 ikiwa `pc >= len(code)`), na kila agizo lina ufafanuzi wake jinsi linavyoathiri tuple. Kwa mfano, `ADD` hutoa vitu viwili kutoka kwenye rafu na kusukuma jumla yao, hupunguza `gas` kwa 1 na huongeza `pc` kwa 1, na `SSTORE` hutoa vitu viwili vya juu kutoka kwenye rafu na kuingiza kitu cha pili kwenye hifadhi ya mkataba kwenye faharasa iliyobainishwa na kitu cha kwanza. Ingawa kuna njia nyingi za kuboresha utekelezaji wa mashine pepe ya Ethereum kwa matumizi ya jibu haraka, utekelezaji wa msingi wa Ethereum unaweza kufanywa katika mistari michache mia ya msimbo.

### Mnyororo wa Bloku na Uchimbaji Madini {#blockchain-and-mining}

![Mchoro wa bloku ya utekelezaji ya Ethereum](./ethereum-apply-block-diagram.png)

Blockchain ya Ethereum kwa njia nyingi ni kama blockchain ya Bitcoin, ingawa ina tofauti kadhaa. Tofauti kuu kati ya Ethereum na Bitcoin kuhusu usanifu wa blockchain ni kuwa, tofauti na Bitcoin, blocks za Ethereum zina orodha ya miamala na hali ya hivi punde. Zaidi ya hayo, thamani mbili, nambari ya block na ugumu, pia huhifadhiwa katika block. Algorithimu ya msingi ya ukaguzi wa block katika Ethereum ni kama ifuatavyo:

1. Hakiki kama block inayorejelea bloki iliyotangulia ipo na ni halali.
2. Hakiki kuwa timestamp ya bloki ni kubwa kuliko ile ya bloki iliyotangulia na haizidi dakika 15 mbele
3. Hakiki kuwa nambari ya bloki, ugumu, mizizi ya miamala na mizizi ya "uncle", na kikomo cha gesi(mifano ya chini kadhaa ya kauli haswa ya Ethereum) ni halali.
4. Thibitisha kwamba proof-of-work kwenye block ni halali.
5. Wacha `S[0]` iwe hali mwishoni mwa bloku iliyotangulia.
6. Wacha `TX` iwe orodha ya miamala ya bloku, yenye miamala `n`. Kwa `i` zote katika `0...n-1`, weka `S[i+1] = APPLY(S[i],TX[i])`. Ikiwa matumizi yoyote yatarudisha hitilafu, au ikiwa jumla ya gesi iliyotumika katika bloku hadi sasa inazidi `GASLIMIT`, rudisha hitilafu.
7. Wacha `S_FINAL` iwe `S[n]`, lakini ukiongeza zawadi ya kizuizi inayolipwa kwa mchimbaji.
8. Angalia ikiwa mzizi wa mti wa Merkle wa hali `S_FINAL` ni sawa na mzizi wa hali ya mwisho uliotolewa kwenye kichwa cha bloku. Ikiwa ni sawa, block ni halali; vinginevyo, si halali.

Njia hii inaweza kuonekana isiyofaa mwanzoni, kwa sababu inahitaji kuhifadhi hali yote kwa kila bloki, lakini kwa kweli ufanisi unapaswa kuwa sawa na ule wa Bitcoin. Sababu ni kuwa hali huhifadhiwa katika muundo wa mti, na baada ya bloki yoyote, sehemu ndogo tu ya mti inahitaji kubadilishwa. Kwa hivyo, kwa ujumla, kati ya bloku mbili zilizo karibu sehemu kubwa ya mti inapaswa kuwa sawa, na kwa hivyo data inaweza kuhifadhiwa mara moja na kurejelewa mara mbili kwa kutumia viashiria (yaani, hashi za miti midogo). Aina maalum ya mti inayoitwa "mti wa Patricia" hutumika kufanikisha hili, ikiwa na marekebisho ya dhana ya mti wa Merkle ambayo inaruhusu kuingiza na kufuta nodi kwa ufanisi, si kubadilisha tu. Zaidi ya hayo, kwa kuwa taarifa zote za hali ni sehemu ya bloki ya mwisho, hakuna haja ya kuhifadhi historia yote ya blockchain - mkakati ambao, kama ungetumika Bitcoin, unaweza kuleta akiba ya nafasi ya mara 5-20.

Swali la mara kwa mara ni "msimbo wa mkataba unatekelezaje, kwa upande wa vifaa vya kimwili. Hili lina jibu rahisi: mchakato wa kutekeleza msimbo wa mkataba ni sehemu ya ufafanuzi wa kazi ya mpito wa hali, ambayo ni sehemu ya kanuni ya uthibitishaji wa bloku, kwa hivyo ikiwa muamala umeongezwa kwenye bloku `B` utekelezaji wa msimbo unaochochewa na muamala huo utatekelezwa na nodi zote, sasa na siku zijazo, ambazo zinapakua na kuthibitisha bloku `B`.

## Matumizi {#applications}

Kwa jumla, kuna aina tatu za programu juu ya Ethereum. Kundi la kwanza ni programu za kifedha, zinazowapa watumiaji njia za nguvu zaidi za kusimamia na kuingia mikataba kwa fedha zao. Hii inajumuisha sarafu ndogo, derivatives za kifedha, mikataba ya hedging, pochi za akiba, wasia, na hatimaye aina fulani za mikataba ya kazi kamili. Kundi la pili ni programu za nusu-kifedha, ambapo fedha zinahusika lakini pia kuna sehemu kubwa isiyo ya kifedha; mfano mzuri ni zawadi zinazojiendesha mwenyewe kwa suluhisho la matatizo ya kompyuta. Mwisho, kuna programu kama kura za mtandao na utawala usio na msimamizi ambazo si za kifedha kabisa.

### Mifumo ya Tokeni {#token-systems}

Mifumo ya tokeni kwenye blockchain ina matumizi mengi kuanzia sarafu ndogo zinazowakilisha mali kama USD au dhahabu hadi hisa za kampuni, tokeni binafsi zinazo wakilisha mali mahususi, vocha salama ambazo haiwezi kubadilishwa, na hata mifumo ya tokeni isiyo na uhusiano na thamani za kawaida kabisa, inayotumika kama mfumo wa alama za motisha. Mifumo ya tokeni ni rahisi kushirikisha katika Ethereum. Kitendo kikuu cha kuelewa ni kwamba sarafu, au mfumo wa tokeni, ni misingi database yenye operesheni moja: toa X vipimo kutoka A na upe X vipimo B, kwa sharti kuwa (i) A alikuwa na angalau X vipimo kabla ya muamala na (2) muamala umeturuhusiwa na A. Yote yanayotakiwa kutekeleza mfumo wa tokeni ni kutekeleza mantiki hii katika mkataba.

Msimbo rahisi wa kushirikisha mtumo wa tokeni kwa Serpent unafanana kama ifuatavyo:

```py
def send(to, value):
  if self.storage[msg.sender] >= value:
    self.storage[msg.sender] = self.storage[msg.sender] - value
    self.storage[to] = self.storage[to] + value
```

Hii ni utekelezaji wa moja kwa moja wa kazi ya mabadiliko ya hali ya "mfumo wa benki" iliyoelezwa hapo juu zaidi katika hati hii. Mistari michache ya msimbo inahitaji kuongezwa ili kuanzisha hatua ya awali ya kusambaza vitengo vya sarafu kwa mara ya kwanza na baadhi ya kesi za mwisho, na kwa kawaida kazi ingeongezwa kuruhusu mikataba mingine kuulizia salio la anwani. Lakini hayo ndiyo yote. Kwa nadharia, mifumo ya tokeni zinazotegemea Ethereum inayofanya kazi kama sarafu ndogo inaweza kuhusisha kipengele kingine muhimu ambacho meta-sarafu za Bitcoin-based zimeshindwa kuwa nazo: uwezo wa kulipa ada za muamala moja kwa moja kwa sarafu hiyo. Jinsi hii ingetekelezwa ni kwamba mkataba ungefanya usawa wa ether ambao ungeirudishia ether iliyotumiwa kulipa ada kwa mtuma, na ungeongeza usawa huu kwa kukusanya vitengo vya sarafu ya ndani ambavyo hupewa kama ada na kuviuza tena katika mnada unaoendelea. Watumiaji basi wangehitaji "kuamsha" akaunti zao na ether, lakini mara ether ipo, ingekuwa inaweza kutumika tena kwa sababu mkataba ungeirudisha kila mara.

### Vifaa vya Kifedha na Sarafu zenye Thamani Imara {#financial-derivatives-and-stable-value-currencies}

Viingilio vya kifedha ni matumizi ya kawaida zaidi ya "mkataba smart", na ni rahisi zaidi kutekeleza kwa msimbo. Changamoto kuu katika kutekeleza mikataba ya kifedha ni kwamba wengi wao wanahitaji marejeleo kutoka kwa ripoti ya bei ya nje; mfano gani ni mkataba-erevu muhimu unaolinda dhidi ya mabadiliko ya thamani ya ether (au sarafu nyingine ya krypto) kwa dola ya Marekani, lakini kufanya hivyo kunahitaji mkataba kujua thamani ya ETH/USD. Njia rahisi zaidi ya kufanya hili ni kupitia mkataba wa "data feed" unaosimamiwa na mhusika maalum (k.m., NASDAQ) ulioundwa ili mhusika huyo awe na uwezo wa kusasisha mkataba inapohitajika, na kutoa kiolesura kinachoruhusu mikataba mingine kutuma ujumbe kwa mkataba huo na kupata jibu linalotoa bei.

Kwa kuzingatia hilo, mkataba wa hedging ungeonekana kama ifuatavyo:

1. Subiri upande A awasilishe ether 1000.
2. Subiri upande B awasilishe ether 1000.
3. Rekodi thamani ya dola ya ether 1000, iliyokadiriwa kwa kuulizia mkataba wa data feed, katika hifadhi, sema hiyo ni $x.
4. Baada ya siku 30, ruhusu A au B "kuanzisha tena" mkataba ili kutuma ether yenye thamani ya $x (iliyokadiriwa kwa kuulizia tena bei mpya katika mkataba wa data feed) kwa A na salio kwa B.

Mkataba kama huu una uwezo mkubwa katika biashara ya krypto. Moja ya matatizo kuu yaliyotajwa kuhusu sarafu za kidijitali ni kutegemea mabadiliko ya thamani; ingawa watumiaji wengi na wauzaji wanaweza kutaka usalama na urahisi wa kushughulika na mali za cryptographic, wengi hawawezi kukubali kupoteza hadi 23% ya thamani ya fedha zao kwa siku moja. Hadi sasa, suluhisho lililopendekezwa zaidi limekuwa mali zinazoungwa mkono na mtoaji; wazo ni kwamba mtoaji anaunda sarafu ndogo ambayo ana haki ya kutoa na kufuta vitengo, na kutoa kitengo kimoja cha sarafu kwa mtu yeyote anayewapa (nje ya mtandao) kitengo kimoja cha mali ya msingi iliyobainishwa (k.m., dhahabu, USD). Mhusika huhakikishia kutoa kitengo cha mali kwa yeyote anayerudisha kitengo kimoja cha krypto-mali. Mchakato huu unaruhusu mali yoyote isiyo ya kikriptografia "kuongezwa thamani" kuwa mali ya cryptographic, kwa sharti mhusika anategemewa.

Katika vitendo, hata hivyo, wahusika si kila mara wanaaminika, na katika baadhi ya kesi miundombinu ya benki ni dhaifu au hatari kwa huduma kama hizo kuwepo. Viingilio vya kifedha zinatolewa kama mbadala. Hapa, badala ya mtoaji mmoja kutoa fedha za kuunga mkono mali, soko lililogatuliwa la walanguzi, wanaobashiri kwamba bei ya mali ya rejeleo ya kriptografia (k.m., ETH) itapanda, ndio huchukua jukumu hilo. Tofauti na wahusika, wawekezaji hawawezi kukiuka upande wao wa mkataba kwa sababu mkataba wa hedging unawashikilia fedha zao kwa escrow. Kumbuka mbinu hii si kamili sana kwa kuwa chanzo cha kuaminika bado kinahitajika kutoa ripoti ya bei, ingawa bado ni maendeleo makubwa kwa kupunguza mahitaji ya miundombinu (tofauti na kuwa mhusika, kutoa ripoti ya bei hakuhitaji leseni na kunaweza kuzingatiwa kama uhuru wa kusema) na kuzuia kuwepo na utapeli.

### Mifumo ya Utambulisho na Sifa {#identity-and-reputation-systems}

Sarafu ya kidigitali mbadala ya awali kabisa, [Namecoin](http://namecoin.org/), ilijaribu kutumia mnyororo wa bloku unaofanana na Bitcoin kutoa mfumo wa usajili wa majina, ambapo watumiaji wanaweza kusajili majina yao katika hifadhidata ya umma pamoja na data nyingine. Kesi kuu ya matumizi iliyotajwa ni kwa mfumo wa [DNS](https://wikipedia.org/wiki/Domain_Name_System), inayopanga majina ya vikoa kama "bitcoin.org" (au, katika kesi ya Namecoin, "bitcoin.bit") kwa anwani ya IP. Matumizi mengine ni uthibitishaji wa barua pepe na mifumo ya sifa ya hali ya juu zaidi. Hapa kuna mkataba wa msingi wa kutoa mfumo wa usajili wa majina kama wa Namecoin kwenye Ethereum:

```py
def register(name, value):
  if !self.storage[name]:
    self.storage[name] = value
```

Mkataba ni rahisi sana; yote ni hifadhidata ndani ya mtandao wa Ethereum ambayo inaweza kuongezwa, lakini si kubadilishwa au kufutwa. Kila mtu anaweza kusajili jina kwa thamani fulani, na usajili huo unabaki milele. Mkataba wa usajili wa majina ulioboreshwa zaidi pia utakuwa na "kifungu cha kazi" kinachoruhusu mikataba mingine kuiuliza, pamoja na utaratibu kwa "mmiliki" (yaani, msajili wa kwanza) wa jina kubadilisha data au kuhamisha umiliki. Mtu anaweza kuongeza hata sifa za sifa na mtandao wa imani juu yake.

### Hifadhi ya Faili Iliyogatuliwa {#decentralized-file-storage}

Katika miaka michache iliyopita, kumekuwa na kuibuka kwa kampuni maarufu za kuhifadhi faili mtandaoni, maarufu zaidi ikiwa ni Dropbox, zinazotaka kuwapa watumiaji uwezo wa kupakia nakala rudufu ya diski zao ngumu na kuweka huduma hifadhi hiyo na kumruhusu mtumiaji kuifikia kwa malipo ya kila mwezi. Hata hivyo, sasa hivi soko la kuhifadhi faili ni mara nyingine si wenye ufanisi sana; mtazamo wa haraka wa suluhisho mbalimbali zilizopo unaonyesha kuwa hasa katika kiwango cha "uncanny valley" cha GB 20-200 ambapo hakuna quota ya bure au punguzo la ngazi ya biashara linavyoanza, bei za kila mwezi za kuhifadhi faili ni ghali kiasi kwamba unalipia zaidi ya gharama ya diski nzima kwa mwezi mmoja tu. Mikataba ya Ethereum inaweza kuruhusu maendeleo ya mfumo wa uhifadhi wa faili usio na msimamizi wa kati, ambapo watumiaji binafsi wanaweza kupata kipato kidogo kwa kukodisha diski zao ngumu na nafasi zisizotumika zikitumika kupunguza zaidi gharama za kuhifadhi faili.

Sehemu muhimu ya mfumo kama huu itaweza kuwa kile tunachokiita "mkataba wa Dropbox gatuzi". Mkataba huu hufnya kazi kama ifuatavyo. Kwanza, mtu anagawanya data inayotakiwa katika bloki, kuzificha block zote kwa usiri, na kujenga mti wa Merkle kutoka kwake. Kisha mtu anafanya mkataba wenye sheria kwamba kila blocks N, mkataba utachagua index ya nasibu katika mti wa Merkle (kutumia hash ya block ya awali inayopatikana kutoka kwa msimbo wa mkataba kama chanzo cha nasibu), na kumpa ether X kitu cha kwanza kutoa muamala wenye ushahidi wa huduma rahisi wa umiliki wa bloki katika index hiyo ya mti. Mtumiaji anapotaka kupakua tena faili yake, anaweza kutumia itifaki ya chaneli ya malipo madogo (k.m., kulipa szabo 1 kwa kila kilobaiti 32) ili kurejesha faili; mbinu yenye ufanisi zaidi wa ada ni kwa mlipaji kutochapisha muamala hadi mwisho, badala yake akibadilisha muamala na mwingine wenye faida kidogo na nonce ileile baada ya kila kilobaiti 32.

Sifa muhimu ya itifaki ni kwamba, ingawa inavyoonekana mtu anaamini nodi nyingi zisahau faili, anaweza kupunguza hatari hiyo karibu sifuri kwa kugawanya faili vipande vingi kwa njia ya kushirikiana kwa siri, na kuangalia mikataba kuona sehemu zote bado ziko mkononi mwa nodi fulani. Ikiwa mkataba bado unatoa pesa, hiyo ni ushahidi wa usimbaji fiche wa kriptografia kwamba mtu bado anahifadhi faili.

### Mashirika Huru ya Kiotomatiki {#decentralized-autonomous-organizations}

Dhana ya jumla ya "shirika huru la ugatuzi" ni kitu cha pepe chenye seti ya wanachama au wanahisa ambao, labda kwa idadi ya juu ya 67%, wana haki ya kutumia fedha za shirika na kubadilisha msimbo wake. Wanachama watakubaliana pamoja juu ya jinsi shirika linapaswa kugawa fedha zake. Njia za kugawa fedha za shirika DAO's zinaweza kuanzia zawadi, mishahara hadi njia za kipekee zaidi kama sarafu ya ndani kuwapa motisha wafanyakazi. Hili kwa kiasi kikubwa hufanana na utawala wa kampuni au shirika lisilo la faida kwa kutumia tu teknolojia za kriptografia za blockchain kuhimiza. Hadi sasa mazungumzo mengi kuhusu DAOs yamezunguka mfano wa "kampuni huru isiyosimamiwa na msimamizi" (DAC) yenye wanahisa wanaopokea gawio na hisa zinazoweza kuuzwa; mbadala, labda eleza kama "jamii huru isiyosimamiwa na msimamizi", ingekuwa kwamba wanachama wote wana mshiriki sawa katika maamuzi na inahitaji idadi ya 67% ya wanachama waliopo kukubaliana kuongeza au kuondoa mwanachama. Sharti kwamba mtu mmoja awe na uanachama mmoja tu unapaswa kuthibitishwa pamoja na kundi.

Muhtasari wa jinsi ya kuandika msimbo wa DAO ni kama ifuatavyo. Muundo rahisi ni msimbo unaojibadilisha wenyewe unaobadilika endapo theluthi mbili ya wanachama watakubaliana juu ya mabadiliko. Ingawa msimbo kwa nadharia hauwezi kubadilika, mtu anaweza kuzunguka hili kwa kuwa na sehemu za msimbo katika mikataba tofauti, na kuweka anwani ya mikataba ya kuitwa kuhifadhiwa katika hifadhi inayobadilika. Katika utekelezaji rahisi wa mkataba wa DAO, kutakuwa na aina tatu za miamala, zinazotofautishwa na data iliyotolewa:

- `[0,i,K,V]` kusajili pendekezo lenye faharasa `i` la kubadilisha anwani katika faharasa ya hifadhi `K` kuwa thamani `V`
- `[1,i]` kusajili kura ya kuunga mkono pendekezo `i`
- `[2,i]` kukamilisha pendekezo `i` ikiwa kura za kutosha zimepigwa

Mkataba utakuwa na masharti kwa kila moja ya haya. Utahifadhi rekodi ya mabadiliko yote yaliyofunguliwa ya hifadhi, pamoja na orodha ya waliopiga kura. Pia itakuwa na orodha ya wanachama wote. Mara yoyote mabadiliko ya hifadhi yatakayopata kura za theluthi mbili ya wanachama, muamala wa kumalizia unaweza kutekeleza mabadiliko. Muundo wa kina zaidi pia utakuwa na uwezo wa kupiga kura uliojengwa ndani kwa ajili ya vipengele kama vile kutuma muamala, kuongeza wanachama na kuondoa wanachama, na unaweza hata kutoa ugawaji wa kura wa mtindo wa [Liquid Democracy](https://wikipedia.org/wiki/Liquid_democracy) (yaani, mtu yeyote anaweza kumteua mtu wa kumpigia kura, na uteuzi huo ni wa mpito kwa hivyo ikiwa A atamteua B na B akamteua C basi C huamua kura ya A). Muundo huu utawezesha DAO kukua kidemokrasia kama jamii huru, ikiruhusu watu hatimaye kupeana jukumu la kuchuja nani ni mwanachama kwa wataalamu, ingawa tofauti na "mfumo wa sasa" wataalamu wanaweza kuingia na kutoka kwa urahisi wakati wanachama binafsi wa jamii wanabadilisha mawazo yao.

Mfano mwingine ni kampuni huru inayowezesha akaunti yoyote kuwa na hisa sifuri au zaidi, na kura za theluthi mbili za hisa zinahitajika kufanya maamuzi. Muundo kamili utahusisha utawala wa mali, uwezo wa kufanya ofa kununua au kuuza hisa, na uwezo wa kukubali ofa (akiwa na mtindo wa kulinganisha oda ndani ya mkataba). Uteuzi pia utakuwepo kwa mtindo wa Liquid Democracy, ukipanua dhana ya "bodi ya wakurugenzi".

### Matumizi Zaidi {#further-applications}

**1. Pochi za akiba**. Tuchukulie Alice anataka kulinda fedha zake, lakini ana wasiwasi kuwa ataipoteza au mtu atavunja funguo zake binafsi. Anaweka ether katika mkataba na Bob, benki, kama ifuatavyo:

- Alice peke yake anaweza kutoa hadi 1% ya fedha kwa siku.
- Bob peke yake anaweza kutoa hadi 1% ya fedha kwa siku, lakini Alice ana uwezo wa kufanya muamala wa kuzuia hili.
- Alice na Bob pamoja wanaweza kutoa fedha zozote.

Kwa kawaida, 1% kwa siku inatosha kwa Alice, na anapohitaji zaidi anaweza kumtafuta Bob kwa msaada. Ikiwa funguo za Alice ziharibiwa, anaenda kwa Bob kuchukua fedha na kuhamisha kwenye mkataba mpya. Ikiwa atapoteza funguo, Bob atatoa fedha kwa hakika. Ikiwa Bob atatokea kuwa mbaya, Alice anaweza kuzuia uwezo wake wa kutoa fedha.

**2. Bima ya mazao**. Mtu anaweza kutengeneza mkataba wa viingilio wa kifedha kwa kutumia data ya hali ya hewa badala ya index ya bei. Ikiwa mkulima aliye Iowa ananunue kiingilio kinacholipa kinyume na mvua kule Iowa, basi akiba atapokea pesa moja kwa moja ikiwa kuna ukame, na furaha ikiwa mvua itatosha. Hii inaweza kupanuliwa kuwa bima ya majanga ya asili kwa ujumla.

**3. Chanzo cha data huru**. Kwa mikataba ya kifedha kwa tofauti, inaweza kuwa inawezekana kugatua mlisho wa data kupitia itifaki inayoitwa "[SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/)". Kimsingi SchellingCoin hufanya kazi kama ifuatavyo: wahusika N wote huweka kwenye mfumo thamani ya data fulani (k.m., bei ya ETH/USD), thamani hizo hupangwa, na kila mtu kati ya asilimia 25 na 75 anapata tokeni moja kama zawadi. Kila mtu ana hamasa ya kutoa jibu ambalo wengine wata toa, na thamani pekee ambayo wachezaji wengi wanaweza kukubaliana ni ukweli. Hii huunda itifaki huru inayoweza kutoa idadi yoyote ya thamani, ikiwa ni pamoja na bei ya ETH/USD, joto la Berlin, au matokeo ya hesabu ngumu.

**4.** Mkataba wa escrow wa nguvu za saini nyingi\*\*. Bitcoin inaruhusu mikataba yenye saini nyingi ambapo, kwa mfano, tatu kati ya funguo tano wanaweza kutumia fedha. Ethereum inaruhusu utofauti zaidi; kwa mfano, nne kati ya tano wanaweza kutumia kila kitu, tatu kati ya tano wanaweza kutumia hadi 10% kwa siku, na mbili kati ya tano hadi 0.5% kwa siku. Zaidi ya hayo, multisig ya Ethereum ni solandanifu - watu wawili wanaweza kusajili saini zao kwenye blockchain wakati tofauti na saini ya mwisho itatuma muamala moja kwa moja.

**5.** Wingu la utarakilishi\*\*. Teknolojia ya EVM pia inaweza kutumika kuunda mazingira ya kuhifadhi utarakilishi yanayothibitishwa, kuruhusu watumiaji kuwaombi wengine kufanya mahesabu na kisha omba uthibitisho wa kwamba mahesabu maeneo fulani yaliyopangwa kimsingi yamefanyika sawa. Hii inaruhusu kuundwa kwa soko la kompyuta ya wingu ambapo mtumiaji yeyote anaweza kushiriki na kompyuta yake ya mezani, kompyuta ndogo au seva maalum, na ukaguzi wa mara kwa mara pamoja na amana za usalama zinaweza kutumika kuhakikisha kuwa mfumo ni wa kuaminika (yaani, nodi haziwezi kudanganya kwa faida). Ingawa mfumo kama huu unaweza usifae kwa kazi zote; kazi zinahitaji mawasiliano ya hali ya juu kati ya michakato, kwa mfano, haiwezi kufanyika kwa urahisi kwenye wingi kubwa la nodi. Hata hivyo, kazi nyingine ni rahisi zaidi kugawanyika; miradi kama SETI@home, folding@home na algorithms za jenetiki zinaweza kutekelezwa juu ya jukwaa kama hili.

**6.** Kamari ya mtu kwa mtu\*\*. Itifaki zozote za kamari za rika-kwa-rika, kama vile [Cyberdice](http://www.cl.cam.ac.uk/~fms27/papers/2008-StajanoCla-cyberdice.pdf) ya Frank Stajano na Richard Clayton, zinaweza kutekelezwa kwenye mnyororo wa bloku wa Ethereum. Itifaki rahisi ya kamari ni mkataba wa tofauti katika bloki inayofuata, na itifaki zaidi za hali ya juu zinaweza kujengwa, kuunda huduma za kamari zenye ada karibu sifuri na haziwezi kudanganya.

**7.** Masoko ya Utabiri\*\*. Ikiwa kuna oracle au SchellingCoin, masoko ya utabiri pia ni rahisi kutekeleza, na masoko ya utabiri pamoja na SchellingCoin yanaweza kuwa matumizi ya kwanza ya kawaida ya [futarchy](https://mason.gmu.edu/~rhanson/futarchy.html) kama itifaki ya utawala kwa mashirika yaliyogatuliwa.

**8.** Masoko yaliyogatuliwa kwenye mnyororo wa bloku\*\*, kwa kutumia mfumo wa utambulisho na sifa kama msingi.

## Mengineyo na Wasiwasi {#miscellanea-and-concerns}

### Utekelezaji Uliobadilishwa wa GHOST {#modified-ghost-implementation}

Itifaki ya "Greedy Heaviest Observed Subtree" (GHOST) ni uvumbuzi ulioanzishwa kwa mara ya kwanza na Yonatan Sompolinsky na Aviv Zohar mnamo [Desemba 2013](https://eprint.iacr.org/2013/881.pdf). Motisha ya GHOST ni kuwa blockchains zenye muda mfupi wa kuthibitisha mara nyingi huwa na usalama mdogo kwa sababu ya kiwango kikubwa cha bloki zisizotumika - kwa sababu blocks zinachukua muda kusafirishwa mtandaoni, ikiwa mchimbaji A atachimba bloki na mchimbaji B anachimba bloki kabla bloki ya A kufikia B, bloki ya B itakuwa ya bure na haitasaidia usalama wa mtandao. Zaidi ya hayo, kuna tatizo la kuwaridhisha watu wachache: kama mchimbaji A ana 30% ya nguvu ya hash na B ana 10%, A atakuwa na nafasi ya kuzalisha bloki isiyotumika kwa 70% ya wakati(kwa kuwa 30% iliyosaliawakati A alizalisha bloki awali na kwa hivyo atapata data ya uchimbaji mara moja) wakati B ana nafasi ya kuzalisha block isiyotumika kwa 90%. Kwa hivyo, ikiwa muda kati ya bloki ni mfupi sana kwa kiwango kikubwa cha bloki zisizotumika, mchimbaji A atakuwa na ufanisi mkubwa sana kutokana na ukubwa wake. Kwa kuunganishwa kwa mambo haya mawili, blockchains zinazozalisha bloki kwa haraka huenda zikawa na pool moja ya uchimbaji yenye asilimia kubwa ya nguvu ya hash mtandaoni kuweza kudhibiti mchakato wa uchimbaji.

Kama ilivyotajwa na Sompolinsky na Zohar, GHOST inatatua tatizo la kupoteza usalama wa mtandao kwa kujumuisha bloki zisizotumika katika hesabu ya mnyororo mrefu zaidi; yaani, si mzazi na babu wa block peke yake, bali pia watoto wa babu wa bloki (inajulikana kama "uncle" katika Ethereum) hujumuishwa katika hesabu ya bloki yenye jumla kubwa ya proof-of-work inayoiunga mkono. Ili kutatua tatizo la pili la upendeleo wa kuwaridhisha watu wachache, sisi huzidi itifaki yaniyotajwa na Sompolinsky na Zohar, pia tunapeana thawabu za bloki zisizotumika: bloki isiyotumika hupokea asilimia 87.5 ya thawabu zake za msingi, na bloki inayojumuisha bloki isiyotumika hupokea asilimia 12.5 ya thawabu za msingi. Hata hivyo, ada za miamala hazitoiwana mapato kwa blocks zisizotumika.

Ethereum hutumia toleo rahisi la GHOST linalozunguka hadi ngazi saba tu. Kwa undani, ni kama ifuatavyo:

- Block lazima ibainishe mzazi, na lazima ibainishe "uncles" sifuri au zaidi
- Uncle aliyejumuishwa katika block B lazima awe na sifa zifuatazo:
  - Lazima iwe mtoto wa moja kwa moja wa babu wa kizazi cha k cha B, ambapo `2 <= k <= 7`.
  - Haiwezi kuwa babu wa B
  - Uncle lazima awe na kichwa halali cha block, lakini haipaswi kuwa block iliyothibitishwa awali au halali
  - Uncle lazima awe tofauti na "uncles" wote waliotajwa katika bloki zilizopita na wote waliotajwa katika bloki moja (kizuizi cha mara mbili)
- Kila uncle U katika block B, mchimbaji wa B hupata bonasi ya asilimia 3.125 ya thawabu yake ya kawaida na mchimbaji wa U hupata asilimia 93.75 ya thawabu ya kawaida.

Toleo hili lililozuiliwa la GHOST, lililo na uncles hadi kizazi 7 tu, lilitumiwa kwa sababu mbili. Kwanza, GHOST isiyo na kikomo ingeleta usumbufu mwingi katika hesabu ya uncles halali za block fulani. Pili, GHOST isiyo na kikomo iliyo na malipo kama inavyotumika Ethereum inaondoa msukumo kwa mchimbaji kuchimba kwenye mnyororo mkuu badala ya mnyororo wa mshambuliaji wa umma.

### Ada {#fees}

Kwa sababu kila muamala unaochapishwa kwenye blockchain unaagiza mtandao kuupakua na kuuthibitisha, inahitajika mfumo fulani wa udhibiti, kawaida ukiwa ada za muamala, kuzuia matumizi mabaya. Mbinu ya kawaida, inayotumiwa na Bitcoin, ni kuwa ada ni hiari kabisa, na kutegemea wachimbaji kuwa walinzi wa lango na kuweka kiwango cha chini kinachobadilika. Mbinu hii imepokelewa vizuri katika jamii ya Bitcoin hasa kwa sababu ni "inayozingatia soko", ikiruhusu mahitaji na ugavi kati ya wachimbaji na watuma miamala kuamua bei. Tatizo na mbinu hii ni kuwa, hata hivyo, usindikaji wa miamala si soko; ingawa ni la kuvutia kusisitiza usindikaji wa miamala kama huduma inayotolewa na mchimbaji kwa mtuma, kweli kila muamala unaojumuishwa na mchimbaji utawajibika kusindikwa na kila nodi katika mtandao, kwa hiyo gharama kubwa zaidi za usindikaji hutegemea watu wengine, si mchimbaji anayeamua ikiwa au la kuujumuisha. Hivyo, matatizo ya "mikosi ya shughuli za kawaida" huenda yakatokea.

Hata hivyo, dosari hii ya mfumo wa kuzingatia soko, ikiwa itafikiriwa kwa mtazamo fulani usio sahihi, inajatupwa yote yenyewe. Dhana ni kama ifuatavyo. Tuseme kuwa:

1. Muamala husababisha operesheni `k`, ukitoa thawabu `kR` kwa mchimbaji yeyote anayeijumuisha ambapo `R` imewekwa na mtumaji na `k` na `R` (takriban) zinaonekana kwa mchimbaji mapema.
2. Operesheni ina gharama ya usindikaji ya `C` kwa nodi yoyote (yaani, nodi zote zina ufanisi sawa)
3. Kuna nodi `N` za uchimbaji, kila moja ikiwa na nguvu sawa ya usindikaji (yaani, `1/N` ya jumla)
4. Hakuna nodi kamili zisizo za uchimbaji.

Mchimbaji angependa kusindika muamala ikiwa thawabu inayotarajiwa ni kubwa kuliko gharama. Kwa hivyo, thawabu inayotarajiwa ni `kR/N` kwani mchimbaji ana nafasi ya `1/N` ya kushughulikia bloku inayofuata, na gharama ya usindikaji kwa mchimbaji ni `kC` tu. Kwa hivyo, wachimbaji watajumuisha miamala ambapo `kR/N > kC`, au `R > NC`. Kumbuka kuwa `R` ni ada kwa kila operesheni inayotolewa na mtumaji, na hivyo ni kikomo cha chini cha faida ambayo mtumaji hupata kutokana na muamala, na `NC` ni gharama kwa mtandao mzima kwa pamoja ya kushughulikia operesheni. Kwa hivyo, wachimbaji wana motisha ya kujumuisha miamala ambayo faida yake ya jumla ni zaidi ya gharama.

Hata hivyo, katika ukweli kuna tofauti kadhaa muhimu kando na maoni kiukweli:

1. Mchimbaji anagharamia zaidi kusindika muamala kuliko nodi zingine, kwa sababu muda wa ziada wa uthibitisho huchelewesha usafirishaji wa bloki na kuongeza nafasi ya bloki kuwa isiyotumika.
2. Kuna nodi kamili zisizo za uchimbaji.
3. Ugawaji wa nguvu ya uchimbaji unaweza kuwa hauwiano sana.
4. Wanaotamalaki, maadui wa kisiasa na watu wenye fikra kali walio na nia ya kuharibu mtandao wapo, wanaweza kuanzisha mikataba ambayo gharama yao ni ndogo kuliko gharama ya nodi zingine.

(1) hutoa mwelekeo kwa mchimbaji kujumuisha miamala michache, na
(2) huongeza `NC`; kwa hivyo, athari hizi mbili angalau kwa sehemu hufutiana
.<sup>[Jinsi gani?](https://web.archive.org/web/20250427212319/https://github.com/ethereum/wiki/issues/447#issuecomment-316972260#issuecomment-316972260)</sup>
(3) na (4) ndio suala kuu; ili kuzitatua tunaweka tu kikomo
kinachoelea: hakuna bloku inayoweza kuwa na operesheni nyingi kuliko
`BLK_LIMIT_FACTOR` mara wastani wa muda mrefu wa kielelezo.
Maelezo maalum ni:

```js
blk.oplimit = floor((blk.parent.oplimit \* (EMAFACTOR - 1) +
floor(parent.opcount \* BLK\_LIMIT\_FACTOR)) / EMA\_FACTOR)
```

`BLK_LIMIT_FACTOR` na `EMA_FACTOR` ni vidhibiti ambavyo vitawekwa kuwa 65536 na 1.5 kwa sasa, lakini huenda vikabadilishwa baada ya uchambuzi zaidi.

Kuna sababu nyingine ya kuzuiwa kwa ukubwa wa bloki za Bitcoin: bloki kubwa huchukua muda mrefu kusafirishwa na hivyo kuongeza uwezekano wa kuwa bloki zisizotumika. Katika Ethereum, bloki zinazotumia gesi nyingi zapo sakata sawa, kwa sababu bloki hizo ni kubwa kimwili na zinachukua muda mrefu kusindika mabadiliko ya hali kuidhinishwa. Ucheleweshaji huu ni sababu muhimu sana katika Bitcoin, lakini si kwa Ethereum kwa sababu ya itifaki ya GHOST; hiyo ndiyo maana kuna kizuizi cha ukubwa wa block ni msingi thabiti zaidi.

### Ukokotoaji na Ukamilifu wa Turing {#computation-and-turing-completeness}

Kumbuka muhimu ni kwamba mashine pepe ya Ethereum ni Turing-complete; hii ina maana kwamba msimbo wa EVM unaweza kuwakilisha hesabu yoyote inayowezekana kufanyika, ikiwa ni pamoja na mizunguko isiyo na mwisho. Msimbo wa EVM unaruhusu mizunguko kwa njia mbili. Kwanza, kuna maagizo ya `JUMP` yanayoruhusu programu kuruka nyuma hadi mahali pa awali katika msimbo, na maagizo ya `JUMPI` kufanya urukaji wa masharti, kuruhusu taarifa kama `while x < 27: x = x * 2`. Pili, mikataba inaweza kuitwa na mikataba mingine, ikiruhusu mizunguko kupitia urudufu. Hii huleta tatizo: je, watumiaji wabaya wanaweza kuzima wachimbaji na nodi kamili kwa kuwalazimisha waziingie mizunguko isiyo na mwisho? Tatizo linatokana na shida ya kompyuta sayansi linalojulikana kama tatizo la kuacha: hakuna njia ya kusema, kwa ujumla, kama programu fulani itaacha kufanya kazi.

Kama ilivyobainishwa katika sehemu ya mabadiliko ya hali, suluhisho letu ni kusuta miamala ili kuweka kikomo cha hatua za kihesabu anazoruhusiwa kutumia, na ikiwa utekelezaji utaendelea zaidi, mabadiliko ya hesabu hurudi nyuma lakini ada bado inalipwa. Ujumbe hufanya kazi kwa njia ile ile. Ili kuonyesha sababu ya suluhisho letu, zingatia mifano ifuatayo:

- Mshambuliaji anaunda mkataba unaoendesha mizunguko isiyo na mwisho, na kisha anamtumia muamala wa kuanzisha mizunguko hiyo kwa mchimbaji. Mchimbaji atasindika muamala, anatekeleza mizunguko isiyo na mwisho, na kusubiri gesi itakapokamilika. Ingawa utekelezaji unakosa gesi na kusimama katikati, muamala bado ni halali na mchimbaji atapokea ada kutoka kwa mshambuliaji kwa kila hatua ya kihesabu.
- Mshambuliaji anaunda mizunguko ndefu isiyo na mwisho ili kulazimisha mchimbaji kuendelea kupanga kwa muda mrefu kiasi kwamba dakika zaidi za bloki zitatokea na haitakuwa na uwezo wa kupakia muamala kudai ada na mchimbaji hautawezekana. Hata hivyo, mshambuliaji atahitajika kuwasilisha thamani ya `STARTGAS` inayozuia idadi ya hatua za kikokotozi ambazo utekelezaji unaweza kuchukua, kwa hivyo mchimbaji atajua mapema kuwa ukokotoaji utachukua idadi kubwa sana ya hatua.
- Mshambuliaji anaona mkataba wenye msimbo wa aina fulani kama `send(A,contract.storage[A]); contract.storage[A] = 0`, na anatuma muamala wenye gesi ya kutosha kuendesha hatua ya kwanza lakini si ya pili (yaani, kutoa pesa lakini si kuruhusu salio kupungua). Mwandishi wa mkataba hahitaji kuwa na wasiwasi juu ya mashambulizi haya, kwa sababu ikiwa utekelezaji unasimama katikati, mabadiliko hurudi nyuma.
- Mkataba wa kifedha hufanya kazi kwa kuchukua kati ya ripoti tisa za bei ili kupunguza hatari. Mshambuliaji anachukua udhibiti wa moja kati ya ripoti hizo, ambazo zinaweza kubadilishwa kupitia mfumo wa anwani zinazoweza kubadilika kama ilivyoelezwa katika sehemu ya DAOs, na kuibadilisha kuendesha mzunguko usio na mwisho, kwa hivyo akijaribu kulazimisha maombi yote ya pesa mkataba wa kifedha utatumiwa hadi gesi itakapokamilika. Hata hivyo, mkataba wa kifedha unaweza kuweka kikomo cha gesi kwa ujumbe kuzuia shida hii.

Njia mbadala ya ukamilifu wa Turing ni kutokamilika kwa Turing, ambapo `JUMP` na `JUMPI` hazipo na nakala moja tu ya kila mkataba inaruhusiwa kuwepo kwenye rafu ya wito wakati wowote. Katika mfumo huu, mfumo wa ada uliotajwa na kutatanisha kuhusu ufanisi wa suluhisho letu ungeweza kutotakiwa, kwa kuwa gharama ya utekelezaji wa mkataba ingekuwa na kikomo juu kulingana na ukubwa wake. Zaidi ya hayo, ukamilifu si kikwazo kikubwa sana; kati ya mifano yote ya mikataba tuliyotengeneza ki-ndani, mpaka sasa mkataba mmoja tu umehitaji mzunguko, na hata mzunguko huo unaweza kuondolewa kwa kurudia mistari 26 ya msimbo wa mstari mmoja. Kwa athari za uzito za ukamilifu wa Turing na faida ndogo, kwa nini basi tusitumie lugha isiyo kamili ya Turing? Hata hivyo, kwa kweli, ukamilifu wa Turing hauwezi kuwa suluhisho zuri kwa tatizo hili. Ili kuona kwanini, tazama mikataba ifuatayo:

```sh
C0: call(C1); call(C1);
C1: call(C2); call(C2);
C2: call(C3); call(C3);
...
C49: call(C50); call(C50);
C50: (endesha hatua moja ya programu na rekodi mabadiliko kwenye hifadhi)
```

Sasa, tuma muamala kwa A. Kwa hivyo, katika miamala 51, tuna mkataba unaotumia hatua 2<sup>50</sup> za kihesabu. Wachimbaji wangejaribu kugundua mapema mizinga ya mantiki kama hiyo kwa kuweka thamani na kila mkataba, na kuhesabu hii kwa mikataba inayoita mikataba mingine kwa urudufu, lakini hii ingehitaji wachimbaji kuzuia mikataba inayoumba mikataba mingine (kwa sababu uundaji na utekelezaji wa mikataba 26 zilizo hapo juu ungeweza kuruhusiwa kuingizwa katika mkataba mmoja). Tatizo lingine ni kwamba uwanja wa anwani wa ujumbe ni wa kubadilika, kwa hivyo kwa ujumla haiwezekani kujua ni mikataba ipi mkataba fulani uta wasiliana nayo mapema. Kwa hiyo, kwa haya yote, tuna hitimisho la kushangaza: ukamilifu wa Turing ni rahisi kudhibiti, na ukosefu wake ni mgumu kudhibiti isipokuwa udhibiti huo huo uwepo - lakini katika hali hiyo, kwa nini tusiruhusu itifaki kuwa na ukamilifu wa Turing?

### Sarafu na Utoaji {#currency-and-issuance}

Mtandao wa Ethereum una sarafu yake ya ndani iliyojengwa, ether, ambayo inahudumu kwa madhumuni mawili ya kutoa tabaka kuu la ushawishi kuruhusu kubadilishana kwa ufanisi kati ya aina mbalimbali za mali za kidijitali na, muhimu zaidi, kutoa mfumo wa kulipa ada za miamala. Kwa urahisi na kuepuka mabishano ya baadaye (angalia mjadala wa sasa wa mBTC/uBTC/satoshi katika Bitcoin), vitengo vitakuwa vimeandikwa awali:

- 1: wei
- 10<sup>12</sup>: szabo
- 10<sup>15</sup>: finney
- 10<sup>18</sup>: ether

Hii inapaswa kuchukuliwa kama toleo lililoenea la dhana ya "dola" na "senti" au "BTC" na "satoshi". Katika siku za karibuni, tunatarajia "ether" itatumika kwa miamala ya kawaida, "finney" kwa miamala midogo sana, na "szabo" na "wei" kwa majadiliano ya kiufundi kuhusu ada na utekelezaji wa itifaki; vitengo vilivyo baki vinaweza kuwa na matumizi baadaye na hazipaswi kuingizwa katika wateja kwa sasa.

Muundo wa utoaji utakuwa kama ifuatavyo:

- Ether itatolewa katika mauzo ya sarafu kwa bei ya ether 1000-2000 kwa BTC, mfumo uliokusudiwa kufadhili shirika la Ethereum na kulipa maendeleo ambayo imetumika kwa mafanikio na majukwaa mengine kama Mastercoin na NXT. Wanunuzi wa awali watapata punguzo kubwa zaidi. BTC zitakazopokewa kutoka kwa mauzo zitakuwa kwa kila kitu kulipia mishahara na zawadi kwa watengenezaji na kuwekeza katika miradi mbalimbali ya faida na isiyo ya faida katika mfumo wa Ethereum na sarafu za kidijitali.
- 0.099x ya jumla ya kiasi kilichouzwa (60102216 ETH) itagawiwa kwa shirika kuwalipa wachangiaji wa mapema na kulipia gharama zilizo katika ETH kabla ya bloki ya mwanzo.
- 0.099x ya jumla ya kiasi kilichouzwa itahifadhiwa kama akiba ya muda mrefu.
- 0.26x ya jumla ya kiasi kilichouzwa itatolewa kwa wachimbaji kila mwaka milele kuanzia wakati huo.

| Kikundi                          | Wakati wa uzinduzi     | Baada ya mwaka 1       | Baada ya miaka 5       |
| -------------------------------- | ---------------------- | ---------------------- | ---------------------- |
| Vitengo vya sarafu               | 1.198X | 1.458X | 2.498X |
| Wanunuzi                         | 83.5%  | 68.6%  | 40.0%  |
| Akiba iliyotumika kabla ya mauzo | 8.26%  | 6.79%  | 3.96%  |
| Akiba iliyotumika baada ya mauzo | 8.26%  | 6.79%  | 3.96%  |
| Wachimbaji                       | 0%                     | 17.8%  | 52.0%  |

#### Kiwango cha ukuaji wa ugavi wa muda mrefu (asilimia)

![Mfumo wa bei wa Ethereum](./ethereum-inflation.png)

_Licha ya utoaji wa sarafu kwa mstari, kama Bitcoin kwa muda kiwango cha ukuaji wa ugavi huwa kinakaribia sifuri._

Chaguo mbili kuu katika muundo huu ni (1) uwepo na ukubwa wa hazina ya msaada, na (2) uwepo wa ugavi unaokua kwa mstari milele, tofauti na ugavi ulio na kikomo kama Bitcoin. Sababu ya kuwepo kwa hazina ya msaada ni kama ifuatavyo. Kama hazina hiyo haipo, na utoaji wa mstari ukapunguzwa kuwa 0.217x ili kutoa kiwango sawa cha mfumuko, basi kiasi cha ether kingekuwa pungufu kwa 16.5% na kila kitengo kingekuwa na thamani kubwa kwa 19.8%. Hivyo basi, kwa usawa, kungetolewa ether zaidi 19.8% kwa mauzo na kila kitengo kingerejea kuwa na thamani sawa kama awali. Shirika linaweza pia kuwa na BTC 1.198x, ambayo inaweza kugawanywa katika sehemu mbili: BTC za asili na ziada ya 0.198x. Kwa hivyo, hali hii ni _sawa kabisa_ na ruzuku, lakini kwa tofauti moja muhimu: shirika linashikilia BTC tu, na kwa hivyo halina motisha ya kusaidia thamani ya kitengo cha ether.

Muundo wa milele wa ukuaji wa ugavi wa mstari unaepuka hatari ya mkusanyiko mkubwa wa utajiri kama ilivyoona kwenye Bitcoin, na unawapa watu wa enzi za sasa na zijazo nafasi sawa ya kupata vitengo vya sarafu, huku pia ukihifadhi msukumo wa kuupata na kuushikilia ether kwa sababu "kiwango cha ukuaji wa ugavi" bado kinakaribia sifuri kwa muda. Pia tunatoa nadharia kwamba kwa sababu sarafu hupotea kila wakati kutokana na uzembe, kifo, n.k., na upotevu wa sarafu unaweza kuigwa kama asilimia ya jumla ya usambazaji kwa mwaka, kwamba jumla ya usambazaji wa sarafu katika mzunguko hatimaye itatulia kwa thamani sawa na utoaji wa kila mwaka ukigawanywa na kiwango cha upotevu (k.m., kwa kiwango cha upotevu cha 1%, mara tu usambazaji utakapofikia 26X basi 0.26X itachimbwa na 0.26X itapotea kila mwaka, na kuunda usawa).

Kumbuka kwamba baadaye, Ethereum ina uwezekano wa kubadili mfumo wake kuwa wa uthibitisho wa hisa (proof-of-stake) kwa usalama, kupunguza mahitaji ya utoaji kwenda kati ya sifuri na 0.05X kwa mwaka. Katika tukio ambalo shirika la Ethereum litapoteza ufadhili au kwa sababu nyingine yoyote litatoweka, tunaacha wazi "mkataba wa kijamii": mtu yeyote ana haki ya kuunda toleo la baadaye la Ethereum, na sharti pekee likiwa kwamba kiasi cha ether lazima kiwe sawa na `60102216 * (1.198 + 0.26 * n)` ambapo `n` ni idadi ya miaka baada ya bloku ya mwanzo. Watengenezaji inaweza kuuza kwa umma au kugawa tofauti kati ya upanuzi wa ugavi unaosababishwa na PoS na kiwango cha juu kinachoruhusiwa kulipia maendeleo. Maboresho yanayogombea ambayo hayazingatii mkataba wa kijamii yanaweza kwa haki kugawanywa kuwa matoleo yanayoendana.

### Ugatuaji wa Uchimbaji Madini {#mining-centralization}

Algorithimu ya uchimbaji ya Bitcoin inafanya kazi kwa kuwafanya wachimbaji kuhesabu SHA256 kwenye toleo lililobadilishwa la kichwa cha bloki mara kwa mara milioni nyingi, hadi nodi moja ipate toleo lenye hash ndogo kuliko lengo (sasa takriban 2<sup>192</sup>). Hata hivyo, algorithimu hii ina hatari mbili za kuwaridhisha watu wachache. Kwanza, mazingira ya uchimbaji yamedominika na ASICs (application-specific integrated circuits), chips za kompyuta zilizotengenezwa kwa kazi hiyo maalum ya uchimbaji Bitcoin na kwa hiyo ni mara elfu zaidi zenye ufanisi. Hii ina maana uchimbaji wa Bitcoin haupo tena kwa usambazaji mkubwa na usawa, na unahitaji mamilioni ya dola kushiriki ipasavyo. Pili, wachimbaji wengi wa Bitcoin hawafanyi ukaguzi wa bloki wenyewe; badala yake, wanategemea kundi la uchimbaji lililojikita kutoa vichwa vya bloki. Tatizo hili linaweza kuwa mbaya zaidi: sasa hivi makundi matatu makubwa ya uchimbaji yana udhibiti wa takriban 50% ya nguvu za kuheshaji mtandao wa Bitcoin, ingawa hii inapunguzwa kwa uwezekano wa wachimbaji kuhamia hazina za uchimbaji zingine ikiwa hazina au muungano unajaribu shambulio la 51%.

Madhumuni ya sasa katika Ethereum ni kutumia algorithimu ya uchimbaji ambapo wachimbaji wanatakiwa kupata data nasibu kutoka hali, kuhesabu baadhi ya miamala iliyochaguliwa nasibu kutoka kwa bloki N za mwisho kwenye blockchain, na kurudisha hash ya matokeo. Hii ina faida mbili muhimu. Kwanza, mikataba ya Ethereum inaweza kujumuisha aina yoyote ya ukokotoaji, kwa hivyo ASIC ya Ethereum kimsingi ingekuwa ASIC kwa ukokotoaji wa jumla - yaani, CPU bora zaidi. Pili, uchimbaji unahitaji ufikiaji wa blockchain nzima, na kulazimisha wachimbaji kuhifadhi blockchain nzima na angalau kuweza kuthibitisha kila muamala. Hii inaondoa hitaji la makundi ya uchimbaji ya kijumla; ingawa makundi haya bado yanaweza kuhudumu kama wasimamizi wa usawa wa usambazaji wa thawabu, kazi hii inaweza kufanywa sawa na makundi ya kawaida ya peer-to-peer bila udhibiti wa kati.

Muundo huu haujajaribiwa, na kunaweza kuwa na ugumu wa kuepuka mbinu za ujanja katika matumizi ya utekelezaji wa mikataba kama algorithimu ya uchimbaji. Hata hivyo, kipengele cha kuvutia cha algorithimu hii ni kwamba inaruhusu mtu yeyote "kuharibisha vyanzo vya data", kwa kuanzisha mikataba mingi kwenye blockchain iliyoundwa mahsusi kuzuia ASIC mbalimbali. Kuhamasisha kiuchumi kuna kuwepo kwa watengenezaji wa ASIC kutumia hekaya hii kushambuliana. Kwa hiyo, suluhisho tunalotengeneza ni la kiuchumi lenye kubadilika zaidi kuliko kiteknikali tu.

### Uwezo wa Kuongezeka {#scalability}

Wasiwasi wa kawaida kuhusu Ethereum ni suala la uwezo wa kuongezeka kwa huduma. Kama Bitcoin, Ethereum ina tatizo la kila muamala kuwa lazima usindikwe na nodi zote mtandaoni. Na Bitcoin basi ukubwa wa blockchain sasa uko takriban 15 GB na unaongezeka kwa MB 1 kila saa. Ikiwa mtandao wa Bitcoin uendeshwe kwa miamala 2000 kwa sekunde kama Visa, utakuwa ukubwa wa MB 1 kwa kila sekunde tatu (GB 1 kwa saa, TB 8 kwa mwaka). Ethereum pia itaathiriwa na ukuaji kama huo, uliyozidiwa na ukweli kwamba kutakuwa na matumizi mengi juu ya blockchain ya Ethereum badala ya sarafu tu kama Bitcoin, lakini upungufu ni kwamba nodi za Ethereum kamili zinaweza kuhifadhi hali pekee badala ya historia yote ya blockchain.

Tatizo la ukubwa mkubwa wa blockchain ni hatari ya kuwaridhisha watu wachache. Kama ukubwa wa blockchain ukaongezeka takriban 100 TB, basi dhana ya uwezekano ni kwamba biashara ndogo ndogo sana ndio zitaweza kuendesha nodi kamili, na watumiaji wa kawaida watatumia nodi za mwanga SPV. Katika hali kama hiyo, kuna uwezekano wa wasiwasi kwamba nodi kamili zinaweza kuungana na kukubaliana kudanganya kwa njia ya faida (k.m., kubadilisha zawadi ya kizuizi, kujipa BTC). Nodi za mwanga hazitakuwa na njia ya kugundua hilo mara moja. Hakika, angalau nodi moja halali itakuwapo, na baada ya masaa machache habari kuhusu udanganyifu itasambaa kupitia chaneli kama Reddit, lakini wakati huo itakuwa kuchelewa: itakuwa juu ya watumiaji wa kawaida kuandaa juhudi ya kuorodhesha bloki fulani hivyohivyo, changamoto kubwa sana ya ushirikiano sawa na shambulio la 51% la mafanikio. Katika kesi ya Bitcoin, hili ni tatizo kwa sasa, lakini kuna marekebisho ya mnyororo wa bloku [yaliyopendekezwa na Peter Todd](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/) ambayo yatapunguza suala hili.

Katika muda mfupi ujao, Ethereum itatumia mikakati miwili ya ziada kukabiliana na tatizo hili. Kwanza, kwa sababu ya algorithimu za uchimbaji zinazotegemea blockchain, wachimbaji wote watahitajika kuwa nodi kamili, na kuunda kikomo cha chini cha nodi kamili. Pili na muhimu zaidi, hata hivyo, tutajumuisha mzizi wa mti wa hali wa kati katika blockchain baada ya kusindika kila muamala. Hata kama ukaguzi wa block utakuwa wa makundi machache, mradi nodi moja halali ipo, tatizo la kuwaridhisha watu wachache linaweza kuepukwa kwa kutumia itifaki ya uthibitisho. Ikiwa mchimbaji atachapisha bloku batili, bloku hiyo lazima iwe na muundo mbaya, au hali `S[n]` si sahihi. Kwa kuwa `S[0]` inajulikana kuwa sahihi, lazima kuwe na hali ya kwanza `S[i]` isiyo sahihi ambapo `S[i-1]` ni sahihi. Nodi inayothibitisha itatoa faharasa `i`, pamoja na "uthibitisho wa ubatili" unaojumuisha sehemu ndogo ya nodi za mti wa Patricia zinazohitaji kuchakata `APPLY(S[i-1],TX[i]) -> S[i]`. Nodi zitaweza kutumia nodi hizo kuendesha sehemu hiyo ya ukokotoaji, na kuona kuwa `S[i]` iliyozalishwa hailingani na `S[i]` iliyotolewa.

Shambulio jingine, la hila zaidi, lingehusisha wachimbaji wabaya kutangaza blocks zisizokamilika, hivyo taarifa zote kamili haziwezi hata kupatikana kuamua kama blocks ni halali au la. Suluhisho ni itifaki ya changamoto-jibu: nodi zinazothibitisha hutoa "changamoto" katika fomu ya index za muamala, na wakati nodi nyingine inapokea, nodi nyepesi inachukulia bloki kama isiyo na kuaminika hadi nodi nyingine, iwe mchimbaji au mtathmini mwingine, atatoa subset ya nodi za Patricia kama ushahidi wa uhalali.

## Hitimisho {#conclusion}

Itifaki ya Ethereum ilianzishwa kama toleo lililotengenezwa la sarafu ya kidijitali, ikitoa sifa za hali ya juu kama escrow juu ya blockchain, mipaka ya uondoaji, mikataba ya kifedha, masoko ya kamari na mengine kupitia lugha ya programu iliyo na nguvu. Itifaki ya Ethereum haitegemei moja kwa moja matumizi yoyote, lakini uwepo wa lugha ya programu yenye ukamilifu wa Turing ina maana kwamba mikataba yoyote inaweza kuundwa kwa nadharia kwa aina yoyote ya muamala au matumizi. Kinachovutia zaidi kuhusu Ethereum ni kuwa itifaki ya Ethereum inazidi tu sarafu. Itifaki kuhusu uhifadhi wa faili ulio huru, hesabu zilizo huru, na masoko ya utabiri zilizo huru, miongoni mwa dhana nyingine nyingi, zina uwezo mkubwa wa kuongeza ufanisi wa sekta ya hesabu, na kutoa msukumo mkubwa kwa itifaki nyingine za peer-to-peer kwa kuongeza mara ya kwanza tabaka la kiuchumi. Mwisho, pia kuna idadi kubwa ya matumizi ambayo hayahusiani kabisa na fedha.

Dhana ya kazi ya mabadiliko ya hali kama ilivyoletwa na itifaki ya Ethereum inatoa jukwaa lenye uwezo wa kipekee; badala ya kuwa itifaki ya hifadhi-data, mkataba wenye malengo mahususi katika uhifadhi data, kamari, au fedha, Ethereum ni wazi kwa matumizi mengi tofauti, na tunaamini ni sahihi sana kuwa tabaka la msingi kwa idadi kubwa ya itifaki za kifedha na zisizo za kifedha miaka ijayo.

## Dondoo na Masomo Zaidi {#notes-and-further-reading}

### Dondoo {#notes}

1. Msomaji mwenye ujuzi anaweza kugundua kuwa anwani ya Bitcoin ni hash ya funguo za umma za elliptic curve, si funguo za umma wenyewe. Hata hivyo, ni halali kitaalamu kutumia istilahi ya kriptografia ya funguo za umma kwa maana ya hash ya funguo za umma. Hii ni kwa sababu usimbaji fiche wa Bitcoin unaweza kuzingatiwa kuwa algorithm ya sauti za kidijitali ya kawaida, ambapo funguo za umma ni hash ya funguo za ECC, saini ni funguo za ECC zilizounganishwa na saini ya ECC, na algorithimu ya uthibitisho ni kuangalia funguo za ECC zinavyolingana na hash zilizotolewa kama funguo za umma na kuthibitisha saini za ECC kwa funguo za ECC.
2. Kitaalamu, ukatikati wa bloki 11 za awali hutumika.
3. Kwa undani, 2 na "CHARLIE" ni nambari <sup>[fn3](#notes)</sup>, ambapo ya mwisho ni muundo wa big-endian base 256. Nambari zinaweza kuwa angalau 0 zaidi na angalau kiasi 2<sup>256</sup>-1.

### Masomo zaidi {#further-reading}

1. [Thamani ya Asili](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)
2. [Mali-erevu](https://en.bitcoin.it/wiki/Smart_Property)
3. [Mikataba-erevu](https://en.bitcoin.it/wiki/Contracts)
4. [B-money](http://www.weidai.com/bmoney.txt)
5. [Uthibitisho wa kazi unaoweza kutumika tena](https://nakamotoinstitute.org/finney/rpow/)
6. [Hati miliki salama za mali zenye mamlaka ya mmiliki](https://nakamotoinstitute.org/library/secure-property-titles/)
7. [Karatasi Nyeupe ya Bitcoin](http://bitcoin.org/bitcoin.pdf)
8. [Namecoin](https://namecoin.org/)
9. [Pembetatu ya Zooko](https://wikipedia.org/wiki/Zooko's_triangle)
10. [Karatasi Nyeupe ya Sarafu za Rangi](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)
11. [Karatasi Nyeupe ya Mastercoin](https://github.com/mastercoin-MSC/spec)
12. [Mashirika huru ya kiotomatiki, Jarida la Bitcoin](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)
13. [Uthibitishaji uliorahisishwa wa malipo](https://en.bitcoin.it/wiki/Scalability#Simplified_payment_verification)
14. [Miti ya Merkle](https://wikipedia.org/wiki/Merkle_tree)
15. [Miti ya Patricia](https://wikipedia.org/wiki/Patricia_tree)
16. [GHOST](https://eprint.iacr.org/2013/881.pdf)
17. [StorJ na Mawakala Wanaojitegemea, Jeff Garzik](http://garzikrants.blogspot.ca/2013/01/storj-and-bitcoin-autonomous-agents.html)
18. [Mike Hearn kuhusu Mali-erevu kwenye Tamasha la Turing](https://www.youtube.com/watch?v=MVyv4t0OKe4)
19. [RLP ya Ethereum](/developers/docs/data-structures-and-encoding/rlp/)
20. [Miti ya Merkle Patricia ya Ethereum](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/)
21. [Peter Todd kuhusu miti ya jumla ya Merkle](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/)

_Kwa historia ya karatasi nyeupe, angalia [wiki hii](https://web.archive.org/web/20250427212319/https://github.com/ethereum/wiki/blob/old-before-deleting-all-files-go-to-wiki-wiki-instead/old-whitepaper-for-historical-reference.md)._

_Ethereum, kama miradi mingi ya programu za chanzo huria zinazosimamiwa na jamii, imeendelea tangu ilipoanzishwa. Ili kujifunza kuhusu maendeleo ya hivi karibuni ya Ethereum, na jinsi mabadiliko kwenye itifaki yanavyofanywa, tunapendekeza [mwongozo huu](/learn/)._
