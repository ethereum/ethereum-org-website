---
title: Мови смарт-контрактів
description: Огляд та порівняння двох основних мов смарт-контрактів — Solidity та Vyper.
lang: uk
---

Чудова особливість [Етеріуму](/) полягає в тому, що смарт-контракти можна програмувати за допомогою відносно зручних для розробників мов. Якщо ви маєте досвід роботи з Python або будь-якою [мовою з фігурними дужками](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages), ви зможете знайти мову зі знайомим синтаксисом.

Дві найактивніші мови, що підтримуються:

- Solidity
- Vyper

Remix IDE надає комплексне середовище розробки для створення та тестування контрактів як на Solidity, так і на Vyper. [Спробуйте браузерну Remix IDE](https://remix.ethereum.org), щоб почати писати код.

Більш досвідчені розробники також можуть використовувати Yul, проміжну мову для [Віртуальної машини Етеріуму](/developers/docs/evm/), або Yul+ — розширення для Yul.

Якщо вам цікаво і ви хочете допомогти в тестуванні нових мов, які все ще перебувають на стадії активної розробки, ви можете поекспериментувати з Fe — новою мовою смарт-контрактів, яка наразі перебуває на початковому етапі розвитку.

## Передумови {#prerequisites}

Попередні знання мов програмування, особливо JavaScript або Python, можуть допомогти вам зрозуміти відмінності в мовах смарт-контрактів. Ми також рекомендуємо вам зрозуміти концепцію смарт-контрактів, перш ніж заглиблюватися в порівняння мов. [Вступ до смарт-контрактів](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Об'єктно-орієнтована мова високого рівня для реалізації смарт-контрактів.
- Мова з фігурними дужками, на яку найбільше вплинув C++.
- Статично типізована (тип змінної відомий під час компіляції).
- Підтримує:
  - Спадкування (ви можете розширювати інші контракти).
  - Бібліотеки (ви можете створювати код для багаторазового використання, який можна викликати з різних контрактів — як статичні функції в статичному класі в інших об'єктно-орієнтованих мовах програмування).
  - Складні типи, визначені користувачем.

### Важливі посилання {#important-links}

- [Документація](https://docs.soliditylang.org/en/latest/)
- [Портал мови Solidity](https://soliditylang.org/)
- [Solidity на прикладах](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Чат Solidity у Gitter](https://gitter.im/ethereum/solidity), об'єднаний з [чатом Solidity у Matrix](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Шпаргалка](https://reference.auditless.com/cheatsheet)
- [Блог Solidity](https://blog.soliditylang.org/)
- [Twitter Solidity](https://twitter.com/solidity_lang)

### Приклад контракту {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // Ключове слово "public" робить змінні
    // доступними з інших контрактів
    address public minter;
    mapping (address => uint) public balances;

    // Події дозволяють клієнтам реагувати на конкретні
    // зміни контракту, які ви оголошуєте
    event Sent(address from, address to, uint amount);

    // Код конструктора виконується лише тоді, коли контракт
    // створюється
    constructor() {
        minter = msg.sender;
    }

    // Надсилає певну кількість новостворених монет на адресу
    // Може бути викликано лише творцем контракту
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Надсилає певну кількість існуючих монет
    // від будь-якого ініціатора виклику на адресу
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Цей приклад має дати вам уявлення про те, як виглядає синтаксис контракту на Solidity. Для більш детального опису функцій та змінних [перегляньте документацію](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Мова програмування, подібна до Python
- Строга типізація
- Невеликий та зрозумілий код компілятора
- Ефективна генерація байт-коду
- Свідомо має менше функцій, ніж Solidity, з метою зробити контракти більш безпечними та простішими для аудиту. Vyper не підтримує:
  - Модифікатори
  - Спадкування
  - Вбудований асемблер (inline assembly)
  - Перевантаження функцій
  - Перевантаження операторів
  - Рекурсивні виклики
  - Нескінченні цикли
  - Двійкові числа з фіксованою комою

Для отримання додаткової інформації [прочитайте обґрунтування Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Важливі посилання {#important-links-1}

- [Документація](https://vyper.readthedocs.io)
- [Vyper на прикладах](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [Більше про Vyper на прикладах](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Чат спільноти Vyper у Discord](https://discord.gg/SdvKC79cJk)
- [Шпаргалка](https://reference.auditless.com/cheatsheet)
- [Фреймворки та інструменти розробки смарт-контрактів для Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk — навчіться захищати та зламувати смарт-контракти на Vyper](https://github.com/SupremacyTeam/VyperPunk)
- [Vyper Hub для розробки](https://github.com/zcor/vyper-dev)
- [Найкращі приклади смарт-контрактів на Vyper](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Добірка корисних ресурсів Awesome Vyper](https://github.com/spadebuilders/awesome-vyper)

### Приклад {#example}

```python
# Відкритий аукціон

# Параметри аукціону
# Бенефіціар отримує гроші від учасника, який запропонував найвищу ціну
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Поточний стан аукціону
highestBidder: public(address)
highestBid: public(uint256)

# Встановлюється як true в кінці, забороняє будь-які зміни
ended: public(bool)

# Відстежуємо відшкодовані ставки, щоб ми могли дотримуватися патерну зняття коштів
pendingReturns: public(HashMap[address, uint256])

# Створює простий аукціон з `_bidding_time`
# секундами часу для торгів від імені
# адреси бенефіціара `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Зробити ставку на аукціоні з надісланою сумою
# разом із цією транзакцією.
# Сума буде відшкодована лише в тому випадку, якщо
# аукціон не виграно.
@external
@payable
def bid():
    # Перевірити, чи закінчився період торгів.
    assert block.timestamp < self.auctionEnd
    # Перевірити, чи достатньо висока ставка
    assert msg.value > self.highestBid
    # Відстежувати відшкодування для попереднього учасника з найвищою ставкою
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Відстежувати нову найвищу ставку
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Зняти попередньо відшкодовану ставку. Патерн зняття коштів
# використовується тут, щоб уникнути проблем з безпекою. Якби відшкодування надсилалися безпосередньо
# як частина bid(), зловмисний контракт для ставок міг би заблокувати
# ці відшкодування і таким чином заблокувати надходження нових вищих ставок.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# Завершити аукціон і надіслати найвищу ставку
# бенефіціару.
@external
def endAuction():
    # Хорошим правилом є структурування функцій, які взаємодіють
    # з іншими контрактами (тобто вони викликають функції або надсилають етер)
    # на три фази:
    # 1. перевірка умов
    # 2. виконання дій (потенційна зміна умов)
    # 3. взаємодія з іншими контрактами
    # Якщо ці фази переплутати, інший контракт може викликати
    # назад поточний контракт і змінити стан або спричинити
    # багаторазове виконання ефектів (виплата етеру).
    # Якщо функції, що викликаються внутрішньо, включають взаємодію із зовнішніми
    # контрактами, вони також повинні розглядатися як взаємодія із
    # зовнішніми контрактами.

    # 1. Умови
    # Перевірити, чи настав час завершення аукціону
    assert block.timestamp >= self.auctionEnd
    # Перевірити, чи ця функція вже була викликана
    assert not self.ended

    # 2. Ефекти
    self.ended = True

    # 3. Взаємодія
    send(self.beneficiary, self.highestBid)
```

Цей приклад має дати вам уявлення про те, як виглядає синтаксис контракту на Vyper. Для більш детального опису функцій та змінних [перегляньте документацію](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul та Yul+ {#yul}

Якщо ви новачок в Етеріумі і ще не писали код мовами смарт-контрактів, ми рекомендуємо почати з Solidity або Vyper. Розглядайте Yul або Yul+ лише тоді, коли ви ознайомитеся з найкращими практиками безпеки смарт-контрактів та специфікою роботи з EVM.

**Yul**

- Проміжна мова для Етеріуму.
- Підтримує [EVM](/developers/docs/evm) та [Ewasm](https://github.com/ewasm) (WebAssembly, адаптований для Етеріуму) і розроблена як зручний спільний знаменник для обох платформ.
- Хороша ціль для етапів високорівневої оптимізації, яка може принести однакову користь як платформам EVM, так і Ewasm.

**Yul+**

- Низькорівневе, високоефективне розширення для Yul.
- Спочатку розроблено для контракту [оптимістичного ролапу](/developers/docs/scaling/optimistic-rollups/).
- Yul+ можна розглядати як експериментальну пропозицію щодо оновлення Yul, яка додає до неї нові функції.

### Важливі посилання {#important-links-2}

- [Документація Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [Документація Yul+](https://github.com/fuellabs/yulp)
- [Вступна стаття про Yul+](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Приклад контракту {#example-contract-2}

Наступний простий приклад реалізує функцію піднесення до степеня. Його можна скомпілювати за допомогою `solc --strict-assembly --bin input.yul`. Приклад слід
зберегти у файлі input.yul.

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

Якщо ви вже маєте великий досвід роботи зі смарт-контрактами, повну реалізацію ERC-20 на Yul можна знайти [тут](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Статично типізована мова для Віртуальної машини Етеріуму (EVM).
- Натхненна Python та Rust.
- Має на меті бути простою у вивченні — навіть для розробників, які є новачками в екосистемі Етеріуму.
- Розробка Fe все ще перебуває на ранніх стадіях, альфа-реліз мови відбувся у січні 2021 року.

### Важливі посилання {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Анонс Fe](https://blog.fe-lang.org/posts/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Дорожня карта Fe на 2021 рік](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Чат Fe у Discord](https://discord.com/invite/ywpkAXFjZH)
- [Twitter Fe](https://twitter.com/official_fe)

### Приклад контракту {#example-contract-3}

Нижче наведено простий контракт, реалізований на Fe.

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

## Як обрати {#how-to-choose}

Як і з будь-якою іншою мовою програмування, здебільшого йдеться про вибір правильного інструменту для конкретного завдання, а також про особисті вподобання.

Ось кілька речей, які варто врахувати, якщо ви ще не пробували жодну з цих мов:

### Чим чудова Solidity? {#solidity-advantages}

- Якщо ви новачок, існує багато посібників та інструментів для навчання. Дізнайтеся більше про це в розділі [Навчання через програмування](/developers/learning-tools/).
- Доступні хороші інструменти для розробників.
- Solidity має велику спільноту розробників, а це означає, що ви, швидше за все, досить швидко знайдете відповіді на свої запитання.

### Чим чудова Vyper? {#vyper-advatages}

- Чудовий спосіб почати для розробників на Python, які хочуть писати смарт-контракти.
- Vyper має меншу кількість функцій, що робить її чудовою для швидкого прототипування ідей.
- Vyper прагне бути простою для аудиту та максимально зрозумілою для людини.

### Чим чудові Yul та Yul+? {#yul-advantages}

- Спрощена та функціональна низькорівнева мова.
- Дозволяє наблизитися до чистої EVM, що може допомогти оптимізувати використання газу у ваших контрактах.

## Порівняння мов {#language-comparisons}

Для порівняння базового синтаксису, життєвого циклу контракту, інтерфейсів, операторів, структур даних, функцій, потоку керування та іншого перегляньте цю [шпаргалку від Auditless](https://reference.auditless.com/cheatsheet/)

## Подальше читання {#further-reading}

- [Бібліотека контрактів Solidity від ОупенЗеппелін](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity на прикладах](https://solidity-by-example.org)