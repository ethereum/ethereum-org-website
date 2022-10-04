---
title: Canaux d'état
description: Une introduction aux canaux d'état et canaux de paiement en tant que solution de mise à l'échelle actuellement utilisée par la communauté Ethereum.
lang: fr
incomplete: true
sidebarDepth: 3
---

Les canaux d'état permettent aux participants d'effectuer des `x` transactions hors chaîne tout en ne soumettant que deux transactions en chaîne au réseau Ethereum. Cela permet un débit de transaction extrêmement élevé.

## Prérequis {#prerequisites}

Vous devez avoir une bonne compréhension de tous les sujets fondamentaux et une compréhension approfondie de la [mise à l'échelle d'Ethereum](/developers/docs/scaling/). La mise en œuvre de solutions de mise à l'échelle telles que les canaux est un sujet avancé puisque la technologie est moins éprouvée et est en cours de recherche et de développement.

## Canaux {#channels}

Les participants doivent verrouiller une partie de l'état d'Ethereum, comme un dépôt d'ETH, dans un contrat multisignature (« multisig »). Un contrat multisig est un type de contrat qui nécessite la signature (et donc l'accord) de plusieurs clés privées pour être exécuté.

Verrouiller l'état de cette façon constitue la première transaction et ouvre le canal. Les participants peuvent alors effectuer des transactions rapidement et librement hors chaîne. Une fois l'interaction terminée, une transaction finale est soumise sur la blockchain, déverrouillant l'état.

**Ceci est utile ** :

- pour de nombreuses mises à niveau d'état ;
- lorsque le nombre de participants est connu à l'avance ;
- lorsque les participants sont toujours disponibles.

Il existe actuellement deux types de canaux : les canaux d'état et les canaux de paiement.

## Canaux d'état {#state-channels}

Les canaux d'état peuvent mieux s'expliquer à travers un exemple, comme un jeu de tic tac toc :

1. Créez un contrat intelligent multisig « Juge » sur la chaîne principale Ethereum qui comprend les règles du tic-tac-toc, et peut identifier Alice et Marc comme les deux joueurs du jeu. Ce contrat détient un prix de 1 ETH.

2. Alice et Marc commencent à jouer au jeu, ouvrant le canal d'état. Chaque mouvement crée une transaction hors chaîne contenant un « nonce », ce qui signifie simplement que nous pourrons toujours dire plus tard dans quel ordre les mouvements se sont déroulés.

3. Lorsqu'il y a un gagnant (Alice), ils ferment le canal en soumettant l'état final (p. ex., une liste de transactions) au contrat Juge, ne payant qu'une fois les frais de transaction. Le juge veille à ce que cet « état final » soit signé par les deux parties, patiente un certain temps pour garantir que personne ne peut légitimement contester le résultat, puis verse à Alice le prix de 1 ETH.

## Canaux de paiement {#payment-channels}

Des canaux d'état simplifiés qui ne traitent que des paiements (ex : transferts d'ETH). Ils permettent des transferts hors chaîne entre deux participants, à condition que la somme nette des transferts ne dépasse pas les jetons déposés.

## Avantages et inconvénients {#channels-pros-and-cons}

| Avantages                                                                                       | Inconvénients                                                                                                                                                           |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Retrait/règlement instantané sur le réseau principal (si les deux parties d'un canal coopèrent) | Délai et coût de configuration et de règlement d'un canal. Peu intéressant pour les transactions ponctuelles entre utilisateurs arbitraires.                            |
| Débits extrêmement élevés possibles                                                             | Nécessité de surveiller périodiquement le réseau (exigence de vivacité) ou de déléguer cette responsabilité à quelqu'un d'autre pour garantir la sécurité de vos fonds. |
| Coût par transaction le plus bas. Intéressant pour le streaming des micropaiements              | Nécessité de verrouiller les fonds sur les canaux de paiement ouverts                                                                                                   |
|                                                                                                 | Ne prend pas en charge la participation ouverte                                                                                                                         |

## Utiliser les canaux d'état {#use-state-channels}

Plusieurs projets fournissent des implémentations de canaux d'état que vous pouvez intégrer dans vos dapps :

- [Connext](https://connext.network/)
- [Kchannels](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Complément d'information {#further-reading}

**Canaux d'état**

- [EthHub sur les canaux d'état](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/state-channels/)
- [Making Sense of Ethereum’s Layer 2 Scaling Solutions: State Channels, Plasma, and Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _- Josh Stark, 12 février 2018_
- [State Channels - an explanation](https://www.jeffcoleman.ca/state-channels/) _- Jeff Coleman, 6 novembre 2015 _
- [Basics of State Channels](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_

**Canaux de paiement**

- [EthHub sur les canaux de paiement](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/payment-channels/)

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_
