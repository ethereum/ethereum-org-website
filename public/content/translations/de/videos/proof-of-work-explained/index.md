---
title: "Was ist Proof-of-Work?"
description: "Eine anfängerfreundliche Erklärung des Konsensmechanismus Proof-of-Work (PoW), einschließlich der Art und Weise, wie Miner kryptografische Rätsel lösen, um Transaktionen zu validieren und das Blockchain-Netzwerk zu sichern."
lang: de
youtubeId: "3EUAcxhuoU4"
uploadDate: 2019-02-22
duration: "0:05:31"
educationLevel: beginner
topic:
  - "Konsens"
  - "pow"
format: explainer
author: Binance Academy
breadcrumb: "Proof-of-Work"
---

Eine Erklärung der **Binance Academy**, die den Konsensmechanismus Proof-of-Work (PoW) behandelt, einschließlich seiner Ursprünge, wie Miner im Wettbewerb kryptografische Rätsel lösen und wie er das Blockchain-Netzwerk sichert.

*Dieses Transkript ist eine barrierefreie Kopie des [originalen Video-Transkripts](https://www.youtube.com/watch?v=3EUAcxhuoU4), das von der Binance Academy veröffentlicht wurde. Es wurde zur besseren Lesbarkeit leicht bearbeitet.*

#### Ursprünge von Proof-of-Work (0:00) {#origins-of-proof-of-work-000}

Das Konzept des Proof-of-Work stammt ursprünglich aus dem Jahr 1993 und wurde entwickelt, um Denial-of-Service-Angriffe und anderen Dienstmissbrauch wie Spam in einem Netzwerk zu verhindern, indem vom Dienstnutzer eine gewisse Arbeitsleistung verlangt wird – was in der Regel Rechenzeit eines Computers bedeutet.

Im Jahr 2009 führte Bitcoin eine innovative Methode ein, Proof-of-Work als Konsensalgorithmus zu nutzen, um Transaktionen zu validieren und neue Blöcke an die Blockchain zu übertragen. Seitdem hat er sich zu einem weit verbreiteten Konsensalgorithmus in vielen Kryptowährungen entwickelt.

#### Wie Proof-of-Work funktioniert (0:33) {#how-proof-of-work-works-033}

Kurz gesagt, Miner in einem Netzwerk treten gegeneinander an, um komplexe Rechenrätsel zu lösen. Diese Rätsel sind schwer zu lösen, aber leicht zu verifizieren, sobald jemand die richtige Lösung gefunden hat.

Sobald ein Miner die Lösung für das Rätsel gefunden hat, kann er den Block an das Netzwerk übertragen, wo alle anderen Miner überprüfen, ob die Lösung korrekt ist.

#### Beispiel für Bitcoin-Mining (0:56) {#bitcoin-mining-example-056}

Bitcoin ist ein Blockchain-basiertes System, das durch die kollektive Arbeit dezentraler Knoten aufrechterhalten wird. Einige dieser Knoten sind als Miner bekannt und dafür verantwortlich, der Blockchain neue Blöcke hinzuzufügen.

Um dies zu tun, müssen Miner versuchen, eine pseudozufällige Zahl, die als Nonce bekannt ist, zu erraten. Diese Zahl muss, wenn sie mit den im Block bereitgestellten Daten kombiniert und durch eine Hashfunktion geleitet wird, ein Ergebnis liefern, das bestimmten Bedingungen entspricht – zum Beispiel ein Hash, der mit vier Nullen beginnt.

Wenn ein passendes Ergebnis gefunden wird, überprüfen die anderen Knoten die Gültigkeit des Ergebnisses, und der Miner-Knoten wird mit der Blockbelohnung belohnt. Daher ist es unmöglich, der Haupt-Chain einen neuen Block hinzuzufügen, ohne vorher eine gültige Nonce zu finden, die wiederum die Lösung für diesen spezifischen Block generiert – den sogenannten Block-Hash.

#### Warum es „Proof-of-Work“ genannt wird (1:46) {#why-its-called-proof-of-work-146}

Jeder validierte Block enthält einen Block-Hash, der die vom Miner geleistete Arbeit darstellt. Deshalb wird es Proof-of-Work genannt.

#### Sicherheitsvorteile (1:54) {#security-benefits-154}

Proof-of-Work hilft, das Netzwerk vor zahlreichen verschiedenen Angriffen zu schützen. Ein erfolgreicher Angriff würde viel Rechenleistung und viel Zeit für die Berechnungen erfordern. Daher wäre er ineffizient, da die anfallenden Kosten höher wären als die potenziellen Belohnungen für den Angriff auf das Netzwerk.

#### Einschränkungen (2:10) {#limitations-210}

Ein Problem bei Proof-of-Work ist, dass das Mining teure Computerhardware erfordert, die eine große Menge an Strom verbraucht. Während die komplizierten Algorithmusberechnungen die Sicherheit des Netzwerks garantieren, können diese Berechnungen darüber hinaus nicht anderweitig genutzt werden.

#### Ausblick (2:25) {#looking-ahead-225}

Obwohl Proof-of-Work vielleicht nicht die effizienteste Lösung ist, bleibt es eine der beliebtesten Methoden, um in Blockchains einen Konsens zu erzielen. Es gibt bereits alternative Methoden und Ansätze, die versuchen, diese Probleme zu lösen, aber nur die Zeit wird zeigen, welche Methode der Nachfolger von Proof-of-Work sein wird.