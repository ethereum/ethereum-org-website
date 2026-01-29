---
title: "Краткие ABI для оптимизации calldata"
description: "Оптимизация смарт-контрактов для оптимистических ролл-апов"
author: "Ори Померанц"
lang: ru
tags: [ "уровень 2" ]
skill: intermediate
published: 2022-04-01
---

## Введение {#introduction}

В этой статье вы узнаете об [оптимистических ролл-апах](/developers/docs/scaling/optimistic-rollups), стоимости транзакций на них и о том, как эта иная структура затрат требует от нас оптимизации для других целей, чем в основной сети Ethereum.
Вы также узнаете, как реализовать эту оптимизацию.

### Полное раскрытие информации {#full-disclosure}

Я штатный сотрудник [Optimism](https://www.optimism.io/), поэтому примеры в этой статье будут работать на Optimism.
Однако описанная здесь техника должна работать так же хорошо и для других ролл-апов.

### Терминология {#terminology}

При обсуждении ролл-апов термин «уровень 1» (L1) используется для Mainnet, производственной сети Ethereum.
Термин «уровень 2» (L2) используется для ролл-апа или любой другой системы, которая полагается на L1 для обеспечения безопасности, но выполняет большую часть своей обработки вне сети.

## Как мы можем еще больше снизить стоимость транзакций на L2? {#how-can-we-further-reduce-the-cost-of-L2-transactions}

[Оптимистические ролл-апы](/developers/docs/scaling/optimistic-rollups) должны сохранять запись каждой исторической транзакции, чтобы любой мог просмотреть их и проверить правильность текущего состояния.
Самый дешевый способ передать данные в основную сеть Ethereum — это записать их как calldata.
Это решение было выбрано как [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-), так и [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups).

### Стоимость транзакций на L2 {#cost-of-l2-transactions}

Стоимость транзакций на L2 состоит из двух компонентов:

1. Обработка на L2, которая обычно чрезвычайно дешева
2. Хранилище на L1, которое привязано к стоимости газа в Mainnet

На момент написания этой статьи стоимость газа на L2 в Optimism составляет 0,001 [Gwei](/developers/docs/gas/#pre-london).
С другой стороны, стоимость газа на L1 составляет примерно 40 Gwei.
[Текущие цены можно посмотреть здесь](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

Байт calldata стоит либо 4 газа (если он нулевой), либо 16 газа (если это любое другое значение).
Одна из самых дорогостоящих операций в EVM — это запись в хранилище.
Максимальная стоимость записи 32-байтового слова в хранилище на L2 составляет 22 100 газа. На данный момент это 22,1 Gwei.
Таким образом, если мы сможем сэкономить хотя бы один нулевой байт calldata, мы сможем записать в хранилище около 200 байт и все равно остаться в выигрыше.

### ABI {#the-abi}

В подавляющем большинстве операций доступ к контракту осуществляется с внешнего аккаунта.
Большинство контрактов написаны на Solidity и интерпретируют поле данных в соответствии с [двоичным интерфейсом приложения (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Однако ABI был разработан для L1, где байт calldata стоит примерно столько же, сколько четыре арифметические операции, а не для L2, где байт calldata стоит более тысячи арифметических операций.
Calldata разделяется следующим образом:

| Раздел           | Длина | Байты | Потраченные впустую байты | Потраченный впустую газ | Необходимые байты | Необходимый газ |
| ---------------- | ----: | ----: | ------------------------: | ----------------------: | ----------------: | --------------: |
| Селектор функции |     4 |   0-3 |                         3 |                      48 |                 1 |              16 |
| Нули             |    12 |  4-15 |                        12 |                      48 |                 0 |               0 |
| Адрес назначения |    20 | 16-35 |                         0 |                       0 |                20 |             320 |
| Сумма            |    32 | 36-67 |                        17 |                      64 |                15 |             240 |
| Итого            |    68 |       |                           |                     160 |                   |             576 |

Пояснение:

- **Селектор функции**: в контракте менее 256 функций, поэтому мы можем различать их по одному байту.
  Эти байты обычно ненулевые, и поэтому [стоят шестнадцать газа](https://eips.ethereum.org/EIPS/eip-2028).
- **Нули**: эти байты всегда равны нулю, поскольку для хранения двадцатибайтового адреса не требуется тридцатидвухбайтовое слово.
  Байты, которые содержат ноль, стоят четыре единицы газа ([см. Желтую книгу](https://ethereum.github.io/yellowpaper/paper.pdf), Приложение G,
  стр. 27, значение для `G`<sub>`txdatazero`</sub>).
- **Сумма**: если предположить, что в этом контракте `decimals` равно восемнадцати (стандартное значение), а максимальное количество токенов, которое мы переводим, составит 10<sup>18</sup>, то мы получим максимальную сумму в 10<sup>36</sup>.
  256<sup>15</sup> &gt; 10<sup>36</sup>, так что пятнадцати байт достаточно.

Потеря 160 единиц газа на L1 обычно незначительна. Транзакция стоит как минимум [21 000 газа](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), так что лишние 0,8% не имеют значения.
Однако на L2 все иначе. Почти вся стоимость транзакции — это ее запись на L1.
В дополнение к calldata транзакции существует 109 байт заголовка транзакции (адрес назначения, подпись и т. д.).
Таким образом, общая стоимость составляет `109*16+576+160=2480`, и мы тратим впустую около 6,5% от этой суммы.

## Снижение затрат, когда вы не контролируете назначение {#reducing-costs-when-you-dont-control-the-destination}

Если предположить, что у вас нет контроля над контрактом назначения, вы все равно можете использовать решение, подобное [этому](https://github.com/qbzzt/ethereum.org-20220330-shortABI).
Давайте рассмотрим соответствующие файлы.

### Token.sol {#token-sol}

[Это контракт назначения](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
Это стандартный контракт ERC-20 с одной дополнительной функцией.
Эта функция `faucet` позволяет любому пользователю получить немного токенов для использования.
Это сделало бы производственный контракт ERC-20 бесполезным, но это облегчает жизнь, когда ERC-20 существует только для упрощения тестирования.

```solidity
    /**
     * @dev Дает вызывающему 1000 токенов для использования
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // функция faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[Это контракт, который транзакции должны вызывать с более короткими calldata](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
Давайте рассмотрим его построчно.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

Нам нужна функция токена, чтобы знать, как ее вызывать.

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

Адрес токена, для которого мы являемся прокси.

```solidity

    /**
     * @dev Укажите адрес токена
     * @param tokenAddr_ адрес контракта ERC-20
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // конструктор
```

Адрес токена — единственный параметр, который нам нужно указать.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

Считываем значение из calldata.

```solidity
        uint _retVal;

        require(length < 0x21,
            "предел длины calldataVal — 32 байта");

        require(length + startByte <= msg.data.length,
            "calldataVal пытается прочитать за пределами calldatasize");
```

Мы собираемся загрузить в память одно 32-байтовое (256-битное) слово и удалить байты, которые не являются частью нужного нам поля.
Этот алгоритм не работает для значений длиннее 32 байт, и, конечно же, мы не можем читать за концом calldata.
На L1 может быть необходимо пропустить эти тесты для экономии газа, но на L2 газ чрезвычайно дешев, что позволяет проводить любые проверки на вменяемость (sanity check), какие только можно придумать.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Мы могли бы скопировать данные из вызова в `fallback()` (см. ниже), но проще использовать [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html), язык ассемблера EVM.

Здесь мы используем [опкод CALLDATALOAD](https://www.evm.codes/#35), чтобы считать байты с `startByte` до `startByte+31` в стек.
В общем, синтаксис опкода в Yul следующий: `<имя опкода>(<первое значение стека, если есть>,<второе значение стека, если есть>...)`.

```solidity

        _retVal = _retVal >> (256-length*8);
```

Только самые старшие `length` байт являются частью поля, поэтому мы делаем [сдвиг вправо](https://en.wikipedia.org/wiki/Logical_shift), чтобы избавиться от других значений.
Это дает дополнительное преимущество, перемещая значение в правую часть поля, так что это само значение, а не значение, умноженное на 256<sup>что-то</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

Когда вызов контракта Solidity не соответствует ни одной из сигнатур функций, он вызывает [функцию `fallback()`](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (если она есть).
В случае с `CalldataInterpreter` любой вызов попадает сюда, потому что других `external` или `public` функций нет.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Считываем первый байт calldata, который сообщает нам функцию.
Есть две причины, по которым эта функция может быть недоступна:

1. Функции `pure` или `view` не изменяют состояние и не требуют газа (при вызове вне сети).
   Нет смысла пытаться снизить их стоимость в газе.
2. Функции, которые полагаются на [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties).
   Значением `msg.sender` будет адрес `CalldataInterpreter`, а не вызывающего.

К сожалению, [если посмотреть на спецификации ERC-20](https://eips.ethereum.org/EIPS/eip-20), остается только одна функция — `transfer`.
У нас остается только две функции: `transfer` (потому что мы можем вызвать `transferFrom`) и `faucet` (потому что мы можем перевести токены обратно тому, кто нас вызвал).

```solidity

        // Вызов методов изменения состояния токена с использованием
        // информации из calldata

        // faucet
        if (_func == 1) {
```

Вызов `faucet()`, у которого нет параметров.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

После вызова `token.faucet()` мы получаем токены. Однако нам как прокси-контракту токены не **нужны**.
Они нужны EOA (внешнему аккаунту) или контракту, который нас вызвал.
Поэтому мы переводим все наши токены тому, кто нас вызвал.

```solidity
        // transfer (предполагается, что у нас есть разрешение на это)
        if (_func == 2) {
```

Для перевода токенов требуются два параметра: адрес назначения и сумма.

```solidity
            token.transferFrom(
                msg.sender,
```

Мы разрешаем вызывающим переводить только те токены, которыми они владеют

```solidity
                address(uint160(calldataVal(1, 20))),
```

Адрес назначения начинается с байта №1 (байт №0 — это функция).
Как адрес, он имеет длину 20 байт.

```solidity
                calldataVal(21, 2)
```

Для этого конкретного контракта мы предполагаем, что максимальное количество токенов, которое кто-либо захочет перевести, умещается в два байта (менее 65 536).

```solidity
            );
        }
```

В целом перевод занимает 35 байт calldata:

| Раздел           | Длина | Байты |
| ---------------- | ----: | ----: |
| Селектор функции |     1 |     0 |
| Адрес назначения |    32 |  1-32 |
| Сумма            |     2 | 33-34 |

```solidity
    }   // fallback

}       // контракт CalldataInterpreter
```

### test.js {#test-js}

[Этот модульный тест на JavaScript](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) показывает, как использовать этот механизм (и как проверить, что он работает правильно).
Я буду исходить из того, что вы понимаете [chai](https://www.chaijs.com/) и [ethers](https://docs.ethers.io/v5/) и объясню только те части, которые относятся непосредственно к контракту.

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Должен позволить нам использовать токены", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Адрес токена:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("Адрес CalldataInterpreter:", cdi.address)

    const signer = await ethers.getSigner()
```

Мы начинаем с развертывания обоих контрактов.

```javascript
    // Получаем токены для использования
    const faucetTx = {
```

Мы не можем использовать высокоуровневые функции, которые обычно используем (например, `token.faucet()`) для создания транзакций, потому что мы не следуем ABI.
Вместо этого мы должны создать транзакцию самостоятельно, а затем отправить ее.

```javascript
      to: cdi.address,
      data: "0x01"
```

Для транзакции необходимо указать два параметра:

1. `to` — адрес назначения.
   Это контракт-интерпретатор calldata.
2. `data` — отправляемые calldata.
   В случае вызова faucet данные представляют собой один байт, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

Мы вызываем [метод `sendTransaction` подписанта](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction), потому что мы уже указали назначение (`faucetTx.to`), и нам нужно, чтобы транзакция была подписана.

```javascript
// Проверяем, что faucet правильно предоставляет токены
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Здесь мы проверяем баланс.
Нет необходимости экономить на газе для функций `view`, поэтому мы просто запускаем их в обычном режиме.

```javascript
// Даем CDI разрешение (одобрения не могут быть проксированы)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Даем интерпретатору calldata разрешение на выполнение переводов.

```javascript
// Переводим токены
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Создайте транзакцию перевода. Первый байт — «0x02», за ним следует адрес назначения и, наконец, сумма (0x0100, что равно 256 в десятичном формате).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Проверяем, что у нас на 256 токенов меньше
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // И что наш получатель получил их
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## Снижение затрат, когда вы контролируете контракт назначения {#reducing-the-cost-when-you-do-control-the-destination-contract}

Если у вас есть контроль над контрактом назначения, вы можете создавать функции, которые обходят проверки `msg.sender`, поскольку они доверяют интерпретатору calldata.
[Вы можете увидеть пример того, как это работает, здесь, в ветке `control-contract`](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

Если бы контракт отвечал только на внешние транзакции, мы могли бы обойтись всего одним контрактом.
Однако это нарушило бы [компонуемость](/developers/docs/smart-contracts/composability/).
Гораздо лучше иметь контракт, который отвечает на обычные вызовы ERC-20, и другой контракт, который отвечает на транзакции с короткими данными вызовов.

### Token.sol {#token-sol-2}

В этом примере мы можем изменить `Token.sol`.
Это позволяет нам иметь ряд функций, которые может вызывать только прокси.
Вот новые части:

```solidity
    // Единственный адрес, которому разрешено указывать адрес CalldataInterpreter
    address owner;

    // Адрес CalldataInterpreter
    address proxy = address(0);
```

Контракт ERC-20 должен знать идентификатор авторизованного прокси.
Однако мы не можем установить эту переменную в конструкторе, поскольку еще не знаем ее значение.
Этот контракт создается первым, поскольку прокси-сервер ожидает адрес токена в своем конструкторе.

```solidity
    /**
     * @dev Вызывает конструктор ERC20.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

Здесь хранится адрес создателя (называемого `owner`), поскольку это единственный адрес, разрешенный для установки прокси.

```solidity
    /**
     * @dev установить адрес для прокси (CalldataInterpreter).
     * Может быть вызван только один раз владельцем
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Может быть вызван только владельцем");
        require(proxy == address(0), "Прокси уже установлен");

        proxy = _proxy;
    }    // функция setProxy
```

Прокси имеет привилегированный доступ, поскольку может обходить проверки безопасности.
Чтобы убедиться, что мы можем доверять прокси, мы позволяем `owner` вызывать эту функцию, и только один раз.
Как только `proxy` имеет реальное значение (не нулевое), это значение не может измениться, поэтому даже если владелец решит стать мошенником или будет раскрыта мнемоника для него, мы все равно будем в безопасности.

```solidity
    /**
     * @dev Некоторые функции могут быть вызваны только прокси.
     */
    modifier onlyProxy {
```

Это [`модификатор` функции](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), он изменяет способ работы других функций.

```solidity
      require(msg.sender == proxy);
```

Сначала убедитесь, что вам позвонил прокси и никто другой.
Если нет, то `revert`.

```solidity
      _;
    }
```

Если да, запустите функцию, которую мы модифицируем.

```solidity
   /* Функции, которые позволяют прокси фактически проксировать для аккаунтов */

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

Для того чтобы сообщение пришло непосредственно от объекта, передающего токены или утверждающего разрешение, необходимы эти три операции.
Здесь у нас есть прокси-версия этих операций, которая:

1. Изменяется с помощью `onlyProxy()`, поэтому никто другой не может ими управлять.
2. Получает адрес, который обычно выглядит как `msg.sender`, в качестве дополнительного параметра.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

Интерпретатор calldata почти идентичен приведенному выше, за исключением того, что прокси-функции получают параметр `msg.sender` и нет необходимости в разрешении для `transfer`.

```solidity
        // transfer (разрешение не требуется)
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

Между предыдущим тестовым кодом и этим есть несколько изменений.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

Нам нужно указать контракту ERC-20, какому прокси нужно доверять

```js
console.log("Адрес CalldataInterpreter:", cdi.address)

// Требуются два подписанта для проверки разрешений
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

Для проверки `approve()` и `transferFrom()` нам понадобится второй подписант.
Мы называем его `poorSigner`, потому что он не получает никаких наших токенов (хотя, конечно, у него должен быть ETH).

```js
// Переводим токены
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

Поскольку контракт ERC-20 доверяет прокси-серверу (`cdi`), нам не требуется разрешение на ретрансляцию передач.

```js
// approval и transferFrom
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

// Проверяем, что комбинация approve / transferFrom была выполнена правильно
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

Протестируйте две новые функции.
Обратите внимание, что для `transferFromTx` требуются два параметра адреса: тот, кто выдал разрешение, и получатель.

## Заключение {#conclusion}

И [Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92), и [Arbitrum](https://developer.offchainlabs.com/docs/special_features) ищут способы уменьшить размер calldata, записываемых на L1, и, следовательно, стоимость транзакций.
Однако, поскольку мы являемся поставщиками инфраструктуры, ищущими универсальные решения, наши возможности ограничены.
Как разработчик децентрализованных приложений, вы обладаете знаниями, специфичными для приложения, что позволяет вам оптимизировать данные вызовов гораздо лучше, чем мы могли бы в обычном решении.
Надеемся, эта статья поможет вам найти идеальное решение для ваших нужд.

[Больше моих работ смотрите здесь](https://cryptodocguy.pro/).

