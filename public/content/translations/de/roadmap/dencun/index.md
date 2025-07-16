---
title: FAQs zu Cancun-Deneb (Dencun)
description: Häufig gestellte Fragen zum Netzwerk-Upgrade Cancun-Deneb (Dencun)
lang: de
---

# Cancun-Deneb (Dencun) {#dencun}

Cancun-Deneb (Dencun) ist ein Upgrade des Ethereum-Netzwerks, bei dem **Proto-Danksharding (EIP-4844)** aktiviert wird. Im Zuge dessen werden temporäre Daten **Blobs** für günstigere [Layer 2 (L2)](/Glossar/#layer-2)-Rollup-Speicherung einführt.

Ein neuer Transaktionstyp ermöglicht es Rollup-Anbietern, Daten kostengünstiger in sogenannten „Blobs“ zu speichern. Diese Blobs stehen dem Netzwerk etwa 18 Tage lang garantiert zur Verfügung (genauer gesagt 4096 [Epochen](/Glossar/#epoch)). Nach Ablauf dieser Zeit werden die Blobs aus dem Netzwerk entfernt, aber die Anwendungen können die Gültigkeit ihrer Daten immer noch mithilfe von Nachweisen verifizieren.

Dies senkt die Kosten für Rollups erheblich, begrenzt das Wachstum der Chain und sorgt dafür, das mehr Nutzer unterstützt werden. Gleichzeitig bleibt die Sicherheit und eine dezentralisierte Gruppe von Knotenpunktbetreibern erhalten.

## Wann ist damit zu rechnen, dass Rollups aufgrund von Proto-Danksharding die niedrigeren Transaktionsgebühren widerspiegeln? {#when}

- Dieses Upgrade wurde in Epoche 269568 am **13. März 2024 um 13:55 Uhr (UTC)** aktiviert
- Alle großen Rollup-Anbieter wie Arbitrum oder Optimism haben signalisiert, dass Blobs unmittelbar nach dem Upgrade unterstützt werden
- Der Zeitplan für den individuellen Rollup-Support kann variieren, da jeder Anbieter seine Systeme aktualisieren muss, um vom neuen Blob-Space zu profitieren

## Wie kann ETH nach der Hard Fork umgewandelt werden? {#scam-alert}

- **Kein Handlungsbedarf für Ihre ETH**: Nach dem Upgrade Ethereum Dencun besteht keine Notwendigkeit, Ihre ETH umzuwandeln oder zu aktualisieren. Ihre Kontoguthaben bleiben unverändert und die ETH, die Sie derzeit besitzen, bleiben auch nach dem Hard Fork in der bestehenden Form zugänglich.
- **Vorsicht vor Betrug!** <Emoji text="⚠️" /> **Jeder, der Sie anweist, Ihre ETH zu „aktualisieren“, versucht, Sie zu betrügen.** Es gibt nichts, was Sie in Bezug auf dieses Upgrade tun müssen. Ihre Assets bleiben davon völlig unberührt. Denken Sie daran: Informiert zu sein ist der beste Schutz vor Betrug.

[Mehr zur Erkennung und Vermeidung von Betrug](/Sicherheit/)

## Welches Problem wird durch das Update des Dencun-Netzwerks gelöst? {#network-impact}

Dencun zielt in erster Linie auf **Skalierbarkeit** (Handhabung von mehr Nutzern und mehr Transaktionen) bei **erschwinglichen Gebühren** ab. Gleichzeitig bleibt **die Dezentralisierung** des Netzwerks erhalten.

Die Ethereum-Community hat sich für ihr Wachstum für einen „Rollup-zentrierten“ Ansatz entschlossen, bei dem Layer-2-Rollups das wichtigste Mittel für die sichere Unterstützung von mehr Nutzern sind.

Rollup-Netzwerke wickeln die _Verarbeitung_ (oder „Ausführung“) von Transaktionen getrennt vom Mainnet ab und veröffentlichen dann zur Aufbewahrung einen kryptografischen Beweis und/oder komprimierte Transaktionsdaten der Ergebnisse zurück im Mainnet. Die Speicherung dieser Nachweise ist mit Kosten verbunden (in Form von [Gas](/Glossar/#gas)). Diese mussten vor dem Proto-Danksharding von allen Betreibern von Netzwerkknoten dauerhaft gespeichert werden, was eine teure Angelegenheit ist.

Durch die Einführung von Proto-Danksharding im Dencun-Upgrade wird die Datenspeicherung für diese Nachweise kostengünstiger, da die Betreiber der Knoten diese Daten nur noch etwa 18 Tage lang speichern müssen. Nach diesem Zeitraum können die Daten sicher entfernt werden, um eine Ausweitung der Hardwareanforderungen zu verhindern.  Da Rollups in der Regel eine Abhebungsfrist von 7 Tagen haben, bleibt ihr Sicherheitsmodell unverändert, solange Blobs für diesen Zeitraum auf L1 verfügbar sind. Das 18-tägige Zeitfenster für die Löschung bietet einen erheblichen Puffer für diesen Zeitraum.

[Mehr zur Skalierung von Ethereum](/roadmap/scaling/)

## Wie wird auf alte Blob-Daten zugegriffen? {#historical-access}

Reguläre Ethereum-Knoten speichern immer den _aktuellen Status_ des Netzwerks. Historische Blob-Daten hingegen können etwa 18 Tage nach ihrer Einführung verworfen werden. Bevor diese Daten verworfen werden, stellt Ethereum sicher, dass sie allen Netzwerkteilnehmern zur Verfügung gestellt wurden, sodass Zeit zur Verfügung steht für:

- Herunterladen und Speichern der Daten durch interessierte Parteien,
- Abschluss aller Rollup-Challenge-Perioden,
- Abschluss der Rollup-Transaktionen.

_Historische_ Blob-Daten können aus verschiedenen Gründen erwünscht sein und können mit verschiedenen dezentralen Protokollen gespeichert und abgerufen werden:

- **Indexierungsprotokolle von Drittanbietern** wie The Graph speichern diese Daten über ein dezentrales Netzwerk von Knotenbetreibern, die durch kryptoökonomische Mechanismen Anreize erhalten.
- **BitTorrent** ist ein dezentrales Protokoll, wo Freiwillige diese Daten speichern und an andere weitergeben können.
- Das **[Ethereum-Portalnetzwerk](/developers/docs/networking-layer/portal-network/)** zielt darauf ab, Zugang zu allen Ethereum-Daten über ein dezentrales Netzwerk von Knotenbetreibern zu ermöglichen. Hierfür werden Daten ähnlich wie bei BitTorrent an die Teilnehmer weitergegeben.
- **Einzelnen Nutzern** steht es jederzeit frei, ihre eigenen Kopien von Daten zu speichern, die sie als historische Referenz benötigen.
- Für **Rollup-Anbieter** besteht ein Anreiz, diese Daten zu speichern, um die Benutzerfreundlichkeit ihres Rollups zu verbessern.
- **Block Explorer** betreiben in der Regel Archivierungsknoten, die all diese Informationen für eine einfache historische Referenz indizieren und speichern und sie den Nutzern über eine Weboberfläche zugänglich zu machen.

Es ist wichtig zu beachten, dass die Wiederherstellung des historischen Zustands nach einem **1-von-N-Vertrauensmodell** funktioniert. Das bedeutet, dass Sie nur Daten aus _einer einzigen vertrauenswürdigen Quelle_ benötigen, um deren Korrektheit anhand des aktuellen Zustands des Netzwerks zu verifizieren.

## Wie trägt dieses Upgrade zur breiteren Ethereum-Roadmap bei? {#roadmap-impact}

Proto-Danksharding bereitet den Weg für die vollständige Implementierung von [Danksharding](/roadmap/danksharding/). Danksharding ist darauf ausgelegt, die Speicherung von Rollup-Daten über verschiedene Knotenbetreiber hinweg zu verteilen, sodass jeder Betreiber nur einen kleinen Teil der Gesamtdaten bewältigen muss. Diese Verteilung wird die Anzahl der Daten-Blobs pro Block erhöhen, was entscheidend für die Skalierung von Ethereum ist, damit die Plattform mehr Nutzer und Transaktionen bewältigen kann.

Diese Skalierbarkeit ist entscheidend, um [Milliarden von Nutzern auf Ethereum zu unterstüzen](/roadmap/scaling/), nämlich mit erschwinglichen Gebühren und fortschrittlicheren Anwendungen, wobei das dezentrale Netzwerk erhalten bleibt. Ohne diese Änderungen würden die Hardwareanforderungen für die Knotenbetreiber eskalieren, was zu immer teurerer Ausrüstung führen würde. Dies könnte kleinere Betreiber aufgrund zu hoher Kosten verdrängen und zu einer Konzentration der Netzwerk-Kontrolle bei wenigen großen Betreibern führen, was dem Prinzip der Dezentralisierung widersprechen würde.

## Beeinflusst dieses Upgrade alle Ethereum-Konsens- und Validatoren-Clients? {#client-impact}

Ja, für Proto-Danksharding (EIP-4844) sind Updates sowohl an den Ausführungs- als auch an den Konsens-Clients erforderlich. Alle Haupt-Ethereum-Clients haben Versionen veröffentlicht, die das Upgrade unterstützen. Um nach dem Upgrade die Synchronisation mit dem Ethereum-Netzwerk aufrechtzuerhalten, müssen die Knotenbetreiber sicherstellen, dass die von ihnen eingesetzte Client-Version unterstützt wird. Beachten Sie, dass die Informationen zu Client-Versionen zeitkritisch sind, und Benutzer sollten die neuesten Updates konsultieren, um die die aktuellsten Details zu erfahren. [Siehe Details zu unterstützten Client-Versionen](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases).

Die Konsens-Clients verwalten die _Validatoren_Software, die durchgängig aktualisiert wurde, um das Upgrade zu unterstützen.

## Wie wirkt sich Cancun-Deneb (Dencun) auf Goerli oder andere Ethereum-Testnetze aus? {#testnet-impact}

- Devnets, Goerli, Sepolia und Holesky haben alle das Dencun-Upgrade durchlaufen. Bei ihnen ist Proto-Danksharding vollständig funktionsfähig.
- Rollup-Entwickler können diese Netzwerke für EIP-4844-Tests nutzen
- Die meisten Benutzer sind von dieser Änderung in den einzelnen Testnetzen in keiner Weise betroffen.

## Werden alle Transaktionen auf L2 jetzt temporären Blob-Speicher nutzen oder hat der Benutzer die Wahl? {#calldata-vs-blobs}

Rollup-Transaktionen auf Layer 2 (L2) von Ethereum haben die Option, zwei Arten der Datenspeicherung zu verwenden: temporären Blob-Speicher oder permanente Smart-Contract-Calldata. Blob-Speicher ist eine kostengünstige Wahl, die temporäre Speicherung zu einem niedrigeren Preis bietet. Er garantiert die Datenverfügbarkeit für alle erforderlichen Challenge-Perioden. Auf der anderen Seite bieten Smart-Contract-Calldata permanente Speicherung, sind aber teurer.

Die Entscheidung, ob Blob-Speicher oder Calldata verwendet werden, liegt hauptsächlich bei den Rollup-Anbietern. Diese Entscheidung basiert auf der aktuellen Nachfrage nach Blob-Speicher. Wenn die Nachfrage nach Blob-Speicher hoch ist, können sich Rollups für Calldata entscheiden, um sicherzustellen, dass die Daten rechtzeitig veröffentlicht werden.

Obwohl es theoretisch möglich ist, dass Benutzer ihren bevorzugten Speichertyp wählen, wird diese Entscheidung in der Regel von den Rollup-Anbietern getroffen.  Die Bereitstellung dieser Option für Benutzer würde für zusätzliche Komplexität sorgen, insbesondere bei der kosteneffektiven Bündelung von Transaktionen. Spezifische Details zu dieser Wahl finden Benutzer in den von den einzelnen Rollup-Anbietern bereitgestellten Dokumentationen.

## Wird EIP-4844 L1-Gas senken? {#l1-fee-impact}

Nicht sonderlich. Ein neuer Gasmarkt wird ausschließlich für Blob-Speicher eingeführt und soll von Rollup-Anbietern verwendet werden. _Obwohl die Gebühren auf L1 durch das Abladen von Rollup-Daten auf Blobs möglicherweise gesenkt werden können, konzentriert sich dieses Upgrade hauptsächlich auf die Senkung der L2-Gebühren. Eine Reduzierung der Gebühren auf L1 (Mainnet) kann als eine Auswirkung zweiter Ordnung in geringerem Maße auftreten._

- Die Reduzierung der L1-Gasgebühren ist proportional zur Übernahme/Nutzung von Blob-Daten durch Rollup-Anbieter
- L1-Gas bleibt voraussichtlich wettbewerbsfähig aufgrund von Aktivitäten, die nicht mit Rollups zusammenhängen
- Rollups, die Blob-Speicher nutzen, werden weniger L1-Gas benötigen, was dazu beiträgt, die L1-Gasgebühren kurzfristig zu senken
- Blob-Speicher ist noch begrenzt. Wenn Blobs also innerhalb eines Blocks gesättigt/voll sind, müssen Rollups ihre Daten möglicherweise in der Zwischenzeit als permanente Daten veröffentlichen, was die L1- und L2-Gaspreise in die Höhe treiben würde

## Wird dies die Gebühren auf anderen EVM-Layer-1-Blockchains senken? {#alt-l1-fee-impact}

Nein. Die Vorteile von Proto-Danksharding sind spezifisch für Layer-2-Rollups auf Ethereum, die ihre Nachweise auf Layer 1 (Mainnet) speichern.

Die bloße Kompatibilität mit der Ethereum Virtual Machine (EVM) bedeutet nicht, dass ein Netzwerk von diesem Upgrade auf irgendeine Weise profitieren wird. Netzwerke, die unabhängig von Ethereum operieren (ob EVM-kompatibel oder nicht), speichern ihre Daten nicht auf Ethereum und werden von diesem Upgrade keinen Nutzen ziehen.

[Weitere Informationen zu Layer-2-Rollups](/layer-2/)

## Eher der visuelle Lernende? {#visual-learner}

<YouTube id="HT9PHWloIiU" />

_Die Skalierung von Ethereum freischalten, EIP-4844 — Finematics _

<YouTube id="dFjyUY3e53Q" />

_Blobspace 101 mit Domothy — Bankless_

## Weiterführende Lektüre {#further-reading}

- [EIP4844.com](https://www.eip4844.com/)
- [EIP-4844: Shard-Blob-Transaktionen (Proto-Danksharding)](https://eips.ethereum.org/EIPS/eip-4844)
- [Ankündigung zum Dencun Mainnet](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement) - _Ethereum Foundation blog_
- [The Hitchhiker's Guide to Ethereum: Proto-Danksharding](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum/#proto-danksharding-eip-4844) - _Jon Charbonneau_
- [FAQs zu Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Eine ausführliche Erläuterung von EIP-4844: Der Kern des Cancun Upgrade](https://medium.com/@ebunker.io/an-in-depth-explanation-of-eip-4844-the-core-of-the-cancun-upgrade-de7b13761d2c) - _Ebunker_
- [AllCoreDevs Update 016](https://tim.mirror.xyz/HzH5MpK1dnw7qhBSmzCfdCIxpwpD6DpwlfxtaAwEFro) - _Tim Beiko_
