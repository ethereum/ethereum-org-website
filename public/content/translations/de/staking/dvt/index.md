---
title: Verteilte Validator-Technologie
description: "Die verteilte Validator-Technologie ermöglicht den verteilten Betrieb eines Ethereum-Validators durch mehrere Parteien."
lang: de
---

# Verteilte Validator-Technologie {#distributed-validator-technology}

Die verteilte Validator-Technologie (DVT) ist ein Ansatz zur Validator-Sicherheit, der die Schlüsselverwaltung und die Signaturverantwortlichkeiten auf mehrere Parteien verteilt, um Single Points of Failure (einzelne Ausfallpunkte) zu reduzieren und die Ausfallsicherheit der Validatoren zu erhöhen.

Dies geschieht durch die **Aufteilung des Private-Keys**, der zur Sicherung eines Validators verwendet wird, **auf viele Computer**, die in einem „Cluster“ organisiert sind. Der Vorteil dabei ist, dass es für Angreifer sehr schwierig wird, Zugriff auf den Schlüssel zu erhalten, da er auf keiner einzelnen Maschine vollständig gespeichert ist. Es ermöglicht auch, dass einige Blockchain-Knoten offline gehen können, da die erforderliche Signatur von einer Teilmenge der Maschinen in jedem Cluster durchgeführt werden kann. Dies reduziert einzelne Ausfallpunkte im Netzwerk und macht das gesamte Validator-Set robuster.

![Ein Diagramm, das zeigt, wie ein einzelner Validator-Schlüssel in Schlüsselanteile aufgeteilt und an mehrere Blockchain-Knoten mit unterschiedlichen Komponenten verteilt wird.](./dvt-cluster.png)

## Warum brauchen wir DVT? {#why-do-we-need-dvt}

### Sicherheit {#security}

Validatoren generieren zwei Public-Key- und Private-Key-Paare: Validator-Schlüssel für die Teilnahme am Konsens und Auszahlungsschlüssel für den Zugriff auf Gelder. Während Validatoren Auszahlungsschlüssel im Cold Storage (kalter Speicher) sichern können, müssen Validator-Private-Keys rund um die Uhr online sein. Wenn ein Validator-Private-Key kompromittiert wird, kann ein Angreifer den Validator kontrollieren, was möglicherweise zum Slashing oder zum Verlust der ETH des Stakers führt. DVT kann helfen, dieses Risiko zu mindern. Und so funktioniert es:

Durch die Verwendung von DVT können Staker am Staking teilnehmen, während sie den Validator-Private-Key im Cold Storage aufbewahren. Dies wird erreicht, indem der ursprüngliche, vollständige Validator-Schlüssel verschlüsselt und dann in Schlüsselanteile aufgeteilt wird. Die Schlüsselanteile verbleiben online und werden an mehrere Blockchain-Knoten verteilt, was den verteilten Betrieb des Validators ermöglicht. Dies ist möglich, da [Ethereum](/) Validatoren BLS-Signaturen verwenden, die additiv sind, was bedeutet, dass der vollständige Schlüssel durch Summieren seiner Bestandteile rekonstruiert werden kann. Dies ermöglicht es dem Staker, den vollständigen, ursprünglichen „Master“-Validator-Schlüssel sicher offline zu halten.

### Keine Single Points of Failure {#no-single-point-of-failure}

Wenn ein Validator auf mehrere Betreiber und mehrere Maschinen aufgeteilt ist, kann er individuellen Hardware- und Softwareausfällen standhalten, ohne offline zu gehen. Das Ausfallrisiko kann auch durch die Verwendung unterschiedlicher Hardware- und Softwarekonfigurationen über die Blockchain-Knoten in einem Cluster hinweg reduziert werden. Diese Ausfallsicherheit ist für Validator-Konfigurationen mit nur einem Blockchain-Knoten nicht verfügbar – sie stammt aus der DVT-Ebene.

Wenn eine der Komponenten einer Maschine in einem Cluster ausfällt (zum Beispiel, wenn es vier Betreiber in einem Validator-Cluster gibt und einer eine bestimmte Anwendung verwendet, die einen Fehler hat), stellen die anderen sicher, dass der Validator weiterläuft.

### Dezentralisierung {#decentralization}

