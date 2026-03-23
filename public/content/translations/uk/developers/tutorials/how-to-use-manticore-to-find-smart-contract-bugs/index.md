---
title: "Як використовувати Manticore для пошуку помилок у смарт-контрактах"
description: "Як використовувати Manticore для автоматичного пошуку помилок у смарт-контрактах"
author: Trailofbits
lang: uk
tags:
  [
    "мова програмування",
    "Смарт-контракти",
    "захист",
    "тестування",
    "формальна верифікація"
  ]
skill: advanced
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

Мета цього посібника — показати, як використовувати Manticore для автоматичного пошуку помилок у смарт-контрактах.

## Встановлення {#installation}

Для Manticore потрібна версія Python >= 3.6. Його можна інсталювати за допомогою pip або за допомогою Docker.

### Manticore через Docker {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Остання команда запускає eth-security-toolbox у контейнері Docker, який має доступ до вашого поточного каталогу. Ви можете змінювати файли з вашого хоста та запускати інструменти для файлів із контейнера Docker_

Усередині контейнера Docker запустіть:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Manticore через pip {#manticore-through-pip}

```bash
pip3 install --user manticore
```

Рекомендується використовувати solc 0.5.11.

### Запуск скрипту {#running-a-script}

Щоб запустити скрипт Python за допомогою Python 3:

```bash
python3 script.py
```

## Вступ до динамічного символьного виконання {#introduction-to-dynamic-symbolic-execution}

### Коротко про динамічне символьне виконання {#dynamic-symbolic-execution-in-a-nutshell}

Динамічне символьне виконання (DSE) — це метод аналізу програм, який досліджує простір станів із високим ступенем семантичної обізнаності. Цей метод базується на виявленні "шляхів програми", представлених у вигляді математичних формул, які називаються `предикатами шляху`. Концептуально цей метод оперує предикатами шляху у два етапи:

1. Вони будуються з використанням обмежень на вхідні дані програми.
2. Вони використовуються для генерації вхідних даних програми, які спричинять виконання пов'язаних шляхів.

Цей підхід не дає хибнопозитивних спрацьовувань у тому сенсі, що всі виявлені стани програми можуть бути викликані під час конкретного виконання. Наприклад, якщо аналіз знаходить переповнення цілого числа, його гарантовано можна відтворити.

### Приклад предиката шляху {#path-predicate-example}

Щоб зрозуміти, як працює DSE, розгляньмо такий приклад:

```solidity
function f(uint a){

  if (a == 65) {
      // Наявна помилка
  }

}
```

Оскільки `f()` містить два шляхи, DSE побудує два різні предикати шляху:

- Шлях 1: `a == 65`
- Шлях 2: `Not (a == 65)`

Кожен предикат шляху — це математична формула, яку можна передати так званому [SMT-рішувачу](https://wikipedia.org/wiki/Satisfiability_modulo_theories), який спробує розв'язати рівняння. Для `Шляху 1` рішувач повідомить, що шлях можна дослідити за допомогою `a = 65`. Для `Шляху 2` рішувач може надати `a` будь-яке значення, відмінне від 65, наприклад `a = 0`.

### Перевірка властивостей {#verifying-properties}

Manticore дає змогу повністю контролювати виконання кожного шляху. Завдяки цьому ви можете додавати довільні обмеження майже до будь-чого. Цей контроль дає змогу створювати властивості контракту.

Розгляньмо такий приклад:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // немає захисту від переповнення
  return c;
}
```

Тут є лише один шлях для дослідження у функції:

- Шлях 1: `c = a + b`

За допомогою Manticore ви можете перевірити наявність переповнення та додати обмеження до предиката шляху:

- `c = a + b AND (c < a OR c < b)`

Якщо можливо знайти такі значення `a` та `b`, для яких наведений вище предикат шляху є здійсненним, це означає, що ви знайшли переповнення. Наприклад, рішувач може згенерувати вхідні дані `a = 10, b = MAXUINT256`.

Якщо розглянути виправлену версію:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

Відповідна формула з перевіркою переповнення матиме такий вигляд:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

Цю формулу неможливо розв'язати; іншими словами, це **доказ** того, що в `safe_add` `c` завжди збільшуватиметься.

Таким чином, DSE є потужним інструментом, який може перевіряти довільні обмеження у вашому коді.

## Запуск у Manticore {#running-under-manticore}

Ми розглянемо, як досліджувати смарт-контракт за допомогою Manticore API. Цільовим є такий смарт-контракт [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

Ви можете запустити Manticore безпосередньо для смарт-контракту за допомогою такої команди (`project` може бути файлом Solidity або каталогом проєкту):

```bash
$ manticore project
```

Ви отримаєте вивід тестових випадків, подібний до цього (порядок може змінюватися):

```
...
... m.c.manticore:INFO: Generated testcase No. 0 - STOP
... m.c.manticore:INFO: Generated testcase No. 1 - REVERT
... m.c.manticore:INFO: Generated testcase No. 2 - RETURN
... m.c.manticore:INFO: Generated testcase No. 3 - REVERT
... m.c.manticore:INFO: Generated testcase No. 4 - STOP
... m.c.manticore:INFO: Generated testcase No. 5 - REVERT
... m.c.manticore:INFO: Generated testcase No. 6 - REVERT
... m.c.manticore:INFO: Results in /home/ethsec/workshops/Automated Smart Contracts Audit - TruffleCon 2018/manticore/examples/mcore_t6vi6ij3
...
```

Без додаткової інформації Manticore досліджуватиме контракт за допомогою нових символьних
транзакцій, доки не перестане знаходити нові шляхи в контракті. Manticore не запускає нові транзакції після невдалої (наприклад, після скасування).

Manticore виведе інформацію в каталог `mcore_*`. Серед іншого, у цьому каталозі ви знайдете:

- `global.summary`: покриття та попередження компілятора
- `test_XXXXX.summary`: покриття, остання інструкція, баланси облікових записів для кожного тестового випадку
- `test_XXXXX.tx`: детальний список транзакцій для кожного тестового випадку

Тут Manticore знаходить 7 тестових випадків, які відповідають (порядок імен файлів може змінюватися):

|                                                           |     Транзакція 0    |        Транзакція 1        | Транзакція 2               |  Результат |
| :-------------------------------------------------------: | :-----------------: | :------------------------: | -------------------------- | :--------: |
| **test_00000000.tx** | Створення контракту | f(!=65) | f(!=65) |   Зупинка  |
| **test_00000001.tx** | Створення контракту |      резервна функція      |                            | Повернення |
| **test_00000002.tx** | Створення контракту |                            |                            | Повернення |
| **test_00000003.tx** | Створення контракту |  f(65)  |                            | Повернення |
| **test_00000004.tx** | Створення контракту | f(!=65) |                            |   Зупинка  |
| **test_00000005.tx** | Створення контракту | f(!=65) | f(65)   | Повернення |
| **test_00000006.tx** | Створення контракту | f(!=65) | резервна функція           | Повернення |

_Підсумок дослідження: f(!=65) означає виклик f із будь-яким значенням, відмінним від 65._

Як ви можете помітити, Manticore генерує унікальний тестовий випадок для кожної успішної або скасованої транзакції.

Використовуйте прапорець `--quick-mode` для швидкого дослідження коду (він вимикає детектори помилок, розрахунок газу тощо)

### Маніпулювання смарт-контрактом через API {#manipulate-a-smart-contract-through-the-api}

У цьому розділі докладно описано, як маніпулювати смарт-контрактом за допомогою Manticore Python API. Ви можете створити новий файл із розширенням Python `*.py` і написати необхідний код, додавши в цей файл команди API (основи яких будуть описані нижче), а потім запустити його за допомогою команди `$ python3 *.py`. Також ви можете виконати наведені нижче команди безпосередньо в консолі Python. Щоб запустити консоль, скористайтеся командою `$ python3`.

### Створення облікових записів {#creating-accounts}

Перше, що вам потрібно зробити, це ініціювати новий блокчейн за допомогою таких команд:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

Неконтрактний обліковий запис створюється за допомогою [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account):

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

- Ви можете створювати облікові записи користувачів і контракти за допомогою [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) та [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract).

### Виконання транзакцій {#executing-transactions}

Manticore підтримує два типи транзакцій:

- Необроблена транзакція: досліджуються всі функції
- Іменована транзакція: досліджується лише одна функція

#### Необроблена транзакція {#raw-transaction}

Необроблена транзакція виконується за допомогою [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction):

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

Той, хто викликає, адреса, дані або значення транзакції можуть бути конкретними або символьними:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) створює символьне значення.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) створює символьний масив байтів.

Наприклад:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

Якщо дані є символьними, Manticore дослідить усі функції контракту під час виконання транзакції. Щоб зрозуміти, як працює вибір функції, корисно ознайомитися з поясненням резервної функції в статті [Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/).

#### Іменована транзакція {#named-transaction}

Функції можна виконувати за їхньою назвою.
Щоб виконати `f(uint var)` із символьним значенням від user_account і з 0 ефіру, використовуйте:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

Якщо `value` транзакції не вказано, за замовчуванням воно дорівнює 0.

#### Підсумок {#summary-1}

- Аргументи транзакції можуть бути конкретними або символьними
- Необроблена транзакція досліджуватиме всі функції
- Функції можна викликати за їхньою назвою

### Робоча область {#workspace}

`m.workspace` — це каталог, який використовується як вихідний каталог для всіх створених файлів:

```python
print("Results are in {}".format(m.workspace))
```

### Завершення дослідження {#terminate-the-exploration}

Щоб зупинити дослідження, використовуйте [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize). Після виклику цього методу не слід надсилати жодних транзакцій, і Manticore генерує тестові випадки для кожного дослідженого шляху.

### Підсумок: Запуск у Manticore {#summary-running-under-manticore}

Об'єднавши всі попередні кроки, отримуємо:

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

Весь наведений вище код можна знайти в [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

## Отримання шляхів, що спричиняють винятки {#getting-throwing-paths}

Тепер ми згенеруємо конкретні вхідні дані для шляхів, які викликають виняток у `f()`. Цільовим є такий смарт-контракт [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

Кожен виконаний шлях має свій стан блокчейну. Стан може бути або готовим (ready), або завершеним (killed), що означає, що він досяг інструкції THROW або REVERT:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): список готових станів (вони не виконали REVERT/INVALID)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): список завершених станів
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): усі стани

```python
for state in m.all_states:
    # щось зробити зі станом
```

Ви можете отримати доступ до інформації про стан. Наприклад:

- `state.platform.get_balance(account.address)`: баланс облікового запису
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

- Ви можете ітерувати стани за допомогою m.all_states
- `state.platform.get_balance(account.address)` повертає баланс облікового запису
- `state.platform.transactions` повертає список транзакцій
- `transaction.return_data` — це повернуті дані
- `m.generate_testcase(state, name)` генерує вхідні дані для стану

### Підсумок: Отримання шляху, що спричиняє виняток {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## Перевірка, чи завершується виконання з REVERT або INVALID

for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

Весь наведений вище код можна знайти в [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

_Зауважте, що ми могли б створити набагато простіший скрипт, оскільки всі стани, що повертаються terminated_state, мають у своєму результаті REVERT або INVALID: цей приклад мав лише продемонструвати, як маніпулювати API._

## Додавання обмежень {#adding-constraints}

Ми розглянемо, як обмежувати дослідження. Припустимо, що в
документації `f()` зазначено, що функція ніколи не викликається з `a == 65`, тому будь-яка помилка при `a == 65` не є справжньою помилкою. Цільовим є такий смарт-контракт [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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
- Operators.UGT (беззнакове «більше ніж»),
- Operators.UGE (беззнакове «більше або дорівнює»),
- Operators.ULT (беззнакове «менше ніж»),
- Operators.ULE (беззнакове «менше або дорівнює»).

Щоб імпортувати модуль, використовуйте таке:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` використовується для конкатенації масиву зі значенням. Наприклад, return_data транзакції потрібно змінити на значення, щоб перевірити його відносно іншого значення:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### Обмеження {#state-constraint}

Ви можете використовувати обмеження глобально або для певного стану.

#### Глобальне обмеження {#state-constraint}

Використовуйте `m.constrain(constraint)` для додавання глобального обмеження.
Наприклад, ви можете викликати контракт із символьної адреси та обмежити цю адресу певними значеннями:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### Обмеження стану {#state-constraint}

Використовуйте [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) для додавання обмеження до певного стану.
Його можна використовувати для обмеження стану після його дослідження, щоб перевірити певну властивість.

### Перевірка обмеження {#checking-constraint}

Використовуйте `solver.check(state.constraints)`, щоб дізнатися, чи є обмеження все ще здійсненним.
Наприклад, наступний код обмежить symbolic_value значенням, відмінним від 65, і перевірить, чи стан все ще є здійсненним:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # стан є здійсненним
```

### Підсумок: Додавання обмежень {#summary-adding-constraints}

Додавши обмеження до попереднього коду, отримуємо:

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

## Перевірка, чи завершується виконання з REVERT або INVALID

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

Весь наведений вище код можна знайти в [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)
