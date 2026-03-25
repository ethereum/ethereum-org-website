---
title: Madaraja
description: Muhtasari wa kuunda madaraja kwa ajili ya wasanidi programu
lang: sw
---

Kutokana na kuongezeka kwa minyororo ya bloku ya L1 na suluhu za [uongezaji](/developers/docs/scaling/) wa L2, pamoja na idadi inayoongezeka ya programu zilizogatuliwa zinazovuka minyororo, hitaji la mawasiliano na uhamishaji wa rasilimali kwenye minyororo limekuwa sehemu muhimu ya miundombinu ya mtandao. Kuna aina tofauti za madaraja zinazosaidia kufanya hili liwezekane.

## Haja ya madaraja {#need-for-bridges}

Madaraja yapo ili kuunganisha mitandao ya blokucheni. Huwezesha muunganisho na utangamano kati ya minyororo ya bloku.

Minyororo ya bloku ipo katika mazingira yaliyotengwa, ikimaanisha hakuna njia ya minyororo ya bloku kufanya biashara na kuwasiliana na minyororo mingine ya bloku kiasili. Matokeo yake, ingawa kunaweza kuwa na shughuli kubwa na uvumbuzi ndani ya mfumo ikolojia, inazuiliwa na ukosefu wa muunganisho na utangamano na mifumo mingine ikolojia.

Madaraja hutoa njia kwa mazingira ya minyororo ya bloku yaliyotengwa kuungana. Huanzisha njia ya usafirishaji kati ya minyororo ya bloku ambapo tokeni, ujumbe, data holela, na hata wito za [mkataba-erevu](/developers/docs/smart-contracts/) zinaweza kuhamishwa kutoka mnyororo mmoja hadi mwingine.

## Faida za madaraja {#benefits-of-bridges}

Kwa ufupi, madaraja hufungua visa vingi vya utumiaji kwa kuruhusu mitandao ya minyororo ya bloku kubadilishana data na kuhamisha rasilimali baina yao.

Minyororo ya bloku ina nguvu, udhaifu na mbinu za kipekee za kuunda programu (kama vile kasi, upitishaji, gharama, n.k.). Madaraja husaidia maendeleo ya mfumo ikolojia mzima wa crypto kwa kuwezesha minyororo ya bloku kutumia ubunifu wa kila mmoja.

Kwa wasanidi programu, madaraja huwezesha yafuatayo:

- uhamishaji wa data, taarifa, na rasilimali zozote kwenye minyororo.
- kufungua vipengele vipya na visa vya utumiaji kwa ajili ya itifaki kwani madaraja hupanua nafasi ya usanifu kwa kile ambacho itifaki zinaweza kutoa. Kwa mfano, itifaki ya kilimo cha mavuno iliyotumwa awali kwenye Mtandao Mkuu wa Ethereum inaweza kutoa vidimbwi vya ukwasi kwenye minyororo yote inayotangamana na EVM.
- fursa ya kutumia nguvu za minyororo tofauti ya bloku. Kwa mfano, wasanidi programu wanaweza kufaidika na ada za chini zinazotolewa na suluhu mbalimbali za L2 kwa kutuma dApps zao kwenye unda-mpya na sidechains na watumiaji wanaweza kutumia daraja baina yao.
- ushirikiano kati ya wasanidi programu kutoka mifumo ikolojia mbalimbali ya minyororo ya bloku ili kuunda bidhaa mpya.
- kuvutia watumiaji na jamii kutoka mifumo mbalimbali ikolojia hadi kwenye dApps zao.

## Madaraja hufanyaje kazi? {#how-do-bridges-work}

