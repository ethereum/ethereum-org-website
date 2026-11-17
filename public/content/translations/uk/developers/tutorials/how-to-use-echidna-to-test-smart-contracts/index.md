---
title: "Як використовувати Ехідна для тестування смарт-контрактів"
description: "Як використовувати Ехідна для автоматичного тестування смарт-контрактів"
author: "Трейлофбітс"
lang: uk
tags: ["Solidity", "смарт-контракти", "безпека", "тестування", "фазинг"]
skill: advanced
breadcrumb: "Ехідна"
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Встановлення {#installation}

Ехідна можна встановити за допомогою Docker, Homebrew або використовуючи попередньо скомпільований бінарний файл. Приклади в цьому посібнику були протестовані з Ехідна 2.3.3 та solc 0.8.37.

### Ехідна через Docker {#echidna-through-docker}

```sh
docker pull ghcr.io/crytic/echidna/echidna:latest
docker run --rm -it -v "$PWD":/src ghcr.io/crytic/echidna/echidna:latest
```

_Остання команда запускає образ Ехідна в Docker, який має доступ до вашого поточного каталогу. Ви можете змінювати файли на своєму хості та запускати інструменти для файлів з Docker. Образ також постачається зі [Слізер](https://github.com/crytic/slither), [crytic-compile](https://github.com/crytic/crytic-compile) та [solc-select](https://github.com/crytic/solc-select)._

Усередині Docker виконайте:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
cd /src
```

### Бінарний файл {#binary}

Завантажте останній реліз для вашої платформи з [https://github.com/crytic/echidna/releases/latest](https://github.com/crytic/echidna/releases/latest). На macOS або Linux ви також можете виконати `brew install echidna`, що встановить Слізер та crytic-compile разом із ним.

Використовуючи релізний бінарний файл, встановіть [Слізер](https://github.com/crytic/slither) та [solc-select](https://github.com/crytic/solc-select) самостійно (наприклад, `pip3 install slither-analyzer solc-select` у віртуальному середовищі Python) і виберіть версію компілятора:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
```

Ехідна працює без Слізер, але Слізер витягує константи, такі як магічні числа, що використовуються в інструкціях `require`, і кілька прикладів нижче залежать від цього для швидкого виявлення помилок.

## Вступ до фазингу на основі властивостей {#introduction-to-property-based-fuzzing}

Ехідна — це фазер на основі властивостей, який ми описували в наших попередніх публікаціях у блозі ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Фазинг {#fuzzing}

[Фазинг](https://wikipedia.org/wiki/Fuzzing) — це добре відомий метод у спільноті з безпеки. Він полягає у генеруванні більш-менш випадкових вхідних даних для виявлення помилок у програмі. Фазер для традиційного програмного забезпечення (наприклад, [AFL](http://lcamtuf.coredump.cx/afl/) або [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) відомі як ефективні інструменти для пошуку помилок.

Окрім суто випадкової генерації вхідних даних, існує багато методів і стратегій для створення якісних вхідних даних, зокрема:

- Отримання зворотного зв'язку від кожного виконання та спрямування генерації за його допомогою. Наприклад, якщо щойно згенеровані вхідні дані призводять до виявлення нового шляху, має сенс генерувати нові вхідні дані, близькі до них.
- Генерація вхідних даних з урахуванням структурних обмежень. Наприклад, якщо ваші вхідні дані містять заголовок із контрольною сумою, буде доцільно дозволити фазеру генерувати вхідні дані, які проходять перевірку контрольної суми.
- Використання відомих вхідних даних для генерації нових: якщо ви маєте доступ до великого набору дійсних вхідних даних, ваш фазер може генерувати нові вхідні дані на їх основі, а не починати генерацію з нуля. Їх зазвичай називають _seeds_ (початкові значення).

### Фазинг на основі властивостей {#property-based-fuzzing}

Ехідна належить до специфічного сімейства фазерів: фазинг на основі властивостей, значною мірою натхненний [QuickCheck](https://wikipedia.org/wiki/QuickCheck). На відміну від класичних фазерів, які намагаються знайти збої, Ехідна намагатиметься порушити визначені користувачем інваріанти.

У смарт-контрактах інваріанти — це функції Solidity, які можуть представляти будь-який неправильний або недійсний стан, якого може досягти контракт, зокрема:

- Неправильний контроль доступу: зловмисник став власником контракту.
- Неправильний кінцевий автомат: токени можна переказувати, поки контракт призупинено.
- Неправильна арифметика: користувач може викликати антипереповнення свого балансу та отримати необмежену кількість безкоштовних токенів.

### Тестування властивості за допомогою Ехідна {#testing-a-property-with-echidna}

Ми розглянемо, як протестувати смарт-контракт за допомогою Ехідна. Ціллю є наступний смарт-контракт [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Token {
    mapping(address => uint256) public balances;

    function airdrop() public {
        balances[msg.sender] = 1000;
    }

    function consume() public {
        require(balances[msg.sender] > 0);
        balances[msg.sender] -= 1;
    }

    function backdoor() public {
        balances[msg.sender] += 1;
    }
}
```

Ми зробимо припущення, що цей токен повинен мати такі властивості:

- Будь-хто може мати щонайбільше 1000 токенів
- Токен не можна переказувати (це не токен ERC-20)

### Написання властивості {#write-a-property}

Властивості Ехідна — це функції Solidity. Властивість повинна:

- Не мати аргументів
- Повертати `true`, якщо вона успішна
- Мати ім'я, що починається з `echidna`

Ехідна буде:

- Автоматично генерувати довільні транзакції для тестування властивості.
- Повідомляти про будь-які транзакції, що призводять до повернення властивістю `false` або видачі помилки.
- Відкидати побічні ефекти під час виклику властивості (тобто, якщо властивість змінює змінну стану, вона відкидається після тесту)

Наступна властивість перевіряє, що абонент має не більше 1000 токенів:

```solidity
function echidna_balance_under_1000() public view returns (bool) {
    return balances[msg.sender] <= 1000;
}
```

Використовуйте успадкування, щоб відокремити ваш контракт від ваших властивостей:

```solidity
contract TestToken is Token {
    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

[`testtoken.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/testtoken.sol) реалізує властивість і успадковує від токена.

### Ініціалізація контракту {#initiate-a-contract}

Ехідна потребує [конструктор](/developers/docs/smart-contracts/anatomy/#constructor-functions) без аргументів. Якщо ваш контракт потребує специфічної ініціалізації, вам потрібно зробити це в конструкторі.

В Ехідна є деякі специфічні адреси:

- `0x30000`, яка викликає конструктор.
- `0x10000`, `0x20000` та `0x30000`, які випадковим чином викликають інші функції.
- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72`, де розгортається тестований контракт.

У нашому поточному прикладі нам не потрібна жодна особлива ініціалізація, тому наш конструктор порожній.

### Запуск Ехідна {#run-echidna}

Ехідна запускається за допомогою:

```sh
echidna contract.sol
```

Якщо contract.sol містить кілька контрактів, ви можете вказати ціль:

```sh
echidna contract.sol --contract MyContract
```

Під час запуску в терміналі Ехідна показує інтерактивний інтерфейс користувача. Додайте `--format text`, щоб отримати вивід у вигляді звичайного тексту, як у прикладах нижче.

### Підсумок: Тестування властивості {#summary-testing-a-property}

Нижче наведено підсумок запуску Ехідна на нашому прикладі:

```solidity
contract TestToken is Token {
    constructor() {}

    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

```sh
echidna testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence:
    TestToken.airdrop()
    TestToken.backdoor()

...
```

Ехідна виявила, що властивість порушується, якщо викликається `backdoor`.

## Фільтрація функцій для виклику під час кампанії фазингу {#filtering-functions-to-call-during-a-fuzzing-campaign}

Ми розглянемо, як фільтрувати функції, що підлягають фазингу.
Ціллю є наступний смарт-контракт:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool state1 = false;
    bool state2 = false;
    bool state3 = false;
    bool state4 = false;

    function f(uint256 x) public {
        require(x == 12);
        state1 = true;
    }

    function g(uint256 x) public {
        require(state1);
        require(x == 8);
        state2 = true;
    }

    function h(uint256 x) public {
        require(state2);
        require(x == 42);
        state3 = true;
    }

    function i() public {
        require(state3);
        state4 = true;
    }

    function reset1() public {
        state1 = false;
        state2 = false;
        state3 = false;
        return;
    }

    function reset2() public {
        state1 = false;
        state2 = false;
        state3 = false;
        return;
    }

    function echidna_state4() public view returns (bool) {
        return (!state4);
    }
}
```

Цей невеликий приклад змушує Ехідна знайти певну послідовність транзакцій для зміни змінної стану.
Це складно для фазера.
Ми можемо запустити Ехідна, щоб перевірити це:

```sh
echidna multi.sol
...
echidna_state4: passing
...
```

### Фільтрація функцій {#filtering-functions}

Ехідна має труднощі з пошуком правильної послідовності для тестування цього контракту, оскільки дві функції скидання (`reset1` та `reset2`) встановлять усі змінні стану на `false`.
Однак ми можемо використати спеціальну функцію Ехідна, щоб додати функцію скидання до чорного списку або додати до білого списку лише функції `f`, `g`,
`h` та `i`.

Щоб додати функції до чорного списку, ми можемо використати цей файл конфігурації:

```yaml
filterBlacklist: true
filterFunctions: ["C.reset1()", "C.reset2()"]
```

Інший підхід до фільтрації функцій полягає у переліку функцій з білого списку. Для цього ми можемо використати цей файл конфігурації:

```yaml
filterBlacklist: false
filterFunctions: ["C.f(uint256)", "C.g(uint256)", "C.h(uint256)", "C.i()"]
```

- `filterBlacklist` за замовчуванням має значення `true`.
- Фільтрація виконується за повним ім'ям функції: ім'я контракту, `.` та двійковий інтерфейс програми (ABI) підпис (наприклад, `C.f(uint256)`). Якщо у вас є `f()` та `f(uint256)`, ви можете вибрати, яку саме фільтрувати. Просте ім'я, таке як `"reset1"`, ні з чим не збігається.

### Запуск Ехідна {#run-echidna-1}

Щоб запустити Ехідна з файлом конфігурації `blacklist.yaml`:

```sh
echidna multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    C.f(12)
    C.g(8)
    C.h(42)
    C.i()
```

Ехідна знайде послідовність транзакцій для спростування властивості майже миттєво.

### Підсумок: Фільтрація функцій {#summary-filtering-functions}

Ехідна може додавати функції до чорного або білого списку для виклику під час кампанії фазингу за допомогою:

```yaml
filterBlacklist: true
filterFunctions: ["C.f1()", "C.f2()", "C.f3()"]
```

```sh
echidna contract.sol --config config.yaml
...
```

Ехідна розпочинає кампанію фазингу, або додаючи до чорного списку `C.f1()`, `C.f2()` та `C.f3()`, або викликаючи лише їх, залежно
від значення логічної змінної `filterBlacklist`.

## Як тестувати assert у Solidity за допомогою Ехідна {#how-to-test-soliditys-assert-with-echidna}

У цьому короткому посібнику ми покажемо, як використовувати Ехідна для тестування перевірки тверджень у контрактах. Припустімо, у нас є такий контракт:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        // tmp <= counter
        return (counter - tmp);
    }
}
```

Починаючи з Solidity 0.8, арифметичні переповнення скасовуються за замовчуванням. Блок `unchecked` відновлює поведінку обгортання, щоб `counter` міг переповнитися, що і є тією помилкою, яку ми хочемо, щоб Ехідна знайшла.

### Написання твердження {#write-an-assertion}

Ми хочемо переконатися, що `tmp` менше або дорівнює `counter` після повернення їхньої різниці. Ми могли б написати
властивість Ехідна, але нам потрібно буде десь зберігати значення `tmp`. Натомість ми можемо використати таке твердження:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

### Запуск Ехідна {#run-echidna-2}

Щоб увімкнути тестування збоїв тверджень, передайте `--test-mode assertion` у командному рядку або створіть [файл конфігурації Ехідна](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
testMode: assertion
```

Коли ми запускаємо цей контракт в Ехідна, ми отримуємо очікувані результати:

```sh
echidna assert.sol --config config.yaml
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

Як бачите, Ехідна повідомляє про збій твердження у функції `inc`. Додавання більше одного твердження на функцію можливе, але Ехідна не зможе сказати, яке саме твердження не виконалося.

### Коли та як використовувати твердження {#when-and-how-use-assertions}

Твердження можна використовувати як альтернативу явним властивостям, особливо якщо умови для перевірки безпосередньо пов'язані з правильним використанням певної операції `f`. Додавання тверджень після певного коду гарантуватиме, що перевірка відбудеться відразу після його виконання:

```solidity
function f(..) public {
    // деякий складний код
    ...
    assert (condition);
    ...
}

```

Навпаки, використання явної властивості Ехідна призведе до випадкового виконання транзакцій, і немає простого способу точно визначити, коли вона буде перевірена. Усе ще можливо застосувати такий обхідний шлях:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Однак є деякі проблеми:

- Це не спрацює, якщо `f` оголошено як `internal` або `external`.
- Незрозуміло, які аргументи слід використовувати для виклику `f`.
- Якщо `f` скасовується, властивість завершиться помилкою.

Загалом, ми рекомендуємо дотримуватися [рекомендацій Джона Регера](https://blog.regehr.org/archives/1091) щодо використання тверджень:

- Не викликайте жодних побічних ефектів під час перевірки твердження. Наприклад: `assert(ChangeStateAndReturn() == 1)`
- Не стверджуйте очевидні речі. Наприклад, `assert(var >= 0)`, де `var` оголошено як `uint`.

Нарешті, будь ласка, **не використовуйте** `require` замість `assert`, оскільки Ехідна не зможе його виявити (але контракт усе одно буде скасовано).

### Підсумок: Перевірка тверджень {#summary-assertion-checking}

Нижче наведено підсумок запуску Ехідна на нашому прикладі:

```solidity
contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

```sh
echidna assert.sol --test-mode assertion
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

Ехідна виявила, що твердження в `inc` може не виконатися, якщо ця функція викликається кілька разів із великими аргументами.

## Збір та модифікація корпусу Ехідна {#collecting-and-modifying-an-echidna-corpus}

Ми розглянемо, як збирати та використовувати корпус транзакцій за допомогою Ехідна. Ціллю є наступний смарт-контракт [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool value_found = false;

    function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
        require(magic_1 == 42);
        require(magic_2 == 129);
        require(magic_3 == magic_4 + 333);
        value_found = true;
        return;
    }

    function echidna_magic_values() public view returns (bool) {
        return !value_found;
    }
}
```

Цей невеликий приклад змушує Ехідна знайти певні значення для зміни змінної стану. Це складно для фазера.
Ми можемо запустити Ехідна, щоб перевірити це:

```sh
echidna magic.sol
...

echidna_magic_values: passing
...
```

Однак ми все ще можемо використовувати Ехідна для збору корпусу під час запуску цієї кампанії фазингу.

### Збір корпусу {#collecting-a-corpus}

Щоб увімкнути збір корпусу, створіть каталог корпусу:

```sh
mkdir corpus-magic
```

Та [файл конфігурації Ехідна](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
corpusDir: "corpus-magic"
```

Тепер ми можемо запустити наш інструмент і перевірити зібраний корпус:

```sh
echidna magic.sol --config config.yaml
```

Ехідна все ще не може знайти правильні магічні значення. Щоб побачити, де вона застрягла, подивіться на звіт про покриття `corpus-magic/covered.*.txt`:

```text
7 | *   |     function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
  8 | *r  |         require(magic_1 == 42);
  9 | *r  |         require(magic_2 == 129);
 10 | *r  |         require(magic_3 == magic_4 + 333);
 11 |     |         value_found = true;
 12 |     |         return;
```

Мітка `r` означає, що Ехідна досягла рядка, але виконання там було скасовано, і рядки після останнього `require` ніколи не виконуються.

Послідовності транзакцій, зібрані Ехідна, зберігаються як файли JSON у `corpus-magic/coverage/`. Наприклад, перша транзакція одного з цих файлів була такою:

```json
[
  {
    "call": {
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639806"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "761"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "91238239174727894896282446013839801776340298206661877345279631871841712965531"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639804"
            ],
            "tag": "AbiUInt"
          }
        ]
      ],
      "tag": "SolCall"
    },
    "delay": [
      "0x00000000000000000000000000000000000000000000000000000000000103ef",
      "0x000000000000000000000000000000000000000000000000000000000000d38b"
    ],
    "dst": "0x00a329c0648769A73afAc7F9381E08FB43dBEA72",
    "gas": 12500000,
    "gasprice": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "src": "0x0000000000000000000000000000000000020000",
    "value": "0x0000000000000000000000000000000000000000000000000000000000000000"
  }
]
```

Очевидно, що ці вхідні дані не викличуть збій у нашій властивості. Однак на наступному кроці ми побачимо, як їх змінити для цього.

### Наповнення корпусу початковими даними {#seeding-a-corpus}

Ехідна потребує певної допомоги, щоб впоратися з функцією `magic`. Ми збираємося скопіювати та змінити вхідні дані, щоб використовувати відповідні
параметри для неї (імена файлів випадкові, тому використовуйте один із вашого власного каталогу `corpus-magic/coverage/`):

```sh
cp corpus-magic/coverage/249425678654647553.txt corpus-magic/coverage/new.txt
```

Ми змінимо `new.txt` так, щоб він містив одну транзакцію, яка викликає `magic(42,129,333,0)`. Тепер ми можемо перезапустити Ехідна:

```sh
echidna magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    C.magic(42,129,333,0)

...
```

Цього разу вона виявила, що властивість порушується негайно.

## Пошук транзакцій із високим споживанням газу {#finding-transactions-with-high-gas-consumption}

Ми розглянемо, як знайти транзакції з високим споживанням газу за допомогою Ехідна. Старіші версії Ехідна мали для цього опцію `estimateGas`; її було видалено в Ехідна 2.3.0. Натомість ми вимірюємо газ за допомогою `gasleft()` і дозволяємо [режиму оптимізації](https://secure-contracts.com/program-analysis/echidna/advanced/optimization_mode.html) Ехідна максимізувати його. Ціллю є наступний смарт-контракт:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    uint256 state;

    function expensive(uint8 times) internal {
        for (uint8 i = 0; i < times; i++) {
            state = state + i;
        }
    }

    function f(uint256 x, uint256 y, uint8 times) public {
        if (x == 42 && y == 123) {
            expensive(times);
        } else {
            state = 0;
        }
    }
}
```

Тут `expensive` може мати велике споживання газу.

### Вимірювання споживання газу {#measuring-gas-consumption}

У режимі оптимізації Ехідна шукає функції, що починаються з `echidna_`, які не приймають аргументів і повертають `int256`, і намагається знайти послідовність транзакцій, яка максимізує повернуте значення. Ми додаємо тестовий контракт, який викликає `f`, записує використаний газ і показує максимум (збережіть обидва контракти в `gas.sol`):

```solidity
contract TestGas is C {
    int256 maxGasUsed;

    function measureF(uint256 x, uint256 y, uint8 times) public {
        uint256 start = gasleft();
        f(x, y, times);
        int256 used = int256(start - gasleft());
        if (used > maxGasUsed) {
            maxGasUsed = used;
        }
    }

    function echidna_opt_gas_f() public view returns (int256) {
        return maxGasUsed;
    }
}
```

Щоб увімкнути режим оптимізації, створіть файл конфігурації `config.yaml`. У цьому прикладі ми також зменшимо розмір послідовності транзакцій, щоб результати було легше зрозуміти:

```yaml
testMode: optimization
seqLen: 2
```

### Запуск Ехідна {#run-echidna-3}

Після створення файлу конфігурації ми можемо запустити Ехідна таким чином:

```sh
echidna gas.sol --contract TestGas --config config.yaml
...
echidna_opt_gas_f: max value: 127128

  Call sequence:
    TestGas.measureF(42,123,223)

...
```

- Показаний газ вимірюється реалізацією Віртуальної машини Ethereum (EVM), на якій працює Ехідна, [hevm](https://github.com/argotorg/hevm), і включає накладні витрати на внутрішній виклик з `measureF`.
- Максимум не є унікальним: кожна кампанія є випадковою, і довші кампанії (наприклад, `--test-limit 200000`) зазвичай знаходять більші значення.

### Відфільтровування викликів, що зменшують газ {#filtering-out-gas-reducing-calls}

Посібник із **фільтрації функцій для виклику під час кампанії фазингу** вище показує, як
вилучити деякі функції з вашого тестування.  
Це може бути критично важливим для отримання точної оцінки газу.
Розглянемо такий приклад:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    address[] addrs;

    function push(address a) public {
        addrs.push(a);
    }

    function pop() public {
        addrs.pop();
    }

    function clear() public {
        delete addrs;
    }

    function check() public {
        for (uint256 i = 0; i < addrs.length; i++)
            for (uint256 j = i + 1; j < addrs.length; j++)
                if (addrs[i] == addrs[j]) addrs[j] = address(0x0);
    }

    function echidna_opt_gas_check() public returns (int256) {
        uint256 start = gasleft();
        check();
        return int256(start - gasleft());
    }
}
```

`echidna_opt_gas_check` викликає `check` і повертає його вартість у газі. Як і в кожній тестовій функції Ехідна, зміни її стану згодом відкидаються.

Якщо Ехідна може викликати всі функції, їй буде нелегко знайти транзакції з високою вартістю газу:

```sh
echidna pushpop.sol --test-mode optimization
...
echidna_opt_gas_check: max value: 265706
...
```

Це тому, що вартість залежить від розміру `addrs`, а випадкові виклики зазвичай залишають масив майже порожнім.
Однак додавання `pop` та `clear` до чорного списку дає нам набагато кращі результати:

```yaml
testMode: optimization
filterBlacklist: true
filterFunctions: ["C.pop()", "C.clear()"]
```

```sh
echidna pushpop.sol --config config.yaml
...
echidna_opt_gas_check: max value: 2446228
...
```

Скорочення послідовності викликів для цього результату займає кілька хвилин, оскільки кожне повторення викликає дорогу функцію `check`.

### Підсумок: Пошук транзакцій із високим споживанням газу {#summary-finding-transactions-with-high-gas-consumption}

Ехідна може знаходити транзакції з високим споживанням газу, вимірюючи газ за допомогою `gasleft()` у функції `echidna_`, яка повертає `int256`, і працюючи в режимі оптимізації:

```yaml
testMode: optimization
```

```sh
echidna contract.sol --config config.yaml
...
```

Ехідна повідомить про знайдене максимальне значення та послідовність транзакцій, які його створили, після завершення кампанії фазингу.
