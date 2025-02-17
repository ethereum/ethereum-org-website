---
title: Schwache Subjektivität
description: Eine Erklärung zur schwachen Subjektivität und deren Rolle in PoS-Ethereum.
lang: de
---

Subjektivität in Blockchains bezieht sich auf die Abhängigkeit davon, dass soziale Informationen mit dem aktuellen Zustand übereinstimmen. Es kann mehrere gültige Abspaltungen geben, aus denen anhand der von anderen Peers im Netzwerk gesammelten Informationen eine Auswahl getroffen wird. Das Gegenteil davon ist die Objektivität, die sich auf Chains bezieht, bei denen es nur eine mögliche gültige Chain gibt, auf die sich alle Nodes zwangsläufig einigen können, indem sie ihre kodierten Regeln anwenden. Es gibt also auch einen dritten Zustand, bekannt als schwache Subjektivität. Dies bezieht sich auf eine Chain, die objektiv Fortschritte machen kann, nachdem ein erster „Informationskeim“ sozial abgerufen wurde.

## Voraussetzungen {#prerequisites}

Um diese Seite zu verstehen, müssen zuerst die Grundlagen von [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) verstanden werden.

## Welche Probleme löst die schwache Subjektivität? {#problems-ws-solves}

Subjektivität ist bei Proof-of-Stake-Blockchains inhärent, da die Auswahl der korrekten Chain aus mehreren Abspaltungen durch das Zählen historischer Stimmen erfolgt. Dies setzt die Blockchain mehreren Angriffsvektoren aus. Dazu gehören auch Langstreckenangriffe, bei denen Nodes, die sehr früh an der Chain beteiligt waren, eine alternative Abspaltung aufrechterhalten, die sie viel später zu ihrem eigenen Vorteil freigeben. Wenn 33 % der Validatoren ihren Stake zurückziehen, jedoch weiter attestieren und Blöcke produzieren, könnten diese andererseits eine alternative Abspaltung generieren, die mit der kanonischen Chain in Konflikt steht. Neue Nodes oder Nodes, die lange Zeit offline waren, wissen möglicherweise nicht, dass diese angreifenden Validatoren ihre Geldmittel zurückgezogen haben. Angreifer könnten sie also dazu bringen, einer falschen Chain zu folgen. Ethereum kann dieses Problem mit Angriffsvektoren lösen, indem es Beschränkungen auferlegt, die die subjektiven Aspekte des Mechanismus – und damit die Vertrauensannahmen – auf das absolute Minimum reduziert.

## Checkpoints von schwacher Subjektivität {#ws-checkpoints}

Schwache Subjektivität wird in Proof-of-Stake-Ethereum durch die Verwendung von „Checkpoints von schwacher Subjektivität“ implementiert. Dabei handelt es sich um State Roots, bei denen sich alle Nodes auf dem Netzwerk einig sind, dass sie zur kanonischen Chain gehören. Sie dienen demselben Zweck der „universellen Wahrheit“ wie Genesis-Blöcke, nur dass sie nicht an der Genesis-Position in der Blockchain sitzen. Der Abspaltungs-Wahl-Algorithmus vertraut darauf, dass der in diesem Checkpoint definierte Blockchain-Zustand korrekt ist und dass er die Chain von diesem Punkt an unabhängig und objektiv verifiziert. Die Checkpoints fungieren als „Rückkehrlimits“, da Blöcke, die sich vor Checkpoints von schwacher Subjektivität befinden, nicht verändert werden können. Dies untergräbt Langstreckenangriffe, indem Langstreckenabspaltungen als Teil des Mechanismusdesigns einfach als ungültig definiert werden. Wenn die Checkpoints von schwacher Subjektivität in einem geringeren Abstand zueinander liegen als der Zeitraum, in dem die Validatoren ihre Stakes zurückziehen können, wird sichergestellt, dass ein Validator, der die Chain aufspaltet, zumindest um einen gewissen Schwellenwert geslasht wird, bevor er seinen Stake abziehen kann, und dass neue Teilnehmer nicht von Validatoren, deren Stakes abgezogen wurden, zu falschen Abspaltungen verleitet werden können.

