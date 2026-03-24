---
title: Proof-of-Work (PoW)
description: "Eine Erklärung des Proof-of-Work-Konsensprotokolls und seiner Rolle in Ethereum."
lang: de
---

Das [Ethereum](/)-Netzwerk nutzte zu Beginn einen Konsensmechanismus, der **[Proof-of-Work (PoW)](/developers/docs/consensus-mechanisms/pow)** beinhaltete. Dies ermöglichte es den Blockchain-Knoten des Ethereum-Netzwerks, sich auf den Zustand aller auf der Ethereum-Blockchain aufgezeichneten Informationen zu einigen, und verhinderte bestimmte Arten von wirtschaftlichen Angriffen. Ethereum hat Proof-of-Work jedoch im Jahr 2022 abgeschaltet und stattdessen auf [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos) umgestellt.

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
    Proof-of-Work ist nun veraltet. Ethereum verwendet Proof-of-Work nicht mehr als Teil seines Konsensmechanismus. Stattdessen wird Proof-of-Stake verwendet. Lesen Sie mehr über [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) und [Staking](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir Ihnen, sich zunächst über [Transaktionen](/developers/docs/transactions/), [Blöcke](/developers/docs/blocks/) und [Konsensmechanismen](/developers/docs/consensus-mechanisms/) zu informieren.

## Was ist Proof-of-Work (PoW)? {#what-is-pow}

Der Nakamoto-Konsens, der Proof-of-Work nutzt, ist der Mechanismus, der es dem dezentralisierten Ethereum-Netzwerk einst ermöglichte, einen Konsens (d. h. alle Blockchain-Knoten stimmen überein) über Dinge wie Kontostände und die Reihenfolge von Transaktionen zu erzielen. Dies hinderte Benutzer daran, ihre Coins "doppelt auszugeben" (Double Spending), und stellte sicher, dass die Ethereum-Chain extrem schwer anzugreifen oder zu manipulieren war. Diese Sicherheitseigenschaften stammen nun stattdessen von Proof-of-Stake unter Verwendung des Konsensmechanismus namens [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/).

## Proof-of-Work und Mining {#pow-and-mining}

Proof-of-Work ist der zugrunde liegende Algorithmus, der die Schwierigkeit und die Regeln für die Arbeit festlegt, die Miner auf Proof-of-Work-Blockchains leisten. Mining ist die "Arbeit" selbst. Es ist der Vorgang, der Chain gültige Blöcke hinzuzufügen. Dies ist wichtig, da die Länge der Chain dem Netzwerk hilft, dem richtigen Fork der Blockchain zu folgen. Je mehr "Arbeit" geleistet wird, desto länger ist die Chain, und je höher die Blocknummer, desto sicherer kann sich das Netzwerk über den aktuellen Zustand der Dinge sein.

[Mehr über Mining](/developers/docs/consensus-mechanisms/pow/mining/)

## Wie funktionierte Ethereums Proof-of-Work? {#how-it-works}

Ethereum-Transaktionen werden in Blöcken verarbeitet. Im nun veralteten Proof-of-Work-Ethereum enthielt jeder Block:

- Blockschwierigkeit (block difficulty) – zum Beispiel: 3.324.092.183.262.715
- mixHash – zum Beispiel: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- Nonce – zum Beispiel: `0xd3ee432b4fb3d26b`

Diese Blockdaten standen in direktem Zusammenhang mit Proof-of-Work.

### Die Arbeit in Proof-of-Work {#the-work}

Das Proof-of-Work-Protokoll Ethash verlangte von den Minern, ein intensives Rennen von Versuch und Irrtum (Trial and Error) zu durchlaufen, um die Nonce für einen Block zu finden. Nur Blöcke mit einer gültigen Nonce konnten der Chain hinzugefügt werden.

Beim Wettlauf um die Erstellung eines Blocks leitete ein Miner wiederholt einen Datensatz, der nur durch das Herunterladen und Ausführen der gesamten Chain (wie es ein Miner tut) erhalten werden konnte, durch eine mathematische Funktion. Der Datensatz wurde verwendet, um einen mixHash unterhalb eines Ziels zu generieren, das durch die Blockschwierigkeit vorgegeben ist. Der beste Weg, dies zu tun, ist durch Versuch und Irrtum.

Die Schwierigkeit bestimmte das Ziel für den Hash. Je niedriger das Ziel, desto kleiner die Menge der gültigen Hashes. Einmal generiert, war dies für andere Miner und Anwendungen unglaublich einfach zu verifizieren. Selbst wenn sich nur eine Transaktion ändern würde, wäre der Hash völlig anders und würde Betrug signalisieren.

Hashing macht es einfach, Betrug zu erkennen. Aber Proof-of-Work als Prozess war auch eine große Abschreckung gegen Angriffe auf die Chain.

### Proof-of-Work und Sicherheit {#security}

Miner wurden dazu angeregt, diese Arbeit auf der Haupt-Ethereum-Chain zu verrichten. Es gab wenig Anreiz für eine Untergruppe von Minern, ihre eigene Chain zu starten – es untergräbt das System. Blockchains verlassen sich darauf, einen einzigen Zustand als Quelle der Wahrheit (Source of Truth) zu haben.

Das Ziel von Proof-of-Work war es, die Chain zu verlängern. Die längste Chain war am glaubwürdigsten als die gültige, da für ihre Generierung die meiste Rechenarbeit geleistet wurde. Innerhalb von Ethereums PoW-System war es fast unmöglich, neue Blöcke zu erstellen, die Transaktionen löschen, gefälschte erstellen oder eine zweite Chain aufrechterhalten. Das liegt daran, dass ein böswilliger Miner die Block-Nonce immer schneller als alle anderen hätte lösen müssen.

Um beständig böswillige, aber gültige Blöcke zu erstellen, hätte ein böswilliger Miner über 51 % der Mining-Leistung des Netzwerks benötigt, um alle anderen zu schlagen. Diese Menge an "Arbeit" erfordert viel teure Rechenleistung, und die aufgewendete Energie hätte die bei einem Angriff erzielten Gewinne möglicherweise sogar übertroffen.

### Proof-of-Work-Ökonomie {#economics}

Proof-of-Work war auch dafür verantwortlich, neue Währung in das System auszugeben und Miner zu motivieren, die Arbeit zu tun.

Seit dem [Constantinople-Upgrade](/ethereum-forks/#constantinople) wurden Miner, die erfolgreich einen Block erstellten, mit zwei frisch geprägten ETH und einem Teil der Transaktionsgebühren belohnt. Ommer-Blöcke wurden ebenfalls mit 1,75 ETH vergütet. Ommer-Blöcke waren gültige Blöcke, die von einem Miner praktisch zur gleichen Zeit erstellt wurden, als ein anderer Miner den kanonischen Block erstellte, was letztendlich dadurch bestimmt wurde, auf welcher Chain zuerst aufgebaut wurde. Ommer-Blöcke traten normalerweise aufgrund von Netzwerklatenz auf.

## Finalität {#finality}

Eine Transaktion hat auf Ethereum "Finalität", wenn sie Teil eines Blocks ist, der sich nicht mehr ändern kann.

Da Miner auf dezentralisierte Weise arbeiteten, konnten zwei gültige Blöcke gleichzeitig gemint werden. Dies erzeugt einen temporären Fork. Letztendlich wurde eine dieser Chains zur akzeptierten Chain, nachdem nachfolgende Blöcke gemint und ihr hinzugefügt wurden, was sie länger machte.

Um die Dinge weiter zu verkomplizieren, wurden Transaktionen, die auf dem temporären Fork abgelehnt wurden, möglicherweise nicht in die akzeptierte Chain aufgenommen. Das bedeutet, dass sie rückgängig gemacht werden könnten. Finalität bezieht sich also auf die Zeit, die Sie warten sollten, bevor Sie eine Transaktion als unumkehrbar betrachten. Unter dem vorherigen Proof-of-Work-Ethereum galt: Je mehr Blöcke auf einem bestimmten Block `N` gemint wurden, desto höher war die Zuversicht, dass die Transaktionen in `N` erfolgreich waren und nicht rückgängig gemacht würden. Jetzt, mit Proof-of-Stake, ist die Finalisierung eine explizite und keine probabilistische Eigenschaft eines Blocks.

## Proof-of-Work-Energieverbrauch {#energy}

Ein Hauptkritikpunkt an Proof-of-Work ist die Menge an Energie, die erforderlich ist, um das Netzwerk sicher zu halten. Um Sicherheit und Dezentralisierung aufrechtzuerhalten, verbrauchte Ethereum unter Proof-of-Work große Mengen an Energie. Kurz vor dem Wechsel zu Proof-of-Stake verbrauchten die Ethereum-Miner zusammen etwa 70 TWh/Jahr (etwa so viel wie die Tschechische Republik – laut [digiconomist](https://digiconomist.net/) am 18. Juli 2022).

## Vor- und Nachteile {#pros-and-cons}

| Vorteile                                                                                                                                                                                                                         | Nachteile                                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Proof-of-Work ist neutral. Sie benötigen keine ETH, um loszulegen, und Block-Belohnungen ermöglichen es Ihnen, von 0 ETH zu einem positiven Guthaben zu gelangen. Bei [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) benötigen Sie ETH, um zu beginnen. | Proof-of-Work verbraucht so viel Energie, dass es schlecht für die Umwelt ist.                                                                      |
| Proof-of-Work ist ein erprobter und getesteter Konsensmechanismus, der Bitcoin und Ethereum über viele Jahre hinweg sicher und dezentralisiert gehalten hat.                                                                                          | Wenn Sie minen möchten, benötigen Sie so spezielle Ausrüstung, dass es eine große Investition ist, um anzufangen.                                                |
| Im Vergleich zu Proof-of-Stake ist es relativ einfach zu implementieren.                                                                                                                                                                | Aufgrund des steigenden Rechenbedarfs könnten Mining-Pools potenziell das Mining-Geschäft dominieren, was zu Zentralisierung und Sicherheitsrisiken führt. |

## Im Vergleich zu Proof-of-Stake {#compared-to-pos}

Auf hoher Ebene hat Proof-of-Stake das gleiche Endziel wie Proof-of-Work: dem dezentralisierten Netzwerk zu helfen, sicher einen Konsens zu erreichen. Es gibt jedoch einige Unterschiede im Prozess und beim Personal:

- Proof-of-Stake tauscht die Bedeutung von Rechenleistung gegen gestakte ETH aus.
- Proof-of-Stake ersetzt Miner durch Validatoren. Validatoren setzen ihre ETH als Einsatz (Stake), um die Fähigkeit zur Erstellung neuer Blöcke zu aktivieren.
- Validatoren konkurrieren nicht um die Erstellung von Blöcken, sondern werden zufällig von einem Algorithmus ausgewählt.
- Finalität ist klarer: An bestimmten Checkpoints gilt ein Block als final, wenn 2/3 der Validatoren dem Zustand des Blocks zustimmen. Validatoren müssen ihren gesamten Einsatz darauf wetten. Wenn sie also später versuchen, sich abzusprechen, verlieren sie ihren gesamten Einsatz.

[Mehr über Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/)

## Lernen Sie eher visuell? {#visual-learner}

<YouTube id="3EUAcxhuoU4" />

## Weiterführende Literatur {#further-reading}

- [Mehrheitsangriff (Majority attack)](https://en.bitcoin.it/wiki/Majority_attack)
- [Über die Finalität der Abwicklung (On settlement finality)](https://blog.ethereum.org/2016/05/09/on-settlement-finality)

### Videos {#videos}

- [Eine technische Erklärung von Proof-of-Work-Protokollen](https://youtu.be/9V1bipPkCTU)

## Verwandte Themen {#related-topics}

- [Mining](/developers/docs/consensus-mechanisms/pow/mining/)
- [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/)
- [Proof-of-Authority](/developers/docs/consensus-mechanisms/poa/)