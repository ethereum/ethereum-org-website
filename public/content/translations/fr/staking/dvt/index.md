---
title: Technologie de validateur distribué
description: La technologie de validateur distribué permet l'exploitation distribuée d'un validateur Ethereum par plusieurs parties.
lang: fr
---

La technologie de validateur distribué (DVT) est une approche de la sécurité des validateurs qui répartit la gestion des clés et les responsabilités de signature entre plusieurs parties, afin de réduire les points de défaillance uniques et d'augmenter la résilience des validateurs.

Elle y parvient en **divisant la clé privée** utilisée pour sécuriser un validateur **sur plusieurs ordinateurs** organisés en un « cluster » (grappe). L'avantage est qu'il devient très difficile pour les attaquants d'accéder à la clé, car elle n'est stockée dans son intégralité sur aucune machine individuelle. Cela permet également à certains nœuds de se déconnecter, car la signature nécessaire peut être effectuée par un sous-ensemble des machines de chaque cluster. Cela réduit les points de défaillance uniques du réseau et rend l'ensemble des validateurs plus robuste.

![A Diagram showing how a single validator key is split into key shares and distributed to multiple nodes with varying components.](./dvt-cluster.png)

## Pourquoi avons-nous besoin de la DVT ? {#why-do-we-need-dvt}

### Sécurité {#security}

Les validateurs génèrent deux paires de clés publique-privée : des clés de validateur pour participer au consensus et des clés de retrait pour accéder aux fonds. Bien que les validateurs puissent sécuriser les clés de retrait dans un stockage à froid (cold storage), les clés privées de validateur doivent être en ligne 24h/24 et 7j/7. Si une clé privée de validateur est compromise, un attaquant peut contrôler le validateur, ce qui peut entraîner une réduction (slashing) ou la perte des ETH du staker. La DVT peut aider à atténuer ce risque. Voici comment :

En utilisant la DVT, les stakers peuvent participer au staking tout en conservant la clé privée de validateur dans un stockage à froid. Cela est réalisé en chiffrant la clé de validateur complète d'origine, puis en la divisant en parts de clé. Les parts de clé restent en ligne et sont distribuées à plusieurs nœuds qui permettent l'exploitation distribuée du validateur. Cela est possible car les validateurs [Ethereum](/) utilisent des signatures BLS qui sont additives, ce qui signifie que la clé complète peut être reconstruite en additionnant ses parties composantes. Cela permet au staker de conserver la clé de validateur « maître » complète et originale hors ligne en toute sécurité.

### Aucun point de défaillance unique {#no-single-point-of-failure}

Lorsqu'un validateur est divisé entre plusieurs opérateurs et plusieurs machines, il peut résister à des pannes matérielles et logicielles individuelles sans se déconnecter. Le risque de pannes peut également être réduit en utilisant diverses configurations matérielles et logicielles sur les nœuds d'un cluster. Cette résilience n'est pas disponible pour les configurations de validateur à nœud unique - elle provient de la couche DVT.

