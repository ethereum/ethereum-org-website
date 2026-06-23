---
title: "Анатомия смарт-контрактов"
description: "Подробный взгляд на анатомию смарт-контракта: функции, данные и переменные."
lang: ru
---

Смарт-контракт — это программа, которая выполняется по определенному адресу в Эфириуме. Они состоят из данных и функций, которые могут выполняться при получении транзакции. Вот обзор того, из чего состоит смарт-контракт.

## Предварительные требования {#prerequisites}

Сначала убедитесь, что вы прочитали про [смарт-контракты](/developers/docs/smart-contracts/). В этом документе предполагается, что вы уже знакомы с такими языками программирования, как JavaScript или Python.

## Данные {#data}

Любые данные контракта должны быть привязаны к определенному месту: либо к `storage`, либо к `memory`. Изменение хранилища в смарт-контракте обходится дорого, поэтому вам нужно тщательно продумать, где должны находиться ваши данные.

### Хранилище (Storage) {#storage}

Постоянные данные называются хранилищем и представлены переменными состояния. Эти значения постоянно хранятся в блокчейне. Вам нужно объявить тип, чтобы при компиляции контракт мог отслеживать, сколько места в хранилище блокчейна ему потребуется.

```solidity
// Пример на Solidity
contract SimpleStorage {
    uint storedData; // Переменная состояния
    // ...
}
```

```python
# Пример на Vyper
storedData: int128
```

Если вы уже программировали на объектно-ориентированных языках, вы, вероятно, знакомы с большинством типов. Однако тип `address` должен быть для вас новым, если вы новичок в разработке для [Эфириума](/).

Тип `address` может содержать адрес Эфириума, который равен 20 байтам или 160 битам. Он возвращается в шестнадцатеричном формате с префиксом 0x.

Другие типы включают:

- логический тип (boolean)
- целые числа (integer)
- числа с фиксированной запятой (fixed point numbers)
- массивы байтов фиксированного размера (fixed-size byte arrays)
- массивы байтов динамического размера (dynamically sized byte arrays)
- рациональные и целочисленные литералы (rational and integer literals)
- строковые литералы (string literals)
- шестнадцатеричные литералы (hexadecimal literals)
- перечисления (enums)

Для получения дополнительных объяснений загляните в документацию:

- [Смотреть типы Vyper](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Смотреть типы Solidity](https://docs.soliditylang.org/en/latest/types.html#value-types)

### Память (Memory) {#memory}

Значения, которые хранятся только во время выполнения функции контракта, называются переменными памяти. Поскольку они не хранятся в блокчейне постоянно, их использование обходится гораздо дешевле.

Узнайте больше о том, как виртуальная машина Эфириума (EVM) хранит данные (хранилище, память и стек), в [документации Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack).

### Переменные среды {#environment-variables}

В дополнение к переменным, которые вы определяете в своем контракте, существуют некоторые специальные глобальные переменные. В основном они используются для предоставления информации о блокчейне или текущей транзакции.

Примеры:

| **Свойство** | **Переменная состояния** | **Описание** |
| ----------------- | ------------------ | ------------------------------------ |
| `block.timestamp` | uint256 | Временная метка эпохи текущего блока |
| `msg.sender` | address | Отправитель сообщения (текущий вызов) |

## Функции {#functions}

Проще говоря, функции могут получать или устанавливать информацию в ответ на входящие транзакции.

Существует два типа вызовов функций:

- `internal` — они не создают вызов EVM
  - Внутренние функции и переменные состояния могут быть доступны только изнутри (т. е. из текущего контракта или контрактов, производных от него)
- `external` — они создают вызов EVM
  - Внешние функции являются частью интерфейса контракта, что означает, что они могут быть вызваны из других контрактов и через транзакции. Внешняя функция `f` не может быть вызвана изнутри (т. е. `f()` не работает, но `this.f()` работает).

Они также могут быть `public` или `private`

- Функции `public` могут быть вызваны изнутри контракта или извне через сообщения
- Функции `private` видны только для контракта, в котором они определены, и не видны в производных контрактах

Как функции, так и переменные состояния могут быть сделаны публичными (public) или приватными (private)

Вот функция для обновления переменной состояния в контракте:

```solidity
// Пример на Solidity
function update_name(string value) public {
    dapp_name = value;
}
```

- Параметр `value` типа `string` передается в функцию: `update_name`
- Она объявлена как `public`, что означает, что любой может получить к ней доступ
- Она не объявлена как `view`, поэтому она может изменять состояние контракта

### Функции просмотра (View) {#view-functions}

Эти функции обещают не изменять состояние данных контракта. Типичными примерами являются функции-геттеры (getter) — вы можете использовать их, например, для получения баланса пользователя.

```solidity
// Пример на Solidity
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

Что считается изменением состояния:

1. Запись в переменные состояния.
2. [Генерация событий](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [Создание других контрактов](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. Использование `selfdestruct`.
5. Отправка эфира через вызовы.
6. Вызов любой функции, не помеченной как `view` или `pure`.
7. Использование низкоуровневых вызовов.
8. Использование встроенного ассемблера, содержащего определенные коды операций (opcodes).

### Функции-конструкторы {#constructor-functions}

Функции `constructor` выполняются только один раз при первом развертывании контракта. Как и `constructor` во многих объектно-ориентированных языках программирования, эти функции часто инициализируют переменные состояния заданными значениями.

```solidity
// Пример на Solidity
// Инициализирует данные контракта, устанавливая `owner`
// на адрес создателя контракта.
constructor() public {
    // Все смарт-контракты полагаются на внешние транзакции для вызова своих функций.
    // `msg` — это глобальная переменная, которая содержит соответствующие данные о данной транзакции,
    // такие как адрес отправителя и сумма ETH, включенная в транзакцию.
    // Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Пример на Vyper

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### Встроенные функции {#built-in-functions}

В дополнение к переменным и функциям, которые вы определяете в своем контракте, существуют некоторые специальные встроенные функции. Самый очевидный пример:

- `address.send()` — Solidity
- `send(address)` — Vyper

Они позволяют контрактам отправлять ETH на другие аккаунты.

## Написание функций {#writing-functions}

Вашей функции нужны:

- переменная параметра и тип (если она принимает параметры)
- объявление internal/external
- объявление pure/view/payable
- тип возвращаемого значения (если она возвращает значение)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // переменная состояния

    // Вызывается, когда контракт развернут, и инициализирует значение
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Функция Get
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Функция Set
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

Полный контракт может выглядеть примерно так. Здесь функция `constructor` предоставляет начальное значение для переменной `dapp_name`.

## События и логи {#events-and-logs}

События позволяют вашему смарт-контракту взаимодействовать с вашим фронтендом или другими подписанными приложениями. Как только транзакция подтверждена и добавлена в блок, смарт-контракты могут генерировать события и логировать информацию, которую фронтенд затем может обрабатывать и использовать.

## Примеры с аннотациями {#annotated-examples}

Вот несколько примеров, написанных на Solidity. Если вы хотите поэкспериментировать с кодом, вы можете взаимодействовать с ними в [Remix](https://remix.ethereum.org).

### Hello world {#hello-world}

```solidity
// Указывает версию Solidity, используя семантическое версионирование.
// Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Определяет контракт с именем `HelloWorld`.
// Контракт — это набор функций и данных (его состояние).
// После того как контракт развернут, он находится по определенному адресу в Блокчейне Эфириум.
// Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Объявляет переменную состояния `message` типа `string`.
    // Переменные состояния — это переменные, значения которых постоянно хранятся в хранилище контракта.
    // Ключевое слово `public` делает переменные доступными извне контракта
    // и создает функцию, которую другие контракты или клиенты могут вызывать для доступа к значению.
    string public message;

    // Подобно многим объектно-ориентированным языкам на основе классов, конструктор — это
    // специальная функция, которая выполняется только при создании контракта.
    // Конструкторы используются для инициализации данных контракта.
    // Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Принимает строковый аргумент `initMessage` и устанавливает значение
        // в переменную хранилища `message` контракта).
        message = initMessage;
    }

    // Публичная функция, которая принимает строковый аргумент
    // и обновляет переменную хранилища `message`.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### Токен {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // `address` (адрес) сравним с адресом электронной почты — он используется для идентификации аккаунта в Эфириум.
    // Адреса могут представлять смарт-контракт или внешние (пользовательские) аккаунты.
    // Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // `mapping` — это, по сути, структура данных хеш-таблицы.
    // Этот `mapping` назначает беззнаковое целое число (баланс токенов) адресу (владельцу токена).
    // Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // События позволяют вести лог активности в Блокчейне.
    // Клиенты Эфириум могут прослушивать события, чтобы реагировать на изменения состояния контракта.
    // Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Инициализирует данные контракта, устанавливая `owner`
    // на адрес создателя контракта.
    constructor() public {
        // Все смарт-контракты полагаются на внешние транзакции для вызова своих функций.
        // `msg` — это глобальная переменная, которая содержит соответствующие данные о данной транзакции,
        // такие как адрес отправителя и сумма ETH, включенная в транзакцию.
        // Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Создает определенное количество новых токенов и отправляет их на адрес.
    function mint(address receiver, uint amount) public {
        // `require` — это управляющая конструкция, используемая для принудительного выполнения определенных условий.
        // Если выражение `require` вычисляется как `false`, вызывается исключение,
        // которое отменяет все изменения, внесенные в состояние во время текущего вызова.
        // Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Только владелец контракта может вызывать эту функцию
        require(msg.sender == owner, "You are not the owner.");

        // Обеспечивает соблюдение максимального количества токенов
        require(amount < 1e60, "Maximum issuance exceeded");

        // Увеличивает баланс `receiver` на `amount`
        balances[receiver] += amount;
    }

    // Отправляет определенное количество существующих токенов от любого вызывающего на адрес.
    function transfer(address receiver, uint amount) public {
        // У отправителя должно быть достаточно токенов для отправки
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // Корректирует балансы токенов двух адресов
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Генерирует событие, определенное ранее
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### Уникальный цифровой актив {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// Импортирует символы из других файлов в текущий контракт.
// В данном случае — ряд вспомогательных контрактов из OpenZeppelin.
// Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// Ключевое слово `is` используется для наследования функций и ключевых слов от внешних контрактов.
// В данном случае `CryptoPizza` наследует контракты `IERC721` и `ERC165`.
// Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Использует библиотеку SafeMath от OpenZeppelin для безопасного выполнения арифметических операций.
    // Узнать больше: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Константные переменные состояния в Solidity похожи на другие языки,
    // но вы должны присваивать им значения из выражения, которое является константой во время компиляции.
    // Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Типы структур (Struct) позволяют вам определять свой собственный тип
    // Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Создает пустой массив структур Pizza
    Pizza[] public pizzas;

    // Отображение (mapping) ID пиццы на адрес ее владельца
    mapping(uint256 => address) public pizzaToOwner;

    // Отображение (mapping) адреса владельца на количество принадлежащих ему токенов
    mapping(address => uint256) public ownerPizzaCount;

    // Отображение (mapping) ID токена на одобренный адрес
    mapping(uint256 => address) pizzaApprovals;

    // Вы можете вкладывать отображения (mappings), этот пример отображает владельца на одобрения оператора
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Внутренняя функция для создания случайной Pizza из строки (имени) и ДНК
    function _createPizza(string memory _name, uint256 _dna)
        // Ключевое слово `internal` означает, что эта функция видима только
        // внутри этого контракта и контрактов, которые наследуют этот контракт
        // Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` — это модификатор функции, который проверяет, существует ли уже пицца
        // Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Добавляет Pizza в массив Pizzas и получает id
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Проверяет, что владелец Pizza совпадает с текущим пользователем
        // Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // обратите внимание, что address(0) — это нулевой адрес,
        // указывающий на то, что pizza[id] еще не выделена конкретному пользователю.

        assert(pizzaToOwner[id] == address(0));

        // Отображает Pizza на владельца
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Создает случайную Pizza из строки (имени)
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Генерирует случайную ДНК из строки (имени) и адреса владельца (создателя)
    function generateRandomDna(string memory _str, address _owner)
        public
        // Функции, помеченные как `pure`, обещают не читать и не изменять состояние
        // Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Генерирует случайный uint из строки (имени) + адреса (владельца)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Возвращает массив Pizzas, найденных по владельцу
    function getPizzasByOwner(address _owner)
        public
        // Функции, помеченные как `view`, обещают не изменять состояние
        // Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Использует местоположение хранилища `memory` для хранения значений только на время
        // жизненного цикла вызова этой функции.
        // Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
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

    // Передает Pizza и право собственности на другой адрес
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Генерирует событие, определенное в импортированном контракте IERC721
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Безопасно передает право собственности на данный ID токена на другой адрес
     * Если целевой адрес является контрактом, он должен реализовывать `onERC721Received`,
     * который вызывается при безопасной передаче и возвращает магическое значение
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * в противном случае передача отменяется.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * Безопасно передает право собственности на данный ID токена на другой адрес
     * Если целевой адрес является контрактом, он должен реализовывать `onERC721Received`,
     * который вызывается при безопасной передаче и возвращает магическое значение
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * в противном случае передача отменяется.
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
     * Внутренняя функция для вызова `onERC721Received` на целевом адресе
     * Вызов не выполняется, если целевой адрес не является контрактом
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

    // Сжигает Pizza — полностью уничтожает токен
    // Модификатор функции `external` означает, что эта функция является
    // частью интерфейса контракта, и другие контракты могут ее вызывать
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

    // Возвращает количество Pizzas по адресу
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Возвращает владельца Pizza, найденной по id
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // Одобряет другой адрес для передачи права собственности на Pizza
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Возвращает одобренный адрес для конкретной Pizza
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Приватная функция для очистки текущего одобрения данного ID токена
     * Отменяет транзакцию, если данный адрес на самом деле не является владельцем токена
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Устанавливает или снимает одобрение данного оператора
     * Оператору разрешено передавать все токены отправителя от его имени
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Сообщает, одобрен ли оператор данным владельцем
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Принимает право собственности на Pizza — только для одобренных пользователей
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Проверяет, существует ли Pizza
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Проверяет, является ли адрес владельцем или одобрен ли он для передачи Pizza
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Отключает проверку solium из-за
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // Проверяет, уникальна ли Pizza и не существует ли она уже
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

    // Возвращает, является ли целевой адрес контрактом
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // В настоящее время нет лучшего способа проверить, есть ли контракт по адресу,
        // чем проверить размер кода по этому адресу.
        // Смотрите https://ethereum.stackexchange.com/a/14016/36603
        // для получения более подробной информации о том, как это работает.
        // TODO Проверить это снова перед релизом Serenity, потому что все адреса будут
        // контрактами тогда.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## Дополнительная литература {#further-reading}

Ознакомьтесь с документацией Solidity и Vyper для более полного обзора смарт-контрактов:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## Связанные темы {#related-topics}

- [Смарт-контракты](/developers/docs/smart-contracts/)
- [Виртуальная машина Эфириума](/developers/docs/evm/)

## Связанные руководства {#related-tutorials}

- [Уменьшение контрактов для борьбы с ограничением размера контракта](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _— Несколько практических советов по уменьшению размера вашего смарт-контракта._
- [Логирование данных из смарт-контрактов с помощью событий](/developers/tutorials/logging-events-smart-contracts/) _— Введение в события смарт-контрактов и то, как вы можете использовать их для логирования данных._
- [Взаимодействие с другими контрактами из Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _— Как развернуть смарт-контракт из существующего контракта и взаимодействовать с ним._