---
title: Ukamalishaji wa nafasi moja
description: Maelezo ya ukamilishaji wa nafasi moja
lang: sw
---

# Ukamalishaji wa nafasi moja {#single-slot-finality}

Inachukua takriban dakika 15 kwa bloku ya Ethereum kukamilika. Hata hivyo, tunaweza kufanya utaratibu wa makubaliano wa Ethereum uthibitishe bloku kwa ufanisi zaidi na kupunguza muda wa ukamilishaji kwa kiasi kikubwa. Badala ya kusubiri dakika kumi na tano, bloku zinaweza kupendekezwa na kukamilishwa katika nafasi ileile. Dhana hii inajulikana kama **ukamalishaji wa nafasi moja (SSF)**.

## Mwisho ni nini? {#what-is-finality}

Katika utaratibu wa makubaliano wa Ethereum unaotegemea uthibitisho wa hisa, ukamalishaji unarejelea hakikisho kwamba bloku haiwezi kubadilishwa au kuondolewa kwenye mnyororo wa bloku bila kuteketeza angalau 33% ya jumla ya ETH iliyowekwa. Huu ni usalama wa 'kripto-kiuchumi' kwa sababu uhakika unatokana na gharama kubwa mno inayohusiana na kubadilisha mpangilio au maudhui ya mnyororo ambayo ingemzuia mhusika yeyote wa kiuchumi mwenye busara kujaribu.

## Kwa nini kulenga ukamilishaji wa haraka zaidi? {#why-aim-for-quicker-finality}

Muda wa sasa wa ukamilishaji umekuwa mrefu sana. Watumiaji wengi hawataki kusubiri dakika 15 kwa ajili ya ukamalishaji, na ni usumbufu kwa programu na mabadilishano ambayo yanaweza kutaka upitishaji wa juu wa miamala kusubiri kwa muda mrefu hivyo ili kuwa na uhakika miamala yao ni ya kudumu. Kuwa na ucheleweshaji kati ya pendekezo la bloku na ukamilishaji pia kunaunda fursa ya reorgs fupi ambazo mshambuliaji anaweza kutumia kudhibiti bloku fulani au kutoa MEV. Mfumo unaohusika na kuboresha bloku kwa hatua pia ni changamano kabisa na umerekebishwa mara kadhaa ili kuziba udhaifu wa kiusalama, na kuufanya kuwa moja ya sehemu za msimbo wa Ethereum ambapo hitilafu ndogondogo zina uwezekano mkubwa wa kutokea. Masuala haya yote yanaweza kuondolewa kwa kupunguza muda wa ukamilishaji hadi nafasi moja.

## Mbadilishano wa ugatuzi / muda / gharama za ziada {#the-decentralization-time-overhead-tradeoff}

Dhamana ya ukamilishaji sio sifa ya papo hapo ya bloku mpya; inachukua muda kwa bloku mpya kukamilika. Sababu ya hili ni kwamba wathibitishaji wanaowakilisha angalau 2/3 ya jumla ya ETH iliyowekwa kwenye mtandao wanapaswa kupigia kura bloku ("kuthibitisha") ili ichukuliwe kuwa imekamilika. Kila nodi ya uthibitishaji kwenye mtandao inabidi ichakate uthibitisho kutoka kwa nodi zingine ili kujua kama bloku imefikia, au haijafikia, kiwango hicho cha 2/3.

Kadiri muda unaoruhusiwa kufikia ukamilishaji unavyokuwa mfupi, ndivyo nguvu zaidi ya kompyuta inavyohitajika katika kila nodi kwa sababu uchakataji wa uthibitisho lazima ufanyike haraka zaidi. Pia, kadiri nodi nyingi za uthibitishaji zinavyokuwepo kwenye mtandao, ndivyo uthibitisho mwingi unavyopaswa kuchakatwa kwa kila bloku, na kuongeza pia kwenye nguvu ya uchakataji inayohitajika. Kadiri nguvu nyingi za uchakataji zinavyohitajika, ndivyo watu wachache wanaweza kushiriki kwa sababu vifaa vya bei ghali zaidi vinahitajika kuendesha kila nodi ya uthibitishaji. Kuongeza muda kati ya bloku kunapunguza nguvu ya kompyuta inayohitajika katika kila nodi lakini pia huongeza muda wa ukamilishaji, kwa sababu uthibitisho unachakatwa polepole zaidi.

