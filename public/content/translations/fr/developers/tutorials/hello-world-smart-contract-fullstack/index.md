---
title: Un Contrat intelligent « Hello World » pour les débutants - Fullstack
description: Tutoriel d'introduction à l'écriture et au déploiement d'un contrat intelligent simple sur Ethereum.
author: "nstrike2"
tags:
  - "solidity"
  - "hardhat"
  - "alchemy"
  - "contrats intelligents"
  - "déployer"
  - "explorateur de blockchain"
  - "frontend"
  - "transactions"
skill: beginner
lang: fr
published: 2021-10-25
---

Ce guide s'adresse à vous si vous êtes novice en matière de développement blockchain et que vous ne savez pas par où commencer ou comment déployer et interagir avec les contrats intelligents. Nous allons parcourir la création et le déploiement d'un contrat intelligent simple sur le réseau de test de Goerli à l'aide de [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org), et [Alchemy](https://alchemyapi.io/eth) .

Vous aurez besoin d'un compte Alchemy pour achever ce tutoriel. [S'inscrire pour un compte gratuit](https://www.alchemy.com/).

Si vous avez des questions à un moment ou à un autre, n'hésitez pas à en discuter sur le [Discord Alchemy](https://discord.gg/gWuC7zB)!

## Partie 1 - Créer et déployer votre contrat intelligent avec Hardhat {#part-1}

### Se connecter au réseau Ethereum {#connect-to-the-ethereum-network}

Il existe de nombreuses façons de faire des requêtes dans la chaîne d'Ethereum. Pour plus de simplicité, nous allons utiliser un compte gratuit sur Alchemy, une plateforme de blockchain et d'API pour développeur, nous permettant de communiquer avec la chaîne Ethereum sans avoir à exécuter notre propre nœud. Alchemy dispose également d'outils de développement pour la surveillance et l'analyse, dont nous allons tirer parti dans ce tutoriel, pour comprendre ce qui se passe sous le capot dans le déploiement de notre contrat intelligent.

### Créez votre application et votre clé API {#create-your-app-and-api-key}

Une fois votre compte Alchemy créé, vous pouvez générer une clé API en créant une application. Cela va vous permettre d'émettre des requêtes sur le réseau de test Goerli. Si vous n'êtes pas familiarisé avec les réseaux de test, vous pouvez [lire le guide d'Alchemy sur le choix d'un réseau](https://docs.alchemyapi.io/guides/choosing-a-network).

Sur le tableau de bord Alchemy, trouvez le menu déroulant **Apps** dans la barre de navigation et cliquez sur **Créer une application**.

![créer une application Hello world](./hello-world-create-app.png)

Donnez à votre application le nom "_Hello World_" et écrivez une courte description. Sélectionnez **Staging** comme environnement et **Goerli** comme réseau.

![créer une vue de l'application Hello world](./create-app-view-hello-world.png)

_Note : assurez-vous de sélectionner **Goerli**, sinon ce tutoriel ne fonctionnera pas._

Cliquer sur **Create app**. Votre application apparaîtra dans le tableau ci-dessous.

### Créer un compte Ethereum {#create-an-ethereum-account}

Vous avez besoin d'un compte Ethereum pour envoyer et recevoir des transactions. Nous utiliserons MetaMask, un portefeuille virtuel intégré au navigateur permettant aux utilisateurs de gérer l'adresse de leur compte Ethereum.

Vous pouvez télécharger et créer un compte MetaMask gratuitement [ici](https://metamask.io/download). Lorsque vous créez un compte, ou si vous en avez déjà un, assurez-vous de basculer sur « Réseau de test Goerli » en haut à droite (afin de ne pas utiliser d'argent réel).

### Étape 4 : Ajouter des ethers depuis un faucet {#step-4-add-ether-from-a-faucet}

Afin de déployer votre contrat intelligent sur le réseau de test, vous aurez besoin de faux ETH. Pour obtenir de l'ETH sur le réseau Goerli, rendez-vous sur un robinet Goerli et entrez l'adresse de votre compte Goerli. Notez que les robinets Goerli peuvent avoir quelques difficultés de fonctionnement ces derniers temps - consultez la [page des réseaux de test](/developers/docs/networks/#goerli) pour une liste d'options à essayer :

_Note : en raison de la congestion du réseau, cela peut prendre un certain temps._ ``

### Étape 5 : Vérifiez votre solde {#step-5-check-your-balance}

Pour revérifier que l'ETH est dans votre portefeuille, créons une requête

en utilisant [l'outil Composer d'Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Cela va renvoyer la quantité d'ETH dans notre portefeuille. Pour en savoir plus, consultez [le court tutoriel d'Alchemy sur la manière d'utiliser l'outil Composer](https://youtu.be/r6sjRxBZJuU).

Entrez votre adresse de compte MetaMask et cliquez sur **Envoyer la demande**. Vous verrez une réponse qui ressemble au morceau de code ci-dessous.



```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```




> _Note : Ce résultat est en wei, pas en ETH. Le wei est utilisé comme la plus petite dénomination d'ether._

Ouf ! Notre faux argent est bien là.



### Étape 6 : Initialisons notre projet {#step-6-initialize-our-project}

Tout d'abord, nous devons créer un dossier pour notre projet. Accédez à votre ligne de commande et entrez ce qui suit.



```
mkdir hello-world
cd hello-world
```


Maintenant que nous sommes dans le dossier de notre projet, nous allons utiliser `npm init` pour initialiser le projet.



> Si vous n'avez pas encore npm installé, suivez [ces instructions pour installer Node.js et npm](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm).

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


Approuvez le package.json et nous sommes prêts à démarrer !



### Step 7 : Téléchargez Hardhat {#step-7-download-hardhat}

Hardhat est un environnement de développement qui permet de compiler, déployer, tester et déboguer votre logiciel Ethereum. Il aide les développeurs à construire des contrats intelligents et des dApps localement avant de les déployer sur la chaîne en production.

À l'intérieur de notre projet `hello-world`, exécutez :



```
npm install --save-dev hardhat
```


Consultez cette page pour plus de détails sur [les instructions d'installation](https://hardhat.org/getting-started/#overview).



### Étape 8 : Créer un projet Hardhat {#step-8-create-hardhat-project}

Dans le dossier de notre projet`hello-world`, exécutez :



```
npx hardhat
```


Vous devriez maintenant voir un message de bienvenue ainsi qu'une option pour séléctionner ce que vous voulez faire. Sélectionnez : « create an empty hardhat.config.js » :



```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```


Cela générera un fichier `hardhat.config.js` dans le projet. Nous l'utiliserons plus tard dans le tutoriel pour spécifier la configuration de notre projet.



### Étape 9 : Ajouter les dossiers du projet {#step-9-add-project-folders}

Pour garder le projet organisé, créons deux nouveaux dossiers. Dans la ligne de commande, naviguez vers le répertoire racine de votre projet `hello-world` et tapez :



```
mkdir contracts
mkdir scripts
```


- `contrats/` est l'endroit où nous garderons notre fichier de code de contrat intelligent 'hello world'
- `scripts/` est l'endroit où nous garderons les scripts à déployer et pour interagir avec notre contrat



### Étape 10 : Écrire notre contrat {#step-10-write-our-contract}

Vous vous demandez peut-être quand allons-nous enfin écrire du code ? C'est maintenant !

Ouvrez le projet hello-world dans votre éditeur préféré. Les contrats intelligents sont le plus souvent écrits en Solidity, que nous utiliserons pour écrire le notre.

1. Naviguez vers le dossier `contracts` et créez un nouveau fichier appelé `HelloWorld.sol`
2. Ci-dessous se trouve un exemple de contrat intelligent Hello World que nous utiliserons pour ce tutoriel. Copiez le contenu ci-dessous dans le fichier `HelloWorld.sol`.

_Note : Assurez-vous de lire les commentaires pour comprendre ce que fait ce contrat._



```
// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```


Il s'agit d'un contrat intelligent basique qui stocke un message lors de sa création. Il peut être mis à jour en appelant la fonction `update`.



### Étape 11 : Connecter MetaMask & Alchemy à votre projet {#step-11-connect-metamask-alchemy-to-your-project}

Maintenant que nous avons créé un portefeuille Metamask, un compte Alchemy et écrit notre contrat intelligent, il est temps de connecter les trois.

Chaque transaction envoyée depuis votre portefeuille nécessite une signature à l'aide de votre clé privée unique. Pour fournir cette autorisation à notre programme, nous pouvons stocker en toute sécurité notre clé privée dans un fichier d'environnement. Nous y stockerons également une clé API pour Alchemy.



> Pour en savoir plus sur l'envoi de transactions, consultez [ce tutoriel](https://docs.alchemyapi.io/alchemy/tutorials/sending-transactions-using-web3-and-alchemy) sur l'envoi de transactions avec web3.

Premièrement, installez le paquet dotenv dans votre dossier de projet :



```
npm install dotenv --save
```


Ensuite, créez un fichier `.env` dans le répertoire racine du projet. Ajoutez-y votre clé privée MetaMask et l'URL API HTTP d'Alchemy.

Votre fichier d'environnement doit être nommé `.env` ou il ne sera pas reconnu comme un fichier d'environnement.

Ne le nommez pas `process.env` ou `.env-custom` ou autrement.

- Suivez [ces instructions](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) pour exporter votre clé privée
- Voir ci-dessous pour obtenir l'URL de l'API HTTP Alchemy

![Procédure pas à pas animée pour obtenir une clé API Alchemy](./get-alchemy-api-key.gif)

Votre `.env` devrait ressembler à ceci :



```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```


Pour les relier à notre code, nous ferons référence à ces variables dans notre fichier `hardhat.config.js` à l'étape 13.



### Étape 12 : Installer Ethers.js {#step-12-install-ethersjs}

Ethers.js est une bibliothèque qui permet facilement d'interagir et de faire des requêtes pour Ethereum en conditionnant les méthodes [standard JSON-RPC](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) avec des méthodes plus conviviales d'utilisation.

Hardhat nous permet d'intégrer des [plugins](https://hardhat.org/plugins/) pour des outils supplémentaires et des fonctionnalités étendues. Nous allons tirer parti du [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) pour le déploiement de contrats.

Dans votre dossier de projet, tapez :



```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```




### Étape 13 : Mettre à jour hardhat.config.js {#step-13-update-hardhat-configjs}

A ce stade, nous avons ajouté plusieurs dépendances et plugins. Nous devons maintenant mettre à jour `hardhat.config.js` pour que notre projet les reconnaisse.

Mettez à jour votre `hardhat.config.js` pour qu'il ressemble à ceci :



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

Pour s’assurer à ce stade que tout fonctionne, compilons notre contrat. La tâche `compile` est une des tâches intégrées à hardhat.

À partir de la ligne de commande, exécutez :



```bash
npx hardhat compile
```


Vous pourriez voir un avertissement du type `SPDX license identifier not provided in source file`, mais nul besoin de vous inquiéter — espérons que tout le reste fonctionne ! Si ce n'est pas le cas, vous pouvez toujours envoyer un message dans le Discord [Alchemy](https://discord.gg/u72VCg3).



### Étape 15 : Écrire notre script de déploiement {#step-15-write-our-deploy-script}

Maintenant que notre contrat est codé et que notre fichier de configuration est bon, il est temps d’écrire notre script de déploiement pour notre contrat.

Naviguez vers le dossier `scripts/` et créez un nouveau fichier appelé `deploy.js`, en y ajoutant le contenu suivant :



```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // Start deployment, returning a promise that resolves to a contract object
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Contract deployed to address:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```


Hardhat est incroyable en ce sens qu'il explique clairement ce que fait chacune des lignes de code au travers de son [tutoriel sur les contrats](https://hardhat.org/tutorial/testing-contracts.html#writing-tests). Nous avons repris ces explications ici.



```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```


Une `ContractFactory` dans ethers.js est une abstraction utilisée pour déployer de nouveaux contrats intelligents. Ainsi, `HelloWorld` est ici une [usine](https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)) pour des exemples de notre contrat Hello world. Lors de l'utilisation du plugin `hardhat-ethers`, les instances `ContractFactory` et `Contract` sont connectées par défaut au premier signataire (propriétaire).



```javascript
const hello_world = await HelloWorld.deploy()
```


Appeler `deploy()` sur un `ContractFactory` va démarrer le déploiement et retourner une `Promise` qui corrige l'objet `Contract`. C'est l'objet qui a une méthode pour chacune de nos fonctions de contrat intelligent.



### Étape 16 : Déployer notre contrat {#step-16-deploy-our-contract}

Nous sommes enfin prêts à déployer notre contrat intelligent ! Naviguez vers la ligne de commande et exécutez :



```bash
npx hardhat run scripts/deploy.js --network goerli
```


Vous devriez dès lors voir quelque chose comme :



```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```


**Veuillez sauvegarder cette adresse**. Nous l'utiliserons plus tard dans le tutoriel.

Si nous allons sur l'[etherscan Goerli](https://goerli.etherscan.io) et que nous recherchons l'adresse de notre contrat, nous devrions constater qu'il a été déployé avec succès. La transaction ressemblera à ceci :

![](./etherscan-contract.png)

L'adresse `From` devrait correspondre à l'adresse de votre compte MetaMask et l'adresse `To` indiquera **Création de Contrat**. Si nous cliquons sur la transaction, nous verrons l'adresse de notre contrat dans le champ `To`.

![](./etherscan-transaction.png)

Félicitations ! Vous venez de déployer un contrat intelligent sur la chaîne de test d'Ethereum.

Pour comprendre ce qui se passe sous le capot, naviguons dans l'onglet Explorer de notre [tableau de bord Alchemy](https://dashboard.alchemyapi.io/explorer). Si vous avez plusieurs applications Alchemy, assurez-vous de filtrer par application et sélectionnez **Hello World**.

![](./hello-world-explorer.png)

Ici, vous verrez un certain nombre de méthodes JSON-RPC que Hardhat/Ethers a réalisés sous le capot pour nous lorsque nous avons appelé la fonction `.deploy()`. Ici, deux méthodes importantes sont [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), qui est la demande d'écriture de notre contrat sur la chaîne Goerli, et [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash) qui est une requête pour lire des informations sur notre transaction compte tenu du hachage. Pour en savoir plus sur l'envoi de transactions, consultez [notre tutoriel sur l'envoi de transactions avec web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).



## Partie 2 : Interagir avec votre contrat intelligent {#part-2-interact-with-your-smart-contract}

Maintenant que nous avons déployé avec succès un contrat intelligent sur le réseau Goerli, apprenons à interagir avec lui.



### Créez un fichier interact.js {#create-a-interactjs-file}

C'est dans ce fichier que nous écrirons notre script d'interaction. Nous utiliserons la bibliothèque Ethers.js que vous avez précédemment installée dans la Partie 1.

À l'intérieur du dossier `scripts/`, créez un nouveau fichier nommé `interact.js` et ajoutez le code suivant :



```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```




### Mettez à jour votre fichier .env {#update-your-env-file}

Nous utiliserons de nouvelles variables d'environnement, donc nous devons les définir dans le fichier `.env` que [nous avons créé précédemment](#step-11-connect-metamask-&-alchemy-to-your-project).

Nous devrons ajouter une définition pour notre `API_KEY` Alchemy et la `CONTRACT_ADDRESS` où votre contrat intelligent a été déployé.

Votre fichier `.env` devrait ressembler à ceci :



```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```




### Obtenez votre ABI de contrat {#grab-your-contract-ABI}

Notre [ABI de contrat (Interface Binaire d'Application)](/glossary/#abi) est l'interface pour interagir avec notre contrat intelligent. Hardhat génère automatiquement un ABI et le sauvegarde dans `HelloWorld.json`. Pour utiliser l'ABI, nous devons en extraire le contenu en ajoutant les lignes de code suivantes à notre fichier `interact.js` :



```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```


Si vous voulez lire l'ABI, vous pouvez l'afficher dans votre console :



```javascript
console.log(JSON.stringify(contract.abi))
```


Pour voir votre ABI affiché dans la console, naviguez vers votre terminal et exécutez :



```bash
npx hardhat run scripts/interact.js
```




### Créez une instance de votre contrat {#create-an-instance-of-your-contract}

Pour interagir avec notre contrat, nous devons créer une instance de contrat dans notre code. Pour ce faire avec Ethers.js, nous devrons travailler avec trois concepts :

1. Fournisseur - un fournisseur de nœud qui vous donne un accès en lecture et écriture à la blockchain
2. Signataire - représente un compte Ethereum pouvant signer des transactions
3. Contrat - un objet Ethers.js représentant un contrat spécifique déployé sur la chaîne

Nous utiliserons l'ABI de contrat de l'étape précédente pour créer notre instance du contrat :



```javascript
// interact.js

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Contract
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```


En savoir plus sur les Fournisseurs, les Signataires, et les Contrats dans la [documentation d'ethers.js](https://docs.ethers.io/v5/).



### Lisez le message d'initialisation {#read-the-init-message}

Vous souvenez-vous lorsque nous avons déployé notre contrat avec `initMessage = "Hello world!"` ? Nous allons maintenant lire ce message stocké dans notre contrat intelligent et l'afficher sur la console.

En JavaScript, des fonctions asynchrones sont utilisées lors de l'interaction avec des réseaux. Pour en savoir plus sur les fonctions asynchrones, [lisez cet article sur Medium](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

Utilisez le code ci-dessous pour appeler la fonction `message` dans notre contrat intelligent et lire le message d'initialisation :



```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```


Après avoir exécuté le fichier en utilisant `npx hardhat run scripts/interact.js` dans le terminal, nous devrions voir cette réponse :



```
The message is: Hello world!
```


Félicitations ! Vous venez de lire avec succès des données de contrat intelligent depuis la blockchain Ethereum, bravo !



### Mettre à jour le message {#update-the-message}

Au lieu de simplement lire le message, nous pouvons également mettre à jour le message sauvegardé dans notre contrat intelligent en utilisant la fonction `update` ! Plutôt cool, n'est-ce pas ?

Pour mettre à jour le message, nous pouvons appeler directement la fonction `update` sur notre objet Contract :



```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("This is the new message.")
  await tx.wait()
}
main()
```


Notez qu'à la ligne 11, nous faisons un appel à `.wait()` sur l'objet de transaction renvoyé. Cela garantit que notre script attend que la transaction soit exécutée sur la blockchain avant de quitter la fonction. Si l'appel `.wait()` n'est pas inclus, le script peut ne pas voir la valeur du `message` mis à jour dans le contrat.



### Lisez le nouveau message {#read-the-new-message}

Vous devriez pouvoir répéter [l'étape précédente](#read-the-init-message) pour lire la valeur du `message` mis à jour. Prenez un moment et voyez si vous pouvez apporter les modifications nécessaires pour afficher cette nouvelle valeur !

Si vous avez besoin d'un indice, voici à quoi devrait ressembler votre fichier `interact.js` à ce stade :



```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// signer - you
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// contract instance
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("this is the new message")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("The new message is: " + newMessage)
}

main()
```


Exécutez simplement le script et vous devriez pouvoir voir l'ancien message, le statut de la mise à jour, et le nouveau message affiché sur votre terminal !

`npx hardhat run scripts/interact.js --network goerli`



```
The message is: Hello World!
Updating the message...
The new message is: This is the new message.
```


Lors de l'exécution de ce script, vous remarquerez peut-être que l'étape `Mise à jour du message...` prend du temps à charger avant que le nouveau message ne s'affiche. Cela est dû au processus de minage ; si vous êtes curieux de suivre les transactions pendant qu'elles sont en cours de minage, visitez la [mempool d'Alchemy](https://dashboard.alchemyapi.io/mempool) pour voir le statut d'une transaction. Si la transaction est abandonnée, il est également utile de consulter [Goerli Etherscan](https://goerli.etherscan.io) et de rechercher votre hash de transaction.



## Partie 3 : Publier votre Contrat Intelligent sur Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

Vous avez fait tout le travail difficile pour donner vie à votre contrat intelligent ; il est maintenant temps de le partager avec le monde !

En vérifiant votre contrat intelligent sur Etherscan, tout le monde peut voir votre code source et interagir avec votre contrat intelligent. Commençons !



### Étape 1 : Générez une clé API sur votre compte Etherscan {#step-1-generate-an-api-key-on-your-etherscan-account}

Une clé API Etherscan est nécessaire pour vérifier que vous possédez le contrat intelligent que vous essayez de publier.

Si vous n'avez pas encore de compte Etherscan, [inscrivez-vous](https://etherscan.io/register).

Une fois connecté, trouvez votre nom d'utilisateur dans la barre de navigation, passez votre souris dessus et sélectionnez le bouton **Mon profil**.

Sur votre page de profil, vous devriez voir une barre de navigation latérale. Dans cette barre de navigation, sélectionnez **Clés API**. Ensuite, appuyez sur le bouton « Ajouter » pour créer une nouvelle clé API, nommez votre application **hello-world** et appuyez sur le bouton **Créer une nouvelle clé API**.

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




### Contrats intelligents déployés avec Hardhat {#hardhat-deployed-smart-contracts}



#### Installez hardhat-etherscan {#install-hardhat-etherscan}

Publier votre contrat sur Etherscan à l'aide de Hardhat est simple. Vous devrez d'abord installer le plugin `hardhat-etherscan` pour commencer. `hardhat-etherscan` vérifiera automatiquement le code source et l'ABI du contrat intelligent sur Etherscan. Pour l'ajouter, dans le répertoire `hello-world`, exécutez :



```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```


Une fois installé, incluez la déclaration suivante en haut de votre fichier `hardhat.config.js`, et ajoutez les options de configuration d'Etherscan :



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
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
}
```




#### Vérifiez votre contrat intelligent sur Etherscan {#verify-your-smart-contract-on-etherscan}

Assurez-vous que tous les fichiers sont sauvegardés et que toutes les variables `.env` sont correctement configurées.

Exécutez la tâche `verify`, en envoyant l'adresse du contrat et le réseau sur lequel il est déployé :



```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```


Assurez-vous que `DEPLOYED_CONTRACT_ADDRESS` est l'adresse de votre contrat intelligent déployé sur le réseau de test Goerli. De plus, le dernier argument (`Hello World!`) doit être la même valeur de chaîne utilisée lors de [l'étape de déploiement de la partie 1](#write-our-deploy-script).

Si tout se passe bien, vous verrez le message suivant dans votre terminal :



```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```


Félicitations ! Votre code de contrat intelligent est sur Etherscan !



### Votre code de contrat intelligent est sur Etherscan ! {#check-out-your-smart-contract-on-etherscan}

Lorsque vous naviguez vers le lien fourni dans votre terminal, vous devriez pouvoir voir votre code de contrat intelligent et ABI publié sur Etherscan !

**Wahooo - vous l'avez fait, champion ! Désormais, n'importe qui peut appeler ou écrire à votre contrat intelligent ! Nous sommes impatients de voir ce que vous construirez ensuite !**



## Partie 4 - Intégration de votre contrat intelligent avec l'interface utilisateur {#part-4-integrating-your-smart-contract-with-the-frontend}

À la fin de ce tutoriel, vous saurez comment :

- Connecter un portefeuille MetaMask à votre dapp
- Lire les données de votre contrat intelligent en utilisant l'API [Web3 d'Alchemy](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Signer des transactions Ethereum en utilisant MetaMask

Pour cette DApp, nous utiliserons [React](https://reactjs.org/) comme cadre d'interface utilisateur ; cependant, il est important de noter que nous ne passerons pas beaucoup de temps à décomposer ses fondamentaux, car nous nous concentrerons principalement sur l'ajout de la fonctionnalité Web3 à notre projet.

En prérequis, vous devriez avoir une compréhension de niveau débutant de React. Sinon, nous recommandons de compléter le tutoriel officiel [Introduction à React](https://reactjs.org/tutorial/tutorial.html).



### Cloner les fichiers de démarrage {#clone-the-starter-files}

Tout d'abord, allez au [dépôt GitHub hello-world-part-four](https://github.com/alchemyplatform/hello-world-part-four-tutorial) pour obtenir les fichiers de départ de ce projet et clonez ce dépôt sur votre machine locale.

Ouvrez le dépôt cloné localement. Remarquez qu'il contient deux dossiers : `starter-files` et `completed`.

- `starter-files`-**nous travaillerons dans ce répertoire**, nous connecterons l'UI à votre portefeuille Ethereum et le contrat intelligent que nous avons publié sur Etherscan lors de la [Partie 3](#part-3).
- `completed` contient l'ensemble du tutoriel terminé et ne doit être utilisé que comme référence si vous êtes bloqué.

Ensuite, ouvrez votre copie de `starter-files` avec votre éditeur de code préféré, puis naviguez dans le dossier `src`.

Tout le code que nous allons écrire restera dans le dossier `src`. Nous modifierons le composant `HelloWorld.js` et les fichiers JavaScript `util/interact.js` pour donner à notre projet des fonctionnalités Web3.



### Consultez les fichiers de départ {#check-out-the-starter-files}

Avant de commencer à coder, explorons ce qui nous est fourni dans les fichiers de départ.



#### Faites tourner votre projet de React {#get-your-react-project-running}

Commençons par exécuter le projet React dans notre navigateur. La beauté de React est qu'une fois que notre projet est en cours d'exécution dans notre navigateur, toutes les modifications que nous sauvegardons seront mises à jour en direct dans notre navigateur.

Pour faire fonctionner le projet, accédez au répertoire racine du dossier `starter-files` et exécutez `npm install` dans votre terminal pour installer les dépendances du projet :



```bash
cd starter-files
npm install
```


Une fois l'installation terminée, exécutez `npm start` dans votre terminal :



```bash
npm start
```


Cela devrait ouvrir [http://localhost:3000/](http://localhost:3000/) dans votre navigateur, où vous verrez l'interface utilisateur pour notre projet. Elle devrait se composer d'un champ \(a un endroit pour mettre à jour le message stocké dans votre contrat intelligent\), d'un bouton « Connecter le portefeuille » et d'un bouton « Mettre à jour ».

Si vous essayez de cliquer sur l'un ou l'autre des boutons, vous remarquerez qu'ils ne fonctionnent pas - c'est parce que nous devons encore programmer leur fonctionnalité.



#### Le composant `HelloWorld.js` {#the-helloworld-js-component}

Retournons dans le dossier `src` de notre éditeur et ouvrons le fichier `HelloWorld.js`. Il est très important de comprendre tout ce qui se trouve dans ce fichier, car c'est le composant principal de React sur lequel nous allons travailler.

En haut de ce fichier, vous remarquerez que nous avons plusieurs instructions d'importation nécessaires pour faire fonctionner notre projet, notamment la bibliothèque React, les accroches useEffect et useState, certains éléments de `./util/interact.js` (nous les décrirons plus en détail bientôt !), et le logo Alchemy.



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

//State variables
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```


Voici ce que chacune des variables représente :

- `walletAddress` - une chaîne de caractère qui stocke l'adresse du portefeuille de l'utilisateur
- `status` - une chaîne de caractères qui stocke un message utile guidant l'utilisateur sur la façon d'interagir avec la DApp
- `message` - une chaîne qui stocke le message actuel dans le contrat intelligent
- `newMessage` - une chaîne qui stocke le nouveau message qui sera écrit dans le contrat intelligent

Après les variables d'état, vous verrez cinq fonctions non implémentées : `useEffect` ,`addSmartContractListener`, `addWalletListener` , `connectWalletPressed`, et `onUpdatePressed`. Nous expliquerons ce qu'elles font ci-dessous :



```javascript
// HelloWorld.js

//called only once
useEffect(async () => {
  //TODO: implement
}, [])

function addSmartContractListener() {
  //TODO: implement
}

function addWalletListener() {
  //TODO: implement
}

const connectWalletPressed = async () => {
  //TODO: implement
}

const onUpdatePressed = async () => {
  //TODO: implement
}
```


- [`useEffect`](https://reactjs.org/docs/hooks-effect.html) - c'est une accroche React qui est appelé après que votre composant est rendu. Comme il a un tableau vide `[]` passé en prop (voir ligne 4), il ne sera appelé qu'au _premier_ rendu du composant. Ici, nous chargerons le message actuel stocké dans notre contrat intelligent, appellerons nos écouteurs de contrat intelligent et de portefeuille, et mettrons à jour notre interface pour refléter si un portefeuille est déjà connecté.
- `addSmartContractListener` - cette fonction configure un écouteur qui surveillera l'événement `UpdatedMessages` de notre contrat HelloWorld et mettra à jour notre interface lorsque le message sera modifié dans notre contrat intelligent.
- `addWalletListener` - cette fonction configure un écouteur qui détecte les changements dans l'état du portefeuille MetaMask de l'utilisateur, par exemple lorsque l'utilisateur déconnecte son portefeuille ou change d'adresse.
- `connectWalletPressed`- cette fonction sera appelée pour connecter le portefeuille MetaMask de l'utilisateur à notre DApp.
- `onUpdatePressed` - cette fonction sera appelée lorsque l'utilisateur souhaite mettre à jour le message stocké dans le contrat intelligent.

Vers la fin de ce fichier, nous avons l'interface utilisateur de notre composant.



```javascript
// HelloWorld.js

//the UI of our component
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Current Message:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>New Message:</h2>

    <div>
      <input
        type="text"
        placeholder="Update the message in your smart contract."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Update
      </button>
    </div>
  </div>
)
```


Si vous examinez attentivement ce code, vous remarquerez où nous utilisons nos différentes variables d'état dans notre interface :

- Aux lignes 6-12, si le portefeuille de l'utilisateur est connecté \(c'est-à-dire si `walletAddress.length > 0`\), nous affichons une version tronquée de `walletAddress` de l'utilisateur dans le bouton avec l'ID « walletButton » ; sinon, il indique simplement « Connecter le portefeuille. »
- À la ligne 17, nous affichons le message actuel stocké dans le contrat intelligent, qui est inclus dans la chaîne de caractères `message`.
- Aux lignes 23-26, nous utilisons un [composant contrôlé](https://reactjs.org/docs/forms.html#controlled-components) pour mettre à jour notre variable d'état `newMessage` lorsque l'entrée dans le champ de texte change.

En plus de nos variables d'état, vous verrez également que les fonctions `connectWalletPressed` et `onUpdatePressed` sont appelées lorsque les boutons avec les ID `publishButton` et `walletButton` sont cliqués respectivement.

Enfin, regardons où ce composant `HelloWorld.js` est ajouté.

Si vous allez au fichier `App.js`, qui est le composant principal dans React qui sert de conteneur pour tous les autres composants, vous verrez que notre composant `HelloWorld.js` est injecté à la ligne 7.

En dernier lieu, vérifions un autre fichier fourni pour vous, le fichier `interact.js`.



#### Le fichier `interact.js` {#the-interact-js-file}

Pour respecter le paradigme [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) , nous voulons un fichier séparé qui contient toutes nos fonctions pour gérer la logique, les données, et les règles de notre DApp, puis nous pourrons passer ces fonctions à notre interface \(notre composant `HelloWorld.js` \).

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

- `loadCurrentMessage` - cette fonction gère la logique du chargement du message actuel stocké dans le contrat intelligent. Elle effectuera un appel en _lecture_ au contrat intelligent Hello World en utilisant [l'API Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).
- `connectWallet` - cette fonction connectera le portefeuille MetaMask de l'utilisateur à notre DApp.
- `getCurrentWalletConnected` - cette fonction vérifiera si un compte Ethereum est déjà connecté à notre DApp lors du chargement de la page et mettra à jour notre interface en conséquence.
- `updateMessage` - cette fonction mettra à jour le message stocké dans le contrat intelligent. Elle effectuera un appel en _écriture_ au contrat intelligent Hello World, donc le portefeuille MetaMask de l'utilisateur devra signer une transaction Ethereum pour mettre à jour le message.

Maintenant que nous comprenons avec quoi nous travaillons, voyons comment lire notre contrat intelligent !



### Étape 3 : Lire à partir de votre contrat intelligent {#step-3-read-from-your-smart-contract}

Pour lire à partir de votre contrat intelligent, vous devrez configurer correctement :

- Une connexion API à la chaîne Ethereum
- Une instance chargée de votre contrat intelligent
- Une fonction pour appeler votre fonction de contrat intelligent
- Un écouteur pour surveiller les mises à jour lorsque les données que vous lisez du contrat intelligent changent

Cela peut sembler beaucoup d'étapes, mais ne vous inquiétez pas ! Nous allons vous guider étape par étape ! :\)



#### Établir une connexion API à la chaîne Ethereum {#establish-an-api-connection-to-the-ethereum-chain}

Rappelez-vous, dans la Partie 2 de ce tutoriel, comment nous avons utilisé notre clé [Web3 Alchemy pour lire à partir de notre contrat intelligent](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library) ? Vous aurez également besoin d'une clé Web3 Alchemy dans votre DApp pour lire à partir de la chaîne.

Si vous ne l'avez pas déjà fait, installez d'abord [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) en naviguant vers le répertoire racine de vos `starter-files` et en exécutant la commande suivante dans votre terminal :



```text
npm install @alch/alchemy-web3
```


[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) est un wrapper autour de [Web3.js](https://docs.web3js.org/), fournissant des méthodes API améliorées et d'autres avantages pour faciliter votre vie en tant que développeur Web3. Il est conçu pour nécessiter une configuration minimale afin que vous puissiez commencer à l'utiliser immédiatement dans votre application !

Ensuite, installez le paquet [dotenv](https://www.npmjs.com/package/dotenv) dans le répertoire de votre projet, afin d'avoir un endroit sécurisé pour stocker notre clé API après l'avoir récupérée.



```text
npm install dotenv --save
```


Pour notre dapp, **nous utiliserons notre clé API Websockets** au lieu de notre clé API HTTP, car elle nous permettra d'écouteur pour détecter lorsque le message stocké dans le contrat intelligent change.

Une fois que vous avez votre clé API, créez un fichier `.env` dans votre répertoire racine et ajoutez-y votre URL Websockets Alchemy. Ensuite, votre fichier `.env` devrait ressembler à cela :



```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```


Maintenant, nous sommes prêts à configurer notre point de terminaison Web3 Alchemy dans notre DApp ! Retournons à notre `interact.js`, qui est niché à l'intérieur de notre dossier `util` et ajoutons le code suivant en haut du fichier :



```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```


Ci-dessus, nous avons d'abord importé la clé Alchemy de notre fichier `.env`, puis nous avons passé notre `alchemyKey` à `createAlchemyWeb3` pour établir notre point de terminaison Web3 Alchemy.

Avec ce point de terminaison prêt, il est temps de charger notre contrat intelligent Hello World !



#### Chargement de votre contrat intelligent Hello World {#loading-your-hello-world-smart-contract}

Pour charger votre contrat intelligent Hello World, vous aurez besoin de son adresse de contrat et de son ABI, tous deux disponibles sur Etherscan si vous avez terminé [la Partie 3 de ce tutoriel.](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)



#### Comment obtenir votre ABI de contrat depuis Etherscan {#how-to-get-your-contract-abi-from-etherscan}

Si vous avez ignoré la Partie 3 de ce tutoriel, vous pouvez utiliser le contrat HelloWorld avec l'adresse [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code). Son ABI se trouve [ici](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

Un ABI de contrat est nécessaire pour spécifier quelle fonction un contrat invoquera et pour garantir que la fonction renverra des données dans le format que vous attendez. Une fois que nous avons copié notre ABI de contrat, sauvegardons-le en tant que fichier JSON appelé `contract-abi.json` dans votre répertoire `src`.

Votre contract-abi.json doit être stocké dans votre dossier src.

Armé de notre adresse de contrat, de notre ABI, et de notre point de terminaison Web3 Alchemy, nous pouvons utiliser [la méthode de contrat](https://docs.web3js.org/api/web3-eth-contract/class/Contract) pour charger une instance de notre contrat intelligent. Importez votre ABI de contrat dans le fichier `interact.js` et ajoutez votre adresse de contrat.



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


Maintenant que nous avons notre contrat chargé, nous pouvons implémenter notre fonction `loadCurrentMessage` !



#### Implémenter `loadCurrentMessage` dans votre fichier `interact.js` {#implementing-loadCurrentMessage-in-your-interact-js-file}

Cette fonction est très simple. Nous allons effectuer un simple appel web3 asynchrone pour lire notre contrat. Notre fonction renverra le message stocké dans le contrat intelligent :

Mettez à jour la fonction `loadCurrentMessage` dans votre fichier `interact.js` comme suit :



```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```


Puisque nous voulons afficher ce contrat intelligent dans notre interface utilisateur, mettons à jour la fonction `useEffect` dans notre composant `HelloWorld.js` comme suit :



```javascript
// HelloWorld.js

//called Orly once
useEffect(async () => {
  const message = await loadCurrentMessage()
  sertissage(message)
}, [])
```


Notez que nous voulons que notre `loadCurrentMessage` soit appelé une seule fois lors du premier rendu du composant. Nous allons bientôt implémenter `addSmartContractListener` pour mettre à jour automatiquement l'interface utilisateur après la modification du message dans le contrat intelligent.

Avant de plonger dans notre système d'écoute, voyons ce que nous avons jusqu'à présent ! Sauvegardez vos fichiers `HelloWorld.js` et `interact.js`, puis allez sur [http://localhost:3000/](http://localhost:3000/)

Vous remarquerez que le message actuel ne dit plus « Pas de connexion au réseau. » Au lieu de cela, il reflète le message stocké dans le contrat intelligent. C'est fou !



#### Votre interface utilisateur devrait maintenant refléter le message stocké dans le contrat intelligent {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

Maintenant, parlons de cet écouteur...



#### Mettre en œuvre `addSmartContractListener` {#implement-addsmartcontractlistener}

Si vous repensez au fichier `HelloWorld.sol` que nous avons écrit dans [la première partie de cette série de tutoriels](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract), vous vous souviendrez qu'il y a un événement de contrat intelligent appelé `UpdatedMessages` qui est émis après que la fonction `update` de notre contrat intelligent soit invoquée \(voir les lignes 9 et 27\) :



```javascript
// HelloWorld.sol

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```


Les événements de contrat intelligent sont un moyen pour votre contrat d'indiquer qu'un événement s'est produit (c'est-à-dire qu'il y a eu un _événement_) sur la blockchain à votre application front-end, qui peut « écouter » des événements spécifiques et agir lorsqu'ils se produisent.

La fonction `addSmartContractListener` va spécifiquement écouter l'événement `UpdatedMessages` de notre contrat intelligent Hello World et mettre à jour notre interface utilisateur pour afficher le nouveau message.

Modifiez `addSmartContractListener` de la manière suivante :



```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 Your message has been updated!")
    }
  })
}
```


Décortiquons ce qui se passe lorsque l'écouteur détecte un événement :

- Si une erreur se produit lorsque l'événement est émis, elle sera reflétée dans l'interface utilisateur via notre variable d'état `status`.
- Sinon, nous utiliserons l'objet `data` renvoyé. Le `data.returnValues` est un tableau indexé à zéro où le premier élément du tableau stocke le message précédent et le deuxième élément stocke le message mis à jour. En somme, lors d'un événement réussi, nous définirons notre chaîne de `message` sur le message mis à jour, effacerons la chaîne `newMessage` et mettrons à jour notre variable d'état `status` pour indiquer qu'un nouveau message a été publié sur notre contrat intelligent.

Enfin, appelons notre écouteur dans notre fonction `useEffect` afin qu'il soit initialisé lors du premier rendu du composant `HelloWorld.js`. Dans l'ensemble, votre fonction `useEffect` devrait ressembler à ceci :



```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```


Maintenant que nous sommes capables de lire notre contrat intelligent, il serait bien de savoir comment y écrire aussi ! Cependant, pour écrire sur notre dapp, nous devons d'abord avoir un portefeuille Ethereum connecté à celle-ci.

Alors, ensuite, nous aborderons la configuration de notre portefeuille Ethereum (MetaMask) et sa connexion à notre dapp !



### Étape 4 : Configurez votre portefeuille Ethereum {#step-4-set-up-your-ethereum-wallet}

Pour écrire quoi que ce soit sur la chaîne Ethereum, les utilisateurs doivent signer des transactions à l'aide des clés privées de leur portefeuille virtuel. Pour ce tutoriel, nous utiliserons [MetaMask](https://metamask.io/), un portefeuille virtuel dans le navigateur utilisé pour gérer votre adresse de compte Ethereum, car il rend cette signature de transaction très facile pour l'utilisateur final.

Si vous voulez en savoir plus sur le fonctionnement des transactions sur Ethereum, consultez [cette page](/developers/docs/transactions/) de la fondation Ethereum.



#### Téléchargez MetaMask {#download-metamask}

Vous pouvez télécharger et créer un compte MetaMask gratuitement [ici](https://metamask.io/download). Lorsque vous créez un compte, ou si vous en avez déjà un, assurez-vous de basculer vers le « Goerli Test Network » en haut à droite \(afin que nous ne traitions pas avec de l'argent réel\).



#### Ajoutez de l'ether depuis un Robinet {#add-ether-from-a-faucet}

Pour signer une transaction sur la blockchain Ethereum, nous aurons besoin de faux Eth. Pour obtenir de l'Eth, vous pouvez aller sur [FaucETH](https://fauceth.komputing.org) et entrer votre adresse de compte Goerli, cliquer sur « Demander des fonds », puis sélectionner « Ethereum Testnet Goerli » dans le menu déroulant et enfin cliquer à nouveau sur le bouton « Demander des fonds ». Vous devriez voir les ETH dans votre compte MetaMask peu de temps après !



#### Vérifiez votre solde {#check-your-balance}

Pour revérifier que votre solde est correct, faisons une requête [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) en utilisant [l'outil Alchemy Composer](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Cela va retourner la quantité d'ETH que contient votre portefeuille. Après avoir entré l'adresse de votre compte MetaMask et cliqué sur « Send Request », vous devriez voir une réponse comme celle-ci :



```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```


**REMARQUE :** Ce résultat est en wei et non pas en ETH. Le wei est utilisé comme la plus petite dénomination d'ether. La conversion de wei vers eth est : 1 eth = 10¹⁸ wei. Donc si on convertit 0xde0b6b3a7640000 en nombre décimal, nous obtenons 1\*10¹⁸ ce qui correspond à 1 eth.

Ouf ! Notre faux argent est bien là ! 🤑



### Étape 5 : Connectez MetaMask à votre interface utilisateur {#step-5-connect-metamask-to-your-UI}

Maintenant que notre portefeuille MetaMask est configuré, connectons-y notre dApp !



#### La fonction `connectWallet` {#the-connectWallet-function}

Dans notre fichier `interact.js`, implémentons la fonction `connectWallet`, que nous pourrons ensuite appeler dans notre composant `HelloWorld.js`.

Modifions `connectWallet` comme suit :



```javascript
// interact.js

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
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
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```


Qu'est-ce que cet immense bloc de code fait exactement ?

Eh bien, premièrement, il vérifie si `window.ethereum` est activé dans votre navigateur.

`window.ethereum` est une API globale injectée par MetaMask et d'autres fournisseurs de portefeuille qui permet aux sites web de faire des requêtes vers les comptes Ethereum des utilisateurs. Si approuvé, il peut lire des données des blockchains auxquelles l'utilisateur est connecté et suggérer que l'utilisateur signe des messages et des transactions. Consultez la [documentation MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) pour plus d'infos !

Si `window.ethereum` _n'est pas_ présent, alors cela signifie que Metamask n'est pas installé. Cela se traduit par un objet JSON retourné, où l'attribut `adresse` retourné est une chaîne vide, et le `status` de l'objet JSX indique que l'utilisateur doit installer MetaMask.

Maintenant, si `window.ethereum` _est présent_, alors c'est là que les choses deviennent intéressantes.

À l'aide d'une boucle try/catch, nous essaierons de nous connecter à MetaMask en appelant[`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). L'appel de cette fonction ouvrira MetaMask dans le navigateur, où l'utilisateur sera invité à connecter son portefeuille à votre dApp.

- Si l'utilisateur choisit de se connecter, `method: "eth_requestAccounts"` retournera un tableau contenant toutes les adresses de compte de l'utilisateur qui sont connectées à la DApp. Au final, notre fonction `connectWallet` retourne un objet JSON qui contient la _première_ `address` dans cette table \(voir ligne 9\\) et un message `status` qui invite l'utilisateur à écrire un message sur le contrat intelligent.
- Si l'utilisateur rejette la connexion, alors l'objet JSON contiendra une chaîne vide pour l'`address` retournée et un message `status` qui indique que l'utilisateur a rejeté la connexion.

Maintenant que nous avons écrit cette fonction `connectWallet`, la prochaine étape est de l'appeler dans notre composant `HelloWorld.js`.



#### Ajoutez la fonction `connectWallet` à votre composant UI `HelloWorld.js` {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

Naviguez vers la fonction `connectWalletPressed` dans `HelloWorld.js`, et mettez-la à jour comme suit :



```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```


Remarquez comment la plupart de nos fonctionnalités sont abstraites de notre composant `HelloWorld.js` à partir du fichier `interact.js` ? C'est ainsi que nous respectons le paradigme M-V-C !

Dans `connectWalletPressed`, nous faisons simplement un appel await à notre fonction importée `connectWallet`, et en utilisant sa réponse, nous mettons à jour nos variables `status` et `walletAddress` via leurs hooks d'états.

Maintenant, sauvegardez les deux fichiers \(`HelloWorld.js` et `interact.js`\) et testez notre interface jusqu'à présent.

Ouvrez votre navigateur sur la page [http://localhost:3000/](http://localhost:3000/), et appuyez sur le bouton « Connecter le portefeuille » en haut à droite de la page.

Si MetaMask est installé, vous devriez être invité à connecter votre portefeuille à votre dApp. Accepter l'invitation à se connecter.

Vous devriez voir que le bouton du portefeuille reflète maintenant le fait que votre adresse est connectée ! Incroyable 🔥

Ensuite, essayez de rafraîchir la page... c'est étrange. Notre bouton de portefeuille nous invite à connecter MetaMask bien qu'il soit déjà connecté...

Mais n'ayez crainte ! Nous pouvons facilement résoudre cela (compris ?) en implémentant la fonction `getCurrentWalletConnected`, qui vérifiera si une adresse est déjà connectée à notre dapp et mettra à jour notre interface en conséquence !



#### La fonction `getCurrentWalletConnected` {#the-getcurrentwalletconnected-function}

Mettez à jour votre fonction `getCurrentWalletConnected` dans le fichier `interact.js` comme suit :



```javascript
// interact.js

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
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
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```


Ce code est _très_ similaire à la fonction `connectWallet` que nous venons d'écrire à l'étape précédente.

La différence principale est qu'au lieu d'appeler la méthode `eth_requestAccounts`, qui ouvre MetaMask pour que l'utilisateur puisse connecter son portefeuille, ici nous appelons la méthode `eth_accounts`, qui renvoie simplement un tableau contenant les adresses MetaMask actuellement connectées à notre dApp.

Pour voir cette fonction en action, appelons-la dans notre fonction `useEffect` de notre composant `HelloWorld.js` :



```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```


Remarquez que nous utilisons la réponse de notre appel à `getCurrentWalletConnected` pour mettre à jour nos variables d'état `walletAddress` et `status`.

Maintenant que vous avez ajouté ce code, essayons de rafraîchir la fenêtre de notre navigateur.

Magnifique ! Le bouton devrait indiquer que vous êtes connecté et afficher un aperçu de l'adresse de votre portefeuille connecté, même après avoir été actualisé !



#### Mettre en œuvre `addWalletListener` {#implement-addwalletlistener}

La dernière étape de la configuration de notre dApp de portefeuille consiste à mettre en place le listener de portefeuille afin que notre interface utilisateur soit mise à jour lorsque l'état de notre portefeuille change, par exemple lorsque l'utilisateur se déconnecte ou change de compte.

Dans votre fichier `HelloWorld.js`, modifiez votre fonction `addWalletListener` comme suit :



```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```


Je parie que vous n'avez même pas besoin de notre aide pour comprendre ce qui se passe ici à ce stade, mais pour des raisons de rigueur, décomposons rapidement :

- Premièrement, notre fonction vérifie si `window.ethereum` est activé \(ex. : MetaMask est installé\).
    - Si ce n'est pas le cas, nous fixons simplement notre variable d'état `status` à une chaîne de caractères JSX qui invite l'utilisateur à installer MetaMask.
  - S'il est activé, nous configurons le listener `window.ethereum.on("accountsChanged")` à la ligne 3 qui écoute les changements d'état dans le portefeuille MetaMask, qui les incluent lorsque l'utilisateur connecte un compte additionnel à la dApp, change de compte ou déconnecte un compte. S'il existe au moins un compte connecté, la variable d'état `walletAddress` est mise à jour comme premier compte dans le tableau des comptes `accounts` retourné par l'écouteur. Sinon, `walletAdresse` est défini comme une chaîne de caractères vide.

Enfin et surtout, nous devons l'appeler dans notre fonction `useEffect` :



```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```


Et voilà ! Nous avons réussi à programmer toute notre fonctionnalité de portefeuille ! Passons maintenant à notre dernière tâche : mettre à jour le message stocké dans notre contrat intelligent !



### Étape 6 : Implémentez la fonction `updateMessage` {#step-6-implement-the-updateMessage-function}

Alright, nous sommes dans la dernière ligne droite ! Dans la fonction `updateMessage` de votre fichier `interact.js`, nous allons faire ce qui suit :

1. Vérifiez que le message que nous souhaitons publier dans notre contrat intelligent est valide
2. Signez notre transaction à l'aide de MetaMask
3. Appelez cette fonction depuis notre composant d'interface `HelloWorld.js`

Cela ne prendra pas très longtemps ; terminons cette dapp !



#### Gestion des erreurs d'entrée {#input-error-handling}

Naturellement, il est logique de disposer d'une sorte de gestion des erreurs d'entrée au début de la fonction.

Nous souhaitons que notre fonction se termine rapidement s'il n'y a pas d'extension MetaMask installée, si aucun portefeuille n'est connecté \(c'est-à-dire si l'`adresse` transmise est une chaîne vide) ou si le `message` est une chaîne vide. Ajoutons la gestion des erreurs suivante à `updateMessage` :



```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connecter votre portefeuille MetaMask pour mettre à jour le message sur la blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Votre message ne peut pas être vide.",
    }
  }
}
```


Maintenant que nous avons une gestion d'erreur d'entrée appropriée, il est temps de signer la transaction via MetaMask !



#### Signer notre transaction {#signing-our-transaction}

Si vous êtes déjà à l'aise avec les transactions Ethereum web3 traditionnelles, le code que nous écrirons ensuite vous sera très familier. Sous votre code de gestion d'erreur d'entrée, ajoutez ce qui suit à `updateMessage` :



```javascript
// interact.js

//set up transaction parameters
const transactionParameters = {
  to: contractAddress, // Required except during contract publications.
  from: address, // must match user's active address.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//sign the transaction
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
          View the status of your transaction on Etherscan!
        </a>
        <br />
        ℹ️ Once the transaction is verified by the network, the message will be
        updated automatically.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```


Décortiquons ce qui se passe. Premièrement, nous configurons les paramètres de notre transaction, où :

- `to` spécifie l'adresse du destinataire \(notre contrat intelligent)
- `from` spécifie le signataire de la transaction, la variable `adresse` que nous avons passée à notre fonction
- `data` contient l'appel à la méthode `update` de notre contrat Hello World, recevant notre variable de chaîne `message` en entrée

Ensuite, nous faisons un appel en attente, `window.ethereum.request`, où nous demandons à MetaMask de signer la transaction. Remarquez que, aux lignes 11 et 12, nous spécifions notre méthode eth, `eth_sendTransaction` et passons nos `transactionParameters`.

À ce stade, MetaMask s'ouvrira dans le navigateur, et demandera à l'utilisateur de signer ou rejeter la transaction.

- Si la transaction réussit, la fonction renverra un objet JSON où la chaîne `status` du JSX invite l'utilisateur à consulter Etherscan pour plus d'informations sur sa transaction.
- Si la transaction échoue, la fonction renverra un objet JSON où la chaîne `status` relaie le message d'erreur.

Dans l'ensemble, notre fonction `updateMessage` devrait ressembler à cela :



```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }

  //set up transaction parameters
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //sign the transaction
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
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
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


Enfin, nous devons connecter notre fonction `updateMessage` à notre composant `HelloWorld.js`.



#### Connectez `updateMessage` à l'interface de `HelloWorld.js` {#connect-updatemessage-to-the-helloworld-js-frontend}

Notre fonction `onUpdatePressed` devrait émettre un appel en attente à la fonction importée `updateMessage` et modifier la variable d'état `status` pour refléter si notre transaction a réussi ou échoué :



```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```


C'est super propre et simple. Et devinez quoi... VOTRE DAPP EST TERMINÉE !!!

Allez-y et testez le bouton **Update** !



### Créez votre propre DApp personnalisée {#make-your-own-custom-dapp}

Wooooo, vous êtes arrivé à la fin du tutoriel ! Pour récapituler, vous avez appris à :

- Connecter un portefeuille MetaMask à votre projet de dapp
- Lire les données de votre contrat intelligent en utilisant l'API [Web3 d'Alchemy](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Signer des transactions Ethereum en utilisant MetaMask

Maintenant, vous êtes pleinement équipé pour appliquer les compétences de ce tutoriel à la construction de votre propre projet de DApp personnalisé ! Comme toujours, si vous avez des questions, n'hésitez pas à nous demander de l'aide dans le [Discord d'Alchemy](https://discord.gg/gWuC7zB). 🧙‍♂️

Une fois ce tutoriel terminé, faites-nous savoir comment s'est passée votre expérience ou si vous avez des commentaires en nous identifiant sur Twitter [@alchemyplatform](https://twitter.com/AlchemyPlatform) !
