---
title: PeerDAS
description: "Erfahren Sie mehr über PeerDAS als Teil des Fusaka-Upgrades des Ethereum-Protokolls"
lang: de
---

# PeerDAS {#peer-das}

Das [Ethereum](/)-Protokoll durchläuft sein bedeutendstes Skalierungs-Upgrade seit der [Einführung von Blob-Transaktionen mit EIP-4844](/roadmap/danksharding/). Als Teil des [Fusaka-Upgrades](/roadmap/fusaka/) führt PeerDAS eine neue Methode zur Handhabung von Blob-Daten ein, die eine etwa um eine Größenordnung höhere Kapazität der **[Datenverfügbarkeit (DA)](/developers/docs/data-availability/)** für L2s liefert.

[Mehr zur Blob-Skalierungs-Roadmap](https://blog.ethereum.org/2025/08/22/protocol-update-002)

## Skalierbarkeit {#scalability}

Die Vision von Ethereum ist es, eine neutrale, sichere und dezentralisierte Plattform zu sein, die für jeden auf der Welt verfügbar ist. Da die Nutzung des Netzwerks wächst, erfordert dies ein Ausbalancieren des Trilemmas aus Skalierung, Sicherheit und Dezentralisierung des Netzwerks. Wenn Ethereum einfach die vom Netzwerk verarbeiteten Daten innerhalb seines aktuellen Designs erhöhen würde, bestünde die Gefahr, die [Blockchain-Knoten, auf die sich Ethereum für seine Dezentralisierung verlässt](/developers/docs/nodes-and-clients/), zu überlasten. Skalierbarkeit erfordert ein rigoroses Mechanismus-Design, das Kompromisse minimiert.

Eine der Strategien zur Erreichung dieses Ziels besteht darin, ein vielfältiges Ökosystem von Ebene-2-Skalierungslösungen zu ermöglichen, anstatt alle Transaktionen auf dem [Ebene 1 (L1)](/glossary/#layer-1) Mainnet zu verarbeiten. [Ebene 2s (L2s)](/glossary/#layer-2) oder [Rollups](/glossary#rollups) verarbeiten Transaktionen auf ihren eigenen separaten Ketten und nutzen Ethereum für Verifizierung und Sicherheit. Durch die Veröffentlichung nur sicherheitskritischer Commitments und die Komprimierung von Payloads können L2s die DA-Kapazität (Datenverfügbarkeit) von Ethereum effizienter nutzen. Im Gegenzug trägt L1 weniger Daten, ohne Sicherheitsgarantien zu beeinträchtigen, während L2s mehr Benutzer zu niedrigeren Gaskosten aufnehmen. Anfänglich veröffentlichten L2s Daten als `calldata` in gewöhnlichen Transaktionen, was mit L1-Transaktionen um Gas konkurrierte und für massenhafte Datenverfügbarkeit unpraktisch war.

## Proto-Danksharding {#proto-danksharding}

Der erste große Schritt zur Skalierung von L2 war das Dencun-Upgrade, das [Proto-Danksharding](/roadmap/danksharding/) (EIP-4844) einführte. Dieses Upgrade schuf einen neuen, spezialisierten Datentyp für Rollups namens Blobs. [Blobs](/developers/docs/data-availability/blockchain-data-storage-strategies/#eip-4844-blobs) (Binary Large Objects) sind flüchtige Stücke beliebiger Daten, die keine EVM-Ausführung benötigen und die Blockchain-Knoten nur für eine begrenzte Zeit speichern. Diese effizientere Verarbeitung ermöglichte es L2s, mehr Daten auf Ethereum zu veröffentlichen und noch weiter zu skalieren. 

Obwohl die Verwendung von Blobs bereits starke Vorteile für die Skalierung bietet, ist sie nur ein Teil des Endziels. Im aktuellen Protokoll muss jeder Blockchain-Knoten im Netzwerk immer noch jeden Blob herunterladen. Der Flaschenhals wird die von einzelnen Blockchain-Knoten benötigte Bandbreite, wobei die Datenmenge, die heruntergeladen werden muss, direkt mit höheren Blob-Anzahlen steigt. 

Ethereum geht bei der Dezentralisierung keine Kompromisse ein, und die Bandbreite ist einer der empfindlichsten Stellhebel. Selbst wenn leistungsstarke Computer für jeden, der sie sich leisten kann, weithin verfügbar sind, könnten [Einschränkungen der Upload-Bandbreite](https://www.speedtest.net/global-index) selbst in stark städtischen Gebieten in Industrienationen (wie [Deutschland](https://www.speedtest.net/global-index/germany), [Belgien](https://www.speedtest.net/global-index/belgium), [Australien](https://www.speedtest.net/global-index/australia) oder den [Vereinigten Staaten](https://www.speedtest.net/global-index/united-states)) Blockchain-Knoten darauf beschränken, nur aus Rechenzentren betrieben werden zu können, wenn die Bandbreitenanforderungen nicht sorgfältig abgestimmt sind.

Betreiber von Blockchain-Knoten haben mit zunehmenden Blobs immer höhere Anforderungen an Bandbreite und Speicherplatz. Die Größe und Menge der Blobs sind durch diese Einschränkungen begrenzt. Jeder Blob kann bis zu 128 kb Daten tragen, mit einem Durchschnitt von 6 Blobs pro Block. Dies war nur der erste Schritt in Richtung eines zukünftigen Designs, das Blobs auf noch effizientere Weise nutzt.

## Data Availability Sampling (Datenverfügbarkeits-Sampling) {#das}

[Datenverfügbarkeit](/developers/docs/data-availability/) ist die Garantie, dass alle Daten, die zur unabhängigen Validierung der Chain benötigt werden, für alle Netzwerkteilnehmer zugänglich sind. Sie stellt sicher, dass die Daten vollständig veröffentlicht wurden und verwendet werden können, um den neuen Zustand der Chain oder eingehende Transaktionen vertrauenslos zu verifizieren. 

Ethereum-Blobs bieten eine starke Garantie für die Datenverfügbarkeit, die die Sicherheit von L2s gewährleistet. Um dies zu tun, müssen Ethereum-Blockchain-Knoten Blobs in ihrer Gesamtheit herunterladen und speichern. Aber was wäre, wenn wir Blobs im Netzwerk effizienter verteilen und diese Einschränkung vermeiden könnten? 

Ein anderer Ansatz zur Speicherung der Daten und zur Sicherstellung ihrer Verfügbarkeit ist das **Datenverfügbarkeits-Sampling (Data Availability Sampling, DAS)**. Anstatt dass jeder Computer, auf dem Ethereum läuft, jeden einzelnen Blob vollständig speichert, führt DAS eine dezentralisierte Arbeitsteilung ein. Es verringert die Last der Datenverarbeitung, indem es kleinere, überschaubare Aufgaben über das gesamte Netzwerk von Blockchain-Knoten verteilt. Blobs werden in Teile zerlegt und jeder Blockchain-Knoten lädt nur wenige Teile herunter, wobei ein Mechanismus zur gleichmäßigen zufälligen Verteilung über alle Blockchain-Knoten verwendet wird. 

Dies führt zu einem neuen Problem – dem Nachweis der Verfügbarkeit und Integrität der Daten. Wie kann das Netzwerk garantieren, dass die Daten verfügbar und alle korrekt sind, wenn einzelne Blockchain-Knoten nur kleine Teile halten? Ein bösartiger Blockchain-Knoten könnte gefälschte Daten liefern und starke Garantien für die Datenverfügbarkeit leicht brechen! Hier kommt die Kryptografie zur Hilfe. 

Um die Integrität der Daten sicherzustellen, wurde EIP-4844 bereits mit KZG-Commitments implementiert. Dies sind kryptografische Nachweise, die erstellt werden, wenn ein neuer Blob zum Netzwerk hinzugefügt wird. Ein kleiner Nachweis ist in jedem Block enthalten, und Blockchain-Knoten können verifizieren, dass empfangene Blobs dem KZG-Commitment des Blocks entsprechen.

DAS ist ein Mechanismus, der darauf aufbaut und sicherstellt, dass die Daten sowohl korrekt als auch verfügbar sind. Sampling ist ein Prozess, bei dem ein Blockchain-Knoten nur einen kleinen Teil der Daten abfragt und ihn gegen das Commitment verifiziert. KZG ist ein polynomielles Commitment-Schema, was bedeutet, dass jeder einzelne Punkt auf der Polynomkurve verifiziert werden kann. Durch die Überprüfung von nur ein paar Punkten auf dem Polynom kann die Anwendung, die das Sampling durchführt, eine starke probabilistische Garantie haben, dass die Daten verfügbar sind. 

## PeerDAS {#peer-das}

[PeerDAS (EIP-7594)](https://eips.ethereum.org/EIPS/eip-7594) ist ein spezifischer Vorschlag, der den DAS-Mechanismus in Ethereum implementiert und wahrscheinlich das größte Upgrade seit The Merge markiert. PeerDAS ist darauf ausgelegt, Blob-Daten zu erweitern, sie in Spalten zu unterteilen und eine Teilmenge an Blockchain-Knoten zu verteilen.

Ethereum leiht sich dafür etwas clevere Mathematik: Es wendet Erasure Coding (Löschungscodierung) im Reed-Solomon-Stil auf Blob-Daten an. Blob-Daten werden als Polynom dargestellt, dessen Koeffizienten die Daten kodieren. Dann wird dieses Polynom an zusätzlichen Punkten ausgewertet, um einen erweiterten Blob zu erstellen, was die Anzahl der Auswertungen verdoppelt. Diese hinzugefügte Redundanz ermöglicht die Wiederherstellung bei Löschungen: Selbst wenn einige Auswertungen fehlen, kann der ursprüngliche Blob rekonstruiert werden, solange mindestens die Hälfte der gesamten Daten, einschließlich der erweiterten Teile, verfügbar ist.

![Erweitertes Polynom](./polynomial.png)

In der Realität hat dieses Polynom Tausende von Koeffizienten. KZG-Commits sind Werte von wenigen Bytes, so etwas wie ein Hash, der allen Blockchain-Knoten bekannt ist. Jeder Blockchain-Knoten, der genügend Datenpunkte hält, kann [einen vollständigen Satz von Blob-Daten effizient rekonstruieren](https://arxiv.org/abs/2207.11079). 

> Fun Fact: Dieselbe Codierungstechnik wurde bei DVDs verwendet. Wenn Sie eine DVD zerkratzt haben, konnte der Player sie dank der Reed-Solomon-Codierung, die fehlende Teile des Polynoms hinzufügt, immer noch lesen. 

Historisch gesehen wurden Daten in Blockchains, ob Blöcke oder Blobs, an alle Blockchain-Knoten gesendet. Mit dem Split-and-Sample-Ansatz von PeerDAS ist es nicht mehr notwendig, alles an jeden zu senden. Nach Fusaka ist das Netzwerk der Konsensebene in Gossip-Themen/Subnetze organisiert: Blob-Spalten werden bestimmten Subnetzen zugewiesen, und jeder Blockchain-Knoten abonniert eine vorher festgelegte Teilmenge und verwahrt nur diese Teile.

Mit PeerDAS werden erweiterte Blob-Daten in 128 Teile, sogenannte Spalten, unterteilt. Die Daten werden über ein dediziertes Gossip-Protokoll in bestimmten Subnetzen, die sie abonnieren, an diese Blockchain-Knoten verteilt. Jeder reguläre Blockchain-Knoten im Netzwerk nimmt an mindestens 8 zufällig ausgewählten Spalten-Subnetzen teil. Der Empfang von Daten aus nur 8 von 128 Subnetzen bedeutet, dass dieser Standard-Blockchain-Knoten nur 1/16 aller Daten empfängt, aber da die Daten erweitert wurden, entspricht dies 1/8 der ursprünglichen Daten. 

Dies ermöglicht ein neues theoretisches Skalierungslimit, das 8-mal so hoch ist wie das aktuelle „Jeder lädt alles herunter“-Schema. Da Blockchain-Knoten verschiedene zufällige Subnetze abonnieren, die Blob-Spalten bedienen, ist die Wahrscheinlichkeit sehr hoch, dass sie gleichmäßig verteilt sind und daher jedes Datenstück irgendwo im Netzwerk existiert. Blockchain-Knoten, die Validatoren ausführen, müssen mit jedem Validator, den sie ausführen, mehr Subnetze abonnieren.

> Jeder Blockchain-Knoten hat eine eindeutige, zufällig generierte ID, die normalerweise als seine öffentliche Identität für Verbindungen dient. In PeerDAS wird diese Nummer verwendet, um zufällige Subnetze zu bestimmen, die er abonnieren muss, was zu einer gleichmäßigen zufälligen Verteilung aller Blob-Daten führt.

Sobald ein Blockchain-Knoten die ursprünglichen Daten erfolgreich rekonstruiert hat, verteilt er die wiederhergestellten Spalten zurück in das Netzwerk, heilt aktiv alle Datenlücken und verbessert die allgemeine Systemresilienz. Blockchain-Knoten, die mit Validatoren mit einem kombinierten Guthaben von ≥4096 ETH verbunden sind, müssen ein Supernode sein und daher alle Datenspalten-Subnetze abonnieren und alle Spalten verwahren. Diese Supernodes werden kontinuierlich Datenlücken heilen. Die probabilistisch selbstheilende Natur des Protokolls ermöglicht starke Verfügbarkeitsgarantien, ohne Heimbetreiber einzuschränken, die nur Teile der Daten halten. 

![Blockchain-Knoten, die Spalten abonnieren, die über Subnetze verteilt werden](./subnets.png)

Die Datenverfügbarkeit kann von jedem Blockchain-Knoten bestätigt werden, der nur eine kleine Teilmenge der Blob-Daten hält, dank des oben beschriebenen Sampling-Mechanismus. Diese Verfügbarkeit wird erzwungen: Validatoren müssen neuen Fork-Choice-Regeln folgen, was bedeutet, dass sie Blöcke nur akzeptieren und für sie abstimmen, nachdem sie die Verfügbarkeit der Daten verifiziert haben.

Die direkte Auswirkung auf Benutzer (insbesondere L2-Benutzer) sind niedrigere Gebühren. Mit 8-mal mehr Platz für Rollup-Daten werden Benutzeroperationen auf ihrer Chain mit der Zeit noch günstiger. Aber niedrigere Gebühren nach Fusaka werden Zeit brauchen und von BPOs abhängen.

## Blob-Parameter-Only (BPOs) {#bpo}

Das Netzwerk wird theoretisch in der Lage sein, 8-mal mehr Blobs zu verarbeiten, aber Blob-Erhöhungen sind eine Änderung, die ordnungsgemäß getestet und sicher schrittweise ausgeführt werden muss. Testnets bieten genug Vertrauen, um die Funktionen im Mainnet bereitzustellen, aber wir müssen die Stabilität des P2P-Netzwerks sicherstellen, bevor wir eine deutlich höhere Anzahl von Blobs aktivieren. 

Um die Zielanzahl von Blobs pro Block schrittweise zu erhöhen, ohne das Netzwerk zu überlasten, führt Fusaka **[Blob-Parameter-Only (BPO)](https://ethereum-magicians.org/t/blob-parameter-only-bpo-forks/22623)**-Forks ein. Im Gegensatz zu regulären Forks, die eine breite Koordination im Ökosystem, Zustimmung und Software-Updates erfordern, sind [BPOs (EIP-7892)](https://eips.ethereum.org/EIPS/eip-7892) vorprogrammierte Upgrades, die die maximale Anzahl von Blobs im Laufe der Zeit ohne Eingreifen erhöhen.

Das bedeutet, dass unmittelbar nach der Aktivierung von Fusaka und dem Livegang von PeerDAS die Anzahl der Blobs unverändert bleibt. Die Anzahl der Blobs wird sich alle paar Wochen verdoppeln, bis sie ein Maximum von 48 erreicht, während Entwickler überwachen, um sicherzustellen, dass der Mechanismus wie erwartet funktioniert und keine nachteiligen Auswirkungen auf die Blockchain-Knoten hat, die das Netzwerk betreiben.

## Zukünftige Richtungen {#future-directions}

PeerDAS ist nur ein Schritt [in Richtung einer größeren Skalierungsvision von FullDAS](https://ethresear.ch/t/fulldas-towards-massive-scalability-with-32mb-blocks-and-beyond/19529) oder Danksharding. Während PeerDAS 1D-Erasure-Coding für jeden Blob einzeln verwendet, wird vollständiges Danksharding ein umfassenderes 2D-Erasure-Coding-Schema über die gesamte Matrix der Blob-Daten verwenden. Die Erweiterung von Daten in zwei Dimensionen schafft noch stärkere Redundanzeigenschaften und eine effizientere Rekonstruktion und Verifizierung. Die Realisierung von FullDAS wird erhebliche Netzwerk- und Protokolloptimierungen sowie zusätzliche Forschung erfordern.

## Weiterführende Literatur {#further-reading}

- [PeerDAS: Peer Data Availability sampling von Francesco D'Amato](https://www.youtube.com/watch?v=WOdpO1tH_Us)
- [A Documentation of Ethereum’s PeerDAS](https://eprint.iacr.org/2024/1362.pdf)
- [Proving the Security of PeerDAS without the AGM](https://eprint.iacr.org/2025/1683)
- [Vitalik über PeerDAS, seine Auswirkungen und das Testen von Fusaka](https://x.com/VitalikButerin/status/1970983281090085200)