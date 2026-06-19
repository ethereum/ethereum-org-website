---
title: Comment frapper un NFT (Partie 2/3 de la série de tutoriels sur les NFT)
description: Ce tutoriel décrit comment frapper un NFT sur la chaîne de blocs Ethereum en utilisant notre contrat intelligent et Web3.
author: "Sumi Mudgil"
tags: ["ERC-721", "alchemy", "solidity", "contrats intelligents"]
skill: beginner
breadcrumb: Frapper un NFT
lang: fr
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html) : 69 millions de dollars
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b) : 11 millions de dollars
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens) : 6 millions de dollars

Tous ont frappé leurs NFT en utilisant la puissante API d'Alchemy. Dans ce tutoriel, nous allons vous apprendre à faire de même en moins de 10 minutes.

« Frapper un NFT » est l'acte de publier une instance unique de votre jeton ERC-721 sur la chaîne de blocs. En utilisant notre contrat intelligent de la [Partie 1 de cette série de tutoriels sur les NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/), mettons en pratique nos compétences Web3 et frappons un NFT. À la fin de ce tutoriel, vous serez en mesure de frapper autant de NFT que votre cœur (et votre portefeuille) le désire !

Commençons !

## Étape 1 : Installer Web3 {#install-web3}

Si vous avez suivi le premier tutoriel sur la création de votre contrat intelligent de NFT, vous avez déjà de l'expérience avec Ethers.js. Web3 est similaire à Ethers, car c'est une bibliothèque utilisée pour faciliter la création de requêtes vers la chaîne de blocs [Ethereum](/). Dans ce tutoriel, nous utiliserons [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), qui est une bibliothèque Web3 améliorée offrant des tentatives automatiques et une prise en charge robuste des WebSockets.

Dans le répertoire principal de votre projet, exécutez :

```
npm install @alch/alchemy-web3
```

## Étape 2 : Créer un fichier `mint-nft.js` {#create-mintnftjs}

Dans votre répertoire de scripts, créez un fichier `mint-nft.js` et ajoutez les lignes de code suivantes :

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Étape 3 : Récupérer l'ABI de votre contrat {#contract-abi}

L'ABI (Application Binary Interface) de notre contrat est l'interface permettant d'interagir avec notre contrat intelligent. Vous pouvez en apprendre davantage sur les ABI de contrat [ici](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is). Hardhat génère automatiquement une ABI pour nous et l'enregistre dans le fichier `MyNFT.json`. Pour l'utiliser, nous devrons en analyser le contenu en ajoutant les lignes de code suivantes à notre fichier `mint-nft.js` :

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Si vous souhaitez voir l'ABI, vous pouvez l'afficher dans votre console :

```js
console.log(JSON.stringify(contract.abi))
```

Pour exécuter `mint-nft.js` et voir votre ABI s'afficher dans la console, accédez à votre terminal et exécutez :

```js
node scripts/mint-nft.js
```

## Étape 4 : Configurer les métadonnées de votre NFT à l'aide d'IPFS {#config-meta}

Si vous vous souvenez de notre tutoriel de la Partie 1, la fonction `mintNFT` de notre contrat intelligent prend un paramètre tokenURI qui doit se résoudre en un document JSON décrivant les métadonnées du NFT — c'est vraiment ce qui donne vie au NFT, lui permettant d'avoir des propriétés configurables, telles qu'un nom, une description, une image et d'autres attributs.

> _Interplanetary File System (IPFS) est un protocole décentralisé et un réseau pair à pair pour le stockage et le partage de données dans un système de fichiers distribué._

