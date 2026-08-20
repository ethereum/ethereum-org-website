---
title: Domaines actifs de la recherche sur Ethereum
description: Explorez différents domaines de recherche ouverte et découvrez comment vous impliquer.
lang: fr
---

L'une des principales forces d'Ethereum est qu'une communauté active de recherche et d'ingénierie l'améliore constamment. De nombreuses personnes enthousiastes et qualifiées dans le monde entier aimeraient s'attaquer aux problèmes en suspens d'Ethereum, mais il n'est pas toujours facile de savoir quels sont ces problèmes. Cette page présente les principaux domaines de recherche actifs comme un guide général de l'avant-garde d'Ethereum.

## Comment fonctionne la recherche sur Ethereum {#how-ethereum-research-works}

La recherche sur Ethereum est ouverte et transparente. La culture consiste à rendre les outils et les résultats de recherche aussi ouverts et interactifs que possible, par exemple par le biais de notebooks exécutables. La recherche sur Ethereum évolue rapidement, les nouvelles découvertes étant publiées et discutées ouvertement sur des forums tels que [ethresear.ch](https://ethresear.ch/) plutôt que d'atteindre la communauté par le biais de publications traditionnelles après des cycles d'évaluation par les pairs. La Fondation Ethereum publie également ce qu'elle priorise et pourquoi, afin que quiconque puisse voir quels problèmes sont actuellement considérés comme urgents.

## Ressources générales de recherche {#general-research-resources}

Quel que soit le sujet spécifique, vous trouverez une mine d'informations sur la recherche sur Ethereum sur [ethresear.ch](https://ethresear.ch) et sur le [canal Discord Eth R&D](https://discord.gg/qGpsxSA). Ce sont les principaux endroits où les chercheurs d'Ethereum discutent des dernières idées et opportunités de développement.

Pour avoir un aperçu de la direction que prend le protocole, commencez par la [feuille de route d'Ethereum](/roadmap/), puis lisez la [Mise à jour des priorités du protocole pour 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026) de la Fondation Ethereum et les [mises à jour des groupes de protocoles](https://blog.ethereum.org/2026/05/11/protocol-update-may-26) qui rendent compte des progrès réalisés par rapport à celle-ci. [Ethereum Protocol Studies](https://blog.ethereum.org/2026/02/17/ethereum-protocol-studies-26) est un point d'entrée structuré pour les personnes qui souhaitent travailler sur le protocole lui-même.

## Sources de financement {#sources-of-funding}

Vous pouvez vous impliquer dans la recherche sur Ethereum et être rémunéré pour cela. [La Fondation Ethereum](/foundation/) finance la recherche et les biens publics par le biais de son [Ecosystem Support Program](https://esp.ethereum.foundation/applicants), qui publie des listes de souhaits et des appels à propositions décrivant les problèmes qu'elle aimerait voir résolus. Vous pouvez trouver des informations sur les opportunités de financement actives et à venir sur [la page des subventions d'Ethereum](/community/grants/).

## Recherche sur le protocole {#protocol-research}

La recherche sur le protocole concerne la couche de base d'Ethereum : l'ensemble des règles définissant la manière dont les nœuds se connectent, communiquent, échangent et stockent les données d'Ethereum et parviennent à un consensus sur l'état de la chaîne de blocs. Ses deux catégories de longue date sont le consensus et l'exécution, et plusieurs sujets de recherche recoupent désormais les deux.

### Consensus {#consensus}

La recherche sur le consensus concerne le [mécanisme de preuve d'enjeu (PoS) d'Ethereum](/developers/docs/consensus-mechanisms/pos/) : la sécurité de la règle de choix de fork et du gadget de finalité, la cryptoéconomie du staking, le réseau pair à pair qui transporte les blocs, les attestations et les données de blob, et la cryptographie avec laquelle les validateurs signent. Voici quelques exemples de sujets de recherche sur le consensus :

- l'identification et la correction des vulnérabilités ;
- la quantification de la sécurité cryptoéconomique ;
- la réduction du temps nécessaire pour qu'un bloc atteigne la finalité ;
- et l'amélioration de l'efficacité, de la sécurité et de la surveillance du réseau pair à pair entre les clients de consensus.

Une grande partie de ce travail est passée du stade de document à celui de spécification. L'échantillonnage de la disponibilité des données a été déployé lors de la mise à jour [Fusaka](/roadmap/fusaka/), des modifications sur la façon dont les blocs sont construits et dont l'inclusion des transactions est garantie sont spécifiées pour les prochaines mises à jour, et une refonte à plus long terme connue sous le nom de consensus allégé (lean consensus) explore une finalité plus rapide ainsi que des signatures post-quantiques.

#### Lectures de base {#background-reading}

- [Introduction à la preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/)
- [Finalité à slot unique](/roadmap/single-slot-finality/)
- [Document sur Casper FFG](https://arxiv.org/abs/1710.09437)
- [Document sur Gasper](https://arxiv.org/abs/2003.03052)
- [Ethereum allégé (lean Ethereum)](https://blog.ethereum.org/2025/07/31/lean-ethereum)

#### Recherches récentes {#recent-research}

- [Consensus sur Ethresear.ch](https://ethresear.ch/c/consensus/29)
- [Dilemme Disponibilité/Finalité](https://arxiv.org/abs/2009.04987)
- [Finalité à 3 créneaux : la SSF ne concerne pas un créneau "unique"](https://ethresear.ch/t/3-slot-finality-ssf-is-not-about-single-slot/20927)

### Exécution {#execution}

La couche d'exécution concerne l'exécution des transactions, le fonctionnement de la [machine virtuelle Ethereum (EVM)](/developers/docs/evm/) et la génération de charges utiles d'exécution à transmettre à la couche de consensus. La recherche ici se divise en deux axes : rendre l'état peu coûteux à conserver et à prouver, et augmenter le débit sans imposer de coûts supplémentaires aux personnes qui gèrent les nœuds. Il existe de nombreux domaines de recherche actifs, notamment :

- la réévaluation du coût en gaz des opérations qui créent de l'état ;
- l'expiration de l'historique que les nœuds n'ont plus besoin de fournir ;
- les listes d'accès au niveau du bloc qui permettent de valider les transactions en parallèle ;
- les marchés de frais multidimensionnels qui fixent séparément le prix de l'état, des données et du calcul ;
- et la preuve de l'exécution des blocs de couche 1 (l1) avec un zkEVM.

#### Lectures de base {#background-reading-1}

- [Introduction à l'EVM](/developers/docs/evm/)
- [Couche d'exécution sur Ethresear.ch](https://ethresear.ch/c/execution-layer-research/37)
- [Spécifications de la couche d'exécution d'Ethereum](https://github.com/ethereum/execution-specs)
- [Optimisations de la base de données](https://github.com/erigontech/erigon/blob/main/docs/programmers_guide/db_faq.md)

#### Recherches récentes {#recent-research-1}

- [EIP-7928 : Listes d'accès au niveau du bloc](https://eips.ethereum.org/EIPS/eip-7928)
- [EIP-8037 : Augmentation du coût en gaz de la création d'état](https://eips.ethereum.org/EIPS/eip-8037)
- [EIP-7999 : Marché de frais multidimensionnel unifié](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7642 : eth/69, expiration de l'historique et reçus simplifiés](https://eips.ethereum.org/EIPS/eip-7642)
- [Déploiement d'un zkEVM l1 : preuve en temps réel](https://blog.ethereum.org/2025/07/10/realtime-proving)

### Résistance à la censure et construction de blocs {#censorship-resistance-and-block-building}

La plupart des blocs Ethereum sont actuellement assemblés par un petit nombre de constructeurs spécialisés, ce qui concentre le pouvoir de décider quelles transactions sont incluses. La recherche dans ce domaine vise à intégrer le marché des constructeurs dans le protocole lui-même, de sorte que les rôles de proposant et de constructeur d'un bloc soient séparés par des règles de consensus plutôt que par des logiciels hors protocole, et à donner aux validateurs un moyen de forcer l'inclusion des transactions que les constructeurs omettent.

#### Lectures de base {#background-reading-21}

- [Séparation proposant-constructeur (PBS)](/roadmap/pbs/)
- [Élection d'un leader secret unique (SSLE)](/roadmap/secret-leader-election/)

#### Recherches récentes {#recent-research-21}

- [EIP-7732 : Séparation proposant-constructeur (PBS) intégrée](https://eips.ethereum.org/EIPS/eip-7732)
- [EIP-7805 : Listes d'inclusion appliquées par le choix de fork](https://eips.ethereum.org/EIPS/eip-7805)
- [Augmenter la résistance à la censure des transactions dans le cadre de la séparation proposant-constructeur](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Croissance de l'état et absence d'état {#state-growth-and-statelessness}

Chaque nœud complet stocke l'état d'Ethereum, de sorte que le rythme auquel cet état croît fixe un plancher pour le coût de son fonctionnement. À court terme, la recherche se concentre sur la réévaluation des opérations qui créent de l'état et sur l'expiration de l'historique que les nœuds n'ont plus besoin de conserver. À plus long terme, le plan est de remplacer le trie hexaire Merkle-Patricia d'Ethereum par un arbre binaire qui produit des preuves beaucoup plus petites, et d'évoluer vers l'absence d'état, afin qu'un nœud puisse vérifier les blocs sans détenir l'état complet. Les travaux antérieurs dans ce domaine supposaient des arbres Verkle ; la proposition actuelle est un arbre binaire unifié, qui reprend le barème de gaz des témoins spécifié pour cette ligne de travail antérieure.

#### Lectures de base {#background-reading-22}

- [Absence d'état et expiration d'état](/roadmap/statelessness/)
- [Livre sur l'absence d'état d'Ethereum](https://stateless.fyi/)

#### Recherches récentes {#recent-research-22}

- [EIP-7864 : État d'Ethereum utilisant un arbre binaire unifié](https://eips.ethereum.org/EIPS/eip-7864)
- [EIP-4762 : Modifications du coût en gaz pour l'absence d'état](https://eips.ethereum.org/EIPS/eip-4762)
- [Pourquoi l'état décentralisé est important pour Ethereum](https://ethresear.ch/t/why-decentralized-state-is-important-for-ethereum/25622)

### Cryptographie post-quantique {#post-quantum-cryptography}

Les signatures des validateurs d'Ethereum et une grande partie de sa couche d'application reposent sur la cryptographie à courbe elliptique, qu'un ordinateur quantique suffisamment puissant pourrait briser. Rendre Ethereum résistant aux attaques quantiques signifie remplacer ces signatures par des alternatives basées sur le hash ou sur les réseaux euclidiens, en gardant l'agrégation de signatures suffisamment efficace pour un grand ensemble de validateurs, et en offrant aux comptes existants une voie de migration. La Fondation Ethereum dirige une équipe dédiée au post-quantique, et c'est l'un des programmes à plus long terme de la feuille de route.

#### Lectures de base {#background-reading-23}

- [Résistance quantique](/roadmap/security/quantum-resistance/)
- [Ethereum post-quantique](https://pq.ethereum.org/)

#### Recherches récentes {#recent-research-23}

- [Ethereum allégé (lean Ethereum)](https://blog.ethereum.org/2025/07/31/lean-ethereum)
- [Cryptographie sur Ethresear.ch](https://ethresear.ch/c/cryptography/28)
- [Implémentations d'Ethereum allégé](https://github.com/leanEthereum)

## Développement de clients {#client-development}

Les clients Ethereum sont des implémentations du protocole Ethereum. Le développement de clients concrétise les résultats de la recherche sur le protocole en les intégrant dans ces clients. Le développement de clients comprend la mise à jour des spécifications des clients ainsi que la création d'implémentations spécifiques.

Un nœud Ethereum doit exécuter deux logiciels :

1. un client de consensus pour suivre la tête de la chaîne de blocs, propager les blocs et gérer la logique de consensus
2. un client d'exécution pour prendre en charge la machine virtuelle Ethereum et exécuter les transactions et les contrats intelligents

De nouvelles classes de clients sont en cours de prototypage aux côtés de ces deux-là, notamment des clients qui prouvent l'exécution des blocs de couche 1 (l1) et des clients de consensus allégés construits autour de signatures post-quantiques.

Consultez la [page des nœuds et des clients](/developers/docs/nodes-and-clients/) pour plus de détails sur les nœuds et les clients et pour obtenir une liste de toutes les implémentations de clients actuelles. Vous pouvez également trouver un historique de toutes les mises à jour d'Ethereum sur la [page d'historique](/ethereum-forks/).

### Clients d'exécution {#execution-clients}

- [Spécification du client d'exécution](https://github.com/ethereum/execution-specs)
- [Spécification de l'API d'exécution](https://github.com/ethereum/execution-apis)

### Clients de consensus {#consensus-clients}

- [Spécification du client de consensus](https://github.com/ethereum/consensus-specs)
- [Spécification de l'API Beacon](https://ethereum.github.io/beacon-APIs/)

### Clients zkEVM {#zkevm-clients}

- [zkEVM](/roadmap/zkevm/)
- [Ethproofs](https://ethproofs.org/)
- [Déploiement d'un zkEVM l1 : les fondations de sécurité](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

## Mise à l'échelle et performances {#scaling-and-performance}

La mise à l'échelle d'Ethereum est un domaine d'intérêt majeur pour les chercheurs d'Ethereum, et elle se déroule sur deux voies en même temps : l'augmentation du débit de la couche 1 (l1) elle-même, et le déplacement de l'exécution vers des rollups qui publient leurs données sur Ethereum. Les travaux actuels comprennent l'augmentation de la limite de gaz des blocs, la réévaluation de la croissance de l'état, l'expansion de la capacité des blobs pour les données de rollup, et la réduction de ce qu'un nœud doit stocker et vérifier. Des informations introductives sur la mise à l'échelle d'Ethereum sont disponibles sur notre [page sur la mise à l'échelle](/developers/docs/scaling/) et sur la [feuille de route de mise à l'échelle](/roadmap/scaling/).

### Couche 2 (l2) {#layer-2}

Il existe désormais plusieurs protocoles de couche 2 (l2) qui mettent à l'échelle Ethereum en utilisant différentes techniques pour le traitement par lots des transactions et leur sécurisation sur la couche 1 (l1) d'Ethereum. La recherche ouverte comprend la réduction de la latence et du coût de la preuve, le raccourcissement du temps nécessaire pour qu'une transaction atteigne une finalité sans tiers de confiance, et l'offre aux utilisateurs d'une expérience unique et cohérente à travers de nombreux rollups.

#### Lectures de base {#background-reading-2}

- [Introduction à la couche 2 (l2)](/layer-2/)
- [L2BEAT : résumé de la mise à l'échelle](https://l2beat.com/scaling/summary)
- [Une feuille de route Ethereum centrée sur les rollups](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)

#### Recherches récentes {#recent-research-2}

- [Couche 2 (l2) sur Ethresear.ch](https://ethresear.ch/c/layer-2/32)
- [L2BEAT : coûts onchain](https://l2beat.com/scaling/costs)
- [Construire sur Ethereum en 2026 : ce qui a changé](/latest/building-on-ethereum-in-2026/)

### Interopérabilité {#interoperability}

Les utilisateurs et les actifs sont répartis sur la couche 1 (l1) d'Ethereum et de nombreuses couches 2 (l2), et le problème de recherche est de leur permettre de se déplacer et d'agir à travers ces chaînes sans faire confiance à un intermédiaire. Les travaux ici couvrent les transferts basés sur l'intention, l'adressage et le nommage inter-chaîne standardisés, la transmission générale de messages et l'abstraction de chaîne au niveau du portefeuille. Cela remplace un modèle dans lequel des ponts de garde détenaient les actifs, et les ponts ont historiquement été l'une des plus grandes sources de pertes dans l'écosystème, de sorte que la sécurité de tout mécanisme inter-chaîne reste une préoccupation centrale.

#### Lectures de base {#background-reading-3}

- [Introduction aux ponts de chaîne de blocs](/bridges/)
- [Faire en sorte qu'Ethereum ressemble à nouveau à une seule chaîne](https://blog.ethereum.org/2025/11/18/eil)
- [Cadre d'intentions ouvertes (Open Intents Framework)](https://openintents.xyz/)
- [Validation des ponts](https://stonecoldpat.github.io/images/validatingbridges.pdf)

#### Recherches récentes {#recent-research-3}

- [ERC-7683 : Intentions inter-chaîne](https://eips.ethereum.org/EIPS/eip-7683)
- [ERC-7930 : Adresses interopérables](https://eips.ethereum.org/EIPS/eip-7930)
- [ERC-7828 : Noms interopérables](https://eips.ethereum.org/EIPS/eip-7828)

### Disponibilité des données et mise à l'échelle des blobs {#data-availability-and-blob-scaling}

Les rollups publient leurs données sur Ethereum dans des blobs, et la mise à l'échelle de cette couche de données est un problème de recherche à part entière, distinct de la mise à l'échelle de l'exécution. Ethereum utilise désormais l'échantillonnage de la disponibilité des données, de sorte que les validateurs peuvent vérifier que les données de blob ont été publiées en en échantillonnant des parties au lieu de tout télécharger, et la capacité des blobs est augmentée de manière incrémentielle par le biais de forks dédiés uniquement aux paramètres de blob. Les questions ouvertes incluent jusqu'où l'échantillonnage peut être poussé, comment maintenir les exigences de bande passante gérables pour les personnes faisant du staking à domicile, et comment la tarification des blobs devrait répondre à la demande.

#### Lectures de base {#background-reading-4}

- [PeerDAS](/roadmap/fusaka/peerdas/)
- [Mise à jour Fusaka](/roadmap/fusaka/)
- [danksharding](/roadmap/danksharding/)
- [Disponibilité des données](/developers/docs/data-availability/)
- [EIP-4844 : Transactions de blob de fragment](https://eips.ethereum.org/EIPS/eip-4844)
- [Notes sur le proto-danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)

#### Recherches récentes {#recent-research-4}

- [EIP-7594 : PeerDAS](https://eips.ethereum.org/EIPS/eip-7594)
- [EIP-7892 : Hard forks uniquement pour les paramètres de blob](https://eips.ethereum.org/EIPS/eip-7892)
- [Sharding sur Ethresear.ch](https://ethresear.ch/c/sharding/6)

### Matériel {#hardware}

[L'exécution de nœuds](/developers/docs/nodes-and-clients/run-a-node/) sur du matériel modeste est fondamentale pour maintenir Ethereum décentralisé, de sorte que chaque augmentation du débit doit être mise en balance avec ce qu'elle coûte à un opérateur de nœud. Avec l'augmentation de la limite de gaz des blocs et d'autres augmentations prévues, la recherche active couvre la croissance de l'état et la façon de la tarifer, les performances de synchronisation et de base de données sur un état plus important, les économies de disque disponibles grâce à l'expiration de l'historique, et finalement l'absence d'état.

#### Lectures de base {#background-reading-5}

- [Lancer votre propre nœud Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
- [Absence d'état et expiration d'état](/roadmap/statelessness/)
- [Ethereum sur ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Recherches récentes {#recent-research-5}

- [Mise à l'échelle d'Ethereum : la voie vers une limite de gaz plus élevée et au-delà](https://ethpandaops.io/posts/gaslimit-scaling/)
- [EIP-8261 : Calendrier de la limite de gaz](https://eips.ethereum.org/EIPS/eip-8261)
- [EIP-8037 : Augmentation du coût en gaz de la création d'état](https://eips.ethereum.org/EIPS/eip-8037)

## Sécurité {#security}

La sécurité est un vaste sujet qui peut inclure la prévention du spam et des escroqueries, la sécurité des portefeuilles, la sécurité matérielle, la sécurité crypto-économique, la résistance à la censure, la préparation post-quantique, la chasse aux bugs, ainsi que les tests et la vérification des applications et des logiciels clients. La [feuille de route de sécurité](/roadmap/security/) d'Ethereum couvre le travail au niveau du protocole.

### Cryptographie et ZKP {#cryptography--zkp}

Les preuves à divulgation nulle de connaissance (ZKP) et la cryptographie sont essentielles pour intégrer la confidentialité et la sécurité dans Ethereum et ses applications. La preuve à divulgation nulle de connaissance est passée de la recherche à l'infrastructure de production : les prouveurs qui prouvent de vrais blocs Ethereum sont désormais évalués publiquement sur la latence, le coût et la solidité. Les problèmes ouverts ont évolué en conséquence, vers la preuve des blocs de couche 1 (l1) assez rapidement pour le faire en temps réel, la prise en compte rigoureuse de la sécurité des systèmes de preuve utilisés, et la préparation à la cryptographie post-quantique.

#### Lectures de base {#background-reading-6}

- [zkEVM](/roadmap/zkevm/)
- [Confidentialité](/roadmap/privacy/)
- [Podcast Zero Knowledge](https://zeroknowledge.fm/)

#### Recherches récentes {#recent-research-6}

- [ZK sur Ethresear.ch](https://ethresear.ch/c/zk-s-nt-arks/13)
- [Cryptographie sur Ethresear.ch](https://ethresear.ch/c/cryptography/28)
- [Calculateur de solidité pour les systèmes de preuve zkEVM basés sur le hash](https://github.com/ethereum/soundcalc)
- [Déploiement d'un zkEVM l1 : les fondations de sécurité](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

### Portefeuilles {#wallets}

Les portefeuilles Ethereum peuvent être des extensions de navigateur, des applications de bureau et mobiles ou des contrats intelligents sur Ethereum. L'abstraction de compte n'est plus expérimentale : l'ERC-4337 fournit des comptes intelligents sans modification du protocole, et l'EIP-7702 permet à un compte ordinaire de définir du code afin que le traitement par lots des transactions, le parrainage de gaz et la récupération sociale fonctionnent avec l'adresse qu'un utilisateur possède déjà. La recherche ouverte se concentre désormais sur l'abstraction de compte native dans le protocole lui-même, sur des architectures de compte modulaires et auditables, et sur la gestion et la récupération des clés que les personnes ordinaires peuvent utiliser en toute sécurité.

#### Lectures de base {#background-reading-7}

- [Introduction aux portefeuilles](/wallets/)
- [Introduction à la sécurité des portefeuilles](/security/)
- [Abstraction de compte](/roadmap/account-abstraction/)
- [EIP-7702](/roadmap/pectra/7702/)
- [Sécurité sur Ethresear.ch](https://ethresear.ch/c/security/25)

#### Recherches récentes {#recent-research-7}

- [EIP-8141 : Transaction de trame (Frame transaction)](https://eips.ethereum.org/EIPS/eip-8141)
- [ERC-5792 : API d'appel de portefeuille](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-6963 : Découverte de fournisseurs injectés multiples](https://eips.ethereum.org/EIPS/eip-6963)
- [Portefeuilles de contrats intelligents axés sur la validation](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)

## Communauté, éducation et sensibilisation {#community-education-and-outreach}

L'intégration de nouveaux utilisateurs sur Ethereum nécessite de nouvelles ressources éducatives et de nouvelles approches de sensibilisation. Cela peut inclure des articles de blog, des livres, des podcasts, des mèmes, des ressources pédagogiques, des événements et tout ce qui permet de créer des communautés, d'accueillir les nouveaux arrivants et d'éduquer les gens sur Ethereum.

### Conception et UX {#design-and-ux}

Pour intégrer plus de personnes sur Ethereum, l'écosystème doit améliorer sa conception et son expérience utilisateur. Cela nécessite que les concepteurs et les experts en produits réexaminent le fonctionnement des portefeuilles et des applications, et cela signifie de plus en plus concevoir en fonction de normes qui existent déjà : appels de portefeuille par lots, parrainage de gaz, comptes pouvant être récupérés et adresses lisibles par l'homme qui portent la chaîne à laquelle elles appartiennent. Il y a comparativement peu de lieux canoniques pour la recherche sur l'UX du Web3, de sorte que les études publiées et les conseils de conception ont tendance à être dispersés.

#### Lectures de base {#background-reading-8}

- [Conception et UX dans le Web3](/developers/docs/design-and-ux/)
- [Feuille de route de l'expérience utilisateur d'Ethereum](/roadmap/user-experience/)
- [Guide de conception Web3](https://learnweb3.design/)
- [Manuel de conception UX Web3](https://web3ux.design/)

#### Recherches récentes {#recent-research-8}

- [UX/UI sur Ethresear.ch](https://ethresear.ch/c/ui-ux/24)
- [ERC-5792 : API d'appel de portefeuille](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-7828 : Noms interopérables](https://eips.ethereum.org/EIPS/eip-7828)

### Économie {#economics}

La recherche en économie dans Ethereum suit globalement deux approches : valider la sécurité des mécanismes reposant sur des incitations économiques ("microéconomie") et analyser les flux de valeur entre les protocoles, les applications et les utilisateurs ("macroéconomie"). Il existe des facteurs crypto-économiques complexes liés à l'actif natif d'Ethereum (l'ether) et aux jetons construits par-dessus (par exemple les NFT et les jetons ERC-20).

#### Lectures de base {#background-reading-9}

- [Groupe d'incitations robustes (Robust Incentives Group)](https://rig.ethereum.org/)
- [Masterclass sur l'économie d'Ethereum et modèle économique](https://github.com/CADLabs/ethereum-economic-model)

#### Recherches récentes {#recent-research-9}

- [Économie sur Ethresear.ch](https://ethresear.ch/c/economics/16)
- [Équilibre de l'offre en circulation](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [Quantifier la MEV : À quel point la forêt est-elle sombre ?](https://arxiv.org/abs/2101.05511)

### Espace de bloc et marchés de frais {#blockspace-fee-markets}

Les marchés d'espace de bloc régissent l'inclusion des transactions des utilisateurs finaux, soit directement sur Ethereum (couche 1), soit sur des réseaux pontés, par exemple les rollups (couche 2). Sur Ethereum, les transactions sont soumises au marché de frais déployé dans le protocole sous le nom d'EIP-1559, protégeant la chaîne du spam et tarifant la congestion. Sur les deux couches, les transactions peuvent produire des externalités, connues sous le nom de valeur maximale extractible (MEV), qui induisent de nouvelles structures de marché pour capturer ou gérer ces externalités. Les travaux actuels étendent cela à la tarification de plusieurs ressources à la fois, puisque l'état, les données et le calcul se congestionnent indépendamment, et à la modification de qui assemble les blocs et à quelles conditions.

#### Lectures de base {#background-reading-10}

- [Conception du mécanisme de frais de transaction pour la chaîne de blocs Ethereum : une analyse économique de l'EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [Simulations de l'EIP-1559 (Robust Incentives Group)](https://ethereum.github.io/abm1559)
- [L'économie des rollups à partir des principes fondamentaux](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0 : Frontrunning, réorganisation des transactions et instabilité du consensus dans les échanges décentralisés](https://arxiv.org/abs/1904.05234)

#### Recherches récentes {#recent-research-10}

- [EIP-7999 : Marché de frais multidimensionnel unifié](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7928 : Listes d'accès au niveau du bloc](https://eips.ethereum.org/EIPS/eip-7928)
- [MEV inter-domaines](https://arxiv.org/abs/2112.01472)

### Incitations de la preuve d'enjeu {#proof-of-stake-incentives}

Les validateurs utilisent l'actif natif d'Ethereum (l'ether) comme collatéral contre les comportements malhonnêtes. La cryptoéconomie de cela détermine la sécurité du réseau. Des validateurs sophistiqués peuvent être en mesure d'exploiter les nuances de la couche d'incitation pour lancer des attaques explicites. Depuis la mise à jour Pectra, les validateurs peuvent également détenir et gagner sur un solde effectif beaucoup plus important et consolider plusieurs validateurs en un seul, ce qui modifie l'économie de leur fonctionnement.

#### Lectures de base {#background-reading-11}

- [Solde effectif maximum](/roadmap/pectra/maxeb/)
- [Masterclass sur l'économie d'Ethereum et modèle économique](https://github.com/CADLabs/ethereum-economic-model)
- [Simulations des incitations PoS (Robust Incentives Group)](https://ethereum.github.io/beaconrunner/)

#### Recherches récentes {#recent-research-11}

- [Groupe d'incitations robustes (Robust Incentives Group)](https://rig.ethereum.org/)
- [Trois attaques sur l'Ethereum PoS](https://arxiv.org/abs/2110.10086)

### Staking liquide et dérivés {#liquid-staking-and-derivatives}

Le staking liquide permet aux utilisateurs possédant moins de 32 ETH de recevoir des rendements de staking en échangeant de l'ether contre un jeton représentant de l'ether staké qui peut être utilisé dans la DeFi. Cependant, les incitations et la dynamique du marché associées au staking liquide sont encore en cours de découverte, ainsi que son effet sur la sécurité d'Ethereum (par exemple, les risques de centralisation).

#### Lectures de base {#background-reading-12}

- [Staking liquide sur Ethresear.ch](https://ethresear.ch/search?q=liquid%20staking)
- [Lido : La voie vers un staking Ethereum sans tiers de confiance](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)

#### Recherches récentes {#recent-research-12}

- [Les risques des dérivés de staking liquide](https://notes.ethereum.org/@djrtwo/risks-of-lsd)
- [Gestion des retraits de Lido](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)

## Tests {#testing}

### Tests des clients et du réseau {#client-and-network-testing}

Les spécifications d'Ethereum sont exécutables, et les montages de test (test fixtures) générés à partir de celles-ci sont ce par rapport à quoi les équipes de clients vérifient leurs implémentations. Parallèlement à cela, des harnais de test partagés exécutent les clients les uns contre les autres et contre des conditions de réseau délibérément hostiles, et les réseaux de test publics exercent les mises à jour avant qu'elles n'atteignent le réseau principal (Mainnet). L'amélioration de cette infrastructure est l'un des travaux les plus efficaces disponibles, car c'est ainsi que les bugs sont détectés avant d'atteindre les utilisateurs.

#### Lectures de base {#background-reading-24}

- [Spécifications de la couche d'exécution d'Ethereum](https://github.com/ethereum/execution-specs)
- [Spécification du client de consensus](https://github.com/ethereum/consensus-specs)

#### Recherches récentes {#recent-research-24}

- [hive, un harnais de test de client de bout en bout](https://github.com/ethereum/hive)
- [Assertoor, un outil de test de réseau de test](https://github.com/ethpandaops/assertoor)

### Vérification formelle {#formal-verification}

La vérification formelle utilise des preuves mathématiques vérifiées par machine pour établir qu'une spécification ou une implémentation se comporte comme prévu. Dans Ethereum, cela couvre la preuve que les implémentations de l'EVM correspondent à une sémantique formelle, la preuve de la solidité des circuits et des systèmes de preuve sur lesquels s'appuient les prouveurs à divulgation nulle de connaissance, et la vérification des primitives cryptographiques sous-jacentes. Des recherches supplémentaires peuvent renforcer ces preuves et les étendre à une plus grande partie de la pile.

#### Lectures de base {#background-reading-13}

- [zkEVM vérifiés](https://verified-zkevm.org/)
- [Vérification formelle (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Recherches récentes {#recent-research-13}

- [Aperçu du projet zkEVM vérifié](https://github.com/Verified-zkEVM/Overview)
- [KEVM : sémantique de l'EVM en K](https://github.com/runtimeverification/evm-semantics)
- [Vérification formelle du contrat de dépôt](https://github.com/runtimeverification/deposit-contract-verification)

## Science des données et analytique {#data-science-and-analytics}

Il y a un besoin de plus d'outils d'analyse de données et de tableaux de bord qui donnent des informations détaillées sur l'activité sur Ethereum et la santé du réseau. Une grande partie des données sous-jacentes est publique et interrogeable, de sorte que la lacune se situe généralement dans l'analyse et la présentation plutôt que dans l'accès.

### Lectures de base {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [Tableau de bord de la diversité des clients](https://clientdiversity.org/)
- [Spécification de l'API d'exécution JSON-RPC d'Ethereum](https://ethereum.github.io/execution-apis/)

#### Recherches récentes {#recent-research-14}

- [Analyse de données du Robust Incentives Group](https://rig.ethereum.org/)
- [Données ouvertes ethPandaOps](https://ethpandaops.io/data/)
- [L2BEAT : résumé de la mise à l'échelle](https://l2beat.com/scaling/summary)

## Applications et outils {#apps-and-tooling}

La couche d'application prend en charge un écosystème diversifié de programmes qui règlent les transactions sur la couche de base d'Ethereum. Les équipes de développement trouvent constamment de nouvelles façons de tirer parti d'Ethereum pour créer des versions composables, sans permission et résistantes à la censure d'applications Web2 importantes ou pour créer des concepts natifs du Web3 complètement nouveaux. Dans le même temps, de nouveaux outils sont développés pour rendre la création d'applications décentralisées (dapps) sur Ethereum moins complexe.

### DeFi {#defi}

La finance décentralisée (DeFi) est l'une des principales classes d'applications construites sur Ethereum. La DeFi vise à créer des "legos monétaires" composables qui permettent aux utilisateurs de stocker, transférer, prêter, emprunter et investir des crypto-actifs à l'aide de contrats intelligents. La DeFi est un espace en évolution rapide qui se met constamment à jour. La recherche de protocoles sécurisés, efficaces et accessibles est continuellement nécessaire.

#### Lectures de base {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase : Qu'est-ce que la DeFi ?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Recherches récentes {#recent-research-15}

- [Finance décentralisée, propriété centralisée ?](https://arxiv.org/pdf/2012.09306.pdf)
- [Applications sur Ethresear.ch](https://ethresear.ch/c/applications/18)

### DAO {#daos}

Un cas d'utilisation percutant pour Ethereum est la capacité de s'organiser de manière décentralisée grâce à l'utilisation de DAO. Il y a beaucoup de recherches actives sur la façon dont les DAO sur Ethereum peuvent être développées et utilisées pour exécuter des formes améliorées de gouvernance, en tant qu'outil de coordination à confiance minimisée, élargissant considérablement les options des personnes au-delà des entreprises et organisations traditionnelles.

#### Lectures de base {#background-reading-16}

- [Introduction aux DAO](/dao/)

#### Recherches récentes {#recent-research-16}

- [Cartographie de l'écosystème des DAO](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Outils de développement {#developer-tools}

Les outils pour les développeurs Ethereum s'améliorent rapidement. Il y a beaucoup de recherche et développement actifs à faire dans ce domaine général.

#### Lectures de base {#background-reading-17}

- [Outils par langage de programmation](/developers/docs/programming-languages/)
- [Cadres de développement](/developers/docs/frameworks/)
- [Introduction aux applications décentralisées (dapps)](/developers/docs/dapps/)
- [Normes de jetons](/developers/docs/standards/tokens/)

#### Recherches récentes {#recent-research-17}

- [Discord Eth R&D](https://discord.gg/qGpsxSA)
- [Spécifications de l'API d'exécution d'Ethereum](https://github.com/ethereum/execution-apis)

### Oracles {#oracles}

Les oracles importent des données hors chaîne sur la chaîne de blocs de manière décentralisée et sans permission. L'obtention de ces données onchain permet aux applications décentralisées (dapps) d'être réactives aux phénomènes du monde réel tels que les fluctuations de prix des actifs du monde réel, les événements dans les applications hors chaîne, ou même les changements météorologiques.

#### Lectures de base {#background-reading-18}

- [Introduction aux oracles](/developers/docs/oracles/)

#### Recherches récentes {#recent-research-18}

- [Enquête sur les oracles de chaîne de blocs](https://arxiv.org/pdf/2004.07140.pdf)

### Sécurité des applications {#app-security}

Les piratages sur Ethereum exploitent généralement des vulnérabilités dans des applications individuelles plutôt que dans le protocole lui-même. Les pirates et les développeurs d'applications sont engagés dans une course aux armements pour développer de nouvelles attaques et défenses. Cela signifie qu'il y a toujours d'importants travaux de recherche et développement nécessaires pour protéger les applications contre les piratages.

#### Lectures de base {#background-reading-19}

- [Sécurité des contrats intelligents](/developers/docs/smart-contracts/security/)
- [Rapport sur l'exploitation de Wormhole](https://www.chainalysis.com/blog/wormhole-hack-february-2022/)
- [Liste des post-mortems de piratages de contrats Ethereum](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://rekt.news/)

#### Recherches récentes {#recent-research-19}

- [Applications sur Ethresear.ch](https://ethresear.ch/c/applications/18)

### Pile technologique {#technology-stack}

La décentralisation de l'ensemble de la pile technologique d'Ethereum est un domaine de recherche important. Actuellement, les applications décentralisées (dapps) sur Ethereum ont généralement des points de centralisation car elles s'appuient sur des outils ou des infrastructures centralisés. Réduire cette dépendance signifie rendre pratique pour les applications de lire Ethereum sans faire confiance à un seul fournisseur, c'est là qu'interviennent les clients légers et l'accès sans tiers de confiance aux données des nœuds.

#### Lectures de base {#background-reading-20}

- [Pile Ethereum](/developers/docs/ethereum-stack/)
- [Clients légers](/developers/docs/nodes-and-clients/light-clients/)
- [Introduction aux contrats intelligents](/developers/docs/smart-contracts/)
- [Introduction au stockage décentralisé](/developers/docs/storage/)

#### Recherches récentes {#recent-research-20}

- [Composabilité des contrats intelligents](/developers/docs/smart-contracts/composability/)
- [Coinbase : Introduction à la pile Web3](https://www.coinbase.com/blog/a-simple-guide-to-the-web3-stack)