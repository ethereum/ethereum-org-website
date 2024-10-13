---
title: Bibliothèques d'API backend
description: Introduction aux API clientes Ethereum, qui vous permettent d'interagir avec la blockchain depuis votre application.
lang: fr
---

Pour qu'une application logicielle puisse interagir avec la blockchain Ethereum (c'est-à-dire lire les données de la blockchain et/ou envoyer des transactions sur le réseau), elle doit se connecter à un nœud Ethereum.

À cette fin, chaque client Ethereum met en œuvre la spécification [JSON-RPC](/developers/docs/apis/json-rpc/), de sorte qu'il existe un ensemble uniforme de [méthodes](/developers/docs/apis/json-rpc/#json-rpc-methods) sur lesquelles les applications peuvent s'appuyer.

Si vous souhaitez utiliser un langage de programmation spécifique pour vous connecter à un nœud Ethereum, vous pouvez développer votre propre solution, mais il existe plusieurs bibliothèques pratiques au sein de l'écosystème qui facilitent grandement cette tâche. Grâce à ces bibliothèques, les développeurs peuvent rédiger des méthodes intuitives d'une seule ligne pour initialiser des demandes RPC JSON (sous le capot) qui interagissent avec Ethereum.

## Prérequis {#prerequisites}

Il peut être utile de comprendre en quoi consiste la [pile Ethereum](/developers/docs/ethereum-stack/) et les [clients Ethereum](/developers/docs/nodes-and-clients/).

## Pourquoi utiliser une bibliothèque ? {#why-use-a-library}

Les bibliothèques suppriment une grande partie de la complexité de l'interaction directe avec un nœud Ethereum. Elles fournissent également des fonctions utilitaires (par ex. convertir des ETH en gwei) afin que vous puissiez, en tant que développeur, passer moins de temps à gérer les subtilités des clients Ethereum et plus de temps à vous consacrer aux fonctionnalités uniques de votre application.

## Bibliothèques disponibles {#available-libraries}

### Infrastructure et services de nœuds {#infrastructure-and-node-services}

**Alchemy -** **_Plateforme de développement Ethereum._**

- [alchemy.com](https://www.alchemy.com/)
- [Documentation](https://docs.alchemy.com/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**All That Node -** **_Nœud en tant que service._**

- [All That Node.com](https://www.allthatnode.com/)
- [Documentation](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast by Bware Labs-** **_ API décentralisées pour le réseau principal et les réseaux de tests Ethereum._**

- [blastapi.io](https://blastapi.io/)
- [Documentation](https://docs.blastapi.io)
- [Discord](https://discord.gg/bwarelabs)

**BlockPi -** **_Fournit des services RPC plus efficaces et plus rapides_**

- [blockpi.io](https://blockpi.io/)
- [Documentation](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Passerelle Ethereum de Cloudflare**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - Explorateur de blocs et APIs de transaction**
- [Documentation](https://docs.etherscan.io/)

**GetBlock-** **_Blockchain-as-a-service pour le développement du Web3_**

- [GetBlock.io](https://getblock.io/)
- [Documentation](https://getblock.io/docs/)

**Infura -** **_L'API Ethereum en tant que service_**

- [infura.io](https://infura.io)
- [Documentation](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _Fournisseur EVM JSON-RPC rentable_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Documentation](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _Explorateurs de nœuds complets et de blocs._**

- [NOWNodes.io](https://nownodes.io/)
- [Documentation](https://documenter.getpostman.com/view/13630829/TVmFkLwy#intro)

**Quinone -** **_Infrastructure Blockchain en tant que service_**

- [quicknode.com](https://quicknode.com)
- [Documentation](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_API Ethereum et Ethereum Classic en tant que service alimenté par des logiciels libres._**

- [rivet.cloud](https://rivet.cloud)
- [Documentation](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_Nœuds Ethereum orientés vitesse comme API JSON-RPC/WebSockets_**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Documentation](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### Outils de développement {#development-tools}

**ethers-kt** - **_Librairie Kotlin/Java/Andoid asynchrone et haute performance pour les blockchains basées sur l'EVM_**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Exemples](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_Une bibliothèque d’intégration .NET open source pour la blockchain._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Documentation](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Python Tooling -** **_Diverses bibliothèques pour interagir avec Ethereum via Python_**

- [py.ethereum.org](https://python.ethereum.org/)
- [GitHub Web3.py](https://github.com/ethereum/web3.py)
- [Chat Web3.py](https://gitter.im/ethereum/web3.py)

**Tatum -** **_Plateforme de développement de la blockchain._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Documentation](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j -** **_Bibliothèque d'intégration Java/Android/Kotlin/Scala pour Ethereum_**

- [GitHub](https://github.com/web3j/web3j)
- [Documentation](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### Services blockchain {#blockchain-services}

**BlockCypher -** **_APIs Ethereum Web_**

- [blockcypher.com](https://www.blockcypher.com/)
- [Documentation](https://www.blockcypher.com/dev/ethereum/)

- [chainbase.com](https://chainbase.com/)
- [Documentation](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_Nœuds Ethereum partagés et dédiés en tant que service_**

- [chainstack.com](https://chainstack.com)
- [Documentation](https://docs.chainbase.com/docs)
- [Référence de l'API Ethereum](https://docs.chainstack.com/reference/ethereum-getting-started)

**Nœud Cloud Coinbase -** **_API d'infrastructure blockchain._**

- [Nœud cloud de Coinbase](https://www.coinbase.com/cloud)
- [Documentation](https://docs.cloud.coinbase.com/)

**DataHub by Figment -** **_Services API Web3 avec réseau principal et réseaux de tests Ethereum._**

- [DataHub](https://www.figment.io/)
- [Documentation](https://docs.figment.io/)

**Moralis -** **_Fournisseur d'API EVM de niveau entreprise._**

- [moralis.io](https://moralis.io)
- [Documentation](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Forum](https://forum.moralis.io/)

**NFTPort -** **_API de frappe et de données Ethereum._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Documentation](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_La plateforme générale d'API de blockchain multi-crypto._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Documentation](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata** **_ - fournit un accès API simple et fiable à la blockchain Ethereum._**

- [Watchdata](https://watchdata.io/)
- [Documentation](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Covalent** - **_APIs blockchain enrichie pour plus de 200 chaines._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Documentation](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)


## Complément d'information {#further-reading}

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [ Nœuds et clients](/developers/docs/nodes-and-clients/)
- [Frameworks de développement](/developers/docs/frameworks/)

## Tutoriels connexes {#related-tutorials}

- [Configurer Web3js pour utiliser la blockchain Ethereum avec JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/)_ - Instructions pour installer et intégrer Web3js à votre projet_
- [Appel d'un contrat intelligent à partir de JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _ - À l'aide du jeton DAI, découvrez comment appeler une fonction de contrat en utilisant JavaScript._
