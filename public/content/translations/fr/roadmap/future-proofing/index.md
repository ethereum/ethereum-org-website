---
title: "Pérenniser Ethereum et la sécurité quantique de la cryptographie"
description: "Ces mises à jour consolident Ethereum en tant que couche de base résiliente et décentralisée pour l'avenir, quoi qu'il réserve."
lang: fr
image: /images/roadmap/roadmap-future.png
alt: "Feuille de route d'Ethereum"
template: roadmap
summaryPoints:
  - La cryptographie post-quantique garantit qu'Ethereum pourra survivre aux menaces matérielles avancées à mesure que l'informatique quantique progresse
  - La simplification du protocole rend Ethereum plus facile à maintenir, à auditer et à sécuriser
  - Les récentes mises à jour ont déjà apporté des améliorations significatives en matière d'efficacité
---

Certaines parties de la feuille de route ne concernent pas la mise à l'échelle ou la sécurisation d'Ethereum dans l'immédiat. Elles visent à rendre Ethereum **stable et fiable pour un avenir lointain**. Cela implique de se préparer à de nouveaux types de menaces et de supprimer la complexité inutile du protocole.

## Résistance quantique {#quantum-resistance}

Ethereum utilise la [cryptographie](/glossary/#cryptography) pour maintenir la sécurité du réseau et protéger les fonds des utilisateurs. À terme, certaines de ces méthodes cryptographiques seront **vulnérables aux ordinateurs quantiques**, qui peuvent résoudre des problèmes mathématiques spécifiques de manière exponentiellement plus rapide que les machines classiques.

**Aucun ordinateur quantique ne peut briser la cryptographie d'Ethereum aujourd'hui.** Le matériel requis n'existe pas encore à grande échelle. Mais des recherches récentes suggèrent que l'écart se réduit plus rapidement que prévu. En mars 2026, Google Quantum AI a publié un article estimant que briser la cryptographie sur courbe elliptique de 256 bits (le type qu'Ethereum utilise pour les signatures de compte) pourrait nécessiter environ 1 200 qubits logiques, soit environ 20 fois moins que les estimations précédentes. Google a fixé une date limite interne à 2029 pour la migration de ses propres systèmes vers une cryptographie résistante aux attaques quantiques.

Les transitions cryptographiques prennent des années à être planifiées et exécutées en toute sécurité. Étant donné que le modèle de sécurité d'Ethereum est conçu pour durer des décennies, la préparation post-quantique figurait dans la feuille de route d'Ethereum avant même de faire la une des journaux. La préparation du réseau a lieu en ce moment pour garantir une transition fluide, et non en réaction à une urgence.

### Qu'est-ce qui est menacé ? {#what-is-at-risk}

Quatre domaines principaux de la cryptographie d'Ethereum ont été identifiés comme nécessitant des mises à jour post-quantiques :

1. **Signatures de consensus (BLS)** : Les [validateurs](/glossary/#validator) utilisent les signatures BLS pour voter sur les [blocs](/glossary/#block) valides. Un ordinateur quantique pourrait falsifier ces signatures.
2. **Disponibilité des données (engagements KZG)** : Les [schémas d'engagement](/roadmap/danksharding/#what-is-kzg) qui aident Ethereum à passer à l'échelle reposent sur des mathématiques (plus précisément, le couplage sur courbe elliptique) qui sont vulnérables aux attaques quantiques.
3. **Signatures de compte (ECDSA)** : Le schéma de signature qui protège les comptes Ethereum individuels. Lorsqu'un compte envoie une transaction, sa clé publique est exposée onchain. Un ordinateur quantique pourrait dériver la clé privée à partir de cette clé publique exposée, permettant potentiellement le vol de fonds.
4. **Preuves ZK de la couche application** : Les systèmes de preuve à divulgation nulle de connaissance utilisés par les rollups et d'autres applications reposent sur des hypothèses cryptographiques que les ordinateurs quantiques pourraient compromettre.

<ExpandableCard title="Les ordinateurs quantiques peuvent-ils voler mes ETH aujourd'hui ?" eventCategory="/roadmap/future-proofing" eventName="clicked can quantum computers steal my ETH today?">

Non. Aucun ordinateur quantique ne peut aujourd'hui briser la cryptographie d'Ethereum. Le travail décrit sur cette page est une préparation pour l'avenir, et non une réponse à une menace active. Lorsque les portefeuilles post-quantiques seront disponibles, les logiciels de portefeuille vous guideront tout au long de la migration. Pour l'instant, vous n'avez rien à faire.

</ExpandableCard>

### Qu'est-ce qui est fait ?

Ethereum est actuellement le défenseur le plus proactif contre les menaces quantiques dans l'écosystème de la chaîne de blocs. La Fondation Ethereum a formé une **équipe de sécurité post-quantique** dédiée en janvier 2026, et des travaux actifs s'étendent à plusieurs équipes de clients et groupes de recherche. Le travail de l'équipe post-quantique de la Fondation Ethereum est suivi publiquement sur [pq.ethereum.org](https://pq.ethereum.org).

Les travaux actifs comprennent :

- **Signatures basées sur les hashs (leanXMSS)** : Un remplacement résistant aux attaques quantiques pour les signatures de validateur, construit sur des fonctions de hash que les ordinateurs quantiques ne peuvent pas briser efficacement.
- **zkVM minimal (leanVM)** : Étant donné que les signatures résistantes aux attaques quantiques sont plus volumineuses que les signatures actuellement utilisées, leanXMSS est associé à un zkVM minimal (leanVM). Ce moteur agrège efficacement les signatures résistantes aux attaques quantiques, compressant les données de 250 fois, afin que le réseau reste rapide après la transition.
- **Tests d'interopérabilité hebdomadaires** : Plus de 10 équipes de clients participent à des devnets post-quantiques réguliers.
- **Disponibilité des données :** La mise à niveau de la cryptographie sous-jacente utilisée pour gérer de grandes quantités de données du réseau garantira qu'Ethereum reste rapide et abordable à utiliser sans risquer de futures vulnérabilités quantiques.
- **Prix Poseidon** : Un prix de recherche d'un million de dollars visant à améliorer les primitives cryptographiques basées sur les hashs.
- **Normes du NIST** : L'Institut national des normes et de la technologie des États-Unis (NIST) a finalisé trois normes de cryptographie post-quantique en août 2024 (ML-KEM, ML-DSA, SLH-DSA). Les travaux d'Ethereum s'appuient sur ces fondations.

Une partie clé de la stratégie de transition est l'**EIP-8141**, qui introduit l'[abstraction de compte](/roadmap/account-abstraction/) native. Cela permet aux comptes individuels de choisir leur propre vérification de signature, ce qui signifie que les utilisateurs pourraient passer à des signatures résistantes aux attaques quantiques **sans attendre une migration unique à l'échelle du protocole**. L'EIP-8141 est envisagé pour le hard fork Hegotá (prévu pour le second semestre 2026).

La Fondation Ethereum a défini des étapes structurées de fork visant l'achèvement de l'infrastructure post-quantique de base d'ici 2029 environ. Il s'agit d'objectifs de planification, et non d'engagements garantis.

<ButtonLink variant="outline" href="/roadmap/future-proofing/quantum-resistance/">En savoir plus sur la résistance quantique</ButtonLink>
## Un Ethereum plus simple et plus efficace {#simpler-more-efficient-ethereum}

La complexité crée des opportunités pour les bugs et les vulnérabilités. Une partie de la feuille de route se concentre sur **la simplification d'Ethereum et la suppression de la dette technique** afin que le protocole soit plus facile à maintenir, à auditer et à analyser.

### Ce qui a été livré {#what-has-been-delivered}

Plusieurs mises à jour récentes ont rendu Ethereum plus simple et plus efficace :

- **[Pectra (mai 2025)](/roadmap/pectra/)** : A introduit l'EIP-7702, qui permet aux comptes détenus par des tiers de déléguer temporairement au code d'un contrat intelligent, un tremplin vers une [abstraction de compte](/roadmap/account-abstraction/) complète. A également ajouté le précompilé BLS12-381 (EIP-2537), la gestion des dépôts onchain (EIP-6110), l'accès à l'historique des hashs de bloc dans l'EVM (EIP-2935), et a augmenté le solde effectif maximum pour les validateurs (EIP-7251).
- **[Fusaka (décembre 2025)](/roadmap/fusaka/)** : A déployé PeerDAS (EIP-7594), un système d'échantillonnage de disponibilité des données pair à pair qui répartit la charge de travail de disponibilité des données sur le réseau. A également augmenté les paramètres des blobs, augmentant ainsi le débit de données pour les [rollups](/glossary/#rollups).
- **[Dencun (mars 2024)](/roadmap/dencun/)** : A introduit les transactions de blob (EIP-4844) pour des données de rollup moins chères et a restreint `SELFDESTRUCT` (EIP-6780) pour supprimer une source de complexité de longue date.
- **[London (août 2021)](/ethereum-forks/#london)** : A remanié la tarification du [gaz](/glossary/#gas) avec l'EIP-1559, en introduisant des frais de base et un mécanisme de burn pour obtenir des coûts de transaction plus prévisibles.

### Ce qui est en cours {#what-is-in-progress}

- **[Glamsterdam (prévu pour le premier semestre 2026)](/roadmap/glamsterdam/)** : Sont envisagés pour inclusion : la séparation proposant-constructeur (PBS) intégrée (EIP-7732), les listes d'accès au niveau du bloc (EIP-7928), et la réévaluation du prix du gaz pour mieux aligner les coûts sur l'utilisation réelle des ressources.
- **Hegotá (prévu pour le second semestre 2026)** : Sont envisagés pour inclusion : les [arbres Verkle](/roadmap/verkle-trees/), remplaçant la structure de données actuelle par une structure plus efficace qui permet des clients sans état. Également ciblé pour l'EIP-8141 (abstraction de compte native).
- **En cours** : Les efforts pour simplifier l'[EVM](/developers/docs/evm/), harmoniser les implémentations des clients et supprimer progressivement les fonctionnalités obsolètes se poursuivent au sein de la communauté de développement d'Ethereum.

## Progrès actuels {#current-progress}

Début 2026 :

**Simplification et efficacité** : Pectra et Fusaka ont apporté de réelles améliorations en matière de flexibilité des comptes, de disponibilité des données et d'opérations des validateurs. Glamsterdam et Hegotá sont en développement actif avec des objectifs clairs pour rendre le réseau plus résilient et efficace, tout en supprimant les dépendances externes.

**Cryptographie post-quantique** : Des recherches actives et des implémentations précoces sont en cours. L'écosystème a financé des prix de recherche et gère des devnets d'interopérabilité hebdomadaires sur plusieurs clients, en plus des recherches menées par l'équipe post-quantique dédiée de la Fondation Ethereum. Bien que les étapes structurées de fork visent un achèvement vers 2029, les premières recherches produisent des preuves tangibles démontrant que l'exécution post-quantique est viable aujourd'hui.

**Abstraction de compte et agilité des signatures** : L'EIP-7702 a été déployé dans Pectra. L'EIP-8141, envisagé pour Hegotá, permettra aux comptes d'utiliser n'importe quel schéma de signature, offrant aux utilisateurs une voie pour adopter des signatures résistantes aux attaques quantiques avant que la transition complète du protocole ne soit achevée.

Aucune partie de ce travail n'est terminée. Les délais sont des objectifs, pas des garanties. Mais l'ampleur et le rythme du développement actif représentent un engagement clair à maintenir Ethereum sécurisé et efficace sur le long terme.

**Pour aller plus loin**

- [La cryptographie post-quantique sur Ethereum](/roadmap/future-proofing/quantum-resistance/)
- [strawmap.org](https://strawmap.org/) - _Architecture de la Fondation Ethereum_
- [pq.ethereum.org](https://pq.ethereum.org)
- [Gaz](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Structures de données](/developers/docs/data-structures-and-encoding/)
