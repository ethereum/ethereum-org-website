---
title: "Un contrat intelligent « Hello World » pour les débutants - Fullstack"
description: "Tutoriel d'introduction à l'écriture et au déploiement d'un contrat intelligent simple sur Ethereum."
author: "nstrike2"
tags:
  [
    "solidité",
    "hardhat",
    "alchemy",
    "contrats intelligents",
    "déploiement",
    "Explorateur de bloc",
    "frontend",
    "transactions"
  ]
skill: beginner
lang: fr
published: 2021-10-25
---

Ce guide s'adresse à vous si vous êtes novice en matière de développement blockchain et que vous ne savez pas par où commencer ou comment déployer et interagir avec les contrats intelligents. Nous allons vous guider dans la création et le déploiement d'un contrat intelligent simple sur le réseau de test Goerli en utilisant [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org), et [Alchemy](https://alchemy.com/eth).

Vous aurez besoin d'un compte Alchemy pour achever ce tutoriel. [Inscrivez-vous pour un compte gratuit](https://www.alchemy.com/).

Si vous avez des questions à un moment ou à un autre, n'hésitez pas à nous contacter sur le [Discord d'Alchemy](https://discord.gg/gWuC7zB) !

## Partie 1 - Créer et déployer votre contrat intelligent avec Hardhat {#part-1}

### Se connecter au réseau Ethereum {#connect-to-the-ethereum-network}

Il existe de nombreuses façons de faire des requêtes sur la chaîne Ethereum. Pour plus de simplicité, nous allons utiliser un compte gratuit sur Alchemy, une plateforme de développement blockchain et une API qui nous permet de communiquer avec la chaîne Ethereum sans avoir à exécuter notre propre nœud. Alchemy dispose également d'outils de développement pour la surveillance et l'analyse, dont nous allons tirer parti dans ce tutoriel, pour comprendre ce qui se passe sous le capot dans le déploiement de notre contrat intelligent.

### Créez votre application et votre clé API {#create-your-app-and-api-key}

Une fois votre compte Alchemy créé, vous pouvez générer une clé API en créant une application. Cela va vous permettre d'émettre des requêtes sur le réseau de test Goerli. Si vous n'êtes pas familier avec les réseaux de test, vous pouvez [lire le guide d'Alchemy pour choisir un réseau](https://www.alchemy.com/docs/choosing-a-web3-network).

Sur le tableau de bord Alchemy, trouvez le menu déroulant **Apps** dans la barre de navigation et cliquez sur **Create App**.

![Création de l'application Hello world](./hello-world-create-app.png)

Donnez à votre application le nom « _Hello World_ » et écrivez une courte description. Sélectionnez **Staging** comme environnement et **Goerli** comme réseau.

![Vue de création de l'application Hello world](./create-app-view-hello-world.png)

_Note : assurez-vous de sélectionner **Goerli**, sinon ce tutoriel ne fonctionnera pas._

Cliquez sur **Créer une application**. Votre application apparaîtra dans le tableau ci-dessous.

### Créer un compte Ethereum {#create-an-ethereum-account}

Vous avez besoin d'un compte Ethereum pour envoyer et recevoir des transactions. Nous utiliserons MetaMask, un portefeuille virtuel intégré au navigateur permettant aux utilisateurs de gérer l'adresse de leur compte Ethereum.

Vous pouvez télécharger et créer un compte MetaMask gratuitement [ici](https://metamask.io/download). Lorsque vous créez un compte, ou si vous en avez déjà un, assurez-vous de basculer sur le « Réseau de test Goerli » en haut à droite (afin de ne pas utiliser d'argent réel).

### Étape 4 : Ajouter de l'ether à partir d'un robinet {#step-4-add-ether-from-a-faucet}

Afin de déployer votre contrat intelligent sur le réseau de test, vous aurez besoin de faux ETH. Pour obtenir de l'ETH sur le réseau Goerli, rendez-vous sur un robinet Goerli et entrez l'adresse de votre compte Goerli. Notez que les robinets Goerli peuvent avoir quelques difficultés de fonctionnement ces derniers temps - consultez la [page des réseaux de test](/developers/docs/networks/#goerli) pour une liste d'options à essayer :

_Note : en raison de la congestion du réseau, cela peut prendre un certain temps._
``

### Étape 5 : Vérifiez votre solde {#step-5-check-your-balance}

Pour vérifier que les ETH sont bien dans votre portefeuille, nous allons effectuer une requête [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) en utilisant l'[outil Composer d'Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Cela va renvoyer la quantité d'ETH dans notre portefeuille. Pour en savoir plus, consultez le [court tutoriel d'Alchemy sur la manière d'utiliser l'outil Composer](https://youtu.be/r6sjRxBZJuU).

Saisissez l'adresse de votre compte MetaMask et cliquez sur **Envoyer la requête**. Vous verrez une réponse qui ressemble à l'extrait de code ci-dessous.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _Note : Ce résultat est en wei, pas en ETH. Le wei est utilisé comme la plus petite dénomination d'ether._

Ouf ! Notre faux argent est bien là.

### Étape 6 : Initialiser notre projet {#step-6-initialize-our-project}

Tout d'abord, nous devons créer un dossier pour notre projet. Accédez à votre ligne de commande et entrez ce qui suit.

```
mkdir hello-world
cd hello-world
```

Maintenant que nous sommes dans notre dossier de projet, nous allons utiliser `npm init` pour initialiser le projet.

> Si vous n'avez pas encore installé npm, suivez [ces instructions pour installer Node.js et npm](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm).

Pour les besoins de ce tutoriel, peu importe comment vous répondez aux questions d'initialisation. Voici comment nous l'avons fait à titre de référence :

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

### Étape 7 : Télécharger Hardhat {#step-7-download-hardhat}

Hardhat est un environnement de développement qui permet de compiler, déployer, tester et déboguer votre logiciel Ethereum. Il aide les développeurs à construire des contrats intelligents et des dApps localement avant de les déployer sur la chaîne en production.

Dans notre projet `hello-world`, exécutez :

```
npm install --save-dev hardhat
```

Consultez cette page pour plus de détails sur les [instructions d'installation](https://hardhat.org/getting-started/#overview).

### Étape 8 : Créer un projet Hardhat {#step-8-create-hardhat-project}

Dans le dossier de notre projet `hello-world`, exécutez :

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

Que voulez-vous faire ? …
Créer un projet d'exemple
❯ Créer un fichier hardhat.config.js vide
Quitter
```

Cela générera un fichier `hardhat.config.js` dans le projet. Nous l'utiliserons plus tard dans le tutoriel pour spécifier la configuration de notre projet.

### Étape 9 : Ajouter les dossiers du projet {#step-9-add-project-folders}

Pour garder le projet organisé, créons deux nouveaux dossiers. Dans la ligne de commande, naviguez vers le répertoire racine de votre projet hello-world et tapez :

```
mkdir contracts
mkdir scripts
```

- `contracts/` est l'endroit où nous conserverons le fichier de code de notre contrat intelligent hello world.
- `scripts/` est l'endroit où nous conserverons les scripts pour déployer notre contrat et interagir avec lui.

### Étape 10 : Écrire notre contrat {#step-10-write-our-contract}

Vous vous demandez peut-être : quand allons-nous écrire du code ? C'est maintenant !

Ouvrez le projet hello-world dans votre éditeur préféré. Les contrats intelligents sont le plus souvent écrits en Solidity, que nous utiliserons pour écrire notre contrat intelligent.‌

1. Naviguez vers le dossier `contracts` et créez un nouveau fichier appelé `HelloWorld.sol`
2. Ci-dessous se trouve un exemple de contrat intelligent Hello World que nous utiliserons pour ce tutoriel. Copiez le contenu ci-dessous dans le fichier `HelloWorld.sol`.

_Note : Assurez-vous de lire les commentaires pour comprendre ce que fait ce contrat._

```
// Spécifie la version de Solidity, en utilisant le versionnage sémantique.
// En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Définit un contrat nommé `HelloWorld`.
// Un contrat est une collection de fonctions et de données (son état). Une fois déployé, un contrat réside à une adresse spécifique sur la blockchain Ethereum. En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Émis lorsque la fonction de mise à jour est appelée
   //Les événements de contrat intelligent sont un moyen pour votre contrat de communiquer que quelque chose s'est passé sur la blockchain à votre interface d'application, qui peut « écouter » certains événements et prendre des mesures lorsqu'ils se produisent.
   event UpdatedMessages(string oldStr, string newStr);

   // Déclare une variable d'état `message` de type `string`.
   // Les variables d'état sont des variables dont les valeurs sont stockées en permanence dans le stockage du contrat. Le mot-clé `public` rend les variables accessibles depuis l'extérieur d'un contrat et crée une fonction que d'autres contrats ou clients peuvent appeler pour accéder à la valeur.
   string public message;

   // Semblable à de nombreux langages orientés objet basés sur les classes, un constructeur est une fonction spéciale qui n'est exécutée qu'à la création du contrat.
   // Les constructeurs sont utilisés pour initialiser les données du contrat. En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepte un argument de chaîne `initMessage` et définit la valeur dans la variable de stockage `message` du contrat).
      message = initMessage;
   }

   // Une fonction publique qui accepte un argument de chaîne et met à jour la variable de stockage `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Il s'agit d'un contrat intelligent basique qui stocke un message lors de sa création. Il peut être mis à jour en appelant la fonction `update`.

### Étape 11 : Connecter MetaMask et Alchemy à votre projet {#step-11-connect-metamask-alchemy-to-your-project}

Nous avons créé un portefeuille MetaMask, un compte Alchemy et rédigé notre contrat intelligent. Il est maintenant temps de connecter les trois.

Chaque transaction envoyée depuis votre portefeuille nécessite une signature à l'aide de votre clé privée unique. Pour fournir cette autorisation à notre programme, nous pouvons stocker en toute sécurité notre clé privée dans un fichier d'environnement. Nous y stockerons également une clé API pour Alchemy.

> Pour en savoir plus sur l'envoi de transactions, consultez [ce tutoriel](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) sur l'envoi de transactions à l'aide de web3.

Premièrement, installez le paquet dotenv dans votre dossier de projet :

```
npm install dotenv --save
```

Ensuite, créez un fichier `.env` dans le répertoire racine du projet. Ajoutez-y votre clé privée MetaMask et l'URL API HTTP d'Alchemy.

Votre fichier d'environnement doit être nommé `.env` ou il ne sera pas reconnu comme un fichier d'environnement.

Ne le nommez pas `process.env` ou `.env-custom` ou quoi que ce soit d'autre.

- Suivez [ces instructions](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) pour exporter votre clé privée
- Voir ci-dessous pour obtenir l'URL de l'API HTTP Alchemy

![](./get-alchemy-api-key.gif)

Votre `.env` devrait ressembler à ceci :

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Pour les relier à notre code, nous ferons référence à ces variables dans notre fichier `hardhat.config.js` à l'étape 13.

### Étape 12 : Installer Ethers.js {#step-12-install-ethersjs}

Ethers.js est une bibliothèque qui facilite l'interaction et les requêtes vers Ethereum en enveloppant les [méthodes JSON-RPC standard](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) avec des méthodes plus conviviales.

Hardhat nous permet d'intégrer des [plugins](https://hardhat.org/plugins/) pour des outils supplémentaires et des fonctionnalités étendues. Nous allons profiter du [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) pour le déploiement de contrats.

Dans votre dossier de projet, tapez :

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### Étape 13 : Mettre à jour hardhat.config.js {#step-13-update-hardhat-configjs}

À ce stade, nous avons ajouté plusieurs dépendances et plugins. Nous devons maintenant mettre à jour `hardhat.config.js` pour que notre projet les reconnaisse.

Mettez à jour votre `hardhat.config.js` pour qu'il ressemble à ceci :

```javascript
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")

const { API_URL, PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
}
```

### Étape 14 : Compiler notre contrat {#step-14-compile-our-contract}

Pour s’assurer à ce stade que tout fonctionne, compilons notre contrat. La tâche `compile` est l'une des tâches intégrées de hardhat.

À partir de la ligne de commande, exécutez :

```bash
npx hardhat compile
```

Vous pourriez recevoir un avertissement concernant l'« identifiant de licence SPDX non fourni dans le fichier source », mais ne vous inquiétez pas — espérons que tout le reste se passe bien ! Sinon, vous pouvez toujours envoyer un message sur le [Discord d'Alchemy](https://discord.gg/u72VCg3).

### Étape 15 : Écrire notre script de déploiement {#step-15-write-our-deploy-script}

Maintenant que notre contrat est codé et que notre fichier de configuration est bon, il est temps d’écrire notre script de déploiement pour notre contrat.

Naviguez vers le dossier `scripts/` et créez un nouveau fichier appelé `deploy.js`, en y ajoutant le contenu suivant :

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // Démarrer le déploiement, en retournant une promesse qui se résout en un objet de contrat
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Contrat déployé à l'adresse :", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat explique très bien ce que fait chacune de ces lignes de code dans son [tutoriel sur les contrats](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), nous avons repris leurs explications ici.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

Un `ContractFactory` dans ethers.js est une abstraction utilisée pour déployer de nouveaux contrats intelligents, donc `HelloWorld` ici est une [factory (fabrique)](https://en.wikipedia.org/wiki/Factory_\(object-oriented_programming\)) pour les instances de notre contrat hello world. Lors de l'utilisation du plugin `hardhat-ethers`, les instances `ContractFactory` et `Contract` sont connectées par défaut au premier signataire (propriétaire).

```javascript
const hello_world = await HelloWorld.deploy()
```

Appeler `deploy()` sur une `ContractFactory` lancera le déploiement et retournera une `Promise` qui se résout en un objet `Contract`. C'est l'objet qui possède une méthode pour chacune des fonctions de notre contrat intelligent.

### Étape 16 : Déployer notre contrat {#step-16-deploy-our-contract}

Nous sommes enfin prêts à déployer notre contrat intelligent ! Naviguez vers la ligne de commande et exécutez :

```bash
npx hardhat run scripts/deploy.js --network goerli
```

Vous devriez maintenant voir quelque chose comme :

```bash
Contrat déployé à l'adresse : 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**Veuillez sauvegarder cette adresse**. Nous l'utiliserons plus tard dans le tutoriel.

Si nous allons sur [l'Etherscan de Goerli](https://goerli.etherscan.io) et que nous recherchons l'adresse de notre contrat, nous devrions être en mesure de voir qu'il a été déployé avec succès. La transaction ressemblera à quelque chose comme :

![](./etherscan-contract.png)

L'adresse `From` devrait correspondre à l'adresse de votre compte MetaMask et l'adresse `To` indiquera **Création de Contrat**. Si nous cliquons sur la transaction, nous verrons l'adresse de notre contrat dans le champ `To`.

![](./etherscan-transaction.png)

Félicitations ! Vous venez de déployer un contrat intelligent sur un réseau de test Ethereum.

Pour comprendre ce qui se passe en coulisses, naviguons vers l'onglet Explorer dans notre [tableau de bord Alchemy](https://dashboard.alchemy.com/explorer). Si vous avez plusieurs applications Alchemy, assurez-vous de filtrer par application et de sélectionner **Hello World**.

![](./hello-world-explorer.png)

Ici, vous verrez une poignée de méthodes JSON-RPC que Hardhat/Ethers ont créées en coulisses pour nous lorsque nous avons appelé la fonction `.deploy()`. Deux méthodes importantes ici sont [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), qui est la requête pour écrire notre contrat sur la chaîne Goerli, et [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash), qui est une requête pour lire les informations sur notre transaction à partir du hachage. Pour en savoir plus sur l'envoi de transactions, consultez [notre tutoriel sur l'envoi de transactions à l'aide de Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

## Partie 2 : Interagir avec votre contrat intelligent {#part-2-interact-with-your-smart-contract}

Maintenant que nous avons déployé avec succès un contrat intelligent sur le réseau Goerli, apprenons à interagir avec lui.

### Créer un fichier interact.js {#create-a-interactjs-file}

C'est dans ce fichier que nous écrirons notre script d'interaction. Nous utiliserons la bibliothèque Ethers.js que vous avez précédemment installée dans la Partie 1.

À l'intérieur du dossier `scripts/`, créez un nouveau fichier nommé `interact.js` et ajoutez le code suivant :

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### Mettez à jour votre fichier .env {#update-your-env-file}

Nous allons utiliser de nouvelles variables d'environnement, nous devons donc les définir dans le fichier `.env` que [nous avons créé précédemment](#step-11-connect-metamask-&-alchemy-to-your-project).

Nous devrons ajouter une définition pour notre `API_KEY` Alchemy et le `CONTRACT_ADDRESS` où votre contrat intelligent a été déployé.

Votre fichier `.env` devrait ressembler à ceci :

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### Récupérez l'ABI de votre contrat {#grab-your-contract-ABI}

L'[ABI (Application Binary Interface)](/glossary/#abi) de notre contrat est l'interface pour interagir avec notre contrat intelligent. Hardhat génère automatiquement un ABI et le sauvegarde dans `HelloWorld.json`. Pour utiliser l'ABI, nous devons en extraire le contenu en ajoutant les lignes de code suivantes à notre fichier `interact.js` :

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

Si vous voulez voir l'ABI, vous pouvez l'afficher dans votre console :

```javascript
console.log(JSON.stringify(contract.abi))
```

Pour voir votre ABI s'afficher dans la console, naviguez vers votre terminal et exécutez :

```bash
npx hardhat run scripts/interact.js
```

### Créer une instance de votre contrat {#create-an-instance-of-your-contract}

Pour interagir avec notre contrat, nous devons créer une instance de contrat dans notre code. Pour ce faire avec Ethers.js, nous devrons travailler avec trois concepts :

1. Fournisseur - un fournisseur de nœud qui vous donne un accès en lecture et écriture à la blockchain
2. Signataire - représente un compte Ethereum qui peut signer des transactions
3. Contrat - un objet Ethers.js représentant un contrat spécifique déployé sur la chaîne

Nous utiliserons l'ABI de contrat de l'étape précédente pour créer notre instance du contrat :

```javascript
// interact.js

// Fournisseur
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Signataire
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Contrat
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

En savoir plus sur les Fournisseurs, les Signataires et les Contrats dans la [documentation d'ethers.js](https://docs.ethers.io/v5/).

### Lire le message d'initialisation {#read-the-init-message}

Vous souvenez-vous lorsque nous avons déployé notre contrat avec `initMessage = "Hello world!"` ? Nous allons maintenant lire ce message stocké dans notre contrat intelligent et l'afficher sur la console.

En JavaScript, des fonctions asynchrones sont utilisées lors de l'interaction avec des réseaux. Pour en savoir plus sur les fonctions asynchrones, [lisez cet article sur Medium](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

Utilisez le code ci-dessous pour appeler la fonction `message` dans notre contrat intelligent et lire le message d'initialisation :

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("Le message est : " + message)
}
main()
```

Après avoir exécuté le fichier en utilisant `npx hardhat run scripts/interact.js` dans le terminal, nous devrions voir cette réponse :

```
Le message est : Hello world!
```

Félicitations ! Vous venez de lire avec succès des données de contrat intelligent depuis la blockchain Ethereum, bravo !

### Mettre à jour le message {#update-the-message}

Au lieu de simplement lire le message, nous pouvons également mettre à jour le message sauvegardé dans notre contrat intelligent en utilisant la fonction `update` ! Plutôt cool, n'est-ce pas ?

Pour mettre à jour le message, nous pouvons appeler directement la fonction `update` sur notre objet de Contrat instancié :

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("Le message est : " + message)

  console.log("Mise à jour du message...")
  const tx = await helloWorldContract.update("Ceci est le nouveau message.")
  await tx.wait()
}
main()
```

Notez qu'à la ligne 11, nous faisons un appel à `.wait()` sur l'objet de transaction renvoyé. Cela garantit que notre script attend que la transaction soit minée sur la blockchain avant de quitter la fonction. Si l'appel `.wait()` n'est pas inclus, le script risque de ne pas voir la valeur mise à jour du `message` dans le contrat.

### Lire le nouveau message {#read-the-new-message}

Vous devriez pouvoir répéter l'[étape précédente](#read-the-init-message) pour lire la valeur du `message` mis à jour. Prenez un moment et voyez si vous pouvez apporter les modifications nécessaires pour afficher cette nouvelle valeur !

Si vous avez besoin d'un indice, voici à quoi devrait ressembler votre fichier `interact.js` à ce stade :

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// fournisseur - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// signataire - vous
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// instance de contrat
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("Le message est : " + message)

  console.log("Mise à jour du message...")
  const tx = await helloWorldContract.update("ceci est le nouveau message")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("Le nouveau message est : " + newMessage)
}

main()
```

Exécutez simplement le script et vous devriez pouvoir voir l'ancien message, le statut de la mise à jour, et le nouveau message affiché sur votre terminal !

`npx hardhat run scripts/interact.js --network goerli`

```
Le message est : Hello World!
Mise à jour du message...
Le nouveau message est : Ceci est le nouveau message.
```

Lors de l'exécution de ce script, vous remarquerez peut-être que l'étape « Mise à jour du message... » prend du temps à charger avant que le nouveau message ne s'affiche. Cela est dû au processus de minage ; si vous êtes curieux de suivre les transactions pendant qu'elles sont en cours de minage, visitez la [mempool d'Alchemy](https://dashboard.alchemyapi.io/mempool) pour voir le statut d'une transaction. Si la transaction est abandonnée, il est également utile de consulter [l'Etherscan de Goerli](https://goerli.etherscan.io) et de rechercher le hachage de votre transaction.

## Partie 3 : Publier votre contrat intelligent sur Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

Vous avez fait tout le travail difficile pour donner vie à votre contrat intelligent ; il est maintenant temps de le partager avec le monde !

En vérifiant votre contrat intelligent sur Etherscan, n'importe qui peut voir votre code source et interagir avec votre contrat intelligent. Commençons !

### Étape 1 : Générer une clé API sur votre compte Etherscan {#step-1-generate-an-api-key-on-your-etherscan-account}

Une clé API Etherscan est nécessaire pour vérifier que vous possédez le contrat intelligent que vous essayez de publier.

Si vous n'avez pas encore de compte Etherscan, [inscrivez-vous pour un compte](https://etherscan.io/register).

Une fois connecté, trouvez votre nom d'utilisateur dans la barre de navigation, survolez-le et sélectionnez le bouton **Mon profil**.

Sur votre page de profil, vous devriez voir une barre de navigation latérale. Depuis la barre de navigation latérale, sélectionnez **Clés API**. Ensuite, appuyez sur le bouton « Ajouter » pour créer une nouvelle clé API, nommez votre application **hello-world** et appuyez sur le bouton **Créer une nouvelle clé API**.

Votre nouvelle clé API devrait apparaître dans le tableau des clés API. Copiez la clé API dans votre presse-papiers.

Ensuite, nous devons ajouter la clé API d'Etherscan à notre fichier `.env`.

Après l'avoir ajoutée, votre fichier `.env` devrait ressembler à ceci :

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Contrats intelligents déployés par Hardhat {#hardhat-deployed-smart-contracts}

#### Installer hardhat-etherscan {#install-hardhat-etherscan}

Publier votre contrat sur Etherscan à l'aide de Hardhat est simple. Vous devrez d'abord installer le plugin `hardhat-etherscan` pour commencer. `hardhat-etherscan` vérifiera automatiquement le code source et l'ABI du contrat intelligent sur Etherscan. Pour l'ajouter, dans le répertoire `hello-world`, exécutez :

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

Une fois installé, incluez la déclaration suivante en haut de votre `hardhat.config.js`, et ajoutez les options de configuration d'Etherscan :

```javascript
// hardhat.config.js

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // Votre clé API pour Etherscan
    // Obtenez-en une sur https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Vérifiez votre contrat intelligent sur Etherscan {#verify-your-smart-contract-on-etherscan}

Assurez-vous que tous les fichiers sont sauvegardés et que toutes les variables `.env` sont correctement configurées.

Exécutez la tâche `verify`, en passant l'adresse du contrat et le réseau sur lequel il est déployé :

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

Assurez-vous que `DEPLOYED_CONTRACT_ADDRESS` est l'adresse de votre contrat intelligent déployé sur le réseau de test Goerli. De plus, l'argument final (`'Hello World!'`) doit être la même valeur de chaîne que celle utilisée [lors de l'étape de déploiement de la partie 1](#write-our-deploy-script).

Si tout se passe bien, vous verrez le message suivant dans votre terminal :

```text
Code source du contrat soumis avec succès
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
pour vérification sur Etherscan. En attente du résultat de la vérification...


Contrat HelloWorld vérifié avec succès sur Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

Félicitations ! Votre code de contrat intelligent est sur Etherscan !

### Consultez votre contrat intelligent sur Etherscan ! {#check-out-your-smart-contract-on-etherscan}

Lorsque vous naviguez vers le lien fourni dans votre terminal, vous devriez pouvoir voir votre code de contrat intelligent et l'ABI publiés sur Etherscan !

**Wahooo - vous l'avez fait, champion ! Désormais, n'importe qui peut appeler ou écrire dans votre contrat intelligent ! Nous sommes impatients de voir ce que vous construirez ensuite !**

## Partie 4 - Intégration de votre contrat intelligent avec le frontend {#part-4-integrating-your-smart-contract-with-the-frontend}

À la fin de ce tutoriel, vous saurez comment :

- Connecter un portefeuille MetaMask à votre dapp
- Lire des données de votre contrat intelligent en utilisant l'API [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Signer des transactions Ethereum en utilisant MetaMask

Pour cette dapp, nous utiliserons [React](https://react.dev/) comme notre framework frontend ; cependant, il est important de noter que nous ne passerons pas beaucoup de temps à décomposer ses fondamentaux, car nous nous concentrerons principalement sur l'intégration de la fonctionnalité Web3 à notre projet.

En prérequis, vous devriez avoir une compréhension de niveau débutant de React. Sinon, nous vous recommandons de suivre le [tutoriel officiel d'introduction à React](https://react.dev/learn).

### Cloner les fichiers de démarrage {#clone-the-starter-files}

Tout d'abord, rendez-vous sur le [dépôt GitHub hello-world-part-four](https://github.com/alchemyplatform/hello-world-part-four-tutorial) pour obtenir les fichiers de démarrage de ce projet et clonez ce dépôt sur votre machine locale.

Ouvrez le dépôt cloné localement. Remarquez qu'il contient deux dossiers : `starter-files` et `completed`.

- `starter-files` - **nous travaillerons dans ce répertoire**, nous connecterons l'interface utilisateur à votre portefeuille Ethereum et au contrat intelligent que nous avons publié sur Etherscan dans la [Partie 3](#part-3).
- `completed` contient le tutoriel complet et ne doit être utilisé que comme référence si vous êtes bloqué.

Ensuite, ouvrez votre copie de `starter-files` avec votre éditeur de code préféré, puis naviguez dans le dossier `src`.

Tout le code que nous allons écrire se trouvera dans le dossier `src`. Nous modifierons le composant `HelloWorld.js` et les fichiers JavaScript `util/interact.js` pour donner à notre projet des fonctionnalités Web3.

### Consultez les fichiers de démarrage {#check-out-the-starter-files}

Avant de commencer à coder, explorons ce qui nous est fourni dans les fichiers de départ.

#### Faire fonctionner votre projet React {#get-your-react-project-running}

Commençons par exécuter le projet React dans notre navigateur. La beauté de React est qu'une fois que notre projet est en cours d'exécution dans notre navigateur, toutes les modifications que nous sauvegardons seront mises à jour en direct dans notre navigateur.

Pour lancer le projet, naviguez vers le répertoire racine du dossier `starter-files`, et exécutez `npm install` dans votre terminal pour installer les dépendances du projet :

```bash
cd starter-files
npm install
```

Une fois l'installation terminée, exécutez `npm start` dans votre terminal :

```bash
npm start
```

Cela devrait ouvrir [http://localhost:3000/](http://localhost:3000/) dans votre navigateur, où vous verrez le frontend de notre projet. Il devrait se composer d'un champ (un endroit pour mettre à jour le message stocké dans votre contrat intelligent), d'un bouton « Connecter le portefeuille » et d'un bouton « Mettre à jour ».

Si vous essayez de cliquer sur l'un ou l'autre des boutons, vous remarquerez qu'ils ne fonctionnent pas - c'est parce que nous devons encore programmer leur fonctionnalité.

#### Le composant `HelloWorld.js` {#the-helloworld-js-component}

Retournons dans le dossier `src` de notre éditeur et ouvrons le fichier `HelloWorld.js`. Il est très important de comprendre tout ce qui se trouve dans ce fichier, car c'est le composant principal de React sur lequel nous allons travailler.

En haut de ce fichier, vous remarquerez que nous avons plusieurs instructions d'importation nécessaires pour faire fonctionner notre projet, y compris la bibliothèque React, les hooks useEffect et useState, certains éléments de `./util/interact.js` (nous les décrirons plus en détail bientôt !), et le logo d'Alchemy.

```javascript
// HelloWorld.js

import React from "react"
import { useEffect, useState } from "react"
import {
  helloWorldContract,
  connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
} from "./util/interact.js"

import alchemylogo from "./alchemylogo.svg"
```

Ensuite, nous avons nos variables d'état que nous mettrons à jour après des événements spécifiques.

```javascript
// HelloWorld.js

//Variables d'état
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("Pas de connexion au réseau.")
const [newMessage, setNewMessage] = useState("")
```

Voici ce que chacune des variables représente :

- `walletAddress` : une chaîne qui stocke l'adresse du portefeuille de l'utilisateur
- `status` - une chaîne de caractères qui stocke un message utile guidant l'utilisateur sur la façon d'interagir avec la dapp
- `message` - une chaîne qui stocke le message actuel dans le contrat intelligent
- `newMessage` - une chaîne qui stocke le nouveau message qui sera écrit dans le contrat intelligent

Après les variables d'état, vous verrez cinq fonctions non implémentées : `useEffect`, `addSmartContractListener`, `addWalletListener`, `connectWalletPressed`, et `onUpdatePressed`. Nous expliquerons ce qu'elles font ci-dessous :

```javascript
// HelloWorld.js

//appelé une seule fois
useEffect(async () => {
  //TODO: implémenter
}, [])

function addSmartContractListener() {
  //TODO: implémenter
}

function addWalletListener() {
  //TODO: implémenter
}

const connectWalletPressed = async () => {
  //TODO: implémenter
}

const onUpdatePressed = async () => {
  //TODO: implémenter
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - c'est un hook React qui est appelé après que votre composant est rendu. Comme il a un tableau vide `[]` passé en paramètre (voir ligne 4), il ne sera appelé qu'au _premier_ rendu du composant. Ici, nous chargerons le message actuel stocké dans notre contrat intelligent, appellerons nos écouteurs de contrat intelligent et de portefeuille, et mettrons à jour notre interface pour refléter si un portefeuille est déjà connecté.
- `addSmartContractListener` - cette fonction configure un écouteur qui surveillera l'événement `UpdatedMessages` de notre contrat HelloWorld et mettra à jour notre interface utilisateur lorsque le message sera modifié dans notre contrat intelligent.
- `addWalletListener` - cette fonction configure un écouteur qui détecte les changements dans l'état du portefeuille MetaMask de l'utilisateur, par exemple lorsque l'utilisateur déconnecte son portefeuille ou change d'adresse.
- `connectWalletPressed` - cette fonction sera appelée pour connecter le portefeuille MetaMask de l'utilisateur à notre dapp.
- `onUpdatePressed` - cette fonction sera appelée lorsque l'utilisateur souhaite mettre à jour le message stocké dans le contrat intelligent.

Vers la fin de ce fichier, nous avons l'interface utilisateur de notre composant.

```javascript
// HelloWorld.js

//l'interface utilisateur de notre composant
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connecté : " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connecter le portefeuille</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Message actuel :</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>Nouveau message :</h2>

    <div>
      <input
        type="text"
        placeholder="Mettez à jour le message dans votre contrat intelligent."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Mettre à jour
      </button>
</div>
 
</div>
)
```

Si vous analysez attentivement ce code, vous remarquerez où nous utilisons nos différentes variables d'état dans notre interface utilisateur :

- Aux lignes 6-12, si le portefeuille de l'utilisateur est connecté (c'est-à-dire `walletAddress.length > 0`), nous affichons une version tronquée de l'`walletAddress` de l'utilisateur dans le bouton avec l'ID "walletButton"; sinon, il indique simplement "Connecter le portefeuille".
- À la ligne 17, nous affichons le message actuel stocké dans le contrat intelligent, qui est capturé dans la chaîne `message`.
- Aux lignes 23-26, nous utilisons un [composant contrôlé](https://legacy.reactjs.org/docs/forms.html#controlled-components) pour mettre à jour notre variable d'état `newMessage` lorsque l'entrée dans le champ de texte change.

En plus de nos variables d'état, vous verrez également que les fonctions `connectWalletPressed` et `onUpdatePressed` sont appelées lorsque les boutons avec les ID `publishButton` et `walletButton` sont cliqués respectivement.

Enfin, voyons où ce composant `HelloWorld.js` est ajouté.

Si vous allez dans le fichier `App.js`, qui est le composant principal de React agissant comme un conteneur pour tous les autres composants, vous verrez que notre composant `HelloWorld.js` est injecté à la ligne 7.

Enfin et surtout, examinons un autre fichier qui vous est fourni, le fichier `interact.js`.

#### Le fichier `interact.js` {#the-interact-js-file}

Parce que nous voulons adhérer au paradigme [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), nous voudrons un fichier séparé qui contient toutes nos fonctions pour gérer la logique, les données et les règles de notre dapp, puis pouvoir exporter ces fonctions vers notre frontend (notre composant `HelloWorld.js`).

👆🏽C'est exactement le but de notre fichier `interact.js` !

Naviguez vers le dossier `util` dans votre répertoire `src`, et vous remarquerez que nous avons inclus un fichier appelé `interact.js` qui contiendra toutes nos fonctions et variables d'interaction avec le contrat intelligent et le portefeuille.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

Vous remarquerez en haut du fichier que nous avons commenté l'objet `helloWorldContract`. Plus tard dans ce tutoriel, nous décommenterons cet objet et instancierons notre contrat intelligent dans cette variable, que nous exporterons ensuite dans notre composant `HelloWorld.js`.

Les quatre fonctions non implémentées après notre objet `helloWorldContract` font ce qui suit :

- `loadCurrentMessage` - cette fonction gère la logique de chargement du message actuel stocké dans le contrat intelligent. Elle effectuera un appel en _lecture_ au contrat intelligent Hello World en utilisant l'[API Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).
- `connectWallet` - cette fonction connectera le MetaMask de l'utilisateur à notre dapp.
- `getCurrentWalletConnected` - cette fonction vérifiera si un compte Ethereum est déjà connecté à notre dapp lors du chargement de la page et mettra à jour notre interface utilisateur en conséquence.
- `updateMessage` - cette fonction mettra à jour le message stocké dans le contrat intelligent. Elle effectuera un appel en _écriture_ au contrat intelligent Hello World, donc le portefeuille MetaMask de l'utilisateur devra signer une transaction Ethereum pour mettre à jour le message.

Maintenant que nous comprenons avec quoi nous travaillons, voyons comment lire notre contrat intelligent !

### Étape 3 : Lire à partir de votre contrat intelligent {#step-3-read-from-your-smart-contract}

Pour lire à partir de votre contrat intelligent, vous devrez configurer avec succès :

- Une connexion API à la chaîne Ethereum
- Une instance chargée de votre contrat intelligent
- Une fonction pour appeler la fonction de votre contrat intelligent
- Un écouteur pour surveiller les mises à jour lorsque les données que vous lisez à partir du contrat intelligent changent

Cela peut sembler beaucoup d'étapes, mais ne vous inquiétez pas ! Nous allons vous guider étape par étape ! :\)

#### Établir une connexion API à la chaîne Ethereum {#establish-an-api-connection-to-the-ethereum-chain}

Alors, souvenez-vous comment, dans la partie 2 de ce tutoriel, nous avons utilisé notre [clé Alchemy Web3 pour lire notre contrat intelligent](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library) ? Vous aurez également besoin d'une clé Alchemy Web3 dans votre dapp pour lire à partir de la chaîne.

Si vous ne l'avez pas déjà, installez d'abord [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) en naviguant vers le répertoire racine de vos `starter-files` et en exécutant la commande suivante dans votre terminal :

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) est un wrapper autour de [Web3.js](https://docs.web3js.org/), qui fournit des méthodes API améliorées et d'autres avantages cruciaux pour vous faciliter la vie en tant que développeur web3. Il est conçu pour nécessiter une configuration minimale afin que vous puissiez commencer à l'utiliser immédiatement dans votre application !

Ensuite, installez le paquet [dotenv](https://www.npmjs.com/package/dotenv) dans le répertoire de votre projet, afin que nous ayons un endroit sécurisé pour stocker notre clé API après l'avoir récupérée.

```text
npm install dotenv --save
```

Pour notre dapp, **nous utiliserons notre clé API Websockets** au lieu de notre clé API HTTP, car cela nous permettra de mettre en place un écouteur qui détecte lorsque le message stocké dans le contrat intelligent change.

Une fois que vous avez votre clé API, créez un fichier `.env` dans votre répertoire racine et ajoutez-y votre URL Websockets Alchemy. Ensuite, votre fichier `.env` devrait ressembler à ceci :

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

Maintenant, nous sommes prêts à configurer notre point de terminaison Alchemy Web3 dans notre dapp ! Retournons à notre `interact.js`, qui est imbriqué dans notre dossier `util`, et ajoutons le code suivant en haut du fichier :

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

Ci-dessus, nous avons d'abord importé la clé Alchemy depuis notre fichier `.env`, puis nous avons passé notre `alchemyKey` à `createAlchemyWeb3` pour établir notre point de terminaison Alchemy Web3.

Avec ce point de terminaison prêt, il est temps de charger notre contrat intelligent !

#### Chargement de votre contrat intelligent Hello World {#loading-your-hello-world-smart-contract}

Pour charger votre contrat intelligent Hello World, vous aurez besoin de son adresse de contrat et de son ABI, qui peuvent tous deux être trouvés sur Etherscan si vous avez terminé la [Partie 3 de ce tutoriel](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan).

#### Comment obtenir l'ABI de votre contrat depuis Etherscan {#how-to-get-your-contract-abi-from-etherscan}

Si vous avez sauté la partie 3 de ce tutoriel, vous pouvez utiliser le contrat HelloWorld avec l'adresse [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code). Son ABI peut être trouvé [ici](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

L'ABI d'un contrat est nécessaire pour spécifier quelle fonction un contrat invoquera, ainsi que pour s'assurer que la fonction renverra des données dans le format que vous attendez. Une fois que nous avons copié l'ABI de notre contrat, sauvegardons-le en tant que fichier JSON appelé `contract-abi.json` dans votre répertoire `src`.

Votre contract-abi.json doit être stocké dans votre dossier src.

Armés de l'adresse de notre contrat, de l'ABI et du point de terminaison Alchemy Web3, nous pouvons utiliser la [méthode de contrat](https://docs.web3js.org/api/web3-eth-contract/class/Contract) pour charger une instance de notre contrat intelligent. Importez l'ABI de votre contrat dans le fichier `interact.js` et ajoutez l'adresse de votre contrat.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

Nous pouvons maintenant enfin décommenter notre variable `helloWorldContract` et charger le contrat intelligent en utilisant notre point de terminaison AlchemyWeb3 :

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Pour récapituler, les 12 premières lignes de votre `interact.js` devraient maintenant ressembler à ceci :

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"

export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Maintenant que notre contrat est chargé, nous pouvons implémenter notre fonction `loadCurrentMessage` !

#### Implémentation de `loadCurrentMessage` dans votre fichier `interact.js` {#implementing-loadCurrentMessage-in-your-interact-js-file}

Cette fonction est très simple. Nous allons faire un simple appel web3 asynchrone pour lire notre contrat. Notre fonction renverra le message stocké dans le contrat intelligent :

Mettez à jour la fonction `loadCurrentMessage` dans votre fichier `interact.js` comme suit :

```javascript
Mettez à jour `loadCurrentMessage` dans votre fichier `interact.js` comme suit :
```

// interact.jsexport const loadCurrentMessage = async () => {
const message = await helloWorldContract.methods.message().call()
return message
}

```javascript
Puisque nous voulons afficher ce contrat intelligent dans notre interface utilisateur, mettons à jour la fonction `useEffect` dans notre composant `HelloWorld.js` comme suit :
```

// HelloWorld.js//appelé une seule fois
useEffect(async () => {
const message = await loadCurrentMessage()
setMessage(message)
}, []) Notez que nous voulons que notre `loadCurrentMessage` ne soit appelé qu'une seule fois lors du premier rendu du composant.

Nous allons bientôt implémenter `addSmartContractListener` pour mettre à jour automatiquement l'interface utilisateur après que le message dans le contrat intelligent a changé. Avant de nous plonger dans notre écouteur, voyons ce que nous avons jusqu'à présent !

Enregistrez vos fichiers `HelloWorld.js` et `interact.js`, puis allez sur [http://localhost:3000/](http://localhost:3000/) Vous remarquerez que le message actuel ne dit plus « Pas de connexion au réseau ». Au lieu de cela, il reflète le message stocké dans le contrat intelligent.

#### Génial !

Votre interface utilisateur devrait maintenant refléter le message stocké dans le contrat intelligent {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

#### Maintenant, en parlant de cet écouteur...

Implémenter `addSmartContractListener` {#implement-addsmartcontractlistener}

```javascript
Si vous repensez au fichier `HelloWorld.sol` que nous avons écrit dans la [Partie 1 de cette série de tutoriels](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract), vous vous souviendrez qu'il y a un événement de contrat intelligent appelé `UpdatedMessages` qui est émis après l'invocation de la fonction `update` de notre contrat intelligent (voir lignes 9 et 27) :
```

// HelloWorld.sol// Spécifie la version de Solidity, en utilisant le versionnage sémantique.
// En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;// Définit un contrat nommé `HelloWorld`.
// Un contrat est une collection de fonctions et de données (son état). Une fois déployé, un contrat réside à une adresse spécifique sur la blockchain Ethereum. En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {//Émis lorsque la fonction de mise à jour est appelée
//Les événements de contrat intelligent sont un moyen pour votre contrat de communiquer que quelque chose s'est passé sur la blockchain à votre interface d'application, qui peut « écouter » certains événements et prendre des mesures lorsqu'ils se produisent.
event UpdatedMessages(string oldStr, string newStr);// Déclare une variable d'état `message` de type `string`.
// Les variables d'état sont des variables dont les valeurs sont stockées en permanence dans le stockage du contrat. Le mot-clé `public` rend les variables accessibles depuis l'extérieur d'un contrat et crée une fonction que d'autres contrats ou clients peuvent appeler pour accéder à la valeur.
string public message;// Semblable à de nombreux langages orientés objet basés sur les classes, un constructeur est une fonction spéciale qui n'est exécutée qu'à la création du contrat.
// Les constructeurs sont utilisés pour initialiser les données du contrat. En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
constructor(string memory initMessage) {```
  // Accepte un argument de chaîne `initMessage` et définit la valeur dans la variable de stockage `message` du contrat).
  message = initMessage;
```}// Une fonction publique qui accepte un argument de chaîne et met à jour la variable de stockage `message`.
function update(string memory newMessage) public {
string memory oldMsg = message;
message = newMessage;
emit UpdatedMessages(oldMsg, newMessage);
}
}

Les événements de contrat intelligent sont un moyen pour votre contrat de communiquer qu'un événement s'est produit (c'est-à-dire qu'il y a eu un _événement_) sur la blockchain à votre application frontale, qui peut être à l'« écoute » d'événements spécifiques et prendre des mesures lorsqu'ils se produisent.

La fonction `addSmartContractListener` va spécifiquement écouter l'événement `UpdatedMessages` de notre contrat intelligent Hello World et mettre à jour notre interface utilisateur pour afficher le nouveau message.

```javascript
Modifiez `addSmartContractListener` comme suit :
```

// HelloWorld.jsfunction addSmartContractListener() {
helloWorldContract.events.UpdatedMessages({}, (error, data) => {
if (error) {
setStatus("😥 " + error.message)
} else {
setMessage(data.returnValues[1])
setNewMessage("")
setStatus("🎉 Votre message a été mis à jour !")
}
})
}

- Analysons ce qui se passe lorsque l'écouteur détecte un événement :
- Si une erreur se produit lorsque l'événement est émis, elle sera reflétée dans l'interface utilisateur via notre variable d'état `status`. Sinon, nous utiliserons l'objet `data` renvoyé. L'objet `data.returnValues` est un tableau indexé à zéro où le premier élément contient le message précédent et le second le message mis à jour.

En somme, lors d'un événement réussi, nous définirons notre chaîne `message` sur le message mis à jour, effacerons la chaîne `newMessage` et mettrons à jour notre variable d'état `status` pour indiquer qu'un nouveau message a été publié sur notre contrat intelligent. Enfin, appelons notre écouteur dans notre fonction `useEffect` afin qu'il soit initialisé lors du premier rendu du composant `HelloWorld.js`.

```javascript
Globalement, votre fonction `useEffect` devrait ressembler à ceci :
```

// HelloWorld.jsuseEffect(async () => {
const message = await loadCurrentMessage()
setMessage(message)
addSmartContractListener()
}, []) Maintenant que nous pouvons lire notre contrat intelligent, il serait formidable de savoir comment y écrire aussi !

Cependant, pour écrire dans notre dapp, nous devons d'abord y connecter un portefeuille Ethereum.

### Donc, nous allons ensuite nous occuper de la configuration de notre portefeuille Ethereum (MetaMask) puis de sa connexion à notre dapp !

Étape 4 : Configurer votre portefeuille Ethereum {#step-4-set-up-your-ethereum-wallet} Pour écrire quoi que ce soit sur la chaîne Ethereum, les utilisateurs doivent signer des transactions à l'aide des clés privées de leur portefeuille virtuel.

Si vous voulez mieux comprendre le fonctionnement des transactions sur Ethereum, consultez [cette page](/developers/docs/transactions/) de la Fondation Ethereum.

#### Télécharger MetaMask {#download-metamask}

Vous pouvez télécharger et créer un compte MetaMask gratuitement [ici](https://metamask.io/download). Pour ce tutoriel, nous utiliserons [MetaMask](https://metamask.io/), un portefeuille virtuel dans le navigateur utilisé pour gérer l'adresse de votre compte Ethereum, car il rend cette signature de transaction très facile pour l'utilisateur final.

#### Lorsque vous créez un compte, ou si vous en avez déjà un, assurez-vous de basculer vers le « Réseau de test Goerli » en haut à droite (afin de ne pas utiliser d'argent réel).

Ajouter de l'ether depuis un robinet {#add-ether-from-a-faucet} Pour signer une transaction sur la blockchain Ethereum, nous aurons besoin de faux Eth. Vous devriez voir les ETH dans votre compte MetaMask peu de temps après !

#### Pour obtenir de l'Eth, vous pouvez vous rendre sur [FaucETH](https://fauceth.komputing.org), saisir l'adresse de votre compte Goerli, cliquer sur « Request funds », puis sélectionner « Ethereum Testnet Goerli » dans le menu déroulant et enfin cliquer à nouveau sur le bouton « Request funds ».

Pour vérifier que notre solde est bien là, faisons une requête [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) en utilisant l'[outil de composition d'Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Cela va retourner la quantité d'ETH que contient votre portefeuille. Après avoir entré l'adresse de votre compte MetaMask et cliqué sur « Send Request », vous devriez voir une réponse comme celle-ci :

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**REMARQUE :** ce résultat est en wei et non en eth. Le wei est utilisé comme la plus petite dénomination d'ether. La conversion de wei vers eth est : 1 eth = 10¹⁸ wei. Donc si on convertit 0xde0b6b3a7640000 en nombre décimal, nous obtenons 1\*10¹⁸ ce qui correspond à 1 eth.

Ouf ! Notre faux argent est bien là ! Vérifiez votre solde {#check-your-balance}

### 🤑

Maintenant que notre portefeuille MetaMask est configuré, connectons-y notre dApp !

#### Étape 5 : Connecter MetaMask à votre interface utilisateur {#step-5-connect-metamask-to-your-UI}

La fonction `connectWallet` {#the-connectWallet-function}

Dans notre fichier `interact.js`, implémentons la fonction `connectWallet`, que nous pourrons ensuite appeler dans notre composant `HelloWorld.js`.

```javascript
Modifions `connectWallet` comme suit :
```

// interact.jsexport const connectWallet = async () => {
if (window.ethereum) {
try {
const addressArray = await window.ethereum.request({
method: "eth_requestAccounts",
})
const obj = {
status: "👆🏽 Écrivez un message dans le champ de texte ci-dessus.",
address: addressArray[0],
}
return obj
} catch (err) {
return {
address: "",
status: "😥 " + err.message,
}
}
} else {
return {
address: "",
status: ( <span> <p>
{" "}
🦊 <a target="_blank" href={`https://metamask.io/download`}>
Vous devez installer MetaMask, un portefeuille Ethereum virtuel, dans votre
navigateur. </a> </p> </span>
),
}
}
}

Alors, que fait exactement ce bloc de code géant ?

`window.ethereum` est une API globale injectée par MetaMask et d'autres fournisseurs de portefeuilles qui permet aux sites Web de demander les comptes Ethereum des utilisateurs. Eh bien, d'abord, il vérifie si `window.ethereum` est activé dans votre navigateur. Consultez la [documentation de MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) pour plus d'informations !

Si `window.ethereum` n'_est pas_ présent, cela signifie que MetaMask n'est pas installé. Cela se traduit par le renvoi d'un objet JSON, où l'`address` renvoyée est une chaîne vide, et où l'objet `status` JSX relaie que l'utilisateur doit installer MetaMask.

Maintenant, si `window.ethereum` _est_ présent, c'est là que les choses deviennent intéressantes.

À l'aide d'une boucle try/catch, nous allons essayer de nous connecter à MetaMask en appelant [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). L'appel de cette fonction ouvrira MetaMask dans le navigateur, où l'utilisateur sera invité à connecter son portefeuille à votre dApp.

- S'il est approuvé, il peut lire des données des blockchains auxquelles l'utilisateur est connecté, et suggérer à l'utilisateur de signer des messages et des transactions. Au total, notre fonction `connectWallet` renverra un objet JSON qui contient la _première_ `adresse` de ce tableau (voir ligne 9) et un message `d'état` qui invite l'utilisateur à écrire un message au contrat intelligent.
- Si l'utilisateur rejette la connexion, l'objet JSON contiendra une chaîne vide pour l'`address` renvoyée et un message `d'état` indiquant que l'utilisateur a rejeté la connexion.

Si l'utilisateur choisit de se connecter, `method: "eth_requestAccounts"` renverra un tableau contenant toutes les adresses de compte de l'utilisateur connectées à la dapp.

#### Maintenant que nous avons écrit cette fonction `connectWallet`, la prochaine étape est de l'appeler dans notre composant `HelloWorld.js`.

Ajouter la fonction `connectWallet` à votre composant d'interface `HelloWorld.js` {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

```javascript
Naviguez vers la fonction `connectWalletPressed` dans `HelloWorld.js`, et mettez-la à jour comme suit :
```

// HelloWorld.jsconst connectWalletPressed = async () => {
const walletResponse = await connectWallet()
setStatus(walletResponse.status)
setWallet(walletResponse.address)
} C'est ainsi que nous respectons le paradigme M-V-C !

Dans `connectWalletPressed`, nous effectuons simplement un appel en attente vers notre fonction importée `connectWallet` et, à l'aide de sa réponse, nous mettons à jour nos variables `status` et `walletAddress` via leurs hooks d'état.

Remarquez comment la plupart de nos fonctionnalités sont abstraites de notre composant `HelloWorld.js` à partir du fichier `interact.js` ?

Maintenant, enregistrons les deux fichiers (`HelloWorld.js` et `interact.js`) et testons notre interface utilisateur jusqu'à présent.

Si MetaMask est installé, vous devriez être invité à connecter votre portefeuille à votre dApp. Accepter l'invitation à se connecter.

Ouvrez votre navigateur sur la page [http://localhost:3000/](http://localhost:3000/), et appuyez sur le bouton « Connecter le portefeuille » en haut à droite de la page. Vous devriez voir que le bouton du portefeuille indique maintenant que votre adresse est connectée !

Ensuite, essayez de rafraîchir la page... c'est étrange. Notre bouton de portefeuille nous invite à connecter MetaMask bien qu'il soit déjà connecté...

Yessss 🔥 Cependant, n'ayez crainte ! Nous pouvons facilement résoudre ce problème !

#### en implémentant `getCurrentWalletConnected`, qui vérifiera si une adresse est déjà connectée à notre dapp et mettra à jour notre interface utilisateur en conséquence !

La fonction `getCurrentWalletConnected` {#the-getcurrentwalletconnected-function}

```javascript
Mettez à jour votre fonction `getCurrentWalletConnected` dans le fichier `interact.js` comme suit :
```

// interact.jsexport const getCurrentWalletConnected = async () => {
if (window.ethereum) {
try {
const addressArray = await window.ethereum.request({
method: "eth_accounts",
})
if (addressArray.length > 0) {
return {
address: addressArray[0],
status: "👆🏽 Écrivez un message dans le champ de texte ci-dessus.",
}
} else {
return {
address: "",
status: "🦊 Connectez-vous à MetaMask en utilisant le bouton en haut à droite.",
}
}
} catch (err) {
return {
address: "",
status: "😥 " + err.message,
}
}
} else {
return {
address: "",
status: ( <span> <p>
{" "}
🦊 <a target="_blank" href={`https://metamask.io/download`}>
Vous devez installer MetaMask, un portefeuille Ethereum virtuel, dans votre
navigateur. </a> </p> </span>
),
}
}
}

La principale différence est qu'au lieu d'appeler la méthode `eth_requestAccounts`, qui ouvre MetaMask pour que l'utilisateur connecte son portefeuille, nous appelons ici la méthode `eth_accounts`, qui renvoie simplement un tableau contenant les adresses MetaMask actuellement connectées à notre dapp.

Ce code est _très_ similaire à la fonction `connectWallet` que nous venons d'écrire à l'étape précédente.

```javascript
Pour voir cette fonction en action, appelons-la dans notre fonction `useEffect` de notre composant `HelloWorld.js` :
```

Notez que nous utilisons la réponse de notre appel à `getCurrentWalletConnected` pour mettre à jour nos variables d'état `walletAddress` et `status`.

// HelloWorld.jsuseEffect(async () => {
const message = await loadCurrentMessage()
setMessage(message)
addSmartContractListener()const { address, status } = await getCurrentWalletConnected()
setWallet(address)
setStatus(status)
}, [])

Maintenant que vous avez ajouté ce code, essayons de rafraîchir la fenêtre de notre navigateur. Le bouton devrait indiquer que vous êtes connecté et afficher un aperçu de l'adresse de votre portefeuille connecté, même après avoir été actualisé !

#### Géniaaaal !

La dernière étape de la configuration de notre dApp de portefeuille consiste à mettre en place le listener de portefeuille afin que notre interface utilisateur soit mise à jour lorsque l'état de notre portefeuille change, par exemple lorsque l'utilisateur se déconnecte ou change de compte.

Implémenter `addWalletListener` {#implement-addwalletlistener}

```javascript
Dans votre fichier `HelloWorld.js`, modifiez votre fonction `addWalletListener` comme suit :
```

// HelloWorld.jsfunction addWalletListener() {
if (window.ethereum) {
window.ethereum.on("accountsChanged", (accounts) => {
if (accounts.length > 0) {
setWallet(accounts[0])
setStatus("👆🏽 Écrivez un message dans le champ de texte ci-dessus.")
} else {
setWallet("")
setStatus("🦊 Connectez-vous à MetaMask en utilisant le bouton en haut à droite.")
}
})
} else {
setStatus( <p>
{" "}
🦊 <a target="_blank" href={`https://metamask.io/download`}>
Vous devez installer MetaMask, un portefeuille Ethereum virtuel, dans votre navigateur. </a> </p>
)
}
}

- Tout d'abord, notre fonction vérifie si `window.ethereum` est activé (c'est-à-dire si MetaMask est installé).
  - Si ce n'est pas le cas, nous définissons simplement notre variable d'état `status` sur une chaîne JSX qui invite l'utilisateur à installer MetaMask.
  - S'il est activé, nous configurons l'écouteur `window.ethereum.on("accountsChanged")` à la ligne 3 qui écoute les changements d'état dans le portefeuille MetaMask, qui incluent le moment où l'utilisateur connecte un compte supplémentaire à la dapp, change de compte ou déconnecte un compte. S'il y a au moins un compte connecté, la variable d'état `walletAddress` est mise à jour en tant que premier compte dans le tableau `accounts` renvoyé par l'écouteur. Sinon, `walletAddress` est défini comme une chaîne vide.

Je parie que vous n'avez même pas besoin de notre aide pour comprendre ce qui se passe ici à ce stade, mais pour des raisons d'exhaustivité, décomposons rapidement :

```javascript
Enfin et surtout, nous devons l'appeler dans notre fonction `useEffect` :
```

Et c'est tout ! // HelloWorld.jsuseEffect(async () => {
const message = await loadCurrentMessage()
setMessage(message)
addSmartContractListener()const { address, status } = await getCurrentWalletConnected()
setWallet(address)
setStatus(status)addWalletListener()
}, []) Nous avons terminé avec succès la programmation de toutes les fonctionnalités de notre portefeuille !

### Passons maintenant à notre dernière tâche : mettre à jour le message stocké dans notre contrat intelligent !

Étape 6 : Implémenter la fonction `updateMessage` {#step-6-implement-the-updateMessage-function} C'est parti, nous sommes dans la dernière ligne droite !

1. Dans la fonction `updateMessage` de votre fichier `interact.js`, nous allons faire ce qui suit :
2. S'assurer que le message que nous souhaitons publier dans notre contact intelligent est valide
3. Signer notre transaction en utilisant MetaMask

Appeler cette fonction depuis notre composant frontend `HelloWorld.js`

#### Gestion des erreurs de saisie {#input-error-handling}

Cela ne prendra pas très longtemps ; finissons cette dapp !

Naturellement, il est logique d'avoir une sorte de gestion des erreurs de saisie au début de la fonction. Nous voudrons que notre fonction se termine prématurément s'il n'y a pas d'extension MetaMask installée, si aucun portefeuille n'est connecté (c'est-à-dire que l'`address` transmise est une chaîne vide), ou si le `message` est une chaîne vide.

```javascript
Ajoutons la gestion des erreurs suivante à `updateMessage` :
```

// interact.jsexport const updateMessage = async (address, message) => {
if (!window.ethereum || address === null) {
return {
status:
"💡 Connectez votre portefeuille MetaMask pour mettre à jour le message sur la blockchain.",
}
}if (message.trim() === "") {
return {
status: "❌ Votre message ne peut pas être une chaîne vide.",
}
}
}

#### Maintenant que nous avons une bonne gestion des erreurs de saisie, il est temps de signer la transaction via MetaMask !

Signer notre transaction {#signing-our-transaction} Si vous êtes déjà à l'aise avec les transactions Ethereum traditionnelles de web3, le code que nous écrirons ensuite vous sera très familier.

```javascript
Sous votre code de gestion des erreurs de saisie, ajoutez ce qui suit à `updateMessage` :
```

// interact.js//configurer les paramètres de la transaction
const transactionParameters = {
to: contractAddress, // Requis sauf lors de la publication de contrats.
from: address, // doit correspondre à l'adresse active de l'utilisateur.
data: helloWorldContract.methods.update(message).encodeABI(),
}//signer la transaction
try {
const txHash = await window.ethereum.request({
method: "eth_sendTransaction",
params: [transactionParameters],
})
return {
status: ( <span>
✅{" "}
<a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
Consultez l'état de votre transaction sur Etherscan ! </a> <br />
ℹ️ Une fois la transaction vérifiée par le réseau, le message sera
mis à jour automatiquement. </span>
),
}
} catch (error) {
return {
status: "😥 " + error.message,
}
} Analysons ce qui se passe.

- `to` spécifie l'adresse du destinataire (notre contrat intelligent)
- Tout d'abord, nous configurons les paramètres de nos transactions, où :
- `from` spécifie le signataire de la transaction, la variable `address` que nous avons passée dans notre fonction

`data` contient l'appel à la méthode `update` de notre contrat intelligent Hello World, recevant notre variable de chaîne `message` en entrée Ensuite, nous effectuons un appel await, `window.ethereum.request`, où nous demandons à MetaMask de signer la transaction.

À ce stade, MetaMask s'ouvrira dans le navigateur, et demandera à l'utilisateur de signer ou rejeter la transaction.

- Remarquez, aux lignes 11 et 12, nous spécifions notre méthode eth, `eth_sendTransaction`, et nous passons nos `transactionParameters`.
- Si la transaction réussit, la fonction renverra un objet JSON où la chaîne JSX `status` invite l'utilisateur à consulter Etherscan pour plus d'informations sur sa transaction.

Si la transaction échoue, la fonction renverra un objet JSON où la chaîne `status` relaie le message d'erreur.

Globalement, notre fonction `updateMessage` devrait ressembler à ceci :

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //gestion des erreurs de saisie
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connectez votre portefeuille MetaMask pour mettre à jour le message sur la blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Votre message ne peut pas être une chaîne vide.",
    }
  }

  //configurer les paramètres de la transaction
  const transactionParameters = {
    to: contractAddress, // Requis sauf lors de la publication de contrats.
    from: address, // doit correspondre à l'adresse active de l'utilisateur.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //signer la transaction
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
            Consultez l'état de votre transaction sur Etherscan !
          </a>
          <br />
          ℹ️ Une fois la transaction vérifiée par le réseau, le message sera
          mis à jour automatiquement.
        </span>
      ),
    }
  } catch (error) {
    return {
      status: "😥 " + error.message,
    }
  }
}
```

#### Enfin et surtout, nous devons connecter notre fonction `updateMessage` à notre composant `HelloWorld.js`.

Connecter `updateMessage` au frontend `HelloWorld.js` {#connect-updatemessage-to-the-helloworld-js-frontend}

Notre fonction `onUpdatePressed` devrait faire un appel `await` à la fonction `updateMessage` importée et modifier la variable d'état `status` pour refléter si notre transaction a réussi ou échoué :

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

C'est super propre et simple. Et devinez quoi...

VOTRE DAPP EST TERMINÉE !!!

### Allez-y et testez le bouton **Mettre à jour** !

Créez votre propre dapp personnalisée {#make-your-own-custom-dapp} Wooooo, vous êtes arrivé à la fin du tutoriel !

- Pour récapituler, vous avez appris à :
- Lire des données de votre contrat intelligent en utilisant l'API [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Signer des transactions Ethereum en utilisant MetaMask

Connecter un portefeuille MetaMask à votre projet de dapp Maintenant, vous êtes pleinement équipé pour appliquer les compétences de ce tutoriel afin de créer votre propre projet de dapp personnalisé ! Comme toujours, si vous avez des questions, n'hésitez pas à nous contacter pour obtenir de l'aide sur le [Discord d'Alchemy](https://discord.gg/gWuC7zB).

🧙‍♂️
