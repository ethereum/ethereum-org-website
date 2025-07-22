---
title: Mining
description: Wie funktionierte das Ethereum-Mining?
lang: de
---

<InfoBanner emoji=":wave:">
Proof-of-Work ist nicht mehr der zugrunde liegende Konsensmechanismus von Ethereum, was bedeutet, dass das Mining ausgeschaltet wurde. Stattdessen wird Ethereum von Validatoren gesichert, die ETH staken. Du kannst schon heute mit dem Staking deiner ETH beginnen. Lese mehr dazu unter <a href='/roadmap/merge/'>den Merge</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>Proof-of-Stake</a>, und <a href='/staking/'>Staking</a>. Diese Seite dient ausschließlich zu Archivierungszwecken, um Ereignisse rund um Ethereum zu dokumentieren.
</InfoBanner>

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir dir, zuerst [Transaktionen](/developers/docs/transactions/), [Blöcke](/developers/docs/blocks/) und [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/) zu lesen.

## Was ist Ethereum-Mining? {#what-is-ethereum-mining}

Mining ist der Prozess der Erstellung eines Blocks von Transaktionen, der zur Ethereum-Blockchain in der mittlerweile veralteten Proof-of-Work-Architektur von Ethereum hinzugefügt werden soll.

Das Wort Mining stammt aus dem Kontext der Goldanalogie für Kryptowährungen. Gold oder Edelmetalle sind knapp, digitale Token sind es auch, und die einzige Möglichkeit, das Gesamtvolumen in einem Proof-of-Work System zu erhöhen, ist das Mining. Beim Proof-of-Work von Ethereum erfolgte die Ausgabe ausschließlich durch Mining. Im Gegensatz zum Mining von Gold oder Edelmetallen, diente Mining bei Ethereum, durch das Kreieren, Verifizieren, Publizieren und Verteilen von Blocks in der Blockchain, auch der Sicherung des Netzwerkes.

Mining von Ether = Sicherung des Netzwerks

Mining ist das Lebenselixier jeder Proof-of-Work Blockchain. Ethereum-Miner – die Computer, auf denen die Software lief – investierten ihre Zeit und Rechenleistung, um Transaktionen zu verarbeiten und Blöcke zu generieren, bevor der Übergang zu Proof-of-Stake erfolgte.

## Warum gibt es Miner? {#why-do-miners-exist}

In dezentralisierten Systemen wie Ethereum müssen wir sicherstellen, dass jeder mit der Reihenfolge der Transaktionen einverstanden ist. Miner halfen dabei, indem sie rechnerisch schwierige Puzzles lösten, um Blöcke zu produzieren und dabei das Netzwerk vor Attacken zu schützen.

[Mehr zu Proof-of-Work](/developers/docs/consensus-mechanisms/pow/)

Zuvor war es jedem möglich, mit dem eigenen Computer im Ethereum-Netzwerk zu minen. Allerdings konnte nicht jeder profitabel Ether (ETH) minen. In den meisten Fällen mussten Miner dedizierte Computer-Hardware kauften und Zugang zu günstigen Energiequellen haben. Es war unwahrscheinlich, dass ein durchschnittlicher Computer genug Blockbelohnungen verdienen konnte, um die Kosten für das Mining zu kompensieren.

### Mining-Kosten {#cost-of-mining}

- Mögliche Kosten für die Hardware, die für den Bau und die Wartung einer Mining-Anlage erforderlich ist
- Stromkosten für den Betrieb der Mining-Anlage
- Wenn man Miner in einem Pool war, erhob der Pool üblicherweise eine pauschale prozentuale Gebühr für jeden im Pool generierten Block
- Mögliche Kosten für die Ausrüstung zur Unterstützung der Mining-Anlage (Belüftung, Energieüberwachung, elektrische Verkabelung usw.)

