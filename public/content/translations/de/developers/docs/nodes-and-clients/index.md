---
title: Knoten und Clients
description: Ein Überblick über Ethereum-Knoten und Client-Software sowie darüber, wie man einen Knoten einrichtet und warum man dies tun sollte.
lang: de
sidebarDepth: 2
---

[Ethereum](/) ist ein verteiltes Netzwerk von Computern (bekannt als Knoten), auf denen Software ausgeführt wird, die Blöcke und Transaktionsdaten verifizieren kann. Die Software muss auf Ihrem Computer ausgeführt werden, um ihn in einen Ethereum-Knoten zu verwandeln. Es sind zwei separate Softwarekomponenten (bekannt als „Clients“) erforderlich, um einen Knoten zu bilden.

## Voraussetzungen {#prerequisites}

Sie sollten das Konzept eines Peer-to-Peer-Netzwerks und die [Grundlagen der EVM](/developers/docs/evm/) verstehen, bevor Sie tiefer eintauchen und Ihre eigene Instanz eines Ethereum-Clients ausführen. Werfen Sie einen Blick auf unsere [Einführung in Ethereum](/developers/docs/intro-to-ethereum/).

Wenn das Thema Knoten für Sie neu ist, empfehlen wir Ihnen, sich zunächst unsere benutzerfreundliche Einführung zum [Betreiben eines Ethereum-Knotens](/run-a-node) anzusehen.

## Was sind Knoten und Clients? {#what-are-nodes-and-clients}

Ein „Knoten“ ist jede Instanz einer Ethereum-Client-Software, die mit anderen Computern verbunden ist, auf denen ebenfalls Ethereum-Software ausgeführt wird, und so ein Netzwerk bildet. Ein Client ist eine Implementierung von Ethereum, die Daten anhand der Protokollregeln verifiziert und das Netzwerk sicher hält. Ein Knoten muss zwei Clients ausführen: einen Konsens-Client und einen Ausführungsclient.

- Der Ausführungsclient (auch bekannt als Execution Engine, EL-Client oder früher Eth1-Client) lauscht auf neue Transaktionen, die im Netzwerk übertragen werden, führt sie in der EVM aus und hält den neuesten Zustand sowie die Datenbank aller aktuellen Ethereum-Daten.
- Der Konsens-Client (auch bekannt als Beacon-Knoten, CL-Client oder früher Eth2-Client) implementiert den Proof-of-Stake-Konsensalgorithmus, der es dem Netzwerk ermöglicht, basierend auf validierten Daten des Ausführungsclients eine Einigung zu erzielen. Es gibt auch eine dritte Softwarekomponente, bekannt als „Validator“, die dem Konsens-Client hinzugefügt werden kann und es einem Knoten ermöglicht, sich an der Sicherung des Netzwerks zu beteiligen.

