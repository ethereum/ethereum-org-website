---
title: "Waffle: Dynamiczne tworzenie atrap i testowanie wywołań kontraktów"
description: "Zaawansowany samouczek Waffle dotyczący używania dynamicznego tworzenia atrap i testowania wywołań kontraktów"
author: "Daniel Izdebski"
tags:
  [
    "waffle",
    "smart kontrakty",
    "solidity",
    "testowanie",
    "tworzenie atrap"
  ]
skill: intermediate
lang: pl
published: 2020-11-14
---

## O czym jest ten samouczek? {#what-is-this-tutorial-about}

W tym samouczku dowiesz się, jak:

- używać dynamicznego tworzenia atrap
- testować interakcje między inteligentnymi kontraktami

Założenia:

- wiesz już, jak napisać prosty inteligentny kontrakt w `Solidity`
- znasz się na `JavaScript` i `TypeScript`
- masz za sobą inne samouczki `Waffle` lub wiesz już co nieco na ten temat

## Dynamiczne tworzenie atrap {#dynamic-mocking}

Dlaczego dynamiczne tworzenie atrap jest przydatne? Cóż, pozwala nam pisać testy jednostkowe zamiast testów integracyjnych. Co to oznacza? Oznacza to, że nie musimy się martwić o zależności inteligentnych kontraktów, dzięki czemu możemy je testować w całkowitej izolacji. Pokażę ci, jak dokładnie możesz to zrobić.

### \*\*1. **1. Projekt** {#1-project}

Zanim zaczniemy, musimy przygotować prosty projekt node.js:

```bash
mkdir dynamic-mocking
cd dynamic-mocking
mkdir contracts src

yarn init
# lub jeśli używasz npm
npm init
```

Zacznijmy od dodania zależności TypeScript i testowych – mocha i chai:

