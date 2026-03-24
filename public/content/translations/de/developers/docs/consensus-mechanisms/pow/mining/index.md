---
title: Mining
description: "Eine Erklärung, wie Mining auf Ethereum funktionierte."
lang: de
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
Proof-of-Work liegt dem Konsensmechanismus von Ethereum nicht mehr zugrunde, was bedeutet, dass das Mining abgeschaltet wurde. Stattdessen wird [Ethereum](/) durch Validatoren gesichert, die ETH staken. Sie können noch heute mit dem Staking Ihrer ETH beginnen. Lesen Sie mehr über <a href='/roadmap/merge/'>The Merge</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>Proof-of-Stake</a> und <a href='/staking/'>Staking</a>. Diese Seite ist nur von historischem Interesse.
</AlertDescription>
</AlertContent>
</Alert>

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir Ihnen, sich zunächst über [Transaktionen](/developers/docs/transactions/), [Blöcke](/developers/docs/blocks/) und [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/) zu informieren.

## Was ist Ethereum-Mining? {#what-is-ethereum-mining}

Mining ist der Prozess der Erstellung eines Blocks von Transaktionen, der der Ethereum-Blockchain in der nun veralteten Proof-of-Work-Architektur von Ethereum hinzugefügt wird.

Das Wort Mining stammt aus dem Kontext der Goldanalogie für Kryptowährungen. Gold oder Edelmetalle sind knapp, ebenso wie digitale Token, und die einzige Möglichkeit, das Gesamtvolumen in einem Proof-of-Work-System zu erhöhen, ist durch Mining. Im Proof-of-Work-Ethereum war die einzige Art der Emission das Mining. Im Gegensatz zu Gold oder Edelmetallen war das Ethereum-Mining jedoch auch die Methode, um das Netzwerk zu sichern, indem Blöcke in der Blockchain erstellt, verifiziert, veröffentlicht und verbreitet wurden.

Ether minen = Das Netzwerk sichern

Mining ist das Lebenselixier jeder Proof-of-Work-Blockchain. Ethereum-Miner – Computer, auf denen Software läuft – nutzten vor dem Übergang zu Proof-of-Stake ihre Zeit und Rechenleistung, um Transaktionen zu verarbeiten und Blöcke zu produzieren.

## Warum gibt es Miner? {#why-do-miners-exist}

In dezentralisierten Systemen wie Ethereum müssen wir sicherstellen, dass sich alle über die Reihenfolge der Transaktionen einig sind. Miner halfen dabei, indem sie rechenintensive Rätsel lösten, um Blöcke zu produzieren und das Netzwerk vor Angriffen zu sichern.

[Mehr zu Proof-of-Work](/developers/docs/consensus-mechanisms/pow/)

Zuvor konnte jeder mit seinem Computer im Ethereum-Netzwerk minen. Allerdings konnte nicht jeder Ether (ETH) profitabel minen. In den meisten Fällen mussten Miner spezielle Computerhardware kaufen und Zugang zu günstigen Energiequellen haben. Der durchschnittliche Computer verdiente wahrscheinlich nicht genug Block-Belohnungen, um die mit dem Mining verbundenen Kosten zu decken.

### Kosten des Minings {#cost-of-mining}

- Potenzielle Kosten für die Hardware, die zum Bau und zur Wartung eines Mining-Rigs erforderlich ist
- Stromkosten für den Betrieb des Mining-Rigs
- Wenn Sie in einem Pool gemint haben, berechneten diese Pools in der Regel eine pauschale prozentuale Gebühr für jeden vom Pool generierten Block
- Potenzielle Kosten für Ausrüstung zur Unterstützung des Mining-Rigs (Belüftung, Energieüberwachung, elektrische Verkabelung usw.)

