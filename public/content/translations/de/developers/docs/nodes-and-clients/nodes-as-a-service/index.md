---
title: Blockchain-Knoten als Dienstleistung
description: "Ein grundlegender Überblick über Blockchain-Knoten-Dienste, deren Vor- und Nachteile sowie beliebte Anbieter."
lang: de
sidebarDepth: 2
---

## Einführung {#Introduction}

Den eigenen [Ethereum-Blockchain-Knoten](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) zu betreiben, kann eine Herausforderung sein, besonders zu Beginn oder bei schneller Skalierung. Es gibt eine [Reihe von Diensten](#popular-node-services), die optimierte Blockchain-Knoten-Infrastrukturen für Sie betreiben, sodass Sie sich stattdessen auf die Entwicklung Ihrer Anwendung oder Ihres Produkts konzentrieren können. Wir erklären, wie Blockchain-Knoten-Dienste funktionieren, welche Vor- und Nachteile ihre Nutzung hat, und listen Anbieter auf, falls Sie daran interessiert sind, loszulegen.

## Voraussetzungen {#prerequisites}

Wenn Sie noch nicht wissen, was Blockchain-Knoten und Anwendungen (Clients) sind, lesen Sie sich [Blockchain-Knoten und Anwendungen](/developers/docs/nodes-and-clients/) durch.

## Staker {#stakoooooooooooooors}

Solo-Staker müssen ihre eigene Infrastruktur betreiben, anstatt sich auf Drittanbieter zu verlassen. Das bedeutet, dass sie einen Ausführungs-Client in Verbindung mit einem Konsens-Client betreiben müssen. Vor [dem Merge](/roadmap/merge) war es möglich, nur einen Konsens-Client zu betreiben und einen zentralisierten Anbieter für Ausführungsdaten zu nutzen; dies ist nicht mehr möglich – ein Solo-Staker muss beide Clients betreiben. Es gibt jedoch Dienste, die diesen Prozess erleichtern.

[Mehr über den Betrieb eines Blockchain-Knotens lesen](/developers/docs/nodes-and-clients/run-a-node/).

Die auf dieser Seite beschriebenen Dienste sind für Blockchain-Knoten ohne Staking gedacht.

## Wie funktionieren Blockchain-Knoten-Dienste? {#how-do-node-services-work}

Anbieter von Blockchain-Knoten-Diensten betreiben im Hintergrund verteilte Blockchain-Knoten-Anwendungen für Sie, sodass Sie dies nicht tun müssen.

Diese Dienste stellen in der Regel einen API-Schlüssel zur Verfügung, mit dem Sie auf die Blockchain schreiben und von ihr lesen können. Sie beinhalten oft neben dem Mainnet auch Zugang zu [Ethereum-Testnets](/developers/docs/networks/#ethereum-testnets).

Einige Dienste bieten Ihnen einen eigenen dedizierten Blockchain-Knoten, den sie für Sie verwalten, während andere Load-Balancer verwenden, um die Aktivität auf verschiedene Blockchain-Knoten zu verteilen.

Fast alle Blockchain-Knoten-Dienste sind extrem einfach zu integrieren und erfordern nur einzeilige Änderungen in Ihrem Code, um Ihren selbst gehosteten Blockchain-Knoten auszutauschen oder sogar zwischen den Diensten selbst zu wechseln.

Oftmals betreiben Blockchain-Knoten-Dienste eine Vielzahl von [Blockchain-Knoten-Anwendungen](/developers/docs/nodes-and-clients/#execution-clients) und [-Typen](/developers/docs/nodes-and-clients/#node-types), was Ihnen den Zugriff auf vollständige und Archiv-Blockchain-Knoten zusätzlich zu anwendungsspezifischen Methoden in einer API ermöglicht.

Es ist wichtig zu beachten, dass Blockchain-Knoten-Dienste Ihre Private-Keys oder Informationen nicht speichern und dies auch nicht tun sollten.

## Was sind die Vorteile der Nutzung eines Blockchain-Knoten-Dienstes? {#benefits-of-using-a-node-service}

Der Hauptvorteil bei der Nutzung eines Blockchain-Knoten-Dienstes besteht darin, dass Sie keine Entwicklungszeit für die eigene Wartung und Verwaltung von Blockchain-Knoten aufwenden müssen. Dadurch können Sie sich auf die Entwicklung Ihres Produkts konzentrieren, anstatt sich um die Wartung der Infrastruktur kümmern zu müssen.

Der Betrieb eigener Blockchain-Knoten kann sehr teuer sein, von Speicherplatz über Bandbreite bis hin zu wertvoller Entwicklungszeit. Dinge wie das Hochfahren weiterer Blockchain-Knoten bei der Skalierung, das Aktualisieren von Blockchain-Knoten auf die neuesten Versionen und die Sicherstellung der Zustandskonsistenz können davon ablenken, Ihr gewünschtes Web3-Produkt zu entwickeln und Ressourcen dafür aufzuwenden.

## Was sind die Nachteile der Nutzung eines Blockchain-Knoten-Dienstes? {#cons-of-using-a-node-service}

Durch die Nutzung eines Blockchain-Knoten-Dienstes zentralisieren Sie den Infrastrukturaspekt Ihres Produkts. Aus diesem Grund bevorzugen Projekte, die größten Wert auf Dezentralisierung legen, möglicherweise das Selbst-Hosting von Blockchain-Knoten anstelle der Auslagerung an einen Drittanbieter.

Lesen Sie mehr über die [Vorteile des Betriebs eines eigenen Blockchain-Knotens](/developers/docs/nodes-and-clients/#benefits-to-you).

## Beliebte Blockchain-Knoten-Dienste {#popular-node-services}

Hier ist eine Liste einiger der beliebtesten Ethereum-Blockchain-Knoten-Anbieter. Fügen Sie gerne fehlende hinzu! Jeder Blockchain-Knoten-Dienst bietet unterschiedliche Vorteile und Funktionen sowie kostenlose oder kostenpflichtige Tarife. Sie sollten vor einer Entscheidung prüfen, welche am besten zu Ihren Anforderungen passen.

- [**Alchemy**](https://alchemy.com/)
  - [Dokumentation](https://www.alchemy.com/docs/)
  - Funktionen
    - Größter kostenloser Tarif mit 300 Mio. Recheneinheiten pro Monat (\~30 Mio. getLatestBlock-Anfragen)
    - Multi-Chain-Unterstützung für Polygon, Starknet, Optimism, Arbitrum
    - Unterstützt ~70 % der größten Ethereum-Dapps und des DeFi-Transaktionsvolumens
    - Echtzeit-Webhook-Benachrichtigungen über Alchemy Notify
    - Erstklassiger Support und Zuverlässigkeit/Stabilität
    - Alchemys NFT-API
    - Dashboard mit Request Explorer, Mempool Watcher und Composer
    - Integrierter Testnet-Faucet-Zugang
    - Aktive Discord-Entwickler-Community mit 18.000 Nutzern

- [**Allnodes**](https://www.allnodes.com/)
  - [Dokumentation](https://docs.allnodes.com/)
  - Funktionen
    - Keine Ratenbegrenzungen mit dem PublicNode-Token, der auf der Allnodes-Portfolio-Seite erstellt wird.
    - Datenschutzorientierte kostenlose RPC-Endpunkte (100+ Blockchains) auf [PublicNode](https://www.publicnode.com)
    - Dedizierte Blockchain-Knoten ohne Ratenbegrenzungen für 90+ Blockchains
    - Dedizierte Archiv-Blockchain-Knoten für 30+ Blockchains
    - Verfügbar in 3 Regionen (USA, EU, Asien)
    - Snapshots für 100+ Blockchains auf [PublicNode](https://www.publicnode.com/snapshots)
    - Technischer 24/7-Support mit 99,90 %–99,98 % Uptime-SLA (abhängig vom Tarif).
    - Preisgestaltung pro Stunde
    - Zahlung mit Kreditkarte, PayPal oder Krypto

- [**All That Node**](https://allthatnode.com/)
  - [Dokumentation](https://docs.allthatnode.com/)
  - Funktionen
    - 50.000 Anfragen pro Tag im kostenlosen Tarif
    - Unterstützung für über 40 Protokolle
    - JSON-RPC (EVM, Tendermint), REST und Websocket-APIs werden unterstützt
    - Unbegrenzter Zugriff auf Archivdaten
    - Technischer 24/7-Support und über 99,9 % Verfügbarkeit
    - Faucet auf mehreren Chains verfügbar
    - Unbegrenzter Endpunktzugriff mit einer unbegrenzten Anzahl von API-Schlüsseln
    - Trace/Debug-API wird unterstützt
    - Automatisierte Updates

- [**Amazon Managed Blockchain**](https://aws.amazon.com/managed-blockchain/)
  - [Dokumentation](https://aws.amazon.com/managed-blockchain/resources/)
  - Funktionen
    - Vollständig verwaltete Ethereum-Blockchain-Knoten
    - Verfügbar in sechs Regionen
    - JSON-RPC über HTTP und sichere WebSockets
    - Unterstützt 3 Chains
    - SLAs, AWS-Support 24/7
    - Go-ethereum und Lighthouse

- [**Ankr**](https://www.ankr.com/)
  - [Dokumentation](https://docs.ankr.com/)
  - Funktionen
    - Ankr Protocol – offener Zugang zu öffentlichen RPC-API-Endpunkten für 8+ Chains
    - Lastausgleich und Überwachung des Blockchain-Knoten-Zustands für ein schnelles und zuverlässiges Gateway zum nächsten verfügbaren Blockchain-Knoten
    - Premium-Tarif, der WSS-Endpunkte und unbegrenzte Ratenlimits ermöglicht
    - Ein-Klick-Bereitstellung von vollständigen Blockchain-Knoten und Validator-Blockchain-Knoten für 40+ Chains
    - Skalierung nach Bedarf
    - Analysetools
    - Dashboard
    - RPC-, HTTPS- und WSS-Endpunkte
    - Direkter Support

- [**Blast**](https://blastapi.io/)
  - [Dokumentation](https://docs.blastapi.io/)
  - Funktionen
    - RPC- und WSS-Unterstützung
    - Multi-Region-Hosting von Blockchain-Knoten
    - Dezentralisierte Infrastruktur
    - Öffentliche API
    - Dedizierter kostenloser Tarif
    - Multi-Chain-Unterstützung (17+ Blockchains)
    - Archiv-Blockchain-Knoten
    - 24/7-Discord-Support
    - 24/7-Überwachung und -Benachrichtigungen
    - Ein Gesamt-SLA von 99,9 %
    - Zahlung in Krypto

- [**BlockDaemon**](https://blockdaemon.com/)
  - [Dokumentation](https://ubiquity.docs.blockdaemon.com/)
  - Vorteile
    - Dashboard
    - Pro-Blockchain-Knoten-Basis
    - Analysen

- [**BlockPI**](https://blockpi.io/)
  - [Dokumentation](https://docs.blockpi.io/)
  - Funktionen
    - Robuste & verteilte Blockchain-Knoten-Struktur
    - Bis zu 40 HTTPS- und WSS-Endpunkte
    - Kostenloses Anmeldepaket und monatliches Paket
    - Trace-Methode + Unterstützung für Archivdaten
    - Pakete mit bis zu 90 Tagen Gültigkeit
    - Benutzerdefinierter Tarif und Pay-as-you-go-Zahlung
    - Zahlung in Krypto
    - Direkter Support & Technischer Support

- [**Chainbase**](https://www.chainbase.com/)
  - [Dokumentation](https://docs.chainbase.com)
  - Funktionen
    - Hochverfügbarer, schneller und skalierbarer RPC-Dienst
    - Multi-Chain-Unterstützung
    - Kostenlose Tarife
    - Benutzerfreundliches Dashboard
    - Bietet Blockchain-Datendienste über RPC hinaus

- [**Chainstack**](https://chainstack.com/)
  - [Dokumentation](https://docs.chainstack.com/)
  - Funktionen
    - Kostenlose geteilte Blockchain-Knoten
    - Geteilte Archiv-Blockchain-Knoten
    - GraphQL-Unterstützung
    - RPC- und WSS-Endpunkte
    - Dedizierte vollständige und Archiv-Blockchain-Knoten
    - Schnelle Synchronisierungszeit für dedizierte Bereitstellungen
    - Bring Your Own Cloud
    - Preisgestaltung pro Stunde
    - Direkter 24/7-Support

- [**dRPC**](https://drpc.org/)
  - [Dokumentation](https://drpc.org/docs)
  - NodeCloud: Plug-and-Play-RPC-Infrastruktur ab 10 $ (USD) – volle Geschwindigkeit, keine Limits
  - NodeCloud-Funktionen:
    - API-Unterstützung für 185 Netzwerke
    - Verteilter Pool von 40+ Anbietern
    - Globale Abdeckung mit neun (9) Geo-Clustern
    - KI-gestütztes Lastausgleichssystem
    - Pay-as-you-go-Pauschalpreise – keine Preiserhöhungen, kein Verfall, keine Bindung
    - Unbegrenzte Schlüssel, granulare Schlüsselanpassungen, Teamrollen, Front-End-Schutz
    - Methoden-Pauschale von 20 Recheneinheiten (CUs) pro Methode
    - [Öffentliche Endpunkt-Chainlist](https://drpc.org/chainlist)
    - [Preisrechner](https://drpc.org/pricing#calculator)
  - NodeCore: Open-Source-Stack für Organisationen, die volle Kontrolle wünschen

- [**GetBlock**](https://getblock.io/)
  - [Dokumentation](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - Funktionen
    - Zugriff auf 40+ Blockchain-Knoten
    - 40.000 kostenlose tägliche Anfragen
    - Unbegrenzte Anzahl von API-Schlüsseln
    - Hohe Verbindungsgeschwindigkeit mit 1 GB/s
    - Trace+Archiv
    - Erweiterte Analysen
    - Automatisierte Updates
    - Technischer Support

- [**InfStones**](https://infstones.com/)
  - Funktionen
    - Kostenlose Tarifoption
    - Skalierung nach Bedarf
    - Analysen
    - Dashboard
    - Einzigartige API-Endpunkte
    - Dedizierte vollständige Blockchain-Knoten
    - Schnelle Synchronisierungszeit für dedizierte Bereitstellungen
    - Direkter 24/7-Support
    - Zugriff auf 50+ Blockchain-Knoten

- [**Infura**](https://infura.io/)
  - [Dokumentation](https://infura.io/docs)
  - Funktionen
    - Kostenlose Tarifoption
    - Skalierung nach Bedarf
    - Kostenpflichtige Archivdaten
    - Direkter Support
    - Dashboard

- [**Kaleido**](https://kaleido.io/)
  - [Dokumentation](https://docs.kaleido.io/)
  - Funktionen
    - Kostenloser Einsteigertarif
    - Ein-Klick-Bereitstellung von Ethereum-Blockchain-Knoten
    - Anpassbare Clients und Algorithmen (Geth, Quorum & Besu || PoA, IBFT & Raft)
    - 500+ Verwaltungs- und Service-APIs
    - RESTful-Schnittstelle für die Übermittlung von Ethereum-Transaktionen (unterstützt durch Apache Kafka)
    - Ausgehende Streams für die Ereignisbereitstellung (unterstützt durch Apache Kafka)
    - Umfangreiche Sammlung von Off-Chain- und Zusatzdiensten (z. B. bilateraler verschlüsselter Nachrichtentransport)
    - Unkompliziertes Netzwerk-Onboarding mit Governance und rollenbasierter Zugriffskontrolle
    - Ausgefeilte Benutzerverwaltung für Administratoren und Endbenutzer
    - Hochskalierbare, belastbare Infrastruktur auf Unternehmensniveau
    - Cloud-HSM-Private-Key-Verwaltung
    - Ethereum-Mainnet-Tethering
    - ISO 27k- und SOC 2, Typ 2-Zertifizierungen
    - Dynamische Laufzeitkonfiguration (z. B. Hinzufügen von Cloud-Integrationen, Ändern von Blockchain-Knoten-Zugängen usw.)
    - Unterstützung für Multi-Cloud-, Multi-Region- und hybride Bereitstellungsorchestrierungen
    - Einfache stündliche SaaS-basierte Preisgestaltung
    - SLAs und 24/7-Support

- [**Lava Network**](https://www.lavanet.xyz/)
  - [Dokumentation](https://docs.lavanet.xyz/)
  - Funktionen
    - Kostenlose Testnet-Nutzung
    - Dezentralisierte Redundanz für hohe Verfügbarkeit
    - Open-Source
    - Vollständig dezentralisiertes SDK
    - Ethers.js-Integration
    - Intuitive Projektmanagement-Schnittstelle
    - Konsensbasierte Datenintegrität
    - Multi-Chain-Unterstützung

- [**Moralis**](https://moralis.io/)
  - [Dokumentation](https://docs.moralis.io/)
  - Funktionen
    - Kostenlose geteilte Blockchain-Knoten
    - Kostenlose geteilte Archiv-Blockchain-Knoten
    - Datenschutzorientiert (Keine-Logs-Richtlinie)
    - Cross-Chain-Unterstützung
    - Skalierung nach Bedarf
    - Dashboard
    - Einzigartiges Ethereum-SDK
    - Einzigartige API-Endpunkte
    - Direkter, technischer Support

- [**NodeReal MegaNode**](https://nodereal.io/)
  - [Dokumentation](https://docs.nodereal.io/docs/introduction)
  - Funktionen
    - Zuverlässige, schnelle und skalierbare RPC-API-Dienste
    - Erweiterte API für Web3-Entwickler
    - Multi-Chain-Unterstützung
    - Kostenlos loslegen

- [**NOWNodes**](https://nownodes.io/)
  - Funktionen
    - Zugriff auf 50+ Blockchain-Knoten
    - Kostenloser API-Schlüssel
    - Blocksuchmaschinen
    - API-Antwortzeit ⩽ 1 Sek.
    - 24/7-Support-Team
    - Persönlicher Account-Manager
    - Geteilte, Archiv-, Backup- und dedizierte Blockchain-Knoten

- [**Pocket Network**](https://www.pokt.network/)
  - [Dokumentation](https://docs.pokt.network/)
  - Funktionen
    - Dezentralisiertes RPC-Protokoll und Marktplatz
    - Kostenloser Tarif mit 1 Mio. Anfragen pro Tag (pro Endpunkt, max. 2)
    - Pre-Stake+-Programm (wenn Sie mehr als 1 Mio. Anfragen pro Tag benötigen)
    - 15+ unterstützte Blockchains
    - 6400+ Blockchain-Knoten, die POKT für die Bereitstellung von Anwendungen verdienen
    - Unterstützung für Archiv-Blockchain-Knoten, Archiv-Blockchain-Knoten mit Tracing & Testnet-Blockchain-Knoten
    - Client-Vielfalt für Ethereum-Mainnet-Blockchain-Knoten
    - Kein Single Point of Failure
    - Keine Ausfallzeiten
    - Kostengünstige Near-Zero-Tokenomics (einmaliges Staking von POKT für Netzwerkbandbreite)
    - Keine monatlichen versunkenen Kosten, machen Sie Ihre Infrastruktur zu einem Vermögenswert
    - In das Protokoll integrierter Lastausgleich
    - Unendliche Skalierung der Anzahl von Anfragen pro Tag und Blockchain-Knoten pro Stunde nach Bedarf
    - Die privateste, zensurresistenteste Option
    - Praktischer Entwickler-Support
    - [Pocket Portal](https://bit.ly/ETHorg_POKTportal) Dashboard und Analysen

- [**QuickNode**](https://www.quicknode.com)
  - [Dokumentation](https://www.quicknode.com/docs/)
  - Funktionen
    - Technischer 24/7-Support & Entwickler-Discord-Community
    - Geografisch ausbalanciertes, Multi-Cloud/Metal-Netzwerk mit geringer Latenz
    - Multi-Chain-Unterstützung (Optimism, Arbitrum, Polygon + 11 weitere)
    - Mittlere Ebenen für Geschwindigkeit & Stabilität (Anrufweiterleitung, Cache, Indizierung)
    - Smart-Contract-Überwachung über Webhooks
    - Intuitives Dashboard, Analyse-Suite, RPC-Composer
    - Erweiterte Sicherheitsfunktionen (JWT, Maskierung, Whitelisting)
    - NFT-Daten- und Analyse-API
    - [SOC2-zertifiziert](https://www.quicknode.com/security)
    - Geeignet für Entwickler bis hin zu Unternehmen

- [**Rivet**](https://rivet.cloud/)
  - [Dokumentation](https://rivet.readthedocs.io/en/latest/)
  - Funktionen
    - Kostenlose Tarifoption
    - Skalierung nach Bedarf

- [**SenseiNode**](https://senseinode.com)
  - [Dokumentation](https://docs.senseinode.com/)
  - Funktionen
    - Dedizierte und geteilte Blockchain-Knoten
    - Dashboard
    - Hosting außerhalb von AWS bei mehreren Hosting-Anbietern an verschiedenen Standorten in Lateinamerika
    - Prysm- und Lighthouse-Clients

- [**SettleMint**](https://console.settlemint.com/)
  - [Dokumentation](https://docs.settlemint.com/)
  - Funktionen
    - Kostenlose Testversion
    - Skalierung nach Bedarf
    - GraphQL-Unterstützung
    - RPC- und WSS-Endpunkte
    - Dedizierte vollständige Blockchain-Knoten
    - Bring Your Own Cloud
    - Analysetools
    - Dashboard
    - Preisgestaltung pro Stunde
    - Direkter Support

- [**Tenderly**](https://tenderly.co/web3-gateway)
  - [Dokumentation](https://docs.tenderly.co/web3-gateway/web3-gateway)
  - Funktionen
    - Kostenloser Tarif mit 25 Millionen Tenderly-Einheiten pro Monat
    - Kostenloser Zugriff auf historische Daten
    - Bis zu 8-mal schnellere leseintensive Workloads
    - 100 % konsistenter Lesezugriff
    - JSON-RPC-Endpunkte
    - UI-basierter RPC-Anfrage-Builder und Anfragevorschau
    - Eng integriert mit den Entwicklungs-, Debugging- und Testtools von Tenderly
    - Transaktionssimulationen
    - Nutzungsanalysen und Filterung
    - Einfache Verwaltung von Zugriffsschlüsseln
    - Dedizierter technischer Support per Chat, E-Mail und Discord

- [**Tokenview**](https://services.tokenview.io/)
  - [Dokumentation](https://services.tokenview.io/docs?type=nodeService)
  - Funktionen
    - Technischer 24/7-Support & Entwickler-Telegram-Community
    - Multi-Chain-Unterstützung (Bitcoin, Ethereum, Tron, BNB Smart Chain, Ethereum Classic)
    - Sowohl RPC- als auch WSS-Endpunkte sind offen nutzbar
    - Unbegrenzter Zugriff auf die Archivdaten-API
    - Dashboard mit Request Explorer und Mempool Watcher
    - NFT-Daten-API und Webhook-Benachrichtigung
    - Zahlung in Krypto
    - Externer Support für zusätzliche Verhaltensanforderungen

- [**Watchdata**](https://watchdata.io/)
  - [Dokumentation](https://docs.watchdata.io/)
  - Funktionen
    - Datenzuverlässigkeit
    - Unterbrechungsfreie Verbindung ohne Ausfallzeiten
    - Prozessautomatisierung
    - Kostenlose Tarife
    - Hohe Limits, die für jeden Benutzer geeignet sind
    - Unterstützung für verschiedene Blockchain-Knoten
    - Ressourcenskalierung
    - Hohe Verarbeitungsgeschwindigkeiten

- [**ZMOK**](https://zmok.io/)
  - [Dokumentation](https://docs.zmok.io/)
  - Funktionen
    - Front-Running als Dienstleistung
    - Globaler Transaktions-Mempool mit Such-/Filtermethoden
    - Unbegrenzte Transaktionsgebühr und unendliches Gas für das Senden von Transaktionen
    - Schnellster Abruf des neuen Blocks und Lesen der Blockchain
    - Garantie für den besten Preis pro API-Aufruf

- [**Zeeve**](https://www.zeeve.io/)
  - [Dokumentation](https://www.zeeve.io/docs/)
  - Funktionen
    - No-Code-Automatisierungsplattform auf Unternehmensniveau, die Bereitstellung, Überwachung und Verwaltung von Blockchain-Knoten und Netzwerken bietet
    - 30+ unterstützte Protokolle & Integrationen, und es werden mehr
    - Mehrwertige Web3-Infrastrukturdienste wie dezentralisierte Speicherung, dezentralisierte Identität und Blockchain-Ledger-Daten-APIs für reale Anwendungsfälle
    - 24/7-Support und proaktive Überwachung gewährleisten jederzeit die Gesundheit der Blockchain-Knoten.
    - RPC-Endpunkte bieten authentifizierten Zugriff auf APIs, problemlose Verwaltung mit intuitivem Dashboard und Analysen.
    - Bietet sowohl Managed-Cloud- als auch Bring-Your-Own-Cloud-Optionen zur Auswahl und unterstützt alle großen Cloud-Anbieter wie AWS, Azure, Google Cloud, Digital Ocean und On-Premise.
    - Wir verwenden intelligentes Routing, um jedes Mal den Blockchain-Knoten zu erreichen, der Ihrem Benutzer am nächsten ist


## Weiterführende Literatur {#further-reading}

- [Liste von Ethereum-Blockchain-Knoten-Diensten](https://ethereumnodes.com/)

## Verwandte Themen {#related-topics}

- [Blockchain-Knoten und Anwendungen](/developers/docs/nodes-and-clients/)

## Verwandte Tutorials {#related-tutorials}

- [Erste Schritte mit der Ethereum-Entwicklung unter Verwendung von Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Leitfaden zum Senden von Transaktionen mit Web3 und Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)