Diese Clients arbeiten zusammen, um den Kopf der Ethereum-Chain zu verfolgen und es Benutzern zu ermöglichen, mit dem Ethereum-Netzwerk zu interagieren. Das modulare Design, bei dem mehrere Softwarekomponenten zusammenarbeiten, wird als [gekapselte Komplexität](https://vitalik.eth.limo/general/2022/02/28/complexity.html) bezeichnet. Dieser Ansatz erleichterte die reibungslose Ausführung durch den [Merge](/roadmap/merge), macht die Client-Software einfacher zu warten und zu entwickeln und ermöglicht die Wiederverwendung einzelner Clients, beispielsweise im [Layer 2 (L2)-Ökosystem](/layer-2/).

![Coupled execution and consensus clients](./eth1eth2client.png)
Vereinfachtes Diagramm eines gekoppelten Ausführungs- und Konsens-Clients.

### Client-Diversität {#client-diversity}

Sowohl [Ausführungsclients](/developers/docs/nodes-and-clients/#execution-clients) als auch [Konsens-Clients](/developers/docs/nodes-and-clients/#consensus-clients) existieren in einer Vielzahl von Programmiersprachen, die von verschiedenen Teams entwickelt wurden.

Mehrere Client-Implementierungen können das Netzwerk stärken, indem sie seine Abhängigkeit von einer einzigen Codebasis verringern. Das ideale Ziel ist es, Diversität zu erreichen, ohne dass ein Client das Netzwerk dominiert, wodurch ein potenzieller Single Point of Failure eliminiert wird.
Die Vielfalt der Sprachen lädt auch eine breitere Entwickler-Community ein und ermöglicht es ihnen, Integrationen in ihrer bevorzugten Sprache zu erstellen.

Erfahren Sie mehr über [Client-Diversität](/developers/docs/nodes-and-clients/client-diversity/).

Was diese Implementierungen gemeinsam haben, ist, dass sie alle einer einzigen Spezifikation folgen. Spezifikationen schreiben vor, wie das Ethereum-Netzwerk und die Blockchain funktionieren. Jedes technische Detail ist definiert und Spezifikationen sind zu finden als:

- Ursprünglich das [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Ausführungsspezifikationen](https://github.com/ethereum/execution-specs/)
- [Konsensspezifikationen](https://github.com/ethereum/consensus-specs)
- [EIPs](https://eips.ethereum.org/), die in verschiedenen [Netzwerk-Upgrades](/ethereum-forks/) implementiert wurden

### Knoten im Netzwerk verfolgen {#network-overview}

Mehrere Tracker bieten einen Echtzeit-Überblick über die Knoten im Ethereum-Netzwerk. Beachten Sie, dass diese Crawler aufgrund der Natur dezentraler Netzwerke nur eine begrenzte Sicht auf das Netzwerk bieten können und möglicherweise unterschiedliche Ergebnisse melden.

- [Knotenkarte](https://etherscan.io/nodetracker) von Etherscan
- [Ethernodes](https://ethernodes.org/) von Bitfly
- [Nodewatch](https://www.nodewatch.io/) von Chainsafe, crawlt Konsens-Knoten
- [Monitoreth](https://monitoreth.io/) – von MigaLabs, ein verteiltes Netzwerk-Monitoring-Tool
- [Wöchentliche Netzwerk-Gesundheitsberichte](https://probelab.io) – von ProbeLab, unter Verwendung des [Nebula-Crawlers](https://github.com/dennis-tra/nebula) und anderer Tools

## Knotentypen {#node-types}

Wenn Sie [Ihren eigenen Knoten betreiben](/developers/docs/nodes-and-clients/run-a-node/) möchten, sollten Sie verstehen, dass es verschiedene Arten von Knoten gibt, die Daten unterschiedlich verarbeiten. Tatsächlich können Clients drei verschiedene Arten von Knoten ausführen: Light, Full und Archive. Es gibt auch Optionen für verschiedene Synchronisierungsstrategien, die eine schnellere Synchronisierungszeit ermöglichen. Die Synchronisierung bezieht sich darauf, wie schnell die aktuellsten Informationen über den Zustand von Ethereum abgerufen werden können.

### Full Node {#full-node}

Full Nodes führen eine Block-für-Block-Validierung der Blockchain durch, einschließlich des Herunterladens und Verifizierens des Blockkörpers und der Zustandsdaten für jeden Block. Es gibt verschiedene Klassen von Full Nodes – einige beginnen beim Genesis-Block und verifizieren jeden einzelnen Block in der gesamten Geschichte der Blockchain. Andere beginnen ihre Verifizierung bei einem neueren Block, von dem sie darauf vertrauen, dass er gültig ist (z. B. Geths „Snap Sync“). Unabhängig davon, wo die Verifizierung beginnt, behalten Full Nodes nur eine lokale Kopie relativ aktueller Daten (typischerweise die letzten 128 Blöcke), sodass ältere Daten gelöscht werden können, um Speicherplatz zu sparen. Ältere Daten können bei Bedarf neu generiert werden.

- Speichert vollständige Blockchain-Daten (obwohl diese regelmäßig bereinigt werden, sodass ein Full Node nicht alle Zustandsdaten bis zum Genesis-Block speichert)
- Nimmt an der Blockvalidierung teil, verifiziert alle Blöcke und Zustände.
- Alle Zustände können von einem Full Node entweder aus dem lokalen Speicher abgerufen oder aus „Snapshots“ neu generiert werden.
- Bedient das Netzwerk und stellt Daten auf Anfrage bereit.

### Archivknoten {#archive-node}

Archivknoten sind Full Nodes, die jeden Block ab dem Genesis-Block verifizieren und niemals heruntergeladene Daten löschen.

- Speichert alles, was im Full Node aufbewahrt wird, und baut ein Archiv historischer Zustände auf. Dies wird benötigt, wenn Sie beispielsweise einen Kontostand bei Block #4.000.000 abfragen oder einfach und zuverlässig Ihre eigenen Transaktionssätze testen möchten, ohne sie mittels Tracing zu validieren.
- Diese Daten umfassen Terabytes, was Archivknoten für durchschnittliche Benutzer weniger attraktiv macht, aber für Dienste wie Block-Explorer, Wallet-Anbieter und Chain-Analysen nützlich sein kann.

Das Synchronisieren von Clients in einem anderen Modus als dem Archivmodus führt zu bereinigten Blockchain-Daten. Das bedeutet, dass es kein Archiv aller historischen Zustände gibt, der Full Node diese jedoch bei Bedarf erstellen kann.

Erfahren Sie mehr über [Archivknoten](/developers/docs/nodes-and-clients/archive-nodes).

### Light Node {#light-node}

Anstatt jeden Block herunterzuladen, laden Light Nodes nur Block-Header herunter. Diese Header enthalten zusammenfassende Informationen über den Inhalt der Blöcke. Alle anderen Informationen, die der Light Node benötigt, werden von einem Full Node angefordert. Der Light Node kann dann die empfangenen Daten unabhängig anhand der Zustands-Roots in den Block-Headern verifizieren. Light Nodes ermöglichen es Benutzern, am Ethereum-Netzwerk teilzunehmen, ohne die leistungsstarke Hardware oder hohe Bandbreite zu benötigen, die für den Betrieb von Full Nodes erforderlich ist. Letztendlich könnten Light Nodes auf Mobiltelefonen oder eingebetteten Geräten laufen. Die Light Nodes nehmen nicht am Konsens teil (d. h. sie können keine Validatoren sein), aber sie können mit denselben Funktionen und Sicherheitsgarantien wie ein Full Node auf die Ethereum-Blockchain zugreifen.

Light-Clients sind ein Bereich aktiver Entwicklung für Ethereum, und wir erwarten, bald neue Light-Clients für die Konsensschicht und die Ausführungsschicht zu sehen.
Es gibt auch potenzielle Wege, Light-Client-Daten über das [Gossip-Netzwerk](https://www.ethportal.net/) bereitzustellen. Dies ist vorteilhaft, da das Gossip-Netzwerk ein Netzwerk von Light Nodes unterstützen könnte, ohne dass Full Nodes Anfragen bedienen müssen.

Ethereum unterstützt noch keine große Anzahl von Light Nodes, aber die Unterstützung von Light Nodes ist ein Bereich, der sich voraussichtlich in naher Zukunft schnell entwickeln wird. Insbesondere Clients wie [Nimbus](https://nimbus.team/), [Helios](https://github.com/a16z/helios) und [Lodestar](https://lodestar.chainsafe.io/) konzentrieren sich derzeit stark auf Light Nodes.

## Warum sollte ich einen Ethereum-Knoten betreiben? {#why-should-i-run-an-ethereum-node}

Der Betrieb eines Knotens ermöglicht es Ihnen, Ethereum direkt, vertrauenslos und privat zu nutzen und gleichzeitig das Netzwerk zu unterstützen, indem Sie es robuster und dezentraler halten.

### Vorteile für Sie {#benefits-to-you}

Der Betrieb eines eigenen Knotens ermöglicht es Ihnen, Ethereum auf private, autarke und vertrauenslose Weise zu nutzen. Sie müssen dem Netzwerk nicht vertrauen, da Sie die Daten selbst mit Ihrem Client verifizieren können. „Nicht vertrauen, verifizieren“ ist ein beliebtes Blockchain-Mantra.

- Ihr Knoten verifiziert alle Transaktionen und Blöcke selbstständig anhand der Konsensregeln. Das bedeutet, dass Sie sich nicht auf andere Knoten im Netzwerk verlassen oder ihnen vollständig vertrauen müssen.
- Sie können eine Ethereum-Wallet mit Ihrem eigenen Knoten verwenden. Sie können dezentrale Anwendungen (Dapps) sicherer und privater nutzen, da Sie Ihre Adressen und Guthaben nicht an Vermittler weitergeben müssen. Alles kann mit Ihrem eigenen Client überprüft werden. [MetaMask](https://metamask.io), [Frame](https://frame.sh/) und [viele andere Wallets](/wallets/find-wallet/) bieten RPC-Import an, sodass sie Ihren Knoten verwenden können.
- Sie können andere Dienste, die von Daten aus Ethereum abhängen, ausführen und selbst hosten. Dies könnte beispielsweise ein Beacon Chain-Validator, Software wie Layer 2 (L2), Infrastruktur, Block-Explorer, Zahlungsabwickler usw. sein.
- Sie können Ihre eigenen benutzerdefinierten [RPC-Endpunkte](/developers/docs/apis/json-rpc/) bereitstellen. Sie könnten diese Endpunkte sogar öffentlich für die Community anbieten, um ihr zu helfen, große zentralisierte Anbieter zu vermeiden.
- Sie können sich über **Inter-Process Communications (IPC)** mit Ihrem Knoten verbinden oder den Knoten so umschreiben, dass er Ihr Programm als Plugin lädt. Dies gewährt eine geringe Latenz, was sehr hilfreich ist, z. B. wenn Sie viele Daten mit Web3-Bibliotheken verarbeiten oder wenn Sie Ihre Transaktionen so schnell wie möglich ersetzen müssen (d. h. Frontrunning).
- Sie können ETH direkt staken, um das Netzwerk zu sichern und Belohnungen zu verdienen. Siehe [Solo Staking](/staking/solo/) für den Einstieg.

![How you access Ethereum via your application and nodes](./nodes.png)

### Vorteile für das Netzwerk {#network-benefits}

Eine vielfältige Gruppe von Knoten ist wichtig für die Gesundheit, Sicherheit und betriebliche Ausfallsicherheit von Ethereum.

- Full Nodes setzen die Konsensregeln durch, sodass sie nicht dazu verleitet werden können, Blöcke zu akzeptieren, die diese nicht befolgen. Dies bietet zusätzliche Sicherheit im Netzwerk, denn wenn alle Knoten Light Nodes wären, die keine vollständige Verifizierung durchführen, könnten Validatoren das Netzwerk angreifen.
- Im Falle eines Angriffs, der die kryptoökonomischen Verteidigungen von [Proof-of-Stake (PoS)](/developers/docs/consensus-mechanisms/pos/#what-is-pos) überwindet, kann eine soziale Wiederherstellung durchgeführt werden, indem Full Nodes sich entscheiden, der ehrlichen Chain zu folgen.
- Mehr Knoten im Netzwerk führen zu einem vielfältigeren und robusteren Netzwerk, dem ultimativen Ziel der Dezentralisierung, was ein zensurresistentes und zuverlässiges System ermöglicht.
- Full Nodes bieten Zugriff auf Blockchain-Daten für leichtgewichtige Clients, die darauf angewiesen sind. Light Nodes speichern nicht die gesamte Blockchain, sondern verifizieren Daten über die [Zustands-Roots in Block-Headern](/developers/docs/blocks/#block-anatomy). Sie können bei Bedarf weitere Informationen von Full Nodes anfordern.

Wenn Sie einen Full Node betreiben, profitiert das gesamte Ethereum-Netzwerk davon, auch wenn Sie keinen Validator betreiben.

## Einen eigenen Knoten betreiben {#running-your-own-node}

Interessiert daran, Ihren eigenen Ethereum-Client zu betreiben?

Für eine anfängerfreundliche Einführung besuchen Sie unsere Seite [Einen Knoten betreiben](/run-a-node), um mehr zu erfahren.

Wenn Sie eher ein technischer Benutzer sind, tauchen Sie in weitere Details und Optionen ein, wie Sie [Ihren eigenen Knoten einrichten](/developers/docs/nodes-and-clients/run-a-node/).

## Alternativen {#alternatives}

Das Einrichten eines eigenen Knotens kann Sie Zeit und Ressourcen kosten, aber Sie müssen nicht immer Ihre eigene Instanz ausführen. In diesem Fall können Sie einen API-Anbieter von Drittanbietern verwenden. Für einen Überblick über die Nutzung dieser Dienste, sehen Sie sich [Nodes as a Service](/developers/docs/nodes-and-clients/nodes-as-a-service/) an.

Wenn jemand in Ihrer Community einen Ethereum-Knoten mit einer öffentlichen API betreibt, können Sie Ihre Wallets über Custom RPC auf einen Community-Knoten verweisen und mehr Privatsphäre gewinnen als bei einem zufälligen vertrauenswürdigen Drittanbieter.

Andererseits können Sie, wenn Sie einen Client betreiben, diesen mit Ihren Freunden teilen, die ihn möglicherweise benötigen.

## Ausführungsclients {#execution-clients}

Die Ethereum-Community pflegt mehrere Open-Source-Ausführungsclients (früher bekannt als „Eth1-Clients“ oder einfach „Ethereum-Clients“), die von verschiedenen Teams in unterschiedlichen Programmiersprachen entwickelt wurden. Dies macht das Netzwerk stärker und [vielfältiger](/developers/docs/nodes-and-clients/client-diversity/). Das ideale Ziel ist es, Diversität zu erreichen, ohne dass ein Client dominiert, um Single Points of Failure zu reduzieren.

Diese Tabelle fasst die verschiedenen Clients zusammen. Alle bestehen [Client-Tests](https://github.com/ethereum/tests) und werden aktiv gepflegt, um bei Netzwerk-Upgrades auf dem neuesten Stand zu bleiben.

| Client                                                                   | Sprache    | Betriebssysteme       | Netzwerke               | Synchronisierungsstrategien                                | Zustandsbereinigung |
| ------------------------------------------------------------------------ | ---------- | --------------------- | ----------------------- | ---------------------------------------------------------- | ------------------- |
| [Geth](https://geth.ethereum.org/)                                       | Go         | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [Snap](#snap-sync), [Full](#full-sync)                     | Archiv, Bereinigt   |
| [Nethermind](https://www.nethermind.io/)                                 | C#, .NET   | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [Snap](#snap-sync), Fast, [Full](#full-sync)               | Archiv, Bereinigt   |
| [Besu](https://besu.hyperledger.org/en/stable/)                          | Java       | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [Snap](#snap-sync), [Fast](#fast-sync), [Full](#full-sync) | Archiv, Bereinigt   |
| [Erigon](https://github.com/ledgerwatch/erigon)                          | Go         | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [Full](#full-sync)                                         | Archiv, Bereinigt   |
| [Reth](https://reth.rs/)                                                 | Rust       | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [Full](#full-sync)                                         | Archiv, Bereinigt   |
| [EthereumJS](https://github.com/ethereumjs/ethereumjs-monorepo) _(Beta)_ | TypeScript | Linux, Windows, macOS | Sepolia, Hoodi          | [Full](#full-sync)                                         | Bereinigt           |

Weitere Informationen zu unterstützten Netzwerken finden Sie unter [Ethereum-Netzwerke](/developers/docs/networks/).

Jeder Client hat einzigartige Anwendungsfälle und Vorteile, daher sollten Sie einen basierend auf Ihren eigenen Vorlieben auswählen. Diversität ermöglicht es, Implementierungen auf verschiedene Funktionen und Zielgruppen auszurichten. Möglicherweise möchten Sie einen Client basierend auf Funktionen, Support, Programmiersprache oder Lizenzen auswählen.

### Besu {#besu}

Hyperledger Besu ist ein Ethereum-Client auf Unternehmensniveau für öffentliche und erlaubnispflichtige Netzwerke. Er führt alle Funktionen des Ethereum Mainnets aus, von Tracing bis GraphQL, verfügt über umfangreiches Monitoring und wird von ConsenSys unterstützt, sowohl in offenen Community-Kanälen als auch durch kommerzielle SLAs für Unternehmen. Er ist in Java geschrieben und unter Apache 2.0 lizenziert.

Die umfangreiche [Dokumentation](https://besu.hyperledger.org/en/stable/) von Besu führt Sie durch alle Details zu seinen Funktionen und Setups.

### Erigon {#erigon}

Erigon, früher bekannt als Turbo-Geth, begann als Fork von Go Ethereum, der auf Geschwindigkeit und Speicherplatzeffizienz ausgerichtet war. Erigon ist eine komplett neu gestaltete Implementierung von Ethereum, die derzeit in Go geschrieben ist, aber Implementierungen in anderen Sprachen befinden sich in der Entwicklung. Das Ziel von Erigon ist es, eine schnellere, modularere und optimiertere Implementierung von Ethereum bereitzustellen. Er kann eine vollständige Archivknoten-Synchronisierung mit etwa 2 TB Speicherplatz in weniger als 3 Tagen durchführen.

### Go Ethereum {#geth}

Go Ethereum (kurz Geth) ist eine der ursprünglichen Implementierungen des Ethereum-Protokolls. Derzeit ist es der am weitesten verbreitete Client mit der größten Benutzerbasis und einer Vielzahl von Tools für Benutzer und Entwickler. Er ist in Go geschrieben, vollständig Open Source und unter der GNU LGPL v3 lizenziert.

Erfahren Sie mehr über Geth in seiner [Dokumentation](https://geth.ethereum.org/docs).

### Nethermind {#nethermind}

Nethermind ist eine Ethereum-Implementierung, die mit dem C# .NET-Tech-Stack erstellt wurde, unter LGPL-3.0 lizenziert ist und auf allen wichtigen Plattformen einschließlich ARM läuft. Er bietet großartige Leistung mit:

- einer optimierten virtuellen Maschine
- Zustandszugriff
- Netzwerkfunktionen und umfangreichen Features wie Prometheus/Grafana-Dashboards, Seq-Enterprise-Logging-Unterstützung, JSON-RPC-Tracing und Analyse-Plugins.

Nethermind verfügt außerdem über eine [detaillierte Dokumentation](https://docs.nethermind.io), starken Entwickler-Support, eine Online-Community und 24/7-Support für Premium-Benutzer.

### Reth {#reth}

Reth (kurz für Rust Ethereum) ist eine Ethereum-Full-Node-Implementierung, die darauf ausgerichtet ist, benutzerfreundlich, hochgradig modular, schnell und effizient zu sein. Reth wurde ursprünglich von Paradigm entwickelt und vorangetrieben und ist unter den Apache- und MIT-Lizenzen lizenziert.

Reth ist produktionsbereit und eignet sich für den Einsatz in geschäftskritischen Umgebungen wie Staking oder Diensten mit hoher Verfügbarkeit. Er schneidet in Anwendungsfällen gut ab, in denen hohe Leistung mit großen Margen erforderlich ist, wie z. B. RPC, MEV, Indizierung, Simulationen und P2P-Aktivitäten.

Erfahren Sie mehr, indem Sie sich das [Reth Book](https://reth.rs/) oder das [Reth GitHub-Repo](https://github.com/paradigmxyz/reth?tab=readme-ov-file#reth) ansehen.

### In Entwicklung {#execution-in-development}

Diese Clients befinden sich noch in einem frühen Entwicklungsstadium und werden noch nicht für den produktiven Einsatz empfohlen.

#### EthereumJS {#ethereumjs}

Der EthereumJS-Ausführungsclient (EthereumJS) ist in TypeScript geschrieben und besteht aus einer Reihe von Paketen, einschließlich grundlegender Ethereum-Primitive, die durch die Klassen Block, Transaction und Merkle-Patricia Trie repräsentiert werden, sowie Kern-Client-Komponenten, einschließlich einer Implementierung der Ethereum Virtual Machine (EVM), einer Blockchain-Klasse und dem devp2p-Netzwerk-Stack.

Erfahren Sie mehr darüber, indem Sie die [Dokumentation](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master) lesen.

## Konsens-Clients {#consensus-clients}

Es gibt mehrere Konsens-Clients (früher bekannt als „Eth2“-Clients), um die [Konsens-Upgrades](/roadmap/beacon-chain/) zu unterstützen. Sie sind für die gesamte konsensbezogene Logik verantwortlich, einschließlich des Fork-Choice-Algorithmus, der Verarbeitung von Attestierungen und der Verwaltung von [Proof-of-Stake (PoS)](/developers/docs/consensus-mechanisms/pos)-Belohnungen und -Strafen.

| Client                                                        | Sprache    | Betriebssysteme       | Netzwerke                                               |
| ------------------------------------------------------------- | ---------- | --------------------- | ------------------------------------------------------- |
| [Lighthouse](https://lighthouse.sigmaprime.io/)               | Rust       | Linux, Windows, macOS | Beacon Chain, Hoodi, Pyrmont, Sepolia und mehr          |
| [Lodestar](https://lodestar.chainsafe.io/)                    | TypeScript | Linux, Windows, macOS | Beacon Chain, Hoodi, Sepolia und mehr                   |
| [Nimbus](https://nimbus.team/)                                | Nim        | Linux, Windows, macOS | Beacon Chain, Hoodi, Sepolia und mehr                   |
| [Prysm](https://prysm.offchainlabs.com/docs/)                 | Go         | Linux, Windows, macOS | Beacon Chain, Gnosis, Hoodi, Pyrmont, Sepolia und mehr  |
| [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) | Java       | Linux, Windows, macOS | Beacon Chain, Gnosis, Hoodi, Sepolia und mehr           |
| [Grandine](https://docs.grandine.io/)                         | Rust       | Linux, Windows, macOS | Beacon Chain, Hoodi, Sepolia und mehr                   |

### Lighthouse {#lighthouse}

Lighthouse ist eine Konsens-Client-Implementierung, die in Rust unter der Apache-2.0-Lizenz geschrieben wurde. Er wird von Sigma Prime gepflegt und ist seit dem Genesis-Block der Beacon Chain stabil und produktionsbereit. Verschiedene Unternehmen, Staking-Pools und Einzelpersonen verlassen sich auf ihn. Er zielt darauf ab, sicher, leistungsstark und interoperabel in einer Vielzahl von Umgebungen zu sein, von Desktop-PCs bis hin zu anspruchsvollen automatisierten Bereitstellungen.

Die Dokumentation finden Sie im [Lighthouse Book](https://lighthouse-book.sigmaprime.io/)

### Lodestar {#lodestar}

Lodestar ist eine produktionsbereite Konsens-Client-Implementierung, die in TypeScript unter der LGPL-3.0-Lizenz geschrieben wurde. Er wird von ChainSafe Systems gepflegt und ist der neueste der Konsens-Clients für Solo-Staker, Entwickler und Forscher. Lodestar besteht aus einem Beacon-Knoten und einem Validator-Client, die auf JavaScript-Implementierungen von Ethereum-Protokollen basieren. Lodestar zielt darauf ab, die Benutzerfreundlichkeit von Ethereum mit Light-Clients zu verbessern, die Zugänglichkeit für eine größere Gruppe von Entwicklern zu erweitern und weiter zur Diversität des Ökosystems beizutragen.

Weitere Informationen finden Sie auf der [Lodestar-Website](https://lodestar.chainsafe.io/)

### Nimbus {#nimbus}

Nimbus ist eine Konsens-Client-Implementierung, die in Nim unter der Apache-2.0-Lizenz geschrieben wurde. Er ist ein produktionsbereiter Client, der von Solo-Stakern und Staking-Pools verwendet wird. Nimbus ist auf Ressourceneffizienz ausgelegt, sodass er problemlos auf ressourcenbeschränkten Geräten und in der Unternehmensinfrastruktur ausgeführt werden kann, ohne Kompromisse bei der Stabilität oder der Belohnungsleistung einzugehen. Ein geringerer Ressourcenbedarf bedeutet, dass der Client eine größere Sicherheitsmarge hat, wenn das Netzwerk unter Stress steht.

Erfahren Sie mehr in den [Nimbus-Dokumenten](https://nimbus.guide/)

### Prysm {#prysm}

Prysm ist ein voll ausgestatteter Open-Source-Konsens-Client, der in Go unter der GPL-3.0-Lizenz geschrieben wurde. Er verfügt über eine optionale Web-App-Benutzeroberfläche und priorisiert Benutzererfahrung, Dokumentation und Konfigurierbarkeit sowohl für Stake-at-Home- als auch für institutionelle Benutzer.

Besuchen Sie die [Prysm-Dokumentation](https://prysm.offchainlabs.com/docs/), um mehr zu erfahren.

### Teku {#teku}

Teku ist einer der ursprünglichen Beacon Chain-Genesis-Clients. Neben den üblichen Zielen (Sicherheit, Robustheit, Stabilität, Benutzerfreundlichkeit, Leistung) zielt Teku speziell darauf ab, alle verschiedenen Konsens-Client-Standards vollständig zu erfüllen.

Teku bietet sehr flexible Bereitstellungsoptionen. Der Beacon-Knoten und der Validator-Client können zusammen als ein einziger Prozess ausgeführt werden, was für Solo-Staker äußerst praktisch ist, oder die Knoten können für anspruchsvolle Staking-Operationen separat ausgeführt werden. Darüber hinaus ist Teku vollständig interoperabel mit [Web3Signer](https://github.com/ConsenSys/web3signer/) für die Sicherheit von Signierschlüsseln und den Slashing-Schutz.

Teku ist in Java geschrieben und unter Apache 2.0 lizenziert. Er wird vom Protocols-Team bei ConsenSys entwickelt, das auch für Besu und Web3Signer verantwortlich ist. Erfahren Sie mehr in der [Teku-Dokumentation](https://docs.teku.consensys.net/en/latest/).

### Grandine {#grandine}

Grandine ist eine Konsens-Client-Implementierung, die in Rust unter der GPL-3.0-Lizenz geschrieben wurde. Er wird vom Grandine Core Team gepflegt und ist schnell, leistungsstark und leichtgewichtig. Er eignet sich für eine breite Palette von Stakern, von Solo-Stakern, die auf ressourcenarmen Geräten wie dem Raspberry Pi laufen, bis hin zu großen institutionellen Stakern, die Zehntausende von Validatoren betreiben.

Die Dokumentation finden Sie im [Grandine Book](https://docs.grandine.io/)

## Synchronisierungsmodi {#sync-modes}

Um aktuelle Daten im Netzwerk zu verfolgen und zu verifizieren, muss sich der Ethereum-Client mit dem neuesten Netzwerkzustand synchronisieren. Dies geschieht durch das Herunterladen von Daten von Peers, die kryptografische Überprüfung ihrer Integrität und den Aufbau einer lokalen Blockchain-Datenbank.

Synchronisierungsmodi stellen verschiedene Ansätze für diesen Prozess mit unterschiedlichen Kompromissen dar. Clients variieren auch in ihrer Implementierung von Synchronisierungsalgorithmen. Beziehen Sie sich immer auf die offizielle Dokumentation Ihres gewählten Clients für spezifische Implementierungsdetails.

### Synchronisierungsmodi der Ausführungsschicht {#execution-layer-sync-modes}

Die Ausführungsschicht kann in verschiedenen Modi ausgeführt werden, um unterschiedlichen Anwendungsfällen gerecht zu werden, von der erneuten Ausführung des Weltzustands der Blockchain bis hin zur reinen Synchronisierung mit der Spitze der Chain von einem vertrauenswürdigen Checkpoint aus.

#### Full Sync {#full-sync}

Ein Full Sync lädt alle Blöcke (einschließlich Header und Blockkörper) herunter und generiert den Zustand der Blockchain inkrementell neu, indem jeder Block ab dem Genesis-Block ausgeführt wird.

- Minimiert das Vertrauen und bietet die höchste Sicherheit durch die Verifizierung jeder Transaktion.
- Mit einer zunehmenden Anzahl von Transaktionen kann es Tage bis Wochen dauern, alle Transaktionen zu verarbeiten.

[Archivknoten](#archive-node) führen einen Full Sync durch, um eine vollständige Historie der Zustandsänderungen aufzubauen (und beizubehalten), die durch jede Transaktion in jedem Block vorgenommen wurden.

#### Fast Sync {#fast-sync}

Wie ein Full Sync lädt ein Fast Sync alle Blöcke (einschließlich Header, Transaktionen und Belege) herunter. Anstatt jedoch die historischen Transaktionen neu zu verarbeiten, verlässt sich ein Fast Sync auf die Belege, bis er einen aktuellen Kopf erreicht, woraufhin er zum Importieren und Verarbeiten von Blöcken wechselt, um einen Full Node bereitzustellen.

- Fast-Sync-Strategie.
- Reduziert den Verarbeitungsbedarf zugunsten der Bandbreitennutzung.

#### Snap Sync {#snap-sync}

Snap Syncs verifizieren die Chain ebenfalls Block für Block. Anstatt jedoch beim Genesis-Block zu beginnen, startet ein Snap Sync bei einem neueren „vertrauenswürdigen“ Checkpoint, von dem bekannt ist, dass er Teil der wahren Blockchain ist. Der Knoten speichert regelmäßige Checkpoints und löscht Daten, die älter als ein bestimmtes Alter sind. Diese Snapshots werden verwendet, um Zustandsdaten bei Bedarf neu zu generieren, anstatt sie für immer zu speichern.

- Schnellste Synchronisierungsstrategie, derzeit Standard im Ethereum Mainnet.
- Spart viel Speicherplatz und Netzwerkbandbreite, ohne die Sicherheit zu beeinträchtigen.

[Mehr zu Snap Sync](https://github.com/ethereum/devp2p/blob/master/caps/snap.md).

#### Light Sync {#light-sync}

Der Light-Client-Modus lädt alle Block-Header und Blockdaten herunter und verifiziert einige zufällig. Synchronisiert nur die Spitze der Chain vom vertrauenswürdigen Checkpoint aus.

- Ruft nur den neuesten Zustand ab und verlässt sich dabei auf das Vertrauen in die Entwickler und den Konsensmechanismus.
- Client ist in wenigen Minuten mit dem aktuellen Netzwerkzustand einsatzbereit.

**Hinweis:** Light Sync funktioniert noch nicht mit Proof-of-Stake-Ethereum – neue Versionen von Light Sync sollten bald erscheinen!

[Mehr zu Light-Clients](/developers/docs/nodes-and-clients/light-clients/)

### Synchronisierungsmodi der Konsensschicht {#consensus-layer-sync-modes}

#### Optimistische Synchronisierung {#optimistic-sync}

Die optimistische Synchronisierung ist eine Post-Merge-Synchronisierungsstrategie, die als Opt-in und abwärtskompatibel konzipiert ist und es Ausführungsknoten ermöglicht, sich über etablierte Methoden zu synchronisieren. Die Execution Engine kann Beacon-Blöcke _optimistisch_ importieren, ohne sie vollständig zu verifizieren, den neuesten Kopf finden und dann mit den oben genannten Methoden mit der Synchronisierung der Chain beginnen. Nachdem der Ausführungsclient aufgeholt hat, informiert er den Konsens-Client über die Gültigkeit der Transaktionen in der Beacon Chain.

[Mehr zur optimistischen Synchronisierung](https://github.com/ethereum/consensus-specs/blob/master/sync/optimistic.md)

#### Checkpoint-Synchronisierung {#checkpoint-sync}

Eine Checkpoint-Synchronisierung, auch bekannt als Synchronisierung mit schwacher Subjektivität, schafft eine überlegene Benutzererfahrung für die Synchronisierung eines Beacon-Knotens. Sie basiert auf [Annahmen der schwachen Subjektivität](/developers/docs/consensus-mechanisms/pos/weak-subjectivity/), die es ermöglichen, die Beacon Chain von einem kürzlichen Checkpoint mit schwacher Subjektivität anstelle des Genesis-Blocks zu synchronisieren. Checkpoint-Synchronisierungen machen die anfängliche Synchronisierungszeit deutlich schneller, bei ähnlichen Vertrauensannahmen wie bei der Synchronisierung ab dem [Genesis-Block](/glossary/#genesis-block).

In der Praxis bedeutet dies, dass sich Ihr Knoten mit einem Remote-Dienst verbindet, um aktuelle endgültige Zustände herunterzuladen, und von diesem Punkt an mit der Verifizierung der Daten fortfährt. Dem Dritten, der die Daten bereitstellt, wird vertraut, und er sollte sorgfältig ausgewählt werden.

Mehr zur [Checkpoint-Synchronisierung](https://notes.ethereum.org/@djrtwo/ws-sync-in-practice)

## Weiterführende Literatur {#further-reading}

- [Ethereum 101 – Teil 2 – Knoten verstehen](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _– Wil Barnes, 13. Februar 2019_
- [Ethereum Full Nodes betreiben: Ein Leitfaden für die kaum Motivierten](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7. November 2019_

## Verwandte Themen {#related-topics}

- [Blöcke](/developers/docs/blocks/)
- [Netzwerke](/developers/docs/networks/)

## Verwandte Tutorials {#related-tutorials}

- [Verwandeln Sie Ihren Raspberry Pi 4 in einen Validator-Knoten, indem Sie einfach die MicroSD-Karte flashen – Installationsanleitung](/developers/tutorials/run-node-raspberry-pi/) _– Flashen Sie Ihren Raspberry Pi 4, schließen Sie ein Ethernet-Kabel an, verbinden Sie die SSD-Festplatte und schalten Sie das Gerät ein, um den Raspberry Pi 4 in einen vollständigen Ethereum-Knoten zu verwandeln, auf dem die Ausführungsschicht (Mainnet) und/oder die Konsensschicht (Beacon Chain / Validator) ausgeführt wird._