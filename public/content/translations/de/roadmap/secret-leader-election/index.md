---
title: "Geheime Anführerwahl"
description: "Erklärung, wie die geheime Anführerwahl helfen kann, Validatoren vor Angriffen zu schützen"
lang: de
summaryPoints:
  - Die IP-Adresse von Block-Vorschlagenden kann im Voraus bekannt sein, was sie anfällig für Angriffe macht
  - Die geheime Anführerwahl verbirgt die Identität von Validatoren, sodass sie nicht im Voraus bekannt sind
  - Eine Erweiterung dieser Idee besteht darin, die Auswahl der Validatoren in jedem Slot zufällig zu gestalten.
---

# Geheime Anführerwahl {#single-secret-leader-election}

Im heutigen [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos)-basierten Konsensmechanismus ist die Liste der kommenden Block-Vorschlagenden öffentlich und es ist möglich, ihre IP-Adressen zuzuordnen. Das bedeutet, dass Angreifer identifizieren könnten, welche Validatoren an der Reihe sind, einen Block vorzuschlagen, und sie mit einem Denial-of-Service (DOS)-Angriff ins Visier nehmen könnten, der sie daran hindert, ihren Block rechtzeitig vorzuschlagen.

Dies könnte Möglichkeiten für einen Angreifer schaffen, zu profitieren. Zum Beispiel könnte ein für den Slot `n+1` ausgewählter Block-Vorschlagender den Vorschlagenden in Slot `n` mit einem DOS-Angriff belegen, sodass dieser seine Gelegenheit verpasst, einen Block vorzuschlagen. Dies würde es dem angreifenden Block-Vorschlagenden ermöglichen, den Maximal extrahierbaren Wert (MEV) beider Slots zu extrahieren oder alle Transaktionen abzugreifen, die auf zwei Blöcke hätten aufgeteilt werden sollen, und sie stattdessen alle in einen aufzunehmen, wodurch er alle damit verbundenen Gebühren erhält. Dies betrifft wahrscheinlich Heim-Validatoren stärker als hochentwickelte institutionelle Validatoren, die fortschrittlichere Methoden anwenden können, um sich vor DOS-Angriffen zu schützen, und könnte daher eine zentralisierende Kraft sein.

Es gibt mehrere Lösungen für dieses Problem. Eine davon ist die [Distributed Validator Technology](https://github.com/ethereum/distributed-validator-specs), die darauf abzielt, die verschiedenen Aufgaben im Zusammenhang mit dem Betrieb eines Validators mit Redundanz auf mehrere Maschinen zu verteilen, sodass es für einen Angreifer viel schwieriger ist, zu verhindern, dass ein Block in einem bestimmten Slot vorgeschlagen wird. Die robusteste Lösung ist jedoch die **Single Secret Leader Election (SSLE)**.

## Single Secret Leader Election {#secret-leader-election}

Bei SSLE wird clevere Kryptografie eingesetzt, um sicherzustellen, dass nur der ausgewählte Validator weiß, dass er ausgewählt wurde. Dies funktioniert, indem jeder Validator eine Verpflichtung (Commitment) zu einem Geheimnis einreicht, das sie alle teilen. Die Commitments werden gemischt und neu konfiguriert, sodass niemand Commitments zu Validatoren zuordnen kann, aber jeder Validator weiß, welches Commitment zu ihm gehört. Dann wird ein Commitment zufällig ausgewählt. Wenn ein Validator erkennt, dass sein Commitment ausgewählt wurde, weiß er, dass er an der Reihe ist, einen Block vorzuschlagen.

Die führende Implementierung dieser Idee heißt [Whisk](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763). Sie funktioniert wie folgt:

1. Validatoren verpflichten sich auf ein gemeinsames Geheimnis. Das Commitment-Schema ist so konzipiert, dass es an eine Validator-Identität gebunden, aber auch randomisiert werden kann, sodass kein Dritter die Bindung zurückentwickeln (Reverse Engineering) und ein bestimmtes Commitment mit einem bestimmten Validator verknüpfen kann.
2. Zu Beginn einer Epoche wird eine zufällige Gruppe von Validatoren ausgewählt, um mithilfe von RANDAO Commitments von 16.384 Validatoren zu sammeln.
3. Für die nächsten 8182 Slots (1 Tag) mischen und randomisieren Block-Vorschlagende eine Teilmenge der Commitments unter Verwendung ihrer eigenen privaten Entropie.
4. Nachdem das Mischen abgeschlossen ist, wird RANDAO verwendet, um eine geordnete Liste der Commitments zu erstellen. Diese Liste wird auf Ethereum-Slots abgebildet.
5. Validatoren sehen, dass ihr Commitment an einen bestimmten Slot angehängt ist, und wenn dieser Slot erreicht ist, schlagen sie einen Block vor.
6. Diese Schritte werden wiederholt, sodass die Zuweisung von Commitments zu Slots dem aktuellen Slot immer weit voraus ist.

Dies hindert Angreifer daran, im Voraus zu wissen, welcher spezifische Validator den nächsten Block vorschlagen wird, und verhindert so die Möglichkeit von DOS-Angriffen.

## Secret Non-Single Leader Election (SnSLE) {#secret-non-single-leader-election}

Es gibt auch einen separaten Vorschlag, der darauf abzielt, ein Szenario zu schaffen, in dem Validatoren jeweils eine zufällige Chance haben, in jedem Slot einen Block vorzuschlagen, ähnlich wie der Blockvorschlag unter Proof-of-Work entschieden wurde, bekannt als **Secret Non-Single Leader Election (SnSLE)**. Ein einfacher Weg, dies zu tun, besteht darin, die RANDAO-Funktion zu nutzen, die im heutigen Protokoll zur zufälligen Auswahl von Validatoren verwendet wird. Die Idee bei RANDAO ist, dass eine ausreichend zufällige Zahl generiert wird, indem Hashes gemischt werden, die von vielen unabhängigen Validatoren eingereicht wurden. Bei SnSLE könnten diese Hashes verwendet werden, um den nächsten Block-Vorschlagenden auszuwählen, beispielsweise durch Auswahl des Hashes mit dem niedrigsten Wert. Der Bereich gültiger Hashes könnte eingeschränkt werden, um die Wahrscheinlichkeit abzustimmen, mit der einzelne Validatoren in jedem Slot ausgewählt werden. Durch die Festlegung, dass der Hash kleiner als `2^256 * 5 / N` sein muss, wobei `N` = Anzahl der aktiven Validatoren, läge die Chance, dass ein einzelner Validator in jedem Slot ausgewählt wird, bei `5/N`. In diesem Beispiel gäbe es eine Wahrscheinlichkeit von 99,3 %, dass mindestens ein Vorschlagender in jedem Slot einen gültigen Hash generiert.

## Aktueller Fortschritt {#current-progress}

SSLE und SnSLE befinden sich beide in der Forschungsphase. Es gibt noch für keine der beiden Ideen eine endgültige Spezifikation. SSLE und SnSLE sind konkurrierende Vorschläge, die nicht beide implementiert werden könnten. Vor der Veröffentlichung benötigen sie weitere Forschung und Entwicklung, Prototyping und die Implementierung in öffentlichen Testnets.

## Weiterführende Literatur {#further-reading}

- [SnSLE](https://ethresear.ch/t/secret-non-single-leader-election/11789)