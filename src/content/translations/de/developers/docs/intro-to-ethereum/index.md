---
title: Einleitung zu Ethereum
description: Die Einführung eines dApp Entwicklers in die Kernkonzepte von Ethereum.
lang: de
---

## Was ist eine Blockchain? {#what-is-a-blockchain}

Eine Blockchain wird am besten als öffentliche Datenbank beschrieben, die über viele Computer in einem Netzwerk aktualisiert und geteilt wird.

"Block" bezieht sich auf die Tatsache, dass Daten und Zustand in sequenziellen Batches oder "Blocks" gespeichert werden. Wenn du ETH an jemand anderen sendest, müssen die Transaktionsdaten zu einem Block hinzugefügt werden, damit der Vorgang erfolgreich ist.

"Chain" bezieht sich auf die Tatsache, dass jeder Block kryptographisch auf seinen vorherigen Block verweist. Mit anderen Worten: Blöcke werden aneinandergekettet. Die Daten in einem Block können sich nicht ändern, ohne alle nachfolgenden Blöcke zu ändern, was den Konsens des gesamten Netzwerks erfordern würde.

Jeder Computer im Netzwerk muss jedem neuen Block und der Kette als Ganzes zustimmen. Diese Computer werden als " Nodes" bezeichnet. Die Nodes stellen sicher, dass jeder, der mit der Blockchain interagiert, die gleichen Daten hat. Um diese verteilte Vereinbarung zu erreichen, brauchen Blockchains einen Konsensmechanismus.

Ethereum verwendet derzeit einen [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/)-Konsensmechanismus. Das bedeutet, dass jeder, der neue Blöcke zur Kette hinzufügen möchte, ein schwieriges Rätsel lösen muss, für das viel Rechenleistung benötigt wird. Das Lösen des Puzzles "beweist", dass die Rechenressourcen verwendet wurden. Dies wird als [Mining](/developers/docs/consensus-mechanisms/pow/mining/) bezeichnet. Mining funktioniert nach einem rauen Versuch-und-Fehler-Prinzip, aber das erfolgreiche Hinzufügen eines Blocks wird in ETH belohnt.

Neue Blöcke werden an die Nodes im Netzwerk gesendet, geprüft und verifiziert, wodurch der Zustand der Blockchain für alle aktualisiert wird.

Zusammenfassend lässt sich also festhalten: Wenn du ETH an jemanden sendest, muss die Transaktion gemint und in einen neuen Block aufgenommen werden. Der aktualisierte Zustand wird dann mit dem gesamten Netzwerk geteilt.

Schau dir an, wie Austin dich durch Blockchains führt:

<YouTube id="zcX7OJ-L8XQ" />

