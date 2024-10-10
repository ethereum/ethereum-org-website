---
title: Librerie API JavaScript
description: Introduzione alle librerie client JavaScript che consentono di interagire con la blockchain da un'applicazione.
lang: it
---

Per interagire con la blockchain Ethereum (ad esempio leggere i dati della blockchain e/o inviare transazioni alla rete), una web app deve connettersi a un nodo Ethereum.

Per questo scopo, ogni client di Ethereum implementa la specifica [JSON-RPC](/developers/docs/apis/json-rpc/), quindi esiste una serie uniforme di [metodi](/developers/docs/apis/json-rpc/#json-rpc-methods) su cui possono basarsi le applicazioni.

Se desideri utilizzare JavaScript per connetterti a un nodo Ethereum, puoi usare Javascript vanilla, ma tieni presente che ci sono già molte librerie all'interno dell'ecosistema che possono facilitarti la vita. Con queste librerie, gli sviluppatori possono scrivere metodi a una riga intuitivi per inizializzare le richieste RPC JSON (under the hood) che interagiscono con Ethereum.

Si noti che, a partire da [La Fusione](/roadmap/merge/), per eseguire un nodo occorrono due elementi di software di Ethereum connessi (un client di esecuzione e un client di consenso). Assicurati che il tuo nodo includa sia un client di esecuzione che un client di consenso. Se il tuo nodo non si trova sulla tua macchina locale (ad es. se è in esecuzione su un'istanza AWS), occorrerà aggiornare di conseguenza gli indirizzi IP nel tutorial. Per ulteriori informazioni, consulta la nostra pagina sull'[esecuzione di un nodo](/developers/docs/nodes-and-clients/run-a-node/).

## Prerequisiti {#prerequisites}

Potrebbe essere utile conoscere non solo Javascript ma anche lo [stack di Ethereum](/developers/docs/ethereum-stack/) e [i client di Ethereum](/developers/docs/nodes-and-clients/).

## Perché usare una libreria? {#why-use-a-library}

Queste librerie eliminano buona parte della complessità legata al dover interagire direttamente con un nodo Ethereum. Assicurano inoltre funzioni di utilità (ad esempio la conversione da ETH a Gwei) per fare in modo che gli sviluppatori debbano dedidare meno tempo alle complessità dei client Ethereum e più tempo alle funzionalità specifiche dell'applicazione.

## Caratteristiche della libreria {#library-features}

### Connettersi ai nodi Ethereum {#connect-to-ethereum-nodes}

Utilizzando i provider, queste librerie consentono di connettersi a Ethereum e leggerne i dati, tramite JSON-RPC, INFURA, Etherscan, Alchemy o MetaMask.

**Esempio da Ethers**

```js
// Un BrowserProvider avvolge un fornitore Web3 standard, ciò
// che MetaMask inietta come window.ethereum in ogni pagina
const provider = new ethers.BrowserProvider(window.ethereum)

// Anche il plugin di MetaMask consente la firma delle transazioni per
// inviare ether e pagare per cambiare lo stato nella blockchain.
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

Queste librerie offrono le funzionalità per creare portafogli, gestire chiavi e firmare transazioni.

Ecco un esempio da Ethers

```js
// Creazione di un'istanza di portafoglio da un mnemonico...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...o da una chiave privata
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// L'indirizzo come una Promise per l'API del Firmatario
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// L'indirizzo di un Portafoglio è anche disponibile sincronicamente
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

// Nota: Un portafoglio creato con una chiave privata non
//       dispone di una frase mnemonica (la derivazione la previene)
walletPrivateKey.mnemonic
// null

// Firmare un messaggio
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// Firmare una transazione
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// Il metodo connect restituisce una nuova istanza del
// Portafoglio connesso a un fornitore
wallet = walletMnemonic.connect(provider)

// Interrogare la rete
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// Inviare ether
wallet.sendTransaction(tx)
```

[Consulta la documentazione completa](https://docs.ethers.io/v5/api/signer/#Wallet)

Una volta eseguita la configurazione, sarà possibile:

- creare conti
- inviare transazioni
- firmare transazioni
- e molto altro...

### Interagire con le funzioni dei contratti intelligenti {#interact-with-smart-contract-functions}

Le librerie del client di JavaScript consentono alla tua applicazione di chiamare le funzioni dei contratti intelligenti, leggendo l'Interfaccia Binaria dell'Applicazione (ABI) di un contratto compilato.

L'ABI spiega essenzialmente le funzioni del contratto in un formato JSON e consente di utilizzarlo come un normale oggetto JavaScript.

Quindi il seguente contratto di Solidity:

```solidity
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    function Test(uint testInt) { a = testInt;}

    event Event(uint indexed b, bytes32 c);

    evento Event2(uint indexed b, bytes32 c);

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

- [Funzioni di utilità Web3js](https://docs.web3js.org/api/web3-utils)
- [Funzioni utilità ethers](https://docs.ethers.io/v5/api/utils/)

## Librerie disponibili {#available-libraries}

**Web3.js -** **_API JavaScript Ethereum_**

- [Documentazione](https://docs.web3js.org/)
- [GitHub](https://github.com/ethereum/web3.js/)

**Ethers.js -** **_Implementazione completa del portafoglio Ethereum e delle utility in JavaScript e TypeScript_**

- [Documentazione](https://docs.ethers.io/)
- [GitHub](https://github.com/ethers-io/ethers.js/)

**The Graph -** **_Protocollo per indicizzare i dati Ethereum e IPFS ed eseguire query con GraphQL_**

- [Graph](https://thegraph.com/)
- [Graph Explorer](https://thegraph.com/explorer/)
- [Documentazione](https://thegraph.com/docs/)
- [GitHub](https://github.com/graphprotocol/)
- [Discord](https://thegraph.com/discord)

**light.js -** **_Libreria JavaScript reattiva di alto livello, ottimizzata per i light client_**

- [GitHub](https://github.com/openethereum/js-libs/tree/master/packages/light.js)

**Web3-wrapper -** **_Alternativa Typescript a Web3.js_**

- [Documentazione](https://0x.org/docs/web3-wrapper#introduction)
- [GitHub](https://github.com/0xProject/0x-monorepo/tree/development/packages/web3-wrapper)

**Alchemyweb3 -** **_Wrapper per Web3.js con nuovi tentativi automatici e API migliorate_**

- [Documentazione](https://docs.alchemy.com/reference/api-overview)
- [GitHub](https://github.com/alchemyplatform/alchemy-web3)

**Alchemy NFT API -** **_API per recuperare i dati degli NFT, inclusi proprietà, attributi dei metadati e altro_**

- [Documentazione](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
- [GitHub](https://github.com/alchemyplatform/alchemy-web3)

**viem -** **_Interfaccia TypeScript per Ethereum._**

- [Documentazione](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

## Letture consigliate {#further-reading}

_Conosci una risorsa della comunità che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [ Nodi e client](/developers/docs/nodes-and-clients/)
- [Quadri di sviluppo](/developers/docs/frameworks/)

## Tutorial correlati {#related-tutorials}

- [Set up Web3js to use the Ethereum blockchain in JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Istruzioni per impostare web3.js in un progetto._
- [Calling a Smart Contract from JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Usando il token DAI, impara come funzionano i contratti di chiamata con JavaScript_
- [Sending transactions using web3 and Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– Istruzioni passo passo per l'invio di transazioni dal backend._
