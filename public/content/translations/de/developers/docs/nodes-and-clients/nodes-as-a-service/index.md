---
title: Nodes als Dienstleistung
description: Eine Einstiegsübersicht über Node-Dienste, die Vor- und Nachteile und beliebte Anbieter.
lang: de
sidebarDepth: 2
---

## Einführung {#Introduction}

Das Betreiben eines eigenen [Ethereum-Nodes](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) kann eine Herausforderung sein, insbesondere beim Einstieg oder bei einer schnellen Skalierung. Es gibt eine [Reihe von Diensten](#popular-node-services), die für Sie optimierte Node-Infrastrukturen betreiben, sodass Sie sich stattdessen auf die Entwicklung Ihrer Anwendung oder Ihres Produkts konzentrieren können. Wir erklären Ihnen, wie Node-Dienste funktionieren, welche Vor- und Nachteile sie haben und listen Anbieter auf, falls Sie anfangen möchten, sie zu verwenden.

## Voraussetzungen {#prerequisites}

Wenn Sie noch nicht wissen, was Nodes und Clients sind, schauen Sie sich [Nodes und Clients](/developers/docs/nodes-and-clients/) an.

## Staker {#stakoooooooooooooors}

Solo-Staker müssen ihre eigene Infrastruktur betreiben, anstatt sich auf Drittanbieter zu verlassen. Das bedeutet, dass ein Ausführungsclient zusammen mit einem Konsensclient betrieben wird. Vor [The Merge](/roadmap/merge) war es möglich, nur einen Konsens-Client zu betreiben und einen zentralisierten Anbieter für Ausführungsdaten zu nutzen. Dies ist nicht mehr möglich – ein Solo-Staker muss beide Clients betreiben. Es gibt jedoch Dienste, die diesen Prozess erleichtern können.

[Erfahren Sie mehr über das Betreiben eines Nodes](/developers/docs/nodes-and-clients/run-a-node/).

Die auf dieser Seite beschriebenen Dienste gelten für Nicht-Staking-Nodes.

## Wie funktionieren Node-Dienste? {#how-do-node-services-work}

Node-Dienste betreiben im Hintergrund dezentralisierte Node-Clients für Sie, so dass Sie sich nicht darum kümmern müssen.

Diese Dienste bieten in der Regel einen API-Schlüssel an, den Sie verwenden können, um in der Blockchain zu schreiben und zu lesen. Sie bieten oft zusätzlich zum Mainnet auch Zugang zu [Ethereum-Testnets](/developers/docs/networks/#ethereum-testnets).

Einige Dienste bieten Ihnen ihren eigenen speziellen Node, den sie für Sie verwalten, während andere Load Balancer nutzen, um die Aktivität auf mehrere Nodes zu verteilen.

Fast alle Node-Dienste sind extrem einfach mit einer Zeilenänderung in Ihren Code zu integrieren, um Ihren selbst gehosteten Node auszutauschen oder sogar zwischen den Diensten selbst zu wechseln.

Node-Dienste betreiben oft eine Vielzahl von [Node-Clients](/developers/docs/nodes-and-clients/#execution-clients) und [-Typen](/developers/docs/nodes-and-clients/#node-types), sodass Sie über eine einzige API auf Full- und Archive-Nodes sowie auf clientspezifische Methoden zugreifen können.

Es ist wichtig zu beachten, dass Node-Dienste keinesfalls Ihre privaten Schlüssel oder Informationen speichern können und sollten.

## Was sind die Vorteile bei der Verwendung eines Node-Dienstes? Vorteile der Nutzung eines Node-Dienstes {#benefits-of-using-a-node-service}

Der Hauptvorteil bei der Nutzung eines Node-Dienstes besteht darin, dass keine Entwicklungszeit benötigt wird, um die Nodes selbst warten und zu verwalten. So können Sie sich auf den Aufbau Ihres Produkts konzentrieren, anstatt sich um die Wartung der Infrastruktur kümmern zu müssen.

Der Betrieb eigener Nodes kann sehr kostspielig sein, vom Speicherplatz über die Bandbreite bis hin zu wertvoller Entwicklungszeit. Dinge wie das Starten weiterer Nodes bei der Skalierung, das Aufrüsten von Nodes auf die neueste Version und die Sicherstellung der Zustandskonsistenz können von der Entwicklung und dem Einsatz von Ressourcen für Ihr gewünschtes Web3-Produkt ablenken.

## Was sind die Nachteile eines Node-Dienstes? Nachteile der Nutzung eines Node-Dienstes {#cons-of-using-a-node-service}

Durch den Einsatz eines Node-Dienstes zentralisieren Sie den Infrastrukturaspekt Ihres Produkts. Aus diesem Grund bevorzugen Projekte, für die Dezentralisierung die oberste Priorität hat, eher selbst bereitgestellte Nodes gegenüber Outsourcing an Dritte.

Lesen Sie mehr über die [Vorteile des Betreibens eines eigenen Nodes](/developers/docs/nodes-and-clients/#benefits-to-you).

## Beliebte Node-Dienste {#popular-node-services}

Hier ist eine Liste der beliebtesten Ethereum-Nodeanbieter. Fügen Sie gerne neue hinzu, die noch fehlen! Jeder Node-Dienst bietet zusätzlich zu kostenlosen oder bezahlten Stufen verschiedene Vorteile und Funktionen. Bevor Sie sich entscheiden, sollten Sie prüfen, welcher am besten zu Ihren Bedürfnissen passt.

- [**Alchemy**](https://alchemy.com/)
  - [Doku](https://www.alchemy.com/docs/)
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

- [**Allnodes**](https://www.allnodes.com/)
  - [Doku](https://docs.allnodes.com/)
  - Eigenschaften
    - Ein auf der Allnodes-Portfolio-Seite erstellter PublicNode-Token unterliegt keiner Ratenbegrenzung.
    - Auf den Datenschutz ausgerichtete, kostenlose RPC-Endpunkte (100+ Blockchains) auf [PublicNode](https://www.publicnode.com)
    - Deine eigenen dedizierten Nodes für über 90 Blockchains ohne Ratenbegrenzung
    - Voller Zugriff auf dedizierte Archive Nodes für über 30 Blockchains
    - Verfügbar in 3 Regionen (USA, EU, Asien)
    - Snapshots für 100+ Blockchains auf [PublicNode](https://www.publicnode.com/snapshots)
    - 24/7-Support & 99,90%-99.98% Uptime-SLA (planabhängig).
    - Bezahlung pro Stunde
    - Zahlung per Kreditkarte, PayPal oder Krypto

- [**All That Node**](https://allthatnode.com/)
  - [Doku](https://docs.allthatnode.com/)
  - Eigenschaften
    - 50,000 Anfragen pro Tag mit kostenloser Variante
    - Unterstützung für über 40 Protokolle
    - JSON-RPC(EVM, Tendermint)-, REST- und Websocket-API unterstützt
    - Unbegrenzter Zugang zu Archivdaten
    - Technischer Support rund um die Uhr und über 99,9 % Uptime
    - Ein Faucet ist auf mehreren Chains verfügbar
    - Unbegrenzter Endpunktzugang mit unbegrenzter Anzahl an API-Schlüsseln
    - Trace-/Debug-API unterstützt
    - Automatisierte Updates

- [**Amazon Managed Blockchain**](https://aws.amazon.com/managed-blockchain/)
  - [Doku](https://aws.amazon.com/managed-blockchain/resources/)
  - Eigenschaften
    - Vollständig verwaltete Ethereum-Nodes
    - Verfügbar in sechs Regionen
    - JSON-RPC über HTTP und sichere WebSockets
    - Unterstützt 3 Chains
    - SLAs, AWS-Support rund um die Uhr
    - Go-Ethereum und Lighthouse

- [**Ankr**](https://www.ankr.com/)
  - [Doku](https://docs.ankr.com/)
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
  - [Doku](https://docs.blastapi.io/)
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
  - [Doku](https://ubiquity.docs.blockdaemon.com/)
  - Vorteile
    - Dashboard
    - Pro-Node-Basis
    - Analysen

- [**BlockPI**](https://blockpi.io/)
  - [Doku](https://docs.blockpi.io/)
  - Eigenschaften
    - Robuste und verteilte Node-Struktur
    - Bis zu 40 HTTPS- und WSS-Endpunkte
    - Kostenloses Anmeldepaket und monatliches Paket
    - Support für Trace-Methode und Archivdaten
    - Pakete mit einer Gültigkeit von bis zu 90 Tagen
    - Individueller Plan und Zahlung nach Verbrauch (Pay-as-you-go)
    - Mit Kryptowährungen bezahlen
    - Direkter Support & Technischer Support

- [**Chainbase**](https://www.chainbase.com/)
  - [Doku](https://docs.chainbase.com)
  - Eigenschaften
    - Hochverfügbarer, schneller und skalierbarer RPC-Dienst
    - Unterstützung für mehrere Blockchains
    - Kostenlose Tarife
    - Benutzerfreundliches Dashboard
    - Bietet Blockchain-Datendienste über RPC hinaus

- [**Chainstack**](https://chainstack.com/)
  - [Doku](https://docs.chainstack.com/)
  - Eigenschaften
    - Kostenloses Teilen von Nodes
    - Gemeinsam genutzte Archiv-Nodes
    - GraphQL Support
    - RPC- und WSS-Endpunkte
    - Speziielle Voll- und Archiv-Nodes
    - Schnelle Synchronisierungszeit für gezielte Einsätze
    - Bringen Sie Ihre Cloud mit
    - Bezahlung pro Stunde
    - Direkter Support rund um die Uhr

- [**dRPC**](https://drpc.org/)
  - [Doku](https://drpc.org/docs)
  - NodeCloud: Plug-and-Play-RPC-Infrastruktur ab 10 $ (USD) – volle Geschwindigkeit, keine Limits
  - NodeCloud-Funktionen:
    - API-Unterstützung für 185 Netzwerke
    - Verteilter Pool von über 40 Anbietern
    - Globale Abdeckung mit neun (9) Geo-Clustern
    - KI-gestütztes Lastverteilungssystem
    - Nutzungsbasierte Pauschalpreise – keine Preiserhöhungen, kein Verfall, keine Anbieterbindung
    - Unbegrenzte Schlüssel, granulare Schlüsselanpassungen, Teamrollen, Frontend-Schutz
    - Methodenpauschale von 20 Recheneinheiten (CUs) pro Methode
    - [Chainlist öffentlicher Endpunkte](https://drpc.org/chainlist)
    - [Preisrechner](https://drpc.org/pricing#calculator)
  - NodeCore: Open-Source-Stack für Organisationen, die volle Kontrolle wünschen

- [**GetBlock**](https://getblock.io/)
  - [Doku](https://getblock.io/docs/get-started/authentication-with-api-key/)
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
  - [Doku](https://infura.io/docs)
  - Eigenschaften
    - Option für kostenlose Stufe
    - Skalierung nach Bedarf
    - Kostenpflichtige Archivierungsdaten
    - Direkter Support
    - Dashboard

- [**Kaleido**](https://kaleido.io/)
  - [Doku](https://docs.kaleido.io/)
  - Eigenschaften
    - Kostenlose Starter-Stufe
    - Bereitstellung von Ethereum-Nodes mit einem Klick
    - Anpassbare Clients und Algorithmen (Geth, Quorum & Besu || PoA, IBFT & Raft)
    - Mehr als 500 Verwaltungs- und Service-APIs
    - RESTful-Schnittstelle für die Übermittlung von Ethereum-Transaktionen (unterstützt von Apache Kafka)
    - Ausgehende Streams für die Zustellung von Ereignissen (unterstützt von Apache Kafka)
    - Umfangreiche Sammlung von "Offchain"- und Zusatzdiensten (z. B. bilateraler verschlüsselter Nachrichtentransport)
    - Unkompliziertes Netzwerk-Onboarding mit Governance und rollenbasierter Zugriffskontrolle
    - Ausgefeilte Benutzerverwaltung für Administratoren und Endbenutzer
    - Hochgradig skalierbare, belastbare, unternehmensgerechte Infrastruktur
    - Verwaltung privater HSM-Schlüssel in der Cloud
    - Ethereum Mainnet-Tethering
    - ISO 27000 und SOC 2, Typ-2-Zertifizierungen
    - Dynamische Laufzeitkonfiguration (z. B. Hinzufügen von Cloud-Integrationen, Ändern von Node-Ingresses usw.)
    - Unterstützung für Orchestrierungen von Multi-Cloud-, Multi-Region- und Hybrid-Bereitstellungen
    - Einfache SaaS-Preise auf Stundenbasis
    - SLA- und 24/7-Support

- [**Lava Network**](https://www.lavanet.xyz/)
  - [Doku](https://docs.lavanet.xyz/)
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
  - [Doku](https://docs.moralis.io/)
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
  - [Doku](https://docs.nodereal.io/docs/introduction)
  - Eigenschaften
    - Zuverlässige, schnelle und skalierbare RPC-API-Services
    - Verbesserte API für Web3-Entwickler
    - Unterstützung für mehrere Blockchains
    - Kostenloser Einstieg

- [**NOWNodes**](https://nownodes.io/)
  - [Doku](https://documenter.getpostman.com/view/13630829/TVmFkLwy)
  - Eigenschaften
    - Zugang zu mehr als 50 Blockchain-Nodes
    - Kostenloser API-Schlüssel
    - Block-Explorer
    - API-Antwortzeit ≤ 1 Sekunde
    - Support-Team rund um die Uhr (24/7)
    - Persönlicher Account Manager
    - Geteilte, archivierte, Backup- und Spezial-Nodes

- [**Pocket Network**](https://www.pokt.network/)
  - [Doku](https://docs.pokt.network/home/)
  - Eigenschaften
    - Dezentrales RPC-Protokoll und Marktplatz
    - 1 Mio. Anfragen pro Tag für kostenlose Stufen (pro Endpunkt, max. 2)
    - [Öffentliche Endpunkte](https://docs.pokt.network/developers/public-endpoints)
    - Pre-Stake+-Programm (wenn Sie mehr als 1 Mio. Anfragen pro Tag benötigen)
    - Support für mehr als 15 Blockchains
    - Über 6400 Nodes verdienen POKT für die Bedienung von Anwendungen
    - Archiv-Node, Archiv-Node mit Tracing & Unterstützung für Testnet-Nodes
    - Client-Diversität für Ethereum Mainnet Node
    - Kein einzelner Ausfallpunkt
    - Keine Ausfallzeit
    - Kosteneffiziente nahe-Null Tokenomics (POKT einmal für Netzwerkbandbreite einsetzen)
    - Keine monatlichen, verlorenen Kosten: Verwandeln Sie Ihre Infrastruktur in einen Vermögenswert
    - Im Protokoll integrierter Lastausgleich
    - Unendliche Skalierung der Anzahl von Anfragen pro Tag und der Nodes pro Stunde nach Bedarf
    - Die Option für höchste Privatsphäre und Zensurresistenz
    - Praktische Unterstützung für Entwickler
    - [Pocket Portal](https://bit.ly/ETHorg_POKTportal) Dashboard und Analysen

- [**QuickNode**](https://www.quicknode.com)
  - [Doku](https://www.quicknode.com/docs/)
  - Eigenschaften
    - Technischer Support rund um die Uhr & Entwickler-Discord-Community
    - Geobalanciertes, Multi-Cloud/Metal-unterstütztes Netzwerk mit geringer Latenz
    - Unterstützung für mehrere Blockchains (Optimism, Arbitrum, Polygon + 11 weitere)
    - Zwischenschichten für Geschwindigkeit und Stabilität (Anfragen-Routing, Cache, Indizierung)
    - Smart Contract-Überwachung über Webhooks
    - Intuitives Dashboard, Analysesuite, RPC-Composer
    - Erweiterte Sicherheitsfunktionen (JWT, Maskierung, Whitelisting)
    - NFT-Daten- und Analyse-API
    - [SOC2-zertifiziert](https://www.quicknode.com/security)
    - Geeignet für Entwickler und Unternehmen

- [**Rivet**](https://rivet.cloud/)
  - [Doku](https://rivet.readthedocs.io/en/latest/)
  - Eigenschaften
    - Option für kostenlose Stufe
    - Skalierung nach Bedarf

- [**SenseiNode**](https://senseinode.com)
  - [Doku](https://docs.senseinode.com/)
  - Eigenschaften
    - Spezielle und gemeinsam genutzte Nodes
    - Dashboard
    - Hosting außerhalb von AWS auf mehreren Hosting-Anbietern an verschiedenen Standorten in Lateinamerika
    - Prysm- und Lighthouse-Clients

- [**SettleMint**](https://console.settlemint.com/)
  - [Doku](https://docs.settlemint.com/)
  - Eigenschaften
    - Kostenlose Testphase
    - Skalierung nach Bedarf
    - GraphQL Support
    - RPC- und WSS-Endpunkte
    - Dedizierte vollständige Nodes
    - Bringen Sie Ihre Cloud mit
    - Analysetools
    - Dashboard
    - Bezahlung pro Stunde
    - Direkter Support

- [**Tenderly**](https://tenderly.co/web3-gateway)
  - [Doku](https://docs.tenderly.co/web3-gateway/web3-gateway)
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

- [**Tokenview**](https://services.tokenview.io/)
  - [Doku](https://services.tokenview.io/docs?type=nodeService)
  - Eigenschaften
    - Technischer Support rund um die Uhr & Entwickler-Telegram-Community
    - Multichain-Unterstützung (Bitcoin, Ethereum, Tron, BNB Smart Chain, Ethereum Classic)
    - Sowohl RPC- als auch WSS-Endpunkte können verwendet werden
    - Unbegrenzter Zugang zur Archivdaten-API
    - Dashboard mit Request Explorer und Mempool Watcher
    - NFT-Daten-API und Webhook-Benachrichtigung
    - Mit Kryptowährung zahlen
    - Externe Unterstützung für zusätzliche Verhaltenskriterien

- [**Watchdata**](https://watchdata.io/)
  - [Doku](https://docs.watchdata.io/)
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
  - [Doku](https://docs.zmok.io/)
  - Eigenschaften
    - Front-Running als Service
    - Globale Transaktions-Mempool mit Such- und Filtermethoden
    - Unbegrenzte Transaktionsgebühr und unendliches Gas für den Versand von Transaktionen
    - Schnellster Zugriff auf den neuen Block und Lesen der Blockchain
    - Die beste Preisgarantie pro API-Aufruf

- [**Zeeve**](https://www.zeeve.io/)
  - [Doku](https://www.zeeve.io/docs/)
  - Eigenschaften
    - No-Code-Automatisierungsplattform auf Unternehmensebene, die die Bereitstellung, Überwachung und Verwaltung von Blockchain-Knoten und -Netzwerken ermöglicht
    - Über 30 unterstützte Protokolle & Integrationen, und es werden immer mehr
    - Wertsteigernde Web3-Infrastrukturdienste wie dezentraler Speicher, dezentrale Identität und Blockchain-Ledger-Daten-APIs für reale Anwendungsfälle
    - Support und proaktives Monitoring rund um die Uhr stellen die Sicherheit der Knoten zu jeder Zeit sicher.
    - RPC-Endpunkte bieten authentifizierten Zugriff auf APIs, eine unkomplizierte Verwaltung mit einem intuitiven Dashboard und Analysen.
    - Bietet sowohl Optionen für verwaltete Clouds und Nutzung der eigenen Cloud und Support für die wichtigsten Cloud-Anbieter wie AWS, Azure, Google Cloud, Digital Ocean andere lokale Anbieter.
    - Wir verwenden intelligentes Routing, um bei jeder Anfrage den dem Benutzer am nächsten gelegenen Knoten anzusteuern

## Weiterführende Lektüre {#further-reading}

- [Liste von Ethereum-Node-Diensten](https://ethereumnodes.com/)

## Verwandte Themen {#related-topics}

- [Nodes und Clients](/developers/docs/nodes-and-clients/)

## Verwandte Tutorials {#related-tutorials}

- [Erste Schritte in der Ethereum-Entwicklung mit Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Anleitung zum Senden von Transaktionen mit Web3 und Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
