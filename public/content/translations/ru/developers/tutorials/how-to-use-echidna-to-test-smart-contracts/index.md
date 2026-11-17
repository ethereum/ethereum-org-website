---
title: "Как использовать Эхидну для тестирования смарт-контрактов"
description: "Как использовать Эхидну для автоматического тестирования смарт-контрактов"
author: Trailofbits
lang: ru
tags:
  - solidity
  - смарт-контракты
  - безопасность
  - тестирование
  - фаззинг
skill: advanced
breadcrumb: "Эхидна"
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Установка {#installation}

Эхидну можно установить через Docker, Homebrew или используя предварительно скомпилированный бинарный файл. Примеры в этом руководстве были протестированы с Эхидной 2.3.3 и solc 0.8.37.

### Эхидна через Docker {#echidna-through-docker}

```sh
docker pull ghcr.io/crytic/echidna/echidna:latest
docker run --rm -it -v "$PWD":/src ghcr.io/crytic/echidna/echidna:latest
```

_Последняя команда запускает образ Эхидны в Docker, который имеет доступ к вашей текущей директории. Вы можете изменять файлы на вашем хосте и запускать инструменты для этих файлов из Docker. Образ также поставляется со [Слизером](https://github.com/crytic/slither), [crytic-compile](https://github.com/crytic/crytic-compile) и [solc-select](https://github.com/crytic/solc-select)._

Внутри Docker выполните:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
cd /src
```

### Бинарный файл {#binary}

Загрузите последний релиз для вашей платформы с [https://github.com/crytic/echidna/releases/latest](https://github.com/crytic/echidna/releases/latest). В macOS или Linux вы также можете выполнить `brew install echidna`, что установит Слизер и crytic-compile вместе с ней.

При использовании релизного бинарного файла установите [Слизер](https://github.com/crytic/slither) и [solc-select](https://github.com/crytic/solc-select) самостоятельно (например, `pip3 install slither-analyzer solc-select` в виртуальной среде Python) и выберите версию компилятора:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
```

Эхидна работает и без Слизера, но Слизер извлекает константы, такие как магические числа, используемые в операторах `require`, и несколько примеров ниже зависят от этого для быстрого поиска ошибок.

## Введение в фаззинг на основе свойств {#introduction-to-property-based-fuzzing}

Эхидна — это фаззер на основе свойств, который мы описывали в наших предыдущих статьях в блоге ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Фаззинг {#fuzzing}

[Фаззинг](https://wikipedia.org/wiki/Fuzzing) — это хорошо известный метод в сообществе специалистов по безопасности. Он заключается в генерации более или менее случайных входных данных для поиска ошибок в программе. Фаззеры для традиционного программного обеспечения (такие как [AFL](http://lcamtuf.coredump.cx/afl/) или [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) известны как эффективные инструменты для поиска ошибок.

Помимо чисто случайной генерации входных данных, существует множество методов и стратегий для создания качественных входных данных, включая:

- Получение обратной связи от каждого выполнения и направление генерации с ее помощью. Например, если новые сгенерированные входные данные приводят к обнаружению нового пути, имеет смысл генерировать новые входные данные, близкие к ним.
- Генерация входных данных с соблюдением структурных ограничений. Например, если ваши входные данные содержат заголовок с контрольной суммой, будет логично позволить фаззеру генерировать входные данные, которые проходят проверку контрольной суммы.
- Использование известных входных данных для генерации новых: если у вас есть доступ к большому набору корректных входных данных, ваш фаззер может генерировать новые данные на их основе, а не начинать генерацию с нуля. Обычно они называются _сидами_ (seeds).

### Фаззинг на основе свойств {#property-based-fuzzing}

Эхидна принадлежит к определенному семейству фаззеров: фаззинг на основе свойств, в значительной степени вдохновленный [QuickCheck](https://wikipedia.org/wiki/QuickCheck). В отличие от классических фаззеров, которые пытаются найти сбои, Эхидна будет пытаться нарушить определенные пользователем инварианты.

В смарт-контрактах инварианты — это функции Solidity, которые могут представлять любое некорректное или недействительное состояние, которого может достичь контракт, включая:

- Неправильный контроль доступа: злоумышленник стал владельцем контракта.
- Неправильный конечный автомат: токены могут быть переведены, пока контракт приостановлен.
- Неправильная арифметика: пользователь может вызвать антипереполнение (underflow) своего баланса и получить неограниченное количество бесплатных токенов.

### Тестирование свойства с помощью Эхидны {#testing-a-property-with-echidna}

Мы посмотрим, как протестировать смарт-контракт с помощью Эхидны. Целью является следующий смарт-контракт [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

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

Мы сделаем предположение, что этот токен должен обладать следующими свойствами:

- Любой пользователь может иметь максимум 1000 токенов
- Токен не может быть переведен (это не токен ERC-20)

### Написание свойства {#write-a-property}

Свойства Эхидны — это функции Solidity. Свойство должно:

- Не иметь аргументов
- Возвращать `true` в случае успеха
- Иметь имя, начинающееся с `echidna`

Эхидна будет:

- Автоматически генерировать произвольные транзакции для тестирования свойства.
- Сообщать о любых транзакциях, приводящих к тому, что свойство возвращает `false` или выдает ошибку.
- Отбрасывать побочные эффекты при вызове свойства (т. е. если свойство изменяет переменную состояния, это изменение отбрасывается после теста).

Следующее свойство проверяет, что у вызывающей стороны не более 1000 токенов:

```solidity
function echidna_balance_under_1000() public view returns (bool) {
    return balances[msg.sender] <= 1000;
}
```

Используйте наследование, чтобы отделить ваш контракт от ваших свойств:

```solidity
contract TestToken is Token {
    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

[`testtoken.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/testtoken.sol) реализует свойство и наследует токен.

### Инициализация контракта {#initiate-a-contract}

Эхидне нужен [конструктор](/developers/docs/smart-contracts/anatomy/#constructor-functions) без аргументов. Если вашему контракту требуется специфическая инициализация, вам нужно выполнить ее в конструкторе.

В Эхидне есть несколько специфических адресов:

- `0x30000`, который вызывает конструктор.
- `0x10000`, `0x20000` и `0x30000`, которые случайным образом вызывают другие функции.
- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72`, где развернут тестируемый контракт.

В нашем текущем примере не требуется никакой особой инициализации, в результате чего наш конструктор пуст.

### Запуск Эхидны {#run-echidna}

Эхидна запускается с помощью:

```sh
echidna contract.sol
```

Если contract.sol содержит несколько контрактов, вы можете указать целевой:

```sh
echidna contract.sol --contract MyContract
```

При запуске в терминале Эхидна показывает интерактивный пользовательский интерфейс. Добавьте `--format text`, чтобы получить вывод в виде обычного текста, как в примерах ниже.

### Итог: Тестирование свойства {#summary-testing-a-property}

Ниже приведены итоги запуска Эхидны на нашем примере:

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

Эхидна обнаружила, что свойство нарушается, если вызывается `backdoor`.

## Фильтрация функций для вызова во время кампании фаззинга {#filtering-functions-to-call-during-a-fuzzing-campaign}

Мы посмотрим, как фильтровать функции, которые будут подвергаться фаззингу.
Целью является следующий смарт-контракт:

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

Этот небольшой пример заставляет Эхидну найти определенную последовательность транзакций для изменения переменной состояния.
Это сложная задача для фаззера.
Мы можем запустить Эхидну, чтобы проверить это:

```sh
echidna multi.sol
...
echidna_state4: passing
...
```

### Фильтрация функций {#filtering-functions}

Эхидна испытывает трудности с поиском правильной последовательности для тестирования этого контракта, потому что две функции сброса (`reset1` и `reset2`) установят все переменные состояния в `false`.
Однако мы можем использовать специальную функцию Эхидны, чтобы либо добавить функцию сброса в черный список, либо добавить в белый список только функции `f`, `g`,
`h` и `i`.

Чтобы добавить функции в черный список, мы можем использовать этот конфигурационный файл:

```yaml
filterBlacklist: true
filterFunctions: ["C.reset1()", "C.reset2()"]
```

Другой подход к фильтрации функций — перечислить функции из белого списка. Для этого мы можем использовать этот конфигурационный файл:

```yaml
filterBlacklist: false
filterFunctions: ["C.f(uint256)", "C.g(uint256)", "C.h(uint256)", "C.i()"]
```

- `filterBlacklist` по умолчанию имеет значение `true`.
- Фильтрация выполняется по полному имени функции: имя контракта, `.` и сигнатура двоичного интерфейса приложения (ABI) (например, `C.f(uint256)`). Если у вас есть `f()` и `f(uint256)`, вы можете выбрать, какую именно из них фильтровать. Простое имя, такое как `"reset1"`, ни с чем не совпадет.

### Запуск Эхидны {#run-echidna-1}

Чтобы запустить Эхидну с конфигурационным файлом `blacklist.yaml`:

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

Эхидна почти сразу найдет последовательность транзакций, чтобы опровергнуть свойство.

### Итог: Фильтрация функций {#summary-filtering-functions}

Эхидна может добавлять функции в черный или белый список для вызова во время кампании фаззинга, используя:

```yaml
filterBlacklist: true
filterFunctions: ["C.f1()", "C.f2()", "C.f3()"]
```

```sh
echidna contract.sol --config config.yaml
...
```

Эхидна начинает кампанию фаззинга, либо добавляя в черный список `C.f1()`, `C.f2()` и `C.f3()`, либо вызывая только их, в зависимости от значения логической переменной `filterBlacklist`.

## Как тестировать утверждение (assert) Solidity с помощью Эхидны {#how-to-test-soliditys-assert-with-echidna}

В этом коротком руководстве мы покажем, как использовать Эхидну для тестирования проверки утверждений в контрактах. Предположим, у нас есть такой контракт:

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

Начиная с Solidity 0.8, арифметические переполнения по умолчанию вызывают откат. Блок `unchecked` восстанавливает поведение с оборачиванием (wrapping), так что `counter` может переполниться, что и является ошибкой, которую мы хотим, чтобы Эхидна нашла.

### Написание утверждения {#write-an-assertion}

Мы хотим убедиться, что `tmp` меньше или равно `counter` после возврата их разницы. Мы могли бы написать свойство Эхидны, но нам нужно было бы где-то хранить значение `tmp`. Вместо этого мы могли бы использовать такое утверждение:

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

### Запуск Эхидны {#run-echidna-2}

Чтобы включить тестирование сбоев утверждений, передайте `--test-mode assertion` в командной строке или создайте [конфигурационный файл Эхидны](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
testMode: assertion
```

Когда мы запускаем этот контракт в Эхидне, мы получаем ожидаемые результаты:

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

Как видите, Эхидна сообщает о сбое утверждения в функции `inc`. Добавление более одного утверждения на функцию возможно, но Эхидна не сможет сказать, какое именно утверждение не сработало.

### Когда и как использовать утверждения {#when-and-how-use-assertions}

Утверждения могут использоваться как альтернатива явным свойствам, особенно если проверяемые условия напрямую связаны с правильным использованием некоторой операции `f`. Добавление утверждений после некоторого кода гарантирует, что проверка произойдет сразу после его выполнения:

```solidity
function f(..) public {
    // некоторый сложный код
    ...
    assert (condition);
    ...
}

```

Напротив, использование явного свойства Эхидны будет случайным образом выполнять транзакции, и нет простого способа точно определить, когда оно будет проверено. Тем не менее, можно использовать этот обходной путь:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Однако есть некоторые проблемы:

- Это не сработает, если `f` объявлена как `internal` или `external`.
- Неясно, какие аргументы следует использовать для вызова `f`.
- Если `f` вызывает откат, свойство завершится ошибкой.

В целом, мы рекомендуем следовать [рекомендации Джона Регера (John Regehr)](https://blog.regehr.org/archives/1091) о том, как использовать утверждения:

- Не вызывайте никаких побочных эффектов во время проверки утверждения. Например: `assert(ChangeStateAndReturn() == 1)`
- Не утверждайте очевидные вещи. Например, `assert(var >= 0)`, где `var` объявлена как `uint`.

Наконец, пожалуйста, **не используйте** `require` вместо `assert`, так как Эхидна не сможет это обнаружить (но контракт все равно выполнит откат).

### Итог: Проверка утверждений {#summary-assertion-checking}

Ниже приведены итоги запуска Эхидны на нашем примере:

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

Эхидна обнаружила, что утверждение в `inc` может не сработать, если эта функция вызывается несколько раз с большими аргументами.

## Сбор и модификация корпуса Эхидны {#collecting-and-modifying-an-echidna-corpus}

Мы посмотрим, как собирать и использовать корпус транзакций с помощью Эхидны. Целью является следующий смарт-контракт [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

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

Этот небольшой пример заставляет Эхидну найти определенные значения для изменения переменной состояния. Это сложная задача для фаззера.
Мы можем запустить Эхидну, чтобы проверить это:

```sh
echidna magic.sol
...

echidna_magic_values: passing
...
```

Однако мы все еще можем использовать Эхидну для сбора корпуса при запуске этой кампании фаззинга.

### Сбор корпуса {#collecting-a-corpus}

Чтобы включить сбор корпуса, создайте директорию для корпуса:

```sh
mkdir corpus-magic
```

И [конфигурационный файл Эхидны](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
corpusDir: "corpus-magic"
```

Теперь мы можем запустить наш инструмент и проверить собранный корпус:

```sh
echidna magic.sol --config config.yaml
```

Эхидна по-прежнему не может найти правильные магические значения. Чтобы увидеть, где она застревает, посмотрите на отчет о покрытии `corpus-magic/covered.*.txt`:

```text
7 | *   |     function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
  8 | *r  |         require(magic_1 == 42);
  9 | *r  |         require(magic_2 == 129);
 10 | *r  |         require(magic_3 == magic_4 + 333);
 11 |     |         value_found = true;
 12 |     |         return;
```

Метка `r` означает, что Эхидна достигла строки, но выполнение там откатилось, и строки после последнего `require` никогда не выполняются.

Последовательности транзакций, собранные Эхидной, сохраняются в виде файлов JSON в `corpus-magic/coverage/`. Например, первая транзакция одного из этих файлов была такой:

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

Очевидно, что эти входные данные не вызовут сбой в нашем свойстве. Однако на следующем шаге мы увидим, как изменить их для этого.

### Заполнение корпуса сидами {#seeding-a-corpus}

Эхидне нужна некоторая помощь, чтобы справиться с функцией `magic`. Мы собираемся скопировать и изменить входные данные, чтобы использовать для нее подходящие параметры (имена файлов случайны, поэтому используйте один из вашей собственной директории `corpus-magic/coverage/`):

```sh
cp corpus-magic/coverage/249425678654647553.txt corpus-magic/coverage/new.txt
```

Мы изменим `new.txt` так, чтобы он содержал одну транзакцию, вызывающую `magic(42,129,333,0)`. Теперь мы можем перезапустить Эхидну:

```sh
echidna magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    C.magic(42,129,333,0)

...
```

На этот раз она обнаружила, что свойство нарушается немедленно.

## Поиск транзакций с высоким потреблением газа {#finding-transactions-with-high-gas-consumption}

Мы посмотрим, как найти транзакции с высоким потреблением газа с помощью Эхидны. В старых версиях Эхидны для этого была опция `estimateGas`; она была удалена в Эхидне 2.3.0. Вместо этого мы измеряем газ с помощью `gasleft()` и позволяем [режиму оптимизации](https://secure-contracts.com/program-analysis/echidna/advanced/optimization_mode.html) Эхидны максимизировать его. Целью является следующий смарт-контракт:

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

Здесь `expensive` может иметь большое потребление газа.

### Измерение потребления газа {#measuring-gas-consumption}

В режиме оптимизации Эхидна ищет функции, начинающиеся с `echidna_`, которые не принимают аргументов и возвращают `int256`, и пытается найти последовательность транзакций, которая максимизирует возвращаемое значение. Мы добавляем тестовый контракт, который вызывает `f`, записывает использованный им газ и выводит максимум (сохраните оба контракта в `gas.sol`):

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

Чтобы включить режим оптимизации, создайте конфигурационный файл `config.yaml`. В этом примере мы также уменьшим размер последовательности транзакций, чтобы результаты было легче понять:

```yaml
testMode: optimization
seqLen: 2
```

### Запуск Эхидны {#run-echidna-3}

После создания конфигурационного файла мы можем запустить Эхидну следующим образом:

```sh
echidna gas.sol --contract TestGas --config config.yaml
...
echidna_opt_gas_f: max value: 127128

  Call sequence:
    TestGas.measureF(42,123,223)

...
```

- Показанный газ измеряется реализацией виртуальной машины Ethereum (EVM), на которой работает Эхидна, [hevm](https://github.com/argotorg/hevm), и включает накладные расходы на внутренний вызов из `measureF`.
- Максимум не уникален: каждая кампания случайна, и более длительные кампании (например, `--test-limit 200000`), как правило, находят большие значения.

### Фильтрация вызовов, снижающих потребление газа {#filtering-out-gas-reducing-calls}

Руководство по **фильтрации функций для вызова во время кампании фаззинга** выше показывает, как удалить некоторые функции из вашего тестирования.  
Это может иметь решающее значение для получения точной оценки газа.
Рассмотрим следующий пример:

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

`echidna_opt_gas_check` вызывает `check` и возвращает стоимость газа. Как и в любой тестовой функции Эхидны, изменения ее состояния впоследствии отбрасываются.

Если Эхидна может вызывать все функции, ей будет нелегко найти транзакции с высокой стоимостью газа:

```sh
echidna pushpop.sol --test-mode optimization
...
echidna_opt_gas_check: max value: 265706
...
```

Это потому, что стоимость зависит от размера `addrs`, а случайные вызовы, как правило, оставляют массив почти пустым.
Однако добавление `pop` и `clear` в черный список дает нам гораздо лучшие результаты:

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

Сокращение последовательности вызовов для этого результата занимает несколько минут, потому что каждое повторное воспроизведение вызывает ресурсоемкую функцию `check`.

### Итог: Поиск транзакций с высоким потреблением газа {#summary-finding-transactions-with-high-gas-consumption}

Эхидна может находить транзакции с высоким потреблением газа, измеряя газ с помощью `gasleft()` в функции `echidna_`, которая возвращает `int256`, и работая в режиме оптимизации:

```yaml
testMode: optimization
```

```sh
echidna contract.sol --config config.yaml
...
```

Эхидна сообщит о найденном максимальном значении и последовательности транзакций, которая его произвела, как только кампания фаззинга будет завершена.
