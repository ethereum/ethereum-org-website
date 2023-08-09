---
title: Biblioteci API JavaScript
description: O introducere în bibliotecile client JavaScript care vă permit să interacționaţi cu blockchain-ul din aplicația dvs.
lang: ro
---

Pentru ca o aplicație web să interacționeze cu blockchain-ul Ethereum (adică să citească datele blockchain-ului și/sau să trimită tranzacții către rețea), trebuie să se conecteze la un nod Ethereum.

În acest scop, fiecare client Ethereum implementează specificația [JSON-RPC](/developers/docs/apis/json-rpc/), astfel încât să existe un set uniform de [endpoint-uri](/developers/docs/apis/json-rpc/endpoints/) pe care se pot baza aplicațiile.

Dacă doriţi să utilizaţi JavaScript pentru a vă conecta la un nod Ethereum, puteţi să utilizaţi vanilla JavaScript, dar există mai multe biblioteci utile în ecosistem care facilitează mult acest lucru. Cu aceste biblioteci, programatorii pot scrie metode intuitive şi scurte pentru a inițializa cereri JSON RPC (în culise) care interacționează cu Ethereum.

## Condiții prealabile {#prerequisites}

Pe lângă înțelegerea JavaScript, ar putea fi util să înțelegeţi [stiva Ethereum](/developers/docs/ethereum-stack/) și [clienții Ethereum](/developers/docs/nodes-and-clients/).

## De ce să folosiţi o bibliotecă? {#why-use-a-library}

Aceste biblioteci elimină o mare parte din complexitatea interacțiunii directe cu un nod Ethereum. Ele oferă şi funcții utilitare (cum ar fi conversia din ETH în Gwei), astfel încât, ca programator, să petreceţi mai mult timp axându-vă pe funcționalitatea unică a aplicației dvs. decât încercând să vă descurcaţi cu complexitatea clienților Ethereum.

## Funcţionalităţile bibliotecilor {#library-features}

### Conectaţi-vă la nodurile Ethereum {#connect-to-ethereum-nodes}

Folosind furnizorii, aceste biblioteci vă permit să vă conectaţi la Ethereum și să-i citiţi datele, indiferent dacă este vorba de JSON-RPC, INFURA, Etherscan, Alchemy sau MetaMask.

**Exemplu în Ethers**

```js
// A Web3Provider wraps a standard Web3 provider, which is
// what MetaMask injects as window.ethereum into each page
const provider = new ethers.providers.Web3Provider(window.ethereum)

// The MetaMask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// Pentru aceasta, avem nevoie de semnatarul contului...
const signer = provider.getSigner()
```

**Exemplu Web3js**

```js
var web3 = new Web3("http://localhost:8545")
// sau
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// schimbare furnizor
web3.setProvider("ws://localhost:8546")
// sau
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// Utilizarea furnizorului IPC în node.js
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os path
// sau
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // calea mac os
// pe Windows calea este: "\\\\. \\ pipe \\ geth.ipc"
// pe linux calea este: "/users/myuser/.ethereum/geth.ipc"
```

După configurare, veţi putea interoga blockchain-ul pentru:

- numărul blocului
- estimările de gaz
- evenimentele din contractele inteligente
- id-ul rețelei
- și altele...

### Funcționalitatea de portofel {#wallet-functionality}

Aceste biblioteci vă oferă funcționalități pentru crearea portofelelor, gestionarea cheilor și semnarea tranzacțiilor.

Iată câteva exemple din Ethers

```js
// Creează o instanță de portofel dintr-un mnemonic...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromMnemonic(mnemonic)

// ...sau dintr-o cheie privată
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// Adresa ca o promisiune conform API-ului semnatar
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// O adresă portofel este de asemenea disponibilă sincron
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// Componentele criptografice interne
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// Mnemonica portofelului
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Notă: un portofel creat cu o cheie privată nu
//       are o mnemonică (derivarea îl împiedică)
walletPrivateKey.mnemonic
// null

// Semnarea unui mesaj
walletMnemonic.signMessage(„Salut la toată lumea”)
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// Semnarea unei tranzacții
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// Metoda de conectare returnează o nouă instanță a
// Wallet conectat la un furnizor
wallet = walletMnemonic.connect(provider)

// Interogarea rețelei
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// Trimiterea eterului
wallet.sendTransaction(tx)
```

