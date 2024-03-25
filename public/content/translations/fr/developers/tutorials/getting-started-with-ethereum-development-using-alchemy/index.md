---
title: Bien débuter avec le développement Ethereum
description: "Ceci est un guide permettant aux débutants de s'initier avec le développement Ethereum. Nous allons vous guider de la création d'un point d'accès à l'API à l'écriture de votre premier script Web3, en passant par celle d'une requête en ligne de commande ! Aucune expérience préalable dans le développement de blockchain n'est requise !"
author: "Elan Halpern"
tags:
  - "javascript"
  - "ethers.js"
  - "nœuds"
  - "requêtes"
  - "alchemy"
skill: beginner
lang: fr
published: 2020-10-30
source: Moyen
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Logos Ethereum et Alchemy](./ethereum-alchemy.png)

Ceci est un guide pour les débutants qui souhaitent se lancer dans le développement Ethereum. Pour ce tutoriel, nous allons utiliser [Alchemy](https://alchemyapi.io/), la principale plateforme de développement blockchain qui sert des millions d'utilisateurs parmi 70 % des principales applications blockchain, dont Maker, 0x, MyEtherWallet, Dharma et Kyber. Alchemy va nous permettre d'accéder à un point de terminaison API sur la chaîne Ethereum afin que nous puissions lire et écrire des transactions.

Nous vous guiderons à travers toutes les étapes, de votre inscription sur Alchemy à votre premier script Web3 ! Aucune expérience préalable dans le développement de blockchain n'est requise !

## 1. Créez votre compte Alchemy gratuit {#sign-up-for-a-free-alchemy-account}

Il est très facile de créer un compte sur Alchemy. [Inscrivez-vous gratuitement ici](https://auth.alchemyapi.io/signup).

## 2. Créer une application Alchemy {#create-an-alchemy-app}

Pour communiquer avec la chaîne Ethereum et utiliser les services d'Alchemy, vous aurez besoin d'une clé d'API pour authentifier vos requêtes.

Vous pouvez [créer vos clés API depuis le tableau de bord](http://dashboard.alchemyapi.io/). Pour créer un nouvelle clé, cliquez sur « Créer une application » comme indiqué ci-dessous :

Un grand merci à [_ShapeShift_](https://shapeshift.com/) _de nous laisser utiliser leur tableau de bord à titre d'exemple !_

![Tableau de bord Alchemy](./alchemy-dashboard.png)

Remplissez les détails sous « Créer une application » pour obtenir votre nouvelle clé. Vous pouvez également voir les applications que vous avez faites précédemment et celles faites par votre équipe ici. Tirez les clés existantes en cliquant sur « Voir la clé » pour n'importe quelle application.

![Créer une application avec Alchemy : capture d'écran](./create-app.png)

Vous pouvez également extraire les clés API existantes en passant la souris sur « Apps » et en en sélectionnant une. Vous pouvez « Voir la clé » ici, ainsi que « Modifier l'application » pour mettre des domaines spécifiques sur la liste blanche, voir plusieurs outils de développement et consulter les analyses.

![Gif montrant à un utilisateur comment tirer des clés d'API](./pull-api-keys.gif)

## 3. Faire une demande en ligne de commande {#make-a-request-from-the-command-line}

Interagissez avec la blockchain Ethereum via Alchemy en utilisant JSON-RPC et curl.

Pour les demandes manuelles, nous recommandons d'interagir avec les `JSON-RPC` via des demandes `POST`. Il suffit de passer l'en-tête `Content-Type : application/json` et votre requête comme corps `POST` avec les champs suivants :

- `jsonrpc` : La version de JSON-RPC - actuellement, seule `2.0` est supportée.
- `méthode` : La méthode de l'API de l'ETH. [Voir la référence API.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params` : Une liste de paramètres à transmettre à la méthode.
- `id` : L'ID de votre demande. Sera retourné par la réponse afin que vous puissiez garder la trace de la demande à laquelle une réponse appartient.

Voici un exemple que vous pouvez exécuter à partir de la ligne de commande pour obtenir le prix actuel du gaz :

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**REMARQUE :** Remplacez [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) par votre propre clé API `https://eth-mainnet.alchemyapi.io/v2/**votre-cle-api`._

**Résultats :**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. Configurer votre client Web3 {#set-up-your-web3-client}

**Si vous avez un client existant,** changez votre URL actuelle de fournisseur de nœuds en une URL Alchemy avec votre clé API : `"https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_NOTE :_** Les scripts ci-dessous doivent être exécutés dans un **contexte de nœud** ou **sauvegardé dans un fichier**, et non exécutés en ligne de commande. Si vous n'avez pas encore installé Node ou npm, consultez ce rapide [guide d'installation pour macs](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs).

De nombreuses [bibliothèques Web3](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) peuvent être intégrées à Alchemy, cependant, nous recommandons d'utiliser [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), un remplacement drop-in pour Web3.js, construit et configuré pour fonctionner de façon transparente avec Alchemy. Cela présente de nombreux avantages, comme les tentatives automatiques et la prise en charge robuste de WebSocket.

Pour installer AlchemyWeb3.js, **accédez au répertoire de votre projet** et exécutez :

**Avec Yarn :**

```
yarn add @alch/alchemy-web3
```

**Avec NPM :**

```
npm install @alch/alchemy-web3
```

Pour interagir avec l'infrastructure de nœuds d'Alchemy, exécutez en NodeJS ou ajoutez ceci à un fichier JavaScript :

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/votre-clé-api"
)
```

## 5. Écrivez votre premier script Web3 ! {#write-your-first-web3-script}

Maintenant pour nous salir les mains avec un peu de programmation Web3, nous allons écrire un script simple qui affiche le dernier numéro de bloc du réseau principal Ethereum.

**1. Si vous ne l'avez pas déjà fait, dans votre terminal, créez un nouveau répertoire de projet et cd dedans :**

```
mkdir web3-example
cd web3-example
```

**2. Installez la dépendance Alchemy Web3 (ou toute dépendance Web3) dans votre projet si vous ne l'avez pas déjà fait :**

```
npm install @alch/alchemy-web3
```

**3. Créez un fichier nommé `index.js` et ajoutez le contenu suivant :**

> Vous devrez remplacer `demo` avec votre clé API Alchemy HTTP.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

Vous n'êtes pas familiarisé avec l'asynchronisme ? Consultez ce [Medium post](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c).

**4. Exécutez-le dans votre terminal en utilisant le nœud**

```
node index.js
```

**5. Vous devriez maintenant voir apparaître le dernier numéro de bloc dans votre console !**

```
The latest block number is 11043912
```

**Wahou ! Félicitations ! Vous venez de rédiger votre premier script Web3 avec Alchemy 🎉**

Vous ne savez pas quoi faire ensuite ? Essayez de déployer votre premier contrat intelligent et mettez la main à la pâte avec un peu de programmation Solidity dans notre [Guide de contrats intelligents « Hello World »](https://docs.alchemyapi.io/tutorials/hello-world-smart-contract), ou testez vos connaissances avec le [Tableau de bord de démonstration](https://docs.alchemyapi.io/tutorials/demo-app) !

_[S'inscrire gratuitement à Alchemy](https://auth.alchemyapi.io/signup), consulter notre [documentation](https://docs.alchemyapi.io/), et pour les dernières nouvelles, nous suivre sur [Twitter](https://twitter.com/AlchemyPlatform)_.
