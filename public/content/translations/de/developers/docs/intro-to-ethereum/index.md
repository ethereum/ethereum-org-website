---
title: Technische Einführung in Ethereum
description: Eine Einführung in die Kernkonzepte von Ethereum für Dapp-Entwickler.
lang: de
---

## Was ist eine Blockchain? {#what-is-a-blockchain}

Eine Blockchain ist eine öffentliche Datenbank, die über viele Computer in einem Netzwerk hinweg aktualisiert und geteilt wird.

"Block" bezieht sich auf Daten und den Zustand, die in aufeinanderfolgenden Gruppen, den sogenannten "Blöcken", gespeichert werden. Wenn Sie ETH an jemand anderen senden, müssen die Transaktionsdaten zu einem Block hinzugefügt werden, damit die Transaktion erfolgreich ist.

"Chain" bezieht sich auf die Tatsache, dass jeder Block kryptografisch auf seinen Vorgänger verweist. Mit anderen Worten: Blöcke werden miteinander verkettet. Die Daten in einem Block können nicht geändert werden, ohne alle nachfolgenden Blöcke zu ändern, was den Konsens des gesamten Netzwerks erfordern würde.

Jeder Computer im Netzwerk muss jedem neuen Block und der Chain als Ganzes zustimmen. Diese Computer werden als "Knoten" bezeichnet. Knoten stellen sicher, dass jeder, der mit der Blockchain interagiert, über dieselben Daten verfügt. Um diese verteilte Einigung zu erreichen, benötigen Blockchains einen Konsensmechanismus.

[Ethereum](/) verwendet einen [Proof-of-Stake-basierten Konsensmechanismus](/developers/docs/consensus-mechanisms/pos/). Jeder, der der Chain neue Blöcke hinzufügen möchte, muss ETH – die native Währung in Ethereum – als Sicherheit staken und eine Validator-Software ausführen. Diese "Validatoren" können dann zufällig ausgewählt werden, um Blöcke vorzuschlagen, die andere Validatoren überprüfen und der Blockchain hinzufügen. Es gibt ein System von Belohnungen und Strafen, das den Teilnehmern starke Anreize bietet, ehrlich zu sein und so viel wie möglich online verfügbar zu sein.

Wenn Sie sehen möchten, wie Blockchain-Daten gehasht und anschließend an die Historie der Blockreferenzen angehängt werden, sollten Sie sich [diese Demo](https://andersbrownworth.com/blockchain/blockchain) von Anders Brownworth ansehen und das dazugehörige Video unten betrachten.

Sehen Sie sich an, wie Anders Hashes in Blockchains erklärt:

<VideoWatch slug="blockchain-101-visual-demo" />

## Was ist Ethereum? {#what-is-ethereum}

Ethereum ist eine Blockchain mit einem eingebetteten Computer. Es ist die Grundlage für den Aufbau von Apps und Organisationen auf dezentrale, erlaubnisfreie und zensurresistente Weise.

Im Ethereum-Universum gibt es einen einzigen, kanonischen Computer (die sogenannte Ethereum Virtual Machine oder EVM), auf dessen Zustand sich alle im Ethereum-Netzwerk einigen. Jeder, der am Ethereum-Netzwerk teilnimmt (jeder Ethereum-Knoten), behält eine Kopie des Zustands dieses Computers. Darüber hinaus kann jeder Teilnehmer eine Anfrage an diesen Computer senden, um beliebige Berechnungen durchzuführen. Wann immer eine solche Anfrage gesendet wird, verifizieren, validieren und führen andere Teilnehmer im Netzwerk die Berechnung aus ("ausführen"). Diese Ausführung verursacht eine Zustandsänderung in der EVM, die festgeschrieben und im gesamten Netzwerk verbreitet wird.

Anfragen für Berechnungen werden als Transaktionsanfragen bezeichnet; die Aufzeichnung aller Transaktionen und der aktuelle Zustand der EVM werden auf der Blockchain gespeichert, die wiederum von allen Knoten gespeichert und konsensual abgestimmt wird.

Kryptografische Mechanismen stellen sicher, dass Transaktionen, sobald sie als gültig verifiziert und der Blockchain hinzugefügt wurden, später nicht mehr manipuliert werden können. Dieselben Mechanismen stellen auch sicher, dass alle Transaktionen mit den entsprechenden "Berechtigungen" signiert und ausgeführt werden (niemand sollte in der Lage sein, digitale Vermögenswerte von Alices Konto zu senden, außer Alice selbst).

## Was ist Ether? {#what-is-ether}

**Ether (ETH)** ist die native Kryptowährung von Ethereum. Der Zweck von ETH ist es, einen Markt für Berechnungen zu ermöglichen. Ein solcher Markt bietet den Teilnehmern einen wirtschaftlichen Anreiz, Transaktionsanfragen zu verifizieren und auszuführen sowie dem Netzwerk Rechenressourcen zur Verfügung zu stellen.

Jeder Teilnehmer, der eine Transaktionsanfrage sendet, muss dem Netzwerk auch einen bestimmten Betrag an ETH als Prämie anbieten. Das Netzwerk wird einen Teil der Prämie verbrennen und den Rest demjenigen zuweisen, der letztendlich die Arbeit erledigt, die Transaktion zu verifizieren, sie auszuführen, sie auf der Blockchain festzuschreiben und sie an das Netzwerk zu senden.

Die Menge der gezahlten ETH entspricht den Ressourcen, die für die Berechnung erforderlich sind. Diese Prämien verhindern auch, dass böswillige Teilnehmer das Netzwerk absichtlich verstopfen, indem sie die Ausführung unendlicher Berechnungen oder anderer ressourcenintensiver Skripte anfordern, da diese Teilnehmer für die Rechenressourcen bezahlen müssen.

ETH wird auch verwendet, um dem Netzwerk auf drei Hauptarten kryptoökonomische Sicherheit zu bieten: 1) Es wird als Mittel verwendet, um Validatoren zu belohnen, die Blöcke vorschlagen oder unehrliches Verhalten anderer Validatoren aufdecken; 2) Es wird von Validatoren gestaket und dient als Sicherheit gegen unehrliches Verhalten – wenn Validatoren versuchen, sich falsch zu verhalten, können ihre ETH zerstört werden; 3) Es wird verwendet, um 'Stimmen' für neu vorgeschlagene Blöcke zu gewichten, was in den Fork-Choice-Teil des Konsensmechanismus einfließt.

