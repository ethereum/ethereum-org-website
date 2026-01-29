---
title: "Ethereum-Einführung für Python-Entwickler, Teil 1"
description: "Eine Einführung in die Ethereum-Entwicklung, besonders nützlich für Personen mit Kenntnissen in der Programmiersprache Python"
author: Marc Garreau
lang: de
tags: [ "Python", "web3.py" ]
skill: beginner
published: 08.09.2020
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

Sie haben also von dieser Ethereum-Sache gehört und sind bereit, sich in den Kaninchenbau zu wagen? Dieser Beitrag behandelt kurz einige Blockchain-Grundlagen und führt Sie dann in die Interaktion mit einem simulierten Ethereum-Node ein – das Lesen von Blockdaten, die Überprüfung von Kontoständen und das Senden von Transaktionen. Dabei werden wir die Unterschiede zwischen traditionellen Methoden zur Erstellung von Apps und diesem neuen dezentralen Paradigma hervorheben.

## (Optionale) Voraussetzungen {#soft-prerequisites}

Dieser Beitrag soll für eine breite Palette von Entwicklern zugänglich sein. [Python-Tools](/developers/docs/programming-languages/python/) werden verwendet, aber sie sind nur ein Mittel zum Zweck – es ist kein Problem, wenn Sie kein Python-Entwickler sind. Ich werde jedoch ein paar Annahmen darüber treffen, was Sie bereits wissen, damit wir schnell zu den Ethereum-spezifischen Teilen übergehen können.

Annahmen:

- Sie können sich in einem Terminal zurechtfinden,
- Sie haben ein paar Zeilen Python-Code geschrieben,
- Python Version 3.6 oder höher ist auf Ihrem Rechner installiert (die Verwendung einer [virtuellen Umgebung](https://realpython.com/effective-python-environment/#virtual-environments) wird dringend empfohlen), und
- Sie haben `pip`, den Paket-Installer von Python, verwendet.
  Auch wenn einige dieser Punkte nicht zutreffen oder Sie nicht vorhaben, den Code in diesem Artikel zu reproduzieren, können Sie dem Inhalt wahrscheinlich trotzdem gut folgen.

## Blockchains, kurz erklärt {#blockchains-briefly}

Es gibt viele Möglichkeiten, Ethereum zu beschreiben, doch im Kern ist es eine Blockchain. Blockchains bestehen aus einer Reihe von Blöcken, also lassen Sie uns damit beginnen. Einfach ausgedrückt, ist jeder Block in der Ethereum-Blockchain nur eine Ansammlung von Metadaten und eine Liste von Transaktionen. Im JSON-Format sieht das in etwa so aus:

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   ...,
   "transactions": [...]
}
```

Jeder [Block](/developers/docs/blocks/) hat eine Referenz auf den Block, der davor kam; der `parentHash` ist einfach der Hash des vorherigen Blocks.

<FeaturedText>Hinweis: Ethereum verwendet regelmäßig <a href="https://wikipedia.org/wiki/Hash_function">Hash-Funktionen</a>, um Werte fester Größe („Hashes“) zu erzeugen. Hashes spielen eine wichtige Rolle in Ethereum, aber vorerst können Sie sie sich einfach als eindeutige IDs vorstellen.</FeaturedText>

![Ein Diagramm, das eine Blockchain einschließlich der Daten in jedem Block darstellt](./blockchain-diagram.png)

_Eine Blockchain ist im Grunde eine verkettete Liste; jeder Block hat eine Referenz auf den vorherigen Block._

Diese Datenstruktur ist nichts Neues, aber die Regeln (d. h. die Peer-to-Peer-Protokolle), die das Netzwerk steuern, sind es. Es gibt keine zentrale Autorität; das Netzwerk von Peers muss zusammenarbeiten, um das Netzwerk aufrechtzuerhalten, und konkurrieren, um zu entscheiden, welche Transaktionen in den nächsten Block aufgenommen werden. Wenn Sie also einem Freund Geld schicken möchten, müssen Sie diese Transaktion an das Netzwerk senden und dann darauf warten, dass sie in einen kommenden Block aufgenommen wird.

Die einzige Möglichkeit für die Blockchain, zu verifizieren, dass Geld wirklich von einem Nutzer zu einem anderen gesendet wurde, ist die Nutzung einer für diese Blockchain nativen Währung (d. h. die von ihr geschaffen und verwaltet wird). In Ethereum heißt diese Währung Ether, und die Ethereum-Blockchain enthält die einzige offizielle Aufzeichnung der Kontostände.

## Ein neues Paradigma {#a-new-paradigm}

Dieser neue dezentralisierte Technologie-Stack hat neue Entwicklertools hervorgebracht. Solche Tools gibt es in vielen Programmiersprachen, aber wir werden sie aus der Python-Perspektive betrachten. Um es noch einmal zu wiederholen: Auch wenn Python nicht Ihre bevorzugte Sprache ist, sollte es kein Problem sein, mitzukommen.

Python-Entwickler, die mit Ethereum interagieren möchten, greifen wahrscheinlich zu [Web3.py](https://web3py.readthedocs.io/). Web3.py ist eine Bibliothek, die die Verbindung zu einem Ethereum-Node sowie das Senden und Empfangen von Daten von diesem erheblich vereinfacht.

<FeaturedText>Hinweis: „Ethereum-Node“ und „Ethereum-Client“ werden synonym verwendet. In beiden Fällen bezieht es sich auf die Software, die ein Teilnehmer im Ethereum-Netzwerk ausführt. Diese Software kann Blockdaten lesen, Aktualisierungen empfangen, wenn neue Blöcke zur Kette hinzugefügt werden, neue Transaktionen übertragen und vieles mehr. Technisch gesehen ist der Client die Software, der Node ist der Computer, auf dem die Software läuft.</FeaturedText>

[Ethereum-Clients](/developers/docs/nodes-and-clients/) können so konfiguriert werden, dass sie über [IPC](https://wikipedia.org/wiki/Inter-process_communication), HTTP oder Websockets erreichbar sind, daher muss Web3.py diese Konfiguration widerspiegeln. Web3.py bezeichnet diese Verbindungsoptionen als **Anbieter**. Sie sollten einen der drei Anbieter wählen, um die Web3.py-Instanz mit Ihrem Node zu verbinden.

![Ein Diagramm, das zeigt, wie web3.py IPC verwendet, um Ihre Anwendung mit einem Ethereum-Node zu verbinden](./web3py-and-nodes.png)

_Konfigurieren Sie den Ethereum-Node und Web3.py so, dass sie über dasselbe Protokoll kommunizieren, z. B. IPC in diesem Diagramm._

Sobald Web3.py richtig konfiguriert ist, können Sie mit der Blockchain interagieren. Hier sind ein paar Anwendungsbeispiele für Web3.py als Vorschau auf das, was noch folgt:

```python
# Blockdaten lesen:
w3.eth.get_block('latest')

# eine Transaktion senden:
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## Installation {#installation}

In dieser exemplarischen Vorgehensweise arbeiten wir nur innerhalb eines Python-Interpreters. Wir werden keine Verzeichnisse, Dateien, Klassen oder Funktionen erstellen.

<FeaturedText>Hinweis: In den folgenden Beispielen sind Befehle, die mit `$` beginnen, für die Ausführung im Terminal vorgesehen. (Geben Sie das `$` nicht mit ein, es kennzeichnet nur den Zeilenanfang.)</FeaturedText>

Installieren Sie zuerst [IPython](https://ipython.org/), um eine benutzerfreundliche Umgebung zum Erkunden zu erhalten. IPython bietet unter anderem eine Tab-Vervollständigung an, die es viel einfacher macht, zu erkennen, was mit Web3.py alles möglich ist.

```bash
pip install ipython
```

Web3.py wird unter dem Namen `web3` veröffentlicht. Installieren Sie es wie folgt:

```bash
pip install web3
```

Noch etwas – wir werden später eine Blockchain simulieren, was ein paar weitere Abhängigkeiten erfordert. Sie können diese wie folgt installieren:

```bash
pip install 'web3[tester]'
```

Jetzt sind Sie startklar!

Hinweis: Das `web3[tester]`-Paket funktioniert bis Python 3.10.xx

## Eine Sandbox einrichten {#spin-up-a-sandbox}

Öffnen Sie eine neue Python-Umgebung, indem Sie `ipython` in Ihrem Terminal ausführen. Dies ist vergleichbar mit der Ausführung von `python`, bietet aber deutlich mehr Funktionen.

```bash
ipython
```

Es werden einige Informationen über die Versionen von Python und IPython angezeigt, die Sie verwenden. Anschließend sollten Sie eine Aufforderung zur Eingabe sehen:

```python
In [1]:
```

Sie sehen nun eine interaktive Python-Shell. Im Grunde ist es eine Sandbox zum Herumspielen. Wenn Sie es bis hierher geschafft haben, ist es an der Zeit, Web3.py zu importieren:

```python
In [1]: from web3 import Web3
```

## Einführung in das Web3-Modul {#introducing-the-web3-module}

Das [Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api)-Modul ist nicht nur ein Gateway zu Ethereum, sondern bietet auch einige praktische Funktionen. Sehen wir uns ein paar davon an.

In einer Ethereum-Anwendung müssen Sie üblicherweise Währungsbezeichnungen umrechnen. Das Web3-Modul bietet hierfür ein paar Hilfsmethoden: [from_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.from_wei) und [to_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_wei).

<FeaturedText>
Hinweis: Computer sind bekanntermaßen schlecht bei der Verarbeitung von Dezimalzahlen. Um dies zu umgehen, speichern Entwickler Dollarbeträge oft in Cent. Beispielsweise kann ein Artikel mit einem Preis von 5,99 $ in der Datenbank als 599 gespeichert werden.

Ein ähnliches Muster wird beim Umgang mit Transaktionen in <b>Ether</b> verwendet. Doch anstelle von zwei Dezimalstellen hat Ether 18! Die kleinste Einheit von Ether wird <b>Wei</b> genannt. Das ist also der Wert, der beim Senden von Transaktionen angegeben wird.

1 Ether = 1.000.000.000.000.000.000 Wei

1 Wei = 0,000000000000000001 Ether

</FeaturedText>

Versuchen Sie, einige Werte von und in Wei umzurechnen. Beachten Sie, dass es [Namen für viele der Denominationen](https://web3py.readthedocs.io/en/stable/troubleshooting.html#how-do-i-convert-currency-denominations) zwischen Ether und Wei gibt. Eine der bekanntesten davon ist **Gwei**, da Transaktionsgebühren oft in dieser Einheit dargestellt werden.

```python
In [2]: Web3.to_wei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.from_wei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

Weitere Hilfsmethoden im Web3-Modul umfassen Datenformat-Konverter (z. B. [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)), Adress-Hilfsfunktionen (z. B. [`isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)) und Hash-Funktionen (z. B. [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)). Viele davon werden später in dieser Reihe behandelt. Um alle verfügbaren Methoden und Eigenschaften anzuzeigen, nutzen Sie die automatische Vervollständigung von IPython, indem Sie `Web3` eingeben. und nach dem Punkt zweimal die Tab-Taste drücken.

## Kommunikation mit der Chain {#talk-to-the-chain}

Die Hilfsmethoden sind schön und gut, aber lassen Sie uns zur Blockchain übergehen. Der nächste Schritt ist die Konfiguration von Web3.py zur Kommunikation mit einem Ethereum-Node. Hier haben wir die Möglichkeit, die Anbieter IPC, HTTP oder Websocket zu verwenden.

Wir werden diesen Weg nicht weiter verfolgen, aber ein Beispiel für einen kompletten Arbeitsablauf mit dem HTTP-Anbieter könnte etwa so aussehen:

- Laden Sie einen Ethereum-Node herunter, z. B. [Geth](https://geth.ethereum.org/).
- Starten Sie Geth in einem Terminalfenster und warten Sie, bis es sich mit dem Netzwerk synchronisiert hat. Der Standard-HTTP-Port ist `8545`, ist aber konfigurierbar.
- Weisen Sie Web3.py an, sich mit dem Node über HTTP auf `localhost:8545` zu verbinden.
  `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- Verwenden Sie die `w3`-Instanz, um mit dem Node zu interagieren.

Obwohl dies ein „echter“ Weg ist, dauert der Synchronisierungsprozess Stunden und ist unnötig, wenn Sie nur eine Entwicklungsumgebung wollen. Web3.py stellt für diesen Zweck einen vierten Anbieter bereit, den **EthereumTesterProvider**. Dieser Testanbieter verknüpft sich mit einem simulierten Ethereum-Node mit gelockerten Berechtigungen und einer Spielwährung.

![Ein Diagramm, das den EthereumTesterProvider zeigt, der Ihre web3.py-Anwendung mit einem simulierten Ethereum-Node verbindet](./ethereumtesterprovider.png)

_Der EthereumTesterProvider verbindet sich mit einem simulierten Node und ist praktisch für schnelle Entwicklungsumgebungen._

Dieser simulierte Node heißt [eth-tester](https://github.com/ethereum/eth-tester) und wurde als Teil des `pip install web3[tester]`-Befehls installiert. Die Konfiguration von Web3.py zur Verwendung dieses Testanbieters ist so einfach wie:

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

Jetzt sind Sie bereit, auf der Chain zu surfen! Das ist kein gängiger Ausdruck. Das habe ich mir gerade ausgedacht. Machen wir eine kurze Tour.

## Die Kurztour {#the-quick-tour}

Zuallererst ein Sanity-Check:

```python
In [5]: w3.is_connected()
Out[5]: True
```

Da wir den Testanbieter verwenden, ist dies kein sehr aussagekräftiger Test, aber wenn er fehlschlägt, haben Sie wahrscheinlich bei der Instanziierung der `w3`-Variable etwas falsch eingegeben. Überprüfen Sie, ob Sie die inneren Klammern eingefügt haben, d. h. `Web3.EthereumTesterProvider()`.

## Tour-Stopp Nr. 1: [Konten](/developers/docs/accounts/) {#tour-stop-1-accounts}

Der Einfachheit halber hat der Testanbieter einige Konten erstellt und sie mit Test-Ether vorgeladen.

Zuerst sehen wir uns eine Liste dieser Konten an:

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

Wenn Sie diesen Befehl ausführen, sollten Sie eine Liste von zehn Zeichenketten sehen, die mit `0x` beginnen. Jede davon ist eine **öffentliche Adresse** und ist in gewisser Weise analog zur Kontonummer eines Girokontos. Sie würden diese Adresse jemandem geben, der Ihnen Ether senden möchte.

Wie bereits erwähnt, hat der Testanbieter jedes dieser Konten mit etwas Test-Ether vorgeladen. Finden wir heraus, wie viel sich auf dem ersten Konto befindet:

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

Das sind eine Menge Nullen! Bevor Sie lachend zur falschen Bank gehen, erinnern Sie sich an die Lektion über Währungsbezeichnungen von vorhin. Ether-Werte werden in der kleinsten Einheit, Wei, dargestellt. Rechnen Sie das in Ether um:

```python
In [8]: w3.from_wei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

Eine Million Test-Ether – immer noch nicht zu verachten.

## Tour-Stopp Nr. 2: Blockdaten {#tour-stop-2-block-data}

Werfen wir einen Blick auf den Zustand dieser simulierten Blockchain:

```python
In [9]: w3.eth.get_block('latest')
Out[9]: AttributeDict({
   'number': 0,
   'hash': HexBytes('0x9469878...'),
   'parentHash': HexBytes('0x0000000...'),
   ...
   'transactions': []
})
```

Über einen Block werden viele Informationen zurückgegeben, aber hier sind nur ein paar Dinge hervorzuheben:

- Die Blocknummer ist Null – egal, wie lange es her ist, dass Sie den Testanbieter konfiguriert haben. Im Gegensatz zum echten Ethereum-Netzwerk, das alle 12 Sekunden einen neuen Block hinzufügt, wartet diese Simulation, bis Sie ihr Arbeit geben.
- `transactions` ist aus demselben Grund eine leere Liste: Wir haben noch nichts getan. Dieser erste Block ist ein **leerer Block**, nur um die Kette zu starten.
- Beachten Sie, dass der `parentHash` nur eine Reihe von leeren Bytes ist. Dies bedeutet, dass es sich um den ersten Block in der Kette handelt, auch bekannt als **Genesis-Block**.

## Tour-Stopp Nr. 3: [Transaktionen](/developers/docs/transactions/) {#tour-stop-3-transactions}

Wir stecken bei Block Null fest, bis eine Transaktion ansteht, also geben wir ihm eine. Senden Sie ein paar Test-Ether von einem Konto zum anderen:

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.to_wei(3, 'ether'),
   'gas': 21000
})
```

Dies ist normalerweise der Punkt, an dem Sie mehrere Sekunden warten müssten, bis Ihre Transaktion in einen neuen Block aufgenommen wird. Der gesamte Prozess läuft ungefähr so ab:

1. Senden Sie eine Transaktion und behalten Sie den Transaktions-Hash. Bis der Block mit der Transaktion erstellt und übertragen wird, ist die Transaktion „ausstehend“.
   `tx_hash = w3.eth.send_transaction({ … })`
2. Warten Sie, bis die Transaktion in einen Block aufgenommen wird:
   `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. Setzen Sie die Anwendungslogik fort. Um die erfolgreiche Transaktion anzuzeigen:
   `w3.eth.get_transaction(tx_hash)`

