---
title: Gasper
description: "Eine Erklärung des Gasper-Proof-of-Stake-Mechanismus."
lang: de
---

Gasper ist eine Kombination aus Casper the Friendly Finality Gadget (Casper FFG) und dem LMD-GHOST-Fork-Choice-Algorithmus. Zusammen bilden diese Komponenten den Konsensmechanismus, der das Proof-of-Stake-Ethereum sichert. Casper ist der Mechanismus, der bestimmte Blöcke auf „endgültig“ hochstuft, sodass neue Teilnehmer im Netzwerk sicher sein können, dass sie die kanonische Chain synchronisieren. Der Fork-Choice-Algorithmus verwendet angesammelte Stimmen, um sicherzustellen, dass Nodes bei Forks in der Blockchain problemlos die richtige auswählen können.

**Hinweis:** Die ursprüngliche Definition von Casper FFG wurde für die Aufnahme in Gasper leicht aktualisiert. Auf dieser Seite betrachten wir die aktualisierte Version.

## Voraussetzungen {#prerequisites}

Um dieses Material zu verstehen, ist es notwendig, die Einführungsseite zu [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) zu lesen.

## Die Rolle von Gasper {#role-of-gasper}

Gasper sitzt auf einer Proof-of-Stake-Blockchain, bei der Nodes Ether als Sicherheitskaution hinterlegen, die zerstört werden kann, wenn sie beim Vorschlagen oder Validieren von Blöcken faul oder unehrlich sind. Gasper ist der Mechanismus, der definiert, wie Validatoren belohnt und bestraft werden, wie sie entscheiden, welche Blöcke sie akzeptieren und ablehnen, und auf welcher Fork der Blockchain sie aufbauen.

## Was ist Endgültigkeit? {#what-is-finality}

Endgültigkeit ist eine Eigenschaft bestimmter Blöcke, die bedeutet, dass sie nicht rückgängig gemacht werden können, es sei denn, es gab einen kritischen Konsensfehler und ein Angreifer hat mindestens 1/3 des gesamten gestakten Ethers zerstört. Endgültige Blöcke können als Informationen betrachtet werden, derer sich die Blockchain sicher ist. Ein Block muss ein zweistufiges Upgrade-Verfahren durchlaufen, damit er endgültig wird:

1. Zwei Drittel des gesamten gestakten Ethers müssen für die Aufnahme dieses Blocks in die kanonische Chain gestimmt haben. Diese Bedingung stuft den Block auf „gerechtfertigt“ hoch. Gerechtfertigte Blöcke werden wahrscheinlich nicht rückgängig gemacht, können es aber unter bestimmten Bedingungen werden.
2. Wenn ein weiterer Block auf einem gerechtfertigten Block gerechtfertigt wird, wird er auf „endgültig“ hochgestuft. Das Endgültigmachen eines Blocks ist ein Commitment, den Block in die kanonische Chain aufzunehmen. Er kann nicht rückgängig gemacht werden, es sei denn, ein Angreifer zerstört Millionen von Ether (Milliarden von USD).

Diese Block-Upgrades finden nicht in jedem Slot statt. Stattdessen können nur Blöcke an Epochengrenzen gerechtfertigt und endgültig gemacht werden. Diese Blöcke werden als „Checkpoints“ bezeichnet. Das Upgrade berücksichtigt Paare von Checkpoints. Es muss ein „Supermehrheits-Link“ zwischen zwei aufeinanderfolgenden Checkpoints bestehen (d. h. zwei Drittel des gesamten gestakten Ethers stimmen dafür, dass Checkpoint B der korrekte Nachkomme von Checkpoint A ist), um den älteren Checkpoint auf endgültig und den neueren Block auf gerechtfertigt hochzustufen.

Da die Endgültigkeit eine Zweidrittelzustimmung erfordert, dass ein Block kanonisch ist, kann ein Angreifer unmöglich eine alternative endgültige Chain erstellen, ohne:

1. Zwei Drittel des gesamten gestakten Ethers zu besitzen oder zu manipulieren.
2. Mindestens ein Drittel des gesamten gestakten Ethers zu zerstören.