Ingawa kuna [aina nyingi za miundo ya madaraja](https://li.fi/knowledge-hub/blockchain-bridges-and-classification/), njia tatu za kuwezesha uhamishaji wa rasilimali kwenye minyororo tofauti hujitokeza:

- **Funga na unda –** Funga rasilimali kwenye mnyororo chanzo na unda rasilimali kwenye mnyororo lengwa.
- **Teketeza na unda –** Teketeza rasilimali kwenye mnyororo chanzo na unda rasilimali kwenye mnyororo lengwa.
- **Ubadilishanaji wa atomiki –** Badilisha rasilimali kwenye mnyororo chanzo kwa rasilimali kwenye mnyororo lengwa na upande mwingine.

## Aina za madaraja {#bridge-types}

Madaraja kwa kawaida yanaweza kuainishwa katika mojawapo ya makundi yafuatayo:

- **Madaraja ya asili –** Madaraja haya kwa kawaida hujengwa ili kuanzisha ukwasi kwenye mnyororo fulani wa bloku, na kurahisisha watumiaji kuhamisha fedha kwenye mfumo ikolojia. Kwa mfano, [Daraja la Arbitrum](https://bridge.arbitrum.io/) limejengwa ili kurahisisha watumiaji kutumia daraja kutoka Mtandao Mkuu wa Ethereum kwenda Arbitrum. Madaraja mengine kama hayo ni pamoja na Daraja la PoS la Polygon, [Lango la Optimism](https://app.optimism.io/bridge), n.k.
- **Madaraja yanayotegemea wathibitishaji au oracles –** Madaraja haya hutegemea seti ya wathibitishaji wa nje au oracles ili kuthibitisha uhamishaji wa minyororo-tofauti. Mifano: Multichain na Across.
- **Madaraja ya upitishaji ujumbe yaliyo jumla –** Madaraja haya yanaweza kuhamisha rasilimali, pamoja na ujumbe na data holela kwenye minyororo. Mifano: Axelar, LayerZero, na Nomad.
- **Mitandao ya ukwasi –** Madaraja haya hulenga hasa kuhamisha rasilimali kutoka mnyororo mmoja hadi mwingine kupitia ubadilishanaji wa atomiki. Kwa ujumla, hayaauni upitishaji wa ujumbe kwenye minyororo-tofauti. Mifano: Connext na Hop.

## Mambo ya kubadilishana ya kuzingatia {#trade-offs}

Kuhusu madaraja, hakuna suluhu kamilifu. Badala yake, kuna mabadilishano tu yanayofanywa ili kutimiza kusudi. Wasanidi programu na watumiaji wanaweza kutathmini madaraja kulingana na mambo yafuatayo:

- **Usalama –** Nani anathibitisha mfumo? Madaraja yanayolindwa na wathibitishaji wa nje kwa kawaida si salama sana kuliko madaraja yanayolindwa ndani ya nchi au asili na wathibitishaji wa mnyororo wa bloku.
- **Urahisi –** Inachukua muda gani kukamilisha muamala, na je, mtumiaji alihitaji kusaini miamala mingapi? Kwa msanidi programu, inachukua muda gani kuunganisha daraja, na mchakato ni mgumu kiasi gani?
- **Muunganisho –** Je, ni minyororo gani tofauti lengwa ambayo daraja linaweza kuunganisha (k.m., unda-mpya, sidechains, minyororo mingine ya bloku ya safu ya 1, n.k.), na ni vigumu kiasi gani kuunganisha mnyororo mpya wa bloku?
- **Uwezo wa kupitisha data changamano zaidi –** Je, daraja linaweza kuwezesha uhamishaji wa ujumbe na data holela changamano zaidi kwenye minyororo, au linasaidia tu uhamishaji wa rasilimali kwenye minyororo-tofauti?
- **Ufanisi wa gharama –** Inagharimu kiasi gani kuhamisha rasilimali kwenye minyororo kupitia daraja? Kwa kawaida, madaraja hutoza ada isiyobadilika au inayobadilika kulingana na gharama za gesi na ukwasi wa njia maalum. Pia ni muhimu kutathmini ufanisi wa gharama wa daraja kulingana na mtaji unaohitajika ili kuhakikisha usalama wake.

Kwa kiwango cha juu, madaraja yanaweza kugawanywa kama yanayoaminika na yasiyo na uaminifu.

- **Yanayoaminika –** Madaraja yanayoaminika yanathibitishwa na wahusika wa nje. Hutumia seti ya nje ya wathibitishaji (Mashirikisho yenye sahihi-nyingi, mifumo ya ukokotoaji ya wahusika wengi, mtandao wa oracle) kutuma data kwenye minyororo. Matokeo yake, yanaweza kutoa muunganisho mzuri na kuwezesha upitishaji wa ujumbe ulio jumla kabisa kwenye minyororo. Pia huwa yanafanya vizuri kwa kasi na ufanisi wa gharama. Hii inakuja kwa gharama ya usalama, kwani watumiaji wanapaswa kutegemea usalama wa daraja.
- **Yasiyo na uaminifu –** Madaraja haya hutegemea minyororo ya bloku wanayounganisha na wathibitishaji wao kuhamisha ujumbe na tokeni. Haya 'hayana uaminifu' kwa sababu hayaongezi dhana mpya za uaminifu (pamoja na minyororo ya bloku). Matokeo yake, madaraja yasiyo na uaminifu yanachukuliwa kuwa salama zaidi kuliko madaraja yanayoaminika.

Ili kutathmini madaraja yasiyo na uaminifu kulingana na mambo mengine, lazima tuyagawanye katika madaraja ya upitishaji wa ujumbe yaliyo jumla na mitandao ya ukwasi.

- **Madaraja ya upitishaji ujumbe yaliyo jumla –** Madaraja haya hufanya vizuri sana kwa usalama na uwezo wa kuhamisha data changamano zaidi kwenye minyororo. Kwa kawaida, pia ni mazuri kwa ufanisi wa gharama. Hata hivyo, nguvu hizi kwa ujumla huja kwa gharama ya muunganisho kwa madaraja ya wateja wepesi (k.m., IBC) na hasara za kasi kwa madaraja ya matumaini (k.m., Nomad) yanayotumia ushahidi wa ulaghai.
- **Mitandao ya ukwasi –** Madaraja haya hutumia ubadilishanaji wa atomiki kuhamisha rasilimali na ni mifumo iliyothibitishwa ndani (yaani, hutumia wathibitishaji wa minyororo ya bloku ya msingi kuthibitisha miamala). Matokeo yake, hufanya vizuri sana kwa usalama na kasi. Zaidi ya hayo, yanachukuliwa kuwa na ufanisi wa gharama kwa kulinganisha na hutoa muunganisho mzuri. Hata hivyo, mbadilishano mkuu ni kutokuwa na uwezo wa kupitisha data changamano zaidi – kwani hayaauni upitishaji wa ujumbe kwenye minyororo-tofauti.

## Hatari zinazohusiana na madaraja {#risk-with-bridges}

Madaraja yanahusika na [udukuzi tatu kubwa zaidi katika DeFi](https://rekt.news/leaderboard/) na bado yako katika hatua za awali za maendeleo. Kutumia daraja lolote kuna hatari zifuatazo:

- **Hatari ya mkataba-erevu –** Ingawa madaraja mengi yamefaulu kupita ukaguzi, kinachohitajika ni kasoro moja tu katika mkataba-erevu ili rasilimali ziwe wazi kwa udukuzi (k.m., [Daraja la Wormhole la Solana](https://rekt.news/wormhole-rekt/)).
- **Hatari za kifedha za kimfumo** – Madaraja mengi hutumia rasilimali zilizofungwa ili kuunda matoleo ya kikanuni ya rasilimali asili kwenye mnyororo mpya. Hii huweka mfumo ikolojia kwenye hatari ya kimfumo, kama tulivyoona matoleo yaliyofungwa ya tokeni yakitumiwa vibaya.
- **Hatari ya mhusika mwingine –** Baadhi ya madaraja hutumia muundo unaoaminika unaohitaji watumiaji kutegemea dhana kwamba wathibitishaji hawatashirikiana kuiba fedha za watumiaji. Haja ya watumiaji kuwaamini wahusika hawa wa tatu huwaweka katika hatari kama vile uvutaji zulia, udhibiti, na shughuli nyingine hasidi.
- **Masuala yaliyo wazi –** Kwa kuwa madaraja yako katika hatua za awali za maendeleo, kuna maswali mengi yasiyo na majibu yanayohusiana na jinsi madaraja yatakavyofanya kazi katika hali tofauti za soko, kama vile nyakati za msongamano wa mtandao na wakati wa matukio yasiyotarajiwa kama vile mashambulizi ya kiwango cha mtandao au urejeshaji wa hali. Kutokuwa na uhakika huu huleta hatari fulani, ambazo kiwango chake bado hakijulikani.

## Je, dApps zinawezaje kutumia madaraja? {#how-can-dapps-use-bridges}

Hapa kuna baadhi ya matumizi ya vitendo ambayo wasanidi programu wanaweza kuzingatia kuhusu madaraja na kupeleka dApp yao kwenye minyororo-tofauti:

### Kuunganisha madaraja {#integrating-bridges}

Kwa wasanidi programu, kuna njia nyingi za kuongeza usaidizi kwa madaraja:

1. **Kujenga daraja lako mwenyewe –** Kujenga daraja salama na la kuaminika si rahisi, hasa ukichukua njia iliyopunguzwa uaminifu. Zaidi ya hayo, inahitaji miaka ya uzoefu na utaalamu wa kiufundi unaohusiana na masomo ya uongezaji na utangamano. Zaidi ya hayo, ingehitaji timu ya vitendo ili kudumisha daraja na kuvutia ukwasi wa kutosha ili kuifanya iwezekane.

2. **Kuwaonyesha watumiaji chaguo nyingi za madaraja –** [dApps](/developers/docs/dapps/) nyingi huhitaji watumiaji wawe na tokeni yao asili ili kuingiliana nazo. Ili kuwawezesha watumiaji kufikia tokeni zao, hutoa chaguo tofauti za madaraja kwenye tovuti yao. Hata hivyo, njia hii ni suluhu ya haraka kwa tatizo kwani humwondoa mtumiaji kwenye kiolesura cha dApp na bado inamhitaji aingiliane na dApps na madaraja mengine. Huu ni uzoefu mgumu wa kuanza kutumia wenye wigo ulioongezeka wa kufanya makosa.

3. **Kuunganisha daraja –** Suluhu hii haihitaji dApp kuwatuma watumiaji kwenye daraja la nje na violesura vya DEX. Inaruhusu dApps kuboresha uzoefu wa mtumiaji anayeanza. Hata hivyo, mbinu hii ina mapungufu yake:

   - Tathmini na matengenezo ya madaraja ni magumu na huchukua muda mwingi.
   - Kuchagua daraja moja huunda sehemu moja ya kutofaulu na utegemezi.
   - dApp inawekewa mipaka na uwezo wa daraja.
   - Madaraja pekee huenda yasitoshe. dApps zinaweza kuhitaji DEXs kutoa utendaji zaidi kama vile ubadilishanaji wa minyororo-tofauti.

4. **Kuunganisha madaraja mengi –** Suluhu hii hutatua matatizo mengi yanayohusiana na kuunganisha daraja moja. Hata hivyo, pia ina mapungufu, kwani kuunganisha madaraja mengi hutumia rasilimali nyingi na huleta gharama za ziada za kiufundi na mawasiliano kwa wasanidi programu—rasilimali adimu zaidi katika crypto.

5. **Kuunganisha mkusanyaji wa madaraja –** Chaguo jingine kwa dApps ni kuunganisha suluhisho la mkusanyiko wa madaraja ambalo huwapa ufikiaji wa madaraja mengi. Wakusanyaji wa madaraja hurithi nguvu za madaraja yote na hivyo hawazuiliwi na uwezo wa daraja lolote moja. Hasa, wakusanyaji wa madaraja kwa kawaida hudumisha uunganishaji wa madaraja, jambo ambalo huiepusha dApp na usumbufu wa kufuatilia masuala ya kiufundi na kiutendaji ya uunganishaji wa daraja.

Hata hivyo, wakusanyaji wa madaraja pia wana mapungufu yao. Kwa mfano, ingawa wanaweza kutoa chaguo zaidi za madaraja, kwa kawaida kuna madaraja mengi zaidi yanayopatikana sokoni kuliko yale yanayotolewa kwenye jukwaa la mkusanyaji. Zaidi ya hayo, kama vile madaraja, wakusanyaji wa madaraja pia wako wazi kwa hatari za mkataba-erevu na teknolojia (mikataba-erevu zaidi = hatari zaidi).

Ikiwa dApp itafuata njia ya kuunganisha daraja au mkusanyaji, kuna chaguo tofauti kulingana na jinsi uunganishaji unavyokusudiwa kuwa wa kina. Kwa mfano, ikiwa ni uunganishaji wa mbele tu ili kuboresha uzoefu wa kuanza kwa mtumiaji, dApp itaunganisha wijeti. Hata hivyo, ikiwa uunganishaji ni kuchunguza mikakati ya kina ya minyororo-tofauti kama vile kusimamisha, kilimo cha mavuno, n.k., dApp huunganisha SDK au API.

### Kutuma dApp kwenye minyororo mingi {#deploying-a-dapp-on-multiple-chains}

Ili kutuma dApp kwenye minyororo mingi, wasanidi programu wanaweza kutumia majukwaa ya maendeleo kama [Alchemy](https://www.alchemy.com/), [Hardhat](https://hardhat.org/), [Moralis](https://moralis.io/), n.k. Kwa kawaida, majukwaa haya huja na programu-jalizi zinazoweza kutungika ambazo zinaweza kuwezesha dApps kwenda kwenye minyororo-tofauti. Kwa mfano, wasanidi programu wanaweza kutumia proksi ya utumaji ya kudhamiria inayotolewa na [programu-jalizi ya hardhat-deploy](https://github.com/wighawag/hardhat-deploy).

#### Mifano:

- [Jinsi ya kuunda dApps za minyororo-tofauti](https://moralis.io/how-to-build-cross-chain-dapps/)
- [Kuunda Soko la NFT la Minyororo-Tofauti](https://youtu.be/WZWCzsB1xUE)
- [Moralis: Kuunda dApps za NFT za minyororo-tofauti](https://www.youtube.com/watch?v=ehv70kE1QYo)

### Kufuatilia shughuli za mkataba kwenye minyororo {#monitoring-contract-activity-across-chains}

Ili kufuatilia shughuli za mkataba kwenye minyororo, wasanidi programu wanaweza kutumia subgrafu na majukwaa ya wasanidi programu kama Tenderly ili kuchunguza mikataba-erevu kwa wakati halisi. Majukwaa kama haya pia yana zana zinazotoa utendaji mkuu zaidi wa ufuatiliaji wa data kwa shughuli za minyororo-tofauti, kama vile kuangalia [matukio yanayotolewa na mikataba](https://docs.soliditylang.org/en/v0.8.14/contracts.html?highlight=events#events), n.k.

#### Zana

- [The Graph](https://thegraph.com/en/)
- [Tenderly](https://tenderly.co/)

## Masomo zaidi {#further-reading}

- [Madaraja ya Mnyororo wa bloku](/bridges/) – ethereum.org
- [Mfumo wa Hatari wa Daraja wa L2Beat](https://l2beat.com/bridges/summary)
- [Madaraja ya Mnyororo wa bloku: Kujenga Mitandao ya Mitandao ya Crypto](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) - Sep 8, 2021 – Dmitriy Berenzon
- [Utata wa Utangamano](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17) - Okt 1, 2021 – Arjun Bhuptani
- [Makundi: Jinsi Madaraja Yanayoaminika na Yaliyopunguzwa Uaminifu Yanavyounda Mandhari ya Minyororo-Mingi](https://blog.celestia.org/clusters/) - Okt 4, 2021 – Mustafa Al-Bassam
- [LI.FI: Kwa Madaraja, Uaminifu ni Wigo](https://blog.li.fi/li-fi-with-bridges-trust-is-a-spectrum-354cd5a1a6d8) - Apr 28, 2022 – Arjun Chand
- [Hali ya Suluhu za Utangamano za Unda-mpya](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - Juni 20, 2024 – Alex Hook
- [Kutumia Usalama wa Pamoja kwa Utangamano Salama wa Minyororo-Tofauti: Kamati za Hali za Lagrange na Zaidi](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - Juni 12, 2024 – Emmanuel Awosika

Zaidi ya hayo, hapa kuna mawasilisho yenye ufahamu wa kina na [James Prestwich](https://twitter.com/_prestwich) ambayo yanaweza kusaidia kukuza uelewa wa kina wa madaraja:

- [Kujenga Madaraja, Sio Bustani Zenye Ukuta](https://youtu.be/ZQJWMiX4hT0)
- [Kuchambua Madaraja](https://youtu.be/b0mC-ZqN8Oo)
- [Kwa Nini Madaraja Yanaungua](https://youtu.be/c7cm2kd20j8)
