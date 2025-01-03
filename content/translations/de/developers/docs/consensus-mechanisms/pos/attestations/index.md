---
title: Beglaubigungen
description: Eine Beschreibung von Attestierungen auf Proof-of-Stake-Ethereum.
lang: de
---

Von einem Validator wird erwartet, dass er während jeder Epoche eine Attestierung erstellt, signiert und überträgt. Diese Seite beschreibt, wie diese Attestierungen aussehen und wie sie zwischen Konsens-Clients verarbeitet und kommuniziert werden.

## Was ist eine Attestierung? {#what-is-an-attestation}

Jede [Epoche](/glossary/#epoch) (6,4 Minuten) schlägt ein Validator dem Netzwerk eine Attestierung vor. Die Attestierung ist für einen spezifischen Slot in der Epoche. Der Zweck der Attestierung besteht darin, für die Sichtweise des Validators auf die Chain zu abzustimmen, insbesondere in Bezug auf den letzten berechtigten Block und den ersten Block der aktuellen Epoche (bekannt als `Quell`- und `Ziel`-Checkpoints). Diese Informationen werden für alle teilnehmenden Validatoren kombiniert, was es dem Netzwerk ermöglicht, einen Konsens über den Status der Blockchain zu erzielen.

Die Attestierung beinhaltet die folgenden Komponenten:

- `aggregation_bits`: eine Bitliste von Validatoren, deren Position dem Validatorenindex in ihrem Komitee entspricht; der Wert (0/1) indiziert, ob der Validator die `Daten` signiert hat (d. h. ob sie aktiv sind und mit dem Block-Proposer übereinstimmen)
- `Daten`: Details, die mit der Attestierung verbunden sind, wie unten definiert
- `Signatur`: eine BLS-Signatur, die die Signaturen individueller Validatoren zusammenfasst

Die erste Aufgabe für einen attestierenden Validator ist der Aufbau der `Daten`. Die `Daten` beinhalten die folgenden Informationen:

- `Slot`: die Slot-Nummer, auf die sich die Attestierung bezieht
- `Index`: eine Nummer, die identifiziert, zu welchem Komitee der Validator in einem gegebenen Slot gehört
- `beacon_block_root`: Root Hash des Blocks, den der Validator an der Spitze der Chain sieht (als Resultat der Anwendung des Abspaltungs-Wahl-Algorithmus)
- `Quelle`: Teil der Endgültigkeitsabstimmung, der angibt, was die Validatoren als den letzten berechtigten Block ansehen
- `Ziel`: Teil der Endgültigkeitsabstimmung, der angibt, was die Validatoren als ersten Block in der derzeitigen Epoche ansehen

Sobald die `Daten` erstellt wurden, kann der Validator das Bit in `aggregation_bits`, das seinem eigenen Validatorenindex entspricht, von 0 auf 1 umdrehen, um zu zeigen, dass er teilgenommen hat.

Schließlich kann der Validator die Attestierung signieren und an das Netzwerk übertragen.

### Aggregierte Attestierung {#aggregated-attestation}

Die Weiterleitung dieser Daten durch das Netzwerk für jeden Validator ist mit einem erheblichen Mehraufwand verbunden. Bevor es also zu einer groß angelegten Übertragung der Attestierungen der einzelnen Validatoren kommt, werden die Attestierungen in Subnetzen aggregiert. Dies umfasst das Aggregieren von Signaturen, sodass eine übertragene Attestierung die Konsens-`Daten` sowie eine einzelne Signatur enthält, die aus einer Kombination der Signaturen aller Validatoren gebildet wird, die mit diesen `Daten` übereinstimmen. Dies kann mit `aggregation_bits` überprüft werden, das den Index jedes Validators in seinem Komitee bereitstellt (dessen ID in `Daten` angegeben ist), was zur Abfrage einzelner Signaturen verwendet werden kann.

In jeder Epoche werden 16 Validatoren in jedem Subnetz als `Aggregatoren` ausgewählt. Die Aggregatoren sammeln alle Attestierungen, von denen sie über das Gossip-Netzwerk erfahren und die über gleichwertige `Daten` wie ihre eigenen verfügen. Der Absender jeder passenden Attestierung wird in den `aggregation_bits` erfasst. Die Aggregatoren übertragen dann das Attestierungsaggregat an das gesamte Netzwerk.

Wenn ein Validator als Block-Proposer ausgewählt wird, bündelt er aggregierte Attestierungen aus den Subnetzen bis zum aktuellsten Slot im neuen Block.

### Lebenszyklus der Attestierungseinbeziehung {#attestation-inclusion-lifecycle}

1. Generierung
2. Propagierung
3. Aggregation
4. Propagierung
5. Einbeziehung

Der Attestierungslebenszyklus ist in dem nachstehenden Schema skizziert:

![Attestierungslebenszyklus](./attestation_schematic.png)

## Belohnungen {#rewards}

Die Validatoren werden für das Einreichen von Attestierungen belohnt. Die Belohnung für die Attestierung hängt von den Teilnahme-Flags (Quelle, Ziel und Spitze), der Basisbelohnung und der Teilnahmequote ab.

Jedes der Teilnahme-Flags kann entweder wahr oder falsch sein, je nach der eingereichten Attestierung und ihrer Einbeziehungsverzögerung.

Das beste Szenario ist, wenn alle drei Flags wahr sind. In diesem Fall würde ein Validator (pro richtigem Flag) Folgendes verdienen:

`Belohnung += Basisbelohnung * Flag-Gewicht * Flag-Attestierungsquote / 64`

Die Flag-Attestierungsquote wird anhand der Summe der Effektivguthaben aller attestierenden Validatoren für die betreffende Flag im Vergleich zum gesamten aktiven Effektivguthaben gemessen.

### Basisbelohnung {#base-reward}

Die Basisbelohnung wird anhand der Anzahl der attestierenden Validatoren und ihrer effektiv eingesetzten Ether-Guthaben berechnet:

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### Einbeziehungsverzögerung {#inclusion-delay}

Zu dem Zeitpunkt, als die Validatoren über die Spitze der Chain (`block n`) abstimmten, war `block n+1` noch nicht vorgeschlagen worden. Daher werden Attestierungen naturgemäß **einen Block später** aufgenommen, sodass alle Attestierungen, die für `block n` als Chain-Spitze gestimmt haben, in `block n+1` aufgenommen wurden; die **Einbeziehungsverzögerung** beträgt 1. Wenn sich die Einbeziehungsverzögerung auf zwei Slots verdoppelt, halbiert sich die Attestierungsbelohnung, da zur Berechnung der Attestierungsbelohnung die Basisbelohnung mit dem Kehrwert der Einbeziehungsverzögerung multipliziert wird.

### Attestierungsszenarien {#attestation-scenarios}

#### Fehlender Abstimmungsvalidator {#missing-voting-validator}

Die Validatoren haben maximal 1 Epoche Zeit, um ihre Attestierung einzureichen. Wenn die Attestierung in Epoche 0 versäumt wurde, können sie diese mit einer Einbeziehungsverzögerung in Epoche 1 nachreichen.

#### Fehlender Aggregator {#missing-aggregator}

Insgesamt gibt es 16 Aggregatoren pro Epoche. Darüber hinaus abonnieren zufällige Validatoren **256 Epochen lang zwei Subnetze** und dienen als Backup, falls Aggregatoren fehlen.

#### Fehlender Block-Proposer {#missing-block-proposer}

Beachten Sie, dass in einigen Fällen ein glücklicher Aggregator auch zum Block-Proposer werden kann. Wenn die Attestierung nicht miteinbezogen wurde, weil der Block-Proposer verloren gegangen ist, würde der nächste Block-Proposer die aggregierte Attestierung wiederaufnehmen und in den nächsten Block miteinbeziehen. Jedoch wird sich die **Einbeziehungsverzögerung** um den Faktor eins erhöhen.

## Weiterführende Informationen {#further-reading}

- [Attestierungen in Vitaliks kommentierter Konsens-Spezifikation](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Attestierungen in eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_Kennen Sie eine Community Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu._
