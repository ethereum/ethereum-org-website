---
title: Technologie de Validation Distribuée (DVT)
description: La technologie de validation distribuée (DVT) ou Distributed validator technology, permet le fonctionnement distribué d'un validateur Ethereum par plusieurs entités.
lang: fr
---

# Technologie de Validation Distribuée (DVT) {#distributed-validator-technology}

La Technologie de validation distribuée (DVT) est une approche à la sécurité des validateurs répartissant la gestion des clés et les responsabilités de signature multipartites, dans le but de réduire les points de défaillance uniques et d'augmenter la résilience des validateurs.

La DVT l'accomplit** en divisant la clé privée** utilisée pour sécuriser un validateur** parmi de nombreux ordinateurs** organisés en "cluster". Ce qui présente l'avantage de rendre très compliqué pour les commanditaires d'attaques de pouvoir accéder à la clé, celle-ci n'étant pas stockée intégralement sur une seule et même machine. Ça permet aussi à certains nœuds de se déconnecter, car la nécessité de signature peut être effectuée par un sous-ensemble des machines dans chaque cluster. Ce qui réduit également les points de défaillance uniques provenant du réseau et rend l'ensemble du groupe de validateurs bien plus robuste.

![Un schéma illustrant la façon dont une clé de validateur unique est divisée en fragments, puis distribuée à plusieurs nœuds ayant des composants variables.](./dvt-cluster.png)

## Pourquoi avons-nous besoin de la Technologie de validation distribuée (DVT) ? {#why-do-we-need-dvt}

### Sécurité {#security}

Les validateurs génèrent deux paires de clés publique-privée : les clés du validateur pour participer au consensus et les clés de retrait pour accéder aux fonds. Ainsi, alors que les validateurs sécurisent les clés de retrait dans un stockage à froid, les validateurs des clés privées doivent absolument rester en ligne 7j/7 et h24. Si la clé d'un validateur s'avère compromise, un attaquant peut alors prendre le contrôle du validateur en question, pouvant alors conduire à une sanction voire à la perte des ETH stackés (verrouillage d'actifs).  La Technologie DVT peut aider à amoindrir ce risque. Voici comment :

En utilisant la Technologie DVT, les validateurs peuvent participer au jalonnement tout en conservant la clé-privée-validateur dans un stockage à froid. Ce processus est établi en encryptant la clé originale complète d'un validateur puis divise cette dernière en parts de clé. Les fragments de clé demeurent en ligne et distribués par de multiples nœuds, ce qui permet le fonctionnement distribué du validateur. C'est possible car les validateurs Ethereum utilisent des signatures BLS qui sont additives, ce qui signifie que la clé entière peut être reconstituée en additionnant leurs composants. Ça permet au participant de maintenir hors-ligne et en toute sécurité, la clé de validation du master original.

### Zéro point de défaillance unique {#no-single-point-of-failure}

Lorsqu'un validateur est réparti parmi de multiples opérateurs et machines, il peut résister aux défaillances individuelles du matériel (hardware et logiciels) sans se déconnecter. Le risque de défaillances peut aussi être réduit en utilisant des configurations matérielles et logicielles diverses sur les nœuds d'un cluster. Cette résilience est indisponible aux configurations de validateurs à nœud simple - qui découle de la couche DVT.

Si l'un des composants d'une machine au sein d'un cluster tombe en panne (exemple : s'il y a quatre opérateurs dans un cluster de validateurs et que l'un d'eux utilise un client spécifique qui présente un bug), les autres veillent à ce que le validateur continue de fonctionner normalement.

### Décentralisation {#decentralization}

Le scénario idéal pour Ethereum est de posséder le plus grand nombre de validateurs opérables agissant de manière indépendante. Cependant, quelques fournisseurs d'actifs (ETH) sont devenus très populaires et représentent une part importante de la totalité d'ETH mis en enjeu sur le réseau.  La Technologie de validation distribuée (DVT) peut permettre à ses opérateurs d'exister tout en préservant un jalonnement décentralisé. Car les clés pour chaque validateur sont distribuées entre de nombreuses machines (ordinateurs), ce qui nécessiterait une bien plus grande collision pour qu'un validateur devienne malveillant.

