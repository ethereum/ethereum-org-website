---
title: "Waffle: Dynamisches Mocking und Testen von Vertragsaufrufen"
description: Erweitertes Waffle-Tutorial zur Verwendung von dynamischem Mocking und zum Testen von Vertragsaufrufen
author: "Daniel Izdebski"
tags:
  [
    "Waffle",
    "intelligente Verträge",
    "solidity",
    "testen",
    "mocking"
  ]
skill: intermediate
lang: de
published: 2020-11-14
---

## Worum geht es in diesem Tutorial? {#what-is-this-tutorial-about}

In diesem Tutorial lernst du, wie du:

- dynamisches Mocking verwendest
- Interaktionen zwischen Smart Contracts testest

Annahmen:

- du bereits weißt, wie man einen einfachen Smart Contract in `Solidity` schreibt
- du dich mit `JavaScript` und `TypeScript` auskennst
- du bereits andere `Waffle`-Tutorials durchgearbeitet hast oder dich ein wenig damit auskennst

## Dynamisches Mocking {#dynamic-mocking}

Warum ist dynamisches Mocking nützlich? Nun, es ermöglicht uns, Unit-Tests anstelle von Integrationstests zu schreiben. Was bedeutet das? Das bedeutet, dass wir uns nicht um die Abhängigkeiten von Smart Contracts kümmern müssen und sie so vollständig isoliert testen können. Ich zeige dir, wie genau du das machen kannst.

### **1. Projekt** {#1-project}

Bevor wir anfangen, müssen wir ein einfaches node.js-Projekt vorbereiten:

```bash
mkdir dynamic-mocking
cd dynamic-mocking
mkdir contracts src

yarn init
# oder wenn du npm verwendest
npm init
```

Fügen wir zunächst TypeScript und die Testabhängigkeiten – Mocha & Chai – hinzu:

```bash
yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# oder wenn du npm verwendest
npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

Fügen wir nun `Waffle` und `ethers` hinzu:

```bash
yarn add --dev ethereum-waffle ethers
# oder wenn du npm verwendest
npm install ethereum-waffle ethers --save-dev
```

Deine Projektstruktur sollte jetzt so aussehen:

```
.
├── contracts
├── package.json
└── test
```

### **2. Smart Contract** {#2-smart-contract}

Um mit dem dynamischen Mocking zu beginnen, benötigen wir einen Smart Contract mit Abhängigkeiten. Keine Sorge, darum habe ich mich schon gekümmert!

Hier ist ein einfacher Smart Contract in `Solidity`, dessen einziger Zweck es ist zu prüfen, ob wir reich sind. Er verwendet einen ERC20-Token, um zu prüfen, ob wir genügend Token haben. Füge ihn in `./contracts/AmIRichAlready.sol` ein.

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

Da wir dynamisches Mocking verwenden wollen, brauchen wir nicht den gesamten ERC20, deshalb verwenden wir das IERC20-Interface mit nur einer Funktion.

Es ist an der Zeit, diesen Contract zu bauen! Dafür verwenden wir `Waffle`. Zuerst erstellen wir eine einfache `waffle.json`-Konfigurationsdatei, die die Kompilierungsoptionen festlegt.

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

Jetzt sind wir bereit, den Contract mit Waffle zu bauen:

```bash
npx waffle
```

Einfach, oder? Im Ordner `build/` sind zwei Dateien erschienen, die dem Contract und dem Interface entsprechen. Wir werden sie später für Tests verwenden.

### **3. Tests** {#3-testing}

Erstellen wir eine Datei mit dem Namen `AmIRichAlready.test.ts` für die eigentlichen Tests. Zuerst müssen wir uns um die Importe kümmern. Wir werden sie später benötigen:

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

Außer den JS-Abhängigkeiten müssen wir unseren gebauten Contract und das Interface importieren:

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

Waffle verwendet `chai` für Tests. Bevor wir es jedoch verwenden können, müssen wir Waffles Matcher in chai selbst injizieren:

```typescript
use(solidity)
```

Wir müssen die Funktion `beforeEach()` implementieren, die den Zustand des Contracts vor jedem Test zurücksetzt. Überlegen wir uns zuerst, was wir dort brauchen. Um einen Contract bereitzustellen, brauchen wir zwei Dinge: eine Wallet und einen bereitgestellten ERC20-Contract, den wir als Argument an den `AmIRichAlready`-Contract übergeben.

Zuerst erstellen wir eine Wallet:

```typescript
const [wallet] = new MockProvider().getWallets()
```

Dann müssen wir einen ERC20-Contract bereitstellen. Hier kommt der knifflige Teil – wir haben nur ein Interface. An dieser Stelle kommt Waffle uns zu Hilfe. Waffle hat eine magische `deployMockContract()`-Funktion, die einen Contract ausschließlich mit dem _abi_ des Interface erstellt:

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

Mit der Wallet und dem bereitgestellten ERC20 können wir nun den `AmIRichAlready`-Contract bereitstellen:

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

Damit ist unsere `beforeEach()`-Funktion fertig. Bisher sollte deine `AmIRichAlready.test.ts`-Datei so aussehen:

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

Schreiben wir den ersten Test für den `AmIRichAlready`-Contract. Worum sollte es deiner Meinung nach in unserem Test gehen? Ja, du hast recht! Wir sollten prüfen, ob wir schon reich sind :)

Aber warte mal. Woher soll unser gemockter Contract wissen, welche Werte er zurückgeben soll? Wir haben keine Logik für die Funktion `balanceOf()` implementiert. Auch hier kann Waffle helfen. Unser gemockter Contract hat jetzt einige neue, schicke Funktionen:

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

Mit diesem Wissen können wir endlich unseren ersten Test schreiben:

```typescript
it("gibt „false“ zurück, wenn die Wallet weniger als 1.000.000 Token hat", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Lass uns diesen Test in seine Einzelteile zerlegen:

1. Wir stellen unseren Mock-ERC20-Contract so ein, dass er immer ein Guthaben von 999999 Token zurückgibt.
2. Wir prüfen, ob die `contract.check()`-Methode `false` zurückgibt.

Wir sind bereit, loszulegen:

![Ein Test erfolgreich](./test-one.png)

Der Test funktioniert also, aber... es gibt noch Raum für Verbesserungen. Die Funktion `balanceOf()` wird immer 99999 zurückgeben. Wir können es verbessern, indem wir eine Wallet angeben, für die die Funktion etwas zurückgeben soll – genau wie ein echter Contract:

```typescript
it("gibt „false“ zurück, wenn die Wallet weniger als 1.000.001 Token hat", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Bisher haben wir nur den Fall getestet, in dem wir nicht reich genug sind. Testen wir stattdessen das Gegenteil:

```typescript
it("gibt „true“ zurück, wenn die Wallet mindestens 1.000.001 Token hat", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

Du führst die Tests aus...

![Zwei Tests erfolgreich](test-two.png)

...und da ist es! Unser Contract scheint wie beabsichtigt zu funktionieren :)

## Testen von Vertragsaufrufen {#testing-contract-calls}

Fassen wir zusammen, was wir bisher gemacht haben. Wir haben die Funktionalität unseres `AmIRichAlready`-Contracts getestet und er scheint ordnungsgemäß zu funktionieren. Das heißt, wir sind fertig, oder? Nicht ganz! Mit Waffle können wir unseren Contract noch weiter testen. Aber wie genau? Nun, im Arsenal von Waffle gibt es die Matcher `calledOnContract()` und `calledOnContractWith()`. Sie ermöglichen es uns zu prüfen, ob unser Contract den ERC20-Mock-Contract aufgerufen hat. Hier ist ein einfacher Test mit einem dieser Matcher:

```typescript
it("prüft, ob der Contract balanceOf auf dem ERC20-Token aufgerufen hat", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

Wir können sogar noch weiter gehen und diesen Test mit dem anderen Matcher verbessern, von dem ich dir erzählt habe:

```typescript
it("prüft, ob der Contract balanceOf mit einer bestimmten Wallet auf dem ERC20-Token aufgerufen hat", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

Überprüfen wir, ob die Tests korrekt sind:

![Drei Tests erfolgreich](test-three.png)

Großartig, alle Tests sind grün.

Das Testen von Vertragsaufrufen mit Waffle ist super einfach. Und hier kommt der beste Teil. Diese Matcher funktionieren sowohl mit normalen als auch mit gemockten Contracts! Das liegt daran, dass Waffle EVM-Aufrufe aufzeichnet und filtert, anstatt Code zu injizieren, wie es bei beliebten Testbibliotheken für andere Technologien der Fall ist.

## Die Ziellinie {#the-finish-line}

Glückwunsch! Jetzt weißt du, wie du Waffle verwenden kannst, um Vertragsaufrufe zu testen und Contracts dynamisch zu mocken. Es gibt noch viel mehr interessante Funktionen zu entdecken. Ich empfehle, in die Dokumentation von Waffle einzutauchen.

Die Dokumentation von Waffle ist [hier](https://ethereum-waffle.readthedocs.io/) verfügbar.

Der Quellcode für dieses Tutorial findet sich [hier](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls).

Tutorials, die dich auch interessieren könnten:

- [Smart Contracts mit Waffle testen](/developers/tutorials/waffle-test-simple-smart-contract/)
