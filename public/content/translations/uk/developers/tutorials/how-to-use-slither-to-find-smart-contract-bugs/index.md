---
title: Як використовувати Слізер для пошуку помилок у смартконтрактах
description: Як використовувати Слізер для автоматичного пошуку помилок у смартконтрактах
author: Трейлофбітс
lang: uk
tags:
  - solidity
  - смартконтракти
  - безпека
  - тестування
skill: advanced
breadcrumb: Слізер
published: 2020-06-09
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Як використовувати Слізер {#how-to-use-slither}

Мета цього посібника — показати, як використовувати Слізер для автоматичного пошуку помилок у смартконтрактах.

- [Встановлення](#installation)
- [Використання командного рядка](#command-line)
- [Вступ до статичного аналізу](#static-analysis): Короткий вступ до статичного аналізу
- [API](#api-basics): Опис API Python

## Встановлення {#installation}

Слізер потребує Python >= 3.6. Його можна встановити за допомогою pip або використовуючи Docker.

Слізер через pip:

```bash
pip3 install --user slither-analyzer
```

Слізер через Docker:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_Остання команда запускає eth-security-toolbox у Docker, який має доступ до вашого поточного каталогу. Ви можете змінювати файли на своєму хості та запускати інструменти для файлів із Docker_

Усередині Docker виконайте:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Запуск скрипта {#running-a-script}

Щоб запустити скрипт Python за допомогою Python 3:

```bash
python3 script.py
```

### Командний рядок {#command-line}

**Командний рядок проти скриптів користувача.** Слізер постачається з набором попередньо визначених детекторів, які знаходять багато поширених помилок. Виклик Слізер з командного рядка запустить усі детектори, для цього не потрібні глибокі знання статичного аналізу:

```bash
slither project_paths
```

Окрім детекторів, Слізер має можливості перевірки коду за допомогою своїх [принтерів](https://github.com/crytic/slither#printers) та [інструментів](https://github.com/crytic/slither#tools).

Використовуйте [crytic.io](https://github.com/crytic), щоб отримати доступ до приватних детекторів та інтеграції з GitHub.

## Статичний аналіз {#static-analysis}

Можливості та архітектура фреймворку статичного аналізу Слізер були описані в публікаціях у блозі ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) та [науковій статті](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf).

Статичний аналіз існує в різних варіаціях. Ви, мабуть, розумієте, що компілятори, такі як [clang](https://clang-analyzer.llvm.org/) та [gcc](https://lwn.net/Articles/806099/), залежать від цих методів дослідження, але вони також лежать в основі [Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](https://findbugs.sourceforge.net/) та інструментів, заснованих на формальних методах, таких як [Frama-C](https://frama-c.com/) і [Polyspace](https://www.mathworks.com/products/polyspace.html).

Ми не будемо тут вичерпно розглядати методи статичного аналізу та дослідження. Натомість ми зосередимося на тому, що необхідно для розуміння роботи Слізер, щоб ви могли ефективніше використовувати його для пошуку помилок і розуміння коду.

- [Представлення коду](#code-representation)
- [Аналіз коду](#analysis)
- [Проміжне представлення](#intermediate-representation)

### Представлення коду {#code-representation}

На відміну від динамічного аналізу, який розглядає єдиний шлях виконання, статичний аналіз розглядає всі шляхи одночасно. Для цього він спирається на інше представлення коду. Двома найпоширенішими є абстрактне синтаксичне дерево (AST) та граф потоку керування (CFG).

### Абстрактні синтаксичні дерева (AST) {#abstract-syntax-trees-ast}

AST використовуються щоразу, коли компілятор аналізує код. Це, мабуть, найбазовіша структура, на основі якої можна виконувати статичний аналіз.

Коротко кажучи, AST — це структуроване дерево, де зазвичай кожен лист містить змінну або константу, а внутрішні вузли є операндами або операціями керування потоком. Розглянемо такий код:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

Відповідне AST показано на:

![AST](./ast.png)

Слізер використовує AST, експортоване solc.

Хоча AST легко побудувати, воно є вкладеною структурою. Іноді це не найпростіший варіант для аналізу. Наприклад, щоб визначити операції, які використовуються виразом `a + b <= a`, ви повинні спочатку проаналізувати `<=`, а потім `+`. Поширеним підходом є використання так званого патерну «відвідувач» (visitor), який рекурсивно переміщується по дереву. Слізер містить загального відвідувача у [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py).

Наступний код використовує `ExpressionVisitor` для виявлення того, чи містить вираз додавання:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression — це вираз, який потрібно перевірити
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### Граф потоку керування (CFG) {#control-flow-graph-cfg}

Другим за поширеністю представленням коду є граф потоку керування (CFG). Як випливає з назви, це представлення на основі графа, яке розкриває всі шляхи виконання. Кожен вузол містить одну або кілька інструкцій. Ребра в графі представляють операції керування потоком (if/then/else, цикли тощо). CFG нашого попереднього прикладу:

![CFG](./cfg.png)

CFG — це представлення, на основі якого будується більшість аналізів.

Існує багато інших представлень коду. Кожне представлення має переваги та недоліки залежно від аналізу, який ви хочете виконати.

### Аналіз {#analysis}

Найпростіший тип аналізу, який ви можете виконати за допомогою Слізер, — це синтаксичний аналіз.

### Синтаксичний аналіз {#syntax-analysis}

Слізер може переміщуватися різними компонентами коду та їхнім представленням, щоб знаходити невідповідності та недоліки, використовуючи підхід, подібний до зіставлення із шаблоном.

Наприклад, такі детектори шукають проблеми, пов'язані із синтаксисом:

- [Перекриття змінних стану](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): перебирає всі змінні стану та перевіряє, чи не перекриває якась із них змінну з успадкованого контракту ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [Неправильний інтерфейс ERC-20](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): шукає неправильні підписи функцій ERC-20 ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### Семантичний аналіз {#semantic-analysis}

На відміну від синтаксичного аналізу, семантичний аналіз заглиблюється та аналізує «значення» коду. Ця родина включає деякі широкі типи аналізів. Вони дають потужніші та корисніші результати, але їх також складніше писати.

Семантичний аналіз використовується для найсучаснішого виявлення вразливостей.

#### Аналіз залежності даних {#fixed-point-computation}

Змінна `variable_a` вважається залежною від даних `variable_b`, якщо існує шлях, на якому значення `variable_a` залежить від `variable_b`.

У наступному коді `variable_a` залежить від `variable_b`:

```solidity
// ...
variable_a = variable_b + 1;
```

Слізер постачається з вбудованими можливостями [залежності даних](https://github.com/crytic/slither/wiki/data-dependency) завдяки своєму проміжному представленню (обговорюється в наступному розділі).

Приклад використання залежності даних можна знайти в [детекторі небезпечної строгої рівності](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities). Тут Слізер шукатиме порівняння на строгу рівність із небезпечним значенням ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)) і повідомить користувача, що слід використовувати `>=` або `<=` замість `==`, щоб запобігти потраплянню контракту в пастку зловмисника. Крім іншого, детектор вважатиме небезпечним значення, що повертається викликом `balanceOf(address)` ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)), і використовуватиме механізм залежності даних для відстеження його використання.

#### Обчислення фіксованої точки {#fixed-point-computation-2}

Якщо ваш аналіз переміщується по CFG і слідує за ребрами, ви, ймовірно, побачите вже відвідані вузли. Наприклад, якщо цикл представлений, як показано нижче:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

Вашому аналізу потрібно буде знати, коли зупинитися. Тут є дві основні стратегії: (1) ітерувати кожен вузол скінченну кількість разів, (2) обчислити так звану _фіксовану точку_ (fixpoint). Фіксована точка в основному означає, що аналіз цього вузла не надає жодної значущої інформації.

Приклад використання фіксованої точки можна знайти в детекторах повторного входу: Слізер досліджує вузли та шукає зовнішні виклики, запис і читання зі сховища. Щойно він досягає фіксованої точки ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), він зупиняє дослідження та аналізує результати, щоб побачити, чи присутній повторний вхід, за допомогою різних патернів повторного входу ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

Написання аналізів з використанням ефективного обчислення фіксованої точки вимагає хорошого розуміння того, як аналіз поширює свою інформацію.

### Проміжне представлення {#intermediate-representation}

Проміжне представлення (IR) — це мова, яка має бути більш піддатливою до статичного аналізу, ніж оригінальна. Слізер перекладає Solidity на власне IR: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

Розуміння SlithIR не є обов'язковим, якщо ви хочете писати лише базові перевірки. Однак це стане в пригоді, якщо ви плануєте писати розширені семантичні аналізи. Принтери [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) та [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) допоможуть вам зрозуміти, як перекладається код.

## Основи API {#api-basics}

Слізер має API, який дозволяє досліджувати базові атрибути контракту та його функцій.

Щоб завантажити кодову базу:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### Дослідження контрактів і функцій {#exploring-contracts-and-functions}

Об'єкт `Slither` має:

- `contracts (list(Contract)`: список контрактів
- `contracts_derived (list(Contract)`: список контрактів, які не успадковуються іншим контрактом (підмножина контрактів)
- `get_contract_from_name (str)`: повертає контракт за його назвою

Об'єкт `Contract` має:

- `name (str)`: назва контракту
- `functions (list(Function))`: список функцій
- `modifiers (list(Modifier))`: список функцій
- `all_functions_called (list(Function/Modifier))`: список усіх внутрішніх функцій, доступних контракту
- `inheritance (list(Contract))`: список успадкованих контрактів
- `get_function_from_signature (str)`: повертає функцію за її підписом
- `get_modifier_from_signature (str)`: повертає модифікатор за його підписом
- `get_state_variable_from_name (str)`: повертає змінну стану за її назвою

Об'єкт `Function` або `Modifier` має:

- `name (str)`: назва функції
- `contract (contract)`: контракт, у якому оголошено функцію
- `nodes (list(Node))`: список вузлів, що складають CFG функції/модифікатора
- `entry_point (Node)`: точка входу CFG
- `variables_read (list(Variable))`: список прочитаних змінних
- `variables_written (list(Variable))`: список записаних змінних
- `state_variables_read (list(StateVariable))`: список прочитаних змінних стану (підмножина variables`read)
- `state_variables_written (list(StateVariable))`: список записаних змінних стану (підмножина variables`written)