---
title: Verkle-Bäume
description: Eine allgemeine Beschreibung von Verkle-Bäumen und wie sie zur Aktualisierung von Ethereum verwendet werden
lang: de
summaryPoints:
  - Erfahren Sie, was Verkle-Bäume sind
  - Lesen Sie, warum Verkle-Bäume ein nützliches Upgrade für Ethereum sind
---

Verkle-Bäume (ein Kofferwort aus „Vector Commitment“ und „Merkle-Bäumen“) sind eine Datenstruktur, die verwendet werden kann, um [Ethereum](/)-Knoten zu aktualisieren, sodass sie keine großen Mengen an Zustandsdaten mehr speichern müssen, ohne die Fähigkeit zur Validierung von Blöcken zu verlieren.

## Zustandslosigkeit {#statelessness}

Verkle-Bäume sind ein entscheidender Schritt auf dem Weg zu zustandslosen Ethereum-Clients. Zustandslose Clients sind solche, die nicht die gesamte Zustandsdatenbank speichern müssen, um eingehende Blöcke zu validieren. Anstatt ihre eigene lokale Kopie des Ethereum-Zustands zur Verifizierung von Blöcken zu verwenden, nutzen zustandslose Clients einen „Zeugen“ (Witness) für die Zustandsdaten, der mit dem Block ankommt. Ein Zeuge ist eine Sammlung einzelner Teile der Zustandsdaten, die zur Ausführung einer bestimmten Gruppe von Transaktionen erforderlich sind, sowie ein kryptografischer Beweis, dass der Zeuge wirklich Teil der vollständigen Daten ist. Der Zeuge wird _anstelle_ der Zustandsdatenbank verwendet. Damit dies funktioniert, müssen die Zeugen sehr klein sein, damit sie rechtzeitig sicher über das Netzwerk übertragen werden können, sodass Validatoren sie innerhalb eines 12-Sekunden-Slots verarbeiten können. Die aktuelle Zustandsdatenstruktur ist nicht geeignet, da die Zeugen zu groß sind. Verkle-Bäume lösen dieses Problem, indem sie kleine Zeugen ermöglichen und so eine der Haupthürden für zustandslose Clients beseitigen.

<ExpandableCard title="Warum wollen wir zustandslose Clients?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

Ethereum-Clients verwenden derzeit eine Datenstruktur, die als Patricia-Merkle-Trie bekannt ist, um ihre Zustandsdaten zu speichern. Informationen über einzelne Konten werden als Blätter im Trie gespeichert, und Blattpaare werden wiederholt gehasht, bis nur noch ein einziger Hash übrig bleibt. Dieser finale Hash wird als „Wurzel“ (Root) bezeichnet. Um Blöcke zu verifizieren, führen Ethereum-Clients alle Transaktionen in einem Block aus und aktualisieren ihren lokalen Zustands-Trie. Der Block gilt als gültig, wenn die Wurzel des lokalen Baums mit der vom Block-Proposer bereitgestellten identisch ist, da jegliche Unterschiede in der Berechnung durch den Block-Proposer und den validierenden Knoten dazu führen würden, dass der Root-Hash völlig anders ausfällt. Das Problem dabei ist, dass die Verifizierung der Blockchain erfordert, dass jeder Client den gesamten Zustands-Trie für den Head-Block und mehrere historische Blöcke speichert (die Standardeinstellung in Geth ist, Zustandsdaten für 128 Blöcke hinter dem Head zu behalten). Dies erfordert, dass Clients Zugriff auf eine große Menge an Speicherplatz haben, was eine Hürde für den Betrieb von vollständigen Knoten auf günstiger, stromsparender Hardware darstellt. Eine Lösung hierfür ist die Aktualisierung des Zustands-Tries auf eine effizientere Struktur (Verkle-Baum), die mithilfe eines kleinen „Zeugen“ für die Daten zusammengefasst werden kann, der anstelle der vollständigen Zustandsdaten geteilt werden kann. Die Umformatierung der Zustandsdaten in einen Verkle-Baum ist ein Sprungbrett für den Übergang zu zustandslosen Clients.

