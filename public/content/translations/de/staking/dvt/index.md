---
title: Verteilte Validator-Technologie
description: Die verteilte Validator-Technologie ermöglicht den verteilten Betrieb eines Ethereum-Validators durch mehrere Parteien.
lang: de
template: staking
sidebarDepth: 2
summaryPoints:
  - Teilt den Signierschlüssel eines Validators auf mehrere Maschinen und Betreiber auf und beseitigt so Single Points of Failure
  - Hält Validatoren bei individuellen Hardware-, Software- oder Betreiberausfällen online
  - Produktionsinfrastruktur, die heute von Solo-Stakern, Staking-Diensten und Staking-Pools genutzt wird
---

## Was ist die verteilte Validator-Technologie? {#what-is-dvt}

Die verteilte Validator-Technologie (DVT) ist ein Ansatz zur Validator-Sicherheit, der die Schlüsselverwaltung und die Verantwortlichkeiten für das Signieren auf mehrere Parteien verteilt, um Single Points of Failure zu reduzieren und die Ausfallsicherheit des Validators zu erhöhen.

DVT verteilt die Schlüsselverwaltung und das Signieren, indem der **private Schlüssel**, der zur Sicherung eines Validators verwendet wird, **auf viele Computer aufgeteilt wird**, die in einem „Cluster“ organisiert sind. Dies ermöglicht es einigen Knoten im Cluster, offline zu gehen, während der Validator-Knoten aktiv bleibt, da die notwendige Validierungsarbeit von einer Teilmenge der Maschinen in jedem Cluster erledigt werden kann. Diese Verteilung reduziert Single Points of Failure und macht den Validator robuster. Ein zusätzlicher Vorteil der Signaturverteilung von DVT ist, dass es für Angreifer sehr schwierig wird, Zugriff auf den Schlüssel zu erlangen, da er auf keiner einzelnen Maschine vollständig gespeichert ist.

![A Diagram showing how a single validator key is split into key shares and distributed to multiple nodes with varying components.](./dvt-cluster.png)

DVT ist keine separate Art des Stakings. Es ist eine Softwareschicht, die jedes Staking-Setup nutzen kann:
- [Solo-Staker](/staking/solo/) können sich zusammenschließen, um gemeinsam einen Validator zu betreiben, oder ein einzelner Solo-Staker kann DVT nutzen, um seinem Solo-Staking-Setup mehr Ausfallsicherheit zu verleihen.
- [Staking-Dienste](/staking/saas/) und [Staking-Pools](/staking/pools/) können DVT nutzen, um ihre Staking-Infrastruktur widerstandsfähiger zu machen und abzusichern, oder um den Validator-Betrieb auf viele unabhängige Betreiber zu verteilen.

## Warum brauchen wir DVT? {#why-do-we-need-dvt}

### Sicherheit {#security}

Validatoren generieren zwei öffentlich-private Schlüsselpaare: Validator-Schlüssel für die Teilnahme am Konsens und Abhebungsschlüssel für den Zugriff auf Gelder. Während Validatoren Abhebungsschlüssel im Cold Storage sichern können, müssen die privaten Validator-Schlüssel rund um die Uhr online sein, um die Aufgaben zu signieren, die dem Validator zugewiesen werden, wie z. B. Attestierungen und Block-Vorschläge. Einen Schlüssel online zu halten, setzt ihn der Gefahr eines Diebstahls aus, und DVT begrenzt dieses Risiko: Nur Schlüsselanteile sind jemals online, niemals der vollständige Schlüssel.

Wenn ein privater Validator-Schlüssel kompromittiert wird, kann ein Angreifer den Validator kontrollieren, was möglicherweise zu Slashing oder dem Verlust der ETH des Stakers führt. DVT mindert dieses Risiko. Mit DVT wird der ursprüngliche, vollständige Validator-Schlüssel verschlüsselt und in Schlüsselanteile aufgeteilt. Die Schlüsselanteile sind online und über mehrere Knoten verteilt, die den Validator gemeinsam betreiben, während der vollständige „Master“-Schlüssel sicher offline bleibt. Die Verteilung ist möglich, weil [Ethereum](/)-Validatoren BLS-Signaturen verwenden, die additiv sind, was bedeutet, dass der vollständige Schlüssel durch Summieren seiner Bestandteile rekonstruiert werden kann. Partielle Signaturen, die mit den Schlüsselanteilen erstellt wurden, verbinden sich zu einer Signatur, die für den vollständigen Schlüssel gültig ist, sodass der vollständige Schlüssel selbst für das tägliche Signieren nie benötigt wird. Wenn ein Cluster mithilfe der verteilten Schlüsselgenerierung einen neuen Validator-Schlüssel generiert, existiert der vollständige private Schlüssel niemals auf einer einzelnen Maschine.

