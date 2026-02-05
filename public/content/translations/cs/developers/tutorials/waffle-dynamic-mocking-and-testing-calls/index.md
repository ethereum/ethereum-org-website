---
title: "Waffle: Dynamické mockování a testování volání kontraktů"
description: "Pokročilý tutoriál pro Waffle o použití dynamického mockování a testování volání kontraktů"
author: "Daniel Izdebski"
tags:
  [
    "waffle",
    "smart kontrakt účty",
    "solidity",
    "testování",
    "mocking"
  ]
skill: intermediate
lang: cs
published: 2020-11-14
---

## O čem je tento tutoriál? {#what-is-this-tutorial-about}

V tomto tutoriálu se dozvíte, jak:

- používat dynamické mockování
- testovat interakce mezi chytrými kontrakty

Předpoklady:

- už umíte napsat jednoduchý chytrý kontrakt v `Solidity`
- orientujete se v `JavaScriptu` a `TypeScriptu`
- už jste absolvovali jiné tutoriály o `Waffle` nebo o něm už něco málo víte

## Dynamické mockování {#dynamic-mocking}

Proč je dynamické mockování užitečné? Umožňuje nám psát unit testy namísto integračních testů. Co to znamená? Znamená to, že se nemusíme starat o závislosti chytrých kontraktů, a tak je můžeme všechny testovat v naprosté izolaci. Dovolte mi, abych vám přesně ukázal, jak to můžete udělat.

### **1.** Projekt\*\* {#1-project}

Než začneme, musíme si připravit jednoduchý projekt node.js:

```bash
mkdir dynamic-mocking
cd dynamic-mocking
mkdir contracts src

yarn init
# nebo pokud používáte npm
npm init
```

Začněme přidáním závislostí pro typescript a testování - mocha & chai:

```bash
yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# nebo pokud používáte npm
npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

Nyní přidejme `Waffle` a `ethers`:

```bash
yarn add --dev ethereum-waffle ethers
# nebo pokud používáte npm
npm install ethereum-waffle ethers --save-dev
```

Struktura vašeho projektu by nyní měla vypadat takto:

```
.
├── contracts
├── package.json
└── test
```

### **2.** Chytrý kontrakt\*\* {#2-smart-contract}

Abychom mohli začít s dynamickým mockováním, potřebujeme chytrý kontrakt se závislostmi. Nebojte se, mám to pro vás připravené!

Zde je jednoduchý chytrý kontrakt napsaný v `Solidity`, jehož jediným účelem je zkontrolovat, zda jsme bohatí. Používá token ERC20 ke kontrole, zda máme dostatek tokenů. Vložte ho do `./contracts/AmIRichAlready.sol`.

```solidity
pragma solidity ^0.6.2;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract AmIRichAlready {
    IERC20 private tokenContract;
    uint public richness = 1000000 * 10 ** 18;

    constructor (IERC20 _tokenContract) public {
        tokenContract = _tokenContract;
    }

    function check() public view returns (bool) {
        uint balance = tokenContract.balanceOf(msg.sender);
        return balance > richness;
    }
}
```

Jelikož chceme použít dynamické mockování, nepotřebujeme celý ERC20, proto používáme rozhraní IERC20 s jedinou funkcí.

Je čas tento kontrakt sestavit! K tomu použijeme `Waffle`. Nejprve vytvoříme jednoduchý konfigurační soubor `waffle.json`, který specifikuje možnosti kompilace.

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

Nyní jsme připraveni sestavit kontrakt s Waffle:

```bash
npx waffle
```

Snadné, že? Ve složce `build/` se objevily dva soubory odpovídající kontraktu a rozhraní. Použijeme je později pro testování.

### **3.** Testování\*\* {#3-testing}

Vytvořme si soubor s názvem `AmIRichAlready.test.ts` pro samotné testování. Nejprve se musíme postarat o importy. Budeme je potřebovat později:

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"
```

Kromě závislostí JS musíme importovat náš sestavený kontrakt a rozhraní:

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

Waffle používá pro testování `chai`. Než ho však budeme moci použít, musíme do samotného chai vložit matchery od Waffle:

```typescript
use(solidity)
```

Musíme implementovat funkci `beforeEach()`, která obnoví stav kontraktu před každým testem. Nejdřív si rozmysleme, co tam budeme potřebovat. K nasazení kontraktu potřebujeme dvě věci: peněženku a nasazený kontrakt ERC20, který předáme jako argument kontraktu `AmIRichAlready`.

Nejprve si vytvoříme peněženku:

```typescript
const [wallet] = new MockProvider().getWallets()
```

