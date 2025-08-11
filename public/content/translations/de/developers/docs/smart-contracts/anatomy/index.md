---
title: Anatomie von Smart Contracts
description: 'Ein tiefgreifender Einblick in die Anatomie eines Smart Contracts: Funktionen, Daten und Variablen'
lang: de
---

Ein Smart Contract ist ein Programm, das auf einer Adresse auf Ethereum läuft. Ein solcher Vertrag besteht aus Daten und Funktionen, die nach dem Erhalt einer Transaktion ausgeführt werden können. Hier ein Überblick darüber, was einen Smart Contract ausmacht.

## Voraussetzungen {#prerequisites}

Sie sollten sich bereits mit [Smart Contracts](/developers/docs/smart-contracts/) vertraut gemacht haben. Die Informationen in diesem Dokument sind für Personen gedacht, die bereits mit Programmiersprachen wie JavaScript oder Python vertraut sind.

## Daten {#data}

Alle Vertragsdaten müssen einem Ort zugewiesen werden: entweder zu `storage` oder `memory`. Speicher in einem Smart Contract zu ändern ist ein kostenintensiver Prozess. Daher sollten Sie sich überlegen, wo Ihre Daten gespeichert werden sollen.

### Speicher {#storage}

Gleichbleibende Daten werden als Speicher oder Storage bezeichnet und über Zustandsvariablen dargestellt. Solche Daten werden dauerhaft auf der Blockchain gespeichert. Sie müssen den Typ deklarieren, damit der Contract beim Kompilieren verfolgen kann, wie viel Speicherplatz er auf der Blockchain benötigt.

```solidity
// Solidity example
contract SimpleStorage {
    uint storedData; // State variable
    // ...
}
```

```python
# Vyper example
storedData: int128
```

Wenn Sie bereits Erfahrung im Programmieren in objektorientierten Sprachen haben, werden Sie wahrscheinlich mit den meisten Typen vertraut sein. Allerdings sollte `address` neu für Sie sein, wenn Sie noch keine Erfahrung in der Ethereum-Entwicklung haben.

Ein `adress`-Typ kann eine Ethereum-Adresse aufnehmen, was 20 Byte oder 160 Bit entspricht. Die Ausgabe erfolgt in hexadezimaler Schreibweise mit einem führenden 0x.

Andere Typen umfassen:

- boolesch
- Ganzzahl
- Festkommazahlen
- Byte-Arrays mit fester Größe
- Byte-Arrays mit dynamischer Größe
- Rationale und ganzzahlige Literale
- Zeichenfolgenliterale
- Hexadezimale Literale
- Enumerationen

Weitere Erklärungen finden Sie in folgender Dokumentation:

- [Vyper-Typen anzeigen](https://vyper.readthedocs.io/en/v0.1.0-beta.6/types.html#value-types)
- [Solidity-Typen anzeigen](https://solidity.readthedocs.io/en/latest/types.html#value-types)

### Speicher {#memory}

Werte, die nur für die Lebensdauer der Ausführung einer Vertragsfunktion gespeichert werden, werden als Memory Variables (Speichervariablen) bezeichnet. Da diese nicht dauerhaft auf der Blockchain gespeichert werden, sind sie wesentlich preiswerter.

Erfahren Sie mehr darüber, wie die EVM Daten speichert (Aufbewahrung, Speicher und Stack), in den [Solidity-Dokumenten](https://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html?highlight=memory#storage-memory-and-the-stack).

### Umgebungsvariablen {#environment-variables}

Zusätzlich zu den Variablen, die Sie in Ihrem Vertrag definieren, gibt es einige spezielle globale Variablen. Sie werden in erster Linie verwendet, um Informationen über die Blockchain oder aktuelle Transaktion bereitzustellen.

Beispiele:

| **Eigenschaft**   | **Statusvariable** | **Beschreibung**                          |
| ----------------- | ------------------ | ----------------------------------------- |
| `block.timestamp` | uint256            | Aktueller Zeitstempel der Block-Epoche    |
| `msg.sender`      | address            | Absender der Nachricht (aktueller Aufruf) |

## Funktionen {#functions}

Vereinfacht gesagt können Funktionen als Antwort auf eingehende Transaktionen Informationen erhalten oder festlegen.

Es gibt zwei Arten von Functionsaufrufen:

- `internal` – diese erstellen keinen EVM-Aufruf
  - Auf interne Funktionen und Zustandsvariablen kann nur intern zugegriffen werden (d. h. innerhalb des aktuellen Vertrags oder von ihm abgeleiteter Verträge).
- `external` – diese erzeugen einen EVM-Aufruf
  - Externe Funktionen sind Teil der Vertragsschnittstelle. Das bedeutet, dass sie aus anderen Verträgen und über Transaktionen aufgerufen werden können. Eine externe Funktion `f` kann nicht intern aufgerufen werden (z. B. `f()` funktioniert nicht, aber `this.f()` funktioniert).

Sie können auch `public` oder `private` sein

- `public`-Funktionen können intern aus dem Vertrag oder extern über Nachrichten aufgerufen werden.
- `private`-Funktionen sind nur für den Vertrag sichtbar, in dem sie definiert sind, und nicht in abgeleiteten Verträgen.

Sowohl Funktionen als auch Statusvariablen können öffentlich oder privat gemacht werden.

Hier ist eine Funktion zum Aktualisieren einer Zustandsvariable für einen Smart Contract:

```solidity
// Solidity example
function update_name(string value) public {
    dapp_name = value;
}
```

- Der Parameter `value` des Typs `string` wird an die Funktion `update_name` übergeben.
- Es wird `public` deklariert. Das bedeutet, dass jeder darauf zugreifen kann.
- `view` wird nicht deklariert, damit eine Änderung des Vertragsstatus möglich ist.

### Ansicht-Funktionen {#view-functions}

Diese Funktionen verpflichten sich, den Zustand der Vertragsdaten nicht zu ändern. Gängige Beispiele sind "Getter"-Funktionen, mit denen Sie z. B. den Kontostand eines Benutzers abfragen können.

```solidity
// Solidity example
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

Folgende Vorgänge werden als Modifikation des Zustands angesehen:

1. In Zustandsvariablen schreiben
2. [Ereignisse ausgeben](https://solidity.readthedocs.io/en/v0.7.0/contracts.html#events)
3. [Weitere Verträge erstellen](https://solidity.readthedocs.io/en/v0.7.0/control-structures.html#creating-contracts)
4. `selfdestruct` verwenden
5. Ether über Aufrufe senden
6. Eine Funktion aufrufen, die nicht mit `view` oder `pure` markiert ist
7. Low-Level-Aufrufe verwenden
8. Inline-Assembly verwenden, die bestimmte Opcodes enthält

### Konstruktorfunktionen {#constructor-functions}

`constructor`-Funktionen werden nur einmal ausgeführt, wenn der Vertrag in die Blockchain integriert wird. In vielen klassenbasierten Programmiersprachen initialisieren diese Funktionen wie `constructor` oft Zustandsvariablen auf ihre angegebenen Werte.

```solidity
// Solidity example
// Initializes the contract's data, setting the `owner`
// to the address of the contract creator.
constructor() public {
    // All smart contracts rely on external transactions to trigger its functions.
    // `msg` is a global variable that includes relevant data on the given transaction,
    // such as the address of the sender and the ETH value included in the transaction.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
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

### Integrierte Funktionen {#built-in-functions}

Zusätzlich zu den Variablen, die Sie in Ihrem Vertrag definieren, gibt es einige spezielle integrierte Funktionen. Das offensichtlichste Beispiel ist:

- `address.send()` – Solidity
- `send(address)` – Vyper

Diese erlauben es Smart Contracts, ETH an andere Konten zu senden.

## Funktionen schreiben {#writing-functions}

Ihre Funktion benötigt folgende Elemente:

- Parametervariable und -typ (wenn Parameter akzeptiert werden)
- interne/externe Deklaration
- Deklaration von pure/view/payable
- Gibt den Typ zurück (wenn er einen Wert zurückgibt)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // Zustandsvariable

    // Wird aufgerufen, wenn der Vertrag bereitgestellt wird und initialisiert den Wert
    constructor() public {
        dapp_name = "Meine Beispiel-Dapp";
    }

    // Funktion holen
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Funktion setzen
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

Ein vollständiger Smart Contract könnte so aussehen. Hier stellt die `constructor`-Funktion einen Anfangswert für die `dapp_name` -Variable bereit.

## Ereignisse und Protokolle {#events-and-logs}

Ereignisse ermöglichen es Ihrem Smart Contract, mit Ihrem Frontend oder anderen abonnierenden Anwendungen zu kommunizieren. Sobald eine Transaktion validiert und einem Block hinzugefügt wurde, können Smart Contracts Ereignisse auslösen und Informationen protokollieren, die das Frontend dann verarbeiten und nutzen kann.

## Kommentierte Beispiele {#annotated-examples}

Das sind einige Beispiele in Solidity. Wenn Sie mit dem Code spielen möchten, können Sie mit ihm in [Remix](http://remix.ethereum.org) interagieren.

### Hello world {#hello-world}

```solidity
// Bestimmt die Version von Solidity mit semantischer Versionierung.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Defines a contract named `HelloWorld`.
// Ein Smart contract ist eine Sammlung von Funktionen und Daten (sein Zustand).
// Einmal in die Blockchain integriert, befindet sich ein Contract an einer bestimmten Adresse der Ethereum-Blockchain.
// Erfahre mehr: https://solidity.readthedocs.io/de/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Deklariert eine Zustandsvariable `message` vom Typ `string`.
    // Zustandsvariablen sind Variablen, deren Werte dauerhaft im Vertragsspeicher hinterlegt werden.
    // Das Schlüsselwort `public` macht Variablen von außerhalb eines Contracts
    // zugänglich und erzeugt eine Funktion, die andere Contracts oder Clients aufrufen können, um auf den Wert zuzugreifen.
    string public message;

    // Ähnlich wie viele Klassen-basierte objektorientierte Sprachen, ist ein Konstruktor
    // eine spezielle Funktion, die nur bei der Vertragserstellung ausgeführt wird.
    // Konstruktoren werden verwendet, um die Vertragsdaten zu initialisieren.
    // Erfahre mehr: https://solidity.readthedocs.io/de/v0.5.10/contracts. tml#constructors
    constructor(string memory initMessage) public {
        // Akzeptiert ein String Argument `initMessage` und setzt den Wert
        // in die `message` Speichervariable des Contracts).
        message = initMessage;
    }

    // Eine öffentliche Funktion, die ein String-Argument akzeptiert
    // und die Speichervariable `message` aktualisiert.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### Token {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // Eine `Adresse` ist mit einer E-Mail-Adresse vergleichbar - sie wird verwendet, um ein Konto auf Ethereum zu identifizieren.
    // Adressen können einen Smart Contract oder ein externes (Benutzer) Konto darstellen.
    // Erfahre mehr: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // Ein `mapping` ist im Wesentlichen eine Hashtabellen-Datenstruktur.
    // Dieses `mapping` weist einer Adresse (dem Token-Halter) ein nicht signiertes Integer (dem Token-Halter) zu.
    // Erfahre mehr: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Events ermöglichen die Protokollierung von Aktivitäten auf der Blockchain.
    // Ethereum Clients können auf Events hören, um auf Änderungen des Contract-Zustands zu reagieren.
    // Erfahre mehr: https://solidity.readthedocs.io/de/v0.5.10/contracts. tml#Events
    event Transfer(address from, address to, uint amount);

    // Initialisiert die Vertragsdaten und setzt den `owner`
    // auf die Adresse des Contract-Erstellers.
    constructor() public {
    // Alle Smart Contracts benötigen externe Transaktionen, um Funktionen auszuführen.
        // `msg` ist eine globale Variable, die relevante Daten der gegebenen Transaktion enthält,
    // wie die Adresse des Senders und der in der Transaktion enthaltene ETH Wert.
        // Mehr erfahren: https://solidity.readthedocs.io/de/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Erstellt eine Menge neuer Tokens und sendet sie an eine Adresse.
    function mint(address receiver, uint amount) public {
        // `require` ist eine Kontrollstruktur, die benutzt wird, um bestimmte Bedingungen zu erzwingen.
        // Wenn eine `require` Anweisung zu `false` auswertet, wird eine Ausnahme ausgelöst,
        // welche alle Änderungen am Status während des aktuellen Aufrufs rückgängig macht.
        // Erfahren Sie mehr: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Nur der Vertragsinhaber kann diese Funktion aufrufen
        require(msg.sender == owner, "Sie sind nicht der Besitzer.");

        // Erzwingt eine maximale Menge an Token
        require(amount < 1e60, "Maximale Ausgabe überschritten");

        // Erhöht den Saldo von `Empfänger` um `Betrag`.
        balances[receiver] += amount;
    }

    // Sendet eine Menge vorhandener Token von einem beliebigen Anrufer an eine Adresse.
    function transfer(address receiver, uint amount) public {
        // Der Absender muss genug Token zum Senden besitzen
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // Tokensalden der beiden Adressen anpassen
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Sendet das zuvor definierte Event aus
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### Einzigartiges digitales Asset {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// Importiert Symbole aus anderen Dateien in den aktuellen Contract.
// In diesem Fall eine Reihe von Hilfsverträgen von OpenZeppelin.
// Erfahre mehr: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver. ol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// Das Schlüsselwort `is` wird verwendet, um Funktionen und Schlüsselwörter aus externen Smart Contracts zu erben.
// In diesem Fall erbt `CryptoPizza` von den `IERC721` und `ERC165` Contracts.
// Erfahre mehr: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Verwendet OpenZeppelins SafeMath Bibliothek, um arithmetische Operationen sicher durchzuführen.
    // Erfahre mehr: https://docs.openzeppelin.com/contracts/2. /api/math#SafeMath
    using SafeMath for uint256;

    // Konstante Zustandsvariablen in Solidity sind vergleichbar mit anderen Sprachen
    // du musst jedoch voneiner Expression zuweisen, die beim Kompilieren konstant ist.
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

        // note that address(0) is the zero address,
        // indicating that pizza[id] is not yet allocated to a particular user.

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
        // Erfahre mehr: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
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

    // Transferiert Pizza und deren Besitzanspruch auf eine andere Adresse
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Gibt ein Event aus, dass in dem importierten IERC721 Contract definiert ist
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Übergibt auf sichere Weise den Besitzanspruch von gegebener Token ID an eine andere Adresse
     * Wenn die Zieladresse ein Contract ist, muss dieser `onERC721Received` implementieren,
     * was bei einem sicheren Transfer aufgerufen wird und den magischen Wert zurückgibt:
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * ansonsten, wird die Transaktion abgewiesen.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * Übergibt auf sichere Weise den Besitzanspruch von gegebener Token ID an eine andere Adresse
     * Wenn die Zieladresse ein Contract ist, muss dieser `onERC721Received` implementieren,
     * was bei einem sicheren Transfer aufgerufen wird und den magischen Wert zurückgibt:
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * ansonsten, wird die Transaktion abgewiesen.
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
        // Siehe https://ethereum.stackexchange.com/a/14016/36603
        // für weitere Informationen zur Funktionsweise.
        // TO-DO Verifizieren Sie dies nochmals, bevor Serenity eingeführt wird
        //, da alle Adressen dann Contracts sein werden.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## Weiterführende Informationen {#further-reading}

Sehen Sie sich auch die Dokumentationen zu Solidity und Vyper an, um einen umfassenderen Überblick über Smart Contracts zu erhalten:

- [Solidity](https://solidity.readthedocs.io/)
- [Vyper](https://vyper.readthedocs.io/)

## Verwandte Themen {#related-topics}

- [Smart Contracts](/developers/docs/smart-contracts/)
- [Ethereum-Virtual Machine (EVM)](/developers/docs/evm/)

## Verwandte Tutorials {#related-tutorials}

- [Verkleinern von Verträgen, um die Vertragsgröße zu begrenzen](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Einige praktische Tipps zur Reduzierung der Größe Ihres Smart Contracts_
- [Protokollieren von Daten aus Smart Contracts mit Ereignissen](/developers/tutorials/logging-events-smart-contracts/) _– Eine Einführung in Smart-Contract-Ereigbnisse und wie Sie diese zur Datenprotokollierung verwenden können_
- [Mit anderen Verträgen aus Solidity interagieren](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– So können Sie einen Smart Contract aus einem bestehenden Vertrag aufbauen und mit ihm interagieren_
