---
title: Gasper
description: "Eine Erklärung des Gasper-Proof-of-Stake-Mechanismus."
lang: de
---

Gasper ist eine Kombination aus Casper the Friendly Finality Gadget (Casper-FFG) und dem LMD-GHOST-Fork-Choice-Algorithmus. Zusammen bilden diese Komponenten den Konsensmechanismus, der das Proof-of-Stake-Ethereum sichert. Casper ist der Mechanismus, der bestimmte Blöcke auf „finalisiert“ hochstuft, sodass neue Teilnehmer im Netzwerk sicher sein können, dass sie die kanonische Chain synchronisieren. Der Algorithmus zur Fork-Auswahl verwendet angesammelte Stimmen, um sicherzustellen, dass Blockchain-Knoten leicht den richtigen auswählen können, wenn Forks in der Blockchain auftreten.

**Hinweis:** Die ursprüngliche Definition von Casper-FFG wurde für die Aufnahme in Gasper leicht aktualisiert. Auf dieser Seite betrachten wir die aktualisierte Version.

## Voraussetzungen

Um dieses Material zu verstehen, ist es notwendig, die Einführungsseite zu [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) zu lesen.

## Die Rolle von Gasper {#role-of-gasper}

Gasper baut auf einer Proof-of-Stake-Blockchain auf, bei der Blockchain-Knoten Ether als Sicherheitskaution hinterlegen, die zerstört werden kann, wenn sie beim Vorschlagen oder Validieren von Blöcken faul oder unehrlich sind. Gasper ist der Mechanismus, der definiert, wie Validatoren belohnt und bestraft werden, wie sie entscheiden, welche Blöcke sie akzeptieren und ablehnen, und auf welcher Fork der Blockchain sie aufbauen.

## Was ist Finalität? {#what-is-finality}

Finalität ist eine Eigenschaft bestimmter Blöcke, die bedeutet, dass sie nicht rückgängig gemacht werden können, es sei denn, es gab einen kritischen Konsensfehler und ein Angreifer hat mindestens 1/3 des gesamten als Einsatz hinterlegten Ethers zerstört. Finalisierte Blöcke können als Informationen betrachtet werden, über die sich die Blockchain sicher ist. Ein Block muss ein zweistufiges Hochstufungsverfahren durchlaufen, um finalisiert zu werden:

1. Zwei Drittel des gesamten als Einsatz hinterlegten Ethers müssen für die Aufnahme dieses Blocks in die kanonische Chain gestimmt haben. Diese Bedingung stuft den Block auf „gerechtfertigt“ (justified) hoch. Gerechtfertigte Blöcke werden wahrscheinlich nicht rückgängig gemacht, können es aber unter bestimmten Bedingungen werden.
2. Wenn ein weiterer Block auf einem gerechtfertigten Block gerechtfertigt wird, wird er auf „finalisiert“ hochgestuft. Die Finalisierung eines Blocks ist eine Verpflichtung, den Block in die kanonische Chain aufzunehmen. Er kann nicht rückgängig gemacht werden, es sei denn, ein Angreifer zerstört Millionen von Ether (Milliarden von USD).

Diese Block-Hochstufungen finden nicht in jedem Slot statt. Stattdessen können nur Blöcke an Epochengrenzen gerechtfertigt und finalisiert werden. Diese Blöcke sind als „Checkpoints“ bekannt. Die Hochstufung berücksichtigt Paare von Checkpoints. Es muss eine „Supermajority-Verbindung“ (Zweidrittelmehrheit) zwischen zwei aufeinanderfolgenden Checkpoints bestehen (d. h. zwei Drittel des gesamten als Einsatz hinterlegten Ethers stimmen dafür, dass Checkpoint B der korrekte Nachkomme von Checkpoint A ist), um den älteren Checkpoint auf finalisiert und den neueren Block auf gerechtfertigt hochzustufen.

Da die Finalität eine Zweidrittel-Zustimmung erfordert, dass ein Block kanonisch ist, kann ein Angreifer unmöglich eine alternative finalisierte Chain erstellen, ohne:

1. Zwei Drittel des gesamten als Einsatz hinterlegten Ethers zu besitzen oder zu manipulieren.
2. Mindestens ein Drittel des gesamten als Einsatz hinterlegten Ethers zu zerstören.

