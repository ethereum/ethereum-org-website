---
title: "Mise à l'échelle"
description: "Une introduction aux différentes options de mise à l'échelle actuellement développées par la communauté Ethereum."
lang: fr
sidebarDepth: 3
---

## Aperçu de la mise à l'échelle {#scaling-overview}

À mesure que le nombre de personnes utilisant [Ethereum](/) a augmenté, la chaîne de blocs a atteint certaines limites de capacité. Cela a fait grimper le coût d'utilisation du réseau, créant le besoin de « solutions de mise à l'échelle ». De multiples solutions sont en cours de recherche, de test et de mise en œuvre, adoptant différentes approches pour atteindre des objectifs similaires.

L'objectif principal de la scalabilité est d'augmenter la vitesse des transactions (une finalité plus rapide) et le débit des transactions (un plus grand nombre de transactions par seconde) sans sacrifier la décentralisation ni la sécurité. Sur la chaîne de blocs Ethereum de couche 1 (l1), une forte demande entraîne des transactions plus lentes et des [prix du gaz](/developers/docs/gas/) non viables. L'augmentation de la capacité du réseau en termes de vitesse et de débit est fondamentale pour une adoption massive et significative d'Ethereum.

Bien que la vitesse et le débit soient importants, il est essentiel que les solutions de mise à l'échelle permettant d'atteindre ces objectifs restent décentralisées et sécurisées. Maintenir une barrière à l'entrée basse pour les opérateurs de nœuds est essentiel pour éviter une progression vers une puissance de calcul centralisée et non sécurisée.

Conceptuellement, nous classons d'abord la mise à l'échelle en deux catégories : la mise à l'échelle onchain et la mise à l'échelle hors chaîne.

## Prérequis {#prerequisites}

Vous devriez avoir une bonne compréhension de tous les sujets fondamentaux. La mise en œuvre de solutions de mise à l'échelle est un sujet avancé, car la technologie a été moins éprouvée sur le terrain et continue de faire l'objet de recherches et de développements.

## Mise à l'échelle onchain {#onchain-scaling}

La mise à l'échelle onchain nécessite des modifications du protocole Ethereum (le [Réseau principal](/glossary/#mainnet) de couche 1 (l1)). Pendant longtemps, on s'attendait à ce que le partitionnement (sharding) de la chaîne de blocs permette la mise à l'échelle d'Ethereum. Cela devait impliquer de diviser la chaîne de blocs en morceaux distincts (fragments) devant être vérifiés par des sous-ensembles de validateurs. Cependant, la mise à l'échelle par les rollups de couche 2 (l2) a pris le relais en tant que technique principale de mise à l'échelle. Ceci est soutenu par l'ajout d'une nouvelle forme de données moins chère attachée aux blocs Ethereum, spécialement conçue pour rendre les rollups peu coûteux pour les utilisateurs.

### Partitionnement (Sharding) {#sharding}

