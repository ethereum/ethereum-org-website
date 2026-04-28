---
title: "Ethereums Skalierung freischalten: EIP-4844 erklärt"
description: "Finematics erklärt EIP-4844 (Proto-Danksharding), das wichtigste Upgrade im Dencun Hard Fork, das Blob-Transaktionen einführt, um die Kosten für Layer-2-Rollups auf Ethereum drastisch zu senken."
lang: de
youtubeId: "HT9PHWloIiU"
uploadDate: 2024-03-11
duration: "0:10:56"
educationLevel: intermediate
topic:
  - "wie-ethereum-funktioniert"
  - "skalierung"
  - "eip-4844"
  - "dencun"
  - "upgrades"
format: explainer
author: Finematics
breadcrumb: "EIP-4844 erklärt"
---

Ein Erklärvideo von **Finematics** über EIP-4844 (Proto-Danksharding), das wichtigste Upgrade im Dencun Hard Fork, das Blob-Transaktionen einführt, um die Kosten für Layer-2-Rollups auf Ethereum drastisch zu senken.

*Dieses Transkript ist eine barrierefreie Kopie des [originalen Video-Transkripts](https://www.youtube.com/watch?v=HT9PHWloIiU), das von Finematics veröffentlicht wurde. Es wurde zur besseren Lesbarkeit leicht bearbeitet.*

#### Einführung (0:00) {#introduction-000}

Die Skalierung von Ethereum ist schon seit einiger Zeit ein heiß diskutiertes Thema. Layer-2-Lösungen (L2) standen an vorderster Front dieses Kampfes und boten eine Möglichkeit, Transaktionen außerhalb der Main-Chain abzuwickeln, um Überlastungen zu verringern und Gebühren zu senken. Aber es gibt einen Haken – selbst L2s stoßen an Grenzen, die ihre Effizienz und Skalierbarkeit behindern. EIP-4844 ist der nächste Schritt, um das Potenzial von L2s zu steigern und Ethereum an seine Skalierungs-Roadmap anzupassen.

Worum geht es also bei EIP-4844? Wie genau hilft es bei der Skalierung von L2s? Welche neuen Möglichkeiten eröffnet es? Und stimmt es, dass es die Transaktionsgebühren auf L2s um über 90 % senken kann?

#### Was ist EIP-4844 und Proto-Danksharding (0:52) {#what-is-eip-4844-and-proto-danksharding-052}

Zur Erinnerung: EIP steht für Ethereum Improvement Proposal (Ethereum-Verbesserungsvorschlag), ein Prozess, durch den Entwickler Änderungen am Ethereum-Protokoll vorschlagen können. EIP-4844 im Speziellen schlägt eine neue Art von Transaktion vor, die die Art und Weise, wie Daten auf Ethereum gehandhabt und verarbeitet werden, erheblich verbessern kann. Vielleicht haben Sie auch schon den Namen „Proto-Danksharding“ gehört, der mittlerweile synonym mit EIP-4844 verwendet wird.

Proto-Danksharding ist eine erste Implementierung des vollständigen Dankshardings. Es legt den Grundstein für die weitere Skalierung mit Danksharding in der Zukunft. Dies wird erreicht, indem der Großteil der Logik und des „Gerüsts“, die eine vollständige Danksharding-Spezifikation ausmachen, implementiert wird, ohne das eigentliche Daten-Sharding zu implementieren. Dieses Vorgehen ermöglicht einen einfacheren und weniger störenden Übergang, der über mehrere Netzwerk-Upgrades hinweg stattfinden kann, ohne Ethereum in einem einzigen Upgrade einem zu großen Risiko auszusetzen.

Die Kernidee hinter EIP-4844 ist es, die „Rollup-zentrierte“ Zukunft von Ethereum zu unterstützen. Rollups sind Layer-2-Lösungen, die Transaktionen außerhalb der Ethereum-Main-Chain verarbeiten, aber die Sicherheit von Ethereum erben. EIP-4844 zielt darauf ab, Rollups billiger und effizienter zu machen, indem eine neue Art von Transaktion eingeführt wird, die von Rollups genutzt werden kann, um ihre Betriebskosten um eine Größenordnung zu senken. Dies wiederum wird dazu führen, dass Anwendungen, die auf Rollups aufbauen, viel günstiger zu nutzen sind und die Akzeptanz des gesamten Ethereum-Ökosystems steigt.

Stellen Sie sich vor, Sie führen einen DEX-Tausch auf einem der Rollups durch. Wenn die aktuellen Kosten für eine solche Operation beispielsweise 1 $ betragen, werden sie nach EIP-4844 höchstwahrscheinlich auf etwa 0,10 $ sinken. Die Auswirkungen in diesem Beispiel haben jedoch einige Vorbehalte, auf die wir später im Video eingehen werden.

EIP-4844 wird zusammen mit einigen anderen EIPs im kommenden Dencun-Upgrade des Netzwerks enthalten sein.

#### Technische Details (2:50) {#technical-details-250}

Schauen wir uns nun genauer an, wie EIP-4844 funktioniert.

EIP-4844 führt eine neue Art von Transaktionstyp in Ethereum ein, der Daten-„Blobs“ akzeptiert, die für kurze Zeit im Beacon-Knoten gespeichert werden. Diese Änderungen sind vorwärtskompatibel mit der Skalierungs-Roadmap von Ethereum, und Blobs sind klein genug, um die Festplattennutzung überschaubar zu halten. Blob-Transaktionen haben dasselbe Format, in dem sie voraussichtlich in der endgültigen Danksharding-Spezifikation existieren werden.

Dies geht einher mit einem „Blob-Gebührenmarkt“, der sicherstellt, dass der Blob-Speicherplatz effizient genutzt wird und wirtschaftlich rentabel bleibt. Dies wird durch die Einführung von Blob-Gas als neue Art von Gas erreicht. Es ist unabhängig von normalem Gas. Vorerst werden nur Blobs in Blob-Gas bepreist.

Blobs bestehen aus 4.096 Feldelementen zu je 32 Bytes. Die Blob-Obergrenze pro Block wird durch den Parameter MAX_BLOBS_PER_BLOCK gesteuert. Die Obergrenze kann niedrig beginnen und über mehrere Netzwerk-Upgrades hinweg wachsen. Anfänglich zielt Dencun auf 6 Blobs pro Block ab. 4.096 × 32 Bytes × 6 pro Block = 0,75 MB pro Block.

Blobs werden in Beacon-Knoten (Konsensschicht) gespeichert, nicht in der Ausführungsschicht. Zukünftige Sharding-Arbeiten erfordern nur Änderungen am Beacon-Knoten, sodass die Ausführungsschicht parallel an anderen Initiativen arbeiten kann.

Blobs sind kurzlebig und werden nach etwa zwei Wochen gelöscht. Sie sind lange genug verfügbar, damit alle Akteure eines Rollups sie abrufen können, aber kurz genug, um die Festplattennutzung überschaubar zu halten. Dadurch können Blobs günstiger bepreist werden als Aufrufdaten (Calldata), bei denen es sich um Daten handelt, die für immer in der Historie gespeichert werden.

Das kryptografische Rückgrat von EIP-4844 sind KZG-Commitments. Ohne zu sehr ins Detail zu gehen, ermöglichen sie eine effiziente und sichere Dateneinbindung, die für die Funktionalität von Blob-Transaktionen entscheidend ist. Auf diese Weise müssen nur Commitments zu Blobs von der EVM in der Ausführungsschicht interpretiert werden und nicht die Blobs selbst.

Um das gemeinsame Geheimnis für KZG-Commitments zu generieren, wurde eine browserbasierte, weit verteilte Zeremonie durchgeführt, sodass alle Teilnehmer des Ethereum-Netzwerks die Möglichkeit hatten, sicherzustellen, dass es korrekt und sicher generiert wurde.

EIP-4844 fügt eine neue Vorkompilierung namens Punktauswertung (Point Evaluation) hinzu, die einen KZG-Beweis verifiziert, der behauptet, dass ein Blob (dargestellt durch ein Commitment) an einem bestimmten Punkt zu einem bestimmten Wert ausgewertet wird.

Wie genau lässt sich das alles auf Rollups anwenden? Mit dem neuen Blob-Speicherplatz können Rollups ihre Blockdaten in Blobs ablegen, anstatt in die teureren Aufrufdaten (Calldata), die bisher für diesen Zweck verwendet wurden. Die Nutzung eines kurzlebigen Blob-Speicherplatzes in der Konsensschicht ist möglich, da Rollups Daten nur so lange verfügbar haben müssen, um sicherzustellen, dass ehrliche Akteure den Rollup-Zustand konstruieren können.

Im Fall von Optimistic Rollups wie Optimism oder Arbitrum müssen sie die zugrunde liegenden Daten nur so lange bereitstellen, wie das Zeitfenster für Betrugsanfechtungen geöffnet ist. Der Betrugsnachweis kann den Übergang in kleineren Schritten verifizieren, indem er höchstens ein paar Werte des Blobs gleichzeitig über Aufrufdaten (Calldata) lädt.

ZK-Rollups würden zwei Commitments zu ihren Transaktions- oder Zustands-Delta-Daten bereitstellen: das Blob-Commitment und das eigene Commitment des ZK-Rollups unter Verwendung des Beweissystems, das das Rollup intern verwendet. Sie würden auch ein Äquivalenzbeweis-Protokoll verwenden, das die zuvor erwähnte Punktauswertungs-Vorkompilierung nutzt, um zu beweisen, dass sich die beiden Commitments auf dieselben Daten beziehen.

#### Auswirkungen (6:25) {#impact-625}

Die Auswirkungen von EIP-4844 auf das Ethereum-Ökosystem können nicht hoch genug eingeschätzt werden. Zunächst einmal verbessert es die Skalierbarkeit von Layer-2-Lösungen drastisch, senkt ihre Betriebskosten und macht sie wettbewerbsfähiger gegenüber anderen, günstigen, alternativen Blockchains. Die Senkung der Betriebskosten ist möglich, da der überwiegende Teil der Kosten, die derzeit bei Rollups anfallen, auf die Gebühren für Aufrufdaten (Calldata) zurückzuführen ist.

Darüber hinaus legt EIP-4844 den Grundstein für eine noch weitreichendere Skalierung durch vollständiges Danksharding. Dieses zukünftige Upgrade wird das Ethereum-Netzwerk in mehrere Daten-Shards aufteilen, von denen jeder in der Lage ist, Daten unabhängig zu speichern, was die Kapazität des Netzwerks weiter erhöht.

Da die Betriebskosten sinken, könnten wir eine Welle neuer Layer-2-Lösungen erleben, die Entwickler anziehen, um innovative Anwendungen auf Rollups zu entwickeln.

Wenn es um die Senkung der Transaktionskosten auf Rollups geht, die durch unser vorheriges DEX-Tausch-Beispiel veranschaulicht wurde, ist die Situation komplex. Unter der Annahme, dass die Nachfrage nach Rollups nach EIP-4844 konstant bleibt, könnten wir in der Tat eine erhebliche Kostensenkung für die Nutzer erwarten. Verbesserungen der Skalierbarkeit können jedoch zu unvorhergesehenen wirtschaftlichen Effekten führen. Beispielsweise könnten niedrigere Transaktionsgebühren für Endnutzer mehr Menschen dazu veranlassen, Rollups zu nutzen, was in der Folge die Nachfrage nach Netzwerkressourcen erhöht und möglicherweise die Transaktionskosten in die Höhe treibt.

Eines ist sicher – selbst wenn das Hauptergebnis die Erhöhung des Transaktionsdurchsatzes ist und die Kosten für Transaktionen gleich bleiben, legt EIP-4844 den Grundstein für eine noch größere Skalierbarkeit in der Zukunft, die letztendlich zu günstigeren Transaktionen für die Nutzer führen wird.

#### Zusammenfassung (8:04) {#summary-804}

Die Ethereum-Community hat das Testen von EIP-4844 auf verschiedenen Testnets bereits abgeschlossen, wobei der Start im Mainnet für den 13. März erwartet wird. Dies ist ein monumentaler Schritt zur Erreichung einer beispiellosen Skalierbarkeit für Ethereum. Wir können bereits sehen, dass sich die meisten großen L2s dazu verpflichten, den neuen Blob-Speicherplatz zu nutzen, sobald das Dencun-Upgrade stattfindet.

Zusammenfassend lässt sich sagen, dass EIP-4844 mehr als nur ein Upgrade ist. Es ist ein entscheidender Moment auf Ethereums Weg zu einer skalierbareren, effizienteren und benutzerfreundlicheren Blockchain. Durch die Senkung der Kosten und die Steigerung der Effizienz von Layer-2-Lösungen ist Ethereum bereit, seine Position als führende Plattform für dezentrale Anwendungen zu festigen.