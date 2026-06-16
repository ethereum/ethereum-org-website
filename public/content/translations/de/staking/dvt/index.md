---
title: Verteilte Validator-Technologie
description: Die verteilte Validator-Technologie ermöglicht den verteilten Betrieb eines Ethereum-Validators durch mehrere Parteien.
lang: de
---

Die verteilte Validator-Technologie (DVT) ist ein Ansatz zur Validator-Sicherheit, der die Schlüsselverwaltung und die Verantwortlichkeiten für das Signieren auf mehrere Parteien verteilt, um Single Points of Failure (einzelne Ausfallpunkte) zu reduzieren und die Ausfallsicherheit des Validators zu erhöhen.

Dies geschieht durch die **Aufteilung des privaten Schlüssels**, der zur Sicherung eines Validators verwendet wird, **auf viele Computer**, die in einem „Cluster“ organisiert sind. Der Vorteil dabei ist, dass es für Angreifer sehr schwierig wird, Zugriff auf den Schlüssel zu erlangen, da er auf keiner einzelnen Maschine vollständig gespeichert ist. Es ermöglicht auch, dass einige Knoten offline gehen können, da das erforderliche Signieren von einer Teilmenge der Maschinen in jedem Cluster durchgeführt werden kann. Dies reduziert Single Points of Failure im Netzwerk und macht das gesamte Validator-Set robuster.

![A Diagram showing how a single validator key is split into key shares and distributed to multiple nodes with varying components.](./dvt-cluster.png)

## Warum brauchen wir DVT? {#why-do-we-need-dvt}

### Sicherheit {#security}

Validatoren generieren zwei öffentlich-private Schlüsselpaare: Validator-Schlüssel für die Teilnahme am Konsens und Abhebungsschlüssel für den Zugriff auf die Mittel. Während Validatoren Abhebungsschlüssel im Cold Storage (kalte Speicherung) sichern können, müssen private Validator-Schlüssel rund um die Uhr online sein. Wenn ein privater Validator-Schlüssel kompromittiert wird, kann ein Angreifer den Validator kontrollieren, was möglicherweise zu Slashing oder dem Verlust der ETH des Stakers führt. DVT kann helfen, dieses Risiko zu mindern. Und so funktioniert es:

Durch die Verwendung von DVT können Staker am Staking teilnehmen, während sie den privaten Validator-Schlüssel im Cold Storage aufbewahren. Dies wird erreicht, indem der ursprüngliche, vollständige Validator-Schlüssel verschlüsselt und dann in Schlüsselanteile (Key Shares) aufgeteilt wird. Die Schlüsselanteile sind online und werden auf mehrere Knoten verteilt, was den verteilten Betrieb des Validators ermöglicht. Dies ist möglich, weil [Ethereum](/)-Validatoren BLS-Signaturen verwenden, die additiv sind, was bedeutet, dass der vollständige Schlüssel durch Summieren seiner Bestandteile rekonstruiert werden kann. Dies ermöglicht es dem Staker, den vollständigen, ursprünglichen „Master“-Validator-Schlüssel sicher offline zu halten.

### Keine Single Points of Failure {#no-single-point-of-failure}

Wenn ein Validator auf mehrere Betreiber und mehrere Maschinen aufgeteilt ist, kann er einzelnen Hardware- und Softwareausfällen standhalten, ohne offline zu gehen. Das Ausfallrisiko kann auch durch die Verwendung unterschiedlicher Hardware- und Softwarekonfigurationen über die Knoten in einem Cluster hinweg verringert werden. Diese Ausfallsicherheit ist bei Validator-Konfigurationen mit nur einem Knoten nicht gegeben – sie entsteht durch die DVT-Schicht.

Wenn eine der Komponenten einer Maschine in einem Cluster ausfällt (zum Beispiel, wenn es vier Betreiber in einem Validator-Cluster gibt und einer einen bestimmten Client verwendet, der einen Fehler hat), stellen die anderen sicher, dass der Validator weiterläuft.

### Dezentralisierung {#decentralization}

