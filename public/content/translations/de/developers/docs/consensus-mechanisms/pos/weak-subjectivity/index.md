---
title: Schwache Subjektivität
description: Eine Erklärung der schwachen Subjektivität und ihrer Rolle im PoS-Ethereum.
lang: de
---

Subjektivität bei Blockchains bezieht sich auf die Abhängigkeit von sozialen Informationen, um sich auf den aktuellen Zustand zu einigen. Es kann mehrere gültige Forks geben, aus denen anhand von Informationen ausgewählt wird, die von anderen Peers im Netzwerk gesammelt wurden. Das Gegenteil ist Objektivität, was sich auf Chains bezieht, bei denen es nur eine mögliche gültige Chain gibt, auf die sich alle Knoten zwangsläufig einigen werden, indem sie ihre programmierten Regeln anwenden. Es gibt auch einen dritten Zustand, bekannt als schwache Subjektivität. Dies bezieht sich auf eine Chain, die objektiv fortschreiten kann, nachdem ein anfänglicher Informationskern sozial abgerufen wurde.

## Voraussetzungen {#prerequisites}

Um diese Seite zu verstehen, ist es notwendig, zunächst die Grundlagen von [Proof-of-Stake (PoS)](/developers/docs/consensus-mechanisms/pos/) zu verstehen.

## Welche Probleme löst die schwache Subjektivität? {#problems-ws-solves}

Subjektivität ist Proof-of-Stake-Blockchains inhärent, da die Auswahl der richtigen Chain aus mehreren Forks durch das Zählen historischer Stimmen erfolgt. Dies setzt die Blockchain mehreren Angriffsvektoren aus, einschließlich Long-Range-Angriffen, bei denen Knoten, die sehr früh an der Chain teilgenommen haben, einen alternativen Fork aufrechterhalten, den sie viel später zu ihrem eigenen Vorteil veröffentlichen. Alternativ, wenn 33 % der Validatoren ihren Stake abheben, aber weiterhin testieren und Blöcke produzieren, könnten sie einen alternativen Fork generieren, der mit der kanonischen Chain in Konflikt steht. Neue Knoten oder Knoten, die lange Zeit offline waren, wissen möglicherweise nicht, dass diese angreifenden Validatoren ihre Gelder abgehoben haben, sodass Angreifer sie dazu verleiten könnten, einer falschen Chain zu folgen. [Ethereum](/) kann diese Angriffsvektoren lösen, indem es Einschränkungen auferlegt, die die subjektiven Aspekte des Mechanismus – und damit die Vertrauensannahmen – auf das absolute Minimum reduzieren.

## Checkpoints für schwache Subjektivität {#ws-checkpoints}

Schwache Subjektivität wird im Proof-of-Stake-Ethereum durch die Verwendung von „Checkpoints für schwache Subjektivität“ implementiert. Dies sind Zustands-Roots (State Roots), bei denen sich alle Knoten im Netzwerk einig sind, dass sie zur kanonischen Chain gehören. Sie dienen demselben Zweck der „universellen Wahrheit“ wie Genesis-Blöcke, außer dass sie sich nicht an der Genesis-Position in der Blockchain befinden. Der Fork-Choice-Algorithmus vertraut darauf, dass der in diesem Checkpoint definierte Blockchain-Zustand korrekt ist und dass er die Chain von diesem Punkt an unabhängig und objektiv verifiziert. Die Checkpoints fungieren als „Grenzen für das Rückgängigmachen“ (Revert Limits), da Blöcke, die sich vor Checkpoints für schwache Subjektivität befinden, nicht geändert werden können. Dies untergräbt Long-Range-Angriffe einfach dadurch, dass Long-Range-Forks als Teil des Mechanismusdesigns als ungültig definiert werden. Die Sicherstellung, dass die Checkpoints für schwache Subjektivität durch einen geringeren Abstand als die Abhebungsfrist für Validatoren getrennt sind, stellt sicher, dass ein Validator, der die Chain forkt, zumindest um einen bestimmten Schwellenwert einem Slashing unterzogen wird, bevor er seinen Stake abheben kann, und dass neue Teilnehmer nicht von Validatoren, deren Stake abgehoben wurde, auf falsche Forks gelockt werden können.

