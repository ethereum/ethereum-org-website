---
title: Языки программирования смарт-контрактов
description: Обзор и сравнение двух основных языков программирования смарт контрактов – Solidity и Vyper.
lang: ru
---

Отличительная черта Ethereum в том, что смарт-контракты могут быть написаны при помощи относительно удобных для разработчиков языков. Если у вас есть опыт работы с Python или любым [языком с фигурными скобками](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages), вы можете найти язык со знакомым синтаксисом.

Два наиболее часто используемых и поддерживаемых языка это:

- Solidity
- Vyper

Remix IDE предоставляет комплексную среду разработки для создания и тестирования контрактов как на Solidity, так и на Vyper. [Попробуйте браузерную Remix IDE](https://remix.ethereum.org), чтобы начать программировать.

Более опытные разработчики также могут использовать Yul, промежуточный язык для [виртуальной машины Ethereum](/developers/docs/evm/), или Yul+, расширение для Yul.

Если вам любопытно и вы хотите помочь протестировать новые языки, которые все еще находятся в стадии активной разработки, вы можете поэкспериментировать с Fe, новым языком смарт-контрактов, который в настоящее время все еще находится в состоянии становления.

## Предварительные условия {#prerequisites}

Предыдущие знания языков программирования, особенно JavaScript или Python, могут помочь вам уловить разницу между языками смарт контрактов. Мы также рекомендуем вам ознакомится со смарт контрактами, как явлением, прежде чем углубляться в сравнение языков. [Введение в смарт-контракты](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Объектно-ориентированный высокоуровневый язык для реализации смарт-контрактов.
- Язык "фигурных скобок", на который большое влияние оказал C++.
- Статический (тип переменной известен во время компиляции).
- Поддерживает:
  - Наследование (вы можете расширять другие контракты).
  - Библиотеки (вы можете создавать повторно используемый код, который можно вызывать из разных контрактов как статические функции в статических классах в других языках программирования).
  - Сложные типы, определяемые пользователем.

### Важные ссылки {#important-links}

- [Документация](https://docs.soliditylang.org/en/latest/)
- [Портал языка Solidity](https://soliditylang.org/)
- [Solidity by Example](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Чат Solidity в Gitter](https://gitter.im/ethereum/solidity) с мостом в [чат Solidity в Matrix](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Шпаргалка](https://reference.auditless.com/cheatsheet)
- [Блог Solidity](https://blog.soliditylang.org/)
- [Solidity в Twitter](https://twitter.com/solidity_lang)

### Пример контракта {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // Ключевое слово "public" делает переменные
    // доступными из других контрактов
    address public minter;
    mapping (address => uint) public balances;

    // События позволяют клиентам реагировать на определенные
    // объявляемые вами изменения в контракте
    event Sent(address from, address to, uint amount);

    // Код конструктора выполняется только при
    // создании контракта
    constructor() {
        minter = msg.sender;
    }

    // Отправляет определенное количество вновь созданных монет на адрес
    // Может вызываться только создателем контракта
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Отправляет определенное количество существующих монет
    // от любого вызывающего на адрес
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Недостаточный баланс.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Этот пример призван дать понимание о том, что из себя представляет синтаксис контракта на Solidity. Более подробное описание функций и переменных смотрите [в документации](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Язык программирования, похожий на Python
- Сильная типизация
- Маленький и понятный код компилятора
- Эффективная генерация байткода
- Специально содержит меньше функционала, чем Solidity, с целью создания более безопасных контрактов, которые легче проверять. Vyper не поддерживает:
  - Модификаторы
  - Наследование
  - Ассамблерное встраивание
  - Перегрузку функций
  - Перегрузку операторов
  - Рекурсию
  - Бесконечные циклы
  - Бинарные фиксированные точки

Для получения дополнительной информации [прочтите обоснование Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Важные ссылки {#important-links-1}

- [Документация](https://vyper.readthedocs.io)
- [Vyper by Example](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [More Vyper by Example](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Чат сообщества Vyper в Discord](https://discord.gg/SdvKC79cJk)
- [Шпаргалка](https://reference.auditless.com/cheatsheet)
- [Платформы и инструменты для разработки смарт-контрактов для Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk: научитесь защищать и взламывать смарт-контракты на Vyper](https://github.com/SupremacyTeam/VyperPunk)
- [Vyper Hub для разработки](https://github.com/zcor/vyper-dev)
- [Vyper: лучшие примеры смарт-контрактов](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Awesome Vyper: избранные ресурсы](https://github.com/spadebuilders/awesome-vyper)

### Пример {#example}

```python
# Открытый аукцион

# Параметры аукциона
# Бенефициар получает деньги от участника, предложившего самую высокую цену
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Текущее состояние аукциона
highestBidder: public(address)
highestBid: public(uint256)

# Устанавливается в true в конце, запрещает любые изменения
ended: public(bool)

# Отслеживайте возвращенные ставки, чтобы мы могли следовать шаблону вывода средств
pendingReturns: public(HashMap[address, uint256])

# Создайте простой аукцион с `_bidding_time`
# секундами времени для торгов от имени
# адреса бенефициара `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Сделайте ставку на аукционе на сумму, отправленную
# вместе с этой транзакцией.
# Сумма будет возвращена, только если
# аукцион не выигран.
@external
@payable
def bid():
    # Проверьте, закончился ли период торгов.
    assert block.timestamp < self.auctionEnd
    # Проверьте, достаточно ли высока ставка
    assert msg.value > self.highestBid
    # Отследите возврат средств для предыдущего участника, предложившего самую высокую цену
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Отследите новую высокую ставку
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Выведите ранее возвращенную ставку. Шаблон вывода средств
# используется здесь, чтобы избежать проблемы с безопасностью. Если бы возмещения были напрямую
# отправлены как часть bid(), вредоносный контракт для торгов мог бы заблокировать
# эти возвраты и, таким образом, заблокировать поступление новых более высоких ставок.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# Завершите аукцион и отправьте самую высокую ставку
# бенефициару.
@external
def endAuction():
    # Рекомендуется структурировать функции, которые взаимодействуют
    # с другими контрактами (т. е. вызывают функции или отправляют эфир)
    # в три этапа:
    # 1. проверка условий
    # 2. выполнение действий (потенциально изменяющих условия)
    # 3. взаимодействие с другими контрактами
    # Если эти этапы перепутаны, другой контракт может вызвать
    # обратно текущий контракт и изменить состояние или вызвать
    # многократное выполнение эффектов (выплата эфира).
    # Если функции, вызываемые внутри, включают взаимодействие с внешними
    # контрактами, их также следует рассматривать как взаимодействие с
    # внешними контрактами.

    # 1. Условия
    # Проверьте, достигнуто ли время окончания аукциона
    assert block.timestamp >= self.auctionEnd
    # Проверьте, не была ли эта функция уже вызвана
    assert not self.ended

    # 2. Эффекты
    self.ended = True

    # 3. Взаимодействие
    send(self.beneficiary, self.highestBid)
```

Этот пример должен дать вам представление о синтаксисе контракта Vyper. Более подробное описание функций и переменных смотрите [в документации](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul и Yul+ {#yul}

Если вы новичок в Ethereum и еще не программировали на языках смарт-контрактов, мы рекомендуем начать с Solidity или Vyper. Обращайтесь к Yul или Yul+ только после того, как ознакомитесь с передовыми методами обеспечения безопасности смарт-контрактов и особенностями работы с EVM.

**Yul**

- Промежуточный язык для Ethereum.
- Поддерживает [EVM](/developers/docs/evm) и [Ewasm](https://github.com/ewasm), WebAssembly в стиле Ethereum, и разработан как пригодный общий знаменатель для обеих платформ.
- Хорошо подходит для этапов высокоуровневой оптимизации, которые могут в равной степени принести пользу как платформе EVM, так и Ewasm.

**Yul+**

- Низкоуровневое, высокоэффективное расширение для Yul.
- Первоначально был разработан для контракта [оптимистического ролл-апа](/developers/docs/scaling/optimistic-rollups/).
- Yul+ можно рассматривать как экспериментальное предложение по обновлению Yul, добавляющее в него новые функции.

### Важные ссылки {#important-links-2}

- [Документация Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [Документация Yul+](https://github.com/fuellabs/yulp)
- [Вводная статья о Yul+](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Пример контракта {#example-contract-2}

На этом простом примере реализуем функцию power. Его можно скомпилировать с помощью `solc --strict-assembly --bin input.yul`. Пример должен быть сохранен в файле input.yul.

```
{
    function power(base, exponent) -> result
    {
        switch exponent
        case 0 { result := 1 }
        case 1 { result := base }
        default
        {
            result := power(mul(base, base), div(exponent, 2))
            if mod(exponent, 2) { result := mul(base, result) }
        }
    }
    let res := power(calldataload(0), calldataload(32))
    mstore(0, res)
    return(0, 32)
}
```

Если у вас уже есть большой опыт работы со смарт-контрактами, полную реализацию ERC20 на Yul можно найти [здесь](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Статически типизированный язык для виртуальной машины Ethereum (EVM).
- Вдохновлен Python и Rust.
- Стремится быть простым в освоении — даже для разработчиков, которые плохо знакомы с экосистемой Ethereum.
- Разработка Fe все еще находится на ранней стадии, альфа-версия языка была выпущена в январе 2021 года.

### Важные ссылки {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Анонс Fe](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Дорожная карта Fe на 2021 год](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Чат Fe в Discord](https://discord.com/invite/ywpkAXFjZH)
- [Fe в Twitter](https://twitter.com/official_fe)

### Пример контракта {#example-contract-3}

Ниже приведен простой контракт, реализованный в Fe.

```
type BookMsg = bytes[100]

contract GuestBook:
    pub guest_book: map<address, BookMsg>

    event Signed:
        book_msg: BookMsg

    pub def sign(book_msg: BookMsg):
        self.guest_book[msg.sender] = book_msg

        emit Signed(book_msg=book_msg)

    pub def get_msg(addr: address) -> BookMsg:
        return self.guest_book[addr].to_mem()

```

## Как выбрать {#how-to-choose}

Как и с другими языками программирования, это в большинстве своем выбор правильного инструмента для конкретной работы, так же, как и в личных предпочтениях.

Вот несколько фактов для раздумий, если вы ещё не пробовали ни один из языков:

### Какие преимущества у Solidity? {#solidity-advantages}

- Если вы новичок, есть множество материалов и инструментов обучения. Подробнее об этом можно узнать в разделе [Учитесь, создавая код](/developers/learning-tools/).
- Доступны удобные инструменты для разработчиков.
- У Solidity большое сообщество разработчиков, что означает быстрый поиск ответов на ваши вопросы.

### Какие преимущества у Vyper? {#vyper-advatages}

- Отличный способ начать для Python разработчиков, которые хотят писать смарт контракты.
- У Vyper меньшее количество функционала, что делает его превосходным инструментом для быстрой проверки идей.
- Цель Vyper быть легким для аудитов и максимально читабельным для людей.

### Какие преимущества у Yul и Yul+? {#yul-advantages}

- Простой и функциональный низкоуровневый язык.
- Позволяет максимально приблизиться к функциям EVM, что может помочь оптимизировать затраты газа в ваших контрактах.

## Сравнение языков {#language-comparisons}

Для сравнения базового синтаксиса, жизненного цикла контракта, интерфейсов, операторов, структур данных, функций, потока управления и многого другого ознакомьтесь с этой [шпаргалкой от Auditless](https://reference.auditless.com/cheatsheet/)

## Дополнительные материалы {#further-reading}

- [Библиотека контрактов Solidity от OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity by Example](https://solidity-by-example.org)
