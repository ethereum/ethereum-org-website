---
title: Wie hat The Merge das ETH-Angebot beeinflusst
description: Aufschlüsselung darüber, wie The Merge das ETH-Angebot beeinflusst hat
lang: de
---

# Wie The Merge das ETH-Angebot beeinflusst hat {#how-the-merge-impacts-ETH-supply}

The Merge markierte den Übergang des Ethereum-Netzwerks von Proof-of-Work zu Proof-of-Stake, der im September 2022 stattfand. Die Art und Weise, wie ETH ausgegeben wurde, hat sich zum Zeitpunkt dieser Übergangsphase verändert. Zuvor wurden neue ETH aus zwei Quellen emittiert: der Ausführungsebene (d. h. Mainnet) und der Konsensebene (d. h. Beacon Chain). Seit The Merge findet auf der Ausführungsebene keine Eth-Ausgabe mehr statt. Lassen Sie uns das genauer betrachten.

## Komponenten der ETH-Emission {#components-of-eth-issuance}

Das Angebot an ETH kann hauptsächlich in zwei Faktoren unterteilt werden: Die Ausgabe und das Verbrennen.

Die **Emission** von ETH ist der Prozess, bei dem ETH geschaffen wird, das zuvor nicht existierte. Das **Verbrennen** von ETH bezeichnet den Prozess, bei dem vorhandenes ETH zerstört und damit aus dem Umlauf genommen wird. Die Rate der Ausgabe und des Verbrennens wird anhand mehrerer Parameter berechnet, und das Gleichgewicht zwischen ihnen bestimmt die resultierende Inflations-/Deflationsrate von Ether.

<Card
emoji=":chart_decreasing:"
title="ETH-Emission kurz erklärt">

- Vor dem Übergang zu Proof-of-Stake betrug die Emission für Miner ungefähr 13.000 ETH/Tag.
- Die Emission für Staker beträgt ungefähr 1.700 ETH/Tag, basierend auf insgesamt etwa 14 Millionen gestaketen ETH.
- Die genaue Staking-Emission schwankt je nach der Gesamtmenge der gestaketen ETH.
- **Seit The Merge verbleiben nur noch die ~1.700 ETH/Tag, wodurch die gesamte neue ETH-Emission um ~88 % sinkt.**
- Die Verbrennung: Diese schwankt je nach Netzwerknachfrage. _Wenn_ für einen bestimmten Tag ein durchschnittlicher Gaspreis von mindestens 16 Gwei beobachtet wird, kompensiert dies effektiv die ~1.700 ETH, die an die Validatoren ausgegeben werden, und bringt die Netto-ETH-Inflation für diesen Tag auf Null oder weniger.

</Card>

## Vor dem Merge (historisch) {#pre-merge}

### Emission der Ausführungsebene {#el-issuance-pre-merge}

