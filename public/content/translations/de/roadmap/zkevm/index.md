---
title: zkEVM für die L1-Blockverifizierung
description: Erfahren Sie, wie Zero-Knowledge-Beweise die Ausführung von Ethereum-Blöcken verifizieren können, was einen höheren Durchsatz und geringere Anforderungen an Validatoren ermöglicht.
lang: de
---

# zkEVM für die L1-Blockverifizierung {#zkevm-l1}

zkEVM ist eine Technologie, die [Zero-Knowledge-Beweise](/zero-knowledge-proofs/) verwendet, um die Ausführung von Ethereum-Blöcken zu verifizieren. Anstatt von jedem [Validator](/glossary/#validator) zu verlangen, alle Transaktionen in einem Block erneut auszuführen, führt ein einzelner spezialisierter Akteur (ein sogenannter „Prover“ oder Beweiser) den Block aus und generiert einen kryptografischen Beweis dafür, dass die Ausführung korrekt war. Jeder Blockchain-Knoten kann diesen Beweis dann verifizieren – ein Prozess, der um Größenordnungen günstiger ist als die erneute Ausführung aller Transaktionen.

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>Nicht zu verwechseln mit zkEVM-Rollups</AlertTitle>
<AlertDescription>
Diese Seite behandelt die Verwendung von zkEVM zur Verifizierung der Ausführung von Ethereum-L1-Blöcken. Für zkEVM-Rollups, die ZK-Beweise verwenden, um Ethereum als Ebene-2-Lösungen zu skalieren, siehe [Zero-Knowledge Rollups](/developers/docs/scaling/zk-rollups/).
</AlertDescription>
</AlertContent>
</Alert>

## Das Problem der erneuten Ausführung {#reexecution-problem}

Heute verwendet Ethereum ein „N-von-N“-Verifizierungsmodell: Jeder Validator muss jede Transaktion in jedem Block unabhängig erneut ausführen, um zu verifizieren, dass die vorgeschlagenen Zustandsänderungen korrekt sind. Obwohl dieser Ansatz maximal vertrauenslos ist, schafft er einen grundlegenden Engpass.

Das Problem ist, dass der Durchsatz von Ethereum durch das begrenzt ist, was der durchschnittliche Validator verarbeiten kann. Eine Erhöhung des [Gaslimits](/glossary/#gas-limit) würde mehr Transaktionen pro Block ermöglichen, aber auch die Hardwareanforderungen für Validatoren erhöhen. Dies bedroht die Dezentralisierung – wenn der Betrieb eines Validators teure Hardware erfordert, können sich weniger Menschen an der Sicherung des Netzwerks beteiligen.

zkEVM bietet einen Ausweg aus diesem Kompromiss. Durch den Wechsel von „jeder führt erneut aus“ zu „einer beweist, jeder verifiziert“ kann Ethereum das Gaslimit sicher erhöhen, ohne die Hardwareanforderungen für Validatoren zu steigern.

## Wie die zkEVM-L1-Verifizierung funktioniert {#how-it-works}

Die zkEVM-Verifizierung wandelt die Blockvalidierung in ein „1-von-N“-Modell um:

1. **Ausführung**: Ein Prover führt alle Transaktionen in einem Block aus und verfolgt jede Zustandsänderung.
2. **Beweisführung**: Der Prover generiert einen kryptografischen Beweis (einen [SNARK oder STARK](/zero-knowledge-proofs/#types-of-zero-knowledge-proofs)), der die Korrektheit der Ausführung bescheinigt.
3. **Verifizierung**: Validatoren verifizieren den Beweis, anstatt Transaktionen erneut auszuführen – dies ist drastisch günstiger als eine vollständige erneute Ausführung.

Die Sicherheitsgarantie bleibt dieselbe: Wenn die Ausführung inkorrekt war, kann kein gültiger Beweis generiert werden. Aber anstatt dass jeder Blockchain-Knoten teure Berechnungen durchführt, tut dies jetzt nur noch der Prover – und die Verifizierung ist günstig genug, dass sie das Gaslimit nicht einschränkt.

### Typ-1-zkEVMs {#type-1-zkevm}

zkEVMs werden basierend auf ihrer Kompatibilität mit Ethereum in Typen eingeteilt:

- **Typ 1**: Vollständig Ethereum-äquivalent. Keine Modifikationen an der EVM, sodass jeder Ethereum-Block genau so bewiesen werden kann, wie er ist.
- **Typ 2-4**: Gehen verschiedene Kompromisse ein und modifizieren das EVM-Verhalten, um die Beweisführung zu erleichtern.

Für die L1-Verifizierung ist Typ 1 unerlässlich. Die zkEVM muss in der Lage sein, jeden gültigen Ethereum-Block zu beweisen, einschließlich Randfällen und historischen Blöcken. Jede Abweichung vom exakten Verhalten Ethereums würde Konsensprobleme verursachen.

Die zkEVM-Forschung der Ethereum Foundation konzentriert sich auf Typ-1-Implementierungen, die vollständig mit der bestehenden Ethereum-Ausführung kompatibel sind.

## Vorteile für Ethereum {#benefits}

### Höherer Durchsatz {#higher-throughput}

Wenn die Verifizierung günstig ist, kann das Gaslimit sicher erhöht werden. Dies erweitert die Netzwerkkapazität und hilft, die Gebühren in Zeiten hoher Nachfrage zu stabilisieren. Das aktuelle Gaslimit ist teilweise durch die Hardware der Validatoren begrenzt – zkEVM hebt diese Einschränkung auf.

### Stärkere Dezentralisierung {#stronger-decentralization}

Mit der zkEVM-Verifizierung müssen Validatoren nur noch Beweise verifizieren, anstatt Transaktionen auszuführen. Dies senkt die Hardwareanforderungen für den Betrieb eines Validators drastisch und ermöglicht es mehr Menschen, sich an der Sicherung des Netzwerks zu beteiligen. Eine größere Vielfalt an Validatoren stärkt die Zensurresistenz und Widerstandsfähigkeit von Ethereum.

Beachten Sie, dass die Beweisführung selbst erhebliche Rechenressourcen erfordert, die größer sind als die der aktuellen Validator-Hardware. Im Gegensatz zur Validierung muss die Beweisführung jedoch nicht auf die gleiche Weise dezentralisiert sein: Pro Block wird nur ein korrekter Beweis benötigt, und jeder kann ihn schnell verifizieren. Die Forschung zu Prover-Märkten, Beweisaggregation und Hardwarebeschleunigung zielt darauf ab, sicherzustellen, dass die Beweisführung wettbewerbsfähig und zugänglich bleibt, anstatt sich auf wenige große Betreiber zu konzentrieren.

### Vorhersehbare Finalität {#predictable-finality}

Die Beweisverifizierung erfolgt in konstanter Zeit, unabhängig von der Blockkomplexität. Dies macht das Timing von Bestätigungen vorhersehbarer und reduziert verpasste Bestätigungen, die auftreten können, wenn Validatoren Schwierigkeiten haben, komplexe Blöcke rechtzeitig zu verarbeiten.

## Herausforderungen bei der Echtzeit-Beweisführung {#realtime-proving}

Die größte Herausforderung für die zkEVM-L1-Verifizierung ist die Geschwindigkeit. Ethereum-Blöcke werden alle 12 Sekunden produziert, was bedeutet, dass Beweise in einem ähnlichen Zeitrahmen generiert werden müssen, um für den Konsens nützlich zu sein.

Aktuelle zkEVM-Implementierungen können Minuten bis Stunden benötigen, um einen einzigen Block zu beweisen. Die Forschung konzentriert sich darauf, diese Lücke zu schließen durch:

- **Parallelisierung**: Verteilung der Beweisführungsarbeit auf mehrere Maschinen.
- **Spezialisierte Hardware**: Entwicklung von Schaltkreisen und Hardware, die für die ZK-Beweisführung optimiert sind.
- **Algorithmische Verbesserungen**: Effizientere Beweissysteme und Schaltkreisdesigns.
- **Inkrementelle Beweisführung**: Generierung von Beweisen während der Ausführung von Transaktionen, anstatt danach.

## Aktuelle Forschung und Implementierungen {#current-research}

Die Ethereum Foundation finanziert die zkEVM-Forschung durch das Team der [Privacy Stewards of Ethereum (PSE)](https://pse.dev/). Zu den wichtigsten Forschungsbereichen gehören:

- **Echtzeit-Beweisführung**: Generierung vollständiger Blockbeweise innerhalb von 12-Sekunden-Slots.
- **Client-Integration**: Standardisierung von Schnittstellen zwischen Ausführungs-Clients und Provern.
- **Wirtschaftliche Anreize**: Gestaltung nachhaltiger Prover-Märkte und Gebührenstrukturen.

### Implementierungsstatus {#implementations}

Mehrere zkVM-Implementierungen werden für die Ethereum-Blockbeweisführung entwickelt und getestet:

| Implementierung | Architektur |
|----------------|--------------|
| [OpenVM](https://github.com/openvm-org/openvm) | rv32im |
| [RISC Zero](https://github.com/risc0/risc0) | rv32im |
| [Airbender](https://github.com/matter-labs/zksync-airbender) | rv32im |
| [Jolt](https://github.com/a16z/jolt) | rv32im |
| [Zisk](https://github.com/0xPolygonHermez/zisk) | rv64ima |

Diese verwenden RISC-V-basierte virtuelle Maschinen, um EVM-Bytecode auszuführen, und generieren dann ZK-Beweise für die korrekte Ausführung. Aktuelle Testergebnisse und Fortschritte werden im [zkVM-Tracker der Ethereum Foundation](https://zkevm.ethereum.foundation/zkvm-tracker) verfolgt.

## Wie zkEVM zu anderen Upgrades passt {#related-upgrades}

Die zkEVM-L1-Verifizierung ist mit mehreren anderen Punkten der Ethereum-Roadmap verbunden:

- **[Verkle-Bäume](/roadmap/verkle-trees/)**: Ermöglichen kleinere Zeugen (Witnesses) für die zustandslose Verifizierung, wodurch die Datenmenge reduziert wird, mit der Prover arbeiten müssen.
- **[Zustandslosigkeit](/roadmap/statelessness/)**: zkEVM ist ein wichtiger Wegbereiter – mit ZK-Beweisen der Ausführung benötigen Blockchain-Knoten nicht den vollständigen Zustand, um Blöcke zu verifizieren.
- **[PBS](/roadmap/pbs/)**: Block-Ersteller könnten potenziell die Beweisgenerierung integrieren, oder es könnte ein separater Prover-Markt entstehen.
- **[Single Slot Finality](/roadmap/single-slot-finality/)**: Eine schnellere Beweisgenerierung könnte die Finalität in einem einzigen Slot (Single Slot Finality) mit kryptografischen Garantien ermöglichen.

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
- [Ethproofs](https://ethproofs.org/) – Verfolgen Sie das Rennen, Ethereum in Echtzeit zu beweisen
- [zkevm.fyi](https://zkevm.fyi) – Technisches Buch über zkEVM für L1
- [PSE zkEVM Specs](https://github.com/privacy-scaling-explorations/zkevm-specs) – Technische Spezifikationen
- [The Verge](https://vitalik.eth.limo/general/2024/10/23/futures4.html) – Vitaliks Überblick über Verifizierungsverbesserungen
- [EF zkEVM Blog](https://zkevm.ethereum.foundation/blog) – Leistungsanalyse vom EF-Team