Kwa hivyo, kuna mbadilishano kati ya gharama za ziada (nguvu ya kompyuta), ugatuzi (idadi ya nodi zinazoweza kushiriki katika kuthibitisha mnyororo) na muda wa ukamilishaji. Mfumo bora unasawazisha nguvu ya chini ya kompyuta, ugatuzi wa juu zaidi na muda wa chini zaidi wa ukamilishaji.

Utaratibu wa sasa wa makubaliano wa Ethereum ulisawazisha vigezo hivi vitatu kwa:

- **Kuweka hisa ya chini kuwa 32 ETH**. Hii inaweka kikomo cha juu kwenye idadi ya uthibitisho wa wathibitishaji ambayo inapaswa kuchakatwa na nodi binafsi, na kwa hivyo kikomo cha juu cha mahitaji ya kikokotoo kwa kila nodi.
- **Kuweka muda wa ukamilishaji kuwa ~dakika 15**. Hii inatoa muda wa kutosha kwa wathibitishaji wanaoendeshwa kwenye kompyuta za kawaida za nyumbani kuchakata kwa usalama uthibitisho wa kila bloku.

Kwa muundo wa sasa wa mfumo, ili kupunguza muda wa ukamilishaji, ni muhimu kupunguza idadi ya wathibitishaji kwenye mtandao au kuongeza mahitaji ya vifaa kwa kila nodi. Hata hivyo, kuna maboresho yanaweza kufanywa kwenye jinsi uthibitisho unavyochakatwa ambayo yanaweza kuruhusu uthibitisho zaidi kuhesabiwa bila kuongeza gharama za ziada katika kila nodi. Uchakataji wenye ufanisi zaidi utaruhusu ukamilishaji kubainishwa ndani ya nafasi moja, badala ya katika enzi mbili.

## Njia za kuelekea SSF {#routes-to-ssf}

<ExpandableCard title= "Why can't we have SSF today?" eventCategory="/roadmap/single-slot-finality" eventName="clicked Why can't we hear SSF today?">

Utaratibu wa sasa wa makubaliano unachanganya uthibitisho kutoka kwa wathibitishaji wengi, wanaojulikana kama kamati, ili kupunguza idadi ya jumbe ambazo kila mthibitishaji anapaswa kuchakata ili kuthibitisha bloku. Kila mthibitishaji ana fursa ya kuthibitisha katika kila enzi (nafasi 32) lakini katika kila nafasi, ni kikundi kidogo tu cha wathibitishaji, kinachojulikana kama 'kamati', ndicho kinachothibitisha. Wanafanya hivyo kwa kugawanyika katika mitandao midogo ambapo wathibitishaji wachache huchaguliwa kuwa 'wakusanyaji'. Wakusanyaji hao kila mmoja anachanganya saini zote anazoziona kutoka kwa wathibitishaji wengine katika mtandao wao mdogo kuwa saini moja ya jumla. Mkusanyaji anayejumuisha idadi kubwa zaidi ya michango binafsi anapitisha saini yake ya jumla kwa mpendekezaji wa bloku, ambaye anaijumuisha katika bloku pamoja na saini ya jumla kutoka kwa kamati zingine.

Mchakato huu unatoa uwezo wa kutosha kwa kila mthibitishaji kupiga kura katika kila enzi, kwa sababu `nafasi 32 * kamati 64 * wathibitishaji 256 kwa kila kamati = wathibitishaji 524,288 kwa kila enzi`. Wakati wa kuandika (Februari 2023) kuna takriban wathibitishaji 513,000 wanaofanya kazi.

Katika mpango huu, inawezekana tu kwa kila mthibitishaji kupiga kura kwenye bloku kwa kusambaza uthibitisho wao katika enzi nzima. Hata hivyo, kuna njia zinazowezekana za kuboresha mfumo ili _kila mthibitishaji apate fursa ya kuthibitisha katika kila nafasi_. </ExpandableCard>

