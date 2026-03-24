---
title: "Gas und Gebühren"
metaTitle: "Ethereum-Gas und -Gebühren: technischer Überblick"
description: "Erfahren Sie mehr über Ethereum-Gasgebühren, wie sie berechnet werden und welche Rolle sie bei der Netzwerksicherheit und Transaktionsverarbeitung spielen."
lang: de
---

Gas ist für das [Ethereum](/)-Netzwerk unerlässlich. Es ist der Treibstoff, der den Betrieb ermöglicht, genau wie ein Auto Benzin zum Fahren braucht.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir Ihnen, sich zunächst über [Transaktionen](/developers/docs/transactions/) und die [EVM](/developers/docs/evm/) zu informieren.

## Was ist Gas? {#what-is-gas}

Gas bezeichnet die Einheit, die den Rechenaufwand misst, der zur Ausführung bestimmter Operationen im Ethereum-Netzwerk erforderlich ist.

Da jede Ethereum-Transaktion Rechenressourcen zur Ausführung benötigt, müssen diese Ressourcen bezahlt werden, um sicherzustellen, dass Ethereum nicht anfällig für Spam ist und nicht in endlosen Rechenschleifen stecken bleiben kann. Die Bezahlung für die Rechenleistung erfolgt in Form einer Gasgebühr.

Die Gasgebühr ist **die Menge an Gas, die für eine Operation verwendet wird, multipliziert mit den Kosten pro Gaseinheit**. Die Gebühr wird unabhängig davon gezahlt, ob eine Transaktion erfolgreich ist oder fehlschlägt.

