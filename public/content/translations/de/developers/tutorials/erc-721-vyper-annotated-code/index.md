---
title: "Vyper ERC-721 Vertrags-Komplettlösung"
description: Ryuya Nakamuras ERC-721-Vertrag und wie er funktioniert
author: Ori Pomerantz
lang: de
tags: [ "vyper", "erc-721", "Python" ]
skill: beginner
published: 2021-04-01
---

## Einführung {#introduction}

Der [ERC-721](/developers/docs/standards/tokens/erc-721/)-Standard wird verwendet, um das Eigentum an nicht-fungiblen Token (NFT) zu halten.
[ERC-20](/developers/docs/standards/tokens/erc-20/)-Token verhalten sich wie ein Rohstoff, da es keinen Unterschied zwischen den einzelnen Token gibt.
Im Gegensatz dazu sind ERC-721-Token für Vermögenswerte konzipiert, die ähnlich, aber nicht identisch sind, wie zum Beispiel verschiedene Katzen-
Cartoons
oder Titel für verschiedene Immobilien.

In diesem Artikel analysieren wir [Ryuya Nakamuras ERC-721-Vertrag](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy).
Dieser Vertrag ist in [Vyper](https://vyper.readthedocs.io/en/latest/index.html) geschrieben, einer Python-ähnlichen Vertragssprache, die so konzipiert ist, dass es
schwieriger ist, unsicheren Code zu schreiben, als in Solidity.

## Der Vertrag {#contract}

```python
# @dev Implementierung des ERC-721-Standards für nicht-fungible Token.
# @author Ryuya Nakamura (@nrryuya)
# Modifiziert von: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Kommentare in Vyper beginnen, wie in Python, mit einem Hash (`#`) und gehen bis zum Ende der Zeile. Kommentare, die
`@<keyword>` enthalten, werden von [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) verwendet, um für Menschen lesbare
Dokumentationen zu erstellen.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

Die ERC-721-Schnittstelle ist in die Vyper-Sprache integriert.
[Die Code-Definition können Sie hier einsehen](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py).
Die Schnittstellendefinition ist in Python und nicht in Vyper geschrieben, da Schnittstellen nicht nur innerhalb der
Blockchain verwendet werden, sondern auch beim Senden einer Transaktion von einem externen Client an die Blockchain, der in
Python geschrieben sein kann.

Die erste Zeile importiert die Schnittstelle und die zweite gibt an, dass wir sie hier implementieren.

### Die ERC721Receiver-Schnittstelle {#receiver-interface}

```python
# Schnittstelle für den von safeTransferFrom() aufgerufenen Vertrag
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 unterstützt zwei Arten von Übertragungen:

- `transferFrom`, bei dem der Absender eine beliebige Zieladresse angeben kann und die Verantwortung
  für die Übertragung beim Absender liegt. Das bedeutet, dass Sie an eine ungültige Adresse übertragen können. In diesem Fall
  ist der NFT für immer verloren.
- `safeTransferFrom`, das prüft, ob die Zieladresse ein Vertrag ist. Wenn ja, fragt der ERC-721-Vertrag
  den empfangenden Vertrag, ob er den NFT empfangen möchte.

Um `safeTransferFrom`-Anfragen zu beantworten, muss ein empfangender Vertrag `ERC721Receiver` implementieren.

```python
            _operator: address,
            _from: address,
```

Die `_from`-Adresse ist der aktuelle Eigentümer des Tokens. Die `_operator`-Adresse ist diejenige, die
die Übertragung angefordert hat (diese beiden können aufgrund von Freigaben unterschiedlich sein).

```python
            _tokenId: uint256,
```

ERC-721-Token-IDs sind 256 Bit lang. Typischerweise werden sie durch Hashing einer Beschreibung von dem erstellt, was
der Token darstellt.

```python
            _data: Bytes[1024]
```

Die Anfrage kann bis zu 1024 Bytes an Benutzerdaten enthalten.

```python
        ) -> bytes32: view
