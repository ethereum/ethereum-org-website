---
title: Mining
description: Eine Erklärung, wie "Mining" in Ethereum funktioniert und wie es dazu beiträgt, Ethereum sicher und dezentral zu halten.
lang: de
incomplete: true
---

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir dir, zuerst [Transaktionen](/developers/docs/transactions/), [Blöcke](/developers/docs/blocks/) und [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/) zu lesen.

## Was ist Ethereum-Mining? {#what-is-ethereum-mining}

Mining ist der Prozess zur Erstellung eines Blocks aus Transaktionen, der zur Ethereum-Blockchain hinzugefügt werden soll.

Ethereum verwendet derzeit, genau wie Bitcoin, einen [Proof-of-Work (PoW)](/developers/docs/consensus-mechanisms/pow/)-Konsensmechanismus. Mining ist das Lebenselixier des Proof-of-Work. Ethereum-Miner (Computer, die eine Software ausführen) nutzen ihre Zeit und Rechenleistung zur Verarbeitung von Transaktionen und Erstellung von Blöcken.

<InfoBanner emoji=":wave:">
   Proof-of-Stake wird im Laufe des nächsten Jahres Mining und Proof-of-Work ersetzen. Du kannst schon heute mit dem Staking deiner ETH beginnen. <a href="/abstecken/">Mehr zum Staking</a>    
</InfoBanner>

## Warum gibt es Miner? {#why-do-miners-exist}

In dezentralisierten Systemen wie Ethereum müssen wir sicherstellen, dass jeder mit der Reihenfolge der Transaktionen übereinstimmt. Miner helfen dabei, indem sie rechnerisch schwierige Puzzles lösen, um Blöcke zu erzeugen, welche als Möglichkeit dienen, das Netzwerk vor Angriffen zu schützen.

[Mehr zum Proof-of-Work](/developers/docs/consensus-mechanisms/pow/)

## Wer kann Miner bei Ethereum werden? {#who-can-become-a-miner}

Technisch gesehen kann jeder mit seinem Computer im Ethereum-Netzwerk minen. Allerdings kann nicht jeder Ether (ETH) gewinnbringend minen. In den meisten Fällen müssen Miner spezielle Computerhardware kaufen, um gewinnbringend minen zu können. Zwar kann jeder die Mining-Software auf seinem Computer laufen lassen, doch ist es unwahrscheinlich, dass ein durchschnittlicher Computer genügend Blockprämien erwirtschaftet, um die mit dem Mining verbundenen Kosten zu decken.

### Mining-Kosten {#cost-of-mining}

- Mögliche Kosten für die Hardware, die für den Bau und die Wartung einer Mining-Anlage erforderlich ist
- Stromkosten für den Betrieb der Mining-Anlage
- Wenn Sie in einem Pool minen, erheben die Pools in der Regel eine pauschale Gebühr in Höhe eines Prozentsatzes jedes vom Pool erzeugten Blocks
- Mögliche Kosten für die Ausrüstung zur Unterstützung der Mining-Anlage (Belüftung, Energieüberwachung, elektrische Verkabelung usw.)

