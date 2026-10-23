---
title: "Comment frapper un NFT (Partie 2/3 de la série de tutoriels sur les NFT)"
description: "Ce tutoriel décrit comment frapper un NFT sur la chaîne de blocs Ethereum en utilisant notre contrat intelligent, Hardhat et ethers.js."
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "contrats intelligents"]
skill: beginner
breadcrumb: Frapper un NFT
lang: fr
published: 2021-04-22
---

« Frapper un NFT » est l'acte de publier une instance unique de votre jeton ERC-721 sur la chaîne de blocs. En utilisant notre contrat intelligent de la [Partie 1 de cette série de tutoriels sur les NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/), mettons en pratique nos compétences Web3 et frappons un NFT. À la fin de ce tutoriel, vous serez capable de frapper autant de NFT que votre cœur (et votre portefeuille) le désire !

Commençons !

## Étape 1 : Vérifiez votre configuration {#install-web3}

Si vous avez suivi le premier tutoriel sur la création de votre contrat intelligent de NFT, vous avez déjà tout ce dont vous avez besoin : un projet Hardhat 3 avec le [plugin Ethers](https://hardhat.org/docs/plugins/hardhat-ethers) et [ethers.js](https://docs.ethers.org/v6/), une bibliothèque utilisée pour faciliter la création de requêtes vers la chaîne de blocs [Ethereum](/). Nous allons écrire notre code de frappe sous forme de script Hardhat, afin qu'il réutilise les paramètres du réseau Sepolia et les valeurs `API_URL` et `PRIVATE_KEY` de la Partie 1 — il n'y a rien de nouveau à installer.

## Étape 2 : Créez un fichier `mint-nft.js` {#create-mintnftjs}

Dans votre répertoire de scripts, créez un fichier `mint-nft.js` et ajoutez les lignes de code suivantes :

```js
import { network } from "hardhat"

const { ethers } = await network.create()
```

Comme dans notre script de déploiement, `network.create()` se connecte au réseau que vous choisissez avec `--network` lorsque vous exécutez le script, et nous donne un objet `ethers` pour celui-ci.

## Étape 3 : Récupérez l'ABI de votre contrat {#contract-abi}

L'ABI (interface binaire d'application) de notre contrat est l'interface permettant d'interagir avec notre contrat intelligent. Vous pouvez en apprendre davantage sur les [ABI de contrat](/glossary/#abi). Hardhat génère automatiquement une ABI pour nous lorsqu'il compile le contrat et l'enregistre dans le fichier `artifacts/contracts/MyNFT.sol/MyNFT.json`. Le plugin Ethers de Hardhat la lit à partir de là pour nous lorsque nous créons l'instance de notre contrat à l'étape 5, nous n'avons donc pas besoin de la charger nous-mêmes.

Si vous souhaitez voir l'ABI, vous pouvez l'afficher dans votre console. Depuis le répertoire racine de votre projet, exécutez :

```sh
node -p "JSON.stringify(require('./artifacts/contracts/MyNFT.sol/MyNFT.json').abi)"
```

## Étape 4 : Configurez les métadonnées de votre NFT en utilisant IPFS {#config-meta}

Si vous vous souvenez de notre tutoriel de la Partie 1, la fonction `mintNFT` de notre contrat intelligent prend un paramètre tokenURI qui doit résoudre vers un document JSON décrivant les métadonnées du NFT — ce qui donne véritablement vie au NFT, lui permettant d'avoir des propriétés configurables, telles qu'un nom, une description, une image et d'autres attributs.

> _Interplanetary File System (IPFS) est un protocole décentralisé et un réseau pair à pair pour stocker et partager des données dans un système de fichiers distribué._

Nous utiliserons Pinata, une API IPFS et une boîte à outils pratiques, pour stocker l'actif et les métadonnées de notre NFT afin de garantir que notre NFT est véritablement décentralisé. Si vous n'avez pas de compte Pinata, inscrivez-vous pour un compte gratuit [ici](https://app.pinata.cloud) et suivez les étapes pour vérifier votre e-mail.

Une fois que vous avez créé un compte :

- Accédez à la [page Files](https://app.pinata.cloud/ipfs/files) et cliquez sur le bouton « Add » dans le coin supérieur droit de la page.

- Téléversez une image sur Pinata — ce sera l'actif image de votre NFT. N'hésitez pas à nommer l'actif comme vous le souhaitez. Assurez-vous de le téléverser sur l'IPFS public : les fichiers sur [Private IPFS](https://docs.pinata.cloud/files/private-ipfs) ne peuvent pas être récupérés par les portefeuilles et les places de marché qui affichent votre NFT.

- Après le téléversement, vous verrez le fichier listé sur la page Files avec son CID (identifiant de contenu). Copiez le CID. Vous pouvez voir votre téléversement à l'adresse : `https://gateway.pinata.cloud/ipfs/<CID>`, ou via la passerelle dédiée listée sous « Gateways » dans la barre latérale de Pinata. Vous pouvez trouver l'image que nous avons utilisée sur IPFS [ici](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5), par exemple.

Maintenant, nous allons vouloir téléverser un document supplémentaire sur Pinata. Mais avant de faire cela, nous devons le créer !

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

N'hésitez pas à modifier les données dans le json. Vous pouvez supprimer ou ajouter des éléments à la section des attributs. Plus important encore, assurez-vous que le champ image pointe vers l'emplacement de votre image IPFS, sous la forme `ipfs://<image-CID>` — sinon, votre NFT inclura une photo d'un chien (très mignon !).

Une fois que vous avez terminé de modifier le fichier JSON, enregistrez-le et téléversez-le sur Pinata, en suivant les mêmes étapes que pour le téléversement de l'image. Copiez également le CID de `nft-metadata.json` ; nous en aurons besoin à l'étape 9.

## Étape 5 : Créez une instance de votre contrat {#instance-contract}

Maintenant, pour interagir avec notre contrat, nous devons en créer une instance dans notre code. Pour ce faire, nous aurons besoin de l'adresse de notre contrat, que notre script de déploiement a affichée dans la Partie 1. Vous pouvez également la trouver sur [Etherscan](https://sepolia.etherscan.io/) ou [Blockscout](https://eth-sepolia.blockscout.com/) en recherchant l'adresse que vous avez utilisée pour déployer le contrat.

![Voir l'adresse de votre contrat sur Etherscan](./view-contract-etherscan.png)

Dans l'exemple ci-dessus, l'adresse de notre contrat est 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Ensuite, nous utiliserons la méthode `getContractAt` du plugin Ethers de Hardhat pour créer notre contrat en utilisant son nom (qui lui indique quelle ABI utiliser) et son adresse. Dans votre fichier `mint-nft.js`, ajoutez ce qui suit, en remplaçant l'adresse par la vôtre :

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)
```

## Étape 6 : Vérifiez le fichier `.env` {#update-env}

Chaque transaction que nous envoyons doit être signée avec la clé privée de votre compte. Si vous avez terminé la partie 1 du tutoriel, notre fichier `.env` devrait déjà ressembler à ceci :

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Il n'est pas nécessaire d'ajouter votre adresse publique : ethers la déduit à partir de la clé privée.

## Étape 7 : Créez votre transaction {#create-txn}

Tout d'abord, définissons une fonction nommée `mintNFT(tokenURI)` et créons notre transaction en procédant comme suit :

1. Obtenez le compte à partir duquel nous envoyons la transaction. `ethers.getSigners()` renvoie les comptes configurés pour le réseau, qui sur Sepolia est le compte dont la clé privée se trouve dans `.env`. Puisque `mintNFT` est `onlyOwner`, cela doit être le même compte que celui qui a déployé le contrat.

1. Appelez la fonction `mintNFT` sur l'instance de notre contrat, avec notre propre adresse comme destinataire et l'URI des métadonnées. C'est le calcul que nous souhaitons effectuer dans cette transaction — qui dans ce cas est la frappe d'un NFT.

Vous n'avez pas besoin de calculer vous-même le nonce (le nombre de transactions envoyées depuis votre adresse, ce qui empêche les attaques par rejeu), la limite de gaz ou les frais : ethers les récupère ou les estime avant d'envoyer la transaction.

Votre fichier `mint-nft.js` devrait maintenant ressembler à ceci :

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  // Envoyer la transaction. ethers remplit le nonce, la limite de gaz et les frais pour nous.
  const tx = await nftContract.mintNFT(signer.address, tokenURI)
}
```

## Étape 8 : Signez la transaction {#sign-txn}

Parce que le réseau est configuré avec notre clé privée, ethers signe automatiquement la transaction avec celle-ci avant de l'envoyer.

L'appel de `mintNFT` se termine une fois que la transaction a été envoyée, et nous donne le hachage de transaction, que nous pouvons utiliser pour nous assurer que notre transaction a été minée et n'a pas été abandonnée par le réseau. `tx.wait()` attend ensuite que la transaction soit incluse dans un bloc. Nous avons également ajouté une vérification des erreurs afin de savoir si notre transaction a réussi.

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // Envoyer la transaction. ethers remplit le nonce, la limite de gaz et les frais pour nous.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // Attendre que la transaction soit incluse dans un bloc
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}
```

## Étape 9 : Appelez `mintNFT` et exécutez `mint-nft.js` {#call-mintnft-fn}

Vous vous souvenez du fichier `nft-metadata.json` que vous avez téléversé sur Pinata ? Récupérez son CID depuis Pinata et passez `ipfs://<metadata-CID>` comme paramètre à la fonction `mintNFT`. Les portefeuilles et les places de marché résolvent les URI `ipfs://` via une passerelle IPFS de leur choix, de sorte que votre NFT ne dépend d'aucune passerelle unique.

> Vérifiez bien que le CID que vous avez copié renvoie à votre **nft-metadata.json** en chargeant `https://gateway.pinata.cloud/ipfs/<metadata-CID>` dans une fenêtre séparée. La page devrait ressembler à la capture d'écran ci-dessous :

![Votre page devrait afficher les métadonnées json](./metadataJSON.png)_Votre page devrait afficher les métadonnées json_

Dans l'ensemble, votre code devrait ressembler à ceci :

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // Envoyer la transaction. ethers remplit le nonce, la limite de gaz et les frais pour nous.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // Attendre que la transaction soit incluse dans un bloc
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}

await mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Maintenant, exécutez le script sur Sepolia pour frapper votre NFT :

```sh
npx hardhat run scripts/mint-nft.js --network sepolia
```

Après quelques secondes, vous devriez voir une réponse comme celle-ci dans votre terminal :

```text
The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
Your NFT was minted in block <block number>
```

Pour voir les détails de votre transaction, recherchez son hash sur [Etherscan](https://sepolia.etherscan.io/) ou [Blockscout](https://eth-sepolia.blockscout.com/).

![Voir le hachage de transaction de votre NFT sur Etherscan](./view-nft-etherscan.png)_Voir le hachage de transaction de votre NFT sur Etherscan_

Et c'est tout ! Vous avez maintenant déployé ET frappé un NFT sur la chaîne de blocs Ethereum <Emoji text=":money_mouth_face:" size={1} />

En utilisant `mint-nft.js`, vous pouvez frapper autant de NFT que votre cœur (et votre portefeuille) le désire ! Assurez-vous simplement de passer un nouveau tokenURI décrivant les métadonnées du NFT (sinon, vous finirez par en créer un tas d'identiques avec des ID différents).

Vraisemblablement, vous aimeriez pouvoir exhiber votre NFT dans votre portefeuille — alors assurez-vous de consulter la [Partie 3 : Comment voir votre NFT dans votre portefeuille](/developers/tutorials/how-to-view-nft-in-metamask/) !
