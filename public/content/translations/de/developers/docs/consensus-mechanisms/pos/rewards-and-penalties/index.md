---
title: Proof-of-Stake-Belohnungen und -Bestrafungen
description: Erfahren Sie mehr über die protokollinternen Anreize auf Proof-of-Stake-Ethereum.
lang: de
---

Ethereum wird durch seine native Kryptowährung Ether (ETH) gesichert. Node-Betreiber, die an der Validierung von Blöcken und der Identifizierung der Spitze der Chain teilnehmen möchten, zahlen Ether in den [Einzahlungsvertrag](/staking/deposit-contract/) auf Ethereum ein. Sie werden dann in Ether dafür bezahlt, dass sie eine Validatorensoftware laufen lassen. Diese prüft die Gültigkeit neuer Blöcke, die über das Peer-to-Peer-Netzwerk empfangen werden, und wendet den Abspaltungs-Wahl-Algorithmus an, um die Spitze der Chain zu identifizieren.

Es gibt zwei Hauptaufgaben für einen Validatoren: 1) Er prüft neue Blöcke und „attestiert“ deren Gültigkeit, 2) er schlägt neue Blöcke vor, falls er nach dem Zufallsprinzip aus dem gesamten Validatoren-Pool ausgewählt wurde. Wenn der Validator eine dieser Aufgaben ach Aufforderung nicht erfüllt, verpasst er die Ether-Auszahlung. Validatoren werden manchmal auch mit der Aggregierung von Signaturen und der Teilnahme an Synchronisierungskomitees beauftragt.

Es gibt auch einige Aktionen, die sehr schwer versehentlich durchzuführen sind und auf eine böswillige Absicht hindeuten. Dazu gehört etwa das Vorschlagen mehrerer Blöcke für denselben Slot oder das Attestieren für mehrere Blöcke aus demselben Slot. Das sind Verhaltensweisen, die mit Slashing bestraft werden können. Sie führen dazu, dass ein gewisser Betrag an Ether (bis zu 1 ETH) im Besitz des Validators verbrannt wird, bevor dieser aus dem Netzwerk entfernt wird, was 36 Tage dauert. Die Anzahl der Ether des mit Slashing sanktionierten Validatoren geht über den gesamten Zeitraum des Ausstiegs langsam zurück. An Tag 18 erhalten sie allerdings eine „Korrelationsstrafe“, die größer ist, wenn mehrere Validatoren zur gleichen Zeit mit Slashing bestraft werden. Die Anreizstruktur des Konsensmechanismus belohnt dadurch Ehrlichkeit und bestraft böswillige Akteure.

Alle Belohnungen und Strafen werden in jeder Epoche einmal angewendet.

Lesen Sie weiter und erfahren Sie mehr Details ...

## Belohnungen und Bestrafungen {#rewards}

### Belohnungen {#rewards}

Validatoren erhalten Belohnungen, wenn sie Stimmen abgeben, die mit der Mehrheit der anderen Validatoren übereinstimmen, wenn sie Blöcke vorschlagen und wenn sie an Synchronisierungs-Komitees teilnehmen. Der Wert der Belohnungen in jeder Epoche wird über eine `base_reward` berechnet. Von dieser Basiseinheit werden andere Belohnungen berechnet. Die `Base_Reward` stellt die durchschnittliche Belohnung dar, die ein Validator unter optimalen Bedingungen in jeder Epoche erhält. Sie wird wie folgt aus dem Effektivguthaben des Validatoren und der Gesamtzahl an aktiven Validatoren berechnet:

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

wenn `base_reward_factor` 64 ist, ist `base_rewards_per_epoch` 4 und `sum(active balance)` ist die Gesamtheit der eingesetzten Ether über alle aktiven Validatoren hinweg.

