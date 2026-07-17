---
title: Mining
description: "Eine Erklärung, wie Mining auf Ethereum funktionierte."
lang: de
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
Proof-of-Work (PoW) liegt dem Konsensmechanismus von Ethereum nicht mehr zugrunde, was bedeutet, dass das Mining abgeschaltet wurde. Stattdessen wird [Ethereum](/) durch Validatoren gesichert, die ETH staken. Du kannst noch heute damit beginnen, deine ETH zu staken. Lies mehr über <a href='/roadmap/merge/'>den Merge</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>Proof-of-Stake (PoS)</a> und <a href='/staking/'>Staking</a>. Diese Seite ist nur von historischem Interesse.
</AlertDescription>
</AlertContent>
</Alert>

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir dir, dich zunächst über [Transaktionen](/developers/docs/transactions/), [Blöcke](/developers/docs/blocks/) und [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/) zu informieren.

## Was ist Ethereum-Mining? {#what-is-ethereum-mining}

Mining ist der Prozess der Erstellung eines Blocks von Transaktionen, der der Ethereum-Blockchain in der nun veralteten Proof-of-Work-Architektur von Ethereum hinzugefügt wird.

Das Wort Mining stammt aus dem Kontext der Gold-Analogie für Kryptowährungen. Gold oder Edelmetalle sind knapp, ebenso wie digitale Token, und der einzige Weg, das Gesamtvolumen in einem Proof-of-Work-System zu erhöhen, ist durch Mining. Im Proof-of-Work-Ethereum war die einzige Art der Emission das Mining. Im Gegensatz zu Gold oder Edelmetallen war das Ethereum-Mining jedoch auch der Weg, das Netzwerk zu sichern, indem Blöcke in der Blockchain erstellt, verifiziert, veröffentlicht und verbreitet wurden.

Ether minen = Das Netzwerk sichern

Mining ist das Lebenselixier jeder Proof-of-Work-Blockchain. Ethereum-Miner – Computer, auf denen Software läuft – nutzten vor dem Übergang zu Proof-of-Stake ihre Zeit und Rechenleistung, um Transaktionen zu verarbeiten und Blöcke zu produzieren.

## Warum gibt es Miner? {#why-do-miners-exist}

In dezentralen Systemen wie Ethereum müssen wir sicherstellen, dass sich alle über die Reihenfolge der Transaktionen einig sind. Miner halfen dabei, indem sie rechenintensive Rätsel lösten, um Blöcke zu produzieren und das Netzwerk vor Angriffen zu schützen.

[Mehr zu Proof-of-Work](/developers/docs/consensus-mechanisms/pow/)

Zuvor konnte jeder mit seinem Computer im Ethereum-Netzwerk minen. Allerdings konnte nicht jeder profitabel Ether (ETH) minen. In den meisten Fällen mussten Miner spezielle Computerhardware kaufen und Zugang zu günstigen Energiequellen haben. Der durchschnittliche Computer verdiente wahrscheinlich nicht genug Blockbelohnungen, um die mit dem Mining verbundenen Kosten zu decken.

### Kosten des Minings {#cost-of-mining}

- Potenzielle Kosten für die Hardware, die zum Bau und zur Wartung eines Mining-Rigs erforderlich ist
- Stromkosten für den Betrieb des Mining-Rigs
- Wenn du in einem Pool gemint hast, berechneten diese Pools in der Regel eine pauschale prozentuale Gebühr für jeden vom Pool generierten Block
- Potenzielle Kosten für Ausrüstung zur Unterstützung des Mining-Rigs (Belüftung, Energieüberwachung, elektrische Verkabelung usw.)