## Unterschied zwischen Checkpoints für schwache Subjektivität und endgültigen Blöcken {#difference-between-ws-and-finalized-blocks}

Endgültige Blöcke und Checkpoints für schwache Subjektivität werden von Ethereum-Knoten unterschiedlich behandelt. Wenn ein Knoten auf zwei konkurrierende endgültige Blöcke aufmerksam wird, ist er zwischen den beiden hin- und hergerissen – er hat keine Möglichkeit, automatisch zu erkennen, welcher der kanonische Fork ist. Dies ist symptomatisch für ein Konsensversagen. Im Gegensatz dazu lehnt ein Knoten einfach jeden Block ab, der mit seinem Checkpoint für schwache Subjektivität in Konflikt steht. Aus der Perspektive des Knotens stellt der Checkpoint für schwache Subjektivität eine absolute Wahrheit dar, die nicht durch neues Wissen von seinen Peers untergraben werden kann.

## Wie schwach ist schwach? {#how-weak-is-weak}

Der subjektive Aspekt von Ethereums Proof-of-Stake ist die Anforderung an einen aktuellen Zustand (Checkpoint für schwache Subjektivität) aus einer vertrauenswürdigen Quelle, von dem aus die Synchronisierung erfolgen soll. Das Risiko, einen schlechten Checkpoint für schwache Subjektivität zu erhalten, ist sehr gering, da diese mit mehreren unabhängigen öffentlichen Quellen wie Block-Explorern oder mehreren Knoten abgeglichen werden können. Es ist jedoch immer ein gewisses Maß an Vertrauen erforderlich, um eine Softwareanwendung auszuführen, zum Beispiel das Vertrauen darauf, dass die Softwareentwickler ehrliche Software produziert haben.

Ein Checkpoint für schwache Subjektivität kann sogar als Teil der Client-Software geliefert werden. Man kann argumentieren, dass ein Angreifer den Checkpoint in der Software korrumpieren und ebenso leicht die Software selbst korrumpieren kann. Es gibt keinen wirklichen kryptoökonomischen Weg um dieses Problem herum, aber die Auswirkungen nicht vertrauenswürdiger Entwickler werden in Ethereum minimiert, indem es mehrere unabhängige Client-Teams gibt, die jeweils gleichwertige Software in verschiedenen Sprachen entwickeln und alle ein begründetes Interesse daran haben, eine ehrliche Chain aufrechtzuerhalten. Block-Explorer können ebenfalls Checkpoints für schwache Subjektivität bereitstellen oder eine Möglichkeit bieten, von anderswo erhaltene Checkpoints mit einer zusätzlichen Quelle abzugleichen.

Schließlich können Checkpoints von anderen Knoten angefordert werden; vielleicht kann ein anderer Ethereum-Benutzer, der einen Full Node betreibt, einen Checkpoint bereitstellen, den Validatoren dann anhand von Daten aus einem Block-Explorer verifizieren können. Insgesamt kann das Vertrauen in den Anbieter eines Checkpoints für schwache Subjektivität als ebenso problematisch angesehen werden wie das Vertrauen in die Client-Entwickler. Das insgesamt erforderliche Vertrauen ist gering. Es ist wichtig zu beachten, dass diese Überlegungen nur in dem sehr unwahrscheinlichen Fall wichtig werden, dass eine Mehrheit der Validatoren sich verschwört, um einen alternativen Fork der Blockchain zu produzieren. Unter allen anderen Umständen gibt es nur eine Ethereum-Chain, aus der man wählen kann.

## Weiterführende Literatur {#further-reading}

- [Schwache Subjektivität in Eth2](https://notes.ethereum.org/@adiasg/weak-subjectvity-eth2)
- [Vitalik: Wie ich lernte, die schwache Subjektivität zu lieben](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity)
- [Schwache Subjektivität (Teku-Dokumentation)](https://docs.teku.consensys.io/concepts/weak-subjectivity)
- [Leitfaden zur schwachen Subjektivität in Phase 0](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/weak-subjectivity.md)
- [Analyse der schwachen Subjektivität in Ethereum 2.0](https://github.com/runtimeverification/beacon-chain-verification/blob/master/weak-subjectivity/weak-subjectivity-analysis.pdf)