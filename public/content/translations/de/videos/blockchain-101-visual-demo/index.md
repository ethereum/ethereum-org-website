---
title: "Blockchain 101: Eine visuelle Demo"
description: "Eine Demonstration der Funktionsweise der Blockchain-Technologie, die Hashing, Blöcke, Chains, verteilte Hauptbücher (Distributed Ledgers) und Token abdeckt, um Blockchain-Konzepte greifbar und intuitiv zu machen."
lang: de
youtubeId: "_160oMzblY8"
uploadDate: 2016-11-13
duration: "0:17:49"
educationLevel: beginner
topic:
  - "blockchain"
  - "cryptography"
format: presentation
author: Anders Brownworth
breadcrumb: "Blockchain 101"
---

Anders Brownworths visuelle Demonstration der Funktionsweise der Blockchain-Technologie, einschließlich eines Durchgangs, der SHA-256-Hashing, Blöcke, Mining, Blockchains, verteilte Hauptbücher (Distributed Ledgers), Token und mehr abdeckt.

*Dieses Transkript ist eine barrierefreie Kopie des [ursprünglichen Video-Transkripts](https://www.youtube.com/watch?v=_160oMzblY8), das von Anders Brownworth veröffentlicht wurde. Es wurde zur besseren Lesbarkeit leicht bearbeitet.*

#### SHA-256-Hash (0:01) {#sha-256-hash-001}

Dies ist eine Blockchain-Demo. Wir werden dies auf eine sehr visuelle Weise tun – wir werden es sehr leicht verständlich machen, indem wir die wichtigsten Bestandteile dessen, was eine Blockchain ist, Schritt für Schritt durchgehen.

Bevor wir anfangen, müssen wir uns dieses Ding namens SHA-256-Hash ansehen. Ein Hash sieht aus wie ein Haufen zufälliger Zahlen, und im Grunde ist er ein Fingerabdruck von digitalen Daten. Zufälligerweise ist es ein Fingerabdruck von allem, was ich in dieses Feld eintippe. Wenn ich meinen Namen „Anders“ in dieses Feld eingebe, sehen Sie, dass sich der Hash geändert hat. Tatsächlich hat er sich jedes Mal geändert, wenn ich einen Buchstaben getippt habe.

Das ist also der Hash des Namens „Anders“, alles in Kleinbuchstaben – er beginnt mit `19ea`. Wenn ich das lösche und wieder „Anders“ eintippe, sehen Sie, dass er mit `19ea` beginnt – genau derselbe Hash. In diesem Sinne ist es ein digitaler Fingerabdruck dieser Daten. Welche Daten auch immer hier stehen, jedes Mal, wenn Sie genau dieselben Daten eingeben, erhalten Sie genau denselben Hash.

Ich kann alles Mögliche eintippen. Sie können auch gar nichts eingeben – `e3b0` – das ist der Hash von nichts. Oder Sie könnten Unmengen an Dingen eintippen. Tatsächlich könnten Sie die Library of Congress hier einfügen und würden einen Hash erhalten. Das Interessante daran ist, dass Sie unabhängig davon, ob es sich um eine winzige Menge an Informationen, gar keine Informationen oder die gesamte Library of Congress handelt, immer einen Hash erhalten, der genau so lang ist. Sie werden nicht im Voraus erraten können, wie dieser lautet – Sie müssen die Daten quasi eingeben, um herauszufinden, wie der Hash lautet, aber Sie werden immer genau denselben Hash erhalten, unabhängig davon, wie oft Sie genau dieselben Informationen eingeben.

#### Block (2:10) {#block-210}

Was ich nun tun werde, ist, diese Idee eines Hashes auf etwas auszuweiten, das wir einen Block nennen werden. Ein Block ist genau wie der Hash, aber der Datenbereich wurde in drei Abschnitte unterteilt: einer namens „Block“ – nur eine Zahl, dies ist Block Nummer 1 –, eine „Nonce“, was einfach eine weitere Zahl ist, und dann einige Daten, genau wie wir sie zuvor hatten.

Der Hash all dieser Informationen steht hier unten und beginnt mit vier Nullen. Das ist ein relativ ungewöhnlicher Hash – die meisten werden nicht so mit vier Nullen beginnen. Aber dieser tut es, und weil er das tut, werde ich völlig willkürlich sagen, dass dieser Block „signiert“ ist.

Was würde passieren, wenn ich irgendeinen Teil dieser Informationen ändern würde? Nehmen wir an, ich tippe hier etwas ein – der Hash wird sich ändern, und wie hoch ist die Wahrscheinlichkeit, dass er mit vier Nullen beginnt? Ziemlich gering. Ich sage einfach mal „hi“ – sehen Sie sich das an, dieser Hash beginnt nicht mit vier Nullen, und der Hintergrund ist rot geworden. Jetzt wissen Sie also, dass dieser Block mit diesen Informationen darin kein gültiger oder signierter Block ist.

Hier kommt die Nonce ins Spiel. Die Nonce ist einfach eine Zahl, die Sie festlegen können, um zu versuchen, einen Wert zu finden, der den Hash wieder mit vier Nullen beginnen lässt. Ich könnte den ganzen Tag hier sitzen und Zahlen eintippen, aber ich habe diesen kleinen „Mine“-Button. Wenn ich ihn drücke, passiert Folgendes: Er geht alle Zahlen ab 1 aufwärts durch, um eine zu finden, bei der der Hash mit vier Nullen beginnt. Dieser Prozess wird Mining genannt.

Er hat bei 59.396 angehalten – und diese Zahl ergibt zufällig einen Hash, der mit vier Nullen beginnt. Sie erfüllt meine Definition dessen, was ein signierter Block ist.

#### Blockchain (5:16) {#blockchain-516}

Können Sie mir also sagen, was eine Blockchain ist? Es ist wahrscheinlich einfach eine Chain aus diesen Blöcken. Hier ist meine Blockchain – Block Nummer eins hat eine Nonce genau wie zuvor, einen Datenbereich, aber dann hat er dieses „Previous“-Feld (Vorheriger), das aus einem Haufen Nullen besteht. Wenn wir weitergehen, ist dies Block zwei, Block drei, Block vier – diese Blockchain besteht aus fünf Blöcken.

Das „Previous“-Feld für jeden Block ist der Hash des vorherigen Blocks. Sie können sehen, dass jeder Block rückwärts auf den davor verweist. Dieser erste Block hat keinen Vorgänger, also ist es einfach ein Haufen Nullen.

Was passiert, wenn ich hier einige Informationen ändere? Es wird den Hash dieses Blocks ändern und ihn ungültig machen. Aber was ist, wenn ich etwas in einem früheren Block ändere? Es wird diesen Hash ändern, aber dieser Hash wird in das „Previous“-Feld des nächsten Blocks kopiert, also macht es beide Blöcke kaputt. Wir können beliebig weit zu einem Punkt in der Vergangenheit zurückgehen und diesen Block kaputt machen, und es wird alle Blöcke seitdem kaputt machen. Alles davor ist immer noch grün, aber alles danach wird rot.

Wenn ich hingehe und den letzten Block ändere, muss ich nur diesen einen Block neu minen. Wenn ich weit in der Zeit zurückgehe und eine Änderung vornehme, muss ich diesen minen, diesen, diesen und diesen. Je mehr Blöcke vergehen, desto schwieriger wird es, eine Änderung vorzunehmen. So widersteht eine Blockchain Mutationen – widersteht Veränderungen.

#### Verteilte Blockchain (9:18) {#distributed-blockchain-918}

Wie würde ich also wissen, ob meine Blockchain neu gemint wurde? Jetzt haben wir eine verteilte Blockchain. Sie sieht genau so aus wie die letzte Blockchain, aber dies ist Peer A. Wenn Sie hier nach unten gehen, können Sie Peer B sehen, und er hat eine exakte Kopie der Blockchain. Es gibt auch einen Peer C – das könnte ewig so weitergehen. Es gibt viele Peers im Internet, und sie alle haben eine vollständige Kopie der Blockchain.

Wenn ich mir diesen Hash ansehe, lautet er `e4b`. Wenn ich zum nächsten hinuntergehe, hat er ebenfalls `e4b`. Sie müssen identisch sein. Wenn ich nun hier hingehe und etwas eintippe, diesen Block neu mine und dann die nächsten Blöcke mine – sind alle Chains grün. Diese Chain sagt jedoch, dass der letzte Hash `e4b` ist, die untere sagt ebenfalls `e4b`, und diese mittlere sagt `4cae`.

Ich weiß also schon durch einen kurzen Blick auf diesen einen kleinen Hash, dass in dieser Blockchain etwas nicht stimmt. Obwohl alle Hashes mit vier Nullen beginnen, ist dieser anders. Es steht im Grunde zwei gegen eins – wir sind hier eine kleine Demokratie. Also gewinnt `e4b`. So ermöglicht es eine vollständig verteilte Kopie auf vielen verschiedenen Computern, schnell zu erkennen, ob alle Blöcke identisch sind.

Blockchains können sehr leicht 400.000 oder 500.000 Blöcke haben. Anstatt sie alle durchzugehen, müssen Sie sich eigentlich nur den Hash des aktuellsten ansehen, und Sie können erkennen, ob in der Vergangenheit etwas verändert wurde.

#### Token (12:17) {#tokens-1217}

Das ist die ganze Sache – mehr steckt nicht dahinter. Aber es ist irgendwie nicht wirklich nützlich, weil wir im Datenbereich nichts haben, das etwas bedeutet. Was wir wirklich wollen, ist ein Token.

Jetzt habe ich diese Token – völlig willkürlich nenne ich sie Dollar. Wir haben fünfundzwanzig Dollar von Darcy an Bingley, vier Dollar und siebenundzwanzig Cent von Elizabeth an Jane – Sie verstehen das Prinzip. Es finden all diese Transaktionen statt, und ich habe die Daten einfach durch diese Transaktionen ersetzt. Genau wie zuvor stellen wir fest, wenn wir nach unten gehen, dass wir all diese anderen Kopien derselben Blockchain haben.

Hier ist Unveränderlichkeit wichtig. Wenn ich hier hinten etwas ändere, wird der Hash anders sein als auf den anderen Kopien. Es ist sehr wichtig, dass wir es bemerken würden, wenn Sie in der Zeit zurückgehen und einen Wert ändern. Bei Geld ist es sehr wichtig, dass man nicht den Überblick verliert, und das ist der ganze Sinn der Nutzung einer Blockchain – sich jeglicher Art von Modifikationen an Dingen zu widersetzen, die in der Vergangenheit passiert sind.

Eine Sache möchte ich erwähnen: Wir listen nicht auf „Darcy hat hundert Dollar und er gibt 25 an Bingley“. Wir merken uns nur Geldbewegungen, keine Bankkontostände. Das wirft die Frage auf – hat Darcy 25 $?

#### Coinbase-Transaktion (14:34) {#coinbase-transaction-1434}

Wir haben ein Problem in dieser Version der Blockchain: Wir wissen eigentlich nicht, ob Darcy 25 $ hat. Schauen wir uns also eine Coinbase-Transaktion an. Wir fügen unseren Blöcken eine Coinbase-Transaktion hinzu – sie besagt, dass wir hundert Dollar aus dem Nichts erschaffen und sie Anders geben. Es gibt keine anderen Transaktionen in diesem Block, weil davor niemand Geld hatte.

Im nächsten Block kommen weitere hundert Dollar aus dem Nichts und gehen an Anders. Jetzt haben wir einige Transaktionen – sie sind alle von Anders, weil ich zu diesem Zeitpunkt der Einzige bin, der Geld hat. Ich sende zehn meiner Dollar an Sophie. Habe ich zehn Dollar? Ja – ich schaue zurück und sehe, dass die Coinbase-Transaktion mir hundert gegeben hat, also habe ich mindestens zehn.

Man rechnet all diese zusammen und sie überschreiten nicht hundert. Es folgt einer Grundregel für Währungen: Man kann Geld nicht aus dem Nichts erschaffen, und seine Verteilung wird kontrolliert.

Wenn wir in der Zeit vorspringen, sehen wir, dass Jackson Alexa zwei Dollar gibt. Hat Jackson tatsächlich zwei Dollar? Wir gehen einen Block zurück und sehen, dass Emily zehn Dollar von Anders bekommen und zehn an Jackson gegeben hatte. Jackson hat also das Geld. Wir können rückwärts gehen und das herausfinden – das ist einer der Vorteile des „Previous“-Feldes.

#### Abschluss (16:30) {#closing-1630}

Das ist eine grundlegende Blockchain, auf der eine Währung läuft. Wie Sie wissen, haben Blockchains viele Kopien – jeder hat eine Kopie. Wenn wir etwas mutieren und daraus sechs Dollar machen, werden die Blöcke ungültig und stimmen nicht mit den anderen Kopien überein. Dies widersteht Manipulationen, was genau das ist, was man für eine Währung möchte. Es funktioniert sehr gut für Dinge, die klein und transaktionsbezogen sind.

Blockchains sind ein sehr effizienter Weg, um eine Einigung darüber zu erzielen, was in der Vergangenheit passiert ist – diese unveränderliche Historie, die mit der Zeit wächst. Wir überspringen hier einige Hauptpunkte, aber wenn Sie sich in die Demo vertiefen, sich durch diese Dinge klicken und damit herumspielen, werden Sie eine immer bessere Vorstellung davon bekommen, wie das funktioniert.