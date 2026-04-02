---
title: Smart-Contract-Sprachen
description: "Ein Überblick und Vergleich der beiden wichtigsten Smart-Contract-Sprachen – Solidity und Vyper."
lang: de
---

Ein großartiger Aspekt von [Ethereum](/) ist, dass Smart Contracts mit relativ entwicklerfreundlichen Sprachen programmiert werden können. Wenn Sie Erfahrung mit Python oder einer anderen [Programmiersprache mit geschweiften Klammern](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages) haben, werden Sie eine Sprache mit vertrauter Syntax finden.

Die beiden aktivsten und am besten gepflegten Sprachen sind:

- Solidity
- Vyper

Die Remix IDE bietet eine umfassende Entwicklungsumgebung zum Erstellen und Testen von Verträgen in Solidity und Vyper. [Probieren Sie die browserbasierte Remix IDE aus](https://remix.ethereum.org), um mit dem Programmieren zu beginnen.

Erfahrenere Entwickler möchten vielleicht auch Yul verwenden, eine Zwischensprache für die [Ethereum Virtual Machine](/developers/docs/evm/), oder Yul+, eine Erweiterung von Yul.

Wenn Sie neugierig sind und dabei helfen möchten, neue Sprachen zu testen, die sich noch in der intensiven Entwicklung befinden, können Sie mit Fe experimentieren, einer aufstrebenden Smart-Contract-Sprache, die noch in den Kinderschuhen steckt.

## Voraussetzungen {#prerequisites}

Vorkenntnisse in Programmiersprachen, insbesondere in JavaScript oder Python, können Ihnen helfen, die Unterschiede zwischen Smart-Contract-Sprachen zu verstehen. Wir empfehlen Ihnen außerdem, Smart Contracts als Konzept zu verstehen, bevor Sie sich zu tief in die Sprachvergleiche einarbeiten. [Einführung in Smart Contracts](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Objektorientierte Hochsprache zur Implementierung von Smart Contracts.
- Sprache mit geschweiften Klammern, die am stärksten von C++ beeinflusst wurde.
- Statisch typisiert (der Typ einer Variablen ist zur Kompilierzeit bekannt).
- Unterstützt:
  - Vererbung (Sie können andere Verträge erweitern).
  - Bibliotheken (Sie können wiederverwendbaren Code erstellen, den Sie aus verschiedenen Verträgen aufrufen können – wie statische Funktionen in einer statischen Klasse in anderen objektorientierten Programmiersprachen).
  - Komplexe benutzerdefinierte Typen.

### Wichtige Links {#important-links}

- [Dokumentation](https://docs.soliditylang.org/en/latest/)
- [Solidity-Sprachportal](https://soliditylang.org/)
- [Solidity by Example](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter-Chatroom](https://gitter.im/ethereum/solidity) überbrückt zum [Solidity Matrix-Chatroom](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Spickzettel (Cheat Sheet)](https://reference.auditless.com/cheatsheet)
- [Solidity-Blog](https://blog.soliditylang.org/)
- [Solidity auf Twitter](https://twitter.com/solidity_lang)

### Beispielvertrag {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // Das Schlüsselwort "public" macht Variablen
    // von anderen Verträgen aus zugänglich
    address public minter;
    mapping (address => uint) public balances;

    // Ereignisse ermöglichen es Clients, auf bestimmte
    // von Ihnen deklarierte Vertragsänderungen zu reagieren
    event Sent(address from, address to, uint amount);

    // Konstruktor-Code wird nur ausgeführt, wenn der Vertrag
    // erstellt wird
    constructor() {
        minter = msg.sender;
    }

    // Sendet eine Menge neu erstellter Coins an eine Adresse
    // Kann nur vom Vertragsersteller aufgerufen werden
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Sendet eine Menge existierender Coins
    // von einem beliebigen Aufrufer an eine Adresse
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Dieses Beispiel soll Ihnen ein Gefühl dafür geben, wie die Syntax von Solidity-Verträgen aussieht. Für eine detailliertere Beschreibung der Funktionen und Variablen [siehe die Dokumentation](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Pythonische Programmiersprache
- Strenge Typisierung
- Kleiner und verständlicher Compiler-Code
- Effiziente Bytecode-Generierung
- Hat absichtlich weniger Funktionen als Solidity mit dem Ziel, Verträge sicherer und einfacher zu prüfen (auditieren) zu machen. Vyper unterstützt Folgendes nicht:
  - Modifikatoren (Modifiers)
  - Vererbung
  - Inline-Assembly
  - Funktionsüberladung
  - Operatorüberladung
  - Rekursive Aufrufe
  - Endlosschleifen
  - Binäre Festkommazahlen

Für weitere Informationen [lesen Sie die Grundprinzipien von Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Wichtige Links {#important-links-1}

- [Dokumentation](https://vyper.readthedocs.io)
- [Vyper by Example](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [Mehr Vyper by Example](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyper-Community Discord-Chat](https://discord.gg/SdvKC79cJk)
- [Spickzettel (Cheat Sheet)](https://reference.auditless.com/cheatsheet)
- [Frameworks und Tools zur Smart-Contract-Entwicklung für Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk – lernen Sie, Vyper Smart Contracts zu sichern und zu hacken](https://github.com/SupremacyTeam/VyperPunk)
- [Vyper Hub für die Entwicklung](https://github.com/zcor/vyper-dev)
- [Vyper Greatest Hits Smart-Contract-Beispiele](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Awesome Vyper – kuratierte Ressourcen](https://github.com/spadebuilders/awesome-vyper)

### Beispiel {#example}

```python
# Offene Auktion

# Auktionsparameter
# Begünstigter erhält Geld vom Höchstbietenden
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Aktueller Status der Auktion
highestBidder: public(address)
highestBid: public(uint256)

# Wird am Ende auf true gesetzt, verbietet jegliche Änderung
ended: public(bool)

# Rückerstattete Gebote nachverfolgen, damit wir dem Auszahlungsmuster folgen können
pendingReturns: public(HashMap[address, uint256])

# Erstelle eine einfache Auktion mit `_bidding_time`
# Sekunden Bietzeit im Namen der
# Begünstigten-Adresse `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Biete bei der Auktion mit dem gesendeten Wert
# zusammen mit dieser Transaktion.
# Der Wert wird nur zurückerstattet, wenn die
# Auktion nicht gewonnen wird.
@external
@payable
def bid():
    # Prüfe, ob die Bietzeit abgelaufen ist.
    assert block.timestamp < self.auctionEnd
    # Prüfe, ob das Gebot hoch genug ist
    assert msg.value > self.highestBid
    # Verfolge die Rückerstattung für den vorherigen Höchstbietenden
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Verfolge neues Höchstgebot
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Ein zuvor zurückerstattetes Gebot abheben. Das Auszahlungsmuster wird
# hier verwendet, um ein Sicherheitsproblem zu vermeiden. Wenn Rückerstattungen direkt
# als Teil von bid() gesendet würden, könnte ein bösartiger Biet-Vertrag
# diese Rückerstattungen blockieren und somit das Eingehen neuer, höherer Gebote verhindern.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# Beende die Auktion und sende das Höchstgebot
# an den Begünstigten.
@external
def endAuction():
    # Es ist eine gute Richtlinie, Funktionen, die mit
    # anderen Verträgen interagieren (d.h. sie rufen Funktionen auf oder senden Ether),
    # in drei Phasen zu strukturieren:
    # 1. Bedingungen prüfen
    # 2. Aktionen ausführen (möglicherweise Bedingungen ändern)
    # 3. Interaktion mit anderen Verträgen
    # Wenn diese Phasen vermischt werden, könnte der andere Vertrag
    # in den aktuellen Vertrag zurückrufen und den Zustand ändern oder bewirken,
    # dass Effekte (Ether-Auszahlung) mehrfach ausgeführt werden.
    # Wenn intern aufgerufene Funktionen Interaktionen mit externen
    # Verträgen beinhalten, müssen sie ebenfalls als Interaktion mit
    # externen Verträgen betrachtet werden.

    # 1. Bedingungen
    # Prüfe, ob die Endzeit der Auktion erreicht wurde
    assert block.timestamp >= self.auctionEnd
    # Prüfe, ob diese Funktion bereits aufgerufen wurde
    assert not self.ended

    # 2. Effekte
    self.ended = True

    # 3. Interaktion
    send(self.beneficiary, self.highestBid)
```

Dieses Beispiel soll Ihnen ein Gefühl dafür geben, wie die Syntax von Vyper-Verträgen aussieht. Für eine detailliertere Beschreibung der Funktionen und Variablen [siehe die Dokumentation](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul und Yul+ {#yul}

Wenn Sie neu bei Ethereum sind und noch nicht mit Smart-Contract-Sprachen programmiert haben, empfehlen wir Ihnen, mit Solidity oder Vyper zu beginnen. Beschäftigen Sie sich erst mit Yul oder Yul+, wenn Sie mit den Best Practices für die Sicherheit von Smart Contracts und den Besonderheiten der Arbeit mit der EVM vertraut sind.

**Yul**

- Zwischensprache für Ethereum.
- Unterstützt die [EVM](/developers/docs/evm) und [Ewasm](https://github.com/ewasm), eine Ethereum-spezifische WebAssembly, und ist als nutzbarer gemeinsamer Nenner beider Plattformen konzipiert.
- Gutes Ziel für High-Level-Optimierungsstufen, von denen sowohl EVM- als auch Ewasm-Plattformen gleichermaßen profitieren können.

**Yul+**

- Eine Low-Level-, hocheffiziente Erweiterung von Yul.
- Ursprünglich für einen [Optimistic Rollup](/developers/docs/scaling/optimistic-rollups/)-Vertrag entwickelt.
- Yul+ kann als experimenteller Upgrade-Vorschlag für Yul betrachtet werden, der neue Funktionen hinzufügt.

### Wichtige Links {#important-links-2}

- [Yul-Dokumentation](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+-Dokumentation](https://github.com/fuellabs/yulp)
- [Yul+-Einführungsbeitrag](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Beispielvertrag {#example-contract-2}

Das folgende einfache Beispiel implementiert eine Potenzfunktion. Es kann mit `solc --strict-assembly --bin input.yul` kompiliert werden. Das Beispiel sollte in der Datei input.yul gespeichert werden.

```
{
    function power(base, exponent) -> result
    {
        switch exponent
        case 0 { result := 1 }
        case 1 { result := base }
        default
        {
            result := power(mul(base, base), div(exponent, 2))
            if mod(exponent, 2) { result := mul(base, result) }
        }
    }
    let res := power(calldataload(0), calldataload(32))
    mstore(0, res)
    return(0, 32)
}
```

Wenn Sie bereits viel Erfahrung mit Smart Contracts haben, finden Sie [hier](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example) eine vollständige ERC20-Implementierung in Yul.

## Fe {#fe}

- Statisch typisierte Sprache für die Ethereum Virtual Machine (EVM).
- Inspiriert von Python und Rust.
- Zielt darauf ab, leicht erlernbar zu sein – auch für Entwickler, die neu im Ethereum-Ökosystem sind.
- Die Entwicklung von Fe befindet sich noch in einem frühen Stadium, die Sprache hatte ihre Alpha-Veröffentlichung im Januar 2021.

### Wichtige Links {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Fe-Ankündigung](https://blog.fe-lang.org/posts/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe 2021 Roadmap](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Fe Discord-Chat](https://discord.com/invite/ywpkAXFjZH)
- [Fe auf Twitter](https://twitter.com/official_fe)

### Beispielvertrag {#example-contract-3}

Das Folgende ist ein einfacher Vertrag, der in Fe implementiert ist.

```
type BookMsg = bytes[100]

contract GuestBook:
    pub guest_book: map<address, BookMsg>

    event Signed:
        book_msg: BookMsg

    pub def sign(book_msg: BookMsg):
        self.guest_book[msg.sender] = book_msg

        emit Signed(book_msg=book_msg)

    pub def get_msg(addr: address) -> BookMsg:
        return self.guest_book[addr].to_mem()

```

## Wie man sich entscheidet {#how-to-choose}

Wie bei jeder anderen Programmiersprache geht es meistens darum, das richtige Werkzeug für die richtige Aufgabe zu wählen, sowie um persönliche Vorlieben.

Hier sind ein paar Dinge, die Sie beachten sollten, wenn Sie noch keine der Sprachen ausprobiert haben:

### Was ist großartig an Solidity? {#solidity-advantages}

- Wenn Sie Anfänger sind, gibt es viele Tutorials und Lernwerkzeuge. Mehr dazu finden Sie im Abschnitt [Lernen durch Programmieren](/developers/learning-tools/).
- Gute Entwickler-Tools verfügbar.
- Solidity hat eine große Entwickler-Community, was bedeutet, dass Sie höchstwahrscheinlich recht schnell Antworten auf Ihre Fragen finden werden.

### Was ist großartig an Vyper? {#vyper-advatages}

- Großartiger Einstieg für Python-Entwickler, die Smart Contracts schreiben möchten.
- Vyper hat eine geringere Anzahl von Funktionen, was es ideal für das schnelle Prototyping von Ideen macht.
- Vyper zielt darauf ab, leicht zu prüfen (auditieren) und maximal menschenlesbar zu sein.

### Was ist großartig an Yul und Yul+? {#yul-advantages}

- Vereinfachte und funktionale Low-Level-Sprache.
- Ermöglicht es, viel näher an die rohe EVM heranzukommen, was helfen kann, den Gasverbrauch Ihrer Verträge zu optimieren.

## Sprachvergleiche {#language-comparisons}

Für Vergleiche der grundlegenden Syntax, des Vertragslebenszyklus, der Schnittstellen, Operatoren, Datenstrukturen, Funktionen, des Kontrollflusses und mehr, schauen Sie sich diesen [Spickzettel von Auditless](https://reference.auditless.com/cheatsheet/) an.

## Weiterführende Literatur {#further-reading}

- [Solidity Contracts Library von OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity by Example](https://solidity-by-example.org)