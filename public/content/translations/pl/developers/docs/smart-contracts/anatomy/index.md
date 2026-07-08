---
title: "Anatomia inteligentnych kontraktów"
description: "Szczegółowe spojrzenie na anatomię inteligentnego kontraktu – funkcje, dane i zmienne."
lang: pl
---

Inteligentny kontrakt to program, który działa pod określonym adresem w sieci Ethereum. Składa się z danych i funkcji, które mogą zostać wykonane po otrzymaniu transakcji. Oto przegląd tego, z czego składa się inteligentny kontrakt.

## Wymagania wstępne {#prerequisites}

Upewnij się, że najpierw przeczytałeś o [inteligentnych kontraktach](/developers/docs/smart-contracts/). Ten dokument zakłada, że znasz już języki programowania, takie jak JavaScript lub Python.

## Dane {#data}

Wszelkie dane kontraktu muszą być przypisane do lokalizacji: do `storage` lub `memory`. Modyfikacja pamięci (storage) w inteligentnym kontrakcie jest kosztowna, dlatego musisz przemyśleć, gdzie powinny znajdować się Twoje dane.

### Pamięć (Storage) {#storage}

Trwałe dane są określane jako storage i są reprezentowane przez zmienne stanu. Wartości te są trwale przechowywane na blockchainie. Musisz zadeklarować ich typ, aby kontrakt mógł śledzić, ile miejsca na blockchainie będzie potrzebował po skompilowaniu.

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

Jeśli programowałeś już w językach obiektowych, prawdopodobnie znasz większość typów. Jednak `address` powinien być dla Ciebie nowością, jeśli dopiero zaczynasz programować na [Ethereum](/).

Typ `address` może przechowywać adres Ethereum, co odpowiada 20 bajtom lub 160 bitom. Zwraca on wartość w notacji szesnastkowej z wiodącym 0x.

Inne typy to m.in.:

- wartości logiczne (boolean)
- liczby całkowite (integer)
- liczby stałoprzecinkowe
- tablice bajtów o stałym rozmiarze
- tablice bajtów o dynamicznym rozmiarze
- literały wymierne i całkowite
- literały łańcuchowe (string)
- literały szesnastkowe
- typy wyliczeniowe (enum)

Aby uzyskać więcej wyjaśnień, zapoznaj się z dokumentacją:

- [Zobacz typy w języku Vyper](https://docs.vyperlang.org/en/stable/types.html#value-types)
- [Zobacz typy w języku Solidity](https://docs.soliditylang.org/en/latest/types.html#value-types)

### Pamięć (Memory) {#memory}

Wartości, które są przechowywane tylko przez czas wykonywania funkcji kontraktu, nazywane są zmiennymi w pamięci (memory). Ponieważ nie są one trwale przechowywane na blockchainie, ich użycie jest znacznie tańsze.

Dowiedz się więcej o tym, jak EVM przechowuje dane (Storage, Memory i Stack) w [dokumentacji Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack).

### Zmienne środowiskowe {#environment-variables}

Oprócz zmiennych zdefiniowanych w kontrakcie istnieją pewne specjalne zmienne globalne. Służą one głównie do dostarczania informacji o blockchainie lub bieżącej transakcji.

Przykłady:

| **Właściwość**          | **Zmienna stanu** | **Opis**                      |
| ----------------- | ------------------ | ------------------------------------ |
| `block.timestamp` | uint256            | Znacznik czasu (timestamp) epoki bieżącego bloku        |
| `msg.sender`      | address            | Nadawca wiadomości (bieżącego wywołania) |

## Funkcje {#functions}

W najprostszych słowach, funkcje mogą pobierać lub ustawiać informacje w odpowiedzi na przychodzące transakcje.

Istnieją dwa rodzaje wywołań funkcji:

- `internal` – nie tworzą one wywołania EVM
  - Funkcje wewnętrzne i zmienne stanu mogą być dostępne tylko wewnętrznie (tj. z poziomu bieżącego kontraktu lub kontraktów z niego dziedziczących)
- `external` – tworzą one wywołanie EVM
  - Funkcje zewnętrzne są częścią interfejsu kontraktu, co oznacza, że mogą być wywoływane z innych kontraktów oraz za pośrednictwem transakcji. Zewnętrzna funkcja `f` nie może być wywołana wewnętrznie (tj. `f()` nie zadziała, ale `this.f()` zadziała).

Mogą być również `public` lub `private`

- Funkcje `public` mogą być wywoływane wewnętrznie z poziomu kontraktu lub zewnętrznie za pośrednictwem wiadomości
- Funkcje `private` są widoczne tylko dla kontraktu, w którym zostały zdefiniowane, a nie w kontraktach pochodnych

Zarówno funkcje, jak i zmienne stanu mogą być publiczne lub prywatne

Oto funkcja do aktualizacji zmiennej stanu w kontrakcie:

```solidity
// Przykład Solidity
function update_name(string value) public {
    dapp_name = value;
}
```

- Parametr `value` typu `string` jest przekazywany do funkcji: `update_name`
- Jest zadeklarowana jako `public`, co oznacza, że każdy ma do niej dostęp
- Nie jest zadeklarowana jako `view`, więc może modyfikować stan kontraktu

### Funkcje widoku (View) {#view-functions}

Funkcje te gwarantują, że nie zmodyfikują stanu danych kontraktu. Typowymi przykładami są funkcje typu „getter” – możesz ich użyć na przykład do pobrania salda użytkownika.

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

1. Zapisywanie do zmiennych stanu.
2. [Emitowanie zdarzeń](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [Tworzenie innych kontraktów](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. Używanie `selfdestruct`.
5. Wysyłanie etheru poprzez wywołania (calls).
6. Wywoływanie jakiejkolwiek funkcji, która nie jest oznaczona jako `view` lub `pure`.
7. Używanie wywołań niskopoziomowych.
8. Używanie wstawek asemblerowych (inline assembly), które zawierają określone kody operacji (opcodes).

### Funkcje konstruktora {#constructor-functions}

Funkcje `constructor` są wykonywane tylko raz, gdy kontrakt jest po raz pierwszy wdrażany. Podobnie jak `constructor` w wielu klasowych językach programowania, funkcje te często inicjują zmienne stanu do określonych wartości.

```solidity
// Przykład Solidity
// Inicjalizuje dane kontraktu, ustawiając `owner`
// na adres twórcy kontraktu.
constructor() public {
    // Wszystkie inteligentne kontrakty polegają na zewnętrznych transakcjach do wyzwalania swoich funkcji.
    // `msg` to zmienna globalna, która zawiera istotne dane o danej transakcji,
    // takie jak adres nadawcy i wartość ETH dołączona do transakcji.
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

Oprócz zmiennych i funkcji zdefiniowanych w kontrakcie istnieją pewne specjalne wbudowane funkcje. Najbardziej oczywistym przykładem jest:

- `address.send()` – Solidity
- `send(address)` – Vyper

Pozwalają one kontraktom na wysyłanie ETH na inne konta.

## Pisanie funkcji {#writing-functions}

Twoja funkcja potrzebuje:

- zmiennej parametru i typu (jeśli przyjmuje parametry)
- deklaracji internal/external
- deklaracji pure/view/payable
- typu zwracanego (jeśli zwraca wartość)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // zmienna stanu

    // Wywoływane, gdy kontrakt jest wdrażany i inicjalizuje wartość
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Funkcja Get
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Funkcja Set
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

Kompletny kontrakt może wyglądać mniej więcej tak. Tutaj funkcja `constructor` zapewnia początkową wartość dla zmiennej `dapp_name`.

## Zdarzenia i logi {#events-and-logs}

Zdarzenia umożliwiają inteligentnemu kontraktowi komunikację z frontendem lub innymi subskrybującymi aplikacjami. Po zatwierdzeniu transakcji i dodaniu jej do bloku, inteligentne kontrakty mogą emitować zdarzenia i logować informacje, które frontend może następnie przetwarzać i wykorzystywać.

## Przykłady z adnotacjami {#annotated-examples}

Oto kilka przykładów napisanych w języku Solidity. Jeśli chcesz pobawić się kodem, możesz wejść z nim w interakcję w [Remix](https://remix.ethereum.org).

### Hello world {#hello-world}

```solidity
// Określa wersję Solidity, używając wersjonowania semantycznego.
// Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Definiuje kontrakt o nazwie `HelloWorld`.
// Kontrakt to zbiór funkcji i danych (jego stan).
// Po wdrożeniu kontrakt znajduje się pod określonym adresem na blockchainie Ethereum.
// Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Deklaruje zmienną stanu `message` typu `string`.
    // Zmienne stanu to zmienne, których wartości są trwale przechowywane w pamięci kontraktu.
    // Słowo kluczowe `public` sprawia, że zmienne są dostępne z zewnątrz kontraktu
    // i tworzy funkcję, którą inne kontrakty lub klienci mogą wywołać, aby uzyskać dostęp do wartości.
    string public message;

    // Podobnie jak w wielu językach obiektowych opartych na klasach, konstruktor to
    // specjalna funkcja, która jest wykonywana tylko podczas tworzenia kontraktu.
    // Konstruktory są używane do inicjalizacji danych kontraktu.
    // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Przyjmuje argument typu string `initMessage` i ustawia wartość
        // w zmiennej przechowywania `message` kontraktu).
        message = initMessage;
    }

    // Publiczna funkcja, która przyjmuje argument typu string
    // i aktualizuje zmienną przechowywania `message`.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### Token {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // `address` jest porównywalny do adresu e-mail - służy do identyfikacji konta w Ethereum.
    // Adresy mogą reprezentować inteligentny kontrakt lub zewnętrzne konta (użytkowników).
    // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // `mapping` to w zasadzie struktura danych tablicy mieszającej.
    // Ten `mapping` przypisuje liczbę całkowitą bez znaku (saldo tokenów) do adresu (posiadacza tokena).
    // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Zdarzenia pozwalają na logowanie aktywności na blockchainie.
    // Klienci Ethereum mogą nasłuchiwać zdarzeń, aby reagować na zmiany stanu kontraktu.
    // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Inicjalizuje dane kontraktu, ustawiając `owner`
    // na adres twórcy kontraktu.
    constructor() public {
        // Wszystkie inteligentne kontrakty polegają na zewnętrznych transakcjach do wyzwalania swoich funkcji.
        // `msg` to zmienna globalna, która zawiera istotne dane o danej transakcji,
        // takie jak adres nadawcy i wartość ETH dołączona do transakcji.
        // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Tworzy określoną liczbę nowych tokenów i wysyła je na adres.
    function mint(address receiver, uint amount) public {
        // `require` to struktura kontrolna używana do wymuszania określonych warunków.
        // Jeśli instrukcja `require` zostanie oceniona jako `false`, wyzwalany jest wyjątek,
        // który cofa wszystkie zmiany wprowadzone do stanu podczas bieżącego wywołania.
        // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Tylko właściciel kontraktu może wywołać tę funkcję
        require(msg.sender == owner, "You are not the owner.");

        // Wymusza maksymalną liczbę tokenów
        require(amount < 1e60, "Maximum issuance exceeded");

        // Zwiększa saldo `receiver` o `amount`
        balances[receiver] += amount;
    }

    // Wysyła określoną liczbę istniejących tokenów od dowolnego wywołującego na adres.
    function transfer(address receiver, uint amount) public {
        // Nadawca musi mieć wystarczającą liczbę tokenów do wysłania
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // Dostosowuje salda tokenów dwóch adresów
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Emituje zdarzenie zdefiniowane wcześniej
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### Unikalne aktywo cyfrowe {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// Importuje symbole z innych plików do bieżącego kontraktu.
// W tym przypadku serię kontraktów pomocniczych z OpenZeppelin.
// Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// Słowo kluczowe `is` służy do dziedziczenia funkcji i słów kluczowych z zewnętrznych kontraktów.
// W tym przypadku `CryptoPizza` dziedziczy z kontraktów `IERC721` i `ERC165`.
// Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Używa biblioteki SafeMath z OpenZeppelin do bezpiecznego wykonywania operacji arytmetycznych.
    // Dowiedz się więcej: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Stałe zmienne stanu w Solidity są podobne do innych języków
    // ale musisz przypisać z wyrażenia, które jest stałe w czasie kompilacji.
    // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Typy struktur pozwalają zdefiniować własny typ
    // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Tworzy pustą tablicę struktur Pizza
    Pizza[] public pizzas;

    // Mapowanie z ID pizzy na adres jej właściciela
    mapping(uint256 => address) public pizzaToOwner;

    // Mapowanie z adresu właściciela na liczbę posiadanych tokenów
    mapping(address => uint256) public ownerPizzaCount;

    // Mapowanie z ID tokena na zatwierdzony adres
    mapping(uint256 => address) pizzaApprovals;

    // Możesz zagnieżdżać mapowania, ten przykład mapuje właściciela na zatwierdzenia operatora
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Wewnętrzna funkcja do tworzenia losowej Pizzy z ciągu znaków (nazwy) i DNA
    function _createPizza(string memory _name, uint256 _dna)
        // Słowo kluczowe `internal` oznacza, że ta funkcja jest widoczna tylko
        // w ramach tego kontraktu i kontraktów, które dziedziczą po tym kontrakcie
        // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` to modyfikator funkcji, który sprawdza, czy pizza już istnieje
        // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Dodaje Pizzę do tablicy Pizz i pobiera id
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Sprawdza, czy właściciel Pizzy jest taki sam jak obecny użytkownik
        // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // zauważ, że address(0) to adres zerowy,
        // wskazujący, że pizza[id] nie jest jeszcze przypisana do konkretnego użytkownika.

        assert(pizzaToOwner[id] == address(0));

        // Mapuje Pizzę do właściciela
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Tworzy losową Pizzę z ciągu znaków (nazwy)
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Generuje losowe DNA z ciągu znaków (nazwy) i adresu właściciela (twórcy)
    function generateRandomDna(string memory _str, address _owner)
        public
        // Funkcje oznaczone jako `pure` obiecują, że nie będą odczytywać ani modyfikować stanu
        // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Generuje losowy uint z ciągu znaków (nazwy) + adresu (właściciela)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Zwraca tablicę Pizz znalezionych przez właściciela
    function getPizzasByOwner(address _owner)
        public
        // Funkcje oznaczone jako `view` obiecują, że nie będą modyfikować stanu
        // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Używa lokalizacji przechowywania `memory` do przechowywania wartości tylko na czas
        // cyklu życia tego wywołania funkcji.
        // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
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

    // Przenosi Pizzę i własność na inny adres
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Emituje zdarzenie zdefiniowane w zaimportowanym kontrakcie IERC721
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Bezpiecznie przenosi własność danego ID tokena na inny adres
     * Jeśli adres docelowy to kontrakt, musi on implementować `onERC721Received`,
     * które jest wywoływane przy bezpiecznym transferze i zwracać magiczną wartość
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * w przeciwnym razie transfer jest cofany.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * Bezpiecznie przenosi własność danego ID tokena na inny adres
     * Jeśli adres docelowy to kontrakt, musi on implementować `onERC721Received`,
     * które jest wywoływane przy bezpiecznym transferze i zwracać magiczną wartość
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * w przeciwnym razie transfer jest cofany.
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
     * Wewnętrzna funkcja do wywołania `onERC721Received` na adresie docelowym
     * Wywołanie nie jest wykonywane, jeśli adres docelowy nie jest kontraktem
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

    // Spala Pizzę - całkowicie niszczy Token
    // Modyfikator funkcji `external` oznacza, że ta funkcja jest
    // częścią interfejsu kontraktu i inne kontrakty mogą ją wywołać
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

    // Zwraca liczbę Pizz według adresu
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Zwraca właściciela Pizzy znalezionej po id
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // Zatwierdza inny adres do przeniesienia własności Pizzy
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Zwraca zatwierdzony adres dla konkretnej Pizzy
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Prywatna funkcja do czyszczenia obecnego zatwierdzenia danego ID tokena
     * Cofa, jeśli podany adres nie jest w rzeczywistości właścicielem tokena
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Ustawia lub cofa zatwierdzenie danego operatora
     * Operator ma prawo do transferu wszystkich tokenów nadawcy w jego imieniu
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Mówi, czy operator jest zatwierdzony przez danego właściciela
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Przejmuje własność Pizzy - tylko dla zatwierdzonych użytkowników
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Sprawdza, czy Pizza istnieje
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Sprawdza, czy adres jest właścicielem lub jest zatwierdzony do transferu Pizzy
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Wyłącza sprawdzanie solium z powodu
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // Sprawdza, czy Pizza jest unikalna i jeszcze nie istnieje
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

    // Zwraca, czy adres docelowy jest kontraktem
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // Obecnie nie ma lepszego sposobu na sprawdzenie, czy pod adresem znajduje się kontrakt
        // niż sprawdzenie rozmiaru kodu pod tym adresem.
        // Zobacz https://ethereum.stackexchange.com/a/14016/36603
        // aby uzyskać więcej szczegółów na temat tego, jak to działa.
        // TODO Sprawdź to ponownie przed wydaniem Serenity, ponieważ wszystkie adresy będą wtedy
        // kontraktami.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## Dalsza lektura {#further-reading}

Zapoznaj się z dokumentacją Solidity i Vyper, aby uzyskać pełniejszy przegląd inteligentnych kontraktów:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## Powiązane tematy {#related-topics}

- [Inteligentne kontrakty](/developers/docs/smart-contracts/)
- [Maszyna Wirtualna Ethereum (EVM)](/developers/docs/evm/)

## Powiązane samouczki {#related-tutorials}

- [Zmniejszanie kontraktów w celu walki z limitem rozmiaru kontraktu](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Kilka praktycznych wskazówek dotyczących zmniejszania rozmiaru inteligentnego kontraktu._
- [Logowanie danych z inteligentnych kontraktów za pomocą zdarzeń](/developers/tutorials/logging-events-smart-contracts/) _– Wprowadzenie do zdarzeń w inteligentnych kontraktach i sposobów ich wykorzystania do logowania danych._
- [Interakcja z innymi kontraktami z poziomu Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Jak wdrożyć inteligentny kontrakt z istniejącego kontraktu i wejść z nim w interakcję._