Nous utiliserons Pinata, une API et une boîte à outils IPFS pratiques, pour stocker l'actif et les métadonnées de notre NFT afin de garantir que notre NFT est véritablement décentralisé. Si vous n'avez pas de compte Pinata, créez un compte gratuit [ici](https://app.pinata.cloud) et suivez les étapes pour vérifier votre adresse e-mail.

Une fois que vous avez créé un compte :

- Accédez à la page « Files » (Fichiers) et cliquez sur le bouton bleu « Upload » (Téléverser) en haut à gauche de la page.

- Téléversez une image sur Pinata — ce sera l'actif image de votre NFT. N'hésitez pas à nommer l'actif comme vous le souhaitez.

- Après le téléversement, vous verrez les informations du fichier dans le tableau de la page « Files ». Vous verrez également une colonne CID. Vous pouvez copier le CID en cliquant sur le bouton de copie à côté. Vous pouvez visualiser votre téléversement à l'adresse : `https://gateway.pinata.cloud/ipfs/<CID>`. Vous pouvez trouver l'image que nous avons utilisée sur IPFS [ici](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5), par exemple.

Pour ceux qui ont une mémoire plus visuelle, les étapes ci-dessus sont résumées ici :

![How to upload your image to Pinata](./instructionsPinata.gif)

Maintenant, nous allons vouloir téléverser un document supplémentaire sur Pinata. Mais avant de faire cela, nous devons le créer !

Dans votre répertoire racine, créez un nouveau fichier appelé `nft-metadata.json` et ajoutez le code JSON suivant :

```json
{
  "attributes": [
    {
      "trait_type": "Breed",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Eye color",
      "value": "Mocha"
    }
  ],
  "description": "The world's most adorable and sensitive pup.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

N'hésitez pas à modifier les données dans le JSON. Vous pouvez supprimer ou ajouter des éléments à la section des attributs. Plus important encore, assurez-vous que le champ image pointe vers l'emplacement de votre image IPFS — sinon, votre NFT inclura une photo d'un chien (très mignon !).

Une fois que vous avez terminé de modifier le fichier JSON, enregistrez-le et téléversez-le sur Pinata, en suivant les mêmes étapes que pour le téléversement de l'image.

![How to upload your nft-metadata.json to Pinata](./uploadPinata.gif)

## Étape 5 : Créer une instance de votre contrat {#instance-contract}

Maintenant, pour interagir avec notre contrat, nous devons en créer une instance dans notre code. Pour ce faire, nous aurons besoin de l'adresse de notre contrat que nous pouvons obtenir à partir du déploiement ou de [Blockscout](https://eth-sepolia.blockscout.com/) en recherchant l'adresse que vous avez utilisée pour déployer le contrat.

![View your contract address on Etherscan](./view-contract-etherscan.png)

Dans l'exemple ci-dessus, l'adresse de notre contrat est 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Ensuite, nous utiliserons la [méthode contract](https://docs.web3js.org/api/web3-eth-contract/class/Contract) de Web3 pour créer notre contrat en utilisant l'ABI et l'adresse. Dans votre fichier `mint-nft.js`, ajoutez ce qui suit :

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Étape 6 : Mettre à jour le fichier `.env` {#update-env}

Maintenant, afin de créer et d'envoyer des transactions sur la chaîne Ethereum, nous utiliserons l'adresse publique de votre compte Ethereum pour obtenir le nonce du compte (nous l'expliquerons ci-dessous).

Ajoutez votre clé publique à votre fichier `.env` — si vous avez terminé la partie 1 du tutoriel, notre fichier `.env` devrait maintenant ressembler à ceci :

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Étape 7 : Créer votre transaction {#create-txn}

Tout d'abord, définissons une fonction nommée `mintNFT(tokenData)` et créons notre transaction en procédant comme suit :

1. Récupérez votre _PRIVATE_KEY_ et votre _PUBLIC_KEY_ à partir du fichier `.env`.

1. Ensuite, nous devrons déterminer le nonce du compte. La spécification du nonce est utilisée pour garder une trace du nombre de transactions envoyées depuis votre adresse — ce dont nous avons besoin pour des raisons de sécurité et pour empêcher les [attaques par rejeu](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Pour obtenir le nombre de transactions envoyées depuis votre adresse, nous utilisons [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).

1. Enfin, nous configurerons notre transaction avec les informations suivantes :

- `'from': PUBLIC_KEY` — L'origine de notre transaction est notre adresse publique

- `'to': contractAddress` — Le contrat avec lequel nous souhaitons interagir et envoyer la transaction

- `'nonce': nonce` — Le nonce du compte avec le nombre de transactions envoyées depuis notre adresse

- `'gas': estimatedGas` — Le gaz estimé nécessaire pour terminer la transaction

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — Le calcul que nous souhaitons effectuer dans cette transaction — qui dans ce cas est la frappe d'un NFT

Votre fichier `mint-nft.js` devrait maintenant ressembler à ceci :

```js
   require('dotenv').config();
   const API_URL = process.env.API_URL;
   const PUBLIC_KEY = process.env.PUBLIC_KEY;
   const PRIVATE_KEY = process.env.PRIVATE_KEY;

   const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
   const web3 = createAlchemyWeb3(API_URL);

   const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
   const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778";
   const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

   async function mintNFT(tokenURI) {
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //obtenir le dernier nonce

   //la transaction
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```

## Étape 8 : Signer la transaction {#sign-txn}

Maintenant que nous avons créé notre transaction, nous devons la signer afin de l'envoyer. C'est ici que nous utiliserons notre clé privée.

`web3.eth.sendSignedTransaction` nous donnera le hachage de transaction, que nous pouvons utiliser pour nous assurer que notre transaction a été minée et n'a pas été abandonnée par le réseau. Vous remarquerez que dans la section de signature de la transaction, nous avons ajouté une vérification des erreurs afin de savoir si notre transaction a bien abouti.

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //obtenir le dernier nonce

  //la transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}
```

## Étape 9 : Appeler `mintNFT` et exécuter node `mint-nft.js` {#call-mintnft-fn}

Vous vous souvenez du `metadata.json` que vous avez téléversé sur Pinata ? Obtenez son code de hachage depuis Pinata et passez ce qui suit comme paramètre à la fonction `mintNFT` `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

Voici comment obtenir le code de hachage :

![How to get your nft metadata hashcode on Pinata](./metadataPinata.gif)_Comment obtenir le code de hachage des métadonnées de votre NFT sur Pinata_

> Vérifiez bien que le code de hachage que vous avez copié renvoie à votre **metadata.json** en chargeant `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` dans une fenêtre séparée. La page devrait ressembler à la capture d'écran ci-dessous :

![Your page should display the json metadata](./metadataJSON.png)_Votre page devrait afficher les métadonnées JSON_

Dans l'ensemble, votre code devrait ressembler à ceci :

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //obtenir le dernier nonce

  //la transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise failed:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Maintenant, exécutez `node scripts/mint-nft.js` pour déployer votre NFT. Après quelques secondes, vous devriez voir une réponse comme celle-ci dans votre terminal :

    The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8

    Check Alchemy's Mempool to view the status of your transaction!

Ensuite, visitez votre [mempool Alchemy](https://dashboard.alchemyapi.io/mempool) pour voir le statut de votre transaction (qu'elle soit en attente, minée ou abandonnée par le réseau). Si votre transaction a été abandonnée, il est également utile de vérifier [Blockscout](https://eth-sepolia.blockscout.com/) et de rechercher votre hachage de transaction.

![View your NFT transaction hash on Etherscan](./view-nft-etherscan.png)_Consultez le hachage de transaction de votre NFT sur Etherscan_

Et voilà ! Vous avez maintenant déployé ET frappé un NFT sur la chaîne de blocs Ethereum <Emoji text=":money_mouth_face:" size={1} />

En utilisant le `mint-nft.js`, vous pouvez frapper autant de NFT que votre cœur (et votre portefeuille) le désire ! Assurez-vous simplement de passer un nouveau tokenURI décrivant les métadonnées du NFT (sinon, vous finirez par en créer un tas d'identiques avec des identifiants différents).

Vraisemblablement, vous aimeriez pouvoir exhiber votre NFT dans votre portefeuille — alors assurez-vous de consulter la [Partie 3 : Comment visualiser votre NFT dans votre portefeuille](/developers/tutorials/how-to-view-nft-in-metamask/) !