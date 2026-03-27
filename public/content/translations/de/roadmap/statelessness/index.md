---
title: Zustandslosigkeit, Zustandsablauf und Historienablauf
description: "Erklärung des Historienablaufs und des zustandslosen Ethereums"
lang: de
---

# Zustandslosigkeit, Zustandsablauf und Historienablauf {#statelessness}

Die Fähigkeit, [Ethereum](/)-Blockchain-Knoten auf bescheidener Hardware auszuführen, ist entscheidend für echte Dezentralisierung. Das liegt daran, dass der Betrieb eines Blockchain-Knotens den Benutzern die Möglichkeit gibt, Informationen durch unabhängige kryptografische Prüfungen zu verifizieren, anstatt darauf zu vertrauen, dass eine dritte Partei ihnen Daten liefert. Der Betrieb eines Blockchain-Knotens ermöglicht es Benutzern, Transaktionen direkt an das Peer-to-Peer-Netzwerk von Ethereum zu senden, anstatt einem Vermittler vertrauen zu müssen. Dezentralisierung ist nicht möglich, wenn diese Vorteile nur Benutzern mit teurer Hardware zur Verfügung stehen. Stattdessen sollten Blockchain-Knoten mit extrem geringen Verarbeitungs- und Speicheranforderungen laufen können, sodass sie auf Mobiltelefonen, Mikrocomputern oder unbemerkt auf einem Heimcomputer ausgeführt werden können.

Heute sind hohe Speicherplatzanforderungen das Haupthindernis, das einen universellen Zugang zu Blockchain-Knoten verhindert. Dies liegt in erster Linie an der Notwendigkeit, große Teile der Zustandsdaten von Ethereum zu speichern. Diese Zustandsdaten enthalten wichtige Informationen, die erforderlich sind, um neue Blöcke und Transaktionen korrekt zu verarbeiten. Zum Zeitpunkt des Schreibens wird eine schnelle 2-TB-SSD für den Betrieb eines vollständigen Ethereum-Blockchain-Knotens empfohlen. Für einen Blockchain-Knoten, der keine älteren Daten bereinigt, wächst der Speicherbedarf um etwa 14 GB/Woche, und Archiv-Blockchain-Knoten, die alle Daten seit dem Genesis-Block speichern, nähern sich 12 TB (zum Zeitpunkt des Schreibens im Februar 2023).

Günstigere Festplatten können verwendet werden, um ältere Daten zu speichern, aber diese sind zu langsam, um mit eingehenden Blöcken Schritt zu halten. Die Beibehaltung der aktuellen Speichermodelle für Anwendungen, während Daten billiger und einfacher zu speichern gemacht werden, ist nur eine vorübergehende und teilweise Lösung für das Problem, da das Zustandswachstum von Ethereum „unbegrenzt“ ist. Das bedeutet, dass die Speicheranforderungen immer nur steigen können und technologische Verbesserungen immer mit dem kontinuierlichen Zustandswachstum Schritt halten müssen. Stattdessen müssen Anwendungen neue Wege finden, um Blöcke und Transaktionen zu verifizieren, die nicht darauf angewiesen sind, Daten in lokalen Datenbanken nachzuschlagen.

## Reduzierung des Speicherplatzes für Blockchain-Knoten {#reducing-storage-for-nodes}

Es gibt mehrere Möglichkeiten, die Datenmenge zu reduzieren, die jeder Blockchain-Knoten speichern muss, wobei jede eine Aktualisierung des Kernprotokolls von Ethereum in unterschiedlichem Ausmaß erfordert:

- **Historienablauf**: Ermöglicht es Blockchain-Knoten, Zustandsdaten zu verwerfen, die älter als X Blöcke sind, ändert jedoch nicht, wie Ethereum-Anwendungen mit Zustandsdaten umgehen.
- **Zustandsablauf**: Ermöglicht es, dass Zustandsdaten, die nicht häufig verwendet werden, inaktiv werden. Inaktive Daten können von Anwendungen ignoriert werden, bis sie wiederhergestellt werden.
- **Schwache Zustandslosigkeit**: Nur Blockproduzenten benötigen Zugriff auf vollständige Zustandsdaten, andere Blockchain-Knoten können Blöcke ohne eine lokale Zustandsdatenbank verifizieren.
- **Starke Zustandslosigkeit**: Keine Blockchain-Knoten benötigen Zugriff auf die vollständigen Zustandsdaten.

