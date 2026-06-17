---
title: Как использовать Мантикору для поиска ошибок в смарт-контрактах
description: Как использовать Мантикору для автоматического поиска ошибок в смарт-контрактах
author: Trailofbits
lang: ru
tags:
  - solidity
  - смарт-контракты
  - безопасность
  - тестирование
  - формальная верификация
skill: advanced
breadcrumb: Мантикора
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

Цель этого руководства — показать, как использовать Мантикору для автоматического поиска ошибок в смарт-контрактах.

## Установка {#installation}

Для Мантикоры требуется Python версии 3.6 или выше. Ее можно установить через pip или с помощью Docker.

### Мантикора через Docker {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Последняя команда запускает eth-security-toolbox в Docker, который имеет доступ к вашей текущей директории. Вы можете изменять файлы на вашем хосте и запускать инструменты для этих файлов из Docker._

Внутри Docker выполните:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Мантикора через pip {#manticore-through-pip}

```bash
pip3 install --user manticore
```

Рекомендуется использовать solc версии 0.5.11.

### Запуск скрипта {#running-a-script}

Чтобы запустить скрипт Python с помощью Python 3:

```bash
python3 script.py
```

## Введение в динамическое символьное выполнение {#introduction-to-dynamic-symbolic-execution}

### Кратко о динамическом символьном выполнении {#dynamic-symbolic-execution-in-a-nutshell}

Динамическое символьное выполнение (DSE) — это метод анализа программ, который исследует пространство состояний с высокой степенью семантической осведомленности. Этот метод основан на обнаружении «путей программы», представленных в виде математических формул, называемых `path predicates`. Концептуально этот метод работает с предикатами путей в два этапа:

1. Они строятся с использованием ограничений на входные данные программы.
2. Они используются для генерации входных данных программы, которые приведут к выполнению соответствующих путей.

Этот подход не дает ложных срабатываний в том смысле, что все выявленные состояния программы могут быть вызваны во время конкретного выполнения. Например, если анализ обнаружит целочисленное переполнение, оно гарантированно будет воспроизводимым.

### Пример предиката пути {#path-predicate-example}

Чтобы понять, как работает DSE, рассмотрим следующий пример:

```solidity
function f(uint a){

  if (a == 65) {
      // Присутствует баг
  }

}
```

Поскольку `f()` содержит два пути, DSE построит два разных предиката пути:

- Путь 1: `a == 65`
- Путь 2: `Not (a == 65)`

Каждый предикат пути — это математическая формула, которую можно передать так называемому [SMT-солверу](https://wikipedia.org/wiki/Satisfiability_modulo_theories), который попытается решить уравнение. Для `Path 1` солвер скажет, что путь может быть исследован с помощью `a = 65`. Для `Path 2` солвер может присвоить `a` любое значение, кроме 65, например `a = 0`.

### Проверка свойств {#verifying-properties}

Мантикора позволяет полностью контролировать выполнение каждого пути. В результате это позволяет добавлять произвольные ограничения практически ко всему. Этот контроль позволяет создавать свойства для контракта.

Рассмотрим следующий пример:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // нет защиты от переполнения
  return c;
}
```

Здесь в функции есть только один путь для исследования:

- Путь 1: `c = a + b`

Используя Мантикору, вы можете проверить наличие переполнения и добавить ограничения к предикату пути:

- `c = a + b AND (c < a OR c < b)`

Если возможно найти значения `a` и `b`, для которых приведенный выше предикат пути выполним, это означает, что вы нашли переполнение. Например, солвер может сгенерировать входные данные `a = 10 , b = MAXUINT256`.

Если рассмотреть исправленную версию:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

Связанная формула с проверкой переполнения будет выглядеть так:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

Эта формула не может быть решена; иными словами, это **доказательство** того, что в `safe_add` значение `c` всегда будет увеличиваться.

Таким образом, DSE — это мощный инструмент, который может проверять произвольные ограничения в вашем коде.

## Запуск под управлением Мантикоры {#running-under-manticore}

Мы посмотрим, как исследовать смарт-контракт с помощью API Мантикоры. Целью является следующий смарт-контракт [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

Вы можете запустить Мантикору напрямую для смарт-контракта с помощью следующей команды (`project` может быть файлом Solidity или директорией проекта):

```bash
$ manticore project
```

Вы получите вывод тестовых случаев, похожий на этот (порядок может меняться):

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

Без дополнительной информации Мантикора будет исследовать контракт с помощью новых символьных транзакций до тех пор, пока не перестанет находить новые пути в контракте. Мантикора не запускает новые транзакции после неудачной (например, после отката).

Мантикора выведет информацию в директорию `mcore_*`. Помимо прочего, в этой директории вы найдете:

- `global.summary`: покрытие и предупреждения компилятора
- `test_XXXXX.summary`: покрытие, последняя инструкция, балансы аккаунтов для каждого тестового случая
- `test_XXXXX.tx`: подробный список транзакций для каждого тестового случая

Здесь Мантикора находит 7 тестовых случаев, которые соответствуют (порядок имен файлов может меняться):

|                      |   Транзакция 0    |   Транзакция 1    | Транзакция 2      | Результат |
| :------------------: | :---------------: | :---------------: | ----------------- | :-------: |
| **test_00000000.tx** | Создание контракта |      f(!=65)      | f(!=65)           |   STOP    |
| **test_00000001.tx** | Создание контракта | резервная функция |                   |  REVERT   |
| **test_00000002.tx** | Создание контракта |                   |                   |  RETURN   |
| **test_00000003.tx** | Создание контракта |       f(65)       |                   |  REVERT   |
| **test_00000004.tx** | Создание контракта |      f(!=65)      |                   |   STOP    |
| **test_00000005.tx** | Создание контракта |      f(!=65)      | f(65)             |  REVERT   |
| **test_00000006.tx** | Создание контракта |      f(!=65)      | резервная функция |  REVERT   |

_Сводка исследования: f(!=65) означает, что f вызвана с любым значением, отличным от 65._

Как вы можете заметить, Мантикора генерирует уникальный тестовый случай для каждой успешной или откаченной транзакции.

Используйте флаг `--quick-mode`, если вам нужно быстрое исследование кода (он отключает детекторы ошибок, вычисление газа и т. д.).

### Управление смарт-контрактом через API {#manipulate-a-smart-contract-through-the-api}

В этом разделе подробно описывается, как управлять смарт-контрактом через Python API Мантикоры. Вы можете создать новый файл с расширением Python `*.py` и написать необходимый код, добавив команды API (основы которых будут описаны ниже) в этот файл, а затем запустить его с помощью команды `$ python3 *.py`. Также вы можете выполнять приведенные ниже команды непосредственно в консоли Python; для запуска консоли используйте команду `$ python3`.

### Создание аккаунтов {#creating-accounts}

Первое, что вам следует сделать, это инициализировать новый блокчейн с помощью следующих команд:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

Аккаунт, не являющийся контрактом, создается с помощью [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account):

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
# Initiate the contract
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### Итоги {#summary}

- Вы можете создавать пользовательские и контрактные аккаунты с помощью [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) и [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract).

### Выполнение транзакций {#executing-transactions}

Мантикора поддерживает два типа транзакций:

- Необработанная транзакция (raw transaction): исследуются все функции
- Именованная транзакция (named transaction): исследуется только одна функция

#### Необработанная транзакция {#raw-transaction}

Необработанная транзакция выполняется с помощью [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction):

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

Вызывающая сторона, адрес, данные или значение транзакции могут быть как конкретными, так и символьными:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) создает символьное значение.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) создает символьный массив байтов.

Например:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

Если данные символьные, Мантикора исследует все функции контракта во время выполнения транзакции. Будет полезно ознакомиться с объяснением резервной функции в статье [Практика в Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/), чтобы понять, как работает выбор функции.

#### Именованная транзакция {#named-transaction}

Функции могут быть выполнены по их имени.
Чтобы выполнить `f(uint var)` с символьным значением от user_account и с 0 эфира, используйте:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

Если `value` транзакции не указано, по умолчанию оно равно 0.

#### Итоги {#summary-1}

- Аргументы транзакции могут быть конкретными или символьными
- Необработанная транзакция исследует все функции
- Функции можно вызывать по их имени

### Рабочее пространство {#workspace}

`m.workspace` — это директория, используемая в качестве выходной для всех сгенерированных файлов:

```python
print("Results are in {}".format(m.workspace))
```

### Завершение исследования {#terminate-the-exploration}

Чтобы остановить исследование, используйте [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize). После вызова этого метода больше не следует отправлять транзакции, и Мантикора сгенерирует тестовые случаи для каждого исследованного пути.

### Итоги: Запуск под управлением Мантикоры {#summary-running-under-manticore}

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

print("Results are in {}".format(m.workspace))
m.finalize() # остановить исследование
```

Весь приведенный выше код вы можете найти в [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

## Получение путей с выбросом исключений {#getting-throwing-paths}

Теперь мы сгенерируем конкретные входные данные для путей, вызывающих исключение в `f()`. Целью по-прежнему является следующий смарт-контракт [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

Каждый выполненный путь имеет свое состояние блокчейна. Состояние может быть либо готовым (ready), либо убитым (killed), что означает достижение инструкции THROW или REVERT:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): список готовых состояний (они не выполняли REVERT/INVALID)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): список убитых состояний
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): все состояния

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

