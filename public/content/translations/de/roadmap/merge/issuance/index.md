---
title: Wie hat The Merge das ETH-Angebot beeinflusst
description: Aufschlüsselung darüber, wie The Merge das ETH-Angebot beeinflusst hat
lang: de
---

# Wie hat The Merge das ETH-Angebot beeinflusst {#how-the-merge-impacts-ETH-supply}

The Merge repräsentierte den Übergang des Ethereum-Netzwerks von Proof-of-Work zu Proof-of-Stake, welcher im September 2022 stattfand. Die Art und Weise, wie ETH ausgegeben wurde, hat sich zum Zeitpunkt dieser Übergangsphase verändert. Früher wurde neues ETH aus zwei Quellen ausgegeben: der Ausführungsebene (d.h. Mainnet) und der Konsensschicht (d.h. Beacon Chain). Seit The Merge findet auf der Ausführungsebene keine Eth-Ausgabe mehr statt. Lassen Sie uns das genauer betrachten.

## Bestandteile der ETH-Ausgabe {#components-of-eth-issuance}

Das Angebot an ETH kann hauptsächlich in zwei Faktoren unterteilt werden: Die Ausgabe und das Verbrennen.

Der Prozess der Erstellung von zuvor nicht existierendem ETH wird als **Ausgabe** von ETH bezeichnet. Das **Verbrennen** von ETH bezeichnet den Prozess, bei dem vorhandenes ETH zerstört und damit aus dem Umlauf genommen wird. Die Rate der Ausgabe und des Verbrennens wird anhand mehrerer Parameter berechnet, und das Gleichgewicht zwischen ihnen bestimmt die resultierende Inflations-/Deflationsrate von Ether.

<Card
emoji=":chart_decreasing:"
title="ETH-Ausgabe tldr">

- Vor der Umstellung auf Proof-of-Stake erhielten Miner etwa 13.000 ETH/Tag
- Staker erhalten etwa 1.700 ETH/Tag, basierend auf etwa 14 Millionen insgesamt gestakten ETH
- Die genaue Staking-Ausgabe schwankt je nach der Gesamtmenge an gestakten ETH
- Seit The Merge bleibt nur noch die ~1.700 ETH/Tag, wodurch die gesamte neue ETH-Ausgabe um ~88% gesunken ist
- Das Verbrennen: Dies schwankt je nach Netzwerkanforderung. _Wenn_ für einen bestimmten Tag ein durchschnittlicher Gaspreis von mindestens 16 Gwei beobachtet wird, kompensiert dies effektiv die ~1.700 ETH, die an die Validatoren ausgegeben werden, und bringt die Netto-ETH-Inflation für diesen Tag auf Null oder weniger.

</Card>

## Vor dem Merge (historisch) {#pre-merge}

### Ausgabe auf der Ausführungsschicht {#el-issuance-pre-merge}

