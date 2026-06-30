---
title: Wie sich der Merge auf das ETH-Angebot auswirkte
description: "Aufschlüsselung, wie sich der Merge auf das ETH-Angebot auswirkte"
lang: de
---

Der Merge stellte den Übergang des [Ethereum](/)-Netzwerks von Proof-of-Work (PoW) zu Proof-of-Stake (PoS) dar, der im September 2022 stattfand. Die Art und Weise, wie ETH emittiert wurde, änderte sich zum Zeitpunkt dieses Übergangs. Zuvor wurde neues ETH aus zwei Quellen emittiert: der Ausführungsschicht (d. h. dem Mainnet) und der Konsensschicht (d. h. der Beacon Chain). Seit dem Merge liegt die Emission auf der Ausführungsschicht nun bei null. Schauen wir uns das genauer an.

## Komponenten der ETH-Emission {#components-of-eth-issuance}

Wir können das Angebot von ETH in zwei Hauptkräfte unterteilen: Emission und Verbrennung.

Die **Emission** von ETH ist der Prozess der Erstellung von ETH, das zuvor nicht existierte. Die **Verbrennung** von ETH findet statt, wenn bestehendes ETH zerstört und somit aus dem Verkehr gezogen wird. Die Rate der Emission und Verbrennung wird anhand mehrerer Parameter berechnet, und das Gleichgewicht zwischen ihnen bestimmt die resultierende Inflations-/Deflationsrate von Ether.

<Card
emoji=":chart_decreasing:"
title="ETH-Emission TL;DR">

- Vor dem Übergang zu Proof-of-Stake wurden Minern täglich etwa 13.000 ETH emittiert
- Stakern werden täglich etwa 1.700 ETH emittiert, basierend auf insgesamt etwa 14 Millionen gestakten ETH
- Die genaue Staking-Emission schwankt basierend auf der Gesamtmenge der gestakten ETH
- **Seit dem Merge verbleiben nur noch die ~1.700 ETH/Tag, was die gesamte neue ETH-Emission um ~88 % senkt**
- Die Verbrennung: Diese schwankt je nach Netzwerknachfrage. _Wenn_ an einem bestimmten Tag ein durchschnittlicher Gaspreis von mindestens 16 Gwei beobachtet wird, gleicht dies effektiv die ~1.700 ETH aus, die an Validatoren emittiert werden, und bringt die Netto-ETH-Inflation für diesen Tag auf null oder weniger.

</Card>

## Vor dem Merge (historisch) {#pre-merge}

### Emission der Ausführungsschicht {#el-issuance-pre-merge}

