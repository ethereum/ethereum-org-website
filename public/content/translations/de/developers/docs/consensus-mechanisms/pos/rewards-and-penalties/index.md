---
title: Proof-of-Stake-Belohnungen und -Strafen
description: "Erfahren Sie mehr über die protokollinternen Anreize in Proof-of-Stake-Ethereum."
lang: de
---

[Ethereum](/) wird durch seine native Kryptowährung, Ether (ETH), gesichert. Betreiber von Blockchain-Knoten, die an der Validierung von Blöcken und der Identifizierung der Spitze der Chain teilnehmen möchten, zahlen Ether in den [Einzahlungsvertrag](/staking/deposit-contract/) auf Ethereum ein. Sie werden dann in Ether bezahlt, um Validator-Software auszuführen, die die Gültigkeit neuer Blöcke überprüft, die über das Peer-to-Peer-Netzwerk empfangen werden, und den Fork-Choice-Algorithmus anwenden, um die Spitze der Chain zu identifizieren.

Es gibt zwei Hauptrollen für einen Validator: 1) Überprüfung neuer Blöcke und deren „Bestätigung“, wenn sie gültig sind, 2) Vorschlagen neuer Blöcke, wenn sie zufällig aus dem gesamten Validator-Pool ausgewählt werden. Wenn der Validator eine dieser Aufgaben nicht erfüllt, wenn er dazu aufgefordert wird, entgeht ihm eine Ether-Auszahlung. Validatoren werden manchmal auch mit der Signaturaggregation und der Teilnahme an Sync-Komitees beauftragt.

Es gibt auch einige Aktionen, die sehr schwer versehentlich durchzuführen sind und auf eine böswillige Absicht hindeuten, wie z. B. das Vorschlagen mehrerer Blöcke für denselben Slot oder die Bestätigung mehrerer Blöcke für denselben Slot. Dies sind Verhaltensweisen, die zu „Slashing“ führen, was zur Folge hat, dass dem Validator ein bestimmter Betrag an Ether (bis zu 1 ETH) verbrannt wird, bevor der Validator aus dem Netzwerk entfernt wird, was 36 Tage dauert. Das Ether des von Slashing betroffenen Validators fließt über die Austrittsphase langsam ab, aber an Tag 18 erhält er eine „Korrelationsstrafe“, die größer ist, wenn mehr Validatoren etwa zur gleichen Zeit von Slashing betroffen sind. Die Anreizstruktur des Konsensmechanismus belohnt daher Ehrlichkeit und bestraft böswillige Akteure.

Alle Belohnungen und Strafen werden einmal pro Epoche angewendet.

Lesen Sie weiter für mehr Details...

## Belohnungen und Strafen {#rewards}

### Belohnungen {#rewards}

Validatoren erhalten Belohnungen, wenn sie Abstimmungen vornehmen, die mit der Mehrheit der anderen Validatoren übereinstimmen, wenn sie Blöcke vorschlagen und wenn sie an Sync-Komitees teilnehmen. Der Wert der Belohnungen in jeder Epoche wird aus einer `base_reward` berechnet. Dies ist die Basiseinheit, aus der andere Belohnungen berechnet werden. Die `base_reward` stellt die durchschnittliche Belohnung dar, die ein Validator unter optimalen Bedingungen pro Epoche erhält. Diese wird aus dem effektiven Guthaben des Validators und der Gesamtzahl der aktiven Validatoren wie folgt berechnet:

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

wobei `base_reward_factor` 64 ist, `base_rewards_per_epoch` 4 ist und `sum(active balance)` das gesamte eingesetzte Ether (Einsatz) aller aktiven Validatoren ist.

