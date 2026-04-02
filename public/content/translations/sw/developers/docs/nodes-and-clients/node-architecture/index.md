---
title: Usanifu wa Nodi
description: Utangulizi wa jinsi Nodi za Ethereum zinavyopangwa.
lang: sw
---

Nodi ya Ethereum inaundwa na wateja wawili: [mteja wa utekelezaji](/developers/docs/nodes-and-clients/#execution-clients) na [mteja wa makubaliano](/developers/docs/nodes-and-clients/#consensus-clients). Ili nodi ipendekeze kitalu kipya, lazima pia iendeshe [mteja wa mthibitishaji](#validators).

Wakati Ethereum ilipokuwa ikitumia [uthibitishaji wa kazi](/developers/docs/consensus-mechanisms/pow/), mteja wa utekelezaji alitosha kuendesha nodi kamili ya Ethereum. Hata hivyo, tangu kutekeleza [uthibitishaji wa dhamana](/developers/docs/consensus-mechanisms/pos/), mteja wa utekelezaji lazima atumike pamoja na programu nyingine inayoitwa [mteja wa makubaliano](/developers/docs/nodes-and-clients/#consensus-clients).

Mchoro hapa chini unaonyesha uhusiano kati ya wateja wawili wa Ethereum. Wateja hao wawili huunganishwa kwenye mitandao yao ya rika-kwa-rika (P2P). Mitandao tofauti ya P2P inahitajika kwani wateja wa utekelezaji husambaza miamala kwenye mtandao wao wa P2P, na kuwawezesha kusimamia bwawa lao la miamala la ndani, wakati wateja wa makubaliano husambaza bloku kwenye mtandao wao wa P2P, kuwezesha makubaliano na ukuaji wa mnyororo.

![Mchoro wa usanifu wa nodi ya Ethereum unaoonyesha safu ya utekelezaji na safu ya makubaliano](node-architecture-text-background.png)

_Kuna chaguzi kadhaa kwa mteja wa utekelezaji ikiwa ni pamoja na Erigon, Nethermind, na Besu_.

Ili muundo huu wa wateja wawili ufanye kazi, wateja wa makubaliano lazima wapitishe vifurushi vya miamala kwa mteja wa utekelezaji. Mteja wa utekelezaji hutekeleza miamala ndani ya mfumo ili kuthibitisha kuwa miamala haikiuki sheria zozote za Ethereum na kwamba sasisho lililopendekezwa kwa hali ya Ethereum ni sahihi. Wakati nodi inachaguliwa kuwa mzalishaji wa kitalu, mfano wake wa mteja wa makubaliano huomba vifurushi vya miamala kutoka kwa mteja wa utekelezaji ili kujumuisha katika kitalu kipya na kuzitekeleza ili kusasisha hali ya kimataifa. Mteja wa makubaliano huendesha mteja wa utekelezaji kupitia muunganisho wa ndani wa RPC kwa kutumia [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Mteja wa utekelezaji anafanya nini? {#execution-client}

Mteja wa utekelezaji anawajibika kwa uthibitishaji wa muamala, ushughulikiaji, na usambazaji, pamoja na usimamizi wa hali na kusaidia mashine halisi ya ethereum ([EVM](/developers/docs/evm/)). **Hahusiki** na ujenzi wa kitalu, usambazaji wa kitalu au kushughulikia mantiki ya makubaliano. Haya yapo chini ya jukumu la mteja wa makubaliano.

Mteja wa utekelezaji huunda mizigo ya utekelezaji - orodha ya miamala, trie ya hali iliyosasishwa, na data nyingine zinazohusiana na utekelezaji. Wateja wa makubaliano hujumuisha mzigo wa utekelezaji katika kila kitalu. Mteja wa utekelezaji pia anawajibika kwa kutekeleza tena miamala katika bloku mpya ili kuhakikisha ni halali. Kutekeleza miamala hufanywa kwenye kompyuta iliyopachikwa ya mteja wa utekelezaji, inayojulikana kama [mashine halisi ya ethereum (EVM)](/developers/docs/evm).

Mteja wa utekelezaji pia hutoa kiolesura cha mtumiaji kwa Ethereum kupitia [njia za RPC](/developers/docs/apis/json-rpc) zinazowezesha watumiaji kuuliza kiambajengo cha Ethereum, kuwasilisha miamala na kupeleka mikataba mahiri. Ni kawaida kwa simu za RPC kushughulikiwa na maktaba kama [Web3js](https://docs.web3js.org/), [Web3py](https://web3py.readthedocs.io/en/v5/), au na kiolesura cha mtumiaji kama vile mkoba wa kivinjari.

Kwa muhtasari, mteja wa utekelezaji ni:

- lango la mtumiaji kwa Ethereum
- nyumbani kwa mashine halisi ya ethereum, hali ya Ethereum na bwawa la miamala.

## Mteja wa makubaliano anafanya nini? {#consensus-client}

Mteja wa makubaliano hushughulikia mantiki yote inayowezesha nodi kukaa sawa na mtandao wa Ethereum. Hii inajumuisha kupokea bloku kutoka kwa wenzao na kuendesha algoriti ya uchaguzi wa uma ili kuhakikisha nodi daima inafuata mnyororo wenye mkusanyiko mkubwa zaidi wa uthibitisho (uliopimwa na salio bora la mthibitishaji). Sawa na mteja wa utekelezaji, wateja wa makubaliano wana mtandao wao wa P2P ambao kupitia huo wanashiriki bloku na uthibitisho.

Mteja wa makubaliano hashiriki katika kuthibitisha au kupendekeza bloku - hii inafanywa na mthibitishaji, nyongeza ya hiari kwa mteja wa makubaliano. Mteja wa makubaliano asiye na mthibitishaji huendelea tu na kichwa cha mnyororo, kuruhusu nodi kukaa sawa. Hii inamwezesha mtumiaji kufanya muamala na Ethereum akitumia mteja wake wa utekelezaji, akiwa na uhakika kwamba yuko kwenye mnyororo sahihi.

## Wathibitishaji {#validators}

Kuweka dhamana na kuendesha programu ya mthibitishaji hufanya nodi istahiki kuchaguliwa kupendekeza kitalu kipya. Waendeshaji wa nodi wanaweza kuongeza mthibitishaji kwa wateja wao wa makubaliano kwa kuweka amana ya 32 ETH katika mkataba wa amana. Mteja wa mthibitishaji huja akiwa ameunganishwa na mteja wa makubaliano na anaweza kuongezwa kwenye nodi wakati wowote. Mthibitishaji hushughulikia uthibitisho na mapendekezo ya kitalu. Pia inawezesha nodi kukusanya zawadi au kupoteza ETH kupitia adhabu au kupunguzwa kwa dhamana.

[Zaidi kuhusu kuweka dhamana](/staking/).

## Ulinganisho wa vipengele vya nodi {#node-comparison}

| Mteja wa Utekelezaji                               | Mteja wa Makubaliano                                                                                                                                      | Mthibitishaji                |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| Husambaza miamala kwenye mtandao wake wa P2P       | Husambaza bloku na uthibitisho kwenye mtandao wake wa P2P                                                                                                 | Hupendekeza bloku            |
| Hutekeleza/hutekeleza tena miamala                 | Huendesha algoriti ya uchaguzi wa uma                                                                                                                     | Hukusanya zawadi/adhabu      |
| Huthibitisha mabadiliko ya hali yanayoingia        | Hufuatilia kichwa cha mnyororo                                                                                                                            | Hutoa uthibitisho            |
| Husimamia hali na trie za risiti                   | Husimamia hali ya Beacon (ina taarifa za makubaliano na utekelezaji)                                                                                      | Inahitaji 32 ETH kuwekwa dhamana |
| Huunda mzigo wa utekelezaji                        | Hufuatilia nasibu iliyokusanywa katika RANDAO (algoriti inayotoa nasibu inayoweza kuthibitishwa kwa uchaguzi wa mthibitishaji na shughuli nyingine za makubaliano) | Inaweza kupunguzwa kwa dhamana |
| Hufichua JSON-RPC API kwa ajili ya kuingiliana na Ethereum | Hufuatilia uhalali na kufikia mwisho                                                                                                                      |                              |

## Kusoma zaidi {#further-reading}

- [Uthibitishaji wa dhamana](/developers/docs/consensus-mechanisms/pos)
- [Pendekezo la kitalu](/developers/docs/consensus-mechanisms/pos/block-proposal)
- [Zawadi na adhabu za mthibitishaji](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)