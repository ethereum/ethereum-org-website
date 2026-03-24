---
title: Proposer-Builder-Trennung
description: "Erfahren Sie, wie und warum Ethereum-Validatoren ihre Verantwortlichkeiten für die Block-Erstellung und die Block-Übertragung aufteilen werden."
lang: de
---

# Proposer-Builder-Trennung {#proposer-builder-separation}

Heutige [Ethereum](/) Validatoren erstellen _und_ übertragen Blöcke. Sie bündeln Transaktionen, von denen sie über das Gossip-Netzwerk gehört haben, und verpacken sie in einen Block, der an Peers im Ethereum-Netzwerk gesendet wird. Die **Proposer-Builder-Trennung (PBS)** teilt diese Aufgaben auf mehrere Validatoren auf. Block-Ersteller (Block Builder) werden dafür verantwortlich, Blöcke zu erstellen und sie dem Block-Vorschlagenden in jedem Slot anzubieten. Der Block-Vorschlagende kann den Inhalt des Blocks nicht sehen; er wählt einfach den profitabelsten aus und zahlt dem Block-Ersteller eine Gebühr, bevor er den Block an seine Peers sendet.

Dies ist aus mehreren Gründen ein wichtiges Upgrade. Erstens schafft es Möglichkeiten, die Zensur von Transaktionen auf Protokollebene zu verhindern. Zweitens verhindert es, dass Hobby-Validatoren von institutionellen Akteuren verdrängt werden, die die Rentabilität ihrer Block-Erstellung besser optimieren können. Drittens hilft es bei der Skalierung von Ethereum, indem es die Danksharding-Upgrades ermöglicht.

## PBS und Zensurresistenz {#pbs-and-censorship-resistance}

Die Trennung von Block-Erstellern und Block-Vorschlagenden macht es für Block-Ersteller viel schwieriger, Transaktionen zu zensieren. Dies liegt daran, dass relativ komplexe Aufnahmekriterien hinzugefügt werden können, die sicherstellen, dass keine Zensur stattgefunden hat, bevor der Block vorgeschlagen wird. Da der Block-Vorschlagende eine vom Block-Ersteller getrennte Entität ist, kann er die Rolle des Beschützers vor zensierenden Block-Erstellern übernehmen.

Zum Beispiel können Inklusionslisten (Inclusion Lists) eingeführt werden, sodass Validatoren, wenn sie von Transaktionen wissen, diese aber nicht in Blöcken enthalten sehen, sie als zwingend erforderlich für den nächsten Block vorschreiben können. Die Inklusionsliste wird aus dem lokalen Mempool des Block-Vorschlagenden (der Liste der ihm bekannten Transaktionen) generiert und kurz vor dem Vorschlagen eines Blocks an seine Peers gesendet. Wenn eine der Transaktionen aus der Inklusionsliste fehlt, könnte der Vorschlagende den Block entweder ablehnen, die fehlenden Transaktionen hinzufügen, bevor er ihn vorschlägt, oder ihn vorschlagen und zulassen, dass er von anderen Validatoren abgelehnt wird, wenn sie ihn erhalten. Es gibt auch eine potenziell effizientere Version dieser Idee, die besagt, dass Ersteller den verfügbaren Blockplatz vollständig ausnutzen müssen, und wenn sie dies nicht tun, werden Transaktionen aus der Inklusionsliste des Vorschlagenden hinzugefügt. Dies ist noch ein Bereich aktiver Forschung, und die optimale Konfiguration für die Inklusionslisten wurde noch nicht festgelegt.

