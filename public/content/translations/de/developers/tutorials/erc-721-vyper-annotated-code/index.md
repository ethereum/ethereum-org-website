---
title: "Vyper ERC-721 Vertrag: Ein Leitfaden"
description: Ryuya Nakamuras ERC-721-Vertrag und wie er funktioniert
author: Ori Pomerantz
lang: de
tags: ["vyper", "erc-721", "python"]
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

Kommentare in Vyper beginnen, wie in Python, mit einem Hash (`#`) und gehen bis zum Ende der Zeile. Kommentare, die
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

### Die ERC721Receiver-Schnittstelle {#receiver-interface}

```python
# Schnittstelle für den Vertrag, der von safeTransferFrom() aufgerufen wird
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 unterstützt zwei Arten von Transfers:

- `transferFrom`, was dem Sender ermöglicht, eine beliebige Zieladresse anzugeben, und die Verantwortung
  für den Transfer beim Sender belässt. Das bedeutet, dass Sie an eine ungültige Adresse transferieren können, in welchem Fall
  der NFT für immer verloren ist.
- `safeTransferFrom`, was überprüft, ob die Zieladresse ein Vertrag ist. Wenn ja, fragt der ERC-721-Vertrag
  den empfangenden Vertrag, ob er den NFT empfangen möchte.

Um `safeTransferFrom`-Anfragen zu beantworten, muss ein empfangender Vertrag `ERC721Receiver` implementieren.

```python
            _operator: address,
            _from: address,
```

Die `_from`-Adresse ist der aktuelle Eigentümer des Tokens. Die `_operator`-Adresse ist diejenige, die
den Transfer angefordert hat (diese beiden müssen aufgrund von Freigabebeträgen nicht identisch sein).

```python
            _tokenId: uint256,
```

ERC-721-Token-IDs sind 256 Bit groß. Typischerweise werden sie durch Hashing einer Beschreibung dessen erstellt, was
der Token repräsentiert.

```python
            _data: Bytes[1024]
```

Die Anfrage kann bis zu 1024 Bytes an Benutzerdaten enthalten.

```python
        ) -> bytes32: view
```

Um Fälle zu verhindern, in denen ein Vertrag versehentlich einen Transfer akzeptiert, ist der Rückgabewert kein Boolean,
sondern 256 Bit mit einem bestimmten Wert.

Diese Funktion ist ein `view`, was bedeutet, dass sie den Zustand der Blockchain lesen, aber nicht ändern kann.

### Ereignisse {#events}

[Ereignisse](/developers/docs/smart-contracts/anatomy/#events-and-logs)
werden ausgegeben, um Benutzer und Server außerhalb der Blockchain über Ereignisse zu informieren. Beachten Sie, dass der Inhalt von Ereignissen
für Verträge auf der Blockchain nicht verfügbar ist.

```python
# @dev Wird ausgelöst, wenn sich der Besitz eines NFT durch einen beliebigen Mechanismus ändert. Dieses Ereignis wird ausgelöst, wenn NFTs
#      erstellt (`from` == 0) und zerstört (`to` == 0) werden. Ausnahme: Während der Erstellung des Vertrags kann eine beliebige
#      Anzahl von NFTs erstellt und zugewiesen werden, ohne einen Transfer auszulösen. Zum Zeitpunkt eines jeden
#      Transfers wird die freigegebene Adresse für dieses NFT (falls vorhanden) auf keine zurückgesetzt.
# @param _from Sender des NFT (wenn die Adresse die Nulladresse ist, zeigt dies die Erstellung eines Token an).
# @param _to Empfänger des NFT (wenn die Adresse die Nulladresse ist, zeigt dies die Zerstörung eines Token an).
# @param _tokenId Das NFT, das transferiert wurde.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

Dies ist ähnlich dem ERC-20-Transfer-Ereignis, außer dass wir eine `tokenId` anstelle eines Betrags melden.
Niemand besitzt die Nulladresse, daher verwenden wir sie konventionsgemäß, um die Erstellung und Zerstörung von Token zu melden.