![Ein Diagramm, das zeigt, wo Gas bei EVM-Operationen benötigt wird](./gas.png)
_Diagramm adaptiert von [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Gasgebühren müssen in der nativen Währung von Ethereum, Ether (ETH), bezahlt werden. Gaspreise werden normalerweise in Gwei angegeben, was eine Stückelung von ETH ist. Jeder Gwei entspricht einem Milliardstel eines ETH (0,000000001 ETH oder 10<sup>-9</sup> ETH).

Anstatt beispielsweise zu sagen, dass Ihr Gas 0,000000001 Ether kostet, können Sie sagen, dass Ihr Gas 1 Gwei kostet.

Das Wort „Gwei“ ist eine Zusammenziehung von „Giga-Wei“, was „Milliarde Wei“ bedeutet. Ein Gwei entspricht einer Milliarde Wei. Wei selbst (benannt nach [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), dem Schöpfer von [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) ist die kleinste Einheit von ETH.

## Wie werden Gasgebühren berechnet? {#how-are-gas-fees-calculated}

Sie können die Menge an Gas festlegen, die Sie zu zahlen bereit sind, wenn Sie eine Transaktion einreichen. Indem Sie eine bestimmte Menge an Gas anbieten, bieten Sie darauf, dass Ihre Transaktion in den nächsten Block aufgenommen wird. Wenn Sie zu wenig anbieten, ist es weniger wahrscheinlich, dass Validatoren Ihre Transaktion zur Aufnahme auswählen, was bedeutet, dass Ihre Transaktion möglicherweise spät oder gar nicht ausgeführt wird. Wenn Sie zu viel anbieten, verschwenden Sie möglicherweise etwas ETH. Wie können Sie also feststellen, wie viel Sie bezahlen müssen?

Das gesamte Gas, das Sie bezahlen, ist in zwei Komponenten unterteilt: die `Grundgebühr` und die `Prioritätsgebühr` (Trinkgeld).

Die `Grundgebühr` wird vom Protokoll festgelegt – Sie müssen mindestens diesen Betrag bezahlen, damit Ihre Transaktion als gültig angesehen wird. Die `Prioritätsgebühr` ist ein Trinkgeld, das Sie zur Grundgebühr hinzufügen, um Ihre Transaktion für Validatoren attraktiv zu machen, damit sie diese für die Aufnahme in den nächsten Block auswählen.

Eine Transaktion, die nur die `Grundgebühr` bezahlt, ist technisch gültig, wird aber wahrscheinlich nicht aufgenommen, da sie den Validatoren keinen Anreiz bietet, sie einer anderen Transaktion vorzuziehen. Die „richtige“ `Prioritätsgebühr` wird durch die Netzwerkauslastung zu dem Zeitpunkt bestimmt, an dem Sie Ihre Transaktion senden – wenn eine hohe Nachfrage besteht, müssen Sie Ihre `Prioritätsgebühr` möglicherweise höher ansetzen, aber bei geringerer Nachfrage können Sie weniger bezahlen.

Nehmen wir zum Beispiel an, Jordan muss Taylor 1 ETH zahlen. Eine ETH-Überweisung erfordert 21.000 Gaseinheiten und die Grundgebühr beträgt 10 Gwei. Jordan fügt ein Trinkgeld von 2 Gwei hinzu.

Die Gesamtgebühr würde nun wie folgt lauten:

`verwendete Gaseinheiten * (Grundgebühr + Prioritätsgebühr)`

wobei die `Grundgebühr` ein vom Protokoll festgelegter Wert ist und die `Prioritätsgebühr` ein vom Benutzer als Trinkgeld für den Validator festgelegter Wert ist.

z. B. `21.000 * (10 + 2) = 252.000 Gwei` (0,000252 ETH).

Wenn Jordan das Geld sendet, werden 1,000252 ETH von Jordans Konto abgezogen. Taylor werden 1,0000 ETH gutgeschrieben. Der Validator erhält das Trinkgeld von 0,000042 ETH. Die `Grundgebühr` von 0,00021 ETH wird verbrannt.

### Grundgebühr {#base-fee}

Jeder Block hat eine Grundgebühr, die als Mindestpreis fungiert. Um für die Aufnahme in einen Block in Frage zu kommen, muss der angebotene Preis pro Gas mindestens der Grundgebühr entsprechen. Die Grundgebühr wird unabhängig vom aktuellen Block berechnet und stattdessen durch die vorherigen Blöcke bestimmt, was Transaktionsgebühren für Benutzer vorhersehbarer macht. Wenn der Block erstellt wird, wird diese **Grundgebühr „verbrannt“**, wodurch sie aus dem Verkehr gezogen wird.

Die Grundgebühr wird durch eine Formel berechnet, die die Größe des vorherigen Blocks (die Menge an Gas, die für alle Transaktionen verwendet wurde) mit der Zielgröße (der Hälfte des Gaslimits) vergleicht. Die Grundgebühr erhöht oder verringert sich um maximal 12,5 % pro Block, wenn die Zielblockgröße über bzw. unter dem Zielwert liegt. Dieses exponentielle Wachstum macht es wirtschaftlich unrentabel, dass die Blockgröße auf unbestimmte Zeit hoch bleibt.

| Blocknummer | Enthaltenes Gas | Gebührenerhöhung | Aktuelle Grundgebühr |
| ----------- | --------------: | ---------------: | -------------------: |
| 1           |             18M |              0 % |             100 Gwei |
| 2           |             36M |              0 % |             100 Gwei |
| 3           |             36M |           12,5 % |           112,5 Gwei |
| 4           |             36M |           12,5 % |           126,6 Gwei |
| 5           |             36M |           12,5 % |           142,4 Gwei |
| 6           |             36M |           12,5 % |           160,2 Gwei |
| 7           |             36M |           12,5 % |           180,2 Gwei |
| 8           |             36M |           12,5 % |           202,7 Gwei |

In der obigen Tabelle wird ein Beispiel mit 36 Millionen als Gaslimit demonstriert. Diesem Beispiel folgend, wird ein Wallet dem Benutzer bei der Erstellung einer Transaktion in Blocknummer 9 mit Sicherheit mitteilen, dass die **maximale Grundgebühr**, die dem nächsten Block hinzugefügt wird, `aktuelle Grundgebühr * 112,5 %` oder `202,7 Gwei * 112,5 % = 228,1 Gwei` beträgt.

Es ist auch wichtig zu beachten, dass es unwahrscheinlich ist, dass wir längere Spitzen von vollen Blöcken sehen werden, da die Grundgebühr vor einem vollen Block sehr schnell ansteigt.

| Blocknummer | Enthaltenes Gas | Gebührenerhöhung | Aktuelle Grundgebühr |
| ----------- | --------------: | ---------------: | -------------------: |
| 30          |             36M |           12,5 % |          2705,6 Gwei |
| ...         |             ... |           12,5 % |                  ... |
| 50          |             36M |           12,5 % |         28531,3 Gwei |
| ...         |             ... |           12,5 % |                  ... |
| 100         |             36M |           12,5 % |      10302608,6 Gwei |

### Prioritätsgebühr (Trinkgelder) {#priority-fee}

Die Prioritätsgebühr (Trinkgeld) bietet Validatoren einen Anreiz, die Anzahl der Transaktionen in einem Block zu maximieren, was nur durch das Block-Gaslimit begrenzt ist. Ohne Trinkgelder könnte ein rationaler Validator weniger – oder sogar null – Transaktionen ohne direkte Strafe auf der Ausführungsebene oder Konsensebene aufnehmen, da Staking-Belohnungen unabhängig davon sind, wie viele Transaktionen sich in einem Block befinden. Darüber hinaus ermöglichen Trinkgelder den Benutzern, andere für die Priorität innerhalb desselben Blocks zu überbieten, was effektiv Dringlichkeit signalisiert. 

### Maximale Gebühr {#maxfee}

Um eine Transaktion im Netzwerk auszuführen, können Benutzer ein maximales Limit angeben, das sie für die Ausführung ihrer Transaktion zu zahlen bereit sind. Dieser optionale Parameter ist als `maxFeePerGas` bekannt. Damit eine Transaktion ausgeführt werden kann, muss die maximale Gebühr die Summe aus Grundgebühr und Trinkgeld überschreiten. Dem Absender der Transaktion wird die Differenz zwischen der maximalen Gebühr und der Summe aus Grundgebühr und Trinkgeld erstattet.

### Blockgröße {#block-size}

Jeder Block hat eine Zielgröße von der Hälfte des aktuellen Gaslimits, aber die Größe der Blöcke wird entsprechend der Netzwerknachfrage steigen oder fallen, bis das Blocklimit erreicht ist (2x die Zielblockgröße). Das Protokoll erreicht eine durchschnittliche Gleichgewichtsblockgröße am Zielwert durch den Prozess des _Tâtonnement_ (Herantasten). Das bedeutet, wenn die Blockgröße größer als die Zielblockgröße ist, erhöht das Protokoll die Grundgebühr für den folgenden Block. Ebenso verringert das Protokoll die Grundgebühr, wenn die Blockgröße kleiner als die Zielblockgröße ist.

Der Betrag, um den die Grundgebühr angepasst wird, ist proportional dazu, wie weit die aktuelle Blockgröße vom Zielwert entfernt ist. Dies ist eine lineare Berechnung von -12,5 % für einen leeren Block, 0 % bei der Zielgröße, bis zu +12,5 % für einen Block, der das Gaslimit erreicht. Das Gaslimit kann im Laufe der Zeit basierend auf der Signalisierung der Validatoren sowie durch Netzwerk-Upgrades schwanken. Sie können [die Änderungen des Gaslimits im Laufe der Zeit hier einsehen](https://eth.blockscout.com/stats/averageGasLimit?interval=threeMonths).

[Mehr über Blöcke](/developers/docs/blocks/)

### Berechnung von Gasgebühren in der Praxis {#calculating-fees-in-practice}

Sie können explizit angeben, wie viel Sie bereit sind zu zahlen, um Ihre Transaktion ausführen zu lassen. Die meisten Wallet-Anbieter legen jedoch automatisch eine empfohlene Transaktionsgebühr (Grundgebühr + empfohlene Prioritätsgebühr) fest, um die Komplexität für ihre Benutzer zu verringern.

## Warum gibt es Gasgebühren? {#why-do-gas-fees-exist}

Kurz gesagt, Gasgebühren tragen dazu bei, das Ethereum-Netzwerk sicher zu halten. Indem wir für jede im Netzwerk ausgeführte Berechnung eine Gebühr verlangen, verhindern wir, dass böswillige Akteure das Netzwerk mit Spam überfluten. Um versehentliche oder feindselige Endlosschleifen oder andere Rechenverschwendung im Code zu vermeiden, muss jede Transaktion ein Limit festlegen, wie viele Rechenschritte der Codeausführung sie verwenden darf. Die grundlegende Recheneinheit ist „Gas“.

Obwohl eine Transaktion ein Limit enthält, wird jegliches Gas, das in einer Transaktion nicht verwendet wird, an den Benutzer zurückgegeben (z. B. wird `maximale Gebühr - (Grundgebühr + Trinkgeld)` zurückgegeben).

![Diagramm, das zeigt, wie ungenutztes Gas erstattet wird](../transactions/gas-tx.png)
_Diagramm adaptiert von [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Was ist das Gaslimit? {#what-is-gas-limit}

Das Gaslimit bezieht sich auf die maximale Menge an Gas, die Sie für eine Transaktion verbrauchen möchten. Kompliziertere Transaktionen, die [Smart Contracts](/developers/docs/smart-contracts/) beinhalten, erfordern mehr Rechenarbeit, sodass sie ein höheres Gaslimit erfordern als eine einfache Zahlung. Eine Standard-ETH-Überweisung erfordert ein Gaslimit von 21.000 Gaseinheiten.

Wenn Sie beispielsweise ein Gaslimit von 50.000 für eine einfache ETH-Überweisung festlegen, würde die EVM 21.000 verbrauchen und Sie würden die restlichen 29.000 zurückerhalten. Wenn Sie jedoch zu wenig Gas angeben, beispielsweise ein Gaslimit von 20.000 für eine einfache ETH-Überweisung, schlägt die Transaktion während der Validierungsphase fehl. Sie wird abgelehnt, bevor sie in einen Block aufgenommen wird, und es wird kein Gas verbraucht. Wenn einer Transaktion hingegen während der Ausführung das Gas ausgeht (z. B. wenn ein Smart Contract auf halbem Weg das gesamte Gas verbraucht), macht die EVM alle Änderungen rückgängig, aber das gesamte bereitgestellte Gas wird dennoch für die geleistete Arbeit verbraucht.

## Warum können Gasgebühren so hoch werden? {#why-can-gas-fees-get-so-high}

Hohe Gasgebühren sind auf die Beliebtheit von Ethereum zurückzuführen. Wenn die Nachfrage zu groß ist, müssen Benutzer höhere Trinkgeldbeträge anbieten, um zu versuchen, die Transaktionen anderer Benutzer zu überbieten. Ein höheres Trinkgeld kann die Wahrscheinlichkeit erhöhen, dass Ihre Transaktion in den nächsten Block aufgenommen wird. Außerdem führen komplexere Smart-Contract-Apps möglicherweise viele Operationen aus, um ihre Funktionen zu unterstützen, wodurch sie viel Gas verbrauchen.

## Initiativen zur Senkung der Gaskosten {#initiatives-to-reduce-gas-costs}

Die Ethereum-[Skalierungs-Upgrades](/roadmap/) sollten letztendlich einige der Probleme mit den Gasgebühren beheben, was es der Plattform wiederum ermöglichen wird, Tausende von Transaktionen pro Sekunde zu verarbeiten und global zu skalieren.

Die Skalierung auf Ebene 2 ist eine primäre Initiative, um die Gaskosten, die Benutzererfahrung und die Skalierbarkeit erheblich zu verbessern.

[Mehr über die Skalierung auf Ebene 2](/developers/docs/scaling/#layer-2-scaling)

## Überwachung von Gasgebühren {#monitoring-gas-fees}

Wenn Sie die Gaspreise überwachen möchten, um Ihre ETH günstiger zu versenden, können Sie viele verschiedene Tools verwenden, wie zum Beispiel:

- [Etherscan](https://etherscan.io/gastracker) _Schätzer für Transaktionsgaspreise_
- [Blockscout](https://eth.blockscout.com/gas-tracker) _Open-Source-Schätzer für Transaktionsgaspreise_
- [ETH Gas Tracker](https://www.ethgastracker.com/) _Überwachen und verfolgen Sie die Ethereum- und L2-Gaspreise, um Transaktionsgebühren zu senken und Geld zu sparen_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Chrome-Erweiterung zur Gasschätzung, die sowohl ältere Typ-0-Transaktionen als auch Typ-2-EIP-1559-Transaktionen unterstützt._
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Berechnen Sie Gasgebühren in Ihrer lokalen Währung für verschiedene Transaktionstypen im Mainnet, auf Arbitrum und Polygon._

## Verwandte Tools {#related-tools}

- [Blocknative's Gas Platform](https://www.blocknative.com/gas) _Gasschätzungs-API, angetrieben von Blocknatives globaler Mempool-Datenplattform_
- [Gas Network](https://gas.network) Gas-Orakel auf der Blockchain. Unterstützung für über 35 Chains. 

## Weiterführende Literatur {#further-reading}

- [Ethereum Gas Explained](https://defiprime.com/gas)
- [Reducing the gas consumption of your Smart Contracts](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Gas Optimization Strategies for Developers](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [EIP-1559 docs](https://eips.ethereum.org/EIPS/eip-1559).
- [Tim Beiko's EIP-1559 Resources](https://hackmd.io/@timbeiko/1559-resources)
- [EIP-1559: Separating Mechanisms From Memes](https://web.archive.org/web/20241126205908/https://research.2077.xyz/eip-1559-separating-mechanisms-from-memes)