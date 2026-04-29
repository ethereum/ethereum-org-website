---
title: "Schlüsselpaar — ETH.BUILD"
description: "Eine Demonstration von öffentlich-privaten Schlüsselpaaren mit dem Lernwerkzeug ETH.BUILD. Verstehen Sie, wie kryptographische Schlüsselpaare Ethereum-Konten sichern und das Signieren von Transaktionen ermöglichen."
lang: de
youtubeId: "9LtBDy67Tho"
uploadDate: 2021-01-14
duration: "0:04:05"
educationLevel: beginner
topic:
  - "konten"
  - "kryptographie"
format: tutorial
author: Austin Griffith
breadcrumb: "Schlüsselpaare (ETH.BUILD)"
---

Ein Tutorial von **Austin Griffith**, das demonstriert, wie öffentlich-private Schlüsselpaare mit dem visuellen Programmierwerkzeug ETH.BUILD funktionieren. Es behandelt die Generierung privater Schlüssel, die Ableitung öffentlicher Schlüssel, das Signieren von Nachrichten und die Wiederherstellung von Signaturen.

*Dieses Transkript ist eine barrierefreie Kopie des [originalen Video-Transkripts](https://www.youtube.com/watch?v=9LtBDy67Tho), das von Austin Griffith veröffentlicht wurde. Es wurde zur besseren Lesbarkeit leicht bearbeitet.*

### Der private Schlüssel (0:00) {#the-private-key-000}

Im ersten Video haben wir einen Hash verwendet, und Hashes werden auch in Zukunft wichtig sein. Aber das nächstwichtigste Element ist ein Schlüsselpaar. Der wichtigste Teil eines Schlüsselpaares ist der private Schlüssel. Lassen Sie uns einen generieren — es ist im Grunde eine zufällige hexadezimale Zeichenfolge mit 64 Zeichen, in der gleichen Größe wie der Hash, mit dem wir gerade gearbeitet haben.

Sie beginnen damit als Ihrem privaten Schlüssel, und dann leiten wir mithilfe der Kryptographie auf Basis elliptischer Kurven — schauen Sie sich das als Nebenaufgabe auf Wikipedia an — einen öffentlichen Schlüssel ab. Jetzt haben wir also einen privaten Schlüssel und einen öffentlichen Schlüssel. Wir haben einfach aus dem Nichts einen privaten Schlüssel generiert, und der öffentliche Schlüssel gibt uns eine Adresse. Hierhin könnten Leute tatsächlich Geld senden. Wenn jemand sagt: „Sende an meine Ethereum-Adresse“, dann ist es genau das.

Wenn ich ein Konto bei Wells Fargo eröffnen wollte, müsste ich zur Bank fahren und ihnen eine Menge Informationen geben. Das würde eine Weile dauern. Aber um ein Konto in einem kryptographischen System wie diesem zu generieren, in dem ich Geld senden und empfangen kann, generiere ich einfach diesen privaten Schlüssel. Dieser 64-stellige hexadezimale private Schlüssel leitet alles andere ab.

### Signieren und Wiederherstellen von Nachrichten (1:54) {#signing-and-recovering-messages-154}

Es gibt eine wirklich tolle Eigenschaft dieses Schlüsselpaares, die wir untersuchen sollten, und das ist das Signieren und Wiederherstellen von Nachrichten. Im Grunde nehmen Sie Ihren privaten Schlüssel und verwenden ihn, um eine Art Nachricht zu signieren. Lassen Sie uns eine Nachricht tippen — „der Bär ist klebrig vor Honig“.

Wir geben das als unsere Nachricht ein, und mit aktiviertem Auto-Signieren erhalten wir eine Signatur zurück. Ähnlich wie beim Hash nimmt unsere Signatur im Grunde die Nachricht und unseren privaten Schlüssel und signiert etwas. Was wir daraus erhalten, ist eine Signatur.

Ich kann das in die Welt hinaussenden — ich könnte das öffentlich an alle senden — diese Signatur-Zeichenfolge zusammen mit der Nachricht. Was jeder mit Mathematik tun kann, ist zu verifizieren, dass spezifisch ich derjenige bin, der sie signiert hat.

### Wiederherstellen der Adresse des Unterzeichners (3:17) {#recovering-the-signers-address-317}

Lassen Sie mich Ihnen zeigen, wie das funktioniert. Wir verwenden eine „Recover“-Methode (Wiederherstellen). Wir benötigen zwei Eingaben: die Nachricht — „der Bär ist klebrig vor Honig“ — und die Signatur. Was dabei herauskommt, ist die Adresse, die zum Signieren verwendet wurde. Wir können visuell anhand der Blockie-Identicons sehen, dass das Konto diese Nachricht signiert hat.

Es gibt keine Möglichkeit, dies zu manipulieren. Wenn jemand auch nur ein einziges Wort ändert — wie das Austauschen von „Bär“ durch „Dachs“ — ändert sich alles. Selbst mit derselben Signatur spuckt eine andere Nachricht eine andere Adresse aus, nicht die richtige.

Diese Nachricht kann nicht manipuliert werden. Wir könnten einen Zeitstempel hinzufügen — wir könnten sagen: „An diesem Tag sage ich voraus, dass etwas passieren wird“, es signieren, die Signatur und die Nachricht veröffentlichen, und jeder kann für den Rest der Zeit mathematisch beweisen, dass Sie diese Nachricht zu diesem Zeitpunkt signiert haben.

### Die Schlüsseleigenschaft eines Schlüsselpaares (4:58) {#the-key-property-of-a-key-pair-458}

Dies ist die Schlüsseleigenschaft eines Schlüsselpaares. Ein Schlüsselpaar, das aus nichts weiter als einer zufälligen hexadezimalen Zeichenfolge mit 64 Zeichen generiert wurde, kann verwendet werden, um eine Nachricht zu signieren, und dann kann diese Nachricht wiederhergestellt werden.

- Privater Schlüssel + Nachricht = Signatur
- Signatur + Nachricht = öffentliche Adresse

Wir können Daten mit unserem privaten Schlüssel signieren, und die Leute können beweisen, dass wir es waren, die sie signiert haben. Das wird ein wichtiges Element für den nächsten Schritt sein.