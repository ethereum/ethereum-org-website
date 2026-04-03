---
title: "Все, що ви можете кешувати"
description: "Дізнайтеся, як створити та використовувати контракт кешування для дешевших транзакцій rollup"
author: Ori Pomerantz
tags: [ "рівень 2", "кешування", "сховище" ]
skill: intermediate
published: 2022-09-15
lang: uk
---

Під час використання зведень вартість байта в транзакції набагато дорожча за вартість слоту зберігання. Тому є сенс кешувати якомога більше інформації ончейн.

У цій статті ви дізнаєтеся, як створити та використовувати контракт кешування таким чином, щоб будь-яке значення параметра, яке, ймовірно, буде використовуватися кілька разів, кешувалося та було доступним для використання (після першого разу) з набагато меншою кількістю байтів, і як написати офчейн-код, який використовує цей кеш.

Якщо ви хочете пропустити статтю і просто переглянути вихідний код, [він тут](https://github.com/qbzzt/20220915-all-you-can-cache). Стек розробки — [Foundry](https://getfoundry.sh/introduction/installation/).

## Загальний дизайн {#overall-design}

Для простоти припустимо, що всі параметри транзакції мають тип `uint256` і довжину 32 байти. Коли ми отримуємо транзакцію, ми аналізуємо кожен параметр таким чином:

1. Якщо перший байт — `0xFF`, візьміть наступні 32 байти як значення параметра та запишіть його в кеш.

2. Якщо перший байт — `0xFE`, візьміть наступні 32 байти як значення параметра, але _не_ записуйте його в кеш.

3. Для будь-якого іншого значення візьміть верхні чотири біти як кількість додаткових байтів, а нижні чотири біти — як найстарші біти ключа кешу. Ось кілька прикладів:

   | Байти в calldata | Ключ кешу |
   | :--------------- | --------: |
   | 0x0F             |      0x0F |
   | 0x10,0x10        |      0x10 |
   | 0x12,0xAC        |    0x02AC |
   | 0x2D,0xEA, 0xD6  |  0x0DEAD6 |

## Маніпуляції з кешем {#cache-manipulation}

Кеш реалізовано в [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol). Розгляньмо його рядок за рядком.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

Ці константи використовуються для інтерпретації особливих випадків, коли ми надаємо всю інформацію і або хочемо, щоб вона була записана в кеш, або ні. Запис у кеш вимагає двох операцій [`SSTORE`](https://www.evm.codes/#55) у раніше невикористані слоти сховища вартістю 22100 газу кожна, тому ми робимо його необов'язковим.

```solidity

    mapping(uint => uint) public val2key;
```

[Відображення](https://www.geeksforgeeks.org/solidity/solidity-mappings/) між значеннями та їхніми ключами. Ця інформація необхідна для кодування значень перед відправкою транзакції.

```solidity
    // Позиція n має значення для ключа n+1, оскільки нам потрібно зберегти
    // нуль як «не в кеші».
    uint[] public key2val;
```

Ми можемо використовувати масив для відображення ключів у значення, оскільки ми призначаємо ключі, і для простоти робимо це послідовно.

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Читання неініціалізованого запису кешу");
        return key2val[_key-1];
    }  // cacheRead
```

Прочитати значення з кешу.

```solidity
    // Записати значення в кеш, якщо його там ще немає
    // Лише public, щоб тест працював
    function cacheWrite(uint _value) public returns (uint) {
        // Якщо значення вже є в кеші, повертаємо поточний ключ
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

Немає сенсу поміщати одне й те саме значення в кеш більше одного разу. Якщо значення вже є, просто поверніть наявний ключ.

```solidity
        // Оскільки 0xFE є особливим випадком, найбільший ключ, який може містити кеш
        // — це 0x0D, за яким слідують 15 0xFF. Якщо довжина кешу вже така
        // велика, відбувається помилка.
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "переповнення кешу");
```

Я не думаю, що ми колись отримаємо такий великий кеш (приблизно 1.8\*10<sup>37</sup> записів, для зберігання якого знадобилося б близько 10<sup>27</sup> ТБ). Однак я достатньо дорослий, щоб пам’ятати [«640 КБ завжди буде достатньо»](https://quoteinvestigator.com/2011/09/08/640k-enough/). Цей тест дуже дешевий.

```solidity
        // Записати значення, використовуючи наступний ключ
        val2key[_value] = key2val.length+1;
```

Додайте зворотний пошук (від значення до ключа).

```solidity
        key2val.push(_value);
```

Додайте прямий пошук (від ключа до значення). Оскільки ми присвоюємо значення послідовно, ми можемо просто додати його після останнього значення масиву.

```solidity
        return key2val.length;
    }  // cacheWrite
```

Повертає нову довжину `key2val`, яка є коміркою, де зберігається нове значення.

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

Ця функція зчитує значення з calldata довільної довжини (до 32 байтів, розмір слова).

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal: обмеження довжини — 32 байти");
        require(length + startByte <= msg.data.length,
            "_calldataVal: спроба зчитування за межами calldatasize");
```

Ця функція є внутрішньою, тому, якщо решта коду написана правильно, ці тести не потрібні. Однак вони не коштують дорого, тож ми можемо їх залишити.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Цей код написаний на [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html). Він зчитує 32-байтове значення з calldata. Це працює, навіть якщо calldata закінчується перед `startByte+32`, оскільки неініціалізований простір в EVM вважається нульовим.

```solidity
        _retVal = _retVal >> (256-length*8);
```

Нам не обов'язково потрібне 32-байтове значення. Це позбавляє від зайвих байтів.

```solidity
        return _retVal;
    } // _calldataVal


    // Зчитуємо один параметр із calldata, починаючи з _fromByte
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

Зчитування одного параметра з calldata. Зверніть увагу, що нам потрібно повернути не тільки зчитане значення, а й місцезнаходження наступного байта, оскільки параметри можуть мати довжину від 1 до 33 байтів.

```solidity
        // Перший байт вказує, як інтерпретувати решту
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity намагається зменшити кількість помилок, забороняючи потенційно небезпечні [неявні перетворення типів](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions). Зниження розрядності, наприклад з 256 біт до 8 біт, має бути явним.

```solidity

        // Зчитуємо значення, але не записуємо його в кеш
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // Зчитуємо значення і записуємо його в кеш
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // Якщо ми дійшли сюди, це означає, що нам потрібно зчитати з кешу

        // Кількість додаткових байтів для зчитування
        uint8 _extraBytes = _firstByte / 16;
```

Візьміть нижній [нібл](https://en.wikipedia.org/wiki/Nibble) і об'єднайте його з іншими байтами, щоб зчитати значення з кешу.

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // Зчитуємо n параметрів (функції знають, скільки параметрів вони очікують)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

Ми могли б отримати кількість параметрів із самої calldata, але функції, що нас викликають, знають, скільки параметрів вони очікують. Простіше дозволити їм повідомити нам.

```solidity
        // Параметри, які ми зчитуємо
        uint[] memory params = new uint[](_paramNum);

        // Параметри починаються з 4-го байта, до цього йде підпис функції
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

Зчитуйте параметри, доки не отримаєте потрібну кількість. Якщо ми вийдемо за межі calldata, `_readParams` скасує виклик.

```solidity

        return(params);
    }   // readParams

    // Для тестування _readParams, тестуємо зчитування чотирьох параметрів
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Одна велика перевага Foundry полягає в тому, що він дозволяє писати тести на Solidity ([див. Тестування кешу нижче](#testing-the-cache)). Це значно спрощує юніт-тести. Це функція, яка зчитує чотири параметри та повертає їх, щоб тест міг перевірити їхню правильність.

```solidity
    // Отримати значення, повернути байти, які його кодуватимуть (використовуючи кеш, якщо можливо)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` — це функція, яку викликає офчейн-код, щоб допомогти створити calldata, яка використовує кеш. Вона отримує одне значення і повертає байти, які його кодують. Ця функція є `view`, тому вона не потребує транзакції і при зовнішньому виклику не коштує газу.

```solidity
        uint _key = val2key[_val];

        // Значення ще немає в кеші, додаємо його
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

У [EVM](/developers/docs/evm/) весь неініціалізований простір для зберігання даних вважається нульовим. Тому, якщо ми шукаємо ключ для значення, якого немає, ми отримуємо нуль. У цьому випадку байти, що його кодують, є `INTO_CACHE` (тому наступного разу воно буде кешоване), за яким слідує фактичне значення.

```solidity
        // Якщо ключ <0x10, повертаємо його як один байт
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

Окремі байти — найпростіший випадок. Ми просто використовуємо [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat), щоб перетворити тип `bytes<n>` на масив байтів, який може мати будь-яку довжину. Незважаючи на назву, вона добре працює, якщо надати лише один аргумент.

```solidity
        // Двобайтове значення, закодоване як 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

Якщо ми маємо ключ менший за 16<sup>3</sup>, ми можемо виразити його у двох байтах. Спочатку ми перетворюємо `_key`, яке є 256-бітним значенням, у 16-бітне значення та використовуємо логічне «АБО», щоб додати кількість додаткових байтів до першого байта. Потім ми просто перетворюємо його на значення `bytes2`, яке можна конвертувати в `bytes`.

```solidity
        // Ймовірно, існує хитрий спосіб зробити наступні рядки у вигляді циклу,
        // але це функція view, тому я оптимізую для часу програміста та
        // простоти.

        if (_key < 16*256**2)
            return bytes.concat(bytes3(uint24(_key) | (0x2 * 16 * 256**2)));
        if (_key < 16*256**3)
            return bytes.concat(bytes4(uint32(_key) | (0x3 * 16 * 256**3)));
             .
             .
             .
        if (_key < 16*256**14)
            return bytes.concat(bytes15(uint120(_key) | (0xE * 16 * 256**14)));
        if (_key < 16*256**15)
            return bytes.concat(bytes16(uint128(_key) | (0xF * 16 * 256**15)));
```

Інші значення (3 байти, 4 байти тощо) обробляються так само, просто з різними розмірами полів.

```solidity
        // Якщо ми потрапили сюди, щось не так.
        revert("Помилка в encodeVal, не повинно трапитися");
```

Якщо ми потрапили сюди, це означає, що ми отримали ключ, який не менший за 16\*256<sup>15</sup>. Але `cacheWrite` обмежує ключі, тому ми не можемо навіть досягти 14\*256<sup>16</sup> (який мав би перший байт 0xFE, тому виглядав би як `DONT_CACHE`). Але нам не коштує багато додати тест на випадок, якщо майбутній програміст внесе помилку.

```solidity
    } // encodeVal

}  // Cache
```

### Тестування кешу {#testing-the-cache}

Однією з переваг Foundry є те, що [він дозволяє писати тести на Solidity](https://getfoundry.sh/forge/tests/overview/), що полегшує написання юніт-тестів. Тести для класу `Cache` знаходяться [тут](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol). Оскільки код тестування є повторюваним, як це часто буває з тестами, у цій статті пояснюються лише цікаві частини.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// Потрібно запустити `forge test -vv` для консолі.
import "forge-std/console.sol";
```

Це просто шаблонний код, необхідний для використання тестового пакета та `console.log`.

```solidity
import "src/Cache.sol";
```

Нам потрібно знати контракт, який ми тестуємо.

```solidity
contract CacheTest is Test {
    Cache cache;

    function setUp() public {
        cache = new Cache();
    }
```

Функція `setUp` викликається перед кожним тестом. У цьому випадку ми просто створюємо новий кеш, щоб наші тести не впливали один на одного.

```solidity
    function testCaching() public {
```

Тести — це функції, імена яких починаються з `test`. Ця функція перевіряє базову функціональність кешу, записуючи значення та зчитуючи їх знову.

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

Ось як ви виконуєте фактичне тестування, використовуючи [функції `assert...`](https://getfoundry.sh/reference/forge-std/std-assertions/). У цьому випадку ми перевіряємо, що значення, яке ми записали, є тим, яке ми прочитали. Ми можемо відкинути результат `cache.cacheWrite`, оскільки знаємо, що ключі кешу призначаються лінійно.

```solidity
        }
    }    // testCaching


    // Кешуємо одне й те саме значення кілька разів, переконуємося, що ключ залишається
    // тим самим
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

Спочатку ми записуємо кожне значення в кеш двічі і переконуємося, що ключі однакові (це означає, що другий запис насправді не відбувся).

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

Теоретично може існувати помилка, яка не впливає на послідовні записи в кеш. Тому тут ми робимо деякі записи, які не є послідовними, і бачимо, що значення все ще не перезаписуються.

```solidity
    // Зчитати uint з буфера пам’яті (щоб переконатися, що ми отримуємо назад параметри,
    // які ми відправили)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

Зчитування 256-бітного слова з буфера `bytes memory`. Ця утилітарна функція дозволяє нам перевірити, що ми отримуємо правильні результати, коли виконуємо виклик функції, яка використовує кеш.

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_вихід_за_межі");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul не підтримує структури даних, окрім `uint256`, тому, коли ви посилаєтеся на більш складну структуру даних, таку як буфер пам’яті `_bytes`, ви отримуєте адресу цієї структури. Solidity зберігає значення `bytes memory` як 32-байтове слово, що містить довжину, за яким слідують фактичні байти, тому, щоб отримати байт номер `_start`, нам потрібно обчислити `_bytes+32+_start`.

```solidity

        return tempUint;
    }     // toUint256

    // Підпис функції для fourParams(), люб’язно наданий
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // Просто деякі постійні значення, щоб побачити, що ми отримуємо правильні значення назад
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

Деякі константи, які нам потрібні для тестування.

```solidity
    function testReadParam() public {
```

Викличте `fourParams()`, функцію, яка використовує `readParams`, щоб перевірити, чи ми можемо правильно зчитувати параметри.

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

Ми не можемо використовувати звичайний механізм ABI для виклику функції, що використовує кеш, тому нам потрібно використовувати низькорівневий механізм [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses). Цей механізм приймає `bytes memory` на вхід і повертає його (а також логічне значення) на вихід.

```solidity
        // Перший виклик, кеш порожній
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

Корисно, щоб один і той самий контракт підтримував як кешовані функції (для викликів безпосередньо з транзакцій), так і некешовані функції (для викликів з інших смарт-контрактів). Для цього нам потрібно продовжувати покладатися на механізм Solidity для виклику правильної функції, замість того, щоб поміщати все у [функцію `fallback`](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function). Це значно полегшує компонування. Одного байта було б достатньо для ідентифікації функції в більшості випадків, тому ми витрачаємо три байти (16\*3=48 газу). Однак на момент написання статті ці 48 газу коштують 0,07 цента, що є розумною ціною за простіший і менш схильний до помилок код.

```solidity
            // Перше значення, додаємо його в кеш
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

Перше значення: прапорець, що вказує на те, що це повне значення, яке потрібно записати в кеш, за яким слідують 32 байти значення. Інші три значення схожі, за винятком того, що `VAL_B` не записується в кеш, а `VAL_C` є і третім, і четвертим параметром.

```solidity
             .
             .
             .
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
```

Тут ми фактично викликаємо контракт `Cache`.

```solidity
        assertEq(_success, true);
```

Ми очікуємо, що виклик буде успішним.

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

Ми починаємо з порожнього кешу, а потім додаємо `VAL_A`, а за ним `VAL_C`. Ми очікуємо, що перший матиме ключ 1, а другий — 2.

```
        assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

На виході — чотири параметри. Тут ми перевіряємо, що він правильний.

```solidity
        // Другий виклик, ми можемо використовувати кеш
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Перше значення в кеші
            bytes1(0x01),
```

Ключі кешу менше 16 — це лише один байт.

```solidity
            // Друге значення, не додавати його до кешу
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // Третє і четверте значення, те ж саме значення
            bytes1(0x02),
            bytes1(0x02)
        );
        .
        .
        .
    }   // testReadParam
```

Тести після виклику ідентичні тестам після першого виклику.

```solidity
    function testEncodeVal() public {
```

Ця функція схожа на `testReadParam`, за винятком того, що замість явного запису параметрів ми використовуємо `encodeVal()`.

```solidity
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(VAL_A),
            cache.encodeVal(VAL_B),
            cache.encodeVal(VAL_C),
            cache.encodeVal(VAL_D)
        );
        .
        .
        .
        assertEq(_callInput.length, 4+1*4);
    }   // testEncodeVal
```

Єдиний додатковий тест у `testEncodeVal()` — це перевірка правильності довжини `_callInput`. Для першого виклику вона становить 4+33_4. Для другого, де кожне значення вже є в кеші, вона становить 4+1_4.

```solidity
    // Тестування encodeVal, коли ключ складається з більш ніж одного байта
    // Максимум три байти, тому що заповнення кешу до чотирьох байтів займає
    // занадто багато часу.
    function testEncodeValBig() public {
        // Помістити кілька значень у кеш.
        // Для простоти використовуйте ключ n для значення n.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

Функція `testEncodeVal` вище записує в кеш лише чотири значення, тому [частина функції, яка працює з багатобайтовими значеннями](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171) не перевіряється. Але цей код складний і схильний до помилок.

Перша частина цієї функції — це цикл, який записує в кеш усі значення від 1 до 0x1FFF по порядку, тому ми зможемо кодувати ці значення та знати, куди вони йдуть.

```solidity
        .
        .
        .

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F),   // Один байт        0x0F
            cache.encodeVal(0x0010),   // Два байти     0x1010
            cache.encodeVal(0x0100),   // Два байти     0x1100
            cache.encodeVal(0x1000)    // Три байти 0x201000
        );
```

Тестуємо одно-, дво- та трибайтові значення. Ми не тестуємо далі, тому що знадобиться занадто багато часу, щоб записати достатньо записів стека (принаймні 0x10000000, приблизно чверть мільярда).

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // Тестуємо, що з надмірно малим буфером ми отримуємо revert
    function testShortCalldata() public {
```

Перевіряємо, що відбувається в аномальному випадку, коли параметрів недостатньо.

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

Оскільки відбувається скасування, результат, який ми повинні отримати, — `false`.

```
    // Виклик із ключами кешу, яких немає
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Перше значення, додаємо його в кеш
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // Друге значення
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

Ця функція отримує чотири цілком легітимні параметри, за винятком того, що кеш порожній, тому там немає значень для зчитування.

```solidity
        .
        .
        .
    // Test what with an excessively long buffer everything works file
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // First call, the cache is empty
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_A),

            // Second value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_B),

            // Third value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_C),

            // Fourth value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_D),

            // And another value for "good luck"
            bytes4(0x31112233)
        );
