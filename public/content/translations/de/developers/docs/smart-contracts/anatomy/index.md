---
title: Anatomie von Smart Contracts
description: "Ein tiefgreifender Einblick in die Anatomie eines Smart Contracts: Funktionen, Daten und Variablen"
lang: de
---

Ein Smart Contract ist ein Programm, das auf einer Adresse auf Ethereum läuft. Ein solcher Vertrag besteht aus Daten und Funktionen, die nach dem Erhalt einer Transaktion ausgeführt werden können. Hier ein Überblick darüber, was einen Smart Contract ausmacht.

## Voraussetzungen {#prerequisites}

Stellen Sie sicher, dass Sie sich zuerst über [Smart Contracts](/developers/docs/smart-contracts/) informiert haben. Die Informationen in diesem Dokument sind für Personen gedacht, die bereits mit Programmiersprachen wie JavaScript oder Python vertraut sind.

## Daten {#data}

Alle Vertragsdaten müssen einem Ort zugewiesen werden: entweder `storage` oder `memory`. Speicher in einem Smart Contract zu ändern ist ein kostenintensiver Prozess. Daher sollten Sie sich überlegen, wo Ihre Daten gespeichert werden sollen.

### Speicher {#storage}

Gleichbleibende Daten werden als Speicher oder Storage bezeichnet und über Zustandsvariablen dargestellt. Solche Daten werden dauerhaft auf der Blockchain gespeichert. Sie müssen den Typ deklarieren, damit der Contract beim Kompilieren verfolgen kann, wie viel Speicherplatz er auf der Blockchain benötigt.

```solidity
// Solidity-Beispiel
contract SimpleStorage {
    uint storedData; // Zustandsvariable
    // ...
}
```

```python
# Vyper example
storedData: int128
```

Wenn Sie bereits Erfahrung im Programmieren in objektorientierten Sprachen haben, werden Sie wahrscheinlich mit den meisten Typen vertraut sein. Allerdings sollte Ihnen `address` neu sein, wenn Sie neu in der Ethereum-Entwicklung sind.

Ein `address`-Typ kann eine Ethereum-Adresse aufnehmen, was 20 Bytes oder 160 Bits entspricht. Die Ausgabe erfolgt in hexadezimaler Schreibweise mit einem führenden 0x.

Andere Typen umfassen:

- boolesch
- Ganzzahl
- Festkommazahlen
- Byte-Arrays mit fester Größe
- Byte-Arrays mit dynamischer Größe
- rationale und ganzzahlige Literale
- Zeichenfolgenliterale
- hexadezimale Literale
- Enums

Weitere Erklärungen finden Sie in folgender Dokumentation:

- [Siehe Vyper-Typen](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Siehe Solidity-Typen](https://docs.soliditylang.org/en/latest/types.html#value-types)

### Speicher {#memory}

Werte, die nur für die Lebensdauer der Ausführung einer Vertragsfunktion gespeichert werden, werden als Memory Variables (Speichervariablen) bezeichnet. Da diese nicht dauerhaft auf der Blockchain gespeichert werden, sind sie wesentlich preiswerter.

Erfahren Sie in den [Solidity-Dokumenten](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack) mehr darüber, wie die EVM Daten speichert (Storage, Memory und der Stack).

### Umgebungsvariablen {#environment-variables}

Zusätzlich zu den Variablen, die Sie in Ihrem Vertrag definieren, gibt es einige spezielle globale Variablen. Sie werden in erster Linie verwendet, um Informationen über die Blockchain oder aktuelle Transaktion bereitzustellen.

Beispiele:

| **Eigenschaft**   | **Statusvariable** | **Beschreibung**                                             |
| ----------------- | ------------------ | ------------------------------------------------------------ |
| `block.timestamp` | uint256            | Aktueller Zeitstempel der Block-Epoche                       |
| `msg.sender`      | address            | Absender der Nachricht (aktueller Aufruf) |

## Funktionen {#functions}

Vereinfacht gesagt können Funktionen als Antwort auf eingehende Transaktionen Informationen erhalten oder festlegen.

Es gibt zwei Arten von Functionsaufrufen:

- `internal` – diese erzeugen keinen EVM-Aufruf
  - Auf interne Funktionen und Zustandsvariablen kann nur intern zugegriffen werden (d. h. aus dem aktuellen Vertrag oder von ihm abgeleiteten Verträgen)
- `external` – diese erzeugen einen EVM-Aufruf
  - Externe Funktionen sind Teil der Vertragsschnittstelle. Das bedeutet, dass sie aus anderen Verträgen und über Transaktionen aufgerufen werden können. Eine externe Funktion `f` kann nicht intern aufgerufen werden (d. h. `f()` funktioniert nicht, aber `this.f()` funktioniert).

Sie können auch `public` oder `private` sein

- `public`-Funktionen können intern aus dem Vertrag heraus oder extern über Nachrichten aufgerufen werden
- `private`-Funktionen sind nur für den Vertrag sichtbar, in dem sie definiert sind, und nicht in abgeleiteten Verträgen

Sowohl Funktionen als auch Statusvariablen können öffentlich oder privat gemacht werden.

Hier ist eine Funktion zum Aktualisieren einer Zustandsvariable für einen Smart Contract:

```solidity
// Solidity example
function update_name(string value) public {
    dapp_name = value;
}
```

- Der Parameter `value` vom Typ `string` wird an die Funktion übergeben: `update_name`
- Sie ist als `public` deklariert, was bedeutet, dass jeder darauf zugreifen kann
- Sie ist nicht als `view` deklariert, sodass sie den Vertragszustand ändern kann

### View-Funktionen {#view-functions}

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
2. [Auslösen von Ereignissen](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [Erstellen anderer Verträge](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. Verwenden von `selfdestruct`.
5. Ether über Aufrufe senden
6. Aufrufen von Funktionen, die nicht als `view` oder `pure` markiert sind.
7. Low-Level-Aufrufe verwenden
8. Inline-Assembly verwenden, die bestimmte Opcodes enthält

### Konstruktor-Funktionen {#constructor-functions}

`constructor`-Funktionen werden nur einmal ausgeführt, wenn der Vertrag zum ersten Mal bereitgestellt wird. Ähnlich wie der `constructor` in vielen klassenbasierten Programmiersprachen initialisieren diese Funktionen oft Zustandsvariablen mit ihren angegebenen Werten.

```solidity
// Solidity-Beispiel
// Initialisiert die Vertragsdaten und setzt den `owner`
// auf die Adresse des Vertragserstellers.
constructor() public {
    // Alle Smart Contracts sind auf externe Transaktionen angewiesen, um ihre Funktionen auszulösen.
    // `msg` ist eine globale Variable, die relevante Daten über die jeweilige Transaktion enthält,
    // wie z. B. die Adresse des Absenders und den in der Transaktion enthaltenen ETH-Wert.
    // Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
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

## Schreiben von Funktionen {#writing-functions}

Ihre Funktion benötigt folgende Elemente:

- Parametervariable und -typ (wenn Parameter akzeptiert werden)
- interne/externe Deklaration
- Deklaration von pure/view/payable
- Gibt den Typ zurück (wenn er einen Wert zurückgibt)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // Zustandsvariable

    // Wird aufgerufen, wenn der Vertrag bereitgestellt wird, und initialisiert den Wert
    constructor() public {
        dapp_name = "Meine Beispiel-Dapp";
    }

    // Get-Funktion
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Set-Funktion
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

Ein vollständiger Smart Contract könnte so aussehen. Hier liefert die `constructor`-Funktion einen Anfangswert für die Variable `dapp_name`.

## Ereignisse und Protokolle {#events-and-logs}

Ereignisse ermöglichen es Ihrem Smart Contract, mit Ihrem Frontend oder anderen abonnierenden Anwendungen zu kommunizieren. Sobald eine Transaktion validiert und einem Block hinzugefügt wurde, können Smart Contracts Ereignisse auslösen und Informationen protokollieren, die das Frontend dann verarbeiten und nutzen kann.

## Kommentierte Beispiele {#annotated-examples}

Das sind einige Beispiele in Solidity. Wenn Sie mit dem Code experimentieren möchten, können Sie in [Remix](http://remix.ethereum.org) mit ihnen interagieren.

### Hallo Welt {#hello-world}

```solidity
// Gibt die Version von Solidity an und verwendet die semantische Versionierung.
// Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Definiert einen Vertrag mit dem Namen `HelloWorld`.
// Ein Vertrag ist eine Sammlung von Funktionen und Daten (seinem Zustand).
// Nach der Bereitstellung befindet sich ein Vertrag an einer bestimmten Adresse auf der Ethereum-Blockchain.
// Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Deklariert eine Zustandsvariable `message` vom Typ `string`.
    // Zustandsvariablen sind Variablen, deren Werte dauerhaft im Vertragsspeicher gespeichert werden.
    // Das Schlüsselwort `public` macht Variablen von außerhalb eines Vertrags zugänglich
    // und erstellt eine Funktion, die andere Verträge oder Clients aufrufen können, um auf den Wert zuzugreifen.
    string public message;

    // Ähnlich wie in vielen klassenbasierten objektorientierten Sprachen ist ein Konstruktor
    // eine spezielle Funktion, die nur bei der Erstellung des Vertrags ausgeführt wird.
    // Konstruktoren werden verwendet, um die Daten des Vertrags zu initialisieren.
    // Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Akzeptiert ein Zeichenfolgen-Argument `initMessage` und setzt den Wert
        // in die `message`-Speichervariable des Vertrags).
        message = initMessage;
    }

    // Eine öffentliche Funktion, die ein Zeichenfolgen-Argument akzeptiert
    // und die `message`-Speichervariable aktualisiert.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### Token {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // Eine `address` ist mit einer E-Mail-Adresse vergleichbar – sie wird verwendet, um ein Konto auf Ethereum zu identifizieren.
    // Adressen können einen Smart Contract oder externe (Benutzer-)Konten darstellen.
    // Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // Ein `mapping` ist im Wesentlichen eine Hash-Tabellen-Datenstruktur.
    // Dieses `mapping` weist einer Adresse (dem Token-Inhaber) eine vorzeichenlose Ganzzahl (das Token-Guthaben) zu.
    // Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Ereignisse ermöglichen die Protokollierung von Aktivitäten auf der Blockchain.
    // Ethereum-Clients können auf Ereignisse lauschen, um auf Änderungen des Vertragszustands zu reagieren.
    // Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Initialisiert die Vertragsdaten und setzt den `owner`
    // auf die Adresse des Vertragserstellers.
    constructor() public {
        // Alle Smart Contracts sind auf externe Transaktionen angewiesen, um ihre Funktionen auszulösen.
        // `msg` ist eine globale Variable, die relevante Daten über die jeweilige Transaktion enthält,
        // wie z. B. die Adresse des Absenders und den in der Transaktion enthaltenen ETH-Wert.
        // Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Erstellt eine Menge neuer Tokens und sendet sie an eine Adresse.
    function mint(address receiver, uint amount) public {
        // `require` ist eine Kontrollstruktur, die zur Durchsetzung bestimmter Bedingungen verwendet wird.
        // Wenn eine `require`-Anweisung zu `false` ausgewertet wird, wird eine Ausnahme ausgelöst,
        // die alle während des aktuellen Aufrufs am Zustand vorgenommenen Änderungen rückgängig macht.
        // Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Nur der Vertragsinhaber kann diese Funktion aufrufen
        require(msg.sender == owner, "Sie sind nicht der Inhaber.");

        // Erzwingt eine maximale Menge an Tokens
        require(amount < 1e60, "Maximale Emission überschritten");

        // Erhöht das Guthaben von `receiver` um `amount`
        balances[receiver] += amount;
    }

    // Sendet eine Menge bestehender Tokens von einem beliebigen Aufrufer an eine Adresse.
    function transfer(address receiver, uint amount) public {
        // Der Absender muss über genügend Tokens verfügen, um sie zu senden
        require(amount <= balances[msg.sender], "Ungenügendes Guthaben.");

        // Passt die Token-Guthaben der beiden Adressen an
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Löst das zuvor definierte Ereignis aus
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### Einzigartiger digitaler Vermögenswert {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// Importiert Symbole aus anderen Dateien in den aktuellen Vertrag.
// In diesem Fall eine Reihe von Hilfsverträgen von OpenZeppelin.
// Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// Das Schlüsselwort `is` wird verwendet, um Funktionen und Schlüsselwörter von externen Verträgen zu erben.
// In diesem Fall erbt `CryptoPizza` von den Verträgen `IERC721` und `ERC165`.
// Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Verwendet die SafeMath-Bibliothek von OpenZeppelin, um arithmetische Operationen sicher durchzuführen.
    // Mehr erfahren: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Konstante Zustandsvariablen in Solidity sind ähnlich wie in anderen Sprachen,
    // aber Sie müssen sie aus einem Ausdruck zuweisen, der zur Kompilierungszeit konstant ist.
    // Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Mit Struct-Typen können Sie Ihren eigenen Typ definieren
    // Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Erstellt ein leeres Array von Pizza-Structs
    Pizza[] public pizzas;

    // Mapping von der Pizza-ID zur Adresse ihres Besitzers
    mapping(uint256 => address) public pizzaToOwner;

    // Mapping von der Adresse des Besitzers zur Anzahl der besessenen Tokens
    mapping(address => uint256) public ownerPizzaCount;

    // Mapping von der Token-ID zur genehmigten Adresse
    mapping(uint256 => address) pizzaApprovals;

    // Sie können Mappings verschachteln, dieses Beispiel bildet Besitzer auf Betreibergenehmigungen ab
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Interne Funktion zum Erstellen einer zufälligen Pizza aus einer Zeichenfolge (Name) und DNA
    function _createPizza(string memory _name, uint256 _dna)
        // Das Schlüsselwort `internal` bedeutet, dass diese Funktion nur
        // innerhalb dieses Vertrags und von Verträgen, die von diesem Vertrag abgeleitet sind, sichtbar ist
        // Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` ist ein Funktionsmodifikator, der prüft, ob die Pizza bereits existiert
        // Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Fügt Pizza zum Array von Pizzen hinzu und erhält die ID
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Überprüft, ob der Pizzabesitzer mit dem aktuellen Benutzer identisch ist
        // Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // beachten Sie, dass address(0) die Null-Adresse ist,
        // was anzeigt, dass pizza[id] noch keinem bestimmten Benutzer zugewiesen ist.

        assert(pizzaToOwner[id] == address(0));

        // Ordnet die Pizza dem Besitzer zu
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Erstellt eine zufällige Pizza aus einer Zeichenfolge (Name)
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Erzeugt eine zufällige DNA aus einer Zeichenfolge (Name) und der Adresse des Besitzers (Erstellers)
    function generateRandomDna(string memory _str, address _owner)
        public
        // Funktionen, die als `pure` markiert sind, versprechen, den Zustand weder zu lesen noch zu verändern
        // Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Erzeugt eine zufällige uint aus einer Zeichenfolge (Name) + Adresse (Besitzer)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Gibt ein Array von Pizzen zurück, die nach Besitzer gefunden wurden
    function getPizzasByOwner(address _owner)
        public
        // Funktionen, die als `view` markiert sind, versprechen, den Zustand nicht zu verändern
        // Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Verwendet den Speicherort `memory`, um Werte nur für den
        // Lebenszyklus dieses Funktionsaufrufs zu speichern.
        // Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
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

    // Überträgt Pizza und Besitz an eine andere Adresse
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Ungültige Adresse.");
        require(_exists(_pizzaId), "Pizza existiert nicht.");
        require(_from != _to, "Kann nicht an dieselbe Adresse übertragen werden.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Adresse ist nicht genehmigt.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Löst ein Ereignis aus, das im importierten IERC721-Vertrag definiert ist
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Überträgt den Besitz einer bestimmten Token-ID sicher an eine andere Adresse
     * Wenn die Zieladresse ein Vertrag ist, muss sie `onERC721Received` implementieren,
     * was bei einer sicheren Übertragung aufgerufen wird, und den magischen Wert
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))` zurückgeben;
     * andernfalls wird die Übertragung rückgängig gemacht.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * Überträgt den Besitz einer bestimmten Token-ID sicher an eine andere Adresse
     * Wenn die Zieladresse ein Vertrag ist, muss sie `onERC721Received` implementieren,
     * was bei einer sicheren Übertragung aufgerufen wird, und den magischen Wert
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))` zurückgeben;
     * andernfalls wird die Übertragung rückgängig gemacht.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Muss onERC721Received implementieren.");
    }

    /**
     * Interne Funktion zum Aufrufen von `onERC721Received` auf einer Zieladresse
     * Der Aufruf wird nicht ausgeführt, wenn die Zieladresse kein Vertrag ist
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

    // Verbrennt eine Pizza – zerstört den Token vollständig
    // Der Funktionsmodifikator `external` bedeutet, dass diese Funktion
    // Teil der Vertragsschnittstelle ist und andere Verträge sie aufrufen können
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "Ungültige Adresse.");
        require(_exists(_pizzaId), "Pizza existiert nicht.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Adresse ist nicht genehmigt.");

        ownerPizzaCount[msg.sender] = SafeMath.sub(
            ownerPizzaCount[msg.sender],
            1
        );
        pizzaToOwner[_pizzaId] = address(0);
    }

    // Gibt die Anzahl der Pizzen nach Adresse zurück
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Gibt den Besitzer der Pizza zurück, die nach ID gefunden wurde
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Ungültige Pizza-ID.");
        return owner;
    }

    // Genehmigt eine andere Adresse, um den Besitz der Pizza zu übertragen
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Muss der Pizzabesitzer sein.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Gibt die genehmigte Adresse für eine bestimmte Pizza zurück
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza existiert nicht.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Private Funktion, um die aktuelle Genehmigung für eine bestimmte Token-ID zu löschen
     * Macht die Aktion rückgängig, wenn die angegebene Adresse nicht tatsächlich der Besitzer des Tokens ist
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Muss Pizzabesitzer sein.");
        require(_exists(_pizzaId), "Pizza existiert nicht.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Setzt oder hebt die Genehmigung eines bestimmten Betreibers auf
     * Ein Betreiber darf alle Tokens des Absenders in dessen Namen übertragen
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Eigene Adresse kann nicht genehmigt werden");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Gibt an, ob ein Betreiber von einem bestimmten Besitzer genehmigt ist
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Übernimmt den Besitz der Pizza – nur für genehmigte Benutzer
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Adresse ist nicht genehmigt.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Prüft, ob Pizza existiert
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Prüft, ob die Adresse der Besitzer ist oder für die Übertragung der Pizza genehmigt ist
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Deaktiviere die Solium-Prüfung wegen
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // Prüfen, ob die Pizza einzigartig ist und noch nicht existiert
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
        require(result, "Pizza mit diesem Namen existiert bereits.");
        _;
    }

    // Gibt zurück, ob die Zieladresse ein Vertrag ist
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // Derzeit gibt es keine bessere Möglichkeit zu prüfen, ob es einen Vertrag an einer Adresse gibt,
        // als die Größe des Codes an dieser Adresse zu prüfen.
        // Siehe https://ethereum.stackexchange.com/a/14016/36603
        // für weitere Details zur Funktionsweise.
        // TODO Dies vor der Serenity-Version erneut prüfen, da dann alle Adressen
        // Verträge sein werden.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## Weiterführende Lektüre {#further-reading}

Sehen Sie sich auch die Dokumentationen zu Solidity und Vyper an, um einen umfassenderen Überblick über Smart Contracts zu erhalten:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## Verwandte Themen {#related-topics}

- [Smart Contracts](/developers/docs/smart-contracts/)
- [Ethereum Virtual Machine](/developers/docs/evm/)

## Verwandte Tutorials {#related-tutorials}

- [Verkleinern von Verträgen, um das Vertraggrößenlimit zu bekämpfen](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Einige praktische Tipps zur Reduzierung der Größe Ihres Smart Contracts._
- [Protokollierung von Daten aus Smart Contracts mit Ereignissen](/developers/tutorials/logging-events-smart-contracts/) _– Eine Einführung in Smart-Contract-Ereignisse und wie Sie diese zur Datenprotokollierung verwenden können._
- [Mit anderen Verträgen aus Solidity interagieren](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Wie man einen Smart Contract aus einem bestehenden Vertrag bereitstellt und mit ihm interagiert._
