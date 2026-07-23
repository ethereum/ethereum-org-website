---
title: "Як використовувати Мантікору для пошуку помилок у смарт-контрактах"
description: "Як використовувати Мантікору для автоматичного пошуку помилок у смарт-контрактах"
author: "Трейлофбітс"
lang: uk
tags:
  ["Solidity", "смарт-контракти", "безпека", "тестування", "формальна верифікація"]
skill: advanced
breadcrumb: "Мантікора"
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

Мета цього посібника — показати, як використовувати Мантікору для автоматичного пошуку помилок у смарт-контрактах.

## Встановлення {#installation}

Мантікора вимагає >= Python 3.6. Її можна встановити через pip або за допомогою Docker.

### Мантікора через Docker {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Остання команда запускає eth-security-toolbox у Docker, який має доступ до вашого поточного каталогу. Ви можете змінювати файли на своєму хості та запускати інструменти для цих файлів із Docker_

Усередині Docker виконайте:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Мантікора через pip {#manticore-through-pip}

```bash
pip3 install --user manticore
```

Рекомендується використовувати solc 0.5.11.

### Запуск скрипта {#running-a-script}

Щоб запустити скрипт Python за допомогою Python 3:

```bash
python3 script.py
```

## Вступ до динамічного символічного виконання {#introduction-to-dynamic-symbolic-execution}

### Коротко про динамічне символічне виконання {#dynamic-symbolic-execution-in-a-nutshell}

Динамічне символічне виконання (DSE) — це метод аналізу програм, який досліджує простір станів із високим ступенем семантичної обізнаності. Цей метод базується на виявленні «шляхів програми», представлених у вигляді математичних формул, що називаються `path predicates`. Концептуально цей метод працює з предикатами шляхів у два етапи:

1. Вони будуються з використанням обмежень на вхідні дані програми.
2. Вони використовуються для генерації вхідних даних програми, які призведуть до виконання відповідних шляхів.

Цей підхід не дає хибнопозитивних результатів у тому сенсі, що всі виявлені стани програми можуть бути викликані під час конкретного виконання. Наприклад, якщо аналіз виявляє цілочисельне переповнення, воно гарантовано буде відтворюваним.

### Приклад предиката шляху {#path-predicate-example}

Щоб зрозуміти, як працює DSE, розглянемо такий приклад:

```solidity
function f(uint a){

  if (a == 65) {
      // Присутня помилка
  }

}
```

Оскільки `f()` містить два шляхи, DSE побудує два різні предикати шляхів:

- Шлях 1: `a == 65`
- Шлях 2: `Not (a == 65)`

Кожен предикат шляху — це математична формула, яку можна передати так званому [SMT-вирішувачу](https://wikipedia.org/wiki/Satisfiability_modulo_theories), який спробує розв'язати рівняння. Для `Path 1` вирішувач скаже, що шлях можна дослідити за допомогою `a = 65`. Для `Path 2` вирішувач може надати `a` будь-яке значення, крім 65, наприклад `a = 0`.

### Перевірка властивостей {#verifying-properties}

Мантікора дозволяє повністю контролювати виконання кожного шляху. Як наслідок, вона дозволяє додавати довільні обмеження майже до будь-чого. Цей контроль дозволяє створювати властивості для контракту.

Розглянемо такий приклад:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // немає захисту від переповнення
  return c;
}
```

Тут є лише один шлях для дослідження у функції:

- Шлях 1: `c = a + b`

Використовуючи Мантікору, ви можете перевірити наявність переповнення та додати обмеження до предиката шляху:

- `c = a + b AND (c < a OR c < b)`

Якщо можливо знайти значення `a` та `b`, для яких наведений вище предикат шляху є здійсненним, це означає, що ви знайшли переповнення. Наприклад, вирішувач може згенерувати вхідні дані `a = 10 , b = MAXUINT256`.

Якщо розглянути виправлену версію:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

Відповідна формула з перевіркою переповнення буде такою:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

Цю формулу неможливо розв'язати; іншими словами, це **доказ** того, що в `safe_add` значення `c` завжди буде збільшуватися.

Таким чином, DSE є потужним інструментом, який може перевіряти довільні обмеження у вашому коді.

## Запуск під управлінням Мантікори {#running-under-manticore}

Ми побачимо, як досліджувати смарт-контракт за допомогою API Мантікори. Ціллю є такий смарт-контракт [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;

contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### Запуск автономного дослідження {#run-a-standalone-exploration}

Ви можете запустити Мантікору безпосередньо для смарт-контракту за допомогою такої команди (`project` може бути файлом Solidity або каталогом проєкту):

```bash
$ manticore project
```

Ви отримаєте вивід тестових випадків, подібний до цього (порядок може змінюватися):

```
...
... m.c.manticore:INFO: Згенеровано тестовий випадок № 0 - STOP
... m.c.manticore:INFO: Згенеровано тестовий випадок № 1 - REVERT
... m.c.manticore:INFO: Згенеровано тестовий випадок № 2 - RETURN
... m.c.manticore:INFO: Згенеровано тестовий випадок № 3 - REVERT
... m.c.manticore:INFO: Згенеровано тестовий випадок № 4 - STOP
... m.c.manticore:INFO: Згенеровано тестовий випадок № 5 - REVERT
... m.c.manticore:INFO: Згенеровано тестовий випадок № 6 - REVERT
... m.c.manticore:INFO: Результати в /home/ethsec/workshops/Automated Smart Contracts Audit - TruffleCon 2018/manticore/examples/mcore_t6vi6ij3
...
```

Без додаткової інформації Мантікора досліджуватиме контракт за допомогою нових символічних
транзакцій, доки не перестане знаходити нові шляхи в контракті. Мантікора не запускає нові транзакції після невдалої (наприклад, після скасування).

Мантікора виведе інформацію в каталог `mcore_*`. Серед іншого, у цьому каталозі ви знайдете:

- `global.summary`: покриття та попередження компілятора
- `test_XXXXX.summary`: покриття, остання інструкція, баланси акаунтів для кожного тестового випадку
- `test_XXXXX.tx`: детальний список транзакцій для кожного тестового випадку

Тут Мантікора знаходить 7 тестових випадків, які відповідають (порядок імен файлів може змінюватися):

|                      |   Транзакція 0    |   Транзакція 1    | Транзакція 2      | Результат |
| :------------------: | :---------------: | :---------------: | ----------------- | :-------: |
| **test_00000000.tx** | Створення контракту |      f(!=65)      | f(!=65)           |   STOP    |
| **test_00000001.tx** | Створення контракту | резервна функція  |                   |  REVERT   |
| **test_00000002.tx** | Створення контракту |                   |                   |  RETURN   |
| **test_00000003.tx** | Створення контракту |       f(65)       |                   |  REVERT   |
| **test_00000004.tx** | Створення контракту |      f(!=65)      |                   |   STOP    |
| **test_00000005.tx** | Створення контракту |      f(!=65)      | f(65)             |  REVERT   |
| **test_00000006.tx** | Створення контракту |      f(!=65)      | резервна функція  |  REVERT   |

_Підсумок дослідження: f(!=65) означає, що f викликається з будь-яким значенням, відмінним від 65._

Як ви можете помітити, Мантікора генерує унікальний тестовий випадок для кожної успішної або скасованої транзакції.

Використовуйте прапорець `--quick-mode`, якщо вам потрібне швидке дослідження коду (це вимикає детектори помилок, обчислення газу тощо).

### Маніпулювання смарт-контрактом через API {#manipulate-a-smart-contract-through-the-api}

У цьому розділі докладно описано, як маніпулювати смарт-контрактом через API Мантікори для Python. Ви можете створити новий файл із розширенням Python `*.py` і написати необхідний код, додавши команди API (основи яких будуть описані нижче) у цей файл, а потім запустити його за допомогою команди `$ python3 *.py`. Також ви можете виконувати наведені нижче команди безпосередньо в консолі Python; щоб запустити консоль, скористайтеся командою `$ python3`.

### Створення акаунтів {#creating-accounts}

Перше, що вам слід зробити, це ініціювати новий блокчейн за допомогою таких команд:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

Акаунт, що не є контрактом, створюється за допомогою [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account):

```python
user_account = m.create_account(balance=1000)
```

Контракт Solidity можна розгорнути за допомогою [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract):

```solidity
source_code = '''
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
'''
# Initiate the contract
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### Підсумок {#summary}

- Ви можете створювати акаунти користувачів та акаунти контрактів за допомогою [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) та [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract).

### Виконання транзакцій {#executing-transactions}

Мантікора підтримує два типи транзакцій:

- Необроблена транзакція (raw transaction): досліджуються всі функції
- Іменована транзакція (named transaction): досліджується лише одна функція

#### Необроблена транзакція {#raw-transaction}

Необроблена транзакція виконується за допомогою [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction):

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

Викликач, адреса, дані або значення транзакції можуть бути як конкретними, так і символічними:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) створює символічне значення.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) створює символічний масив байтів.

