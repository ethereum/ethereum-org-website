---
title: "Waffle: Simularea dinamică și testarea apelurilor de contracte"
description: Tutorial Waffle avansat de folosire a simulării dinamice și testarea apelurilor de contracte
author: "Daniel Izdebski"
tags:
  - "waffle"
  - "contracte inteligente"
  - "solidity"
  - "testare"
  - "simulare"
skill: intermediate
lang: ro
published: 2020-11-14
---

## Care este obiectul acestui tutorial? {#what-is-this-tutorial-about}

În acest tutorial veți învăța:

- cum să utilizați simularea dinamică
- cum să testați interacțiunile dintre contractele inteligente

Ipoteze:

- știți deja cum să scrieți un contract inteligent simplu în `Solidity`
- știți cum să utilizați `JavaScript` și `TypeScript`
- ați parcurs alte tutoriale `Waffle` sau știți câte ceva despre acesta

## Simulare dinamică {#dynamic-mocking}

De ce este utilă simularea dinamică? Ei bine, ne permite să scriem teste unitare în loc de teste de integrare. Ce înseamnă aceasta? Înseamnă că nu trebuie să ne preocupăm de dependențele dintre contractele inteligente, astfel că le putem testa pe fiecare separat de celelalte. Permiteți-mi să vă arăt cum anume puteți face acest lucru.

### **1. Proiect** {#1-project}

Înainte de a începe, trebuie să pregătim un proiect simplu node.js:

```bash
$ mkdir dynamic-mocking
$ cd dynamic-mocking
$ mkdir contracts src

$ yarn init
# sau dacă utilizezi npm
$ npm init
```

Să începem adăugând typescript și testând dependențele - mocha & chai:

```bash
$ yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# sau dacă utilizezi npm
$ npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

Acum să adăugăm `Waffle` și `ether`-ul:

```bash
$ yarn add --dev ethereum-waffle ethers
# sau dacă utilizezi npm
$ npm install ethereum-waffle ethers --save-dev
```

Acum structura proiectului dvs. ar trebui să fie:

```
.
├── contracts
├── package.json
└── test
```

### **2. Contracte inteligente** {#2-smart-contract}

Pentru a începe simularea dinamică, avem nevoie de un contract inteligent cu dependențe. Nu vă faceți griji, vă ajutăm noi!

Iată un contract inteligent simplu scris în `Solidity` al cărui unic scop este să verificăm dacă suntem bogați. Acesta folosește tokenul ERC20 pentru a verifica dacă avem suficiente tokenuri. Să spunem că avem `./contracts/AmIRichAlready.sol`.

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

Deoarece vrem să folosim simularea dinamică, nu avem nevoie de întregul ERC20, de aceea folosim interfața IERC20 cu o singură funcție.

A venit momentul să construim acest contract! Pentru aceasta vom folosi `Waffle`. În primul rând, vom crea un fișier simplu de configurare `Waffle.json` care specifică opțiunile de compilare.

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

Acum suntem gata să construim contractul cu Waffle:

```bash
$ npx waffle
```

E simplu, nu? În directorul `build/` au apărut două fișiere corespunzătoare contractului și interfeței. Le vom folosi mai târziu pentru testare.

### **3. Testare** {#3-testing}

Să creăm un fișier numit `AmIRichAlready.test.ts` pentru a testa ca atare. În primul rând, trebuie să ne ocupăm de importuri. Vom avea nevoie de ele pentru mai târziu:

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

Cu excepția dependențelor JS, trebuie să importăm contractul și interfața pe are le-am construit:

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

Waffle folosește `chai` pentru testare. Cu toate acestea, înainte de a-l putea folosi, trebuie să injectăm validatori-matcher Waffle chiar în chai:

```typescript
use(solidity)
```

Trebuie să implementăm funcția `beforeEach()`, care va reseta starea contractului înainte de fiecare test. Să ne gândim mai întâi la ce ne trebuie acolo. Pentru a implementa un contract avem nevoie de două lucruri: (1) un portofel și (2) un contract ERC20 implementat pe care să îl transmitem ca argument pentru contractul `AmIRichAlready`.

În primul rând creăm un portofel:

```typescript
const [wallet] = new MockProvider().getWallets()
```

Apoi trebuie să implementăm un contract ERC20. Partea dificilă este că avem doar o interfață. Aici apare Waffle să ne salveze. Waffle are o funcție magică `deployMockContract ()` care creează un contract folosind doar _abi_-ul interfeței:

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

Acum, având portofelul și ERC20 implementate, putem continua implementând contractul ` AmIRichAlready`:

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

După toate acestea, am terminat cu funcția noastră `beforeEach()`. La acest moment fișierul dvs. `AmIRichAlready.test.ts` se prezintă astfel:

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

Să scriem primul test al contractului `AmIRichAlready`. Ce credeți că trebuie să testăm? Da, așa este! Trebuie să verificăm dacă ne-am îmbogățit :)

Dar stați puțin. Cum va ști contractul nostru simulat prin ce valori să răspundă? Nu am implementat nicio logică pentru funcția `balanceOf()`. Dar Waffle ne ajută din nou. Contractul nostru simulat comportă acum niște șmecherii:

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

Cunoscând acestea, ne putem scrie în sfârșit primul test:

```typescript
it("returnează fals dacă portofelul are mai puțin de 1000000 tokenuri", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Să descompunem acest test în mai multe părți:

1. Ne-am configurat contractul simulat ERC20 ca să răspundă întotdeauna prin soldul de 999999 de tokenuri.
2. Verificați dacă prin metoda `contract.check()` obțineți răspunsul `false`.

Suntem gata să dăm drumul fiarei:

![A trecut un test](test-one.png)

Deci a trecut cu bine testul, dar... mai sunt necesare ameliorări. Funcția `balanceOf()` va răspunde întotdeauna prin 99999. Se poate evita acest lucru dacă indicăm un portofel pentru care funcția trebuie să dea un răspuns - la fel ca un contract real:

```typescript
it("returnează fals dacă portofelul are mai puțin de 1000001 tokenuri", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Până acum am testat doar cazul în care nu suntem suficient de bogați. Să testăm și contrariul:

```typescript
it("returnează true dacă portofelul are cel puțin 1000001 tokenuri", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

Rulați testele...

![A trecut două teste](test-two.png)

...și iată! Contractul nostru pare să funcționeze cum trebuie :)

## Testarea apelurilor de contracte {#testing-contract-calls}

Să rezumăm ce am făcut până acum. Am testat funcționalitatea contractului nostru `AmIRichAlready` și se pare că funcționează corect. Asta înseamnă că am terminat, nu? Nu chiar! Waffle ne permite să mai testăm contractul. Dar cum anume? Ei bine, în arsenalul Waffle există doi validatori-matcher, `calledOnContract()` și `calledOnContractWith()`. Ei ne vor permite să verificăm dacă nu cumva contractul nostru a apelat contractul simulat ERC20. Iată un test simplu cu unul dintre acești validatori-matcher:

```typescript
it("contractul nostru este verificat dacă a apelat balanceOf pe tokenul ERC20", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

Putem merge chiar mai departe pentru a ameliora acest test cu celălalt validator-matcher despre care v-am vorbit:

```typescript
it("contractul nostru este verificat dacă a apelat balanceOf cu un anumit portofel pe tokenul ERC20", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

Să verificăm dacă testele sunt corecte:

![A trecut trei teste](test-three.png)

Super, a trecut cu verde toate testele.

Testarea apelurilor de contracte cu Waffle este foarte ușoară. Și iată ce este grozav în această privință. Acești validatori-matcher funcționează și cu contracte normale, și cu cele simulate! Aceasta deoarece Waffle înregistrează și filtrează apelurile EVM în loc să injecteze cod, ca în cazul bibliotecilor populare de testare pentru alte tehnologii.

## Linia de sosire {#the-finish-line}

Felicitări! Acum știți cum să folosiți Waffle pentru a testa în mod dinamic apelurile de contracte și contractele simulate. Există mult mai multe funcționalități interesante de descoperit. Vă recomandăm să studiați în profunzime documentația Waffle.

Documentația Waffle este disponibilă [aici](https://ethereum-waffle.readthedocs.io/).

Codul sursă pentru acest tutorial se află [aici](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls).

Alte tutoriale care vă pot interesa:

- [Testarea contractelor inteligente cu Waffle](/developers/tutorials/testing-smart-contract-with-waffle/)
