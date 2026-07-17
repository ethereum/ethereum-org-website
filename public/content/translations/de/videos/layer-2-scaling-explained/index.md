---
title: "Ethereum Layer 2-Skalierung erklärt"
description: "Ein Überblick über Layer 2-Skalierungslösungen für Ethereum, einschließlich Rollups, Plasma, Zustandskanälen und Sidechains."
lang: de
youtubeId: "BgCgauWVTs0"
uploadDate: 2021-02-03
duration: "0:14:28"
educationLevel: intermediate
topic:
  - "scaling"
  - "layer-2"
format: explainer
author: Finematics
breadcrumb: "Layer 2-Skalierung"
---

Ein Erklärvideo von **Finematics**, das Layer 2-Skalierungslösungen für Ethereum behandelt – einschließlich Kanälen, Plasma, Sidechains und Rollups, und warum Rollups sich als dominante Skalierungsstrategie herauskristallisieren. Erfahren Sie, wie diese Technologien Kosten senken und den Transaktionsdurchsatz erhöhen, während sie die Sicherheit von Ethereum erben.

*Dieses Transkript ist eine barrierefreie Kopie des [originalen Video-Transkripts](https://www.youtube.com/watch?v=BgCgauWVTs0), das von Finematics veröffentlicht wurde. Es wurde zur besseren Lesbarkeit leicht bearbeitet.*

#### Ethereum-Skalierung (0:31) {#ethereum-scaling-031}

Die Skalierung von Ethereum ist so ziemlich seit dem Start des Netzwerks eines der am meisten diskutierten Themen. Die Skalierungsdebatte heizt sich immer nach einer Phase größerer Netzwerküberlastung auf.

Eine der ersten Phasen dieser Art war der Krypto-Bullenmarkt 2017, in dem die berüchtigten CryptoKitties zusammen mit ICOs das gesamte Ethereum-Netzwerk verstopfen konnten, was zu einem massiven Anstieg der Gasgebühren führte. In diesem Jahr kehrte die Netzwerküberlastung noch stärker zurück, diesmal verursacht durch die Popularität von dezentralisierten Finanzen (DeFi) und Yield Farming. Es gab Zeiten, in denen selbst Gasgebühren von über 500 Gwei nicht ausreichten, um Ihre Transaktion für eine Weile verifizieren zu lassen.

#### Skalierung von Blockchains (1:20) {#scaling-blockchains-120}

Wenn es um die Skalierung von Ethereum oder Blockchains im Allgemeinen geht, gibt es zwei Hauptwege: die Skalierung der Basisschicht selbst – Layer 1 – oder die Skalierung des Netzwerks durch Auslagerung eines Teils der Arbeit auf eine andere Schicht – Layer 2.

Layer 1 ist die standardmäßige Konsensschicht der Basis, auf der derzeit so ziemlich alle Transaktionen abgewickelt werden. Das Konzept der Schichten (Layers) ist kein Ethereum-spezifisches Konzept; andere Blockchains wie Bitcoin oder Zcash nutzen es ebenfalls ausgiebig.

Layer 2 ist eine weitere Schicht, die auf Layer 1 aufbaut. Hier gibt es einige wichtige Punkte: Layer 2 erfordert keine Änderungen an Layer 1 – er kann einfach unter Verwendung seiner bestehenden Elemente, wie z. B. Verträgen (Smart Contracts), auf Layer 1 aufgebaut werden. Layer 2 nutzt auch die Sicherheit von Layer 1, indem er seinen Zustand in Layer 1 verankert.

Ethereum kann derzeit etwa 15 Transaktionen pro Sekunde auf seiner Basisschicht verarbeiten. Die Layer 2-Skalierung kann die Anzahl der Transaktionen drastisch erhöhen – je nach Lösung können zwischen 2.000 und 4.000 Transaktionen pro Sekunde verarbeitet werden.

#### Ethereum 2.0 (2:39) {#ethereum-20-239}

Wie sieht es mit Ethereum 2.0 aus? Sollte das nicht Ethereum skalieren? Ja – Ethereum 2.0 führt Proof-of-Stake (PoS) und Sharding ein, was den Transaktionsdurchsatz auf der Basisschicht drastisch erhöhen wird.

Bedeutet das, dass wir keine Layer 2-Skalierung mehr brauchen, wenn Ethereum 2.0 veröffentlicht wird? Nicht wirklich – selbst mit Sharding wird Ethereum weiterhin Layer 2-Skalierung benötigen, um in Zukunft Hunderttausende oder sogar Millionen von Transaktionen pro Sekunde bewältigen zu können.

#### Skalierbarkeits-Trilemma (3:15) {#scalability-trilemma-315}

Hier kommt auch das berühmte Skalierbarkeits-Trilemma ins Spiel. Theoretisch könnten wir Layer 2 einfach komplett überspringen und uns stattdessen auf die Skalierung der Basisschicht konzentrieren. Dies würde hochspezialisierte Knotenpunkte (Nodes) erfordern, um die erhöhte Arbeitslast zu bewältigen, was zu einer höheren Zentralisierung führen und somit die Sicherheit und die zensurresistenten Eigenschaften des Netzwerks verringern würde.

Wenn wir an der Tatsache festhalten, dass Skalierbarkeit niemals auf Kosten von Sicherheit und Dezentralisierung gehen sollte, bleibt uns für die Zukunft eine Kombination aus Layer 1- und Layer 2-Skalierung.

#### Layer 2-Skalierung (3:52) {#layer-2-scaling-352}

Layer 2-Skalierung ist ein Sammelbegriff für Lösungen, die dabei helfen, die Fähigkeiten von Layer 1 zu erhöhen, indem sie Transaktionen offchain abwickeln. Die beiden Hauptfähigkeiten, die verbessert werden können, sind Transaktionsgeschwindigkeit und Transaktionsdurchsatz. Darüber hinaus können Layer 2-Lösungen die Gasgebühren erheblich senken.

Wenn es um tatsächliche Skalierungslösungen geht, stehen mehrere Optionen zur Verfügung. Einige der Optionen sind bereits jetzt verfügbar und können den Transaktionsdurchsatz des Ethereum-Netzwerks kurz- bis mittelfristig erhöhen, während andere auf einen mittel- bis langfristigen Zeithorizont abzielen. Einige Lösungen sind anwendungsspezifisch – zum Beispiel Zahlungskanäle –, während andere, wie Optimistic Rollups, für beliebige Vertragsausführungen verwendet werden können.

#### Kanäle (5:03) {#channels-503}

Kanäle sind eine der ersten breit diskutierten Skalierungslösungen. Sie ermöglichen es den Teilnehmern, ihre Transaktionen beliebig oft auszutauschen, während sie nur zwei Transaktionen an die Basisschicht übermitteln. Die beliebtesten Arten von Kanälen sind Zustandskanäle und deren Unterart, die Zahlungskanäle.

Obwohl Kanäle das Potenzial haben, problemlos Tausende von Transaktionen pro Sekunde zu verarbeiten, bringen sie einige Nachteile mit sich. Sie bieten keine offene Teilnahme – die Teilnehmer müssen im Voraus bekannt sein, und die Benutzer müssen ihre Gelder in einem Multisig-Vertrag sperren. Darüber hinaus ist diese Skalierungslösung anwendungsspezifisch und kann nicht zur Skalierung von Allzweck-Verträgen verwendet werden.

Das Hauptprojekt, das die Leistungsfähigkeit von Zustandskanälen auf Ethereum nutzt, ist Raiden. Das Konzept der Zahlungskanäle wird auch vom Lightning Network von Bitcoin ausgiebig genutzt.

#### Plasma (6:04) {#plasma-604}

Plasma ist eine Layer 2-Skalierungslösung, die ursprünglich von Joseph Poon und Vitalik Buterin vorgeschlagen wurde. Es ist ein Framework zur Erstellung skalierbarer Anwendungen auf Ethereum.

Plasma nutzt die Verwendung von Verträgen und Merkle-Bäumen, um die Erstellung einer unbegrenzten Anzahl von Child-Chains – Kopien der übergeordneten Ethereum-Blockchain – zu ermöglichen. Die Auslagerung von Transaktionen von der Main-Chain in Child-Chains ermöglicht schnelle und günstige Transaktionen.

Einer der Nachteile von Plasma ist eine lange Wartezeit für Benutzer, die ihre Gelder von Layer 2 abheben möchten. Plasma kann, ähnlich wie Kanäle, nicht zur Skalierung von Allzweck-Verträgen verwendet werden. Das OMG Network basiert auf einer eigenen Implementierung von Plasma namens More Viable Plasma. Das Matic Network ist ein weiteres Beispiel für eine Plattform, die eine angepasste Version des Plasma-Frameworks verwendet.

#### Sidechains (7:08) {#sidechains-708}

Sidechains sind Ethereum-kompatible, unabhängige Blockchains mit eigenen Konsensmodellen und Blockparametern. Die Interoperabilität mit Ethereum wird durch die Verwendung derselben Ethereum Virtual Machine (EVM) ermöglicht, sodass Verträge, die auf der Ethereum-Basisschicht bereitgestellt wurden, direkt auf der Sidechain bereitgestellt werden können.

xDai ist ein Beispiel für eine solche Sidechain.

#### ZK-Rollups (8:11) {#zk-rollups-811}

Rollups bieten Skalierung, indem sie Sidechain-Transaktionen in einer einzigen Transaktion bündeln – oder "aufrollen" – und einen kryptografischen Beweis generieren, der auch als SNARK (Succinct Non-interactive Argument of Knowledge) bekannt ist. Nur dieser Beweis wird an die Basisschicht übermittelt. Bei Rollups werden der gesamte Transaktionszustand und die Ausführung in Sidechains abgewickelt; die Haupt-Ethereum-Chain speichert nur Transaktionsdaten.

Es gibt zwei Arten von Rollups: ZK-Rollups und Optimistic Rollups.

ZK-Rollups sind zwar schneller und effizienter als Optimistic Rollups, bieten jedoch keine einfache Möglichkeit für bestehende Verträge, auf Layer 2 zu migrieren.

Optimistic Rollups führen eine EVM-kompatible virtuelle Maschine namens OVM (Optimistic Virtual Machine) aus, die es ermöglicht, dieselben Verträge auszuführen, die auch auf Ethereum ausgeführt werden können. Dies ist wirklich wichtig, da es für bestehende Verträge einfacher wird, ihre Komponierbarkeit beizubehalten, was in DeFi extrem relevant ist, wo alle wichtigen Verträge bereits in der Praxis erprobt wurden.

Eines der Hauptprojekte, das an Optimistic Rollups arbeitet, ist Optimism, das seinem Mainnet-Start immer näher kommt. Wenn es um ZK-Rollups geht, sind Loopring und DeversiFi gute Beispiele für dezentrale Börsen, die auf Layer 2 aufgebaut sind. Darüber hinaus haben wir zkSync, das skalierbare Krypto-Zahlungen ermöglicht.

#### Eine Rollup-zentrierte Roadmap (9:18) {#a-rollup-centric-roadmap-918}

Die Skalierbarkeit von Rollups kann auch durch Ethereum 2.0 vergrößert werden. Da Rollups nur die Skalierung der Datenschicht benötigen, können sie bereits in Phase 1 von Ethereum 2.0, bei der es um das Sharding von Daten geht, einen enormen Schub erhalten.

Trotz eines Spektrums an verfügbaren Layer 2-Skalierungslösungen sieht es so aus, als ob sich die Ethereum-Community auf den Ansatz einigt, hauptsächlich durch Rollups und das Daten-Sharding von Ethereum 2.0 Phase 1 zu skalieren. Dieser Ansatz wurde auch in einem kürzlich erschienenen Beitrag von Vitalik Buterin mit dem Titel "A Rollup-Centric Ethereum Roadmap" bestätigt.

In zukünftigen Videos werden wir die Skalierung der Basisschicht mit Ethereum 2.0 untersuchen und wie sowohl die Layer 1- als auch die Layer 2-Skalierung dazu beitragen können, dezentralisierte Finanzen (DeFi) für alle zugänglicher zu machen.