## Datenablauf {#data-expiry}

### Historienablauf {#history-expiry}

Historienablauf bezieht sich darauf, dass Anwendungen ältere Daten bereinigen, die sie wahrscheinlich nicht benötigen, sodass sie nur eine kleine Menge historischer Daten speichern und ältere Daten verwerfen, wenn neue Daten eintreffen. Es gibt zwei Gründe, warum Anwendungen historische Daten benötigen: Synchronisierung und die Bedienung von Datenanfragen. Ursprünglich mussten Anwendungen vom Genesis-Block an synchronisieren und überprüfen, ob jeder nachfolgende Block bis zur Spitze der Chain korrekt ist. Heute verwenden Anwendungen „Weak Subjectivity Checkpoints“ (Prüfpunkte für schwache Subjektivität), um sich an die Spitze der Chain zu arbeiten. Diese Prüfpunkte sind vertrauenswürdige Startpunkte, ähnlich wie ein Genesis-Block, der näher an der Gegenwart liegt als ganz am Anfang von Ethereum. Das bedeutet, dass Anwendungen alle Informationen vor dem jüngsten Prüfpunkt für schwache Subjektivität verwerfen können, ohne die Fähigkeit zu verlieren, sich mit der Spitze der Chain zu synchronisieren. Anwendungen bedienen derzeit Anfragen (die über JSON-RPC eingehen) nach historischen Daten, indem sie diese aus ihren lokalen Datenbanken abrufen. Mit dem Historienablauf wird dies jedoch nicht möglich sein, wenn die angeforderten Daten bereinigt wurden. Für die Bereitstellung dieser historischen Daten sind einige innovative Lösungen erforderlich.

Eine Option ist, dass Anwendungen historische Daten von Peers über eine Lösung wie das Portal Network anfordern. Das Portal Network ist ein in der Entwicklung befindliches Peer-to-Peer-Netzwerk zur Bereitstellung historischer Daten, bei dem jeder Blockchain-Knoten einen kleinen Teil der Geschichte von Ethereum speichert, sodass die gesamte Geschichte verteilt über das Netzwerk existiert. Anfragen werden bedient, indem Peers gesucht werden, die die relevanten Daten speichern, und diese von ihnen angefordert werden. Da es in der Regel Apps sind, die Zugriff auf historische Daten benötigen, kann es alternativ zu ihrer Verantwortung werden, diese zu speichern. Es könnte auch genügend altruistische Akteure im Ethereum-Bereich geben, die bereit wären, historische Archive zu pflegen. Es könnte eine DAO sein, die gegründet wird, um die Speicherung historischer Daten zu verwalten, oder idealerweise wird es eine Kombination all dieser Optionen sein. Diese Anbieter könnten die Daten auf viele Arten bereitstellen, z. B. über einen Torrent, FTP, Filecoin oder IPFS.

Der Historienablauf ist etwas umstritten, da Ethereum bisher immer implizit die Verfügbarkeit aller historischen Daten garantiert hat. Eine vollständige Synchronisierung ab dem Genesis-Block war standardmäßig immer möglich, auch wenn sie darauf beruht, einige ältere Daten aus Snapshots wiederherzustellen. Der Historienablauf verlagert die Verantwortung für die Bereitstellung dieser Garantie aus dem Kernprotokoll von Ethereum heraus. Dies könnte neue Zensurrisiken mit sich bringen, wenn letztendlich zentralisierte Organisationen einspringen, um historische Daten bereitzustellen.

EIP-4444 ist noch nicht bereit für die Veröffentlichung, wird aber aktiv diskutiert. Interessanterweise sind die Herausforderungen bei EIP-4444 weniger technischer Natur, sondern betreffen hauptsächlich das Community-Management. Damit dies umgesetzt werden kann, bedarf es der Zustimmung der Community, die nicht nur eine Einigung, sondern auch Verpflichtungen zur Speicherung und Bereitstellung historischer Daten durch vertrauenswürdige Entitäten umfasst.

Dieses Upgrade ändert nicht grundlegend, wie Ethereum-Blockchain-Knoten mit Zustandsdaten umgehen, es ändert lediglich, wie auf historische Daten zugegriffen wird.

