---
title: Proposer-Builder-Trennung
description: Lerne wie und warum die Ethereum-Validatoren ihre Verantwortung für die Blockproduktion und Blockübertragung aufteilen.
lang: de
---

# Proposer-Builder-Trennung {#proposer-builder-separation}

Gegenwärtig werden Blöcke von Ethereum Validatoren gleichzeitig produziert _ und _ übertragen. Sie bündeln die Transaktionen, die sie über das Gossip-Netzwerk erhalten haben und fassen diese in einem Block zusammen, welcher sodann an die Peers des Ethereumnetzwerks versendet wird. **Vorschlags-Produzent Separation(PBS)** verteilt diese Aufgaben an mehrere Validatoren. Blockproduzenten werden dafür verantwortlich sein, Blöcke zu erstellen und diese den Blocküberträgern in jedem Slot zur Verfügung zu stellen. Der Block-Vorschlagende kann den Inhalt der Blöcke nicht sehen, sie entscheiden sich lediglich für den profitabelsten und zahlen dem Blockproduzenten eine Gebühr bevor sie den Block an die Peers versendet.

Das ist aus mehreren Gründen ein wichtiges Update. Erstens, schafft es Möglichkeiten die Zensur von Transaktionen auf der Protokollebene zu verhindern. Zweitens, schützt es Hobby-Validatoren davor, von institutionellen Mitspielern, die auf eine bessere Rentabilität optimieren können, verdrängt zu werden. Und drittens, hilft es dabei Ethereum zu skalieren, weil es Upgrades für Danksharding ermöglicht.

## PPT und Zensurresistenz {#pbs-and-censorship-resistance}

Die Trennung von Block-Erstellern und Block-Antragstellern macht es schwieriger für Block-Antragsteller, Transaktionen zu zensieren. Das liegt daran, dass vergleichsweise komplexe Einschlusskriterien hinzugefügt werden können, die sicherstellen, dass keine Zensur stattgefunden hat, bevor der Block vorgeschlagen wird. Da der Blockvorschlagende eine eigenständige Einheit vom Blockersteller ist, kann er die Rolle eines Beschützers gegen die Zensur der Blockersteller übernehmen.

Ein Beispiel hierfür sind Einschlusslisten, die verwendet werden können, damit Validatoren über Transaktionen informiert sind, aber wenn sie sehen, dass diese nicht in Blöcken enthalten sind, können sie verlangen, dass sie im nächsten Block unbedingt enthalten sein müssen. Die Einschlussliste wird aus dem lokalen Mempool des Block-Vorschlagstellers generiert (der Liste der ihm bekannten Transaktionen) und kurz vor dem Vorschlagen eines Blocks an seine Peers gesendet. Falls Transaktionen aus der Einschlussliste fehlen, könnte der Vorschlagende entweder den Block ablehnen, die fehlenden Transaktionen hinzufügen, bevor er ihn vorschlägt, oder ihn vorschlagen und es anderen Validatoren überlassen, ihn abzulehnen, wenn sie ihn empfangen. Es gibt auch eine möglicherweise effizientere Version dieser Idee, die besagt, dass die Block-Ersteller den verfügbaren Blockplatz vollständig nutzen müssen. Falls sie das nicht tun, werden Transaktionen aus der Einschlussliste des Vorschlagenden hinzugefügt. Diese Idee ist nach wie vor Gegenstand aktiver Forschung, und die optimale Konfiguration für die Einschlusslisten ist noch nicht endgültig festgelegt.