```bash
yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# lub jeśli używasz npm
npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

Teraz dodajmy `Waffle` i `ethers`:

```bash
yarn add --dev ethereum-waffle ethers
# lub jeśli używasz npm
npm install ethereum-waffle ethers --save-dev
```

Struktura twojego projektu powinna teraz wyglądać tak:

```
.
├── contracts
├── package.json
└── test
```

### \*\*2. **2. Inteligentny kontrakt** {#2-smart-contract}

Aby rozpocząć dynamiczne tworzenie atrap, potrzebujemy inteligentnego kontraktu z zależnościami. Nie martw się, zadbałem o to!

Oto prosty inteligentny kontrakt napisany w `Solidity`, którego jedynym celem jest sprawdzenie, czy jesteśmy bogaci. Używa tokena ERC20 do sprawdzenia, czy mamy wystarczającą liczbę tokenów. Umieść go w `./contracts/AmIRichAlready.sol`.

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

Ponieważ chcemy używać dynamicznego tworzenia atrap, nie potrzebujemy całego ERC20, dlatego używamy interfejsu IERC20 z tylko jedną funkcją.

Czas zbudować ten kontrakt! W tym celu użyjemy `Waffle`. Najpierw stworzymy prosty plik konfiguracyjny `waffle.json`, który określa opcje kompilacji.

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

Teraz jesteśmy gotowi, aby zbudować kontrakt za pomocą Waffle:

```bash
npx waffle
```

Proste, prawda? W folderze `build/` pojawiły się dwa pliki odpowiadające kontraktowi i interfejsowi. Użyjemy ich później do testowania.

### \*\*3. **3. Testowanie** {#3-testing}

Stwórzmy plik o nazwie `AmIRichAlready.test.ts` do właściwego testowania. Przede wszystkim musimy zająć się importami. Będziemy ich potrzebować później:

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

Oprócz zależności JS musimy zaimportować nasz zbudowany kontrakt i interfejs:

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

Waffle używa `chai` do testowania. Zanim jednak będziesz mógł go użyć, musimy wstrzyknąć matchery Waffle do samego `chai`:

```typescript
use(solidity)
```

Musimy zaimplementować funkcję `beforeEach()`, która zresetuje stan kontraktu przed każdym testem. Najpierw zastanówmy się, czego tam potrzebujemy. Aby wdrożyć kontrakt, potrzebujemy dwóch rzeczy: portfela i wdrożonego kontraktu ERC20, aby przekazać go jako argument do kontraktu `AmIRichAlready`.

Najpierw tworzymy portfel:

```typescript
const [wallet] = new MockProvider().getWallets()
```

Następnie musimy wdrożyć kontrakt ERC20. I tu jest haczyk – mamy tylko interfejs. I tu z pomocą przychodzi nam Waffle. Waffle ma magiczną funkcję `deployMockContract()`, która tworzy kontrakt, używając wyłącznie _abi_ interfejsu:

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

Mając portfel i wdrożony kontrakt ERC20, możemy przejść do wdrożenia kontraktu `AmIRichAlready`:

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

I to wszystko, nasza funkcja `beforeEach()` jest gotowa. Na tym etapie twój plik `AmIRichAlready.test.ts` powinien wyglądać tak:

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

Napiszmy pierwszy test dla kontraktu `AmIRichAlready`. Jak myślisz, czego powinien dotyczyć nasz test? Tak, masz rację! Powinniśmy sprawdzić, czy jesteśmy już bogaci :)

Ale chwila. Skąd nasz mockowany kontrakt będzie wiedział, jakie wartości zwrócić? Nie zaimplementowaliśmy żadnej logiki dla funkcji `balanceOf()`. I tu znowu z pomocą przychodzi Waffle. Nasz mockowany kontrakt ma teraz kilka nowych, fajnych dodatków:

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

Mając tę wiedzę, możemy wreszcie napisać nasz pierwszy test:

```typescript
it("zwraca false, jeśli portfel ma mniej niż 1 000 000 tokenów", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Podzielmy ten test na części:

1. Ustawiamy nasz mockowany kontrakt ERC20 tak, aby zawsze zwracał saldo 999 999 tokenów.
2. Sprawdzamy, czy metoda `contract.check()` zwraca `false`.

Jesteśmy gotowi, aby to odpalić:

![Jeden test przechodzi pomyślnie](./test-one.png)

Więc test działa, ale... wciąż jest pole do poprawy. Funkcja `balanceOf()` zawsze zwróci 99999. Możemy to ulepszyć, określając portfel, dla którego funkcja powinna coś zwrócić – tak jak w prawdziwym kontrakcie:

```typescript
it("zwraca false, jeśli portfel ma mniej niż 1 000 001 tokenów", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Do tej pory testowaliśmy tylko przypadek, w którym nie jesteśmy wystarczająco bogaci. Przetestujmy teraz odwrotną sytuację:

```typescript
it("zwraca true, jeśli portfel ma co najmniej 1 000 001 tokenów", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

Uruchamiasz testy...

![Dwa testy przechodzą pomyślnie](./test-two.png)

...i gotowe! Wygląda na to, że nasz kontrakt działa zgodnie z przeznaczeniem :)

## Testowanie wywołań kontraktów {#testing-contract-calls}

Podsumujmy, co do tej pory zrobiliśmy. Przetestowaliśmy funkcjonalność naszego kontraktu `AmIRichAlready` i wygląda na to, że działa on poprawnie. To znaczy, że skończyliśmy, prawda? Nie do końca! Waffle pozwala nam na jeszcze dokładniejsze przetestowanie naszego kontraktu. Ale jak dokładnie? Cóż, w arsenale Waffle'a znajdują się matchery `calledOnContract()` i `calledOnContractWith()`. Pozwolą nam one sprawdzić, czy nasz kontrakt wywołał mockowany kontrakt ERC20. Oto podstawowy test z jednym z tych matcherów:

```typescript
it("sprawdza, czy kontrakt wywołał balanceOf na tokenie ERC20", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

Możemy pójść o krok dalej i ulepszyć ten test za pomocą drugiego matchera, o którym ci mówiłem:

```typescript
it("sprawdza, czy kontrakt wywołał balanceOf z określonym portfelem na tokenie ERC20", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

Sprawdźmy, czy testy są poprawne:

![Trzy testy przechodzą pomyślnie](./test-three.png)

Świetnie, wszystkie testy przechodzą pomyślnie.

Testowanie wywołań kontraktów za pomocą Waffle jest superłatwe. A oto najlepsza część. Te matchery działają zarówno ze zwykłymi, jak i mockowanymi kontraktami! Dzieje się tak, ponieważ Waffle rejestruje i filtruje wywołania EVM, a nie wstrzykuje kod, jak ma to miejsce w przypadku popularnych bibliotek testowych dla innych technologii.

## Meta {#the-finish-line}

Gratulacje! Teraz już wiesz, jak używać Waffle do dynamicznego testowania wywołań kontraktów i mockowania kontraktów. Jest o wiele więcej interesujących funkcji do odkrycia. Polecam zagłębić się w dokumentację Waffle.

Dokumentacja Waffle jest dostępna [tutaj](https://ethereum-waffle.readthedocs.io/).

Kod źródłowy tego samouczka można znaleźć [tutaj](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls).

Samouczki, które mogą cię również zainteresować:

- [Testowanie inteligentnych kontraktów za pomocą Waffle](/developers/tutorials/waffle-test-simple-smart-contract/)
