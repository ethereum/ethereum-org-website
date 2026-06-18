---
title: Ethereum-Archivknoten
description: Ein Überblick über Archivknoten
lang: de
sidebarDepth: 2
---

Ein Archivknoten ist eine Instanz eines [Ethereum](/)-Clients, die so konfiguriert ist, dass sie ein Archiv aller historischen Zustände aufbaut. Er ist ein nützliches Werkzeug für bestimmte Anwendungsfälle, aber möglicherweise schwieriger zu betreiben als ein Full Node.

## Voraussetzungen {#prerequisites}

Sie sollten das Konzept eines [Ethereum-Knotens](/developers/docs/nodes-and-clients/), [seine Architektur](/developers/docs/nodes-and-clients/node-architecture/), [Synchronisierungsstrategien](/developers/docs/nodes-and-clients/#sync-modes) sowie die Praktiken für deren [Betrieb](/developers/docs/nodes-and-clients/run-a-node/) und [Nutzung](/developers/docs/apis/json-rpc/) verstehen.

## Was ist ein Archivknoten? {#what-is-an-archive-node}

Um die Bedeutung eines Archivknotens zu verstehen, lassen Sie uns das Konzept des „Zustands“ (State) klären. Ethereum kann als _transaktionsbasierte Zustandsmaschine_ bezeichnet werden. Es besteht aus Konten und Anwendungen, die Transaktionen ausführen, welche ihren Zustand ändern. Die globalen Daten mit Informationen über jedes Konto und jeden Vertrag werden in einer Trie-Datenbank gespeichert, die als Zustand bezeichnet wird. Dies wird vom Client der Ausführungsschicht (Execution Layer, EL) gehandhabt und umfasst:

- Kontostände und Nonces
- Vertrags-Code und -Speicher
- Konsensbezogene Daten, z. B. der Staking-Einlage-Vertrag (Staking Deposit Contract)

Um mit dem Netzwerk zu interagieren, neue Blöcke zu verifizieren und zu produzieren, müssen Ethereum-Clients mit den neuesten Änderungen (der Spitze der Chain) und somit dem aktuellen Zustand Schritt halten. Ein als Full Node konfigurierter Client der Ausführungsschicht verifiziert und verfolgt den neuesten Zustand des Netzwerks, speichert jedoch nur die letzten paar Zustände zwischen, z. B. den Zustand, der mit den letzten 128 Blöcken verknüpft ist, damit er Chain-Reorganisationen bewältigen und schnellen Zugriff auf aktuelle Daten bieten kann. Der aktuelle Zustand ist das, was alle Clients benötigen, um eingehende Transaktionen zu verifizieren und das Netzwerk zu nutzen.

Sie können sich den Zustand als eine momentane Momentaufnahme (Snapshot) des Netzwerks bei einem bestimmten Block und das Archiv als eine Wiederholung der Historie vorstellen.

Historische Zustände können sicher bereinigt (pruned) werden, da sie für den Betrieb des Netzwerks nicht erforderlich sind und es für den Client nutzlos redundant wäre, alle veralteten Daten aufzubewahren. Zustände, die vor einem bestimmten kürzlichen Block existierten (z. B. 128 Blöcke vor dem Head), werden effektiv verworfen. Full Nodes behalten nur historische Blockchain-Daten (Blöcke und Transaktionen) und gelegentliche historische Snapshots, die sie verwenden können, um ältere Zustände auf Anfrage neu zu generieren. Sie tun dies, indem sie vergangene Transaktionen in der EVM erneut ausführen, was rechenintensiv sein kann, wenn der gewünschte Zustand weit vom nächsten Snapshot entfernt ist.

Dies bedeutet jedoch, dass der Zugriff auf einen historischen Zustand auf einem Full Node viel Rechenleistung verbraucht. Der Client muss möglicherweise alle vergangenen Transaktionen ausführen und einen historischen Zustand ab dem Genesis-Block berechnen. Archivknoten lösen dies, indem sie nicht nur die neuesten Zustände speichern, sondern jeden historischen Zustand, der nach jedem Block erstellt wurde. Im Grunde genommen ist dies ein Kompromiss, der einen größeren Speicherplatzbedarf mit sich bringt.

Es ist wichtig zu beachten, dass das Netzwerk nicht auf Archivknoten angewiesen ist, um alle historischen Daten aufzubewahren und bereitzustellen. Wie oben erwähnt, können alle historischen Zwischenzustände auf einem Full Node abgeleitet werden. Transaktionen werden von jedem Full Node gespeichert (derzeit weniger als 400 GB) und können erneut abgespielt werden, um das gesamte Archiv aufzubauen.

### Anwendungsfälle {#use-cases}

Die reguläre Nutzung von Ethereum, wie das Senden von Transaktionen, das Bereitstellen von Verträgen, das Verifizieren des Konsenses usw., erfordert keinen Zugriff auf historische Zustände. Benutzer benötigen für eine Standardinteraktion mit dem Netzwerk niemals einen Archivknoten.

Der Hauptvorteil eines Zustandsarchivs ist der schnelle Zugriff auf Abfragen zu historischen Zuständen. Ein Archivknoten würde beispielsweise umgehend Ergebnisse liefern wie:

- _Wie hoch war der ETH-Kontostand des Kontos 0x1337... bei Block 15537393?_
- _Wie hoch ist der Bestand des Tokens 0x im Vertrag 0x bei Block 1920000?_

Wie oben erklärt, müsste ein Full Node diese Daten durch EVM-Ausführung generieren, was die CPU beansprucht und Zeit in Anspruch nimmt. Archivknoten greifen auf der Festplatte darauf zu und liefern Antworten sofort. Dies ist eine nützliche Funktion für bestimmte Teile der Infrastruktur, zum Beispiel:

- Dienstleister wie Block-Explorer
- Forscher
- Sicherheitsanalysten
- Entwickler von dezentralen Anwendungen (Dapps)
- Wirtschaftsprüfung und Compliance

Es gibt verschiedene kostenlose [Dienste](/developers/docs/nodes-and-clients/nodes-as-a-service/), die ebenfalls Zugriff auf historische Daten ermöglichen. Da der Betrieb eines Archivknotens anspruchsvoller ist, ist dieser Zugriff meist begrenzt und funktioniert nur für gelegentliche Abfragen. Wenn Ihr Projekt ständigen Zugriff auf historische Daten erfordert, sollten Sie in Erwägung ziehen, selbst einen zu betreiben.

## Implementierungen und Nutzung {#implementations-and-usage}

Archivknoten in diesem Kontext bedeutet Daten, die von benutzerorientierten Clients der Ausführungsschicht bereitgestellt werden, da diese die Zustandsdatenbank verwalten und JSON-RPC-Endpunkte bereitstellen. Konfigurationsoptionen, Synchronisierungszeit und Datenbankgröße können je nach Client variieren. Weitere Details finden Sie in der Dokumentation Ihres Clients.

Bevor Sie Ihren eigenen Archivknoten starten, informieren Sie sich über die Unterschiede zwischen den Clients und insbesondere über die verschiedenen [Hardwareanforderungen](/developers/docs/nodes-and-clients/run-a-node/#requirements). Die meisten Clients sind nicht für diese Funktion optimiert und ihre Archive benötigen mehr als 12 TB Speicherplatz. Im Gegensatz dazu können Implementierungen wie Erigon dieselben Daten in unter 3 TB speichern, was sie zur effektivsten Möglichkeit macht, einen Archivknoten zu betreiben.

## Empfohlene Praktiken {#recommended-practices}

Abgesehen von allgemeinen [Empfehlungen für den Betrieb eines Knotens](/developers/docs/nodes-and-clients/run-a-node/) kann ein Archivknoten anspruchsvoller in Bezug auf Hardware und Wartung sein. In Anbetracht der [Hauptmerkmale](https://github.com/ledgerwatch/erigon#key-features) von Erigon ist der praktischste Ansatz die Verwendung der [Erigon](/developers/docs/nodes-and-clients/#erigon)-Client-Implementierung.

### Hardware {#hardware}

Stellen Sie immer sicher, dass Sie die Hardwareanforderungen für einen bestimmten Modus in der Dokumentation eines Clients überprüfen.
Die größte Anforderung für Archivknoten ist der Speicherplatz. Je nach Client variiert dieser von 3 TB bis 12 TB. Auch wenn HDDs als bessere Lösung für große Datenmengen angesehen werden könnten, erfordern die Synchronisierung und die ständige Aktualisierung der Spitze der Chain SSD-Laufwerke. [SATA](https://www.cleverfiles.com/help/sata-hard-drive.html)-Laufwerke sind ausreichend, sollten aber von zuverlässiger Qualität sein, mindestens [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences). Festplatten können in einen Desktop-Computer oder einen Server mit genügend Steckplätzen eingebaut werden. Solche dedizierten Geräte sind ideal für den Betrieb eines Knotens mit hoher Verfügbarkeit. Es ist durchaus möglich, ihn auf einem Laptop auszuführen, aber die Portabilität ist mit zusätzlichen Kosten verbunden.

Alle Daten müssen auf ein einziges Volume passen, daher müssen Festplatten zusammengefasst werden, z. B. mit [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) oder LVM. Es könnte sich auch lohnen, die Verwendung von [ZFS](https://en.wikipedia.org/wiki/ZFS) in Betracht zu ziehen, da es „Copy-on-Write“ unterstützt, was sicherstellt, dass Daten ohne Low-Level-Fehler korrekt auf die Festplatte geschrieben werden.

Für mehr Stabilität und Sicherheit bei der Vermeidung versehentlicher Datenbankbeschädigungen, insbesondere in einem professionellen Setup, sollten Sie die Verwendung von [ECC-Speicher](https://en.wikipedia.org/wiki/ECC_memory) in Betracht ziehen, falls Ihr System dies unterstützt. Die Größe des RAMs wird im Allgemeinen genauso empfohlen wie für einen Full Node, aber mehr RAM kann helfen, die Synchronisierung zu beschleunigen.

Während der anfänglichen Synchronisierung führen Clients im Archivmodus jede Transaktion seit dem Genesis-Block aus. Die Ausführungsgeschwindigkeit wird hauptsächlich durch die CPU begrenzt, sodass eine schnellere CPU bei der anfänglichen Synchronisierungszeit helfen kann. Auf einem durchschnittlichen Verbrauchercomputer kann die anfängliche Synchronisierung bis zu einem Monat dauern.

## Weiterführende Literatur {#further-reading}

- [Ethereum Full Node vs Archive Node](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) – _QuickNode, September 2022_
- [Building Your Own Ethereum Archive Node](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) – _Thomas Jay Rush, August 2021_
- [How to set up Erigon, Erigon’s RPC and TrueBlocks (scrape and API) as services](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson, aktualisiert im September 2022_

## Verwandte Themen {#related-topics}

- [Knoten und Clients](/developers/docs/nodes-and-clients/)
- [Einen Knoten betreiben](/developers/docs/nodes-and-clients/run-a-node/)