---
title: Évolutivité
description: Introduction aux différentes options pour le passage à l'échelle actuellement en cours de développement par la communauté Ethereum.
lang: fr
sidebarDepth: 3
---

## Aperçu de la mise à l'échelle {#scaling-overview}

Le nombre grandissant d'utilisateurs d'Ethereum révèle certaines limites de capacité de la blockchain. Cela a augmenté le coût de l'utilisation du réseau, impliquant le besoin de « solutions d'évolutivité ». De nombreuses solutions ont été étudiées, testées et mises en œuvre qui adoptent différentes approches pour atteindre des objectifs similaires.

L'objectif principal de l'évolutivité est d'augmenter la vitesse de transaction (finalisation plus rapide) et le débit de la transaction (nombre élevé de transactions par seconde), sans sacrifier la décentralisation ou la sécurité (en savoir plus sur la [vision Ethereum](/upgrades/vision/)). Sur la blockchain Ethereum de la couche 1, une forte demande entraîne un ralentissement des transactions et des prix de [gaz](/developers/docs/gas/) non viables. L'augmentation de la capacité du réseau en termes de vitesse et de débit est fondamentale pour l'adoption significative et massive d'Ethereum.

Bien que la vitesse et le débit soient importants, il est essentiel que les solutions de mise à l'échelle permettent d'atteindre ces objectifs en restant décentralisées et sécurisées. Le maintien d'une faible barrière d'entrée pour les opérateurs de nœuds est essentiel pour empêcher une progression vers une puissance informatique centralisée et peu sûre.

Conceptuellement, nous catégorisons d'abord l'évolutivité en chaîne puis celle hors chaîne.

## Pré-requis {#prerequisites}

Vous devez avoir une bonne compréhension de tous les sujets fondamentaux. La mise en œuvre de solutions d'évolutivité est avancée, car la technologie est moins éprouvée et continue d'être étudiée et développée.

## Mise à l’échelle de la chaîne {#on-chain-scaling}