Unter dem Proof-of-Work-System interagierten die Miner nur mit der Ausführungsschicht und wurden mit Blockbelohnungen belohnt, wenn sie die ersten Miner waren, die den nächsten Block gelöst haben. Seit dem [Constantinople-Upgrade](/ethereum-forks/#constantinople) im Jahr 2019 betrug diese Belohnung 2 ETH pro Block. Miner wurden auch für die Veröffentlichung von [ommer](/glossary/#ommer)-Blöcken belohnt, das waren gültige Blöcke, die nicht in der längsten/kanonischen Kette landeten. Diese Belohnungen betrugen maximal 1,75 ETH pro Ommer und wurden _zusätzlich zu_ der Belohnung aus dem kanonischen Block emittiert. Das Mining war eine wirtschaftlich intensive Tätigkeit, die historisch gesehen ein hohes Niveau an ETH-Ausgabe erforderte, um sie aufrechtzuerhalten.

### Emission der Konsensebene {#cl-issuance-pre-merge}

Die [Beacon Chain](/ethereum-forks/#beacon-chain-genesis) ging 2020 live. Anstelle von Minern wird sie durch Validatoren mittels Proof-of-Stake gesichert. Diese Kette wurde initiiert, indem Ethereum-Nutzer ETH in einen Smart Contract auf dem Mainnet (der Ausführungsschicht) einzahlten. Die Beacon Chain reagiert darauf und schreibt den Nutzern eine entsprechende Menge ETH auf der neuen Kette gut. Bis zur Durchführung von The Merge verarbeiteten die Validatoren der Beacon Chain keine Transaktionen und kamen im Wesentlichen zu einem Konsens über den Zustand des Validator-Pools selbst.

Validatoren auf der Beacon Chain werden mit ETH belohnt, wenn sie den Zustand der Kette bestätigen und Blöcke vorschlagen. Belohnungen (oder Strafen) werden bei jedem Zeitalter (alle 6,4 Minuten) basierend auf der Leistung der Validatoren berechnet und verteilt. Die Belohnungen für Validatoren sind **deutlich** geringer als die Mining-Belohnungen, die zuvor unter Proof-of-Work emittiert wurden (2 ETH alle ~13,5 Sekunden), da der Betrieb eines Validierungsknotens wirtschaftlich nicht so intensiv ist und daher keine so hohe Belohnung erfordert oder rechtfertigt.

### Aufschlüsselung der Emissionen vor dem Merge {#pre-merge-issuance-breakdown}

Gesamtes ETH-Angebot: **~120.520.000 ETH** (zum Zeitpunkt von The Merge im September 2022)

**Ausgabe der Ausführungs-Ebene:**

- Wurde auf 2,08 ETH pro 13,3 Sekunden\* geschätzt: **~4.930.000** ETH pro Jahr emittiert
- Ergab eine Inflationsrate von **ungefähr 4,09 %** (4,93 Mio. pro Jahr / 120,5 Mio. gesamt)
- \*Dies beinhaltet die 2 ETH pro kanonischem Block, plus durchschnittlich 0,08 ETH über die Zeit von Ommer-Blöcken. Verwendet ebenfalls 13,3 Sekunden, die angestrebte Basis-Blockzeit ohne jeglichen Einfluss durch eine [Difficulty Bomb](/glossary/#difficulty-bomb). ([Quelle ansehen](https://bitinfocharts.com/ethereum/))

**Konsensschicht-Ausgabe:**

- Bei insgesamt 14.000.000 gestaketen ETH beträgt die ETH-Emissionsrate ungefähr 1700 ETH/Tag ([Quelle ansehen](https://ultrasound.money/))
- Ergibt **~620.500** ETH, die pro Jahr emittiert werden
- Ergab eine Inflationsrate von **ungefähr 0,52 %** (620,5 Tsd. pro Jahr / 119,3 Mio. gesamt)

<Alert variant="update">
<AlertContent>
<AlertDescription>
**Gesamte annualisierte Emissionsrate (vor dem Merge): ~4,61 %** (4,09 % + 0,52 %)

**~88,7 %** der Emission ging an Miner auf der Ausführungsebene (4,09 / 4,61 \* 100)

**~11,3 %** wurden an Staker auf der Konsensebene emittiert (0,52 / 4,61 \* 100) </AlertDescription> </AlertContent> </Alert>

## Nach dem Merge (heute) {#post-merge}

### Emission der Ausführungsebene {#el-issuance-post-merge}

Die Emission der Ausführungsebene seit The Merge ist null. Proof-of-Work ist nach den aktualisierten Konsensregeln kein gültiges Mittel zur Blockproduktion mehr. Alle Aktivitäten der Ausführungsebene werden in „Beacon-Blöcke“ verpackt, die von Proof-of-Stake-Validatoren veröffentlicht und bezeugt werden. Belohnungen für das Bezeugen und Veröffentlichen von Beacon-Blöcken werden auf der Konsensebene separat verbucht.

### Emission der Konsensebene {#cl-issuance-post-merge}

Die Emission der Konsensebene wird heute wie vor The Merge fortgesetzt, mit kleinen Belohnungen für Validatoren, die Blöcke bezeugen und vorschlagen. Validatoren-Belohnungen fließen weiterhin in _Validatoren-Guthaben_, die innerhalb der Konsensebene verwaltet werden. Im Gegensatz zu den aktuellen Konten („Ausführungskonten“), mit denen auf dem Mainnet Transaktionen durchgeführt werden können, können diese separaten Ethereum-Konten keine freien Transaktionen mit anderen Ethereum-Konten durchführen. Die Gelder auf diesen Konten können nur an eine einzige angegebene Ausführungsadresse abgehoben werden.

Seit dem Shanghai/Capella-Upgrade, das im April 2023 stattfand, sind diese Abhebungen für Staker möglich. Staker haben einen Anreiz, ihre _Erträge/Belohnungen (Guthaben über 32 ETH)_ abzuheben, da diese Gelder andernfalls nicht zu ihrer Stake-Gewichtung beitragen (die bei 32 gedeckelt ist).

Die Staker können sich auch dafür entscheiden, auszusteigen und ihr gesamtes Validatoren-Guthaben abzuheben. Um die Stabilität von Ethereum zu gewährleisten, ist die Anzahl der gleichzeitig ausscheidenden Validatoren begrenzt.

Ungefähr 0,33 % der Gesamtzahl der Validatoren können an einem bestimmten Tag aussteigen. Standardmäßig können vier (4) Validatoren pro Epoche (alle 6,4 Minuten oder 900 pro Tag) aussteigen. Ein zusätzlicher (1) Validator darf pro 65.536 (2<sup>16</sup>) zusätzlicher Validatoren über 262.144 (2<sup>18</sup>) aussteigen. Bei über 327.680 Validatoren können zum Beispiel fünf (5) pro Epoche (1.125 pro Tag) ausscheiden. Sechs (6) werden zugelassen, wenn die Gesamtzahl der aktiven Validatoren 393.216 übersteigt, und so weiter.

Wenn mehr Validatoren aussteigen, wird die maximale Anzahl der ausscheidenden Validatoren schrittweise auf ein Minimum von vier reduziert, um absichtlich zu verhindern, dass große, destabilisierende Mengen an gestaketem ETH gleichzeitig abgehoben werden.

### Inflationsaufschlüsselung nach dem Merge {#post-merge-inflation-breakdown}

- Gesamtes ETH-Angebot: **~120.520.000 ETH** (zum Zeitpunkt von The Merge im September 2022)
- Emission der Ausführungsebene: **0**
- Emission der Konsensebene: Wie oben, **~0,52 %** annualisierte Emissionsrate (bei 14 Millionen gestaketen ETH insgesamt)

<Alert variant="update">
<AlertContent>
<AlertDescription>
Gesamte annualisierte Emissionsrate: **~0,52 %**

Nettorückgang der jährlichen ETH-Emission: **~88,7 %** ((4,61 % - 0,52 %) / 4,61 % \* 100) </AlertDescription> </AlertContent> </Alert>

## <Emoji text=":fire:" size="1" /> Die Verbrennung {#the-burn}

Die Gegenkraft zur ETH-Ausgabe ist die Geschwindigkeit, mit der die ETH verbrannt wird. Damit eine Transaktion auf Ethereum ausgeführt werden kann, muss eine Mindestgebühr (die so genannte "Grundgebühr") entrichtet werden, die je nach Netzwerkaktivität kontinuierlich (von Block zu Block) schwankt. Die Gebühr wird in ETH bezahlt und ist _erforderlich_, damit die Transaktion als gültig angesehen wird. Diese Gebühr wird während des Transaktionsprozesses _verbrannt_, wodurch sie aus dem Umlauf genommen wird.

<Alert variant="update">
<AlertContent>
<AlertDescription>

Das Verbrennen von Gebühren wurde mit dem [London-Upgrade](/ethereum-forks/#london) im August 2021 eingeführt und ist seit The Merge unverändert. </AlertDescription> </AlertContent> </Alert>

Zusätzlich zu den Gebühren, die durch das London Upgrade verbrannt werden, können Validatoren auch mit Strafen belegt werden, wenn sie offline sind, oder schlimmer noch, ihr Stake kann gekürzt werden, wenn sie gegen bestimmte Regeln verstoßen, die die Netzsicherheit gefährden. Diese Strafen führen zu einer Verringerung des ETH-Guthabens dieses Validators, das nicht auf ein anderes Konto überwiesen wird, sondern effektiv verbrannt/aus dem Verkehr gezogen wird.

### Berechnung des durchschnittlichen Gaspreises für die Deflation {#calculating-average-gas-price-for-deflation}

Wie bereits erwähnt, hängt die Menge der an einem bestimmten Tag ausgegebenen ETH von den insgesamt für Staking eingesetzten ETH ab. Zum Zeitpunkt der Erstellung dieses Artikels sind dies etwa 1700 ETH/Tag.

Um den durchschnittlichen Gaspreis zu ermitteln, der erforderlich ist, um diese Emission in einem bestimmten 24-Stunden-Zeitraum vollständig auszugleichen, berechnen wir zunächst die Gesamtzahl der Blöcke eines Tages bei einer Blockzeit von 12 Sekunden:

- `(1 Block / 12 Sekunden) * (60 Sekunden/Minute) = 5 Blöcke/Minute`
- `(5 Blöcke/Minute) * (60 Minuten/Stunde) = 300 Blöcke/Stunde`
- `(300 Blöcke/Stunde) * (24 Stunden/Tag) = 7200 Blöcke/Tag`

Jeder Block zielt auf `15x10^6 Gas/Block` ab ([mehr zu Gas](/developers/docs/gas/)). Auf diese Weise können wir den durchschnittlichen Gaspreis (in Einheiten von gwei/Gas) ermitteln, der erforderlich ist, um die Ausgabe auszugleichen, wenn die tägliche ETH-Ausgabe insgesamt 1700 ETH beträgt:

- `7200 Blöcke/Tag * 15x10^6 Gas/Block * `**`Y Gwei/Gas`**` * 1 ETH/ 10^9 Gwei = 1700 ETH/Tag`

Auflösen nach `Y`:

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 Gwei` (Rundung auf nur zwei signifikante Ziffern)

Eine andere Möglichkeit, diesen letzten Schritt umzustellen, wäre, `1700` durch eine Variable `X` zu ersetzen, die die tägliche ETH-Emission darstellt, und den Rest zu vereinfachen zu:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Wir können dies vereinfachen und als eine Funktion von `X` schreiben:

- `f(X) = X/108`, wobei `X` die tägliche ETH-Emission ist und `f(X)` den Gwei/Gas-Preis darstellt, der erforderlich ist, um alle neu emittierten ETH auszugleichen.

Wenn also zum Beispiel `X` (tägliche ETH-Emission) basierend auf der Gesamtzahl der gestaketen ETH auf 1800 ansteigt, wäre `f(X)` (Gwei, die erforderlich sind, um die gesamte Emission auszugleichen) dann `17 Gwei` (bei Verwendung von 2 signifikanten Ziffern).

## Weiterführende Lektüre {#further-reading}

- [Die Zusammenführung](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) – _Verfügbare Dashboards zur Visualisierung der ETH-Emission und -Verbrennung in Echtzeit_
- [Charting Ethereum Issuance](https://www.attestant.io/posts/charting-ethereum-issuance/) – _Jim McDonald 2020_
