---
title: Gas und Gebühren
metaTitle: "Ethereum Gas und Gebühren: Technische Übersicht"
description: Informieren Sie sich über die Ethereum Gasgebühren, wie sie berechnet werden und welche Rolle sie für die Netzwerksicherheit und Transaktionsverarbeitung spielen.
lang: de
---

Gas ist für das Ethereum-Netzwerk unerlässlich. Es ist der Treibstoff, der Ethereum den Betrieb ermöglicht, so wie ein Auto Benzin braucht, um zu fahren.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir Ihnen, sich zunächst über [Transaktionen](/developers/docs/transactions/) und die [EVM](/developers/docs/evm/) zu informieren.

## Was ist Sprit? {#what-is-gas}

Gas bezieht sich auf die Einheit, die den Umfang des Rechenaufwands misst, der für die Durchführung spezifischer Operationen im Ethereum-Netzwerk erforderlich ist.

Da jede Transaktion im Ethereum-Netzwerk den Einsatz von Rechenressourcen erfordert, um zur Ausführung zu gelangen, ist für diese Ressourcen eine Vergütung erforderlich. Das dient der Sicherstellung, dass das Ethereum-Netzwerk weder für Spam-Attacken anfällig ist, noch in Zustände unendlicher Rechenzyklen verfallen kann. Die Bezahlung für Berechnungen erfolgt in Form einer Gasgebühr.

Die Gasgebühr ist **die Menge des für einen Vorgang verbrauchten Gases multipliziert mit den Kosten pro Gaseinheit**. Die Gebühr wird unabhängig davon gezahlt, ob eine Transaktion erfolgreich ist oder nicht.

