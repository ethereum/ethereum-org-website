---
title: JavaScript API knihovny
description: "Úvod do JavaScriptových klientských knihoven, které umožňují interakci s blockchainem z vaší aplikace."
lang: cs
---

Aby mohla webová aplikace komunikovat s blockchainem Etherea (tj. číst data blockchainu a/nebo odesílat transakce do sítě), musí se připojit k uzlu Etherea.

Za tímto účelem každý klient Etherea implementuje specifikaci [JSON-RPC](/developers/docs/apis/json-rpc/), takže existuje jednotná sada [metod](/developers/docs/apis/json-rpc/#json-rpc-methods), na které se aplikace mohou spolehnout.

Pokud chcete pro připojení k síťovému uzlu na Ethereu použít JavaScript, je možné využít vanilla JavaScript, ale v rámci ekosystému existuje několik užitečných knihoven, které vám to značně usnadní. Pomocí těchto knihoven mohou vývojáři psát intuitivní jednořádkové metody pro inicializaci JSON-RPC požadavků, které komunikují s Ethereem.

Vezměte prosím na vědomí, že od [sloučení](/roadmap/merge/) jsou ke spuštění uzlu potřeba dva propojené softwarové programy pro Ethereum – exekuční klient a konsensuální klient. Ujistěte se, že váš síťový uzel obsahuje oba dva. Pokud váš uzel není na vašem místním počítači (např. běží na instanci AWS), aktualizujte podle toho IP adresy v tutoriálu. Další informace naleznete na naší stránce o [spuštění uzlu](/developers/docs/nodes-and-clients/run-a-node/).

## Předpoklady {#prerequisites}

Kromě znalosti JavaScriptu může být užitečné porozumět i [Ethereum stacku](/developers/docs/ethereum-stack/) a [klientům Etherea](/developers/docs/nodes-and-clients/).

## Proč používat knihovnu? {#why-use-a-library}

Knihovny snižují složitost přímé interakce se síťovým uzlem Etherea. Poskytují také užitečné funkce (např. převod ETH na Gwei), takže jako vývojář můžete strávit méně času řešením složitostí ethereových klientů a více času se věnovat jedinečným funkcím své aplikace.

## Funkce knihoven {#library-features}

### Připojení k uzlům Ethereum {#connect-to-ethereum-nodes}

Tyto knihovny vám pomocí poskytovatelů umožňují připojit se k Ethereu a číst jeho data, ať už prostřednictvím JSON-RPC, INFURY, Etherscanu, Alchemy nebo MetaMasku.

> **Varování:** Web3.js byl 4. března 2025 archivován. [Přečtěte si oznámení](https://blog.chainsafe.io/web3-js-sunset/). Pro nové projekty zvažte použití alternativních knihoven, jako jsou [ethers.js](https://ethers.org) nebo [viem](https://viem.sh).

**Příklad v ethers**

```js
// BrowserProvider obaluje standardního poskytovatele Web3, kterého
// MetaMask vkládá do každé stránky jako window.ethereum
const provider = new ethers.BrowserProvider(window.ethereum)

// Plugin MetaMask také umožňuje podepisovat transakce pro
// odesílání etheru a placení za změnu stavu v rámci blockchainu.
// K tomu potřebujeme podepisovatele účtu...
const signer = provider.getSigner()
```

**Příklad ve Web3js**

```js
var web3 = new Web3("http://localhost:8545")
// nebo
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// změna poskytovatele
web3.setProvider("ws://localhost:8546")
// nebo
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// Použití IPC poskytovatele v node.js
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // cesta na mac os
// nebo
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // cesta na mac os
// cesta na windows: "\\\\.\\pipe\\geth.ipc"
// cesta na linux: "/users/myuser/.ethereum/geth.ipc"
```

Po nastavení se budete moci dotazovat na blockchain na:

- čísla bloků
- odhady paliva
- události smart kontraktů
- id sítě
- a více...

### Funkce peněženky {#wallet-functionality}

Tyto knihovny poskytují funkce pro vytváření peněženek, správu klíčů a podepisování transakcí.

Zde jsou příklady z Ethers

```js
// Vytvoření instance peněženky z mnemonické fráze...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...nebo z privátního klíče
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// Adresa jako Promise podle Signer API
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// Adresa peněženky je také dostupná synchronně
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// Interní kryptografické komponenty
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// Mnemonic peněženky
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Poznámka: Peněženka vytvořená privátním klíčem nemá
//       mnemonic (odvození tomu brání)
walletPrivateKey.mnemonic
// null

// Podepisování zprávy
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// Podepisování transakce
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// Metoda connect vrací novou instanci
// Peněženky připojené k poskytovateli
wallet = walletMnemonic.connect(provider)

// Dotazování sítě
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// Odesílání etheru
wallet.sendTransaction(tx)
```

[Přečtěte si celou dokumentaci](https://docs.ethers.io/v5/api/signer/#Wallet)

Po nastavení budete moci:

- vytvářet účty
- odesílat transakce
- podepisovat transakce
- a více...

### Interakce s funkcemi chytrých kontraktů {#interact-with-smart-contract-functions}

Knihovny JavaScriptových klientů umožňují vaší aplikaci volat funkce smart kontraktů načtením aplikačního binárního rozhraní (ABI) zkompilovaného kontraktu.

ABI v podstatě vysvětluje funkce kontraktu ve formátu JSON a umožňuje jej používat jako běžný objekt JavaScriptu.

Takže následující kontrakt v Solidity:

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

Výsledekem by byl následující JSON:

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

To znamená, že můžete:

- Odeslat transakci do smart kontraktu a provést jeho metodu
- Zjistit odhad množství paliva, který spotřebuje vykonání metody při spuštění v EVM
- Nasadit kontrakt
- A další...

### Pomocné funkce {#utility-functions}

Tyto užitečné funkce poskytují praktické zkratky, které vám usnadní práci s Ethereem.

Hodnoty ETH jsou ve výchozím nastavení ve Wei. 1 ETH = 1 000 000 000 000 000 000 000 000 WEI - to znamená, že máte co do činění se spoustou čísel! `web3.utils.toWei` za vás převede ether na Wei.

A v etherech to vypadá následovně:

```js
// Získejte zůstatek na účtu (podle adresy nebo jména ENS).
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// Často bude potřeba formátovat výstup pro uživatele, 
// kteří preferují zobrazení hodnot v etherech (namísto ve wei)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Pomocné funkce Web3js](https://docs.web3js.org/api/web3-utils)
- [Pomocné funkce Ethers](https://docs.ethers.org/v6/api/utils/)

## Dostupné knihovny {#available-libraries}

**Web3.js –** **_JavaScriptové API pro Ethereum._**

- [Dokumentace](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js –** **_Kompletní implementace peněženky pro Ethereum a nástrojů v JavaScriptu a v TypeScriptu._**

- [Domovská stránka Ethers.js](https://ethers.org/)
- [Dokumentace](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph –** **_Protokol pro indexování dat Etherea a IPFS a dotazování na ně pomocí GraphQL._**

- [The Graph](https://thegraph.com)
- [Graph Explorer](https://thegraph.com/explorer)
- [Dokumentace](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK –** **_Wrapper nad Ethers.js s vylepšenými API._**

- [Dokumentace](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem –** **_TypeScript rozhraní pro Ethereum._**

- [Dokumentace](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Drift –** **_TypeScriptová meta-knihovna s vestavěným cachováním, hooky a testovacími mocky._**

- [Dokumentace](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## Další čtení {#further-reading}

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_

## Související témata {#related-topics}

- [Uzly a klienti](/developers/docs/nodes-and-clients/)
- [Vývojářské frameworky](/developers/docs/frameworks/)

## Související návody {#related-tutorials}

- [Nastavení Web3.js pro použití ethereového blockchainu v JavaScriptu](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Návod na nastavení web3.js ve vašem projektu._
- [Volání chytrých kontraktů z JavaScriptu](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Podívejte se, jak pomocí tokenu DAI volat funkce kontraktů v JavaScriptu._
- [Odesílání transakcí pomocí web3 a Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– Podrobný návod pro odesílání transakcí z backendu._
