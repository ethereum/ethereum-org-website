---
title: Как использовать Эхидну для тестирования смарт-контрактов
description: Как использовать Эхидну для автоматического тестирования смарт-контрактов
author: "Trailofbits"
lang: ru
tags: ["Solidity", "смарт-контракты", "безопасность", "тестирование", "фаззинг"]
skill: advanced
breadcrumb: Эхидна
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Установка {#installation}

Эхидну можно установить через Docker или используя предварительно скомпилированный бинарный файл.

### Эхидна через Docker {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Последняя команда запускает eth-security-toolbox в Docker, который имеет доступ к вашей текущей директории. Вы можете изменять файлы на вашем хосте и запускать инструменты для этих файлов из Docker._

Внутри Docker выполните:

```bash
solc-select 0.5.11
cd /home/training
```

### Бинарный файл {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## Введение в фаззинг на основе свойств {#introduction-to-property-based-fuzzing}

Эхидна — это фаззер на основе свойств, который мы описывали в наших предыдущих статьях в блоге ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Фаззинг {#fuzzing}

[Фаззинг](https://wikipedia.org/wiki/Fuzzing) — это хорошо известная методика в сообществе специалистов по безопасности. Она заключается в генерации более или менее случайных входных данных для поиска ошибок в программе. Фаззеры для традиционного программного обеспечения (такие как [AFL](http://lcamtuf.coredump.cx/afl/) или [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) известны как эффективные инструменты для поиска багов.

Помимо чисто случайной генерации входных данных, существует множество методов и стратегий для создания качественных входных данных, включая:

- Получение обратной связи от каждого выполнения и направление генерации с ее помощью. Например, если новые сгенерированные входные данные приводят к обнаружению нового пути, имеет смысл генерировать новые входные данные, близкие к ним.
- Генерация входных данных с учетом структурных ограничений. Например, если ваши входные данные содержат заголовок с контрольной суммой, имеет смысл позволить фаззеру генерировать входные данные, которые проходят проверку контрольной суммы.
- Использование известных входных данных для генерации новых: если у вас есть доступ к большому набору корректных входных данных, ваш фаззер может генерировать новые данные на их основе, а не начинать генерацию с нуля. Обычно они называются _сидами_ (seeds).

### Фаззинг на основе свойств {#property-based-fuzzing}

Эхидна принадлежит к определенному семейству фаззеров: фаззинг на основе свойств, в значительной степени вдохновленный [QuickCheck](https://wikipedia.org/wiki/QuickCheck). В отличие от классических фаззеров, которые пытаются найти сбои, Эхидна будет пытаться нарушить определенные пользователем инварианты.

В смарт-контрактах инварианты — это функции Solidity, которые могут представлять любое некорректное или недействительное состояние, которого может достичь контракт, включая:

- Неправильный контроль доступа: злоумышленник стал владельцем контракта.
- Неправильный конечный автомат: токены могут быть переведены, пока контракт приостановлен.
- Неправильная арифметика: пользователь может вызвать антипереполнение (underflow) своего баланса и получить неограниченное количество бесплатных токенов.

### Тестирование свойства с помощью Эхидны {#testing-a-property-with-echidna}

Мы рассмотрим, как протестировать смарт-контракт с помощью Эхидны. Целью является следующий смарт-контракт [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

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

Мы сделаем допущение, что этот токен должен обладать следующими свойствами:

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
- Отбрасывать побочные эффекты при вызове свойства (т. е. если свойство изменяет переменную состояния, это изменение отменяется после теста)

Следующее свойство проверяет, что у вызывающей стороны не более 1000 токенов:

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

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) реализует свойство и наследует токен.

### Инициализация контракта {#initiate-a-contract}

Эхидне нужен [конструктор](/developers/docs/smart-contracts/anatomy/#constructor-functions) без аргументов. Если вашему контракту требуется специфическая инициализация, вам нужно выполнить ее в конструкторе.

В Эхидне есть несколько специфических адресов:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72`, который вызывает конструктор.
- `0x10000`, `0x20000` и `0x00a329C0648769a73afAC7F9381e08fb43DBEA70`, которые случайным образом вызывают другие функции.

В нашем текущем примере нам не нужна какая-либо особая инициализация, поэтому наш конструктор пуст.

### Запуск Эхидны {#run-echidna}

Эхидна запускается с помощью:

```bash
echidna-test contract.sol
```

Если contract.sol содержит несколько контрактов, вы можете указать целевой:

```bash
echidna-test contract.sol --contract MyContract
```

### Итоги: Тестирование свойства {#summary-testing-a-property}

Ниже приведены итоги запуска Эхидны на нашем примере:

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

Эхидна обнаружила, что свойство нарушается, если вызывается `backdoor`.

## Фильтрация функций для вызова во время кампании фаззинга {#filtering-functions-to-call-during-a-fuzzing-campaign}

Мы рассмотрим, как фильтровать функции, которые будут подвергаться фаззингу.
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

Этот небольшой пример заставляет Эхидну найти определенную последовательность транзакций для изменения переменной состояния.
Это сложная задача для фаззера (рекомендуется использовать инструмент символьного выполнения, такой как [Мантикора](https://github.com/trailofbits/manticore)).
Мы можем запустить Эхидну, чтобы проверить это:

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### Фильтрация функций {#filtering-functions}

Эхидна испытывает трудности с поиском правильной последовательности для тестирования этого контракта, потому что две функции сброса (`reset1` и `reset2`) установят все переменные состояния в `false`.
Однако мы можем использовать специальную функцию Эхидны, чтобы либо добавить функцию сброса в черный список, либо добавить в белый список только функции `f`, `g`,
`h` и `i`.

Чтобы добавить функции в черный список, мы можем использовать этот конфигурационный файл:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

Другой подход к фильтрации функций — перечислить функции из белого списка. Для этого мы можем использовать этот конфигурационный файл:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` по умолчанию имеет значение `true`.
- Фильтрация будет выполняться только по имени (без параметров). Если у вас есть `f()` и `f(uint256)`, фильтр `"f"` будет соответствовать обеим функциям.

### Запуск Эхидны {#run-echidna-1}

Чтобы запустить Эхидну с конфигурационным файлом `blacklist.yaml`:

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

Эхидна почти мгновенно найдет последовательность транзакций для фальсификации свойства.

### Итоги: Фильтрация функций {#summary-filtering-functions}

Эхидна может использовать черный или белый список функций для вызова во время кампании фаззинга с помощью:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Эхидна начинает кампанию фаззинга, либо занося в черный список `f1`, `f2` и `f3`, либо вызывая только их, в зависимости
от значения логической переменной `filterBlacklist`.

## Как тестировать утверждения (assert) Solidity с помощью Эхидны {#how-to-test-soliditys-assert-with-echidna}

В этом кратком руководстве мы покажем, как использовать Эхидну для тестирования проверки утверждений в контрактах. Предположим, у нас есть такой контракт:

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

Мы хотим убедиться, что `tmp` меньше или равно `counter` после возврата их разности. Мы могли бы написать
свойство Эхидны, но нам нужно было бы где-то хранить значение `tmp`. Вместо этого мы можем использовать такое утверждение:

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

### Запуск Эхидны {#run-echidna-2}

Чтобы включить тестирование сбоев утверждений, создайте [конфигурационный файл Эхидны](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
checkAsserts: true
```

Когда мы запускаем этот контракт в Эхидне, мы получаем ожидаемые результаты:

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

Напротив, использование явного свойства Эхидны будет случайным образом выполнять транзакции, и нет простого способа точно определить, когда оно будет проверено. Тем не менее, можно использовать следующий обходной путь:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Однако есть некоторые проблемы:

- Это не сработает, если `f` объявлена как `internal` или `external`.
- Неясно, какие аргументы следует использовать для вызова `f`.
- Если `f` вызывает откат (revert), свойство завершится ошибкой.

В целом, мы рекомендуем следовать [рекомендациям Джона Регера (John Regehr)](https://blog.regehr.org/archives/1091) по использованию утверждений:

- Не вызывайте никаких побочных эффектов во время проверки утверждения. Например: `assert(ChangeStateAndReturn() == 1)`
- Не утверждайте очевидные вещи. Например, `assert(var >= 0)`, где `var` объявлена как `uint`.

Наконец, пожалуйста, **не используйте** `require` вместо `assert`, так как Эхидна не сможет его обнаружить (но контракт все равно откатится).

### Итоги: Проверка утверждений {#summary-assertion-checking}

Ниже приведены итоги запуска Эхидны на нашем примере:

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

Эхидна обнаружила, что утверждение в `inc` может не сработать, если эта функция вызывается несколько раз с большими аргументами.

## Сбор и модификация корпуса Эхидны {#collecting-and-modifying-an-echidna-corpus}

Мы рассмотрим, как собирать и использовать корпус транзакций с помощью Эхидны. Целью является следующий смарт-контракт [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

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

Этот небольшой пример заставляет Эхидну найти определенные значения для изменения переменной состояния. Это сложная задача для фаззера
(рекомендуется использовать инструмент символьного выполнения, такой как [Мантикора](https://github.com/trailofbits/manticore)).
Мы можем запустить Эхидну, чтобы проверить это:

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

Однако мы все равно можем использовать Эхидну для сбора корпуса при запуске этой кампании фаззинга.

### Сбор корпуса {#collecting-a-corpus}

Чтобы включить сбор корпуса, создайте директорию для корпуса:

```bash
mkdir corpus-magic
```

И [конфигурационный файл Эхидны](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

Теперь мы можем запустить наш инструмент и проверить собранный корпус:

```bash
echidna-test magic.sol --config config.yaml
```

Эхидна по-прежнему не может найти правильные магические значения, но мы можем взглянуть на собранный ею корпус.
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

Очевидно, что эти входные данные не вызовут сбой в нашем свойстве. Однако на следующем шаге мы увидим, как изменить их для этого.

### Использование сидов для корпуса {#seeding-a-corpus}

Эхидне нужна помощь, чтобы справиться с функцией `magic`. Мы скопируем и изменим входные данные, чтобы использовать для нее подходящие
параметры:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

Мы изменим `new.txt` для вызова `magic(42,129,333,0)`. Теперь мы можем перезапустить Эхидну:

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

На этот раз она обнаружила, что свойство нарушается немедленно.

## Поиск транзакций с высоким потреблением газа {#finding-transactions-with-high-gas-consumption}

Мы рассмотрим, как найти транзакции с высоким потреблением газа с помощью Эхидны. Целью является следующий смарт-контракт:

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

В настоящее время Эхидне всегда нужно свойство для тестирования: здесь `echidna_test` всегда возвращает `true`.
Мы можем запустить Эхидну, чтобы проверить это:

```
echidna-test gas.sol
...
echidna_test: пройдено! 🎉

Seed: 2320549945714142710
```

### Измерение потребления газа {#measuring-gas-consumption}

Чтобы включить измерение потребления газа в Эхидне, создайте конфигурационный файл `config.yaml`:

```yaml
estimateGas: true
```

В этом примере мы также уменьшим размер последовательности транзакций, чтобы результаты было легче понять:

```yaml
seqLen: 2
estimateGas: true
```

### Запуск Эхидны {#run-echidna-3}

После создания конфигурационного файла мы можем запустить Эхидну следующим образом:

```bash
echidna-test gas.sol --config config.yaml
...
echidna_test: passed! 🎉

f used a maximum of 1333608 gas
  Call sequence:
    f(42,123,249) Gas price: 0x10d5733f0a Time delay: 0x495e5 Block delay: 0x88b2

Unique instructions: 157
Unique codehashes: 1
Seed: -325611019680165325

```

- Показанный газ — это оценка, предоставленная [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-).

### Отсеивание вызовов, снижающих потребление газа {#filtering-out-gas-reducing-calls}

В руководстве по **фильтрации функций для вызова во время кампании фаззинга** выше показано, как
исключить некоторые функции из вашего тестирования.  
Это может иметь решающее значение для получения точной оценки газа.
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

Если Эхидна может вызывать все функции, ей будет нелегко найти транзакции с высокой стоимостью газа:

```
echidna-test pushpop.sol --config config.yaml
...
pop использовал максимум 10746 газа
...
check использовал максимум 23730 газа
...
clear использовал максимум 35916 газа
...
push использовал максимум 40839 газа
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
push использовал максимум 40839 газа
...
check использовал максимум 1484472 газа
```

### Итоги: Поиск транзакций с высоким потреблением газа {#summary-finding-transactions-with-high-gas-consumption}

Эхидна может находить транзакции с высоким потреблением газа, используя параметр конфигурации `estimateGas`:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Эхидна сообщит о последовательности с максимальным потреблением газа для каждой функции после завершения кампании фаззинга.