Die erste Bedingung entsteht, weil zwei Drittel des als Einsatz hinterlegten Ethers erforderlich sind, um eine Chain zu finalisieren. Die zweite Bedingung entsteht, weil, wenn zwei Drittel des gesamten Einsatzes für beide Forks gestimmt haben, ein Drittel für beide gestimmt haben muss. Doppeltes Abstimmen ist eine Slashing-Bedingung, die maximal bestraft würde, und ein Drittel des gesamten Einsatzes würde zerstört werden. Stand Mai 2022 erfordert dies, dass ein Angreifer Ether im Wert von etwa 10 Milliarden USD verbrennt. Der Algorithmus, der Blöcke in Gasper rechtfertigt und finalisiert, ist eine leicht modifizierte Form von [Casper the Friendly Finality Gadget (Casper-FFG)](https://arxiv.org/pdf/1710.09437.pdf).

### Anreize und Slashing {#incentives-and-slashing}

Validatoren werden für das ehrliche Vorschlagen und Validieren von Blöcken belohnt. Ether wird als Belohnung ausgeschüttet und ihrem Einsatz hinzugefügt. Andererseits verpassen Validatoren, die abwesend sind und nicht handeln, wenn sie aufgerufen werden, diese Belohnungen und verlieren manchmal einen kleinen Teil ihres bestehenden Einsatzes. Die Strafen für das Offline-Sein sind jedoch gering und belaufen sich in den meisten Fällen auf Opportunitätskosten durch entgangene Belohnungen. Einige Aktionen von Validatoren sind jedoch sehr schwer versehentlich durchzuführen und deuten auf eine böswillige Absicht hin, wie z. B. das Vorschlagen mehrerer Blöcke für denselben Slot, das Abgeben von Bestätigungen für mehrere Blöcke für denselben Slot oder das Widersprechen früherer Checkpoint-Abstimmungen. Dies sind Verhaltensweisen, die zu einem „Slashing“ führen können und härter bestraft werden – Slashing führt dazu, dass ein Teil des Einsatzes des Validators zerstört wird und der Validator aus dem Netzwerk der Validatoren entfernt wird. Dieser Prozess dauert 36 Tage. An Tag 1 gibt es eine anfängliche Strafe von bis zu 1 ETH. Dann fließt der Ether des geslashten Validators über die Austrittsperiode langsam ab, aber an Tag 18 erhält er eine „Korrelationsstrafe“, die größer ist, wenn mehr Validatoren etwa zur gleichen Zeit geslasht werden. Die Höchststrafe ist der gesamte Einsatz. Diese Belohnungen und Strafen sollen ehrliche Validatoren anreizen und Angriffe auf das Netzwerk abschrecken.

### Inaktivitätsleck {#inactivity-leak}

Neben der Sicherheit bietet Gasper auch „plausible Liveness“ (plausible Lebendigkeit). Dies ist die Bedingung, dass, solange zwei Drittel des gesamten als Einsatz hinterlegten Ethers ehrlich abstimmen und dem Protokoll folgen, die Chain unabhängig von anderen Aktivitäten (wie Angriffen, Latenzproblemen oder Slashings) finalisieren kann. Anders ausgedrückt: Ein Drittel des gesamten als Einsatz hinterlegten Ethers muss irgendwie kompromittiert sein, um zu verhindern, dass die Chain finalisiert. In Gasper gibt es eine zusätzliche Verteidigungslinie gegen einen Liveness-Ausfall, bekannt als das „Inaktivitätsleck“ (Inactivity Leak). Dieser Mechanismus wird aktiviert, wenn die Chain für mehr als vier Epochen nicht finalisiert werden konnte. Den Validatoren, die nicht aktiv Bestätigungen für die Mehrheits-Chain abgeben, wird ihr Einsatz nach und nach entzogen, bis die Mehrheit wieder zwei Drittel des gesamten Einsatzes erreicht, wodurch sichergestellt wird, dass Liveness-Ausfälle nur vorübergehend sind.

### Fork-Auswahl {#fork-choice}

Die ursprüngliche Definition von Casper-FFG enthielt einen Fork-Choice-Algorithmus, der die Regel auferlegte: `follow the chain containing the justified checkpoint that has the greatest height` (folge der Chain, die den gerechtfertigten Checkpoint mit der größten Höhe enthält), wobei die Höhe als die größte Entfernung vom Genesis-Block definiert ist. In Gasper ist die ursprüngliche Fork-Choice-Regel zugunsten eines ausgefeilteren Algorithmus namens LMD-GHOST veraltet. Es ist wichtig zu erkennen, dass unter normalen Bedingungen eine Fork-Choice-Regel unnötig ist – es gibt einen einzigen Block-Vorschlagenden für jeden Slot, und ehrliche Validatoren bestätigen ihn. Nur in Fällen großer Netzwerk-Asynchronität oder wenn ein unehrlicher Block-Vorschlagender zweideutig gehandelt hat, ist ein Fork-Choice-Algorithmus erforderlich. Wenn diese Fälle jedoch eintreten, ist der Fork-Choice-Algorithmus eine kritische Verteidigung, die die korrekte Chain sichert.

LMD-GHOST steht für „latest message-driven greedy heaviest observed sub-tree“. Dies ist eine sehr fachspezifische Art, einen Algorithmus zu definieren, der die Fork mit dem größten angesammelten Gewicht an Bestätigungen als die kanonische auswählt (greedy heaviest subtree) und bei dem, wenn mehrere Nachrichten von einem Validator empfangen werden, nur die neueste berücksichtigt wird (latest-message driven). Bevor der schwerste Block zu seiner kanonischen Chain hinzugefügt wird, bewertet jeder Validator jeden Block anhand dieser Regel.

## Weiterführende Literatur {#further-reading}

- [Gasper: Combining GHOST and Casper](https://arxiv.org/pdf/2003.03052.pdf)
- [Casper the Friendly Finality Gadget](https://arxiv.org/pdf/1710.09437.pdf)