![Ein Diagramm, das zeigt, wo Gas bei EVM-Operationen benötigt wird](./gas.png)
_Diagramm adaptiert von [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Gasgebühren sind in der originären Währung von Ethereum, Ether (ETH), zu entrichten. Die Gaspreise werden in der Regel in Gwei angegeben, einer Untereinheit von ETH. Jede Gwei entspricht einem Milliardstel einer ETH (0,000000001 ETH oder 10<sup>-9</sup> ETH).

Anstatt z. B. zu sagen, dass dein Gas 0,000000001 Ether kostet, kannst du sagen, dass dein Gas 1 Gwei kostet.

Das Wort "gwei" ist eine Kurzform von "giga-wei", was "Milliarde wei" bedeutet. Ein gwei entspricht einer Milliarde wei. Wei selbst (benannt nach [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), dem Schöpfer von [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) ist die kleinste Einheit von ETH.

## Wie werden die Gasgebühren berechnet? {#how-are-gas-fees-calculated}

Sie können die Menge an Gas, die Sie zu zahlen bereit sind, festlegen, wenn Sie eine Transaktion einreichen. Durch das Angebot einer festgelegten Gasmenge beteiligen Sie sich an einer Auktion zur Einbeziehung Ihrer Transaktion in den nächsten Block. Bei einem zu niedrigen Gasangebot verringert sich die Wahrscheinlichkeit, dass Validierer Ihre Transaktion für die Einbindung in den nächsten Block auswählen, was zu einer verzögerten oder sogar nicht erfolgenden Ausführung Ihrer Transaktion führen kann. Wenn Sie zu viel bieten, könnten Sie ETH verschwenden. Wie können Sie also feststellen, wie viel Sie zahlen müssen?

Der Gesamtbetrag, den Sie zahlen, wird in zwei Komponenten aufgeteilt: die `Grundgebühr` und die `Prioritätsgebühr` (Trinkgeld).

Die `Grundgebühr` wird vom Protokoll festgelegt – Sie müssen mindestens diesen Betrag bezahlen, damit Ihre Transaktion als gültig angesehen wird. Die `Prioritätsgebühr` ist ein Trinkgeld, das Sie zur Grundgebühr hinzufügen, um Ihre Transaktion für Validatoren attraktiv zu machen, sodass sie diese für die Aufnahme in den nächsten Block auswählen.

Eine Transaktion, für die nur die `Grundgebühr` gezahlt wird, ist zwar technisch gesehen gültig, wird aber wahrscheinlich nicht berücksichtigt, da sie den Validatoren keinen Anreiz bietet, sie einer anderen Transaktion vorzuziehen. Die 'richtige' `Prioritätsgebühr` wird durch die Netzwerkauslastung zum Zeitpunkt des Sendens Ihrer Transaktion bestimmt – bei hoher Nachfrage müssen Sie Ihre `Prioritätsgebühr` möglicherweise höher ansetzen, aber bei geringerer Nachfrage können Sie weniger bezahlen.

Nehmen wir zum Beispiel an, Jordan muss Taylor 1 ETH bezahlen. Ein ETH-Transfer erfordert 21.000 Gaseinheiten, und die Grundgebühr beträgt 10 gwei. Jordan enthält ein Trinkgeld von 2 gwei.

Die Gesamtgebühr würde sich nun wie folgt zusammensetzen:

`Verbrauchte Gaseinheiten * (Grundgebühr + Prioritätsgebühr)`

wobei die `Grundgebühr` ein vom Protokoll festgelegter Wert ist und die `Prioritätsgebühr` ein vom Benutzer als Trinkgeld an den Validator festgelegter Wert ist.

z. B. `21.000 * (10 + 2) = 252.000 Gwei` (0,000252 ETH).

Wenn Jordan das Geld versendet, werden 1,000252 ETH von Jordans Konto abgezogen. Taylor werden 1,0000 ETH gutgeschrieben. Der Validator erhält das Trinkgeld von 0,000042 ETH. Die `Grundgebühr` von 0,00021 ETH wird verbrannt.

### Grundgebühr {#base-fee}

Jeder Block hat seine eigene Basisgebühr, welche als reservierter Preis erscheint. Um in einen Block aufgenommen zu werden, muss der angebotene Preis pro Gas mindestens der Grundgebühr entsprechen. Die Grundgebühr wird unabhängig vom aktuellen Block berechnet und stattdessen durch die vorherigen Blöcke bestimmt, was die Transaktionsgebühren für Benutzer berechenbarer macht. Wenn der Block erstellt wird, wird diese **Grundgebühr „verbrannt“** und damit aus dem Umlauf genommen.

Die Grundgebühr wird durch eine Formel berechnet, die die Größe des vorherigen Blocks (die für alle Transaktionen verwendete Gasmenge) mit der Zielgröße (die Hälfte des Gaslimits) vergleicht. Die Grundgebühr wird um maximal 12,5 % pro Block steigen oder fallen, wenn die Zielblockgröße über bzw. unter dem Zielwert liegt. Dieses exponentielle Wachstum macht es wirtschaftlich unrentabel, die Blockgröße unbegrenzt hoch zu halten.

| Blocknummer |         Enthaltenes Gas | Gebührenerhöhung | Aktuelle Grundgebühr |
| ----------- | ----------------------: | ---------------: | -------------------: |
| 1           | 18 Mio. |              0 % |             100 gwei |
| 2           | 36 Mio. |              0 % |             100 gwei |
| 3           | 36 Mio. |           12,5 % |           112,5 gwei |
| 4           | 36 Mio. |           12,5 % |           126,6 gwei |
| 5           | 36 Mio. |           12,5 % |           142,4 gwei |
| 6           | 36 Mio. |           12,5 % |           160,2 gwei |
| 7           | 36 Mio. |           12,5 % |           180,2 gwei |
| 8           | 36 Mio. |           12,5 % |           202,7 gwei |

In der obigen Tabelle wird ein Beispiel mit 36 Millionen als Gaslimit demonstriert. Folgt man diesem Beispiel, wird eine Wallet dem Benutzer beim Erstellen einer Transaktion in Block Nummer 9 mit Sicherheit mitteilen, dass die **maximale Grundgebühr**, die dem nächsten Block hinzugefügt wird, `aktuelle Grundgebühr * 112,5 %` oder `202,7 Gwei * 112,5 % = 228,1 Gwei` beträgt.

Außerdem ist es unwahrscheinlich, dass es zu längeren Zeiträumen mit vollen Blöcken kommt, da die Grundgebühr vor einem vollen Block schnell ansteigt.

| Blocknummer                                         |                                     Enthaltenes Gas | Gebührenerhöhung |                                Aktuelle Grundgebühr |
| --------------------------------------------------- | --------------------------------------------------: | ---------------: | --------------------------------------------------: |
| 30                                                  |                             36 Mio. |           12,5 % |                                         2705,6 gwei |
| ... | ... |           12,5 % | ... |
| 50                                                  |                             36 Mio. |           12,5 % |                                        28531,3 gwei |
| ... | ... |           12,5 % | ... |
| 100                                                 |                             36 Mio. |           12,5 % |                                     10302608,6 gwei |

### Prioritätsgebühr (Trinkgelder) {#priority-fee}

Die Prioritätsgebühr (das Trinkgeld) gibt Validatoren einen Anreiz, die Anzahl der Transaktionen in einem Block zu maximieren, die nur durch das Blockgaslimit begrenzt ist. Ohne Trinkgelder könnte ein rationaler Validator weniger – oder sogar gar keine – Transaktionen aufnehmen, ohne eine direkte Strafe auf der Ausführungsebene oder der Konsens-Ebene zu erhalten, da die Staking-Belohnungen unabhängig davon sind, wie viele Transaktionen sich in einem Block befinden. Zudem ermöglichen es Trinkgelder den Benutzern, andere für eine Priorität innerhalb desselben Blocks zu überbieten, was effektiv Dringlichkeit signalisiert.

### Maximale Gebühr {#maxfee}

Um eine Transaktion im Netzwerk auszuführen, können Nutzer/Nutzerinnen ein maximales Limit angeben, das sie bereit sind, für die Ausführung ihrer Transaktion zu bezahlen. Dieser optionale Parameter wird als `maxFeePerGas` bezeichnet. Damit eine Transaktion ausgeführt werden kann, muss die maximale Gebühr die Summe aus der Grundgebühr und dem Trinkgeld übersteigen. Der Absender der Transaktion erhält die Differenz zwischen der maximalen Gebühr und der Summe aus Grundgebühr und Trinkgeld zurück.

### Blockgröße {#block-size}

Jeder Block hat eine Zielgröße, die der Hälfte des aktuellen Gaslimits entspricht, aber die Größe der Blöcke wird entsprechend der Netzwerknachfrage zu- oder abnehmen, bis das Blocklimit erreicht ist (2x die Zielblockgröße). Das Protokoll erreicht eine durchschnittliche Gleichgewichts-Blockgröße am Zielwert durch den Prozess des _Tâtonnement_. Das heißt, wenn die Blockgröße die Zielblockgröße übersteigt, erhöht das Protokoll die Grundgebühr für den folgenden Block. Ebenso senkt das Protokoll die Grundgebühr, wenn die Blockgröße kleiner als die Zielblockgröße ist.

Der Betrag, um den die Grundgebühr angepasst wird, ist proportional dazu, wie weit die aktuelle Blockgröße vom Zielwert entfernt ist. Dies ist eine lineare Berechnung von -12,5 % für einen leeren Block, 0 % bei der Zielgröße, bis zu +12,5 % für einen Block, der das Gaslimit erreicht. Das Gaslimit kann im Laufe der Zeit auf der Grundlage von Signalen der Validatoren sowie durch Netzwerk-Upgrades schwanken. Sie können die Änderungen des Gaslimits im Laufe der Zeit [hier einsehen](https://eth.blockscout.com/stats/averageGasLimit?interval=threeMonths).

[Mehr über Blöcke](/developers/docs/blocks/)

### Berechnung der Gasgebühren in der Praxis {#calculating-fees-in-practice}

Sie können ausdrücklich angeben, wie viel Sie bereit sind zu zahlen, damit Ihre Transaktion ausgeführt wird. Die meisten Anbieter von Wallets legen jedoch automatisch eine empfohlene Transaktionsgebühr fest (Grundgebühr + empfohlene Prioritätsgebühr), um die Komplexität für die Nutzer zu verringern.

## Warum gibt es Gasgebühren? {#why-do-gas-fees-exist}

Kurzum, Gasgebühren helfen dabei, das Ethereum-Netz sicher zu halten. Indem wir für jede Berechnung, die im Netzwerk ausgeführt wird, eine Gebühr verlangen, verhindern wir, dass Akteure mit böswilligen Absichten das Netzwerk spammen. Um versehentliche oder feindliche Endlosschleifen oder andere Verschwendung von Rechenlast in Code zu vermeiden, muss jede Transaktion eine Grenze für die Anzahl der Rechenschritte festlegen, die sie zur Codeausführung verwenden kann. Die Grundeinheit der Berechnung ist "Gas".

Obwohl eine Transaktion ein Limit enthält, wird jedes nicht in einer Transaktion verbrauchte Gas an den Nutzer zurückgegeben (z. B. wird `maximale Gebühr - (Grundgebühr + Trinkgeld)` zurückgegeben).

![Diagramm, das zeigt, wie ungenutztes Gas zurückerstattet wird](../transactions/gas-tx.png)
_Diagramm adaptiert von [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Was ist das Gaslimit? {#what-is-gas-limit}

Das Gaslimit bezieht sich auf die maximale Menge an Gas, die Sie bereit sind, bei einer Transaktion zu verbrauchen. Kompliziertere Transaktionen, die [Smart Contracts](/developers/docs/smart-contracts/) beinhalten, erfordern mehr Rechenarbeit, weshalb sie ein höheres Gaslimit als eine einfache Zahlung benötigen. Ein Standard-ETH-Transfer erfordert ein Gaslimit von 21.000 Gaseinheiten.

Wenn Sie zum Beispiel ein Gaslimit von 50.000 für einen einfachen ETH-Transfer festlegen würden, würde die EVM 21.000 verbrauchen und Sie würden die restlichen 29.000 zurückbekommen. Wenn Sie jedoch zu wenig Gas angeben, zum Beispiel ein Gaslimit von 20.000 für eine einfache ETH-Überweisung, wird die Transaktion während der Validierungsphase fehlschlagen. Sie wird abgelehnt, bevor sie in einen Block aufgenommen wird, und es wird kein Gas verbraucht. Andererseits, wenn eine Transaktion während der Ausführung kein Gas mehr hat (z. B. ein Smart Contract verbraucht auf halber Strecke all das Gas), wird die EVM alle Änderungen rückgängig machen, aber dennoch wird all das bereitgestellte Gas für die geleistete Arbeit verbraucht sein.

## Warum können die Gasgebühren so hoch sein? {#why-can-gas-fees-get-so-high}

Die hohen Gasgebühren sind auf die Beliebtheit von Ethereum zurückzuführen. Wenn die Nachfrage zu groß ist, müssen die Nutzer höhere Trinkgeldbeträge anbieten, um darüber zu versuchen, die Transaktionen anderer Nutzer zu überbieten. Ein höheres Trinkgeld kann die Wahrscheinlichkeit erhöhen, dass Ihre Transaktion in den nächsten Block gelangt. Außerdem führen komplexere Smart-Contract-Anwendungen möglicherweise eine hohle Anzahl an Operationen durch, um ihre Funktionen zu unterstützen, so dass sie viel Gas verbrauchen.

## Initiativen zur Senkung der Gaskosten {#initiatives-to-reduce-gas-costs}

Die Ethereum-[Skalierbarkeits-Upgrades](/roadmap/) sollten letztendlich einige der Probleme mit den Gasgebühren lösen, was es der Plattform wiederum ermöglichen wird, Tausende von Transaktionen pro Sekunde zu verarbeiten und global zu skalieren.

Die Skalierung auf Layer 2 ist eine der wichtigsten Initiativen, um die Gaskosten, das Nutzererlebnis und die Skalierbarkeit deutlich zu verbessern.

[Mehr zur Layer-2-Skalierung](/developers/docs/scaling/#layer-2-scaling)

## Überwachung der Gasgebühren {#monitoring-gas-fees}

Wenn Sie die Gaspreise überwachen möchten, damit Sie Ihre ETH günstiger verschicken können, stehen Ihnen unterschiedliche Tools zur Verfügung, wie zum Beispiel:

- [Etherscan](https://etherscan.io/gastracker) _Schätzung des Transaktions-Gaspreises_
- [Blockscout](https://eth.blockscout.com/gas-tracker) _Open-Source-Schätzung des Transaktions-Gaspreises_
- [ETH Gas Tracker](https://www.ethgastracker.com/) _Überwachen und verfolgen Sie die Gaspreise von Ethereum und L2, um Transaktionsgebühren zu senken und Geld zu sparen_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Chrome-Erweiterung zur Gasschätzung, die sowohl Legacy-Transaktionen vom Typ 0 als auch EIP-1559-Transaktionen vom Typ 2 unterstützt._
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Berechnen Sie Gasgebühren in Ihrer Landeswährung für verschiedene Transaktionsarten auf Mainnet, Arbitrum und Polygon._

## Zugehörige Werkzeuge {#related-tools}

- [Blocknative's Gas Platform](https://www.blocknative.com/gas) _API zur Gasschätzung, betrieben von Blocknatives globaler Mempool-Datenplattform_
- [Gas Network](https://gas.network) On-Chain-Gas-Orakel. Unterstützung für über 35 Chains.

## Weiterführende Lektüre {#further-reading}

- [Ethereum Gas erklärt](https://defiprime.com/gas)
- [Reduzierung des Gasverbrauchs Ihrer Smart Contracts](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Strategien zur Gasoptimierung für Entwickler](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [EIP-1559-Dokumentation](https://eips.ethereum.org/EIPS/eip-1559).
- [Tim Beikos EIP-1559-Ressourcen](https://hackmd.io/@timbeiko/1559-resources)
- [EIP-1559: Mechanismen von Memes trennen](https://web.archive.org/web/20241126205908/https://research.2077.xyz/eip-1559-separating-mechanisms-from-memes)