Tangu utaratibu wa makubaliano wa Ethereum ulipoundwa, mpango wa ujumlishaji wa saini (BLS) umegundulika kuwa na uwezo mkubwa wa kupanuka kuliko ilivyofikiriwa awali, huku uwezo wa wateja kuchakata na kuthibitisha saini nao umeboreshwa. Imebainika kuwa kuchakata uthibitisho kutoka kwa idadi kubwa ya wathibitishaji kwa kweli kunawezekana ndani ya nafasi moja. Kwa mfano, na wathibitishaji milioni moja kila mmoja akipiga kura mara mbili katika kila nafasi, na nyakati za nafasi zikirekebishwa kuwa sekunde 16, nodi zingehitajika kuthibitisha saini kwa kiwango cha chini cha ujumlishaji 125,000 kwa sekunde ili kuchakata uthibitisho wote milioni 1 ndani ya nafasi. Kwa uhalisia, inachukua kompyuta ya kawaida takriban nanosekunde 500 kufanya uthibitisho mmoja wa saini, ikimaanisha 125,000 zinaweza kufanywa katika ~62.5 ms - chini sana ya kizingiti cha sekunde moja.

Faida zaidi za ufanisi zinaweza kupatikana kwa kuunda kamati kuu za k.m., wathibitishaji 125,000 waliochaguliwa bila mpangilio kwa kila nafasi. Ni wathibitishaji hawa tu wanaopata kupiga kura kwenye bloku na kwa hivyo ni kikundi hiki kidogo tu cha wathibitishaji ndicho kinachoamua kama bloku imekamilika. Kama hili ni wazo zuri au la inategemea jinsi jumuiya ingependelea gharama iwe kubwa kwa shambulio lenye mafanikio kwenye Ethereum. Hii ni kwa sababu badala ya kuhitaji 2/3 ya jumla ya ether iliyowekwa, mshambuliaji anaweza kukamilisha bloku isiyo ya uaminifu na 2/3 ya ether iliyowekwa _katika kamati kuu hiyo_. Hili bado ni eneo la utafiti amilifu, lakini inaonekana inawezekana kwamba kwa seti ya wathibitishaji kubwa ya kutosha kuhitaji kamati kuu kwanza, gharama ya kushambulia moja ya kamati hizo ndogo itakuwa kubwa mno (k.m., gharama ya shambulio iliyoainishwa kwa ETH itakuwa `2/3 * 125,000 * 32 = ~milioni 2.6 ETH`). Gharama ya shambulio inaweza kurekebishwa kwa kuongeza ukubwa wa seti ya wathibitishaji (k.m., rekebisha ukubwa wa mthibitishaji ili gharama ya shambulio iwe sawa na ether milioni 1, ether milioni 4, ether milioni 10, nk). [Kura za maoni za awali](https://youtu.be/ojBgyFl6-v4?t=755) za jumuiya zinaonekana kupendekeza kwamba ether milioni 1-2 ni gharama inayokubalika ya shambulio, ambayo inaashiria ~wathibitishaji 65,536 - 97,152 kwa kila kamati kuu.

Hata hivyo, uthibitisho sio kikwazo halisi - ni ujumlishaji wa saini ndio unaotoa changamoto kweli kwa nodi za wathibitishaji. Ili kupanua ujumlishaji wa saini pengine kutahitaji kuongeza idadi ya wathibitishaji katika kila mtandao mdogo, kuongeza idadi ya mitandao midogo, au kuongeza safu za ziada za ujumlishaji (yaani, kutekeleza kamati za kamati). Sehemu ya suluhisho inaweza kuwa kuruhusu wakusanyaji maalumu - sawa na jinsi ujenzi wa bloku na utoaji wa ahadi za data za rollup utakavyotolewa kwa wajenzi maalumu wa bloku chini ya utengano wa mpendekezaji-mjenzi (PBS) na Danksharding.

## Jukumu la kanuni ya uchaguzi wa uma ni nini katika SSF? {#role-of-the-fork-choice-rule}

Utaratibu wa makubaliano wa leo unategemea uhusiano wa karibu kati ya kifaa cha ukamilishaji (algoriti inayobainisha ikiwa 2/3 ya wathibitishaji wamethibitisha mnyororo fulani) na kanuni ya uchaguzi wa uma (algoriti inayoamua ni mnyororo gani sahihi kunapokuwa na chaguo nyingi). Algoriti ya uchaguzi wa uma inazingatia tu bloku _tangu_ bloku ya mwisho iliyokamilika. Chini ya SSF hakungekuwa na bloku zozote za kanuni ya uchaguzi wa uma kuzingatia, kwa sababu ukamilishaji hutokea katika nafasi ileile ambayo bloku inapendekezwa. Hii inamaanisha kwamba chini ya SSF _ama_ algoriti ya uchaguzi wa uma _au_ kifaa cha ukamilishaji vitakuwa vinafanya kazi wakati wowote. Kifaa cha ukamilishaji kingekamilisha bloku ambapo 2/3 ya wathibitishaji walikuwa mtandaoni na wakithibitisha kwa uaminifu. Ikiwa bloku haiwezi kuzidi kizingiti cha 2/3, kanuni ya uchaguzi wa uma ingeanza kutumika kubainisha ni mnyororo gani wa kufuata. Hii pia inaunda fursa ya kudumisha mfumo wa uvujaji wa kutofanya kazi unaorejesha mnyororo ambapo >1/3 ya wathibitishaji wanakuwa nje ya mtandao, ingawa kuna baadhi ya mambo fiche ya ziada.

## Masuala yaliyosalia {#outstanding-issues}

Tatizo la kupanua ujumlishaji kwa kuongeza idadi ya wathibitishaji kwa kila mtandao mdogo ni kwamba inasababisha mzigo mkubwa zaidi kwenye mtandao wa rika-kwa-rika. Tatizo la kuongeza safu za ujumlishaji ni kwamba ni ngumu sana kuhandisi na huongeza muda wa kusubiri (yaani, inaweza kuchukua muda mrefu zaidi kwa mpendekezaji wa bloku kupata taarifa kutoka kwa wakusanyaji wote wa mitandao midogo). Pia haijulikani wazi jinsi ya kushughulikia hali ambapo kuna wathibitishaji wanaofanya kazi wengi zaidi kwenye mtandao kuliko wanaoweza kuchakatwa kwa urahisi katika kila nafasi, hata kwa ujumlishaji wa saini za BLS. Suluhisho moja linalowezekana ni kwamba, kwa sababu wathibitishaji wote wanathibitisha katika kila nafasi na hakuna kamati chini ya SSF, kikomo cha 32 ETH kwenye salio la ufanisi kinaweza kuondolewa kabisa, ikimaanisha waendeshaji wanaosimamia wathibitishaji wengi wanaweza kuunganisha hisa zao na kuendesha wachache, na hivyo kupunguza idadi ya jumbe ambazo nodi za uthibitishaji zinapaswa kuchakata ili kuhesabu seti nzima ya wathibitishaji. Hii inategemea wenye hisa kubwa kukubali kuunganisha wathibitishaji wao. Inawezekana pia kuweka kikomo kisichobadilika kwenye idadi ya wathibitishaji au kiasi cha ETH iliyowekwa wakati wowote. Hata hivyo, hii inahitaji mfumo fulani wa kuamua ni wathibitishaji gani wanaruhusiwa kushiriki na ni wapi hawaruhusiwi, ambao unaweza kusababisha athari zisizohitajika za pili.

## Maendeleo ya sasa {#current-progress}

SSF iko katika awamu ya utafiti. Haitarajiwi kutolewa kwa miaka kadhaa, pengine baada ya maboresho mengine makubwa kama vile [miti ya Verkle](/roadmap/verkle-trees/) na [Danksharding](/roadmap/danksharding/).

## Masomo zaidi {#further-reading}

- [Vitalik kuhusu SSF kwenye EDCON 2022](https://www.youtube.com/watch?v=nPgUKNPWXNI)
- [Maelezo ya Vitalik: Njia za kufikia ukamalishaji wa nafasi moja](https://notes.ethereum.org/@vbuterin/single_slot_finality)
