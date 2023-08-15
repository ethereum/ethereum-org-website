---
title: Ethereum-Einführung für Pythonentwickler, Teil 1
description: Eine Einführung in die Entwicklung von Ethereum, zugeschnitten auf Entwickler mit einem Hintergrund in Python
author: Marc Garreau
lang: de
tags:
  - "Erste Schritte"
  - "Python"
  - "web3.py"
skill: beginner
published: 2020-09-08
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

Sie haben bereits von Ethereum gehört und möchten tiefer in die Materie eintauchen? In diesem Beitrag werden einige Blockchain-Grundlagen kurz erläutert und dann werden Sie mit einem simulierten Ethereum-Node interagieren – Blockdaten lesen, Kontostände prüfen und Transaktionen senden. Dabei werden wir die Unterschiede zwischen den traditionellen Methoden der App-Entwicklung und diesem neuen dezentralen Modell herausstellen.

## (Benötigtes) Vorwissen {#soft-prerequisites}

Dieser Beitrag ist für Entwickler mit den unterschiedlichsten Kenntnissen gedacht. Zum Einsatz kommen [Python-Tools](/developers/docs/programming-languages/python/). Diese dienen allerdings nur als Mittel zum Zweck, wenn Sie also keine Vorerfahrung mit Python mitbringen, ist das kein Problem. Allerdings treffe ich ein paar Annahmen über Ihr Vorwissen, damit wir schnell zu den Ethereum-spezifischen Inhalten übergehen können.

Vorbedinungen:

- Sie können sich in einem Terminal bewegen
- Sie haben bereits ein paar Zeilen Python-Code geschrieben
- Python Version 3.6 oder höher ist auf Ihrem Rechner installiert (die Verwendung einer [virtuellen Umgebung](https://realpython.com/effective-python-environment/#virtual-environments) wird dringend empfohlen)
- Sie haben `pip`, das Python-Installationspaket, installiert (Nochmals: Sollten Sie einige dieser Anforderungen nicht erfüllen oder nicht nebenher mit programmieren wollen, sollte es dennoch möglich sein, den Beispielen inhaltlich zu folgen).

## Blockchains, kurz gefasst {#blockchains-briefly}

Es gibt viele Möglichkeiten, Ethereum zu beschreiben, doch im Kern ist es eine Blockchain. Blockchains bestehen aus einer Reihe von Blöcken, also lassen Sie uns damit beginnen. Einfach ausgedrückt: Jeder Block der Ethereum-Blockchain besteht nur aus einigen Metadaten und einer Liste von Transaktionen. Im JSON-Format sieht das folgendermaßen aus:

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   "miner": "0xa1b2c3...",
   ...,
   "transactions": [...]
}
```

Jeder [Block](/developers/docs/blocks/) hat eine Referenz auf den vor ihm liegenden Block. Der `parentHash` ist einfach der Hash des vorherigen Blocks.

<div class="featured">Hinweis: Ethereum nutzt regelmäßig <a href="https://wikipedia.org/wiki/Hash_function">Hashfunktionen</a>, um Werte mit fester Länge (Hashes) zu erzeugen. Hashes spielen eine wichtige Rolle in Ethereum, für den Einstieg können Sie sie einfach als eindeutige ID vorstellen.</div>

![Ein Diagramm, das eine Blockchain einschließlich der Daten in jedem Block darstellt](./blockchain-diagram.png)

_Eine Blockchain ist im Grunde eine verknüpfte Liste. Jeder Block verweist auf den vorangehenden Block._

Diese Datenstruktur ist nicht neu. Aber die Regeln (z. B. Peer-to-Peer-Protokolle), die im Netzwerk gelten, sind neu. Es gibt keine zentrale Autorität. Die Netzwerkteilnehmer (Peers) müssen zusammenarbeiten und konkurrieren, um das Netzwerk aufrechtzuerhalten und zu entscheiden, welche Transaktionen in den nächsten Block aufgenommen werden. Wenn Sie also einem Freund Geld schicken möchten, müssen Sie diese Transaktion an das Netzwerk senden und dann darauf warten, dass sie in einen kommenden Block aufgenommen wird.

Die einzige Möglichkeit für die Blockchain, zu verifizieren, dass Geld wirklich von einem Nutzer zu einem anderen gesendet wurde, ist die Nutzung einer für diese Blockchain nativen Währung (d. h. die von ihr geschaffen und verwaltet wird). Bei Ethereum heißt diese Währung Ether. Die Ethereum-Blockchain enthält die einzigen offiziellen Aufzeichnungen über die Kontostände.

## Ein neues Modell {#a-new-paradigm}

Dieser neue dezentralisierte Technologie-Stack hat neue Entwicklertools hervorgebracht. Solche Tools gibt es in vielen Programmiersprachen, aber in diesem Beitrag schauen wir durch die Python-Brille. Um es noch einmal zu betonen: Selbst wenn Python nicht Ihre bevorzugte Sprache ist, sollten Sie den Anweisungen trotzdem leicht folgen können.

Python-Entwickler, die mit Ethereum interagieren möchten, nutzen wahrscheinlich [Web3.py](https://web3py.readthedocs.io/). Web3.py ist eine Bibliothek, die es sehr einfach macht, sich mit einem Ethereum-Node zu verbinden und dann Daten zu senden und zu empfangen.

<div class="featured">Hinweis: "Ethereum-Node" und "Ethereum-Client" werden synonym verwendet. In beiden Fällen ist Software gemeint, die ein Teilnehmer am Ethereum-Netzwerk ausführt. Diese Software kann Blockdaten lesen, Updates empfangen, wenn neue Blöcke zur Kette hinzugefügt ("geminted") werden, neue Transaktionen übertragen und vieles mehr.</div>

[Ethereum-Clients](/developers/docs/nodes-and-clients/) können so konfiguriert werden, dass sie über [IPC](https://wikipedia.org/wiki/Inter-process_communication), HTTP oder Websockets erreichbar sind. Daher muss Web3.py diese Konfiguration spiegeln. Web3.py bezeichnet diese Verbindungsoptionen als **Anbieter**. Sie müssen einen der drei Anbieter wählen, um eine Web3.py-Instanz mit Ihrem Node zu verbinden.

![Ein Diagramm, das zeigt, wie web3.py IPC verwendet, um Ihre Anwendung mit einem Ethereum-Node zu verbinden](./web3py-and-nodes.png)

_Konfigurieren Sie den Ethereum-Node und Web3.py so, dass sie über das gleiche Protokoll kommunizieren. Im folgenden Diagramm ist das beispielsweise IPC._

Sobald Web3.py richtig konfiguriert ist, können Sie mit der Blockchain interagieren. Hier sind eine paar Anwendungsbeispiele für Web3.py als Vorschau auf das was noch folgt:

```python
# read block data:
w3.eth.get_block('latest')

# send a transaction:
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## Installation {#installation}

In dieser Einführung arbeiten wir nur mit dem Python-Interpreter. Wir erzeugen keine Verzeichnisse, Dateien, Klassen oder Funktionen.

<div class="featured">Hinweis: In den folgenden Beispielen kennzeichnet '$' Befehle, die im Terminal ausgeführt werden. (Geben Sie dabei das '$' nicht mit ein. Es ist nur ein Hinweis auf den Beginn einer Zeile.)</div>

Installieren Sie zuerst [IPython](https://ipython.org/), um eine benutzerfreundliche Umgebung zu erstellen. IPython bietet neben anderen Funktionen eine Tab-Vervollständigung an. Damit lässt sich einfacher heruasfinden, was innerhalb von Web3.py möglich ist.

```bash
$ pip install ipython
```

Web3.py wird unter dem Namen `web3` publiziert. Nehmen Sie die Installation wie folgt vor:

```bash
$ pip install web3
```

Als Nächstes werden wir eine Blockchain-Simulation durchführen, die noch einige weitere Abhängigkeiten erfordert. Nehmen Sie die Installation wie folgt vor:

```bash
$ pip install 'web3[tester]'
```

Nun kann es losgehen.

## Eine Sandbox einrichten {#spin-up-a-sandbox}

Öffnen Sie eine neue Python-Umgebung, indem Sie `ipython` in Ihrem Terminal ausführen. Diese Ausführung ist vergleichbar mit `python`, bietet aber deutlich mehr Funktionen.

```bash
$ ipython
```

Es werden einige Informationen über Ihre aktuelle Version von Python und IPython angezeigt. Anschließend sollten Sie eine Aufforderung zur Eingabe erhalten:

```python
In [1]:
```

Sie befinden sich jetzt in einer interaktiven Python-Shell-Umgebung. Hier können Sie sich nun austoben. Nun ist es an der Zeit, Web3.py zu importieren:

```python
In [1]: from web3 import Web3
```

## Einführung in das Web3-Modul {#introducing-the-web3-module}

Das [Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api)-Modul ist nicht nur ein Gateway zu Ethereum, sondern bietet auch einige komfortable Funktionen an. Sehen wir uns ein paar davon genauer an.

In einer Ethereum-Anwendung müssen Sie üblicherweise Währungsbezeichnungen umrechnen. Das Web3-Modul stellt Ihnen dazu hilfreiche Methoden zur Verfügung: [fromWei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.fromWei) und [toWei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toWei).

<div class="featured">
Hinweis: Computer sind bekanntermaßen schlecht bei der Verarbeitung von Dezimalmathematik. Um das zu umgehen, geben Entwickler Dollarbeträge oft in Cent an. Beispiel: Ein Artikel mit einem Preis von 5,99 USD wird in der Datenbank als 599 angelegt.

Transaktionen in <b>Ether</b> werden in ähnlicher Weise verwaltet. Aber statt zwei Dezimalstellen hat Ether 18 Stück. Die kleinste Einheit von Ether wird <b>Wei</b> genannt. Das ist auch der Wert, der beim Senden von Transaktionen angegeben wird.

1 Ether = 1000000000000000000 Wei

1 Wei = 0.000000000000000001 Ether

</div>

Versuchen Sie, einige Werte nach und von Wei zu konvertieren. [](https://web3py.readthedocs.io/en/stable/examples.html#converting-currency-denominations)Beachten Sie, dass es zwischen Ether und Wei noch andere Einheiten gibt. Eine der bekanntesten ist **Gwei**, da Transaktionsgebühren in dieser Einheit angegeben werden.

```python
In [2]: Web3.toWei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.fromWei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

Das Web3-Modul enthält außerdem einen Datenformatkonvertierer (z. B. [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)), Adresse (z. B., [`isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)), und Hashfunktionen (z. B., [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)). Viele davon werden hier genauer erklärt. Um alle verfügbaren Funktionen und Eigenschaften anzuzeigen, können Sie die Autovervollständigung in IPython nutzen. Geben Sie dafür den folgenden Code ein: `Web3`. Anschließend drücken Sie bitte zweimal die Tab-Taste.

## Kommunikation mit der Blockchain {#talk-to-the-chain}

Die bisher vorgestellten Funktionen sind toll. Aber sehen wir uns nun einmal die Blockchain genauer an. Im nächsten Schritt konfiguireren wir Web3.py für die Kommunikation mit einem Ethereum-Node. Dabei können wir IPC, HTTP oder Websocket-Anbieter verwenden.

Wir werden hier nicht weiter darauf eingehen, aber ein Beispiel für einen kompletten Workflow mit dem HTTP-Provider könnte wie folgt aussehen:

- Laden Sie einen Ethereum-Node herunter, z. B. [Geth](https://geth.ethereum.org/).
- Starten Sie Geth in einem Terminalfenster und warten Sie bis die Netzwerksynchronisierung abgeschlossen ist. Der Standard-HTTP-Port ist `8545`, kann jedoch umkonfiguriert werden.
- Stellen Sie eine Verbindung von Web3.py zu dem Ethereum-Node über HTTP, `localhost:8545`, her. `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- Agieren Sie über die `w3`-Instanz mit dem Node.

Wenn Sie nur an einer Entwicklungsumgebung interessiert sind, ist dieser Weg unnötig, da der Synchronisierungsprozess mehrere Stunden dauert. Web3.py stellt für diesen Zweck einen vierten Provider zur Verfügung, den **EthereumTesterProvider**. Dieser Test-Provider ist mit einem simulierten Ethereum-Node mit Fake-Währungen und einfachen Berechtigungen verknüpft.

![Ein Diagramm, das den EthereumTesterProvider zeigt, der Ihre web3.py-Anwendung mit einem simulierten Ethereum-Node verbindet](./ethereumtesterprovider.png)

_Der EthereumTesterProvider verbindet sich mit einem simulierten Node und ist praktisch für schnelle Entwicklungsumgebungen._

Dieser simulierter Node heißt [eth-tester](https://github.com/ethereum/eth-tester) und wurde mit dem Befehl `pip install web3[tester]` installiert. Um das Web3.py mit dem Testanbieter zu verbinden, geben Sie Folgendes ein:

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

Jetzt können Sie mit der Blockchain kommunizieren. Wie das genau funktioniert? Ich habe da etwas für Sie zusammengestellt. Machen wir eine schnelle Tour.

## Los geht's {#the-quick-tour}

Zuallererst eine Zuverlässigkeitsüberprüfung:

```python
In [5]: w3.isConnected()
Out[5]: True
```

Da wir einen Testanbieter verwenden, ist der Test nicht sehr aussagekräftig, doch falls er fehlschlägt, ist die Wahrscheinlichkeit hoch, dass Sie eine falsche Variable in `w3` eingegeben haben. Überprüfen Sie, ob Sie die inneren Klammern eingefügt haben, also `Web3.EthereumTesterProvider()`.

## 1. Stop auf der Tour: [Konten](/developers/docs/accounts/) {#tour-stop-1-accounts}

Der Einfachheit halber hat der Testanbieter bereits einige Konten eingerichtet und sie mit Test-Ether gefüllt.

Zunächst sehen wir uns die folgende Kontenliste an:

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

Wenn Sie diesen Befehl ausführen, sollten Sie eine Liste von zehn Zeichenketten sehen, die mit `0x` beginnen. Jede davon ist eine **öffentliche Adresse** und gewissermaßen analog zur Kontonummer auf einem Prüfkonto. Diese Adresse würden Sie angeben, wenn Ihnen jemand Ether senden will.

Wie bereits erwähnt, hat der Testanbieter jedes dieser Konten mit Test-Ether gefüllt. Lassen Sie uns herausfinden, wie viel sich auf dem ersten Konto befindet:

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

Das sind viele Nullen. Bevor Sie vor Freude in die Luft springen, erinnern Sie sich bitte an unsere vorherige Lektion über die Schreibweise von Währungen. Ether wird in der kleinsten Einheit Wei angegeben. Rechnen Sie dies in Ether um:

```python
In [8]: w3.fromWei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

Eine Millionen Test-Ether – sind immer noch gut.

## 2. Stop auf der Tour: Blockdaten {#tour-stop-2-block-data}

Werfen wir einen Blick auf den Status dieser simulierten Blockchain:

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

Über einen Block werden viele Informationen zurückgegeben, doch auf ein paar davon sollten Sie achten:

- Die Blocknummer ist Null – unabhängig davon, wie lange es her ist, dass Sie den Testanbieter konfiguriert haben. Im Gegensatz zum echten Ethereum-Netzwerk, das ungefähr alle 15 Sekunden einen neuen Block erstellt, wartet diese Simulation, bis sie von Ihnen etwas zu tun bekommt.
- Die `transactions` sind ebenfalls leer, da wir bisher noch nichts gemacht haben. Dieser erste Block ist ein **leerer Block**, nur um die Kette in Gang zu setzen.
- Beachten Sie, dass der `parentHash` nur ein Bund aus leeren Bytes ist. Das bedeutet, dass es sich um den ersten Block in der Kette handelt, auch bekannt als **Genesis Block**.

## 3. Stop auf der Tour: [Transaktionen](/developers/docs/transactions/) {#tour-stop-3-transactions}

Wir verharren bei Block Null bis es eine Transaktion zum Minen gibt, also geben wir ihm eine. Senden Sie ein paar Test-Ether von einem Konto zum anderem:

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.toWei(3, 'ether'),
   'gas': 21000
})
```

Das ist typischerweise der Punkt, an dem Sie mehrere Sekunden warten würden, bis Ihre Transaktion in einem neuen Block erstellt wurde. Der gesamte Prozess läuft wie folgt ab:

1. Übermitteln Sie eine Transaktion und halten Sie den Transaktions-Hash bereit. Die Transaktion ist ausstehend bis sie geminted wurde. `tx_hash = w3.eth.send_transaction({ … })`
2. Warten Sie, bis die Transaktion geminted wurde: `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. Setzen Sie die Anwendungslogik fort. Um die erfolgreiche Transaktion anzuzeigen: `w3.eth.get_transaction(tx_hash)`

