---
title: Utengano wa mpendekezaji-mjenzi
description: Jifunze jinsi na kwa nini wathibitishaji wa Ethereum watagawanya majukumu yao ya ujenzi wa bloku na utangazaji wa bloku.
lang: sw
---

# Mgawanyo wa mpendekezaji-mjengaji {#proposer-builder-separation}

Wathibitishaji wa Ethereum wa sasa huunda _na_ kutangaza bloku. Wanakusanya miamala pamoja ambayo wameisikia kupitia mtandao wa gossip na kuifunga kwenye bloku ambayo inatumwa kwa wenzao kwenye mtandao wa Ethereum. **Mgawanyo wa mpendekezaji-mjengaji (PBS)** hugawanya kazi hizi kwa wathibitishaji wengi. Wajengaji wa bloku wanawajibika kwa kuunda bloku na kuzitoa kwa mpendekezaji wa bloku katika kila nafasi. Mpendekezaji wa bloku hawezi kuona yaliyomo kwenye bloku, anachagua tu ile yenye faida zaidi, akilipa ada kwa mjengaji wa bloku kabla ya kutuma bloku kwa wenzake.

Huu ni uboreshaji muhimu kwa sababu kadhaa. Kwanza, inaunda fursa za kuzuia udhibiti wa miamala katika kiwango cha itifaki. Pili, inawazuia wathibitishaji wa hiari kushindwa na wachezaji wa kitaasisi ambao wanaweza kuboresha zaidi faida ya ujenzi wao wa bloku. Tatu, inasaidia katika upanuzi wa Ethereum kwa kuwezesha maboresho ya Danksharding.

## PBS na ukinzani dhidi ya udhibiti {#pbs-and-censorship-resistance}

Kuwatenganisha wajengaji wa bloku na wapendekezaji wa bloku hufanya iwe ngumu zaidi kwa wajengaji wa bloku kudhibiti miamala. Hii ni kwa sababu vigezo vya ujumuishaji vilivyo changamani kiasi vinaweza kuongezwa ambavyo vinahakikisha hakuna udhibiti umefanyika kabla ya bloku kupendekezwa. Kwa kuwa mpendekezaji wa bloku ni chombo tofauti na mjengaji wa bloku, anaweza kuchukua jukumu la mlinzi dhidi ya wajengaji wa bloku wanaodhibiti.

Kwa mfano, orodha za ujumuishaji zinaweza kuanzishwa ili wathibitishaji wanapojua kuhusu miamala lakini hawaioni ikiwa imejumuishwa kwenye bloku, wanaweza kuzilazimisha kama lazima zijumuishwe katika bloku inayofuata. Orodha ya ujumuishaji inatengenezwa kutoka kwa mempool ya ndani ya mpendekezaji wa bloku (orodha ya miamala anayoifahamu) na kutumwa kwa wenzao muda mfupi kabla ya bloku kupendekezwa. Ikiwa miamala yoyote kutoka kwa orodha ya ujumuishaji inakosekana, mpendekezaji anaweza aidha kukataa bloku, kuongeza miamala inayokosekana kabla ya kuipendekeza, au kuipendekeza na kuiacha ikataliwe na wathibitishaji wengine wanapoipokea. Pia kuna toleo lenye ufanisi zaidi la wazo hili ambalo linadai kuwa wajengaji lazima watumie kikamilifu nafasi ya bloku inayopatikana na ikiwa hawafanyi hivyo, miamala huongezwa kutoka kwa orodha ya ujumuishaji ya mpendekezaji. Hili bado ni eneo la utafiti unaoendelea na usanidi bora zaidi kwa orodha za ujumuishaji bado haujaamuliwa.

