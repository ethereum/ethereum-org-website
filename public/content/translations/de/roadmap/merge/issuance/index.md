---
title: Wie The Merge das ETH-Angebot beeinflusst hat
description: "Aufschlüsselung, wie The Merge das ETH-Angebot beeinflusst hat"
lang: de
---

# Wie The Merge das ETH-Angebot beeinflusst hat {#how-the-merge-impacts-ETH-supply}

The Merge stellte den Übergang des [Ethereum](/)-Netzwerks von Proof-of-Work zu Proof-of-Stake dar, der im September 2022 stattfand. Die Art und Weise, wie ETH emittiert wurde, erfuhr zum Zeitpunkt dieses Übergangs Änderungen. Zuvor wurde neues ETH aus zwei Quellen emittiert: der Ausführungsebene (d. h. Mainnet) und der Konsensebene (d. h. Beacon Chain). Seit The Merge ist die Emission auf der Ausführungsebene nun null. Lassen Sie uns das aufschlüsseln.

## Komponenten der ETH-Emission {#components-of-eth-issuance}

Wir können das Angebot von ETH in zwei Hauptkräfte unterteilen: Emission und Verbrennung (Burn).

Die **Emission** von ETH ist der Prozess der Schaffung von ETH, das zuvor nicht existierte. Die **Verbrennung** (Burning) von ETH ist, wenn existierendes ETH zerstört und aus dem Umlauf genommen wird. Die Rate der Emission und Verbrennung wird anhand mehrerer Parameter berechnet, und das Gleichgewicht zwischen ihnen bestimmt die resultierende Inflations-/Deflationsrate von Ether.

<Card
emoji=":chart_decreasing:"
title="ETH-Emission: Kurz gesagt">

- Vor dem Übergang zu Proof-of-Stake wurden Minern etwa 13.000 ETH/Tag emittiert.
- Stakern werden etwa 1.700 ETH/Tag emittiert, basierend auf insgesamt etwa 14 Millionen gestakten ETH.
- Die genaue Staking-Emission schwankt basierend auf der Gesamtmenge der gestakten ETH.
- **Seit The Merge verbleiben nur noch die ~1.700 ETH/Tag, was die gesamte neue ETH-Emission um ~88 % senkt.**
- Die Verbrennung: Diese schwankt je nach Netzwerknachfrage. _Wenn_ an einem bestimmten Tag ein durchschnittlicher Gaspreis von mindestens 16 Gwei beobachtet wird, gleicht dies effektiv die ~1.700 ETH aus, die an Validatoren emittiert werden, und bringt die Netto-ETH-Inflation für diesen Tag auf null oder weniger.

</Card>

## Vor The Merge (historisch) {#pre-merge}

### Emission auf der Ausführungsebene {#el-issuance-pre-merge}

