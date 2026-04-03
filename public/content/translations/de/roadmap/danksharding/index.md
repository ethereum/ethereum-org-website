---
title: Danksharding
description: "Erfahren Sie mehr über Proto-Danksharding und Danksharding – zwei aufeinanderfolgende Upgrades zur Skalierung von Ethereum."
lang: de
summaryPoints:
  - Danksharding ist ein mehrstufiges Upgrade zur Verbesserung der Skalierbarkeit und Kapazität von Ethereum.
  - Die erste Stufe, Proto-Danksharding, fügt Blöcken Daten-Blobs hinzu.
  - Daten-Blobs bieten Rollups eine günstigere Möglichkeit, Daten auf Ethereum zu veröffentlichen, und diese Kosten können in Form von niedrigeren Transaktionsgebühren an die Nutzer weitergegeben werden.
  - Später wird das vollständige Danksharding die Verantwortung für die Überprüfung von Daten-Blobs auf Teilmengen von Blockchain-Knoten verteilen und Ethereum weiter auf mehr als 100.000 Transaktionen pro Sekunde skalieren.
---

# Danksharding {#danksharding}

**Danksharding** ist der Weg, wie [Ethereum](/) zu einer wirklich skalierbaren Blockchain wird, aber es sind mehrere Protokoll-Upgrades erforderlich, um dorthin zu gelangen. **Proto-Danksharding** ist ein Zwischenschritt auf diesem Weg. Beide zielen darauf ab, Transaktionen auf Ebene 2 für Nutzer so günstig wie möglich zu machen und sollen Ethereum auf >100.000 Transaktionen pro Sekunde skalieren.

## Was ist Proto-Danksharding? {#what-is-protodanksharding}

