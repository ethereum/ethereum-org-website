---
title: "Докладніше про розумні контракти"
description: "Поглиблений аналіз деталізації розумного контакту - функції, дані та змінні."
lang: uk
---

Розумний контракт - це програма, що працює за адресою в Ethereum. Вони складаються з даних та функцій, які можуть виконуватися після отримання транзакції. Ось огляд того, що формує розумний контракт.

## Передумови {#prerequisites}

Переконайтеся, що ви спочатку прочитали про [смарт-контракти](/developers/docs/smart-contracts/). Цей документ передбачає, що ви вже знайомі з такими мовами програмування, як JavaScript чи Python.

## Дані {#data}

Будь-які дані контракту мають бути призначені до розташування: або в `сховище` (`storage`), або в `пам’ять` (`memory`). Варто змінити зберігання в розумному контракті, тож вам слід подумати, де повинні міститися ваші дані.

### Сховище {#storage}

Постійні дані називають сховищем та представлені змінними стану. Ці значення постійно зберігаються в блокчейні. Вам слід оголосити тип таким чином, щоб контракт міг відстежувати, скільки пам’яті в блокчейні йому потрібно під час компіляції.

```solidity
// Приклад на Solidity
contract SimpleStorage {
    uint storedData; // Змінна стану
    // ...
}
```

```python
# Приклад на Vyper
storedData: int128
```

Якщо ви вже запрограмували об'єктно-орієнтовані мови, ймовірно, ви знайомі з більшістю типів. Однак тип `address` буде для вас новим, якщо ви новачок у розробці на Ethereum.

Тип `address` може містити адресу Ethereum, що дорівнює 20 байтам або 160 бітам. Він повертається у шістнадцятковій системі запису з провідним 0x.

До інших типів належать:

- логічний
- цілий
- числа фіксованих точок
- байтові масиви фіксованого розміру
- масиви байтів динамічного розміру
- раціональні та цілочисельні літерали
- рядкові літерали
- шістнадцяткові літерали
- перелічення

Для додаткового пояснення зверніться до документів:

- [Переглянути типи Vyper](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Переглянути типи Solidity](https://docs.soliditylang.org/en/latest/types.html#value-types)

### Пам’ять {#memory}

Значення, які зберігаються лише протягом усього терміну виконання функції контракту, називаються змінними пам’яті. Оскільки вони не зберігаються у блокчейні назавжди, їх використання набагато дешевше.

Дізнайтеся більше про те, як EVM зберігає дані (сховище, пам’ять і стек) у [документації Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack).

### Змінні середовища {#environment-variables}

На додаток до змінних, які ви виділяєте у вашому контракті, є деякі особливі глобальні змінні. Насамперед, вони використовуються для надання інформації про блокчейн чи поточну транзакцію.

Приклади:

| **Властивість**   | **Змінна стану** | **Опис**                                                      |
| ----------------- | ---------------- | ------------------------------------------------------------- |
| `block.timestamp` | uint256          | Поточна часова позначка блоку                                 |
| `msg.sender`      | address          | Відправник повідомлення (поточний дзвінок) |

## Функції {#functions}

Простіше кажучи, функції можуть отримувати інформацію або задавати інформацію у відповідь на вхідні транзакції.

Існує два типу виклику функції:

- `internal` – вони не створюють виклик EVM
  - Внутрішні функції та змінні стану можуть бути доступні лише всередині (тобто з поточного контракту або контрактів, що є його похідними).
- `external` – вони створюють виклик EVM
  - Зовнішні функції є частиною інтерфейс договору, що означає, що їх можна викликати з інших договорів і за допомогою транзакцій. Зовнішню функцію `f` не можна викликати всередині (тобто виклик `f()` не спрацює, а `this.f()` спрацює).

Вони також можуть бути `public` або `private`

- Функції `public` можна викликати зсередини контракту або ззовні через повідомлення.
- Функції `private` видимі лише для контракту, у якому вони визначені, і не видимі для похідних контрактів.

Обидві функції і змінні стану можуть бути публічними чи приватними

Ось функція оновлення змінної стану за договором:

```solidity
// Приклад на Solidity
function update_name(string value) public {
    dapp_name = value;
}
```

- Параметр `value` типу `string` передається у функцію `update_name`.
- Її оголошено як `public`, тобто до неї може отримати доступ будь-хто.
- Її не оголошено як `view`, тому вона може змінювати стан контракту.

### Функції View {#view-functions}

Ці функції обіцяють не змінювати стан даних договору. Поширеними прикладами є функції "getter" – наприклад, ви можете використовувати її, щоб отримати баланс користувача.

```solidity
// Приклад на Solidity
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

Що вважається змінами стану:

1. Запис до змінних стану.
2. [Генерація подій](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [Створення інших контрактів](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. Використання `selfdestruct`.
5. Надсилання через дзвінки.
6. Виклик будь-якої функції, не позначеної як `view` або `pure`.
7. Використання дзвінків низького рівня.
8. Використовуючи вбудовану збірку, що містить деякі коди.

### Функції-конструктори {#constructor-functions}

Функції `constructor` виконуються лише один раз, під час першого розгортання контракту. Подібно до `constructor` у багатьох об’єктно-орієнтованих мовах програмування, ці функції часто ініціалізують змінні стану, присвоюючи їм зазначені значення.

```solidity
// Приклад на Solidity
// Ініціалізує дані контракту, встановлюючи `owner`
// як адресу автора контракту.
constructor() public {
    // Усі смарт-контракти покладаються на зовнішні транзакції для запуску своїх функцій.
    // `msg` — це глобальна змінна, яка містить відповідні дані про дану транзакцію,
    // наприклад адресу відправника та суму ETH, включену до транзакції.
    // Дізнайтеся більше: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Приклад на Vyper

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### Вбудовані функції {#built-in-functions}

На додаток до змінних та функцій, які ви визначаєте у вашому договорі, є ще деякі спеціальні вбудовані функції. Найбільш наочний приклад:

- `address.send()` – Solidity
- `send(address)` – Vyper

Вони дозволяють договорам відправляти ETH на інші облікові записи.

## Написання функцій {#writing-functions}

Потреби функцій:

- змінна параметра та тип (якщо він приймає параметри)
- оголошення внутрішнього/зовнішньої
- оголошення чистий/перегляд/платний
- тип повернення (якщо повертає значення)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // змінна стану

    // Викликається під час розгортання контракту та ініціалізує значення
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

## Події та журнали {#events-and-logs}

Події дають змогу вашому смарт-контракту обмінюватися даними з інтерфейсом або іншими підписаними застосунками. Після того, як транзакція буде підтверджена та додана до блоку, смарт-контракти можуть генерувати події та реєструвати інформацію, яку фронтенд може потім обробити та використати.

## Приклади з коментарями {#annotated-examples}

Деякі приклади написані в Solidity. Якщо ви хочете поекспериментувати з кодом, ви можете взаємодіяти з ним у [Remix](http://remix.ethereum.org).

### Привіт, світе {#hello-world}

```solidity
// Вказує версію Solidity, використовуючи семантичне версіонування.
// Дізнайтеся більше: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Оголошує контракт під назвою `HelloWorld`.
// Контракт — це набір функцій і даних (його стан).
// Після розгортання контракт знаходиться за певною адресою в блокчейні Ethereum.
// Дізнайтеся більше: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Оголошує змінну стану `message` типу `string`.
    // Змінні стану — це змінні, значення яких постійно зберігаються у сховищі контракту.
    // Ключове слово `public` робить змінні доступними ззовні контракту
    // і створює функцію, яку інші контракти або клієнти можуть викликати для доступу до значення.
    string public message;

    // Подібно до багатьох об'єктно-орієнтованих мов, конструктор — це
    // спеціальна функція, яка виконується лише під час створення контракту.
    // Конструктори використовуються для ініціалізації даних контракту.
    // Дізнайтеся більше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Приймає рядковий аргумент `initMessage` і встановлює значення
        // у змінну `message` у сховищі контракту).
        message = initMessage;
    }

    // Публічна функція, яка приймає рядковий аргумент
    // і оновлює змінну `message` у сховищі.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### Токен {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // `address` можна порівняти з адресою електронної пошти — він використовується для ідентифікації облікового запису в Ethereum.
    // Адреси можуть представляти смарт-контракт або зовнішні (користувацькі) облікові записи.
    // Дізнайтеся більше: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // `mapping` по суті є структурою даних хеш-таблиці.
    // Це `mapping` присвоює беззнакове ціле число (баланс токенів) адресі (власнику токенів).
    // Дізнайтеся більше: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Події дозволяють реєструвати активність у блокчейні.
    // Клієнти Ethereum можуть прослуховувати події, щоб реагувати на зміни стану контракту.
    // Дізнайтеся більше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Ініціалізує дані контракту, встановлюючи `owner`
    // як адресу автора контракту.
    constructor() public {
        // Усі смарт-контракти покладаються на зовнішні транзакції для запуску своїх функцій.
        // `msg` — це глобальна змінна, яка містить відповідні дані про дану транзакцію,
        // наприклад адресу відправника та суму ETH, включену до транзакції.
        // Дізнайтеся більше: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Створює певну кількість нових токенів і надсилає їх на адресу.
    function mint(address receiver, uint amount) public {
        // `require` — це керуюча конструкція, яка використовується для забезпечення виконання певних умов.
        // Якщо вираз `require` має значення `false`, виникає виняток,
        // який скасовує всі зміни, внесені до стану під час поточного виклику.
        // Дізнайтеся більше: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Лише власник контракту може викликати цю функцію
        require(msg.sender == owner, "You are not the owner.");

        // Встановлює максимальну кількість токенів
        require(amount < 1e60, "Maximum issuance exceeded");

        // Збільшує баланс `receiver` на `amount`
        balances[receiver] += amount;
    }

    // Надсилає певну кількість існуючих токенів від будь-якого викликаючого на адресу.
    function transfer(address receiver, uint amount) public {
        // Відправник повинен мати достатньо токенів для надсилання
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
// У цьому випадку це серія допоміжних контрактів від OpenZeppelin.
// Дізнайтеся більше: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// Ключове слово `is` використовується для успадкування функцій і ключових слів від зовнішніх контрактів.
// У цьому випадку `CryptoPizza` успадковує контракти `IERC721` та `ERC165`.
// Дізнайтеся більше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Використовує бібліотеку SafeMath від OpenZeppelin для безпечного виконання арифметичних операцій.
    // Дізнайтеся більше: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Константи-змінні стану в Solidity схожі на інші мови,
    // але ви повинні присвоювати їм значення з виразу, який є константою на етапі компіляції.
    // Дізнайтеся більше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Типи Struct дозволяють вам визначати власний тип
    // Дізнайтеся більше: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Створює порожній масив структур Pizza
    Pizza[] public pizzas;

    // Відображення ідентифікатора піци на адресу її власника
    mapping(uint256 => address) public pizzaToOwner;

    // Відображення адреси власника на кількість токенів у власності
    mapping(address => uint256) public ownerPizzaCount;

    // Відображення ідентифікатора токена на затверджену адресу
    mapping(uint256 => address) pizzaApprovals;

    // Ви можете вкладати відображення, цей приклад відображає власника на затвердження оператора
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Внутрішня функція для створення випадкової піци з рядка (назва) та ДНК
    function _createPizza(string memory _name, uint256 _dna)
        // Ключове слово `internal` означає, що ця функція видима лише
        // в межах цього контракту та контрактів, що походять від нього
        // Дізнайтеся більше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` — це модифікатор функції, який перевіряє, чи піца вже існує
        // Дізнайтеся більше: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Додає піцу до масиву піц і отримує id
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Перевіряє, чи власник піци такий самий, як і поточний користувач
        // Дізнайтеся більше: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // зауважте, що address(0) — це нульова адреса,
        // що вказує на те, що pizza[id] ще не призначена конкретному користувачеві.

        assert(pizzaToOwner[id] == address(0));

        // Відображає піцу на власника
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Створює випадкову піцу з рядка (назва)
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Генерує випадкову ДНК з рядка (назва) та адреси власника (автора)
    function generateRandomDna(string memory _str, address _owner)
        public
        // Функції, позначені як `pure`, обіцяють не читати та не змінювати стан
        // Дізнайтеся більше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Генерує випадковий uint з рядка (назва) + адреси (власник)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Повертає масив піц, знайдених за власником
    function getPizzasByOwner(address _owner)
        public
        // Функції, позначені як `view`, обіцяють не змінювати стан
        // Дізнайтеся більше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Використовує місце зберігання `memory` для збереження значень лише на
        // час життєвого циклу цього виклику функції.
        // Дізнайтеся більше: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
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

    // Передає піцу та право власності на іншу адресу
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
     * Безпечно передає право власності на даний ідентифікатор токена на іншу адресу
     * Якщо цільова адреса є контрактом, вона повинна реалізовувати `onERC721Received`,
     * яка викликається під час безпечної передачі, і повертати магічне значення
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
     * Безпечно передає право власності на даний ідентифікатор токена на іншу адресу
     * Якщо цільова адреса є контрактом, вона повинна реалізовувати `onERC721Received`,
     * яка викликається під час безпечної передачі, і повертати магічне значення
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

    // Спалює піцу — повністю знищує токен
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

    // Повертає кількість піц за адресою
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Повертає власника піци, знайденого за id
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // Дозволяє іншій адресі передавати право власності на піцу
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Повертає затверджену адресу для конкретної піци
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Приватна функція для скасування поточного затвердження для даного ідентифікатора токена
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
     * Встановлює або скасовує затвердження для даного оператора
     * Оператору дозволено передавати всі токени відправника від його імені
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Повідомляє, чи затверджений оператор даним власником
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Приймає право власності на піцу — тільки для затверджених користувачів
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Перевіряє, чи існує піца
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Перевіряє, чи є адреса власником, чи затверджена для передачі піци
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

    // Перевіряє, чи піца є унікальною та ще не існує
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
        // для отримання більш детальної інформації про те, як це працює.
        // TODO Перевірити це ще раз перед випуском Serenity, оскільки тоді всі адреси будуть
        // контрактами.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## Для подальшого читання {#further-reading}

Перевірте документацію Solidity і Vyper's для більш повного огляду смарт-контрактів:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## Пов'язані теми {#related-topics}

- [Смарт-контракти](/developers/docs/smart-contracts/)
- [Віртуальна машина Ethereum](/developers/docs/evm/)

## Пов'язані посібники {#related-tutorials}

- [Зменшення розміру контрактів для боротьби з обмеженням розміру контракту](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Декілька практичних порад щодо зменшення розміру вашого смарт-контракту._
- [Запис даних зі смарт-контрактів за допомогою подій](/developers/tutorials/logging-events-smart-contracts/) _– Вступ до подій у смарт-контрактах і як їх можна використовувати для запису даних._
- [Взаємодія з іншими контрактами з Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Як розгорнути смарт-контракт з існуючого контракту та взаємодіяти з ним._
