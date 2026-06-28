---
title: Geheime Leader-Wahl
description: Erklärung, wie eine geheime Leader-Wahl helfen kann, Validatoren vor Angriffen zu schützen
lang: de
summaryPoints:
  - Die IP-Adresse von Block-Proposern kann im Voraus bekannt sein, was sie anfällig für Angriffe macht.
  - Die geheime Leader-Wahl verbirgt die Identität der Validatoren, sodass sie nicht im Voraus bekannt sind.
  - Eine Erweiterung dieser Idee besteht darin, die Auswahl der Validatoren in jedem Slot zufällig zu gestalten.
---

Im heutigen [Proof-of-Stake (PoS)](/developers/docs/consensus-mechanisms/pos)-basierten Konsensmechanismus ist die Liste der kommenden Block-Proposer öffentlich und es ist möglich, ihre IP-Adressen zuzuordnen. Das bedeutet, dass Angreifer identifizieren könnten, welche Validatoren an der Reihe sind, einen Block vorzuschlagen, und sie mit einem Denial-of-Service (DOS)-Angriff ins Visier nehmen könnten, der sie daran hindert, ihren Block rechtzeitig vorzuschlagen.

Dies könnte Möglichkeiten für einen Angreifer schaffen, um zu profitieren. Zum Beispiel könnte ein für Slot `n+1` ausgewählter Block-Proposer den Proposer in Slot `n` mit einem DOS-Angriff belegen, sodass dieser seine Gelegenheit verpasst, einen Block vorzuschlagen. Dies würde es dem angreifenden Block-Proposer ermöglichen, den MEV beider Slots zu extrahieren oder alle Transaktionen abzugreifen, die auf zwei Blöcke hätten aufgeteilt werden sollen, und sie stattdessen alle in einen aufzunehmen, wodurch er alle damit verbundenen Gebühren erhält. Dies betrifft wahrscheinlich Heim-Validatoren stärker als hochentwickelte institutionelle Validatoren, die fortschrittlichere Methoden nutzen können, um sich vor DOS-Angriffen zu schützen, und könnte daher eine zentralisierende Kraft sein.

Es gibt mehrere Lösungen für dieses Problem. Eine davon ist die [Verteilte Validator-Technologie (DVT)](https://github.com/ethereum/distributed-validator-specs), die darauf abzielt, die verschiedenen Aufgaben im Zusammenhang mit dem Betrieb eines Validators mit Redundanz auf mehrere Maschinen zu verteilen, sodass es für einen Angreifer viel schwieriger ist, zu verhindern, dass ein Block in einem bestimmten Slot vorgeschlagen wird. Die robusteste Lösung ist jedoch die **Single Secret Leader Election (SSLE)**.

## Single Secret Leader Election {#secret-leader-election}

Bei der SSLE wird clevere Kryptographie eingesetzt, um sicherzustellen, dass nur der ausgewählte Validator weiß, dass er ausgewählt wurde. Dies funktioniert, indem jeder Validator ein Commitment zu einem Geheimnis einreicht, das sie alle teilen. Die Commitments werden gemischt und neu konfiguriert, sodass niemand Commitments zu Validatoren zuordnen kann, aber jeder Validator weiß, welches Commitment zu ihm gehört. Dann wird ein Commitment zufällig ausgewählt. Wenn ein Validator erkennt, dass sein Commitment ausgewählt wurde, weiß er, dass er an der Reihe ist, einen Block vorzuschlagen.

Die führende Implementierung dieser Idee heißt [Whisk](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763). Diese funktioniert wie folgt:

1. Validatoren geben ein Commitment zu einem gemeinsamen Geheimnis ab. Das Commitment-Schema ist so konzipiert, dass es an eine Validator-Identität gebunden, aber auch randomisiert werden kann, sodass kein Dritter die Bindung zurückverfolgen (Reverse Engineering) und ein bestimmtes Commitment mit einem bestimmten Validator verknüpfen kann.
2. Zu Beginn einer Epoche wird eine zufällige Gruppe von Validatoren ausgewählt, um mithilfe von RANDAO Commitments von 16.384 Validatoren zu sammeln.
3. Für die nächsten 8182 Slots (1 Tag) mischen und randomisieren Block-Proposer eine Teilmenge der Commitments unter Verwendung ihrer eigenen privaten Entropie.
4. Nachdem das Mischen abgeschlossen ist, wird RANDAO verwendet, um eine geordnete Liste der Commitments zu erstellen. Diese Liste wird auf Ethereum-Slots abgebildet.
5. Validatoren sehen, dass ihr Commitment an einen bestimmten Slot angehängt ist, und wenn dieser Slot erreicht ist, schlagen sie einen Block vor.
6. Diese Schritte werden wiederholt, sodass die Zuweisung von Commitments zu Slots dem aktuellen Slot immer weit voraus ist.

Dies hindert Angreifer daran, im Voraus zu wissen, welcher spezifische Validator den nächsten Block vorschlagen wird, und verhindert so die Möglichkeit von DOS-Angriffen.

## Secret Non-Single Leader Election (SnSLE) {#secret-non-single-leader-election}

Es gibt auch einen separaten Vorschlag, der darauf abzielt, ein Szenario zu schaffen, in dem Validatoren jeweils eine zufällige Chance haben, in jedem Slot einen Block vorzuschlagen, ähnlich wie der Block-Vorschlag unter Proof-of-Work (PoW) entschieden wurde, bekannt als **Secret Non-Single Leader Election (SnSLE)**. Ein einfacher Weg, dies zu tun, besteht darin, die RANDAO-Funktion zu nutzen, die im heutigen Protokoll zur zufälligen Auswahl von Validatoren verwendet wird. Die Idee bei RANDAO ist, dass eine ausreichend zufällige Zahl generiert wird, indem Hashes gemischt werden, die von vielen unabhängigen Validatoren eingereicht wurden. Bei SnSLE könnten diese Hashes verwendet werden, um den nächsten Block-Proposer auszuwählen, zum Beispiel durch Auswahl des Hashes mit dem niedrigsten Wert. Der Bereich gültiger Hashes könnte eingeschränkt werden, um die Wahrscheinlichkeit abzustimmen, mit der einzelne Validatoren in jedem Slot ausgewählt werden. Indem festgelegt wird, dass der Hash kleiner als `2^256 * 5 / N` sein muss, wobei `N` = Anzahl der aktiven Validatoren, läge die Chance, dass ein einzelner Validator in jedem Slot ausgewählt wird, bei `5/N`. In diesem Beispiel gäbe es eine 99,3%ige Chance, dass mindestens ein Proposer in jedem Slot einen gültigen Hash generiert.

## Aktueller Fortschritt {#current-progress}

SSLE und SnSLE befinden sich beide in der Forschungsphase. Es gibt noch keine endgültige Spezifikation für eine der beiden Ideen. SSLE und SnSLE sind konkurrierende Vorschläge, die nicht beide implementiert werden könnten. Bevor sie veröffentlicht werden, benötigen sie weitere Forschung und Entwicklung, Prototyping und die Implementierung in öffentlichen Testnetzen.

## Weiterführende Literatur {#further-reading}

- [SnSLE](https://ethresear.ch/t/secret-non-single-leader-election/11789)