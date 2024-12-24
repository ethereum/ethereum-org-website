---
title: Zustandslosigkeit, Zustandsverfall und Verfall des Vergangenen (history expiry)
description: Erklärung vom Verfall des Vergangenen (history expiry) und der Zustandslosigkeit auf Ethereum
lang: de
---

# Zustandslosigkeit, Zustandsverfall und Verfall des Vergangenen (history expiry) {#statelessness}

Die Möglichkeit Ethereum Nodes auf einfacher Hardware betreiben zu können ist für wahre Dezentralisation entscheidend. Das liegt daran, dass das Betreiben eines Nodes Nutzern die Möglichkeit gibt Informationen verifizieren zu können, indem sie kryptografische Überprüfungen unabhängig ausführen können, statt von den Daten eines Dritten abhängig zu sein. Einen Node zu betreiben erlaubt Nutzern Transaktionen direkt zum Ethereum Peer-to-Peer Netzwerk einzuschicken, statt einem Vermittler vertrauen zu müssen. Dezentralisation ist nicht möglich, wenn diese Vorteile nur Nutzern mit teurer Hardware zur Verfügung stehen. Stattdessen sollten Nodes in der Lage sein, mit extrem einfachen Rechen- und Speichervoraussetzungen betrieben zu werden. Dadurch könnten sie auf Handys, Mikrocomputern oder unbemerkt auf einem Standrechner laufen.

Heute ist der hohe Speicherplatzbedarf das, was den Zugriff auf Nodes für alle verhindert. Dies ist vor allem auf die Notwendigkeit zurückzuführen, große Mengen von Ethereums Zustandsdaten zu speichern. Diese Zustandsdaten beinhalten kritische Informationen, welche für das korrekte Verarbeiten von Blöcken und Transaktionen erforderlich ist. Als diese Seite geschrieben wurde, war eine schnelle 2 TB SSD für das Betreiben eines vollen Ethereum Node empfohlen. Für einen Node, welcher keine veralteten Daten löscht wachsen die Speichervoraussetzungen um ungefähr 14 GB/Woche und Archive Nodes, welche alle Daten seit Genesis speichern brauchen (Stand Feb 2023) fast 12 TB.

Günstigere Festplatten können für das Speichern alter Daten verwendet werden, sie sind jedoch zu langsam, um mit eingehenden Blöcken mithalten zu können. Die Beibehaltung der aktuellen Speichermodelle für Clients, bei gleichzeitiger Verbilligung und Vereinfachung der Datenspeicherung ist nur eine vorübergehende und partielle Lösung des Problems, da das Zustandswachstum von Ethereum "unbegrenzt" ist, was bedeutet, dass die Speicheranforderungen immer weiter steigen werden und die technologischen Verbesserungen immer mit dem kontinuierlichen Zustandswachstum Schritt halten müssen. Stattdessen müssen Klienten einen neuen Weg finden, Blöcke und Transaktionen zu verifizieren, während keine Daten von lokalen Datenbanken gespeichert werden müssen.

## Speicherreduzierung für Nodes {#reducing-storage-for-nodes}

Es gibt verschiedene Wege, um die Datenmengen, die jeder Knoten speichern muss, zu reduzieren. Für jede dieser Möglichkeiten muss Ethereums Kernprotokoll in unterschiedlichem Umfang aktualisiert werden:

- **Verfall des Vergangenen (history expiry)**: Dies ermöglicht Nodes Zustandsdaten, welche älter als X Blöcke sind, wegzuschmeißen, jedoch verändert es nicht, wie Ethereums Client mit Zustandsdaten umgeht
- **Zustandsverfall** Dies erlaubt Daten, welche selten verwendet werden, inaktiv zu werden. Inaktive Daten können von Clients ignoriert werden, bis sie wiederbelebt werden.
- **Schwache Zustandslosigkeit**: Hier müssen nur Blockproduzenten Zugriff auf die vollständigen Zustandsdaten haben, andere Nodes können Blöcke ohne eine lokale Zustandsdatenbank verifizieren.
- **Starke Zustandslosigkeit**: Hier können keine Nodes auf die vollständigen Zustandsdaten zugreifen.

