---
title: "Как использовать Manticore для поиска ошибок в смарт-контрактах"
description: "Как использовать Manticore для автоматического поиска ошибок в смарт-контрактах"
author: Trailofbits
lang: ru
tags:
  [
    "твердость",
    "Умные контракты",
    "безопасность",
    "тестирование",
    "формальная верификация"
  ]
skill: advanced
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

Цель этого руководства — показать, как использовать Manticore для автоматического поиска ошибок в смарт-контрактах.

## Установка {#installation}

Для Manticore требуется Python версии 3.6 или выше. Его можно установить через pip или с помощью Docker.

### Manticore через Docker {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Последняя команда запускает eth-security-toolbox в контейнере Docker, который имеет доступ к вашему текущему каталогу._ Вы можете изменять файлы со своего хоста и запускать инструменты для работы с этими файлами из контейнера Docker_

Внутри контейнера Docker выполните:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Manticore через pip {#manticore-through-pip}

```bash
pip3 install --user manticore
```

Рекомендуется использовать solc 0.5.11.

### Запуск скрипта {#running-a-script}

Чтобы запустить скрипт Python с помощью Python 3:

```bash
python3 script.py
```

## Введение в динамическое символическое выполнение {#introduction-to-dynamic-symbolic-execution}

### Динамическое символическое выполнение в двух словах {#dynamic-symbolic-execution-in-a-nutshell}

Динамическое символическое выполнение (DSE) — это метод анализа программ, который исследует пространство состояний с высокой степенью семантической осведомленности. Этот метод основан на обнаружении «путей программы», представленных в виде математических формул, называемых `предикатами путей`. Концептуально этот метод работает с предикатами путей в два этапа:

1. Они создаются с помощью ограничений на входные данные программы.
2. Они используются для генерации входных данных программы, которые вызовут выполнение соответствующих путей.

Этот подход не дает ложноположительных результатов в том смысле, что все выявленные состояния программы могут быть вызваны во время конкретного выполнения. Например, если анализ находит целочисленное переполнение, оно гарантированно будет воспроизводимым.

### Пример предиката пути {#path-predicate-example}

Чтобы понять, как работает DSE, рассмотрим следующий пример:

```solidity
function f(uint a){

  if (a == 65) {
      // Присутствует ошибка
  }

}
```

Поскольку `f()` содержит два пути, DSE создаст два разных предиката пути:

- Путь 1: `a == 65`
- Путь 2: `Not (a == 65)`

Каждый предикат пути является математической формулой, которую можно передать в так называемый [решатель SMT](https://wikipedia.org/wiki/Satisfiability_modulo_theories), который попытается решить уравнение. Для `Пути 1` решатель скажет, что путь можно исследовать при `a = 65`. Для `Пути 2` решатель может присвоить `a` любое значение, кроме 65, например, `a = 0`.

### Проверка свойств {#verifying-properties}

Manticore предоставляет полный контроль над выполнением каждого пути. В результате это позволяет добавлять произвольные ограничения практически ко всему. Этот контроль позволяет создавать свойства для контракта.

Рассмотрим следующий пример:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // нет защиты от переполнения
  return c;
}
```

Здесь в функции есть только один путь для исследования:

- Путь 1: `c = a + b`

Используя Manticore, вы можете проверить наличие переполнения и добавить ограничения к предикату пути:

- `c = a + b AND (c < a OR c < b)`

Если возможно найти такие значения `a` и `b`, для которых приведенный выше предикат пути выполним, это означает, что вы обнаружили переполнение. Например, решатель может сгенерировать входные данные `a = 10, b = MAXUINT256`.

Если рассмотреть исправленную версию:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

Связанная формула с проверкой на переполнение будет выглядеть так:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

Эту формулу невозможно решить; другими словами, это **доказательство** того, что в `safe_add` значение `c` всегда будет увеличиваться.

Таким образом, DSE является мощным инструментом, который может проверять произвольные ограничения в вашем коде.

## Запуск в Manticore {#running-under-manticore}

Мы рассмотрим, как исследовать смарт-контракт с помощью Manticore API. Целью является следующий смарт-контракт [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Запуск автономного исследования {#run-a-standalone-exploration}

Вы можете запустить Manticore непосредственно на смарт-контракте с помощью следующей команды (`project` может быть файлом Solidity или каталогом проекта):

```bash
$ manticore project
```

Вы получите вывод тестовых случаев, подобный этому (порядок может измениться):

```
...
... m.c.manticore:INFO: Сгенерирован тестовый пример № 0 - STOP
... m.c.manticore:INFO: Сгенерирован тестовый пример № 1 - REVERT
... m.c.manticore:INFO: Сгенерирован тестовый пример № 2 - RETURN
... m.c.manticore:INFO: Сгенерирован тестовый пример № 3 - REVERT
... m.c.manticore:INFO: Сгенерирован тестовый пример № 4 - STOP
... m.c.manticore:INFO: Сгенерирован тестовый пример № 5 - REVERT
... m.c.manticore:INFO: Сгенерирован тестовый пример № 6 - REVERT
... m.c.manticore:INFO: Результаты в /home/ethsec/workshops/Automated Smart Contracts Audit - TruffleCon 2018/manticore/examples/mcore_t6vi6ij3
...
```

Без дополнительной информации Manticore будет исследовать контракт с новыми символическими транзакциями до тех пор, пока не перестанет находить новые пути в контракте. Manticore не запускает новые транзакции после неудачной (например, после revert).

Manticore выведет информацию в каталог `mcore_*`. Помимо прочего, в этом каталоге вы найдете:

- `global.summary`: покрытие и предупреждения компилятора
- `test_XXXXX.summary`: покрытие, последняя инструкция, балансы аккаунтов для каждого тестового примера
- `test_XXXXX.tx`: подробный список транзакций для каждого тестового примера

Здесь Manticore нашел 7 тестовых примеров, которые соответствуют следующему (порядок файлов может меняться):

|                                                           |    Транзакция 0    |        Транзакция 1        | Транзакция 2               |        Результат        |
| :-------------------------------------------------------: | :----------------: | :------------------------: | -------------------------- | :---------------------: |
| **test_00000000.tx** | Создание контракта | f(!=65) | f(!=65) | Приостановка выполнения |
| **test_00000001.tx** | Создание контракта |      Резервная функция     |                            |          REVERT         |
| **test_00000002.tx** | Создание контракта |                            |                            |          RETURN         |
| **test_00000003.tx** | Создание контракта |  f(65)  |                            |          REVERT         |
| **test_00000004.tx** | Создание контракта | f(!=65) |                            | Приостановка выполнения |
| **test_00000005.tx** | Создание контракта | f(!=65) | f(65)   |          REVERT         |
| **test_00000006.tx** | Создание контракта | f(!=65) | Резервная функция          |          REVERT         |

_Сводка исследования: f(!=65) означает, что f вызывается с любым значением, отличным от 65._

Как вы можете заметить, Manticore создает уникальный тестовый пример для каждой успешной или отмененной транзакции.

Используйте флаг `--quick-mode` для быстрого исследования кода (он отключает детекторы ошибок, расчет газа и т. д.).

### Манипулирование смарт-контрактом через API {#manipulate-a-smart-contract-through-the-api}

В этом разделе подробно описывается, как управлять смарт-контрактом через Manticore Python API. Вы можете создать новый файл с расширением `*.py` и написать необходимый код, добавив в этот файл команды API (основы которых будут описаны ниже), а затем запустить его с помощью команды `$ python3 *.py`. Также вы можете выполнять приведенные ниже команды непосредственно в консоли python, для запуска консоли используйте команду `$ python3`.

### Создание аккаунтов {#creating-accounts}

Первое, что вам нужно сделать, — это инициировать новый блокчейн с помощью следующих команд:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

Пользовательский аккаунт создается с помощью [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account):

```python
user_account = m.create_account(balance=1000)
```

Контракт Solidity можно развернуть с помощью [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract):

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
# Инициировать контракт
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### Сводка {#summary}

- Вы можете создавать аккаунты пользователей и контрактов с помощью [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) и [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract).

### Выполнение транзакций {#executing-transactions}

Manticore поддерживает два типа транзакций:

- Необработанная транзакция: исследуются все функции
- Именованная транзакция: исследуется только одна функция

#### Необработанная транзакция {#raw-transaction}

Необработанная транзакция выполняется с помощью [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction):

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

Вызывающий, адрес, данные или значение транзакции могут быть конкретными или символическими:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) создает символическое значение.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) создает символический массив байтов.

Например:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

Если данные являются символическими, Manticore будет исследовать все функции контракта во время выполнения транзакции. Будет полезно ознакомиться с объяснением резервной функции в статье [Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/), чтобы понять, как работает выбор функции.

#### Именованная транзакция {#named-transaction}

Функции могут выполняться по их имени.
Чтобы выполнить `f(uint var)` с символическим значением с аккаунта user_account и с 0 эфира, используйте:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

Если `value` транзакции не указано, по умолчанию оно равно 0.

#### Итог {#summary-1}

- Аргументы транзакции могут быть конкретными или символическими
- Необработанная транзакция будет исследовать все функции
- Функция может быть вызвана по имени

### Рабочее пространство {#workspace}

`m.workspace` — это каталог, используемый в качестве выходного каталога для всех сгенерированных файлов:

```python
print("Результаты находятся в {}".format(m.workspace))
```

### Завершение исследования {#terminate-the-exploration}

Чтобы остановить исследование, используйте [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize). После вызова этого метода не следует отправлять никаких других транзакций, и Manticore сгенерирует тестовые примеры для каждого исследованного пути.

### Итог: запуск в Manticore {#summary-running-under-manticore}

Объединив все предыдущие шаги, мы получим:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

print("Результаты в {}".format(m.workspace))
m.finalize() # остановить исследование
```

Весь приведенный выше код вы можете найти в файле [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

## Получение путей, вызывающих исключения {#getting-throwing-paths}

Теперь мы сгенерируем конкретные входные данные для путей, вызывающих исключение в `f()`. Целью является следующий смарт-контракт [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Использование информации о состоянии {#using-state-information}

Каждый выполненный путь имеет свое состояние блокчейна. Состояние может быть либо готовым (ready), либо завершенным (killed), что означает, что оно достигло инструкции THROW или REVERT:

- `[m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing)`: список готовых состояний (они не выполнили REVERT/INVALID)
- `[m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings)`: список завершенных состояний
- `[m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings)`: все состояния

```python
for state in m.all_states:
    # сделать что-то с состоянием
```

Вы можете получить доступ к информации о состоянии. Например:

- `state.platform.get_balance(account.address)`: баланс аккаунта
- `state.platform.transactions`: список транзакций
- `state.platform.transactions[-1].return_data`: данные, возвращенные последней транзакцией

Данные, возвращенные последней транзакцией, представляют собой массив, который можно преобразовать в значение с помощью ABI.deserialize, например:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### Как сгенерировать тестовый пример {#how-to-generate-testcase}

Используйте [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) для генерации тестового примера:

```python
m.generate_testcase(state, 'BugFound')
```

### Итог {#summary-2}

- Вы можете перебирать состояния с помощью m.all_states
- `state.platform.get_balance(account.address)` возвращает баланс аккаунта
- `state.platform.transactions` возвращает список транзакций
- `transaction.return_data` — это возвращаемые данные
- `m.generate_testcase(state, name)` генерирует входные данные для состояния

### Итог: получение пути, вызывающего исключение {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## Проверить, завершается ли выполнение с REVERT или INVALID

for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Найдено исключение {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

Весь приведенный выше код вы можете найти в файле [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

_Обратите внимание, что мы могли бы создать гораздо более простой скрипт, поскольку все состояния, возвращаемые terminated_state, имеют в своем результате REVERT или INVALID: этот пример был предназначен только для демонстрации того, как управлять API._

## Добавление ограничений {#adding-constraints}

Мы рассмотрим, как ограничивать исследование. Мы сделаем допущение, что в документации `f()` указано, что функция никогда не вызывается с `a == 65`, поэтому любая ошибка при `a == 65` не является настоящей ошибкой. Целью является следующий смарт-контракт [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Операторы {#operators}

Модуль [Operators](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) облегчает работу с ограничениями, среди прочего он предоставляет:

- Operators.AND,
- Operators.OR,
- Operators.UGT (больше беззнакового),
- Operators.UGE (больше или равно беззнакового),
- Operators.ULT (меньше беззнакового),
- Operators.ULE (меньше или равно беззнакового).

Для импорта модуля используйте следующее:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` используется для конкатенации массива со значением. Например, return_data транзакции необходимо преобразовать в значение для сравнения с другим значением:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### Ограничения {#state-constraint}

Вы можете использовать ограничения глобально или для определенного состояния.

#### Глобальное ограничение {#state-constraint}

Используйте `m.constrain(constraint)` для добавления глобального ограничения.
Например, вы можете вызвать контракт с символического адреса и ограничить этот адрес определенными значениями:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### Ограничение состояния {#state-constraint}

Используйте [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) для добавления ограничения к определенному состоянию.
Его можно использовать для ограничения состояния после его исследования, чтобы проверить какое-либо свойство на нем.

### Проверка ограничения {#checking-constraint}

Используйте `solver.check(state.constraints)`, чтобы узнать, является ли ограничение все еще выполнимым.
Например, следующий код наложит ограничение на symbolic_value, чтобы оно было отличным от 65, и проверит, остается ли состояние выполнимым:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # состояние выполнимо
```

### Итог: добавление ограничений {#summary-adding-constraints}

Добавляя ограничение к предыдущему коду, мы получим:

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

## Проверить, завершается ли выполнение с REVERT или INVALID

for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # мы не рассматриваем путь, где a == 65
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Найдена ошибка, результаты в {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'Ошибок не найдено')
```

Весь приведенный выше код вы можете найти в файле [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)
