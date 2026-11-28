---
title: "Короткие ABI для оптимизации данных вызова"
description: "Оптимизация смарт-контрактов для оптимистичных роллапов"
author: "Ори Померанц"
lang: ru
tags: ["уровень 2 (L2)"]
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

При обсуждении роллапов термин «уровень 1 (L1)» используется для Мейннета, рабочей сети Эфириума.
Термин «уровень 2 (L2)» используется для роллапа или любой другой системы, которая полагается на уровень 1 (L1) в плане безопасности, но выполняет большую часть своей обработки офчейн.

## Как мы можем еще больше снизить стоимость транзакций L2? {#how-can-we-further-reduce-the-cost-of-l2-transactions}

[Оптимистичные роллапы](/developers/docs/scaling/optimistic-rollups) должны сохранять запись каждой исторической транзакции, чтобы любой мог просмотреть их и убедиться, что текущее состояние верно.
На момент написания этой статьи самым дешевым способом передачи данных в основную сеть Ethereum была их запись в виде данных вызова.
Это решение было выбрано как [Optimism](https://docs.optimism.io/op-stack/protocol/overview), так и [Arbitrum](https://docs.arbitrum.io/welcome/arbitrum-gentle-introduction).
После обновления Денкун (март 2024 года) роллапы могут вместо этого публиковать эти данные в [блобах](/roadmap/danksharding/), что намного дешевле.

### Стоимость транзакций L2 {#cost-of-l2-transactions}

Стоимость транзакций L2 состоит из двух компонентов:

1. Обработка на L2, которая обычно очень дешевая
2. Хранение на L1, которое привязано к стоимости газа в Мейннете

Когда я писал эту статью в 2022 году, в Optimism стоимость газа L2 составляла 0.001 [Gwei](/developers/docs/gas/#what-is-gas).
Стоимость газа L1, с другой стороны, составляла примерно 40 Gwei.

Байт данных вызова стоит либо 4 газа (если он равен нулю), либо 16 газа (если это любое другое значение).
Одной из самых дорогих операций в EVM является запись в хранилище.
Максимальная стоимость записи 32-байтового слова в хранилище на L2 составляет 22100 газа. В то время это было 22.1 Gwei.
Поэтому, если бы мы могли сэкономить один нулевой байт данных вызова, мы смогли бы записать около 200 байт в хранилище и все равно остаться в плюсе.

#### Как изменились затраты на L2 в 2024 году {#how-l2-costs-changed-in-2024}

Формула [комиссии за данные L1](https://docs.optimism.io/op-stack/transactions/fees#l1-data-fee) в OP Stack менялась дважды с момента написания этой статьи:

- С [обновлением Ecotone](https://docs.optimism.io/op-stack/transactions/fees#ecotone) (март 2024 года) цепи OP Stack начали публиковать данные транзакций в блобах, которые оцениваются отдельной (и обычно гораздо более низкой) базовой комиссией за блоб.
- С [обновлением Fjord](https://docs.optimism.io/op-stack/transactions/fees#fjord) (июль 2024 года) комиссия за данные L1 основывается на оценке размера транзакции после сжатия [FastLZ](https://github.com/ariya/FastLZ), с минимумом в 100 байт на транзакцию ([см. спецификацию](https://specs.optimism.io/protocol/fjord/exec-engine.html)).

Это меняет анализ в остальной части этой статьи в трех аспектах:

1. Нулевые байты хорошо сжимаются, поэтому они почти бесплатны.
   Приведенные ниже цифры в 4 и 16 газа за байт — это стоимость данных вызова L1, а не то, что вы платите за данные транзакции в цепи OP Stack сегодня.
2. Ниже минимума в 100 байт более короткие данные вызова ничего не экономят.
   Например, в октябре 2026 года в OP Mainnet стандартный `transfer` ERC-20 (68 байт данных вызова) и 23-байтовая короткая версия из этой статьи заплатили бы абсолютно одинаковую комиссию за данные L1, минимальную, около 1 Gwei (10<sup>-9</sup> ETH).
3. Поскольку пространство блобов дешевое, комиссия за выполнение на L2 теперь часто превышает комиссию за данные L1.
   При цене газа L2 в 0.001 Gwei, 1000 газа стоят 1 Gwei, столько же, сколько и вся комиссия за данные L1, поэтому дополнительный газ на выполнение при прохождении через прокси-контракт может стоить больше, чем сэкономленные байты.

Принцип остается в силе: меньшее количество сжатых байт означает более низкую комиссию за данные L1.
Короткие ABI имеют наибольший смысл для транзакций с большим объемом данных, которые плохо сжимаются, а также в цепях или в периоды, когда данные L1 стоят дорого.
Чтобы узнать, сколько заплатит конкретная транзакция, вызовите `getL1Fee` в [предустановленном контракте `GasPriceOracle`](https://specs.optimism.io/protocol/predeploys.html#gaspriceoracle) с неподписанной транзакцией.
Например, используя `cast` из [Foundry](https://getfoundry.sh/introduction/installation/):

```sh
TX=$(cast mktx --raw-unsigned --from <your address> --chain 10 --nonce 0 --gas-limit 100000 \
  --priority-gas-price 1000000 --gas-price 1000000 <destination address> <calldata>)
cast call 0x420000000000000000000000000000000000000F "getL1Fee(bytes)(uint256)" $TX --rpc-url https://mainnet.optimism.io
```

Результат указан в Wei.

### ABI {#the-abi}

Подавляющее большинство транзакций обращаются к контракту с внешнего аккаунта (EOA).
Большинство контрактов написаны на Solidity и интерпретируют свое поле данных в соответствии с [двоичным интерфейсом приложения (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Однако ABI был разработан для L1, где байт данных вызова стоит примерно столько же, сколько четыре арифметические операции, а не для L2, где (в ценах 2022 года) байт данных вызова стоит более тысячи арифметических операций.
Данные вызова делятся следующим образом:

| Раздел | Длина | Байты | Потраченные впустую байты | Потраченный впустую газ | Необходимые байты | Необходимый газ |
| ------------------- | -----: | ----: | -----------: | ---------: | --------------: | ------------: |
| Селектор функции | 4 | 0-3 | 3 | 48 | 1 | 16 |
| Нули | 12 | 4-15 | 12 | 48 | 0 | 0 |
| Адрес назначения | 20 | 16-35 | 0 | 0 | 20 | 320 |
| Сумма | 32 | 36-67 | 17 | 68 | 15 | 240 |
| Итого | 68 | | | 164 | | 576 |

Объяснение:

- **Селектор функции**: В контракте менее 256 функций, поэтому мы можем различать их с помощью одного байта.
  Эти байты обычно не равны нулю и поэтому [стоят шестнадцать газа](https://eips.ethereum.org/EIPS/eip-2028).
- **Нули**: Эти байты всегда равны нулю, потому что для хранения двадцатибайтового адреса не требуется тридцатидвухбайтовое слово.
  Байты, содержащие ноль, стоят четыре газа ([см. желтую книгу](https://ethereum.github.io/yellowpaper/paper.pdf), Приложение G,
  стр. 27, значение для `G`<sub>`txdatazero`</sub>).
- **Сумма**: Если мы предположим, что в этом контракте `decimals` равно восемнадцати (нормальное значение), а максимальное количество токенов, которое мы переводим, будет 10<sup>18</sup>, мы получим максимальную сумму 10<sup>36</sup>.
  256<sup>15</sup> &gt; 10<sup>36</sup>, поэтому пятнадцати байт достаточно.

Потеря 164 газа на L1 обычно незначительна. Транзакция стоит как минимум [21 000 газа](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), поэтому дополнительные 0.8% не имеют значения.
Однако на L2 в 2022 году все было иначе. Почти вся стоимость транзакции заключалась в ее записи на L1.
В дополнение к данным вызова транзакции имеется 109 байт заголовка транзакции (адрес назначения, подпись и т. д.).
Таким образом, общая стоимость составляет `109*16+576+164=2484`, и мы тратим впустую около 6.6% от нее.

## Снижение затрат, когда вы не контролируете место назначения {#reducing-costs-when-you-dont-control-the-destination}

Предполагая, что у вас нет контроля над контрактом назначения, вы все равно можете использовать решение, подобное [этому](https://github.com/qbzzt/ethereum.org-20220330-shortABI).

Для его запуска вам понадобятся [Node.js](https://nodejs.org/) и git:

```sh
git clone https://github.com/qbzzt/ethereum.org-20220330-shortABI.git
cd ethereum.org-20220330-shortABI
npm install
npx hardhat test
```

Тест развертывает контракты во встроенной локальной сети Hardhat, поэтому вам не нужны ETH.
В репозитории используется Hardhat 2.9, поэтому в текущих версиях Node.js он предупреждает, что ваша версия Node.js не поддерживается, но тест все равно проходит.

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
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

Адрес токена, для которого мы являемся прокси-контрактом.

```solidity

    /**
     * @dev Укажите адрес токена
     * @param tokenAddr_ Адрес контракта ERC-20
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
На L1 может потребоваться пропустить эти проверки для экономии газа, но на L2 газ чрезвычайно дешев, что позволяет проводить любые проверки на корректность, которые мы можем придумать.

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
Это имеет дополнительное преимущество: значение перемещается в правую часть поля, поэтому это само значение, а не значение, умноженное на 256<sup>в какой-то степени</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

Когда вызов контракта Solidity не соответствует ни одной из сигнатур функций, он вызывает [функцию `fallback()`](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (при условии, что она есть).
В случае `CalldataInterpreter` _любой_ вызов попадает сюда, потому что нет других функций `external` или `public`.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Чтение первого байта данных вызова, который сообщает нам функцию.
Есть две причины, по которым функция может быть недоступна здесь:

1. Функции, которые являются `pure` или `view`, не изменяют состояние и не стоят газа (при вызове офчейн).
   Нет смысла пытаться снизить их стоимость в газе.
2. Функции, которые полагаются на [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties).
   Значением `msg.sender` будет адрес `CalldataInterpreter`, а не вызывающей стороны.

К сожалению, [если посмотреть на спецификации ERC-20](https://eips.ethereum.org/EIPS/eip-20), остается только одна стандартная функция, `transfer` (потому что мы можем вызвать `transferFrom`).
У нашего тестового токена также есть `faucet`, которую мы можем поддерживать, потому что мы можем перевести токены обратно тому, кто нас вызвал.

```solidity

        // Вызовите методы токена, изменяющие состояние, используя
        // информацию из данных вызова

        // кран
        if (_func == 1) {
```

Вызов `faucet()`, который не имеет параметров.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

После вызова `token.faucet()` мы получаем токены. Однако, как прокси-контракту, нам **не нужны** токены.
Они нужны внешнему аккаунту (EOA) или контракту, который нас вызвал.
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

Мы разрешаем вызывающим сторонам переводить только те токены, которыми они владеют.

```solidity
                address(uint160(calldataVal(1, 20))),
```

Адрес назначения начинается с байта №1 (байт №0 — это функция).
Как адрес, он имеет длину 20 байт.

```solidity
                calldataVal(21, 2)
```

Для этого конкретного контракта мы предполагаем, что максимальное количество токенов, которое кто-либо захочет перевести, помещается в два байта (менее 65536).

```solidity
            );
        }
```

В целом, перевод занимает 23 байта данных вызова:

| Раздел | Длина | Байты |
| ------------------- | -----: | ----: |
| Селектор функции | 1 | 0 |
| Адрес назначения | 20 | 1-20 |
| Сумма | 2 | 21-22 |

```solidity
    }   // fallback

}       // контракт CalldataInterpreter
```

### test.js {#test-js}

[Этот модульный тест на JavaScript](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) показывает нам, как использовать этот механизм (и как убедиться, что он работает правильно).
Я предполагаю, что вы понимаете [chai](https://www.chaijs.com/) и [ethers](https://docs.ethers.org/v5/), и объясню только те части, которые конкретно относятся к контракту.

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

Мы вызываем [метод `sendTransaction` подписанта](https://docs.ethers.org/v5/api/signer/#Signer-sendTransaction), потому что мы уже указали место назначения (`faucetTx.to`) и нам нужно, чтобы транзакция была подписана.

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
Чтобы запустить его, переключитесь на эту ветку в репозитории, который вы клонировали ранее, и запустите тест снова:

```sh
git checkout control-contract
npx hardhat test
```

Если бы контракт отвечал только на внешние транзакции, мы могли бы обойтись только одним контрактом.
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

Как [Optimism](https://docs.optimism.io/op-stack/transactions/fees#fjord), так и [Arbitrum](https://docs.arbitrum.io/how-arbitrum-works/deep-dives/gas-and-fees) теперь сжимают данные, которые они записывают на L1, и взимают плату за каждую транзакцию на основе ее сжатого размера, чтобы снизить стоимость транзакций.
Однако, как поставщики инфраструктуры, ищущие универсальные решения, наши возможности ограничены.
Как разработчик dapp, вы обладаете знаниями, специфичными для приложения, что позволяет вам оптимизировать данные вызова гораздо лучше, чем мы могли бы в универсальном решении.
Надеюсь, эта статья поможет вам найти идеальное решение для ваших нужд.

[Здесь вы можете найти больше моих работ](https://cryptodocguy.pro/).