## Datenverfall {#data-expiry}

### Verfall des Vergangenen (history expiry) {#history-expiry}

Dass das Vergangene verfällt, bedeutet im Einfachen, dass Clients ältere Daten, die sie unwahrscheinlich brauchen werden, abschneiden. Dadurch müssen sie nur noch kleine Mengen der vergangenen Daten behalten und können alte Daten wegschmeißen, sobald neue hinzugefügt werden. Es gibt zwei Gründe dafür, dass Clients veraltete Daten brauchen könnten: dem Synchronisieren und Bedienen von Datenanfragen. Früher mussten Clients vom jeden Block Genesis bis zum Kopf der Kette synchronisieren und dabei alle nach Richtigkeit überprüfen. Heute nutzen Clients "schwache subjektive Kontrollpunkte" um ihren Weg an die Spitze der Blockchain zu bootstrappen. Diese Kontrollpunkte sind vertraute Startpunkte, als würde man den Genesis Block näher die Gegenwart statt dem Startpunkt von Ethereum legen. Das bedeutet, dass Clients alle Informationen vor ihrem letzten schwachen subjektiven Kontrollpunkt löschen können, ohne dabei die Fähigkeit zu verlieren, den Kopf der Kette zu synchronisieren. Clients liefern zurzeit Anfragen (die über JSON-RPC ankommen) für vergangene Daten, indem sie sie von ihren lokalen Datenbanken nehmen. Jedoch wird das mit dem Verfall des Vergangenen nicht möglich sein, wenn die angefragten Daten abgeschnitten wurden. Um diese vergangenen Daten zu liefern, bedarf es innovativer Lösungen.

Eine Option ist, dass Clients vergangene Daten von Peers abfragen. Dabei würden sie eine Lösung wie das Portal Netzwerk verwenden. Das Portal Netzwerk ist ein Peer-to-Peer Netzwerk in Entwicklung, welches vergangene Daten liefern kann, indem jeder Node einen kleinen Anteil von Ethereums Vergangenheit speichert, sodass die gesamte Vergangenheit verteilt auf das gesamte Netzwerk existiert. Die Anfragen werden geliefert, indem man nach Peers sucht, die die entsprechenden Daten speichern, und sie von ihnen anfordert. Alternativ könnten Anwendungen, deren Gebrauch häufig den Zugriff auf vergangene Daten erfordert, die Daten speichern. Es könnte auch genügend Selbstlose im Ethereum Bereich geben, die bereit werden Vergangenheitsarchive zu pflegen. Es könnte sich um eine DAO handeln, die zur Verwaltung der historischen Datenspeicher in Gang gesetzt wird, oder idealerweise um eine Kombination aus all diesen Optionen. Diese Anbieter könnten die Daten in vielen Wegen liefern. Dazu gehören Torrenten, FFTPs, Filecoins, oder IPFSs.

Der Verfall des Vergangenen ist derzeit noch kontrovers, da Ethereum bis jetzt immer den Zugang aller historischen Daten garantiert hat. Eine vollständige Synchronisierung seit Genesis war immer als Standard möglich, sogar wenn es auf dem Aufbauen von alten Daten oder Snapshots beruht. Der Verfall des Vergangenen verschiebt die Verantwortung, diese Garantie zu liefern, außerhalb des Ethereum Protokolls. Das könnte neue Zensurrisiken einführen, wenn es zentralisierte Organisationen gibt, die vergangene Daten bereitstellen müssen.

EIP-4444 ist bis jetzt nicht bereit, aber unter aktiver Diskussion. Interessanterweise liegen die Herausforderungen von EIP-4444 nicht so sehr am Technischem, wie der Community-Verwaltung. Um dies auszuliefern, bedarf es eines Community "Buy-in", welches nicht nur die Zustimmung, sondern auch die Verpflichtung beinhaltet, vergangene Daten von vertrauensvollen Entitäten zu liefern.

