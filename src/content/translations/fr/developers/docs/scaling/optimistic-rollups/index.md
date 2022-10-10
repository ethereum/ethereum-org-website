---
title: rollups optimisés
description: Introduction aux rollups optimisés
lang: fr
---

## Prérequis {#prerequisites}

Vous devez avoir une bonne compréhension de tous les sujets fondamentaux et une compréhension approfondie de la [mise à l'échelle d'Ethereum](/developers/docs/scaling/). La mise en œuvre de solutions de mise à l'échelle telles que les rollups est un sujet avancé, car la technologie est moins éprouvée et toujours en cours de recherche et développement.

Vous recherchez une ressource plus conviviale pour les débutants ? Consultez notre [introduction à la Couche 2](/layer-2/).

## Rollups optimisés {#optimistic-rollups}

Les rollups optimisés s'installent en parallèle à la chaîne principale d'Ethereum pour la couche 2. Ils peuvent offrir des améliorations en matière d'évolutivité, car ils n'effectuent aucun calcul par défaut. Au lieu de cela, après une transaction, ils proposent le nouvel état du réseau principal ou « certifient » la transaction.

Avec les rollups optimisés, les transactions sont codées sur la chaîne principale Ethereum en tant que `données d'appel`, ce qui les optimise davantage en réduisant les frais de gaz.

Le calcul étant la partie lente et coûteuse de l'utilisation d'Ethereum, les rollups optimisés peuvent offrir 10 à 100 fois plus d'évolutivité en fonction de la transaction. Ce nombre augmentera encore plus avec l'introduction de [chaînes de fragments](/upgrades/sharding) puisque plus de données seront disponibles si une transaction est contestée.

### Contestation des transactions {#disputing-transactions}

Les rollups optimisés ne calculent pas la transaction ; il faut donc implémenter un mécanisme pour garantir que les transactions sont légitimes et non frauduleuses. C'est là que des preuves de fraude entrent en jeu. Si quelqu'un remarque une opération frauduleuse, le rollup exécute une preuve de fraude et effectue le calcul de la transaction en utilisant les données d'état disponibles. Cela signifie que le délai d'attente pour confirmer une transaction peut être plus allongé avec ce type de rollup plutôt qu'avec un rollup ZK, car la transaction peut être contestée.

![Diagramme montrant ce qui se passe lorsqu'une transaction frauduleuse se produit dans un rollup optimisé sur Ethereum](./optimistic-rollups.png)

Le gaz nécessaire pour effectuer le calcul de la preuve de fraude est remboursé. Chez Optimism, Ben Jones décrit le système de garantie en place :

"_Toute personne susceptible d'effectuer une action que vous devriez prouver frauduleuse pour garantir vos fonds, nécessite le versement d'une caution. Pour résumer, vous bloquez quelques ETH et dites « Je promets de dire la vérité. Si je ne dis pas la vérité et que la fraude est prouvée, je perdrai cet argent. Une partie sera réduite et le reste servira à payer le gaz que les gens ont dépensé pour prouver la fraude_ »

Vous pouvez donc voir les incitations : les participants sont pénalisés pour avoir commis une fraude et remboursés pour avoir prouvé la fraude.

### Avantages et inconvénients {#optimistic-pros-and-cons}

| Avantages                                                                                                                                                 | Inconvénients                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Tout ce que vous pouvez faire sur la couche Ethereum 1, vous pouvez le faire avec les rollups optimisés, car ils sont compatibles avec l'EVM et Solidity. | Longs délais d'attente pour les transactions en chaîne en raison de potentiels problèmes de fraude. |
| Toutes les données de transaction étant stockées sur la chaîne de la couche 1, elles sont donc sécurisées et décentralisées.                              | Un opérateur peut influencer l'ordre des transactions.                                              |

### Une explication visuelle des rollups optimisés {#optimistic-video}

Regardez Finematics expliquer les rollups optimisés :

<YouTube id="7pWxCklcNsU" start="263" />

### Utiliser des Rollups optimisés {#use-optimistic-rollups}

Plusieurs implémentations de Rollups optimisés existent, que vous pouvez intégrer dans vos dApps :

<RollupProductDevDoc rollupType="optimistic" />

**Lecture à propos des rollups optimisés**

- [Tout ce que vous devez savoir sur les rollups optimisés](https://research.paradigm.xyz/rollups)
- [EthHub sur rollups optimisés](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/optimistic_rollups/)
- [Le guide essentiel pour Arbitrum](https://newsletter.banklesshq.com/p/the-essential-guide-to-arbitrum)
- [Comment fonctionne réellement le rollup d'Optimism ?](https://research.paradigm.xyz/optimism)
- [OVM Deep Dive](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
