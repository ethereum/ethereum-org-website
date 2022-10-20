---
title: Bibliothèques d'API backend
description: Introduction aux API clientes Ethereum, qui vous permettent d'interagir avec la blockchain depuis votre application.
lang: fr
---

Pour qu'une application logicielle puisse interagir avec la blockchain Ethereum (c'est-à-dire lire les données de la blockchain et/ou envoyer des transactions sur le réseau), elle doit se connecter à un nœud Ethereum.

Dans cet objectif, chaque client Ethereum implémente la spécification [JSON-RPC](/developers/docs/apis/json-rpc/) pour former un ensemble uniforme de [points de terminaison](/developers/docs/apis/json-rpc/#json-rpc-methods) sur lesquels les applications peuvent s'appuyer.

Si vous souhaitez utiliser un langage de programmation spécifique pour vous connecter à un nœud Ethereum, vous pouvez développer votre propre solution, mais il existe plusieurs bibliothèques pratiques au sein de l'écosystème qui facilitent grandement cette tâche. Avec ces bibliothèques, les développeurs peuvent rédiger des méthodes intuitives d'une seule ligne pour initialiser les demandes JSON-RPC (pas directement visibles) qui interagissent avec Ethereum.

## Prérequis {#prerequisites}

Il peut être utile de comprendre en quoi consiste la [pile Ethereum](/developers/docs/ethereum-stack/) et les [clients Ethereum](/developers/docs/nodes-and-clients/).

## Pourquoi utiliser une bibliothèque ? {#why-use-a-library}

Ces bibliothèques suppriment une grande partie de la complexité d'une interaction directe avec un nœud Ethereum. Elles fournissent également des fonctions utilitaires (par ex. convertir des ETH en gwei) afin que vous puissiez, en tant que développeur, passer moins de temps à gérer les subtilités des clients Ethereum et plus de temps à vous consacrer aux fonctionnalités uniques de votre application.

## Bibliothèques disponibles {#available-libraries}

**Alchemy -** **_Plateforme de développement Ethereum._**

- [alchemy.com](https://www.alchemy.com/)
- [Documentation](https://docs.alchemyapi.io/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/A39JVCM)

**BlockCypher -** **_APIs Ethereum Web_**

- [blockcypher.com](https://www.blockcypher.com/)
- [Documentation](https://www.blockcypher.com/dev/ethereum/)

**Infura -** **_L'API Ethereum en tant que service_**

- [infura.io](https://infura.io)
- [Documentation](https://infura.io/docs)
- [GitHub](https://github.com/INFURA)

**Passerelle Ethereum de Cloudflare**

- [cloudflare-eth.com](https://cloudflare-eth.com)

**DataHub by Figment -** **_Services API Web3 avec réseau principal et réseaux de tests Ethereum._**

- [DataHub](https://www.figment.io/datahub)
- [Documentation](https://docs.figment.io/introduction/what-is-datahub)

**Nodesmith -** **_Accès API JSON-RPC API au réseau principal et aux réseaux tests Ethereum._**

- [nodesmith.io](https://nodesmith.io/network/ethereum/)
- [Documentation](https://nodesmith.io/docs/#/ethereum/apiRef)

**Ethercluster -** **_Exécutez votre propre service d'API Ethereum prenant en charge les ETH et les ETC._**

- [ethercluster.com](https://www.ethercluster.com/)

**Chainstack -** **_Nœuds Ethereum partagés et dédiés en tant que service_**

- [chainstack.com](https://chainstack.com)
- [Documentation](https://docs.chainstack.com)

**QuikNode -** **_Infrastructure Blockchain en tant que service_**

- [quicknode.com](https://quicknode.com)
- [Documentation](https://www.quicknode.com/docs)
- [Discord](https://discord.gg/NaR7TtpvJq)

**Python Tooling -** **_Diverses bibliothèques pour interagir avec Ethereum via Python_**

- [py.ethereum.org](http://python.ethereum.org/)
- [GitHub web3.py](https://github.com/ethereum/web3.py)
- [Chat web3.py](https://gitter.im/ethereum/web3.py)

**web3j -** **_Bibliothèque d'intégration Java/Android/Kotlin/Scala pour Ethereum_**

- [GitHub](https://github.com/web3j/web3j)
- [Documentation](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

**Rivet -** **_API Ethereum et Ethereum Classic en tant que service alimenté par des logiciels libres._**

- [rivet.cloud](https://rivet.cloud)
- [Documentation](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Nethereum -** **_Une bibliothèque d’intégration .NET open source pour la blockchain._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Documentation](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Tatum -** **_Plateforme de développement de la blockchain._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Documentation](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**Watchdata** **_ - fournit un accès API simple et fiable à la blockchain Ethereum._**

- [Watchdata](https://watchdata.io/)
- [Documentation](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Zmok -** **_Nœuds Ethereum orientés vitesse comme API JSON-RPC/WebSockets_**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Documentation](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

## Complément d'information {#further-reading}

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [Nœuds et clients](/developers/docs/nodes-and-clients/)
- [Infrastructures de développement](/developers/docs/frameworks/)

## Tutoriels connexes {#related-tutorials}

- [Configurer Web3js pour utiliser la blockchain Ethereum avec JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/)_ - Instructions pour installer et intégrer Web3js à votre projet_
- [Appel d'un contrat intelligent à partir de JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _ - À l'aide du jeton DAI, découvrez comment appeler une fonction de contrat en utilisant JavaScript._
