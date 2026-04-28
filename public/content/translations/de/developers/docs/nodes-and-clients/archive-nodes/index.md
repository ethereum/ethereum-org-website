---
title: Ethereum-Archivknoten
description: "Ein Überblick über Archivknoten"
lang: de
sidebarDepth: 2
---

Ein Archivknoten (Archive Node) ist eine Instanz einer [Ethereum](/)-Anwendung (Client), die so konfiguriert ist, dass sie ein Archiv aller historischen Zustände erstellt. Er ist ein nützliches Werkzeug für bestimmte Anwendungsfälle, kann aber schwieriger zu betreiben sein als ein vollständiger Blockchain-Knoten (Full Node).

## Voraussetzungen {#prerequisites}

Sie sollten das Konzept eines [Ethereum-Blockchain-Knotens](/developers/docs/nodes-and-clients/), [seiner Architektur](/developers/docs/nodes-and-clients/node-architecture/), [Synchronisierungsstrategien](/developers/docs/nodes-and-clients/#sync-modes) sowie die Praktiken für [deren Betrieb](/developers/docs/nodes-and-clients/run-a-node/) und [Nutzung](/developers/docs/apis/json-rpc/) verstehen.

## Was ist ein Archivknoten?

Um die Bedeutung eines Archivknotens zu verstehen, lassen Sie uns das Konzept des „Zustands“ (State) klären. Ethereum kann als _transaktionsbasierte Zustandsmaschine_ bezeichnet werden. Es besteht aus Konten und Anwendungen, die Transaktionen ausführen, welche ihren Zustand ändern. Die globalen Daten mit Informationen über jedes Konto und jeden Vertrag werden in einer Trie-Datenbank gespeichert, die als Zustand bezeichnet wird. Dies wird vom Ausführungs-Client der Ausführungsebene (EL) gehandhabt und umfasst:

- Kontostände und Nonces
- Vertragscode und -speicher
- Konsensbezogene Daten, z. B. Staking-Einzahlungsvertrag

Um mit dem Netzwerk zu interagieren, neue Blöcke zu verifizieren und zu produzieren, müssen Ethereum-Anwendungen mit den neuesten Änderungen (der Spitze der Chain) und somit dem aktuellen Zustand Schritt halten. Ein Ausführungs-Client, der als vollständiger Blockchain-Knoten konfiguriert ist, verifiziert und verfolgt den neuesten Zustand des Netzwerks, speichert jedoch nur die letzten paar Zustände zwischen, z. B. den Zustand, der mit den letzten 128 Blöcken verbunden ist, damit er Chain-Reorganisationen bewältigen und schnellen Zugriff auf aktuelle Daten bieten kann. Der aktuelle Zustand ist das, was alle Anwendungen benötigen, um eingehende Transaktionen zu verifizieren und das Netzwerk zu nutzen.

Sie können sich den Zustand als eine momentane Momentaufnahme des Netzwerks bei einem bestimmten Block und das Archiv als eine Wiederholung der Historie vorstellen.

Historische Zustände können sicher bereinigt (pruned) werden, da sie für den Betrieb des Netzwerks nicht erforderlich sind und es für die Anwendung nutzlos redundant wäre, alle veralteten Daten aufzubewahren. Zustände, die vor einem bestimmten kürzlichen Block existierten (z. B. 128 Blöcke vor dem Head), werden effektiv verworfen. Vollständige Blockchain-Knoten behalten nur historische Blockchain-Daten (Blöcke und Transaktionen) und gelegentliche historische Momentaufnahmen, die sie verwenden können, um ältere Zustände auf Anfrage neu zu generieren. Sie tun dies, indem sie vergangene Transaktionen in der Ethereum Virtual Machine (EVM) erneut ausführen, was rechenintensiv sein kann, wenn der gewünschte Zustand weit von der nächsten Momentaufnahme entfernt ist.

Dies bedeutet jedoch, dass der Zugriff auf einen historischen Zustand auf einem vollständigen Blockchain-Knoten viel Rechenleistung verbraucht. Die Anwendung muss möglicherweise alle vergangenen Transaktionen ausführen und einen historischen Zustand ab der Genesis berechnen. Archivknoten lösen dies, indem sie nicht nur die neuesten Zustände speichern, sondern jeden historischen Zustand, der nach jedem Block erstellt wurde. Im Grunde genommen wird ein Kompromiss mit einem größeren Speicherplatzbedarf eingegangen.

Es ist wichtig zu beachten, dass das Netzwerk nicht von Archivknoten abhängig ist, um alle historischen Daten aufzubewahren und bereitzustellen. Wie oben erwähnt, können alle historischen Zwischenzustände auf einem vollständigen Blockchain-Knoten abgeleitet werden. Transaktionen werden von jedem vollständigen Blockchain-Knoten gespeichert (derzeit weniger als 400 GB) und können wiederholt werden, um das gesamte Archiv aufzubauen.

### Anwendungsfälle

Die reguläre Nutzung von Ethereum wie das Senden von Transaktionen, das Bereitstellen von Verträgen, das Verifizieren des Konsenses usw. erfordert keinen Zugriff auf historische Zustände. Benutzer benötigen für eine Standardinteraktion mit dem Netzwerk niemals einen Archivknoten.

Der Hauptvorteil des Zustandsarchivs ist ein schneller Zugriff auf Abfragen zu historischen Zuständen. Zum Beispiel würde ein Archivknoten umgehend Ergebnisse liefern wie:

- _Wie hoch war das ETH-Guthaben des Kontos 0x1337... bei Block 15537393?_
- _Wie hoch ist das Guthaben von Token 0x im Vertrag 0x bei Block 1920000?_

Wie oben erklärt, müsste ein vollständiger Blockchain-Knoten diese Daten durch EVM-Ausführung generieren, was die CPU beansprucht und Zeit in Anspruch nimmt. Archivknoten greifen auf der Festplatte darauf zu und liefern Antworten sofort. Dies ist eine nützliche Funktion für bestimmte Teile der Infrastruktur, zum Beispiel:

- Dienstanbieter wie Blocksuchmaschinen
- Forscher
- Sicherheitsanalysten
- Dapp-Entwickler
- Wirtschaftsprüfung und Compliance

Es gibt verschiedene kostenlose [Dienste](/developers/docs/nodes-and-clients/nodes-as-a-service/), die ebenfalls Zugriff auf historische Daten ermöglichen. Da der Betrieb eines Archivknotens anspruchsvoller ist, ist dieser Zugriff meist begrenzt und funktioniert nur für gelegentlichen Zugriff. Wenn Ihr Projekt ständigen Zugriff auf historische Daten erfordert, sollten Sie in Betracht ziehen, selbst einen zu betreiben.

## Implementierungen und Nutzung

Archivknoten in diesem Kontext bedeutet Daten, die von benutzerorientierten Ausführungs-Clients bereitgestellt werden, da diese die Zustandsdatenbank verwalten und JSON-RPC-Endpunkte bereitstellen. Konfigurationsoptionen, Synchronisierungszeit und Datenbankgröße können je nach Anwendung variieren. Weitere Details finden Sie in der Dokumentation Ihrer Anwendung.

Bevor Sie Ihren eigenen Archivknoten starten, informieren Sie sich über die Unterschiede zwischen den Anwendungen und insbesondere über die verschiedenen [Hardwareanforderungen](/developers/docs/nodes-and-clients/run-a-node/#requirements). Die meisten Anwendungen sind nicht für diese Funktion optimiert und ihre Archive benötigen mehr als 12 TB Speicherplatz. Im Gegensatz dazu können Implementierungen wie Erigon dieselben Daten in unter 3 TB speichern, was sie zur effektivsten Möglichkeit macht, einen Archivknoten zu betreiben.

## Empfohlene Praktiken

Abgesehen von allgemeinen [Empfehlungen für den Betrieb eines Blockchain-Knotens](/developers/docs/nodes-and-clients/run-a-node/) kann ein Archivknoten anspruchsvoller in Bezug auf Hardware und Wartung sein. In Anbetracht der [Hauptmerkmale](https://github.com/ledgerwatch/erigon#key-features) von Erigon ist der praktischste Ansatz die Verwendung der [Erigon](/developers/docs/nodes-and-clients/#erigon)-Anwendungsimplementierung.

### Hardware

Stellen Sie immer sicher, dass Sie die Hardwareanforderungen für einen bestimmten Modus in der Dokumentation einer Anwendung überprüfen.
Die größte Anforderung für Archivknoten ist der Speicherplatz. Je nach Anwendung variiert dieser von 3 TB bis 12 TB. Auch wenn eine HDD als bessere Lösung für große Datenmengen angesehen werden könnte, erfordert die Synchronisierung und ständige Aktualisierung der Spitze der Chain SSD-Laufwerke. [SATA](https://www.cleverfiles.com/help/sata-hard-drive.html)-Laufwerke sind gut genug, sollten aber von zuverlässiger Qualität sein, mindestens [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences). Festplatten können in einen Desktop-Computer oder einen Server mit genügend Steckplätzen eingebaut werden. Solche dedizierten Geräte sind ideal für den Betrieb eines Blockchain-Knotens mit hoher Verfügbarkeit. Es ist durchaus möglich, ihn auf einem Laptop auszuführen, aber die Portabilität ist mit zusätzlichen Kosten verbunden.

Alle Daten müssen auf ein Volume passen, daher müssen Festplatten zusammengefügt werden, z. B. mit [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) oder LVM. Es könnte sich auch lohnen, die Verwendung von [ZFS](https://en.wikipedia.org/wiki/ZFS) in Betracht zu ziehen, da es „Copy-on-Write“ unterstützt, was sicherstellt, dass Daten ohne Low-Level-Fehler korrekt auf die Festplatte geschrieben werden.

Für mehr Stabilität und Sicherheit bei der Vermeidung versehentlicher Datenbankbeschädigungen, insbesondere in einem professionellen Setup, sollten Sie die Verwendung von [ECC-Speicher](https://en.wikipedia.org/wiki/ECC_memory) in Betracht ziehen, falls Ihr System dies unterstützt. Die Größe des RAMs wird im Allgemeinen genauso empfohlen wie für einen vollständigen Blockchain-Knoten, aber mehr RAM kann helfen, die Synchronisierung zu beschleunigen.

Während der anfänglichen Synchronisierung führen Anwendungen im Archivmodus jede Transaktion seit der Genesis aus. Die Ausführungsgeschwindigkeit wird hauptsächlich durch die CPU begrenzt, sodass eine schnellere CPU bei der anfänglichen Synchronisierungszeit helfen kann. Auf einem durchschnittlichen Verbrauchercomputer kann die anfängliche Synchronisierung bis zu einem Monat dauern.

## Weiterführende Literatur {#further-reading}

- [Ethereum Full Node vs Archive Node](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) – _QuickNode, September 2022_
- [Building Your Own Ethereum Archive Node](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) – _Thomas Jay Rush, August 2021_
- [How to set up Erigon, Erigon’s RPC and TrueBlocks (scrape and API) as services](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson, aktualisiert im September 2022_

## Verwandte Themen {#related-topics}

- [Blockchain-Knoten und Anwendungen](/developers/docs/nodes-and-clients/)
- [Einen Blockchain-Knoten betreiben](/developers/docs/nodes-and-clients/run-a-node/)