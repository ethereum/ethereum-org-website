---
title: Beglaubigungen
description: Eine Beschreibung von Attestierungen auf Proof-of-Stake-Ethereum.
lang: de
---

Von einem Validator wird erwartet, dass er während jeder Epoche eine Attestierung erstellt, signiert und überträgt. Diese Seite beschreibt, wie diese Attestierungen aussehen und wie sie zwischen Konsens-Clients verarbeitet und kommuniziert werden.

## Was ist eine Attestierung? {#what-is-an-attestation}

Jede [Epoche](/glossary/#epoch) (6,4 Minuten) schlägt ein Validator dem Netzwerk eine Attestierung vor. Die Attestierung ist für einen spezifischen Slot in der Epoche. Der Zweck der Attestierung besteht darin, für die Sichtweise des Validators auf die Chain abzustimmen, insbesondere den letzten gerechtfertigten Block und den ersten Block in der aktuellen Epoche (bekannt als `source`- und `target`-Checkpoints). Diese Informationen werden für alle teilnehmenden Validatoren kombiniert, was es dem Netzwerk ermöglicht, einen Konsens über den Status der Blockchain zu erzielen.

Die Attestierung beinhaltet die folgenden Komponenten:

- `aggregation_bits`: eine Bitliste von Validatoren, bei der die Position dem Validator-Index in ihrem Komitee entspricht; der Wert (0/1) gibt an, ob der Validator die `data` signiert hat (d. h. ob er aktiv ist und mit dem Block-Proposer übereinstimmt).
- `data`: Details zur Attestierung, wie unten definiert
- `signature`: eine BLS-Signatur, die die Signaturen einzelner Validatoren zusammenfasst

Die erste Aufgabe für einen attestierenden Validator ist es, die `data` zu erstellen. Die `data` enthalten die folgenden Informationen:

- `slot`: Die Slot-Nummer, auf die sich die Attestierung bezieht
- `index`: Eine Nummer, die angibt, zu welchem Komitee der Validator in einem bestimmten Slot gehört
- `beacon_block_root`: Root-Hash des Blocks, den der Validator an der Spitze der Chain sieht (das Ergebnis der Anwendung des Fork-Choice-Algorithmus)
- `source`: Teil der Abstimmung über die Endgültigkeit, der angibt, was die Validatoren als den letzten gerechtfertigten Block ansehen
- `target`: Teil der Abstimmung über die Endgültigkeit, der angibt, was die Validatoren als ersten Block in der aktuellen Epoche ansehen

Sobald `data` erstellt ist, kann der Validator das Bit in `aggregation_bits`, das seinem eigenen Validator-Index entspricht, von 0 auf 1 umschalten, um zu zeigen, dass er teilgenommen hat.

Schließlich kann der Validator die Attestierung signieren und an das Netzwerk übertragen.

### Aggregierte Attestierung {#aggregated-attestation}

Die Weiterleitung dieser Daten durch das Netzwerk für jeden Validator ist mit einem erheblichen Mehraufwand verbunden. Bevor es also zu einer groß angelegten Übertragung der Attestierungen der einzelnen Validatoren kommt, werden die Attestierungen in Subnetzen aggregiert. Dies schließt das Zusammenfassen von Signaturen ein, sodass eine gesendete Attestierung die Konsens-`data` und eine einzelne Signatur enthält, die durch die Kombination der Signaturen aller Validatoren gebildet wird, die mit diesen `data` übereinstimmen. Dies kann mit `aggregation_bits` überprüft werden, da dies den Index jedes Validators in seinem Komitee bereitstellt (dessen ID in `data` angegeben ist), der zur Abfrage einzelner Signaturen verwendet werden kann.

In jeder Epoche werden 16 Validatoren in jedem Subnetz als `aggregators` ausgewählt. Die Aggregatoren sammeln alle Attestierungen, von denen sie über das Gossip-Netzwerk hören und die äquivalente `data` zu ihren eigenen haben. Der Absender jeder passenden Attestierung wird in den `aggregation_bits` erfasst. Die Aggregatoren übertragen dann das Attestierungsaggregat an das gesamte Netzwerk.

Wenn ein Validator als Block-Proposer ausgewählt wird, bündelt er aggregierte Attestierungen aus den Subnetzen bis zum aktuellsten Slot im neuen Block.

### Lebenszyklus der Attestierungsaufnahme {#attestation-inclusion-lifecycle}

1. Generierung
2. Propagierung
3. Aggregation
4. Propagierung
5. Einbeziehung

Der Attestierungslebenszyklus ist in dem nachstehenden Schema skizziert:

![Lebenszyklus einer Attestierung](./attestation_schematic.png)

## Belohnungen {#rewards}

Die Validatoren werden für das Einreichen von Attestierungen belohnt. Die Belohnung für die Attestierung hängt von den Teilnahme-Flags (Quelle, Ziel und Spitze), der Basisbelohnung und der Teilnahmequote ab.

Jedes der Teilnahme-Flags kann entweder wahr oder falsch sein, je nach der eingereichten Attestierung und ihrer Einbeziehungsverzögerung.

Das beste Szenario ist, wenn alle drei Flags wahr sind. In diesem Fall würde ein Validator (pro richtigem Flag) Folgendes verdienen:

`Belohnung += Basisbelohnung * Flag-Gewicht * Flag-Attestierungsquote / 64`

Die Flag-Attestierungsquote wird anhand der Summe der Effektivguthaben aller attestierenden Validatoren für die betreffende Flag im Vergleich zum gesamten aktiven Effektivguthaben gemessen.

### Grundbelohnung {#base-reward}

Die Basisbelohnung wird anhand der Anzahl der attestierenden Validatoren und ihrer effektiv eingesetzten Ether-Guthaben berechnet:

`Grundbelohnung = effektives Guthaben des Validators x 2^6 / SQRT(effektives Guthaben aller aktiven Validatoren)`

#### Aufnahmeverzögerung {#inclusion-delay}

Zu dem Zeitpunkt, als die Validatoren über den Head der Chain (`block n`) abstimmten, war `block n+1` noch nicht vorgeschlagen worden. Daher werden Attestierungen natürlich **einen Block später** aufgenommen, sodass alle Attestierungen, die für `block n` als Chain-Head gestimmt haben, in `block n+1` aufgenommen wurden und die **Aufnahmeverzögerung** 1 beträgt. Wenn sich die Einbeziehungsverzögerung auf zwei Slots verdoppelt, halbiert sich die Attestierungsbelohnung, da zur Berechnung der Attestierungsbelohnung die Basisbelohnung mit dem Kehrwert der Einbeziehungsverzögerung multipliziert wird.

### Attestierungsszenarien {#attestation-scenarios}

#### Fehlender abstimmender Validator {#missing-voting-validator}

Die Validatoren haben maximal 1 Epoche Zeit, um ihre Attestierung einzureichen. Wenn die Attestierung in Epoche 0 versäumt wurde, können sie diese mit einer Einbeziehungsverzögerung in Epoche 1 nachreichen.

#### Fehlender Aggregator {#missing-aggregator}

Insgesamt gibt es 16 Aggregatoren pro Epoche. Zusätzlich abonnieren zufällige Validatoren **zwei Subnetze für 256 Epochen** und dienen als Backup, falls Aggregatoren fehlen.

#### Fehlender Block-Proposer {#missing-block-proposer}

Beachten Sie, dass in einigen Fällen ein glücklicher Aggregator auch zum Block-Proposer werden kann. Wenn die Attestierung nicht miteinbezogen wurde, weil der Block-Proposer verloren gegangen ist, würde der nächste Block-Proposer die aggregierte Attestierung wiederaufnehmen und in den nächsten Block miteinbeziehen. Allerdings erhöht sich die **Aufnahmeverzögerung** um eins.

## Weiterführende Lektüre {#further-reading}

- [Attestierungen in Vitaliks kommentierter Konsens-Spezifikation](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Attestierungen in eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_Sie kennen Community-Resourcen die Ihnen geholfen haben? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_
