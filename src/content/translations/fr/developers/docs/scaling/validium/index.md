---
title: Validium
description: Une introduction au Validium en tant que solution de mise à l'échelle actuellement utilisée par la communauté Ethereum.
lang: fr
incomplete: true
sidebarDepth: 3
---

Utilise les preuves de validité comme les [rollups ZK](/developers/docs/scaling/zk-rollups/), mais les données ne sont pas stockées sur la chaîne Ethereum de la couche principale 1. Cela peut permettre jusqu'à 10 000 transactions par seconde par chaîne Validium, et plusieurs chaînes peuvent être exécutées en parallèle.

## Prérequis {#prerequisites}

Vous devez avoir une bonne compréhension de tous les sujets fondamentaux et une compréhension approfondie de la [mise à l'échelle d'Ethereum](/developers/docs/scaling/). La mise en œuvre de solutions de mise à l'échelle telles que Validium est un sujet avancé, car la technologie est moins éprouvée et continue à être étudiée et développée.

## Avantages et inconvénients {#pros-and-cons}

| Avantages                                                                                                                                                            | Inconvénients                                                                                                                                                                                                       |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aucun délai de retrait (pas de latence sur la blockchain/les chaînes croisées), donc une plus grande efficacité du capital.                                          | Prise en charge limitée des calculs généraux/contrats intelligents, des langages spécialisés sont requis.                                                                                                           |
| Aucune vulnérabilité à certaines attaques économiques auxquelles sont confrontés les systèmes basés sur les preuves de fraude dans des applications à valeur élevée. | Grande puissance de calcul nécessaire pour générer les preuves ZK, donc n'est pas rentable pour les applications à faible débit.                                                                                    |
|                                                                                                                                                                      | Délai de finalisation subjective plus long (10-30 min pour générer une preuve ZK), mais plus rapide pour une finalisation complète, car il n'existe pas de délai de contestation comme dans les rollups optimisés). |
|                                                                                                                                                                      | La génération d'une preuve exige que les données hors chaîne soient disponibles en tout temps.                                                                                                                      |

### Chaînes Validium que vous pouvez utiliser {#use-validium}

Plusieurs projets fournissent des implémentations de Validium que vous pouvez intégrer dans vos dApps :

- [Starkware](https://starkware.co/)
- [Matter Labs zkPorter](https://matter-labs.io/)

## Complément d'information {#further-reading}

- [Validium et The Layer 2 Two-By-Two - Numéro 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_