Um die Rentabilität des Minings weiter zu erkunden, kannst du einen Mining-Rechner verwenden, wie ihn [Etherscan](https://etherscan.io/ether-mining-calculator) anbietet.

## Wie Ethereum-Transaktionen gemint werden {#how-ethereum-transactions-are-mined}

1. Ein Benutzer schreibt und signiert eine Anfrage für eine [Transaktion](/developers/docs/transactions/) mit seinem privaten Schlüssel von einem [Konto](/developers/docs/accounts/).
2. Der Benutzer überträgt die Transaktionsanfrage von einigen [Nodes](/developers/docs/nodes-and-clients/) an das gesamte Ethereum-Netzwerk.
3. Wenn sie von der neuen Transaktionsanfrage hören, fügen alle Nodes die Anfrage ihrem lokalen Mempool (eine Liste aller Transaktionsanfragen, die noch nicht an die Blockchain übertragen wurden, von denen sie gehört haben) hinzu.
4. Irgendwann fasst ein Mining-Node mehrere Dutzend oder Hundert Transaktionsanfragen in einem potenziellen [Block](/developers/docs/blocks/) zusammen, so dass die [Transaktionsentgelte](/developers/docs/gas/), die sie verdienen, maximiert werden, während sie unter dem Block-Ressourcen-Limit bleiben. Zu diesem Zeitpunkt tut der Mining-Node Folgendes:
   1. Er überprüft die Gültigkeit jeder Transaktionsanfrage (z. B. es versucht keiner, die Ether von einem Konto ohne Signatur zu transferieren, die Anfrage ist nicht fehlerhaft etc.), führt dann den Code der Anfrage aus und ändert den Status ihrer lokalen Kopie der EVM. Die Miner erhalten die Transaktionsentgelte für jede dieser Transaktionsanfragen auf ihr eigenes Konto.
   2. Startet den Prozess der Erstellung des Proof-of-Work "Nachweiszertifikat der Legitimität" für den potenziellen Block, sobald alle Transaktionsanfragen in dem Block verifiziert und in der lokalen EVM-Kopie ausgeführt wurden.
5. Letztendlich wird ein Miner ein Zertifikat für einen Block erstellen, der unsere spezifische Transaktionsanfrage enthält. Dieser Miner sendet dann den vollendeten Block, der das Zertifikat und eine Prüfsumme des beanspruchten neuen EVM-Status enthält.
6. Andere Nodes hören von dem neuen Block. Sie prüfen das Zertifikat, führen alle Transaktionen in dem Block selbst aus (einschließlich der ursprünglich von unserem Nutzer übermittelten Transaktion) und überprüfen, ob die Prüfsumme von ihrem neuem EVM-Status nach der Ausführung aller Transaktionen mit der Prüfsumme aus dem vom Miner-Block selbst behaupteten Status übereinstimmt. Nur dann fügen diese Nodes den Block an den Schwanz ihrer Blockchain an und akzeptieren den neuen EVM-Status als kanonischen Status.
7. Jeder Node entfernt alle Transaktionen in dem neuen Block aus seinem lokalen Mempool aus unerfüllten Transaktionsanfragen.
8. Neue Knoten, die dem Netzwerk beitreten, laden alle Blöcke in Reihenfolge herunter, einschließlich des Blocks mit der von uns vefolgten Transaktion. Sie initialisieren eine lokale EVM-Kopie (diese startet als ein leerer EVM-Status), gehen dann durch den Ausführungsprozess jeder Transaktion in jedem Block an der Spitze der lokalen EVM-Kopie und überprüfen dabei in jedem Block die Prüfsummenstatus.

Jede Transaktion wird einmal gemint (einschließen in einen neuen Block und zum ersten Mal propagiert), aber von jedem Teilnehmer im Prozess der Weiterentwicklung des kanonischen EVM-Zustands mehrfach abgearbeitet und verifiziert. Dies hebt eines der wichtigsten Mantras der Blockchain hervor: **Vertraue nicht, prüfe!**.

## Eine visuelle Demo {#a-visual-demo}

Schaue zu, wie Austin dich durch Mining und die Proof-of-Work-Blockchain führt.

<YouTube id="zcX7OJ-L8XQ" />

## Weiterführende Informationen {#further-reading}

- [Was bedeutet es, Ethereum zu minen?](https://docs.ethhub.io/using-ethereum/mining/) _EthHub_

## Verwandte Tools {#related-tools}

- [Verwandte Themen](https://etherscan.io/stat/miner?range=7&blocktype=blocks)
- [Etherscan-Mining-Rechner](https://etherscan.io/ether-mining-calculator)
- [Minerstat-Mining-Rechner](https://minerstat.com/coin/ETH)

## Verwandte Themen {#related-topics}

- [Gas](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/)
