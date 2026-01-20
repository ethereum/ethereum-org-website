---
title: Как использовать Slither для поиска ошибок в умных контрактах
description: Как использовать Slither для автоматического поиска ошибок в умных контрактах
author: Trailofbits
lang: ru
tags:
  [
    "твердость",
    "Умные контракты",
    "безопасность",
    "тестирование"
  ]
skill: advanced
published: 2020-06-09
source: Создание безопасных контрактов
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Как использовать Slither {#how-to-use-slither}

Цель этого руководства — показать, как использовать Slither для автоматического поиска ошибок в умных контрактах.

- [Установка](#installation)
- [Использование командной строки](#command-line)
- [Введение в статический анализ](#static-analysis): краткое введение в статический анализ
- [API](#api-basics): описание API Python

## Установка {#installation}

Slither требует Python >= 3.6. Его можно установить через pip или с помощью Docker.

Slither через pip:

```bash
pip3 install --user slither-analyzer
```

Slither через docker:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_Последняя команда запускает eth-security-toolbox в контейнере Docker, который имеет доступ к вашему текущему каталогу._ Вы можете изменять файлы со своего хоста и запускать инструменты для работы с этими файлами из контейнера Docker_

Внутри контейнера Docker выполните:

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

**Командная строка в сравнении с пользовательскими скриптами.** Slither поставляется с набором предопределенных детекторов, которые находят много распространенных ошибок. Вызов Slither из командной строки запустит все детекторы, при этом не требуются глубокие знания статического анализа:

```bash
slither project_paths
```

В дополнение к детекторам Slither имеет возможности анализа кода с помощью своих [принтеров](https://github.com/crytic/slither#printers) и [инструментов](https://github.com/crytic/slither#tools).

Используйте [crytic.io](https://github.com/crytic), чтобы получить доступ к приватным детекторам и интеграции с GitHub.

## Статический анализ {#static-analysis}

Возможности и дизайн фреймворка статического анализа Slither были описаны в постах в блоге ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) и [научной статье](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf).

Статический анализ существует в разных вариантах. Вы, скорее всего, понимаете, что компиляторы, такие как [clang](https://clang-analyzer.llvm.org/) и [gcc](https://lwn.net/Articles/806099/), зависят от этих исследовательских техник, но они также лежат в основе ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](http://findbugs.sourceforge.net/) и инструментов, основанных на формальных методах, таких как [Frama-C](https://frama-c.com/) и [Polyspace](https://www.mathworks.com/products/polyspace.html)).

Мы не будем здесь исчерпывающе рассматривать техники статического анализа и исследования. Вместо этого мы сосредоточимся на том, что необходимо для понимания работы Slither, чтобы вы могли более эффективно использовать его для поиска ошибок и понимания кода.

- [Представление кода](#code-representation)
- [Анализ кода](#analysis)
- [Промежуточное представление](#intermediate-representation)

### Представление кода {#code-representation}

В отличие от динамического анализа, который рассматривает один путь выполнения, статический анализ рассматривает все пути одновременно. Для этого он использует другое представление кода. Два наиболее распространенных — это абстрактное синтаксическое дерево (AST) и граф потока управления (CFG).

### Абстрактные синтаксические деревья (AST) {#abstract-syntax-trees-ast}

AST используются каждый раз, когда компилятор анализирует код. Это, вероятно, самая основная структура, на которой может выполняться статический анализ.

Вкратце, AST — это структурированное дерево, где, как правило, каждый лист содержит переменную или константу, а внутренние узлы являются операндами или операциями управления потоком. Рассмотрим следующий код:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

Соответствующее дерево AST показано ниже:

![AST](./ast.png)

Slither использует AST, экспортируемый компилятором solc.

Хотя AST легко построить, он представляет собой вложенную структуру. Иногда его анализировать не так просто. Например, чтобы определить операции, используемые в выражении `a + b <= a`, вы должны сначала проанализировать `<=` а затем `+`. Распространенным подходом является использование так называемого шаблона «посетитель», который рекурсивно обходит дерево. Slither содержит универсальный «посетитель» в [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py).

Следующий код использует `ExpressionVisitor` для определения, содержит ли выражение операцию сложения:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression — это проверяемое выражение
print(f'Выражение {expression} содержит сложение: {visitor.result()}')
```

### Граф потока управления (CFG) {#control-flow-graph-cfg}

Второе по распространенности представление кода — это граф потока управления (CFG). Как следует из названия, это представление на основе графа, которое показывает все пути выполнения. Каждый узел содержит одну или несколько инструкций. Ребра в графе представляют операции управления потоком (if/then/else, цикл и т. д.). CFG для нашего предыдущего примера следующий:

![CFG](./cfg.png)

CFG — это представление, на основе которого построено большинство видов анализа.

Существует много других представлений кода. Каждое представление имеет свои преимущества и недостатки в зависимости от анализа, который вы хотите выполнить.

### Анализ {#analysis}

Простейший тип анализа, который можно выполнить с помощью Slither, — это синтаксический анализ.

### Синтаксический анализ {#syntax-analysis}

Slither может перемещаться по различным компонентам кода и их представлениям, чтобы находить несоответствия и недостатки с помощью подхода, подобного сопоставлению с образцом.

Например, следующие детекторы ищут проблемы, связанные с синтаксисом:

- [Сокрытие переменной состояния](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): перебирает все переменные состояния и проверяет, не скрывает ли какая-либо из них переменную из унаследованного контракта ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [Неправильный интерфейс ERC20](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): ищет неправильные сигнатуры функций ERC20 ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### Семантический анализ {#semantic-analysis}

В отличие от синтаксического анализа, семантический анализ идет глубже и анализирует «смысл» кода. Эта категория включает несколько обширных типов анализа. Они позволяют получать более мощные и полезные результаты, но и писать их сложнее.

Семантический анализ используется для обнаружения наиболее сложных уязвимостей.

#### Анализ зависимостей данных {#fixed-point-computation}

Говорят, что переменная `variable_a` зависит по данным от `variable_b`, если существует путь, в котором на значение `variable_a` влияет `variable_b`.

В следующем коде `variable_a` зависит от `variable_b`:

```solidity
// ...
variable_a = variable_b + 1;
```

Slither поставляется со встроенными возможностями [анализа зависимостей по данным](https://github.com/crytic/slither/wiki/data-dependency) благодаря своему промежуточному представлению (обсуждается в одном из следующих разделов).

Пример использования зависимостей по данным можно найти в [детекторе опасного строгого равенства](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities). Здесь Slither будет искать сравнение на строгое равенство с опасным значением ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)) и сообщит пользователю, что следует использовать `>=` или `<=` вместо `==`, чтобы злоумышленник не смог заблокировать контракт. Помимо прочего, детектор будет считать опасным возвращаемое значение вызова `balanceOf(address)` ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)) и будет использовать механизм зависимостей по данным для отслеживания его использования.

#### Вычисление с неподвижной точкой {#fixed-point-computation}

Если ваш анализ перемещается по CFG и следует по ребрам, вы, скорее всего, увидите уже посещенные узлы. Например, если цикл представлен так, как показано ниже:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

Вашему анализу нужно будет знать, когда остановиться. Здесь есть две основные стратегии: (1) выполнить итерацию для каждого узла конечное число раз, (2) вычислить так называемую _неподвижную точку_. Неподвижная точка по сути означает, что анализ этого узла больше не дает никакой значимой информации.

Пример использования неподвижной точки можно найти в детекторах повторного входа: Slither исследует узлы и ищет внешние вызовы, запись в хранилище и чтение из него. Как только будет достигнута неподвижная точка ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), он останавливает исследование и анализирует результаты, чтобы определить, присутствует ли возможность повторного входа, с помощью различных шаблонов повторного входа ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

Написание анализов с использованием эффективного вычисления неподвижной точки требует хорошего понимания того, как анализ распространяет информацию.

### Промежуточное представление {#intermediate-representation}

Промежуточное представление (IR) — это язык, который должен быть более удобен для статического анализа, чем исходный. Slither переводит Solidity в собственное промежуточное представление: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

Понимание SlithIR не является обязательным, если вы хотите писать только базовые проверки. Однако это пригодится, если вы планируете писать сложные семантические анализы. Принтеры [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) и [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) помогут вам понять, как переводится код.

## Основы API {#api-basics}

У Slither есть API, который позволяет исследовать основные атрибуты контракта и его функций.

Чтобы загрузить кодовую базу:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### Исследование контрактов и функций {#exploring-contracts-and-functions}

Объект `Slither` имеет:

- `contracts (list(Contract))`: список контрактов
- `contracts_derived (list(Contract))`: список контрактов, не унаследованных от другого контракта (подмножество контрактов)
- `get_contract_from_name (str)`: возвращает контракт по его имени

Объект `Contract` имеет:

- `name (str)`: имя контракта
- `functions (list(Function))`: список функций
- `modifiers (list(Modifier))`: список модификаторов
- `all_functions_called (list(Function/Modifier))`: список всех внутренних функций, достижимых из контракта
- `inheritance (list(Contract))`: список унаследованных контрактов
- `get_function_from_signature (str)`: возвращает функцию по ее сигнатуре
- `get_modifier_from_signature (str)`: возвращает модификатор по его сигнатуре
- `get_state_variable_from_name (str)`: возвращает переменную состояния по ее имени

Объект `Function` или `Modifier` имеет:

- `name (str)`: имя функции
- `contract (contract)`: контракт, в котором объявлена функция
- `nodes (list(Node))`: список узлов, составляющих CFG функции/модификатора
- `entry_point (Node)`: точка входа CFG
- `variables_read (list(Variable))`: список прочитанных переменных
- `variables_written (list(Variable))`: список записанных переменных
- `state_variables_read (list(StateVariable))`: список прочитанных переменных состояния (подмножество `variables_read`)
- `state_variables_written (list(StateVariable))`: список записанных переменных состояния (подмножество `variables_written`)
