---
title: Gas und Gebühren
metaTitle: "Ethereum-Gas und -Gebühren: technischer Überblick"
description: Erfahre mehr über Ethereum-Gasgebühren, wie sie berechnet werden und welche Rolle sie bei der Netzwerksicherheit und Transaktionsverarbeitung spielen.
lang: de
---

Gas ist für das [Ethereum](/)-Netzwerk unerlässlich. Es ist der Treibstoff, der den Betrieb ermöglicht, ähnlich wie ein Auto Benzin zum Fahren benötigt.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir dir, dich zunächst über [Transaktionen](/developers/docs/transactions/) und die [EVM](/developers/docs/evm/) zu informieren.

## Was ist Gas? {#what-is-gas}

Gas bezeichnet die Einheit, die den Rechenaufwand misst, der zur Ausführung bestimmter Operationen im Ethereum-Netzwerk erforderlich ist.

Da jede Ethereum-Transaktion zur Ausführung Rechenressourcen benötigt, müssen diese Ressourcen bezahlt werden, um sicherzustellen, dass Ethereum nicht anfällig für Spam ist und nicht in Endlosschleifen stecken bleiben kann. Die Bezahlung für die Rechenleistung erfolgt in Form einer Gasgebühr.

Die Gasgebühr ist **die Menge an Gas, die für eine Operation verbraucht wird, multipliziert mit den Kosten pro Gaseinheit**. Die Gebühr wird unabhängig davon gezahlt, ob eine Transaktion erfolgreich ist oder fehlschlägt.

