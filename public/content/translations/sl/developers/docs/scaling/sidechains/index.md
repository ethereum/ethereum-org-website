---
title: Stranske verige
description: Uvod v stranske verige kot rešitev za razširljivost, ki jo trenutno uporablja skupnost Ethereum.
lang: sl
incomplete: true
sidebarDepth: 3
---

Stranska veriga je ločena blokovna veriga, ki neodvisno deluje vzporedno z glavnim omrežjem Ethereum. Ima svoj lasten [algoritem za soglasje](/developers/docs/consensus-mechanisms/) (torej [dokaz o avtoriteti](https://wikipedia.org/wiki/Proof_of_authority), [delegiran dokaz o deležu](https://en.bitcoinwiki.org/wiki/DPoS), [toleranco bizantinske napake](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained)). Z glavnim omrežjem je povezana prek dvosmernega mostu.

Kar naredi stransko verigo še posebej vznemirljivo, je to, da veriga deluje enako kot glavna veriga Ethereum, saj temelji na [EVM](/developers/docs/evm/). Ne uporablja Ethereuma, ampak je Ethereum. To pomeni, da če želite uporabljati svoj [dapp](/developers/docs/dapps/) na stranski verigi, gre le za vprašanje uveljavitve vaše kode na tej stranski verigi. Videti je, čuti in deluje enako kot glavno omrežje – pogodbe pišete v Solidity in z verigo sodelujete prek API-ja Web3.

## Predpogoji {#prerequisites}

Dobro morate razumeti vse temeljne teme in zelo dobro razumeti [razširljivosti Ethereuma](/developers/docs/scaling/).

## Prednosti in slabosti {#pros-and-cons}

| Prednosti                                        | Slabosti                                                                                |
| ------------------------------------------------ | --------------------------------------------------------------------------------------- |
| Uveljavljena tehnologija.                        | Manj decentralizirana.                                                                  |
| Podpira splošno računanje in kompatibilnost EVM. | Uporablja ločen mehanizem za soglasje. Ni zavarovana s plastjo 1 (tehnično ni plast 2). |
|                                                  | Kvorum validatorjev stranske verige lahko zagreši goljufijo.                            |

### Uporaba stranskih verig {#use-sidechains}

Več projektov zagotavlja implementacije stranskih verig, ki jih lahko integrirate v svoje dappe:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain (prej xDai)](https://www.xdaichain.com/)

## Nadaljnje branje {#further-reading}

- [Scaling Ethereum Dapps through Sidechains](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _Feb 8, 2018 – Georgios Konstantopoulos_

_Poznate vir iz skupnosti, ki vam je pomagal? Uredite to stran in ga dodajte!_
