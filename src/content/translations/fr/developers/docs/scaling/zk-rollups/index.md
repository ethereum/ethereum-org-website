---
title: Rollups Zero-Knowledge (ZK)
description: Introduction aux Rollups Zero-Knowledge
lang: fr
---

## Prérequis {#prerequisites}

Vous devez avoir une bonne compréhension de tous les sujets fondamentaux et une compréhension approfondie de la [mise à l'échelle d'Ethereum](/developers/docs/scaling/). La mise en œuvre de solutions de mise à l'échelle telles que les rollups est un sujet avancé, car la technologie est moins éprouvée et toujours en cours de recherche et développement.

Vous recherchez une ressource plus conviviale pour les débutants ? Consultez notre [introduction à la Couche 2](/layer-2/).

## Rollups Zero Knowledge (ZK) {#zk-rollups}

Les **Rollups Zero Knowledge (rollups ZK)** regroupent des centaines de transferts hors chaîne et génèrent une preuve cryptographique. Ces preuves peuvent être des SNARK (Succinct Non-interactive Argument of Knowledge - argument succing non-interactif de connaissance) ou des STARK (Scalable Transparent Argument of Knowledge - argument de connaissance évolutif transparent). Les SNARK et les STARK sont des preuves de validité et sont intégrés dans la couche 1.

Le contrat intelligent du rollup ZK conserve l'état de tous les transferts effectués dans la couche 2 et cet état ne peut être mis à jour qu'avec une preuve de validité. Cela signifie que les rollups ZK n'ont besoin que de la preuve de validité au lieu de toutes les données de la transaction. Avec un rollup ZK, valider un bloc est plus rapide et moins coûteux, car moins de données sont incluses.

Avec un rollup ZK, les fonds sont déplacés sans délai de la couche 2 à la couche 1, car une preuve de validité acceptée par le contrat ZK-rollup a déjà vérifié les fonds.

En se trouvant sur la couche 2, les rollups ZK permettent d'optimiser davantage la taille des transactions. Par exemple, un compte représenté par un index plutôt que par une adresse permet de réduire à seulement 4 octets une transaction de 32 octets. Les transactions sont également écrites sur Ethereum comme des `données d'appel`, réduisant ainsi les frais de gaz.

### Avantages et inconvénients {#zk-pros-and-cons}

| Avantages                                                                                                                                  | Inconvénients                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Temps de finalisation plus court, dans la mesure où l'état est immédiatement vérifié une fois les preuves envoyées à la chaîne principale. | Certains ne disposent pas du support EVM.                                                                                                        |
| Pas de vulnérabilité aux attaques économiques alors que les [rollups optimistes](#optimistic-pros-and-cons) y sont vulnérables.            | Les preuves de validité étant intenses à calculer, les rollups ZK ne présentent guère d'intérêt pour les applications peu actives sur la chaîne. |
| Sécurisé et décentralisé, car les données nécessaires pour récupérer l'état sont stockées sur la couche 1.                                 | Un opérateur peut influencer l'ordre des transactions                                                                                            |

### Les rollups ZK en images {#zk-video}

Regardez la vidéo de Finematics qui explique les rollups ZK :

<YouTube id="7pWxCklcNsU" start="406" />

### Utiliser les rollups ZK {#use-zk-rollups}

Il existe un grand nombre d'implémentations de rollups ZK que vous pouvez intégrer dans vos dApps :

<RollupProductDevDoc rollupType="zk" />

**Lectures sur les rollups ZK**

- [Qu'est-ce que les Rollups Zero Knowledge ?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [EthHub sur rollups ZK](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/zk-rollups/)
- [STARKs vs SNARKs](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