```

Um zu verhindern, dass ein Vertrag versehentlich eine Übertragung akzeptiert, ist der Rückgabewert kein boolescher Wert,
sondern 256 Bit mit einem bestimmten Wert.

Diese Funktion ist eine `view`, was bedeutet, dass sie den Zustand der Blockchain lesen, aber nicht verändern kann.

### Ereignisse {#events}

[Ereignisse](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e)
werden ausgelöst, um Benutzer und Server außerhalb der Blockchain über Ereignisse zu informieren. Beachten Sie, dass der Inhalt von Ereignissen
für Verträge auf der Blockchain nicht verfügbar ist.

```python
# @dev Wird ausgelöst, wenn sich der Besitz eines NFTs durch einen beliebigen Mechanismus ändert. Dieses Ereignis wird ausgelöst, wenn NFTs
#      erstellt (`from` == 0) und zerstört (`to` == 0) werden. Ausnahme: während der Vertragserstellung kann eine beliebige
#      Anzahl von NFTs erstellt und zugewiesen werden, ohne dass ein Transfer ausgelöst wird. Zum Zeitpunkt einer
#      Übertragung wird die genehmigte Adresse für diesen NFT (falls vorhanden) auf keine zurückgesetzt.
# @param _from Absender des NFT (wenn die Adresse eine Null-Adresse ist, bedeutet das die Erstellung eines Tokens).
# @param _to Empfänger des NFT (wenn die Adresse eine Null-Adresse ist, bedeutet das die Zerstörung des Tokens).
# @param _tokenId Der NFT, der übertragen wurde.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

Dies ist ähnlich wie beim ERC-20-Transfer-Ereignis, außer dass wir eine `tokenId` anstelle eines Betrags melden.
Niemand besitzt die Adresse Null, daher verwenden wir sie konventionsgemäß, um die Erstellung und Zerstörung von Token zu melden.

```python
# @dev Dies wird ausgelöst, wenn die genehmigte Adresse für einen NFT geändert oder erneut bestätigt wird. Die Null-
#      Adresse zeigt an, dass es keine genehmigte Adresse gibt. Wenn ein Transfer-Ereignis ausgelöst wird, zeigt dies auch an
#      , dass die genehmigte Adresse für diesen NFT (falls vorhanden) auf keine zurückgesetzt wird.
# @param _owner Eigentümer des NFT.
# @param _approved Adresse, die wir genehmigen.
# @param _tokenId NFT, den wir genehmigen.
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

Eine ERC-721-Genehmigung ist ähnlich wie eine ERC-20-Freigabe. Eine bestimmte Adresse darf einen bestimmten
Token übertragen. Dies gibt Verträgen einen Mechanismus, um zu reagieren, wenn sie einen Token annehmen. Verträge können nicht
auf Ereignisse lauschen, wenn Sie also nur den Token an sie übertragen, „wissen“ sie nichts davon. Auf diese Weise reicht der
Eigentümer zunächst eine Genehmigung ein und sendet dann eine Anfrage an den Vertrag: „Ich habe Ihnen die Genehmigung erteilt, den Token
X zu übertragen, bitte tun Sie ...“.

Dies ist eine Designentscheidung, um den ERC-721-Standard dem ERC-20-Standard ähnlich zu machen. Da
ERC-721-Token nicht fungibel sind, kann ein Vertrag auch erkennen, dass er einen bestimmten Token erhalten hat, indem er sich den Besitz des Tokens
ansieht.

```python
# @dev Dies wird ausgelöst, wenn ein Betreiber für einen Eigentümer aktiviert oder deaktiviert wird. Der Betreiber kann alle NFTs des Eigentümers verwalten.
#
# @param _owner Eigentümer des NFT.
# @param _operator Adresse, für die wir Betreiberrechte festlegen.
# @param _approved Status der Betreiberrechte (true, wenn Betreiberrechte erteilt werden, und false, wenn sie
# widerrufen werden).
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

