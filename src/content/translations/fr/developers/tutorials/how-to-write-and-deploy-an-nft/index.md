---
title: Comment écrire & déployer un NFT (Partie 1/3 du tutoriel NFT)
description: Ce tutoriel est la première partie de la série sur les NFT et vous guidera pas-à-pas sur la façon d'écrire et de déployer un contrat intelligent de jeton non fongible (jeton ERC-721) avec Ethereum et IPFS (Inter Planetary File System).
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

Grâce aux NFT, la blockchain a été découverte par le grand public. C'est l'occasion rêvée de comprendre cet engouement en publiant votre propre NFT (jeton ERC-721) sur la blockchain Ethereum !

Alchemy est extrêmement fier d'alimenter les plus grands noms du monde des NFT, notamment Makersplace (qui a récemment établi un record de ventes d'œuvres d'art numériques chez Christie's pour 69 millions de dollars), Dapper Labs (créateurs de NBA Top Shot & Crypto Kitties), OpenSea (la plus grande place de marché NFT du monde), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable, et bien d'autres.

Dans ce tutoriel, nous allons créer et déployer un contrat intelligent ERC-721 sur le réseau de test Ropsten à l'aide de [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) et [Alchemy](https://alchemy.com/signup/eth) (ne vous inquiétez pas si vous ne comprenez pas encore ce que cela signifie - nous vous l'expliquerons !).

Dans la deuxième partie de ce tutoriel, nous verrons comment utiliser notre contract intelligent pour créer un NFT, et dans la troisième partie, nous expliquerons comment visualiser votre NFT sur MetaMask.

