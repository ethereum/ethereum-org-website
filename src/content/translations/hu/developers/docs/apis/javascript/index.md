---
title: JavaScript API könyvtárak
description: Bevezetés az JavaScript kliens könyvtárakba, melyek lehetővé teszik, hogy interakcióba lépj a blokklánccal az alkalmazásodban.
lang: hu
---

Ahhoz, hogy egy web alkalmazás interakcióba lépjen az Ethereum blokklánccal (vagyis képes legyen blokklánc adatok olvasására és/vagy tranzakció küldésre a hálózatra), rá kell csatlakoznia egy Ethereum csomópontra.

Erre a célra minden Ethereum kliens implementálja a JSON-RPC specifikációt, így egy egységes végpontkészlet áll rendelkezésre, amelyekre az alkalmazások támaszkodhatnak.

Ha JavaScript programnyelvet szeretnél használni, hogy csatlakozz egy Ethereum csomóponttal, lehetőséged van vanilla JavaScriptet használni, de ugyanakkor számos kényelmes könyvtár létezik az ökoszisztémán belül, melyek megkönnyítik ezt. Ezekkel a könyvtárakkal a fejlesztők intuitív, egysoros metódusokat írhatnak, hogy kezdeményezzenek egy JSON RPC kérést (a háttérben), mely interakcióba lép az Ethereummal.

## Előfeltételek {#prerequisites}

A JavaScript megértése mellett lehet, hogy érdemes megérteni az [Ethereum stacket](/developers/docs/ethereum-stack/) és az [Ethereum klienseket](/developers/docs/nodes-and-clients/).

## Miért használj könyvtárat? {#why-use-a-library}

Ezek a könyvtárak elveszik a komplexitás nagy részét, mely Ethereum csomóponthoz történő közvetlen csatlakozással jár. Ezenkívül használati függvényeket is szolgáltatnak (pl.: ETH konvertálása Gwei-be), így fejlesztőként kevesebb időt kell az Ethereum kliensek bonyodalmaival foglalkoznod és több időd jut egyedi funkcionalitást kialakítani az alkalmazásodnak.

## Könyvtár tulajdonságok {#library-features}

### Csatlakozás Ethereum csomóponthoz {#connect-to-ethereum-nodes}

Szolgáltatók használatakor ezen könyvtárak használatával rácsatlakozhatsz az Ethereumra és olvashatod az adatait, legyen az JSON-RPC-n, INFURA-n, Etherscan-en, Alchemy-n vagy MetaMaskon keresztül.

**Ethers példa**

```js
// Egy Web3Provider bewrappol egy standard Web3 szolgáltatót, ez az
// amit a MetaMask beinjektál minden oldalra úgy mint, window.ethereum
const provider = new ethers.providers.Web3Provider(window.ethereum)

// A MetaMask plugin továbbá lehetővé teszi tranzakciók aláírását
// ether küldésekor és hogy kifizessük az állapotváltást a blokkláncon.
// Ehhez kell egy számla aláíró (account signer)...
const signer = provider.getSigner()
```

**Web3js példa**

```js
var web3 = new Web3("http://localhost:8545")
// vagy
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// szolgáltató (provider) váltás
web3.setProvider("ws://localhost:8546")
// vagy
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// IPC provider használata a node.js-ben
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os path
// vagy
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // mac os elérési út
// windows rendszerben az elérési út: "\\\\.\\pipe\\geth.ipc"
// linux rendszerben az elérési út: "/users/myuser/.ethereum/geth.ipc"
```

Amint be van állítva, lekérdezéseket indíthatsz a blokkláncon a következőkre:

- blokkszámok
- gas becslések
- okosszerződés események (events)
- hálózati azonosító
- és még sok mást...

### Tárca funkcionalitás {#wallet-functionality}

Ezek a könyvtárak funkcionalitást adnak, hogy tárcákat hozz létre, kulcsokat kezelj és tranzakciókat írj alá.

Itt egy Ethers példa

```js
//Tárca instance létrehozása emlékeztető erősítőből...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromMnemonic(mnemonic)

// ...vagy egy privát kulcsból
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// A cím mint egy promise a Signer API szerint
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// a tárca cím szinkronban is elérhető
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// A belső kriptográfiai komponensek
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// A tárca emlékeztető erősítő
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Megjegyzés: Egy privát kulcsból készített tárcának
//      nincs emlékeztető erősítője (a származtatás megakadályozza)
walletPrivateKey.mnemonic
// null

// Üzenet aláírása
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// Tranzakció aláírása
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// A connect metódus egy új tárca instance-t ad vissza
// Tárca csatlakoztatva a szolgáltatóval (provider)
wallet = walletMnemonic.connect(provider)

// Lekérdezés a hálózaton
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// Ether küldés
wallet.sendTransaction(tx)
```