## Unterschiede zwischen Checkpoints von schwacher Subjektivität und finalisierten Blöcken {#difference-between-ws-and-finalized-blocks}

Finalisierte Blöcke und Checkpoints von schwacher Subjektivität werden von Ethereum-Nodes unterschiedlich behandelt. Wenn ein Node von zwei konkurrierenden finalisierten Blöcken erfährt, ist er zwischen den beiden hin- und hergerissen – er hat keine Möglichkeit, automatisch zu erkennen, welche die kanonische Abspaltung ist. Das ist symptomatisch für ein Konsensversagen. Im Gegensatz dazu lehnt ein Node einfach jeden Block ab, der im Widerspruch zu seinem Checkpoint von schwacher Subjektivität steht. Aus Sicht des Nodes stellt der Checkpoint von schwachen Subjektivität eine absolute Wahrheit dar, die nicht durch neues Wissen seiner Peers untergraben werden kann.

## Wie schwach ist schwach? {#how-weak-is-weak}

Der subjektive Aspekt von Proof-of-Stake für Ethereum besteht darin, dass ein aktueller Zustand (Checkpoint von schwacher Subjektivität) aus einer vertrauenswürdigen Quelle erforderlich ist, von der aus die Synchronisierung erfolgen kann. Das Risiko, einen schlechten Checkpoint von schwacher Subjektivität zu erhalten, ist sehr gering, da diese anhand mehrerer unabhängiger öffentlicher Quellen wie Block-Explorer oder mehrerer Nodes überprüft werden können. Jedoch ist immer ein gewisses Maß an Vertrauen für die Ausführung jeder Software-Anwendung erforderlich. Zum Beispiel muss den Software-Entwicklern genug Vertrauen entgegengebracht werden, dass sie eine ehrliche Software programmiert haben.

Ein Checkpoint von schwacher Subjektivität könnte sogar als Teil der Client-Software kommen. Ein Angreifer kann wohl nicht nur den Checkpoint in der Software, sondern genauso leicht auch die Software selbst korrumpieren. Es gibt keinen echten kryptowirtschaftlichen Weg, dieses Problem zu umgehen. Der Einfluss unseriöser Entwickler wird in Ethereum allerdings dadurch minimiert, dass mehrere unabhängige Client-Teams beteiligt sind. Jedes Team entwickelt äquivalente Software in unterschiedlichen Programmiersprachen und hat ein eigenes Interesse daran, eine ehrliche Blockchain aufrechtzuerhalten. Block-Explorer können auch Checkpoints von schwacher Subjektivität oder eine Möglichkeit zum Abgleich von Checkpoints, die von anderer Stelle stammen, mit einer zusätzlichen Quelle bereitstellen.

Schließlich können Checkpoints von anderen Nodes angefordert werden; möglicherweise kann ein anderer Ethereum-Benutzer, der einen vollständigen Node betreibt, einen Checkpoint bereitstellen, den Validatoren dann mit Daten von einem Block-Explorer abgleichen können. Insgesamt kann das Vertrauen in den Anbieter eines Checkpoints von schwachen Subjektivität als ebenso problematisch angesehen werden wie das Vertrauen in die Client-Entwickler. Das erforderliche Vertrauen ist insgesamt gering. Es ist wichtig, darauf hinzuweisen, dass diese Überlegungen nur in dem sehr unwahrscheinlichen Fall wichtig werden, dass sich eine Mehrheit der Validatoren zusammenschließt, um eine alternative Abspaltung der Blockchain zu produzieren. Unter allen anderen Umständen gibt es nur eine Ethereum-Chain, aus der gewählt werden kann.

## Weiterführende Informationen {#further-reading}

- [Weak subjectivity in Eth2](https://notes.ethereum.org/@adiasg/weak-subjectvity-eth2)
- [Vitalik: How I learned to love weak subjectivity](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/)
- [Weak subjectivity (Teku docs)](https://docs.teku.consensys.net/en/latest/Concepts/Weak-Subjectivity/)
- [Phase-0 Weak subjectivity guide](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/weak-subjectivity.md)
- [Analysis of weak subjectivity in Ethereum 2.0](https://github.com/runtimeverification/beacon-chain-verification/blob/master/weak-subjectivity/weak-subjectivity-analysis.pdf)
