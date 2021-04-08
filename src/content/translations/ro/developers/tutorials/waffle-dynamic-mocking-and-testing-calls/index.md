---
title: "Waffle: Simularea dinamică și testarea apelurilor de contracte"
description: Tutorial Waffle avansat de folosire a simulării dinamice și testarea apelurilor de contract
author: "Daniel Izdebski"
tags: ["waffle", "contracte inteligente", "solidity", "testare", "simulare"]
skill: intermediar
lang: ro
sidebar: true
published: 2020-11-14
---

## Despre ce este acest tutorial? {#what-is-this-tutorial-about}

În acest tutorial vei învăța cum:

- să utilizezi simularea dinamică
- să testezi interacțiunile dintre contractele inteligente

Ipoteze:

- știi deja cum să scrii un simplu contract inteligent în `Solidity`
- te descurci în `JavaScript` și `TypeScript`
- ai terminat alte tutoriale `Waffle` sau știi un lucru sau două despre ele

## Simulare dinamică {#dynamic-mocking}

De ce este utilă simularea dinamică? Ei bine, ne permite să scriem teste unitare în loc de teste de integrare. Ce înseamnă aceasta? Înseamnă că nu trebuie să ne facem griji cu privire la dependențele contractelor inteligente, astfel că le putem testa pe toate în mod izolat. Permite-mi să-ți arăt exact cum o poți face.

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

Să începem cu adăugarea de typescript și dependențe de testare - mocha & chai:

```bash
$ yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# sau dacă utilizezi npm
$ npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

Acum să adăugăm `Waffle` și `eter`:

```bash
$ yarn add --dev ethereum-waffle ethers
# sau dacă utilizezi npm
$ npm install ethereum-waffle ethers --save-dev
```

Structura proiectului tău ar trebui să arate astfel:

```
.
├── contracts
├── package.json
└── test
```

### **2. Contracte inteligente** {#2-smart-contract}

Pentru a începe simularea dinamică, avem nevoie de un contract inteligent cu dependențe. Nu-ți face griji, ne-am ocupat noi!

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

Este timpul să construim acest contract! Pentru aceasta vom folosi `Waffle`. În primul rând, vom crea un fișier simplu de configurare `Waffle.json` care specifică opțiunile de compilare.

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

Simplu, nu? În directorul `build/` au apărut două fișiere corespunzătoare contractului și interfeței. Le vom folosi mai târziu pentru testare.

### **3. Testare** {#3-testing}

Să creăm un fișier numit `AmIRichAlready.test.ts` pentru actualul test. În primul rând, trebuie să ne ocupăm de importuri. Vom avea nevoie de ele pentru mai târziu:

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

Cu excepția dependențelor JS, trebuie să importăm contractul și interfața construită:

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

Waffle folosește `chai` pentru testare. Cu toate acestea, înainte de a-l putea folosi, trebuie să injectăm validatori-matcher Waffle chiar în chai:

```typescript
use(solidity)
```

Trebuie să implementăm funcția `beforeEach()` care va reseta starea contractului înainte de fiecare test. Să ne gândim mai întâi la ce avem nevoie acolo. Pentru a implementa un contract avem nevoie de două lucruri: (1) un portofel și (2) un contract ERC20 implementat pentru a-l transmite ca argument pentru contractul `AmIRichAlready`.

În primul rând creăm un portofel:

```typescript
const [wallet] = new MockProvider().getWallets()
```

Apoi, trebuie să implementăm un contract ERC20. Iată partea dificilă - avem doar o interfață. Aceasta este partea în care Waffle ne salvează. Waffle are o funcție magică `deployMockContract ()` care creează un contract folosind doar _abi_-ul interfeței:

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

Acum, având portofelul și ERC20 implementate, putem continua cu implementarea contractului` AmIRichAlready`:

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

Cu toate acestea, funcția noastră `beforeEach()` este terminată. Până acum fișierul tău `AmIRichAlready.test.ts` ar trebui să arate astfel:

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

Să scriem primul test la contractul `AmIRichAlready`. Despre ce crezi că ar trebui să fie testul nostru? Da, ai dreptate! Ar trebui să verificăm dacă suntem deja bogați :)

Dar așteaptă o secundă. Cum va ști contractul nostru simulat ce valori să returneze? Nu am implementat nicio logică pentru funcția `balanceOf()`. Din nou, Waffle poate fi de ajutor aici. Contractul nostru simulat are câteva lucruri noi sofisticate acum:

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

Cu aceste cunoștințe putem, în sfârșit, scrie primul nostru test:

```typescript
it("returnează fals dacă portofelul are mai puțin de 1000000 tokenuri", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Să descompunem acest test în părți:

1. Am stabilit contractul nostru fals ERC20 pentru a returna întotdeauna soldul de 999999 de tokenuri.
2. Am verificat dacă metoda `contract.check()` returnează `false`.

Suntem gata să dăm drumul fiarei:

![Un test care trece](../../../../../developers/tutorials/waffle-dynamic-mocking-and-testing-calls/test-one.png)

Deci, testul funcționează, dar... mai este loc pentru îmbunătățiri. Funcția `balanceOf()` va returna întotdeauna 99999. Putem îmbunătăți acest lucru prin specificarea unui portofel pentru care funcția ar trebui să returneze ceva - la del ca un contract real:

```typescript
it("returnează fals dacă portofelul are mai puțin de 1000001 tokenuri", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Până acum, am testat doar cazul în care nu suntem suficient de bogați. Să testăm opusul în schimb:

```typescript
it("returnează true dacă portofelul are cel puțin 1000001 tokenuri", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

Rulează testele...

![Două teste care trec](../../../../../developers/tutorials/waffle-dynamic-mocking-and-testing-calls/test-two.png)

...și iată! Contractul nostru pare să funcționeze conform scopului :)

## Testarea apelurilor de contracte {#testing-contract-calls}

Să rezumăm ce am făcut până acum. Am testat funcționalitatea contractului `AmIRichAlready` și se pare că funcționează corect. Asta înseamnă că am terminat, nu? Nu chiar! Waffle ne permite să testăm și mai mult contractul. Dar cum anume? Ei bine, în arsenalul Waffle există doi validatori-matcher `calledOnContract()` și `calledOnContractWith()`. Ei ne vor permite să verificăm dacă nu cumva contractul nostru a apelat contractul simulat ERC20. Iată un test de bază cu unul dintre acești validatori-matcher:

```typescript
it("contractul nostru este verificat dacă a apelat balanceOf pe tokenul ERC20", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

Putem merge chiar mai departe și putem îmbunătăți acest test cu celălalt validator-matcher de care am povestit:

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

![Trei teste care trec](../../../../../developers/tutorials/waffle-dynamic-mocking-and-testing-calls/test-three.png)

Super, toate testele sunt verzi.

Testarea apelurilor de contracte cu Waffle este foarte ușoară. Și aici e partea cea mai bună. Acești validatori-matcher funcționează cu contracte normale sau simulate! Aceasta deoarece Waffle înregistrează și filtrează apelurile EVM în loc să injecteze cod, ca în cazul bibliotecilor populare de testare pentru alte tehnologii.

## Linia de sosire {#the-finish-line}

Felicitări! Acum știi cum să folosești Waffle pentru a testa în mod dinamic apelurile de contracte și contractele simulate. Există mult mai multe caracteristici interesante de descoperit. Îți recomandăm să studiezi în detaliu documentația Waffle.

Documentația Waffle este disponibilă [aici](https://ethereum-waffle.readthedocs.io/).

Codul sursă pentru acest tutorial poate fi găsit [aici](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls).

Tutoriale care te pot interesa, de asemenea:

- [Testarea contractelor inteligente cu Waffle](/developers/tutorials/testing-smart-contract-with-waffle/)
