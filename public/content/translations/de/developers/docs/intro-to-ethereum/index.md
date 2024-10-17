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

Ethereum verwendet einen [Proof-of-Stake-basierten Konsensmechanismus](/developers/docs/consensus-mechanisms/pos/). Jeder, der der Chain neue Blöcke hinzufügen möchte, muss seine ETH – die native Kryptowährung der Ethereum-Blockchain – staken, die als Sicherheit und zum Ausführen der Validatorsoftware verwendet werden können. Diese "Validatoren" können dann nach dem Zufallsprinzip ausgewählt werden, um Blöcke einzureichen, die dann zur Überprüfung an andere Validatoren gesendet und zur Blockchain hinzugefügt werden. Es gibt ein System mit Belohnungen bzw. Strafen, das für die Teilnehmer einen starken Anreiz darstellt, ehrlich zu agieren und weitestgehend online verfügbar zu sein.

Wenn Sie sehen möchten, wie Blockchain-Daten gehasht und anschließend an den Verlauf der Blockreferenzen angehängt werden, sollten Sie sich [diese Demo](https://andersbrownworth.com/blockchain/blockchain) von Anders Brownworth und das dazugehörige Video unten ansehen.

Sehen Sie sich die Erklärung von Anders Brownworth zu Blockchains an:

<YouTube id="_160oMzblY8" />

## Was ist Ethereum? {#what-is-ethereum}

Ethereum ist eine Blockchain mit einem eingebetteten Computer. Dieser ist die Grundlage für den Aufbau von Anwendungen und Organisationen auf dezentrale, genehmigungsfreie und zensurresistente Weise.

Im Ethereum-Ökosystem gibt es einen einzigen kanonischen Computer (genannt die virtuelle Ethereum-Maschine oder kurz EVM), dessen alle Teilnehmer jeder im Ethereum-Netzwerk zustimmen. Jeder, der am Ethereum-Netzwerk (jeder Ethereum-Knoten) teilnimmt, behält eine Kopie des Zustands dieses Computers. Zusätzlich kann jeder Teilnehmer eine Anfrage an diesen Computer senden, um beliebige Berechnungen durchzuführen. Wenn eine solche Anfrage gesendet wird, überprüfen andere Teilnehmenden im Netzwerk die Berechnung und führen sie aus ("execute"). Diese Ausführung führt zu einer Zustandsänderung in der EVM, die bestätigt und im gesamten Netzwerk verbreitet wird.

Rechenanfragen werden als Transaktionsanfragen bezeichnet; die Aufzeichnung aller Transaktionen und des aktuellen Zustands der EVM wird auf der Blockchain gespeichert, die wiederum von allen Knoten gespeichert und vereinbart wird.

Kryptographische Mechanismen stellen sicher, dass Transaktionen, die einmal als gültig verifiziert und in die Blockchain aufgenommen wurden, später nicht mehr manipuliert werden können. Dieselben Mechanismen stellen auch sicher, dass alle Transaktionen signiert und mit den entsprechenden "Berechtigungen" ausgeführt werden (niemand außer Alice selbst sollte in der Lage sein, digitale Vermögenswerte von ihrem Konto zu versenden).

## Was ist Ether? {#what-is-ether}

**Ether (ETH)** ist die native Kryptowährung von Ethereum. Der Zweck von ETH ist es, einen Markt für Berechnungen zu ermöglichen. Ein solcher Markt bietet einen wirtschaftlichen Anreiz für die Teilnehmenden, Transaktionsanfragen zu verifizieren und auszuführen und dem Netzwerk Rechenressourcen zur Verfügung zu stellen.

Jeder Teilnehmer, der eine Transaktionsanforderung sendet, muss dem Netzwerk auch einen gewissen Betrag an ETH als Prämie anbieten. Das Netzwerk verbrennt einen Teil des Kopfgelds und gewährt den Rest der Person, die letztendlich die Transaktion verifiziert, ausführt, für die Blockchain bereitstellt und auf das Netzwerk überträgt.

Die Höhe der gezahlten ETH entspricht den für die Berechnung benötigten Ressourcen. Diese Prämien verhindern auch, dass böswillige Teilnehmer das Netzwerk absichtlich verstopfen, indem sie die Ausführung unendlicher Berechnungen oder anderer ressourcenintensiver Skripte anfordern, da diese Teilnehmer für die Berechnungsressourcen bezahlen müssen.

ETH wird auch verwendet, um dem Netzwerk auf drei Arten kryptoökonomische Sicherheit zu geben: 1) Es wird als Mittel zur Belohnung von Validierern verwendet, die Blöcke vorschlagen oder unehrliches Verhalten anderer Validierer aufdecken; 2) Es wird von Validierern als Sicherheit gegen unehrliches Verhalten eingesetzt – wenn Validierer versuchen, sich falsch zu verhalten, kann das die Zerstörung ihrer ETH zur Folge haben; 3) Es wird verwendet, um "Stimmen" für neu vorgeschlagene Blöcke abzuwägen, was in die Fork-Auswahl des Konsensmechanismus einfließt.

