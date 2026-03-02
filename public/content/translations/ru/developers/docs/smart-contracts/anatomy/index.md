---
title: "Подробнее о смарт-контрактах"
description: "Подробный обзор анатомии смарт-контракта – функции, данные и переменные."
lang: ru
---

Смарт-контракт - это программа, которая запускается на определенном адресе на Ethereum. Они состоят из данных и функций, которые могут выполняться при получении транзакции. Вот обзор того, что представляет из себя смарт-контракт.

## Предварительные условия {#prerequisites}

Сначала убедитесь, что вы прочитали о [смарт-контрактах](/developers/docs/smart-contracts/). Эта статья предполагает, что вы уже знакомы с языками программирования, такими как JavaScript или Python.

## Данные {#data}

Любые данные контракта должны быть присвоены местоположению: либо `storage`, либо `memory`. Модифицировать хранилище в смарт контракте - дорогостоящая операция, поэтому вам необходимо подумать заранее, где ваши данные должны храниться.

### Хранилища {#storage}

Постоянные данные называются хранилищем и представлены переменными состояния. Эти значения постоянно хранятся в блокчейне. Вам необходимо объявить тип, чтобы контракт мог отслеживать, сколько пространства в блокчейне ему потребуется при компиляции.

```solidity
// Пример Solidity
contract SimpleStorage {
    uint storedData; // Переменная состояния
    // ...
}
```

```python
Пример на Vyper
```

Если вы уже программировали объектно-ориентированные языки, то вы, скорее всего, будете знакомы с большинством типов. Однако, `address` может быть для вас в новинку, если вы новичок в разработке на Ethereum.

Тип `address` может содержать адрес Ethereum, который равен 20 байтам или 160 битам. Он возвращается в шестнадцатеричной нотации с лидирующим значением 0x.

Другие типы включают:

- логический
- целое число
- числа с фиксированной точкой
- байтовые массивы фиксированного размера
- массивы байтов динамического размера
- рациональные и целочисленные литералы
- строковые литералы
- шестнадцатеричные литералы
- перечисления

Для более подробного объяснения, ознакомьтесь с документацией:

- [Смотрите типы Vyper](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Смотрите типы Solidity](https://docs.soliditylang.org/en/latest/types.html#value-types)

### Память {#memory}

Значения, которые хранятся только на время выполнения контрактной функции, называются переменными памяти. Поскольку они не хранятся постоянно в блокчейне, их использование намного дешевле.

Узнайте больше о том, как EVM хранит данные (хранилище, память и стек) в [документации Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack).

### Переменные среды {#environment-variables}

В дополнение к переменным, которые вы определяете по вашему контракту, есть некоторые специальные глобальные переменные. Они в основном используются для предоставления информации о блокчейне или текущей транзакции.

Примеры:

| **Свойство**      | **Переменная состояния** | **Описание**                                             |
| ----------------- | ------------------------ | -------------------------------------------------------- |
| `block.timestamp` | uint256                  | Текущая метка времени начала блоков                      |
| `msg.sender`      | адрес                    | Отправитель сообщения (текущий вызов) |

## Функции {#functions}

В наиболее упрощенных терминах функции могут получать информацию или устанавливать информацию в ответ на входящие транзакции.

Существует два типа вызовов функций:

- `internal` – не создают вызов EVM
  - К внутренним функциям и переменным состояния можно получить доступ только изнутри (т. е. из текущего контракта или контрактов, производных от него)
- `external` – создают вызов EVM
  - Внешние функции являются частью контрактного интерфейса, что означает, что они могут быть вызваны из других контрактов и через сделки. Внешняя функция `f` не может быть вызвана внутренне (т. е. `f()` не работает, но `this.f()` работает).

Они также могут быть `public` или `private`

- Функции `public` можно вызывать внутренне из контракта или внешне с помощью сообщений
- Функции `private` видны только для контракта, в котором они определены, и не видны в производных контрактах

Функции и переменные состояний могут быть общедоступными или частными

Вот функция обновления переменной состояния по контракту:

```solidity
// Пример солидарности
function update_name(string value) public {
    dapp_name = value;
}
```

- Параметр `value` типа `string` передается в функцию: `update_name`
- Она объявлена как `public`, что означает, что любой может получить к ней доступ
- Она не объявлена как `view`, поэтому может изменять состояние контракта

### Функции просмотра {#view-functions}

Эти функции обещают не изменять состояние данных контракта. Типичными примерами являются функции "получения" - вы можете использовать их, например, для получения баланса пользователя.

```solidity
// Пример твердости
функция balanceOf (address _owner) в публичном представлении возвращает (uint256 _balance) {
     вернуть ownerPizzaCount [_owner];
}
```

```python
dappName: public(string)

@view
@public
def readName() -> string:
  return dappName
```

Что считается измененным состоянием:

1. Запись переменных состояний.
2. [Генерирование событий](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [Создание других контрактов](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. Использование `selfdestruct`.
5. Отправка эфира через вызовы.
6. Вызов любой функции, не отмеченной как `view` или `pure`.
7. Использование низкоуровневых вызовов.
8. Используя встроенную сборку, которая содержит некоторые опкоды.

### Функции конструктора {#constructor-functions}

Функции `constructor` выполняются только один раз при первом развертывании контракта. Подобно `constructor` во многих объектно-ориентированных языках программирования, эти функции часто инициализируют переменные состояния их заданными значениями.

```solidity
// Пример на Solidity
// Инициализирует данные контракта, устанавливая `owner`
// в качестве адреса создателя контракта.
constructor() public {
    // Все смарт-контракты полагаются на внешние транзакции для запуска своих функций.
    // `msg` — это глобальная переменная, которая содержит актуальные данные о данной транзакции,
    // такие как адрес отправителя и значение ETH, включенное в транзакцию.
    // Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Vyper example

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### Встроенные функции {#built-in-functions}

В дополнение к переменным и функциям, которые вы определяете в своем контракте, есть несколько специальных встроенных функций. Самый очевидный пример:

- `address.send()` – Solidity
- `send(address)` – Vyper

Это позволяет контрактам отправлять ETH на другие учетные записи.

## Написание функций {#writing-functions}

Ваша функция требует:

- переменная параметра и тип (если он принимает параметры)
- декларация внутреннего / внешнего
- декларация о чистом / просмотре / к оплате
- возвращает тип (если возвращает значение)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // переменная состояния

    // Вызывается при развертывании контракта и инициализирует значение
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Функция получения
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Функция установки
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

Полный контракт может выглядеть примерно так. Здесь функция `constructor` задает начальное значение для переменной `dapp_name`.

## События и журналы {#events-and-logs}

События позволяют вашему смарт-контракту взаимодействовать с вашим внешним интерфейсом или другими подписанными приложениями. После того, как транзакция проверена и добавлена в блок, смарт-контракты могут генерировать события и регистрировать информацию, которую внешний интерфейс затем может обрабатывать и использовать.

## Примеры с комментариями {#annotated-examples}

Это несколько примеров, написанных на Solidity. Если вы хотите поэкспериментировать с кодом, вы можете взаимодействовать с ним в [Remix](http://remix.ethereum.org).

### Hello world {#hello-world}

```solidity
// Указывает версию Solidity, используя семантическое версионирование.
// Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Определяет контракт с именем `HelloWorld`.
// Контракт — это набор функций и данных (его состояние).
// После развертывания контракт находится по определенному адресу в блокчейне Ethereum.
// Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Объявляет переменную состояния `message` типа `string`.
    // Переменные состояния — это переменные, значения которых постоянно хранятся в хранилище контракта.
    // Ключевое слово `public` делает переменные доступными извне контракта
    // и создает функцию, которую могут вызывать другие контракты или клиенты для доступа к значению.
    string public message;

    // Подобно многим объектно-ориентированным языкам, конструктор — это
    // специальная функция, которая выполняется только при создании контракта.
    // Конструкторы используются для инициализации данных контракта.
    // Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Принимает строковый аргумент `initMessage` и устанавливает его значение
        // в переменную хранилища контракта `message`).
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
    // `address` можно сравнить с адресом электронной почты — он используется для идентификации аккаунта в Ethereum.
    // Адреса могут представлять смарт-контракт или внешние (пользовательские) аккаунты.
    // Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // `mapping` — это, по сути, структура данных хеш-таблицы.
    // Этот `mapping` присваивает беззнаковое целое число (баланс токенов) адресу (владельцу токенов).
    // Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // События позволяют регистрировать активность в блокчейне.
    // Клиенты Ethereum могут прослушивать события, чтобы реагировать на изменения состояния контракта.
    // Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Инициализирует данные контракта, устанавливая `owner`
    // в качестве адреса создателя контракта.
    constructor() public {
        // Все смарт-контракты полагаются на внешние транзакции для запуска своих функций.
        // `msg` — это глобальная переменная, которая содержит актуальные данные о данной транзакции,
        // такие как адрес отправителя и значение ETH, включенное в транзакцию.
        // Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Создает определенное количество новых токенов и отправляет их на адрес.
    function mint(address receiver, uint amount) public {
        // `require` — это управляющая структура, используемая для обеспечения выполнения определенных условий.
        // Если выражение `require` оценивается как `false`, вызывается исключение,
        // которое отменяет все изменения, внесенные в состояние во время текущего вызова.
        // Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Только владелец контракта может вызывать эту функцию
        require(msg.sender == owner, "You are not the owner.");

        // Применяет максимальное количество токенов
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
// В данном случае — серия вспомогательных контрактов из OpenZeppelin.
// Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// Ключевое слово `is` используется для наследования функций и ключевых слов из внешних контрактов.
// В этом случае `CryptoPizza` наследует от контрактов `IERC721` и `ERC165`.
// Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Использует библиотеку SafeMath из OpenZeppelin для безопасного выполнения арифметических операций.
    // Узнать больше: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Константные переменные состояния в Solidity похожи на другие языки,
    // но вы должны присваивать их из выражения, которое является константой во время компиляции.
    // Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Типы Struct позволяют определять собственный тип
    // Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Создает пустой массив структур Pizza
    Pizza[] public pizzas;

    // Сопоставление идентификатора пиццы с адресом ее владельца
    mapping(uint256 => address) public pizzaToOwner;

    // Сопоставление адреса владельца с количеством принадлежащих ему токенов
    mapping(address => uint256) public ownerPizzaCount;

    // Сопоставление идентификатора токена с одобренным адресом
    mapping(uint256 => address) pizzaApprovals;

    // Вы можете вкладывать сопоставления, этот пример сопоставляет владельца с одобрениями оператора
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Внутренняя функция для создания случайной пиццы из строки (имени) и ДНК
    function _createPizza(string memory _name, uint256 _dna)
        // Ключевое слово `internal` означает, что эта функция видна только
        // в этом контракте и в контрактах, которые его наследуют
        // Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` — это модификатор функции, который проверяет, существует ли пицца
        // Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Добавляет пиццу в массив пицц и получает идентификатор
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Проверяет, что владелец пиццы совпадает с текущим пользователем
        // Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // обратите внимание, что address(0) — это нулевой адрес,
        // указывающий, что pizza[id] еще не назначена конкретному пользователю.

        assert(pizzaToOwner[id] == address(0));

        // Сопоставляет пиццу с владельцем
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Создает случайную пиццу из строки (имени)
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

    // Возвращает массив пицц, найденных по владельцу
    function getPizzasByOwner(address _owner)
        public
        // Функции, помеченные как `view`, обещают не изменять состояние
        // Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Использует местоположение в хранилище `memory` для хранения значений только на время
        // жизненного цикла этого вызова функции.
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

    // Передает пиццу и право собственности на другой адрес
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
     * Безопасно передает право собственности на данный идентификатор токена другому адресу
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
     * Безопасно передает право собственности на данный идентификатор токена другому адресу
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

    // Сжигает пиццу — полностью уничтожает токен
    // Модификатор функции `external` означает, что эта функция
    // является частью интерфейса контракта, и другие контракты могут ее вызывать
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

    // Возвращает количество пицц по адресу
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Возвращает владельца пиццы по идентификатору
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // Одобряет другой адрес для передачи права собственности на пиццу
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Возвращает одобренный адрес для конкретной пиццы
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Приватная функция для отмены текущего одобрения для данного идентификатора токена
     * Отменяется, если данный адрес действительно не является владельцем токена
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Устанавливает или отменяет одобрение для данного оператора
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

    // Принимает право собственности на пиццу — только для одобренных пользователей
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Проверяет, существует ли пицца
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Проверяет, является ли адрес владельцем или ему разрешена передача пиццы
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Отключить проверку solium из-за
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // Проверить, является ли пицца уникальной и еще не существует
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
        // См. https://ethereum.stackexchange.com/a/14016/36603
        // для получения более подробной информации о том, как это работает.
        // TODO Проверить это снова перед выпуском Serenity, потому что тогда все адреса будут
        // контрактами.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## Дополнительные материалы {#further-reading}

Ознакомьтесь с документацией Solidity и Vyper для более полного обзора смарт-контрактов:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## Смежные темы {#related-topics}

- [Умные контракты](/developers/docs/smart-contracts/)
- [Виртуальная машина Ethereum](/developers/docs/evm/)

## Связанные руководства {#related-tutorials}

- [Сокращение контрактов для борьбы с ограничением размера контракта](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– несколько практических советов по уменьшению размера вашего смарт-контракта._
- [Регистрация данных из смарт-контрактов с помощью событий](/developers/tutorials/logging-events-smart-contracts/) _– введение в события смарт-контрактов и способы их использования для регистрации данных._
- [Взаимодействие с другими контрактами из Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– как развернуть смарт-контракт из существующего контракта и взаимодействовать с ним._
