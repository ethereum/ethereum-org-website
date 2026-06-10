---
title: Cancun-Deneb (Dencun)
metaTitle: Cancun-Deneb (Dencun) FAQ
description: Häufig gestellte Fragen zum Cancun-Deneb (Dencun) Netzwerk-Upgrade
lang: de
---

Cancun-Deneb (Dencun) ist ein Upgrade für das Ethereum-Netzwerk, das **Proto-Danksharding (EIP-4844)** aktiviert und temporäre Daten-**Blobs** für günstigeren [Layer 2 (L2)](/glossary/#layer-2)-Rollup-Speicher einführt.

Ein neuer Transaktionstyp ermöglicht es Rollup-Anbietern, Daten kostengünstiger in sogenannten „Blobs“ zu speichern. Es wird garantiert, dass Blobs dem Netzwerk für etwa 18 Tage (genauer gesagt 4096 [Epochen](/glossary/#epoch)) zur Verfügung stehen. Nach diesem Zeitraum werden Blobs aus dem Netzwerk entfernt, aber Anwendungen können die Gültigkeit ihrer Daten weiterhin mithilfe von Proofs überprüfen. 

Dies reduziert die Kosten von Rollups erheblich, begrenzt das Chain-Wachstum und hilft dabei, mehr Benutzer zu unterstützen, während die Sicherheit und eine dezentrale Gruppe von Knotenbetreibern erhalten bleiben.

## Wann können wir erwarten, dass Rollups aufgrund von Proto-Danksharding niedrigere Gebühren aufweisen? {#when}

- Dieses Upgrade wurde in Epoche 269568 am **13. März 2024 um 13:55 Uhr (UTC)** aktiviert.
- Alle großen Rollup-Anbieter wie Arbitrum oder Optimism haben signalisiert, dass Blobs unmittelbar nach dem Upgrade unterstützt werden.
- Der Zeitplan für die Unterstützung einzelner Rollups kann variieren, da jeder Anbieter seine Systeme aktualisieren muss, um den neuen Blob-Speicherplatz zu nutzen.

## Wie kann ETH nach dem Hard Fork konvertiert werden? {#scam-alert}

- **Keine Aktion für Ihre ETH erforderlich**: Nach dem Ethereum Dencun-Upgrade müssen Sie Ihre ETH nicht konvertieren oder aktualisieren. Ihre Kontostände bleiben gleich und die ETH, die Sie derzeit halten, bleiben nach dem Hard Fork in ihrer bestehenden Form zugänglich.
- **Vorsicht vor Betrug!** <Emoji text="⚠️" /> jeder, der Sie anweist, Ihre ETH zu „aktualisieren“, versucht, Sie zu betrügen.** Sie müssen im Zusammenhang mit diesem Upgrade nichts tun. Ihre Vermögenswerte bleiben völlig unberührt. Denken Sie daran: Informiert zu bleiben ist der beste Schutz vor Betrug.

[Mehr zum Erkennen und Vermeiden von Betrug](/security/)

## Welches Problem löst das Dencun-Netzwerk-Upgrade? {#network-impact}

Dencun befasst sich in erster Linie mit der **Skalierbarkeit** (Verarbeitung von mehr Benutzern und mehr Transaktionen) bei **erschwinglichen Gebühren**, während die **Dezentralisierung** des Netzwerks aufrechterhalten wird.

Die Ethereum-Community verfolgt bei ihrem Wachstum einen „Rollup-zentrierten“ Ansatz, bei dem Layer-2-Rollups das primäre Mittel sind, um mehr Benutzer sicher zu unterstützen.

Rollup-Netzwerke übernehmen die _Verarbeitung_ (oder „Ausführung“) von Transaktionen getrennt vom Mainnet und veröffentlichen dann einen kryptografischen Proof und/oder komprimierte Transaktionsdaten der Ergebnisse zur Aufzeichnung zurück an das Mainnet. Das Speichern dieser Proofs ist mit Kosten verbunden (in Form von [Gas](/glossary/#gas)), die vor Proto-Danksharding dauerhaft von allen Netzwerkknotenbetreibern gespeichert werden mussten, was es zu einer teuren Aufgabe machte.

Die Einführung von Proto-Danksharding im Dencun-Upgrade fügt einen günstigeren Datenspeicher für diese Proofs hinzu, indem Knotenbetreiber diese Daten nur für etwa 18 Tage speichern müssen. Danach können die Daten sicher entfernt werden, um eine Ausweitung der Hardwareanforderungen zu verhindern. Da Rollups in der Regel eine Abhebungsfrist von 7 Tagen haben, bleibt ihr Sicherheitsmodell unverändert, solange Blobs für diese Dauer auf L1 verfügbar sind. Das 18-tägige Bereinigungsfenster bietet einen erheblichen Puffer für diesen Zeitraum.

[Mehr zur Skalierung von Ethereum](/roadmap/scaling/)

## Wie wird auf alte Blob-Daten zugegriffen? {#historical-access}

Während reguläre Ethereum-Knoten immer den _aktuellen Zustand_ des Netzwerks speichern, können historische Blob-Daten etwa 18 Tage nach ihrer Einführung verworfen werden. Bevor diese Daten verworfen werden, stellt Ethereum sicher, dass sie allen Netzwerkteilnehmern zur Verfügung gestellt wurden, sodass Zeit bleibt für:

- Interessierte Parteien, um die Daten herunterzuladen und zu speichern.
- Den Abschluss aller Rollup-Challenge-Perioden.
- Die Finalisierung der Rollup-Transaktionen.

_Historische_ Blob-Daten können aus verschiedenen Gründen gewünscht sein und können mithilfe mehrerer dezentraler Protokolle gespeichert und abgerufen werden:

- **Indexierungsprotokolle von Drittanbietern**, wie The Graph, speichern diese Daten über ein dezentrales Netzwerk von Knotenbetreibern, die durch kryptoökonomische Mechanismen motiviert werden.
- **BitTorrent** ist ein dezentrales Protokoll, bei dem Freiwillige diese Daten speichern und an andere verteilen können.
- Das **[Ethereum-Portal-Netzwerk](/developers/docs/networking-layer/portal-network/)** zielt darauf ab, den Zugriff auf alle Ethereum-Daten über ein dezentrales Netzwerk von Knotenbetreibern zu ermöglichen, indem Daten ähnlich wie bei BitTorrent unter den Teilnehmern verteilt werden.
- **Einzelne Benutzer** können jederzeit eigene Kopien beliebiger Daten für historische Referenzen speichern.
- **Rollup-Anbieter** haben einen Anreiz, diese Daten zu speichern, um die Benutzererfahrung ihres Rollups zu verbessern.
- **Block-Explorer** betreiben in der Regel Archivknoten, die all diese Informationen für eine einfache historische Referenz indizieren und speichern und für Benutzer über eine Weboberfläche zugänglich sind.

Es ist wichtig zu beachten, dass die Wiederherstellung des historischen Zustands auf einem **1-von-N-Vertrauensmodell** basiert. Das bedeutet, dass Sie nur Daten aus _einer einzigen vertrauenswürdigen Quelle_ benötigen, um deren Richtigkeit anhand des aktuellen Zustands des Netzwerks zu überprüfen.

## Wie trägt dieses Upgrade zur breiteren Ethereum-Roadmap bei? {#roadmap-impact}

Proto-Danksharding bereitet den Weg für die vollständige Implementierung von [Danksharding](/roadmap/danksharding/). Danksharding ist darauf ausgelegt, die Speicherung von Rollup-Daten auf Knotenbetreiber zu verteilen, sodass jeder Betreiber nur einen kleinen Teil der Gesamtdaten verarbeiten muss. Diese Verteilung wird die Anzahl der Daten-Blobs pro Block erhöhen, was für die Skalierung von Ethereum zur Verarbeitung von mehr Benutzern und Transaktionen unerlässlich ist.

Diese Skalierbarkeit ist entscheidend, um [Milliarden von Benutzern auf Ethereum](/roadmap/scaling/) mit erschwinglichen Gebühren und fortschrittlicheren Anwendungen zu unterstützen und gleichzeitig ein dezentrales Netzwerk aufrechtzuerhalten. Ohne diese Änderungen würden die Hardwareanforderungen für Knotenbetreiber eskalieren, was zu einem Bedarf an immer teurerer Ausrüstung führen würde. Dies könnte kleinere Betreiber vom Markt verdrängen, was zu einer Konzentration der Netzwerkkontrolle bei einigen wenigen großen Betreibern führen würde, was dem Prinzip der Dezentralisierung widersprechen würde.

## Betrifft dieses Upgrade alle Ethereum-Konsens- und Validator-Clients? {#client-impact}

Ja, Proto-Danksharding (EIP-4844) erfordert Updates sowohl für Ausführungs-Clients als auch für Konsens-Clients. Alle wichtigen Ethereum-Clients haben Versionen veröffentlicht, die das Upgrade unterstützen. Um die Synchronisierung mit dem Ethereum-Netzwerk nach dem Upgrade aufrechtzuerhalten, müssen Knotenbetreiber sicherstellen, dass sie eine unterstützte Client-Version ausführen. Beachten Sie, dass die Informationen zu Client-Releases zeitkritisch sind und Benutzer sich für die aktuellsten Details auf die neuesten Updates beziehen sollten. [Siehe Details zu unterstützten Client-Releases](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases).

Die Konsens-Clients verwalten die _Validator_-Software, die vollständig aktualisiert wurde, um das Upgrade zu unterstützen.

## Wie wirkt sich Cancun-Deneb (Dencun) auf Ethereum-Testnetze aus? {#testnet-impact}

- Devnets, Sepolia und Holesky haben alle das Dencun-Upgrade durchlaufen und Proto-Danksharding ist vollständig funktionsfähig.
- Rollup-Entwickler können diese Netzwerke für EIP-4844-Tests verwenden.
- Die meisten Benutzer werden von dieser Änderung an den jeweiligen Testnetzen völlig unberührt bleiben.

## Werden nun alle Transaktionen auf L2s temporären Blob-Speicherplatz verwenden, oder kann man wählen? {#calldata-vs-blobs}

Rollup-Transaktionen auf Layer 2 (L2) von Ethereum haben die Möglichkeit, zwei Arten der Datenspeicherung zu verwenden: temporären Blob-Speicherplatz oder permanente Smart Contract-Aufrufdaten. Blob-Speicherplatz ist eine wirtschaftliche Wahl und bietet temporären Speicher zu geringeren Kosten. Er garantiert die Datenverfügbarkeit für alle notwendigen Challenge-Perioden. Andererseits bieten Smart Contract-Aufrufdaten eine dauerhafte Speicherung, sind aber teurer.

Die Entscheidung zwischen der Verwendung von Blob-Speicherplatz oder Aufrufdaten wird in erster Linie von den Rollup-Anbietern getroffen. Sie stützen diese Entscheidung auf die aktuelle Nachfrage nach Blob-Speicherplatz. Wenn die Nachfrage nach Blob-Speicherplatz hoch ist, können sich Rollups für Aufrufdaten entscheiden, um sicherzustellen, dass die Daten rechtzeitig veröffentlicht werden.

Obwohl es für Benutzer theoretisch möglich ist, ihren bevorzugten Speichertyp zu wählen, verwalten Rollup-Anbieter diese Auswahl in der Regel. Diese Option den Benutzern anzubieten, würde die Komplexität erhöhen, insbesondere bei kostengünstigen Bündelungstransaktionen. Für spezifische Details zu dieser Wahl sollten Benutzer die Dokumentation der einzelnen Rollup-Anbieter konsultieren.

## Wird 4844 das L1-Gas reduzieren? {#l1-fee-impact}

Nicht wesentlich. Ein neuer Gasmarkt wird exklusiv für Blob-Speicherplatz eingeführt, der von Rollup-Anbietern genutzt wird. _Obwohl die Gebühren auf L1 durch die Auslagerung von Rollup-Daten in Blobs gesenkt werden können, konzentriert sich dieses Upgrade in erster Linie auf die Reduzierung der L2-Gebühren. Eine Reduzierung der Gebühren auf L1 (Mainnet) kann als Effekt zweiter Ordnung in geringerem Maße auftreten._

- Die Reduzierung von L1-Gas wird proportional zur Akzeptanz/Nutzung von Blob-Daten durch Rollup-Anbieter sein.
- L1-Gas wird wahrscheinlich durch nicht-Rollup-bezogene Aktivitäten wettbewerbsfähig bleiben.
- Rollups, die die Nutzung von Blob-Speicherplatz übernehmen, werden weniger L1-Gas nachfragen, was dazu beiträgt, die L1-Gasgebühren kurzfristig nach unten zu drücken.
- Der Blob-Speicherplatz ist immer noch begrenzt. Wenn also Blobs innerhalb eines Blocks gesättigt/voll sind, müssen Rollups ihre Daten in der Zwischenzeit möglicherweise als permanente Daten veröffentlichen, was die L1- und L2-Gaspreise in die Höhe treiben würde.

## Wird dies die Gebühren auf anderen EVM-Layer-1-Blockchains reduzieren? {#alt-l1-fee-impact}

Nein. Die Vorteile von Proto-Danksharding sind spezifisch für Ethereum-Layer-2-Rollups, die ihre Proofs auf Layer 1 (Mainnet) speichern.

Nur weil ein Netzwerk mit der Ethereum Virtual Machine (EVM) kompatibel ist, bedeutet das nicht, dass es von diesem Upgrade profitiert. Netzwerke, die unabhängig von Ethereum arbeiten (ob EVM-kompatibel oder nicht), speichern ihre Daten nicht auf Ethereum und werden von diesem Upgrade nicht profitieren.

[Mehr über Layer-2-Rollups](/layer-2/)

## Lernen Sie lieber visuell? {#visual-learner}

<VideoWatch slug="eip-4844-dencun-explained" />

_Unlocking Ethereum's Scaling, EIP-4844 — Finematics _

<VideoWatch slug="blobspace-101-dencun" />

_Blobspace 101 with Domothy — Bankless_

## Weiterführende Literatur {#further-reading}

- [EIP4844.com](https://www.eip4844.com/)
- [EIP-4844: Shard blob transactions (Proto-Danksharding)](https://eips.ethereum.org/EIPS/eip-4844)
- [Dencun Mainnet Announcement](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement) - _Ethereum Foundation Blog_
- [The Hitchhiker's Guide to Ethereum: Proto-Danksharding](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum/#proto-danksharding-eip-4844) - _Jon Charbonneau_
- [Proto-Danksharding FAQ](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [An In-depth Explanation of EIP-4844: The Core of the Cancun Upgrade](https://medium.com/@ebunker.io/an-in-depth-explanation-of-eip-4844-the-core-of-the-cancun-upgrade-de7b13761d2c) - _Ebunker_
- [AllCoreDevs Update 016](https://tim.mirror.xyz/HzH5MpK1dnw7qhBSmzCfdCIxpwpD6DpwlfxtaAwEFro) - _Tim Beiko_