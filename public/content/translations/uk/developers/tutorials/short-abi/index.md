---
title: "Короткі ABI для оптимізації Calldata"
description: "Оптимізація смарт-контрактів для оптимістичних зведень"
author: "Орі Померанц"
lang: uk
tags: [ "рівень 2" ]
skill: intermediate
published: 2022-04-01
---

## Вступ {#introduction}

У цій статті ви дізнаєтеся про [оптимістичні зведення](/developers/docs/scaling/optimistic-rollups), вартість транзакцій на них і те, як ця відмінна структура витрат вимагає від нас оптимізувати інші речі, ніж на Ethereum Mainnet.
Ви також дізнаєтеся, як реалізувати цю оптимізацію.

### Повне розкриття інформації {#full-disclosure}

Я штатний співробітник [Optimism](https://www.optimism.io/), тому приклади в цій статті будуть виконуватися на Optimism.
Однак методика, описана тут, повинна так само добре працювати і для інших зведень.

### Термінологія {#terminology}

Під час обговорення зведень, термін «рівень 1» (L1) використовується для Mainnet, робочої мережі Ethereum.
Термін «рівень 2» (L2) використовується для зведення або будь-якої іншої системи, яка покладається на L1 для безпеки, але виконує більшу частину обробки поза мережею.

## Як можна ще більше знизити вартість транзакцій L2? {#how-can-we-further-reduce-the-cost-of-L2-transactions}

[Оптимістичні зведення](/developers/docs/scaling/optimistic-rollups) повинні зберігати записи про кожну історичну транзакцію, щоб кожен міг їх переглянути і переконатися, що поточний стан є правильним.
Найдешевший спосіб передати дані в Ethereum Mainnet — це записати їх як calldata.
Це рішення обрали як [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-), так і [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups).

### Вартість транзакцій L2 {#cost-of-l2-transactions}

Вартість транзакцій L2 складається з двох компонентів:

1. Обробка L2, яка зазвичай є надзвичайно дешевою
2. Сховище L1, яке прив’язане до витрат на газ у Mainnet

На момент написання цієї статті вартість газу L2 в Optimism становить 0,001 [Gwei](/developers/docs/gas/#pre-london).
З іншого боку, вартість газу L1 становить приблизно 40 gwei.
[Поточні ціни можна переглянути тут](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

Байт calldata коштує або 4 одиниці газу (якщо це нуль), або 16 одиниць газу (якщо це будь-яке інше значення).
Однією з найдорожчих операцій в EVM є запис у сховище.
Максимальна вартість запису 32-байтового слова в сховище на L2 становить 22 100 одиниць газу. Наразі це 22,1 gwei.
Отже, якщо ми зможемо заощадити один нульовий байт calldata, ми зможемо записати близько 200 байтів у сховище і все одно виграємо.

### ABI {#the-abi}

Переважна більшість транзакцій отримує доступ до контракту з зовнішнього облікового запису.
Більшість контрактів написані на Solidity і інтерпретують своє поле даних відповідно до [двійкового інтерфейсу програми (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Однак ABI було розроблено для L1, де байт calldata коштує приблизно стільки ж, скільки чотири арифметичні операції, а не для L2, де байт calldata коштує більше тисячі арифметичних операцій.
Calldata розділено таким чином:

| Розділ             | Довжина | Байти | Марно витрачені байти | Марно витрачений газ | Необхідні байти | Необхідний газ |
| ------------------ | ------: | ----: | --------------------: | -------------------: | --------------: | -------------: |
| Селектор функцій   |       4 |   0-3 |                     3 |                   48 |               1 |             16 |
| Нулі               |      12 |  4-15 |                    12 |                   48 |               0 |              0 |
| Адреса призначення |      20 | 16-35 |                     0 |                    0 |              20 |            320 |
| Сума               |      32 | 36-67 |                    17 |                   64 |              15 |            240 |
| Всього             |      68 |       |                       |                  160 |                 |            576 |

Пояснення:

- **Селектор функцій**: Контракт має менше 256 функцій, тому ми можемо розрізняти їх за допомогою одного байта.
  Ці байти зазвичай ненульові, і тому [коштують 16 одиниць газу](https://eips.ethereum.org/EIPS/eip-2028).
- **Нулі**: Ці байти завжди нульові, оскільки для двадцятибайтової адреси не потрібне тридцятидвобайтове слово для її зберігання.
  Байти, що містять нуль, коштують чотири одиниці газу ([див. Жовту книгу](https://ethereum.github.io/yellowpaper/paper.pdf), Додаток G,
  стор. 27, значення для `G`<sub>`txdatazero`</sub>).
- **Сума**: Якщо ми припустимо, що в цьому контракті `decimals` дорівнює вісімнадцяти (звичайне значення), а максимальна кількість токенів, які ми передаємо, буде 10<sup>18</sup>, ми отримаємо максимальну суму 10<sup>36</sup>.
  256<sup>15</sup> &gt; 10<sup>36</sup>, тому п'ятнадцяти байтів достатньо.

Марна витрата 160 одиниць газу на L1 зазвичай незначна. Транзакція коштує щонайменше [21 000 одиниць газу](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), тому додаткові 0,8 % не мають значення.
Однак на L2 все інакше. Майже вся вартість транзакції — це запис її на L1.
Окрім calldata транзакції, є 109 байтів заголовка транзакції (адреса призначення, підпис тощо).
Отже, загальна вартість становить `109*16+576+160=2480`, і ми марно витрачаємо близько 6,5 % від неї.

## Зниження витрат, коли ви не контролюєте призначення {#reducing-costs-when-you-dont-control-the-destination}

Якщо припустити, що ви не контролюєте контракт призначення, ви все одно можете використовувати рішення, подібне до [цього](https://github.com/qbzzt/ethereum.org-20220330-shortABI).
Розгляньмо відповідні файли.

### Token.sol {#token-sol}

[Це контракт призначення](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
Це стандартний контракт ERC-20 з однією додатковою функцією.
Ця функція `faucet` дозволяє будь-якому користувачеві отримати токени для використання.
Це зробило б робочий контракт ERC-20 марним, але полегшує життя, коли ERC-20 існує лише для тестування.

```solidity
    /**
     * @dev Надає викликаючому 1000 токенів для гри
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // функція faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[Це контракт, який транзакції повинні викликати з коротшими calldata](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
Розгляньмо його рядок за рядком.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

Нам потрібен інтерфейс контракту токена, щоб знати, як його викликати.

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

Адреса токена, для якого ми є проксі.

```solidity

    /**
     * @dev Вказує адресу токена
     * @param tokenAddr_ адреса контракту ERC-20
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // конструктор
```

Адреса токена — це єдиний параметр, який нам потрібно вказати.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

Читання значення з calldata.

```solidity
        uint _retVal;

        require(length < 0x21,
            "ліміт довжини calldataVal — 32 байти");

        require(length + startByte <= msg.data.length,
            "calldataVal намагається читати за межами calldatasize");
```

Ми завантажимо одне 32-байтове (256-бітне) слово в пам'ять і видалимо байти, які не є частиною потрібного нам поля.
Цей алгоритм не працює для значень, довших за 32 байти, і, звичайно, ми не можемо читати за межами calldata.
На L1 може знадобитися пропустити ці тести для економії газу, але на L2 газ надзвичайно дешевий, що дозволяє проводити будь-які перевірки на адекватність, які тільки можна уявити.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Ми могли б скопіювати дані з виклику `fallback()` (див. нижче), але простіше використовувати [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html), мову асемблера EVM.

Тут ми використовуємо [опкод CALLDATALOAD](https://www.evm.codes/#35), щоб прочитати байти від `startByte` до `startByte+31` у стек.
Загалом, синтаксис опкоду в Yul такий: `<opcode name>(<перше значення стека, якщо є>,<друге значення стека, якщо є>...)`.

```solidity

        _retVal = _retVal >> (256-length*8);
```

Лише найзначніші байти `length` є частиною поля, тому ми використовуємо [логічний зсув вправо](https://en.wikipedia.org/wiki/Logical_shift), щоб позбутися інших значень.
Це має додаткову перевагу переміщення значення праворуч від поля, тому це саме значення, а не значення, помножене на 256<sup>щось</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

Коли виклик контракту Solidity не відповідає жодному з підписів функцій, він викликає [функцію `fallback()`](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (за умови, що вона існує).
У випадку `CalldataInterpreter` сюди потрапляє _будь-який_ виклик, оскільки немає інших `external` або `public` функцій.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Прочитайте перший байт calldata, який повідомляє нам про функцію.
Існує дві причини, чому функція тут не буде доступна:

1. Функції `pure` або `view` не змінюють стан і не вимагають витрат газу (при виклику поза ланцюгом).
   Немає сенсу намагатися знизити вартість газу для них.
2. Функції, які покладаються на [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties).
   Значення `msg.sender` буде адресою `CalldataInterpreter`, а не викликаючого.

На жаль, [якщо подивитися на специфікації ERC-20](https://eips.ethereum.org/EIPS/eip-20), залишається лише одна функція, `transfer`.
Це залишає нам лише дві функції: `transfer` (оскільки ми можемо викликати `transferFrom`) і `faucet` (оскільки ми можемо передати токени назад тому, хто нас викликав).

```solidity

        // Викликаємо методи токена, що змінюють стан,
        // використовуючи інформацію з calldata

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
Вони потрібні EOA (зовнішньому акаунту) або контракту, який нас викликав.
Тому ми передаємо всі наші токени тому, хто нас викликав.

```solidity
        // переказ (припускаємо, що маємо дозвіл на це)
        if (_func == 2) {
```

Для передачі токенів потрібні два параметри: адреса призначення та сума.

```solidity
            token.transferFrom(
                msg.sender,
```

Ми дозволяємо викликаючим передавати лише ті токени, якими вони володіють

```solidity
                address(uint160(calldataVal(1, 20))),
```

Адреса призначення починається з байта №1 (байт №0 — це функція).
Як адреса, він має довжину 20 байтів.

```solidity
                calldataVal(21, 2)
```

Для цього конкретного контракту ми припускаємо, що максимальна кількість токенів, яку будь-хто захоче передати, вміщується у два байти (менше 65536).

```solidity
            );
        }
```

Загалом, переказ займає 35 байтів calldata:

| Розділ             | Довжина | Байти |
| ------------------ | ------: | ----: |
| Селектор функцій   |       1 |     0 |
| Адреса призначення |      32 |  1-32 |
| Сума               |       2 | 33-34 |

```solidity
    }   // fallback

}       // контракт CalldataInterpreter
```

### test.js {#test-js}

[Цей JavaScript юніт-тест](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) показує, як використовувати цей механізм (і як перевірити, чи він працює правильно).
Я припускаю, що ви розумієте [chai](https://www.chaijs.com/) та [ethers](https://docs.ethers.io/v5/) і поясню лише ті частини, які стосуються безпосередньо контракту.

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Має дозволяти нам використовувати токени", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Адреса токена:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("Адреса CalldataInterpreter:", cdi.address)

    const signer = await ethers.getSigner()
```

Ми починаємо з розгортання обох контрактів.

```javascript
    // Отримати токени для гри
    const faucetTx = {
```

Ми не можемо використовувати високорівневі функції, які зазвичай використовуємо (наприклад, `token.faucet()`) для створення транзакцій, оскільки ми не дотримуємося ABI.
Натомість, ми повинні створити транзакцію самостійно, а потім надіслати її.

```javascript
      to: cdi.address,
      data: "0x01"
```

Є два параметри, які ми повинні надати для транзакції:

1. `to`, адреса призначення.
   Це контракт-інтерпретатор calldata.
2. `data`, calldata для надсилання.
   У випадку виклику faucet, дані — це один байт, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

Ми викликаємо метод [signer's `sendTransaction` method](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction), тому що ми вже вказали призначення (`faucetTx.to`), і нам потрібно, щоб транзакція була підписана.

```javascript
// Перевіряємо, чи faucet правильно надає токени
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Тут ми перевіряємо баланс.
Немає потреби економити на газі у функціях `view`, тому ми просто запускаємо їх у звичайному режимі.

```javascript
// Надаємо CDI дозвіл (затвердження не можна проксіювати)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Надайте інтерпретатору calldata дозвіл на виконання переказів.

```javascript
// Переказ токенів
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Створення транзакції переказу. Перший байт — "0x02", за ним іде адреса призначення, і, нарешті, сума (0x0100, що є 256 у десятковій системі).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Перевіряємо, що у нас на 256 токенів менше
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // І що наш одержувач їх отримав
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## Зниження витрат, коли ви контролюєте контракт призначення {#reducing-the-cost-when-you-do-control-the-destination-contract}

Якщо ви контролюєте контракт призначення, ви можете створювати функції, які обходять перевірки `msg.sender`, оскільки вони довіряють інтерпретатору calldata.
[Ви можете побачити приклад, як це працює, тут, у гілці `control-contract`](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

Якби контракт реагував лише на зовнішні транзакції, ми могли б обійтися лише одним контрактом.
Однак, це порушило б [компонованість](/developers/docs/smart-contracts/composability/).
Набагато краще мати контракт, який відповідає на звичайні виклики ERC-20, і інший контракт, який відповідає на транзакції з короткими calldata.

### Token.sol {#token-sol-2}

У цьому прикладі ми можемо змінити `Token.sol`.
Це дозволяє нам мати низку функцій, які може викликати лише проксі.
Ось нові частини:

```solidity
    // Єдина адреса, якій дозволено вказувати адресу CalldataInterpreter
    address owner;

    // Адреса CalldataInterpreter
    address proxy = address(0);
```

Контракт ERC-20 повинен знати ідентичність авторизованого проксі.
Однак ми не можемо встановити цю змінну в конструкторі, оскільки ми ще не знаємо значення.
Цей контракт створюється першим, оскільки проксі очікує адресу токена у своєму конструкторі.

```solidity
    /**
     * @dev Викликає конструктор ERC20.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

Адреса творця (називається `owner`) зберігається тут, оскільки це єдина адреса, якій дозволено встановлювати проксі.

```solidity
    /**
     * @dev встановлює адресу для проксі (CalldataInterpreter).
     * Може бути викликана лише один раз власником
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Може бути викликана лише власником");
        require(proxy == address(0), "Проксі вже встановлено");

        proxy = _proxy;
    }    // функція setProxy
```

Проксі має привілейований доступ, оскільки він може обійти перевірки безпеки.
Щоб переконатися, що ми можемо довіряти проксі, ми дозволяємо `owner` викликати цю функцію, і лише один раз.
Якщо proxy має реальне значення (а не нуль), це значення не може змінитися, тож навіть якщо власник вирішить стати шахраєм або розкриється мнемоніка для цього, ми все ще в безпеці.

```solidity
    /**
     * @dev Деякі функції можуть бути викликані лише проксі.
     */
    modifier onlyProxy {
```

Це функція-[`модифікатор`](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), вона змінює спосіб роботи інших функцій.

```solidity
      require(msg.sender == proxy);
```

По-перше, переконайтеся, що нас викликав проксі-сервер і ніхто інший.
Якщо ні, `revert`.

```solidity
      _;
    }
```

Якщо так, запустіть функцію, яку ми змінюємо.

```solidity
   /* Функції, що дозволяють проксі фактично виконувати роль проксі для акаунтів */

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

Це три операції, які зазвичай вимагають, щоб повідомлення надходило безпосередньо від суб’єкта, який передає токени або затверджує дозвіл.
Тут ми маємо проксі-версію цих операцій, яка:

1. Змінено `onlyProxy()`, тому нікому іншому не дозволено керувати ними.
2. Отримує адресу, яка зазвичай була б `msg.sender` як додатковий параметр.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

Інтерпретатор calldata майже ідентичний наведеному вище, за винятком того, що проксі-функції отримують параметр `msg.sender` і немає потреби у дозволі на `transfer`.

```solidity
        // переказ (дозвіл не потрібен)
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

Існує кілька змін між попереднім кодом тестування та цим.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

Нам потрібно вказати контракту ERC-20, якому проксі довіряти

```js
console.log("Адреса CalldataInterpreter:", cdi.address)

// Потрібні два підписувачі для перевірки дозволів
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

Щоб перевірити `approve()` і `transferFrom()`, нам потрібен другий підписувач.
Ми називаємо його `poorSigner`, оскільки він не отримує жодних наших токенів (звичайно, йому потрібен ETH).

```js
// Переказ токенів
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

Оскільки контракт ERC-20 довіряє проксі (`cdi`), нам не потрібен дозвіл на ретрансляцію переказів.

```js
// approve і transferFrom
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

// Перевіряємо, що комбінація approve / transferFrom була виконана правильно
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

Перевірте дві нові функції.
Зверніть увагу, що `transferFromTx` вимагає два параметри адреси: той, хто надає дозвіл, і одержувач.

## Висновок {#conclusion}

І [Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92), і [Arbitrum](https://developer.offchainlabs.com/docs/special_features) шукають способи зменшити розмір calldata, що записуються в L1, а отже, і вартість транзакцій.
Однак, як у постачальників інфраструктури, що шукають загальні рішення, наші можливості обмежені.
Як розробник dapp, ви володієте знаннями, специфічними для вашої програми, що дозволяє оптимізувати ваші calldata набагато краще, ніж ми могли б у загальному рішенні.
Сподіваємося, ця стаття допоможе вам знайти ідеальне рішення для ваших потреб.

[Більше моїх робіт дивіться тут](https://cryptodocguy.pro/).

