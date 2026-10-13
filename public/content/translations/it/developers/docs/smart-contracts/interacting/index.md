---
title: Interagire con gli smart contract
description: Scopri come leggere e scrivere sugli smart contract che sono già stati distribuiti su Ethereum.
lang: it
---

Non è sempre necessario scrivere e distribuire il proprio smart contract. La maggior parte delle volte, come sviluppatore, vorrai interagire con gli smart contract che altri hanno già distribuito sulla rete Ethereum.

Questa pagina illustra i due modi fondamentali per interagire con uno smart contract — **leggere** i dati e **scrivere** i dati — e gli strumenti necessari per fare entrambe le cose.

## Prerequisiti {#prerequisites}

Dovresti comprendere:

- [Come funzionano gli smart contract](/developers/docs/smart-contracts/)
- [Gli account Ethereum e come firmano le transazioni](/developers/docs/accounts/)
- [Cos'è una transazione](/developers/docs/transactions/)

## Due modi per interagire con uno smart contract {#two-ways}

L'interazione con uno smart contract si divide in due categorie:

### Leggere da un contratto {#reading-from-a-contract}

La lettura è un'operazione **gratuita** che non crea una transazione e non modifica alcuno stato sulla blockchain.

Quando leggi da un contratto, stai semplicemente interrogando dati che esistono già. Ad esempio:

- Controllare il saldo di un token ERC-20
- Leggere il prezzo attuale da un exchange decentralizzato
- Ottenere il proprietario di un NFT

Poiché le letture non modificano lo stato, non costano [gas](/developers/docs/gas/) e possono essere eseguite da chiunque senza bisogno di ETH.

### Scrivere su un contratto {#writing-to-a-contract}

La scrittura è un'operazione che **modifica lo stato**, richiede una transazione e costa gas.

Quando scrivi su un contratto, stai attivando una funzione che modifica lo stato della blockchain. Ad esempio:

- Trasferire token
- Scambiare token su un exchange decentralizzato
- Il conio di un NFT

La scrittura richiede sempre:

1. Un [Account di Proprietà Esterna (EOA)](/developers/docs/accounts/#types-of-account) con abbastanza ETH per il gas
2. Una transazione firmata dalla chiave privata dell'account
3. Che la transazione venga minata e inclusa in un blocco

Con l'[astrazione dell'account](/roadmap/account-abstraction/), anche un account smart contract può avviare scritture, e un paymaster può coprire il gas per conto dell'utente, quindi un EOA che detiene ETH non è strettamente necessario.

## Comprendere le ABI dei contratti {#understanding-contract-abis}

Per interagire con uno smart contract, la tua applicazione deve sapere *cosa* può fare il contratto. È qui che entra in gioco l'**Application Binary Interface (ABI)**.

Un'ABI è un documento JSON che descrive:

- Ogni funzione esposta dal contratto (nome, input, output)
- Ogni evento che il contratto può emettere
- Come codificare e decodificare i dati quando si comunica con il contratto

Pensa all'ABI come al manuale di istruzioni del contratto: senza di essa, la tua applicazione non sa quali funzioni esistono o quali parametri si aspettano.

### Dove trovare l'ABI di un contratto {#where-to-find-abis}

- **Contratti verificati su Etherscan** - [Etherscan](https://etherscan.io) espone automaticamente l'ABI per il codice sorgente verificato
- **Dallo sviluppatore** - molti progetti pubblicano le loro ABI nella loro documentazione o nei pacchetti npm
- **Generare dal sorgente** - se hai il codice sorgente Solidity, puoi [compilarlo](/developers/docs/smart-contracts/compiling/) per produrre l'ABI

## Strumenti e librerie per interagire con i contratti {#tools-and-libraries}

Gli sviluppatori in genere utilizzano una libreria JavaScript/TypeScript per interagire con i contratti da un'app web, un backend o uno script.

### Librerie client (JavaScript/TypeScript) {#client-libraries}

- **[Viem](https://viem.sh)** - Interfaccia TypeScript moderna e leggera per Ethereum con sicurezza dei tipi di prim'ordine
- **[Ethers.js](https://docs.ethers.org/)** - Libreria collaudata sul campo per interagire con la blockchain di Ethereum
- **[Web3.js](https://web3js.org/)** - L'API JavaScript originale di Ethereum

### Librerie backend {#backend-libraries}

- **[Ethers.js](https://docs.ethers.org/)** - Funziona anche in Node.js per script lato server e bot
- **[Web3.py](https://web3py.readthedocs.io/)** - Libreria Python per l'interazione con Ethereum
- **[go-ethereum](https://geth.ethereum.org/docs/interact-with-geth)** - Libreria Go ufficiale del team di Geth

### Esempio: leggere il saldo di un token con Viem {#example-viem}

```ts
import { createPublicClient, http, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

// Indirizzo del contratto USDC e ABI (parziale, per balanceOf)
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

console.log(formatUnits(balance, 6)) // USDC ha 6 decimali
```

### Esempio: inviare una transazione con Ethers.js {#example-ethers}

```js
const { ethers } = require('ethers')

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

// ABI di trasferimento ERC-20
const abi = ['function transfer(address to, uint256 amount) returns (bool)']
const contract = new ethers.Contract(tokenAddress, abi, wallet)

const tx = await contract.transfer(recipient, ethers.parseUnits('10', 18))
await tx.wait() // attendi che la transazione venga minata
console.log(`Transferred! TX: ${tx.hash}`)
```

## Eventi e log {#events-and-logs}

Gli smart contract possono emettere **eventi** per segnalare che è successo qualcosa. La tua applicazione può ascoltare questi eventi per reagire in tempo reale.

```ts
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

// Monitora gli eventi di trasferimento USDC
const unwatch = client.watchEvent({
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  onLogs: (logs) => console.log(logs),
})
```

## Simulare le transazioni {#simulating}

Prima di inviare una transazione, puoi **simularla** per verificare se andrebbe a buon fine — e per vedere il suo valore di ritorno — senza spendere gas. Questo è utile per individuare tempestivamente gli errori e per visualizzare in anteprima i risultati.

La maggior parte delle librerie client supporta questa funzionalità tramite `eth_call`:

```ts
// Con Viem
const result = await client.simulateContract({
  address: contractAddress,
  abi,
  functionName: 'swap',
  args: [amountIn],
  account: userAddress,
})
```

## Portafogli e firma {#wallets-and-signing}

In un'applicazione decentralizzata (dapp), il portafoglio dell'utente (come MetaMask, Rainbow o WalletConnect) gestisce la firma. Non gestisci direttamente le chiavi private.

Le [librerie per portafogli e gli strumenti di connessione](/developers/docs/apis/javascript/) astraggono questo processo in modo che tu possa concentrarti sulla costruzione della logica della tua applicazione.

## Tutorial correlati {#related-tutorials}

- [Chiamare uno smart contract da JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/)
- [Inviare transazioni usando Web3.js e Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [Come visualizzare il tuo NFT nel tuo portafoglio](/developers/tutorials/how-to-view-nft-in-metamask/)

## Letture di approfondimento {#further-reading}

- [Documentazione di Viem: Leggere e scrivere sui contratti](https://viem.sh/docs/contract/readContract)
- [Documentazione di Ethers.js: Contratti](https://docs.ethers.org/v6/api/contract/)
- [Specifica dell'ABI di Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html)
- [Cos'è un'ABI? - Alchemy](https://www.alchemy.com/overviews/what-is-an-abi)

## Argomenti correlati {#related-topics}

- [Compilazione degli smart contract](/developers/docs/smart-contracts/compiling/)
- [Distribuire gli smart contract](/developers/docs/smart-contracts/deploying/)
- [API JavaScript](/developers/docs/apis/javascript/)
- [API backend](/developers/docs/apis/backend/)