### Zustandsablauf {#state-expiry}

Zustandsablauf bezieht sich auf das Entfernen des Zustands von einzelnen Blockchain-Knoten, wenn in letzter Zeit nicht darauf zugegriffen wurde. Es gibt mehrere Möglichkeiten, wie dies implementiert werden könnte, darunter:

- **Ablauf durch Miete**: Erhebung einer „Miete“ für Konten und deren Ablauf, wenn ihre Miete null erreicht
- **Ablauf durch Zeit**: Inaktivierung von Konten, wenn für eine bestimmte Zeit nicht auf dieses Konto zugegriffen (gelesen/geschrieben) wird

Der Ablauf durch Miete könnte eine direkte Miete sein, die Konten in Rechnung gestellt wird, um sie in der aktiven Zustandsdatenbank zu halten. Der Ablauf durch Zeit könnte durch einen Countdown ab der letzten Kontointeraktion erfolgen, oder es könnte ein periodischer Ablauf aller Konten sein. Es könnte auch Mechanismen geben, die Elemente sowohl des zeit- als auch des mietbasierten Modells kombinieren, zum Beispiel bleiben einzelne Konten im aktiven Zustand, wenn sie vor dem zeitbasierten Ablauf eine kleine Gebühr zahlen. Beim Zustandsablauf ist es wichtig zu beachten, dass der inaktive Zustand **nicht gelöscht** wird, er wird lediglich getrennt vom aktiven Zustand gespeichert. Der inaktive Zustand kann wieder in den aktiven Zustand überführt werden.

