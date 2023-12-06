---
title: Logiciels obsolètes
description: Logiciel qui a été rendu obsolète par ses mainteneurs
lang: fr
sidebarDepth: 2
---

# Logiciels obsolètes {#summary-deprecated-software}

Il s'agit d'une liste des principaux projets et ressources liés à Ethereum qui ont été abandonnés ou qui ne sont plus actualisés. Il est important de mettre en évidence les outils obsolètes afin que les utilisateurs puissent trouver des alternatives viables et pour éviter que des versions malveillantes ne soient distribuées.

Elle est supervisée par notre communauté. S'il y a quelque chose manquant ou incorrect, veuillez modifier cette page!

## Preuve de travail {#pow}

[Proof of work](/developers/docs/consensus-mechanisms/pow) est un moteur de consensus qui était implémenté sur Ethereum jusqu'en septembre 2022. Il a été abandonné lorsque Ethereum est passé à un mécanisme de consensus basé sur la [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos) (proof-of-stake). Cela a été réalisé en dépréciant les parties du logiciel client liées au minage en preuve de travail, y compris [Ethhash](/developers/docs/consensus-mechanisms/pow/mining-algorithms/ethhash) (l'algorithme de minage) et toute la logique de consensus et la fonctionnalité de diffusion de blocs qui étaient initialement intégrées dans les clients d'exécution. Les clients eux-mêmes n'ont pas été supprimés, mais plusieurs de leurs composants essentiels l'ont été. Le concept de preuve de travail a été abandonné en raison de l'effet total de la suppression des composants associés du logiciel client.

## Logiciel {#software}

Cette section concerne les logiciels de bureau, en ligne de commande ou de serveur qui ont été dépréciés. Les principaux types sont les portefeuilles, les environnements de développement intégrés, les langages et les clients Ethereum. Veillez à ne pas installer de logiciels obsolètes à moins d'être certain qu'ils proviennent de la source d'origine, par exemple d'un dépôt hébergé sur https://github.com/ethereum.

### OpenEthereum {#open-ethereum}

<p align="center">
  <img width="300" height="180" 
    style={{ backgroundColor: "#fff", padding: "0px 10px 0px 10px" }}
    src="https://miro.medium.com/max/1400/1*npKIT4jX5WwlRZmcBPusig.png" />
</p>

Rendu obsolète en juillet 2021

**Résumé**

OpenEthereum était la deuxième implémentation d'Ethereum en termes de nombre de nœuds. OpenEthereum a joué un rôle important en étant un élément clé de l'infrastructure pour certains des plus importants utilisateurs d'Ethereum comme Etherscan et Gnosis Safe. Ses capacités de traçage le distinguent des autres clients, garantissant une synchronisation fiable et rapide pour les fournisseurs de données.

**Archives**

