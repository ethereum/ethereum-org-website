---
title: Madaraja
description: Muhtasari wa uunganishaji wa madaraja kwa wasanidi programu
lang: sw
---

Pamoja na kuongezeka kwa minyororo ya vitalu ya tabaka la 1 (l1) na suluhisho za [kuongeza viwango](/developers/docs/scaling/) za tabaka la 2 (l2), pamoja na idadi inayokua ya programu tumizi zilizogatuliwa (dapps) zinazokwenda mtambuko-mnyororo, hitaji la mawasiliano na usogezi wa rasilimali kwenye minyororo limekuwa sehemu muhimu ya miundombinu ya mtandao. Aina tofauti za madaraja zipo kusaidia kufanikisha hili.

## Hitaji la madaraja {#need-for-bridges}

Madaraja yapo ili kuunganisha mitandao ya mnyororo wa vitalu. Yanawezesha muunganisho na mwingiliano kati ya minyororo ya vitalu.

Minyororo ya vitalu ipo katika mazingira yaliyotengwa, ikimaanisha hakuna njia ya minyororo ya vitalu kufanya biashara na kuwasiliana na minyororo mingine ya vitalu kiasili. Kama matokeo, ingawa kunaweza kuwa na shughuli na ubunifu mkubwa ndani ya mfumo wa ikolojia, inazuiwa na ukosefu wa muunganisho na mwingiliano na mifumo mingine ya ikolojia.

Madaraja hutoa njia kwa mazingira yaliyotengwa ya mnyororo wa vitalu kuunganishwa na kila mmoja. Yanaanzisha njia ya usafiri kati ya minyororo ya vitalu ambapo tokeni, jumbe, data za kiholela, na hata miito ya [mkataba mahiri](/developers/docs/smart-contracts/) inaweza kuhamishwa kutoka mnyororo mmoja hadi mwingine.

## Faida za madaraja {#benefits-of-bridges}

Kwa ufupi, madaraja hufungua matukio mengi ya matumizi kwa kuruhusu mitandao ya mnyororo wa vitalu kubadilishana data na kuhamisha rasilimali kati yao.

Minyororo ya vitalu ina nguvu, udhaifu, na mbinu za kipekee za kujenga programu (kama vile kasi, uwezo wa upitishaji, gharama, n.k.). Madaraja husaidia maendeleo ya mfumo mzima wa ikolojia wa kripto kwa kuwezesha minyororo ya vitalu kutumia ubunifu wa kila mmoja.

Kwa wasanidi programu, madaraja huwezesha yafuatayo:

- hamisho la data, taarifa, na rasilimali zozote mtambuko-mnyororo.
- kufungua vipengele vipya na matukio ya matumizi kwa itifaki kwani madaraja hupanua nafasi ya muundo kwa kile ambacho itifaki zinaweza kutoa. Kwa mfano, itifaki ya ukulima wa faida iliyosambazwa awali kwenye Mtandao Mkuu wa [Ethereum](/) inaweza kutoa mabwawa ya ukwasi kwenye minyororo yote inayoendana na EVM.
- fursa ya kutumia nguvu za minyororo tofauti ya vitalu. Kwa mfano, wasanidi programu wanaweza kufaidika na ada za chini zinazotolewa na suluhisho tofauti za tabaka la 2 (l2) kwa kusambaza dapps zao kwenye mikusanyiko, na minyororo ya kando na watumiaji wanaweza kuvusha kupitia hizo.
- ushirikiano kati ya wasanidi programu kutoka mifumo mbalimbali ya ikolojia ya mnyororo wa vitalu ili kujenga bidhaa mpya.
- kuvutia watumiaji na jamii kutoka mifumo mbalimbali ya ikolojia kwenye dapps zao.

## Madaraja hufanyaje kazi? {#how-do-bridges-work}

