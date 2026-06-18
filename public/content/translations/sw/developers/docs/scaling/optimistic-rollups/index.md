---
title: Mikusanyiko ya Optimistic
description: Utangulizi wa mikusanyiko ya optimistic—suluhisho la kuongeza uwezo linalotumiwa na jamii ya Ethereum.
lang: sw
---

Mikusanyiko ya optimistic ni itifaki za tabaka la 2 (l2) zilizoundwa kupanua uwezo wa upitishaji wa tabaka la msingi la Ethereum. Zinapunguza ukokotoaji kwenye mnyororo mkuu wa [Ethereum](/) kwa kuchakata miamala nje ya mnyororo, na kutoa maboresho makubwa katika kasi ya uchakataji. Tofauti na masuluhisho mengine ya kuongeza uwezo, kama vile [minyororo ya kando (sidechains)](/developers/docs/scaling/sidechains/), mikusanyiko ya optimistic hupata usalama kutoka kwa Mtandao Mkuu kwa kuchapisha matokeo ya muamala mnyororoni, au [minyororo ya Plasma](/developers/docs/scaling/plasma/), ambayo pia huthibitisha miamala kwenye Ethereum kwa ushahidi wa udanganyifu, lakini huhifadhi data ya muamala kwingineko.

Kwa kuwa ukokotoaji ni sehemu ya polepole na ghali ya kutumia Ethereum, mikusanyiko ya optimistic inaweza kutoa maboresho ya hadi mara 10-100 katika uwezo wa kuongezeka. Mikusanyiko ya optimistic pia huandika miamala kwenye Ethereum kama `calldata` au katika [mablobu](/roadmap/danksharding/), na kupunguza gharama za gesi kwa watumiaji.

## Mahitaji ya Awali {#prerequisites}

Unapaswa kuwa umesoma na kuelewa kurasa zetu kuhusu [kuongeza uwezo wa Ethereum](/developers/docs/scaling/) na [tabaka la 2 (l2)](/layer-2/).

## Rollup ya optimistic ni nini? {#what-is-an-optimistic-rollup}

Rollup ya optimistic ni mbinu ya kuongeza uwezo wa Ethereum inayohusisha kuhamisha ukokotoaji na uhifadhi wa hali nje ya mnyororo. Mikusanyiko ya optimistic hutekeleza miamala nje ya Ethereum, lakini huchapisha data ya muamala kwenye Mtandao Mkuu kama `calldata` au katika [mablobu](/roadmap/danksharding/).

Waendeshaji wa mikusanyiko ya optimistic hukusanya miamala mingi ya nje ya mnyororo pamoja katika mafungu makubwa kabla ya kuiwasilisha kwenye Ethereum. Mbinu hii inawezesha kusambaza gharama zisizobadilika kwenye miamala mingi katika kila fungu, na kupunguza ada kwa watumiaji wa mwisho. Mikusanyiko ya optimistic pia hutumia mbinu za kubana ili kupunguza kiasi cha data kinachochapishwa kwenye Ethereum.

