---
title: "Waffle: динамічне мокування та тестування викликів контрактів"
description: Розширений підручник з Waffle щодо використання динамічного мокування та тестування викликів контрактів
author: "Daniel Izdebski"
tags:
  [
    "waffle",
    "Смарт-контракти",
    "мова програмування",
    "тестування",
    "глузливий"
  ]
skill: intermediate
lang: uk
published: 2020-11-14
---

## Про що цей підручник? {#what-is-this-tutorial-about}

У цьому підручнику ви дізнаєтеся, як:

- використовувати динамічне мокування
- тестувати взаємодію між смарт-контрактами

Припущення:

- ви вже знаєте, як написати простий смарт-контракт на `Solidity`
- ви добре орієнтуєтеся в `JavaScript` та `TypeScript`
- ви пройшли інші підручники з `Waffle` або вже дещо про нього знаєте

## Динамічне мокування {#dynamic-mocking}

Чому динамічне мокування корисне? Ну, це дозволяє нам писати модульні тести замість інтеграційних тестів. Що це означає? Це означає, що нам не потрібно турбуватися про залежності смарт-контрактів, тому ми можемо тестувати їх усі в повній ізоляції. Дозвольте мені показати вам, як саме ви можете це зробити.

### **1. Проєкт** {#1-project}

Перш ніж розпочати, нам потрібно підготувати простий проєкт node.js:

```bash
mkdir dynamic-mocking
cd dynamic-mocking
mkdir contracts src

yarn init
# або якщо ви використовуєте npm
npm init
```

Почнімо з додавання `typescript` і тестових залежностей — `mocha` та `chai`:

```bash
yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# або якщо ви використовуєте npm
npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

Тепер додамо `Waffle` та `ethers`:

```bash
yarn add --dev ethereum-waffle ethers
# або якщо ви використовуєте npm
npm install ethereum-waffle ethers --save-dev
```

Тепер структура вашого проєкту має виглядати так:

```
.
├── contracts
├── package.json
└── test
```

### **2. Смарт-контракт** {#2-smart-contract}

Щоб розпочати динамічне мокування, нам потрібен смарт-контракт із залежностями. Не хвилюйтеся, я про все подбав!

Ось простий смарт-контракт, написаний на `Solidity`, єдина мета якого — перевірити, чи ми багаті. Він використовує токен ERC20, щоб перевірити, чи достатньо у нас токенів. Помістіть його в `./contracts/AmIRichAlready.sol`.

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

Оскільки ми хочемо використовувати динамічне мокування, нам не потрібен весь ERC20, тому ми використовуємо інтерфейс IERC20 лише з однією функцією.

Час зібрати цей контракт! Для цього ми будемо використовувати `Waffle`. Спочатку ми створимо простий конфігураційний файл `waffle.json`, який визначає параметри компіляції.

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

Тепер ми готові зібрати контракт за допомогою Waffle:

```bash
npx waffle
```

Легко, правда? У папці `build/` з'явилися два файли, що відповідають контракту та інтерфейсу. Ми будемо використовувати їх пізніше для тестування.

### **3. Тестування** {#3-testing}

Створімо файл під назвою `AmIRichAlready.test.ts` для фактичного тестування. Перш за все, нам потрібно налаштувати імпорти. Вони нам знадобляться пізніше:

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

Окрім залежностей JS, нам потрібно імпортувати наш зібраний контракт та інтерфейс:

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

`Waffle` використовує `chai` для тестування. Однак, перш ніж ми зможемо його використовувати, нам потрібно впровадити матчери `Waffle` у сам `chai`:

```typescript
use(solidity)
```

Нам потрібно реалізувати функцію `beforeEach()`, яка скидатиме стан контракту перед кожним тестом. Давайте спочатку подумаємо, що нам там потрібно. Щоб розгорнути контракт, нам потрібні дві речі: гаманець і розгорнутий контракт ERC20, щоб передати його як аргумент контракту `AmIRichAlready`.

Перш за все, ми створюємо гаманець:

```typescript
const [wallet] = new MockProvider().getWallets()
```

Тоді нам потрібно розгорнути контракт ERC20. Ось складна частина — у нас є лише інтерфейс. Саме тут `Waffle` приходить нам на допомогу. `Waffle` має магічну функцію `deployMockContract()`, яка створює контракт, використовуючи лише `_abi_` інтерфейсу:

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

Тепер, маючи і гаманець, і розгорнутий ERC20, ми можемо розгортати контракт `AmIRichAlready`:

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

На цьому наша функція `beforeEach()` готова. Поки що ваш файл `AmIRichAlready.test.ts` має виглядати так:

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

Напишімо перший тест для контракту `AmIRichAlready`. Як ви гадаєте, про що має бути наш тест? Так, ви маєте рацію! Ми повинні перевірити, чи ми вже багаті :)

Але почекайте секунду. Звідки наш змокований контракт знатиме, які значення повертати? Ми не реалізували жодної логіки для функції `balanceOf()`. Знову ж таки, `Waffle` може тут допомогти. Тепер наш змокований контракт має кілька нових цікавих можливостей:

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

Маючи ці знання, ми нарешті можемо написати наш перший тест:

```typescript
it("повертає false, якщо в гаманці менше ніж 1000000 токенів", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Розберемо цей тест по частинах:

1. Ми налаштували наш змокований контракт ERC20 так, щоб він завжди повертав баланс у 999999 токенів.
2. Перевірте, чи метод `contract.check()` повертає `false`.

Ми готові все запустити:

![Один пройдений тест](./test-one.png)

Отже, тест працює, але... ще є простір для вдосконалення. Функція `balanceOf()` завжди повертатиме 99999. Ми можемо покращити його, вказавши гаманець, для якого функція повинна щось повертати — так само, як справжній контракт:

```typescript
it("повертає false, якщо в гаманці менше ніж 1000001 токенів", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Досі ми тестували лише випадок, коли ми недостатньо багаті. Натомість протестуймо протилежний випадок:

```typescript
it("повертає true, якщо в гаманці є щонайменше 1000001 токенів", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

Ви запускаєте тести...

![Два пройдених тести](test-two.png)

...і готово! Здається, наш контракт працює належним чином :)

## Тестування викликів контрактів {#testing-contract-calls}

Підсумуймо, що ми вже зробили. Ми протестували функціонал нашого контракту `AmIRichAlready`, і він, здається, працює належним чином. Це означає, що ми закінчили, правда? Не зовсім! `Waffle` дозволяє нам протестувати наш контракт ще глибше. Але як саме? В арсеналі `Waffle` є матчери `calledOnContract()` і `calledOnContractWith()`. Вони дозволять нам перевірити, чи наш контракт викликав змокований контракт ERC20. Ось базовий тест з одним із цих матчерів:

```typescript
it("перевіряє, чи контракт викликав balanceOf для токена ERC20", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

Ми можемо піти ще далі й покращити цей тест за допомогою іншого матчера, про який я вам розповідав:

```typescript
it("перевіряє, чи контракт викликав balanceOf з певним гаманцем для токена ERC20", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

Давайте перевіримо, чи правильні тести:

![Три пройдених тести](test-three.png)

Чудово, всі тести зелені.

Тестувати виклики контрактів за допомогою `Waffle` дуже просто. І ось найкраща частина. Ці матчери працюють як зі звичайними, так і зі змокованими контрактами! Це тому, що `Waffle` записує та фільтрує виклики EVM, а не впроваджує код, як це відбувається в популярних бібліотеках тестування для інших технологій.

## Фінішна пряма {#the-finish-line}

Вітаємо! Тепер ви знаєте, як використовувати `Waffle` для тестування викликів контрактів і динамічного мокування контрактів. Є ще багато цікавих особливостей, які слід відкрити. Я рекомендую зануритися в документацію Waffle.

Документація `Waffle` доступна [тут](https://ethereum-waffle.readthedocs.io/).

Вихідний код для цього підручника можна знайти [тут](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls).

Підручники, які також можуть вас зацікавити:

- [Тестування смарт-контрактів за допомогою Waffle](/developers/tutorials/waffle-test-simple-smart-contract/)
