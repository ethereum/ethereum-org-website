---
title: "Mikusanyiko: mkakati mkuu wa kuongeza uwezo wa Ethereum?"
description: "Uchunguzi wa kina kuhusu mikusanyiko kama mkakati mkuu wa kuongeza uwezo wa Ethereum. Video hii inaeleza jinsi rollup za optimistic (Arbitrum, Optimism) na rollup za sifuri-maarifa zinavyofanya kazi."
lang: sw
youtubeId: "7pWxCklcNsU"
uploadDate: 2021-04-14
duration: "0:16:37"
educationLevel: intermediate
topic:
  - "scaling"
  - "rollups"
  - "optimistic-rollups"
  - "zk-rollups"
format: explainer
author: Finematics
breadcrumb: "Mikusanyiko"
---

Maelezo kutoka kwa **Finematics** yanayohusu mikusanyiko kama mkakati mkuu wa kuongeza uwezo wa Ethereum. Video hii inalinganisha rollup za optimistic (Arbitrum, Optimism) na rollup za ZK, na inachunguza kwa nini mikusanyiko imekuwa njia kuu ya kuongeza uwezo wa Ethereum.

*Nakala hii ni nakala inayofikika ya [nakala asili ya video](https://www.youtube.com/watch?v=7pWxCklcNsU) iliyochapishwa na Finematics. Imehaririwa kidogo ili isomeke kwa urahisi.*

#### Tabaka la 2 (1:17) {#layer-2-117}

Kuongeza uwezo wa Ethereum imekuwa mojawapo ya mada zinazojadiliwa sana katika kripto. Mjadala wa kuongeza uwezo kwa kawaida hupamba moto wakati wa vipindi vya shughuli nyingi za mtandao kama vile wazimu wa CryptoKitties mnamo 2017, Majira ya Joto ya fedha zilizogatuliwa (DeFi) ya 2020, au soko la ng'ombe la kripto mwanzoni mwa 2021. Wakati wa vipindi hivi, mahitaji yasiyo na kifani ya mtandao wa Ethereum yalisababisha ada za gesi kuwa juu sana, na kuifanya iwe ghali kwa watumiaji wa kila siku kulipia miamala yao.

Ili kukabiliana na tatizo hili, utafutaji wa suluhisho kuu la kuongeza uwezo umekuwa mojawapo ya vipaumbele vya juu kwa timu nyingi na jamii ya Ethereum kwa ujumla.

Kwa ujumla, kuna njia tatu kuu za kuongeza uwezo wa Ethereum — au kwa kweli, minyororo ya vitalu mingine mingi: kuongeza uwezo wa mnyororo wa vitalu wenyewe (kuongeza uwezo wa tabaka la 1), kujenga juu ya tabaka la 1 (kuongeza uwezo wa tabaka la 2), na kujenga kando ya tabaka la 1 (minyororo ya kando).

#### Nje ya tabaka la 1 (1:58) {#outside-of-layer-1-158}

Linapokuja suala la tabaka la 1, Eth2 ndilo suluhisho lililochaguliwa kwa ajili ya kuongeza uwezo wa mnyororo wa vitalu wa Ethereum. Eth2 inarejelea seti ya mabadiliko yaliyounganishwa kama vile uhamiaji kwenye Uthibitisho wa Dau (PoS), kuunganisha hali ya mnyororo wa vitalu wa Uthibitisho wa Kazi (PoW) kwenye mnyororo mpya wa Uthibitisho wa Dau, na shadi. Shadi, haswa, inaweza kuongeza kwa kiasi kikubwa uwezo wa upitishaji wa mtandao wa Ethereum, haswa inapounganishwa na mikusanyiko.

Linapokuja suala la kuongeza uwezo nje ya tabaka la 1, suluhisho nyingi tofauti za kuongeza uwezo zimejaribiwa na matokeo mchanganyiko. Kwa upande mmoja, tuna suluhisho za tabaka la 2 kama vile njia (channels) ambazo zinalindwa kikamilifu na Ethereum lakini zinafanya kazi vizuri tu kwa seti maalum ya programu. Minyororo ya kando, kwa upande mwingine, kwa kawaida inaendana na EVM na inaweza kuongeza uwezo wa programu za matumizi ya jumla. Kikwazo kikuu ni kwamba zina usalama mdogo kuliko suluhisho za tabaka la 2 kwa kutotegemea usalama wa Ethereum na badala yake kuwa na mifumo yao wenyewe ya mwafaka.

Mikusanyiko mingi inalenga kufikia ubora wa pande zote mbili kwa kuunda suluhisho la kuongeza uwezo la matumizi ya jumla huku bado ikitegemea kikamilifu usalama wa Ethereum. Hili ndilo lengo kuu la kuongeza uwezo, kwani inaruhusu kupeleka mikataba yote mahiri iliyopo kwenye Ethereum kwenye rollup kwa mabadiliko madogo au bila mabadiliko yoyote huku isipoteze usalama. Haishangazi mikusanyiko labda ndiyo suluhisho la kuongeza uwezo linalosubiriwa kwa hamu zaidi kuliko yote.

Rollup ni aina ya suluhisho la kuongeza uwezo ambalo linafanya kazi kwa kutekeleza miamala nje ya tabaka la 1 lakini kuchapisha data ya muamala kwenye tabaka la 1. Hii inaruhusu rollup kuongeza uwezo wa mtandao na bado kupata usalama wake kutoka kwa mwafaka wa Ethereum. Kuhamisha ukokotoaji nje ya mnyororo inaruhusu kimsingi kuchakata miamala mingi zaidi kwa jumla, kwani ni baadhi tu ya data ya miamala ya rollup inapaswa kutoshea kwenye vitalu vya Ethereum.

Ili kufanikisha hili, miamala ya rollup inatekelezwa kwenye mnyororo tofauti ambao unaweza hata kuendesha toleo maalum la EVM la rollup. Hatua inayofuata baada ya kutekeleza miamala kwenye rollup ni kuikusanya pamoja na kuichapisha kwenye mnyororo mkuu wa Ethereum. Mchakato mzima kimsingi unatekeleza miamala, unachukua data, unaibana, na kuikusanya kwenye mnyororo mkuu katika kundi moja — hivyo jina "rollup."

Kila rollup inapeleka seti ya mikataba mahiri kwenye tabaka la 1 ambayo inawajibika kwa kuchakata amana na uondoaji na kuthibitisha uthibitisho. Uthibitisho pia ndipo tofauti kuu kati ya aina tofauti za mikusanyiko inapoingia. Rollup za optimistic zinatumia ushahidi wa udanganyifu, wakati rollup za ZK zinatumia uthibitisho wa uhalali.

#### Rollup za optimistic (4:26) {#optimistic-rollups-426}

Rollup za optimistic zinachapisha data kwenye tabaka la 1 na kudhani ni sahihi — hivyo jina "optimistic." Ikiwa data iliyochapishwa ni halali, tuko kwenye njia nzuri na hakuna kingine kinachopaswa kufanywa. Rollup ya optimistic inafaidika kwa kutolazimika kufanya kazi yoyote ya ziada katika hali ya matumaini.

Katika hali ya muamala batili, mfumo unapaswa kuwa na uwezo wa kuutambua, kurejesha hali sahihi, na kuiadhibu pande inayowasilisha muamala kama huo. Ili kufanikisha hili, rollup za optimistic zinatekeleza mfumo wa utatuzi wa migogoro ambao una uwezo wa kuthibitisha ushahidi wa udanganyifu, kugundua miamala ya udanganyifu, na kuwavunja moyo watendaji wabaya kuwasilisha miamala mingine batili au ushahidi wa udanganyifu usio sahihi.

Katika utekelezaji mwingi wa rollup za optimistic, pande ambayo ina uwezo wa kuwasilisha makundi ya miamala kwenye tabaka la 1 inapaswa kutoa dhamana, kwa kawaida katika mfumo wa ETH. Mshiriki mwingine yeyote wa mtandao anaweza kuwasilisha ushahidi wa udanganyifu ikiwa atagundua muamala usio sahihi. Baada ya ushahidi wa udanganyifu kuwasilishwa, mfumo unaingia katika hali ya utatuzi wa migogoro. Katika hali hii, muamala unaotiliwa shaka unatekelezwa tena — wakati huu kwenye mnyororo mkuu wa Ethereum. Ikiwa utekelezaji unathibitisha kuwa muamala ulikuwa wa udanganyifu kweli, pande iliyowasilisha muamala huu inaadhibiwa, kwa kawaida kwa kufanyiwa ukataji wa ETH zao zilizowekwa dhamana.

Ili kuzuia watendaji wabaya kutuma taka kwenye mtandao na ushahidi wa udanganyifu usio sahihi, pande zinazotaka kuwasilisha ushahidi wa udanganyifu kwa kawaida pia zinapaswa kutoa dhamana ambayo inaweza kufanyiwa ukataji.

Ili kuweza kutekeleza muamala wa rollup kwenye tabaka la 1, rollup za optimistic zinapaswa kutekeleza mfumo ambao una uwezo wa kurudia muamala na hali halisi iliyokuwepo wakati muamala ulipotekelezwa awali kwenye rollup. Hii ni mojawapo ya sehemu ngumu za rollup za optimistic na kwa kawaida inafikiwa kwa kuunda mkataba tofauti wa meneja ambao unachukua nafasi ya miito fulani ya utendaji na hali kutoka kwenye rollup.

Mfumo unaweza kufanya kazi kama inavyotarajiwa na kugundua udanganyifu hata kama kuna pande moja tu ya uaminifu inayofuatilia hali ya rollup na kuwasilisha ushahidi wa udanganyifu ikihitajika. Kutokana na vivutio sahihi ndani ya mfumo wa rollup, kuingia katika mchakato wa utatuzi wa migogoro inapaswa kuwa hali ya kipekee na si kitu kinachotokea wakati wote.

Linapokuja suala la rollup za ZK, hakuna utatuzi wa migogoro kabisa. Hili linawezekana kwa kutumia kipande kijanja cha kriptografia kinachoitwa uthibitisho wa sifuri-maarifa — hivyo jina rollup za ZK. Katika mfumo huu, kila kundi linalochapishwa kwenye tabaka la 1 linajumuisha uthibitisho wa kriptografia unaoitwa ZK-SNARK. Uthibitisho unaweza kuthibitishwa haraka na mkataba wa tabaka la 1 wakati kundi la muamala linapowasilishwa, na makundi batili yanaweza kukataliwa mara moja.

#### Tofauti nyingine (7:28) {#other-differences-728}

Kutokana na asili ya mchakato wa utatuzi wa migogoro, rollup za optimistic zinapaswa kutoa muda wa kutosha kwa washiriki wote wa mtandao kuwasilisha ushahidi wa udanganyifu kabla ya kukamilisha muamala kwenye tabaka la 1. Kipindi hiki kwa kawaida ni kirefu sana — ili kuhakikisha kwamba hata katika hali mbaya zaidi, miamala ya udanganyifu bado inaweza kupingwa. Hii inasababisha uondoaji kutoka kwenye rollup za optimistic kuwa mrefu sana, kwani watumiaji wanapaswa kusubiri hadi wiki moja au mbili ili kuweza kutoa fedha zao kurudi kwenye tabaka la 1.

Kwa bahati nzuri, kuna miradi michache inayofanya kazi kuboresha hali hii kwa kutoa "njia za haraka za ukwasi." Miradi hii inatoa uondoaji wa karibu papo hapo kurudi kwenye tabaka la 1, tabaka la 2 lingine, au hata mnyororo wa kando na kutoza ada ndogo kwa urahisi huo. Itifaki ya Hop na Connext ni miradi ya kuangalia.

Rollup za ZK hazina tatizo la uondoaji wa muda mrefu, kwani fedha zinapatikana kwa uondoaji mara tu kundi la rollup, pamoja na uthibitisho wa uhalali, linapowasilishwa kwenye tabaka la 1.

Hata hivyo, rollup za ZK zinakuja na vikwazo vyake. Kutokana na ugumu wa teknolojia, ni vigumu zaidi kuunda rollup ya ZK inayoendana na EVM, ambayo inafanya iwe vigumu zaidi kuongeza uwezo wa programu za matumizi ya jumla bila kulazimika kuandika upya mantiki ya programu. Hata hivyo, zkSync inafanya maendeleo makubwa katika eneo hili na wanaweza kuzindua rollup ya ZK inayoendana na EVM hivi karibuni.

Rollup za optimistic zina wakati rahisi kiasi na utangamano wa EVM. Bado zinapaswa kuendesha toleo lao wenyewe la EVM na marekebisho machache, lakini 99% ya mikataba inaweza kuhamishwa bila kufanya mabadiliko yoyote. Rollup za ZK pia ni nzito zaidi katika ukokotoaji kuliko rollup za optimistic, ikimaanisha kwamba nodi zinazokokotoa uthibitisho wa ZK zinapaswa kuwa mashine zenye uwezo wa juu, na kufanya iwe vigumu kwa watumiaji wengine kuziendesha.

#### Maboresho ya kuongeza uwezo (9:32) {#scaling-improvements-932}

Linapokuja suala la maboresho ya kuongeza uwezo, aina zote mbili za mikusanyiko zinapaswa kuwa na uwezo wa kuongeza uwezo wa Ethereum kutoka karibu miamala 15–45 kwa sekunde (kulingana na aina ya muamala) hadi miamala 1,000–4,000 kwa sekunde. Inafaa kuzingatia kwamba inawezekana kuchakata miamala mingi zaidi kwa sekunde kwa kutoa nafasi zaidi kwa makundi ya rollup kwenye tabaka la 1.

Hii pia ndiyo sababu Eth2 inaweza kuunda ushirikiano mkubwa na mikusanyiko, kwani inaongeza nafasi inayowezekana ya upatikanaji wa data kwa kuunda shadi nyingi — kila moja ikiwa na uwezo wa kuhifadhi kiasi kikubwa cha data. Mchanganyiko wa Eth2 na mikusanyiko unaweza kuleta kasi ya muamala ya Ethereum hadi miamala 100,000 kwa sekunde.

Optimism na Arbitrum kwa sasa ndizo chaguzi maarufu zaidi linapokuja suala la rollup za optimistic. Optimism imezinduliwa kwa kiasi kwenye Mtandao Mkuu wa Ethereum na seti ndogo ya washirika kama vile Synthetix na Uniswap ili kuhakikisha kwamba teknolojia inafanya kazi kama inavyotarajiwa kabla ya uzinduzi kamili. Arbitrum tayari imepeleka toleo lake kwenye Mtandao Mkuu na kuanza uingizaji wa miradi tofauti katika mfumo wake wa ikolojia.

Baadhi ya miradi mashuhuri inayozinduliwa kwenye Arbitrum ni pamoja na Uniswap, Sushi, Bancor, Augur, Chainlink, Aave, na mingine mingi. Arbitrum pia imetangaza ushirikiano wake na Reddit, ikilenga kuzindua mnyororo tofauti wa rollup ili kuongeza uwezo wa mfumo wao wa tuzo. Optimism inashirikiana na MakerDAO kuunda Daraja la Optimism Dai na kuwezesha uondoaji wa haraka wa DAI na tokeni nyingine kurudi kwenye tabaka la 1.

Ingawa Arbitrum na Optimism zinajaribu kufikia lengo sawa — kujenga suluhisho za rollup za optimistic zinazoendana na EVM — kuna tofauti chache katika muundo wao. Arbitrum ina mfumo tofauti wa utatuzi wa migogoro. Badala ya kuendesha tena muamala mzima kwenye tabaka la 1 ili kuthibitisha ikiwa ushahidi wa udanganyifu ni halali, wamekuja na mfumo wa mwingiliano wa raundi nyingi ambao unaruhusu kupunguza wigo wa mgogoro na uwezekano wa kutekeleza maagizo machache tu kwenye tabaka la 1 ili kuangalia ikiwa muamala unaotiliwa shaka ni halali.

Tofauti nyingine kubwa ni mbinu ya kushughulikia upangaji wa miamala na MEV. Arbitrum mwanzoni itaendesha mpangaji anayewajibika kwa kupanga miamala, lakini wanataka kuigatua kwa muda mrefu. Optimism inapendelea mbinu nyingine ambapo upangaji wa miamala — na hivyo MEV — inaweza kupigwa mnada kwa pande nyingine kwa kipindi fulani cha muda.

#### Rollup za ZK (13:10) {#zk-rollups-1310}

Ingawa inaonekana kama jamii ya Ethereum inaangazia zaidi rollup za optimistic — angalau kwa muda mfupi — miradi inayofanya kazi kwenye rollup za ZK pia inaendelea haraka sana.

Loopring inatumia teknolojia ya rollup ya ZK kuongeza uwezo wa ubadilishanaji wake na itifaki ya malipo. Hermez na ZKTube wanafanya kazi ya kuongeza uwezo wa malipo kwa kutumia rollup za ZK, huku Hermez pia ikijenga rollup ya ZK inayoendana na EVM. Aztec inaangazia kuleta vipengele vya faragha kwenye teknolojia yao ya rollup ya ZK.

Mikusanyiko inayotegemea StarkWare tayari inatumiwa sana na miradi kama vile DeversiFi, Immutable X, na dYdX. Kama ilivyotajwa hapo awali, zkSync inafanya kazi kwenye mashine pepe inayoendana na EVM ambayo itaweza kusaidia kikamilifu mikataba mahiri yoyote ya kiholela iliyoandikwa katika Solidity.

#### Fedha zilizogatuliwa (DeFi) (14:02) {#defi-1402}

Mikusanyiko inapaswa pia kuwa na athari kubwa kwenye fedha zilizogatuliwa (DeFi). Watumiaji ambao hapo awali hawakuweza kufanya miamala kwenye Ethereum kutokana na ada kubwa za muamala wataweza kubaki katika mfumo wa ikolojia wakati ujao shughuli za mtandao zitakapokuwa nyingi. Mikusanyiko pia itawezesha aina mpya ya programu zinazohitaji miamala ya bei nafuu na muda wa uthibitisho wa haraka — yote huku ikilindwa kikamilifu na mwafaka wa Ethereum. Inaonekana kama mikusanyiko inaweza kuchochea kipindi kingine cha ukuaji wa juu kwa DeFi.

#### Changamoto (14:29) {#challenges-1429}

Hata hivyo, kuna changamoto chache linapokuja suala la mikusanyiko. Utangamano ni mojawapo — ili kuunda muamala unaotumia itifaki nyingi, zote zingepaswa kupelekwa kwenye rollup sawa.

Changamoto nyingine ni ukwasi uliogawanyika. Bila pesa mpya kuingia katika mfumo wa ikolojia wa Ethereum kwa ujumla, ukwasi uliopo kwenye tabaka la 1 katika itifaki kama vile Uniswap au Aave utashirikiwa kati ya tabaka la 1 na utekelezaji wa mikusanyiko mingi. Ukwasi mdogo kwa kawaida unamaanisha tofauti ya utekelezaji kubwa zaidi na utekelezaji mbaya zaidi wa biashara.

Hii pia inamaanisha kwamba kwa asili kutakuwa na washindi na walioshindwa. Kwa sasa, mfumo wa ikolojia wa Ethereum uliopo si mkubwa kiasi cha kutumia suluhisho zote za kuongeza uwezo. Hili linaweza — na labda litabadilika — kwa muda mrefu, lakini kwa muda mfupi, tunaweza kuona baadhi ya mikusanyiko na suluhisho nyingine za kuongeza uwezo zikigeuka kuwa miji iliyotelekezwa. Katika siku zijazo, tunaweza pia kuona watumiaji wakiishi kabisa ndani ya mfumo mmoja wa ikolojia wa rollup na kutoshirikiana na mnyororo mkuu wa Ethereum na suluhisho nyingine za kuongeza uwezo kwa vipindi virefu vya muda.

#### Tishio kwa minyororo ya kando (15:44) {#threat-to-sidechains-1544}

Swali moja ambalo hujitokeza mara nyingi sana wakati wa kujadili mikusanyiko ni kama ni tishio kwa minyororo ya kando. Minyororo ya kando bado itakuwa na nafasi yake katika mfumo wa ikolojia wa Ethereum. Ingawa gharama ya miamala kwenye tabaka la 2 itakuwa chini sana kuliko kwenye tabaka la 1, kuna uwezekano mkubwa bado itakuwa juu kiasi cha kuondoa aina fulani za programu kama vile michezo na programu nyingine zenye kiasi kikubwa cha matumizi. Hili linaweza kubadilika wakati Ethereum inapoanzisha shadi, lakini kufikia wakati huo minyororo ya kando inaweza kuunda athari ya kutosha ya mtandao ili kuishi kwa muda mrefu.

Pia, ada kwenye mikusanyiko ni kubwa kuliko kwenye minyororo ya kando kwa sababu kila kundi la rollup bado linapaswa kulipia nafasi ya kitalu cha Ethereum. Jamii ya Ethereum inaweka mkazo mkubwa kwenye mikusanyiko katika mkakati wa kuongeza uwezo wa Ethereum — angalau kwa muda mfupi hadi wa kati na uwezekano wa hata muda mrefu zaidi.