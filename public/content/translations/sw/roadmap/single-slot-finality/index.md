---
title: Uthibitisho wa mwisho wa sloti moja
description: Maelezo ya uthibitisho wa mwisho wa sloti moja
lang: sw
---

Inachukua takriban dakika 15 kwa kitalu cha [Ethereum](/) kukamilishwa. Hata hivyo, tunaweza kufanya utaratibu wa makubaliano wa Ethereum kuthibitisha vitalu kwa ufanisi zaidi na kupunguza muda wa ukamilifu kwa kiasi kikubwa. Badala ya kusubiri kwa dakika kumi na tano, vitalu vinaweza kupendekezwa na kukamilishwa katika sloti hiyo hiyo. Dhana hii inajulikana kama **uthibitisho wa mwisho wa sloti moja (SSF)**.

## Ukamilifu ni nini? {#what-is-finality}

Katika utaratibu wa makubaliano wa Ethereum unaotegemea Uthibitisho wa Dau (PoS), ukamilifu unarejelea hakikisho kwamba kitalu hakiwezi kubadilishwa au kuondolewa kwenye mnyororo wa vitalu bila kuteketeza angalau 33% ya jumla ya ETH iliyowekwa dhamana. Huu ni usalama wa 'kiuchumi wa kripto' kwa sababu ujasiri unatokana na gharama kubwa sana inayohusishwa na kubadilisha mpangilio au maudhui ya mnyororo ambayo ingezuia mhusika yeyote wa kiuchumi mwenye akili timamu kujaribu kufanya hivyo.

## Kwa nini tulenge ukamilifu wa haraka zaidi? {#why-aim-for-quicker-finality}

Muda wa sasa wa ukamilifu umeonekana kuwa mrefu mno. Watumiaji wengi hawataki kusubiri dakika 15 kwa ajili ya ukamilifu, na inaleta usumbufu kwa programu na mabadilishano ambayo yanaweza kutaka uwezo wa upitishaji wa juu wa miamala kusubiri muda mrefu hivyo ili kuwa na uhakika kwamba miamala yao ni ya kudumu. Kuwa na ucheleweshaji kati ya pendekezo la kitalu na ukamilishaji pia kunaunda fursa ya upangaji upya mfupi ambao mshambuliaji anaweza kuutumia kudhibiti vitalu fulani au kutoa MEV. Utaratibu unaoshughulikia uboreshaji wa vitalu kwa hatua pia ni mgumu sana na umefanyiwa marekebisho mara kadhaa ili kufunga udhaifu wa kiusalama, na kuifanya kuwa moja ya sehemu za msimbo wa Ethereum ambapo hitilafu ndogo zina uwezekano mkubwa wa kutokea. Masuala haya yote yanaweza kuondolewa kwa kupunguza muda wa ukamilifu hadi sloti moja.

## Ubadilishanaji kati ya ugatuzi / muda / gharama za ziada {#the-decentralization-time-overhead-tradeoff}

Hakikisho la ukamilifu si sifa ya papo hapo ya kitalu kipya; inachukua muda kwa kitalu kipya kukamilishwa. Sababu ya hii ni kwamba wathibitishaji wanaowakilisha angalau 2/3 ya jumla ya ETH iliyowekwa dhamana kwenye mtandao wanapaswa kupiga kura kwa ajili ya kitalu ("kuthibitisha") ili kizingatiwe kuwa kimekamilishwa. Kila nodi inayothibitisha kwenye mtandao inapaswa kuchakata uthibitisho kutoka kwa nodi nyingine ili kujua kwamba kitalu kimefikia, au hakijafikia, kiwango hicho cha 2/3.

Kadiri muda unaoruhusiwa kufikia ukamilishaji unavyokuwa mfupi, ndivyo nguvu zaidi ya kompyuta inavyohitajika katika kila nodi kwa sababu uchakataji wa uthibitisho unapaswa kufanywa haraka zaidi. Pia, kadiri nodi nyingi zinazothibitisha zinavyokuwepo kwenye mtandao, ndivyo uthibitisho mwingi unavyopaswa kuchakatwa kwa kila kitalu, na hivyo kuongeza nguvu ya uchakataji inayohitajika. Kadiri nguvu zaidi ya uchakataji inavyohitajika, ndivyo watu wachache wanaweza kushiriki kwa sababu vifaa vya gharama kubwa zaidi vinahitajika ili kuendesha kila nodi inayothibitisha. Kuongeza muda kati ya vitalu kunapunguza nguvu ya kompyuta inayohitajika katika kila nodi lakini pia kurefusha muda wa ukamilifu, kwa sababu uthibitisho unachakatwa polepole zaidi.

