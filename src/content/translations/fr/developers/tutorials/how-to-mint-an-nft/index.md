---
title: Comment frapper un NFT (Partie 2/3 du tutoriel NFT)
description: Ce tutoriel explique comment frapper un NFT sur la blockchain Ethereum grâce à notre contrat intelligent et à Web3.
author: "Sumi Mudgil"
tags:
  - "NFTs"
  - "ERC-721"
  - "alchemy"
  - "solidity"
  - "contrats intelligents"
skill: beginner
lang: fr
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html) : 69 millions de dollars [3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b) : 11 millions de dollars [Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens) : 6 millions de dollars

Tous ont frappé leur NFT en utilisant la puissante API d'Alchemy. Dans ce tutoriel, nous vous apprendrons comment faire la même chose en < 10 minutes.

« Frapper un NFT » (Minting an NFT) est l'acte de publier une instance unique de votre jeton ERC-721 sur la blockchain. En utilisant notre contrat intelligent de la [Partie 1 de cette série de tutoriels sur les NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/), nous allons développer nos compétences en Web3 et frapper un NFT. À la fin de ce tutoriel, vous serez en mesure de frapper autant de NFT que vous, (ou votre portefeuille) le désirez !

Commençons !

## Étape 1 : Installer Web3 {#install-web3}

Si vous avez suivi le premier tutoriel sur la création de votre contrat intelligent NFT, vous avez déjà expérimenté Ethers.js. Web3 est similaire à Ethers, étant une bibliothèque utilisée pour faciliter la création de requêtes vers la blockchain Ethereum. Dans ce tutoriel, nous utiliserons [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) qui est une bibliothèque Web3 améliorée proposant des essais automatiques et une prise en charge solide de WebSocket.

Dans le répertoire d'accueil de votre projet, exécutez :

```
npm install @alch/alchemy-web3
```

## Étape 2 : Créer un fichier `mint-nft.js` {#create-mintnftjs}

À l'intérieur de votre répertoire de scripts, créez un fichier `mint-nft.js` et ajoutez les lignes de code suivantes :

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Étape 3 : Récupérer l'ABI de votre contrat {#contract-abi}

L'ABI (Application Binary Interface) de notre contrat est l’interface permettant d'interagir avec notre contrat intelligent. Vous en apprendrez plus sur les ABI de contrats [ici](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is). Hardhat génère automatiquement pour nous une ABI et l'enregistre dans le fichier `MyNFT.json`. Pour l'utiliser, nous devrons analyser les contenus en ajoutant les lignes de code suivantes à notre fichier `mint-nft.js` :

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Si vous voulez lire l'ABI, vous pouvez l'afficher dans votre console :

```js
console.log(JSON.stringify(contract.abi))
```

Pour exécuter `mint-nft.js` et voir votre ABI affichée dans la console, naviguez vers votre terminal et exécutez :

```js
node scripts/mint-nft.js
```

## Étape 4 : Configurer les métadonnées de votre NFT en utilisant IPFS {#config-meta}

Si vous vous rappelez de la première partie de notre tutoriel, notre fonction de contrat intelligent `mintNFT` accepte un paramètre tokenURI qui doit se résoudre en un document JSON décrivant les métadonnées du NFT - ce qui donne vraiment vie au NFT, en lui permettant d'avoir des propriétés configurables, comme un nom, une description ou encore une image, entre autres.

> _IPFS (système de fichiers interplanétaire) est un protocole décentralisé et un réseau pair-à-pair permettant de stocker et de partager des données au sein d'un système de fichiers distribué._

