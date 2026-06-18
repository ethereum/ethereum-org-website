---
title: Usanifu wa nodi
description: Utangulizi wa jinsi nodi za Ethereum zinavyopangwa.
lang: sw
---

Nodi ya Ethereum inaundwa na wateja wawili: [kiteja cha utekelezaji](/developers/docs/nodes-and-clients/#execution-clients) na [mteja wa mwafaka](/developers/docs/nodes-and-clients/#consensus-clients). Ili nodi iweze kupendekeza kitalu kipya, lazima pia iendeshe [kiteja cha mthibitishaji](#validators).

Wakati Ethereum ilipokuwa ikitumia [Uthibitisho wa Kazi (PoW)](/developers/docs/consensus-mechanisms/pow/), kiteja cha utekelezaji kilitosha kuendesha nodi kamili ya Ethereum. Hata hivyo, tangu kutekelezwa kwa [Uthibitisho wa Dau (PoS)](/developers/docs/consensus-mechanisms/pos/), kiteja cha utekelezaji lazima kitumike pamoja na programu nyingine inayoitwa [mteja wa mwafaka](/developers/docs/nodes-and-clients/#consensus-clients).

Mchoro ulio hapa chini unaonyesha uhusiano kati ya wateja wawili wa Ethereum. Wateja hao wawili huunganishwa kwenye mitandao yao husika ya rika-kwa-rika (P2P). Mitandao tofauti ya P2P inahitajika kwa kuwa viteja vya utekelezaji husambaza miamala kwenye mtandao wao wa P2P, na kuviwezesha kudhibiti kusanyiko la miamala la ndani, huku wateja wa mwafaka wakisambaza vitalu kwenye mtandao wao wa P2P, na kuwezesha mwafaka na ukuaji wa mnyororo.

![Diagram of Ethereum node architecture showing execution and consensus layers](node-architecture-text-background.png)

_Kuna chaguzi kadhaa za kiteja cha utekelezaji ikiwa ni pamoja na Erigon, Nethermind, na Besu_.

Ili muundo huu wa wateja wawili ufanye kazi, wateja wa mwafaka lazima wapitishe vifurushi vya miamala kwa kiteja cha utekelezaji. Kiteja cha utekelezaji hutekeleza miamala ndani ya mfumo ili kuthibitisha kuwa miamala haikiuki sheria zozote za Ethereum na kwamba sasisho lililopendekezwa kwa hali ya Ethereum ni sahihi. Wakati nodi inapochaguliwa kuwa mzalishaji wa kitalu, mfano wake wa mteja wa mwafaka huomba vifurushi vya miamala kutoka kwa kiteja cha utekelezaji ili kuvijumuisha kwenye kitalu kipya na kuvitekeleza ili kusasisha hali ya kimataifa. Mteja wa mwafaka huendesha kiteja cha utekelezaji kupitia muunganisho wa ndani wa RPC kwa kutumia [API ya Injini](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Kiteja cha utekelezaji hufanya nini? {#execution-client}

Kiteja cha utekelezaji kinawajibika kwa uthibitishaji, ushughulikiaji, na usambazaji wa miamala, pamoja na usimamizi wa hali na kusaidia Mashine Pepe ya Ethereum ([EVM](/developers/docs/evm/)). **Hakiwajibiki** kwa ujenzi wa kitalu, usambazaji wa kitalu au kushughulikia mantiki ya mwafaka. Haya yako chini ya jukumu la mteja wa mwafaka.

Kiteja cha utekelezaji huunda mizigo ya utekelezaji - orodha ya miamala, trie ya hali iliyosasishwa, na data nyingine zinazohusiana na utekelezaji. Wateja wa mwafaka hujumuisha mzigo wa utekelezaji katika kila kitalu. Kiteja cha utekelezaji pia kinawajibika kwa kutekeleza upya miamala katika vitalu vipya ili kuhakikisha ni halali. Utekelezaji wa miamala hufanywa kwenye kompyuta iliyopachikwa ya kiteja cha utekelezaji, inayojulikana kama [Mashine Pepe ya Ethereum (EVM)](/developers/docs/evm).

Kiteja cha utekelezaji pia hutoa kiolesura cha mtumiaji kwa Ethereum kupitia [mbinu za RPC](/developers/docs/apis/json-rpc) zinazowezesha watumiaji kuuliza mnyororo wa vitalu wa Ethereum, kuwasilisha miamala na kusambaza mikataba mahiri. Ni kawaida kwa miito ya RPC kushughulikiwa na maktaba kama [Web3js](https://docs.web3js.org/), [Web3py](https://web3py.readthedocs.io/en/v5/), au na kiolesura cha mtumiaji kama vile mkoba wa kivinjari.

Kwa muhtasari, kiteja cha utekelezaji ni:

- lango la mtumiaji kwa Ethereum
- nyumbani kwa Mashine Pepe ya Ethereum, hali ya Ethereum na kusanyiko la miamala.

## Mteja wa mwafaka hufanya nini? {#consensus-client}

Mteja wa mwafaka hushughulikia mantiki yote inayowezesha nodi kusalia katika usawazishaji na mtandao wa Ethereum. Hii inajumuisha kupokea vitalu kutoka kwa rika na kuendesha algoriti ya kuchagua mchepuko ili kuhakikisha nodi inafuata mnyororo wenye mkusanyiko mkubwa zaidi wa uthibitisho (uliopimwa kwa salio tendaji la mthibitishaji). Sawa na kiteja cha utekelezaji, wateja wa mwafaka wana mtandao wao wa P2P ambao kupitia huo wanashiriki vitalu na uthibitisho.

Mteja wa mwafaka hashiriki katika kuthibitisha au kupendekeza vitalu - hili hufanywa na mthibitishaji, nyongeza ya hiari kwa mteja wa mwafaka. Mteja wa mwafaka asiye na mthibitishaji huenda sambamba tu na kichwa cha mnyororo, kuruhusu nodi kusalia imesawazishwa. Hii inamwezesha mtumiaji kufanya muamala na Ethereum akitumia kiteja chake cha utekelezaji, akiwa na uhakika kwamba yuko kwenye mnyororo sahihi.

## Wathibitishaji {#validators}

Kuweka dhamana na kuendesha programu ya mthibitishaji hufanya nodi ifae kuchaguliwa kupendekeza kitalu kipya. Waendeshaji wa nodi wanaweza kuongeza mthibitishaji kwa wateja wao wa mwafaka kwa kuweka amana ya 32 ETH katika mkataba wa amana. Kiteja cha mthibitishaji huja kikiwa kimeunganishwa na mteja wa mwafaka na kinaweza kuongezwa kwenye nodi wakati wowote. Mthibitishaji hushughulikia uthibitisho na mapendekezo ya kitalu. Pia huwezesha nodi kukusanya zawadi au kupoteza ETH kupitia adhabu au ukataji.

[Zaidi kuhusu uwekaji dhamana](/staking/).

## Ulinganisho wa vipengele vya nodi {#node-comparison}

| Kiteja cha Utekelezaji                             | Mteja wa Mwafaka                                                                                                                                          | Mthibitishaji                |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| Husambaza miamala kwenye mtandao wake wa P2P       | Husambaza vitalu na uthibitisho kwenye mtandao wake wa P2P                                                                                                | Hupendekeza vitalu           |
| Hutekeleza/hutekeleza upya miamala                 | Huendesha algoriti ya kuchagua mchepuko                                                                                                                   | Hukusanya zawadi/adhabu      |
| Huthibitisha mabadiliko ya hali yanayoingia        | Hufuatilia kichwa cha mnyororo                                                                                                                            | Hufanya uthibitisho          |
| Husimamia trie za hali na stakabadhi               | Husimamia hali ya Beacon (ina maelezo ya mwafaka na utekelezaji)                                                                                          | Inahitaji 32 ETH kuwekwa dhamana |
| Huunda mzigo wa utekelezaji                        | Hufuatilia unasibu uliokusanywa katika RANDAO (algoriti inayotoa unasibu unaothibitishwa kwa uteuzi wa mthibitishaji na shughuli nyingine za mwafaka) | Inaweza kukatwa              |
| Hufichua API ya JSON-RPC kwa kuingiliana na Ethereum | Hufuatilia uhalali na ukamilishaji                                                                                                                        |                              |

## Usomaji zaidi {#further-reading}

- [Uthibitisho wa Dau (PoS)](/developers/docs/consensus-mechanisms/pos)
- [Pendekezo la kitalu](/developers/docs/consensus-mechanisms/pos/block-proposal)
- [Zawadi na adhabu za mthibitishaji](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)