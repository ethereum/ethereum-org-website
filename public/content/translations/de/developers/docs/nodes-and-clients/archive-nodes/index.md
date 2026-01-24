---
title: Ethereum-Archivierungsknoten
description: "Ein Überblick über Archivierungsknoten"
lang: de
sidebarDepth: 2
---

Ein Archivierungsknoten ist eine Instanz eines Ethereum-Clients, die für den Aufbau eines Archives aller vergangenen Zustände konfiguriert ist. Er ist ein hilfreiches Tool für bestimmte Anwendungsfälle, jedoch könnte der schwieriger zu betreiben sein als ein vollständiger Knoten.

## Voraussetzungen {#prerequisites}

Sie sollten das Konzept eines [Ethereum-Nodes](/developers/docs/nodes-and-clients/), [seine Architektur](/developers/docs/nodes-and-clients/node-architecture/), [Synchronisierungsstrategien](/developers/docs/nodes-and-clients/#sync-modes) sowie die Praktiken verstehen, wie man sie [betreibt](/developers/docs/nodes-and-clients/run-a-node/) und [verwendet](/developers/docs/apis/json-rpc/).

## Was ist ein Archivierungsknoten

Um die Bedeutung eines Archivierungsknotens zu verstehen, sollten wir zunächst das Konzept des Zustand klären. Ethereum kann als _transaktionsbasierte Zustandsmaschine_ bezeichnet werden. Er besteht aus Konten und Anwendungen, die Transaktion ausführen, die ihren Zustand ändern. Die globalen Daten mit Informationen über jeden Account und Vertrag, wird in einer Trie-Datenbank gespeichert, die sich Zustand nennt. Dies wird verwaltet durch den Client der Ausführungsebene und beinhaltet:

- Guthaben und Nonce eines Kontos
- Vertragscode und Speicher
- Konsensbezogene Daten, z. B. Staking Deposit Contract

Um mit dem Netzwerk interagieren sowie neue Blöcke produzieren und verifizieren zu können, müssen Ethereum-Clients mit den neuesten Änderungen (der Spitze der Blockchain) und daher mit dem aktuellen Zustand Schritt halten. Ein als Full-Node konfigurierter Client der Ausführungsebene verifiziert und folgt dem neuesten Zustand des Netzwerks, speichert aber nur die letzten paar Zustände zwischen, z. B. den Zustand der letzten 128 Blöcke, sodass er Chain-Reorganisationen handhaben und schnellen Zugriff auf aktuelle Daten ermöglichen kann. Den letzten Zustand brauchen alle Clients, um eingehende Transaktionen verifizieren und das Netzwerk nutzen zu können.

Man kann sich diesen Zustand als vorübergehenden Schnappschuss des Netzwerks an einem bestimmten Block und das Archiv als eine Wiederholung vom Verlauf des Netzwerks vorstellen.

Vergangene Zustände können sicher entfernt werden, da sie nicht für das Betreiben des Netzwerks erforderlich sind und es für die Clients unnötig wäre, veraltete Daten zu behalten. Zustände, die vor einem kürzlich erstellten Block existierten (z. B. 128 Blöcke vor dem Head), werden praktisch verworfen. Vollständige Knoten behalten nur vergangene Daten der Blockchain (Blöcke und Transaktionen) und gelegentliche vergangene Schnappschüsse, die sie nutzen können, um ältere Zustände bei Bedarf wiederherzustellen. Dies erfolgt, indem sie die letzten Transaktionen im EVM erneut ausführen, was rechnerisch angefordert werden kann, wenn der erwünschte Zustand weit vom nächsten Schnappschuss entfernt ist.

Dies bedeutet jedoch, dass der Zugang zu einem vergangenen Zustand eines vollständigen Knotens viel Rechenleistung erfordert. Der Klient muss möglicherweise alle vergangenen Transaktionen ausführen, um einen historischen Zustand seit Anfang zu berechnen. Archivierungsknoten lösen dies, indem sie nicht nur die letzten, sondern jeden einzelnen Zustand nach dem Erzeugen eines Blocks speichern. Es findet quasi einen Kompromiss, wobei mehr Speicherplatz erforderlich ist.

Es ist wichtig zu beachten, dass das Netzwerk nicht von Archivierungsknoten abhängt, um vergangene Daten zu speichern und bereitzustellen. Wie oben erwähnt, können alle vergangenen Zustände auf einem vollständigen Knoten abgeleitet werden. Transaktionen werden auf jedem vollständigen Knoten (zur Zeit kleiner als 400 G) gespeichert und können so das gesamte Archiv wiedergeben.

### Anwendungsfälle

Die normale Nutzung von Ethereum, wie das Senden von Transaktionen, das Bereitstellen von Verträgen, dem Verifizieren vom Konsens usw. erfordert keinen Zugang zu vergangenen Zuständen. Nutzer sollten nie einen Archivierungsknoten benötigen, um mit dem Netzwerk normal interagieren zu können.

Der größte Vorteil eines Zustandsarchivs ist der schnelle Zugang zu Abfragen über vergangene Zustände. Ein Archivierungsknoten würde zum Beispiel direkt Ergebnisse auf Abfragen wie die Folgenden liefern:

- _Wie hoch war das ETH-Guthaben des Kontos 0x1337... bei Block 15537393?_
- _Was war der Kontostand vom Token 0x in Vertrag 0x an Block 1920000?_

Wie oben erklärt, müsste ein vollständiger Node diese Daten über die Ausführung von EVM generieren, was die CPU belastet und viel Zeit benötigt. Archiv-Nodes greifen auf der Festplatte darauf zu und liefern sofort Antworten. Dies ist eine nützliche Funktion für bestimmte Teile der Infrastruktur, zum Beispiel:

- Serviceanbieter wie Block-Explorer
- Forscher
- Sicherheitsanalysten
- Dapp-Entwickler
- Prüfung und Einhaltung von Regeln

Es gibt verschiedene kostenlose [Dienste](/developers/docs/nodes-and-clients/nodes-as-a-service/), die ebenfalls Zugriff auf historische Daten ermöglichen. Da es anspruchsvoller ist, einen Archivierungsknoten zu betreiben, ist dieser Zugang oft limitiert und funktioniert nur für gelegentlichen Zugriff. Wenn Ihr Projekt durchgängigen Zugriff auf vergangene Daten benötigt, sollten Sie sich überlegen, selber einen Archivierungsknoten zu betreiben.

## Implementierung und Nutzung

Archivierungsknoten bedeutet in diesem Kontext, dass dem Nutzer, dem Clients der Ausführungsebene gegenüberstehen, Daten zur Verfügung gestellt werden, während sie die Zustands-Datenbank verwalten und JSON-RPC Endpunkte bereitstellen. Konfigurationsoptionen, Synchronisierungszeit und die Größe der Datenbank können je nach Client variieren. Weitere Details finden Sie in der Client-Dokumentation.

Bevor Sie Ihren eigenen Archiv-Node starten, informieren Sie sich über die Unterschiede zwischen den Clients und insbesondere über die verschiedenen [Hardware-Anforderungen](/developers/docs/nodes-and-clients/run-a-node/#requirements). Die meisten Clients sind nicht für diese Funktion optimiert und ihre Archive benötigen mehr als 12 TB Speicherplatz. Zum Vergleich: Implementierungen wie Erigon können dieselben Daten in weniger als 3 TB speichern, was sie zur effektivsten Art zum Betreiben eines Archivierungsknotens macht.

## Empfohlene Verfahren

Abgesehen von den allgemeinen [Empfehlungen für den Betrieb eines Nodes](/developers/docs/nodes-and-clients/run-a-node/) kann ein Archiv-Node höhere Anforderungen an Hardware und Wartung stellen. In Anbetracht der [Hauptmerkmale](https://github.com/ledgerwatch/erigon#key-features) von Erigon ist der praktischste Ansatz die Verwendung der [Erigon](/developers/docs/nodes-and-clients/#erigon) Client-Implementierung.

### Hardware

Versichern Sie sich immer, dass ihre Hardware alle Voraussetzungen für einen gegebenen Modus in der Dokumentation des Clients erfüllt.
Die größte Voraussetzung für Archivierungsknoten ist dabei der Speicherplatz. Je nach Client variiert dieser von 3 TB bis 12 TB. Obwohl HDD als eine bessere Lösung für große Datenmengen gesehen werden kann, wird eine SSD für das kontinuierliche Synchronisieren und Aktualisieren der Blockchain-Spitze benötigt. [SATA](https://www.cleverfiles.com/help/sata-hard-drive.html)-Laufwerke sind gut genug, aber es sollte eine zuverlässige Qualität sein, mindestens [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences). Festplatten können in einen Desktop Computer oder einen Server mit genügend Slots eingebaut werden. Diese speziellen Geräte sind ideal, um Knoten mit hoher Verfügbarkeit zu betreiben. Es ist durchaus möglich, Archivierungsknoten auf einem Laptop zu betreiben. Die Portabilität erfordert jedoch zusätzliche Kosten.

Alle Daten müssen auf ein einziges Volume passen, daher müssen die Festplatten verbunden werden, z. B. mit [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) oder LVM. Es könnte sich auch lohnen, [ZFS](https://en.wikipedia.org/wiki/ZFS) zu verwenden, da es „Copy-on-Write“ unterstützt, was sicherstellt, dass Daten ohne Fehler auf niedriger Ebene korrekt auf die Festplatte geschrieben werden.

Für mehr Stabilität und Sicherheit zur Vermeidung versehentlicher Datenbankbeschädigungen, insbesondere in einer professionellen Umgebung, sollten Sie die Verwendung von [ECC-Speicher](https://en.wikipedia.org/wiki/ECC_memory) in Betracht ziehen, falls Ihr System dies unterstützt. Die Größe des RAM sollte genauso groß wie für einen vollständigen Knoten sein. Mehr RAM kann jedoch dazu beitragen, die Synchronisierung zu beschleunigen.

Während der ersten Synchronisierung führen Clients im Archivierungsmodus jede Transaktion seit der Genesis aus. Die Ausführungsgeschwindigkeit ist vor allem limitiert durch die CPU, daher kann eine schnellere CPU dazu beitragen, die erste Synchronisierung zu beschleunigen. Bei einem durchschnittlichen Computer kann die erste Synchronisierung bis zu einem Monat dauern.

## Weiterführende Lektüre {#further-reading}

- [Ethereum Full-Node vs. Archiv-Node](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) – _QuickNode, September 2022_
- [Erstellen eines eigenen Ethereum Archiv-Nodes](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) - _Thomas Jay Rush, August 2021_
- [Einrichtung von Erigon, Erigons RPC und TrueBlocks (Scrape und API) als Dienste](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson, aktualisiert September 2022_

## Verwandte Themen {#related-topics}

- [Nodes und Clients](/developers/docs/nodes-and-clients/)
- [Einen Node betreiben](/developers/docs/nodes-and-clients/run-a-node/)
