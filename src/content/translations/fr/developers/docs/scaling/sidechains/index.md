---
title: Chaines latérales ou sidechains
description: Une introduction aux chaînes latérales en tant que solution de mise à l'échelle actuellement utilisée par la communauté Ethereum.
lang: fr
incomplete: true
sidebarDepth: 3
---

Une chaîne latérale est une blockchain séparée qui fonctionne en parallèle au réseau Ethereum principal et ce, de façon indépendante. Elle possède son propre [algorithme de consensus](/developers/docs/consensus-mechanisms/) (p. ex. [Preuve d'autorité](https://wikipedia.org/wiki/Proof_of_authority), [Preuve d'enjeu déléguée](https://en.bitcoinwiki.org/wiki/DPoS), [tolérance aux défauts byzantins](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained), etc.). Elle est reliée au réseau principal par un « pont » à deux sens.

Ce qui rend une chaîne latérale particulièrement intéressante, c'est que cette chaîne fonctionne de la même manière que la chaîne principale Ethereum, car elle est basée sur [l'EVM](/developers/docs/evm/). Elle n'utilise pas Ethereum, elle EST Ethereum. Cela signifie que si vous souhaitez utiliser votre [dApp](/developers/docs/dapps/) sur une chaîne latérale, il suffit de déployer votre code sur cette chaîne latérale. Elle ressemble, réagit et agit comme le réseau principal Ethereum – vous écrivez des contrats dans Solidity et interagissez avec la chaîne via l’API Web3.

## Prérequis {#prerequisites}

Vous devez avoir une bonne compréhension de tous les sujets fondamentaux et une compréhension de haut niveau de la [mise à l'échelle Ethereum](/developers/docs/scaling/).

## Avantages et inconvénients {#pros-and-cons}

| Avantages                                                     | Inconvénients                                                                                                             |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Technologie établie.                                          | Moins décentralisée.                                                                                                      |
| Prend en charge le calcul général, est compatible avec l'EVM. | Utilise un mécanisme de consensus distinct. Non sécurisée par la couche 1 (techniquement, ce n’est donc pas la couche 2). |
|                                                               | Un quorum de validateurs de la chaîne latérale peut commettre une fraude.                                                 |

### Chaînes latérales que vous pouvez utiliser {#use-sidechains}

Plusieurs projets fournissent des implémentations de chaînes latérales que vous pouvez intégrer dans vos dapps :

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain (anciennement xDai)](https://www.xdaichain.com/)

## Complément d'information {#further-reading}

- [EthHub sur les canaux d'état](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/sidechains/)
- [Scaling Ethereum DApps through Sidechains](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _- Georgios Konstantopoulos, 8 février 2018_

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_
