---
title: Errichte deinen eigenen Ethereum-Node
description: Allgemeine Einführung in den Betrieb einer eigenen Ethereum-Client-Instanz.
lang: de
sidebarDepth: 2
---

Der Betrieb einer eigener Node bietet dir verschiedene Vorteile, eröffnet neue Möglichkeiten und trägt zur Unterstützung des Ökosystems bei. Diese Seite führt dich durch die Einrichtung deines eigenen Nodes und die Teilnahme an der Validierung von Ethereum-Transaktionen.

## Voraussetzungen {#prerequisites}

Du solltest verstehen, was ein Ethereum-Node ist und warum du möglicherweise einen Client betreiben solltest. Dies wird in [Nodes und Clients](/developers/docs/nodes-and-clients/) behandelt.

Wenn das Thema neu für dich ist oder du nach einem weniger technischen Weg suchst, empfehlen wir dir, zunächst unsere benutzerfreundliche Einführung zum [Betrieb eines Ethereum-Nodes](/run-a-node) zu lesen.

## Herangehensweise bestimmen {#choosing-approach}

Der erste Schritt beim Einrichten deines Nodes besteht in der Wahl der Herangehensweise. Du musst den Client (die Software), die Umgebung und die Parameter auswählen, mit denen du beginnen möchtest. >Hier sind alle verfügbaren [Mainnet-Clients](/developers/docs/nodes-and-clients/#advantages-of-different-implementations).

#### Client-Einstellungen {#client-settings}

Client-Implementierungen ermöglichen unterschiedliche Synchronisierungsmodi und verschiedene andere Optionen. [Synchronisierungsmodi](/developers/docs/nodes-and-clients/#sync-modes) stellen verschiedene Methoden zum Herunterladen und Validieren von Blockchain-Daten dar. Bevor du den Node startest, solltest du entscheiden, welchen Netzwerk- und Synchronisierungsmodus du verwenden möchtest. Das Wichtigste sind der Speicherplatz und die Synchronisierungszeit, die der Client benötigt.

Alle Funktionen und Optionen sind in der Dokumentation des Clients zu finden. Es können verschiedene Client-Konfigurationen eingestellt werden, indem der Client mit den entsprechenden Flags ausgeführt wird. Weitere Informationen zu Flags findest du auf [EthHub](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/#client-settings) oder in der Client-Dokumentation. Zu Testzwecken kannst du einen Client in einem der Testnetze betreiben. [Übersicht der unterstützten Netzwerke](/developers/docs/nodes-and-clients/#execution-clients)

### Umgebung und Hardware {#environment-and-hardware}

#### Lokal oder Cloud {#local-vs-cloud}

Ethereum-Clients können auf gewöhnlichen Computern laufen und benötigen keine spezielle Hardware, wie zum Beispiel beim Mining. Daher hast du je nach Bedarf verschiedene Optionen für den Einsatz. Zur Vereinfachung stellen wir uns vor, dass ein Node sowohl auf einem lokalen physischen Computer als auch auf einem Cloud-Server läuft:

- Cloud
  - Anbieter bieten eine hohe Serververfügbarkeit, statische öffentliche IP-Adressen
  - Ein dedizierter oder virtueller Server kann bequemer sein als ein eigener
  - Die Gegenleistung ist das Vertrauen in eine dritte Partei – den Serveranbieter
  - Aufgrund der erforderlichen Speichergröße für einen vollständigen Node kann der Preis für einen gemieteten Server hoch werden
- Eigene Hardware
  - Vertrauenslosere und souveränere Vorgehensweise
  - Einmalige Investition
  - Option zum Kauf vorkonfigurierter Maschinen
  - Du musst die Maschine physisch vorbereiten, warten und ggf. Fehler beheben

Beide Optionen haben verschiedene Vorteile, die oben zusammengefasst sind. Wenn du eine Cloudlösung suchst, gibt es neben vielen traditionellen Cloud-Computing-Anbietern auch Dienste, die sich auf die Bereitstellung von Nodes konzentrieren. Beispiel:

- [QuikNode](https://www.quiknode.io/)
- [Blockdaemon](https://blockdaemon.com)
- [LunaNode](https://www.lunanode.com/)
- [Alchemy](https://www.alchemy.com/)

#### Hardware {#hardware}

Ein zensurresistentes, dezentrales Netz sollte sich jedoch nicht auf Cloudanbieter verlassen. Es ist gesünder für das Ökosystem, wenn du deinen eigenen Node auf einer Hardware betreibst. Die einfachsten Optionen sind vorkonfigurierte Geräte, z. B.:

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/)

Überprüfe die minimalen und empfohlenen [Festplattenspeicherplatzanforderungen für jeden Client und Synchronisierungsmodus](/developers/docs/nodes-and-clients/#requirements). Im Allgemeinen sollte eine bescheidene Rechenleistung ausreichen. Das Problem ist in der Regel die Geschwindigkeit der Datenträger. Während der anfänglichen Synchronisierung führen Ethereum-Clients eine Menge Lese- und Schreibvorgänge durch. Daher wird SSD dringend empfohlen. Ein Client ist möglicherweise nicht einmal [in der Lage, den aktuellen Stand auf der Festplatte zu synchronisieren](https://github.com/ethereum/go-ethereum/issues/16796#issuecomment-391649278), und bleibt ein paar Blöcke hinter dem Mainnet zurück. Du kannst die meisten Clients auf einem [Einplatinencomputer mit ARM](/developers/docs/nodes-and-clients/#ethereum-on-a-single-board-computer/) betreiben. Du kannst auch das [Ethbian](https://ethbian.org/index.html)-Betriebssystem für Raspberry Pi 4 verwenden. Damit können Sie [einen Client durch das Flashen der SD-Karte](/developers/tutorials/run-node-raspberry-pi/) starten. Je nach Software und Hardware können die anfängliche Synchronisierungszeit und die Speicheranforderungen variieren. Achte darauf, [die Synchronisierungszeiten und Speicheranforderungen zu überprüfen](/developers/docs/nodes-and-clients/#recommended-specifications). Vergewissere dich auch, dass deine Internetverbindung nicht durch eine [Bandbreitenbeschränkung](https://wikipedia.org/wiki/Data_cap) begrenzt ist. Es wird empfohlen, eine nicht gebührenpflichtige Verbindung zu verwenden, da die anfängliche Synchronisierung und die an das Netzwerk übertragenen Daten dein Limit überschreiten könnten.

#### Das Betriebssystem {#operating-system}

Alle Clients unterstützen die wichtigsten Betriebssysteme: Linux, MacOS, Windows. Das bedeutet, dass deine Nodes auf normalen Desktop- oder Server-Rechnern mit dem Betriebssystem (OS), welches dir am besten passt, betrieben werden können. Stelle sicher, dass dein Betriebssystem auf dem neuesten Stand ist, um mögliche Probleme und Sicherheitslücken zu vermeiden.

## Hochfahren des Nodes {#spinning-up-node}

### Abrufen der Client-Software {#getting-the-client}

Lade zunächst deine bevorzugte [Client-Software](/developers/docs/nodes-and-clients/#execution-clients) herunter.

Du kannst einfach eine ausführbare Anwendung oder ein Installationspaket herunterladen, das für dein Betriebssystem und deine Architektur geeignet ist. Überprüfe immer die Signaturen und Prüfsummen der heruntergeladenen Pakete. Einige Clients bieten auch Repositorys zur einfacheren Installation und Aktualisierung an. Wenn du es bevorzugst, kannst du diese aus dem Quellcode erstellen. Alle Clients sind quelloffen, so dass du sie mit dem richtigen Compiler aus dem Quellcode erstellen kannst.

Ausführbare Binärdateien für stabile Mainnet-Client-Implementierungen können von den jeweiligen Release-Seiten heruntergeladen werden:

- [Geth](https://geth.ethereum.org/downloads/)
- [OpenEthereum](https://github.com/openethereum/openethereum/releases)
- [Nethermind](https://downloads.nethermind.io/)
- [Besu](https://besu.hyperledger.org/en/stable/)
- [Erigon](https://github.com/ledgerwatch/erigon)

**Beachte, dass OpenEthereum [veraltet](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) ist und nicht mehr gewartet wird.** Verwende es mit Vorsicht und wechsle lieber zu einer anderen Client-Implementierung.

### Starten des Clients {#starting-the-client}

Bevor du die Ethereum-Client-Software startest, überprüfe noch einmal, ob deine Umgebung bereit ist. Vergewissere dich z. B.

- dass unter Berücksichtigung des gewählten Netzwerk- und Synchronisationsmodus genügend Speicherplatz vorhanden ist,
- dass Speicher und CPU nicht durch andere Programme angehalten werden,
- dass das Betriebssystem auf die neueste Version aktualisiert wird,
- dass das System die richtige Uhrzeit und das richtige Datum hat,
- dass dein Router und deine Firewall Verbindungen an abhörenden Ports akzeptieren. Standardmäßig verwenden Ethereum-Clients einen Listener(TCP)-Port und einen UDP-Port, beide standardmäßig 30303.

Führe deinen Client zunächst in einem Testnetz aus, um sicherzustellen, dass alles korrekt funktioniert. [Die Ausführung eines Geth light node](/developers/tutorials/run-light-node-geth/) sollte helfen. Du musst alle Client-Einstellungen, die nicht standardmäßig sind, zu Beginn angeben. Du kannst Flags oder die Konfigurationsdatei verwenden, um deine bevorzugte Konfiguration zu deklarieren. Die Einzelheiten findest du in der Dokumentation deines Clients. Der Client führt seine Kernfunktionen aus, wählt die Endpunkte und beginnt mit der Suche nach Peers. Nach erfolgreicher Erkennung von Peers beginnt der Client mit der Synchronisierung. Die aktuellen Blockchain-Daten sind verfügbar, sobald der Client erfolgreich mit dem aktuellen Zustand synchronisiert wurde.

### Nutzung des Clients {#using-the-client}

Clients bieten RPC-API-Endpunkte, mit denen du den Client steuerst und auf verschiedene Weise mit dem Ethereum-Netzwerk interagieren kannst:

- manueller Aufruf mit einem geeigneten Protokoll (z. B. mit `curl`)
- Anhängen einer bereitgestellten Konsole (z. B. `geth attach`)
- ihre Implementierung in Anwendungen

Verschiedene Clients haben unterschiedliche Implementierungen der RPC-Endpunkte. Es gibt jedoch einen Standard-JSON-RPC, den du mit jedem Client verwenden kannst. Für einen Überblick, [lies die JSON-RPC-Dokumente](https://eth.wiki/json-rpc/API). Anwendungen, die Informationen aus dem Ethereum-Netzwerk benötigen, können diesen RPC verwenden. Mit der beliebten Wallet MetaMask kannst du zum Beispiel [eine lokale Blockchain-Instanz betreiben und dich mit ihr verbinden](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node).

#### Erreichen von RPC {#reaching-rpc}

Der Standard-Port von JSON-RPC ist `8545`, aber du kannst die Ports der lokalen Endpunkte in der Konfigurationsdatei ändern. Standardmäßig ist die RPC-Schnittstelle nur über den localhost deines Computers erreichbar. Um sie aus der Ferne zugänglich zu machen, kannst du sie der Öffentlichkeit präsentieren, indem du die Adresse auf `0.0.0.0` änderst. Dadurch ist sie über lokale und öffentliche IP-Adressen zugänglich. In den meisten Fällen musst du auch eine Portweiterleitung auf deinem Router einrichten.

Du solltest dies jedoch mit Vorsicht tun, da dadurch jeder im Internet deinen Node kontrollieren kann. Böswillige Akteure könnten auf deinen Node zugreifen, um dein System zum Absturz zu bringen oder dein Geld zu stehlen, wenn du deinen Client als Geldbörse verwendest.

Eine Möglichkeit, dies zu umgehen, besteht darin, zu verhindern, dass potenziell schädliche RPC-Methoden geändert werden können. Beispielsweise kannst du mit `geth` veränderbare Methoden mit einem Flag deklarieren: `--http.api web3,eth,txpool`.

Du kannst den Zugriff auf deine RPC-Schnittstelle auch hosten, indem du einen Webserverdienst wie Nginx auf die lokale Adresse und den Port deines Clients verweisen lässt.

Die datenschutzfreundlichste und einfachste Art, einen öffentlich erreichbaren Endpunkt einzurichten, ist das Hosten auf deinem eigenen [Tor](https://www.torproject.org/)-Onion-Dienst. Auf diese Weise kannst du den RPC außerhalb deines lokalen Netzes erreichen, ohne eine statische öffentliche IP-Adresse oder geöffnete Ports. Du kannst das folgendermaßen tun:

- Installiere `tor`.
- Bearbeite die `torrc`-Konfiguration, um den versteckten Dienst mit der RPC-Adresse und dem Port deines Clients zu aktivieren.
- Starte den `tor`-Dienst neu.

Sobald du Tor neu gestartet hast, erhältst du versteckte Dienstschlüssel und einen Hostnamen in deinem gewünschten Verzeichnis. Von diesem Zeitpunkt an wird dein RPC unter einem `.onion`-Hostnamen erreichbar sein.

### Betreiben des Nodes {#operating-the-node}

Du solltest deinen Node regelmäßig überwachen, um sicherzustellen, dass er ordnungsgemäß funktioniert. Möglicherweise musst du gelegentlich Wartungsarbeiten durchführen.

#### Den Node online halten {#keeping-node-online}

Dein Node muss nicht ununterbrochen online sein, aber du solltest ihn so oft wie möglich online halten, um ihn mit dem Netzwerk zu synchronisieren. Du könntest ihn ausschalten, um ihn neu zu starten, aber bedenke, dass

- das Herunterfahren einige Minuten dauern kann, wenn der aktuelle Zustand noch auf die Festplatte geschrieben wird,
- erzwungene Abschaltungen die Datenbank beschädigen können,
- Dein Client wird nicht mehr mit dem Netzwerk synchronisiert und muss neu synchronisiert werden, wenn du ihn neu startest.

_Dies gilt nicht für Konsensschicht-Validierungs-Nodes._ Wenn du deinen Node offline schaltest, wirkt sich dies auf alle von ihm abhängigen Dienste aus. Wenn du einen Node für _Sicherungszwecke_ betreibst, solltest du versuchen, die Ausfallzeiten so gering wie möglich zu halten.

#### Erstellung eines Client-Dienstes {#creating-client-service}

Ziehe in Erwägung, einen Dienst zu erstellen, der deinen Client beim Start automatisch ausführt. Auf Linux-Servern wäre es beispielsweise eine gute Praxis, einen Dienst zu erstellen, der den Client mit der richtigen Konfiguration und unter einem Benutzer mit begrenzten Rechten ausführt und automatisch neu startet.

#### Aktualisieren des Clients {#updating-client}

Du müsstest deine Client-Software mit den neuesten Sicherheitspatches, Funktionen und [EIPs](/eips/) auf dem neuesten Stand halten. Besonders vor [hard forks](/history/) solltest du sicherstellen, dass du die richtige Client-Version verwendest.

Jede Client-Implementierung hat eine von Menschen lesbare Versionszeichenfolge, die im Peer-to-Peer-Protokoll verwendet wird, aber auch über die Befehlszeile zugänglich ist. Anhand dieses Versionsstrings können die Benutzer überprüfen, ob sie die richtige Version verwenden. Außerdem ermöglicht er es Blockexplorern und anderen Analysewerkzeugen eine quantitative Analyse der Verteilung bestimmter Clients im Netz. Weitere Informationen zu den Versionsstrings finden Sie in der jeweiligen Client-Dokumentation.

#### Durchführung zusätzlicher Dienste {#running-additional-services}

Wenn du deinen eigenen Node betreibst, kannst du Dienste nutzen, die einen direkten Zugang zum Ethereum-Client-RPC erfordern. Dies sind Dienste, die auf Ethereum aufbauen, wie [Layer-2-Lösungen](/developers/docs/scaling/#layer-2-scaling), [Konsens-Clients](/upgrades/get-involved/#clients) und andere Ethereum-Infrastruktur.

#### Überwachung des Nodes {#monitoring-the-node}

"Um deine Node richtig zu überwachen, solltest du Metriken sammeln. Clients stellen Metrik-Endpunkte bereit, damit du umfassende Daten über deinen Node erhalten kannst. Verwende Tools wie [InfluxDB](https://www.influxdata.com/get-influxdb/) oder [Prometheus](https://prometheus.io/) um Datenbanken zu erstellen, die du in Software wie [Grafana](https://grafana.com/) in Visualisierungen und Diagramme umwandeln kannst. Es gibt viele Setups für die Verwendung dieser Software und verschiedene Grafana-Dashboards, mit denen du deine Nodes und das Netzwerk als Ganzes visualisieren kannst. Behalte im Rahmen der Überwachung auch die Leistung deiner Maschine im Auge. Während der ersten Synchronisierung deiner Node kann die Client-Software sehr viel CPU und RAM beanspruchen. Zusätzlich zu Grafana kannst du die Tools deines Betriebssystems wie `htop` oder `uptime` verwenden, um dies zu tun.

## Weiterführende Informationen {#further-reading}

- [Analyzing the hardware requirements to be an Ethereum full validated node](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24 September 2018_
- [Running Ethereum Full Nodes: A Guide for the Barely Motivated](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 November 2019_
- [Running an Ethereum Node](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/) _– ETHHub, updated often_
- [Running a Hyperledger Besu Node on the Ethereum Mainnet: Benefits, Requirements, and Setup](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7 May 2020_
- [Deploying Nethermind Ethereum Client with Monitoring Stack](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth, 8 July 2020_

## Verwandte Themen {#related-topics}

- [Nodes und Clients](/developers/docs/nodes-and-clients/)
- [Blöcke](/developers/docs/blocks/)
- [Netzwerke](/developers/docs/networks/)