</ExpandableCard>

## Was ist ein Zeuge und warum brauchen wir ihn? {#what-is-a-witness}

Einen Block zu verifizieren bedeutet, die im Block enthaltenen Transaktionen erneut auszuführen, die Änderungen auf den Zustands-Trie von Ethereum anzuwenden und den neuen Root-Hash zu berechnen. Ein verifizierter Block ist ein Block, dessen berechneter Zustands-Root-Hash mit dem im Block bereitgestellten übereinstimmt (denn das bedeutet, dass der Block-Proposer die Berechnung wirklich so durchgeführt hat, wie er behauptet). In heutigen Ethereum-Clients erfordert die Aktualisierung des Zustands Zugriff auf den gesamten Zustands-Trie, eine große Datenstruktur, die lokal gespeichert werden muss. Ein Zeuge enthält nur die Fragmente der Zustandsdaten, die zur Ausführung der Transaktionen im Block erforderlich sind. Ein Validator kann dann nur diese Fragmente verwenden, um zu überprüfen, ob der Block-Proposer die Blocktransaktionen ausgeführt und den Zustand korrekt aktualisiert hat. Dies bedeutet jedoch, dass der Zeuge zwischen Peers im Ethereum-Netzwerk schnell genug übertragen werden muss, um von jedem Knoten sicher innerhalb eines 12-Sekunden-Slots empfangen und verarbeitet zu werden. Wenn der Zeuge zu groß ist, könnte es für einige Knoten zu lange dauern, ihn herunterzuladen und mit der Chain Schritt zu halten. Dies ist eine zentralisierende Kraft, da es bedeutet, dass nur Knoten mit schnellen Internetverbindungen an der Validierung von Blöcken teilnehmen können. Mit Verkle-Bäumen ist es nicht mehr nötig, den Zustand auf der Festplatte zu speichern; _alles_, was Sie zur Verifizierung eines Blocks benötigen, ist im Block selbst enthalten. Leider sind die Zeugen, die aus Merkle-Tries erzeugt werden können, zu groß, um zustandslose Clients zu unterstützen.

## Warum ermöglichen Verkle-Bäume kleinere Zeugen? {#why-do-verkle-trees-enable-smaller-witnesses}

Die Struktur eines Merkle-Tries macht die Größe von Zeugen sehr groß – zu groß, um sie innerhalb eines 12-Sekunden-Slots sicher zwischen Peers zu übertragen. Das liegt daran, dass der Zeuge ein Pfad ist, der die Daten, die in Blättern gehalten werden, mit dem Root-Hash verbindet. Um die Daten zu verifizieren, ist es notwendig, nicht nur alle Zwischen-Hashes zu haben, die jedes Blatt mit der Wurzel verbinden, sondern auch alle „Geschwister“-Knoten. Jeder Knoten im Beweis hat ein Geschwisterchen, mit dem er gehasht wird, um den nächsten Hash im Trie nach oben zu erstellen. Das sind eine Menge Daten. Verkle-Bäume reduzieren die Größe des Zeugen, indem sie den Abstand zwischen den Blättern des Baums und seiner Wurzel verkürzen und außerdem die Notwendigkeit beseitigen, Geschwisterknoten zur Verifizierung des Root-Hashes bereitzustellen. Noch mehr Platzeffizienz wird durch die Verwendung eines leistungsstarken Polynomial-Commitment-Schemas anstelle des Hash-basierten Vector-Commitments erzielt. Das Polynomial-Commitment ermöglicht es dem Zeugen, eine feste Größe zu haben, unabhängig von der Anzahl der Blätter, die er beweist.

Unter dem Polynomial-Commitment-Schema haben die Zeugen überschaubare Größen, die leicht im Peer-to-Peer-Netzwerk übertragen werden können. Dies ermöglicht es Clients, Zustandsänderungen in jedem Block mit einer minimalen Datenmenge zu verifizieren.

