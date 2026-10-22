---
title: Envoyer des transactions en utilisant viem
description: "Ceci est un guide pour débutants sur l'envoi de transactions Ethereum à l'aide de la bibliothèque viem. Il y a trois étapes principales pour envoyer une transaction sur la chaîne de blocs Ethereum : créer, signer et diffuser. Nous allons passer en revue ces trois étapes."
author: "Elan Halpern"
tags: ["transactions", "viem", "Alchemy"]
skill: beginner
breadcrumb: Envoyer des transactions
lang: fr
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

Ceci est un guide pour débutants sur l'envoi de transactions Ethereum à l'aide de la bibliothèque [viem](https://viem.sh/). Il y a trois étapes principales pour envoyer une transaction sur la chaîne de blocs Ethereum : créer, signer et diffuser. Nous allons passer en revue ces trois étapes, en espérant répondre à toutes vos questions ! Dans ce tutoriel, nous utiliserons [Alchemy](https://www.alchemy.com/) pour envoyer nos transactions sur la chaîne Ethereum. Vous pouvez [créer un compte Alchemy gratuit ici](https://auth.alchemy.com/signup).

**REMARQUE :** Ce guide concerne la signature de vos transactions sur le _backend_ de votre application. Si vous souhaitez intégrer la signature de vos transactions sur le frontend, consultez l'[API du fournisseur MetaMask](https://docs.metamask.io/wallet/reference/provider-api/).

## Les bases {#the-basics}

Comme la plupart des développeurs de chaînes de blocs à leurs débuts, vous avez peut-être fait des recherches sur la façon d'envoyer une transaction (quelque chose qui devrait être assez simple) et vous êtes tombé sur une pléthore de guides, chacun disant des choses différentes et vous laissant un peu dépassé et confus. Si vous êtes dans ce cas, ne vous inquiétez pas ; nous y sommes tous passés à un moment donné ! Donc, avant de commencer, mettons les choses au clair :

### 1\. Alchemy ne stocke pas vos clés privées {#alchemy-does-not-store-your-private-keys}

- Cela signifie qu'Alchemy ne peut pas signer et envoyer de transactions en votre nom. La raison en est des fins de sécurité. Alchemy ne vous demandera jamais de partager votre clé privée, et vous ne devriez jamais partager votre clé privée avec un nœud hébergé (ni avec personne d'autre d'ailleurs).
- Vous pouvez lire depuis la chaîne de blocs en utilisant l'API principale d'Alchemy, mais pour y écrire, vous devrez utiliser autre chose pour signer vos transactions avant de les envoyer via Alchemy (il en va de même pour tout autre [service de nœud](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2\. Qu'est-ce qu'un « signataire » (signer) ? {#what-is-a-signer}

- Les signataires signeront les transactions pour vous en utilisant votre clé privée. Dans ce tutoriel, nous utiliserons [viem](https://viem.sh/) pour signer notre transaction, mais vous pourriez également utiliser n'importe quelle autre bibliothèque Web3.
- Sur le frontend, un bon exemple de signataire serait [MetaMask](https://metamask.io/), qui signera et enverra des transactions en votre nom.

### 3\. Pourquoi dois-je signer mes transactions ? {#why-do-i-need-to-sign-my-transactions}

- Chaque utilisateur qui souhaite envoyer une transaction sur le réseau Ethereum doit signer la transaction (en utilisant sa clé privée), afin de valider que l'origine de la transaction est bien celle qu'elle prétend être.
- Il est extrêmement important de protéger cette clé privée, car y avoir accès accorde un contrôle total sur votre compte Ethereum, vous permettant (ou à toute personne y ayant accès) d'effectuer des transactions en votre nom.

### 4\. Comment protéger ma clé privée ? {#how-do-i-protect-my-private-key}

- Il existe de nombreuses façons de protéger votre clé privée et de l'utiliser pour envoyer des transactions. Dans ce tutoriel, nous utiliserons un fichier `.env`. Cependant, vous pourriez également utiliser un fournisseur distinct qui stocke les clés privées, utiliser un fichier de magasin de clés, ou d'autres options.

### 5\. Quelle est la différence entre `eth_sendTransaction` et `eth_sendRawTransaction` ? {#difference-between-send-and-send-raw}

`eth_sendTransaction` et `eth_sendRawTransaction` sont toutes deux des fonctions de l'API Ethereum qui diffusent une transaction sur le réseau Ethereum afin qu'elle soit ajoutée à un futur bloc. Elles diffèrent dans la façon dont elles gèrent la signature des transactions.

- [`eth_sendTransaction`](/developers/docs/apis/json-rpc/#eth-sendtransaction) est utilisée pour envoyer des transactions _non signées_, ce qui signifie que le nœud auquel vous l'envoyez doit gérer votre clé privée afin de pouvoir signer la transaction avant de la diffuser sur la chaîne. Étant donné qu'Alchemy ne détient pas les clés privées des utilisateurs, ils ne prennent pas en charge cette méthode.
- [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction) est utilisée pour diffuser des transactions qui ont déjà été signées. Cela signifie que vous devez d'abord signer la transaction avec votre clé privée (dans viem, en utilisant [`signTransaction`](https://viem.sh/docs/actions/wallet/signTransaction) avec un [compte local](https://viem.sh/docs/accounts/local/privateKeyToAccount)), puis passer le résultat à `eth_sendRawTransaction`.

Lors de l'utilisation de viem, on accède à `eth_sendRawTransaction` en appelant la fonction [`sendRawTransaction`](https://viem.sh/docs/actions/wallet/sendRawTransaction).

C'est ce que nous utiliserons dans ce tutoriel.

### 6\. Qu'est-ce que la bibliothèque Web3 ? {#what-is-the-web3-library}

- Une bibliothèque Web3 est une enveloppe (wrapper) autour des [appels JSON-RPC](/developers/docs/apis/json-rpc/) standards qui est très couramment utilisée dans le développement Ethereum.
- Il existe de nombreuses bibliothèques Web3 pour différents langages. Dans ce tutoriel, nous utiliserons [viem](https://viem.sh/), qui est écrite en TypeScript et fonctionne dans n'importe quel projet JavaScript. Vous pouvez consulter d'autres options [ici](/developers/docs/apis/javascript/) comme [Ethers.js](https://docs.ethers.org/v6/).

Bien, maintenant que nous avons répondu à quelques-unes de ces questions, passons au tutoriel. N'hésitez pas à poser des questions à tout moment sur le [Discord](https://discord.gg/gWuC7zB) d'Alchemy !

### 7\. Comment envoyer des transactions sécurisées, privées et optimisées en gaz ? {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy dispose d'un ensemble de ressources sur les transactions](https://www.alchemy.com/docs/sending-transactions). Vous pouvez les utiliser pour envoyer des transactions, simuler des transactions avant qu'elles ne se produisent, envoyer des transactions privées et envoyer des transactions optimisées en gaz.
- Vous pouvez également utiliser les [webhooks d'Alchemy](https://www.alchemy.com/docs/reference/webhooks-overview) pour être alerté lorsque votre transaction est retirée de la mempool et ajoutée à la chaîne.

**REMARQUE :** Ce guide nécessite un compte Alchemy, une adresse Ethereum ou un portefeuille MetaMask, ainsi que l'installation de Node.js et npm. Si ce n'est pas le cas, suivez ces étapes :

1.  [Créer un compte Alchemy gratuit](https://auth.alchemy.com/signup)
2.  [Créer un compte MetaMask](https://metamask.io/) (ou obtenir une adresse Ethereum)
3.  [Installer Node.js et npm](https://nodejs.org/en/download/)
## Étapes pour envoyer votre transaction {#steps-to-sending-your-transaction}

### 1\. Créer une application Alchemy sur le réseau de test Sepolia {#create-an-alchemy-app-on-the-sepolia-testnet}

Accédez à votre [tableau de bord Alchemy](https://dashboard.alchemy.com/) et créez une nouvelle application, en choisissant Sepolia (ou tout autre réseau de test) pour votre réseau.

### 2\. Demander des ETH au faucet Sepolia {#request-eth-from-sepolia-faucet}

Suivez les instructions sur le [faucet Sepolia d'Alchemy](https://www.alchemy.com/faucets/ethereum-sepolia) pour recevoir des ETH, ou utilisez l'un des autres [faucets Sepolia](/developers/docs/networks/#sepolia). Les faucets distribuent de petites quantités (le faucet d'Alchemy donne 0,1 ETH par jour), ce qui est amplement suffisant pour ce tutoriel. Assurez-vous d'inclure votre adresse Ethereum **Sepolia** (depuis MetaMask) et non celle d'un autre réseau. Après avoir suivi les instructions, vérifiez que vous avez bien reçu les ETH dans votre portefeuille.

### 3\. Créer un nouveau répertoire de projet et y accéder avec `cd` {#create-a-new-project-direction}

Créez un nouveau répertoire de projet depuis la ligne de commande (terminal pour Mac) et accédez-y :

```sh
mkdir sendtx-example
cd sendtx-example
```

### 4\. Installer viem (ou n'importe quelle bibliothèque Web3) {#install-alchemy-web3}

Exécutez la commande suivante dans le répertoire de votre projet pour installer [viem](https://viem.sh/) :

Remarque : si vous souhaitez utiliser la bibliothèque Ethers.js, [suivez les instructions ici](https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```sh
npm init -y
npm install viem
```

### 5\. Installer dotenv {#install-dotenv}

Nous utiliserons un fichier `.env` pour stocker en toute sécurité notre clé d'API et notre clé privée.

```sh
npm install dotenv
```

### 6\. Créer le fichier `.env` {#create-the-dotenv-file}

Créez un fichier `.env` dans le répertoire de votre projet et ajoutez ce qui suit (en remplaçant « `your-api-url` » et « `your-private-key` »)

- Pour trouver l'URL de votre API Alchemy, accédez à la page des détails de l'application que vous venez de créer sur votre tableau de bord, cliquez sur « View Key » dans le coin supérieur droit et copiez l'URL HTTP.
- Pour trouver votre clé privée à l'aide de MetaMask, consultez ce [guide](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/). Utilisez un compte qui ne contient que des ETH de réseau de test.

```sh
API_URL="your-api-url"
PRIVATE_KEY="your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Ne commitez pas <code>.env</code> ! Assurez-vous de ne jamais partager ou exposer votre fichier <code>.env</code> à qui que ce soit, car vous compromettriez vos secrets en le faisant. Si vous utilisez un système de contrôle de version, ajoutez votre <code>.env</code> à un fichier <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

### 7\. Créer le fichier `sendTx.js` {#create-sendtx-js}

Super, maintenant que nos données sensibles sont protégées dans un fichier `.env`, commençons à coder. Pour notre exemple d'envoi de transaction, nous enverrons 0,001 ETH à une autre adresse que vous contrôlez, comme un deuxième compte dans MetaMask.

Créez un fichier `sendTx.js`, c'est là que nous configurerons et enverrons notre exemple de transaction, et ajoutez-y les lignes de code suivantes :

```js
require("dotenv").config({ quiet: true })
const { createPublicClient, createWalletClient, http, parseEther } = require("viem")
const { privateKeyToAccount } = require("viem/accounts")
const { sepolia } = require("viem/chains")

async function main() {
  const { API_URL, PRIVATE_KEY } = process.env
  const account = privateKeyToAccount(
    PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY : `0x${PRIVATE_KEY}`
  )
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(API_URL),
  })
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(API_URL),
  })

  const nonce = await publicClient.getTransactionCount({
    address: account.address,
    blockTag: "pending",
  }) // le nonce commence à compter à partir de 0

  const transaction = await walletClient.prepareTransactionRequest({
    to: "0xYourSecondAddress", // TODO : remplacer par l'adresse à laquelle vous souhaitez envoyer de l'ETH
    value: parseEther("0.001"), // 0.001 ETH
    gas: 21000n,
    nonce,
    // champ de données facultatif pour envoyer un message ou exécuter un contrat intelligent
  })

  const signedTx = await walletClient.signTransaction(transaction)

  try {
    const hash = await walletClient.sendRawTransaction({
      serializedTransaction: signedTx,
    })
    console.log("🎉 The hash of your transaction is:", hash)

    const receipt = await publicClient.waitForTransactionReceipt({ hash })
    console.log(`Transaction ${receipt.status} in block ${receipt.blockNumber}`)
  } catch (error) {
    console.log(
      "❗Something went wrong while submitting your transaction:",
      error.details ?? error.message
    )
  }
}

main()
```

Assurez-vous de remplacer `0xYourSecondAddress` par l'adresse à laquelle vous souhaitez envoyer des ETH. Le script dérive votre propre adresse (d'envoi) à partir de `PRIVATE_KEY`, vous n'avez donc pas besoin de la saisir.

Maintenant, avant de nous lancer dans l'exécution de ce code, parlons de certains de ses composants.

- `account` : un compte local créé à partir de votre clé privée avec [`privateKeyToAccount`](https://viem.sh/docs/accounts/local/privateKeyToAccount). La signature s'effectue sur votre machine et la clé privée n'est jamais envoyée à Alchemy.
- `publicClient` et `walletClient` : des clients viem qui envoient des requêtes JSON-RPC à votre URL Alchemy. Le client public lit depuis la chaîne, et le client de portefeuille prépare et signe les transactions pour votre compte.
- `nonce` : la spécification du nonce est utilisée pour garder une trace du nombre de transactions envoyées depuis votre adresse. Nous en avons besoin pour des raisons de sécurité et pour empêcher les attaques par rejeu. Pour obtenir le nombre de transactions envoyées depuis votre adresse, nous utilisons [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count). viem le remplirait également pour vous, mais nous le récupérons explicitement ici pour montrer d'où il vient.
- `transaction` : l'objet de transaction a quelques aspects que nous devons spécifier. [`prepareTransactionRequest`](https://viem.sh/docs/actions/wallet/prepareTransactionRequest) remplit le reste pour nous, y compris le `chainId` et les champs de frais [EIP-1559](/developers/docs/gas/) `maxFeePerGas` et `maxPriorityFeePerGas`, en fonction des conditions actuelles du réseau.
  - `to` : c'est l'adresse à laquelle nous voulons envoyer des ETH.
  - `value` : c'est le montant que nous souhaitons envoyer, spécifié en Wei où 10^18 Wei = 1 ETH. [`parseEther`](https://viem.sh/docs/utilities/parseEther) convertit un montant en ETH en Wei pour nous. Votre compte a besoin d'un peu plus que cela, car il paie également pour le gaz.
  - `gas` : il existe de nombreuses façons de déterminer la bonne quantité de gaz à inclure avec votre transaction. Alchemy prend en charge les [webhooks](https://www.alchemy.com/docs/reference/webhooks-overview) qui peuvent vous informer de l'activité onchain. Pour les transactions sur le Réseau principal, il est de bonne pratique de vérifier les conditions actuelles du gaz pour déterminer la bonne quantité de gaz à inclure. Un simple transfert d'ETH vers une adresse ordinaire utilise toujours exactement 21 000 gaz, ce qui est le minimum pour toute transaction, nous mettons donc 21 000 ici. Si vous omettez `gas`, viem l'estime pour vous.
  - `nonce` : voir la définition du nonce ci-dessus. Le nonce commence à compter à partir de zéro.
  - [FACULTATIF] data : utilisé pour envoyer des informations supplémentaires avec votre transfert, ou pour appeler un contrat intelligent, non requis pour les transferts de solde, consultez la remarque ci-dessous.
- `signedTx` : pour signer notre objet de transaction, nous utiliserons la méthode `signTransaction`, qui le signe localement avec le compte créé à partir de notre `PRIVATE_KEY`.
- `sendRawTransaction` : une fois que nous avons une transaction signée, nous pouvons l'envoyer pour qu'elle soit incluse dans un bloc ultérieur en utilisant `sendRawTransaction`, qui appelle `eth_sendRawTransaction`.
- `waitForTransactionReceipt` : attend que la transaction soit incluse dans un bloc et renvoie son reçu.

**Une remarque sur les données (data)**
Il existe deux principaux types de transactions qui peuvent être envoyées sur Ethereum.

- Transfert de solde : envoyer des ETH d'une adresse à une autre. Aucun champ de données n'est requis, cependant, si vous souhaitez envoyer des informations supplémentaires avec votre transaction, vous pouvez inclure ces informations au format HEX dans ce champ.
  - Par exemple, disons que nous voulions écrire le hash d'un document IPFS sur la chaîne Ethereum afin de lui donner un horodatage immuable. Notre champ de données devrait alors ressembler à `data: toHex("IPFS hash")`, en utilisant [`toHex`](https://viem.sh/docs/utilities/toHex) de viem. Et maintenant, n'importe qui peut interroger la chaîne et voir quand ce document a été ajouté.
- Transaction de contrat intelligent : exécuter du code de contrat intelligent sur la chaîne. Dans ce cas, le champ de données doit contenir la fonction intelligente que vous souhaitez exécuter, ainsi que tous les paramètres.
  - Pour un exemple pratique, consultez le [tutoriel sur le contrat intelligent Hello World](/developers/tutorials/hello-world-smart-contract/).

### 8\. Exécuter le code en utilisant `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Revenez à votre terminal ou ligne de commande et exécutez :

```sh
node sendTx.js
```

### 9\. Voir votre transaction sur un explorateur de blocs {#see-your-transaction-in-the-mempool}

Le script affiche le hachage de transaction dès que le nœud accepte la transaction, puis attend qu'elle soit incluse dans un bloc (généralement en quelques secondes) et affiche le résultat. Pour voir les détails, collez le hash dans un explorateur de blocs Sepolia tel que [Sepolia Etherscan](https://sepolia.etherscan.io/) ou [Blockscout](https://eth-sepolia.blockscout.com/). Vous pourrez y voir la transaction passer de l'état en attente à incluse, et voir le montant, les frais et le bloc dans lequel elle a atterri.

Si vous voyez plutôt une erreur `insufficient funds`, votre compte n'a pas assez d'ETH Sepolia pour couvrir la valeur plus le gaz. Retournez à l'étape 2 et demandez-en davantage à un faucet.

**Youpi ! Vous venez d'envoyer votre première transaction Ethereum en utilisant Alchemy 🎉**

_Pour des commentaires et des suggestions sur ce guide, veuillez envoyer un message à Elan sur le [Discord](https://discord.gg/gWuC7zB) d'Alchemy !_

_Publié à l'origine par Alchemy._
