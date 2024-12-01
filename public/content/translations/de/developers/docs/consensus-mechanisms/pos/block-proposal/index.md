---
title: Block-Vorschlag
description: Erklärung, wie Blöcke unter Proof-of-Stake-Ethereum vorgeschlagen werden.
lang: de
---

Blöcke sind die grundlegenden Einheiten der Blockchain. Blöcke sind diskrete Informationseinheiten, die zwischen den Nodes weitergegeben, vereinbart und der Datenbank jedes Nodes hinzugefügt werden. Diese Seite erklärt, wie sie produziert werden.

## Voraussetzungen {#prerequisites}

Block-Proposals sind Teil des Proof-of-Stake-Protokolls. Um diese Seite zu verstehen, empfehlen wir Ihnen, über [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) und die [Blockarchitektur](/developers/docs/blocks/) nachzulesen.

## Wer produziert Blöcke? {#who-produces-blocks}

Konten von Validatoren schlagen Blöcke vor. Die Konten von Validatoren werden von Node-Operatoren verwaltet, die Validatorensoftware als Teil ihrer Ausführungs- und Konsens-Clients betreiben und mindestens 32 ETH in den Einzahlungsvertrag transferiert haben. Allerdings ist jeder Validator nur gelegentlich für das Vorschlagen eines Blocks zuständig. Ethereum misst die Zeit in Slots und Epochen. Jeder Slot ist zwölf Sekunden lang und 32 Slots (6,4 Minuten) ergeben eine Epoche. Jeder Slot bietet eine Möglichkeit, Ethereum einen neuen Block hinzuzufügen.

### Zufällige Auswahl {#random-selection}

Ein einzelner Validator wird pseudo-zufällig ausgewählt, einen Block in jedem Slot vorzuschlagen. So etwas wie echte Zufälligkeit gibt es nicht in einer Blockchain, denn wenn jeder Node echte Zufallszahlen generieren würde, könnten sie keinen Konsens erzielen. Das Ziel ist es vielmehr, den Validatoren-Auswahlprozess unvorhersehbar zu machen. Die Zufälligkeit wird bei Ethereum durch einen Algorithmus namens RANDAO erreicht, der einen Hash vom Block-Proposer mit einem Seed mischt, der bei jedem Block aktualisiert wird. Dieser Wert wird genutzt, um einen spezifischen Validator aus dem gesamten Validatoren-Set auszuwählen. Die Auswahl der Validatoren wird zwei Epochen im Voraus als Schutz vor bestimmten Arten der Seed-Manipulation festgelegt.

Obwohl die Validatoren in jedem Slot zu RANDAO beitragen, wird der globale RANDAO-Wert nur einmal pro Epoche aktualisiert. Zur Berechnung des Index des nächsten Block-Proposers wird der RANDAO-Wert mit der Slot-Zahl vermischt, um einen eindeutigen Wert für jeden Slot zu erhalten. Die Wahrscheinlichkeit, dass ein einzelner Validator ausgewählt wird, ist nicht einfach `1/N` (wobei `N` = Gesamtzahl der aktiven Validatoren). Stattdessen wird sie nach dem effektiven ETH-Guthaben eines jeden Validators gewichtet. Das maximale Effektivguthaben beträgt 32 ETH (dies bedeutet, dass `ein Guthaben von < 32 ETH` zu einer niedrigeren Gewichtung führt als `ein Guthaben von == 32 ETH`, `ein Guthaben von > 32 ETH` führt jedoch nicht zu einer höheren Gewichtung als `ein Guthaben von == 32 ETH`).

Nur ein Block-Proposer wird in jedem Slot ausgewählt. Unter normalen Bedigungen produziert und veröffentlicht ein einziger Block-Producer einen einzigen Block in ihrem dedizierten Slot. Das Erzeugen von zwei Blöcken für denselben Slot ist ein mit Slashing geahndetes Vergehen, das oft als „Äquivokation“ bezeichnet wird.

## Wie wird der Block erzeugt? {#how-is-a-block-created}

Es wird erwartet, dass der Block-Proposer einen signierten Beacon Block versendet, der auf der jüngsten Spitze der Chain aufbaut, entsprechend der Ansicht seines eigenen, lokal ausgeführten Abspaltungs-Wahl-Algorithmus. Der Abspaltungs-Wahl-Algorithmus wendet alle in der Warteschlange befindlichen Attestierungen an, die vom vorherigen Slot übrig geblieben sind. Dann findet er den Block mit dem größten kumulierten Gewicht an Attestierungen in seiner Historie. Dies ist der Parent Block für den neuen Block, der vom Proposer erstellt wird.

Der Block-Proposer erstellt einen Block, indem er Daten aus seiner eigenen lokalen Datenbank und Ansicht der Chain sammelt. Der Inhalt des Blocks ist in dem nachstehenden Ausschnitt dargestellt:

```rust
class BeaconBlockBody(Container):
    randao_reveal: BLSSignature
    eth1_data: Eth1Data
    graffiti: Bytes32
    proposer_slashings: List[ProposerSlashing, MAX_PROPOSER_SLASHINGS]
    attester_slashings: List[AttesterSlashing, MAX_ATTESTER_SLASHINGS]
    attestations: List[Attestation, MAX_ATTESTATIONS]
    deposits: List[Deposit, MAX_DEPOSITS]
    voluntary_exits: List[SignedVoluntaryExit, MAX_VOLUNTARY_EXITS]
    sync_aggregate: SyncAggregate
    execution_payload: ExecutionPayload
```

Das `randao_reveal`-Feld nimmt einen verifizierbaren zufälligen Wert an, den der Block-Proposer erzeugt, indem er die derzeitige Epochennummer signiert. `eth1_data` ist eine Stimme für die Ansicht des Block-Proposers auf den Einzahlungsvertrag, einschließlich der Root des Einzahlungs-Merkle-Trees und der Gesamtzahl an Einzahlungen, die eine Verifizierung neuer Einzahlungen ermöglichen. `graffiti` ist ein optionales Feld, welches verwendet wird, um dem Block eine Nachricht hinzuzufügen. `proposer_slashings` und `attester_slashings` sind Felder, die Beweise dafür enthalten, dass bestimmte Validatoren nach der Auffassung des Proposers in der Chain Vergehen begangen haben, die mit Slashing bestraft werden können. `deposits` ist eine Liste neuer Validator-Einzahlungen, die dem Block-Proposer bekannt sind, und `voluntary_exits` ist eine Liste von Validatoren, die aussteigen möchten und von denen der Block-Proposer im Gossip-Netzwerk der Konsensebene gehört hat. `sync_aggregate` ist ein Vektor, der anzeigt, welche Validatoren zuvor einem Synchronisierungskomitee (eine Untergruppe von Validatoren, die leichte Daten des Clients liefern) zugewiesen waren und an der Signierung von Daten teilgenommen haben.

`execution_payload` ermöglicht die Weitergabe von Informationen über Transaktionen zwischen den Ausführungs- und Konsens-Clients. `execution_payload` ist ein Block mit Ausführungsdaten, der in einen Beacon Block eingebettet wird. Das Feld in `execution_payload` reflektiert die Blockstruktur, die im Yellowpaper für Ethereum aufgezeigt wird, mit dem Unterschied, dass es keine „Ommers“ gibt und `prev_randao` anstelle von `difficulty` existiert. Der Ausführungs-Client hat Zugriff auf einen lokalen Pool von Transaktionen, von denen es in seinem eigenen Gossip-Netzwerk gehört hat. Diese Transaktionen werden lokal ausgeführt, um einen aktualisierten Zustands-Trie zu generieren, der als „Post-State“ bezeichnet wird. Die Transaktionen sind in `execution_payload` als Liste, die `transactions` genannt wird, enthalten und der Post-State wird im Feld `state-root` zur Verfügung gestellt.

All diese Daten werden in einem Beacon Block gesammelt, signiert und an die Peers von Block-Proposern übertragen, die sie an ihre Peers weitergeben usw.

Lesen Sie mehr zur [Anatomie von Blöcken](/developers/docs/blocks).

## Was passiert mit dem Block? {#what-happens-to-blocks}

Der Block wird zur lokalen Datenbank des Block-Proposers hinzugefügt und über das Gossip-Netzwerk der Konsensebene an die Peers übertragen. Wenn ein Validator den Block empfängt, überprüft er die darin enthaltenen Daten. Er verifiziert, dass der Block das richtige Parent hat, dem richtigen Slot zugeordnet ist, dass der Index des Proposers der erwartete ist, dass das RANDAO Reveal gültig ist und dass der Proposer nicht geslasht wird. `execution_payload` ist nicht gebündelt und der Ausführungs-Client des Validatoren führt die Transaktionen in der Liste wieder aus, um den vorgeschlagenen Zustandswechsel zu überprüfen. Vorausgesetzt, dass der Block all diese Prüfungen besteht, fügt jeder Validator den Block seiner eigenen kanonischen Chain hinzu. Der Prozess startet dann im nächsten Slot wieder von Neuem.

## Blockbelohnungen {#block-rewards}

Der Block-Proposer wird für seine Arbeit bezahlt. Ihm steht eine `base_reward` zu, die als eine Funktion aus der Anzahl der aktiven Validatoren und deren Effektivguthaben berechnet wird. Der Block-Proposer erhält dann einen Anteil der `base_reward` für jede gültige Attestierung, die in diesem Block enthalten ist; je mehr Validatoren den Block attestieren, desto größer fällt die Belohnung für den Block-Proposer aus. Es gibt auch eine Belohnung für das Melden von Validatoren, die mit Slashing bestraft werden sollten, in der Höhe von `1/512 * Effektivguthaben` für jeden mit Slashing sanktionierten Validator.

[Mehr zu Belohnungen und Strafen](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)

## Weiterführende Informationen {#further-reading}

- [Einführung in Blöcke](/developers/docs/blocks/)
- [Einführung zu Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/)
- [Konsensspezifikationen auf Ethereum](https://github.com/ethereum/consensus-specs)
- [Einführung zu Gasper](/developers/docs/consensus-mechanisms/pos/)
- [Ethereum-Upgrade](https://eth2book.info/)