Manchmal ist es nützlich, einen _Betreiber_ zu haben, der alle Token eines Kontos von einem bestimmten Typ verwalten kann (diejenigen, die von
einem bestimmten Vertrag verwaltet werden), ähnlich wie eine Vollmacht. Zum Beispiel könnte ich einem Vertrag eine solche Vollmacht erteilen, der prüft, ob
ich ihn sechs Monate lang nicht kontaktiert habe, und wenn ja, mein Vermögen an meine Erben verteilt (wenn einer von ihnen danach fragt, können Verträge
nichts tun, ohne durch eine Transaktion aufgerufen zu werden). Bei ERC-20 können wir einem Erbvertrag einfach eine hohe Freigabe erteilen,
aber das funktioniert bei ERC-721 nicht, da die Token nicht fungibel sind. Dies ist das Äquivalent.

Der `approved`-Wert teilt uns mit, ob das Ereignis eine Genehmigung oder den Widerruf einer Genehmigung betrifft.

### Zustandsvariablen {#state-vars}

Diese Variablen enthalten den aktuellen Zustand der Token: welche verfügbar sind und wem sie gehören. Die meisten davon
sind `HashMap`-Objekte, [unidirektionale Zuordnungen, die zwischen zwei Typen bestehen](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Zuordnung von der NFT-ID zur Adresse, der sie gehört.
idToOwner: HashMap[uint256, address]

# @dev Zuordnung von der NFT-ID zur genehmigten Adresse.
idToApprovals: HashMap[uint256, address]
```

Benutzer- und Vertragsidentitäten in Ethereum werden durch 160-Bit-Adressen dargestellt. Diese beiden Variablen bilden
Token-IDs auf ihre Eigentümer und diejenigen ab, die für ihre Übertragung genehmigt sind (maximal einer für jeden). In Ethereum
sind nicht initialisierte Daten immer null. Wenn es also keinen Eigentümer oder genehmigten Überträger gibt, ist der Wert für diesen Token
null.

```python
# @dev Zuordnung von der Eigentümeradresse zur Anzahl seiner Token.
ownerToNFTokenCount: HashMap[address, uint256]
```

Diese Variable enthält die Anzahl der Token für jeden Eigentümer. Es gibt keine Zuordnung von Eigentümern zu Token, daher
ist der einzige Weg, die Token zu identifizieren, die einem bestimmten Eigentümer gehören, der Blick zurück in die Ereignishistorie der Blockchain,
um die entsprechenden `Transfer`-Ereignisse zu sehen. Wir können diese Variable verwenden, um zu wissen, wann wir alle NFTs haben und nicht
noch weiter in die Vergangenheit blicken müssen.

Beachten Sie, dass dieser Algorithmus nur für Benutzeroberflächen und externe Server funktioniert. Code, der auf der Blockchain
selbst läuft, kann vergangene Ereignisse nicht lesen.

```python
# @dev Zuordnung von der Eigentümeradresse zur Zuordnung von Betreiberadressen.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Ein Konto kann mehr als einen Betreiber haben. Eine einfache `HashMap` reicht nicht aus, um
sie zu verfolgen, da jeder Schlüssel zu einem einzigen Wert führt. Stattdessen können Sie
`HashMap[address, bool]` als Wert verwenden. Standardmäßig ist der Wert für jede Adresse `False`, was bedeutet, dass sie
kein Betreiber ist. Sie können die Werte bei Bedarf auf `True` setzen.

```python
# @dev Adresse des Minters, der einen Token prägen kann
minter: address
```

Neue Token müssen irgendwie erstellt werden. In diesem Vertrag gibt es eine einzige Entität, die dazu berechtigt ist, der
`minter`. Dies ist zum Beispiel für ein Spiel wahrscheinlich ausreichend. Für andere Zwecke könnte es notwendig sein,
eine kompliziertere Geschäftslogik zu erstellen.

```python
# @dev Zuordnung der Schnittstellen-ID zu bool, ob sie unterstützt wird oder nicht
supportedInterfaces: HashMap[bytes32, bool]

# @dev ERC165-Schnittstellen-ID von ERC165
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ERC165-Schnittstellen-ID von ERC721
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) spezifiziert einen Mechanismus für einen Vertrag, um offenzulegen, wie Anwendungen
mit ihm kommunizieren können und welchen ERCs er entspricht. In diesem Fall entspricht der Vertrag ERC-165 und ERC-721.

### Funktionen {#functions}

Dies sind die Funktionen, die ERC-721 tatsächlich implementieren.

#### Konstruktor {#constructor}

```python
@external
def __init__():
```

In Vyper, wie in Python, heißt die Konstruktorfunktion `__init__`.

```python
    """
    @dev Vertragskonstruktor.
    """
```

In Python und in Vyper können Sie auch einen Kommentar erstellen, indem Sie eine mehrzeilige Zeichenfolge (die mit `"""` beginnt und endet
) angeben und sie in keiner Weise verwenden. Diese Kommentare können auch
[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) enthalten.

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

Um auf Zustandsvariablen zuzugreifen, verwenden Sie `self.<Variablenname>`` (wiederum, wie in Python).

#### View-Funktionen {#views}

Dies sind Funktionen, die den Zustand der Blockchain nicht verändern und daher
kostenlos ausgeführt werden können, wenn sie extern aufgerufen werden. Wenn die View-Funktionen von einem Vertrag aufgerufen werden, müssen sie dennoch auf
jedem Node ausgeführt werden und kosten daher Gas.

```python
@view
@external
```

Diese Schlüsselwörter vor einer Funktionsdefinition, die mit einem At-Zeichen (`@`) beginnen, werden als _Dekorationen_ bezeichnet. Sie
geben die Umstände an, unter denen eine Funktion aufgerufen werden kann.

- `@view` gibt an, dass diese Funktion eine `view` ist.
- `@external` gibt an, dass diese spezielle Funktion durch Transaktionen und von anderen Verträgen aufgerufen werden kann.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

Im Gegensatz zu Python ist Vyper eine [statisch typisierte Sprache](https://wikipedia.org/wiki/Type_system#Static_type_checking).
Sie können keine Variable oder einen Funktionsparameter deklarieren, ohne den [Datentyp](https://vyper.readthedocs.io/en/latest/types.html) anzugeben. In diesem Fall ist der Eingabeparameter `bytes32`, ein 256-Bit-Wert
(256 Bit ist die native Wortgröße der [Ethereum Virtual Machine](/developers/docs/evm/)). Die Ausgabe ist ein boolescher
Wert. Konventionsgemäß beginnen die Namen von Funktionsparametern mit einem Unterstrich (`_`).

```python
    """
    @dev Die Schnittstellenidentifikation ist in ERC-165 spezifiziert.
    @param _interfaceID ID der Schnittstelle
    """
    return self.supportedInterfaces[_interfaceID]
```

Gibt den Wert aus der `self.supportedInterfaces`-HashMap zurück, der im Konstruktor (`__init__`) gesetzt wird.

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
         Löst einen Fehler aus, wenn `_owner` die Null-Adresse ist. NFTs, die der Null-Adresse zugewiesen sind, werden als ungültig betrachtet.
    @param _owner Adresse, für die das Guthaben abgefragt werden soll.
    """
    assert _owner != ZERO_ADDRESS
```

Diese Zeile [stellt sicher](https://vyper.readthedocs.io/en/latest/statements.html#assert), dass `_owner` nicht
Null ist. Wenn doch, gibt es einen Fehler und die Operation wird rückgängig gemacht.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev Gibt die Adresse des Besitzers des NFT zurück.
         Löst einen Fehler aus, wenn `_tokenId` kein gültiger NFT ist.
    @param _tokenId Der Bezeichner für einen NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Löst einen Fehler aus, wenn `_tokenId` kein gültiger NFT ist
    assert owner != ZERO_ADDRESS
    return owner
```

In der Ethereum Virtual Machine (EVM) ist jeder Speicher, in dem kein Wert gespeichert ist, null.
Wenn es keinen Token bei `_tokenId` gibt, dann ist der Wert von `self.idToOwner[_tokenId]` null. In diesem
Fall wird die Funktion zurückgesetzt.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Holt die genehmigte Adresse für einen einzelnen NFT.
         Löst einen Fehler aus, wenn `_tokenId` kein gültiger NFT ist.
    @param _tokenId ID des NFT, dessen Genehmigung abgefragt werden soll.
    """
    # Löst einen Fehler aus, wenn `_tokenId` kein gültiger NFT ist
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

Beachten Sie, dass `getApproved` null zurückgeben _kann_. Wenn der Token gültig ist, gibt er `self.idToApprovals[_tokenId]` zurück.
Wenn es keinen Genehmiger gibt, ist dieser Wert null.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev Prüft, ob `_operator` ein zugelassener Betreiber für `_owner` ist.
    @param _owner Die Adresse, der die NFTs gehören.
    @param _operator Die Adresse, die im Namen des Eigentümers handelt.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

Diese Funktion prüft, ob `_operator` berechtigt ist, alle Token von `_owner` in diesem Vertrag zu verwalten.
Da es mehrere Operatoren geben kann, ist dies eine zweistufige HashMap.

#### Transfer-Hilfsfunktionen {#transfer-helpers}

Diese Funktionen implementieren Operationen, die Teil der Übertragung oder Verwaltung von Token sind.

```python

### HILFSFUNKTIONEN FÜR DIE ÜBERTRAGUNG ###

@view
@internal
```

Diese Dekoration, `@internal`, bedeutet, dass die Funktion nur von anderen Funktionen innerhalb desselben
Vertrags aus zugänglich ist. Konventionsgemäß beginnen diese Funktionsnamen ebenfalls mit einem Unterstrich (`_`).

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Gibt zurück, ob der angegebene Spender eine gegebene Token-ID übertragen kann
    @param spender Adresse des abzufragenden Spenders
    @param tokenId uint256 ID des zu übertragenden Tokens
    @return bool, ob der msg.sender für die angegebene Token-ID genehmigt ist,
        ein Betreiber des Eigentümers oder der Eigentümer des Tokens ist
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

Es gibt drei Möglichkeiten, wie eine Adresse zur Übertragung eines Tokens berechtigt sein kann:

1. Die Adresse ist der Eigentümer des Tokens
2. Die Adresse ist für die Ausgabe dieses Tokens zugelassen
3. Die Adresse ist ein Operator für den Eigentümer des Tokens

Die obige Funktion kann eine `view` sein, da sie den Zustand nicht ändert. Um die Betriebskosten zu senken, sollte jede
Funktion, die eine `view` sein _kann_, auch eine `view` _sein_.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Einen NFT zu einer bestimmten Adresse hinzufügen
         Löst einen Fehler aus, wenn `_tokenId` jemandem gehört.
    """
    # Löst einen Fehler aus, wenn `_tokenId` jemandem gehört
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # Den Besitzer wechseln
    self.idToOwner[_tokenId] = _to
    # Zählverfolgung ändern
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Entfernen eines NFT von einer bestimmten Adresse
         Löst einen Fehler aus, wenn `_from` nicht der aktuelle Besitzer ist.
    """
    # Löst einen Fehler aus, wenn `_from` nicht der aktuelle Besitzer ist
    assert self.idToOwner[_tokenId] == _from
    # Den Besitzer wechseln
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # Zählverfolgung ändern
    self.ownerToNFTokenCount[_from] -= 1
```

Wenn es ein Problem mit einer Übertragung gibt, machen wir den Aufruf rückgängig.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Löschen einer Genehmigung für eine bestimmte Adresse
         Löst einen Fehler aus, wenn `_owner` nicht der aktuelle Besitzer ist.
    """
    # Löst einen Fehler aus, wenn `_owner` nicht der aktuelle Besitzer ist
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # Genehmigungen zurücksetzen
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

Ändern Sie den Wert nur, wenn es nötig ist. Zustandsvariablen leben im Speicher. Das Schreiben in den Speicher ist
eine der teuersten Operationen, die die EVM (Ethereum Virtual Machine) durchführt (in Bezug auf
[Gas](/developers/docs/gas/)). Daher ist es eine gute Idee, dies zu minimieren, denn selbst das Schreiben des
vorhandenen Wertes hat hohe Kosten.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Führt die Übertragung eines NFT aus.
         Löst eine Ausnahme aus, es sei denn, `msg.sender` ist der aktuelle Eigentümer, ein autorisierter Betreiber oder die genehmigte
         Adresse für diesen NFT. (HINWEIS: `msg.sender` ist in einer privaten Funktion nicht erlaubt, also `_sender` übergeben.)
         Löst eine Ausnahme aus, wenn `_to` die Null-Adresse ist.
         Löst eine Ausnahme aus, wenn `_from` nicht der aktuelle Eigentümer ist.
         Löst eine Ausnahme aus, wenn `_tokenId` kein gültiger NFT ist.
    """
```

Wir haben diese interne Funktion, weil es zwei Möglichkeiten gibt, Token zu übertragen (regulär und sicher), aber
wir wollen nur eine einzige Stelle im Code, an der wir dies tun, um die Prüfung zu erleichtern.

```python
    # Anforderungen prüfen
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Löst einen Fehler aus, wenn `_to` die Null-Adresse ist
    assert _to != ZERO_ADDRESS
    # Genehmigung löschen. Löst einen Fehler aus, wenn `_from` nicht der aktuelle Besitzer ist
    self._clearApproval(_from, _tokenId)
    # NFT entfernen. Löst einen Fehler aus, wenn `_tokenId` kein gültiger NFT ist
    self._removeTokenFrom(_from, _tokenId)
    # NFT hinzufügen
    self._addTokenTo(_to, _tokenId)
    # Die Übertragung protokollieren
    log Transfer(_from, _to, _tokenId)
```

Um ein Ereignis in Vyper auszulösen, verwenden Sie eine `log`-Anweisung ([siehe hier für weitere Details](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).

#### Transfer-Funktionen {#transfer-funs}

```python

### TRANSFER-FUNKTIONEN ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Löst einen Fehler aus, es sei denn `msg.sender` ist der aktuelle Eigentümer, ein autorisierter Betreiber oder die genehmigte
         Adresse für diesen NFT.
         Löst einen Fehler aus, wenn `_from` nicht der aktuelle Eigentümer ist.
         Löst einen Fehler aus, wenn `_to` die Null-Adresse ist.
         Löst einen Fehler aus, wenn `_tokenId` kein gültiger NFT ist.
    @notice Der Aufrufer ist dafür verantwortlich zu bestätigen, dass `_to` in der Lage ist, NFTs zu empfangen, andernfalls
            können sie dauerhaft verloren gehen.
    @param _from Der aktuelle Eigentümer des NFT.
    @param _to Der neue Eigentümer.
    @param _tokenId Der zu übertragende NFT.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Mit dieser Funktion können Sie an eine beliebige Adresse übertragen. Sofern die Adresse nicht einem Benutzer oder einem Vertrag gehört, der
weiß, wie man Token überträgt, wird jeder Token, den Sie übertragen, an dieser Adresse hängen bleiben und unbrauchbar sein.

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Überträgt das Eigentum an einem NFT von einer Adresse an eine andere.
         Löst eine Ausnahme aus, es sei denn `msg.sender` ist der aktuelle Eigentümer, ein autorisierter Betreiber oder die
         genehmigte Adresse für diesen NFT.
         Löst eine Ausnahme aus, wenn `_from` nicht der aktuelle Eigentümer ist.
         Löst eine Ausnahme aus, wenn `_to` die Null-Adresse ist.
         Löst eine Ausnahme aus, wenn `_tokenId` kein gültiger NFT ist.
         Wenn `_to` ein Smart Contract ist, ruft es `onERC721Received` auf `_to` auf und löst einen Fehler aus, wenn
         der Rückgabewert nicht `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))` ist.
         HINWEIS: bytes4 wird durch bytes32 mit Padding dargestellt
    @param _from Der aktuelle Eigentümer des NFT.
    @param _to Der neue Eigentümer.
    @param _tokenId Der zu übertragende NFT.
    @param _data Zusätzliche Daten ohne spezifiziertes Format, die im Aufruf an `_to` gesendet werden.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Es ist in Ordnung, die Übertragung zuerst durchzuführen, denn wenn es ein Problem gibt, werden wir es sowieso rückgängig machen,
so dass alles, was in dem Aufruf getan wird, abgebrochen wird.

```python
    if _to.is_contract: # prüfen, ob `_to` eine Vertragsadresse ist
```

Prüfen Sie zunächst, ob die Adresse ein Vertrag ist (ob sie Code enthält). Wenn nicht, gehen Sie davon aus, dass es sich um eine Benutzeradresse
handelt und der Benutzer den Token verwenden oder übertragen kann. Aber lassen Sie sich nicht
in falscher Sicherheit wiegen. Sie können Token auch mit `safeTransferFrom` verlieren, wenn Sie sie
an eine Adresse übertragen, für die niemand den privaten Schlüssel kennt.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Rufen Sie den Zielvertrag auf, um zu sehen, ob er ERC-721-Token empfangen kann.

```python
        # Löst einen Fehler aus, wenn das Übertragungsziel ein Vertrag ist, der 'onERC721Received' nicht implementiert
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

Wenn das Ziel ein Vertrag ist, der aber keine ERC-721-Token akzeptiert (oder der sich entschieden hat, diese
besondere Übertragung nicht zu akzeptieren), wird die Aktion rückgängig gemacht.

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Legt die genehmigte Adresse für einen NFT fest oder bestätigt sie erneut. Die Null-Adresse gibt an, dass es keine genehmigte Adresse gibt.
         Löst einen Fehler aus, es sei denn `msg.sender` ist der aktuelle NFT-Eigentümer oder ein autorisierter Betreiber des aktuellen Eigentümers.
         Löst einen Fehler aus, wenn `_tokenId` kein gültiger NFT ist. (HINWEIS: Dies ist nicht im EIP geschrieben)
         Löst einen Fehler aus, wenn `_approved` der aktuelle Eigentümer ist. (HINWEIS: Dies ist nicht im EIP geschrieben)
    @param _approved Adresse, die für die angegebene NFT-ID genehmigt werden soll.
    @param _tokenId ID des zu genehmigenden Tokens.
    """
    owner: address = self.idToOwner[_tokenId]
    # Löst einen Fehler aus, wenn `_tokenId` kein gültiger NFT ist
    assert owner != ZERO_ADDRESS
    # Löst einen Fehler aus, wenn `_approved` der aktuelle Eigentümer ist
    assert _approved != owner
```

Wenn Sie konventionsgemäß keinen Genehmiger haben wollen, ernennen Sie die Null-Adresse, nicht sich selbst.

```python
    # Anforderungen prüfen
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Um eine Genehmigung zu erteilen, können Sie entweder der Eigentümer sein oder ein vom Eigentümer autorisierter Betreiber.

```python
    # Die Genehmigung festlegen
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Aktiviert oder deaktiviert die Genehmigung für einen Dritten ("Betreiber"), alle
         Vermögenswerte von `msg.sender` zu verwalten. Es löst auch das ApprovalForAll-Ereignis aus.
         Löst einen Fehler aus, wenn `_operator` der `msg.sender` ist. (HINWEIS: Dies ist nicht im EIP geschrieben)
    @notice Dies funktioniert auch, wenn der Absender zu diesem Zeitpunkt keine Token besitzt.
    @param _operator Adresse, die zum Satz der autorisierten Betreiber hinzugefügt werden soll.
    @param _approved True, wenn die Betreiber genehmigt sind, false, um die Genehmigung zu widerrufen.
    """
    # Löst einen Fehler aus, wenn `_operator` der `msg.sender` ist
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### Neue Token prägen und bestehende zerstören {#mint-burn}

Das Konto, das den Vertrag erstellt hat, ist der `minter`, der Superuser, der berechtigt ist, neue
NFTs zu prägen. Jedoch ist es ihm nicht erlaubt, bestehende Token zu verbrennen. Nur der Eigentümer oder eine vom Eigentümer
autorisierte Entität kann dies tun.

```python
### PRÄGE- & VERBRENNUNGSFUNKTIONEN ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Diese Funktion gibt immer `True` zurück, denn wenn die Operation fehlschlägt, wird sie rückgängig gemacht.

```python
    """
    @dev Funktion zum Prägen von Token
         Löst einen Fehler aus, wenn `msg.sender` nicht der Minter ist.
         Löst einen Fehler aus, wenn `_to` die Null-Adresse ist.
         Löst einen Fehler aus, wenn `_tokenId` jemandem gehört.
    @param _to Die Adresse, die die geprägten Token erhalten wird.
    @param _tokenId Die zu prägende Token-ID.
    @return Ein boolescher Wert, der angibt, ob die Operation erfolgreich war.
    """
    # Löst einen Fehler aus, wenn `msg.sender` nicht der Minter ist
    assert msg.sender == self.minter
```

Nur der Minter (das Konto, das den ERC-721-Vertrag erstellt hat) kann neue Token prägen. Dies kann in der Zukunft ein
Problem sein, wenn wir die Identität des Minters ändern wollen. In
einem Produktionsvertrag würden Sie wahrscheinlich eine Funktion wollen, die es dem Minter erlaubt, Minter-Privilegien
an jemand anderen zu übertragen.

```python
    # Löst einen Fehler aus, wenn `_to` die Null-Adresse ist
    assert _to != ZERO_ADDRESS
    # NFT hinzufügen. Löst einen Fehler aus, wenn `_tokenId` jemandem gehört
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

Konventionsgemäß zählt das Prägen neuer Token als Übertragung von der Adresse Null.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev Verbrennt einen bestimmten ERC721-Token.
         Löst einen Fehler aus, es sei denn `msg.sender` ist der aktuelle Eigentümer, ein autorisierter Betreiber oder die genehmigte
         Adresse für diesen NFT.
         Löst einen Fehler aus, wenn `_tokenId` kein gültiger NFT ist.
    @param _tokenId uint256 ID des zu verbrennenden ERC721-Tokens.
    """
    # Anforderungen prüfen
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Löst einen Fehler aus, wenn `_tokenId` kein gültiger NFT ist
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

Jeder, der berechtigt ist, einen Token zu übertragen, darf ihn auch verbrennen. Während ein Verbrennen einer Übertragung
an die Null-Adresse gleichkommt, empfängt die Null-Adresse den Token nicht tatsächlich. Dies ermöglicht es uns,
den gesamten Speicher freizugeben, der für den Token verwendet wurde, was die Gaskosten der Transaktion reduzieren kann.

## Verwendung dieses Vertrags {#using-contract}

Im Gegensatz zu Solidity hat Vyper keine Vererbung. Dies ist eine bewusste Designentscheidung, um den
Code klarer und damit leichter zu sichern. Um also Ihren eigenen Vyper ERC-721-Vertrag zu erstellen, nehmen Sie diesen
Vertrag und modifizieren Sie ihn,
um die gewünschte Geschäftslogik zu implementieren.

## Fazit {#conclusion}

Zur Wiederholung hier einige der wichtigsten Ideen in diesem Vertrag:

- Um ERC-721-Token mit einer sicheren Übertragung zu empfangen, müssen Verträge die `ERC721Receiver`-Schnittstelle implementieren.
- Auch wenn Sie eine sichere Übertragung verwenden, können Token immer noch stecken bleiben, wenn Sie sie an eine Adresse senden, deren privater Schlüssel
  unbekannt ist.
- Wenn es ein Problem mit einer Operation gibt, ist es eine gute Idee, den Aufruf `rückgängig zu machen`, anstatt nur
  einen Fehlerwert zurückzugeben.
- ERC-721-Token existieren, wenn sie einen Besitzer haben.
- Es gibt drei Möglichkeiten, zur Übertragung eines NFT autorisiert zu sein. Sie können der Eigentümer sein, für einen bestimmten Token zugelassen sein
  oder ein Betreiber für alle Token des Eigentümers sein.
- Vergangene Ereignisse sind nur außerhalb der Blockchain sichtbar. Code, der innerhalb der Blockchain ausgeführt wird, kann sie nicht anzeigen.

Gehen Sie nun hin und implementieren Sie sichere Vyper-Verträge.

[Hier finden Sie mehr von meiner Arbeit](https://cryptodocguy.pro/).