Cette méthode de mise à l’échelle nécessite des modifications du protocole Ethereum (couche 1 [Réseau principal](/glossary/#mainnet)). La fragmentation est actuellement l’objectif principal de cette méthode de mise à l’échelle.

### Fragmentation {#sharding}

La fragmentation est le processus de fractionnement horizontal d'une base de données pour répartir la charge. Dans le cadre d'Ethereum, cette fragmentation permettra de réduire l'encombrement du réseau en augmentant le nombre de transactions par seconde grâce à la création de nouvelles chaînes, appelées « fragments ». Cela allègera également la charge pour chaque validateur qui ne sera plus tenu de traiter l’intégralité de toutes les transactions sur le réseau.

En savoir plus sur [la fragmentation](/upgrades/sharding/).

## Mise à l'echelle hors de la chaîne {#off-chain-scaling}

Les solutions hors chaîne sont implémentées séparément du réseau principal de couche 1 - elles ne nécessitent aucune modification du protocole Ethereum existant. Certaines solutions, connues sous le nom de solutions de « couche 2 », tirent leur sécurité directement du consensus Ethereum de la couche 1, telles que [des rollups optimistes](/developers/docs/scaling/optimistic-rollups/), [des rollups zk](/developers/docs/scaling/zk-rollups/) ou [des canaux d'état](/developers/docs/scaling/state-channels/). D’autres solutions impliquent la création de nouvelles chaînes sous diverses formes qui tirent leur sécurité séparément du réseau principal, telles que des [chaînes latérales](#sidechains) ou [des chaînes plasma](#plasma). Ces solutions communiquent avec le réseau principal, mais tirent leur sécurité différemment pour atteindre une variété d’objectifs.

### Évolutivité vers la couche 2 {#layer-2-scaling}

Cette catégorie de solutions hors chaîne tire sa sécurité du réseau principal Ethereum.

La couche 2 est un terme collectif désignant les solutions conçues pour aider à faire évoluer votre application en gérant les transactions en dehors du réseau principal Ethereum (couche 1) tout en tirant parti du modèle robuste de sécurité décentralisé du réseau principal. La vitesse des transactions est réduite lorsque le réseau est occupé, ce qui rend l’expérience utilisateur médiocre pour certains types de dapps. Et plus le réseau est fréquenté, plus le prix du gaz augmente, car les expéditeurs de transactions cherchent à surenchérir. Cela peut rendre l'utilisation d'Ethereum très onéreuse.

La plupart des solutions de la couche 2 sont centrées autour d'un serveur ou d'un groupe de serveurs, chacun pouvant être appelé nœud, validateur, opérateur, séquenceur, producteur de blocs ou un terme similaire. Selon l’implémentation, ces nœuds de couche 2 peuvent être gérés par les individus, les entreprises ou les entités qui les utilisent, ou par un opérateur tiers, ou par un large groupe de personnes (similaire au réseau principal). D’une manière générale, les transactions sont soumises à ces nœuds de couche 2 au lieu d’être soumises directement à la couche 1 (Mainnet). Pour certaines solutions, l’instance de couche 2 les regroupe ensuite en groupes avant de les ancrer à la couche 1, après quoi elles sont sécurisées par la couche 1 et ne peuvent pas être modifiées. La façon détaillée dont cela se réalise varie considérablement entre les différentes technologies et implémentations de la couche 2.

Une instance spécifique de couche 2 peut être soit ouverte et partagée par de nombreuses applications, soit déployée par un seul projet et uniquement dédiée à la prise en charge de ses applications.

#### Pourquoi la couche 2 est-elle nécessaire ? {#why-is-layer-2-needed}

- L’augmentation du nombre de transactions par seconde améliore considérablement l’expérience utilisateur et réduit la congestion du réseau sur le réseau principal d'Ethereum.
- Les transactions sont regroupées en une seule transaction vers le réseau principal d'Ethereum, ce qui réduit les frais de gaz pour les utilisateurs, rendant ainsi Ethereum plus inclusif et accessible aux gens du monde entier.
- Toute mise à jour d'évolutivité ne devrait pas se faire au détriment de la décentralisation ou de la sécurité. La couche 2 s'appuie sur Ethereum.
- Il existe des réseaux de couche 2 spécifiques à une application qui apportent leur propre ensemble de gains d'efficacité lorsqu’ils travaillent avec des actifs à grande échelle.

#### Rollups {#rollups}

Les rollups exécutent des transactions en dehors de la couche 1, puis les données sont publiées dans la couche 1 où un consensus est atteint. Comme les données de transaction sont incluses dans les blocs de couche 1, cela permet aux cumuls d’être sécurisés par la sécurité native d’Ethereum.

Il existe deux types de rollups avec différents modèles de sécurité :

- **Rollups optimistes** : suppose que les transactions sont valides par défaut et n’exécute que le calcul, via une [**preuve de fraude**](/glossary/#fraud-proof), en cas de contestation. [Plus d'infos sur les rollups optimistes](/developers/docs/scaling/optimistic-rollups/).
- **Rollups ZK** : exécute le calcul hors chaîne et soumet une [**preuve de validité**](/glossary/#validity-proof) à la chaîne. [Plus d'infos sur les rollups ZK](/developers/docs/scaling/zk-rollups/).

#### Canaux d'état {#channels}

Les canaux d'état utilisent des contrats multisig pour permettre aux participants d’effectuer des transactions rapidement et librement hors chaîne, puis de régler la finalisation sur le réseau principal. Cela minimise la congestion du réseau, les frais et les retards. Il existe actuellement deux types de canaux : les canaux d'état et les canaux de paiement.

En savoir plus sur les [canaux d'état](/developers/docs/scaling/state-channels/).

### Chaines latérales {#sidechains}

Une chaîne latérale est une blockchain indépendante compatible EVM qui fonctionne en parallèle avec le réseau principal. Ceux-ci sont compatibles avec Ethereum via des ponts bidirectionnels et fonctionnent selon leurs propres règles de consensus choisies et paramètres de bloc.

En savoir plus sur les [chaînes latérales](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Une chaîne plasma est une blockchain séparée qui est ancrée à la chaîne Ethereum principale et qui utilise des preuves de fraude (comme les [rollups optimistes](/developers/docs/scaling/optimistic-rollups/)) pour arbitrer les litiges.

En savoir plus sur [Plasma](/developers/docs/scaling/plasma/).

### Validium {#validium}

Une chaîne Validium utilise des preuves de validité comme des rollups ZK, mais les données ne sont pas stockées sur la chaîne Ethereum de la couche principale 1. Cela peut permettre jusqu'à 10 000 transactions par seconde par chaîne Validium, et plusieurs chaînes peuvent être exécutées en parallèle.

En savoir plus sur [Validium](/developers/docs/scaling/validium/).

## Pourquoi tant de solutions de mise à l'échelle sont-elles nécessaires ? {#why-do-we-need-these}

- Plusieurs solutions peuvent aider à réduire la congestion globale sur une partie du réseau et à prévenir les points de défaillance uniques.
- Le tout est plus grand que la somme de ses parties. Différentes solutions peuvent exister et fonctionner en harmonie, permettant un effet exponentiel sur la vitesse et le débit des transactions futures.
- Toutes les solutions ne nécessitent pas d’utiliser directement l’algorithme de consensus Ethereum, et les alternatives peuvent offrir des avantages qui seraient autrement difficiles à obtenir.
- Aucune solution de mise à l'échelle n'est suffisante pour réaliser la [vision Ethereum](/upgrades/vision/).

## Davantage qu'un apprenant visuel ? {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_Notez que l’explication dans la vidéo utilise le terme « niveau 2 » pour désigner toutes les solutions de mise à l'échelle hors chaîne, tandis que nous différencions le « niveau 2 » en tant que solution hors chaîne qui tire sa sécurité du consensus du réseau principal de niveau 1._

<YouTube id="7pWxCklcNsU" />

## Complément d'information {#further-reading}

- [Une feuille de route Ethereum centrée sur le rollup](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Analytiques à jour sur les solutions de mise à l'échelle de la couche 2 pour Ethereum](https://www.l2beat.com/)
- [Évaluation des solutions de mise à l'échelle de la couche 2 d'Ethereum : Un cadre de comparaison](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Un guide incomplet pour les rollups](https://vitalik.ca/general/2021/01/05/rollup.html)
- [Rollups ZK alimentés par Ethereum : Wolrd Beaters](https://hackmd.io/@canti/rkUT0BD8K)
- [Rollups optimisés vs Rollups ZK](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Évolutivité de la blockchain ZK](https://ethworks.io/assets/download/zero-knowledge-blockchain-scaling-ethworks.pdf)
- [Pourquoi les rollups + les data shards sont les seules solutions durables pour une grande évolutivité](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_
