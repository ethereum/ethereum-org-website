---
title: Nœuds et clients
description: Présentation des nœuds Ethereum et des logiciels clients, de la façon de configurer un nœud et des raisons de le faire.
lang: fr
sidebarDepth: 2
---

Ethereum est un réseau d'ordinateurs qui exécutent des logiciels (appelés nœuds) dont l'objectif est de valider les blocs et les données de transaction. L'application logicielle, que l'on appelle client, doit être exécutée depuis l'ordinateur qu'on souhaite transformer en nœud Ethereum.

**Remarque : Il n'est plus possible d'exécuter seul un logiciel d'exécution. Depuis [La Fusion](/roadmap/merge), les logiciels d'exécution et de consensus doivent être exécutés ensemble afin qu'un utilisateur puisse avoir accès au réseau Ethereum.**

## Prérequis {#prerequisites}

Vous devez comprendre le concept de réseau de pair-à-pair et [les bases de l'EVM](/developers/docs/evm/) avant d'approfondir et d'exécuter votre propre instance d'un client Ethereum. Commencez par lire la page [Introduction à Ethereum](/developers/docs/intro-to-ethereum/).

Si vous êtes novice au sujet des nœuds, nous vous recommandons de consulter en premier lieu notre introduction conviviale sur [l'exécution d'un nœud Ethereum](/run-a-node).

## En quoi consistent les nœuds et les clients? {#what-are-nodes-and-clients}

Un « nœud » désigne toute instance de logiciel client Ethereum connecté à d'autres ordinateurs exécutant également un logiciel Ethereum, formant ainsi un réseau. Un client est une implémentation d'Ethereum qui vérifie les données en fonction des règles du protocole et maintient la sécurité du réseau.

Depuis la Fusion, Ethereum se compose de deux parties : la couche d'exécution et la couche de consensus. Les deux couches sont exécutées par des logiciels clients différents. Sur cette page, nous les appellerons client d'exécution et client de consensus.

- Le client d'exécution (également connu sous le nom de moteur d'exécution, de client EL ou anciennement de client Eth1) écoute les nouvelles transactions diffusées sur le réseau, les exécute dans l'EVM, et contient la dernière base de données et l'état de toutes les données Ethereum actuelles.
- Le client de consensus (également connu sous le nom de Nœud Beacon, client CL ou anciennement de client Eth2) implémente l'algorithme de consensus de la preuve d'enjeu, qui permet au réseau de parvenir à un accord basé sur des données validées du client d'exécution.

Avant [La Fusion](/roadmap/merge/), la couche de consensus et d'exécution étaient des réseaux séparés, et toutes les transactions et l'activité des utilisateurs sur l'Ethereum étaient réalisées sur ce qui est maintenant la couche d'exécution. Un logiciel client offrait à la fois l'environnement d'exécution et la vérification de consensus des blocs produits par les mineurs. La couche de consensus, [la Chaîne phare](/roadmap/beacon-chain/), fonctionnait séparément depuis décembre 2020. Elle a introduit la preuve d'enjeu et coordonné le réseau de validateurs basé sur les données du réseau Ethereum.

Avec La Fusion, Ethereum est passé à la preuve d'enjeu en connectant ces réseaux. Les clients d'exécution et de consensus travaillent ensemble pour vérifier l'état d'Ethereum.

