---
title: Mikakati ya Uhifadhi wa Data ya Mnyororo wa Bloku
description: Kuna njia kadhaa za kuhifadhi data kwa kutumia mnyororo wa bloku. Makala hii italinganisha mikakati tofauti, gharama na mabadilishano yake, pamoja na mahitaji ya kuitumia kwa usalama.
lang: sw
---

Kuna njia nyingi za kuhifadhi taarifa moja kwa moja kwenye mnyororo wa bloku, au kwa njia ambayo inalindwa na mnyororo wa bloku:

- Blobu za EIP-4844
- Calldata
- Offchain na mifumo ya L1
- Mkataba \"msimbo\"
- Matukio
- Ghala la EVM

Uchaguzi wa njia ipi ya kutumia unategemea vigezo kadhaa:

- Chanzo cha taarifa. Taarifa katika calldata haiwezi kutoka moja kwa moja kwenye mnyororo wa bloku wenyewe.
- Mwisho wa taarifa. Calldata inapatikana tu katika muamala unaoijumuisha. Matukio hayapatikani onchain kabisa.
- Ni usumbufu kiasi gani unaokubalika? Kompyuta zinazoendesha nodi kamili zinaweza kufanya uchakataji mwingi zaidi kuliko mteja mwepesi katika programu inayoendeshwa kwenye kivinjari.
- Je, ni muhimu kuwezesha ufikiaji rahisi wa taarifa kutoka kwa kila nodi?
- Mahitaji ya usalama.

## Mahitaji ya usalama {#security-requirements}

Kwa ujumla, usalama wa taarifa una sifa tatu:

- _Usiri_, huluki ambazo hazijaidhinishwa haziruhusiwi kusoma taarifa. Hii ni muhimu katika visa vingi, lakini si hapa. _Hakuna siri kwenye mnyororo wa bloku_. Minyororo ya bloku hufanya kazi kwa sababu mtu yeyote anaweza kuthibitisha mabadiliko ya hali, kwa hivyo haiwezekani kuzitumia kuhifadhi siri moja kwa moja. Kuna njia za kuhifadhi taarifa za siri kwenye mnyororo wa bloku, lakini zote zinategemea kijenzi fulani cha offchain ili kuhifadhi angalau ufunguo.

