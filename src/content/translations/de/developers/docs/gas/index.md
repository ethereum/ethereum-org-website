---
title: Gas und Gebühren
description:
lang: de
---

Gas ist für das Ethereum-Netzwerk unerlässlich. Es ist der Treibstoff, der Ethereum den Betrieb ermöglicht, so wie ein Auto Benzin braucht, um zu fahren.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir dir, zuerst [Transaktionen](/developers/docs/transactions/) und [Blöcke](/developers/docs/evm/) zu lesen.

## Was ist Gas? {#what-is-gas}

Gas bezieht sich auf die Einheit, die den Umfang des Rechenaufwands misst, der für die Durchführung spezifischer Operationen im Ethereum-Netzwerk erforderlich ist.

Da jede Ethereum-Transaktion Rechenressourcen benötigt, um ausgeführt zu werden, wird für jede Transaktion eine Gebühr fällig. Gas bezieht sich auf die Gebühr, die erforderlich ist, um eine Transaktion auf Ethereum erfolgreich durchzuführen.

![Ein Diagramm, das zeigt, wo Gas im EVM-Betrieb benötigt wird](./gas.png) _Diagramm angepasst von [Ethereum EVM illustriert](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Im Wesentlichen werden Gasgebühren in Ethereums Eigenwährung, Ether (ETH) gezahlt. Die Gaspreise sind in Gwei angegeben, was selbst eine Bezeichnung für ETH ist. Jeder Gwei ist gleich 0,000000001 ETH (10<sup>-9</sup> ETH). Anstatt z. B. zu sagen, dass dein Gas 0,000000001 Ether kostet, kannst du sagen, dass dein Gas 1 Gwei kostet. Das Wort "gwei" selbst bedeutet "giga-wei" und entspricht 1.000.000.000 wei. Wei selbst (benannt nach [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), dem Erfinder von [B-Geld](https://www.investopedia.com/terms/b/bmoney.asp)) ist die kleinste Einheit von ETH.

## Vor dem London-Upgrade {#pre-london}

Die Art und Weise, wie die Transaktionsgebühren im Ethereum-Netzwerk berechnet wurden, änderte sich mit dem [London-Upgrade](/history/#london) vom August 2021. Hier ist eine Zusammenfassung, wie die Dinge früher funktionierten:

Nehmen wir an, Alice müsste Bob 1 ETH zahlen. Bei der Transaktion liegt das Gaslimit bei 21.000 Einheiten und der Gaspreis bei 200 gwei.

Die Gesamtgebühr wäre gewesen: `Gaseinheiten (Limit) * Gaspreis pro Einheit`, d. h. `21.000 * 200 = 4.200.000 gwei` oder 0,0042 ETH.

Wenn Alice das Geld schickt, werden 1,0042 ETH von ihrem Konto abgezogen. Bob würden 1,0000 ETH gutgeschrieben werden. Der Miner würde 0,0042 ETH erhalten.

Dieses Video bietet einen kurzen Überblick über Gas und warum es existiert:

<YouTube id="AJvzNICwcwc" />

## Nach dem London-Upgrade {#post-london}

[Das London-Upgrade](/history/#london) wurde am 5. August 2021 eingeführt, um Transaktionen auf Ethereum für die Nutzer berechenbarer zu machen, indem der Transaktionsgebühren-Mechanismus von Ethereum überarbeitet wurde. Zu den wichtigsten Vorteilen dieser Änderung gehören eine bessere Schätzung der Transaktionsgebühren, eine allgemein schnellere Aufnahme von Transaktionen und die Kompensation der ETH-Ausgabe durch das Verbrennen eines Prozentsatzes der Transaktionsgebühren.

Seit dem Upgrade des Londoner Netzes gibt es für jeden Block eine Grundgebühr, den Mindestpreis pro Gaseinheit für die Aufnahme in diesen Block, der vom Netz auf der Grundlage der Nachfrage nach Blockraum berechnet wird. Da die Grundgebühr der Transaktionsgebühr verbrannt wird, wird von den Nutzern erwartet, dass sie bei ihren Transaktionen auch ein Trinkgeld (Prioritätsgebühr) festlegen. Das Trinkgeld entschädigt die Miner für die Ausführung und Weitergabe von Nutzertransaktionen in Blöcken und wird voraussichtlich von den meisten Wallets automatisch festgelegt.

Die Berechnung der gesamten Transaktionsgebühr funktioniert wie folgt: `Gaseinheiten (Limit) * (Grundgebühr + Trinkgeld)`

Sagen wir, Jordan muss Taylor 1 ETH zahlen. Bei der Transaktion liegt das Gaslimit bei 21.000 Einheiten und die Grundgebühr bei 100 gwei. Jordan enthält ein Trinkgeld von 10 gwei.

Mit der obigen Formel können wir dies als `21.000 * (100 + 10) = 2.310.000 gwei` oder 0,00231 ETH berechnen.

Wenn Jordan das Geld schickt, werden 1,00231 ETH von seinem Konto abgezogen. Taylor werden 1,0000 ETH gutgeschrieben. Der Miner erhält das Trinkgeld von 0,00021 ETH. Die Grundgebühr von 0,0021 ETH wird verbrannt.

Zusätzlich kann Jordan auch eine maximale Gebühr (`maxFeePerGas`) für die Transaktion festlegen. Die Differenz zwischen der Höchstgebühr und der tatsächlichen Gebühr wird Jordan zurückerstattet, d. h. `Erstattung = Höchstgebühr - (Grundgebühr + Prioritätsgebühr)`. Jordan kann einen Höchstbetrag für die Ausführung der Transaktion festlegen und muss sich keine Sorgen machen, dass er "über" die Grundgebühr hinaus zahlt, wenn die Transaktion ausgeführt wird.

### Blockgröße {#block-size}

Vor dem London-Upgrade hatte Ethereum Blöcke mit fester Größe. In Zeiten hoher Netznachfrage waren diese voll ausgelastet. Infolgedessen mussten die Nutzer/Nutzerinnen oft warten, bis die hohe Nachfrage nachließ, um in einen Block aufgenommen zu werden, was zu einem schlechten Nutzererlebnis führte.

Mit dem London-Upgrade wurden in Ethereum Blöcke mit variabler Größe eingeführt. Jeder Block hat eine Zielgröße von 15 Millionen Gas, aber die Größe der Blöcke wird entsprechend der Netznachfrage erhöht oder verringert, bis zur Blockgrenze von 30 Millionen Gas (2x die Zielblockgröße). Das Protokoll erreicht durch den Prozess des _Tâtonnement_ eine gleichgewichtige Blockgröße von durchschnittlich 15 Millionen. Das heißt, wenn die Blockgröße die Zielblockgröße übersteigt, erhöht das Protokoll die Grundgebühr für den folgenden Block. Ebenso senkt das Protokoll die Grundgebühr, wenn die Blockgröße kleiner als die Zielblockgröße ist. Der Betrag, um den die Grundgebühr angepasst wird, ist proportional dazu, wie weit die aktuelle Blockgröße vom Zielwert entfernt ist. [Mehr über Blöcke](/developers/docs/blocks/).

### Grundgebühr {#base-fee}

Jeder Block hat eine Grundgebühr, die als Reservepreis dient. Um in einen Block aufgenommen zu werden, muss der angebotene Preis pro Gas mindestens der Grundgebühr entsprechen. Die Grundgebühr wird unabhängig vom aktuellen Block berechnet und richtet sich stattdessen nach den vorherigen Blöcken. Das macht die Transaktionsgebühren für die Nutzer/Nutzerinnen berechenbarer. Wenn der Block abgebaut wird, wird diese Grundgebühr "verbrannt" und aus dem Verkehr gezogen.

Die Grundgebühr wird anhand einer Formel berechnet, die die Größe des vorherigen Blocks (die für alle Transaktionen verwendete Gasmenge) mit der Zielgröße vergleicht. Die Grundgebühr erhöht sich um maximal 12,5 % pro Block, wenn die Zielblockgröße überschritten wird. Dieses exponentielle Wachstum macht es wirtschaftlich unrentabel, die Blockgröße unbegrenzt hoch zu halten.

| Blocknummer | Enthaltenes Gas | Gebührenerhöhung | Aktuelle Grundgebühr |
| ----------- | --------------: | ---------------: | -------------------: |
| 1           |            15 m |              0 % |             100 gwei |
| 2           |            30 m |              0 % |             100 gwei |
| 3           |            30 m |           12,5 % |           112,5 gwei |
| 4           |            30 m |           12,5 % |           126,6 gwei |
| 5           |            30 m |           12,5 % |           142,4 gwei |
| 6           |            30 m |           12,5 % |           160,2 gwei |
| 7           |            30 m |           12,5 % |           180,2 gwei |
| 8           |            30 m |           12,5 % |           202,7 gwei |

Im Vergleich zum Markt vor der Londoner Gasauktion führt diese Änderung des Transaktionsgebühren-Mechanismus dazu, dass die Gebührenvorhersage zuverlässiger ist. Der obigen Tabelle folgend, um eine Transaktion auf Block Nummer 9 zu erstellen, wird eine Wallet den Nutzer mit Sicherheit wissen lassen, dass die **maximale Grundgebühr**, die zum nächsten Block hinzugefügt werden soll, `aktuelle Grundgebühr * 112,5%` oder `202,8 gwei * 112,5% = 228,1 gwei` ist.

Außerdem ist es unwahrscheinlich, dass wir längere Spitzen von vollen Blöcken sehen werden, weil die Grundgebühr bei einem vollen Block so schnell steigt.

| Blocknummer | Enthaltenes Gas | Gebührenerhöhung | Aktuelle Grundgebühr |
| ----------- | --------------: | ---------------: | -------------------: |
| 30          |            30 m |           12,5 % |          2705,6 gwei |
| ...         |             ... |           12,5 % |                  ... |
| 50          |            30 m |           12,5 % |         28531,3 gwei |
| ...         |             ... |           12,5 % |                  ... |
| 100         |            30 m |           12,5 % |      10302608,6 gwei |

### Prioritätsgebühr (Trinkgeld) {#priority-fee}

Vor dem London-Upgrade erhielten die Miner die gesamte Gasgebühr für jede in einem Block enthaltene Transaktion.

Da die neue Grundgebühr verbrannt wurde, führte das London-Upgrade eine Prioritätsgebühr (Trinkgeld) ein, um Minern einen Anreiz zu geben, eine Transaktion in den Block aufzunehmen. Ohne Trinkgelder würde es sich für Miner lohnen, leere Blöcke abzubauen, da sie die gleiche Blockbelohnung erhalten würden. Unter normalen Bedingungen bietet ein kleines Trinkgeld den Minern einen minimalen Anreiz, eine Transaktion durchzuführen. Für Transaktionen, die vor anderen Transaktionen im selben Block bevorzugt ausgeführt werden müssen, ist ein höheres Trinkgeld notwendig, um konkurrierende Transaktionen zu überbieten.

### Maximale Gebühr {#maxfee}

Um eine Transaktion im Netzwerk auszuführen, können Nutzer/Nutzerinnen ein maximales Limit angeben, das sie bereit sind, für die Ausführung ihrer Transaktion zu zahlen. Dieser optionale Parameter ist als `maxFeePerGas` bekannt. Damit eine Transaktion ausgeführt werden kann, muss die maximale Gebühr die Summe aus der Grundgebühr und dem Trinkgeld übersteigen. Der Absender der Transaktion erhält die Differenz zwischen der maximalen Gebühr und der Summe aus Grundgebühr und Trinkgeld zurück.

### Berechnung der Gebühren {#calculating-fees}

Einer der Hauptvorteile des London-Upgrades ist die Verbesserung der Benutzererfahrung bei der Festlegung der Transaktionsgebühren. Bei Wallets, die das Upgrade unterstützen, geben die Wallet-Anbieter nicht mehr explizit an, wie viel du bereit bist, für deine Transaktion zu zahlen, sondern legen automatisch eine empfohlene Transaktionsgebühr fest (Grundgebühr + empfohlene Prioritätsgebühr), um die Komplexität für ihre Nutzer zu reduzieren.

## EIP-1559 {#eip-1559}

Die Implementierung der [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) im London-Upgrade hat den Mechanismus der Transaktionsgebühren komplexer gemacht als die vorherige Gaspreisauktion. Dies hat aber den Vorteil, dass die Gasgebühren berechenbarer sind, was zu einem effizienteren Markt für Transaktionsgebühren führt. Nutzer können Transaktionen mit einem `maxFeePerGas` einreichen, der angibt, wie viel sie bereit sind, für die Ausführung der Transaktion zu zahlen. Dabei können sie sicher sein, dass sie nicht mehr als den Marktpreis für Gas (`baseFeePerGas`) zahlen und alles, was darüber hinausgeht, abzüglich ihres Trinkgelds zurückerstattet bekommen.

Dieses Video erklärt EIP-1559 und die Vorteile, die es bringt:

<YouTube id="MGemhK9t44Q" />

Wenn du interessiert bist, kannst du hier die genauen [EIP-1559 Spezifikationen](https://eips.ethereum.org/EIPS/eip-1559) nachlesen.

Gehe mit diesem Link weiter in den Kaninchenbau hinein: [EIP-1559 Resources](https://hackmd.io/@timbeiko/1559-resources).

## Warum gibt es Gasgebühren? {#why-do-gas-fees-exist}

Kurzum: Gasgebühren helfen dabei, das Ethereum-Netz sicher zu halten. Indem wir für jede Berechnung, die im Netzwerk ausgeführt wird, eine Gebühr verlangen, verhindern wir, dass schlechte Akteure das Netzwerk spammen. Um versehentliche oder feindliche Endlosschleifen oder andere Rechenverschwendung in Code zu vermeiden, muss jede Transaktion eine Grenze für die Anzahl der Rechenschritte festlegen, die sie zur Codeausführung verwenden kann. Die Grundeinheit der Berechnung ist "Gas".

Auch wenn eine Transaktion ein Limit beinhaltet, wird jedes nicht verbrauchte Gas an den Nutzer zurückgegeben (d. h. `max fee - (base fee + tip)` wird zurückgegeben).

![Ein Diagramm, das zeigt, wie ungenutztes Gas zurückerstattet wird](../transactions/gas-tx.png) _Diagramm angepasst von [Ethereum EVM illustriert](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Was ist das Gaslimit? {#what-is-gas-limit}

Das Gaslimit bezieht sich auf die maximale Menge an Gas, die du bei einer Transaktion verbrauchen möchtest. Kompliziertere Transaktionen mit [smarten Verträgen](/developers/docs/smart-contracts/) erfordern mehr Rechenarbeit und damit ein höheres Gaslimit als eine einfache Zahlung. Ein Standard-ETH-Transfer erfordert ein Gaslimit von 21.000 Gaseinheiten.

Wenn du zum Beispiel ein Gaslimit von 50.000 für einen einfachen ETH-Transfer festlegen würdest, würde die EVM 21.000 verbrauchen und du würdest die restlichen 29.000 zurückbekommen. Wenn du jedoch zu wenig Gas angibst, z. B. ein Gaslimit von 20.000 für einen einfachen ETH-Transfer, wird die EVM deine 20.000 Gaseinheiten verbrauchen und versuchen, die Transaktion durchzuführen, aber sie wird nicht abgeschlossen. Die EVM macht dann alle Änderungen rückgängig, aber da der Miner bereits Arbeit im Wert von 20.000 Gaseinheiten geleistet hat, ist dieses Gas verbraucht.

## Warum können die Gasgebühren so hoch sein? {#why-can-gas-fees-get-so-high}

Die hohen Gasgebühren sind auf die Beliebtheit von Ethereum zurückzuführen. Für jede Operation auf Ethereum muss Gas verbraucht werden, und der Gasplatz ist pro Block begrenzt. Zu den Gebühren gehören Berechnungen, das Speichern oder Verarbeiten von Daten oder die Übertragung von Token, die unterschiedliche Mengen von "Gas"-Einheiten verbrauchen. Je komplexer die Funktionalität einer App wird, desto mehr Operationen führt ein Smart Contract aus, was bedeutet, dass jede Transaktion mehr Platz in einem Block begrenzter Größe einnimmt. Wenn die Nachfrage zu groß ist, müssen die Nutzer/Nutzerinnen einen höheren Trinkgeldbetrag anbieten, um zu versuchen, die Transaktionen anderer Nutzer/Nutzerinnen zu überbieten. Ein höheres Trinkgeld kann die Wahrscheinlichkeit erhöhen, dass deine Transaktion in den nächsten Block gelangt.

Wie viel wir für eine bestimmte Transaktion bezahlen müssen, wird nicht allein durch den Gaspreis bestimmt. Um die Transaktionsgebühr zu berechnen, müssen wir das verbrauchte Gas mit der Transaktionsgebühr multiplizieren, die in gwei gemessen wird.

## Initiativen zur Senkung der Gaskosten {#initiatives-to-reduce-gas-costs}

Die Ethereum-[Skalierbarkeits-Upgrades](/roadmap/) sollten letztendlich einige der Probleme mit den Gasgebühren lösen, was wiederum die Plattform in die Lage versetzen wird, Tausende von Transaktionen pro Sekunde zu verarbeiten und global zu skalieren.

Die Skalierung auf Layer 2 ist eine der wichtigsten Initiativen, um die Gaskosten, das Nutzererlebnis und die Skalierbarkeit deutlich zu verbessern. [Mehr zur Skalierung mit Layer 2](/developers/docs/scaling/#layer-2-scaling)

Das neue Proof-of-Stake-Modell, das auf der Beacon Chain eingeführt wurde, soll den hohen Stromverbrauch und die Abhängigkeit von spezieller Hardware reduzieren. Diese Kette wird es dem dezentralen Ethereum-Netzwerk ermöglichen, sich zu verständigen und das Netzwerk sicher zu halten, während der Energieverbrauch begrenzt wird, indem stattdessen ein finanzielles Commitment verlangt wird.

Jeder, der mindestens 32 ETH besitzt, kann diese einsetzen, um ein Validator zu werden, welcher für die Verarbeitung von Transaktionen, die Validierung von Blöcken und das Vorschlagen neuer Blöcke für die Kette verantwortlich ist. Nutzer mit weniger als 32 ETH können an Staking-Pools teilnehmen.

## Strategien zur Senkung der Gaskosten {#strategies-for-you-to-reduce-gas-costs}

Wenn du die Gaskosten für deine ETH senken willst, kannst du ein Trinkgeld setzen, um die Prioritätsstufe deiner Transaktion anzugeben. Die Miner werden Transaktionen mit einem höheren Trinkgeld pro Gas "bearbeiten" und ausführen, da sie die von dir gezahlten Trinkgelder behalten können und weniger geneigt sind, Transaktionen mit niedrigeren Trinkgeldern auszuführen.

Wenn du die Gaspreise überwachen willst, damit du deine ETH günstiger verschicken kannst, kannst du viele verschiedene Tools nutzen, wie z. B.:

- [Etherscan](https://etherscan.io/gastracker) _Transaktionsgaspreis-Schätzer_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Gasschätzungs-Chrome-Erweiterung, die sowohl Typ 0 Legacy-Transaktionen als auch Typ 2 EIP-1559-Transaktionen unterstützt_

- [ETH-Tankstelle](https://ethgasstation.info/) _Verbraucherorientierte Metriken für den Ethereum-Gasmarkt _
- [Cryptoneur-Gasgebührenrechner](https://www.cryptoneur.xyz/gas-fees-calculator) _Berechnen Sie Gasgebühren in Ihrer lokalen Währung für verschiedene Transaktionsarten im Mainnet, Arbitrum und Polygon._

## Verwandte Tools {#related-tools}

- [Bloxy Gas Analytics](https://stat.bloxy.info/superset/dashboard/gas/?standalone=true) _Netzwerk-Gas-Statistik_
- [Blocknative's Gas Platform](https://www.blocknative.com/gas) _Gas Schätzung API powered by Blocknative's global mempool data platform_

## Weiterführende Informationen {#further-reading}

- [Ethereum Gas erklärt](https://defiprime.com/gas)
- [Reduziere den Gasverbrauch deiner Smart Contracts](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Proof-of-Stake vs. Proof-of-Work](https://blockgeeks.com/guides/proof-of-work-vs-proof-of-stake/)

## Verwandte Themen {#related-topics}

- [Mining](/developers/docs/consensus-mechanisms/pow/mining/)