Das bedeutet, dass die Basisbelohnung proportional zum Effektivguthaben des Validatoren und invers proportional zur Anzahl der Validatoren auf dem Netzwerk ist. Je mehr Validatoren, desto höher die Gesamtausgabe (als `sqrt(N)`, aber desto kleiner die `base_reward` pro Validator (als `1/sqrt(N)`). Diese Faktoren beeinflussen die APR für das Staking eines Nodes. Lesen Sie die Gründe dafür in [Vitaliks Notizen](https://notes.ethereum.org/@vbuterin/rkhCgQteN?type=view#Basisbelohnungen).

Die Gesamtbelohnung wird dann als die Summe von fünf Komponenten berechnet, die jeweils eine Gewichtung haben, mit der sich bestimmen lässt, wie viel jede Komponente zur Gesamtbelohnung beiträgt. Die Komponenten sind:

```
1. source vote: the validator has made a timely vote for the correct source checkpoint
2. target vote: the validator has made a timely vote for the correct target checkpoint
3. head vote: the validator has made a timely vote for the correct head block
4. sync committee reward: the validator has participated in a sync committee
5. proposer reward: the validator has proposed a block in the correct slot
```

Die Gewichtungen für jede Komponoente lauten wie folgt:

```
TIMELY_SOURCE_WEIGHT    uint64(14)
TIMELY_TARGET_WEIGHT    uint64(26)
TIMELY_HEAD_WEIGHT  uint64(14)
SYNC_REWARD_WEIGHT  uint64(2)
PROPOSER_WEIGHT uint64(8)
```

Die Summe dieser Gewichte beträgt 64. Die Belohnung ergibt sich aus der Summe der anwendbaren Gewichte geteilt durch 64. Ein Validator, der rechtzeitig Quell-, Ziel- und Spitzenstimmen abgegeben, einen Block vorgeschlagen sowie an einem Synchronisierungs-Komitee teilgenommen hat, könnte `64/64 * base_reward == base_reward` erhalten. Jedoch ist ein Validator normalerweise kein Block-Proposer, weshalb seine maximale Belohnung `64-8 /64 * base_reward == 7/8 * base_reward` beträgt. Validatoren, die weder Block-Proposer noch in einem Synchronisierungskomitee sind, können `64-8-2 / 64 * base_reward == 6.75/8 * base_reward` erhalten.

Eine zusätzliche Belohnung wird als Anreiz für schnelle Attestierungen hinzugefügt. Dies ist die `inclusion_delay_reward`. Sie hat denselben Wert wie die `base_reward` mal `1/delay`, wobei `delay` die Anzahl an Slots ist, die das Block-Proposal und die Attestierungen trennen. Wird die Attestierung beispielsweise innerhalb eines Slots des Block-Proposals eingereicht, erhält der Attestierer `base_reward * 1/1 == base_reward`. Wenn die Attestierung im nächsten Slot eintrifft, erhält der Attestierer `base_reward * 1/2` und so weiter.

Block-Proposer erhalten `8 / 64 * base_reward` für **jede im Block enthaltene gültige Attestierung**. Der echte Wert der Belohnung skaliert also mit der Anzahl an attestierenden Validatoren. Block-Proposer können ihre Belohnungen auch erhöhen, wenn sie Beweise für das Fehlverhalten anderer Validatoren in den von ihnen vorgeschlagenen Block mit aufnehmen. Diese Belohnungen sind das „Zuckerbrot“, das ehrliches Verhalten vonseiten der Validatoren fördert. Ein Block-Proposer einschließlich Slashing wird mit dem `slashed_validators_effective_balance / 512` belohnt.

### Strafen {#penalties}

Bisher haben wir uns nur mit Validatoren beschäftigt, die sich benehmenden. Was aber ist mit Validatoren, die nicht rechtzeitig für Spitze, Quelle und Ziel abstimmen oder dies nur langsam tun?

Die Strafen für das Verpassen der Ziel- und Quellstimmen entsprechen den Belohnungen, die der Attestierer erhalten hätte, wenn er sie eingereicht hätte. Das bedeutet, dass die Belohnung ihrem Guthaben nicht hinzugefügt wird, sondern der gleiche Wert von ihrem Guthaben abgezogen wird. Es gibt keine Strafe für das Verpassen der Spitzenabstimmung („Head Vote“) (d. h. für Spitzenabstimmungen gibt es nur Belohnungen, niemals Strafen). Es gibt keine mit der `inclusion_delay` verbundene Strafe – die Belohnung wird einfach nicht zum Guthaben des Validatoren hinzugefügt. Es gibt auch keine Strafe für das Versäumnis, einen Block vorzuschlagen.

Lesen Sie mehr zu Belohnungen und Strafen in den [Konsensspezifikationen](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/beacon-chain.md). Belohnungen und Strafen wurden im Bellatrix-Upgrade angepasst – sehen Sie zu, wie Danny Ryan und Vitalik dies in einem [Peep an EIP-Video](https://www.youtube.com/watch?v=iaAEGs1DMgQ) diskutieren.

## Slashing {#slashing}

Slashing ist eine schwerwiegendere Maßnahme, die zum gewaltsamen Ausschluss eines Validators aus dem Netzwerk und dem damit verbundenen Verlust seiner eingesetzten Ether führt. Es gibt drei Möglichkeiten, wie ein Validator „geslasht“ werden kann. Alle laufen auf den unehrlichen Vorschlag oder die Attestierung von Blöcken hinaus:

- durch das Vorschlagen und Signieren von zwei unterschiedlichen Blöcken für denselben Slot
- duch das Attestieren für einen Block, der einen anderen „umgibt“ (was die Historie faktisch verändert)
- durch „doppeltes Abstimmen“, indem für zwei Kandidaten für denselben Block attestiert wird

Wenn diese Aktionen erkannt werden, wird der Validator geslasht. Das bedeutet, dass 1/32 des von ihm eingesetzten Ether (bis zu maximal 1 Ether) direkt verbrannt werden, danach beginnt ein 36-tägiger Löschungszeitraum. Während dieses Löschungszeitraums verringert sich der Stake des Validatoren allmählich bis auf null. Zum Mittelpunkt (Tag 18) wird eine zusätzliche Strafe verhängt. Deren Höhe richtet sich nach dem Gesamteinsatz aller mit Slashing sanktionierten Validatoren in den 36 Tagen vor dem Slashing-Ereignis. Dies bedeutet, dass sich das Ausmaß des Slashings erhöht, wenn mehrere Validatoren mit Slashing bestraft werden. Der maximale Slashing-Betrag ist das volle Effektivguthaben aller Validatoren, die mit Slashing sanktioniert wurden (d. h. wenn viele Validatoren mit Slashing bestraft werden, könnten sie ihren gesamten Stake verlieren). Andererseits wird nach einem einzigen, isolierten Slashing-Ereignis nur ein kleiner Anteil des Validatoren-Stakes verbrannt. Diese mit der Anzahl der Validatoren skalierende Mittelpunktstrafe wird als „Korrelationsstrafe“ bezeichnet.

## Inactivity Leak {#inactivity-leak}

Wenn es in der Konsensebene mehr als vier Epochen lang zu keiner Finalisierung kam, wird ein Notfallprotokoll namens „Inactivity Leak“ aktiviert. Das ultimative Ziel des Inactivity Leak ist es, die Bedingungen dafür zu schaffen, dass die Chain Endgültigkeit wiedererlangen kann. Wie oben erläutert erfordert die Endgültigkeit eine 2/3-Mehrheit des gesamten eingesetzten Ethers, um sich auf Quell- und Ziel-Checkpoints zu einigen. Wenn Validatoren, die mehr als 1/3 der gesamten Validatoren repräsentieren, offline gehen oder es versäumen, korrekten Attestierungen einzureichen, ist es für eine 2/3-Supermajority nicht möglich, die Checkpoints zu finalisieren. Das Inactivity Leak sorgt dafür, dass der Stake der inaktiven Validatoren allmählich verschwindet, bis sie weniger als 1/3 des gesamten Stakes kontrollieren, sodass die verbleibenden aktiven Validatoren die Chain finalisieren können. Wie groß der Pool der inaktiven Validatoren auch sein mag, die verbleibenden aktiven Validatoren werden schließlich >2/3 des Stakes kontrollieren. Der Verlust von Stake ist ein starker Anreiz für inaktive Validatoren, so schnell wie möglich wieder aktiv zu werden! Zu einem Szenario mit Inactivity Leak kam es auf dem Medalle-Testnetz, als <66 % der aktiven Validatoren in der Lage waren, einen Konsens zur derzeitigen Spitze der Blockchain zu erreichen. Das Inactivity Leak wurde aktiviert und später wurde die Endgültigkeit zurückgewonnen!

Das Belohnungs-, Strafen- und Slashing-Design des Konsensmechanismus ermutigt die einzelnen Validatoren dazu, sich korrekt zu verhalten. Aus diesen Designentscheidungen ergibt sich jedoch ein System, das starke Anreize für eine gleichmäßige Verteilung der Validatoren auf mehrere Clients setzt und die Anreize zur Dominanz eines einzelnen Clients stark reduzieren sollte.

## Weiterführende Informationen {#further-reading}

- [Upgrading Ethereum: The incentive layer](https://eth2book.info/altair/part2/incentives)
- [Incentives in Ethereum's hybrid Casper protocol](https://arxiv.org/pdf/1903.04205.pdf)
- [Vitalik's annotated spec](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
- [Eth2 Slashing Prevention Tips](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)

_Quellen_

- _[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_
