---
title: Proof-of-Work (PoW)
description: Eine Erklärung für das Proof-of-Work-Konsensprotokoll und seine Rolle in Ethereum.
lang: de
---

Das Ethereum-Netzwerk hat zu Beginn einen Konsensmechanismus verwendet, der **[Proof-of-Work (PoW)](/developers/docs/consensus-mechanisms/pow)** beinhaltete. Das ermöglichte es den Nodes des Ethereum-Netzwerks, sich über den Status aller auf der Ethereum-Blockchain gespeicherten Informationen zu einigen, und verhinderte bestimmte Arten von wirtschaftlichen Angriffen. 2022 hat Ethereum jedoch Proof-of-Work abgeschaltet und stattdessen begonnen, [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos) zu verwenden.

<InfoBanner emoji=":wave:">
    Proof-of-Work ist inzwischen veraltet. Ethereum verwendet Proof-of-Work nicht mehr als Teil seines Konsensmechanismus. Stattdessen nutzt Ethereum Proof-of-Stake. Lesen Sie mehr über <a href="/developers/docs/consensus-mechanisms/pos/">Proof-of-Stake</a> und <a href="/staking/">Staking</a>.
</InfoBanner>

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir Ihnen, zuerst etwas über [Transaktionen](/developers/docs/transactions/), [Blöcke](/developers/docs/blocks/) und [Konsensmechanismen](/developers/docs/consensus-mechanisms/) zu lesen.

## Was ist Proof-of-Work (PoW)? {#what-is-pow}

Der Nakamoto-Konsens, der Proof-of-Work nutzt, ist der Mechanismus, der es dem dezentralisierten Ethereum-Netzwerk früher ermöglichte, einen Konsens zu erzielen (d. h., alle Knoten stimmen überein) – beispielsweise über Kontostände und die Reihenfolge von Transaktionen. Das verhinderte, dass Benutzer ihre Münzen „doppelt ausgeben“ konnten, und stellte sicher, dass die Ethereum-Kette extrem schwierig anzugreifen oder zu manipulieren war. Diese Sicherheitseigenschaften stammen jetzt stattdessen von Proof-of-Stake – unter Verwendung des Konsensmechanismus [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/).

## Proof-of-Work und Mining {#pow-and-mining}

Proof-of-Work ist der grundlegende Algorithmus, der den Schwierigkeitsgrad und die Regeln für die Arbeit der Miner bei Proof-of-Work-Blockchains festlegt. Mining ist die „Work“ (Arbeit) selbst. Es ist das Hinzufügen von gültigen Blöcken zur Kette. Das ist wichtig, da die Länge der Kette dem Netzwerk hilft, der richtigen Abzweigung der Blockchain zu folgen. Je mehr „Work“ erledigt ist, desto länger die Kette, und je höher die Blockzahl, desto sicherer kann das Netzwerk bezüglich des aktuellen Status sein.

[Mehr über Mining](/developers/docs/consensus-mechanisms/pow/mining/)

## Wie funktionierte Ethereums Proof-of-Work? {#how-it-works}

Ethereums Transaktionen werden zu Blöcken verarbeitet. Im mittlerweile veralteten Proof-of-Work-Ethereum enthielt jeder Block:

- einen Block-Schwierigkeitsgrad – zum Beispiel: 3.324.092.183.262.715,
- einen mixHash – zum Beispiel, `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`,
- eine Nonce – zum Beispiel: `0xd3ee432b4fb3d26b`.

Diese Blockdaten standen in direktem Zusammenhang zu Proof-of-Work.

### Die "Arbeit" (Work) in Proof-of-Work {#the-work}

Ethash, das Proof-of-Work-Protokoll, verlangte von Minern, dass sie sich an einem intensiven Trial-and-Error-Wettlauf beteiligten, um die Nonce für einen Block zu finden. Nur Blöcke mit einer gültigen Nonce konnten zur Kette hinzugefügt werden.

Während des Wettlaufs zur Erstellung eines Blocks leitete ein Miner einen Datensatz, der nur durch das Herunterladen und Ausführen der vollständigen Kette erlangt werden konnte (wie ein Miner es tut), durch eine mathematische Funktion. Der Datensatz wurde verwendet, um einen mixHash unterhalb eines Ziels zu erzeugen, das durch die Blockschwierigkeit vorgegeben wird. Die beste Herangehensweise dafür ist die Trial-and-Error-Methode.

Die Schwierigkeit bestimmte das Ziel für den Hash. Je niedriger das Ziel, desto kleiner der Satz gültiger Hashes. Einmal generiert war die Verifizierung für andere Miner und Clients unglaublich einfach. Selbst wenn sich eine Transaktion ändern sollte, war der Hash völlig anders und deutete auf Betrug hin.

„Hashing“ macht es leichter, Betrug zu erkennen. Aber auch der Proof-of-Work-Prozess selbst war eine große Abschreckung für Angriffe auf die Chain.

### Sicherheit von Proof-of-Work {#security}

Die Miner wurden dazu angeregt, diese Arbeit auf der Haupt-Kette von Ethereum zu leisten. Für Untergruppen von Minern gab es wenig Anreiz, eine eigene Kette zu starten – das untergräbt das System. Bockchains verlassen sich auf einen einzigen Status als Quelle der Wahrheit.

