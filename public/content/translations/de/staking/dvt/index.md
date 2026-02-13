---
title: Verteilte Validierungstechnologie (VVT)
description: "Verteilte Validierungstechnologie (VVT) ermöglicht den verteilten Betrieb eines Ethereum-Validators durch mehrere Parteien."
lang: de
---

# Verteilte Validator-Technologie {#distributed-validator-technology}

Verteilte Validatortechnologie (VVT) ist ein Ansatz zur Sicherheit für Validatoren, bei dem die Verwaltung von Schlüsseln und die Verantwortlichkeit für Unterschriften auf mehrere Parteien verteilt wird, um einzelne Fehler zu reduzieren und die Belastbarkeit des Validators zu erhöhen.

Dies geschieht durch die **Aufteilung des privaten Schlüssels**, der zur Absicherung eines Validators verwendet wird, **auf viele Computer**, die in einem "Cluster" organisiert sind. Der Vorteil dabei: Für Angreifer wird es äußerst schwierig, Zugriff auf den Schlüssel zu erlangen, da er nicht vollständig auf einer einzigen Maschine gespeichert ist. Es ermöglicht auch, dass einige Knoten offline gehen können, da die erforderliche Signierung von einer Teilmenge der Maschinen in jedem Cluster durchgeführt werden kann. Das reduziert einzelne Fehlerpunkte im Netzwerk und macht das gesamte Validator-Set robuster.

![Ein Diagramm, das zeigt, wie ein einzelner Validator-Schlüssel in Schlüsselanteile aufgeteilt und an mehrere Knoten mit unterschiedlichen Komponenten verteilt wird.](./dvt-cluster.png)

## Wofür ist VVT erforderlich? {#why-do-we-need-dvt}

### Sicherheit {#security}

Die Validatoren generieren sowohl zwei öffentliche als auch private Schlüsselpaare: Validatorschlüssel zum Teilnehmen am Konsens und Abhebungsschlüssel zum Zugriff auf Gelder. Während die Validatoren die Abhebungsschlüssel in einem Offline-Speicher (Cold Storage) sichern können, müssen die privaten Schlüssel immer online sein. Wenn der private Schlüssel eines Validators kompromittiert wird, kann ein Angreifer den Validator kontrollieren und das kann zu "Slashing" oder zum Verlust der ETH des Stakers führen. VVT kann dabei helfen, dieses Risiko zu minimieren. Und so funktioniert es:

Durch die Verwendung von VVT können Staker am Staking teilnehmen, während sie den privaten Schlüssel des Validators im Offline-Speicher (Cold Storage) aufbewahren. Erreicht wird das, indem der ursprüngliche, vollständige Validator-Schlüssel verschlüsselt und dann in Schlüsselteile aufgeteilt wird. Die Schlüsselteile sind online und werden an mehrere Knoten verteilt, was den verteilten Betrieb des Validators ermöglicht. Das ist möglich, weil Ethereum-Validatoren BLS-Signaturen verwenden, die additiv sind, d. h. der vollständige Schlüssel kann rekonstruiert werden, indem ihre Bestandteile zusammengefügt werden. So kann der Staker den vollständigen, ursprünglichen "Master"-Validator-Schlüssel sicher offline aufbewahren.

### Keine einzelnen Ausfallpunkte {#no-single-point-of-failure}

Wenn ein Validator auf mehrere Operatoren und Maschinen verteilt ist, kann er einzelne Hardware- und Softwareausfälle überstehen, ohne offline zu gehen. Das Ausfallrisiko kann außerdem durch den Einsatz unterschiedlicher Hardware- und Softwarekonfigurationen über Knotenpunkte in einem Cluster gesenkt werden. Diese Ausfallsicherheit ist für Konfigurationen mit nur einem Knotenpunkt nicht verfügbar – sie bedingt sich durch die DVT-Schicht.

Falls eine der Maschinen innerhalb eines Clusters ausfällt (Beispiel: Von vier Operatoren innerhalb eines Validatoren-Clusters nutzt ein Nutzer einen spezifischen Client, der fehlerhaft ist), stellen die anderen sicher, dass der Validator nach wie vor läuft.

### Dezentralisierung {#decentralization}

