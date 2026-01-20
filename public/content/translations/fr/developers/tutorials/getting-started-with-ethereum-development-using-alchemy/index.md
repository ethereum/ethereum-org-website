---
title: Bien débuter avec le développement Ethereum
description: "Ceci est un guide pour débutants pour se lancer dans le développement sur Ethereum. Nous allons vous guider de la création d'un point d'accès à l'API à l'écriture de votre premier script Web3, en passant par celle d'une requête en ligne de commande ! Aucune expérience préalable dans le développement de blockchain n'est requise !"
author: "Elan Halpern"
tags:
  [
    "javascript",
    "ethers.js",
    "nœuds",
    "requêtes",
    "alchemy"
  ]
skill: beginner
lang: fr
published: 2020-10-30
source: Modéré
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Logos d'Ethereum et d'Alchemy](./ethereum-alchemy.png)

Ceci est un guide pour débutants pour se lancer dans le développement sur Ethereum. Pour ce tutoriel, nous utiliserons [Alchemy](https://alchemyapi.io/), la principale plateforme de développement blockchain qui alimente des millions d'utilisateurs issus de 70 % des meilleures applications blockchain, notamment Maker, 0x, MyEtherWallet, Dharma et Kyber. Alchemy nous donnera accès à un point de terminaison d'API sur la chaîne Ethereum afin que nous puissions lire et écrire des transactions.

Nous vous guiderons de l'inscription sur Alchemy à l'écriture de votre premier script Web3 ! Aucune expérience préalable dans le développement de blockchain n'est requise !

## 1. Créez un compte Alchemy gratuit {#sign-up-for-a-free-alchemy-account}

Créer un compte sur Alchemy est facile, [inscrivez-vous gratuitement ici](https://auth.alchemy.com/).

## 2. Créer une application Alchemy {#create-an-alchemy-app}

Pour communiquer avec la chaîne Ethereum et utiliser les produits d'Alchemy, vous avez besoin d'une clé d'API pour authentifier vos requêtes.

Vous pouvez [créer des clés d'API depuis le tableau de bord](https://dashboard.alchemy.com/). Pour créer une nouvelle clé, naviguez vers « Créer une application » comme indiqué ci-dessous :

Remerciements spéciaux à [_ShapeShift_](https://shapeshift.com/) _de nous avoir permis de montrer leur tableau de bord !_

![Tableau de bord d'Alchemy](./alchemy-dashboard.png)

Remplissez les champs sous « Créer une application » pour obtenir votre nouvelle clé. Vous pouvez également voir ici les applications que vous avez créées précédemment et celles créées par votre équipe. Récupérez les clés existantes en cliquant sur « Voir la clé » pour n'importe quelle application.

![Capture d'écran de la création d'application avec Alchemy](./create-app.png)

Vous pouvez également récupérer des clés d'API existantes en passant le curseur sur « Apps » et en sélectionnant une. Vous pouvez « Voir la clé » ici, ainsi que « Modifier l'application » pour ajouter des domaines spécifiques à la liste blanche, voir plusieurs outils de développement et consulter les analyses.

![GIF montrant comment un utilisateur peut récupérer des clés d'API](./pull-api-keys.gif)

## 3. Faire une requête depuis la ligne de commande {#make-a-request-from-the-command-line}

Interagissez avec la blockchain Ethereum via Alchemy en utilisant JSON-RPC et curl.

Pour les requêtes manuelles, nous recommandons d'interagir avec le `JSON-RPC` via des requêtes `POST`. Il suffit de transmettre l'en-tête `Content-Type: application/json` et votre requête en tant que corps `POST` avec les champs suivants :

- `jsonrpc` : la version JSON-RPC (actuellement, seule la version `2.0` est prise en charge).
- `method` : la méthode de l'API ETH. [Voir la référence de l'API.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params` : une liste de paramètres à transmettre à la méthode.
- `id` : l'ID de votre requête. Cet ID sera renvoyé dans la réponse afin que vous puissiez savoir à quelle requête elle correspond.

Voici un exemple que vous pouvez exécuter depuis la ligne de commande pour récupérer le prix actuel du gaz :

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**NOTE :** Remplacez [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) par votre propre clé d'API `https://eth-mainnet.alchemyapi.io/v2/**votre-clé-api`._

**Résultats :**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. Configurer votre client Web3 {#set-up-your-web3-client}

**Si vous avez un client existant,** remplacez l'URL de votre fournisseur de nœud actuel par une URL Alchemy avec votre clé d'API : `"https://eth-mainnet.alchemyapi.io/v2/votre-clé-api"`

**_NOTE :** Les scripts ci-dessous doivent être exécutés dans un **contexte de nœud** ou **enregistrés dans un fichier**, et non depuis la ligne de commande. Si Node ou npm ne sont pas déjà installés, consultez ce [guide d'installation rapide pour Mac](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs).

Il existe de nombreuses [bibliothèques Web3](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) que vous pouvez intégrer à Alchemy. Cependant, nous vous recommandons d'utiliser [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), un remplacement direct de web3.js, conçu et configuré pour fonctionner de manière transparente avec Alchemy. Cela offre de multiples avantages, tels que des tentatives de reconnexion automatiques et une prise en charge robuste des WebSockets.

Pour installer AlchemyWeb3.js, **accédez au répertoire de votre projet** et exécutez la commande suivante :

**Avec Yarn :**

```
yarn add @alch/alchemy-web3
```

**Avec NPM :**

```
npm install @alch/alchemy-web3
```

Pour interagir avec l'infrastructure de nœuds d'Alchemy, exécutez la commande dans NodeJS ou ajoutez ce qui suit à un fichier JavaScript :

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/votre-clé-api"
)
```

## 5. Écrivez votre premier script Web3 ! {#write-your-first-web3-script}

Maintenant, pour mettre la main à la pâte avec un peu de programmation web3, nous allons écrire un script simple qui affiche le dernier numéro de bloc du réseau principal Ethereum.

\*\*1. **Si ce n'est pas déjà fait, créez un nouveau répertoire de projet dans votre terminal et accédez-y avec la commande `cd` :**

```
mkdir web3-example
cd web3-example
```

\*\*2. **Installez la dépendance Alchemy Web3 (ou toute autre dépendance Web3) dans votre projet si ce n'est pas déjà fait :**

```
npm install @alch/alchemy-web3
```

\*\*3. **Créez un fichier nommé `index.js` et ajoutez-y le contenu suivant :**

> Vous devrez à terme remplacer `demo` par votre clé d'API HTTP Alchemy.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("Le dernier numéro de bloc est " + blockNumber)
}
main()
```

Vous n'êtes pas familier avec le concept d'asynchronisme ? Consultez cet [article de Medium](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c).

\*\*4. **Exécutez-le dans votre terminal à l'aide de node :**

```
node index.js
```

\*\*5. **Vous devriez maintenant voir le dernier numéro de bloc s'afficher dans votre console !**

```
Le dernier numéro de bloc est 11043912
```

**Bravo !** Félicitations ! **Vous venez d'écrire votre premier script web3 avec Alchemy 🎉**

Vous n'êtes pas sûr de la prochaine étape ? Essayez de déployer votre premier contrat intelligent et de vous familiariser avec la programmation Solidity dans notre [guide sur les contrats intelligents Hello World](https://www.alchemy.com/docs/hello-world-smart-contract), ou testez vos connaissances sur le tableau de bord avec l'[application de démonstration du tableau de bord](https://docs.alchemyapi.io/tutorials/demo-app) !

_[Inscrivez-vous gratuitement sur Alchemy](https://auth.alchemy.com/), consultez notre [documentation](https://www.alchemy.com/docs/) et, pour connaître les dernières actualités, suivez-nous sur [Twitter](https://twitter.com/AlchemyPlatform)_.