[Mempool zilizosimbwa kwa njia fiche](https://www.youtube.com/watch?v=fHDjgFcha0M&list=PLpktWkixc1gUqkyc1-iE6TT0RWQTBJELe&index=3) zinaweza pia kufanya isiwezekane kwa wajengaji na wapendekezaji kujua ni miamala ipi wanayojumuisha kwenye bloku hadi baada ya bloku kutangazwa.

<ExpandableCard title="PBS inatatua aina gani za udhibiti?" eventCategory="/roadmap/pbs" eventName="clicked what kinds of censorship does PBS solve?">

Mashirika yenye nguvu yanaweza kuwashinikiza wathibitishaji kudhibiti miamala inayoenda au kutoka kwa anwani fulani. Wathibitishaji hutii shinikizo hili kwa kugundua anwani zilizopigwa marufuku katika pool yao ya miamala na kuziondoa kwenye bloku wanazopendekeza. Baada ya PBS hili halitawezekana tena kwa sababu wapendekezaji wa bloku hawatajua ni miamala gani wanayotangaza katika bloku zao. Inaweza kuwa muhimu kwa watu binafsi au programu fulani kutii sheria za udhibiti, kwa mfano inapotungwa kuwa sheria katika eneo lao. Katika hali hizi, utiifu hufanyika katika kiwango cha programu, huku itifaki ikibaki bila ruhusa na bila udhibiti.
</ExpandableCard>

## PBS na MEV {#pbs-and-mev}

**Thamani ya juu ambayo inaweza kutolewa (MEV)** inarejelea wathibitishaji kuongeza faida yao kwa kupanga miamala kwa njia ya upendeleo. Mifano ya kawaida ni pamoja na usuluhishi wa ubadilishanaji (swaps) kwenye masoko ya kubadilishana yaliyogatuliwa (k.m., kutangulia mauzo au ununuzi mkubwa) au kutambua fursa za kufilisi nafasi za DeFi. Kuongeza MEV kunahitaji ujuzi wa hali ya juu wa kiufundi na programu maalum iliyoongezwa kwa wathibitishaji wa kawaida, na kufanya iwezekane zaidi kwamba waendeshaji wa kitaasisi wawashinde watu binafsi na wathibitishaji wa hiari katika utoaji wa MEV. Hii inamaanisha mapato ya kuweka dau yana uwezekano wa kuwa ya juu zaidi na waendeshaji wa kati, na kuunda nguvu ya uwekaji kati ambayo inakatisha tamaa uwekaji dau wa nyumbani.

PBS inatatua tatizo hili kwa kusanidi upya uchumi wa MEV. Badala ya mpendekezaji wa bloku kufanya utafutaji wake mwenyewe wa MEV, anachagua tu bloku kutoka kwa nyingi anazopewa na wajengaji wa bloku. Wajengaji wa bloku wanaweza kuwa wamefanya utoaji wa MEV wa hali ya juu, lakini zawadi yake inakwenda kwa mpendekezaji wa bloku. Hii inamaanisha kwamba hata kama pool ndogo ya wajengaji wa bloku waliobobea itatawala utoaji wa MEV, zawadi yake inaweza kwenda kwa mthibitishaji yeyote kwenye mtandao, ikiwa ni pamoja na waweka dau binafsi wa nyumbani.

<ExpandableCard title="Kwa nini ni sawa kuweka kati ujenzi wa bloku?" eventCategory="/roadmap/pbs" eventName="clicked why is it OK to centralize block building?">

Watu binafsi wanaweza kuhamasishwa kuweka dau na pool badala ya wao wenyewe kutokana na zawadi zilizoimarishwa zinazotolewa na mikakati ya hali ya juu ya MEV. Kutenganisha ujenzi wa bloku na upendekezaji wa bloku kunamaanisha kuwa MEV itakayotolewa itasambazwa kwa wathibitishaji wengi zaidi badala ya kuwekwa kati na mtafutaji wa MEV mwenye ufanisi zaidi. Wakati huo huo, kuruhusu kuwepo kwa wajengaji wa bloku waliobobea kunaondoa mzigo wa ujenzi wa bloku kutoka kwa watu binafsi, na pia kunawazuia watu binafsi kujiibia MEV, huku ikiongeza idadi ya wathibitishaji binafsi, wanaojitegemea ambao wanaweza kuangalia kama bloku ni za kweli. Dhana muhimu ni "kutolingana kwa mthibitishaji-mhakiki" ambayo inarejelea wazo kwamba uzalishaji wa bloku wa kati ni sawa mradi tu kuna mtandao imara na uliogatuliwa kwa kiwango cha juu cha wathibitishaji wenye uwezo wa kuthibitisha kuwa bloku ni za kweli. Ugatuaji ni njia, si lengo la mwisho - tunachotaka ni bloku za kweli.
</ExpandableCard>

## PBS na Danksharding {#pbs-and-danksharding}

Danksharding ndiyo njia ambayo Ethereum itapanuka hadi miamala >100,000 kwa sekunde na kupunguza ada kwa watumiaji wa rollup. Inategemea PBS kwa sababu inaongeza mzigo wa kazi kwa wajengaji wa bloku, ambao watalazimika kukokotoa uthibitisho kwa hadi MB 64 za data ya rollup katika chini ya sekunde 1. Hii labda itahitaji wajengaji waliobobea ambao wanaweza kutenga maunzi makubwa kwa ajili ya kazi hiyo. Hata hivyo, katika hali ya sasa ujenzi wa bloku unaweza kuwa wa kati zaidi karibu na waendeshaji wa hali ya juu na wenye nguvu zaidi kwa vyovyote vile kutokana na utoaji wa MEV. Mgawanyo wa mpendekezaji-mjengaji ni njia ya kukubali ukweli huu na kuizuia isiweke nguvu ya uwekaji kati kwenye uthibitishaji wa bloku (sehemu muhimu) au usambazaji wa zawadi za kuweka dau. Faida kubwa ya ziada ni kwamba wajengaji wa bloku waliobobea pia wako tayari na wanaweza kukokotoa uthibitisho muhimu wa data kwa ajili ya Danksharding.

## Maendeleo ya sasa {#current-progress}

PBS iko katika hatua ya juu ya utafiti, lakini bado kuna maswali muhimu ya usanifu ambayo yanahitaji kutatuliwa kabla ya kuweza kufanyiwa mfano katika wateja wa Ethereum. Bado hakuna vipimo vya mwisho. Hii inamaanisha PBS inawezekana iko umbali wa mwaka mmoja au zaidi. Angalia [hali ya hivi karibuni ya utafiti](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance).

## Masomo zaidi {#further-reading}

- [Hali ya utafiti: ukinzani dhidi ya udhibiti chini ya PBS](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)
- [Miundo ya soko la ada inayofaa PBS](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725)
- [PBS na ukinzani dhidi ya udhibiti](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Secondary-auctions)
- [Orodha za ujumuishaji](https://notes.ethereum.org/@fradamt/H1ZqdtrBF)