## Was sind Smart Contracts? {#what-are-smart-contracts}

In der Praxis schreiben die Teilnehmenden nicht jedes Mal einen neuen Code, wenn sie eine Berechnung auf der EVM anfordern wollen. Vielmehr laden Anwendungsentwickler Programme (wiederverwendbare Codeschnipsel) in den EVM-Speicher hoch, und die Nutzer stellen Anfragen, um diese Codeschnipsel mit unterschiedlichen Parametern auszuführen. Wir nennen die Programme, die hochgeladen und durch das Netzwerk ausgeführt werden, Smart Contracts (intelligente Verträge).

Ganz grundsätzlich können Sie sich einen Smart Contract wie eine Art Verkaufsautomat vorstellen: ein Skript, das, wenn es mit bestimmten Parametern aufgerufen wird, bestimmte Aktionen oder Berechnungen durchführt, wenn bestimmte Bedingungen erfüllt sind. Zum Beispiel könnte ein einfacher Verkäufer-Smart-Contract das Eigentum an einem digitalen Vermögenswert schaffen und zuweisen, wenn der Aufrufer ("caller") ETH an einen bestimmten Empfänger sendet.

Jeder Entwickler kann einen Smart Contract erstellen und im Netzwerk öffentlich machen, während die Blockchain als Datenebene gegen eine Gebühr an das Netzwerk genutzt wird. Jeder Benutzer kann dann, wiederum gegen eine Gebühr an das Netzwerk, den Smart Contract aufrufen, um seinen Code auszuführen.

Mit Smart Contracts können Entwickler und Entwicklerinnen beliebig komplexe nutzerorientierte Apps und Dienste entwickeln und bereitstellen, wie z. B. Marktplätze, Finanzinstrumente, Spiele etc.

## Terminologie {#terminology}

### Blockchain {#blockchain}

Die Sequenz aller Blöcke, die dem Ethereum-Netzwerk in der Geschichte des Netzwerks übertragen wurden. Sie werden so genannt, weil jeder Block einen Verweis auf den vorherigen Block enthält. Das hilft uns, eine Ordnung über alle Blöcke (und damit über den genauen Verlauf) zu erhalten.

### ETH {#eth}

**Ether (ETH)** ist die einheimische Kryptowährung von Ethereum. Nutzer zahlen ETH an andere Nutzer, damit ihre Anfragen zur Ausführung des Codes erfüllt werden.

[Mehr zu ETH](/developers/docs/intro-to-ether/)

### EVM {#evm}

Die virtuelle Ethereum-Machine ist der globale virtuelle Computer, dessen Zustand jeder Teilnehmer im Ethereum-Netzwerk speichert und dem er zustimmt. Jeder Teilnehmer kann die Ausführung von beliebigem Code auf der EVM beantragen. Jede Codeausführung ändert den Zustand der EVM.