Wenn du sehen willst, wie die Blockchain Daten hasht und der vorherige Block auf alle vorherigen Blöcke verweist, solltest du dir [diese Demo](https://andersbrownworth.com/blockchain/blockchain) von Anders Brownworth und das dazugehörige Video unten ansehen.

Schau dir an, wie Anders Hashes in Blockchains erklärt:

<YouTube id="_160oMzblY8" />

## Was ist Ethereum? {#what-is-ethereum}

Im Ethereum-Universum gibt es einen einzigen kanonischen Computer (genannt die Ethereum virtuelle Maschine oder kurz EVM), dessen Zustand jeder im Ethereum-Netzwerk zustimmt. Jeder, der am Ethereum-Netzwerk (jeder Ethereum-Node) teilnimmt, behält eine Kopie des Zustands dieses Computers. Zusätzlich kann jeder Teilnehmer eine Anfrage an diesen Computer senden, um beliebige Berechnungen durchzuführen. Wenn eine solche Anfrage gesendet wird, überprüfen andere Teilnehmer/Teilnehmerinnen im Netzwerk die Berechnung und führen sie aus ("execute"). Diese Ausführung führt zu einer Zustandsänderung in der EVM, die bestätigt und im gesamten Netzwerk verbreitet wird.

Rechenanfragen werden als Transaktionsanfragen bezeichnet; die Aufzeichnung aller Transaktionen und des aktuellen Zustands der EVM wird auf der Blockchain gespeichert, die wiederum von allen Nodes gespeichert und vereinbart wird.

Kryptographische Mechanismen stellen sicher, dass Transaktionen, die einmal als gültig verifiziert und in die Blockchain aufgenommen wurden, später nicht mehr manipuliert werden können. Dieselben Mechanismen stellen auch sicher, dass alle Transaktionen signiert und mit den entsprechenden "Berechtigungen" ausgeführt werden (niemand außer Alice selbst sollte in der Lage sein, digitale Vermögenswerte von ihrem Konto zu versenden).

## Was ist Ether? {#what-is-ether}

**Ether (ETH)** ist die einheimische Kryptowährung von Ethereum. Der Zweck von Ether ist es, einen Markt für Berechnungen zu ermöglichen. Ein solcher Markt bietet einen wirtschaftlichen Anreiz für die Teilnehmer/Teilnehmerinnen, Transaktionsanfragen zu verifizieren und auszuführen und dem Netzwerk Rechenressourcen zur Verfügung zu stellen.

Jeder Teilnehmer, der eine Transaktionsanfrage sendet, muss dem Netzwerk auch einen bestimmten Betrag an Ether als Kopfgeld anbieten. Dieses Kopfgeld erhält derjenige, der die Transaktion verifiziert, ausführt, in die Blockchain einträgt und an das Netzwerk weiterleitet.

Die Menge an Ether, die bezahlt wird, entspricht der Zeit, die für die Berechnung benötigt wird. Diese Kopfgelder verhindern auch, dass böswillige Teilnehmer/Teilnehmerinnen das Netzwerk absichtlich verstopfen, indem sie die Ausführung von unendlichen Berechnungen oder anderen ressourcenintensiven Skripten anfordern, da diese Teilnehmer für die Rechenzeit bezahlen müssen.

## Was sind Smart Contracts? {#what-are-smart-contracts}

In der Praxis schreiben die Teilnehmer/Teilnehmerinnen nicht jedes Mal einen neuen Code, wenn sie eine Berechnung auf der EVM anfordern wollen. Vielmehr laden Anwendungsentwickler Programme (wiederverwendbare Codeschnipsel) in den EVM-Speicher hoch, und die Nutzer stellen Anfragen, um diese Codeschnipsel mit unterschiedlichen Parametern auszuführen. Wir nennen die Programme, die hochgeladen und durch das Netzwerk ausgeführt werden, Smart Contracts (intelligente Verträge).

Ganz grundsätzlich kannst du dir einen Smart Contract wie eine Art Verkaufsautomat vorstellen: ein Skript, das, wenn es mit bestimmten Parametern aufgerufen wird, bestimmte Aktionen oder Berechnungen durchführt, wenn bestimmte Bedingungen erfüllt sind. Zum Beispiel könnte ein einfacher Händler-Smart-Contract das Eigentum an einem digitalen Vermögenswert erstellen und zuweisen, wenn der Interessent einem bestimmten Empfänger Ether sendet.

Jeder Entwickler kann einen Smart Contract erstellen und im Netzwerk öffentlich machen, während die Blockchain als Datenschicht gegen eine Gebühr an das Netzwerk genutzt wird. Jeder Benutzer kann dann, wiederum gegen eine Gebühr an das Netzwerk, den Smart Contract aufrufen, um seinen Code auszuführen.

Mit Smart Contracts können Entwickler/Entwicklerinnen beliebig komplexe nutzerorientierte Apps und Dienste entwickeln und bereitstellen, wie z. B. Marktplätze, Finanzinstrumente, Spiele etc.

## Terminologie {#terminology}

### Blockchain {#blockchain}

Die Sequenz aller Blöcke, die dem Ethereum-Netzwerk in der Geschichte des Netzwerks übertragen wurden. So benannt, weil jeder Block einen Verweis auf den vorherigen Block enthält, was uns hilft, eine Zuordnung über alle Blöcke (und damit über die genaue Historie) aufrechtzuerhalten.

### ETH {#eth}

Die native Kryptowährung von Ethereum. Nutzer zahlen Ether an andere Nutzer, damit ihre Code-Ausführungsanfragen erfüllt werden.

[Mehr zu ETH](/developers/docs/intro-to-ether/)

### EVM {#evm}

Die Ethereum Virtual Machine ist der globale virtuelle Computer, dessen Zustand jeder Teilnehmer im Ethereum-Netzwerk speichert und dem er zustimmt. Jeder Teilnehmer kann die Ausführung von beliebigem Code auf der EVM beantragen. Jede Codeausführung ändert den Zustand der EVM.

[Mehr zur EVM](/developers/docs/evm/)

### Nodes {#nodes}

Die realen Maschinen, die den EVM-Zustand speichern. Nodes kommunizieren miteinander, um Informationen über den EVM-Zustand und neue Zustandsänderungen zu verbreiten. Jede/r Nutzer/in kann auch die Ausführung von Code anfordern, indem er/sie eine Anfrage zur Codeausführung von einem Node aus sendet. Das Ethereum-Netzwerk selbst ist das Aggregat aller Ethereum-Nodes und deren Kommunikation.

[Mehr zu Nodes](/developers/docs/nodes-and-clients/)

### Konten {#accounts}

Wo Ether gespeichert wird. Nutzer können Konten initialisieren, Ether in die Konten einzahlen und Ether von ihren Konten auf andere Benutzer übertragen. Konten und Kontostände werden in einer großen Tabelle in der EVM gespeichert; sie sind Teil des EVM-Zustands.

[Mehr über Konten](/developers/docs/accounts/)

### Transaktionen {#transactions}

Eine "Transaktionsanfrage" ist der formale Begriff für eine Anfrage zur Codeausführung auf der EVM, und eine "Transaktion" ist eine erfüllte Transaktionsanfrage und die damit verbundene Änderung des EVM-Zustands. Jeder Benutzer kann eine Transaktionsanfrage an das Netzwerk von einem Node senden. Damit sich die Transaktionsanfrage auf den vereinbarten EVM-Zustand auswirkt, muss sie von einem anderen Node validiert, ausgeführt und an das Netzwerk übertragen werden. Die Ausführung eines Codes führt zu einer Zustandsänderung in der EVM. Nach der Integration wird diese Zustandsänderung an alle Nodes im Netzwerk übertragen. Einige Beispiele für Transaktionen:

- Schicke X Ether von meinem Konto an das Konto von Alice.
- Veröffentliche Smart-Contract-Code in den EVM-Zustand.
- Führe den Code des Smart Contracts unter Adresse X in der EVM mit Argumenten Y aus.

[Mehr zu Transaktionen](/developers/docs/transactions/)

### Blöcke {#blocks}

Da das Transaktionsvolumen sehr hoch ist, werden die Transaktionen in Stapeln oder Blöcken "übertragen". Blöcke enthalten in der Regel Dutzende bis Hunderte von Transaktionen.

[Mehr zu Blöcken](/developers/docs/blocks/)

### Smart Contracts {#smart-contracts}

Ein wiederverwendbares Code-Snippet (ein Programm), das ein Entwickler in den EVM-Zustand veröffentlicht. Jeder kann anfragen, dass der Smart-Contract-Code ausgeführt wird, indem er eine Transaktionsanfrage stellt. Da Entwickler beliebige ausführbare Anwendungen in die EVM (Spiele, Marktplätze, Finanzinstrumente etc.) schreiben können, werden diese oft in übergeordneter Form auch [dApps oder dezentralisierte Apps](/developers/docs/dapps/) genannt.

[Mehr zu Smart Contracts](/developers/docs/smart-contracts/)

## Weiterführende Informationen {#further-reading}

- [Ethereum-Whitepaper](/whitepaper/)
- [Wie funktioniert Ethereum überhaupt?](https://www.preethikasireddy.com/post/how-does-ethereum-work-anyway) – _Preethi Kasireddy_

_Kennst du eine Community-Ressource, die dir geholfen hat? Bearbeite diese Seite und füge sie hinzu!_

## Verwandte Tutorials {#related-tutorials}

- [Ein Entwickler-Guide zu Ethereum, Teil 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _– Eine sehr anfängerfreundliche Erkundung von Ethereum mit Python und web3.py_
