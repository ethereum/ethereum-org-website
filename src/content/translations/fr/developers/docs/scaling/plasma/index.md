---
title: Les chaînes plasma
description: Une introduction aux chaînes plasma en tant que solution de mise à l'échelle actuellement utilisée par la communauté Ethereum.
lang: fr
incomplete: true
sidebarDepth: 3
---

Une chaîne plasma est une blockchain séparée qui est ancrée à la chaîne Ethereum principale et qui utilise des preuves de fraude (comme les [rollups optimisés](/developers/docs/scaling/optimistic-rollups/)) pour arbitrer les litiges. Ces chaînes sont parfois appelées chaînes « enfants » car elles sont essentiellement des copies plus petites du réseau principal Ethereum. Les arbres Merkle permettent la création d'une pile illimitée de ces chaînes qui peut fonctionner pour décharger la bande passante des chaînes parentes (y compris du réseau principal). Celles-ci tirent leur sécurité des [preuves de fraude](/glossary/#fraud-proof) et chaque chaîne enfant a son propre mécanisme de validation de blocs.

## Prérequis {#prerequisites}

Vous devez avoir une bonne compréhension de tous les sujets fondamentaux et une compréhension approfondie de la [mise à l'échelle d'Ethereum](/developers/docs/scaling/). La mise en œuvre de solutions de mise à l'échelle telle que Plasma est un sujet avancé puisque la technologie est moins éprouvée et toujours en cours de recherche et développement.

## Avantages et inconvénients {#pros-and-cons}

| Avantages                                                                                                                                          | Inconvénients                                                                                                                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Débit élevé, faible coût par transaction.                                                                                                          | Ne prend pas en charge le calcul général. Seuls les transferts de jetons de base, les échanges et quelques autres types de transactions sont pris en charge par la logique des prédicats.                        |
| Convient aux transactions entre utilisateurs arbitraires (pas de surcharge par pair d'utilisateurs si les deux sont établis sur la chaîne plasma). | Nécessité de surveiller périodiquement le réseau (exigence de vivacité) ou de déléguer cette responsabilité à quelqu'un d'autre pour garantir la sécurité de vos fonds.                                          |
|                                                                                                                                                    | Se repose sur un ou plusieurs opérateurs pour stocker les données et les utiliser sur demande.                                                                                                                   |
|                                                                                                                                                    | Les retraits sont retardés de plusieurs jours pour permettre les contestations. Pour les actifs fongibles, cela peut être atténué par les fournisseurs de liquidités, mais il existe un coût en capital associé. |

### Chaînes Plasma que vous pouvez utiliser {#use-plasma}

Plusieurs projets fournissent des implémentations de Plasma que vous pouvez intégrer dans vos dApps :

- [Réseau OMG](https://omg.network/)
- [Polygon](https://polygon.technology/) (anciennement Matic Network)
- [Gluon](https://gluon.network/)
- [LeapDAO](https://ipfs.leapdao.org/)

## Complément d'information {#further-reading}

- [EthHub sur Plasma](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/plasma/)
- [Apprendre Plasma](https://www.learnplasma.org/en/)

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_
