---
title: Proof-of-Stake (PoS)
description: Eine Erklärung des Proof-of-Stake-Konsensprotokolls und seiner Rolle in Ethereum.
lang: de
incomplete: true
---

Ethereum bewegt sich vom [Proof-of-Work (PoW)](/developers/docs/consensus-mechanisms/pow/) zu einem Konsensmechanismus, genannt Proof-of-Stake (PoS). Das war immer der Plan, denn es ist ein wichtiger Teil der Strategie der Community, Ethereum über [Upgrades](/upgrades/) zu skalieren. Allerdings ist es eine große technische Herausforderung, PoS richtig umzusetzen, und nicht so einfach wie PoW zu nutzen, um einen Konsens über das Netzwerk zu erzielen.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir dir, zuerst einen Blick auf [Konsensmechanismen](/developers/docs/consensus-mechanisms/) zu werfen.

## Was ist Proof-of-Stake (PoS)? {#what-is-pos}

Proof-of-Stake ist eine Art von [Konsensmechanismus](/developers/docs/consensus-mechanisms/), die von Blockchain-Netzwerken benutzt wird, um einen verteilten Konsens zu erreichen.

Es verlangt von Nutzern das Einsetzen ihrer ETH, um ein Validator im Netzwerk zu werden. Validatoren sind verantwortlich für die gleichen Dinge wie Miner in [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/): Ordnen von Transaktionen und Erstellen von neuen Blöcken, so dass alle Nodes mit dem Status des Netzwerks übereinstimmen.

Proof-of-Stake kommt mit einer Anzahl an Verbesserungen zum Proof-of-Work-System hinzu:

- bessere Energieeffizienz – weniger Energieaufwand für das Minen (Schürfen) von Blöcken
- weniger Hindernisse für den Einstieg, zeduziert Hardwareanforderungen – Du brauchst keine Elite-Hardware, um neue Blöcke zu erstellen
- stärkere Immunität gegen die Zentralisierung – Proof-of-Stake sollte zu mehr Nodes im Netzwerk führen
- stärkere Unterstützung für [Shard Chains](/upgrades/sharding/) – ein wichtiges Upgrade bei der Skalierung des Ethereum-Netzwerks

## Proof-of-Stake, Staking und Validatoren {#pos-staking-validators}

Proof-of-Stake ist der zugrundeliegende Mechanismus, der Validatoren aktiviert, wenn genügend Stakes vorhanden sind. Für Ethereum müssen Benutzer 32 ETH staken (einsetzen), um ein Validator zu werden. Validatoren werden zufällig ausgewählt, um Blöcke zu erstellen, und sind für die Überprüfung und Bestätigung von Blöcken, die sie nicht erstellen, verantwortlich. Der Einsatz eines Benutzers wird auch als Anreiz für ein gutes Validator-Verhalten verwendet. Zum Beispiel kann ein Nutzer einen Teil seines Stakes für Dinge wie offline zu gehen (Fehlversuch der Validierung) oder seinen gesamten Stake für vorsätzliche Kollusion verlieren.

## Wie funktioniert Ethereums Proof-of-Stake? {#how-does-pos-work}

Im Gegensatz zum Proof-of-Work müssen Validatoren keine erheblichen Mengen an Rechenleistung verwenden, da sie zufällig ausgewählt werden und nicht miteinander konkurrieren. Sie müssen nicht unentwegt Blocks minen (schürfen), sondern nur dann, wenn sie ausgewählt werden, und vorgeschlagene Blöcke validieren, wenn sie nicht ausgewählt sind. Diese Validierung wird als Attestieren bezeichnet. Du kannst dir das Attestieren vorstellen, wie "dieser Block sieht gut für mich aus" zu sagen. Validatoren erhalten Belohnungen für neue Blöcke und das Zertifizieren von Blöcken, die sie gesehen haben.

Wenn du bösartige Blöcke attestierst, verlierst du deinen Einsatz.

### Die Beacon Chain {#the-beacon-chain}

Wenn Ethereum den Proof-of-Work durch den Proof-of-Stake ersetzt, wird es zusätzlich die Komplexität von [Shard-Chains](/upgrades/sharding/) geben. Das sind separate Blockchains, die Validatoren benötigen, um Transaktionen zu verarbeiten und neue Blöcke zu erstellen. Der Plan sind 64 Scherben-Ketten, die alle ein geteiltes Verständnis vom Status des Netzwerks haben. Daher ist eine zusätzliche Koordination notwendig, die von [der Beacon Chain](/upgrades/beacon-chain/) übernommen wird.

Die Beacon Chain erhält Statusinformationen von den Fragmenten und stellt sie für die anderen Fragmente zur Verfügung, so dass das Netzwerken synchronisiert bleiben kann. Die Beacon Chain verwaltet auch die Validatoren, von der Registrierung ihrer Einlagen bis hin zur Verteilung ihrer Belohnungen und Strafen.

So funktioniert dieser Prozess.

### Wie Validierung funktioniert {#how-does-validation-work}

Wenn du eine Transaktion auf einem Shard einreichst, ist ein Validator dafür verantwortlich, deine Transaktion zu einem Shard-Block hinzuzufügen. Validatoren werden algorithmisch von der Beacon Chain ausgewählt, um neue Blöcke zu vorzuschlagen.

