---
title: PeerDAS
description: "Erfahren Sie mehr über PeerDAS als Teil des Fusaka-Ethereum-Protokoll-Upgrades"
lang: de
---

# PeerDAS {#peer-das}

Das Ethereum-Protokoll durchläuft sein bedeutendstes Skalierungs-Upgrade seit der [Einführung von Blob-Transaktionen mit EIP-4844](/roadmap/danksharding/). Als Teil des [Fusaka-Upgrades](/roadmap/fusaka/) führt PeerDAS eine neue Art der Handhabung von Blob-Daten ein, die die Kapazität der **[Datenverfügbarkeit (DA)](/developers/docs/data-availability/)** für L2s um etwa eine Größenordnung erhöht.

[Mehr zur Blob-Skalierungs-Roadmap](https://blog.ethereum.org/2025/08/22/protocol-update-002)

## Skalierbarkeit {#scalability}

Die Vision von Ethereum ist es, eine neutrale, sichere und dezentrale Plattform zu sein, die für jeden auf der Welt verfügbar ist. Mit zunehmender Netzwerknutzung erfordert dies, das Trilemma aus Skalierung, Sicherheit und Dezentralisierung des Netzwerks auszubalancieren. Wenn Ethereum die vom Netzwerk verarbeitete Datenmenge im Rahmen seines aktuellen Designs einfach erhöhen würde, bestünde die Gefahr, die [Nodes, auf die sich Ethereum für seine Dezentralisierung stützt](/developers/docs/nodes-and-clients/), zu überlasten. Skalierbarkeit erfordert ein rigoroses Mechanismusdesign, das Kompromisse minimiert.

Eine der Strategien zur Erreichung dieses Ziels besteht darin, ein vielfältiges Ökosystem von Layer-2-Skalierungslösungen zu ermöglichen, anstatt alle Transaktionen im [Layer-1 (L1)](/glossary/#layer-1)-Mainnet zu verarbeiten. [Layer 2s (L2s)](/glossary/#layer-2) oder [Rollups](/glossary#rollups) verarbeiten Transaktionen auf ihren eigenen separaten Ketten und nutzen Ethereum zur Verifizierung und Sicherheit. Die Veröffentlichung von ausschließlich sicherheitskritischen Commitments und die Komprimierung von Payloads ermöglichen es L2s, die DA-Kapazität von Ethereum effizienter zu nutzen. Im Gegenzug überträgt L1 weniger Daten, ohne die Sicherheitsgarantien zu beeinträchtigen, während L2s mehr Benutzer zu geringeren Gaskosten onboarden. Anfänglich veröffentlichten L2s Daten als `calldata` in gewöhnlichen Transaktionen, die mit L1-Transaktionen um Gas konkurrierten und für massenhafte Datenverfügbarkeit unpraktisch waren.

## Proto-Danksharding {#proto-danksharding}

Der erste große Schritt zur Skalierung von L2 war das Dencun-Upgrade, mit dem [Proto-Danksharding](/roadmap/danksharding/) (EIP-4844) eingeführt wurde. Dieses Upgrade schuf einen neuen, spezialisierten Datentyp für Rollups, die sogenannten Blobs. [Blobs](/developers/docs/data-availability/blockchain-data-storage-strategies/#eip-4844-blobs), oder Binary Large Objects, sind ephemere Teile beliebiger Daten, die keine EVM-Ausführung benötigen und die von Nodes nur für eine begrenzte Zeit gespeichert werden. Diese effizientere Verarbeitung ermöglichte es L2s, mehr Daten auf Ethereum zu veröffentlichen und noch weiter zu skalieren.

Obwohl die Verwendung von Blobs bereits große Vorteile für die Skalierung hat, ist sie nur ein Teil des Endziels. Im aktuellen Protokoll muss jeder Node im Netzwerk immer noch jeden Blob herunterladen. Der Engpass wird die von einzelnen Nodes benötigte Bandbreite, wobei die Menge der herunterzuladenden Daten mit steigender Anzahl von Blobs direkt zunimmt.

Ethereum macht keine Kompromisse bei der Dezentralisierung, und die Bandbreite ist eine der empfindlichsten Stellschrauben. Selbst bei leistungsstarken Computern, die für jeden erschwinglich und weithin verfügbar sind, könnten [Beschränkungen der Upload-Bandbreite](https://www.speedtest.net/global-index) selbst in stark urbanisierten Städten in Industrieländern (wie [Deutschland](https://www.speedtest.net/global-index/germany), [Belgien](https://www.speedtest.net/global-index/belgium), [Australien](https://www.speedtest.net/global-index/australia) oder den [Vereinigten Staaten](https://www.speedtest.net/global-index/united-states)) Nodes darauf beschränken, nur in Rechenzentren betrieben werden zu können, wenn die Bandbreitenanforderungen nicht sorgfältig abgestimmt werden.

Node-Betreiber haben mit zunehmender Anzahl von Blobs immer höhere Anforderungen an Bandbreite und Speicherplatz. Die Größe und Menge der Blobs werden durch diese Einschränkungen begrenzt. Jeder Blob kann bis zu 128 KB Daten transportieren, bei einem Durchschnitt von 6 Blobs pro Block. Dies war nur der erste Schritt hin zu einem zukünftigen Design, das Blobs noch effizienter nutzt.

## Datenverfügbarkeits-Sampling {#das}

[Datenverfügbarkeit](/developers/docs/data-availability/) ist die Garantie, dass alle Daten, die zur unabhängigen Validierung der Kette benötigt werden, für alle Netzwerkteilnehmer zugänglich sind. Sie stellt sicher, dass die Daten vollständig veröffentlicht wurden und dazu verwendet werden können, den neuen Zustand der Kette oder eingehende Transaktionen vertrauenslos zu verifizieren.

Ethereum-Blobs bieten eine starke Datenverfügbarkeitsgarantie, die die Sicherheit von L2s gewährleistet. Dazu müssen Ethereum-Nodes Blobs in ihrer Gesamtheit herunterladen und speichern. Aber was wäre, wenn wir Blobs im Netzwerk effizienter verteilen und diese Einschränkung vermeiden könnten?

Ein anderer Ansatz zur Speicherung der Daten und zur Gewährleistung ihrer Verfügbarkeit ist das **Datenverfügbarkeits-Sampling (DAS)**. Anstatt dass jeder Computer, auf dem Ethereum läuft, jeden einzelnen Blob vollständig speichert, führt DAS eine dezentrale Arbeitsteilung ein. Es bricht die Last der Datenverarbeitung auf, indem es kleinere, überschaubare Aufgaben über das gesamte Netzwerk von Nodes verteilt. Blobs werden in Stücke aufgeteilt und jeder Node lädt nur wenige Stücke herunter, wobei ein Mechanismus zur gleichmäßigen Zufallsverteilung über alle Nodes verwendet wird.

Dies führt zu einem neuen Problem – dem Nachweis der Verfügbarkeit und Integrität der Daten. Wie kann das Netzwerk garantieren, dass die Daten verfügbar und vollständig korrekt sind, wenn einzelne Nodes nur kleine Teile davon halten? Ein böswilliger Node könnte gefälschte Daten bereitstellen und die starken Garantien für die Datenverfügbarkeit leicht durchbrechen! Hier kommt die Kryptographie zur Hilfe.

Um die Integrität der Daten zu gewährleisten, wurde EIP-4844 bereits mit KZG-Commitments implementiert. Dies sind kryptografische Beweise, die erstellt werden, wenn ein neuer Blob zum Netzwerk hinzugefügt wird. Ein kleiner Beweis ist in jedem Block enthalten, und Nodes können überprüfen, ob die empfangenen Blobs dem KZG-Commitment des Blocks entsprechen.

DAS ist ein Mechanismus, der darauf aufbaut und sicherstellt, dass die Daten sowohl korrekt als auch verfügbar sind. Sampling ist ein Prozess, bei dem ein Node nur einen kleinen Teil der Daten abfragt und ihn mit dem Commitment vergleicht. KZG ist ein Polynom-Commitment-Schema, was bedeutet, dass jeder einzelne Punkt auf der Polynomkurve verifiziert werden kann. Durch die Überprüfung von nur wenigen Punkten auf dem Polynom kann der Client, der das Sampling durchführt, eine starke probabilistische Garantie haben, dass die Daten verfügbar sind.

## PeerDAS {#peer-das}

[PeerDAS (EIP-7594)](https://eips.ethereum.org/EIPS/eip-7594) ist ein spezifischer Vorschlag, der den DAS-Mechanismus in Ethereum implementiert und wahrscheinlich das größte Upgrade seit The Merge darstellt. PeerDAS ist darauf ausgelegt, Blob-Daten zu erweitern, indem es sie in Spalten aufteilt und eine Teilmenge an Nodes verteilt.

Ethereum bedient sich dafür einer cleveren Mathematik: Es wendet Erasure Coding im Reed-Solomon-Stil auf Blob-Daten an. Blob-Daten werden als Polynom dargestellt, dessen Koeffizienten die Daten kodieren, dann wird dieses Polynom an zusätzlichen Punkten ausgewertet, um einen erweiterten Blob zu erzeugen, wodurch sich die Anzahl der Auswertungen verdoppelt. Diese zusätzliche Redundanz ermöglicht die Erasure Recovery: Selbst wenn einige Auswertungen fehlen, kann der ursprüngliche Blob rekonstruiert werden, solange mindestens die Hälfte der Gesamtdaten, einschließlich der erweiterten Teile, verfügbar ist.

![Erweitertes Polynom](./polynomial.png)

In der Realität hat dieses Polynom Tausende von Koeffizienten. KZG-Commitments sind Werte von wenigen Bytes, so etwas wie ein Hash, der allen Nodes bekannt ist. Jeder Node, der genügend Datenpunkte besitzt, kann [effizient einen vollständigen Satz von Blob-Daten rekonstruieren](https://arxiv.org/abs/2207.11079).

> Wissenswertes: Dieselbe Kodierungstechnik wurde bei DVDs verwendet. Wenn man eine DVD zerkratzte, konnte der Player sie dank der Reed-Solomon-Kodierung, die fehlende Teile des Polynoms hinzufügt, immer noch lesen.

In der Vergangenheit wurden Daten in Blockchains, seien es Blöcke oder Blobs, an alle Nodes übertragen. Mit dem Split-and-Sample-Ansatz von PeerDAS ist es nicht mehr notwendig, alles an jeden zu übertragen. Nach Fusaka ist das Networking der Konsens-Layer in Gossip-Themen/Subnetze organisiert: Blob-Spalten werden bestimmten Subnetzen zugewiesen, und jeder Node abonniert eine vorbestimmte Teilmenge und verwahrt nur diese Teile.

Mit PeerDAS werden erweiterte Blob-Daten in 128 Teile, sogenannte Spalten, unterteilt. Die Daten werden über ein dediziertes Gossip-Protokoll auf bestimmten Subnetzen, die sie abonnieren, an diese Nodes verteilt. Jeder reguläre Node im Netzwerk nimmt an mindestens 8 zufällig ausgewählten Spalten-Subnetzen teil. Der Empfang von Daten von nur 8 der 128 Subnetze bedeutet, dass dieser Standard-Node nur 1/16 aller Daten empfängt, aber da die Daten erweitert wurden, entspricht dies 1/8 der ursprünglichen Daten.

Dies ermöglicht eine neue theoretische Skalierungsgrenze von 8x des aktuellen „Jeder lädt alles herunter“-Schemas. Da Nodes unterschiedliche zufällige Subnetze abonnieren, die Blob-Spalten bereitstellen, ist die Wahrscheinlichkeit sehr hoch, dass sie gleichmäßig verteilt sind und daher jedes Datenteil irgendwo im Netzwerk existiert. Nodes, die Validatoren betreiben, müssen mit jedem betriebenen Validator weitere Subnetze abonnieren.

> Jeder Node hat eine eindeutige, zufällig generierte ID; sie dient normalerweise als seine öffentliche Identität für Verbindungen. In PeerDAS wird diese Nummer verwendet, um die zufällige Menge von Subnetzen zu bestimmen, die er abonnieren muss, was zu einer gleichmäßigen zufälligen Verteilung aller Blob-Daten führt.

Sobald ein Node die ursprünglichen Daten erfolgreich rekonstruiert hat, verteilt er die wiederhergestellten Spalten zurück ins Netzwerk, schließt aktiv alle Datenlücken und verbessert die allgemeine Systemresilienz. Nodes, die mit Validatoren mit einem kombinierten Guthaben von ≥4096 ETH verbunden sind, müssen ein Supernode sein und daher alle Datenspalten-Subnetze abonnieren und alle Spalten verwahren. Diese Supernodes werden kontinuierlich Datenlücken schließen. Die probabilistisch selbstheilende Natur des Protokolls ermöglicht starke Verfügbarkeitsgarantien, ohne Home-Betreiber einzuschränken, die nur Teile der Daten halten.

![Nodes, die Spalten abonnieren, die über Subnetze verteilt werden](./subnets.png)

Die Datenverfügbarkeit kann von jedem Node, der nur eine kleine Teilmenge der Blob-Daten hält, dank des oben beschriebenen Sampling-Mechanismus bestätigt werden. Diese Verfügbarkeit wird durchgesetzt: Validatoren müssen neuen Fork-Choice-Regeln folgen, was bedeutet, dass sie Blöcke erst akzeptieren und für sie stimmen, nachdem sie die Verfügbarkeit der Daten überprüft haben.

Die direkten Auswirkungen auf die Benutzer (insbesondere L2-Benutzer) sind niedrigere Gebühren. Mit 8x mehr Platz für Rollup-Daten werden Benutzeroperationen auf ihrer Kette mit der Zeit noch günstiger. Aber niedrigere Gebühren nach Fusaka werden Zeit brauchen und von BPOs abhängen.

## Blob-Parameter-Only (BPOs) {#bpo}

Das Netzwerk wird theoretisch in der Lage sein, 8x mehr Blobs zu verarbeiten, aber die Erhöhung der Blobs ist eine Änderung, die ordnungsgemäß getestet und sicher schrittweise durchgeführt werden muss. Testnetze geben genügend Vertrauen, um die Funktionen auf dem Mainnet einzusetzen, aber wir müssen die Stabilität des P2P-Netzwerks sicherstellen, bevor wir eine signifikant höhere Anzahl von Blobs ermöglichen.

Um die Zielanzahl der Blobs pro Block schrittweise zu erhöhen, ohne das Netzwerk zu überlasten, führt Fusaka **[Blob-Parameter-Only (BPO)](https://ethereum-magicians.org/t/blob-parameter-only-bpo-forks/22623)**-Forks ein. Im Gegensatz zu regulären Forks, die eine breite Koordination des Ökosystems, Zustimmung und Software-Updates erfordern, sind [BPOs (EIP-7892)](https://eips.ethereum.org/EIPS/eip-7892) vorprogrammierte Upgrades, die die maximale Anzahl von Blobs im Laufe der Zeit ohne Eingriff erhöhen.

Das bedeutet, dass unmittelbar nach der Aktivierung von Fusaka und dem Live-Gang von PeerDAS die Anzahl der Blobs unverändert bleibt. Die Anzahl der Blobs wird sich alle paar Wochen verdoppeln, bis sie ein Maximum von 48 erreicht, während Entwickler überwachen, um sicherzustellen, dass der Mechanismus wie erwartet funktioniert und keine nachteiligen Auswirkungen auf die Nodes hat, die das Netzwerk betreiben.

## Zukünftige Richtungen {#future-directions}

PeerDAS ist nur ein Schritt [in Richtung einer größeren Skalierungsvision von FullDAS](https://ethresear.ch/t/fulldas-towards-massive-scalability-with-32mb-blocks-and-beyond/19529) oder Danksharding. Während PeerDAS 1D-Erasure-Coding auf jeden Blob einzeln anwendet, wird Full Danksharding ein vollständigeres 2D-Erasure-Coding-Schema über die gesamte Matrix der Blob-Daten verwenden. Die Erweiterung von Daten in zwei Dimensionen schafft noch stärkere Redundanzeigenschaften und eine effizientere Rekonstruktion und Verifizierung. Die Realisierung von FullDAS wird erhebliche Netzwerk- und Protokolloptimierungen sowie zusätzliche Forschung erfordern.

## Weiterführende Lektüre {#further-reading}

- [PeerDAS: Peer Data Availability sampling von Francesco D'Amato](https://www.youtube.com/watch?v=WOdpO1tH_Us)
- [A Documentation of Ethereum’s PeerDAS](https://eprint.iacr.org/2024/1362.pdf)
- [Proving the Security of PeerDAS without the AGM](https://eprint.iacr.org/2025/1683)
- [Vitalik über PeerDAS, seine Auswirkungen und das Testen von Fusaka](https://x.com/VitalikButerin/status/1970983281090085200)