[Repo GitHub archivé](https://github.com/openethereum/openethereum)

**Historique**

OpenEthereum a été conçu pour les mineurs, les fournisseurs de services et les échanges qui ont besoin d'une synchronisation rapide et d'une disponibilité maximale. OpenEthereum a fourni l'infrastructure de base indispensable à la rapidité et à la fiabilité des services.

**Alternatives**

[Comparer toutes les options de clients d'exécution Ethereum](/developers/docs/nodes-and-clients/#execution-clients).

### Grid {#grid}

<p align="center">
  <img width="300" height="150" 
    style={{ backgroundColor: "#fff", padding: "0px 10px 0px 10px" }}
    src="https://user-images.githubusercontent.com/47108/53807420-80433380-3f1d-11e9-80cd-967aabb26506.png" />
</p>

Rendu obsolète le 10 décembre 2020

**Résumé**

Grid était une application de bureau basée sur JavaScript qui vous permettait d'accéder en toute sécurité à Ethereum, IPFS et à d'autres réseaux décentralisés. Il proposait une interface conviviale pour aider un public moins technique à interagir en toute sécurité avec les dapps, améliorant ainsi l'accessibilité pour tous.

**Archives**

[Repo GitHub archivé](https://github.com/ethereum/grid)

**Historique**

Grid pourrait être considéré comme le successeur de Mist, également une application de bureau autonome, basée sur JavaScript, qui comprenait un nœud Geth. Grid a supprimé l'aspect portefeuille et a ajouté une approche de type plugin pour exécuter différents types de nœuds.

**Alternatives**

[DAppNode](https://dappnode.io/) est une plateforme de déploiement et d'hébergement de dApps, de clients P2P et de nœuds blockchain.

### Ethereum Studio {#ethereum-studio}

<p align="center">
  <img width="500" height="350" 
    style={{ backgroundColor: "#fff", padding: "0px 10px 0px 10px" }}
    src="https://user-images.githubusercontent.com/7814134/78335917-d0f8e600-758e-11ea-91e1-2433eaaef6f4.png" />
</p>

Rendu obsolète le 7 décembre 2020

**Résumé**

Ethereum Studio était un IDE en ligne qui permettait aux utilisateurs de créer et de tester des contrats intelligents, ainsi que de construire des interfaces pour eux.

**Archives**

[Repo GitHub archivé](https://github.com/SuperblocksHQ/ethereum-studio)

**Historique**

Ethereum Studio a été développé pour fournir aux utilisateurs un IDE doté d'une blockchain Ethereum intégrée et d'un compilateur Solidity. De plus, il offrait la possibilité de modifier en direct le code et d'exporter des dApps complets sans avoir besoin d'un terminal.

**Alternatives**

[Remix](https://remix.ethereum.org/) est un IDE web alternatif pour le développement Solidity. Le [portail développeur](/developers/) propose des outils pour le développement web et local, la documentation et bien plus encore.

### Portefeuille Dapp Meteor {#meteor-dapp-wallet}

<p align="center">
  <img width="600" height="450" 
    style={{ backgroundColor: "#fff", padding: "0px 10px 0px 10px" }}
    src="https://miro.medium.com/max/700/0*L222OAjPhe_KL1Iy." />
</p>

Rendu obsolète le 27 mars 2019

**Résumé**

Le portefeuille Meteor Dapp était un composant de Mist, un portefeuille Ethereum pour gérer les comptes Ethereum et interagir avec des contrats intelligents. Pendant de nombreuses années, l'interface web du Meteor Dapp Wallet était hébergée en tant que sous-domaine « wallet.ethereum.org ».

Le contrat multisignataire Mist (code solidity) était également inclus, et Meteor Dapp Wallet présentait une interface utilisateur pour le configurer et le déployer.

**Non obsolète : Mist Multisigs déployés**

Le multi-signataire Mist -- déployé sous forme de bytecode sur le réseau principal d'Ethereum par des milliers d'utilisateurs -- continue d'être utilisé pour stocker et gérer de la valeur sans incident. [Comment interagir avec un contrat multisignataire Mist](https://support.mycrypto.com/how-to/sending/how-to-interact-with-a-multisig-contract) offre une bonne vue d'ensemble de la manière d'utiliser ces contrats intelligents.

**Archives**

[Repo GitHub archivé](https://github.com/ethereum/meteor-dapp-wallet)

**Historique**

Voir Mist ci-dessous.

**Alternatives**

Voir la page [Portefeuilles Ethereum](/wallets/) sur ethereum.org.

### Mist {#mist}

<p align="center">
  <img width="120" height="200" 
    style={{ backgroundColor: "#fff", padding: "0px 10px 0px 10px" }}
    src="https://mist.ethereum.org/images/logo@2x.png" />
</p>

Rendu obsolète le 27 mars 2019

**Résumé**

Mist était un navigateur spécialisé construit grâce à Electron qui permettait aux utilisateurs de gérer des comptes Ethereum et d'interagir avec des dApps hébergées sur le web conventionnel.

**Archives**

[Repo GitHub archivé](https://github.com/ethereum/mist)

**Historique**

Mist a été une première expérience importante qui a permis d'explorer la manière de gérer les clés Ethereum, d'initier les utilisateurs aux outils financiers, tels que les multisigs, et de démontrer le fonctionnement du Web3. Des innovations ont également été révélées aux utilisateurs, comme les blockies, des graphiques mignons et mémorables de style 8 bits représentant les clés Ethereum.

**Alternatives**

[MetaMask](https://metamask.io/) est un portefeuille intégré au navigateur qui vous permet de gérer des clés Ethereum et d'interagir avec des DApps. Il est disponible en tant qu'extension pour Google Chrome et Firefox, et est inclus dans [Brave Browser](https://brave.com/).

### Mix {#mix}

Rendu obsolète le 11 août 2016

**Résumé**

Mix était un IDE développé en C++ qui permettait aux développeurs de construire et de déployer des contrats intelligents sur Ethereum.

**Archives**

[Repo GitHub archivé](https://github.com/ethereum/mix)

**Historique**

Mix était une des premières applications en lien avec Ethereum. Voir la [présentation de Gavin Wood à Devcon0](https://www.youtube.com/watch?v=hcP_z_wBlaM).

**Alternatives**

[Remix](https://remix.ethereum.org/) est un IDE hébergé dans un navigateur pour le développement, le test et le déploiement de contrats Solidity / intelligents. Il dispose également d'une option de bureau.

### Minimal {#minimal}

Rendu obsolète en 2020.

**Résumé**

Minimal était une implémentation modulaire de la blockchain Ethereum écrite en Go.

**Archives**

[Repo GitHub archivé](https://github.com/umbracle/minimal)

**Historique**

Minimal a été remplacé par [polgon-sdk](https://github.com/0xPolygon/polygon-edge)

### Hyperledger Burrow {#hyperledger-burrow}

Rendu obsolète en 2022.

**Résumé**

Hyperledger Burrow était un nœud de blockchain de contrat intelligent Ethereum avec autorisation. Il exécutait le code de contrat intelligent Ethereum EVM et WASM sur des machines virtuelles autorisées.

**Archives**

[Repo GitHub archivé](https://github.com/hyperledger/burrow)

### Mana-Ethereum {#mana-ethereum}

**Résumé**

Mana-Ethereum était un client Ethereum construit avec Elixir.

**Archives**

[Repo GitHub archivé](https://github.com/mana-ethereum/mana)

**Historique**

Le dépôt GitHub de Mana-Ethereum n'a pas été explicitement archivé, mais le dernier engagement date de 2019.

### Aleth (cpp-ethereum) {#aleth}

Rendu obsolète le 6 octobre 2021

**Résumé**

Aleth (anciennement connu sous le nom de cpp-ethereum) était un client Ethereum écrit en C++.

**Archives**

[Repo GitHub archivé](https://github.com/ethereum/aleth)

**Historique**

Aleth était le troisième client le plus populaire pour Ethereum avant d'être rendu obsolète le 6 octobre 2021.

**Alternatives**

[Geth](https://geth.ethereum.org/) est un client Ethereum alternatif bien connu.

### Ethereum-H {#ethereum-h}

**Archives**

Les archives d'Ethereum-H ont été retirées de GitHub.

**Historique**

Ethereum-H était un client Ethereum écrit en Haskell. Il a été rendu obsolète aux alentours de 2015.

**Alternatives**

[Geth](https://geth.ethereum.org/), [Nethermind](http://nethermind.io/), [Besu](https://besu.hyperledger.org/en/stable/) et [Erigon](https://github.com/ledgerwatch/erigon) sont des clients Ethereum alternatifs viables - il n'y a actuellement aucun client Haskell.

### ruby-ethereum {#ruby-ethereum}

**Archives**

[repo GitHub de ruby-ethereum](https://github.com/cryptape/ruby-ethereum)

**Historique**

ruby-ethereum était un client Ethereum écrit en Ruby. Il a été rendu obsolète aux alentours de 2018.

**Alternatives**

[Geth](https://geth.ethereum.org/), [Nethermind](http://nethermind.io/), [Besu](https://besu.hyperledger.org/en/stable/) et [Erigon](https://github.com/ledgerwatch/erigon) sont des clients Ethereum alternatifs viables. Il n'y a actuellement aucun client Ruby.

### Parity {#parity}

<p align="center">
  <img width="240" height="180" 
    style={{ backgroundColor: "#fff", padding: "0px 10px 0px 10px" }}
    src="https://davidgerard.co.uk/blockchain/wp-content/uploads/2017/11/parity-logo.png" />
</p>

Rendu obsolète le 2 juin 2020

**Résumé**

Parity était un client Ethereum écrit en Rust.

**Archives**

[Repo GitHub archivé](https://github.com/openethereum/parity-ethereum)

**Historique**

En tant que l'un des deux principaux clients viables dans les premières années d'Ethereum (l'autre étant Geth), Parity était une partie cruciale de l'écosystème. Lors des attaques de Shanghai en 2016, Parity a permis au réseau Ethereum de continuer à fonctionner lorsque des clients comme Geth ont été détruits par l'attaque, prouvant ainsi l'importance de la diversité des clients.

**Alternatives**

[Erigon](https://github.com/ledgerwatch/erigon) (auparavant appelé Turbo-Geth) est un client Ethereum de nouvelle génération à la pointe de l'efficacité, écrit en Go.

**Note :** _Le projet successeur du client Ethereum Parity était [OpenEthereum](https://github.com/openethereum/openethereum) **qui a depuis été rendu obsolète.**_

La ressource ["Lancez votre propre nœud Ethereum"](/developers/docs/nodes-and-clients/run-a-node/#getting-the-client) sur ethereum.org comprend une section pour télécharger, installer et exécuter un client Ethereum.

### Trinity {#trinity}

<p align="center">
  <img width="230" height="150" 
    style={{ backgroundColor: "#fff", padding: "0px 10px 0px 10px" }}
    src="https://trinity.ethereum.org/images/trinity-logo-icon.svg" />
</p>

Rendu obsolète le premier juillet 2021

**Résumé**

Trinity était un client Ethereum Python qui a servi d'outil de recherche éducatif pour la communauté. Un grand nombre de modules basés en Python en rapport avec Trinity continuent à être maintenus par la même équipe, comme [Py-EVM](https://github.com/ethereum/py-evm).

**Archives**

[Repo GitHub archivé](https://github.com/ethereum/trinity)

**Historique**

Trinity était le projet successeur de [pyethereum](https://github.com/ethereum/pyethereum/tree/b704a5c6577863edc539a1ec3d2620a443b950fb), un client Ethereum basé sur python des débuts.

**Alternatives**

La ressource ["Lancez votre propre nœud Ethereum"](/developers/docs/nodes-and-clients/run-a-node/#getting-the-client) sur ethereum.org comprend une section pour télécharger, installer et exécuter un client Ethereum.

Le projet [EthereumJS](https://github.com/ethereumjs) a un cas d'utilisation de recherche et éducatif similaire à celui de Trinity.

## DApps et Services {#dapps-and-services}

Cette section est destinée aux services déployés sur le réseau principal Ethereum et d'autres réseaux basés sur EVM. Soyez conscient que les DApps et les services ici peuvent inclure des applications DeFi qui ont été piratées ou qui peuvent présenter des vulnérabilités de sécurité en raison du manque de maintenance, des changements dans le protocole, etc.

### Cover Protocol {#cover-protocol}

<p align="center">
  <img width="400" height="267" 
    style={{ backgroundColor: "#fff", padding: "0px 0px 0px 0px" }}
    src="https://miro.medium.com/max/1838/0*kA6PGbaYHLJOI66O" />
</p>

Fermé à l'automne 2021

**Résumé**

Cover était un protocole d'assurance DeFi fonctionnant sur Ethereum et d'autres réseaux basés sur EVM.

**Archives**

[Site Web](https://wayback.archive-it.org/17679/20211004074635/https://www.coverprotocol.com/)

[Articles Medium](https://wayback.archive-it.org/17679/20211004074633/https://coverprotocol.medium.com/)

[Répertoire GitHub](https://github.com/CoverProtocol/cover-core-v1)

[Documentation](https://wayback.archive-it.org/17679/20211004074634/https://docs.coverprotocol.com/)

### La DAO {#the-dao}

Piraté et fermé à l'été 2016

**Résumé**

The DAO était un contrat intelligent, une DApp, et un forum pour organiser le financement de projets. Une vulnérabilité a été exploitée et une grande partie de l'ETH a été vidée, conduisant à un hard fork organisé par la communauté afin de restituer l'ETH à ceux qui avaient déposé dans The DAO. L'interface utilisateur et le forum sont arrêtés.

**Archives**

[Archive Internet de « daohub.org » le 14 mai 2016](https://web.archive.org/web/20160514105232/https://daohub.org/)

**Historique**

Bien que The DAO ait échoué, le concept a perduré. Le modèle technique, social et de gouvernance innovant pour The DAO est largement utilisé dans les communautés DeFi, NFT et de financement de projets.

[« DAO Fork » sur ethereum.org](/history/#dao-fork)

[Entrée Wikipedia pour « The DAO »](<https://wikipedia.org/wiki/The_DAO_(organization)>)

**Alternatives**

[« DAOs » sur ethereum.org](/dao/)

[MolochDAO](https://www.molochdao.com/)

[Gitcoin Grants](https://gitcoin.co/grants/)

### SparkPool {#sparkpool}

<p align="center">
  <img width="562" height="124" 
    style={{ backgroundColor: "#fff", padding: "0px 10px 0px 10px" }}
    src="https://cryptodiffer.com/src/images/person/SparkPool-cryptodiffer.png" />
</p>

Fermé à l'automne 2021

**Résumé**

Basé à Hangzhou, le service et la communauté SparkPool constituaient l'un des plus grands pools de minage centrés sur Ethereum au monde.

**Archives**

**Historique**

Associé à la communauté EthFans, le service a été lancé en 2015. SparkPool a été dissous à l'automne 2021 à la suite de régulations légales plus strictes.

**Alternatives**

[Ethermine](https://ethermine.org/)

## Documentation et Sources d'Informations {#documentation-and-information-sources}

Il y a de nombreuses sources de documentations, des articles, des tutoriels et des forums qui sont maintenant supprimés ou vivants mais plus maintenus. Nous en avons sélectionné quelques-uns qui sont significatifs ou dont le statut actuel en tant que déprécié peut conduire à la confusion ou aux tentatives d'escroquerie.

### Ancien Wiki et eth.wiki {#eth-wiki}

**Résumé**

Legacy Wiki et eth.wiki étaient des wikis entretenus par la Fondation Ethereum pour la communauté élargie. Ils étaient principalement orientés vers l'hébergement de descriptions détaillées des aspects clés de la plateforme Ethereum et des résumés des feuilles de route techniques.

**Archives**

[Repo GitHub archivé pour eth.wiki](https://github.com/ethereum/eth-wiki)

[Repo GitHub archivé pour Legacy Wiki](https://github.com/ethereum/wiki/wiki)

**Historique**

Legacy Wiki était un wiki GitHub et un tout premier lieu de contenu technique (incluant le livre blanc original d'Ethereum). Avec le temps, les développeurs d'Ethereum ont transféré leur documentation, leurs spécifications et leur travail de description technique vers d'autres plateformes comme [Read the Docs](https://readthedocs.org/) et le contenu hébergé sur GitHub.

En 2019 et 2020, eth.wiki est devenu le successeur de Legacy Wiki, mais une communauté durable de contributeurs n'a pas vu le jour.

**Alternatives**

Contenu dirigé par la communauté : [Site web Ethereum.org](/)

Les projets logiciels Ethereum hébergent souvent leur documentation sur [Read the Docs](https://readthedocs.org/)

Spécifications techniques hébergées sur GitHub : [EIPs](https://github.com/ethereum/EIPs), [Spécifications d'Exécution](https://github.com/ethereum/execution-specs), [Spécifications de Consensus](https://github.com/ethereum/consensus-specs)

### forum.ethereum.org {#forum-ethereum-org}

**Résumé**

Le Forum Communautaire Ethereum était un forum de discussion entretenu par la Fondation Ethereum et hébergé sur Vanilla Forums. Il utilisait le sous-domaine « forum.ethereum.org ».

**Archives**

URL d'archive : [https://wayback.archive-it.org/16516/20210618210825/https://forum.ethereum.org/](https://wayback.archive-it.org/16516/20210618210825/https://forum.ethereum.org/)

**Historique**

Ce forum était un forum de discussion « officiel » et précoce pour la communauté Ethereum. Avec [/r/ethereum](https://reddit.com/r/ethereum) et quelques chaînes Skype, c'était un point de coordination important pour les développeurs, designers et organisateurs. Au fil des ans, les participants du Forum se sont dispersés et il est devenu davantage un lieu pour la communauté de minage.

**Alternatives**

[/r/ethereum](https://reddit.com/r/ethereum), et un grand nombre de forums DAO et de serveurs Discord.

## Canaux Gitter {#gitter-channels}

### AllCoreDevs {#allcorewdevs-gitter}

**Résumé**

AllCoreDevs Gitter était le principal canal de communication public pour la coordination des [développeurs principaux des clients Ethereum](https://github.com/ethereum/pm/).

**Archives**

[le canal Gitter ethereum/AllCoreDevs](https://gitter.im/ethereum/AllCoreDevs)

**Alternatives**

Veuillez utiliser le canal « allcoredevs » sur le [EthR&D Serveur Discord EthR&D](https://discord.gg/qHv7AjTDuK)

### EthereumJS {#ethereumjs-gitter}

**Résumé**

EthereumJS Gitter était le principal canal de communication publique pour la coordination du [projet EthereumJS](https://ethereumjs.github.io/).

**Archives**

[le canal Gitter ethereum/EthereumJS](https://gitter.im/ethereum/ethereumjs)

**Alternatives**

Veuillez utiliser le [Serveur Discord EthereumJS](https://discord.gg/TNwARpR)
