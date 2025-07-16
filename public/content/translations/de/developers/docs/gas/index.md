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

Da jede Transaktion im Ethereum-Netzwerk den Einsatz von Rechenressourcen erfordert, um zur Ausführung zu gelangen, ist für diese Ressourcen eine Vergütung erforderlich. Das dient der Sicherstellung, dass das Ethereum-Netzwerk weder für Spam-Attacken anfällig ist, noch in Zustände unendlicher Rechenzyklen verfallen kann. Die Bezahlung für Berechnungen erfolgt in Form einer Gasgebühr.

Die Gasgebühr entspricht **dem Volumen des verbrauchten Gases für eine spezifische Transaktion multipliziert mit dem Preis je Gaseinheit**. Die Gebühr wird unabhängig davon gezahlt, ob eine Transaktion erfolgreich ist oder nicht.

![Ein Diagramm, das zeigt, wo Gas im EVM-Betrieb benötigt wird](./gas.png) _Diagramm angepasst von [Ethereum EVM illustriert](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Gasgebühren sind in der originären Währung von Ethereum, Ether (ETH), zu entrichten. Die Gaspreise werden in der Regel in Gwei angegeben, einer Untereinheit von ETH. Jede Gwei entspricht einem Milliardstel einer ETH (0,000000001 ETH oder 10<sup>-9</sup> ETH).

Anstatt z. B. zu sagen, dass dein Gas 0,000000001 Ether kostet, kannst du sagen, dass dein Gas 1 Gwei kostet.

Das Wort "gwei" ist eine Kurzform von "giga-wei", was "Milliarde wei" bedeutet. Ein gwei entspricht einer Milliarde wei. Wei selbst (benannt nach [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), dem Erfinder von [B-Geld](https://www.investopedia.com/terms/b/bmoney.asp)) ist die kleinste Einheit von ETH.

## Wie werden die Gasgebühren berechnet? {#how-are-gas-fees-calculated}

Sie können die Menge an Gas, die Sie zu zahlen bereit sind, festlegen, wenn Sie eine Transaktion einreichen. Durch das Angebot einer festgelegten Gasmenge beteiligen Sie sich an einer Auktion zur Einbeziehung Ihrer Transaktion in den nächsten Block. Bei einem zu niedrigen Gasangebot verringert sich die Wahrscheinlichkeit, dass Validierer Ihre Transaktion für die Einbindung in den nächsten Block auswählen, was zu einer verzögerten oder sogar nicht erfolgenden Ausführung Ihrer Transaktion führen kann. Wenn Sie zu viel bieten, könnten Sie ETH verschwenden. Wie können Sie also feststellen, wie viel Sie zahlen müssen?

Der Gesamtbetrag, den Sie zahlen, wird in zwei Komponenten aufgeteilt: die `Grundgebühr `und die `Prioritätsgebühr` (Trinkgeld).

Die `Grundgebühr` wird durch das Protokoll festgelegt - Sie müssen mindestens diesen Betrag zahlen, damit Ihre Transaktion als gültig betrachtet wird. Die `Prioritätsgebühr` ist ein Trinkgeld, das Sie auf die Grundgebühr aufschlagen, um Ihre Transaktion für die Validierer attraktiv zu machen, so dass diese sie für die Aufnahme in den nächsten Block auswählen.

Eine Transaktion, für die nur die `Grundgebühr` gezahlt wird, ist zwar technisch gesehen gültig, wird aber wahrscheinlich nicht berücksichtigt, da sie den Validierern keinen Anreiz bietet, sie einer anderen Transaktion vorzuziehen. Die "richtige" `Prioritätsgebühr` wird durch die Netzwerkauslastung zu dem Zeitpunkt bestimmt, an dem Sie Ihre Transaktion senden. Wenn es viel Nachfrage gibt, müssen Sie Ihre `Prioritätsgebühr` möglicherweise höher ansetzen, aber wenn es weniger Nachfrage gibt, können Sie weniger bezahlen.

Nehmen wir zum Beispiel an, Jordan muss Taylor 1 ETH bezahlen. Ein ETH-Transfer erfordert 21.000 Gaseinheiten, und die Grundgebühr beträgt 10 gwei. Jordan enthält ein Trinkgeld von 2 gwei.

Die Gesamtgebühr würde sich nun wie folgt zusammensetzen:

`Verbrauchte Gaseinheiten * (Grundgebühr + Prioritätsgebühr)`

wobei die `Grundgebühr` ein durch das Protokoll bestimmter Wert und die `Prioritätsgebühr` ein vom Benutzer gesetzter Wert als Anreiz für den Validierer ist.

z.B. `21,000 * (10 + 2) = 252,000 gwei` (0.000252 ETH).

Wenn Jordan das Geld versendet, werden 1,000252 ETH von Jordans Konto abgezogen. Taylor werden 1,0000 ETH gutgeschrieben. Der Validator erhält das Trinkgeld von 0,000042 ETH. Die `Grundgebühr` von 0,00021 ETH wird verbrannt.

### Grundgebühr {#base-fee}

Jeder Block hat seine eigene Basisgebühr, welche als reservierter Preis erscheint. Um in einen Block aufgenommen zu werden, muss der angebotene Preis pro Gas mindestens der Grundgebühr entsprechen. Die Grundgebühr wird unabhängig vom aktuellen Block berechnet und richtet sich stattdessen nach den vorherigen Blöcken. Das macht die Transaktionsgebühren für die Nutzer/Nutzerinnen berechenbarer. Bei der Erstellung des Blocks wird diese **Grundgebühr "verbrannt"** und damit aus dem Verkehr gezogen.

Die Grundgebühr wird anhand einer Formel berechnet, die die Größe des vorherigen Blocks (die für alle Transaktionen verwendete Gasmenge) mit der Zielgröße vergleicht. Die Grundgebühr erhöht sich um maximal 12,5 % pro Block, wenn die Zielblockgröße überschritten wird. Dieses exponentielle Wachstum macht es wirtschaftlich unrentabel, die Blockgröße unbegrenzt hoch zu halten.

| Blocknummer | Enthaltenes Gas | Gebührenerhöhung | Aktuelle Grundgebühr |
| ----------- | ---------------:| ----------------:| --------------------:|
| 1           |            15 m |              0 % |             100 gwei |
| 2           |            30 m |              0 % |             100 gwei |
| 3           |            30 m |           12,5 % |           112,5 gwei |
| 4           |            30 m |           12,5 % |           126,6 gwei |
| 5           |            30 m |           12,5 % |           142,4 gwei |
| 6           |            30 m |           12,5 % |           160,2 gwei |
| 7           |            30 m |           12,5 % |           180,2 gwei |
| 8           |            30 m |           12,5 % |           202,7 gwei |

Der obigen Tabelle folgend: Um eine Transaktion auf Block Nummer 9 zu erstellen, wird eine Wallet den Nutzer mit Sicherheit wissen lassen, dass die **maximale Grundgebühr**, die dem nächsten Block hinzugefügt wird, `aktuelle Grundgebühr * 112,5%` oder `202,7 gwei * 112,5% = 228,1 gwei` ist.

Außerdem ist es unwahrscheinlich, dass es zu längeren Zeiträumen mit vollen Blöcken kommt, da die Grundgebühr vor einem vollen Block schnell ansteigt.

| Blocknummer | Enthaltenes Gas | Gebührenerhöhung | Aktuelle Grundgebühr |
| ----------- | ---------------:| ----------------:| --------------------:|
| 30          |            30 m |           12,5 % |          2705,6 gwei |
| ...         |             ... |           12,5 % |                  ... |
| 50          |            30 m |           12,5 % |         28531,3 gwei |
| ...         |             ... |           12,5 % |                  ... |
| 100         |            30 m |           12,5 % |      10302608,6 gwei |

### Prioritätsgebühr (Trinkgeld) {#priority-fee}

Die Prioritätsgebühr (Trinkgeld) bietet den Validierern einen Anreiz, eine Transaktion in den Block aufzunehmen. Ohne Trinkgeld wäre es für Validierer wirtschaftlich rentabel, leere Blöcke zu schürfen, da sie die gleiche Blockbelohnung erhalten würden. Kleine Trinkgelder geben den Validierern einen minimalen Anreiz, eine Transaktion aufzunehmen. Damit Transaktionen vor anderen Transaktionen im selben Block bevorzugt ausgeführt werden, kann ein höheres Trinkgeld hinzugefügt werden, um zu versuchen, konkurrierende Transaktionen zu überbieten.

### Maximale Gebühr {#maxfee}

Um eine Transaktion im Netzwerk auszuführen, können Nutzer/Nutzerinnen ein maximales Limit angeben, das sie bereit sind, für die Ausführung ihrer Transaktion zu bezahlen. Dieser optionale Parameter ist als `maxFeePerGas` bekannt. Damit eine Transaktion ausgeführt werden kann, muss die maximale Gebühr die Summe aus der Grundgebühr und dem Trinkgeld übersteigen. Der Absender der Transaktion erhält die Differenz zwischen der maximalen Gebühr und der Summe aus Grundgebühr und Trinkgeld zurück.

### Blockgröße {#block-size}

Jeder Block hat eine Zielgröße von 15 Millionen Gas, aber die Größe der Blöcke wird entsprechend der Netznachfrage erhöht oder verringert, bis zur Blockgrenze von 30 Millionen Gas (die zweifache Zielblockgröße). Das Protokoll erreicht durch den Prozess des _Tâtonnement_ eine gleichgewichtige Blockgröße von durchschnittlich 15 Millionen. Das heißt, wenn die Blockgröße die Zielblockgröße übersteigt, erhöht das Protokoll die Grundgebühr für den folgenden Block. Ebenso senkt das Protokoll die Grundgebühr, wenn die Blockgröße kleiner als die Zielblockgröße ist. Der Betrag, um den die Grundgebühr angepasst wird, ist proportional dazu, wie weit die aktuelle Blockgröße vom Zielwert entfernt ist. [Mehr über Blöcke](/developers/docs/blocks/).

### Berechnung der Gasgebühren in der Praxis {#calculating-fees-in-practice}

Sie können ausdrücklich angeben, wie viel Sie bereit sind zu zahlen, damit Ihre Transaktion ausgeführt wird. Die meisten Anbieter von Wallets legen jedoch automatisch eine empfohlene Transaktionsgebühr fest (Grundgebühr + empfohlene Prioritätsgebühr), um die Komplexität für die Nutzer zu verringern.

## Warum gibt es Gasgebühren? {#why-do-gas-fees-exist}

Kurzum, Gasgebühren helfen dabei, das Ethereum-Netz sicher zu halten. Indem wir für jede Berechnung, die im Netzwerk ausgeführt wird, eine Gebühr verlangen, verhindern wir, dass Akteure mit böswilligen Absichten das Netzwerk spammen. Um versehentliche oder feindliche Endlosschleifen oder andere Verschwendung von Rechenlast in Code zu vermeiden, muss jede Transaktion eine Grenze für die Anzahl der Rechenschritte festlegen, die sie zur Codeausführung verwenden kann. Die Grundeinheit der Berechnung ist "Gas".

Auch wenn eine Transaktion ein Limit beinhaltet, wird jedes nicht verbrauchte Gas an den Nutzer zurückgegeben (d. h. `max fee - (base fee + tip)` wird zurückgegeben).

![Diagramm zeigt, wie ungenutztes Gas zurückerstattet wird](../transactions/gas-tx.png) _Diagramm angepasst von [Ethereum EVM illustriert](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Was ist das Gaslimit? {#what-is-gas-limit}

Das Gaslimit bezieht sich auf die maximale Menge an Gas, die Sie bereit sind, bei einer Transaktion zu verbrauchen. Kompliziertere Transaktionen mit [Smart Contracts](/developers/docs/smart-contracts/) erfordern mehr Rechenarbeit und damit ein höheres Gaslimit als eine einfache Zahlung. Ein Standard-ETH-Transfer erfordert ein Gaslimit von 21.000 Gaseinheiten.

Wenn Sie zum Beispiel ein Gaslimit von 50.000 für einen einfachen ETH-Transfer festlegen würden, würde die EVM 21.000 verbrauchen und Sie würden die restlichen 29.000 zurückbekommen. Wenn Sie jedoch zu wenig Gas angeben, z. B. ein Gaslimit von 20.000 für einen einfachen ETH-Transfer, wird die EVM Ihre 20.000 Gaseinheiten verbrauchen und versuchen, die Transaktion durchzuführen, aber sie wird nicht abgeschlossen. Die EVM macht dann alle Änderungen rückgängig, da der Validierer jedoch bereits Arbeit im Wert von 20.000 Gaseinheiten geleistet hat, ist dieses Gas verbraucht.

## Warum können die Gasgebühren so hoch sein? {#why-can-gas-fees-get-so-high}

Die hohen Gasgebühren sind auf die Beliebtheit von Ethereum zurückzuführen. Wenn die Nachfrage zu groß ist, müssen die Nutzer höhere Trinkgeldbeträge anbieten, um darüber zu versuchen, die Transaktionen anderer Nutzer zu überbieten. Ein höheres Trinkgeld kann die Wahrscheinlichkeit erhöhen, dass Ihre Transaktion in den nächsten Block gelangt. Außerdem führen komplexere Smart-Contract-Anwendungen möglicherweise eine hohle Anzahl an Operationen durch, um ihre Funktionen zu unterstützen, so dass sie viel Gas verbrauchen.

## Initiativen zur Senkung der Gaskosten {#initiatives-to-reduce-gas-costs}

Die [Skalierbarkeits-Upgrades](/roadmap/) für Ethereum waren letztendlich dazu gedacht, einige der Probleme mit den Gasgebühren lösen. Das wiederum soll die Plattform in die Lage versetzen, Tausende von Transaktionen pro Sekunde zu verarbeiten und global zu skalieren.

Die Skalierung auf Layer 2 ist eine der wichtigsten Initiativen, um die Gaskosten, das Nutzererlebnis und die Skalierbarkeit deutlich zu verbessern. [Mehr zur Skalierung mit Layer 2](/developers/docs/scaling/#layer-2-scaling)

## Gasgebühren überwachen {#monitoring-gas-fees}

Wenn Sie die Gaspreise überwachen möchten, damit Sie Ihre ETH günstiger verschicken können, stehen Ihnen unterschiedliche Tools zur Verfügung, wie zum Beispiel:

- [Etherscan](https://etherscan.io/gastracker) _Transaktionsgaspreis-Schätzer_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Chrome-Erweiterung zur Gasschätzung, die sowohl Typ 0 Legacy-Transaktionen als auch Typ 2 EIP-1559-Transaktionen unterstützt_
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Berechnen Sie Gasgebühren in Ihrer lokalen Währung für verschiedene Transaktionsarten im Mainnet, Arbitrum und Polygon._

## Verwandte Werkzeuge {#related-tools}

- [Blocknative's Gas Platform](https://www.blocknative.com/gas) _API zur Gasschätzung von Blocknative's Global Mempool Data Platform_

## Weiterführende Informationen {#further-reading}

- [Ethereum Gas erklärt](https://defiprime.com/gas)
- [Den Gasverbrauch von Smart Contracts reduzieren](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Proof-of-Stake und Proof-of-Work im Vergleich](https://blockgeeks.com/guides/proof-of-work-vs-proof-of-stake/)
- [Strategien für Programmierer zur Optimierung des Gasverbrauchs](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [Spezifikationen zu EIP-1559](https://eips.ethereum.org/EIPS/eip-1559).
- [Tim Beikos EIP-1559-Ressourcen](https://hackmd.io/@timbeiko/1559-resources).