```python
# @dev Dies wird ausgelöst, wenn die freigegebene Adresse für ein NFT geändert oder bestätigt wird. Die
#      Nulladresse zeigt an, dass es keine freigegebene Adresse gibt. Wenn ein Transfer-Ereignis ausgelöst wird, zeigt dies auch
#      an, dass die freigegebene Adresse für dieses NFT (falls vorhanden) auf keine zurückgesetzt wird.
# @param _owner Besitzer des NFT.
# @param _approved Adresse, die wir freigeben.
# @param _tokenId NFT, das wir freigeben.
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

Eine ERC-721-Genehmigung ist ähnlich einem ERC-20-Freigabebetrag. Einer bestimmten Adresse ist es erlaubt, einen bestimmten
Token zu transferieren. Dies bietet einen Mechanismus für Verträge, um zu reagieren, wenn sie einen Token akzeptieren. Verträge können nicht
auf Ereignisse lauschen, wenn Sie ihnen also einfach den Token transferieren, „wissen“ sie nichts davon. Auf diese Weise reicht der
Eigentümer zuerst eine Genehmigung ein und sendet dann eine Anfrage an den Vertrag: „Ich habe genehmigt, dass Sie Token
X transferieren, bitte tun Sie ...“.

Dies ist eine Designentscheidung, um den ERC-721-Standard dem ERC-20-Standard ähnlich zu machen. Da
ERC-721-Token nicht fungibel sind, kann ein Vertrag auch erkennen, dass er einen bestimmten Token erhalten hat, indem er
sich das Eigentum des Tokens ansieht.

```python
# @dev Dies wird ausgelöst, wenn ein Operator für einen Besitzer aktiviert oder deaktiviert wird. Der Operator kann
#      alle NFTs des Besitzers verwalten.
# @param _owner Besitzer des NFT.
# @param _operator Adresse, der wir Operator-Rechte zuweisen.
# @param _approved Status der Operator-Rechte (true, wenn Operator-Rechte gewährt werden, und false, wenn
# widerrufen).
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

Es ist manchmal nützlich, einen _Operator_ zu haben, der alle Token eines Kontos eines bestimmten Typs (diejenigen, die von
einem bestimmten Vertrag verwaltet werden) verwalten kann, ähnlich einer Vollmacht. Zum Beispiel möchte ich eine solche Befugnis vielleicht einem Vertrag geben, der überprüft, ob
ich ihn seit sechs Monaten nicht kontaktiert habe, und wenn ja, mein Vermögen an meine Erben verteilt (wenn einer von ihnen danach fragt, können Verträge
nichts tun, ohne durch eine Transaktion aufgerufen zu werden). Bei ERC-20 können wir einem Erbvertrag einfach einen hohen Freigabebetrag geben,
aber das funktioniert bei ERC-721 nicht, da die Token nicht fungibel sind. Dies ist das Äquivalent.

Der `approved`-Wert sagt uns, ob das Ereignis für eine Genehmigung oder den Widerruf einer Genehmigung ist.

### Zustandsvariablen {#state-vars}

