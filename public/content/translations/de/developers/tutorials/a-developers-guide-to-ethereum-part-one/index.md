---
title: "Eine Einführung in Ethereum für Python-Entwickler, Teil 1"
description: "Eine Einführung in die Ethereum-Entwicklung, besonders nützlich für Personen mit Kenntnissen in der Programmiersprache Python"
author: Marc Garreau
lang: de
tags: ["Python", "web3.py"]
skill: beginner
breadcrumb: Ethereum mit Python
published: 2020-09-08
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

Sie haben also von dieser Ethereum-Sache gehört und sind bereit, in den Kaninchenbau hinabzusteigen? Dieser Beitrag wird kurz einige Blockchain-Grundlagen behandeln und Sie dann dazu bringen, mit einem simulierten Ethereum-Blockchain-Knoten zu interagieren – Blockdaten lesen, Kontostände überprüfen und Transaktionen senden. Auf dem Weg dorthin werden wir die Unterschiede zwischen traditionellen Methoden zur Erstellung von Apps und diesem neuen dezentralisierten Paradigma hervorheben.

## (Weiche) Voraussetzungen {#soft-prerequisites}

Dieser Beitrag hat den Anspruch, für eine breite Palette von Entwicklern zugänglich zu sein. [Python-Tools](/developers/docs/programming-languages/python/) werden involviert sein, aber sie sind nur ein Vehikel für die Ideen – kein Problem, wenn Sie kein Python-Entwickler sind. Ich werde jedoch nur ein paar Annahmen darüber treffen, was Sie bereits wissen, damit wir schnell zu den Ethereum-spezifischen Teilen übergehen können.

Annahmen:

- Sie können sich in einem Terminal zurechtfinden,
- Sie haben ein paar Zeilen Python-Code geschrieben,
- Python Version 3.6 oder höher ist auf Ihrem Rechner installiert (die Verwendung einer [virtuellen Umgebung](https://realpython.com/effective-python-environment/#virtual-environments) wird dringend empfohlen), und
- Sie haben `pip`, den Paket-Installer von Python, verwendet.
  Nochmals, falls etwas davon nicht zutrifft oder Sie nicht vorhaben, den Code in diesem Artikel zu reproduzieren, können Sie wahrscheinlich trotzdem problemlos folgen.

## Blockchains, kurz gefasst {#blockchains-briefly}

Es gibt viele Möglichkeiten, Ethereum zu beschreiben, aber im Kern ist es eine Blockchain. Blockchains bestehen aus einer Reihe von Blöcken, also fangen wir dort an. Einfach ausgedrückt ist jeder Block auf der Ethereum-Blockchain nur eine Ansammlung von Metadaten und einer Liste von Transaktionen. Im JSON-Format sieht das in etwa so aus:

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   ...,
   "transactions": [...]
}
```

Jeder [Block](/developers/docs/blocks/) hat einen Verweis auf den Block, der davor kam; der `parentHash` ist einfach der Hash des vorherigen Blocks.

<FeaturedText>Hinweis: Ethereum verwendet regelmäßig <a href="https://wikipedia.org/wiki/Hash_function">Hash-Funktionen</a>, um Werte fester Größe („Hashes“) zu erzeugen. Hashes spielen in Ethereum eine wichtige Rolle, aber Sie können sie sich vorerst getrost als eindeutige IDs vorstellen.</FeaturedText>

![Ein Diagramm, das eine Blockchain einschließlich der Daten in jedem Block darstellt](./blockchain-diagram.png)

_Eine Blockchain ist im Wesentlichen eine verkettete Liste; jeder Block hat einen Verweis auf den vorherigen Block._

Diese Datenstruktur ist nichts Neues, aber die Regeln (d. h. Peer-to-Peer-Protokolle), die das Netzwerk steuern, sind es. Es gibt keine zentrale Autorität; das Netzwerk von Peers muss zusammenarbeiten, um das Netzwerk aufrechtzuerhalten, und konkurrieren, um zu entscheiden, welche Transaktionen in den nächsten Block aufgenommen werden. Wenn Sie also einem Freund etwas Geld senden möchten, müssen Sie diese Transaktion an das Netzwerk übertragen und dann darauf warten, dass sie in einen kommenden Block aufgenommen wird.

Die einzige Möglichkeit für die Blockchain zu überprüfen, ob Geld wirklich von einem Benutzer an einen anderen gesendet wurde, besteht darin, eine Währung zu verwenden, die in dieser Blockchain nativ ist (d. h. von ihr erstellt und verwaltet wird). In Ethereum wird diese Währung Ether genannt, und die Ethereum-Blockchain enthält die einzige offizielle Aufzeichnung der Kontostände.

## Ein neues Paradigma {#a-new-paradigm}

Dieser neue dezentralisierte Tech-Stack hat neue Entwickler-Tools hervorgebracht. Solche Tools gibt es in vielen Programmiersprachen, aber wir werden sie durch die Python-Brille betrachten. Um es zu wiederholen: Auch wenn Python nicht Ihre bevorzugte Sprache ist, sollte es nicht viel Mühe bereiten, dem Ganzen zu folgen.

Python-Entwickler, die mit Ethereum interagieren möchten, greifen wahrscheinlich zu [Web3.py](https://web3py.readthedocs.io/). Web3.py ist eine Bibliothek, die die Art und Weise, wie Sie sich mit einem Ethereum-Blockchain-Knoten verbinden und dann Daten von ihm senden und empfangen, erheblich vereinfacht.

<FeaturedText>Hinweis: „Ethereum-Blockchain-Knoten“ und „Ethereum-Anwendung“ werden synonym verwendet. In beiden Fällen bezieht es sich auf die Software, die ein Teilnehmer im Ethereum-Netzwerk ausführt. Diese Software kann Blockdaten lesen, Updates empfangen, wenn neue Blöcke zur Chain hinzugefügt werden, neue Transaktionen übertragen und vieles mehr. Technisch gesehen ist die Anwendung die Software, der Blockchain-Knoten ist der Computer, auf dem die Software läuft.</FeaturedText>

[Ethereum-Anwendungen](/developers/docs/nodes-and-clients/) können so konfiguriert werden, dass sie über [IPC](https://wikipedia.org/wiki/Inter-process_communication), HTTP oder Websockets erreichbar sind, daher muss Web3.py diese Konfiguration widerspiegeln. Web3.py bezeichnet diese Verbindungsoptionen als **Provider**. Sie sollten einen der drei Provider auswählen, um die Web3.py-Instanz mit Ihrem Blockchain-Knoten zu verknüpfen.

![Ein Diagramm, das zeigt, wie web3.py IPC verwendet, um Ihre Anwendung mit einem Ethereum-Blockchain-Knoten zu verbinden](./web3py-and-nodes.png)

_Konfigurieren Sie den Ethereum-Blockchain-Knoten und Web3.py so, dass sie über dasselbe Protokoll kommunizieren, z. B. IPC in diesem Diagramm._

Sobald Web3.py richtig konfiguriert ist, können Sie beginnen, mit der Blockchain zu interagieren. Hier sind ein paar Anwendungsbeispiele für Web3.py als Vorschau auf das, was noch kommt:

```python
# Blockdaten lesen:
w3.eth.get_block('latest')

# Eine Transaktion senden:
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## Installation {#installation}

In dieser exemplarischen Vorgehensweise werden wir nur innerhalb eines Python-Interpreters arbeiten. Wir werden keine Verzeichnisse, Dateien, Klassen oder Funktionen erstellen.

<FeaturedText>Hinweis: In den folgenden Beispielen sollen Befehle, die mit `$` beginnen, im Terminal ausgeführt werden. (Tippen Sie das `$` nicht ein, es kennzeichnet nur den Anfang der Zeile.)</FeaturedText>

Installieren Sie zunächst [IPython](https://ipython.org/) für eine benutzerfreundliche Umgebung zum Erkunden. IPython bietet unter anderem Tab-Vervollständigung, was es viel einfacher macht zu sehen, was innerhalb von Web3.py möglich ist.

```bash
pip install ipython
```

Web3.py wird unter dem Namen `web3` veröffentlicht. Installieren Sie es wie folgt:

```bash
pip install web3
```

Noch etwas – wir werden später eine Blockchain simulieren, was ein paar weitere Abhängigkeiten erfordert. Sie können diese installieren über:

```bash
pip install 'web3[tester]'
```

Sie sind startklar!

Hinweis: Das Paket `web3[tester]` funktioniert bis Python 3.10.xx

## Eine Sandbox starten {#spin-up-a-sandbox}

Öffnen Sie eine neue Python-Umgebung, indem Sie `ipython` in Ihrem Terminal ausführen. Dies ist vergleichbar mit der Ausführung von `python`, bietet aber mehr Extras.

```bash
ipython
```

Dadurch werden einige Informationen über die Versionen von Python und IPython ausgegeben, die Sie ausführen. Danach sollten Sie eine Eingabeaufforderung sehen, die auf Eingaben wartet:

```python
In [1]:
```

Sie sehen nun eine interaktive Python-Shell. Im Wesentlichen ist es eine Sandbox zum Spielen. Wenn Sie es bis hierher geschafft haben, ist es an der Zeit, Web3.py zu importieren:

```python
In [1]: from web3 import Web3
```

## Einführung in das Web3-Modul {#introducing-the-web3-module}

Neben der Funktion als Gateway zu Ethereum bietet das [Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api)-Modul einige praktische Funktionen. Lassen Sie uns ein paar davon erkunden.

In einer Ethereum-Anwendung müssen Sie häufig Währungsstückelungen umrechnen. Das Web3-Modul bietet genau dafür ein paar Hilfsmethoden: [from_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.from_wei) und [to_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_wei).

<FeaturedText>
Hinweis: Computer sind bekanntermaßen schlecht im Umgang mit Dezimalmathematik. Um dies zu umgehen, speichern Entwickler Dollarbeträge oft in Cent. Zum Beispiel kann ein Artikel mit einem Preis von 5,99 $ in der Datenbank als 599 gespeichert werden.

Ein ähnliches Muster wird bei der Handhabung von Transaktionen in <b>Ether</b> verwendet. Anstelle von zwei Dezimalstellen hat Ether jedoch 18! Die kleinste Stückelung von Ether wird <b>Wei</b> genannt, das ist also der Wert, der beim Senden von Transaktionen angegeben wird.

1 Ether = 1000000000000000000 Wei

1 Wei = 0,000000000000000001 Ether

</FeaturedText>

Versuchen Sie, einige Werte in und aus Wei umzurechnen. Beachten Sie, dass [es Namen für viele der Stückelungen gibt](https://web3py.readthedocs.io/en/stable/troubleshooting.html#how-do-i-convert-currency-denominations), die zwischen Ether und Wei liegen. Eine der bekannteren darunter ist **Gwei**, da Transaktionsgebühren oft so dargestellt werden.

```python
In [2]: Web3.to_wei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.from_wei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

Weitere Hilfsmethoden im Web3-Modul umfassen Datenformatkonverter (z. B. [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)), Adresshelfer (z. B. [`isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)) und Hash-Funktionen (z. B. [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)). Viele davon werden später in der Serie behandelt. Um alle verfügbaren Methoden und Eigenschaften anzuzeigen, nutzen Sie die automatische Vervollständigung von IPython, indem Sie `Web3.` eingeben und nach dem Punkt zweimal die Tabulatortaste drücken.

## Mit der Chain kommunizieren {#talk-to-the-chain}

Die praktischen Methoden sind wunderbar, aber lassen Sie uns zur Blockchain übergehen. Der nächste Schritt besteht darin, Web3.py so zu konfigurieren, dass es mit einem Ethereum-Blockchain-Knoten kommuniziert. Hier haben wir die Möglichkeit, die IPC-, HTTP- oder Websocket-Provider zu verwenden.

Wir werden diesen Weg nicht gehen, aber ein Beispiel für einen vollständigen Workflow mit dem HTTP-Provider könnte in etwa so aussehen:

- Laden Sie einen Ethereum-Blockchain-Knoten herunter, z. B. [Geth](https://geth.ethereum.org/).
- Starten Sie Geth in einem Terminalfenster und warten Sie, bis es das Netzwerk synchronisiert hat. Der Standard-HTTP-Port ist `8545`, ist aber konfigurierbar.
- Weisen Sie Web3.py an, sich über HTTP auf `localhost:8545` mit dem Blockchain-Knoten zu verbinden.
  `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- Verwenden Sie die `w3`-Instanz, um mit dem Blockchain-Knoten zu interagieren.

Obwohl dies ein „echter“ Weg ist, dauert der Synchronisierungsprozess Stunden und ist unnötig, wenn Sie nur eine Entwicklungsumgebung möchten. Web3.py stellt für diesen Zweck einen vierten Provider zur Verfügung, den **EthereumTesterProvider**. Dieser Tester-Provider stellt eine Verbindung zu einem simulierten Ethereum-Blockchain-Knoten mit gelockerten Berechtigungen und falscher Währung zum Spielen her.

![Ein Diagramm, das zeigt, wie der EthereumTesterProvider Ihre web3.py-Anwendung mit einem simulierten Ethereum-Blockchain-Knoten verbindet](./ethereumtesterprovider.png)

_Der EthereumTesterProvider verbindet sich mit einem simulierten Blockchain-Knoten und ist praktisch für schnelle Entwicklungsumgebungen._

Dieser simulierte Blockchain-Knoten heißt [eth-tester](https://github.com/ethereum/eth-tester) und wir haben ihn als Teil des Befehls `pip install web3[tester]` installiert. Die Konfiguration von Web3.py zur Verwendung dieses Tester-Providers ist so einfach wie:

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

Jetzt sind Sie bereit, auf der Chain zu surfen! Das sagt man eigentlich nicht. Das habe ich mir gerade ausgedacht. Lassen Sie uns einen kurzen Rundgang machen.

## Der kurze Rundgang {#the-quick-tour}

Das Wichtigste zuerst, ein Plausibilitätscheck:

```python
In [5]: w3.is_connected()
Out[5]: True
```

Da wir den Tester-Provider verwenden, ist dies kein sehr wertvoller Test, aber falls er fehlschlägt, haben Sie wahrscheinlich bei der Instanziierung der Variablen `w3` etwas falsch eingegeben. Überprüfen Sie noch einmal, ob Sie die inneren Klammern eingefügt haben, d. h. `Web3.EthereumTesterProvider()`.

## Tourstopp Nr. 1: [Konten](/developers/docs/accounts/) {#tour-stop-1-accounts}

Der Einfachheit halber hat der Tester-Provider einige Konten erstellt und sie mit Test-Ether aufgeladen.

Lassen Sie uns zunächst eine Liste dieser Konten ansehen:

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

Wenn Sie diesen Befehl ausführen, sollten Sie eine Liste von zehn Zeichenfolgen sehen, die mit `0x` beginnen. Jede ist eine **öffentliche Adresse** und in gewisser Weise analog zur Kontonummer eines Girokontos. Sie würden diese Adresse jemandem geben, der Ihnen Ether senden möchte.

Wie bereits erwähnt, hat der Tester-Provider jedes dieser Konten mit etwas Test-Ether aufgeladen. Lassen Sie uns herausfinden, wie viel auf dem ersten Konto ist:

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

Das sind viele Nullen! Bevor Sie lachend zur falschen Bank rennen, erinnern Sie sich an die Lektion über Währungsstückelungen von vorhin. Ether-Werte werden in der kleinsten Stückelung, Wei, dargestellt. Rechnen Sie das in Ether um:

```python
In [8]: w3.from_wei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

Eine Million Test-Ether – immer noch nicht allzu schäbig.

## Tourstopp Nr. 2: Blockdaten {#tour-stop-2-block-data}

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

Es werden viele Informationen über einen Block zurückgegeben, aber hier sind nur ein paar Dinge hervorzuheben:

- Die Blocknummer ist null – egal, wie lange es her ist, dass Sie den Tester-Provider konfiguriert haben. Im Gegensatz zum echten Ethereum-Netzwerk, das alle 12 Sekunden einen neuen Block hinzufügt, wartet diese Simulation, bis Sie ihr etwas Arbeit geben.
- `transactions` ist aus demselben Grund eine leere Liste: Wir haben noch nichts getan. Dieser erste Block ist ein **leerer Block**, nur um die Chain zu starten.
- Beachten Sie, dass der `parentHash` nur ein Haufen leerer Bytes ist. Dies bedeutet, dass es der erste Block in der Chain ist, auch bekannt als der **Genesis-Block**.

## Tourstopp Nr. 3: [Transaktionen](/developers/docs/transactions/) {#tour-stop-3-transactions}

Wir stecken bei Block null fest, bis es eine ausstehende Transaktion gibt, also geben wir ihm eine. Senden Sie ein paar Test-Ether von einem Konto auf ein anderes:

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.to_wei(3, 'ether'),
   'gas': 21000
})
```

Dies ist normalerweise der Punkt, an dem Sie mehrere Sekunden warten würden, bis Ihre Transaktion in einen neuen Block aufgenommen wird. Der vollständige Prozess läuft in etwa so ab:

1. Reichen Sie eine Transaktion ein und behalten Sie den Transaktions-Hash. Bis der Block, der die Transaktion enthält, erstellt und übertragen wird, ist die Transaktion „ausstehend“.
   `tx_hash = w3.eth.send_transaction({ … })`
2. Warten Sie, bis die Transaktion in einen Block aufgenommen wird:
   `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. Fahren Sie mit der Anwendungslogik fort. Um die erfolgreiche Transaktion anzuzeigen:
   `w3.eth.get_transaction(tx_hash)`