Das ideale Szenario für Ethereum ist es, so viele unabhängig arbeitende Validatoren zu haben, wie möglich. Dennoch sind ein paar wenige Anbieter von Staking-Services sehr beliebt geworden und haben daher einen substantiellen Anteil der im Netzwerk für Staking eingesetzten ETH unter Kontrolle. Mithilfe von DVT können diese Operatoren existieren und gleichzeitig die Dezentralisierung des Staking gewährleisten. Das liegt daran, dass die Schlüssel für jeden Validator auf viele Maschinen verteilt sind und es einer viel größeren Absprache bedarf, einen Validator mit böswilligen Absichten einzusetzen.

Ohne VVT ist es für Staking-Anbieter einfacher, nur eine oder zwei Client-Konfigurationen für all ihre Validatoren zu unterstützen. Damit werden die Auswirkungen eines Fehlers einzelner Clients verstärkt. VVT kann verwendet werden, um das Risiko auf mehrere Client-Konfigurationen und unterschiedliche Hardware zu verteilen und so Widerstandsfähigkeit durch Vielfalt zu erreichen.

**VVT bietet für Ethereum folgende Vorteile:**

1. **Dezentralisierung** des Proof-of-Stake-Konsens von Ethereum
2. Gewährleistet die **Betriebsbereitschaft** des Netzwerks
3. Schafft **Fehlertoleranz** für Validatoren
4. **Vertrauensminimierter** Validator-Betrieb
5. **Minimiertes Slashing-** und Ausfallzeitenrisiko
6. **Verbesserte Vielfalt** (Client, Rechenzentrum, Standort, Regulierung usw.)
7. **Erhöhte Sicherheit** bei der Verwaltung von Validator-Schlüsseln

## Wie funktioniert VVT? {#how-does-dvt-work}

Ein VVT-Lösungsansatz beinhaltet folgende Komponenten:

