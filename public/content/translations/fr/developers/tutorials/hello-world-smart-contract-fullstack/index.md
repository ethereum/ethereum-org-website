---
title: Contrat intelligent Hello World pour les débutants - Fullstack
description: Tutoriel d'introduction sur l'écriture et le déploiement d'un contrat intelligent simple sur Ethereum.
author: "nstrike2"
breadcrumb: Hello World fullstack
tags:
  [
    "solidity",
    "hardhat",
    "alchemy",
    "contrats intelligents",
    "déploiement",
    "explorateur de blocs",
    "frontend",
    "transactions",
    "framework",
  ]
skill: beginner
lang: fr
published: 2021-10-25
---

Ce guide est pour vous si vous débutez dans le développement sur chaîne de blocs et que vous ne savez pas par où commencer ni comment déployer et interagir avec des contrats intelligents. Nous allons vous guider dans la création et le déploiement d'un contrat intelligent simple sur le réseau de test Goerli en utilisant [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org) et [Alchemy](https://alchemy.com/eth).

Vous aurez besoin d'un compte Alchemy pour suivre ce tutoriel. [Inscrivez-vous pour obtenir un compte gratuit](https://www.alchemy.com/).

Si vous avez des questions à tout moment, n'hésitez pas à nous contacter sur le [Discord d'Alchemy](https://discord.gg/gWuC7zB) !

## Partie 1 - Créer et déployer votre contrat intelligent avec Hardhat {#part-1}

### Se connecter au réseau Ethereum {#connect-to-the-ethereum-network}

Il existe de nombreuses façons d'effectuer des requêtes sur la chaîne Ethereum. Par souci de simplicité, nous utiliserons un compte gratuit sur Alchemy, une plateforme de développement de chaîne de blocs et une API qui nous permet de communiquer avec la chaîne Ethereum sans avoir à exécuter un nœud nous-mêmes. Alchemy propose également des outils de développement pour la surveillance et l'analyse ; nous en tirerons parti dans ce tutoriel pour comprendre ce qui se passe en coulisses lors du déploiement de notre contrat intelligent.

### Créer votre application et votre clé API {#create-your-app-and-api-key}

Une fois que vous avez créé un compte Alchemy, vous pouvez générer une clé API en créant une application. Cela vous permettra d'effectuer des requêtes sur le réseau de test Goerli. Si vous n'êtes pas familier avec les réseaux de test, vous pouvez [lire le guide d'Alchemy sur le choix d'un réseau](https://www.alchemy.com/docs/choosing-a-web3-network).

Sur le tableau de bord d'Alchemy, trouvez le menu déroulant **Apps** dans la barre de navigation et cliquez sur **Create App**.

![Hello world create app](./hello-world-create-app.png)

Donnez à votre application le nom « _Hello World_ » et rédigez une courte description. Sélectionnez **Staging** comme environnement et **Goerli** comme réseau.

![create app view hello world](./create-app-view-hello-world.png)

_Remarque : assurez-vous de sélectionner **Goerli**, sinon ce tutoriel ne fonctionnera pas._

Cliquez sur **Create app**. Votre application apparaîtra dans le tableau ci-dessous.

### Créer un compte Ethereum {#create-an-ethereum-account}

Vous avez besoin d'un compte Ethereum pour envoyer et recevoir des transactions. Nous utiliserons MetaMask, un portefeuille virtuel dans le navigateur qui permet aux utilisateurs de gérer l'adresse de leur compte Ethereum.

Vous pouvez télécharger et créer un compte MetaMask gratuitement [ici](https://metamask.io/download). Lors de la création d'un compte, ou si vous en avez déjà un, assurez-vous de basculer sur le « Goerli Test Network » en haut à droite (afin de ne pas manipuler d'argent réel).

### Étape 4 : Ajouter de l'ether depuis un faucet {#step-4-add-ether-from-a-faucet}

Pour déployer votre contrat intelligent sur le réseau de test, vous aurez besoin de faux ETH. Pour obtenir des ETH sur le réseau Goerli, rendez-vous sur un faucet Goerli et entrez l'adresse de votre compte Goerli. Notez que les faucets Goerli peuvent être un peu capricieux ces derniers temps - consultez la [page des réseaux de test](/developers/docs/networks/#goerli) pour une liste d'options à essayer :

_Remarque : en raison de la congestion du réseau, cela peut prendre un certain temps._
``

### Étape 5 : Vérifier votre solde {#step-5-check-your-balance}

Pour vérifier que les ETH sont bien dans votre portefeuille, faisons une requête [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) en utilisant [l'outil composer d'Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Cela renverra le montant d'ETH dans notre portefeuille. Pour en savoir plus, consultez [le court tutoriel d'Alchemy sur l'utilisation de l'outil composer](https://youtu.be/r6sjRxBZJuU).

Entrez l'adresse de votre compte MetaMask et cliquez sur **Send Request**. Vous verrez une réponse qui ressemble à l'extrait de code ci-dessous.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _Remarque : Ce résultat est en wei, pas en ETH. Le wei est utilisé comme la plus petite dénomination de l'ether._

Ouf ! Notre faux argent est bien là.

### Étape 6 : Initialiser notre projet {#step-6-initialize-our-project}

Tout d'abord, nous devrons créer un dossier pour notre projet. Accédez à votre ligne de commande et saisissez ce qui suit.

```
mkdir hello-world
cd hello-world
```

Maintenant que nous sommes dans le dossier de notre projet, nous utiliserons `npm init` pour initialiser le projet.

> Si vous n'avez pas encore installé npm, suivez [ces instructions pour installer Node.js et npm](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm).

Pour les besoins de ce tutoriel, la façon dont vous répondez aux questions d'initialisation n'a pas d'importance. Voici comment nous avons procédé à titre de référence :

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

Approuvez le fichier package.json et nous sommes prêts à commencer !

### Étape 7 : Télécharger Hardhat {#step-7-download-hardhat}

Hardhat est un environnement de développement pour compiler, déployer, tester et déboguer vos logiciels Ethereum. Il aide les développeurs lors de la création de contrats intelligents et d'applications décentralisées (dapps) localement avant de les déployer sur la chaîne en direct.

Dans notre projet `hello-world`, exécutez :

```
npm install --save-dev hardhat
```

Consultez cette page pour plus de détails sur les [instructions d'installation](https://hardhat.org/getting-started/#overview).

### Étape 8 : Créer un projet Hardhat {#step-8-create-hardhat-project}

Dans le dossier de notre projet `hello-world`, exécutez :

```
npx hardhat
```

Vous devriez alors voir un message de bienvenue et une option pour sélectionner ce que vous voulez faire. Sélectionnez « create an empty hardhat.config.js » :

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

### Étape 9 : Ajouter des dossiers de projet {#step-9-add-project-folders}

Pour garder le projet organisé, créons deux nouveaux dossiers. Dans la ligne de commande, accédez au répertoire racine de votre projet `hello-world` et tapez :

```
mkdir contracts
mkdir scripts
```

- `contracts/` est l'endroit où nous conserverons le fichier de code de notre contrat intelligent hello world
- `scripts/` est l'endroit où nous conserverons les scripts pour déployer et interagir avec notre contrat

### Étape 10 : Écrire notre contrat {#step-10-write-our-contract}

Vous vous demandez peut-être quand nous allons écrire du code ? C'est le moment !

Ouvrez le projet hello-world dans votre éditeur préféré. Les contrats intelligents sont le plus souvent écrits en Solidity, que nous utiliserons pour écrire notre contrat intelligent.‌

1. Accédez au dossier `contracts` et créez un nouveau fichier appelé `HelloWorld.sol`
2. Vous trouverez ci-dessous un exemple de contrat intelligent Hello World que nous utiliserons pour ce tutoriel. Copiez le contenu ci-dessous dans le fichier `HelloWorld.sol`.

_Remarque : Assurez-vous de lire les commentaires pour comprendre ce que fait ce contrat._

```
// Spécifie la version de Solidity, en utilisant le versionnage sémantique.
// En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Définit un contrat nommé `HelloWorld`.
// Un contrat est une collection de fonctions et de données (son état). Une fois déployé, un contrat réside à une adresse spécifique sur la chaîne de blocs Ethereum. En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Émis lorsque la fonction update est appelée
   // Les événements de contrat intelligent sont un moyen pour votre contrat de communiquer que quelque chose s'est produit sur la chaîne de blocs à l'interface de votre application, qui peut « écouter » certains événements et agir lorsqu'ils se produisent.
   event UpdatedMessages(string oldStr, string newStr);

   // Déclare une variable d'état `message` de type `string`.
   // Les variables d'état sont des variables dont les valeurs sont stockées de manière permanente dans le stockage du contrat. Le mot-clé `public` rend les variables accessibles depuis l'extérieur d'un contrat et crée une fonction que d'autres contrats ou clients peuvent appeler pour accéder à la valeur.
   string public message;

   // Similaire à de nombreux langages orientés objet basés sur des classes, un constructeur est une fonction spéciale qui n'est exécutée que lors de la création du contrat.
   // Les constructeurs sont utilisés pour initialiser les données du contrat. En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepte un argument de type chaîne de caractères `initMessage` et définit la valeur dans la variable de stockage `message` du contrat).
      message = initMessage;
   }

   // Une fonction publique qui accepte un argument de type chaîne de caractères et met à jour la variable de stockage `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Il s'agit d'un contrat intelligent de base qui stocke un message lors de sa création. Il peut être mis à jour en appelant la fonction `update`.

### Étape 11 : Connecter MetaMask et Alchemy à votre projet {#step-11-connect-metamask-alchemy-to-your-project}

Nous avons créé un portefeuille MetaMask, un compte Alchemy et écrit notre contrat intelligent, il est maintenant temps de connecter les trois.

Chaque transaction envoyée depuis votre portefeuille nécessite une signature utilisant votre clé privée unique. Pour accorder cette permission à notre programme, nous pouvons stocker notre clé privée en toute sécurité dans un fichier d'environnement. Nous y stockerons également une clé API pour Alchemy.

> Pour en savoir plus sur l'envoi de transactions, consultez [ce tutoriel](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) sur l'envoi de transactions avec Web3.

Tout d'abord, installez le paquet dotenv dans le répertoire de votre projet :

```
npm install dotenv --save
```

Ensuite, créez un fichier `.env` dans le répertoire racine du projet. Ajoutez-y votre clé privée MetaMask et l'URL HTTP de l'API Alchemy.

Votre fichier d'environnement doit être nommé `.env` sinon il ne sera pas reconnu comme un fichier d'environnement.

Ne le nommez pas `process.env` ou `.env-custom` ou quoi que ce soit d'autre.

- Suivez [ces instructions](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) pour exporter votre clé privée
- Voir ci-dessous pour obtenir l'URL HTTP de l'API Alchemy

![Animated walkthrough of getting an Alchemy API key](./get-alchemy-api-key.gif)

Votre `.env` devrait ressembler à ceci :

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Pour les connecter réellement à notre code, nous ferons référence à ces variables dans notre fichier `hardhat.config.js` à l'étape 13.

### Étape 12 : Installer Ethers.js {#step-12-install-ethersjs}

Ethers.js est une bibliothèque qui facilite l'interaction et l'envoi de requêtes à Ethereum en enveloppant les [méthodes JSON-RPC standards](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) avec des méthodes plus conviviales.

Hardhat nous permet d'intégrer des [plugins](https://hardhat.org/plugins/) pour des outils supplémentaires et des fonctionnalités étendues. Nous tirerons parti du [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) pour le déploiement du contrat.

Dans le répertoire de votre projet, tapez :

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### Étape 13 : Mettre à jour hardhat.config.js {#step-13-update-hardhat-configjs}

Nous avons ajouté plusieurs dépendances et plugins jusqu'à présent, nous devons maintenant mettre à jour `hardhat.config.js` pour que notre projet les connaisse tous.

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

Pour nous assurer que tout fonctionne jusqu'à présent, compilons notre contrat. La tâche `compile` est l'une des tâches intégrées de Hardhat.

Depuis la ligne de commande, exécutez :

```bash
npx hardhat compile
```

Vous pourriez recevoir un avertissement concernant `SPDX license identifier not provided in source file`, mais ne vous en inquiétez pas — espérons que tout le reste semble correct ! Sinon, vous pouvez toujours envoyer un message sur le [Discord d'Alchemy](https://discord.gg/u72VCg3).

### Étape 15 : Écrire notre script de déploiement {#step-15-write-our-deploy-script}

Maintenant que notre contrat est écrit et que notre fichier de configuration est prêt, il est temps d'écrire notre script de déploiement de contrat.

Accédez au dossier `scripts/` et créez un nouveau fichier appelé `deploy.js`, en y ajoutant le contenu suivant :

```javascript
async function main() {
  const HelloWorld = await ethers.getContratFactory("HelloWorld")

  // Démarrer le déploiement, en renvoyant une promesse qui se résout en un objet de contrat
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

Hardhat fait un travail incroyable pour expliquer ce que fait chacune de ces lignes de code dans son [tutoriel sur les contrats](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), nous avons repris leurs explications ici.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

Une `ContractFactory` dans ethers.js est une abstraction utilisée pour déployer de nouveaux contrats intelligents, donc `HelloWorld` ici est une [fabrique](<https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)>) pour les instances de notre contrat hello world. Lors de l'utilisation du plugin `hardhat-ethers`, `ContractFactory` et `Contract`, les instances sont connectées au premier signataire (propriétaire) par défaut.

```javascript
const hello_world = await HelloWorld.deploy()
```

L'appel de `deploy()` sur une `ContractFactory` lancera le déploiement et renverra une `Promise` qui se résout en un objet `Contract`. C'est l'objet qui possède une méthode pour chacune des fonctions de notre contrat intelligent.

### Étape 16 : Déployer notre contrat {#step-16-deploy-our-contract}

Nous sommes enfin prêts à déployer notre contrat intelligent ! Accédez à la ligne de commande et exécutez :

```bash
npx hardhat run scripts/deploy.js --network goerli
```

Vous devriez alors voir quelque chose comme :

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**Veuillez conserver cette adresse**. Nous l'utiliserons plus tard dans le tutoriel.

Si nous allons sur [Etherscan pour Goerli](https://goerli.etherscan.io) et recherchons l'adresse de notre contrat, nous devrions pouvoir voir qu'il a été déployé avec succès. La transaction ressemblera à ceci :

![](./etherscan-contract.png)

L'adresse `From` doit correspondre à l'adresse de votre compte MetaMask et l'adresse `To` indiquera **Contract Creation**. Si nous cliquons sur la transaction, nous verrons l'adresse de notre contrat dans le champ `To`.

![](./etherscan-transaction.png)

Félicitations ! Vous venez de déployer un contrat intelligent sur un réseau de test Ethereum.

Pour comprendre ce qui se passe en coulisses, naviguons vers l'onglet Explorer dans notre [tableau de bord Alchemy](https://dashboard.alchemy.com/explorer). Si vous avez plusieurs applications Alchemy, assurez-vous de filtrer par application et de sélectionner **Hello World**.

![](./hello-world-explorer.png)

Ici, vous verrez une poignée de méthodes JSON-RPC que Hardhat/Ethers a effectuées en coulisses pour nous lorsque nous avons appelé la fonction `.deploy()`. Deux méthodes importantes ici sont [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), qui est la requête pour écrire notre contrat sur la chaîne Goerli, et [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash), qui est une requête pour lire des informations sur notre transaction à partir du hachage. Pour en savoir plus sur l'envoi de transactions, consultez [notre tutoriel sur l'envoi de transactions avec Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

## Partie 2 : Interagir avec votre contrat intelligent {#part-2-interact-with-your-smart-contract}

Maintenant que nous avons déployé avec succès un contrat intelligent sur le réseau Goerli, apprenons à interagir avec lui.

### Créer un fichier interact.js {#create-a-interactjs-file}

C'est le fichier dans lequel nous écrirons notre script d'interaction. Nous utiliserons la bibliothèque Ethers.js que vous avez installée précédemment dans la partie 1.

Dans le dossier `scripts/`, créez un nouveau fichier nommé `interact.js` et ajoutez le code suivant :

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### Mettre à jour votre fichier .env {#update-your-env-file}

Nous utiliserons de nouvelles variables d'environnement, nous devons donc les définir dans le fichier `.env` que [nous avons créé plus tôt](#step-11-connect-metamask-alchemy-to-your-project).

Nous devrons ajouter une définition pour notre `API_KEY` Alchemy et l'`CONTRACT_ADDRESS` où votre contrat intelligent a été déployé.

Votre fichier `.env` devrait ressembler à ceci :

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### Récupérer l'ABI de votre contrat {#grab-your-contract-abi}

L'[ABI (Application Binary Interface)](/glossary/#abi) de notre contrat est l'interface permettant d'interagir avec notre contrat intelligent. Hardhat génère automatiquement une ABI et l'enregistre dans `HelloWorld.json`. Pour utiliser l'ABI, nous devrons en analyser le contenu en ajoutant les lignes de code suivantes à notre fichier `interact.js` :

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

Si vous souhaitez voir l'ABI, vous pouvez l'afficher dans votre console :

```javascript
console.log(JSON.stringify(contract.abi))
```

Pour voir votre ABI s'afficher dans la console, accédez à votre terminal et exécutez :

```bash
npx hardhat run scripts/interact.js
```

### Créer une instance de votre contrat {#create-an-instance-of-your-contract}

Pour interagir avec notre contrat, nous devons créer une instance de contrat dans notre code. Pour ce faire avec Ethers.js, nous devrons travailler avec trois concepts :

1. Fournisseur - un fournisseur de nœud qui vous donne un accès en lecture et en écriture à la chaîne de blocs
2. Signataire - représente un compte Ethereum qui peut signer des transactions
3. Contract - un objet Ethers.js représentant un contrat spécifique déployé sur chaîne

Nous utiliserons l'ABI du contrat de l'étape précédente pour créer notre instance du contrat :

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

Apprenez-en plus sur les fournisseurs, les signataires et les contrats dans la [documentation d'ethers.js](https://docs.ethers.io/v5/).

### Lire le message d'initialisation {#read-the-init-message}

Vous vous souvenez quand nous avons déployé notre contrat avec le `initMessage = "Hello world!"` ? Nous allons maintenant lire ce message stocké dans notre contrat intelligent et l'afficher dans la console.

En JavaScript, les fonctions asynchrones sont utilisées lors de l'interaction avec les réseaux. Pour en savoir plus sur les fonctions asynchrones, [lisez cet article Medium](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

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

Après avoir exécuté le fichier à l'aide de `npx hardhat run scripts/interact.js` dans le terminal, nous devrions voir cette réponse :

```
Le message est : Hello world!
```

Félicitations ! Vous venez de lire avec succès les données d'un contrat intelligent à partir de la chaîne de blocs Ethereum, bravo !

### Mettre à jour le message {#update-the-message}

Au lieu de simplement lire le message, nous pouvons également mettre à jour le message enregistré dans notre contrat intelligent à l'aide de la fonction `update` ! Plutôt cool, non ?

Pour mettre à jour le message, nous pouvons appeler directement la fonction `update` sur notre objet Contract instancié :

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

Notez qu'à la ligne 11, nous faisons un appel à `.wait()` sur l'objet de transaction renvoyé. Cela garantit que notre script attend que la transaction soit minée sur la chaîne de blocs avant de quitter la fonction. Si l'appel `.wait()` n'est pas inclus, le script risque de ne pas voir la valeur `message` mise à jour dans le contrat.

### Lire le nouveau message {#read-the-new-message}

Vous devriez pouvoir répéter l'[étape précédente](#read-the-init-message) pour lire la valeur `message` mise à jour. Prenez un moment et voyez si vous pouvez apporter les modifications nécessaires pour afficher cette nouvelle valeur !

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
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("this is the new message")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("The new message is: " + newMessage)
}

main()
```

Maintenant, exécutez simplement le script et vous devriez pouvoir voir l'ancien message, le statut de mise à jour et le nouveau message s'afficher dans votre terminal !

`npx hardhat run scripts/interact.js --network goerli`

```
Le message est : Hello World!
Mise à jour du message...
Le nouveau message est : Ceci est le nouveau message.
```

Lors de l'exécution de ce script, vous remarquerez peut-être que l'étape `Updating the message...` prend un certain temps à charger avant que le nouveau message ne se charge. Cela est dû au processus de minage ; si vous êtes curieux de suivre les transactions pendant qu'elles sont minées, visitez le [mempool d'Alchemy](https://dashboard.alchemyapi.io/mempool) pour voir le statut d'une transaction. Si la transaction est abandonnée, il est également utile de vérifier [Etherscan Goerli](https://goerli.etherscan.io) et de rechercher le hachage de votre transaction.

## Partie 3 : Publier votre contrat intelligent sur Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

Vous avez fait tout le travail difficile pour donner vie à votre contrat intelligent ; il est maintenant temps de le partager avec le monde !

En vérifiant votre contrat intelligent sur Etherscan, n'importe qui peut voir votre code source et interagir avec votre contrat intelligent. Commençons !

### Étape 1 : Générer une clé API sur votre compte Etherscan {#step-1-generate-an-api-key-on-your-etherscan-account}

Une clé API Etherscan est nécessaire pour vérifier que vous possédez le contrat intelligent que vous essayez de publier.

Si vous n'avez pas encore de compte Etherscan, [créez-en un](https://etherscan.io/register).

Une fois connecté, trouvez votre nom d'utilisateur dans la barre de navigation, survolez-le et sélectionnez le bouton **My profile**.

Sur votre page de profil, vous devriez voir une barre de navigation latérale. Dans cette barre de navigation latérale, sélectionnez **API Keys**. Ensuite, appuyez sur le bouton "Add" pour créer une nouvelle clé API, nommez votre application **hello-world** et appuyez sur le bouton **Create New API Key**.

Votre nouvelle clé API devrait apparaître dans le tableau des clés API. Copiez la clé API dans votre presse-papiers.

Ensuite, nous devons ajouter la clé API Etherscan à notre fichier `.env`.

Après l'avoir ajoutée, votre fichier `.env` devrait ressembler à ceci :

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Contrats intelligents déployés avec Hardhat {#hardhat-deployed-smart-contracts}

#### Installer hardhat-etherscan {#install-hardhat-etherscan}

Publier votre contrat sur Etherscan à l'aide de Hardhat est simple. Vous devrez d'abord installer le plugin `hardhat-etherscan` pour commencer. `hardhat-etherscan` vérifiera automatiquement le code source et l'ABI du contrat intelligent sur Etherscan. Pour l'ajouter, dans le répertoire `hello-world`, exécutez :

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

Une fois installé, incluez l'instruction suivante en haut de votre `hardhat.config.js`, et ajoutez les options de configuration d'Etherscan :

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

#### Vérifier votre contrat intelligent sur Etherscan {#verify-your-smart-contract-on-etherscan}

Assurez-vous que tous les fichiers sont enregistrés et que toutes les variables `.env` sont correctement configurées.

Exécutez la tâche `verify`, en passant l'adresse du contrat et le réseau sur lequel il est déployé :

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

Assurez-vous que `DEPLOYED_CONTRACT_ADDRESS` est l'adresse de votre contrat intelligent déployé sur le réseau de test Goerli. De plus, le dernier argument (`'Hello World!'`) doit être la même valeur de chaîne de caractères utilisée [lors de l'étape de déploiement dans la partie 1](#step-15-write-our-deploy-script).

Si tout se passe bien, vous verrez le message suivant dans votre terminal :

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

Félicitations ! Le code de votre contrat intelligent est sur Etherscan !

### Consultez votre contrat intelligent sur Etherscan ! {#check-out-your-smart-contract-on-etherscan}

Lorsque vous naviguez vers le lien fourni dans votre terminal, vous devriez pouvoir voir le code de votre contrat intelligent et l'ABI publiés sur Etherscan !

**Youpi, vous avez réussi, champion ! Maintenant, n'importe qui peut appeler ou écrire sur votre contrat intelligent ! Nous avons hâte de voir ce que vous allez construire ensuite !**

## Partie 4 - Intégrer votre contrat intelligent avec le frontend {#part-4-integrating-your-smart-contract-with-the-frontend}

À la fin de ce tutoriel, vous saurez comment :

- Connecter un portefeuille MetaMask à votre application décentralisée (dapp)
- Lire les données de votre contrat intelligent en utilisant l'API [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Signer des transactions Ethereum en utilisant MetaMask

Pour cette dapp, nous utiliserons [React](https://react.dev/) comme framework frontend ; cependant, il est important de noter que nous ne passerons pas beaucoup de temps à détailler ses principes fondamentaux, car nous nous concentrerons principalement sur l'intégration de la fonctionnalité Web3 à notre projet.

Comme prérequis, vous devez avoir une compréhension de niveau débutant de React. Si ce n'est pas le cas, nous vous recommandons de suivre le [tutoriel officiel d'introduction à React](https://react.dev/learn).

### Cloner les fichiers de démarrage {#clone-the-starter-files}

Tout d'abord, rendez-vous sur le [dépôt GitHub hello-world-part-four](https://github.com/alchemyplatform/hello-world-part-four-tutorial) pour obtenir les fichiers de démarrage de ce projet et clonez ce dépôt sur votre machine locale.

Ouvrez le dépôt cloné localement. Remarquez qu'il contient deux dossiers : `starter-files` et `completed`.

- `starter-files` - **nous travaillerons dans ce répertoire**, nous connecterons l'interface utilisateur à votre portefeuille Ethereum et au contrat intelligent que nous avons publié sur Etherscan dans la [Partie 3](#part-3-publish-your-smart-contract-to-etherscan).
- `completed` contient l'intégralité du tutoriel terminé et ne doit être utilisé que comme référence si vous êtes bloqué.

Ensuite, ouvrez votre copie de `starter-files` dans votre éditeur de code préféré, puis naviguez dans le dossier `src`.

Tout le code que nous écrirons se trouvera dans le dossier `src`. Nous modifierons le composant `HelloWorld.js` et les fichiers JavaScript `util/interact.js` pour donner à notre projet la fonctionnalité Web3.

### Examiner les fichiers de démarrage {#check-out-the-starter-files}

Avant de commencer à coder, explorons ce qui nous est fourni dans les fichiers de démarrage.

#### Lancer votre projet React {#get-your-react-project-running}

Commençons par lancer le projet React dans notre navigateur. La beauté de React est qu'une fois que notre projet s'exécute dans notre navigateur, toutes les modifications que nous enregistrons seront mises à jour en direct dans notre navigateur.

Pour lancer le projet, naviguez jusqu'au répertoire racine du dossier `starter-files`, et exécutez `npm install` dans votre terminal pour installer les dépendances du projet :

```bash
cd starter-files
npm install
```

Une fois l'installation terminée, exécutez `npm start` dans votre terminal :

```bash
npm start
```

Cela devrait ouvrir [http://localhost:3000/](http://localhost:3000/) dans votre navigateur, où vous verrez le frontend de notre projet. Il devrait se composer d'un champ \(un endroit pour mettre à jour le message stocké dans votre contrat intelligent\), d'un bouton « Connect Wallet » (Connecter le portefeuille) et d'un bouton « Update » (Mettre à jour).

Si vous essayez de cliquer sur l'un des boutons, vous remarquerez qu'ils ne fonctionnent pas — c'est parce que nous devons encore programmer leur fonctionnalité.

#### Le composant `HelloWorld.js` {#the-helloworld-js-component}

Retournons dans le dossier `src` de notre éditeur et ouvrons le fichier `HelloWorld.js`. Il est très important que nous comprenions tout ce qui se trouve dans ce fichier, car c'est le composant React principal sur lequel nous allons travailler.

En haut de ce fichier, vous remarquerez que nous avons plusieurs instructions d'importation qui sont nécessaires pour faire fonctionner notre projet, y compris la bibliothèque React, les hooks useEffect et useState, certains éléments de `./util/interact.js` (nous les décrirons plus en détail bientôt !), et le logo Alchemy.

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
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```

Voici ce que représente chacune des variables :

- `walletAddress` - une chaîne de caractères qui stocke l'adresse du portefeuille de l'utilisateur
- `status` - une chaîne de caractères qui stocke un message utile guidant l'utilisateur sur la façon d'interagir avec la dapp
- `message` - une chaîne de caractères qui stocke le message actuel dans le contrat intelligent
- `newMessage` - une chaîne de caractères qui stocke le nouveau message qui sera écrit dans le contrat intelligent

Après les variables d'état, vous verrez cinq fonctions non implémentées : `useEffect`, `addSmartContractListener`, `addWalletListener`, `connectWalletPressed` et `onUpdatePressed`. Nous expliquerons ce qu'elles font ci-dessous :

```javascript
// HelloWorld.js

//appelé une seule fois
useEffect(async () => {
  //À FAIRE : implémenter
}, [])

function addSmartContractListener() {
  //À FAIRE : implémenter
}

function addWalletListener() {
  //À FAIRE : implémenter
}

const connectWalletPressed = async () => {
  //À FAIRE : implémenter
}

const onUpdatePressed = async () => {
  //À FAIRE : implémenter
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - il s'agit d'un hook React qui est appelé après le rendu de votre composant. Parce qu'il a une propriété de tableau vide `[]` qui lui est passée \(voir ligne 4\), il ne sera appelé que lors du _premier_ rendu du composant. Ici, nous chargerons le message actuel stocké dans notre contrat intelligent, appellerons les écouteurs de notre contrat intelligent et de notre portefeuille, et mettrons à jour notre interface utilisateur pour refléter si un portefeuille est déjà connecté.
- `addSmartContractListener` - cette fonction configure un écouteur qui surveillera l'événement `UpdatedMessages` de notre contrat HelloWorld et mettra à jour notre interface utilisateur lorsque le message sera modifié dans notre contrat intelligent.
- `addWalletListener` - cette fonction configure un écouteur qui détecte les changements dans l'état du portefeuille MetaMask de l'utilisateur, par exemple lorsque l'utilisateur déconnecte son portefeuille ou change d'adresse.
- `connectWalletPressed` - cette fonction sera appelée pour connecter le portefeuille MetaMask de l'utilisateur à notre dapp.
- `onUpdatePressed` - cette fonction sera appelée lorsque l'utilisateur souhaitera mettre à jour le message stocké dans le contrat intelligent.

Vers la fin de ce fichier, nous avons l'interface utilisateur de notre composant.

```javascript
// HelloWorld.js

//l'interface utilisateur de notre composant
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

Si vous parcourez attentivement ce code, vous remarquerez où nous utilisons nos différentes variables d'état dans notre interface utilisateur :

- Aux lignes 6-12, si le portefeuille de l'utilisateur est connecté \(c'est-à-dire `walletAddress.length > 0`\), nous affichons une version tronquée de l'`walletAddress` de l'utilisateur dans le bouton avec l'ID « walletButton » ; sinon, il indique simplement « Connect Wallet ».
- À la ligne 17, nous affichons le message actuel stocké dans le contrat intelligent, qui est capturé dans la chaîne `message`.
- Aux lignes 23-26, nous utilisons un [composant contrôlé](https://legacy.reactjs.org/docs/forms.html#controlled-components) pour mettre à jour notre variable d'état `newMessage` lorsque la saisie dans le champ de texte change.

En plus de nos variables d'état, vous verrez également que les fonctions `connectWalletPressed` et `onUpdatePressed` sont appelées lorsque les boutons avec les ID `publishButton` et `walletButton` sont cliqués respectivement.

Enfin, voyons où ce composant `HelloWorld.js` est ajouté.

Si vous allez dans le fichier `App.js`, qui est le composant principal dans React agissant comme un conteneur pour tous les autres composants, vous verrez que notre composant `HelloWorld.js` est injecté à la ligne 7.

Enfin et surtout, examinons un autre fichier qui vous est fourni, le fichier `interact.js`.

#### Le fichier `interact.js` {#the-interact-js-file}

Parce que nous voulons nous conformer au paradigme [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), nous voudrons un fichier séparé qui contient toutes nos fonctions pour gérer la logique, les données et les règles de notre dapp, puis être en mesure d'exporter ces fonctions vers notre frontend \(notre composant `HelloWorld.js`\).

👆🏽 C'est le but exact de notre fichier `interact.js` !

Naviguez jusqu'au dossier `util` dans votre répertoire `src`, et vous remarquerez que nous avons inclus un fichier appelé `interact.js` qui contiendra toutes nos fonctions et variables d'interaction avec le contrat intelligent et le portefeuille.

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

- `loadCurrentMessage` - cette fonction gère la logique de chargement du message actuel stocké dans le contrat intelligent. Elle effectuera un appel de _lecture_ au contrat intelligent Hello World en utilisant l'[API Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).
- `connectWallet` - cette fonction connectera le MetaMask de l'utilisateur à notre dapp.
- `getCurrentWalletConnected` - cette fonction vérifiera si un compte Ethereum est déjà connecté à notre dapp lors du chargement de la page et mettra à jour notre interface utilisateur en conséquence.
- `updateMessage` - cette fonction mettra à jour le message stocké dans le contrat intelligent. Elle effectuera un appel d'_écriture_ au contrat intelligent Hello World, de sorte que le portefeuille MetaMask de l'utilisateur devra signer une transaction Ethereum pour mettre à jour le message.

Maintenant que nous comprenons avec quoi nous travaillons, découvrons comment lire à partir de notre contrat intelligent !

### Étape 3 : Lire à partir de votre contrat intelligent {#step-3-read-from-your-smart-contract}

Pour lire à partir de votre contrat intelligent, vous devrez configurer avec succès :

- Une connexion API à la chaîne Ethereum
- Une instance chargée de votre contrat intelligent
- Une fonction pour appeler la fonction de votre contrat intelligent
- Un écouteur pour surveiller les mises à jour lorsque les données que vous lisez à partir du contrat intelligent changent

Cela peut sembler faire beaucoup d'étapes, mais ne vous inquiétez pas ! Nous vous guiderons sur la façon de faire chacune d'elles étape par étape ! :\)

#### Établir une connexion API à la chaîne Ethereum {#establish-an-api-connection-to-the-ethereum-chain}

Rappelez-vous comment, dans la Partie 2 de ce tutoriel, nous avons utilisé notre [clé Alchemy Web3 pour lire à partir de notre contrat intelligent](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library) ? Vous aurez également besoin d'une clé Alchemy Web3 dans votre dapp pour lire à partir de la chaîne.

Si vous ne l'avez pas déjà fait, installez d'abord [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) en naviguant vers le répertoire racine de votre `starter-files` et en exécutant ce qui suit dans votre terminal :

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) est un wrapper autour de [Web3.js](https://docs.web3js.org/), fournissant des méthodes API améliorées et d'autres avantages cruciaux pour vous faciliter la vie en tant que développeur Web3. Il est conçu pour nécessiter une configuration minimale afin que vous puissiez commencer à l'utiliser dans votre application immédiatement !

Ensuite, installez le paquet [dotenv](https://www.npmjs.com/package/dotenv) dans le répertoire de votre projet, afin que nous ayons un endroit sécurisé pour stocker notre clé API après l'avoir récupérée.

```text
npm install dotenv --save
```

Pour notre dapp, **nous utiliserons notre clé API Websockets** au lieu de notre clé API HTTP, car cela nous permettra de configurer un écouteur qui détecte lorsque le message stocké dans le contrat intelligent change.

Une fois que vous avez votre clé API, créez un fichier `.env` dans votre répertoire racine et ajoutez-y votre URL Alchemy Websockets. Ensuite, votre fichier `.env` devrait ressembler à ceci :

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<clé>
```

Maintenant, nous sommes prêts à configurer notre point de terminaison Alchemy Web3 dans notre dapp ! Retournons à notre `interact.js`, qui est imbriqué dans notre dossier `util` et ajoutons le code suivant en haut du fichier :

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

#### Charger votre contrat intelligent Hello World {#loading-your-hello-world-smart-contract}

Pour charger votre contrat intelligent Hello World, vous aurez besoin de son adresse de contrat et de son ABI, qui peuvent tous deux être trouvés sur Etherscan si vous avez terminé la [Partie 3 de ce tutoriel.](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)

#### Comment obtenir l'ABI de votre contrat depuis Etherscan {#how-to-get-your-contract-abi-from-etherscan}

Si vous avez ignoré la Partie 3 de ce tutoriel, vous pouvez utiliser le contrat HelloWorld avec l'adresse [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code). Son ABI peut être trouvée [ici](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

L'ABI d'un contrat est nécessaire pour spécifier quelle fonction un contrat invoquera ainsi que pour s'assurer que la fonction renverra les données dans le format que vous attendez. Une fois que nous avons copié l'ABI de notre contrat, enregistrons-la sous forme de fichier JSON appelé `contract-abi.json` dans votre répertoire `src`.

Votre contract-abi.json doit être stocké dans votre dossier src.

Armés de notre adresse de contrat, de notre ABI et de notre point de terminaison Alchemy Web3, nous pouvons utiliser la [méthode contract](https://docs.web3js.org/api/web3-eth-contract/class/Contract) pour charger une instance de notre contrat intelligent. Importez l'ABI de votre contrat dans le fichier `interact.js` et ajoutez l'adresse de votre contrat.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

Nous pouvons maintenant enfin décommenter notre variable `helloWorldContract`, et charger le contrat intelligent en utilisant notre point de terminaison AlchemyWeb3 :

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Pour résumer, les 12 premières lignes de votre `interact.js` devraient maintenant ressembler à ceci :

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

#### Implémenter `loadCurrentMessage` dans votre fichier `interact.js` {#implementing-loadcurrentmessage-in-your-interact-js-file}

Cette fonction est super simple. Nous allons faire un simple appel web3 asynchrone pour lire à partir de notre contrat. Notre fonction renverra le message stocké dans le contrat intelligent :

Mettez à jour `loadCurrentMessage` dans votre fichier `interact.js` avec ce qui suit :

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

Puisque nous voulons afficher ce contrat intelligent dans notre interface utilisateur, mettons à jour la fonction `useEffect` dans notre composant `HelloWorld.js` avec ce qui suit :

```javascript
// HelloWorld.js

//appelé une seule fois
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

Notez que nous voulons seulement que notre `loadCurrentMessage` soit appelée une fois lors du premier rendu du composant. Nous implémenterons bientôt `addSmartContractListener` pour mettre à jour automatiquement l'interface utilisateur après que le message dans le contrat intelligent ait changé.

Avant de nous plonger dans notre écouteur, vérifions ce que nous avons jusqu'à présent ! Enregistrez vos fichiers `HelloWorld.js` et `interact.js`, puis allez sur [http://localhost:3000/](http://localhost:3000/)

Vous remarquerez que le message actuel ne dit plus « No connection to the network » (Aucune connexion au réseau). Au lieu de cela, il reflète le message stocké dans le contrat intelligent. Génial !

#### Votre interface utilisateur devrait maintenant refléter le message stocké dans le contrat intelligent {#your-ui-should-now-reflect-the-message-stored-in-the-smart-contract}

Maintenant, en parlant de cet écouteur...

#### Implémenter `addSmartContractListener` {#implement-addsmartcontractlistener}

Si vous repensez au fichier `HelloWorld.sol` que nous avons écrit dans la [Partie 1 de cette série de tutoriels](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract), vous vous souviendrez qu'il y a un événement de contrat intelligent appelé `UpdatedMessages` qui est émis après que la fonction `update` de notre contrat intelligent soit invoquée \(voir lignes 9 et 27\) :

```javascript
// HelloWorld.sol

// Spécifie la version de Solidity, en utilisant le versionnage sémantique.
// En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Définit un contrat nommé `HelloWorld`.
// Un contrat est un ensemble de fonctions et de données (son état). Une fois déployé, un contrat réside à une adresse spécifique sur la chaîne de blocs Ethereum. En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Émis lorsque la fonction de mise à jour est appelée
   //Les événements de contrat intelligent sont un moyen pour votre contrat de communiquer que quelque chose s'est produit sur la chaîne de blocs au front-end de votre application, qui peut être à l'écoute de certains événements et prendre des mesures lorsqu'ils se produisent.
   event UpdatedMessages(string oldStr, string newStr);

   // Déclare une variable d'état `message` de type `string`.
   // Les variables d'état sont des variables dont les valeurs sont stockées de manière permanente dans le stockage du contrat. Le mot-clé `public` rend les variables accessibles depuis l'extérieur d'un contrat et crée une fonction que d'autres contrats ou clients peuvent appeler pour accéder à la valeur.
   string public message;

   // Comme dans de nombreux langages orientés objet basés sur des classes, un constructeur est une fonction spéciale qui n'est exécutée que lors de la création du contrat.
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

Les événements de contrat intelligent sont un moyen pour votre contrat de communiquer que quelque chose s'est produit \(c'est-à-dire qu'il y a eu un _événement_\) sur la chaîne de blocs à votre application front-end, qui peut être « à l'écoute » d'événements spécifiques et prendre des mesures lorsqu'ils se produisent.

La fonction `addSmartContractListener` va spécifiquement écouter l'événement `UpdatedMessages` de notre contrat intelligent Hello World, et mettre à jour notre interface utilisateur pour afficher le nouveau message.

Modifiez `addSmartContractListener` avec ce qui suit :

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

Décomposons ce qui se passe lorsque l'écouteur détecte un événement :

- Si une erreur se produit lors de l'émission de l'événement, elle sera reflétée dans l'interface utilisateur via notre variable d'état `status`.
- Sinon, nous utiliserons l'objet `data` renvoyé. `data.returnValues` est un tableau indexé à zéro où le premier élément du tableau stocke le message précédent et le deuxième élément stocke le message mis à jour. Dans l'ensemble, lors d'un événement réussi, nous définirons notre chaîne `message` sur le message mis à jour, effacerons la chaîne `newMessage`, et mettrons à jour notre variable d'état `status` pour refléter qu'un nouveau message a été publié sur notre contrat intelligent.

Enfin, appelons notre écouteur dans notre fonction `useEffect` afin qu'il soit initialisé lors du premier rendu du composant `HelloWorld.js`. Dans l'ensemble, votre fonction `useEffect` devrait ressembler à ceci :

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

Maintenant que nous sommes capables de lire à partir de notre contrat intelligent, ce serait formidable de découvrir comment y écrire également ! Cependant, pour écrire sur notre dapp, nous devons d'abord y connecter un portefeuille Ethereum.

Donc, ensuite, nous nous attaquerons à la configuration de notre portefeuille Ethereum \(MetaMask\) puis à sa connexion à notre dapp !

### Étape 4 : Configurer votre portefeuille Ethereum {#step-4-set-up-your-ethereum-wallet}

Pour écrire quoi que ce soit sur la chaîne Ethereum, les utilisateurs doivent signer des transactions en utilisant les clés privées de leur portefeuille virtuel. Pour ce tutoriel, nous utiliserons [MetaMask](https://metamask.io/), un portefeuille virtuel dans le navigateur utilisé pour gérer l'adresse de votre compte Ethereum, car il rend cette signature de transaction super facile pour l'utilisateur final.

Si vous voulez en savoir plus sur le fonctionnement des transactions sur Ethereum, consultez [cette page](/developers/docs/transactions/) de la fondation Ethereum.

#### Télécharger MetaMask {#download-metamask}

Vous pouvez télécharger et créer un compte MetaMask gratuitement [ici](https://metamask.io/download). Lors de la création d'un compte, ou si vous avez déjà un compte, assurez-vous de basculer sur le « Goerli Test Network » (Réseau de test Goerli) en haut à droite \(afin que nous ne manipulions pas d'argent réel\).

#### Ajouter de l'ether depuis un faucet {#add-ether-from-a-faucet}

Pour signer une transaction sur la chaîne de blocs Ethereum, nous aurons besoin de faux ETH. Pour obtenir des ETH, vous pouvez aller sur le [FaucETH](https://fauceth.komputing.org) et entrer l'adresse de votre compte Goerli, cliquer sur « Request funds » (Demander des fonds), puis sélectionner « Ethereum Testnet Goerli » dans la liste déroulante et enfin cliquer à nouveau sur le bouton « Request funds ». Vous devriez voir des ETH dans votre compte MetaMask peu de temps après !

#### Vérifier votre solde {#check-your-balance}

Pour vérifier que notre solde est bien là, faisons une requête [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) en utilisant [l'outil composer d'Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Cela renverra le montant d'ETH dans notre portefeuille. Après avoir saisi l'adresse de votre compte MetaMask et cliqué sur « Send Request » (Envoyer la requête), vous devriez voir une réponse comme celle-ci :

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**REMARQUE :** Ce résultat est en wei et non en ether. Le wei est utilisé comme la plus petite dénomination de l'ether. La conversion de wei en ether est : 1 ether = 10¹⁸ wei. Donc, si nous convertissons 0xde0b6b3a7640000 en décimal, nous obtenons 1\*10¹⁸, ce qui équivaut à 1 ether.

Ouf ! Notre faux argent est bien là ! 🤑

### Étape 5 : Connecter MetaMask à votre interface utilisateur {#step-5-connect-metamask-to-your-ui}

Maintenant que notre portefeuille MetaMask est configuré, connectons notre dapp à celui-ci !

#### La fonction `connectWallet` {#the-connectwallet-function}

Dans notre fichier `interact.js`, implémentons la fonction `connectWallet`, que nous pourrons ensuite appeler dans notre composant `HelloWorld.js`.

Modifions `connectWallet` avec ce qui suit :

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

Alors, que fait exactement ce bloc de code géant ?

Eh bien, tout d'abord, il vérifie si `window.ethereum` est activé dans votre navigateur.

`window.ethereum` est une API globale injectée par MetaMask et d'autres fournisseurs de portefeuilles qui permet aux sites web de demander les comptes Ethereum des utilisateurs. Si elle est approuvée, elle peut lire les données des chaînes de blocs auxquelles l'utilisateur est connecté, et suggérer à l'utilisateur de signer des messages et des transactions. Consultez la [documentation de MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) pour plus d'informations !

Si `window.ethereum` _n'est pas_ présent, cela signifie que MetaMask n'est pas installé. Cela entraîne le renvoi d'un objet JSON, où `address` renvoyé est une chaîne vide, et l'objet JSX `status` indique que l'utilisateur doit installer MetaMask.

Maintenant, si `window.ethereum` _est_ présent, c'est là que les choses deviennent intéressantes.

En utilisant une boucle try/catch, nous essaierons de nous connecter à MetaMask en appelant [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). L'appel de cette fonction ouvrira MetaMask dans le navigateur, où l'utilisateur sera invité à connecter son portefeuille à votre dapp.

- Si l'utilisateur choisit de se connecter, `method: "eth_requestAccounts"` renverra un tableau qui contient toutes les adresses de compte de l'utilisateur qui se sont connectées à la dapp. Dans l'ensemble, notre fonction `connectWallet` renverra un objet JSON qui contient la _première_ `address` dans ce tableau \(voir ligne 9\) et un message `status` qui invite l'utilisateur à écrire un message sur le contrat intelligent.
- Si l'utilisateur rejette la connexion, alors l'objet JSON contiendra une chaîne vide pour `address` renvoyé et un message `status` qui reflète que l'utilisateur a rejeté la connexion.

Maintenant que nous avons écrit cette fonction `connectWallet`, la prochaine étape consiste à l'appeler dans notre composant `HelloWorld.js`.

#### Ajouter la fonction `connectWallet` à votre composant d'interface utilisateur `HelloWorld.js` {#add-the-connectwallet-function-to-your-helloworld-js-ui-component}

Naviguez jusqu'à la fonction `connectWalletPressed` dans `HelloWorld.js`, et mettez-la à jour avec ce qui suit :

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Remarquez comment la plupart de nos fonctionnalités sont abstraites de notre composant `HelloWorld.js` depuis le fichier `interact.js` ? C'est pour que nous nous conformions au paradigme M-V-C !

Dans `connectWalletPressed`, nous faisons simplement un appel await à notre fonction importée `connectWallet`, et en utilisant sa réponse, nous mettons à jour nos variables `status` et `walletAddress` via leurs hooks d'état.

Maintenant, enregistrons les deux fichiers \(`HelloWorld.js` et `interact.js`\) et testons notre interface utilisateur jusqu'à présent.

Ouvrez votre navigateur sur la page [http://localhost:3000/](http://localhost:3000/), et appuyez sur le bouton « Connect Wallet » en haut à droite de la page.

Si MetaMask est installé, vous devriez être invité à connecter votre portefeuille à votre dapp. Acceptez l'invitation à vous connecter.

Vous devriez voir que le bouton du portefeuille reflète maintenant que votre adresse est connectée ! Ouaiiiis 🔥

Ensuite, essayez de rafraîchir la page... c'est étrange. Notre bouton de portefeuille nous invite à connecter MetaMask, même s'il est déjà connecté...

Cependant, n'ayez crainte ! Nous pouvons facilement résoudre ce problème en implémentant `getCurrentWalletConnected`, qui vérifiera si une adresse est déjà connectée à notre dapp et mettra à jour notre interface utilisateur en conséquence !

#### La fonction `getCurrentWalletConnected` {#the-getcurrentwalletconnected-function}

Mettez à jour votre fonction `getCurrentWalletConnected` dans le fichier `interact.js` avec ce qui suit :

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

La principale différence est qu'au lieu d'appeler la méthode `eth_requestAccounts`, qui ouvre MetaMask pour que l'utilisateur connecte son portefeuille, nous appelons ici la méthode `eth_accounts`, qui renvoie simplement un tableau contenant les adresses MetaMask actuellement connectées à notre dapp.

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

Géniaaaal ! Le bouton devrait indiquer que vous êtes connecté, et afficher un aperçu de l'adresse de votre portefeuille connecté - même après avoir rafraîchi !

#### Implémenter `addWalletListener` {#implement-addwalletlistener}

La dernière étape de la configuration du portefeuille de notre dapp consiste à implémenter l'écouteur de portefeuille afin que notre interface utilisateur se mette à jour lorsque l'état de notre portefeuille change, par exemple lorsque l'utilisateur se déconnecte ou change de compte.

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

Je parie que vous n'avez même pas besoin de notre aide pour comprendre ce qui se passe ici à ce stade, mais par souci d'exhaustivité, décomposons-le rapidement :

- Tout d'abord, notre fonction vérifie si `window.ethereum` est activé \(c'est-à-dire si MetaMask est installé\).
  - Si ce n'est pas le cas, nous définissons simplement notre variable d'état `status` sur une chaîne JSX qui invite l'utilisateur à installer MetaMask.
  - S'il est activé, nous configurons l'écouteur `window.ethereum.on("accountsChanged")` à la ligne 3 qui écoute les changements d'état dans le portefeuille MetaMask, ce qui inclut le moment où l'utilisateur connecte un compte supplémentaire à la dapp, change de compte ou déconnecte un compte. S'il y a au moins un compte connecté, la variable d'état `walletAddress` est mise à jour comme le premier compte dans le tableau `accounts` renvoyé par l'écouteur. Sinon, `walletAddress` est défini comme une chaîne vide.

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

Et c'est tout ! Nous avons terminé avec succès la programmation de toutes les fonctionnalités de notre portefeuille ! Passons maintenant à notre dernière tâche : mettre à jour le message stocké dans notre contrat intelligent !

### Étape 6 : Implémenter la fonction `updateMessage` {#step-6-implement-the-updatemessage-function}

Très bien tout le monde, nous sommes arrivés dans la dernière ligne droite ! Dans la fonction `updateMessage` de votre fichier `interact.js`, nous allons faire ce qui suit :

1. S'assurer que le message que nous souhaitons publier dans notre contrat intelligent est valide
2. Signer notre transaction en utilisant MetaMask
3. Appeler cette fonction depuis notre composant frontend `HelloWorld.js`

Cela ne prendra pas très longtemps ; terminons cette dapp !

#### Gestion des erreurs de saisie {#input-error-handling}

Naturellement, il est logique d'avoir une sorte de gestion des erreurs de saisie au début de la fonction.

Nous voudrons que notre fonction se termine prématurément s'il n'y a pas d'extension MetaMask installée, s'il n'y a pas de portefeuille connecté \(c'est-à-dire si `address` passé est une chaîne vide\), ou si `message` est une chaîne vide. Ajoutons la gestion des erreurs suivante à `updateMessage` :

```javascript
// interact.js

export const updateMessage = async (address, message) => {
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
}
```

Maintenant qu'elle a une gestion appropriée des erreurs de saisie, il est temps de signer la transaction via MetaMask !

#### Signer notre transaction {#signing-our-transaction}

Si vous êtes déjà à l'aise avec les transactions Ethereum Web3 traditionnelles, le code que nous écrirons ensuite vous sera très familier. Sous votre code de gestion des erreurs de saisie, ajoutez ce qui suit à `updateMessage` :

```javascript
// interact.js

//configurer les paramètres de la transaction
const transactionParameters = {
  to: contractAddress, // Requis sauf lors des publications de contrat.
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

Décomposons ce qui se passe. Tout d'abord, nous configurons les paramètres de nos transactions, où :

- `to` spécifie l'adresse du destinataire \(notre contrat intelligent\)
- `from` spécifie le signataire de la transaction, la variable `address` que nous avons passée dans notre fonction
- `data` contient l'appel à la méthode `update` de notre contrat intelligent Hello World, recevant notre variable de chaîne `message` en entrée

Ensuite, nous faisons un appel await, `window.ethereum.request`, où nous demandons à MetaMask de signer la transaction. Remarquez qu'aux lignes 11 et 12, nous spécifions notre méthode eth, `eth_sendTransaction` et passons notre `transactionParameters`.

À ce stade, MetaMask s'ouvrira dans le navigateur et invitera l'utilisateur à signer ou à rejeter la transaction.

- Si la transaction réussit, la fonction renverra un objet JSON où la chaîne JSX `status` invite l'utilisateur à consulter Etherscan pour plus d'informations sur sa transaction.
- Si la transaction échoue, la fonction renverra un objet JSON où la chaîne `status` relaie le message d'erreur.

Dans l'ensemble, notre fonction `updateMessage` devrait ressembler à ceci :

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //gestion des erreurs de saisie
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

  //configurer les paramètres de la transaction
  const transactionParameters = {
    to: contractAddress, // Requis sauf lors des publications de contrat.
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

Enfin et surtout, nous devons connecter notre fonction `updateMessage` à notre composant `HelloWorld.js`.

#### Connecter `updateMessage` au frontend `HelloWorld.js` {#connect-updatemessage-to-the-helloworld-js-frontend}

Notre fonction `onUpdatePressed` devrait faire un appel await à la fonction importée `updateMessage` et modifier la variable d'état `status` pour refléter si notre transaction a réussi ou échoué :

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

C'est super propre et simple. Et devinez quoi... VOTRE DAPP EST TERMINÉE !!!

Allez-y et testez le bouton **Update** (Mettre à jour) !

### Créez votre propre dapp personnalisée {#make-your-own-custom-dapp}

Youhou, vous êtes arrivé à la fin du tutoriel ! Pour résumer, vous avez appris comment :

- Connecter un portefeuille MetaMask à votre projet de dapp
- Lire les données de votre contrat intelligent en utilisant l'API [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Signer des transactions Ethereum en utilisant MetaMask

Maintenant, vous êtes entièrement équipé pour appliquer les compétences de ce tutoriel afin de construire votre propre projet de dapp personnalisé ! Comme toujours, si vous avez des questions, n'hésitez pas à nous contacter pour obtenir de l'aide sur le [Discord d'Alchemy](https://discord.gg/gWuC7zB). 🧙‍♂️

Une fois que vous aurez terminé ce tutoriel, faites-nous part de votre expérience ou de vos commentaires en nous taguant sur Twitter [@alchemyplatform](https://twitter.com/AlchemyPlatform) !