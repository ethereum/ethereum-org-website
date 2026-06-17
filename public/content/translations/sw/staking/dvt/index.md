---
title: Teknolojia ya kithibitishaji kilichosambazwa
description: Teknolojia ya kithibitishaji kilichosambazwa inawezesha uendeshaji uliosambazwa wa mthibitishaji wa Ethereum na pande nyingi.
lang: sw
---

Teknolojia ya kithibitishaji kilichosambazwa (DVT) ni mbinu ya usalama wa mthibitishaji inayosambaza usimamizi wa ufunguo na majukumu ya kusaini kwa pande nyingi, ili kupunguza sehemu moja ya kushindwa, na kuongeza uthabiti wa mthibitishaji.

Inafanya hivi kwa **kugawanya ufunguo wa siri** unaotumika kulinda mthibitishaji **kwenye kompyuta nyingi** zilizopangwa katika "kikundi". Faida ya hii ni kwamba inafanya iwe vigumu sana kwa washambuliaji kupata ufikiaji wa ufunguo, kwa sababu hauhifadhiwi kikamilifu kwenye mashine yoyote moja. Pia inaruhusu baadhi ya nodi kwenda nje ya mtandao, kwani kusaini muhimu kunaweza kufanywa na kikundi kidogo cha mashine katika kila kikundi. Hii inapunguza sehemu moja ya kushindwa kutoka kwenye mtandao na kufanya seti nzima ya mthibitishaji kuwa imara zaidi.

![A Diagram showing how a single validator key is split into key shares and distributed to multiple nodes with varying components.](./dvt-cluster.png)

## Kwa nini tunahitaji DVT? {#why-do-we-need-dvt}

### Usalama {#security}

Wathibitishaji huzalisha jozi mbili za ufunguo wa umma na siri: funguo za mthibitishaji kwa ajili ya kushiriki katika mwafaka na funguo za utoaji kwa ajili ya kufikia fedha. Ingawa wathibitishaji wanaweza kulinda funguo za utoaji katika hifadhi baridi, funguo za siri za mthibitishaji lazima ziwe mtandaoni 24/7. Ikiwa ufunguo wa siri wa mthibitishaji utaingiliwa, mshambuliaji anaweza kudhibiti mthibitishaji, na uwezekano wa kusababisha ukataji au upotevu wa ETH ya mweka dhamana. DVT inaweza kusaidia kupunguza hatari hii. Hivi ndivyo inavyofanya:

Kwa kutumia DVT, waweka dhamana wanaweza kushiriki katika uwekaji dhamana huku wakiweka ufunguo wa siri wa mthibitishaji katika hifadhi baridi. Hili linafikiwa kwa kusimba ufunguo asili, kamili wa mthibitishaji na kisha kuugawanya katika hisa za ufunguo. Hisa za ufunguo hukaa mtandaoni na husambazwa kwa nodi nyingi ambazo zinawezesha uendeshaji uliosambazwa wa mthibitishaji. Hili linawezekana kwa sababu wathibitishaji wa [Ethereum](/) hutumia sahihi za BLS ambazo ni za kuongeza, ikimaanisha ufunguo kamili unaweza kujengwa upya kwa kujumlisha sehemu zake. Hii inaruhusu mweka dhamana kuweka ufunguo kamili, asili wa 'kuu' wa mthibitishaji kwa usalama nje ya mtandao.

### Hakuna sehemu moja ya kushindwa {#no-single-point-of-failure}

Wakati mthibitishaji amegawanywa kwa waendeshaji wengi na mashine nyingi, anaweza kuhimili kushindwa kwa maunzi na programu binafsi bila kwenda nje ya mtandao. Hatari ya kushindwa inaweza pia kupunguzwa kwa kutumia usanidi tofauti wa maunzi na programu kwenye nodi katika kikundi. Uthabiti huu haupatikani kwa usanidi wa mthibitishaji wa nodi moja - unatokana na safu ya DVT.

Ikiwa moja ya vipengele vya mashine katika kikundi itashindwa kufanya kazi (kwa mfano, ikiwa kuna waendeshaji wanne katika kikundi cha mthibitishaji na mmoja anatumia mteja maalum ambaye ana hitilafu), wengine wanahakikisha kwamba mthibitishaji anaendelea kufanya kazi.

### Ugatuzi {#decentralization}

