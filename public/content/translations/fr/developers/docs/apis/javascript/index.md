---
title: Bibliothèques d'API JavaScript
description: Introduction aux bibliothèques clientes JavaScript, qui vous permettent d'interagir avec la blockchain depuis votre application.
lang: fr
---

Pour qu'une application Web puisse interagir avec la blockchain Ethereum (c'est-à-dire lire les données de la blockchain et/ou envoyer des transactions sur le réseau), elle doit se connecter à un nœud Ethereum.

Dans ce but, chaque client Ethereum implémente la spécification [JSON-RPC](/developers/docs/apis/json-rpc/), afin qu'il existe un ensemble uniforme de [méthodes](/developers/docs/apis/json-rpc/#json-rpc-methods) sur lesquelles les applications peuvent s'appuyer.

Si vous voulez utiliser JavaScript pour vous connecter à un nœud Ethereum, il est possible d'avoir recours à Vanilla JavaScript, mais plusieurs bibliothèques de commodité existent à l'intérieur même de l'écosystème, ce qui rend les choses beaucoup plus simples. Avec ces bibliothèques, les développeurs peuvent écrire des méthodes intuitives d'une seule ligne pour initialiser les requêtes JSON-RPC (en arrière-plan) qui interagissent avec Ethereum.

Veuillez noter que depuis [La Fusion](/roadmap/merge/), deux logiciels Ethereum connectés - un client d'exécution et un client de consensus - sont nécessaires pour exécuter un nœud. Veuillez vous assurer que votre nœud inclut à la fois un client d'exécution et un client de consensus. Si votre nœud ne se trouve pas sur votre machine locale (par ex., votre nœud s'exécute sur une instance AWS), mettez à jour les adresses IP dans le tutoriel en conséquence. Pour plus d'informations, veuillez consulter notre page sur [l'exécution d'un nœud](/developers/docs/nodes-and-clients/run-a-node/).

## Prérequis {#prerequisites}

En plus de comprendre JavaScript, il peut être utile de comprendre la [pile Ethereum](/developers/docs/ethereum-stack/) et les [clients Ethereum](/developers/docs/nodes-and-clients/).

## Pourquoi utiliser une bibliothèque ? {#why-use-a-library}

Ces bibliothèques suppriment une grande partie de la complexité d'une interaction directe avec un nœud Ethereum. Elles fournissent également des fonctions utilitaires (par ex. la conversion d'ETH en Gwei) afin que, en tant que développeur, vous puissiez passer moins de temps à gérer les subtilités des clients Ethereum et plus de temps à vous concentrer sur les fonctionnalités uniques de votre application.

## Fonctionnalités de la bibliothèque {#library-features}

### Se connecter aux nœuds Ethereum {#connect-to-ethereum-nodes}

En utilisant des fournisseurs, les bibliothèques vous permettent de vous connecter à Ethereum et de lire ses données, que ce soit sur JSON-RPC, INFURA, Etherscan, Alchemy ou Metamask.

