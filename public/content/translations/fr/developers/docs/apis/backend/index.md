---
title: Bibliothèques d'API backend
description: Introduction aux API clientes Ethereum, qui vous permettent d'interagir avec la blockchain depuis votre application.
lang: fr
---

Pour qu'une application logicielle puisse interagir avec la blockchain Ethereum (c'est-à-dire lire les données de la blockchain et/ou envoyer des transactions sur le réseau), elle doit se connecter à un nœud Ethereum.

À cette fin, chaque client Ethereum met en œuvre la spécification [JSON-RPC](/developers/docs/apis/json-rpc/), de sorte qu'il existe un ensemble uniforme de [méthodes](/developers/docs/apis/json-rpc/#json-rpc-methods) sur lesquelles les applications peuvent s'appuyer.

Si vous souhaitez utiliser un langage de programmation spécifique pour vous connecter à un nœud Ethereum, il existe de nombreuses bibliothèques pratiques au sein de l'écosystème qui facilitent grandement cette tâche. Avec ces bibliothèques, les développeurs peuvent écrire des méthodes intuitives d'une seule ligne pour initialiser les requêtes JSON-RPC (en arrière-plan) qui interagissent avec Ethereum.

## Prérequis {#prerequisites}

Il peut être utile de comprendre la [pile Ethereum](/developers/docs/ethereum-stack/) et les [clients Ethereum](/developers/docs/nodes-and-clients/).

## Pourquoi utiliser une bibliothèque ? {#why-use-a-library}

Ces bibliothèques suppriment une grande partie de la complexité d'une interaction directe avec un nœud Ethereum. Elles fournissent également des fonctions utilitaires (par ex. la conversion d'ETH en Gwei) afin que, en tant que développeur, vous puissiez passer moins de temps à gérer les subtilités des clients Ethereum et plus de temps à vous concentrer sur les fonctionnalités uniques de votre application.

## Bibliothèques disponibles {#available-libraries}

### Infrastructure et services de nœuds {#infrastructure-and-node-services}

**Alchemy -** **_Plateforme de développement Ethereum._**

- [alchemy.com](https://www.alchemy.com/)
- [Documentation](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**All That Node -** **_Nœud en tant que service._**

- [All That Node.com](https://www.allthatnode.com/)
- [Documentation](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast by Bware Labs -** **_API décentralisées pour le réseau principal et les réseaux de test Ethereum._**

- [blastapi.io](https://blastapi.io/)
- [Documentation](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_Fournit des services RPC plus efficaces et plus rapides_**

- [blockpi.io](https://blockpi.io/)
- [Documentation](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Passerelle Ethereum de Cloudflare.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - Explorateur de blocs et APIs de transaction**

- [Documentation](https://docs.etherscan.io/)

**Blockscout - Open Source Block Explorer**

- [Documentation](https://docs.blockscout.com/)

**GetBlock -** **_Blockchain en tant que service pour le développement Web3_**

- [GetBlock.io](https://getblock.io/)
- [Documentation](https://docs.getblock.io/)

**Infura -** **_L'API Ethereum en tant que service._**

- [infura.io](https://infura.io)
- [Documentation](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _Fournisseur EVM JSON-RPC rentable_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Documentation](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _Nœuds complets et explorateurs de blocs._**

- [NOWNodes.io](https://nownodes.io/)
- [Documentation](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_Infrastructure de blockchain en tant que service._**

- [quicknode.com](https://quicknode.com)
- [Documentation](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_API Ethereum et Ethereum Classic en tant que service, propulsées par des logiciels open source._**

- [rivet.cloud](https://rivet.cloud)
- [Documentation](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_Nœuds Ethereum axés sur la vitesse via une API JSON-RPC/WebSockets._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Documentation](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### Outils de développement {#development-tools}

**ethers-kt -** **_Bibliothèque Kotlin/Java/Android asynchrone et très performante pour les blockchains basées sur l'EVM._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Exemples](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_Une bibliothèque d'intégration .NET open source pour la blockchain._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Documentation](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Outils Python -** **_Diverses bibliothèques pour interagir avec Ethereum via Python._**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [GitHub de web3.py](https://github.com/ethereum/web3.py)
- [Chat de web3.py](https://gitter.im/ethereum/web3.py)

**Tatum -** **_La plateforme de développement blockchain ultime._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Documentation](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j -** **_Une bibliothèque d'intégration Java/Android/Kotlin/Scala pour Ethereum._**

- [GitHub](https://github.com/web3j/web3j)
- [Documentation](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### Services de blockchain {#blockchain-services}

**BlockCypher -** **_API Web Ethereum._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Documentation](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_Infrastructure de données Web3 tout-en-un pour Ethereum._**

- [chainbase.com](https://chainbase.com/)
- [Documentation](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_Nœuds Ethereum élastiques et dédiés en tant que service._**

- [chainstack.com](https://chainstack.com)
- [Documentation](https://docs.chainstack.com/)
- [Référence de l'API Ethereum](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node -** **_API d'infrastructure de blockchain._**

- [Nœud Cloud Coinbase](https://www.coinbase.com/developer-platform)
- [Documentation](https://docs.cdp.coinbase.com/)

**DataHub by Figment -** **_Services d'API Web3 avec le réseau principal et les réseaux de test Ethereum._**

- [DataHub](https://www.figment.io/)
- [Documentation](https://docs.figment.io/)

**Moralis -** **_Fournisseur d'API EVM de niveau entreprise._**

- [moralis.io](https://moralis.io)
- [Documentation](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Forum](https://forum.moralis.io/)

**NFTPort -** **_API de données et de frappe Ethereum._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Documentation](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_La plateforme générale d'API de blockchain multi-crypto._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Documentation](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_Fournit un accès API simple et fiable à la blockchain Ethereum._**

- [Watchdata](https://watchdata.io/)
- [Documentation](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Covalent -** **_API de blockchain enrichies pour plus de 200 chaînes._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Documentation](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

## En savoir plus {#further-reading}

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [Nœuds et clients](/developers/docs/nodes-and-clients/)
- [Frameworks de développement](/developers/docs/frameworks/)

## Tutoriels connexes {#related-tutorials}

- [Configurer Web3js pour utiliser la blockchain Ethereum avec JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Instructions pour installer et intégrer web3.js dans votre projet._
- [Appeler un contrat intelligent depuis JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– À l'aide du jeton DAI, découvrez comment appeler des fonctions de contrat en JavaScript._