[Citește specificațiile complete](https://docs.ethers.io/v5/api/signer/#Wallet)

Odată configurat veţi putea să:

- creaţi conturi
- trimiteţi tranzacții
- semnaţi tranzacții
- și altele...

### Interacționează cu funcțiile contractelor inteligente {#interact-with-smart-contract-functions}

JavaScript client libraries allow your application to call smart contract functions by reading the Application Binary Interface (ABI) of a compiled contract.

Interfața ABI explică în esență funcțiile contractului într-un format JSON și vă permite să îl utilizaţi ca obiect JavaScript normal.

Deci, următorul contract Solidity:

```solidity
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    function Test(uint testInt)  { a = testInt;}

    event Event(uint indexed b, bytes32 c);

    event Event2(uint indexed b, bytes32 c);

    function foo(uint b, bytes32 c) returns(address) {
        Event(b, c);
        return d;
    }
}
```

Ar avea drept rezultat următorul JSON:

```json
[{
    "type":"constructor",
    "payable":false,
    "stateMutability":"nonpayable"
    "inputs":[{"name":"testInt","type":"uint256"}],
  },{
    "type":"function",
    "name":"foo",
    "constant":false,
    "payable":false,
    "stateMutability":"nonpayable",
    "inputs":[{"name":"b","type":"uint256"}, {"name":"c","type":"bytes32"}],
    "outputs":[{"name":"","type":"address"}]
  },{
    "type":"event",
    "name":"Event",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"}, {"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
  },{
    "type":"event",
    "name":"Event2",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"},{"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
}]
```

Aceasta înseamnă că puteţi:

- trimite o tranzacție către contractul inteligent și îi puteţi executa metoda
- apela pentru estimarea gazului necesar execuției metodei atunci când va fi executată în EVM
- implementa un contract
- Și altele...

### Funcții utilitare {#utility-functions}

Funcțiile utilitare vă oferă comenzi rapide pe care să le aveţi la îndemână, ce facilitează construirea cu Ethereum.

Valorile ETH sunt în mod implicit în Wei. 1 ETH = 1.000.000.000.000.000.000 WEI – aceasta înseamnă că aveţi de-a face cu o mulțime de cifre! `web3.utils.toWei` convertește ether-ul în Wei pentru dvs.

Iar în ether-i arată așa:

```js
// Obține soldul unui cont (după adresă sau numele ENS)
balance = await provider.getBalance(„ethers.eth”)
// { BigNumber: "2337132817842795605" }

// Deseori va trebui să formatezi rezultatul pentru utilizatorul
// care preferă să vadă valori în eter (în loc de wei)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Funcții utilitare Web3js](https://docs.web3js.org/api/web3-utils)
- [Funcții utilitare Ethers](https://docs.ethers.io/v5/api/utils/)

## Biblioteci disponibile {#available-libraries}

**Web3.js -** **_API JavaScript Ethereum._**

- [Documentație](https://docs.web3js.org/)
- [GitHub](https://github.com/ethereum/web3.js/)

**Ethers.js -** **_Implementare completă de portofel Ethereum și utilitare în JavaScript și TypeScript._**

- [Documentație](https://docs.ethers.io/)
- [GitHub](https://github.com/ethers-io/ethers.js/)

**The Graph -** **_Un protocol de indexare a datelor Ethereum și IPFS și de interogare a acestora folosind GraphQL._**

- [The Graph](https://thegraph.com/)
- [Graph Explorer](https://thegraph.com/explorer/)
- [Documentație](https://thegraph.com/docs/)
- [GitHub](https://github.com/graphprotocol/)
- [Discord](https://thegraph.com/discord)

**light.js -** **_O bibliotecă JS reactivă la nivel înalt optimizată pentru clienții ușori._**

- [GitHub](https://github.com/openethereum/js-libs/tree/master/packages/light.js)

**Web3-wrapper -** **_Alternativă de script la Web3.js._**

- [Documentație](https://0x.org/docs/web3-wrapper#introduction)
- [GitHub](https://github.com/0xProject/0x-monorepo/tree/development/packages/web3-wrapper)

**Alchemyweb3 -** **_Wrapper în jurul Web3.js cu reîncercare automată și api-uri îmbunătățite._**

- [Documentație](https://docs.alchemy.com/reference/api-overview)
- [GitHub](https://github.com/alchemyplatform/alchemy-web3)

**Alchemy NFT API -** **_API for fetching NFT data, including ownership, metadata attributes and more._**

- [Documentație](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
- [GitHub](https://github.com/alchemyplatform/alchemy-web3)

## Referințe suplimentare {#further-reading}

_Cunoaşteţi o resursă comunitară care v-a ajutat? Editaţi această pagină și adăugaţi-o!_

## Subiecte corelate {#related-topics}

- [Noduri și clienți](/developers/docs/nodes-and-clients/)
- [Framework-uri de dezvoltare](/developers/docs/frameworks/)

## Tutoriale corelate {#related-tutorials}

- [Set up Web3js to use the Ethereum blockchain in JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Instructions for getting web3.js set up in your project._
- [Calling a smart contract from JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _- Folosind token-ul DAI, vedeți cum să apelați funcția contractelor folosind JavaScript._
- [Trimiterea de tranzacții folosind web3 și Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– Tutorial pas cu pas pentru trimiterea de tranzacții din backend._
