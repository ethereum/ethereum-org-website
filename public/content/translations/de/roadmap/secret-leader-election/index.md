---
title: Geheime Führungswahl
description: Erklärung wie geheime Führungswahlen helfen können, Validatoren von Angreifen zu schützen
lang: de
summaryPoints:
  - Die IP-Adresse von Blockantragstellern (Proposern) kann im Vorne herein bekannt sein, was sie Angriffen aussetzt
  - Geheime Führungswahlen verstecken die Identität von Validatoren, sodass sie nicht im Vorne herein bekannt sind
  - Eine Erweiterung dieser Idee ist, die Wahl der Validatoren in jedem Slot zufällig zu gestalten.
---

# Geheime Führungswahl {#single-secret-leader-election}

Im heutigen [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos) basierten Konsensmechanismus ist die Liste der bevorstehenden Blockantragsteller öffentlich und es ist möglich ihre IP-Adressen herauszufinden. Das heißt, dass Angreifer herausfinden könnten, welche Validatoren an der Reihe sind einen Block vorzuschlagen und diesen mit einer Denial-of-Service (DOS) Attacke angreifen. Dadurch könnte der Validator nicht mehr rechtzeitig einen Block vorschlagen.

Das könnte eine Gelegenheit erzeugen, aus der der Angreifer profitieren könnte. Ein Blockantragsteller, der für Slot `n+1` gewählt wurde, könnte den Blockantragsteller in Slot `n` gewählt wurde mit einer DOS-Attacke angreifen. Dadurch verliert dieser in Slot `n` die Möglichkeit einen neuen Block vorzuschlagen. Das würde dem angreifenden Blockantragsteller erlauben, MEV aus beiden Slots zu ziehen, oder alle Transaktionen, welche zwischen zwei Blöcken geteilt werden hätten sollen, nehmen. Das führt dazu, dass der Angreifer alle zugehörigen Gebühren verdienen würde. Das trifft wahrscheinlich Validatoren, die Einzelpersonen zu Hause gehören, mehr als ausgefeilten institutionellen Validatoren, welche fortgeschrittenere Methoden nutzen können, um sich vor DOS-Attacken zu schützen. Das könnte sie zu einer zentralisierenden Macht machen.

Es gibt mehrere Lösungsansätze für dieses Problem. Eines ist die [Verteilte Validatoren Technologie](https://github.com/ethereum/distributed-validator-specs) welche versucht mehrere Aufgaben, die für den Betrieb von Validatoren wichtig sind, auf mehrere Maschinen mit Redundanz zu verteilen. Dadurch wird es für einen Angreifer viel schwerer einem Block zu verhindern in einem bestimmten Slot vorgeschlagen zu werden. Jedoch ist die robusteste Lösung die **Einzelne geheime Führungswahl (SSLE)**.

## Geheime Einzelwahl des Leiters {#secret-leader-election}

In der SSLE wird kluge Kryptographie genutzt, um sicherzustellen, dass nur der gewählte Validator weiß, dass er gewählt wurde. Dies funktioniert, indem jeder Validator eine Verpflichtung zu einem gemeinsamen Geheimnis abgibt. Die Verpflichtungen werden gemischt und neu konfiguriert, sodass niemand die einzelnen Verpflichtungen zu Validatoren herausfinden kann. Jeder Validator weiß jedoch welche Verpflichtung zu ihm gehört. Dann wird eine Verpflichtung zufällig ausgewählt. Wenn der Validator bemerkt, dass seine Verpflichtung gewählt wurde, weiß er, dass er einen Block vorschlagen darf.

Die führende Implementation dieser Idee nennt sich [Whisk](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763). Welche wie folgt funktioniert:

1. Validatoren verpflichten sich zu einem gemeinsamen Geheimnis. Das Verpflichtungssystem ist so konzipiert, dass es zu der Identität eines Validatoren gebunden werden kann, jedoch gleichzeitig so zufällig aufgebaut ist, dass es nicht reversibel ist. Das heißt, dass kein Dritter den Bund rekonstruieren und so eine spezifische Verpflichtung zu einem spezifischen Validator herstellen kann.
2. Beim Start jeder Epoche wird eine zufällige Teilmenge an Validatoren gewählt, um Verpflichtungen von 16384 Validatoren mit RANDAO zu sampeln.
3. Für die nächsten 8182 Slots (1 Tag), mischen und randomisieren Blockantragsteller eine Teilmenge der Verpflichtungen mit ihrer privaten Entropie.
4. Nachdem sie mit dem Mischen fertig sind, wird RANDAO genutzt, um eine geordnete Liste der Verpflichtungen anzufertigen. Diese Liste wird den Ethereum Slots zugeordnet.
5. Validatoren sehen, dass ihre Verpflichtung zu einem spezifischen Slot gebunden ist und wenn dieser Slot an der Reihe ist schlagen sie einen Block vor.
6. Man wiederholt diese Schritte damit die Zuordnung von Verpflichtungen immer dem jetzigen Slot weit voraus sind.

Das hindert Angreifer davon, im Vorne herein zu wissen, welcher Validator den nächsten Block vorschlagen wird, was DOS-Attacken verhindert.

## Nicht-Einzelne geheime Führungswahl (SnSLE) {#secret-non-single-leader-election}

Es gibt auch einen anderen Vorschlag, welcher versucht ein Szenario zu erstellen, in dem Validatoren in jedem Slot eine zufällige Chance haben, einen Validator vorzuschlagen. Das wäre ähnlich wie Blockanträge beim Proof-of-Work Algorithmus gewählt wurden, bekannt als **Nicht-Einzelne geheime Führungswahl (SnSLE)**. Ein einfacher Weg dies zu tun ist, die RANDAO Funktion zu nutzen, um zufällig Validatoren im heutigen Protokoll auszuwählen. Die Idee von RANDAO ist, dass eine ausreichend zufällige Zahl durch das Mischen von Hashes von vielen unabhängigen Validatoren eingereicht werden. Bei SnSLE könnten diese Hashes genutzt werden, um den nächsten Blockantragsteller zu wählen, beispielsweise den Hash mit dem niedrigsten Wert. Die Spanne von validen Hashes könnte eingeschränkt werden, um die Wahrscheinlichkeit, dass ein individueller Validator in einen Slot gewählt wird anzupassen. Indem man festlegt, dass der Hash kleiner als `2^256 * 5 / N` sein muss, wobei `N` der Anzahl an aktiven Validatoren entspricht, würde die Chance, dass jeder einzelne Validator gewählt wird `5/N` entsprechen. In diesem Beispiel gäbe es eine 99,3 % Chance, dass mindestens ein Antragsteller einen validen Hash in jedem Slot generiert.

## Aktueller Fortschritt {#current-progress}

SSLE und SnSLE sind beide in der Forschungsphase. Es gibt noch keine finalen Spezifikationen für diese Idee. SSLE und SnSLE sind konkurrierende Vorschläge, von denen nur einer implementiert werden könnte. Vor der Veröffentlichung muss mehr Forschung, Entwicklung, Prototypenherstellung und Implementierung auf öffentlichen Testnetzen durchgeführt werden.

## Weiterführende Informationen {#further-reading}

- [SnSLE](https://ethresear.ch/t/secret-non-single-leader-election/11789)
