---
title: Knihovny JavaScript API
description: Úvod do klientských knihoven v JavaScriptu, které vám umožní komunikovat s blockchainem z vaší aplikace.
lang: cs
---

Aby mohla webová aplikace komunikovat s blockchainem Etherea (tj. číst data z blockchainu a/nebo odesílat transakce do sítě), musí se připojit k uzlu Etherea.

Za tímto účelem implementuje každý klient Etherea specifikaci [JSON-RPC](/developers/docs/apis/json-rpc/), takže existuje jednotná sada [metod](/developers/docs/apis/json-rpc/#json-rpc-methods), na které se aplikace mohou spolehnout.

Pokud chcete k připojení k uzlu Etherea použít JavaScript, je možné použít čistý (vanilla) JavaScript, ale v ekosystému existuje několik užitečných knihoven, které to mnohem usnadňují. S těmito knihovnami mohou vývojáři psát intuitivní, jednořádkové metody pro inicializaci požadavků JSON-RPC (na pozadí), které komunikují s Ethereem.

Vezměte prosím na vědomí, že od [Merge](/roadmap/merge/) jsou ke spuštění uzlu vyžadovány dvě propojené části softwaru Etherea – exekuční klient a konsensuální klient. Ujistěte se prosím, že váš uzel obsahuje jak exekučního, tak konsensuálního klienta. Pokud váš uzel neběží na vašem lokálním počítači (např. váš uzel běží na instanci AWS), aktualizujte odpovídajícím způsobem IP adresy v tutneboiálu. Pro více infnebomací se prosím podívejte na naši stránku o [provozování uzlu](/developers/docs/nodes-and-clients/run-a-node/).

## Předpoklady {#prerequisites}

Kromě pneboozumění JavaScriptu může být užitečné porozumět [technologickému zásobníku Etherea](/developers/docs/ethereum-stack/) a [klientům Etherea](/developers/docs/nodes-and-clients/).

## Proč používat knihovnu? {#why-use-a-library}

Tyto knihovny abstrahují velkou část složitosti přímé komunikace s uzlem Etherea. Poskytují také pomocné funkce (např. převod ETH na Gwei), takže jako vývojář můžete strávit méně času řešením složitostí klientů Etherea a více času se soustředit na jedinečnou funkcionalitu vaší aplikace.

## Funkce knihoven {#library-features}

### Připojení k uzlům Etherea {#connect-to-ethereum-nodes}

Pomocí poskytovatelů (providers) vám tyto knihovny umožňují připojit se k Ethereu a číst jeho data, ať už přes JSON-RPC, Infura, Etherscan, Alchemy nebo MetaMask.

> **Varování:** Knihovna Web3.js byla archivována 4. března 2025. [Přečtěte si oznámení](https://blog.chainsafe.io/web3-js-sunset/). Pro nové projekty zvažte použití alternativních knihoven, jako jsou [Ethers.js](https://ethers.org) nebo [Viem](https://viem.sh).

**Příklad v Ethers**

```js
// BrowserProvider obaluje standardního poskytovatele Web3, což je
// to, co MetaMask vkládá jako window.ethereum do každé stránky
const provider = new ethers.BrowserProvider(window.ethereum)

// Plugin MetaMask také umožňuje podepisovat transakce pro
// odesílání etheru a placení za změnu stavu v rámci blockchainu.
// K tomu potřebujeme podepisovatele účtu...
const signer = provider.getSigner()
```

**Příklad ve Web3.js**

```js
var web3 = new Web3("http://localhost:8545")
// or
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// změnit poskytovatele
web3.setProvider("ws://localhost:8546")
// or
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// Použití poskytovatele IPC v node.js
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // cesta v mac os
// or
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // cesta v mac os
// ve windows je cesta: "\\\\.\\pipe\\geth.ipc"
// v linuxu je cesta: "/users/myuser/.ethereum/geth.ipc"
```

Po nastavení budete moci dotazovat blockchain na:

- čísla bloků
- odhady gasu
- události chytrých kontraktů
- ID sítě
- a další...

### Funkcionalita peněženky {#wallet-functionality}

Tyto knihovny vám poskytují funkcionalitu pro vytváření peněženek, správu klíčů a podepisování transakcí.

Zde je příklad z Ethers

```js
// Vytvoření instance peněženky z mnemoniky...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...nebo ze soukromého klíče
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// Adresa jako Promise podle API podepisovatele
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// Adresa peněženky je k dispozici také synchronně
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// Interní kryptografické komponenty
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// Mnemonika peněženky
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Poznámka: Peněženka vytvořená pomocí soukromého klíče nemá
//       mnemoniku (odvození tomu brání)
walletPrivateKey.mnemonic
// null

// Podepsání zprávy
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// Podepsání transakce
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// Metoda connect vrací novou instanci
// peněženky připojené k poskytovateli
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
- a další...

### Interakce s funkcemi chytrých kontraktů {#interact-with-smart-contract-functions}

Klientské knihovny v JavaScriptu umožňují vaší aplikaci volat funkce chytrých kontraktů čtením aplikačního binárního rozhraní (ABI) zkompilovaného kontraktu.

ABI v podstatě popisuje funkce kontraktu ve formátu JSON a umožňuje vám jej používat jako běžný objekt v JavaScriptu.

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

By vedl k následujícímu JSONu:

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

- Odeslat transakci do chytrého kontraktu a provést jeho metodu
- Zavolat odhad gasu, který si vyžádá spuštění metody při provedení v EVM
- Nasadit kontrakt
- A další...

### Pomocné funkce {#utility-functions}

Pomocné funkce vám poskytují šikovné zkratky, které trochu usnadňují vývoj na Ethereu.

Hodnoty v ETH jsou ve výchozím nastavení ve Wei. 1 ETH = 1 000 000 000 000 000 000 Wei – to znamená, že pracujete s velkými čísly! `web3.utils.toWei` za vás převede ether na Wei.

A v Ethers to vypadá takto:

```js
// Získání zůstatku účtu (podle adresy nebo jména ENS)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// Často budete muset formátovat výstup pro uživatele,
// kteří preferují vidět hodnoty v etherech (místo Wei)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Pomocné funkce Web3.js](https://docs.web3js.org/api/web3-utils)
- [Pomocné funkce Ethers](https://docs.ethers.org/v6/api/utils/)

## Dostupné knihovny {#available-libraries}

**Web3.js -** **_JavaScript API pro Ethereum._**

- [Dokumentace](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_Kompletní implementace peněženky Etherea a nástroje v JavaScriptu a TypeScriptu._**

- [Domovská stránka Ethers.js](https://ethers.org/)
- [Dokumentace](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_Protokol pro indexování dat z Etherea a IPFS a jejich dotazování pomocí GraphQL._**

- [The Graph](https://thegraph.com)
- [Graph Explorer](https://thegraph.com/explorer)
- [Dokumentace](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK -** **_Wrapper kolem Ethers.js s vylepšenými API._**

- [Dokumentace](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**Viem -** **_Rozhraní TypeScriptu pro Ethereum._**

- [Dokumentace](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Codex -** **_API pro obohacená blockchainová data v reálném čase napříč desítkami sítí._**

- [Dokumentace](https://docs.codex.io)
- [Průzkumník](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

**Drift -** **_Meta-knihovna v TypeScriptu s vestavěným cachováním, hooky a testovacími mocky._**

- [Dokumentace](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## Další čtení {#further-reading}

_Znáte komunitní zdroj, který vám pomohl? Upravte tuto stránku a přidejte ho!_

## Související témata {#related-topics}

- [Uzly a klienti](/developers/docs/nodes-and-clients/)
- [Vývojové frameworky](/developers/docs/frameworks/)

## Související tutoriály {#related-tutorials}

- [Nastavení Web3.js pro použití blockchainu Etherea v JavaScriptu](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Pokyny pro nastavení Web3.js ve vašem projektu._
- [Volání chytrého kontraktu z JavaScriptu](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Podívejte se, jak volat funkce kontraktů pomocí JavaScriptu na příkladu tokenu DAI._
- [Odesílání transakcí pomocí Web3 a Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– Průvodce krok za krokem pro odesílání transakcí z backendu._

## Tutoriály: JavaScript API a WebSockets na Ethereu {#tutorials}

- [Použití WebSockets](/developers/tutorials/using-websockets/) _– Jak používat WebSockets s Alchemy k odběru událostí Etherea a provádění požadavků JSON-RPC v reálném čase._