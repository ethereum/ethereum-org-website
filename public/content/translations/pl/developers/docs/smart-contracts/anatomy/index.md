---
title: "Anatomia inteligentnych kontraktów"
description: "Szczegółowa analiza anatomii inteligentnego kontaktu – funkcji, danych i zmiennych."
lang: pl
---

Inteligentny kontrakt to program, który działa pod adresem Ethereum. Składają się z danych i funkcji, które można wykonać po otrzymaniu transakcji. Oto przegląd tego, co stanowi inteligentny kontrakt.

## Wymagania wstępne {#prerequisites}

Upewnij się, że najpierw przeczytałeś/aś o [inteligentnych kontraktach](/developers/docs/smart-contracts/). Ten dokument zakłada, że znasz już języki programowania, takie jak JavaScript lub Python.

## Dane {#data}

Wszelkie dane kontraktu muszą być przypisane do lokalizacji: do `storage` lub `memory`. Modyfikacja pamięci masowej w inteligentnym kontrakcie jest kosztowna, więc musisz zastanowić się, gdzie powinny znajdować się Twoje dane.

### Przechowywanie {#storage}

Trwałe dane są nazywane pamięcią masową i są reprezentowane przez zmienne stanu. Te wartości są przechowywane na stałe w blockchain. Musisz zadeklarować typ, aby kontrakt mógł śledzić, ile pamięci w blockchainie potrzebuje podczas kompilacji.

```solidity
// Przykład w Solidity
contract SimpleStorage {
    uint storedData; // Zmienna stanu
    // ...
}
```

```python
# Przykład Vyper
storedData: int128
```

Jeśli programowałeś już w językach obiektowych, prawdopodobnie znasz większość typów. Jednak typ `address` powinien być dla Ciebie nowością, jeśli dopiero zaczynasz programować w Ethereum.

Typ `address` może zawierać adres Ethereum, który odpowiada 20 bajtom lub 160 bitom. Jest zwracany w zapisach szesnastkowych z wiodącym 0x.

Inne typy:

- boolean
- liczba całkowita
- fixed point numbers
- fixed-size byte arrays
- dynamicznie wymiarowane tablice bajtów
- literały wymierne i całkowite
- literały ciągów znaków
- literały szesnastkowe
- enumy

Aby uzyskać więcej wyjaśnień, zapoznaj się z dokumentami:

- [Zobacz typy Vyper](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Zobacz typy Solidity](https://docs.soliditylang.org/en/latest/types.html#value-types)

### Pamięć {#memory}

Wartości przechowywane tylko przez cały okres wykonywania funkcji kontraktowej nazywane są zmiennymi pamięci. Ponieważ nie są one przechowywane na stałe w blockchain, są znacznie tańsze w użyciu.

Dowiedz się więcej o tym, jak EVM przechowuje dane (Storage, Memory i Stack) w [dokumentacji Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack).

### Zmienne środowiskowe {#environment-variables}

Oprócz zmiennych, które definiujesz w kontrakcie, istnieją pewne specjalne zmienne globalne. Są one wykorzystywane głównie do dostarczania informacji na temat łańcucha bloków lub bieżącej transakcji.

Przykłady:

| **Prop**          | **Zmienna stanu** | **Opis**                                                  |
| ----------------- | ----------------- | --------------------------------------------------------- |
| `block.timestamp` | uint256           | Aktualny blok — znacznik czasu epoki                      |
| `msg.sender`      | address           | Nadawca wiadomości (bieżące wywołanie) |

## Funkcje {#functions}

W najbardziej uproszczonym ujęciu, funkcje mogą pobierać informacje lub ustawiać informacje w odpowiedzi na przychodzące transakcje.

Istnieją dwa rodzaje wywołań funkcji:

- `internal` – nie tworzą wywołania EVM
  - Wewnętrzne funkcje i zmienne stanu są dostępne tylko wewnętrznie (tj. z poziomu bieżącego kontraktu lub kontraktów z niego dziedziczących)
- `external` – tworzą wywołanie EVM
  - Funkcje zewnętrzne są częścią interfejsu kontraktu, co oznacza, że mogą być wywoływane z innych kontraktów oraz poprzez transakcje. Zewnętrzna funkcja `f` nie może być wywoływana wewnętrznie (tj. `f()` nie działa, ale `this.f()` działa).

Mogą być również `public` lub `private`

- Funkcje `public` mogą być wywoływane wewnętrznie z poziomu kontraktu lub zewnętrznie za pomocą wiadomości
- Funkcje `private` są widoczne tylko dla kontraktu, w którym są zdefiniowane, a nie w kontraktach pochodnych

Zarówno funkcje, jak i zmienne stanu mogą być publiczne lub prywatne

Oto funkcja aktualizacji zmiennej stanu w kontrakcie:

```solidity
// Przykład Solidity
function update_name(string value) public {
    dapp_name = value;
}
```

- Parametr `value` typu `string` jest przekazywany do funkcji: `update_name`
- Jest zadeklarowana jako `public`, co oznacza, że każdy może uzyskać do niej dostęp
- Nie jest zadeklarowana jako `view`, więc może modyfikować stan kontraktu

### Funkcje `view` {#view-functions}

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
2. [Emitowanie zdarzeń](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [Tworzenie innych kontraktów](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. Używanie `selfdestruct`.
5. Wysyłanie etheru za pomocą wywołań.
6. Wywoływanie dowolnej funkcji nieoznaczonej jako `view` lub `pure`.
7. Używanie wywołań niskiego poziomu.
8. Korzystanie z asemblera wbudowanego, który zawiera określone kody operacji.

### Funkcje konstruktora {#constructor-functions}

Funkcje `constructor` są wykonywane tylko raz podczas pierwszego wdrożenia kontraktu. Podobnie jak `constructor` w wielu językach programowania opartych na klasach, funkcje te często inicjalizują zmienne stanu do ich określonych wartości.

```solidity
// Przykład w Solidity
// Inicjalizuje dane kontraktu, ustawiając `owner`
// na adres twórcy kontraktu.
constructor() public {
    // Wszystkie inteligentne kontrakty opierają się na zewnętrznych transakcjach, aby uruchomić swoje funkcje.
    // `msg` to globalna zmienna, która zawiera istotne dane dotyczące danej transakcji,
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

### Funkcje wbudowane {#built-in-functions}

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
    string dapp_name; // zmienna stanu

    // Wywoływane podczas wdrażania kontraktu, inicjalizuje wartość
    constructor() public {
        dapp_name = "Moja przykładowa dapka";
    }

    // Funkcja pobierająca
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Funkcja ustawiająca
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

Pełny kontrakt może wyglądać w ten sposób. Tutaj funkcja `constructor` zapewnia wartość początkową dla zmiennej `dapp_name`.

## Zdarzenia i logi {#events-and-logs}

Wydarzenia umożliwiają inteligentnemu kontraktowi komunikację z frontendem oraz innymi subskrybującymi aplikacjami. Kiedy transakcja zostanie potwierdzona i dodana do bloku, inteligentne kontrakty mogą nadawać wydarzenia i rejestrować informacje, które frontend może przetwarzać i wykorzystywać.

## Przykłady z adnotacjami {#annotated-examples}

Są to niektóre przykłady napisane w Solidity. Jeśli chcesz pobawić się kodem, możesz wejść z nimi w interakcję w [Remix](http://remix.ethereum.org).

### Witaj, świecie {#hello-world}

```solidity
// Określa wersję Solidity, używając wersjonowania semantycznego.
// Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Definiuje kontrakt o nazwie `HelloWorld`.
// Kontrakt to zbiór funkcji i danych (jego stanu).
// Po wdrożeniu kontrakt znajduje się pod określonym adresem na blockchainie Ethereum.
// Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Deklaruje zmienną stanu `message` typu `string`.
    // Zmienne stanu to zmienne, których wartości są trwale przechowywane w pamięci kontraktu (storage).
    // Słowo kluczowe `public` udostępnia zmienne na zewnątrz kontraktu
    // i tworzy funkcję, którą inne kontrakty lub klienci mogą wywołać, aby uzyskać dostęp do wartości.
    string public message;

    // Podobnie jak w wielu obiektowych językach programowania opartych na klasach, konstruktor jest
    // specjalną funkcją, która jest wykonywana tylko podczas tworzenia kontraktu.
    // Konstruktory służą do inicjalizacji danych kontraktu.
    // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Akceptuje argument typu string `initMessage` i ustawia wartość
        // w zmiennej `message` w pamięci kontraktu (storage).
        message = initMessage;
    }

    // Funkcja publiczna, która akceptuje argument typu string
    // i aktualizuje zmienną `message` w pamięci kontraktu (storage).
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### Token {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // `address` jest porównywalny z adresem e-mail – służy do identyfikacji konta na Ethereum.
    // Adresy mogą reprezentować inteligentny kontrakt lub konta zewnętrzne (użytkowników).
    // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // `mapping` to w zasadzie struktura danych typu tablica haszująca.
    // Ten `mapping` przypisuje nieujemną liczbę całkowitą (saldo tokenu) do adresu (posiadacza tokenu).
    // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Zdarzenia umożliwiają rejestrowanie aktywności na blockchainie.
    // Klienci Ethereum mogą nasłuchiwać zdarzeń, aby reagować na zmiany stanu kontraktu.
    // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Inicjalizuje dane kontraktu, ustawiając `owner`
    // na adres twórcy kontraktu.
    constructor() public {
        // Wszystkie inteligentne kontrakty opierają się na zewnętrznych transakcjach, aby uruchomić swoje funkcje.
        // `msg` to globalna zmienna, która zawiera istotne dane dotyczące danej transakcji,
        // takie jak adres nadawcy i wartość ETH zawarta w transakcji.
        // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Tworzy określoną liczbę nowych tokenów i wysyła je na dany adres.
    function mint(address receiver, uint amount) public {
        // `require` to struktura kontrolna używana do wymuszania określonych warunków.
        // Jeśli wyrażenie `require` zwróci wartość `false`, wyzwalany jest wyjątek,
        // który cofa wszystkie zmiany stanu dokonane podczas bieżącego wywołania.
        // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Tylko właściciel kontraktu może wywołać tę funkcję
        require(msg.sender == owner, "Nie jesteś właścicielem.");

        // Wymusza maksymalną liczbę tokenów
        require(amount < 1e60, "Przekroczono maksymalną emisję");

        // Zwiększa saldo `receiver` o `amount`
        balances[receiver] += amount;
    }

    // Wysyła określoną liczbę istniejących tokenów od dowolnego wywołującego na dany adres.
    function transfer(address receiver, uint amount) public {
        // Nadawca musi mieć wystarczającą liczbę tokenów do wysłania
        require(amount <= balances[msg.sender], "Niewystarczające saldo.");

        // Dostosowuje salda tokenów obu adresów
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Emituje zdarzenie zdefiniowane wcześniej
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### Unikalny zasób cyfrowy {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// Importuje symbole z innych plików do bieżącego kontraktu.
// W tym przypadku jest to seria kontraktów pomocniczych z OpenZeppelin.
// Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// Słowo kluczowe `is` służy do dziedziczenia funkcji i słów kluczowych z kontraktów zewnętrznych.
// W tym przypadku `CryptoPizza` dziedziczy po kontraktach `IERC721` i `ERC165`.
// Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Używa biblioteki SafeMath z OpenZeppelin do bezpiecznego wykonywania operacji arytmetycznych.
    // Dowiedz się więcej: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Stałe zmienne stanu w Solidity są podobne do tych w innych językach,
    // ale musisz przypisać im wartość z wyrażenia, które jest stałe w czasie kompilacji.
    // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Typy `struct` pozwalają definiować własne typy
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

    // Mapowanie z ID tokenu na zatwierdzony adres
    mapping(uint256 => address) pizzaApprovals;

    // Możesz zagnieżdżać mapowania, ten przykład mapuje właściciela na zatwierdzenia operatora
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Wewnętrzna funkcja do tworzenia losowej Pizzy z ciągu znaków (nazwa) i DNA
    function _createPizza(string memory _name, uint256 _dna)
        // Słowo kluczowe `internal` oznacza, że ta funkcja jest widoczna tylko
        // w obrębie tego kontraktu i kontraktów, które z niego dziedziczą
        // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` to modyfikator funkcji, który sprawdza, czy pizza już istnieje
        // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Dodaje Pizzę do tablicy Pizz i pobiera id
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Sprawdza, czy właściciel Pizzy jest taki sam jak bieżący użytkownik
        // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // zauważ, że address(0) to adres zerowy,
        // co oznacza, że pizza[id] nie jest jeszcze przydzielona do konkretnego użytkownika.

        assert(pizzaToOwner[id] == address(0));

        // Mapuje Pizzę na właściciela
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Tworzy losową Pizzę z ciągu znaków (nazwa)
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Generuje losowe DNA z ciągu znaków (nazwa) i adresu właściciela (twórcy)
    function generateRandomDna(string memory _str, address _owner)
        public
        // Funkcje oznaczone jako `pure` obiecują nie odczytywać ani nie modyfikować stanu
        // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Generuje losowy uint z ciągu znaków (nazwa) + adres (właściciel)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Zwraca tablicę Pizz znalezionych przez właściciela
    function getPizzasByOwner(address _owner)
        public
        // Funkcje oznaczone jako `view` obiecują nie modyfikować stanu
        // Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Używa lokalizacji `memory` do przechowywania wartości tylko na czas
        // trwania tego wywołania funkcji.
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
        require(_from != address(0) && _to != address(0), "Nieprawidłowy adres.");
        require(_exists(_pizzaId), "Pizza nie istnieje.");
        require(_from != _to, "Nie można przenieść na ten sam adres.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Adres nie jest zatwierdzony.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Emituje zdarzenie zdefiniowane w zaimportowanym kontrakcie IERC721
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Bezpiecznie przenosi własność danego ID tokenu na inny adres
     * Jeśli adres docelowy jest kontraktem, musi on implementować `onERC721Received`,
     * która jest wywoływana podczas bezpiecznego transferu i zwraca magiczną wartość
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
     * Bezpiecznie przenosi własność danego ID tokenu na inny adres
     * Jeśli adres docelowy jest kontraktem, musi on implementować `onERC721Received`,
     * która jest wywoływana podczas bezpiecznego transferu i zwraca magiczną wartość
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
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Należy zaimplementować onERC721Received.");
    }

    /**
     * Wewnętrzna funkcja do wywoływania `onERC721Received` na adresie docelowym
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

    // Pali Pizzę - całkowicie niszczy Token
    // Modyfikator funkcji `external` oznacza, że ta funkcja jest
    // częścią interfejsu kontraktu i inne kontrakty mogą ją wywoływać
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "Nieprawidłowy adres.");
        require(_exists(_pizzaId), "Pizza nie istnieje.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Adres nie jest zatwierdzony.");

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

    // Zwraca właściciela Pizzy znalezionego po id
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Nieprawidłowe ID Pizzy.");
        return owner;
    }

    // Zatwierdza inny adres do przeniesienia własności Pizzy
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Musisz być właścicielem Pizzy.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Zwraca zatwierdzony adres dla określonej Pizzy
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza nie istnieje.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Prywatna funkcja do wyczyszczenia bieżącego zatwierdzenia dla danego ID tokenu
     * Cofa, jeśli podany adres nie jest faktycznie właścicielem tokenu
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Musisz być właścicielem Pizzy.");
        require(_exists(_pizzaId), "Pizza nie istnieje.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Ustawia lub usuwa zatwierdzenie dla danego operatora
     * Operator może w imieniu nadawcy przenieść wszystkie jego tokeny
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Nie można zatwierdzić własnego adresu");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Informuje, czy operator jest zatwierdzony przez danego właściciela
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Przejmuje własność Pizzy - tylko dla zatwierdzonych użytkowników
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Adres nie jest zatwierdzony.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Sprawdza, czy Pizza istnieje
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Sprawdza, czy adres jest właścicielem lub jest zatwierdzony do przeniesienia Pizzy
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

    // Sprawdź, czy Pizza jest unikalna i jeszcze nie istnieje
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
        require(result, "Pizza o takiej nazwie już istnieje.");
        _;
    }

    // Zwraca informację, czy adres docelowy jest kontraktem
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // Obecnie nie ma lepszego sposobu na sprawdzenie, czy pod danym adresem znajduje się kontrakt,
        // niż sprawdzenie rozmiaru kodu pod tym adresem.
        // Zobacz https://ethereum.stackexchange.com/a/14016/36603
        // aby uzyskać więcej szczegółów na temat działania.
        // TODO Sprawdź to ponownie przed wydaniem Serenity, ponieważ wtedy wszystkie adresy będą
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

Sprawdź dokumentację Solidity i Vyper, aby uzyskać pełniejszy przegląd inteligentnych kontraktów:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## Powiązane tematy {#related-topics}

- [Inteligentne kontrakty](/developers/docs/smart-contracts/)
- [Wirtualna Maszyna Ethereum](/developers/docs/evm/)

## Powiązane samouczki {#related-tutorials}

- [Zmniejszanie kontraktów w celu obejścia limitu rozmiaru kontraktu](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– kilka praktycznych wskazówek dotyczących zmniejszania rozmiaru Twojego inteligentnego kontraktu._
- [Rejestrowanie danych z inteligentnych kontraktów za pomocą zdarzeń](/developers/tutorials/logging-events-smart-contracts/) _– wprowadzenie do zdarzeń inteligentnych kontraktów i sposobu ich wykorzystania do rejestrowania danych._
- [Interakcja z innymi kontraktami z poziomu Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– jak wdrożyć inteligentny kontrakt z istniejącego kontraktu i wejść z nim w interakcję._
