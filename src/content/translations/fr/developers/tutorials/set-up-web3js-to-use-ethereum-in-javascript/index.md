---
title: Configurer web3.js pour utiliser la blockchain Ethereum en JavaScript
description: Comment utiliser un contrat intelligent pour interagir avec un jeton en utilisant le langage Solidity
author: "jdourlens"
tags:
  - "web3.js"
  - "javascript"
skill: beginner
lang: fr
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Dans ce tutoriel, nous allons voir comment débuter avec [web3.js](https://web3js.readthedocs.io/) pour interagir avec la blockchain Ethereum. Web3.js peut être utilisé à la fois en front-end et en back-end pour lire les données de la blockchain, effectuer des transactions et même déployer des contrats intelligents.

La première étape consiste à inclure web3.js dans votre projet. Pour l'utiliser dans une page web, vous pouvez importer la bibliothèque en utilisant un CDN comme JSDeliver.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

Si vous préférez installer la bibliothèque pour l'utiliser dans votre back-end ou pour un projet front-end qui a recours à un « build », vous pouvez l'installer via npm :

```bash
npm install web3 --save
```

Ensuite, pour importer Web3.js dans un script Node.js ou un projet frontend, vous pouvez utiliser l'instruction JavaScript suivante :

```js
const Web3 = require("web3")
```

Maintenant que nous avons importé la bibliothèque au sein du projet, nous devons l'initialiser. Notre projet doit être en mesure de communiquer avec la blockchain. La plupart des librairies Ethereum communiquent avec un [nœud](/developers/docs/nodes-and-clients/) via des appels RPC. Pour lancer notre fournisseur Web3, nous instancierons une instance Web3 en passant comme constructeur l'URL du fournisseur. Si vous disposez d'un nœud ou [d'une instance Ganache qui s'exécute sur votre ordinateur](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/) cela ressemblera à ça :

```js
const web3 = new Web3("http://localhost:8545")
```

Si vous souhaitez accéder directement à un nœud hébergé, vous pouvez utiliser Infura. Vous pouvez également utiliser les programmes gratuits fournis par [Cloudflare](https://cloudflare-eth.com/), [Moralis](https://moralis.io), ou [Alchimie](https://alchemy.com/ethereum):

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

Pour vérifier que nous avons correctement configuré notre instance Web3, nous allons essayer de récupérer le dernier numéro de bloc en utilisant la fonction `getBlockNumber`. Cette fonction accepte une fonction de rappel comme paramètre et retourne le numéro de bloc sous la forme d'un entier.

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

Si vous exécutez ce programme, il affichera simplement le dernier numéro de bloc : le haut de la blockchain. Vous pouvez également utiliser les appels de fonctions `await/async` pour éviter d'imbriquer les rappels dans votre code :

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

Vous pouvez consulter toutes les fonctions disponibles sur l'instance Web3 dans la [documentation officielle de Web3.js](https://web3js.readthedocs.io/en/v1.2.6/web3-eth.html#).

La plupart des bibliothèques Web3 sont asynchrones parce qu'en arrière-plan, la bibliothèque fait appel au serveur JSON RPC pour accéder au noeud qui renvoie le résultat.

<Divider />

Si vous travaillez dans le navigateur, certains portefeuilles injectent directement une instance Web3 et vous devriez essayer de l'utiliser dans la mesure du possible, surtout si vous prévoyez d'interagir avec l'adresse Ethereum de l'utilisateur pour effectuer des transactions.

Voici le snippet pour détecter si un portefeuille MetaMask est disponible et si c'est le cas, tenter de l'activer. Cela vous permettra plus tard de lire le solde de l'utilisateur et de valider les transactions que vous souhaitez faire sur la blockchain Ethereum :

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // Request account access if needed
    await window.ethereum.enable()
    // Accounts now exposed
  } catch (error) {
    // User denied account access...
  }
}
```

Des alternatives aux web3.js comme [Ethers.js](https://docs.ethers.io/) existent et sont également couramment utilisées. Dans le prochain tutoriel, nous verrons [comment prendre en charge facilement les nouveaux blocs entrants sur la blockchain et voir ce qu'ils contiennent](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/).
