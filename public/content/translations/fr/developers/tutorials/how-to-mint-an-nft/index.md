---
title: Comment frapper un NFT (partie 2/3 de la série de tutoriels sur les NFT)
description: Ce tutoriel explique comment frapper un NFT sur la blockchain Ethereum grâce à notre contrat intelligent et à Web3.
author: "Sumi Mudgil"
tags:
  [
    "ERC-721",
    "alchemy",
    "solidité",
    "contrats intelligents"
  ]
skill: beginner
lang: fr
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html) : 69 millions de dollars
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b) : 11 millions de dollars
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens) : 6 millions de dollars

Tous ont frappé leurs NFT en utilisant la puissante API d'Alchemy. Dans ce tutoriel, nous vous apprendrons comment faire la même chose en \<10 minutes.

« Frapper un NFT » est l'acte de publier une instance unique de votre jeton ERC-721 sur la blockchain. En utilisant notre contrat intelligent de la [partie 1 de cette série de tutoriels sur les NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/), mettons en pratique nos compétences Web3 et frappons un NFT. À la fin de ce tutoriel, vous serez en mesure de frapper autant de NFT que votre cœur (et votre portefeuille) le désire !

Commençons !

## Étape 1 : Installer Web3 {#install-web3}

Si vous avez suivi le premier tutoriel sur la création de votre contrat intelligent de NFT, vous avez déjà de l'expérience avec Ethers.js. Web3 est similaire à Ethers, car c'est une bibliothèque utilisée pour faciliter la création de requêtes sur la blockchain Ethereum. Dans ce tutoriel, nous utiliserons [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), qui est une bibliothèque Web3 améliorée offrant des relances automatiques et une prise en charge robuste de WebSocket.

Dans le répertoire principal de votre projet, exécutez :

```
npm install @alch/alchemy-web3
```

## Étape 2 : Créer un fichier `mint-nft.js` {#create-mintnftjs}

Dans votre répertoire `scripts`, créez un fichier `mint-nft.js` et ajoutez les lignes de code suivantes :

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Étape 3 : Récupérer l'ABI de votre contrat {#contract-abi}

L'ABI (Application Binary Interface) de notre contrat est l’interface qui permet d'interagir avec notre contrat intelligent. Vous pouvez en apprendre davantage sur les ABI de contrat [ici](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is). Hardhat génère automatiquement un ABI pour nous et l'enregistre dans le fichier `MyNFT.json`. Pour l'utiliser, nous devrons analyser le contenu en ajoutant les lignes de code suivantes à notre fichier `mint-nft.js` :

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Si vous voulez voir l'ABI, vous pouvez l'afficher dans votre console :

```js
console.log(JSON.stringify(contract.abi))
```

Pour exécuter `mint-nft.js` et voir votre ABI s'afficher dans la console, allez dans votre terminal et exécutez :

```js
node scripts/mint-nft.js
```

## Étape 4 : Configurer les métadonnées pour votre NFT à l'aide d'IPFS {#config-meta}

Si vous vous souvenez de notre tutoriel de la partie 1, notre fonction de contrat intelligent `mintNFT` prend en entrée un paramètre tokenURI qui doit correspondre à un document JSON décrivant les métadonnées du NFT — c'est vraiment ce qui donne vie au NFT, lui permettant d'avoir des propriétés configurables, telles qu'un nom, une description, une image et d'autres attributs.

> _Interplanetary File System (IPFS) est un protocole décentralisé et un réseau pair-à-pair pour le stockage et le partage de données dans un système de fichiers distribué._

Nous utiliserons Pinata, une API IPFS et une boîte à outils pratiques, pour stocker notre actif NFT et ses métadonnées afin de garantir que notre NFT est véritablement décentralisé. Si vous n'avez pas de compte Pinata, créez-en un gratuitement [ici](https://app.pinata.cloud) et suivez les étapes pour vérifier votre e-mail.

Une fois votre compte créé :

- Rendez-vous sur la page « Files » et cliquez sur le bouton bleu « Upload » en haut à gauche de la page.

