---
title: "Premiers pas avec le développement sur Ethereum"
description: "Ceci est un guide pour débutants pour faire ses premiers pas dans le développement sur Ethereum. Nous vous accompagnerons de la configuration d'un point de terminaison d'API à l'écriture de votre premier script Web3, en passant par l'exécution d'une requête en ligne de commande ! Aucune expérience en développement de chaîne de blocs n'est requise !"
author: "Elan Halpern"
tags: ["JavaScript", "ethers.js", "nœuds", "requêtes", "Alchemy"]
skill: beginner
breadcrumb: Premiers pas
lang: fr
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Ethereum and Alchemy logos](./ethereum-alchemy.png)

Ceci est un guide pour débutants pour faire ses premiers pas dans le développement sur Ethereum. Pour ce tutoriel, nous utiliserons [Alchemy](https://www.alchemy.com/), la principale plateforme de développement de chaîne de blocs qui alimente des millions d'utilisateurs provenant de 70 % des meilleures applications de chaîne de blocs, notamment Maker, 0x, MyEtherWallet, Dharma et Kyber. Alchemy nous donnera accès à un point de terminaison d'API sur la chaîne Ethereum afin que nous puissions lire et écrire des transactions.

Nous vous accompagnerons de l'inscription sur Alchemy jusqu'à l'écriture de votre premier script Web3 ! Aucune expérience en développement de chaîne de blocs n'est requise !

## 1. Créer un compte Alchemy gratuit {#sign-up-for-a-free-alchemy-account}

Créer un compte sur Alchemy est facile, [inscrivez-vous gratuitement ici](https://auth.alchemy.com/).

## 2. Créer une application Alchemy {#create-an-alchemy-app}

Pour communiquer avec la chaîne Ethereum et utiliser les produits d'Alchemy, vous avez besoin d'une clé d'API pour authentifier vos requêtes.

Vous pouvez [créer des clés d'API depuis le tableau de bord](https://dashboard.alchemy.com/). Pour créer une nouvelle clé, accédez à « Create App » (Créer une application) comme indiqué ci-dessous :

Un grand merci à [_ShapeShift_](https://shapeshift.com/) _de nous avoir permis de montrer leur tableau de bord !_

![Alchemy dashboard](./alchemy-dashboard.png)

Remplissez les détails sous « Create App » pour obtenir votre nouvelle clé. Vous pouvez également voir ici les applications que vous avez créées précédemment et celles créées par votre équipe. Récupérez les clés existantes en cliquant sur « View Key » (Voir la clé) pour n'importe quelle application.

![Create app with Alchemy screenshot](./create-app.png)

Vous pouvez également récupérer des clés d'API existantes en survolant « Apps » (Applications) et en en sélectionnant une. Vous pouvez cliquer sur « View Key » ici, ainsi que sur « Edit App » (Modifier l'application) pour ajouter des domaines spécifiques à la liste blanche, voir plusieurs outils de développement et consulter des analyses.

![Gif showing a user how to pull API keys](./pull-api-keys.gif)

## 3. Faire une requête depuis la ligne de commande

Interagissez avec la chaîne de blocs Ethereum via Alchemy en utilisant JSON-RPC et curl.

Pour les requêtes manuelles, nous recommandons d'interagir avec le `JSON-RPC` via des requêtes `POST`. Passez simplement l'en-tête `Content-Type: application/json` et votre requête dans le corps du `POST` avec les champs suivants :

- `jsonrpc` : La version de JSON-RPC — actuellement, seule la version `2.0` est prise en charge.
- `method` : La méthode de l'API ETH. [Voir la référence de l'API.](/developers/docs/apis/json-rpc/)
- `params` : Une liste de paramètres à passer à la méthode.
- `id` : L'ID de votre requête. Sera renvoyé par la réponse afin que vous puissiez garder une trace de la requête à laquelle appartient une réponse.

Voici un exemple que vous pouvez exécuter depuis la ligne de commande pour récupérer le prix du gaz actuel :

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**REMARQUE :** Remplacez `https://eth-mainnet.alchemyapi.io/v2/demo` par votre propre clé d'API `https://eth-mainnet.alchemyapi.io/v2/**votre-cle-api`._

**Résultats :**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```
## 4. Configurer votre client Web3

**Si vous avez un client existant,** remplacez l'URL de votre fournisseur de nœud actuel par une URL Alchemy avec votre clé d'API : `“https://eth-mainnet.alchemyapi.io/v2/votre-cle-api"`

**_REMARQUE :_** Les scripts ci-dessous doivent être exécutés dans un **contexte Node** ou **enregistrés dans un fichier**, et non exécutés depuis la ligne de commande. Si Node ou npm ne sont pas encore installés, suivez [les instructions d'installation de Node.js](https://nodejs.org/en/download/).

Il existe des tonnes de [bibliothèques Web3](/developers/docs/apis/javascript/) que vous pouvez intégrer avec Alchemy, cependant, nous recommandons d'utiliser [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), un remplacement direct de Web3.js, conçu et configuré pour fonctionner de manière transparente avec Alchemy. Cela offre de multiples avantages tels que des tentatives automatiques et une prise en charge robuste des WebSockets.

Pour installer AlchemyWeb3.js, **accédez au répertoire de votre projet** et exécutez :

**Avec Yarn :**

```
yarn add @alch/alchemy-web3
```

**Avec NPM :**

```
npm install @alch/alchemy-web3
```

Pour interagir avec l'infrastructure de nœud d'Alchemy, exécutez dans Node.js ou ajoutez ceci à un fichier JavaScript :

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/votre-cle-api"
)
```
## 5. Écrire votre premier script Web3 !

Maintenant, pour mettre les mains dans le cambouis avec un peu de programmation Web3, nous allons écrire un script simple qui affiche le dernier numéro de bloc du réseau principal Ethereum.

**1. Si ce n'est pas déjà fait, dans votre terminal, créez un nouveau répertoire de projet et accédez-y avec cd :**

```
mkdir web3-example
cd web3-example
```

**2. Installez la dépendance Web3 d'Alchemy (ou n'importe quelle dépendance Web3) dans votre projet si vous ne l'avez pas déjà fait :**

```
npm install @alch/alchemy-web3
```

**3. Créez un fichier nommé `index.js` et ajoutez le contenu suivant :**

> Vous devrez finalement remplacer `demo` par votre clé d'API HTTP Alchemy.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

Peu familier avec les concepts asynchrones ? Consultez cet [article Medium](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c).

**4. Exécutez-le dans votre terminal en utilisant node**

```
node index.js
```

**5. Vous devriez maintenant voir le dernier numéro de bloc s'afficher dans votre console !**

```
The latest block number is 11043912
```

**Youpi ! Félicitations ! Vous venez d'écrire votre premier script Web3 en utilisant Alchemy 🎉**

Vous ne savez pas quoi faire ensuite ? Essayez de déployer votre premier contrat intelligent et mettez les mains dans le cambouis avec un peu de programmation Solidity dans notre [Guide de contrat intelligent Hello World](/developers/tutorials/hello-world-smart-contract/), ou continuez à explorer la [documentation d'Alchemy](https://www.alchemy.com/docs/) pour plus d'exemples.

_[Inscrivez-vous gratuitement sur Alchemy](https://auth.alchemy.com/), consultez notre [documentation](https://www.alchemy.com/docs/), et pour les dernières nouvelles, suivez-nous sur [Twitter](https://twitter.com/AlchemyPlatform)_.
