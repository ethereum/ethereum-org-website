---
title: "Bestätigungen"
description: "Eine Beschreibung von Bestätigungen (Attestations) beim Proof-of-Stake-Ethereum."
lang: de
---

Von einem Validator wird erwartet, dass er in jeder Epoche eine Bestätigung erstellt, signiert und überträgt. Diese Seite beschreibt, wie diese Bestätigungen aussehen und wie sie verarbeitet und zwischen Konsens-Clients kommuniziert werden.

## Was ist eine Bestätigung? {#what-is-an-attestation}

In jeder [Epoche](/glossary/#epoch) (6,4 Minuten) schlägt ein Validator dem Netzwerk eine Bestätigung vor. Die Bestätigung gilt für einen bestimmten Slot in der Epoche. Der Zweck der Bestätigung besteht darin, für die Sicht des Validators auf die Chain abzustimmen, insbesondere für den jüngsten gerechtfertigten Block und den ersten Block in der aktuellen Epoche (bekannt als `source`- und `target`-Checkpoints). Diese Informationen werden für alle teilnehmenden Validatoren kombiniert, sodass das Netzwerk einen Konsens über den Zustand der Blockchain erreichen kann.

Die Bestätigung enthält die folgenden Komponenten:

- `aggregation_bits`: eine Bitliste von Validatoren, bei der die Position dem Validator-Index in ihrem Komitee entspricht; der Wert (0/1) gibt an, ob der Validator die `data` signiert hat (d. h. ob er aktiv ist und mit dem Block-Vorschlagenden übereinstimmt)
- `data`: Details zur Bestätigung, wie unten definiert
- `signature`: eine BLS-Signatur, die die Signaturen einzelner Validatoren aggregiert

Die erste Aufgabe für einen bestätigenden Validator besteht darin, die `data` zu erstellen. Die `data` enthalten die folgenden Informationen:

- `slot`: Die Slot-Nummer, auf die sich die Bestätigung bezieht
- `index`: Eine Nummer, die identifiziert, zu welchem Komitee der Validator in einem bestimmten Slot gehört
- `beacon_block_root`: Root-Hash des Blocks, den der Validator an der Spitze der Chain sieht (das Ergebnis der Anwendung des Fork-Choice-Algorithmus)
- `source`: Teil der Finalitätsabstimmung, der angibt, was die Validatoren als den jüngsten gerechtfertigten Block ansehen
- `target`: Teil der Finalitätsabstimmung, der angibt, was die Validatoren als den ersten Block in der aktuellen Epoche ansehen

Sobald die `data` erstellt sind, kann der Validator das Bit in den `aggregation_bits`, das seinem eigenen Validator-Index entspricht, von 0 auf 1 setzen, um zu zeigen, dass er teilgenommen hat.

Schließlich signiert der Validator die Bestätigung und überträgt sie an das Netzwerk.

### Aggregierte Bestätigung {#aggregated-attestation}

Es gibt einen erheblichen Overhead, der mit der Weitergabe dieser Daten im Netzwerk für jeden Validator verbunden ist. Daher werden die Bestätigungen einzelner Validatoren innerhalb von Subnetzen aggregiert, bevor sie weiter verbreitet werden. Dies beinhaltet die Aggregation von Signaturen, sodass eine übertragene Bestätigung die Konsens-`data` und eine einzige Signatur enthält, die durch die Kombination der Signaturen aller Validatoren gebildet wird, die mit diesen `data` übereinstimmen. Dies kann mithilfe der `aggregation_bits` überprüft werden, da diese den Index jedes Validators in seinem Komitee (dessen ID in den `data` angegeben ist) liefern, was zur Abfrage einzelner Signaturen verwendet werden kann.

In jeder Epoche werden 16 Validatoren in jedem Subnetz als `aggregators` ausgewählt. Die Aggregatoren sammeln alle Bestätigungen, von denen sie über das Gossip-Netzwerk hören und die äquivalente `data` zu ihren eigenen haben. Der Absender jeder passenden Bestätigung wird in den `aggregation_bits` aufgezeichnet. Die Aggregatoren übertragen dann das Bestätigungsaggregat an das breitere Netzwerk.

Wenn ein Validator als Block-Vorschlagender ausgewählt wird, verpackt er aggregierte Bestätigungen aus den Subnetzen bis zum neuesten Slot in den neuen Block.

### Lebenszyklus der Einbindung von Bestätigungen {#attestation-inclusion-lifecycle}

1. Generierung
2. Verbreitung
3. Aggregation
4. Verbreitung
5. Einbindung

Der Lebenszyklus der Bestätigung ist im folgenden Schema dargestellt:

![Lebenszyklus der Bestätigung](./attestation_schematic.png)

## Belohnungen {#rewards}

Validatoren werden für das Einreichen von Bestätigungen belohnt. Die Belohnung für die Bestätigung hängt von den Teilnahme-Flags (Source, Target und Head), der Grundbelohnung und der Teilnahmequote ab.

Jedes der Teilnahme-Flags kann entweder wahr oder falsch sein, abhängig von der eingereichten Bestätigung und ihrer Einbindungsverzögerung (Inclusion Delay).

Das beste Szenario tritt ein, wenn alle drei Flags wahr sind. In diesem Fall würde ein Validator (pro korrektem Flag) Folgendes verdienen:

`Belohnung += Grundbelohnung * Flag-Gewichtung * Flag-Bestätigungsrate / 64`

Die Flag-Bestätigungsrate wird gemessen, indem die Summe der effektiven Guthaben aller bestätigenden Validatoren für das jeweilige Flag mit dem gesamten aktiven effektiven Guthaben verglichen wird.

### Grundbelohnung {#base-reward}

Die Grundbelohnung wird anhand der Anzahl der bestätigenden Validatoren und ihrer effektiven gestakten Ether-Guthaben berechnet:

`Grundbelohnung = effektives Validator-Guthaben x 2^6 / WURZEL(Effektives Guthaben aller aktiven Validatoren)`

#### Einbindungsverzögerung {#inclusion-delay}

Zu dem Zeitpunkt, als die Validatoren über die Spitze der Chain (`block n`) abstimmten, war `block n+1` noch nicht vorgeschlagen worden. Daher werden Bestätigungen natürlicherweise **einen Block später** eingebunden, sodass alle Bestätigungen, die dafür gestimmt haben, dass `block n` die Spitze der Chain ist, in `block n+1` eingebunden wurden, und die **Einbindungsverzögerung** beträgt 1. Wenn sich die Einbindungsverzögerung auf zwei Slots verdoppelt, halbiert sich die Belohnung für die Bestätigung, da zur Berechnung der Bestätigungsbelohnung die Grundbelohnung mit dem Kehrwert der Einbindungsverzögerung multipliziert wird.

### Bestätigungsszenarien {#attestation-scenarios}

#### Fehlender abstimmender Validator {#missing-voting-validator}

Validatoren haben maximal 1 Epoche Zeit, um ihre Bestätigung einzureichen. Wenn die Bestätigung in Epoche 0 verpasst wurde, können sie diese mit einer Einbindungsverzögerung in Epoche 1 einreichen.

#### Fehlender Aggregator {#missing-aggregator}

Es gibt insgesamt 16 Aggregatoren pro Epoche. Darüber hinaus abonnieren zufällige Validatoren **zwei Subnetze für 256 Epochen** und dienen als Backup, falls Aggregatoren fehlen.

#### Fehlender Block-Vorschlagender {#missing-block-proposer}

Beachten Sie, dass in einigen Fällen ein glücklicher Aggregator auch zum Block-Vorschlagenden werden kann. Wenn die Bestätigung nicht eingebunden wurde, weil der Block-Vorschlagende fehlt, würde der nächste Block-Vorschlagende die aggregierte Bestätigung aufnehmen und in den nächsten Block einbinden. Die **Einbindungsverzögerung** erhöht sich jedoch um eins.

## Weiterführende Literatur {#further-reading}

- [Bestätigungen in Vitaliks kommentierter Konsens-Spezifikation](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Bestätigungen auf eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_