Наприклад:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

Якщо дані є символічними, Мантікора досліджуватиме всі функції контракту під час виконання транзакції. Буде корисно ознайомитися з поясненням резервної функції у статті [Практика з Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/), щоб зрозуміти, як працює вибір функції.

#### Іменована транзакція {#named-transaction}

Функції можна виконувати за їхнім іменем.
Щоб виконати `f(uint var)` із символічним значенням, від user_account та з 0 етерів, використовуйте:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

Якщо `value` транзакції не вказано, за замовчуванням воно дорівнює 0.

#### Підсумок {#summary-1}

- Аргументи транзакції можуть бути конкретними або символічними
- Необроблена транзакція досліджуватиме всі функції
- Функції можна викликати за їхнім іменем

### Робоча область {#workspace}

`m.workspace` — це каталог, який використовується як вихідний каталог для всіх згенерованих файлів:

```python
print("Results are in {}".format(m.workspace))
```

### Завершення дослідження {#terminate-the-exploration}

Щоб зупинити дослідження, використовуйте [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize). Після виклику цього методу більше не слід надсилати жодних транзакцій, і Мантікора згенерує тестові випадки для кожного з досліджених шляхів.

### Підсумок: Запуск під управлінням Мантікори {#summary-running-under-manticore}

Об'єднавши всі попередні кроки, ми отримаємо:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

