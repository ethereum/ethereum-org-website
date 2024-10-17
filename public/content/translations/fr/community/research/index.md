---
title: Les domaines de recherche actifs d'Ethereum
description: Explorez les différents domaines de la recherche ouverte et apprenez comment y participer.
lang: fr
---

# Domaines actifs de recherche d'Ethereum {#active-areas-of-ethereum-research}

L’un des principaux atouts d’Ethereum réside dans le fait qu’une communauté active de chercheurs et d'ingénieurs l’améliore constamment. De nombreuses personnes enthousiastes et compétentes dans le monde entier aimeraient s’attaquer aux problèmes en suspens dans Ethereum, mais il n’est pas toujours facile de savoir de quoi il s’agit. Cette page présente les principaux domaines de recherche actifs afin de donner une idée de l'état d'avancement d'Ethereum.

## Comment fonctionne la recherche sur Ethereum {#how-ethereum-research-works}

La recherche sur Ethereum est ouverte et transparente et incarne les principes de la [Science décentralisée (DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science). La culture consiste à rendre les outils et les résultats de la recherche aussi ouverts et interactifs que possible, par exemple au moyen des carnets exécutables. La recherche sur Ethereum évolue rapidement, avec de nouveaux résultats publiés et discutés ouvertement sur des forums tels que [ethresear.ch](https://ethresear.ch/) plutôt que d'atteindre la communauté via des publications traditionnelles après des cycles d'évaluation par les pairs.

## Ressources de recherche générales {#general-research-resources}

Quel que soit le sujet spécifique, vous trouverez une multitude d'informations sur la recherche Ethereum sur [ethresear.ch](https://ethresear.ch) et sur la [chaîne Discord Eth R&D](https://discord.gg/qGpsxSA). Ce sont les principaux endroits où les chercheurs d’Ethereum discutent des dernières idées et opportunités de développement.

Ce rapport publié en mai 2022 par [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) donne un bon aperçu de la feuille de route d'Ethereum.

## Sources de financement {#sources-of-funding}

Vous pouvez vous impliquer dans la recherche sur Ethereum et être payé pour cela ! Par exemple, la [Fondation Ethereum](/foundation/) a récemment organisé un [cycle de financement de subventions académiques](https://esp.ethereum.foundation/academic-grants). Vous pouvez trouver des informations sur les opportunités de financement actives et à venir sur [la page des subventions Ethereum](/community/grants/).

## Recherche sur les protocoles {#protocol-research}

La recherche sur les protocoles concerne la couche de base d'Ethereum - l'ensemble de règles définissant la manière dont les nœuds se connectent, communiquent, échangent et stockent les données Ethereum et parviennent à un consensus sur l'état de la blockchain. La recherche sur les protocoles est divisée en deux catégories de premier niveau : le consensus et l'exécution.

### Consensus {#consensus}

La recherche sur le consensus concerne le [mécanisme de preuve d'enjeu d'Ethereum](/developers/docs/consensus-mechanisms/pos/). Voici quelques exemples de sujets de recherche sur le consensus :

- identifier et corriger les vulnérabilités;
- quantifier la sécurité crypto-économique;
- accroître la sécurité ou la performance des implémentations des clients;
- et développer des clients légers.

Outre des recherches prospectives, certaines refontes fondamentales du protocole, telles que la finalité d'un créneau unique, sont en cours de recherche en vue d'apporter des améliorations significatives à Ethereum. En outre, l’efficacité, la sécurité et la surveillance des réseaux peer-to-peer entre clients consensuels sont également des sujets de recherche importants.

#### Lecture de fond {#background-reading}

- Introduction à la preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/)
- [Article Casper-FFG](https://arxiv.org/abs/1710.09437)
- [Explication Casper-FFG](https://arxiv.org/abs/1710.09437)
- [Article Gasper](https://arxiv.org/abs/2003.03052)

#### Recherche récente {#recent-research}

- [Consensus Ethresear.ch](https://ethresear.ch/c/consensus/29)
- [Dilemme Disponibilité/Finalité](https://arxiv.org/abs/2009.04987)
- [Finalité du créneau unique](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [Séparation proposant-constructeur](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Exécution {#execution}

La couche d'exécution est chargée d'exécuter les transactions, d'exécuter la [machine virtuelle Ethereum (EVM)](/developers/docs/evm/) et de générer des charges utiles d'exécution à transmettre à la couche de consensus. Il existe de nombreux domaines de recherche actifs, notamment :

- développement d'un support client léger ;
- Recherche sur les limites de gaz ;
- et incorporation de nouvelles structures de données (exemple : Verkle Tries).

#### Lecture de fond {#background-reading-1}

- [Présentation de l'EVM](/developers/docs/evm)
- [Couche d'exécution Ethresear.ch](https://ethresear.ch/c/execution-layer-research/37)

#### Recherche récente {#recent-research-1}

- [Optimisations de la base de données](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [Expiration de l'état](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [Chemins vers l'expiration de l'état](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Proposition d'expiration de Verkle et de l'état](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [Gestion de l'historique](https://eips.ethereum.org/EIPS/eip-4444)
- [Arbres de Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Échantillonnage de disponibilité des données](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## Développement client {#client-development}

Les clients Ethereum sont des implémentations du protocole Ethereum. Le développement client concrétise les résultats de la recherche de protocoles en les intégrant à ces clients. Le développement client comprend la mise à jour des spécifications du client ainsi que l'élaboration d'implémentations spécifiques.

Un nœud Ethereum est nécessaire pour faire fonctionner deux logiciels :

1. un client de consensus chargé de suivre la tête de la blockchain, de propager les blocs et de gérer la logique de consensus
2. un client d'exécution permettant de prendre en charge la machine virtuelle Ethereum et d'exécuter des transactions et des contrats intelligents

Voir la [page des nœuds et des clients] (/developers/docs/nodes-and-clients/) pour plus de détails sur les nœuds et les clients et pour une liste de toutes les implémentations clients actuelles. Vous pouvez également consulter l'historique de toutes les mises à jour d'Ethereum sur la [page Historique](/history/).

### Clients d'exécution {#execution-clients}

- [Spécification du client d'exécution](https://github.com/ethereum/execution-specs)
- [Spécification de l'API d'exécution](https://github.com/ethereum/execution-apis)

### Clients de consensus {#consensus-clients}

- [Spécification du client de consensus](https://github.com/ethereum/consensus-specs)
- [Spécification de l'API de la chaîne phare](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## Évolutivité et performance {#scaling-and-performance}

La mise à l'échelle d'Ethereum est un domaine d'intérêt majeur pour les chercheurs d'Ethereum. Les approches actuelles consistent à décharger les transactions sur des rollups et à les rendre aussi bon marché que possible en utilisant des blobs de données. Des informations préliminaires sur la mise à l'échelle d'Ethereum sont disponibles sur notre [page Évolutivité](/developers/docs/scaling).

### Seconde couche {#layer-2}

Il existe aujourd'hui plusieurs protocoles de seconde couche qui permettent de mettre à l'échelle Ethereum en utilisant différentes techniques pour regrouper les transactions et les sécuriser sur la couche de niveau 1 d'Ethereum. Il s'agit d'un sujet en pleine expansion qui présente un grand potentiel de recherche et de développement.

#### Lectures de référence {#background-reading-2}

- [Introduction à la seconde couche](/layer-2/)
- [Polynya : Rollups, DA et chaînes modulaires](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### Recherche récente {#recent-research-2}

- [Ordre équitable pour les séquenceurs d'Arbitrum](https://eprint.iacr.org/2021/1465)
- [ethresear.ch Seconde couche](https://ethresear.ch/c/layer-2/32)
- [Feuille de route axée sur le rollup](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2Beat](https://l2beat.com/)

### Ponts {#bridges}

Un domaine particulier de la couche 2 qui nécessite davantage de recherche et de développement porte sur les ponts sûrs et performants. Cela inclut les ponts entre diverses couches de niveau 2 ainsi que les ponts entre la couche de niveau 1 et la seconde couche. C'est un domaine de recherche particulièrement important car les ponts sont fréquemment ciblés par les pirates informatiques.

#### Lectures de référence {#background-reading-3}

- [Introduction aux ponts blockchain](/bridges/)
- [Vitalik à propos des ponts](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [Articles sur les ponts dans la Blockchain](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [Valeu verrouillée dans les ponts](https://dune.com/eliasimos/Bridge-Away-\(from-Ethereum\))

#### Recherche récente {#recent-research-3}

- [Valider les ponts](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### Fragmentation {#sharding}

La fragmentation de la blockchain Ethereum fait partie de la feuille de route de développement depuis longtemps. Cependant, de nouvelles solutions de mise à l'échelle telles que « Danksharding » occupent actuellement le devant de la scène.

Le précurseur du Danksharding, connu sous le nom de Proto-Danksharding, a été mis en service avec la mise à jour du réseau Cancun-Deneb ("Dencun").

[En savoir plus sur la mise à jour Dencun](/roadmap/dencun/)

#### Lectures de référence {#background-reading-4}

- [Notes sur le Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Vidéo de Bankless sur le Danksharding](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Abrégé de recherche sur la fragmentation d'Ethereum](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [Danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### Recherche récente {#recent-research-4}

- [EIP-4844: Proto-Danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [Vitalik sur la fragmentation et l'échantillonnage de la disponibilité des données](https://hackmd.io/@vbuterin/sharding_proposal)

### Matériel {#hardware}

[Exécuter des nœuds](/developers/docs/nodes-and-clients/run-a-node/) sur du matériel modeste est fondamental pour maintenir la décentralisation d'Ethereum. C'est pourquoi la recherche active visant à minimiser les besoins en matériel pour faire fonctionner les nœuds est un domaine de recherche important.

#### Lectures de référence {#background-reading-5}

- [Ethereum sur ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Recherche récente {#recent-research-5}

- [ecdsa sur FPGA](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## Sécurité {#security}

La sécurité est un vaste sujet qui peut inclure la prévention des spams et des escroqueries, la sécurité des portefeuilles, la sécurité matérielle, la sécurité crypto-économique, la recherche de bogues et les tests d'applications et de logiciels clients, ainsi que la gestion des clés. La contribution aux connaissances dans ces domaines permettra de stimuler l'adoption par le grand public.

### Cryptographie & ZKP {#cryptography--zkp}

Les preuves à divulgation nulle de connaissance (ZKP) et la cryptographie sont essentielles pour intégrer la confidentialité et la sécurité dans Ethereum et ses applications. Le domaine de la divulgation nulle de connaissance est relativement récent mais évolue rapidement et offre de nombreuses possibilités de recherche et de développement. Parmi les possibilités, citons le développement d'implémentations plus efficaces de [l'algorithme Keccak de hachage](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview), la recherche de meilleurs engagements polynomiaux que ceux qui existent actuellement ou la réduction du coût des circuits de génération de clés publiques ecdsa et de vérification des signatures.

#### Lectures de référence {#background-reading-6}

- [blog de 0xparc](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [Podcast Zero Knowledge](https://zeroknowledge.fm/)

#### Recherche récente {#recent-research-6}

- [Avancées récentes en cryptographie à courbes elliptiques](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [Ethresear.ch ZK](https://ethresear.ch/c/zk-s-nt-arks/13)

### Portefeuilles {#wallets}

Les portefeuilles Ethereum peuvent être des extensions de navigateur, des applications de bureau et mobiles ou des contrats intelligents sur Ethereum. Des recherches sont en cours sur les portefeuilles de récupération sociale permettant de réduire certains des risques associés à la gestion des clés par l'utilisateur individuel. Le développement des portefeuilles s'accompagne d'une recherche sur d'autres formes d'abstraction de comptes, qui est un domaine important de la recherche naissante.

#### Lectures de référence {#background-reading-7}

- [Introduction aux portefeuilles](/wallets/)
- [Introduction à la sécurité des portefeuilles](/security/)
- [ethresear.ch Sécurité](https://ethresear.ch/tag/security)
- [EIP-2938 Abstraction de compte](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337 Abstraction de compte](https://eips.ethereum.org/EIPS/eip-4337)

#### Recherche récente {#recent-research-7}

- [Portefeuilles de contrats intelligents axés sur la validation](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [L'avenir des comptes](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [EIP-3074 Opcodes AUTH et AUTHCALL](https://eips.ethereum.org/EIPS/eip-3074)
- [Publier du code à une adresse EOA](https://eips.ethereum.org/EIPS/eip-5003)

## Communauté, éducation et sensibilisation {#community-education-and-outreach}

Introduire de nouveaux utilisateurs à Ethereum nécessite de nouvelles ressources éducatives et de nouvelles approches en matière de sensibilisation. Il peut s'agir de billets de blog et d'articles, de livres, de podcasts, de mèmes, de ressources pédagogiques, d'événements et de tout ce qui permet de créer des communautés, d'accueillir les nouveaux arrivants et d'éduquer les gens au sujet d'Ethereum.

### UX/UI {#uxui}

Pour attirer davantage de personnes sur Ethereum, l'écosystème doit améliorer l'UX/UI. Les concepteurs et les experts en produits devront donc revoir la conception des portefeuilles et des applications.

#### Lectures de référence {#background-reading-8}

- [Ethresear.ch UX/UI](https://ethresear.ch/c/ui-ux/24)

#### Recherche récente {#recent-research-8}

- [Discord Web3 Design](https://discord.gg/FsCFPMTSm9)
- [Principes de conception Web3](https://www.web3designprinciples.com/)
- [Discussion sur l'UX sur Ethereum Magicians](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### Économie {#economics}

La recherche économique sur Ethereum suit globalement deux approches : valider la sécurité des mécanismes reposant sur des incitations économiques (« microéconomie ») et analyser les flux de valeur entre les protocoles, les applications et les utilisateurs (« macroéconomie »). Il existe des facteurs crypto-économiques complexes liés à l'actif natif d'Ethereum (l'éther) et aux jetons créés à partir de celui-ci (par exemple les NFT et les jetons ERC20).

#### Lectures de référence {#background-reading-9}

- [Robust Incentives Group](https://ethereum.github.io/rig/)
- [Atelier ETHconomics à Devconnect](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### Recherche récente {#recent-research-9}

- [Analyse empirique de l'EIP-1559](https://arxiv.org/abs/2201.05574)
- [Équilibre de l'offre en circulation](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [Quantifier le MEV : À quel point la forêt est-elle sombre ?](https://arxiv.org/abs/2101.05511)

### L'espace de blocs et les marchés des frais {#blockspace-fee-markets}

Les marchés de blocs régissent la prise en compte des transactions des utilisateurs finaux, soit directement sur Ethereum (Couche de niveau 1), soit sur des réseaux pontés, comme les rollups (Couche de niveau 2). Sur Ethereum, les transactions sont envoyées sur le marché des frais déployé dans le protocole selon l'EIP-1559, protégeant ainsi la chaîne contre le spam et la congestion des prix. Sur les deux couches, les transactions peuvent produire des externalités, connues sous le nom de Valeur Extractible Maximale (MEV), qui induisent de nouvelles structures de marché pour capturer ou gérer ces externalités.

#### Lectures de référence {#background-reading-10}

- [Conception d'un mécanisme de frais de transaction pour la blockchain Ethereum : une analyse économique de l'EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [Simulations de l'EIP-1559 (Robust Incentives Group)](https://ethereum.github.io/abm1559)
- [L'économie des rollups : principes de base](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0 : Frontrunning, Réorganisation des Transactions et Instabilité du Consensus dans les Échanges Décentralisés](https://arxiv.org/abs/1904.05234)

#### Recherche récente {#recent-research-10}

- [Présentation vidéo de l'EIP-1559 multidimensionnel](https://youtu.be/QbR4MTgnCko)
- [MEV interdomaines](http://arxiv.org/abs/2112.01472)
- [Enchères MEV](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### Incitations à la preuve d'enjeu {#proof-of-stake-incentives}

Les validateurs utilisent l'actif natif d'Ethereum (l'ether) comme collatéral contre les comportements malhonnêtes. La cryptoéconomie qui en résulte détermine la sécurité du réseau. Des validateurs malins pourraient être en mesure d'exploiter les nuances de la couche d'incitation pour lancer des attaques explicites.

#### Lectures de référence {#background-reading-11}

- [Masterclass sur l'économie d'Ethereum et modèle économique](https://github.com/CADLabs/ethereum-economic-model)
- [Simulations des incitations à la preuve d'enjeu (Robust Incentives Group)](https://ethereum.github.io/beaconrunner/)

#### Recherche récente {#recent-research-11}

- [Augmenter la résistance à la censure des transactions dans le cadre de la séparation entre le proposant et le fabricant (PBS)](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [Trois attaques sur Ethereum en preuve d'enjeu](https://arxiv.org/abs/2110.10086)

### Mise en jeu libre et ses dérivés {#liquid-staking-and-derivatives}

La mise en jeu libre permet aux utilisateurs possédant moins de 32 ETH de recevoir des rendements de mise en jeu en échangeant de l'ether contre un jeton représentant de l'ether mis en jeu susceptible d'être utilisé dans la DeFi. Cependant, les incitations et la dynamique du marché associées à la mise en jeu libre sont encore en phase de découverte, tout comme son effet sur la sécurité d'Ethereum (par exemple, les risques de centralisation).

#### Lectures de référence {#background-reading-12}

- [Ethresear.ch mise en jeu libre](https://ethresear.ch/search?q=liquid%20staking)
- [Lido : Le chemin vers la mise en jeu d'Ethereum sans tiers de confiance](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool : Introduction au protocole de mise en jeu](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### Recherche récente {#recent-research-12}

- [Gestion des retraits de Lido](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [Identifiants de retrait](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [Les risques des dérivés de la mise en jeu libre](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Tester {#testing}

### Vérification formelle {#formal-verification}

La vérification formelle consiste à écrire du code pour vérifier que les spécifications du consensus Ethereum sont correctes et exemptes de bogues. Il existe une version exécutable de la spécification écrite en Python qui nécessite une maintenance et un développement. D'autres recherches peuvent contribuer à améliorer l'implémentation Python de la spécification et à ajouter des outils permettant de vérifier de manière plus robuste l'exactitude des données et d'identifier les problèmes.

#### Lectures de référence {#background-reading-13}

- [Introduction à la vérification formelle](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [Vérification formelle(Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Recherche récente {#recent-research-13}

- [Vérification formelle du contrat de dépôt](https://github.com/runtimeverification/deposit-contract-verification)
- [Vérification formelle de la spécification de la Chaîne phare](https://github.com/runtimeverification/deposit-contract-verification)

## Science des données et analyses {#data-science-and-analytics}

Il est nécessaire de disposer d'un plus grand nombre d'outils d'analyse de données et de tableaux de bord fournissant des informations détaillées sur l'activité d'Ethereum et la santé du réseau.

### Lectures de référence {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [Tableau de bord de la diversité des clients](https://clientdiversity.org/)

#### Recherche récente {#recent-research-14}

- [Analyse des données par le Robust Incentives Group](https://ethereum.github.io/rig/)

## Applications et outils {#apps-and-tooling}

La couche d'application prend en charge un écosystème diversifié de programmes qui réalisent les transactions sur la couche de base d'Ethereum. Les équipes de développement trouvent constamment de nouvelles façons d'utiliser Ethereum pour créer des versions composables, sans permission et résistantes à la censure d'applications Web2 majeures ou pour créer des concepts Web3 natifs complètement nouveaux. Dans le même temps, de nouveaux outils sont développés pour rendre moins complexe la création de DApps sur Ethereum.

### DeFi {#defi}

La finance décentralisée (DeFi) est l'une des principales catégories d'applications construites sur Ethereum. La DeFi vise à créer des « legos monétaires » composables qui permettent aux utilisateurs de stocker, transférer, prêter, emprunter et investir des crypto-actifs à l'aide de contrats intelligents. La finance décentralisée est un espace qui évolue rapidement et se renouvelle en permanence. Des recherches sur des protocoles sûrs, efficaces et accessibles sont continuellement nécessaires.

#### Lectures de référence {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: Qu'est-ce que la DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Recherche récente {#recent-research-15}

- [Finance décentralisée, propriété centralisée ?](https://arxiv.org/pdf/2012.09306.pdf)
- [Optimism : La route vers des transactions à moins d'un dollar](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### DAO {#daos}

La capacité à s'organiser de manière décentralisée grâce à l'utilisation de DAO est un cas d'utilisation important d'Ethereum. De nombreuses recherches sont en cours sur la manière dont les DAO sur Ethereum peuvent être développées et utilisées pour exécuter des formes améliorées de gouvernance, en tant qu'outil de coordination à confiance réduite, élargissant considérablement les possibilités des personnes au-delà des sociétés et des organisations traditionnelles.

#### Lectures de référence {#background-reading-16}

- [Introduction aux DAO](/dao/)
- [Dao Collective](https://daocollective.xyz/)

#### Recherche récente {#recent-research-16}

- [Cartographie de l'écosystème DAO](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Outils pour les développeurs {#developer-tools}

Les outils destinés aux développeurs Ethereum s'améliorent rapidement. Il reste encore beaucoup de recherches et de développements actifs à mener dans ce domaine général.

#### Lectures de référence {#background-reading-17}

- [Outils par langage de programmation](/developers/docs/programming-languages/)
- [Infrastructures pour développeurs](/developers/docs/frameworks/)
- [Liste des outils pour développeurs Consensus](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [Norme de jetons](/developers/docs/standards/tokens/)
- [CryptoDevHub: outils pour EVM](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### Recherche récente {#recent-research-17}

- [Canal d'outils Consensus sur le Discord R&D d'Eth](https://discordapp.com/channels/595666850260713488/746343380900118528)

### Oracles {#oracles}

Les oracles importent des données hors chaîne sur la blockchain de manière décentralisée et sans autorisation. L'obtention de ces données sur la chaîne permet aux DApps d'être réactives aux phénomènes du monde réel, tels que les fluctuations de prix des actifs réels, les événements dans les applications hors chaîne, ou même les changements météorologiques.

#### Lectures de référence {#background-reading-18}

- [Présentation des oracles](/developers/docs/evm)

#### Recherche récente {#recent-research-18}

- [Enquête sur les oracles blockchain](https://arxiv.org/pdf/2004.07140.pdf)
- [Livre blanc de Chainlink](https://chain.link/whitepaper)

### Sécurité des applications {#app-security}

Les piratages sur Ethereum exploitent généralement des vulnérabilités dans des applications individuelles plutôt que dans le protocole lui-même. Les pirates et les développeurs d'applications se livrent à une véritable course effrénée pour mettre au point de nouvelles attaques et de nouvelles défenses. Cela signifie qu'il y a toujours un important travail de recherche et de développement à effectuer pour protéger les applications contre les piratages.

#### Lectures de référence {#background-reading-19}

- [Rapport sur l'attaque de Wormhole](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [Liste des post-mortems des piratages de contrats Ethereum](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://twitter.com/RektHQ?s=20\&t=3otjYQdM9Bqk8k3n1a1Adg)

#### Recherche récente {#recent-research-19}

- [ethresear.ch Applications](https://ethresear.ch/c/applications/18)

### Pile technologique {#technology-stack}

La décentralisation de l'ensemble de la pile technologique Ethereum est un domaine de recherche important. Actuellement, les DApps sur Ethereum présentent généralement des points de centralisation parce qu'elles s'appuient sur des outils ou des infrastructures centralisés.

#### Lectures de référence {#background-reading-20}

- [Pile Ethereum](/developers/docs/ethereum-stack/)
- [Coinbase : Introduction au Web3 Stack](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [Introduction aux contrats intelligents](/developers/docs/smart-contracts/)
- [Introduction au stockage décentralisé](/developers/docs/storage/)

#### Recherche récente {#recent-research-20}

- [Composabilité des contrats intelligents](/developers/docs/smart-contracts/composability/)