[Verschlüsselte Mempools](https://www.youtube.com/watch?v=fHDjgFcha0M&list=PLpktWkixc1gUqkyc1-iE6TT0RWQTBJELe&index=3) könnten es für Ersteller und Vorschlagende auch unmöglich machen, zu wissen, welche Transaktionen sie in einen Block aufnehmen, bis der Block bereits übertragen wurde.

<ExpandableCard title="Welche Arten von Zensur löst PBS?" eventCategory="/roadmap/pbs" eventName="clicked what kinds of censorship does PBS solve?">

Mächtige Organisationen können Druck auf Validatoren ausüben, Transaktionen an oder von bestimmten Adressen zu zensieren. Validatoren beugen sich diesem Druck, indem sie auf der schwarzen Liste stehende Adressen in ihrem Transaktionspool erkennen und sie aus den von ihnen vorgeschlagenen Blöcken weglassen. Nach PBS wird dies nicht mehr möglich sein, da Block-Vorschlagende nicht wissen werden, welche Transaktionen sie in ihren Blöcken übertragen. Es könnte für bestimmte Personen oder Apps wichtig sein, Zensurregeln einzuhalten, zum Beispiel wenn dies in ihrer Region gesetzlich vorgeschrieben ist. In diesen Fällen erfolgt die Einhaltung auf der Anwendungsebene, während das Protokoll erlaubnisfrei und zensurfrei bleibt.

</ExpandableCard>

## PBS und MEV {#pbs-and-mev}

**Maximal extrahierbarer Wert (MEV)** bezieht sich auf Validatoren, die ihre Rentabilität maximieren, indem sie Transaktionen vorteilhaft anordnen. Häufige Beispiele sind Arbitrage-Swaps an dezentralisierten Börsen (z. B. Frontrunning bei einem großen Verkauf oder Kauf) oder die Identifizierung von Möglichkeiten zur Liquidierung von DeFi-Positionen. Die Maximierung von MEV erfordert anspruchsvolles technisches Know-how und maßgeschneiderte Software, die an normale Validatoren angehängt wird, was es viel wahrscheinlicher macht, dass institutionelle Betreiber Einzelpersonen und Hobby-Validatoren bei der MEV-Extraktion übertreffen. Dies bedeutet, dass die Staking-Renditen bei zentralisierten Betreibern wahrscheinlich höher sind, was eine zentralisierende Kraft erzeugt, die das Home-Staking unattraktiv macht.

PBS löst dieses Problem, indem es die Ökonomie von MEV neu konfiguriert. Anstatt dass der Block-Vorschlagende seine eigene MEV-Suche durchführt, wählt er einfach einen Block aus vielen aus, die ihm von Block-Erstellern angeboten werden. Die Block-Ersteller haben möglicherweise eine ausgeklügelte MEV-Extraktion durchgeführt, aber die Belohnung dafür geht an den Block-Vorschlagenden. Dies bedeutet, dass selbst wenn ein kleiner Pool spezialisierter Block-Ersteller die MEV-Extraktion dominiert, die Belohnung dafür an jeden Validator im Netzwerk gehen könnte, einschließlich einzelner Home-Staker.

<ExpandableCard title="Warum ist es in Ordnung, die Block-Erstellung zu zentralisieren?" eventCategory="/roadmap/pbs" eventName="clicked why is it OK to centralize block building?">

Einzelpersonen könnten aufgrund der erhöhten Belohnungen, die durch ausgeklügelte MEV-Strategien geboten werden, dazu angeregt werden, in Pools zu staken, anstatt alleine. Die Trennung der Block-Erstellung vom Block-Vorschlag bedeutet, dass der extrahierte MEV auf mehr Validatoren verteilt wird, anstatt sich beim effektivsten MEV-Sucher zu zentralisieren. Gleichzeitig nimmt die Zulassung spezialisierter Block-Ersteller Einzelpersonen die Last der Block-Erstellung ab und verhindert auch, dass Einzelpersonen MEV für sich selbst stehlen, während die Anzahl einzelner, unabhängiger Validatoren maximiert wird, die überprüfen können, ob die Blöcke ehrlich sind. Das wichtige Konzept ist die „Prover-Verifier-Asymmetrie“, die sich auf die Idee bezieht, dass eine zentralisierte Blockproduktion in Ordnung ist, solange es ein robustes und maximal dezentralisiertes Netzwerk von Validatoren gibt, die beweisen können, dass die Blöcke ehrlich sind. Dezentralisierung ist ein Mittel, kein Endziel – was wir wollen, sind ehrliche Blöcke.
</ExpandableCard>

## PBS und Danksharding {#pbs-and-danksharding}

Danksharding ist der Weg, wie Ethereum auf >100.000 Transaktionen pro Sekunde skalieren und die Gebühren für Rollup-Nutzer minimieren wird. Es stützt sich auf PBS, da es die Arbeitsbelastung für Block-Ersteller erhöht, die in weniger als 1 Sekunde Nachweise für bis zu 64 MB an Rollup-Daten berechnen müssen. Dies wird wahrscheinlich spezialisierte Ersteller erfordern, die dieser Aufgabe ziemlich umfangreiche Hardware widmen können. In der aktuellen Situation könnte die Block-Erstellung jedoch aufgrund der MEV-Extraktion ohnehin zunehmend um anspruchsvollere und leistungsfähigere Betreiber zentralisiert werden. Die Proposer-Builder-Trennung ist ein Weg, diese Realität anzunehmen und zu verhindern, dass sie eine zentralisierende Kraft auf die Block-Validierung (den wichtigen Teil) oder die Verteilung der Staking-Belohnungen ausübt. Ein großer Nebeneffekt ist, dass die spezialisierten Block-Ersteller auch bereit und in der Lage sind, die notwendigen Datennachweise für Danksharding zu berechnen.

## Aktueller Fortschritt {#current-progress}

PBS befindet sich in einem fortgeschrittenen Forschungsstadium, aber es gibt noch einige wichtige Designfragen, die gelöst werden müssen, bevor es in Ethereum-Clients als Prototyp entwickelt werden kann. Es gibt noch keine endgültige Spezifikation. Das bedeutet, dass PBS wahrscheinlich noch ein Jahr oder länger entfernt ist. Überprüfen Sie den neuesten [Stand der Forschung](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance).

## Weiterführende Literatur {#further-reading}

- [Stand der Forschung: Zensurresistenz unter PBS](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)
- [PBS-freundliche Gebührenmarkt-Designs](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725)
- [PBS und Zensurresistenz](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Secondary-auctions)
- [Inklusionslisten](https://notes.ethereum.org/@fradamt/forward-inclusion-lists)