Bien sûr, si vous avez des questions à n'importe quel moment, n'hésitez pas à contacter [le discord d'Alchemy](https://discord.gg/gWuC7zB) ou consultez [la documentation de l'API NFT d'Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api) !

## Étape 1 : Se connecter au réseau Ethereum {#connect-to-ethereum}

Il existe de nombreuses façons d'émettre des requêtes sur la blockchain Ethereum, mais pour faciliter les choses, nous utiliserons un compte gratuit sur [Alchemy](https://alchemy.com/signup/eth), une plateforme pour développeurs de blockchain et une API nous permettant de communiquer avec la chaîne Ethereum sans avoir à exécuter nos propres nœuds.

Dans ce tutoriel, nous allons également tirer parti des outils de développement d'Alchemy pour le suivi et l'analyse afin de comprendre ce qui se passe sous le capot concernant le déploiement de notre contract intelligent. Si vous n'avez pas encore de compte Alchemy, vous pouvez vous inscrire gratuitement [ici](https://alchemy.com/signup/eth).

## Étape 2 : Créer votre application (et votre clé d'API) {#make-api-key}

Une fois que vous avez créé un compte Alchemy, vous pouvez générer une clé d'API en créant une application. Cela va nous permettre d'émettre des requêtes sur le réseau de test Ropsten. Consultez [ce guide](https://docs.alchemyapi.io/guides/choosing-a-network), si vous voulez en apprendre plus sur les réseaux de test.

1. Accédez à la page « Create App » dans votre Tableau de bord Alchemy, en survolant « Apps » dans la barre de navigation et en cliquant sur « Create App »

![Créez votre application](./create-your-app.png)

2. Nommez votre application (nous avons choisi « Mon premier NFT ! »), donnez une brève description, sélectionnez « Staging » pour l'environnement (utilisé pour la comptabilité de votre application), et choisissez « Ropsten » pour votre réseau.

![Configurez et publiez votre application](./configure-and-publish-your-app.png)

3. Cliquez sur « Create App » et voilà ! Votre application devrait apparaître dans le tableau ci-dessous.

## Étape 3 : Créer un compte Ethereum (une adresse) {#create-eth-address}

Nous avons besoin d'un compte Ethereum pour effectuer des transactions (envoyer et recevoir). Pour ce tutoriel, nous utiliserons MetaMask, un portefeuille virtuel utilisable dans le navigateur servant à gérer les adresses Ethereum. Si vous voulez en savoir plus sur le fonctionnement des transactions sur Ethereum, consultez [cette page](/developers/docs/transactions/) de la fondation Ethereum.

Vous pouvez télécharger et créer un compte MetaMask gratuitement [ici](https://metamask.io/download.html). Lorsque vous créez un compte, ou si vous en avez déjà un, assurez-vous de basculer sur « Réseau de test Ropsten » en haut à droite (afin de ne pas utiliser d'argent réel).

![Définir Ropsten comme votre réseau](./metamask-ropsten.png)

## Étape 4 : Ajouter des ethers depuis un faucet {#step-4-add-ether-from-a-faucet}

Afin de déployer notre contrat intelligent sur le réseau de test, nous aurons besoin de faux ETH. Pour obtenir des ETH, vous pouvez vous rendre sur [FaucETH](https://fauceth.komputing.org) et renseigner votre adresse de compte Ropsten, cliquez sur « Request funds », puis sélectionnez « Ethereum Testnet Ropsten » dans la liste déroulante et enfin cliquez à nouveau sur le bouton « Request funds ». Vous devriez voir les ETH sur votre compte MetaMask rapidement après !

## Étape 5 : Vérifiez votre solde {#check-balance}

Pour vérifier notre solde, faisons une requête [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) en utilisant [l'outil de composition d'Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Cela va renvoyer la quantité d'ETH dans notre portefeuille. Après avoir entré l'adresse de votre compte MetaMask et cliqué sur « Send Request », vous devriez voir une réponse comme celle-ci :

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

**NOTE : **Ce résultat est en wei, et non en ETH. Le wei est utilisé comme la plus petite dénomination d'ether. La conversion entre wei et ETH est 1 eth = 10<sup>18</sup> wei. Donc si on convertit 0xde0b6b3a7640000 en décimale, nous obtenons 1\*10<sup>18</sup> wei, ce qui équivaut à 1 ETH.

Ouf ! Notre faux argent est bien là.

## Étape 6 : Initialisons notre projet {#initialize-project}

Pour commencer, nous allons devoir créer un dossier pour notre projet. Ouvrez votre ligne de commande et tapez :

    mkdir my-nft
    cd my-nft

Maintenant que nous sommes dans le dossier de notre projet, nous allons utiliser npm init pour initialiser le projet. Si vous n'avez pas encore installé npm, suivez [ces instructions](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (nous allons également avoir besoin de [Node.js](https://nodejs.org/en/download/); donc téléchargez le aussi !).

    npm init

La manière dont vous répondez à ces questions d'installation à peu d'importance, pour référence, voici comment nous avons répondu :

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

Approuvez le package.json, et nous sommes prêts à démarrer !

## Étape 7 : Installer [Hardhat](https://hardhat.org/getting-started/#overview) {#install-hardhat}

Hardat est un environnement de développement qui permet de compiler, déployer, tester et débugger vos logiciels Ethereum. Il aide les développeurs à construire des contrats intelligents et des dapps localement avant de les déployer sur la chaîne en production.

Dans notre projet my-nft, exécutez :

    npm install --save-dev hardhat

Consultez cette page pour plus de détails sur [les instructions d'installation](https://hardhat.org/getting-started/#overview).

## Étape 8 : Créer un projet Hardhat {#create-hardhat-project}

Dans notre dossier de projet, exécutez :

    npx hardhat

Vous devriez maintenant voir un message de bienvenue ainsi qu'une option pour sélectionner ce que vous voulez faire. Séléctionnez « Create an empty hardhat.config.js » :

    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Bienvenue dans Hardhat v2.0.11 👷‍
    ? Que voulez vous faire ? …
    Create a sample project
    ❯ Create an empty hardhat.config.js
    Quit

Cela va générer un fichier 'hardhar.config.js' dans lequel nous allons spécifier tous les paramètres de notre projet (à l'étape 13).

## Étape 9 : Ajouter les dossiers du projet {#add-project-folders}

Pour garder notre projet organisé, nous allons créer deux nouveaux dossiers. Naviguez vers le répertoire racine de votre projet dans votre invite de commande en ligne et tapez :

    mkdir contracts
    mkdir scripts

- contracts/ est l'endroit où nous garderons notre code de contrat intelligent NFT

- scripts/ est l'endroit où nous garderons les scripts pour déployer et interagir avec notre contrat intelligent

## Étape 10 : Écrire notre contrat {#write-contract}

Maintenant que notre environnement est configuré, passons aux choses plus excitantes : _écrire le code de notre contrat intelligent !_

Ouvrez le projet my-nft dans votre éditeur de code favori (nous apprécions [VSCode](https://code.visualstudio.com/)). Les contrats intelligents sont écrits dans un langage appelé Solidity, qui est celui que nous allons utiliser pour écrire notre contrat intelligent MyNFT.sol.

1. Naviguez vers le dossier `contracts` et créez un nouveau fichier appelé MyNFT.sol

2. Ci-dessous vous trouverez le code de notre contrat intelligent NFT, que nous avons basé sur l'implémentation ERC-721 de la bibliothèque [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721). Copiez et collez le contenu ci-dessous dans votre fichier MyNFT.sol.

   ```solidity
   //Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
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

3. Comme nous héritons des classes de la bibliothèque de contrats OpenZeppelin, dans votre ligne de commande, exécutez `npm install @openzeppelin/contracts` pour installer la bibliothèque dans notre dossier.

Que _fait_ exactement ce code ? Décortiquons le ligne par ligne.

En haut de notre contrat intelligent, nous importons trois classes des contrats intelligents d'[OpenZeppelin](https://openzeppelin.com/) :

- @openzeppelin/contracts/token/ERC721/ERC721.sol contient l'implémentation de la norme ERC-721, dont notre contrat intelligent NFT héritera. (Pour être un NFT valide, votre contrat intelligent doit implémenter toutes les méthodes de la norme ERC-721.) Pour en savoir plus sur les fonctions héritées d'ERC-721, consultez la définition de l'interface [ici](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/utils/Counters.sol fournit des compteurs qui ne peuvent être incrémentés ou décrémentés que de un. Notre contrat intelligent utilise des compteurs pour garder une trace du nombre total de NFT créés et définir l'ID unique de votre nouveau NFT. (Chaque NFT créé à l'aide d'un contrat intelligent doit se voir attribuer un ID unique - ici notre ID unique est simplement déterminé par le nombre total de NFT existants. Par exemple, le premier NFT que nous créons avec notre contrat intelligent a un ID de « 1 », le deuxième NFT a un ID de « 2 », etc.)

- @openzeppelin/contracts/access/Ownable.sol met en place [un contrôle d'accès](https://docs.openzeppelin.com/contracts/3.x/access-control) sur notre contrat intelligent, de sorte que seul le propriétaire du contrat intelligent (vous) puisse créer des NFT. (Remarque : l'inclusion du contrôle d'accès est entièrement une préférence. Si vous souhaitez que n'importe qui puisse créer un NFT en utilisant votre contrat intelligent, supprimez le mot « Ownable » à la ligne 10 et « onlyOwner » à la ligne 17.)

Après nos déclarations d'importation, nous obtenons notre contrat intelligent NFT personnalisé, qui est étonnamment court - il ne contient qu'un compteur, un constructeur et une seule fonction ! Ceci grâce à nos contrats OpenZeppelin hérités, qui mettent en œuvre la plupart des méthodes dont nous avons besoin pour créer un NFT, comme `ownerOf` qui renvoie le propriétaire du NFT, et `transferFrom`, qui transfère la propriété du NFT d'un compte à un autre.

Dans notre constructeur ERC-721, vous remarquerez que nous passons deux chaînes de caractères, « MyNFT » et « NFT ». La première variable est le nom de notre contrat intelligent, et le second est son symbole. Vous pouvez nommer chacune de ces variables comme vous le souhaitez !

Nous avons enfin notre fonction `mintNFT(address recipient, string memory tokenURI)` qui nous permet de créer un NFT ! Vous remarquerez que cette fonction prend en paramètre deux variables :

- `address recipient` spécifie l'addresse qui recevra votre NFT fraîchement créé

- `string memory tokenURI` est une chaîne de caractères qui doit se résoudre en un document JSON décrivant les métadonnées du NFT. Les métadonnées d'un NFT sont ce qui lui donne vie, lui permettant d'avoir des propriétés configurables, comme un nom, une description, une image et d'autres attributs. Dans la deuxième partie de ce tutoriel, nous décrirons comment configurer ces métadonnées.

`mintNFT` appelle certaines méthodes de la bibliothèque ERC-721 héritée, et renvoie finalement un nombre qui représente l'ID du NFT fraîchement créé.

## Étape 11 : Connecter MetaMask & Alchemy à votre projet {#connect-metamask-and-alchemy}

Maintenant que nous avons créé un portefeuille MetaMask, un compte Alchemy et écrit notre contrat intelligent, il est temps de connecter les trois.

Chaque transaction envoyée depuis votre portefeuille virtuel nécessite une signature en utilisant votre clé privée unique. Pour donner cette permission à notre programme, nous pouvons stocker en toute sécurité notre clé privée (et la clé API Alchemy) dans un fichier d'environnement.

Pour en savoir plus sur l'envoi de transactions, consultez [ce tutoriel](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) sur l'envoi de transactions avec web3.

Premièrement, installez le paquet dotenv dans votre dossier de projet:

    npm install dotenv --save

Ensuite, créez un fichier `.env` dans le dossier racine de notre projet, et ajoutez-y votre clé privée MetaMask et l'URL de l'API HTTP Alchemy.

- Suivez [ces instructions](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) pour exporter votre clé privée de MetaMask

- Voir ci-dessous pour obtenir l'URL de l'API HTTP Alchemy et la copier dans votre presse-papiers

![Copiez l'URL de votre API Alchemy](./copy-alchemy-api-url.gif)

Votre fichier `.env` devrait ressembler à ceci :

    API_URL="https://eth-ropsten.alchemyapi.io/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"

Pour les relier à notre code, nous ferons référence à ces variables dans notre fichier hardhat.config.js à l'étape 13.

<InfoBanner isWarning={true}>
Ne propagez pas le fichier <code>.env</code> ! Veillez à ne jamais partager ou exposer votre fichier <code>.env</code> avec quiconque car vous compromettez vos secrets en le faisant. Si vous utilisez le contrôle de version, ajoutez votre <code>.env</code> à un fichier <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</InfoBanner>

## Étape 12 : Installer Ethers.js {#install-ethers}

Ethers.js est une bibliothèque qui permet facilement d'interagir et de faire des requêtes pour Ethereum en conditionnant les méthodes [standard JSON-RPC](/developers/docs/apis/json-rpc/) avec des méthodes plus conviviales d'utilisation.

Hardhat facilite grandement l'intégration de [Plugins](https://hardhat.org/plugins/) pour des outils supplémentaires et des fonctionnalités étendues. Nous profiterons du [plugin Ethers](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html) pour le déploiement de contrats ([Ethers.js](https://github.com/ethers-io/ethers.js/) dispose de quelques méthodes très claires de déploiement de contrat).

Dans votre dossier de projet tapez :

    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0

Nous aurons également besoin d'ethers dans notre hardhat.config.js à l'étape suivante.

## Étape 13 : Mettre à jour hardhat.config.js {#update-hardhat-config}

A ce stade, nous avons ajouté plusieurs dépendances et plugins. Nous devons maintenant mettre à jour hardhat.config.js pour que notre projet les reconnaisse.

Mettez à jour votre hardhat.config.js pour qu'il ressemble à ceci :

    /**
    * @type import('hardhat/config').HardhatUserConfig
    */
    require('dotenv').config();
    require("@nomiclabs/hardhat-ethers");
    const { API_URL, PRIVATE_KEY } = process.env;
    module.exports = {
       solidity: "0.8.1",
       defaultNetwork: "ropsten",
       networks: {
          hardhat: {},
          ropsten: {
             url: API_URL,
             accounts: [`0x${PRIVATE_KEY}`]
          }
       },
    }

## Étape 14 : Compiler notre contrat {#compile-contract}

Pour s’assurer à ce stade que tout fonctionne, compilons notre contrat. La tâche « compile » est une des tâches intégrée à hardhat.

À partir de la ligne de commande, exécutez :

    npx hardhat compile

Vous pourriez voir un avertissement du type « SPDX license identifier not provided in source file », mais nul besoin de vous inquiéter — espérons que tout le reste fonctionne ! Si ce n'est pas le cas, vous pouvez toujours envoyer un message dans le Discord [Alchemy](https://discord.gg/u72VCg3).

## Étape 15 : Écrire notre script de déploiement {#write-deploy}

Maintenant que notre contrat est codé et que notre fichier de configuration est bon, il est temps d’écrire notre script de déploiement pour notre contrat.

Naviguez vers le dossier `scripts/` et créez un nouveau fichier appelé `deploy.js`, en y ajoutant le contenu suivant :

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Start deployment, returning a promise that resolves to a contract object
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

Hardhat fait un travail remarquable en expliquant ce que fait chacune de ces lignes de code dans leur [tutoriel sur les contrats](https://hardhat.org/tutorial/testing-contracts.html#writing-tests). Nous avons repris leurs explications ici.

    const MyNFT = await ethers.getContractFactory("MyNFT");

Un ContractFactory dans ethers.js est une abstraction utilisée pour déployer de nouveaux contrats intelligents, donc MyNFT est ici une usine pour les instances de notre contrat NFT. Lors de l'utilisation du plugin « hardhat-ethers », les instances de ContractFactory et de Contract sont connectées au premier signataire par défaut.

    const myNFT = await MyNFT.deploy();

L'appel de deploy() sur un ContractFactory lancera le déploiement, et renverra une « Promise » qui se résout en un Contrat. C'est l'objet qui possède une méthode pour chacune des fonctions de notre contrat intelligent.

## Étape 16 : Déployer notre contrat {#deploy-contract}

Nous sommes enfin prêts à déployer notre contrat intelligent ! Naviguez à nouveau vers la racine du répertoire de votre projet, et dans la ligne de commande, exécutez :

    npx hardhat --network ropsten run scripts/deploy.js

Vous devriez maintenant voir quelque chose comme :

    Contract deployed to address: 0x81c587EB0fE773404c42c1d2666b5f557C470eED

Si nous allons sur le [Ropsten etherscan](https://ropsten.etherscan.io/) et que nous recherchons l'adresse de notre contrat, nous devrions constater qu'il a été déployé avec succès. Si vous ne pouvez pas le voir immédiatement, veuillez patienter, car cela peut prendre un certain temps. La transaction ressemblera à quelque chose comme :

![Consultez votre adresse de transaction sur Etherscan](./etherscan-transaction.png)

L'adresse « From » doit correspondre à l'adresse de votre compte MetaMask et l'adresse « To » doit indiquer « Création de contrat ». Si nous cliquons sur la transaction, nous verrons l'adresse de notre contrat dans le champ « To » :

![Consultez l'adresse de votre contrat sur Etherscan](./etherscan-contract.png)

Super ! Vous venez de déployer votre contrat intelligent NFT sur la chaîne Ethereum !

Pour comprendre ce qui se passe sous le capot, naviguons dans l'onglet Explorer de notre [tableau de bord Alchemy](https://dashboard.alchemyapi.io/explorer). Si vous avez plusieurs applications Alchemy, veillez à filtrer par application et à sélectionner « MyNFT ».

![Visualisez les appels effectués « sous le capot » avec le tableau de bord Explorer d'Alchemy](./alchemy-explorer.png)

Vous verrez ici un certain nombre d'appels JSON-RPC qu'Hardhat/Ethers ont effectué sous le capot pour nous lorsque nous avons appelé la fonction .deploy(). Les deux plus importants sont [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction), qui est la requête pour écrire réellement notre contrat intelligent sur la chaîne Ropsten, et [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash) qui est une requête pour lire des informations sur notre transaction étant donné le hash (un modèle type lors de l'envoi de transactions). Pour en savoir plus sur l'envoi de transactions, consultez ce tutoriel sur [l'envoi de transactions à l'aide de Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

C'est tout pour la Partie 1 de ce tutoriel. Dans la [Partie 2, nous interagirons réellement avec notre contrat intelligent en créant notre NFT](/developers/tutorials/how-to-mint-an-nft/), et dans la [Partie 3, nous vous montrerons comment visualiser votre NFT dans votre portefeuille Ethereum](/developers/tutorials/how-to-view-nft-in-metamask/) !
