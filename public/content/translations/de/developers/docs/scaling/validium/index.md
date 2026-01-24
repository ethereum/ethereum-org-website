---
title: Validium
description: Eine Einführung in Validium als Skalierungslösung, die derzeit von der Ethereum-Community genutzt wird.
lang: de
sidebarDepth: 3
---

Validium ist eine [Skalierungslösung](/developers/docs/scaling/), die die Integrität von Transaktionen mithilfe von Gültigkeitsnachweisen wie [ZK-Rollups](/developers/docs/scaling/zk-rollups/) gewährleistet, aber keine Transaktionsdaten auf dem Ethereum Mainnet speichert. Während die Verfügbarkeit von Off-Chain-Daten Kompromisse mit sich bringt, kann sie zu massiven Verbesserungen der Skalierbarkeit führen (Validiums können [ca. 9.000 Transaktionen oder mehr pro Sekunde](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263) verarbeiten).

## Voraussetzungen {#prerequisites}

Sie sollten unsere Seite über die [Ethereum-Skalierung](/developers/docs/scaling/) und [Layer 2](/layer-2) gelesen und verstanden haben.

## Was ist Validium? {#what-is-validium}

Validiums sind Skalierungslösungen, die Off-Chain-Datenverfügbarkeit und -berechnung nutzen, um den Durchsatz zu verbessern, indem Transaktionen außerhalb des Ethereum Mainnets verarbeitet werden. Wie Zero-Knowledge Rollups (ZK-Rollups) veröffentlichen Validiums [Zero-Knowledge-Proofs](/glossary/#zk-proof), um Off-Chain-Transaktionen auf Ethereum zu verifizieren. Dies verhindert ungültige Zustandsübergänge und verbessert die Sicherheitsgarantien einer Validium-Kette.

Diese "Gültigkeitsnachweise" können in Form von ZK-SNARKs (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) oder ZK-STARKs (Zero-Knowledge Scalable Transparent ARgument of Knowledge) vorliegen. Mehr zu [Zero-Knowledge-Proofs](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/).

Die Gelder der Validium-Nutzer werden von einem Smart Contract auf Ethereum verwaltet. Validiums bieten nahezu sofortige Auszahlungen, ähnlich wie ZK-Rollups; sobald der Gültigkeitsnachweis für eine Auszahlungsanforderung auf dem Mainnet verifiziert wurde, können Nutzer Gelder abheben, indem sie [Merkle-Nachweise](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) vorlegen. Der Merkle-Beweis überprüft, ob die Auszahlungstransaktion des Nutzers in einem verifizierten Transaktionsbatch enthalten ist, und ermöglicht es dem On-Chain-Vertrag, die Auszahlung zu bearbeiten.

Allerdings können die Gelder der Validium-Nutzer eingefroren und Auszahlungen eingeschränkt werden. Das kann passieren, wenn Datenverfügbarkeits-Manager auf der Validium-Chain die Off-Chain-State-Daten vor Nutzern zurückhalten. Ohne Zugriff auf Transaktionsdaten können die Nutzer den für den Nachweis des Eigentums an den Geldern und die Durchführung von Auszahlungen erforderlichen Merkle-Nachweis nicht berechnen.

Dies ist der Hauptunterschied zwischen Validiums und ZK-Rollups – ihre Positionen im Datenverfügbarkeitsspektrum. Beide Lösungen gehen unterschiedlich mit der Datenspeicherung um, was Auswirkungen auf Sicherheit und Vertrauenswürdigkeit hat.

## Wie interagieren Validiums mit Ethereum? Wie interagieren Validiums mit Ethereum? {#how-do-validiums-interact-with-ethereum}

Validiums sind Skalierungsprotokolle, die auf der bestehenden Ethereum-Blockchain aufgebaut sind. Obwohl die Transaktionen Off-Chain ausgeführt werden, wird eine Validium-Chain von mehreren Smart Contracts verwaltet, die im Mainnet eingesetzt sind, darunter:

1. **Verifier-Vertrag**: Der Verifier-Vertrag überprüft die Gültigkeit der vom Validium-Operator eingereichten Nachweise bei der Durchführung von Statusaktualisierungen. Das umfasst Gültigkeitsnachweise, die die Korrektheit der Offchain-Transaktionen belegen, sowie Datenverfügbarkeitsnachweise, die bestätigen, dass die Offchain-Transaktionsdaten vorhanden sind.

2. **Hauptvertrag**: Der Hauptvertrag speichert State-Commitments (Merkle-Roots), die von Block-Produzenten eingereicht werden, und aktualisiert den Status des Validiums, sobald ein Gültigkeitsnachweis on-chain verifiziert wurde. Dieser Vertrag verarbeitet auch Einzahlungen in die Validium-Kette und Abhebungen aus dieser.

Validiums verlassen sich auch auf die Haupt-Ethereum-Blockchain für Folgendes:

### Abwicklung {#settlement}

Transaktionen, die auf einem Validium ausgeführt werden, können erst vollständig bestätigt werden, wenn die Haupt-Blockchain ihre Gültigkeit überprüft hat. Alle Geschäfte, die auf einem Validium durchgeführt werden, müssen schließlich auf dem Mainnet abgewickelt werden. Die Ethereum-Blockchain bietet Validium-Nutzern auch "Settlement-Garantien", was bedeutet: Sobald Off-Chain-Transaktionen auf die Blockchain übertragen sind, können sie nicht mehr rückgängig gemacht oder verändert werden.

### Sicherheit {#security}

Ethereum, das als Abwicklungsschicht fungiert, garantiert auch die Gültigkeit der Statusübergänge auf Validium. Off-Chain-Transaktionen, die auf der Validium-Chain ausgeführt werden, werden über einen Smart Contract auf der Basis-Ethereum-Schicht verifiziert.

Hält der On-Chain-Verifizierungsvertrag den Nachweis für ungültig, werden die Transaktionen abgelehnt. Das bedeutet, dass die Betreiber die vom Ethereum-Protokoll durchgesetzten Gültigkeitsbedingungen erfüllen müssen, bevor sie den Status des Validiums aktualisieren.

## Wie funktioniert Validium? {#how-does-validium-work}

### Transaktionen {#transactions}

Benutzer übermitteln Transaktionen an den Betreiber, eine Node, der für die Ausführung von Transaktionen auf der Validium-Kette verantwortlich ist. Einige Validiums können einen einzelnen Betreiber verwenden, um die Chain auszuführen, oder sich auf einen [Proof-of-Stake (PoS)](/developers/docs/consensus-mechanisms/pos/)-Mechanismus für rotierende Betreiber verlassen.

Der Betreiber fasst Transaktionen zu einem Batch zusammen und sendet diesen an eine Beweisschaltung zur Verifizierung. Die Beweisschaltung akzeptiert das Transaktionsbatch (und andere relevante Daten) als Eingaben und gibt einen Gültigkeitsnachweis aus, der bestätigt, dass die Operationen korrekt durchgeführt wurden.

### Zustands-Commitments {#state-commitments}

Der Zustand des Validiums wird als Merkle-Baum gehasht, wobei die Wurzel im Hauptvertrag auf Ethereum gespeichert wird. Die Merkle-Wurzel, auch bekannt als Zustandswurzel, dient als kryptografische Verpflichtung zum aktuellen Zustand der Konten und Salden auf dem Validium.

Um den Zustand zu aktualisieren, muss der Betreiber (nachdem er Transaktionen ausgeführt hat) einen neuen Zustands-Hashwert (State-Root) berechnen und diesen an den On-Chain-Vertrag übermitteln. Wenn der Gültigkeitsnachweis erfolgreich ist, wird der vorgeschlagene Zustand akzeptiert und das Validium wechselt zum neuen Zustands-Root.

### Einzahlungen und Auszahlungen {#deposits-and-withdrawals}

Nutzer verschieben ihre Gelder von Ethereum auf ein Validium, indem sie ETH (oder irgendeinen ERC-kompatiblen Token) im On-Chain-Vertrag einzahlen. Der Vertrag leitet das Einzahlungsereignis Off-Chain an das Validium weiter, wo die Adresse des Benutzers mit einem Betrag gutgeschrieben wird, der seiner Einzahlung entspricht. Der Betreiber fügt diese Einzahlungstransaktion auch einem neuen Batch hinzu.

Um Gelder zurück ins Mainnet zu bewegen, initiiert ein Validium-Benutzer eine Auszahlungstransaktion und übermittelt sie an den Betreiber, der die Auszahlungsanfrage validiert und sie in einen Batch aufnimmt. Die Vermögenswerte des Benutzers auf der Validium-Chain werden ebenfalls vernichtet, bevor er das System verlassen kann. Sobald der mit dem Batch verbundene Gültigkeitsnachweis verifiziert ist, kann der Benutzer den Hauptvertrag aufrufen, um den Rest seiner ursprünglichen Einzahlung abzuheben.

Als Mechanismus gegen Zensur erlaubt das Validium-Protokoll Benutzern, sich direkt vom Validium-Vertrag auszuzahlen, ohne den Betreiber zu durchlaufen. In diesem Fall müssen Benutzer dem Verifizierungsvertrag einen Merkle-Proof vorlegen, der die Aufnahme eines Kontos in den Zustands-Root belegt. Wenn der Beweis akzeptiert wird, kann der Benutzer die Auszahlungsfunktion des Hauptvertrags aufrufen, um seine Gelder aus dem Validium auszuzahlen.

### Batch-Übermittlung {#batch-submission}

Nach der Ausführung eines Batches von Transaktionen übermittelt der Betreiber den zugehörigen Gültigkeitsnachweis an den Verifizierungsvertrag und schlägt dem Hauptvertrag einen neuen Zustands-Root vor. Wenn der Beweis gültig ist, aktualisiert der Hauptvertrag den Zustand des Validiums und finalisiert die Ergebnisse der Transaktionen im Batch.

Im Gegensatz zu einem ZK-Rollup müssen Blockproduzenten auf einem Validium keine Transaktionsdaten für Transaktions-Batches veröffentlichen (nur Block-Header). Dies macht Validium zu einem reinen Off-Chain-Skalierungsprotokoll, im Gegensatz zu „hybriden“ Skalierungsprotokollen (d. h. [Layer 2](/layer-2/)), die State-Daten auf der Ethereum-Hauptchain unter Verwendung von Blob-Daten, `calldata` oder einer Kombination aus beidem veröffentlichen.

### Datenverfügbarkeit {#data-availability}

Wie bereits erwähnt, nutzen Validiums ein Off-Chain-Datenverfügbarkeitsmodell, bei dem Betreiber alle Transaktionsdaten außerhalb des Ethereum Mainnets speichern. Der geringe Daten-Footprint von Validium in der Blockchain verbessert die Skalierbarkeit (der Durchsatz wird nicht durch die Datenverarbeitungskapazität von Ethereum begrenzt) und senkt die Nutzergebühren (die Kosten für die Veröffentlichung von Daten in der Blockchain sind geringer).

Die Off-Chain-Datenverfügbarkeit birgt jedoch ein Problem: Daten, die zum Erstellen oder Überprüfen von Merkle-Proofs erforderlich sind, sind möglicherweise nicht verfügbar. Das bedeutet, dass Nutzer möglicherweise keine Gelder aus dem On-Chain-Vertrag abheben können, falls Betreiber böswillig handeln.

Verschiedene Validium-Lösungen versuchen, dieses Problem zu lösen, indem sie die Speicherung von Zustandsdaten dezentralisieren. Dabei werden die Blockproduzenten gezwungen, die zugrunde liegenden Daten an "Datenverfügbarkeits-Manager" zu senden, die dafür zuständig sind, Off-Chain-Daten zu speichern und sie den Nutzern auf Anfrage zur Verfügung zu stellen.

Datenverfügbarkeits-Manager in Validium bestätigen die Verfügbarkeit von Daten für Off-Chain-Transaktionen, indem sie jeden Validium-Batch signieren. Diese Signaturen sind eine Art "Verfügbarkeitsnachweis", den der On-Chain-Verifizierungsvertrag prüft, bevor er Status-Updates genehmigt.

Validiums unterscheiden sich in ihrem Ansatz zur Verwaltung der Datenverfügbarkeit. Einige Validium-Lösungen verlassen sich auf vertrauenswürdige Parteien zur Speicherung der Zustandsdaten, während andere zufällig zugewiesene Validatoren für diese Aufgabe nutzen.

#### Datenverfügbarkeitskomitee (DAC) {#data-availability-committee}

Um die Verfügbarkeit von Off-Chain-Daten zu garantieren, setzen einige Validium-Lösungen eine Gruppe von vertrauenswürdigen Entitäten ein, die zusammen als Datenverfügbarkeitskomitee (DAC) bekannt sind. Diese speichern Kopien des Status und liefern Nachweise für die Datenverfügbarkeit. DACs sind einfacher zu implementieren und erfordern weniger Koordination, da die Anzahl der Mitglieder gering ist.

Allerdings müssen die Nutzer dem DAC vertrauen, dass die Daten verfügbar gemacht werden, wenn sie benötigt werden (z.B. zum Erstellen von Merkle-Beweisen). Es besteht die Möglichkeit, dass Mitglieder von Datenverfügbarkeitskomitees [von einem böswilligen Akteur kompromittiert werden](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view), der dann Off-Chain-Daten zurückhalten kann.

[Mehr über Datenverfügbarkeitskomitees in Validiums](https://medium.com/starkware/data-availability-e5564c416424).

#### Gebundene Datenverfügbarkeit {#bonded-data-availability}

Andere Validiums verlangen von den Teilnehmern, die mit der Speicherung von Offline-Daten beauftragt sind, dass sie Tokens in einem Smart Contract hinterlegen (d.h. sperren), bevor sie ihre Rollen übernehmen. Dieser Einsatz dient als "Kaution", um ehrliches Verhalten unter den Datenverfügbarkeitsmanagern zu gewährleisten und die Vertrauensannahmen zu reduzieren. Wenn diese Teilnehmer es versäumen, die Datenverfügbarkeit zu beweisen, wird die Kaution konfisziert.

Bei einem Bonded-Data-Availability-System kann grundsätzlich jeder Off-Chain-Daten speichern, sobald er den nötigen Einsatz (Stake) hinterlegt hat. Dies erweitert den Pool der möglichen Datenverfügbarkeitsmanager und reduziert die Zentralisierung, die Data Availability Committees (DACs) beeinflusst. Noch wichtiger ist, dass dieser Ansatz auf kryptowirtschaftliche Anreize setzt, um bösartiges Verhalten zu verhindern, was erheblich sicherer ist, als vertrauenswürdige Parteien damit zu beauftragen, Offline-Daten im Validium zu sichern.

[Mehr über gebundene Datenverfügbarkeit in Validiums](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf).

## Volitions und Validium {#volitions-and-validium}

Validiums bieten viele Vorteile, aber sie gehen mit Kompromissen einher (vor allem in Bezug auf die Datenverfügbarkeit). Aber wie bei vielen Skalierungslösungen sind Validiums für spezifische Anwendungsfälle geeignet – was der Grund dafür ist, warum Volitions entwickelt wurden.

Volitions kombinieren eine ZK-Rollup- und eine Validium-Kette und ermöglichen es Nutzern, zwischen den beiden Skalierungslösungen zu wechseln. Mit Volitions kannst du für bestimmte Transaktionen die Off-Chain-Datenverfügbarkeit von Validium nutzen, hast aber trotzdem die Freiheit, bei Bedarf auf eine On-Chain-Datenverfügbarkeitslösung (ZK-Rollup) umzusteigen. Dies gibt den Nutzern im Wesentlichen die Freiheit, je nach ihren individuellen Bedürfnissen und Umständen abzuwägen und die für sie passenden Kompromisse zu wählen.

Eine dezentrale Börse (DEX) könnte die skalierbare und private Infrastruktur eines Validiums für hochvolumige oder hochwertige Transaktionen bevorzugen. Gleichzeitig könnte sie ein ZK-Rollup für Nutzer verwenden, die die höheren Sicherheitsgarantien und die Vertrauenslosigkeit eines ZK-Rollups bevorzugen.

## Validiums und EVM-Kompatibilität {#validiums-and-evm-compatibility}

Ähnlich wie ZK-Rollups eignen sich Validiums hauptsächlich für einfache Anwendungen, wie zum Beispiel Token-Swaps und Zahlungen. Die Unterstützung allgemeiner Berechnungen und der Ausführung von Smart Contracts bei Validiums ist schwierig umzusetzen, da der Nachweis von [EVM](/developers/docs/evm/)-Anweisungen in einem Zero-Knowledge-Proof-Schaltkreis einen erheblichen Aufwand bedeutet.

Einige Validium-Projekte versuchen, dieses Problem zu umgehen, indem sie EVM-kompatible Sprachen (z. B. Solidity, Vyper) in benutzerdefinierten Bytecode kompilieren, der für effiziente Nachweise optimiert ist. Ein Nachteil dieses Ansatzes ist, dass neue Zero-Knowledge-Proof-fähige virtuelle Maschinen (VMs) möglicherweise nicht alle wichtigen EVM-Opcodes unterstützen, und Entwickler müssen direkt in der Hochsprache programmieren, um eine optimale Erfahrung zu gewährleisten. Dies führt zu weiteren Problemen: Es zwingt Entwickler dazu, dApps mit einem völlig neuen Entwicklungstack zu erstellen, und bricht die Kompatibilität mit der bestehenden Ethereum-Infrastruktur.

Einige Teams versuchen jedoch, bestehende EVM-Opcodes für ZK-Proof-Schaltkreise zu optimieren. Dies wird zur Entwicklung einer Zero-Knowledge Ethereum Virtual Machine (zkEVM) führen, einer EVM-kompatiblen virtuellen Maschine, die Nachweise erzeugt, um die Korrektheit der Programmausführung zu überprüfen. Mit einem zkEVM können Validium-Chains Smart Contracts Off-Chain ausführen und Gültigkeitsnachweise einreichen, um eine Off-Chain-Berechnung auf Ethereum zu verifizieren (ohne sie erneut ausführen zu müssen).

[Mehr über zkEVMs](https://www.alchemy.com/overviews/zkevm).

## Wie skalieren Validiums Ethereum? Skalierung von Ethereum mit Validiums {#scaling-ethereum-with-validiums}

### 1. Off-Chain-Datenspeicherung {#offchain-data-storage}

Layer-2-Skalierungsprojekte wie Optimistic Rollups und ZK-Rollups tauschen die unendliche Skalierbarkeit von reinen Off-Chain-Skalierungsprotokollen (z. B. [Plasma](/developers/docs/scaling/plasma/)) gegen Sicherheit ein, indem sie einige Transaktionsdaten auf L1 veröffentlichen. Das bedeutet jedoch, dass die Skalierbarkeitseigenschaften von Rollups durch die Datenbandbreite auf dem Ethereum Mainnet begrenzt sind ([Data-Sharding](/roadmap/danksharding/) schlägt aus diesem Grund eine Verbesserung der Datenspeicherkapazität von Ethereum vor).

Validiums erreichen Skalierbarkeit, indem sie alle Transaktionsdaten Off-Chain halten und nur Zustandsverpflichtungen (sowie Gültigkeitsbeweise) veröffentlichen, wenn sie Statusaktualisierungen an die Hauptkette von Ethereum übermitteln. Die Existenz von Gültigkeitsnachweisen verleiht Validiums jedoch höhere Sicherheitsgarantien als andere reine Off-Chain-Skalierungslösungen, einschließlich Plasma und [Sidechains](/developers/docs/scaling/sidechains/). Durch die Reduzierung der Datenmenge, die Ethereum verarbeiten muss, bevor Offchain-Transaktionen validiert werden, erweitern Validium-Designs den Durchsatz im Mainnet erheblich.

### 2. Rekursive Proofs {#recursive-proofs}

Ein rekursiver Beweis ist ein Gültigkeitsnachweis, der die Gültigkeit anderer Beweise überprüft. Diese „Beweise von Beweisen“ werden erzeugt, indem mehrere Beweise rekursiv aggregiert werden, bis ein finaler Beweis entsteht, der alle vorherigen Beweise verifiziert. Rekursive Beweise skalieren die Verarbeitungsgeschwindigkeit von Blockchains, indem sie die Anzahl der Transaktionen erhöhen, die pro Gültigkeitsnachweis verifiziert werden können.

In der Regel bestätigt jeder Gültigkeitsnachweis, den der Validium-Betreiber zur Überprüfung an Ethereum sendet, die Integrität eines einzelnen Blocks. Wohingegen ein einzelner rekursiver Beweis verwendet werden kann, um die Gültigkeit mehrerer Validium-Blöcke gleichzeitig zu bestätigen – dies ist möglich, da die Schaltung zur Beweiserstellung mehrere Blockbeweise rekursiv in einen finalen Beweis aggregieren kann. Wenn der On-Chain-Verifizierer-Vertrag den rekursiven Beweis akzeptiert, werden alle zugrunde liegenden Blöcke sofort finalisiert.

## Vor- und Nachteile von Validium {#pros-and-cons-of-validium}

| Pro                                                                                                                                                                       | Nachteile                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gültigkeitsbeweise gewährleisten die Integrität von Off-Chain-Transaktionen und verhindern, dass Betreiber ungültige Statusaktualisierungen finalisieren. | Die Erstellung von Gültigkeitsnachweisen erfordert spezielle Hardware, was ein Zentralisierungsrisiko darstellt.                                                                                                |
| Erhöht die Kapitaleffizienz für Benutzer (keine Verzögerungen beim Zurückziehen von Geldern nach Ethereum)                                             | Eingeschränkte Unterstützung für allgemeine Berechnungen/Smart Contracts; spezialisierte Sprachen sind für die Entwicklung erforderlich.                                                                        |
| Nicht anfällig für bestimmte wirtschaftliche Angriffe, wie Betrugsnachweis-basierte Systeme in hochwertigen Anwendungen.                                  | Hohe Rechenleistung erforderlich, um ZK-Nachweise zu generieren; nicht kosteneffektiv für Anwendungen mit geringer Durchsatzrate.                                                                               |
| Reduziert die Gasgebühren für Benutzer, indem keine Calldaten auf dem Ethereum-Mainnet veröffentlicht werden.                                             | Langsamere subjektive Finalitätszeit (10-30 Minuten, um einen ZK-Nachweis zu generieren), aber schneller bis zur vollständigen Finalität, da es keine Verzögerung durch Streitigkeiten gibt. |
| Geeignet für spezifische Anwendungsfälle wie Handel oder Blockchain-Gaming, bei denen die Transaktionsprivatsphäre und Skalierbarkeit priorisiert werden. | Nutzern kann die Auszahlung von Geldern verwehrt werden, da das Erzeugen von Merkle-Nachweisen des Eigentums jederzeit verfügbare Off-Chain-Daten erfordert.                                                    |
| Die Verfügbarkeit von Offchain-Daten ermöglicht höhere Durchsatzraten und steigert die Skalierbarkeit.                                                    | Das Sicherheitsmodell beruht auf Vertrauensannahmen und kryptoökonomischen Anreizen, im Gegensatz zu ZK-Rollups, die ausschließlich auf kryptografischen Sicherheitsmechanismen basieren.                       |

### Validium/Volitions verwenden {#use-validium-and-volitions}

Mehrere Projekte bieten Implementierungen von Validium und Volitions an, die Sie in Ihre Dapps integrieren können:

**StarkWare StarkEx** – _StarkEx ist eine Ethereum Layer 2 (L2) Skalierungslösung, die auf Gültigkeitsnachweisen basiert. Es kann entweder im ZK-Rollup oder im Validium Datenverfügbarkeitsmodus betrieben werden._

- [Dokumentation](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [Website](https://starkware.co/starkex/)

**Matter Labs zkPorter** – _zkPorter ist ein Layer-2-Skalierungsprotokoll, das die Datenverfügbarkeit mit einem hybriden Ansatz angeht, der die Ideen von zkRollup und Sharding kombiniert. Es kann beliebig viele Shards unterstützen, jeder mit seiner eigenen Datenverfügbarkeitsrichtlinie._

- [Blog](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Dokumentation](https://docs.zksync.io/zksync-protocol/rollup/data-availability)
- [Website](https://zksync.io/)

## Weiterführende Lektüre {#further-reading}

- [Validium And The Layer 2 Two-By-Two – Issue No. 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [ZK-rollups vs Validium](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Volition and the Emerging Data Availability spectrum](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [Rollups, Validiums, and Volitions: Learn About the Hottest Ethereum Scaling Solutions](https://www.defipulse.com/blog/rollups-validiums-and-volitions-learn-about-the-hottest-ethereum-scaling-solutions)
- [Der praktische Leitfaden für Ethereum-Rollups](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
