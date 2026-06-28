---
title: Proposer-Builder-Trennung (PBS)
description: Erfahre, wie und warum Ethereum-Validatoren ihre Verantwortlichkeiten für die Block-Erstellung und das Block-Broadcasting aufteilen werden.
lang: de
---

Heutige [Ethereum](/)-Validatoren erstellen _und_ übertragen (broadcasten) Blöcke. Sie bündeln Transaktionen, von denen sie über das Gossip-Netzwerk erfahren haben, und verpacken sie in einen Block, der an Peers im Ethereum-Netzwerk gesendet wird. **Proposer-Builder-Trennung (PBS)** teilt diese Aufgaben auf mehrere Validatoren auf. Block-Builder werden dafür verantwortlich, Blöcke zu erstellen und sie dem Block-Proposer in jedem Slot anzubieten. Der Block-Proposer kann den Inhalt des Blocks nicht sehen; er wählt einfach den profitabelsten aus und erhält eine Gebühr vom Block-Builder (oder der Builder zahlt ein Gebot an den Proposer), bevor er den Block an seine Peers sendet.

Dies ist aus mehreren Gründen ein wichtiges Upgrade. Erstens schafft es Möglichkeiten, die Zensur von Transaktionen auf Protokollebene zu verhindern. Zweitens verhindert es, dass Hobby-Validatoren von institutionellen Akteuren verdrängt werden, die die Rentabilität ihrer Block-Erstellung besser optimieren können. Drittens hilft es bei der Skalierung von Ethereum, indem es die Danksharding-Upgrades ermöglicht.

## PBS und Zensurresistenz {#pbs-and-censorship-resistance}

Die Trennung von Block-Buildern und Block-Proposern macht es für Block-Builder viel schwieriger, Transaktionen zu zensieren. Das liegt daran, dass relativ komplexe Aufnahmekriterien hinzugefügt werden können, die sicherstellen, dass keine Zensur stattgefunden hat, bevor der Block vorgeschlagen wird. Da der Block-Proposer eine vom Block-Builder getrennte Entität ist, kann er die Rolle des Beschützers vor zensierenden Block-Buildern übernehmen.

Zum Beispiel können Inklusionslisten (inclusion lists) eingeführt werden, sodass Validatoren, wenn sie von Transaktionen wissen, diese aber nicht in Blöcken enthalten sehen, sie als zwingend erforderlich für den nächsten Block vorschreiben können. Die Inklusionsliste wird aus dem lokalen Mempool des Block-Proposers (der Liste der Transaktionen, die ihm bekannt sind) generiert und kurz vor dem Vorschlag eines Blocks an seine Peers gesendet. Wenn eine der Transaktionen aus der Inklusionsliste fehlt, könnte der Proposer den Block entweder ablehnen, die fehlenden Transaktionen hinzufügen, bevor er ihn vorschlägt, oder ihn vorschlagen und zulassen, dass er von anderen Validatoren abgelehnt wird, wenn sie ihn erhalten. Es gibt auch eine potenziell effizientere Version dieser Idee, die besagt, dass Builder den verfügbaren Blockplatz vollständig ausnutzen müssen, und wenn sie dies nicht tun, werden Transaktionen aus der Inklusionsliste des Proposers hinzugefügt. Dies ist noch ein Bereich aktiver Forschung, und die optimale Konfiguration für die Inklusionslisten wurde noch nicht festgelegt.