Si l'un des composants d'une machine dans un cluster tombe en panne (par exemple, s'il y a quatre opérateurs dans un cluster de validateurs et que l'un d'eux utilise un client spécifique qui a un bug), les autres s'assurent que le validateur continue de fonctionner.

### Décentralisation {#decentralization}

Le scénario idéal pour Ethereum est d'avoir autant de validateurs exploités indépendamment que possible. Cependant, quelques fournisseurs de staking sont devenus très populaires et représentent une part substantielle du total des ETH stakés sur le réseau. La DVT peut permettre à ces opérateurs d'exister tout en préservant la décentralisation de la mise. Cela s'explique par le fait que les clés de chaque validateur sont distribuées sur de nombreuses machines et qu'il faudrait une collusion beaucoup plus importante pour qu'un validateur devienne malveillant.

Sans la DVT, il est plus facile pour les fournisseurs de staking de ne prendre en charge qu'une ou deux configurations de clients pour tous leurs validateurs, ce qui augmente l'impact d'un bug client. La DVT peut être utilisée pour répartir le risque sur plusieurs configurations de clients et différents matériels, créant ainsi une résilience grâce à la diversité.

**La DVT offre les avantages suivants à Ethereum :**

1. **Décentralisation** du consensus de preuve d'enjeu (PoS) d'Ethereum
2. Assure la **vivacité** (liveness) du réseau
3. Crée une **tolérance aux pannes** des validateurs
4. Exploitation des validateurs à **confiance minimisée**
5. Risques de **réduction** et de temps d'arrêt minimisés
6. **Améliore la diversité** (client, centre de données, emplacement, réglementation, etc.)
7. **Sécurité renforcée** de la gestion des clés de validateur

## Comment fonctionne la DVT ? {#how-does-dvt-work}

Une solution DVT contient les composants suivants :

- **[Partage de secret de Shamir](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Les validateurs utilisent des [clés BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). Les « parts de clé » BLS individuelles peuvent être combinées en une seule clé agrégée (signature). Dans la DVT, la clé privée d'un validateur est la signature BLS combinée de chaque opérateur du cluster.
- **[Schéma de signature à seuil](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Détermine le nombre de parts de clé individuelles requises pour les tâches de signature, par exemple, 3 sur 4.
- **[Génération de clé distribuée (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Processus cryptographique qui génère les parts de clé et est utilisé pour distribuer les parts d'une clé de validateur existante ou nouvelle aux nœuds d'un cluster.
- **[Calcul multiparti (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - La clé de validateur complète est générée en secret à l'aide du calcul multiparti. La clé complète n'est jamais connue d'aucun opérateur individuel — ils ne connaissent que leur propre partie (leur « part »).
- **Protocole de consensus** - Le protocole de consensus sélectionne un nœud pour être le proposeur de bloc. Il partage le bloc avec les autres nœuds du cluster, qui ajoutent leurs parts de clé à la signature agrégée. Lorsque suffisamment de parts de clé ont été agrégées, le bloc est proposé sur Ethereum.

Les validateurs distribués ont une tolérance aux pannes intégrée et peuvent continuer à fonctionner même si certains des nœuds individuels se déconnectent. Cela signifie que le cluster est résilient même si certains des nœuds qui le composent s'avèrent malveillants ou inactifs.

## Cas d'utilisation de la DVT {#dvt-use-cases}

La DVT a des implications importantes pour l'industrie plus large du staking :

### Stakers solo {#solo-stakers}

La DVT permet également le staking non dépositaire en vous permettant de distribuer votre clé de validateur sur des nœuds distants tout en gardant la clé complète complètement hors ligne. Cela signifie que les stakers à domicile n'ont pas nécessairement besoin d'investir dans du matériel, tandis que la distribution des parts de clé peut aider à les renforcer contre les piratages potentiels.

### Staking en tant que service (SaaS) {#saas}

Les opérateurs (tels que les pools de staking et les stakers institutionnels) gérant de nombreux validateurs peuvent utiliser la DVT pour réduire leurs risques. En distribuant leur infrastructure, ils peuvent ajouter de la redondance à leurs opérations et diversifier les types de matériel qu'ils utilisent.

La DVT partage la responsabilité de la gestion des clés entre plusieurs nœuds, ce qui signifie que certains coûts opérationnels peuvent également être partagés. La DVT peut également réduire les risques opérationnels et les coûts d'assurance pour les fournisseurs de staking.

### Pools de staking {#staking-pools}

En raison des configurations standard des validateurs, les pools de staking et les fournisseurs de staking liquide sont contraints d'avoir des niveaux variables de confiance envers un opérateur unique, car les gains et les pertes sont socialisés dans l'ensemble du pool. Ils dépendent également des opérateurs pour protéger les clés de signature car, jusqu'à présent, il n'y avait pas d'autre option pour eux.

Même si traditionnellement des efforts sont faits pour répartir les risques en distribuant les mises entre plusieurs opérateurs, chaque opérateur gère toujours une mise importante de manière indépendante. S'en remettre à un seul opérateur pose d'immenses risques s'il sous-performe, rencontre des temps d'arrêt, est compromis ou agit de manière malveillante.

En tirant parti de la DVT, la confiance requise de la part des opérateurs est considérablement réduite. **Les pools peuvent permettre aux opérateurs de détenir des mises sans avoir besoin de la garde des clés de validateur** (car seules les parts de clé sont utilisées). Cela permet également de distribuer les mises gérées entre un plus grand nombre d'opérateurs (par exemple, au lieu d'avoir un seul opérateur gérant 1000 validateurs, la DVT permet à ces validateurs d'être exploités collectivement par plusieurs opérateurs). Des configurations d'opérateurs diverses garantiront que si un opérateur tombe en panne, les autres seront toujours en mesure d'attester. Il en résulte une redondance et une diversification qui conduisent à de meilleures performances et à une plus grande résilience, tout en maximisant les récompenses.

Un autre avantage de la minimisation de la confiance envers un opérateur unique est que les pools de staking peuvent permettre une participation des opérateurs plus ouverte et sans permission. Ce faisant, les services peuvent réduire leurs risques et soutenir la décentralisation d'Ethereum en utilisant à la fois des ensembles d'opérateurs sélectionnés et sans permission, par exemple, en associant des stakers à domicile ou plus petits à des stakers plus importants.

## Inconvénients potentiels de l'utilisation de la DVT {#potential-drawbacks-of-using-dvt}

- **Composant supplémentaire** - l'introduction d'un nœud DVT ajoute une autre partie qui peut potentiellement être défaillante ou vulnérable. Une façon d'atténuer cela est de s'efforcer d'avoir plusieurs implémentations d'un nœud DVT, c'est-à-dire plusieurs clients DVT (de la même manière qu'il existe plusieurs clients pour les couches de consensus et d'exécution).
- **Coûts opérationnels** - comme la DVT distribue le validateur entre plusieurs parties, il faut plus de nœuds pour le fonctionnement au lieu d'un seul nœud, ce qui entraîne une augmentation des coûts d'exploitation.
- **Latence potentiellement accrue** - puisque la DVT utilise un protocole de consensus pour parvenir à un consensus entre les multiples nœuds exploitant un validateur, elle peut potentiellement introduire une latence accrue.

## Complément d'information {#further-reading}

- [Spécifications des validateurs distribués Ethereum (haut niveau)](https://github.com/ethereum/distributed-validator-specs)
- [Spécifications techniques des validateurs distribués Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Application de démonstration du partage de secret de Shamir](https://iancoleman.io/shamir/)