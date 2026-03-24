---
title: Block-Vorschlag
description: "Erklärung, wie Blöcke im Proof-of-Stake-Ethereum vorgeschlagen werden."
lang: de
---

Blöcke sind die grundlegenden Einheiten der Blockchain. Blöcke sind diskrete Informationseinheiten, die zwischen Blockchain-Knoten weitergegeben, vereinbart und der Datenbank jedes Blockchain-Knotens hinzugefügt werden. Diese Seite erklärt, wie sie produziert werden.

## Voraussetzungen {#prerequisites}

Der Block-Vorschlag ist Teil des Proof-of-Stake-Protokolls. Um diese Seite besser zu verstehen, empfehlen wir Ihnen, sich über [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) und [Blockarchitektur](/developers/docs/blocks/) zu informieren.

## Wer produziert Blöcke? {#who-produces-blocks}

Validator-Konten schlagen Blöcke vor. Validator-Konten werden von Betreibern von Blockchain-Knoten verwaltet, die Validator-Software als Teil ihrer Ausführungs-Clients und Konsens-Clients ausführen und mindestens 32 ETH in den Einzahlungsvertrag eingezahlt haben. Jeder Validator ist jedoch nur gelegentlich dafür verantwortlich, einen Block vorzuschlagen. [Ethereum](/) misst die Zeit in Slots und Epochen. Jeder Slot dauert zwölf Sekunden, und 32 Slots (6,4 Minuten) bilden eine Epoche. Jeder Slot ist eine Gelegenheit, einen neuen Block zu Ethereum hinzuzufügen.

### Zufällige Auswahl {#random-selection}

Ein einzelner Validator wird pseudozufällig ausgewählt, um in jedem Slot einen Block vorzuschlagen. Es gibt keine echte Zufälligkeit in einer Blockchain, denn wenn jeder Blockchain-Knoten wirklich zufällige Zahlen generieren würde, könnten sie nicht zu einem Konsens kommen. Stattdessen ist das Ziel, den Auswahlprozess der Validatoren unvorhersehbar zu machen. Die Zufälligkeit wird auf Ethereum mithilfe eines Algorithmus namens RANDAO erreicht, der einen Hash vom Block-Vorschlagenden mit einem Seed mischt, der bei jedem Block aktualisiert wird. Dieser Wert wird verwendet, um einen bestimmten Validator aus der gesamten Menge der Validatoren auszuwählen. Die Auswahl der Validatoren wird zwei Epochen im Voraus festgelegt, um sich vor bestimmten Arten der Seed-Manipulation zu schützen.

Obwohl Validatoren in jedem Slot zu RANDAO beitragen, wird der globale RANDAO-Wert nur einmal pro Epoche aktualisiert. Um den Index des nächsten Block-Vorschlagenden zu berechnen, wird der RANDAO-Wert mit der Slot-Nummer gemischt, um in jedem Slot einen eindeutigen Wert zu erhalten. Die Wahrscheinlichkeit, dass ein einzelner Validator ausgewählt wird, ist nicht einfach `1/N` (wobei `N` = gesamte aktive Validatoren). Stattdessen wird sie durch das effektive ETH-Guthaben jedes Validators gewichtet. Das maximale effektive Guthaben beträgt 32 ETH (das bedeutet, dass `balance < 32 ETH` zu einer geringeren Gewichtung führt als `balance == 32 ETH`, aber `balance > 32 ETH` führt nicht zu einer höheren Gewichtung als `balance == 32 ETH`).

In jedem Slot wird nur ein Block-Vorschlagender ausgewählt. Unter normalen Bedingungen erstellt und veröffentlicht ein einzelner Blockproduzent einen einzigen Block in seinem zugewiesenen Slot. Das Erstellen von zwei Blöcken für denselben Slot ist ein Vergehen, das mit Slashing bestraft wird und oft als „Equivocation“ (Doppeldeutigkeit) bezeichnet wird.

## Wie wird der Block erstellt? {#how-is-a-block-created}

Vom Block-Vorschlagenden wird erwartet, dass er einen signierten Beacon Chain-Block überträgt, der auf dem aktuellsten Kopf der Chain aufbaut, entsprechend der Sicht seines eigenen lokal ausgeführten Fork-Choice-Algorithmus. Der Fork-Choice-Algorithmus wendet alle in der Warteschlange befindlichen Bestätigungen an, die aus dem vorherigen Slot übrig geblieben sind, und findet dann den Block mit dem größten akkumulierten Gewicht an Bestätigungen in seiner Historie. Dieser Block ist der übergeordnete Block (Parent) des neuen Blocks, der vom Vorschlagenden erstellt wird.

Der Block-Vorschlagende erstellt einen Block, indem er Daten aus seiner eigenen lokalen Datenbank und seiner Sicht auf die Chain sammelt. Der Inhalt des Blocks wird im folgenden Ausschnitt gezeigt:

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

