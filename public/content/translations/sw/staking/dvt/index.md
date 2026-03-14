---
title: Teknolojia ya mthibitishaji iliyosambazwa
description: Teknolojia ya mthibitishaji iliyosambazwa inawezesha utendakazi uliosambazwa wa mthibitishaji wa Ethereum na wahusika wengi.
lang: sw
---

# Teknolojia ya mthibitishaji iliyosambazwa {#distributed-validator-technology}

Teknolojia ya kiidhinishaji inayosambazwa (DVT) ni mbinu ya usalama wa kiidhinishaji ambayo inaeneza usimamizi muhimu na majukumu ya kutia saini katika pande nyingi, ili kupunguza pointi moja ya kushindwa, na kuongeza uthabiti wa kithibitishaji.

Inafanya hivi kwa **kugawanya ufunguo binafsi** unaotumika kulinda mthibitishaji **katika kompyuta nyingi** zilizopangwa katika "nguzo". Faida ya hii ni kwamba inafanya kuwa vigumu sana kwa washambuliaji kupata ufikiaji wa neno la siri, kwa sababu haijahifadhiwa kikamilifu kwenye mashine yoyote. Pia inaruhusu nodi zingine kwenda nje ya mtandao, kwani utiaji saini unaohitajika unaweza kufanywa na kikundi kidogo cha mashine katika kila nguzo. Hii inapunguza sehemu moja ya kushindwa kutoka kwa mtandao na kufanya seti nzima ya mthibitishaji kuwa imara zaidi.

![Mchoro unaoonyesha jinsi ufunguo mmoja wa mthibitishaji unavyogawanywa katika hisa za ufunguo na kusambazwa kwa nodi nyingi zenye vipengele tofauti.](./dvt-cluster.png)

## Kwa nini tunahitaji DVT? {#why-do-we-need-dvt}

### Usalama {#security}

Wathibitishaji huzalisha jozi mbili za funguo za umma-binafsi: funguo za mthibitishaji za kushiriki katika makubaliano na funguo za uondoaji kwa ajili ya kufikia fedha. Wakati wathibitishaji wanaweza kulinda funguo za uondoaji katika ghala baridi, funguo binafsi za mthibitishaji lazima ziwe mtandaoni 24/7. Ikiwa ufunguo binafsi wa mthibitishaji utaingiliwa, mshambulizi anaweza kudhibiti mthibitishaji, jambo ambalo linaweza kusababisha kupunguzwa au kupoteza ETH ya mweka dau. DVT inaweza kusaidia kupunguza hatari hii. Hivi ndivyo:

Kwa kutumia DVT, waweka dau wanaweza kushiriki katika kusimamisha huku wakiweka ufunguo binafsi wa mthibitishaji katika ghala baridi. Hili linafikiwa kwa kusimba kwa njia fiche ufunguo halisi na kamili wa mthibitishaji na kisha kuugawanya katika hisa za ufunguo. Hisa za ufunguo huwa mtandaoni na husambazwa kwa nodi nyingi ambazo huwezesha utendakazi uliosambazwa wa mthibitishaji. Hili linawezekana kwa sababu wathibitishaji wa Ethereum hutumia sahihi za BLS ambazo ni nyongeza, kumaanisha ufunguo kamili unaweza kujengwa upya kwa muhtasari wa sehemu zao za vijenzi. Hii inamruhusu mweka dau kuweka ufunguo kamili, halisi wa 'mkuu' wa mthibitishaji nje ya mtandao kwa usalama.

### Hakuna sehemu moja ya kushindwa {#no-single-point-of-failure}

Kithibitishaji kinapogawanywa kati ya waendeshaji wengi na mashine nyingi, kinaweza kuhimili hitilafu za maunzi na programu bila kwenda nje ya mtandao. Hatari ya kushindwa inaweza pia kupunguzwa kwa kutumia usanidi mbalimbali wa maunzi na programu katika nodi zote kwenye nguzo. Ustahimilivu huu haupatikani kwa usanidi wa mthibitishaji wa nodi moja - unatokana na safu ya DVT.

Ikiwa moja ya vipengee vya mashine kwenye nguzo itashuka (kwa mfano, ikiwa kuna waendeshaji wanne kwenye nguzo ya kihalalishaji na mmoja anatumia mteja mahususi ambaye ana hitilafu), wengine huhakikisha kwamba kihalalishaji kinaendelea kufanya kazi.

### Ugatuaji {#decentralization}

