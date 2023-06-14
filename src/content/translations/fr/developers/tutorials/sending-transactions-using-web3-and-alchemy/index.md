---
title: Envoyer des transactions en utilisant le Web3
description: "Voici un guide à l'attention des débutants qui explique comment envoyer des transactions Ethereum en utilisant le Web3. Il y a trois étapes principales pour envoyer une transaction sur la blockchain Ethereum : créer, signer et diffuser. Nous allons passer en revue les trois."
author: "Elan Halpern"
tags:
  - "transactions"
  - "web3.js"
  - "alchemy"
skill: beginner
lang: fr
published: 2020-11-04
source: Documentation Alchemy
sourceUrl: https://docs.alchemy.com/alchemy/tutorials/sending-txs
---

Voici un guide à l'attention des débutants qui explique comment envoyer des transactions Ethereum en utilisant le Web3. Il y a trois étapes principales pour envoyer une transaction sur la blockchain Ethereum : créer, signer et diffuser. Nous allons passer en revue les trois en espérant répondre à toutes les questions que vous pourriez vous poser ! Dans ce tutoriel, nous utiliserons [Alchemy](https://www.alchemy.com/) pour envoyer nos transactions sur la chaîne Ethereum. Vous pouvez [créer gratuitement un compte sur Alchemy ici](https://auth.alchemyapi.io/signup).

**NOTE :** Ce guide est destiné à signer vos transactions sur le _backend_ de votre application. Si vous voulez intégrer la signature de vos transactions en frontend, consultez l'intégration de [Web3 avec un fournisseur de navigateur](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider).

## Les bases {#the-basics}

Comme la plupart des développeurs blockchain débutants, vous avez peut-être fait des recherches sur la façon d'envoyer une transaction (ce qui devrait être assez simple ) et vous êtes tombé sur une pléthore de guides, chacun décrivant des choses différentes, vous laissant quelque peu dépassé et désorienté. Si vous êtes dans ce cas, ne vous inquiétez pas, nous l'avons tous été à un moment ou à un autre ! Donc, avant de commencer, mettons certaines choses au clair :

### 1\. Alchemy ne stocke pas vos clés privées {#alchemy-does-not-store-your-private-keys}