Unter Proof-of-Work interagierten Miner nur mit der Ausführungsebene und wurden mit Block-Belohnungen belohnt, wenn sie der erste Miner waren, der den nächsten Block löste. Seit dem [Constantinople-Upgrade](/ethereum-forks/#constantinople) im Jahr 2019 betrug diese Belohnung 2 ETH pro Block. Miner wurden auch für die Veröffentlichung von [Ommer](/glossary/#ommer)-Blöcken belohnt, bei denen es sich um gültige Blöcke handelte, die nicht in der längsten/kanonischen Kette landeten. Diese Belohnungen erreichten maximal 1,75 ETH pro Ommer und wurden _zusätzlich_ zu der Belohnung emittiert, die aus dem kanonischen Block stammte. Der Mining-Prozess war eine wirtschaftlich intensive Aktivität, die historisch gesehen ein hohes Maß an ETH-Emission erforderte, um aufrechterhalten zu werden.

### Emission auf der Konsensebene {#cl-issuance-pre-merge}

Die [Beacon Chain](/ethereum-forks/#beacon-chain-genesis) ging 2020 live. Anstelle von Minern wird sie von Validatoren mittels Proof-of-Stake gesichert. Diese Kette wurde von Ethereum-Benutzern gestartet, die ETH in eine Richtung in einen Smart Contract im Mainnet (der Ausführungsebene) einzahlten, auf den die Beacon Chain hört und dem Benutzer einen gleichen Betrag an ETH auf der neuen Kette gutschreibt. Bis The Merge stattfand, verarbeiteten die Validatoren der Beacon Chain keine Transaktionen und fanden im Wesentlichen einen Konsens über den Zustand des Validator-Pools selbst.

Validatoren auf der Beacon Chain werden mit ETH belohnt, wenn sie den Zustand der Kette bestätigen und Blöcke vorschlagen. Belohnungen (oder Strafen) werden in jeder Epoche (alle 6,4 Minuten) basierend auf der Leistung der Validatoren berechnet und verteilt. Validator-Belohnungen sind **deutlich** geringer als die Mining-Belohnungen, die zuvor unter Proof-of-Work emittiert wurden (2 ETH alle ~13,5 Sekunden), da der Betrieb eines validierenden Blockchain-Knotens wirtschaftlich nicht so intensiv ist und daher keine so hohe Belohnung erfordert oder rechtfertigt.

### Aufschlüsselung der Emission vor The Merge {#pre-merge-issuance-breakdown}

Gesamtes ETH-Angebot: **\~120.520.000 ETH** (zum Zeitpunkt von The Merge im September 2022)

**Emission auf der Ausführungsebene:**

- Wurde auf 2,08 ETH pro 13,3 Sekunden geschätzt\*: **\~4.930.000** ETH in einem Jahr emittiert
- Führte zu einer Inflationsrate von **etwa 4,09 %** (4,93 Mio. pro Jahr / 120,5 Mio. insgesamt)
- \*Dies beinhaltet die 2 ETH pro kanonischem Block plus durchschnittlich 0,08 ETH im Laufe der Zeit aus Ommer-Blöcken. Verwendet auch 13,3 Sekunden, das grundlegende Blockzeit-Ziel ohne jeglichen Einfluss einer [Difficulty Bomb](/glossary/#difficulty-bomb). ([Siehe Quelle](https://bitinfocharts.com/ethereum/))

**Emission auf der Konsensebene:**

- Bei insgesamt 14.000.000 gestakten ETH beträgt die Rate der ETH-Emission etwa 1.700 ETH/Tag ([Siehe Quelle](https://ultrasound.money/))
- Führt zu **\~620.500** emittierten ETH in einem Jahr
- Führte zu einer Inflationsrate von **etwa 0,52 %** (620,5 Tsd. pro Jahr / 119,3 Mio. insgesamt)

<Alert variant="update">
<AlertContent>
<AlertDescription>
**Gesamte annualisierte Emissionsrate (vor The Merge): ~4,61 %** (4,09 % + 0,52 %)

**\~88,7 %** der Emission gingen an Miner auf der Ausführungsebene (4,09 / 4,61 * 100)

**\~11,3 %** wurden an Staker auf der Konsensebene emittiert (0,52 / 4,61 * 100)
</AlertDescription>
</AlertContent>
</Alert>

## Nach The Merge (heute) {#post-merge}

### Emission auf der Ausführungsebene {#el-issuance-post-merge}

Die Emission auf der Ausführungsebene ist seit The Merge null. Proof-of-Work ist unter den aktualisierten Konsensregeln kein gültiges Mittel zur Blockproduktion mehr. Alle Aktivitäten auf der Ausführungsebene werden in „Beacon-Blöcke“ verpackt, die von Proof-of-Stake-Validatoren veröffentlicht und bestätigt werden. Belohnungen für das Bestätigen und Veröffentlichen von Beacon-Blöcken werden separat auf der Konsensebene abgerechnet.

### Emission auf der Konsensebene {#cl-issuance-post-merge}

Die Emission auf der Konsensebene wird heute wie vor The Merge fortgesetzt, mit kleinen Belohnungen für Validatoren, die Blöcke bestätigen und vorschlagen. Validator-Belohnungen fließen weiterhin in _Validator-Guthaben_, die innerhalb der Konsensebene verwaltet werden. Im Gegensatz zu den aktuellen Konten („Ausführungs“-Konten), die Transaktionen im Mainnet durchführen können, handelt es sich hierbei um separate Ethereum-Konten, die nicht frei mit anderen Ethereum-Konten Transaktionen durchführen können. Gelder auf diesen Konten können nur an eine einzige angegebene Ausführungsadresse abgehoben werden.

Seit dem Shanghai/Capella-Upgrade, das im April 2023 stattfand, wurden diese Abhebungen für Staker aktiviert. Staker haben einen Anreiz, ihre _Einnahmen/Belohnungen (Guthaben über 32 ETH)_ abzuheben, da diese Gelder andernfalls nicht zu ihrem Einsatzgewicht beitragen (das bei maximal 32 liegt).

Staker können sich auch dafür entscheiden, auszusteigen und ihr gesamtes Validator-Guthaben abzuheben. Um sicherzustellen, dass Ethereum stabil bleibt, ist die Anzahl der Validatoren, die gleichzeitig das Netzwerk verlassen, begrenzt.

Etwa 0,33 % der gesamten Anzahl an Validatoren können an einem bestimmten Tag aussteigen. Standardmäßig können vier (4) Validatoren pro Epoche (alle 6,4 Minuten oder 900 pro Tag) aussteigen. Ein (1) zusätzlicher Validator darf für jeweils 65.536 (2<sup>16</sup>) zusätzliche Validatoren über 262.144 (2<sup>18</sup>) hinaus aussteigen. Zum Beispiel können bei über 327.680 Validatoren fünf (5) pro Epoche (1.125 pro Tag) aussteigen. Sechs (6) sind bei einer Gesamtzahl aktiver Validatoren von über 393.216 zulässig und so weiter.

Wenn mehr Validatoren abheben, wird die maximale Anzahl der aussteigenden Validatoren schrittweise auf ein Minimum von vier reduziert, um absichtlich zu verhindern, dass große, destabilisierende Mengen an gestakten ETH gleichzeitig abgehoben werden.

### Aufschlüsselung der Inflation nach The Merge {#post-merge-inflation-breakdown}

- [Gesamtes ETH-Angebot](/eth/supply/): **\~120.520.000 ETH** (zum Zeitpunkt von The Merge im September 2022)
- Emission auf der Ausführungsebene: **0**
- Emission auf der Konsensebene: Wie oben, **\~0,52 %** annualisierte Emissionsrate (bei insgesamt 14 Millionen gestakten ETH)

<Alert variant="update">
<AlertContent>
<AlertDescription>
Gesamte annualisierte Emissionsrate: **\~0,52 %**

Netto-Reduzierung der jährlichen ETH-Emission: **\~88,7 %** ((4,61 % - 0,52 %) / 4,61 % * 100)
</AlertDescription>
</AlertContent>
</Alert>

## <Emoji text=":fire:" size="1" /> Die Verbrennung (The Burn) {#the-burn}

Die entgegengesetzte Kraft zur ETH-Emission ist die Rate, mit der ETH verbrannt wird. Damit eine Transaktion auf Ethereum ausgeführt werden kann, muss eine Mindestgebühr (bekannt als „Grundgebühr“) bezahlt werden, die je nach Netzwerkaktivität kontinuierlich (von Block zu Block) schwankt. Die Gebühr wird in ETH bezahlt und ist _erforderlich_, damit die Transaktion als gültig angesehen wird. Diese Gebühr wird während des Transaktionsprozesses _verbrannt_, wodurch sie aus dem Umlauf genommen wird.

<Alert variant="update">
<AlertContent>
<AlertDescription>

Die Gebührenverbrennung ging mit [dem London-Upgrade](/ethereum-forks/#london) im August 2021 live und bleibt seit The Merge unverändert.
</AlertDescription>
</AlertContent>
</Alert>

Zusätzlich zur durch das London-Upgrade implementierten Gebührenverbrennung können Validatoren auch Strafen für das Offline-Sein erhalten, oder schlimmer noch, sie können einem Slashing unterzogen werden, wenn sie bestimmte Regeln brechen, die die Netzwerksicherheit bedrohen. Diese Strafen führen zu einer Reduzierung von ETH aus dem Guthaben dieses Validators, die nicht direkt an ein anderes Konto als Belohnung ausgezahlt wird, wodurch sie effektiv verbrannt/aus dem Umlauf genommen wird.

### Berechnung des durchschnittlichen Gaspreises für Deflation {#calculating-average-gas-price-for-deflation}

Wie oben besprochen, hängt die Menge an ETH, die an einem bestimmten Tag emittiert wird, von der gesamten gestakten ETH ab. Zum Zeitpunkt des Schreibens sind dies etwa 1.700 ETH/Tag.

Um den durchschnittlichen Gaspreis zu bestimmen, der erforderlich ist, um diese Emission in einem bestimmten 24-Stunden-Zeitraum vollständig auszugleichen, beginnen wir mit der Berechnung der Gesamtzahl der Blöcke an einem Tag bei einer Blockzeit von 12 Sekunden:

- `(1 Block / 12 Sekunden) * (60 Sekunden/Minute) = 5 Blöcke/Minute`
- `(5 Blöcke/Minute) * (60 Minuten/Stunde) = 300 Blöcke/Stunde`
- `(300 Blöcke/Stunde) * (24 Stunden/Tag) = 7200 Blöcke/Tag`

Jeder Block zielt auf `15x10^6 Gas/Block` ab ([mehr zu Gas](/developers/docs/gas/)). Damit können wir den durchschnittlichen Gaspreis (in Einheiten von Gwei/Gas) berechnen, der erforderlich ist, um die Emission auszugleichen, bei einer täglichen ETH-Gesamtemission von 1.700 ETH:

- `7200 Blöcke/Tag * 15x10^6 Gas/Block * `**`Y Gwei/Gas`**` * 1 ETH / 10^9 Gwei = 1700 ETH/Tag`

Auflösen nach `Y`:

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 Gwei` (gerundet auf nur zwei signifikante Stellen)

Eine andere Möglichkeit, diesen letzten Schritt umzustellen, bestünde darin, `1700` durch eine Variable `X` zu ersetzen, die die tägliche ETH-Emission darstellt, und den Rest zu vereinfachen auf:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Wir können dies vereinfachen und als Funktion von `X` schreiben:

- `f(X) = X/108`, wobei `X` die tägliche ETH-Emission ist und `f(X)` den Gwei/Gas-Preis darstellt, der erforderlich ist, um das gesamte neu emittierte ETH auszugleichen.

Wenn also beispielsweise `X` (tägliche ETH-Emission) basierend auf der gesamten gestakten ETH auf 1800 steigt, wäre `f(X)` (Gwei, die erforderlich sind, um die gesamte Emission auszugleichen) dann `17 Gwei` (unter Verwendung von 2 signifikanten Stellen).

## Weiterführende Literatur {#further-reading}

- [The Merge](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) – _Dashboards zur Visualisierung von ETH-Emission und -Verbrennung in Echtzeit_
- [Charting Ethereum Issuance](https://www.attestant.io/posts/charting-ethereum-issuance/) – _Jim McDonald 2020_