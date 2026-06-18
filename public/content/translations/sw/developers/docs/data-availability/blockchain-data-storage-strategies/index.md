---
title: Mikakati ya Kuhifadhi Data kwenye Mnyororo wa Vitalu
description: Kuna njia kadhaa za kuhifadhi data kwa kutumia mnyororo wa vitalu. Makala haya yatalinganisha mikakati tofauti, gharama zake na mabadilishano, pamoja na mahitaji ya kuitumia kwa usalama.
lang: sw
---

Kuna njia nyingi za kuhifadhi taarifa moja kwa moja kwenye mnyororo wa vitalu, au kwa namna ambayo inalindwa na mnyororo wa vitalu:

- Blobs za EIP-4844
- Data za mwito (Calldata)
- Nje ya mnyororo na mifumo ya tabaka la 1 (l1)
- "Msimbo" wa mkataba
- Matukio
- Hifadhi ya EVM

Uchaguzi wa njia gani ya kutumia unategemea vigezo kadhaa:

- Chanzo cha taarifa. Taarifa katika data za mwito haziwezi kutoka moja kwa moja kwenye mnyororo wa vitalu wenyewe.
- Hatima ya taarifa. Data za mwito zinapatikana tu katika muamala unaozijumuisha. Matukio hayapatikani mnyororoni kabisa.
- Ni usumbufu kiasi gani unakubalika? Kompyuta zinazoendesha nodi kamili zinaweza kufanya uchakataji zaidi kuliko kiteja chepesi katika programu inayoendeshwa kwenye kivinjari.
- Je, ni lazima kuwezesha ufikiaji rahisi wa taarifa kutoka kwa kila nodi?
- Mahitaji ya usalama.

## Mahitaji ya usalama {#security-requirements}

Kwa ujumla, usalama wa taarifa unajumuisha sifa tatu:

- _Usiri_, vyombo visivyoidhinishwa haviruhusiwi kusoma taarifa. Hili ni muhimu katika matukio mengi, lakini si hapa. _Hakuna siri kwenye mnyororo wa vitalu_. Minyororo ya vitalu inafanya kazi kwa sababu mtu yeyote anaweza kuhakiki mabadiliko ya hali, kwa hivyo haiwezekani kuitumia kuhifadhi siri moja kwa moja. Kuna njia za kuhifadhi taarifa za siri kwenye mnyororo wa vitalu, lakini zote zinategemea kijenzi fulani cha nje ya mnyororo kuhifadhi angalau ufunguo.

