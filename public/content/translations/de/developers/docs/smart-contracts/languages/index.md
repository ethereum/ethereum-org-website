---
title: Sprachen von Smart Contracts
description: Übersicht und Vergleich der zwei wichtigsten Smart-Contract-Sprachen – Solidity und Vyper
lang: de
---

Das Tolle an Ethereum ist, dass Smart Contracts mit relativ Entwickler-freundlichen Sprachen programmiert werden können. Wenn Sie mit Python oder einer anderen [Sprache mit geschweiften Klammern](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages) vertraut sind, können Sie eine Sprache mit vertrauter Syntax finden.

Die zwei häufig genutzten und aktuellsten Sprachen sind:

- Solidity
- Vyper

Remix IDE bietet eine umfassende Entwicklungsumgebung zum Erstellen und Testen von Contracts in Solidity als auch in Vyper. [Probieren Sie die Remix IDE im Browser](https://remix.ethereum.org), um mit dem Codieren zu beginnen.

Für erfahrene Entwickler könnten außerdem Yul, eine intermediäre Sprache für die [Ethereum-Virtual Machine](/developers/docs/evm/), oder Yul+, eine Erweiterung für Yul, interessant sein.

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
- [Solidity Sprachportal](https://soliditylang.org/)
- [Solidity am Beispiel](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter Chatroom](https://gitter.im/ethereum/solidity) verbunden mit [Solidity Matrix Chatroom](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Spickzettel](https://reference.auditless.com/cheatsheet)
- [Solidity-Blog](https://blog.soliditylang.org/)
- [Solidity Twitter](https://twitter.com/solidity_lang)

### Beispiel {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // Das Schlüsselwort "public" macht Variablen
    // für anderen Verträgen zugreifbar
    address public minter;
    mapping (address => uint) public balances;

    // Ereignisse ermöglichen es Nutzern spezifisch auf
    // von deklarierte Vertragsänderungen zu reagieren
    event Sent(address from, address to, uint amount);

    // Die Konstruktoranweisungen werden nur ausgeführt wenn
    // der Vertrag erstellt wird
    constructor() {
        minter = msg.sender;
    }

    // Sendet eine Anzahl neu erstellter Coins an eine Adresse
    // Kann nur vom Vertragsersteller aufgerufen werden
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Sendet eine Anzahl vorhandener Coins
    // von einem Aufrufer an eine Adresse
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Dieses Beispiel soll ein Gefühl vermitteln, wie die Smart-Contract-Syntax in Solidity aussieht. Für eine ausführliche Beschreibung aller Funktionen und Variablen [sollten Sie die Dokumentation lesen](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Pythonische Programmiersprache
- Stark typisiert
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

Weitere Informationen finden Sie im [Vyper-Grundprinzip](https://vyper.readthedocs.io/en/latest/index.html).

### Wichtige Links {#important-links-1}

- [Dokumentation](https://vyper.readthedocs.io)
- [Vyper am Beispiel](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [Mehr Vyper am Beispiel](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyper-Community Discord-Chat](https://discord.gg/SdvKC79cJk)
- [Spickzettel](https://reference.auditless.com/cheatsheet)
- [Entwicklungsframeworks für Smart Contracts und Tools für Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk - Lernen Sie, Vyper Smart Contracts zu sichern und zu hacken](https://github.com/SupremacyTeam/VyperPunk)
- [VyperExamples - Beispiele zu Schwachstellen von Vyper](https://www.vyperexamples.com/reentrancy)
- [Vyper Hub für Entwicklung](https://github.com/zcor/vyper-dev)
- [Vyper Greatest Hits Smart Contract – Beispiele](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Großartige, sorgfältig ausgewählte Vyper-Ressourcen](https://github.com/spadebuilders/awesome-vyper)

### Beispiel {#example}

```python
# Öffne Auktion

# Auktionsparameter
# Begünstigter erhält Geld vom Meistbietenden
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Aktueller Stand der Auktion
highestBidder: public(address)
highestBid: public(uint256)

# Setze am Ende auf wahr, um jede Änderung zu verbieten
ended: public(bool)

# Erstattete Gebote nachverfolgen, um dem Abhebemuster folgen zu können
pendingReturns: public(HashMap[address, uint256])

# Eine einfache Auktion mit `_bidding_time`
# Sekunden Bieterzeit für die
# Begünstigtenadresse `_beneficiary` erstellen.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Biete in der Auktion mit dem Betrag der
# zusammen mit dieser Transaktion gesendet wurde.
# Der Betrag wird nur erstattet, wenn die
# Auktion nicht gewonnen wurde.
@external
@payable
def bid():
    # Prüfe, ob die Bietezeit vorrüber ist.
    assert block.timestamp < self.auctionEnd
    # Prüfe, ob Gebot hoch genug ist
    assert msg.value > self.highestBid
    # Verfolge die Erstattung der vorigen Meistbietenden nach
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Verfolge das neue Höchstgebot nach
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Ziehe ein zuvor erstattetes Gebot zurück. Das Abhebemuster
# wird verwendet um ein Sicherheitsproblem zu vermeiden. Wenn Erstattungen direkt
# als Teil von bid() gesendet würden, könnte ein böswilliger Bieter-Vertrag
# diese Erstattungen blockieren und damit den Eingang neuer Höchstgebote.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# Beende die Auktion und sende das Höchstgebot
# an den Begünstigten.
@extern
def endAuction():
    # Es ist eine gute Richtlinie, Funktionen zu strukturieren, die
    # mit anderen Verträgen interagieren (d. h. sie rufen Funktionen auf oder senden Ether),
    # in drei Phasen zu unterteilen:
    # 1. Bedingungen prüfen
    # 2. Aktionen ausführen (potentiell die Bedingungen ändernd)
    # 3. mit anderen Verträgen interagieren
    # Wenn diese Abschnitte vermischt werden, könnte der andere Vertrag
    # zurück im aktuellen Vertrag ein Aufruf durchführen und den Zustand verändern oder
    # Effekte (Ether-Auszahlung) mehrfach ausführen.
    # Wenn interne Funktionen aufgerufen werden, die eine Interaktion mit externen
    # Verträgen beinhalten, muss auch die Interaktion mit
    # den externen Verträgen berücksichtigt werden.

    # 1. Bedingungen
    # Prüfe ob der Zeitpunkt des Auktionsendes erreicht wurde
    assert block.timestamp >= self.auctionEnd
    # Prüfe ob diese Funktion bereit aufgerufen wurde
    assert not self.ended

    # 2. Effekte
    self.ended = True

    # 3. Interaktion
    send(self.beneficiary, self.highestBid)
```

Dieses Beispiel soll ein Gefühl vermitteln, wie die Smart-Contract-Syntax in Vyper aussieht. Eine ausführlicher Beschreibung aller Funktionen und Variablen [finden Sie in der Dokumentation](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul und Yul+ {#yul}

Falls Sie noch nicht mit Ethereum vertraut sind und Sie noch nie mit Smart-Contract-Sprachen programmiert haben, empfehlen wir Ihnen, zunächst mit Solidity oder Vyper anzufangen. Verwenden Sie Yul oder Yul+ bitte nur dann, wenn Sie sich mit den bewähren Methoden für sicheres Programmieren mit Smart-Contract-Sprachen und den Besonderheiten beim Arbeiten mit der EVM auskennen.

**Yul**

- Intermediäre Sprache für Ethereum.
- Unterstützt die [EVM](/developers/docs/evm) und [Ewasm](https://github.com/ewasm), eine Ethereum ähnliche WebAssembly, sie ist so konzipiert, dass sie ein nutzbarer gemeinsamer Nenner für beide Plattformen ist
- Ein gutes Ziel für High-Level-Optimierungsstufen, von denen sowohl EVM als auch eWASM-Plattformen gleichermaßen profitieren können

**Yul+**

- Eine hocheffiziente Yul-Erweiterung auf unterer Ebene
- Wurde ursprünglich für einen [Optimistic Rollup](/developers/docs/scaling/optimistic-rollups/)-Vertrag konzipiert
- Yul+ kann als ein Vorschlag für ein experimentelles Upgrade für Yul betrachtet werden, das neue Funktionen hinzufügt

### Wichtige Links {#important-links-2}

- [Yul-Dokumentation](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+-Dokumentation](https://github.com/fuellabs/yulp)
- [Yul+-Playground](https://yulp.fuel.sh/)
- [Yul+-Einführungsartikel](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Beispiel {#example-contract-2}

Das folgende einfache Beispiel implementiert eine Power-Funktion. Es kann mit `solc --strict-assembly --bin input.yul` kompiliert werden. Das Beispiel sollte in der Datei "input.yul" gespeichert werden.

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

Wenn Sie bereits Erfahrung mit Smart Contracts haben, finden Sie [hier](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example) eine vollständige ERC20-Implementierung in Yul.

## Fe {#fe}

- Statisch typisierte Sprache für die Ethereum-Virtual Machine (EVM)
- Inspiriert von Python und Rust
- Es soll einfach zu erlernen sein – auch für Entwickler, die neu im Ethereum-Ökosystem sind
- Die Fe-Entwicklung befindet sich noch in der Anfangsphase, die Alpha-Version der Sprache wurde im Januar 2021 veröffentlicht

### Wichtige Links {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Fe-Ankündigung](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe 2021-Roadmap](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Fe-Chat auf Discord](https://discord.com/invite/ywpkAXFjZH)
- [Fe Twitter](https://twitter.com/official_fe)

### Beispiel {#example-contract-3}

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

## So wählen Sie die richtige Sprache {#how-to-choose}

Wie bei jeder anderen Programmiersprache geht es vor allem darum, das geeignete Tool für den richtigen Job nach den persönlichen Präferenzen zu wählen.

Im Folgenden finden Sie einige Apsekte, die Sie in Betracht ziehen können, wenn Sie noch keine der Sprachen ausprobiert haben:

### Was ist gut an Solidity? {#solidity-advantages}

- Wenn Sie Anfänger sind, gibt es viele Tutorials und Lerntools. Mehr dazu finden Sie im Bereich [Beim Programmieren lernen](/developers/learning-tools/).
- Gute Entwicklertools verfügbar
- Solidity hat eine große Entwickler-Community. Das bedeutet, dass Sie höchstwahrscheinlich ziemlich schnell Antworten auf Ihre Fragen finden.

### Was ist gut an Vyper? {#vyper-advatages}

- Gute Einstiegsmöglichkeit für Python-Entwickler, um Smart Contracts kennenzulernen und in das Thema einzusteigen
- Vyper bietet weniger Funktionen und das erleichtert ein schnelleres Prototyping von Ideen.
- Vyper hat sich zum Ziel gesetzt, leicht auditierbar und möglichst für Menschen lesbar zu sein.

### Was ist gut an Yul und Yul+? {#yul-advantages}

- Einfache und funktionale Low-Level-Sprachen
- Ermöglicht die Annäherung an rohe EVM, was dazu beitragen kann, den Ressourcnverbrauch Ihrer Smart Contracts zu optimieren.

## Vergleich zwischen den Sprachen {#language-comparisons}

Für Vergleiche von Basissyntax, des Vertragslebenszyklus, Schnittstellen, Operatoren, Datenstrukturen, Funktionen, Steuerungsfluss und mehr sollten Sie sich diesen [Spickzettel von Auditless](https://reference.auditless.com/cheatsheet/) ansehen.

## Weiterführende Informationen {#further-reading}

- [Solidity-Vertragsbibliothek von OpenZeppelin](https://docs.openzeppelin.com/contracts)
- [Solidity am Beispiel](https://solidity-by-example.org)
