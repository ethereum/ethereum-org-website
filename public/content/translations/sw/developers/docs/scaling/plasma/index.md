---
title: Minyororo ya Plasma
description: Utangulizi wa minyororo ya Plasma kama suluhisho la kuongeza uwezo linalotumiwa kwa sasa na jamii ya Ethereum.
lang: sw
incomplete: true
sidebarDepth: 3
---

Mnyororo wa Plasma ni mnyororo wa vitalu tofauti uliounganishwa kwenye Mtandao Mkuu wa [Ethereum](/) lakini unatekeleza miamala nje ya mnyororo ukiwa na utaratibu wake wenyewe wa uthibitishaji wa kitalu. Minyororo ya Plasma wakati mwingine hujulikana kama minyororo "mtoto", kimsingi ni nakala ndogo za Mtandao Mkuu wa Ethereum. Minyororo ya Plasma hutumia [uthibitisho wa udanganyifu](/glossary/#fraud-proof) (kama [mikusanyiko yenye matumaini](/developers/docs/scaling/optimistic-rollups/)) kusuluhisha mizozo.

Miti ya Merkle huwezesha uundaji wa mrundikano usio na mwisho wa minyororo hii ambayo inaweza kufanya kazi ili kupunguza mzigo wa kipimo data kutoka kwa minyororo mzazi (ikiwa ni pamoja na Mtandao Mkuu wa Ethereum). Hata hivyo, ingawa minyororo hii hupata usalama fulani kutoka kwa Ethereum (kupitia uthibitisho wa udanganyifu), usalama na ufanisi wake huathiriwa na mapungufu kadhaa ya muundo.

## Mahitaji ya Awali {#prerequisites}

Unapaswa kuwa na uelewa mzuri wa mada zote za msingi na uelewa wa kiwango cha juu wa [kuongeza uwezo wa Ethereum](/developers/docs/scaling/).

## Plasma ni nini? {#what-is-plasma}

Plasma ni mfumo wa kuboresha uwezo wa kuongezeka katika minyororo ya vitalu ya umma kama Ethereum. Kama ilivyoelezwa katika [waraka mweupe wa Plasma](https://plasma.io/plasma.pdf) wa asili, minyororo ya Plasma hujengwa juu ya mnyororo wa vitalu mwingine (unaoitwa "mnyororo mzizi"). Kila "mnyororo mtoto" hutoka kwenye mnyororo mzizi na kwa ujumla husimamiwa na mkataba mahiri uliowekwa kwenye mnyororo mzazi.

Mkataba wa Plasma hufanya kazi, pamoja na mambo mengine, kama [daraja](/developers/docs/bridges/) linaloruhusu watumiaji kuhamisha rasilimali kati ya Mtandao Mkuu wa Ethereum na mnyororo wa Plasma. Ingawa hii inawafanya wafanane na [minyororo ya kando](/developers/docs/scaling/sidechains/), minyororo ya Plasma hunufaika—angalau, kwa kiasi fulani—kutokana na usalama wa Mtandao Mkuu wa Ethereum. Hii ni tofauti na minyororo ya kando ambayo inawajibika pekee kwa usalama wao.

## Plasma inafanyaje kazi? {#how-does-plasma-work}

Vipengele vya msingi vya mfumo wa Plasma ni:

### Ukokotoaji wa nje ya mnyororo {#offchain-computation}

Kasi ya sasa ya uchakataji ya Ethereum imepunguzwa hadi miamala ~ 15-20 kwa sekunde, na kupunguza uwezekano wa muda mfupi wa kuongeza uwezo ili kushughulikia watumiaji zaidi. Tatizo hili lipo hasa kwa sababu [utaratibu wa makubaliano](/developers/docs/consensus-mechanisms/) wa Ethereum unahitaji nodi nyingi za rika-kwa-rika kuthibitisha kila sasisho kwenye hali ya mnyororo wa vitalu.

Ingawa utaratibu wa makubaliano wa Ethereum ni muhimu kwa usalama, huenda usitumike kwa kila hali ya matumizi. Kwa mfano, Alice huenda asihitaji malipo yake ya kila siku kwa Bob kwa kikombe cha kahawa kuthibitishwa na mtandao mzima wa Ethereum kwa kuwa kuna uaminifu fulani kati ya pande zote mbili.

Plasma inachukulia kwamba Mtandao Mkuu wa Ethereum hauhitaji kuthibitisha miamala yote. Badala yake, tunaweza kuchakata miamala nje ya Mtandao Mkuu, na kuweka huru nodi kutokana na kulazimika kuthibitisha kila muamala.

Ukokotoaji wa nje ya mnyororo ni muhimu kwa kuwa minyororo ya Plasma inaweza kuboresha kasi na gharama. Kwa mfano, mnyororo wa Plasma unaweza—na mara nyingi hufanya hivyo—kutumia "mwendeshaji" mmoja kusimamia upangaji na utekelezaji wa miamala. Kukiwa na chombo kimoja tu kinachothibitisha miamala, nyakati za uchakataji kwenye mnyororo wa Plasma ni za haraka zaidi kuliko Mtandao Mkuu wa Ethereum.

### Ufungamanisho wa hali {#state-commitments}

Ingawa Plasma inatekeleza miamala nje ya mnyororo, inatatuliwa kwenye tabaka kuu la utekelezaji la Ethereum—vinginevyo, minyororo ya Plasma haiwezi kunufaika na dhamana za usalama za Ethereum. Lakini kukamilisha miamala ya nje ya mnyororo bila kujua hali ya mnyororo wa Plasma kungevunja muundo wa usalama na kuruhusu kuenea kwa miamala batili. Hii ndiyo sababu mwendeshaji, chombo kinachohusika na kuzalisha vitalu kwenye mnyororo wa Plasma, anahitajika kuchapisha "ufungamanisho wa hali" kwenye Ethereum mara kwa mara.

[Mpango wa ufungamanisho](https://en.wikipedia.org/wiki/Commitment_scheme) ni mbinu ya kificho kwa ajili ya kufungamanisha thamani au taarifa bila kuifichua kwa upande mwingine. Ufungamanisho "unabana" kwa maana kwamba huwezi kubadilisha thamani au taarifa mara tu unapojifunga kwayo. Ufungamanisho wa hali katika Plasma huchukua muundo wa "mizizi ya Merkle" (inayotokana na [mti wa Merkle](/whitepaper/#merkle-trees)) ambayo mwendeshaji hutuma kwa vipindi kwenye mkataba wa Plasma kwenye mnyororo wa Ethereum.

Mizizi ya Merkle ni misingi ya kificho inayowezesha kubana kiasi kikubwa cha taarifa. Mzizi wa Merkle (pia unaitwa "mzizi wa kitalu" katika kesi hii) unaweza kuwakilisha miamala yote katika kitalu. Mizizi ya Merkle pia hurahisisha kuthibitisha kwamba kipande kidogo cha data ni sehemu ya seti kubwa ya data. Kwa mfano, mtumiaji anaweza kutoa [ushahidi wa Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/#main-content) ili kuthibitisha kujumuishwa kwa muamala katika kitalu maalum.

Mizizi ya Merkle ni muhimu kwa kutoa taarifa kuhusu hali ya nje ya mnyororo kwa Ethereum. Unaweza kufikiria mizizi ya Merkle kama "pointi za kuhifadhi": mwendeshaji anasema, "Hii ndiyo hali ya mnyororo wa Plasma katika hatua x ya wakati, na huu ndio mzizi wa Merkle kama uthibitisho." Mwendeshaji anafungamanisha _hali ya sasa_ ya mnyororo wa Plasma na mzizi wa Merkle, ndiyo maana inaitwa "ufungamanisho wa hali".

### Kuingia na kujitoa {#entries-and-exits}

Ili watumiaji wa Ethereum wanufaike na Plasma, kunahitaji kuwa na utaratibu wa kuhamisha fedha kati ya Mtandao Mkuu na minyororo ya Plasma. Hatuwezi kutuma Etha kiholela kwa anwani kwenye mnyororo wa Plasma, ingawa—minyororo hii haiendani, kwa hivyo muamala unaweza kushindwa au kusababisha kupotea kwa fedha.

Plasma hutumia mkataba mkuu unaoendeshwa kwenye Ethereum kuchakata uingiaji na kujitoa kwa watumiaji. Mkataba huu mkuu pia unawajibika kufuatilia ufungamanisho wa hali (ulioelezwa hapo awali) na kuadhibu tabia isiyo ya uaminifu kupitia uthibitisho wa udanganyifu (zaidi kuhusu hili baadaye).

#### Kuingia kwenye mnyororo wa Plasma {#entering-the-plasma-chain}

Ili kuingia kwenye mnyororo wa Plasma, Alice (mtumiaji) atalazimika kuweka ETH au tokeni yoyote ya ERC-20 katika mkataba wa Plasma. Mwendeshaji wa Plasma, ambaye hutazama amana za mkataba, huunda upya kiasi sawa na amana ya awali ya Alice na kukiachilia kwenye anwani yake kwenye mnyororo wa Plasma. Alice anahitajika kuthibitisha kupokea fedha kwenye mnyororo mtoto na kisha anaweza kutumia fedha hizi kwa miamala.

#### Kujitoa kwenye mnyororo wa Plasma

Kujitoa kwenye mnyororo wa Plasma ni kugumu zaidi kuliko kuingia kwa sababu kadhaa. Kubwa zaidi ni kwamba, ingawa Ethereum ina taarifa kuhusu hali ya mnyororo wa Plasma, haiwezi kuthibitisha ikiwa taarifa hiyo ni ya kweli au la. Mtumiaji mwenye nia mbaya anaweza kutoa madai yasiyo sahihi ("Nina ETH 1000") na kufanikiwa kwa kutoa uthibitisho feki ili kuunga mkono dai hilo.

Ili kuzuia utoaji wenye nia mbaya, "kipindi cha changamoto" kinaletwa. Wakati wa kipindi cha changamoto (kawaida wiki moja), mtu yeyote anaweza kupinga ombi la utoaji akitumia uthibitisho wa udanganyifu. Ikiwa changamoto itafaulu, basi ombi la utoaji linakataliwa.

Hata hivyo, kwa kawaida watumiaji ni waaminifu na hutoa madai sahihi kuhusu fedha wanazomiliki. Katika hali hii, Alice ataanzisha ombi la utoaji kwenye mnyororo mzizi (Ethereum) kwa kuwasilisha muamala kwenye mkataba wa Plasma.

Lazima pia atoe ushahidi wa Merkle unaothibitisha kwamba muamala uliounda fedha zake kwenye mnyororo wa Plasma ulijumuishwa katika kitalu. Hili ni muhimu kwa matoleo ya Plasma, kama vile Plasma MVP, yanayotumia muundo wa [Pato la Muamala Ambalo Halijatumika (UTXO)](https://en.wikipedia.org/wiki/Unspent_transaction_output).

Nyingine, kama Plasma Cash, huwakilisha fedha kama [tokeni zisizoweza kubadilishana](/developers/docs/standards/tokens/erc-721/) badala ya UTXO. Kutoa, katika kesi hii, kunahitaji uthibitisho wa umiliki wa tokeni kwenye mnyororo wa Plasma. Hili hufanywa kwa kuwasilisha miamala miwili ya hivi punde inayohusisha tokeni na kutoa ushahidi wa Merkle unaothibitisha kujumuishwa kwa miamala hiyo katika kitalu.

Mtumiaji lazima pia aongeze dhamana kwenye ombi la utoaji kama hakikisho la tabia ya uaminifu. Ikiwa mpinzani atathibitisha kuwa ombi la utoaji la Alice ni batili, dhamana yake inakatwa, na kiasi fulani huenda kwa mpinzani kama tuzo.

Ikiwa kipindi cha changamoto kitapita bila mtu yeyote kutoa uthibitisho wa udanganyifu, ombi la utoaji la Alice linachukuliwa kuwa halali, na kumruhusu kuchukua amana kutoka kwenye mkataba wa Plasma kwenye Ethereum.
### Usuluhishi wa mizozo {#dispute-arbitration}

Kama mnyororo wa vitalu wowote, minyororo ya Plasma inahitaji utaratibu wa kutekeleza uadilifu wa miamala endapo washiriki watatenda kwa nia mbaya (k.m., matumizi mara mbili ya fedha). Kwa lengo hili, minyororo ya Plasma hutumia uthibitisho wa udanganyifu kusuluhisha mizozo inayohusu uhalali wa mabadiliko ya hali na kuadhibu tabia mbaya. Uthibitisho wa udanganyifu hutumiwa kama utaratibu ambao mnyororo mtoto wa Plasma huwasilisha malalamiko kwa mnyororo wake mzazi au kwa mnyororo mzizi.

Uthibitisho wa udanganyifu ni dai tu kwamba mabadiliko fulani ya hali ni batili. Mfano ni ikiwa mtumiaji (Alice) anajaribu kutumia fedha zilezile mara mbili. Labda alitumia UTXO katika muamala na Bob na anataka kutumia UTXO hiyohiyo (ambayo sasa ni ya Bob) katika muamala mwingine.

Ili kuzuia utoaji, Bob ataunda uthibitisho wa udanganyifu kwa kutoa ushahidi wa Alice kutumia UTXO iliyotajwa katika muamala uliopita na ushahidi wa Merkle wa kujumuishwa kwa muamala katika kitalu. Mchakato huohuo hufanya kazi katika Plasma Cash—Bob angehitaji kutoa uthibitisho kwamba Alice alihamisha mapema tokeni anazojaribu kutoa.

Ikiwa changamoto ya Bob itafaulu, ombi la utoaji la Alice linafutwa. Hata hivyo, mbinu hii inategemea uwezo wa Bob wa kutazama mnyororo kwa maombi ya utoaji. Ikiwa Bob hayuko mtandaoni, basi Alice anaweza kuchakata utoaji wenye nia mbaya mara tu kipindi cha changamoto kinapopita.

## Tatizo la kujitoa kwa wingi katika Plasma {#the-mass-exit-problem-in-plasma}

Tatizo la kujitoa kwa wingi hutokea wakati idadi kubwa ya watumiaji wanapojaribu kutoa kutoka kwenye mnyororo wa Plasma kwa wakati mmoja. Kwa nini tatizo hili lipo linahusiana na mojawapo ya matatizo makubwa ya Plasma: **kutopatikana kwa data**.

Upatikanaji wa data ni uwezo wa kuthibitisha kwamba taarifa ya kitalu kilichopendekezwa ilichapishwa kweli kwenye mtandao wa mnyororo wa vitalu. Kitalu "hakipatikani" ikiwa mzalishaji anachapisha kitalu chenyewe lakini anazuia data iliyotumika kuunda kitalu.

Vitalu lazima vipatikane ikiwa nodi zitaweza kupakua kitalu na kuthibitisha uhalali wa miamala. Minyororo ya vitalu huhakikisha upatikanaji wa data kwa kulazimisha wazalishaji wa vitalu kuchapisha data yote ya muamala mnyororoni.

Upatikanaji wa data pia husaidia katika kulinda itifaki za kuongeza uwezo za nje ya mnyororo zinazojengwa kwenye tabaka la msingi la Ethereum. Kwa kulazimisha waendeshaji kwenye minyororo hii kuchapisha data ya muamala kwenye Ethereum, mtu yeyote anaweza kupinga vitalu batili kwa kuunda uthibitisho wa udanganyifu unaorejelea hali sahihi ya mnyororo.

Minyororo ya Plasma kimsingi huhifadhi data ya muamala kwa mwendeshaji na **haichapishi data yoyote kwenye Mtandao Mkuu** (yaani, kando na ufungamanisho wa hali wa mara kwa mara). Hii inamaanisha watumiaji lazima wamtegemee mwendeshaji kutoa data ya kitalu ikiwa wanahitaji kuunda uthibitisho wa udanganyifu unaopinga miamala batili. Ikiwa mfumo huu unafanya kazi, basi watumiaji wanaweza kutumia uthibitisho wa udanganyifu kila wakati kulinda fedha.

Tatizo huanza wakati mwendeshaji, sio tu mtumiaji yeyote, ndiye upande unaotenda kwa nia mbaya. Kwa sababu mwendeshaji ana udhibiti pekee wa mnyororo wa vitalu, wana motisha zaidi ya kuendeleza mabadiliko ya hali batili kwa kiwango kikubwa, kama vile kuiba fedha za watumiaji kwenye mnyororo wa Plasma.

Katika kesi hii, kutumia mfumo wa kawaida wa uthibitisho wa udanganyifu hakufanyi kazi. Mwendeshaji anaweza kufanya muamala batili kwa urahisi akihamisha fedha za Alice na Bob kwenye mkoba wao na kuficha data muhimu kwa kuunda uthibitisho wa udanganyifu. Hili linawezekana kwa sababu mwendeshaji hahitajiki kufanya data ipatikane kwa watumiaji au Mtandao Mkuu.

Kwa hivyo, suluhisho lenye matumaini zaidi ni kujaribu "kujitoa kwa wingi" kwa watumiaji kutoka kwenye mnyororo wa Plasma. Kujitoa kwa wingi hupunguza kasi ya mpango wa mwendeshaji mwenye nia mbaya wa kuiba fedha na hutoa kiwango fulani cha ulinzi kwa watumiaji. Maombi ya utoaji hupangwa kulingana na wakati kila UTXO (au tokeni) iliundwa, na kuzuia waendeshaji wenye nia mbaya kufanya utangulizaji muamala dhidi ya watumiaji waaminifu.

Hata hivyo, bado tunahitaji njia ya kuthibitisha uhalali wa maombi ya utoaji wakati wa kujitoa kwa wingi—ili kuzuia watu wenye fursa kufaidika na machafuko kwa kuchakata kujitoa batili. Suluhisho ni rahisi: hitaji watumiaji kuchapisha **hali halali ya mwisho ya mnyororo** ili kutoa pesa zao.

Lakini mbinu hii bado ina matatizo. Kwa mfano, ikiwa watumiaji wote kwenye mnyororo wa Plasma wanahitaji kujitoa (ambayo inawezekana katika kesi ya mwendeshaji mwenye nia mbaya), basi hali nzima halali ya mnyororo wa Plasma lazima itupwe kwenye tabaka la msingi la Ethereum kwa wakati mmoja. Kwa ukubwa wa kiholela wa minyororo ya Plasma (uwezo wa upitishaji wa juu = data zaidi) na vikwazo kwenye kasi ya uchakataji ya Ethereum, hili si suluhisho bora.

Ingawa michezo ya kujitoa inasikika vizuri kinadharia, kujitoa kwa wingi katika maisha halisi kuna uwezekano wa kusababisha msongamano wa mtandao mzima kwenye Ethereum yenyewe. Kando na kudhuru utendaji wa Ethereum, kujitoa kwa wingi kusikoratibiwa vizuri kunamaanisha kwamba watumiaji wanaweza kushindwa kutoa fedha kabla ya mwendeshaji kukausha kila akaunti kwenye mnyororo wa Plasma.

## Faida na hasara za Plasma {#pros-and-cons-of-plasma}

| Faida                                                                                                                                                                                                                            | Hasara                                                                                                                                                                       |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Inatoa uwezo wa upitishaji wa juu na gharama nafuu kwa kila muamala.                                                                                                                                                                             | Haitumii ukokotoaji wa jumla (haiwezi kuendesha mikataba mahiri). Uhamishaji wa kimsingi wa tokeni, ubadilishaji, na aina chache tu za miamala ndizo zinazotumika kupitia mantiki ya kiarifu.    |
| Nzuri kwa miamala kati ya watumiaji wa kiholela (hakuna gharama ya ziada kwa kila jozi ya watumiaji ikiwa wote wameanzishwa kwenye mnyororo wa Plasma)                                                                                                            | Haja ya kutazama mtandao mara kwa mara (sharti la uhai) au kukaimisha jukumu hili kwa mtu mwingine ili kuhakikisha usalama wa fedha zako.                          |
| Minyororo ya Plasma inaweza kubadilishwa kwa hali maalum za matumizi ambazo hazihusiani na mnyororo mkuu. Mtu yeyote, ikiwa ni pamoja na biashara, anaweza kubinafsisha mikataba mahiri ya Plasma ili kutoa miundombinu inayoweza kuongezwa uwezo inayofanya kazi katika miktadha tofauti. | Inategemea mwendeshaji mmoja au zaidi kuhifadhi data na kuitumikia inapoombwa.                                                                                                     |
| Hupunguza mzigo kwenye Mtandao Mkuu wa Ethereum kwa kuhamisha ukokotoaji na uhifadhi nje ya mnyororo.                                                                                                                                                    | Utoaji hucheleweshwa kwa siku kadhaa ili kuruhusu changamoto. Kwa rasilimali zinazoweza kubadilishana, hii inaweza kupunguzwa na watoa huduma wa ukwasi, lakini kuna gharama ya mtaji inayohusishwa. |
|                                                                                                                                                                                                                                  | Ikiwa watumiaji wengi sana watajaribu kujitoa kwa wakati mmoja, Mtandao Mkuu wa Ethereum unaweza kupata msongamano.                                                                                          |

## Plasma dhidi ya itifaki za kuongeza uwezo za tabaka la 2 {#plasma-vs-layer-2}

Ingawa Plasma iliwahi kuchukuliwa kuwa suluhisho muhimu la kuongeza uwezo kwa Ethereum, tangu wakati huo imeachwa kwa ajili ya [itifaki za kuongeza uwezo za tabaka la 2 (l2)](/layer-2/). Suluhu za kuongeza uwezo za l2 hutatua matatizo kadhaa ya Plasma:

### Ufanisi {#efficiency}

[Mikusanyiko ya sifuri-maarifa](/developers/docs/scaling/zk-rollups) huzalisha uthibitisho wa kificho wa uhalali wa kila kundi la miamala inayochakatwa nje ya mnyororo. Hii inazuia watumiaji (na waendeshaji) kuendeleza mabadiliko ya hali batili, na kuondoa hitaji la vipindi vya changamoto na michezo ya kujitoa. Pia inamaanisha watumiaji hawapaswi kutazama mnyororo mara kwa mara ili kulinda fedha zao.

### Usaidizi kwa mikataba mahiri {#support-for-smart-contracts}

Tatizo jingine na mfumo wa Plasma lilikuwa [kutoweza kusaidia utekelezaji wa mikataba mahiri ya Ethereum](https://ethresear.ch/t/why-smart-contracts-are-not-feasible-on-plasma/2598/4). Kama matokeo, utekelezaji mwingi wa Plasma ulijengwa zaidi kwa malipo rahisi au ubadilishanaji wa tokeni za ERC-20.

Kinyume chake, mikusanyiko yenye matumaini, inaendana na [Mashine Pepe ya Ethereum](/developers/docs/evm/) na inaweza kuendesha [mikataba mahiri](/developers/docs/smart-contracts/) asili ya Ethereum, na kuifanya kuwa suluhisho muhimu na _salama_ kwa kuongeza uwezo wa [programu tumizi zilizogatuliwa](/developers/docs/dapps/). Vile vile, mipango inaendelea ya [kuunda utekelezaji wa sifuri-maarifa wa EVM (zkEVM)](https://ethresear.ch/t/a-zk-evm-specification/11549) ambao ungeruhusu mikusanyiko ya ZK kuchakata mantiki ya kiholela na kutekeleza mikataba mahiri.

### Kutopatikana kwa data {#data-unavailability}

Kama ilivyoelezwa hapo awali, Plasma inakabiliwa na tatizo la upatikanaji wa data. Ikiwa mwendeshaji mwenye nia mbaya angeendeleza mabadiliko batili kwenye mnyororo wa Plasma, watumiaji wangeshindwa kuyapinga kwa kuwa mwendeshaji anaweza kuzuia data inayohitajika kuunda uthibitisho wa udanganyifu. Mikusanyiko hutatua tatizo hili kwa kulazimisha waendeshaji kuchapisha data ya muamala kwenye Ethereum, na kuruhusu mtu yeyote kuthibitisha hali ya mnyororo na kuunda uthibitisho wa udanganyifu ikiwa ni lazima.

### Tatizo la kujitoa kwa wingi {#mass-exit-problem}

Mikusanyiko ya ZK na mikusanyiko yenye matumaini yote hutatua tatizo la kujitoa kwa wingi la Plasma kwa njia mbalimbali. Kwa mfano, mkusanyiko wa ZK unategemea taratibu za kificho zinazohakikisha waendeshaji hawawezi kuiba fedha za watumiaji chini ya hali yoyote.

Vile vile, mikusanyiko yenye matumaini huweka kipindi cha kuchelewa kwenye utoaji ambapo mtu yeyote anaweza kuanzisha changamoto na kuzuia maombi ya utoaji yenye nia mbaya. Ingawa hii inafanana na Plasma, tofauti ni kwamba wathibitishaji wana ufikiaji wa data inayohitajika kuunda uthibitisho wa udanganyifu. Kwa hivyo, hakuna haja kwa watumiaji wa mkusanyiko kushiriki katika uhamiaji wa haraka, wa "kwanza-kutoka" kwenye Mtandao Mkuu wa Ethereum.

## Plasma inatofautianaje na minyororo ya kando na sharding? {#plasma-sidechains-sharding}

Plasma, minyororo ya kando, na sharding zinafanana kwa kiasi fulani kwa sababu zote zinaunganishwa kwenye Mtandao Mkuu wa Ethereum kwa njia fulani. Hata hivyo, kiwango na nguvu ya miunganisho hii inatofautiana, ambayo huathiri sifa za usalama za kila suluhisho la kuongeza uwezo.

### Plasma dhidi ya minyororo ya kando {#plasma-vs-sidechains}

[Mnyororo wa kando](/developers/docs/scaling/sidechains/) ni mnyororo wa vitalu unaoendeshwa kwa kujitegemea uliounganishwa kwenye Mtandao Mkuu wa Ethereum kupitia daraja la njia mbili. [Madaraja](/bridges/) huruhusu watumiaji kubadilishana tokeni kati ya minyororo ya vitalu miwili ili kufanya miamala kwenye mnyororo wa kando, na kupunguza msongamano kwenye Mtandao Mkuu wa Ethereum na kuboresha uwezo wa kuongezeka.
Minyororo ya kando hutumia utaratibu tofauti wa makubaliano na kwa kawaida ni midogo sana kuliko Mtandao Mkuu wa Ethereum. Kama matokeo, kuvusha rasilimali kwenye minyororo hii kunahusisha hatari iliyoongezeka; kutokana na ukosefu wa dhamana za usalama zilizorithiwa kutoka kwa Mtandao Mkuu wa Ethereum katika muundo wa mnyororo wa kando, watumiaji wako katika hatari ya kupoteza fedha katika shambulio kwenye mnyororo wa kando.

Kinyume chake, minyororo ya Plasma hupata usalama wao kutoka kwa Mtandao Mkuu. Hii inawafanya kuwa salama zaidi kuliko minyororo ya kando. Minyororo ya kando na minyororo ya Plasma inaweza kuwa na itifaki tofauti za makubaliano, lakini tofauti ni kwamba minyororo ya Plasma huchapisha mizizi ya Merkle kwa kila kitalu kwenye Mtandao Mkuu wa Ethereum. Mizizi ya kitalu ni vipande vidogo vya taarifa tunavyoweza kutumia kuthibitisha taarifa kuhusu miamala inayofanyika kwenye mnyororo wa Plasma. Ikiwa shambulio litatokea kwenye mnyororo wa Plasma, watumiaji wanaweza kutoa fedha zao kwa usalama kurudi kwenye Mtandao Mkuu wakitumia uthibitisho unaofaa.

### Plasma dhidi ya sharding {#plasma-vs-sharding}

Minyororo ya Plasma na minyororo ya shadi huchapisha uthibitisho wa kificho mara kwa mara kwenye Mtandao Mkuu wa Ethereum. Hata hivyo, zote zina sifa tofauti za usalama.

Minyororo ya shadi hufungamanisha "vijajuu vya mkusanyo" kwenye Mtandao Mkuu vyenye taarifa za kina kuhusu kila shadi ya data. Nodi kwenye Mtandao Mkuu huthibitisha na kutekeleza uhalali wa shadi za data, na kupunguza uwezekano wa mabadiliko batili ya shadi na kulinda mtandao dhidi ya shughuli mbaya.

Plasma ni tofauti kwa sababu Mtandao Mkuu hupokea tu taarifa ndogo kuhusu hali ya minyororo mtoto. Hii inamaanisha Mtandao Mkuu hauwezi kuthibitisha kwa ufanisi miamala inayofanywa kwenye minyororo mtoto, na kuifanya iwe salama kidogo.

**Kumbuka** kwamba kufanya sharding kwenye mnyororo wa vitalu wa Ethereum hakupo tena kwenye ramani ya njia. Kumechukuliwa nafasi na kuongeza uwezo kupitia mikusanyiko na [danksharding](/roadmap/danksharding).

### Tumia Plasma {#use-plasma}

Miradi mingi hutoa utekelezaji wa Plasma ambao unaweza kuunganisha kwenye programu tumizi zilizogatuliwa (dapp) zako:

- [Polygon](https://polygon.technology/) (zamani Matic Network)

## Usomaji zaidi

- [Kikumbusho cha haraka cha maana ya "usalama wa pamoja" na kwa nini ni muhimu sana](https://old.reddit.com/r/ethereum/comments/sgd3zt/a_quick_reminder_of_what_shared_security_means/)
- [Minyororo ya kando dhidi ya Plasma dhidi ya Sharding](https://vitalik.eth.limo/general/2019/06/12/plasma_vs_sharding.html)
- [Kuelewa Plasma, Sehemu ya 1: Mambo ya Msingi](https://www.theblockcrypto.com/amp/post/10793/understanding-plasma-part-1-the-basics)
- [Maisha na Kifo cha Plasma](https://medium.com/dragonfly-research/the-life-and-death-of-plasma-b72c6a59c5ad#)

_Je, unajua nyenzo ya jamii iliyokusaidia? Hariri ukurasa huu na uiongeze!_
## Mafunzo: Minyororo ya Plasma kwenye Ethereum {#tutorials}

- [Andika plasma maalum kwa programu inayohifadhi faragha](/developers/tutorials/app-plasma/) _– Jenga programu ya plasma inayohifadhi faragha ukitumia uthibitisho wa maarifa-sifuri na vipengele vya nje ya mnyororo._
