---
title: "Тестирование простого умного контракта с помощью библиотеки Waffle"
description: "Руководство для начинающих"
author: Ewa Kowalska
tags:
  [
    "Умные контракты",
    "твердость",
    "Waffle",
    "тестирование"
  ]
skill: beginner
lang: ru
published: 2021-02-26
---

## В этом руководстве вы узнаете, как {#in-this-tutorial-youll-learn-how-to}

- Протестировать изменения баланса кошелька
- Протестировать генерацию событий с указанными аргументами
- Убедиться, что транзакция была отменена

## Предположения {#assumptions}

- Вы можете создать новый проект на JavaScript или TypeScript
- У вас есть некоторый базовый опыт работы с тестами в JavaScript
- Вы использовали менеджеры пакетов, такие как yarn или npm
- Вы обладаете базовыми знаниями об умных контрактах и Solidity

## Начало работы {#getting-started}

В руководстве демонстрируется настройка и запуск тестов с использованием yarn, но если вы предпочитаете npm, это не проблема — я предоставлю соответствующие ссылки на официальную [документацию](https://ethereum-waffle.readthedocs.io/en/latest/index.html) Waffle.

## Установка зависимостей {#install-dependencies}

[Добавьте](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation) зависимости ethereum-waffle и typescript в dev-зависимости вашего проекта.

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## Пример умного контракта {#example-smart-contract}

В ходе этого руководства мы будем работать с простым примером умного контракта — EtherSplitter. Он делает не так много, кроме как позволяет любому отправить некоторое количество wei и разделить их поровну между двумя заранее определенными получателями.
Функция split требует, чтобы количество wei было четным, в противном случае она будет отменена. Для обоих получателей выполняется перевод wei, за которым следует генерация события Transfer.

Поместите фрагмент кода EtherSplitter в `src/EtherSplitter.sol`.

```solidity
pragma solidity ^0.6.0;

contract EtherSplitter {
    address payable receiver1;
    address payable receiver2;

    event Transfer(address from, address to, uint256 amount);

    constructor(address payable _address1, address payable _address2) public {
        receiver1 = _address1;
        receiver2 = _address2;
    }

    function split() public payable {
        require(msg.value % 2 == 0, 'Uneven wei amount not allowed');
        receiver1.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver1, msg.value / 2);
        receiver2.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver2, msg.value / 2);
    }
}
```

## Скомпилируйте контракт {#compile-the-contract}

Чтобы [скомпилировать](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#compiling-the-contract) контракт, добавьте следующую запись в файл package.json:

```json
"scripts": {
    "build": "waffle"
  }
```

Затем создайте файл конфигурации Waffle в корневом каталоге проекта — `waffle.json` — и вставьте туда следующую конфигурацию:

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```

Запустите `yarn build`. В результате появится каталог `build` со скомпилированным контрактом EtherSplitter в формате JSON.

## Настройка теста {#test-setup}

Тестирование с помощью Waffle требует использования сопоставителей Chai и Mocha, поэтому вам необходимо [добавить](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests) их в свой проект. Обновите файл package.json и добавьте запись `test` в раздел scripts:

```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'"
  }
```

Если вы хотите [выполнить](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests) свои тесты, просто запустите `yarn test`.

## Тестирование {#testing}

Теперь создайте каталог `test` и новый файл `test\EtherSplitter.test.ts`.
Скопируйте приведенный ниже фрагмент и вставьте его в наш тестовый файл.

```ts
import { expect, use } from "chai"
import { Contract } from "ethers"
import { deployContract, MockProvider, solidity } from "ethereum-waffle"
import EtherSplitter from "../build/EtherSplitter.json"

use(solidity)

describe("Ether Splitter", () => {
  const [sender, receiver1, receiver2] = new MockProvider().getWallets()
  let splitter: Contract

  beforeEach(async () => {
    splitter = await deployContract(sender, EtherSplitter, [
      receiver1.address,
      receiver2.address,
    ])
  })

  // добавьте тесты здесь
})
```

Несколько слов, прежде чем мы начнем.
`MockProvider` предоставляет макетную версию блокчейна. Он также предоставляет макетные кошельки, которые послужат нам для тестирования контракта EtherSplitter. Мы можем получить до десяти кошельков, вызвав метод `getWallets()` у провайдера. В этом примере мы получаем три кошелька — для отправителя и для двух получателей.

Далее мы объявляем переменную с именем 'splitter' — это наш макетный контракт EtherSplitter. Он создается перед каждым выполнением отдельного теста методом `deployContract`. Этот метод имитирует развертывание контракта из кошелька, переданного в качестве первого параметра (в нашем случае это кошелек отправителя). Второй параметр — это ABI и байт-код тестируемого контракта — мы передаем туда json-файл скомпилированного контракта EtherSplitter из каталога `build`. Третий параметр — это массив с аргументами конструктора контракта, которыми в нашем случае являются два адреса получателей.

## Изменение балансов {#changebalances}

Во-первых, мы проверим, действительно ли метод split изменяет балансы кошельков получателей. Если мы разделим 50 wei с аккаунта отправителя, мы ожидаем, что балансы обоих получателей увеличатся на 25 wei. Мы будем использовать сопоставитель `changeBalances` из Waffle:

```ts
it("Changes accounts balances", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalances(
    [receiver1, receiver2],
    [25, 25]
  )
})
```

В качестве первого параметра сопоставителя мы передаем массив кошельков получателей, а в качестве второго — массив ожидаемых увеличений на соответствующих аккаунтах.
Если бы мы хотели проверить баланс одного конкретного кошелька, мы могли бы также использовать сопоставитель `changeBalance`, который не требует передачи массивов, как в примере ниже:

```ts
it("Changes account balance", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalance(
    receiver1,
    25
  )
})
```

Обратите внимание, что в обоих случаях `changeBalance` и `changeBalances` мы передаем функцию split в качестве обратного вызова, потому что сопоставителю необходимо получить доступ к состоянию балансов до и после вызова.

Далее мы проверим, было ли сгенерировано событие Transfer после каждого перевода wei. Мы обратимся к другому сопоставителю из Waffle:

## Генерация {#emit}

```ts
it("Emits event on the transfer to the first receiver", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver1.address, 25)
})