```

Ця функція надсилає п’ять значень. Ми знаємо, що п'яте значення ігнорується, тому що це недійсний запис кешу, що спричинило б скасування, якби він не був включений.

```solidity
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        .
        .
        .
    }   // testLongCalldata

}        // CacheTest

```

## Зразок застосунку {#a-sample-app}

Писати тести на Solidity — це, звісно, добре, але, зрештою, для того, щоб dapp був корисним, він має вміти обробляти запити з-поза меж ланцюга. У цій статті показано, як використовувати кешування в dapp з `WORM`, що означає «Write Once, Read Many» (один раз записати, багато разів прочитати). Якщо ключ ще не записаний, ви можете записати в нього значення. Якщо ключ уже записаний, ви отримаєте скасування.

### Контракт {#the-contract}

[Це контракт](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol). Він здебільшого повторює те, що ми вже робили з `Cache` і `CacheTest`, тому ми розглянемо лише цікаві моменти.

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

Найпростіший спосіб використовувати `Cache` — це успадкувати його у власному контракті.

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

Ця функція схожа на `fourParam` у `CacheTest` вище. Оскільки ми не дотримуємося специфікацій ABI, краще не оголошувати жодних параметрів у функції.

```solidity
    // Make it easier to call us
    // Function signature for writeEntryCached(), courtesy of
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

