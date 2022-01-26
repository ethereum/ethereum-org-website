---
title: Nœuds et clients
description: Présentation des nœuds Ethereum et des logiciels clients, de la façon de configurer un nœud et des raisons de le faire.
lang: fr
sidebar: true
sidebarDepth: 2
isOutdated: true
---

Pour qu'Ethereum fonctionne de façon décentralisée, il faut un réseau distribué de nœuds qui peuvent vérifier les blocs et les données de transaction. Vous avez besoin d'une application ("un client") sur votre appareil pour "exécuter" un nœud.

## Prérequis {#prerequisites}

Vous devez comprendre le concept de réseau décentralisé avant d'approfondir le sujet et d'exécuter votre propre instance d'un client Ethereum. Commencez par lire la page [Introduction à Ethereum](/developers/docs/intro-to-ethereum/).

## En quoi consistent les nœuds et les clients? {#what-are-nodes-and-clients}

"Nœud" désigne un logiciel connu sous le nom de "client". Un client est une implémentation d'Ethereum qui vérifie toutes les transactions de chaque bloc, ce qui assure la sécurité du réseau et l'exactitude des données.

Vous pouvez voir une vue du réseau Ethereum en temps réel en consultant cette [carte des nœuds](https://etherscan.io/nodetracker).

De nombreuses [implémentations de clients Ethereum](/developers/docs/nodes-and-clients/#execution-clients) existent dans différentes langues. Ce qu'elles ont en commun, c'est qu'elles suivent toutes une spécification formelle. Cette spécification dicte le fonctionnement du réseau Ethereum et de la blockchain.

![Client Eth1x](../../../../../developers/docs/nodes-and-clients/client-diagram.png) Diagramme simplifié des fonctionnalités Ethereum Client

## Types de nœuds {#node-types}

Si vous voulez exécuter votre propre nœud, vous devez comprendre qu'il en existe plusieurs types, qui consomment les données différemment. En fait, les clients peuvent exécuter 3 types de nœuds différents : léger, complet et archive. Il existe aussi différentes options de stratégies de synchronisation qui permettent une synchronisation plus rapide. La synchronisation fait référence à la vitesse à laquelle on peut obtenir les informations les plus récentes sur l'état d'Ethereum.

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

- Stocke tout ce qui est conservé dans le nœud complet et construit une archive des états de l'historique. Nécessaire si vous voulez interroger quelque chose comme le solde d'un compte au niveau du bloc #4 000 000.
- Ces données représentent des unités de téraoctets qui rendent les nœuds d'archives moins attrayants pour les utilisateurs moyens, mais peuvent être utiles pour des services comme les explorateurs de blocs, les fournisseurs de portefeuilles et les analyses de chaînes.

La synchronisation des clients dans un autre mode que l'archive entraîne la suppression de données de la blockchain. Cela signifie qu'il n'y a pas d'archive de tous les états de l'historique, mais que le nœud complet est capable d'en construire sur demande.

## Pourquoi exécuter un nœud Ethereum ? {#why-should-i-run-an-ethereum-node}

Exécuter un nœud vous permet d'utiliser le service Ethereum en toute confiance et de façon privée, tout en prenant en charge l'écosystème.

### Avantages pour vous {#benefits-to-you}

L'exécution de votre propre nœud vous permet d'utiliser Ethereum de façon vraiment privée, intelligent et fiable. Vous n'avez pas besoin de faire confiance au réseau car vous pouvez vous-même vérifier les données avec votre client. "Ne faites pas confiance, vérifiez" est une devise populaire de la blockchain.

- Votre nœud vérifie lui-même toutes les transactions et tous les blocs par rapport aux règles de consensus. Cela signifie que vous n’avez ni à vous fier à d’autres nœuds du réseau ni à leur faire entièrement confiance.
- Vous n'aurez pas à divulguer vos adresses et vos soldes à des nœuds aléatoires. Tout peut être contrôlé avec votre propre client.
- Votre DApp peut être privée et plus sécurisée si vous utilisez votre propre nœud. [Metamask](https://metamask.io), [MyEtherWallet](https://myetherwallet.com) et d'autres portefeuilles peuvent être facilement pointés vers votre propre nœud local.

![Comment accéder à Ethereum via votre application et vos nœuds](../../../../../developers/docs/nodes-and-clients/nodes.png)

### Avantages du réseau {#network-benefits}

Un ensemble de nœuds divers est important pour la santé, la sécurité et la résilience opérationnelle d’Ethereum.

- Ils fournissent un accès aux données de la blockchain pour les clients légers qui en dépendent. Dans les pics d'utilisation, il faut avoir suffisamment de nœuds complets pour aider à la synchronisation des nœuds légers. Les nœuds légers ne stockent pas toute la blockchain. Au lieu de cela, ils vérifient les données via les [racines d'état des en-têtes de blocs](/developers/docs/blocks/#block-anatomy). Ils peuvent demander plus d'informations aux blocs si besoin est.
- Les nœuds complets appliquent les règles de consensus de preuve de travail afin qu'ils ne puissent pas être dupés et accepter des blocs qui ne les respectent pas. Ceci offre une sécurité supplémentaire au sein du réseau, car si tous les nœuds étaient des nœuds légers qui ne font pas de vérification complète, les mineurs pourraient attaquer le réseau et, par exemple, créer des blocs avec des récompenses plus élevées.

Quand vous exécutez un nœud complet, l'ensemble du réseau Ethereum en bénéficie.

## Exécuter son propre nœud {#running-your-own-node}

### Projets {#projects}

[**Sélectionnez un client et suivez ses instructions.**](#clients)

**ethnode -** **_Exécutez un nœud Ethereum (Geth ou Parity) pour du développement local._**

- [GitHub](https://github.com/vrde/ethnode)

**DAppNode -** **_Un système d'exploitation pour exécuter des nœuds Web3, y compris Ethereum, sur une machine dédiée._**

- [dappnode.io](https://dappnode.io)

### Ressources {#resources}

- [Running Ethereum Full Nodes: A Complete Guide](https://medium.com/coinmonks/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _ - Justin Leroux, 7 novembre 2019_
- [Node Configuration Cheat Sheet](https://dev.to/5chdn/ethereum-node-configuration-modes-cheat-sheet-25l8) _- Afri Schoeden, 5 janvier 2019_
- [How To Install & Run a Geth Node](https://www.quiknode.io/guides/infrastructure/how-to-install-and-run-a-geth-node) _- Sahil Sen, 4 octobre 2020_
- [How To Install & Run a OpenEthereum (fka. Parity) Node](https://www.quiknode.io/guides/infrastructure/how-to-run-a-openethereum-ex-parity-client-node) _- Sahil Sen, 22 septembre 2020_

## Alternatives {#alternatives}

L'exécution de votre propre nœud ou instance peut être difficile et n'est pas toujours nécessaire. Dans ce cas, vous pouvez utiliser un fournisseur d'API tiers comme [Infura](https://infura.io), [Alchemy](https://alchemyapi.io) ou [QuikNode](https://www.quiknode.io). Sinon, [ArchiveNode](https://archivenode.io/) est un nœud d'archive financé par la communauté, qui souhaite offrir des données d'archive sur la blockchain Ethereum aux développeurs indépendants.

Si quelqu'un exécute un nœud Ethereum avec une API publique dans votre communauté, vous pouvez pointer vos portefeuilles légers (comme MetaMask) vers un nœud communautaire [via un RPC personnalisé](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node) et gagner plus de confidentialité qu'avec un tiers de confiance aléatoire.

D'autre part, si vous exécutez un client, vous pouvez le partager avec vos amis qui pourraient en avoir besoin.

## Clients {#execution-clients}

Ethereum est conçu pour offrir des clients différents, développés par différentes équipes utilisant différents langages de programmation. Cela rend le réseau plus solide et plus diversifié. L'objectif idéal est de parvenir à une diversité sans qu'aucun client ne domine afin de réduire les points de défaillance uniques.

Ce tableau présente les différents clients. Tous font l'objet d'une maintenance et d'un travail actifs, et passent des [tests client](https://github.com/ethereum/tests).

| Client                                                       | Langage  | Systèmes d'exploitation | Réseaux                                  | Stratégies de synchronisation | Élagage d'état  |
| ------------------------------------------------------------ | -------- | ----------------------- | ---------------------------------------- | ----------------------------- | --------------- |
| [Geth](https://geth.ethereum.org/)                           | Go       | Linux, Windows, macOS   | Mainnet, Görli, Rinkeby, Ropsten         | Rapide, complète              | Archive, élagué |
| [OpenEthereum](https://github.com/openethereum/openethereum) | Rust     | Linux, Windows, macOS   | Mainnet, Kovan, Ropsten et plus          | Warp, complète                | Archive, élagué |
| [Nethermind](http://nethermind.io/)                          | C#, .NET | Linux, Windows, macOS   | Mainnet, Görli, Ropsten, Rinkeby et plus | Rapide, complète              | Archive, élagué |
| [Besu](https://pegasys.tech/solutions/hyperledger-besu/)     | Java     | Linux, Windows, macOS   | Mainnet, Rinkeby, Ropsten et Görli       | Rapide, complète              | Archive, élagué |
| [Trinity](https://trinity.ethereum.org/)                     | Python   | Linux, macOS            | Mainnet, Görli, Ropsten et plus          | Complet, Beam, Rapide/En-tête | Archive         |

Pour plus d'information sur les services, lisez la page [Réseaux Ethereum](/developers/docs/networks/).

### Avantages des différentes implémentations {#advantages-of-different-implementations}

Chaque client présente des cas d'utilisation et des avantages uniques. Vous devez donc en choisir un en fonction de vos propres préférences. La diversité permet de concentrer les implémentations sur des fonctionnalités et des audiences d'utilisateurs différentes. Vous pouvez choisir un client basé sur des fonctionnalités, du support, du langage de programmation ou des licences.

#### Go Ethereum {#geth}

Go Ethereum (ou Geth, pour faire court) est l'une des implémentations initiales du protocole Ethereum. C'est actuellement le client le plus répandu, avec la plus grande base d'utilisateurs et la plus grande variété d'outils pour les utilisateurs et les développeurs. Il est écrit en Go, entièrement open source et sous licence GNU LGPL v3.

#### OpenEthereum {#openethereum}

OpenEthereum est un client Ethereum avancé, rapide et riche en fonctionnalités, basé sur l'interface CLI. Il est conçu pour fournir l'infrastructure essentielle à des services rapides et fiables qui nécessitent une synchronisation rapide et un temps de fonctionnement maximal. Le but d'OpenEthereum est d'être le client Ethereum le plus rapide, le plus léger et le plus sûr. Il fournit une base de code propre et modulaire pour :

- une personnalisation facile ;
- une intégration légère dans les services ou les produits ;
- une empreinte mémoire et un stockage minimum.

OpenEthereum est développé avec le langage de programmation Rust et sous licence GPLv3.

#### Nethermind {#nethermind}

Nethermind est une implémentation d'Ethereum créée avec la pile technologique C# .NET, fonctionnant sur toutes les principales plateformes, y compris ARM. Elle offre de bonnes performances avec :

- une machine virtuelle optimisée ;
- un accès à l'état ;
- la mise en réseau et des fonctionnalités riches comme les tableaux de bord Prometheus/Graphana, la prise en charge de la journalisation d'entreprise seq, le traçage RPC JSON et les plugins d'analyse.

Nethermind dispose également d'[une documentation détaillée](https://docs.nethermind.io), d'un solide support de développement, d'une communauté en ligne et d'une assistance 24/7 disponible pour les utilisateurs premium.

#### Besu {#besu}

Hyperledger Besu est un client Ethereum de qualité entreprise pour les réseaux publics et privés. Il exécute toutes les fonctionnalités du réseau principal Ethereum, du traçage à GraphQL, dispose d"une surveillance étendue et est pris en charge par ConsenSys, à la fois dans les canaux communautaires ouverts et par le biais de SLA commerciaux pour les entreprises. Il est écrit en Java et est sous licence Apache 2.0.

### Modes de synchronisation {#sync-modes}

- Complet : Télécharge tous les blocs (y compris les en-têtes, les transactions et les reçus) et génère l'état de la blockchain de façon incrémentielle en exécutant chaque bloc.
- Rapide (par défaut) : Télécharge tous les blocs (y compris les en-têtes, les transactions et les reçus), vérifie tous les en-têtes, puis télécharge l'état et le vérifie par rapport aux en-têtes.
- Léger : Télécharge tous les en-têtes de bloc, les données de bloc et en vérifie certaines aléatoirement.
- Synchronisation Warp : Tous les 5 000 blocs, les nœuds prendront un instantané de l'état de ce bloc, essentiel pour le consensus. N'importe quel nœud peut récupérer ces instantanés sur le réseau, ce qui permet une synchronisation rapide. [Plus d'infos sur la synchronisation Warp](https://openethereum.github.io/wiki/Warp-Sync-Snapshot-Format)
- Synchronisation Beam : Mode de synchronisation qui vous permet d'aller plus vite. Il n'exige pas de longues attentes pour synchroniser, mais remplit les données au fil du temps. [Plus d'infos sur la synchronisation Beam](https://medium.com/@jason.carver/intro-to-beam-sync-a0fd168be14a)
- Synchronisation des en-têtes : Vous pouvez utiliser un point de contrôle fiable pour commencer à synchroniser à partir d'un en-tête plus récent, puis laisser un processus en arrière-plan pour éventuellement combler les vides.

Vous définissez le type de synchronisation lors de la configuration, comme suit :

**Configuration d'une synchronisation légère dans [GETH](https://geth.ethereum.org/)**

`geth --syncmode "light"`

**Configuration d"une synchronisation des en-têtes dans Trinity**

`trinity --sync-from-checkpoint eth://block/byhash/0xa65877df954e1ff2012473efee8287252eee956c0d395a5791f1103a950a1e21?score=15,835,269,727,022,672,760,774`

## Matériel {#hardware}

Les exigences matérielles diffèrent selon le client, mais ne sont en général pas si élevées puisque le nœud doit simplement rester synchronisé. Attention à ne pas confondre avec le minage, qui nécessite beaucoup plus de puissance de calcul. Le temps de synchronisation et les performances s'améliorent toutefois avec un matériel plus puissant. Selon vos besoins et vos souhaits, vous pouvez exécuter Ethereum sur votre ordinateur, votre serveur domestique, des ordinateurs monocartes ou des serveurs privés virtuels dans le cloud.

Un moyen facile d'exécuter votre propre nœud est d'utiliser un outil "plug and play" comme [DAppNode](https://dappnode.io/). Il fournit du matériel pour exécuter des clients, et les applications qui en dépendent, via une interface utilisateur simple.

### Conditions requises {#requirements}

Avant d'installer un client, assurez-vous que votre ordinateur dispose de suffisamment de ressources pour l'exécuter. Les exigences minimales et recommandées sont répertoriées ci-dessous, mais l'élément clé est l'espace disque. La synchronisation de la blockchain Ethereum est très intense en entrées/sorties. Il est préférable d'avoir un disque SSD. Pour exécuter un client Ethereum sur un disque dur, au moins 8 Go de RAM seront nécessaires pour l'utiliser comme cache.

#### Configuration minimale requise {#recommended-specifications}

- CPU avec 2 cœurs et +
- 4 Go de RAM minimum avec un disque SSD, 8 Go+ avec un disque dur
- Bande passante de 8 Mbps

#### Spécifications recommandées {#recommended-specifications}

- CPU rapide avec 4 cœurs et +
- 16 Go+ de RAM
- Disque SSD rapide avec au moins 500 Go d'espace libre
- Bande passante de 25 Mbps

Selon le logiciel et le mode de synchronisation utilisés, des centaines de Go d'espace disque seront nécessaires. Voici quelques chiffres approximatifs :

| Client       | Taille du disque (synchro. rapide) | Taille du disque (archive complète) |
| ------------ | ---------------------------------- | ----------------------------------- |
| Geth         | 400 Go+                            | 4,7 To+                             |
| OpenEthereum | 280 Go+                            | 4,6 To+                             |
| Nethermind   | 200 Go+                            | 3 To+                               |
| Besu         | 750 Go+                            | 4 To+                               |

![Graphique montrant que le nombre de Go nécessaires pour une synchronisation complète a tendance à augmenter](../../../../../developers/docs/nodes-and-clients/full-sync.png)

![Graphique montrant que le nombre de Go nécessaires pour une synchronisation d'archives a tendance à augmenter](../../../../../developers/docs/nodes-and-clients/archive-sync.png)

Ces chiffres montrent l'évolution constante des exigences de stockage. Pour obtenir les informations Geth et Parity les plus récentes, lisez les page sur les [données de synchronisation complètes](https://etherscan.io/chartsync/chaindefault) et les [données de synchronisation d'archives](https://etherscan.io/chartsync/chainarchive).

### Ethereum sur un ordinateur monocarte {#ethereum-on-a-single-board-computer}

La façon la plus pratique et la moins chère d'exécuter un nœud Ethereum est d'utiliser un ordinateur monocarte avec une architecture ARM, comme le Raspberry Pi. [Ethereum on ARM](https://twitter.com/EthereumOnARM) fournit des images de clients Geth, Parity, Nethermind et Besu. Voici un tutoriel simple sur la façon de [construire et configurer un client ARM](/developers/tutorials/run-node-raspberry-pi/).

Les petits appareils abordables et efficaces de ce type sont parfaits pour exécuter un nœud chez soi.

## Clients Eth2 {#consensus-clients}

Il existe de nouveaux clients pour prendre en charge les [mises à niveau Eth2](/upgrades/beacon-chain/). Ils exécuteront la chaîne phare et prendront en charge le nouveau mécanisme de consensus de [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/).

[Voir les clients Eth2](/upgrades/get-involved/#clients)

## Complément d'information {#further-reading}

Il existe nombre d'instructions et d'informations sur Internet concernant les clients Ethereum. Voici quelques liens qui pourraient vous être utiles.

- [Ethereum 101 - Part 2 - Understanding Nodes](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _- Wil Barnes, 13 février 2019_
- [Running Ethereum Full Nodes: A Guide for the Barely Motivated](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _- Justin Leroux, 7 novembre 2019_
- [Running an Ethereum Node](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/) _– ETHHub, mis à jour régulièrement_
- [Analyzing the hardware requirements to be an Ethereum full validated node](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _- Albert Palau, 24 septembre 2018_
- [Running a Hyperledger Besu Node on the Ethereum Mainnet: Benefits, Requirements, and Setup](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _- Felipe Faraggi, 7 mai 2020_

## Sujets connexes {#related-topics}

- [Blocs](/developers/docs/blocks/)
- [Réseaux](/developers/docs/networks/)

## Tutoriels connexes {#related-tutorials}

- [Running a Node with Geth](/developers/tutorials/run-light-node-geth/) _- Comment télécharger, installer et exécuter Geth. Couvre les modes de synchronisation, la console JavaScript, et plus encore._
- [Turn your Raspberry Pi 4 into an Eth 1.0 or Eth 2.0 node just by flashing the MicroSD card – Installation guide](/developers/tutorials/run-node-raspberry-pi/) _- Flashez votre Raspberry Pi 4, branchez un câble Ethernet, connectez le disque SSD et mettez l'appareil sous tension pour transformer le Raspberry Pi 4 en un nœud Ethereum 1.0 complet ou en un nœud Ethereum 2.0 (chaîne phare/validateur)._
