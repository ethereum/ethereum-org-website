---
title: Verkle Trees
description: Eine komplexe Beschreibung von Verkle Trees und wie sie verwendet werden, um Ethereum zu verbessern
lang: de
summaryPoints:
  - Entdecken Sie, was Verkle Trees sind
  - Lesen Sie, warum Verkle Trees eine Bereicherung für Ethereum sind.
---

# Verkle Trees {#verkle-trees}

Verkle Trees (ein Schachtelwort aus "Vektor-Verpflichtung" und "Merkle Bäumen") sind eine Datenstruktur, die zum Upgrade von Ethereum Nodes genutzt werden kann, so dass keine großen Mengen an Zustandsdaten mehr gespeichert werden müssen, ohne dass die Fähigkeit der Blockvalidierung verloren geht.

## Zustandslosigkeit {#statelessness}

Verkle Bäume sind ein kritischer Schritt hin zu Zustandsfreien Ethereum Clients. Zustandsfreie Clients müssen nicht den ganzen Zustand der Datenbank speichern, um hereinkommende Blöcke prüfen zu können. Anstatt ihre eigene Lokale Kopie von Ethereums' Zustand zur Verifizierung zu verwenden, nutzen zustandsfreie Clients einen "Zeugen" der Zustandsdaten, die mit dem Block ankommen. Ein Zeuge ist eine Ansammlung von Einzelteilen an Zustandsdaten, die benötigt werden, um bestimmte Transaktionen auszuführen und gleichzeitig ein kryptographischer Beweis das der Zeuge wirklich Teil der ganzen Daten ist. Der Zeuge wird _anstatt_ der Zustandsdatenbank verwendet. Damit dies funktioniert, müssen Zeugen sehr klein sein, so dass sie sicher und rechtzeitig über das Netzwerk verteilt werden können, damit Validatoren sie innerhalb des 12 Sekunden Zeitfensters bearbeiten können. Die momentane Zustandsdatenstruktur ist dafür nicht geeignet, weil Zeugen zu groß sind. Verkle Trees lösen dieses Problem, indem sie kleine Zeugen ermöglichen und damit eines der Hauptprobleme der zustandsfreien Clienten entfernen.

<ExpandableCard title="Warum wollen wir zustandsfreie Clients?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

Ethereum Clients nutzen momentan eine Datenstruktur, die als Patricia Merkle Trie bekannt ist, um ihre Zustandsdaten zu speichern. Informationen über einzelne Accounts sind als Blätter auf der Baumstruktur gespeichert und Paare von Blättern werden wiederholt gehashed, bis nur ein einzelner Hash bleibt. Der endgültige Hash ist bekannt als die "Wurzel". Um Blöcke zu überprüfen, führen Ethereum Clients alle Transaktionen in einem Block aus und aktualisieren ihren lokalen Zustandsbaum. Der Block wird als gültig angesehen, wenn die Wurzel des lokalen Baumes identisch zu der vom Block-Vorschlagenden ist, weil jeder Unterschied in der Berechnung des Block-Vorschlagenden und der überprüfenden Node einen komplett anderen Wurzelhash ergeben würde. Das Problem hierbei ist, dass die Überprüfung der Blockchain erfordert, dass jeder Client den gesamten Zustandsbaum des Kopf-Blocks und mehrere historische Blöcke (der Standard in Geth ist, die Zustandsdaten für 128 Blöcke hinter dem Kopf zu behalten) erfordert. Dies setzt voraus, dass Clients über große Mengen an Speicherplatz verfügen, was wiederum eine Barriere für günstige ressourcenschonende Hardware ist. Eine Lösung hierfür ist ein Update des Zutandsbaumes auf eine effizientere Struktur (Verkle Tree), die Daten effizient über kleine "Zeugen" teilen kann, anstatt den vollständigen Zustand von Ethereum zu übertragen. Den Datenzustand in Verkle Trees umzuschreiben, ist ein großer Schritt hin zu Zustandsfreien Clients.

</ExpandableCard>

## Was ist ein Zeuge und warum brauchen wir sie? {#what-is-a-witness}

Einen Block zu verifizieren bedeutet, die Transaktionen des blockes auszuführen, die Änderungen vollständig in Ethereum's Zustandsbaum zu übertragen und den neuen Wurzelhash zu berechnen. Der berechnete Wurzelhash eines verifizierten Blockes ist identisch zu dem, der mit dem Block geliefert wurde (weil dies bedeutet, dass der Block-Vorschlagende die Berechnung exakt wie der Verifizierende ausgeführt hat). In heutigen Ethereum Clients wird Zugang zum gesamten Zustandsbaum benötigt, der eine große lokal gespeicherte Datenstruktur ist. Ein Zeuge enthält nur Fragmente der Zustandsdaten, die benötigt werden, um die Transaktionen im aktuellen Block auszuführen. Ein Validator kann nur mit diesen Datenfragmenten verifizieren, dass der Block-Vorschlagende die Block-Transaktionen korrekt ausgeführt und den Zustand aktualisiert hat. Dies bedeutet jedoch, dass der Zeuge zwischen Netzwerkteilnehmern des Ethereumnetzwerks schnell genug übertragen werden muss, um innerhalb eines 12 Sekunden Zeitrahmens empfangen und von jeder Node sicher verarbeitet werden zu können. Wenn der Zeuge zu groß ist, könnte das Herunterladen auf manchen Nodes zu lange dauern, so dass diese den Anschluss verlieren könnten. Dies würde Zentralisierung forcieren, da nur Nodes mit sehr schneller Internetverbindung in der Lage wären, erfolgreich bei der Blockvalidierung zu partizipieren. Mit Verkle Trees muss der Zustand nicht mehr auf einem lokalen Speichermedium gespeichert werden; _Alles_ was gebraucht wird, befindet sich im Block selber. Unglücklicherweise sind die Zeugen, die aus Merkle-Bäumen erstellt werden können, viel zu groß, um zustandsfreie Clients zu ermöglichen.