### Как сгенерировать тестовый случай {#how-to-generate-testcase}

Используйте [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) для генерации тестового случая:

```python
m.generate_testcase(state, 'BugFound')
```

### Итоги {#summary-2}

- Вы можете перебирать состояния с помощью m.all_states
- `state.platform.get_balance(account.address)` возвращает баланс аккаунта
- `state.platform.transactions` возвращает список транзакций
- `transaction.return_data` — это возвращенные данные
- `m.generate_testcase(state, name)` генерирует входные данные для состояния

### Итоги: Получение путей с выбросом исключений {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## Проверить, завершается ли выполнение откатом или INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

Весь приведенный выше код вы можете найти в [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

_Обратите внимание, что мы могли бы сгенерировать гораздо более простой скрипт, так как все состояния, возвращаемые terminated_state, имеют REVERT или INVALID в своем результате: этот пример был предназначен только для демонстрации того, как управлять API._

## Добавление ограничений {#adding-constraints}

Мы посмотрим, как ограничить исследование. Мы сделаем допущение, что в документации к `f()` указано, что функция никогда не вызывается с `a == 65`, поэтому любая ошибка с `a == 65` не является реальной ошибкой. Целью по-прежнему является следующий смарт-контракт [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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
- Operators.UGT (беззнаковое больше),
- Operators.UGE (беззнаковое больше или равно),
- Operators.ULT (беззнаковое меньше),
- Operators.ULE (беззнаковое меньше или равно).

Для импорта модуля используйте следующее:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` используется для конкатенации массива со значением. Например, return_data транзакции необходимо преобразовать в значение для проверки с другим значением:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### Ограничения {#state-constraint}

Вы можете использовать ограничения глобально или для конкретного состояния.

#### Глобальное ограничение {#state-constraint-2}

Используйте `m.constrain(constraint)` для добавления глобального ограничения.
Например, вы можете вызвать контракт с символьного адреса и ограничить этот адрес определенными значениями:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### Ограничение состояния {#state-constraint-3}

Используйте [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) для добавления ограничения к конкретному состоянию.
Это можно использовать для ограничения состояния после его исследования, чтобы проверить на нем какое-либо свойство.

### Проверка ограничения {#checking-constraint}

Используйте `solver.check(state.constraints)`, чтобы узнать, выполнимо ли еще ограничение.
Например, следующее ограничит symbolic_value значением, отличным от 65, и проверит, выполнимо ли еще состояние:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # состояние достижимо
```

### Итоги: Добавление ограничений {#summary-adding-constraints}

Добавив ограничение к предыдущему коду, мы получим:

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

## Проверить, завершается ли выполнение откатом или INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # мы не рассматриваем путь, где a == 65
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug found, results are in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No bug found')
```

Весь приведенный выше код вы можете найти в [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)