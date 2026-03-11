---
title: "Мови розумних контрактів"
description: "Огляд та порівняння двох основних смарт контрактних мов - Solidity та Vyper."
lang: uk
---

Величезний аспект Ethereum в тому, що розумні контракти можна програмувати, використовуючи відносно зручні для розробників мови. Якщо у вас є досвід роботи з Python або будь-якою [мовою з фігурними дужками](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages), ви можете знайти мову зі знайомим синтаксисом.

Дві найбільш активні та спільні мови є:

- Мова програмування Solidity
- Vyper

Remix IDE надає комплексне середовище розробки для створення та тестування контрактів як на Solidity, так і на Vyper. [Спробуйте браузерний Remix IDE](https://remix.ethereum.org), щоб почати кодувати.

Більш досвідчені розробники також можуть захотіти використовувати Yul, проміжну мову для [віртуальної машини Ethereum](/developers/docs/evm/), або Yul+, розширення для Yul.

Якщо вам цікаво і ви любите допомагати тестувати нові мови, які досі знаходяться під тяжким розвитком, ви можете поекспериментувати з Fe, новою мовою смарт-контрактів, яка наразі ще тільки зароджується.

## Передумови {#prerequisites}

Попередні знання мов програмування, особливо JavaScript або Python, можуть допомогти вам зрозуміти різницю мовах смарт-контракту. Ми також рекомендуємо вам розуміти смарт-контракти як поняття до того, як занурюватись надто глибоко в мовні порівняння. [Вступ до смарт-контрактів](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Об'єктно-орієнтована мова високого рівня для впровадження смарт-контрактів.
- Мова з фігурними дужками, на яку найбільше вплинув C++.
- Статично введений (тип змінної, відомий під час компіляції).
- Підтримки:
  - Спадковість (ви можете розширити інші контракти).
  - Бібліотеки (ви можете створити код багаторазового використання, який можна викликати з різних контрактів, наприклад: статичні функції в статичному класі в інших об'єктно-орієнтованих мовах програмування).
  - Читання користувацьких типів.

### Важливі посилання {#important-links}

- [Документація](https://docs.soliditylang.org/en/latest/)
- [Портал мови Solidity](https://soliditylang.org/)
- [Solidity в прикладах](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Чат Solidity у Gitter](https://gitter.im/ethereum/solidity), підключений до [чату Solidity у Matrix](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Шпаргалка](https://reference.auditless.com/cheatsheet)
- [Блог Solidity](https://blog.soliditylang.org/)
- [Solidity у Twitter](https://twitter.com/solidity_lang)

### Приклад контракту {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // Ключове слово "public" робить змінні
    // доступними для інших контрактів
    address public minter;
    mapping (address => uint) public balances;

    // Події дають змогу клієнтам реагувати на певні
    // зміни в контракті, які ви оголошуєте
    event Sent(address from, address to, uint amount);

    // Код конструктора виконується лише під час
    // створення контракту
    constructor() {
        minter = msg.sender;
    }

    // Надсилає певну кількість щойно створених монет на адресу
    // Може бути викликана лише творцем контракту
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Надсилає певну кількість існуючих монет
    // від будь-якого абонента на адресу
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Недостатній баланс.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Цей приклад повинен дати вам уявлення про те, як виглядає синтаксис контракту Solidity. Більш детальний опис функцій і змінних [дивіться в документації](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Мова програмування Pythonic
- Strong typing
- Невеликий і зрозумілий код компілятора
- Ефективна генерація байт-коду
- Навмисно має менше функцій, ніж Solidity, з метою зробити контракти більш безпечними та легшими для перевірки. Vyper не підтримує:
  - Модифікатори
  - Наслідування
  - Вбудовану збірку
  - Перевантаження функцій
  - Перевантаження оператора
  - Рекурсивні виклики
  - Петлі нескінченної довжини
  - Двійкові нерухомі точки

Щоб отримати додаткову інформацію, [прочитайте обґрунтування Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Важливі посилання {#important-links-1}

- [Документація](https://vyper.readthedocs.io)
- [Vyper у прикладах](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [Більше прикладів Vyper](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Чат спільноти Vyper у Discord](https://discord.gg/SdvKC79cJk)
- [Шпаргалка](https://reference.auditless.com/cheatsheet)
- [Фреймворки та інструменти розробки смарт-контрактів для Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk — навчіться захищати та зламувати смарт-контракти Vyper](https://github.com/SupremacyTeam/VyperPunk)
- [Vyper Hub для розробки](https://github.com/zcor/vyper-dev)
- [Найкращі приклади смарт-контрактів Vyper](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Добірка ресурсів Awesome Vyper](https://github.com/spadebuilders/awesome-vyper)

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

# Установлюється на true в кінці, забороняє будь-які зміни

ended: public(bool)

# Відстежуйте відшкодовані ставки, щоб ми могли дотримуватися шаблону виведення

pendingReturns: public(HashMap[address, uint256])

# Створіть простий аукціон із часом торгів `_bidding_time`

# секунд від імені

# адреси бенефіціара `_beneficiary`.

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Зробіть ставку на аукціоні на суму, надіслану

# разом із цією транзакцією.

# Сума буде повернута, лише якщо

# аукціон не буде виграно.

@external
@payable
def bid():
    # Перевірте, чи закінчився період торгів.
    assert block.timestamp < self.auctionEnd
    # Перевірте, чи достатньо висока ставка
    assert msg.value > self.highestBid
    # Відстежуйте відшкодування для попереднього учасника з найвищою ставкою
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Відстежуйте нову високу ставку
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Виведіть раніше повернуту ставку. Шаблон виведення

# використовується тут, щоб уникнути проблеми з безпекою. Якби повернення надсилалися безпосередньо

# як частина bid(), зловмисний контракт торгів міг би заблокувати

# ці повернення і таким чином заблокувати надходження нових вищих ставок.

@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# Завершіть аукціон і надішліть найвищу ставку

# бенефіціару.

@external
def endAuction():
    # Рекомендується структурувати функції, які взаємодіють
    # з іншими контрактами (тобто викликають функції або надсилають ефір)
    # у три етапи:
    # 1. перевірка умов
    # 2. виконання дій (потенційно змінюючи умови)
    # 3. взаємодія з іншими контрактами
    # Якщо ці етапи переплутані, інший контракт може викликати
    # назад поточний контракт і змінити стан або спричинити
    # багаторазове виконання ефектів (виплата ефіру).
    # Якщо функції, що викликаються внутрішньо, включають взаємодію із зовнішніми
    # контрактами, їх також слід розглядати як взаємодію із
    # зовнішніми контрактами.

    # 1. Умови
    # Перевірте, чи досягнуто часу завершення аукціону
    assert block.timestamp >= self.auctionEnd
    # Перевірте, чи цю функцію вже було викликано
    assert not self.ended

    # 2. Ефекти
    self.ended = True

    # 3. Взаємодія
    send(self.beneficiary, self.highestBid)
```

Цей приклад повинен дати вам уявлення про те, як виглядає синтаксис контракту Vyper. Більш детальний опис функцій і змінних [дивіться в документації](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul та Yul+ {#yul}

Якщо ви новачок в Ethereum і ще не робили кодування смарт-контрактними мовами, ми радимо розпочати роботу з Solidity чи Vyper. Подивіться на Yul або Yul+ лише після того, як ви ознайомитесь із найкращими практиками безпеки смарт-контрактів та особливостями роботи з EVM.

**Yul**

- Проміжна мова для Ethereum.
- Підтримує [EVM](/developers/docs/evm) та [Ewasm](https://github.com/ewasm), версію WebAssembly для Ethereum, і розроблена як придатний спільний знаменник для обох платформ.
- Гарна мета для стадій оптимізації високого рівня, які можуть отримати користь від EVM та Ewasm платформ однаково.

**Yul+**

- Низький рівень високоефективного розширення Yul.
- Спочатку розроблена для контракту [optimistic rollup](/developers/docs/scaling/optimistic-rollups/).
- Yul+ можна розглядати як експериментальну пропозицію оновлення в Yul, додавши до нього нові властивості.

### Важливі посилання {#important-links-2}

- [Документація Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [Документація Yul+](https://github.com/fuellabs/yulp)
- [Вступна стаття про Yul+](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Приклад контракту {#example-contract-2}

Наступний простий приклад реалізує функцію живлення. Його можна скомпілювати за допомогою `solc --strict-assembly --bin input.yul`. Приклад повинен
зберігатись у файлі input.yul.

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

Якщо ви вже маєте значний досвід роботи зі смарт-контрактами, повну реалізацію ERC20 на Yul можна знайти [тут](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Статично типізована мова для Ethereum Virtual Machine (EVM).
- Натхненна Python та Rust.
- Прагне бути легкою для навчання - навіть для розробників, які є новачками в екосистемі Ethereum.
- Альфа-версія мови була випущена у січні 2021 року, коли розвиток Fe був ще на ранніх стадіях.

### Важливі посилання {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Анонс Fe](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [План розвитку Fe на 2021 рік](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Чат Fe у Discord](https://discord.com/invite/ywpkAXFjZH)
- [Fe у Twitter](https://twitter.com/official_fe)

### Приклад контракту {#example-contract-3}

Нижче наведено простий договір, реалізований у Фа.

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

## Як вибрати {#how-to-choose}

Як і у випадку з будь-якою іншою мовою програмування, головним чином йдеться про вибір відповідного інструменту для відповідної роботи, а також про особисті уподобання.

Ось декілька речей, які слід врахувати, якщо ви ще не спробували якісь з мов:

### Що хорошого в Solidity? {#solidity-advantages}

- Якщо ви початківець, існує багато уроків та засобів навчання. Більше про це можна дізнатися в розділі [Вивчайте за допомогою кодування](/developers/learning-tools/).
- Доступні хороші інструменти для розробників.
- Solidity має велике співтовариство розробників, що означає, що ви, швидше за все, знайдете відповіді на ваші запитання досить швидко.

### Що хорошого в Vyper? {#vyper-advatages}

- Чудовий шлях для розробників для створення Python, які хочуть написати смарт-контракти на Python.
- Vyper має меншу кількість функцій, що робить його чудовим для швидкого прототипу ідей.
- Випер має на меті бути легким для аудиторії та максимально читабельним для людей.

### Що хорошого в Yul та Yul+? {#yul-advantages}

- Спрощена і функціональна мова низького рівня.
- Дозволяє наблизитися до необробленого EVM, що може допомогти оптимізувати використання газу за вашими контрактами.

## Порівняння мов {#language-comparisons}

Для порівняння основного синтаксису, життєвого циклу контракту, інтерфейсів, операторів, структур даних, функцій, потоку керування та іншого, перегляньте цю [шпаргалку від Auditless](https://reference.auditless.com/cheatsheet/)

## Для подальшого читання {#further-reading}

- [Бібліотека контрактів Solidity від OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity в прикладах](https://solidity-by-example.org)