print("Results are in {}".format(m.workspace))
m.finalize() # зупинити дослідження
```

Увесь наведений вище код ви можете знайти в [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

## Отримання шляхів, що викликають винятки {#getting-throwing-paths}

Тепер ми згенеруємо конкретні вхідні дані для шляхів, що викликають виняток у `f()`. Ціллю залишається такий смарт-контракт [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### Використання інформації про стан {#using-state-information}

Кожен виконаний шлях має свій стан блокчейну. Стан може бути готовим (ready) або вбитим (killed), що означає, що він досягає інструкції THROW або REVERT:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): список станів, які готові (вони не виконали REVERT/INVALID)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): список станів, які вбиті
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): усі стани

```python
for state in m.all_states:
    # зробити щось зі станом
```

Ви можете отримати доступ до інформації про стан. Наприклад:

- `state.platform.get_balance(account.address)`: баланс акаунта
- `state.platform.transactions`: список транзакцій
- `state.platform.transactions[-1].return_data`: дані, повернуті останньою транзакцією

Дані, повернуті останньою транзакцією, є масивом, який можна перетворити на значення за допомогою ABI.deserialize, наприклад:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### Як згенерувати тестовий випадок {#how-to-generate-testcase}

Використовуйте [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) для генерації тестового випадку:

```python
m.generate_testcase(state, 'BugFound')
```

### Підсумок {#summary-2}

- Ви можете перебирати стани за допомогою m.all_states
- `state.platform.get_balance(account.address)` повертає баланс акаунта
- `state.platform.transactions` повертає список транзакцій
- `transaction.return_data` — це повернуті дані
- `m.generate_testcase(state, name)` генерує вхідні дані для стану

### Підсумок: Отримання шляху, що викликає виняток {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## Перевірити, чи завершується виконання скасуванням або INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

Увесь наведений вище код ви можете знайти в [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

_Зверніть увагу, що ми могли б згенерувати набагато простіший скрипт, оскільки всі стани, повернуті terminated_state, мають REVERT або INVALID у своєму результаті: цей приклад мав на меті лише продемонструвати, як маніпулювати API._

## Додавання обмежень {#adding-constraints}

Ми побачимо, як обмежити дослідження. Зробимо припущення, що в документації до `f()` зазначено, що функція ніколи не викликається з `a == 65`, тому будь-яка помилка з `a == 65` не є справжньою помилкою. Ціллю залишається такий смарт-контракт [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### Оператори {#operators}

Модуль [Operators](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) полегшує маніпулювання обмеженнями, серед іншого він надає:

- Operators.AND,
- Operators.OR,
- Operators.UGT (беззнакове більше ніж),
- Operators.UGE (беззнакове більше ніж або дорівнює),
- Operators.ULT (беззнакове менше ніж),
- Operators.ULE (беззнакове менше ніж або дорівнює).

Щоб імпортувати модуль, використовуйте таке:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` використовується для конкатенації масиву зі значенням. Наприклад, return_data транзакції потрібно змінити на значення, щоб перевірити його з іншим значенням:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### Обмеження {#state-constraint}

Ви можете використовувати обмеження глобально або для конкретного стану.

#### Глобальне обмеження {#state-constraint-2}

Використовуйте `m.constrain(constraint)`, щоб додати глобальне обмеження.
Наприклад, ви можете викликати контракт із символічної адреси та обмежити цю адресу певними значеннями:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### Обмеження стану {#state-constraint-3}

Використовуйте [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain), щоб додати обмеження до конкретного стану.
Це можна використовувати для обмеження стану після його дослідження, щоб перевірити певну властивість у ньому.

### Перевірка обмеження {#checking-constraint}

Використовуйте `solver.check(state.constraints)`, щоб дізнатися, чи є обмеження досі здійсненним.
Наприклад, наведений нижче код обмежить symbolic_value значенням, відмінним від 65, і перевірить, чи є стан досі здійсненним:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # стан є можливим
```

### Підсумок: Додавання обмежень {#summary-adding-constraints}

Додавши обмеження до попереднього коду, ми отримаємо:

```python
from manticore.ethereum import ManticoreEVM
from manticore.core.smtlib.solver import Z3Solver

solver = Z3Solver.instance()

m = ManticoreEVM()

with open("example.sol") as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

no_bug_found = True

## Перевірити, чи завершується виконання скасуванням або INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # ми не розглядаємо шлях, де a == 65
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug found, results are in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No bug found')
```

Увесь наведений вище код ви можете знайти в [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)