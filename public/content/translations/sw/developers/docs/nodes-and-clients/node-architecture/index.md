---
title: Muundo wa Nodi
description: Utangulizi wa jinsi nodi za Ethereum zinavyopangwa.
lang: sw
---

Nodi ya Ethereum imeundwa na programu mbili: [programu ya utekelezaji](/developers/docs/nodes-and-clients/#execution-clients) na [programu ya makubaliano](/developers/docs/nodes-and-clients/#consensus-clients). Ili nodi iweze kupendekeza bloku mpya, ni lazima pia iendeshe [programu ya mthibitishaji](#validators).

Wakati Ethereum ilikuwa ikitumia [uthibitishaji-wa-kazi](/developers/docs/consensus-mechanisms/pow/), programu ya utekelezaji ilitosha kuendesha nodi kamili ya Ethereum. Hata hivyo, tangu kutekelezwa kwa [uthibitisho wa hisa](/developers/docs/consensus-mechanisms/pow/), programu ya utekelezaji lazima itumike pamoja na programu nyingine inayoitwa [programu ya makubaliano](/developers/docs/nodes-and-clients/#consensus-clients).

Mchoro ulio hapa chini unaonyesha uhusiano kati ya programu mbili za Ethereum. Programu hizi mbili huunganishwa kwenye mitandao yao husika ya rika-kwa-rika (P2P). Mitandao tofauti ya P2P inahitajika kwani programu za utekelezaji husambaza miamala kupitia mtandao wao wa P2P, na kuziruhusu kudhibiti hifadhi zao za ndani za miamala, wakati programu za makubaliano husambaza bloku kupitia mtandao wao wa P2P, na kuwezesha makubaliano na ukuaji wa mnyororo.

![](node-architecture-text-background.png)

_Kuna chaguo kadhaa za programu ya utekelezaji ikiwa ni pamoja na Erigon, Nethermind, na Besu_.

Ili muundo huu wa programu mbili ufanye kazi, programu za makubaliano lazima zipitishe mafungu ya miamala kwa programu ya utekelezaji. Programu ya utekelezaji hutekeleza miamala ndani ya mfumo ili kuhakiki kwamba miamala haikiuki sheria zozote za Ethereum na kwamba sasisho lililopendekezwa kwa hali ya Ethereum ni sahihi. Wakati nodi inapochaguliwa kuwa mzalishaji wa bloku, kielelezo chake cha programu ya makubaliano huomba mafungu ya miamala kutoka kwa programu ya utekelezaji ili kujumuisha katika bloku mpya na kuzitekeleza ili kusasisha hali ya kimataifa. Programu ya makubaliano huendesha programu ya utekelezaji kupitia muunganisho wa RPC wa ndani kwa kutumia [API ya Injini](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Programu ya utekelezaji hufanya nini? {#execution-client}

Programu ya utekelezaji inawajibika kwa uhakiki wa miamala, utunzaji, na usambazaji, pamoja na usimamizi wa hali na kusaidia Mashine Halisi ya Ethereum ([EVM](/developers/docs/evm/)). Haiwajibiki **kwa** ujenzi wa bloku, usambazaji wa bloku au kushughulikia mantiki ya makubaliano. Haya yako chini ya mamlaka ya programu ya makubaliano.

Programu ya utekelezaji huunda mizigo ya utekelezaji - orodha ya miamala, trie ya hali iliyosasishwa, na data nyingine zinazohusiana na utekelezaji. Programu za makubaliano hujumuisha mzigo wa utekelezaji katika kila bloku. Programu ya utekelezaji pia inawajibika kwa kutekeleza tena miamala katika bloku mpya ili kuhakikisha kuwa ni halali. Utekelezaji wa miamala hufanywa kwenye kompyuta iliyopachikwa ya programu ya utekelezaji, inayojulikana kama [Mashine Halisi ya Ethereum (EVM)](/developers/docs/evm).

Programu ya utekelezaji pia hutoa kiolesura cha mtumiaji kwa Ethereum kupitia [mbinu za RPC](/developers/docs/apis/json-rpc) zinazowawezesha watumiaji kuuliza mnyororo wa bloku wa Ethereum, kuwasilisha miamala na kupeleka mikataba-erevu. Ni kawaida kwa simu za RPC kushughulikiwa na maktaba kama vile [Web3js](https://docs.web3js.org/), [Web3py](https://web3py.readthedocs.io/en/v5/), au kwa kiolesura cha mtumiaji kama vile mkoba wa kivinjari.

Kwa muhtasari, programu ya utekelezaji ni:

- lango la mtumiaji kuelekea Ethereum
- mahali pa Mashine Halisi ya Ethereum, hali ya Ethereum na hifadhi ya miamala.

## Programu ya makubaliano hufanya nini? {#consensus-client}

Programu ya makubaliano inashughulikia mantiki yote inayowezesha nodi kusalia ikisawazishwa na mtandao wa Ethereum. Hii ni pamoja na kupokea bloku kutoka kwa rika na kuendesha algoriti ya kuchagua uma ili kuhakikisha nodi inafuata kila wakati mnyororo wenye mkusanyiko mkubwa zaidi wa uthibitisho (unaopimwa kwa salio faafu za mthibitishaji). Sawa na programu ya utekelezaji, programu za makubaliano zina mtandao wao wenyewe wa P2P ambapo hushiriki bloku na uthibitisho.

Programu ya makubaliano haishiriki katika kuidhinisha au kupendekeza bloku - hii inafanywa na mthibitishaji, programu jalizi ya hiari kwa programu ya makubaliano. Programu ya makubaliano isiyo na mthibitishaji hufuata tu kichwa cha mnyororo, ikiruhusu nodi kusalia imesawazishwa. Hii humwezesha mtumiaji kufanya miamala na Ethereum kwa kutumia programu yake ya utekelezaji, akiwa na uhakika kwamba yuko kwenye mnyororo sahihi.

## Wathibitishaji {#validators}

Kusimamisha hisa na kuendesha programu ya mthibitishaji hufanya nodi istahili kuchaguliwa kupendekeza bloku mpya. Waendeshaji wa nodi wanaweza kuongeza mthibitishaji kwenye programu zao za makubaliano kwa kuweka ETH 32 kwenye mkataba wa amana. Programu ya mthibitishaji huja ikiwa imefungwa pamoja na programu ya makubaliano na inaweza kuongezwa kwenye nodi wakati wowote. Mthibitishaji hushughulikia uthibitisho na mapendekezo ya bloku. Pia huwezesha nodi kukusanya zawadi au kupoteza ETH kupitia adhabu au 'slashing'.

[Zaidi kuhusu kusimamisha hisa](/staking/).

## Ulinganisho wa vijenzi vya nodi {#node-comparison}

| Programu ya Utekelezaji                                       | Programu ya Makubaliano                                                                                                                                                                      | Mthibitishaji                 |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| Husambaza miamala kupitia mtandao wake wa P2P                 | Husambaza bloku na uthibitisho kupitia mtandao wake wa P2P                                                                                                                                   | Hupendekeza bloku             |
| Hutekeleza/hutekeleza upya miamala                            | Huendesha algoriti ya kuchagua uma                                                                                                                                                           | Hukusanya zawadi/adhabu       |
| Huhakiki mabadiliko ya hali yanayoingia                       | Hufuatilia kichwa cha mnyororo                                                                                                                                                               | Hufanya uthibitisho           |
| Husimamia hali na trie za risiti                              | Husimamia hali ya Beacon (ina taarifa za makubaliano na utekelezaji)                                                                                                      | Inahitaji ETH 32 kusimamishwa |
| Huunda mzigo wa utekelezaji                                   | Hufuatilia nasibu iliyokusanywa katika RANDAO (algoriti inayotoa nasibu inayoweza kuthibitishwa kwa ajili ya uteuzi wa mthibitishaji na shughuli nyingine za makubaliano) | Inaweza kupata 'slashing'     |
| Hufichua API ya JSON-RPC kwa ajili ya kuingiliana na Ethereum | Hufuatilia uhalalishaji na ukamilishaji                                                                                                                                                      |                               |

## Masomo zaidi {#further-reading}

- [Uthibitisho wa Hisa](/developers/docs/consensus-mechanisms/pos)
- [Pendekezo la bloku](/developers/docs/consensus-mechanisms/pos/block-proposal)
- [Zawadi na adhabu za mthibitishaji](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)
