---
title: "Тестування простого смарт-контракту з бібліотекою Waffle"
description: "Підручник для початківців"
author: "Єва Ковальська"
tags:
  [
    "Смарт-контракти",
    "мова програмування",
    "Waffle",
    "тестування"
  ]
skill: beginner
lang: uk
published: 2021-02-26
---

## У цьому підручнику ви дізнаєтеся, як {#in-this-tutorial-youll-learn-how-to}

- Перевіряти зміни балансу гаманця
- Тестувати емісію подій із зазначеними аргументами
- Перевіряти, що транзакцію було повернуто

## Припущення {#assumptions}

- Ви можете створити новий проєкт на JavaScript або TypeScript
- У вас є базовий досвід роботи з тестами в JavaScript
- Ви використовували менеджери пакунків, як-от yarn або npm
- Ви володієте базовими знаннями про смарт-контракти та Solidity

## Початок роботи {#getting-started}

У цьому посібнику демонструється налаштування та запуск тестування за допомогою yarn, але ви можете використовувати й npm. Я надам відповідні посилання на офіційну [документацію](https://ethereum-waffle.readthedocs.io/en/latest/index.html) Waffle.

## Встановлення залежностей {#install-dependencies}

[Додайте](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation) залежності ethereum-waffle та typescript до залежностей для розробки (dev dependencies) вашого проєкту.

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## Приклад смарт-контракту {#example-smart-contract}

Під час цього посібника ми будемо працювати над простим прикладом смарт-контракту — EtherSplitter. Він мало що робить, окрім як дозволяє будь-кому надіслати трохи wei та розділити їх порівну між двома попередньо визначеними одержувачами.
Функція `split` вимагає, щоб кількість wei була парною, інакше транзакція буде повернута. Для обох одержувачів він виконує переказ wei, після чого відбувається емісія події `Transfer`.

Розмістіть фрагмент коду EtherSplitter у `src/EtherSplitter.sol`.

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

## Компіляція контракту {#compile-the-contract}

Щоб [скомпілювати](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#compiling-the-contract) контракт, додайте наступний запис до файлу package.json:

```json
"scripts": {
    "build": "waffle"
  }
```

Далі створіть файл конфігурації Waffle у кореневому каталозі проєкту — `waffle.json` — а потім вставте туди таку конфігурацію:

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```

Запустіть `yarn build`. У результаті з’явиться каталог `build` зі скомпільованим контрактом EtherSplitter у форматі JSON.

## Налаштування тестування {#test-setup}

Тестування за допомогою Waffle вимагає використання Chai matchers та Mocha, тому вам потрібно [додати](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests) їх до свого проєкту. Оновіть файл package.json і додайте запис `test` у розділ `scripts`:

```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'"
  }
```

Якщо ви хочете [виконати](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests) свої тести, просто запустіть `yarn test`.

## Тестування {#testing}

Тепер створіть каталог `test` і створіть новий файл `test\EtherSplitter.test.ts`.
Скопіюйте фрагмент коду нижче та вставте його в наш файл тестування.

```ts
import { expect, use } from "chai"
import { Contract } from "ethers"
import { deployContract, MockProvider, solidity } from "ethereum-waffle"
import EtherSplitter from "../build/EtherSplitter.json"

use(solidity)

describe("Розподілювач ефіру", () => {
  const [sender, receiver1, receiver2] = new MockProvider().getWallets()
  let splitter: Contract

  beforeEach(async () => {
    splitter = await deployContract(sender, EtherSplitter, [
      receiver1.address,
      receiver2.address,
    ])
  })

  // додайте сюди тести
})
```

Кілька слів перед тим, як ми почнемо.
`MockProvider` створює імітовану версію блокчейну. Він також надає імітовані гаманці, які слугуватимуть нам для тестування контракту EtherSplitter. Ми можемо отримати до десяти гаманців, викликавши метод `getWallets()` у провайдера. У цьому прикладі ми отримуємо три гаманці: для відправника та для двох одержувачів.

Далі ми оголошуємо змінну з назвою `splitter` — це наш імітований контракт EtherSplitter. Він створюється перед кожним виконанням окремого тесту за допомогою методу `deployContract`. Цей метод імітує розгортання контракту з гаманця, переданого як перший параметр (у нашому випадку — гаманець відправника). Другий параметр — це ABI та байт-код тестованого контракту. Ми передаємо туди JSON-файл скомпільованого контракту EtherSplitter з каталогу `build`. Третій параметр — це масив з аргументами конструктора контракту, якими в нашому випадку є дві адреси одержувачів.

## Зміна балансів {#changebalances}

Спочатку ми перевіримо, чи метод `split` дійсно змінює баланси гаманців одержувачів. Якщо ми розділимо 50 wei з рахунку відправника, то очікуємо, що баланси обох одержувачів збільшаться на 25 wei. Ми будемо використовувати матчер `changeBalances` з Waffle:

```ts
it("Змінює баланси рахунків", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalances(
    [receiver1, receiver2],
    [25, 25]
  )
})
```

Як перший параметр матчера ми передаємо масив гаманців одержувачів, а як другий — масив очікуваних приростів на відповідних рахунках.
Якби ми хотіли перевірити баланс одного конкретного гаманця, ми могли б також використати матчер `changeBalance`, який не вимагає передачі масивів, як у прикладі нижче:

```ts
it("Змінює баланс рахунку", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalance(
    receiver1,
    25
  )
})
```

Зверніть увагу, що в обох випадках (`changeBalance` і `changeBalances`) ми передаємо функцію `split` як функцію зворотного виклику, оскільки матчеру потрібно отримати доступ до стану балансів до та після виклику.

Далі ми перевіримо, чи була згенерована подія `Transfer` після кожного переказу wei. Ми звернемося до іншого матчера з Waffle:

## Emit {#emit}

```ts
it("Генерує подію під час переказу першому одержувачу", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver1.address, 25)
})

it("Генерує подію під час переказу другому одержувачу", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver2.address, 25)
})
```

Матчер `emit` дозволяє нам перевірити, чи згенерував контракт подію під час виклику методу. Як параметри для матчера `emit`, ми надаємо імітований контракт, який, за нашими прогнозами, згенерує подію, разом із назвою цієї події. У нашому випадку імітований контракт — це `splitter`, а назва події — `Transfer`. Ми також можемо перевірити точні значення аргументів, з якими була згенерована подія — ми передаємо стільки аргументів до матчера `withArgs`, скільки очікує наше оголошення події. У випадку контракту EtherSplitter, ми передаємо адреси відправника та одержувача разом із сумою переказаних wei.

## revertedWith {#revertedwith}

В останньому прикладі ми перевіримо, чи була транзакція повернута у випадку непарної кількості wei. Ми будемо використовувати матчер `revertedWith`:

```ts
it("Повертає транзакцію, якщо кількість wei непарна", async () => {
  await expect(splitter.split({ value: 51 })).to.be.revertedWith(
    "Uneven wei amount not allowed"
  )
})
```

Тест, якщо він пройде успішно, запевнить нас, що транзакція дійсно була повернута. Однак, також має бути точна відповідність між повідомленнями, які ми передали в операторі `require`, і повідомленням, яке ми очікуємо в `revertedWith`. Якщо ми повернемося до коду контракту EtherSplitter, то в операторі `require` для суми wei ми надаємо повідомлення: 'Uneven wei amount not allowed'. Це відповідає повідомленню, яке ми очікуємо в нашому тесті. Якби вони не були однаковими, тест не пройшов би.

## Вітаємо! {#congratulations}

Ви зробили свій перший великий крок до тестування смарт-контрактів за допомогою Waffle!