## Was sind Smart Contracts? {#what-are-smart-contracts}

In der Praxis schreiben die Teilnehmer nicht jedes Mal neuen Code, wenn sie eine Berechnung auf der EVM anfordern möchten. Vielmehr laden Anwendungsentwickler Programme (wiederverwendbare Code-Schnipsel) in den Zustand der EVM hoch, und Benutzer stellen Anfragen, um diese Code-Schnipsel mit unterschiedlichen Parametern auszuführen. Wir nennen die Programme, die in das Netzwerk hochgeladen und von diesem ausgeführt werden, "Smart Contracts".

Auf einer sehr grundlegenden Ebene können Sie sich einen Smart Contract wie eine Art Verkaufsautomaten vorstellen: ein Skript, das, wenn es mit bestimmten Parametern aufgerufen wird, einige Aktionen oder Berechnungen durchführt, sofern bestimmte Bedingungen erfüllt sind. Zum Beispiel könnte ein einfacher Verkäufer-Smart-Contract das Eigentum an einem digitalen Vermögenswert erstellen und zuweisen, wenn der Aufrufer ETH an einen bestimmten Empfänger sendet.

Jeder Entwickler kann einen Smart Contract erstellen und ihn für das Netzwerk öffentlich machen, wobei die Blockchain als Datenschicht genutzt wird, gegen eine an das Netzwerk gezahlte Gebühr. Jeder Benutzer kann dann den Smart Contract aufrufen, um seinen Code auszuführen, wiederum gegen eine an das Netzwerk gezahlte Gebühr.

Somit können Entwickler mit Smart Contracts beliebig komplexe, benutzerorientierte Apps und Dienste erstellen und bereitstellen, wie z. B.: Marktplätze, Finanzinstrumente, Spiele usw.

## Terminologie {#terminology}

### Blockchain {#blockchain}

Die Abfolge aller Blöcke, die in der Geschichte des Netzwerks im Ethereum-Netzwerk festgeschrieben wurden. So benannt, weil jeder Block einen Verweis auf den vorherigen Block enthält, was uns hilft, eine Reihenfolge über alle Blöcke (und damit über die genaue Historie) aufrechtzuerhalten.

### ETH {#eth}

**Ether (ETH)** ist die native Kryptowährung von Ethereum. Benutzer zahlen ETH an andere Benutzer, um ihre Anfragen zur Codeausführung erfüllen zu lassen.

[Mehr zu ETH](/developers/docs/intro-to-ether/)

### EVM {#evm}

Die Ethereum Virtual Machine ist der globale virtuelle Computer, dessen Zustand jeder Teilnehmer im Ethereum-Netzwerk speichert und dem er zustimmt. Jeder Teilnehmer kann die Ausführung von beliebigem Code auf der EVM anfordern; die Codeausführung ändert den Zustand der EVM.

[Mehr zur EVM](/developers/docs/evm/)

### Knoten {#nodes}