Dieses Upgrade ändert nicht die fundamentale Art der Ethereum Nodes, Zustandsdaten zu speichern, sondern nur die Art auf vergangene Daten zuzugreifen.

### Zustandsverfall {#state-expiry}

Zustandsverfall bezieht sich auf das Entfernen der Zustände von individuellen Nodes, wenn sie nicht vor kurzer Zeit aufgerufen wurden. Es gibt mehrere Wege, wie das implementiert werden könnte, dazu gehören:

- **Verfall nach Leihe**: Das bedeutet, dass von Accounts "Leihgebühren" verlangt und sie verfallen lässt sollten sie Null erreichen
- **Verfall nach Zeit**: Account inaktiv machen, wenn auf ihnen seit einer bestimmten Zeit kein Lesen/Schreiben mehr stattfindet

Der Verfall nach Leihe könnte eine direkt eingezogene Leihgebühr sein, welche die Accounts in der Datenbank der aktiven Zustände behält. Der Verfall nach Zeit könnte ein Countdown seit der letzten Account-Interaktion, oder ein periodischer Verfall aller Accounts sein. Es könnte auch Mechanismen geben, welche beide Elemente der Zeit- und Leihbasierenden Modelle miteinander verbindet. Zum Beispiel könnten individuelle Accounts im aktiven Zustand verbleiben, wenn sie einen kleinen Betrag vor dem Datum ihres Verfalls zahlen. Mit dem Zustandsverfall ist es wichtig zu beachten, dass inaktive Zustände **nicht gelöscht**, sondern einfach separat vom aktiven Zustand gespeichert werden. Der inaktive Zustand kann einfach wieder in den aktiven Zustand gebracht werden.