Proto-Danksharding, auch bekannt als [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), ist eine Möglichkeit für [Rollups](/layer-2/#rollups), Blöcken günstigere Daten hinzuzufügen. Der Name stammt von den beiden Forschern, die die Idee vorgeschlagen haben: Protolambda und Dankrad Feist. In der Vergangenheit waren Rollups darin eingeschränkt, wie günstig sie Nutzertransaktionen machen konnten, da sie ihre Transaktionen in `CALLDATA` veröffentlichen.

Dies ist teuer, da es von allen Ethereum-Blockchain-Knoten verarbeitet wird und für immer auf der Blockchain verbleibt, obwohl Rollups die Daten nur für kurze Zeit benötigen. Proto-Danksharding führt Daten-Blobs ein, die gesendet und an Blöcke angehängt werden können. Die Daten in diesen Blobs sind für die EVM nicht zugänglich und werden nach einer festgelegten Zeitspanne (zum Zeitpunkt des Schreibens auf 4096 Epochen oder etwa 18 Tage festgelegt) automatisch gelöscht. Das bedeutet, dass Rollups ihre Daten viel günstiger senden und die Einsparungen in Form von günstigeren Transaktionen an die Endnutzer weitergeben können.

<ExpandableCard title="Warum machen Blobs Rollups günstiger?" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

Rollups sind eine Möglichkeit, Ethereum zu skalieren, indem Transaktionen Off-Chain gebündelt und die Ergebnisse dann auf Ethereum veröffentlicht werden. Ein Rollup besteht im Wesentlichen aus zwei Teilen: Daten und Ausführungsprüfung. Die Daten sind die vollständige Sequenz von Transaktionen, die von einem Rollup verarbeitet wird, um die Zustandsänderung zu erzeugen, die auf Ethereum veröffentlicht wird. Die Ausführungsprüfung ist die erneute Ausführung dieser Transaktionen durch einen ehrlichen Akteur (einen „Beweiser“ oder „Prover“), um sicherzustellen, dass die vorgeschlagene Zustandsänderung korrekt ist. Um die Ausführungsprüfung durchzuführen, müssen die Transaktionsdaten lange genug verfügbar sein, damit jeder sie herunterladen und überprüfen kann. Dies bedeutet, dass jedes unehrliche Verhalten des Rollup-Sequencers vom Beweiser identifiziert und angefochten werden kann. Sie müssen jedoch nicht für immer verfügbar sein.

</ExpandableCard>

<ExpandableCard title="Warum ist es in Ordnung, die Blob-Daten zu löschen?" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

Rollups veröffentlichen Commitments zu ihren Transaktionsdaten auf der Blockchain und stellen die tatsächlichen Daten auch in Daten-Blobs zur Verfügung. Dies bedeutet, dass Beweiser überprüfen können, ob die Commitments gültig sind, oder Daten anfechten können, die sie für falsch halten. Auf der Ebene der Blockchain-Knoten werden die Daten-Blobs im Konsens-Client gehalten. Die Konsens-Clients bestätigen, dass sie die Daten gesehen haben und dass sie im Netzwerk verbreitet wurden. Wenn die Daten für immer aufbewahrt würden, würden diese Clients aufblähen und zu hohen Hardwareanforderungen für den Betrieb von Blockchain-Knoten führen. Stattdessen werden die Daten alle 18 Tage automatisch aus dem Blockchain-Knoten bereinigt. Die Bestätigungen der Konsens-Clients zeigen, dass es für Beweiser ausreichend Gelegenheit gab, die Daten zu verifizieren. Die tatsächlichen Daten können von Rollup-Betreibern, Nutzern oder anderen Off-Chain gespeichert werden.

</ExpandableCard>

### Wie werden Blob-Daten verifiziert? {#how-are-blobs-verified}

Rollups veröffentlichen die von ihnen ausgeführten Transaktionen in Daten-Blobs. Sie veröffentlichen auch ein „Commitment“ zu den Daten. Dies tun sie, indem sie eine Polynomfunktion an die Daten anpassen. Diese Funktion kann dann an verschiedenen Punkten ausgewertet werden. Wenn wir beispielsweise eine extrem einfache Funktion `f(x) = 2x-1` definieren, können wir diese Funktion für `x = 1`, `x = 2`, `x = 3` auswerten, was die Ergebnisse `1, 3, 5` liefert. Ein Beweiser wendet dieselbe Funktion auf die Daten an und wertet sie an denselben Punkten aus. Wenn die Originaldaten geändert werden, ist die Funktion nicht identisch, und daher sind auch die an jedem Punkt ausgewerteten Werte nicht identisch. In der Realität sind das Commitment und der Beweis komplizierter, da sie in kryptografische Funktionen verpackt sind.

### Was ist KZG? {#what-is-kzg}

KZG steht für Kate-Zaverucha-Goldberg – die Namen der drei [ursprünglichen Autoren](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11) eines Schemas, das einen Daten-Blob auf ein kleines [kryptografisches „Commitment“](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html) reduziert. Der von einem Rollup eingereichte Daten-Blob muss verifiziert werden, um sicherzustellen, dass sich das Rollup nicht fehlerhaft verhält. Dies beinhaltet, dass ein Beweiser die Transaktionen im Blob erneut ausführt, um zu überprüfen, ob das Commitment gültig war. Dies ist konzeptionell dasselbe wie die Art und Weise, wie Ausführungs-Clients die Gültigkeit von Ethereum-Transaktionen auf Ebene 1 mithilfe von Merkle-Beweisen überprüfen. KZG ist ein alternativer Beweis, der eine Polynomgleichung an die Daten anpasst. Das Commitment wertet das Polynom an einigen geheimen Datenpunkten aus. Ein Beweiser würde dasselbe Polynom über die Daten legen und es an denselben Werten auswerten, um zu überprüfen, ob das Ergebnis dasselbe ist. Dies ist eine Möglichkeit, die Daten zu verifizieren, die mit Zero-Knowledge-Techniken kompatibel ist, die von einigen Rollups und schließlich anderen Teilen des Ethereum-Protokolls verwendet werden.

### Was war die KZG-Zeremonie? {#what-is-a-kzg-ceremony}

Die KZG-Zeremonie war eine Möglichkeit für viele Menschen aus der gesamten Ethereum-Community, gemeinsam eine geheime, zufällige Zahlenfolge zu generieren, die zur Verifizierung von Daten verwendet werden kann. Es ist sehr wichtig, dass diese Zahlenfolge nicht bekannt ist und von niemandem wiederhergestellt werden kann. Um dies sicherzustellen, erhielt jede Person, die an der Zeremonie teilnahm, eine Zeichenfolge vom vorherigen Teilnehmer. Sie erstellten dann einige neue Zufallswerte (z. B. indem sie ihrem Browser erlaubten, die Bewegung ihrer Maus zu messen) und mischten sie mit dem vorherigen Wert. Sie sendeten den Wert dann an den nächsten Teilnehmer weiter und zerstörten ihn auf ihrem lokalen Rechner. Solange eine Person in der Zeremonie dies ehrlich tat, wird der endgültige Wert für einen Angreifer unerkennbar sein.

Die EIP-4844 KZG-Zeremonie war öffentlich zugänglich und Zehntausende von Menschen nahmen teil, um ihre eigene Entropie (Zufälligkeit) hinzuzufügen. Insgesamt gab es über 140.000 Beiträge, was sie zur weltweit größten Zeremonie ihrer Art machte. Damit die Zeremonie untergraben werden könnte, müssten 100 % dieser Teilnehmer aktiv unehrlich sein. Aus der Perspektive der Teilnehmer besteht keine Notwendigkeit, jemand anderem zu vertrauen, wenn sie wissen, dass sie ehrlich waren, da sie wissen, dass sie die Zeremonie gesichert haben (sie haben individuell die Anforderung von 1-aus-N ehrlichen Teilnehmern erfüllt).

<ExpandableCard title="Wofür wird die Zufallszahl aus der KZG-Zeremonie verwendet?" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

Wenn ein Rollup Daten in einem Blob veröffentlicht, stellt es ein „Commitment“ bereit, das es auf der Blockchain veröffentlicht. Dieses Commitment ist das Ergebnis der Auswertung einer Polynomanpassung an die Daten an bestimmten Punkten. Diese Punkte werden durch die in der KZG-Zeremonie generierten Zufallszahlen definiert. Beweiser können dann das Polynom an denselben Punkten auswerten, um die Daten zu verifizieren – wenn sie zu denselben Werten gelangen, sind die Daten korrekt.

</ExpandableCard>

<ExpandableCard title="Warum müssen die KZG-Zufallsdaten geheim bleiben?" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

Wenn jemand die für das Commitment verwendeten zufälligen Positionen kennt, ist es für ihn einfach, ein neues Polynom zu generieren, das an diesen spezifischen Punkten passt (d. h. eine „Kollision“). Dies bedeutet, dass sie Daten zum Blob hinzufügen oder daraus entfernen und dennoch einen gültigen Beweis liefern könnten. Um dies zu verhindern, erhalten Beweiser anstelle der tatsächlichen geheimen Positionen die Positionen in einer kryptografischen „Blackbox“ unter Verwendung elliptischer Kurven verpackt. Diese verschlüsseln die Werte effektiv so, dass die ursprünglichen Werte nicht zurückentwickelt werden können, aber mit etwas cleverer Algebra können Beweiser und Verifizierer dennoch Polynome an den Punkten auswerten, die sie darstellen.

</ExpandableCard>

<Alert variant="warning" className="mb-8">
  Weder Danksharding noch Proto-Danksharding folgen dem traditionellen „Sharding“-Modell, das darauf abzielt, die Blockchain in mehrere Teile aufzuteilen. Shard-Chains sind nicht mehr Teil der Roadmap. Stattdessen verwendet Danksharding verteilte Datenstichproben (Data Sampling) über Blobs hinweg, um Ethereum zu skalieren. Dies ist viel einfacher zu implementieren. Dieses Modell wurde manchmal als „Daten-Sharding“ bezeichnet.
</Alert>

## Was ist Danksharding? {#what-is-danksharding}

Danksharding ist die vollständige Umsetzung der Rollup-Skalierung, die mit Proto-Danksharding begann. Danksharding wird massiv Platz auf Ethereum schaffen, damit Rollups ihre komprimierten Transaktionsdaten ablegen können. Dies bedeutet, dass Ethereum problemlos Hunderte von einzelnen Rollups unterstützen und Millionen von Transaktionen pro Sekunde zur Realität machen kann.

Dies funktioniert, indem die an Blöcke angehängten Blobs von sechs (6) in Proto-Danksharding auf 64 im vollständigen Danksharding erweitert werden. Die restlichen erforderlichen Änderungen sind allesamt Aktualisierungen der Funktionsweise von Konsens-Clients, damit diese die neuen großen Blobs verarbeiten können. Einige dieser Änderungen stehen bereits für andere Zwecke unabhängig von Danksharding auf der Roadmap. Beispielsweise erfordert Danksharding, dass die Trennung von Block-Vorschlagendem und Block-Ersteller (Proposer-Builder Separation) implementiert wurde. Dies ist ein Upgrade, das die Aufgaben des Erstellens von Blöcken und des Vorschlagens von Blöcken auf verschiedene Validatoren aufteilt. Ebenso ist die Datenverfügbarkeitsstichprobe (Data Availability Sampling) für Danksharding erforderlich, wird aber auch für die Entwicklung sehr leichtgewichtiger Clients benötigt, die nicht viele historische Daten speichern („zustandslose Clients“).

<ExpandableCard title="Warum erfordert Danksharding die Trennung von Block-Vorschlagendem und Block-Ersteller?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

Die Trennung von Block-Vorschlagendem und Block-Ersteller ist erforderlich, um zu verhindern, dass einzelne Validatoren teure Commitments und Beweise für 32 MB Blob-Daten generieren müssen. Dies würde Home-Staker zu sehr belasten und erfordern, dass sie in leistungsfähigere Hardware investieren, was der Dezentralisierung schadet. Stattdessen übernehmen spezialisierte Block-Ersteller die Verantwortung für diese teure Rechenarbeit. Dann stellen sie ihre Blöcke den Block-Vorschlagenden zur Übertragung zur Verfügung. Der Block-Vorschlagende wählt einfach den Block aus, der am profitabelsten ist. Jeder kann die Blobs günstig und schnell verifizieren, was bedeutet, dass jeder normale Validator überprüfen kann, ob sich die Block-Ersteller ehrlich verhalten. Dies ermöglicht die Verarbeitung der großen Blobs, ohne die Dezentralisierung zu opfern. Sich fehlerhaft verhaltende Block-Ersteller könnten einfach aus dem Netzwerk geworfen und mit Slashing bestraft werden – andere werden an ihre Stelle treten, da das Erstellen von Blöcken eine profitable Aktivität ist.

</ExpandableCard>

<ExpandableCard title="Warum erfordert Danksharding Datenverfügbarkeitsstichproben?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

Datenverfügbarkeitsstichproben (Data Availability Sampling) sind erforderlich, damit Validatoren Blob-Daten schnell und effizient verifizieren können. Mithilfe von Datenverfügbarkeitsstichproben können sich die Validatoren sehr sicher sein, dass die Blob-Daten verfügbar waren und korrekt committet wurden. Jeder Validator kann zufällig nur wenige Datenpunkte als Stichprobe nehmen und einen Beweis erstellen, was bedeutet, dass kein Validator den gesamten Blob überprüfen muss. Wenn Daten fehlen, wird dies schnell erkannt und der Blob abgelehnt.

</ExpandableCard>

### Aktueller Fortschritt {#current-progress}

Das vollständige Danksharding ist noch einige Jahre entfernt. In der Zwischenzeit wurde die KZG-Zeremonie mit über 140.000 Beiträgen abgeschlossen, und der [EIP](https://eips.ethereum.org/EIPS/eip-4844) für Proto-Danksharding ist ausgereift. Dieser Vorschlag wurde in allen Testnets vollständig implementiert und ging im März 2024 mit dem Cancun-Deneb („Dencun“)-Netzwerk-Upgrade im Mainnet live.

### Weiterführende Literatur {#further-reading}

- [Notizen zu Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) – _Vitalik Buterin_
- [Dankrads Notizen zu Danksharding](https://notes.ethereum.org/@dankrad/new_sharding)
- [Dankrad, Proto und Vitalik diskutieren über Danksharding](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Die KZG-Zeremonie](https://ceremony.ethereum.org/)
- [Carl Beekhuizens Devcon-Vortrag über Trusted Setups](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [Mehr über Datenverfügbarkeitsstichproben für Blobs](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad Feist über KZG-Commitments und -Beweise](https://youtu.be/8L2C6RDMV9Q)
- [KZG-Polynom-Commitments](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)