Das ideale Szenario für Ethereum ist es, so viele unabhängig betriebene Validatoren wie möglich zu haben. Einige Staking-Anbieter sind jedoch sehr beliebt geworden und machen einen erheblichen Teil der gesamten gestakten ETH im Netzwerk aus. DVT kann es diesen Betreibern ermöglichen zu existieren, während die Dezentralisierung des Einsatzes erhalten bleibt. Dies liegt daran, dass die Schlüssel für jeden Validator auf viele Maschinen verteilt sind und es einer viel größeren Absprache bedürfte, damit ein Validator bösartig wird.

Ohne DVT ist es für Staking-Anbieter einfacher, nur ein oder zwei Anwendungskonfigurationen für all ihre Validatoren zu unterstützen, was die Auswirkungen eines Anwendungsfehlers erhöht. DVT kann verwendet werden, um das Risiko auf mehrere Anwendungskonfigurationen und unterschiedliche Hardware zu verteilen und so Ausfallsicherheit durch Vielfalt zu schaffen.

**DVT bietet Ethereum die folgenden Vorteile:**

1. **Dezentralisierung** des Proof-of-Stake-Konsenses von Ethereum
2. Stellt die **Lebendigkeit (Liveness)** des Netzwerks sicher
3. Schafft **Fehlertoleranz** für Validatoren
4. **Vertrauensminimierter** Validator-Betrieb
5. **Minimierte Slashing-** und Ausfallrisiken
6. **Verbessert die Vielfalt** (Anwendung, Rechenzentrum, Standort, Regulierung usw.)
7. **Erhöhte Sicherheit** der Validator-Schlüsselverwaltung

## Wie funktioniert DVT? {#how-does-dvt-work}

Eine DVT-Lösung enthält die folgenden Komponenten:

- **[Shamirs Secret Sharing](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Validatoren verwenden [BLS-Schlüssel](https://en.wikipedia.org/wiki/BLS_digital_signature). Einzelne BLS-„Schlüsselanteile“ („key shares“) können zu einem einzigen aggregierten Schlüssel (Signatur) kombiniert werden. Bei DVT ist der Private-Key für einen Validator die kombinierte BLS-Signatur jedes Betreibers im Cluster.
- **[Schwellenwert-Signaturschema (Threshold signature scheme)](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Bestimmt die Anzahl der einzelnen Schlüsselanteile, die für Signaturaufgaben erforderlich sind, z. B. 3 von 4.
- **[Verteilte Schlüsselerzeugung (Distributed key generation, DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Ein kryptografischer Prozess, der die Schlüsselanteile generiert und verwendet wird, um die Anteile eines bestehenden oder neuen Validator-Schlüssels an die Blockchain-Knoten in einem Cluster zu verteilen.
- **[Sichere Mehrparteienberechnung (Multiparty computation, MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - Der vollständige Validator-Schlüssel wird im Geheimen mithilfe der Mehrparteienberechnung generiert. Der vollständige Schlüssel ist keinem einzelnen Betreiber jemals bekannt – sie kennen immer nur ihren eigenen Teil davon (ihren „Anteil“).
- **Konsensprotokoll** - Das Konsensprotokoll wählt einen Blockchain-Knoten als Block-Vorschlagenden aus. Dieser teilt den Block mit den anderen Blockchain-Knoten im Cluster, die ihre Schlüsselanteile zur aggregierten Signatur hinzufügen. Wenn genügend Schlüsselanteile aggregiert wurden, wird der Block auf Ethereum vorgeschlagen.

Verteilte Validatoren verfügen über eine eingebaute Fehlertoleranz und können weiterlaufen, selbst wenn einige der einzelnen Blockchain-Knoten offline gehen. Das bedeutet, dass der Cluster widerstandsfähig ist, selbst wenn sich einige der darin befindlichen Blockchain-Knoten als bösartig oder träge erweisen.

## DVT-Anwendungsfälle {#dvt-use-cases}

DVT hat erhebliche Auswirkungen auf die breitere Staking-Branche:

### Solo-Staker {#solo-stakers}

DVT ermöglicht auch nicht-verwahrendes Staking, indem es Ihnen erlaubt, Ihren Validator-Schlüssel auf entfernte Blockchain-Knoten zu verteilen, während der vollständige Schlüssel komplett offline bleibt. Dies bedeutet, dass Home-Staker nicht unbedingt in Hardware investieren müssen, während die Verteilung der Schlüsselanteile dazu beitragen kann, sie gegen potenzielle Hacks zu stärken.

### Staking as a Service (SaaS) {#saas}

Betreiber (wie Staking-Pools und institutionelle Staker), die viele Validatoren verwalten, können DVT nutzen, um ihr Risiko zu reduzieren. Durch die Verteilung ihrer Infrastruktur können sie ihren Betrieben Redundanz hinzufügen und die Arten der von ihnen verwendeten Hardware diversifizieren.

DVT teilt die Verantwortung für die Schlüsselverwaltung auf mehrere Blockchain-Knoten auf, was bedeutet, dass auch einige Betriebskosten geteilt werden können. DVT kann zudem das operationelle Risiko und die Versicherungskosten für Staking-Anbieter senken.

### Staking-Pools {#staking-pools}

Aufgrund von Standard-Validator-Setups sind Staking-Pools und Liquid-Staking-Anbieter gezwungen, ein unterschiedliches Maß an Vertrauen in einzelne Betreiber zu setzen, da Gewinne und Verluste im gesamten Pool sozialisiert werden. Sie sind auch darauf angewiesen, dass die Betreiber die Signaturschlüssel schützen, da es für sie bisher keine andere Option gab.

Auch wenn traditionell Anstrengungen unternommen werden, das Risiko durch die Verteilung der Einsätze auf mehrere Betreiber zu streuen, verwaltet jeder Betreiber immer noch unabhängig einen erheblichen Einsatz. Sich auf einen einzigen Betreiber zu verlassen, birgt immense Risiken, wenn dieser schlechte Leistungen erbringt, Ausfallzeiten hat, kompromittiert wird oder böswillig handelt.

Durch die Nutzung von DVT wird das von den Betreibern geforderte Vertrauen erheblich reduziert. **Pools können es Betreibern ermöglichen, Einsätze zu halten, ohne die Verwahrung von Validator-Schlüsseln zu benötigen** (da nur Schlüsselanteile verwendet werden). Es ermöglicht auch, verwaltete Einsätze auf mehr Betreiber zu verteilen (z. B. anstatt dass ein einzelner Betreiber 1000 Validatoren verwaltet, ermöglicht DVT, dass diese Validatoren kollektiv von mehreren Betreibern betrieben werden). Vielfältige Betreiberkonfigurationen stellen sicher, dass, falls ein Betreiber ausfällt, die anderen weiterhin in der Lage sind, Bestätigungen vorzunehmen. Dies führt zu Redundanz und Diversifizierung, was eine bessere Leistung und Ausfallsicherheit zur Folge hat, während die Belohnungen maximiert werden.

Ein weiterer Vorteil der Minimierung des Vertrauens in einzelne Betreiber besteht darin, dass Staking-Pools eine offenere und erlaubnisfreie Teilnahme von Betreibern ermöglichen können. Auf diese Weise können Dienste ihr Risiko reduzieren und die Dezentralisierung von Ethereum unterstützen, indem sie sowohl kuratierte als auch erlaubnisfreie Gruppen von Betreibern verwenden, beispielsweise durch die Paarung von Home-Stakern oder kleineren Stakern mit größeren.

## Potenzielle Nachteile der Verwendung von DVT {#potential-drawbacks-of-using-dvt}

- **Zusätzliche Komponente** - Die Einführung eines DVT-Blockchain-Knotens fügt ein weiteres Teil hinzu, das möglicherweise fehlerhaft oder anfällig sein kann. Eine Möglichkeit, dies zu mildern, besteht darin, mehrere Implementierungen eines DVT-Blockchain-Knotens anzustreben, was mehrere DVT-Anwendungen bedeutet (ähnlich wie es mehrere Anwendungen für die Konsens- und Ausführungsebene gibt).
- **Betriebskosten** - Da DVT den Validator auf mehrere Parteien verteilt, sind für den Betrieb mehr Blockchain-Knoten anstelle eines einzigen Blockchain-Knotens erforderlich, was zu erhöhten Betriebskosten führt.
- **Potenziell erhöhte Latenz** - Da DVT ein Konsensprotokoll verwendet, um einen Konsens zwischen den mehreren Blockchain-Knoten zu erzielen, die einen Validator betreiben, kann dies potenziell zu einer erhöhten Latenz führen.

## Weiterführende Literatur {#further-reading}

- [Spezifikationen für verteilte Ethereum-Validatoren (High-Level)](https://github.com/ethereum/distributed-validator-specs)
- [Technische Spezifikationen für verteilte Ethereum-Validatoren](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Demo-App für Shamirs Secret Sharing](https://iancoleman.io/shamir/)