---
title: "Короткие ABI для оптимизации данных вызова"
description: "Оптимизация смарт-контрактов для оптимистичных роллапов"
author: "Ори Померанц"
lang: ru
tags: ["уровень 2 (l2)"]
skill: intermediate
breadcrumb: "Короткие ABI"
published: 2022-04-01
---

## Введение {#introduction}

В этой статье вы узнаете об [оптимистичных роллапах](/developers/docs/scaling/optimistic-rollups), стоимости транзакций в них и о том, как эта иная структура затрат требует от нас оптимизации других вещей, нежели в основной сети Ethereum.
Вы также узнаете, как реализовать эту оптимизацию.

### Важное уточнение {#full-disclosure}

Я являюсь штатным сотрудником [Optimism](https://www.optimism.io/), поэтому примеры в этой статье будут работать на Optimism.
Однако описанный здесь метод должен так же хорошо работать и для других роллапов.

### Терминология {#terminology}

При обсуждении роллапов термин «уровень 1 (l1)» используется для Мейннета, рабочей сети Эфириума.
Термин «уровень 2 (l2)» используется для роллапа или любой другой системы, которая полагается на уровень 1 (l1) в плане безопасности, но выполняет большую часть своей обработки офчейн.

## Как мы можем еще больше снизить стоимость транзакций на уровне 2 (l2)? {#how-can-we-further-reduce-the-cost-of-l2-transactions}

[Оптимистичные роллапы](/developers/docs/scaling/optimistic-rollups) должны сохранять запись о каждой исторической транзакции, чтобы любой мог просмотреть их и убедиться, что текущее состояние является правильным.
Самый дешевый способ передать данные в основную сеть Ethereum — записать их как данные вызова.
Это решение было выбрано как [Optimism](https://docs.optimism.io/op-stack/protocol/overview), так и [Arbitrum](https://docs.arbitrum.io/welcome/arbitrum-gentle-introduction).

### Стоимость транзакций на уровне 2 (l2) {#cost-of-l2-transactions}

Стоимость транзакций на уровне 2 (l2) состоит из двух компонентов:

1. Обработка на уровне 2 (l2), которая обычно очень дешевая
2. Хранение на уровне 1 (l1), которое привязано к стоимости газа в Мейннете

На момент написания этой статьи стоимость газа на уровне 2 (l2) в Optimism составляет 0.001 [Gwei](/developers/docs/gas/#pre-london).
Стоимость газа на уровне 1 (l1), с другой стороны, составляет примерно 40 Gwei.
[Вы можете посмотреть текущие цены здесь](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

Байт данных вызова стоит либо 4 газа (если он равен нулю), либо 16 газа (если это любое другое значение).
Одной из самых дорогих операций в EVM является запись в хранилище.
Максимальная стоимость записи 32-байтового слова в хранилище на уровне 2 (l2) составляет 22100 газа. В настоящее время это 22.1 Gwei.
Таким образом, если мы сможем сэкономить хотя бы один нулевой байт данных вызова, мы сможем записать около 200 байт в хранилище и все равно остаться в плюсе.

### ABI {#the-abi}

Подавляющее большинство транзакций обращаются к контракту с внешнего аккаунта.
Большинство контрактов написаны на Solidity и интерпретируют свое поле данных в соответствии с [двоичным интерфейсом приложения (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Однако ABI был разработан для уровня 1 (l1), где байт данных вызова стоит примерно столько же, сколько четыре арифметические операции, а не для уровня 2 (l2), где байт данных вызова стоит более тысячи арифметических операций.
Данные вызова разделены следующим образом:

| Раздел | Длина | Байты | Потраченные впустую байты | Потраченный впустую газ | Необходимые байты | Необходимый газ |
| ------------------- | -----: | ----: | -----------: | ---------: | --------------: | ------------: |
| Селектор функции | 4 | 0-3 | 3 | 48 | 1 | 16 |
| Нули | 12 | 4-15 | 12 | 48 | 0 | 0 |
| Адрес назначения | 20 | 16-35 | 0 | 0 | 20 | 320 |
| Сумма | 32 | 36-67 | 17 | 64 | 15 | 240 |
| Итого | 68 | | | 160 | | 576 |

Объяснение:

- **Селектор функции**: Контракт имеет менее 256 функций, поэтому мы можем различать их с помощью одного байта.
  Эти байты обычно не равны нулю и поэтому [стоят 16 газа](https://eips.ethereum.org/EIPS/eip-2028).
- **Нули**: Эти байты всегда равны нулю, потому что для хранения двадцатибайтового адреса не требуется тридцатидвухбайтовое слово.
  Байты, содержащие ноль, стоят 4 газа ([см. желтую книгу](https://ethereum.github.io/yellowpaper/paper.pdf), Приложение G,
  стр. 27, значение для `G`<sub>`txdatazero`</sub>).
- **Сумма**: Если мы предположим, что в этом контракте `decimals` равно восемнадцати (обычное значение), а максимальное количество токенов, которое мы переводим, будет 10<sup>18</sup>, мы получим максимальную сумму 10<sup>36</sup>.
  256<sup>15</sup> &gt; 10<sup>36</sup>, поэтому пятнадцати байт достаточно.

Потеря 160 газа на уровне 1 (l1) обычно незначительна. Транзакция стоит как минимум [21 000 газа](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), поэтому дополнительные 0.8% не имеют значения.
Однако на уровне 2 (l2) все обстоит иначе. Почти вся стоимость транзакции заключается в ее записи на уровень 1 (l1).
В дополнение к данным вызова транзакции имеется 109 байт заголовка транзакции (адрес назначения, подпись и т. д.).
Таким образом, общая стоимость составляет `109*16+576+160=2480`, и мы тратим впустую около 6.5% от этой суммы.

## Снижение затрат, когда вы не контролируете контракт назначения {#reducing-costs-when-you-dont-control-the-destination}

Если предположить, что у вас нет контроля над контрактом назначения, вы все равно можете использовать решение, похожее на [это](https://github.com/qbzzt/ethereum.org-20220330-shortABI).
Давайте рассмотрим соответствующие файлы.

### Token.sol {#token-sol}

[Это контракт назначения](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
Это стандартный контракт ERC-20 с одной дополнительной функцией.
Эта функция `faucet` позволяет любому пользователю получить немного токенов для использования.
Это сделало бы рабочий контракт ERC-20 бесполезным, но это облегчает жизнь, когда ERC-20 существует только для облегчения тестирования.

```solidity
    /**
     * @dev Дает вызывающему 1000 токенов для игры
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[Это контракт, который транзакции должны вызывать с более короткими данными вызова](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
Давайте разберем его построчно.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

Нам нужна функция токена, чтобы знать, как ее вызывать.

```solidity
контракт CalldataInterpreter {

    OrisUselessToken public immutable token;
```

Адрес токена, для которого мы являемся прокси-контрактом.

```solidity

    /**
     * @dev Указывает адрес токена
     * @param tokenAddr_ адрес контракта ERC-20
     */
    конструктор(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

Адрес токена — единственный параметр, который нам нужно указать.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

Чтение значения из данных вызова.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

Мы собираемся загрузить одно 32-байтовое (256-битное) слово в память и удалить байты, которые не являются частью нужного нам поля.
Этот алгоритм не работает для значений длиннее 32 байт, и, конечно, мы не можем читать за пределами данных вызова.
На уровне 1 (l1) может потребоваться пропустить эти проверки для экономии газа, но на уровне 2 (l2) газ чрезвычайно дешев, что позволяет проводить любые проверки работоспособности, которые мы только можем придумать.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Мы могли бы скопировать данные из вызова в `fallback()` (см. ниже), но проще использовать [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html), язык ассемблера EVM.

Здесь мы используем [код операции CALLDATALOAD](https://www.evm.codes/#35) для чтения байтов с `startByte` по `startByte+31` в стек.
В целом, синтаксис кода операции в Yul выглядит как `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`.

```solidity

        _retVal = _retVal >> (256-length*8);
```

Только самые старшие `length` байт являются частью поля, поэтому мы выполняем [сдвиг вправо](https://en.wikipedia.org/wiki/Logical_shift), чтобы избавиться от остальных значений.
Это дает дополнительное преимущество: значение перемещается в правую часть поля, поэтому мы получаем само значение, а не значение, умноженное на 256<sup>в какой-то степени</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

Когда вызов контракта Solidity не совпадает ни с одной из сигнатур функций, он вызывает [функцию `fallback()`](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (при условии, что она существует).
В случае с `CalldataInterpreter` сюда попадает _любой_ вызов, потому что других функций `external` или `public` нет.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Читаем первый байт данных вызова, который указывает нам на функцию.
Есть две причины, по которым функция может быть здесь недоступна:

1. Функции `pure` или `view` не изменяют состояние и не требуют газа (при вызове офчейн).
   Нет смысла пытаться снизить их стоимость в газе.
2. Функции, которые полагаются на [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties).
   Значением `msg.sender` будет адрес `CalldataInterpreter`, а не вызывающей стороны.

К сожалению, [если посмотреть на спецификации ERC-20](https://eips.ethereum.org/EIPS/eip-20), это оставляет только одну функцию — `transfer`.
Таким образом, у нас остается только две функции: `transfer` (потому что мы можем вызвать `transferFrom`) и `faucet` (потому что мы можем перевести токены обратно тому, кто нас вызвал).

```solidity

        // Вызов методов токена, изменяющих состояние, используя
        // информацию из данных вызова

        // faucet
        if (_func == 1) {
```

Вызов `faucet()`, который не имеет параметров.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

После вызова `token.faucet()` мы получаем токены. Однако нам, как прокси-контракту, токены **не нужны**.
Они нужны EOA (внешнему аккаунту) или контракту, который нас вызвал.
Поэтому мы переводим все наши токены тому, кто нас вызвал.

```solidity
        // перевод (предполагается, что у нас есть разрешение на это)
        if (_func == 2) {
```

Для перевода токенов требуются два параметра: адрес назначения и сумма.

```solidity
            token.transferFrom(
                msg.sender,
```

Мы разрешаем вызывающим сторонам переводить только те токены, которыми они владеют

```solidity
                address(uint160(calldataVal(1, 20))),
```

Адрес назначения начинается с байта №1 (байт №0 — это функция).
Поскольку это адрес, его длина составляет 20 байт.

```solidity
                calldataVal(21, 2)
```

Для этого конкретного контракта мы предполагаем, что максимальное количество токенов, которое кто-либо захочет перевести, помещается в два байта (менее 65536).

```solidity
            );
        }
```

В целом, перевод занимает 35 байт данных вызова:

| Раздел | Длина | Байты |
| ------------------- | -----: | ----: |
| Селектор функции | 1 | 0 |
| Адрес назначения | 32 | 1-32 |
| Сумма | 2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[Этот модульный тест на JavaScript](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) показывает нам, как использовать этот механизм (и как убедиться, что он работает правильно).
Я предполагаю, что вы понимаете [chai](https://www.chaijs.com/) и [ethers](https://docs.ethers.io/v5/), и объясню только те части, которые конкретно относятся к контракту.

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Should let us use tokens", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Token addr:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("CalldataInterpreter addr:", cdi.address)

    const signer = await ethers.getSigner()
```

Мы начинаем с развертывания обоих контрактов.

```javascript
    // Получить токены для игры
    const faucetTx = {
```

Мы не можем использовать высокоуровневые функции, которые мы обычно используем (например, `token.faucet()`), для создания транзакций, потому что мы не следуем ABI.
Вместо этого мы должны сами создать транзакцию, а затем отправить ее.

```javascript
      to: cdi.address,
      data: "0x01"
```

Для транзакции нам нужно предоставить два параметра:

1. `to`, адрес назначения.
   Это контракт интерпретатора данных вызова.
2. `data`, данные вызова для отправки.
   В случае вызова крана данные представляют собой один байт, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

Мы вызываем [метод `sendTransaction` подписанта](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction), потому что мы уже указали место назначения (`faucetTx.to`) и нам нужно, чтобы транзакция была подписана.

```javascript
// Проверить, что faucet предоставляет токены корректно
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Здесь мы проверяем баланс.
Нет необходимости экономить газ на функциях `view`, поэтому мы просто запускаем их как обычно.

```javascript
// Дать CDI разрешение (одобрения не могут быть проксированы)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Выдаем интерпретатору данных вызова разрешение на выполнение переводов.

```javascript
// Перевод токенов
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Создаем транзакцию перевода. Первый байт — «0x02», за которым следует адрес назначения и, наконец, сумма (0x0100, что равно 256 в десятичной системе).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Проверить, что у нас на 256 токенов меньше
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // И что наш получатель их получил
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## Снижение затрат, когда вы контролируете контракт назначения {#reducing-the-cost-when-you-do-control-the-destination-contract}

Если у вас есть контроль над контрактом назначения, вы можете создать функции, которые обходят проверки `msg.sender`, потому что они доверяют интерпретатору данных вызова.
[Вы можете увидеть пример того, как это работает, здесь, в ветке `control-contract`](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

Если бы контракт отвечал только на внешние транзакции, мы могли бы обойтись всего одним контрактом.
Однако это нарушило бы [композируемость](/developers/docs/smart-contracts/composability/).
Гораздо лучше иметь контракт, который отвечает на обычные вызовы ERC-20, и другой контракт, который отвечает на транзакции с короткими данными вызова.

### Token.sol {#token-sol-2}

В этом примере мы можем изменить `Token.sol`.
Это позволяет нам иметь ряд функций, которые может вызывать только прокси-контракт.
Вот новые части:

```solidity
    // Единственный адрес, которому разрешено указывать адрес CalldataInterpreter
    address owner;

    // Адрес CalldataInterpreter
    address proxy = address(0);
```

Контракту ERC-20 необходимо знать личность авторизованного прокси-контракта.
Однако мы не можем установить эту переменную в конструкторе, потому что мы еще не знаем ее значения.
Этот контракт создается первым, потому что прокси-контракт ожидает адрес токена в своем конструкторе.

```solidity
    /**
     * @dev Вызывает конструктор ERC-20.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

Адрес создателя (называемый `owner`) хранится здесь, потому что это единственный адрес, которому разрешено устанавливать прокси-контракт.

```solidity
    /**
     * @dev устанавливает адрес для прокси (CalldataInterpreter).
     * Может быть вызвано только один раз владельцем
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

Прокси-контракт имеет привилегированный доступ, поскольку он может обходить проверки безопасности.
Чтобы убедиться, что мы можем доверять прокси-контракту, мы разрешаем вызывать эту функцию только `owner` и только один раз.
Как только `proxy` получает реальное значение (не ноль), это значение не может измениться, поэтому даже если владелец решит стать злоумышленником или его мнемоническая фраза будет раскрыта, мы все равно в безопасности.

```solidity
    /**
     * @dev Некоторые функции могут быть вызваны только через прокси.
     */
    modifier onlyProxy {
```

Это [функция `modifier`](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), она изменяет способ работы других функций.

```solidity
      require(msg.sender == proxy);
```

Сначала проверяем, что нас вызвал прокси-контракт и никто другой.
Если нет, срабатывает `revert`.

```solidity
      _;
    }
```

Если да, запускаем функцию, которую мы модифицируем.

```solidity
   /* Функции, которые позволяют прокси фактически выступать в качестве прокси для аккаунтов */

    function transferProxy(address from, address to, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _transfer(from, to, amount);
        return true;
    }

    function approveProxy(address from, address spender, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _approve(from, spender, amount);
        return true;
    }

    function transferFromProxy(
        address spender,
        address from,
        address to,
        uint256 amount
    ) public virtual onlyProxy() returns (bool)
    {
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }
```

Это три операции, которые обычно требуют, чтобы сообщение исходило непосредственно от субъекта, переводящего токены или одобряющего разрешение.
Здесь у нас есть прокси-версия этих операций, которая:

1. Модифицирована с помощью `onlyProxy()`, поэтому никому другому не разрешено ими управлять.
2. Получает адрес, который обычно был бы `msg.sender`, в качестве дополнительного параметра.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

Интерпретатор данных вызова почти идентичен приведенному выше, за исключением того, что проксируемые функции получают параметр `msg.sender` и нет необходимости в разрешении для `transfer`.

```solidity
        // перевод (нет необходимости в разрешении)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // approve
        if (_func == 3) {
            token.approveProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // transferFrom
        if (_func == 4) {
            token.transferFromProxy(
                msg.sender,
                address(uint160(calldataVal( 1, 20))),
                address(uint160(calldataVal(21, 20))),
                calldataVal(41, 2)
            );
        }
```

### Test.js {#test-js-2}

Между предыдущим кодом тестирования и этим есть несколько изменений.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

Нам нужно сообщить контракту ERC-20, какому прокси-контракту доверять

```js
console.log("CalldataInterpreter addr:", cdi.address)

// Нужны два подписанта для проверки разрешений
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

Для проверки `approve()` и `transferFrom()` нам нужен второй подписант.
Мы называем его `poorSigner`, потому что он не получает никаких наших токенов (конечно, у него должен быть ETH).

```js
// Перевод токенов
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

Поскольку контракт ERC-20 доверяет прокси-контракту (`cdi`), нам не нужно разрешение для ретрансляции переводов.

```js
// одобрение и transferFrom
const approveTx = {
  to: cdi.address,
  data: "0x03" + poorSigner.address.slice(2, 42) + "00FF",
}
await (await signer.sendTransaction(approveTx)).wait()

const destAddr2 = "0xE1165C689C0c3e9642cA7606F5287e708d846206"

const transferFromTx = {
  to: cdi.address,
  data: "0x04" + signer.address.slice(2, 42) + destAddr2.slice(2, 42) + "00FF",
}
await (await poorSigner.sendTransaction(transferFromTx)).wait()

// Проверить, что комбинация approve / transferFrom была выполнена корректно
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

Тестируем две новые функции.
Обратите внимание, что `transferFromTx` требует два параметра адреса: того, кто дает разрешение, и получателя.

## Заключение {#conclusion}

Как [Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92), так и [Arbitrum](https://developer.offchainlabs.com/docs/special_features) ищут способы уменьшить размер данных вызова, записываемых на уровень 1 (l1), и, следовательно, стоимость транзакций.
Однако, как поставщики инфраструктуры, ищущие универсальные решения, наши возможности ограничены.
Как разработчик децентрализованного приложения (dapp), вы обладаете знаниями, специфичными для вашего приложения, что позволяет вам оптимизировать данные вызова гораздо лучше, чем мы могли бы сделать это в универсальном решении.
Надеемся, эта статья поможет вам найти идеальное решение для ваших нужд.

[Смотрите здесь другие мои работы](https://cryptodocguy.pro/).
