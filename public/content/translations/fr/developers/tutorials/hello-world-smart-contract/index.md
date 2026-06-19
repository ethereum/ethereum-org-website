---
title: Contrat intelligent Hello World pour les débutants
description: Tutoriel d'introduction sur l'écriture et le déploiement d'un contrat intelligent simple sur Ethereum.
author: "elanh"
tags: ["solidity", "hardhat", "alchemy", "contrats intelligents", "déploiement"]
skill: beginner
breadcrumb: Contrat Hello World
lang: fr
published: 2021-03-31
---

Si vous débutez dans le développement sur la chaîne de blocs et que vous ne savez pas par où commencer, ou si vous voulez simplement comprendre comment déployer et interagir avec des contrats intelligents, ce guide est fait pour vous. Nous allons vous guider dans la création et le déploiement d'un contrat intelligent simple sur le réseau de test Sepolia à l'aide d'un portefeuille virtuel [MetaMask](https://metamask.io/), de [Solidity](https://docs.soliditylang.org/en/v0.8.0/), de [Hardhat](https://hardhat.org/) et d'[Alchemy](https://www.alchemy.com/eth) (ne vous inquiétez pas si vous ne comprenez pas encore ce que tout cela signifie, nous vous l'expliquerons).

Dans la [partie 2](https://docs.alchemy.com/docs/interacting-with-a-smart-contract) de ce tutoriel, nous verrons comment interagir avec notre contrat intelligent une fois qu'il sera déployé ici, et dans la [partie 3](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan), nous verrons comment le publier sur Etherscan.

Si vous avez des questions à un moment donné, n'hésitez pas à nous contacter sur le [Discord d'Alchemy](https://discord.gg/gWuC7zB) !

## Étape 1 : Se connecter au réseau Ethereum {#step-1}

Il existe de nombreuses façons d'effectuer des requêtes sur la chaîne Ethereum. Pour faire simple, nous utiliserons un compte gratuit sur Alchemy, une plateforme de développement de chaîne de blocs et une API qui nous permet de communiquer avec la chaîne Ethereum sans avoir à exécuter nos propres nœuds. La plateforme dispose également d'outils de développement pour la surveillance et l'analyse dont nous tirerons parti dans ce tutoriel pour comprendre ce qui se passe en interne lors du déploiement de notre contrat intelligent. Si vous n'avez pas encore de compte Alchemy, [vous pouvez vous inscrire gratuitement ici](https://dashboard.alchemy.com/signup).

## Étape 2 : Créer votre application (et votre clé API) {#step-2}

Une fois que vous avez créé un compte Alchemy, vous pouvez générer une clé API en créant une application. Cela nous permettra d'effectuer des requêtes sur le réseau de test Sepolia. Si vous n'êtes pas familier avec les réseaux de test, consultez [cette page](/developers/docs/networks/).

1.  Accédez à la page « Create new app » (Créer une nouvelle application) dans votre tableau de bord Alchemy en sélectionnant « Select an app » (Sélectionner une application) dans la barre de navigation et en cliquant sur « Create new app »

![Hello world create app](./hello-world-create-app.png)

2. Nommez votre application « Hello World », proposez une brève description et choisissez un cas d'utilisation, par exemple « Infra & Tooling ». Ensuite, recherchez « Ethereum » et sélectionnez le réseau.

![create app view hello world](./create-app-view-hello-world.png)

3. Cliquez sur « Next » (Suivant) pour continuer, puis sur « Create app » (Créer l'application) et c'est tout ! Votre application devrait apparaître dans le menu déroulant de la barre de navigation, avec une clé API disponible à copier.

## Étape 3 : Créer un compte Ethereum (adresse) {#step-3}

Nous avons besoin d'un compte Ethereum pour envoyer et recevoir des transactions. Pour ce tutoriel, nous utiliserons MetaMask, un portefeuille virtuel dans le navigateur utilisé pour gérer l'adresse de votre compte Ethereum. Pour en savoir plus sur les [transactions](/developers/docs/transactions/).

Vous pouvez télécharger MetaMask et créer un compte Ethereum gratuitement [ici](https://metamask.io/download). Lors de la création d'un compte, ou si vous en avez déjà un, assurez-vous de basculer sur le réseau de test « Sepolia » à l'aide du menu déroulant des réseaux (afin de ne pas manipuler d'argent réel).

Si vous ne voyez pas Sepolia dans la liste, allez dans le menu, puis dans Paramètres avancés (Advanced) et faites défiler vers le bas pour activer « Afficher les réseaux de test » (Show test networks). Dans le menu de sélection du réseau, choisissez l'onglet « Personnalisé » (Custom) pour trouver une liste de réseaux de test et sélectionnez « Sepolia ».

![metamask sepolia example](./metamask-sepolia-example.png)

## Étape 4 : Ajouter de l'ether depuis un faucet {#step-4}

Afin de déployer notre contrat intelligent sur le réseau de test, nous aurons besoin de faux ETH. Pour obtenir des ETH Sepolia, vous pouvez vous rendre sur les [détails du réseau Sepolia](/developers/docs/networks/#sepolia) pour consulter une liste de différents faucets. Si l'un d'eux ne fonctionne pas, essayez-en un autre car ils peuvent parfois être à sec. La réception de vos faux ETH peut prendre un certain temps en raison du trafic sur le réseau. Vous devriez voir des ETH dans votre compte MetaMask peu de temps après !

## Étape 5 : Vérifier votre solde {#step-5}

Pour vérifier que notre solde est bien là, effectuons une requête [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) à l'aide de [l'outil Composer d'Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Cela renverra le montant d'ETH dans notre portefeuille. Après avoir saisi l'adresse de votre compte MetaMask et cliqué sur « Send Request » (Envoyer la requête), vous devriez voir une réponse comme celle-ci :

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **REMARQUE :** Ce résultat est en Wei et non en ETH. Le Wei est utilisé comme la plus petite dénomination de l'ether. La conversion du Wei en ETH est la suivante : 1 eth = 10<sup>18</sup> Wei. Donc, si nous convertissons 0x2B5E3AF16B1880000 en décimal, nous obtenons 5\*10¹⁸, ce qui équivaut à 5 ETH.
>
> Ouf ! Notre faux argent est bien là <Emoji text=":money_mouth_face:" size={1} />.

## Étape 6 : Initialiser notre projet {#step-6}

Tout d'abord, nous devrons créer un dossier pour notre projet. Accédez à votre ligne de commande et tapez :

```
mkdir hello-world
cd hello-world
```

Maintenant que nous sommes dans le dossier de notre projet, nous utiliserons `npm init` pour initialiser le projet. Si npm n'est pas encore installé, suivez [ces instructions](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (nous aurons également besoin de Node.js, alors téléchargez-le aussi !).

```
npm init
```

La façon dont vous répondez aux questions d'installation n'a pas vraiment d'importance, voici comment nous avons procédé à titre de référence :

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

## Étape 7 : Télécharger [Hardhat](https://hardhat.org/getting-started/#overview) {#step-7}

Hardhat est un environnement de développement permettant de compiler, déployer, tester et déboguer vos logiciels Ethereum. Il aide les développeurs lors de la création de contrats intelligents et d'applications décentralisées (dapps) localement avant de les déployer sur la chaîne en direct.

Dans notre projet `hello-world`, exécutez :

```
npm install --save-dev hardhat
```

Consultez cette page pour plus de détails sur les [instructions d'installation](https://hardhat.org/getting-started/#overview).

## Étape 8 : Créer un projet Hardhat {#step-8}

Dans le dossier de notre projet, exécutez :

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

👷 Welcome to Hardhat v2.0.11 👷‍?

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Cela générera un fichier `hardhat.config.js` pour nous, dans lequel nous spécifierons toute la configuration de notre projet (à l'étape 13).

## Étape 9 : Ajouter les dossiers du projet {#step-9}

Pour garder notre projet organisé, nous allons créer deux nouveaux dossiers. Accédez au répertoire racine de votre projet dans votre ligne de commande et tapez :

```
mkdir contracts
mkdir scripts
```

- `contracts/` est l'endroit où nous conserverons le fichier de code de notre contrat intelligent Hello World
- `scripts/` est l'endroit où nous conserverons les scripts pour déployer et interagir avec notre contrat

## Étape 10 : Écrire notre contrat {#step-10}

Vous vous demandez peut-être quand diable allons-nous écrire du code ?? Eh bien, nous y sommes, à l'étape 10.

Ouvrez le projet hello-world dans votre éditeur préféré (nous aimons [VSCode](https://code.visualstudio.com/)). Les contrats intelligents sont écrits dans un langage appelé Solidity, que nous utiliserons pour écrire notre contrat intelligent HelloWorld.sol.‌

1.  Accédez au dossier « contracts » et créez un nouveau fichier appelé HelloWorld.sol
2.  Vous trouverez ci-dessous un exemple de contrat intelligent Hello World de la Fondation Ethereum que nous utiliserons pour ce tutoriel. Copiez et collez le contenu ci-dessous dans votre fichier HelloWorld.sol, et assurez-vous de lire les commentaires pour comprendre ce que fait ce contrat :

```solidity
// Spécifie la version de Solidity, en utilisant le versionnage sémantique.
// En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// Définit un contrat nommé `HelloWorld`.
// Un contrat est un ensemble de fonctions et de données (son état). Une fois déployé, un contrat réside à une adresse spécifique sur la chaîne de blocs Ethereum. En savoir plus : https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Déclare une variable d'état `message` de type `string`.
   // Les variables d'état sont des variables dont les valeurs sont stockées de manière permanente dans le stockage du contrat. Le mot-clé `public` rend les variables accessibles depuis l'extérieur d'un contrat et crée une fonction que d'autres contrats ou clients peuvent appeler pour accéder à la valeur.
   string public message;

   // Similaire à de nombreux langages orientés objet basés sur des classes, un constructeur est une fonction spéciale qui n'est exécutée que lors de la création du contrat.
   // Les constructeurs sont utilisés pour initialiser les données du contrat. En savoir plus :https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepte un argument de chaîne `initMessage` et définit la valeur dans la variable de stockage `message` du contrat).
      message = initMessage;
   }

   // Une fonction publique qui accepte un argument de chaîne et met à jour la variable de stockage `message`.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Il s'agit d'un contrat intelligent très simple qui stocke un message lors de sa création et qui peut être mis à jour en appelant la fonction `update`.

## Étape 11 : Connecter MetaMask et Alchemy à votre projet {#step-11}

Nous avons créé un portefeuille MetaMask, un compte Alchemy et écrit notre contrat intelligent, il est maintenant temps de connecter les trois.

Chaque transaction envoyée depuis votre portefeuille virtuel nécessite une signature à l'aide de votre clé privée unique. Pour accorder cette autorisation à notre programme, nous pouvons stocker en toute sécurité notre clé privée (et la clé API Alchemy) dans un fichier d'environnement.

> Pour en savoir plus sur l'envoi de transactions, consultez [ce tutoriel](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) sur l'envoi de transactions à l'aide de Web3.

Tout d'abord, installez le paquet dotenv dans le répertoire de votre projet :

```
npm install dotenv --save
```

Ensuite, créez un fichier `.env` dans le répertoire racine de notre projet, et ajoutez-y votre clé privée MetaMask et l'URL HTTP de l'API Alchemy.

- Suivez [ces instructions](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) pour exporter votre clé privée
- Voir ci-dessous pour obtenir l'URL HTTP de l'API Alchemy

![get alchemy api key](./get-alchemy-api-key.png)

Copier l'URL de l'API Alchemy

Votre fichier `.env` devrait ressembler à ceci :

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Pour les connecter réellement à notre code, nous ferons référence à ces variables dans notre fichier `hardhat.config.js` à l'étape 13.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Ne commitez pas <code>.env</code> ! Assurez-vous de ne jamais partager ou exposer votre fichier <code>.env</code> à qui que ce soit, car vous compromettriez vos secrets en le faisant. Si vous utilisez un système de contrôle de version, ajoutez votre <code>.env</code> à un fichier <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Étape 12 : Installer Ethers.js {#step-12-install-ethersjs}

Ethers.js est une bibliothèque qui facilite l'interaction et l'envoi de requêtes à Ethereum en enveloppant les [méthodes JSON-RPC standards](/developers/docs/apis/json-rpc/) avec des méthodes plus conviviales.

Hardhat facilite grandement l'intégration de [plugins](https://hardhat.org/plugins/) pour des outils supplémentaires et des fonctionnalités étendues. Nous tirerons parti du [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) pour le déploiement de contrats ([Ethers.js](https://github.com/ethers-io/ethers.js/) dispose de méthodes de déploiement de contrats très propres).

Dans le répertoire de votre projet, tapez :

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Nous aurons également besoin d'ethers dans notre `hardhat.config.js` à l'étape suivante.

## Étape 13 : Mettre à jour hardhat.config.js {#step-13-update-hardhatconfigjs}

Nous avons ajouté plusieurs dépendances et plugins jusqu'à présent, nous devons maintenant mettre à jour `hardhat.config.js` pour que notre projet les prenne tous en compte.

Mettez à jour votre `hardhat.config.js` pour qu'il ressemble à ceci :

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

Pour nous assurer que tout fonctionne jusqu'à présent, compilons notre contrat. La tâche `compile` est l'une des tâches intégrées de Hardhat.

À partir de la ligne de commande, exécutez :

```
npx hardhat compile
```

Vous pourriez recevoir un avertissement concernant `SPDX license identifier not provided in source file`, mais ne vous en inquiétez pas — espérons que tout le reste semble correct ! Sinon, vous pouvez toujours envoyer un message sur le [Discord d'Alchemy](https://discord.gg/u72VCg3).

## Étape 15 : Écrire notre script de déploiement {#step-15-write-our-deploy-scripts}

Maintenant que notre contrat est écrit et que notre fichier de configuration est prêt, il est temps d'écrire notre script de déploiement de contrat.

Accédez au dossier `scripts/` et créez un nouveau fichier appelé `deploy.js`, en y ajoutant le contenu suivant :

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Démarre le déploiement, renvoyant une promesse qui se résout en un objet de contrat
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contract deployed to address:", hello_world.address);}

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

Un `ContractFactory` dans Ethers.js est une abstraction utilisée pour déployer de nouveaux contrats intelligents, donc `HelloWorld` ici est une fabrique pour les instances de notre contrat Hello World. Lors de l'utilisation du plugin `hardhat-ethers`, les instances `ContractFactory` et `Contract` sont connectées au premier signataire par défaut.

```
const hello_world = await HelloWorld.deploy();
```

L'appel de `deploy()` sur un `ContractFactory` démarrera le déploiement et renverra une `Promise` qui se résout en un `Contract`. Il s'agit de l'objet qui possède une méthode pour chacune des fonctions de notre contrat intelligent.

## Étape 16 : Déployer notre contrat {#step-16-deploy-our-contract}

Nous sommes enfin prêts à déployer notre contrat intelligent ! Accédez à la ligne de commande et exécutez :

```
npx hardhat run scripts/deploy.js --network sepolia
```

Vous devriez alors voir quelque chose comme :

```
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Si nous allons sur [Etherscan Sepolia](https://sepolia.etherscan.io/) et recherchons l'adresse de notre contrat, nous devrions pouvoir voir qu'il a été déployé avec succès. La transaction ressemblera à ceci :

![etherscan contract](./etherscan-contract.png)

L'adresse `From` doit correspondre à l'adresse de votre compte MetaMask et l'adresse de destination (To) indiquera « Contract Creation » (Création de contrat), mais si nous cliquons sur la transaction, nous verrons l'adresse de notre contrat dans le champ `To` :

![etherscan transaction](./etherscan-transaction.png)

Félicitations ! Vous venez de déployer un contrat intelligent sur la chaîne Ethereum 🎉

Pour comprendre ce qui se passe en interne, accédons à l'onglet Explorer (Explorateur) dans notre [tableau de bord Alchemy](https://dashboard.alchemyapi.io/explorer). Si vous avez plusieurs applications Alchemy, assurez-vous de filtrer par application et de sélectionner « Hello World ».
![hello world explorer](./hello-world-explorer.png)

Ici, vous verrez une poignée d'appels JSON-RPC que Hardhat/Ethers a effectués en interne pour nous lorsque nous avons appelé la fonction `.deploy()`. Deux appels importants à souligner ici sont [`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction), qui est la requête pour écrire réellement notre contrat sur la chaîne Sepolia, et [`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash) qui est une requête pour lire des informations sur notre transaction à partir du hash (un modèle typique lors des transactions). Pour en savoir plus sur l'envoi de transactions, consultez ce tutoriel sur [l'envoi de transactions à l'aide de Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)

C'est tout pour la partie 1 de ce tutoriel, dans la partie 2, nous allons réellement [interagir avec notre contrat intelligent](https://www.alchemy.com/docs/interacting-with-a-smart-contract) en mettant à jour notre message initial, et dans la partie 3, nous allons [publier notre contrat intelligent sur Etherscan](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) afin que tout le monde sache comment interagir avec lui.

**Vous voulez en savoir plus sur Alchemy ? Consultez notre [site Web](https://www.alchemy.com/eth). Vous ne voulez manquer aucune mise à jour ? Abonnez-vous à notre newsletter [ici](https://www.alchemy.com/newsletter) ! Assurez-vous également de rejoindre notre [Discord](https://discord.gg/u72VCg3).**.