[Olvasd el a teljes dokumentációt](https://docs.ethers.io/v5/api/signer/#Wallet)

Ha be van állítva, akkor már tudsz:

- számlákat létrehozni
- tranzakciókat küldeni
- tranzakciókat aláírni
- és még sok mást...

### Interakció okosszerződés függvényekkel {#interact-with-smart-contract-functions}

A JavaScript kliens könyvtárak lehetővé teszik az alkalmazásod számára, hogy okosszerződés függvényeket hívjanak meg egy befordított szerződés Application Binary Interface-ének (ABI) olvasásával.

Az ABI lényegében elmagyarázza a szerződés függvényeit egy JSON formátumban és lehetővé teszi, hogy normáls JavaScript objectként használd.

A következő Solidity szerződés tehát:

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

A következő JSON-t adná:

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

Ez azt jelenti, hogy:

- Tranzakciókat küldhetsz az okosszerződésnek és végrehajthatod a metódusát
- Megbecsülheted a gast, melyet egy metódus végrehajtás fog használni, amikor lefut az EVM-en
- Telepíthetsz egy szerződést
- És még sok mást...

### Használati függvények {#utility-functions}

A használati függvények praktikus könnyítéseke adnak, hogy egyszerűbb legyen az Ethereumon való építés.

Az ETH értékei alapvetően Wei-ben vannak megadva. 1 ETH = 1,000,000,000,000,000,000 WEI – ez azt jelenti, hogy sok számmal kell foglalkoznod! `web3.utils.toWei` átkonvertálja az ethert Wei-re neked.

Az ethers-ben így néz ki:

```js
// Egy számla egyenlege (cím vagy ENS név alapján)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// Gyakran formáznod kell a kimenetet a felhasználó számára
// aki etherben szeretné látni az értéket (wei helyett)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Web3js használati függvények](https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html#)
- [Ethers használati függvények](https://docs.ethers.io/v5/api/utils/)

## Elérhető könyvtárak {#available-libraries}

**Web3.js -** **_Ethereum JavaScript API._**

- [Dokumentáció](https://web3js.readthedocs.io/en/1.0/)
- [GitHub](https://github.com/ethereum/web3.js/)

**Ethers.js -** **_Teljes Ethereum tárca implementáció és segédprogramok JavaScript-ben és TypeScript-ben._**

- [Dokumentáció](https://docs.ethers.io/ethers.js/html/)
- [GitHub](https://github.com/ethers-io/ethers.js/)

**The Graph -** **_Egy Ethereum és IPFS adat indexelés és lekérdezés protokoll a GraphQL használatával.._**

- [The Graph](https://thegraph.com/)
- [Graph Explorer](https://thegraph.com/explorer/)
- [Dokumentáció](https://thegraph.com/docs/)
- [GitHub](https://github.com/graphprotocol/)
- [Discord](https://thegraph.com/discord)

**light.js -** **_Egy magas szintű, reaktív JS könyvtár light client-ekre optimalizálva._**

- [GitHub](https://github.com/openethereum/js-libs/tree/master/packages/light.js)

**Web3-wrapper -** **_Typescript Web3.js alternatíva._**

- [Dokumentáció](https://0x.org/docs/web3-wrapper#introduction)
- [GitHub](https://github.com/0xProject/0x-monorepo/tree/development/packages/web3-wrapper)

**Alchemyweb3 -** **_Egy Web3.js wrapper automatikus újrapróbálkozásokkal és fejlesztett API-okkal._**

- [Dokumentáció](https://docs.alchemy.com/reference/api-overview)
- [GitHub](https://github.com/alchemyplatform/alchemy-web3)

## További olvasnivaló {#further-reading}

_Ismersz olyan közösségi anyagot, mely segített neked? Módosítsd az oldalt és add hozzá!_

## Kapcsolódó témák {#related-topics}

- [Csomópontok és kliensek](/developers/docs/nodes-and-clients/)
- [Fejlesztői keretrendszerek](/developers/docs/frameworks/)

## Kapcsolódó útmutatók {#related-tutorials}

- [Állítsd be a Web3js, hogy JavaScriptben használd az Ethereum blokkláncot](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Instrukciók arról, hogyan állítsd be a web3.js-t a projektedben._
- [Okosszerződés hívása JavaScriptből](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– A DAI token használata, hogy lásd hogyan lehet szerződés függvényeket meghívni JavaScript használatával._
- [Tranzakció küldés web3-mal és Alchemy-vel](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– Egy step-by-step útmutató arról, hogyan lehet tranzakciókat küldeni a backendből._