Le partitionnement (sharding) est le processus de division d'une base de données. Des sous-ensembles de validateurs seraient responsables de fragments individuels plutôt que de garder une trace de l'ensemble d'Ethereum. Le partitionnement a longtemps figuré sur la [feuille de route](/roadmap/) d'Ethereum, et devait autrefois être déployé avant La Fusion vers la preuve d'enjeu (PoS). Cependant, le développement rapide des [rollups de couche 2 (l2)](#layer-2-scaling) et l'invention du [danksharding](/roadmap/danksharding) (l'ajout de blobs de données de rollup aux blocs Ethereum qui peuvent être vérifiés très efficacement par les validateurs) ont conduit la communauté Ethereum à privilégier une mise à l'échelle centrée sur les rollups plutôt qu'une mise à l'échelle par partitionnement. Cela contribuera également à garder la logique de consensus d'Ethereum plus simple.

## Mise à l'échelle hors chaîne {#offchain-scaling}

Les solutions hors chaîne sont mises en œuvre séparément du Réseau principal de couche 1 (l1) - elles ne nécessitent aucune modification du protocole Ethereum existant. Certaines solutions, connues sous le nom de solutions de « couche 2 (l2) », tirent leur sécurité directement du consensus Ethereum de couche 1 (l1), comme les [rollups optimistes](/developers/docs/scaling/optimistic-rollups/), les [rollups à divulgation nulle de connaissance](/developers/docs/scaling/zk-rollups/) ou les [canaux d'état](/developers/docs/scaling/state-channels/). D'autres solutions impliquent la création de nouvelles chaînes sous diverses formes qui tirent leur sécurité séparément du Réseau principal, telles que les [chaînes latérales](#sidechains), les [validiums](#validium) ou les [chaînes Plasma](#plasma). Ces solutions communiquent avec le Réseau principal mais tirent leur sécurité différemment pour atteindre divers objectifs.

### Mise à l'échelle de couche 2 (l2) {#layer-2-scaling}

Cette catégorie de solutions hors chaîne tire sa sécurité du réseau principal Ethereum.

La couche 2 (l2) est un terme collectif désignant les solutions conçues pour aider à mettre à l'échelle votre application en traitant les transactions en dehors du réseau principal Ethereum (couche 1 (l1)) tout en tirant parti du modèle de sécurité décentralisé et robuste du Réseau principal. La vitesse des transactions en pâtit lorsque le réseau est encombré, ce qui rend l'expérience utilisateur médiocre pour certains types d'applications décentralisées (dapps). Et à mesure que le réseau devient plus encombré, les prix du gaz augmentent car les expéditeurs de transactions cherchent à surenchérir les uns sur les autres. Cela peut rendre l'utilisation d'Ethereum très coûteuse.

La plupart des solutions de couche 2 (l2) sont centrées autour d'un serveur ou d'un groupe de serveurs, dont chacun peut être appelé nœud, validateur, opérateur, séquenceur, producteur de blocs ou un terme similaire. Selon l'implémentation, ces nœuds de couche 2 (l2) peuvent être gérés par les individus, les entreprises ou les entités qui les utilisent, ou par un opérateur tiers, ou par un grand groupe d'individus (similaire au Réseau principal). En règle générale, les transactions sont soumises à ces nœuds de couche 2 (l2) au lieu d'être soumises directement à la couche 1 (l1) (Réseau principal). Pour certaines solutions, l'instance de couche 2 (l2) les regroupe ensuite en lots avant de les ancrer à la couche 1 (l1), après quoi elles sont sécurisées par la couche 1 (l1) et ne peuvent plus être modifiées. Les détails de la façon dont cela est fait varient considérablement entre les différentes technologies et implémentations de couche 2 (l2).

Une instance spécifique de couche 2 (l2) peut être ouverte et partagée par de nombreuses applications, ou peut être déployée par un seul projet et dédiée à la prise en charge exclusive de son application.

#### Pourquoi la couche 2 (l2) est-elle nécessaire ? {#why-is-layer-2-needed}

- L'augmentation des transactions par seconde améliore grandement l'expérience utilisateur et réduit la congestion du réseau sur le réseau principal Ethereum.
- Les transactions sont regroupées (rolled up) en une seule transaction vers le réseau principal Ethereum, ce qui réduit les frais de gaz pour les utilisateurs et rend Ethereum plus inclusif et accessible aux personnes du monde entier.
- Toute mise à jour de la scalabilité ne doit pas se faire au détriment de la décentralisation ou de la sécurité – la couche 2 (l2) s'appuie sur Ethereum.
- Il existe des réseaux de couche 2 (l2) spécifiques à des applications qui apportent leur propre ensemble d'efficacités lors du travail avec des actifs à grande échelle.

[En savoir plus sur la couche 2 (l2)](/layer-2/).

#### Rollups {#rollups}

Les rollups exécutent les transactions en dehors de la couche 1 (l1), puis les données sont publiées sur la couche 1 (l1) où le consensus est atteint. Comme les données de transaction sont incluses dans les blocs de la couche 1 (l1), cela permet aux rollups d'être sécurisés par la sécurité native d'Ethereum.

Il existe deux types de rollups avec des modèles de sécurité différents :

- **Rollups optimistes** : supposent que les transactions sont valides par défaut et n'exécutent le calcul, via une [**preuve de fraude**](/glossary/#fraud-proof), qu'en cas de contestation. [En savoir plus sur les rollups optimistes](/developers/docs/scaling/optimistic-rollups/).
- **Rollups à divulgation nulle de connaissance** : exécutent les calculs hors chaîne et soumettent une [**preuve de validité**](/glossary/#validity-proof) à la chaîne. [En savoir plus sur les rollups à divulgation nulle de connaissance](/developers/docs/scaling/zk-rollups/).

#### Canaux d'état {#channels}

Les canaux d'état utilisent des contrats multisig pour permettre aux participants d'effectuer des transactions rapidement et librement hors chaîne, puis de régler la finalité avec le Réseau principal. Cela minimise la congestion du réseau, les frais et les délais. Les deux types de canaux sont actuellement les canaux d'état et les canaux de paiement.

En savoir plus sur les [canaux d'état](/developers/docs/scaling/state-channels/).

### Chaînes latérales {#sidechains}

Une chaîne latérale est une chaîne de blocs indépendante compatible avec l'EVM qui fonctionne en parallèle du Réseau principal. Elles sont compatibles avec Ethereum via des ponts bidirectionnels et fonctionnent selon leurs propres règles de consensus et paramètres de bloc choisis.

En savoir plus sur les [chaînes latérales](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Une chaîne Plasma est une chaîne de blocs distincte qui est ancrée à la chaîne Ethereum principale et utilise des preuves de fraude (comme les [rollups optimistes](/developers/docs/scaling/optimistic-rollups/)) pour arbitrer les litiges.

En savoir plus sur [Plasma](/developers/docs/scaling/plasma/).

### Validium {#validium}

Une chaîne validium utilise des preuves de validité comme les rollups à divulgation nulle de connaissance, mais les données ne sont pas stockées sur la chaîne Ethereum principale de couche 1 (l1). Cela peut conduire à 10 000 transactions par seconde par chaîne validium et plusieurs chaînes peuvent être exécutées en parallèle.

En savoir plus sur le [validium](/developers/docs/scaling/validium/).

## Pourquoi tant de solutions de mise à l'échelle sont-elles nécessaires ? {#why-do-we-need-these}

- De multiples solutions peuvent aider à réduire la congestion globale sur n'importe quelle partie du réseau et également prévenir les points de défaillance uniques.
- Le tout est plus grand que la somme de ses parties. Différentes solutions peuvent exister et fonctionner en harmonie, permettant un effet exponentiel sur la vitesse et le débit futurs des transactions.
- Toutes les solutions ne nécessitent pas d'utiliser directement l'algorithme de consensus d'Ethereum, et les alternatives peuvent offrir des avantages qui seraient autrement difficiles à obtenir.

## Vous préférez un support visuel ? {#visual-learner}

<VideoWatch slug="layer-2-scaling-explained" />

_Notez que l'explication dans la vidéo utilise le terme « Couche 2 » pour désigner toutes les solutions de mise à l'échelle hors chaîne, tandis que nous différencions la « couche 2 (l2) » comme une solution hors chaîne qui tire sa sécurité du consensus du Réseau principal de couche 1 (l1)._

<VideoWatch slug="rollups-scaling-strategy" />

## Complément d'information {#further-reading}

- [Une feuille de route Ethereum centrée sur les rollups](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Analyses à jour sur les solutions de mise à l'échelle de couche 2 (l2) pour Ethereum](https://www.l2beat.com/)
- [Évaluation des solutions de mise à l'échelle de couche 2 (l2) d'Ethereum : un cadre de comparaison](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Un guide incomplet sur les rollups](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [Les ZK-Rollups propulsés par Ethereum : les meilleurs au monde](https://hackmd.io/@canti/rkUT0BD8K)
- [Rollups optimistes vs ZK Rollups](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Pourquoi les rollups + les fragments de données sont la seule solution durable pour une haute scalabilité](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [Quel type de couche 3 a du sens ?](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [Disponibilité des données ou : comment les rollups ont appris à ne plus s'inquiéter et à aimer Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [Le guide pratique des rollups Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)

_Vous connaissez une ressource communautaire qui vous a aidé ? Modifiez cette page et ajoutez-la !_

## Tutoriels : Construire des couches 2 (l2) scalables sur Ethereum {#tutorials}

- [Tout ce que vous pouvez mettre en cache](/developers/tutorials/all-you-can-cache/) _– Comment construire et utiliser un contrat de mise en cache pour réduire les coûts des données d'appel (calldata) sur les rollups._
- [ABI courtes pour l'optimisation des données d'appel (calldata)](/developers/tutorials/short-abi/) _– Comment utiliser des ABI plus courtes pour réduire les coûts des données d'appel pour les transactions de couche 2 (l2)._