Kwa hivyo, kuna ubadilishanaji kati ya gharama za ziada (nguvu ya kompyuta), ugatuzi (idadi ya nodi zinazoweza kushiriki katika kuthibitisha mnyororo) na muda wa ukamilifu. Mfumo bora husawazisha nguvu ya chini ya kompyuta, ugatuzi wa juu zaidi na muda wa chini wa ukamilifu.

Utaratibu wa sasa wa makubaliano wa Ethereum ulisawazisha vigezo hivi vitatu kwa:

- **Kuweka dhamana ya chini kuwa 32 ETH**. Hii inaweka kikomo cha juu cha idadi ya uthibitisho wa wathibitishaji ambao unapaswa kuchakatwa na nodi binafsi, na hivyo kikomo cha juu cha mahitaji ya kimahesabu kwa kila nodi.
- **Kuweka muda wa ukamilifu kuwa takriban dakika 15**. Hii inatoa muda wa kutosha kwa wathibitishaji wanaoendeshwa kwenye kompyuta za kawaida za nyumbani kuchakata kwa usalama uthibitisho kwa kila kitalu.

Kwa muundo wa sasa wa utaratibu, ili kupunguza muda wa ukamilifu, ni lazima kupunguza idadi ya wathibitishaji kwenye mtandao au kuongeza mahitaji ya vifaa kwa kila nodi. Hata hivyo, kuna maboresho yanayoweza kufanywa kwa jinsi uthibitisho unavyochakatwa ambayo yanaweza kuruhusu uthibitisho zaidi kuhesabiwa bila kuongeza gharama za ziada katika kila nodi. Uchakataji wenye ufanisi zaidi utaruhusu ukamilifu kuamuliwa ndani ya sloti moja, badala ya vipindi viwili.

## Njia za kuelekea SSF {#routes-to-ssf}

<ExpandableCard title= "Why can't we have SSF today?" eventCategory="/roadmap/single-slot-finality" eventName="clicked Why can't we hear SSF today?">

Utaratibu wa sasa wa makubaliano unachanganya uthibitisho kutoka kwa wathibitishaji wengi, wanaojulikana kama kamati, ili kupunguza idadi ya jumbe ambazo kila mthibitishaji anapaswa kuchakata ili kuthibitisha kitalu. Kila mthibitishaji ana fursa ya kuthibitisha katika kila kipindi (sloti 32) lakini katika kila sloti, ni kikundi kidogo tu cha wathibitishaji, kinachojulikana kama 'kamati' ndicho kinachothibitisha. Wanafanya hivyo kwa kugawanyika katika mitandao midogo ambapo wathibitishaji wachache huchaguliwa kuwa 'wajumuishaji'. Wajumuishaji hao kila mmoja huchanganya sahihi zote wanazoziona kutoka kwa wathibitishaji wengine katika mtandao wao mdogo kuwa sahihi moja iliyojumuishwa. Mjumuishaji anayejumuisha idadi kubwa zaidi ya michango ya mtu binafsi hupitisha sahihi yao iliyojumuishwa kwa mpendekezaji wa bloku, ambaye huiweka kwenye kitalu pamoja na sahihi iliyojumuishwa kutoka kwa kamati nyingine.

Mchakato huu unatoa uwezo wa kutosha kwa kila mthibitishaji kupiga kura katika kila kipindi, kwa sababu `32 slots * 64 committees * 256 validators per committee = 524,288 validators per epoch`. Wakati wa kuandika (Februari 2023) kuna wathibitishaji hai takriban 513,000.

Katika mpango huu, inawezekana tu kwa kila mthibitishaji kupiga kura kwenye kitalu kwa kusambaza uthibitisho wao katika kipindi chote. Hata hivyo, kuna uwezekano wa njia za kuboresha utaratibu ili _kila mthibitishaji apate nafasi ya kuthibitisha katika kila sloti_.
</ExpandableCard>

