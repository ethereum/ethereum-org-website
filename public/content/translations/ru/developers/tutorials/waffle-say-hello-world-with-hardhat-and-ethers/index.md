---
title: "Руководство Waffle «Hello world» с использованием Hardhat и ethers"
description: "Создайте свой первый проект Waffle с помощью Hardhat и ethers.js"
author: "MiZiet"
tags:
  [
    "Waffle",
    "Умные контракты",
    "Solidity",
    "тестирование",
    "Hardhat",
    "ethers.js"
  ]
skill: beginner
lang: ru
published: 2020-10-16
---

В этом руководстве по [Waffle](https://ethereum-waffle.readthedocs.io) мы научимся настраивать простой проект умного контракта «Hello world» с использованием [Hardhat](https://hardhat.org/) и [ethers.js](https://docs.ethers.io/v5/). Затем мы узнаем, как добавить новую функциональность в наш умный контракт и как протестировать ее с помощью Waffle.

Начнем с создания нового проекта:

```bash
yarn init
```

или

```bash
npm init
```

и установки необходимых пакетов:

```bash
yarn add -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

или

```bash
npm install -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

Следующий шаг — создание образца проекта Hardhat путем запуска `npx hardhat`.

```bash
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Добро пожаловать в Hardhat v2.0.3 👷‍

? Что вы хотите сделать? ...
❯ Создать образец проекта
Создать пустой hardhat.config.js
Выйти
```

Выберите `Создать образец проекта`

Структура нашего проекта должна выглядеть так:

```
MyWaffleProject
├── contracts
│   └── Greeter.sol
├── node_modules
├── scripts
│   └── sample-script.js
├── test
│   └── sample-test.js
├── .gitattributes
├── .gitignore
├── hardhat.config.js
└── package.json
```

### Теперь давайте поговорим о некоторых из этих файлов: {#now-lets-talk}

- Greeter.sol — наш умный контракт, написанный на Solidity;

```solidity
contract Greeter {
string greeting;

constructor(string memory _greeting) public {
console.log("Развертывание Greeter с приветствием:", _greeting);
greeting = _greeting;
}

function greet() public view returns (string memory) {
return greeting;
}

function setGreeting(string memory _greeting) public {
console.log("Изменение приветствия с '%s' на '%s'", greeting, _greeting);
greeting = _greeting;
}
}
```

Наш умный контракт можно разделить на три части:

1. конструктор — где мы объявляем строковую переменную с именем `greeting`,
2. функция `greet` — функция, которая возвращает `greeting` при вызове,
3. функция `setGreeting` — функция, которая позволяет нам изменить значение `greeting`.

- sample-test.js — наш файл с тестами

```js
describe("Greeter", function () {
  it("Должен возвращать новое приветствие после его изменения", async function () {
    const Greeter = await ethers.getContractFactory("Greeter")
    const greeter = await Greeter.deploy("Hello, world!")

    await greeter.deployed()
    expect(await greeter.greet()).to.equal("Hello, world!")

    await greeter.setGreeting("Hola, mundo!")
    expect(await greeter.greet()).to.equal("Hola, mundo!")
  })
})
```

### Следующий шаг — компиляция нашего контракта и запуск тестов: {#compiling-and-testing}

Тесты Waffle используют Mocha (тестовый фреймворк) с Chai (библиотекой утверждений). Все, что вам нужно сделать, — это запустить `npx hardhat test` и дождаться появления следующего сообщения.

```bash
✓ Должен возвращать новое приветствие после его изменения
```

### Пока все выглядит отлично, давайте немного усложним наш проект <Emoji text=":slightly_smiling_face:" size={1}/> {#adding-complexity}

Представьте ситуацию, когда кто-то добавляет пустую строку в качестве приветствия. Это было бы не очень теплое приветствие, правда?  
Давайте убедимся, что этого не произойдет:

Мы хотим использовать `revert` из Solidity, когда кто-то передает пустую строку. Хорошо то, что мы можем легко протестировать эту функциональность с помощью матчера `to.be.revertedWith()` из Waffle Chai.

```js
it("Должен отменяться при передаче пустой строки", async () => {
  const Greeter = await ethers.getContractFactory("Greeter")
  const greeter = await Greeter.deploy("Hello, world!")

  await greeter.deployed()
  await expect(greeter.setGreeting("")).to.be.revertedWith(
    "Приветствие не должно быть пустым"
  )
})
```

Похоже, наш новый тест не прошел:

```bash
Развертывание Greeter с приветствием: Hello, world!
Изменение приветствия с 'Hello, world!' на 'Hola, mundo!'
    ✓ Должен возвращать новое приветствие после его изменения (1514ms)
Развертывание Greeter с приветствием: Hello, world!
Изменение приветствия с 'Hello, world!' на ''
    1) Должен отменяться при передаче пустой строки


  1 пройден (2s)
  1 не пройден
```

Давайте реализуем данную функциональность в нашем умном контракте:

```solidity
require(bytes(_greeting).length > 0, "Приветствие не должно быть пустым");
```

Теперь наша функция `setGreeting` выглядит так:

```solidity
function setGreeting(string memory _greeting) public {
require(bytes(_greeting).length > 0, "Приветствие не должно быть пустым");
console.log("Изменение приветствия с '%s' на '%s'", greeting, _greeting);
greeting = _greeting;
}
```

Давайте снова запустим тесты:

```bash
✓ Должен возвращать новое приветствие после его изменения (1467ms)
✓ Должен отменяться при передаче пустой строки (276ms)

2 пройдено (2s)
```

Поздравляем! Вы сделали это :)

### Заключение {#conclusion}

Мы сделали простой проект с помощью Waffle, Hardhat и ethers.js. Мы научились настраивать проект, добавлять тест и реализовывать новую функциональность.

Чтобы узнать о других замечательных матчерах Chai для тестирования ваших умных контрактов, обратитесь к [официальной документации Waffle](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html).
