---
title: "Wie funktionieren Ethereum-Abhebungen?"
description: "Wie Staking-Abhebungen auf Ethereum nach dem Shanghai/Capella-Upgrade funktionieren, einschließlich des technischen Prozesses, der Abhebungswarteschlange und was Staker über den Zugriff auf ihre gestakten ETH wissen müssen."
lang: de
youtubeId: "RwwU3P9n3uo"
uploadDate: 2023-03-30
duration: "0:11:39"
educationLevel: intermediate
topic:
  - "how-ethereum-works"
  - "staking"
  - "withdrawals"
format: explainer
author: Finematics
breadcrumb: "Staking-Abhebungen"
---

Ein Erklärvideo von **Finematics**, das behandelt, wie Staking-Abhebungen auf Ethereum nach dem Shanghai/Capella-Upgrade funktionieren, einschließlich der Mechanismen von teilweisen und vollständigen Abhebungen, häufigen Missverständnissen und den Auswirkungen auf das Staking-Ökosystem.

*Dieses Transkript ist eine barrierefreie Kopie des [originalen Video-Transkripts](https://www.youtube.com/watch?v=RwwU3P9n3uo), das von Finematics veröffentlicht wurde. Es wurde zur besseren Lesbarkeit leicht bearbeitet.*

#### Die Beacon Chain (0:31) {#the-beacon-chain-031}

Da das Shanghai/Capella-Upgrade schnell näher rückt, gibt es viele Diskussionen über Ethereum-Staking-Abhebungen und was dies für das gesamte Ethereum-Ökosystem bedeutet.

Beginnen wir damit zu verstehen, wie wir hierher gekommen sind und warum Staking-Abhebungen nicht aktiviert wurden, als Ethereum von Proof-of-Work (PoW) zu Proof-of-Stake (PoS) wechselte.

Der Übergang zu Proof-of-Stake (PoS) erfolgte in mehreren Schritten, um die Anzahl der großen Änderungen, die gleichzeitig stattfinden, zu minimieren. Dieser Ansatz war unerlässlich, insbesondere für ein etabliertes Netzwerk, das jährlich Werte in Billionenhöhe abwickelt. Die wichtigsten Schritte waren: der Start der Beacon Chain und der Merge.

Der Start der Beacon Chain im Jahr 2020 schuf die Grundlage für den Übergang, indem eine separate Proof-of-Stake-Konsensschicht geschaffen wurde, die parallel zur Ethereum-Proof-of-Work-Chain lief. Der frühere Start der Beacon Chain ermöglichte die Ansammlung von genügend ETH, um das Netzwerk zu sichern, bevor Transaktionen mit echtem Wert abgewickelt wurden. Es ermöglichte auch das Testen des neuen Proof-of-Stake-Konsensmodells über einen längeren Zeitraum mit echten Mitteln im Stake.

Die frühen Netzwerk-Teilnehmer haben Millionen von ETH eingesetzt, um das Ethereum-Proof-of-Stake-Netzwerk zu sichern, obwohl sie wussten, dass sie ihre ETH erst viel später abheben können würden.

Der nächste große Schritt, der Merge, vereinte die Proof-of-Stake-Konsensschicht mit der Ausführungsschicht. Dies ermöglichte es, sich endlich von Proof-of-Work zu verabschieden und nur eine kanonische Chain – Ethereum – beizubehalten, die nun durch Millionen von gestakten ETH gesichert ist. Der Merge war die mit Abstand größte Änderung, die jemals an Ethereum vorgenommen wurde. Aufgrund der Art des Upgrades musste es ohne Ausfallzeiten stattfinden.

Um das Risiko zu minimieren, wurde der Umfang des Merges reduziert, und es wurden keine anderen Funktionen – abgesehen vom Wechsel von Proof-of-Work zu Proof-of-Stake – in das Upgrade aufgenommen. Der größte „Einschnitt“, der vorgenommen werden musste, betraf die Abhebungen, die in den Fokus des kommenden Shanghai/Capella-Upgrades rückten.

#### Abhebungen (2:09) {#withdrawals-209}

Staking-Abhebungen werden es Stakern, wie der Name schon sagt, ermöglichen, ihre gesperrten ETH abzuheben. Es gibt zwei Arten von Abhebungen: „teilweise“ und „vollständige“.

Eine **teilweise Abhebung** findet statt, wenn der Validator seine angesammelten Belohnungen abhebt – das zusätzliche Guthaben über dem maximalen effektiven Guthaben von 32 ETH. Eine teilweise Abhebung kann auch als „Belohnungszahlung“ oder „Überschussguthabenzahlung“ bezeichnet werden.

Eine **vollständige Abhebung** findet statt, wenn der Validator den Prozess des Austritts abgeschlossen hat und das gesamte Guthaben abgehoben wird. Dies geschieht nur, wenn der Validator das System entweder freiwillig verlässt oder in einem Prozess namens „Slashing“ zwangsweise entfernt wird.

Sobald sie aktiviert sind, werden Staking-Abhebungen alle paar Tage automatisch verteilt. Darüber hinaus wird der Abhebungsprozess auf der Konsensschicht initiiert, sodass bei keinem der Schritte eine Transaktionsgebühr erforderlich ist.

Um mit der Abhebung ihrer Staking-Belohnungen zu beginnen, muss ein Validator seine Abhebungsadresse nur einmal angeben. Da Abhebungen sowohl die Konsensschicht als auch die Ausführungsschicht von Ethereum betreffen, müssen beide Teile des Netzwerks aktualisiert werden. „Shanghai“ ist der Name des Upgrades der Ausführungsschicht, das Abhebungen enthält, die in EIP-4895 spezifiziert sind. „Capella“ ist der Name des entsprechenden Upgrades der Konsensschicht, das zur gleichen Zeit aktiviert wird. Diese beiden Upgrades werden manchmal auch als „Shapella“ bezeichnet.

#### Mechanismen (3:40) {#mechanics-340}

Im Ethereum-Ökosystem hat jeder Validator eine entsprechende Index-Nummer. Darüber hinaus haben sie auch zwei Arten von Auszahlungsberechtigungen, die entweder als `0x00` oder `0x01` definiert sind.

`0x00` zeigt an, dass ein bestimmter Validator keine zugehörige Abhebungsadresse hat. Diese Auszahlungsberechtigungen werden als Hash des öffentlichen BLS-Schlüssels abgeleitet, wobei das erste Byte durch ein Null-Byte ausgetauscht wird – daher der Name.

`0x01` bedeutet, dass ein Validator seine Abhebungsadresse angegeben hat. Diese Auszahlungsberechtigungen werden als `0x01` dargestellt, gefolgt von 11 Bytes Nullen und dann einer gewählten Ethereum-Adresse.

Um Abhebungen zu aktivieren, müssen Validatoren mit `0x00`-Auszahlungsberechtigungen eine „BLSToExecutionChange“-Nachricht signieren. Dies wird nach dem Capella-Upgrade möglich sein.

Sobald Abhebungen aktiviert sind, wird ein Validator, der einen Block vorschlägt, linear durch die Validator-Indizes scannen, um die ersten 16 Validatoren mit `0x01`-Auszahlungsberechtigungen zu finden, die entweder:

- Ein Guthaben haben, das 32 ETH übersteigt (angesammelte Validator-Belohnungen)
- „Abhebbar“ sind (das Validator-Set vollständig durch einen Austritt verlassen haben)

Die lineare Suche stoppt, nachdem entweder 16 Validatoren gefunden wurden, die diese Kriterien erfüllen, oder nach 16.384 Iterationen. Der Algorithmus merkt sich den Index, bei dem die Suche gestoppt wurde, sodass der nächste Validator, der einen Block vorschlägt, bei diesem Index fortfahren kann. Nachdem der letzte Index erreicht wurde, beginnt der Algorithmus von vorne – bei Index 0.

Eine gute Analogie wäre eine analoge Uhr, bei der der Zeiger auf die Stunde zeigt, sich in eine Richtung bewegt, keine Stunden überspringt und schließlich wieder zum Anfang zurückkehrt, nachdem die letzte Zahl erreicht wurde.

Nachdem der Scan abgeschlossen ist, erstellt der Validator eine Liste von Abhebungen, die in seine Ausführungs-Payload aufgenommen werden sollen. Jeder Eintrag auf der Liste enthält:

- **WithdrawalIndex** – ein monoton steigender Index, beginnend bei 0, der sich pro Abhebung um 1 erhöht, um jede Abhebung eindeutig zu identifizieren
- **ValidatorIndex** – der Index des Validators, dessen Guthaben abgehoben wird
- **ExecutionAddress** – die ETH-Adresse auf der Ausführungsschicht, an die die Abhebung gesendet werden soll
- **Amount** – der Betrag in Gwei, der an die Ausführungsadresse gesendet werden soll

Beim Erstellen oder Verarbeiten eines Blocks wenden Clients der Ausführungsschicht diese Abhebungen am Ende eines Blocks an. Die Verarbeitung von Abhebungen konkurriert nicht mit Benutzer-Transaktionen um Blockplatz. Mit maximal 16 verarbeiteten Abhebungen pro Block sollten maximal 115.200 Abhebungen pro Tag verarbeitet werden, vorausgesetzt, es gibt keine verpassten Slots.

Das Design der Abhebungen ist einfach, aber extrem robust.

#### Missverständnisse (6:30) {#misconceptions-630}

Das erste Missverständnis besagt, dass es bei der Verarbeitung von Abhebungen einen Unterschied zwischen einer „vollständigen“ und einer „teilweisen“ Abhebung in Bezug auf Priorität oder Reihenfolge gibt. Sowohl vollständige als auch teilweise Abhebungen finden statt, wenn der lineare Scan über das Validator-Set den Index eines Validators erreicht. Der einzige Unterschied besteht darin, dass ein Validator im Falle von vollständigen Abhebungen die Austritts-Warteschlange verlassen und die „abhebbare Epoche“ erreichen muss, bevor der lineare Scan ihn erfassen kann.

Ein weiteres Missverständnis ist, dass Benutzer ihre Belohnungen verlieren, wenn sie keine Abhebungsadresse angeben. Das ist nicht wahr – falls ein Validator vergisst, eine Abhebungsadresse anzugeben, werden seine ETH-Belohnungen nicht ins Leere gesendet, sobald Abhebungen aktiviert sind. Stattdessen überspringt der Scan Validatoren, die ihre Abhebungsadressen nicht angegeben haben.

Es ist wichtig, sich daran zu erinnern, dass die Abhebungsadresse nicht geändert werden kann und nur einmal festgelegt wird. Staker müssen bei der Einrichtung der Abhebungsadresse äußerst vorsichtig sein und sicherstellen, dass sie das volle Eigentum an der angegebenen Adresse haben.

Es gibt auch Spekulationen, dass Staker viele ETH aus dem Ethereum-Ökosystem abheben werden, sobald Abhebungen aktiviert sind, wobei die stärkere Version dieses Arguments davon ausgeht, dass dies den Proof-of-Stake-Konsensmechanismus destabilisieren wird. Obwohl wir nicht vollständig vorhersagen können, wie viele ETH im Laufe der Zeit abgehoben werden, gibt es einige wichtige Gegenargumente:

Erstens sind die meisten Staker frühe Ethereum-Nutzer, die mutig genug waren zu staken, als noch ungewiss war, wann Abhebungen aktiviert werden würden. Viele Staker haben den Wunsch geäußert, weiterhin zu staken, um das Netzwerk zu unterstützen und weiterhin in ETH denominierte Belohnungen zu verdienen.

Zweitens hat Ethereum, um sicherzustellen, dass der Proof-of-Stake-Konsensmechanismus und das aktive Set von Validatoren stabil bleiben, eine Abhebungswarteschlange für alle Validatoren implementiert, die einen Austritt wünschen. Diese Warteschlange begrenzt die Anzahl der Validatoren, die das Ökosystem gleichzeitig verlassen können.

Der erste Abhebungs-Scan wird viele angesammelte Belohnungen abheben – im Grunde seit der Einführung der Beacon Chain. Die darauffolgenden werden jedoch eine viel geringere Menge an ETH verarbeiten.

#### Auswirkungen (8:39) {#implications-839}

Die Aktivierung von Abhebungen wird einen offenen, zweiseitigen Staking-Fluss schaffen. Derzeit ist der Staking-Fluss einseitig – ETH können nur in das Netzwerk fließen und es niemals verlassen. Interessanterweise könnte die Aktivierung von Abhebungen noch mehr Menschen dazu anregen zu staken, da sie wissen, dass sie ihre ETH jederzeit abheben können, wenn sie sie für etwas anderes benötigen.

Staker, die keine eigenen Validatoren betreiben und bei einem zentralisierten Staking-Anbieter staken, können ihren Anbieter wechseln. Sie können Gelder von einem Anbieter abheben, der eine niedrigere Staking-Rate anbietet, zu einem, der eine bessere Rate bietet, von einem zentralisierten Anbieter zu einem dezentralen wechseln oder sogar ihren eigenen Validator betreiben.

Abhebungen werden sich auch auf Liquid-Staking-Derivate wie Lido, Rocket Pool und andere auswirken. Liquid-Staking-Token (LST) wie stETH oder rETH haben in der Vergangenheit während Marktturbulenzen vorübergehend ihre Preisbindung an den Preis von ETH verloren. Mit dem zweiseitigen Staking-Fluss würde jedoch jede signifikante Diskrepanz in ihrer Preisbindung schnell durch Arbitrage ausgeglichen werden.

Frühe Anwender im Liquid Staking und zentralisierten Staking eroberten die große Mehrheit des Marktes, da sie nicht viel Konkurrenz hatten. Der Marktanteil dieser etablierten Akteure könnte sich jedoch stark verändern, sobald Abhebungen aktiviert sind, insbesondere wenn sie keine wettbewerbsfähige Rate anbieten. Die Möglichkeit, frei zwischen Staking-Anbietern zu wechseln, wird dem ETH-Staking-Markt zugutekommen.

#### Zusammenfassung (10:01) {#summary-1001}

Die Aktivierung von Staking-Abhebungen ist eines der am meisten erwarteten Upgrades für Ethereum. Es wird extrem wichtig sein, sicherzustellen, dass diese Änderung reibungslos durchgeführt wird. Um beim Testen zu helfen, werden Validatoren mehrere Devnets und Testnets zur Verfügung stehen, um den Prozess durchzugehen und mögliche Probleme auszuräumen, bevor sie im Mainnet live gehen.

Abhebungen sind eine weitere Verbesserung, die Ethereum einen Schritt weiter in Richtung des Aufbaus einer nachhaltigen, sicheren und dezentralen Zukunft bringt. Das Shapella-Upgrade wird voraussichtlich in der ersten Hälfte des Jahres 2023 stattfinden.

Zum Zeitpunkt dieses Videos hat die Beacon Chain über 17 Millionen ETH über mehr als 530.000 Validatoren angesammelt. Ein durchschnittliches Guthaben für einen Validator liegt knapp über 34 ETH, was über 1 Million ETH an angesammelten Belohnungen bedeutet. Es wird interessant sein zu sehen, wie sich Abhebungen auf diese Zahlen auswirken werden.