Das würde wahrscheinlich durch Zustandsbäume für verschiedene Zeiträume (vielleicht ~1 Jahr) funktionieren. Wenn ein neuer Zeitraum beginnt, beginnt auch ein neuer Zustandsbaum. Nur der derzeitige Zustandsbaum kann modifiziert werden, alle anderen sind unveränderlich. Von Ethereum Nodes wird erwartet, den derzeitigen und letzten Zustandsbaum zu halten. Die erfordert eine Möglichkeit einer Adresse einen Zeitstempel mit der zugehörigen Periode zu geben. Es gibt [mehrere Möglichkeiten](https://ethereum-magicians.org/t/types-of-resurrection-metadata-in-state-expiry/6607) dies zu machen, die führende Option erfordert jedoch [das Verlängern von Adressen](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485), um die zusätzlichen Informationen unterzubringen. Das hätte den zusätzlichen Vorteil, dass längere Adressen sicherer wären. Das Roadmap-Eintrag, welcher dies macht, nennt sich [Ethereum Raumerweiterung](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485).

Ähnlich zum Verfallen des Vergangenen würde die Verantwortung für das Speichern alter Daten für individuelle Nutzer wegfallen und auf andere Entitäten wie zentralisierten Anbieter, selbstlosen Mitgliedern der Community oder futuristischeren dezentralen Lösungsansätzen wie dem Portal Netzwerk verteilt.

Zustandsverfall ist immer noch in der Forschungsphase und nicht bereit ausgeliefert zu werden. Zustandsverfälle könnten gut nach zustandslosen Clients und dem Verfallen vom Vergangenen passieren, da diese Verbesserungen große Zustandsgrößen für die Mehrheit von Validatoren gut verwaltbar.

## Zustandslosigkeit {#statelessness}

Zustandslosigkeit ist fast eine falsche Bezeichnung, da nicht das Konzept des Zustands eliminiert wird. Stattdessen beinhaltet es Änderungen dazu, wie Ethereum Nodes Zustandsdaten verarbeiten. Zustandslosigkeit selber kommt in zwei Arten: schwache und starke Zustandslosigkeit. Schwache Zustandslosigkeit ermöglicht den meisten Nodes zustandslos zu werden, indem sie die Verantwortung für das Speichern der Zustände auf mehrere aufteilen. Starke Zustandslosigkeit entfernt komplett die Notwendigkeit für jeden Node die kompletten Zustandsdaten zu speichern. Sowohl schwache, als auch starke Zustandslosigkeit bieten die folgenden Vorteile für normale Validatoren:

- Beinahe direkte Synchronisation
- Die Fähigkeit Blöcke ohne Reihenfolge zu validieren
- Das Betreiben von Nodes mit sehr geringen Hardware Voraussetzung (z.B. Handys)
- Das Betreiben von Nodes auf günstigen Festplatten, da kein schreiben/lesen auf dem Speicher nötig ist
- Kompatibilität mit zukünftigen Verbesserungen der Kryptographie Ethereums

### Schwache Zustandslosigkeit {#weak-statelessness}

Schwache Zustandslosigkeit beinhaltet Änderungen dazu, wie Ethereum Nodes Zustandsänderungen verifizieren, jedoch eliminiert es nicht komplett den Bedarf für Zustandsspeicher auf allen Nodes des Netzwerks. Stattdessen schiebt schwache Zustandslosigkeit die Verantwortung für den Zustandsspeicher auf Blockantragsteller (block proposer), während alle anderen Nodes auf dem Netzwerk Blöcke verifizieren, ohne die vollen Zustandsdaten zu speichern.

**Bei der schwachen Zustandslosigkeit brauchen Blöcke Zugriff auf die vollen Zustandsdaten, jedoch benötigt das Verifizieren von Blöcken keine Zustandsdaten**

Damit dies passieren kann, müssen [Verkle Trees](/roadmap/verkle-trees/) bereits in Ethereum Clients implementiert sein. Verkle-Bäume sind eine Datenersetzungsstruktur um Ethereums Zustandsdaten zu speichern. Sie erlauben kleine "Zeugen" fester Größe, die dazu da sind Daten zwischen Peers zu vermitteln und Blöcke direkt, anstatt gegen lokale Datenbanken zu verifizieren. [Proposer-Builder Separation](/roadmap/pbs/) wird zudem benötigt, da es Blockerzeugern erlaubt spezialisierte Nodes mit leistungsfähigerer Hardware zu sein und da sie es sind, die Zugriff auf die vollen Zustandsdaten brauchen.

<ExpandableCard title="Warum ist es OK ist sich auf weniger Block Proposer zu stützen?" eventCategory="/roadmap/statelessness" eventName="clicked why is it OK to rely on fewer block proposers?">

Zustandslosigkeit stützt sich auf Blockerzeuger, welche eine Kopie der vollen Zustandsdaten pflegen, sodass sie Zeugen generieren können, welche genutzt werden um Blöcke zu verifizieren. Andere Nodes müssen die Zustandsdaten nicht abrufen, da alle benötigten Informationen für das Verifizieren eines Blocks im Zeugen vorhanden sind. Das erzeugt eine Situation, in der das Vorschlagen eines Blocks teuer, das Verifizieren jedoch günstig ist, was bedeutet, das weniger Operatoren einen blockvorschlagenden Node betreiben werden. Jedoch ist die Dezentralisation von Block Proposern nicht kritisch, solange möglichst viele Teilnehmende unabhängig voneinander verifizieren können, dass der vorgeschlagene Block valide ist.

<ButtonLink variant="outline-color" href="https://notes.ethereum.org/WUUUXBKWQXORxpFMlLWy-w#So-why-is-it-ok-to-have-expensive-proposers">Lesen Sie mehr in Dankrads Notizen</ButtonLink>
</ExpandableCard>

Block Proposer nutzen die Zustandsdaten, um "Zeugen" zu erzeugen - die minimale Menge an Daten, die die Werte des Zustands beweisen, welche während einer Transaktion in einem Block geändert werden. Andere Validatoren halten nicht den Zustand, sie speichern nur die Wurzel des Zustands (state root) (einen Hash des gesamten Zustands). Sie erhalten einen Block und einen Zeugen und nutzen diese, um ihre Wurzel des Zustands zu aktualisieren. Das macht einen validierenden Node extrem leichtgewichtig.

Schwache Zustandslosigkeit ist in einem fortgeschrittenem Forschungsstand, aber es stützt sich stark darauf, dass Proposer-Builder Separation und Verkle Bäume implementiert werden, sodass kleine Zeugen zwischen Peers übergeben werden können. Das bedeutet, dass schwache Zustandslosigkeit wahrscheinlich noch einige Jahre vom Ethereum Hauptnetz entfernt ist.

### Starke Zustandslosigkeit {#strong-statelessness}

Bei starker Zustandslosigkeit besteht keine Notwendigkeit mehr für Knoten, Statusdaten zu speichern. Stattdessen werden Transaktionen mit Zeugen, welche von Blockerzeugern aggregiert werden können, versendet. Die Blockerzeuger sind dann verantwortlich, nur den für die Generierung von Zeugen für relevante Accounts gebrauchten Zustand zu speichern. Die Verantwortung für den Zustand ist fast komplett an den Nutzer verschoben, da diese Zeugen senden und 'Listen aufrufen' um zu erklären, mit welchen Account- und Speicherschlüsseln sie interagieren. Dies würde extrem leichte Nodes ermöglichen, aber es gibt auch Nachteile, einschließlich der Erschwerung von Transaktionen mit Smart Contracts.

Starke Zustandslosigkeit wurde von Forschern untersucht, wird aber wahrscheinlich kein Teil der Ethereum Roadmap sein - es ist wahrscheinlicher, dass die schwache Zustandslosigkeit für Ethereums Skalierungsbedürfnisse ausreicht.

## Aktueller Fortschritt {#current-progress}

Schwache Zustandslosigkeit, Verfall des Vergangenen und Zustandsverfall sind alle in der Forschungsphase und können voraussichtlich in einigen Jahren ausgesendet werden. Es gibt keine Garantie dafür, dass all diese Vorschläge implementiert werden, zum Beispiel wird es eventuell nicht nötig sein den Verfall des Vergangenen nach dem Zustandsverfall zu implementieren. Es gibt auch andere Punkte der Roadmap, so wie [Verkle Bäume](/roadmap/verkle-trees) und [Proposer-Builder Separation](/roadmap/pbs), welche zuerst fertiggestellt werden müssen.

## Weiterführende Informationen {#further-reading}

- [Vitalik Zustandslosigkeit AMA](https://www.reddit.com/r/ethereum/comments/o9s15i/impromptu_technical_ama_on_statelessness_and/)
- [Eine Theorie der Zustandsgrößenverwaltung](https://hackmd.io/@vbuterin/state_size_management)
- [Die Konflikt-minimierte Zustandsbünde wiederherstellen](https://ethresear.ch/t/resurrection-conflict-minimized-state-bounding-take-2/8739)
- [Wege zur Zustandslosigkeit und zum Zustandsverfall](https://hackmd.io/@vbuterin/state_expiry_paths)
- [EIP-4444 Spezifikation](https://eips.ethereum.org/EIPS/eip-4444)
- [Alex Stokes zu EIP-4444](https://youtu.be/SfDC_qUZaos)
- [Warum es so wichtig ist zustandslos zu werden](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html)
- [Die originalen zustandsloser Client Konzeptnotizen](https://ethresear.ch/t/the-stateless-client-concept/172)
- [Mehr zum Zustandsverfall](https://hackmd.io/@vbuterin/state_size_management#A-more-moderate-solution-state-expiry)
- [Noch mehr zum Zustandsverfall](https://hackmd.io/@vbuterin/state_expiry_paths#Option-2-per-epoch-state-expiry)