![A diagram showing where gas is needed in EVM operations](./gas.png)
_Diagramm adaptiert von [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Gasgebühren müssen in Ethereums nativer Währung, Ether (ETH), bezahlt werden. Gaspreise werden normalerweise in Gwei angegeben, was eine Stückelung von ETH ist. Ein Gwei entspricht einem Milliardstel ETH (0,000000001 ETH oder 10<sup>-9</sup> ETH).

Anstatt beispielsweise zu sagen, dass dein Gas 0,000000001 Ether kostet, kannst du sagen, dass dein Gas 1 Gwei kostet.

Das Wort „Gwei“ ist eine Zusammenziehung von „Giga-Wei“, was „Milliarde Wei“ bedeutet. Ein Gwei entspricht einer Milliarde Wei. Wei selbst (benannt nach [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), dem Schöpfer von [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) ist die kleinste Einheit von ETH.

## Wie werden Gasgebühren berechnet? {#how-are-gas-fees-calculated}

Du kannst die Menge an Gas festlegen, die du zu zahlen bereit bist, wenn du eine Transaktion einreichst. Indem du eine bestimmte Menge an Gas anbietest, bietest du darauf, dass deine Transaktion in den nächsten Block aufgenommen wird. Wenn du zu wenig anbietest, ist es weniger wahrscheinlich, dass Validatoren deine Transaktion zur Aufnahme auswählen, was bedeutet, dass deine Transaktion möglicherweise spät oder gar nicht ausgeführt wird. Wenn du zu viel anbietest, verschwendest du möglicherweise ETH. Wie kannst du also wissen, wie viel du bezahlen musst?

Das gesamte Gas, das du bezahlst, ist in zwei Komponenten unterteilt: die `base fee` und die `priority fee` (Prioritätsgebühr).

Die `base fee` wird vom Protokoll festgelegt – du musst mindestens diesen Betrag bezahlen, damit deine Transaktion als gültig angesehen wird. Die `priority fee` ist eine Prioritätsgebühr, die du zur Grundgebühr hinzufügst, um deine Transaktion für Validatoren attraktiv zu machen, damit sie diese für die Aufnahme in den nächsten Block auswählen.

Eine Transaktion, die nur die `base fee` bezahlt, ist technisch gültig, wird aber wahrscheinlich nicht aufgenommen, da sie den Validatoren keinen Anreiz bietet, sie einer anderen Transaktion vorzuziehen. Die „richtige“ `priority`-Gebühr wird durch die Netzwerkauslastung zu dem Zeitpunkt bestimmt, an dem du deine Transaktion sendest – wenn die Nachfrage hoch ist, musst du deine `priority`-Gebühr möglicherweise höher ansetzen, aber wenn die Nachfrage geringer ist, kannst du weniger bezahlen.

Nehmen wir zum Beispiel an, Jordan muss Taylor 1 ETH bezahlen. Ein ETH-Transfer erfordert 21.000 Gaseinheiten und die Grundgebühr beträgt 10 Gwei. Jordan fügt eine Prioritätsgebühr von 2 Gwei hinzu.

Die Gesamtgebühr würde nun wie folgt berechnet:

`units of gas used * (base fee + priority fee)`

wobei die `base fee` ein vom Protokoll festgelegter Wert ist und die `priority fee` ein vom Benutzer als Prioritätsgebühr für den Validator festgelegter Wert ist.

z. B. `21,000 * (10 + 2) = 252,000 gwei` (0,000252 ETH).

Wenn Jordan das Geld sendet, werden 1,000252 ETH von Jordans Konto abgezogen. Taylor werden 1,0000 ETH gutgeschrieben. Der Validator erhält die Prioritätsgebühr von 0,000042 ETH. Die `base fee` von 0,00021 ETH wird verbrannt.

### Grundgebühr {#base-fee}

Jeder Block hat eine Grundgebühr, die als Mindestpreis fungiert. Um für die Aufnahme in einen Block in Frage zu kommen, muss der angebotene Preis pro Gas mindestens der Grundgebühr entsprechen. Die Grundgebühr wird unabhängig vom aktuellen Block berechnet und stattdessen durch die vorherigen Blöcke bestimmt, was Transaktionsgebühren für Benutzer vorhersehbarer macht. Wenn der Block erstellt wird, wird diese **Grundgebühr „verbrannt“**, wodurch sie aus dem Verkehr gezogen wird.

Die Grundgebühr wird durch eine Formel berechnet, die die Größe des vorherigen Blocks (die Menge an Gas, die für alle Transaktionen verbraucht wurde) mit der Zielgröße (der Hälfte des Gaslimits) vergleicht. Die Grundgebühr steigt oder sinkt um maximal 12,5 % pro Block, wenn die Zielblockgröße über bzw. unter dem Zielwert liegt. Dieses exponentielle Wachstum macht es wirtschaftlich unrentabel, dass die Blockgröße auf unbestimmte Zeit hoch bleibt.

| Blocknummer | Enthaltenes Gas | Gebührenerhöhung | Aktuelle Grundgebühr |
| ------------ | -----------: | -----------: | ---------------: |
| 1            |          18M |           0 % |         100 Gwei |
| 2            |          36M |           0 % |         100 Gwei |
| 3            |          36M |        12,5 % |       112,5 Gwei |
| 4            |          36M |        12,5 % |       126,6 Gwei |
| 5            |          36M |        12,5 % |       142,4 Gwei |
| 6            |          36M |        12,5 % |       160,2 Gwei |
| 7            |          36M |        12,5 % |       180,2 Gwei |
| 8            |          36M |        12,5 % |       202,7 Gwei |

In der obigen Tabelle wird ein Beispiel mit 36 Millionen als Gaslimit demonstriert. Diesem Beispiel folgend wird eine Wallet dem Benutzer bei der Erstellung einer Transaktion in Blocknummer 9 mit Sicherheit mitteilen, dass die **maximale Grundgebühr**, die dem nächsten Block hinzugefügt wird, `current base fee * 112.5%` oder `202.7 gwei * 112.5% = 228.1 gwei` beträgt.

Es ist auch wichtig zu beachten, dass es unwahrscheinlich ist, dass wir längere Spitzen von vollen Blöcken sehen werden, da die Grundgebühr im Vorfeld eines vollen Blocks sehr schnell ansteigt.

| Blocknummer | Enthaltenes Gas | Gebührenerhöhung | Aktuelle Grundgebühr |
| ------------ | -----------: | -----------: | ---------------: |
| 30           |          36M |        12,5 % |      2705,6 Gwei |
| ...          |          ... |        12,5 % |              ... |
| 50           |          36M |        12,5 % |     28531,3 Gwei |
| ...          |          ... |        12,5 % |              ... |
| 100          |          36M |        12,5 % |  10302608,6 Gwei |

### Prioritätsgebühr {#priority-fee}

Die Prioritätsgebühr bietet Validatoren einen Anreiz, die Anzahl der Transaktionen in einem Block zu maximieren, was nur durch das Block-Gaslimit begrenzt ist. Ohne Prioritätsgebühren könnte ein rationaler Validator weniger – oder sogar null – Transaktionen ohne direkte Strafe auf der Ausführungsschicht oder Konsensschicht aufnehmen, da Staking-Belohnungen unabhängig davon sind, wie viele Transaktionen sich in einem Block befinden. Darüber hinaus ermöglichen Prioritätsgebühren den Benutzern, andere für die Priorität innerhalb desselben Blocks zu überbieten, was effektiv Dringlichkeit signalisiert. 

### Maximalgebühr {#maxfee}

Um eine Transaktion im Netzwerk auszuführen, können Benutzer ein maximales Limit angeben, das sie für die Ausführung ihrer Transaktion zu zahlen bereit sind. Dieser optionale Parameter ist als `maxFeePerGas` bekannt. Damit eine Transaktion ausgeführt werden kann, muss die Maximalgebühr die Summe aus Grundgebühr und Prioritätsgebühr übersteigen. Dem Absender der Transaktion wird die Differenz zwischen der Maximalgebühr und der Summe aus Grundgebühr und Prioritätsgebühr erstattet.

### Blockgröße {#block-size}

Jeder Block hat eine Zielgröße von der Hälfte des aktuellen Gaslimits, aber die Größe der Blöcke wird entsprechend der Netzwerknachfrage steigen oder sinken, bis das Blocklimit erreicht ist (2x die Zielblockgröße). Das Protokoll erreicht durch den Prozess des _Tâtonnement_ (Herantasten) eine durchschnittliche Gleichgewichtsblockgröße beim Zielwert. Das bedeutet, wenn die Blockgröße größer als die Zielblockgröße ist, erhöht das Protokoll die Grundgebühr für den folgenden Block. Ebenso verringert das Protokoll die Grundgebühr, wenn die Blockgröße kleiner als die Zielblockgröße ist.

Der Betrag, um den die Grundgebühr angepasst wird, ist proportional dazu, wie weit die aktuelle Blockgröße vom Zielwert entfernt ist. Dies ist eine lineare Berechnung von -12,5 % für einen leeren Block, 0 % bei der Zielgröße bis zu +12,5 % für einen Block, der das Gaslimit erreicht. Das Gaslimit kann im Laufe der Zeit basierend auf der Signalisierung der Validatoren sowie durch Netzwerk-Upgrades schwanken. Du kannst [die Änderungen des Gaslimits im Laufe der Zeit hier einsehen](https://eth.blockscout.com/stats/averageGasLimit?interval=threeMonths).

[Mehr zu Blöcken](/developers/docs/blocks/)

### Berechnung von Gasgebühren in der Praxis {#calculating-fees-in-practice}

Du kannst explizit angeben, wie viel du bereit bist zu zahlen, um deine Transaktion ausführen zu lassen. Die meisten Wallet-Anbieter legen jedoch automatisch eine empfohlene Transaktionsgebühr (Grundgebühr + empfohlene Prioritätsgebühr) fest, um die Komplexität für ihre Benutzer zu verringern.

## Warum gibt es Gasgebühren? {#why-do-gas-fees-exist}

Kurz gesagt, Gasgebühren tragen dazu bei, das Ethereum-Netzwerk sicher zu halten. Indem wir für jede im Netzwerk ausgeführte Berechnung eine Gebühr verlangen, verhindern wir, dass böswillige Akteure das Netzwerk mit Spam überfluten. Um versehentliche oder feindselige Endlosschleifen oder andere Rechenverschwendung im Code zu vermeiden, muss jede Transaktion ein Limit dafür festlegen, wie viele Rechenschritte der Codeausführung sie verwenden darf. Die grundlegende Recheneinheit ist „Gas“.

Obwohl eine Transaktion ein Limit enthält, wird jegliches Gas, das in einer Transaktion nicht verbraucht wird, an den Benutzer zurückgegeben (z. B. wird `max fee - (base fee + tip)` zurückgegeben).

![Diagram showing how unused gas is refunded](../transactions/gas-tx.png)
_Diagramm adaptiert von [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Was ist das Gaslimit? {#what-is-gas-limit}

Das Gaslimit bezieht sich auf die maximale Menge an Gas, die du bei einer Transaktion verbrauchen möchtest. Kompliziertere Transaktionen, die [Smart Contracts](/developers/docs/smart-contracts/) beinhalten, erfordern mehr Rechenarbeit, weshalb sie ein höheres Gaslimit benötigen als eine einfache Zahlung. Ein Standard-ETH-Transfer erfordert ein Gaslimit von 21.000 Gaseinheiten.

Wenn du beispielsweise ein Gaslimit von 50.000 für einen einfachen ETH-Transfer festlegst, würde die EVM 21.000 verbrauchen und du würdest die restlichen 29.000 zurückerhalten. Wenn du jedoch zu wenig Gas angibst, beispielsweise ein Gaslimit von 20.000 für einen einfachen ETH-Transfer, schlägt die Transaktion während der Validierungsphase fehl. Sie wird abgelehnt, bevor sie in einen Block aufgenommen wird, und es wird kein Gas verbraucht. Wenn einer Transaktion hingegen während der Ausführung das Gas ausgeht (z. B. wenn ein Smart Contract auf halbem Weg das gesamte Gas verbraucht), wird die EVM alle Änderungen rückgängig machen, aber das gesamte bereitgestellte Gas wird dennoch für die geleistete Arbeit verbraucht.

## Warum können Gasgebühren so hoch werden? {#why-can-gas-fees-get-so-high}

Hohe Gasgebühren sind auf die Beliebtheit von Ethereum zurückzuführen. Wenn die Nachfrage zu groß ist, müssen Benutzer höhere Prioritätsgebühren anbieten, um zu versuchen, die Transaktionen anderer Benutzer zu überbieten. Eine höhere Prioritätsgebühr kann die Wahrscheinlichkeit erhöhen, dass deine Transaktion in den nächsten Block aufgenommen wird. Außerdem führen komplexere Smart-Contract-Apps möglicherweise viele Operationen aus, um ihre Funktionen zu unterstützen, wodurch sie viel Gas verbrauchen.

## Initiativen zur Senkung der Gaskosten {#initiatives-to-reduce-gas-costs}

Die [Skalierbarkeits-Upgrades](/roadmap/) von Ethereum sollten letztendlich einige der Probleme mit den Gasgebühren beheben, was es der Plattform wiederum ermöglichen wird, Tausende von Transaktionen pro Sekunde zu verarbeiten und global zu skalieren.

Die Skalierung über Layer 2 (L2) ist eine Hauptinitiative, um Gaskosten, Benutzererfahrung und Skalierbarkeit erheblich zu verbessern.

[Mehr zur Layer-2-Skalierung](/developers/docs/scaling/#layer-2-scaling)

## Überwachung von Gasgebühren {#monitoring-gas-fees}

Wenn du die Gaspreise überwachen möchtest, um deine ETH günstiger zu versenden, kannst du viele verschiedene Tools verwenden, wie zum Beispiel:

- [Etherscan](https://etherscan.io/gastracker) _Schätzer für Transaktionsgaspreise_
- [Blockscout](https://eth.blockscout.com/gas-tracker) _Open-Source-Schätzer für Transaktionsgaspreise_
- [ETH Gas Tracker](https://www.ethgastracker.com/) _Überwache und verfolge die Gaspreise von Ethereum und L2, um Transaktionsgebühren zu senken und Geld zu sparen_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Chrome-Erweiterung zur Gasschätzung, die sowohl ältere Typ-0-Transaktionen als auch Typ-2-EIP-1559-Transaktionen unterstützt._
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Berechne Gasgebühren in deiner lokalen Währung für verschiedene Transaktionstypen auf dem Mainnet, Arbitrum und Polygon._

## Verwandte Tools {#related-tools}

- [Blocknatives Gas-Plattform](https://www.blocknative.com/gas) _API zur Gasschätzung, angetrieben von Blocknatives globaler Mempool-Datenplattform_
- [Gas Network](https://gas.network) Onchain-Gas-Orakel. Unterstützung für über 35 Chains. 

## Weiterführende Literatur {#further-reading}

- [Ethereum-Gas erklärt](https://defiprime.com/gas)
- [Reduzierung des Gasverbrauchs deiner Smart Contracts](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Gasoptimierungsstrategien für Entwickler](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [EIP-1559-Dokumentation](https://eips.ethereum.org/EIPS/eip-1559).
- [Tim Beikos EIP-1559-Ressourcen](https://hackmd.io/@timbeiko/1559-resources)
- [EIP-1559: Separating Mechanisms From Memes](https://web.archive.org/web/20241126205908/https://research.2077.xyz/eip-1559-separating-mechanisms-from-memes)