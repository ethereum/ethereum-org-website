---
title: Danksharding
description: Erfahre mehr über Proto-Danksharding und Danksharding - zwei aufeinanderfolgende Upgrades zur Skalierung von Ethereum.
lang: de
summaryPoints:
  - Danksharding ist ein mehrphasiges Upgrade, um die Skalierbarkeit und Kapazität von Ethereum zu verbessern.
  - Die erste Phase, Proto-Danksharding, fügt Datenblobs zu Blöcken hinzu
  - Datenblobs stellen eine kosteneffizientere Methode dar, mit der Rollups Daten zu Ethereum übertragen können. Diese Kosteneinsparungen können in Form von geringeren Transaktionsgebühren an die Nutzer weitergereicht werden.
  - Später wird das vollständige Danksharding die Verantwortung für die Überprüfung von Datenblobs auf Teilmengen von Nodes verteilen, was die Skalierung von Ethereum auf über 100.000 Transaktionen pro Sekunde weiter erhöht.
---

# Danksharding {#danksharding}

**Danksharding** ist der Weg, wie Ethereum zu einer wirklich skalierbaren Blockchain wird, aber es sind mehrere Protokoll-Upgrades erforderlich, um dorthin zu gelangen. **Proto-Danksharding** ist ein Zwischenschritt auf diesem Weg. Beide zielen darauf ab, Transaktionen auf Layer 2 für Benutzer so kostengünstig wie möglich zu machen und sollten Ethereum auf mehr als >100.000 Transaktionen pro Sekunde skalieren.

## Was ist Proto-Danksharding? {#what-is-protodanksharding}

