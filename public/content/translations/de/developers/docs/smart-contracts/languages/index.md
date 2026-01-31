---
title: Sprachen von Smart Contracts
description: "Übersicht und Vergleich der zwei wichtigsten Smart-Contract-Sprachen – Solidity und Vyper"
lang: de
---

Das Tolle an Ethereum ist, dass Smart Contracts mit relativ Entwickler-freundlichen Sprachen programmiert werden können. Wenn Sie Erfahrung mit Python oder einer [Sprache mit geschweiften Klammern](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages) haben, können Sie eine Sprache mit vertrauter Syntax finden.

Die zwei häufig genutzten und aktuellsten Sprachen sind:

- Solidity
- Vyper

Remix IDE bietet eine umfassende Entwicklungsumgebung zum Erstellen und Testen von Contracts in Solidity als auch in Vyper. [Probieren Sie die Remix IDE im Browser aus](https://remix.ethereum.org), um mit dem Programmieren zu beginnen.

Erfahrenere Entwickler möchten vielleicht auch Yul, eine Zwischensprache für die [Ethereum Virtual Machine](/developers/docs/evm/), oder Yul+, eine Erweiterung von Yul, verwenden.

Wenn Sie neugierig sind und gerne dabei helfen, neue, noch in der Entwicklung befindliche Sprachen zu testen, können Sie mit Fe experimentieren, einer aufstrebenden Smart-Contract-Sprache, die derzeit noch in den Kinderschuhen steckt.

## Voraussetzungen {#prerequisites}

Vorwissen über andere Programmiersprachen, insbesondere JavaScript oder Python, ist hilfreich, um Smart-Contract-Sprachen und die Unterschiede zwischen den jeweiligen Sprachen schneller zu verstehen. Wir empfehlen Ihnen außerdem, sich mit dem Grundkonzept von Smart Contracts vertraut zu machen, bevor Sie sich die Unterschiede der Smart-Contract-Sprachen genauer ansehen. [Einführung in Smart Contracts](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Objektorientierte Hochsprache zur Implementierung von Smart Contracts
- Sprache mit geschweiften Klammern, die am stärksten von C++ beeinflusst wurde
- Statisch typisiert (der Typ einer Variable ist zur Kompilationszeit bekannt)
- Unterstützt:
  - Vererbung (Sie können andere Smart Contracts erweitern)
  - Bibliotheken (Sie können wiederverwertbaren Code programmieren, den Sie von verschiedenen Smart Contracts aus abrufen können – wie z. B. in statischen Funktionen in einer statischen Klasse in anderen objektorientierten Programmiersprachen)
  - Komplexe benutzerdefinierte Typen

### Wichtige Links {#important-links}

- [Dokumentation](https://docs.soliditylang.org/en/latest/)
- [Solidity-Sprachportal](https://soliditylang.org/)
- [Solidity by Example](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter-Chatroom](https://gitter.im/ethereum/solidity) überbrückt zum [Solidity Matrix-Chatroom](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Spickzettel](https://reference.auditless.com/cheatsheet)
- [Solidity-Blog](https://blog.soliditylang.org/)
- [Solidity auf Twitter](https://twitter.com/solidity_lang)

### Beispielvertrag {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // Das Schlüsselwort "public" macht Variablen
    // für andere Verträge zugänglich
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

    // Sendet eine Menge neu erstellter Münzen an eine Adresse
    // Kann nur vom Vertragsersteller aufgerufen werden
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Sendet eine Menge vorhandener Münzen
    // von einem beliebigen Aufrufer an eine Adresse
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Guthaben nicht ausreichend.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Dieses Beispiel soll ein Gefühl vermitteln, wie die Smart-Contract-Syntax in Solidity aussieht. Eine detailliertere Beschreibung der Funktionen und Variablen finden Sie [in der Dokumentation](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Pythonische Programmiersprache
- Starke Typisierung
- Kompilierter Code ist kurz und nachvollziehbar
- Effiziente Bytecode-Generierung
- Hat beabsichtigterweise weniger Funktionen als Solidity – mit dem Ziel, die Smart Contracts sicherer und einfacherer auditierbar zu machen. Vyper bietet keine Untersützung für:
  - Modifikationen
  - Vererbung
  - Inline-Assembly
  - Funktionsüberladung
  - Operatorüberladung
  - Rekursive Abfragen
  - Schleifen mit unendlicher Länge
  - Binäre Fixpunkte

Für weitere Informationen [lesen Sie die Begründung für Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Wichtige Links {#important-links-1}

- [Dokumentation](https://vyper.readthedocs.io)
- [Vyper by Example](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [More Vyper by Example](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyper-Community-Discord-Chat](https://discord.gg/SdvKC79cJk)
- [Spickzettel](https://reference.auditless.com/cheatsheet)
- [Entwicklungsframeworks und Tools für Smart Contracts für Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk – Lernen Sie, Vyper-Smart-Contracts zu sichern und zu hacken](https://github.com/SupremacyTeam/VyperPunk)
- [Vyper-Hub für die Entwicklung](https://github.com/zcor/vyper-dev)
- [Vyper Greatest Hits: Beispiele für Smart Contracts](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Awesome Vyper – Kuratierte Ressourcen](https://github.com/spadebuilders/awesome-vyper)

### Beispiel {#example}

```python
# Offene Auktion

# Auktionsparameter
# Der Begünstigte erhält Geld vom Höchstbietenden
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Aktueller Stand der Auktion
highestBidder: public(address)
highestBid: public(uint256)

# Wird am Ende auf „true“ gesetzt, verbietet jede Änderung
ended: public(bool)

# Nachverfolgung der zurückgezahlten Gebote, damit wir dem Auszahlungsmuster folgen können
pendingReturns: public(HashMap[address, uint256])

# Erstellt eine einfache Auktion mit `_bidding_time`
# Sekunden Bietzeit im Namen der
# Begünstigten-Adresse `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Mit dem Wert, der zusammen mit dieser Transaktion
# gesendet wird, auf die Auktion bieten.
# Der Wert wird nur dann zurückerstattet,
# wenn die Auktion nicht gewonnen wird.
@external
@payable
def bid():
    # Prüfen, ob die Bietfrist abgelaufen ist.
    assert block.timestamp < self.auctionEnd
    # Prüfen, ob das Gebot hoch genug ist
    assert msg.value > self.highestBid
    # Rückerstattung für den vorherigen Höchstbietenden nachverfolgen
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Neues Höchstgebot nachverfolgen
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Ein zuvor erstattetes Gebot abheben. Das Auszahlungsmuster wird
# hier verwendet, um ein Sicherheitsproblem zu vermeiden. Wenn Rückerstattungen direkt
# als Teil von bid() gesendet würden, könnte ein bösartiger Bietvertrag
# diese Rückerstattungen blockieren und somit das Eingehen neuer, höherer Gebote verhindern.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# Die Auktion beenden und das höchste Gebot an
# den Begünstigten senden.
@external
def endAuction():
    # Es ist eine gute Richtlinie, Funktionen, die mit anderen Verträgen interagieren
    # (d. h. sie rufen Funktionen auf oder senden Ether),
    # in drei Phasen zu gliedern:
    # 1. Überprüfung der Bedingungen
    # 2. Ausführung von Aktionen (potenziell ändernde Bedingungen)
    # 3. Interaktion mit anderen Verträgen
    # Wenn diese Phasen vermischt werden, könnte der andere Vertrag
    # in den aktuellen Vertrag zurückrufen und den Zustand ändern oder bewirken,
    # dass Effekte (Ether-Auszahlung) mehrmals ausgeführt werden.
    # Wenn intern aufgerufene Funktionen die Interaktion mit externen
    # Verträgen beinhalten, müssen sie ebenfalls als Interaktion mit
    # externen Verträgen betrachtet werden.

    # 1. Bedingungen
    # Prüfen, ob die Endzeit der Auktion erreicht ist
    assert block.timestamp >= self.auctionEnd
    # Prüfen, ob diese Funktion bereits aufgerufen wurde
    assert not self.ended

    # 2. Effekte
    self.ended = True

    # 3. Interaktion
    send(self.beneficiary, self.highestBid)
```

Dieses Beispiel soll ein Gefühl vermitteln, wie die Smart-Contract-Syntax in Vyper aussieht. Eine detailliertere Beschreibung der Funktionen und Variablen finden Sie [in der Dokumentation](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul und Yul+ {#yul}

Falls Sie noch nicht mit Ethereum vertraut sind und Sie noch nie mit Smart-Contract-Sprachen programmiert haben, empfehlen wir Ihnen, zunächst mit Solidity oder Vyper anzufangen. Verwenden Sie Yul oder Yul+ bitte nur dann, wenn Sie sich mit den bewähren Methoden für sicheres Programmieren mit Smart-Contract-Sprachen und den Besonderheiten beim Arbeiten mit der EVM auskennen.

**Yul**

- Intermediäre Sprache für Ethereum.
- Unterstützt die [EVM](/developers/docs/evm) und [Ewasm](https://github.com/ewasm), ein WebAssembly im Ethereum-Stil, und ist als brauchbarer gemeinsamer Nenner beider Plattformen konzipiert.
- Ein gutes Ziel für High-Level-Optimierungsstufen, von denen sowohl EVM als auch eWASM-Plattformen gleichermaßen profitieren können

**Yul+**

- Eine hocheffiziente Yul-Erweiterung auf unterer Ebene
- Ursprünglich für einen [Optimistic Rollup](/developers/docs/scaling/optimistic-rollups/)-Vertrag konzipiert.
- Yul+ kann als ein Vorschlag für ein experimentelles Upgrade für Yul betrachtet werden, das neue Funktionen hinzufügt

### Wichtige Links {#important-links-2}

- [Yul-Dokumentation](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+-Dokumentation](https://github.com/fuellabs/yulp)
- [Yul+-Einführungsbeitrag](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Beispielvertrag {#example-contract-2}

Das folgende einfache Beispiel implementiert eine Power-Funktion. Es kann mit `solc --strict-assembly --bin input.yul` kompiliert werden. Das Beispiel
sollte in der Datei "input.yul" gespeichert werden.

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

Wenn Sie bereits viel Erfahrung mit Smart Contracts haben, finden Sie eine vollständige ERC20-Implementierung in Yul [hier](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Statisch typisierte Sprache für die Ethereum-Virtual Machine (EVM)
- Inspiriert von Python und Rust
- Es soll einfach zu erlernen sein – auch für Entwickler, die neu im Ethereum-Ökosystem sind
- Die Fe-Entwicklung befindet sich noch in der Anfangsphase, die Alpha-Version der Sprache wurde im Januar 2021 veröffentlicht

### Wichtige Links {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Fe-Ankündigung](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe-Roadmap 2021](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Fe Discord-Chat](https://discord.com/invite/ywpkAXFjZH)
- [Fe auf Twitter](https://twitter.com/official_fe)

### Beispielvertrag {#example-contract-3}

Im Folgenden ist ein einfacher Vertrag in Fe implementiert:

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

## Wie Sie die richtige Wahl treffen {#how-to-choose}

Wie bei jeder anderen Programmiersprache geht es vor allem darum, das geeignete Tool für den richtigen Job nach den persönlichen Präferenzen zu wählen.

Im Folgenden finden Sie einige Apsekte, die Sie in Betracht ziehen können, wenn Sie noch keine der Sprachen ausprobiert haben:

### Was ist gut an Solidity? {#solidity-advantages}

- Wenn Sie Anfänger sind, gibt es viele Tutorials und Lerntools. Weitere Informationen dazu finden Sie im Abschnitt [Lernen durch Programmieren](/developers/learning-tools/).
- Gute Entwicklertools verfügbar
- Solidity hat eine große Entwickler-Community. Das bedeutet, dass Sie höchstwahrscheinlich ziemlich schnell Antworten auf Ihre Fragen finden.

### Was ist gut an Vyper? {#vyper-advatages}

- Gute Einstiegsmöglichkeit für Python-Entwickler, um Smart Contracts kennenzulernen und in das Thema einzusteigen
- Vyper bietet weniger Funktionen und das erleichtert ein schnelleres Prototyping von Ideen.
- Vyper hat sich zum Ziel gesetzt, leicht auditierbar und möglichst für Menschen lesbar zu sein.

### Was ist gut an Yul und Yul+? {#yul-advantages}

- Einfache und funktionale Low-Level-Sprachen
- Ermöglicht die Annäherung an rohe EVM, was dazu beitragen kann, den Ressourcnverbrauch Ihrer Smart Contracts zu optimieren.

## Sprachvergleiche {#language-comparisons}

Vergleiche von grundlegender Syntax, Vertragslebenszyklus, Schnittstellen, Operatoren, Datenstrukturen, Funktionen, Kontrollfluss und mehr finden Sie in diesem [Spickzettel von Auditless](https://reference.auditless.com/cheatsheet/)

## Weiterführende Lektüre {#further-reading}

- [Solidity-Vertragsbibliothek von OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity by Example](https://solidity-by-example.org)
