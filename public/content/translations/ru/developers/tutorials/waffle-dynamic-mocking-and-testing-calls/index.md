---
title: "Waffle: динамические макеты и тестирование вызовов контрактов"
description: "Расширенное руководство по Waffle: использование динамических макетов и тестирование вызовов контрактов"
author: "Daniel Izdebski"
tags:
  [
    "waffle",
    "Умные контракты",
    "твердость",
    "тестирование",
    "имитация"
  ]
skill: intermediate
lang: ru
published: 2020-11-14
---

## О чем это руководство? {#what-is-this-tutorial-about}

В этом руководстве вы узнаете, как:

- использовать динамическую имитацию
- тестировать взаимодействия между смарт-контрактами

Предположения:

- вы уже знаете, как написать простой смарт-контракт на `Solidity`
- вы разбираетесь в `JavaScript` и `TypeScript`
- вы уже проходили другие руководства по `Waffle` или кое-что о нем знаете

## Динамическая имитация {#dynamic-mocking}

Чем полезна динамическая имитация? Что ж, она позволяет нам писать модульные тесты вместо интеграционных. Что это дает? Это означает, что нам не нужно беспокоиться о зависимостях смарт-контрактов, поэтому мы можем тестировать каждый из них в полной изоляции. Позвольте мне показать вам, как именно это можно сделать.

### **1. Проект** {#1-project}

Прежде чем мы начнем, нам нужно подготовить простой проект на node.js:

```bash
mkdir dynamic-mocking
cd dynamic-mocking
mkdir contracts src

yarn init
# или если вы используете npm
npm init
```

Начнем с добавления typescript и зависимостей для тестирования — mocha и chai:

```bash
yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# или если вы используете npm
npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

Теперь добавим `Waffle` и `ethers`:

```bash
yarn add --dev ethereum-waffle ethers
# или если вы используете npm
npm install ethereum-waffle ethers --save-dev
```

Теперь структура вашего проекта должна выглядеть так:

```
.
├── contracts
├── package.json
└── test
```

### **2. Смарт-контракт** {#2-smart-contract}

Чтобы начать динамическую имитацию, нам понадобится смарт-контракт с зависимостями. Не волнуйтесь, я обо всем позаботился!

Вот простой смарт-контракт, написанный на `Solidity`, единственная цель которого — проверить, богаты ли мы. Он использует токен ERC20, чтобы проверить, достаточно ли у нас токенов. Поместите его в `./contracts/AmIRichAlready.sol`.

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

Поскольку мы хотим использовать динамическую имитацию, нам не нужен весь стандарт ERC20, поэтому мы используем интерфейс IERC20 только с одной функцией.

Пришло время собрать этот контракт! Для этого мы будем использовать `Waffle`. Сначала мы создадим простой файл конфигурации `waffle.json`, который определяет параметры компиляции.

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

Теперь мы готовы собрать контракт с помощью Waffle:

```bash
npx waffle
```

Легко, правда? В папке `build/` появились два файла, соответствующие контракту и интерфейсу. Мы будем использовать их позже для тестирования.

### **3. Тестирование** {#3-testing}

Давайте создадим файл с именем `AmIRichAlready.test.ts` для самого тестирования. Прежде всего, нам нужно разобраться с импортами. Они понадобятся нам позже:

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

Кроме JS-зависимостей, нам нужно импортировать наш собранный контракт и интерфейс:

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

`Waffle` использует `chai` для тестирования. Однако, прежде чем мы сможем его использовать, нам нужно внедрить матчеры Waffle в сам chai:

```typescript
use(solidity)
```

Нам нужно реализовать функцию `beforeEach()`, которая будет сбрасывать состояние контракта перед каждым тестом. Давайте сначала подумаем, что нам для этого понадобится. Чтобы развернуть контракт, нам понадобятся две вещи: кошелек и развернутый контракт ERC20, который мы передадим в качестве аргумента для контракта `AmIRichAlready`.

Сначала создадим кошелек:

```typescript
const [wallet] = new MockProvider().getWallets()
```

Затем нам нужно развернуть контракт ERC20. И вот тут начинается самое интересное — у нас есть только интерфейс. Именно здесь Waffle приходит нам на помощь. У Waffle есть волшебная функция `deployMockContract()`, которая создает контракт, используя только _abi_ интерфейса:

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

Теперь, имея и кошелек, и развернутый ERC20, мы можем приступить к развертыванию контракта `AmIRichAlready`:

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

На этом наша функция `beforeEach()` готова. На данный момент ваш файл `AmIRichAlready.test.ts` должен выглядеть следующим образом:

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

Давайте напишем первый тест для контракта `AmIRichAlready`. Как вы думаете, о чем должен быть наш тест? Да, вы правы! Мы должны проверить, богаты ли мы :)

Но подождите секунду. Откуда наш мок-контракт будет знать, какие значения возвращать? Мы не реализовали никакой логики для функции `balanceOf()`. И снова Waffle может нам помочь. У нашего мок-контракта теперь есть несколько новых интересных возможностей:

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

С этими знаниями мы наконец можем написать наш первый тест:

```typescript
it("возвращает false, если в кошельке меньше 1 000 000 токенов", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Давайте разберем этот тест по частям:

1. Мы настраиваем наш мок-контракт ERC20 так, чтобы он всегда возвращал баланс в 999 999 токенов.
2. Проверяем, возвращает ли метод `contract.check()` значение `false`.

Мы готовы его запустить:

![Один тест пройден](./test-one.png)

Итак, тест работает, но... есть еще что улучшить. Функция `balanceOf()` всегда будет возвращать 99 999. Мы можем улучшить его, указав кошелек, для которого функция должна что-то возвращать — как в настоящем контракте:

```typescript
it("возвращает false, если в кошельке меньше 1 000 001 токена", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

До сих пор мы тестировали только тот случай, когда мы недостаточно богаты. Давайте теперь протестируем обратный случай:

```typescript
it("возвращает true, если в кошельке есть как минимум 1 000 001 токен", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

Запускаем тесты...

![Два теста пройдены](test-two.png)

...и готово! Кажется, наш контракт работает, как и было задумано :)

## Тестирование вызовов контракта {#testing-contract-calls}

Давайте подведем итоги тому, что мы сделали до сих пор. Мы протестировали функциональность нашего контракта `AmIRichAlready`, и, похоже, он работает правильно. Это значит, что мы закончили, верно? Не совсем! Waffle позволяет нам протестировать наш контракт еще глубже. Но как именно? Что ж, в арсенале Waffle есть матчеры `calledOnContract()` и `calledOnContractWith()`. Они позволят нам проверить, вызывал ли наш контракт мок-контракт ERC20. Вот базовый тест с одним из этих матчеров:

```typescript
it("проверяет, вызывал ли контракт balanceOf для токена ERC20", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

Мы можем пойти еще дальше и улучшить этот тест с помощью другого матчера, о котором я вам говорил:

```typescript
it("проверяет, вызывал ли контракт balanceOf с определенным кошельком для токена ERC20", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

Давайте проверим, правильны ли тесты:

![Три теста пройдены](test-three.png)

Отлично, все тесты «зеленые».

Тестировать вызовы контрактов с помощью Waffle очень просто. И вот лучшая часть. Эти матчеры работают как с обычными, так и с мок-контрактами! Это потому, что Waffle записывает и фильтрует вызовы EVM, а не внедряет код, как это происходит в популярных библиотеках для тестирования в других технологиях.

## Финишная прямая {#the-finish-line}

Поздравляем! Теперь вы знаете, как использовать Waffle для динамического тестирования вызовов контрактов и их имитации. Есть еще много интересных возможностей, которые предстоит открыть. Рекомендую углубиться в документацию Waffle.

Документация Waffle доступна [здесь](https://ethereum-waffle.readthedocs.io/).

Исходный код для этого руководства можно найти [здесь](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls).

Руководства, которые также могут вас заинтересовать:

- [Тестирование смарт-контрактов с помощью Waffle](/developers/tutorials/waffle-test-simple-smart-contract/)