Hali bora kwa Ethereum ni kuwa na wathibitishaji wengi wanaojitegemea iwezekanavyo. Hata hivyo, watoa huduma wachache wa uwekaji dhamana wamekuwa maarufu sana na wanachukua sehemu kubwa ya jumla ya ETH iliyowekwa dhamana kwenye mtandao. DVT inaweza kuruhusu waendeshaji hawa kuwepo huku ikihifadhi ugatuzi wa dhamana. Hii ni kwa sababu funguo za kila mthibitishaji zinasambazwa kwenye mashine nyingi na itachukua njama kubwa zaidi kwa mthibitishaji kuwa mbaya.

Bila DVT, ni rahisi kwa watoa huduma wa uwekaji dhamana kusaidia usanidi mmoja au miwili tu ya mteja kwa wathibitishaji wao wote, na kuongeza athari ya hitilafu ya mteja. DVT inaweza kutumika kusambaza hatari kwenye usanidi mwingi wa mteja na maunzi tofauti, na kuunda uthabiti kupitia utofauti.

**DVT inatoa faida zifuatazo kwa Ethereum:**

1. **Ugatuzi** wa mwafaka wa Uthibitisho wa Dau (PoS) wa Ethereum
2. Inahakikisha **uhai** wa mtandao
3. Inaunda **uvumilivu wa makosa** wa mthibitishaji
4. Uendeshaji wa mthibitishaji **uliopunguza uaminifu**
5. **Kupunguza ukataji** na hatari za muda wa kutofanya kazi
6. **Inaboresha utofauti** (mteja, kituo cha data, eneo, udhibiti, n.k.)
7. **Usalama ulioimarishwa** wa usimamizi wa ufunguo wa mthibitishaji

## DVT inafanyaje kazi? {#how-does-dvt-work}

Suluhisho la DVT lina vipengele vifuatavyo:

