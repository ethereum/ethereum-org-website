---
title: "Comment écrire et déployer un NFT (Partie 1/3 de la série de tutoriels sur les NFT)"
description: "Ce tutoriel est la première partie d'une série sur les NFT qui vous guidera étape par étape sur la façon d'écrire et de déployer un contrat intelligent de jeton non fongible (jeton ERC-721) en utilisant Ethereum et Inter Planetary File System (IPFS)."
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "contrats intelligents"]
skill: beginner
breadcrumb: "Écrire et déployer un NFT"
lang: fr
published: 2021-04-22
---

Les NFT ayant mis la chaîne de blocs sur le devant de la scène, c'est une excellente occasion de comprendre vous-même cet engouement en publiant votre propre contrat de NFT (jeton ERC-721) sur la chaîne de blocs Ethereum !

Alchemy est extrêmement fier de propulser les plus grands noms de l'espace NFT, notamment Makersplace (qui a récemment établi un record de vente d'œuvres d'art numériques chez Christie's pour 69 millions de dollars), Dapper Labs (créateurs de NBA Top Shot et Crypto Kitties), OpenSea (la plus grande place de marché NFT au monde), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable, et bien d'autres.

Dans ce tutoriel, nous allons parcourir la création et le déploiement d'un contrat intelligent ERC-721 sur le réseau de test Sepolia en utilisant [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) et [Alchemy](https://alchemy.com/signup/eth) (ne vous inquiétez pas si vous ne comprenez pas encore ce que tout cela signifie — nous allons l'expliquer !).

Dans la partie 2 de ce tutoriel, nous verrons comment utiliser notre contrat intelligent pour frapper un NFT, et dans la partie 3, nous expliquerons comment visualiser votre NFT sur MetaMask.