- _Uadilifu_, taarifa ni sahihi, haiwezi kubadilishwa na vyombo visivyoidhinishwa, au kwa njia zisizoidhinishwa (kwa mfano, kuhamisha [tokeni za ERC-20](https://eips.ethereum.org/EIPS/eip-20#events) bila tukio la `Transfer`). Kwenye mnyororo wa vitalu, kila nodi huhakiki kila mabadiliko ya hali, ambayo inahakikisha uadilifu.

- _Upatikanaji_, taarifa inapatikana kwa chombo chochote kilichoidhinishwa. Kwenye mnyororo wa vitalu, hii kwa kawaida hufikiwa kwa kuwa na taarifa inayopatikana kwenye kila [nodi kamili](https://ethereum.org/developers/docs/nodes-and-clients/#full-node).

Suluhu tofauti hapa zote zina uadilifu bora, kwa sababu heshi huchapishwa kwenye tabaka la 1 (l1). Hata hivyo, zina hakikisho tofauti za upatikanaji.

## Matakwa ya awali {#prerequisites}

Unapaswa kuwa na uelewa mzuri wa [misingi ya mnyororo wa vitalu](/developers/docs/intro-to-ethereum/). Ukurasa huu pia unachukulia kuwa msomaji anafahamu [vitalu](/developers/docs/blocks/), [miamala](/developers/docs/transactions/), na mada nyingine husika.

## Blobs za EIP-4844 {#eip-4844-blobs}

Kuanzia na [hardfork ya Dencun](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/beacon-chain.md) mnyororo wa vitalu wa Ethereum unajumuisha [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), ambayo inaongeza kwenye Ethereum blobs za data zenye muda mfupi wa kuishi (awali takriban [siku 18](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/p2p-interface.md#configuration)). Blobs hizi zinapangiwa bei tofauti na [gesi ya utekelezaji](/developers/docs/gas), ingawa zinatumia mfumo sawa. Ni njia ya bei nafuu ya kuchapisha data za muda.

Matumizi makuu ya blobs za EIP-4844 ni kwa ajili ya mikusanyiko kuchapisha miamala yao. [Mikusanyiko ya optimistic](/developers/docs/scaling/optimistic-rollups) inahitaji kuchapisha miamala kwenye minyororo yao ya vitalu. Miamala hiyo inapaswa kupatikana kwa mtu yeyote wakati wa [kipindi cha changamoto](https://docs.optimism.io/connect/resources/glossary#challenge-period) ili kuwezesha [wathibitishaji](https://docs.optimism.io/connect/resources/glossary#validator) kurekebisha kosa ikiwa [mpangaji](https://docs.optimism.io/connect/resources/glossary#sequencer) wa rollup atachapisha mzizi wa hali usio sahihi.

Hata hivyo, mara tu kipindi cha changamoto kinapopita na mzizi wa hali unakuwa umekamilishwa, dhumuni lililosalia la kujua miamala hii ni kunakili hali ya sasa ya mnyororo. Hali hii pia inapatikana kutoka kwa nodi za mnyororo, huku ikihitaji uchakataji mdogo sana. Kwa hivyo taarifa za muamala bado zinapaswa kuhifadhiwa katika sehemu chache, kama vile [vivinjari vya kitalu](/developers/docs/data-and-analytics/block-explorers), lakini hakuna haja ya kulipia kiwango cha upinzani wa udhibiti ambacho Ethereum inatoa.

[Mikusanyiko ya sifuri-maarifa](/developers/docs/scaling/zk-rollups/#data-availability) pia huchapisha data zao za muamala ili kuwezesha nodi nyingine kunakili hali iliyopo na kuhakiki uthibitisho wa uhalali, lakini tena hilo ni hitaji la muda mfupi.

Wakati wa kuandika, kuchapisha kwenye EIP-4844 kunagharimu Wei moja (10<sup>-18</sup> ETH) kwa kila baiti, ambayo ni ndogo sana ikilinganishwa na [gesi 21,000 za utekelezaji ambazo muamala wowote, ikiwa ni pamoja na ule unaochapisha blobs, unagharimu](https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index). Unaweza kuona bei ya sasa ya EIP-4844 kwenye [blobscan.com](https://blobscan.com/blocks).

Hizi hapa ni anwani za kuona blobs zilizochapishwa na baadhi ya mikusanyiko maarufu.

| Rollup                               | Anwani ya sanduku la barua                                                                                                         |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## Data za mwito {#calldata}

Data za mwito inarejelea baiti zinazotumwa kama sehemu ya muamala. Inahifadhiwa kama sehemu ya rekodi ya kudumu ya mnyororo wa vitalu katika kitalu kinachojumuisha muamala huo.

Hii ndiyo njia ya bei nafuu zaidi ya kuweka data kwa kudumu kwenye mnyororo wa vitalu. Gharama kwa kila baiti ni gesi 4 za utekelezaji (ikiwa baiti ni sifuri) au gesi 16 (thamani nyingine yoyote). Ikiwa data imeshinikizwa, ambayo ni desturi ya kawaida, basi kila thamani ya baiti ina uwezekano sawa, kwa hivyo gharama ya wastani ni takriban gesi 15.95 kwa kila baiti.

Wakati wa kuandika, bei ni Gwei 12/gesi na 2300 $/ETH, ambayo inamaanisha gharama ni takriban senti 45 kwa kila kilobaiti. Kwa sababu hii ilikuwa njia ya bei nafuu zaidi kabla ya EIP-4844, hii ndiyo njia ambayo mikusanyiko ilitumia kuhifadhi taarifa za muamala, ambazo zinahitaji kupatikana kwa ajili ya [changamoto za makosa](https://docs.optimism.io/stack/protocol/overview#fault-proofs), lakini hazihitaji kupatikana moja kwa moja mnyororoni.

Hizi hapa ni anwani za kuona miamala iliyochapishwa na baadhi ya mikusanyiko maarufu.

| Rollup                               | Anwani ya sanduku la barua                                                                                                               |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## Nje ya mnyororo na mifumo ya tabaka la 1 (l1) {#offchain-with-l1-mechs}

Kulingana na mabadilishano yako ya usalama, inaweza kukubalika kuweka taarifa mahali pengine na kutumia mfumo unaohakikisha data inapatikana inapohitajika. Kuna mahitaji mawili ili hili lifanye kazi:

1. Chapisha [heshi](https://en.wikipedia.org/wiki/Cryptographic_hash_function) ya data kwenye mnyororo wa vitalu, inayoitwa _ufungamanisho wa ingizo_. Hili linaweza kuwa neno moja la baiti 32, kwa hivyo si ghali. Mradi ufungamanisho wa ingizo unapatikana, uadilifu unahakikishwa kwa sababu haiwezekani kupata data nyingine yoyote ambayo ingeleta heshi ya thamani sawa. Kwa hivyo ikiwa data isiyo sahihi itatolewa, inaweza kugunduliwa.

2. Kuwa na mfumo unaohakikisha upatikanaji. Kwa mfano, katika [Redstone](https://redstone.xyz/docs/what-is-redstone) nodi yoyote inaweza kuwasilisha changamoto ya upatikanaji. Ikiwa mpangaji hatajibu mnyororoni kufikia tarehe ya mwisho, ufungamanisho wa ingizo hutupwa, kwa hivyo taarifa inachukuliwa kuwa haijawahi kuchapishwa.

Hili linakubalika kwa rollup ya optimistic kwa sababu tayari tunategemea kuwa na angalau mhakiki mmoja mwaminifu kwa ajili ya mzizi wa hali. Mhakiki mwaminifu kama huyo pia atahakikisha ana data ya kuchakata vitalu, na kutoa changamoto ya upatikanaji ikiwa taarifa haipatikani nje ya mnyororo. Aina hii ya rollup ya optimistic inaitwa [Plasma](/developers/docs/scaling/plasma/).

## Msimbo wa mkataba {#contract-code}

Taarifa ambayo inahitaji tu kuandikwa mara moja, haifutwi kamwe, na inahitaji kupatikana mnyororoni inaweza kuhifadhiwa kama msimbo wa mkataba. Hii inamaanisha kuwa tunaunda "mkataba mahiri" na data kisha tunatumia [`EXTCODECOPY`](https://www.evm.codes/#3c?fork=shanghai) kusoma taarifa. Faida ni kwamba kunakili msimbo ni nafuu kiasi.

Mbali na gharama ya upanuzi wa kumbukumbu, `EXTCODECOPY` inagharimu gesi 2600 kwa ufikiaji wa kwanza wa mkataba (unapokuwa "baridi") na gesi 100 kwa nakala zinazofuata kutoka kwa mkataba huo huo pamoja na gesi 3 kwa kila neno la baiti 32. Ikilinganishwa na data za mwito, ambayo inagharimu 15.95 kwa kila baiti, hii ni nafuu kuanzia takriban baiti 200. Kulingana na [fomula ya gharama za upanuzi wa kumbukumbu](https://www.evm.codes/about#memoryexpansion), mradi tu huhitaji zaidi ya 4MB ya kumbukumbu, gharama ya upanuzi wa kumbukumbu ni ndogo kuliko gharama ya kuongeza data za mwito.

Bila shaka, hii ni gharama tu ya _kusoma_ data. Kuunda mkataba kunagharimu takriban gesi 32,000 + gesi 200/baiti. Njia hii ni ya kiuchumi tu wakati taarifa sawa inahitaji kusomwa mara nyingi katika miamala tofauti.

Msimbo wa mkataba unaweza kuwa hauna maana, mradi tu hauanzi na `0xEF`. Mikataba inayoanza na `0xEF` inatafsiriwa kama [umbizo la kipengee cha ethereum](https://notes.ethereum.org/@ipsilon/evm-object-format-overview), ambalo lina mahitaji magumu zaidi.

## Matukio {#events}

[Matukio](https://docs.alchemy.com/docs/solidity-events) hutolewa na mikataba mahiri, na kusomwa na programu za nje ya mnyororo.
Faida yake ni kwamba msimbo wa nje ya mnyororo unaweza kusikiliza matukio. Gharama ni [gesi](https://www.evm.codes/#a0?fork=cancun), 375 pamoja na gesi 8 kwa kila baiti ya data. Kwa Gwei 12/gesi na 2300 $/ETH, hii inatafsiriwa kuwa senti moja pamoja na senti 22 kwa kila kilobaiti.

## Hifadhi {#storage}

Mikataba mahiri ina ufikiaji wa [hifadhi ya kudumu](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory). Hata hivyo, ni ghali sana. Kuandika neno la baiti 32 kwenye sloti ya hifadhi iliyokuwa tupu hapo awali kunaweza [kugharimu gesi 22,100](https://www.evm.codes/#55?fork=cancun). Kwa Gwei 12/gesi na 2300 $/ETH, hii ni takriban senti 61 kwa kila operesheni ya kuandika, au $19.5 kwa kila kilobaiti.

Hii ndiyo aina ghali zaidi ya hifadhi katika Ethereum.

## Muhtasari {#summary}

Jedwali hili linatoa muhtasari wa chaguzi tofauti, faida na hasara zake.

| Aina ya hifadhi                | Chanzo cha data      | Hakikisho la upatikanaji                                                                                                             | Upatikanaji mnyororoni                                             | Vizuizi vya ziada                                                  |
| --------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Blobs za EIP-4844              | Nje ya mnyororo            | Hakikisho la Ethereum kwa [~siku 18](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/p2p-interface.md#configuration) | Heshi pekee ndiyo inapatikana                                           |                                                                         |
| Data za mwito                    | Nje ya mnyororo            | Hakikisho la Ethereum milele (sehemu ya mnyororo wa vitalu)                                                                                | Inapatikana tu ikiwa imeandikwa kwenye mkataba, na kwenye muamala huo |
| Nje ya mnyororo na mifumo ya tabaka la 1 (l1) | Nje ya mnyororo            | Hakikisho la "mhakiki mmoja mwaminifu" wakati wa kipindi cha changamoto                                                                        | Heshi pekee                                                        | Imehakikishwa na mfumo wa changamoto, tu wakati wa kipindi cha changamoto |
| Msimbo wa mkataba               | Mnyororoni au nje ya mnyororo | Hakikisho la Ethereum milele (sehemu ya mnyororo wa vitalu)                                                                                | Ndiyo                                                              | Imeandikwa kwenye anwani "nasibu", haiwezi kuanza na `0xEF`                 |
| Matukio                      | Mnyororoni             | Hakikisho la Ethereum milele (sehemu ya mnyororo wa vitalu)                                                                                | Hapana                                                               |
| Hifadhi                     | Mnyororoni             | Hakikisho la Ethereum milele (sehemu ya mnyororo wa vitalu na hali ya sasa hadi ifutwe na kuandikwa upya)                                        | Ndiyo                                                              |