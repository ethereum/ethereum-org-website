---
title: "Kufungua uwezo wa kuongeza ukubwa wa Ethereum: EIP-4844 imefafanuliwa"
description: "Finematics inafafanua EIP-4844 (Proto-Danksharding), sasisho kuu katika mchepuo mgumu wa Dencun ambalo linaleta miamala ya blobu ili kupunguza kwa kiasi kikubwa gharama za mikusanyiko ya tabaka la 2 (l2) kwenye Ethereum."
lang: sw
youtubeId: "HT9PHWloIiU"
uploadDate: 2024-03-11
duration: "0:10:56"
educationLevel: intermediate
topic:
  - "jinsi-ethereum-inavyofanya-kazi"
  - "kuongeza-ukubwa"
  - "eip-4844"
  - "dencun"
  - "masasisho"
format: explainer
author: Finematics
breadcrumb: "EIP-4844 Imefafanuliwa"
---

Ufafanuzi na **Finematics** unaohusu EIP-4844 (Proto-Danksharding), sasisho kuu katika mchepuo mgumu wa Dencun ambalo linaleta miamala ya blobu ili kupunguza kwa kiasi kikubwa gharama za mikusanyiko ya tabaka la 2 (l2) kwenye Ethereum.

*Nakala hii ni nakala inayofikika ya [nakala asili ya video](https://www.youtube.com/watch?v=HT9PHWloIiU) iliyochapishwa na Finematics. Imehaririwa kidogo ili isomeke kwa urahisi.*

#### Utangulizi (0:00) {#introduction-000}

Kuongeza ukubwa wa Ethereum imekuwa mada inayojadiliwa sana kwa muda sasa. Suluhu za tabaka la 2 (l2) zimekuwa mstari wa mbele katika vita hivi, zikitoa njia ya kushughulikia miamala nje ya mnyororo mkuu ili kupunguza msongamano na kupunguza ada. Lakini kuna tatizo — hata l2 zinakabiliwa na mapungufu yanayozuia ufanisi wao na uwezo wa kuongeza ukubwa. EIP-4844 ni hatua inayofuata katika kuongeza uwezo wa l2 na kuoanisha Ethereum na ramani yake ya kuongeza ukubwa.

Hivyo basi, EIP-4844 inahusu nini hasa? Inasaidiaje hasa katika kuongeza ukubwa wa l2? Inafungua uwezekano gani mpya? Na je, ni kweli kwamba inaweza kupunguza ada za miamala kwenye l2 kwa zaidi ya 90%?

#### EIP-4844 na Proto-Danksharding ni nini (0:52) {#what-is-eip-4844-and-proto-danksharding-052}

Kama ukumbusho, EIP inasimama badala ya Pendekezo la Kuboresha Ethereum (Ethereum Improvement Proposal), mchakato ambao kupitia huo wasanidi wanaweza kupendekeza mabadiliko kwenye itifaki ya Ethereum. EIP-4844, haswa, inatoa pendekezo la aina mpya ya muamala ambayo inaweza kuboresha kwa kiasi kikubwa jinsi data inavyoshughulikiwa na kuchakatwa kwenye Ethereum. Huenda pia umesikia jina "Proto-Danksharding," ambalo sasa linatumika kwa kubadilishana na EIP-4844.

Proto-Danksharding ni utekelezaji wa awali wa danksharding kamili. Inaweka msingi wa kuongeza ukubwa zaidi kwa kutumia danksharding katika siku zijazo. Hili linafikiwa kwa kutekeleza mantiki nyingi na "miundombinu" inayounda vipimo kamili vya danksharding, bila kutekeleza shadi ya data yenyewe. Kufanya hivi kwa njia hii kunaruhusu mpito rahisi na usiosumbua sana ambao unaweza kufanyika kupitia masasisho mengi ya mtandao bila kuleta hatari kubwa sana kwa Ethereum katika sasisho moja.

Wazo kuu nyuma ya EIP-4844 ni kusaidia mustakabali wa Ethereum "unaolenga rollup". Mikusanyiko ni suluhu za tabaka la 2 (l2) zinazochakata miamala nje ya mnyororo mkuu wa Ethereum lakini zinarithi usalama wa Ethereum. EIP-4844 inalenga kufanya mikusanyiko iwe ya bei nafuu na yenye ufanisi zaidi kwa kuanzisha aina mpya ya muamala ambayo inaweza kutumiwa na mikusanyiko ili kuwaruhusu kupunguza gharama zao za uendeshaji kwa kiasi kikubwa. Hili nalo litaruhusu programu zilizojengwa juu ya mikusanyiko kuwa nafuu sana kutumia na kuongeza upitishwaji wa mfumo mzima wa ikolojia wa Ethereum.

Fikiria kufanya badilishano la DEX kwenye mojawapo ya mikusanyiko. Ikiwa gharama ya sasa ya kufanya operesheni kama hiyo ni, tuseme, $1, kuna uwezekano mkubwa itapungua hadi karibu $0.10 baada ya EIP-4844. Athari katika mfano huu ina baadhi ya tahadhari ingawa tutazishughulikia baadaye kwenye video.

EIP-4844 pamoja na EIP nyingine chache zitajumuishwa katika sasisho la Dencun la mtandao linalokuja.

#### Maelezo ya kiufundi (2:50) {#technical-details-250}

Sasa, hebu tuangalie kwa karibu jinsi EIP-4844 inavyofanya kazi.

EIP-4844 inaleta aina mpya ya muamala kwenye Ethereum ambayo inakubali "mablobu" ya data kuhifadhiwa kwenye nodi ya kinara kwa muda mfupi. Mabadiliko haya yanaendana na ramani ya kuongeza ukubwa ya Ethereum ya siku zijazo, na mablobu ni madogo kiasi cha kuweka matumizi ya diski katika hali inayodhibitika. Miamala ya blobu iko katika muundo uleule ambao inatarajiwa kuwepo katika vipimo vya mwisho vya danksharding.

Hili linakuja pamoja na "soko la ada ya blob," kuhakikisha kwamba nafasi ya blobu inatumika kwa ufanisi na inabaki kuwa na faida kiuchumi. Hili linafikiwa kwa kuanzisha gesi ya blobu kama aina mpya ya gesi. Inajitegemea na gesi ya kawaida. Kwa sasa, mablobu pekee ndiyo yanayopangiwa bei katika gesi ya blobu.

Mablobu ni vipengele vya uga 4,096 vya baiti 32 kila kimoja. Kikomo cha blobu kwa kila kitalu kinadhibitiwa na kigezo cha MAX_BLOBS_PER_BLOCK. Kikomo kinaweza kuanza kikiwa chini na kukua kupitia masasisho mengi ya mtandao. Hapo awali, Dencun inalenga mablobu 6 kwa kila kitalu. 4,096 × baiti 32 × 6 kwa kila kitalu = 0.75 MB kwa kila kitalu.

Mablobu yanahifadhiwa katika nodi za kinara (tabaka la mwafaka), si katika tabaka la utekelezaji. Kazi ya shadi ya siku zijazo inahitaji tu mabadiliko kwenye nodi ya kinara, kuwezesha tabaka la utekelezaji kufanya kazi kwenye mipango mingine kwa wakati mmoja.

Mablobu ni ya muda mfupi na hufutwa baada ya takriban wiki mbili. Yanapatikana kwa muda wa kutosha kwa wahusika wote wa rollup kuyarejesha, lakini kwa muda mfupi wa kutosha kuweka matumizi ya diski katika hali inayodhibitika. Hili linaruhusu mablobu kupangiwa bei nafuu kuliko data za mwito, ambayo ni data iliyohifadhiwa kwenye historia milele.

Uti wa mgongo wa kificho wa EIP-4844 ni mafungamanisho ya KZG. Bila kuingia kwa undani sana, yanaruhusu ujumuishaji wa data kwa ufanisi na usalama, ambao ni muhimu kwa utendaji wa miamala ya blobu. Kwa njia hii, mafungamanisho ya mablobu pekee ndiyo yanayopaswa kufasiriwa na EVM katika tabaka la utekelezaji na si mablobu yenyewe.

Ili kuzalisha siri ya pamoja kwa ajili ya mafungamanisho ya KZG, sherehe iliyosambazwa sana na inayotegemea kivinjari iliendeshwa ili washiriki wote wa mtandao wa Ethereum wapate fursa ya kuhakikisha inazalishwa kwa usahihi na kwa usalama.

EIP-4844 inaongeza prikampaili mpya inayoitwa tathmini ya nukta (point evaluation) ambayo inathibitisha uthibitisho wa KZG unaodai kwamba blobu (inayowakilishwa na ufungamanisho) inatathminiwa kwa thamani fulani katika nukta fulani.

Hivyo basi, haya yote yanatumikaje hasa kwa mikusanyiko? Kwa nafasi mpya ya blobu, mikusanyiko itaweza kuweka data zao za kitalu kwenye mablobu badala ya data za mwito ghali zaidi ambazo zimekuwa zikitumika kwa madhumuni haya hadi sasa. Kutumia nafasi ya blobu ya muda mfupi katika tabaka la mwafaka kunawezekana kwani mikusanyiko inahitaji data ipatikane kwa muda wa kutosha tu ili kuhakikisha wahusika waaminifu wanaweza kuunda nafasi ya rollup.

Katika kesi ya mikusanyiko yenye matumaini (optimistic rollups) kama Optimism au Arbitrum, wanahitaji tu kutoa data ya msingi kwa muda ambao dirisha la changamoto ya udanganyifu liko wazi. Ushahidi wa udanganyifu unaweza kuthibitisha mpito katika hatua ndogo zaidi, ukipakia angalau thamani chache za blobu kwa wakati mmoja kupitia data za mwito.

Mikusanyiko ya ZK (ZK rollups) itatoa mafungamanisho mawili kwa muamala wao au data ya delta ya hali: ufungamanisho wa blobu na ufungamanisho wa mkusanyiko wa ZK wenyewe kwa kutumia mfumo wowote wa uthibitisho ambao rollup inatumia ndani kwa ndani. Pia wangetumia itifaki ya uthibitisho wa usawa, wakitumia prikampaili ya tathmini ya nukta iliyotajwa hapo awali, kuthibitisha kwamba mafungamanisho hayo mawili yanarejelea data sawa.

#### Athari (6:25) {#impact-625}

Athari ya EIP-4844 kwenye mfumo wa ikolojia wa Ethereum haiwezi kutiliwa chumvi. Kwa kuanzia, inaboresha kwa kiasi kikubwa uwezo wa kuongeza ukubwa wa suluhu za tabaka la 2 (l2), ikipunguza gharama zao za uendeshaji na kuzifanya ziwe na ushindani zaidi na minyororo ya vitalu mingine mbadala na ya bei nafuu. Kupungua kwa gharama za uendeshaji kunawezekana kwani idadi kubwa ya gharama inayopatikana kwa sasa na mikusanyiko inatokana na ada zinazolipwa kwa data za mwito.

Zaidi ya hayo, EIP-4844 inaweka msingi wa kuongeza ukubwa zaidi kupitia danksharding kamili. Sasisho hili la siku zijazo litagawanya mtandao wa Ethereum katika shadi nyingi za data, kila moja ikiwa na uwezo wa kuhifadhi data kwa kujitegemea, na kuongeza zaidi uwezo wa mtandao.

Pamoja na gharama za uendeshaji kupungua, tunaweza kushuhudia wimbi la suluhu mpya za tabaka la 2 (l2) zikiibuka, zikivutia wasanidi kujenga programu za kibunifu kwenye mikusanyiko.

Linapokuja suala la kupungua kwa gharama za miamala kwenye mikusanyiko, kama inavyoonyeshwa na mfano wetu wa awali wa badilishano la DEX, hali ni ngumu. Kwa kudhani mahitaji ya mikusanyiko yanabaki kuwa sawa baada ya EIP-4844, tunaweza kutarajia kupungua kwa kiasi kikubwa kwa gharama kwa watumiaji. Hata hivyo, maboresho katika uwezo wa kuongeza ukubwa yanaweza kusababisha athari za kiuchumi zisizotarajiwa. Kwa mfano, ada za chini za miamala kwa watumiaji wa mwisho zinaweza kuwafanya watu wengi zaidi kutumia mikusanyiko, na hivyo kuongeza mahitaji kwenye rasilimali za mtandao na uwezekano wa kuongeza gharama za miamala.

Jambo moja ni la uhakika — hata kama matokeo makuu ni ongezeko la uwezo wa upitishaji wa miamala na gharama ya miamala inabaki kuwa sawa, EIP-4844 inaweka msingi wa uwezo mkubwa zaidi wa kuongeza ukubwa katika siku zijazo ambao hatimaye utasababisha miamala ya bei nafuu kwa watumiaji.

#### Muhtasari (8:04) {#summary-804}

Jumuiya ya Ethereum tayari imekamilisha majaribio ya EIP-4844 kwenye mitandao mbalimbali ya majaribio, huku uzinduzi wa Mtandao Mkuu ukitarajiwa tarehe 13 Machi. Hii ni hatua kubwa kuelekea kufikia uwezo wa kuongeza ukubwa usio na kifani kwa Ethereum. Tayari tunaweza kuona l2 nyingi kuu zikijitolea kuanza kutumia nafasi mpya ya blobu mara tu sasisho la Dencun litakapotokea.

Kwa kumalizia, EIP-4844 ni zaidi ya sasisho tu. Ni wakati muhimu katika safari ya Ethereum kuelekea kuwa mnyororo wa vitalu unaoweza kuongeza ukubwa zaidi, wenye ufanisi, na unaofaa kwa watumiaji. Kwa kupunguza gharama na kuongeza ufanisi wa suluhu za tabaka la 2 (l2), Ethereum imepangwa kuimarisha nafasi yake kama jukwaa linaloongoza kwa programu zilizogatuliwa.