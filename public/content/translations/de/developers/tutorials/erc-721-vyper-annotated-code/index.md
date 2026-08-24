---
title: "Vyper ERC-721 Vertrag: Ein Leitfaden"
description: Ryuya Nakamuras ERC-721-Vertrag und wie er funktioniert
author: Ori Pomerantz
lang: de
tags: ["Vyper", "erc-721", "Python"]
skill: beginner
breadcrumb: Vyper ERC-721
published: 2021-04-01
---

## Einführung {#introduction}

Der [ERC-721](/developers/docs/standards/tokens/erc-721/)-Standard wird verwendet, um das Eigentum an Non-Fungible Tokens (NFT) zu halten.
[ERC-20](/developers/docs/standards/tokens/erc-20/)-Token verhalten sich wie eine Ware, da es keinen Unterschied zwischen den einzelnen Token gibt.
Im Gegensatz dazu sind ERC-721-Token für Vermögenswerte konzipiert, die ähnlich, aber nicht identisch sind, wie zum Beispiel verschiedene [Katzen-Cartoons](https://www.cryptokitties.co/)
oder Eigentumsurkunden für verschiedene Immobilien.

In diesem Artikel werden wir [Ryuya Nakamuras ERC-721-Vertrag](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) analysieren.
Dieser Vertrag ist in [Vyper](https://vyper.readthedocs.io/en/latest/index.html) geschrieben, einer Python-ähnlichen Vertragssprache, die so konzipiert ist, dass es schwieriger ist, unsicheren Code zu schreiben, als in Solidity.

## Der Vertrag {#contract}

```python
# @dev Implementierung des ERC-721 Non-Fungible Token Standards.
# @author Ryuya Nakamura (@nrryuya)
# Modifiziert von: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Kommentare in Vyper beginnen, wie in Python, mit einem Hash (`ethereum.ercs`) und gehen bis zum Ende der Zeile. Kommentare, die
`@<keyword>` enthalten, werden von [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) verwendet, um menschenlesbare
Dokumentation zu erstellen.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

Die ERC-721-Schnittstelle ist in die Vyper-Sprache integriert.
[Sie können die Code-Definition hier sehen](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py).
Die Schnittstellendefinition ist in Python und nicht in Vyper geschrieben, da Schnittstellen nicht nur innerhalb der
Blockchain verwendet werden, sondern auch, wenn eine Transaktion von einem externen Client an die Blockchain gesendet wird, der möglicherweise in
Python geschrieben ist.

Die erste Zeile importiert die Schnittstelle, und die zweite gibt an, dass wir sie hier implementieren.

```python
#pragma version >0.3.10
```

```python
#pragma version >0.3.10
```
### Die ERC721Receiver-Schnittstelle

```python
# Schnittstelle für den Vertrag, der von safeTransferFrom() aufgerufen wird
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 unterstützt zwei Arten von Transfers:

- `transferFrom`, was es dem Sender ermöglicht, eine beliebige Zieladresse anzugeben, und die Verantwortung für den Transfer beim Sender belässt. Das bedeutet, dass Sie an eine ungültige Adresse transferieren können, in welchem Fall das NFT für immer verloren ist.
- `safeTransferFrom`, was überprüft, ob die Zieladresse ein Vertrag ist. Wenn ja, fragt der ERC-721-Vertrag den empfangenden Vertrag, ob er das NFT empfangen möchte.

Um `safeTransferFrom`-Anfragen zu beantworten, muss ein empfangender Vertrag `ERC721Receiver` implementieren.

```python
            _operator: address,
            _from: address,
```

Die `_from`-Adresse ist der aktuelle Eigentümer des Tokens. Die `_operator`-Adresse ist diejenige, die den Transfer angefordert hat (diese beiden müssen aufgrund von Freigabebeträgen nicht identisch sein). Konventionsgemäß beginnen die meisten Funktionsparameter in diesem Vertrag mit einem Unterstrich (`_`).

```python
            _tokenId: uint256,
```

ERC-721-Token-IDs sind 256 Bit groß. Typischerweise werden sie durch Hashing einer Beschreibung dessen erstellt, was das Token repräsentiert.

```python
            _data: Bytes[1024]
```

Die Anfrage kann bis zu 1024 Bytes an Benutzerdaten enthalten.

```python
        ) -> bytes4: nonpayable
```

Um Fälle zu verhindern, in denen ein Vertrag versehentlich einen Transfer akzeptiert, ist der Rückgabewert kein Boolean, sondern ein spezifischer Vier-Byte-Wert, der Funktionsselektor von `onERC721Received`. Die Funktion ist `nonpayable`, da ein empfangender Vertrag seinen eigenen Zustand ändern kann, wenn er ein Token akzeptiert.
### Ereignisse

[Ereignisse](/developers/docs/smart-contracts/anatomy/#events-and-logs)
werden ausgegeben, um Benutzer und Server außerhalb der Blockchain über Ereignisse zu informieren. Beachten Sie, dass der Inhalt von Ereignissen für Verträge auf der Blockchain nicht verfügbar ist. Die drei ERC-721-Ereignisse werden durch die von uns importierte `IERC721`-Schnittstelle definiert, sodass dieser Vertrag sie nicht selbst deklariert; er gibt sie mit `log IERC721.<Event>(...)` aus, wie wir in den Transfer-Funktionen unten sehen werden.

`Transfer` (`sender`, `receiver`, `token_id`) meldet eine Änderung des Eigentums an einem NFT. Dies ist ähnlich dem ERC-20-Transfer-Ereignis, außer dass wir eine `token_id` anstelle eines Betrags melden. Niemand besitzt die Nulladresse, daher verwenden wir sie konventionsgemäß, um die Erstellung und Zerstörung von Token zu melden. Die einzige Ausnahme ist die Vertragserstellung, bei der eine beliebige Anzahl von NFTs erstellt und zugewiesen werden kann, ohne `Transfer` auszugeben.

Eine ERC-721-Genehmigung (Approval) ist ähnlich einem ERC-20-Freigabebetrag: Einer bestimmten Adresse ist es erlaubt, ein bestimmtes Token zu transferieren, und `Approval` (`owner`, `approved`, `token_id`) wird ausgegeben, wann immer diese genehmigte Adresse festgelegt oder bestätigt wird. Dies bietet einen Mechanismus für Verträge, um zu reagieren, wenn sie ein Token akzeptieren. Verträge können nicht auf Ereignisse lauschen, wenn Sie also das Token einfach an sie transferieren, "wissen" sie nichts davon. Auf diese Weise reicht der Eigentümer zuerst eine Genehmigung ein und sendet dann eine Anfrage an den Vertrag: "Ich habe Ihnen genehmigt, Token X zu transferieren, bitte tun Sie ...". Dies ist eine Designentscheidung, um den ERC-721-Standard dem ERC-20-Standard ähnlich zu machen. Da ERC-721-Token nicht fungibel sind, kann ein Vertrag auch identifizieren, dass er ein bestimmtes Token erhalten hat, indem er sich das Eigentum des Tokens ansieht.

Schließlich wird `ApprovalForAll` (`owner`, `operator`, `approved`) ausgegeben, wenn ein _Operator_ für einen Eigentümer aktiviert oder deaktiviert wird. Es ist manchmal nützlich, einen Operator zu haben, der alle Token eines Kontos eines bestimmten Typs (diejenigen, die von einem bestimmten Vertrag verwaltet werden) verwalten kann, ähnlich einer Vollmacht. Zum Beispiel möchte ich vielleicht einem Vertrag eine solche Vollmacht geben, der überprüft, ob ich ihn seit sechs Monaten nicht kontaktiert habe, und wenn ja, mein Vermögen an meine Erben verteilt (wenn einer von ihnen danach fragt, Verträge können nichts tun, ohne durch eine Transaktion aufgerufen zu werden). Bei ERC-20 können wir einem Erbvertrag einfach einen hohen Freigabebetrag geben, aber das funktioniert bei ERC-721 nicht, da die Token nicht fungibel sind. Dies ist das Äquivalent. Der `approved`-Wert sagt uns, ob das Ereignis für eine Genehmigung oder den Widerruf einer Genehmigung steht.
### Zustandsvariablen

Diese Variablen enthalten den aktuellen Zustand der Token: welche verfügbar sind und wem sie gehören. Die meisten davon sind `HashMap`-Objekte, [unidirektionale Zuordnungen, die zwischen zwei Typen existieren](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Zuordnung von NFT-ID zur Adresse, die es besitzt.
idToOwner: HashMap[uint256, address]

# @dev Zuordnung von NFT-ID zur genehmigten Adresse.
idToApprovals: HashMap[uint256, address]
```

Benutzer- und Vertragsidentitäten in Ethereum werden durch 160-Bit-Adressen repräsentiert. Diese beiden Variablen ordnen Token-IDs ihren Eigentümern und denjenigen zu, die genehmigt sind, sie zu transferieren (maximal einer für jedes). In Ethereum sind nicht initialisierte Daten immer null, wenn es also keinen Eigentümer oder genehmigten Transferierenden gibt, ist der Wert für dieses Token null.

```python
# @dev Zuordnung von Eigentümeradresse zur Anzahl seiner Token.
ownerToNFTokenCount: HashMap[address, uint256]
```

Diese Variable hält die Anzahl der Token für jeden Eigentümer. Es gibt keine Zuordnung von Eigentümern zu Token, daher ist der einzige Weg, die Token zu identifizieren, die ein bestimmter Eigentümer besitzt, in der Ereignishistorie der Blockchain zurückzublicken und die entsprechenden `Transfer`-Ereignisse zu sehen. Wir können diese Variable verwenden, um zu wissen, wann wir alle NFTs haben und nicht noch weiter in der Zeit zurückblicken müssen.

Beachten Sie, dass dieser Algorithmus nur für Benutzeroberflächen und externe Server funktioniert. Code, der auf der Blockchain selbst läuft, kann vergangene Ereignisse nicht lesen.

```python
# @dev Zuordnung von Eigentümeradresse zur Zuordnung von Operatoradressen.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Ein Konto kann mehr als einen einzigen Operator haben. Eine einfache `HashMap` reicht nicht aus, um sie zu verfolgen, da jeder Schlüssel zu einem einzigen Wert führt. Stattdessen können Sie `HashMap[address, bool]` als Wert verwenden. Standardmäßig ist der Wert für jede Adresse `False`, was bedeutet, dass sie kein Operator ist. Sie können Werte nach Bedarf auf `True` setzen.

```python
# @dev Adresse des Prägers, der ein Token prägen kann
minter: address
```

Neue Token müssen irgendwie erstellt werden. In diesem Vertrag gibt es eine einzige Entität, der dies erlaubt ist, den `minter` (Präger). Dies dürfte beispielsweise für ein Spiel ausreichend sein. Für andere Zwecke könnte es notwendig sein, eine kompliziertere Geschäftslogik zu erstellen.

```python
# @dev Statische Liste der unterstützten ERC165-Schnittstellen-IDs
SUPPORTED_INTERFACES: constant(bytes4[2]) = [
    # ERC165-Schnittstellen-ID von ERC165
    0x01ffc9a7,
    # ERC165-Schnittstellen-ID von ERC721
    0x80ac58cd,
]
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) spezifiziert einen Mechanismus für einen Vertrag, um offenzulegen, wie Anwendungen mit ihm kommunizieren können, welchen ERCs er entspricht. `SUPPORTED_INTERFACES` ist eine konstante Liste der beiden Vier-Byte-Schnittstellen-IDs, denen dieser Vertrag entspricht: ERC-165 selbst und ERC-721.
### Funktionen {#functions}

Dies sind die Funktionen, die ERC-721 tatsächlich implementieren.

#### Konstruktor

```python
@deploy
def __init__():
```

In Vyper, wie in Python, wird die Konstruktor-Funktion `__init__` genannt. Sie ist mit der `@deploy`-Dekoration markiert, was bedeutet, dass sie einmal ausgeführt wird, wenn der Vertrag bereitgestellt wird.

```python
    """
    @dev Vertrags-Konstruktor.
    """
```

In Python und in Vyper können Sie auch einen Kommentar erstellen, indem Sie einen mehrzeiligen String angeben (der mit `"""` beginnt und endet) und ihn in keiner Weise verwenden. Diese Kommentare können auch [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) enthalten.

```python
    self.minter = msg.sender
```

Um auf Zustandsvariablen zuzugreifen, verwenden Sie `self.<variable name>` (wiederum wie in Python). Der Konstruktor zeichnet das Konto, das den Vertrag bereitgestellt hat, als den `minter` auf.
#### View-Funktionen

Dies sind Funktionen, die den Zustand der Blockchain nicht verändern und daher kostenlos ausgeführt werden können, wenn sie extern aufgerufen werden. Wenn die View-Funktionen von einem Vertrag aufgerufen werden, müssen sie dennoch auf jedem Knoten ausgeführt werden und kosten daher Gas.

```python
@view
@external
```

Diese Schlüsselwörter vor einer Funktionsdefinition, die mit einem At-Zeichen (`@`) beginnen, werden _Dekorationen_ genannt. Sie spezifizieren die Umstände, unter denen eine Funktion aufgerufen werden kann.

- `@view` spezifiziert, dass diese Funktion eine View (Ansicht) ist.
- `@external` spezifiziert, dass diese bestimmte Funktion durch Transaktionen und durch andere Verträge aufgerufen werden kann.

```python
def supportsInterface(interface_id: bytes4) -> bool:
```

Im Gegensatz zu Python ist Vyper eine [statisch typisierte Sprache](https://wikipedia.org/wiki/Type_system#Static_type_checking). Sie können keine Variable oder einen Funktionsparameter deklarieren, ohne den [Datentyp](https://vyper.readthedocs.io/en/latest/types.html) zu identifizieren. In diesem Fall ist der Eingabeparameter `bytes4`, ein Vier-Byte-Wert, und die Ausgabe ist ein boolescher Wert.

```python
    """
    @dev Schnittstellenidentifikation ist in ERC-165 spezifiziert.
    @param interface_id ID der Schnittstelle
    """
    return interface_id in SUPPORTED_INTERFACES
```

Gibt `True` zurück, wenn `interface_id` eine der Schnittstellen-IDs in der `SUPPORTED_INTERFACES`-Liste ist.

```python
### VIEW-FUNKTIONEN ###
```

Dies sind die View-Funktionen, die Informationen über die Token für Benutzer und andere Verträge verfügbar machen.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev Gibt die Anzahl der NFTs zurück, die `_owner` besitzt.
         Löst einen Fehler aus, wenn `_owner` die Nulladresse ist. NFTs, die der Nulladresse zugewiesen sind, gelten als ungültig.
    @param _owner Adresse, für die der Kontostand abgefragt werden soll.
    """
    assert _owner != empty(address)
```

Diese Zeile [stellt sicher (assert)](https://vyper.readthedocs.io/en/latest/statements.html#assert), dass `_owner` nicht die Nulladresse ist, geschrieben als `empty(address)`. Wenn doch, tritt ein Fehler auf und die Operation wird rückgängig gemacht.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev Gibt die Adresse des Eigentümers des NFTs zurück.
         Löst einen Fehler aus, wenn `_tokenId` kein gültiges NFT ist.
    @param _tokenId Der Identifikator für ein NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Löst einen Fehler aus, wenn `_tokenId` kein gültiges NFT ist
    assert owner != empty(address)
    return owner
```

In der Ethereum Virtual Machine (EVM) ist jeder Speicher, in dem kein Wert gespeichert ist, null.
Wenn es kein Token bei `_tokenId` gibt, dann ist der Wert von `self.idToOwner[_tokenId]` null. In diesem Fall wird die Funktion rückgängig gemacht.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Ruft die genehmigte Adresse für ein einzelnes NFT ab.
         Löst einen Fehler aus, wenn `_tokenId` kein gültiges NFT ist.
    @param _tokenId ID des NFTs, dessen Genehmigung abgefragt werden soll.
    """
    # Löst einen Fehler aus, wenn `_tokenId` kein gültiges NFT ist
    assert self.idToOwner[_tokenId] != empty(address)
    return self.idToApprovals[_tokenId]
```

Beachten Sie, dass `getApproved` null zurückgeben _kann_. Wenn das Token gültig ist, gibt es `self.idToApprovals[_tokenId]` zurück.
Wenn es keinen Genehmigenden gibt, ist dieser Wert null.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev Überprüft, ob `_operator` ein genehmigter Operator für `_owner` ist.
    @param _owner Die Adresse, die die NFTs besitzt.
    @param _operator Die Adresse, die im Namen des Eigentümers handelt.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

Diese Funktion überprüft, ob es `_operator` erlaubt ist, alle Token von `_owner` in diesem Vertrag zu verwalten.
Da es mehrere Operatoren geben kann, ist dies eine zweistufige HashMap.
#### Transfer-Hilfsfunktionen

Diese Funktionen implementieren Operationen, die Teil des Transfers oder der Verwaltung von Token sind.

```python

### TRANSFER-FUNKTIONS-HILFSFUNKTIONEN ###

@view
@internal
```

Diese Dekoration, `@internal`, bedeutet, dass die Funktion nur von anderen Funktionen innerhalb desselben Vertrags zugänglich ist. Konventionsgemäß beginnen diese Funktionsnamen ebenfalls mit einem Unterstrich (`_`).

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Gibt zurück, ob der angegebene Spender eine bestimmte Token-ID transferieren kann
    @param spender Adresse des abzufragenden Spenders
    @param tokenId uint256 ID des zu transferierenden Tokens
    @return bool ob der msg.sender für die angegebene Token-ID genehmigt ist,
        ein Operator des Eigentümers ist oder der Eigentümer des Tokens ist
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

Es gibt drei Möglichkeiten, wie es einer Adresse erlaubt sein kann, ein Token zu transferieren:

1. Die Adresse ist der Eigentümer des Tokens
2. Die Adresse ist genehmigt, dieses Token auszugeben
3. Die Adresse ist ein Operator für den Eigentümer des Tokens

Die obige Funktion kann eine View sein, da sie den Zustand nicht ändert. Um die Betriebskosten zu senken, _sollte_ jede Funktion, die eine View sein _kann_, eine View sein.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Fügt ein NFT zu einer bestimmten Adresse hinzu
         Löst einen Fehler aus, wenn `_tokenId` jemandem gehört.
    """
    # Löst einen Fehler aus, wenn `_tokenId` jemandem gehört
    assert self.idToOwner[_tokenId] == empty(address)
    # Ändert den Eigentümer
    self.idToOwner[_tokenId] = _to
    # Ändert die Zählungsverfolgung
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Entfernt ein NFT von einer bestimmten Adresse
         Löst einen Fehler aus, wenn `_from` nicht der aktuelle Eigentümer ist.
    """
    # Löst einen Fehler aus, wenn `_from` nicht der aktuelle Eigentümer ist
    assert self.idToOwner[_tokenId] == _from
    # Ändert den Eigentümer
    self.idToOwner[_tokenId] = empty(address)
    # Ändert die Zählungsverfolgung
    self.ownerToNFTokenCount[_from] -= 1
```

Wenn es ein Problem mit einem Transfer gibt, machen wir den Aufruf rückgängig.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Löscht eine Genehmigung einer bestimmten Adresse
         Löst einen Fehler aus, wenn `_owner` nicht der aktuelle Eigentümer ist.
    """
    # Löst einen Fehler aus, wenn `_owner` nicht der aktuelle Eigentümer ist
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != empty(address):
        # Setzt Genehmigungen zurück
        self.idToApprovals[_tokenId] = empty(address)
```

Ändern Sie den Wert nur, wenn es notwendig ist. Zustandsvariablen leben im Speicher (Storage). Das Schreiben in den Speicher ist eine der teuersten Operationen, die die EVM (Ethereum Virtual Machine) durchführt (in Bezug auf [Gas](/developers/docs/gas/)). Daher ist es eine gute Idee, dies zu minimieren; selbst das Schreiben des bestehenden Wertes ist mit hohen Kosten verbunden.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Führt den Transfer eines NFTs aus.
         Löst einen Fehler aus, es sei denn, `msg.sender` ist der aktuelle Eigentümer, ein autorisierter Operator oder die genehmigte
         Adresse für dieses NFT. (HINWEIS: `msg.sender` ist in einer privaten Funktion nicht erlaubt, übergeben Sie also `_sender`.)
         Löst einen Fehler aus, wenn `_to` die Nulladresse ist.
         Löst einen Fehler aus, wenn `_from` nicht der aktuelle Eigentümer ist.
         Löst einen Fehler aus, wenn `_tokenId` kein gültiges NFT ist.
    """
```

Wir haben diese interne Funktion, da es zwei Möglichkeiten gibt, Token zu transferieren (regulär und sicher), wir aber nur eine einzige Stelle im Code haben möchten, an der wir dies tun, um die Überprüfung (Auditing) zu erleichtern.

```python
    # Überprüft Anforderungen
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Löst einen Fehler aus, wenn `_to` die Nulladresse ist
    assert _to != empty(address)
    # Löscht Genehmigung. Löst einen Fehler aus, wenn `_from` nicht der aktuelle Eigentümer ist
    self._clearApproval(_from, _tokenId)
    # Entfernt NFT. Löst einen Fehler aus, wenn `_tokenId` kein gültiges NFT ist
    self._removeTokenFrom(_from, _tokenId)
    # Fügt NFT hinzu
    self._addTokenTo(_to, _tokenId)
    # Protokolliert den Transfer
    log IERC721.Transfer(sender=_from, receiver=_to, token_id=_tokenId)
```

Um ein Ereignis in Vyper auszugeben, verwenden Sie eine `log`-Anweisung ([siehe hier für weitere Details](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).
Da die Ereignisse zur importierten Schnittstelle gehören, beziehen wir uns auf sie als `IERC721.Transfer` und übergeben ihre Felder per Schlüsselwort.
#### Transfer-Funktionen

```python

### TRANSFER-FUNKTIONEN ###

@external
@payable
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Löst einen Fehler aus, es sei denn, `msg.sender` ist der aktuelle Eigentümer, ein autorisierter Operator oder die genehmigte
         Adresse für dieses NFT.
         Löst einen Fehler aus, wenn `_from` nicht der aktuelle Eigentümer ist.
         Löst einen Fehler aus, wenn `_to` die Nulladresse ist.
         Löst einen Fehler aus, wenn `_tokenId` kein gültiges NFT ist.
    @notice Der Aufrufer ist dafür verantwortlich zu bestätigen, dass `_to` in der Lage ist, NFTs zu empfangen, andernfalls
            könnten sie dauerhaft verloren gehen.
    @param _from Der aktuelle Eigentümer des NFTs.
    @param _to Der neue Eigentümer.
    @param _tokenId Das zu transferierende NFT.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Diese Funktion ermöglicht es Ihnen, an eine beliebige Adresse zu transferieren. Es sei denn, die Adresse ist ein Benutzer oder ein Vertrag, der weiß, wie man Token transferiert, wird jedes Token, das Sie transferieren, in dieser Adresse stecken bleiben und nutzlos sein.

Die `@payable`-Dekoration ist hier, weil die `IERC721`-Schnittstelle `transferFrom`, `safeTransferFrom` und `approve` als zahlbar (payable) deklariert, sodass ein Vertrag, der die Schnittstelle implementiert, mit diesen Signaturen übereinstimmen muss.

```python
@external
@payable
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Transferiert das Eigentum an einem NFT von einer Adresse zu einer anderen Adresse.
         Löst einen Fehler aus, es sei denn, `msg.sender` ist der aktuelle Eigentümer, ein autorisierter Operator oder die
         genehmigte Adresse für dieses NFT.
         Löst einen Fehler aus, wenn `_from` nicht der aktuelle Eigentümer ist.
         Löst einen Fehler aus, wenn `_to` die Nulladresse ist.
         Löst einen Fehler aus, wenn `_tokenId` kein gültiges NFT ist.
         Wenn `_to` ein Smart Contract ist, ruft es `onERC721Received` auf `_to` auf und löst einen Fehler aus, wenn
         der Rückgabewert nicht `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))` ist.
    @param _from Der aktuelle Eigentümer des NFTs.
    @param _to Der neue Eigentümer.
    @param _tokenId Das zu transferierende NFT.
    @param _data Zusätzliche Daten ohne spezifiziertes Format, die im Aufruf an `_to` gesendet werden.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Es ist in Ordnung, den Transfer zuerst durchzuführen, denn wenn es ein Problem gibt, werden wir ohnehin rückgängig machen, sodass alles, was im Aufruf getan wurde, abgebrochen wird.

```python
    if _to.is_contract: # überprüft, ob `_to` eine Vertragsadresse ist
```

Überprüfen Sie zuerst, ob die Adresse ein Vertrag ist (ob sie Code hat). Wenn nicht, gehen Sie davon aus, dass es sich um eine Benutzeradresse handelt und der Benutzer in der Lage sein wird, das Token zu verwenden oder zu transferieren. Aber lassen Sie sich nicht in falscher Sicherheit wiegen. Sie können Token verlieren, selbst mit `safeTransferFrom`, wenn Sie sie an eine Adresse transferieren, für die niemand den privaten Schlüssel kennt.

```python
        returnValue: bytes4 = extcall ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Rufen Sie den Zielvertrag auf, um zu sehen, ob er ERC-721-Token empfangen kann. Vyper 0.4 erfordert, dass Aufrufe an andere Verträge markiert werden, daher wird dem Aufruf `extcall` vorangestellt.

```python
        # Löst einen Fehler aus, wenn das Transferziel ein Vertrag ist, der 'onERC721Received' nicht implementiert
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes4)
```

Wenn das Ziel ein Vertrag ist, aber einer, der keine ERC-721-Token akzeptiert (oder der entschieden hat, diesen bestimmten Transfer nicht zu akzeptieren), machen Sie es rückgängig.

```python
@external
@payable
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Legt die genehmigte Adresse für ein NFT fest oder bestätigt sie. Die Nulladresse zeigt an, dass es keine genehmigte Adresse gibt.
         Löst einen Fehler aus, es sei denn, `msg.sender` ist der aktuelle NFT-Eigentümer oder ein autorisierter Operator des aktuellen Eigentümers.
         Löst einen Fehler aus, wenn `_tokenId` kein gültiges NFT ist. (HINWEIS: Dies steht nicht im EIP)
         Löst einen Fehler aus, wenn `_approved` der aktuelle Eigentümer ist. (HINWEIS: Dies steht nicht im EIP)
    @param _approved Adresse, die für die angegebene NFT-ID genehmigt werden soll.
    @param _tokenId ID des Tokens, das genehmigt werden soll.
    """
    owner: address = self.idToOwner[_tokenId]
    # Löst einen Fehler aus, wenn `_tokenId` kein gültiges NFT ist
    assert owner != empty(address)
    # Löst einen Fehler aus, wenn `_approved` der aktuelle Eigentümer ist
    assert _approved != owner
```

Konventionsgemäß ernennen Sie die Nulladresse und nicht sich selbst, wenn Sie keinen Genehmigenden haben möchten.

```python
    # Überprüft Anforderungen
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Um eine Genehmigung festzulegen, können Sie entweder der Eigentümer oder ein vom Eigentümer autorisierter Operator sein.

```python
    # Legt die Genehmigung fest
    self.idToApprovals[_tokenId] = _approved
    log IERC721.Approval(owner=owner, approved=_approved, token_id=_tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Aktiviert oder deaktiviert die Genehmigung für einen Dritten ("Operator"), alle
         Vermögenswerte von `msg.sender` zu verwalten. Es gibt auch das ApprovalForAll-Ereignis aus.
         Löst einen Fehler aus, wenn `_operator` der `msg.sender` ist. (HINWEIS: Dies steht nicht im EIP)
    @notice Dies funktioniert auch dann, wenn der Sender zu diesem Zeitpunkt keine Token besitzt.
    @param _operator Adresse, die zur Menge der autorisierten Operatoren hinzugefügt werden soll.
    @param _approved True, wenn der Operator genehmigt ist, False, um die Genehmigung zu widerrufen.
    """
    # Löst einen Fehler aus, wenn `_operator` der `msg.sender` ist
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log IERC721.ApprovalForAll(owner=msg.sender, operator=_operator, approved=_approved)
```
#### Neue Token prägen und bestehende zerstören {#mint-burn}

Das Konto, das den Vertrag erstellt hat, ist der `minter`, der Superuser, der autorisiert ist,
neue NFTs zu prägen. Es ist ihm jedoch nicht erlaubt, bestehende Token zu verbrennen. Nur der Eigentümer oder eine
vom Eigentümer autorisierte Entität kann das tun.

```python
### PRÄGUNG & VERBRENNEN FUNKTIONEN ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Diese Funktion gibt immer `True` zurück, denn wenn die Operation fehlschlägt, wird sie rückgängig gemacht.

```python
    """
    @dev Funktion zur Prägung von Token
         Löst einen Fehler aus, wenn `msg.sender` nicht der Präger ist.
         Löst einen Fehler aus, wenn `_to` die Nulladresse ist.
         Löst einen Fehler aus, wenn `_tokenId` jemandem gehört.
    @param _to Die Adresse, die die durch Prägung erstellten Token erhalten wird.
    @param _tokenId Die Token-ID für die Prägung.
    @return Ein Boolean, der anzeigt, ob die Operation erfolgreich war.
    """
    # Löst einen Fehler aus, wenn `msg.sender` nicht der Präger ist
    assert msg.sender == self.minter
```

Nur der Präger (das Konto, das den ERC-721-Vertrag erstellt hat) kann neue Token prägen. Dies kann in
Zukunft ein Problem sein, wenn wir die Identität des Prägers ändern wollen. In
einem Produktionsvertrag würden Sie wahrscheinlich eine Funktion wünschen, die es dem Präger ermöglicht, die
Prägeprivilegien auf jemand anderen zu übertragen.

```python
    # Löst einen Fehler aus, wenn `_to` die Nulladresse ist
    assert _to != ZERO_ADDRESS
    # NFT hinzufügen. Löst einen Fehler aus, wenn `_tokenId` jemandem gehört
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

Konventionsgemäß zählt das Prägen neuer Token als Transfer von der Nulladresse.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev Verbrennt ein spezifisches ERC-721 Token.
         Löst einen Fehler aus, es sei denn, `msg.sender` ist der aktuelle Besitzer, ein autorisierter Operator oder die freigegebene
         Adresse für dieses NFT.
         Löst einen Fehler aus, wenn `_tokenId` kein gültiges NFT ist.
    @param _tokenId uint256 ID des ERC-721 Token, das verbrannt werden soll.
    """
    # Anforderungen prüfen
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Löst einen Fehler aus, wenn `_tokenId` kein gültiges NFT ist
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

Jeder, dem es erlaubt ist, einen Token zu transferieren, darf ihn auch verbrennen. Während ein Verbrennen äquivalent zu
einem Transfer an die Nulladresse erscheint, empfängt die Nulladresse den Token nicht tatsächlich. Dies ermöglicht es uns,
den gesamten Speicher freizugeben, der für den Token verwendet wurde, was die Gaskosten der Transaktion reduzieren kann.

## Verwendung dieses Vertrags {#using-contract}

Im Gegensatz zu Solidity hat Vyper keine Vererbung. Dies ist eine bewusste Designentscheidung, um den
Code klarer und damit leichter abzusichern zu machen. Um also Ihren eigenen Vyper ERC-721-Vertrag zu erstellen, nehmen Sie [diesen
Vertrag](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) und modifizieren ihn,
um die gewünschte Geschäftslogik zu implementieren.

## Fazit {#conclusion}

Zur Wiederholung sind hier einige der wichtigsten Ideen in diesem Vertrag:

- Um ERC-721-Token mit einem sicheren Transfer zu empfangen, müssen Verträge die `ERC721Receiver`-Schnittstelle implementieren.
- Selbst wenn Sie einen sicheren Transfer verwenden, können Token immer noch stecken bleiben, wenn Sie sie an eine Adresse senden, deren privater Schlüssel
  unbekannt ist.
- Wenn es ein Problem mit einer Operation gibt, ist es eine gute Idee, den Aufruf mit `revert` rückgängig zu machen, anstatt nur
  einen Fehlerwert zurückzugeben.
- ERC-721-Token existieren, wenn sie einen Eigentümer haben.
- Es gibt drei Möglichkeiten, autorisiert zu sein, einen NFT zu transferieren. Sie können der Eigentümer sein, für einen bestimmten Token genehmigt sein
  oder ein Operator für alle Token des Eigentümers sein.
- Vergangene Ereignisse sind nur außerhalb der Blockchain sichtbar. Code, der innerhalb der Blockchain läuft, kann sie nicht einsehen.

Gehen Sie nun hin und implementieren Sie sichere Vyper-Verträge.

[Weitere Arbeiten von mir finden Sie hier](https://cryptodocguy.pro/).
