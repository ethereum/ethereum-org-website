---
title: JavaScript API könyvtárak
description: Bevezetés az JavaScript kliens könyvtárakba, melyek lehetővé teszik, hogy interakcióba lépj a blokklánccal az alkalmazásodban.
lang: hu
---

Ahhoz, hogy egy web alkalmazás interakcióba lépjen az Ethereum blokklánccal (vagyis képes legyen blokklánc adatok olvasására és/vagy tranzakció küldésre a hálózatra), rá kell csatlakoznia egy Ethereum csomópontra.

Erre a célra minden Ethereum-kliens implementálja a [JSON-RPC](/developers/docs/apis/json-rpc/) specifikációt, így egységes [módszerek](/developers/docs/apis/json-rpc/#json-rpc-methods) állnak rendelkezésre, amelyekre az alkalmazások támaszkodhatnak.

Ha JavaScript programnyelvet szeretne használni, hogy kapcsolódjon egy Ethereum csomóponthoz, lehetősége van vanilla JavaScriptet használni, de számos könyvtár létezik az ökoszisztémán belül, melyek megkönnyítik ezt. Ezekkel a könyvtárakkal a fejlesztők intuitív, egysoros metódusokat írhatnak, hogy kezdeményezzenek egy JSON RPC kérést (a háttérben), mely interakcióba lép az Ethereummal.

Az [egyesítés (Merge)](/roadmap/merge/) után, az Ethereum szoftver két kapcsolódó darabja – egy végrehajtó kliens és egy konszenzus kliens – kell a csomópont futtatásához. Gondoskodjon arról, hogy a csomópont mindkét kliens benne legyen. Ha a csomópont nem a helyi gépen van (pl. egy AWS-en fut), akkor az IP-címet frissíteni kell az útmutatóban. Bővebb információért érdemes felkeresni a [csomópont futtatása](/developers/docs/nodes-and-clients/run-a-node/) oldalt.

## Előfeltételek {#prerequisites}

A JavaScript megértése mellett lehet érdemes lehet előbb alaposan megismerni az [Ethereum stacket](/developers/docs/ethereum-stack/) és az [Ethereum-klienseket](/developers/docs/nodes-and-clients/).

## Miért használj könyvtárat? {#why-use-a-library}

Ezek a könyvtárak elveszik a komplexitás nagy részét, mely Ethereum csomóponthoz történő közvetlen csatlakozással jár. Ezen kívül használati függvényeket is szolgáltatnak (pl.: ETH konvertálása Gwei-be), így fejlesztőként kevesebb időt kell az Ethereum kliensek bonyodalmaival foglalkoznod és több időd jut egyedi funkcionalitást kialakítani az alkalmazásodnak.

## Könyvtár tulajdonságok {#library-features}

### Csatlakozás Ethereum csomóponthoz {#connect-to-ethereum-nodes}

Szolgáltatók használatakor ezen könyvtárak használatával rácsatlakozhat az Ethereumra és kiolvashatja az adatait, függetlenül attól, hogy JSON-RPC, INFURA, Etherscan, Alchemy vagy MetaMask rendszeren keresztül történik.

**Példa az Ethers-re**

```js
// Egy BrowserProvider bewrappol egy standard Web3 szolgáltatót, ez az
// amit a MetaMask beinjektál minden oldalra úgy mint, window.ethereum
const provider = new ethers.BrowserProvider(window.ethereum)

// A MetaMask plugin továbbá lehetővé teszi tranzakciók aláírását
// ether küldésekor és hogy kifizessük az állapotváltást a blokkláncon.
// Ehhez kell egy számla aláíró (account signer)...
const signer = provider.getSigner()
```

**Példa a Web3js-re**

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

Amint be van állítva, lekérdezéseket indíthat a blokkláncon a következőkre:

- blokkszámok
- gas becslések
- okosszerződés események (events)
- hálózati azonosító
- és még sok mást...

### Tárca funkcionalitás {#wallet-functionality}

Ezek a könyvtárak funkcionalitást adnak, hogy tárcákat hozzon létre, kulcsokat kezeljen és tranzakciókat írjon alá.

Íme egy példa az Ethers-re

```js
//Tárca instance létrehozása emlékeztető erősítőből...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...or from a private key
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// The address as a Promise per the Signer API
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// A Wallet address is also available synchronously
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// The internal cryptographic components
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// The wallet mnemonic
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Note: A wallet created with a private key does not
//       have a mnemonic (the derivation prevents it)
walletPrivateKey.mnemonic
// null

// Signing a message
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// Signing a transaction
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// The connect method returns a new instance of the
// Wallet connected to a provider
wallet = walletMnemonic.connect(provider)

// Querying the network
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// Sending ether
wallet.sendTransaction(tx)
```

[Olvassa el a teljes dokumentációt](https://docs.ethers.io/v5/api/signer/#Wallet)

Amint be van állítva, a következőket teheti:

- számlákat létrehozni
- tranzakciókat küldeni
- tranzakciókat aláírni
- és még sok mást...

### Interakció okosszerződés függvényekkel {#interact-with-smart-contract-functions}

A Javascript-kliens könyvtárai lehetővé teszik az alkalmazás számára, hogy okosszerződés-függvényeket hívjanak meg egy befordított szerződés Application Binary Interface-ének (ABI) olvasásával.

Az ABI lényegében elmagyarázza a szerződés függvényeit egy JSON formátumban és lehetővé teszi, hogy normális Javascript-objektumként használja.

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

Az ETH értékei alapvetően Wei-ben vannak megadva. 1 ETH = 1,000,000,000,000,000,000 WEI – ez azt jelenti, hogy sok számmal kell foglalkoznia! `web3.utils.toWei` átkonvertálja az ethert Wei-re.

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

- [Web3js használati függvények](https://docs.web3js.org/api/web3-utils)
- [Ethers használati függvények](https://docs.ethers.io/v5/api/utils/)

## Elérhető könyvtárak {#available-libraries}

**Web3.js -** **_Ethereum JavaScript API._**

- [Dokumentáció](https://docs.web3js.org/)
- [GitHub](https://github.com/ethereum/web3.js/)

**Ethers.js -** **_Teljes Ethereum-tárcaimplementáció és segédprogramok JavaScript-ben és TypeScript-ben._**

- [Dokumentáció](https://docs.ethers.io/)
- [GitHub](https://github.com/ethers-io/ethers.js/)

**The Graph -** **_Egy Ethereum- és IPFS-adatindexelési és -lekérdezési protokoll a GraphQL használatával._**

- [The Graph](https://thegraph.com/)
- [Graph Explorer](https://thegraph.com/explorer/)
- [Dokumentáció](https://thegraph.com/docs/)
- [GitHub](https://github.com/graphprotocol/)
- [Discord](https://thegraph.com/discord)

**light.js -** **_Egy magas szintű, reaktív JS könyvtár könnyű kliensekre optimalizálva._**

- [GitHub](https://github.com/openethereum/js-libs/tree/master/packages/light.js)

**Web3-wrapper -** **_A Typescript Web3.js alternatíva._**

- [Dokumentáció](https://0x.org/docs/web3-wrapper#introduction)
- [GitHub](https://github.com/0xProject/0x-monorepo/tree/development/packages/web3-wrapper)

**Alchemyweb3 -** **_Egy Web3.js wrapper automatikus újrapróbálkozásokkal és továbbfejlesztett API-kkal._**

- [Dokumentáció](https://docs.alchemy.com/reference/api-overview)
- [GitHub](https://github.com/alchemyplatform/alchemy-web3)

**Alchemy NFT API -** **_API az NFT adat megszerzésére, beleértve a tulajdonjogot, metaadatok attribútumait stb._**

- [Dokumentáció](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
- [GitHub](https://github.com/alchemyplatform/alchemy-web3)

**viem -** **_TypeScript-interfész az Ethereumra._**

- [Dokumentáció](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

## További olvasnivaló {#further-reading}

_Van olyan közösségi erőforrása, amely segített Önnek? Szerkessze ezt az oldalt, és adja hozzá!_

## Kapcsolódó témák {#related-topics}

- [ Csomópontok és kliensek](/developers/docs/nodes-and-clients/)
- [Fejlesztői keretrendszerek](/developers/docs/frameworks/)

## Kapcsolódó útmutatók {#related-tutorials}

- [Web3js beállítása az Ethereum-blokklánc használatához JavaScriptben](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Útmutató a web3.js projektben való beállításához.._
- [Okosszerződés hívása JavaScriptből](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– A DAI token használatával tekintse meg, hogyan hívhat be szerződéseket a JavaScript segítségével._
- [Tranzakció küldése web3-mal és Alchemy-vel](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– Egy részletes útmutató arról, hogyan lehet tranzakciókat küldeni a backendből._
