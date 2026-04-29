---
title: "Kryptoökonomie: Autoritätsnachweis"
description: "Eine Vorlesung zur Kryptoökonomie, die den Konsensmechanismus Autoritätsnachweis (PoA) erklärt und behandelt, wie er funktioniert, welche Kompromisse er im Vergleich zu Proof-of-Work und Proof-of-Stake eingeht und wo er in der Praxis eingesetzt wird."
lang: de
youtubeId: "Mj10HSEM5_8"
uploadDate: 2018-10-19
duration: "0:09:18"
educationLevel: intermediate
topic:
  - "Konsens"
  - "Autoritätsnachweis"
format: presentation
author: Cryptoeconomics Study
breadcrumb: "Autoritätsnachweis"
---

Eine Vorlesung zur Kryptoökonomie von **Cryptoeconomics Study**, die den Konsensmechanismus Autoritätsnachweis (PoA) erklärt, einschließlich der Frage, wie eine zentrale Autorität die Reihenfolge der Transaktionen bestimmt, welche Probleme mit Doppelausgaben und Zensur dadurch entstehen und wie der Ansatz der Mehrfachsignatur zur Schadensbegrenzung aussieht.

*Dieses Transkript ist eine barrierefreie Kopie des [ursprünglichen Video-Transkripts](https://www.youtube.com/watch?v=Mj10HSEM5_8), das von Cryptoeconomics Study veröffentlicht wurde. Es wurde zur besseren Lesbarkeit leicht bearbeitet.*

#### Wie der Autoritätsnachweis funktioniert (0:00) {#how-proof-of-authority-works-000}

Willkommen zu Abschnitt 2.4 – Autoritätsnachweis (PoA) –, in dem wir diese zentrale Autorität wieder einsetzen, um die Reihenfolge der Transaktionen zu bestimmen und dieses lästige kleine Problem der Doppelausgabe zu lösen.

Es war einmal eine zentrale Autorität, die jeder irgendwie mochte. Alle genehmigten diese großartige Autorität und sagten: „Warum hören wir nicht einfach auf sie? Wir hatten diese Probleme und sind uns nicht über den korrekten Zustand einig, also lassen wir sie uns einfach sagen, wie der Zustand ist.“

Unsere zentrale Autorität betreibt ihren großen Knoten, und nun signieren die Leute Transaktionen und anstatt sie direkt aneinander zu senden, senden sie sie an die zentrale Autorität. Die zentrale Autorität wendet jede Transaktion an und signiert sie selbst mit den Worten: „Ja, ich genehmige – das ist Transaktion null.“ Die zentrale Autorität sendet sie dann an alle, und jeder empfängt die Transaktion und nimmt sie als absolute Wahrheit hin.

#### Das Problem der Doppelausgabe (1:05) {#the-double-spend-problem-105}

Versuchen wir nun die Doppelausgabe. Was wird passieren? Mallory wird zwei widersprüchliche Transaktionen an die zentrale Autorität senden. Die zentrale Autorität empfängt die erste und signiert, dass dies die zweite Transaktion ist, die sie gesehen hat, signiert dann, dass dies die dritte Transaktion ist, die sie gesehen hat, und verbreitet dann diese Nachrichten.

Was passiert? Jeder empfängt dieselben Nachrichten, und sie alle beobachten die Reihenfolge der zentralen Autorität. Das bedeutet, dass sie alle mit denselben Historien enden. Wenn wir uns die Zustände ansehen, sind wir auf einem guten Weg – Alice sendet an Jing, dann sendet Mallory an Alice, dann versucht Mallory, an Jing zu senden, aber das geht nicht durch, weil Mallory nicht genug Geld hat. Ihre Kontostände werden alle gleich sein. Sie sind alle im Konsens. Die zentrale Autorität – großartig, wir haben es geschafft.

#### Wenn die Autorität kompromittiert ist (2:09) {#when-the-authority-is-compromised-209}

Aber das Problem ist, dass wir der zentralen Autorität vertrauen müssen, diese Reihenfolge der Transaktionen bereitzustellen. Was passiert also, wenn die zentrale Autorität rausgeworfen wird und sich herausstellt, dass sie die ganze Zeit Mallory war?

Wir geraten wieder in dieselben Probleme, die wir vorher hatten. Erstens, Doppelausgaben – Mallory signiert einfach beide widersprüchlichen Transaktionen und sagt, dass sie beide zur gleichen Zeit stattfinden. Wir wissen nicht, welche zuerst kommt. Mallory verbreitet sie selektiv, bringt die Knoten durcheinander, und sie verlieren ihre Übereinstimmung.

Das andere Problem ist Zensur. Dies ist ein neues Problem bei unserer Chain mit Autoritätsnachweis (PoA). Was ist, wenn Mallory Alice nicht mag? Alice versucht, eine Transaktion zu senden, und die zentrale Autorität schaut sie sich nur an, bemerkt, dass es Alice ist, und wirft sie weg. Alice versucht, sie erneut zu senden, und sie wird wieder weggeworfen. Alice weiß nicht, was passiert – ihre Transaktionen gehen nicht durch. Zensur erfolgreich, und wir sind wieder beim alten Leid.

#### Schadensbegrenzung mit Mehrfachsignatur (3:21) {#mitigating-with-multi-signature-321}

Machen Sie sich nicht zu viele Sorgen – es gibt eine mögliche Schadensbegrenzung. Wir können die Autorität politisch dezentralisieren. Dies wird es Mallory theoretisch schwerer machen, die Kontrolle zu erlangen. Anstelle einer zentralen Autorität haben wir also vier verschiedene Autoritäten. Sie alle vertreten vielleicht unterschiedliche Interessen verschiedener Parteien, und sie müssen alle zusammenkommen, um Transaktionen abzuzeichnen.

Dies wird als Multi-Sig bezeichnet – eine Mehrfachsignatur. Sie empfangen eine Transaktion von Alice an Jing, und die erste zeichnet ab und sagt: „Ich habe diese Nachricht gesehen und ich genehmige sie.“ Dann zeichnet die zweite ab, und die dritte. Wir können sagen, wir akzeptieren eine Zwei-von-vier-Multi-Sig oder Drei-von-vier, oder vielleicht verlangen wir alle Parteien – vier von vier. Es liegt an Ihnen, wenn Sie Ihre Multi-Sig entwerfen.

Das bedeutet, dass die Transaktion durchgeht und von den Autoritäten genehmigt wurde.

#### Einschränkungen des Autoritätsnachweises (4:32) {#limitations-of-proof-of-authority-432}

Aber was passiert, wenn all diese Autoritäten zu Mallorys werden? Wir haben genau dieselben Probleme – Doppelausgaben und Zensur. Es ist also nicht perfekt. In mancher Hinsicht ist es jedoch besser als ein zentralisierter Zahlungsabwickler, da zumindest die Benutzer alle Transaktionen selbst ausführen. Sie können schließlich eine Doppelausgabe erkennen, aber wir haben immer noch unsere Probleme. Wir können technisch gesehen immer noch Doppelausgaben tätigen und wir können technisch gesehen immer noch zensieren.

Es gibt keinen offenen Zugang – es kann schwer sein, eine dieser Autoritäten zu werden. Und es gibt keine protokollinternen Strafen, wenn Doppelausgaben oder Zensur auftreten. Es gibt nichts im Protokoll, das diese Autoritätspersonen bestrafen würde.

#### Was als Nächstes kommt (5:19) {#what-comes-next-519}

Also beschließt unsere weise Alice, dass es einen anderen Weg gibt – die Autorität loszuwerden. Wer braucht sie schon? Stattdessen erlauben wir jedem, ein Miner zu werden und am Konsens-Protokoll teilzunehmen. Dies bietet einen offenen Zugang zur Teilnahme, bietet wirtschaftliche Belohnungen für gutes Verhalten – die Bildung eines Konsenses auf eine Weise, die funktioniert – und bietet wirtschaftliche Strafen für schlechtes Verhalten, bei dem wir es erkennen und die Coins der Leute verbrennen.

Aber das kommt als Nächstes im Proof-of-Work (PoW) – Mechanismus-Design für Kapitel 3.