---
title: Validium
description: Eine Einführung in Validium als Skalierungslösung, die derzeit von der Ethereum-Community genutzt wird.
lang: de
sidebarDepth: 3
---

Validium ist eine [Skalierungslösung](/developers/docs/scaling/), die die Integrität von Transaktionen mithilfe von Gültigkeitsbeweisen wie [ZK-Rollups](/developers/docs/scaling/zk-rollups/) durchsetzt, aber keine Transaktionsdaten im [Ethereum](/) Mainnet speichert. Während die offchain Datenverfügbarkeit Kompromisse mit sich bringt, kann sie zu massiven Verbesserungen der Skalierbarkeit führen (Validiums können [~9.000 Transaktionen oder mehr pro Sekunde](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263) verarbeiten).

## Voraussetzungen {#prerequisites}

Sie sollten unsere Seiten zu [Ethereum-Skalierung](/developers/docs/scaling/) und [Layer 2](/layer-2) gelesen und verstanden haben.

## Was ist Validium? {#what-is-validium}

Validiums sind Skalierungslösungen, die offchain Datenverfügbarkeit und -berechnung nutzen, um den Transaktionsdurchsatz zu verbessern, indem sie Transaktionen außerhalb des Ethereum Mainnets verarbeiten. Wie Zero-Knowledge-Rollups (ZK-Rollups) veröffentlichen Validiums [Zero-Knowledge-Beweise](/glossary/#zk-proof), um offchain Transaktionen auf Ethereum zu verifizieren. Dies verhindert ungültige Zustandsübergänge und verbessert die Sicherheitsgarantien einer Validium-Chain.

Diese „Gültigkeitsbeweise“ können in Form von ZK-SNARKs (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) oder ZK-STARKs (Zero-Knowledge Scalable Transparent ARgument of Knowledge) vorliegen. Mehr zu [Zero-Knowledge-Beweisen](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/).

Guthaben, die Validium-Nutzern gehören, werden durch einen Smart Contract auf Ethereum kontrolliert. Validiums bieten nahezu sofortige Abhebungen, ähnlich wie ZK-Rollups; sobald der Gültigkeitsbeweis für eine Abhebungsanfrage im Mainnet verifiziert wurde, können Nutzer Guthaben abheben, indem sie [Merkle-Nachweise](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) vorlegen. Der Merkle-Nachweis validiert die Aufnahme der Abhebungstransaktion des Nutzers in einen verifizierten Transaktions-Batch, wodurch der Onchain-Vertrag die Abhebung verarbeiten kann.

Allerdings können die Guthaben von Validium-Nutzern eingefroren und Abhebungen eingeschränkt werden. Dies kann passieren, wenn Datenverfügbarkeitsmanager auf der Validium-Chain den Nutzern offchain Zustandsdaten vorenthalten. Ohne Zugriff auf Transaktionsdaten können Nutzer den Merkle-Nachweis nicht berechnen, der erforderlich ist, um den Besitz von Guthaben nachzuweisen und Abhebungen auszuführen.

Dies ist der Hauptunterschied zwischen Validiums und ZK-Rollups – ihre Positionen im Spektrum der Datenverfügbarkeit. Beide Lösungen gehen die Datenspeicherung unterschiedlich an, was Auswirkungen auf die Sicherheit und Vertrauenslosigkeit hat.

## Wie interagieren Validiums mit Ethereum? {#how-do-validiums-interact-with-ethereum}

Validiums sind Skalierungsprotokolle, die auf der bestehenden Ethereum-Chain aufbauen. Obwohl sie Transaktionen offchain ausführt, wird eine Validium-Chain durch eine Sammlung von Smart Contracts verwaltet, die im Mainnet bereitgestellt werden, einschließlich:

1. **Verifizierer-Vertrag**: Der Verifizierer-Vertrag verifiziert die Gültigkeit von Beweisen, die vom Validium-Betreiber bei Zustandsaktualisierungen eingereicht werden. Dies umfasst Gültigkeitsbeweise, die die Korrektheit von offchain Transaktionen bescheinigen, und Datenverfügbarkeitsbeweise, die die Existenz von offchain Transaktionsdaten verifizieren.

2. **Hauptvertrag**: Der Hauptvertrag speichert Zustands-Commitments (Merkle-Wurzeln), die von Blockproduzenten eingereicht werden, und aktualisiert den Zustand des Validiums, sobald ein Gültigkeitsbeweis onchain verifiziert wurde. Dieser Vertrag verarbeitet auch Einzahlungen auf und Abhebungen von der Validium-Chain.

Validiums verlassen sich auch für Folgendes auf die Ethereum-Haupt-Chain:

### Abwicklung {#settlement}

Transaktionen, die auf einem Validium ausgeführt werden, können nicht vollständig bestätigt werden, bis die übergeordnete Chain ihre Gültigkeit verifiziert. Alle auf einem Validium durchgeführten Geschäfte müssen letztendlich im Mainnet abgewickelt werden. Die Ethereum-Blockchain bietet auch „Abwicklungsgarantien“ für Validium-Nutzer, was bedeutet, dass offchain Transaktionen nicht rückgängig gemacht oder geändert werden können, sobald sie onchain committet wurden.

### Sicherheit {#security}

Ethereum, das als Abwicklungsschicht fungiert, garantiert auch die Gültigkeit von Zustandsübergängen auf dem Validium. Offchain Transaktionen, die auf der Validium-Chain ausgeführt werden, werden über einen Smart Contract auf der Ethereum-Basisschicht verifiziert.

Wenn der Onchain-Verifizierer-Vertrag den Beweis als ungültig erachtet, werden die Transaktionen abgelehnt. Dies bedeutet, dass Betreiber die vom Ethereum-Protokoll durchgesetzten Gültigkeitsbedingungen erfüllen müssen, bevor sie den Zustand des Validiums aktualisieren.

## Wie funktioniert Validium? {#how-does-validium-work}

### Transaktionen {#transactions}

Nutzer senden Transaktionen an den Betreiber, einen Knoten, der für die Ausführung von Transaktionen auf der Validium-Chain verantwortlich ist. Einige Validiums verwenden möglicherweise einen einzigen Betreiber zur Ausführung der Chain oder verlassen sich auf einen [Proof-of-Stake (PoS)](/developers/docs/consensus-mechanisms/pos/)-Mechanismus für rotierende Betreiber.

Der Betreiber aggregiert Transaktionen zu einem Batch und sendet ihn zur Beweisführung an einen Beweisschaltkreis (Proving Circuit). Der Beweisschaltkreis akzeptiert den Transaktions-Batch (und andere relevante Daten) als Eingaben und gibt einen Gültigkeitsbeweis aus, der verifiziert, dass die Operationen korrekt durchgeführt wurden.

### Zustands-Commitments {#state-commitments}

Der Zustand des Validiums wird als Merkle-Baum gehasht, wobei die Wurzel im Hauptvertrag auf Ethereum gespeichert wird. Die Merkle-Wurzel, auch bekannt als Zustandswurzel (State Root), fungiert als kryptografisches Commitment für den aktuellen Zustand von Konten und Salden auf dem Validium.

Um eine Zustandsaktualisierung durchzuführen, muss der Betreiber eine neue Zustandswurzel berechnen (nach Ausführung der Transaktionen) und diese an den Onchain-Vertrag übermitteln. Wenn der Gültigkeitsbeweis erfolgreich geprüft wird, wird der vorgeschlagene Zustand akzeptiert und das Validium wechselt zur neuen Zustandswurzel.

### Einzahlungen und Abhebungen {#deposits-and-withdrawals}

Nutzer verschieben Guthaben von Ethereum auf ein Validium, indem sie ETH (oder einen beliebigen ERC-kompatiblen Token) in den Onchain-Vertrag einzahlen. Der Vertrag leitet das Einzahlungsereignis an das Validium offchain weiter, wo der Adresse des Nutzers ein Betrag in Höhe seiner Einzahlung gutgeschrieben wird. Der Betreiber nimmt diese Einzahlungstransaktion auch in einen neuen Batch auf.

Um Guthaben zurück ins Mainnet zu verschieben, initiiert ein Validium-Nutzer eine Abhebungstransaktion und sendet sie an den Betreiber, der die Abhebungsanfrage validiert und in einen Batch aufnimmt. Die Vermögenswerte des Nutzers auf der Validium-Chain werden ebenfalls zerstört, bevor sie aus dem System austreten können. Sobald der mit dem Batch verbundene Gültigkeitsbeweis verifiziert ist, kann der Nutzer den Hauptvertrag aufrufen, um den Rest seiner ursprünglichen Einzahlung abzuheben.

Als Anti-Zensur-Mechanismus ermöglicht das Validium-Protokoll den Nutzern, direkt aus dem Validium-Vertrag abzuheben, ohne über den Betreiber zu gehen. In diesem Fall müssen Nutzer dem Verifizierer-Vertrag einen Merkle-Nachweis vorlegen, der die Aufnahme eines Kontos in die Zustandswurzel zeigt. Wenn der Beweis akzeptiert wird, kann der Nutzer die Abhebungsfunktion des Hauptvertrags aufrufen, um seine Guthaben aus dem Validium abzuziehen (Austritt).

### Batch-Übermittlung {#batch-submission}

Nach der Ausführung eines Transaktions-Batches übermittelt der Betreiber den zugehörigen Gültigkeitsbeweis an den Verifizierer-Vertrag und schlägt dem Hauptvertrag eine neue Zustandswurzel vor. Wenn der Beweis gültig ist, aktualisiert der Hauptvertrag den Zustand des Validiums und macht die Ergebnisse der Transaktionen im Batch endgültig.

Im Gegensatz zu einem ZK-Rollup sind Blockproduzenten auf einem Validium nicht verpflichtet, Transaktionsdaten für Transaktions-Batches zu veröffentlichen (nur Block-Header). Dies macht Validium zu einem rein offchain Skalierungsprotokoll, im Gegensatz zu „hybriden“ Skalierungsprotokollen (d. h. [Layer 2](/layer-2/)), die Zustandsdaten auf der Ethereum-Haupt-Chain unter Verwendung von Blob-Daten, `calldata` oder einer Kombination aus beidem veröffentlichen.

### Datenverfügbarkeit {#data-availability}

Wie bereits erwähnt, nutzen Validiums ein offchain Datenverfügbarkeitsmodell, bei dem Betreiber alle Transaktionsdaten außerhalb des Ethereum Mainnets speichern. Der geringe Onchain-Datenfußabdruck von Validium verbessert die Skalierbarkeit (der Transaktionsdurchsatz wird nicht durch die Datenverarbeitungskapazität von Ethereum begrenzt) und senkt die Nutzergebühren (die Kosten für die Veröffentlichung von Daten onchain sind geringer).

Die offchain Datenverfügbarkeit stellt jedoch ein Problem dar: Daten, die zum Erstellen oder Verifizieren von Merkle-Nachweisen erforderlich sind, könnten nicht verfügbar sein. Dies bedeutet, dass Nutzer möglicherweise keine Guthaben aus dem Onchain-Vertrag abheben können, falls Betreiber böswillig handeln sollten.

Verschiedene Validium-Lösungen versuchen, dieses Problem zu lösen, indem sie die Speicherung von Zustandsdaten dezentralisieren. Dies beinhaltet, Blockproduzenten zu zwingen, die zugrunde liegenden Daten an „Datenverfügbarkeitsmanager“ zu senden, die für die Speicherung von offchain Daten verantwortlich sind und diese den Nutzern auf Anfrage zur Verfügung stellen.

Datenverfügbarkeitsmanager in Validium bescheinigen die Verfügbarkeit von Daten für offchain Transaktionen durch das Signieren jedes Validium-Batches. Diese Signaturen stellen eine Form von „Verfügbarkeitsbeweis“ dar, den der Onchain-Verifizierer-Vertrag prüft, bevor er Zustandsaktualisierungen genehmigt.

Validiums unterscheiden sich in ihrem Ansatz zum Datenverfügbarkeitsmanagement. Einige verlassen sich auf vertrauenswürdige Parteien, um Zustandsdaten zu speichern, während andere zufällig zugewiesene Validatoren für diese Aufgabe verwenden.

#### Datenverfügbarkeitskomitee (DAC) {#data-availability-committee}

Um die Verfügbarkeit von offchain Daten zu garantieren, ernennen einige Validium-Lösungen eine Gruppe vertrauenswürdiger Entitäten, die gemeinsam als Datenverfügbarkeitskomitee (DAC) bekannt sind, um Kopien des Zustands zu speichern und einen Beweis für die Datenverfügbarkeit zu erbringen. DACs sind einfacher zu implementieren und erfordern weniger Koordination, da die Mitgliederzahl gering ist.

Nutzer müssen jedoch darauf vertrauen, dass das DAC die Daten bei Bedarf zur Verfügung stellt (z. B. zur Generierung von Merkle-Nachweisen). Es besteht die Möglichkeit, dass Mitglieder von Datenverfügbarkeitskomitees [von einem böswilligen Akteur kompromittiert werden](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view), der dann offchain Daten vorenthalten kann.

[Mehr zu Datenverfügbarkeitskomitees in Validiums](https://medium.com/starkware/data-availability-e5564c416424).

#### Gebundene Datenverfügbarkeit {#bonded-data-availability}

Andere Validiums verlangen von Teilnehmern, die mit der Speicherung von Offline-Daten beauftragt sind, Token in einem Smart Contract zu staken (d. h. zu sperren), bevor sie ihre Rollen übernehmen. Dieser Stake dient als „Kaution“ (Bond), um ehrliches Verhalten unter den Datenverfügbarkeitsmanagern zu garantieren und Vertrauensannahmen zu reduzieren. Wenn diese Teilnehmer die Datenverfügbarkeit nicht nachweisen können, wird die Kaution durch Slashing bestraft.

In einem System mit gebundener Datenverfügbarkeit kann jeder beauftragt werden, offchain Daten zu halten, sobald er den erforderlichen Stake bereitstellt. Dies erweitert den Pool der in Frage kommenden Datenverfügbarkeitsmanager und reduziert die Zentralisierung, die Datenverfügbarkeitskomitees (DACs) betrifft. Noch wichtiger ist, dass dieser Ansatz auf kryptökonomischen Anreizen beruht, um böswillige Aktivitäten zu verhindern, was wesentlich sicherer ist, als vertrauenswürdige Parteien zur Sicherung von Offline-Daten im Validium zu ernennen.

[Mehr zu gebundener Datenverfügbarkeit in Validiums](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf).

## Volitions und Validium {#volitions-and-validium}

Validiums bieten viele Vorteile, bringen aber Kompromisse mit sich (insbesondere bei der Datenverfügbarkeit). Aber wie bei vielen Skalierungslösungen eignen sich Validiums für spezifische Anwendungsfälle – weshalb Volitions geschaffen wurden.

Volitions kombinieren ein ZK-Rollup und eine Validium-Chain und ermöglichen es Nutzern, zwischen den beiden Skalierungslösungen zu wechseln. Mit Volitions können Nutzer die offchain Datenverfügbarkeit von Validium für bestimmte Transaktionen nutzen, während sie die Freiheit behalten, bei Bedarf zu einer Onchain-Datenverfügbarkeitslösung (ZK-Rollup) zu wechseln. Dies gibt den Nutzern im Wesentlichen die Freiheit, Kompromisse so zu wählen, wie es ihre individuellen Umstände erfordern.

Eine dezentrale Börse (DEX) zieht es möglicherweise vor, die skalierbare und private Infrastruktur eines Validiums für hochwertige Trades zu nutzen. Sie kann auch ein ZK-Rollup für Nutzer verwenden, die die höheren Sicherheitsgarantien und die Vertrauenslosigkeit eines ZK-Rollups wünschen.

## Validiums und EVM-Kompatibilität {#validiums-and-evm-compatibility}

Wie ZK-Rollups eignen sich Validiums meist für einfache Anwendungen wie Token-Swaps und Zahlungen. Die Unterstützung allgemeiner Berechnungen und der Ausführung von Smart Contracts in Validiums ist schwer zu implementieren, angesichts des erheblichen Aufwands, [EVM](/developers/docs/evm/)-Anweisungen in einem Zero-Knowledge-Beweisschaltkreis zu beweisen.

Einige Validium-Projekte versuchen, dieses Problem zu umgehen, indem sie EVM-kompatible Sprachen (z. B. Solidity, Vyper) kompilieren, um benutzerdefinierten Bytecode zu erstellen, der für effizientes Beweisen optimiert ist. Ein Nachteil dieses Ansatzes ist, dass neue Zero-Knowledge-Beweis-freundliche VMs möglicherweise wichtige EVM-Opcodes nicht unterstützen und Entwickler für ein optimales Erlebnis direkt in der Hochsprache schreiben müssen. Dies schafft noch mehr Probleme: Es zwingt Entwickler, dezentrale Anwendungen (Dapps) mit einem völlig neuen Entwicklungs-Stack zu erstellen, und bricht die Kompatibilität mit der aktuellen Ethereum-Infrastruktur.

Einige Teams versuchen jedoch, bestehende EVM-Opcodes für ZK-Beweisschaltkreise zu optimieren. Dies wird zur Entwicklung einer Zero-Knowledge Ethereum Virtual Machine (zkEVM) führen, einer EVM-kompatiblen VM, die Beweise erstellt, um die Korrektheit der Programmausführung zu verifizieren. Mit einer zkEVM können Validium-Chains Smart Contracts offchain ausführen und Gültigkeitsbeweise einreichen, um eine offchain Berechnung auf Ethereum zu verifizieren (ohne sie erneut ausführen zu müssen).

[Mehr zu zkEVMs](https://www.alchemy.com/overviews/zkevm).

## Wie skalieren Validiums Ethereum? {#scaling-ethereum-with-validiums}

### 1. Offchain Datenspeicherung {#offchain-data-storage}

Layer-2-Skalierungsprojekte wie Optimistic Rollups und ZK-Rollups tauschen die unendliche Skalierbarkeit reiner offchain Skalierungsprotokolle (z. B. [Plasma](/developers/docs/scaling/plasma/)) gegen Sicherheit ein, indem sie einige Transaktionsdaten auf L1 veröffentlichen. Dies bedeutet jedoch, dass die Skalierbarkeitseigenschaften von Rollups durch die Datenbandbreite im Ethereum Mainnet begrenzt sind (aus diesem Grund schlägt [Data Sharding](/roadmap/danksharding/) vor, die Datenspeicherkapazität von Ethereum zu verbessern).

Validiums erreichen Skalierbarkeit, indem sie alle Transaktionsdaten offchain halten und nur Zustands-Commitments (und Gültigkeitsbeweise) posten, wenn sie Zustandsaktualisierungen an die Ethereum-Haupt-Chain weiterleiten. Die Existenz von Gültigkeitsbeweisen verleiht Validiums jedoch höhere Sicherheitsgarantien als anderen reinen offchain Skalierungslösungen, einschließlich Plasma und [Sidechains](/developers/docs/scaling/sidechains/). Indem die Datenmenge reduziert wird, die Ethereum verarbeiten muss, bevor offchain Transaktionen validiert werden, erweitern Validium-Designs den Transaktionsdurchsatz im Mainnet erheblich.

### 2. Rekursive Beweise {#recursive-proofs}

Ein rekursiver Beweis ist ein Gültigkeitsbeweis, der die Gültigkeit anderer Beweise verifiziert. Diese „Beweise von Beweisen“ werden generiert, indem mehrere Beweise rekursiv aggregiert werden, bis ein finaler Beweis erstellt ist, der alle vorherigen Beweise verifiziert. Rekursive Beweise skalieren die Verarbeitungsgeschwindigkeiten der Blockchain, indem sie die Anzahl der Transaktionen erhöhen, die pro Gültigkeitsbeweis verifiziert werden können.

Typischerweise validiert jeder Gültigkeitsbeweis, den der Validium-Betreiber zur Verifizierung an Ethereum übermittelt, die Integrität eines einzelnen Blocks. Wohingegen ein einzelner rekursiver Beweis verwendet werden kann, um die Gültigkeit mehrerer Validium-Blöcke gleichzeitig zu bestätigen – dies ist möglich, da der Beweisschaltkreis mehrere Blockbeweise rekursiv zu einem finalen Beweis aggregieren kann. Wenn der Onchain-Verifizierer-Vertrag den rekursiven Beweis akzeptiert, werden alle zugrunde liegenden Blöcke sofort endgültig gemacht.

## Vorteile und Nachteile von Validium {#pros-and-cons-of-validium}

| Vorteile                                                                                                                                                 | Nachteile                                                                                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Gültigkeitsbeweise setzen die Integrität von offchain Transaktionen durch und verhindern, dass Betreiber ungültige Zustandsaktualisierungen endgültig machen. | Die Erstellung von Gültigkeitsbeweisen erfordert spezielle Hardware, was ein Zentralisierungsrisiko darstellt.                                                                       |
| Erhöht die Kapitaleffizienz für Nutzer (keine Verzögerungen bei der Abhebung von Guthaben zurück zu Ethereum).                                           | Eingeschränkte Unterstützung für allgemeine Berechnungen/Smart Contracts; spezialisierte Sprachen für die Entwicklung erforderlich.                                                  |
| Nicht anfällig für bestimmte wirtschaftliche Angriffe, denen auf Betrugsbeweisen basierende Systeme bei hochwertigen Anwendungen ausgesetzt sind.        | Hohe Rechenleistung zur Generierung von ZK-Beweisen erforderlich; nicht kosteneffizient für Anwendungen mit geringem Transaktionsdurchsatz.                                          |
| Reduziert die Gasgebühren für Nutzer, da keine Aufrufdaten (Calldata) im Ethereum Mainnet gepostet werden.                                               | Langsamere subjektive Zeit bis zur Endgültigkeit (10-30 Min. zur Generierung eines ZK-Beweises), aber schneller zur vollständigen Endgültigkeit, da es keine Verzögerung durch Streitbeilegungszeiten gibt. |
| Geeignet für spezifische Anwendungsfälle wie Trading oder Blockchain-Gaming, die Transaktions-Privatsphäre und Skalierbarkeit priorisieren.              | Nutzer können daran gehindert werden, Guthaben abzuheben, da die Generierung von Merkle-Nachweisen für den Besitz erfordert, dass offchain Daten jederzeit verfügbar sind.           |
| Offchain Datenverfügbarkeit bietet ein höheres Maß an Transaktionsdurchsatz und erhöht die Skalierbarkeit.                                               | Das Sicherheitsmodell beruht auf Vertrauensannahmen und kryptökonomischen Anreizen, im Gegensatz zu ZK-Rollups, die sich rein auf kryptografische Sicherheitsmechanismen verlassen.  |

### Validium/Volitions nutzen {#use-validium-and-volitions}

Mehrere Projekte bieten Implementierungen von Validium und Volitions, die Sie in Ihre Dapps integrieren können:

**StarkWare StarkEx** - _StarkEx ist eine Ethereum Layer-2-Skalierbarkeitslösung (L2), die auf Gültigkeitsbeweisen basiert. Sie kann entweder im ZK-Rollup- oder im Validium-Datenverfügbarkeitsmodus betrieben werden._

- [Dokumentation](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [Website](https://starkware.co/starkex/)

**Matter Labs zkPorter**- _zkPorter ist ein Layer-2-Skalierungsprotokoll, das die Datenverfügbarkeit mit einem hybriden Ansatz angeht, der die Ideen von zkRollup und Sharding kombiniert. Es kann beliebig viele Shards unterstützen, jeder mit seiner eigenen Datenverfügbarkeitsrichtlinie._

- [Blog](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Dokumentation](https://docs.zksync.io/zksync-protocol/rollup/data-availability)
- [Website](https://zksync.io/)

## Weiterführende Literatur {#further-reading}

- [Validium und das Layer-2-Zwei-mal-Zwei — Ausgabe Nr. 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [ZK-Rollups vs. Validium](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Volition und das aufkommende Spektrum der Datenverfügbarkeit](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [Der praktische Leitfaden zu Ethereum-Rollups](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)