Proto-Danksharding, auch bekannt als [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), ist eine Möglichkeit für [Rollups](/layer2/#rollups), kostengünstigere Daten zu Blöcken hinzuzufügen. Der Name stammt von den beiden Forschern, die die Idee vorgeschlagen haben: Protolambda und Dankrad Feist. Derzeit sind Rollups in ihrer Fähigkeit eingeschränkt, Benutzertransaktionen kostengünstig zu gestalten, da sie ihre Transaktionen in `CALLDATA` posten. Das ist teuer, weil es von allen Ethereum-Nodes verarbeitet wird und für immer in der Kette bleibt, obwohl Rollups die Daten nur für kurze Zeit benötigen. Proto-Danksharding führt Datenblobs ein, die gesendet und an Blöcke angehängt werden können. Die Daten in diesen Blobs sind für die EVM nicht zugänglich und werden automatisch nach einer festgelegten Zeitspanne (1-3 Monate) gelöscht. Das bedeutet, dass Rollups ihre Daten viel kostengünstiger senden und die Einsparungen in Form von günstigeren Transaktionen an die Endbenutzer weitergeben können.

<ExpandableCard title="Warum machen Blobs Rollups billiger?" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

Rollups sind eine Möglichkeit, Ethereum zu skalieren, indem Transaktionen außerhalb der Kette gebündelt und dann die Ergebnisse zu Ethereum gepostet werden. Ein Rollup besteht im Wesentlichen aus zwei Teilen: Daten und Ausführungsprüfung. Die Daten sind die vollständige Abfolge von Transaktionen, die von einem Rollup verarbeitet werden, um die Zustandsänderung zu erzeugen, die zu Ethereum gepostet wird. Die Ausführungsprüfung ist die Wiederholung dieser Transaktionen durch einen ehrlichen Akteur (einen "Prover"), um sicherzustellen, dass die vorgeschlagene Zustandsänderung korrekt ist. Damit die Ausführungsprüfung stattfinden kann, müssen die Transaktionsdaten lange genug verfügbar sein, damit jeder sie herunterladen und überprüfen kann. Das bedeutet, dass jedes unehrliche Verhalten des Rollup-Sequenzierers vom Beweiser erkannt und herausgefordert werden kann. Allerdings muss es nicht für immer verfügbar sein.

</ExpandableCard>

<ExpandableCard title="Warum ist es OK, die Blob-Daten zu löschen?" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

Rollups posten Verpflichtungen zu ihren Transaktionsdaten on-chain und stellen die tatsächlichen Daten auch in Datenblobs zur Verfügung. Das bedeutet, dass Beweiser überprüfen können, ob die Verpflichtungen gültig sind, oder Daten herausfordern können, von denen sie glauben, dass sie falsch sind. Auf Node-Ebene werden die Datenblobs im Konsens-Client gehalten. Die Konsens-Clients bezeugen, dass sie die Daten gesehen haben und dass sie im Netzwerk verbreitet wurden. Wenn die Daten für immer aufbewahrt würden, würden diese Clients aufgebläht und zu hohen Hardwareanforderungen für den Betrieb von Nodes führen. Stattdessen werden die Daten alle 1-3 Monate automatisch aus dem Node entfernt. Die Beglaubigungen des Konsens-Clients belegen, dass Beweisende ausreichend Gelegenheit hatten, die Daten zu überprüfen. Die tatsächlichen Daten können außerhalb der Kette von Rollup-Betreibern, Benutzern oder anderen gespeichert werden.

</ExpandableCard>

### Wie werden Blob-Daten überprüft? {#how-are-blobs-verified}

Rollups posten die Transaktionen, die sie ausführen, in Datenblobs. Sie posten auch eine "Verpflichtung" zu den Daten. Dies tun sie, indem sie eine Polynomfunktion an die Daten anpassen. Diese Funktion kann dann an verschiedenen Punkten ausgewertet werden. Zum Beispiel, wenn wir eine extrem einfache Funktion `f(x) = 2x-1` definieren, dann können wir diese Funktion für `x = 1`, `x = 2`, `x = 3` auswerten und erhalten die Ergebnisse `1, 3, 5`. Ein Beweiser wendet die gleiche Funktion auf die Daten an und wertet sie an den gleichen Punkten aus. Wenn die ursprünglichen Daten geändert werden, ist die Funktion nicht identisch und daher auch nicht die an jedem Punkt ausgewerteten Werte. In Wirklichkeit sind das Commitment und der Beweis komplizierter, da sie in kryptografische Funktionen eingebettet sind.

### Was ist KZG? {#what-is-kzg}

KZG steht für Kate-Zaverucha-Goldberg - die Namen der drei [ursprünglichen Autoren](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11) eines Schemas, das einen Datenblob auf ein kleines [kryptographisches "Commitment"](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html) reduziert. Der von einem Rollup eingereichte Datenblob muss überprüft werden, um sicherzustellen, dass der Rollup sich nicht falsch verhält. Dies beinhaltet, dass ein Beweiser die Transaktionen im Blob erneut ausführt, um zu überprüfen, ob das Commitment gültig war. Konzeptionell ist dies das gleiche Verfahren, wie Execution Clients die Gültigkeit von Ethereum-Transaktionen auf Layer 1 mithilfe von Merkle-Beweisen überprüfen. KZG ist ein alternativer Beweis, der eine Polynomgleichung an die Daten anpasst. Das Commitment bewertet das Polynom an einigen geheimen Datenpunkten. Ein Beweiser würde das gleiche Polynom über die Daten anpassen und es an denselben Werten auswerten, um zu überprüfen, ob das Ergebnis dasselbe ist. Ein Beweiser würde das gleiche Polynom über die Daten anpassen und es an denselben Werten auswerten, um zu überprüfen, ob das Ergebnis dasselbe ist.

### Was ist die KZG-Zeremonie? {#what-is-a-kzg-ceremony}

Eine KZG-Zeremonie ist eine Möglichkeit für viele Menschen aus der gesamten Ethereum-Community, gemeinsam eine geheime zufällige Zahlenfolge zu generieren, die zur Überprüfung einiger Daten verwendet werden kann. Es ist sehr wichtig, dass diese Zahlenfolge nicht bekannt ist und von niemandem neu erstellt werden kann. Um dies zu gewährleisten, erhält jede Person, die an der Zeremonie teilnimmt, eine Zeichenfolge vom vorherigen Teilnehmer. Sie erzeugen dann einige neue zufällige Werte (z.B. indem sie ihrem Browser erlauben, die Bewegung ihrer Maus zu messen) und mischen diese mit dem vorherigen Wert. Dann senden sie den Wert an den nächsten Teilnehmer weiter und löschen ihn von ihrem lokalen Rechner. Solange eine Person in der Zeremonie dies ehrlich tut, wird der endgültige Wert für einen Angreifer unbekannt sein. Die EIP-4844 KZG Zeremonie war öffentlich und zehntausende Menschen nahmen teil, um ihre eigene Entropie hinzuzufügen. Damit die Zeremonie untergraben wird, müssten 100% dieser Teilnehmer aktiv unehrlich sein. Aus der Sicht der Teilnehmer besteht, sofern sie wissen, dass sie ehrlich waren, keine Notwendigkeit, jemand anderem zu vertrauen. Sie haben durch ihre Ehrlichkeit selbst die Sicherheit der Zeremonie gewährleistet und die Anforderung erfüllt, dass mindestens einer von N Teilnehmern ehrlich sein muss.

<ExpandableCard title="Wofür wird die Zufallszahl der KZG-Zeremonie verwendet?" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

Wenn ein Rollup Daten in einem Blob veröffentlicht, gibt er ein "Commitment" ab, das er in der Blockchain veröffentlicht. Dieses Commitment ist das Ergebnis der Auswertung eines an die Daten angepassten Polynoms an bestimmten Punkten. Diese Punkte werden durch die in der KZG-Zeremonie erzeugten Zufallszahlen definiert. Beweiser können dann das Polynom an denselben Punkten auswerten, um die Daten zu überprüfen - wenn sie zu denselben Werten kommen, dann sind die Daten korrekt.

</ExpandableCard>

<ExpandableCard title="Warum müssen die KZG-Zufallsdaten geheim bleiben?" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

Das ist korrekt. Wenn jemand die zufälligen Punkte kennt, die für das Commitment verwendet werden, könnte er tatsächlich ein neues Polynom erstellen, das an diesen spezifischen Punkten passt (also eine "Kollision" erzeugen). Das bedeutet, sie könnten Daten zum Blob hinzufügen oder daraus entfernen und dennoch einen gültigen Nachweis liefern. Um dies zu verhindern, erhalten die Beweiser statt der tatsächlichen geheimen Positionen diese Positionen eingehüllt in eine kryptographische "Black Box" unter Verwendung elliptischer Kurven. Diese verzerren die Werte effektiv auf eine Weise, dass die ursprünglichen Werte nicht rückentwickelt werden können, aber mit einiger cleverer Algebra können Beweiser und Verifizierer immer noch Polynome an den Punkten auswerten, die sie repräsentieren.

</ExpandableCard>

<InfoBanner isWarning mb={8}>
  Weder Danksharding noch Proto-Danksharding folgen dem traditionellen "Sharding"-Modell, das darauf abzielt, die Blockchain in mehrere Teile zu unterteilen. Shardketten sind nicht mehr Teil der Roadmap. Stattdessen verwendet Danksharding verteiltes Daten-Sampling über Blobs, um Ethereum zu skalieren. Dies ist viel einfacher zu implementieren. Dieses Modell wird manchmal als "Data-Sharding" bezeichnet.
</InfoBanner>

## Was ist Danksharding? {#what-is-danksharding}

Danksharding ist die vollständige Realisierung der Rollup-Skalierung, die mit Proto-Danksharding begann. Danksharding wird enorme Mengen an Speicherplatz auf Ethereum bereitstellen, damit Rollups ihre komprimierten Transaktionsdaten ablegen können. Das bedeutet, dass Ethereum problemlos Hunderte von individuellen Rollups unterstützen kann und Millionen von Transaktionen pro Sekunde zur Realität macht.

Die Funktionsweise besteht darin, die an Blöcke angehängten Blobs von 1 in Proto-Danksharding auf 64 in vollem Danksharding zu erweitern. Der Rest der benötigten Änderungen betrifft alle Updates in der Funktionsweise der Konsens-Clients, um sie in die Lage zu versetzen, die neuen großen Blobs zu verarbeiten. Mehrere dieser Änderungen sind bereits unabhängig von Danksharding aus anderen Gründen auf der Roadmap. Zum Beispiel erfordert Danksharding, dass die Trennung von Proposer und Builder implementiert wurde. Dies ist ein Upgrade, das die Aufgaben des Erstellens und Vorschlagens von Blöcken auf verschiedene Validierer verteilt. Ebenso ist Datenverfügbarkeitsstichproben für Danksharding erforderlich, aber sie sind auch für die Entwicklung von sehr leichtgewichtigen Clients erforderlich, die nicht viele historische Daten speichern ("zustandslose Clients").

<ExpandableCard title="Warum verlangt Danksharding eine Trennung von Vorschlagsbauern?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

Die Trennung von Vorschlagenden und Erstellenden ist notwendig, um zu verhindern, dass einzelne Validatoren teure Verpflichtungen und Nachweise für 32MB Blob-Daten erzeugen müssen. Dies würde zu einer zu großen Belastung für Heim-Staker führen und sie dazu zwingen, in leistungsfähigere Hardware zu investieren, was die Dezentralisierung beeinträchtigen würde. Stattdessen übernehmen spezialisierte Blockersteller die Verantwortung für diese aufwändige Rechenarbeit. Dann stellen sie ihre Blöcke den Blockvorschlägern zur Verfügung, um sie zu senden. Der Blockvorschläger wählt einfach den Block aus, der am rentabelsten ist. Jeder kann die Blobs kostengünstig und schnell überprüfen, was bedeutet, dass jeder normale Validator überprüfen kann, ob die Blockersteller ehrlich handeln. Dies ermöglicht die Verarbeitung der großen Blobs, ohne die Dezentralisierung zu opfern. Block Builder, die sich schlecht verhalten, könnten einfach aus dem Netzwerk geworfen und bestraft werden - andere würden ihren Platz einnehmen, weil Block Building eine profitable Tätigkeit ist.

</ExpandableCard>

<ExpandableCard title="Warum benötigt Danksharing Datenverfügbarkeitsproben?" eventCateogry="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

Validators only have to download a small piece of each blob in order to verify its availability, rather than the entire thing. Mithilfe des Data Availability Samplings können die Validatoren sehr sicher sein, dass die Blob-Daten verfügbar waren und korrekt bestätigt wurden. Jeder Validator kann zufällig nur einige Datenpunkte abrufen und einen Nachweis erstellen, was bedeutet, dass kein Validator den gesamten Blob überprüfen muss. Fehlen irgendwelche Daten, wird dies schnell erkannt und der Blob abgelehnt.

</ExpandableCard>

### Aktueller Fortschritt {#current-progress}

Volles Danksharding ist noch einige Jahre entfernt. Allerdings sollte Proto-Danksharding relativ bald eintreffen. Zum Zeitpunkt des Schreibens (Feb 2023) ist die KZG-Zeremonie immer noch offen und hat bisher über 50.000 Teilnehmer angezogen. Der [EIP](https://eips.ethereum.org/EIPS/eip-4844) für Proto-Danksharding ist ausgereift, die Spezifikation ist vereinbart und die Clients haben Prototypen implementiert, die derzeit getestet und einsatzbereit gemacht werden. Der nächste Schritt besteht darin, die Änderungen auf einem öffentlichen Testnetz zu implementieren. Sie können sich auf dem Laufenden halten, indem Sie die [EIP 4844-Bereitschaftscheckliste](https://github.com/ethereum/pm/blob/master/Breakout-Room/4844-readiness-checklist.md#client-implementation-status) verwenden.

### Weiterführende Informationen {#further-reading}

- [Proto-Danksharding Notizen](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Dankrad's Notizen zum Danksharing](https://notes.ethereum.org/@dankrad/new_sharding)
- [Dankrad, Proto und Vitalik diskutieren Danksharding](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Die KZG-Zeremonie](https://ceremony.ethereum.org/)
- [Carl Beekhuizens Devcon Vortrag über vertrauenswürdige Setups](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [Mehr zur Datenverfügbarkeitsabnahme für Blobs](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad-Feist über KZG-Verpflichtungen und Beweise](https://youtu.be/8L2C6RDMV9Q)
- [Polynome Verpflichtungen KZG](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)