- Téléversez une image sur Pinata — ce sera l'image de votre NFT. N’hésitez pas à nommer l'actif comme vous le souhaitez

- Après le téléversement, vous verrez les informations du fichier dans le tableau de la page « Files ». Vous verrez également une colonne CID. Vous pouvez copier le CID en cliquant sur le bouton de copie situé à côté. Vous pouvez voir votre téléversement à l'adresse suivante : `https://gateway.pinata.cloud/ipfs/<CID>`. Vous pouvez par exemple trouver l'image que nous avons utilisée sur IPFS [ici](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5).

Pour les personnes qui préfèrent un support visuel, les étapes ci-dessus sont résumées ici :

![Comment téléverser votre image sur Pinata](./instructionsPinata.gif)

Maintenant, nous allons téléverser un document de plus sur Pinata. Mais avant cela, nous devons le créer !

Dans votre répertoire racine, créez un nouveau fichier nommé `nft-metadata.json` et ajoutez-y le code JSON suivant :

```json
{
  "attributes": [
    {
      "trait_type": "Race",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Couleur des yeux",
      "value": "Moka"
    }
  ],
  "description": "Le chiot le plus adorable et le plus sensible du monde.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

N'hésitez pas à modifier les données dans le fichier JSON. Vous pouvez supprimer ou ajouter des éléments dans la section des attributs. Plus important encore, assurez-vous que le champ de l'image pointe vers l'emplacement de votre image IPFS — sinon, votre NFT inclura une photo d'un (très mignon !) chien.

Une fois que vous avez fini de modifier le fichier JSON, enregistrez-le et téléversez-le sur Pinata, en suivant les mêmes étapes que pour l'image.

![Comment téléverser votre nft-metadata.json sur Pinata](./uploadPinata.gif)

## Étape 5 : Créer une instance de votre contrat {#instance-contract}

Maintenant, pour interagir avec notre contrat, nous devons en créer une instance dans notre code. Pour ce faire, nous aurons besoin de l'adresse de notre contrat, que nous pouvons obtenir à partir du déploiement ou de [Blockscout](https://eth-sepolia.blockscout.com/) en consultant l'adresse que vous avez utilisée pour déployer le contrat.

![Afficher l'adresse de votre contrat sur Etherscan](./view-contract-etherscan.png)

Dans l'exemple ci-dessus, l'adresse de notre contrat est 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Ensuite, nous utiliserons la méthode de [contrat](https://docs.web3js.org/api/web3-eth-contract/class/Contract) Web3 pour créer notre contrat à l'aide de l'ABI et de l'adresse. Dans votre fichier `mint-nft.js`, ajoutez ce qui suit :

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Étape 6 : Mettre à jour le fichier `.env` {#update-env}

Maintenant, pour créer et envoyer des transactions vers la chaîne Ethereum, nous utiliserons l'adresse de votre compte public Ethereum pour obtenir le nonce du compte (nous l'expliquerons ci-dessous).

Ajoutez votre clé publique à votre fichier `.env` — si vous avez terminé la partie 1 du tutoriel, votre fichier `.env` devrait maintenant ressembler à ceci :

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Étape 7 : Créer votre transaction {#create-txn}

Tout d'abord, nous allons définir une fonction nommée `mintNFT(tokenData)` et créer notre transaction en procédant comme suit :

1. Récupérez vos `PRIVATE_KEY` et `PUBLIC_KEY` depuis le fichier `.env`.

2. Ensuite, nous devrons déterminer le nonce du compte. La spécification de nonce est utilisée pour suivre le nombre de transactions envoyées depuis votre adresse. Nous en avons besoin pour des raisons de sécurité et pour empêcher les [attaques par rejeu](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Pour obtenir le nombre de transactions envoyées depuis votre adresse, nous utilisons [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).

3. Enfin, nous allons configurer notre transaction avec les informations suivantes :

- `'from': PUBLIC_KEY` — L'origine de notre transaction est notre adresse publique.

- `'to': contractAddress` — Le contrat avec lequel nous souhaitons interagir et auquel nous souhaitons envoyer la transaction.

- `'nonce': nonce` — Le nonce du compte, avec le nombre de transactions envoyées depuis notre adresse.

- `'gas': estimatedGas` — La quantité de gaz estimée nécessaire pour effectuer la transaction.

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — Le calcul que nous souhaitons effectuer dans cette transaction, qui est dans ce cas le frappage d'un NFT.

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

Maintenant que nous avons créé notre transaction, nous devons la signer pour pouvoir l'envoyer. C'est ici que nous allons utiliser notre clé privée.

`web3.eth.sendSignedTransaction` nous donnera le hachage de la transaction, que nous pourrons utiliser pour nous assurer que notre transaction a été minée et n'a pas été abandonnée par le réseau. Vous remarquerez que dans la section de signature de la transaction, nous avons ajouté une vérification des erreurs afin de savoir si notre transaction a été effectuée avec succès.

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
              "Le hachage de votre transaction est : ",
              hash,
              "\nConsultez le Mempool d'Alchemy pour voir l'état de votre transaction !"
            )
          } else {
            console.log(
              "Un problème est survenu lors de l'envoi de votre transaction :",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" La promesse a échoué :", err)
    })
}
```