#### Attestierung {#attestation}

Wird ein Validator nicht ausgewählt, um einen neuen Shard-Block vorzuschlagen, muss er den Vorschlag eines anderen Validators attestieren und bestätigen, dass alles so aussieht wie es soll. Es ist die Attestierung, die in der Beacon-Kette aufgezeichnet wird, und nicht die Transaktion selbst.

Mindestens 128 Validatoren werden benötigt, um jeden Shard-Block zu attestieren. Diese werden als "Komitee" bezeichnet.

Das Komitee hat einen Zeitrahmen, in dem es einen Shard-Block vorschlagen und validieren muss. Dieser ist als "Slot" bekannt. Pro Slot wird lediglich ein gültiger Block erstellt und 32 Slots bilden eine "Epoche." Nach jeder Epoche wird das Komitee aufgelöst und mit verschiedenen, zufälligen Teilnehmern reformiert. Dies trägt dazu bei, Shards vor Ausschüssen aus schlechten Akteuren zu schützen.

#### Crosslinks {#rewards-and-penalties}

Wenn ein neuer Shard-Block-Vorschlag genug Attestierungen hat, wird ein "Crosslink" erzeugt, welcher die Aufnahme des Blocks und deiner Transaktion in der Beacon Chain bestätigt.

Sobald es einen Crosslink gibt, erhält der Validator, der den Block vorgeschlagen hat, seine Belohnung.

#### Finalisierung {#finality}

In verteilten Netzwerken hat eine Transaktion eine "Finalisierung", wenn sie Teil eines Bausteins ist, der sich nicht ändern kann.

Um dies in Proof-of-Stake zu tun, bringt Casper, ein Finalisierungsprotokoll, Validatoren dazu, den Zustand eines Blocks an bestimmten Kontrollpunkten zu bestätigen. Solange 2/3 der Validatoren bestätigt haben, ist der Block fertig. Validatioren verlieren ihren gesamten Stake, wenn sie versuchen, dies später durch einen 51-%-Angriff rückgängig zu machen.

Vlad Zamfir drückte es so aus: Das ist wie bei einem Miner, dem aufgrund der Teilnahme an einem 51-%-Angriff seine Mining-Hardware abbrennt.

## Proof-of-Stake und Sicherheit {#pos-and-security}

Die Bedrohung eines [51-%-Angriffs](https://www.investopedia.com/terms/1/51-attack.asp) existiert im Proof-of-Stake weiterhin, jedoch ist das Risiko für den Angreifer noch größer. Für solch einen Angriff musst du 51 % aller eingesetzten ETH kontrollieren. Dies ist nicht nur eine große Menge an Geld, sondern würde wahrscheinlich auch dazu führen, dass der ETH-Wert sinkt. Es gibt wenig Anreiz dafür, den Wert einer Währung zu zerstören, an der du eine Mehrheit hast. Es ist wesentlich erstrebenswerter, das Netzwerk sicher und gesund zu halten.

Stake-Kürzungen, Ausschlüsse und andere Strafen, die von der Beacon Chain koordiniert werden, werden existieren, um andere schlechte Handlungen zu verhindern. Validatoren werden auch dafür verantwortlich sein, diese Vorfälle zu melden.

## Vor- und Nachteile {#pros-and-cons}

| Vorteile                                                                                                                                                                                                                                                                                                                                | Nachteile                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Staking macht dir die Ausführung eines Nodes einfacher. Es erfordert keine großen Investitionen in Hardware oder Energie und wenn du nicht genug ETH zum Staken hast, kannst du dich einem Staking-Pool anschließen.                                                                                                                    | Proof-of-Stake steckt noch in den Kinderschuhen und ist im Vergleich zum Proof-of-Work weniger erprobt. |
| Staking ist stärker dezentralisiert. Es erlaubt eine erhöhte Beteiligung und mehr Nodes bedeuten keinen %-Anstieg der Erträge, wie etwa beim Mining.                                                                                                                                                                                    |                                                                                                         |
| Staking ermöglicht sicheres Sharding. Shard-Chains erlauben es Ethereum, mehrere Blöcke zur gleichen Zeit zu erstellen, wodurch der Durchsatz an Transaktionen erhöht wird. Das Sharding des Netzwerks in einem Proof-of-Work-System würde einfach die Leistung verringern, die nötig ist, um einen Teil des Netzes zu kompromittieren. |                                                                                                         |

## Weiterführende Informationen {#further-reading}

- [Proof of Stake FAQ](https://vitalik.ca/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [Was ist Proof-of-Stake](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [Was Proof of Stake ist und warum sie wichtig ist](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [Die Erklärung der Ethereum 2.0 Beacon Chain, die du zuerst lesen solltest](https://ethos.dev/beacon-chain/) _Ethos.dev_
- [Warum Proof of Stake (Nov 2020)](https://vitalik.ca/general/2020/11/06/pos2020.html) _Vitalik Buterin_
- [Proof of Stake: How I Learned to Love Weak Subjectivity](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/) _Vitalik Buterin_
- [A Proof of Stake Design Philosophy](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_

## Verwandte Themen {#related-topics}

- [Proof of work](/developers/docs/consensus-mechanisms/pow/)
