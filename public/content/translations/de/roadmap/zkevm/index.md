---
title: zkEVM für die L1-Blockvalidierung
description: Erfahre, wie Zero-Knowledge-Beweise die Ausführung von Ethereum-Blöcken verifizieren können, was einen höheren Transaktionsdurchsatz und geringere Anforderungen an Validatoren ermöglicht.
lang: de
---

Die zkEVM ist eine Technologie, die [Zero-Knowledge-Beweise](/zero-knowledge-proofs/) verwendet, um die Ausführung von Ethereum-Blöcken zu verifizieren. Anstatt dass jeder [Validator](/glossary/#validator) alle Transaktionen in einem Block erneut ausführen muss, führt ein einzelner spezialisierter Akteur (ein sogenannter „Beweiser“) den Block aus und erstellt einen kryptografischen Beweis dafür, dass die Ausführung korrekt war. Jeder Knoten kann diesen Beweis dann verifizieren – ein Prozess, der um Größenordnungen günstiger ist als die erneute Ausführung aller Transaktionen.

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>Nicht zu verwechseln mit zkEVM-Rollups</AlertTitle>
<AlertDescription>
Diese Seite behandelt die Verwendung der zkEVM zur Verifizierung der L1-Blockausführung von Ethereum. Für zkEVM-Rollups, die ZK-Beweise nutzen, um Ethereum als Layer-2-Lösungen zu skalieren, siehe [Zero-Knowledge-Rollups](/developers/docs/scaling/zk-rollups/).
</AlertDescription>
</AlertContent>
</Alert>

## Das Problem der erneuten Ausführung {#reexecution-problem}

Heute verwendet Ethereum ein „N-von-N“-Verifizierungsmodell: Jeder Validator muss jede Transaktion in jedem Block unabhängig erneut ausführen, um zu verifizieren, dass die vorgeschlagenen Zustandsänderungen korrekt sind. Obwohl dieser Ansatz maximal vertrauenslos ist, schafft er einen grundlegenden Engpass.

Das Problem ist, dass der Transaktionsdurchsatz von Ethereum durch das begrenzt ist, was der durchschnittliche Validator verarbeiten kann. Eine Erhöhung des [Gaslimits](/glossary/#gas-limit) würde mehr Transaktionen pro Block ermöglichen, aber auch die Hardwareanforderungen für Validatoren erhöhen. Dies bedroht die Dezentralisierung – wenn der Betrieb eines Validators teure Hardware erfordert, können weniger Menschen an der Sicherung des Netzwerks teilnehmen.

Die zkEVM bietet einen Ausweg aus diesem Kompromiss. Durch den Wechsel von „jeder führt erneut aus“ zu „einer beweist, jeder verifiziert“ kann Ethereum das Gaslimit sicher erhöhen, ohne die Hardwareanforderungen für Validatoren zu steigern.

## Wie die zkEVM-L1-Verifizierung funktioniert {#how-it-works}

Die zkEVM-Verifizierung verwandelt die Blockvalidierung in ein „1-von-N“-Modell:

1. **Ausführung**: Ein Beweiser führt alle Transaktionen in einem Block aus und verfolgt jede Zustandsänderung.
2. **Beweiserstellung**: Der Beweiser generiert einen kryptografischen Beweis (einen [SNARK oder STARK](/zero-knowledge-proofs/#types-of-zero-knowledge-proofs)), der die Korrektheit der Ausführung attestiert.
3. **Verifizierung**: Validatoren verifizieren den Beweis, anstatt Transaktionen erneut auszuführen – dies ist drastisch günstiger als eine vollständige erneute Ausführung.

Die Sicherheitsgarantie bleibt dieselbe: Wenn die Ausführung inkorrekt war, kann kein gültiger Beweis generiert werden. Aber anstatt dass jeder Knoten teure Berechnungen durchführt, tut dies nun nur noch der Beweiser – und die Verifizierung ist günstig genug, dass sie das Gaslimit nicht einschränkt.

### Typ-1-zkEVMs {#type-1-zkevm}

zkEVMs werden basierend auf ihrer Kompatibilität mit Ethereum in Typen eingeteilt:

- **Typ 1**: Vollständig Ethereum-äquivalent. Keine Modifikationen an der EVM, sodass jeder Ethereum-Block genau so bewiesen werden kann, wie er ist.
- **Typ 2-4**: Gehen verschiedene Kompromisse ein und modifizieren das EVM-Verhalten, um die Beweiserstellung zu erleichtern.

Für die L1-Verifizierung ist Typ 1 essenziell. Die zkEVM muss in der Lage sein, jeden gültigen Ethereum-Block zu beweisen, einschließlich Randfällen und historischer Blöcke. Jede Abweichung vom exakten Verhalten Ethereums würde Konsensprobleme verursachen.

Die zkEVM-Forschung der Ethereum Foundation konzentriert sich auf Typ-1-Implementierungen, die vollständig mit der bestehenden Ethereum-Ausführung kompatibel sind.

## Vorteile für Ethereum {#benefits}

### Höherer Transaktionsdurchsatz {#higher-throughput}

Wenn die Verifizierung günstig ist, kann das Gaslimit sicher erhöht werden. Dies erweitert die Netzwerkkapazität und hilft, die Gebühren in Zeiten hoher Nachfrage zu stabilisieren. Das aktuelle Gaslimit wird teilweise durch die Validator-Hardware eingeschränkt – die zkEVM hebt diese Einschränkung auf.

### Stärkere Dezentralisierung {#stronger-decentralization}

Mit der zkEVM-Verifizierung müssen Validatoren nur noch Beweise verifizieren, anstatt Transaktionen auszuführen. Dies senkt die Hardwareanforderungen für den Betrieb eines Validators drastisch und ermöglicht es mehr Menschen, an der Sicherung des Netzwerks teilzunehmen. Eine größere Validator-Diversität stärkt die Zensurresistenz und Widerstandsfähigkeit von Ethereum.

Beachte, dass die Beweiserstellung selbst erhebliche Rechenressourcen erfordert, die größer sind als die aktueller Validator-Hardware. Im Gegensatz zur Validierung muss die Beweiserstellung jedoch nicht auf die gleiche Weise dezentral sein: Pro Block wird nur ein korrekter Beweis benötigt, und jeder kann ihn schnell verifizieren. Die Forschung zu Beweiser-Märkten, Beweisaggregation und Hardwarebeschleunigung zielt darauf ab, sicherzustellen, dass die Beweiserstellung wettbewerbsfähig und zugänglich bleibt, anstatt sich auf wenige große Betreiber zu konzentrieren.

### Vorhersehbare Endgültigkeit {#predictable-finality}

Die Beweisverifizierung erfolgt in konstanter Zeit, unabhängig von der Blockkomplexität. Dies macht das Timing der Attestierung vorhersehbarer und reduziert verpasste Attestierungen, die auftreten können, wenn Validatoren Schwierigkeiten haben, komplexe Blöcke rechtzeitig zu verarbeiten.

## Herausforderungen bei der Echtzeit-Beweiserstellung {#realtime-proving}

Die größte Herausforderung für die zkEVM-L1-Verifizierung ist die Geschwindigkeit. Ethereum-Blöcke werden alle 12 Sekunden produziert, was bedeutet, dass Beweise in einem ähnlichen Zeitrahmen generiert werden müssen, um für den Konsens nützlich zu sein.

Aktuelle zkEVM-Implementierungen können Minuten bis Stunden benötigen, um einen einzigen Block zu beweisen. Die Forschung konzentriert sich darauf, diese Lücke zu schließen durch:

- **Parallelisierung**: Verteilung der Beweisarbeit auf mehrere Maschinen
- **Spezialisierte Hardware**: Entwicklung von Schaltkreisen und Hardware, die für die ZK-Beweiserstellung optimiert sind
- **Algorithmische Verbesserungen**: Effizientere Beweissysteme und Schaltkreisdesigns
- **Inkrementelle Beweiserstellung**: Generierung von Beweisen während der Transaktionsausführung anstatt danach

## Aktuelle Forschung und Implementierungen {#current-research}

Die Ethereum Foundation finanziert die zkEVM-Forschung durch das Team der [Privacy Stewards of Ethereum (PSE)](https://pse.dev/). Zu den wichtigsten Forschungsbereichen gehören:

- **Echtzeit-Beweiserstellung**: Generierung vollständiger Blockbeweise innerhalb von 12-Sekunden-Slots
- **Client-Integration**: Standardisierung von Schnittstellen zwischen Ausführungs-Clients und Beweisern
- **Wirtschaftliche Anreize**: Gestaltung nachhaltiger Beweiser-Märkte und Gebührenstrukturen

### Implementierungsstatus {#implementations}

Mehrere zkVM-Implementierungen werden für die Ethereum-Blockbeweiserstellung entwickelt und getestet:

| Implementierung | Architektur |
|----------------|--------------|
| [OpenVM](https://github.com/openvm-org/openvm) | rv32im |
| [RISC Zero](https://github.com/risc0/risc0) | rv32im |
| [Airbender](https://github.com/matter-labs/zksync-airbender) | rv32im |
| [Jolt](https://github.com/a16z/jolt) | rv32im |
| [Zisk](https://github.com/0xPolygonHermez/zisk) | rv64ima |

Diese verwenden RISC-V-basierte virtuelle Maschinen, um EVM-Bytecode auszuführen, und generieren dann ZK-Beweise für die korrekte Ausführung. Aktuelle Testergebnisse und Fortschritte werden im [zkVM-Tracker der Ethereum Foundation](https://zkevm.ethereum.foundation/zkvm-tracker) verfolgt.

## Wie die zkEVM zu anderen Upgrades passt {#related-upgrades}

Die zkEVM-L1-Verifizierung ist mit mehreren anderen Punkten der Ethereum-Roadmap verbunden:

- **[Verkle-Bäume](/roadmap/verkle-trees/)**: Ermöglichen kleinere Zeugen (Witnesses) für die zustandslose Verifizierung, was die Datenmenge reduziert, mit der Beweiser arbeiten müssen.
- **[Zustandslosigkeit](/roadmap/statelessness/)**: Die zkEVM ist ein wichtiger Wegbereiter – mit ZK-Beweisen der Ausführung benötigen Knoten nicht den vollständigen Zustand, um Blöcke zu verifizieren.
- **[Proposer-Builder-Trennung (PBS)](/roadmap/pbs/)**: Block-Builder könnten potenziell die Beweiserstellung integrieren, oder es könnte ein separater Beweiser-Markt entstehen.
- **[Single-Slot-Finalität](/roadmap/single-slot-finality/)**: Eine schnellere Beweiserstellung könnte Single-Slot-Finalität mit kryptografischen Garantien ermöglichen.

<Alert variant="warning">
<AlertEmoji text="🧪" />
<AlertContent>
<AlertDescription>
Die zkEVM-L1-Verifizierung befindet sich in der aktiven Forschung und ist noch nicht in produktive Ethereum-Clients integriert.
</AlertDescription>
</AlertContent>
</Alert>

## Weiterführende Literatur {#further-reading}

- [zkEVM Foundation](https://zkevm.ethereum.foundation) – Offizieller zkEVM-Forschungs-Hub der Ethereum Foundation
- [Ethproofs](https://ethproofs.org/) – Verfolge das Rennen um den Echtzeit-Beweis von Ethereum
- [zkevm.fyi](https://zkevm.fyi) – Technisches Buch über die zkEVM für L1
- [PSE zkEVM Specs](https://github.com/privacy-scaling-explorations/zkevm-specs) – Technische Spezifikationen
- [The Verge](https://vitalik.eth.limo/general/2024/10/23/futures4.html) – Vitaliks Überblick über Verifizierungsverbesserungen
- [EF zkEVM Blog](https://zkevm.ethereum.foundation/blog) – Leistungsanalyse vom EF-Team