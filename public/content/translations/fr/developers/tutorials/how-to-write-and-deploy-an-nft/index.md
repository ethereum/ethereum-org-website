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

Les jetons non fongibles (NFT) ayant mis la chaîne de blocs sur le devant de la scène, c'est une excellente occasion de comprendre cet engouement par vous-même en publiant votre propre contrat de NFT (jeton ERC-721) sur la chaîne de blocs Ethereum !

Dans ce tutoriel, nous allons vous guider dans la création et le déploiement d'un contrat intelligent ERC-721 sur le réseau de test Sepolia en utilisant [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) et [Alchemy](https://alchemy.com/signup/eth) (ne vous inquiétez pas si vous ne comprenez pas encore ce que tout cela signifie, nous allons l'expliquer !).

Dans la partie 2 de ce tutoriel, nous verrons comment utiliser notre contrat intelligent pour frapper un NFT, et dans la partie 3, nous expliquerons comment visualiser votre NFT sur MetaMask.

Et bien sûr, si vous avez des questions à un moment donné, n'hésitez pas à nous contacter sur le [Discord d'Alchemy](https://discord.gg/gWuC7zB) ou à visiter la [documentation de l'interface de programmation d'application (API) NFT d'Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart) !

## Étape 1 : Se connecter au réseau Ethereum {#connect-to-ethereum}

Il existe de nombreuses façons de faire des requêtes à la chaîne de blocs Ethereum, mais pour simplifier les choses, nous utiliserons un compte gratuit sur [Alchemy](https://alchemy.com/signup/eth), une plateforme de développement de chaîne de blocs et une API qui nous permet de communiquer avec la chaîne Ethereum sans avoir à exécuter nos propres nœuds.

Dans ce tutoriel, nous profiterons également des outils de développement d'Alchemy pour la surveillance et l'analyse afin de comprendre ce qui se passe en interne lors du déploiement de notre contrat intelligent. Si vous n'avez pas encore de compte Alchemy, vous pouvez vous inscrire gratuitement [ici](https://alchemy.com/signup/eth).

## Étape 2 : Créer votre application (et votre clé API) {#make-api-key}

Une fois que vous avez créé un compte Alchemy, vous pouvez générer une clé d'interface de programmation d'application (API) en créant une application. Cela nous permettra de faire des requêtes au réseau de test Sepolia. Consultez [ce guide](https://www.alchemy.com/docs/choosing-a-web3-network) si vous êtes curieux d'en savoir plus sur les réseaux de test.

1. Accédez à la page « Create new app » (Créer une nouvelle application) dans votre tableau de bord Alchemy en sélectionnant « Select an app » (Sélectionner une application) dans la barre de navigation et en cliquant sur « Create new app ».

![Créer votre application](./alchemy-create-new-app.png)

2. Nommez votre application (nous avons choisi « My First NFT! »), ajoutez une courte description et choisissez un cas d'utilisation. Ensuite, recherchez « Ethereum » et sélectionnez le réseau. Nous utiliserons Sepolia, le réseau de test recommandé pour le développement d'applications (voir [Réseaux Ethereum](/developers/docs/networks/#ethereum-testnets)).

3. Cliquez sur « Next » (Suivant) pour continuer, puis sur « Create app » (Créer l'application) et c'est tout ! Votre application devrait apparaître dans le menu déroulant de la barre de navigation, avec une clé API disponible à copier.

## Étape 3 : Créer un compte Ethereum (adresse) {#create-eth-address}

Nous avons besoin d'un compte Ethereum pour envoyer et recevoir des transactions. Pour ce tutoriel, nous utiliserons MetaMask, un portefeuille virtuel dans le navigateur utilisé pour gérer l'adresse de votre compte Ethereum. Si vous souhaitez mieux comprendre le fonctionnement des transactions sur Ethereum, consultez [cette page](/developers/docs/transactions/) de la Fondation Ethereum.

Vous pouvez télécharger et créer un compte MetaMask gratuitement [ici](https://metamask.io/download). Lors de la création d'un compte, ou si vous en avez déjà un, assurez-vous de basculer sur le réseau de test « Sepolia » à l'aide du menu de sélection du réseau (afin de ne pas manipuler d'argent réel). Si vous ne voyez pas Sepolia dans la liste, ouvrez le menu dans le coin supérieur droit, sélectionnez « Networks » (Réseaux) et activez « Show test networks » (Afficher les réseaux de test) (voir le [guide de MetaMask pour afficher les réseaux de test](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)).

![Définir Sepolia comme votre réseau](./metamask-sepolia.png)

## Étape 4 : Ajouter de l'ether depuis un faucet {#step-4-add-ether-from-a-faucet}

Afin de déployer notre contrat intelligent sur le réseau de test, nous aurons besoin de faux ETH. Pour obtenir des ETH Sepolia, choisissez l'un des faucets listés dans les [détails du réseau Sepolia](/developers/docs/networks/#sepolia) et entrez l'adresse de votre compte. Si l'un d'eux ne fonctionne pas, essayez-en un autre car ils peuvent parfois être à sec, et certains ont des règles d'éligibilité : par exemple, le [faucet Sepolia d'Alchemy](https://www.alchemy.com/faucets/ethereum-sepolia) exige que l'adresse de réception détienne au moins 0,001 ETH sur le réseau principal Ethereum. Vous devriez voir des ETH dans votre compte MetaMask peu de temps après !

## Étape 5 : Vérifier votre solde {#check-balance}

Pour vérifier que notre solde est bien là, faisons une requête [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) en utilisant [l'outil bac à sable d'Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Cela renverra le montant d'ETH dans notre portefeuille. Après avoir saisi l'adresse de votre compte MetaMask et cliqué sur « Send Request » (Envoyer la requête), vous devriez voir une réponse comme celle-ci :

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **Remarque** Ce résultat est en Wei, pas en ETH. Le Wei est utilisé comme la plus petite dénomination d'ether. La conversion de Wei en ETH est 1 eth = 10<sup>18</sup> Wei. Donc, si nous convertissons 0xde0b6b3a7640000 en décimal, nous obtenons 1\*10<sup>18</sup> Wei, ce qui équivaut à 1 ETH.

Ouf ! Notre fausse monnaie est bien là.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```
## Étape 6 : Initialiser notre projet {#initialize-project}

Tout d'abord, nous devrons créer un dossier pour notre projet. Accédez à votre ligne de commande et tapez :

```sh
mkdir my-nft
cd my-nft
```

Maintenant que nous sommes dans le dossier de notre projet, nous allons utiliser `npm init` pour initialiser le projet. Si npm n'est pas encore installé, suivez [les instructions d'installation de Node.js](https://nodejs.org/en/download/) (nous aurons besoin de Node.js et de npm pour ce tutoriel).

```sh
npm init
```

La façon dont vous répondez aux questions d'installation n'a pas vraiment d'importance ; voici comment nous l'avons fait à titre de référence :

```text
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

Approuvez le fichier package.json. Hardhat 3, que nous installerons ensuite, ne prend en charge que les projets de modules ES, marquez donc le projet comme tel :

```sh
npm pkg set type=module
```

Et nous sommes prêts à commencer !

## Étape 7 : Installer [Hardhat](https://hardhat.org/docs/getting-started) {#install-hardhat}

Hardhat est un environnement de développement pour compiler, déployer, tester et déboguer vos logiciels Ethereum. Il aide les développeurs lors de la création de contrats intelligents et d'applications décentralisées (dapps) localement avant de les déployer sur la chaîne en direct.

Hardhat 3 nécessite Node.js v22.13.0 ou une version ultérieure. Dans notre projet my-nft, exécutez :

```sh
npm install --save-dev hardhat
```

Consultez cette page pour plus de détails sur les [instructions d'installation](https://hardhat.org/docs/getting-started).

## Étape 8 : Créer un projet Hardhat {#create-hardhat-project}

L'exécution de `npx hardhat --init` générerait un exemple de projet complet, mais pour ce tutoriel, nous allons tout configurer manuellement afin que vous puissiez voir chaque élément. À la racine du dossier de votre projet, créez un fichier appelé `hardhat.config.js` avec le contenu suivant :

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

C'est ici que nous spécifierons toute la configuration de notre projet (à l'étape 13). Pour l'instant, cela indique simplement à Hardhat quelle version du compilateur Solidity utiliser.

## Étape 9 : Ajouter des dossiers de projet {#add-project-folders}

Pour garder notre projet organisé, nous allons créer deux nouveaux dossiers. Accédez au répertoire racine de votre projet dans votre ligne de commande et tapez :

```sh
mkdir contracts
mkdir scripts
```

- `contracts/` est l'endroit où nous conserverons le code de notre contrat intelligent de jeton non fongible (NFT).

- `scripts/` est l'endroit où nous conserverons les scripts pour déployer et interagir avec notre contrat intelligent.

## Étape 10 : Écrire notre contrat {#write-contract}

Maintenant que notre environnement est configuré, passons à des choses plus passionnantes : _l'écriture du code de notre contrat intelligent !_

Ouvrez le projet my-nft dans votre éditeur préféré (nous aimons [VSCode](https://code.visualstudio.com/)). Les contrats intelligents sont écrits dans un langage appelé Solidity, que nous utiliserons pour écrire notre contrat intelligent MyNFT.sol.‌

1. Accédez au dossier `contracts` et créez un nouveau fichier appelé MyNFT.sol.

2. Vous trouverez ci-dessous le code de notre contrat intelligent de jeton non fongible (NFT), que nous avons basé sur l'implémentation ERC-721 de la bibliothèque [OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/erc721). Copiez et collez le contenu ci-dessous dans votre fichier MyNFT.sol.

   ```solidity
   // Contrat basé sur https://docs.openzeppelin.com/contracts/5.x/erc721
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.24;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       uint256 private _nextTokenId;

       constructor(address initialOwner)
           ERC721("MyNFT", "NFT")
           Ownable(initialOwner)
       {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           uint256 newItemId = ++_nextTokenId;
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. Étant donné que nous héritons des classes de la bibliothèque de contrats OpenZeppelin, exécutez `npm install @openzeppelin/contracts` dans votre ligne de commande pour installer la bibliothèque dans notre dossier. Ce tutoriel utilise OpenZeppelin Contracts 5.x, qui nécessite Solidity 0.8.24 ou une version ultérieure.

Alors, que _fait_ exactement ce code ? Analysons-le ligne par ligne.

En haut de notre contrat intelligent, nous importons trois classes de contrats intelligents [OpenZeppelin](https://openzeppelin.com/) :

- `@openzeppelin/contracts/token/ERC721/ERC721.sol` contient l'implémentation de la norme ERC-721, dont notre contrat intelligent de NFT héritera. (Pour être un NFT valide, votre contrat intelligent doit implémenter toutes les méthodes de la norme ERC-721.) Pour en savoir plus sur les fonctions ERC-721 héritées, consultez la définition de l'interface [ici](https://eips.ethereum.org/EIPS/eip-721).

- `@openzeppelin/contracts/access/Ownable.sol` configure le [contrôle d'accès](https://docs.openzeppelin.com/contracts/5.x/access-control) sur notre contrat intelligent, de sorte que seul le propriétaire du contrat intelligent (vous) puisse frapper des NFT. Le propriétaire est l'adresse `initialOwner` passée au constructeur. (Remarque : l'inclusion du contrôle d'accès est entièrement une question de préférence. Si vous souhaitez que n'importe qui puisse frapper un NFT à l'aide de votre contrat intelligent, supprimez `Ownable` et `Ownable(initialOwner)` de la définition du contrat et du constructeur, ainsi que `onlyOwner` de la fonction `mintNFT`.)

- `@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol` étend ERC-721 afin que chaque jeton puisse stocker son propre URI de métadonnées, que nous définissons lors de la frappe.

Après nos instructions d'importation, nous avons notre contrat intelligent de NFT personnalisé, qui est étonnamment court : il ne contient qu'un compteur, un constructeur et une seule fonction ! C'est grâce à nos contrats OpenZeppelin hérités, qui implémentent la plupart des méthodes dont nous avons besoin pour créer un NFT, telles que `ownerOf` qui renvoie le propriétaire du NFT, et `transferFrom`, qui transfère la propriété du NFT d'un compte à un autre.

Le compteur, `_nextTokenId`, garde une trace du nombre total de NFT frappés et définit l'identifiant unique sur notre nouveau NFT. (Chaque NFT frappé à l'aide d'un contrat intelligent doit se voir attribuer un identifiant unique — ici, notre identifiant unique est simplement déterminé par le nombre total de NFT existants. `++_nextTokenId` incrémente le compteur avant qu'il ne soit utilisé, de sorte que le premier NFT que nous frappons avec notre contrat intelligent a un identifiant de « 1 », notre deuxième NFT a un identifiant de « 2 », etc.)

Dans notre constructeur ERC-721, vous remarquerez que nous passons 2 chaînes de caractères, « MyNFT » et « NFT ». La première variable est le nom du contrat intelligent, et la seconde est son symbole. Vous pouvez nommer chacune de ces variables comme vous le souhaitez !

Enfin, nous avons notre fonction `mintNFT(address recipient, string memory tokenURI)` qui nous permet de frapper un NFT ! Vous remarquerez que cette fonction prend deux variables :

- `address recipient` spécifie l'adresse qui recevra votre NFT fraîchement frappé.

- `string memory tokenURI` est une chaîne de caractères qui doit se résoudre en un document JSON décrivant les métadonnées du NFT. Les métadonnées d'un NFT sont vraiment ce qui lui donne vie, lui permettant d'avoir des propriétés configurables, telles qu'un nom, une description, une image et d'autres attributs. Dans la partie 2 de ce tutoriel, nous décrirons comment configurer ces métadonnées.

`mintNFT` appelle certaines méthodes de la bibliothèque ERC-721 héritée, et renvoie finalement un nombre qui représente l'identifiant du NFT fraîchement frappé.

## Étape 11 : Connecter MetaMask et Alchemy à votre projet {#connect-metamask-and-alchemy}

Maintenant que nous avons créé un portefeuille MetaMask, un compte Alchemy et écrit notre contrat intelligent, il est temps de connecter les trois.

Chaque transaction envoyée depuis votre portefeuille virtuel nécessite une signature à l'aide de votre clé privée unique. Pour accorder cette autorisation à notre programme, nous pouvons stocker en toute sécurité notre clé privée (et la clé d'interface de programmation d'application (API) d'Alchemy) dans un fichier d'environnement.

Pour en savoir plus sur l'envoi de transactions, consultez la [documentation sur les transactions](/developers/docs/transactions/).

Créez un fichier `.env` dans le répertoire racine de notre projet, et ajoutez-y votre clé privée MetaMask et l'URL de l'API HTTP d'Alchemy.

- Suivez [ces instructions](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) pour exporter votre clé privée depuis MetaMask.

- Voir ci-dessous pour obtenir l'URL de l'API HTTP d'Alchemy et la copier dans votre presse-papiers.

![Copier l'URL de votre API Alchemy](./copy-alchemy-api-url.mp4#842x480)

Votre fichier `.env` devrait maintenant ressembler à ceci :

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Pour les connecter réellement à notre code, nous ferons référence à ces variables dans notre fichier `hardhat.config.js` à l'étape 13. Node.js peut lire les fichiers `.env` par lui-même, il n'y a donc pas de paquet supplémentaire à installer.

<EnvWarningBanner />

## Étape 12 : Installer Ethers.js {#install-ethers}

Ethers.js est une bibliothèque qui facilite l'interaction et l'envoi de requêtes à Ethereum en enveloppant les [méthodes JSON-RPC standard](/developers/docs/apis/json-rpc/) avec des méthodes plus conviviales.

Hardhat rend très facile l'intégration de [plugins](https://hardhat.org/docs/plugins/official-plugins) pour des outils supplémentaires et des fonctionnalités étendues. Nous tirerons parti du [plugin Ethers](https://hardhat.org/docs/plugins/hardhat-ethers) pour le déploiement de contrats ([Ethers.js](https://docs.ethers.org/v6/) possède des méthodes de déploiement de contrats très propres).

Dans le répertoire de votre projet, tapez :

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

Nous ajouterons également le plugin à notre fichier `hardhat.config.js` à l'étape suivante.

## Étape 13 : Mettre à jour hardhat.config.js {#update-hardhat-config}

Nous avons ajouté plusieurs dépendances et plugins jusqu'à présent, nous devons maintenant mettre à jour `hardhat.config.js` pour que notre projet les connaisse tous.

Mettez à jour votre fichier `hardhat.config.js` pour qu'il ressemble à ceci :

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// Charge API_URL et PRIVATE_KEY depuis le fichier .env dans process.env, s'il existe
if (existsSync(".env")) process.loadEnvFile()

export default defineConfig({
  plugins: [hardhatEthers],
  solidity: "0.8.34",
  networks: {
    sepolia: {
      type: "http",
      url: configVariable("API_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
})
```

`configVariable` indique à Hardhat de lire chaque valeur à partir d'une variable d'environnement uniquement lorsque cela est nécessaire, de sorte que des commandes comme `compile` fonctionnent même avant que les valeurs ne soient définies. Si vous préférez ne pas conserver votre clé privée dans un fichier texte brut, Hardhat peut également lire les [variables de configuration à partir d'un magasin de clés chiffré](https://hardhat.org/docs/guides/configuration-variables).

## Étape 14 : Compiler notre contrat {#compile-contract}

Pour nous assurer que tout fonctionne jusqu'à présent, compilons notre contrat. La tâche de compilation est l'une des tâches intégrées de Hardhat.

Depuis la ligne de commande, exécutez :

```sh
npx hardhat compile
```

La première fois que vous compilez, Hardhat télécharge le compilateur Solidity. Vous devriez ensuite voir quelque chose comme `Compiled 1 Solidity file with solc 0.8.34`. Si ce n'est pas le cas, vous pouvez toujours envoyer un message sur le [Discord d'Alchemy](https://discord.gg/gWuC7zB).

## Étape 15 : Écrire notre script de déploiement {#write-deploy}

Maintenant que notre contrat est écrit et que notre fichier de configuration est prêt, il est temps d'écrire notre script de déploiement de contrat.

Accédez au dossier `scripts/` et créez un nouveau fichier appelé `deploy.js`, en y ajoutant le contenu suivant :

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const [deployer] = await ethers.getSigners()
const MyNFT = await ethers.getContractFactory("MyNFT")

// Démarre le déploiement, retournant une promesse qui se résout en un objet contrat
const myNFT = await MyNFT.deploy(deployer.address)
await myNFT.waitForDeployment()
console.log("Contract deployed to address:", await myNFT.getAddress())
```

Passons en revue ce que fait chacune de ces lignes de code.

```js
const { ethers } = await network.create()
```

Dans Hardhat 3, un script ouvre explicitement une connexion à un réseau. `network.create()` se connecte au réseau que vous choisissez avec l'option `--network` lorsque vous exécutez le script, et le plugin `hardhat-ethers` ajoute un objet `ethers` à cette connexion.

```js
const [deployer] = await ethers.getSigners()
```

`getSigners()` renvoie les comptes configurés pour le réseau. Sur Sepolia, il s'agit du compte dont vous avez mis la clé privée dans `.env`. Nous passons son adresse au constructeur afin que vous deveniez le propriétaire du contrat.

```js
const MyNFT = await ethers.getContractFactory("MyNFT")
```

Une `ContractFactory` dans Ethers.js est une abstraction utilisée pour déployer de nouveaux contrats intelligents, donc `MyNFT` ici est une fabrique pour les instances de notre contrat de jeton non fongible (NFT). Lors de l'utilisation du plugin `hardhat-ethers`, les instances de `ContractFactory` et de `Contract` sont connectées au premier signataire par défaut.

```js
const myNFT = await MyNFT.deploy(deployer.address)
```

L'appel de `deploy()` sur une `ContractFactory` démarrera le déploiement et renverra une promesse (Promise) qui se résout en un `Contract`. C'est l'objet qui possède une méthode pour chacune des fonctions de notre contrat intelligent. Les arguments que vous passez à `deploy()` vont au constructeur du contrat, ici l'adresse `initialOwner`.

`waitForDeployment()` attend que la transaction de déploiement soit incluse dans un bloc, et `getAddress()` renvoie l'adresse du nouveau contrat. Consultez la [documentation sur les contrats d'Ethers.js](https://docs.ethers.org/v6/api/contract/) pour plus de détails.

## Étape 16 : Déployer notre contrat {#deploy-contract}

Nous sommes enfin prêts à déployer notre contrat intelligent ! Revenez à la racine du répertoire de votre projet et, dans la ligne de commande, exécutez :

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

Vous devriez alors voir quelque chose comme :

```text
Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
```

Si nous allons sur [Etherscan Sepolia](https://sepolia.etherscan.io/) et recherchons l'adresse de notre contrat, nous devrions pouvoir voir qu'il a été déployé avec succès. Si vous ne le voyez pas immédiatement, veuillez patienter un peu car cela peut prendre un certain temps. La transaction ressemblera à ceci :

![Voir l'adresse de votre transaction sur Etherscan](./etherscan-sepoila-contract-creation.png)

L'adresse « From » (De) doit correspondre à l'adresse de votre compte MetaMask et l'adresse « To » (À) indiquera « Contract Creation » (Création de contrat). Si nous cliquons sur la transaction, nous verrons l'adresse de notre contrat dans le champ « To » :

![Voir l'adresse de votre contrat sur Etherscan](./etherscan-sepolia-tx-details.png)

Ouaiiiis ! Vous venez de déployer votre contrat intelligent de jeton non fongible (NFT) sur la chaîne (réseau de test) Ethereum !

Pour comprendre ce qui se passe en interne, vous pouvez consulter les requêtes que votre application a reçues dans votre [tableau de bord Alchemy](https://dashboard.alchemy.com/).

Vous y verrez une poignée d'appels JSON-RPC que Hardhat/Ethers a effectués en interne pour nous lorsque nous avons appelé la fonction `.deploy()`. Deux appels importants à souligner ici sont [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth-sendrawtransaction), qui est la requête pour écrire réellement notre contrat intelligent sur la chaîne Sepolia, et [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash) qui est une requête pour lire des informations sur notre transaction à partir du hash (un modèle typique lors de l'envoi de transactions). Pour en savoir plus sur l'envoi de transactions, consultez la [documentation sur les transactions](/developers/docs/transactions/).

C'est tout pour la partie 1 de ce tutoriel. Dans la [partie 2, nous interagirons réellement avec notre contrat intelligent en frappant un NFT](/developers/tutorials/how-to-mint-an-nft/), et dans la [partie 3, nous vous montrerons comment visualiser votre NFT dans votre portefeuille Ethereum](/developers/tutorials/how-to-view-nft-in-metamask/) !