Unsere simulierte Umgebung fügt die Transaktion sofort in einem neuen Block hinzu, sodass wir die Transaktion sofort anzeigen können:

```python
In [11]: w3.eth.get_transaction(tx_hash)
Out[11]: AttributeDict({
   'hash': HexBytes('0x15e9fb95dc39...'),
   'blockNumber': 1,
   'transactionIndex': 0,
   'from': '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
   'to': '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
   'value': 3000000000000000000,
   ...
})
```

Hier sehen Sie einige vertraute Details: Die Felder `from`, `to` und `value` sollten mit den Eingaben unseres `send_transaction`-Aufrufs übereinstimmen. Der andere beruhigende Aspekt ist, dass diese Transaktion als erste Transaktion (`'transactionIndex': 0`) in Block Nummer 1 aufgenommen wurde.

Wir können den Erfolg dieser Transaktion auch leicht überprüfen, indem wir die Salden der beiden beteiligten Konten kontrollieren. Drei Ether sollten von einem zum anderen transferiert worden sein.

```python
In [12]: w3.eth.get_balance(w3.eth.accounts[0])
Out[12]: 999996999979000000000000

In [13]: w3.eth.get_balance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

Letzteres sieht gut aus! Der Saldo stieg von 1.000.000 auf 1.000.003 Ether. Aber was ist mit dem ersten Konto passiert? Es scheint etwas mehr als drei Ether verloren zu haben. Leider ist nichts im Leben umsonst, und die Nutzung des öffentlichen Ethereum-Netzwerks erfordert, dass Sie Ihre Peers für ihre unterstützende Rolle entschädigen. Eine kleine Transaktionsgebühr wurde von dem Konto abgezogen, das die Transaktion übermittelt hat – diese Gebühr ist die Menge des verbrauchten Gases (21.000 Gaseinheiten für eine ETH-Überweisung) multipliziert mit einer Grundgebühr, die je nach Netzwerkaktivität variiert, plus einem Trinkgeld, das an den Validator geht, der die Transaktion in einen Block aufnimmt.

Mehr zu [Gas](/developers/docs/gas/#post-london)

<FeaturedText>Hinweis: Im öffentlichen Netzwerk sind die Transaktionsgebühren variabel und basieren auf der Netzwerknachfrage und der gewünschten Verarbeitungsgeschwindigkeit einer Transaktion. Wenn Sie an einer Aufschlüsselung der Gebührenberechnung interessiert sind, lesen Sie meinen früheren Beitrag darüber, <a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">wie Transaktionen in einen Block aufgenommen werden</a>.</FeaturedText>

## Und durchatmen {#and-breathe}

Wir sind schon eine ganze Weile dabei, also scheint dies ein guter Zeitpunkt für eine Pause zu sein. Der Kaninchenbau geht weiter, und wir werden im zweiten Teil dieser Serie weiterforschen. Einige der kommenden Konzepte: Verbindung zu einem echten Node, Smart Contracts und Token. Haben Sie weitere Fragen? Lassen Sie es mich wissen! Ihr Feedback wird beeinflussen, wie wir von hier aus weitermachen. Anfragen sind über [Twitter](https://twitter.com/wolovim) willkommen.