Die erste Bedingung ergibt sich, weil zwei Drittel des gestakten Ethers erforderlich sind, um eine Chain endgültig zu machen. Die zweite Bedingung ergibt sich, weil, wenn zwei Drittel des gesamten Stakes für beide Forks gestimmt haben, ein Drittel für beide gestimmt haben muss. Doppeltes Abstimmen ist eine Slashing-Bedingung, die maximal bestraft werden würde, und ein Drittel des gesamten Stakes würde zerstört werden. Stand Mai 2022 erfordert dies, dass ein Angreifer Ether im Wert von rund 10 Milliarden USD verbrennen muss. Der Algorithmus, der Blöcke in Gasper rechtfertigt und endgültig macht, ist eine leicht modifizierte Form von [Casper the Friendly Finality Gadget (Casper FFG)](https://arxiv.org/pdf/1710.09437.pdf).

### Anreize und Slashing {#incentives-and-slashing}

Validatoren werden für das ehrliche Vorschlagen und Validieren von Blöcken belohnt. Ether wird als Belohnung ausgeschüttet und ihrem Stake hinzugefügt. Andererseits entgehen Validatoren, die abwesend sind und nicht handeln, wenn sie aufgerufen werden, diese Belohnungen und sie verlieren manchmal einen kleinen Teil ihres bestehenden Stakes. Die Strafen für das Offline-Sein sind jedoch gering und belaufen sich in den meisten Fällen auf Opportunitätskosten durch entgangene Belohnungen. Einige Aktionen von Validatoren sind jedoch sehr schwer versehentlich auszuführen und deuten auf einen böswilligen Intent hin, wie z. B. das Vorschlagen mehrerer Blöcke für denselben Slot, das Bezeugen mehrerer Blöcke für denselben Slot oder das Widersprechen früherer Checkpoint-Stimmen. Dies sind Verhaltensweisen, die zu einem Slashing führen und härter bestraft werden – Slashing führt dazu, dass ein Teil des Stakes des Validators zerstört wird und der Validator aus dem Netzwerk der Validatoren entfernt wird. Dieser Prozess dauert 36 Tage. An Tag 1 gibt es eine anfängliche Strafe von bis zu 1 ETH. Dann fließt der Ether des geslashten Validators über die Austrittsperiode langsam ab, aber an Tag 18 erhält er eine „Korrelationsstrafe“, die größer ist, wenn mehr Validatoren etwa zur gleichen Zeit geslasht werden. Die Höchststrafe ist der gesamte Stake. Diese Belohnungen und Strafen sollen ehrliche Validatoren anreizen und Angriffe auf das Netzwerk abschrecken.

### Inaktivitätsleck {#inactivity-leak}

Neben der Sicherheit bietet Gasper auch „plausible Liveness“ (Lebendigkeit). Dies ist die Bedingung, dass, solange zwei Drittel des gesamten gestakten Ethers ehrlich abstimmen und dem Protokoll folgen, die Chain unabhängig von anderen Aktivitäten (wie Angriffen, Latenzproblemen oder Slashings) endgültig werden kann. Anders ausgedrückt: Ein Drittel des gesamten gestakten Ethers muss irgendwie kompromittiert sein, um zu verhindern, dass die Chain endgültig wird. In Gasper gibt es eine zusätzliche Verteidigungslinie gegen einen Liveness-Ausfall, bekannt als das „Inaktivitätsleck“. Dieser Mechanismus wird aktiviert, wenn die Chain für mehr als vier Epochen nicht endgültig werden konnte. Den Validatoren, die die Mehrheits-Chain nicht aktiv bezeugen, wird ihr Stake nach und nach entzogen, bis die Mehrheit wieder zwei Drittel des gesamten Stakes erreicht, wodurch sichergestellt wird, dass Liveness-Ausfälle nur vorübergehend sind.

### Fork-Choice {#fork-choice}

Die ursprüngliche Definition von Casper FFG enthielt einen Fork-Choice-Algorithmus, der die folgende Regel auferlegte: `follow the chain containing the justified checkpoint that has the greatest height` wobei die Höhe als die größte Entfernung vom Genesis-Block definiert ist. In Gasper ist die ursprüngliche Fork-Choice-Regel zugunsten eines ausgefeilteren Algorithmus namens LMD-GHOST veraltet. Es ist wichtig zu erkennen, dass unter normalen Bedingungen eine Fork-Choice-Regel unnötig ist – es gibt einen einzigen Block-Proposer für jeden Slot, und ehrliche Validatoren bezeugen ihn. Nur in Fällen großer Netzwerk-Asynchronität oder wenn ein unehrlicher Block-Proposer zweideutig gehandelt hat, ist ein Fork-Choice-Algorithmus erforderlich. Wenn diese Fälle jedoch eintreten, ist der Fork-Choice-Algorithmus eine kritische Verteidigung, die die korrekte Chain sichert.

LMD-GHOST steht für „latest message-driven greedy heaviest observed sub-tree“. Dies ist eine sehr fachspezifische Art, einen Algorithmus zu definieren, der die Fork mit dem größten angesammelten Gewicht an Bezeugungen als die kanonische auswählt (greedy heaviest subtree) und bei dem, wenn mehrere Nachrichten von einem Validator empfangen werden, nur die neueste berücksichtigt wird (latest-message driven). Bevor der schwerste Block zu seiner kanonischen Chain hinzugefügt wird, bewertet jeder Validator jeden Block anhand dieser Regel.

## Weiterführende Literatur {#further-reading}

- [Gasper: Combining GHOST and Casper](https://arxiv.org/pdf/2003.03052.pdf)
- [Casper the Friendly Finality Gadget](https://arxiv.org/pdf/1710.09437.pdf)