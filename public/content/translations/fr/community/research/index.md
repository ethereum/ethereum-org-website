---
title: Domaines actifs de la recherche sur Ethereum
description: Explorez différents domaines de la recherche ouverte et découvrez comment vous impliquer.
lang: fr
---

L'une des principales forces d'Ethereum est qu'une communauté active de recherche et d'ingénierie l'améliore constamment. De nombreuses personnes enthousiastes et qualifiées dans le monde entier aimeraient s'attaquer aux problèmes en suspens d'Ethereum, mais il n'est pas toujours facile de savoir quels sont ces problèmes. Cette page décrit les principaux domaines de recherche actifs pour vous donner un aperçu des avancées technologiques d'Ethereum.

## Comment fonctionne la recherche sur Ethereum {#how-ethereum-research-works}

La recherche sur Ethereum est ouverte et transparente, incarnant les principes de la [science décentralisée (DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science). La culture consiste à rendre les outils et les résultats de recherche aussi ouverts et interactifs que possible, par exemple, par le biais de carnets de notes exécutables. La recherche sur Ethereum évolue rapidement, les nouvelles découvertes étant publiées et discutées ouvertement sur des forums tels que [ethresear.ch](https://ethresear.ch/) plutôt que d'atteindre la communauté par le biais de publications traditionnelles après des cycles d'évaluation par les pairs.

## Ressources générales de recherche {#general-research-resources}

Quel que soit le sujet spécifique, vous trouverez une mine d'informations sur la recherche sur Ethereum sur [ethresear.ch](https://ethresear.ch) et sur le [canal Discord Eth R&D](https://discord.gg/qGpsxSA). Ce sont les principaux endroits où les chercheurs d'Ethereum discutent des dernières idées et des opportunités de développement.

Ce rapport publié en mai 2022 par [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) fournit un bon aperçu de la feuille de route d'Ethereum.

## Sources de financement {#sources-of-funding}

Vous pouvez vous impliquer dans la recherche sur Ethereum et être rémunéré pour cela ! Par exemple, [la Fondation Ethereum](/foundation/) a récemment organisé un [cycle de financement de subventions académiques](https://esp.ethereum.foundation/academic-grants). Vous trouverez des informations sur les opportunités de financement actives et à venir sur [la page des subventions d'Ethereum](/community/grants/).

## Recherche sur le protocole {#protocol-research}

La recherche sur le protocole concerne la couche de base d'Ethereum - l'ensemble des règles définissant la manière dont les nœuds se connectent, communiquent, échangent et stockent les données d'Ethereum et parviennent à un consensus sur l'état de la chaîne de blocs. La recherche sur le protocole se divise en deux catégories principales : le consensus et l'exécution.

### Consensus {#consensus}

La recherche sur le consensus concerne le [mécanisme de preuve d'enjeu (PoS) d'Ethereum](/developers/docs/consensus-mechanisms/pos/). Voici quelques exemples de sujets de recherche sur le consensus :

- l'identification et la correction des vulnérabilités ;
- la quantification de la sécurité de la cryptoéconomie ;
- l'augmentation de la sécurité ou des performances des implémentations de clients ;
- et le développement de clients légers.

Outre la recherche prospective, certaines refontes fondamentales du protocole, telles que la finalité à slot unique, sont à l'étude pour permettre des améliorations significatives d'Ethereum. De plus, l'efficacité, la sécurité et la surveillance de la mise en réseau pair à pair entre les clients de consensus sont également des sujets de recherche importants.

#### Lectures de base {#background-reading}

- [Introduction à la preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/)
- [Article sur Casper FFG](https://arxiv.org/abs/1710.09437)
- [Explication de Casper FFG](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Article sur Gasper](https://arxiv.org/abs/2003.03052)

#### Recherches récentes {#recent-research}

- [Consensus sur Ethresear.ch](https://ethresear.ch/c/consensus/29)
- [Dilemme disponibilité/finalité](https://arxiv.org/abs/2009.04987)
- [Finalité à slot unique](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [Séparation proposant-constructeur (PBS)](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Exécution {#execution}

La couche d'exécution concerne l'exécution des transactions, le fonctionnement de la [machine virtuelle Ethereum (EVM)](/developers/docs/evm/) et la génération de charges utiles d'exécution à transmettre à la couche de consensus. Il existe de nombreux domaines de recherche actifs, notamment :

- le développement de la prise en charge des clients légers ;
- la recherche sur les limites de gaz ;
- et l'intégration de nouvelles structures de données (par exemple, les arbres Verkle).

#### Lectures de base {#background-reading-1}

- [Introduction à l'EVM](/developers/docs/evm)
- [Couche d'exécution sur Ethresear.ch](https://ethresear.ch/c/execution-layer-research/37)

#### Recherches récentes {#recent-research-1}

- [Optimisations de la base de données](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [Expiration d'état](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [Voies vers l'expiration d'état](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Proposition sur Verkle et l'expiration d'état](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [Gestion de l'historique](https://eips.ethereum.org/EIPS/eip-4444)
- [Arbres Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Échantillonnage de la disponibilité des données](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## Développement de clients {#client-development}

Les clients Ethereum sont des implémentations du protocole Ethereum. Le développement de clients concrétise les résultats de la recherche sur le protocole en les intégrant à ces clients. Le développement de clients comprend la mise à jour des spécifications des clients ainsi que la création d'implémentations spécifiques.

Un nœud Ethereum doit exécuter deux logiciels :

1. un client de consensus pour suivre la tête de la chaîne de blocs, diffuser les blocs et gérer la logique de consensus
2. un client d'exécution pour prendre en charge la machine virtuelle Ethereum et exécuter les transactions et les contrats intelligents

Consultez la [page sur les nœuds et les clients](/developers/docs/nodes-and-clients/) pour plus de détails sur les nœuds et les clients et pour obtenir une liste de toutes les implémentations de clients actuelles. Vous pouvez également trouver un historique de toutes les mises à jour d'Ethereum sur la [page d'historique](/ethereum-forks/).

### Clients d'exécution {#execution-clients}

- [Spécification du client d'exécution](https://github.com/ethereum/execution-specs)
- [Spécification de l'API d'exécution](https://github.com/ethereum/execution-apis)

### Clients de consensus {#consensus-clients}

- [Spécification du client de consensus](https://github.com/ethereum/consensus-specs)
- [Spécification de l'API de la chaîne balise](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## Mise à l'échelle et performances {#scaling-and-performance}

La mise à l'échelle d'Ethereum est un domaine d'intérêt majeur pour les chercheurs d'Ethereum. Les approches actuelles incluent le déchargement des transactions sur des rollup et la réduction de leur coût au maximum en utilisant des blobs de données. Des informations introductives sur la mise à l'échelle d'Ethereum sont disponibles sur notre [page sur la mise à l'échelle](/developers/docs/scaling).

### Couche 2 {#layer-2}

Il existe désormais plusieurs protocoles de couche 2 (l2) qui mettent à l'échelle Ethereum en utilisant différentes techniques pour le traitement par lots des transactions et leur sécurisation sur la couche 1 (l1) d'Ethereum. Il s'agit d'un sujet en croissance très rapide avec un fort potentiel de recherche et développement.

#### Lectures de base {#background-reading-2}

- [Introduction à la couche 2](/layer-2/)
- [Polynya : Rollup, DA et chaînes modulaires](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### Recherches récentes {#recent-research-2}

- [Ordonnancement équitable d'Arbitrum pour les séquenceurs](https://eprint.iacr.org/2021/1465)
- [Couche 2 sur Ethresear.ch](https://ethresear.ch/c/layer-2/32)
- [Feuille de route centrée sur les rollup](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2BEAT](https://l2beat.com/)

### Ponts {#bridges}

Un domaine particulier de la couche 2 qui nécessite davantage de recherche et développement est celui des ponts sûrs et performants. Cela inclut les ponts entre différentes couches 2 et les ponts entre la couche 1 et la couche 2. Il s'agit d'un domaine de recherche particulièrement important car les ponts sont couramment ciblés par les pirates informatiques.

#### Lectures de base {#background-reading-3}

- [Introduction aux ponts de chaînes de blocs](/bridges/)
- [Vitalik sur les ponts](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [Article sur les ponts de chaînes de blocs](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [Valeur verrouillée dans les ponts](<https://dune.com/eliasimos/Bridge-Away-(from-Ethereum)>)

#### Recherches récentes {#recent-research-3}

- [Validation des ponts](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### Fragmentation {#sharding}

La fragmentation (sharding) de la chaîne de blocs d'Ethereum fait depuis longtemps partie de la feuille de route de développement. Cependant, de nouvelles solutions de mise à l'échelle telles que le « danksharding » occupent actuellement le devant de la scène.

Le précurseur du danksharding complet, connu sous le nom de proto-danksharding, a été mis en ligne avec la mise à jour Dencun (Cancun-Deneb) du réseau.

[En savoir plus sur la mise à jour Dencun](/roadmap/dencun/)

#### Lectures de base {#background-reading-4}

- [Notes sur le proto-danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Vidéo de Bankless sur le danksharding](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Recueil de recherche sur la fragmentation d'Ethereum](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [Danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### Recherches récentes {#recent-research-4}

- [EIP-4844 : Proto-danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [Vitalik sur la fragmentation et l'échantillonnage de la disponibilité des données](https://hackmd.io/@vbuterin/sharding_proposal)

### Matériel {#hardware}

[L'exécution de nœuds](/developers/docs/nodes-and-clients/run-a-node/) sur du matériel modeste est fondamentale pour maintenir Ethereum décentralisé. Par conséquent, la recherche active visant à minimiser les exigences matérielles pour exécuter des nœuds est un domaine de recherche important.

#### Lectures de base {#background-reading-5}

- [Ethereum sur ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Recherches récentes {#recent-research-5}

- [ECDSA sur FPGA](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## Sécurité {#security}

La sécurité est un vaste sujet qui peut inclure la prévention du spam/des arnaques, la sécurité des portefeuilles, la sécurité matérielle, la sécurité cryptoéconomique, la chasse aux bugs et les tests d'applications et de logiciels clients, ainsi que la gestion des clés. Contribuer aux connaissances dans ces domaines aidera à stimuler l'adoption par le grand public.

### Cryptographie et ZKP {#cryptography--zkp}

Les preuves à divulgation nulle de connaissance (ZKP) et la cryptographie sont essentielles pour intégrer la confidentialité et la sécurité dans Ethereum et ses applications. Le domaine à divulgation nulle de connaissance est relativement jeune mais évolue rapidement, offrant de nombreuses opportunités de recherche et développement ouvertes. Certaines possibilités incluent le développement d'implémentations plus efficaces de l'[algorithme de hachage Keccak](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview), la recherche de meilleurs engagements polynomiaux que ceux existant actuellement ou la réduction du coût de la génération de clés publiques ECDSA et des circuits de vérification de signature.

#### Lectures de base {#background-reading-6}

- [Blog 0xparc](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [Podcast Zero Knowledge](https://zeroknowledge.fm/)

#### Recherches récentes {#recent-research-6}

- [Avancées récentes dans la cryptographie sur les courbes elliptiques](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [ZK sur Ethresear.ch](https://ethresear.ch/c/zk-s-nt-arks/13)

### Portefeuilles {#wallets}

Les portefeuilles Ethereum peuvent être des extensions de navigateur, des applications de bureau et mobiles ou des contrats intelligents sur Ethereum. Des recherches actives sont menées sur les portefeuilles à récupération sociale qui réduisent une partie des risques associés à la gestion des clés par les utilisateurs individuels. Associée au développement des portefeuilles, la recherche sur des formes alternatives d'abstraction de compte constitue un domaine important de recherche naissante.

#### Lectures de base {#background-reading-7}

- [Introduction aux portefeuilles](/wallets/)
- [Introduction à la sécurité des portefeuilles](/security/)
- [Sécurité sur Ethresear.ch](https://ethresear.ch/tag/security)
- [EIP-2938 : Abstraction de compte](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337 : Abstraction de compte](https://eips.ethereum.org/EIPS/eip-4337)

#### Recherches récentes {#recent-research-7}

- [Portefeuilles de contrats intelligents axés sur la validation](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [L'avenir des comptes](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [EIP-3074 : Opcodes AUTH et AUTHCALL](https://eips.ethereum.org/EIPS/eip-3074)
- [Publication de code à une adresse EOA](https://eips.ethereum.org/EIPS/eip-5003)

## Communauté, éducation et sensibilisation {#community-education-and-outreach}

L'intégration de nouveaux utilisateurs sur Ethereum nécessite de nouvelles ressources éducatives et de nouvelles approches de sensibilisation. Cela peut inclure des articles de blog, des livres, des podcasts, des mèmes, des ressources pédagogiques, des événements et tout ce qui permet de créer des communautés, d'accueillir les nouveaux arrivants et d'éduquer les gens sur Ethereum.

### UX/UI {#uxui}

Pour intégrer davantage de personnes sur Ethereum, l'écosystème doit améliorer l'UX/UI. Cela nécessitera que les concepteurs et les experts produits réexaminent la conception des portefeuilles et des applications.

#### Lectures de base {#background-reading-8}

- [UX/UI sur Ethresear.ch](https://ethresear.ch/c/ui-ux/24)

#### Recherches récentes {#recent-research-8}

- [Discord Web3 Design](https://discord.gg/FsCFPMTSm9)
- [Principes de conception Web3](https://www.web3designprinciples.com/)
- [Discussion sur l'UX d'Ethereum Magicians](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### Économie {#economics}

La recherche économique sur Ethereum suit globalement deux approches : valider la sécurité des mécanismes reposant sur des incitations économiques (« microéconomie ») et analyser les flux de valeur entre les protocoles, les applications et les utilisateurs (« macroéconomie »). Il existe des facteurs cryptoéconomiques complexes liés à l'actif natif d'Ethereum (l'ether) et aux jetons construits par-dessus (par exemple, les NFT et les jetons ERC-20).

#### Lectures de base {#background-reading-9}

- [Robust Incentives Group](https://rig.ethereum.org/)
- [Atelier ETHconomics à Devconnect](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### Recherches récentes {#recent-research-9}

- [Analyse empirique de l'EIP-1559](https://arxiv.org/abs/2201.05574)
- [Équilibre de l'offre en circulation](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [Quantification de la MEV : À quel point la forêt est-elle sombre ?](https://arxiv.org/abs/2101.05511)

### Espace de bloc et marchés des frais {#blockspace-fee-markets}

Les marchés d'espace de bloc régissent l'inclusion des transactions des utilisateurs finaux, soit directement sur Ethereum (couche 1), soit sur des réseaux pontés, par exemple les rollup (couche 2). Sur Ethereum, les transactions sont soumises au marché des frais déployé dans le protocole sous le nom d'EIP-1559, protégeant la chaîne du spam et fixant le prix de la congestion. Sur les deux couches, les transactions peuvent produire des externalités, connues sous le nom de valeur maximale extractible (MEV), qui induisent de nouvelles structures de marché pour capturer ou gérer ces externalités.

#### Lectures de base {#background-reading-10}

- [Conception du mécanisme de frais de transaction pour la chaîne de blocs Ethereum : Une analyse économique de l'EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [Simulations de l'EIP-1559 (Robust Incentives Group)](https://ethereum.github.io/abm1559)
- [Économie des rollup à partir des principes fondamentaux](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0 : Frontrunning, réorganisation des transactions et instabilité du consensus dans les échanges décentralisés](https://arxiv.org/abs/1904.05234)

#### Recherches récentes {#recent-research-10}

- [Présentation vidéo de l'EIP-1559 multidimensionnel](https://youtu.be/QbR4MTgnCko)
- [MEV inter-domaines](https://arxiv.org/abs/2112.01472)
- [Enchères MEV](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### Incitations de la preuve d'enjeu {#proof-of-stake-incentives}

Les validateurs utilisent l'actif natif d'Ethereum (l'ether) comme collatéral contre les comportements malhonnêtes. La cryptoéconomie de ce système détermine la sécurité du réseau. Des validateurs sophistiqués pourraient être en mesure d'exploiter les nuances de la couche d'incitation pour lancer des attaques explicites.

#### Lectures de base {#background-reading-11}

- [Masterclass sur l'économie d'Ethereum et modèle économique](https://github.com/CADLabs/ethereum-economic-model)
- [Simulations des incitations PoS (Robust Incentives Group)](https://ethereum.github.io/beaconrunner/)

#### Recherches récentes {#recent-research-11}

- [Augmentation de la résistance à la censure des transactions dans le cadre de la séparation proposant-constructeur (PBS)](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [Trois attaques sur l'Ethereum PoS](https://arxiv.org/abs/2110.10086)

### Staking liquide et dérivés {#liquid-staking-and-derivatives}

Le staking liquide permet aux utilisateurs possédant moins de 32 ETH de recevoir des rendements de staking en échangeant de l'ether contre un jeton représentant l'ether mis en jeu qui peut être utilisé dans la DeFi. Cependant, les incitations et la dynamique de marché associées au staking liquide sont encore en cours de découverte, tout comme son effet sur la sécurité d'Ethereum (par exemple, les risques de centralisation).

#### Lectures de base {#background-reading-12}

- [Staking liquide sur Ethresear.ch](https://ethresear.ch/search?q=liquid%20staking)
- [Lido : La voie vers un staking Ethereum sans tiers de confiance](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool : Introduction au protocole de staking](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### Recherches récentes {#recent-research-12}

- [Gestion des retraits de Lido](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [Identifiants de retrait](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [Les risques des dérivés de staking liquide](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Tests {#testing}

### Vérification formelle {#formal-verification}

La vérification formelle consiste à écrire du code pour vérifier que les spécifications de consensus d'Ethereum sont correctes et exemptes de bugs. Il existe une version exécutable de la spécification écrite en Python qui nécessite de la maintenance et du développement. Des recherches supplémentaires peuvent aider à améliorer l'implémentation Python de la spécification et à ajouter des outils capables de vérifier plus solidement l'exactitude et d'identifier les problèmes.

#### Lectures de base {#background-reading-13}

- [Introduction à la vérification formelle](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [Vérification formelle (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Recherches récentes {#recent-research-13}

- [Vérification formelle du contrat de dépôt](https://github.com/runtimeverification/deposit-contract-verification)
- [Vérification formelle de la spécification de la chaîne balise](https://github.com/runtimeverification/deposit-contract-verification)

## Science des données et analytique {#data-science-and-analytics}

Il y a un besoin de plus d'outils d'analyse de données et de tableaux de bord qui fournissent des informations détaillées sur l'activité sur Ethereum et la santé du réseau.

### Lectures de base {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [Tableau de bord de la diversité des clients](https://clientdiversity.org/)

#### Recherches récentes {#recent-research-14}

- [Analyse de données du Robust Incentives Group](https://rig.ethereum.org/)

## Applications et outils {#apps-and-tooling}

La couche d'application prend en charge un écosystème diversifié de programmes qui règlent les transactions sur la couche de base d'Ethereum. Les équipes de développement trouvent constamment de nouvelles façons de tirer parti d'Ethereum pour créer des versions composables, sans permission et résistantes à la censure d'applications Web2 importantes ou pour créer des concepts natifs du Web3 complètement nouveaux. Dans le même temps, de nouveaux outils sont développés pour rendre la création de dapp sur Ethereum moins complexe.

### DeFi {#defi}

La finance décentralisée (DeFi) est l'une des principales classes d'applications construites sur Ethereum. La DeFi vise à créer des « legos monétaires » composables qui permettent aux utilisateurs de stocker, transférer, prêter, emprunter et investir des crypto-actifs à l'aide de contrats intelligents. La DeFi est un espace en évolution rapide qui se met constamment à jour. La recherche de protocoles sécurisés, efficaces et accessibles est continuellement nécessaire.

#### Lectures de base {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase : Qu'est-ce que la DeFi ?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Recherches récentes {#recent-research-15}

- [Finance décentralisée, propriété centralisée ?](https://arxiv.org/pdf/2012.09306.pdf)
- [Optimism : La voie vers des transactions à moins d'un dollar](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### DAO {#daos}

Un cas d'utilisation percutant pour Ethereum est la capacité de s'organiser de manière décentralisée grâce à l'utilisation de DAO. De nombreuses recherches actives portent sur la manière dont les DAO sur Ethereum peuvent être développées et utilisées pour exécuter des formes améliorées de gouvernance, en tant qu'outil de coordination à confiance minimisée, élargissant considérablement les options des personnes au-delà des entreprises et organisations traditionnelles.

#### Lectures de base {#background-reading-16}

- [Introduction aux DAO](/dao/)
- [DAO Collective](https://daocollective.xyz/)

#### Recherches récentes {#recent-research-16}

- [Cartographie de l'écosystème des DAO](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Outils pour développeurs {#developer-tools}

Les outils pour les développeurs Ethereum s'améliorent rapidement. Il y a beaucoup de recherche et développement actifs à faire dans ce domaine général.

#### Lectures de base {#background-reading-17}

- [Outils par langage de programmation](/developers/docs/programming-languages/)
- [Frameworks de développement](/developers/docs/frameworks/)
- [Liste des outils pour développeurs de consensus](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [Normes de jetons](/developers/docs/standards/tokens/)
- [CryptoDevHub : Outils EVM](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### Recherches récentes {#recent-research-17}

- [Canal Discord Eth R&D sur les outils de consensus](https://discordapp.com/channels/595666850260713488/746343380900118528)

### Oracles {#oracles}

Les oracles importent des données hors chaîne sur la chaîne de blocs de manière décentralisée et sans permission. L'obtention de ces données onchain permet aux dapp d'être réactives aux phénomènes du monde réel tels que les fluctuations de prix des actifs du monde réel, les événements dans les applications hors chaîne, ou même les changements météorologiques.

#### Lectures de base {#background-reading-18}

- [Introduction aux oracles](/developers/docs/oracles/)

#### Recherches récentes {#recent-research-18}

- [Enquête sur les oracles de chaînes de blocs](https://arxiv.org/pdf/2004.07140.pdf)
- [Livre blanc de Chainlink](https://chain.link/whitepaper)

### Sécurité des applications {#app-security}

Les piratages sur Ethereum exploitent généralement des vulnérabilités dans des applications individuelles plutôt que dans le protocole lui-même. Les pirates informatiques et les développeurs d'applications sont engagés dans une course aux armements pour développer de nouvelles attaques et défenses. Cela signifie qu'il y a toujours d'importants travaux de recherche et développement nécessaires pour protéger les applications contre les piratages.

#### Lectures de base {#background-reading-19}

- [Rapport sur l'exploitation de Wormhole](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [Liste des post-mortems de piratages de contrats Ethereum](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://x.com/RektHQ?s=20&t=3otjYQdM9Bqk8k3n1a1Adg)

#### Recherches récentes {#recent-research-19}

- [Applications sur Ethresear.ch](https://ethresear.ch/c/applications/18)

### Pile technologique {#technology-stack}

La décentralisation de l'ensemble de la pile technologique d'Ethereum est un domaine de recherche important. Actuellement, les dapp sur Ethereum ont souvent des points de centralisation car elles s'appuient sur des outils ou des infrastructures centralisés.

#### Lectures de base {#background-reading-20}

- [Pile Ethereum](/developers/docs/ethereum-stack/)
- [Coinbase : Introduction à la pile Web3](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [Introduction aux contrats intelligents](/developers/docs/smart-contracts/)
- [Introduction au stockage décentralisé](/developers/docs/storage/)

#### Recherches récentes {#recent-research-20}

- [Composabilité des contrats intelligents](/developers/docs/smart-contracts/composability/)