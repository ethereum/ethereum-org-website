---
title: Gasper
description: Eine Erklärung des Gasper-Proof-of-Stake-Mechanismus.
lang: de
---

Gasper ist eine Kombination aus Casper the Friendly Finality Gadget („Casper das freundliche Endültigkeitsgadget“, Casper-FFG) und dem LMD-GHOST-Abspaltungs-Wahl-Algorithmus. Zusammen bilden diese Komponenten den Konsensmechanismus zur Sicherung des Proof-of-Stake-Ethereum. Casper ist der Mechanismus, der bestimmte Blöcke auf „fertiggestellt“ aktualisiert, sodass neue Teilnehmer im Netzwerk sicher sein können, dass sie die kanonische Chain synchronisieren. Der Abspaltungs-Wahl-Algorithmus verwendet kumulierte Stimmen, um sicherzustellen, dass Nodes leicht die richtige auswählen können, wenn es zu Abspaltungen in der Blockkette kommt.

**Beachten Sie**, dass die ursprüngliche Definition von Casper-FFG für die Aufnahme in Gasper leicht aktualisiert wurde. Auf dieser Seite berücksichtigen wir die aktualisierte Version.

## Voraussetzungen

Um dieses Material zu verstehen, muss die Einführungsseite zu [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) gelesen werden.

## Die Rolle von Gasper {#role-of-gasper}

Gasper sitzt an der Spitze einer Proof-of-Stake-Blockchain, für die Nodes Ether als Sicherheitsleistung hinterlegen. Diese kann zerstört werden, wenn sie faul oder unehrlich in der Art und Weise sind, wie sie Blöcke vorschlagen oder validieren. Gasper ist der Mechanismus, der bestimmt, wie Validatoren belohnt und bestraft werden, und entscheidet, welche Blöcke akzeptiert und abgelehnt werden sowie auf welche Abspaltung die Blockchain aufgebaut werden soll.

## Was ist Endgültigkeit? {#what-is-finality}

Die Endgültigkeit ist eine Eigenschaft bestimmter Blöcke. Sie bedeutet, dass sie nicht rückgängig gemacht werden können, es sei denn, es ist zu einem kritischen Konsensfehler gekommen und ein Angreifer hat mindestens 1/3 des insgesamt eingesetzten Ethers zerstört. Finalisierte Blöcke können als Informationen betrachtet werden, bei denen sich die Blockchain sicher ist. Ein Block muss eine zweistufige Upgradeprozedur durchlaufen, damit ein Block finalisiert werden kann:

1. Zwei Drittel des insgesamt eingesetzten Ethers müssen für die Einbeziehung dieses Blocks in die kanonische Chain gestimmt haben. Diese Bedingung aktualisiert den Block auf „berechtigt“. Es ist unwahrscheinlich, dass berechtigte Blöcke rückgängig gemacht werden. Das ist aber unter bestimmten Bedingungen möglich.
2. Wenn neben einem berechtigten Block noch ein anderer Block berechtigt ist, wird er auf „finalisiert“ aktualisiert. Die Finalisierung eines Blocks ist dahingehend ein Commitment, den Block in die kanonische Chain aufzunehmen. Sie kann nicht rückgängig gemacht werden, es sei denn, ein Angreifer zerstört Millionen Ether (Milliarden von $USD).

Diese Block-Upgrades werden nicht in jedem Slot vorgenommen. Stattdessen können nur epochal begrenzte Blöcke berechtigt und finalisiert werden. Diese Blöcke werden als „Checkpoints“ bezeichnet. Die Aktualisierung berücksichtigt Paare von Checkpoints. Eine „Supermajority-Verbindung“ muss zwischen zwei aufeinander folgenden Checkpoints existieren (z. B. zwei Drittel der insgesamt eingesetzten Ether stimmen dafür ab, dass Checkpoint B der richtige Nachfahr von Checkpoint A ist), damit der weniger aktuelle Checkpoint auf „Finalisiert“ und der neuere Block auf „Berechtigt“ aktualisiert werden kann.

Da für die Endgültigkeit eine 2/3 Mehrheit erforderlich ist, die sich einig ist, dass ein Block kanonisch ist, kann ein Angreifer niemals eine alternative finalisierte Chain erstellen, ohne:

1. 2/3 des gesamten eingesetzten Ethers zu besitzen oder zu manipulieren.
2. mindestens 1/3 des gesamten eingesetzten Ethers zu zerstören.

