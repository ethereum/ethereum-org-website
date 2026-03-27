---
title: "Як використовувати Echidna для тестування смарт-контрактів"
description: "Як використовувати Echidna для автоматичного тестування смарт-контрактів"
author: "Trailofbits"
lang: uk
tags:
  [
    "мова програмування",
    "Смарт-контракти",
    "захист",
    "тестування",
    "фазинг"
  ]
skill: advanced
breadcrumb: "Echidna"
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Встановлення {#installation}

Echidna можна встановити через Docker або за допомогою попередньо скомпільованого бінарного файлу.

### Echidna через Docker {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Остання команда запускає eth-security-toolbox у контейнері Docker, який має доступ до вашого поточного каталогу. Ви можете змінювати файли з вашого хоста та запускати інструменти для файлів із контейнера Docker_

Усередині Docker запустіть:

```bash
solc-select 0.5.11
cd /home/training
```

### Бінарний файл {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## Вступ до фазингу на основі властивостей {#introduction-to-property-based-fuzzing}

Echidna — це фазер на основі властивостей, який ми описували в наших попередніх дописах у блозі ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Фазинг {#fuzzing}

[Фазинг](https://wikipedia.org/wiki/Fuzzing) — це добре відома техніка у спільноті безпеки. Він полягає в генеруванні більш-менш випадкових вхідних даних для виявлення помилок у програмі. Фазери для традиційного програмного забезпечення (такі як [AFL](http://lcamtuf.coredump.cx/afl/) або [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) відомі як ефективні інструменти для пошуку помилок.

Окрім суто випадкової генерації вхідних даних, існує багато технік і стратегій для генерації хороших вхідних даних, зокрема:

- Отримання зворотного зв’язку від кожного виконання та використання його для керування генерацією. Наприклад, якщо щойно згенеровані вхідні дані ведуть до відкриття нового шляху, має сенс згенерувати нові вхідні дані, близькі до них.
- Генерування вхідних даних із дотриманням структурних обмежень. Наприклад, якщо ваші вхідні дані містять заголовок із контрольною сумою, є сенс дозволити фазеру генерувати вхідні дані, що перевіряють цю контрольну суму.
- Використання відомих вхідних даних для створення нових: якщо у вас є доступ до великого набору дійсних вхідних даних, ваш фазер може генерувати нові вхідні дані з них, а не починати генерацію з нуля. Зазвичай їх називають _сідами_.

### Фазинг на основі властивостей {#property-based-fuzzing}

Echidna належить до специфічної родини фазерів: фазинг на основі властивостей, значною мірою натхненний [QuickCheck](https://wikipedia.org/wiki/QuickCheck). На відміну від класичного фазера, який намагатиметься знайти збої, Echidna намагатиметься порушити визначені користувачем інваріанти.

У смарт-контрактах інваріанти — це функції Solidity, які можуть представляти будь-який некоректний або недійсний стан, якого може досягти контракт, зокрема:

- Некоректний контроль доступу: зловмисник став власником контракту.
- Некоректний кінцевий автомат: токени можна передавати, поки контракт призупинено.
- Некоректна арифметика: користувач може викликати спустошення свого балансу (underflow) і отримати необмежену кількість безкоштовних токенів.

### Тестування властивості за допомогою Echidna {#testing-a-property-with-echidna}

Розглянемо, як протестувати смарт-контракт за допомогою Echidna. Ціллю є наступний смарт-контракт [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

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

Припустимо, що цей токен повинен мати такі властивості:

- Будь-хто може мати щонайбільше 1000 токенів
- Токен не можна передати (це не токен ERC20)

### Написання властивості {#write-a-property}

Властивості Echidna — це функції Solidity. Властивість повинна:

- Не мати аргументів
- Повертати `true` у разі успішної перевірки
- Мати назву, що починається з `echidna`

Echidna:

- Автоматично генеруватиме довільні транзакції для тестування властивості.
- Повідомляти про будь-які транзакції, що змушують властивість повертати `false` або викликати помилку.
- Ігнорувати побічні ефекти під час виклику властивості (тобто якщо властивість змінює змінну стану, ця зміна скасовується після тесту)

Наступна властивість перевіряє, що той, хто викликає функцію, має не більше 1000 токенів:

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

Echidna потребує [конструктор](/developers/docs/smart-contracts/anatomy/#constructor-functions) без аргументів. Якщо ваш контракт потребує спеціальної ініціалізації, ви повинні зробити це в конструкторі.

У Echidna є кілька спеціальних адрес:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72`, яка викликає конструктор.
- `0x10000`, `0x20000` та `0x00a329C0648769a73afAC7F9381e08fb43DBEA70`, які випадково викликають інші функції.

У нашому поточному прикладі нам не потрібна якась особлива ініціалізація, тому наш конструктор порожній.

### Запуск Echidna {#run-echidna}

Echidna запускається за допомогою:

```bash
echidna-test contract.sol
```

Якщо contract.sol містить кілька контрактів, ви можете вказати цільовий:

```bash
echidna-test contract.sol --contract MyContract
```

### Підсумок: Тестування властивості {#summary-testing-a-property}

Нижче наведено підсумок запуску Echidna на нашому прикладі:

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

echidna_balance_under_1000: збій!💥
  Послідовність викликів, скорочення (1205/5000):
    airdrop()
    backdoor()

...
```

Echidna виявила, що властивість порушується, якщо викликається `backdoor`.

## Фільтрування функцій для виклику під час кампанії фазингу {#filtering-functions-to-call-during-a-fuzzing-campaign}

Розглянемо, як фільтрувати функції, що підлягають фазингу.
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

Цей невеликий приклад змушує Echidna знайти певну послідовність транзакцій, щоб змінити змінну стану.
Це складно для фазера (рекомендується використовувати інструмент символьного виконання, наприклад [Manticore](https://github.com/trailofbits/manticore)).
Ми можемо запустити Echidna, щоб перевірити це:

```bash
echidna-test multi.sol
...
echidna_state4: пройдено! 🎉
Seed: -3684648582249875403
```

### Фільтрування функцій {#filtering-functions}

Echidna має труднощі з пошуком правильної послідовності для тестування цього контракту, оскільки дві функції скидання (`reset1` і `reset2`) встановлюють для всіх змінних стану значення `false`.
Однак ми можемо використати спеціальну функцію Echidna, щоб або додати функцію скидання до чорного списку, або додати до білого списку лише функції `f`, `g`,
`h` та `i`.

Щоб додати функції до чорного списку, ми можемо використати такий файл конфігурації:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

Інший підхід до фільтрування функцій — це перерахувати функції з білого списку. Для цього ми можемо використати такий файл конфігурації:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` має значення `true` за замовчуванням.
- Фільтрація виконуватиметься лише за назвою (без параметрів). Якщо у вас є `f()` та `f(uint256)`, фільтр `"f"` відповідатиме обом функціям.

### Запуск Echidna {#run-echidna-1}

Щоб запустити Echidna з файлом конфігурації `blacklist.yaml`:

```bash
echidna-test multi.sol --config blacklist.yaml
...
echidna_state4: збій!💥
  Послідовність виклику:
    f(12)
    g(8)
    h(42)
    i()
```

Echidna майже миттєво знайде послідовність транзакцій, щоб спростувати властивість.

### Підсумок: Фільтрування функцій {#summary-filtering-functions}

Echidna може додавати функції до чорного або білого списку для виклику під час кампанії фазингу за допомогою:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna починає кампанію фазингу, або додаючи до чорного списку `f1`, `f2` і `f3`, або викликаючи тільки їх, залежно
від логічного значення `filterBlacklist`.

## Як тестувати `assert` Solidity за допомогою Echidna {#how-to-test-soliditys-assert-with-echidna}

У цьому короткому посібнику ми покажемо, як використовувати Echidna для тестування перевірки тверджень (`assert`) у контрактах. Припустімо, у нас є такий контракт:

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

### Написання твердження {#write-an-assertion}

Ми хочемо переконатися, що `tmp` менше або дорівнює `counter` після повернення їхньої різниці. Ми могли б написати
властивість Echidna, але нам потрібно буде десь зберігати значення `tmp`. Натомість ми могли б використати таке твердження:

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

Щоб увімкнути тестування збоїв тверджень, створіть [файл конфігурації Echidna](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
checkAsserts: true
```

Коли ми запускаємо цей контракт у Echidna, ми отримуємо очікувані результати:

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: збій!💥
  Послідовність викликів, скорочення (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Як бачите, Echidna повідомляє про збій твердження у функції `inc`. Можна додати більше одного твердження на функцію, але Echidna не може сказати, яке саме твердження не виконалося.

### Коли і як використовувати твердження {#when-and-how-use-assertions}

Твердження можна використовувати як альтернативу явним властивостям, особливо якщо умови, які потрібно перевірити, безпосередньо пов'язані з правильним використанням деякої операції `f`. Додавання тверджень після певного коду забезпечить, що перевірка відбудеться одразу після його виконання:

```solidity
function f(..) public {
    // some complex code
    ...
    assert (condition);
    ...
}

```

Навпаки, використання явної властивості Echidna призведе до випадкового виконання транзакцій, і немає простого способу точно визначити, коли відбудеться перевірка. Проте, все ще можна зробити це обхідним шляхом:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Однак, є деякі проблеми:

- Це не спрацює, якщо `f` оголошена як `internal` або `external`.
- Незрозуміло, які аргументи слід використовувати для виклику `f`.
- Якщо `f` скасовує транзакцію, властивість не буде виконана.

Загалом, ми рекомендуємо дотримуватися [рекомендації Джона Регера](https://blog.regehr.org/archives/1091) щодо використання тверджень:

- Не викликайте жодних побічних ефектів під час перевірки твердження. Наприклад: `assert(ChangeStateAndReturn() == 1)`
- Не робіть тверджень щодо очевидних речей. Наприклад `assert(var >= 0)`, де `var` оголошено як `uint`.

Нарешті, будь ласка, **не використовуйте** `require` замість `assert`, оскільки Echidna не зможе це виявити (але контракт все одно скасує транзакцію).

### Підсумок: перевірка тверджень {#summary-assertion-checking}

Нижче наведено підсумок запуску Echidna на нашому прикладі:

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
assertion in inc: збій!💥
  Послідовність викликів, скорочення (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Echidna виявила, що твердження в `inc` може не виконуватися, якщо ця функція викликається кілька разів із великими аргументами.

## Збір і зміна корпусу Echidna {#collecting-and-modifying-an-echidna-corpus}

Розглянемо, як збирати та використовувати корпус транзакцій з Echidna. Ціллю є наступний смарт-контракт [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

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

Цей невеликий приклад змушує Echidna знайти певні значення для зміни змінної стану. Це складно для фазера
(рекомендується використовувати інструмент символьного виконання, як-от [Manticore](https://github.com/trailofbits/manticore)).
Ми можемо запустити Echidna, щоб перевірити це:

```bash
echidna-test magic.sol
...

echidna_magic_values: пройдено! 🎉

Seed: 2221503356319272685
```

Однак ми все ще можемо використовувати Echidna для збору корпусу під час запуску цієї кампанії фазингу.

### Збір корпусу {#collecting-a-corpus}

Щоб увімкнути збір корпусу, створіть каталог корпусу:

```bash
mkdir corpus-magic
```

І [файл конфігурації Echidna](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

Тепер ми можемо запустити наш інструмент і перевірити зібраний корпус:

```bash
echidna-test magic.sol --config config.yaml
```

Echidna все ще не може знайти правильні магічні значення, але ми можемо подивитися на зібраний нею корпус.
Наприклад, один з цих файлів був:

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

Очевидно, що ці вхідні дані не викличуть збій у нашій властивості. Однак на наступному кроці ми побачимо, як це змінити.

### Використання початкових даних для корпусу {#seeding-a-corpus}

Echidna потребує деякої допомоги, щоб впоратися з функцією `magic`. Ми збираємося скопіювати та змінити вхідні дані, щоб використовувати відповідні
параметри для неї:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

Ми змінимо `new.txt`, щоб викликати `magic(42,129,333,0)`. Тепер ми можемо перезапустити Echidna:

```bash
echidna-test magic.sol --config config.yaml
...
echidna_magic_values: збій!💥
  Послідовність виклику:
    magic(42,129,333,0)


Unique instructions: 142
Unique codehashes: 1
Seed: -7293830866560616537

```

Цього разу було виявлено, що властивість порушується негайно.

## Пошук транзакцій з високим споживанням газу {#finding-transactions-with-high-gas-consumption}

Розглянемо, як за допомогою Echidna знаходити транзакції з високим споживанням газу. Ціллю є наступний смарт-контракт:

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

Наразі Echidna завжди потребує властивості для тестування: тут `echidna_test` завжди повертає `true`.
Ми можемо запустити Echidna, щоб перевірити це:

```
echidna-test gas.sol
...
echidna_test: пройдено! 🎉

Seed: 2320549945714142710
```

### Вимірювання споживання газу {#measuring-gas-consumption}

Щоб увімкнути вимірювання споживання газу за допомогою Echidna, створіть файл конфігурації `config.yaml`:

```yaml
estimateGas: true
```

У цьому прикладі ми також зменшимо розмір послідовності транзакцій, щоб полегшити розуміння результатів:

```yaml
seqLen: 2
estimateGas: true
```

### Запуск Echidna {#run-echidna-3}

Після створення файлу конфігурації ми можемо запустити Echidna так:

```bash
echidna-test gas.sol --config config.yaml
...
echidna_test: пройдено! 🎉

f використала максимум 1333608 газу
  Послідовність виклику:
    f(42,123,249) Gas price: 0x10d5733f0a Time delay: 0x495e5 Block delay: 0x88b2

Unique instructions: 157
Unique codehashes: 1
Seed: -325611019680165325

```

- Показаний газ є оцінкою, наданою [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-).

### Відфільтровування викликів, що зменшують газ {#filtering-out-gas-reducing-calls}

Посібник з **фільтрування функцій для виклику під час кампанії фазингу** вище показує, як
видалити деякі функції з тестування.  
Це може бути критично важливим для отримання точної оцінки газу.
Розгляньмо такий приклад:

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

Якщо Echidna може викликати всі функції, вона не зможе легко знайти транзакції з високою вартістю газу:

```
echidna-test pushpop.sol --config config.yaml
...
pop used a maximum of 10746 gas
...
check used a maximum of 23730 gas
...
clear used a maximum of 35916 gas
...
push used a maximum of 40839 gas
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
push used a maximum of 40839 gas
...
check used a maximum of 1484472 gas
```

### Підсумок: пошук транзакцій з високим споживанням газу {#summary-finding-transactions-with-high-gas-consumption}

Echidna може знаходити транзакції з високим споживанням газу за допомогою параметра конфігурації `estimateGas`:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna повідомить про послідовність із максимальним споживанням газу для кожної функції після завершення кампанії фазингу.
