---
title: Cancun-Deneb (Dencun) FAQ
description: "Häufig gestellte Fragen zum Netzwerk-Upgrade Cancun-Deneb (Dencun)"
lang: de
---

# Cancun-Deneb (Dencun) {#dencun}

Cancun-Deneb (Dencun) ist ein Upgrade für das Ethereum-Netzwerk, das **Proto-Danksharding (EIP-4844)** aktiviert und temporäre Daten-**Blobs** für eine günstigere Speicherung von [Ebene 2 (L2)](/glossary/#layer-2)-Rollups einführt.

Ein neuer Transaktionstyp ermöglicht es Rollup-Anbietern, Daten kostengünstiger in sogenannten „Blobs“ zu speichern. Es wird garantiert, dass Blobs dem Netzwerk für etwa 18 Tage (genauer gesagt 4096 [Epochen](/glossary/#epoch)) zur Verfügung stehen. Nach diesem Zeitraum werden Blobs aus dem Netzwerk entfernt, aber Anwendungen können die Gültigkeit ihrer Daten weiterhin mithilfe von Nachweisen überprüfen. 

Dies senkt die Kosten für Rollups erheblich, begrenzt das Wachstum der Blockchain und hilft dabei, mehr Benutzer zu unterstützen, während gleichzeitig die Sicherheit und eine dezentralisierte Gruppe von Blockchain-Knoten-Betreibern erhalten bleiben.

## Wann können wir erwarten, dass Rollups aufgrund von Proto-Danksharding niedrigere Gebühren aufweisen? {#when}

- Dieses Upgrade wurde in Epoche 269568 am **13. März 2024 um 13:55 Uhr (UTC)** aktiviert.
- Alle großen Rollup-Anbieter wie Arbitrum oder Optimism haben signalisiert, dass Blobs unmittelbar nach dem Upgrade unterstützt werden.
- Der Zeitplan für die Unterstützung einzelner Rollups kann variieren, da jeder Anbieter seine Systeme aktualisieren muss, um den neuen Blob-Speicherplatz nutzen zu können.

## Wie kann ETH nach dem Hard Fork umgewandelt werden? {#scam-alert}

- **Keine Aktion für Ihre ETH erforderlich**: Nach dem Ethereum-Dencun-Upgrade müssen Sie Ihre ETH nicht umwandeln oder aktualisieren. Ihre Kontostände bleiben gleich und die ETH, die Sie derzeit halten, bleiben nach dem Hard Fork in ihrer bestehenden Form zugänglich.
- **Vorsicht vor Betrug!** <Emoji text="⚠️" /> **Jeder, der Sie anweist, Ihre ETH zu „aktualisieren“, versucht, Sie zu betrügen.** Sie müssen im Zusammenhang mit diesem Upgrade nichts tun. Ihre Vermögenswerte bleiben völlig unberührt. Denken Sie daran: Informiert zu bleiben ist der beste Schutz vor Betrug.

[Mehr zum Erkennen und Vermeiden von Betrug](/security/)

## Welches Problem löst das Dencun-Netzwerk-Upgrade? {#network-impact}

Dencun befasst sich in erster Linie mit der **Skalierung** (Verarbeitung von mehr Benutzern und mehr Transaktionen) bei **erschwinglichen Gebühren**, während die **Dezentralisierung** des Netzwerks aufrechterhalten wird.

Die Ethereum-Community verfolgt bei ihrem Wachstum einen „Rollup-zentrierten“ Ansatz, bei dem Ebene-2-Rollups das primäre Mittel sind, um mehr Benutzer sicher zu unterstützen.

Rollup-Netzwerke übernehmen die _Verarbeitung_ (oder „Ausführung“) von Transaktionen getrennt vom Mainnet und veröffentlichen dann einen kryptografischen Nachweis und/oder komprimierte Transaktionsdaten der Ergebnisse zur Aufzeichnung zurück an das Mainnet. Die Speicherung dieser Nachweise ist mit Kosten verbunden (in Form von [Gas](/glossary/#gas)), die vor Proto-Danksharding von allen Netzwerk-Blockchain-Knoten-Betreibern dauerhaft gespeichert werden mussten, was es zu einer teuren Aufgabe machte.

Die Einführung von Proto-Danksharding im Dencun-Upgrade fügt eine günstigere Datenspeicherung für diese Nachweise hinzu, indem Blockchain-Knoten-Betreiber diese Daten nur für etwa 18 Tage speichern müssen. Danach können die Daten sicher entfernt werden, um eine Ausweitung der Hardwareanforderungen zu verhindern. Da Rollups in der Regel eine Auszahlungsfrist von 7 Tagen haben, bleibt ihr Sicherheitsmodell unverändert, solange Blobs für diese Dauer auf L1 verfügbar sind. Das 18-tägige Bereinigungsfenster bietet einen erheblichen Puffer für diesen Zeitraum.

[Mehr zur Skalierung von Ethereum](/roadmap/scaling/)

## Wie wird auf alte Blob-Daten zugegriffen? {#historical-access}

Während reguläre Ethereum-Blockchain-Knoten immer den _aktuellen Zustand_ des Netzwerks speichern, können historische Blob-Daten etwa 18 Tage nach ihrer Einführung verworfen werden. Bevor diese Daten verworfen werden, stellt Ethereum sicher, dass sie allen Netzwerkteilnehmern zur Verfügung gestellt wurden, sodass Zeit bleibt für:

- Interessierte Parteien, um die Daten herunterzuladen und zu speichern.
- Den Abschluss aller Rollup-Anfechtungsfristen.
- Die Finalisierung der Rollup-Transaktionen.

_Historische_ Blob-Daten können aus verschiedenen Gründen gewünscht sein und können über mehrere dezentralisierte Protokolle gespeichert und abgerufen werden:

- **Indexierungsprotokolle von Drittanbietern**, wie The Graph, speichern diese Daten über ein dezentralisiertes Netzwerk von Blockchain-Knoten-Betreibern, die durch kryptoökonomische Mechanismen motiviert werden.
- **BitTorrent** ist ein dezentralisiertes Protokoll, bei dem Freiwillige diese Daten speichern und an andere verteilen können.
- Das **[Ethereum-Portal-Netzwerk](/developers/docs/networking-layer/portal-network/)** zielt darauf ab, den Zugriff auf alle Ethereum-Daten über ein dezentralisiertes Netzwerk von Blockchain-Knoten-Betreibern zu ermöglichen, indem Daten ähnlich wie bei BitTorrent unter den Teilnehmern verteilt werden.
- **Einzelne Benutzer** können jederzeit ihre eigenen Kopien beliebiger Daten für historische Referenzzwecke speichern.
- **Rollup-Anbieter** haben einen Anreiz, diese Daten zu speichern, um die Benutzererfahrung ihres Rollups zu verbessern.
- **Blocksuchmaschinen** betreiben in der Regel Archiv-Knoten, die all diese Informationen für eine einfache historische Referenz indexieren und speichern und für Benutzer über eine Weboberfläche zugänglich sind.

Es ist wichtig zu beachten, dass die Wiederherstellung des historischen Zustands auf einem **1-von-N-Vertrauensmodell** basiert. Das bedeutet, dass Sie nur Daten von _einer einzigen vertrauenswürdigen Quelle_ benötigen, um deren Richtigkeit anhand des aktuellen Zustands des Netzwerks zu überprüfen.

## Wie trägt dieses Upgrade zur breiteren Ethereum-Roadmap bei? {#roadmap-impact}

Proto-Danksharding bereitet den Weg für die vollständige Implementierung von [Danksharding](/roadmap/danksharding/). Danksharding ist darauf ausgelegt, die Speicherung von Rollup-Daten auf Blockchain-Knoten-Betreiber zu verteilen, sodass jeder Betreiber nur einen kleinen Teil der Gesamtdaten verarbeiten muss. Diese Verteilung wird die Anzahl der Daten-Blobs pro Block erhöhen, was für die Skalierung von Ethereum zur Verarbeitung von mehr Benutzern und Transaktionen unerlässlich ist.

Diese Skalierung ist entscheidend, um [Milliarden von Benutzern auf Ethereum zu unterstützen](/roadmap/scaling/), mit erschwinglichen Gebühren und fortschrittlicheren Anwendungen, während gleichzeitig ein dezentralisiertes Netzwerk aufrechterhalten wird. Ohne diese Änderungen würden die Hardwareanforderungen für Blockchain-Knoten-Betreiber eskalieren, was zu einem Bedarf an immer teurerer Ausrüstung führen würde. Dies könnte kleinere Betreiber vom Markt verdrängen und zu einer Konzentration der Netzwerkkontrolle bei einigen wenigen großen Betreibern führen, was dem Prinzip der Dezentralisierung widersprechen würde.

## Betrifft dieses Upgrade alle Ethereum-Konsens- und Validator-Clients? {#client-impact}

Ja, Proto-Danksharding (EIP-4844) erfordert Updates sowohl für Ausführungs-Clients als auch für Konsens-Clients. Alle wichtigen Ethereum-Clients haben Versionen veröffentlicht, die das Upgrade unterstützen. Um die Synchronisation mit dem Ethereum-Netzwerk nach dem Upgrade aufrechtzuerhalten, müssen Blockchain-Knoten-Betreiber sicherstellen, dass sie eine unterstützte Client-Version ausführen. Beachten Sie, dass die Informationen zu Client-Veröffentlichungen zeitkritisch sind und Benutzer sich für die aktuellsten Details auf die neuesten Updates beziehen sollten. [Siehe Details zu unterstützten Client-Veröffentlichungen](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases).

Die Konsens-Clients verwalten die _Validator_-Software, die vollständig aktualisiert wurde, um das Upgrade zu unterstützen.

## Wie wirkt sich Cancun-Deneb (Dencun) auf Ethereum-Testnets aus? {#testnet-impact}

- Devnets, Sepolia und Holesky haben alle das Dencun-Upgrade durchlaufen und Proto-Danksharding ist vollständig funktionsfähig.
- Rollup-Entwickler können diese Netzwerke für EIP-4844-Tests nutzen.
- Die meisten Benutzer werden von dieser Änderung an jedem Testnet völlig unberührt bleiben.

## Werden nun alle Transaktionen auf L2s temporären Blob-Speicherplatz nutzen, oder wird man wählen können? {#calldata-vs-blobs}

Rollup-Transaktionen auf Ebene 2 (L2) von Ethereum haben die Möglichkeit, zwei Arten der Datenspeicherung zu nutzen: temporären Blob-Speicherplatz oder permanente Smart Contract-Calldata. Blob-Speicherplatz ist eine wirtschaftliche Wahl und bietet temporäre Speicherung zu geringeren Kosten. Er garantiert die Datenverfügbarkeit für alle notwendigen Anfechtungsfristen. Andererseits bieten Smart Contract-Calldata eine permanente Speicherung, sind aber teurer.

Die Entscheidung zwischen der Nutzung von Blob-Speicherplatz oder Calldata wird in erster Linie von den Rollup-Anbietern getroffen. Sie stützen diese Entscheidung auf die aktuelle Nachfrage nach Blob-Speicherplatz. Wenn die Nachfrage nach Blob-Speicherplatz hoch ist, können sich Rollups für Calldata entscheiden, um sicherzustellen, dass die Daten rechtzeitig veröffentlicht werden.

Obwohl es für Benutzer theoretisch möglich ist, ihren bevorzugten Speichertyp zu wählen, verwalten in der Regel die Rollup-Anbieter diese Auswahl. Diese Option den Benutzern anzubieten, würde die Komplexität erhöhen, insbesondere bei kostengünstigen Bündelungstransaktionen. Für spezifische Details zu dieser Wahl sollten Benutzer die Dokumentation der einzelnen Rollup-Anbieter konsultieren.

## Wird 4844 das L1-Gas reduzieren? {#l1-fee-impact}

Nicht signifikant. Ein neuer Gasmarkt wird exklusiv für Blob-Speicherplatz eingeführt, der von Rollup-Anbietern genutzt wird. _Obwohl die Gebühren auf L1 durch die Auslagerung von Rollup-Daten in Blobs gesenkt werden können, konzentriert sich dieses Upgrade in erster Linie auf die Reduzierung der L2-Gebühren. Eine Reduzierung der Gebühren auf L1 (Mainnet) kann als Effekt zweiter Ordnung in geringerem Maße auftreten._

- Die Reduzierung des L1-Gases wird proportional zur Akzeptanz/Nutzung von Blob-Daten durch Rollup-Anbieter sein.
- L1-Gas wird wahrscheinlich durch nicht-Rollup-bezogene Aktivitäten wettbewerbsfähig bleiben.
- Rollups, die die Nutzung von Blob-Speicherplatz übernehmen, werden weniger L1-Gas nachfragen, was dazu beiträgt, die L1-Gasgebühren kurzfristig nach unten zu drücken.
- Der Blob-Speicherplatz ist immer noch begrenzt. Wenn also Blobs innerhalb eines Blocks gesättigt/voll sind, müssen Rollups ihre Daten in der Zwischenzeit möglicherweise als permanente Daten veröffentlichen, was die L1- und L2-Gaspreise in die Höhe treiben würde.

## Wird dies die Gebühren auf anderen EVM-Ebene-1-Blockchains reduzieren? {#alt-l1-fee-impact}

Nein. Die Vorteile von Proto-Danksharding sind spezifisch für Ethereum-Ebene-2-Rollups, die ihre Nachweise auf Ebene 1 (Mainnet) speichern.

Nur weil ein Netzwerk mit der Ethereum Virtual Machine (EVM) kompatibel ist, bedeutet das nicht, dass es von diesem Upgrade profitieren wird. Netzwerke, die unabhängig von Ethereum arbeiten (ob EVM-kompatibel oder nicht), speichern ihre Daten nicht auf Ethereum und werden von diesem Upgrade nicht profitieren.

[Mehr über Ebene-2-Rollups](/layer-2/)

## Lernen Sie lieber visuell? {#visual-learner}

<YouTube id="HT9PHWloIiU" />

_Unlocking Ethereum's Scaling, EIP-4844 — Finematics _

<YouTube id="dFjyUY3e53Q" />

_Blobspace 101 with Domothy — Bankless_

## Weiterführende Literatur {#further-reading}

- [EIP4844.com](https://www.eip4844.com/)
- [EIP-4844: Shard blob transactions (Proto-Danksharding)](https://eips.ethereum.org/EIPS/eip-4844)
- [Dencun Mainnet Announcement](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement) - _Ethereum Foundation Blog_
- [The Hitchhiker's Guide to Ethereum: Proto-Danksharding](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum/#proto-danksharding-eip-4844) - _Jon Charbonneau_
- [Proto-Danksharding FAQ](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [An In-depth Explanation of EIP-4844: The Core of the Cancun Upgrade](https://medium.com/@ebunker.io/an-in-depth-explanation-of-eip-4844-the-core-of-the-cancun-upgrade-de7b13761d2c) - _Ebunker_
- [AllCoreDevs Update 016](https://tim.mirror.xyz/HzH5MpK1dnw7qhBSmzCfdCIxpwpD6DpwlfxtaAwEFro) - _Tim Beiko_