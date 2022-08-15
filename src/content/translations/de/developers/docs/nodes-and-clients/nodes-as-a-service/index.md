---
title: Nodes als Dienstleistung
description: Eine Einstiegsübersicht über Node-Dienste, die Vor- und Nachteile und beliebte Anbieter.
lang: de
sidebarDepth: 2
---

## Einführung {#Introduction}

Deinen eigenen [Ethereum-Node](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) zu betreiben kann eine Herausforderung sein, vor allem wenn du gerade beginnst oder während du schnell skalierst. Es gibt eine [Anzahl von Diensten](#popular-node-services), die optimierte Nodeinfrastrukturen für dich ausführen, damit du dich stattdessen auf die Entwicklung deiner Applikation oder deines Produkts konzentrieren kannst. Wir erklären dir, wie Node-Dienste funktionieren, welche Vor- und Nachteile sie haben und listen Anbieter auf, falls du anfangen willst, sie zu verwenden.

## Voraussetzungen {#prerequisites}

Wenn du noch nicht weißt, was Nodes und Clients sind, schaue dir [Nodes und Clients](/developers/docs/nodes-and-clients/) an.

## Wie funktionieren Node-Dienste? {#how-do-node-services-work}

Node-Dienste betreiben im Hintergrund dezentralisierte Node-Clients für dich, so dass du dich um den Aufbau der Infrastruktur nicht zu kümmern brauchst.

Diese Dienste bieten in der Regel einen API-Schlüssel an, den du verwenden kannst, um in der Blockchain zu schreiben und zu lesen. Sie beinhalten oft den Zugriff auf [Ethereum-Testnetze](/developers/docs/networks/#testnets) zusätzlich zum Mainnet.

Einige Dienste bieten dir Ihren eigenen dedizierten Node, den sie für dich verwalten, während andere Load Balancer nutzen, um die Aktivität auf mehrere Nodes zu verteilen.

Fast alle Node-Dienste sind extrem einfach mit einer Zeilenänderung in deinen Code zu integrieren, um deinen selbst gehosteten Node auszutauschen oder sogar zwischen den Diensten selbst zu wechseln.

Oft laufen Node-Dienste mit einer Vielzahl von [Node-Clients](/developers/docs/nodes-and-clients/#execution-clients) und [Typen](/developers/docs/nodes-and-clients/#node-types), so dass du in einer API zusätzlich zu Client-spezifischen Methoden auf Voll- und Archivierungsnodes zugreifen kannst.

Es ist wichtig zu beachten, dass Node-Dienste keinesfalls deine privaten Schlüssel oder Informationen speichern können und sollten.

## Was sind die Vorteile bei der Verwendung eines Node-Dienstes? {#benefits-of-using-a-node-service}

Der Hauptvorteil bei der Nutzung eines Node-Dienstes besteht darin, die technische Zeit nicht zu benötigen, um die Nodes selbst aufzusetzen und zu verwalten. So kannst du dich auf den Aufbau deines Produkts konzentrieren, anstatt dich um die Wartung der Infrastruktur kümmern zu müssen.

Der Betrieb eigener Nodes kann sehr kostspielig sein, vom Speicherplatz über die Bandbreite bis hin zu wertvoller Entwicklungszeit. Dinge wie das Starten weiterer Nodes bei der Skalierung, das Aufrüsten von Nodes auf die neueste Version und die Sicherstellung der Zustandskonsistenz können von der Entwicklung und dem Einsatz von Ressourcen für dein gewünschtes Web3-Produkt ablenken.

## Was sind die Nachteile eines Node-Dienstes? {#cons-of-using-a-node-service}

Durch den Einsatz eines Node-Dienstes zentralisierst du den Infrastrukturaspekt deines Produkts. Aus diesem Grund bevorzugen Projekte, für die Dezentralisierung die oberste Priorität hat, eher selbst bereitgestellte Nodes gegenüber Outsourcing an Dritte.

Erfahre mehr über die [Vorteile des Betriebs deines eigenen Nodes](/developers/docs/nodes-and-clients/#benefits-to-you).

## Beliebte Node-Dienste {#popular-node-services}

Hier ist eine Liste der beliebtesten Ethereum-Nodeanbieter. Du bist eingeladen, fehlende hinzuzufügen! Jeder Node-Dienst bietet zusätzlich zu kostenlosen oder bezahlten Stufen verschiedene Vorteile und Funktionen. Bevor du dich entscheidest, solltest du untersuchen, welcher am besten zu deinen Bedürfnissen passt.

- [**Alchemy**](https://www.alchemy.com/)
  - [Dokumentation](https://docs.alchemyapi.io/)
  - Eigenschaften
    - Kostenlose Tier-Option
    - Skalierung nach Belieben
    - Kostenlose Archivdaten
    - Analysetools
    - Dashboard
    - Einzigartige API-Endpunkte
    - Webhooks
    - Direkter Support
- [**Ankr**](https://www.ankr.com/)
  - [Dokumentation](https://docs.ankr.com/)
  - Eigenschaften
    - Ankr-Protokoll – offener Zugang zu öffentlichen RPC-API-Endpunkten für 8+ Ketten
    - Lastausgleich und Überwachung der Node-Gesundheit für ein schnelles und zuverlässiges Gateway zum nächstgelegenen verfügbaren Node
    - Premium-Tier mit WSS-Endpunkt und unbegrenzter Tarifgrenze
    - Bereitstellung von vollständigen Nodes und Validierungs-Nodes für 40+ Ketten mit einem Klick
    - Skalierung nach Belieben
    - Analysetools
    - Dashboard
    - RPC-, HTTPS- und WSS-Endpunkte
    - Direkter Support
- [**BlockDaemon**](https://blockdaemon.com/)
  - [Dokumentation](https://ubiquity.docs.blockdaemon.com/)
  - Vorteile
    - Dashboard
    - Pro-Node-Basis
    - Analyse
- [**Chainstack**](https://chainstack.com/)
  - [Dokumentation](https://docs.chainstack.com/)
  - Eigenschaften
    - Kostenloses Teilen von Nodes
    - Gemeinsam genutzte Archiv-Nodes
    - GraphQL-Support
    - RPC- und WSS-Endpunkte
    - Dedizierte Voll- und Archiv-Nodes
    - Schnelle Synchronisierungszeit für gezielte Einsätze
    - Bring deine Cloud mit
    - Bezahlung pro Stunde
    - Direkter 24/7-Support
- [**GetBlock**](https://getblock.io/)
  - [Dokumentation](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - Eigenschaften
    - Zugang zu 40+ Blockchain-Nodes
    - 40.000 kostenlose und tägliche Anfragen
    - Unbegrenzte Anzahl von API-Schlüsseln
    - Hohe Verbindungsgeschwindigkeit mit 1GB/sec
    - Verfolgen+Archivieren
    - Erweiterte Analyse
    - Automatisierte Updates
    - Technischer Support
- [**InfStones**](https://infstones.com/)
  - Eigenschaften
    - Kostenlose Tier-Option
    - Skalierung nach Belieben
    - Analyse
    - Dashboard
    - Einzigartige API-Endpunkte
    - Dedizierte vollständige Nodes
    - Schnelle Synchronisierungszeit für gezielte Einsätze
    - Direkter 24/7-Support
    - Zugang zu mehr als 50 Blockchain-Nodes
- [**Infura**](https://infura.io/)
  - [Dokumentation](https://infura.io/docs)
  - Eigenschaften
    - Kostenlose Tier-Option
    - Skalierung nach Belieben
    - Kostenlose Archivierungsdaten
    - Direkter Support
    - Dashboard
- [**Kaleido**](https://kaleido.io/)
  - [Dokumentation](https://docs.kaleido.io/)
  - Eigenschaften
    - Kostenloser Starter
    - Bereitstellung von Ethereum-Nodes mit einem Klick
    - Anpassbare Clients und Algorithmen (Geth, Quorum & Besu || PoA, IBFT & Raft)
    - 500+ Verwaltungs- und Service-APIs
    - RESTful-Schnittstelle für die Übermittlung von Ethereum-Transaktionen (unterstützt von Apache Kafka)
    - Ausgehende Streams für die Zustellung von Ereignissen (unterstützt von Apache Kafka)
    - Umfassende Sammlung von "Off-Chain"- und Zusatzdiensten (z. B. bilateraler verschlüsselter Nachrichtenverkehr)
    - Unkompliziertes Netzwerk-Onboarding mit Governance und rollenbasierter Zugriffskontrolle
    - Ausgefeilte Benutzerverwaltung für Administratoren und Endbenutzer
    - Hochgradig skalierbare, belastbare, unternehmensgerechte Infrastruktur
    - Verwaltung privater HSM-Schlüssel in der Cloud
    - Ethereum Mainnet-Anbindung
    - ISO 27000 und SOC 2, Typ-2-Zertifizierungen
    - Dynamische Laufzeitkonfiguration (z. B. Hinzufügen von Cloud-Integrationen, Änderung von Knoteneingängen usw.)
    - Unterstützung für Multi-Cloud-, Multi-Region- und Hybrid-Einsatz-Orchestrierungen
    - Einfache SaaS-Preise auf Stundenbasis
    - SLAs- und 24/7-Support
- [**Moralis**](https://moralis.io/)
  - [Dokumentation](https://docs.moralis.io/)
  - Eigenschaften
    - Kostenloses Teilen von Nodes
    - Kostenlose gemeinsam genutzte Archiv-Nodes
    - Datenschutzfokussiert (keine Logs-Politik)
    - Kettenübergreifender Support
    - Skalierung nach Belieben
    - Dashboard
    - Einzigartiges Ethereum-SDK
    - Einzigartige API-Endpunkte
    - Direkter, technischer Support
- [**Pocket Network**](https://www.pokt.network/)
  - [Dokumentation](https://docs.pokt.network/home/)
  - Eigenschaften
    - Dezentrales RPC-Protokoll und Marktplatz
    - 1 Mio. Anfragen pro Tag für kostenlose Tiers (pro Endpunkt, max. 2)
    - [Öffentliche Endpunkte](https://docs.pokt.network/home/resources/public-rpc-endpoints)
    - Pre-Stake+-Programm (wenn du mehr als 1 Mio. Anfragen pro Tag benötigst)
    - Unterstützung von 15+ Blockchains
    - 6400+ Nodes verdienen POKT für die Bedienung von Anwendungen
    - Archivierungs- und Archivierungsnodes mit Rückverfolgung und Testnetz-Node-Unterstützung
    - Ethereum Mainnet Node-Client-Diversität
    - Kein einzelner Ausfallpunkt
    - Keine Ausfallzeit
    - Kosteneffiziente Near-Zero Tokenomics (POKT einmal für Netzwerkbandbreite einsetzen)
    - Keine monatlichen versunkenen Kosten: Verwandle deine Infrastruktur in einen Vermögenswert
    - Load-Balancing im Protokoll integriert
    - Unendliche Skalierung der Anzahl von Anfragen pro Tag und der Nodes pro Stunde
    - Die privatste und zensurresistenteste Option
    - Praktische Unterstützung für Entwickler
    - [Pocket Portal](https://bit.ly/ETHorg_POKTportal)-Dashboard und Analysen
- [**QuikNode**](https://www.quiknode.io/)
  - Eigenschaften
    - 7 Tage kostenlos
    - Vielseitiger Support
    - Webhooks
    - Dashboard
    - Analyse
- [**Rivet**](https://rivet.cloud/)
  - [Dokumentation](https://rivet.readthedocs.io/en/latest/)
  - Eigenschaften
    - Kostenlose Tier-Option
    - Skalierung nach Belieben
- [**SettleMint**](https://console.settlemint.com/)
  - [Dokumentation](https://docs.settlemint.com/)
  - Eigenschaften
    - Kostenlose Testphase
    - Skalierung nach Belieben
    - GraphQL-Support
    - RPC- und WSS-Endpunkte
    - Dedizierte vollständige Nodes
    - Bring deine Cloud mit
    - Analysetools
    - Dashboard
    - Bezahlung pro Stunde
    - Direkter Support
- [**Watchdata**](https://watchdata.io/)
  - [Dokumentation](https://docs.watchdata.io/)
  - Eigenschaften
    - Zuverlässigkeit der Daten
    - Ununterbrochene Verbindung ohne Ausfallzeiten
    - Prozessautomatisierung
    - Kostenlose Tarife
    - Hohe Limits, für jeden Benutzer geeignet
    - Unterstützung für unterschiedliche Nodes
    - Ressourcenskalierung
    - Hohe Verarbeitungsgeschwindigkeit

## Weiterführende Informationen {#further-reading}

- [Liste der Ethereum-Nodedienste](https://ethereumnodes.com/)

## Verwandte Themen {#related-topics}

- [Nodes und Clients](/developers/docs/nodes-and-clients/)

## Verwandte Tutorials {#related-tutorials}

- [Erste Schritte in der Ethereum-Entwicklung mit Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Leitfaden zum Versenden von Transaktionen über web3 und Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
