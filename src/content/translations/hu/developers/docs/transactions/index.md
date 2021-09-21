---
title: Tranzakciók
description: Egy áttekintő az Ethereum tranzakciókról – hogyan működnek, az adatszerkezetük és hogyan lehet őket elküldeni egy alkalmazáson keresztül.
lang: hu
sidebar: true
---

A tranzakciók számlákból származó kriptográfiailag aláírt instrukciók. Egy számla tranzakciót indíthat, hogy frissítse az Ethereum hálózat állapotát. A legegyszerűbb tranzakció az ETH átutalása egyik számláról a másikra.

<!-- TODO explain these 2 types of transactions -->
<!-- There are two types of transactions: those which result in message calls and those which result in contract creation. -->
<!-- Contract creation results in the creation of a new contract account containing compiled smart contract bytecode. Whenever another account makes a message call to that contract, it executes its bytecode. -->

## Előfeltételek {#prerequisites}

Ennek az oldalnak a jobb megértése érdekében javasoljuk, hogy először olvasd el a [Számlák](/en/developers/docs/accounts/) és a [bevezetés az Ethereumba](/en/developers/docs/intro-to-ethereum/) című cikkeinket.

## Mi az a tranzakció? {#whats-a-transaction}

Az Ethereum tranzakció egy külső tulajdonú számla által kezdeményezett tevékenységre utal, más szóval egy számla, melyet egy ember kezel, nem pedig egy szerződés. Például ha Bob elküld Alice-nek 1 ETH-et, akkor Bob számláját terhelni kell, Alice számlájára pedig jóvá kell írni az összeget. Ez az állapotot megváltoztató művelet egy tranzakción belül történik.

![Egy diagram, mely egy tranzakciót ábrázol, ahogy az megváltoztatja az állapotot](./tx.png) _Diagram átvéve az [Ethereum EVM illusztrálva](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_ anyagból

A tranzakciókat, melyek megváltoztatják az EVM állapotát, a teljes hálózat számára közvetíteni kell. Bármely csomópont kérvényezheti egy tranzakció végrehajtását az EVM-en; miután ez megtörténik, egy bányász végrehajtja a tranzakciót és továbbterjeszti az eredményül kapott állapotot a hálózat többi része számára.

A tranzakcióknak van egy díja, és ki kell bányászni őket, hogy érvényessé váljanak. Hogy egyszerűbb legyen ez az áttekintő, a gáz díjak és a bányászat témaköröket máshol taglaljuk.

Az elküldött tranzakció a következő információkat tartalmazza:

- `recipient` – a fogadó cím (ha egy külső tulajdonú számla, akkor a tranzakció értéket továbbít. Ha egy szerződéses számla, akkor a tranzakció szerződés kódot fog végrehajtani)
- `signature` – a küldő azonosítója. Ez akkor jön létre, amikor a feladó privát kulcsa aláírja a tranzakciót, és megerősíti, hogy a küldő engedélyezte ezt a tranzakciót
- `value` – az átküldendő ETH mennyiség a küldőtől a címzettnek (WEI-ben, az ETH egységében megadva)
- `data` – opcionális mező tetszőleges adat megadására
- `gasLimit` – a maximális gáz egység, melyet a tranzakció elfogyaszthat. A gáz egységek számítási lépéseket reprezentálnak
- `gasPrice` – a díj, melyet a küldő fizet gáz egységenként

A gáz a bányász által a tranzakció feldolgozásához szükséges számításra utal. A felhasználóknak egy díjat kell fizetniük ezért a számításért. A `gasLimit` és a `gasPrice` meghatározza a bányásznak fizetett maximális tranzakciós díjat. [Többet a gázról](/en/developers/docs/gas/).

A tranzakció objektum nagyjából így néz ki:

```js
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  gasPrice: "200",
  nonce: "0",
  value: "10000000000",
}
```

De a tranzakció objektumot alá kell írni a küldő privát kulcsával. Ez bizonyítja, hogy a tranzakció kizárólag a küldőtől jöhetett és nem történt csalás.

Egy Ethereum kliens, mint a Geth, fogja kezelni az aláírási folyamatot.

Példa [JSON-RPC](https://eth.wiki/json-rpc/API) hívás:

```json
{
  "id": 2,
  "jsonrpc": "2.0",
  "method": "account_signTransaction",
  "params": [
    {
      "from": "0x1923f626bb8dc025849e00f99c25fe2b2f7fb0db",
      "gas": "0x55555",
      "gasPrice": "0x1234",
      "input": "0xabcd",
      "nonce": "0x0",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234"
    }
  ]
}
```

Példa válasz:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "raw": "0xf88380018203339407a565b7ed7d7a678680a4c162885bedbb695fe080a44401a6e4000000000000000000000000000000000000000000000000000000000000001226a0223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20ea02aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
    "tx": {
      "nonce": "0x0",
      "gasPrice": "0x1234",
      "gas": "0x55555",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234",
      "input": "0xabcd",
      "v": "0x26",
      "r": "0x223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20e",
      "s": "0x2aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
      "hash": "0xeba2df809e7a612a0a0d444ccfa5c839624bdc00dd29e3340d46df3870f8a30e"
    }
  }
}
```

- a `raw` az aláírt tranzakció rekurzív hosszúságú prefixumban (RLP) enkódolva
- a `tx` az aláírt tranzakció JSON-ban

A szignatúra hash-sel a tranzakcióról kriptográfiailag be lehet bizonyítani, hogy a küldőtől jött és továbbították a hálózatra.

### A gázról {#on-gas}

Ahogy korábban említettük, a tranzakciók [gáz](/developers/docs/gas/) költséget igényelnek a lefutáshoz. Egy egyszerű átutalás 21000 gáz egységet igényel.

Így ahhoz, hogy Bob 1 ETH-et küldjön Alice-nek 200 Gwei `gasPrice` értékkel, a következő díjat kell kifizetnie:

```
200*21000 = 4,200,000 GWEI
--vagy--
0.0042 ETH
```

Bob számláját **-1.0042 ETH** terhelés éri

Alice számlájára **+1.0 ETH**-et írnak jóvá

A bányász, aki feldolgozta a tranzakciót **+0.0042 ETH**-et fog kapni

Az okosszerződés interakciók is gázt igényelnek.

![Egy diagram, mely a fel nem használt gáz visszatérítését ábrázolja](./gas-tx.png) _Diagram átvéve az [Ethereum EVM illusztrálva](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_ anyagból

Minden fel nem használt gáz visszakerül a felhasználó számlájára.

## Tranzakció életciklus {#transaction-lifecycle}

Amikor elküld valaki egy tranzakciót, a következő történik:

1. Amikor elküldesz egy tranzakciót, egy kriptográfiai hash jön létre: `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. A tranzakciót ezután közvetítik a hálózatra, és sok más tranzakcióval rendelkező készletbe foglalják.
3. Egy bányásznak ki kell választania a tranzakciódat és belefoglalnia egy blokkba, hogy hitelesítse és "sikeresnek" minősítse.
   - Lehet, hogy ennél a résznél várnod kell, ha a hálózaton nagy a forgalom és a bányászok nem tudnak lépést tartani. A bányászok, mindig a nagyobb `GASPRICE` értékű tranzakciót veszik előre, mivel megtarthatják a tranzakciós díjakat.