it("Emits event on the transfer to the second receiver", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver2.address, 25)
})
```

Сопоставитель `emit` позволяет нам проверить, сгенерировал ли контракт событие при вызове метода. В качестве параметров сопоставителя `emit` мы предоставляем макетный контракт, который, по нашему прогнозу, сгенерирует событие, а также имя этого события. В нашем случае макетный контракт — это `splitter`, а имя события — `Transfer`. Мы также можем проверить точные значения аргументов, с которыми было сгенерировано событие — мы передаем в сопоставитель `withArgs` столько аргументов, сколько ожидает наше объявление события. В случае контракта EtherSplitter мы передаем адреса отправителя и получателя вместе с переведенной суммой в wei.

## Отмена с сообщением {#revertedwith}

В качестве последнего примера мы проверим, была ли отменена транзакция в случае нечетного количества wei. Мы будем использовать сопоставитель `revertedWith`:

```ts
it("Reverts when Vei amount uneven", async () => {
  await expect(splitter.split({ value: 51 })).to.be.revertedWith(
    "Uneven wei amount not allowed"
  )
})
```

Тест, если он будет пройден, заверит нас, что транзакция действительно была отменена. Однако должно быть точное совпадение между сообщениями, которые мы передали в операторе `require`, и сообщением, которое мы ожидаем в `revertedWith`. Если мы вернемся к коду контракта EtherSplitter, в операторе `require` для суммы wei мы предоставляем сообщение: 'Uneven wei amount not allowed'. Это соответствует сообщению, которое мы ожидаем в нашем тесте. Если бы они не были равны, тест бы не прошел.

## Поздравляем! {#congratulations}

Вы сделали свой первый большой шаг к тестированию умных контрактов с помощью Waffle!