Unter dem Proof-of-Work-System interagierten die Miner nur mit der Ausführungsschicht und wurden mit Blockbelohnungen belohnt, wenn sie die ersten Miner waren, die den nächsten Block gelöst haben. Seit dem [Constantinople-Upgrade](/history/#constantinople) im Jahr 2019 betrug diese Belohnung 2 ETH pro Block. Miner wurden auch für die Veröffentlichung von [Ommer-Blöcken](/glossary/#ommer) belohnt, das waren gültige Blöcke, die nicht in der längsten/kanonischen Kette landeten. Diese Belohnungen erreichten maximal 1,75 ETH pro Ommer und wurden zusätzlich zu der Belohnung aus dem kanonischen Block ausgegeben. Das Mining war eine wirtschaftlich intensive Tätigkeit, die historisch gesehen ein hohes Niveau an ETH-Ausgabe erforderte, um sie aufrechtzuerhalten.

### Ausgabe der Konsensschicht {#cl-issuance-pre-merge}

Die [Beacon Chain](/history/#beacon-chain-genesis) wurde 2020 gestartet. Anstelle von Minern wird sie durch Validatoren mittels Proof-of-Stake gesichert. Diese Kette wurde initiiert, indem Ethereum-Nutzer ETH in einen Smart Contract auf dem Mainnet (der Ausführungsschicht) einzahlten. Die Beacon Chain reagiert darauf und schreibt den Nutzern eine entsprechende Menge ETH auf der neuen Kette gut. Bis zur Durchführung von The Merge verarbeiteten die Validatoren der Beacon Chain keine Transaktionen und kamen im Wesentlichen zu einem Konsens über den Zustand des Validator-Pools selbst.

Validatoren auf der Beacon Chain werden mit ETH belohnt, wenn sie den Zustand der Kette bestätigen und Blöcke vorschlagen. Belohnungen (oder Strafen) werden bei jedem Zeitalter (alle 6,4 Minuten) basierend auf der Leistung der Validatoren berechnet und verteilt. Die Belohnungen für Validatoren sind erheblich geringer als die zuvor unter dem Proof-of-Work-Verfahren ausgeschütteten Mining-Belohnungen (2 ETH alle etwa 13,5 Sekunden), da der Betrieb eines Validierungsknotens nicht so wirtschaftlich intensiv ist und daher keine so hohe Belohnung erfordert oder rechtfertigt.

### Die Verteilung der Ausgabe vor dem Merge lässt sich wie folgt darstellen: {#pre-merge-issuance-breakdown}

Gesamt ETH Angebot: **~120,520,000 ETH** (zum Zeitpunkt von The Merge im September 2022)

**Ausgabe in der Ausführungsschicht:**

- Wurde auf 2,08 ETH pro 13,3 Sekunden\* geschätzt: **~4,930,000** ETH wurden in einem Jahr ausgegeben
- Führte zu einer Inflationsrate von **etwa 4.09%** (4,93 Mio. pro Jahr / 120,5 Mio. Gesamt)
- \*Dies beinhaltet die 2 ETH pro kanonischem Block, plus durchschnittlich 0,08 ETH über die Zeit von Ommer-Blöcken. Es verwendet auch 13,3 Sekunden, die Zielzeit für den Baseline-Block ohne jeglichen Einfluss durch eine ["Difficulty Bomb"](/glossary/#difficulty-bomb). ([Siehe Quelle](https://bitinfocharts.com/ethereum/))

**Konsensschicht-Ausgabe:**

- Bei insgesamt 14.000.000 gestakten ETH beträgt die Rate der ETH-Ausgabe etwa 1700 ETH/Tag ([Quelle siehe hier](https://ultrasound.money/))
- Ergibt **~620,500** ETH herausgegeben in einem Jahr
- Daraus ergibt sich eine Inflationsrate von **ungefähr 0.52%** (620.5K pro Jahr / 119.3M insgesamt)

<InfoBanner>
<strong>Jährlicher Gesamtausgabesatz (Pre-Merge): ~4.61%</strong> (4.09% + 0.52%)<br/><br/>
<strong>~88.7%</strong> der Ausgabe ging an die Miner auf der Ausführungs-Ebene (4.09 / 4.61 * 100)<br/><br/>
<strong>~11.3%</strong> wurde an Staker auf der Konsensus-Ebene ausgegeben (0.52 / 4.61 * 100)
</InfoBanner>

## Post-Merge (Gegenwart) {#post-merge}

### Ausgabe auf der Ausführungsschicht {#el-issuance-post-merge}

Ausgabe auf der Ausführungs-Ebene seit dem Merge ist Null. Proof-of-Work ist nach den verbesserten KonsensusRegeln kein gültiges Mittel zur Blockproduktion mehr. Alle Aktivitäten der Ausführungsebene werden in "Beacon-Blöcke" verpackt, die veröffentlicht und von Proof-of-Stake-Validatoren bestätigt werden. Belohnungen für die Bescheinigung und Veröffentlichung von Beacon-Blöcken werden auf der Konsensus-Ebene separat berücksichtigt.

### Ausgabe der Konsensschicht {#cl-issuance-post-merge}

Die Ausgabe der Konsensus-Ebene wird heute wie vor dem Merge fortgesetzt, mit kleinen Belohnungen für Validatoren, die Blöcke bestätigen und vorschlagen. Validatoren-Belohnungen fließen weiterhin in _Validatoren-Guthaben_ ein, die innerhalb der Konsensus-Ebene verwaltet werden. Im Gegensatz zu den laufenden Konten ("Ausführungskonten"), die im Mainnet Transaktionen durchführen können, sind diese separaten Ethereum-Konten nicht in der Lage, frei mit anderen Ethereum-Konten zu handeln. Die Gelder auf diesen Konten können nur an eine einzige angegebene Ausführungsadresse abgehoben werden.

Seit des Shanghai/Capella Upgrades im April 2023 sind diese Rücknahmen für Staker möglich. Für Staker besteht ein Anreiz, ihre _Gewinne/Belohnungen (Guthaben über 32 ETH)_ zu entfernen, da diese Gelder ansonsten nicht zu ihren Einsätzen (die maximal 32 beträgt) beitragen.

Die Staker können sich auch dafür entscheiden, auszusteigen und ihr gesamtes Validatoren-Guthaben abzuheben. Um die Stabilität von Ethereum zu gewährleisten, ist die Anzahl der gleichzeitig ausscheidenden Validatoren begrenzt.

Etwa 0,33 % der Gesamtzahl der Validatoren können an einem bestimmten Tag ausscheiden. Standardmäßig können vier (4) Validatoren pro Epoche aussteigen (alle 6,4 Minuten oder 900 pro Tag). Ein weiterer (1) Validator darf für jeden 65,536 (2<sup>16</sup>) zusätzlichen Validator über 262,144 (2<sup>18</sup>) aussteigen. Bei über 327.680 Validatoren können zum Beispiel fünf (5) pro Epoche (1.125 pro Tag) ausscheiden. Sechs (6) werden zugelassen, wenn die Gesamtzahl der aktiven Validatoren 393.216 übersteigt, und so weiter.

Wenn mehr Validatoren aussteigen, wird die maximale Anzahl der ausscheidenden Validatoren schrittweise auf ein Minimum von vier reduziert, um absichtlich zu verhindern, dass große, destabilisierende Mengen an eingesetztem ETH gleichzeitig abgezogen werden.

### Post-Merge Aufschlüsselung der Inflation {#post-merge-inflation-breakdown}

- Gesamt ETH Angebot: **~120,520,000 ETH** (zum Zeitpunkt von The Merge im September 2022)
- Ausgabe der Ausführungs-Ebene: **0**
- Ausgabe der Konsensus-Ebene: Wie oben beschrieben, **~0.52%** Jährliche Emissionsrate (mit insgesamt 14 Millionen ETH in Staking)

<InfoBanner>
Jährlicher Gesamtausgabesatz: <strong>~0.52%</strong><br/><br/>
Netto-Reduktion der jährlichen ETH-Emissionen: <strong>~88.7%</strong> ((4.61% - 0.52%) / 4.61% * 100)
</InfoBanner>

## <Emoji text=":fire:" size="1" />Der Burn {#the-burn}

Die Gegenkraft zur ETH-Ausgabe ist die Geschwindigkeit, mit der die ETH verbrannt wird. Damit eine Transaktion auf Ethereum ausgeführt werden kann, muss eine Mindestgebühr (die so genannte "Grundgebühr") entrichtet werden, die je nach Netzwerkaktivität kontinuierlich (von Block zu Block) schwankt. Die Gebühr wird in ETH bezahlt und ist _erforderlich_, damit die Transaktion als gültig betrachtet wird. Diese Gebühr wird während des Transaktionsprozesses _verbrannt_, wodurch sie aus dem Verkehr gezogen wird.

<InfoBanner>
Die Verbrennung von Gebühren wurde mit dem <a href="/history/#london">the London Upgrade</a> im August 2021 in Betrieb genommen und bleibt seit dem Merge unverändert.
</InfoBanner>

Zusätzlich zu den Gebühren, die durch das London Upgrade verbrannt werden, können Validatoren auch mit Strafen belegt werden, wenn sie offline sind, oder schlimmer noch, ihr Stake kann gekürzt werden, wenn sie gegen bestimmte Regeln verstoßen, die die Netzsicherheit gefährden. Diese Strafen führen zu einer Verringerung des ETH-Guthabens dieses Validators, das nicht auf ein anderes Konto überwiesen wird, sondern effektiv verbrannt/aus dem Verkehr gezogen wird.

### Berechnung des durchschnittlichen Gaspreises bei Deflation {#calculating-average-gas-price-for-deflation}

Wie bereits erwähnt, hängt die Menge der an einem bestimmten Tag ausgegebenen ETH von den insgesamt für Staking eingesetzten ETH ab. Zum Zeitpunkt der Erstellung dieses Artikels sind dies etwa 1700 ETH/Tag.

Um den durchschnittlichen Gaspreis zu ermitteln, der erforderlich ist, um diese Emission in einem bestimmten 24-Stunden-Zeitraum vollständig auszugleichen, berechnen wir zunächst die Gesamtzahl der Blöcke eines Tages bei einer Blockzeit von 12 Sekunden:

- `(1 Block / 12 Sekunden) * (60 Sekunden/Minute) = 5 Blöcke/Minute`
- `(5 Blöcke/Minute) * (60 Minuten/Stunde) = 300 Blöcke/Stunde`
- `(300 Blöcke/Stunde) * (24 Stunden/Tag) = 7200 Blöcke/Tag`

Jeder Block zielt darauf ab `15x10^6 Gas/Block` ([mehr zum Thema Gas](/developers/docs/gas/)). Auf diese Weise können wir den durchschnittlichen Gaspreis (in Einheiten von gwei/Gas) ermitteln, der erforderlich ist, um die Ausgabe auszugleichen, wenn die tägliche ETH-Ausgabe insgesamt 1700 ETH beträgt:

- `7200 Blöcke/Tag * 15x10^6 Gas/Block *`**`Y gwei/gas`**`* 1 ETH/ 10^9 gwei = 1700 ETH/Tag`

Auflösen nach `Y`:

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (Rundung auf nur zwei signifikante Ziffern)

Eine andere Möglichkeit, diesen letzten Schritt umzugestalten, wäre die Ersetzung von `1700` mit einer Variablen `X` die die tägliche ETH-Ausgabe darstellt, und den Rest zu vereinfachen:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Wir können dies vereinfachen als eine Funktion von `X`:

- `f(X) = X/108` wobei `X` ist die tägliche ETH-Ausgabe, und `f(X)` stellt die Menge an gwei/Gaspreis dar, die erforderlich ist, um alle neu ausgegebenen ETH auszugleichen.

Wenn also zum Beispiel `X` (tägliche ETH-Ausgabe) auf 1800 basierend auf der Summe der eingesetzten ETH ansteigt, `f(X)` (gwei, die erforderlich sind, um die gesamte Emission auszugleichen) wäre dann `17 gwei` (mit 2 signifikanten Ziffern)

## Weiterführende Informationen {#further-reading}

- [Der Zusammenschluss](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) - _Dashboards zur Visualisierung von ETH-Ausgabe und -Verbrauch in Echtzeit verfügbar_
- [Kartierung der Ethereum-Ausgabe](https://www.attestant.io/posts/charting-ethereum-issuance/) - _Jim McDonald 2020_