## Étape 9 : Appeler `mintNFT` et exécuter `node mint-nft.js` {#call-mintnft-fn}

Vous vous souvenez du fichier `metadata.json` que vous avez téléversé sur Pinata ? Obtenez son code de hachage sur Pinata et transmettez ce qui suit comme paramètre à la fonction `mintNFT` : `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

Voici comment obtenir le code de hachage :

![Comment obtenir le code de hachage des métadonnées de votre NFT sur Pinata](./metadataPinata.gif)_Comment obtenir le code de hachage des métadonnées de votre NFT sur Pinata_

> Vérifiez que le code de hachage que vous avez copié renvoie bien à votre **metadata.json** en chargeant `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` dans une fenêtre distincte. La page devrait ressembler à la capture d'écran ci-dessous :

![Votre page devrait afficher les métadonnées JSON](./metadataJSON.png)_Votre page devrait afficher les métadonnées JSON_

Au final, votre code devrait ressembler à ceci :

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
              "Le hachage de votre transaction est : ",
              hash,
              "\nConsultez le Mempool d'Alchemy pour voir l'état de votre transaction !"
            )
          } else {
            console.log(
              "Un problème est survenu lors de l'envoi de votre transaction :",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("La promesse a échoué :", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Maintenant, exécutez `node scripts/mint-nft.js` pour déployer votre NFT. Après quelques secondes, vous devriez voir une réponse comme celle-ci dans votre terminal :

    ```
    Le hachage de votre transaction est : 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
    
    Consultez le Mempool d'Alchemy pour voir l'état de votre transaction !
    ```

Ensuite, visitez le [mempool d'Alchemy](https://dashboard.alchemyapi.io/mempool) pour voir l'état de votre transaction (si elle est en attente, minée ou abandonnée par le réseau). Si votre transaction a été abandonnée, il est également utile de consulter [Blockscout](https://eth-sepolia.blockscout.com/) et de rechercher le hachage de votre transaction.

![Afficher le hachage de votre transaction NFT sur Etherscan](./view-nft-etherscan.png)_Afficher le hachage de votre transaction NFT sur Etherscan_

Et c'est tout ! Vous avez maintenant déployé ET frappé un NFT sur la blockchain Ethereum <Emoji text=":money_mouth_face:" size={1} />

Avec `mint-nft.js`, vous pouvez frapper autant de NFT que votre cœur (et votre portefeuille) le désire ! Veillez simplement à transmettre une nouvelle URI de jeton décrivant les métadonnées du NFT (sinon, vous finirez par en créer un tas d'identiques avec des ID différents).

Vous aimeriez probablement pouvoir montrer votre NFT dans votre portefeuille — alors ne manquez pas de consulter la [Partie 3 : Comment afficher votre NFT dans votre portefeuille](/developers/tutorials/how-to-view-nft-in-metamask/) !