Um die Rentabilität des Minings weiterzuerkunden, können Sie einen Mining-Rechner verwenden, beispielsweise den von [Etherscan](https://etherscan.io/ether-mining-calculator).

## Wie Ethereum-Transaktionen gemint wurden {#how-ethereum-transactions-were-mined}

Im Folgenden wird ein Überblick darüber gegeben, wie Transaktionen in Ethereum-Proof-of-Work gemint wurden. Eine analoge Beschreibung dieses Prozesses für Ethereum-Proof-of-Stake finden Sie [hier](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos).

1. Ein Benutzer schreibt und signiert eine Anfrage für eine [Transaktion](/developers/docs/transactions/) mit seinem privaten Schlüssel von einem [Konto](/developers/docs/accounts/).
2. Der Benutzer überträgt die Transaktionsanfrage von einigen [Nodes](/developers/docs/nodes-and-clients/) an das gesamte Ethereum-Netzwerk.
3. Wenn sie von der neuen Transaktionsanfrage hören, fügen alle Nodes die Anfrage ihrem lokalen Mempool (eine Liste aller Transaktionsanfragen, die noch nicht an die Blockchain übertragen wurden, von denen sie gehört haben) hinzu.
4. Irgendwann fasst ein Mining-Node mehrere Dutzend oder Hundert Transaktionsanfragen in einem potenziellen [Block](/developers/docs/blocks/) zusammen, sodass die [Transaktionsentgelte](/developers/docs/gas/), die sie verdienen, maximiert werden, während sie unter dem Block-Ressourcen-Limit bleiben. Zu diesem Zeitpunkt tut der Mining-Node Folgendes:
   1. Er überprüft die Gültigkeit jeder Transaktionsanfrage (z. B. es versucht keiner, die Ether von einem Konto ohne Signatur zu transferieren, die Anfrage ist nicht fehlerhaft etc.), führt dann den Code der Anfrage aus und ändert den Status ihrer lokalen Kopie der EVM. Die Miner erhalten die Transaktionsentgelte für jede dieser Transaktionsanfragen auf ihr eigenes Konto.
   2. Startet den Prozess der Erstellung des Proof-of-Work "Nachweiszertifikat der Legitimität" für den potenziellen Block, sobald alle Transaktionsanfragen in dem Block verifiziert und in der lokalen EVM-Kopie ausgeführt wurden.
5. Letztendlich wird ein Miner ein Zertifikat für einen Block erstellen, der unsere spezifische Transaktionsanfrage enthält. Dieser Miner sendet dann den vollendeten Block, der das Zertifikat und eine Prüfsumme des beanspruchten neuen EVM-Status enthält.
6. Andere Nodes hören von dem neuen Block. Sie prüfen das Zertifikat, führen alle Transaktionen in dem Block selbst aus (einschließlich der ursprünglich von unserem Nutzer übermittelten Transaktion) und überprüfen, ob die Prüfsumme von ihrem neuem EVM-Status nach der Ausführung aller Transaktionen mit der Prüfsumme aus dem vom Miner-Block selbst behaupteten Status übereinstimmt. Nur dann fügen diese Nodes den Block an den Schwanz ihrer Blockchain an und akzeptieren den neuen EVM-Status als kanonischen Status.
7. Jeder Node entfernt alle Transaktionen in dem neuen Block aus seinem lokalen Mempool aus unerfüllten Transaktionsanfragen.
8. Neue Knoten, die dem Netzwerk beitreten, laden alle Blöcke in Reihenfolge herunter, einschließlich des Blocks mit der von uns vefolgten Transaktion. Sie initialisieren eine lokale EVM-Kopie (diese startet als ein leerer EVM-Status), gehen dann durch den Ausführungsprozess jeder Transaktion in jedem Block an der Spitze der lokalen EVM-Kopie und überprüfen dabei in jedem Block die Prüfsummenstatus.

Jede Transaktion wird einmal gemint (in einen neuen Block eingeschlossen und zum ersten Mal propagiert), aber von jedem Teilnehmer im Prozess der Weitergabe des kanonischen EVM-Status ausgeführt und verifiziert. Dies hebt eines der wichtigsten Mantras der Blockchain hervor: **Nicht vertrauen – prüfen**.

## Ommer(Onkel)-Blöcke {#ommer-blocks}

Das Mining von Blöcken bei Proof-of-Work war probabilistisch, was bedeutet, dass manchmal aufgrund von Netzwerklatenz gleichzeitig zwei gültige Blöcke veröffentlicht wurden. In diesem Fall musste das Protokoll die längste (und daher „gültigste“) Kette bestimmen und gleichzeitig Fairness gegenüber den Minern gewährleisten, indem es den vorgeschlagenen, aber nicht einbezogenen gültigen Block teilweise belohnte. Das förderte eine weitere Dezentralisierung des Netzwerks, da kleinere Miner, die möglicherweise mit größerer Latenz konfrontiert sind, immer noch Erträge durch [Ommer](/glossary/#ommer)-Blockbelohnungen generieren konnten.

Der Begriff „Ommer" ist der bevorzugte geschlechtsneutrale Begriff für das Geschwisterteil eines Elternblocks, aber manchmal ist auch die Rede von „Onkel". **Seit dem Übergang von Ethereum zu Proof-of-Stake werden keine Ommer-Blöcke mehr gemint**, da in jedem Slot nur ein Vorschlaggeber gewählt wird. Sie können diese Veränderung im [Geschichtsdiagramm](https://ycharts.com/indicators/ethereum_uncle_rate) der geminten Ommer-Blöcke einsehen.

## Eine visuelle Demo {#a-visual-demo}

Sehen Sie Austin bei einer Führung durch das Mining und die Proof-of-Work-Blockchain zu.

<YouTube id="zcX7OJ-L8XQ" />

## Der Mining-Algorithmus {#mining-algorithm}

Das Ethereum-Mainnet hat immer nur einen Mining-Algorithmus verwendet – [„Ethash“](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/). Ethash war der Nachfolger eines ursprünglichen Algorithmus für Forschung und Entwicklung namens [„Dagger-Hashimoto“](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/).

[Mehr über Mining-Algorithmen](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/).

## Verwandte Themen {#related-topics}

- [Ressourcen](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Proof-of-Work (Arbeitsnachweis)](/developers/docs/consensus-mechanisms/pow/)
