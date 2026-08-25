---
title: Teknolojia ya kithibitishaji kilichosambazwa
description: Teknolojia ya kithibitishaji kilichosambazwa inawezesha uendeshaji uliosambazwa wa mthibitishaji wa Ethereum na pande nyingi.
lang: sw
template: staking
sidebarDepth: 2
summaryPoints:
  - Inagawanya ufunguo wa kusaini wa mthibitishaji kwenye mashine na waendeshaji wengi, na kuondoa sehemu moja ya kushindwa
  - Huweka wathibitishaji mtandaoni kupitia hitilafu za maunzi, programu, au waendeshaji binafsi
  - Miundombinu ya uzalishaji inayotumiwa leo na waweka dhamana wa kujitegemea, huduma za kuweka dhamana, na uwekaji dhamana wa pamoja
---

## Teknolojia ya kithibitishaji kilichosambazwa ni nini? {#what-is-dvt}

Teknolojia ya kithibitishaji kilichosambazwa (DVT) ni mbinu ya usalama wa mthibitishaji inayosambaza usimamizi wa ufunguo na majukumu ya kusaini kwa pande nyingi, ili kupunguza sehemu moja ya kushindwa na kuongeza uthabiti wa mthibitishaji.

DVT inasambaza usimamizi wa ufunguo na kusaini kwa **kugawanya ufunguo wa siri** unaotumiwa kulinda mthibitishaji **kwenye kompyuta nyingi** zilizopangwa katika "kikundi". Kufanya hivyo kunaruhusu baadhi ya nodi katika kikundi kwenda nje ya mtandao huku zikiweka nodi ya mthibitishaji ikiwa inafanya kazi, kwani kazi muhimu ya uthibitishaji inaweza kufanywa na kikundi kidogo cha mashine katika kila kikundi. Usambazaji huu unapunguza sehemu moja ya kushindwa, na kumfanya mthibitishaji kuwa imara zaidi. Faida ya ziada ya usambazaji wa kusaini wa DVT ni kwamba inafanya iwe vigumu sana kwa washambuliaji kupata ufikiaji wa ufunguo, kwa sababu hauhifadhiwi kikamilifu kwenye mashine yoyote moja.

![Mchoro unaoonyesha jinsi ufunguo mmoja wa mthibitishaji unavyogawanywa katika hisa za ufunguo na kusambazwa kwa nodi nyingi zenye vijenzi tofauti.](./dvt-cluster.png)

DVT si njia tofauti ya kuweka dhamana. Ni tabaka la programu ambalo usanidi wowote wa uwekaji dhamana unaweza kutumia:
- [Waweka dhamana wa kujitegemea](/staking/solo/) wanaweza kushirikiana kuendesha mthibitishaji pamoja, au mweka dhamana wa kujitegemea binafsi anaweza kutumia DVT kuongeza uthabiti kwenye usanidi wao wa uwekaji dhamana wa kujitegemea.
- [Huduma za kuweka dhamana](/staking/saas/) na [uwekaji dhamana wa pamoja](/staking/pools/) zinaweza kutumia DVT kuongeza uthabiti na kuimarisha miundombinu yao ya uwekaji dhamana, au kusambaza shughuli za mthibitishaji kwa waendeshaji wengi wanaojitegemea.

## Kwa nini tunahitaji DVT? {#why-do-we-need-dvt}

### Usalama {#security}

Wathibitishaji huzalisha jozi mbili za ufunguo wa umma na siri: funguo za mthibitishaji kwa ajili ya kushiriki katika mwafaka na funguo za utoaji kwa ajili ya kufikia fedha. Ingawa wathibitishaji wanaweza kulinda funguo za utoaji katika hifadhi baridi, funguo za siri za mthibitishaji lazima ziwe mtandaoni 24/7 ili kusaini majukumu ambayo mthibitishaji amepewa saa nzima, kama vile uthibitisho na mapendekezo ya kitalu. Kuweka ufunguo mtandaoni kunauweka kwenye hatari ya wizi, na DVT inapunguza hatari hiyo: ni hisa za ufunguo pekee ndizo zinazokuwa mtandaoni, kamwe si ufunguo kamili.

