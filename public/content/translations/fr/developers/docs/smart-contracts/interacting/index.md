---
title: Interagir avec les contrats intelligents
description: Apprenez à lire et à écrire dans des contrats intelligents déjà déployés sur Ethereum.
lang: fr
---

Vous n'avez pas toujours besoin d'écrire et de déployer votre propre contrat intelligent. La plupart du temps, en tant que développeur, vous voudrez interagir avec des contrats intelligents que d'autres ont déjà déployés sur le réseau Ethereum.

Cette page couvre les deux manières fondamentales d'interagir avec un contrat intelligent — la **lecture** de données et l'**écriture** de données — ainsi que les outils dont vous avez besoin pour faire les deux.

## Prérequis {#prerequisites}

Vous devriez comprendre :

- [Comment fonctionnent les contrats intelligents](/developers/docs/smart-contracts/)
- [Les comptes Ethereum et comment ils signent les transactions](/developers/docs/accounts/)
- [Ce qu'est une transaction](/developers/docs/transactions/)

## Deux façons d'interagir avec un contrat intelligent {#two-ways}

L'interaction avec un contrat intelligent se divise en deux catégories :

### Lire depuis un contrat {#reading-from-a-contract}

La lecture est une opération **gratuite** qui ne crée pas de transaction et ne modifie aucun état sur la chaîne de blocs.

Lorsque vous lisez depuis un contrat, vous interrogez simplement des données qui existent déjà. Par exemple :

- Vérifier le solde d'un jeton ERC-20
- Lire le prix actuel sur un échange décentralisé
- Obtenir le propriétaire d'un NFT

Étant donné que les lectures ne modifient pas l'état, elles ne coûtent pas de [gaz](/developers/docs/gas/) et peuvent être effectuées par n'importe qui sans avoir besoin d'ETH.

### Écrire dans un contrat {#writing-to-a-contract}

L'écriture est une opération **modifiant l'état** qui nécessite une transaction et coûte du gaz.

Lorsque vous écrivez dans un contrat, vous déclenchez une fonction qui modifie l'état de la chaîne de blocs. Par exemple :

- Transférer des jetons
- Échanger des jetons sur un échange décentralisé
- La frappe d'un NFT

L'écriture nécessite toujours :

1. Un [compte détenu par un tiers (EOA)](/developers/docs/accounts/#types-of-account) avec suffisamment d'ETH pour le gaz
2. Une transaction signée par la clé privée du compte
3. Que la transaction soit minée et incluse dans un bloc

Avec l'[abstraction de compte](/roadmap/account-abstraction/), un compte de contrat intelligent peut également initier des écritures, et un paymaster peut couvrir le gaz au nom de l'utilisateur — un EOA détenant de l'ETH n'est donc pas strictement requis.

## Comprendre les ABI de contrat {#understanding-contract-abis}

Pour interagir avec un contrat intelligent, votre application doit savoir *ce que* le contrat peut faire. C'est là qu'intervient l'**Interface Binaire d'Application (ABI)**.

Une ABI est un document JSON qui décrit :

- Chaque fonction exposée par le contrat (nom, entrées, sorties)
- Chaque événement que le contrat peut émettre
- Comment encoder et décoder les données lors de la communication avec le contrat

Considérez l'ABI comme le manuel d'instructions du contrat — sans elle, votre application ne sait pas quelles fonctions existent ni quels paramètres elles attendent.

### Où trouver l'ABI d'un contrat {#where-to-find-abis}

- **Contrats vérifiés sur Etherscan** - [Etherscan](https://etherscan.io) expose automatiquement l'ABI pour le code source vérifié
- **Auprès du développeur** - de nombreux projets publient leurs ABI dans leur documentation ou leurs paquets npm
- **Générer à partir de la source** - si vous avez le code source Solidity, vous pouvez le [compiler](/developers/docs/smart-contracts/compiling/) pour produire l'ABI

## Outils et bibliothèques pour interagir avec les contrats {#tools-and-libraries}

Les développeurs utilisent généralement une bibliothèque JavaScript/TypeScript pour interagir avec les contrats depuis une application web, un backend ou un script.

### Bibliothèques client (JavaScript/TypeScript) {#client-libraries}

- **[Viem](https://viem.sh)** - Interface TypeScript moderne et légère pour Ethereum avec une sécurité de typage de premier ordre
- **[ethers.js](https://docs.ethers.org/)** - Bibliothèque éprouvée pour interagir avec la chaîne de blocs Ethereum
- **[web3.js](https://web3js.org/)** - L'API JavaScript Ethereum originale

### Bibliothèques backend {#backend-libraries}

- **[ethers.js](https://docs.ethers.org/)** - Fonctionne également dans Node.js pour les scripts côté serveur et les bots
- **[Web3.py](https://web3py.readthedocs.io/)** - Bibliothèque Python pour l'interaction avec Ethereum
- **[go-ethereum](https://geth.ethereum.org/docs/interact-with-geth)** - Bibliothèque Go officielle de l'équipe Geth

### Exemple : lire le solde d'un jeton avec Viem {#example-viem}

```ts
import { createPublicClient, http, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

// Adresse du contrat USDC et ABI (partielle, pour balanceOf)
const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const abi = [{
  name: 'balanceOf',
  type: 'function',
  stateMutability: 'view',
  inputs: [{ name: 'account', type: 'address' }],
  outputs: [{ name: '', type: 'uint256' }],
}] as const

const client = createPublicClient({ chain: mainnet, transport: http() })

const balance = await client.readContract({
  address: USDC,
  abi,
  functionName: 'balanceOf',
  args: ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'], // vitalik.eth
})

console.log(formatUnits(balance, 6)) // USDC a 6 décimales
```

### Exemple : envoyer une transaction avec ethers.js {#example-ethers}

```js
const { ethers } = require('ethers')

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

// ABI de transfert ERC-20
const abi = ['function transfer(address to, uint256 amount) returns (bool)']
const contract = new ethers.Contract(tokenAddress, abi, wallet)

const tx = await contract.transfer(recipient, ethers.parseUnits('10', 18))
await tx.wait() // attendre que la transaction soit minée
console.log(`Transferred! TX: ${tx.hash}`)
```

## Événements et journaux {#events-and-logs}

Les contrats intelligents peuvent émettre des **événements** pour signaler que quelque chose s'est produit. Votre application peut écouter ces événements pour réagir en temps réel.

```ts
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

// Surveiller les événements de transfert USDC
const unwatch = client.watchEvent({
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  onLogs: (logs) => console.log(logs),
})
```

## Simuler des transactions {#simulating}

Avant d'envoyer une transaction, vous pouvez la **simuler** pour vérifier si elle réussirait — et pour voir sa valeur de retour — sans dépenser de gaz. C'est utile pour détecter les erreurs tôt et pour prévisualiser les résultats.

La plupart des bibliothèques client prennent cela en charge via `eth_call` :

```ts
// Avec Viem
const result = await client.simulateContract({
  address: contractAddress,
  abi,
  functionName: 'swap',
  args: [amountIn],
  account: userAddress,
})
```

## Portefeuilles et signature {#wallets-and-signing}

Dans une application décentralisée (dapp), le portefeuille de l'utilisateur (comme MetaMask, Rainbow ou WalletConnect) gère la signature. Vous ne gérez pas les clés privées directement.

Les [bibliothèques de portefeuilles et les outils de connexion](/developers/docs/apis/javascript/) font abstraction de cela afin que vous puissiez vous concentrer sur la construction de la logique de votre application.

## Tutoriels connexes {#related-tutorials}

- [Appeler un contrat intelligent depuis JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/)
- [Envoyer des transactions en utilisant Web3.js et Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [Comment voir votre NFT dans votre portefeuille](/developers/tutorials/how-to-view-nft-in-metamask/)

## Lectures complémentaires {#further-reading}

- [Documentation de Viem : Lire et écrire dans des contrats](https://viem.sh/docs/contract/readContract)
- [Documentation d'ethers.js : Contrats](https://docs.ethers.org/v6/api/contract/)
- [Spécification de l'ABI Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html)
- [Qu'est-ce qu'une ABI ? - Alchemy](https://www.alchemy.com/overviews/what-is-an-abi)

## Sujets connexes {#related-topics}

- [Compilation de contrats intelligents](/developers/docs/smart-contracts/compiling/)
- [Déployer des contrats intelligents](/developers/docs/smart-contracts/deploying/)
- [API JavaScript](/developers/docs/apis/javascript/)
- [API backend](/developers/docs/apis/backend/)