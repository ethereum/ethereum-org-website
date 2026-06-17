---
title: "Короткі ABI для оптимізації даних виклику"
description: Оптимізація смарт-контрактів для Optimistic-ролапів
author: Орі Померанц
lang: uk
tags: ["рівень 2 (l2)"]
skill: intermediate
breadcrumb: Короткі ABI
published: 2022-04-01
---

## Вступ {#introduction}

У цій статті ви дізнаєтеся про [optimistic-ролапи](/developers/docs/scaling/optimistic-rollups), вартість транзакцій у них і те, як ця інша структура витрат вимагає від нас оптимізації інших речей, ніж у головній мережі Ethereum.
Ви також дізнаєтеся, як реалізувати цю оптимізацію.

### Повне розкриття інформації {#full-disclosure}

Я працюю в [Optimism](https://www.optimism.io/) на повну ставку, тому приклади в цій статті будуть виконуватися в Optimism.
Однак метод, описаний тут, має так само добре працювати й для інших ролапів.

### Термінологія {#terminology}

Під час обговорення ролапів термін «рівень 1 (l1)» використовується для Головної мережі (Mainnet), робочої мережі Етеріум.
Термін «рівень 2 (l2)» використовується для ролапу або будь-якої іншої системи, яка покладається на рівень 1 (l1) щодо безпеки, але виконує більшу частину своєї обробки позамережево.

## Як ми можемо ще більше знизити вартість транзакцій рівня 2 (l2)? {#how-can-we-further-reduce-the-cost-of-l2-transactions}

[Optimistic-ролапи](/developers/docs/scaling/optimistic-rollups) повинні зберігати запис кожної історичної транзакції, щоб будь-хто міг переглянути їх і переконатися, що поточний стан є правильним.
Найдешевший спосіб передати дані в головну мережу Ethereum — записати їх як дані виклику (calldata).
Це рішення обрали як [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-), так і [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups).

### Вартість транзакцій рівня 2 (l2) {#cost-of-l2-transactions}

Вартість транзакцій рівня 2 (l2) складається з двох компонентів:

1. Обробка на рівні 2 (l2), яка зазвичай надзвичайно дешева
2. Зберігання на рівні 1 (l1), яке прив'язане до вартості газу в Головній мережі

На момент написання цієї статті вартість газу рівня 2 (l2) в Optimism становить 0.001 [Gwei](/developers/docs/gas/#pre-london).
З іншого боку, вартість газу рівня 1 (l1) становить приблизно 40 Gwei.
[Ви можете переглянути поточні ціни тут](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

Байт даних виклику коштує або 4 газу (якщо він нульовий), або 16 газу (якщо він має будь-яке інше значення).
Однією з найдорожчих операцій в EVM є запис у сховище.
Максимальна вартість запису 32-байтового слова у сховище на рівні 2 (l2) становить 22100 газу. Наразі це 22.1 Gwei.
Отже, якщо ми зможемо заощадити хоча б один нульовий байт даних виклику, ми зможемо записати близько 200 байтів у сховище і все одно залишитися у виграші.

### ABI {#the-abi}

Переважна більшість транзакцій звертається до контракту з акаунта, що належить зовнішньому власнику (EOA).
Більшість контрактів написані на Solidity та інтерпретують своє поле даних відповідно до [двійкового інтерфейсу застосунку (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Однак ABI був розроблений для рівня 1 (l1), де байт даних виклику коштує приблизно стільки ж, скільки чотири арифметичні операції, а не для рівня 2 (l2), де байт даних виклику коштує понад тисячу арифметичних операцій.
Дані виклику поділяються таким чином:

| Розділ             | Довжина | Байти | Витрачені марно байти | Витрачений марно газ | Необхідні байти | Необхідний газ |
| ------------------ | ------: | ----: | --------------------: | -------------------: | --------------: | -------------: |
| Селектор функції   |       4 |   0-3 |                     3 |                   48 |               1 |             16 |
| Нулі               |      12 |  4-15 |                    12 |                   48 |               0 |              0 |
| Адреса призначення |      20 | 16-35 |                     0 |                    0 |              20 |            320 |
| Сума               |      32 | 36-67 |                    17 |                   64 |              15 |            240 |
| Разом              |      68 |       |                       |                  160 |                 |            576 |

Пояснення:

- **Селектор функції**: Контракт має менше ніж 256 функцій, тому ми можемо розрізняти їх за допомогою одного байта.
  Ці байти зазвичай ненульові, а тому [коштують шістнадцять газу](https://eips.ethereum.org/EIPS/eip-2028).
- **Нулі**: Ці байти завжди дорівнюють нулю, оскільки для зберігання двадцятибайтової адреси не потрібне тридцятидвохбайтове слово.
  Байти, що містять нуль, коштують чотири газу ([див. Жовту книгу](https://ethereum.github.io/yellowpaper/paper.pdf), Додаток G,
  стор. 27, значення для `G`<sub>`txdatazero`</sub>).
- **Сума**: Якщо ми припустимо, що в цьому контракті `decimals` дорівнює вісімнадцяти (стандартне значення), а максимальна кількість токенів, які ми переказуємо, становитиме 10<sup>18</sup>, ми отримаємо максимальну суму 10<sup>36</sup>.
  256<sup>15</sup> &gt; 10<sup>36</sup>, тому п'ятнадцяти байтів достатньо.

Марна витрата 160 газу на рівні 1 (l1) зазвичай є незначною. Транзакція коштує щонайменше [21 000 газу](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), тому додаткові 0.8% не мають значення.
Однак на рівні 2 (l2) все інакше. Майже вся вартість транзакції полягає в її записі на рівень 1 (l1).
Окрім даних виклику транзакції, є 109 байтів заголовка транзакції (адреса призначення, підпис тощо).
Тому загальна вартість становить `109*16+576+160=2480`, і ми марно витрачаємо близько 6.5% від неї.

## Зниження витрат, коли ви не контролюєте місце призначення {#reducing-costs-when-you-dont-control-the-destination}

Припускаючи, що ви не маєте контролю над контрактом призначення, ви все одно можете використати рішення, подібне до [цього](https://github.com/qbzzt/ethereum.org-20220330-shortABI).
Давайте розглянемо відповідні файли.

### Token.sol {#token-sol}

[Це контракт призначення](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
Це стандартний контракт ERC-20 з однією додатковою функцією.
Ця функція `faucet` дозволяє будь-якому користувачеві отримати трохи токенів для використання.
Це зробило б робочий контракт ERC-20 марним, але це полегшує життя, коли ERC-20 існує лише для сприяння тестуванню.

```solidity
    /**
     * @dev Надає тому, хто викликає, 1000 токенів для гри
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[Це контракт, який транзакції повинні викликати з коротшими даними виклику](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
Давайте розглянемо його рядок за рядком.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

Нам потрібна функція токена, щоб знати, як її викликати.

```solidity
контракт CalldataInterpreter {

    OrisUselessToken public immutable token;
```

Адреса токена, для якого ми є проксі-контрактом.

```solidity

    /**
     * @dev Вкажіть адресу токена
     * @param tokenAddr_ адреса контракту ERC-20
     */
    конструктор(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

Адреса токена — це єдиний параметр, який нам потрібно вказати.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

Зчитування значення з даних виклику.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

Ми збираємося завантажити одне 32-байтове (256-бітне) слово в пам'ять і видалити байти, які не є частиною потрібного нам поля.
Цей алгоритм не працює для значень, довших за 32 байти, і, звичайно, ми не можемо читати за межами кінця даних виклику.
На рівні 1 (l1) може знадобитися пропустити ці перевірки, щоб заощадити газ, але на рівні 2 (l2) газ надзвичайно дешевий, що дозволяє проводити будь-які перевірки коректності, які ми тільки можемо придумати.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Ми могли б скопіювати дані з виклику до `fallback()` (див. нижче), але простіше використати [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html), мову асемблера EVM.

Тут ми використовуємо [опкод CALLDATALOAD](https://www.evm.codes/#35), щоб зчитати байти з `startByte` по `startByte+31` у стек.
Загалом, синтаксис опкоду в Yul такий: `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`.

```solidity

        _retVal = _retVal >> (256-length*8);
```

Лише найбільш значущі `length` байтів є частиною поля, тому ми виконуємо [зсув вправо](https://en.wikipedia.org/wiki/Logical_shift), щоб позбутися інших значень.
Це має додаткову перевагу: значення переміщується в праву частину поля, тому це саме значення, а не значення, помножене на 256<sup>щось</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

Коли виклик контракту Solidity не збігається з жодною із сигнатур функцій, він викликає [функцію `fallback()`](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (за умови, що вона існує).
У випадку з `CalldataInterpreter`, _будь-який_ виклик потрапляє сюди, оскільки немає інших функцій `external` або `public`.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Зчитуємо перший байт даних виклику, який вказує нам на функцію.
Є дві причини, чому функція може бути недоступною тут:

1. Функції, які є `pure` або `view`, не змінюють стан і не коштують газу (при позамережевому виклику).
   Немає сенсу намагатися зменшити їхню вартість у газі.
2. Функції, які покладаються на [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties).
   Значенням `msg.sender` буде адреса `CalldataInterpreter`, а не того, хто викликає.

На жаль, [дивлячись на специфікації ERC-20](https://eips.ethereum.org/EIPS/eip-20), це залишає лише одну функцію — `transfer`.
Це залишає нам лише дві функції: `transfer` (оскільки ми можемо викликати `transferFrom`) та `faucet` (оскільки ми можемо переказати токени назад тому, хто нас викликав).

```solidity

        // Викликати методи токена, що змінюють стан, використовуючи
        // інформацію з даних виклику

        // faucet
        if (_func == 1) {
```

Виклик `faucet()`, який не має параметрів.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

Після виклику `token.faucet()` ми отримуємо токени. Однак, як проксі-контракту, нам не **потрібні** токени.
Вони потрібні EOA (акаунту, що належить зовнішньому власнику) або контракту, який нас викликав.
Тому ми переказуємо всі наші токени тому, хто нас викликав.

```solidity
        // переказ (припускаємо, що у нас є дозвіл на це)
        if (_func == 2) {
```

Переказ токенів вимагає двох параметрів: адреси призначення та суми.

```solidity
            token.transferFrom(
                msg.sender,
```

Ми дозволяємо тим, хто викликає, переказувати лише ті токени, якими вони володіють

```solidity
                address(uint160(calldataVal(1, 20))),
```

Адреса призначення починається з байта №1 (байт №0 — це функція).
Як адреса, вона має довжину 20 байтів.

```solidity
                calldataVal(21, 2)
```

Для цього конкретного контракту ми припускаємо, що максимальна кількість токенів, яку будь-хто захоче переказати, вміщується у два байти (менше ніж 65536).

```solidity
            );
        }
```

Загалом, переказ займає 35 байтів даних виклику:

| Розділ             | Довжина | Байти |
| ------------------ | ------: | ----: |
| Селектор функції   |       1 |     0 |
| Адреса призначення |      32 |  1-32 |
| Сума               |       2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[Цей модульний тест на JavaScript](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) показує нам, як використовувати цей механізм (і як перевірити, що він працює правильно).
Я припускаю, що ви розумієте [chai](https://www.chaijs.com/) та [ethers](https://docs.ethers.io/v5/), і поясню лише ті частини, які безпосередньо стосуються контракту.

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

Ми починаємо з розгортання обох контрактів.

```javascript
    // Отримати токени для гри
    const faucetTx = {
```

Ми не можемо використовувати високорівневі функції, які ми зазвичай використовуємо (наприклад, `token.faucet()`), для створення транзакцій, оскільки ми не дотримуємося ABI.
Натомість ми повинні створити транзакцію самостійно, а потім надіслати її.

```javascript
      to: cdi.address,
      data: "0x01"
```

Є два параметри, які нам потрібно надати для транзакції:

1. `to`, адреса призначення.
   Це контракт інтерпретатора даних виклику.
2. `data`, дані виклику для надсилання.
   У випадку виклику крана дані складаються з одного байта — `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

Ми викликаємо [метод `sendTransaction` підписанта](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction), оскільки ми вже вказали місце призначення (`faucetTx.to`) і нам потрібно, щоб транзакція була підписана.

```javascript
// Перевірити, чи faucet надає токени правильно
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Тут ми перевіряємо баланс.
Немає потреби економити газ на функціях `view`, тому ми просто запускаємо їх як зазвичай.

```javascript
// Надати CDI дозвіл (схвалення не можуть бути проксійовані)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Надаємо інтерпретатору даних виклику дозвіл на виконання переказів.

```javascript
// Переказ токенів
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Створюємо транзакцію переказу. Перший байт — «0x02», за ним іде адреса призначення, і, нарешті, сума (0x0100, що дорівнює 256 у десятковій системі).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Перевірити, що у нас на 256 токенів менше
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // І що наше місце призначення отримало їх
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## Зниження витрат, коли ви контролюєте контракт призначення {#reducing-the-cost-when-you-do-control-the-destination-contract}

Якщо ви маєте контроль над контрактом призначення, ви можете створити функції, які обходять перевірки `msg.sender`, оскільки вони довіряють інтерпретатору даних виклику.
[Ви можете побачити приклад того, як це працює, тут, у гілці `control-contract`](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

Якби контракт відповідав лише на зовнішні транзакції, ми могли б обійтися лише одним контрактом.
Однак це порушило б [компонованість](/developers/docs/smart-contracts/composability/).
Набагато краще мати контракт, який відповідає на звичайні виклики ERC-20, і ще один контракт, який відповідає на транзакції з короткими даними виклику.

### Token.sol {#token-sol-2}

У цьому прикладі ми можемо змінити `Token.sol`.
Це дозволяє нам мати низку функцій, які може викликати лише проксі-контракт.
Ось нові частини:

```solidity
    // Єдина адреса, якій дозволено вказувати адресу CalldataInterpreter
    address owner;

    // Адреса CalldataInterpreter
    address proxy = address(0);
```

Контракт ERC-20 повинен знати ідентифікатор авторизованого проксі-контракту.
Однак ми не можемо встановити цю змінну в конструкторі, оскільки ми ще не знаємо її значення.
Цей контракт створюється першим, оскільки проксі-контракт очікує адресу токена у своєму конструкторі.

```solidity
    /**
     * @dev Викликає конструктор ERC-20.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

Адреса творця (називається `owner`) зберігається тут, оскільки це єдина адреса, якій дозволено встановлювати проксі-контракт.

```solidity
    /**
     * @dev встановити адресу для проксі (CalldataInterpreter).
     * Може бути викликано лише один раз власником
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

Проксі-контракт має привілейований доступ, оскільки він може обходити перевірки безпеки.
Щоб переконатися, що ми можемо довіряти проксі-контракту, ми дозволяємо викликати цю функцію лише `owner`, і лише один раз.
Щойно `proxy` отримає реальне значення (не нуль), це значення неможливо буде змінити, тому навіть якщо власник вирішить стати зловмисником або його мнемонічна фраза буде розкрита, ми все одно будемо в безпеці.

```solidity
    /**
     * @dev Деякі функції можуть бути викликані лише через проксі.
     */
    modifier onlyProxy {
```

Це [функція `modifier`](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), вона змінює спосіб роботи інших функцій.

```solidity
      require(msg.sender == proxy);
```

Спочатку перевіряємо, чи нас викликав проксі-контракт і ніхто інший.
Якщо ні, виконується `revert`.

```solidity
      _;
    }
```

Якщо так, запускаємо функцію, яку ми модифікуємо.

```solidity
   /* Функції, які дозволяють проксі фактично виступати проксі для акаунтів */

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

Це три операції, які зазвичай вимагають, щоб повідомлення надходило безпосередньо від суб'єкта, що переказує токени або затверджує дозвіл.
Тут ми маємо проксі-версію цих операцій, яка:

1. Модифікована за допомогою `onlyProxy()`, тому нікому іншому не дозволено ними керувати.
2. Отримує адресу, яка зазвичай була б `msg.sender`, як додатковий параметр.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

Інтерпретатор даних виклику майже ідентичний наведеному вище, за винятком того, що проксі-функції отримують параметр `msg.sender` і немає потреби в дозволі для `transfer`.

```solidity
        // переказ (немає потреби в дозволі)
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

Між попереднім кодом тестування та цим є кілька змін.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

Нам потрібно вказати контракту ERC-20, якому проксі-контракту довіряти

```js
console.log("CalldataInterpreter addr:", cdi.address)

// Потрібні два підписанти для перевірки дозволів
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

Щоб перевірити `approve()` та `transferFrom()`, нам потрібен другий підписант.
Ми називаємо його `poorSigner`, оскільки він не отримує жодного з наших токенів (звісно, йому потрібно мати ETH).

```js
// Переказ токенів
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

Оскільки контракт ERC-20 довіряє проксі-контракту (`cdi`), нам не потрібен дозвіл для ретрансляції переказів.

```js
// схвалення та transferFrom
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

// Перевірити, чи комбінація approve / transferFrom була виконана правильно
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

Тестуємо дві нові функції.
Зверніть увагу, що `transferFromTx` вимагає двох параметрів адреси: того, хто надає дозвіл, і того, хто його отримує.

## Висновок {#conclusion}

Як [Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92), так і [Arbitrum](https://developer.offchainlabs.com/docs/special_features) шукають способи зменшити розмір даних виклику, що записуються на рівень 1 (l1), і, відповідно, вартість транзакцій.
Однак, як постачальники інфраструктури, що шукають універсальні рішення, наші можливості обмежені.
Як розробник децентралізованого застосунку (dapp), ви маєте знання, специфічні для вашого застосунку, що дозволяє вам оптимізувати ваші дані виклику набагато краще, ніж ми могли б це зробити в універсальному рішенні.
Сподіваємося, ця стаття допоможе вам знайти ідеальне рішення для ваших потреб.

[Більше моїх робіт можна знайти тут](https://cryptodocguy.pro/).