Tangu utaratibu wa makubaliano wa Ethereum ubuniwe, mpango wa ujumuishaji wa sahihi (BLS) umeonekana kuwa na uwezo mkubwa zaidi wa kupanuka kuliko ilivyofikiriwa hapo awali, huku uwezo wa wateja kuchakata na kuthibitisha sahihi pia umeboreshwa. Imebainika kuwa kuchakata uthibitisho kutoka kwa idadi kubwa ya wathibitishaji kunawezekana kabisa ndani ya sloti moja. Kwa mfano, kukiwa na wathibitishaji milioni moja kila mmoja akipiga kura mara mbili katika kila sloti, na muda wa sloti kurekebishwa kuwa sekunde 16, nodi zingehitajika kuthibitisha sahihi kwa kiwango cha chini cha miunganisho 125,000 kwa sekunde ili kuchakata uthibitisho wote milioni 1 ndani ya sloti. Kiuhalisia, inachukua kompyuta ya kawaida takriban nanosekunde 500 kufanya uthibitishaji wa sahihi moja, ikimaanisha 125,000 zinaweza kufanywa kwa takriban ms 62.5 - chini sana ya kiwango cha sekunde moja.

Mafanikio zaidi ya ufanisi yanaweza kupatikana kwa kuunda kamati kuu za k.m., wathibitishaji 125,000 waliochaguliwa kwa nasibu kwa kila sloti. Wathibitishaji hawa pekee ndio wanaopata kupiga kura kwenye kitalu na kwa hivyo ni kikundi hiki kidogo tu cha wathibitishaji ndicho kinachoamua ikiwa kitalu kimekamilishwa. Ikiwa hili ni wazo zuri au la inategemea jinsi jamii ingependelea shambulio lililofanikiwa kwenye Ethereum liwe la gharama kubwa kiasi gani. Hii ni kwa sababu badala ya kuhitaji 2/3 ya jumla ya Etha iliyowekwa dhamana, mshambuliaji anaweza kukamilisha kitalu kisicho cha uaminifu kwa 2/3 ya Etha iliyowekwa dhamana _katika kamati kuu hiyo_. Hili bado ni eneo linalofanyiwa utafiti kikamilifu, lakini inaonekana inawezekana kwamba kwa kundi la wathibitishaji kubwa vya kutosha kuhitaji kamati kuu hapo awali, gharama ya kushambulia mojawapo ya kamati hizo ndogo itakuwa kubwa sana (k.m., gharama ya shambulio iliyotajwa kwa ETH itakuwa `2/3 * 125,000 * 32 = ~2.6 million ETH`). Gharama ya shambulio inaweza kurekebishwa kwa kuongeza ukubwa wa kundi la wathibitishaji (k.m., rekebisha ukubwa wa mthibitishaji ili gharama ya shambulio iwe sawa na Etha milioni 1, Etha milioni 4, Etha milioni 10, n.k.). [Kura za maoni za awali](https://youtu.be/ojBgyFl6-v4?t=755) za jamii zinaonekana kupendekeza kwamba Etha milioni 1-2 ni gharama inayokubalika ya shambulio, ambayo inamaanisha wathibitishaji takriban 65,536 - 97,152 kwa kila kamati kuu.

Hata hivyo, uthibitishaji sio kikwazo cha kweli - ni ujumuishaji wa sahihi ambao kwa kweli unaleta changamoto kwa nodi za mthibitishaji. Ili kupanua ujumuishaji wa sahihi labda itahitaji kuongeza idadi ya wathibitishaji katika kila mtandao mdogo, kuongeza idadi ya mitandao midogo, au kuongeza tabaka za ziada za ujumuishaji (yaani, kutekeleza kamati za kamati). Sehemu ya suluhisho inaweza kuwa kuruhusu wajumuishaji maalum - sawa na jinsi ujenzi wa kitalu na kuzalisha ahadi kwa data ya rollup itakavyotolewa kwa wajenzi maalum wa kitalu chini ya utengano wa mpendekezaji na mjengaji (PBS) na danksharding.

## Je, ni nini jukumu la kanuni ya kuchagua mchepuko katika SSF? {#role-of-the-fork-choice-rule}

Utaratibu wa makubaliano wa leo unategemea muunganisho mkali kati ya kifaa cha ukamilifu (algoriti inayoamua ikiwa 2/3 ya wathibitishaji wamethibitisha mnyororo fulani) na kanuni ya kuchagua mchepuko (algoriti inayoamua ni mnyororo upi ulio sahihi wakati kuna chaguzi nyingi). Algoriti ya kuchagua mchepuko inazingatia tu vitalu _tangu_ kitalu cha mwisho kilichokamilishwa. Chini ya SSF hakutakuwa na vitalu vyovyote kwa kanuni ya kuchagua mchepuko kuzingatia, kwa sababu ukamilifu hutokea katika sloti sawa na kitalu kinapopendekezwa. Hii inamaanisha kuwa chini ya SSF _ama_ algoriti ya kuchagua mchepuko _au_ kifaa cha ukamilifu kitakuwa amilifu wakati wowote. Kifaa cha ukamilifu kitakamilisha vitalu ambapo 2/3 ya wathibitishaji walikuwa mtandaoni na kuthibitisha kwa uaminifu. Ikiwa kitalu hakiwezi kuzidi kiwango cha 2/3, kanuni ya kuchagua mchepuko itaingilia kati ili kuamua ni mnyororo upi wa kufuata. Hii pia inaunda fursa ya kudumisha utaratibu wa uvujaji wa kutotenda ambao hurejesha mnyororo ambapo >1/3 ya wathibitishaji huenda nje ya mtandao, ingawa na baadhi ya tofauti za ziada.

## Masuala ambayo hayajatatuliwa {#outstanding-issues}

Tatizo la kupanua ujumuishaji kwa kukuza idadi ya wathibitishaji kwa kila mtandao mdogo ni kwamba inasababisha mzigo mkubwa kwenye mtandao wa rika-kwa-rika. Tatizo la kuongeza tabaka za miunganisho ni kwamba ni ngumu sana kuunda na inaongeza ucheleweshaji (yaani, inaweza kuchukua muda mrefu kwa mpendekezaji wa bloku kusikia kutoka kwa wajumuishaji wote wa mtandao mdogo). Pia haijulikani wazi jinsi ya kushughulikia hali ambayo kuna wathibitishaji wengi hai kwenye mtandao kuliko inavyoweza kuchakatwa katika kila sloti, hata kwa ujumuishaji wa sahihi ya BLS. Suluhisho moja linalowezekana ni kwamba, kwa sababu wathibitishaji wote huthibitisha katika kila sloti na hakuna kamati chini ya SSF, kikomo cha 32 ETH kwenye salio tendaji kinaweza kuondolewa kabisa, ikimaanisha waendeshaji wanaosimamia wathibitishaji wengi wanaweza kuunganisha dhamana yao na kuendesha wachache, kupunguza idadi ya jumbe ambazo nodi zinazothibitisha zinapaswa kuchakata ili kuhesabu kundi zima la wathibitishaji. Hii inategemea waweka dhamana wakubwa kukubaliana kuunganisha wathibitishaji wao. Inawezekana pia kuweka kikomo kisichobadilika kwa idadi ya wathibitishaji au kiasi cha ETH iliyowekwa dhamana wakati wowote. Hata hivyo, hii inahitaji utaratibu fulani wa kuamua ni wathibitishaji gani wanaruhusiwa kushiriki na wapi hawaruhusiwi, jambo ambalo linaweza kuunda athari za pili zisizohitajika.

## Maendeleo ya sasa {#current-progress}

SSF iko katika awamu ya utafiti. Haitegemewi kutolewa kwa miaka kadhaa, huenda baada ya uboreshaji mwingine mkubwa kama vile [Miti ya Verkle](/roadmap/verkle-trees/) na [danksharding](/roadmap/danksharding/).

## Usomaji zaidi {#further-reading}

- [Vitalik kuhusu SSF kwenye EDCON 2022](https://www.youtube.com/watch?v=nPgUKNPWXNI)
- [Vidokezo vya Vitalik: Njia za kuelekea uthibitisho wa mwisho wa sloti moja](https://notes.ethereum.org/@vbuterin/single_slot_finality)