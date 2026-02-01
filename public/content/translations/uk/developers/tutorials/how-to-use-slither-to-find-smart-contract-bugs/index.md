---
title: "Як використовувати Slither для пошуку помилок у смартконтрактах"
description: "Як використовувати Slither для автоматичного пошуку помилок у смартконтрактах"
author: "Забезпечує охоронною інформацією"
lang: uk
tags:
  [
    "мова програмування",
    "Смарт-контракти",
    "захист",
    "тестування"
  ]
skill: advanced
published: 09.06.2020
source: "Створення безпечних договорів"
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Як використовувати Slither {#how-to-use-slither}

Мета цього посібника — показати, як використовувати Slither для автоматичного пошуку помилок у смарт-контрактах.

- [Встановлення](#installation)
- [Використання командного рядка](#command-line)
- [Вступ до статичного аналізу](#static-analysis): Короткий вступ до статичного аналізу
- [API](#api-basics): Опис Python API

## Встановлення {#installation}

Slither вимагає Python >= 3.6. Його можна інсталювати за допомогою pip або за допомогою Docker.

Slither через pip:

```bash
pip3 install --user slither-analyzer
```

Slither через docker:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_Остання команда запускає eth-security-toolbox у контейнері Docker, який має доступ до вашого поточного каталогу. Ви можете змінювати файли з вашого хоста та запускати інструменти для файлів із контейнера Docker_

Усередині контейнера Docker запустіть:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Запуск скрипту {#running-a-script}

Щоб запустити скрипт Python за допомогою Python 3:

```bash
python3 script.py
```

### Командний рядок {#command-line}

**Командний рядок проти користувацьких скриптів.** Slither постачається з набором попередньо визначених детекторів, які знаходять багато поширених помилок. Виклик Slither з командного рядка запустить усі детектори, для цього не потрібні глибокі знання статичного аналізу:

```bash
slither project_paths
```

Окрім детекторів, Slither має можливості перевірки коду за допомогою своїх [принтерів](https://github.com/crytic/slither#printers) та [інструментів](https://github.com/crytic/slither#tools).

Використовуйте [crytic.io](https://github.com/crytic), щоб отримати доступ до приватних детекторів та інтеграції з GitHub.

## Статичний аналіз {#static-analysis}

Можливості та дизайн фреймворку статичного аналізу Slither були описані в публікаціях у блозі ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) та в [науковій статті](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf).

Статичний аналіз існує в різних формах. Ви, найімовірніше, розумієте, що компілятори, як-от [clang](https://clang-analyzer.llvm.org/) та [gcc](https://lwn.net/Articles/806099/), залежать від цих методів дослідження, але вони також лежать в основі ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](http://findbugs.sourceforge.net/) та інструментів, що базуються на формальних методах, як-от [Frama-C](https://frama-c.com/) і [Polyspace](https://www.mathworks.com/products/polyspace.html)).

Тут ми не будемо вичерпно розглядати методи статичного аналізу та дослідників. Натомість ми зосередимося на тому, що необхідно для розуміння роботи Slither, щоб ви могли ефективніше використовувати його для пошуку помилок та розуміння коду.

- [Представлення коду](#code-representation)
- [Аналіз коду](#analysis)
- [Проміжне представлення](#intermediate-representation)

### Представлення коду {#code-representation}

На відміну від динамічного аналізу, який розглядає один шлях виконання, статичний аналіз розглядає всі шляхи одночасно. Для цього він покладається на інше представлення коду. Двома найпоширенішими є абстрактне синтаксичне дерево (AST) і граф потоку керування (CFG).

### Абстрактні синтаксичні дерева (AST) {#abstract-syntax-trees-ast}

AST використовуються щоразу, коли компілятор парсить код. Це, мабуть, найпростіша структура, на якій можна виконувати статичний аналіз.

Якщо коротко, AST — це структуроване дерево, де зазвичай кожен лист містить змінну або константу, а внутрішні вузли є операндами або операціями потоку керування. Розгляньте такий код:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

Відповідний AST показано в:

![AST](./ast.png)

Slither використовує AST, експортований `solc`.

Хоча AST легко побудувати, він є вкладеною структурою. Іноді це не найпростіша для аналізу структура. Наприклад, щоб визначити операції, які використовуються у виразі `a + b <= a`, ви повинні спочатку проаналізувати `<=` а потім `+`. Поширеним підходом є використання так званого шаблону «Відвідувач» (visitor pattern), який рекурсивно переміщується по дереву. Slither містить загальний відвідувач у [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py).

Наступний код використовує `ExpressionVisitor`, щоб визначити, чи містить вираз додавання:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression is the expression to be tested
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### Граф потоку керування (CFG) {#control-flow-graph-cfg}

Другим за поширеністю представленням коду є граф потоку керування (CFG). Як випливає з назви, це графове представлення, яке розкриває всі шляхи виконання. Кожен вузол містить одну або кілька інструкцій. Ребра в графі представляють операції потоку керування (if/then/else, цикл тощо). CFG нашого попереднього прикладу:

![CFG](./cfg.png)

CFG — це представлення, на основі якого будується більшість аналізів.

Існує багато інших представлень коду. Кожне представлення має переваги та недоліки залежно від аналізу, який ви хочете виконати.

### Аналіз {#analysis}

Найпростіший тип аналізу, який можна виконати за допомогою Slither, — це синтаксичний аналіз.

### Синтаксичний аналіз {#syntax-analysis}

Slither може переміщуватися різними компонентами коду та їхніми представленнями, щоб знаходити невідповідності й недоліки, використовуючи підхід, подібний до зіставлення зі зразком.

Наприклад, наведені нижче детектори шукають проблеми, пов'язані із синтаксисом:

- [Затінення змінної стану](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): ітерує по всіх змінних стану та перевіряє, чи не затіняє якась із них змінну з успадкованого контракту ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [Неправильний інтерфейс ERC20](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): пошук неправильних сигнатур функцій ERC20 ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### Семантичний аналіз {#semantic-analysis}

На відміну від синтаксичного аналізу, семантичний аналіз заглиблюється і аналізує "значення" коду. Ця родина включає деякі широкі типи аналізів. Вони дають потужніші та корисніші результати, але їх також складніше писати.

Семантичний аналіз використовується для найсучасніших виявлень вразливостей.

#### Аналіз залежностей даних {#fixed-point-computation}

Кажуть, що змінна `variable_a` залежить від даних змінної `variable_b`, якщо існує шлях, у якому на значення `variable_a` впливає `variable_b`.

У наведеному нижче коді `variable_a` залежить від `variable_b`:

```solidity
// ...
variable_a = variable_b + 1;
```

Slither має вбудовані можливості [залежності даних](https://github.com/crytic/slither/wiki/data-dependency) завдяки своєму проміжному представленню (обговорюється в наступному розділі).

Приклад використання залежності даних можна знайти в [детекторі небезпечної суворої рівності](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities). Тут Slither шукатиме порівняння суворої рівності з небезпечним значенням ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)) і повідомить користувача, що слід використовувати `>=` або `<=` замість `==`, щоб не дати зловмиснику заблокувати контракт. Крім іншого, детектор вважатиме небезпечним значення, що повертається викликом `balanceOf(address)` ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)), і використовуватиме механізм залежності даних для відстеження його використання.

#### Обчислення з нерухомою точкою {#fixed-point-computation}

Якщо ваш аналіз проходить через CFG і слідує за ребрами, ви, ймовірно, побачите вже відвідані вузли. Наприклад, якщо цикл представлений, як показано нижче:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

Ваш аналіз повинен знати, коли зупинитися. Тут є дві основні стратегії: (1) ітерувати кожен вузол скінченну кількість разів, (2) обчислити так звану _нерухому точку_ (fixpoint). Нерухома точка по суті означає, що аналіз цього вузла більше не дає жодної значущої інформації.

Приклад використання нерухомої точки можна знайти в детекторах повторного входу: Slither досліджує вузли та шукає зовнішні виклики, запис у сховище та читання з нього. Щойно він досягає нерухомої точки ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), він припиняє дослідження та аналізує результати, щоб побачити, чи є повторний вхід, за допомогою різних шаблонів повторного входу ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

Написання аналізів з використанням ефективного обчислення нерухомої точки вимагає доброго розуміння того, як аналіз поширює свою інформацію.

### Проміжне представлення {#intermediate-representation}

Проміжне представлення (IR) — це мова, яка має бути більш придатною для статичного аналізу, ніж вихідна. Slither перетворює Solidity у власне проміжне представлення: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

Розуміння SlithIR не є необхідним, якщо ви хочете писати лише базові перевірки. Однак, це стане в пригоді, якщо ви плануєте писати розширений семантичний аналіз. Принтери [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) та [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) допоможуть вам зрозуміти, як перекладається код.

## Основи API {#api-basics}

Slither має API, який дозволяє досліджувати основні атрибути контракту та його функції.

Щоб завантажити кодову базу:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### Дослідження контрактів і функцій {#exploring-contracts-and-functions}

Об'єкт `Slither` має:

- `contracts (list(Contract))`: список контрактів
- `contracts_derived (list(Contract))`: список контрактів, які не успадковуються іншим контрактом (підмножина контрактів)
- `get_contract_from_name (str)`: повертає контракт за його назвою

Об'єкт `Contract` має:

- `name (str)`: назва контракту
- `functions (list(Function))`: список функцій
- `modifiers (list(Modifier))`: список функцій
- `all_functions_called (list(Function/Modifier))`: список усіх внутрішніх функцій, доступних для контракту
- `inheritance (list(Contract))`: список успадкованих контрактів
- `get_function_from_signature (str)`: повертає функцію за її сигнатурою
- `get_modifier_from_signature (str)`: повертає модифікатор за його сигнатурою
- `get_state_variable_from_name (str)`: повертає змінну стану за її назвою

Об’єкт `Function` або `Modifier` має:

- `name (str)`: назва функції
- `contract (contract)`: контракт, у якому оголошено функцію
- `nodes (list(Node))`: список вузлів, що складають CFG функції/модифікатора
- `entry_point (Node)`: точка входу в CFG
- `variables_read (list(Variable))`: список прочитаних змінних
- `variables_written (list(Variable))`: список записаних змінних
- `state_variables_read (list(StateVariable))`: список прочитаних змінних стану (підмножина `variables_read`)
- `state_variables_written (list(StateVariable))`: список записаних змінних стану (підмножина `variables_written`)