Unsere simulierte Umgebung wird die Transaktion sofort in einem neuen Block hinzufügen, so dass wir die Transaktion direkt sehen können:

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

Hier werden sie einige bekannte Details sehen: Die Felder `from`, `to` und `value` sollten mit den Einträgen unseres `send_transaction`-Aufrufs übereinstimmen. Das andere beruhigende Aspekt ist, dass diese Transaktion als erste Transaktion (`'transactionIndex': 0`) in Block Nr. 1 enthalten war.

Wir können den Erfolg dieser Transaktion auch leicht überprüfen, indem wir die Salden der beiden beteiligten Konten kontrollieren. Drei Ether sollten sich von einem auf das andere Konto bewegt haben.

```python
In [12]: w3.eth.get_balance(w3.eth.accounts[0])
Out[12]: 999996999999999999969000

In [13]: w3.eth.get_balance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

Letzteres sieht gut aus. Der Saldo hat sich von 1.000.000 auf 1.000.003 Ether erhöht. Aber was ist mit dem ersten Konto passiert? Es scheint etwas mehr, als drei Ether verloren zu haben. Leider ist nichts im Leben kostenlos. Die Nutzung des öffentlichen Netzes von Ethereum erfordert, dass das Netzwerk für seine Unterstützung eine Aufwandsentschädigung erhält. Eine kleine Transaktionsgebühr wurde vom Konto abgezogen, in Größenordnung von 31000 Wei.

<div class="featured">Hinweis: Im öffentlichen Netzwerk basieren Transaktionsgebühren auf variablen Netzanforderungen und wie schnell Sie eine Transaktion verarbeiten möchten. Wenn Sie an einer Aufschlüsselung der Berechnung der Gebühren interessiert sind, sehen Sie sich meinen früheren Beitrag auf <a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">"Wie Transaktionen in einem Block enthalten sind"</a> an.</div>

## Und atmen {#and-breathe}

Wir sind schon eine ganze Weile dabei, daher ist jetzt ein guter Zeitpunkt für eine Pause. Im zweiten Teil unserer Serie befassen wir uns weiter mit der Materie. Einige der weiteren Konzepte: Verbindung zu einem echten Node, Smart Contracts und Token. Haben Sie weitere Fragen? Lassen Sie es mich wissen. Ihr Feedback hat Einfluss darauf, wohin die Reise geht. Anfragen können Sie gerne über [Twitter](https://twitter.com/wolovim) stellen.