Um die Rentabilität des Minings weiter zu untersuchen, verwende einen Mining-Rechner, wie ihn [Etherscan](https://etherscan.io/ether-mining-calculator) anbietet.

## Wie Ethereum-Transaktionen gemint wurden {#how-ethereum-transactions-were-mined}

Im Folgenden wird ein Überblick darüber gegeben, wie Transaktionen im Ethereum-Proof-of-Work gemint wurden. Eine analoge Beschreibung dieses Prozesses für Ethereum-Proof-of-Stake findest du [hier](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos).

1. Ein Benutzer schreibt und signiert eine [Transaktionsanfrage](/developers/docs/transactions/) mit dem privaten Schlüssel eines [Kontos](/developers/docs/accounts/).
2. Der Benutzer sendet die Transaktionsanfrage von einem [Knoten](/developers/docs/nodes-and-clients/) an das gesamte Ethereum-Netzwerk.
3. Sobald ein Knoten im Ethereum-Netzwerk von der neuen Transaktionsanfrage erfährt, fügt er die Anfrage seinem lokalen Mempool hinzu, einer Liste aller Transaktionsanfragen, von denen er gehört hat und die noch nicht in einem Block in die Blockchain aufgenommen wurden.
4. Irgendwann fasst ein Mining-Knoten mehrere Dutzend oder Hundert Transaktionsanfragen zu einem potenziellen [Block](/developers/docs/blocks/) zusammen, und zwar so, dass die [Transaktionsgebühren](/developers/docs/gas/), die er verdient, maximiert werden, während er gleichzeitig unter dem Block-Gaslimit bleibt. Der Mining-Knoten führt dann Folgendes aus:
   1. Er verifiziert die Gültigkeit jeder Transaktionsanfrage (d. h. niemand versucht, Ether von einem Konto zu transferieren, für das er keine Signatur erstellt hat, die Anfrage ist nicht fehlerhaft usw.) und führt dann den Code der Anfrage aus, wodurch der Zustand seiner lokalen Kopie der EVM geändert wird. Der Miner schreibt die Transaktionsgebühr für jede dieser Transaktionsanfragen seinem eigenen Konto gut.
   2. Er beginnt mit dem Prozess der Erstellung des Proof-of-Work-„Legitimitätszertifikats“ für den potenziellen Block, sobald alle Transaktionsanfragen im Block verifiziert und auf der lokalen EVM-Kopie ausgeführt wurden.
5. Schließlich wird ein Miner die Erstellung eines Zertifikats für einen Block abschließen, der unsere spezifische Transaktionsanfrage enthält. Der Miner sendet dann den fertigen Block, der das Zertifikat und eine Prüfsumme des behaupteten neuen EVM-Zustands enthält.
6. Andere Knoten erfahren von dem neuen Block. Sie verifizieren das Zertifikat, führen alle Transaktionen im Block selbst aus (einschließlich der ursprünglich von unserem Benutzer gesendeten Transaktion) und überprüfen, ob die Prüfsumme ihres neuen EVM-Zustands nach der Ausführung aller Transaktionen mit der Prüfsumme des vom Block des Miners behaupteten Zustands übereinstimmt. Erst dann hängen diese Knoten diesen Block an das Ende ihrer Blockchain an und akzeptieren den neuen EVM-Zustand als den kanonischen Zustand.
7. Jeder Knoten entfernt alle Transaktionen im neuen Block aus seinem lokalen Mempool unerfüllter Transaktionsanfragen.
8. Neue Knoten, die dem Netzwerk beitreten, laden alle Blöcke nacheinander herunter, einschließlich des Blocks, der unsere interessante Transaktion enthält. Sie initialisieren eine lokale EVM-Kopie (die als EVM mit leerem Zustand beginnt) und durchlaufen dann den Prozess der Ausführung jeder Transaktion in jedem Block auf ihrer lokalen EVM-Kopie, wobei sie die Zustandsprüfsummen bei jedem Block auf dem Weg verifizieren.

Jede Transaktion wird einmal gemint (in einen neuen Block aufgenommen und zum ersten Mal verbreitet), aber von jedem Teilnehmer im Prozess der Weiterentwicklung des kanonischen EVM-Zustands ausgeführt und verifiziert. Dies unterstreicht eines der zentralen Mantras der Blockchain: **Nicht vertrauen, verifizieren**.

## Ommer-Blöcke (Uncle-Blöcke) {#ommer-blocks}

Das Block-Mining bei Proof-of-Work war probabilistisch, was bedeutet, dass aufgrund von Netzwerklatenz manchmal zwei gültige Blöcke gleichzeitig veröffentlicht wurden. In diesem Fall musste das Protokoll die längste (und damit „gültigste“) Chain bestimmen und gleichzeitig Fairness gegenüber den Minern gewährleisten, indem der vorgeschlagene, aber nicht aufgenommene gültige Block teilweise belohnt wurde. Dies förderte die weitere Dezentralisierung des Netzwerks, da kleinere Miner, die möglicherweise mit einer größeren Latenz konfrontiert waren, dennoch Erträge über [Ommer-Block](/glossary/#ommer)-Belohnungen erzielen konnten.

Der Begriff „Ommer“ ist der bevorzugte geschlechtsneutrale Begriff für das Geschwisterkind eines Elternblocks, wird aber manchmal auch als „Uncle“ bezeichnet. **Seit Ethereums Wechsel zu Proof-of-Stake werden keine Ommer-Blöcke mehr gemint**, da in jedem Slot nur ein Proposer gewählt wird. Du kannst diese Änderung sehen, indem du dir das [historische Diagramm](https://ycharts.com/indicators/ethereum_uncle_rate) der geminten Ommer-Blöcke ansiehst.

## Eine visuelle Demo {#a-visual-demo}

Sieh dir an, wie Austin dich durch das Mining und die Proof-of-Work-Blockchain führt.

<VideoWatch slug="blockchain-eth-build" />

## Der Mining-Algorithmus {#mining-algorithm}

Das Ethereum Mainnet hat immer nur einen Mining-Algorithmus verwendet – ['Ethash'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/). Ethash war der Nachfolger eines ursprünglichen F&E-Algorithmus, der als ['Dagger-Hashimoto'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/) bekannt ist.

[Mehr zu Mining-Algorithmen](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/).

## Verwandte Themen {#related-topics}

- [Gas](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/)