Um die Rentabilität des Minings weiter zu untersuchen, verwenden Sie einen Mining-Rechner, wie ihn [Etherscan](https://etherscan.io/ether-mining-calculator) anbietet.

## Wie Ethereum-Transaktionen gemint wurden {#how-ethereum-transactions-were-mined}

Im Folgenden finden Sie einen Überblick darüber, wie Transaktionen im Ethereum-Proof-of-Work gemint wurden. Eine analoge Beschreibung dieses Prozesses für Ethereum-Proof-of-Stake finden Sie [hier](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos).

1. Ein Benutzer schreibt und signiert eine [Transaktionsanfrage](/developers/docs/transactions/) mit dem Private-Key eines [Kontos](/developers/docs/accounts/).
2. Der Benutzer sendet die Transaktionsanfrage von einem [Blockchain-Knoten](/developers/docs/nodes-and-clients/) an das gesamte Ethereum-Netzwerk.
3. Sobald ein Blockchain-Knoten im Ethereum-Netzwerk von der neuen Transaktionsanfrage erfährt, fügt er die Anfrage seinem lokalen Mempool hinzu, einer Liste aller Transaktionsanfragen, von denen er gehört hat und die noch nicht in einem Block in die Blockchain aufgenommen wurden.
4. Irgendwann fasst ein Mining-Knoten mehrere Dutzend oder Hundert Transaktionsanfragen zu einem potenziellen [Block](/developers/docs/blocks/) zusammen, und zwar so, dass die [Transaktionsgebühren](/developers/docs/gas/), die er verdient, maximiert werden, während er gleichzeitig unter das Gaslimit des Blocks fällt. Der Mining-Knoten führt dann Folgendes aus:
   1. Er verifiziert die Gültigkeit jeder Transaktionsanfrage (d. h. niemand versucht, Ether von einem Konto zu überweisen, für das er keine Signatur erstellt hat, die Anfrage ist nicht fehlerhaft usw.) und führt dann den Code der Anfrage aus, wodurch der Zustand seiner lokalen Kopie der EVM geändert wird. Der Miner schreibt die Transaktionsgebühr für jede dieser Transaktionsanfragen seinem eigenen Konto gut.
   2. Er beginnt mit dem Prozess der Erstellung des Proof-of-Work-„Legitimitätszertifikats“ für den potenziellen Block, sobald alle Transaktionsanfragen im Block verifiziert und auf der lokalen EVM-Kopie ausgeführt wurden.
5. Schließlich wird ein Miner die Erstellung eines Zertifikats für einen Block abschließen, der unsere spezifische Transaktionsanfrage enthält. Der Miner sendet dann den fertigen Block, der das Zertifikat und eine Prüfsumme des behaupteten neuen EVM-Zustands enthält.
6. Andere Blockchain-Knoten erfahren von dem neuen Block. Sie verifizieren das Zertifikat, führen alle Transaktionen auf dem Block selbst aus (einschließlich der ursprünglich von unserem Benutzer gesendeten Transaktion) und verifizieren, dass die Prüfsumme ihres neuen EVM-Zustands nach der Ausführung aller Transaktionen mit der Prüfsumme des vom Block des Miners behaupteten Zustands übereinstimmt. Erst dann hängen diese Blockchain-Knoten diesen Block an das Ende ihrer Blockchain an und akzeptieren den neuen EVM-Zustand als den kanonischen Zustand.
7. Jeder Blockchain-Knoten entfernt alle Transaktionen im neuen Block aus seinem lokalen Mempool unerfüllter Transaktionsanfragen.
8. Neue Blockchain-Knoten, die dem Netzwerk beitreten, laden alle Blöcke nacheinander herunter, einschließlich des Blocks, der unsere interessante Transaktion enthält. Sie initialisieren eine lokale EVM-Kopie (die als EVM mit leerem Zustand beginnt) und durchlaufen dann den Prozess der Ausführung jeder Transaktion in jedem Block auf ihrer lokalen EVM-Kopie, wobei sie die Zustandsprüfsummen bei jedem Block auf dem Weg verifizieren.

Jede Transaktion wird einmal gemint (in einen neuen Block aufgenommen und zum ersten Mal verbreitet), aber von jedem Teilnehmer im Prozess der Weiterentwicklung des kanonischen EVM-Zustands ausgeführt und verifiziert. Dies unterstreicht eines der zentralen Mantras der Blockchain: **Nicht vertrauen, verifizieren** (Don’t trust, verify).

## Ommer- (Uncle-) Blöcke {#ommer-blocks}

Das Block-Mining bei Proof-of-Work war probabilistisch, was bedeutet, dass aufgrund von Netzwerklatenz manchmal zwei gültige Blöcke gleichzeitig veröffentlicht wurden. In diesem Fall musste das Protokoll die längste (und damit „gültigste“) Kette bestimmen und gleichzeitig Fairness gegenüber den Minern gewährleisten, indem der vorgeschlagene, aber nicht aufgenommene gültige Block teilweise belohnt wurde. Dies förderte die weitere Dezentralisierung des Netzwerks, da kleinere Miner, die möglicherweise mit einer größeren Latenz konfrontiert waren, dennoch Erträge über [Ommer](/glossary/#ommer)-Block-Belohnungen erzielen konnten.

Der Begriff „Ommer“ ist der bevorzugte geschlechtsneutrale Begriff für das Geschwisterkind eines Elternblocks, wird aber manchmal auch als „Uncle“ (Onkel) bezeichnet. **Seit Ethereums Wechsel zu Proof-of-Stake werden Ommer-Blöcke nicht mehr gemint**, da in jedem Slot nur ein Block-Vorschlagender gewählt wird. Sie können diese Änderung sehen, indem Sie sich das [historische Diagramm](https://ycharts.com/indicators/ethereum_uncle_rate) der geminten Ommer-Blöcke ansehen.

## Eine visuelle Demo {#a-visual-demo}

Sehen Sie zu, wie Austin Sie durch das Mining und die Proof-of-Work-Blockchain führt.

<YouTube id="zcX7OJ-L8XQ" />

## Der Mining-Algorithmus {#mining-algorithm}

Das Ethereum-Mainnet verwendete immer nur einen Mining-Algorithmus – ['Ethash'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/). Ethash war der Nachfolger eines ursprünglichen F&E-Algorithmus, der als ['Dagger-Hashimoto'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/) bekannt ist.

[Mehr zu Mining-Algorithmen](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/).

## Verwandte Themen {#related-topics}

- [Gas](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/)