Ikiwa ufunguo wa siri wa mthibitishaji umeingiliwa, mshambuliaji anaweza kudhibiti mthibitishaji, na uwezekano wa kusababisha ukataji au upotevu wa ETH ya mweka dhamana. DVT inapunguza hatari hii. Kwa DVT, ufunguo kamili wa asili wa mthibitishaji husimbwa na kugawanywa katika hisa za ufunguo. Hisa za ufunguo hukaa mtandaoni, zikisambazwa kwenye nodi nyingi zinazoendesha mthibitishaji pamoja, huku ufunguo kamili 'mkuu' ukibaki nje ya mtandao kwa usalama. Usambazaji huu unawezekana kwa sababu wathibitishaji wa [Ethereum](/) hutumia sahihi za BLS ambazo ni za kuongeza, ikimaanisha ufunguo kamili unaweza kujengwa upya kwa kujumlisha sehemu zake. Sahihi za kiasi zilizotengenezwa na hisa za ufunguo huungana kuwa sahihi ambayo ni halali kwa ufunguo kamili, kwa hivyo ufunguo kamili wenyewe hauhitajiki kamwe kwa kusaini kwa kila siku. Wakati kikundi kinazalisha ufunguo mpya wa mthibitishaji kwa kutumia uzalishaji wa ufunguo uliosambazwa, ufunguo wa siri kamili hauwepo kamwe kwenye mashine yoyote moja.

### Hakuna sehemu moja ya kushindwa {#no-single-point-of-failure}

Wakati mthibitishaji amegawanywa kwa waendeshaji wengi na mashine nyingi, anaweza kuhimili hitilafu za maunzi na programu binafsi bila kwenda nje ya mtandao. Hatari ya kushindwa inaweza pia kupunguzwa kwa kutumia usanidi tofauti wa maunzi na programu kwenye nodi katika kikundi. Usambazaji wa waendeshaji wengi haupatikani kiasili kwa usanidi wa mthibitishaji wa nodi moja; unatokana na tabaka la programu ya kati la DVT.

Ikiwa moja ya vipengele vya mashine katika kikundi itashindwa (kwa mfano, ikiwa kuna waendeshaji wanne katika kikundi cha mthibitishaji na mmoja anatumia kiteja maalum ambacho kina hitilafu), wengine wanaweza kuhakikisha kuwa mthibitishaji anaendelea kufanya kazi.

### Ugatuzi {#decentralization}

Hali bora kwa Ethereum ni kuwa na wathibitishaji wengi wanaojitegemea iwezekanavyo. Hata hivyo, watoa huduma wachache wa kuweka dhamana wamekuwa maarufu sana na wanachukua sehemu kubwa ya jumla ya ETH iliyowekwa dhamana kwenye mtandao. DVT inaweza kuruhusu waendeshaji hawa kuwepo huku ikihifadhi ugatuzi wa dhamana. Hii ni kwa sababu funguo za kila mthibitishaji zinasambazwa kwenye mashine nyingi na itachukua njama kubwa zaidi kwa mthibitishaji kuwa mbaya.

Bila DVT, ni rahisi kwa watoa huduma wa kuweka dhamana kusaidia usanidi mmoja au miwili tu wa kiteja kwa wathibitishaji wao wote, na kuongeza athari za hitilafu ya kiteja. DVT inaweza kutumika kusambaza hatari kwenye usanidi mwingi wa kiteja na maunzi tofauti, na kuunda uthabiti kupitia utofauti.

**DVT inatoa faida zifuatazo kwa Ethereum:**