Mikusanyiko ya optimistic inachukuliwa kuwa "optimistic" kwa sababu inachukulia kuwa miamala ya nje ya mnyororo ni halali na haichapishi uthibitisho wa uhalali kwa mafungu ya miamala yaliyochapishwa mnyororoni. Hii inatofautisha mikusanyiko ya optimistic na [mikusanyiko ya sifuri-maarifa](/developers/docs/scaling/zk-rollups) ambayo huchapisha [uthibitisho wa uhalali](/glossary/#validity-proof) wa kificho kwa miamala ya nje ya mnyororo.

Badala yake, mikusanyiko ya optimistic hutegemea mpango wa kuthibitisha udanganyifu ili kugundua matukio ambapo miamala haikokotolewi kwa usahihi. Baada ya fungu la rollup kuwasilishwa kwenye Ethereum, kuna dirisha la muda (linaloitwa kipindi cha changamoto) ambapo mtu yeyote anaweza kupinga matokeo ya muamala wa rollup kwa kukokotoa [ushahidi wa udanganyifu](/glossary/#fraud-proof).

Ikiwa ushahidi wa udanganyifu utafaulu, itifaki ya rollup hutekeleza upya muamala (au miamala) na kusasisha hali ya rollup ipasavyo. Athari nyingine ya ushahidi wa udanganyifu uliofaulu ni kwamba mpangaji anayehusika na kujumuisha muamala uliotekelezwa vibaya katika kitalu hupokea adhabu.

Ikiwa fungu la rollup litasalia bila kupingwa (yaani, miamala yote imetekelezwa kwa usahihi) baada ya kipindi cha changamoto kupita, linachukuliwa kuwa halali na kukubaliwa kwenye Ethereum. Wengine wanaweza kuendelea kujenga kwenye kitalu cha rollup ambacho hakijathibitishwa, lakini kwa tahadhari: matokeo ya muamala yatabadilishwa ikiwa yanatokana na muamala uliotekelezwa vibaya uliochapishwa hapo awali.

## Mikusanyiko ya optimistic huingiliana vipi na Ethereum? {#optimistic-rollups-and-ethereum}

Mikusanyiko ya optimistic ni [masuluhisho ya kuongeza uwezo nje ya mnyororo](/developers/docs/scaling/#offchain-scaling) yaliyojengwa kufanya kazi juu ya Ethereum. Kila rollup ya optimistic inasimamiwa na seti ya mikataba mahiri iliyosambazwa kwenye mtandao wa Ethereum. Mikusanyiko ya optimistic huchakata miamala nje ya mnyororo mkuu wa Ethereum, lakini huchapisha miamala ya nje ya mnyororo (katika mafungu) kwenye mkataba wa rollup mnyororoni. Kama mnyororo wa vitalu wa Ethereum, rekodi hii ya muamala ni isiyobadilika na huunda "mnyororo wa rollup ya optimistic."

Usanifu wa rollup ya optimistic unajumuisha sehemu zifuatazo:

**Mikataba mnyororoni**: Uendeshaji wa rollup ya optimistic unadhibitiwa na mikataba mahiri inayoendeshwa kwenye Ethereum. Hii inajumuisha mikataba inayohifadhi vitalu vya rollup, kufuatilia masasisho ya hali kwenye rollup, na kufuatilia amana za watumiaji. Kwa maana hii, Ethereum hutumika kama tabaka la msingi au "tabaka la 1 (l1)" kwa mikusanyiko ya optimistic.

**Mashine pepe ya nje ya mnyororo (VM)**: Ingawa mikataba inayosimamia itifaki ya rollup ya optimistic inaendeshwa kwenye Ethereum, itifaki ya rollup hufanya ukokotoaji na uhifadhi wa hali kwenye mashine pepe nyingine tofauti na [Mashine Pepe ya Ethereum (EVM)](/developers/docs/evm/). VM ya nje ya mnyororo ndipo programu zinapoishi na mabadiliko ya hali yanapotekelezwa; inatumika kama tabaka la juu au "tabaka la 2 (l2)" kwa rollup ya optimistic.

Kwa kuwa mikusanyiko ya optimistic imeundwa kuendesha programu zilizoandikwa au kukusanywa kwa ajili ya EVM, VM ya nje ya mnyororo inajumuisha vipimo vingi vya muundo wa EVM. Zaidi ya hayo, ushahidi wa udanganyifu uliokokotolewa mnyororoni huruhusu mtandao wa Ethereum kutekeleza uhalali wa mabadiliko ya hali yaliyokokotolewa katika VM ya nje ya mnyororo.

Mikusanyiko ya optimistic inaelezewa kama 'masuluhisho mseto ya kuongeza uwezo' kwa sababu, ingawa yapo kama itifaki tofauti, sifa zao za usalama zinatokana na Ethereum. Miongoni mwa mambo mengine, Ethereum inahakikisha usahihi wa ukokotoaji wa nje ya mnyororo wa rollup na upatikanaji wa data nyuma ya ukokotoaji. Hii inafanya mikusanyiko ya optimistic kuwa salama zaidi kuliko itifaki safi za kuongeza uwezo nje ya mnyororo (k.m., [minyororo ya kando](/developers/docs/scaling/sidechains/)) ambazo hazitegemei Ethereum kwa usalama.

Mikusanyiko ya optimistic hutegemea itifaki kuu ya Ethereum kwa yafuatayo:

### Upatikanaji wa data {#data-availability}

Kama ilivyotajwa, mikusanyiko ya optimistic huchapisha data ya muamala kwenye Ethereum kama `calldata` au [mablobu](/roadmap/danksharding/). Kwa kuwa utekelezaji wa mnyororo wa rollup unategemea miamala iliyowasilishwa, mtu yeyote anaweza kutumia maelezo haya—yaliyowekwa kwenye tabaka la msingi la Ethereum—kutekeleza hali ya rollup na kuthibitisha usahihi wa mabadiliko ya hali.

[Upatikanaji wa data](/developers/docs/data-availability/) ni muhimu kwa sababu bila ufikiaji wa data ya hali, wapingaji hawawezi kuunda ushahidi wa udanganyifu ili kupinga shughuli batili za rollup. Kwa Ethereum kutoa upatikanaji wa data, hatari ya waendeshaji wa rollup kufanikiwa na vitendo viovu (k.m., kuwasilisha vitalu batili) inapunguzwa.

### Upinzani wa udhibiti {#censorship-resistance}

Mikusanyiko ya optimistic pia hutegemea Ethereum kwa upinzani wa udhibiti. Katika rollup ya optimistic, chombo kilichowekwa kati (mwendeshaji) kinawajibika kuchakata miamala na kuwasilisha vitalu vya rollup kwenye Ethereum. Hii ina athari kadhaa:

- Waendeshaji wa rollup wanaweza kudhibiti watumiaji kwa kwenda nje ya mtandao kabisa, au kwa kukataa kuzalisha vitalu vinavyojumuisha miamala fulani ndani yake.

- Waendeshaji wa rollup wanaweza kuzuia watumiaji kutoa fedha zilizowekwa kwenye mkataba wa rollup kwa kuzuia data ya hali inayohitajika kwa ushahidi wa Merkle wa umiliki. Kuzuia data ya hali pia kunaweza kuficha hali ya rollup kutoka kwa watumiaji na kuwazuia kuingiliana na rollup.

Mikusanyiko ya optimistic hutatua tatizo hili kwa kulazimisha waendeshaji kuchapisha data inayohusiana na masasisho ya hali kwenye Ethereum. Kuchapisha data ya rollup mnyororoni kuna faida zifuatazo:

- Ikiwa mwendeshaji wa rollup ya optimistic ataenda nje ya mtandao au kuacha kuzalisha mafungu ya miamala, nodi nyingine inaweza kutumia data inayopatikana kuzalisha upya hali ya mwisho ya rollup na kuendelea na uzalishaji wa kitalu.

- Watumiaji wanaweza kutumia data ya muamala kuunda ushahidi wa Merkle unaothibitisha umiliki wa fedha na kutoa mali zao kutoka kwenye rollup.

- Watumiaji pia wanaweza kuwasilisha miamala yao kwenye tabaka la 1 (l1) badala ya kwa mpangaji, ambapo mpangaji anapaswa kujumuisha muamala ndani ya kikomo fulani cha muda ili kuendelea kuzalisha vitalu halali.

### Ukamilishaji {#settlement}

Jukumu jingine ambalo Ethereum inacheza katika muktadha wa mikusanyiko ya optimistic ni lile la tabaka la ukamilishaji. Tabaka la ukamilishaji huweka msingi wa mfumo mzima wa mnyororo wa vitalu, huanzisha usalama, na kutoa ukamilifu wa lengo ikiwa mzozo utatokea kwenye mnyororo mwingine (mikusanyiko ya optimistic katika kesi hii) unaohitaji usuluhishi.

Mtandao Mkuu wa Ethereum hutoa kitovu kwa mikusanyiko ya optimistic kuthibitisha ushahidi wa udanganyifu na kutatua mizozo. Zaidi ya hayo, miamala inayofanywa kwenye rollup inakuwa ya mwisho tu _baada_ ya kitalu cha rollup kukubaliwa kwenye Ethereum. Pindi muamala wa rollup unapowekwa kwenye tabaka la msingi la Ethereum, hauwezi kurudishwa nyuma (isipokuwa katika hali isiyowezekana sana ya upangaji upya wa mnyororo).

## Mikusanyiko ya optimistic inafanyaje kazi? {#how-optimistic-rollups-work}

### Utekelezaji na ujumuishaji wa muamala {#transaction-execution-and-aggregation}

Watumiaji huwasilisha miamala kwa "waendeshaji", ambao ni nodi zinazowajibika kuchakata miamala kwenye rollup ya optimistic. Pia inajulikana kama "mthibitishaji" au "mjumuishaji", mwendeshaji hujumuisha miamala, kubana data ya msingi, na kuchapisha kitalu kwenye Ethereum.

Ingawa mtu yeyote anaweza kuwa mthibitishaji, wathibitishaji wa rollup ya optimistic lazima watoe dhamana kabla ya kuzalisha vitalu, sawa na [mfumo wa Uthibitisho wa Dau (PoS)](/developers/docs/consensus-mechanisms/pos/). Dhamana hii inaweza kukatwa (ukataji) ikiwa mthibitishaji atachapisha kitalu batili au kujenga kwenye kitalu cha zamani lakini batili (hata kama kitalu chao ni halali). Kwa njia hii mikusanyiko ya optimistic hutumia motisha za kiuchumi za kificho ili kuhakikisha wathibitishaji wanatenda kwa uaminifu.

Wathibitishaji wengine kwenye mnyororo wa rollup ya optimistic wanatarajiwa kutekeleza miamala iliyowasilishwa kwa kutumia nakala yao ya hali ya rollup. Ikiwa hali ya mwisho ya mthibitishaji ni tofauti na hali iliyopendekezwa na mwendeshaji, wanaweza kuanzisha changamoto na kukokotoa ushahidi wa udanganyifu.

Baadhi ya mikusanyiko ya optimistic inaweza kuacha mfumo wa mthibitishaji bila ruhusa na kutumia "mpangaji" mmoja kutekeleza mnyororo. Kama mthibitishaji, mpangaji huchakata miamala, huzalisha vitalu vya rollup, na kuwasilisha miamala ya rollup kwenye mnyororo wa tabaka la 1 (l1) (Ethereum).

Mpangaji ni tofauti na mwendeshaji wa kawaida wa rollup kwa sababu wana udhibiti mkubwa zaidi juu ya upangaji wa miamala. Pia, mpangaji ana ufikiaji wa kipaumbele kwenye mnyororo wa rollup na ndiye chombo pekee kilichoidhinishwa kuwasilisha miamala kwenye mkataba mnyororoni. Miamala kutoka kwa nodi zisizo za mpangaji au watumiaji wa kawaida hupangwa tu kwenye foleni katika kikasha tofauti hadi mpangaji aijumuishe katika fungu jipya.

#### Kuwasilisha vitalu vya rollup kwenye Ethereum {#submitting-blocks-to-ethereum}

Kama ilivyotajwa, mwendeshaji wa rollup ya optimistic hukusanya miamala ya nje ya mnyororo katika fungu na kuituma kwenye Ethereum kwa uthibitisho. Mchakato huu unahusisha kubana data inayohusiana na muamala na kuichapisha kwenye Ethereum kama `calldata` au katika mablobu.

`calldata` ni eneo lisiloweza kurekebishwa, lisilodumu katika mkataba mahiri ambalo hufanya kazi zaidi kama [kumbukumbu](/developers/docs/smart-contracts/anatomy/#memory). Ingawa `calldata` hudumu mnyororoni kama sehemu ya [kumbukumbu za historia](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) za mnyororo wa vitalu, haihifadhiwi kama sehemu ya hali ya Ethereum. Kwa sababu `calldata` haigusi sehemu yoyote ya hali ya Ethereum, ni nafuu kuliko hali kwa kuhifadhi data mnyororoni.

Neno kuu la `calldata` pia hutumika katika Solidity kupitisha hoja kwenye utendakazi wa mkataba mahiri wakati wa utekelezaji. `calldata` hutambua utendakazi unaoitwa wakati wa muamala na hushikilia ingizo kwenye utendakazi katika mfumo wa mfuatano wa kiholela wa baiti.

Katika muktadha wa mikusanyiko ya optimistic, `calldata` hutumika kutuma data ya muamala iliyobanwa kwenye mkataba mnyororoni. Mwendeshaji wa rollup huongeza fungu jipya kwa kuita utendakazi unaohitajika katika mkataba wa rollup na kupitisha data iliyobanwa kama hoja za utendakazi. Kutumia `calldata` hupunguza ada za watumiaji kwa kuwa gharama nyingi ambazo mikusanyiko huingia hutokana na kuhifadhi data mnyororoni.

Huu hapa ni [mfano](https://eth.blockscout.com/tx/0x9102bfce17c58b5fc1c974c24b6bb7a924fb5fbd7c4cd2f675911c27422a5591) wa uwasilishaji wa fungu la rollup ili kuonyesha jinsi dhana hii inavyofanya kazi. Mpangaji aliita mbinu ya `appendSequencerBatch()` na kupitisha data ya muamala iliyobanwa kama ingizo kwa kutumia `calldata`.

Baadhi ya mikusanyiko sasa hutumia mablobu kuchapisha mafungu ya miamala kwenye Ethereum.

Mablobu hayawezi kurekebishwa na hayadumu (kama tu `calldata`) lakini hupunguzwa kutoka kwenye historia baada ya takriban siku 18. Kwa maelezo zaidi kuhusu mablobu, tazama [danksharding](/roadmap/danksharding).

### Ahadi za hali {#state-commitments}

Wakati wowote, hali ya rollup ya optimistic (akaunti, salio, msimbo wa mkataba, n.k.) hupangwa kama [mti wa Merkle](/whitepaper/#merkle-trees) unaoitwa "mti wa hali". Mzizi wa mti huu wa Merkle (mzizi wa hali), ambao unarejelea hali ya hivi punde ya rollup, huwekwa heshi na kuhifadhiwa katika mkataba wa rollup. Kila mabadiliko ya hali kwenye mnyororo huzalisha hali mpya ya rollup, ambayo mwendeshaji huahidi kwa kukokotoa mzizi mpya wa hali.

Mwendeshaji anahitajika kuwasilisha mizizi ya hali ya zamani na mizizi ya hali mpya wakati wa kuchapisha mafungu. Ikiwa mzizi wa hali ya zamani unalingana na mzizi wa hali uliopo katika mkataba mnyororoni, wa mwisho hutupwa na kubadilishwa na mzizi mpya wa hali.

Mwendeshaji wa rollup pia anahitajika kuahidi mzizi wa Merkle kwa fungu la muamala lenyewe. Hii inaruhusu mtu yeyote kuthibitisha ujumuishaji wa muamala katika fungu (kwenye tabaka la 1 (l1)) kwa kuwasilisha [ushahidi wa Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/).

Ahadi za hali, hasa mizizi ya hali, ni muhimu kwa kuthibitisha usahihi wa mabadiliko ya hali katika rollup ya optimistic. Mkataba wa rollup hukubali mizizi mipya ya hali kutoka kwa waendeshaji mara tu baada ya kuchapishwa, lakini baadaye unaweza kufuta mizizi batili ya hali ili kurejesha rollup katika hali yake sahihi.

### Kuthibitisha udanganyifu {#fraud-proving}

Kama ilivyoelezwa, mikusanyiko ya optimistic inaruhusu mtu yeyote kuchapisha vitalu bila kutoa uthibitisho wa uhalali. Hata hivyo, ili kuhakikisha mnyororo unasalia salama, mikusanyiko ya optimistic hubainisha dirisha la muda ambapo mtu yeyote anaweza kupinga mabadiliko ya hali. Kwa hivyo, vitalu vya rollup huitwa "madai" kwa kuwa mtu yeyote anaweza kupinga uhalali wake.

Ikiwa mtu atapinga dai, basi itifaki ya rollup itaanzisha ukokotoaji wa ushahidi wa udanganyifu. Kila aina ya ushahidi wa udanganyifu ni mwingiliano—mtu lazima achapishe dai kabla ya mtu mwingine kulipinga. Tofauti iko katika ni raundi ngapi za mwingiliano zinahitajika ili kukokotoa ushahidi wa udanganyifu.

Mipango ya uthibitishaji mwingiliano wa raundi moja hucheza tena miamala inayobishaniwa kwenye tabaka la 1 (l1) ili kugundua madai batili. Itifaki ya rollup huiga utekelezaji upya wa muamala unaobishaniwa kwenye tabaka la 1 (l1) (Ethereum) kwa kutumia mkataba wa mhakiki, huku mzizi wa hali uliokokotolewa ukiamua nani atashinda changamoto. Ikiwa dai la mpingaji kuhusu hali sahihi ya rollup ni sahihi, mwendeshaji huadhibiwa kwa kukatwa dhamana yao.

Hata hivyo, kutekeleza upya miamala kwenye tabaka la 1 (l1) ili kugundua udanganyifu kunahitaji kuchapisha ahadi za hali kwa miamala ya kibinafsi na huongeza data ambayo mikusanyiko lazima ichapishe mnyororoni. Kucheza tena miamala pia huingiza gharama kubwa za gesi. Kwa sababu hizi, mikusanyiko ya optimistic inabadilika kwenda kwenye uthibitishaji mwingiliano wa raundi nyingi, ambao hufikia lengo sawa (yaani, kugundua shughuli batili za rollup) kwa ufanisi zaidi.

#### Uthibitishaji mwingiliano wa raundi nyingi {#multi-round-interactive-proving}

Uthibitishaji mwingiliano wa raundi nyingi unahusisha itifaki ya kwenda na kurudi kati ya mdai na mpingaji inayosimamiwa na mkataba wa mhakiki wa tabaka la 1 (l1), ambao hatimaye huamua upande unaodanganya. Baada ya nodi ya tabaka la 2 (l2) kupinga dai, mdai anahitajika kugawanya dai linalobishaniwa katika nusu mbili sawa. Kila dai la kibinafsi katika kesi hii litakuwa na hatua nyingi za ukokotoaji kama lingine.

Mpingaji kisha atachagua dai gani anataka kupinga. Mchakato wa kugawanya (unaoitwa "itifaki ya kugawanya mara mbili") unaendelea hadi pande zote mbili zinabishania dai kuhusu hatua _moja_ ya utekelezaji. Katika hatua hii, mkataba wa tabaka la 1 (l1) utatatua mzozo kwa kutathmini maagizo (na matokeo yake) ili kumkamata mhusika mdanganyifu.

Mdai anahitajika kutoa "ushahidi wa hatua moja" unaothibitisha uhalali wa ukokotoaji wa hatua moja unaobishaniwa. Ikiwa mdai atashindwa kutoa ushahidi wa hatua moja, au mhakiki wa tabaka la 1 (l1) ataona ushahidi huo ni batili, wanashindwa changamoto.

Baadhi ya maelezo kuhusu aina hii ya ushahidi wa udanganyifu:

1. Uthibitishaji mwingiliano wa udanganyifu wa raundi nyingi unachukuliwa kuwa mzuri kwa sababu unapunguza kazi ambayo mnyororo wa tabaka la 1 (l1) lazima ufanye katika usuluhishi wa mizozo. Badala ya kucheza tena muamala mzima, mnyororo wa tabaka la 1 (l1) unahitaji tu kutekeleza upya hatua moja katika utekelezaji wa rollup.

2. Itifaki za kugawanya mara mbili hupunguza kiasi cha data kinachochapishwa mnyororoni (hakuna haja ya kuchapisha ahadi za hali kwa kila muamala). Pia, miamala ya rollup ya optimistic haizuiliwi na kikomo cha gesi cha Ethereum. Kinyume chake, mikusanyiko ya optimistic inayotekeleza upya miamala lazima ihakikishe muamala wa tabaka la 2 (l2) una kikomo cha gesi cha chini ili kuiga utekelezaji wake ndani ya muamala mmoja wa Ethereum.

3. Sehemu ya dhamana ya mdai mwovu hutolewa kwa mpingaji, huku sehemu nyingine inateketezwa. Kuteketeza huzuia njama kati ya wathibitishaji; ikiwa wathibitishaji wawili watakula njama kuanzisha changamoto za uongo, bado watapoteza sehemu kubwa ya dhamana nzima.

4. Uthibitishaji mwingiliano wa raundi nyingi unahitaji pande zote mbili (mdai na mpingaji) kufanya hatua ndani ya dirisha la muda lililobainishwa. Kushindwa kuchukua hatua kabla ya tarehe ya mwisho kuisha husababisha upande ulioshindwa kupoteza changamoto.

#### Kwa nini ushahidi wa udanganyifu ni muhimu kwa mikusanyiko ya optimistic {#fraud-proof-benefits}

Ushahidi wa udanganyifu ni muhimu kwa sababu huwezesha _ukamilifu bila hitaji la uaminifu_ katika mikusanyiko ya optimistic. Ukamilifu bila hitaji la uaminifu ni sifa ya mikusanyiko ya optimistic inayohakikisha kwamba muamala—ilimradi ni halali—hatimaye utathibitishwa.

Nodi mbovu zinaweza kujaribu kuchelewesha uthibitisho wa kitalu halali cha rollup kwa kuanzisha changamoto za uongo. Hata hivyo, ushahidi wa udanganyifu hatimaye utathibitisha uhalali wa kitalu cha rollup na kusababisha kithibitishwe.

Hii pia inahusiana na sifa nyingine ya usalama ya mikusanyiko ya optimistic: uhalali wa mnyororo unategemea kuwepo kwa nodi _moja_ ya uaminifu. Nodi ya uaminifu inaweza kuendeleza mnyororo kwa usahihi kwa kuchapisha madai halali au kupinga madai batili. Vyovyote iwavyo, nodi mbovu zinazoingia katika mizozo na nodi ya uaminifu zitapoteza dhamana zao wakati wa mchakato wa kuthibitisha udanganyifu.

### Mwingiliano wa L1/L2 {#l1-l2-interoperability}

Mikusanyiko ya optimistic imeundwa kwa ajili ya mwingiliano na Mtandao Mkuu wa Ethereum na kuruhusu watumiaji kupitisha ujumbe na data ya kiholela kati ya tabaka la 1 (l1) na tabaka la 2 (l2). Pia zinaendana na EVM, kwa hivyo unaweza kuhamisha [programu tumizi zilizogatuliwa (dapps)](/developers/docs/dapps/) zilizopo kwenye mikusanyiko ya optimistic au kuunda dapps mpya kwa kutumia zana za ukuzaji za Ethereum.

#### 1. Usogezi wa mali {#asset-movement}

##### Kuingia kwenye rollup {#evm-compatibility}

Ili kutumia rollup ya optimistic, watumiaji huweka ETH, tokeni za ERC-20, na mali nyingine zinazokubaliwa katika mkataba wa [daraja](/developers/docs/bridges/) la rollup kwenye tabaka la 1 (l1). Mkataba wa daraja utapitisha muamala kwenye tabaka la 2 (l2), ambapo kiasi sawa cha mali hufuliwa na kutumwa kwa anwani iliyochaguliwa na mtumiaji kwenye rollup ya optimistic.

Miamala inayozalishwa na mtumiaji (kama amana ya L1 > L2) kwa kawaida hupangwa kwenye foleni hadi mpangaji aiwasilishe tena kwenye mkataba wa rollup. Hata hivyo, ili kuhifadhi upinzani wa udhibiti, mikusanyiko ya optimistic inaruhusu watumiaji kuwasilisha muamala moja kwa moja kwenye mkataba wa rollup mnyororoni ikiwa umecheleweshwa kupita muda wa juu unaoruhusiwa.

Baadhi ya mikusanyiko ya optimistic inachukua mbinu ya moja kwa moja zaidi ili kuzuia wapangaji kudhibiti watumiaji. Hapa, kitalu kinafafanuliwa na miamala yote iliyowasilishwa kwenye mkataba wa tabaka la 1 (l1) tangu kitalu kilichopita (k.m., amana) pamoja na miamala iliyochakatwa kwenye mnyororo wa rollup. Ikiwa mpangaji atapuuza muamala wa tabaka la 1 (l1), atachapisha mzizi wa hali usio sahihi (unaothibitishwa); kwa hivyo, wapangaji hawawezi kuchelewesha ujumbe unaozalishwa na mtumiaji pindi unapochapishwa kwenye tabaka la 1 (l1).

##### Kutoka kwenye rollup {#cross-chain-contract-calls}

Kutoa kutoka kwenye rollup ya optimistic kwenda Ethereum ni vigumu zaidi kutokana na mpango wa kuthibitisha udanganyifu. Ikiwa mtumiaji ataanzisha muamala wa L2 > L1 ili kutoa fedha zilizowekwa kwenye tabaka la 1 (l1), lazima asubiri hadi kipindi cha changamoto—kinachodumu takriban siku saba—kipite. Hata hivyo, mchakato wa utoaji wenyewe ni wa moja kwa moja.

Baada ya ombi la utoaji kuanzishwa kwenye rollup ya tabaka la 2 (l2), muamala unajumuishwa katika fungu linalofuata, huku mali za mtumiaji kwenye rollup zikiteketezwa. Pindi fungu linapochapishwa kwenye Ethereum, mtumiaji anaweza kukokotoa ushahidi wa Merkle unaothibitisha ujumuishaji wa muamala wao wa kujitoa katika kitalu. Kisha ni suala la kusubiri kupitia kipindi cha kuchelewa ili kukamilisha muamala kwenye tabaka la 1 (l1) na kutoa fedha kwenye Mtandao Mkuu.

Ili kuepuka kusubiri wiki moja kabla ya kutoa fedha kwenye Ethereum, watumiaji wa rollup ya optimistic wanaweza kutumia **mtoa ukwasi** (LP). Mtoa ukwasi huchukua umiliki wa utoaji unaosubiri wa tabaka la 2 (l2) na kumlipa mtumiaji kwenye tabaka la 1 (l1) (kwa kubadilishana na ada).

Watoa ukwasi wanaweza kuangalia uhalali wa ombi la utoaji la mtumiaji (kwa kutekeleza mnyororo wenyewe) kabla ya kutoa fedha. Kwa njia hii wana uhakika kwamba muamala utathibitishwa hatimaye (yaani, ukamilifu bila hitaji la uaminifu).

#### 2. Utangamano wa EVM {#how-do-optimistic-rollup-fees-work}

Kwa wasanidi programu, faida ya mikusanyiko ya optimistic ni utangamano wao—au, bora zaidi, usawa—na [Mashine Pepe ya Ethereum (EVM)](/developers/docs/evm/). Mikusanyiko inayoendana na EVM inatii vipimo katika [waraka wa manjano wa Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf) na inasaidia EVM katika kiwango cha msimbo wa baiti.

Utangamano wa EVM katika mikusanyiko ya optimistic una faida zifuatazo:

i. Wasanidi programu wanaweza kuhamisha mikataba mahiri iliyopo kwenye Ethereum kwenda kwenye minyororo ya rollup ya optimistic bila kulazimika kurekebisha misingi ya msimbo kwa kiasi kikubwa. Hii inaweza kuokoa muda wa timu za ukuzaji wakati wa kusambaza mikataba mahiri ya Ethereum kwenye tabaka la 2 (l2).

ii. Wasanidi programu na timu za miradi zinazotumia mikusanyiko ya optimistic zinaweza kuchukua faida ya miundombinu ya Ethereum. Hii inajumuisha lugha za programu, maktaba za msimbo, zana za majaribio, programu za mteja, miundombinu ya usambazaji, na kadhalika.

Kutumia zana zilizopo ni muhimu kwa sababu zana hizi zimekaguliwa kwa kina, kurekebishwa makosa, na kuboreshwa kwa miaka mingi. Pia huondoa hitaji la wasanidi programu wa Ethereum kujifunza jinsi ya kujenga kwa kutumia mrundikano mpya kabisa wa ukuzaji.

#### 3. Wito wa mkataba wa mtambuko-mnyororo {#scaling-ethereum-with-optimistic-rollups}

Watumiaji (akaunti zinazomilikiwa na nje) huingiliana na mikataba ya tabaka la 2 (l2) kwa kuwasilisha muamala kwenye mkataba wa rollup au kuwa na mpangaji au mthibitishaji kuwafanyia. Mikusanyiko ya optimistic pia inaruhusu akaunti za mkataba kwenye Ethereum kuingiliana na mikataba ya tabaka la 2 (l2) kwa kutumia mikataba ya daraja kupitisha ujumbe na kupitisha data kati ya tabaka la 1 (l1) na tabaka la 2 (l2). Hii inamaanisha unaweza kupanga mkataba wa tabaka la 1 (l1) kwenye Mtandao Mkuu wa Ethereum ili kuita utendakazi wa mikataba kwenye rollup ya optimistic ya tabaka la 2 (l2).

Wito wa mkataba wa mtambuko-mnyororo hutokea kwa njia isiyolingana—ikimaanisha wito huanzishwa kwanza, kisha hutekelezwa baadaye. Hii ni tofauti na wito kati ya mikataba miwili kwenye Ethereum, ambapo wito hutoa matokeo mara moja.

Mfano wa wito wa mkataba wa mtambuko-mnyororo ni amana ya tokeni iliyoelezwa hapo awali. Mkataba kwenye tabaka la 1 (l1) huweka tokeni za mtumiaji na kutuma ujumbe kwa mkataba wa tabaka la 2 (l2) uliounganishwa ili kufua kiasi sawa cha tokeni kwenye rollup.

Kwa kuwa wito wa ujumbe wa mtambuko-mnyororo husababisha utekelezaji wa mkataba, mtumaji kwa kawaida anahitajika kulipia [gharama za gesi](/developers/docs/gas/) kwa ukokotoaji. Inashauriwa kuweka kikomo cha gesi cha juu ili kuzuia muamala kushindwa kwenye mnyororo lengwa. Hali ya daraja la tokeni ni mfano mzuri; ikiwa upande wa tabaka la 1 (l1) wa muamala (kuweka tokeni) unafanya kazi, lakini upande wa tabaka la 2 (l2) (kufua tokeni mpya) unashindwa kutokana na gesi ndogo, amana inakuwa isiyoweza kurejeshwa.

Hatimaye, tunapaswa kutambua kwamba wito wa ujumbe wa L2 > L1 kati ya mikataba unahitaji kuzingatia ucheleweshaji (wito wa L1 > L2 kwa kawaida hutekelezwa baada ya dakika chache). Hii ni kwa sababu ujumbe uliotumwa kwenye Mtandao Mkuu kutoka kwenye rollup ya optimistic hauwezi kutekelezwa hadi dirisha la changamoto liishe.

## Ada za rollup ya optimistic zinafanyaje kazi? {#optimistic-rollups-pros-and-cons}

Mikusanyiko ya optimistic hutumia mpango wa ada ya gesi, sawa na Ethereum, kuashiria kiasi ambacho watumiaji wanalipa kwa kila muamala. Ada zinazotozwa kwenye mikusanyiko ya optimistic zinategemea vipengele vifuatavyo:

1. **Uandishi wa hali**: Mikusanyiko ya optimistic huchapisha data ya muamala na vichwa vya kizuizi (vinavyojumuisha heshi ya kichwa cha kizuizi kilichopita, mzizi wa hali, mzizi wa fungu) kwenye Ethereum kama `blob`, au "binary large object". [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) ilianzisha suluhisho la gharama nafuu la kujumuisha data mnyororoni. `blob` ni uwanja mpya wa muamala unaoruhusu mikusanyiko kuchapisha data iliyobanwa ya mabadiliko ya hali kwenye tabaka la 1 (l1) la Ethereum. Tofauti na `calldata`, ambayo inasalia mnyororoni kabisa, mablobu ni ya muda mfupi na yanaweza kupunguzwa kutoka kwa wateja baada ya [zama 4096](https://github.com/ethereum/consensus-specs/blob/81f3ea8322aff6b9fb15132d050f8f98b16bdba4/configs/mainnet.yaml#L147) (takriban siku 18). Kwa kutumia mablobu kuchapisha mafungu ya miamala iliyobanwa, mikusanyiko ya optimistic inaweza kupunguza kwa kiasi kikubwa gharama ya kuandika miamala kwenye tabaka la 1 (l1).

2. **Gesi ya blobu iliyotumika**: Miamala inayobeba blobu hutumia utaratibu wa ada unaobadilika sawa na ule ulioanzishwa na [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559). Ada ya gesi kwa miamala ya aina ya 3 inazingatia ada ya msingi kwa mablobu, ambayo huamuliwa by mtandao kulingana na mahitaji ya nafasi ya blobu na matumizi ya nafasi ya blobu ya muamala unaotumwa.

3. **Ada za mwendeshaji wa L2**: Hiki ni kiasi kinacholipwa kwa nodi za rollup kama fidia kwa gharama za ukokotoaji zinazoingia katika kuchakata miamala, sawa na ada za gesi kwenye Ethereum. Nodi za rollup hutoza ada za chini za muamala kwa kuwa tabaka za 2 (l2) zina uwezo mkubwa wa kuchakata na hazikabiliwi na msongamano wa mtandao unaolazimisha wathibitishaji kwenye Ethereum kutoa kipaumbele kwa miamala yenye ada kubwa.

Mikusanyiko ya optimistic hutumia taratibu kadhaa kupunguza ada kwa watumiaji, ikiwa ni pamoja na ukusanyaji wa mafungu ya miamala na kubana `calldata` ili kupunguza gharama za uchapishaji wa data. Unaweza kuangalia [kifuatiliaji cha ada cha L2](https://l2fees.info/) kwa muhtasari wa wakati halisi wa kiasi gani inagharimu kutumia mikusanyiko ya optimistic inayotegemea Ethereum.

## Mikusanyiko ya optimistic inaongezaje uwezo wa Ethereum? {#optimistic-video}

Kama ilivyoelezwa, mikusanyiko ya optimistic huchapisha data ya muamala iliyobanwa kwenye Ethereum ili kuhakikisha upatikanaji wa data. Uwezo wa kubana data iliyochapishwa mnyororoni ni muhimu kwa kuongeza uwezo wa upitishaji kwenye Ethereum kwa mikusanyiko ya optimistic.

Mnyororo mkuu wa Ethereum huweka mipaka ya kiasi cha data ambacho vitalu vinaweza kushikilia, kinachotajwa katika vipimo vya gesi ([ukubwa wa wastani wa kitalu](/developers/docs/blocks/#block-size) ni gesi milioni 15). Ingawa hii inazuia kiasi cha gesi ambacho kila muamala unaweza kutumia, pia inamaanisha tunaweza kuongeza miamala inayochakatwa kwa kila kitalu kwa kupunguza data inayohusiana na muamala—kuboresha moja kwa moja uwezo wa kuongezeka.

Mikusanyiko ya optimistic hutumia mbinu kadhaa kufikia ubanaji wa data ya muamala na kuboresha viwango vya TPS. Kwa mfano, [makala](https://vitalik.eth.limo/general/2021/01/05/rollup.html) hii inalinganisha data ambayo muamala wa msingi wa mtumiaji (kutuma Etha) unazalisha kwenye Mtandao Mkuu dhidi ya kiasi cha data ambacho muamala huo huo unazalisha kwenye rollup:

| Kigezo | Ethereum (L1)          | Rollup (L2)   |
| --------- | ---------------------- | ------------- |
| Nonsi     | ~3                     | 0             |
| Bei ya gesi  | ~8                     | 0-0.5         |
| Gesi       | 3                      | 0-0.5         |
| Kwenda        | 21                     | 4             |
| Thamani     | 9                      | ~3            |
| Sahihi | ~68 (2 + 33 + 33)      | ~0.5          |
| Kutoka      | 0 (iliyorejeshwa kutoka kwa sahihi) | 4             |
| **Jumla** | **~baiti 112**         | **~baiti 12** |

Kufanya baadhi ya ukokotoaji wa makadirio kwenye takwimu hizi kunaweza kusaidia kuonyesha maboresho ya uwezo wa kuongezeka yanayotolewa na rollup ya optimistic:

1. Ukubwa unaolengwa kwa kila kitalu ni gesi milioni 15 na inagharimu gesi 16 kuthibitisha baiti moja ya data. Kugawanya ukubwa wa wastani wa kitalu kwa gesi 16 (15,000,000/16) kunaonyesha kitalu cha wastani kinaweza kushikilia **baiti 937,500 za data**.
2. Ikiwa muamala wa msingi wa rollup unatumia baiti 12, basi kitalu cha wastani cha Ethereum kinaweza kuchakata **miamala 78,125 ya rollup** (937,500/12) au **mafungu 39 ya rollup** (ikiwa kila fungu linashikilia wastani wa miamala 2,000).
3. Ikiwa kitalu kipya kinazalishwa kwenye Ethereum kila sekunde 15, basi kasi ya uchakataji ya rollup itafikia takriban **miamala 5,208 kwa sekunde**. Hii inafanywa kwa kugawanya idadi ya miamala ya msingi ya rollup ambayo kitalu cha Ethereum kinaweza kushikilia (**78,125**) kwa muda wa kitalu wa wastani (**sekunde 15**).

Hili ni kadirio la matumaini kiasi, ikizingatiwa kwamba miamala ya rollup ya optimistic haiwezi kujumuisha kitalu kizima kwenye Ethereum. Hata hivyo, inaweza kutoa wazo la makadirio la kiasi gani cha faida za uwezo wa kuongezeka ambazo mikusanyiko ya optimistic inaweza kuwapa watumiaji wa Ethereum (utekelezaji wa sasa unatoa hadi TPS 2,000).

Kuanzishwa kwa [kugawanya data (data sharding)](/roadmap/danksharding/) kwenye Ethereum kunatarajiwa kuboresha uwezo wa kuongezeka katika mikusanyiko ya optimistic. Kwa sababu miamala ya rollup lazima ishiriki nafasi ya kitalu na miamala mingine isiyo ya rollup, uwezo wao wa kuchakata unazuiliwa na uwezo wa upitishaji wa data kwenye mnyororo mkuu wa Ethereum. Danksharding itaongeza nafasi inayopatikana kwa minyororo ya tabaka la 2 (l2) kuchapisha data kwa kila kitalu, kwa kutumia hifadhi ya "blobu" ya bei nafuu, isiyodumu badala ya `CALLDATA` ghali, ya kudumu.

### Faida na hasara za mikusanyiko ya optimistic {#further-reading-on-optimistic-rollups}

| Faida                                                                                                                                                  | Hasara                                                                                                                                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Inatoa maboresho makubwa katika uwezo wa kuongezeka bila kutoa kafara usalama au hali ya kutohitaji kuamini.                                                             | Ucheleweshaji katika ukamilifu wa muamala kutokana na changamoto zinazowezekana za udanganyifu.                                                                                   |
| Data ya muamala inahifadhiwa kwenye mnyororo wa tabaka la 1 (l1), kuboresha uwazi, usalama, upinzani wa udhibiti, na ugatuzi.                       | Waendeshaji wa rollup waliowekwa kati (wapangaji) wanaweza kuathiri upangaji wa muamala.                                                                       |
| Kuthibitisha udanganyifu kunahakikisha ukamilifu bila hitaji la uaminifu na kuruhusu wachache waaminifu kulinda mnyororo.                                                         | Ikiwa hakuna nodi za uaminifu mwendeshaji mwovu anaweza kuiba fedha kwa kuchapisha vitalu batili na ahadi za hali.                                  |
| Kukokotoa ushahidi wa udanganyifu kuko wazi kwa nodi ya kawaida ya tabaka la 2 (l2), tofauti na uthibitisho wa uhalali (unaotumika katika mikusanyiko ya ZK) unaohitaji maunzi maalum.                         | Muundo wa usalama unategemea angalau nodi moja ya uaminifu inayotekeleza miamala ya rollup na kuwasilisha ushahidi wa udanganyifu ili kupinga mabadiliko batili ya hali. |
| Mikusanyiko inafaidika na "uhai bila hitaji la uaminifu" (mtu yeyote anaweza kulazimisha mnyororo kusonga mbele kwa kutekeleza miamala na kuchapisha madai)                    | Watumiaji lazima wasubiri kipindi cha changamoto cha wiki moja kiishe kabla ya kutoa fedha kurudi kwenye Ethereum.                                              |
| Mikusanyiko ya optimistic inategemea motisha za kiuchumi za kificho zilizoundwa vizuri ili kuongeza usalama kwenye mnyororo.                                                 | Mikusanyiko lazima ichapishe data yote ya muamala mnyororoni, ambayo inaweza kuongeza gharama.                                                                          |
| Utangamano na EVM na Solidity unaruhusu wasanidi programu kuhamisha mikataba mahiri asili ya Ethereum kwenye mikusanyiko au kutumia zana zilizopo kuunda dapps mpya. |

### Maelezo ya kuona ya mikusanyiko ya optimistic {#tutorials}

Je, wewe ni mwanafunzi wa kuona zaidi? Tazama Finematics akielezea mikusanyiko ya optimistic:

<VideoWatch slug="rollups-scaling-strategy" startTime="263" />

## Usomaji zaidi kuhusu mikusanyiko ya optimistic

- [Mikusanyiko ya optimistic inafanyaje kazi (Mwongozo Kamili)](https://www.alchemy.com/overviews/optimistic-rollups)
- [Rollup ya Mnyororo wa Vitalu ni nini? Utangulizi wa Kiufundi](https://www.ethereum-ecosystem.com/blog/what-is-a-blockchain-rollup-a-technical-introduction)
- [Mwongozo Muhimu wa Arbitrum](https://www.bankless.com/the-essential-guide-to-arbitrum)
- [Mwongozo wa Vitendo wa Mikusanyiko ya Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [Hali ya Ushahidi wa Udanganyifu katika L2 za Ethereum](https://web.archive.org/web/20241124154627/https://research.2077.xyz/the-state-of-fraud-proofs-in-ethereum-l2s)
- [Rollup ya Optimism inafanyaje kazi hasa?](https://www.paradigm.xyz/2021/01/how-does-optimism-s-rollup-really-work)
- [Uchunguzi wa Kina wa OVM](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [Mashine Pepe ya Optimistic ni nini?](https://www.alchemy.com/overviews/optimistic-virtual-machine)

## Mafunzo: Mikusanyiko ya optimistic na madaraja kwenye Ethereum

- [Mapitio ya mkataba wa daraja la kawaida la Optimism](/developers/tutorials/optimism-std-bridge-annotated-code/) _– Mapitio ya msimbo yaliyofafanuliwa ya daraja la kawaida la Optimism kwa kusogeza mali kati ya tabaka la 1 (l1) na tabaka la 2 (l2)._