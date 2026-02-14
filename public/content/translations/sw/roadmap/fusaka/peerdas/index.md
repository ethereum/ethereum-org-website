---
title: PeerDAS
description: Jifunze kuhusu PeerDAS kama sehemu ya sasisho la itifaki ya Fusaka Ethereum
lang: sw
---

# PeerDAS {#peer-das}

Itifaki ya Ethereum inapitia sasisho lake muhimu zaidi la uongezwaji tangu [kuanzishwa kwa miamala ya blob na EIP-4844](/roadmap/danksharding/). Kama sehemu ya [sasisho la Fusaka](/roadmap/fusaka/), PeerDAS inaanzisha njia mpya ya kushughulikia data ya blob, ikitoa takriban ongezeko la mara kumi katika uwezo wa **[upatikanaji wa data (DA)](/developers/docs/data-availability/)** kwa L2s.

[Zaidi kuhusu ramani ya uongezwaji wa blob](https://blog.ethereum.org/2025/08/22/protocol-update-002)

## Uwezo wa kuongezeka {#scalability}

Dira ya Ethereum ni kuwa jukwaa lisiloegemea upande wowote, salama na lililogatuliwa linalopatikana kwa kila mtu ulimwenguni. Matumizi ya mtandao yanapoongezeka, hii inahitaji kusawazisha changamoto tatu za uongezwaji, usalama, na ugatuzi wa mtandao. Ikiwa Ethereum ingeongeza tu data inayoshughulikiwa na mtandao ndani ya muundo wake wa sasa, ingekuwa katika hatari ya kuzidisha uwezo wa [nodi ambazo Ethereum inategemea kwa ugatuzi wake](/developers/docs/nodes-and-clients/). Uwezo wa kuongezeka unahitaji muundo thabiti wa utaratibu unaopunguza maelewano.

Mojawapo ya mikakati ya kufikia lengo hili ni kuruhusu mfumo-ikolojia tofauti wa suluhisho za uongezwaji za safu ya 2 badala ya kuchakata miamala yote kwenye [safu ya 1 (L1)](/glossary/#layer-1) Mtandao Mkuu. [Safu za 2 (L2s)](/glossary/#layer-2) au [unda-mpya](/glossary#rollups) huchakata miamala kwenye minyororo yao tofauti na hutumia Ethereum kwa uthibitishaji na usalama. Kuchapisha tu ahadi muhimu za usalama na kubana mizigo ya data huruhusu L2s kutumia uwezo wa DA wa Ethereum kwa ufanisi zaidi. Kwa upande mwingine, L1 hubeba data kidogo bila kuathiri dhamana za usalama, huku L2s zikipokea watumiaji wengi zaidi kwa gharama za chini za gesi. Hapo awali, L2s zilichapisha data kama `calldata` katika miamala ya kawaida, ambayo ilishindana na miamala ya L1 kwa ajili ya gesi na haikuwa na manufaa kwa upatikanaji wa data kwa wingi.

## Proto-Danksharding {#proto-danksharding}

Hatua ya kwanza kubwa kuelekea uongezwaji wa L2 ilikuwa ni sasisho la Dencun, lililoanzisha [Proto-Danksharding](/roadmap/danksharding/) (EIP-4844). Sasisho hili liliunda aina mpya, maalum ya data kwa unda-mpya zinazoitwa blobs. [Blobs](/developers/docs/data-availability/blockchain-data-storage-strategies/#eip-4844-blobs), au vitu vikubwa vya jozi, ni vipande vya muda vya data holela ambavyo havihitaji utekelezaji wa EVM na nodi huzihifadhi kwa muda mfupi tu. Uchakataji huu wenye ufanisi zaidi uliruhusu L2s kuchapisha data zaidi kwenye Ethereum na kuongeza kiwango hata zaidi.

Licha ya kuwa na faida kubwa kwa uongezwaji, kutumia blobs ni sehemu tu ya lengo kuu. Katika itifaki ya sasa, kila nodi kwenye mtandao bado inahitaji kupakua kila blob. Kikwazo kinakuwa ni kipimo data kinachohitajika na nodi binafsi, huku kiasi cha data kinachohitaji kupakuliwa kikiongezeka moja kwa moja kadri idadi ya blob inavyoongezeka.

Ethereum hailegalegi katika ugatuzi, na kipimo data ni mojawapo ya vigezo nyeti zaidi. Hata kukiwa na kompyuta zenye nguvu zinazopatikana kwa wingi kwa mtu yeyote anayeweza kuzimudu, [vikwazo vya kipimo data cha upakiaji](https://www.speedtest.net/global-index) hata katika miji mikubwa katika mataifa yaliyoendelea (kama vile [Ujerumani](https://www.speedtest.net/global-index/germany), [Ubelgiji](https://www.speedtest.net/global-index/belgium), [Australia](https://www.speedtest.net/global-index/australia) au [Marekani](https://www.speedtest.net/global-index/united-states)) vinaweza kuzuia nodi kuendeshwa tu kutoka kwenye vituo vya data ikiwa mahitaji ya kipimo data hayarekebishwi kwa makini.

Waendeshaji wa nodi wana mahitaji yanayoongezeka ya kipimo data na nafasi ya diski kadri blob zinavyoongezeka. Ukubwa na idadi ya blobs vinazuiliwa na vikwazo hivi. Kila blob inaweza kubeba hadi 128kb ya data na wastani wa blob 6 kwa kila bloku. Hii ilikuwa tu hatua ya kwanza kuelekea muundo wa baadaye unaotumia blobs kwa njia yenye ufanisi zaidi.

## Sampuli ya upatikanaji wa data {#das}

[Upatikanaji wa data](/developers/docs/data-availability/) ni uhakikisho kwamba data yote inayohitajika ili kuthibitisha mnyororo kwa uhuru inapatikana kwa washiriki wote wa mtandao. Inahakikisha kwamba data imechapishwa kikamilifu na inaweza kutumika kuthibitisha bila kuaminiwa hali mpya ya mnyororo au miamala inayoingia.

Blobs za Ethereum hutoa dhamana thabiti ya upatikanaji wa data inayohakikisha usalama wa L2s. Ili kufanya hivi, nodi za Ethereum zinahitaji kupakua na kuhifadhi blobs zote kamili. Lakini vipi ikiwa tunaweza kusambaza blobs kwenye mtandao kwa ufanisi zaidi na kuepuka kikwazo hiki?

Njia tofauti ya kuhifadhi data na kuhakikisha upatikanaji wake ni **sampuli ya upatikanaji wa data (DAS)**. Badala ya kila kompyuta inayoendesha Ethereum kuhifadhi kikamilifu kila blob, DAS inaanzisha mgawanyo wa kazi uliogatuliwa. Inapunguza mzigo wa kuchakata data kwa kusambaza kazi ndogo, zinazoweza kudhibitiwa kwa mtandao mzima wa nodi. Blobs hugawanywa katika vipande na kila nodi hupakua vipande vichache tu kwa kutumia utaratibu wa usambazaji wa nasibu sare kwa nodi zote.

Hii inaleta tatizo jipya—kuthibitisha upatikanaji na uadilifu wa data. Mtandao unawezaje kuhakikisha kwamba data inapatikana na yote ni sahihi wakati nodi binafsi zinashikilia vipande vidogo tu? Nodi hasidi inaweza kutoa data bandia na kuvunja kwa urahisi dhamana thabiti za upatikanaji wa data! Hapa ndipo kriptografia inapoingilia kusaidia.

Ili kuhakikisha uadilifu wa data, EIP-4844 tayari ilitekelezwa na ahadi za KZG. Hizi ni ithibati za kriptografia zinazoundwa wakati blob mpya inapoongezwa kwenye mtandao. Uthibitisho mdogo hujumuishwa katika kila bloku, na nodi zinaweza kuthibitisha kwamba blobs zilizopokelewa zinaendana na ahadi ya KZG ya bloku.

DAS ni utaratibu unaojengwa juu ya hili na unahakikisha data ni sahihi na inapatikana. Kuchukua sampuli ni mchakato ambapo nodi huuliza sehemu ndogo tu ya data na kuithibitisha dhidi ya ahadi. KZG ni mpango wa ahadi ya polinomiali ambayo inamaanisha kwamba nukta yoyote moja kwenye mkunjo wa polinomiali inaweza kuthibitishwa. Kwa kuangalia nukta chache tu kwenye polinomiali, mteja anayefanya sampuli anaweza kuwa na uhakika mkubwa wa uwezekano kwamba data inapatikana.

## PeerDAS {#peer-das}

[PeerDAS (EIP-7594)](https://eips.ethereum.org/EIPS/eip-7594) ni pendekezo maalum linalotekeleza utaratibu wa DAS katika Ethereum, likiwa labda sasisho kubwa zaidi tangu Muungano. PeerDAS imeundwa kupanua data ya blob, kuigawanya katika safu wima na kusambaza sehemu ndogo kwa nodi.

Ethereum inakopa hisabati za busara kufanikisha hili: inatumia usimbaji wa kufuta wa mtindo wa Reed-Solomon kwa data ya blob. Data ya blob inawakilishwa kama polinomiali ambayo vizigeu vyake vinasimba data, kisha kutathmini polinomiali hiyo kwenye nukta za ziada ili kuunda blob iliyopanuliwa, na kuongeza maradufu idadi ya tathmini. Upungufu huu ulioongezwa unawezesha urejeshaji wa data iliyofutwa: hata kama baadhi ya tathmini zimepotea, blob ya asili inaweza kuundwa upya mradi angalau nusu ya data yote, pamoja na vipande vilivyoongezwa, inapatikana.

![Polinomiali iliyopanuliwa](./polynomial.png)

Katika hali halisi, polinomiali hii ina maelfu ya vizigeu. Ahadi za KZG ni thamani za baiti chache, kitu kama hashi, zinazojulikana na nodi zote. Kila nodi iliyo na nukta za data za kutosha inaweza [kuunda upya kwa ufanisi seti kamili ya data ya blob](https://arxiv.org/abs/2207.11079).

> Ukweli wa kufurahisha: mbinu hiyo hiyo ya usimbaji ilitumiwa na DVD. Ikiwa ulikwaruza DVD, kicheza diski bado kiliweza kuisoma shukrani kwa usimbaji wa Reed-Solomon ambao huongeza vipande vilivyokosekana vya polinomiali.

Kihistoria, data katika minyororo ya bloku, iwe bloku au blobs, ilitangazwa kwa nodi zote. Kwa mbinu ya PeerDAS ya kugawanya-na-kuchukua-sampuli, kutangaza kila kitu kwa kila mtu sio lazima tena. Baada ya Fusaka, mitandao ya safu ya makubaliano imepangwa katika mada/mitandao midogo ya uvumi: safu wima za blob hupewa mitandao midogo maalum, na kila nodi hujiandikisha kwa seti ndogo zilizopangwa tayari na huhifadhi tu vipande hivyo.

Kwa PeerDAS, data ya blob iliyopanuliwa imegawanywa katika vipande 128 vinavyoitwa safu wima. Data inasambazwa kwa nodi hizi kupitia itifaki maalum ya uvumi kwenye mitandao midogo maalum ambayo wanajiandikisha. Kila nodi ya kawaida kwenye mtandao hushiriki katika angalau mitandao midogo 8 ya safu wima iliyochaguliwa kwa nasibu. Kupokea data kutoka kwa mitandao midogo 8 tu kati ya 128 kunamaanisha kuwa nodi hii chaguo-msingi hupokea 1/16 tu ya data yote, lakini kwa sababu data ilipanuliwa hii ni 1/8 ya data ya asili.

Hii inaruhusu kikomo kipya cha kinadharia cha uongezwaji cha 8x cha mpango wa sasa wa “kila mtu anapakua kila kitu”. Huku nodi zikijiandikisha kwa mitandao midogo tofauti ya nasibu inayohudumia safu wima za blob, uwezekano ni mkubwa sana kwamba zimesambazwa kwa usawa na kwa hivyo kila kipande cha data kinapatikana mahali fulani kwenye mtandao. Nodi zinazoendesha wathibitishaji zinatakiwa kujiandikisha kwa mitandao midogo zaidi kwa kila mthibitishaji wanayemwendesha.

> Kila nodi ina kitambulisho cha kipekee kilichozalishwa kwa nasibu, kwa kawaida hutumika kama utambulisho wake wa umma kwa miunganisho. Katika PeerDAS, nambari hii hutumiwa kuamua seti ya nasibu ya mitandao midogo ambayo inapaswa kujiandikisha, na kusababisha usambazaji wa nasibu sare wa data yote ya blob.

Mara tu nodi inapounda upya data ya asili kwa mafanikio, kisha inasambaza tena safu wima zilizorejeshwa kwenye mtandao, ikiponya kikamilifu mapengo yoyote ya data na kuimarisha ustahimilivu wa jumla wa mfumo. Nodi zilizounganishwa na wathibitishaji walio na salio la pamoja ≥4096 ETH lazima ziwe nodi kuu na kwa hivyo lazima zijiandikishe kwa mitandao yote midogo ya safu wima ya data na kuhifadhi safu wima zote. Nodi kuu hizi zitaponya mapengo ya data mfululizo. Hali ya kujiponya kwa uwezekano ya itifaki inaruhusu dhamana thabiti za upatikanaji huku isiwazuie waendeshaji wa nyumbani wanaoshikilia sehemu tu za data.

![Nodi zinazojiandikisha kwenye safu wima zilizosambazwa kupitia mitandao midogo](./subnets.png)

Upatikanaji wa data unaweza kuthibitishwa na nodi yoyote inayoshikilia sehemu ndogo tu ya data ya blob shukrani kwa utaratibu wa sampuli ulioelezwa hapo juu. Upatikanaji huu unalazimishwa: wathibitishaji lazima wafuate sheria mpya za uchaguzi wa mgawanyiko, ikimaanisha watakubali na kupigia kura bloku tu baada ya kuthibitisha upatikanaji wa data.

Athari ya moja kwa moja kwa watumiaji (hasa watumiaji wa L2) ni ada za chini. Kukiwa na nafasi ya 8x zaidi kwa data ya unda-mpya, shughuli za watumiaji kwenye mnyororo wao huwa nafuu zaidi kadri muda unavyokwenda. Lakini ada za chini baada ya Fusaka zitachukua muda na zitategemea BPO.

## Vigezo vya Blob Pekee (BPO) {#bpo}

Mtandao kinadharia utaweza kuchakata blobs 8x zaidi, lakini ongezeko la blob ni mabadiliko yanayohitaji kujaribiwa ipasavyo na kutekelezwa kwa usalama hatua kwa hatua. Mitandao ya majaribio hutoa imani ya kutosha kupeleka vipengele kwenye Mtandao Mkuu lakini tunahitaji kuhakikisha uthabiti wa mtandao wa p2p kabla ya kuwezesha idadi kubwa zaidi ya blobs.

Ili kuongeza taratibu idadi lengwa ya blobs kwa kila bloku bila kuulemea mtandao, Fusaka inaanzisha migawanyiko ya **[Vigezo vya Blob-Pekee (BPO)](https://ethereum-magicians.org/t/blob-parameter-only-bpo-forks/22623)**. Tofauti na migawanyiko ya kawaida inayohitaji uratibu mpana wa mfumo-ikolojia, makubaliano, na masasisho ya programu, [BPO (EIP-7892)](https://eips.ethereum.org/EIPS/eip-7892) ni masasisho yaliyopangwa awali yanayoongeza idadi ya juu ya blobs kadri muda unavyopita bila kuingiliwa.

Hii ina maana kwamba mara tu baada ya Fusaka kuamilishwa na PeerDAS kuanza kutumika, idadi ya blobs haitabadilika. Idadi ya blobs itaanza kuongezeka maradufu kila baada ya wiki chache hadi ifikie upeo wa 48, huku wasanidi programu wakifuatilia ili kuhakikisha utaratibu unafanya kazi kama inavyotarajiwa na hauna athari mbaya kwa nodi zinazoendesha mtandao.

## Mielekeo ya baadaye {#future-directions}

PeerDAS ni hatua tu [kuelekea dira kubwa zaidi ya uongezwaji ya FullDAS](https://ethresear.ch/t/fulldas-towards-massive-scalability-with-32mb-blocks-and-beyond/19529), au Danksharding. Wakati PeerDAS inatumia usimbaji wa kufuta wa 1D kwa kila blob kibinafsi, Danksharding kamili itatumia mpango kamili zaidi wa usimbaji wa kufuta wa 2D kwenye matrix nzima ya data ya blob. Kupanua data katika vipimo viwili huunda sifa zenye nguvu zaidi za upungufu na uundaji upya na uthibitishaji wenye ufanisi zaidi. Kufanikisha FullDAS kutahitaji uboreshaji mkubwa wa mtandao na itifaki, pamoja na utafiti wa ziada.

## Masomo zaidi {#further-reading}

- [PeerDAS: Sampuli ya Upatikanaji wa Data ya Rika na Francesco D'Amato](https://www.youtube.com/watch?v=WOdpO1tH_Us)
- [Nyaraka za PeerDAS ya Ethereum](https://eprint.iacr.org/2024/1362.pdf)
- [Kuthibitisha Usalama wa PeerDAS bila AGM](https://eprint.iacr.org/2025/1683)
- [Vitalik kuhusu PeerDAS, athari zake, na kujaribu Fusaka](https://x.com/VitalikButerin/status/1970983281090085200)