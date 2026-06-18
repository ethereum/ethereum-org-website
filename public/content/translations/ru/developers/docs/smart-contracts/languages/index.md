---
title: "Языки смарт-контрактов"
description: "Обзор и сравнение двух основных языков смарт-контрактов — Solidity и Vyper."
lang: ru
---

Отличная особенность [Эфириума](/) заключается в том, что смарт-контракты можно программировать с использованием относительно удобных для разработчиков языков. Если у вас есть опыт работы с Python или любым [языком с фигурными скобками](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages), вы сможете найти язык со знакомым синтаксисом.

Два наиболее активных и поддерживаемых языка:

- Solidity
- Vyper

Remix IDE предоставляет комплексную среду разработки для создания и тестирования контрактов как на Solidity, так и на Vyper. [Попробуйте браузерную Remix IDE](https://remix.ethereum.org), чтобы начать программировать.

Более опытные разработчики также могут захотеть использовать Yul, промежуточный язык для [виртуальной машины Эфириума (EVM)](/developers/docs/evm/), или Yul+, расширение для Yul.

Если вам любопытно и вы хотите помочь в тестировании новых языков, которые все еще находятся в стадии активной разработки, вы можете поэкспериментировать с Fe — новым языком смарт-контрактов, который в настоящее время находится на ранней стадии развития.

## Предварительные требования {#prerequisites}

Предыдущий опыт работы с языками программирования, особенно с JavaScript или Python, может помочь вам разобраться в различиях языков смарт-контрактов. Мы также рекомендуем вам понять концепцию смарт-контрактов, прежде чем слишком глубоко погружаться в сравнение языков. [Введение в смарт-контракты](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Объектно-ориентированный язык высокого уровня для реализации смарт-контрактов.
- Язык с фигурными скобками, на который наибольшее влияние оказал C++.
- Статически типизированный (тип переменной известен во время компиляции).
- Поддерживает:
  - Наследование (вы можете расширять другие контракты).
  - Библиотеки (вы можете создавать переиспользуемый код, который можно вызывать из разных контрактов — подобно статическим функциям в статическом классе в других объектно-ориентированных языках программирования).
  - Сложные пользовательские типы.

### Важные ссылки {#important-links}

- [Документация](https://docs.soliditylang.org/en/latest/)
- [Портал языка Solidity](https://soliditylang.org/)
- [Solidity на примерах](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Чат Solidity в Gitter](https://gitter.im/ethereum/solidity), связанный с [чатом Solidity в Matrix](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Шпаргалка](https://reference.auditless.com/cheatsheet)
- [Блог Solidity](https://blog.soliditylang.org/)
- [Твиттер Solidity](https://twitter.com/solidity_lang)

### Пример контракта {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // Ключевое слово "public" делает переменные
    // доступными из других контрактов
    address public minter;
    mapping (address => uint) public balances;

    // События позволяют клиентам реагировать на конкретные
    // изменения контракта, которые вы объявляете
    event Sent(address from, address to, uint amount);

    // Код конструктора выполняется только тогда, когда контракт
    // создается
    constructor() {
        minter = msg.sender;
    }

    // Отправляет определенное количество новых созданных монет на адрес
    // Может быть вызвано только создателем контракта
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Отправляет определенное количество существующих монет
    // от любого вызывающего на адрес
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Этот пример должен дать вам представление о том, как выглядит синтаксис контракта на Solidity. Для более подробного описания функций и переменных [ознакомьтесь с документацией](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Язык программирования в стиле Python
- Строгая типизация
- Небольшой и понятный код компилятора
- Эффективная генерация байт-кода
- Намеренно имеет меньше функций, чем Solidity, с целью сделать контракты более безопасными и простыми для аудита. Vyper не поддерживает:
  - Модификаторы
  - Наследование
  - Встроенный ассемблер
  - Перегрузку функций
  - Перегрузку операторов
  - Рекурсивные вызовы
  - Бесконечные циклы
  - Двоичные числа с фиксированной запятой

Для получения дополнительной информации [прочитайте обоснование создания Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Важные ссылки {#important-links-1}

- [Документация](https://vyper.readthedocs.io)
- [Vyper на примерах](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [Больше примеров на Vyper](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Чат сообщества Vyper в Дискорде](https://discord.gg/SdvKC79cJk)
- [Шпаргалка](https://reference.auditless.com/cheatsheet)
- [Фреймворки и инструменты разработки смарт-контрактов для Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk — научитесь защищать и взламывать смарт-контракты на Vyper](https://github.com/SupremacyTeam/VyperPunk)
- [Vyper Hub для разработки](https://github.com/zcor/vyper-dev)
- [Лучшие примеры смарт-контрактов на Vyper](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Подборка полезных ресурсов Awesome Vyper](https://github.com/spadebuilders/awesome-vyper)

### Пример {#example}

```python
# Открытый аукцион

# Параметры аукциона
# Бенефициар получает деньги от участника, предложившего наибольшую цену
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Текущее состояние аукциона
highestBidder: public(address)
highestBid: public(uint256)

# Устанавливается в true в конце, запрещает любые изменения
ended: public(bool)

# Отслеживание возвращенных ставок, чтобы мы могли следовать шаблону вывода средств
pendingReturns: public(HashMap[address, uint256])

# Создает простой аукцион со временем торгов `_bidding_time`
# секунд от имени
# адреса бенефициара `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Сделать ставку на аукционе со значением, отправленным
# вместе с этой транзакцией.
# Значение будет возвращено только в том случае, если
# аукцион не выигран.
@external
@payable
def bid():
    # Проверить, закончился ли период торгов.
    assert block.timestamp < self.auctionEnd
    # Проверить, достаточно ли высока ставка
    assert msg.value > self.highestBid
    # Отследить возврат для предыдущего участника с наибольшей ставкой
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Отследить новую наибольшую ставку
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Вывести ранее возвращенную ставку. Шаблон вывода средств
# используется здесь, чтобы избежать проблем с безопасностью. Если бы возвраты напрямую
# отправлялись как часть bid(), вредоносный контракт для ставок мог бы заблокировать
# эти возвраты и тем самым заблокировать поступление новых более высоких ставок.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# Завершить аукцион и отправить наибольшую ставку
# бенефициару.
@external
def endAuction():
    # Хорошим правилом является структурирование функций, которые взаимодействуют
    # с другими контрактами (т.е. они вызывают функции или отправляют эфир)
    # на три фазы:
    # 1. проверка условий
    # 2. выполнение действий (потенциально изменяющих условия)
    # 3. взаимодействие с другими контрактами
    # Если эти фазы перепутаны, другой контракт может вызвать
    # обратно текущий контракт и изменить состояние или привести к тому, что
    # эффекты (выплата эфира) будут выполнены несколько раз.
    # Если функции, вызываемые внутренне, включают взаимодействие с внешними
    # контрактами, они также должны рассматриваться как взаимодействие с
    # внешними контрактами.

    # 1. Условия
    # Проверить, достигнуто ли время окончания аукциона
    assert block.timestamp >= self.auctionEnd
    # Проверить, была ли уже вызвана эта функция
    assert not self.ended

    # 2. Эффекты
    self.ended = True

    # 3. Взаимодействие
    send(self.beneficiary, self.highestBid)
```

Этот пример должен дать вам представление о том, как выглядит синтаксис контракта на Vyper. Для более подробного описания функций и переменных [ознакомьтесь с документацией](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul и Yul+ {#yul}

Если вы новичок в Эфириуме и еще не программировали на языках смарт-контрактов, мы рекомендуем начать с Solidity или Vyper. Изучайте Yul или Yul+ только после того, как ознакомитесь с передовыми методами обеспечения безопасности смарт-контрактов и спецификой работы с EVM.

**Yul**

- Промежуточный язык для Эфириума.
- Поддерживает [EVM](/developers/docs/evm) и [Ewasm](https://github.com/ewasm) (WebAssembly, адаптированный для Эфириума) и разработан как удобный общий знаменатель для обеих платформ.
- Хорошая цель для этапов высокоуровневой оптимизации, которая может принести равную пользу платформам EVM и Ewasm.

**Yul+**

- Низкоуровневое, высокоэффективное расширение для Yul.
- Изначально разработано для контракта [оптимистичного роллапа](/developers/docs/scaling/optimistic-rollups/).
- Yul+ можно рассматривать как экспериментальное предложение по обновлению Yul, добавляющее в него новые функции.

### Важные ссылки {#important-links-2}

- [Документация Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [Документация Yul+](https://github.com/fuellabs/yulp)
- [Вводная статья о Yul+](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Пример контракта {#example-contract-2}

Следующий простой пример реализует функцию возведения в степень. Его можно скомпилировать с помощью `solc --strict-assembly --bin input.yul`. Пример должен быть сохранен в файле input.yul.

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

Если у вас уже есть большой опыт работы со смарт-контрактами, полную реализацию ERC-20 на Yul можно найти [здесь](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Статически типизированный язык для виртуальной машины Эфириума (EVM).
- Вдохновлен Python и Rust.
- Стремится быть простым в изучении — даже для разработчиков, которые только знакомятся с экосистемой Эфириума.
- Разработка Fe все еще находится на ранней стадии, альфа-версия языка была выпущена в январе 2021 года.

### Важные ссылки {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Анонс Fe](https://blog.fe-lang.org/posts/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Дорожная карта Fe на 2021 год](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Чат Fe в Дискорде](https://discord.com/invite/ywpkAXFjZH)
- [Твиттер Fe](https://twitter.com/official_fe)

### Пример контракта {#example-contract-3}

Ниже приведен простой контракт, реализованный на Fe.

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

Как и в случае с любым другим языком программирования, в основном речь идет о выборе правильного инструмента для конкретной задачи, а также о личных предпочтениях.

Вот несколько моментов, которые следует учитывать, если вы еще не пробовали ни один из этих языков:

### Чем хорош Solidity? {#solidity-advantages}

- Если вы новичок, существует множество руководств и обучающих инструментов. Подробнее об этом читайте в разделе [Обучение через программирование](/developers/learning-tools/).
- Доступны хорошие инструменты для разработчиков.
- У Solidity большое сообщество разработчиков, а это значит, что вы, скорее всего, довольно быстро найдете ответы на свои вопросы.

### Чем хорош Vyper? {#vyper-advatages}

- Отличный способ начать для разработчиков на Python, которые хотят писать смарт-контракты.
- Vyper имеет меньшее количество функций, что делает его отличным выбором для быстрого прототипирования идей.
- Vyper стремится быть простым для аудита и максимально удобочитаемым для человека.

### Чем хороши Yul и Yul+? {#yul-advantages}

- Упрощенный и функциональный низкоуровневый язык.
- Позволяет стать намного ближе к чистой EVM, что может помочь оптимизировать использование газа вашими контрактами.

## Сравнение языков {#language-comparisons}

Для сравнения базового синтаксиса, жизненного цикла контракта, интерфейсов, операторов, структур данных, функций, потока управления и многого другого ознакомьтесь с этой [шпаргалкой от Auditless](https://reference.auditless.com/cheatsheet/).

## Дополнительная литература {#further-reading}

- [Библиотека контрактов Solidity от ОпенЗеппелин](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity на примерах](https://solidity-by-example.org)