Das Ziel von Proof-of-Work bestand darin, die Chain zu verlängern. Die Gültigkeit der längsten Kette war am glaubwürdigsten, weil diese den größten Rechenaufwand zur Erzeugung erfordert hatte. Im PoW-System von Ethereum war es nahezu unmöglich, neue Blöcke zu erstellen, die Transaktionen löschen, gefälschte Transaktionen erstellen oder eine zweite Kette aufrechterhalten. Das liegt daran, dass ein bösartiger Miner immer schneller als alle anderen den Nonce des Blocks hätte lösen müssen.

Um konsequent bösartige, aber gültige Blöcke zu erstellen, hätte ein bösartiger Miner über 51 % der Mining-Leistung des Netzwerks benötigt, um alle anderen zu übertreffen. Diese Menge an „Work“ erfordert eine Menge teure Rechenleistung, und der aufgewendete Energieaufwand könnte sogar die bei dem Angriff erzielten Gewinne übersteigen.

### Wirtschaftlichkeit von Proof-of-Work {#economics}

Proof-of-Work war auch dafür verantwortlich, neue Währung in das System einzuspeisen und Miner zur Ausführung der Arbeit zu motivieren.

Seit dem [Konstantinopel-Upgrade](/history/#constantinople) wurden Miner, die erfolgreich einen Block erstellen, mit zwei frisch geprägten ETH und einem Teil der Transaktionsgebühren belohnt. Ommer-Blöcke wurden ebenfalls mit 1,75 ETH vergütet. Ommer-Blöcke waren gültige Blöcke, die von einem Miner praktisch zur selben Zeit erstellt wurden wie ein durch einen anderen Miner erstellter kanonischer Block. Die endgültige Bestimmung erfolgte anhand der Kette, auf die zuerst aufgebaut wurde. Zu Ommer-Blöcken kam es in der Regel durch Netzwerklatenzen.

## Endgültigkeit {#finality}

Eine Transaktion hat bei Ethereum „Endgültigkeit“, wenn sie Teil eines Blocks ist, der sich nicht mehr ändern kann.

Da die Miner dezentral arbeiteten, konnten zwei gültige Blöcke gleichzeitig gemint werden. Das erzeugt eine temporäre Abzweigung. Letztendlich wurde eine dieser Ketten zur akzeptierten Kette, nachdem weitere Blöcke gemint und hinzugefügt wurden, wodurch die Kette länger wurde.

Um es noch komplizierter zu machen, wurden Transaktionen, die auf der temporären Abzweigung abgelehnt wurden, möglicherweise nicht in die akzeptierte Kette aufgenommen. Das bedeutet, dass dies umgekehrt werden konnte. „Endgültigkeit“ bezieht sich also auf die Zeit, die Sie abwarten sollten, bevor Sie eine Transaktion als unumkehrbar betrachten. Unter dem vorherigen Proof-of-Work-Ethereum galt: Je mehr Blöcke auf einem spezifischen Block `N` gemint wurden, desto größer war das Vertrauen, dass die Transaktionen in `N` erfolgreich waren und nicht zurückgesetzt werden. Jetzt, mit Proof-of-Stake, ist die Finalisierung eine explizite Eigenschaft eines Blocks, keine wahrscheinliche.

## Energieverbrauch von Proof-of-Work {#energy}

Ein Hauptkritikpunkt an Proof-of-Work ist die Menge an Energie, die benötigt wird, um das Netzwerk sicher zu halten. Um Sicherheit und Dezentralisierung zu erhalten, verbrauchte Ethereums Proof-of-Work große Mengen an Energie. Kurz vor der Umstellung auf Proof-of-Stake verbrauchten die Ethereum-Miner zusammen etwa 70 TWh/Jahr (ungefähr so viel wie die Tschechische Republik – laut [digiconomist](https://digiconomist.net/) am 18. Juli 2022).

## Vor- und Nachteile {#pros-and-cons}

| Vorteile                                                                                                                                                                                                                                               | Nachteile                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Proof-of-Work ist neutral. Du brauchst keine ETH, um loszulegen, und die Blockbelohnungen erlauben dir von 0 ETH auf einen positiven Kontostand zu kommen. Für [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) brauchst du zu Beginn ETH. | Proof-of-Work verbraucht so viel Energie, dass es schlecht für die Umwelt ist.                                                                        |
| Proof-of-Work ist ein bewährter Konsensmechanismus, der Bitcoin und Ethereum seit vielen Jahren sicher und dezentralisiert macht.                                                                                                                      | Wenn du Mining betreiben willst, brauchst du eine so spezielle Ausrüstung, dass es eine große Investition ist, damit anzufangen.                      |
| Verglichen mit dem Proof-of-Stake ist es relativ einfach zu implementieren.                                                                                                                                                                            | Da immer mehr Rechenleistung benötigt wird, könnten Mining-Pools das Mining-Geschäft dominieren, was zu Zentralisierung und Sicherheitsrisiken führt. |

## Vergleich mit Proof-of-Stake {#compared-to-pos}

Im Großen und Ganzen hat Proof-of-Stake dasselbe Ziel wie Proof-of-Work: dem dezentralen Netzwerk helfen, Konsens auf eine sichere Weise zu erzielen. Es gibt jedoch einige Unterschiede im Prozess und im Personal:

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
- [Proof-of-authority](/developers/docs/consensus-mechanisms/poa/)
