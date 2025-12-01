---
title: Ethereum à l’épreuve du temps
description: Ces mises à niveau consolident Ethereum en tant que couche de base résiliente et décentralisée pour l’avenir, quoi qu’elle réserve.
lang: fr
image: /images/roadmap/roadmap-future.png
alt: "Feuille de route d'Ethereum"
template: roadmap
---

Certaines parties de la feuille de route ne sont pas nécessairement requises pour faire évoluer ou sécuriser Ethereum à court terme, mais permettent à Ethereum d’assurer sa stabilité et sa fiabilité à long terme.

## Résistance quantique {#quantum-resistance}

Une partie de la sécurisation de la [cryptographie](/glossary/#cryptography) actuelle d'Ethereum sera compromise lorsque le calcul quantique deviendra une réalité. Bien que les ordinateurs quantiques soient probablement à des décennies de constituer une véritable menace pour la cryptographie moderne, Ethereum est construit pour être sécurisé pour les siècles à venir. Cela signifie rendre [Ethereum quantique résistant](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/) dès que possible.

Le défi auquel sont confrontés les développeurs d'Ethereum est que le protocole actuel de [preuve d'enjeu](/glossary/#pos) repose sur un système de signature très efficace connu sous le nom de BLS pour regrouper les votes sur les [blocs](/glossary/#block) valides. Ce schéma de signature est rompu par les ordinateurs quantiques, mais les alternatives de résistance quantique ne sont pas aussi efficaces.

Les [schémas d'engagement « KZG»](/roadmap/danksharding/#what-is-kzg) utilisés à plusieurs endroits à travers Ethereum pour générer des secrets cryptographiques sont connus pour être vulnérables. Actuellement, cela est contourné à l’aide de « configurations de confiance » (dont la principale cérémonie de configuration s’est achevée avec succès en 2023), au cours desquelles de nombreux utilisateurs ont généré des éléments aléatoires qui ne peuvent pas être rétro-construits par un ordinateur quantique. Cependant, la solution à long terme idéale serait plutôt d'intégrer une cryptographie quantique sûre. Il y a deux approches principales qui pourraient devenir des remplacements efficaces pour le schéma BLS : la signature [basée sur le STARK](https://hackmd.io/@vbuterin/stark_aggregation) et la signature [basée sur le treillis](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175). **Ils sont encore en cours de recherche et de prototype**.

[En savoir plus sur KZG et les configurations de confiance](/roadmap/danksharding#what-is-kzg)

## Ethereum plus simple et plus efficace {#simpler-more-efficient-ethereum}

La complexité crée des opportunités de bugs ou de vulnérabilités pouvant être exploitées par des attaquants. Par conséquent, une partie de la feuille de route simplifie Ethereum et supprime ou modifier le code qui a été mis à jour par diverses mises à jour, mais qui n'est plus nécessaire ou peut maintenant être amélioré. Un code plus léger et plus simple est plus facile à maintenir et à comprendre pour les développeurs.

Pour rendre la [Machine Virtuelle Ethereum (EVM)\](/developers/docs/evm) plus simple et plus efficace, des améliorations sont continuellement étudiées et mises en œuvre. Cela implique à la fois de traiter les composants hérités et d’introduire des optimisations.

**Modifications récentes mises en œuvre :**

- **Refonte du calcul du gas :** la méthode de calcul du [gaz](/glossary/#gas) a été considérablement améliorée avec la norme **EIP-1559 (implémentée dans la mise à niveau London, 2021)**, introduisant une commission de base et un mécanisme de destruction pour une tarification des transactions plus prévisible.
- **Restriction de `SELFDESTRUCT` :** L’opcode `SELFDESTRUCT`, bien que rarement utilisé, présentait des risques potentiels. Sa fonctionnalité a été fortement **restreinte lors de la mise à niveau Dencun (mars 2024) via l’EIP-6780** afin de réduire les risques, notamment en ce qui concerne la gestion de l’état.
- **Types de transactions modernisés :** De nouveaux formats de transactions ont été introduits (par exemple via **EIP-2718** et **EIP-4844** pour les blobs dans la mise à niveau Dencun) afin de prendre en charge de nouvelles fonctionnalités et d’améliorer l’efficacité par rapport aux anciens formats.

**Objectifs en cours et à venir :**

- **Gestion supplémentaire de `SELFDESTRUCT` :** Bien qu’il soit restreint, **le retrait complet potentiel** de l’opcode `SELFDESTRUCT` est encore envisagé pour de futures mises à niveau afin de simplifier davantage l’état de l’EVM. ([Plus de contexte sur les problèmes liés à SELFDESTRUCT](https://hackmd.io/@vbuterin/selfdestruct)).
- **Suppression progressive des anciens types de transaction :** Bien que les [clients Ethereum](/glossary/#consensus-client) prennent encore en charge les anciens types de transactions pour des raisons de compatibilité, l’objectif est d’encourager la migration vers les formats plus récents et de **potentiellement déprécier ou supprimer complètement la prise en charge des formats les plus anciens** à l’avenir.
- **Poursuite de la recherche sur l’efficacité du gas :** L’exploration se poursuit concernant **de nouveaux raffinements du calcul du gaz**, incluant potentiellement des concepts comme le gaz multidimensionnel pour mieux refléter l’utilisation des ressources.
- **Optimisation des opérations cryptographiques :** Des efforts sont en cours pour **introduire des méthodes plus efficaces pour l’arithmétique** qui sous-tend les opérations cryptographiques utilisées dans l’EVM.

De même, des mises à jour peuvent être apportées à d’autres parties des clients Ethereum actuels. Un exemple est que les clients d’exécution et de consensus actuels utilisent un type de compression de données différent. Il sera beaucoup plus facile et plus intuitif de partager des données entre les clients lorsque le schéma de compression sera unifié sur l’ensemble du réseau. Cela reste un domaine à explorer.

## Progrès actuels {#current-progress}

Bon nombre des mises à niveau à long terme visant à pérenniser le protocole, en particulier **la résistance complète aux ordinateurs quantiques pour les protocoles de base, sont encore en phase de recherche et pourraient ne pas être mises en œuvre avant plusieurs années**.

Cependant, **des avancées significatives ont déjà été réalisées dans les efforts de simplification.** Par exemple, des changements majeurs comme la **restriction de `SELFDESTRUCT` (EIP-6780)** et l’introduction des **transactions avec blobs (EIP-4844)** ont été mis en œuvre dans la **mise à niveau Dencun (mars 2024)**. Le travail sur l’harmonisation des schémas de compression des clients et d’autres améliorations d’efficacité se poursuit également.

**Complément d'information**

- [Gaz](/developers/docs/gas)
- [EVM](/developers/docs/evm)
- [Structures des données](/developers/docs/data-structures-and-encoding)