[Verschlüsselte Mempools](https://www.youtube.com/watch?v=fHDjgFcha0M&list=PLpktWkixc1gUqkyc1-iE6TT0RWQTBJELe&index=3) könnten auch dazu führen, dass Ersteller und Vorschlagende von Blöcken erst nach der Übertragung des Blocks wissen, welche Transaktionen darin enthalten sind.

<ExpandableCard title="Welche Arten von Zensur löst PBS auf?" eventCategory="/roadmap/pbs" eventName="clicked what kinds of censorship does PBS solve?">

Einflussreiche Organisationen können Validatoren dazu drängen, Transaktionen zu zensieren, die von oder zu bestimmten Adressen erfolgen. Die Validatoren geben diesem Druck nach, indem sie Adressen auf der schwarzen Liste in ihrem Transaktionspool erkennen und sie auf den von ihnen vorgeschlagenen Blöcken auslassen. Nach der Einführung von PBS wird dies nicht mehr möglich sein, da Block-Vorschlagende nicht mehr wissen werden, welche Transaktionen sie in ihren Blöcken übertragen. Für bestimmte Personen oder Anwendungen könnte es wichtig sein, die Zensurvorschriften einzuhalten, z. B. wenn sie in ihrer Region gesetzlich vorgeschrieben sind. In solchen Fällen erfolgt die Einhaltung auf Anwendungsebene, während das Protokoll weiterhin erlaubnis- und zensurfrei bleibt.

</ExpandableCard>

## PBS und MEV {#pbs-and-mev}

**Maximal extrahierbarer Wert (MEV)** bezieht sich darauf, dass Validatoren ihre Rentabilität maximieren, indem sie Transaktionen in vorteilhafter Weise anordnen. Zu den gängigen Beispielen gehören das Arbitrieren von Trades an dezentralen Börsen (z. B. das Vorauslaufen eines großen Verkaufs oder Kaufs) oder die Identifizierung von Möglichkeiten zur Liquidierung von DeFi-Positionen. Die Maximierung von MEV erfordert hoch entwickeltes technisches Wissen und kundenspezifische Software, die normalen Validatoren hinzugefügt wird. Dadurch wird es deutlich wahrscheinlicher, dass institutionelle Betreiber bei der MEV-Extraktion Einzelpersonen und Hobby-Validatoren übertreffen. Das hat zur Folge, dass die Einkommen aus dem Staking (Einsetzen) mit zentralisierten Betreibern voraussichtlich höher ausfallen, was einen zentralisierenden Effekt erzeugt, der das Staking von Privatpersonen weniger attraktiv macht.

Das PBS löst dieses Problem, indem es die Wirtschaftlichkeit von MEV neu konfiguriert. Anstatt dass der Blockvorschlager selbst nach MEV-Möglichkeiten sucht, wählt er einfach einen Block aus vielen Blöcken aus, die ihm von Block-Erstellern angeboten werden. Die Block-Ersteller könnten eine ausgeklügelte MEV-Extraktion durchgeführt haben, aber die Belohnung dafür erhält der Blockvorschlager. Das bedeutet, dass selbst, wenn ein kleiner Pool spezialisierter Block-Ersteller die MEV-Extraktion dominiert, die Belohnung dafür an jeden Validator im Netzwerk gehen könnte, einschließlich einzelner Heim-Staker (Privat-Einsetzer/Staker).

<ExpandableCard title="Warum ist es in Ordnung, die Erstellung von Blöcken zu zentralisieren?" eventCategory="/roadmap/pbs" eventName="clicked why is it OK to centralize block building?">

Aufgrund der verbesserten Belohnungen durch ausgeklügelte MEV-Strategien könnten Einzelpersonen dazu angeregt werden, sich Pools anzuschließen, anstatt alleine zu staken. Die Trennung der Block-Erstellung vom Block-Vorschlagsverfahren führt dazu, dass die extrahierte MEV auf eine größere Anzahl von Validatoren verteilt wird, anstatt sich bei dem effektivsten MEV-Sucher zu zentralisieren. Gleichzeitig nimmt das Erlauben von spezialisierten Blockproduzenten die Last der Blockerstellung weg vom Einzelnen und verhindert das Stehlen von MEV einzelner für sich selber, während die Anzahl individueller, unabhängiger Validatoren, die Blöcke auf ehrliche weise überprüfen, maximiert wird. Das wichtige Konzept ist die "Beweiser-Verifizierer Asymetrie", welche die Idee beschreibt, dass zentralisierte Blockproduktion okay ist, solange es ein robustes und maximal dezentralisiertes Netzwerk von ehrlichen Validatoren gibt, die die Blöcke überprüfen. Dezentralisierung ist ein Mittel, kein Endziel - worauf es uns ankommt, sind ehrliche Blöcke.
</ExpandableCard>

## PBS und Danksharding {#pbs-and-danksharding}

Danksharding ist der Weg, auf dem Ethereum zu >100000 Transaktionen pro Sekunde skalieren wird, während Gebühren für Rollup-Benutzer minimiert werden. Es baut auf PBS auf, weil es Arbeitslast für die Blockproduzenten hinzufügt, welche Beweise für bis zu 64 MB an Rollup-Daten in weniger als 1 Sekunde berechnen müssen. Dies wird wahrscheinlich spezialisierte Produzenten benötigen, die dieser Aufgabe einiges an Hardware-Power zur Verfügung stellen. Nichtsdestotrotz, in der derzeitigen Situation könnte die Blockproduktion mehr und mehr auf fortschrittlichere, stärkere Hardwareoperator wegen der MEV-Extraktion zentralisiert werden. Vorschlager-Produzenten-Trennung ist ein Weg, dieser Realität zu begegnen und zentralisierende Kräfte auf die Blockprüfung (der wichtige Teil) oder die Verteilung der Staking-Auszahlungen zu verhindern. Ein großer weiterer Vorteil ist zudem, dass die spezialisierten Blockproduzenten bereit und in der Lage sind, die nötigen Datenbeweise für Danksharding zu berechnen.

## Aktueller Fortschritt {#current-progress}

PBS ist in einer fortgeschrittenen Phase der Forschung, aber es gibt immer noch ein paar wichtige Designfragen, die gelöst werden müssen, bevor es in Ethereum Clients implementiert werden kann. Es gibt noch keine endgültige Spezifikation. Das heißt, dass PBS wahrscheinlich noch mindestens ein Jahr oder länger entfernt ist. Informieren Sie sich über den neuesten [Forschungsstand](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance).

## Weiterführende Informationen {#further-reading}

- [Forschungsstand: Zensurwiderstand unter PBS](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)
- [PBS-freundliche Gebührenmarktkonzepte](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725)
- [PPT und Zensurresistenz](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Secondary-auctions)
- [Einschlusslisten](https://notes.ethereum.org/@fradamt/H1ZqdtrBF)
