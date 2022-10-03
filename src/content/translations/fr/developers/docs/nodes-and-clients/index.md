---
title: Nœuds et clients
description: Présentation des nœuds Ethereum et des logiciels clients, de la façon de configurer un nœud et des raisons de le faire.
lang: fr
sidebarDepth: 2
---

Ethereum est un réseau distribué d'ordinateurs exécutant des logiciels (appelés node) qui vérifient les blocs et les données de transaction. Vous avez besoin d'une application (« un client ») sur votre appareil pour « exécuter » un nœud.

## Prérequis {#prerequisites}

Vous devez comprendre le concept de réseau de pair-à-pair et [les bases de l'EVM](/developers/docs/evm/) avant d'approfondir et d'exécuter votre propre instance d'un client Ethereum. Commencez par lire la page [Introduction à Ethereum](/developers/docs/intro-to-ethereum/).

Si vous êtes novice au sujet des nœuds, nous vous recommandons de consulter en premier lieu notre introduction conviviale sur [l'exécution d'un nœud Ethereum](/run-a-node).

## En quoi consistent les nœuds et les clients? {#what-are-nodes-and-clients}

Le terme « Nœud » désigne un logiciel client en cours d'exécution. Un client est une implémentation d'Ethereum qui vérifie l'ensemble des transactions de chaque bloc, garantissant la sécurité du réseau et l'exactitude des données.

Vous pouvez obtenir une vue du réseau Ethereum en temps réel en consultant cette [carte des nœuds](https://etherscan.io/nodetracker).

De nombreux [clients Ethereum](/developers/docs/nodes-and-clients/#execution-clients) existent dans une variété de langages de programmation tels que Go, Rust, JavaScript, Typescript, Python, C# .NET, Nim et Java. Ce que ces implémentations ont en commun, c'est qu'elles suivent toutes une spécification formelle (à l'origine le [papier jaune Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf)). Cette spécification régit le fonctionnement du réseau Ethereum et de la blockchain.

![Clients d'exécution](./client-diagram.png) Diagramme simplifié des fonctionnalités des clients Ethereum

## Types de nœuds {#node-types}

Si vous voulez [exécuter votre propre nœud](/developers/docs/nodes-and-clients/run-a-node/), vous devez comprendre qu'il existe différents types de nœuds et que ceux-ci consomment les données différemment. En fait, les clients peuvent exécuter 3 types de nœuds différents : léger, complet et d'archive. Il existe aussi différentes stratégies de synchronisation afin d'accélérer le temps de synchronisation. La synchronisation fait référence à la vitesse à laquelle on peut obtenir les informations les plus récentes sur l'état d'Ethereum.

### Nœud complet {#full-node}

- Stocke toutes les données de la blockchain.
- Participe à la validation de blocs, vérifie tous les blocs et états.
- Tous les états peuvent être dérivés d'un nœud complet.
- Sert le réseau et fournit des données sur demande.

### Nœud léger {#light-node}

- Stocke la chaîne d'en-tête et demande tout le reste.
- Peut vérifier la validité des données par rapport aux racines d'état dans les en-têtes de bloc.
- Utile pour les appareils de faible capacité, comme les appareils embarqués ou les téléphones mobiles, qui ne peuvent pas stocker des gigaoctets de données blockchain.

### Nœud d'archive {#archive-node}

- Stocke tout ce qui est conservé dans le nœud complet et construit une archive des états de l'historique. Nécessaire pour aller chercher des informations comme le solde d'un compte au bloc #4 000 000, ou [tester vos propres ensembles de transactions simplement et efficacement sans les miner avec OpenEthereum](https://openethereum.github.io/JSONRPC-trace-module#trace_callmany).
- Ces données représentent des unités de téraoctets qui rendent les nœuds d'archives moins attrayants pour les utilisateurs moyens, mais peuvent être utiles pour des services comme les explorateurs de blocs, les fournisseurs de portefeuilles et les analyses de chaînes.

La synchronisation des clients dans un autre mode que celui de l'archivage entraîne la suppression de données de la blockchain. Cela signifie qu'il n'existe pas d'archive de tous les états de l'historique, mais que le nœud complet est capable de les construire sur demande.

## Pourquoi exécuter un nœud Ethereum ? {#why-should-i-run-an-ethereum-node}

Exécuter un nœud vous permet d'utiliser le service Ethereum en toute confiance et de façon privée, tout en contribuant à l'écosystème.

### Avantages pour vous {#benefits-to-you}

L'exécution de votre propre nœud vous permet d'utiliser Ethereum de façon vraiment privée, autonome et fiable. Vous n'avez pas besoin de faire confiance au réseau car vous pouvez vous-même vérifier les données avec votre client. « Ne faites pas confiance, vérifiez » est une devise populaire de la blockchain.

- Votre nœud vérifie lui-même toutes les transactions et tous les blocs par rapport aux règles de consensus. Cela signifie que vous n’avez ni à vous fier à d’autres nœuds du réseau ni à leur faire entièrement confiance.
- Vous n'aurez pas à divulguer vos adresses et vos soldes à des nœuds aléatoires. Tout peut être contrôlé avec votre propre client.
- Votre DApp peut être privée et plus sécurisée si vous utilisez votre propre nœud. [MetaMask](https://metamask.io), [MyEtherWallet](https://myetherwallet.com) et d'autres portefeuilles peuvent facilement pointer vers votre propre nœud local.
- Vous pouvez programmer vos propres points de terminaison RPC personnalisés.
- Vous pouvez vous connecter à votre nœud en utilisant **les communications interprocessus (IPC)** ou réécrire le nœud pour charger votre programme en tant que plugin. Cela garantit une faible latence, qui est nécessaire pour remplacer vos transactions aussi rapidement que possible (c'est-à-dire en avant-première).

![Comment accéder à Ethereum via votre application et vos nœuds](./nodes.png)

### Avantages du réseau {#network-benefits}

Il est important de disposer d'un ensemble diversifié de nœuds pour la santé, la sécurité et la résilience opérationnelle d’Ethereum.

- Ils fournissent un accès aux données de la blockchain pour les clients légers qui en dépendent. Dans les pics d'utilisation, il faut avoir suffisamment de nœuds complets pour aider à la synchronisation des nœuds légers. Les nœuds légers ne stockent pas toute la blockchain. Au lieu de cela, ils vérifient les données via les [racines d'état des en-têtes de blocs](/developers/docs/blocks/#block-anatomy). Ils peuvent demander plus d'informations aux blocs si besoin est.
- Les nœuds complets appliquent les règles de consensus de preuve de travail afin qu'ils ne puissent pas être dupés et accepter des blocs qui ne les respectent pas. Ceci offre une sécurité supplémentaire au sein du réseau, car si tous les nœuds étaient des nœuds légers qui ne font pas de vérification complète, les mineurs pourraient attaquer le réseau et, par exemple, créer des blocs avec des récompenses plus élevées.

Quand vous exécutez un nœud complet, c'est l'ensemble du réseau Ethereum qui en bénéficie.

## Exécuter son propre nœud {#running-your-own-node}

Vous aimeriez faire fonctionner votre propre client Ethereum ?

Pour une introduction facile destinée aux débutants, visitez notre page [pour en savoir plus](/run-a-node).

Si vous êtes un utilisateur plus orienté vers la technique, apprenez à [faire tourner votre propre nœud](/developers/docs/nodes-and-clients/run-a-node/) avec l'invite de commande !

### Projets {#projects}

[**Sélectionnez un client et suivez ses instructions.**](#clients)

**ethnode -** **_Exécutez un nœud Ethereum (Geth ou OpenEthereum) pour un développement en local._**

- [GitHub](https://github.com/vrde/ethnode)

**DAppNode -** **_Un système d'exploitation doté d'une interface graphique pour exécuter des nœuds Web3, y compris Ethereum et la « chaîne phare » sur une machine dédiée._**

- [dappnode.io](https://dappnode.io)

### Ressources {#resources}

- [Exécuter des nœuds Ethereum complets : un guide complet](https://medium.com/coinmonks/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _ - Justin Leroux, 7 novembre 2019_
- [Aide-mémoire pour la configuration des nœuds](https://dev.to/5chdn/ethereum-node-configuration-modes-cheat-sheet-25l8) _- Afri Schoeden, 5 janvier 2019_
- [Comment installer et faire fonctionner un nœud Geth](https://www.quiknode.io/guides/infrastructure/how-to-install-and-run-a-geth-node) _- Sahil Sen, 4 octobre 2020_
- [Comment installer et exécuter un nœud OpenEthereum (fka. Parity)](https://www.quiknode.io/guides/infrastructure/how-to-run-a-openethereum-ex-parity-client-node) _- Sahil Sen, 22 septembre 2020_

## Alternatives {#alternatives}

L'exécution de votre propre nœud ou instance peut être difficile et n'est pas toujours nécessaire. Dans ce cas, vous pouvez utiliser un fournisseur d'API tiers comme [Infura](https://infura.io), [Alchemy](https://alchemyapi.io) ou [QuikNode](https://www.quiknode.io). Sinon, [ArchiveNode](https://archivenode.io/) est un nœud d'archive financé par la communauté. Il a pour objectif d'offrir des données d'archive sur la blockchain Ethereum aux développeurs indépendants qui ne pourraient pas se le permettre autrement. Pour une vue d'ensemble sur l'utilisation de ces services, consultez [les nœuds en tant que service](/developers/docs/nodes-and-clients/nodes-as-a-service/).

Si quelqu'un exécute un nœud Ethereum avec une API publique dans votre communauté, vous pouvez faire pointer vos portefeuilles allégés (comme MetaMask) vers un nœud communautaire [via un RPC personnalisé](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node) et gobtenir plus de confidentialité qu'avec un tiers de confiance aléatoire.

D'autre part, si vous exécutez un client, vous pouvez le partager avec vos amis qui pourraient en avoir besoin.

## Exécuter des clients (anciennement « Clients Eth1 ») {#execution-clients}

La communauté Ethereum gère plusieurs clients d'exécution open-source (précédemment connus sous le nom de « clients Eth1 » ou simplement « clients Ethereum »), développés par différentes équipes en utilisant différents langages de programmation. Cela rend le réseau plus solide et plus diversifié. L'objectif idéal est de parvenir à la diversité sans qu'aucun client ne prédomine afin de réduire les points de défaillance uniques.

Ce tableau récapitule les différents clients. Tous ont passé [les tests client](https://github.com/ethereum/tests) et sont activement entretenus pour rester à jour avec les mises à niveau du réseau.

| Client                                                                  | Langage  | Systèmes d'exploitation | Réseaux                                             | Stratégies de synchronisation | Élagage d'état  |
| ----------------------------------------------------------------------- | -------- | ----------------------- | --------------------------------------------------- | ----------------------------- | --------------- |
| [Geth](https://geth.ethereum.org/)                                      | Aller    | Linux, Windows, macOS   | Mainnet, Görli, Rinkeby, Ropsten                    | Snap, Full                    | Archive, élagué |
| [Nethermind](http://nethermind.io/)                                     | C#, .NET | Linux, Windows, macOS   | Mainnet, Görli, Ropsten, Rinkeby et plus            | Fast, Beam, Archive           | Archive, élagué |
| [Besu](https://besu.hyperledger.org/en/stable/)                         | Java     | Linux, Windows, macOS   | Réseau principal, Rinkeby, Ropsten, Görli, and more | Rapide, complète              | Archive, élagué |
| [Erigon](https://github.com/ledgerwatch/erigon)                         | Aller    | Linux, Windows, macOS   | Mainnet, Görli, Rinkeby, Ropsten                    | Totale                        | Archive, élagué |
| [OpenEthereum (obsolète)](https://github.com/openethereum/openethereum) | Rust     | Linux, Windows, macOS   | Mainnet, Kovan, Ropsten et plus                     | Warp, complète                | Archive, élagué |

**Notez que OpenEthereum [a été déprécié](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) et n'est plus entretenu.** Utilisez-le avec prudence et, de préférence, passez à une autre implémentation client.

Pour plus d'information sur les réseaux pris en charge, lisez la page [Réseaux Ethereum](/developers/docs/networks/).

### Avantages des différentes implémentations {#advantages-of-different-implementations}

Chaque client présente des cas d'utilisation et des avantages uniques. Vous devez donc en choisir un en fonction de vos propres préférences. La diversité permet de concentrer les implémentations sur des fonctionnalités et des audiences d'utilisateurs différentes. Vous pouvez choisir un client en fonction des fonctionnalités, du support, du langage de programmation ou des licences.

#### Go Ethereum {#geth}

Go Ethereum (ou Geth, pour faire court) est l'une des implémentations initiales du protocole Ethereum. Il s'agit actuellement du client le plus répandu, avec la plus grande base d'utilisateurs et la plus grande variété d'outils pour les utilisateurs et les développeurs. Il est écrit en Go, entièrement open source et sous licence GNU LGPL v3.

#### OpenEthereum {#openethereum}

OpenEthereum est un client Ethereum avancé, rapide et riche en fonctionnalités, basé sur l'interface CLI. Il est conçu pour fournir l'infrastructure essentielle à des services rapides et fiables qui nécessitent une synchronisation rapide et un temps de fonctionnement maximal. Le but d'OpenEthereum est d'être le client Ethereum le plus rapide, le plus léger et le plus sûr. Il fournit une base de code propre et modulaire pour :

- une personnalisation facile ;
- une intégration légère dans les services ou les produits ;
- une empreinte mémoire et un stockage minimum.

OpenEthereum est développé à l'aide du langage de programmation de pointe Rust et sous licence GPLv3.

**Notez que OpenEthereum [a été déprécié](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) et n'est plus entretenu.** Utilisez-le avec prudence et, de préférence, passez à une autre implémentation client.

#### Nethermind {#nethermind}

Nethermind est une implémentation d'Ethereum créée avec la pile technologique C# .NET, fonctionnant sur les principales plateformes, y compris ARM. Elle offre de bonnes performances avec :

- une machine virtuelle optimisée ;
- un accès à l'état ;
- la mise en réseau et des fonctionnalités riches comme les tableaux de bord Prometheus/Grafana, la prise en charge de la journalisation d'entreprise seq, le traçage RPC JSON et les plugins d'analyse.

Nethermind dispose également d'[une documentation détaillée](https://docs.nethermind.io), d'un solide support de développement, d'une communauté en ligne et d'une assistance 24/7 disponible pour les utilisateurs premium.

#### Besu {#besu}

Hyperledger Besu est un client Ethereum de niveau entreprise pour les réseaux publics et privés. Il exécute toutes les fonctionnalités du réseau principal Ethereum, du traçage à GraphQL, dispose d'une surveillance étendue et est pris en charge par ConsenSys, à la fois dans les canaux communautaires ouverts et par le biais de SLA commerciaux pour les entreprises. Il est écrit en Java et se trouve sous licence Apache 2.0.

#### Erigon {#erigon}

Erigon, anciennement connu sous le nom de Turbo-Geth, est une fourche de Go Ethereum axée sur la vitesse et l'efficacité de l'espace disque. Erigon est une implémentation entièrement repensée d'Ethereum, actuellement écrite en Go mais pour laquelle des implémentations dans d'autres langages sont prévues. L'objectif d'Erigon est de fournir une implémentation plus rapide, plus modulaire et plus optimisée d'Ethereum. Il peut effectuer une synchronisation complète des nœuds d'archive en utilisant moins de 2 To d'espace disque, et ce en moins de 3 jours.

### Modes de synchronisation {#sync-modes}

Pour suivre et vérifier les données actuelles sur le réseau, le client Ethereum doit se synchroniser avec le dernier état du réseau. Cela se fait en téléchargeant des données depuis des pairs, en vérifiant cryptographiquement leur intégrité et en construisant une base de données blockchain en local.

Les modes de synchronisation offrent des approches différentes de ce processus, avec divers compromis. Les clients diffèrent également dans leur implémentation des algorithmes de synchronisation. Reportez-vous toujours à la documentation officielle du client choisi pour connaître les détails relatifs à l'implémentation.

#### Vue d'ensemble des stratégies {#overview-of-strategies}

Aperçu général des approches de synchronisation utilisées dans les clients prêts pour le réseau principal :

##### Synchronisation totale {#full-sync}

La synchronisation complète permet de télécharger tous les blocs (y compris les en-têtes, les transactions et les reçus) et génère l'état de la blockchain de façon incrémentielle en exécutant chaque bloc depuis le début.

- Minimise la confiance et offre la plus haute sécurité en vérifiant chaque transaction.
- Avec un nombre croissant de transactions, le traitement de toutes les transactions peut prendre des jours, voire des semaines.

##### Synchronisation rapide

La synchronisation rapide permet de télécharger tous les blocs (y compris les en-têtes, les transactions et les reçus), vérifie tous les en-têtes, télécharge l'état et le vérifie au regard des en-têtes.

- Repose sur la sécurité du mécanisme de consensus.
- La synchronisation ne prend que quelques heures.

##### Synchronisation légère

Le mode client léger permet de télécharger tous les en-têtes de bloc, les données de bloc et en vérifie certaines aléatoirement. Synchronise uniquement le point de la chaîne à partir du point de contrôle de confiance.

- Ne récupère que les derniers états en s'appuyant sur la confiance dans les développeurs et le mécanisme de consensus.
- Le client prêt à être utilisé avec l'état actuel du réseau en quelques minutes.

[En savoir plus sur les clients légers](https://www.parity.io/blog/what-is-a-light-client/)

##### Synchronisation instantanée

Implémenté par Geth. L'utilisation d'instantanés dynamiques servis par les pairs permet de récupérer toutes les données du compte et de stockage sans télécharger les nœuds d'arborescence intermédiaires puis de reconstruire ensuite l'arborescence Merkle localement.

- Stratégie de synchronisation la plus rapide développée par Geth, utilisée actuellement par défaut.
- Économise l'utilisation du disque et de bande passante du réseau sans pour autant sacrifier la sécurité.

[En savoir plus sur Snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md)

##### Synchronisation Warp

Implémenté par OpenEthereum. Les nœuds génèrent régulièrement des instantanés d'état critique de consensus et tout pair peut récupérer ces instantanés sur le réseau, permettant une synchronisation rapide à partir de ce point.

- Le mode de synchronisation le plus rapide et par défaut d'OpenEthereum repose sur des instantanés statiques servis par des pairs.
- Une stratégie similaire à la synchronisation instantanée mais sans certains avantages en matière de sécurité.

[En savoir plus sur Warp](https://openethereum.github.io/Beginner-Introduction#warping---no-warp)

##### Synchronisation Beam

Implémenté par Nethermind et Trinity. Fonctionne comme une synchronisation rapide, mais télécharge également les données nécessaires pour exécuter les derniers blocs, vous permettant ainsi d'interroger la chaîne dès les premières minutes de démarrage.

- Synchronise l'état d'abord et vous permet d'interroger RPC en quelques minutes.
- Toujours en développement et pas entièrement fiable, la synchronisation en arrière-plan est ralentie et les réponses RPC peuvent échouer.

[En savoir plus sur Beam](https://medium.com/@jason.carver/intro-to-beam-sync-a0fd168be14a)

#### Configuration dans le client {#client-setup}

Les clients offrent des options de configuration étendues pour répondre à vos besoins. Choisissez celle qui vous convient le mieux en fonction du niveau de sécurité, des données disponibles et des coûts. En dehors de l'algorithme de synchronisation, vous pouvez également configurer l'élagage de différents types d'anciennes données. L'élagage permet de supprimer les données obsolètes, par exemple en supprimant les nœuds d'état d'arborescence qui sont inaccessibles à partir de blocs récents.

Lisez attentivement la documentation ou la page d'aide du client pour savoir quel mode de synchronisation est le mode par défaut. Vous pouvez définir le type de synchronisation préféré lors de la configuration, comme suit :

**Configurer la synchronisation légère dans [GETH](https://geth.ethereum.org/) ou [ERIGON](https://github.com/ledgerwatch/erigon)**

`geth --syncmode "light"`

Pour plus de détails, consultez le tutoriel sur [l'exécution de Geth light node](/developers/tutorials/run-light-node-geth/).

**Configurer une synchronisation complète avec archive dans [Besu](https://besu.hyperledger.org/)**

`besu --sync-mode=FULL`

Comme toute autre configuration, elle peut être définie avec le drapeau de démarrage ou dans le fichier de configuration. Un autre exemple est [Nethermind](https://docs.nethermind.io/nethermind/) : il vous invite à choisir une configuration lors de la première initialisation et crée un fichier de configuration.

## Clients de consensus (anciennement clients 'Eth2') {#consensus-clients}

Il existe de nombreux clients de consensus (précédemment connus sous le nom de clients 'Eth2') qui supportent les [mises à niveau du consensus](/upgrades/beacon-chain/). Ils exécutent la Chaîne Phare et fourniront un mécanisme de consensus de preuve d'enjeu pour exécuter les clients après [La Fusion](/upgrades/merge/).

[Voir les clients de consensus](/upgrades/get-involved/#clients).

| Client                                                      | Langage    | Systèmes d'exploitation | Réseaux                               |
| ----------------------------------------------------------- | ---------- | ----------------------- | ------------------------------------- |
| [Teku](https://pegasys.tech/teku)                           | Java       | Linux, Windows, macOS   | Chaîne phare, Prater                  |
| [Nimbus](https://nimbus.team/)                              | Nim        | Linux, Windows, macOS   | Beacon Chain, Prater                  |
| [Lighthouse](https://lighthouse-book.sigmaprime.io/)        | Rust       | Linux, Windows, macOS   | Chaîne phare, Prater, Pyrmont         |
| [Lodestar](https://lodestar.chainsafe.io/)                  | TypeScript | Linux, Windows, macOS   | Chaîne phare, Prater                  |
| [Prysm](https://docs.prylabs.network/docs/getting-started/) | Aller      | Linux, Windows, macOS   | Chaîne phare, Gnosis, Prater, Pyrmont |

## Matériel {#hardware}

Les exigences matérielles diffèrent selon le client, mais ne sont en général pas si élevées puisque le nœud doit simplement rester synchronisé. Attention à ne pas confondre avec le minage, qui nécessite beaucoup plus de puissance de calcul. Le temps de synchronisation et les performances s'améliorent toutefois avec un matériel plus puissant. Selon vos besoins et vos souhaits, vous pouvez exécuter Ethereum sur votre ordinateur, votre serveur domestique, des ordinateurs monocartes ou des serveurs privés virtuels dans le cloud.

Vous pouvez facilement faire fonctionner votre propre nœud en utilisant un outil "plug and play" comme [DAppNode](https://dappnode.io/). Il fournit du matériel pour exécuter des clients et les applications qui en dépendent via une interface utilisateur simple.

### Conditions requises {#requirements}

Avant d'installer un client, assurez-vous que votre ordinateur dispose de suffisamment de ressources pour l'exécuter. Les exigences minimales et recommandées sont répertoriées ci-dessous, mais le facteur le plus important est l'espace disque. La synchronisation de la blockchain Ethereum est très exigeante en entrées/sorties. Il est préférable d'avoir un disque SSD. Pour exécuter un client Ethereum sur un disque dur, vous aurez besoin d'au moins 8 Go de RAM à utiliser comme cache.

#### Configuration minimale requise {#recommended-specifications}

- CPU avec 2 cœurs et +
- 4 Go de RAM minimum avec un disque SSD, 8 Go+ avec un disque dur
- Bande passante de 8 Mbps

#### Spécifications recommandées {#recommended-specifications}

- CPU rapide avec 4 cœurs et +
- 16 Go+ de RAM
- Disque SSD rapide avec au moins 500 Go d'espace libre
- Bande passante de 25 Mbps

Le mode de synchronisation que vous choisissez aura une incidence sur l'espace nécessaire, mais nous avons estimé ci-dessous l'espace disque dont vous aurez besoin pour chaque client.

| Client       | Taille du disque (synchro. rapide) | Taille du disque (archive complète) |
| ------------ | ---------------------------------- | ----------------------------------- |
| Geth         | 400 Go+                            | 6 To+                               |
| OpenEthereum | 280 Go+                            | 6 To+                               |
| Nethermind   | 200 Go+                            | 5 To+                               |
| Besu         | 750 Go+                            | 5 To+                               |
| Erigon       | N/A                                | 1 To+                               |

- Note : Erigon ne synchronise pas rapidement, mais le plein de Pruning est possible (~500 Go)

![Graphique montrant que le nombre de Go nécessaires pour une synchronisation complète a tendance à augmenter](./full-sync.png)

![Graphique montrant que le nombre de Go nécessaires pour une synchronisation d'archives a tendance à augmenter](./archive-sync.png)

Ces chiffres montrent l'évolution constante des exigences de stockage. Pour obtenir les données les plus récentes concernant Geth et OpenEthereum, vous pouvez consulter les pages [données de synchronisation complètes](https://etherscan.io/chartsync/chaindefault) et [données de synchronisation d'archives](https://etherscan.io/chartsync/chainarchive).

### Ethereum sur un ordinateur monocarte {#ethereum-on-a-single-board-computer}

La façon la plus pratique et la moins chère d'exécuter un nœud Ethereum est d'utiliser un ordinateur monocarte avec une architecture ARM, comme le Raspberry Pi. [Ethereum sur ARM](https://twitter.com/EthereumOnARM) propose des images des clients Geth, OpenEthereum, Nethermind, et Besu. Voici un tutoriel simple sur la façon de [construire et configurer un client ARM](/developers/tutorials/run-node-raspberry-pi/).

Les petits appareils abordables et efficaces de ce type sont parfaits pour exécuter un nœud chez soi.

## Complément d'information {#further-reading}

Il existe de nombreuses informations sur les clients Ethereum sur Internet. Voici quelques ressources qui pourraient vous être utiles.

- [Le B-A-BA de l'Ethereum, 2e partie - Comprendre les nœuds](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _- Wil Barnes, 13 février 2019_
- [Exécuter des nœuds Ethereum complets : un guide pour les peu motivés](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _- Justin Leroux, 7 novembre 2019_
- [Exécuter un nœud Ethereum](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/) _– ETHHub, mis à jour régulièrement_
- [Analyser les exigences matérielles pour être un nœud Ethereum entièrement validé](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _- Albert Palau, 24 septembre 2018_
- [Exécuter un nœud Hyperledger Besu sur le réseau principal d'Ethereum : avantages, exigences et configuration](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _- Felipe Faraggi, 7 mai 2020_

## Sujets connexes {#related-topics}

- [Les blocs](/developers/docs/blocks/)
- [Réseaux](/developers/docs/networks/)

## Tutoriels connexes {#related-tutorials}

- [Exécuter un nœud sur Geth](/developers/tutorials/run-light-node-geth/) _– Comment télécharger, installer et exécuter Geth. Couvre les modes de synchronisation, la console JavaScript et plus encore._
- [Transformez votre Raspberry Pi 4 en validateur de nœud en flashant une carte MicroSD – Le guide d'installation](/developers/tutorials/run-node-raspberry-pi/) _– Flashez votre Raspberry Pi 4, branchez un cable ethernet, connectez le disque SSD et alimentez l'appareil pour transformer votre Raspberry Pi 4 en un nœud Ethereum complet exécutant la couche d'exécution (réseau principal) et/ou la couche de consensus (Beacon Chain / Validator)._
