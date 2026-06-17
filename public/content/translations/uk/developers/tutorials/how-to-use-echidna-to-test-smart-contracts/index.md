---
title: Як використовувати Ехідну для тестування смарт-контрактів
description: Як використовувати Ехідну для автоматичного тестування смарт-контрактів
author: Трейлофбітс
lang: uk
tags:
  - Solidity
  - смарт-контракти
  - безпека
  - тестування
  - фазинг
skill: advanced
breadcrumb: Ехідна
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Встановлення {#installation}

Ехідну можна встановити за допомогою Docker або використовуючи попередньо скомпільований бінарний файл.

### Ехідна через Docker {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Остання команда запускає eth-security-toolbox у Docker, який має доступ до вашого поточного каталогу. Ви можете змінювати файли на своєму хості та запускати інструменти для файлів із Docker_

Усередині Docker виконайте:

```bash
solc-select 0.5.11
cd /home/training
```

### Бінарний файл {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## Вступ до фазингу на основі властивостей {#introduction-to-property-based-fuzzing}

Ехідна — це фазер на основі властивостей, який ми описували в наших попередніх публікаціях у блозі ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Фазинг {#fuzzing}

[Фазинг](https://wikipedia.org/wiki/Fuzzing) — це добре відомий метод у спільноті з безпеки. Він полягає у генеруванні більш-менш випадкових вхідних даних для пошуку помилок у програмі. Фазери для традиційного програмного забезпечення (такі як [AFL](http://lcamtuf.coredump.cx/afl/) або [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) відомі як ефективні інструменти для пошуку помилок.

Крім суто випадкового генерування вхідних даних, існує багато методів і стратегій для створення якісних вхідних даних, зокрема:

- Отримання зворотного зв'язку від кожного виконання та спрямування генерації за його допомогою. Наприклад, якщо щойно згенеровані вхідні дані призводять до виявлення нового шляху, має сенс генерувати нові вхідні дані, близькі до них.
- Генерування вхідних даних з урахуванням структурних обмежень. Наприклад, якщо ваші вхідні дані містять заголовок із контрольною сумою, буде доцільно дозволити фазеру генерувати вхідні дані, які проходять перевірку контрольної суми.
- Використання відомих вхідних даних для генерування нових: якщо ви маєте доступ до великого набору дійсних вхідних даних, ваш фазер може генерувати нові вхідні дані на їхній основі, а не починати генерацію з нуля. Їх зазвичай називають _сідами_ (seeds).

### Фазинг на основі властивостей {#property-based-fuzzing}

Ехідна належить до специфічної родини фазерів: фазинг на основі властивостей, значною мірою натхненний [QuickCheck](https://wikipedia.org/wiki/QuickCheck). На відміну від класичних фазерів, які намагаються знайти збої, Ехідна намагатиметься порушити визначені користувачем інваріанти.

У смарт-контрактах інваріантами є функції Solidity, які можуть представляти будь-який неправильний або недійсний стан, якого може досягти контракт, зокрема:

- Неправильний контроль доступу: зловмисник став власником контракту.
- Неправильна машина станів: токени можна переказувати, поки контракт призупинено.
- Неправильна арифметика: користувач може викликати антипереповнення (underflow) свого балансу та отримати необмежену кількість безкоштовних токенів.

### Тестування властивості за допомогою Ехідни {#testing-a-property-with-echidna}

Ми розглянемо, як протестувати смарт-контракт за допомогою Ехідни. Ціллю є наступний смарт-контракт [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

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

Ми зробимо припущення, що цей токен повинен мати такі властивості:

- Будь-хто може мати щонайбільше 1000 токенів
- Токен не можна переказувати (це не токен ERC-20)

### Написання властивості {#write-a-property}

Властивості Ехідни — це функції Solidity. Властивість повинна:

- Не мати аргументів
- Повертати `true`, якщо вона успішна
- Мати ім'я, що починається з `echidna`

Ехідна буде:

- Автоматично генерувати довільні транзакції для тестування властивості.
- Повідомляти про будь-які транзакції, що призводять до повернення властивістю `false` або видачі помилки.
- Відкидати побічні ефекти під час виклику властивості (тобто, якщо властивість змінює змінну стану, вона відкидається після тесту)

Наступна властивість перевіряє, що той, хто викликає, має не більше 1000 токенів:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

Використовуйте успадкування, щоб відокремити ваш контракт від ваших властивостей:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) реалізує властивість і успадковує від токена.

### Ініціалізація контракту {#initiate-a-contract}

Ехідні потрібен [конструктор](/developers/docs/smart-contracts/anatomy/#constructor-functions) без аргументів. Якщо ваш контракт потребує специфічної ініціалізації, вам потрібно зробити це в конструкторі.

В Ехідні є деякі специфічні адреси:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72`, яка викликає конструктор.
- `0x10000`, `0x20000` та `0x00a329C0648769a73afAC7F9381e08fb43DBEA70`, які випадковим чином викликають інші функції.

У нашому поточному прикладі нам не потрібна жодна особлива ініціалізація, тому наш конструктор порожній.

### Запуск Ехідни {#run-echidna}

Ехідна запускається за допомогою:

```bash
echidna-test contract.sol
```

Якщо contract.sol містить кілька контрактів, ви можете вказати ціль:

```bash
echidna-test contract.sol --contract MyContract
```

### Підсумок: Тестування властивості {#summary-testing-a-property}

Нижче наведено підсумок запуску Ехідни на нашому прикладі:

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

Ехідна виявила, що властивість порушується, якщо викликається `backdoor`.

## Фільтрування функцій для виклику під час кампанії фазингу {#filtering-functions-to-call-during-a-fuzzing-campaign}

Ми розглянемо, як фільтрувати функції, які підлягають фазингу.
Ціллю є наступний смарт-контракт:

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

Цей невеликий приклад змушує Ехідну знайти певну послідовність транзакцій для зміни змінної стану.
Це складно для фазера (рекомендується використовувати інструмент символьного виконання, такий як [Мантікора](https://github.com/trailofbits/manticore)).
Ми можемо запустити Ехідну, щоб перевірити це:

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### Фільтрування функцій {#filtering-functions}

Ехідні важко знайти правильну послідовність для тестування цього контракту, оскільки дві функції скидання (`reset1` та `reset2`) встановлять усі змінні стану на `false`.
Однак ми можемо використати спеціальну функцію Ехідни, щоб додати функцію скидання до чорного списку або додати до білого списку лише функції `f`, `g`,
`h` та `i`.

Щоб додати функції до чорного списку, ми можемо використати цей файл конфігурації:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

Інший підхід до фільтрування функцій полягає в переліку функцій із білого списку. Для цього ми можемо використати цей файл конфігурації:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` за замовчуванням має значення `true`.
- Фільтрування виконуватиметься лише за іменем (без параметрів). Якщо у вас є `f()` та `f(uint256)`, фільтр `"f"` відповідатиме обом функціям.

### Запуск Ехідни {#run-echidna-1}

Щоб запустити Ехідну з файлом конфігурації `blacklist.yaml`:

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

Ехідна майже миттєво знайде послідовність транзакцій для фальсифікації властивості.

### Підсумок: Фільтрування функцій {#summary-filtering-functions}

Ехідна може додавати функції до чорного або білого списку для виклику під час кампанії фазингу за допомогою:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Ехідна розпочинає кампанію фазингу, або додаючи до чорного списку `f1`, `f2` та `f3`, або викликаючи лише їх, залежно від значення логічної змінної `filterBlacklist`.

## Як тестувати assert у Solidity за допомогою Ехідни {#how-to-test-soliditys-assert-with-echidna}

У цьому короткому посібнику ми покажемо, як використовувати Ехідну для тестування перевірки асертів у контрактах. Припустімо, у нас є такий контракт:

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

### Написання асерту {#write-an-assertion}

Ми хочемо переконатися, що `tmp` менше або дорівнює `counter` після повернення їхньої різниці. Ми могли б написати властивість Ехідни, але нам потрібно було б десь зберігати значення `tmp`. Натомість ми можемо використати такий асерт:

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

### Запуск Ехідни {#run-echidna-2}

Щоб увімкнути тестування збоїв асертів, створіть [файл конфігурації Ехідни](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
checkAsserts: true
```

Коли ми запускаємо цей контракт в Ехідні, ми отримуємо очікувані результати:

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

Як бачите, Ехідна повідомляє про збій асерту у функції `inc`. Додавання більше одного асерту на функцію можливе, але Ехідна не зможе визначити, який саме асерт дав збій.

### Коли та як використовувати асерти {#when-and-how-use-assertions}

Асерти можна використовувати як альтернативу явним властивостям, особливо якщо умови для перевірки безпосередньо пов'язані з правильним використанням певної операції `f`. Додавання асертів після певного коду гарантує, що перевірка відбудеться відразу після його виконання:

```solidity
function f(..) public {
    // деякий складний код
    ...
    assert (condition);
    ...
}

```

Навпаки, використання явної властивості Ехідни призведе до випадкового виконання транзакцій, і немає простого способу точно визначити, коли вона буде перевірена. Усе ще можливо застосувати такий обхідний шлях:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Однак є деякі проблеми:

- Це не спрацює, якщо `f` оголошено як `internal` або `external`.
- Незрозуміло, які аргументи слід використовувати для виклику `f`.
- Якщо `f` скасовується, властивість дасть збій.

Загалом, ми рекомендуємо дотримуватися [рекомендацій Джона Регера](https://blog.regehr.org/archives/1091) щодо використання асертів:

- Не викликайте жодних побічних ефектів під час перевірки асерту. Наприклад: `assert(ChangeStateAndReturn() == 1)`
- Не використовуйте асерти для очевидних тверджень. Наприклад, `assert(var >= 0)`, де `var` оголошено як `uint`.

Нарешті, будь ласка, **не використовуйте** `require` замість `assert`, оскільки Ехідна не зможе це виявити (але контракт усе одно буде скасовано).

### Підсумок: Перевірка асертів {#summary-assertion-checking}

Нижче наведено підсумок запуску Ехідни на нашому прикладі:

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

Ехідна виявила, що асерт у `inc` може дати збій, якщо цю функцію викликати кілька разів із великими аргументами.

## Збір та модифікація корпусу Ехідни {#collecting-and-modifying-an-echidna-corpus}

Ми розглянемо, як збирати та використовувати корпус транзакцій за допомогою Ехідни. Ціллю є наступний смарт-контракт [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

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

Цей невеликий приклад змушує Ехідну знайти певні значення для зміни змінної стану. Це складно для фазера
(рекомендується використовувати інструмент символьного виконання, такий як [Мантікора](https://github.com/trailofbits/manticore)).
Ми можемо запустити Ехідну, щоб перевірити це:

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

Однак ми все ще можемо використовувати Ехідну для збору корпусу під час запуску цієї кампанії фазингу.

### Збір корпусу {#collecting-a-corpus}

Щоб увімкнути збір корпусу, створіть каталог корпусу:

```bash
mkdir corpus-magic
```

Та [файл конфігурації Ехідни](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

Тепер ми можемо запустити наш інструмент і перевірити зібраний корпус:

```bash
echidna-test magic.sol --config config.yaml
```

Ехідна все ще не може знайти правильні магічні значення, але ми можемо поглянути на зібраний нею корпус.
Наприклад, одним із цих файлів був:

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

Очевидно, що ці вхідні дані не викличуть збій у нашій властивості. Однак на наступному кроці ми побачимо, як їх змінити для цього.

### Сідінг корпусу {#seeding-a-corpus}

Ехідні потрібна допомога, щоб впоратися з функцією `magic`. Ми збираємося скопіювати та змінити вхідні дані, щоб використовувати для неї відповідні параметри:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

Ми змінимо `new.txt` для виклику `magic(42,129,333,0)`. Тепер ми можемо перезапустити Ехідну:

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

Цього разу вона виявила, що властивість порушується негайно.

## Пошук транзакцій із високим споживанням газу {#finding-transactions-with-high-gas-consumption}

Ми розглянемо, як знайти транзакції з високим споживанням газу за допомогою Ехідни. Ціллю є наступний смарт-контракт:

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

Тут `expensive` може мати велике споживання газу.

Наразі Ехідні завжди потрібна властивість для тестування: тут `echidna_test` завжди повертає `true`.
Ми можемо запустити Ехідну, щоб перевірити це:

```
echidna-test gas.sol
...
echidna_test: пройдено! 🎉

Сід: 2320549945714142710
```

### Вимірювання споживання газу {#measuring-gas-consumption}

Щоб увімкнути вимірювання споживання газу за допомогою Ехідни, створіть файл конфігурації `config.yaml`:

```yaml
estimateGas: true
```

У цьому прикладі ми також зменшимо розмір послідовності транзакцій, щоб результати було легше зрозуміти:

```yaml
seqLen: 2
estimateGas: true
```

### Запуск Ехідни {#run-echidna-3}

Після створення файлу конфігурації ми можемо запустити Ехідну таким чином:

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

- Показаний газ — це оцінка, надана [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-).

### Відфільтровування викликів, що зменшують газ {#filtering-out-gas-reducing-calls}

Посібник із **фільтрування функцій для виклику під час кампанії фазингу** вище показує, як вилучити деякі функції з вашого тестування.  
Це може бути критично важливим для отримання точної оцінки газу.
Розглянемо такий приклад:

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

Якщо Ехідна може викликати всі функції, їй буде нелегко знайти транзакції з високою вартістю газу:

```
echidna-test pushpop.sol --config config.yaml
...
pop використав максимум 10746 газу
...
check використав максимум 23730 газу
...
clear використав максимум 35916 газу
...
push використав максимум 40839 газу
```

Це тому, що вартість залежить від розміру `addrs`, а випадкові виклики, як правило, залишають масив майже порожнім.
Однак додавання `pop` та `clear` до чорного списку дає нам набагато кращі результати:

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```
echidna-test pushpop.sol --config config.yaml
...
push використав максимум 40839 газу
...
check використав максимум 1484472 газу
```

### Підсумок: Пошук транзакцій із високим споживанням газу {#summary-finding-transactions-with-high-gas-consumption}

Ехідна може знаходити транзакції з високим споживанням газу за допомогою параметра конфігурації `estimateGas`:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Ехідна повідомить про послідовність із максимальним споживанням газу для кожної функції після завершення кампанії фазингу.