Sans la Technologie DVT, il est plus facile pour les fournisseurs d'actifs de ne prendre en charge qu'une ou deux configurations client pour l'ensemble de leurs validateurs, accroissant ainsi l'impact d'un bug client. La technologie (DVT) peut être utilisée pour répandre le risque autour de multiples configurations client et différentes machines (hardware), créant une certaine résilience à travers le biais de la diversité.

**La technologie DVT offre à Ethereum les avantages suivants : **

1. **Décentralisation** du consensus à Preuve d'enjeu d'Ethereum
2. Assurer la** disponibilité continue** du réseau
3. Établir une tolérance aux défaillances validateur
4. **Confiance minime**de l'opération validateur
5. **Minimiser les risques** de sanctions et d'interruptions
6. **Améliorer la diversité**(client, centre de données, lieu, régulation, etc.)
7. **Renforcer la sécurité** du management des clés-validateur

## Comment fonctionne la Technologie de validation distribuée (DVT) ? {#how-does-dvt-work}

Une solution DVT contient les éléments suivants :

- **[Le partage secret de Shamir](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Validateurs utilisant [des clés BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). Les partages individuels de clés BLS (key shares) peuvent être combinés en une seule clé agrégée (signature). Dans la Technologie de validation distribuée (DVT), la clé privée d'un validateur est la combinaison de signatures BLS de chaque opérateur à l'intérieur du cluster.
- **Seuil du schéma de signature** - Détermine le nombre de partages de clés individuelles requis au sujet des droits de signature. Exemple : 3 sur 4.
- **Génération de clés distribuées (DKG)** - Processus cryptographique qui génère les partages de clé, puis utilisé à distribuer les partages d'une clé de validateur nouvelle ou déjà existante à l'endroit des nœuds d'un cluster.
- **[Calcul multipartite (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - L'intégralité de la clé du validateur est générée de manière confidentielle via l'apport d'un calcul multipartite sécurisé. L'intégralité de la clé n'est jamais connue par aucun opérateur individuel : chaque opérateur n'a connaissance que de son propre fragment de clé (leur "part").
- **Protocole de consensus** - Le protocole de consensus sélectionne un nœud qui deviendra le proposant de bloc. Ils partagent ledit bloc avec les autres nœuds du cluster, qui ajoutent leurs fragments de clé à la signature agrégée. Lorsque suffisamment de fragments de clé ont été agrégés, le bloc est proposé sur Ethereum.

Les validateurs distribués bénéficient d'une tolérance aux défaillances intégrées et peuvent continuer à fonctionner, et ce même, si certains des nœuds individuels demeurent hors-ligne. Il faut interpréter que le cluster est résistant, même si certains de ses nœuds s'avèrent être malveillants ou très peu actifs.

## Cas d'utilisation de la Technologie de Validation Distribuée (DVT) {#dvt-use-cases}

La DVT a des implications significatives pour l'ensemble de l'industrie du "staking" (verrouillage d'ETH dans le but de sécuriser la blockchain Ethereum) :

### Mise en enjeu individuelle {#solo-stakers}

La technologie DVT permet également une participation non-custodienne (staking), en vous autorisant à distribuer votre clé de validateur à travers des nœuds distants, tout en conservant l'intégralité de la clé de manière totalement hors-ligne. Ce qui signifie que les participants individuels n'ont pas nécessairement besoin d'investir dans du matériel (hardware), tandis que la distribution des fragments de clé, peut aider à les renforcer contre d'éventuelles attaques (hack).

### Mise en jeu en tant que service (SaaS) {#saas}

Les opérateurs comme les pools de staking (verrouillage d'actifs - ETH) ainsi que les fournisseurs d'actifs institutionnels gérant de multiples validateurs, peuvent utiliser la technologie de validation distribuée (DVT) afin de réduire leurs risques. En distribuant leur infrastructure, ils peuvent rajouter de la redondance à leurs opérations, et ainsi diversifier les types de matériel hardware qu'ils utilisent.

La technologie DVT partage la responsabilité de la gestion des clés entre plusieurs nœuds, entendant le fait que certains coûts opérationnels peuvent également être répartis. La technologie DVT peut aussi réduire les coûts opérationnels et d'assurance pour les fournisseurs d'actifs.

### Les pools de mise en jeu {#staking-pools}

En raison des configurations standard des validateurs, les pools de staking et les fournisseurs de staking liquide, sont contraints à différents niveaux de confiance en un seul opérateur, depuis que gains et pertes sont partagés par l'ensemble du pool. Ils dépendent également des opérateurs afin de protéger les clés de signature, car jusqu'à présent, aucune autre option ne s'offrait à eux.

Même si des efforts constants sont déployés pour diluer le risque en distribuant des participations entre plusieurs opérateurs, chaque opérateur gère toujours une part de verrouillage d'actifs (ETH) significative de façon indépendante. S'appuyer sur un seul opérateur présente des risques considérables, si celui-ci sous-performe, qu'il rencontre des périodes d'inactivité, qu'il est compromis, ou encore s'il agit par des actes malveillants.

En optimisant la Technologie de validation distribuée (DVT), le niveau de confiance requis de la part des opérateurs s'en retrouve nettement réduit. **Les pools permettent entres autres aux opérateurs, de détenir des participations sans nécessiter la conservation des clés de validation** (seuls des fragments de clé sont utilisés). Ce qui permet de répartir les participations gérées entre plusieurs opérateurs (ex : au lieu d'avoir un opérateur unique administrant quelque 1000 validateurs, la technologie DVT permet auxdits validateurs d'être collectivement régentés par plusieurs opérateurs). Aussi, des configurations diverses d'opérateurs (validateurs) garantiront que si l'un des opérateurs rencontraient une faille technique, les autres garants du réseau pourraient toujours garantir l'attestation (processus de signature d'un bloc). Ce qui engendre une redondance et une diversification conduisant à de meilleures performances ajoutée à une plus grande résilience, tout en maximisant les récompenses.

L'autre avantage de minimiser la confiance en un seul opérateur, c'est que les pools de staking permettent une participation plus ouverte sans le consentement des autres opérateurs. En procédant ainsi, les acteurs peuvent réduire leur risque et soutenir la décentralisation d'Ethereum, en utilisant tout à la fois des ensembles d'opérateurs supervisés et ouverts, par exemple, en associant des fournisseurs d'actifs (Staking) individuels ou de moindre envergure à des acteurs plus importants.

## Inconvénients possibles à l'utilisation de la Technologie de validation distribuée (DVT) {#potential-drawbacks-of-using-dvt}

- **Composant additionnel** - L' introduction d'un nœud DVT ajoute une partie supplémentaire potentiellement défectueuse ou vulnérable. Une manière d'atténuer cette situation est de forcer plusieurs mises en œuvre d'un nœud DVT, c'est-à-dire plusieurs clients DVT (tout comme il existe plusieurs clients pour le consensus en lui-même et les couches d'exécution).
- **Coûts opérationnels** - comme la technologie DVT distribue la validation de façon multipartite, davantage de nœuds sont requis pour le fonctionnement au lieu d'un nœud seul, ce qui génère des coûts liés à ce processus bien plus élevés.
- **Possibilité d'une latence accrue** - étant donné que la technologie DVT utilise un protocole de consensus pour finaliser ledit consensus via les nœuds multiples exploitant un validateur ; ce qui peut entraîner une latence accrue possible.

## Complément d'information {#further-reading}

- [Spécificités des validateurs distribués d'Ethereum (niveau élevé)](https://github.com/ethereum/distributed-validator-specs)
- [Spécificités techniques des validateurs distribués d'Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Application démo de partage de secret Shamir](https://iancoleman.io/shamir/)