Diese Variablen enthalten den aktuellen Zustand der Token: welche verfügbar sind und wem sie gehören. Die meisten davon
sind `HashMap`-Objekte, [unidirektionale Zuordnungen, die zwischen zwei Typen existieren](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Zuordnung von NFT-ID zur Adresse, die es besitzt.
idToOwner: HashMap[uint256, address]

# @dev Zuordnung von NFT-ID zur freigegebenen Adresse.
idToApprovals: HashMap[uint256, address]
```

Benutzer- und Vertragsidentitäten in Ethereum werden durch 160-Bit-Adressen repräsentiert. Diese beiden Variablen ordnen
Token-IDs ihren Eigentümern und denjenigen zu, die genehmigt sind, sie zu transferieren (maximal einer für jeden). In Ethereum
sind nicht initialisierte Daten immer null, wenn es also keinen Eigentümer oder genehmigten Transferierenden gibt, ist der Wert für diesen Token
null.

```python
# @dev Zuordnung von Besitzer-Adresse zur Anzahl seiner Token.
ownerToNFTokenCount: HashMap[address, uint256]
```

Diese Variable hält die Anzahl der Token für jeden Eigentümer. Es gibt keine Zuordnung von Eigentümern zu Token, daher
ist der einzige Weg, die Token zu identifizieren, die ein bestimmter Eigentümer besitzt, in der Ereignishistorie der Blockchain zurückzublicken
und die entsprechenden `Transfer`-Ereignisse zu sehen. Wir können diese Variable verwenden, um zu wissen, wann wir alle NFTs haben und nicht
noch weiter in der Zeit zurückblicken müssen.

Beachten Sie, dass dieser Algorithmus nur für Benutzeroberflächen und externe Server funktioniert. Code, der auf der Blockchain
selbst läuft, kann keine vergangenen Ereignisse lesen.

```python
# @dev Zuordnung von Besitzer-Adresse zur Zuordnung von Operator-Adressen.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Ein Konto kann mehr als einen einzigen Operator haben. Eine einfache `HashMap` reicht nicht aus, um
sie zu verfolgen, da jeder Schlüssel zu einem einzigen Wert führt. Stattdessen können Sie
`HashMap[address, bool]` als Wert verwenden. Standardmäßig ist der Wert für jede Adresse `False`, was bedeutet, dass sie
kein Operator ist. Sie können Werte nach Bedarf auf `True` setzen.

```python
# @dev Adresse des Prägers, der eine Prägung eines Token durchführen kann
minter: address
```

Neue Token müssen irgendwie erstellt werden. In diesem Vertrag gibt es eine einzige Entität, der dies erlaubt ist, den
`minter`. Dies dürfte beispielsweise für ein Spiel ausreichend sein. Für andere Zwecke könnte es notwendig sein,
eine kompliziertere Geschäftslogik zu erstellen.

```python
# @dev Zuordnung von Schnittstellen-ID zu Bool, ob sie unterstützt wird oder nicht
supportedInterfaces: HashMap[bytes32, bool]

# @dev ERC-165 Schnittstellen-ID von ERC-165
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ERC-165 Schnittstellen-ID von ERC-721
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) spezifiziert einen Mechanismus für einen Vertrag, um offenzulegen, wie Anwendungen
mit ihm kommunizieren können, welchen ERCs er entspricht. In diesem Fall entspricht der Vertrag ERC-165 und ERC-721.

### Funktionen {#functions}

Dies sind die Funktionen, die ERC-721 tatsächlich implementieren.

#### Konstruktor {#constructor}

```python
@external
def __init__():
```

In Vyper, wie in Python, wird die Konstruktor-Funktion `__init__` genannt.

```python
    """
    @dev Konstruktor des Vertrags.
    """
```

In Python und in Vyper können Sie auch einen Kommentar erstellen, indem Sie einen mehrzeiligen String angeben (der mit
`"""` beginnt und endet) und ihn in keiner Weise verwenden. Diese Kommentare können auch
[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) enthalten.

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

Um auf Zustandsvariablen zuzugreifen, verwenden Sie `self.<variable name>` (wiederum wie in Python).

#### View-Funktionen {#views}

Dies sind Funktionen, die den Zustand der Blockchain nicht verändern und daher kostenlos ausgeführt werden können,
wenn sie extern aufgerufen werden. Wenn die View-Funktionen von einem Vertrag aufgerufen werden, müssen sie dennoch auf
jedem Knoten ausgeführt werden und kosten daher Gas.

```python
@view
@external
```

Diese Schlüsselwörter vor einer Funktionsdefinition, die mit einem At-Zeichen (`@`) beginnen, werden _Dekorationen_ genannt. Sie
geben die Umstände an, unter denen eine Funktion aufgerufen werden kann.

- `@view` gibt an, dass diese Funktion eine View ist.
- `@external` gibt an, dass diese spezielle Funktion durch Transaktionen und durch andere Verträge aufgerufen werden kann.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

Im Gegensatz zu Python ist Vyper eine [statisch typisierte Sprache](https://wikipedia.org/wiki/Type_system#Static_type_checking).
Sie können keine Variable oder einen Funktionsparameter deklarieren, ohne den [Datentyp](https://vyper.readthedocs.io/en/latest/types.html) zu identifizieren. In diesem Fall ist der Eingabeparameter `bytes32`, ein 256-Bit-Wert
(256 Bit ist die native Wortgröße der [Ethereum Virtual Machine](/developers/docs/evm/)). Die Ausgabe ist ein boolescher
Wert. Konventionsgemäß beginnen die Namen von Funktionsparametern mit einem Unterstrich (`_`).

```python
    """
    @dev Schnittstellenidentifikation ist in ERC-165 spezifiziert.
    @param _interfaceID ID der Schnittstelle
    """
    return self.supportedInterfaces[_interfaceID]
```

Gibt den Wert aus der `self.supportedInterfaces`-HashMap zurück, die im Konstruktor (`__init__`) gesetzt wird.

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
    assert _owner != ZERO_ADDRESS
```

Diese Zeile [stellt sicher](https://vyper.readthedocs.io/en/latest/statements.html#assert), dass `_owner` nicht
null ist. Wenn doch, liegt ein Fehler vor und die Operation wird rückgängig gemacht.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev Gibt die Adresse des Besitzers des NFT zurück.
         Löst einen Fehler aus, wenn `_tokenId` kein gültiges NFT ist.
    @param _tokenId Der Identifikator für ein NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Löst einen Fehler aus, wenn `_tokenId` kein gültiges NFT ist
    assert owner != ZERO_ADDRESS
    return owner
```

In der Ethereum Virtual Machine (EVM) ist jeder Speicher, in dem kein Wert gespeichert ist, null.
Wenn es keinen Token bei `_tokenId` gibt, dann ist der Wert von `self.idToOwner[_tokenId]` null. In diesem
Fall wird die Funktion rückgängig gemacht.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Ruft die freigegebene Adresse für ein einzelnes NFT ab.
         Löst einen Fehler aus, wenn `_tokenId` kein gültiges NFT ist.
    @param _tokenId ID des NFT, dessen Freigabe abgefragt werden soll.
    """
    # Löst einen Fehler aus, wenn `_tokenId` kein gültiges NFT ist
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

Beachten Sie, dass `getApproved` null zurückgeben _kann_. Wenn der Token gültig ist, gibt es `self.idToApprovals[_tokenId]` zurück.
Wenn es keinen Genehmigenden gibt, ist dieser Wert null.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev Überprüft, ob `_operator` ein freigegebener Operator für `_owner` ist.
    @param _owner Die Adresse, die die NFTs besitzt.
    @param _operator Die Adresse, die im Namen des Besitzers handelt.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

Diese Funktion überprüft, ob es `_operator` erlaubt ist, alle Token von `_owner` in diesem Vertrag zu verwalten.
Da es mehrere Operatoren geben kann, ist dies eine zweistufige HashMap.

#### Transfer-Hilfsfunktionen {#transfer-helpers}

Diese Funktionen implementieren Operationen, die Teil des Transfers oder der Verwaltung von Token sind.

```python

### TRANSFER-FUNKTIONSHILFEN ###

@view
@internal
```

Diese Dekoration, `@internal`, bedeutet, dass die Funktion nur von anderen Funktionen innerhalb desselben
Vertrags zugänglich ist. Konventionsgemäß beginnen diese Funktionsnamen ebenfalls mit einem Unterstrich (`_`).

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Gibt zurück, ob der angegebene Spender eine bestimmte Token-ID transferieren kann
    @param spender Adresse des abzufragenden Spenders
    @param tokenId uint256 ID des Token, das transferiert werden soll
    @return bool ob der msg.sender für die angegebene Token-ID freigegeben ist,
        ein Operator des Besitzers ist oder der Besitzer des Token ist
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

Es gibt drei Möglichkeiten, wie einer Adresse erlaubt werden kann, einen Token zu transferieren:

1. Die Adresse ist der Eigentümer des Tokens
2. Die Adresse ist genehmigt, diesen Token auszugeben
3. Die Adresse ist ein Operator für den Eigentümer des Tokens

Die obige Funktion kann eine View sein, da sie den Zustand nicht ändert. Um die Betriebskosten zu senken,
_sollte_ jede Funktion, die eine View sein _kann_, eine View sein.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Fügt ein NFT zu einer bestimmten Adresse hinzu
         Löst einen Fehler aus, wenn `_tokenId` jemandem gehört.
    """
    # Löst einen Fehler aus, wenn `_tokenId` jemandem gehört
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # Den Besitzer ändern
    self.idToOwner[_tokenId] = _to
    # Zählungsverfolgung ändern
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Entfernt ein NFT von einer bestimmten Adresse
         Löst einen Fehler aus, wenn `_from` nicht der aktuelle Besitzer ist.
    """
    # Löst einen Fehler aus, wenn `_from` nicht der aktuelle Besitzer ist
    assert self.idToOwner[_tokenId] == _from
    # Den Besitzer ändern
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # Zählungsverfolgung ändern
    self.ownerToNFTokenCount[_from] -= 1
```

Wenn es ein Problem mit einem Transfer gibt, machen wir den Aufruf rückgängig.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Löscht eine Freigabe einer bestimmten Adresse
         Löst einen Fehler aus, wenn `_owner` nicht der aktuelle Besitzer ist.
    """
    # Löst einen Fehler aus, wenn `_owner` nicht der aktuelle Besitzer ist
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # Freigaben zurücksetzen
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

Ändern Sie den Wert nur, wenn nötig. Zustandsvariablen leben im Speicher. Das Schreiben in den Speicher ist
eine der teuersten Operationen, die die EVM (Ethereum Virtual Machine) durchführt (in Bezug auf
[Gas](/developers/docs/gas/)). Daher ist es eine gute Idee, dies zu minimieren; selbst das Schreiben des
bestehenden Wertes ist mit hohen Kosten verbunden.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Führt den Transfer eines NFT aus.
         Löst einen Fehler aus, es sei denn, `msg.sender` ist der aktuelle Besitzer, ein autorisierter Operator oder die freigegebene
         Adresse für dieses NFT. (HINWEIS: `msg.sender` ist in einer privaten Funktion nicht erlaubt, übergeben Sie daher `_sender`.)
         Löst einen Fehler aus, wenn `_to` die Nulladresse ist.
         Löst einen Fehler aus, wenn `_from` nicht der aktuelle Besitzer ist.
         Löst einen Fehler aus, wenn `_tokenId` kein gültiges NFT ist.
    """
```

Wir haben diese interne Funktion, weil es zwei Möglichkeiten gibt, Token zu transferieren (regulär und sicher), aber
wir wollen nur eine einzige Stelle im Code, an der wir dies tun, um die Überprüfung zu erleichtern.

```python
    # Anforderungen prüfen
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Löst einen Fehler aus, wenn `_to` die Nulladresse ist
    assert _to != ZERO_ADDRESS
    # Freigabe löschen. Löst einen Fehler aus, wenn `_from` nicht der aktuelle Besitzer ist
    self._clearApproval(_from, _tokenId)
    # NFT entfernen. Löst einen Fehler aus, wenn `_tokenId` kein gültiges NFT ist
    self._removeTokenFrom(_from, _tokenId)
    # NFT hinzufügen
    self._addTokenTo(_to, _tokenId)
    # Den Transfer protokollieren
    log Transfer(_from, _to, _tokenId)
```

Um ein Ereignis in Vyper auszugeben, verwenden Sie eine `log`-Anweisung ([siehe hier für weitere Details](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).

#### Transfer-Funktionen {#transfer-funs}

```python

### TRANSFER-FUNKTIONEN ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Löst einen Fehler aus, es sei denn, `msg.sender` ist der aktuelle Besitzer, ein autorisierter Operator oder die freigegebene
         Adresse für dieses NFT.
         Löst einen Fehler aus, wenn `_from` nicht der aktuelle Besitzer ist.
         Löst einen Fehler aus, wenn `_to` die Nulladresse ist.
         Löst einen Fehler aus, wenn `_tokenId` kein gültiges NFT ist.
    @notice Der Aufrufer ist dafür verantwortlich zu bestätigen, dass `_to` in der Lage ist, NFTs zu empfangen, da sie sonst
            dauerhaft verloren gehen könnten.
    @param _from Der aktuelle Besitzer des NFT.
    @param _to Der neue Besitzer.
    @param _tokenId Das zu transferierende NFT.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Diese Funktion ermöglicht es Ihnen, an eine beliebige Adresse zu transferieren. Es sei denn, die Adresse ist ein Benutzer oder ein Vertrag, der
weiß, wie man Token transferiert, wird jeder Token, den Sie transferieren, in dieser Adresse stecken bleiben und nutzlos sein.

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Transferiert den Besitz eines NFT von einer Adresse zu einer anderen Adresse.
         Löst einen Fehler aus, es sei denn, `msg.sender` ist der aktuelle Besitzer, ein autorisierter Operator oder die
         freigegebene Adresse für dieses NFT.
         Löst einen Fehler aus, wenn `_from` nicht der aktuelle Besitzer ist.
         Löst einen Fehler aus, wenn `_to` die Nulladresse ist.
         Löst einen Fehler aus, wenn `_tokenId` kein gültiges NFT ist.
         Wenn `_to` ein Smart Vertrag ist, ruft es `onERC721Received` auf `_to` auf und löst einen Fehler aus, wenn
         der Rückgabewert nicht `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))` ist.
         HINWEIS: bytes4 wird durch bytes32 mit Padding dargestellt
    @param _from Der aktuelle Besitzer des NFT.
    @param _to Der neue Besitzer.
    @param _tokenId Das zu transferierende NFT.
    @param _data Zusätzliche Daten ohne spezifiziertes Format, die im Aufruf an `_to` gesendet werden.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Es ist in Ordnung, den Transfer zuerst durchzuführen, denn wenn es ein Problem gibt, werden wir ohnehin rückgängig machen,
sodass alles, was im Aufruf getan wurde, abgebrochen wird.

```python
    if _to.is_contract: # prüfen, ob `_to` eine Vertragsadresse ist