### Keine Single Points of Failure {#no-single-point-of-failure}

Wenn ein Validator auf mehrere Betreiber und mehrere Maschinen aufgeteilt ist, kann er individuellen Hardware- und Softwareausfällen standhalten, ohne offline zu gehen. Das Ausfallrisiko kann auch durch die Verwendung unterschiedlicher Hardware- und Softwarekonfigurationen über die Knoten in einem Cluster hinweg reduziert werden. Die Verteilung auf mehrere Betreiber ist für Einzelknoten-Validator-Konfigurationen nicht nativ verfügbar; sie stammt aus der DVT-Middleware-Schicht.

Wenn eine der Komponenten einer Maschine in einem Cluster ausfällt (zum Beispiel, wenn es vier Betreiber in einem Validator-Cluster gibt und einer einen bestimmten Client verwendet, der einen Fehler hat), können die anderen sicherstellen, dass der Validator weiterläuft.

### Dezentralisierung {#decentralization}

Das ideale Szenario für Ethereum ist es, so viele unabhängig betriebene Validatoren wie möglich zu haben. Einige Staking-Anbieter sind jedoch sehr beliebt geworden und machen einen erheblichen Teil der gesamten gestakten ETH im Netzwerk aus. DVT kann es diesen Betreibern ermöglichen zu existieren, während die Dezentralisierung des Stakes erhalten bleibt. Dies liegt daran, dass die Schlüssel für jeden Validator auf viele Maschinen verteilt sind und es einer viel größeren Absprache bedürfte, damit ein Validator bösartig wird.

Ohne DVT ist es für Staking-Anbieter einfacher, nur ein oder zwei Client-Konfigurationen für all ihre Validatoren zu unterstützen, was die Auswirkungen eines Client-Fehlers erhöht. DVT kann verwendet werden, um das Risiko auf mehrere Client-Konfigurationen und unterschiedliche Hardware zu verteilen und so Ausfallsicherheit durch Vielfalt zu schaffen.

**DVT bietet Ethereum die folgenden Vorteile:**

1. **Dezentralisierung** des Proof-of-Stake-Konsenses von Ethereum
2. Stellt die **Verfügbarkeit** (Liveness) des Netzwerks sicher
3. Schafft **Fehlertoleranz** für Validatoren
4. **Vertrauensminimierter** Validator-Betrieb
5. **Minimierte Risiken** für Slashing und Ausfallzeiten
6. **Verbessert die Vielfalt** (Client, Rechenzentrum, Standort, Regulierung usw.)
7. **Erhöhte Sicherheit** der Validator-Schlüsselverwaltung

## Wie funktioniert DVT? {#how-does-dvt-work}

DVT-Implementierungen laufen typischerweise als zusätzliche Software auf jeder Maschine in einem Cluster. Diese Software fungiert als Middleware, die zwischen dem Validator-Client eines Knotens und seinem Konsens-Client sitzt, wo sie sich mit den anderen Knoten im Cluster koordiniert, sodass die Aufgaben des Validators kollektiv signiert werden.

Eine DVT-Lösung enthält die folgenden Komponenten:

- **[Shamir's Secret Sharing](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Validatoren verwenden [BLS-Schlüssel](https://en.wikipedia.org/wiki/BLS_digital_signature). Ein privater Validator-Schlüssel kann in mehrere „Schlüsselanteile“ aufgeteilt werden, und da BLS-Signaturen additiv sind, können partielle Signaturen, die mit diesen Schlüsselanteilen erstellt wurden, zu einer einzigen Signatur kombiniert werden, die für den vollständigen Validator-Schlüssel gültig ist.
- **[Schwellenwert-Signaturschema (Threshold Signature Scheme)](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Bestimmt die Anzahl der einzelnen Schlüsselanteile, die für Signieraufgaben erforderlich sind, z. B. 3 von 4.
- **[Verteilte Schlüsselgenerierung (Distributed Key Generation, DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Kryptografischer Prozess, der die Schlüsselanteile generiert und verwendet wird, um die Anteile eines bestehenden oder neuen Validator-Schlüssels an die Knoten in einem Cluster zu verteilen.
- **[Sichere Mehrparteienberechnung (Multiparty Computation, MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - Der vollständige Validator-Schlüssel wird im Geheimen mithilfe von Mehrparteienberechnung generiert. Der vollständige Schlüssel ist keinem einzelnen Betreiber jemals bekannt – sie kennen immer nur ihren eigenen Teil davon (ihren „Anteil“).
- **Konsens-Protokoll** - Das Konsens-Protokoll wählt einen Knoten als Block-Proposer aus. Dieser teilt den Block mit den anderen Knoten im Cluster, die ihre Schlüsselanteile zur aggregierten Signatur hinzufügen. Wenn genügend Schlüsselanteile aggregiert wurden, wird der Block auf Ethereum vorgeschlagen.

Verteilte Validatoren verfügen über eine eingebaute Fehlertoleranz und können weiterlaufen, selbst wenn einige der einzelnen Knoten offline gehen. Das Cluster des Validator-Knotens ist ausfallsicher, selbst wenn sich einige der darin befindlichen Knoten als bösartig oder untätig erweisen.

## DVT in der Produktion {#dvt-in-production}

Verteilte Validatoren laufen heute im Mainnet über Solo Staking, Staking-Dienste und Pooled Staking hinweg. Zwei Netzwerke machen den Großteil dieser Aktivität aus:

<ProductDisclaimer />

- **Obol** entwickelt Charon, einen Open-Source-DVT-Middleware-Client, der es einem Cluster von Maschinen ermöglicht, gemeinsam einen Validator zu betreiben („Squad Staking“). Gruppen führen eine verteilte Schlüsselgenerierung durch und konfigurieren ihr Cluster über Obols [DV Launchpad](https://docs.obol.org/learn/readme/launchpad). Obol-Cluster werden in der Produktion von [Staking-Protokollen](/staking/pools/) und [Staking-Diensten](/staking/saas/) verwendet, einschließlich Lidos Simple DVT-Modul und EtherFis Operation Solo Staker-Programm, das Heimbetreiber in fehlertolerante Cluster integriert.
- **SSV Network** ist ein erlaubnisfreies Netzwerk unabhängiger Knotenbetreiber. Ein Validator-Schlüssel wird in Schlüsselanteile aufgeteilt und an eine ausgewählte Gruppe von Betreibern verteilt, die die Aufgaben des Validators kollektiv ausführen; kein einzelner Betreiber hält jemals den vollständigen Schlüssel. Staking-Dienste und -Pools betreiben große Validator-Sets auf SSV, und wie Obol wird es von Lidos Simple DVT-Modul verwendet.

## DVT-Anwendungsfälle {#dvt-use-cases}

DVT hat erhebliche Auswirkungen auf die breitere Staking-Branche:

### Solo-Staker {#solo-stakers}

DVT ermöglicht **Squad Staking**: Eine kleine Gruppe von Personen, wie Freunde, Community-Mitglieder oder Fremde, die über ein Launchpad koordiniert werden, betreiben gemeinsam einen einzigen Validator auf ihren eigenen Maschinen. Ein Schwellenwert der Gruppe (zum Beispiel 3 von 4) muss online sein, damit der Validator seine Aufgaben erfüllen kann, sodass die Ausfallzeit, der Hardwarefehler oder der Fehler eines einzelnen Mitglieds den Validator nicht offline nimmt. Wenn der Schlüssel mit verteilter Schlüsselgenerierung erstellt wird, hält kein Mitglied jemals den vollständigen Signierschlüssel.

DVT ermöglicht auch nicht-verwahrendes Staking, indem es Ihnen erlaubt, Ihren Validator-Schlüssel auf entfernte Knoten zu verteilen, während der vollständige Schlüssel komplett offline bleibt. Das bedeutet, dass Staker nicht zwingend ihre eigene Hardware betreiben müssen, und die Verteilung der Schlüsselanteile hilft beim Schutz vor potenziellen Hacks.

### Staking as a Service (SaaS) {#saas}

Betreiber (wie Staking-Pools und institutionelle Staker), die viele Validatoren verwalten, können DVT nutzen, um ihr Risiko zu reduzieren. Durch die Verteilung ihrer Infrastruktur können sie ihren Abläufen Redundanz hinzufügen und die Arten der von ihnen verwendeten Hardware diversifizieren.

DVT teilt die Verantwortung für die Schlüsselverwaltung auf mehrere Knoten auf, was bedeutet, dass auch einige Betriebskosten geteilt werden können. DVT kann zudem das operationelle Risiko und die Versicherungskosten für Staking-Anbieter senken.

### Staking-Pools {#staking-pools}

Aufgrund von Standard-Validator-Setups mussten Staking-Pools und Liquid Staking-Anbieter in der Vergangenheit jedem einzelnen Betreiber erhebliches Vertrauen entgegenbringen, da Gewinne und Verluste im gesamten Pool sozialisiert werden. Sie waren auch darauf angewiesen, dass die Betreiber die Signierschlüssel schützen, da es bis zu DVT keine andere Option für sie gab.

Auch wenn traditionell Anstrengungen unternommen werden, das Risiko durch die Verteilung von Stakes auf mehrere Betreiber zu streuen, verwaltet jeder Betreiber immer noch unabhängig einen erheblichen Stake. Sich auf einen einzigen Betreiber zu verlassen, birgt immense Risiken, wenn dieser schlechte Leistung erbringt, Ausfallzeiten hat, kompromittiert wird oder bösartig handelt.

Durch die Nutzung von DVT kann das von jedem einzelnen Betreiber geforderte Vertrauen reduziert werden. **Pools können es Betreibern ermöglichen, Stakes zu halten, ohne die Verwahrung von Validator-Schlüsseln zu benötigen** (da nur Schlüsselanteile verwendet werden). Es ermöglicht auch, verwaltete Stakes auf mehr Betreiber zu verteilen (z. B. anstatt dass ein einzelner Betreiber 1000 Validatoren verwaltet, ermöglicht DVT, dass diese Validatoren kollektiv von mehreren Betreibern betrieben werden). Vielfältige Betreiberkonfigurationen tragen dazu bei, dass, falls ein Betreiber ausfallen sollte, die anderen weiterhin attestieren können. Die daraus resultierende Redundanz und Diversifizierung kann zu besserer Leistung und Ausfallsicherheit führen, während die Belohnungen maximiert werden.

Ein weiterer Vorteil der Minimierung des Vertrauens in einzelne Betreiber ist, dass Staking-Pools eine offenere und erlaubnisfreie Teilnahme von Betreibern ermöglichen können. Einige Staking-Pools tun dies heute bereits in der Produktion. DVT-Cluster mit mehreren Betreibern lassen Protokolle Heim-Staker und kleinere Betreiber mit größeren professionellen Betreibern paaren, wodurch kuratierte und erlaubnisfreie Betreiber-Sets kombiniert werden.

## Potenzielle Nachteile der Verwendung von DVT {#potential-drawbacks-of-using-dvt}

- **Zusätzliche Komponente** - Die Einführung eines DVT-Knotens fügt ein weiteres Teil hinzu, das möglicherweise fehlerhaft oder anfällig sein kann. Dies wird durch mehrere Implementierungen von DVT-Software abgemildert, genau wie es mehrere Clients für die Konsens- und Ausführungsschicht gibt.
- **Betriebskosten** - Da DVT den Validator auf mehrere Parteien verteilt, sind für den Betrieb mehr Knoten erforderlich anstatt nur eines einzigen Knotens, was zu erhöhten Betriebskosten führt.
- **Potenziell erhöhte Latenz** - Da DVT ein Konsens-Protokoll verwendet, um einen Konsens zwischen den mehreren Knoten zu erzielen, die einen Validator betreiben, kann dies potenziell zu einer erhöhten Latenz führen.

## Häufig gestellte Fragen {#faq}

<ExpandableCard title="Benötige ich DVT zum Staken?" eventCategory="DVT" eventName="clicked do I need DVT to stake">
Nein. Eine einzelne Maschine, auf der ein Validator-Client läuft, funktioniert ohne jegliche DVT-Software, und dies bleibt ein gängiges Heim-Staking-Setup. DVT ist eine optionale Schicht, die Fehlertoleranz hinzufügt und Single Points of Failure beseitigt. Dies ist nützlich, wenn Sie möchten, dass Ihr Validator Ausfälle einzelner Maschinen übersteht, oder wenn Sie die Verantwortung für den Betrieb eines Validators mit anderen teilen möchten.
</ExpandableCard>

<ExpandableCard title="Teilt DVT meine ETH oder meine Abhebungsschlüssel auf?" eventCategory="DVT" eventName="clicked does DVT split my ETH">
Nein. DVT teilt nur den _Signierschlüssel_ des Validators auf, der für Konsensaufgaben wie Attestierungen und Block-Vorschläge verwendet wird. Ihr Stake wird immer durch die für den Validator festgelegte Abhebungsadresse kontrolliert, die von DVT unberührt bleibt. Seit dem Pectra-Upgrade kann der Inhaber der Abhebungsadresse auch einen Validator-Austritt direkt von der Ausführungsschicht auslösen, ohne den Signierschlüssel überhaupt zu benötigen.
</ExpandableCard>

<ExpandableCard title="Was passiert, wenn Knoten in einem Cluster offline gehen?" eventCategory="DVT" eventName="clicked what happens if nodes go offline">
Solange ein Schwellenwert von Knoten online bleibt (zum Beispiel 3 von 4), führt der Validator seine Aufgaben weiterhin aus. Wenn zu viele Knoten auf einmal offline gehen, geht der Validator einfach offline und verpasst Belohnungen, bis genügend Knoten zurückkehren, genau wie jeder andere Offline-Validator. Offline zu gehen ist kein Vergehen, das mit Slashing bestraft wird.
</ExpandableCard>

<ExpandableCard title="Muss ein Cluster aus 3 von 4 bestehen?" eventCategory="DVT" eventName="clicked does a cluster have to be 3 of 4">
Nein. „3 von 4“ ist nur die kleinste gängige Konfiguration und wird auf dieser Seite als Beispiel verwendet. Die Clustergröße und der Signierschwellenwert werden bei der Erstellung des Clusters ausgewählt.

Cluster sind in der Regel so dimensioniert, dass der Schwellenwert eine Zweidrittel-Supermehrheit der Knoten ist, was es dem Cluster ermöglicht, weiter zu signieren, während fehlerhafte oder offline befindliche Mitglieder toleriert werden. Ein 4-Knoten-Cluster signiert mit 3 und toleriert 1 Ausfall; 7 Knoten signieren mit 5 und tolerieren 2; 10 Knoten signieren mit 7 und tolerieren 3. Größere Cluster erkaufen sich mehr Fehlertoleranz auf Kosten von mehr zu betreibenden Maschinen und mehr Koordination zwischen ihnen.

[Mehr zu Clustergröße und Ausfallsicherheit](https://docs.obol.org/next/learn/charon/cluster-configuration#cluster-size-and-resilience)
</ExpandableCard>

<ExpandableCard title="Ist DVT dasselbe wie Pooled Staking?" eventCategory="DVT" eventName="clicked is DVT the same as pooled staking">
Nein. Pooled Staking kombiniert ETH von vielen Personen, um Validatoren zu finanzieren, und ist eine von mehreren [Möglichkeiten zu staken](/staking/). DVT ist eine Infrastruktur für den _Betrieb_ eines Validators. Es verteilt das Signieren eines Validators auf mehrere Maschinen und Betreiber. Die beiden ergänzen sich; viele Pools nutzen DVT, um ihre Betreiber-Sets zu verteilen, aber DVT selbst poolt nicht die ETH von irgendjemandem.
</ExpandableCard>

## Weiterführende Literatur {#further-reading}

- [Ethereum Distributed Validator Technology (DVT) - Vollständige Einführung](https://www.cyfrin.io/blog/full-introduction-to-ethereum-distributed-validator-technology-dvt) - Cyfrin
- [Was ist DVT und wie verbessert es das Staking auf Ethereum?](https://blog.obol.org/what-is-dvt-and-how-does-it-improve-staking-on-ethereum/) - Obol
- [Spezifikationen für verteilte Ethereum-Validatoren (High-Level)](https://github.com/ethereum/distributed-validator-specs)
- [Technische Spezifikationen für verteilte Ethereum-Validatoren](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Obol-Dokumentation](https://docs.obol.org/)
- [SSV Network-Dokumentation](https://docs.ssv.network/)
- [Lido Simple DVT-Modul](https://operatorportal.lido.fi/modules/simple-dvt-module)
- [Shamir's Secret Sharing Demo-App](https://iancoleman.io/shamir/)