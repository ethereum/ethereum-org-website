---
title: Minyororo ya njozi
description: Utangulizi wa minyororo ya njozi kama suluhisho la uongezwaji linalotumiwa sasa na jumuiya ya Ethereum.
lang: sw
incomplete: true
sidebarDepth: 3
---

Mnyororo wa Njozi ni mnyororo wa bloku tofauti unaofungwa kwenye Mtandao Mkuu wa Ethereum lakini hufanya miamala offchain kwa utaratibu wake wa uthibitishaji wa bloku. Minyororo ya njozi wakati mwingine hujulikana kama minyororo ya "mtoto", kimsingi nakala ndogo za Mtandao Mkuu wa Ethereum. Minyororo ya njozi hutumia [ushahidi wa ulaghai](/glossary/#fraud-proof) (kama [optimistic rollups](/developers/docs/scaling/optimistic-rollups/)) kusuluhisha mizozo.

Miti ya Merkle huwezesha uundaji wa rundo lisilo na mwisho la minyororo hii ambayo inaweza kufanya kazi ili kupunguza kipimo data kutoka kwa minyororo ya wazazi (ikiwa ni pamoja na Mtandao Mkuu wa Ethereum). Hata hivyo, ingawa minyororo hii hupata usalama kutoka kwa Ethereum (kupitia ushahidi wa ulaghai), usalama na ufanisi wao huathiriwa na mapungufu kadhaa ya kimuundo.

## Mahitaji ya awali {#prerequisites}

Unapaswa kuwa na ufahamu mzuri wa mada zote za msingi na uelewa wa hali ya juu wa [uongezwaji wa Ethereum](/developers/docs/scaling/).

## Njozi ni nini?

Njozi ni mfumo wa kuboresha uwezo wa kuongezeka kwa minyororo ya bloku ya umma kama Ethereum. Kama ilivyoelezwa katika [karatasi nyeupe ya Njozi](http://plasma.io/plasma.pdf) ya awali, minyororo ya Njozi hujengwa juu ya mnyororo mwingine wa bloku (unaoitwa "mnyororo mkuu"). Kila "mnyororo wa mtoto" hupanuka kutoka kwa mnyororo mkuu na kwa ujumla hudhibitiwa na mkataba-erevu uliotumwa kwenye mnyororo wa mzazi.

Mkataba wa Njozi hufanya kazi, miongoni mwa mambo mengine, kama [daraja](/developers/docs/bridges/) linalowaruhusu watumiaji kuhamisha mali kati ya Mtandao Mkuu wa Ethereum na mnyororo wa njozi. Ingawa hii inazifanya kuwa sawa na [sidechains](/developers/docs/scaling/sidechains/), minyororo ya njozi hunufaika—angalau, kwa kiasi fulani—kutokana na usalama wa Mtandao Mkuu wa Ethereum. Hii ni tofauti na sidechains ambazo zinawajibika kikamilifu kwa usalama wao.

## Njozi inafanyaje kazi?

Vipengele vya msingi vya mfumo wa Njozi ni:

### Ukokotoaji wa Offchain {#offchain-computation}

Kasi ya sasa ya uchakataji ya Ethereum imepunguzwa hadi miamala ~15-20 kwa sekunde, na hivyo kupunguza uwezekano wa muda mfupi wa uongezwaji ili kushughulikia watumiaji wengi zaidi. Tatizo hili lipo hasa kwa sababu [utaratibu wa makubaliano](/developers/docs/consensus-mechanisms/) wa Ethereum unahitaji nodi nyingi za mtandao wa rika-kwa-rika ili kuthibitisha kila sasisho la hali ya mnyororo wa bloku.

Ingawa utaratibu wa makubaliano wa Ethereum ni muhimu kwa usalama, huenda usitumike kwa kila hali ya utumiaji. Kwa mfano, Alice anaweza asihitaji malipo yake ya kila siku kwa Bob kwa ajili ya kikombe cha kahawa kuthibitishwa na mtandao mzima wa Ethereum kwa kuwa kuna uaminifu fulani kati ya pande zote mbili.

Njozi inadhania kuwa Mtandao Mkuu wa Ethereum hauhitaji kuthibitisha miamala yote. Badala yake, tunaweza kuchakata miamala nje ya Mtandao Mkuu, na kuondoa nodi kutoka kwa kulazimika kuthibitisha kila muamala.

Ukokotoaji wa offchain ni muhimu kwa kuwa minyororo ya Njozi inaweza kuboresha kasi na gharama. Kwa mfano, mnyororo wa Njozi unaweza—na mara nyingi hufanya—kutumia "opereta" mmoja kusimamia mpangilio na utekelezaji wa miamala. Kwa chombo kimoja tu kinachothibitisha miamala, muda wa uchakataji kwenye mnyororo wa njozi ni wa haraka kuliko Mtandao Mkuu wa Ethereum.

### Ahadi za hali {#state-commitments}

Ingawa Njozi hutekeleza miamala offchain, hukamilishwa kwenye safu kuu ya utekelezaji ya Ethereum—vinginevyo, minyororo ya Njozi haiwezi kufaidika na dhamana za usalama za Ethereum. Lakini kukamilisha miamala ya offchain bila kujua hali ya mnyororo wa njozi kungevunja mtindo wa usalama na kuruhusu kuenea kwa miamala batili. Hii ndiyo sababu opereta, chombo kinachohusika na utengenezaji wa bloku kwenye mnyororo wa njozi, anahitajika kuchapisha "ahadi za hali" kwenye Ethereum mara kwa mara.

[Mpango wa ahadi](https://en.wikipedia.org/wiki/Commitment_scheme) ni mbinu ya kriptografia ya kujitolea kwa thamani au taarifa bila kuifichua kwa mhusika mwingine. Ahadi ni za "lazima" kwa maana kwamba huwezi kubadilisha thamani au taarifa mara tu unapojitolea kwayo. Ahadi za hali katika Njozi huchukua fomu ya "mizizi ya Merkle" (inayotokana na [mti wa Merkle](/whitepaper/#merkle-trees)) ambayo opereta hutuma kwa vipindi kwa mkataba wa Njozi kwenye mnyororo wa Ethereum.

Mizizi ya Merkle ni misingi ya kriptografia inayowezesha kubana kiasi kikubwa cha habari. Mzizi wa Merkle (pia huitwa "mzizi wa bloku" katika hali hii) unaweza kuwakilisha miamala yote katika bloku. Mizizi ya Merkle pia hurahisisha kuthibitisha kuwa kipande kidogo cha data ni sehemu ya mkusanyiko mkubwa wa data. Kwa mfano, mtumiaji anaweza kutoa [uthibitisho wa Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/#main-content) ili kuthibitisha ujumuishaji wa muamala katika bloku maalum.

Mizizi ya Merkle ni muhimu kwa kutoa habari kuhusu hali ya offchain kwa Ethereum. Unaweza kufikiria mizizi ya Merkle kama "sehemu za kuhifadhi": opereta anasema, "Hii ndiyo hali ya mnyororo wa Njozi kwa wakati x, na huu ni mzizi wa Merkle kama uthibitisho." Opereta anajitolea kwa _hali ya sasa_ ya mnyororo wa njozi na mzizi wa Merkle, ndiyo sababu inaitwa "ahadi ya hali".

### Kuingia na kutoka {#entries-and-exits}

Ili watumiaji wa Ethereum wanufaike na Njozi, kunahitaji kuwa na utaratibu wa kuhamisha fedha kati ya Mtandao Mkuu na minyororo ya njozi. Hatuwezi kutuma ether kiholela kwa anwani kwenye mnyororo wa njozi, ingawa—minyororo hii haiendani, kwa hivyo muamala unaweza kushindwa au kusababisha upotevu wa fedha.

Njozi hutumia mkataba mkuu unaoendeshwa kwenye Ethereum ili kuchakata maingizo na matokeo ya watumiaji. Mkataba huu mkuu pia unawajibika kwa kufuatilia ahadi za hali (zilizoelezwa mapema) na kuadhibu tabia isiyo ya uaminifu kupitia ushahidi wa ulaghai (zaidi juu ya hili baadaye).

#### Kuingia kwenye mnyororo wa njozi {#entering-the-plasma-chain}

Ili kuingia kwenye mnyororo wa njozi, Alice (mtumiaji) atalazimika kuweka ETH au tokeni yoyote ya ERC-20 kwenye mkataba wa njozi. Opereta wa njozi, anayefuatilia amana za mkataba, huunda tena kiasi kinacholingana na amana ya awali ya Alice na kuitoa kwa anwani yake kwenye mnyororo wa njozi. Alice anahitajika kuthibitisha kupokea fedha kwenye mnyororo wa mtoto na kisha anaweza kutumia fedha hizi kwa miamala.

#### Kutoka kwenye mnyororo wa njozi {#exiting-the-plasma-chain}

Kutoka kwenye mnyororo wa njozi ni ngumu zaidi kuliko kuingia kwa sababu kadhaa. Kubwa zaidi ni kwamba, ingawa Ethereum ina habari kuhusu hali ya mnyororo wa njozi, haiwezi kuthibitisha ikiwa habari hiyo ni ya kweli au la. Mtumiaji mwenye nia mbaya anaweza kutoa madai yasiyo sahihi ("Nina ETH 1000") na akafanikiwa kutoa uthibitisho wa uongo ili kuunga mkono madai hayo.

Ili kuzuia utoaji wenye nia mbaya, "kipindi cha changamoto" kimeanzishwa. Katika kipindi cha changamoto (kawaida wiki moja), yeyote anaweza kupinga ombi la kutoa pesa kwa kutumia uthibitisho wa ulaghai. Ikiwa changamoto itafaulu, basi ombi la kutoa pesa linakataliwa.

Hata hivyo, kwa kawaida watumiaji ni waaminifu na hutoa madai sahihi kuhusu fedha wanazomiliki. Katika hali hii, Alice ataanzisha ombi la kutoa pesa kwenye mnyororo mkuu (Ethereum) kwa kuwasilisha muamala kwa mkataba wa njozi.

Lazima pia atoe uthibitisho wa Merkle unaothibitisha kuwa muamala uliounda fedha zake kwenye mnyororo wa Njozi ulijumuishwa kwenye bloku. Hii ni muhimu kwa marudio ya Njozi, kama vile [Njozi MVP](https://www.learnplasma.org/en/learn/mvp.html), ambayo hutumia mtindo wa [Matokeo ya Muamala Usiotumika (UTXO)](https://en.wikipedia.org/wiki/Unspent_transaction_output).

Nyingine, kama [Njozi Cash](https://www.learnplasma.org/en/learn/cash.html), huwakilisha fedha kama [tokeni zisizoweza kubadilishwa](/developers/docs/standards/tokens/erc-721/) badala ya UTXO. Kutoa pesa, katika kesi hii, kunahitaji uthibitisho wa umiliki wa tokeni kwenye mnyororo wa Njozi. Hili hufanywa kwa kuwasilisha miamala miwili ya hivi karibuni inayohusisha tokeni na kutoa uthibitisho wa Merkle unaothibitisha ujumuishaji wa miamala hiyo kwenye bloku.

Mtumiaji lazima pia aongeze dhamana kwenye ombi la kutoa pesa kama hakikisho la tabia ya uaminifu. Ikiwa mpinzani atathibitisha ombi la Alice la kutoa pesa ni batili, dhamana yake hupunguzwa, na baadhi yake huenda kwa mpinzani kama zawadi.

Ikiwa kipindi cha changamoto kitapita bila mtu yeyote kutoa uthibitisho wa ulaghai, ombi la Alice la kutoa pesa linachukuliwa kuwa halali, na kumruhusu kupata amana kutoka kwa mkataba wa Njozi kwenye Ethereum.

### Usuluhishi wa mizozo {#dispute-arbitration}

Kama mnyororo wowote wa bloku, minyororo ya njozi inahitaji utaratibu wa kutekeleza uadilifu wa miamala iwapo washiriki watatenda kwa nia mbaya (k.m., kutumia fedha mara mbili). Kwa ajili hii, minyororo ya njozi hutumia ushahidi wa ulaghai kusuluhisha mizozo kuhusu uhalali wa mabadiliko ya hali na kuadhibu tabia mbaya. Ushahidi wa ulaghai hutumika kama utaratibu ambapo mnyororo wa mtoto wa Njozi huwasilisha malalamiko kwa mnyororo wake mkuu au kwa mnyororo mzizi.

Ushahidi wa ulaghai ni dai tu kwamba mpito fulani wa hali si halali. Mfano ni ikiwa mtumiaji (Alice) anajaribu kutumia fedha zilezile mara mbili. Labda alitumia UTXO katika muamala na Bob na anataka kutumia UTXO ileile (ambayo sasa ni ya Bob) katika muamala mwingine.

Ili kuzuia utoaji, Bob ataunda uthibitisho wa ulaghai kwa kutoa ushahidi wa Alice kutumia UTXO hiyo katika muamala uliopita na uthibitisho wa Merkle wa ujumuishaji wa muamala huo kwenye bloku. Mchakato uleule hufanya kazi katika Njozi Cash—Bob angehitaji kutoa uthibitisho kwamba Alice alihamisha tokeni anazojaribu kutoa mapema.

Ikiwa changamoto ya Bob itafaulu, ombi la Alice la kutoa pesa linafutwa. Hata hivyo, mbinu hii inategemea uwezo wa Bob kufuatilia mnyororo kwa maombi ya kutoa pesa. Ikiwa Bob hayuko mtandaoni, basi Alice anaweza kuchakata utoaji wenye nia mbaya mara tu kipindi cha changamoto kinapokwisha.

## Tatizo la kutoka kwa wingi katika njozi {#the-mass-exit-problem-in-plasma}

Tatizo la kutoka kwa wingi hutokea wakati idadi kubwa ya watumiaji wanajaribu kutoa pesa kutoka kwa mnyororo wa njozi kwa wakati mmoja. Kwa nini tatizo hili lipo linahusiana na mojawapo ya matatizo makubwa ya Njozi: **kutopatikana kwa data**.

Upatikanaji wa data ni uwezo wa kuthibitisha kuwa habari ya bloku iliyopendekezwa ilichapishwa kweli kwenye mtandao wa mnyororo wa bloku. Bloku "haipatikani" ikiwa mzalishaji anachapisha bloku yenyewe lakini anazuia data iliyotumika kuunda bloku hiyo.

Bloku lazima zipatikane ikiwa nodi zitakuwa na uwezo wa kupakua bloku na kuthibitisha uhalali wa miamala. Minyororo ya bloku huhakikisha upatikanaji wa data kwa kulazimisha wazalishaji wa bloku kuchapisha data zote za miamala onchain.

Upatikanaji wa data pia husaidia katika kupata itifaki za uongezwaji za offchain zinazojengwa kwenye safu ya msingi ya Ethereum. Kwa kulazimisha waendeshaji kwenye minyororo hii kuchapisha data za miamala kwenye Ethereum, mtu yeyote anaweza kupinga bloku batili kwa kuunda ushahidi wa ulaghai unaorejelea hali sahihi ya mnyororo.

Minyororo ya njozi kimsingi huhifadhi data za miamala na opereta na **haichapishi data yoyote kwenye Mtandao Mkuu** (yaani, kando na ahadi za hali za mara kwa mara). Hii inamaanisha watumiaji lazima wategemee opereta kutoa data ya bloku ikiwa wanahitaji kuunda ushahidi wa ulaghai unaopinga miamala batili. Ikiwa mfumo huu utafanya kazi, basi watumiaji wanaweza kutumia ushahidi wa ulaghai kila wakati ili kulinda fedha zao.

Tatizo huanza pale opereta, na si mtumiaji yeyote tu, ndiye mhusika anayetenda kwa nia mbaya. Kwa sababu opereta ndiye anayedhibiti mnyororo wa bloku peke yake, wana motisha zaidi ya kuendeleza mabadiliko batili ya hali kwa kiwango kikubwa, kama vile kuiba fedha za watumiaji kwenye mnyororo wa njozi.

Katika hali hii, kutumia mfumo wa kawaida wa uthibitisho wa ulaghai haufanyi kazi. Opereta anaweza kwa urahisi kufanya muamala batili wa kuhamisha fedha za Alice na Bob kwenye pochi yake na kuficha data muhimu kwa ajili ya kuunda uthibitisho wa ulaghai. Hili linawezekana kwa sababu opereta hahitajiki kufanya data ipatikane kwa watumiaji au Mtandao Mkuu.

Kwa hivyo, suluhisho la matumaini zaidi ni kujaribu "kutoka kwa wingi" kwa watumiaji kutoka kwenye mnyororo wa njozi. Kutoka kwa wingi kunapunguza kasi ya mpango wa opereta mwenye nia mbaya wa kuiba fedha na kunatoa kiwango fulani cha ulinzi kwa watumiaji. Maombi ya kutoa pesa hupangwa kulingana na wakati kila UTXO (au tokeni) ilipoundwa, na kuzuia waendeshaji wenye nia mbaya kuwatangulia watumiaji waaminifu.

Hata hivyo, bado tunahitaji njia ya kuthibitisha uhalali wa maombi ya kutoa pesa wakati wa kutoka kwa wingi—ili kuzuia watu wenye fursa kutumia fujo kuchakata matokeo batili. Suluhisho ni rahisi: wahitaji watumiaji kuchapisha **hali halali ya mwisho ya mnyororo** ili kutoa pesa zao.

Lakini mbinu hii bado ina matatizo. Kwa mfano, ikiwa watumiaji wote kwenye mnyororo wa njozi wanahitaji kutoka (ambalo linawezekana katika kesi ya opereta mwenye nia mbaya), basi hali nzima halali ya mnyororo wa njozi lazima itupwe kwenye safu ya msingi ya Ethereum mara moja. Kwa ukubwa wa kiholela wa minyororo ya njozi (throughput ya juu = data zaidi) na vikwazo vya kasi ya uchakataji wa Ethereum, hili si suluhisho bora.

Ingawa michezo ya kutoka inasikika vizuri kinadharia, kutoka kwa wingi katika maisha halisi kunaweza kusababisha msongamano wa mtandao mzima kwenye Ethereum yenyewe. Kando na kudhuru utendaji kazi wa Ethereum, kutoka kwa wingi bila uratibu mzuri kunamaanisha kuwa watumiaji wanaweza wasiweze kutoa fedha kabla ya opereta kumaliza kila akaunti kwenye mnyororo wa njozi.

## Faida na hasara za njozi {#pros-and-cons-of-plasma}

| Faida                                                                                                                                                                                                                                                                                                      | Hasara                                                                                                                                                                                                                                                      |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Inatoa throughput ya juu na gharama ya chini kwa kila muamala.                                                                                                                                                                                                                             | Haiungi mkono ukokotoaji wa jumla (haiwezi kuendesha mikataba-erevu). Uhamisho wa msingi tu wa tokeni, ubadilishanaji, na aina nyingine chache za miamala ndizo zinazotumika kupitia mantiki ya kiarifu. |
| Nzuri kwa miamala kati ya watumiaji wa kiholela (hakuna gharama za ziada kwa kila jozi ya watumiaji ikiwa wote wameanzishwa kwenye mnyororo wa njozi)                                                                                                                                   | Unahitaji kufuatilia mtandao mara kwa mara (mahitaji ya uhai) au kukabidhi jukumu hili kwa mtu mwingine ili kuhakikisha usalama wa fedha zako.                                                                           |
| Minyororo ya njozi inaweza kurekebishwa kwa matumizi maalum ambayo hayahusiani na mnyororo mkuu. Mtu yeyote, ikiwa ni pamoja na biashara, anaweza kubinafsisha mikataba-erevu ya Njozi ili kutoa miundombinu inayoweza kuongezwa inayofanya kazi katika mazingira tofauti. | Inategemea waendeshaji mmoja au zaidi kuhifadhi data na kuitoa inapohitajika.                                                                                                                                                               |
| Hupunguza mzigo kwenye Mtandao Mkuu wa Ethereum kwa kuhamisha ukokotoaji na ghala offchain.                                                                                                                                                                                                | Utoaji hucheleweshwa kwa siku kadhaa ili kuruhusu changamoto. Kwa mali zinazoweza kubadilishwa, hii inaweza kupunguzwa na watoa huduma za ukwasi, lakini kuna gharama ya mtaji inayohusishwa.                               |
|                                                                                                                                                                                                                                                                                                            | Ikiwa watumiaji wengi sana watajaribu kutoka kwa wakati mmoja, Mtandao Mkuu wa Ethereum unaweza kupata msongamano.                                                                                                                          |

## Njozi dhidi ya itifaki za uongezwaji za safu 2 {#plasma-vs-layer-2}

Ingawa Njozi iliwahi kuchukuliwa kuwa suluhisho muhimu la uongezwaji kwa Ethereum, tangu wakati huo imeachwa kwa kupendelea [itifaki za uongezwaji za safu 2 (L2)](/layer-2/). Suluhisho za uongezwaji za L2 hurekebisha matatizo kadhaa ya Njozi:

### Ufanisi {#efficiency}

[Zero-Knowledge rollups](/developers/docs/scaling/zk-rollups) huzalisha ithibati za kriptografia za uhalali wa kila kundi la miamala inayochakatwa offchain. Hii huwazuia watumiaji (na waendeshaji) kuendeleza mabadiliko batili ya hali, na kuondoa hitaji la vipindi vya changamoto na michezo ya kutoka. Pia inamaanisha watumiaji hawana haja ya kufuatilia mnyororo mara kwa mara ili kulinda fedha zao.

### Usaidizi kwa mikataba-erevu {#support-for-smart-contracts}

Tatizo lingine la mfumo wa njozi lilikuwa [kutokuwa na uwezo wa kusaidia utekelezaji wa mikataba-erevu ya Ethereum](https://ethresear.ch/t/why-smart-contracts-are-not-feasible-on-plasma/2598/4). Kwa sababu hiyo, utekelezaji mwingi wa Njozi ulijengwa hasa kwa ajili ya malipo rahisi au ubadilishanaji wa tokeni za ERC-20.

Kinyume chake, optimistic rollups, zinaendana na [Mashine ya Mtandaoni ya Ethereum](/developers/docs/evm/) na zinaweza kuendesha [mikataba-erevu](/developers/docs/smart-contracts/) asilia ya Ethereum, na kuzifanya kuwa suluhisho muhimu na _salama_ la kuongeza [programu zilizogatuliwa](/developers/docs/dapps/). Vile vile, mipango inaendelea ya [kuunda utekelezaji wa zero-knowledge wa EVM (zkEVM)](https://ethresear.ch/t/a-zk-evm-specification/11549) ambayo itaruhusu ZK-rollups kuchakata mantiki ya kiholela na kutekeleza mikataba-erevu.

### Kutopatikana kwa data {#data-unavailability}

Kama ilivyoelezwa awali, njozi inakabiliwa na tatizo la upatikanaji wa data. Ikiwa opereta mwenye nia mbaya angeendeleza mpito batili kwenye mnyororo wa njozi, watumiaji wasingeweza kuupinga kwa kuwa opereta anaweza kuzuia data inayohitajika kuunda uthibitisho wa ulaghai. Unda-mpya hutatua tatizo hili kwa kulazimisha waendeshaji kuchapisha data za miamala kwenye Ethereum, na kumruhusu yeyote kuthibitisha hali ya mnyororo na kuunda ushahidi wa ulaghai ikibidi.

### Tatizo la kutoka kwa wingi {#mass-exit-problem}

ZK-rollups na optimistic rollups zote zinatatua tatizo la Njozi la kutoka kwa wingi kwa njia mbalimbali. Kwa mfano, ZK-rollup inategemea mifumo ya kriptografia inayohakikisha waendeshaji hawawezi kuiba fedha za watumiaji katika hali yoyote.

Vile vile, optimistic rollups huweka kipindi cha kuchelewesha utoaji ambapo mtu yeyote anaweza kuanzisha changamoto na kuzuia maombi ya utoaji yenye nia mbaya. Ingawa hii ni sawa na Njozi, tofauti ni kwamba wathibitishaji wanapata data inayohitajika kuunda ushahidi wa ulaghai. Hivyo, hakuna haja kwa watumiaji wa unda-mpya kujihusisha na uhamiaji wa haraka, wa "wa kwanza kutoka" kwenda Mtandao Mkuu wa Ethereum.

## Njozi inatofautianaje na sidechains na ugawanyaji? {#plasma-sidechains-sharding}

Njozi, sidechains, na ugawanyaji ni sawa kabisa kwa sababu zote zinaunganishwa na Mtandao Mkuu wa Ethereum kwa njia fulani. Hata hivyo, kiwango na nguvu ya miunganisho hii hutofautiana, jambo ambalo huathiri sifa za usalama za kila suluhisho la uongezwaji.

### Njozi dhidi ya sidechains {#plasma-vs-sidechains}

[Sidechain](/developers/docs/scaling/sidechains/) ni mnyororo wa bloku unaoendeshwa kwa kujitegemea na umeunganishwa na Mtandao Mkuu wa Ethereum kupitia daraja la pande mbili. [Madaraja](/bridges/) huwaruhusu watumiaji kubadilishana tokeni kati ya minyororo miwili ya bloku ili kufanya miamala kwenye sidechain, na hivyo kupunguza msongamano kwenye Mtandao Mkuu wa Ethereum na kuboresha uongezwaji.
Sidechains hutumia utaratibu tofauti wa makubaliano na kwa kawaida ni ndogo zaidi kuliko Mtandao Mkuu wa Ethereum. Matokeo yake, kuunganisha mali kwenye minyororo hii kunahusisha hatari iliyoongezeka; kutokana na ukosefu wa dhamana za usalama zilizorithiwa kutoka Mtandao Mkuu wa Ethereum katika mtindo wa sidechain, watumiaji wako katika hatari ya kupoteza fedha katika shambulio kwenye sidechain.

Kinyume chake, minyororo ya njozi hupata usalama wao kutoka kwa Mtandao Mkuu. Hii inazifanya kuwa salama zaidi kwa kipimo kuliko sidechains. Sidechains na minyororo ya njozi zote zinaweza kuwa na itifaki tofauti za makubaliano, lakini tofauti ni kwamba minyororo ya njozi huchapisha mizizi ya Merkle kwa kila bloku kwenye Mtandao Mkuu wa Ethereum. Mizizi ya bloku ni vipande vidogo vya habari tunavyoweza kutumia kuthibitisha habari kuhusu miamala inayotokea kwenye mnyororo wa njozi. Ikiwa shambulio litatokea kwenye mnyororo wa njozi, watumiaji wanaweza kutoa fedha zao kwa usalama na kuzirudisha kwenye Mtandao Mkuu kwa kutumia uthibitisho unaofaa.

### Njozi dhidi ya ugawanyaji {#plasma-vs-sharding}

Minyororo ya njozi na minyororo ya kugawanyisha huchapisha ithibati za kriptografia mara kwa mara kwenye Mtandao Mkuu wa Ethereum. Hata hivyo, zote mbili zina sifa tofauti za usalama.

Minyororo ya kugawanyisha huwasilisha "vichwa vya mkusanyo" kwa Mtandao Mkuu vikiwa na taarifa za kina kuhusu kila kigae cha data. Nodi kwenye Mtandao Mkuu huthibitisha na kutekeleza uhalali wa vigae vya data, na hivyo kupunguza uwezekano wa mabadiliko batili ya vigae na kulinda mtandao dhidi ya shughuli mbaya.

Njozi ni tofauti kwa sababu Mtandao Mkuu hupokea tu habari ndogo kuhusu hali ya minyororo ya watoto. Hii inamaanisha Mtandao Mkuu hauwezi kuthibitisha kwa ufanisi miamala inayofanywa kwenye minyororo ya watoto, na kuifanya kuwa salama kidogo.

**Kumbuka** kwamba ugawanyaji wa mnyororo wa bloku wa Ethereum haupo tena kwenye ramani. Imebadilishwa na uongezwaji kupitia unda-mpya na [Danksharding](/roadmap/danksharding).

### Tumia Njozi {#use-plasma}

Miradi mingi hutoa utekelezaji wa Njozi ambao unaweza kuunganisha kwenye dApps zako:

- [Polygon](https://polygon.technology/) (hapo awali Mtandao wa Matic)

## Masomo zaidi {#further-reading}

- [Jifunze Njozi](https://www.learnplasma.org/en/)
- [Kikumbusho cha haraka cha maana ya "usalama wa pamoja" na kwa nini ni muhimu sana](https://old.reddit.com/r/ethereum/comments/sgd3zt/a_quick_reminder_of_what_shared_security_means/)
- [Sidechains dhidi ya Njozi dhidi ya Ugawanyaji](https://vitalik.eth.limo/general/2019/06/12/plasma_vs_sharding.html)
- [Kuelewa Njozi, Sehemu ya 1: Misingi](https://www.theblockcrypto.com/amp/post/10793/understanding-plasma-part-1-the-basics)
- [Maisha na Kifo cha Njozi](https://medium.com/dragonfly-research/the-life-and-death-of-plasma-b72c6a59c5ad#)

_Unajua rasilimali ya jamii iliyokusaidia?_ Hariri ukurasa huu na uiongeze!_