> **Avertissement :** Web3.js a été archivé le 4 mars 2025. [Lire l'annonce](https://blog.chainsafe.io/web3-js-sunset/) Envisagez d'utiliser des bibliothèques alternatives comme [ethers.js](https://ethers.org) ou [viem](https://viem.sh) pour les nouveaux projets.

**Exemple Ether**

```js
// Un BrowserProvider encapsule un fournisseur Web3 standard, qui est
// ce que MetaMask injecte en tant que window.ethereum dans chaque page
const provider = new ethers.BrowserProvider(window.ethereum)

// Le plugin MetaMask permet également de signer des transactions pour
// envoyer de l'éther et payer pour changer l'état au sein de la blockchain.
// Pour cela, nous avons besoin du signataire du compte...
const signer = provider.getSigner()
```

**Exemple Web3js**

```js
var web3 = new Web3("http://localhost:8545")
// or
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// change provider
web3.setProvider("ws://localhost:8546")
// or
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// Using the IPC provider in node.js
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os path
// or
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // mac os path
// on windows the path is: "\\\\.\\pipe\\geth.ipc"
// on linux the path is: "/users/myuser/.ethereum/geth.ipc"
```

Une fois la configuration effectuée, vous pourrez interroger la blockchain pour :

- les numéros de blocs ;
- le gaz estimé ;
- les événements du contract intelligent ;
- l'ID du réseau ;
- Et plus encore...

### Fonctionnalité du portefeuille {#wallet-functionality}

Les bibliothèques vous permettent de créer des portefeuilles, gérer vos clés et signer des transactions.

Voici un exemple provenant de la bibliothèque Ethers

```js
// Créer une instance de portefeuille à partir d'une phrase mnémonique...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...ou à partir d'une clé privée
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// vrai

// L'adresse en tant que promesse selon l'API du signataire
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// L'adresse d'un portefeuille est également disponible de manière synchrone
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// Les composants cryptographiques internes
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// La phrase mnémonique du portefeuille
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Remarque : Un portefeuille créé avec une clé privée n'a pas
//       de phrase mnémonique (la dérivation l'empêche)
walletPrivateKey.mnemonic
// nul

// Signer un message
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// Signer une transaction
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// La méthode connect renvoie une nouvelle instance du
// portefeuille connecté à un fournisseur
wallet = walletMnemonic.connect(provider)

// Interroger le réseau
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// Envoyer de l'éther
wallet.sendTransaction(tx)
```

[Lire la documentation complète](https://docs.ethers.io/v5/api/signer/#Wallet)

Une fois la configuration effectuée, vous pourrez :

- créer un compte ;
- envoyer des transactions ;
- signer des transactions ;
- Et plus encore...

### Interagir avec les fonctions de contrats intelligents {#interact-with-smart-contract-functions}

Les bibliothèques clientes JavaScript autorisent votre application à appeler des fonctions de contrat intelligent en lisant l'interface binaire d'application (ABI) d'un contrat compilé.

L'ABI explique principalement les fonctions du contrat au format JSON et vous permet de l'utiliser comme un objet JavaScript standard.

Ainsi, le contrat Solidity ci-dessous :

```solidity
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    constructor(uint testInt)  { a = testInt;}

    event Event(uint indexed b, bytes32 c);

    event Event2(uint indexed b, bytes32 c);

    function foo(uint b, bytes32 c) returns(address) {
        Event(b, c);
        return d;
    }
}
```

Donnerait le JSON suivant :

```json
[{
    "type":"constructor",
    "payable":false,
    "stateMutability":"nonpayable"
    "inputs":[{"name":"testInt","type":"uint256"}],
  },{
    "type":"function",
    "name":"foo",
    "constant":false,
    "payable":false,
    "stateMutability":"nonpayable",
    "inputs":[{"name":"b","type":"uint256"}, {"name":"c","type":"bytes32"}],
    "outputs":[{"name":"","type":"address"}]
  },{
    "type":"event",
    "name":"Event",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"}, {"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
  },{
    "type":"event",
    "name":"Event2",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"},{"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
}]
```

Cela veut dire que vous pouvez :

- envoyer une transaction vers le contrat intelligent et exécuter sa méthode ;
- faire un appel afin d'estimer le gaz nécessaire pour exécuter une méthode quand exécutée par le EVM ;
- déployer un contrat ;
- et plus encore...

### Fonctions utilitaires {#utility-functions}

Les fonctions utilitaires vous offrent des raccourcis pour améliorer le développement Ethereum.

Les valeurs ETH sont en wei par défaut. 1 ETH = 1 000 000 000 000 000 000 WEI – ça en fait, des chiffres à gérer ! `web3.utils.toWei` convertit l'ether en Wei pour vous.

Et en ethers, cela ressemble à ce qui suit :

```js
// Obtenir le solde d'un compte (par l'adresse ou le nom ENS)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// Vous devrez souvent formatter la sortie pour l'utilisateur
// qui préfère voir les valeurs en ether (plutôt qu'en wei)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Fonctions utilitaires de Web3js](https://docs.web3js.org/api/web3-utils)
- [Fonctions utilitaires d'Ethers.js](https://docs.ethers.org/v6/api/utils/)

## Bibliothèques disponibles {#available-libraries}

**Web3.js –** **_API JavaScript d'Ethereum._**

- [Documentation](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js –** **_Implémentation complète de portefeuille Ethereum et utilitaires en JavaScript et TypeScript._**

- [Accueil d'Ethers.js](https://ethers.org/)
- [Documentation](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph –** **_Un protocole pour indexer les données d'Ethereum et d'IPFS et les interroger à l'aide de GraphQL._**

- [The Graph](https://thegraph.com)
- [Explorateur Graph](https://thegraph.com/explorer)
- [Documentation](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK –** **_Wrapper autour d'Ethers.js avec des API améliorées._**

- [Documentation](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem –** **_Interface TypeScript pour Ethereum._**

- [Documentation](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Drift –** **_Méta-bibliothèque TypeScript avec mise en cache, hooks et mocks de test intégrés._**

- [Documentation](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## En savoir plus {#further-reading}

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [Nœuds et clients](/developers/docs/nodes-and-clients/)
- [Frameworks de développement](/developers/docs/frameworks/)

## Tutoriels connexes {#related-tutorials}

- [Configurer Web3js pour utiliser la blockchain Ethereum avec JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Instructions pour installer et intégrer web3.js dans votre projet._
- [Appeler un contrat intelligent depuis JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– À l'aide du jeton DAI, découvrez comment appeler des fonctions de contrat en JavaScript._
- [Envoyer des transactions avec web3 et Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– Guide pas à pas pour envoyer des transactions depuis le backend._