- **[Ugawaji wa siri wa Shamir](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Wathibitishaji hutumia [funguo za BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). "Hisa za ufunguo" za BLS binafsi ("hisa za ufunguo") zinaweza kuunganishwa kuwa ufunguo mmoja uliokusanywa (sahihi). Katika DVT, ufunguo wa siri wa mthibitishaji ni sahihi ya BLS iliyojumuishwa ya kila mwendeshaji katika kikundi.
- **[Mpango wa sahihi wa kizingiti](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Huamua idadi ya hisa za ufunguo binafsi zinazohitajika kwa majukumu ya kusaini, k.m., 3 kati ya 4.
- **[Uzalishaji wa ufunguo uliosambazwa (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Mchakato wa kificho unaozalisha hisa za ufunguo na hutumika kusambaza hisa za ufunguo wa mthibitishaji uliopo au mpya kwa nodi katika kikundi.
- **[Ukokotoaji wa pande nyingi (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - Ufunguo kamili wa mthibitishaji unazalishwa kwa siri kwa kutumia ukokotoaji wa pande nyingi. Ufunguo kamili haujulikani kamwe kwa mwendeshaji yeyote binafsi—wanajua tu sehemu yao wenyewe (hisa yao).
- **Itifaki ya mwafaka** - Itifaki ya mwafaka huchagua nodi moja kuwa mpendekezaji wa bloku. Wanashiriki kitalu na nodi zingine katika kikundi, ambao huongeza hisa zao za ufunguo kwenye sahihi iliyokusanywa. Wakati hisa za ufunguo za kutosha zimekusanywa, kitalu kinapendekezwa kwenye Ethereum.

Wathibitishaji waliosambazwa wana uvumilivu wa makosa uliojengewa ndani na wanaweza kuendelea kufanya kazi hata kama baadhi ya nodi binafsi zitaenda nje ya mtandao. Hii inamaanisha kuwa kikundi ni imara hata kama baadhi ya nodi ndani yake zitakuwa mbaya au wavivu.

## Matumizi ya DVT {#dvt-use-cases}

DVT ina athari kubwa kwa tasnia pana ya uwekaji dhamana:

### Waweka dhamana wa pekee {#solo-stakers}

DVT pia inawezesha uwekaji dhamana isiyo ya udhamini kwa kukuruhusu kusambaza ufunguo wako wa mthibitishaji kwenye nodi za mbali huku ukiweka ufunguo kamili nje ya mtandao kabisa. Hii inamaanisha waweka dhamana wa nyumbani hawahitaji lazima kutumia pesa kwa maunzi, huku kusambaza hisa za ufunguo kunaweza kusaidia kuwaimarisha dhidi ya udukuzi unaowezekana.

### Kuweka hisa kama huduma (SaaS) {#saas}

Waendeshaji (kama vile mabwawa ya uwekaji dhamana na waweka dhamana wa kitaasisi) wanaosimamia wathibitishaji wengi wanaweza kutumia DVT kupunguza hatari yao. Kwa kusambaza miundombinu yao, wanaweza kuongeza urudufu kwenye shughuli zao na kubadilisha aina za maunzi wanayotumia.

DVT inashiriki jukumu la usimamizi wa ufunguo kwenye nodi nyingi, ikimaanisha baadhi ya gharama za uendeshaji zinaweza pia kushirikiwa. DVT inaweza pia kupunguza hatari ya uendeshaji na gharama za bima kwa watoa huduma wa uwekaji dhamana.

### Mabwawa ya uwekaji dhamana {#staking-pools}

Kutokana na usanidi wa kawaida wa mthibitishaji, mabwawa ya uwekaji dhamana na watoa huduma wa uwekaji dhamana wenye ukwasi wanalazimika kuwa na viwango tofauti vya uaminifu wa mwendeshaji mmoja kwa kuwa faida na hasara zinashirikiwa katika bwawa lote. Pia wanategemea waendeshaji kulinda funguo za kusaini kwa sababu, hadi sasa, hakujawa na chaguo jingine kwao.

Ingawa kijadi juhudi hufanywa kusambaza hatari kwa kusambaza dhamana kwa waendeshaji wengi, kila mwendeshaji bado anasimamia dhamana kubwa kwa kujitegemea. Kutegemea mwendeshaji mmoja kunaleta hatari kubwa ikiwa watafanya vibaya, watakumbana na muda wa kutofanya kazi, wataingiliwa, au kutenda kwa nia mbaya.

Kwa kutumia DVT, uaminifu unaohitajika kutoka kwa waendeshaji unapunguzwa kwa kiasi kikubwa. **Mabwawa yanaweza kuwezesha waendeshaji kushikilia dhamana bila kuhitaji udhamini wa funguo za mthibitishaji** (kwa kuwa hisa za ufunguo pekee ndizo zinazotumika). Pia inaruhusu dhamana zinazosimamiwa kusambazwa kati ya waendeshaji wengi zaidi (k.m., badala ya kuwa na mwendeshaji mmoja anayesimamia wathibitishaji 1000, DVT inawezesha wathibitishaji hao kuendeshwa kwa pamoja na waendeshaji wengi). Usanidi tofauti wa mwendeshaji utahakikisha kwamba ikiwa mwendeshaji mmoja atashindwa kufanya kazi, wengine bado wataweza kuthibitisha. Hii inasababisha urudufu na utofauti ambao husababisha utendaji bora na uthabiti, huku ikiongeza tuzo.

Faida nyingine ya kupunguza uaminifu wa mwendeshaji mmoja ni kwamba mabwawa ya uwekaji dhamana yanaweza kuruhusu ushiriki wa mwendeshaji ulio wazi zaidi na bila ruhusa. Kwa kufanya hivi, huduma zinaweza kupunguza hatari yao na kusaidia ugatuzi wa Ethereum kwa kutumia seti zote zilizoratibiwa na bila ruhusa za waendeshaji, kwa mfano, kwa kuoanisha waweka dhamana wa nyumbani au wadogo zaidi na wale wakubwa.

## Hasara zinazowezekana za kutumia DVT {#potential-drawbacks-of-using-dvt}

- **Kipengele cha ziada** - kuanzisha nodi ya DVT kunaongeza sehemu nyingine ambayo inaweza kuwa na hitilafu au hatari. Njia ya kupunguza hili ni kujitahidi kwa utekelezaji mwingi wa nodi ya DVT, ikimaanisha wateja wengi wa DVT (sawa na jinsi kuna wateja wengi kwa tabaka za mwafaka na utekelezaji).
- **Gharama za uendeshaji** - kwa kuwa DVT inasambaza mthibitishaji kati ya pande nyingi, kuna nodi nyingi zinazohitajika kwa uendeshaji badala ya nodi moja tu, ambayo inaleta ongezeko la gharama za uendeshaji.
- **Uwezekano wa kuongezeka kwa ucheleweshaji** - kwa kuwa DVT inatumia itifaki ya mwafaka kufikia mwafaka kati ya nodi nyingi zinazoendesha mthibitishaji, inaweza kuleta ongezeko la ucheleweshaji.

## Usomaji Zaidi {#further-reading}

- [Vipimo vya kithibitishaji kilichosambazwa cha Ethereum (kiwango cha juu)](https://github.com/ethereum/distributed-validator-specs)
- [Vipimo vya kiufundi vya kithibitishaji kilichosambazwa cha Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Programu ya onyesho ya ugawaji wa siri wa Shamir](https://iancoleman.io/shamir/)