Et bien sûr, si vous avez des questions à tout moment, n'hésitez pas à nous contacter sur le [Discord d'Alchemy](https://discord.gg/gWuC7zB) ou à visiter la [documentation de l'API NFT d'Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api) !

## Étape 1 : Se connecter au réseau Ethereum {#connect-to-ethereum}

Il existe de nombreuses façons de faire des requêtes à la chaîne de blocs Ethereum, mais pour simplifier les choses, nous utiliserons un compte gratuit sur [Alchemy](https://alchemy.com/signup/eth), une plateforme de développement de chaîne de blocs et une API qui nous permet de communiquer avec la chaîne Ethereum sans avoir à exécuter nos propres nœuds.

Dans ce tutoriel, nous profiterons également des outils de développement d'Alchemy pour la surveillance et l'analyse afin de comprendre ce qui se passe en interne lors du déploiement de notre contrat intelligent. Si vous n'avez pas encore de compte Alchemy, vous pouvez vous inscrire gratuitement [ici](https://alchemy.com/signup/eth).

## Étape 2 : Créer votre application (et votre clé API) {#make-api-key}

Une fois que vous avez créé un compte Alchemy, vous pouvez générer une clé API en créant une application. Cela nous permettra de faire des requêtes au réseau de test Sepolia. Consultez [ce guide](https://docs.alchemyapi.io/guides/choosing-a-network) si vous êtes curieux d'en savoir plus sur les réseaux de test.

1. Accédez à la page « Create App » (Créer une application) dans votre tableau de bord Alchemy en survolant « Apps » dans la barre de navigation et en cliquant sur « Create App »

![Create your app](./create-your-app.png)

2. Nommez votre application (nous avons choisi « My First NFT! »), ajoutez une courte description, sélectionnez « Ethereum » pour la chaîne (Chain), et choisissez « Sepolia » pour votre réseau (Network). Depuis La Fusion, les autres réseaux de test ont été dépréciés.

![Configure and publish your app](./alchemy-explorer-sepolia.png)

3. Cliquez sur « Create app » et c'est tout ! Votre application devrait apparaître dans le tableau ci-dessous.

## Étape 3 : Créer un compte Ethereum (adresse) {#create-eth-address}

Nous avons besoin d'un compte Ethereum pour envoyer et recevoir des transactions. Pour ce tutoriel, nous utiliserons MetaMask, un portefeuille virtuel dans le navigateur utilisé pour gérer l'adresse de votre compte Ethereum. Si vous souhaitez mieux comprendre le fonctionnement des transactions sur Ethereum, consultez [cette page](/developers/docs/transactions/) de la Fondation Ethereum.

Vous pouvez télécharger et créer un compte MetaMask gratuitement [ici](https://metamask.io/download). Lors de la création d'un compte, ou si vous en avez déjà un, assurez-vous de basculer sur le « Sepolia Test Network » (Réseau de test Sepolia) en haut à droite (afin de ne pas manipuler d'argent réel).

![Set Sepolia as your network](./metamask-goerli.png)

## Étape 4 : Ajouter de l'ether depuis un faucet {#step-4-add-ether-from-a-faucet}

Afin de déployer notre contrat intelligent sur le réseau de test, nous aurons besoin de faux ETH. Pour obtenir des ETH, vous pouvez vous rendre sur le [faucet Sepolia](https://sepoliafaucet.com/) hébergé par Alchemy, vous connecter et entrer l'adresse de votre compte, puis cliquer sur « Send Me ETH » (Envoyez-moi des ETH). Vous devriez voir des ETH dans votre compte MetaMask peu de temps après !

## Étape 5 : Vérifier votre solde {#check-balance}

Pour vérifier que notre solde est bien là, faisons une requête [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) en utilisant [l'outil Composer d'Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Cela renverra le montant d'ETH dans notre portefeuille. Après avoir saisi l'adresse de votre compte MetaMask et cliqué sur « Send Request » (Envoyer la requête), vous devriez voir une réponse comme celle-ci :

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **Remarque** Ce résultat est en Wei, pas en ETH. Le Wei est utilisé comme la plus petite dénomination de l'ether. La conversion de Wei en ETH est 1 eth = 10<sup>18</sup> Wei. Donc, si nous convertissons 0xde0b6b3a7640000 en décimal, nous obtenons 1\*10<sup>18</sup> Wei, ce qui équivaut à 1 ETH.

Ouf ! Notre faux argent est bien là.

## Étape 6 : Initialiser notre projet {#initialize-project}

Tout d'abord, nous devrons créer un dossier pour notre projet. Accédez à votre ligne de commande et tapez :

    mkdir my-nft
    cd my-nft

Maintenant que nous sommes dans le dossier de notre projet, nous allons utiliser npm init pour initialiser le projet. Si vous n'avez pas encore installé npm, suivez [ces instructions](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (nous aurons également besoin de [Node.js](https://nodejs.org/en/download/), alors téléchargez-le aussi !).

    npm init

La façon dont vous répondez aux questions d'installation n'a pas vraiment d'importance ; voici comment nous avons procédé à titre de référence :

```json
    package name: (my-nft)
    version: (1.0.0)
    description: My first NFT!
    entry point: (index.js)
    test command:
    git repository:
    keywords:
    author:
    license: (ISC)
    About to write to /Users/thesuperb1/Desktop/my-nft/package.json:

    {
      "name": "my-nft",
      "version": "1.0.0",
      "description": "My first NFT!",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }
```

Approuvez le fichier package.json, et nous sommes prêts à commencer !

## Étape 7 : Installer [Hardhat](https://hardhat.org/getting-started/#overview) {#install-hardhat}

Hardhat est un environnement de développement pour compiler, déployer, tester et déboguer vos logiciels Ethereum. Il aide les développeurs lors de la création de contrats intelligents et d'applications décentralisées (dapps) localement avant de les déployer sur la chaîne en direct.

Dans notre projet my-nft, exécutez :

    npm install --save-dev hardhat

Consultez cette page pour plus de détails sur les [instructions d'installation](https://hardhat.org/getting-started/#overview).

## Étape 8 : Créer un projet Hardhat {#create-hardhat-project}

Dans le dossier de notre projet, exécutez :

    npx hardhat

Vous devriez alors voir un message de bienvenue et une option pour sélectionner ce que vous voulez faire. Sélectionnez « create an empty hardhat.config.js » :

    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Welcome to Hardhat v2.0.11 👷‍
    ? What do you want to do? …
    Create a sample project
    ❯ Create an empty hardhat.config.js
    Quit

Cela générera un fichier hardhat.config.js pour nous, c'est là que nous spécifierons toute la configuration de notre projet (à l'étape 13).

## Étape 9 : Ajouter les dossiers du projet {#add-project-folders}

Pour garder notre projet organisé, nous allons créer deux nouveaux dossiers. Accédez au répertoire racine de votre projet dans votre ligne de commande et tapez :

    mkdir contracts
    mkdir scripts

- contracts/ est l'endroit où nous conserverons le code de notre contrat intelligent de NFT

- scripts/ est l'endroit où nous conserverons les scripts pour déployer et interagir avec notre contrat intelligent

## Étape 10 : Écrire notre contrat {#write-contract}

Maintenant que notre environnement est configuré, passons à des choses plus excitantes : _l'écriture du code de notre contrat intelligent !_ 

Ouvrez le projet my-nft dans votre éditeur préféré (nous aimons [VSCode](https://code.visualstudio.com/)). Les contrats intelligents sont écrits dans un langage appelé Solidity, c'est ce que nous utiliserons pour écrire notre contrat intelligent MyNFT.sol.‌

1. Accédez au dossier `contracts` et créez un nouveau fichier appelé MyNFT.sol

2. Ci-dessous se trouve le code de notre contrat intelligent de NFT, que nous avons basé sur l'implémentation ERC-721 de la bibliothèque [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721). Copiez et collez le contenu ci-dessous dans votre fichier MyNFT.sol.

   ```solidity
   //Contrat basé sur [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/utils/Counters.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       using Counters for Counters.Counter;
       Counters.Counter private _tokenIds;

       constructor() ERC721("MyNFT", "NFT") {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           _tokenIds.increment();

           uint256 newItemId = _tokenIds.current();
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. Parce que nous héritons de classes de la bibliothèque de contrats OpenZeppelin, exécutez `npm install @openzeppelin/contracts^4.0.0` dans votre ligne de commande pour installer la bibliothèque dans notre dossier.

Alors, que _fait_ exactement ce code ? Décomposons-le ligne par ligne.

En haut de notre contrat intelligent, nous importons trois classes de contrats intelligents [OpenZeppelin](https://openzeppelin.com/) :

- @openzeppelin/contracts/token/ERC721/ERC721.sol contient l'implémentation de la norme ERC-721, dont notre contrat intelligent de NFT héritera. (Pour être un NFT valide, votre contrat intelligent doit implémenter toutes les méthodes de la norme ERC-721.) Pour en savoir plus sur les fonctions ERC-721 héritées, consultez la définition de l'interface [ici](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/utils/Counters.sol fournit des compteurs qui ne peuvent être incrémentés ou décrémentés que de un. Notre contrat intelligent utilise un compteur pour garder une trace du nombre total de NFT frappés et définir l'ID unique sur notre nouveau NFT. (Chaque NFT frappé à l'aide d'un contrat intelligent doit se voir attribuer un ID unique — ici, notre ID unique est simplement déterminé par le nombre total de NFT existants. Par exemple, le premier NFT que nous frappons avec notre contrat intelligent a un ID de « 1 », notre deuxième NFT a un ID de « 2 », etc.)

- @openzeppelin/contracts/access/Ownable.sol configure le [contrôle d'accès](https://docs.openzeppelin.com/contracts/3.x/access-control) sur notre contrat intelligent, de sorte que seul le propriétaire du contrat intelligent (vous) puisse frapper des NFT. (Remarque, l'inclusion du contrôle d'accès est entièrement une question de préférence. Si vous souhaitez que quiconque puisse frapper un NFT à l'aide de votre contrat intelligent, supprimez le mot Ownable à la ligne 10 et onlyOwner à la ligne 17.)

Après nos instructions d'importation, nous avons notre contrat intelligent de NFT personnalisé, qui est étonnamment court — il ne contient qu'un compteur, un constructeur et une seule fonction ! C'est grâce à nos contrats OpenZeppelin hérités, qui implémentent la plupart des méthodes dont nous avons besoin pour créer un NFT, telles que `ownerOf` qui renvoie le propriétaire du NFT, et `transferFrom`, qui transfère la propriété du NFT d'un compte à un autre.

Dans notre constructeur ERC-721, vous remarquerez que nous passons 2 chaînes de caractères, « MyNFT » et « NFT ». La première variable est le nom du contrat intelligent, et la seconde est son symbole. Vous pouvez nommer chacune de ces variables comme vous le souhaitez !

Enfin, nous avons notre fonction `mintNFT(address recipient, string memory tokenURI)` qui nous permet de frapper un NFT ! Vous remarquerez que cette fonction prend deux variables :

- `address recipient` spécifie l'adresse qui recevra votre NFT fraîchement frappé

- `string memory tokenURI` est une chaîne de caractères qui doit se résoudre en un document JSON décrivant les métadonnées du NFT. Les métadonnées d'un NFT sont vraiment ce qui lui donne vie, lui permettant d'avoir des propriétés configurables, telles qu'un nom, une description, une image et d'autres attributs. Dans la partie 2 de ce tutoriel, nous décrirons comment configurer ces métadonnées.

`mintNFT` appelle certaines méthodes de la bibliothèque ERC-721 héritée, et renvoie finalement un nombre qui représente l'ID du NFT fraîchement frappé.

## Étape 11 : Connecter MetaMask et Alchemy à votre projet {#connect-metamask-and-alchemy}

Maintenant que nous avons créé un portefeuille MetaMask, un compte Alchemy et écrit notre contrat intelligent, il est temps de connecter les trois.

Chaque transaction envoyée depuis votre portefeuille virtuel nécessite une signature utilisant votre clé privée unique. Pour fournir cette autorisation à notre programme, nous pouvons stocker en toute sécurité notre clé privée (et la clé API Alchemy) dans un fichier d'environnement.

Pour en savoir plus sur l'envoi de transactions, consultez [ce tutoriel](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) sur l'envoi de transactions à l'aide de Web3.

Tout d'abord, installez le paquet dotenv dans le répertoire de votre projet :

    npm install dotenv --save

Ensuite, créez un fichier `.env` dans le répertoire racine de notre projet, et ajoutez-y votre clé privée MetaMask et l'URL HTTP de l'API Alchemy.

- Suivez [ces instructions](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) pour exporter votre clé privée depuis MetaMask

- Voir ci-dessous pour obtenir l'URL HTTP de l'API Alchemy et la copier dans votre presse-papiers

![Copy your Alchemy API URL](./copy-alchemy-api-url.gif)

Votre `.env` devrait maintenant ressembler à ceci :

    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"

Pour les connecter réellement à notre code, nous ferons référence à ces variables dans notre fichier hardhat.config.js à l'étape 13.

<EnvWarningBanner />

## Étape 12 : Installer Ethers.js {#install-ethers}

Ethers.js est une bibliothèque qui facilite l'interaction et l'envoi de requêtes à Ethereum en enveloppant les [méthodes JSON-RPC standards](/developers/docs/apis/json-rpc/) avec des méthodes plus conviviales.

Hardhat facilite grandement l'intégration de [plugins](https://hardhat.org/plugins/) pour des outils supplémentaires et des fonctionnalités étendues. Nous tirerons parti du [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) pour le déploiement de contrats ([Ethers.js](https://github.com/ethers-io/ethers.js/) possède des méthodes de déploiement de contrats très propres).

Dans le répertoire de votre projet, tapez :

    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0

Nous aurons également besoin d'ethers dans notre hardhat.config.js à l'étape suivante.

## Étape 13 : Mettre à jour hardhat.config.js {#update-hardhat-config}

Nous avons ajouté plusieurs dépendances et plugins jusqu'à présent, nous devons maintenant mettre à jour hardhat.config.js pour que notre projet les connaisse tous.

Mettez à jour votre hardhat.config.js pour qu'il ressemble à ceci :

```js
    /**
    * @type import('hardhat/config').HardhatUserConfig
    */
    require('dotenv').config();
    require("@nomiclabs/hardhat-ethers");
    const { API_URL, PRIVATE_KEY } = process.env;
    module.exports = {
       solidity: "0.8.1",
       defaultNetwork: "sepolia",
       networks: {
          hardhat: {},
          sepolia: {
             url: API_URL,
             accounts: [`0x${PRIVATE_KEY}`]
          }
       },
    }
```

## Étape 14 : Compiler notre contrat {#compile-contract}

Pour nous assurer que tout fonctionne jusqu'à présent, compilons notre contrat. La tâche de compilation est l'une des tâches intégrées de Hardhat.

Depuis la ligne de commande, exécutez :

    npx hardhat compile

Vous pourriez recevoir un avertissement indiquant que l'identifiant de licence SPDX n'est pas fourni dans le fichier source, mais ne vous en inquiétez pas — espérons que tout le reste semble correct ! Sinon, vous pouvez toujours envoyer un message sur le [Discord d'Alchemy](https://discord.gg/u72VCg3).

## Étape 15 : Écrire notre script de déploiement {#write-deploy}

Maintenant que notre contrat est écrit et que notre fichier de configuration est prêt, il est temps d'écrire notre script de déploiement de contrat.

Accédez au dossier `scripts/` et créez un nouveau fichier appelé `deploy.js`, en y ajoutant le contenu suivant :

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Démarre le déploiement, retournant une promesse qui se résout en un objet contrat
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("Contract deployed to address:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat fait un travail incroyable pour expliquer ce que fait chacune de ces lignes de code dans son [tutoriel sur les contrats](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), nous avons adopté leurs explications ici.

    const MyNFT = await ethers.getContractFactory("MyNFT");

Une ContractFactory dans Ethers.js est une abstraction utilisée pour déployer de nouveaux contrats intelligents, donc MyNFT ici est une usine pour les instances de notre contrat de NFT. Lors de l'utilisation du plugin hardhat-ethers, les instances ContractFactory et Contract sont connectées au premier signataire par défaut.

    const myNFT = await MyNFT.deploy();

L'appel de deploy() sur une ContractFactory démarrera le déploiement et renverra une promesse (Promise) qui se résout en un contrat (Contract). C'est l'objet qui possède une méthode pour chacune des fonctions de notre contrat intelligent.

## Étape 16 : Déployer notre contrat {#deploy-contract}

Nous sommes enfin prêts à déployer notre contrat intelligent ! Revenez à la racine du répertoire de votre projet, et dans la ligne de commande, exécutez :

    npx hardhat --network sepolia run scripts/deploy.js

Vous devriez alors voir quelque chose comme :

    Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650

Si nous allons sur [Etherscan Sepolia](https://sepolia.etherscan.io/) et recherchons l'adresse de notre contrat, nous devrions pouvoir voir qu'il a été déployé avec succès. Si vous ne le voyez pas immédiatement, veuillez patienter un peu car cela peut prendre un certain temps. La transaction ressemblera à ceci :

![View your transaction address on Etherscan](./etherscan-sepoila-contract-creation.png)

L'adresse « From » (De) doit correspondre à l'adresse de votre compte MetaMask et l'adresse « To » (À) indiquera « Contract Creation » (Création de contrat). Si nous cliquons sur la transaction, nous verrons l'adresse de notre contrat dans le champ « To » :

![View your contract address on Etherscan](./etherscan-sepolia-tx-details.png)

Ouaiiiis ! Vous venez de déployer votre contrat intelligent de NFT sur la chaîne (réseau de test) Ethereum !

Pour comprendre ce qui se passe en interne, naviguons vers l'onglet Explorer dans notre [tableau de bord Alchemy](https://dashboard.alchemyapi.io/explorer). Si vous avez plusieurs applications Alchemy, assurez-vous de filtrer par application et de sélectionner « MyNFT ».

![View calls made “under the hood” with Alchemy’s Explorer Dashboard](./alchemy-explorer-goerli.png)

Ici, vous verrez une poignée d'appels JSON-RPC que Hardhat/Ethers a effectués en interne pour nous lorsque nous avons appelé la fonction .deploy(). Deux appels importants à souligner ici sont [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction), qui est la requête pour écrire réellement notre contrat intelligent sur la chaîne Sepolia, et [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash) qui est une requête pour lire des informations sur notre transaction à partir du hash (un modèle typique lors de l'envoi de transactions). Pour en savoir plus sur l'envoi de transactions, consultez ce tutoriel sur [l'envoi de transactions à l'aide de Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

C'est tout pour la partie 1 de ce tutoriel. Dans la [partie 2, nous interagirons réellement avec notre contrat intelligent en frappant un NFT](/developers/tutorials/how-to-mint-an-nft/), et dans la [partie 3, nous vous montrerons comment visualiser votre NFT dans votre portefeuille Ethereum](/developers/tutorials/how-to-view-nft-in-metamask/) !