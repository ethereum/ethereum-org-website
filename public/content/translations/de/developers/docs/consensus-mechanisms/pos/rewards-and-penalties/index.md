---
title: Proof-of-Stake-Belohnungen und -Strafen
description: "Erfahren Sie mehr über die protokollinternen Anreize im Proof-of-Stake-Ethereum."
lang: de
---

[Ethereum](/) wird durch seine native Kryptowährung, Ether (ETH), gesichert. Knotenbetreiber, die an der Validierung von Blöcken und der Identifizierung des Kopfes der Chain teilnehmen möchten, zahlen Ether in den [Einzahlungsvertrag](/staking/deposit-contract/) auf Ethereum ein. Sie werden dann in Ether bezahlt, um Validator-Software auszuführen, die die Gültigkeit neuer Blöcke überprüft, die über das Peer-to-Peer-Netzwerk empfangen werden, und den Fork-Choice-Algorithmus anwendet, um den Kopf der Chain zu identifizieren.

Es gibt zwei Hauptrollen für einen Validator: 1) Überprüfung neuer Blöcke und deren „Attestierung“, wenn sie gültig sind, 2) Vorschlagen neuer Blöcke, wenn er zufällig aus dem gesamten Validator-Pool ausgewählt wird. Wenn der Validator eine dieser Aufgaben nicht erfüllt, wenn er dazu aufgefordert wird, entgeht ihm eine Ether-Auszahlung. Validatoren werden manchmal auch mit der Signaturaggregation und der Teilnahme an Sync-Komitees beauftragt.

Es gibt auch einige Aktionen, die sehr schwer versehentlich durchzuführen sind und auf eine böswillige Absicht hindeuten, wie z. B. das Vorschlagen mehrerer Blöcke für denselben Slot oder die Attestierung mehrerer Blöcke für denselben Slot. Dies sind Verhaltensweisen, die zu einem „Slashing“ führen, was zur Folge hat, dass dem Validator eine bestimmte Menge an Ether (bis zu 1 ETH) verbrannt wird, bevor der Validator aus dem Netzwerk entfernt wird, was 36 Tage dauert. Die Ether des geslashten Validators fließen über die Austrittsperiode langsam ab, aber an Tag 18 erhalten sie eine „Korrelationsstrafe“, die größer ist, wenn mehr Validatoren etwa zur gleichen Zeit geslasht werden. Die Anreizstruktur des Konsensmechanismus belohnt daher Ehrlichkeit und bestraft böswillige Akteure.

Alle Belohnungen und Strafen werden einmal pro Epoche angewendet.

Lesen Sie weiter für mehr Details...

## Belohnungen und Strafen {#rewards}

### Belohnungen {#rewards-2}

Validatoren erhalten Belohnungen, wenn sie Stimmen abgeben, die mit der Mehrheit der anderen Validatoren übereinstimmen, wenn sie Blöcke vorschlagen und wenn sie an Sync-Komitees teilnehmen. Der Wert der Belohnungen in jeder Epoche wird aus einer `base_reward` berechnet. Dies ist die Basiseinheit, aus der andere Belohnungen berechnet werden. Die `base_reward` stellt die durchschnittliche Belohnung dar, die ein Validator unter optimalen Bedingungen pro Epoche erhält. Diese wird aus dem effektiven Guthaben des Validators und der Gesamtzahl der aktiven Validatoren wie folgt berechnet:

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

wobei `base_reward_factor` 64 ist, `base_rewards_per_epoch` 4 ist und `sum(active balance)` die gesamten gestakten Ether aller aktiven Validatoren sind.