Unter Proof-of-Work interagierten Miner nur mit der Ausführungsschicht und wurden mit Blockbelohnungen belohnt, wenn sie der erste Miner waren, der den nächsten Block löste. Seit dem [Constantinople-Upgrade](/ethereum-forks/#constantinople) im Jahr 2019 betrug diese Belohnung 2 ETH pro Block. Miner wurden auch für die Veröffentlichung von [Ommer](/glossary/#ommer)-Blöcken belohnt, bei denen es sich um gültige Blöcke handelte, die nicht in der längsten/kanonischen Chain landeten. Diese Belohnungen erreichten maximal 1,75 ETH pro Ommer und erfolgten _zusätzlich_ zu der Belohnung, die aus dem kanonischen Block emittiert wurde. Der Prozess des Minings war eine wirtschaftlich intensive Aktivität, die historisch gesehen ein hohes Maß an ETH-Emission erforderte, um aufrechterhalten zu werden.

### Emission der Konsensschicht {#cl-issuance-pre-merge}

Die [Beacon Chain](/ethereum-forks/#beacon-chain-genesis) ging 2020 live. Anstelle von Minern wird sie von Validatoren mittels Proof-of-Stake gesichert. Diese Chain wurde gestartet, indem Ethereum-Nutzer ETH in eine Richtung in einen Smart Contract im Mainnet (der Ausführungsschicht) einzahlten, auf den die Beacon Chain hört, und dem Nutzer einen gleichen Betrag an ETH auf der neuen Chain gutschrieb. Bis der Merge stattfand, verarbeiteten die Validatoren der Beacon Chain keine Transaktionen und fanden im Wesentlichen einen Konsens über den Zustand des Validator-Pools selbst.

Validatoren auf der Beacon Chain werden mit ETH belohnt, wenn sie den Zustand der Chain bezeugen und Blöcke vorschlagen. Belohnungen (oder Strafen) werden in jeder Epoche (alle 6,4 Minuten) basierend auf der Leistung des Validators berechnet und verteilt. Validator-Belohnungen sind **deutlich** geringer als die Mining-Belohnungen, die zuvor unter Proof-of-Work emittiert wurden (2 ETH alle ~13,5 Sekunden), da der Betrieb eines validierenden Knotens wirtschaftlich nicht so intensiv ist und daher keine so hohe Belohnung erfordert oder rechtfertigt.

### Aufschlüsselung der Emission vor dem Merge {#pre-merge-issuance-breakdown}

Gesamtes ETH-Angebot: **\~120.520.000 ETH** (zum Zeitpunkt des Merges im September 2022)

**Emission der Ausführungsschicht:**

- Wurde auf 2,08 ETH pro 13,3 Sekunden geschätzt\*: **\~4.930.000** ETH pro Jahr emittiert
- Führte zu einer Inflationsrate von **etwa 4,09 %** (4,93 Mio. pro Jahr / 120,5 Mio. insgesamt)
- \*Dies beinhaltet die 2 ETH pro kanonischem Block plus durchschnittlich 0,08 ETH im Laufe der Zeit aus Ommer-Blöcken. Verwendet außerdem 13,3 Sekunden, das grundlegende Blockzeit-Ziel ohne jeglichen Einfluss einer [Schwierigkeitsbombe](/glossary/#difficulty-bomb). ([Siehe Quelle](https://bitinfocharts.com/ethereum/))

**Emission der Konsensschicht:**

- Bei insgesamt 14.000.000 gestakten ETH beträgt die Rate der ETH-Emission etwa 1.700 ETH/Tag ([Siehe Quelle](https://ultrasound.money/))
- Führt zu **\~620.500** emittierten ETH in einem Jahr
- Führte zu einer Inflationsrate von **etwa 0,52 %** (620,5 Tsd. pro Jahr / 119,3 Mio. insgesamt)

<Alert variant="update">
<AlertContent>
<AlertDescription>
**Gesamte annualisierte Emissionsrate (vor dem Merge): ~4,61 %** (4,09 % + 0,52 %)

**\~88,7 %** der Emission gingen an Miner auf der Ausführungsschicht (4,09 / 4,61 * 100)

**\~11,3 %** wurden an Staker auf der Konsensschicht emittiert (0,52 / 4,61 * 100)
</AlertDescription>
</AlertContent>
</Alert>

## Nach dem Merge (heute) {#post-merge}

### Emission der Ausführungsschicht {#el-issuance-post-merge}

Die Emission der Ausführungsschicht ist seit dem Merge gleich null. Proof-of-Work ist unter den aktualisierten Konsensregeln kein gültiges Mittel zur Blockproduktion mehr. Alle Aktivitäten der Ausführungsschicht werden in „Beacon-Blöcke“ verpackt, die von Proof-of-Stake-Validatoren veröffentlicht und bezeugt werden. Belohnungen für das Bezeugen und Veröffentlichen von Beacon-Blöcken werden separat auf der Konsensschicht abgerechnet.

### Emission der Konsensschicht {#cl-issuance-post-merge}

Die Emission der Konsensschicht wird heute wie vor dem Merge fortgesetzt, mit kleinen Belohnungen für Validatoren, die Blöcke bezeugen und vorschlagen. Validator-Belohnungen fließen weiterhin in _Validator-Guthaben_, die innerhalb der Konsensschicht verwaltet werden. Im Gegensatz zu den aktuellen Konten („Ausführungs“-Konten), die Transaktionen im Mainnet durchführen können, handelt es sich hierbei um separate Ethereum-Konten, die nicht frei mit anderen Ethereum-Konten interagieren können. Gelder auf diesen Konten können nur an eine einzige angegebene Ausführungsadresse abgehoben werden.

Seit dem Shanghai/Capella-Upgrade, das im April 2023 stattfand, wurden diese Abhebungen für Staker aktiviert. Staker haben einen Anreiz, ihre _Einnahmen/Belohnungen (Guthaben über 32 ETH)_ abzuheben, da diese Gelder andernfalls nicht zu ihrem Stake-Gewicht beitragen (das bei 32 sein Maximum erreicht).

Staker können sich auch für einen Austritt entscheiden und ihr gesamtes Validator-Guthaben abheben. Um sicherzustellen, dass Ethereum stabil bleibt, ist die Anzahl der Validatoren, die gleichzeitig austreten, begrenzt.

Etwa 0,33 % der gesamten Validator-Anzahl können an einem bestimmten Tag austreten. Standardmäßig können vier (4) Validatoren pro Epoche austreten (alle 6,4 Minuten oder 900 pro Tag). Ein (1) zusätzlicher Validator darf für jeweils 65.536 (2<sup>16</sup>) zusätzliche Validatoren über 262.144 (2<sup>18</sup>) hinaus austreten. Bei über 327.680 Validatoren können beispielsweise fünf (5) pro Epoche austreten (1.125 pro Tag). Sechs (6) sind bei einer Gesamtzahl aktiver Validatoren von über 393.216 zulässig und so weiter.

Wenn mehr Validatoren abheben, wird die maximale Anzahl der austretenden Validatoren schrittweise auf ein Minimum von vier reduziert, um absichtlich zu verhindern, dass große, destabilisierende Mengen an gestakten ETH gleichzeitig abgehoben werden.

### Aufschlüsselung der Inflation nach dem Merge {#post-merge-inflation-breakdown}

- [Gesamtes ETH-Angebot](/eth/supply/): **\~120.520.000 ETH** (zum Zeitpunkt des Merges im September 2022)
- Emission der Ausführungsschicht: **0**
- Emission der Konsensschicht: Wie oben, **\~0,52 %** annualisierte Emissionsrate (bei insgesamt 14 Millionen gestakten ETH)

<Alert variant="update">
<AlertContent>
<AlertDescription>
Gesamte annualisierte Emissionsrate: **\~0,52 %**

Netto-Reduzierung der jährlichen ETH-Emission: **\~88,7 %** ((4,61 % - 0,52 %) / 4,61 % * 100)
</AlertDescription>
</AlertContent>
</Alert>

## <Emoji text=":fire:" size="1" /> Die Verbrennung {#the-burn}

Die Gegenkraft zur ETH-Emission ist die Rate, mit der ETH verbrannt wird. Damit eine Transaktion auf Ethereum ausgeführt werden kann, muss eine Mindestgebühr (bekannt als „Grundgebühr“) bezahlt werden, die je nach Netzwerkaktivität kontinuierlich (von Block zu Block) schwankt. Die Gebühr wird in ETH bezahlt und ist _erforderlich_, damit die Transaktion als gültig angesehen wird. Diese Gebühr wird während des Transaktionsprozesses _verbrannt_ und somit aus dem Verkehr gezogen.

<Alert variant="update">
<AlertContent>
<AlertDescription>

Die Gebührenverbrennung ging mit dem [London-Upgrade](/ethereum-forks/#london) im August 2021 live und bleibt seit dem Merge unverändert.
</AlertDescription>
</AlertContent>
</Alert>

Zusätzlich zur durch das London-Upgrade implementierten Gebührenverbrennung können Validatoren auch Strafen für das Offline-Sein erhalten oder, noch schlimmer, sie können einem Slashing unterzogen werden, wenn sie bestimmte Regeln brechen, die die Netzwerksicherheit bedrohen. Diese Strafen führen zu einer Reduzierung von ETH aus dem Guthaben dieses Validators, die nicht direkt an ein anderes Konto als Belohnung ausgezahlt wird, wodurch sie effektiv verbrannt/aus dem Verkehr gezogen werden.

### Berechnung des durchschnittlichen Gaspreises für Deflation {#calculating-average-gas-price-for-deflation}

Wie oben besprochen, hängt die Menge der an einem bestimmten Tag emittierten ETH von den gesamten gestakten ETH ab. Zum Zeitpunkt des Schreibens sind dies etwa 1.700 ETH/Tag.

Um den durchschnittlichen Gaspreis zu bestimmen, der erforderlich ist, um diese Emission in einem bestimmten 24-Stunden-Zeitraum vollständig auszugleichen, berechnen wir zunächst die Gesamtzahl der Blöcke an einem Tag bei einer Blockzeit von 12 Sekunden:

- `(1 block / 12 seconds) * (60 seconds/minute) = 5 blocks/minute`
- `(5 blocks/minute) * (60 minutes/hour) = 300 blocks/hour`
- `(300 blocks/hour) * (24 hours/day) = 7200 blocks/day`

Jeder Block zielt auf `15x10^6 gas/block` ab ([mehr zu Gas](/developers/docs/gas/)). Damit können wir den durchschnittlichen Gaspreis (in Einheiten von Gwei/Gas) berechnen, der erforderlich ist, um die Emission auszugleichen, bei einer täglichen ETH-Gesamtemission von 1.700 ETH:

- `7200 blocks/day * 15x10^6 gas/block * `**`Y gwei/gas`**` * 1 ETH/ 10^9 gwei = 1700 ETH/day`

Auflösen nach `Y`:

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (Rundung auf nur zwei signifikante Stellen)

Eine andere Möglichkeit, diesen letzten Schritt umzustellen, bestünde darin, `1700` durch eine Variable `X` zu ersetzen, die die tägliche ETH-Emission darstellt, und den Rest zu vereinfachen auf:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Wir können dies vereinfachen und als Funktion von `X` schreiben:

- `f(X) = X/108` wobei `X` die tägliche ETH-Emission ist und `f(X)` den Gwei/Gas-Preis darstellt, der erforderlich ist, um alle neu emittierten ETH auszugleichen.

Wenn also beispielsweise `X` (tägliche ETH-Emission) basierend auf den gesamten gestakten ETH auf 1.800 steigt, wäre `f(X)` (Gwei, die erforderlich sind, um die gesamte Emission auszugleichen) dann `17 gwei` (unter Verwendung von 2 signifikanten Stellen).

## Weiterführende Literatur {#further-reading}

- [Der Merge](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) – _Dashboards zur Visualisierung von ETH-Emission und -Verbrennung in Echtzeit_
- [Charting Ethereum Issuance](https://www.attestant.io/posts/charting-ethereum-issuance/) – _Jim McDonald 2020_
