---
title: Attestierungen
description: Eine Beschreibung von Attestierungen im Proof-of-Stake-Ethereum.
lang: de
---

Von einem Validator wird erwartet, dass er in jeder Epoche eine Attestierung erstellt, signiert und überträgt. Diese Seite beschreibt, wie diese Attestierungen aussehen und wie sie verarbeitet und zwischen Konsens-Clients kommuniziert werden.

## Was ist eine Attestierung? {#what-is-an-attestation}

In jeder [Epoche](/glossary/#epoch) (6,4 Minuten) schlägt ein Validator dem Netzwerk eine Attestierung vor. Die Attestierung gilt für einen bestimmten Slot in der Epoche. Der Zweck der Attestierung besteht darin, für die Sicht des Validators auf die Chain abzustimmen, insbesondere für den jüngsten gerechtfertigten Block und den ersten Block in der aktuellen Epoche (bekannt als `source`- und `target`-Checkpoints). Diese Informationen werden für alle teilnehmenden Validatoren kombiniert, wodurch das Netzwerk einen Konsens über den Zustand der Blockchain erreichen kann.

Die Attestierung enthält die folgenden Komponenten:

- `aggregation_bits`: eine Bitliste von Validatoren, bei der die Position dem Validator-Index in ihrem Komitee entspricht; der Wert (0/1) gibt an, ob der Validator die `data` signiert hat (d. h. ob er aktiv ist und mit dem Block-Proposer übereinstimmt)
- `data`: Details zur Attestierung, wie unten definiert
- `signature`: eine BLS-Signatur, die die Signaturen einzelner Validatoren aggregiert

Die erste Aufgabe für einen attestierenden Validator besteht darin, die `data` zu erstellen. Die `data` enthält die folgenden Informationen:

- `slot`: Die Slot-Nummer, auf die sich die Attestierung bezieht
- `index`: Eine Nummer, die identifiziert, zu welchem Komitee der Validator in einem bestimmten Slot gehört
- `beacon_block_root`: Root-Hash des Blocks, den der Validator an der Spitze der Chain sieht (das Ergebnis der Anwendung des Fork-Choice-Algorithmus)
- `source`: Teil der Endgültigkeits-Stimme, der angibt, was die Validatoren als den jüngsten gerechtfertigten Block ansehen
- `target`: Teil der Endgültigkeits-Stimme, der angibt, was die Validatoren als den ersten Block in der aktuellen Epoche ansehen

Sobald die `data` erstellt ist, kann der Validator das Bit in `aggregation_bits`, das seinem eigenen Validator-Index entspricht, von 0 auf 1 setzen, um zu zeigen, dass er teilgenommen hat.

Schließlich signiert der Validator die Attestierung und überträgt sie an das Netzwerk.

### Aggregierte Attestierung {#aggregated-attestation}

Es gibt einen erheblichen Overhead, der mit der Weitergabe dieser Daten im Netzwerk für jeden Validator verbunden ist. Daher werden die Attestierungen einzelner Validatoren innerhalb von Subnetzen aggregiert, bevor sie weiter verbreitet werden. Dies beinhaltet die Aggregation von Signaturen, sodass eine übertragene Attestierung die Konsens-`data` und eine einzige Signatur enthält, die durch die Kombination der Signaturen aller Validatoren gebildet wird, die mit dieser `data` übereinstimmen. Dies kann mithilfe von `aggregation_bits` überprüft werden, da dies den Index jedes Validators in seinem Komitee liefert (dessen ID in `data` angegeben ist), was verwendet werden kann, um einzelne Signaturen abzufragen.

In jeder Epoche werden 16 Validatoren in jedem Subnetz als `aggregators` ausgewählt. Die Aggregatoren sammeln alle Attestierungen, von denen sie über das Gossip-Netzwerk hören und die eine gleichwertige `data` wie ihre eigene haben. Der Absender jeder passenden Attestierung wird in der `aggregation_bits` aufgezeichnet. Die Aggregatoren übertragen dann das Attestierungs-Aggregat an das weitere Netzwerk.

Wenn ein Validator als Block-Proposer ausgewählt wird, verpackt er aggregierte Attestierungen aus den Subnetzen bis zum neuesten Slot in den neuen Block.

### Lebenszyklus der Attestierungsaufnahme {#attestation-inclusion-lifecycle}

1. Generierung
2. Verbreitung
3. Aggregation
4. Verbreitung
5. Aufnahme

Der Lebenszyklus der Attestierung ist im folgenden Schema dargestellt:

![attestation lifecycle](./attestation_schematic.png)

## Belohnungen {#rewards}

Validatoren werden für das Einreichen von Attestierungen belohnt. Die Attestierungs-Belohnung hängt von den Teilnahme-Flags (Quelle, Ziel und Spitze), der Basis-Belohnung und der Teilnahmequote ab.

Jedes der Teilnahme-Flags kann entweder wahr oder falsch sein, abhängig von der eingereichten Attestierung und ihrer Aufnahmeverzögerung.

Das beste Szenario tritt ein, wenn alle drei Flags wahr sind. In diesem Fall würde ein Validator (pro korrektem Flag) Folgendes verdienen:

`reward += base reward * flag weight * flag attesting rate / 64`

Die Flag-Attestierungsrate wird gemessen, indem die Summe der effektiven Guthaben aller attestierenden Validatoren für das gegebene Flag mit dem gesamten aktiven effektiven Guthaben verglichen wird.

### Basis-Belohnung {#base-reward}

Die Basis-Belohnung wird anhand der Anzahl der attestierenden Validatoren und ihrer effektiven gestakten Ether-Guthaben berechnet:

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### Aufnahmeverzögerung {#inclusion-delay}

Zu dem Zeitpunkt, als die Validatoren über die Spitze der Chain (`block n`) abstimmten, war `block n+1` noch nicht vorgeschlagen worden. Daher werden Attestierungen natürlicherweise **einen Block später** aufgenommen, sodass alle Attestierungen, die dafür gestimmt haben, dass `block n` die Chain-Spitze ist, in `block n+1` aufgenommen wurden, und die **Aufnahmeverzögerung** beträgt 1. Wenn sich die Aufnahmeverzögerung auf zwei Slots verdoppelt, halbiert sich die Attestierungs-Belohnung, da zur Berechnung der Attestierungs-Belohnung die Basis-Belohnung mit dem Kehrwert der Aufnahmeverzögerung multipliziert wird.

### Attestierungs-Szenarien {#attestation-scenarios}

#### Fehlender abstimmender Validator {#missing-voting-validator}

Validatoren haben maximal 1 Epoche Zeit, um ihre Attestierung einzureichen. Wenn die Attestierung in Epoche 0 verpasst wurde, können sie diese mit einer Aufnahmeverzögerung in Epoche 1 einreichen.

#### Fehlender Aggregator {#missing-aggregator}

Es gibt insgesamt 16 Aggregatoren pro Epoche. Zusätzlich abonnieren zufällige Validatoren **zwei Subnetze für 256 Epochen** und dienen als Backup, falls Aggregatoren fehlen.

#### Fehlender Block-Proposer {#missing-block-proposer}

Beachten Sie, dass in einigen Fällen ein glücklicher Aggregator auch zum Block-Proposer werden kann. Wenn die Attestierung nicht aufgenommen wurde, weil der Block-Proposer fehlt, würde der nächste Block-Proposer die aggregierte Attestierung aufnehmen und in den nächsten Block einfügen. Allerdings erhöht sich die **Aufnahmeverzögerung** um eins.

## Weiterführende Literatur {#further-reading}

- [Attestierungen in Vitaliks kommentierter Konsens-Spezifikation](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Attestierungen auf eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_