4. A tranzakciód kap egy blokk megerősítési számot is. Ez azoknak a blokkoknak a mennyisége, melyek azután jöttek létre, miután te tranzakciódat blokkba foglalták. Minél nagyobb ez a szám, annál nagyobb bizonyossággal lehet kimondani, hogy a tranzakciót feldolgozták és a hálózat elismeri. Ez azért van, mert néha a blokk, mely befoglalja a tranzakciódat, nem mindig jut el a láncig.
   - Minél nagyobb a blokk megerősítési szám, annál nehezebb megváltoztatni a tranzakciót. Így nagyobb értékű tranzakcióknál, nagyobb blokk megerősítési szám az elvárt.

<!-- **State change**

FROM THE WHITEPAPER:

1. Check if the transaction is well-formed (ie. has the right number of values), the signature is valid, and the nonce matches the nonce in the sender's account. If not, return an error.
2. Calculate the transaction fee as `STARTGAS * GASPRICE`, and determine the sending address from the signature. Subtract the fee from the sender's account balance and increment the sender's nonce. If there is not enough balance to spend, return an error.
3. Initialize `GAS = STARTGAS`, and take off a certain quantity of gas per byte to pay for the bytes in the transaction.
4. Transfer the transaction value from the sender's account to the receiving account. If the receiving account does not yet exist, create it. If the receiving account is a contract, run the contract's code either to completion or until the execution runs out of gas.
5. If the value transfer failed because the sender did not have enough money, or the code execution ran out of gas, revert all state changes except the payment of the fees, and add the fees to the miner's account.
6. Otherwise, refund the fees for all remaining gas to the sender, and send the fees paid for gas consumed to the miner.
 -->
<!-- ## Failed transactions

A transaction can fail for a number of reasons:

- Not enough gas
  - The gas limit is too low
- Reverted -->

<!-- ## Messages

Messages are like transactions between contract accounts but they're not added to the blockchain. They allow smart contracts to call other contracts and trigger their execution.

FROM WHITEPAPER:

A message is produced when a contract currently executing code executes the `CALL` opcode, which produces and executes a message. Like a transaction, a message leads to the recipient account running its code. Thus, contracts can have relationships with other contracts in exactly the same way that external actors can.

@Sam Richards help me understand messages please :D

```
// FROM SOLIDITY DOCS
Contracts can call other contracts or send ether to non-contract accounts by the means of message calls. Message calls are similar to transactions, in that they have a source, a target, data payload, Ether, gas and return data. In fact, every transaction consists of a top-level message call which in turn can create further message calls.

A contract can decide how much of its remaining gas should be sent with the inner message call and how much it wants to retain. If an out-of-gas exception happens in the inner call (or any other exception), this will be signalled by an error value put onto the stack. In this case, only the gas sent together with the call is used up. In Solidity, the calling contract causes a manual exception by default in such situations, so that exceptions “bubble up” the call stack.

As already said, the called contract (which can be the same as the caller) will receive a freshly cleared instance of memory and has access to the call payload - which will be provided in a separate area called the calldata. After it has finished execution, it can return data which will be stored at a location in the caller’s memory preallocated by the caller.

Calls are limited to a depth of 1024, which means that for more complex operations, loops should be preferred over recursive calls.
```