[Verschlüsselte Mempools](https://www.youtube.com/watch?v=fHDjgFcha0M&list=PLpktWkixc1gUqkyc1-iE6TT0RWQTBJELe&index=3) könnten es für Builder und Proposer auch unmöglich machen, zu wissen, welche Transaktionen sie in einen Block aufnehmen, bis der Block bereits übertragen wurde.

<ExpandableCard title="Welche Arten von Zensur behebt PBS?" eventCategory="/roadmap/pbs" eventName="clicked what kinds of censorship does PBS solve?">

Mächtige Organisationen können Druck auf Validatoren ausüben, Transaktionen an oder von bestimmten Adressen zu zensieren. Validatoren beugen sich diesem Druck, indem sie auf der schwarzen Liste stehende Adressen in ihrem Transaktionspool erkennen und sie aus den von ihnen vorgeschlagenen Blöcken weglassen. Nach der PBS wird dies nicht mehr möglich sein, da Block-Proposer nicht wissen werden, welche Transaktionen sie in ihren Blöcken übertragen. Für bestimmte Personen oder Apps kann es wichtig sein, Zensurregeln einzuhalten, zum Beispiel wenn dies in ihrer Region gesetzlich vorgeschrieben ist. In diesen Fällen erfolgt die Einhaltung auf Anwendungsebene, während das Protokoll erlaubnisfrei und zensurfrei bleibt.

</ExpandableCard>

## PBS und MEV {#pbs-and-mev}

**Maximal extrahierbarer Wert (MEV)** bezieht sich darauf, dass Validatoren ihre Rentabilität maximieren, indem sie Transaktionen vorteilhaft anordnen. Häufige Beispiele sind Arbitrage-Swaps an dezentralen Börsen (z. B. Frontrunning eines großen Verkaufs oder Kaufs) oder die Identifizierung von Möglichkeiten zur Liquidierung von Positionen im Bereich der Dezentralisierten Finanzen (DeFi). Die Maximierung von MEV erfordert ausgefeiltes technisches Know-how und maßgeschneiderte Software, die an normale Validatoren angehängt wird, was es viel wahrscheinlicher macht, dass institutionelle Betreiber Einzelpersonen und Hobby-Validatoren bei der MEV-Extraktion übertreffen. Dies bedeutet, dass die Staking-Renditen bei zentralisierten Betreibern wahrscheinlich höher sind, was eine zentralisierende Kraft erzeugt, die das Home-Staking unattraktiv macht.

PBS löst dieses Problem, indem es die Ökonomie von MEV neu konfiguriert. Anstatt dass der Block-Proposer seine eigene MEV-Suche durchführt, wählt er einfach einen Block aus vielen aus, die ihm von Block-Buildern angeboten werden. Die Block-Builder haben möglicherweise eine ausgefeilte MEV-Extraktion durchgeführt, aber die Belohnung dafür geht an den Block-Proposer. Das bedeutet, dass selbst wenn ein kleiner Pool spezialisierter Block-Builder die MEV-Extraktion dominiert, die Belohnung dafür an jeden Validator im Netzwerk gehen könnte, einschließlich einzelner Home-Staker.

<ExpandableCard title="Warum ist es in Ordnung, die Block-Erstellung zu zentralisieren?" eventCategory="/roadmap/pbs" eventName="clicked why is it OK to centralize block building?">

Einzelpersonen könnten aufgrund der höheren Belohnungen, die durch ausgefeilte MEV-Strategien geboten werden, einen Anreiz haben, in Pools zu staken, anstatt auf eigene Faust. Die Trennung der Block-Erstellung vom Block-Vorschlag bedeutet, dass der extrahierte MEV auf mehr Validatoren verteilt wird, anstatt sich beim effektivsten MEV-Searcher zu zentralisieren. Gleichzeitig nimmt die Zulassung spezialisierter Block-Builder Einzelpersonen die Last der Block-Erstellung ab und verhindert auch, dass Einzelpersonen MEV für sich selbst stehlen, während die Anzahl einzelner, unabhängiger Validatoren maximiert wird, die überprüfen können, ob die Blöcke ehrlich sind. Das wichtige Konzept ist die „Beweiser-Verifizierer-Asymmetrie“ (prover-verifier asymmetry), die sich auf die Idee bezieht, dass eine zentralisierte Blockproduktion in Ordnung ist, solange es ein robustes und maximal dezentrales Netzwerk von Validatoren gibt, die beweisen können, dass die Blöcke ehrlich sind. Dezentralisierung ist ein Mittel, kein Endziel – was wir wollen, sind ehrliche Blöcke.
</ExpandableCard>

## PBS und Danksharding {#pbs-and-danksharding}

Danksharding ist der Weg, wie Ethereum auf >100.000 Transaktionen pro Sekunde skalieren und die Gebühren für Rollup-Nutzer minimieren wird. Es stützt sich auf PBS, da es die Arbeitslast für Block-Builder erhöht, die in weniger als 1 Sekunde Beweise für bis zu 64 MB an Rollup-Daten berechnen müssen. Dies wird wahrscheinlich spezialisierte Builder erfordern, die dieser Aufgabe ziemlich umfangreiche Hardware widmen können. In der aktuellen Situation könnte die Block-Erstellung jedoch aufgrund der MEV-Extraktion ohnehin zunehmend um ausgefeiltere und leistungsfähigere Betreiber zentralisiert werden. Die Proposer-Builder-Trennung ist ein Weg, diese Realität anzunehmen und zu verhindern, dass sie eine zentralisierende Kraft auf die Blockvalidierung (den wichtigen Teil) oder die Verteilung der Staking-Belohnungen ausübt. Ein großer Nebeneffekt ist, dass die spezialisierten Block-Builder auch bereit und in der Lage sind, die notwendigen Datenbeweise für Danksharding zu berechnen.

## Aktueller Fortschritt {#current-progress}

PBS befindet sich in einem fortgeschrittenen Forschungsstadium, aber es gibt noch einige wichtige Designfragen, die gelöst werden müssen, bevor es in Ethereum-Clients als Prototyp umgesetzt werden kann. Es gibt noch keine endgültige Spezifikation. Das bedeutet, dass PBS wahrscheinlich noch ein Jahr oder länger entfernt ist. Sieh dir den neuesten [Stand der Forschung](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance) an.

## Weiterführende Literatur {#further-reading}

- [Stand der Forschung: Zensurresistenz unter PBS](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)
- [PBS-freundliche Gebührenmarkt-Designs](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725)
- [PBS und Zensurresistenz](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Secondary-auctions)
- [Inklusionslisten](https://notes.ethereum.org/@fradamt/forward-inclusion-lists)