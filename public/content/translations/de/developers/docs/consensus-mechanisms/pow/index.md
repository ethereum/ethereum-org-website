---
title: Proof-of-Work (PoW)
description: Eine Erklärung für das Proof-of-Work-Konsensprotokoll und seine Rolle in Ethereum.
lang: de
incomplete: true
---

Ethereum verwendet, wie Bitcoin, derzeit ein Konsensprotokoll namens **[Proof-of-Work (PoW)](https://wikipedia.org/wiki/Proof_of_work)**. Dies ermöglicht es den Nodes des Ethereum-Netzwerks, sich über den Stand aller auf der Ethereum-Blockchain aufgezeichneten Informationen zu einigen, und verhindert bestimmte Arten von wirtschaftlichen Angriffen.

Im Laufe des nächsten Jahres wird Proof-of-Work zugunsten von **[Proof-of-Stake (PoS)](/developers/docs/consensus-mechanisms/pos)** auslaufen. Mit dem Übergang zu Proof-of-Stake wird auch das Mining von Ethereum auslaufen. [Mehr zum Merge](/roadmap/merge/)

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir dir, zuerst etwas über [Transaktionen](/developers/docs/transactions/), [Blöcke](/developers/docs/blocks/) und [Konsensmechanismen](/developers/docs/consensus-mechanisms/) zu lesen.

## Was ist Proof-of-Work (PoW)? {#what-is-pow}

Proof-of-Work ist der Mechanismus, der es dem dezentralen Ethereum-Netzwerk ermöglicht, einen Konsens zu finden oder sich auf Dinge wie Kontostände und die Reihenfolge von Transaktionen zu einigen. Dies verhindert, dass die Nutzer/innen ihre Coins doppelt ausgeben, und stellt sicher, dass die Ethereum-Kette nur sehr schwer angegriffen oder manipuliert werden kann.

## Proof-of-Work und Mining {#pow-and-mining}

Proof-of-Work ist der grundlegende Algorithmus, der den Schwierigkeitsgrad und die Regeln für die Arbeit der Miner festlegt. Mining ist die "Arbeit" (Work) selbst. Es ist das Hinzufügen von gültigen Blöcken zur Kette (Chain). Das ist wichtig, denn die Länge der Kette hilft dem Netzwerk, der richtigen Ethereum-Kette zu folgen und den aktuellen Zustand von Ethereum zu verstehen. Je mehr "Arbeit" geleistet wird, desto länger ist die Kette, und je höher die Blocknummer ist, desto sicherer kann sich das Netzwerk über den aktuellen Stand der Dinge sein.

[Mehr zum Mining](/developers/docs/consensus-mechanisms/pow/mining/)

## Wie funktioniert Ethereums Proof-of-Work? {#how-it-works}

Ethereums Transaktionen werden zu Blöcken verarbeitet. Jeder Block hat

- einen Block-Schwierigkeitsgrad – zum Beispiel: 3.324.092.183.262.715,
- einen mixHash – zum Beispiel, `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`,
- eine Nonce – zum Beispiel: `0xd3ee432b4fb3d26b`.

Diese Blockdaten sind direkt mit dem Proof-of-Work verbunden.

### Die "Arbeit" (Work) in Proof-of-Work {#the-work}

Das Proof-of-Work-Protokoll Ethash verlangt von den Minern einen intensiven Wettlauf von Versuch und Irrtum, um die Nonce für einen Block zu finden. Nur Blöcke mit einer gültigen Nonce können der Chain hinzugefügt werden.

Beim Wettlauf zur Erstellung eines Blocks setzt ein Miner wiederholt einen Datensatz, den du nur durch Downloaden und Ausführen der kompletten Chain (wie es ein Miner macht) erhältst, in eine mathematische Funktion ein. Der Datensatz wird verwendet, um einen mixHash unter einer Ziel-Nonce zu generieren, die von der Blockschwierigkeit abhängt. Die beste Methode hierfür ist durch Versuch und Irrtum.

Die Schwierigkeit bestimmt das Ziel für den Hash. Je niedriger das Ziel, desto kleiner ist der Satz gültiger Hashes. Einmal generiert, ist dies für andere Miner und Nutzer/Nutzerinnen unglaublich einfach zu überprüfen. Selbst wenn sich eine Transaktion ändern würde, wäre der Hash völlig anders und würde auf Betrug hindeuten.

"Hashing" macht es leichter, Betrug zu erkennen. Aber Proof-of-Work als Prozess ist auch eine große Abschreckung für Angriffe auf die Kette.

### Sicherheit von Proof-of-Work {#security}

"Minern" wird ein Anreiz geboten, diese Arbeit an der wichtigsten Ethereum-Kette zu leisten. Es gibt einen kleinen Ansporn für einen Teil der Miner, ihre eigene Kette zu starten – dies untergräbt das System. Bockchains sind auf einen einzigen Status als Quelle der Wahrheit angewiesen. Und Benutzer werden immer die längste, "schwerste" Kette auswählen.

Das Ziel des Proof-of-Work ist es, die Kette zu verlängern. Die längste Kette ist am glaubwürdigsten, weil für sie die meisten Berechnungen durchgeführt wurden. Im PoW-System von Ethereum ist es fast unmöglich, neue Blöcke zu erstellen, die Transaktionen löschen, gefälschte Blöcke zu erstellen oder eine zweite Kette zu unterhalten. Das liegt daran, dass ein böswilliger Miner die Block-Nonce immer schneller lösen müsste als alle anderen.

Um ständig bösartige und dennoch gültige Blöcke zu erzeugen, brauchst du über 51 % der Mining-Power im Netzwerk, um alle anderen zu schlagen. Du bräuchtest eine Menge Rechenleistung, um diese Menge an "Work" erledigen zu können. Und die aufgewendete Energie könnte sogar den Gewinn aufwiegen, den du bei einem Angriff erzielen würdest.

### Wirtschaftlichkeit von Proof-of-Work {#economics}

Der Proof-of-Work ist auch dafür verantwortlich, dass neue Währung in das System kommt und die Miner einen Anreiz haben, die Arbeit zu machen.

Miner die erfolgreich einen Block erstellen, werden mit zwei frisch erzeugten ETH belohnt, erhalten aber nicht mehr alle Transaktionsgebühren, da die Grundgebühr verbraucht wird, während die Trinkgeld- und Blockbelohnung an den Miner geht. Ein Miner kann auch 1,75 ETH für einen Onkelblock erhalten. Onkelblöcke sind gültige Blöcke, die von einem Miner praktisch zur gleichen Zeit erstellt wurden, als ein anderer Miner den erfolgreichen Block gemint hat. Onkleblöcke entstehen normalerweise aufgrund von Netzwerklatenz.

## Endgültigkeit {#finality}

Eine Transaktion hat bei Ethereum "Endgültigkeit", wenn sie Teil eines Blocks ist, der sich nicht mehr ändern kann.

Da die Miner dezentral arbeiten, können zwei gültige Blöcke gleichzeitig gemint werden. Dadurch entsteht eine temporäre Abzweigung. Letztendlich wird eine dieser Ketten zur akzeptierten Kette, nachdem ein weiterer Block abgebaut und hinzugefügt wurde, wodurch sie länger wird.

Aber um die Sache noch komplizierter zu machen, können Transaktionen, die bei der temporären Gabelung abgelehnt wurden, in die akzeptierte Kette aufgenommen worden sein. Das bedeutet, dass die Transaktion rückgängig gemacht werden könnte. Die Endgültigkeit bezieht sich also auf die Zeit, die du warten solltest, bevor du eine Transaktion als unumkehrbar betrachtest. Für Ethereum beträgt die empfohlene Zeit sechs Blöcke oder etwas mehr als eine Minute. Nach sechs Blöcken kannst du mit relativer Sicherheit sagen, dass die Transaktion erfolgreich war. Du kannst noch länger auf noch größere Zusicherungen warten.

Die Endgültigkeit ist etwas, das du beim Entwerfen von Dapps beachten solltest. Es wäre ein schlechtes Nutzererlebnis, wenn du für deine Nutzer/Nutzerinnen die Transaktionsinformationen falsch darstellst, vor allem wenn die Transaktion einen hohen Wert hat.

Denke daran, dass diese Zeitspanne nicht die Wartezeiten beinhaltet, bis eine Transaktion von einem Miner abgeholt wird.

## Energieverbrauch von Proof-of-Work {#energy}

Ein Hauptkritikpunkt an Proof-of-Work ist die Menge an Energie, die benötigt wird, um das Netzwerk sicher zu halten. Um die Sicherheit und Dezentralisierung aufrechtzuerhalten, verbraucht Ethereum mit Proof-of-Work jährlich 73,2 TWh, was dem Energieäquivalent eines mittelgroßen Landes wie Österreich entspricht.

## Vor- und Nachteile {#pros-and-cons}

| Vorteile                                                                                                                                                                                                                                               | Nachteile                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Proof-of-Work ist neutral. Du brauchst keine ETH, um loszulegen, und die Blockbelohnungen erlauben dir von 0 ETH auf einen positiven Kontostand zu kommen. Für [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) brauchst du zu Beginn ETH. | Proof-of-Work verbraucht so viel Energie, dass es schlecht für die Umwelt ist.                                                                        |
| Proof-of-Work ist ein bewährter Konsensmechanismus, der Bitcoin und Ethereum seit vielen Jahren sicher und dezentralisiert macht.                                                                                                                      | Wenn du Mining betreiben willst, brauchst du eine so spezielle Ausrüstung, dass es eine große Investition ist, damit anzufangen.                      |
| Verglichen mit dem Proof-of-Stake ist es relativ einfach zu implementieren.                                                                                                                                                                            | Da immer mehr Rechenleistung benötigt wird, könnten Mining-Pools das Mining-Geschäft dominieren, was zu Zentralisierung und Sicherheitsrisiken führt. |

## Vergleich mit Proof-of-Stake {#compared-to-pos}

Im Großen und Ganzen hat der Proof-of-Stake dasselbe Ziel wie der Proof-of-Work: dem dezentralen Netzwerk zu helfen, sicher einen Konsens zu erreichen. Aber er hat einige Unterschiede im Prozess und im Personal:

- Der Proof-of-Stake hebt die Bedeutung der Rechenleistung für die eingesetzte ETH auf.
- Beim Proof-of-Stake werden die Miner durch Validatoren ersetzt. Validatoren setzen ihre ETH ein ("Staking"), um die Fähigkeit, neue Blöcke zu erstellen, zu aktivieren.
- Validatoren konkurrieren nicht um Blöcke, sondern werden zufällig durch einen Algorithmus ausgewählt.
- Die Endgültigkeit ist klarer: Wenn sich 2/3 der Prüfer/Prüferinnen an bestimmten Kontrollpunkten über den Zustand des Blocks einig sind, gilt er als endgültig. Die Validatoren müssen ihren gesamten Einsatz darauf setzen. Wenn sie also versuchen, sich abzusprechen, verlieren sie ihren gesamten Einsatz.

[Mehr über Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/)

## Eher ein visueller Lerner? {#visual-learner}

<YouTube id="3EUAcxhuoU4" />

## Weiterführende Informationen {#further-reading}

- [Mehrheitsangriff](https://en.bitcoin.it/wiki/Majority_attack)
- [Zur Endgültigkeit der Abrechnung](https://blog.ethereum.org/2016/05/09/on-settlement-finality/)

### Videos {#videos}

- [Eine technische Erklärung von Proof-of-Work-Protokollen](https://youtu.be/9V1bipPkCTU)

## Verwandte Themen {#related-topics}

- [Mining](/developers/docs/consensus-mechanisms/pow/mining/)
- [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/)