Ingawa kuna [aina nyingi za miundo ya madaraja](https://li.fi/knowledge-hub/blockchain-bridges-and-classification/), njia tatu za kuwezesha hamisho la rasilimali mtambuko-mnyororo zinajitokeza:

- **Funga na ufue –** Funga rasilimali kwenye mnyororo wa chanzo na ufue rasilimali kwenye mnyororo wa mwisho.
- **Teketeza na ufue –** Teketeza rasilimali kwenye mnyororo wa chanzo na ufue rasilimali kwenye mnyororo wa mwisho.
- **Mabadilishano ya atomiki –** Fanya badilishano la rasilimali kwenye mnyororo wa chanzo kwa rasilimali kwenye mnyororo wa mwisho na mhusika mwingine.

## Aina za madaraja {#bridge-types}

Madaraja kwa kawaida yanaweza kuainishwa katika moja ya makundi yafuatayo:

- **Madaraja asilia –** Madaraja haya kwa kawaida hujengwa ili kuanzisha ukwasi kwenye mnyororo wa vitalu fulani, na kurahisisha watumiaji kuhamisha fedha kwenye mfumo wa ikolojia. Kwa mfano, [Daraja la Arbitrum](https://bridge.arbitrum.io/) limejengwa ili kurahisisha watumiaji kuvusha kutoka Mtandao Mkuu wa Ethereum hadi Arbitrum. Madaraja mengine kama haya ni pamoja na Daraja la Polygon PoS, [Lango la Optimism](https://app.optimism.io/bridge), n.k.
- **Madaraja yanayotegemea mthibitishaji au orakeli –** Madaraja haya hutegemea seti ya mthibitishaji wa nje au orakeli ili kuthibitisha hamisho la mtambuko-mnyororo. Mifano: Multichain na Across.
- **Madaraja ya kupitisha ujumbe wa jumla –** Madaraja haya yanaweza kufanya hamisho la rasilimali, pamoja na jumbe na data za kiholela mtambuko-mnyororo. Mifano: Axelar, LayerZero, na Nomad.
- **Mitandao ya ukwasi –** Madaraja haya kimsingi yanalenga kufanya hamisho la rasilimali kutoka mnyororo mmoja hadi mwingine kupitia mabadilishano ya atomiki. Kwa ujumla, hayaungi mkono upitishaji wa ujumbe wa mtambuko-mnyororo. Mifano: Connext na Hop.

## Faida na hasara za kuzingatia {#trade-offs}

Kwa madaraja, hakuna suluhisho kamilifu. Badala yake, kuna faida na hasara tu zinazofanywa ili kutimiza lengo. Wasanidi programu na watumiaji wanaweza kutathmini madaraja kulingana na mambo yafuatayo:

- **Usalama –** Nani anathibitisha mfumo? Madaraja yanayolindwa na wathibitishaji wa nje kwa kawaida huwa na usalama mdogo kuliko madaraja yanayolindwa ndani au kiasili na wathibitishaji wa mnyororo wa vitalu.
- **Urahisi –** Inachukua muda gani kukamilisha muamala, na mtumiaji alihitaji kusaini miamala mingapi? Kwa msanidi programu, inachukua muda gani kuunganisha daraja, na mchakato huo ni mgumu kiasi gani?
- **Muunganisho –** Ni minyororo gani tofauti ya mwisho ambayo daraja linaweza kuunganisha (yaani, mikusanyiko, minyororo ya kando, minyororo mingine ya vitalu ya tabaka la 1, n.k.), na ni ngumu kiasi gani kuunganisha mnyororo mpya wa vitalu?
- **Uwezo wa kupitisha data ngumu zaidi –** Je, daraja linaweza kuwezesha hamisho la jumbe na data ngumu zaidi za kiholela mtambuko-mnyororo, au linaunga mkono tu hamisho la rasilimali la mtambuko-mnyororo?
- **Ufanisi wa gharama –** Inagharimu kiasi gani kufanya hamisho la rasilimali mtambuko-mnyororo kupitia daraja? Kwa kawaida, madaraja hutoza ada isiyobadilika au inayobadilika kulingana na gharama za gesi na ukwasi wa njia maalum. Pia ni muhimu kutathmini ufanisi wa gharama wa daraja kulingana na mtaji unaohitajika ili kuhakikisha usalama wake.

Kwa kiwango cha juu, madaraja yanaweza kuainishwa kama yanayoaminika na bila hitaji la uaminifu.

- **Yanayoaminika –** Madaraja yanayoaminika huthibitishwa na watu wa nje. Yanatumia seti ya nje ya wathibitishaji (Mashirikisho yenye saini nyingi, mifumo ya ukokotoaji ya pande nyingi, mtandao wa orakeli) kutuma data mtambuko-mnyororo. Kama matokeo, yanaweza kutoa muunganisho mzuri na kuwezesha upitishaji wa ujumbe wa jumla kikamilifu mtambuko-mnyororo. Pia huwa yanafanya vizuri kwa kasi na ufanisi wa gharama. Hii inakuja kwa gharama ya usalama, kwani watumiaji wanapaswa kutegemea usalama wa daraja.
- **Bila hitaji la uaminifu –** Madaraja haya hutegemea minyororo ya vitalu yanayounganisha na wathibitishaji wao kufanya hamisho la jumbe na tokeni. Ni 'bila hitaji la uaminifu' kwa sababu hayaongezi dhana mpya za uaminifu (kwa kuongezea kwenye minyororo ya vitalu). Kama matokeo, madaraja bila hitaji la uaminifu yanachukuliwa kuwa salama zaidi kuliko madaraja yanayoaminika.

Ili kutathmini madaraja bila hitaji la uaminifu kulingana na mambo mengine, lazima tuyagawe katika madaraja ya kupitisha ujumbe wa jumla na mitandao ya ukwasi.

- **Madaraja ya kupitisha ujumbe wa jumla –** Madaraja haya yanafanya vizuri sana kwa usalama na uwezo wa kufanya hamisho la data ngumu zaidi mtambuko-mnyororo. Kwa kawaida, pia ni mazuri kwa ufanisi wa gharama. Hata hivyo, nguvu hizi kwa ujumla huja kwa gharama ya muunganisho kwa madaraja ya kiteja chepesi (mfano: IBC) na mapungufu ya kasi kwa madaraja yenye matumaini (mfano: Nomad) yanayotumia uthibitisho wa udanganyifu.
- **Mitandao ya ukwasi –** Madaraja haya hutumia mabadilishano ya atomiki kwa hamisho la rasilimali na ni mifumo iliyothibitishwa ndani (yaani, yanatumia wathibitishaji wa minyororo ya vitalu ya msingi kuthibitisha miamala). Kama matokeo, yanafanya vizuri sana kwa usalama na kasi. Zaidi ya hayo, yanachukuliwa kuwa na ufanisi wa gharama kwa kulinganisha na hutoa muunganisho mzuri. Hata hivyo, hasara kubwa ni kutokuwa na uwezo wa kupitisha data ngumu zaidi – kwani hayaungi mkono upitishaji wa ujumbe wa mtambuko-mnyororo.

## Hatari za madaraja {#risk-with-bridges}

Madaraja yanachangia katika udukuzi tatu [kubwa zaidi katika fedha zilizogatuliwa (DeFi)](https://rekt.news/leaderboard/) na bado yapo katika hatua za awali za maendeleo. Kutumia daraja lolote kunabeba hatari zifuatazo:

- **Hatari ya mkataba mahiri –** Ingawa madaraja mengi yamepita ukaguzi kwa mafanikio, inachukua dosari moja tu katika mkataba mahiri ili rasilimali ziwe wazi kwa udukuzi (mfano: [Daraja la Wormhole la Solana](https://rekt.news/wormhole-rekt/)).
- **Hatari za kimfumo za kifedha** – Madaraja mengi hutumia rasilimali zilizofungwa kufua matoleo rasmi ya rasilimali asili kwenye mnyororo mpya. Hii inaweka mfumo wa ikolojia wazi kwa hatari ya kimfumo, kama tulivyoona matoleo yaliyofungwa ya tokeni yakitumiwa vibaya.
- **Hatari ya mhusika wa pili –** Baadhi ya madaraja hutumia muundo unaoaminika ambao unahitaji watumiaji kutegemea dhana kwamba wathibitishaji hawatashirikiana kuiba fedha za watumiaji. Hitaji la watumiaji kuamini wahusika hawa wa tatu linawaweka wazi kwa hatari kama vile utapeli wa kuvuta zulia (rug pulls), udhibiti, na shughuli nyingine mbaya.
- **Masuala yaliyo wazi –** Kwa kuwa madaraja yapo katika hatua za awali za maendeleo, kuna maswali mengi yasiyojibiwa kuhusiana na jinsi madaraja yatafanya kazi katika hali tofauti za soko, kama nyakati za msongamano wa mtandao na wakati wa matukio yasiyotarajiwa kama vile mashambulizi ya kiwango cha mtandao au urejeshaji nyuma wa hali. Kutokuwa na uhakika huku kunaleta hatari fulani, ambazo kiwango chake bado hakijulikani.

## Dapps zinawezaje kutumia madaraja? {#how-can-dapps-use-bridges}

Hapa kuna baadhi ya matumizi ya vitendo ambayo wasanidi programu wanaweza kuzingatia kuhusu madaraja na kupeleka dapp yao mtambuko-mnyororo:

### Kuunganisha madaraja {#integrating-bridges}

Kwa wasanidi programu, kuna njia nyingi za kuongeza usaidizi kwa madaraja:

1. **Kujenga daraja lako mwenyewe –** Kujenga daraja salama na la kutegemewa si rahisi, hasa ikiwa unachukua njia yenye uhitaji mdogo wa kuamini. Zaidi ya hayo, inahitaji miaka ya uzoefu na utaalamu wa kiufundi kuhusiana na tafiti za uwezo wa kuongezeka na mwingiliano. Vilevile, itahitaji timu inayoshiriki kikamilifu kudumisha daraja na kuvutia ukwasi wa kutosha ili kulifanya liwezekane.

2. **Kuonyesha watumiaji chaguzi nyingi za madaraja –** [Dapps](/developers/docs/dapps/) nyingi zinahitaji watumiaji kuwa na tokeni yao asilia ili kuingiliana nazo. Ili kuwezesha watumiaji kufikia tokeni zao, hutoa chaguzi tofauti za madaraja kwenye tovuti yao. Hata hivyo, mbinu hii ni suluhisho la haraka kwa tatizo kwani inamwondoa mtumiaji kwenye kiolesura cha dapp na bado inawahitaji kuingiliana na dapps na madaraja mengine. Huu ni uzoefu mgumu wa uingizaji na uwezekano mkubwa wa kufanya makosa.

3. **Kuunganisha daraja –** Suluhisho hili halihitaji dapp kutuma watumiaji kwenye daraja la nje na violesura vya DEX. Inaruhusu dapps kuboresha uzoefu wa uingizaji wa mtumiaji. Hata hivyo, mbinu hii ina mapungufu yake:

   - Tathmini na matengenezo ya madaraja ni magumu na yanachukua muda.
   - Kuchagua daraja moja kunaunda hatari ya kutegemea sehemu moja inayoweza kushindwa.
   - Dapp inazuiwa na uwezo wa daraja.
   - Madaraja pekee yanaweza yasiwe ya kutosha. Dapps zinaweza kuhitaji DEXs ili kutoa utendaji zaidi kama vile mabadilishano ya mtambuko-mnyororo.

4. **Kuunganisha madaraja mengi –** Suluhisho hili linatatua matatizo mengi yanayohusiana na kuunganisha daraja moja. Hata hivyo, pia lina mapungufu, kwani kuunganisha madaraja mengi kunatumia rasilimali nyingi na kunaunda mzigo wa kiufundi na mawasiliano kwa wasanidi programu—rasilimali adimu zaidi katika kripto.

5. **Kuunganisha kijumuishi cha daraja –** Chaguo jingine kwa dapps ni kuunganisha suluhisho la ujumuishaji wa daraja ambalo linawapa ufikiaji wa madaraja mengi. Vijumuishi vya daraja hurithi nguvu za madaraja yote na hivyo havizuiwi na uwezo wa daraja lolote moja. Hasa, vijumuishi vya daraja kwa kawaida hudumisha miunganisho ya daraja, ambayo huokoa dapp kutokana na usumbufu wa kufuatilia vipengele vya kiufundi na kiutendaji vya muunganisho wa daraja.

Pamoja na hayo, vijumuishi vya daraja pia vina mapungufu yao. Kwa mfano, ingawa vinaweza kutoa chaguzi zaidi za madaraja, madaraja mengi zaidi kwa kawaida yanapatikana kwenye soko tofauti na yale yanayotolewa kwenye jukwaa la kijumuishi. Zaidi ya hayo, kama tu madaraja, vijumuishi vya daraja pia viko wazi kwa hatari za mkataba mahiri na teknolojia (mikataba mahiri zaidi = hatari zaidi).

Ikiwa dapp itachukua njia ya kuunganisha daraja au kijumuishi, kuna chaguzi tofauti kulingana na jinsi muunganisho unavyokusudiwa kuwa wa kina. Kwa mfano, ikiwa ni muunganisho wa mbele tu ili kuboresha uzoefu wa uingizaji wa mtumiaji, dapp itaunganisha wijeti. Hata hivyo, ikiwa muunganisho ni kuchunguza mikakati ya kina zaidi ya mtambuko-mnyororo kama vile uwekaji dhamana, ukulima wa faida, n.k., dapp inaunganisha SDK au API.

### Kusambaza dapp kwenye minyororo mingi {#deploying-a-dapp-on-multiple-chains}

Ili kusambaza dapp kwenye minyororo mingi, wasanidi programu wanaweza kutumia majukwaa ya maendeleo kama [Alchemy](https://www.alchemy.com/), [Hardhat](https://hardhat.org/), [Moralis](https://moralis.io/), n.k. Kwa kawaida, majukwaa haya huja na programu-jalizi zinazoweza kuunganishwa ambazo zinaweza kuwezesha dapps kwenda mtambuko-mnyororo. Kwa mfano, wasanidi programu wanaweza kutumia proksi ya usambazaji inayoamuliwa inayotolewa na [programu-jalizi ya hardhat-deploy](https://github.com/wighawag/hardhat-deploy).

#### Mifano: {#examples}

- [Jinsi ya kujenga dapps za mtambuko-mnyororo](https://moralis.io/how-to-build-cross-chain-dapps/)
- [Kujenga Soko la NFT la Mtambuko-Mnyororo](https://youtu.be/WZWCzsB1xUE)
- [Moralis: Kujenga dapps za NFT za mtambuko-mnyororo](https://www.youtube.com/watch?v=ehv70kE1QYo)

### Kufuatilia shughuli za mkataba kwenye minyororo {#monitoring-contract-activity-across-chains}

Ili kufuatilia shughuli za mkataba kwenye minyororo, wasanidi programu wanaweza kutumia grafu ndogo na majukwaa ya wasanidi programu kama Tenderly ili kuchunguza mikataba mahiri katika wakati halisi. Majukwaa kama haya pia yana zana zinazotoa utendaji mkubwa zaidi wa ufuatiliaji wa data kwa shughuli za mtambuko-mnyororo, kama vile kuangalia [matukio yanayotolewa na mikataba](https://docs.soliditylang.org/en/v0.8.14/contracts.html?highlight=events#events), n.k.

#### Zana {#tools}

- [The Graph](https://thegraph.com/en/)
- [Tenderly](https://tenderly.co/)

## Usomaji zaidi {#further-reading}
- [Madaraja ya Mnyororo wa Vitalu](/bridges/) – ethereum.org
- [Mfumo wa Hatari wa Daraja la L2BEAT](https://l2beat.com/bridges/summary)
- [Madaraja ya Mnyororo wa Vitalu: Kujenga Mitandao ya Mitandao ya Kripto](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) - Sep 8, 2021 – Dmitriy Berenzon
- [Utatu wa Mwingiliano](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17) - Okt 1, 2021 – Arjun Bhuptani
- [Makundi: Jinsi Madaraja Yanayoaminika na Yenye Uhitaji Mdogo wa Kuamini Yanavyounda Mandhari ya Minyororo Mingi](https://blog.celestia.org/clusters/) - Okt 4, 2021 – Mustafa Al-Bassam
- [LI.FI: Kwa Madaraja, Uaminifu ni Wigo](https://blog.li.fi/li-fi-with-bridges-trust-is-a-spectrum-354cd5a1a6d8) - Apr 28, 2022 – Arjun Chand
- [Hali ya Suluhisho za Mwingiliano wa Rollup](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - Juni 20, 2024 – Alex Hook
- [Kutumia Usalama wa Pamoja kwa Mwingiliano Salama wa Mtambuko-Mnyororo: Kamati za Hali za Lagrange na Zaidi](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - Juni 12, 2024 – Emmanuel Awosika

Zaidi ya hayo, hapa kuna baadhi ya mawasilisho yenye ufahamu kutoka kwa [James Prestwich](https://twitter.com/_prestwich) ambayo yanaweza kusaidia kukuza uelewa wa kina wa madaraja:

- [Kujenga Madaraja, Sio Bustani Zilizozungushiwa Ukuta](https://youtu.be/ZQJWMiX4hT0)
- [Kuchanganua Madaraja](https://youtu.be/b0mC-ZqN8Oo)
- [Kwa Nini Madaraja Yanateketea](https://youtu.be/c7cm2kd20j8)