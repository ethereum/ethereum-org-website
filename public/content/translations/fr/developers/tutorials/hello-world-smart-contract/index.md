---
title: "Un contrat intelligent « Hello World » pour les débutants"
description: "Tutoriel d'introduction à l'écriture et au déploiement d'un contrat intelligent simple sur Ethereum."
author: "elanh"
tags:
  [
    "solidité",
    "hardhat",
    "alchemy",
    "contrats intelligents",
    "déploiement"
  ]
skill: beginner
lang: fr
published: 2021-03-31
---

Si vous débutez dans le développement de la blockchain et que vous ne savez pas par où commencer, ou si vous voulez simplement comprendre comment déployer des contrats intelligents et interagir avec, ce guide est fait pour vous. Nous allons vous guider dans la création et le déploiement d'un contrat intelligent simple sur le réseau de test Sepolia en utilisant un portefeuille virtuel [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/) et [Alchemy](https://www.alchemy.com/eth) (ne vous inquiétez pas si vous ne comprenez pas encore ce que tout cela signifie, nous vous l'expliquerons).

Dans la [partie 2](https://docs.alchemy.com/docs/interacting-with-a-smart-contract) de ce tutoriel, nous verrons comment interagir avec notre contrat intelligent une fois qu'il sera déployé, et dans la [partie 3](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan), nous aborderons la façon de le publier sur Etherscan.

Si vous avez des questions à un moment ou à un autre, n'hésitez pas à nous contacter sur le [Discord d'Alchemy](https://discord.gg/gWuC7zB) !

## Étape 1 : Se connecter au réseau Ethereum {#step-1}

Il existe de nombreuses façons de faire des requêtes sur la chaîne Ethereum. Pour des raisons de simplicité, nous utiliserons un compte gratuit sur Alchemy, une plateforme de développement blockchain et une API qui nous permet de communiquer avec la chaîne Ethereum sans avoir à exécuter nos propres nœuds. La plateforme dispose également d'outils de développement pour la surveillance et l'analyse, dont nous tirerons parti dans ce tutoriel pour comprendre ce qui se passe en coulisses lors du déploiement de notre contrat intelligent. Si vous n'avez pas encore de compte Alchemy, [vous pouvez vous inscrire gratuitement ici](https://dashboard.alchemy.com/signup).

## Étape 2 : Créer votre application (et votre clé API) {#step-2}

Une fois votre compte Alchemy créé, vous pouvez générer une clé API en créant une application. Cela va nous permettre d'émettre des requêtes sur le réseau de test Sepolia. Si vous n'êtes pas familier avec les réseaux de test, consultez [cette page](/developers/docs/networks/).

1. Accédez à la page "Create new app" dans votre tableau de bord Alchemy en sélectionnant "Select an app" dans la barre de navigation et en cliquant sur "Create new app".

![Création de l'application Hello world](./hello-world-create-app.png)

2. Nommez votre application « Hello World », fournissez une courte description et choisissez un cas d'utilisation, par exemple, "Infra & Tooling." Ensuite, recherchez "Ethereum" et sélectionnez le réseau.

![Vue de création de l'application Hello world](./create-app-view-hello-world.png)

3. Cliquez sur "Next" pour continuer, puis sur “Create app” et c'est tout ! Votre application devrait apparaître dans le menu déroulant de la barre de navigation, avec une clé API que vous pouvez copier.

## Étape 3 : Créer un compte Ethereum (adresse) {#step-3}

Nous avons besoin d'un compte Ethereum pour effectuer des transactions (envoyer et recevoir). Pour ce tutoriel, nous allons utiliser MetaMask, un portefeuille virtuel intégré au navigateur, servant à gérer les adresses de votre compte Ethereum. En savoir plus sur les [transactions](/developers/docs/transactions/).

Vous pouvez télécharger MetaMask et créer gratuitement un compte Ethereum [ici](https://metamask.io/download). Lorsque vous créez un compte, ou si vous en avez déjà un, veillez à basculer sur le réseau de test "Sepolia" à l'aide du menu déroulant du réseau (afin de ne pas utiliser d'argent réel).

Si Sepolia n'est pas listé, allez dans le menu, puis dans « Advanced » et faites défiler vers le bas pour activer l'option "Show test networks". Dans le menu de sélection du réseau, choisissez l'onglet "Custom" pour trouver une liste de réseaux de test et sélectionnez "Sepolia."

![Exemple de MetaMask Sepolia](./metamask-sepolia-example.png)

## Étape 4 : Ajouter de l'ether depuis un faucet {#step-4}

Afin de déployer notre contrat intelligent sur le réseau de test, nous aurons besoin de faux ETH. Pour obtenir des ETH Sepolia, vous pouvez accéder à la page des [détails du réseau Sepolia](/developers/docs/networks/#sepolia) pour consulter une liste de différents faucets. Si l'un d'eux ne fonctionne pas, essayez-en un autre, car ils peuvent parfois être à sec. La réception de vos faux ETH peut prendre un certain temps en raison du trafic réseau. Vous devriez voir les ETH apparaître dans votre compte Metamask peu de temps après !

## Étape 5 : Vérifier votre solde {#step-5}

Pour vérifier notre solde, effectuons une requête [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) en utilisant l'[outil de composition d'Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Cela va renvoyer la quantité d'ETH dans notre portefeuille. Après avoir entré l'adresse de votre compte MetaMask et cliqué sur « Send Request », vous devriez voir une réponse comme celle-ci :

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **REMARQUE :** Ce résultat est en wei, et non en ETH. Le wei est utilisé comme la plus petite dénomination d'ether. La conversion de wei en ETH est la suivante : 1 ETH = 10<sup>18</sup> wei. Donc, si nous convertissons 0x2B5E3AF16B1880000 en décimal, nous obtenons 5\*10¹⁸, ce qui équivaut à 5 ETH.
>
> Ouf ! Notre fausse monnaie est bien là <Emoji text=":money_mouth_face:" size={1} />.

## Étape 6 : Initialiser notre projet {#step-6}

Pour commencer, nous allons devoir créer un dossier pour notre projet. Ouvrez votre ligne de commande et tapez :

```
mkdir hello-world
cd hello-world
```

Maintenant que nous sommes dans notre dossier de projet, nous allons utiliser `npm init` pour initialiser le projet. Si vous n'avez pas encore installé npm, suivez [ces instructions](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (nous aurons également besoin de Node.js, alors téléchargez-le aussi !).

```
npm init
```

La façon dont vous répondez aux questions d'installation n'a pas vraiment d'importance, voici comment nous avons procédé, à titre de référence :

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/.../.../.../hello-world/package.json:

{
  "name": "hello-world",
  "version": "1.0.0",
  "description": "hello world smart contract",
  "main": "index.js",
  "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Approuvez le fichier package.json et nous sommes prêts !

## Étape 7 : Télécharger [Hardhat](https://hardhat.org/getting-started/#overview) {#step-7}

Hardhat est un environnement de développement qui permet de compiler, déployer, tester et déboguer votre logiciel Ethereum. Il aide les développeurs à construire des contrats intelligents et des dApps localement avant de les déployer sur la chaîne en production.

Dans notre projet `hello-world`, exécutez :

```
npm install --save-dev hardhat
```

Consultez cette page pour plus de détails sur les [instructions d'installation](https://hardhat.org/getting-started/#overview).

## Étape 8 : Créer le projet Hardhat {#step-8}

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

👷 Welcome to Hardhat v2.0.11 👷‍?

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Cela générera pour nous un fichier `hardhat.config.js`, dans lequel nous spécifierons toute la configuration de notre projet (à l'étape 13).

## Étape 9 : Ajouter des dossiers de projet {#step-9}

Pour garder notre projet organisé, nous allons créer deux nouveaux dossiers. Naviguez vers le répertoire racine de votre projet dans votre invite de commande en ligne et tapez :

```
mkdir contracts
mkdir scripts
```

- `contracts/` est l'endroit où nous conserverons le fichier de code de notre contrat intelligent hello world.
- `scripts/` est l'endroit où nous conserverons les scripts pour déployer notre contrat et interagir avec lui.

## Étape 10 : Rédiger notre contrat {#step-10}

Vous vous demandez peut-être quand allons-nous enfin écrire du code ?? Eh bien, nous y voilà, à l'étape 10.

Ouvrez le projet hello-world dans votre éditeur de code favori (nous aimons [VSCode](https://code.visualstudio.com/)). Les contrats intelligents sont écrits dans un langage appelé Solidity que nous utiliserons pour écrire notre contrat intelligent HelloWorld.sol.

1. Accédez au dossier « contracts » et créez un nouveau fichier nommé HelloWorld.sol.
2. Vous trouverez ci-dessous un exemple de contrat intelligent Hello World de la Fondation Ethereum que nous utiliserons pour ce tutoriel. Copiez et collez le contenu ci-dessous dans votre fichier HelloWorld.sol, et assurez-vous de lire les commentaires pour comprendre ce que fait ce contrat :

```solidity
// Spécifie la version de Solidity, en utilisant le versionnage sémantique.
// En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// Définit un contrat nommé `HelloWorld`.
// Un contrat est un ensemble de fonctions et de données (son état). Une fois déployé, un contrat réside à une adresse spécifique sur la blockchain Ethereum. En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Déclare une variable d'état `message` de type `string`.
   // Les variables d'état sont des variables dont les valeurs sont stockées en permanence dans le stockage du contrat. Le mot-clé `public` rend les variables accessibles depuis l'extérieur d'un contrat et crée une fonction que d'autres contrats ou clients peuvent appeler pour accéder à la valeur.
   string public message;

   // Semblable à de nombreux langages orientés objet basés sur des classes, un constructeur est une fonction spéciale qui n'est exécutée qu'à la création du contrat.
   // Les constructeurs sont utilisés pour initialiser les données du contrat. En savoir plus :https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepte un argument de chaîne de caractères `initMessage` et définit la valeur dans la variable de stockage `message` du contrat).
      message = initMessage;
   }

   // Une fonction publique qui accepte un argument de chaîne de caractères et met à jour la variable de stockage `message`.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Il s'agit d'un contrat intelligent très simple qui stocke un message lors de sa création et qui peut être mis à jour en appelant la fonction `update`.

## Étape 11 : Connecter MetaMask et Alchemy à votre projet {#step-11}

Nous avons créé un portefeuille MetaMask, un compte Alchemy et rédigé notre contrat intelligent. Il est maintenant temps de connecter les trois.

Chaque transaction envoyée depuis votre portefeuille virtuel nécessite une signature en utilisant votre clé privée unique. Pour donner cette permission à notre programme, nous pouvons stocker en toute sécurité notre clé privée (et la clé API Alchemy) dans un fichier d'environnement.

> Pour en savoir plus sur l'envoi de transactions, consultez [ce tutoriel](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) sur l'envoi de transactions à l'aide de web3.

Premièrement, installez le paquet dotenv dans votre dossier de projet :

```
npm install dotenv --save
```

Ensuite, créez un fichier `.env` à la racine de notre projet, et ajoutez-y votre clé privée MetaMask et votre URL d'API HTTP Alchemy.

- Suivez [ces instructions](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) pour exporter votre clé privée
- Voir ci-dessous pour obtenir l'URL de l'API HTTP Alchemy

![obtenir la clé api alchemy](./get-alchemy-api-key.png)

Copiez l'URL de l'API Alchemy

Votre `.env` devrait ressembler à ceci :

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Pour les relier à notre code, nous ferons référence à ces variables dans notre fichier `hardhat.config.js` à l'étape 13.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Ne commitez pas le fichier <code>.env</code> ! Veillez à ne jamais partager ou exposer votre fichier <code>.env</code> avec quiconque, car vous compromettez vos secrets en le faisant. Si vous utilisez un système de contrôle de version, ajoutez votre fichier <code>.env</code> à un fichier <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Étape 12 : Installer Ethers.js {#step-12-install-ethersjs}

Ethers.js est une bibliothèque qui facilite l'interaction et l'envoi de requêtes à Ethereum en encapsulant les [méthodes JSON-RPC standard](/developers/docs/apis/json-rpc/) dans des méthodes plus conviviales.

Hardhat facilite grandement l'intégration de [plugins](https://hardhat.org/plugins/) pour des outils supplémentaires et des fonctionnalités étendues. Nous allons profiter du [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) pour le déploiement du contrat ([Ethers.js](https://github.com/ethers-io/ethers.js/) a des méthodes de déploiement de contrat très propres).

Dans votre dossier de projet, tapez :

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Nous aurons également besoin d'ethers dans notre `hardhat.config.js` à l'étape suivante.

## Étape 13 : Mettre à jour hardhat.config.js {#step-13-update-hardhatconfigjs}

À ce stade, nous avons ajouté plusieurs dépendances et plugins. Nous devons maintenant mettre à jour `hardhat.config.js` pour que notre projet les reconnaisse.

Mettez à jour votre `hardhat.config.js` pour qu'il ressemble à ceci :

```
require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: "0.7.3",
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

## Étape 14 : Compiler notre contrat {#step-14-compile-our-contracts}

Pour s’assurer à ce stade que tout fonctionne, compilons notre contrat. La tâche `compile` est l'une des tâches intégrées de hardhat.

À partir de la ligne de commande, exécutez :

```
npx hardhat compile
```

Vous pourriez voir un avertissement du type `SPDX license identifier not provided in source file` (identifiant de licence SDPX non fourni dans le fichier source), mais nul besoin de vous inquiéter — espérons que tout le reste fonctionne ! Sinon, vous pouvez toujours envoyer un message sur le [Discord d'Alchemy](https://discord.gg/u72VCg3).

## Étape 15 : Rédiger notre script de déploiement {#step-15-write-our-deploy-scripts}

Maintenant que notre contrat est codé et que notre fichier de configuration est bon, il est temps d’écrire notre script de déploiement pour notre contrat.

Naviguez vers le dossier `scripts/` et créez un nouveau fichier appelé `deploy.js`, en y ajoutant le contenu suivant :

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Lancer le déploiement, renvoyant une promesse qui se résout en un objet de contrat
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contrat déployé à l'adresse :", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat explique très bien ce que fait chacune de ces lignes de code dans son [tutoriel sur les contrats](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), nous avons repris leurs explications ici.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

Une `ContractFactory` dans ethers.js est une abstraction utilisée pour déployer de nouveaux contrats intelligents. Ainsi, `HelloWorld` est ici une usine pour des exemples de notre contrat Hello world. Lors de l'utilisation du plugin `hardhat-ethers`, les instances de `ContractFactory` et de `Contract` sont connectées au premier signataire par défaut.

```
const hello_world = await HelloWorld.deploy();
```

L'appel de `deploy()` sur un `ContractFactory` lancera le déploiement et renverra une `Promise` qui se résout en un `Contract`. C'est l'objet qui possède une méthode pour chacune des fonctions de notre contrat intelligent.

## Étape 16 : Déployer notre contrat {#step-16-deploy-our-contract}

Nous sommes enfin prêts à déployer notre contrat intelligent ! Naviguez vers la ligne de commande et exécutez :

```
npx hardhat run scripts/deploy.js --network sepolia
```

Vous devriez maintenant voir quelque chose comme :

```
Contrat déployé à l'adresse : 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Si nous allons sur l'[Etherscan Sepolia](https://sepolia.etherscan.io/) et que nous recherchons l'adresse de notre contrat, nous devrions être en mesure de voir qu'il a été déployé avec succès. La transaction ressemblera à quelque chose comme :

![Contrat Etherscan](./etherscan-contract.png)

L'adresse `From` devrait correspondre à l'adresse de votre compte MetaMask et l'adresse `To` indiquera « Contract Creation » mais si nous cliquons sur la transaction, nous verrons l'adresse de notre contrat dans le champ `To` :

![Transaction Etherscan](./etherscan-transaction.png)

Félicitations ! Vous venez de déployer un contrat intelligent sur la chaîne Ethereum 🎉

Pour comprendre ce qui se passe en coulisses, allons dans l'onglet Explorer de notre [tableau de bord Alchemy](https://dashboard.alchemyapi.io/explorer). Si vous disposez de plusieurs applications Alchemy, assurez-vous de filtrer par application et sélectionnez « Hello World ».
![Explorateur Hello World](./hello-world-explorer.png)

Vous verrez ici un certain nombre d'appels JSON-RPC que Hardhat/Ethers ont effectués en coulisses pour nous lorsque nous avons appelé la fonction `.deploy()`. Deux appels importants à mentionner ici sont [`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction), qui est la requête pour réellement écrire notre contrat sur la chaîne Sepolia, et [`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash) qui est une requête pour lire des informations sur notre transaction en fonction du hachage (un modèle typique lors
des transactions). Pour en savoir plus sur l'envoi de transactions, consultez ce tutoriel sur l'[envoi de transactions à l'aide de Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)

C'est tout pour la première partie de ce tutoriel. Dans la deuxième partie, nous allons [interagir avec notre contrat intelligent](https://www.alchemy.com/docs/interacting-with-a-smart-contract) en mettant à jour notre message initial et, dans la troisième partie, nous [publierons notre contrat intelligent sur Etherscan](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) afin que tout le monde sache comment interagir avec lui.

**Vous voulez en savoir plus sur Alchemy ? Consultez notre [site web](https://www.alchemy.com/eth). Ne ratez plus jamais une mise à jour ? Inscrivez-vous à notre newsletter [ici](https://www.alchemy.com/newsletter) ! Assurez-vous également de rejoindre notre [Discord](https://discord.gg/u72VCg3).**.
