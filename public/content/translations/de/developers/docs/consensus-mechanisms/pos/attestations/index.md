---
title: Attestierungen
description: Eine Beschreibung von Attestierungen im Proof-of-Stake-Ethereum.
lang: de
---

Von einem Validator wird erwartet, dass er in jeder Epoche eine Attestierung erstellt, signiert und überträgt. Diese Seite beschreibt, wie diese Attestierungen aussehen und wie sie zwischen Konsens-Clients verarbeitet und kommuniziert werden.

## Was ist eine Attestierung? {#what-is-an-attestation}

Jede [Epoche](/glossary/#epoch) (6,4 Minuten) überträgt ein Validator eine Attestierung an das Netzwerk. Die Attestierung gilt für einen bestimmten Slot in der Epoche. Der Zweck der Attestierung besteht darin, für die Sicht des Validators auf die Chain abzustimmen, insbesondere für den Kopf der Chain, den jüngsten gerechtfertigten Checkpoint und den Checkpoint zu Beginn der aktuellen Epoche (bekannt als `source`- und `target`-Checkpoints). Diese Informationen werden für alle teilnehmenden Validatoren kombiniert, wodurch das Netzwerk einen Konsens über den Zustand der Blockchain erreichen kann.

Seit dem [Pectra-Upgrade](/roadmap/pectra/) ([EIP-7549](https://eips.ethereum.org/EIPS/eip-7549)) haben eine Attestierung von einem einzelnen Validator und eine aggregierte Attestierung unterschiedliche Formate. Die Attestierung eines einzelnen Validators enthält:

- `committee_index`: das Komitee, dem der Validator im gegebenen Slot angehört
- `attester_index`: der Index des Validators
- `data`: Details zur Attestierung, wie unten definiert
- `signature`: die BLS-Signatur des Validators über die `data`

Die erste Aufgabe für einen attestierenden Validator besteht darin, die `data` zu erstellen. Die `data` enthält die folgenden Informationen:

- `slot`: Die Slot-Nummer, auf die sich die Attestierung bezieht
- `index`: Seit Pectra auf `0` gesetzt. Das Komitee wird außerhalb der `data` identifiziert (durch `committee_index` oder durch `committee_bits` in einem Aggregat), sodass Stimmen von verschiedenen Komitees identische `data` haben und zusammen aggregiert werden können. Vor Pectra identifizierte dieses Feld das Komitee
- `beacon_block_root`: Root-Hash des Blocks, den der Validator am Kopf der Chain sieht (das Ergebnis der Anwendung des Fork-Choice-Algorithmus)
- `source`: Teil der Endgültigkeits-Abstimmung, der angibt, was die Validatoren als den jüngsten gerechtfertigten Checkpoint ansehen
- `target`: Teil der Endgültigkeits-Abstimmung, der angibt, was die Validatoren als den Checkpoint zu Beginn der aktuellen Epoche ansehen (der Block in ihrem ersten Slot oder der letzte Block davor, falls dieser Slot leer ist)

Sobald die `data` erstellt ist, signiert der Validator sie und überträgt die Attestierung an das [Subnetz](#aggregated-attestation) für sein Komitee.

### Aggregierte Attestierung {#aggregated-attestation}

Es ist mit erheblichem Aufwand verbunden, diese Daten für jeden Validator im Netzwerk weiterzuleiten. Daher werden die Attestierungen einzelner Validatoren innerhalb von Subnetzen aggregiert, bevor sie weiter verbreitet werden. Dies beinhaltet das Zusammenfassen von Signaturen, sodass eine übertragene Attestierung die Konsens-`data` und eine einzige Signatur enthält, die durch die Kombination der Signaturen aller Validatoren gebildet wird, die mit dieser `data` übereinstimmen. Eine aggregierte Attestierung enthält:

- `aggregation_bits`: eine Bitliste mit einem Bit pro Mitglied jedes einbezogenen Komitees, wobei die Position der Position des Validators in seinem Komitee entspricht; der Wert (0/1) gibt an, ob die Signatur dieses Validators enthalten ist
- `data`: die Attestierungsdaten, die jeder einbezogene Validator signiert hat
- `signature`: eine BLS-Signatur, die die Signaturen der einbezogenen Validatoren aggregiert
- `committee_bits`: die Mitglieder welcher Komitees durch `aggregation_bits` abgedeckt sind

Jeder kann die aggregierte Signatur gegen die kombinierten öffentlichen Schlüssel der Validatoren prüfen, deren Bits gesetzt sind.

In jedem Slot werden etwa 16 Mitglieder jedes Komitees als dessen `aggregators` (`TARGET_AGGREGATORS_PER_COMMITTEE`) ausgewählt. Ein Validator erfährt aus seiner eigenen Signatur über die Slot-Nummer, ob er ausgewählt wurde. Die Aggregatoren sammeln alle Attestierungen, die sie im Subnetz ihres Komitees hören und die dieselbe `data` wie ihre eigene haben, und kombinieren sie, wobei sie den Absender jeder einzelnen in der `aggregation_bits` aufzeichnen. Die Aggregatoren übertragen das Aggregat dann an das weitere Netzwerk.

Wenn ein Validator als Block-Proposer ausgewählt wird, fügt er aggregierte Attestierungen aus den letzten Slots in den neuen Block ein. Seit Pectra kann der Proposer Aggregate von verschiedenen Komitees, die dieselbe `data` teilen, zu einer Attestierung zusammenführen, und ein Block kann bis zu 8 davon aufnehmen.

### Lebenszyklus der Attestierungseinbindung {#attestation-inclusion-lifecycle}

1. Generierung
2. Verbreitung
3. Aggregation
4. Verbreitung
5. Einbindung

Der Lebenszyklus der Attestierung ist im folgenden Schema dargestellt:

<AttestationsDiagram />

## Belohnungen {#rewards}

Validatoren erhalten eine Belohnung für das Einreichen von Attestierungen. Die Attestierungsbelohnung hängt von den Teilnahme-Flags (Quelle, Ziel und Kopf), der Basisbelohnung und der Teilnahmequote ab.

Jedes der Teilnahme-Flags kann entweder wahr oder falsch sein, abhängig von der eingereichten Attestierung und ihrer Einbindungsverzögerung.

Das beste Szenario tritt ein, wenn alle drei Flags wahr sind. In diesem Fall würde ein Validator (pro korrektem Flag) Folgendes verdienen:

`reward += base reward * flag weight * flag attesting rate / 64`

Die Attestierungsrate des Flags wird gemessen, indem die Summe der effektiven Guthaben aller attestierenden Validatoren für das gegebene Flag mit dem gesamten aktiven effektiven Guthaben verglichen wird.

### Basisbelohnung {#base-reward}

Die Basisbelohnung wird anhand der Anzahl der attestierenden Validatoren und ihrer effektiven gestakten Ether-Guthaben berechnet:

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### Einbindungsverzögerung {#inclusion-delay}

Zu dem Zeitpunkt, als die Validatoren über den Kopf der Chain (`block n`) abstimmten, war `block n+1` noch nicht vorgeschlagen worden. Daher werden Attestierungen natürlicherweise **einen Block später** eingebunden, sodass alle Attestierungen, die dafür gestimmt haben, dass `block n` der Chain-Kopf ist, in `block n+1` eingebunden wurden, und die **Einbindungsverzögerung** beträgt 1. Die Einbindungsverzögerung entscheidet, welche Teilnahme-Flags eine Attestierung erhält:

- `head`: nur, wenn die Einbindungsverzögerung genau 1 Slot beträgt
- `source`: wenn die Einbindungsverzögerung höchstens 5 Slots beträgt (die ganzzahlige Quadratwurzel der 32 Slots in einer Epoche)
- `target`: wann immer die Attestierung eingebunden wird (seit dem Deneb-Upgrade, [EIP-7045](https://eips.ethereum.org/EIPS/eip-7045))

Eine Attestierung, die zwei Slots zu spät eingebunden wird, verliert also ihre Kopf-Belohnung, erhält aber weiterhin die Quellen- und Ziel-Belohnungen.

### Attestierungsszenarien {#attestation-scenarios}

#### Fehlender abstimmender Validator {#missing-voting-validator}

Eine Attestierung kann in jeden Block ab dem Slot nach ihrer Erstellung bis zum Ende der folgenden Epoche eingebunden werden. Wenn eine Attestierung aus Epoche 0 während Epoche 0 nicht in einen Block eingebunden wird, kann sie immer noch in Epoche 1 eingebunden werden, mit einer längeren Einbindungsverzögerung.

#### Fehlender Aggregator {#missing-aggregator}

Jedes Komitee strebt etwa 16 Aggregatoren in jedem Slot an, sodass ein fehlender Aggregator selten verhindert, dass die Attestierungen eines Komitees aggregiert werden. Unabhängig davon bleibt jeder Beacon-Knoten jeweils für **256 Epochen bei zwei Subnetzen** abonniert, die anhand seiner Knoten-ID ausgewählt werden, was jedes Subnetz gut vernetzt hält.

#### Fehlender Block-Proposer {#missing-block-proposer}

Beachten Sie, dass in einigen Fällen ein glücklicher Aggregator auch zum Block-Proposer werden kann. Wenn die Attestierung nicht eingebunden wurde, weil der Block-Proposer fehlt, würde der nächste Block-Proposer die aggregierte Attestierung aufnehmen und in den nächsten Block einbinden. Die **Einbindungsverzögerung** erhöht sich jedoch um eins.

## Weiterführende Literatur {#further-reading}

- [Attestierungen in Vitaliks kommentierter Konsens-Spezifikation](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Attestierungen auf eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)
- [Attestierungen in der Electra-Konsens-Spezifikation](https://github.com/ethereum/consensus-specs/blob/master/specs/electra/beacon-chain.md#attestation)

_Kennst du eine Community-Ressource, die dir geholfen hat? Bearbeite diese Seite und füge sie hinzu!_
