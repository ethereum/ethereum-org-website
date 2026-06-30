---
title: Envoyer des transactions en utilisant Web3
description: "Ceci est un guide pour débutants sur l'envoi de transactions Ethereum en utilisant Web3. Il y a trois étapes principales pour envoyer une transaction sur la chaîne de blocs Ethereum : créer, signer et diffuser. Nous allons passer en revue ces trois étapes."
author: "Elan Halpern"
tags: ["transactions", "web3.js", "Alchemy"]
skill: beginner
breadcrumb: Envoyer des transactions
lang: fr
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

Ceci est un guide pour débutants sur l'envoi de transactions Ethereum en utilisant Web3. Il y a trois étapes principales pour envoyer une transaction sur la chaîne de blocs Ethereum : créer, signer et diffuser. Nous allons passer en revue ces trois étapes, en espérant répondre à toutes vos questions ! Dans ce tutoriel, nous utiliserons [Alchemy](https://www.alchemy.com/) pour envoyer nos transactions sur la chaîne Ethereum. Vous pouvez [créer un compte Alchemy gratuit ici](https://auth.alchemyapi.io/signup).

**REMARQUE :** Ce guide concerne la signature de vos transactions sur le _backend_ de votre application. Si vous souhaitez intégrer la signature de vos transactions sur le frontend, consultez l'intégration de [Web3 avec un fournisseur de navigateur](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider).

## Les bases {#the-basics}

Comme la plupart des développeurs de chaînes de blocs à leurs débuts, vous avez peut-être fait des recherches sur la façon d'envoyer une transaction (quelque chose qui devrait être assez simple) et vous êtes tombé sur une pléthore de guides, chacun disant des choses différentes et vous laissant un peu dépassé et confus. Si vous êtes dans ce cas, ne vous inquiétez pas ; nous y sommes tous passés à un moment donné ! Donc, avant de commencer, mettons les choses au clair :

### 1\. Alchemy ne stocke pas vos clés privées {#alchemy-does-not-store-your-private-keys}