Nous utiliserons Pinata, une API IPFS pratique et une boîte à outils, pour stocker nos ressources et métadonnées NFT afin de nous assurer que notre NFT est véritablement décentralisée. Si vous ne possédez pas de compte Pinata, vous pouvez en créer un gratuitement [ici](https://app.pinata.cloud) puis suivre les étapes pour confirmer votre adresse e-mail.

Une fois que vous avez créé un compte :

- Allez sur la page « Fichiers » et cliquez sur le bouton bleu « Upload » en haut à gauche de la page.

- Téléchargez une image sur Pinata — ce sera l'image de votre NFT. N’hésitez pas à nommer la ressource comme vous le souhaitez

- Après le téléchargement, vous verrez les informations sur le fichier dans le tableau de la page « Fichiers ». Vous verrez également une colonne CID. Vous pouvez copier le CID en cliquant sur le bouton copier à côté de celui-ci. Vous pouvez voir votre téléchargement sur `https://gateway.pinata.cloud/ipfs/<CID>`. Vous pouvez trouver l'image que nous avons utilisée sur IPFS [ici](https://gateway.pinata.cloud/ipfs/QmarPqdEuzh5RsWpyH2hZ3qSXBCzC5RyK3ZHnFkAsk7u2f), par exemple.

Pour les apprenants plus visuels, les étapes ci-dessus sont résumées ici :

![Comment télécharger votre image sur Pinata](https://gateway.pinata.cloud/ipfs/Qmcdt5VezYzAJDBc4qN5JbANy5paFg9iKDjq8YksRvZhtL)

Maintenant, nous allons vouloir télécharger un document de plus sur Pinata. Mais avant de le faire, nous devons le créer !

Dans votre répertoire racine, créez un nouveau fichier appelé `nft-metadata.json` et ajoutez le code json suivant :

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

N'hésitez pas à modifier les données dans le json. Vous pouvez supprimer ou étoffer la section des attributs. Avant tout, assurez-vous que le champ image pointe vers l'emplacement de votre image IPFS — sinon, votre NFT inclura la photo d'un (adorable !) chien.

Une fois que vous avez fini de modifier le fichier JSON, enregistrez les modifications et téléversez-le sur Pinata, en suivant les mêmes étapes que précédemment, pour l'image.

![Comment télécharger votre nft-metadata.json sur Pinata](./uploadPinata.gif)

## Étape 5 : Créer une instance de votre contrat {#instance-contract}

À présent, pour interagir avec notre contrat, nous avons besoin de l'instancier dans notre code. Pour ce faire, nous aurons besoin de l'adresse de notre contrat que nous pouvons obtenir du déploiement ou d'[Etherscan](https://ropsten.etherscan.io/) en recherchant l'adresse que vous avez utilisée pour déployer le contrat.

![Consultez l'adresse de votre contrat sur Etherscan](./viewContractEtherscan.png)

Dans l'exemple ci-dessus, notre adresse de contrat est 0x81c587EB0fE773404c42c1d2666b5f557C470eED.

Ensuite, nous utiliserons la [méthode pour contrat](https://web3js.readthedocs.io/en/v1.2.0/web3-eth-contract.html?highlight=constructor#web3-eth-contract) Web3 pour créer notre contrat en utilisant l'ABI et l'adresse. Ajoutez ce qui suit dans votre fichier `mint-nft.js` :

```js
const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Étape 6 : Mettre à jour le fichier `.env` {#update-env}

Maintenant, pour créer et envoyer des transactions sur la chaîne Ethereum, nous utiliserons votre adresse publique de compte Ethereum pour obtenir le nonce du compte (explication à suivre ci-dessous).

Ajoutez votre clé publique à votre fichier `.env` — si vous avez terminé la première partie du tutoriel, notre fichier `.env` devrait maintenant ressembler à ceci :

```js
API_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Étape 7 : Créer votre transaction {#create-txn}

En premier lieu, définissons une fonction nommée `mintNFT(tokenData)` et créons notre transaction en faisant ce qui suit :

1. Récupérez la clé privée _PRIVATE_KEY_ et la clé publique _PUBLIC_KEY_ depuis le fichier `.env`.

1. Ensuite, nous devrons trouver le nonce du compte. La spécification nonce est utilisée pour garder une trace du nombre de transactions envoyées à partir de votre adresse — ce dont nous avons besoin pour des raisons de sécurité et pour empêcher [les attaques par répétition](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Pour obtenir le nombre de transactions envoyées à partir de votre adresse, nous utilisons [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).

1. Enfin, nous allons configurer notre transaction avec les informations suivantes :

- `'from': PUBLIC_KEY` — L'origine de notre transaction est notre adresse publique

- `'to': contractAddress` — Le contrat avec lequel nous souhaitons interagir et envoyer la transaction

- `'nonce': nonce` — Le nonce du compte avec le nombre de transactions envoyées à partir de notre adresse

- `'gas': estimatedGas` — Le gaz nécessaire estimé pour réaliser la transaction

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — Le calcul que nous souhaitons effectuer dans cette transaction — qui, dans le cas présent, est le fait de frapper un NFT

Votre fichier `mint-nft.js` devrait ressembler à ceci maintenant :

```js
   require('dotenv').config();
   const API_URL = process.env.API_URL;
   const PUBLIC_KEY = process.env.PUBLIC_KEY;
   const PRIVATE_KEY = process.env.PRIVATE_KEY;

   const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
   const web3 = createAlchemyWeb3(API_URL);

   const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
   const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED";
   const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

   async function mintNFT(tokenURI) {
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

   //the transaction
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

Maintenant que nous avons créé notre transaction, nous devons la signer afin de l’envoyer. Nous utiliserons ici notre clé privée.

`web3.eth.sendSignedTransaction` nous donnera le hachage de la transaction que nous pouvons utiliser pour nous assurer que notre transaction a été minée et n'a pas été rejetée par le réseau. Vous remarquerez dans la section de signature de la transaction que nous avons ajouté quelques vérifications d'erreurs afin de savoir si notre transaction a bien été exécutée.

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

  //the transaction
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

## Étape 9 : Appelez `mintNFT` et exécutez le nœud `mint-nft.js` {#call-mintnft-fn}

Vous vous souvenez du `metadata.json` que vous avez téléchargé sur Pinata ? Récupérez son code de hachage et passez-le comme paramètre à la fonction `mintNFT` `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

Voici comment obtenir le code de hachage :

![Comment obtenir votre hashcode de métadonnées nft sur Pinata](./metadataPinata.gif)_Comment obtenir votre code de hachage de métadonnées nft sur Pinata_

> Vérifiez que le code de hachage que vous avez copié est un lien vers votre `metadata.json` en chargeant `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` dans une fenêtre séparée. La page devrait ressembler à la capture d'écran ci-dessous :

![Votre page devrait afficher les métadonnées json](./metadataJSON.png)_Votre page devrait afficher les métadonnées json_

Au final, votre code devrait ressembler à ceci :

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

  //the transaction
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

    The hash of your transaction is: 0x10e5062309de0cd0be7edc92e8dbab191aa2791111c44274483fa766039e0e00

    Check Alchemy's Mempool to view the status of your transaction!

Ensuite, consultez votre [Alchemy mempool](https://dashboard.alchemyapi.io/mempool) pour voir l'état de votre transaction (en attente, minée ou rejetée par le réseau). Si votre transaction a été rejetée, il est également utile de vérifier [Ropsten Etherscan](https://ropsten.etherscan.io/) et rechercher votre hachage de transaction.

![Voir le hachage de votre transaction NFT sur Etherscan](./viewNFTEtherscan.png)_Voir le hachage de votre transaction NFT sur Etherscan_

Et voilà ! Vous avez maintenant déployé ET frappé un NFT sur la blockchain Ethereum. <Emoji text=":money_mouth_face:" size={1} />

En utilisant `mint-nft.js` vous pouvez frapper autant de NFT que vous (ou votre portefeuille) désirez ! Assurez-vous juste de passer une nouvelle URI de jeton décrivant les métadonnées du NFT (sinon, vous ne réaliserez qu'une multitude de métadonnées identiques avec différents identifiants).

Sans doute, vous souhaiteriez pouvoir afficher votre NFT dans votre portefeuille — alors n’oubliez pas de consulter la [Partie 3 : Comment voir votre NFT dans votre portefeuille](/developers/tutorials/how-to-view-nft-in-metamask/) !