Das bedeutet, dass die Grundbelohnung proportional zum effektiven Guthaben des Validators und umgekehrt proportional zur Anzahl der Validatoren im Netzwerk ist. Je mehr Validatoren, desto größer ist die gesamte Emission (als `sqrt(N)`), aber desto kleiner ist die `base_reward` pro Validator (als `1/sqrt(N)`). Diese Faktoren beeinflussen den effektiven Jahreszins (APR) für einen Staking-Knoten. Lesen Sie die Begründung dafür in [Vitaliks Notizen](https://notes.ethereum.org/@vbuterin/serenity_design_rationale?type=view#Base-rewards).

Die Gesamtbelohnung wird dann als Summe von fünf Komponenten berechnet, die jeweils eine Gewichtung haben, die bestimmt, wie viel jede Komponente zur Gesamtbelohnung beiträgt. Die Komponenten sind:

```
1. source vote: the validator has made a timely vote for the correct source checkpoint
2. target vote: the validator has made a timely vote for the correct target checkpoint
3. head vote: the validator has made a timely vote for the correct head block
4. sync committee reward: the validator has participated in a sync committee
5. proposer reward: the validator has proposed a block in the correct slot
```

Die Gewichtungen für jede Komponente sind wie folgt:

```
TIMELY_SOURCE_WEIGHT	uint64(14)
TIMELY_TARGET_WEIGHT	uint64(26)
TIMELY_HEAD_WEIGHT	uint64(14)
SYNC_REWARD_WEIGHT	uint64(2)
PROPOSER_WEIGHT	uint64(8)
```

Die Summe dieser Gewichtungen ergibt 64. Die Belohnung wird als Summe der anwendbaren Gewichtungen geteilt durch 64 berechnet. Ein Validator, der rechtzeitig Source-, Target- und Head-Abstimmungen vorgenommen, einen Block vorgeschlagen und an einem Sync-Komitee teilgenommen hat, könnte `64/64 * base_reward == base_reward` erhalten. Ein Validator ist jedoch normalerweise kein Block-Vorschlagender, sodass seine maximale Belohnung `64-8 /64 * base_reward == 7/8 * base_reward` beträgt. Validatoren, die weder Block-Vorschlagende sind noch in einem Sync-Komitee sitzen, können `64-8-2 / 64 * base_reward == 6.75/8 * base_reward` erhalten.

Eine zusätzliche Belohnung wird hinzugefügt, um schnelle Bestätigungen zu fördern. Dies ist die `inclusion_delay_reward`. Diese hat einen Wert, der der `base_reward` multipliziert mit `1/delay` entspricht, wobei `delay` die Anzahl der Slots ist, die den Blockvorschlag und die Bestätigung trennen. Wenn die Bestätigung beispielsweise innerhalb eines Slots nach dem Blockvorschlag eingereicht wird, erhält der Bestätigende `base_reward * 1/1 == base_reward`. Wenn die Bestätigung im nächsten Slot eintrifft, erhält der Bestätigende `base_reward * 1/2` und so weiter.

Block-Vorschlagende erhalten `8 / 64 * base_reward` für **jede gültige Bestätigung**, die im Block enthalten ist, sodass der tatsächliche Wert der Belohnung mit der Anzahl der bestätigenden Validatoren skaliert. Block-Vorschlagende können ihre Belohnung auch erhöhen, indem sie Beweise für Fehlverhalten anderer Validatoren in ihren vorgeschlagenen Block aufnehmen. Diese Belohnungen sind die „Karotten“, die die Ehrlichkeit der Validatoren fördern. Ein Block-Vorschlagender, der ein Slashing einschließt, wird mit der `slashed_validators_effective_balance / 512` belohnt.

### Strafen {#penalties}

Bisher haben wir uns perfekt verhaltende Validatoren betrachtet, aber was ist mit Validatoren, die nicht rechtzeitig Head-, Source- und Target-Abstimmungen vornehmen oder dies nur langsam tun?

Die Strafen für das Verpassen der Target- und Source-Abstimmungen entsprechen den Belohnungen, die der Bestätigende erhalten hätte, wenn er sie eingereicht hätte. Das bedeutet, dass anstelle der Hinzufügung der Belohnung zu ihrem Guthaben ein gleicher Wert von ihrem Guthaben abgezogen wird. Es gibt keine Strafe für das Verpassen der Head-Abstimmung (d. h. Head-Abstimmungen werden nur belohnt, niemals bestraft). Es gibt keine Strafe im Zusammenhang mit der `inclusion_delay` – die Belohnung wird dem Guthaben des Validators einfach nicht hinzugefügt. Es gibt auch keine Strafe für das Versäumnis, einen Block vorzuschlagen.

Lesen Sie mehr über Belohnungen und Strafen in den [Konsens-Spezifikationen](https://github.com/ethereum/consensus-specs/blob/master/specs/altair/beacon-chain.md). Belohnungen und Strafen wurden im Bellatrix-Upgrade angepasst – sehen Sie sich an, wie Danny Ryan und Vitalik dies in diesem [Peep an EIP-Video](https://www.youtube.com/watch?v=iaAEGs1DMgQ) diskutieren.

## Slashing {#slashing}

Slashing ist eine schwerwiegendere Maßnahme, die zur zwangsweisen Entfernung eines Validators aus dem Netzwerk und einem damit verbundenen Verlust seines eingesetzten Ethers führt. Es gibt drei Möglichkeiten, wie ein Validator von Slashing betroffen sein kann, die alle auf den unehrlichen Vorschlag oder die Bestätigung von Blöcken hinauslaufen:

- Durch das Vorschlagen und Signieren von zwei verschiedenen Blöcken für denselben Slot
- Durch die Bestätigung eines Blocks, der einen anderen „umgibt“ (was effektiv die Historie ändert)
- Durch „doppelte Abstimmung“, indem zwei Kandidaten für denselben Block bestätigt werden

Wenn diese Aktionen erkannt werden, wird der Validator von Slashing betroffen. Das bedeutet, dass für einen 32-ETH-Validator sofort 0,0078125 verbrannt werden (linear skaliert mit dem aktiven Guthaben), woraufhin eine 36-tägige Entfernungsfrist beginnt. Während dieser Entfernungsfrist fließt der Einsatz des Validators allmählich ab. Zur Halbzeit (Tag 18) wird eine zusätzliche Strafe verhängt, deren Höhe mit dem gesamten eingesetzten Ether aller von Slashing betroffenen Validatoren in den 36 Tagen vor dem Slashing-Ereignis skaliert. Das bedeutet, dass die Höhe des Slashings zunimmt, wenn mehr Validatoren von Slashing betroffen sind. Das maximale Slashing ist das volle effektive Guthaben aller von Slashing betroffenen Validatoren (d. h., wenn viele Validatoren von Slashing betroffen sind, könnten sie ihren gesamten Einsatz verlieren). Andererseits verbrennt ein einzelnes, isoliertes Slashing-Ereignis nur einen kleinen Teil des Einsatzes des Validators. Diese Halbzeitstrafe, die mit der Anzahl der von Slashing betroffenen Validatoren skaliert, wird als „Korrelationsstrafe“ bezeichnet.

## Inaktivitätsleck {#inactivity-leak}

Wenn die Konsensebene mehr als vier Epochen ohne Finalisierung durchlaufen hat, wird ein Notfallprotokoll namens „Inaktivitätsleck“ (Inactivity Leak) aktiviert. Das ultimative Ziel des Inaktivitätslecks ist es, die Bedingungen zu schaffen, die erforderlich sind, damit die Chain die Finalität wiedererlangt. Wie oben erklärt, erfordert die Finalität eine 2/3-Mehrheit des gesamten eingesetzten Ethers, um sich auf Source- und Target-Checkpoints zu einigen. Wenn Validatoren, die mehr als 1/3 der gesamten Validatoren repräsentieren, offline gehen oder keine korrekten Bestätigungen einreichen, ist es für eine 2/3-Supermehrheit nicht möglich, Checkpoints zu finalisieren. Das Inaktivitätsleck lässt den Einsatz, der den inaktiven Validatoren gehört, allmählich abfließen, bis sie weniger als 1/3 des gesamten Einsatzes kontrollieren, was es den verbleibenden aktiven Validatoren ermöglicht, die Chain zu finalisieren. Unabhängig davon, wie groß der Pool inaktiver Validatoren ist, werden die verbleibenden aktiven Validatoren schließlich >2/3 des Einsatzes kontrollieren. Der Verlust des Einsatzes ist ein starker Anreiz für inaktive Validatoren, sich so schnell wie möglich wieder zu reaktivieren! Ein Inaktivitätsleck-Szenario trat im Medalla-Testnet auf, als < 66 % der aktiven Validatoren in der Lage waren, einen Konsens über die aktuelle Spitze der Blockchain zu erzielen. Das Inaktivitätsleck wurde aktiviert und die Finalität wurde schließlich wiedererlangt!

Das Design von Belohnungen, Strafen und Slashing des Konsensmechanismus ermutigt einzelne Validatoren, sich korrekt zu verhalten. Aus diesen Designentscheidungen entsteht jedoch ein System, das eine gleichmäßige Verteilung von Validatoren auf mehrere Anwendungen (Clients) stark fördert und die Dominanz einer einzelnen Anwendung stark benachteiligen soll.

## Weiterführende Literatur {#further-reading}

- [Upgrading Ethereum: The incentive layer](https://eth2book.info/altair/part2/incentives)
- [Incentives in Ethereum's hybrid Casper protocol](https://arxiv.org/pdf/1903.04205.pdf)
- [Vitalik's annotated spec](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
- [Eth2 Slashing Prevention Tips](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)
- [Analysis of slashing penalties under EIP-7251](https://ethresear.ch/t/slashing-penalty-analysis-eip-7251/16509)

_Quellen_

- _[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_