Das bedeutet, dass die Basisbelohnung proportional zum effektiven Guthaben des Validators und umgekehrt proportional zur Anzahl der Validatoren im Netzwerk ist. Je mehr Validatoren, desto größer die gesamte Emission (da `sqrt(N)`), aber desto kleiner die `base_reward` pro Validator (da `1/sqrt(N)`). Diese Faktoren beeinflussen die APR für einen Staking-Knoten. Lesen Sie die Begründung dafür in [Vitaliks Notizen](https://notes.ethereum.org/@vbuterin/serenity_design_rationale?type=view#Base-rewards).

Die Gesamtbelohnung wird dann als Summe von fünf Komponenten berechnet, die jeweils eine Gewichtung haben, die bestimmt, wie viel jede Komponente zur Gesamtbelohnung beiträgt. Die Komponenten sind:

```
1. source vote: Der Validator hat rechtzeitig eine Stimme für den korrekten Quell-Checkpoint abgegeben
2. target vote: Der Validator hat rechtzeitig eine Stimme für den korrekten Ziel-Checkpoint abgegeben
3. head vote: Der Validator hat rechtzeitig eine Stimme für den korrekten Head-Block abgegeben
4. sync committee reward: Der Validator hat an einem Sync-Komitee teilgenommen
5. proposer reward: Der Validator hat einen Block im korrekten Slot vorgeschlagen
```

Die Gewichtungen für jede Komponente sind wie folgt:

```
TIMELY_SOURCE_WEIGHT	uint64(14)
TIMELY_TARGET_WEIGHT	uint64(26)
TIMELY_HEAD_WEIGHT	uint64(14)
SYNC_REWARD_WEIGHT	uint64(2)
PROPOSER_WEIGHT	uint64(8)
```

Diese Gewichtungen summieren sich auf 64. Die Belohnung wird als Summe der anwendbaren Gewichtungen geteilt durch 64 berechnet. Ein Validator, der rechtzeitig Source-, Target- und Head-Stimmen abgegeben, einen Block vorgeschlagen und an einem Sync-Komitee teilgenommen hat, könnte `64/64 * base_reward == base_reward` erhalten. Ein Validator ist jedoch normalerweise kein Block-Proposer, daher beträgt seine maximale Belohnung `64-8 /64 * base_reward == 7/8 * base_reward`. Validatoren, die weder Block-Proposer noch in einem Sync-Komitee sind, können `64-8-2 / 64 * base_reward == 6.75/8 * base_reward` erhalten.

Eine zusätzliche Belohnung wird hinzugefügt, um schnelle Attestierungen zu fördern. Dies ist die `inclusion_delay_reward`. Diese hat einen Wert, der der `base_reward` multipliziert mit `1/delay` entspricht, wobei `delay` die Anzahl der Slots ist, die den Block-Vorschlag und die Attestierung trennen. Wenn die Attestierung beispielsweise innerhalb eines Slots nach dem Block-Vorschlag eingereicht wird, erhält der Attestierende `base_reward * 1/1 == base_reward`. Wenn die Attestierung im nächsten Slot eintrifft, erhält der Attestierende `base_reward * 1/2` und so weiter.

Block-Proposer erhalten `8 / 64 * base_reward` für **jede gültige Attestierung**, die im Block enthalten ist, sodass der tatsächliche Wert der Belohnung mit der Anzahl der attestierenden Validatoren skaliert. Block-Proposer können ihre Belohnung auch erhöhen, indem sie Beweise für Fehlverhalten anderer Validatoren in ihren vorgeschlagenen Block aufnehmen. Diese Belohnungen sind das „Zuckerbrot“, das die Ehrlichkeit der Validatoren fördert. Ein Block-Proposer, der ein Slashing einschließt, wird mit der `slashed_validators_effective_balance / 512` belohnt.

### Strafen {#penalties}

Bisher haben wir uns perfekt verhaltende Validatoren betrachtet, aber was ist mit Validatoren, die nicht rechtzeitig Head-, Source- und Target-Stimmen abgeben oder dies nur langsam tun?

Die Strafen für das Verpassen der Target- und Source-Stimmen entsprechen den Belohnungen, die der Attestierende erhalten hätte, wenn er sie eingereicht hätte. Das bedeutet, dass anstelle der Hinzufügung der Belohnung zu ihrem Guthaben ein gleichwertiger Betrag von ihrem Guthaben abgezogen wird. Es gibt keine Strafe für das Verpassen der Head-Stimme (d. h. Head-Stimmen werden nur belohnt, niemals bestraft). Es gibt keine Strafe im Zusammenhang mit der `inclusion_delay` – die Belohnung wird dem Guthaben des Validators einfach nicht hinzugefügt. Es gibt auch keine Strafe für das Versäumnis, einen Block vorzuschlagen.

Lesen Sie mehr über Belohnungen und Strafen in den [Konsensspezifikationen](https://github.com/ethereum/consensus-specs/blob/master/specs/altair/beacon-chain.md). Belohnungen und Strafen wurden im Bellatrix-Upgrade angepasst – sehen Sie sich an, wie Danny Ryan und Vitalik dies in diesem [Peep an EIP-Video](https://www.youtube.com/watch?v=iaAEGs1DMgQ) diskutieren.

## Slashing {#slashing}

Slashing ist eine schwerwiegendere Maßnahme, die zur zwangsweisen Entfernung eines Validators aus dem Netzwerk und einem damit verbundenen Verlust seiner gestakten Ether führt. Es gibt drei Möglichkeiten, wie ein Validator geslasht werden kann, die alle auf den unehrlichen Vorschlag oder die Attestierung von Blöcken hinauslaufen:

- Durch das Vorschlagen und Signieren von zwei verschiedenen Blöcken für denselben Slot
- Durch die Attestierung eines Blocks, der einen anderen „umgibt“ (was effektiv die Historie ändert)
- Durch „doppelte Stimmabgabe“ (Double Voting), indem für zwei Kandidaten für denselben Block attestiert wird

Wenn diese Aktionen erkannt werden, wird der Validator geslasht. Das bedeutet, dass 0,0078125 sofort für einen 32-ETH-Validator verbrannt werden (linear skaliert mit dem aktiven Guthaben), woraufhin eine 36-tägige Entfernungsperiode beginnt. Während dieser Entfernungsperiode blutet der Stake des Validators allmählich aus. Zur Halbzeit (Tag 18) wird eine zusätzliche Strafe verhängt, deren Ausmaß mit den gesamten gestakten Ethern aller geslashten Validatoren in den 36 Tagen vor dem Slashing-Ereignis skaliert. Das bedeutet, dass das Ausmaß des Slashings zunimmt, wenn mehr Validatoren geslasht werden. Das maximale Slashing ist das volle effektive Guthaben aller geslashten Validatoren (d. h., wenn viele Validatoren geslasht werden, könnten sie ihren gesamten Stake verlieren). Andererseits verbrennt ein einzelnes, isoliertes Slashing-Ereignis nur einen kleinen Teil des Stakes des Validators. Diese Halbzeitstrafe, die mit der Anzahl der geslashten Validatoren skaliert, wird als „Korrelationsstrafe“ bezeichnet.

## Inaktivitätsleck {#inactivity-leak}

Wenn die Konsensschicht mehr als vier Epochen ohne Endgültigkeit durchlaufen hat, wird ein Notfallprotokoll namens „Inaktivitätsleck“ aktiviert. Das ultimative Ziel des Inaktivitätslecks ist es, die Bedingungen zu schaffen, die erforderlich sind, damit die Chain die Endgültigkeit wiedererlangt. Wie oben erklärt, erfordert die Endgültigkeit eine 2/3-Mehrheit der gesamten gestakten Ether, um sich auf Quell- und Ziel-Checkpoints zu einigen. Wenn Validatoren, die mehr als 1/3 der gesamten Validatoren repräsentieren, offline gehen oder keine korrekten Attestierungen einreichen, ist es für eine 2/3-Supermehrheit nicht möglich, Checkpoints zu finalisieren. Das Inaktivitätsleck lässt den Stake der inaktiven Validatoren allmählich ausbluten, bis sie weniger als 1/3 des gesamten Stakes kontrollieren, was es den verbleibenden aktiven Validatoren ermöglicht, die Chain zu finalisieren. Unabhängig davon, wie groß der Pool inaktiver Validatoren ist, werden die verbleibenden aktiven Validatoren schließlich >2/3 des Stakes kontrollieren. Der Verlust des Stakes ist ein starker Anreiz für inaktive Validatoren, sich so schnell wie möglich wieder zu aktivieren! Ein Inaktivitätsleck-Szenario trat im Medalla-Testnetz auf, als < 66 % der aktiven Validatoren in der Lage waren, einen Konsens über den aktuellen Kopf der Blockchain zu erzielen. Das Inaktivitätsleck wurde aktiviert und die Endgültigkeit wurde schließlich wiedererlangt!

Das Design von Belohnungen, Strafen und Slashing des Konsensmechanismus ermutigt einzelne Validatoren, sich korrekt zu verhalten. Aus diesen Designentscheidungen entsteht jedoch ein System, das eine gleichmäßige Verteilung von Validatoren über mehrere Clients hinweg stark fördert und die Dominanz eines einzelnen Clients stark entmutigen soll.

## Weiterführende Literatur {#further-reading}

- [Upgrading Ethereum: Die Anreizschicht](https://eth2book.info/altair/part2/incentives)
- [Anreize in Ethereums hybridem Casper-Protokoll](https://arxiv.org/pdf/1903.04205.pdf)
- [Vitaliks kommentierte Spezifikation](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
- [Tipps zur Vermeidung von Eth2-Slashing](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)
- [Analyse der Slashing-Strafen unter EIP-7251](https://ethresear.ch/t/slashing-penalty-analysis-eip-7251/16509)

_Quellen_

- _[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_