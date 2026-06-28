---
title: PeerDAS
description: Jifunze kuhusu PeerDAS kama sehemu ya sasisho la itifaki ya Ethereum la Fusaka
lang: sw
authors: ["Nixo", "Mario Havel"]
---

Itifaki ya [Ethereum](/) inapitia sasisho lake muhimu zaidi la kuongeza uwezo tangu [kuanzishwa kwa miamala ya blobu na EIP-4844](/roadmap/danksharding/). Kama sehemu ya [sasisho la Fusaka](/roadmap/fusaka/), PeerDAS inaleta njia mpya ya kushughulikia data ya blobu, ikitoa ongezeko la takriban mara kumi katika uwezo wa **[upatikanaji wa data (DA)](/developers/docs/data-availability/)** kwa L2s.

[Zaidi kuhusu ramani ya njia ya kuongeza uwezo wa blobu](https://blog.ethereum.org/2025/08/22/protocol-update-002)

## Uongezaji wa uwezo {#scalability}

Dira ya Ethereum ni kuwa jukwaa huru, salama na iliyogatuliwa linalopatikana kwa kila mtu duniani. Kadiri matumizi ya mtandao yanavyokua, hii inahitaji kusawazisha changamoto tatu za uongezaji wa uwezo, usalama, na ugatuzi wa mtandao. Ikiwa Ethereum ingeongeza tu data inayoshughulikiwa na mtandao ndani ya muundo wake wa sasa, ingekuwa katika hatari ya kulemea [nodi ambazo Ethereum inategemea kwa ugatuzi wake](/developers/docs/nodes-and-clients/). Uongezaji wa uwezo unahitaji muundo thabiti wa utaratibu unaopunguza maelewano.

Moja ya mikakati ya kufikia lengo hili ni kuruhusu mfumo ikolojia tofauti wa suluhisho za kuongeza uwezo za tabaka la 2 badala ya kuchakata miamala yote kwenye Mtandao Mkuu wa [tabaka la 1 (l1)](/glossary/#layer-1). [Tabaka la 2 (L2s)](/glossary/#layer-2) au [mikusanyiko](/glossary#rollups) huchakata miamala kwenye minyororo yao tofauti na kutumia Ethereum kwa uthibitishaji na usalama. Kuchapisha tu ufungamanisho muhimu kwa usalama na kubana mizigo ya data huruhusu L2s kutumia uwezo wa DA wa Ethereum kwa ufanisi zaidi. Kwa upande mwingine, l1 hubeba data kidogo bila kuathiri dhamana za usalama, huku L2s zikipokea watumiaji zaidi kwa gharama za chini za gesi. Hapo awali, L2s zilichapisha data kama `calldata` katika miamala ya kawaida, ambayo ilishindana na miamala ya l1 kwa gesi na haikuwa ya vitendo kwa upatikanaji wa data nyingi.

## Proto-Danksharding {#proto-danksharding}

Hatua kuu ya kwanza kuelekea kuongeza uwezo wa L2 ilikuwa sasisho la Dencun, ambalo lilianzisha [Proto-Danksharding](/roadmap/danksharding/) (EIP-4844). Sasisho hili liliunda aina mpya na maalum ya data kwa ajili ya mikusanyiko inayoitwa mablobu. [Mablobu](/developers/docs/data-availability/blockchain-data-storage-strategies/#eip-4844-blobs), au vitu vikubwa vya mfumo wa jozi (binary large objects), ni vipande vya muda vya data yoyote ambavyo havihitaji utekelezaji wa EVM na nodi huhifadhi tu kwa muda mfupi. Uchakataji huu wenye ufanisi zaidi uliruhusu L2s kuchapisha data zaidi kwenye Ethereum na kuongeza uwezo zaidi. 

Licha ya kuwa tayari na faida kubwa kwa uongezaji wa uwezo, kutumia mablobu ni sehemu tu ya lengo la mwisho. Katika itifaki ya sasa, kila nodi katika mtandao bado inahitaji kupakua kila blobu. Kikwazo kinakuwa kipimo data kinachohitajika kwa nodi binafsi, huku kiasi cha data kinachohitaji kupakuliwa kikiongezeka moja kwa moja na idadi kubwa ya mablobu. 

Ethereum hailegi kwenye ugatuzi, na kipimo data ni mojawapo ya vipengele nyeti zaidi. Hata kwa kompyuta zenye nguvu zinazopatikana kwa wingi kwa yeyote anayeweza kuzimudu, [vikwazo vya kipimo data cha kupakia](https://www.speedtest.net/global-index) hata katika miji mikubwa katika mataifa yaliyoendelea (kama vile [Ujerumani](https://www.speedtest.net/global-index/germany), [Ubelgiji](https://www.speedtest.net/global-index/belgium), [Australia](https://www.speedtest.net/global-index/australia) au [Marekani](https://www.speedtest.net/global-index/united-states)) vinaweza kuzuia nodi kuendeshwa tu kutoka kwenye vituo vya data ikiwa mahitaji ya kipimo data hayatarekebishwa kwa uangalifu.

Waendeshaji wa nodi wana mahitaji yanayozidi kuongezeka ya kipimo data na nafasi ya diski kadiri mablobu yanavyoongezeka. Ukubwa na wingi wa mablobu unadhibitiwa na vikwazo hivi. Kila blobu inaweza kubeba hadi 128kb ya data na wastani wa mablobu 6 kwa kila kitalu. Hii ilikuwa tu hatua ya kwanza kuelekea muundo wa siku zijazo unaotumia mablobu kwa njia yenye ufanisi zaidi.

## Sampuli ya upatikanaji wa data {#das}

[Upatikanaji wa data](/developers/docs/data-availability/) ni hakikisho kwamba data yote inayohitajika ili kuthibitisha mnyororo kwa kujitegemea inapatikana kwa washiriki wote wa mtandao. Inahakikisha kwamba data imechapishwa kikamilifu na inaweza kutumika kuthibitisha bila kuhitaji uaminifu hali mpya ya mnyororo au miamala inayoingia. 

Mablobu ya Ethereum hutoa hakikisho dhabiti la upatikanaji wa data ambalo linahakikisha usalama wa L2s. Ili kufanya hivi, nodi za Ethereum zinahitaji kupakua na kuhifadhi mablobu kwa ukamilifu wake. Lakini vipi ikiwa tunaweza kusambaza mablobu katika mtandao kwa ufanisi zaidi na kuepuka kizuizi hiki? 

Mbinu tofauti ya kuhifadhi data na kuhakikisha upatikanaji wake ni **sampuli ya upatikanaji wa data (DAS)**. Badala ya kila kompyuta inayoendesha Ethereum kuhifadhi kikamilifu kila blobu moja, DAS inaleta mgawanyo wa kazi uliogatuliwa. Inapunguza mzigo wa kuchakata data kwa kusambaza kazi ndogo zinazoweza kudhibitiwa katika mtandao mzima wa nodi. Mablobu yanagawanywa vipande vipande na kila nodi hupakua vipande vichache tu kwa kutumia utaratibu wa usambazaji sawa wa nasibu katika nodi zote. 

Hii inaleta tatizo jipya—kuthibitisha upatikanaji na uadilifu wa data. Mtandao unawezaje kuhakikisha kwamba data inapatikana na yote ni sahihi wakati nodi binafsi zinashikilia vipande vidogo tu? Nodi hasidi inaweza kutoa data feki na kuvunja kwa urahisi hakikisho dhabiti la upatikanaji wa data! Hapa ndipo kriptografia inakuja kusaidia. 

Ili kuhakikisha uadilifu wa data, EIP-4844 tayari ilitekelezwa na ufungamanisho wa KZG. Hizi ni thibitisho za kriptografia zinazoundwa wakati blobu mpya inapoongezwa kwenye mtandao. Thibitisho dogo linajumuishwa katika kila kitalu, na nodi zinaweza kuthibitisha kwamba mablobu yaliyopokelewa yanalingana na ufungamanisho wa KZG wa kitalu.

DAS ni utaratibu unaojengwa juu ya hili na kuhakikisha data ni sahihi na inapatikana. Sampuli ni mchakato ambapo nodi huuliza sehemu ndogo tu ya data na kuithibitisha dhidi ya ufungamanisho. KZG ni mpango wa ufungamanisho wa polinomiali (polynomial commitment scheme) ambayo inamaanisha kwamba nukta yoyote kwenye mkunjo wa polinomiali inaweza kuthibitishwa. Kwa kuangalia tu nukta chache kwenye polinomiali, mteja anayefanya sampuli anaweza kuwa na hakikisho dhabiti la uwezekano kwamba data inapatikana. 

## PeerDAS {#peer-das-2}

[PeerDAS (EIP-7594)](https://eips.ethereum.org/EIPS/eip-7594) ni pendekezo maalum linalotekeleza utaratibu wa DAS katika Ethereum, likiashiria labda sasisho kubwa zaidi tangu Unganisho. PeerDAS imeundwa kupanua data ya blobu, kuigawanya katika safu wima na kusambaza sehemu ndogo kwa nodi.

Ethereum inaazima hisabati janja ili kufanikisha hili: inatumia usimbaji wa ufutaji wa mtindo wa Reed-Solomon kwenye data ya blobu. Data ya blobu inawakilishwa kama polinomiali ambayo migawo yake husimba data, kisha kutathmini polinomiali hiyo katika nukta za ziada ili kuunda blobu iliyopanuliwa, na kuongeza mara mbili idadi ya tathmini. Uziada huu ulioongezwa huwezesha urejeshaji wa ufutaji: hata kama baadhi ya tathmini hazipo, blobu asili inaweza kujengwa upya mradi tu angalau nusu ya data yote, ikijumuisha vipande vilivyopanuliwa, inapatikana.

![Extended polynomial](./polynomial.png)

Kiuhalisia, polinomiali hii ina maelfu ya migawo. Ufungamanisho wa KZG ni thamani za baiti chache, kitu kama heshi, kinachojulikana kwa nodi zote. Kila nodi inayoshikilia nukta za kutosha za data inaweza [kujenga upya kwa ufanisi seti kamili ya data ya blobu](https://arxiv.org/abs/2207.11079). 

> Ukweli wa kufurahisha: mbinu hiyo hiyo ya usimbaji ilitumika na DVD. Ikiwa ulikwaruza DVD, kichezaji bado kiliweza kuisoma kutokana na usimbaji wa Reed-Solomon ambao huongeza vipande vilivyokosekana vya polinomiali. 

Kihistoria, data katika minyororo ya vizuizi, iwe vitalu au mablobu, ilitangazwa kwa nodi zote. Kwa mbinu ya kugawanya-na-kusampuli ya PeerDAS, kutangaza kila kitu kwa kila mtu si lazima tena. Baada ya Fusaka, mtandao wa tabaka la mwafaka umepangwa katika mada za uvumi/mitandao midogo (gossip topics/subnets): safu wima za blobu hupewa mitandao midogo maalum, na kila nodi hujiunga na seti ndogo zilizopangwa mapema na kuhifadhi vipande hivyo pekee.

Kwa PeerDAS, data ya blobu iliyopanuliwa inagawanywa katika vipande 128 vinavyoitwa safu wima. Data inasambazwa kwa nodi hizi kupitia itifaki ya uvumi maalum kwenye mitandao midogo maalum ambayo wanajiunga nayo. Kila nodi ya kawaida kwenye mtandao inashiriki katika angalau mitandao midogo 8 ya safu wima iliyochaguliwa kwa nasibu. Kupokea data kutoka kwa mitandao midogo 8 tu kati ya 128 inamaanisha kuwa nodi hii ya msingi inapokea 1/16 tu ya data yote, lakini kwa sababu data ilipanuliwa hii ni 1/8 ya data asili. 

Hii inaruhusu kikomo kipya cha kinadharia cha kuongeza uwezo cha mara 8 ya mpango wa sasa wa "kila mtu anapakua kila kitu". Huku nodi zikijiunga na mitandao midogo tofauti ya nasibu inayohudumia safu wima za blobu, uwezekano ni mkubwa sana kwamba zinasambazwa kwa usawa na kwa hivyo kila kipande cha data kipo mahali fulani kwenye mtandao. Nodi zinazoendesha wathibitishaji zinahitajika kujiunga na mitandao midogo zaidi kwa kila mthibitishaji wanayemwendehsa.

> Kila nodi ina kitambulisho cha kipekee kilichozalishwa kwa nasibu, kwa kawaida hutumika kama utambulisho wake wa umma kwa miunganisho. Katika PeerDAS, nambari hii inatumika kuamua seti ya nasibu ya mitandao midogo ambayo inapaswa kujiunga nayo na kusababisha usambazaji sawa wa nasibu wa data yote ya blobu.

Pindi nodi inapofanikiwa kujenga upya data asili, kisha inasambaza tena safu wima zilizorejeshwa kwenye mtandao, ikiponya kikamilifu mapengo yoyote ya data na kuimarisha uthabiti wa mfumo kwa ujumla. Nodi zilizounganishwa na wathibitishaji wenye salio la pamoja la ≥4096 ETH lazima ziwe nodi kuu (supernode) na kwa hivyo lazima zijiunge na mitandao midogo yote ya safu wima za data na kuhifadhi safu wima zote. Nodi kuu hizi zitaponya mapengo ya data mfululizo. Asili ya uwezekano wa kujiponya ya itifaki inaruhusu hakikisho dhabiti la upatikanaji huku isizuie waendeshaji wa nyumbani wanaoshikilia sehemu tu za data. 

![Nodes subscribing to columns distributed via subnets](./subnets.png)

Upatikanaji wa data unaweza kuthibitishwa na nodi yoyote inayoshikilia sehemu ndogo tu ya data ya blobu kutokana na utaratibu wa sampuli ulioelezwa hapo juu. Upatikanaji huu unatekelezwa: wathibitishaji lazima wafuate sheria mpya za uchaguzi wa mchepuo (fork-choice rules), ikimaanisha watakubali na kupiga kura kwa vitalu tu baada ya kuthibitisha upatikanaji wa data.

Athari ya moja kwa moja kwa watumiaji (hasa watumiaji wa L2) ni ada za chini. Kwa nafasi mara 8 zaidi kwa data ya rollup, shughuli za watumiaji kwenye mnyororo wao zinakuwa nafuu zaidi kadiri muda unavyosonga. Lakini ada za chini baada ya Fusaka zitachukua muda na kutegemea BPOs.

## Kigezo-cha-Blobu-Pekee (Blob-Parameter-Only - BPOs) {#bpo}

Mtandao kinadharia utaweza kuchakata mablobu mara 8 zaidi, lakini ongezeko la mablobu ni mabadiliko ambayo yanahitaji kujaribiwa ipasavyo na kutekelezwa kwa usalama kwa hatua. Mitandao ya majaribio (Testnets) hutoa ujasiri wa kutosha kusambaza vipengele kwenye Mtandao Mkuu lakini tunahitaji kuhakikisha uthabiti wa mtandao wa p2p kabla ya kuwezesha idadi kubwa zaidi ya mablobu. 

Ili kuongeza hatua kwa hatua idadi lengwa ya mablobu kwa kila kitalu bila kulemea mtandao, Fusaka inaleta michepuo ya **[Kigezo-cha-Blobu-Pekee (BPO)](https://ethereum-magicians.org/t/blob-parameter-only-bpo-forks/22623)**. Tofauti na michepuo ya kawaida inayohitaji uratibu mpana wa mfumo ikolojia, makubaliano, na sasisho za programu, [BPOs (EIP-7892)](https://eips.ethereum.org/EIPS/eip-7892) ni sasisho zilizopangwa mapema ambazo huongeza idadi ya juu zaidi ya mablobu kadiri muda unavyosonga bila kuingiliwa.

Hii inamaanisha kwamba mara tu baada ya Fusaka kuwezeshwa na PeerDAS kuanza kufanya kazi, idadi ya mablobu itabaki bila kubadilika. Idadi ya mablobu itaanza kuongezeka mara mbili kila baada ya wiki chache hadi ifikie kiwango cha juu cha 48, huku wasanidi programu wakifuatilia ili kuhakikisha utaratibu unafanya kazi kama inavyotarajiwa na hauna athari mbaya kwa nodi zinazoendesha mtandao.

## Maelekezo ya baadaye {#future-directions}

PeerDAS ni hatua tu [kuelekea dira kubwa zaidi ya kuongeza uwezo ya FullDAS](https://ethresear.ch/t/fulldas-towards-massive-scalability-with-32mb-blocks-and-beyond/19529), au danksharding. Wakati PeerDAS inatumia usimbaji wa ufutaji wa 1D kwa kila blobu kibinafsi, danksharding kamili itatumia mpango kamili zaidi wa usimbaji wa ufutaji wa 2D katika matriki nzima ya data ya blobu. Kupanua data katika vipimo viwili huunda sifa dhabiti zaidi za uziada na ujenzi upya na uthibitishaji wenye ufanisi zaidi. Kufanikisha FullDAS kutahitaji uboreshaji mkubwa wa mtandao na itifaki, pamoja na utafiti wa ziada.

## Usomaji zaidi {#further-reading}

- [PeerDAS: Sampuli ya Upatikanaji wa Data ya Rika na Francesco D'Amato](https://www.youtube.com/watch?v=WOdpO1tH_Us)
- [Nyaraka za PeerDAS ya Ethereum](https://eprint.iacr.org/2024/1362.pdf)
- [Kuthibitisha Usalama wa PeerDAS bila AGM](https://eprint.iacr.org/2025/1683)
- [Vitalik kuhusu PeerDAS, athari zake, na kujaribu Fusaka](https://x.com/VitalikButerin/status/1970983281090085200)