<!-- Feels like this should maybe form a more advanced/complex doc that sits under transactions. Stuff like Ethers and providers need some sort of intro--><!-- ## How to send a transaction -->

<!-- `web3.eth.sendTransaction(transactionObject [, callback])` -->

<!-- Using Ethers and a provider... -->

<!-- ```js
// We require a provider to send transactions
let provider = ethers.getDefaultProvider()

let privateKey =
  "0x3141592653589793238462643383279502884197169399375105820974944592"
let wallet = new ethers.Wallet(privateKey, provider)

let amount = ethers.utils.parseEther("1.0")

let tx = {
  to: "0x88a5c2d9919e46f883eb62f7b8dd9d0cc45bc290",
  // ... or supports ENS names
  // to: "ricmoo.firefly.eth",

  // We must pass in the amount as wei (1 ether = 1e18 wei), so we
  // use this convenience function to convert ether to wei.
  value: ethers.utils.parseEther("1.0"),
}

let sendPromise = wallet.sendTransaction(tx)

sendPromise.then((tx) => {
  console.log(tx)
  // {
  //    // All transaction fields will be present
  //    "nonce", "gasLimit", "pasPrice", "to", "value", "data",
  //    "from", "hash", "r", "s", "v"
  // }
})
``` -->

<!-- **Transaction requests**

Ethers

```js
{
    // Required unless deploying a contract (in which case omit)
    to: addressOrName,  // the target address or ENS name

    // These are optional/meaningless for call and estimateGas
    nonce: 0,           // the transaction nonce
    gasLimit: 0,        // the maximum gas this transaction may spend
    gasPrice: 0,        // the price (in wei) per unit of gas

    // These are always optional (but for call, data is usually specified)
    data: "0x",         // extra data for the transaction, or input for call
    value: 0,           // the amount (in wei) this transaction is sending
    chainId: 3          // the network ID; usually added by a signer
}
``` -->
<!-- **Transaction response**

```js
{
    // Only available for mined transactions
    blockHash: "0x7f20ef60e9f91896b7ebb0962a18b8defb5e9074e62e1b6cde992648fe78794b",
    blockNumber: 3346463,
    timestamp: 1489440489,

    // Exactly one of these will be present (send vs. deploy contract)
    // They will always be a properly formatted checksum address
    creates: null,
    to: "0xc149Be1bcDFa69a94384b46A1F91350E5f81c1AB",

    // The transaction hash
    hash: "0xf517872f3c466c2e1520e35ad943d833fdca5a6739cfea9e686c4c1b3ab1022e",

    // See above "Transaction Requests" for details
    data: "0x",
    from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
    gasLimit: utils.bigNumberify("90000"),
    gasPrice: utils.bigNumberify("21488430592"),
    nonce: 0,
    value: utils.parseEther(1.0017071732629267),

    // The chain ID; 0 indicates replay-attack vulnerable
    // (eg. 1 = Homestead mainnet, 3 = Ropsten testnet)
    chainId: 1,

    // The signature of the transaction (TestRPC may fail to include these)
    r: "0x5b13ef45ce3faf69d1f40f9d15b0070cc9e2c92f3df79ad46d5b3226d7f3d1e8",
    s: "0x535236e497c59e3fba93b78e124305c7c9b20db0f8531b015066725e4bb31de6",
    v: 37,

    // The raw transaction (TestRPC may be missing this)
    raw: "0xf87083154262850500cf6e0083015f9094c149be1bcdfa69a94384b46a1f913" +
           "50e5f81c1ab880de6c75de74c236c8025a05b13ef45ce3faf69d1f40f9d15b0" +
           "070cc9e2c92f3df79ad46d5b3226d7f3d1e8a0535236e497c59e3fba93b78e1" +
           "24305c7c9b20db0f8531b015066725e4bb31de6"
}
``` --><!-- ## How are transactions protected/safe? -->

## Egy vizuális bemutató {#a-visual-demo}

Nézd meg, ahogy Austin átvezet a tranzakciókon, a gázon és a bányászaton. <iframe width="100%" height="315" src="https://www.youtube.com/embed/er-0ihqFQB0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

## További olvasnivaló {#further-reading}

_Ismersz olyan közösségi anyagot, amely segített neked? Módosítsd az oldalt és add hozzá!_

## Kapcsolódó témák {#related-topics}

- [Számlák](/en/developers/docs/accounts/)
- [Ethereum virtuális gép (EVM)](/en/developers/docs/evm/)
- [Üzemanyag](/en/developers/docs/gas/)
- [Bányászat](/en/developers/docs/consensus-mechanisms/pow/mining/)
