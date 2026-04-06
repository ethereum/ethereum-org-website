---
title: Anatomie von Smart Contracts
description: "Ein detaillierter Blick auf die Anatomie eines Smart Contracts – die Funktionen, Daten und Variablen."
lang: de
---

Ein Smart Contract ist ein Programm, das unter einer Adresse auf Ethereum läuft. Sie bestehen aus Daten und Funktionen, die nach Erhalt einer Transaktion ausgeführt werden können. Hier ist ein Überblick darüber, woraus ein Smart Contract besteht.

## Voraussetzungen {#prerequisites}

Stellen Sie sicher, dass Sie zuerst über [Smart Contracts](/developers/docs/smart-contracts/) gelesen haben. Dieses Dokument setzt voraus, dass Sie bereits mit Programmiersprachen wie JavaScript oder Python vertraut sind.

## Daten {#data}

Alle Vertragsdaten müssen einem Speicherort zugewiesen werden: entweder `storage` (Speicher) oder `memory` (Arbeitsspeicher). Es ist teuer, den Speicher in einem Smart Contract zu ändern, daher müssen Sie sich überlegen, wo Ihre Daten abgelegt werden sollen.

### Storage {#storage}

Persistente Daten werden als Storage bezeichnet und durch Zustandsvariablen (State Variables) repräsentiert. Diese Werte werden dauerhaft auf der Blockchain gespeichert. Sie müssen den Typ deklarieren, damit der Vertrag beim Kompilieren nachverfolgen kann, wie viel Speicherplatz er auf der Blockchain benötigt.

```solidity
// Solidity-Beispiel
contract SimpleStorage {
    uint storedData; // Zustandsvariable
    // ...
}
```

```python
# Vyper-Beispiel
storedData: int128
```

Wenn Sie bereits in objektorientierten Sprachen programmiert haben, werden Ihnen die meisten Typen wahrscheinlich vertraut sein. `address` sollte jedoch neu für Sie sein, wenn Sie neu in der [Ethereum](/)-Entwicklung sind.

Ein `address`-Typ kann eine Ethereum-Adresse aufnehmen, was 20 Bytes oder 160 Bits entspricht. Sie wird in hexadezimaler Schreibweise mit einem führenden 0x zurückgegeben.

Weitere Typen sind:

- Boolean (Wahrheitswerte)
- Integer (Ganzzahlen)
- Fixed Point Numbers (Festkommazahlen)
- Fixed-size Byte Arrays (Byte-Arrays fester Größe)
- Dynamically sized Byte Arrays (Byte-Arrays dynamischer Größe)
- Rational and Integer Literals (Rationale und ganzzahlige Literale)
- String Literals (Zeichenketten-Literale)
- Hexadecimal Literals (Hexadezimale Literale)
- Enums (Aufzählungstypen)

Für weitere Erklärungen werfen Sie einen Blick in die Dokumentation:

- [Siehe Vyper-Typen](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Siehe Solidity-Typen](https://docs.soliditylang.org/en/latest/types.html#value-types)

### Memory {#memory}

Werte, die nur für die Lebensdauer der Ausführung einer Vertragsfunktion gespeichert werden, nennt man Memory-Variablen. Da diese nicht dauerhaft auf der Blockchain gespeichert werden, sind sie in der Nutzung viel günstiger.

Erfahren Sie mehr darüber, wie die EVM Daten speichert (Storage, Memory und der Stack) in der [Solidity-Dokumentation](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack).

### Umgebungsvariablen {#environment-variables}

Zusätzlich zu den Variablen, die Sie in Ihrem Vertrag definieren, gibt es einige spezielle globale Variablen. Sie werden hauptsächlich verwendet, um Informationen über die Blockchain oder die aktuelle Transaktion bereitzustellen.

Beispiele:

| **Eigenschaft**   | **Zustandsvariable** | **Beschreibung**                               |
| ----------------- | -------------------- | ---------------------------------------------- |
| `block.timestamp` | uint256              | Aktueller Block-Epochen-Zeitstempel            |
| `msg.sender`      | address              | Absender der Nachricht (aktueller Aufruf)      |

## Funktionen {#functions}

Vereinfacht gesagt können Funktionen als Reaktion auf eingehende Transaktionen Informationen abrufen oder festlegen.

Es gibt zwei Arten von Funktionsaufrufen:

- `internal` – diese erzeugen keinen EVM-Aufruf
  - Auf interne Funktionen und Zustandsvariablen kann nur intern zugegriffen werden (d. h. aus dem aktuellen Vertrag oder aus Verträgen, die davon abgeleitet sind).
- `external` – diese erzeugen einen EVM-Aufruf
  - Externe Funktionen sind Teil der Vertragsschnittstelle, was bedeutet, dass sie von anderen Verträgen und über Transaktionen aufgerufen werden können. Eine externe Funktion `f` kann nicht intern aufgerufen werden (d. h. `f()` funktioniert nicht, aber `this.f()` funktioniert).

Sie können auch `public` oder `private` sein:

- `public`-Funktionen können intern aus dem Vertrag heraus oder extern über Nachrichten aufgerufen werden.
- `private`-Funktionen sind nur für den Vertrag sichtbar, in dem sie definiert sind, und nicht in abgeleiteten Verträgen.

Sowohl Funktionen als auch Zustandsvariablen können öffentlich (public) oder privat (private) gemacht werden.

Hier ist eine Funktion zum Aktualisieren einer Zustandsvariablen in einem Vertrag:

```solidity
// Solidity-Beispiel
function update_name(string value) public {
    dapp_name = value;
}
```

- Der Parameter `value` vom Typ `string` wird an die Funktion übergeben: `update_name`
- Sie ist als `public` deklariert, was bedeutet, dass jeder darauf zugreifen kann.
- Sie ist nicht als `view` deklariert, kann also den Vertragszustand ändern.

### View-Funktionen {#view-functions}

Diese Funktionen versprechen, den Zustand der Vertragsdaten nicht zu verändern. Häufige Beispiele sind "Getter"-Funktionen – Sie könnten diese beispielsweise verwenden, um das Guthaben eines Benutzers abzurufen.

```solidity
// Solidity-Beispiel
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

Was als Änderung des Zustands gilt:

1. Schreiben in Zustandsvariablen.
2. [Ausgeben von Ereignissen (Events)](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [Erstellen anderer Verträge](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. Verwendung von `selfdestruct`.
5. Senden von Ether über Aufrufe (Calls).
6. Aufrufen einer Funktion, die nicht als `view` oder `pure` markiert ist.
7. Verwendung von Low-Level-Aufrufen.
8. Verwendung von Inline-Assembly, das bestimmte Opcodes enthält.

### Konstruktor-Funktionen {#constructor-functions}

`constructor`-Funktionen werden nur einmal ausgeführt, wenn der Vertrag zum ersten Mal bereitgestellt wird. Wie der `constructor` in vielen klassenbasierten Programmiersprachen initialisieren diese Funktionen oft Zustandsvariablen auf ihre angegebenen Werte.

```solidity
// Solidity-Beispiel
// Initialisiert die Daten des Vertrags und setzt den `owner`
// auf die Adresse des Vertragserstellers.
constructor() public {
    // Alle Smart Contracts sind auf externe Transaktionen angewiesen, um ihre Funktionen auszulösen.
    // `msg` ist eine globale Variable, die relevante Daten zur jeweiligen Transaktion enthält,
    // wie die Adresse des Absenders und den in der Transaktion enthaltenen ETH-Wert.
    // Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Vyper-Beispiel

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### Eingebaute Funktionen {#built-in-functions}

Zusätzlich zu den Variablen und Funktionen, die Sie in Ihrem Vertrag definieren, gibt es einige spezielle eingebaute Funktionen. Das offensichtlichste Beispiel ist:

- `address.send()` – Solidity
- `send(address)` – Vyper

Diese ermöglichen es Verträgen, ETH an andere Konten zu senden.

## Funktionen schreiben {#writing-functions}

Ihre Funktion benötigt:

- Parametervariable und Typ (wenn sie Parameter akzeptiert)
- Deklaration von internal/external
- Deklaration von pure/view/payable
- Rückgabetyp (wenn sie einen Wert zurückgibt)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // Zustandsvariable

    // Wird aufgerufen, wenn der Vertrag bereitgestellt wird, und initialisiert den Wert
    constructor() public {
        dapp_name = "My Example dapp";
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

Ein vollständiger Vertrag könnte in etwa so aussehen. Hier liefert die `constructor`-Funktion einen Anfangswert für die Variable `dapp_name`.

## Ereignisse und Protokolle {#events-and-logs}

Ereignisse (Events) ermöglichen es Ihrem Smart Contract, mit Ihrem Frontend oder anderen abonnierenden Anwendungen zu kommunizieren. Sobald eine Transaktion validiert und einem Block hinzugefügt wurde, können Smart Contracts Ereignisse ausgeben und Informationen protokollieren, die das Frontend dann verarbeiten und nutzen kann.

## Kommentierte Beispiele {#annotated-examples}

Dies sind einige in Solidity geschriebene Beispiele. Wenn Sie mit dem Code spielen möchten, können Sie in [Remix](http://remix.ethereum.org) mit ihnen interagieren.

### Hello World {#hello-world}

```solidity
// Gibt die Solidity-Version unter Verwendung semantischer Versionierung an.
// Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Definiert einen Vertrag namens `HelloWorld`.
// Ein Vertrag ist eine Sammlung von Funktionen und Daten (seinem Zustand).
// Sobald er bereitgestellt ist, befindet sich ein Vertrag an einer bestimmten Adresse auf der Ethereum-Blockchain.
// Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Deklariert eine Zustandsvariable `message` vom Typ `string`.
    // Zustandsvariablen sind Variablen, deren Werte dauerhaft im Vertragsspeicher gespeichert werden.
    // Das Schlüsselwort `public` macht Variablen von außerhalb eines Vertrags zugänglich
    // und erstellt eine Funktion, die andere Verträge oder Clients aufrufen können, um auf den Wert zuzugreifen.
    string public message;

    // Ähnlich wie in vielen klassenbasierten objektorientierten Sprachen ist ein Konstruktor
    // eine spezielle Funktion, die nur bei der Vertragserstellung ausgeführt wird.
    // Konstruktoren werden verwendet, um die Daten des Vertrags zu initialisieren.
    // Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Akzeptiert ein String-Argument `initMessage` und setzt den Wert
        // in die Speichervariable `message` des Vertrags).
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
    // Eine `address` ist vergleichbar mit einer E-Mail-Adresse - sie wird verwendet, um ein Konto auf Ethereum zu identifizieren.
    // Adressen können einen Smart Contract oder externe (Benutzer-)Konten repräsentieren.
    // Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // Ein `mapping` ist im Wesentlichen eine Hash-Tabellen-Datenstruktur.
    // Dieses `mapping` weist einer Adresse (dem Token-Inhaber) eine vorzeichenlose Ganzzahl (den Token-Kontostand) zu.
    // Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Ereignisse (Events) ermöglichen die Protokollierung von Aktivitäten auf der Blockchain.
    // Ethereum-Clients können auf Ereignisse lauschen, um auf Änderungen des Vertragszustands zu reagieren.
    // Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Initialisiert die Daten des Vertrags und setzt den `owner`
    // auf die Adresse des Vertragserstellers.
    constructor() public {
        // Alle Smart Contracts sind auf externe Transaktionen angewiesen, um ihre Funktionen auszulösen.
        // `msg` ist eine globale Variable, die relevante Daten zur jeweiligen Transaktion enthält,
        // wie die Adresse des Absenders und den in der Transaktion enthaltenen ETH-Wert.
        // Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Erstellt eine Menge neuer Token und sendet sie an eine Adresse.
    function mint(address receiver, uint amount) public {
        // `require` ist eine Kontrollstruktur, die verwendet wird, um bestimmte Bedingungen zu erzwingen.
        // Wenn eine `require`-Anweisung als `false` ausgewertet wird, wird eine Ausnahme ausgelöst,
        // die alle Änderungen rückgängig macht, die während des aktuellen Aufrufs am Zustand vorgenommen wurden.
        // Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Nur der Vertragseigentümer kann diese Funktion aufrufen
        require(msg.sender == owner, "You are not the owner.");

        // Erzwingt eine maximale Menge an Token
        require(amount < 1e60, "Maximum issuance exceeded");

        // Erhöht den Kontostand von `receiver` um `amount`
        balances[receiver] += amount;
    }

    // Sendet eine Menge existierender Token von einem beliebigen Aufrufer an eine Adresse.
    function transfer(address receiver, uint amount) public {
        // Der Absender muss genügend Token zum Senden haben
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // Passt die Token-Kontostände der beiden Adressen an
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
    // aber Sie müssen aus einem Ausdruck zuweisen, der zur Kompilierzeit konstant ist.
    // Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Struct-Typen ermöglichen es Ihnen, Ihren eigenen Typ zu definieren
    // Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Erstellt ein leeres Array von Pizza-Structs
    Pizza[] public pizzas;

    // Mapping von der Pizza-ID zur Adresse ihres Eigentümers
    mapping(uint256 => address) public pizzaToOwner;

    // Mapping von der Adresse des Eigentümers zur Anzahl der besessenen Token
    mapping(address => uint256) public ownerPizzaCount;

    // Mapping von der Token-ID zur genehmigten Adresse
    mapping(uint256 => address) pizzaApprovals;

    // Sie können Mappings verschachteln, dieses Beispiel mappt Eigentümer auf Operator-Genehmigungen
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Interne Funktion, um eine zufällige Pizza aus einem String (Name) und DNA zu erstellen
    function _createPizza(string memory _name, uint256 _dna)
        // Das Schlüsselwort `internal` bedeutet, dass diese Funktion nur sichtbar ist
        // innerhalb dieses Vertrags und Verträgen, die von diesem Vertrag abgeleitet sind
        // Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` ist ein Funktionsmodifikator, der überprüft, ob die Pizza bereits existiert
        // Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Fügt Pizza zum Array von Pizzen hinzu und ruft die ID ab
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Überprüft, ob der Pizza-Eigentümer derselbe wie der aktuelle Benutzer ist
        // Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // beachten Sie, dass address(0) die Null-Adresse ist,
        // was anzeigt, dass pizza[id] noch keinem bestimmten Benutzer zugewiesen ist.

        assert(pizzaToOwner[id] == address(0));

        // Mappt die Pizza auf den Eigentümer
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Erstellt eine zufällige Pizza aus einem String (Name)
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Generiert zufällige DNA aus einem String (Name) und der Adresse des Eigentümers (Erstellers)
    function generateRandomDna(string memory _str, address _owner)
        public
        // Als `pure` markierte Funktionen versprechen, den Zustand weder zu lesen noch zu ändern
        // Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Generiert einen zufälligen uint aus String (Name) + Adresse (Eigentümer)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Gibt ein Array von Pizzen zurück, die vom Eigentümer gefunden wurden
    function getPizzasByOwner(address _owner)
        public
        // Als `view` markierte Funktionen versprechen, den Zustand nicht zu ändern
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

    // Überträgt Pizza und Eigentum an eine andere Adresse
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Löst das im importierten IERC721-Vertrag definierte Ereignis aus
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /* *
     * Überträgt sicher das Eigentum einer bestimmten Token-ID an eine andere Adresse
     * Wenn die Zieladresse ein Vertrag ist, muss sie `onERC721Received` implementieren,
     * was bei einer sicheren Übertragung aufgerufen wird, und den magischen Wert
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))` zurückgeben;
     * andernfalls wird die Übertragung rückgängig gemacht. */
    






    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /* *
     * Überträgt sicher das Eigentum einer bestimmten Token-ID an eine andere Adresse
     * Wenn die Zieladresse ein Vertrag ist, muss sie `onERC721Received` implementieren,
     * was bei einer sicheren Übertragung aufgerufen wird, und den magischen Wert
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))` zurückgeben;
     * andernfalls wird die Übertragung rückgängig gemacht. */
    






    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Must implement onERC721Received.");
    }

    /* *
     * Interne Funktion, um `onERC721Received` auf einer Zieladresse aufzurufen
     * Der Aufruf wird nicht ausgeführt, wenn die Zieladresse kein Vertrag ist */
    



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

    // Verbrennt eine Pizza - zerstört den Token vollständig
    // Der Funktionsmodifikator `external` bedeutet, dass diese Funktion
    // Teil der Vertragsschnittstelle ist und andere Verträge sie aufrufen können
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

    // Gibt die Anzahl der Pizzen nach Adresse zurück
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Gibt den Eigentümer der Pizza zurück, die anhand der ID gefunden wurde
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // Genehmigt einer anderen Adresse, das Eigentum an der Pizza zu übertragen
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Gibt die genehmigte Adresse für eine bestimmte Pizza zurück
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /* *
     * Private Funktion, um die aktuelle Genehmigung einer bestimmten Token-ID zu löschen
     * Wird rückgängig gemacht, wenn die angegebene Adresse nicht tatsächlich der Eigentümer des Tokens ist */
    



    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /* * Setzt oder hebt die Genehmigung eines bestimmten Operators auf
     * Ein Operator darf alle Token des Absenders in dessen Namen übertragen */
    



    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Gibt an, ob ein Operator von einem bestimmten Eigentümer genehmigt ist
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Übernimmt das Eigentum an der Pizza - nur für genehmigte Benutzer
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Überprüft, ob die Pizza existiert
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Überprüft, ob die Adresse der Eigentümer ist oder genehmigt ist, die Pizza zu übertragen
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Deaktiviert die Solium-Prüfung wegen
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // Überprüft, ob die Pizza einzigartig ist und noch nicht existiert
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

    // Gibt zurück, ob die Zieladresse ein Vertrag ist
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // Derzeit gibt es keinen besseren Weg, um zu überprüfen, ob sich an einer Adresse ein Vertrag befindet,
        // als die Größe des Codes an dieser Adresse zu überprüfen.
        // Siehe https://ethereum.stackexchange.com/a/14016/36603
        // für weitere Details darüber, wie dies funktioniert.
        // TODO Dies vor dem Serenity-Release noch einmal überprüfen, da dann alle Adressen
        // Verträge sein werden.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## Weiterführende Literatur {#further-reading}

Sehen Sie sich die Dokumentation von Solidity und Vyper an, um einen vollständigeren Überblick über Smart Contracts zu erhalten:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## Verwandte Themen {#related-topics}

- [Smart Contracts](/developers/docs/smart-contracts/)
- [Ethereum Virtual Machine](/developers/docs/evm/)

## Verwandte Tutorials {#related-tutorials}

- [Verkleinerung von Verträgen zur Bekämpfung des Vertragslimit](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Einige praktische Tipps zur Reduzierung der Größe Ihres Smart Contracts._
- [Protokollieren von Daten aus Smart Contracts mit Ereignissen](/developers/tutorials/logging-events-smart-contracts/) _– Eine Einführung in Smart-Contract-Ereignisse und wie Sie diese zur Protokollierung von Daten verwenden können._
- [Interaktion mit anderen Verträgen aus Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Wie man einen Smart Contract aus einem bestehenden Vertrag bereitstellt und mit ihm interagiert._