Hali bora kwa Ethereum ni kuwa na wathibitishaji wengi wanaojiendesha kwa uhuru iwezekanavyo. Hata hivyo, watoa huduma wachache wa kusimamisha wamekuwa maarufu sana na wanachangia sehemu kubwa ya jumla ya ETH iliyosimamishwa kwenye mtandao. DVT inaweza kuruhusu waendeshaji hawa kuwepo huku ikihifadhi ugatuaji wa hisa. Hii ni kwa sababu funguo za kila kithibitishaji husambazwa kwenye mashine nyingi na ingetakiwa kuwe na ushirikiano mkubwa zaidi kwa kithibitishaji kuwa atumie mbinu za uharibifu.

Bila DVT, ni rahisi kwa watoa huduma kuhatarisha mipangilio ya usanifu wa mteja mmoja au wawili tu kwa vithibitishaji vyao vyote, na kuongeza athari ya hitilafu ya mteja. DVT inaweza kutumika kueneza hatari katika usanidi mbalimbali wa wateja na maunzi tofauti, na kujenga ustahimilivu kupitia utofauti.

**DVT inatoa manufaa yafuatayo kwa Ethereum:**

1. **Ugatuaji** wa makubaliano ya uthibitisho-wa-hisa ya Ethereum
2. Inahakikisha **uhai** wa mtandao
3. Inaunda **uvumilivu wa makosa** ya mthibitishaji
4. Utendakazi wa mthibitishaji wenye **uaminifu uliopunguzwa**
5. **Hatari zilizopunguzwa za upunguzaji** na za kutokuwepo mtandaoni
6. **Inaboresha utofauti** (mteja, kituo cha data, eneo, kanuni, nk.)
7. **Usalama ulioimarishwa** wa usimamizi wa ufunguo wa mthibitishaji

## Je, DVT inafanyaje kazi? {#how-does-dvt-work}

Suluhisho la DVT lina vipengele vifuatavyo:

- **[Ugawanaji wa siri wa Shamir](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Wathibitishaji hutumia [funguo za BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). "Hisa za ufunguo" za BLS za kibinafsi ("hisa za ufunguo") zinaweza kuunganishwa kuwa ufunguo mmoja uliokusanywa (saini). Katika DVT, ufunguo binafsi wa mthibitishaji ni saini ya pamoja ya BLS ya kila mwendeshaji katika nguzo.
- **[Mpango wa saini ya kizingiti](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Huamua idadi ya hisa za ufunguo za kibinafsi zinazohitajika kwa ajili ya majukumu ya kutia saini, k.m., 3 kati ya 4.
- **[Uzalisahji wa ufunguo uliosambazwa (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Mchakato wa kriptografia ambao huzalisha hisa za ufunguo na hutumika kusambaza hisa za ufunguo wa mthibitishaji uliopo au mpya kwa nodi zilizo kwenye nguzo.
- **[Ukokotoaji wa wahusika wengi (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - Ufunguo kamili wa mthibitishaji huzalishwa kwa siri kwa kutumia ukokotoaji wa wahusika wengi. Ufunguo kamili haujulikani kamwe na mwendeshaji yeyote binafsi—wanajua tu sehemu yao wenyewe (yaani "hisa" yao).
- **Itifaki ya makubaliano** - Itifaki ya makubaliano huchagua nodi moja kuwa mpendekezaji wa bloku. Wanashiriki bloku na nodi zingine kwenye nguzo, ambazo huongeza hisa zao za ufunguo kwenye saini iliyokusanywa. Wakati hisa za kutosha za ufunguo zimekusanywa, bloku inapendekezwa kwenye Ethereum.

Wathibitishaji waliosambazwa wana uvumilivu wa makosa uliojengewa ndani na wanaweza kuendelea kufanya kazi hata kama baadhi ya nodi za kibinafsi zitatoka mtandaoni. Hii inamaanisha kuwa nguzo ni stahimilivu hata kama baadhi ya nodi zilizo ndani yake zitakuwa na nia mbaya au wavivu.

## Matumizi ya DVT {#dvt-use-cases}

DVT ina athari kubwa kwa sekta pana ya kusimamisha:

### Waweka dau wa pekee {#solo-stakers}

DVT pia inawezesha usimamishaji usio wa ulinzi kwa kukuruhusu kusambaza ufunguo wako wa mthibitishaji kwenye nodi za mbali huku ukiweka ufunguo kamili nje ya mtandao kabisa. Hii inamaanisha waweka dau wa nyumbani si lazima watumie pesa kwa ajili ya maunzi, huku kusambaza hisa za ufunguo kunaweza kusaidia kuwaimarisha dhidi ya udukuzi unaowezekana.

### Kusimamisha kama huduma (SaaS) {#saas}

Waendeshaji (kama vile mabwawa ya kusimamisha na waweka dau wa kitaasisi) wanaosimamia wathibitishaji wengi wanaweza kutumia DVT kupunguza hatari yao. Kwa kusambaza miundombinu yao, wanaweza kuongeza upungufu kwenye shughuli zao na kubadilisha aina za maunzi wanayotumia.

DVT inashiriki jukumu la usimamizi wa ufunguo kwenye nodi nyingi, ikimaanisha kuwa baadhi ya gharama za uendeshaji pia zinaweza kushirikiwa. DVT pia inaweza kupunguza hatari ya uendeshaji na gharama za bima kwa watoa huduma za kusimamisha.

### Mabwawa ya kusimamisha {#staking-pools}

Kwa sababu ya usanifu wa kawaida wa kihalalishaji, mabwawa ya kuweka dhamana na watoa huduma za kuweka alama za kioevu wanalazimika kuwa na viwango tofauti vya uaminifu wa mtoa huduma mmoja kwa kuwa faida na hasara huunganishwa katika bwawa lote. Pia wanategemea waendeshaji kulinda funguo za kusaini kwa sababu, hadi sasa, hakujawa na chaguo jingine kwao.

Ingawa jitihada za jadi zinafanywa kueneza hatari kwa kusambaza hisa kwa waendeshaji wengi, kila mwendeshaji bado anasimamia hisa kubwa kwa kujitegemea. Kutegemea mwendeshaji mmoja kunaleta hatari kubwa ikiwa hawafanyi kazi vizuri, wanakumbana na muda wa kutokuwa mtandaoni, wanaingiliwa, au wanafanya vitendo vya nia mbaya.

Kwa kutumia DVT, uaminifu unaohitajika kutoka kwa waendeshaji unapunguzwa kwa kiasi kikubwa. **Mabwawa yanaweza kuwawezesha waendeshaji kushikilia hisa bila kuhitaji ulinzi wa funguo za mthibitishaji** (kwani hisa za ufunguo pekee ndizo zinazotumika). Pia huruhusu hisa zinazodhibitiwa kusambazwa kati ya waendeshaji zaidi (k.m., badala ya kuwa na mtoa huduma mmoja anayesimamia vithibitishaji 1000, DVT huwezesha vithibitishaji hivyo kuendeshwa kwa pamoja na waendeshaji wengi). Usanidi mbalimbali wa waendeshaji utahakikisha kwamba ikiwa mwendeshaji mmoja ataacha kufanya kazi, wengine bado wataweza kuthibitisha. Hii husababisha upungufu na utofauti ambayo hupelekea utendaji bora na ustahimilivu, huku ikiongeza zawadi.

Faida nyingine ya kupunguza uaminifu kwa mwendeshaji mmoja ni kwamba mabwawa ya kusimamisha yanaweza kuruhusu ushiriki wa waendeshaji ulio wazi zaidi na usio na ruhusa. Kwa kufanya hivi, huduma zinaweza kupunguza hatari zao na kusaidia ugatuaji wa Ethereum kwa kutumia seti zilizoratibiwa na zisizo na ruhusa za waendeshaji, kwa mfano, kwa kuoanisha nyumba au vidau zaidi vidogo na vikubwa zaidi.

## Hasara zinazowezekana za kutumia DVT {#potential-drawbacks-of-using-dvt}

- **Kipengele cha ziada** - kuanzisha nodi ya DVT huongeza sehemu nyingine ambayo inaweza kuwa na kasoro au kuwa hatarini. Njia ya kupunguza hii ni kujitahidi kwa utekelezaji mwingi wa nodi ya DVT, ikimaanisha wateja wengi wa DVT (sawa na vile kuna wateja wengi kwa makubaliano na safu za utekelezaji).
- **Gharama za uendeshaji** - kwa kuwa DVT inasambaza mthibitishaji kati ya wahusika wengi, kuna nodi nyingi zaidi zinazohitajika kwa ajili ya uendeshaji badala ya nodi moja tu, jambo ambalo huleta ongezeko la gharama za uendeshaji.
- **Uwezekano wa kuongezeka kwa muda wa kusubiri** - kwa kuwa DVT inatumia itifaki ya makubaliano kufikia makubaliano kati ya nodi nyingi zinazoendesha mthibitishaji, inaweza kusababisha kuongezeka kwa muda wa kusubiri.

## Masomo zaidi {#further-reading}

- [Vigezo vya mthibitishaji aliyesambazwa wa Ethereum (kiwango cha juu)](https://github.com/ethereum/distributed-validator-specs)
- [Vigezo vya kiufundi vya mthibitishaji aliyesambazwa wa Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Programu ya onyesho la ugawanaji wa siri wa Shamir](https://iancoleman.io/shamir/)