- Cela signifie qu'Alchemy ne peut pas signer et envoyer des transactions en votre nom. Ceci pour des raisons de sécurité. Alchemy ne vous demandera jamais de partager votre clé privée, et vous ne devriez jamais partager votre clé privée avec un nœud hébergé (ni avec quiconque d'ailleurs).
- Vous pouvez lire sur la blockchain en utilisant l'API Alchemy, mais pour y écrire vous devrez utiliser quelque chose d'autre afin de signer vos transactions par le biais d'Alchemy (c'est le cas pour tous les [services d'accès à la blockchain](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2\. Qu'est-ce qu'un « signataire » ? {#what-is-a-signer}

- Les signataires signeront pour vous les transactions en utilisant votre clé privée. Dans ce tutoriel, nous utiliserons [Alchemy web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) pour signer notre transaction, mais vous pouvez également utiliser n'importe quelle autre bibliothèque web3.
- En frontend, un bon exemple de signataire serait [MetaMask](https://metamask.io/), qui signera et enverra des transactions en votre nom.

### 3\. Pourquoi dois-je signer mes transactions? {#why-do-i-need-to-sign-my-transactions}

- Chaque utilisateur qui veut envoyer une transaction sur le réseau Ethereum doit signer la transaction (en utilisant sa clé privée), afin de valider l'origine de la transaction.
- Il est très important de protéger cette clé privée, car le fait d'y avoir accès vous donne le contrôle total de votre compte Ethereum, ce qui vous permet (ou à quiconque y ayant accès) d'effectuer des transactions en votre nom.

### 4\. Comment protéger ma clé privée ? {#how-do-i-protect-my-private-key}

- Il existe de nombreuses façons de protéger votre clé privée et de l'utiliser pour envoyer des transactions. Dans ce tutoriel, nous allons utiliser un fichier `.env`. Cependant, vous pouvez également faire appel à un autre fournisseur qui stocke les clés privées, utiliser un fichier keystore, ou d'autres options.

### 5\. Quelle est la différence entre `eth_sendTransaction` et `eth_sendRawTransaction` ? {#difference-between-send-and-send-raw}

`eth_sendTransaction` et `eth_sendRawTransaction` sont des fonctions API Ethereum qui diffusent une transaction sur le réseau Ethereum afin qu'elle soit ajoutée à un bloc futur. Elles diffèrent dans la façon dont elles gèrent la signature des transactions.

- [`eth_sendTransaction`](https://web3js.readthedocs.io/en/v1.2.0/web3-eth.html#eth-sendtransaction) est utilisée pour envoyer des transactions _non signées_, ce qui signifie que le nœud auquel vous envoyez la transaction doit gérer votre clé privée pour pouvoir signer la transaction avant de la transmettre à la chaîne. Puisqu'Alchemy ne possède pas les clés privées de l'utilisateur, il ne prend pas en charge cette méthode.
- [`eth_sendRawTransaction`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) est utilisée pour propager des transactions qui ont déjà été signées. Cela signifie que vous devez d'abord utiliser [`signTransaction(tx, private_key)`](https://web3js.readthedocs.io/en/v1.2.0/web3-eth.html#signtransaction), puis passer le résultat dans `eth_sendRawTransaction`.

Lorsque vous utilisez web3, `eth_sendRawTransaction` est accessible en appelant la fonction [web3.eth.sendSignedTransaction](https://web3js.readthedocs.io/en/v1.2.0/web3-eth.html#sendsignedtransaction).

C'est ce que nous utiliserons dans notre tutoriel.

### 6\. Qu'est-ce que la bibliothèque web3 ? {#what-is-the-web3-library}

- Web3.js est une bibliothèque de wrapper autour des appels standard JSON-RPC qui est couramment utilisée dans le développement Ethereum.
- Il existe de nombreuses bibliothèques web3 pour différents langages de programmation. Dans ce tutoriel, nous utiliserons [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), écrit en JavaScript. Vous trouverez d'autres alternatives [ici](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries).

Bon, maintenant que nous avons clarifié ces points, passons au tutoriel. N'hésitez pas à poser des questions à tout moment sur le [discord](https://discord.gg/gWuC7zB) d'Alchemy !

**NOTE :** Ce guide nécessite un compte Alchemy, une adresse Ethereum ou un portefeuille MetaMask, ainsi que l'installation de NodeJs et npm. Si ce n’est pas le cas, procédez comme suit :

1.  [Créez un compte Alchemy gratuitement](https://auth.alchemyapi.io/signup)
2.  [Créez un compte Metamask](https://metamask.io/) (ou obtenez une adresse Ethereum)
3.  [Suivez ces étapes pour installer NodeJs et NPM](https://docs.alchemy.com/alchemy/guides/alchemy-for-macs)

## Étapes pour envoyer votre transaction {#steps-to-sending-your-transaction}

### 1\. Créer une application Alchemy sur le réseau de test Rinkeby {#create-an-alchemy-app-on-the-rinkeby-testnet}

Naviguez vers votre [tableau de bord d'Alchemy](https://dashboard.alchemyapi.io/) et créez une nouvelle application, en choisissant Rinkeby (ou tout autre réseau de test) comme réseau.

### 2\. Demander de l'ETH via le réseau Rinkeby {#request-eth-from-rinkeby-faucet}

Suivez les instructions sur le réseau [Rinkeby](https://www.rinkebyfaucet.com/) pour recevoir de l'ETH. Veillez à bien d'inclure votre adresse Ethereum **Rinkeby** (depuis Metamask) et pas d'un autre réseau. Après avoir suivi les instructions, vérifiez que vous avez reçu l'ETH dans votre portefeuille.

### 3\. Créer un nouveau dossier projet et `cd`("change directory" en ligne de commande) dans celui-ci {#create-a-new-project-direction}

Créez un nouveau répertoire de projet à partir de la ligne de commande (terminal pour macs) et naviguez dans celui-ci :

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. Installer Alchemy Web3 (ou n'importe quelle autre bibliothèque web3) {#install-alchemy-web3}

Exécutez la commande suivante dans votre dossier projet pour installer [Alchemy Web3](https://docs.alchemy.com/reference/api-overview) :

```
npm install @alch/alchemy-web3
```

### 5\. Installer dotenv {#install-dotenv}

Nous utiliserons un fichier `.env` pour stocker en toute sécurité notre clé API et notre clé privée.

```
npm install dotenv --save
```

### 6\. Créer le fichier `.env` {#create-the-dotenv-file}

Créez un fichier `.env` dans votre répertoire de projet et ajoutez les éléments suivants (en remplaçant «`your-api-url`» et «`your-private-key`»)

- Pour trouver l’URL de votre API Alchemy, accédez à la page des détails de l’application que vous venez de créer sur votre tableau de bord, cliquez sur « View Key » (Voir clé) dans le coin supérieur droit et saisissez l’URL HTTP.
- Pour trouver votre clé privée sur MetaMask, consultez ce [guide](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<InfoBanner isWarning={true}>
Ne propagez pas le fichier <code>.env</code> ! Assurez-vous de ne jamais partager ou exposer votre fichier <code>.env</code> avec quiconque, car vous compromettez vos secrets en le faisant. Si vous utilisez le contrôle de version, ajoutez votre <code>.env</code> à un fichier <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</InfoBanner>

### 7\. Créer le fichier `sendTx.js` {#create-sendtx-js}

Super, maintenant que nous avons protégé nos données sensibles dans un fichier `.env`, commençons à coder. Pour notre exemple d'envoi de transaction, nous renverrons l'ETH via le réseau Rinkeby.

Créez un fichier `sendTx.js`, dans lequel nous allons configurer et envoyer notre exemple de transaction et ajoutez-y les lignes de code suivantes :

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: replace this address with your own public address

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce starts counting from 0

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // faucet address to return eth
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // optional data field to send message or execute smart contract
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

Veillez à remplacer l'adresse sur la **ligne 6** par votre propre adresse publique.

Avant de nous lancer dans l’exécution de ce code, parlons ici de certains de ses composants.

- `nonce` : La spécification nonce est utilisée pour garder une trace du nombre de transactions envoyées depuis votre adresse. Nous en avons besoin pour des raisons de sécurité et pour éviter [les attaques par répétition](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Pour obtenir le nombre de transactions envoyées à partir de votre adresse, nous utilisons [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).
- `transaction` : L'objet transaction intègre certains aspects que nous avons besoin de spécifier.
  - `to` : C'est l'adresse à laquelle nous voulons envoyer l'ETH. Dans notre cas, nous renvoyons l'ETH au faucet [Rinkeby](https://faucet.rinkeby.io/) auquel nous avons initialement fait la demande.
  - `value` : C'est le montant que nous souhaitons envoyer, spécifié en Wei où 10^18 Wei = 1 ETH.
  - `gas` : Il existe plusieurs façons de déterminer la bonne quantité de gaz à inclure dans votre transaction. Alchemy dispose même d'un [webhook du prix du gaz](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1) pour vous avertir lorsque le prix du gaz tombe sous un certain seuil. Pour les transactions sur le réseau principal, il est bon dee recourir à un estimateur de gaz comme [ETH Gas Station](https://ethgasstation.info/) pour déterminer la bonne quantité de gaz à intégrer. 21 000 est la quantité minimale de gaz qu'une opération sur Ethereum va utiliser, ainsi pour s'assurer que notre transaction sera exécutée, nous utiliserons ici 30 000 unités.
  - `nonce` : voir la définition ci-dessus. Nonce commence à compter à partir de zéro.
  - [OPTIONAL] données : Utilisé pour envoyer des informations supplémentaires avec votre transfert ou pour appeler un contrat intelligent. Non requis pour les transferts de solde. Consultez la note ci-dessous.
- `signedTx` : Pour signer l'objet de notre transaction nous utiliserons la méthode `signTransaction` avec notre `PRIVATE_KEY`
- `sendSignedTransaction` : Une fois que nous disposons d'une transaction signée, nous pouvons l'envoyer pour être intégrée dans un bloc ultérieur en utilisant `sendSignedTransaction`.

**Remarque concernant les données** Il existe deux types principaux de transactions qui peuvent être envoyées sur Ethereum.

- Transfert du solde : Envoyer des ETH d'une adresse à une autre. Aucun champ de données n'est requis. Cependant, si vous souhaitez envoyer des informations supplémentaires avec votre transaction, vous pouvez inclure ces informations au format HEX dans ce champ.
  - Imaginons par exemple que nous souhaitions écrire le hachage d'un document IPFS dans la chaîne Ethereum afin de lui donner un horodatage immuable. Notre champ de données devrait alors ressembler à des données : `web3.utils.toHex(‘IPFS hash‘)`. Et maintenant, toute personne peut interroger la chaîne et voir quand ce document a été ajouté.
- Transaction de contrat intelligent : Exécuter le code d'un contrat intelligent sur la chaîne. Dans ce cas, le champ de données doit contenir la fonction intelligente que vous souhaitez exécuter, ainsi que tout paramètre.
  - Pour un exemple pratique, consultez l'Étape 8 de ce [Tutoriel Hello World](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#step-8-create-the-transaction).

### 8\. Exécuter le code en utilisant `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Retournez à votre terminal ou votre invite de ligne de commande et exécutez :

```
node sendTx.js
```

### 9\. Consulter votre transaction dans le Mempool {#see-your-transaction-in-the-mempool}

Ouvrez la page [Mempool](https://dashboard.alchemyapi.io/mempool) dans votre tableau de bord Alchemy et filtrez avec l'application que vous avez créée pour trouver votre transaction. C'est là que nous pouvons observer le passage de l'état de notre transaction de l'état en attente à l'état miné (si la transaction a abouti) ou à l'état abandonné en cas d'échec. Veillez à opter pour « All » (Tous) afin de visualiser les transactions « mined » (minées), « pending » (en attente) et « dropped » (abandonnées). Vous pouvez également trouver votre transaction en recherchant les transactions envoyées à l'adresse `0x31b98d14007bdee637298086988a0bbd31184523`.

Pour voir les détails de votre transaction une fois que vous l'avez trouvée, sélectionnez le tx, hash qui devrait vous amener à une vue qui ressemble à ceci :

![Capture d'écran Mempool watcher](./mempool.png)

À partir de là, vous pouvez visualiser votre transaction sur Etherscan en cliquant sur l'icône cerclée en rouge !

**Youpi ! Vous venez d’envoyer votre première transaction Ethereum en utilisant Alchemy 🎉**

_Pour des commentaires et des suggestions sur ce guide, veuillez envoyer un message à Elan sur le [Discord d'Alchemy](https://discord.gg/A39JVCM) !_

_Publié à l’origine sur [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy)_