- _Uadilifu_, taarifa ni sahihi, haiwezi kubadilishwa na huluki ambazo hazijaidhinishwa, au kwa njia zisizoidhinishwa (kwa mfano, kuhamisha [tokeni za ERC-20](https://eips.ethereum.org/EIPS/eip-20#events) bila tukio la `Transfer`). Kwenye mnyororo wa bloku, kila nodi huthibitisha kila mabadiliko ya hali, ambayo inahakikisha uadilifu.

- _Upatikanaji_, taarifa inapatikana kwa huluki yoyote iliyoidhinishwa. Kwenye mnyororo wa bloku, hii kwa kawaida hufikiwa kwa kuwa na taarifa inayopatikana kwenye kila [nodi kamili](https://ethereum.org/developers/docs/nodes-and-clients#full-node).

Suluhisho tofauti hapa zote zina uadilifu bora, kwa sababu hashi zinachapishwa kwenye L1. Hata hivyo, zina dhamana tofauti za upatikanaji.

## Mahitaji ya awali {#prerequisites}

Unapaswa kuwa na uelewa mzuri wa [misingi ya mnyororo wa bloku](/developers/docs/intro-to-ethereum/). Ukurasa huu pia unadhania msomaji anafahamu [bloku](/developers/docs/blocks/), [miamala](/developers/docs/transactions/), na mada zingine muhimu.

## Blobu za EIP-4844 {#eip-4844-blobs}

Kuanzia na [hardfork ya Dencun](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/beacon-chain.md) mnyororo wa bloku wa Ethereum unajumuisha [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), ambayo inaongeza blobu za data kwenye Ethereum zenye muda mfupi wa kuishi (awali takriban [siku 18](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration)). Blobu hizi huwekewa bei tofauti na [gesi ya utekelezaji](/developers/docs/gas), ingawa kwa kutumia mfumo unaofanana. Ni njia rahisi ya kuchapisha data ya muda.

Kesi kuu ya matumizi ya blobu za EIP-4844 ni kwa ajili ya unda-mpya kuchapisha miamala yao. [Optimistic rollups](/developers/docs/scaling/optimistic-rollups) zinahitaji kuchapisha miamala kwenye minyororo yao ya bloku. Miamala hiyo inapaswa kupatikana kwa yeyote wakati wa [kipindi cha changamoto](https://docs.optimism.io/connect/resources/glossary#challenge-period) ili kuwezesha [wathibitishaji](https://docs.optimism.io/connect/resources/glossary#validator) kurekebisha kosa ikiwa [mratibu wa mfuatano](https://docs.optimism.io/connect/resources/glossary#sequencer) wa unda-mpya atachapisha mzizi wa hali usio sahihi.

Hata hivyo, mara tu kipindi cha changamoto kinapopita na mzizi wa hali unapokamilishwa, madhumuni yaliyosalia ya kujua miamala hii ni kuiga hali ya sasa ya mnyororo. Hali hii pia inapatikana kutoka kwa nodi za mnyororo, na uchakataji mdogo sana unahitajika. Kwa hivyo, taarifa za muamala bado zinapaswa kuhifadhiwa katika maeneo machache, kama vile [wachunguzi wa bloku](/developers/docs/data-and-analytics/block-explorers), lakini hakuna haja ya kulipia kiwango cha upinzani wa udhibiti ambacho Ethereum hutoa.

[Zero-knowledge rollups](/developers/docs/scaling/zk-rollups/#data-availability) pia huchapisha data zao za miamala ili kuwezesha nodi zingine kuiga hali iliyopo na kuthibitisha uthibitisho wa uhalali, lakini tena hilo ni hitaji la muda mfupi.

Wakati wa kuandika, kuchapisha kwenye EIP-4844 kunagharimu wei moja (10<sup>-18</sup> ETH) kwa kila baiti, ambayo ni ndogo sana ikilinganishwa na [gesi 21,000 ya utekelezaji ambayo muamala wowote, ikiwa ni pamoja na unaochapisha blobu, unagharimu](https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index). Unaweza kuona bei ya sasa ya EIP-4844 kwenye [blobscan.com](https://blobscan.com/blocks).

Hizi ni anwani za kuona blobu zilizochapishwa na baadhi ya unda-mpya maarufu.

| Unda-mpya                            | Anwani ya sanduku la barua                                                                                              |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## Calldata {#calldata}

Calldata inarejelea baiti zinazotumwa kama sehemu ya muamala. Huhifadhiwa kama sehemu ya rekodi ya kudumu ya mnyororo wa bloku katika bloku inayojumuisha muamala huo.

Hii ndiyo njia ya bei rahisi zaidi ya kuweka data kabisa kwenye mnyororo wa bloku. Gharama kwa kila baiti ni gesi 4 za utekelezaji (ikiwa baiti ni sifuri) au gesi 16 (thamani nyingine yoyote). Ikiwa data imebanwa, ambayo ni utaratibu wa kawaida, basi kila thamani ya baiti ina uwezekano sawa, kwa hivyo gharama ya wastani ni takriban gesi 15.95 kwa kila baiti.

Wakati wa kuandika, bei ni gwei 12/gesi na 2300 $/ETH, ambayo inamaanisha gharama ni takriban senti 45 kwa kila kilobaiti. Kwa sababu hii ilikuwa njia ya bei rahisi zaidi kabla ya EIP-4844, hii ndiyo njia ambayo unda-mpya zilitumia kuhifadhi taarifa za miamala, ambazo zinahitaji kupatikana kwa [changamoto za hitilafu](https://docs.optimism.io/stack/protocol/overview#fault-proofs), lakini hazihitaji kupatikana moja kwa moja onchain.

Hizi ni anwani za kuona miamala iliyochapishwa na baadhi ya unda-mpya maarufu.

| Unda-mpya                            | Anwani ya sanduku la barua                                                                                                    |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## Offchain na mifumo ya L1 {#offchain-with-l1-mechs}

Kulingana na mabadilishano yako ya usalama, inaweza kukubalika kuweka taarifa mahali pengine na kutumia mfumo unaohakikisha data inapatikana inapohitajika. Kuna mahitaji mawili ili hili lifanye kazi:

1. Chapisha [hashi](https://en.wikipedia.org/wiki/Cryptographic_hash_function) ya data kwenye mnyororo wa bloku, inayoitwa _ahadi ya ingizo_. Hili linaweza kuwa neno moja la baiti 32, kwa hivyo si ghali. Muda wote ahadi ya ingizo inapopatikana, uadilifu unahakikishwa kwa sababu haiwezekani kupata data nyingine yoyote ambayo ingetoa hashi kwa thamani sawa. Kwa hivyo, ikiwa data isiyo sahihi itatolewa, inaweza kugunduliwa.

2. Kuwa na mfumo unaohakikisha upatikanaji. Kwa mfano, katika [Redstone](https://redstone.xyz/docs/what-is-redstone) nodi yoyote inaweza kuwasilisha changamoto ya upatikanaji. Ikiwa mratibu wa mfuatano hatajibu onchain kabla ya tarehe ya mwisho, ahadi ya ingizo hutupwa, kwa hivyo taarifa inachukuliwa kuwa haijawahi kuchapishwa.

Hili linakubalika kwa optimistic rollup kwa sababu tayari tunategemea kuwa na angalau mthibitishaji mmoja mwaminifu kwa mzizi wa hali. Mthibitishaji mwaminifu kama huyo atahakikisha pia ana data ya kuchakata bloku, na atatoa changamoto ya upatikanaji ikiwa taarifa haipatikani offchain. Aina hii ya optimistic rollup inaitwa [njozi](/developers/docs/scaling/plasma/).

## Msimbo wa mkataba {#contract-code}

Taarifa ambayo inahitaji kuandikwa mara moja tu, haiandikwi juu tena, na inahitaji kupatikana onchain inaweza kuhifadhiwa kama msimbo wa mkataba. Hii inamaanisha kwamba tunaunda \"mkataba-erevu\" na data na kisha kutumia [`EXTCODECOPY`](https://www.evm.codes/#3c?fork=shanghai) kusoma taarifa. Faida ni kwamba kunakili msimbo ni rahisi kiasi.

Zaidi ya gharama ya upanuzi wa kumbukumbu, `EXTCODECOPY` hugharimu gesi 2600 kwa ufikiaji wa kwanza wa mkataba (wakati ni \"baridi\") na gesi 100 kwa nakala zinazofuata kutoka kwa mkataba huo huo pamoja na gesi 3 kwa kila neno la baiti 32. Ikilinganishwa na calldata, ambayo hugharimu 15.95 kwa kila baiti, hii ni rahisi kuanzia takriban baiti 200. Kulingana na [fomula ya gharama za upanuzi wa kumbukumbu](https://www.evm.codes/about#memoryexpansion), mradi tu huhitaji zaidi ya MB 4 za kumbukumbu, gharama ya upanuzi wa kumbukumbu ni ndogo kuliko gharama ya kuongeza calldata.

Bila shaka, hii ni gharama tu ya _kusoma_ data. Kuunda mkataba hugharimu takriban gesi 32,000 + gesi 200/baiti. Njia hii ina manufaa ya kiuchumi tu wakati taarifa ileile inahitaji kusomwa mara nyingi katika miamala tofauti.

Msimbo wa mkataba unaweza usiwe na maana, mradi tu hauanzi na `0xEF`. Mikataba inayoanza na `0xEF` inatafsiriwa kama [umbizo la kitu cha ethereum](https://notes.ethereum.org/@ipsilon/evm-object-format-overview), ambalo lina mahitaji magumu zaidi.

## Matukio {#events}

[Matukio](https://docs.alchemy.com/docs/solidity-events) hutolewa na mikataba-erevu, na kusomwa na programu ya offchain.
Faida yao ni kwamba msimbo wa offchain unaweza kusikiliza matukio. Gharama ni [gesi](https://www.evm.codes/#a0?fork=cancun), 375 pamoja na gesi 8 kwa kila baiti ya data. Kwa gwei 12/gesi na 2300 $/ETH, hii inatafsiriwa kuwa senti moja pamoja na senti 22 kwa kila kilobaiti.

## Ghala {#storage}

Mikataba-erevu ina ufikiaji wa [ghala la kudumu](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory). Hata hivyo, ni ghali sana. Kuandika neno la baiti 32 kwenye nafasi ya ghala iliyokuwa tupu hapo awali kunaweza [kugharimu gesi 22,100](https://www.evm.codes/#55?fork=cancun). Kwa gwei 12/gesi na 2300 $/ETH, hii ni takriban senti 61 kwa kila operesheni ya uandishi, au $19.5 kwa kila kilobaiti.

Hii ndiyo aina ya ghala la gharama kubwa zaidi katika Ethereum.

## Muhtasari {#summary}

Jedwali hili linafupisha chaguzi tofauti, faida na hasara zake.

| Aina ya ghala            | Chanzo cha data     | Dhamana ya upatikanaji                                                                                                                              | Upatikanaji wa onchain                                             | Vizuizi vya ziada                                                         |
| ------------------------ | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| Blobu za EIP-4844        | Offchain            | Dhamana ya Ethereum kwa [~siku 18](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration) | Hashi pekee ndiyo inapatikana                                      |                                                                           |
| Calldata                 | Offchain            | Dhamana ya Ethereum milele (sehemu ya mnyororo wa bloku)                                                                         | Inapatikana tu ikiwa imeandikwa kwa mkataba, na katika muamala huo |                                                                           |
| Offchain na mifumo ya L1 | Offchain            | Dhamana ya \"Mthibitishaji mmoja mwaminifu\" wakati wa kipindi cha changamoto                                                                     | Hashi pekee                                                        | Inahakikishwa na mfumo wa changamoto, tu wakati wa kipindi cha changamoto |
| Msimbo wa mkataba        | Onchain au offchain | Dhamana ya Ethereum milele (sehemu ya mnyororo wa bloku)                                                                         | Ndiyo                                                              | Imeandikwa kwa anwani \"ya nasibu\", haiwezi kuanza na `0xEF`           |
| Matukio                  | Onchain             | Dhamana ya Ethereum milele (sehemu ya mnyororo wa bloku)                                                                         | Hapana                                                             |                                                                           |
| Ghala                    | Onchain             | Dhamana ya Ethereum milele (sehemu ya mnyororo wa bloku na hali ya sasa hadi iandikwe juu)                                       | Ndiyo                                                              |                                                                           |
