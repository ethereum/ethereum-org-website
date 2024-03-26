---
title: Anatomia inteligentnych kontraktów
description: Szczegółowa analiza anatomii inteligentnego kontaktu – funkcji, danych i zmiennych.
lang: pl
---

Inteligentny kontrakt to program, który działa pod adresem Ethereum. Składają się z danych i funkcji, które można wykonać po otrzymaniu transakcji. Oto przegląd tego, co stanowi inteligentny kontrakt.

## Warunki wstępne {#prerequisites}

Upewnij się, że najpierw przeczytałeś o [inteligentnych kontraktach](/developers/docs/smart-contracts/). Ten dokument zakłada, że znasz już języki programowania, takie jak JavaScript lub Python.

## Dane {#data}

Wszelkie dane kontraktu muszą być przypisane do lokalizacji: do `storage ` lub `memory`. Modyfikacja pamięci masowej w inteligentnym kontrakcie jest kosztowna, więc musisz zastanowić się, gdzie powinny znajdować się Twoje dane.

### Pamięć {#storage}

Trwałe dane są nazywane pamięcią masową i są reprezentowane przez zmienne stanu. Te wartości są przechowywane na stałe w blockchain. Musisz zadeklarować typ, aby kontrakt mógł śledzić, ile pamięci w blockchainie potrzebuje podczas kompilacji.

```solidity
// Przykład Solidity
contract SimpleStorage {
    uint storedData; // Zmienna stanu
    // ...
}
```

```python
# Przykład Vyper
storedData: int128
```

Jeśli programowałeś już w językach obiektowych, prawdopodobnie znasz większość typów. Jednak `address` powinien być dla Ciebie nowy, jeśli dopiero zaczynasz programować w Ethereum.

Typ `address` może zawierać adres Ethereum, który odpowiada 20 bajtom lub 160 bitom. Jest zwracany w zapisach szesnastkowych z wiodącym 0x.

Inne typy:

- boolean
- liczba całkowita
- fixed point numbers
- fixed-size byte arrays
- dynamically-sized byte arrays
- Rational and integer literals
- String literals
- Hexadecimal literals
- Enums

Aby uzyskać więcej wyjaśnień, zapoznaj się z dokumentami:

- [Zobacz typy Vyper](https://vyper.readthedocs.io/en/v0.1.0-beta.6/types.html#value-types)
- [Zobacz typy Solidity](https://solidity.readthedocs.io/en/latest/types.html#value-types)

### Pamięć {#memory}

Wartości przechowywane tylko przez cały okres wykonywania funkcji kontraktowej nazywane są zmiennymi pamięci. Ponieważ nie są one przechowywane na stałe w blockchain, są znacznie tańsze w użyciu.

Dowiedz się więcej o tym, jak EVM przechowuje dane (magazyn, pamięć i stos) w [Dokumenty Solidity](https://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html?highlight=memory#storage-memory-and-the-stack).

### Zmienne środowiskowe {#environment-variables}

Oprócz zmiennych, które definiujesz w kontrakcie, istnieją pewne specjalne zmienne globalne. Są one wykorzystywane głównie do dostarczania informacji na temat łańcucha bloków lub bieżącej transakcji.

Przykłady:

| **Prop**          | **Zmienna stanu** | **Opis**                               |
| ----------------- | ----------------- | -------------------------------------- |
| `block.timestamp` | uint256           | Aktualny blok — znacznik czasu epoki   |
| `msg.sender`      | address           | Nadawca wiadomości (bieżące wywołanie) |

## Funkcje {#functions}

W najbardziej uproszczonym ujęciu, funkcje mogą pobierać informacje lub ustawiać informacje w odpowiedzi na przychodzące transakcje.

Istnieją dwa rodzaje wywołań funkcji:

- `internal` – nie tworzą one wywołania EVM
  - Do funkcji i zmiennych stanu internal można uzyskać dostęp wyłącznie wewnętrznie (tzn. z bieżącego kontraktu lub pochodzących od niego kontraktów)
- `external` – tworzą one wywołanie EVM
  - Funkcje zewnętrzne są częścią interfejsu kontraktu, co oznacza, że mogą być wywoływane z innych kontraktów oraz poprzez transakcje. Funkcja zewnętrzna `f` nie może być wywołana wewnętrznie (tj. `f()` nie działa, ale `this.f()` działa).

Mogą być także `public` lub `private`

- Funkcje `public` mogą być wywoływane wewnętrznie w ramach kontraktu lub zewnętrznie za pośrednictwem wiadomości
- Funkcje `private` są widoczne tylko dla kontraktu, w którym są zdefiniowane, a nie w kontraktach zależnych

Zarówno funkcje, jak i zmienne stanu mogą być publiczne lub prywatne

Oto funkcja aktualizacji zmiennej stanu w kontrakcie:

```solidity
// Przykład Solidity
function update_name(string value) public {
    dapp_name = value;
}
```

- Parametr `value` typu `string` jest przekazywany do funkcji: `update_name`
- Jest zadeklarowany jako `public`, co oznacza, że każdy może uzyskać do niego dostęp
- Nie jest zadeklarowany `view`, więc może modyfikować stan kontraktu

### Funkcje view {#view-functions}

Funkcje te obiecują nie zmieniać stanu danych kontraktu. Typowe przykłady to funkcje „getter”, które można wykorzystać na przykład do uzyskania salda użytkownika.

```solidity
// Przykład Solidity
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

Co jest uważane za modyfikację stanu:

1. Zapis do zmiennych stanu.
2. [Emisja zdarzeń](https://solidity.readthedocs.io/en/v0.7.0/contracts.html#events).
3. [Tworzenie innych kontraktów](https://solidity.readthedocs.io/en/v0.7.0/control-structures.html#creating-contracts).
4. Używanie `selfdestruct`.
5. Wysyłanie etheru za pomocą wywołań.
6. Wywołanie dowolnej funkcji nieoznaczonej `view` lub `pure`.
7. Używanie wywołań niskiego poziomu.
8. Korzystanie z asemblera wbudowanego, który zawiera określone kody operacji.

### Funkcje constructor {#constructor-functions}

`konstruktor` funkcje są wykonywane tylko raz w momencie pierwszego wdrożenia kontraktu. Podobnie jak `konstruktor` w wielu językach programowania opartych na klasie, funkcje te często inicjują zmienne stanu do ich określonych wartości.

```solidity
// Przykład Solidity
// Inicjuje dane umowy, ustawia `właściciela`
// na adres twórcy kontraktu.
constructor() public {
    // Wszystkie inteligentne kontrakty opierają się na transakcjach zewnętrznych, aby wyzwolić swoje funkcje.
    // `msg` to zmienna globalna zawierająca odpowiednie dane dotyczące danej transakcji,
    // takie jak adres nadawcy i wartość ETH zawarta w transakcji.
    // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Przykład Vyper

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### Wbudowane funkcje {#built-in-functions}

Oprócz zmiennych i funkcji, które definiujesz w kontrakcie, istnieje kilka specjalnych wbudowanych funkcji. Najbardziej oczywistym przykładem jest:

- `address.send()` – Solidity
- `send(address)` – Vyper

Pozwalają one na wysyłanie ETH do innych kont.

## Pisanie funkcji {#writing-functions}

Twoja funkcja wymaga:

- zmiennej i typu parametru (jeżeli akceptuje parametry)
- deklaracji wewnętrznej/zewnętrznej
- deklaracji pure/view/payable
- typu zwrotów (jeśli zwraca wartość)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // state variable

    // Called when the contract is deployed and initializes the value
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Get Function
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Set Function
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

Pełny kontrakt może wyglądać w ten sposób. Tutaj funkcja `constructor` zapewnia początkową wartość zmiennej `dapp_name`.

## Zdarzenia i dzienniki {#events-and-logs}

Zdarzenia pozwalają Ci komunikować się z inteligentnym kontraktem z Twojego frontendu lub innych aplikacji subskrybujących. Gdy transakcja zostanie wykopana, inteligentne kontrakty mogą emitować zdarzenia i zapisywać do blockchainu dzienniki, które frontend może następnie przetworzyć.

## Przykłady z komentarzami {#annotated-examples}

Są to niektóre przykłady napisane w Solidity. Jeśli chcesz pobawić się kodem, możesz wchodzić z nimi w interakcję w [Remix](http://remix.ethereum.org).

### Witaj świecie {#hello-world}

```solidity
// Określa wersję Solidity przy użyciu wersji semantycznej.
// Więcej informacji: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Definiuje kontrakt o nazwie `HelloWorld`.
// Kontrakt jest zbiorem funkcji i danych (jego stanu).
// Po wdrożeniu kontrakt znajduje się pod określonym adresem w blockchainie Ethereum.
// Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Deklaruje zmienną stanu `message` typu `string`.
    // zmienne stanu to zmienne, których wartości są stale przechowywane w pamięci kontraktów.
    // Słowo kluczowe `public` udostępnia zmienne spoza kontraktu
    // i tworzy funkcję, którą inne kontrakty lub klienci mogą wywołać, aby uzyskać dostęp do tej wartości.
    ciąg wiadomości publicznych;

    // Podobne do wielu języków obiektowych opartych na klasie, konstruktorem jest
    // specjalna funkcja, która jest wykonywana tylko w momencie tworzenia kontraktu.
    // Konstruktory są używane do inicjowania danych kontraktu.
    // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        //Akceptuje argument ciągu `initMessage` i ustawia wartość
        // na zmienną pamięci kontraktu `message`).
        wiadomość = initMessage;
    }

    // funkcja publiczna, która akceptuje argument ciągu
    // i aktualizuje zmienną pamięci `message`.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### Token {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // Adres porównywalny z adresem e-mail - jest używany do indentyfikacji konta w Ethereum.
    // Adresy mogą reprezentować inteligentne kontrakty lub konta zewnętrzne (użytkowników).
    // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // Mapowanie jest zasadniczo strukturą danych o postaci tablicy skrótów.
    // To mapowanie przypisuje niepodpisaną liczbę całkowitą (saldo tokena) do adresu (posiadacza tokenu).
    // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapowanie (adres => uint) publiczne saldo;

    // Wydarzenia pozwalają na rejestrowanie aktywności w blockchain.
    // Klienci Ethereum mogą słuchać zdarzeń, aby reagować na zmiany stanu kontraktu.
    // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/contracty. tml#events
    Transferu zdarzeń (adres od, adres do kwoty uint);

    // inicjuje dane umowy, ustawienie `właściciela`
    // na adres twórcy kontraktu.
    constructor() public {
    // Wszystkie inteligentne kontrakty opierają się na transakcjach zewnętrznych, aby wyzwolić swoje funkcje.
        // `msg` to zmienna globalna zawierająca odpowiednie dane dotyczące danej transakcji,
    // takie jak adres nadawcy i wartość ETH zawarta w transakcji.
        // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Tworzy liczbę nowych tokenów i wysyła je na adres.
    function mint(address receiver, uint amount) public {
        // `require` jest strukturą kontroli używaną do wymuszania pewnych warunków.
        // Jeśli wyrażenie `require` oceni na `false`, wyzwalany jest wyjątek,
        // który cofa wszystkie zmiany w stanie podczas bieżącego wywołąnia.
        // Więcej informacji: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Tylko właściciel kontraktu może wywołać tę funkcję
        require(msg.sender == owner, "You are not the owner.");

        // Wymusza maksymalną kwotę tokenów
        require(amount < 1e60, "Maximum issuance exceeded");

        // Zwiększa saldo `receiver` o `amount`
        balances[receiver] += amount;
    }

    // Wysyła kwotę istniejących tokenów od dowolnego wywołującego na adres.
    function transfer(address receiver, uint amount) public {
        // Nadawca musi mieć wystarczającą ilość tokenów, aby wysłać
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // Dostosowuje salda tokenów z dwóch adresów
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Emituje wydarzenie zdefiniowane wcześniej
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### Unikalne zasoby cyfrowe {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// Imports symbols from other files into the current contract.
// In this case, a series of helper contracts from OpenZeppelin.


// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// The `is` keyword is used to inherit functions and keywords from external contracts.
// In this case, `CryptoPizza` inherits from the `IERC721` and `ERC165` contracts.


// Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Uses OpenZeppelin's SafeMath library to perform arithmetic operations safely.
    // Learn more: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Constant state variables in Solidity are similar to other languages
    // but you must assign from an expression which is constant at compile time.


    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Struct types let you define your own type
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Creates an empty array of Pizza structs
    Pizza[] public pizzas;

    // Mapping from pizza ID to its owner's address
    mapping(uint256 => address) public pizzaToOwner;

    // Mapping from owner's address to number of owned token
    mapping(address => uint256) public ownerPizzaCount;

    // Mapping from token ID to approved address
    mapping(uint256 => address) pizzaApprovals;

    // You can nest mappings, this example maps owner to operator approvals
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Internal function to create a random Pizza from string (name) and DNA
    function _createPizza(string memory _name, uint256 _dna)
        // The `internal` keyword means this function is only visible
        // within this contract and contracts that derive this contract
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` is a function modifier that checks if the pizza already exists
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Adds Pizza to array of Pizzas and get id
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Checks that Pizza owner is the same as current user
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions
        assert(pizzaToOwner[id] == address(0));

        // Maps the Pizza to the owner
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Creates a random Pizza from string (name)
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Generates random DNA from string (name) and address of the owner (creator)
    function generateRandomDna(string memory _str, address _owner)
        public
        // Functions marked as `pure` promise not to read from or modify the state
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Generates random uint from string (name) + address (owner)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Returns array of Pizzas found by owner
    function getPizzasByOwner(address _owner)
        public
        // Functions marked as `view` promise not to modify state
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Uses the `memory` storage location to store values only for the
        // lifecycle of this function call.
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
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

    // Transfers Pizza and ownership to other address
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Emits event defined in the imported IERC721 contract
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Safely transfers the ownership of a given token ID to another address
     * If the target address is a contract, it must implement `onERC721Received`,
     * which is called upon a safe transfer, and return the magic value
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * otherwise, the transfer is reverted.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * Safely transfers the ownership of a given token ID to another address
     * If the target address is a contract, it must implement `onERC721Received`,
     * which is called upon a safe transfer, and return the magic value
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * otherwise, the transfer is reverted.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Must implmement onERC721Received.");
    }

    /**
     * Internal function to invoke `onERC721Received` on a target address
     * The call is not executed if the target address is not a contract
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

    // Burns a Pizza - destroys Token completely
    // The `external` function modifier means this function is
    // part of the contract interface and other contracts can call it
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

    // Returns count of Pizzas by address
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Returns owner of the Pizza found by id
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // Approves other address to transfer ownership of Pizza
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Returns approved address for specific Pizza
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Private function to clear current approval of a given token ID
     * Reverts if the given address is not indeed the owner of the token
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Sets or unsets the approval of a given operator
     * An operator is allowed to transfer all tokens of the sender on their behalf
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Tells whether an operator is approved by a given owner
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Takes ownership of Pizza - only for approved users
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Checks if Pizza exists
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Checks if address is owner or is approved to transfer Pizza
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Disable solium check because of
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // Check if Pizza is unique and doesn't exist yet
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

    // Returns whether the target address is a contract
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // Currently there is no better way to check if there is a contract in an address
        // than to check the size of the code at that address.
        // See https://ethereum.stackexchange.com/a/14016/36603
        // for more details about how this works.
        // TODO Check this again before the Serenity release, because all addresses will be
        // contracts then.


        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## Dodatkowo przeczytaj {#further-reading}

Sprawdź dokumentację Solidity i Vyper, aby uzyskać pełniejszy przegląd inteligentnych kontraktów:

- [Solidity](https://solidity.readthedocs.io/)
- [Vyper](https://vyper.readthedocs.io/)

## Powiązane tematy {#related-topics}

- [Inteligentne kontrakty](/developers/docs/smart-contracts/)
- [Maszyna Wirtualna Ethereum](/developers/docs/evm/)

## Powiązane samouczki {#related-tutorials}

- [Zmniejszenie kontraktów w celu walki z limitem wielkości kontraktu](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _ – kilka praktycznych wskazówek, jak zmniejszyć rozmiar inteligentnego kontraktu._
- [Rejestrowanie danych z inteligentnych kontraktów za pomocą zdarzeń](/developers/tutorials/logging-events-smart-contracts/) _– wprowadzenie do zdarzeń inteligentnych kontraktów i jak możesz ich używać do rejestrowania danych._
- [Interakcja z innymi umowami z Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– jak wdrożyć inteligentny kontrakt z istniejącego kontraktu i wchodzić z nim w interakcje._