Die erste Bedingung kommt dadurch auf, dass mindestens 2/3 des eingesetzten Ethers benötigt wird, um eine Chain zu finalisieren. Die zweite Bedingung kommt aus dem folgenden Grund auf: Wenn 2/3 des gesamten Stakes für beide Abspaltungen gestimmt hat, muss mindestens 1/3 für beide gestimmt haben. Doppeltes Abstimmen ist eine Bedingung für Slashing und würde maximal bestraft werden. In diesem Fall würde 1/3 des gesamten Stakes zerstört werden. Nach Stand vom Mai 2022 müsste ein Angreifer hierfür Ether im Wert von ungefähr 10 Mrd. $ verbrennen. Der Algorithmus, der Blöcke in Gasper berechtigt und finalisiert, ist eine leicht modifizierte Form von [Casper the Friendly Finality Gadget (Casper-FFG)](https://arxiv.org/pdf/1710.09437.pdf).

### Anreize und Slashing {#incentives-and-slashing}

Validatoren werden für das ehrliche Vorschlagen und Validieren von Blöcken belohnt. Sie erhalten Ether als Belohnung, die zu ihrem Stake hinzugefügt werden. Andererseits entgehen den Validatoren, die abwesend sind und nicht handeln, wenn sie dazu aufgefordert werden, diese Belohnungen und sie verlieren manchmal einen kleinen Teil ihres bestehenden Stakes. Jedoch sind die Strafen dafür, offline zu bleiben, gering und belaufen sich in den meisten Fällen auf die Opportunitätskosten für die Belohnungen, die den Benutzern entgehen. Es gibt aber auch einige von Validatoren ausgeführte Aktionen, die sehr schwer versehentlich durchzuführen sind und auf eine böswillige Absicht hindeuten. Dazu gehört etwa, wenn mehrere Blöcke für denselben Slot vorgeschlagen werden, mehrere Blöcke für denselben Slot attestiert werden oder früheren Checkpoint-Stimmen wiedersprochen wird. Das sind Verhaltensweisen, die mit Slashing und damit etwas härter bestraft werden könen – das Slashing führt dazu, dass ein Teil des Stakes eines Validatoren zerstört wird und er vom Validatorennetzwerk entfernt wird. Dieser Prozess dauert 36 Tage. An Tag 1 wird eine Anfangsstrafe von bis zu 1 ETH erhoben. Dann geht die Anzahl der Ether des mit Slashing sanktionierten Validatoren über den gesamten Zeitraum des Ausstiegs langsam zurück. An Tag 18 erhalten sie allerdings eine „Korrelationsstrafe“, die größer ist, wenn mehrere Validatoren zur gleichen Zeit mit Slashing bestraft werden. Die Maximalstrafe ist der gesamte Stake. Diese Belohnungen und Bestrafungen sind als Anreiz für ehrliche Validatoren und als Abschreckung vor Angriffen auf das Netzwerk konzipiert.

### Inactivity Leak {#inactivity-leak}

Zusätzlich zur Sicherheit bietet Gasper auch „plausible Liveness“. Dies beschreibt den Zustand, dass die Chain unabhängig von anderen Aktivitäten (wie Angriffen, Latenzproblemen oder Slashings) finalisiert werden kann, solange zwei Drittel der insgesamt eingesetzten Ether ehrlich und gemäß dem Protokoll abstimmen. Um es anders auszudrücken: Ein Drittel der gesamten eingesetzten Ether müssen auf irgendeine Weise kompromittiert sein, damit die Chain nicht finalisiert. In Gasper gibt es eine zusätzliche Verteidigungslinie gegen ein Versagen der Liveness, bekannt als „Inactivity Leak“. Dieser Mechanismus tritt in Kraft, wenn die Chain mehr als vier Epochen lang nicht finalisiert werde konnte. Den Validatoren, die nicht aktiv für die Mehrheits-Chan attestieren, wird ihr allmählich Stake entzogen, bis die Mehrheit wieder über zwei Drittel des gesamten Stakes verfügt. Auf diese Weise wird sichergestellt, dass ein Liveness-Vesagen nur vorübergehend ist.

### Abspaltung-Wahl {#fork-choice}

Die ursprüngliche Definition von Casper-FFG enthielt einen Abspaltungs-Wahl-Algorithmus, der die folgende Regel auferlegte: `Folge der Chain, die den berechtigten Checkpoint mit der größten Höhe` enthält, wobei die Höhe als der größte Abstand zum Genesis-Block definiert ist. In Gasper wird die ursprüngliche Regel für die Wahl der Abspaltung zugunsten eines ausgefeilteren Algorithmus namens LMD-GHOST ersetzt. Es ist wichtig, zu erkennen, dass unter normalen Bedingungen eine Regel für die Wahl der Abspaltung unnötig ist – es gibt einen einzigen Block-Proposer für jeden Slot und ehrliche Validatoren, die das attestieren. Nur in Fällen von Asynchronität großer Netzwerke oder bei mehrdeutigen Handlungen eines unehrlichen Block-Proposer wird der Abspaltungs-Wahl-Algorithmus benötigt. Wenn solche Fälle jedoch eintreten, ist der Abspaltungs-Wahl-Algorithmus ein entscheidender Schutzmechanismus zur Sicherung der korrekten Chain.

LMD-GHOST steht für „latest message-driven greedy heaviest observed sub-tree“ oder auf Deutsch „neuester, nachrichtengesteuerter, gieriger und schwerster beobachteter Unterbaum“. Hierbei handelt es sich um eine fachsprachenlastige Definition für einen Algorithmus, der die Abspaltung mit dem höchsten Gesamtgewicht an Attestierungen als die kanonische auswählt („greedy heaviest subtree“ oder auf Deutsch „gieriger, schwerster Unterbaum“) und sicherstellt, dass bei mehreren Nachrichten von einem Validator nur die neueste berücksichtigt wird („latest-message driven“ oder auf Deutsch „neuester, nachrichtengesteuerter“). Bevor ein Validator den schwersten Block zu seiner kanonischen Chain hinzufügt, bewertet er jeden Block anhand dieser Regel.

## Weiterführende Informationen {#further-reading}

- [Gasper: Die Kombination aus GHOST und Kasper](https://arxiv.org/pdf/2003.03052.pdf)
- [Casper the Friendly Finality Gadget](https://arxiv.org/pdf/1710.09437.pdf)