Unsere simulierte Umgebung wird die Transaktion sofort in einem neuen Block hinzufügen, sodass wir die Transaktion sofort anzeigen können:

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

Sie werden hier einige vertraute Details sehen: Die Felder `from`, `to` und `value` sollten mit den Eingaben unseres `send_transaction`-Aufrufs übereinstimmen. Der andere beruhigende Teil ist, dass diese Transaktion als erste Transaktion (`'transactionIndex': 0`) innerhalb von Block Nummer 1 aufgenommen wurde.

Wir können den Erfolg dieser Transaktion auch leicht überprüfen, indem wir die Kontostände der beiden beteiligten Konten überprüfen. Drei Ether sollten von einem zum anderen gewandert sein.

```python
In [12]: w3.eth.get_balance(w3.eth.accounts[0])
Out[12]: 999996999979000000000000

In [13]: w3.eth.get_balance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

Letzteres sieht gut aus! Der Kontostand stieg von 1.000.000 auf 1.000.003 Ether. Aber was ist mit dem ersten Konto passiert? Es scheint etwas mehr als drei Ether verloren zu haben. Leider ist nichts im Leben umsonst, und die Nutzung des öffentlichen Ethereum-Netzwerks erfordert, dass Sie Ihre Peers für ihre unterstützende Rolle entschädigen. Eine kleine Transaktionsgebühr wurde von dem Konto abgezogen, das die Transaktion eingereicht hat – diese Gebühr ist die Menge an verbranntem Gas (21000 Einheiten Gas für eine ETH-Überweisung) multipliziert mit einer Grundgebühr, die je nach Netzwerkaktivität variiert, plus einem Trinkgeld, das an den Validator geht, der die Transaktion in einen Block aufnimmt.

Mehr zu [Gas](/developers/docs/gas/#post-london)

<FeaturedText>Hinweis: Im öffentlichen Netzwerk sind Transaktionsgebühren variabel, basierend auf der Netzwerknachfrage und darauf, wie schnell eine Transaktion verarbeitet werden soll. Wenn Sie an einer Aufschlüsselung der Gebührenberechnung interessiert sind, lesen Sie meinen früheren Beitrag darüber, <a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">wie Transaktionen in einen Block aufgenommen werden</a>.</FeaturedText>

## Und durchatmen {#and-breathe}

Wir sind schon eine Weile dabei, also scheint dies ein so guter Ort wie jeder andere zu sein, um eine Pause einzulegen. Der Kaninchenbau geht weiter, und wir werden im zweiten Teil dieser Serie weiter erkunden. Einige kommende Konzepte: Verbindung zu einem echten Blockchain-Knoten, Smart Contracts und Token. Haben Sie Anschlussfragen? Lassen Sie es mich wissen! Ihr Feedback wird beeinflussen, wohin wir von hier aus gehen. Anfragen sind über [Twitter](https://twitter.com/wolovim) willkommen.