[Mehr zur EVM](/developers/docs/evm/)

### Nodes {#nodes}

Die realen Maschinen, die den EVM-Zustand speichern. Knoten kommunizieren miteinander, um Informationen über den EVM-Zustand und neue Zustandsänderungen zu verbreiten. Alle Nutzer können auch die Ausführung von Code anfordern, indem sie eine Anfrage zur Codeausführung von einem Knoten aus senden. Das Ethereum-Netzwerk selbst ist das Aggregat aller Ethereum-Knoten und deren Kommunikation.

[Mehr zu Nodes](/developers/docs/nodes-and-clients/)

### Konten {#accounts}

Wo ETH gespeichert wird: Benutzer können Konten eröffnen, ETH auf diese Konten einzahlen und ETH von ihren Konten an andere Benutzer übertragen. Konten und Kontostände werden in einer großen Tabelle in der EVM gespeichert. Sie sind Teil der EVM-Zustands.

[Mehr über Konten](/developers/docs/accounts/)

### Transaktionen {#transactions}

Eine "Transaktionsanfrage" ist der formale Begriff für eine Anfrage zur Codeausführung auf der EVM, und eine "Transaktion" ist eine erfüllte Transaktionsanfrage und die damit verbundene Änderung des EVM-Zustands. Jeder Benutzer kann eine Transaktionsanfrage an das Netzwerk von einem Knoten aus senden. Damit sich die Transaktionsanfrage auf den vereinbarten EVM-Zustand auswirkt, muss sie von einem anderen Knoten validiert, ausgeführt und an das Netzwerk übertragen werden. Die Ausführung eines Codes führt zu einer Zustandsänderung in der EVM. Nach der Integration wird diese Zustandsänderung an alle Knoten im Netzwerk übertragen. Einige Beispiele für Transaktionen:

- X ETH von meinem Konto an das Konto von Alice senden.
- Veröffentliche Smart-Contract-Code in den EVM-Zustand.
- Führe den Code des Smart Contracts unter Adresse X in der EVM mit Argumenten Y aus.

[Mehr zu Transaktionen](/developers/docs/transactions/)

### Blöcke {#blocks}

Da das Transaktionsvolumen sehr hoch ist, werden die Transaktionen in Stapeln oder Blöcken "übertragen". Blöcke enthalten in der Regel Dutzende bis Hunderte von Transaktionen.

[Mehr zu Blöcken](/developers/docs/blocks/)

### Smart Contracts {#smart-contracts}

Ein wiederverwendbarer Codeschnipsel (ein Programm), den ein Entwickler in den EVM-Zustand veröffentlicht. Jeder kann anfragen, dass der Smart-Contract-Code ausgeführt wird, indem er eine Transaktionsanfrage stellt. Da Entwickler beliebige ausführbare Anwendungen in die EVM (Spiele, Marktplätze, Finanzinstrumente etc.) schreiben können, werden diese oft auch [dApps oder dezentralisierte Apps](/developers/docs/dapps/) genannt.

[Mehr zu Smart Contracts](/developers/docs/smart-contracts/)

## Weiterführende Informationen {#further-reading}

- [Ethereum-Whitepaper](/whitepaper/)
- [Wie funktioniert Ethereum überhaupt?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369) – _Preethi Kasireddy_ (**Hinweis:** Diese Ressource ist immer noch wertvoll, doch Sie sollten sich bewusst sein, dass sie aus der Zeit vor [der Zusammenführung](/roadmap/merge) stammt und sich daher noch auf den Proof-of-Work-Mechanismus von Ethereum bezieht – Ethereum ist jetzt durch [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos) gesichert)

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu._

## Verwandte Tutorials {#related-tutorials}

- [Eine Anleitung für Entwickler zu Ethereum, Teil 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _ – eine einsteigerfreundliche Einführung zu Ethereum mit Python und web3.py_
