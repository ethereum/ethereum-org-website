---
title: "Comment écrire et déployer un NFT (Partie 1/3 de la série de tutoriels NFT)"
description: "Ce tutoriel est la première partie de la série sur les NFT et vous guidera pas-à-pas sur la façon d'écrire et de déployer un contrat intelligent de jeton non fongible (jeton ERC-721) avec Ethereum et IPFS (Inter Planetary File System)."
author: "Sumi Mudgil"
tags:
  [
    "ERC-721",
    "Alchemy",
    "solidity",
    "contrats intelligents"
  ]
skill: beginner
lang: fr
published: 2021-04-22
---

Grâce aux NFT, la blockchain a été découverte par le grand public. C'est l'occasion rêvée de comprendre cet engouement en publiant votre propre contrat NFT (jeton ERC-721) sur la blockchain Ethereum !

Alchemy est extrêmement fier d'alimenter les plus grands noms de l'espace NFT, y compris Makersplace (qui a récemment établi un record de vente d'œuvres d'art numériques chez Christie's pour 69 millions de dollars), Dapper Labs (créateurs de NBA Top Shot & Crypto Kitties), OpenSea (le plus grand marché NFT du monde), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable, et plus encore.

Dans ce tutoriel, nous allons voir comment créer et déployer un contrat intelligent ERC-721 sur le réseau de test Sepolia en utilisant [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) et [Alchemy](https://alchemy.com/signup/eth) (ne vous inquiétez pas si vous ne comprenez pas encore ce que tout cela signifie, nous allons tout vous expliquer !).

Dans la deuxième partie de ce tutoriel, nous verrons comment utiliser notre contract intelligent pour créer un NFT, et dans la troisième partie, nous expliquerons comment visualiser votre NFT sur MetaMask.

Et bien sûr, si vous avez des questions, n'hésitez pas à les poser sur le [Discord d'Alchemy](https://discord.gg/gWuC7zB) ou à consulter la [documentation de l'API NFT d'Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api) !

## Étape 1 : Se connecter au réseau Ethereum {#connect-to-ethereum}

Il existe de nombreuses façons de faire des requêtes à la blockchain Ethereum, mais pour simplifier les choses, nous utiliserons un compte gratuit sur [Alchemy](https://alchemy.com/signup/eth), une plateforme de développement blockchain et une API qui nous permet de communiquer avec la chaîne Ethereum sans avoir à exécuter nos propres nœuds.

Dans ce tutoriel, nous allons également tirer parti des outils de développement d'Alchemy pour le suivi et l'analyse afin de comprendre ce qui se passe sous le capot concernant le déploiement de notre contract intelligent. Si vous n'avez pas encore de compte Alchemy, vous pouvez vous inscrire gratuitement [ici](https://alchemy.com/signup/eth).

## Étape 2 : Créer votre application (et votre clé API) {#make-api-key}

Une fois votre compte Alchemy créé, vous pouvez générer une clé API en créant une application. Cela va nous permettre d'émettre des requêtes sur le réseau de test Sepolia. Consultez [ce guide](https://docs.alchemyapi.io/guides/choosing-a-network) si vous souhaitez en savoir plus sur les réseaux de test.

1. Accédez à la page « Create App » dans votre Tableau de bord Alchemy, en survolant « Apps » dans la barre de navigation et en cliquant sur « Create App »

![Créer votre application](./create-your-app.png)

2. Nommez votre application (nous avons choisi « Mon premier NFT ! »), donnez une brève description, sélectionnez « Ethereum » pour la chaine, et choisissez « Sepolia » pour votre réseau. Depuis la fusion, les autres réseaux de test sont obsolètes.

![Configurer et publier votre application](./alchemy-explorer-sepolia.png)

3. Cliquez sur « Create app », et voilà ! Votre application devrait apparaître dans le tableau ci-dessous.

## Étape 3 : Créer un compte Ethereum (adresse) {#create-eth-address}

Nous avons besoin d'un compte Ethereum pour effectuer des transactions (envoyer et recevoir). Pour ce tutoriel, nous allons utiliser MetaMask, un portefeuille virtuel intégré au navigateur, servant à gérer les adresses de votre compte Ethereum. Si vous voulez mieux comprendre le fonctionnement des transactions sur Ethereum, consultez [cette page](/developers/docs/transactions/) de la Fondation Ethereum.

Vous pouvez télécharger et créer un compte MetaMask gratuitement [ici](https://metamask.io/download). Lorsque vous créez un compte, ou si vous en avez déjà un, assurez-vous de basculer sur « Réseau de test Sepolia » en haut à droite (afin de ne pas utiliser d'argent réel).

![Définir Sepolia comme votre réseau](./metamask-goerli.png)

## Étape 4 : Ajouter de l'ether à partir d'un robinet {#step-4-add-ether-from-a-faucet}

Afin de déployer notre contrat intelligent sur le serveur test, nous aurons besoin de faux ETH. Pour obtenir des ETH, vous pouvez vous rendre sur le [robinet Sepolia](https://sepoliafaucet.com/) hébergé par Alchemy, vous connecter et entrer l'adresse de votre compte, puis cliquer sur « Send Me ETH ». Vous devriez voir votre ETH dans votre compte MetaMask peu de temps après !

## Étape 5 : Vérifier votre solde {#check-balance}

Pour vérifier que notre solde est bien là, faisons une requête [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) en utilisant l'[outil de composition d'Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Cela va renvoyer la quantité d'ETH dans notre portefeuille. Après avoir entré l'adresse de votre compte MetaMask et cliqué sur « Send Request », vous devriez voir une réponse comme celle-ci :

    ```
    {"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
    ```

> **Remarque :** ce résultat est en wei, pas en ETH. Le wei est utilisé comme la plus petite dénomination d'ether. La conversion entre wei et ETH est 1 eth = 10<sup>18</sup> wei. Donc si on convertit 0xde0b6b3a7640000 en décimale, nous obtenons 1\*10<sup>18</sup> wei, ce qui équivaut à 1 ETH.

Ouf ! Notre faux argent est bien là.

## Étape 6 : Initialiser notre projet {#initialize-project}

Pour commencer, nous allons devoir créer un dossier pour notre projet. Ouvrez votre ligne de commande et tapez :

    ```
    mkdir my-nft
    cd my-nft
    ```

Maintenant que nous sommes dans le dossier de notre projet, nous allons utiliser npm init pour initialiser le projet. Si vous n'avez pas encore installé npm, suivez [ces instructions](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (nous aurons également besoin de [Node.js](https://nodejs.org/en/download/), alors téléchargez-le aussi !).

    ```
    npm init
    ```

La manière dont vous répondez à ces questions d'installation a peu d'importance ; pour référence, voici comment nous avons répondu :

```json
    package name: (my-nft)
    version: (1.0.0)
    description: Mon premier NFT !
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
      "description": "Mon premier NFT !",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }
```

Approuvez le package.json, et nous sommes prêts à démarrer !

## Étape 7 : Installer [Hardhat](https://hardhat.org/getting-started/#overview) {#install-hardhat}

Hardhat est un environnement de développement qui permet de compiler, déployer, tester et déboguer votre logiciel Ethereum. Il aide les développeurs à construire des contrats intelligents et des dApps localement avant de les déployer sur la chaîne en production.

Dans notre projet my-nft, exécutez :

    ```
    npm install --save-dev hardhat
    ```

Consultez cette page pour plus de détails sur les [instructions d'installation](https://hardhat.org/getting-started/#overview).

## Étape 8 : Créer le projet Hardhat {#create-hardhat-project}

Dans notre dossier de projet, exécutez :

    ```
    npx hardhat
    ```

Vous devriez maintenant voir un message de bienvenue ainsi qu'une option pour sélectionner ce que vous voulez faire. Sélectionnez : « create an empty hardhat.config.js » :

    ```
    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Bienvenue dans Hardhat v2.0.11 👷‍
    ? Que voulez-vous faire ? …
    Créer un projet d'exemple
    ❯ Créer un fichier hardhat.config.js vide
    Quitter
    ```

Cela va générer un fichier 'hardhar.config.js' dans lequel nous allons spécifier tous les paramètres de notre projet (à l'étape 13).

## Étape 9 : Ajouter les dossiers du projet {#add-project-folders}

Pour garder notre projet organisé, nous allons créer deux nouveaux dossiers. Naviguez vers le répertoire racine de votre projet dans votre invite de commande en ligne et tapez :

    ```
    mkdir contracts
    mkdir scripts
    ```

- contracts/ est l'endroit où nous garderons notre code de contrat intelligent NFT

- scripts/ est l'endroit où nous garderons les scripts pour déployer et interagir avec notre contrat intelligent

## Étape 10 : Écrire notre contrat {#write-contract}

Maintenant que notre environnement est configuré, passons à des choses plus passionnantes : _l'écriture du code de notre contrat intelligent !_

Ouvrez le projet my-nft dans votre éditeur préféré (nous aimons [VSCode](https://code.visualstudio.com/)). Les contrats intelligents sont écrits dans un langage appelé Solidity, qui est celui que nous allons utiliser pour écrire notre contrat intelligent MyNFT.sol.

1. Allez dans le dossier `contracts` et créez un nouveau fichier nommé MyNFT.sol

2. Vous trouverez ci-dessous le code de notre contrat intelligent NFT, que nous avons basé sur l'implémentation ERC-721 de la bibliothèque [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721). Copiez et collez le contenu ci-dessous dans votre fichier MyNFT.sol.

   ```solidity
   // Contrat basé sur [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
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

3. Puisque nous héritons des classes de la bibliothèque de contrats OpenZeppelin, exécutez `npm install @openzeppelin/contracts^4.0.0` dans votre ligne de commande pour installer la bibliothèque dans notre dossier.

Alors, que _fait_ ce code exactement ? Décortiquons-le ligne par ligne.

En haut de notre contrat intelligent, nous importons trois classes de contrats intelligents [OpenZeppelin](https://openzeppelin.com/) :

- @openzeppelin/contracts/token/ERC721/ERC721.sol contient l'implémentation de la norme ERC-721, dont notre contrat intelligent NFT héritera. (Pour être un NFT valide, votre contrat intelligent doit implémenter toutes les méthodes de la norme ERC-721.) Pour en savoir plus sur les fonctions ERC-721 héritées, consultez la définition de l'interface [ici](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/utils/Counters.sol fournit des compteurs qui ne peuvent être incrémentés ou décrémentés que de un. Notre contrat intelligent utilise des compteurs pour garder une trace du nombre total de NFT créés et définir l'ID unique de votre nouveau NFT. (Chaque NFT créé à l'aide d'un contrat intelligent doit se voir attribuer un ID unique - ici notre ID unique est simplement déterminé par le nombre total de NFT existants. Par exemple, le premier NFT que nous créons avec notre contrat intelligent a un ID de « 1 », le deuxième NFT a un ID de « 2 », etc.)

- @openzeppelin/contracts/access/Ownable.sol met en place un [contrôle d'accès](https://docs.openzeppelin.com/contracts/3.x/access-control) sur notre contrat intelligent, de sorte que seul le propriétaire du contrat intelligent (vous) puisse frapper des NFT. (Remarque : l'inclusion du contrôle d'accès est entièrement une préférence. Si vous souhaitez que n'importe qui puisse créer un NFT en utilisant votre contrat intelligent, supprimez le mot « Ownable » à la ligne 10 et « onlyOwner » à la ligne 17.)

Après nos déclarations d'importation, nous obtenons notre contrat intelligent NFT personnalisé, qui est étonnamment court - il ne contient qu'un compteur, un constructeur et une seule fonction ! C'est grâce à nos contrats OpenZeppelin hérités, qui implémentent la plupart des méthodes dont nous avons besoin pour créer un NFT, comme `ownerOf` qui renvoie le propriétaire du NFT, et `transferFrom`, qui transfère la propriété du NFT d'un compte à un autre.

Dans notre constructeur ERC-721, vous remarquerez que nous passons deux chaînes de caractères, « MyNFT » et « NFT ». La première variable est le nom de notre contrat intelligent, et le second est son symbole. Vous pouvez nommer chacune de ces variables comme vous le souhaitez !

Enfin, nous avons notre fonction `mintNFT(address recipient, string memory tokenURI)` qui nous permet de frapper un NFT ! Vous remarquerez que cette fonction prend en paramètre deux variables :

- `address recipient` spécifie l'adresse qui recevra votre NFT fraîchement frappé.

- `string memory tokenURI` est une chaîne de caractères qui doit correspondre à un document JSON décrivant les métadonnées du NFT. Les métadonnées d'un NFT sont ce qui lui donne vie, lui permettant d'avoir des propriétés configurables, comme un nom, une description, une image et d'autres attributs. Dans la deuxième partie de ce tutoriel, nous décrirons comment configurer ces métadonnées.

`mintNFT` appelle certaines méthodes de la bibliothèque ERC-721 héritée, et renvoie finalement un nombre qui représente l'ID du NFT fraîchement frappé.

## Étape 11 : Connecter MetaMask et Alchemy à votre projet {#connect-metamask-and-alchemy}

Maintenant que nous avons créé un portefeuille MetaMask, un compte Alchemy et écrit notre contrat intelligent, il est temps de connecter les trois.

Chaque transaction envoyée depuis votre portefeuille virtuel nécessite une signature en utilisant votre clé privée unique. Pour donner cette permission à notre programme, nous pouvons stocker en toute sécurité notre clé privée (et la clé API Alchemy) dans un fichier d'environnement.

Pour en savoir plus sur l'envoi de transactions, consultez [ce tutoriel](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) sur l'envoi de transactions à l'aide de web3.

Premièrement, installez le paquet dotenv dans votre dossier de projet :

    ```
    npm install dotenv --save
    ```

Ensuite, créez un fichier `.env` à la racine de notre projet, et ajoutez-y votre clé privée MetaMask et votre URL d'API HTTP Alchemy.

- Suivez [ces instructions](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) pour exporter votre clé privée depuis MetaMask.

- Voir ci-dessous pour obtenir l'URL de l'API HTTP Alchemy et la copier dans votre presse-papiers

![Copier votre URL d'API Alchemy](./copy-alchemy-api-url.gif)

Votre fichier `.env` devrait maintenant ressembler à ceci :

    ```
    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"
    ```

Pour les relier effectivement à notre code, nous ferons référence à ces variables dans notre fichier hardhat.config.js à l'étape 13.

<EnvWarningBanner />

## Étape 12 : Installer Ethers.js {#install-ethers}

Ethers.js est une bibliothèque qui facilite l'interaction et l'envoi de requêtes à Ethereum en encapsulant les [méthodes JSON-RPC standard](/developers/docs/apis/json-rpc/) dans des méthodes plus conviviales.

Hardhat facilite grandement l'intégration de [plugins](https://hardhat.org/plugins/) pour des outils supplémentaires et des fonctionnalités étendues. Nous allons profiter du [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) pour le déploiement du contrat ([Ethers.js](https://github.com/ethers-io/ethers.js/) a des méthodes de déploiement de contrat très propres).

Dans votre dossier de projet, tapez :

    ```
    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0
    ```

Nous aurons également besoin d'ethers dans notre hardhat.config.js à l'étape suivante.

## Étape 13 : Mettre à jour hardhat.config.js {#update-hardhat-config}

À ce stade, nous avons ajouté plusieurs dépendances et plugins. Nous devons maintenant mettre à jour hardhat.config.js pour que notre projet les reconnaisse.

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

Pour s’assurer à ce stade que tout fonctionne, compilons notre contrat. La tâche « compile » est une des tâches intégrée à hardhat.

À partir de la ligne de commande, exécutez :

    ```
    npx hardhat compile
    ```

Vous pourriez voir un avertissement du type « SPDX license identifier not provided in source file » (identifiant de licence SDPX non fourni dans le fichier source), mais nul besoin de vous inquiéter — espérons que tout le reste fonctionne ! Sinon, vous pouvez toujours envoyer un message sur le [Discord d'Alchemy](https://discord.gg/u72VCg3).

## Étape 15 : Écrire notre script de déploiement {#write-deploy}

Maintenant que notre contrat est codé et que notre fichier de configuration est bon, il est temps d’écrire notre script de déploiement pour notre contrat.

Allez dans le dossier `scripts/`, créez un nouveau fichier nommé `deploy.js` et ajoutez-y le contenu suivant :

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Démarrer le déploiement, en retournant une promesse qui se résout en un objet de contrat
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("Contrat déployé à l'adresse :", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat explique très bien ce que fait chacune de ces lignes de code dans son [tutoriel sur les contrats](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), nous avons repris leurs explications ici.

    ```
    const MyNFT = await ethers.getContractFactory("MyNFT");
    ```

Un ContractFactory dans ethers.js est une abstraction utilisée pour déployer de nouveaux contrats intelligents, donc MyNFT est ici une usine pour les instances de notre contrat NFT. Lors de l'utilisation du plugin « hardhat-ethers », les instances de ContractFactory et de Contract sont connectées au premier signataire par défaut.

    ```
    const myNFT = await MyNFT.deploy();
    ```

L'appel de deploy() sur un ContractFactory lancera le déploiement, et renverra une « Promise » qui se résout en un Contrat. C'est l'objet qui possède une méthode pour chacune des fonctions de notre contrat intelligent.

## Étape 16 : Déployer notre contrat {#deploy-contract}

Nous sommes enfin prêts à déployer notre contrat intelligent ! Naviguez à nouveau vers la racine du répertoire de votre projet, et dans la ligne de commande, exécutez :

    ```
    npx hardhat --network sepolia run scripts/deploy.js
    ```

Vous devriez maintenant voir quelque chose comme :

    ```
    Contrat déployé à l'adresse : 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
    ```

Si nous allons sur l'[Etherscan de Sepolia](https://sepolia.etherscan.io/) et que nous recherchons l'adresse de notre contrat, nous devrions pouvoir voir qu'il a été déployé avec succès. Si vous ne pouvez pas le voir immédiatement, veuillez patienter, car cela peut prendre un certain temps. La transaction ressemblera à quelque chose comme :

![Afficher l'adresse de votre transaction sur Etherscan](./etherscan-sepoila-contract-creation.png)

L'adresse de l'expéditeur (From) doit correspondre à l'adresse de votre compte MetaMask et l'adresse du destinataire (To) indiquera « Création de contrat ». Si nous cliquons sur la transaction, nous verrons l'adresse de notre contrat dans le champ « To » :

![Afficher l'adresse de votre contrat sur Etherscan](./etherscan-sepolia-tx-details.png)

Super ! Vous venez de déployer votre contrat intelligent NFT sur la chaîne (réseau de test) d'Ethereum !

Pour comprendre ce qui se passe en coulisses, allons dans l'onglet Explorer de notre [tableau de bord Alchemy](https://dashboard.alchemyapi.io/explorer). Si vous avez plusieurs applications Alchemy, veillez à filtrer par application et à sélectionner « MyNFT ».

![Afficher les appels effectués « en coulisses » avec le tableau de bord Explorer d'Alchemy](./alchemy-explorer-goerli.png)

Vous verrez ici un certain nombre d'appels JSON-RPC qu'Hardhat/Ethers ont effectué sous le capot pour nous lorsque nous avons appelé la fonction .deploy(). Deux appels importants à signaler ici sont [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction), qui est la requête pour effectivement écrire notre contrat intelligent sur la chaîne Sepolia, et [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash) qui est une requête pour lire des informations sur notre transaction à partir de son hachage (un modèle typique lors de l'envoi de transactions). Pour en savoir plus sur l'envoi de transactions, consultez ce tutoriel sur l'[envoi de transactions à l'aide de Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

C'est tout pour la Partie 1 de ce tutoriel. Dans la [partie 2, nous interagirons avec notre contrat intelligent en frappant un NFT](/developers/tutorials/how-to-mint-an-nft/), et dans la [partie 3, nous vous montrerons comment voir votre NFT dans votre portefeuille Ethereum](/developers/tutorials/how-to-view-nft-in-metamask/) !