Das Feld `randao_reveal` nimmt einen verifizierbaren Zufallswert auf, den der Block-Vorschlagende durch Signieren der aktuellen Epochennummer erstellt. `eth1_data` ist eine Abstimmung für die Sicht des Block-Vorschlagenden auf den Einzahlungsvertrag, einschließlich der Wurzel des Einzahlungs-Merkle-Tries und der Gesamtzahl der Einzahlungen, die es ermöglichen, neue Einzahlungen zu verifizieren. `graffiti` ist ein optionales Feld, das verwendet werden kann, um dem Block eine Nachricht hinzuzufügen. `proposer_slashings` und `attester_slashings` sind Felder, die Beweise dafür enthalten, dass bestimmte Validatoren nach Ansicht des Vorschlagenden auf die Chain Vergehen begangen haben, die mit Slashing bestraft werden. `deposits` ist eine Liste neuer Validator-Einzahlungen, die dem Block-Vorschlagenden bekannt sind, und `voluntary_exits` ist eine Liste von Validatoren, die austreten möchten und von denen der Block-Vorschlagende im Gossip-Netzwerk der Konsensebene gehört hat. Das `sync_aggregate` ist ein Vektor, der zeigt, welche Validatoren zuvor einem Sync-Komitee (einer Untergruppe von Validatoren, die Light-Client-Daten bereitstellen) zugewiesen waren und an der Signierung von Daten teilgenommen haben.

Die `execution_payload` ermöglicht es, Informationen über Transaktionen zwischen den Ausführungs-Clients und Konsens-Clients weiterzugeben. Die `execution_payload` ist ein Block von Ausführungsdaten, der in einem Beacon Chain-Block verschachtelt wird. Die Felder innerhalb der `execution_payload` spiegeln die im Ethereum Yellow Paper skizzierte Blockstruktur wider, mit der Ausnahme, dass es keine Ommers gibt und `prev_randao` anstelle von `difficulty` existiert. Der Ausführungs-Client hat Zugriff auf einen lokalen Pool von Transaktionen, von denen er in seinem eigenen Gossip-Netzwerk gehört hat. Diese Transaktionen werden lokal ausgeführt, um einen aktualisierten Zustands-Trie zu generieren, der als Post-State bekannt ist. Die Transaktionen sind in der `execution_payload` als eine Liste namens `transactions` enthalten, und der Post-State wird im Feld `state-root` bereitgestellt.

All diese Daten werden in einem Beacon Chain-Block gesammelt, signiert und an die Peers des Block-Vorschlagenden übertragen, die ihn an ihre Peers weiterleiten usw.

Lesen Sie mehr über die [Anatomie von Blöcken](/developers/docs/blocks).

## Was passiert mit dem Block? {#what-happens-to-blocks}

Der Block wird der lokalen Datenbank des Block-Vorschlagenden hinzugefügt und über das Gossip-Netzwerk der Konsensebene an Peers übertragen. Wenn ein Validator den Block empfängt, verifiziert er die darin enthaltenen Daten, einschließlich der Überprüfung, ob der Block den richtigen übergeordneten Block (Parent) hat, dem richtigen Slot entspricht, der Index des Vorschlagenden der erwartete ist, der RANDAO-Reveal gültig ist und der Vorschlagende nicht mit Slashing bestraft wurde. Die `execution_payload` wird entbündelt, und der Ausführungs-Client des Validators führt die Transaktionen in der Liste erneut aus, um die vorgeschlagene Zustandsänderung zu überprüfen. Unter der Annahme, dass der Block all diese Überprüfungen besteht, fügt jeder Validator den Block seiner eigenen kanonischen Chain hinzu. Der Prozess beginnt dann im nächsten Slot von vorn.

## Block-Belohnungen {#block-rewards}

Der Block-Vorschlagende erhält eine Bezahlung für seine Arbeit. Es gibt eine `base_reward`, die als Funktion der Anzahl der aktiven Validatoren und ihrer effektiven Guthaben berechnet wird. Der Block-Vorschlagende erhält dann einen Bruchteil der `base_reward` für jede gültige Bestätigung, die im Block enthalten ist; je mehr Validatoren den Block bestätigen, desto größer ist die Belohnung des Block-Vorschlagenden. Es gibt auch eine Belohnung für das Melden von Validatoren, die mit Slashing bestraft werden sollten, in Höhe von `1/512 * effektives Guthaben` für jeden mit Slashing bestraften Validator.

[Mehr zu Belohnungen und Strafen](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)

## Weiterführende Literatur {#further-reading}

- [Einführung in Blöcke](/developers/docs/blocks/)
- [Einführung in Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/)
- [Ethereum-Konsens-Spezifikationen](https://github.com/ethereum/consensus-specs)
- [Einführung in Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)
- [Upgrading Ethereum](https://eth2book.info/)