## Warum erlauben Verkle Bäume kleinere Zeugen? {#why-do-verkle-trees-enable-smaller-witnesses}

Die Struktur eines Merkle Trie erzeugt sehr große Zeugen - zu groß, um sicher innerhalb eines 12 Sekunden Zeitfensters innerhalb von Netzwerkteilnehmern übertragen zu werden. Das liegt daran, weil der Zeuge aus einem Daten-verbindenen-Pfad besteht, der von den Blättern zum Wurzelhash gehalten wird. Um die Daten zu verifizieren, ist es notwendig, nicht nur die zwischen-Hashes, die jedes Blatt mit der Wurzel verbinden, zu haben, sondern auch alle Geschwisterknoten. Jeder Knoten im Beweis hat ein Geschwister, mit dem es gehashed ist, um den nächsten Hash hoch am Baum zu erzeugen. Das sind viele Daten. Verkle Trees reduzieren die Größe eines Zeugen, indem sie die Distanz zwischen Blättern des Baumes und ihrer Wurzel reduzieren und zudem Geschwisterknoten zur Verifizierung des Wurzelhashes unnötig machen. Noch mehr Speichereffizienz kann durch die Nutzung von Polynombindungs-Schemata anstatt der Hash-Stil Vectorbindung erreicht werden. Polynombindung erlaubt es Zeugen, eine feste Größe unabhängig der Anzahl der zu beweisenden Blätter zu haben.

In einem Polynombindungs-Schema haben die Zeugen überschaubare Größen, die leicht unter Netzwerkteilnehmern versendet werden können. Dies erlaubt Clients, Zustandsveränderungen in jedem Block mit minimaler Menge an Daten zu verifizieren.

<ExpandableCard title="Exakt wieviel können Verkle Bäume die Zeugengröße reduzieren?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

Die Größe des Zeugen variiert abhängig von der Anzahl der Blätter, die er enthält. Davon ausgehend, dass ein Zeuge 1000 Blätter abdeckt, wäre ein Zeuge für einen Merkle Baum ungefähr 3,5 MB (von 7 Ebenen im Trie ausgehend). Ein Zeuge für die selben Daten in einem Verkle Baum (von 4 Ebenen zum Baum ausgehend) würde ungefähr 150 kB an Daten ergeben -**etwa 23x kleiner**. Diese Reduktion der Zeugengröße wird Zeugen in zustandsfreien Clients ermöglichen, akzeptabel klein zu sein. Polynomzeugen sind 0,128–1 kB groß; abhängig davon, welches spezifische Polynom-Commitment verwendet wird.

</ExpandableCard>

## Wie sieht die Struktur von Verkle Bäumen aus? {#what-is-the-structure-of-a-verkle-tree}

Verkle Bäume sind `(key,value)` Paare, in denen die keys 32-byte Elemente zusammengestellt aus einem 31-byte _stem_ und einem einzelnen byte _suffix_ sind. Diese Schlüssel sind in _extension_ Knoten und _inner_ Knoten organisiert. Erweiterungsknoten repräsentieren einen einzelnen Stamm für 256 Kinder mit verschiedenen Suffixes. Innere-Knoten haben auch 256 Kinder, aber sie können andere Erweiterungsknoten sein. Der Hauptunterschied zwischen Verklebaum- und Merklebaum-Struktur ist, dass der Verkle Baum viel flacher mit weniger Zwischenknoten ist, die das Blatt zur Wurzel verbinden und so insgesamt weniger Daten benötigen, um einen Beweis zu generieren.

![](./verkle.png)

[Lesen Sie mehr üner die Struktur von Verkle Bäumen](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## Aktueller Fortschritt {#current-progress}

Verkle Tree Testnetzwerke laufen bereits, aber es sind noch substantielle Updates der Clients vonnöten, um Verkle Bäume zu unterstützen. Sie können dazu beitragen, den Fortschritt zu beschleunigen, indem Sie Kontrakte in die Testnets einbringen oder Testnet-Clients betreiben.

[Entdecken Sie das Verkle Gen Devnet 2-Testnetz](https://verkle-gen-devnet-2.ethpandaops.io/)

[Sehen Sie sich an, wie Guillaume Ballet das Condrieu Verkle-Testnetz erklärt](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (beachten Sie, dass das Condrieu-Testnetz Proof-of-Work war und durch das Verkle Gen Devnet 2-Testnetz ersetzt wurde).

## Weiterführende Informationen {#further-reading}

- [Verkle Trees für Zustandslosigkeit](https://verkle.info/)
- [Dankrad Feist erklärt Verkle Trees bei PEEPanEIP](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Guillaume Ballet erklärt Verkle Trees bei ETHGlobal](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- ["Wie Verkle Trees Ethereum schlank und super machen" von Guillaume Ballet bei Devcon 6](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam über zustandsfreie Clients bei ETHDenver 2020](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Fiest erklärt Verkle Trees und Zustandslosigkeit im Podcast zu Null-Wissen](https://zeroknowledge.fm/episode-202-stateless-ethereum-verkle-tries-with-dankrad-feist/)
- [Vitalik Buterin über Verkle Trees](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist über Verkle Trees](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [Verkle Trees EIP Dokumentation](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)