- Cela signifie qu'Alchemy ne peut pas signer et envoyer de transactions en votre nom. La raison en est des fins de sécurité. Alchemy ne vous demandera jamais de partager votre clé privée, et vous ne devriez jamais partager votre clé privée avec un nœud hébergé (ni avec personne d'autre d'ailleurs).
- Vous pouvez lire depuis la chaîne de blocs en utilisant l'API principale d'Alchemy, mais pour y écrire, vous devrez utiliser autre chose pour signer vos transactions avant de les envoyer via Alchemy (il en va de même pour tout autre [service de nœud](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2\. Qu'est-ce qu'un « signataire » ? {#what-is-a-signer}

- Les signataires signeront les transactions pour vous en utilisant votre clé privée. Dans ce tutoriel, nous utiliserons [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) pour signer notre transaction, mais vous pourriez également utiliser n'importe quelle autre bibliothèque Web3.
- Sur le frontend, un bon exemple de signataire serait [MetaMask](https://metamask.io/), qui signera et enverra des transactions en votre nom.

### 3\. Pourquoi dois-je signer mes transactions ? {#why-do-i-need-to-sign-my-transactions}

- Chaque utilisateur qui souhaite envoyer une transaction sur le réseau Ethereum doit signer la transaction (en utilisant sa clé privée), afin de valider que l'origine de la transaction est bien celle qu'elle prétend être.
- Il est extrêmement important de protéger cette clé privée, car y avoir accès accorde un contrôle total sur votre compte Ethereum, vous permettant (ou à toute personne y ayant accès) d'effectuer des transactions en votre nom.

### 4\. Comment protéger ma clé privée ? {#how-do-i-protect-my-private-key}

- Il existe de nombreuses façons de protéger votre clé privée et de l'utiliser pour envoyer des transactions. Dans ce tutoriel, nous utiliserons un fichier `.env`. Cependant, vous pourriez également utiliser un fournisseur distinct qui stocke les clés privées, utiliser un fichier de magasin de clés, ou d'autres options.

### 5\. Quelle est la différence entre `eth_sendTransaction` et `eth_sendRawTransaction` ? {#difference-between-send-and-send-raw}

`eth_sendTransaction` et `eth_sendRawTransaction` sont toutes deux des fonctions de l'API Ethereum qui diffusent une transaction sur le réseau Ethereum afin qu'elle soit ajoutée à un futur bloc. Elles diffèrent dans la façon dont elles gèrent la signature des transactions.

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) est utilisée pour envoyer des transactions _non signées_, ce qui signifie que le nœud auquel vous envoyez doit gérer votre clé privée afin de pouvoir signer la transaction avant de la diffuser sur la chaîne. Étant donné qu'Alchemy ne détient pas les clés privées des utilisateurs, ils ne prennent pas en charge cette méthode.
- [`eth_sendRawTransaction`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) est utilisée pour diffuser des transactions qui ont déjà été signées. Cela signifie que vous devez d'abord utiliser [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction), puis passer le résultat dans `eth_sendRawTransaction`.

Lors de l'utilisation de Web3, `eth_sendRawTransaction` est accessible en appelant la fonction [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction).

C'est ce que nous utiliserons dans ce tutoriel.

### 6\. Qu'est-ce que la bibliothèque Web3 ? {#what-is-the-web3-library}

- Web3.js est une bibliothèque d'encapsulation autour des appels JSON-RPC standards qui est très courante dans le développement Ethereum.
- Il existe de nombreuses bibliothèques Web3 pour différents langages. Dans ce tutoriel, nous utiliserons [Alchemy Web3](https://docs.alchemy.com/reference/api-overview) qui est écrite en JavaScript. Vous pouvez consulter d'autres options [ici](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) comme [Ethers.js](https://docs.ethers.org/v5/).

D'accord, maintenant que nous avons répondu à quelques-unes de ces questions, passons au tutoriel. N'hésitez pas à poser des questions à tout moment sur le [Discord](https://discord.gg/gWuC7zB) d'Alchemy !

### 7\. Comment envoyer des transactions sécurisées, privées et optimisées en gaz ? {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy dispose d'une suite d'API Transact](https://docs.alchemy.com/reference/transact-api-quickstart). Vous pouvez les utiliser pour envoyer des transactions renforcées, simuler des transactions avant qu'elles ne se produisent, envoyer des transactions privées et envoyer des transactions optimisées en gaz.
- Vous pouvez également utiliser l'[API Notify](https://docs.alchemy.com/docs/alchemy-notify) pour être alerté lorsque votre transaction est retirée de la mempool et ajoutée à la chaîne.

**REMARQUE :** Ce guide nécessite un compte Alchemy, une adresse Ethereum ou un portefeuille MetaMask, NodeJs et npm installés. Si ce n'est pas le cas, suivez ces étapes :

1.  [Créer un compte Alchemy gratuit](https://auth.alchemyapi.io/signup)
2.  [Créer un compte MetaMask](https://metamask.io/) (ou obtenir une adresse Ethereum)
3.  [Suivre ces étapes pour installer NodeJs et NPM](https://docs.alchemy.com/alchemy/guides/alchemy-for-macs)

## Étapes pour envoyer votre transaction {#steps-to-sending-your-transaction}

### 1\. Créer une application Alchemy sur le réseau de test Sepolia {#create-an-alchemy-app-on-the-sepolia-testnet}

Accédez à votre [tableau de bord Alchemy](https://dashboard.alchemyapi.io/) et créez une nouvelle application, en choisissant Sepolia (ou tout autre réseau de test) pour votre réseau.

### 2\. Demander des ETH au faucet Sepolia {#request-eth-from-sepolia-faucet}

Suivez les instructions sur le [faucet Sepolia d'Alchemy](https://www.sepoliafaucet.com/) pour recevoir des ETH. Assurez-vous d'inclure votre adresse Ethereum **Sepolia** (depuis MetaMask) et non celle d'un autre réseau. Après avoir suivi les instructions, vérifiez que vous avez bien reçu les ETH dans votre portefeuille.

### 3\. Créer un nouveau répertoire de projet et y accéder avec `cd` {#create-a-new-project-direction}

Créez un nouveau répertoire de projet depuis la ligne de commande (terminal pour Mac) et accédez-y :

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. Installer Alchemy Web3 (ou toute autre bibliothèque Web3) {#install-alchemy-web3}

Exécutez la commande suivante dans le répertoire de votre projet pour installer [Alchemy Web3](https://docs.alchemy.com/reference/api-overview) :

Remarque : si vous souhaitez utiliser la bibliothèque Ethers.js, [suivez les instructions ici](https://docs.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```
npm install @alch/alchemy-web3
```

### 5\. Installer dotenv {#install-dotenv}

Nous utiliserons un fichier `.env` pour stocker en toute sécurité notre clé d'API et notre clé privée.

```
npm install dotenv --save
```

### 6\. Créer le fichier `.env` {#create-the-dotenv-file}

Créez un fichier `.env` dans le répertoire de votre projet et ajoutez ce qui suit (en remplaçant « `your-api-url` » et « `your-private-key` ») :

- Pour trouver l'URL de votre API Alchemy, accédez à la page des détails de l'application que vous venez de créer sur votre tableau de bord, cliquez sur « View Key » dans le coin supérieur droit, et récupérez l'URL HTTP.
- Pour trouver votre clé privée en utilisant MetaMask, consultez ce [guide](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Ne commitez pas <code>.env</code> ! Assurez-vous de ne jamais partager ou exposer votre fichier <code>.env</code> à qui que ce soit, car vous compromettriez vos secrets en le faisant. Si vous utilisez un système de contrôle de version, ajoutez votre <code>.env</code> à un fichier <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

### 7\. Créer le fichier `sendTx.js` {#create-sendtx-js}

Super, maintenant que nos données sensibles sont protégées dans un fichier `.env`, commençons à coder. Pour notre exemple d'envoi de transaction, nous allons renvoyer des ETH au faucet Sepolia.

Créez un fichier `sendTx.js`, c'est là que nous configurerons et enverrons notre exemple de transaction, et ajoutez-y les lignes de code suivantes :

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' // À FAIRE : remplacez cette adresse par votre propre adresse publique

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // le nonce commence à compter à partir de 0

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // adresse du faucet pour renvoyer les ETH
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // champ de données optionnel pour envoyer un message ou exécuter un contrat intelligent
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
    } else {
      console.log("❗Something went wrong while submitting your transaction:", error)
    }
   });
}

main();
```

Assurez-vous de remplacer l'adresse à la **ligne 6** par votre propre adresse publique.

Maintenant, avant de nous lancer dans l'exécution de ce code, parlons de certains de ses composants.

- `nonce` : La spécification du nonce est utilisée pour garder une trace du nombre de transactions envoyées depuis votre adresse. Nous en avons besoin pour des raisons de sécurité et pour empêcher les [attaques par rejeu](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Pour obtenir le nombre de transactions envoyées depuis votre adresse, nous utilisons [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).
- `transaction` : L'objet de la transaction comporte quelques aspects que nous devons spécifier :
  - `to` : C'est l'adresse à laquelle nous voulons envoyer des ETH. Dans ce cas, nous renvoyons des ETH au [faucet Sepolia](https://sepoliafaucet.com/) que nous avons initialement sollicité.
  - `value` : C'est le montant que nous souhaitons envoyer, spécifié en Wei où 10^18 Wei = 1 ETH.
  - `gas` : Il existe de nombreuses façons de déterminer la bonne quantité de gaz à inclure dans votre transaction. Alchemy dispose même d'un [webhook de prix du gaz](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1) pour vous avertir lorsque le prix du gaz tombe en dessous d'un certain seuil. Pour les transactions sur le Réseau principal, il est de bonne pratique de vérifier un estimateur de gaz comme [ETH Gas Station](https://ethgasstation.info/) pour déterminer la bonne quantité de gaz à inclure. 21000 est la quantité minimale de gaz qu'une opération sur Ethereum utilisera, donc pour nous assurer que notre transaction sera exécutée, nous mettons 30000 ici.
  - `nonce` : voir la définition du nonce ci-dessus. Le nonce commence à compter à partir de zéro.
  - [OPTIONNEL] data : Utilisé pour envoyer des informations supplémentaires avec votre transfert, ou pour appeler un contrat intelligent, non requis pour les transferts de solde, consultez la remarque ci-dessous.
- `signedTx` : Pour signer notre objet de transaction, nous utiliserons la méthode `signTransaction` avec notre `PRIVATE_KEY`.
- `sendSignedTransaction` : Une fois que nous avons une transaction signée, nous pouvons l'envoyer pour qu'elle soit incluse dans un bloc ultérieur en utilisant `sendSignedTransaction`.

**Une remarque sur les données (data)**
Il existe deux principaux types de transactions qui peuvent être envoyées sur Ethereum.

- Transfert de solde : Envoyer des ETH d'une adresse à une autre. Aucun champ de données n'est requis, cependant, si vous souhaitez envoyer des informations supplémentaires avec votre transaction, vous pouvez inclure ces informations au format HEX dans ce champ.
  - Par exemple, disons que nous voulions écrire le hash d'un document IPFS sur la chaîne Ethereum afin de lui donner un horodatage immuable. Notre champ de données devrait alors ressembler à data : `web3.utils.toHex(‘IPFS hash‘)`. Et maintenant, n'importe qui peut interroger la chaîne et voir quand ce document a été ajouté.
- Transaction de contrat intelligent : Exécuter du code de contrat intelligent sur la chaîne. Dans ce cas, le champ de données doit contenir la fonction intelligente que vous souhaitez exécuter, ainsi que tous les paramètres.
  - Pour un exemple pratique, consultez l'étape 8 de ce [tutoriel Hello World](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#step-8-create-the-transaction).

### 8\. Exécuter le code en utilisant `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Revenez à votre terminal ou ligne de commande et exécutez :

```
node sendTx.js
```

### 9\. Voir votre transaction dans la mempool {#see-your-transaction-in-the-mempool}

Ouvrez la [page Mempool](https://dashboard.alchemyapi.io/mempool) dans votre tableau de bord Alchemy et filtrez par l'application que vous avez créée pour trouver votre transaction. C'est ici que nous pouvons observer notre transaction passer de l'état en attente (pending) à l'état miné (mined) (en cas de succès) ou à l'état abandonné (dropped) en cas d'échec. Assurez-vous de le garder sur « All » (Tout) afin de capturer les transactions « minées », « en attente » et « abandonnées ». Vous pouvez également rechercher votre transaction en cherchant les transactions envoyées à l'adresse `0x31b98d14007bdee637298086988a0bbd31184523`.

Pour voir les détails de votre transaction une fois que vous l'avez trouvée, sélectionnez le hash de la transaction (tx hash), ce qui devrait vous amener à une vue qui ressemble à ceci :

![Mempool watcher screenshot](./mempool.png)

À partir de là, vous pouvez voir votre transaction sur Etherscan en cliquant sur l'icône entourée en rouge !

**Youpi ! Vous venez d'envoyer votre première transaction Ethereum en utilisant Alchemy 🎉**

_Pour des retours et des suggestions concernant ce guide, veuillez envoyer un message à Elan sur le [Discord](https://discord.gg/A39JVCM) d'Alchemy !_

_Publié à l'origine sur [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy)_