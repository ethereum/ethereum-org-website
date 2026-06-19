---
title: Анатомія смарт-контрактів
description: Детальний огляд анатомії смарт-контракту — функцій, даних та змінних.
lang: uk
---

Смарт-контракт — це програма, яка працює за певною адресою в мережі Етеріум. Вони складаються з даних і функцій, які можуть виконуватися після отримання транзакції. Ось огляд того, з чого складається смарт-контракт.

## Передумови {#prerequisites}

Спочатку переконайтеся, що ви прочитали про [смарт-контракти](/developers/docs/smart-contracts/). Цей документ передбачає, що ви вже знайомі з такими мовами програмування, як JavaScript або Python.

## Дані {#data}

Будь-які дані контракту мають бути призначені до певного місця: до `storage` або `memory`. Змінювати сховище в смарт-контракті дорого, тому вам потрібно ретельно обміркувати, де мають зберігатися ваші дані.

### Сховище {#storage}

Постійні дані називаються сховищем і представлені змінними стану. Ці значення зберігаються в блокчейні назавжди. Вам потрібно оголосити тип, щоб під час компіляції контракт міг відстежувати, скільки місця в сховищі блокчейну йому потрібно.

```solidity
// Приклад Solidity
contract SimpleStorage {
    uint storedData; // Змінна стану
    // ...
}
```

```python
# Приклад Vyper
storedData: int128
```

Якщо ви вже програмували об'єктно-орієнтованими мовами, ви, ймовірно, знайомі з більшістю типів. Однак тип `address` буде для вас новим, якщо ви новачок у розробці для [Етеріуму](/).

Тип `address` може містити адресу Етеріуму, яка дорівнює 20 байтам або 160 бітам. Вона повертається в шістнадцятковому форматі з префіксом 0x.

Інші типи включають:

- логічні значення (boolean)
- цілі числа (integer)
- числа з фіксованою комою
- масиви байтів фіксованого розміру
- масиви байтів динамічного розміру
- раціональні та цілочисельні літерали
- рядкові літерали
- шістнадцяткові літерали
- перелічення (enums)

Для детальнішого пояснення перегляньте документацію:

- [Переглянути типи Vyper](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Переглянути типи Solidity](https://docs.soliditylang.org/en/latest/types.html#value-types)

### Пам'ять {#memory}

Значення, які зберігаються лише протягом часу виконання функції контракту, називаються змінними пам'яті. Оскільки вони не зберігаються в блокчейні назавжди, їх використання обходиться значно дешевше.

Дізнайтеся більше про те, як віртуальна машина Етеріуму (EVM) зберігає дані (сховище, пам'ять і стек), у [документації Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack).

### Змінні середовища {#environment-variables}

Окрім змінних, які ви визначаєте у своєму контракті, існують спеціальні глобальні змінні. Вони переважно використовуються для надання інформації про блокчейн або поточну транзакцію.

Приклади:

| **Властивість**          | **Змінна стану** | **Опис**                      |
| ----------------- | ------------------ | ------------------------------------ |
| `block.timestamp` | uint256            | Часова мітка епохи поточного блоку        |
| `msg.sender`      | address            | Відправник повідомлення (поточного виклику) |

## Функції {#functions}

Найпростіше кажучи, функції можуть отримувати або встановлювати інформацію у відповідь на вхідні транзакції.

Існує два типи викликів функцій:

- `internal` — вони не створюють виклик EVM
  - Внутрішні функції та змінні стану доступні лише внутрішньо (тобто з поточного контракту або контрактів, що успадковуються від нього)
- `external` — вони створюють виклик EVM
  - Зовнішні функції є частиною інтерфейсу контракту, що означає, що їх можна викликати з інших контрактів та через транзакції. Зовнішню функцію `f` не можна викликати внутрішньо (тобто `f()` не працює, але `this.f()` працює).

Вони також можуть бути `public` або `private`

- Функції `public` можна викликати внутрішньо з самого контракту або зовні через повідомлення
- Функції `private` видимі лише для контракту, в якому вони визначені, і не видимі в похідних контрактах

Як функції, так і змінні стану можуть бути публічними (public) або приватними (private)

Ось функція для оновлення змінної стану в контракті:

```solidity
// Приклад Solidity
function update_name(string value) public {
    dapp_name = value;
}
```

- Параметр `value` типу `string` передається у функцію: `update_name`
- Вона оголошена як `public`, що означає, що будь-хто може отримати до неї доступ
- Вона не оголошена як `view`, тому може змінювати стан контракту

### Функції перегляду {#view-functions}

Ці функції гарантують, що не змінюватимуть стан даних контракту. Поширеними прикладами є функції-геттери (getter) — ви можете використовувати їх, наприклад, для отримання балансу користувача.

```solidity
// Приклад Solidity
function balanceOf(address _owner) public view returns (uint256 _balance) {
    return ownerPizzaCount[_owner];
}
```

```python
dappName: public(string)

@view
@public
def readName() -> string:
  return dappName
```

Що вважається зміною стану:

1. Запис у змінні стану.
2. [Генерування подій](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [Створення інших контрактів](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. Використання `selfdestruct`.
5. Відправлення етеру через виклики.
6. Виклик будь-якої функції, не позначеної як `view` або `pure`.
7. Використання низькорівневих викликів.
8. Використання вбудованого асемблера, який містить певні коди операцій (opcodes).

### Функції-конструктори {#constructor-functions}

Функції `constructor` виконуються лише один раз під час першого розгортання контракту. Як і `constructor` у багатьох об'єктно-орієнтованих мовах програмування, ці функції часто ініціалізують змінні стану їхніми заданими значеннями.

```solidity
// Приклад Solidity
// Ініціалізує дані контракту, встановлюючи `owner`
// на адресу творця контракту.
constructor() public {
    // Усі смарт-контракти покладаються на зовнішні транзакції для виклику своїх функцій.
    // `msg` — це глобальна змінна, яка містить відповідні дані про дану транзакцію,
    // такі як адреса відправника та сума ETH, включена в транзакцію.
    // Дізнатися більше: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Приклад Vyper

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### Вбудовані функції {#built-in-functions}

Окрім змінних і функцій, які ви визначаєте у своєму контракті, існують спеціальні вбудовані функції. Найочевидніший приклад:

- `address.send()` — Solidity
- `send(address)` — Vyper

Вони дозволяють контрактам надсилати ETH на інші акаунти.

## Написання функцій {#writing-functions}

Вашій функції потрібні:

- змінна параметра та тип (якщо вона приймає параметри)
- оголошення internal/external
- оголошення pure/view/payable
- тип повернення (якщо вона повертає значення)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // змінна стану

    // Викликається, коли контракт розгортається, та ініціалізує значення
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Функція Get
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Функція Set
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

Повний контракт може виглядати приблизно так. Тут функція `constructor` надає початкове значення для змінної `dapp_name`.

## Події та логи {#events-and-logs}

Події дозволяють вашому смарт-контракту взаємодіяти з фронтендом або іншими програмами, що підписані на них. Щойно транзакція перевіряється та додається в блок, смарт-контракти можуть генерувати події та логувати інформацію, яку фронтенд потім може обробляти та використовувати.

## Приклади з анотаціями {#annotated-examples}

Ось кілька прикладів, написаних мовою Solidity. Якщо ви хочете поекспериментувати з кодом, ви можете взаємодіяти з ними в [Remix](https://remix.ethereum.org).

### Hello world {#hello-world}

```solidity
// Вказує версію Solidity, використовуючи семантичне версіонування.
// Дізнатися більше: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Визначає контракт з іменем `HelloWorld`.
// Контракт — це набір функцій та даних (його стан).
// Після розгортання контракт знаходиться за певною адресою в блокчейні Етеріум.
// Дізнатися більше: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Оголошує змінну стану `message` типу `string`.
    // Змінні стану — це змінні, значення яких постійно зберігаються у сховищі контракту.
    // Ключове слово `public` робить змінні доступними ззовні контракту
    // і створює функцію, яку інші контракти або клієнти можуть викликати для доступу до значення.
    string public message;

    // Подібно до багатьох класових об'єктно-орієнтованих мов, конструктор — це
    // спеціальна функція, яка виконується лише під час створення контракту.
    // Конструктори використовуються для ініціалізації даних контракту.
    // Дізнатися більше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Приймає рядковий аргумент `initMessage` та встановлює значення
        // у змінну сховища контракту `message`).
        message = initMessage;
    }

    // Публічна функція, яка приймає рядковий аргумент
    // і оновлює змінну сховища `message`.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### Токен {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // Адресу (`address`) можна порівняти з адресою електронної пошти — вона використовується для ідентифікації облікового запису в Етеріум.
    // Адреси можуть представляти смарт-контракт або зовнішні (користувацькі) облікові записи.
    // Дізнатися більше: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // `mapping` — це, по суті, структура даних хеш-таблиці.
    // Цей `mapping` призначає беззнакове ціле число (баланс токенів) для адреси (власника токена).
    // Дізнатися більше: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Події дозволяють вести лог активності в блокчейні.
    // Клієнти Етеріум можуть прослуховувати події, щоб реагувати на зміни стану контракту.
    // Дізнатися більше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Ініціалізує дані контракту, встановлюючи `owner`
    // на адресу творця контракту.
    constructor() public {
        // Усі смарт-контракти покладаються на зовнішні транзакції для виклику своїх функцій.
        // `msg` — це глобальна змінна, яка містить відповідні дані про дану транзакцію,
        // такі як адреса відправника та сума ETH, включена в транзакцію.
        // Дізнатися більше: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Створює певну кількість нових токенів і надсилає їх на адресу.
    function mint(address receiver, uint amount) public {
        // `require` — це керуюча структура, яка використовується для забезпечення виконання певних умов.
        // Якщо вираз `require` обчислюється як `false`, викликається виняток,
        // який скасовує всі зміни, внесені до стану під час поточного виклику.
        // Дізнатися більше: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Тільки власник контракту може викликати цю функцію
        require(msg.sender == owner, "You are not the owner.");

        // Забезпечує максимальну кількість токенів
        require(amount < 1e60, "Maximum issuance exceeded");

        // Збільшує баланс `receiver` на `amount`
        balances[receiver] += amount;
    }

    // Надсилає певну кількість існуючих токенів від того, хто викликає, на адресу.
    function transfer(address receiver, uint amount) public {
        // Відправник повинен мати достатньо токенів для відправки
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // Коригує баланси токенів двох адрес
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Генерує подію, визначену раніше
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### Унікальний цифровий актив {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// Імпортує символи з інших файлів у поточний контракт.
// У цьому випадку — низку допоміжних контрактів від OpenZeppelin.
// Дізнатися більше: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// Ключове слово `is` використовується для успадкування функцій та ключових слів із зовнішніх контрактів.
// У цьому випадку `CryptoPizza` успадковує контракти `IERC721` та `ERC165`.
// Дізнатися більше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Використовує бібліотеку SafeMath від OpenZeppelin для безпечного виконання арифметичних операцій.
    // Дізнатися більше: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Константні змінні стану в Solidity схожі на інші мови
    // але ви повинні призначати їх з виразу, який є константою під час компіляції.
    // Дізнатися більше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Типи Struct дозволяють вам визначати власний тип
    // Дізнатися більше: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Створює порожній масив структур Pizza
    Pizza[] public pizzas;

    // Відображення ID піци на адресу її власника
    mapping(uint256 => address) public pizzaToOwner;

    // Відображення адреси власника на кількість токенів у власності
    mapping(address => uint256) public ownerPizzaCount;

    // Відображення ID токена на схвалену адресу
    mapping(uint256 => address) pizzaApprovals;

    // Ви можете вкладати відображення (mappings), цей приклад відображає власника на схвалення оператора
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Внутрішня функція для створення випадкової Pizza з рядка (name) та DNA
    function _createPizza(string memory _name, uint256 _dna)
        // Ключове слово `internal` означає, що ця функція видима лише
        // в межах цього контракту та контрактів, які успадковують цей контракт
        // Дізнатися більше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` — це модифікатор функції, який перевіряє, чи піца вже існує
        // Дізнатися більше: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Додає Pizza до масиву Pizzas та отримує id
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Перевіряє, що власник Pizza є тим самим, що й поточний користувач
        // Дізнатися більше: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // зверніть увагу, що address(0) — це нульова адреса,
        // що вказує на те, що pizza[id] ще не виділена конкретному користувачеві.

        assert(pizzaToOwner[id] == address(0));

        // Відображає Pizza на власника
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Створює випадкову Pizza з рядка (name)
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Генерує випадкову DNA з рядка (name) та адреси власника (творця)
    function generateRandomDna(string memory _str, address _owner)
        public
        // Функції, позначені як `pure`, обіцяють не читати та не змінювати стан
        // Дізнатися більше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Генерує випадковий uint з рядка (name) + адреси (owner)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Повертає масив Pizzas, знайдених за власником
    function getPizzasByOwner(address _owner)
        public
        // Функції, позначені як `view`, обіцяють не змінювати стан
        // Дізнатися більше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Використовує місце зберігання `memory` для зберігання значень лише протягом
        // життєвого циклу цього виклику функції.
        // Дізнатися більше: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
        uint256[] memory result = new uint256[](ownerPizzaCount[_owner]);
        uint256 counter = 0;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (pizzaToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    // Передає Pizza та право власності на іншу адресу
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Генерує подію, визначену в імпортованому контракті IERC721
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Безпечно передає право власності на заданий ID токена на іншу адресу
     * Якщо цільова адреса є контрактом, вона повинна реалізувати `onERC721Received`,
     * який викликається під час безпечної передачі, і повернути магічне значення
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * інакше передача скасовується.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * Безпечно передає право власності на заданий ID токена на іншу адресу
     * Якщо цільова адреса є контрактом, вона повинна реалізувати `onERC721Received`,
     * який викликається під час безпечної передачі, і повернути магічне значення
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * інакше передача скасовується.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Must implement onERC721Received.");
    }

    /**
     * Внутрішня функція для виклику `onERC721Received` на цільовій адресі
     * Виклик не виконується, якщо цільова адреса не є контрактом
     */
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) internal returns (bool) {
        if (!isContract(to)) {
            return true;
        }

        bytes4 retval = IERC721Receiver(to).onERC721Received(
            msg.sender,
            from,
            pizzaId,
            _data
        );
        return (retval == _ERC721_RECEIVED);
    }

    // Спалює Pizza — повністю знищує токен
    // Модифікатор функції `external` означає, що ця функція є
    // частиною інтерфейсу контракту, і інші контракти можуть її викликати
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[msg.sender] = SafeMath.sub(
            ownerPizzaCount[msg.sender],
            1
        );
        pizzaToOwner[_pizzaId] = address(0);
    }

    // Повертає кількість Pizzas за адресою
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Повертає власника Pizza, знайденої за id
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // Схвалює іншу адресу для передачі права власності на Pizza
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Повертає схвалену адресу для конкретної Pizza
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Приватна функція для очищення поточного схвалення заданого ID токена
     * Скасовується, якщо вказана адреса насправді не є власником токена
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Встановлює або скасовує схвалення заданого оператора
     * Оператору дозволяється передавати всі токени відправника від його імені
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Повідомляє, чи схвалений оператор заданим власником
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Бере на себе право власності на Pizza — лише для схвалених користувачів
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Перевіряє, чи існує Pizza
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Перевіряє, чи є адреса власником або чи схвалена вона для передачі Pizza
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Вимкнути перевірку solium через
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // Перевірити, чи є Pizza унікальною і чи ще не існує
    modifier isUnique(string memory _name, uint256 _dna) {
        bool result = true;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (
                keccak256(abi.encodePacked(pizzas[i].name)) ==
                keccak256(abi.encodePacked(_name)) &&
                pizzas[i].dna == _dna
            ) {
                result = false;
            }
        }
        require(result, "Pizza with such name already exists.");
        _;
    }

    // Повертає, чи є цільова адреса контрактом
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // Наразі немає кращого способу перевірити, чи є контракт за адресою,
        // ніж перевірити розмір коду за цією адресою.
        // Дивіться https://ethereum.stackexchange.com/a/14016/36603
        // для отримання додаткової інформації про те, як це працює.
        // TODO Перевірити це ще раз перед релізом Serenity, оскільки всі адреси будуть
        // контрактами тоді.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## Додаткові матеріали {#further-reading}

Перегляньте документацію Solidity та Vyper для повнішого огляду смарт-контрактів:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## Пов'язані теми {#related-topics}

- [Смарт-контракти](/developers/docs/smart-contracts/)
- [Віртуальна машина Етеріуму (EVM)](/developers/docs/evm/)

## Пов'язані посібники {#related-tutorials}

- [Зменшення розміру контрактів для боротьби з обмеженням розміру контракту](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _— Деякі практичні поради щодо зменшення розміру вашого смарт-контракту._
- [Логування даних зі смарт-контрактів за допомогою подій](/developers/tutorials/logging-events-smart-contracts/) _— Вступ до подій смарт-контрактів і того, як їх можна використовувати для логування даних._
- [Взаємодія з іншими контрактами з Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _— Як розгорнути смарт-контракт з існуючого контракту та взаємодіяти з ним._