Poté musíme nasadit kontrakt ERC20. Tady je ta záludná část – máme pouze rozhraní. Tohle je ta část, kde nás Waffle přichází zachránit. Waffle má kouzelnou funkci `deployMockContract()`, která vytváří kontrakt pouze pomocí _abi_ rozhraní:

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

Nyní s peněženkou i nasazeným ERC20 můžeme pokračovat a nasadit kontrakt `AmIRichAlready`:

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

Tím je naše funkce `beforeEach()` hotová. Váš soubor `AmIRichAlready.test.ts` by zatím měl vypadat takto:

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"

import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"

use(solidity)

describe("Am I Rich Already", () => {
  let mockERC20: Contract
  let contract: Contract
  let wallet: Wallet

  beforeEach(async () => {
    ;[wallet] = new MockProvider().getWallets()
    mockERC20 = await deployMockContract(wallet, IERC20.abi)
    contract = await deployContract(wallet, AmIRichAlready, [mockERC20.address])
  })
})
```

Napišme si první test pro kontrakt `AmIRichAlready`. Co myslíte, o čem by měl být náš test? Ano, máte pravdu! Měli bychom zkontrolovat, jestli už jsme bohatí :)

Ale počkejte chvilku. Jak bude náš mockovaný kontrakt vědět, jaké hodnoty má vrátit? Neimplementovali jsme žádnou logiku pro funkci `balanceOf()`. I zde může Waffle pomoci. Náš mockovaný kontrakt má teď několik nových vychytávek:

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

S touto znalostí můžeme konečně napsat náš první test:

```typescript
it("vrátí false, pokud má peněženka méně než 1000000 tokenů", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Rozdělme si tento test na části:

1. Nastavíme náš mock kontrakt ERC20, aby vždy vracel zůstatek 999999 tokenů.
2. Zkontrolujeme, zda metoda `contract.check()` vrací `false`.

Jsme připraveni to spustit:

![Jeden test prochází](./test-one.png)

Takže test funguje, ale... stále je co zlepšovat. Funkce `balanceOf()` bude vždy vracet 999999. Můžeme to vylepšit tím, že určíme peněženku, pro kterou by funkce měla něco vrátit – stejně jako u skutečného kontraktu:

```typescript
it("vrátí false, pokud má peněženka méně než 1000001 tokenů", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Zatím jsme testovali pouze případ, kdy nejsme dostatečně bohatí. Otestujme místo toho opak:

```typescript
it("vrátí true, pokud má peněženka alespoň 1000001 tokenů", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

Spustíte testy...

![Dva testy procházejí](test-two.png)

...a je to! Zdá se, že náš kontrakt funguje, jak má :)

## Testování volání kontraktů {#testing-contract-calls}

Pojďme si shrnout, co jsme dosud udělali. Otestovali jsme funkčnost našeho kontraktu `AmIRichAlready` a zdá se, že funguje správně. To znamená, že jsme hotovi, že? Ne tak docela! Waffle nám umožňuje testovat náš kontrakt ještě důkladněji. Ale jak přesně? V arzenálu Waffle jsou matchery `calledOnContract()` a `calledOnContractWith()`. Umožní nám zkontrolovat, zda náš kontrakt zavolal mock kontrakt ERC20. Zde je základní test s jedním z těchto matcherů:

```typescript
it("kontroluje, zda kontrakt zavolal balanceOf na tokenu ERC20", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

Můžeme jít ještě dál a vylepšit tento test s druhým matcherem, o kterém jsem vám říkal:

```typescript
it("kontroluje, zda kontrakt zavolal balanceOf s určitou peněženkou na tokenu ERC20", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

Zkontrolujme, zda jsou testy správné:

![Tři testy procházejí](test-three.png)

Skvělé, všechny testy jsou zelené.

Testování volání kontraktů s Waffle je super snadné. A tady je ta nejlepší část. Tyto matchery fungují jak s normálními, tak s mockovanými kontrakty! Je to proto, že Waffle zaznamenává a filtruje volání EVM, místo aby vkládal kód, jak je tomu u populárních testovacích knihoven pro jiné technologie.

## Cílová rovinka {#the-finish-line}

Výborně! Nyní víte, jak používat Waffle k testování volání kontraktů a dynamickému mockování kontraktů. Existuje mnohem více zajímavých funkcí k objevení. Doporučuji ponořit se do dokumentace Waffle.

Dokumentace Waffle je k dispozici [zde](https://ethereum-waffle.readthedocs.io/).

Zdrojový kód pro tento tutoriál naleznete [zde](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls).

Tutoriály, které by vás také mohly zajímat:

- [Testování chytrých kontraktů s Waffle](/developers/tutorials/waffle-test-simple-smart-contract/)
