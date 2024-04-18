---
title: Nodes als Dienstleistung
description: Eine Einstiegsübersicht über Node-Dienste, die Vor- und Nachteile und beliebte Anbieter.
lang: de
sidebarDepth: 2
---

## Einführung {#Introduction}

Ihren eigenen [Ethereum-Node](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) zu betreiben, kann eine Herausforderung sein, vor allem wenn Sie gerade beginnen oder beim schnellen Skalieren. Es gibt eine [Anzahl von Diensten](#popular-node-services), die optimierte Node-Infrastrukturen für Sie ausführen, damit Sie sich stattdessen auf die Entwicklung Ihrer Anwendung oder Ihres Produkts konzentrieren können. Wir erklären Ihnen, wie Node-Dienste funktionieren, welche Vor- und Nachteile sie haben und listen Anbieter auf, falls Sie anfangen möchten, sie zu verwenden.

## Voraussetzungen {#prerequisites}

Wenn Sie noch nicht wissen, was Nodes und Clients sind, lesen Sie [Nodes und Clients](/developers/docs/nodes-and-clients/).

## Staker {#stakoooooooooooooors}

Solo-Staker müssen ihre eigene Infrastruktur betreiben, anstatt sich auf Drittanbieter zu verlassen. Das bedeutet, dass ein Ausführungsclient zusammen mit einem Konsensclient betrieben wird. Vor [der Zusammenführung](/roadmap/merge) war es möglich, nur einen Konsensclient zu betreiben und einen zentralisierten Anbieter für Ausführungsdaten zu verwenden; das ist jetzt nicht mehr möglich – ein Solo-Staker muss beide Clients betreiben. Es gibt jedoch Dienste, die diesen Prozess erleichtern können.

[Lesen Sie mehr über das Betreiben eines Nodes](/developers/docs/nodes-and-clients/run-a-node/).

Die auf dieser Seite beschriebenen Dienste gelten für Nicht-Staking-Nodes.

## Wie funktionieren Node-Dienste? {#how-do-node-services-work}

Node-Dienste betreiben im Hintergrund dezentralisierte Node-Clients für Sie, so dass Sie sich nicht darum kümmern müssen.

Diese Dienste bieten in der Regel einen API-Schlüssel an, den Sie verwenden können, um in der Blockchain zu schreiben und zu lesen. Sie beinhalten oft den Zugriff auf [Ethereum-Testnetze](/developers/docs/networks/#ethereum-testnets) zusätzlich zum Mainnet.

Einige Dienste bieten Ihnen ihren eigenen speziellen Node, den sie für Sie verwalten, während andere Load Balancer nutzen, um die Aktivität auf mehrere Nodes zu verteilen.

Fast alle Node-Dienste sind extrem einfach mit einer Zeilenänderung in Ihren Code zu integrieren, um Ihren selbst gehosteten Node auszutauschen oder sogar zwischen den Diensten selbst zu wechseln.

Oft laufen Node-Dienste mit einer Vielzahl von [Node-Clients](/developers/docs/nodes-and-clients/#execution-clients) und [Typen](/developers/docs/nodes-and-clients/#node-types), so dass Sie in einer API zusätzlich zu Client-spezifischen Methoden auf Voll- und Archivierungsnodes zugreifen können.

Es ist wichtig zu beachten, dass Node-Dienste keinesfalls Ihre privaten Schlüssel oder Informationen speichern können und sollten.

## Was sind die Vorteile bei der Verwendung eines Node-Dienstes? {#benefits-of-using-a-node-service}

Der Hauptvorteil bei der Nutzung eines Node-Dienstes besteht darin, dass keine Entwicklungszeit benötigt wird, um die Nodes selbst warten und zu verwalten. So können Sie sich auf den Aufbau Ihres Produkts konzentrieren, anstatt sich um die Wartung der Infrastruktur kümmern zu müssen.

Der Betrieb eigener Nodes kann sehr kostspielig sein, vom Speicherplatz über die Bandbreite bis hin zu wertvoller Entwicklungszeit. Dinge wie das Starten weiterer Nodes bei der Skalierung, das Aufrüsten von Nodes auf die neueste Version und die Sicherstellung der Zustandskonsistenz können von der Entwicklung und dem Einsatz von Ressourcen für Ihr gewünschtes Web3-Produkt ablenken.

## Was sind die Nachteile eines Node-Dienstes? {#cons-of-using-a-node-service}

Durch den Einsatz eines Node-Dienstes zentralisieren Sie den Infrastrukturaspekt Ihres Produkts. Aus diesem Grund bevorzugen Projekte, für die Dezentralisierung die oberste Priorität hat, eher selbst bereitgestellte Nodes gegenüber Outsourcing an Dritte.

Erfahren Sie mehr über die [Vorteile des Betriebs Ihres eigenen Nodes](/developers/docs/nodes-and-clients/#benefits-to-you).

## Beliebte Node-Dienste {#popular-node-services}

Hier ist eine Liste der beliebtesten Ethereum-Nodeanbieter. Fügen Sie gerne neue hinzu, die noch fehlen! Jeder Node-Dienst bietet zusätzlich zu kostenlosen oder bezahlten Stufen verschiedene Vorteile und Funktionen. Bevor Sie sich entscheiden, sollten Sie prüfen, welcher am besten zu Ihren Bedürfnissen passt.

- [**Alchemy**](https://alchemy.com/)
  - [Dokumentation](https://docs.alchemyapi.io/)
  - Eigenschaften
    - Die größte kostenlose Stufe bietet 300 Millionen Recheneinheiten pro Monat (ca. 30 Millionen getLatestBlock-Anfragen)
    - Multichain-Unterstützung für Polygon, Starknet, Optimism, Arbitrum
    - Verantwortlich für etwa 70 % der größten dApps und DeFi-Transaktionsvolumina von Ethereum
    - Webhook-Benachrichtigungen in Echtzeit über Alchemy Notify
    - Branchenführender Support und Zuverlässigkeit/Stabilität
    - NFT-API von Alchemy
    - Dashboard mit Request Explorer, Mempool Watcher und Composer
    - Integrierter Testnetz-Faucet-Zugang
    - Aktive Discord-Entwicklergemeinschaft mit 18.000 Nutzern
- [**All diese Nodes**](https://allthatnode.com/)
  - [Dokumentation](https://docs.allthatnode.com/)
  - Eigenschaften
    - Die größte kostenlose Stufe bietet 150.000 Anfragen pro Tag
    - Zugang zu über 24 Blockchain-Nodes
    - RPC-, HTTPS- und WSS-Endpunkte
    - Unbegrenzter Zugriff auf Archivdaten
    - Support rund um die Uhr und Serververfügbarkeit über 99,9 %
    - Ein Faucet ist auf mehreren Chains verfügbar
    - Unbegrenzter Zugriff auf Endpunkte mit einer unbegrenzten Anzahl von API-Schlüsseln
    - Trace-/Debug-Namespace ist verfügbar
    - Automatisierte Updates
    - Technischer Support
- [**Ankr**](https://www.ankr.com/)
  - [Dokumentation](https://docs.ankr.com/)
  - Eigenschaften
    - Ankr-Protokoll – offener Zugang zu öffentlichen RPC-API-Endpunkten für über 8 Chains
    - Lastausgleich und Überwachung der Node-Sicherheit für ein schnelles und zuverlässiges Gateway zum nächstgelegenen verfügbaren Node
    - Premium-Tier mit WSS-Endpunkt und unbegrenzter Rate
    - Bereitstellung von vollständigen Nodes und Validierungs-Nodes für über 40 Chains mit einem Klick
    - Skalierung nach Bedarf
    - Analysetools
    - Dashboard
    - RPC-, HTTPS- und WSS-Endpunkte
    - Direkter Support
- [**Blast**](https://blastapi.io/)
  - [Dokumentation](https://docs.blastapi.io/)
  - Eigenschaften
    - Support für RPC und WSS
    - Hosting von Nodes in mehreren Regionen
    - Dezentrale Infrastruktur
    - Öffentliche API
    - Spezifischer kostenloser Plan
    - Unterstützung für mehrere Blockchains (über 17 Blockchains)
    - Archivierte Nodes
    - Discord-Support rund um die Uhr
    - Überwachung und Benachrichtigungen rund um die Uhr
    - Eine Gesamt-Service-Level-Vereinbarung (SLA) von 99,9 %
    - Mit Kryptowährungen bezahlen
- [**BlockDaemon**](https://blockdaemon.com/)
  - [Dokumentation](https://ubiquity.docs.blockdaemon.com/)
  - Vorteile
    - Dashboard
    - Pro-Node-Basis
    - Analysen
- [**BlockPI**](https://blockpi.io/)
  - [Dokumentation](https://docs.blockpi.io/)
  - Funktionen
    - Robuste & verteilte Node-Struktur
    - Bis zu 40 HTTPS- und WSS-Endpunkte
    - Kostenloses Anmeldepaket und monatliches Paket
    - Support für Trace-Methode und Archivdaten
    - Pakete mit einer Gültigkeit von bis zu 90 Tagen
    - Individueller Plan und Zahlung nach Verbrauch (Pay-as-you-go)
    - Mit Kryptowährungen bezahlen
    - Direkte Unterstützung & technischer Support
- [**Chainstack**](https://chainstack.com/)
  - [Dokumentation](https://docs.chainstack.com/)
  - Eigenschaften
    - Kostenloses Teilen von Nodes
    - Gemeinsam genutzte Archiv-Nodes
    - GraphQL-Support
    - RPC- und WSS-Endpunkte
    - Speziielle Voll- und Archiv-Nodes
    - Schnelle Synchronisierungszeit für gezielte Einsätze
    - Bringen Sie Ihre Cloud mit
    - Bezahlung pro Stunde
    - Direkter Support rund um die Uhr
- [**DataHub**](https://datahub.figment.io)
  - [Dokumentation](https://docs.figment.io/)
  - Eigenschaften
    - Kostenlose Stufe mit 3.000.000 Anfragen pro Monat
    - RPC- und WSS-Endpunkte
    - Dedizierte Voll- und Archiv-Nodes
    - Automatische Skalierung (Volumenrabatte)
    - Kostenlose Archivdaten
    - Service-Analysen
    - Dashboard
    - Direkter Support rund um die Uhr
    - In Kryptowährung bezahlen (Unternehmen)
- [DRPC](https://drpc.org/)
  - [Dokumentation](https://docs.drpc.org/)
  - Eigenschaften
    - Dezentralisierte RPC-Nodes
    - Mehr als 15 Node-Anbieter
    - Node-Ausgleich
    - Unbegrenzte Anzahl an Recheneinheiten pro Monat in der kostenlosen Stufe
    - Datenverifizierung
    - Individuelle Endpunkte
    - HTTP- und WSS-Endpunkte
    - Unbegrenzte Schlüssel (kostenlose oder kostenpflichtige Stufen)
    - Flexible Ausweichoptionen
    - [Öffentlicher Endpunkt](https://eth.drpc.org)
    - Kostenlose gemeinsam genutzte Archiv-Nodes
- [**GetBlock**](https://getblock.io/)
  - [Dokumente](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - Eigenschaften
    - Zugang zu über 40 Blockchain-Knoten
    - 40.000 kostenlose und tägliche Anfragen
    - Unbegrenzte Anzahl von API-Schlüsseln
    - Hohe Verbindungsgeschwindigkeit mit 1GB/sec
    - Verfolgen+Archivieren
    - Erweiterte Analysen
    - Automatisierte Updates
    - Technischer Support
- [**InfStones**](https://infstones.com/)
  - Eigenschaften
    - Option für kostenlose Stufe
    - Skalierung nach Bedarf
    - Analysen
    - Dashboard
    - Einzigartige API-Endpunkte
    - Dedizierte vollständige Nodes
    - Schnelle Synchronisierungszeit für gezielte Einsätze
    - Direkter Support rund um die Uhr
    - Zugang zu mehr als 50 Blockchain-Nodes
- [**Infura**](https://infura.io/)
  - [Dokumentation](https://infura.io/docs)
  - Eigenschaften
    - Option für kostenlose Stufe
    - Skalierung nach Bedarf
    - Kostenpflichtige Archivierungsdaten
    - Direkter Support
    - Dashboard
- [**Kaleido**](https://kaleido.io/)
  - [Dokumentation](https://docs.kaleido.io/)
  - Eigenschaften
    - Kostenlose Starter-Stufe
    - Bereitstellung von Ethereum-Nodes mit einem Klick
    - Anpassbare Clients und Algorithmen (Geth, Quorum & Besu || PoA, IBFT & Raft)
    - Mehr als 500 Verwaltungs- und Service-APIs
    - RESTful-Schnittstelle für die Übermittlung von Ethereum-Transaktionen (unterstützt von Apache Kafka)
    - Ausgehende Streams für die Zustellung von Ereignissen (unterstützt von Apache Kafka)
    - Umfassende Sammlung von „Off-Chain“- und Zusatzdiensten (z. B. bilateraler verschlüsselter Nachrichtenverkehr)
    - Unkompliziertes Netzwerk-Onboarding mit Governance und rollenbasierter Zugriffskontrolle
    - Ausgefeilte Benutzerverwaltung für Administratoren und Endbenutzer
    - Hochgradig skalierbare, belastbare, unternehmensgerechte Infrastruktur
    - Verwaltung privater HSM-Schlüssel in der Cloud
    - Ethereum Mainnet-Tethering
    - ISO 27000 und SOC 2, Typ-2-Zertifizierungen
    - Dynamische Laufzeitkonfiguration (z. B. Hinzufügen von Cloud-Integrationen, Änderung von Knoteneingängen usw.)
    - Unterstützung für Orchestrierungen von Multi-Cloud-, Multi-Region- und Hybrid-Bereitstellungen
    - Einfache SaaS-Preise auf Stundenbasis
    - SLA- und 24/7-Support
- [**Lava Network**](https://www.lavanet.xyz/)
  - [Dokumentation](https://docs.lavanet.xyz/)
  - Eigenschaften
    - Kostenlose Testnetz-Nutzung
    - Dezentrale Redundanz für hohe Verfügbarkeit
    - Open-Source
    - Vollständig dezentralisierte SDK
    - Integration von Ethers.js
    - Intuitive Projektmanagement-Benutzeroberfläche
    - Konsensbasierte Datenintegrität
    - Unterstützung für mehrere Blockchains
- [**Moralis**](https://moralis.io/)
  - [Dokumentation](https://docs.moralis.io/)
  - Eigenschaften
    - Kostenloses Teilen von Nodes
    - Kostenlose gemeinsam genutzte Archiv-Nodes
    - Datenschutzorientiert (keine Protokollrichtlinien)
    - Chain-übergreifender Support
    - Skalierung nach Bedarf
    - Dashboard
    - Einzigartiges Ethereum-SDK
    - Einzigartige API-Endpunkte
    - Direkter, technischer Support
- [**NodeReal MegaNode**](https://nodereal.io/)
  - [Dokumentation](https://docs.nodereal.io/nodereal/meganode/introduction)
  - Features
    - Zuverlässige, schnelle und skalierbare RPC-API-Services
    - Verbesserte API für Web3-Entwickler
    - Unterstützung für mehrere Blockchains
    - Kostenloser Einstieg
- [**NOWNodes**](https://nownodes.io/)
  - [Dokumente](https://documenter.getpostman.com/view/13630829/TVmFkLwy)
  - Eigenschaften
    - Zugang zu mehr als 50 Blockchain-Nodes
    - Kostenloser API-Schlüssel
    - Block-Explorer
    - API-Antwortzeit ≤ 1 Sekunde
    - Support-Team rund um die Uhr (24/7)
    - Persönlicher Account Manager
    - Geteilte, archivierte, Backup- und Spezial-Nodes
- [**Pocket Network**](https://www.pokt.network/)
  - [Dokumente](https://docs.pokt.network/home/)
  - Eigenschaften
    - Dezentrales RPC-Protokoll und Marktplatz
    - 1 Mio. Anfragen pro Tag für kostenlose Stufen (pro Endpunkt, max. 2)
    - [Öffentliche Endpunkte](https://docs.pokt.network/developers/public-endpoints)
    - Pre-Stake+-Programm (wenn Sie mehr als 1 Mio. Anfragen pro Tag benötigen)
    - Support für mehr als 15 Blockchains
    - Über 6400 Nodes verdienen POKT für die Bedienung von Anwendungen
    - Archivierungsnodes, Archivierungsnodes mit Rückverfolgung & Support für Testnetz-Node
    - Client-Diversität für Ethereum Mainnet Node
    - Kein einzelner Ausfallpunkt
    - Keine Ausfallzeit
    - Kosteneffiziente nahe-Null Tokenomics (POKT einmal für Netzwerkbandbreite einsetzen)
    - Keine monatlichen, verlorenen Kosten: Verwandeln Sie Ihre Infrastruktur in einen Vermögenswert
    - Im Protokoll integrierter Lastausgleich
    - Unendliche Skalierung der Anzahl von Anfragen pro Tag und der Nodes pro Stunde nach Bedarf
    - Die Option für höchste Privatsphäre und Zensurresistenz
    - Praktische Unterstützung für Entwickler
    - [Pocket Portal](https://bit.ly/ETHorg_POKTportal)-Dashboard und Analysen
- [**QuickNode**](https://www.quicknode.com)
  - [Dokumente](https://www.quicknode.com/docs/)
  - Eigenschaften
    - Technischer Support rund um die Uhr & Discord-Community für Entwickler
    - Geobalanciertes, Multi-Cloud/Metal-unterstütztes Netzwerk mit geringer Latenz
    - Unterstützung für mehrere Blockchains (Optimism, Arbitrum, Polygon + 11 weitere)
    - Mittelebenen für Geschwindigkeit & Stabilität (Anrufweiterleitung, Cache, Indizierung)
    - Smart Contract-Überwachung über Webhooks
    - Intuitives Dashboard, Analysesuite, RPC-Composer
    - Erweiterte Sicherheitsfunktionen (JWT, Maskierung, Whitelisting)
    - NFT-Daten- und Analyse-API
    - [SOC2-zertifiziert](https://www.quicknode.com/security)
    - Geeignet für Entwickler und Unternehmen
- [**Rivet**](https://rivet.cloud/)
  - [Dokumente](https://rivet.readthedocs.io/en/latest/)
  - Eigenschaften
    - Option für kostenlose Stufe
    - Skalierung nach Bedarf
- [**SenseiNode**](https://senseinode.com)
  - [Dokumente](https://docs.senseinode.com/)
  - Eigenschaften
    - Spezielle und gemeinsam genutzte Nodes
    - Dashboard
    - Hosting außerhalb von AWS auf mehreren Hosting-Anbietern an verschiedenen Standorten in Lateinamerika
    - Prysm- und Lighthouse-Clients
- [**SettleMint**](https://console.settlemint.com/)
  - [Dokumente](https://docs.settlemint.com/)
  - Eigenschaften
    - Kostenlose Testphase
    - Skalierung nach Bedarf
    - GraphQL-Support
    - RPC- und WSS-Endpunkte
    - Dedizierte vollständige Nodes
    - Bringen Sie Ihre Cloud mit
    - Analysetools
    - Dashboard
    - Bezahlung pro Stunde
    - Direkter Support
- [**Tenderly**](https://tenderly.co/web3-gateway)
  - [Dokumente](https://docs.tenderly.co/web3-gateway/web3-gateway)
  - Eigenschaften
    - Kostenlose Stufe einschließlich 25 Millionen Tenderly-Einheiten pro Monat
    - Kostenloser Zugang zu historischen Daten
    - Bis zu 8-mal schnellere Lesevorgänge bei lastintensiven Workloads
    - 100 % konsistenter Lesezugriff
    - JSON-RPC-Endpunkte
    - UI-basierter RPC-Anforderungs-Builder und Vorschau der Anforderung
    - Eng integriert mit Tenderlys Entwicklungs-, Debugging- und Testwerkzeugen
    - Transaktionssimulationen
    - Nutzungsanalysen und Filterung
    - Einfache Zugriffsschlüssel-Verwaltung
    - Dedizierter technischer Support per Chat, E-Mail und Discord
- [**Watchdata**](https://watchdata.io/)
  - [Dokumente](https://docs.watchdata.io/)
  - Eigenschaften
    - Zuverlässigkeit der Daten
    - Ununterbrochene Verbindung ohne Ausfallzeiten
    - Prozessautomatisierung
    - Kostenlose Tarife
    - Hohe Limits, für jeden Benutzer geeignet
    - Unterstützung für unterschiedliche Nodes
    - Ressourcenskalierung
    - Hohe Verarbeitungsgeschwindigkeit
- [**ZMOK**](https://zmok.io/)
  - [Dokumente](https://docs.zmok.io/)
  - Eigenschaften
    - Front-Running als Service
    - Globale Transaktions-Mempool mit Such- und Filtermethoden
    - Unbegrenzte Transaktionsgebühr und unendliches Gas für den Versand von Transaktionen
    - Schnellster Zugriff auf den neuen Block und Lesen der Blockchain
    - Die beste Preisgarantie pro API-Aufruf
- [**Chainbase**](https://www.chainbase.com/)
  - [Dokumente](https://docs.chainbase.com)
  - Eigenschaften
    - Hochverfügbarer, schneller und skalierbarer RPC-Dienst
    - Unterstützung für mehrere Blockchains
    - Kostenlose Tarife
    - Benutzerfreundliches Dashboard
    - Bietet Blockchain-Datendienste über RPC hinaus

[**Zeeve**](https://www.zeeve.io/)

- [Dokumente](https://www.zeeve.io/docs/)
- Eigenschaften
  - No-Code-Automatisierungsplattform auf Unternehmensebene, die die Bereitstellung, Überwachung und Verwaltung von Blockchain-Knoten und -Netzwerken ermöglicht
  - Mind. 30 unterstützte Protokolle und Integrationen, mit der Möglichkeit weitere hinzuzufügen
  - Wertsteigernde Web3-Infrastrukturdienste wie dezentraler Speicher, dezentrale Identität und Blockchain-Ledger-Daten-APIs für reale Anwendungsfälle
  - Support und proaktives Monitoring rund um die Uhr stellen die Sicherheit der Knoten zu jeder Zeit sicher.
  - RPC-Endpunkte bieten authentifizierten Zugang zu API, mühelose Verwaltung mit intuitiven Dashboards und Analysen.
  - Bietet sowohl Optionen für verwaltete Clouds und Nutzung der eigenen Cloud und Support für die wichtigsten Cloud-Anbieter wie AWS, Azure, Google Cloud, Digital Ocean andere lokale Anbieter.
  - Wir verwenden intelligentes Routing, um bei jeder Anfrage den dem Benutzer am nächsten gelegenen Knoten anzusteuern

[**Tokenview**](https://services.tokenview.io/)

- [Dokumente](https://services.tokeniew/docs?type=nodeService)
- Eigenschaften
  - Technische Unterstützung rund um die Uhr & Dev Telegram APP-Community
  - Multichain-Unterstützung (Bitcoin, Ethereum, Tron, BNB Smart Chain, Ethereum Classic)
  - Sowohl die RPC- als auch die WSS-Endpunkte können genutzt werden
  - Unbegrenzter Zugang zur Archivdaten-API
  - Dashboard mit Request Explorer und Mempool Watcher
  - NFT-Daten-API und Webhook-Benachrichtigung
  - Mit Kryptowährung zahlen
  - Externe Unterstützung für zusätzliche Verhaltenskriterien

## Weiterführende Informationen {#further-reading}

- [Liste der Ethereum-Knotendienste](https://ethereumnodes.com/)

## Verwandte Themen {#related-topics}

- [Knotenpunkte und Clients](/developers/docs/nodes-and-clients/)

## Verwandte Tutorials {#related-tutorials}

- [Erste Schritte in der Ethereum-Entwicklung mit Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Leitfaden zum Versenden von Transaktionen über web3 und Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
