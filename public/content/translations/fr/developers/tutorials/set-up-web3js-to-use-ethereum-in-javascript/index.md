---
title: Configurer web3.js pour utiliser la chaîne de blocs Ethereum en JavaScript
description: Apprenez à installer et configurer la bibliothèque web3.js pour interagir avec la chaîne de blocs Ethereum depuis des applications JavaScript.
author: "jdourlens"
tags: ["web3.js", "javascript"]
skill: beginner
breadcrumb: Configuration de web3.js
lang: fr
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Dans ce tutoriel, nous verrons comment démarrer avec [web3.js](https://web3js.readthedocs.io/) pour interagir avec la chaîne de blocs Ethereum. Web3.js peut être utilisé à la fois dans les front-ends et les back-ends pour lire des données de la chaîne de blocs, effectuer des transactions et même déployer des contrats intelligents.

La première étape consiste à inclure web3.js dans votre projet. Pour l'utiliser dans une page web, vous pouvez importer la bibliothèque directement en utilisant un CDN comme JSDelivr.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

Si vous préférez installer la bibliothèque pour l'utiliser dans votre back-end ou un projet front-end qui utilise un processus de compilation, vous pouvez l'installer via npm :

```bash
npm install web3 --save
```

Ensuite, pour importer Web3.js dans un script Node.js ou un projet front-end Browserify, vous pouvez utiliser la ligne de JavaScript suivante :

```js
const Web3 = require("web3")
```

Maintenant que nous avons inclus la bibliothèque dans le projet, nous devons l'initialiser. Votre projet doit être capable de communiquer avec la chaîne de blocs. La plupart des bibliothèques Ethereum communiquent avec un [nœud](/developers/docs/nodes-and-clients/) via des appels RPC. Pour initier notre fournisseur Web3, nous allons instancier une instance Web3 en passant l'URL du fournisseur au constructeur. Si vous avez un nœud ou [une instance Ganache en cours d'exécution sur votre ordinateur](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/), cela ressemblera à ceci :

```js
const web3 = new Web3("http://localhost:8545")
```

Si vous souhaitez accéder directement à un nœud hébergé, vous pouvez trouver des options sur les [nœuds en tant que service](/developers/docs/nodes-and-clients/nodes-as-a-service).

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

Pour tester que nous avons correctement configuré notre instance Web3, nous allons essayer de récupérer le numéro du dernier bloc en utilisant la fonction `getBlockNumber`. Cette fonction accepte un rappel (callback) en paramètre et renvoie le numéro du bloc sous forme d'entier.

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

Si vous exécutez ce programme, il affichera simplement le numéro du dernier bloc : le sommet de la chaîne de blocs. Vous pouvez également utiliser les appels de fonction `await/async` pour éviter d'imbriquer des rappels dans votre code :

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

Vous pouvez voir toutes les fonctions disponibles sur l'instance Web3 dans [la documentation officielle de web3.js](https://docs.web3js.org/).

La plupart des bibliothèques Web3 sont asynchrones car, en arrière-plan, la bibliothèque effectue des appels JSON-RPC au nœud qui renvoie le résultat.

<Divider />

Si vous travaillez dans le navigateur, certains portefeuilles injectent directement une instance Web3 et vous devriez essayer de l'utiliser chaque fois que possible, surtout si vous prévoyez d'interagir avec l'adresse Ethereum de l'utilisateur pour effectuer des transactions.

Voici l'extrait de code pour détecter si un portefeuille MetaMask est disponible et essayer de l'activer si c'est le cas. Cela vous permettra par la suite de lire le solde de l'utilisateur et de lui permettre de valider les transactions que vous souhaitez lui faire effectuer sur la chaîne de blocs Ethereum :

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // Demander l'accès au compte si nécessaire
    await window.ethereum.enable()
    // Comptes maintenant exposés
  } catch (error) {
    // L'utilisateur a refusé l'accès au compte...
  }
}
```

Des alternatives à web3.js comme [Ethers.js](https://docs.ethers.io/) existent et sont également couramment utilisées. Dans le prochain tutoriel, nous verrons [comment écouter facilement les nouveaux blocs entrants sur la chaîne de blocs et voir ce qu'ils contiennent](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/).