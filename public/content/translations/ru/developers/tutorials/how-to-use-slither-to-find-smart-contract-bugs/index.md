---
title: "Как использовать Слизер для поиска ошибок в смарт-контрактах"
description: "Как использовать Слизер для автоматического поиска ошибок в смарт-контрактах"
author: Trailofbits
lang: ru
tags:
  - Solidity
  - смарт-контракты
  - безопасность
  - тестирование
skill: advanced
breadcrumb: "Слизер"
published: 2020-06-09
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Как использовать Слизер {#how-to-use-slither}

Цель этого руководства — показать, как использовать Слизер для автоматического поиска ошибок в смарт-контрактах.

- [Установка](#installation)
- [Использование командной строки](#command-line)
- [Введение в статический анализ](#static-analysis): Краткое введение в статический анализ
- [API](#api-basics): Описание API Python

## Установка {#installation}

Слизер требует Python версии 3.6 или выше. Его можно установить через pip или с помощью Docker.

Установка Слизер через pip:

```bash
pip3 install --user slither-analyzer
```

Установка Слизер через Docker:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_Последняя команда запускает eth-security-toolbox в Docker, который имеет доступ к вашей текущей директории. Вы можете изменять файлы на вашем хосте и запускать инструменты для этих файлов из Docker._

Внутри Docker выполните:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Запуск скрипта {#running-a-script}

Чтобы запустить скрипт Python с помощью Python 3:

```bash
python3 script.py
```

### Командная строка {#command-line}

**Командная строка в сравнении с пользовательскими скриптами.** Слизер поставляется с набором предустановленных детекторов, которые находят множество распространенных ошибок. Вызов Слизер из командной строки запустит все детекторы, для этого не требуется глубоких знаний статического анализа:

```bash
slither project_paths
```

Помимо детекторов, Слизер имеет возможности для проверки кода с помощью своих [принтеров (printers)](https://github.com/crytic/slither#printers) и [инструментов](https://github.com/crytic/slither#tools).

Используйте [crytic.io](https://github.com/crytic), чтобы получить доступ к приватным детекторам и интеграции с GitHub.

## Статический анализ {#static-analysis}

Возможности и архитектура фреймворка статического анализа Слизер были описаны в статьях блога ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) и [научной работе](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf).

Статический анализ существует в различных вариантах. Вы, скорее всего, понимаете, что компиляторы, такие как [clang](https://clang-analyzer.llvm.org/) и [gcc](https://lwn.net/Articles/806099/), зависят от этих методов исследования, но они также лежат в основе [Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](https://findbugs.sourceforge.net/) и инструментов, основанных на формальных методах, таких как [Frama-C](https://frama-c.com/) и [Polyspace](https://www.mathworks.com/products/polyspace.html).

Здесь мы не будем исчерпывающе рассматривать методы статического анализа и исследования. Вместо этого мы сосредоточимся на том, что необходимо для понимания работы Слизер, чтобы вы могли более эффективно использовать его для поиска ошибок и понимания кода.

- [Представление кода](#code-representation)
- [Анализ кода](#analysis)
- [Промежуточное представление](#intermediate-representation)

### Представление кода {#code-representation}

В отличие от динамического анализа, который рассматривает один путь выполнения, статический анализ рассматривает все пути одновременно. Для этого он опирается на другое представление кода. Двумя наиболее распространенными являются абстрактное синтаксическое дерево (AST) и граф потока управления (CFG).

### Абстрактные синтаксические деревья (AST) {#abstract-syntax-trees-ast}

AST используются каждый раз, когда компилятор анализирует код. Вероятно, это самая базовая структура, на основе которой может выполняться статический анализ.

Вкратце, AST — это структурированное дерево, где обычно каждый лист содержит переменную или константу, а внутренние узлы являются операндами или операциями управления потоком. Рассмотрим следующий код:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

Соответствующее AST показано на рисунке:

![AST](./ast.png)

Слизер использует AST, экспортируемое solc.

Несмотря на простоту построения, AST представляет собой вложенную структуру. Иногда это не самый простой вариант для анализа. Например, чтобы определить операции, используемые выражением `a + b <= a`, вы должны сначала проанализировать `<=`, а затем `+`. Распространенным подходом является использование так называемого паттерна «Посетитель» (visitor), который рекурсивно перемещается по дереву. Слизер содержит общий паттерн посетителя в [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py).

Следующий код использует `ExpressionVisitor` для определения того, содержит ли выражение сложение:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression — это выражение для проверки
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### Граф потока управления (CFG) {#control-flow-graph-cfg}

Вторым по распространенности представлением кода является граф потока управления (CFG). Как следует из названия, это представление на основе графа, которое раскрывает все пути выполнения. Каждый узел содержит одну или несколько инструкций. Ребра в графе представляют операции управления потоком (if/then/else, циклы и т. д.). CFG нашего предыдущего примера выглядит так:

![CFG](./cfg.png)

CFG — это представление, на основе которого строится большинство анализов.

Существует множество других представлений кода. Каждое представление имеет свои преимущества и недостатки в зависимости от анализа, который вы хотите выполнить.

### Анализ {#analysis}

Самый простой тип анализа, который вы можете выполнить с помощью Слизер, — это синтаксический анализ.

### Синтаксический анализ {#syntax-analysis}

Слизер может перемещаться по различным компонентам кода и их представлению, чтобы находить несоответствия и недостатки, используя подход, похожий на сопоставление с шаблоном.

Например, следующие детекторы ищут проблемы, связанные с синтаксисом:

- [Перекрытие переменных состояния (State variable shadowing)](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): перебирает все переменные состояния и проверяет, не перекрывает ли какая-либо из них переменную из унаследованного контракта ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [Некорректный интерфейс ERC-20](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): ищет некорректные подписи функций ERC-20 ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### Семантический анализ {#semantic-analysis}

В отличие от синтаксического анализа, семантический анализ идет глубже и анализирует «смысл» кода. Это семейство включает в себя несколько широких типов анализов. Они приводят к более мощным и полезным результатам, но их также сложнее писать.

Семантический анализ используется для наиболее продвинутого обнаружения уязвимостей.

#### Анализ зависимости данных {#fixed-point-computation}

Переменная `variable_a` считается зависимой от данных `variable_b`, если существует путь, на котором значение `variable_a` зависит от `variable_b`.

В следующем коде `variable_a` зависит от `variable_b`:

```solidity
// ...
variable_a = variable_b + 1;
```

Слизер поставляется со встроенными возможностями [зависимости данных](https://github.com/crytic/slither/wiki/data-dependency) благодаря своему промежуточному представлению (обсуждается в следующем разделе).

Пример использования зависимости данных можно найти в [детекторе опасного строгого равенства](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities). Здесь Слизер будет искать сравнение на строгое равенство с опасным значением ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)) и сообщит пользователю, что следует использовать `>=` или `<=` вместо `==`, чтобы не дать злоумышленнику заблокировать контракт. Помимо прочего, детектор будет считать опасным возвращаемое значение вызова `balanceOf(address)` ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)) и будет использовать механизм зависимости данных для отслеживания его использования.

#### Вычисление фиксированной точки {#fixed-point-computation-2}

Если ваш анализ перемещается по CFG и следует по ребрам, вы, вероятно, увидите уже посещенные узлы. Например, если цикл представлен так, как показано ниже:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

Вашему анализу нужно будет знать, когда остановиться. Здесь есть две основные стратегии: (1) итерация по каждому узлу конечное число раз, (2) вычисление так называемой _фиксированной точки_ (fixpoint). Фиксированная точка в основном означает, что анализ этого узла не дает никакой значимой информации.

Пример использования фиксированной точки можно найти в детекторах повторного входа: Слизер исследует узлы и ищет внешние вызовы, запись и чтение в хранилище. Как только он достигает фиксированной точки ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), он останавливает исследование и анализирует результаты, чтобы увидеть, присутствует ли повторный вход, с помощью различных шаблонов повторного входа ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

Написание анализов с использованием эффективного вычисления фиксированной точки требует хорошего понимания того, как анализ распространяет свою информацию.

### Промежуточное представление {#intermediate-representation}

Промежуточное представление (IR) — это язык, который должен быть более податливым для статического анализа, чем исходный. Слизер переводит Solidity в свое собственное IR: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

Понимание SlithIR не обязательно, если вы хотите писать только базовые проверки. Однако это пригодится, если вы планируете писать продвинутые семантические анализы. Принтеры [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) и [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) помогут вам понять, как переводится код.

## Основы API {#api-basics}

Слизер имеет API, который позволяет вам исследовать базовые атрибуты контракта и его функций.

Чтобы загрузить кодовую базу:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### Исследование контрактов и функций {#exploring-contracts-and-functions}

Объект `Slither` имеет:

- `contracts (list(Contract)`: список контрактов
- `contracts_derived (list(Contract)`: список контрактов, которые не унаследованы другим контрактом (подмножество контрактов)
- `get_contract_from_name (str)`: возвращает контракт по его имени

Объект `Contract` имеет:

- `name (str)`: имя контракта
- `functions (list(Function))`: список функций
- `modifiers (list(Modifier))`: список функций
- `all_functions_called (list(Function/Modifier))`: список всех внутренних функций, доступных контракту
- `inheritance (list(Contract))`: список унаследованных контрактов
- `get_function_from_signature (str)`: возвращает функцию по ее подписи
- `get_modifier_from_signature (str)`: возвращает модификатор по его подписи
- `get_state_variable_from_name (str)`: возвращает переменную состояния по ее имени

Объект `Function` или `Modifier` имеет:

- `name (str)`: имя функции
- `contract (contract)`: контракт, в котором объявлена функция
- `nodes (list(Node))`: список узлов, составляющих CFG функции/модификатора
- `entry_point (Node)`: точка входа CFG
- `variables_read (list(Variable))`: список прочитанных переменных
- `variables_written (list(Variable))`: список записанных переменных
- `state_variables_read (list(StateVariable))`: список прочитанных переменных состояния (подмножество variables`read)
- `state_variables_written (list(StateVariable))`: список записанных переменных состояния (подмножество variables`written)
