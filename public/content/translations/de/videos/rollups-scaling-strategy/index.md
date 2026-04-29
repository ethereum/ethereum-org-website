---
title: "Rollups: Die ultimative Ethereum-Skalierungsstrategie?"
description: "Ein detaillierter Einblick in Rollups als primäre Skalierungsstrategie von Ethereum. Dieses Video erklärt, wie Optimistic Rollups (Arbitrum, Optimism) und Zero-Knowledge-Rollups funktionieren."
lang: de
youtubeId: "7pWxCklcNsU"
uploadDate: 2021-04-14
duration: "0:16:37"
educationLevel: intermediate
topic:
  - "Skalierung"
  - "Rollups"
  - "Optimistic Rollups"
  - "ZK-Rollups"
format: explainer
author: Finematics
breadcrumb: "Rollups"
---

Ein Erklärvideo von **Finematics**, das Rollups als primäre Skalierungsstrategie von Ethereum behandelt. Das Video vergleicht Optimistic Rollups (Arbitrum, Optimism) mit ZK-Rollups und untersucht, warum Rollups zur dominierenden Methode für die Skalierung von Ethereum geworden sind.

*Dieses Transkript ist eine barrierefreie Kopie des [originalen Video-Transkripts](https://www.youtube.com/watch?v=7pWxCklcNsU), das von Finematics veröffentlicht wurde. Es wurde zur besseren Lesbarkeit leicht bearbeitet.*

#### Layer 2 (1:17) {#layer-2-117}

Die Skalierung von Ethereum ist eines der am meisten diskutierten Themen im Krypto-Bereich. Die Skalierungsdebatte heizt sich normalerweise in Zeiten hoher Netzwerkaktivität auf, wie beim CryptoKitties-Hype 2017, dem Sommer der Dezentralisierten Finanzen (DeFi) 2020 oder dem Krypto-Bullenmarkt Anfang 2021. In diesen Zeiten führte die beispiellose Nachfrage nach dem Ethereum-Netzwerk zu extrem hohen Gas-Gebühren, was es für alltägliche Nutzer teuer machte, für ihre Transaktionen zu bezahlen.

Um dieses Problem anzugehen, war die Suche nach der ultimativen Skalierungslösung eine der obersten Prioritäten für mehrere Teams und die gesamte Ethereum-Community.

Im Allgemeinen gibt es drei Hauptwege, um Ethereum – oder tatsächlich die meisten anderen Blockchains – zu skalieren: die Skalierung der Blockchain selbst (Layer 1 (L1)-Skalierung), der Aufbau auf Layer 1 (Layer 2 (L2)-Skalierung) und der Aufbau an der Seite von Layer 1 (Sidechains).

#### Außerhalb von Layer 1 (1:58) {#outside-of-layer-1-158}

Wenn es um Layer 1 geht, ist Eth2 die gewählte Lösung zur Skalierung der Ethereum-Blockchain. Eth2 bezieht sich auf eine Reihe miteinander verbundener Änderungen, wie die Migration zu Proof-of-Stake (PoS), die Zusammenführung des Zustands der Proof-of-Work (PoW)-Blockchain in die neue Proof-of-Stake-Chain und Sharding. Insbesondere Sharding kann den Transaktionsdurchsatz des Ethereum-Netzwerks drastisch erhöhen, besonders in Kombination mit Rollups.

Wenn es um die Skalierung außerhalb von Layer 1 geht, wurden mehrere verschiedene Skalierungslösungen mit gemischten Ergebnissen ausprobiert. Einerseits haben wir Layer-2-Lösungen wie Channels, die vollständig durch Ethereum gesichert sind, aber nur für eine bestimmte Gruppe von Anwendungen gut funktionieren. Sidechains hingegen sind in der Regel EVM-kompatibel und können Allzweckanwendungen skalieren. Der Hauptnachteil ist, dass sie weniger sicher sind als Layer-2-Lösungen, da sie sich nicht auf die Sicherheit von Ethereum verlassen und stattdessen ihre eigenen Konsens-Modelle haben.

Die meisten Rollups zielen darauf ab, das Beste aus diesen beiden Welten zu erreichen, indem sie eine Allzweck-Skalierungslösung schaffen und sich dabei weiterhin vollständig auf die Sicherheit von Ethereum verlassen. Dies ist der Heilige Gral der Skalierung, da es ermöglicht, alle bestehenden Verträge auf Ethereum mit wenigen oder gar keinen Änderungen auf einem Rollup bereitzustellen, ohne die Sicherheit zu beeinträchtigen. Kein Wunder, dass Rollups wahrscheinlich die am meisten erwartete Skalierungslösung von allen sind.

Ein Rollup ist eine Art von Skalierungslösung, die funktioniert, indem Transaktionen außerhalb von Layer 1 ausgeführt werden, die Transaktionsdaten jedoch auf Layer 1 gepostet werden. Dies ermöglicht es dem Rollup, das Netzwerk zu skalieren und dennoch seine Sicherheit aus dem Ethereum-Konsens abzuleiten. Die Verlagerung der Berechnung offchain ermöglicht es im Wesentlichen, insgesamt mehr Transaktionen zu verarbeiten, da nur ein Teil der Daten der Rollup-Transaktionen in die Ethereum-Blöcke passen muss.

Um dies zu erreichen, werden Rollup-Transaktionen auf einer separaten Chain ausgeführt, die sogar eine Rollup-spezifische Version der EVM ausführen kann. Der nächste Schritt nach der Ausführung von Transaktionen auf einem Rollup besteht darin, sie zu bündeln und auf der Ethereum-Haupt-Chain zu posten. Der gesamte Prozess führt im Wesentlichen Transaktionen aus, nimmt die Daten, komprimiert sie und rollt sie in einem einzigen Batch auf die Haupt-Chain auf – daher der Name „Rollup“.

Jedes Rollup stellt eine Reihe von Verträgen auf Layer 1 bereit, die für die Verarbeitung von Ein- und Auszahlungen sowie die Überprüfung von Beweisen verantwortlich sind. Bei den Beweisen kommt auch die Hauptunterscheidung zwischen den verschiedenen Arten von Rollups ins Spiel. Optimistic Rollups verwenden Betrugsnachweise, während ZK-Rollups Gültigkeitsbeweise verwenden.

#### Optimistic Rollups (4:26) {#optimistic-rollups-426}

Optimistic Rollups posten Daten auf Layer 1 und gehen davon aus, dass sie korrekt sind – daher der Name „optimistic“ (optimistisch). Wenn die geposteten Daten gültig sind, befinden wir uns auf dem Idealweg und es muss nichts weiter getan werden. Das Optimistic Rollup profitiert davon, im optimistischen Szenario keine zusätzliche Arbeit leisten zu müssen.

Im Falle einer ungültigen Transaktion muss das System in der Lage sein, diese zu identifizieren, den korrekten Zustand wiederherzustellen und die Partei zu bestrafen, die eine solche Transaktion einreicht. Um dies zu erreichen, implementieren Optimistic Rollups ein Streitbeilegungssystem, das in der Lage ist, Betrugsnachweise zu überprüfen, betrügerische Transaktionen zu erkennen und böswillige Akteure davon abzuhalten, weitere ungültige Transaktionen oder falsche Betrugsnachweise einzureichen.

In den meisten Implementierungen von Optimistic Rollups muss die Partei, die in der Lage ist, Transaktions-Batches an Layer 1 zu übermitteln, eine Kaution hinterlegen, normalerweise in Form von ETH. Jeder andere Netzwerkteilnehmer kann einen Betrugsnachweis einreichen, wenn er eine fehlerhafte Transaktion entdeckt. Nachdem ein Betrugsnachweis eingereicht wurde, wechselt das System in den Streitbeilegungsmodus. In diesem Modus wird die verdächtige Transaktion erneut ausgeführt – dieses Mal auf der Ethereum-Haupt-Chain. Wenn die Ausführung beweist, dass die Transaktion tatsächlich betrügerisch war, wird die Partei, die diese Transaktion eingereicht hat, bestraft, normalerweise durch Slashing ihrer hinterlegten ETH.

Um zu verhindern, dass böswillige Akteure das Netzwerk mit falschen Betrugsnachweisen spammen, müssen Parteien, die Betrugsnachweise einreichen möchten, in der Regel ebenfalls eine Kaution hinterlegen, die einem Slashing unterliegen kann.

Um eine Rollup-Transaktion auf Layer 1 ausführen zu können, müssen Optimistic Rollups ein System implementieren, das in der Lage ist, eine Transaktion mit genau dem Zustand erneut abzuspielen, der vorhanden war, als die Transaktion ursprünglich auf dem Rollup ausgeführt wurde. Dies ist einer der komplizierten Teile von Optimistic Rollups und wird normalerweise durch die Erstellung eines separaten Manager-Vertrags erreicht, der bestimmte Funktionsaufrufe durch einen Zustand aus dem Rollup ersetzt.

Das System kann wie erwartet funktionieren und Betrug erkennen, selbst wenn es nur eine ehrliche Partei gibt, die den Zustand des Rollups überwacht und bei Bedarf Betrugsnachweise einreicht. Aufgrund der richtigen Anreize innerhalb des Rollup-Systems sollte der Eintritt in den Streitbeilegungsprozess eine Ausnahmesituation sein und nicht etwas, das ständig passiert.

Bei ZK-Rollups gibt es überhaupt keine Streitbeilegung. Dies ist möglich durch die Nutzung eines cleveren Stücks Kryptographie namens Zero-Knowledge-Beweise – daher der Name ZK-Rollups. In diesem Modell enthält jeder auf Layer 1 gepostete Batch einen kryptographischen Beweis namens ZK-SNARK. Der Beweis kann vom Layer-1-Vertrag schnell verifiziert werden, wenn der Transaktions-Batch eingereicht wird, und ungültige Batches können sofort abgelehnt werden.

#### Weitere Unterschiede (7:28) {#other-differences-728}

Aufgrund der Natur des Streitbeilegungsprozesses müssen Optimistic Rollups allen Netzwerkteilnehmern genügend Zeit geben, um Betrugsnachweise einzureichen, bevor eine Transaktion auf Layer 1 finalisiert wird. Dieser Zeitraum ist in der Regel recht lang – um sicherzustellen, dass selbst im schlimmsten Fall betrügerische Transaktionen noch angefochten werden können. Dies führt dazu, dass Auszahlungen aus Optimistic Rollups recht lange dauern, da Nutzer bis zu ein oder zwei Wochen warten müssen, um ihre Gelder wieder auf Layer 1 abheben zu können.

Glücklicherweise gibt es einige Projekte, die daran arbeiten, diese Situation zu verbessern, indem sie schnelle „Liquiditäts-Exits“ anbieten. Diese Projekte bieten fast sofortige Auszahlungen zurück zu Layer 1, einem anderen Layer 2 oder sogar einer Sidechain und erheben eine kleine Gebühr für diesen Komfort. Das Hop-Protokoll und Connext sind die Projekte, die man sich hier ansehen sollte.

ZK-Rollups haben das Problem langer Auszahlungen nicht, da die Gelder für Auszahlungen zur Verfügung stehen, sobald der Rollup-Batch zusammen mit einem Gültigkeitsbeweis an Layer 1 übermittelt wird.

ZK-Rollups bringen jedoch ihre eigenen Nachteile mit sich. Aufgrund der Komplexität der Technologie ist es viel schwieriger, ein EVM-kompatibles ZK-Rollup zu erstellen, was es schwieriger macht, Allzweckanwendungen zu skalieren, ohne die Anwendungslogik neu schreiben zu müssen. Dennoch macht zkSync in diesem Bereich erhebliche Fortschritte und könnte schon bald ein EVM-kompatibles ZK-Rollup auf den Markt bringen.

Optimistic Rollups haben es mit der EVM-Kompatibilität etwas leichter. Sie müssen zwar immer noch ihre eigene Version der EVM mit einigen Modifikationen ausführen, aber 99 % der Verträge können ohne Änderungen portiert werden. ZK-Rollups sind auch viel rechenintensiver als Optimistic Rollups, was bedeutet, dass Knoten, die ZK-Beweise berechnen, Hochleistungsmaschinen sein müssen, was es für andere Nutzer schwierig macht, sie zu betreiben.

#### Skalierungsverbesserungen (9:32) {#scaling-improvements-932}

Wenn es um Skalierungsverbesserungen geht, sollten beide Arten von Rollups in der Lage sein, Ethereum von etwa 15–45 Transaktionen pro Sekunde (je nach Transaktionstyp) auf bis zu 1.000–4.000 Transaktionen pro Sekunde zu skalieren. Es ist erwähnenswert, dass es möglich ist, noch mehr Transaktionen pro Sekunde zu verarbeiten, indem mehr Platz für Rollup-Batches auf Layer 1 angeboten wird.

Dies ist auch der Grund, warum Eth2 eine massive Synergie mit Rollups schaffen kann, da es den möglichen Raum für Datenverfügbarkeit vergrößert, indem es mehrere Shards erstellt – von denen jeder eine erhebliche Menge an Daten speichern kann. Die Kombination von Eth2 und Rollups könnte die Transaktionsgeschwindigkeit von Ethereum auf bis zu 100.000 Transaktionen pro Sekunde erhöhen.

Optimism und Arbitrum sind derzeit die beliebtesten Optionen, wenn es um Optimistic Rollups geht. Optimism wurde teilweise im Ethereum Mainnet mit einer begrenzten Anzahl von Partnern wie Synthetix und Uniswap eingeführt, um sicherzustellen, dass die Technologie vor dem vollständigen Start wie erwartet funktioniert. Arbitrum hat seine Version bereits im Mainnet bereitgestellt und mit dem Onboarding verschiedener Projekte in sein Ökosystem begonnen.

Zu den bemerkenswertesten Projekten, die auf Arbitrum starten, gehören Uniswap, Sushi, Bancor, Augur, Chainlink, Aave und viele mehr. Arbitrum hat auch seine Partnerschaft mit Reddit angekündigt, die sich auf den Start einer separaten Rollup-Chain konzentriert, um deren Belohnungssystem zu skalieren. Optimism arbeitet mit MakerDAO zusammen, um die Optimism Dai-Brücke zu schaffen und schnelle Auszahlungen von DAI und anderen Token zurück zu Layer 1 zu ermöglichen.

Obwohl sowohl Arbitrum als auch Optimism versuchen, dasselbe Ziel zu erreichen – den Aufbau EVM-kompatibler Optimistic-Rollup-Lösungen –, gibt es einige Unterschiede in ihrem Design. Arbitrum hat ein anderes Streitbeilegungsmodell. Anstatt eine ganze Transaktion auf Layer 1 erneut auszuführen, um zu überprüfen, ob der Betrugsnachweis gültig ist, haben sie ein interaktives Multi-Runden-Modell entwickelt, das es ermöglicht, den Umfang des Streits einzugrenzen und potenziell nur wenige Anweisungen auf Layer 1 auszuführen, um zu prüfen, ob eine verdächtige Transaktion gültig ist.

Ein weiterer großer Unterschied ist der Ansatz zur Handhabung der Transaktionsreihenfolge und von MEV. Arbitrum wird zunächst einen Sequencer betreiben, der für die Reihenfolge der Transaktionen verantwortlich ist, möchte diesen aber langfristig dezentralisieren. Optimism bevorzugt einen anderen Ansatz, bei dem die Reihenfolge der Transaktionen – und damit der MEV – für einen bestimmten Zeitraum an andere Parteien versteigert werden kann.

#### ZK-Rollups (13:10) {#zk-rollups-1310}

Obwohl es so aussieht, als würde sich die Ethereum-Community hauptsächlich auf Optimistic Rollups konzentrieren – zumindest kurzfristig –, machen auch die Projekte, die an ZK-Rollups arbeiten, extrem schnelle Fortschritte.

Loopring nutzt die ZK-Rollup-Technologie, um sein Börsen- und Zahlungsprotokoll zu skalieren. Hermez und ZKTube arbeiten an der Skalierung von Zahlungen mithilfe von ZK-Rollups, wobei Hermez auch ein EVM-kompatibles ZK-Rollup entwickelt. Aztec konzentriert sich darauf, Privatsphäre-Funktionen in ihre ZK-Rollup-Technologie zu integrieren.

StarkWare-basierte Rollups werden bereits ausgiebig von Projekten wie DeversiFi, Immutable X und dYdX genutzt. Wie bereits erwähnt, arbeitet zkSync an einer EVM-kompatiblen virtuellen Maschine, die in der Lage sein wird, beliebige in Solidity geschriebene Verträge vollständig zu unterstützen.

#### DeFi (14:02) {#defi-1402}

Rollups dürften auch große Auswirkungen auf DeFi haben. Nutzer, die zuvor aufgrund hoher Transaktionsgebühren nicht auf Ethereum transagieren konnten, werden beim nächsten Mal, wenn die Netzwerkaktivität hoch ist, im Ökosystem bleiben können. Rollups werden auch eine neue Art von Anwendungen ermöglichen, die günstigere Transaktionen und schnellere Bestätigungszeiten erfordern – und das alles, während sie vollständig durch den Ethereum-Konsens gesichert sind. Es sieht so aus, als könnten Rollups eine weitere Wachstumsphase für DeFi auslösen.

#### Herausforderungen (14:29) {#challenges-1429}

Es gibt jedoch einige Herausforderungen, wenn es um Rollups geht. Komponierbarkeit ist eine davon – um eine Transaktion zusammenzustellen, die mehrere Protokolle verwendet, müssten alle auf demselben Rollup bereitgestellt werden.

Eine weitere Herausforderung ist die fragmentierte Liquidität. Ohne dass neues Geld in das gesamte Ethereum-Ökosystem fließt, wird die bestehende Liquidität, die auf Layer 1 in Protokollen wie Uniswap oder Aave vorhanden ist, zwischen Layer 1 und mehreren Rollup-Implementierungen aufgeteilt. Geringere Liquidität bedeutet in der Regel höhere Slippage und eine schlechtere Handelsausführung.

Dies bedeutet auch, dass es natürlich Gewinner und Verlierer geben wird. Im Moment ist das bestehende Ethereum-Ökosystem nicht groß genug, um alle Skalierungslösungen zu nutzen. Dies kann – und wird sich wahrscheinlich – langfristig ändern, aber kurzfristig könnten wir erleben, dass einige Rollups und andere Skalierungslösungen zu Geisterstädten werden. In Zukunft könnten wir auch Nutzer sehen, die vollständig innerhalb eines Rollup-Ökosystems leben und über lange Zeiträume nicht mit der Ethereum-Haupt-Chain und anderen Skalierungslösungen interagieren.

#### Bedrohung für Sidechains (15:44) {#threat-to-sidechains-1544}

Eine Frage, die bei der Diskussion über Rollups sehr oft aufkommt, ist, ob sie eine Bedrohung für Sidechains darstellen. Sidechains werden weiterhin ihren Platz im Ethereum-Ökosystem haben. Obwohl die Kosten für Transaktionen auf Layer 2 viel niedriger sein werden als auf Layer 1, werden sie höchstwahrscheinlich immer noch hoch genug sein, um bestimmte Arten von Anwendungen wie Spiele und andere hochvolumige Apps preislich auszuschließen. Dies könnte sich ändern, wenn Ethereum Sharding einführt, aber bis dahin könnten Sidechains genug Netzwerkeffekte erzeugen, um langfristig zu überleben.

Außerdem sind die Gebühren auf Rollups höher als auf Sidechains, da jeder Rollup-Batch immer noch für den Ethereum-Blockplatz bezahlen muss. Die Ethereum-Community legt einen großen Fokus auf Rollups in der Ethereum-Skalierungsstrategie – zumindest kurz- bis mittelfristig und potenziell sogar noch länger.