- **[Shamir's Secret Sharing](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** – Validatoren verwenden [BLS-Schlüssel](https://en.wikipedia.org/wiki/BLS_digital_signature). Individuelle BLS-"Anteile eines Schlüssels" ("Schlüsselanteile") können kombiniert werden zu einem einzigen vereinigten Schlüssel (Signatur). Bei VVT ist der private Schlüssel für einen Validator die kombinierte BLS-Signatur jedes Operators im Cluster.
- **[Schwellenwert-Signaturschema](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** – Bestimmt die Anzahl der einzelnen Schlüsselanteile, die für Signieraufgaben erforderlich sind, z. B. 3 von 4.
- **[Verteilte Schlüsselgenerierung (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** – Kryptografischer Prozess, der die Schlüsselanteile generiert und dazu dient, die Anteile eines bestehenden oder neuen Validator-Schlüssels an die Knoten in einem Cluster zu verteilen.
- **[Mehrparteienberechnung (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** – Der vollständige Validator-Schlüssel wird mithilfe von Mehrparteienberechnung im Geheimen generiert. Der vollständige Schlüssel ist keinem einzelnen Betreiber bekannt – sie kennen immer nur ihren eigenen Teil (ihren "Anteil").
- **Konsensprotokoll** – Das Konsensprotokoll wählt einen Knoten aus, der den Block vorschlägt. Sie teilen den Block mit den anderen Knoten des Clusters, die ihre Schlüsselteile zur Gesamtsignatur hinzufügen. Wenn ausreichend Schlüsselteile zusammengekommen sind, wird der Block auf Ethereum vorgeschlagen.

Verteilte Validatoren verfügen über eine eingebaute Fehlertoleranz und können selbst dann weiterarbeiten, wenn einige der einzelnen Knoten offline gehen. Das bedeutet, dass der Cluster selbst dann belastbar ist, wenn sich einige der Knoten darin als böswillig oder träge erweisen.

## DVT-Anwendungsfälle {#dvt-use-cases}

VVT hat erhebliche Auswirkungen auf die breite Staking-Branche:

### Solo-Staker {#solo-stakers}

VVT ermöglicht zudem depotloses Staking, indem es ermöglicht, Validatorenschlüssel über externe Knoten zu verteilen, während der gesamte Schlüssel offline bleibt. Das bedeutet, dass Solo-Staker nicht gezwungen sind, in erheblichem Umfang in Hardware zu investieren, während sie durch die Verteilung der Schlüsselteile gegen potentielle Angriffe gestärkt sind.

### Staking als Dienstleistung (SaaS) {#saas}

Betreiber (zum Beispiel Staking-Gemeinschaften (Staking Pools) und institutionelle Staker), die viele Validatoren verwalten, können über VVT ihr eigenes Risiko senken. Durch die verteilte Infrastruktur lässt sich der Betrieb redundanter und die eingesetzte Hardware abwechslungsreich gestalten.

VVT verteilt die Verantwortung der Schlüsselverwaltung auf mehrere Knoten. So kann ein Teil der operativen Kosten geteilt werden. VVT kann zudem sowohl das Risiko als auch die Versicherungskosten für Staking-Anbieter verringern.

### Staking-Pools {#staking-pools}

Aufgrund von Standard-Validatoren sind Staking-Pools und Anbieter von Liquid Staking gezwungen, einzelen Betreibern in unterschiedlichem Maße Vertrauen entgegen zu bringen, da Gewinne und Verluste im gesamten Pool sozialisiert werden. Außerdem sind sie auf die Betreiber angewiesen, um die Signaturschlüssel zu sichern, da bis dato keine alternative Möglichkeit dazu bestand.

Auch wenn seit jeher versucht wird, das Risiko zu streuen, indem die Anteile auf mehrere Betreiber verteilt werden, verwaltet jeder Betreiber nach wie vor einen erheblichen Anteil unabhängig. Sich auf einen einzigen Betreiber zu verlassen, birgt immense Risiken, wenn dieser nicht die gewünschten Leistungen erbringt, Ausfallzeiten hat, kompromittiert wird oder mit böswilligen Absichten agiert.

Durch den Einsatz von VVT ist es in geringerem Umfang erforderlich, den Betreibern zu vertrauen. **Pools können es Betreibern ermöglichen, Stakes zu halten, ohne die Validator-Schlüssel verwahren zu müssen** (da nur Schlüsselanteile genutzt werden). Außerdem können verwaltete Einsätze auf mehrere Betreiber verteilt werden (z. B. kann ein einzelner Betreiber 1000 Validatoren verwalten, während diese Validatoren von mehreren Betreibern gemeinsam betrieben werden). Verschiedene Betreiberkonfigurationen stellen sicher, dass im Falle des Ausfalls eines Betreibers die anderen noch in der Lage sind, die Bescheinigung auszustellen. Das steigert Redundanz und Diversifizierung, die zu einer besseren Leistung und Widerstandsfähigkeit führt und gleichzeitig die Erträge maximiert.

Ein weiterer Vorteil, einem einzelnen Betreiber weniger vertrauen zu müssen, besteht darin, dass Staking-Pools eine offenere und genehmigungsfreie Teilnahme von Betreibern ermöglichen können. Auf diese Weise können Dienste ihr Risiko reduzieren und die Dezentralisierung von Ethereum unterstützen, indem sie sowohl kuratierte als auch genehmigungsfreie Gruppen von Betreibern verwenden, z. B. durch die Verbindung von Home- oder kleineren Stakern mit größeren.

## Mögliche Nachteile der DVT-Nutzung {#potential-drawbacks-of-using-dvt}

- **Zusätzliche Komponente** – Die Einführung eines DVT-Knotens fügt eine weitere Komponente hinzu, die fehlerhaft oder anfällig sein kann. Eine Möglichkeit, das abzumildern, besteht darin, mehrere Implementierungen eines VVT-Knotens anzustreben, d. h. mehrere VVT-Clients (ähnlich wie es mehrere Clients für die Konsens- und Ausführungsebene gibt).
- **Betriebskosten** – Da DVT den Validator auf mehrere Parteien verteilt, sind für den Betrieb mehr Knoten als nur ein einziger erforderlich, was zu erhöhten Betriebskosten führt.
- **Potenziell erhöhte Latenz** – Da DVT ein Konsensprotokoll verwendet, um einen Konsens zwischen den mehreren Knoten zu erreichen, die einen Validator betreiben, kann dies potenziell zu einer erhöhten Latenz führen.

## Weiterführende Lektüre {#further-reading}

- [Spezifikationen für verteilte Ethereum-Validatoren (allgemein)](https://github.com/ethereum/distributed-validator-specs)
- [Technische Spezifikationen für verteilte Ethereum-Validatoren](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Shamir Secret Sharing Demo-App](https://iancoleman.io/shamir/)