Зовнішній код, який викликає `writeEntryCached`, повинен буде вручну створювати calldata, замість використання `worm.writeEntryCached`, оскільки ми не дотримуємося специфікацій ABI. Наявність цієї константи просто полегшує її написання.

Зверніть увагу, що хоча ми визначаємо `WRITE_ENTRY_CACHED` як змінну стану, для її зовнішнього зчитування необхідно використовувати функцію-геттер для неї, `worm.WRITE_ENTRY_CACHED()`.

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

Функція читання є `view`, тому вона не потребує транзакції і не коштує газу. В результаті немає жодної вигоди від використання кешу для параметра. З функціями view краще використовувати стандартний, простіший механізм.

### Тестовий код {#the-testing-code}

[Це код для тестування контракту](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol). Знову ж таки, розглянемо лише те, що є цікавим.

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[Це (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert) — спосіб, яким ми вказуємо в тесті Foundry, що наступний виклик повинен завершитися невдачею, і повідомлювана причина невдачі. Це стосується випадків, коли ми використовуємо синтаксис `<contract>.<function name>()`, а не створюємо calldata та викликаємо контракт за допомогою низькорівневого інтерфейсу (`<contract>.call()` тощо).

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

Тут ми використовуємо той факт, що `cacheWrite` повертає ключ кешу. Це не те, що ми очікуємо використовувати у виробництві, тому що `cacheWrite` змінює стан і, отже, може бути викликана лише під час транзакції. Транзакції не мають значень, що повертаються, якщо у них є результати, ці результати мають бути випромінені як події. Отже, значення, що повертається `cacheWrite`, доступне лише з ончейн-коду, а ончейн-код не потребує кешування параметрів.

```solidity
        (_success,) = address(worm).call(_callInput);
```

Ось як ми повідомляємо Solidity, що, хоча `<contract address>.call()` має два значення, що повертаються, нас цікавить лише перше.

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

Оскільки ми використовуємо низькорівневу функцію `<address>.call()`, ми не можемо використовувати `vm.expectRevert()` і повинні дивитися на логічне значення успіху, яке ми отримуємо від виклику.

```solidity
    event EntryWritten(uint indexed key, uint indexed value);

        .
        .
        .

        _callInput = bytes.concat(
            worm.WRITE_ENTRY_CACHED(), worm.encodeVal(a), worm.encodeVal(b));
        vm.expectEmit(true, true, false, false);
        emit EntryWritten(a, b);
        (_success,) = address(worm).call(_callInput);
```

Це спосіб, яким ми перевіряємо, що код [правильно генерує подію](https://getfoundry.sh/reference/cheatcodes/expect-emit/) в Foundry.

### Клієнт {#the-client}

Одна річ, якої ви не отримаєте з тестами Solidity, — це код JavaScript, який можна скопіювати та вставити у власний додаток. Щоб написати цей код, я розгорнув WORM на [Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli), новій тестовій мережі [Optimism](https://www.optimism.io/). Його адреса [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a).

[Код JavaScript для клієнта можна переглянути тут](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js). Щоб ним скористатися:

1. Клонуйте репозиторій git:

   ```sh
   git clone https://github.com/qbzzt/20220915-all-you-can-cache.git
   ```

2. Встановіть необхідні пакети:

   ```sh
   cd javascript
   yarn
   ```

3. Скопіюйте файл конфігурації:

   ```sh
   cp .env.example .env
   ```

4. Відредагуйте `.env` для вашої конфігурації:

   | Параметр                                                      | Значення                                                                                                                                                                                                                   |
   | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | MNEMONIC                                                      | Мнемонічна фраза для облікового запису, на якому є достатньо ETH для оплати транзакції. [Тут ви можете отримати безкоштовний ETH для мережі Optimism Goerli](https://optimismfaucet.xyz/). |
   | OPTIMISM_GOERLI_URL | URL до Optimism Goerli. Публічна кінцева точка, `https://goerli.optimism.io`, має обмеження по швидкості, але достатня для наших потреб тут                                                                |

5. Запустіть `index.js`.

   ```sh
   node index.js
   ```

   Цей зразок застосунку спочатку записує запис у WORM, відображаючи calldata та посилання на транзакцію на Etherscan. Потім він зчитує цей запис і відображає ключ, який він використовує, і значення в записі (значення, номер блоку та автора).

Більша частина клієнта — це звичайний Dapp JavaScript. Тож знову розглянемо лише найцікавіші моменти.

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // Need a new key every time
    const key = await worm.encodeVal(Number(new Date()))
```

У даний слот можна записати лише один раз, тому ми використовуємо мітку часу, щоб переконатися, що не повторюємо слоти.

```javascript
const val = await worm.encodeVal("0x600D")

// Write an entry
const calldata = func + key.slice(2) + val.slice(2)
```

Ethers очікує, що дані виклику будуть шістнадцятковим рядком, `0x`, за яким слідує парна кількість шістнадцяткових цифр. Оскільки і `key`, і `val` починаються з `0x`, нам потрібно видалити ці заголовки.

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Як і в коді тестування Solidity, ми не можемо викликати кешовану функцію звичайним способом. Натомість нам потрібно використовувати механізм нижчого рівня.

```javascript
    .
    .
    .
    // Read the entry just written
    const realKey = '0x' + key.slice(4)  // remove the FF flag
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

Для зчитування записів ми можемо використовувати звичайний механізм. Немає потреби використовувати кешування параметрів з функціями `view`.

## Висновок {#conclusion}

Код у цій статті є доказом концепції, мета якої — зробити ідею легкою для розуміння. Для системи, готової до виробництва, ви можете реалізувати деякі додаткові функції:

- Обробка значень, які не є `uint256`. Наприклад, рядки.
- Замість глобального кешу, можливо, мати відображення між користувачами та кешами. Різні користувачі використовують різні значення.
- Значення, що використовуються для адрес, відрізняються від тих, що використовуються для інших цілей. Можливо, має сенс мати окремий кеш лише для адрес.
- Наразі ключі кешу працюють за алгоритмом «хто перший прийшов, той отримав найменший ключ». Перші шістнадцять значень можна надіслати як один байт. Наступні 4080 значень можна надіслати як два байти. Наступні приблизно мільйон значень — три байти і т. д. Виробнича система повинна вести лічильники використання записів кешу та реорганізовувати їх так, щоб шістнадцять _найпоширеніших_ значень займали один байт, наступні 4080 найпоширеніших значень — два байти і т. д.

  Однак це потенційно небезпечна операція. Уявіть собі таку послідовність подій:

  1. Ноам Наївний викликає `encodeVal` для кодування адреси, на яку він хоче надіслати токени. Ця адреса є однією з перших, що використовуються в додатку, тому закодоване значення — 0x06. Це функція `view`, а не транзакція, тому це відбувається між Ноамом і вузлом, який він використовує, і ніхто інший про це не знає

  2. Оуен Власник запускає операцію реорганізації кешу. Дуже мало людей насправді використовують цю адресу, тому вона тепер закодована як 0x201122. Іншому значенню, 10<sup>18</sup>, присвоєно 0x06.

  3. Ноам Наївний надсилає свої токени на 0x06. Вони потрапляють на адресу `0x0000000000000000000000000de0b6b3a7640000`, і оскільки ніхто не знає приватного ключа від цієї адреси, вони просто там застрягають. Ноам _не в захваті_.

  Існують способи вирішення цієї проблеми та пов’язаної з нею проблеми транзакцій, які перебувають у мемпулі під час реорганізації кешу, але ви повинні про це знати.

Я продемонстрував кешування тут з Optimism, тому що я співробітник Optimism, і це той rollup, який я знаю найкраще. Але це має працювати з будь-яким rollup, який стягує мінімальну плату за внутрішню обробку, так що, порівняно, запис даних транзакції в L1 є основною витратою.

[Більше моїх робіт дивіться тут](https://cryptodocguy.pro/).