<ExpandableCard title="Um wie viel genau können Verkle-Bäume die Zeugengröße reduzieren?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

Die Größe des Zeugen variiert je nach Anzahl der enthaltenen Blätter. Angenommen, der Zeuge deckt 1000 Blätter ab, wäre ein Zeuge für einen Merkle-Trie etwa 3,5 MB groß (unter der Annahme von 7 Ebenen im Trie). Ein Zeuge für dieselben Daten in einem Verkle-Baum (unter der Annahme von 4 Ebenen im Baum) wäre etwa 150 kB groß – **etwa 23-mal kleiner**. Diese Reduzierung der Zeugengröße wird es ermöglichen, dass Zeugen für zustandslose Clients akzeptabel klein sind. Polynom-Zeugen sind 0,128 - 1 kB groß, je nachdem, welches spezifische Polynomial-Commitment verwendet wird.

</ExpandableCard>

## Wie ist die Struktur eines Verkle-Baums? {#what-is-the-structure-of-a-verkle-tree}

Verkle-Bäume sind `(key,value)`-Paare, bei denen die Schlüssel 32-Byte-Elemente sind, die aus einem 31-Byte-_Stamm_ (Stem) und einem Einzel-Byte-_Suffix_ bestehen. Diese Schlüssel sind in _Erweiterungsknoten_ (Extension Nodes) und _innere_ Knoten (Inner Nodes) organisiert. Erweiterungsknoten repräsentieren einen einzelnen Stamm für 256 Kinder mit unterschiedlichen Suffixen. Innere Knoten haben ebenfalls 256 Kinder, aber sie können andere Erweiterungsknoten sein. Der Hauptunterschied zwischen der Struktur des Verkle-Baums und des Merkle-Baums besteht darin, dass der Verkle-Baum viel flacher ist, was bedeutet, dass es weniger Zwischenknoten gibt, die ein Blatt mit der Wurzel verbinden, und daher weniger Daten zur Generierung eines Beweises erforderlich sind.

![Diagram of a Verkle tree data structure](./verkle.png)

[Lesen Sie mehr über die Struktur von Verkle-Bäumen](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## Aktueller Fortschritt {#current-progress}

Verkle-Baum-Testnetze sind bereits in Betrieb, aber es gibt noch erhebliche ausstehende Updates für Clients, die zur Unterstützung von Verkle-Bäumen erforderlich sind. Sie können helfen, den Fortschritt zu beschleunigen, indem Sie Verträge in den Testnetzen bereitstellen oder Testnetz-Clients ausführen.

[Sehen Sie sich an, wie Guillaume Ballet das Condrieu-Verkle-Testnetz erklärt](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (beachten Sie, dass das Condrieu-Testnetz auf Proof-of-Work (PoW) basierte und nun durch das Verkle Gen Devnet 6-Testnetz ersetzt wurde).

## Weiterführende Literatur {#further-reading}

- [Verkle-Bäume für Zustandslosigkeit](https://verkle.info/)
- [Dankrad Feist erklärt Verkle-Bäume bei PEEPanEIP](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Verkle-Bäume für den Rest von uns](https://web.archive.org/web/20250124132255/https://research.2077.xyz/verkle-trees)
- [Anatomie eines Verkle-Beweises](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
- [Guillaume Ballet erklärt Verkle-Bäume bei ETHGlobal](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- [„Wie Verkle-Bäume Ethereum schlank und effizient machen“ von Guillaume Ballet auf der Devcon 6](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam über zustandslose Clients von der ETHDenver 2020](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Feist erklärt Verkle-Bäume und Zustandslosigkeit im Zero-Knowledge-Podcast](https://zeroknowledge.fm/podcast/202/)
- [Vitalik Buterin über Verkle-Bäume](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist über Verkle-Bäume](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [EIP-Dokumentation zu Verkle-Bäumen](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)