---
title: Biblioteci API JavaScript
description: O introducere în bibliotecile client JavaScript care îți permit să interacționezi cu blockchain-ul din aplicația ta.
lang: ro
sidebar: true
---

Pentru ca o aplicație web să interacționeze cu blockchain-ul Ethereum (adică să citească date blockchain și/sau să trimită tranzacții către rețea), trebuie să se conecteze la un nod Ethereum.

În acest scop, fiecare client Ethereum implementează specificația JSON-RPC, deci există un set uniform de puncte finale pe care se pot baza aplicațiile.

Dacă dorești să utilizezi JavaScript pentru a te conecta la un nod Ethereum, poți să utilizezi vanilla JavaScript, dar există mai multe biblioteci utile în ecosistem care fac acest lucru mult mai ușor. Cu aceste biblioteci, programatorii pot scrie metode intuitive, pe o singură linie, pentru a inițializa cereri JSON RPC (în culise) care interacționează cu Ethereum.

## Condiții prealabile {#prerequisites}

Pe lângă înțelegerea JavaScript, ar putea fi util să înțelegi [stiva Ethereum](/developers/docs/ethereum-stack/) și [clienții Ethereum](/developers/docs/nodes-and-clients/).

## De ce să folosești o bibliotecă? {#why-use-a-library}

Aceste biblioteci elimină o mare parte din complexitatea interacțiunii directe cu un nod Ethereum. Ele oferă, de asemenea, funcții utilitare (cum ar fi conversia din ETH în Gwei), astfel încât ca programator, să petreci mai mult timp cu funcționalitatea unică a aplicației tale decât cu complexitatea clienților Ethereum.

## Caracteristicile bibliotecii {#library-features}

### Conectează la nodurile Ethereum {#connect-to-ethereum-nodes}

Folosind furnizorii, aceste biblioteci îți permit să te conectezi la Ethereum și să-i citești datele, indiferent dacă este vorba de JSON-RPC, INFURA, Etherscan, Alchemy sau MetaMask.

**Exemplu de Ethers**

```js
// Un Web3Provider ce integrează un furnizor Web3 standard, care este
// ceea ce Metamask injectează ca window.ethereum în fiecare pagină
const provider = new ethers.providers.Web3Provider(window.ethereum)

// Plug-in-ul Metamask permite, în plus, semnarea de tranzacții pentru a
// trimite eter și a plătii pentru a schimba starea în cadrul blockchain-ului.
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

După configurare, vei putea interoga blockchain-ul pentru:

- numărul blocului
- estimări de gaz
- evenimente cu contractele inteligente
- id rețea
- și altele...

### Funcționalitate de portofel {#wallet-functionality}

Aceste biblioteci îți oferă funcționalități pentru crearea portofelelor, gestionarea cheilor și semnarea tranzacțiilor.

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

Odată configurat vei putea să:

- creezi conturi
- trimiți tranzacții
- semnezi tranzacții
- și altele...

### Interacționează cu funcțiile contractelor inteligente {#interact-with-smart-contract-functions}

Bibliotecile client JavaScript permit aplicației tale să apeleze funcții de contract inteligent citind interfața binară a aplicației (ABI) a unui contract compilat.

Interfața ABI explică în esență funcțiile contractului într-un format JSON și îți permite să îl utilizezi ca un obiect JavaScript normal.

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

Ar rezulta în următorul JSON:

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

Aceasta înseamnă că poți:

- Trimite o tranzacție către contractul inteligent și executa metoda acestuia
- Apela pentru estimarea gazului necesar execuției metodei atunci când va fi executat în EVM
- Implementa un contract
- Și altele...

### Funcții utilitare {#utility-functions}

Funcțiile utilitare îți oferă comenzi rapide la îndemână, care facilitează construirea cu Ethereum.

Valorile ETH sunt în mod implicit în Wei. 1 ETH = 1.000.000.000.000.000.000 WEI – asta înseamnă că ai de-a face cu o mulțime de numere! `web3.utils.toWei` convertește eterul în Wei pentru tine.

Iar în eteri arată așa:

```js
// Obține soldul unui cont (după adresă sau numele ENS)
balance = await provider.getBalance(„ethers.eth”)
// { BigNumber: "2337132817842795605" }

// Deseori va trebui să formatezi rezultatul pentru utilizatorul
// care preferă să vadă valori în eter (în loc de wei)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Funcții utilitare Web3js](https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html#)
- [Funcții utilitare Ethers](https://docs.ethers.io/v5/api/utils/)

## Biblioteci disponibile {#available-libraries}

**Web3.js -** **_API JavaScript Ethereum._**

- [Documentație](https://web3js.readthedocs.io/en/1.0/)
- [GitHub](https://github.com/ethereum/web3.js/)

**Ethers.js -** **_Implementare completă de portofel Ethereum și utilitare, în JavaScript și TypeScript._**

- [Documentație](https://docs.ethers.io/)
- [GitHub](https://github.com/ethers-io/ethers.js/)

**The Graph -** **_Un protocol de indexare a datelor Ethereum și IPFS și interogarea acestora folosind GraphQL._**

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

- [Documentație](https://docs.alchemyapi.io/documentation/alchemy-web3)
- [GitHub](https://github.com/alchemyplatform/alchemy-web3)

## Referințe suplimentare {#further-reading}

_Cunoști o resursă comunitară care te-a ajutat? Editează această pagină și adaug-o!_

## Subiecte corelate {#related-topics}

- [Noduri și clienți](/developers/docs/nodes-and-clients/)
- [Cadre de dezvoltare](/developers/docs/frameworks/)

## Tutoriale corelate {#related-tutorials}

- [Configurează Web3js pentru a utiliza blockchain-ul Ethereum în JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Instrucțiuni pentru configurarea web3.js în proiectul tău._
- [Apelarea unui contract inteligent din JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Folosind tokenuri DAI, vezi cum să apelezi funcții de contracte folosind JavaScript._
- [Trimiterea de tranzacții folosind web3 și Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– Tutorial pas cu pas pentru trimiterea de tranzacții din back-end._
