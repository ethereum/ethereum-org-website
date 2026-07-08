---
title: "Bibliothèques d'API JavaScript"
description: "Une introduction aux bibliothèques clientes JavaScript qui vous permettent d'interagir avec la chaîne de blocs depuis votre application."
lang: fr
---

Pour qu'une application web puisse interagir avec la chaîne de blocs Ethereum (c'est-à-dire lire les données de la chaîne de blocs et/ou envoyer des transactions au réseau), elle doit se connecter à un nœud Ethereum.

À cette fin, chaque client Ethereum implémente la spécification [JSON-RPC](/developers/docs/apis/json-rpc/), il existe donc un ensemble uniforme de [méthodes](/developers/docs/apis/json-rpc/#json-rpc-methods) sur lesquelles les applications peuvent s'appuyer.

Si vous souhaitez utiliser JavaScript pour vous connecter à un nœud Ethereum, il est possible d'utiliser du JavaScript pur, mais plusieurs bibliothèques pratiques existent au sein de l'écosystème pour rendre cela beaucoup plus facile. Avec ces bibliothèques, les développeurs peuvent écrire des méthodes intuitives en une seule ligne pour initialiser des requêtes JSON-RPC (en interne) qui interagissent avec Ethereum.

Veuillez noter que depuis [La Fusion](/roadmap/merge/), deux logiciels Ethereum connectés - un client d'exécution et un client de consensus - sont nécessaires pour faire fonctionner un nœud. Veuillez vous assurer que votre nœud inclut à la fois un client d'exécution et un client de consensus. Si votre nœud ne se trouve pas sur votre machine locale (par exemple, votre nœud s'exécute sur une instance AWS), mettez à jour les adresses IP dans le tutoriel en conséquence. Pour plus d'informations, veuillez consulter notre page sur [l'exécution d'un nœud](/developers/docs/nodes-and-clients/run-a-node/).

## Prérequis {#prerequisites}

En plus de comprendre JavaScript, il peut être utile de comprendre la [pile Ethereum](/developers/docs/ethereum-stack/) et les [clients Ethereum](/developers/docs/nodes-and-clients/).

## Pourquoi utiliser une bibliothèque ? {#why-use-a-library}

Ces bibliothèques font abstraction d'une grande partie de la complexité liée à l'interaction directe avec un nœud Ethereum. Elles fournissent également des fonctions utilitaires (par exemple, la conversion d'ETH en gwei) afin qu'en tant que développeur, vous puissiez passer moins de temps à gérer les subtilités des clients Ethereum et plus de temps à vous concentrer sur les fonctionnalités uniques de votre application.

## Fonctionnalités des bibliothèques {#library-features}

### Se connecter aux nœuds Ethereum {#connect-to-ethereum-nodes}

En utilisant des fournisseurs, ces bibliothèques vous permettent de vous connecter à Ethereum et de lire ses données, que ce soit via JSON-RPC, Infura, Etherscan, Alchemy ou MetaMask.

> **Avertissement :** Web3.js a été archivé le 4 mars 2025. [Lisez l'annonce](https://blog.chainsafe.io/web3-js-sunset/). Envisagez d'utiliser des bibliothèques alternatives comme [ethers.js](https://ethers.org) ou [viem](https://viem.sh) pour les nouveaux projets.

**Exemple avec Ethers**

```js
// Un BrowserProvider enveloppe un fournisseur Web3 standard, ce qui est
// ce que MetaMask injecte en tant que window.ethereum dans chaque page
const provider = new ethers.BrowserProvider(window.ethereum)

// Le plugin MetaMask permet également de signer des transactions pour
// envoyer de l'ether et payer pour changer l'état au sein de la chaîne de blocs.
// Pour cela, nous avons besoin du signataire du compte...
const signer = provider.getSigner()
```

**Exemple avec Web3.js**

```js
var web3 = new Web3("http://localhost:8545")
// or
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// changer de fournisseur
web3.setProvider("ws://localhost:8546")
// or
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// Utilisation du fournisseur IPC dans node.js
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // chemin mac os
// or
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // chemin mac os
// sous windows le chemin est : "\\\\.\\pipe\\geth.ipc"
// sous linux le chemin est : "/users/myuser/.ethereum/geth.ipc"
```

Une fois configuré, vous pourrez interroger la chaîne de blocs pour obtenir :

- les numéros de bloc
- les estimations de gaz
- les événements de contrats intelligents
- l'identifiant du réseau
- et plus encore...

### Fonctionnalité de portefeuille {#wallet-functionality}

Ces bibliothèques vous offrent des fonctionnalités pour créer des portefeuilles, gérer des clés et signer des transactions.

Voici un exemple avec Ethers

```js
// Créer une instance de portefeuille à partir d'une mnémonique...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...ou à partir d'une clé privée
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// L'adresse sous forme de Promise selon l'API Signer
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// Une adresse de portefeuille est également disponible de manière synchrone
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// Les composants cryptographiques internes
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// La mnémonique du portefeuille
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Remarque : Un portefeuille créé avec une clé privée n'a pas
//       de mnémonique (la dérivation l'empêche)
walletPrivateKey.mnemonic
// null

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

// La méthode connect retourne une nouvelle instance du
// Portefeuille connecté à un fournisseur
wallet = walletMnemonic.connect(provider)

// Interroger le réseau
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// Envoyer de l'ether
wallet.sendTransaction(tx)
```

[Lire la documentation complète](https://docs.ethers.io/v5/api/signer/#Wallet)

Une fois configuré, vous pourrez :

- créer des comptes
- envoyer des transactions
- signer des transactions
- et plus encore...

### Interagir avec les fonctions de contrats intelligents {#interact-with-smart-contract-functions}

Les bibliothèques clientes JavaScript permettent à votre application d'appeler des fonctions de contrats intelligents en lisant l'interface binaire de l'application (ABI) d'un contrat compilé.

L'ABI explique essentiellement les fonctions du contrat dans un format JSON et vous permet de l'utiliser comme un objet JavaScript normal.

Ainsi, le contrat Solidity suivant :

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

Cela signifie que vous pouvez :

- Envoyer une transaction au contrat intelligent et exécuter sa méthode
- Appeler pour estimer le gaz que prendra l'exécution d'une méthode lorsqu'elle sera exécutée dans l'EVM
- Déployer un contrat
- Et plus encore...

### Fonctions utilitaires {#utility-functions}

Les fonctions utilitaires vous offrent des raccourcis pratiques qui rendent le développement avec Ethereum un peu plus facile.

Les valeurs en ETH sont en Wei par défaut. 1 ETH = 1 000 000 000 000 000 000 WEI – cela signifie que vous manipulez beaucoup de chiffres ! `web3.utils.toWei` convertit l'ether en Wei pour vous.

Et dans Ethers, cela ressemble à ceci :

```js
// Obtenir le solde d'un compte (par adresse ou nom ENS)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// Souvent, vous devrez formater la sortie pour l'utilisateur
// qui préfère voir les valeurs en ether (au lieu de Wei)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Fonctions utilitaires de Web3.js](https://docs.web3js.org/api/web3-utils)
- [Fonctions utilitaires d'Ethers](https://docs.ethers.org/v6/api/utils/)

## Bibliothèques disponibles {#available-libraries}

**Web3.js -** **_API JavaScript Ethereum._**

- [Documentation](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_Implémentation complète de portefeuille Ethereum et utilitaires en JavaScript et TypeScript._**

- [Accueil d'Ethers.js](https://ethers.org/)
- [Documentation](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_Un protocole pour indexer les données Ethereum et IPFS et les interroger à l'aide de GraphQL._**

- [The Graph](https://thegraph.com)
- [Explorateur Graph](https://thegraph.com/explorer)
- [Documentation](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK -** **_Enveloppe (wrapper) autour d'Ethers.js avec des API améliorées._**

- [Documentation](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**Viem -** **_Interface TypeScript pour Ethereum._**

- [Documentation](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Codex -** **_API de données de chaîne de blocs enrichies en temps réel sur des dizaines de chaînes._**

- [Documentation](https://docs.codex.io)
- [Explorateur](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

**Drift -** **_Méta-bibliothèque TypeScript avec mise en cache intégrée, hooks et simulations de test (mocks)._**

- [Documentation](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## Complément d'information {#further-reading}

_Vous connaissez une ressource communautaire qui vous a aidé ? Modifiez cette page et ajoutez-la !_ 

## Sujets connexes {#related-topics}

- [Nœuds et clients](/developers/docs/nodes-and-clients/)
- [Cadres de développement](/developers/docs/frameworks/)

## Tutoriels connexes {#related-tutorials}

- [Configurer Web3.js pour utiliser la chaîne de blocs Ethereum en JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Instructions pour configurer Web3.js dans votre projet._
- [Appeler un contrat intelligent depuis JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– En utilisant le jeton DAI, découvrez comment appeler une fonction de contrat à l'aide de JavaScript._
- [Envoyer des transactions à l'aide de Web3 et Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– Guide étape par étape pour envoyer des transactions depuis le backend._

## Tutoriels : API JavaScript et WebSockets sur Ethereum {#tutorials}

- [Utiliser les WebSockets](/developers/tutorials/using-websockets/) _– Comment utiliser les WebSockets avec Alchemy pour s'abonner aux événements Ethereum et effectuer des requêtes JSON-RPC en temps réel._