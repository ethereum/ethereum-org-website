---
title: Aktive Forschungsbereiche von Ethereum
description: "Erkunden Sie verschiedene Bereiche der offenen Forschung und erfahren Sie, wie Sie sich einbringen können."
lang: de
---

Eine der Hauptstärken von Ethereum ist, dass eine aktive Forschungs- und Entwicklungs-Community es ständig verbessert. Viele enthusiastische, fähige Menschen weltweit würden sich gerne den noch offenen Problemen bei Ethereum widmen, aber es ist nicht immer einfach herauszufinden, welche das sind. Diese Seite skizziert die wichtigsten aktiven Forschungsbereiche als groben Leitfaden für die neuesten Entwicklungen bei Ethereum.

## Wie die Ethereum-Forschung funktioniert {#how-ethereum-research-works}

Die Ethereum-Forschung ist offen und transparent. Die Kultur besteht darin, Forschungswerkzeuge und -ergebnisse so offen und interaktiv wie möglich zu gestalten, beispielsweise durch ausführbare Notebooks. Die Ethereum-Forschung entwickelt sich schnell weiter. Neue Erkenntnisse werden offen in Foren wie [ethresear.ch](https://ethresear.ch/) gepostet und diskutiert, anstatt die Community erst nach mehreren Runden von Peer-Reviews durch traditionelle Publikationen zu erreichen. Die Ethereum Foundation veröffentlicht auch, was sie priorisiert und warum, sodass jeder sehen kann, welche Probleme derzeit als dringend angesehen werden.

## Allgemeine Forschungsressourcen {#general-research-resources}

Unabhängig vom spezifischen Thema gibt es eine Fülle von Informationen zur Ethereum-Forschung auf [ethresear.ch](https://ethresear.ch) und im [Eth R&D Discord-Kanal](https://discord.gg/qGpsxSA). Dies sind die primären Orte, an denen Ethereum-Forscher die neuesten Ideen und Entwicklungsmöglichkeiten diskutieren.

Für einen Überblick darüber, wohin sich das Protokoll entwickelt, beginnen Sie mit der [Ethereum-Roadmap](/roadmap/), lesen Sie dann das [Protocol Priorities Update for 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026) der Ethereum Foundation und die [Protokoll-Cluster-Updates](https://blog.ethereum.org/2026/05/11/protocol-update-may-26), die über die entsprechenden Fortschritte berichten. [Ethereum Protocol Studies](https://blog.ethereum.org/2026/02/17/ethereum-protocol-studies-26) ist ein strukturierter Einstiegspunkt für Personen, die am Protokoll selbst arbeiten möchten.

## Finanzierungsquellen {#sources-of-funding}

Sie können sich an der Ethereum-Forschung beteiligen und dafür bezahlt werden. [Die Ethereum Foundation](/foundation/) finanziert Forschung und Öffentliche Güter durch ihr [Ecosystem Support Program](https://esp.ethereum.foundation/applicants), das Wunschlisten und Aufforderungen zur Einreichung von Vorschlägen (Requests for Proposals) veröffentlicht, die Probleme beschreiben, die gelöst werden sollen. Informationen zu aktiven und kommenden Finanzierungsmöglichkeiten finden Sie auf [der Ethereum-Grants-Seite](/community/grants/).

## Protokollforschung {#protocol-research}

Die Protokollforschung befasst sich mit der Basisschicht von Ethereum: dem Regelwerk, das definiert, wie Knoten sich verbinden, kommunizieren, Ethereum-Daten austauschen und speichern und zu einem Konsens über den Zustand der Blockchain gelangen. Ihre beiden langjährigen Kategorien sind Konsens und Ausführung, und mehrere Forschungsthemen überschneiden sich mittlerweile in beiden Bereichen.

### Konsens {#consensus}

Die Konsensforschung befasst sich mit [Ethereums Proof-of-Stake-Mechanismus](/developers/docs/consensus-mechanisms/pos/): der Sicherheit der Fork-Choice-Regel und des Finality-Gadgets, der Kryptoökonomie des Stakings, dem Peer-to-Peer-Netzwerk, das Blöcke, Attestierungen und Blob-Daten überträgt, sowie der Kryptographie, mit der Validatoren signieren. Einige beispielhafte Forschungsthemen im Bereich Konsens sind:

- Identifizierung und Behebung von Schwachstellen;
- Quantifizierung der kryptoökonomischen Sicherheit;
- Reduzierung der Zeit, die ein Block benötigt, um Endgültigkeit zu erreichen;
- und Verbesserung der Effizienz, Sicherheit und Überwachung der Peer-to-Peer-Vernetzung zwischen Konsens-Clients.

Ein Großteil dieser Arbeit hat sich vom Papier zur Spezifikation verlagert. Data Availability Sampling wurde im [Fusaka](/roadmap/fusaka/)-Upgrade ausgeliefert, Änderungen daran, wie Blöcke erstellt werden und wie die Aufnahme von Transaktionen garantiert wird, sind für kommende Upgrades spezifiziert, und ein längerfristiges Redesign, bekannt als Lean Consensus, untersucht eine schnellere Endgültigkeit zusammen mit Post-Quanten-Signaturen.

#### Hintergrundlektüre {#background-reading}

- [Einführung in Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/)
- [Single-Slot-Finalität](/roadmap/single-slot-finality/)
- [Casper FFG-Paper](https://arxiv.org/abs/1710.09437)
- [Gasper-Paper](https://arxiv.org/abs/2003.03052)
- [Lean Ethereum](https://blog.ethereum.org/2025/07/31/lean-ethereum)

#### Aktuelle Forschung {#recent-research}

- [Ethresear.ch Konsens](https://ethresear.ch/c/consensus/29)
- [Verfügbarkeits-/Endgültigkeits-Dilemma](https://arxiv.org/abs/2009.04987)
- [3-Slot-Finalität: Bei SSF geht es nicht um einen "einzelnen" Slot](https://ethresear.ch/t/3-slot-finality-ssf-is-not-about-single-slot/20927)

### Ausführung {#execution}

Die Ausführungsschicht befasst sich mit der Ausführung von Transaktionen, dem Betrieb der [Ethereum Virtual Machine (EVM)](/developers/docs/evm/) und der Generierung von Ausführungs-Payloads zur Weitergabe an die Konsensschicht. Die Forschung teilt sich hier in zwei Stränge: den Zustand günstig zu halten und zu beweisen, und den Transaktionsdurchsatz zu erhöhen, ohne den Betreibern von Knoten mehr Kosten aufzubürden. Es gibt viele aktive Forschungsbereiche, darunter:

- Neupreisgestaltung der Gaskosten von Operationen, die Zustand erzeugen;
- Historienverfall für Daten, die Knoten nicht mehr bereitstellen müssen;
- Zugriffslisten auf Blockebene, die es ermöglichen, Transaktionen parallel zu validieren;
- mehrdimensionale Gebührenmärkte, die Zustand, Daten und Berechnung separat bepreisen;
- und der Beweis der Ausführung von L1-Blöcken mit einer zkEVM.

#### Hintergrundlektüre {#background-reading-1}

- [Einführung in die EVM](/developers/docs/evm/)
- [Ethresear.ch Ausführungsschicht](https://ethresear.ch/c/execution-layer-research/37)
- [Spezifikationen der Ethereum-Ausführungsschicht](https://github.com/ethereum/execution-specs)
- [Datenbankoptimierungen](https://github.com/erigontech/erigon/blob/main/docs/programmers_guide/db_faq.md)

#### Aktuelle Forschung {#recent-research-1}

- [EIP-7928: Zugriffslisten auf Blockebene](https://eips.ethereum.org/EIPS/eip-7928)
- [EIP-8037: Erhöhung der Gaskosten für die Zustandserstellung](https://eips.ethereum.org/EIPS/eip-8037)
- [EIP-7999: Einheitlicher mehrdimensionaler Gebührenmarkt](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7642: eth/69, Historienverfall und einfachere Belege](https://eips.ethereum.org/EIPS/eip-7642)
- [Auslieferung einer L1-zkEVM: Echtzeit-Beweise](https://blog.ethereum.org/2025/07/10/realtime-proving)

### Zensurresistenz und Block-Erstellung {#censorship-resistance-and-block-building}

Die meisten Ethereum-Blöcke werden derzeit von einer kleinen Anzahl spezialisierter Ersteller (Builder) zusammengestellt, was die Macht konzentriert, zu entscheiden, welche Transaktionen aufgenommen werden. Die Forschung in diesem Bereich umfasst die Integration des Builder-Marktes in das Protokoll selbst, sodass die Rollen des Vorschlagens (Proposer) und Erstellens (Builder) eines Blocks durch Konsensregeln anstatt durch Software außerhalb des Protokolls getrennt werden (Proposer-Builder-Trennung (PBS)), und Validatoren eine Möglichkeit erhalten, die Aufnahme von Transaktionen zu erzwingen, die Builder auslassen.

#### Hintergrundlektüre {#background-reading-21}

- [Proposer-Builder-Trennung (PBS)](/roadmap/pbs/)
- [Single Secret Leader Election (SSLE)](/roadmap/secret-leader-election/)

#### Aktuelle Forschung {#recent-research-21}

- [EIP-7732: Verankerte Proposer-Builder-Trennung](https://eips.ethereum.org/EIPS/eip-7732)
- [EIP-7805: Durch Fork-Choice erzwungene Inklusionslisten](https://eips.ethereum.org/EIPS/eip-7805)
- [Erhöhung der Zensurresistenz von Transaktionen unter Proposer-Builder-Trennung](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Zustandswachstum und Zustandslosigkeit {#state-growth-and-statelessness}

Jeder Full Node speichert den Zustand von Ethereum, sodass die Rate, mit der dieser Zustand wächst, eine Untergrenze für die Kosten seines Betriebs festlegt. Kurzfristig konzentriert sich die Forschung auf die Neupreisgestaltung der Operationen, die Zustand erzeugen, und auf den Historienverfall für Daten, die Knoten nicht mehr aufbewahren müssen. Längerfristig ist geplant, Ethereums hexären Merkle-Patricia-Trie durch einen Binärbaum zu ersetzen, der viel kleinere Beweise erzeugt, und sich in Richtung Zustandslosigkeit zu bewegen, sodass ein Knoten Blöcke verifizieren kann, ohne den gesamten Zustand zu halten. Frühere Arbeiten in diesem Bereich gingen von Verkle-Bäumen aus; der aktuelle Vorschlag ist ein einheitlicher Binärbaum, der den für diese frühere Arbeitslinie spezifizierten Zeugen-Gasplan (Witness Gas Schedule) übernimmt.

#### Hintergrundlektüre {#background-reading-22}

- [Zustandslosigkeit und Zustandsablauf](/roadmap/statelessness/)
- [Ethereum Stateless Book](https://stateless.fyi/)

#### Aktuelle Forschung {#recent-research-22}

- [EIP-7864: Ethereum-Zustand unter Verwendung eines einheitlichen Binärbaums](https://eips.ethereum.org/EIPS/eip-7864)
- [EIP-4762: Änderungen der Gaskosten für Zustandslosigkeit](https://eips.ethereum.org/EIPS/eip-4762)
- [Warum ein dezentraler Zustand für Ethereum wichtig ist](https://ethresear.ch/t/why-decentralized-state-is-important-for-ethereum/25622)

### Post-Quanten-Kryptographie {#post-quantum-cryptography}

Ethereums Validator-Signaturen und ein Großteil seiner Anwendungsschicht basieren auf Kryptographie mit elliptischen Kurven (Elliptic Curve Cryptography), die ein ausreichend leistungsfähiger Quantencomputer knacken würde. Ethereum quantenresistent zu machen bedeutet, diese Signaturen durch Hash-basierte oder Gitter-basierte Alternativen zu ersetzen, die Signaturaggregation für eine große Validator-Menge effizient genug zu halten und bestehenden Konten einen Migrationspfad zu bieten. Die Ethereum Foundation betreibt ein dediziertes Post-Quanten-Team, und dies ist eines der Programme mit dem längsten Horizont auf der Roadmap.

#### Hintergrundlektüre {#background-reading-23}

- [Quantenresistenz](/roadmap/security/quantum-resistance/)
- [Post-Quanten-Ethereum](https://pq.ethereum.org/)

#### Aktuelle Forschung {#recent-research-23}

- [Lean Ethereum](https://blog.ethereum.org/2025/07/31/lean-ethereum)
- [Ethresear.ch Kryptographie](https://ethresear.ch/c/cryptography/28)
- [Lean Ethereum-Implementierungen](https://github.com/leanEthereum)

## Client-Entwicklung {#client-development}

Ethereum-Clients sind Implementierungen des Ethereum-Protokolls. Die Client-Entwicklung setzt die Ergebnisse der Protokollforschung in die Realität um, indem sie diese in diese Clients einbaut. Die Client-Entwicklung umfasst die Aktualisierung der Client-Spezifikationen sowie die Erstellung spezifischer Implementierungen.

Ein Ethereum-Knoten muss zwei Softwarekomponenten ausführen:

1. einen Konsens-Client, um den Kopf der Blockchain zu verfolgen, Blöcke zu verbreiten (Gossip) und die Konsenslogik zu handhaben
2. einen Ausführungsclient, um die Ethereum Virtual Machine zu unterstützen und Transaktionen sowie Smart Contracts auszuführen

Neben diesen beiden werden neue Klassen von Clients als Prototypen entwickelt, darunter Clients, die die Ausführung von L1-Blöcken beweisen, und Lean-Konsens-Clients, die um Post-Quanten-Signaturen herum aufgebaut sind.

Weitere Details zu Knoten und Clients sowie eine Liste aller aktuellen Client-Implementierungen finden Sie auf der [Knoten- und Client-Seite](/developers/docs/nodes-and-clients/). Eine Historie aller Ethereum-Upgrades finden Sie auch auf der [Historien-Seite](/ethereum-forks/).

### Ausführungsclients {#execution-clients}

- [Spezifikation des Ausführungsclients](https://github.com/ethereum/execution-specs)
- [Spezifikation der Ausführungs-API](https://github.com/ethereum/execution-apis)

### Konsens-Clients {#consensus-clients}

- [Spezifikation des Konsens-Clients](https://github.com/ethereum/consensus-specs)
- [Spezifikation der Beacon-API](https://ethereum.github.io/beacon-APIs/)

### zkEVM-Clients {#zkevm-clients}

- [zkEVM](/roadmap/zkevm/)
- [Ethproofs](https://ethproofs.org/)
- [Auslieferung einer L1-zkEVM: die Sicherheitsgrundlagen](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

## Skalierung und Leistung {#scaling-and-performance}

Die Skalierung von Ethereum ist ein großer Schwerpunkt für Ethereum-Forscher und verläuft zweigleisig: Erhöhung des Transaktionsdurchsatzes von Layer 1 selbst und Verlagerung der Ausführung auf Rollups, die ihre Daten auf Ethereum veröffentlichen. Aktuelle Arbeiten umfassen die Erhöhung des Block-Gaslimits, die Neupreisgestaltung des Zustandswachstums, die Erweiterung der Blob-Kapazität für Rollup-Daten und die Reduzierung dessen, was ein Knoten speichern und verifizieren muss. Einführende Informationen zur Skalierung von Ethereum finden Sie auf unserer [Skalierungsseite](/developers/docs/scaling/) und in der [Skalierungs-Roadmap](/roadmap/scaling/).

### Layer 2 {#layer-2}

Es gibt mittlerweile mehrere Layer-2-Protokolle, die Ethereum skalieren, indem sie verschiedene Techniken zur Bündelung von Transaktionen und zu deren Absicherung auf Ethereum Layer 1 verwenden. Die offene Forschung umfasst die Reduzierung der Latenz und der Kosten für Beweise, die Verkürzung der Zeit, die eine Transaktion benötigt, um vertrauenslose Endgültigkeit zu erreichen, und die Bereitstellung einer einzigen kohärenten Benutzererfahrung über viele Rollups hinweg.

#### Hintergrundlektüre {#background-reading-2}

- [Einführung in Layer 2](/layer-2/)
- [L2BEAT: Skalierungszusammenfassung](https://l2beat.com/scaling/summary)
- [Eine Rollup-zentrierte Ethereum-Roadmap](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)

#### Aktuelle Forschung {#recent-research-2}

- [Ethresear.ch Layer 2](https://ethresear.ch/c/layer-2/32)
- [L2BEAT: Onchain-Kosten](https://l2beat.com/scaling/costs)
- [Bauen auf Ethereum im Jahr 2026: Was sich geändert hat](/latest/building-on-ethereum-in-2026/)

### Interoperabilität {#interoperability}

Benutzer und Vermögenswerte sind über Ethereum Layer 1 und viele Layer 2s verteilt, und das Forschungsproblem besteht darin, sie kettenübergreifend bewegen und agieren zu lassen, ohne einem Vermittler vertrauen zu müssen. Die Arbeit hier umfasst Intent-basierte Transfers, standardisierte kettenübergreifende Adressierung und Namensgebung, allgemeine Nachrichtenübermittlung (Message Passing) und Chain-Abstraktion auf Wallet-Ebene. Dies ersetzt ein Modell, bei dem verwahrende Brücken (Custodial Bridges) die Vermögenswerte hielten. Brücken waren in der Vergangenheit eine der größten Verlustquellen im Ökosystem, weshalb die Sicherheit jedes kettenübergreifenden Mechanismus ein zentrales Anliegen bleibt.

#### Hintergrundlektüre {#background-reading-3}

- [Einführung in Blockchain-Brücken](/bridges/)
- [Ethereum wieder wie eine einzige Chain wirken lassen](https://blog.ethereum.org/2025/11/18/eil)
- [Open Intents Framework](https://openintents.xyz/)
- [Validierung von Brücken](https://stonecoldpat.github.io/images/validatingbridges.pdf)

#### Aktuelle Forschung {#recent-research-3}

- [ERC-7683: Kettenübergreifende Intents](https://eips.ethereum.org/EIPS/eip-7683)
- [ERC-7930: Interoperable Adressen](https://eips.ethereum.org/EIPS/eip-7930)
- [ERC-7828: Interoperable Namen](https://eips.ethereum.org/EIPS/eip-7828)

### Datenverfügbarkeit und Blob-Skalierung {#data-availability-and-blob-scaling}

Rollups veröffentlichen ihre Daten auf Ethereum in Blobs, und die Skalierung dieser Datenschicht ist ein eigenständiges Forschungsproblem, getrennt von der Skalierung der Ausführung. Ethereum verwendet nun Data Availability Sampling (DAS), sodass Validatoren überprüfen können, ob Blob-Daten veröffentlicht wurden, indem sie Teile davon stichprobenartig prüfen, anstatt alles herunterzuladen. Die Blob-Kapazität wird schrittweise durch dedizierte Forks nur für Blob-Parameter erhöht. Offene Fragen sind unter anderem, wie weit das Sampling getrieben werden kann, wie die Bandbreitenanforderungen für Personen, die von zu Hause aus Staking betreiben, überschaubar gehalten werden können und wie die Blob-Preisgestaltung auf die Nachfrage reagieren sollte.

#### Hintergrundlektüre {#background-reading-4}

- [PeerDAS](/roadmap/fusaka/peerdas/)
- [Fusaka-Upgrade](/roadmap/fusaka/)
- [Danksharding](/roadmap/danksharding/)
- [Datenverfügbarkeit](/developers/docs/data-availability/)
- [EIP-4844: Shard-Blob-Transaktionen](https://eips.ethereum.org/EIPS/eip-4844)
- [Notizen zu Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)

#### Aktuelle Forschung {#recent-research-4}

- [EIP-7594: PeerDAS](https://eips.ethereum.org/EIPS/eip-7594)
- [EIP-7892: Hardforks nur für Blob-Parameter](https://eips.ethereum.org/EIPS/eip-7892)
- [Ethresear.ch Sharding](https://ethresear.ch/c/sharding/6)

### Hardware {#hardware}

Das [Betreiben von Knoten](/developers/docs/nodes-and-clients/run-a-node/) auf bescheidener Hardware ist grundlegend, um Ethereum dezentral zu halten. Daher muss jede Erhöhung des Transaktionsdurchsatzes gegen die Kosten für einen Knotenbetreiber abgewogen werden. Da das Block-Gaslimit steigt und weitere Erhöhungen geplant sind, umfasst die aktive Forschung das Zustandswachstum und dessen Preisgestaltung, die Synchronisierungs- und Datenbankleistung bei einem größeren Zustand, die durch Historienverfall möglichen Speicherplatzeinsparungen und schließlich die Zustandslosigkeit.

#### Hintergrundlektüre {#background-reading-5}

- [Starten Sie Ihren eigenen Ethereum-Knoten](/developers/docs/nodes-and-clients/run-a-node/)
- [Zustandslosigkeit und Zustandsablauf](/roadmap/statelessness/)
- [Ethereum auf ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Aktuelle Forschung {#recent-research-5}

- [Skalierung von Ethereum: Der Weg zu einem höheren Gaslimit und darüber hinaus](https://ethpandaops.io/posts/gaslimit-scaling/)
- [EIP-8261: Gaslimit-Zeitplan](https://eips.ethereum.org/EIPS/eip-8261)
- [EIP-8037: Erhöhung der Gaskosten für die Zustandserstellung](https://eips.ethereum.org/EIPS/eip-8037)

## Sicherheit {#security}

Sicherheit ist ein weites Feld, das Spam- und Betrugsprävention, Wallet-Sicherheit, Hardware-Sicherheit, kryptoökonomische Sicherheit, Zensurresistenz, Post-Quanten-Bereitschaft, Bug-Hunting sowie das Testen und die Verifizierung von Anwendungen und Client-Software umfassen kann. Ethereums [Sicherheits-Roadmap](/roadmap/security/) deckt die Arbeit auf Protokollebene ab.

### Kryptographie & ZKP {#cryptography--zkp}

Zero-Knowledge-Beweise (ZKP) und Kryptographie sind entscheidend, um Privatsphäre und Sicherheit in Ethereum und seine Anwendungen zu integrieren. Das Erstellen von Zero-Knowledge-Beweisen hat sich von der Forschung in die Produktionsinfrastruktur verlagert: Prover, die echte Ethereum-Blöcke beweisen, werden nun öffentlich auf Latenz, Kosten und Stichhaltigkeit (Soundness) getestet. Die offenen Probleme haben sich entsprechend verschoben, hin zum Beweisen von L1-Blöcken, das schnell genug ist, um in Echtzeit stattzufinden, zur strengen Berücksichtigung der Sicherheit der verwendeten Beweissysteme und zur Vorbereitung auf die Post-Quanten-Kryptographie.

#### Hintergrundlektüre {#background-reading-6}

- [zkEVM](/roadmap/zkevm/)
- [Privatsphäre](/roadmap/privacy/)
- [Zero Knowledge Podcast](https://zeroknowledge.fm/)

#### Aktuelle Forschung {#recent-research-6}

- [Ethresear.ch ZK](https://ethresear.ch/c/zk-s-nt-arks/13)
- [Ethresear.ch Kryptographie](https://ethresear.ch/c/cryptography/28)
- [Stichhaltigkeits-Rechner (Soundness Calculator) für Hash-basierte zkEVM-Beweissysteme](https://github.com/ethereum/soundcalc)
- [Auslieferung einer L1-zkEVM: die Sicherheitsgrundlagen](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

### Wallets {#wallets}

Ethereum-Wallets können Browser-Erweiterungen, Desktop- und mobile Apps oder Smart Contracts auf Ethereum sein. Kontoabstraktion ist nicht länger experimentell: ERC-4337 bietet Smart Accounts ohne Protokolländerungen, und EIP-7702 ermöglicht es einem gewöhnlichen Konto, Code festzulegen, sodass Transaktionsbündelung, Gas-Sponsoring und soziale Wiederherstellung mit der Adresse funktionieren, die ein Benutzer bereits hat. Die offene Forschung konzentriert sich nun auf native Kontoabstraktion im Protokoll selbst, auf modulare und überprüfbare Kontoarchitekturen sowie auf Schlüsselverwaltung und -wiederherstellung, die normale Menschen sicher bedienen können.

#### Hintergrundlektüre {#background-reading-7}

- [Einführung in Wallets](/wallets/)
- [Einführung in die Wallet-Sicherheit](/security/)
- [Kontoabstraktion](/roadmap/account-abstraction/)
- [EIP-7702](/roadmap/pectra/7702/)
- [Ethresear.ch Sicherheit](https://ethresear.ch/c/security/25)

#### Aktuelle Forschung {#recent-research-7}

- [EIP-8141: Frame-Transaktion](https://eips.ethereum.org/EIPS/eip-8141)
- [ERC-5792: Wallet Call API](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-6963: Multi Injected Provider Discovery](https://eips.ethereum.org/EIPS/eip-6963)
- [Validierungsfokussierte Smart-Contract-Wallets](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)

## Community, Bildung und Öffentlichkeitsarbeit {#community-education-and-outreach}

Das Onboarding neuer Benutzer bei Ethereum erfordert neue Bildungsressourcen und Ansätze für die Öffentlichkeitsarbeit. Dies kann Blogbeiträge und Artikel, Bücher, Podcasts, Memes, Lehrmaterialien, Veranstaltungen und alles andere umfassen, was Communities aufbaut, Neueinsteiger willkommen heißt und Menschen über Ethereum aufklärt.

### Design und UX {#design-and-ux}

Um mehr Menschen für Ethereum zu gewinnen (Onboarding), muss das Ökosystem sein Design und seine Benutzererfahrung (UX) verbessern. Dies erfordert von Designern und Produktexperten, die Funktionsweise von Wallets und Apps neu zu überdenken, und es bedeutet zunehmend, gegen bereits existierende Standards zu entwerfen: gebündelte Wallet-Aufrufe, Gas-Sponsoring, Konten, die wiederhergestellt werden können, und menschenlesbare Adressen, die die Chain enthalten, zu der sie gehören. Es gibt vergleichsweise wenige kanonische Orte für Web3-UX-Forschung, sodass veröffentlichte Studien und Designrichtlinien tendenziell verstreut sind.

#### Hintergrundlektüre {#background-reading-8}

- [Design und UX im Web3](/developers/docs/design-and-ux/)
- [Ethereum User Experience Roadmap](/roadmap/user-experience/)
- [Web3 Design Playbook](https://learnweb3.design/)
- [Web3 UX Design Handbook](https://web3ux.design/)

#### Aktuelle Forschung {#recent-research-8}

- [Ethresear.ch UX/UI](https://ethresear.ch/c/ui-ux/24)
- [ERC-5792: Wallet Call API](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-7828: Interoperable Namen](https://eips.ethereum.org/EIPS/eip-7828)

### Ökonomie {#economics}

Die Wirtschaftsforschung bei Ethereum verfolgt im Wesentlichen zwei Ansätze: die Validierung der Sicherheit von Mechanismen, die auf wirtschaftlichen Anreizen beruhen ("Mikroökonomie"), und die Analyse der Wertströme zwischen Protokollen, Anwendungen und Benutzern ("Makroökonomie"). Es gibt komplexe kryptoökonomische Faktoren in Bezug auf Ethereums nativen Vermögenswert (Ether) und die darauf aufgebauten Token (zum Beispiel NFTs und ERC-20-Token).

#### Hintergrundlektüre {#background-reading-9}

- [Robust Incentives Group](https://rig.ethereum.org/)
- [Ethereum Economics Masterclass und Wirtschaftsmodell](https://github.com/CADLabs/ethereum-economic-model)

#### Aktuelle Forschung {#recent-research-9}

- [Ethresear.ch Ökonomie](https://ethresear.ch/c/economics/16)
- [Gleichgewicht des zirkulierenden Angebots](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [Quantifizierung von MEV: Wie dunkel ist der Wald?](https://arxiv.org/abs/2101.05511)

### Blockspace und Gebührenmärkte {#blockspace-fee-markets}

Blockspace-Märkte regeln die Aufnahme von Endbenutzer-Transaktionen, entweder direkt auf Ethereum (Layer 1) oder auf überbrückten Netzwerken, z. B. Rollups (Layer 2). Auf Ethereum werden Transaktionen an den Gebührenmarkt übermittelt, der als EIP-1559 im Protokoll implementiert ist, was die Chain vor Spam schützt und Überlastungen bepreist. Auf beiden Schichten können Transaktionen Externalitäten erzeugen, bekannt als Maximal Extractable Value (MEV), die neue Marktstrukturen hervorrufen, um diese Externalitäten zu erfassen oder zu verwalten. Aktuelle Arbeiten erweitern dies auf die gleichzeitige Bepreisung mehrerer Ressourcen, da Zustand, Daten und Berechnung unabhängig voneinander überlastet werden, sowie auf die Änderung der Frage, wer Blöcke zusammenstellt und zu welchen Bedingungen.

#### Hintergrundlektüre {#background-reading-10}

- [Design des Transaktionsgebührenmechanismus für die Ethereum-Blockchain: Eine ökonomische Analyse von EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [Simulationen von EIP-1559 (Robust Incentives Group)](https://ethereum.github.io/abm1559)
- [Rollup-Ökonomie aus ersten Prinzipien](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Frontrunning, Transaktionsumordnung und Konsensinstabilität in dezentralen Börsen](https://arxiv.org/abs/1904.05234)

#### Aktuelle Forschung {#recent-research-10}

- [EIP-7999: Einheitlicher mehrdimensionaler Gebührenmarkt](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7928: Zugriffslisten auf Blockebene](https://eips.ethereum.org/EIPS/eip-7928)
- [Domänenübergreifendes MEV](https://arxiv.org/abs/2112.01472)

### Proof-of-Stake-Anreize {#proof-of-stake-incentives}

Validatoren verwenden Ethereums nativen Vermögenswert (Ether) als Sicherheit gegen unehrliches Verhalten. Die Kryptoökonomie dahinter bestimmt die Sicherheit des Netzwerks. Raffinierte Validatoren könnten in der Lage sein, die Nuancen der Anreizschicht auszunutzen, um explizite Angriffe zu starten. Seit dem Pectra-Upgrade können Validatoren auch ein viel größeres effektives Guthaben halten und darauf verdienen sowie mehrere Validatoren zu einem konsolidieren, was die Ökonomie ihres Betriebs verändert.

#### Hintergrundlektüre {#background-reading-11}

- [Maximales effektives Guthaben (MaxEB)](/roadmap/pectra/maxeb/)
- [Ethereum Economics Masterclass und Wirtschaftsmodell](https://github.com/CADLabs/ethereum-economic-model)
- [Simulationen von PoS-Anreizen (Robust Incentives Group)](https://ethereum.github.io/beaconrunner/)

#### Aktuelle Forschung {#recent-research-11}

- [Robust Incentives Group](https://rig.ethereum.org/)
- [Drei Angriffe auf PoS-Ethereum](https://arxiv.org/abs/2110.10086)

### Liquid Staking und Derivate {#liquid-staking-and-derivatives}

Liquid Staking ermöglicht es Benutzern mit weniger als 32 ETH, Staking-Renditen zu erhalten, indem sie Ether gegen einen Token tauschen, der gestakten Ether repräsentiert und in DeFi verwendet werden kann. Die Anreize und Marktdynamiken im Zusammenhang mit Liquid Staking werden jedoch noch erforscht, ebenso wie dessen Auswirkungen auf die Sicherheit von Ethereum (z. B. Zentralisierungsrisiken).

#### Hintergrundlektüre {#background-reading-12}

- [Ethresear.ch Liquid Staking](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: Der Weg zum vertrauenslosen Ethereum-Staking](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)

#### Aktuelle Forschung {#recent-research-12}

- [Die Risiken von Liquid-Staking-Derivaten](https://notes.ethereum.org/@djrtwo/risks-of-lsd)
- [Umgang mit Abhebungen von Lido](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)

## Testen {#testing}

### Client- und Netzwerktests {#client-and-network-testing}

Ethereums Spezifikationen sind ausführbar, und die daraus generierten Test-Fixtures sind das, womit Client-Teams ihre Implementierungen abgleichen. Daneben lassen gemeinsame Testumgebungen (Test Harnesses) Clients gegeneinander und gegen absichtlich feindliche Netzwerkbedingungen antreten, und öffentliche Testnetze erproben Upgrades, bevor sie das Mainnet erreichen. Die Verbesserung dieser Infrastruktur gehört zu den wirkungsvollsten Arbeiten, die es gibt, denn so werden Fehler abgefangen, bevor sie die Benutzer erreichen.

#### Hintergrundlektüre {#background-reading-24}

- [Spezifikationen der Ethereum-Ausführungsschicht](https://github.com/ethereum/execution-specs)
- [Spezifikation des Konsens-Clients](https://github.com/ethereum/consensus-specs)

#### Aktuelle Forschung {#recent-research-24}

- [hive, eine End-to-End-Client-Testumgebung](https://github.com/ethereum/hive)
- [Assertoor, ein Testnetz-Testwerkzeug](https://github.com/ethpandaops/assertoor)

### Formale Verifikation {#formal-verification}

Formale Verifikation verwendet maschinell geprüfte mathematische Beweise, um festzustellen, dass sich eine Spezifikation oder eine Implementierung wie beabsichtigt verhält. Bei Ethereum umfasst dies den Beweis, dass EVM-Implementierungen einer formalen Semantik entsprechen, den Beweis der Stichhaltigkeit der Schaltkreise und Beweissysteme, auf die sich Zero-Knowledge-Prover stützen, und die Verifizierung der zugrunde liegenden kryptographischen Primitive. Weitere Forschung kann diese Beweise stärken und sie auf weitere Teile des Stacks ausdehnen.

#### Hintergrundlektüre {#background-reading-13}

- [Verifizierte zkEVMs](https://verified-zkevm.org/)
- [Formale Verifikation (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Aktuelle Forschung {#recent-research-13}

- [Projektübersicht Verifizierte zkEVM](https://github.com/Verified-zkEVM/Overview)
- [KEVM: Semantik der EVM in K](https://github.com/runtimeverification/evm-semantics)
- [Formale Verifikation des Einzahlungsvertrags](https://github.com/runtimeverification/deposit-contract-verification)

## Data Science und Analytik {#data-science-and-analytics}

Es besteht Bedarf an mehr Datenanalyse-Tools und Dashboards, die detaillierte Informationen über die Aktivität auf Ethereum und den Zustand des Netzwerks liefern. Ein Großteil der zugrunde liegenden Daten ist öffentlich und abfragbar, sodass die Lücke meist in der Analyse und Präsentation und nicht im Zugang besteht.

### Hintergrundlektüre {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [Client-Diversitäts-Dashboard](https://clientdiversity.org/)
- [Spezifikation der Ethereum JSON-RPC-Ausführungs-API](https://ethereum.github.io/execution-apis/)

#### Aktuelle Forschung {#recent-research-14}

- [Datenanalyse der Robust Incentives Group](https://rig.ethereum.org/)
- [ethPandaOps Open Data](https://ethpandaops.io/data/)
- [L2BEAT: Skalierungszusammenfassung](https://l2beat.com/scaling/summary)

## Apps und Tooling {#apps-and-tooling}

Die Anwendungsschicht unterstützt ein vielfältiges Ökosystem von Programmen, die Transaktionen auf der Basisschicht von Ethereum abwickeln. Entwicklungsteams finden ständig neue Wege, Ethereum zu nutzen, um zusammensetzbare, erlaubnisfreie und zensurresistente Versionen wichtiger Web2-Apps zu erstellen oder völlig neue Web3-native Konzepte zu entwickeln. Gleichzeitig wird neues Tooling entwickelt, das die Erstellung von Dezentralen Anwendungen (Dapps) auf Ethereum weniger komplex macht.

### DeFi {#defi}

Dezentralisierte Finanzen (DeFi) sind eine der primären Anwendungsklassen, die auf Ethereum aufbauen. DeFi zielt darauf ab, zusammensetzbare "Geld-Legos" zu schaffen, die es Benutzern ermöglichen, Krypto-Assets mithilfe von Smart Contracts zu speichern, zu transferieren, zu verleihen, zu leihen und zu investieren. DeFi ist ein schnelllebiger Bereich, der sich ständig aktualisiert. Die Erforschung sicherer, effizienter und zugänglicher Protokolle ist kontinuierlich erforderlich.

#### Hintergrundlektüre {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: Was ist DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Aktuelle Forschung {#recent-research-15}

- [Dezentralisierte Finanzen, zentralisiertes Eigentum?](https://arxiv.org/pdf/2012.09306.pdf)
- [Ethresear.ch Anwendungen](https://ethresear.ch/c/applications/18)

### DAOs {#daos}

Ein wirkungsvoller Anwendungsfall für Ethereum ist die Möglichkeit, sich durch den Einsatz von DAOs dezentral zu organisieren. Es gibt viel aktive Forschung darüber, wie DAOs auf Ethereum entwickelt und genutzt werden können, um verbesserte Formen der Governance als vertrauensminimiertes Koordinationswerkzeug auszuführen, was die Möglichkeiten der Menschen weit über traditionelle Unternehmen und Organisationen hinaus erweitert.

#### Hintergrundlektüre {#background-reading-16}

- [Einführung in DAOs](/dao/)

#### Aktuelle Forschung {#recent-research-16}

- [Kartierung des DAO-Ökosystems](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Entwickler-Tools {#developer-tools}

Die Tools für Ethereum-Entwickler verbessern sich rasant. In diesem allgemeinen Bereich gibt es viel aktive Forschung und Entwicklung zu leisten.

#### Hintergrundlektüre {#background-reading-17}

- [Tooling nach Programmiersprache](/developers/docs/programming-languages/)
- [Entwickler-Frameworks](/developers/docs/frameworks/)
- [Einführung in Dapps](/developers/docs/dapps/)
- [Token-Standards](/developers/docs/standards/tokens/)

#### Aktuelle Forschung {#recent-research-17}

- [Eth R&D Discord](https://discord.gg/qGpsxSA)
- [Spezifikationen der Ethereum-Ausführungs-API](https://github.com/ethereum/execution-apis)

### Orakel {#oracles}

Orakel importieren offchain-Daten auf erlaubnisfreie und dezentrale Weise auf die Blockchain. Diese Daten Onchain zu bringen, ermöglicht es Dapps, auf reale Phänomene wie Preisschwankungen bei realen Vermögenswerten, Ereignisse in Offchain-Apps oder sogar Wetteränderungen zu reagieren.

#### Hintergrundlektüre {#background-reading-18}

- [Einführung in Orakel](/developers/docs/oracles/)

#### Aktuelle Forschung {#recent-research-18}

- [Umfrage zu Blockchain-Orakeln](https://arxiv.org/pdf/2004.07140.pdf)

### App-Sicherheit {#app-security}

Hacks auf Ethereum nutzen im Allgemeinen Schwachstellen in einzelnen Anwendungen aus und nicht im Protokoll selbst. Hacker und App-Entwickler befinden sich in einem Wettrüsten, um neue Angriffe und Verteidigungen zu entwickeln. Das bedeutet, dass immer wichtige Forschung und Entwicklung erforderlich ist, um Apps vor Hacks zu schützen.

#### Hintergrundlektüre {#background-reading-19}

- [Smart-Contract-Sicherheit](/developers/docs/smart-contracts/security/)
- [Wormhole-Exploit-Bericht](https://www.chainalysis.com/blog/wormhole-hack-february-2022/)
- [Liste von Post-Mortems zu Ethereum-Contract-Hacks](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://rekt.news/)

#### Aktuelle Forschung {#recent-research-19}

- [Ethresear.ch Anwendungen](https://ethresear.ch/c/applications/18)

### Technologie-Stack {#technology-stack}

Die Dezentralisierung des gesamten Ethereum-Tech-Stacks ist ein wichtiger Forschungsbereich. Derzeit weisen Dapps auf Ethereum häufig einige Zentralisierungspunkte auf, da sie auf zentralisiertes Tooling oder Infrastruktur angewiesen sind. Diese Abhängigkeit zu verringern bedeutet, es für Anwendungen praktikabel zu machen, Ethereum zu lesen, ohne einem einzigen Anbieter vertrauen zu müssen. Hier kommen Light Clients und der vertrauenslose Zugriff auf Knotendaten ins Spiel.

#### Hintergrundlektüre {#background-reading-20}

- [Ethereum-Stack](/developers/docs/ethereum-stack/)
- [Light Clients](/developers/docs/nodes-and-clients/light-clients/)
- [Einführung in Smart Contracts](/developers/docs/smart-contracts/)
- [Einführung in dezentrale Speicherung](/developers/docs/storage/)

#### Aktuelle Forschung {#recent-research-20}

- [Smart-Contract-Komponierbarkeit](/developers/docs/smart-contracts/composability/)
- [Coinbase: Einführung in den Web3-Stack](https://www.coinbase.com/blog/a-simple-guide-to-the-web3-stack)