1. **Ugatuzi** wa mwafaka wa Uthibitisho wa Dau (PoS) wa Ethereum
2. Inahakikisha **uhai** wa mtandao
3. Inaunda **uvumilivu wa makosa** wa mthibitishaji
4. Uendeshaji wa mthibitishaji **uliopunguza uaminifu**
5. **Kupunguza ukataji** na hatari za muda wa kutofanya kazi
6. **Inaboresha utofauti** (kiteja, kituo cha data, eneo, udhibiti, n.k.)
7. **Usalama ulioimarishwa** wa usimamizi wa ufunguo wa mthibitishaji

## DVT inafanyaje kazi? {#how-does-dvt-work}

Utekelezaji wa DVT kwa kawaida huendeshwa kama programu ya ziada kwenye kila mashine katika kikundi. Programu hii hufanya kazi kama programu ya kati, ikikaa kati ya kiteja cha mthibitishaji cha nodi na mteja wa mwafaka wake, ambapo inaratibu na nodi zingine kwenye kikundi ili majukumu ya mthibitishaji yasainiwe kwa pamoja.

Suluhisho la DVT lina vipengele vifuatavyo:

- **[Ugawaji wa siri wa Shamir](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Wathibitishaji hutumia [funguo za BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). Ufunguo wa siri wa mthibitishaji unaweza kugawanywa katika "hisa za ufunguo" nyingi, na kwa sababu sahihi za BLS ni za kuongeza, sahihi za kiasi zilizotengenezwa na hisa hizo za ufunguo zinaweza kuunganishwa kuwa sahihi moja ambayo ni halali kwa ufunguo kamili wa mthibitishaji.
- **[Mpango wa sahihi wa kizingiti](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Huamua idadi ya hisa za ufunguo binafsi zinazohitajika kwa majukumu ya kusaini, k.m., 3 kati ya 4.
- **[Uzalishaji wa ufunguo uliosambazwa (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Mchakato wa kificho unaozalisha hisa za ufunguo na hutumiwa kusambaza hisa za ufunguo wa mthibitishaji uliopo au mpya kwa nodi katika kikundi.
- **[Ukokotoaji wa pande nyingi (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - Ufunguo kamili wa mthibitishaji huzalishwa kwa siri kwa kutumia ukokotoaji wa pande nyingi. Ufunguo kamili haujulikani kamwe kwa mwendeshaji yeyote binafsi—wanajua tu sehemu yao wenyewe ("hisa" yao).
- **Itifaki ya mwafaka** - Itifaki ya mwafaka huchagua nodi moja kuwa mpendekezaji wa bloku. Wanashiriki kitalu na nodi zingine kwenye kikundi, ambao huongeza hisa zao za ufunguo kwenye sahihi ya jumla. Wakati hisa za kutosha za ufunguo zimekusanywa, kitalu kinapendekezwa kwenye Ethereum.

Wathibitishaji waliosambazwa wana uvumilivu wa makosa uliojengwa ndani na wanaweza kuendelea kufanya kazi hata kama baadhi ya nodi binafsi zitaenda nje ya mtandao. Kikundi cha nodi ya mthibitishaji ni imara hata kama baadhi ya nodi ndani yake zitakuwa mbaya au wavivu.

## DVT katika uzalishaji {#dvt-in-production}

Wathibitishaji waliosambazwa wanaendeshwa kwenye Mtandao Mkuu leo katika uwekaji dhamana wa kujitegemea, huduma, na uwekaji dhamana wa pamoja. Mitandao miwili inachukua sehemu kubwa ya shughuli hii:

<ProductDisclaimer />

- **Obol** inatengeneza Charon, kiteja cha programu ya kati cha DVT cha chanzo wazi kinachoruhusu kikundi cha mashine kuendesha mthibitishaji pamoja ("uwekaji dhamana wa kikosi"). Vikundi hufanya uzalishaji wa ufunguo uliosambazwa na kusanidi kikundi chao kupitia [DV Launchpad](https://docs.obol.org/learn/readme/launchpad) ya Obol. Vikundi vya Obol vinatumiwa katika uzalishaji na [itifaki za kuweka dhamana](/staking/pools/) na [huduma za kuweka dhamana](/staking/saas/), ikiwa ni pamoja na moduli ya Simple DVT ya Lido na programu ya Operation Solo Staker ya EtherFi, ambayo inawaingiza waendeshaji wa nyumbani kwenye vikundi vinavyovumilia makosa.
- **SSV Network** ni mtandao bila ruhusa wa waendeshaji wa nodi wanaojitegemea. Ufunguo wa mthibitishaji unagawanywa katika hisa za ufunguo na kusambazwa kwa seti iliyochaguliwa ya waendeshaji, ambao hufanya majukumu ya mthibitishaji kwa pamoja; hakuna mwendeshaji mmoja anayeshikilia ufunguo kamili. Huduma za kuweka dhamana na uwekaji dhamana wa pamoja huendesha seti kubwa za wathibitishaji kwenye SSV, na kama Obol, inatumiwa na moduli ya Simple DVT ya Lido.

## Matumizi ya DVT {#dvt-use-cases}

DVT ina athari kubwa kwa tasnia pana ya uwekaji dhamana:

### Waweka dhamana wa kujitegemea {#solo-stakers}

DVT inawezesha **uwekaji dhamana wa kikosi**: kikundi kidogo cha watu, kama vile marafiki, wanajamii, au wageni wanaoratibiwa kupitia jukwaa la uzinduzi, wakiendesha mthibitishaji mmoja kwa pamoja kwenye mashine zao wenyewe. Kizingiti cha kikundi (kwa mfano, 3 kati ya 4) lazima kiwe mtandaoni ili mthibitishaji afanye majukumu yake, kwa hivyo hakuna muda wa kutofanya kazi wa mwanachama mmoja, hitilafu ya maunzi, au kosa linalomtoa mthibitishaji nje ya mtandao. Wakati ufunguo unaundwa na uzalishaji wa ufunguo uliosambazwa, hakuna mwanachama anayeshikilia ufunguo kamili wa kusaini.

DVT pia inawezesha uwekaji dhamana isiyo ya udhamini kwa kukuruhusu kusambaza ufunguo wako wa mthibitishaji kwenye nodi za mbali huku ukiweka ufunguo kamili nje ya mtandao kabisa. Hii inamaanisha waweka dhamana hawahitaji lazima kuendesha maunzi yao wenyewe, na kusambaza hisa za ufunguo husaidia kulinda dhidi ya udukuzi unaowezekana.

### Kuweka hisa kama huduma (SaaS) {#saas}

Waendeshaji (kama vile uwekaji dhamana wa pamoja na waweka dhamana wa taasisi) wanaosimamia wathibitishaji wengi wanaweza kutumia DVT kupunguza hatari yao. Kwa kusambaza miundombinu yao, wanaweza kuongeza urudufu kwenye shughuli zao na kubadilisha aina za maunzi wanayotumia.

DVT inashiriki jukumu la usimamizi wa ufunguo kwenye nodi nyingi, ikimaanisha baadhi ya gharama za uendeshaji zinaweza pia kushirikiwa. DVT inaweza pia kupunguza hatari ya uendeshaji na gharama za bima kwa watoa huduma wa kuweka dhamana.

### Uwekaji dhamana wa pamoja {#staking-pools}

Kutokana na usanidi wa kawaida wa mthibitishaji, uwekaji dhamana wa pamoja na watoa huduma wa uwekaji dhamana wenye ukwasi kihistoria walilazimika kuweka uaminifu mkubwa kwa kila mwendeshaji binafsi, kwa kuwa faida na hasara zinashirikiwa katika bwawa lote. Pia walitegemea waendeshaji kulinda funguo za kusaini kwa sababu, hadi DVT, hapakuwa na chaguo jingine kwao.

Ingawa kijadi juhudi hufanywa kusambaza hatari kwa kusambaza dhamana kwa waendeshaji wengi, kila mwendeshaji bado anasimamia dhamana kubwa kwa kujitegemea. Kutegemea mwendeshaji mmoja kunaleta hatari kubwa ikiwa watafanya vibaya, watakumbana na muda wa kutofanya kazi, wataingiliwa, au kutenda kwa nia mbaya.

Kwa kutumia DVT, uaminifu unaohitajika kutoka kwa kila mwendeshaji binafsi unaweza kupunguzwa. **Mabwawa yanaweza kuwezesha waendeshaji kushikilia dhamana bila kuhitaji udhamini wa funguo za mthibitishaji** (kwa kuwa ni hisa za ufunguo pekee zinazotumiwa). Pia inaruhusu dhamana zinazosimamiwa kusambazwa kati ya waendeshaji wengi zaidi (k.m., badala ya kuwa na mwendeshaji mmoja anayesimamia wathibitishaji 1000, DVT inawezesha wathibitishaji hao kuendeshwa kwa pamoja na waendeshaji wengi). Usanidi tofauti wa mwendeshaji husaidia kuhakikisha kwamba ikiwa mwendeshaji mmoja atashindwa, wengine bado wataweza kuthibitisha. Urudufu na utofauti unaotokana unaweza kusababisha utendaji bora na uthabiti, huku ukiongeza tuzo.

## Hasara zinazowezekana za kutumia DVT {#potential-drawbacks-of-using-dvt}

- **Kipengele cha ziada** - kuanzisha nodi ya DVT kunaongeza sehemu nyingine ambayo inaweza kuwa na hitilafu au hatari. Hili linapunguzwa kwa kuwa na utekelezaji mwingi wa programu ya DVT, kama vile kuna viteja vingi kwa tabaka la mwafaka na tabaka la utekelezaji.
- **Gharama za uendeshaji** - kwa kuwa DVT inasambaza mthibitishaji kati ya pande nyingi, kuna nodi zaidi zinazohitajika kwa uendeshaji badala ya nodi moja tu, ambayo inaleta ongezeko la gharama za uendeshaji.
- **Uwezekano wa kuongezeka kwa ucheleweshaji** - kwa kuwa DVT inatumia itifaki ya mwafaka kufikia mwafaka kati ya nodi nyingi zinazoendesha mthibitishaji, inaweza kuleta ongezeko la ucheleweshaji.

## Maswali yanayoulizwa mara kwa mara {#faq}

<ExpandableCard title="Je, ninahitaji DVT ili kuweka dhamana?" eventCategory="DVT" eventName="clicked do I need DVT to stake">
Hapana. Mashine moja inayoendesha kiteja cha mthibitishaji inafanya kazi bila programu yoyote ya DVT, na hii inasalia kuwa usanidi wa kawaida wa uwekaji dhamana wa nyumbani. DVT ni tabaka la hiari ambalo linaongeza uvumilivu wa makosa na kuondoa sehemu moja ya kushindwa. Hii ni muhimu ikiwa unataka mthibitishaji wako anusurike hitilafu za mashine binafsi, au ikiwa unataka kushiriki jukumu la kuendesha mthibitishaji na wengine.
</ExpandableCard>

<ExpandableCard title="Je, DVT inagawanya ETH yangu au funguo zangu za utoaji?" eventCategory="DVT" eventName="clicked does DVT split my ETH">
Hapana. DVT inagawanya tu ufunguo wa _kusaini_ wa mthibitishaji, ambao unatumika kwa majukumu ya mwafaka kama vile uthibitisho na mapendekezo ya kitalu. Dhamana yako daima inadhibitiwa na anwani ya utoaji iliyowekwa kwa mthibitishaji, ambayo haiathiriwi na DVT. Tangu uboreshaji wa Pectra, mmiliki wa anwani ya utoaji anaweza pia kuanzisha kujitoa kwa mthibitishaji moja kwa moja kutoka kwenye tabaka la utekelezaji, bila kuhitaji ufunguo wa kusaini kabisa.
</ExpandableCard>

<ExpandableCard title="Nini kinatokea ikiwa nodi katika kundi zinakuwa nje ya mtandao?" eventCategory="DVT" eventName="clicked what happens if nodes go offline">
Ilimradi kizingiti cha nodi kinabaki mtandaoni (kwa mfano, 3 kati ya 4), mthibitishaji anaendelea kufanya majukumu yake. Ikiwa nodi nyingi sana zitaenda nje ya mtandao kwa wakati mmoja, mthibitishaji huenda nje ya mtandao na kukosa tuzo hadi nodi za kutosha zirudi, sawa na mthibitishaji yeyote aliye nje ya mtandao. Kwenda nje ya mtandao sio kosa la ukataji.
</ExpandableCard>

<ExpandableCard title="Je, kundi lazima liwe 3 kati ya 4?" eventCategory="DVT" eventName="clicked does a cluster have to be 3 of 4">
Hapana. "3 kati ya 4" ni usanidi mdogo tu wa kawaida, na unatumika kama mfano katika ukurasa huu wote. Ukubwa wa kikundi na kizingiti cha kusaini huchaguliwa wakati kikundi kinaundwa.

Vikundi kwa kawaida hupimwa ili kizingiti kiwe wingi mkuu wa theluthi mbili ya nodi, ambayo ndiyo inaruhusu kikundi kuendelea kusaini huku kikivumilia wanachama wenye hitilafu au walio nje ya mtandao. Kikundi cha nodi 4 kinasaini na 3 na kuvumilia hitilafu 1; nodi 7 zinasaini na 5 na kuvumilia 2; nodi 10 zinasaini na 7 na kuvumilia 3. Vikundi vikubwa vinanunua uvumilivu zaidi wa makosa kwa gharama ya mashine zaidi za kuendesha na uratibu zaidi kati yao.

[Zaidi kuhusu ukubwa wa kikundi na uthabiti](https://docs.obol.org/next/learn/charon/cluster-configuration#cluster-size-and-resilience)
</ExpandableCard>

<ExpandableCard title="Je, DVT ni sawa na uwekaji dhamana wa pamoja?" eventCategory="DVT" eventName="clicked is DVT the same as pooled staking">
Hapana. Uwekaji dhamana wa pamoja unachanganya ETH kutoka kwa watu wengi ili kufadhili wathibitishaji, na ni mojawapo ya [njia kadhaa za kuweka dhamana](/staking/). DVT ni miundombinu ya _kuendesha_ mthibitishaji. Inasambaza kusaini kwa mthibitishaji mmoja kwenye mashine na waendeshaji wengi. Hizi mbili zinakamilishana; mabwawa mengi hutumia DVT kusambaza seti zao za waendeshaji, lakini DVT yenyewe haikusanyi ETH ya mtu yeyote.
</ExpandableCard>

## Usomaji zaidi {#further-reading}

- [Teknolojia ya Kithibitishaji Kilichosambazwa cha Ethereum (DVT) - Utangulizi Kamili](https://www.cyfrin.io/blog/full-introduction-to-ethereum-distributed-validator-technology-dvt) - Cyfrin
- [DVT ni nini na inaboreshaje uwekaji dhamana kwenye Ethereum?](https://blog.obol.org/what-is-dvt-and-how-does-it-improve-staking-on-ethereum/) - Obol
- [Vipimo vya mthibitishaji kilichosambazwa cha Ethereum (kiwango cha juu)](https://github.com/ethereum/distributed-validator-specs)
- [Vipimo vya kiufundi vya mthibitishaji kilichosambazwa cha Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Nyaraka za Obol](https://docs.obol.org/)
- [Nyaraka za SSV Network](https://docs.ssv.network/)
- [Moduli ya Simple DVT ya Lido](https://operatorportal.lido.fi/modules/simple-dvt-module)
- [Programu ya onyesho ya ugawaji wa siri wa Shamir](https://iancoleman.io/shamir/)