Das ideale Szenario für Ethereum ist es, so viele unabhängig betriebene Validatoren wie möglich zu haben. Einige Staking-Anbieter sind jedoch sehr beliebt geworden und machen einen erheblichen Teil der gesamten gestakten ETH im Netzwerk aus. DVT kann es diesen Betreibern ermöglichen zu existieren, während die Dezentralisierung des Stakes erhalten bleibt. Dies liegt daran, dass die Schlüssel für jeden Validator auf viele Maschinen verteilt sind und es einer viel größeren Absprache bedürfte, damit ein Validator bösartig wird.

Ohne DVT ist es für Staking-Anbieter einfacher, nur ein oder zwei Client-Konfigurationen für all ihre Validatoren zu unterstützen, was die Auswirkungen eines Client-Fehlers erhöht. DVT kann verwendet werden, um das Risiko auf mehrere Client-Konfigurationen und unterschiedliche Hardware zu verteilen und so Ausfallsicherheit durch Vielfalt zu schaffen.

**DVT bietet Ethereum die folgenden Vorteile:**

1. **Dezentralisierung** des Proof-of-Stake-Konsenses von Ethereum
2. Stellt die **Liveness** (Verfügbarkeit) des Netzwerks sicher
3. Schafft **Fehlertoleranz** für Validatoren
4. **Vertrauensminimierter** Validator-Betrieb
5. **Minimierte Risiken** für Slashing und Ausfallzeiten
6. **Verbessert die Vielfalt** (Client, Rechenzentrum, Standort, Regulierung usw.)
7. **Erhöhte Sicherheit** bei der Verwaltung von Validator-Schlüsseln

## Wie funktioniert DVT? {#how-does-dvt-work}

Eine DVT-Lösung umfasst die folgenden Komponenten:

- **[Shamir's Secret Sharing](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** – Validatoren verwenden [BLS-Schlüssel](https://en.wikipedia.org/wiki/BLS_digital_signature). Einzelne BLS-„Schlüsselanteile“ („Key Shares“) können zu einem einzigen aggregierten Schlüssel (Signatur) kombiniert werden. Bei DVT ist der private Schlüssel für einen Validator die kombinierte BLS-Signatur jedes Betreibers im Cluster.
- **[Schwellenwert-Signaturverfahren (Threshold Signature Scheme)](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** – Bestimmt die Anzahl der einzelnen Schlüsselanteile, die für Signieraufgaben erforderlich sind, z. B. 3 von 4.
- **[Verteilte Schlüsselerzeugung (Distributed Key Generation, DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** – Ein kryptografischer Prozess, der die Schlüsselanteile generiert und verwendet wird, um die Anteile eines bestehenden oder neuen Validator-Schlüssels auf die Knoten in einem Cluster zu verteilen.
- **[Sichere Mehrparteienberechnung (Multiparty Computation, MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** – Der vollständige Validator-Schlüssel wird im Geheimen mithilfe von Mehrparteienberechnung generiert. Der vollständige Schlüssel ist keinem einzelnen Betreiber jemals bekannt – sie kennen immer nur ihren eigenen Teil davon (ihren „Anteil“).
- **Konsens-Protokoll** – Das Konsens-Protokoll wählt einen Knoten als Block-Proposer aus. Dieser teilt den Block mit den anderen Knoten im Cluster, die ihre Schlüsselanteile zur aggregierten Signatur hinzufügen. Wenn genügend Schlüsselanteile aggregiert wurden, wird der Block auf Ethereum vorgeschlagen.

Verteilte Validatoren verfügen über eine eingebaute Fehlertoleranz und können weiterlaufen, selbst wenn einige der einzelnen Knoten offline gehen. Das bedeutet, dass der Cluster ausfallsicher ist, selbst wenn sich einige der darin befindlichen Knoten als bösartig oder inaktiv erweisen.

## DVT-Anwendungsfälle {#dvt-use-cases}

DVT hat erhebliche Auswirkungen auf die breitere Staking-Branche:

### Solo-Staker {#solo-stakers}

DVT ermöglicht auch nicht-verwahrendes Staking, indem es Ihnen erlaubt, Ihren Validator-Schlüssel auf entfernte Knoten zu verteilen, während der vollständige Schlüssel komplett offline bleibt. Das bedeutet, dass Home-Staker nicht zwingend in Hardware investieren müssen, während die Verteilung der Schlüsselanteile dazu beitragen kann, sie gegen potenzielle Hacks abzusichern.

### Staking as a Service (SaaS) {#saas}

Betreiber (wie Staking-Pools und institutionelle Staker), die viele Validatoren verwalten, können DVT nutzen, um ihr Risiko zu reduzieren. Durch die Verteilung ihrer Infrastruktur können sie ihren Abläufen Redundanz hinzufügen und die Arten der verwendeten Hardware diversifizieren.

DVT teilt die Verantwortung für die Schlüsselverwaltung auf mehrere Knoten auf, was bedeutet, dass auch einige Betriebskosten geteilt werden können. DVT kann zudem das operationelle Risiko und die Versicherungskosten für Staking-Anbieter senken.

### Staking-Pools {#staking-pools}

Aufgrund von Standard-Validator-Setups sind Staking-Pools und Liquid Staking-Anbieter gezwungen, ein unterschiedliches Maß an Vertrauen in einzelne Betreiber zu setzen, da Gewinne und Verluste im gesamten Pool sozialisiert werden. Sie sind auch darauf angewiesen, dass die Betreiber die Signierschlüssel schützen, da es für sie bisher keine andere Option gab.

Auch wenn traditionell Anstrengungen unternommen werden, das Risiko durch die Verteilung von Stakes auf mehrere Betreiber zu streuen, verwaltet jeder Betreiber immer noch unabhängig einen erheblichen Stake. Sich auf einen einzigen Betreiber zu verlassen, birgt immense Risiken, wenn dieser schlechte Leistung erbringt, Ausfallzeiten hat, kompromittiert wird oder bösartig handelt.

Durch die Nutzung von DVT wird das von den Betreibern geforderte Vertrauen erheblich reduziert. **Pools können es Betreibern ermöglichen, Stakes zu halten, ohne die Verwahrung von Validator-Schlüsseln zu benötigen** (da nur Schlüsselanteile verwendet werden). Es ermöglicht auch, verwaltete Stakes auf mehr Betreiber zu verteilen (z. B. anstatt dass ein einzelner Betreiber 1000 Validatoren verwaltet, ermöglicht DVT, dass diese Validatoren kollektiv von mehreren Betreibern betrieben werden). Vielfältige Betreiberkonfigurationen stellen sicher, dass, falls ein Betreiber ausfällt, die anderen weiterhin in der Lage sind, zu attestieren. Dies führt zu Redundanz und Diversifizierung, was eine bessere Leistung und Ausfallsicherheit zur Folge hat und gleichzeitig die Belohnungen maximiert.

Ein weiterer Vorteil der Minimierung des Vertrauens in einzelne Betreiber besteht darin, dass Staking-Pools eine offenere und erlaubnisfreie Teilnahme von Betreibern ermöglichen können. Dadurch können Dienste ihr Risiko reduzieren und die Dezentralisierung von Ethereum unterstützen, indem sie sowohl kuratierte als auch erlaubnisfreie Gruppen von Betreibern nutzen, beispielsweise durch die Kombination von Home-Stakern oder kleineren Stakern mit größeren.

## Potenzielle Nachteile der Verwendung von DVT {#potential-drawbacks-of-using-dvt}

- **Zusätzliche Komponente** – Die Einführung eines DVT-Knotens fügt ein weiteres Teil hinzu, das möglicherweise fehlerhaft oder anfällig sein kann. Eine Möglichkeit, dies zu mindern, besteht darin, mehrere Implementierungen eines DVT-Knotens anzustreben, was mehrere DVT-Clients bedeutet (ähnlich wie es mehrere Clients für die Konsens- und Ausführungsschichten gibt).
- **Betriebskosten** – Da DVT den Validator auf mehrere Parteien verteilt, sind für den Betrieb mehr Knoten anstelle eines einzigen Knotens erforderlich, was zu erhöhten Betriebskosten führt.
- **Potenziell erhöhte Latenz** – Da DVT ein Konsens-Protokoll verwendet, um einen Konsens zwischen den mehreren Knoten zu erzielen, die einen Validator betreiben, kann dies potenziell zu einer erhöhten Latenz führen.

## Weiterführende Literatur {#further-reading}

- [Spezifikationen für verteilte Ethereum-Validatoren (High-Level)](https://github.com/ethereum/distributed-validator-specs)
- [Technische Spezifikationen für verteilte Ethereum-Validatoren](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Demo-App für Shamir's Secret Sharing](https://iancoleman.io/shamir/)