---
title: Lanțuri paralele
description: O introducere despre lanțurile paralele ca soluție de scalare utilizată actualmente de comunitatea Ethereum.
lang: ro
incomplete: true
sidebarDepth: 3
---

Un lanț paralel (sidechain) este un blockchain separat care funcționează în paralel cu Mainnet-ul Ethereum și operează independent. Are propriul [algoritm de consens](/developers/docs/consensus-mechanisms/) (de exemplu, [dovada-autorităţii](https://wikipedia.org/wiki/Proof_of_authority), [dovada-mizei delegată](https://en.bitcoinwiki.org/wiki/DPoS), [toleranța Byzantine la erori](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained)). Este conectat la Mainnet printr-o punte bidirecțională.

Ceea ce face ca un lanț paralel să fie deosebit de interesant este faptul că acesta funcționează în același fel ca și lanțul principal Ethereum, deoarece se bazează pe [EVM](/developers/docs/evm/). Nu folosește Ethereum, ci este Ethereum. Asta înseamnă că, dacă doriți să vă folosiți [aplicația dapp](/developers/docs/dapps/) pe un lanț paralel, este doar o chestiune de a vă implementa codul pe acest lanț paralel. Arată, dă impresia și acționează în același mod ca și Mainnet – scrieți contracte în Solidity și interacționați cu lanțul prin intermediul API-ului Web3.

## Condiții prealabile {#prerequisites}

Ar trebui să înţelegeţi bine toate subiectele fundamentale și să aveţi un nivel înalt de înţelegere a [scalării în Ethereum](/developers/docs/scaling/).

## Avantaje și dezavantaje {#pros-and-cons}

| Avantaje                                          | Dezavantaje                                                                                                                       |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Tehnologie stabilită.                             | Mai puțin descentralizat.                                                                                                         |
| Acceptă calculul general, compatibilitate cu EVM. | Utilizează un mecanism de consens separat. Nu este securizat de nivelul 1 (deci, din punct de vedere tehnic, nu este de nivel 2). |
|                                                   | Un minim de validatori ai lanţului paralel pot comite fraudă.                                                                     |

### Utilizarea lanțurilor paralele {#use-sidechains}

Numeroase proiecte oferă implementări de lanțuri paralele pe care le puteți integra în aplicațiile dvs. dapp:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Lanțul Gnosis (fost xDai)](https://www.xdaichain.com/)

## Referințe suplimentare {#further-reading}

- [Scalarea dapp-urilor Ethereum prin lanţuri paralele](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _8 februarie 2018 - Georgios Konstantopoulos_

_Cunoașteți o resursă a comunității care v-a ajutat? Editați această pagină și adăugați-o!_
