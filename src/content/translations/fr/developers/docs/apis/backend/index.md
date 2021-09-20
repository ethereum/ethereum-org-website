---
title: Bibliothèques d'API backend
description: Introduction aux API clientes Ethereum, qui vous permettent d'interagir avec la blockchain depuis votre application.
lang: fr
sidebar: true
---

Pour qu'une application logicielle puisse interagir avec la blockchain Ethereum (c'est-à-dire lire les données de la blockchain et/ou envoyer des transactions sur le réseau), elle doit se connecter à un nœud Ethereum.

À cette fin, chaque client Ethereum met en œuvre la spécification JSON-RPC, de sorte qu'il existe un ensemble uniforme de points de terminaison sur lesquels les applications peuvent s'appuyer.

Si vous souhaitez utiliser un langage de programmation spécifique pour vous connecter à un nœud Ethereum, vous pouvez développer votre propre solution, mais il existe plusieurs bibliothèques pratiques au sein de l'écosystème qui facilitent grandement cette tâche. Grâce à ces bibliothèques, les développeurs peuvent rédiger des méthodes intuitives d'une seule ligne pour initialiser des demandes RPC JSON (sous le capot) qui interagissent avec Ethereum.

## Prérequis {#prerequisites}

Il peut être utile de comprendre en quoi consiste la [pile Ethereum](/developers/docs/ethereum-stack/) et les [clients Ethereum](/docs/nodes-and-clients/).

## Pourquoi utiliser une bibliothèque ? {#why-use-a-library}

Les bibliothèques suppriment une grande partie de la complexité de l'interaction directe avec un nœud Ethereum. Elles fournissent également des fonctions utilitaires (par ex. convertir des ETH en gwei) afin que vous puissiez, en tant que développeur, passer moins de temps à gérer les subtilités des clients Ethereum et plus de temps à vous consacrer aux fonctionnalités uniques de votre application.

## Bibliothèques disponibles {#available-libraries}

<!-- TODO separate APIs-as-a-service vs. connect your own -->

**Alchemy -** **_Plateforme de développement Ethereum._**

- [alchemyapi.io](https://alchemyapi.io)
- [Documentation](https://docs.alchemyapi.io/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.gg/kwqVnrA)

**BlockCypher -** **_API Ethereum Web_**

- [blockcypher.com](https://www.blockcypher.com/)
- [Documentation](https://www.blockcypher.com/dev/ethereum/)

**Infura -** **_L'API Ethereum en tant que service_**

- [infura.io](https://infura.io)
- [Documentation](https://infura.io/docs)
- [GitHub](https://github.com/INFURA)

**Passerelle Ethereum de Cloudflare**

- [cloudflare-eth.com](https://cloudflare-eth.com)

**Nodesmith -** **_API JSON-RPC pour accéder au réseau principal et aux réseaux de test Ethereum_**

- [nodesmith.io](https://nodesmith.io/network/ethereum/)
- [Documentation](https://nodesmith.io/docs/#/ethereum/apiRef)

**Ethercluster -** **_Exécutez votre propre service d'API Ethereum prenant en charge les ETH et les ETC._**

- [ethercluster.com](https://www.ethercluster.com/)

**Chainstack -** **_Nœuds Ethereum partagés et dédiés en tant que service_**

- [chainstack.com](https://chainstack.com)
- [Documentation](https://docs.chainstack.com)

**QuikNode -** **_Plateforme de développement de la blockchain_**

- [quiknode.io](https://quiknode.io)

**Python Tooling -** **_Diverses bibliothèques pour interagir avec Ethereum via Python_**

- [py.ethereum.org](http://python.ethereum.org/)
- [GitHub Web3.py](https://github.com/ethereum/web3.py)
- [Chat Web3.py](https://gitter.im/ethereum/web3.py)

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

## Complément d'information {#further-reading}

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [Nœuds et clients](/developers/docs/nodes-and-clients/)
- [Frameworks de développement](/developers/docs/frameworks/)

## Tutoriels connexes {#related-tutorials}

- [Configurer Web3js pour utiliser la blockchain Ethereum avec JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/)_ - Instructions pour installer et intégrer Web3js à votre projet_
- [Appel d'un contrat intelligent à partir de JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _ - À l'aide du jeton DAI, découvrez comment appeler une fonction de contrat en utilisant JavaScript._