```

Überprüfen Sie zuerst, ob die Adresse ein Vertrag ist (ob sie Code hat). Wenn nicht, gehen Sie davon aus, dass es sich um eine Benutzeradresse
handelt und der Benutzer den Token verwenden oder transferieren kann. Aber lassen Sie sich davon nicht in falscher
Sicherheit wiegen. Sie können Token verlieren, selbst mit `safeTransferFrom`, wenn Sie
sie an eine Adresse transferieren, für die niemand den privaten Schlüssel kennt.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Rufen Sie den Zielvertrag auf, um zu sehen, ob er ERC-721-Token empfangen kann.

```python
        # Löst einen Fehler aus, wenn das Transfer-Ziel ein Vertrag ist, der 'onERC721Received' nicht implementiert
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

Wenn das Ziel ein Vertrag ist, aber einer, der keine ERC-721-Token akzeptiert (oder der entschieden hat, diesen
speziellen Transfer nicht zu akzeptieren), machen Sie ihn rückgängig.

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Legt die freigegebene Adresse für ein NFT fest oder bestätigt sie. Die Nulladresse zeigt an, dass es keine freigegebene Adresse gibt.
         Löst einen Fehler aus, es sei denn, `msg.sender` ist der aktuelle NFT-Besitzer oder ein autorisierter Operator des aktuellen Besitzers.
         Löst einen Fehler aus, wenn `_tokenId` kein gültiges NFT ist. (HINWEIS: Dies steht nicht im EIP)
         Löst einen Fehler aus, wenn `_approved` der aktuelle Besitzer ist. (HINWEIS: Dies steht nicht im EIP)
    @param _approved Adresse, die für die angegebene NFT-ID freigegeben werden soll.
    @param _tokenId ID des Token, das freigegeben werden soll.
    """
    owner: address = self.idToOwner[_tokenId]
    # Löst einen Fehler aus, wenn `_tokenId` kein gültiges NFT ist
    assert owner != ZERO_ADDRESS
    # Löst einen Fehler aus, wenn `_approved` der aktuelle Besitzer ist
    assert _approved != owner
```

Konventionsgemäß ernennen Sie die Nulladresse und nicht sich selbst, wenn Sie keinen Genehmigenden haben möchten.

```python
    # Anforderungen prüfen
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Um eine Genehmigung festzulegen, können Sie entweder der Eigentümer oder ein vom Eigentümer autorisierter Operator sein.

```python
    # Die Freigabe festlegen
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Aktiviert oder deaktiviert die Freigabe für einen Dritten ("Operator"), alle
         Vermögenswerte von `msg.sender` zu verwalten. Es löst auch das ApprovalForAll-Ereignis aus.
         Löst einen Fehler aus, wenn `_operator` der `msg.sender` ist. (HINWEIS: Dies steht nicht im EIP)
    @notice Dies funktioniert auch dann, wenn der Sender zu diesem Zeitpunkt keine Token besitzt.
    @param _operator Adresse, die zur Menge der autorisierten Operatoren hinzugefügt werden soll.
    @param _approved True, wenn der Operator freigegeben ist, false, um die Freigabe zu widerrufen.
    """
    # Löst einen Fehler aus, wenn `_operator` der `msg.sender` ist
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
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