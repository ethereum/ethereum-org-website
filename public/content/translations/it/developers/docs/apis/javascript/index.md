---
title: Librerie API JavaScript
description: Introduzione alle librerie client JavaScript che consentono di interagire con la blockchain da un'applicazione.
lang: it
---

Per interagire con la blockchain Ethereum (ad esempio leggere i dati della blockchain e/o inviare transazioni alla rete), una web app deve connettersi a un nodo Ethereum.

A questo scopo, ogni client Ethereum implementa la specifica [JSON-RPC](/developers/docs/apis/json-rpc/), così che ci sia un set uniforme di [metodi](/developers/docs/apis/json-rpc/#json-rpc-methods) a cui le applicazioni possono fare riferimento.

Se desideri utilizzare JavaScript per connetterti a un nodo Ethereum, puoi usare Javascript vanilla, ma tieni presente che ci sono già molte librerie all'interno dell'ecosistema che possono facilitarti la vita. Con queste librerie, gli sviluppatori possono scrivere metodi a una riga intuitivi per inizializzare le richieste RPC JSON (under the hood) che interagiscono con Ethereum.

Si noti che, a partire da [La Fusione](/roadmap/merge/), per eseguire un nodo occorrono due componenti software di Ethereum connessi: un client di esecuzione e un client di consenso. Assicurati che il tuo nodo includa sia un client di esecuzione che un client di consenso. Se il tuo nodo non si trova sulla tua macchina locale (ad es. se è in esecuzione su un'istanza AWS), occorrerà aggiornare di conseguenza gli indirizzi IP nel tutorial. Per maggiori informazioni, consulta la nostra pagina su come [eseguire un nodo](/developers/docs/nodes-and-clients/run-a-node/).

## Prerequisiti {#prerequisites}

Oltre a comprendere JavaScript, potrebbe essere utile comprendere lo [stack di Ethereum](/developers/docs/ethereum-stack/) e i [client di Ethereum](/developers/docs/nodes-and-clients/).

## Perché usare una libreria? {#why-use-a-library}

Queste librerie eliminano buona parte della complessità legata al dover interagire direttamente con un nodo Ethereum. Forniscono anche funzioni di utilità (ad es. la conversione di ETH in Gwei), così che uno sviluppatore possa dedicare meno tempo alle complessità dei client di Ethereum e più tempo alle funzionalità uniche della propria applicazione.

## Funzionalità della libreria {#library-features}

### Connettersi ai nodi di Ethereum {#connect-to-ethereum-nodes}

Utilizzando i provider, queste librerie consentono di connettersi a Ethereum e leggerne i dati, tramite JSON-RPC, INFURA, Etherscan, Alchemy o MetaMask.

> **Avvertenza:** Web3.js è stato archiviato il 4 marzo 2025. [Leggi l'annuncio](https://blog.chainsafe.io/web3-js-sunset/). Prendi in considerazione l'utilizzo di librerie alternative come [ethers.js](https://ethers.org) o [viem](https://viem.sh) per i nuovi progetti.

**Esempio da Ethers**

```js
// Un BrowserProvider avvolge un provider Web3 standard, che è
// ciò che MetaMask inietta come window.ethereum in ogni pagina
const provider = new ethers.BrowserProvider(window.ethereum)

// Il plug-in di MetaMask consente anche di firmare le transazioni per
// inviare ether e pagare per cambiare lo stato all'interno della blockchain.
// Per questo, abbiamo bisogno del firmatario dell'account...
const signer = provider.getSigner()
```

**Esempio da Web3js**

```js
var web3 = new Web3("http://localhost:8545")
// o
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// cambiamento di provider
web3.setProvider("ws://localhost:8546")
// o
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// Uso del provider IPC in node.js
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth. pc", net) // mac os path
// o
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // percorso MacOS
// in Windows il percorso è: "\\\\.\\pipe\\geth.ipc"
// in Linux il percorso è: "/users/myuser/.ethereum/geth.ipc"Web3
```

Una volta eseguita la configurazione, sarà possibile interrogare la blockchain per avere:

- numeri di blocco
- stime del gas
- eventi del contratto intelligenti
- ID di rete
- e molto altro...

### Funzionalità del portafoglio {#wallet-functionality}

Queste librerie offrono funzionalità per creare portafogli, gestire chiavi e firmare transazioni.

Ecco un esempio da Ethers

```js
// Crea un'istanza di portafoglio da una mnemonica...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...o da una chiave privata
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// L'indirizzo come Promise per l'API Signer
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// Un indirizzo del portafoglio è disponibile anche in modo sincrono
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// I componenti crittografici interni
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// La frase mnemonica del portafoglio
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Nota: un portafoglio creato con una chiave privata non
//       dispone di una mnemonica (la derivazione lo impedisce)
walletPrivateKey.mnemonic
// null

// Firma di un messaggio
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// Firma di una transazione
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// Il metodo connect restituisce una nuova istanza del
// portafoglio connesso a un provider
wallet = walletMnemonic.connect(provider)

// Interrogazione della rete
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// Invio di ether
wallet.sendTransaction(tx)
```

[Leggi la documentazione completa](https://docs.ethers.io/v5/api/signer/#Wallet)

Una volta eseguita la configurazione, sarà possibile:

- creare conti
- inviare transazioni
- firmare transazioni
- e molto altro...

### Interagire con le funzioni di un contratto intelligente {#interact-with-smart-contract-functions}

Le librerie del client di JavaScript consentono alla tua applicazione di chiamare le funzioni dei contratti intelligenti, leggendo l'Interfaccia Binaria dell'Applicazione (ABI) di un contratto compilato.

L'ABI spiega essenzialmente le funzioni del contratto in un formato JSON e consente di utilizzarlo come un normale oggetto JavaScript.

Quindi il seguente contratto di Solidity:

```solidity
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    constructor(uint testInt)  { a = testInt;}

    event Event(uint indexed b, bytes32 c);

    event Event2(uint indexed b, bytes32 c);

    function foo(uint b, bytes32 c) returns(address) {
        Event(b, c);
        return d;
    }
}
```

Si tradurrebbe nel seguente JSON:

```json
[{
    "type":"constructor",
    "payable":false,
    "stateMutability":"nonpayable"
    "inputs":[{"name":"testInt", type":"uint256"}],
  },{
    "type":"function",
    "name":"foo",
    "constant":false,
    "payable":false,
    "stateMutabilità":"non payable",
    "inputs":[{"name":"b","type":"uint256"}, {"name":"c","type":"bytes32"}],
    "outputs":[{"name":"", type":"address"}]
  },{
    "type":"event",
    "name":"Event",
    "inputs":[{"indexed":true, name":"b","type":"uint256"}, {"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
  },
    "type":"event",
    "name":"Event2",
    "inputs":[{"indexed":true,"name":"b", type":"uint256"},{"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
}]
```

Ciò significa che è possibile:

- Invia una transazione al contratto intelligente ed eseguine il metodo
- Chiamarla per stimare il gas che l'esecuzione di un metodo richiederà, all'esecuzione nell'EVM
- Distribuire un contratto
- E molto altro...

### Funzioni di utilità {#utility-functions}

Le funzioni di utilità forniscono pratiche scorciatoie che rendono la programmazione con Ethereum un po' più semplice.

I valori ETH sono in Wei per default. 1 ETH = 1.000.000.000.000.000.000 WEI, un numero di cifre veramente elevato! `web3.utils.toWei` converte ether in Wei.

E in ethers funziona così:

```js
// Per ottenere il saldo di un account (per indirizzo o nome ENS)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// Spesso è necessario formattare l'output per l'utente
// che preferisce vedere i valori in ether anziché in wei
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Funzioni di utilità di Web3js](https://docs.web3js.org/api/web3-utils)
- [Funzioni di utilità di Ethers](https://docs.ethers.org/v6/api/utils/)

## Librerie disponibili {#available-libraries}

**Web3.js -** **_API JavaScript di Ethereum._**

- [Documentazione](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_Implementazione completa del portafoglio Ethereum e delle utility in JavaScript e TypeScript._**

- [Home di Ethers.js](https://ethers.org/)
- [Documentazione](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_Un protocollo per indicizzare i dati di Ethereum e IPFS ed eseguire query con GraphQL._**

- [The Graph](https://thegraph.com)
- [Graph Explorer](https://thegraph.com/explorer)
- [Documentazione](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK -** **_Wrapper per Ethers.js con API avanzate._**

- [Documentazione](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_Interfaccia TypeScript per Ethereum._**

- [Documentazione](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Drift -** **_Meta-libreria TypeScript con caching, hook e mock di test integrati._**

- [Documentazione](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## Letture consigliate {#further-reading}

_Conosci una risorsa della comunità che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Nodi e client](/developers/docs/nodes-and-clients/)
- [Framework di sviluppo](/developers/docs/frameworks/)

## Guide correlate {#related-tutorials}

- [Configurare Web3js per usare la blockchain di Ethereum in JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Istruzioni per configurare web3.js nel proprio progetto._
- [Chiamare un contratto intelligente da JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Usando il token DAI, scopri come chiamare le funzioni dei contratti usando JavaScript._
- [Invio di transazioni con web3 e Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– Procedura dettagliata per l'invio di transazioni dal backend._
