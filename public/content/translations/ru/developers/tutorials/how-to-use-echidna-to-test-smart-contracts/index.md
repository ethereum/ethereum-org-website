---
title: "Как использовать Echidna для тестирования смарт-контрактов"
description: "Как использовать Echidna для автоматического тестирования смарт-контрактов"
author: "Trailofbits"
lang: ru
tags:
  [
    "Solidity",
    "Умные контракты",
    "безопасность",
    "тестирование",
    "фаззинг"
  ]
skill: advanced
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Установка {#installation}

Echidna можно установить через docker или с помощью предварительно скомпилированного двоичного файла.

### Echidna через docker {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Последняя команда запускает eth-security-toolbox в контейнере Docker, который имеет доступ к вашему текущему каталогу._ Вы можете изменять файлы со своего хоста и запускать инструменты для работы с этими файлами из контейнера Docker_

Внутри docker выполните:

```bash
solc-select 0.5.11
cd /home/training
```

### Двоичный файл {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## Введение в фаззинг на основе свойств {#introduction-to-property-based-fuzzing}

Echidna — это фаззер на основе свойств, как мы описывали в наших предыдущих статьях в блоге ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Фаззинг {#fuzzing}

[Фаззинг](https://wikipedia.org/wiki/Fuzzing) — это хорошо известная техника в сообществе безопасности. Она заключается в генерировании более или менее случайных входных данных для поиска ошибок в программе. Фаззеры для традиционного программного обеспечения (такие как [AFL](http://lcamtuf.coredump.cx/afl/) или [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) известны как эффективные инструменты для поиска ошибок.

Помимо чисто случайной генерации входных данных, существует множество методов и стратегий для создания качественных входных данных, в том числе:

- Получение обратной связи от каждого выполнения и использование ее для направления генерации. Например, если вновь сгенерированные входные данные приводят к обнаружению нового пути, имеет смысл сгенерировать новые входные данные, близкие к ним.
- Генерация входных данных с соблюдением структурных ограничений. Например, если ваши входные данные содержат заголовок с контрольной суммой, имеет смысл позволить фаззеру генерировать входные данные, проверяющие контрольную сумму.
- Использование известных входных данных для генерации новых: если у вас есть доступ к большому набору действительных входных данных, ваш фаззер может генерировать новые входные данные из них, а не начинать генерацию с нуля. Обычно их называют _затравками_.

### Фаззинг на основе свойств {#property-based-fuzzing}

Echidna принадлежит к особому семейству фаззеров: фаззинг на основе свойств, в значительной степени вдохновленный [QuickCheck](https://wikipedia.org/wiki/QuickCheck). В отличие от классического фаззера, который пытается найти сбои, Echidna пытается нарушить определенные пользователем инварианты.

В смарт-контрактах инварианты — это функции Solidity, которые могут представлять любое неверное или недопустимое состояние, в которое может перейти контракт, в том числе:

- Неправильный контроль доступа: злоумышленник стал владельцем контракта.
- Неправильный конечный автомат: токены могут быть переданы, пока контракт приостановлен.
- Неправильная арифметика: пользователь может вызвать целочисленное опустошение (underflow) своего баланса и получить неограниченное количество бесплатных токенов.

### Тестирование свойства с помощью Echidna {#testing-a-property-with-echidna}

Мы рассмотрим, как тестировать смарт-контракт с помощью Echidna. Целью является следующий смарт-контракт [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

```solidity
contract Token{
  mapping(address => uint) public balances;
  function airdrop() public{
      balances[msg.sender] = 1000;
  }
  function consume() public{
      require(balances[msg.sender]>0);
      balances[msg.sender] -= 1;
  }
  function backdoor() public{
      balances[msg.sender] += 1;
  }
}
```

Мы сделаем предположение, что этот токен должен обладать следующими свойствами:

- Любой может иметь не более 1000 токенов
- Токен не может быть передан (это не токен ERC20)

### Написание свойства {#write-a-property}

Свойства Echidna — это функции Solidity. Свойство должно:

- Не иметь аргументов
- Возвращать `true` в случае успеха
- Иметь имя, начинающееся с `echidna`

Echidna будет:

- Автоматически генерировать произвольные транзакции для проверки свойства.
- Сообщать о любых транзакциях, которые заставляют свойство возвращать `false` или вызывать ошибку.
- Отбрасывать побочные эффекты при вызове свойства (то есть если свойство изменяет переменную состояния, это изменение отменяется после теста)

Следующее свойство проверяет, что у вызывающего не более 1000 токенов:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

Используйте наследование, чтобы отделить ваш контракт от ваших свойств:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) реализует свойство и наследуется от токена.

### Инициализация контракта {#initiate-a-contract}

Echidna требуется [конструктор](/developers/docs/smart-contracts/anatomy/#constructor-functions) без аргументов. Если вашему контракту требуется особая инициализация, ее необходимо выполнить в конструкторе.

В Echidna есть несколько особых адресов:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72`, который вызывает конструктор.
- `0x10000`, `0x20000` и `0x00a329C0648769a73afAC7F9381e08fb43DBEA70`, которые случайным образом вызывают другие функции.

В нашем текущем примере не требуется никакой особой инициализации, поэтому наш конструктор пуст.

### Запуск Echidna {#run-echidna}

Echidna запускается с помощью:

```bash
echidna-test contract.sol
```

Если contract.sol содержит несколько контрактов, вы можете указать целевой контракт:

```bash
echidna-test contract.sol --contract MyContract
```

### Итог: тестирование свойства {#summary-testing-a-property}

Ниже приведены итоги запуска Echidna на нашем примере:

```solidity
contract TestToken is Token{
    constructor() public {}
        function echidna_balance_under_1000() public view returns(bool){
          return balances[msg.sender] <= 1000;
        }
  }
```

```bash
echidna-test testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence, shrinking (1205/5000):
    airdrop()
    backdoor()

...
```

Echidna обнаружила, что свойство нарушается, если вызывается `backdoor`.

## Фильтрация функций для вызова во время фаззинга {#filtering-functions-to-call-during-a-fuzzing-campaign}

Мы рассмотрим, как фильтровать функции, подлежащие фаззингу.
Целью является следующий смарт-контракт:

```solidity
contract C {
  bool state1 = false;
  bool state2 = false;
  bool state3 = false;
  bool state4 = false;

  function f(uint x) public {
    require(x == 12);
    state1 = true;
  }

  function g(uint x) public {
    require(state1);
    require(x == 8);
    state2 = true;
  }

  function h(uint x) public {
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

  function echidna_state4() public returns (bool) {
    return (!state4);
  }
}
```

Этот небольшой пример заставляет Echidna найти определенную последовательность транзакций, чтобы изменить переменную состояния.
Это сложно для фаззера (рекомендуется использовать инструмент символьного выполнения, такой как [Manticore](https://github.com/trailofbits/manticore)).
Мы можем запустить Echidna, чтобы проверить это:

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### Фильтрация функций {#filtering-functions}

Echidna испытывает трудности с поиском правильной последовательности для тестирования этого контракта, потому что две функции сброса (`reset1` и `reset2`) установят все переменные состояния в `false`.
Однако мы можем использовать специальную функцию Echidna, чтобы либо добавить функции сброса в черный список, либо добавить в белый список только функции `f`, `g`,
`h` и `i`.

Чтобы добавить функции в черный список, мы можем использовать этот файл конфигурации:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

Другой подход к фильтрации функций — перечислить функции из белого списка. Для этого мы можем использовать этот файл конфигурации:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` по умолчанию имеет значение `true`.
- Фильтрация будет выполняться только по имени (без параметров). Если у вас есть `f()` и `f(uint256)`, фильтр `"f"` будет соответствовать обеим функциям.

### Запуск Echidna {#run-echidna-1}

Чтобы запустить Echidna с файлом конфигурации `blacklist.yaml`:

```bash
echidna-test multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    f(12)
    g(8)
    h(42)
    i()
```

Echidna почти сразу найдет последовательность транзакций, чтобы опровергнуть это свойство.

### Итог: фильтрация функций {#summary-filtering-functions}

Echidna может либо добавлять функции в черный, либо в белый список для вызова во время фаззинга, используя:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna начинает кампанию фаззинга, либо добавляя в черный список `f1`, `f2` и `f3`, либо вызывая только их, в зависимости от значения логической переменной `filterBlacklist`.

## Как тестировать утверждения (assert) Solidity с помощью Echidna {#how-to-test-soliditys-assert-with-echidna}

В этом коротком руководстве мы покажем, как использовать Echidna для тестирования проверки утверждений в контрактах. Предположим, у нас есть такой контракт:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    // tmp <= counter
    return (counter - tmp);
  }
}
```

### Написание утверждения {#write-an-assertion}

Мы хотим убедиться, что `tmp` меньше или равно `counter` после возврата их разницы. Мы могли бы написать свойство
Echidna, но нам нужно было бы где-то хранить значение `tmp`. Вместо этого мы могли бы использовать такое утверждение:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

### Запуск Echidna {#run-echidna-2}

Чтобы включить тестирование сбоев утверждений, создайте [файл конфигурации Echidna](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
checkAsserts: true
```

Когда мы запускаем этот контракт в Echidna, мы получаем ожидаемые результаты:

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Как вы можете видеть, Echidna сообщает о сбое утверждения в функции `inc`. Можно добавить более одного утверждения на функцию, но Echidna не сможет сказать, какое именно утверждение не удалось.

### Когда и как использовать утверждения {#when-and-how-use-assertions}

Утверждения могут использоваться как альтернатива явным свойствам, особенно если условия для проверки напрямую связаны с правильным использованием некоторой операции `f`. Добавление утверждений после некоторого кода обеспечит, что проверка произойдет сразу после его выполнения:

```solidity
function f(..) public {
    // какой-то сложный код
    ...
    assert (condition);
    ...
}

```

Напротив, использование явного свойства Echidna приведет к случайному выполнению транзакций, и нет простого способа точно определить, когда будет выполнена проверка. Тем не менее, можно использовать такой обходной путь:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Однако есть некоторые проблемы:

- Это не сработает, если `f` объявлена как `internal` или `external`.
- Непонятно, какие аргументы следует использовать для вызова `f`.
- Если `f` отменяет транзакцию, свойство не будет выполнено.

В целом мы рекомендуем следовать [рекомендациям Джона Регера](https://blog.regehr.org/archives/1091) о том, как использовать утверждения:

- Не вызывайте никаких побочных эффектов во время проверки утверждения. Например: `assert(ChangeStateAndReturn() == 1)`
- Не утверждайте очевидные вещи. Например `assert(var >= 0)`, где `var` объявлена как `uint`.

Наконец, пожалуйста, **не используйте** `require` вместо `assert`, так как Echidna не сможет это обнаружить (но контракт все равно отменит транзакцию).

### Итог: проверка утверждений {#summary-assertion-checking}

Ниже приведены итоги запуска Echidna на нашем примере:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Echidna обнаружила, что утверждение в `inc` может не сработать, если эта функция вызывается несколько раз с большими аргументами.

## Сбор и изменение корпуса Echidna {#collecting-and-modifying-an-echidna-corpus}

Мы рассмотрим, как собирать и использовать корпус транзакций с помощью Echidna. Целью является следующий смарт-контракт [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
contract C {
  bool value_found = false;
  function magic(uint magic_1, uint magic_2, uint magic_3, uint magic_4) public {
    require(magic_1 == 42);
    require(magic_2 == 129);
    require(magic_3 == magic_4+333);
    value_found = true;
    return;
  }

  function echidna_magic_values() public returns (bool) {
    return !value_found;
  }

}
```

Этот небольшой пример заставляет Echidna найти определенные значения для изменения переменной состояния. Это сложно для фаззера
(рекомендуется использовать инструмент символьного выполнения, такой как [Manticore](https://github.com/trailofbits/manticore)).
Мы можем запустить Echidna, чтобы проверить это:

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

Однако мы все еще можем использовать Echidna для сбора корпуса при запуске этой кампании фаззинга.

### Сбор корпуса {#collecting-a-corpus}

Чтобы включить сбор корпуса, создайте каталог корпуса:

```bash
mkdir corpus-magic
```

И [файл конфигурации Echidna](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

Теперь мы можем запустить наш инструмент и проверить собранный корпус:

```bash
echidna-test magic.sol --config config.yaml
```

Echidna все еще не может найти правильные магические значения, но мы можем взглянуть на собранный ею корпус.
Например, одним из этих файлов был:

```json
[
  {
    "_gas'": "0xffffffff",
    "_delay": ["0x13647", "0xccf6"],
    "_src": "00a329c0648769a73afac7f9381e08fb43dbea70",
    "_dst": "00a329c0648769a73afac7f9381e08fb43dbea72",
    "_value": "0x0",
    "_call": {
      "tag": "SolCall",
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "93723985220345906694500679277863898678726808528711107336895287282192244575836"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "334"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "68093943901352437066264791224433559271778087297543421781073458233697135179558"
            ],
            "tag": "AbiUInt"
          },
          {
            "tag": "AbiUInt",
            "contents": [256, "332"]
          }
        ]
      ]
    },
    "_gasprice'": "0xa904461f1"
  }
]
```

Очевидно, что эти входные данные не вызовут сбоя в нашем свойстве. Однако на следующем шаге мы увидим, как изменить его для этого.

### Заполнение корпуса {#seeding-a-corpus}

Echidna нужна помощь, чтобы справиться с функцией `magic`. Мы скопируем и изменим входные данные, чтобы использовать для них подходящие
параметры:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

Мы изменим `new.txt`, чтобы вызывать `magic(42,129,333,0)`. Теперь мы можем снова запустить Echidna:

```bash
echidna-test magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    magic(42,129,333,0)


Unique instructions: 142
Unique codehashes: 1
Seed: -7293830866560616537

```

На этот раз он сразу обнаружил, что свойство нарушено.

## Поиск транзакций с высоким потреблением газа {#finding-transactions-with-high-gas-consumption}

Мы рассмотрим, как найти транзакции с высоким потреблением газа с помощью Echidna. Целью является следующий смарт-контракт:

```solidity
contract C {
  uint state;

  function expensive(uint8 times) internal {
    for(uint8 i=0; i < times; i++)
      state = state + i;
  }

  function f(uint x, uint y, uint8 times) public {
    if (x == 42 && y == 123)
      expensive(times);
    else
      state = 0;
  }

  function echidna_test() public returns (bool) {
    return true;
  }

}
```

Здесь `expensive` может иметь большое потребление газа.

В настоящее время Echidna всегда требует свойство для тестирования: здесь `echidna_test` всегда возвращает `true`.
Мы можем запустить Echidna, чтобы проверить это:

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### Измерение потребления газа {#measuring-gas-consumption}

Чтобы включить измерение потребления газа с помощью Echidna, создайте файл конфигурации `config.yaml`:

```yaml
estimateGas: true
```

В этом примере мы также уменьшим размер последовательности транзакций, чтобы результаты было легче понять:

```yaml
seqLen: 2
estimateGas: true
```

### Запуск Echidna {#run-echidna-3}

После создания файла конфигурации мы можем запустить Echidna следующим образом:

```bash
echidna-test gas.sol --config config.yaml
...
echidna_test: passed! 🎉

f использовала максимум 1333608 газа
  Call sequence:
    f(42,123,249) Gas price: 0x10d5733f0a Time delay: 0x495e5 Block delay: 0x88b2

Unique instructions: 157
Unique codehashes: 1
Seed: -325611019680165325

```

- Показанный газ является оценкой, предоставленной [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-).

### Отфильтровывание вызовов, снижающих потребление газа {#filtering-out-gas-reducing-calls}

Приведенное выше руководство по **фильтрации функций для вызова во время фаззинга** показывает, как
удалить некоторые функции из вашего тестирования.  
Это может быть критически важно для получения точной оценки газа.
Рассмотрим следующий пример:

```solidity
contract C {
  address [] addrs;
  function push(address a) public {
    addrs.push(a);
  }
  function pop() public {
    addrs.pop();
  }
  function clear() public{
    addrs.length = 0;
  }
  function check() public{
    for(uint256 i = 0; i < addrs.length; i++)
      for(uint256 j = i+1; j < addrs.length; j++)
        if (addrs[i] == addrs[j])
          addrs[j] = address(0x0);
  }
  function echidna_test() public returns (bool) {
      return true;
  }
}
```

Если Echidna может вызывать все функции, она не сможет легко найти транзакции с высокой стоимостью газа:

```
echidna-test pushpop.sol --config config.yaml
...
pop использовала максимум 10746 газа
...
check использовала максимум 23730 газа
...
clear использовала максимум 35916 газа
...
push использовала максимум 40839 газа
```

Это потому, что стоимость зависит от размера `addrs`, а случайные вызовы, как правило, оставляют массив почти пустым.
Однако добавление `pop` и `clear` в черный список дает нам гораздо лучшие результаты:

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```
echidna-test pushpop.sol --config config.yaml
...
push использовала максимум 40839 газа
...
check использовала максимум 1484472 газа
```

### Итог: поиск транзакций с высоким потреблением газа {#summary-finding-transactions-with-high-gas-consumption}

Echidna может находить транзакции с высоким потреблением газа, используя опцию конфигурации `estimateGas`:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna сообщит о последовательности с максимальным потреблением газа для каждой функции после завершения кампании фаззинга.