Die Art und Weise, wie dies funktionieren würde, besteht wahrscheinlich darin, einen Zustandsbaum für bestimmte Zeiträume (vielleicht ~1 Jahr) zu haben. Wann immer ein neuer Zeitraum beginnt, beginnt auch ein völlig neuer Zustandsbaum. Nur der aktuelle Zustandsbaum kann geändert werden, alle anderen sind unveränderlich. Von Ethereum-Blockchain-Knoten wird nur erwartet, dass sie den aktuellen Zustandsbaum und den nächstjüngeren speichern. Dies erfordert eine Möglichkeit, eine Adresse mit dem Zeitraum, in dem sie existiert, mit einem Zeitstempel zu versehen. Es gibt [mehrere mögliche Wege](https://ethereum-magicians.org/t/types-of-resurrection-metadata-in-state-expiry/6607), dies zu tun, aber die führende Option erfordert, dass [Adressen verlängert werden](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485), um die zusätzlichen Informationen aufzunehmen, mit dem zusätzlichen Vorteil, dass längere Adressen viel sicherer sind. Der Roadmap-Punkt, der dies umsetzt, wird [Adressraumerweiterung](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485) genannt.

Ähnlich wie beim Historienablauf wird beim Zustandsablauf die Verantwortung für die Speicherung alter Zustandsdaten von einzelnen Benutzern genommen und auf andere Entitäten wie zentralisierte Anbieter, altruistische Community-Mitglieder oder futuristischere dezentralisierte Lösungen wie das Portal Network übertragen.

Der Zustandsablauf befindet sich noch in der Forschungsphase und ist noch nicht bereit für die Veröffentlichung. Der Zustandsablauf könnte durchaus später erfolgen als zustandslose Anwendungen und der Historienablauf, da diese Upgrades große Zustandsgrößen für die Mehrheit der Validatoren leicht handhabbar machen.

## Zustandslosigkeit {#statelessness}

Zustandslosigkeit ist ein wenig irreführend, da es nicht bedeutet, dass das Konzept des „Zustands“ eliminiert wird, aber es beinhaltet Änderungen daran, wie Ethereum-Blockchain-Knoten mit Zustandsdaten umgehen. Zustandslosigkeit selbst gibt es in zwei Varianten: schwache Zustandslosigkeit und starke Zustandslosigkeit. Schwache Zustandslosigkeit ermöglicht es den meisten Blockchain-Knoten, zustandslos zu werden, indem die Verantwortung für die Zustandsspeicherung auf einige wenige übertragen wird. Starke Zustandslosigkeit beseitigt die Notwendigkeit für jeden Blockchain-Knoten, die vollständigen Zustandsdaten zu speichern, vollständig. Sowohl schwache als auch starke Zustandslosigkeit bieten normalen Validatoren die folgenden Vorteile:

- nahezu sofortige Synchronisierung
- Fähigkeit, Blöcke in beliebiger Reihenfolge zu validieren
- Blockchain-Knoten können mit sehr geringen Hardwareanforderungen ausgeführt werden (z. B. auf Telefonen)
- Blockchain-Knoten können auf billigen Festplatten ausgeführt werden, da kein Lesen/Schreiben auf der Festplatte erforderlich ist
- kompatibel mit zukünftigen Upgrades der Kryptografie von Ethereum

### Schwache Zustandslosigkeit {#weak-statelessness}

Schwache Zustandslosigkeit beinhaltet Änderungen an der Art und Weise, wie Ethereum-Blockchain-Knoten Zustandsänderungen verifizieren, beseitigt jedoch nicht vollständig die Notwendigkeit der Zustandsspeicherung in allen Blockchain-Knoten im Netzwerk. Stattdessen überträgt schwache Zustandslosigkeit die Verantwortung für die Zustandsspeicherung auf Block-Vorschlagende, während alle anderen Blockchain-Knoten im Netzwerk Blöcke verifizieren, ohne die vollständigen Zustandsdaten zu speichern.

**Bei schwacher Zustandslosigkeit erfordert das Vorschlagen von Blöcken Zugriff auf vollständige Zustandsdaten, aber das Verifizieren von Blöcken erfordert keine Zustandsdaten**

Damit dies geschehen kann, müssen [Verkle-Bäume](/roadmap/verkle-trees/) bereits in Ethereum-Anwendungen implementiert worden sein. Verkle-Bäume sind eine Ersatzdatenstruktur zur Speicherung von Ethereum-Zustandsdaten, die es ermöglichen, kleine „Zeugen“ (Witnesses) fester Größe für die Daten zwischen Peers weiterzugeben und zur Verifizierung von Blöcken zu verwenden, anstatt Blöcke gegen lokale Datenbanken zu verifizieren. [Proposer-Builder-Trennung](/roadmap/pbs/) ist ebenfalls erforderlich, da dies ermöglicht, dass Block-Ersteller spezialisierte Blockchain-Knoten mit leistungsfähigerer Hardware sind, und diese sind diejenigen, die Zugriff auf die vollständigen Zustandsdaten benötigen.

<ExpandableCard title="Warum ist es in Ordnung, sich auf weniger Block-Vorschlagende zu verlassen?" eventCategory="/roadmap/statelessness" eventName="clicked why is it OK to rely on fewer block proposers?">

Zustandslosigkeit beruht darauf, dass Block-Ersteller eine Kopie der vollständigen Zustandsdaten pflegen, damit sie Zeugen generieren können, die zur Verifizierung des Blocks verwendet werden können. Andere Blockchain-Knoten benötigen keinen Zugriff auf die Zustandsdaten, alle zur Verifizierung des Blocks erforderlichen Informationen sind im Zeugen verfügbar. Dies schafft eine Situation, in der das Vorschlagen eines Blocks teuer ist, das Verifizieren des Blocks jedoch günstig, was impliziert, dass weniger Betreiber einen Block-vorschlagenden Blockchain-Knoten ausführen werden. Die Dezentralisierung von Block-Vorschlagenden ist jedoch nicht kritisch, solange so viele Teilnehmer wie möglich unabhängig verifizieren können, dass die von ihnen vorgeschlagenen Blöcke gültig sind.

<ButtonLink variant="outline-color" href="https://notes.ethereum.org/WUUUXBKWQXORxpFMlLWy-w#So-why-is-it-ok-to-have-expensive-proposers">Lesen Sie mehr in Dankrads Notizen</ButtonLink>
</ExpandableCard>

Block-Vorschlagende verwenden die Zustandsdaten, um „Zeugen“ zu erstellen – den minimalen Datensatz, der die Werte des Zustands beweist, die durch die Transaktionen in einem Block geändert werden. Andere Validatoren halten den Zustand nicht, sie speichern nur die Zustandswurzel (einen Hash des gesamten Zustands). Sie empfangen einen Block und einen Zeugen und verwenden diese, um ihre Zustandswurzel zu aktualisieren. Dies macht einen validierenden Blockchain-Knoten extrem leichtgewichtig.

Schwache Zustandslosigkeit befindet sich in einem fortgeschrittenen Forschungsstadium, beruht jedoch darauf, dass die Proposer-Builder-Trennung und Verkle-Bäume implementiert wurden, sodass kleine Zeugen zwischen Peers weitergegeben werden können. Das bedeutet, dass schwache Zustandslosigkeit wahrscheinlich noch einige Jahre vom Ethereum-Mainnet entfernt ist.

zkEVM für die L1-Verifizierung ist eine ergänzende Technologie, die die staatenlose Verifizierung weiter verbessern könnte. Anstatt nur Zeugen zu prüfen, könnten Validatoren einen Zero-Knowledge-Beweis verifizieren, dass der gesamte Block korrekt ausgeführt wurde -- was kryptografische Gewissheit bietet, ohne Transaktionen erneut auszuführen.

### Starke Zustandslosigkeit {#strong-statelessness}

Starke Zustandslosigkeit beseitigt die Notwendigkeit für jeden Blockchain-Knoten, Zustandsdaten zu speichern. Stattdessen werden Transaktionen mit Zeugen gesendet, die von Blockproduzenten aggregiert werden können. Die Blockproduzenten sind dann dafür verantwortlich, nur den Zustand zu speichern, der für die Generierung von Zeugen für relevante Konten benötigt wird. Die Verantwortung für den Zustand wird fast vollständig auf die Benutzer verlagert, da sie Zeugen und „Zugriffslisten“ senden, um zu deklarieren, mit welchen Konten und Speicherschlüsseln sie interagieren. Dies würde extrem leichtgewichtige Blockchain-Knoten ermöglichen, aber es gibt Kompromisse, einschließlich der Tatsache, dass es schwieriger wird, mit Smart Contracts zu interagieren.

Starke Zustandslosigkeit wurde von Forschern untersucht, wird aber derzeit voraussichtlich nicht Teil der Roadmap von Ethereum sein – es ist wahrscheinlicher, dass schwache Zustandslosigkeit für die Skalierungsanforderungen von Ethereum ausreicht.

## Aktueller Fortschritt {#current-progress}

Schwache Zustandslosigkeit, Historienablauf und Zustandsablauf befinden sich alle in der Forschungsphase und werden voraussichtlich erst in einigen Jahren veröffentlicht. Es gibt keine Garantie, dass alle diese Vorschläge implementiert werden. Wenn beispielsweise der Zustandsablauf zuerst implementiert wird, besteht möglicherweise keine Notwendigkeit, auch den Historienablauf zu implementieren. Es gibt auch andere Roadmap-Punkte, wie [Verkle-Bäume](/roadmap/verkle-trees) und [Proposer-Builder-Trennung](/roadmap/pbs), die zuerst abgeschlossen werden müssen.

## Weiterführende Literatur {#further-reading}

- [Was ist zustandsloses Ethereum?](https://stateless.fyi/)
- [Vitalik Zustandslosigkeit AMA](https://www.reddit.com/r/ethereum/comments/o9s15i/impromptu_technical_ama_on_statelessness_and/)
- [Eine Theorie des Zustandsgrößenmanagements](https://hackmd.io/@vbuterin/state_size_management)
- [Wiederauferstehungs-konfliktminimierte Zustandsbegrenzung](https://ethresear.ch/t/resurrection-conflict-minimized-state-bounding-take-2/8739)
- [Wege zur Zustandslosigkeit und zum Zustandsablauf](https://hackmd.io/@vbuterin/state_expiry_paths)
- [EIP-4444-Spezifikation](https://eips.ethereum.org/EIPS/eip-4444)
- [Alex Stokes über EIP-4444](https://youtu.be/SfDC_qUZaos)
- [Warum es so wichtig ist, zustandslos zu werden](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html)
- [Die ursprünglichen Konzeptnotizen zur zustandslosen Anwendung](https://ethresear.ch/t/the-stateless-client-concept/172)
- [Mehr zum Zustandsablauf](https://hackmd.io/@vbuterin/state_size_management#A-more-moderate-solution-state-expiry)
- [Noch mehr zum Zustandsablauf](https://hackmd.io/@vbuterin/state_expiry_paths#Option-2-per-epoch-state-expiry)
- [Informationsseite zu zustandslosem Ethereum](https://stateless.fyi)