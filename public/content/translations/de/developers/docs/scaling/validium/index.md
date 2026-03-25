---
title: Validium
description: "Eine Einführung in Validium als Skalierungslösung, die derzeit von der Ethereum-Community genutzt wird."
lang: de
sidebarDepth: 3
---

Validium ist eine [Skalierungslösung](/developers/docs/scaling/), die die Integrität von Transaktionen mithilfe von Validitätsnachweisen wie [Zero-Knowledge Rollups](/developers/docs/scaling/zk-rollups/) erzwingt, aber keine Transaktionsdaten im [Ethereum](/)-Mainnet speichert. Während die Off-Chain-Datenverfügbarkeit Kompromisse mit sich bringt, kann sie zu massiven Verbesserungen der Skalierbarkeit führen (Validiums können [\~9.000 Transaktionen oder mehr pro Sekunde](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263) verarbeiten).

## Voraussetzungen {#prerequisites}

Sie sollten unsere Seiten zur [Ethereum-Skalierung](/developers/docs/scaling/) und zu [Ebene 2](/layer-2) gelesen und verstanden haben.

## Was ist Validium? {#what-is-validium}

Validiums sind Skalierungslösungen, die Off-Chain-Datenverfügbarkeit und -Berechnungen nutzen, um den Durchsatz zu verbessern, indem Transaktionen außerhalb des Ethereum-Mainnets verarbeitet werden. Wie Zero-Knowledge Rollups (ZK-Rollups) veröffentlichen Validiums [Zero-Knowledge-Beweise](/glossary/#zk-proof), um Off-Chain-Transaktionen auf Ethereum zu verifizieren. Dies verhindert ungültige Zustandsübergänge und verbessert die Sicherheitsgarantien einer Validium-Chain.

Diese „Validitätsnachweise“ können in Form von ZK-SNARKs (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) oder ZK-STARKs (Zero-Knowledge Scalable Transparent ARgument of Knowledge) vorliegen. Mehr zu [Zero-Knowledge-Beweisen](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/).

Guthaben, die Validium-Nutzern gehören, werden durch einen Smart Contract auf Ethereum kontrolliert. Validiums bieten nahezu sofortige Auszahlungen, ähnlich wie ZK-Rollups; sobald der Validitätsnachweis für eine Auszahlungsanforderung im Mainnet verifiziert wurde, können Nutzer Guthaben abheben, indem sie [Merkle-Beweise](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) vorlegen. Der Merkle-Beweis validiert die Aufnahme der Auszahlungstransaktion des Nutzers in einen verifizierten Transaktions-Batch, wodurch der Vertrag auf der Blockchain die Auszahlung verarbeiten kann.

Allerdings können die Guthaben von Validium-Nutzern eingefroren und Auszahlungen eingeschränkt werden. Dies kann passieren, wenn Datenverfügbarkeitsmanager auf der Validium-Chain den Nutzern Off-Chain-Zustandsdaten vorenthalten. Ohne Zugriff auf Transaktionsdaten können Nutzer den Merkle-Beweis nicht berechnen, der erforderlich ist, um den Besitz von Guthaben nachzuweisen und Auszahlungen auszuführen.

Dies ist der Hauptunterschied zwischen Validiums und ZK-Rollups – ihre Positionen im Spektrum der Datenverfügbarkeit. Beide Lösungen gehen die Datenspeicherung unterschiedlich an, was Auswirkungen auf Sicherheit und Vertrauenslosigkeit hat.

## Wie interagieren Validiums mit Ethereum? {#how-do-validiums-interact-with-ethereum}

Validiums sind Skalierungsprotokolle, die auf der bestehenden Ethereum-Chain aufbauen. Obwohl sie Transaktionen Off-Chain ausführen, wird eine Validium-Chain durch eine Sammlung von Smart Contracts verwaltet, die im Mainnet bereitgestellt werden, darunter:

1. **Verifizierungsvertrag (Verifier Contract)**: Der Verifizierungsvertrag überprüft die Gültigkeit von Beweisen, die vom Validium-Betreiber bei Zustandsaktualisierungen eingereicht werden. Dies umfasst Validitätsnachweise, die die Richtigkeit von Off-Chain-Transaktionen bescheinigen, und Datenverfügbarkeitsbeweise, die die Existenz von Off-Chain-Transaktionsdaten verifizieren.

2. **Hauptvertrag (Main Contract)**: Der Hauptvertrag speichert Zustandsverpflichtungen (Merkle-Wurzeln), die von Blockproduzenten eingereicht werden, und aktualisiert den Zustand des Validiums, sobald ein Validitätsnachweis auf der Blockchain verifiziert wurde. Dieser Vertrag verarbeitet auch Einzahlungen in und Auszahlungen aus der Validium-Chain.

Validiums sind zudem für Folgendes auf die Ethereum-Hauptchain angewiesen:

### Abwicklung (Settlement) {#settlement}

Transaktionen, die auf einem Validium ausgeführt werden, können erst vollständig bestätigt werden, wenn die übergeordnete Chain ihre Gültigkeit verifiziert. Alle auf einem Validium durchgeführten Geschäfte müssen letztendlich im Mainnet abgewickelt werden. Die Ethereum-Blockchain bietet Validium-Nutzern auch „Abwicklungsgarantien“, was bedeutet, dass Off-Chain-Transaktionen nicht rückgängig gemacht oder geändert werden können, sobald sie auf der Blockchain festgeschrieben wurden.

### Sicherheit {#security}

Ethereum fungiert als Abwicklungsebene und garantiert auch die Gültigkeit von Zustandsübergängen auf dem Validium. Off-Chain-Transaktionen, die auf der Validium-Chain ausgeführt werden, werden über einen Smart Contract auf der Ethereum-Basisebene verifiziert.

Wenn der Verifizierungsvertrag auf der Blockchain den Beweis als ungültig erachtet, werden die Transaktionen abgelehnt. Dies bedeutet, dass Betreiber die vom Ethereum-Protokoll erzwungenen Gültigkeitsbedingungen erfüllen müssen, bevor sie den Zustand des Validiums aktualisieren.

## Wie funktioniert Validium? {#how-does-validium-work}

### Transaktionen {#transactions}

Nutzer übermitteln Transaktionen an den Betreiber, einen Blockchain-Knoten, der für die Ausführung von Transaktionen auf der Validium-Chain verantwortlich ist. Einige Validiums verwenden möglicherweise einen einzigen Betreiber zur Ausführung der Chain oder verlassen sich auf einen [Proof-of-Stake (PoS)](/developers/docs/consensus-mechanisms/pos/)-Mechanismus für rotierende Betreiber.

Der Betreiber fasst Transaktionen zu einem Batch zusammen und sendet ihn zur Beweisführung an eine Beweisschaltung (Proving Circuit). Die Beweisschaltung akzeptiert den Transaktions-Batch (und andere relevante Daten) als Eingaben und gibt einen Validitätsnachweis aus, der verifiziert, dass die Operationen korrekt durchgeführt wurden.

### Zustandsverpflichtungen (State Commitments) {#state-commitments}

Der Zustand des Validiums wird als Merkle-Baum gehasht, wobei die Wurzel im Hauptvertrag auf Ethereum gespeichert wird. Die Merkle-Wurzel, auch bekannt als Zustandswurzel (State Root), fungiert als kryptografische Verpflichtung auf den aktuellen Zustand von Konten und Salden auf dem Validium.

Um eine Zustandsaktualisierung durchzuführen, muss der Betreiber eine neue Zustandswurzel berechnen (nach Ausführung der Transaktionen) und diese an den Vertrag auf der Blockchain übermitteln. Wenn der Validitätsnachweis erfolgreich geprüft wird, wird der vorgeschlagene Zustand akzeptiert und das Validium wechselt zur neuen Zustandswurzel.

### Ein- und Auszahlungen {#deposits-and-withdrawals}

Nutzer verschieben Guthaben von Ethereum auf ein Validium, indem sie ETH (oder einen beliebigen ERC-kompatiblen Token) in den Vertrag auf der Blockchain einzahlen. Der Vertrag leitet das Einzahlungsereignis an das Validium Off-Chain weiter, wo der Adresse des Nutzers ein Betrag in Höhe seiner Einzahlung gutgeschrieben wird. Der Betreiber nimmt diese Einzahlungstransaktion auch in einen neuen Batch auf.

Um Guthaben zurück ins Mainnet zu verschieben, initiiert ein Validium-Nutzer eine Auszahlungstransaktion und übermittelt sie an den Betreiber, der die Auszahlungsanforderung validiert und in einen Batch aufnimmt. Die Vermögenswerte des Nutzers auf der Validium-Chain werden ebenfalls zerstört, bevor sie das System verlassen können. Sobald der mit dem Batch verbundene Validitätsnachweis verifiziert ist, kann der Nutzer den Hauptvertrag aufrufen, um den Rest seiner ursprünglichen Einzahlung abzuheben.

Als Anti-Zensur-Mechanismus ermöglicht das Validium-Protokoll den Nutzern, direkt aus dem Validium-Vertrag abzuheben, ohne über den Betreiber zu gehen. In diesem Fall müssen die Nutzer dem Verifizierungsvertrag einen Merkle-Beweis vorlegen, der die Aufnahme eines Kontos in die Zustandswurzel zeigt. Wenn der Beweis akzeptiert wird, kann der Nutzer die Auszahlungsfunktion des Hauptvertrags aufrufen, um sein Guthaben aus dem Validium abzuziehen.

### Batch-Einreichung {#batch-submission}

Nach der Ausführung eines Transaktions-Batches reicht der Betreiber den zugehörigen Validitätsnachweis beim Verifizierungsvertrag ein und schlägt dem Hauptvertrag eine neue Zustandswurzel vor. Wenn der Beweis gültig ist, aktualisiert der Hauptvertrag den Zustand des Validiums und finalisiert die Ergebnisse der Transaktionen im Batch.

Im Gegensatz zu einem ZK-Rollup sind Blockproduzenten auf einem Validium nicht verpflichtet, Transaktionsdaten für Transaktions-Batches zu veröffentlichen (nur Block-Header). Dies macht Validium zu einem reinen Off-Chain-Skalierungsprotokoll, im Gegensatz zu „hybriden“ Skalierungsprotokollen (d. h. [Ebene 2](/layer-2/)), die Zustandsdaten auf der Ethereum-Hauptchain unter Verwendung von Blob-Daten, `calldata` oder einer Kombination aus beidem veröffentlichen.

### Datenverfügbarkeit {#data-availability}

Wie bereits erwähnt, nutzen Validiums ein Off-Chain-Datenverfügbarkeitsmodell, bei dem Betreiber alle Transaktionsdaten außerhalb des Ethereum-Mainnets speichern. Der geringe Datenfußabdruck von Validium auf der Blockchain verbessert die Skalierbarkeit (der Durchsatz wird nicht durch die Datenverarbeitungskapazität von Ethereum begrenzt) und senkt die Nutzergebühren (die Kosten für die Veröffentlichung von Daten auf der Blockchain sind geringer).

Die Off-Chain-Datenverfügbarkeit stellt jedoch ein Problem dar: Daten, die zum Erstellen oder Verifizieren von Merkle-Beweisen erforderlich sind, könnten nicht verfügbar sein. Dies bedeutet, dass Nutzer möglicherweise keine Guthaben aus dem Vertrag auf der Blockchain abheben können, falls Betreiber böswillig handeln.

Verschiedene Validium-Lösungen versuchen, dieses Problem zu lösen, indem sie die Speicherung von Zustandsdaten dezentralisieren. Dies beinhaltet, Blockproduzenten zu zwingen, die zugrunde liegenden Daten an „Datenverfügbarkeitsmanager“ zu senden, die für die Speicherung von Off-Chain-Daten verantwortlich sind und diese den Nutzern auf Anfrage zur Verfügung stellen.

Datenverfügbarkeitsmanager in Validium bescheinigen die Verfügbarkeit von Daten für Off-Chain-Transaktionen, indem sie jeden Validium-Batch signieren. Diese Signaturen stellen eine Form von „Verfügbarkeitsbeweis“ dar, den der Verifizierungsvertrag auf der Blockchain prüft, bevor er Zustandsaktualisierungen genehmigt.

Validiums unterscheiden sich in ihrem Ansatz zum Datenverfügbarkeitsmanagement. Einige verlassen sich auf vertrauenswürdige Parteien, um Zustandsdaten zu speichern, während andere zufällig zugewiesene Validatoren für diese Aufgabe verwenden.

#### Datenverfügbarkeitskomitee (DAC) {#data-availability-committee}

Um die Verfügbarkeit von Off-Chain-Daten zu garantieren, ernennen einige Validium-Lösungen eine Gruppe vertrauenswürdiger Entitäten, die gemeinsam als Datenverfügbarkeitskomitee (Data Availability Committee, DAC) bekannt sind, um Kopien des Zustands zu speichern und den Nachweis der Datenverfügbarkeit zu erbringen. DACs sind einfacher zu implementieren und erfordern weniger Koordination, da die Mitgliederzahl gering ist.

Nutzer müssen jedoch darauf vertrauen, dass das DAC die Daten bei Bedarf zur Verfügung stellt (z. B. zur Generierung von Merkle-Beweisen). Es besteht die Möglichkeit, dass Mitglieder von Datenverfügbarkeitskomitees [von einem böswilligen Akteur kompromittiert werden](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view), der dann Off-Chain-Daten vorenthalten kann.

[Mehr zu Datenverfügbarkeitskomitees in Validiums](https://medium.com/starkware/data-availability-e5564c416424).

#### Gebundene Datenverfügbarkeit (Bonded Data Availability) {#bonded-data-availability}

Andere Validiums verlangen von Teilnehmern, die mit der Speicherung von Offline-Daten beauftragt sind, Token in einem Smart Contract zu staken (d. h. zu sperren), bevor sie ihre Rollen übernehmen. Dieser Einsatz dient als „Kaution“ (Bond), um ehrliches Verhalten unter den Datenverfügbarkeitsmanagern zu garantieren und Vertrauensannahmen zu reduzieren. Wenn diese Teilnehmer die Datenverfügbarkeit nicht nachweisen können, wird die Kaution durch Slashing bestraft.

In einem System mit gebundener Datenverfügbarkeit kann jeder beauftragt werden, Off-Chain-Daten zu halten, sobald er den erforderlichen Einsatz erbringt. Dies erweitert den Pool berechtigter Datenverfügbarkeitsmanager und reduziert die Zentralisierung, die Datenverfügbarkeitskomitees (DACs) betrifft. Noch wichtiger ist, dass dieser Ansatz auf kryptografisch-ökonomischen Anreizen beruht, um böswillige Aktivitäten zu verhindern, was wesentlich sicherer ist, als vertrauenswürdige Parteien zur Sicherung von Offline-Daten im Validium zu ernennen.

[Mehr zu gebundener Datenverfügbarkeit in Validiums](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf).

## Volitions und Validium {#volitions-and-validium}

Validiums bieten viele Vorteile, bringen aber auch Kompromisse mit sich (insbesondere bei der Datenverfügbarkeit). Aber wie bei vielen Skalierungslösungen eignen sich Validiums für spezifische Anwendungsfälle – weshalb Volitions geschaffen wurden.

Volitions kombinieren ein ZK-Rollup und eine Validium-Chain und ermöglichen es Nutzern, zwischen den beiden Skalierungslösungen zu wechseln. Mit Volitions können Nutzer die Off-Chain-Datenverfügbarkeit von Validium für bestimmte Transaktionen nutzen, während sie die Freiheit behalten, bei Bedarf zu einer Lösung mit Datenverfügbarkeit auf der Blockchain (ZK-Rollup) zu wechseln. Dies gibt den Nutzern im Wesentlichen die Freiheit, Kompromisse entsprechend ihren individuellen Umständen zu wählen.

Eine dezentralisierte Börse (DEX) zieht es möglicherweise vor, die skalierbare und private Infrastruktur eines Validiums für hochwertige Trades zu nutzen. Sie kann auch ein ZK-Rollup für Nutzer verwenden, die die höheren Sicherheitsgarantien und die Vertrauenslosigkeit eines ZK-Rollups wünschen.

## Validiums und EVM-Kompatibilität {#validiums-and-evm-compatibility}

Wie ZK-Rollups eignen sich Validiums meist für einfache Anwendungen wie Token-Swaps und Zahlungen. Die Unterstützung allgemeiner Berechnungen und der Ausführung von Smart Contracts in Validiums ist schwer zu implementieren, angesichts des erheblichen Aufwands, [EVM](/developers/docs/evm/)-Anweisungen in einer Zero-Knowledge-Beweisschaltung nachzuweisen.

Einige Validium-Projekte versuchen, dieses Problem zu umgehen, indem sie EVM-kompatible Sprachen (z. B. Solidity, Vyper) kompilieren, um benutzerdefinierten Bytecode zu erstellen, der für effizientes Beweisen optimiert ist. Ein Nachteil dieses Ansatzes ist, dass neue Zero-Knowledge-Beweis-freundliche VMs möglicherweise wichtige EVM-Opcodes nicht unterstützen und Entwickler für ein optimales Erlebnis direkt in der Hochsprache schreiben müssen. Dies schafft noch mehr Probleme: Es zwingt Entwickler, Dapps mit einem völlig neuen Entwicklungs-Stack zu erstellen, und bricht die Kompatibilität mit der aktuellen Ethereum-Infrastruktur.

Einige Teams versuchen jedoch, bestehende EVM-Opcodes für ZK-Beweisschaltungen zu optimieren. Dies wird zur Entwicklung einer Zero-Knowledge Ethereum Virtual Machine (zkEVM) führen, einer EVM-kompatiblen VM, die Beweise erzeugt, um die Korrektheit der Programmausführung zu verifizieren. Mit einer zkEVM können Validium-Chains Smart Contracts Off-Chain ausführen und Validitätsnachweise einreichen, um eine Off-Chain-Berechnung (ohne sie erneut ausführen zu müssen) auf Ethereum zu verifizieren.

[Mehr zu zkEVMs](https://www.alchemy.com/overviews/zkevm).

## Wie skalieren Validiums Ethereum? {#scaling-ethereum-with-validiums}

### 1. Off-Chain-Datenspeicherung {#offchain-data-storage}

Skalierungsprojekte der Ebene 2, wie Optimistic Rollups und ZK-Rollups, tauschen die unendliche Skalierbarkeit reiner Off-Chain-Skalierungsprotokolle (z. B. [Plasma](/developers/docs/scaling/plasma/)) gegen Sicherheit ein, indem sie einige Transaktionsdaten auf L1 veröffentlichen. Dies bedeutet jedoch, dass die Skalierbarkeitseigenschaften von Rollups durch die Datenbandbreite im Ethereum-Mainnet begrenzt sind (aus diesem Grund schlägt [Data Sharding](/roadmap/danksharding/) vor, die Datenspeicherkapazität von Ethereum zu verbessern).

Validiums erreichen Skalierbarkeit, indem sie alle Transaktionsdaten Off-Chain halten und nur Zustandsverpflichtungen (und Validitätsnachweise) posten, wenn sie Zustandsaktualisierungen an die Ethereum-Hauptchain weiterleiten. Die Existenz von Validitätsnachweisen verleiht Validiums jedoch höhere Sicherheitsgarantien als anderen reinen Off-Chain-Skalierungslösungen, einschließlich Plasma und [Sidechains](/developers/docs/scaling/sidechains/). Indem sie die Datenmenge reduzieren, die Ethereum verarbeiten muss, bevor Off-Chain-Transaktionen validiert werden, erweitern Validium-Designs den Durchsatz im Mainnet erheblich.

### 2. Rekursive Beweise {#recursive-proofs}

Ein rekursiver Beweis ist ein Validitätsnachweis, der die Gültigkeit anderer Beweise verifiziert. Diese „Beweise von Beweisen“ werden generiert, indem mehrere Beweise rekursiv aggregiert werden, bis ein finaler Beweis erstellt ist, der alle vorherigen Beweise verifiziert. Rekursive Beweise skalieren die Verarbeitungsgeschwindigkeiten der Blockchain, indem sie die Anzahl der Transaktionen erhöhen, die pro Validitätsnachweis verifiziert werden können.

Typischerweise validiert jeder Validitätsnachweis, den der Validium-Betreiber zur Verifizierung an Ethereum übermittelt, die Integrität eines einzelnen Blocks. Wohingegen ein einzelner rekursiver Beweis verwendet werden kann, um die Gültigkeit mehrerer Validium-Blöcke gleichzeitig zu bestätigen – dies ist möglich, da die Beweisschaltung mehrere Blockbeweise rekursiv zu einem finalen Beweis aggregieren kann. Wenn der Verifizierungsvertrag auf der Blockchain den rekursiven Beweis akzeptiert, werden alle zugrunde liegenden Blöcke sofort finalisiert.

## Vor- und Nachteile von Validium {#pros-and-cons-of-validium}

| Vorteile                                                                                                                 | Nachteile                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Validitätsnachweise erzwingen die Integrität von Off-Chain-Transaktionen und verhindern, dass Betreiber ungültige Zustandsaktualisierungen finalisieren. | Die Erstellung von Validitätsnachweisen erfordert spezielle Hardware, was ein Zentralisierungsrisiko darstellt.                                                              |
| Erhöht die Kapitaleffizienz für Nutzer (keine Verzögerungen bei der Auszahlung von Guthaben zurück zu Ethereum).                                 | Eingeschränkte Unterstützung für allgemeine Berechnungen/Smart Contracts; spezialisierte Sprachen für die Entwicklung erforderlich.                                             |
| Nicht anfällig für bestimmte wirtschaftliche Angriffe, denen auf Betrugsnachweisen basierende Systeme bei hochwertigen Anwendungen ausgesetzt sind.                | Hohe Rechenleistung zur Generierung von ZK-Beweisen erforderlich; nicht kosteneffizient für Anwendungen mit geringem Durchsatz.                                         |
| Reduziert Gasgebühren für Nutzer, da keine Calldata im Ethereum-Mainnet gepostet werden.                                                  | Langsamere subjektive Finalitätszeit (10-30 Min. zur Generierung eines ZK-Beweises), aber schnellere vollständige Finalität, da es keine Verzögerung durch Streitbeilegungszeiten gibt.               |
| Geeignet für spezifische Anwendungsfälle wie Trading oder Blockchain-Gaming, die Transaktionsdatenschutz und Skalierbarkeit priorisieren.  | Nutzer können daran gehindert werden, Guthaben abzuheben, da die Generierung von Merkle-Eigentumsbeweisen erfordert, dass Off-Chain-Daten jederzeit verfügbar sind.      |
| Off-Chain-Datenverfügbarkeit bietet ein höheres Maß an Durchsatz und erhöht die Skalierbarkeit.                              | Das Sicherheitsmodell beruht auf Vertrauensannahmen und kryptografisch-ökonomischen Anreizen, im Gegensatz zu ZK-Rollups, die sich rein auf kryptografische Sicherheitsmechanismen verlassen. |

### Validium/Volitions nutzen {#use-validium-and-volitions}

Mehrere Projekte bieten Implementierungen von Validium und Volitions, die Sie in Ihre Dapps integrieren können:

**StarkWare StarkEx** - _StarkEx ist eine Skalierbarkeitslösung für Ethereum Ebene 2 (L2), die auf Validitätsnachweisen basiert. Sie kann entweder im ZK-Rollup- oder im Validium-Datenverfügbarkeitsmodus betrieben werden._

- [Dokumentation](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [Website](https://starkware.co/starkex/)

**Matter Labs zkPorter** - _zkPorter ist ein Skalierungsprotokoll der Ebene 2, das die Datenverfügbarkeit mit einem hybriden Ansatz angeht, der die Ideen von zkRollup und Sharding kombiniert. Es kann beliebig viele Shards unterstützen, von denen jeder seine eigene Datenverfügbarkeitsrichtlinie hat._

- [Blog](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Dokumentation](https://docs.zksync.io/zksync-protocol/rollup/data-availability)
- [Website](https://zksync.io/)

## Weiterführende Literatur {#further-reading}

- [Validium And The Layer 2 Two-By-Two — Issue No. 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [ZK-rollups vs Validium](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Volition and the Emerging Data Availability spectrum](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [The Practical Guide to Ethereum Rollups](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)