---
title: Mit Smart Contracts interagieren
description: Erfahren Sie, wie Sie aus Smart Contracts lesen und in diese schreiben, die bereits auf Ethereum bereitgestellt wurden.
lang: de
---

Sie müssen nicht immer Ihren eigenen Smart Contract schreiben und bereitstellen. Meistens möchten Sie als Entwickler mit Smart Contracts interagieren, die andere bereits im Ethereum-Netzwerk bereitgestellt haben.

Diese Seite behandelt die zwei grundlegenden Möglichkeiten, mit einem Smart Contract zu interagieren – das **Lesen** von Daten und das **Schreiben** von Daten – sowie die Werkzeuge, die Sie für beides benötigen.

## Voraussetzungen {#prerequisites}

Sie sollten Folgendes verstehen:

- [Wie Smart Contracts funktionieren](/developers/docs/smart-contracts/)
- [Ethereum-Konten und wie sie Transaktionen signieren](/developers/docs/accounts/)
- [Was eine Transaktion ist](/developers/docs/transactions/)

## Zwei Möglichkeiten, mit einem Smart Contract zu interagieren {#two-ways}

Die Interaktion mit einem Smart Contract fällt in zwei Kategorien:

### Aus einem Vertrag lesen {#reading-from-a-contract}

Das Lesen ist eine **kostenlose** Operation, die keine Transaktion erstellt und keinen Zustand auf der Blockchain ändert.

Wenn Sie aus einem Vertrag lesen, fragen Sie einfach Daten ab, die bereits existieren. Zum Beispiel:

- Überprüfen eines ERC-20-Token-Guthabens
- Lesen des aktuellen Preises von einer dezentralen Börse
- Ermitteln des Besitzers eines NFT

Da Lesezugriffe den Zustand nicht verändern, kosten sie kein [Gas](/developers/docs/gas/) und können von jedem durchgeführt werden, ohne ETH zu benötigen.

### In einen Vertrag schreiben {#writing-to-a-contract}

Das Schreiben ist eine **zustandsändernde** Operation, die eine Transaktion erfordert und Gas kostet.

Wenn Sie in einen Vertrag schreiben, lösen Sie eine Funktion aus, die den Blockchain-Zustand ändert. Zum Beispiel:

- Übertragen von Token
- Tauschen von Token an einer dezentralen Börse
- Prägen eines NFT

Das Schreiben erfordert immer:

1. Ein [externes Konto (Externally Owned Account, EOA)](/developers/docs/accounts/#types-of-account) mit genügend ETH für Gas
2. Eine Transaktion, die mit dem privaten Schlüssel des Kontos signiert ist
3. Dass die Transaktion gemint und in einen Block aufgenommen wird

Mit [Kontoabstraktion](/roadmap/account-abstraction/) kann auch ein Smart-Contract-Konto Schreibvorgänge initiieren, und ein Paymaster kann das Gas im Namen des Benutzers übernehmen – ein EOA mit ETH ist also nicht zwingend erforderlich.

## Vertrags-ABIs verstehen {#understanding-contract-abis}

Um mit einem Smart Contract zu interagieren, muss Ihre Anwendung wissen, *was* der Vertrag tun kann. Hier kommt die **Application Binary Interface (ABI)** ins Spiel.

Eine ABI ist ein JSON-Dokument, das Folgendes beschreibt:

- Jede Funktion, die der Vertrag bereitstellt (Name, Eingaben, Ausgaben)
- Jedes Ereignis, das der Vertrag auslösen kann
- Wie Daten beim Kommunizieren mit dem Vertrag kodiert und dekodiert werden

Stellen Sie sich die ABI als Bedienungsanleitung des Vertrags vor – ohne sie weiß Ihre Anwendung nicht, welche Funktionen existieren oder welche Parameter sie erwarten.

### Wo man die ABI eines Vertrags findet {#where-to-find-abis}

- **Verifizierte Verträge auf Etherscan** - [Etherscan](https://etherscan.io) stellt automatisch die ABI für verifizierten Quellcode bereit
- **Vom Entwickler** - viele Projekte veröffentlichen ihre ABIs in ihrer Dokumentation oder in npm-Paketen
- **Aus dem Quellcode generieren** - wenn Sie den Solidity-Quellcode haben, können Sie ihn [kompilieren](/developers/docs/smart-contracts/compiling/), um die ABI zu erstellen

## Werkzeuge und Bibliotheken zur Interaktion mit Verträgen {#tools-and-libraries}

Entwickler verwenden typischerweise eine JavaScript/TypeScript-Bibliothek, um von einer Web-App, einem Backend oder einem Skript aus mit Verträgen zu interagieren.

### Client-Bibliotheken (JavaScript/TypeScript) {#client-libraries}

- **[Viem](https://viem.sh)** - Moderne, leichtgewichtige TypeScript-Schnittstelle für Ethereum mit erstklassiger Typsicherheit
- **[ethers.js](https://docs.ethers.org/)** - Praxiserprobte Bibliothek zur Interaktion mit der Ethereum-Blockchain
- **[Web3.js](https://web3js.org/)** - Die ursprüngliche Ethereum-JavaScript-API

### Backend-Bibliotheken {#backend-libraries}

- **[ethers.js](https://docs.ethers.org/)** - Funktioniert auch in Node.js für serverseitige Skripte und Bots
- **[Web3.py](https://web3py.readthedocs.io/)** - Python-Bibliothek für die Ethereum-Interaktion
- **[go-ethereum](https://geth.ethereum.org/docs/interact-with-geth)** - Offizielle Go-Bibliothek vom Geth-Team

### Beispiel: Lesen eines Token-Guthabens mit Viem {#example-viem}

```ts
import { createPublicClient, http, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

// USDC-Vertragsadresse und ABI (teilweise, für balanceOf)
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

console.log(formatUnits(balance, 6)) // USDC hat 6 Dezimalstellen
```

### Beispiel: Senden einer Transaktion mit ethers.js {#example-ethers}

```js
const { ethers } = require('ethers')

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

// ERC-20-Transfer-ABI
const abi = ['function transfer(address to, uint256 amount) returns (bool)']
const contract = new ethers.Contract(tokenAddress, abi, wallet)

const tx = await contract.transfer(recipient, ethers.parseUnits('10', 18))
await tx.wait() // Warten, bis die Transaktion gemint wird
console.log(`Transferred! TX: ${tx.hash}`)
```

## Ereignisse und Protokolle {#events-and-logs}

Smart Contracts können **Ereignisse** auslösen, um zu signalisieren, dass etwas passiert ist. Ihre Anwendung kann auf diese Ereignisse lauschen, um in Echtzeit zu reagieren.

```ts
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

// USDC-Transfer-Ereignisse beobachten
const unwatch = client.watchEvent({
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  onLogs: (logs) => console.log(logs),
})
```

## Transaktionen simulieren {#simulating}

Bevor Sie eine Transaktion senden, können Sie diese **simulieren**, um zu prüfen, ob sie erfolgreich wäre – und um ihren Rückgabewert zu sehen –, ohne Gas auszugeben. Dies ist nützlich, um Fehler frühzeitig zu erkennen und Ergebnisse im Voraus zu betrachten.

Die meisten Client-Bibliotheken unterstützen dies durch `eth_call`:

```ts
// Mit Viem
const result = await client.simulateContract({
  address: contractAddress,
  abi,
  functionName: 'swap',
  args: [amountIn],
  account: userAddress,
})
```

## Wallets und Signieren {#wallets-and-signing}

In einer dezentralen Anwendung (Dapp) übernimmt die Wallet des Benutzers (wie MetaMask, Rainbow oder WalletConnect) das Signieren. Sie verwalten private Schlüssel nicht direkt.

[Wallet-Bibliotheken und Verbindungstools](/developers/docs/apis/javascript/) abstrahieren dies, sodass Sie sich auf die Entwicklung Ihrer Anwendungslogik konzentrieren können.

## Verwandte Tutorials {#related-tutorials}

- [Aufrufen eines Smart Contracts aus JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/)
- [Senden von Transaktionen mit Web3.js und Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [So zeigen Sie Ihr NFT in Ihrer Wallet an](/developers/tutorials/how-to-view-nft-in-metamask/)

## Weiterführende Literatur {#further-reading}

- [Viem-Dokumentation: Lesen und Schreiben in Verträge](https://viem.sh/docs/contract/readContract)
- [ethers.js-Dokumentation: Verträge](https://docs.ethers.org/v6/api/contract/)
- [Solidity-ABI-Spezifikation](https://docs.soliditylang.org/en/latest/abi-spec.html)
- [Was ist eine ABI? - Alchemy](https://www.alchemy.com/overviews/what-is-an-abi)

## Verwandte Themen {#related-topics}

- [Kompilierung von Smart Contracts](/developers/docs/smart-contracts/compiling/)
- [Bereitstellen von Smart Contracts](/developers/docs/smart-contracts/deploying/)
- [JavaScript-APIs](/developers/docs/apis/javascript/)
- [Backend-APIs](/developers/docs/apis/backend/)