La conception modulaire dotée de diverses pièces logicielles travaillant ensemble est appelée la [complexité encapsulée](https://vitalik.ca/general/2022/02/28/complexity.html). Cette approche facilite l'exécution de La Fusion de façon transparente en permettant la réutilisation de chaque client, comme par exemple dans [l'écosystème de la couche 2](/layer-2/).

![Exécution couplée et clients de consensus](./eth1eth2client.png) Diagramme simplifié d'une exécution couplée et d'un client de consensus.

### Diversité des clients {#client-diversity}

Les [clients d'exécution](/developers/docs/nodes-and-clients/#execution-clients) et [clients de consensus](/developers/docs/nodes-and-clients/#consensus-clients) existent dans une variété de langages de programmation développés par différentes équipes.

Les implémentations de plusieurs clients peuvent renforcer le réseau en réduisant sa dépendance sur la base d'un code unique. L'objectif idéal est de parvenir à la diversité sans qu'aucun client ne domine le réseau, éliminant ainsi un point de défaillance potentiel. La diversité des langages invite également une communauté plus large de développeurs et leur permet de créer des intégrations dans leur langage préféré.

En savoir plus sur la [diversité des clients](/developers/docs/nodes-and-clients/client-diversity/).

Ce que ces implémentations ont en commun, c'est qu'elles suivent toutes une seule spécification. Les spécifications régissent le fonctionnement du réseau Ethereum et de la blockchain. Chaque détail technique est défini et les spécifications peuvent être trouvées en tant que :

- À l'origine, le [Livre jaune Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Spécifications d'exécution](https://github.com/ethereum/execution-specs/)
- [Spécifications de consensus](https://github.com/ethereum/consensus-specs)
- [EIPs](https://eips.ethereum.org/) implémentés dans diverses [mises à jour réseau](/history/)

### Suivi des nœuds sur le réseau {#network-overview}

Les trackers multiples offrent une vue d'ensemble en temps réel des nœuds du réseau Ethereum. Notez qu'en raison de la nature décentralisée des réseaux, ces crawlers ne peuvent fournir qu'une vue limitée du réseau et peuvent rapporter des résultats différents.

- [Carte des nœuds](https://etherscan.io/nodetracker) par Etherscan
- [Ethernodes](https://ethernodes.org/) par Bitfly
- [Crawler de nœud Ethereum](https://crawler.ethereum.org/)
- [Nodewatch](https://www.nodewatch.io/) par Chainsafe, exploration des nœuds de consensus

## Types de nœuds {#node-types}

Si vous voulez [exécuter votre propre nœud](/developers/docs/nodes-and-clients/run-a-node/), vous devez comprendre qu'il existe différents types de nœuds et que ceux-ci consomment les données différemment. En fait, les clients peuvent exécuter différents types de nœuds : légers, complets et nœuds d'archives. Il existe également différentes stratégies de synchronisation afin d'accélérer le temps de synchronisation. La synchronisation fait référence à la vitesse à laquelle on peut obtenir les informations les plus récentes sur l'état d'Ethereum.

### Nœud complet {#full-node}

- Stocke toutes les données de la blockchain (même si celles-ci sont régulièrement "« taillées », de sorte qu'un nœud complet ne stocke pas toutes les données de la chaîne depuis la genèse)
- Participe à la validation de blocs, vérifie tous les blocs et états.
- Tous les états peuvent être dérivés d'un nœud complet (bien que les états très anciens soient reconstruits à partir de requêtes effectuées sur des nœuds d'archives).
- Sert le réseau et fournit des données sur demande.

### Nœud léger {#light-node}

Au lieu de télécharger chaque bloc, les nœuds légers téléchargent les en-têtes de bloc. Ces en-têtes ne contiennent que des informations sommaires sur le contenu des blocs. Toute autre information que pourrait requérir le nœud léger fera l'objet d'une requête auprès d'un nœud complet. Les nœuds légers peuvent alors comparer indépendamment les données qu'ils reçoivent avec les racines d'état dans les en-têtes de bloc. Les nœuds légers permettent aux utilisateurs de participer au réseau Ethereum sans nécessité de matériel onéreux ou de connexion internet haut débit nécessaires à l'exécution d'un nœud complet. Les nœuds légers peuvent même être exécutés depuis des téléphones portables ou des appareils embarqués. Les nœuds légers ne participent pas au consensus (c'est-à-dire qu'ils ne peuvent pas être des mineurs ou des validateurs), mais ils peuvent accéder à la blockchain Ethereum avec la même efficience et garantie de sécurité qu'un nœud complet.

Le client d'exécution Geth intègre une option de [synchronisation simplifiée](https://github.com/ethereum/devp2p/blob/master/caps/les.md). Cependant, un nœud Geth léger se base sur des nœuds complets servant des données de nœuds légers. Peu de nœuds entiers choisissent de servir les données des nœuds allégés, de sorte que les nœuds légers ne trouvent pas souvent de pairs.

Les clients légers sont un domaine de développement actif pour Ethereum et nous nous attendons à prochainement voir apparaître de nouveaux clients légers pour la couche de consensus et la couche d'exécution. Il existe également des routes potentielles pour fournir des données client légers sur le [réseau gossip](https://www.ethportal.net/). Ceci est avantageux dans la mesure où le réseau gossip pourrait supporter un réseau de nœuds légers sans avoir besoin que des nœuds complets servent les requêtes.

Ethereum ne prend pas encore en charge un nombre important de ces nœuds légers mais la prise en charge des nœuds légers est une thématique qui devrait fortement développer dans un futur proche. En particulier, des clients comme [Nimbus](https://nimbus.team/), [Helios](https://github.com/a16z/helios), et [LodeStar](https://lodestar.chainsafe.io/) se focalisent actuellement fortement sur les nœuds légers.

### Nœud d'archive {#archive-node}

- Stocke tout ce qui est conservé dans le nœud complet et construit une archive des états de l'historique. Il est nécessaire pour aller chercher des informations comme le solde d'un compte au bloc #4 000 000, ou tester vos propres ensembles de transactions simplement et efficacement sans les miner en utilisant le traçage.
- Ces données représentent des unités de téraoctets qui rendent les nœuds d'archives moins attrayants pour les utilisateurs courants, mais peut être utile pour des services comme les explorateurs de blocs, les fournisseurs de portefeuilles et les analyses de chaînes.

La synchronisation des clients dans un autre mode que celui de l'archivage entraîne la suppression de données de la blockchain. Cela signifie qu'il n'existe pas d'archive de tous les états de l'historique, mais que le nœud complet est capable de les construire sur demande.

En savoir plus sur les [nœuds d'archives](/developers/docs/archive-nodes).

## Pourquoi exécuter un nœud Ethereum ? {#why-should-i-run-an-ethereum-node}

Exécuter un nœud vous permet d'utiliser directement Ethereum en toute confiance et en toute confidentialité tout en soutenant le réseau qui gagne en robustesse et en décentralisation.

### Avantages pour vous {#benefits-to-you}

L'exécution de votre propre nœud vous permet d'utiliser Ethereum de façon privée, autonome et fiable. Vous n'avez pas besoin de faire confiance au réseau car vous pouvez vous-même vérifier les données avec votre client. « Ne faites pas confiance, vérifiez » est une devise populaire de la blockchain.

- Votre nœud vérifie lui-même toutes les transactions et tous les blocs par rapport aux règles de consensus. Cela signifie que vous n’avez ni à vous fier à d’autres nœuds du réseau ni à leur faire entièrement confiance.
- Vous pouvez utiliser un portefeuille Ethereum avec votre propre nœud. Vous pouvez utiliser des dapps de manière plus sécurisée et privée parce que vous n'aurez pas à communiquer vos adresses et soldes avec des nœuds aléatoires. Tout peut être contrôlé avec votre propre client. [MetaMask](https://metamask.io), [Frame](https://frame.sh/), et [de nombreux autres portefeuilles](/wallets/find-wallet/) proposent l'importation du RPC, leur permettant d'utiliser votre nœud.
- Vous pouvez exécuter et autohéberger d'autres services qui dépendent des données d'Ethereum. Par exemple, il peut s'agir d'un validateur de Chaîne Phare, d'un logiciel comme la couche 2, d'une infrastructure, d'explorateur de blocs, de processeurs de paiement, etc.
- Vous pouvez fournir vos propres [points de terminaison RPC personnalisés](https://ethereum.org/en/developers/docs/apis/json-rpc/). Publiquement pour la communauté, ou même hébergé en privé, un point de terminaison Ethereum permet aux gens d'utiliser votre nœud et d'éviter les grands fournisseurs centralisés.
- Vous pouvez vous connecter à votre nœud en utilisant **les communications interprocessus (IPC)** ou réécrire le nœud pour charger votre programme en tant que plugin. Cette démarche garantit une faible latence, or cela est très utile, par exemple lorsque vous traitez beaucoup de données en utilisant des bibliothèques web3 ou lorsque vous avez besoin de remplacer vos transactions le plus rapidement possible (cas du frontrunning).
- Vous pouvez directement miser de l'ETH pour sécuriser le réseau et gagner des récompenses. Voir [la mise en jeu individuelle](https://ethereum.org/en/staking/solo/) pour commencer.

![Comment accéder à Ethereum via votre application et vos nœuds](./nodes.png)

### Avantages du réseau {#network-benefits}

Il est important de disposer d'un ensemble diversifié de nœuds pour garantir le bon fonctionnement, la sécurité et la résilience opérationnelle d’Ethereum.

- Les nœuds complets appliquent les règles de consensus afin de ne pas se faire piéger en acceptant des blocs qui ne les suivent pas. Cette approche offre une sécurité supplémentaire au sein du réseau. En effet, si tous les nœuds étaient des nœuds légers (qui ne font pas de vérification complète), les validateurs pourraient attaquer le réseau.
- Dans le cas d'une attaque qui surmonte les défenses crypto-économiques de [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/#what-is-pos), une reprise sociale peut être effectuée par les nœuds complets choisissant de suivre la chaîne honnête.
- Un plus grand nombre de nœuds dans le réseau se traduit par un réseau plus diversifié et robuste, soit l'objectif ultime de la décentralisation, qui favorise un système fiable et résistant à la censure.
- Ils fournissent un accès aux données de la blockchain pour les clients légers qui en dépendent. Dans les pics d'utilisation, il faut avoir suffisamment de nœuds complets pour pour permettre aux nœuds légers de se synchroniser. Les nœuds légers ne stockent pas toute la blockchain. Au lieu de cela, ils vérifient les données via les [racines d'état des en-têtes de blocs](/developers/docs/blocks/#block-anatomy). Ils peuvent demander plus d'informations aux blocs si besoin est.

Quand vous exécutez un nœud complet, c'est l'ensemble du réseau Ethereum qui en bénéficie.

## Exécuter son propre nœud {#running-your-own-node}

Vous aimeriez faire fonctionner votre propre client Ethereum ?

Pour une introduction facile destinée aux débutants, consultez notre page [pour en savoir plus](/run-a-node).

Si vous connaissez mieux la technique, vous pouvez obtenir plus de détails et d'options pour [exécuter votre propre nœud](/developers/docs/nodes-and-clients/run-a-node/).

## Alternatives {#alternatives}

Mettre en place votre propre nœud peut prendre du temps et nécessiter des ressources, mais vous n'avez pas toujours besoin de faire tourner votre propre instance. Dans ce cas, vous pouvez utiliser un fournisseur d'API tiers comme [Infura](https://infura.io), [Alchemy](https://alchemyapi.io), [Chainstack](https://chainstack.com) ou [QuikNode](https://www.quiknode.io). Autre option : [ArchiveNode](https://archivenode.io/) est un nœud d'archive financé par la communauté. Il a pour objectif d'offrir des données d'archive sur la blockchain Ethereum aux développeurs indépendants qui ne pourraient pas, autrement, se le permettre. Pour un aperçu de l'utilisation de ces services, consultez [les nœuds en tant que service](/developers/docs/nodes-and-clients/nodes-as-a-service/).

Si quelqu'un exécute un nœud Ethereum avec une API publique dans votre communauté, vous pouvez faire pointer vos portefeuilles légers (comme MetaMask) vers un nœud communautaire [via un RPC personnalisé](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node) et bénéficier d'une plus grande confidentialité qu'avec un tiers de confiance aléatoire.

D'autre part, si vous exécutez un client, vous pouvez le partager avec vos amis qui pourraient en avoir besoin.

## Exécuter des clients (anciennement « Clients Eth1 ») {#execution-clients}

La communauté Ethereum gère plusieurs clients d'exécution open-source (précédemment connus sous le nom de « clients Eth1 » ou simplement « clients Ethereum »), développés par différentes équipes en utilisant différents langages de programmation. Cela rend le réseau plus solide et [diversifié](/developers/docs/nodes-and-clients/client-diversity/). L'idéal est d'atteindre l'objectif de diversité sans qu'aucun client ne prédomine afin de réduire les points de défaillance uniques.

Ce tableau récapitule les différents clients. Tous ont passé [les tests client](https://github.com/ethereum/tests) et sont activement entretenus pour rester à jour grâce aux mises à niveau du réseau.

| Client                                          | Langage  | Systèmes d'exploitation | Réseaux                                     | Stratégies de synchronisation      | Élagage d'état  |
| ----------------------------------------------- | -------- | ----------------------- | ------------------------------------------- | ---------------------------------- | --------------- |
| [Geth](https://geth.ethereum.org/)              | Go       | Linux, Windows, macOS   | Réseau principal, Sepolia, Goerli           | Snap, Full                         | Archive, élagué |
| [Nethermind](http://nethermind.io/)             | C#, .NET | Linux, Windows, macOS   | Réseau principal, Sepolia, Goerli et autres | Snap (without serving), Fast, Full | Archive, élagué |
| [Besu](https://besu.hyperledger.org/en/stable/) | Java     | Linux, Windows, macOS   | Réseau principal, Sepolia, Goerli et autres | Snap, Rapide, Plein                | Archive, élagué |
| [Erigon](https://github.com/ledgerwatch/erigon) | Go       | Linux, Windows, macOS   | Réseau principal, Sepolia, Goerli et autres | Totale                             | Archive, élagué |
| [Akula](https://akula.app)                      | Rust     | Linux                   | Réseau principal, Sepolia, Goerli           | Totale                             | Archive, élagué |

**Notez qu'OpenEthereum [est obsolète](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) et n'est plus mis à jour.** Utilisez une autre implémentation client !

Pour plus d'information sur les réseaux pris en charge, lisez la page [Réseaux Ethereum](/developers/docs/networks/).

Chaque client est utilisé à des fins uniques et présente des avantages particuliers. Vous devez donc en choisir un en fonction de vos propres préférences. La diversité permet de concentrer les implémentations sur des fonctionnalités et des utilisateurs distincts. Vous pouvez choisir un client en fonction de ses fonctionnalités, de son support, de son langage de programmation ou de ses licences.

### Besu {#besu}

Hyperledger Besu est un client Ethereum de qualité professionnelle pour réseaux publics et privés. Il exécute toutes les fonctionnalités du réseau principal Ethereum, du traçage à GraphQL, dispose d'une surveillance étendue et est pris en charge par ConsenSys, à la fois sur les canaux communautaires ouverts et par le biais de SLA commerciaux destinés aux entreprises. Il est écrit en Java et se trouve sous licence Apache 2.0.

La [documentation](https://besu.hyperledger.org/en/stable/) complète de Besu vous donnera plus de détails sur ses fonctionnalités et sa configuration.

### Erigon {#erigon}

Erigon, anciennement connu sous le nom de Turbo-Geth, est une fourche de Go Ethereum axée sur la vitesse et l'efficacité de l'espace disque. Erigon est une implémentation entièrement repensée d'Ethereum, actuellement écrite en Go mais pour laquelle des implémentations dans d'autres langages sont prévues, par exemple [Akula](https://medium.com/@vorot93/meet-akula-the-fastest-ethereum-implementation-ever-built-58eaca244c39). L'objectif d'Erigon est de fournir une implémentation plus rapide, plus modulaire et plus optimisée d'Ethereum. Il peut effectuer une synchronisation complète des nœuds d'archive en utilisant environs 2 To d'espace disque, et ce en moins de 3 jours.

### Go Ethereum {#geth}

Go Ethereum (ou Geth, en abrégé) est l'une des implémentations initiales du protocole Ethereum. Il s'agit actuellement du client le plus répandu. Il offre la plus grande base d'utilisateurs et la plus grande variété d'outils aux utilisateurs et développeurs. Il est rédigé en Go, entièrement open source et sous licence GNU LGPL v3.

En savoir plus sur Geth grâce à sa [documentation](https://geth.ethereum.org/docs/).

### Nethermind {#nethermind}

Nethermind est une implémentation d'Ethereum créée avec la pile technologique C# .NET, sous licence LPL-3.0, fonctionnant sur les principales plateformes, y compris ARM. Elle offre d'excellentes performances :

- une machine virtuelle optimisée ;
- un accès à l'état ;
- la mise en réseau et des fonctionnalités riches comme les tableaux de bord Prometheus/Grafana, la prise en charge de la journalisation d'entreprise seq, le traçage RPC JSON et les plugins d'analyse.

Nethermind dispose également d'[une documentation détaillée](https://docs.nethermind.io), d'un solide support de développement, d'une communauté en ligne et d'une assistance 24h/24 et 7j/7 offerte aux utilisateurs premium.

## Clients de consensus (anciennement clients 'Eth2') {#consensus-clients}

De nombreux clients de consensus (précédemment connus sous le nom de clients 'Eth2') prennent en charge les [mises à niveau du consensus](/roadmap/beacon-chain/). Ils exécutent la Chaîne Phare et fourniront un mécanisme de consensus de preuve d'enjeu pour exécuter les clients après [La Fusion](/roadmap/merge/).

| Client                                                        | Langage    | Systèmes d'exploitation | Réseaux                                                                 |
| ------------------------------------------------------------- | ---------- | ----------------------- | ----------------------------------------------------------------------- |
| [Lighthouse](https://lighthouse.sigmaprime.io/)               | Rust       | Linux, Windows, macOS   | Chaîne Phare, Goerli, Pyrmont, Sepolia, Ropsten, et plus encore         |
| [Lodestar](https://lodestar.chainsafe.io/)                    | TypeScript | Linux, Windows, macOS   | Chaîne Phare, Goerli, Sepolia, Ropsten, et plus encore                  |
| [Nimbus](https://nimbus.team/)                                | Nim        | Linux, Windows, macOS   | Chaîne Phare, Goerli, Sepolia, Ropsten, et plus encore                  |
| [Prysm](https://docs.prylabs.network/docs/getting-started/)   | Go         | Linux, Windows, macOS   | Chaîne Phare, Gnosis, Goerli, Pyrmont, Sepolia, Ropsten, et plus encore |
| [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) | Java       | Linux, Windows, macOS   | Chaîne Phare, Gnosis, Goerli, Sepolia, Ropsten, et plus encore          |

### Lighthouse {#lighthouse}

Lighthouse est une implémentation de client de consensus écrite en Rust sous la licence Apache-2.0. Mise à niveau par Sigma Prime, elle est stable et prête à la production depuis la genèse de la Chaîne phare. Diverses entreprises, groupes d'enjeux et particuliers l'utilisent. Elle se veut sécurisée, performante et interopérable dans un large éventail d'environnements allant des PC de bureau aux déploiements automatisés de pointe.

La documentation est disponible dans le [Livre Lighthouse](https://lighthouse-book.sigmaprime.io/)

### Lodestar {#lodestar}

Lodestar est une implémentation de client de consensus prête à la production, écrite en Typescript sous la licence LGPL-3.0. Mise à jour par ChainSafe Systems, elle constitue le plus récent des clients de consensus pour les validateurs individuels, les développeurs et les chercheurs. Lodestar est composé d'un nœud phare et d'un client validateur utilisant des implémentations JavaScript des protocoles Ethereum. Lodestar vise à améliorer la convivialité d'Ethereum auprès des clients légers, à étendre l'accessibilité à un plus grand groupe de développeurs et à contribuer davantage à la diversité des écosystèmes.

De plus amples informations sont disponibles sur notre site [Lodestar](https://lodestar.chainsafe.io/)

### Nimbus {#nimbus}

Nimbus est une implémentation de client de consensus écrite en Nim sous la licence Apache-2.0. Il s'agit d'un client prêt à la production utilisé par les validateurs individuels et les groupes de mise en jeu. Nimbus est conçu pour favoriser l'efficacité des ressources, ce qui le rend facile à utiliser sur des appareils disposant de ressources limitées ou sur des infrastructures d'entreprise sans compromettre la stabilité ou les performances de récompense. Une empreinte plus légère en termes de ressources signifie que le client a une plus grande marge de sécurité lorsque le réseau est sollicité.

Implémenté par Trinity. Fonctionne comme la synchronisation rapide, mais télécharge également les données nécessaires pour exécuter les derniers blocs, vous permettant ainsi d'interroger la chaîne dès les premières minutes de démarrage.

- Synchronise d'abord l'état et vous permet d'interroger RPC en quelques minutes.
- Encore en développement et pas entièrement fiable, la synchronisation en arrière-plan est ralentie et les réponses RPC peuvent échouer.

En savoir plus avec la [Documentation de Nimbus](https://nimbus.guide/)

### Prysm {#prysm}

Prysm est un client de consensus open source complet écrit en Go sous la licence GPL-3.0. Il dispose d'une interface utilisateur optionnelle et donne la priorité à l'expérience utilisateur, à la documentation et à la configurabilité, tant pour les utilisateurs particuliers qu'institutionnels.

Consultez [la documentation Prysm](https://docs.prylabs.network/docs/getting-started/) pour en savoir plus.

### Teku {#teku}

Teku est l'un des clients originaux de la genèse de la Chaine Phare. En plus des objectifs habituels (sécurité, robustesse, stabilité, facilité d'utilisation, performance), Teku vise spécifiquement à respecter pleinement toutes les normes du client de consensus.

Teku offre des options de déploiement très flexibles. Le nœud phare et le client de validation peuvent être exécutés ensemble dans le cadre d'un seul processus, ce qui est extrêmement pratique pour les validateurs individuels. Les nœuds peuvent également être exécutés séparément pour des opérations de mise en jeu sophistiquées. En outre, Teku est entièrement compatible avec [Web3Signer](https://github.com/ConsenSys/web3signer/) s'agissant de sécuriser les clés de signature et de les protéger contre les délestages.

Teku est écrit en Java et est disponible sous licence Apache 2.0. Il est développé par l'équipe de protocoles de ConsenSys qui est également responsable de Besu et Web3Signer. Pour en savoir plus, consultez la documentation [Teku](https://docs.teku.consensys.net/en/latest/).

## Modes de synchronisation {#sync-modes}

Pour suivre et vérifier les données actuelles sur le réseau, le client Ethereum doit se synchroniser avec le dernier état du réseau. Pour ce faire, il doit télécharger des données auprès de pairs, vérifierler intégrité de manière cryptographique et construire une base de données blockchain locale.

Les modes de synchronisation offrent des approches différentes de ce processus, avec divers compromis. Les clients diffèrent également dans leur implémentation des algorithmes de synchronisation. Reportez-vous toujours à la documentation officielle du client choisi pour connaître les détails relatifs à l'implémentation.

### Modes de synchronisation de la couche d'exécution {#execution-layer-sync-modes}

#### Synchronisation totale {#full-sync}

La synchronisation complète permet de télécharger tous les blocs (y compris les en-têtes, les transactions et les reçus) et de générer l'état de la blockchain de façon incrémentielle en exécutant chaque bloc depuis la genèse.

- Minimise la confiance et offre la plus haute sécurité en vérifiant chaque transaction.
- Avec un nombre croissant de transactions, le traitement de toutes les transactions peut prendre des jours, voire des semaines.

#### Synchronisation rapide {#fast-sync}

La synchronisation rapide permet de télécharger tous les blocs (y compris les en-têtes, les transactions et les reçus), de vérifier tous les en-têtes, de télécharger l'état et de le vérifier au regard des en-têtes.

- Repose sur la sécurité du mécanisme de consensus.
- La synchronisation ne prend que quelques heures.

#### Synchronisation légère {#light-sync}

Le mode client léger permet de télécharger tous les en-têtes de bloc, les données de bloc et d'en vérifier certaines aléatoirement. Synchronise seulement le point de la chaîne à partir du point de contrôle de confiance.

- Ne récupère que les derniers états en s'appuyant sur la confiance dans les développeurs et le mécanisme de consensus.
- Le client est prêt à être utilisé avec l'état actuel du réseau en quelques minutes.

**NB** La synchronisation légère ne fonctionne pas encore avec la version preuve d'enjeu d'Ethereum - de nouvelles versions prenant en charge la synchronisation légère devraient être bientôt disponibles !

[En savoir plus sur les clients légers](https://www.parity.io/blog/what-is-a-light-client/)

#### Synchronisation instantanée {#snap-sync}

La synchronisation instantanée est le tout dernier mode de synchronisation d'un client, lancé par l'équipe de Geth. L'utilisation d'instantanés dynamiques fournis par des pairs permet de récupérer toutes les données du compte et les données de stockage sans télécharger les nœuds d'arborescence intermédiaires puis de reconstruire ensuite l'arborescence Merkle localement.

- Stratégie de synchronisation la plus rapide, actuellement par défaut dans le réseau principal Ethereum
- Permet d'économiser l'utilisation du disque et de la bande passante du réseau sans pour autant sacrifier la sécurité

[En savoir plus sur la synchronisation instantanée](https://github.com/ethereum/devp2p/blob/master/caps/snap.md)

### Modes de synchronisation de la couche de consensus {#consensus-layer-sync-modes}

#### Synchronisation optimiste {#optimistic-sync}

La synchronisation optimiste est une stratégie de synchronisation post-fusion conçue pour être opt-in et rétrocompatible. Elle permet à des nœuds d'exécution de se synchroniser via des méthodes reconnues. Le moteur d'exécution peut importer _de manière optimiste_ des blocs phares sans les vérifier complètement, trouver la dernière tête, puis commencer à synchroniser la chaîne en utilisant les méthodes ci-dessus. Ensuite, une fois le client d'exécution mis à jour, il informe le client de consensus de la validité des transactions sur la Chaîne phare.

[En savoir plus sur la synchronisation optimiste](https://github.com/ethereum/consensus-specs/blob/dev/sync/optimistic.md)

#### Synchronisation des points de contrôle {#checkpoint-sync}

La Synchronisation des points de contrôle, également connue sous le nom de synchronisation à faible subjectivité, génère une expérience utilisateur supérieure pour la synchronisation du Nœud Phare. Elle est basée sur des hypothèses de [faible subjectivité](/developers/docs/consensus-mechanisms/pos/weak-subjectivity/) qui permettent de synchroniser la Chaîne phare à partir d'un point de contrôle de faible subjectivité récent plutôt que de la genèse. La synchronisation des points de contrôle réduit sensiblement le temps de synchronisation initiale avec des hypothèses de confiance similaires à la synchronisation effectuée à partir de la [genèse](/glossary/#genesis-block).

En pratique, cela signifie que votre nœud se connecte à un service distant pour télécharger les états finalisés récents et continue de vérifier les données à partir de ce point. Les tiers qui fournissent les données sont de confiance et doivent être soigneusement sélectionnés.

En savoir plus sur [la synchronisation des points de contrôle](https://notes.ethereum.org/@djrtwo/ws-sync-in-practice)

## Complément d'information {#further-reading}

Vous trouverez beaucoup d'informations sur les clients Ethereum sur Internet. Voici quelques ressources qui pourraient être utiles.

- [Ethereum 101 - Part 2 - Understanding Nodes](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _- Wil Barnes, 13 février 2019_
- [Running Ethereum Full Nodes: A Guide for the Barely Motivated](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _- Justin Leroux, 7 novembre 2019_

## Sujets connexes {#related-topics}

- [Blocs](/developers/docs/blocks/)
- [Réseaux](/developers/docs/networks/)

## Tutoriels connexes {#related-tutorials}

- [Transformez votre Raspberry Pi 4 en validateur de nœud en flashant une carte MicroSD – Le guide d'installation](/developers/tutorials/run-node-raspberry-pi/) _– Flashez votre Raspberry Pi 4, branchez un cable ethernet, connectez le disque SSD et alimentez l'appareil pour transformer votre Raspberry Pi 4 en un nœud Ethereum complet exécutant la couche d'exécution (réseau principal) et/ou la couche de consensus (Chaine Phare / Validateur)._