Die realen Maschinen, die den Zustand der EVM speichern. Knoten kommunizieren miteinander, um Informationen über den Zustand der EVM und neue Zustandsänderungen zu verbreiten. Jeder Benutzer kann auch die Ausführung von Code anfordern, indem er eine Anfrage zur Codeausführung von einem Knoten aus sendet. Das Ethereum-Netzwerk selbst ist die Gesamtheit aller Ethereum-Knoten und ihrer Kommunikation.

[Mehr zu Knoten](/developers/docs/nodes-and-clients/)

### Konten {#accounts}

Wo ETH gespeichert wird. Benutzer können Konten initialisieren, ETH auf die Konten einzahlen und ETH von ihren Konten an andere Benutzer transferieren. Konten und Kontostände werden in einer großen Tabelle in der EVM gespeichert; sie sind ein Teil des gesamten Zustands der EVM.

[Mehr zu Konten](/developers/docs/accounts/)

### Transaktionen {#transactions}

Eine "Transaktionsanfrage" ist der formale Begriff für eine Anfrage zur Codeausführung auf der EVM, und eine "Transaktion" ist eine erfüllte Transaktionsanfrage und die damit verbundene Änderung im Zustand der EVM. Jeder Benutzer kann eine Transaktionsanfrage von einem Knoten an das Netzwerk senden. Damit die Transaktionsanfrage den vereinbarten Zustand der EVM beeinflusst, muss sie von einem anderen Knoten validiert, ausgeführt und "im Netzwerk festgeschrieben" werden. Die Ausführung von beliebigem Code verursacht eine Zustandsänderung in der EVM; nach der Festschreibung wird diese Zustandsänderung an alle Knoten im Netzwerk gesendet. Einige Beispiele für Transaktionen:

- Sende X ETH von meinem Konto an Alices Konto.
- Veröffentliche Smart-Contract-Code im Zustand der EVM.
- Führe den Code des Smart Contracts an der Adresse X in der EVM mit den Argumenten Y aus.

[Mehr zu Transaktionen](/developers/docs/transactions/)

### Blöcke {#blocks}

Das Transaktionsvolumen ist sehr hoch, daher werden Transaktionen in Stapeln oder Blöcken "festgeschrieben". Blöcke enthalten im Allgemeinen Dutzende bis Hunderte von Transaktionen.

[Mehr zu Blöcken](/developers/docs/blocks/)

### Smart Contracts {#smart-contracts}

Ein wiederverwendbares Code-Schnipsel (ein Programm), das ein Entwickler im Zustand der EVM veröffentlicht. Jeder kann die Ausführung des Smart-Contract-Codes anfordern, indem er eine Transaktionsanfrage stellt. Da Entwickler durch die Veröffentlichung von Smart Contracts beliebige ausführbare Anwendungen in die EVM schreiben können (Spiele, Marktplätze, Finanzinstrumente usw.), werden diese oft auch als [Dezentrale Anwendungen (Dapps)](/developers/docs/dapps/) bezeichnet.

[Mehr zu Smart Contracts](/developers/docs/smart-contracts/)

## Wie es weitergeht {#where-to-go-next}

Die meisten Leser folgen der Dokumentation der Reihe nach, aber der kürzeste Weg hängt davon ab, was Sie entwickeln möchten:

- **Dapps, die mit Ethereum interagieren:** [Konten](/developers/docs/accounts/) und [Transaktionen](/developers/docs/transactions/), wählen Sie dann ein [Framework](/developers/docs/frameworks/).
- **Smart-Contract-Entwicklung:** [Smart Contracts](/developers/docs/smart-contracts/) und [Programmiersprachen](/developers/docs/programming-languages/).
- **Knoten und Staking:** [Knoten und Clients](/developers/docs/nodes-and-clients/), dann [Konsensmechanismen](/developers/docs/consensus-mechanisms/).

## Weiterführende Literatur {#further-reading}

- [Ethereum-Whitepaper](/whitepaper/)
- [Wie funktioniert Ethereum überhaupt?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369) - _Preethi Kasireddy_ (**Hinweis:** Diese Ressource ist immer noch wertvoll, aber beachten Sie, dass sie vor [dem Merge](/roadmap/merge) verfasst wurde und sich daher noch auf den Proof-of-Work-Mechanismus von Ethereum bezieht – Ethereum wird mittlerweile tatsächlich durch [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos) gesichert)

### Lernen Sie eher visuell? {#visual-learner}

Diese Videoserie bietet eine gründliche Untersuchung grundlegender Themen:

<VideoWatch slug="ethereum-basics-intro" />

[Playlist zu den Ethereum-Grundlagen](https://youtube.com/playlist?list=PLqgutSGloqiJyyoL0zvLVFPS-GMD2wKa5&si=kZTf5I7PKGTXDsOZ)

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_

## Verwandte Tutorials {#related-tutorials}

- [Ein Entwickler-Leitfaden für Ethereum, Teil 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _– Eine sehr anfängerfreundliche Erkundung von Ethereum mit Python und web3.py_