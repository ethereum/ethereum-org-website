---
title: "Hashfunktion — ETH.BUILD"
description: "Eine Demonstration von kryptographischen Hashfunktionen mit dem Lernwerkzeug ETH.BUILD. Lerne, wie Hashfunktionen funktionieren und warum sie für das Konto- und Datenintegritätsmodell von Ethereum grundlegend sind."
lang: de
youtubeId: "QJ010l-pBpE"
uploadDate: 2021-01-14
duration: "0:04:39"
educationLevel: beginner
topic:
  - "accounts"
  - "cryptography"
format: tutorial
author: Austin Griffith
breadcrumb: "Hashfunktionen (ETH.BUILD)"
---

Ein Tutorial von **Austin Griffith**, das zeigt, wie kryptographische Hashfunktionen mit dem visuellen Programmierwerkzeug ETH.BUILD funktionieren, und dabei Determinismus, Ausgaben mit fester Länge, unidirektionale Eigenschaften und Merkle-Bäume behandelt.

*Dieses Transkript ist eine barrierefreie Kopie des [originalen Videotranskripts](https://www.youtube.com/watch?v=QJ010l-pBpE), das von Austin Griffith veröffentlicht wurde. Es wurde zur besseren Lesbarkeit leicht bearbeitet.*

### Einführung in Hashfunktionen (0:00) {#introduction-to-hash-functions-000}

Dies ist das erste Video einer Serie namens ETH.BUILD. Du kannst auf eth.build gehen, um dieses Werkzeug zu nutzen, aber es ist nur zum Herumspielen gedacht, um eine Vorstellung davon zu bekommen, wie die Dinge funktionieren, wenn man auf Ethereum baut.

Das erste Modul, das wir uns ansehen werden, ist eine Hashfunktion. Was zum Teufel ist eine Hashfunktion? Nun, sie ist so etwas wie ein Fingerabdruck. Man hat eine Eingabe – das kann alles Mögliche sein – aber für den Moment nehmen wir einfach den Text „hello world“. Auf der anderen Seite erhält man eine Ausgabe, und diese Ausgabe ist eine 64 Zeichen lange hexadezimale Zeichenfolge. Es heißt 66 Zeichen wegen des Präfixes „0x“, aber es ist eigentlich ein 64 Zeichen langer Hex-String.

### Hashes als Farben visualisieren (0:50) {#visualizing-hashes-as-colors-050}

Wenn man sich Hexadezimalwerte ansieht, sehen sie ein bisschen wie eine Farbe aus, und es ist vielleicht einfacher zu beschreiben, was wir hier sehen, wenn wir sie einfach zu einer Farbe machen. Was wir also tun werden, ist, die ersten sechs Zeichen der Zeichenfolge zu nehmen und sie als Farbe anzuzeigen. Wenn wir uns das ansehen, sehen wir, dass es ein schönes Lila ist.

Mal sehen, welche Farbe mein Name hat – da haben wir es, ein schönes Waldgrün. Gehen wir nun zurück zu „hello world“ – es ist wieder dieses Lila.

### Determinismus und Ausgabe mit fester Länge (1:38) {#determinism-and-fixed-length-output-138}

Was wir gerade herausgefunden haben, ist, dass es deterministisch ist. Im Grunde genommen bekommen wir auf der anderen Seite immer das Gleiche heraus, egal was wir als Eingabe hineingeben.

Die zweite Eigenschaft ist, dass man alles von beliebiger Größe eingeben kann. Ich kann auf der Tastatur herumtippen und sehen, wie sich die Farbe ändert, aber diese Zeichenfolge bleibt bei dieser Länge von 66 Zeichen. Egal, was man hier eingibt – sogar eine Datei – ich könnte diese Datei von Leo, meinem Jungen, hineinziehen und sie als Hash eingeben und eine schöne orange Farbe erhalten. Dann könnte ich ein Textdokument mit einer BIP-Wortliste hineinziehen und es ist dieses schöne Hellblau. Wenn ich Leo zurückbringe, rate mal, welche Farbe es haben wird? Wir wissen, dass es dieses Orange sein wird. Man erhält diesen deterministischen Fingerabdruck von dem, was man eingegeben hat.

### Unidirektionale Eigenschaft (2:37) {#one-directional-property-237}

Die nächste sehr wichtige Eigenschaft ist, dass sie unidirektional (in eine Richtung gehend) ist. Wenn ich wieder „hello world“ eingebe, erhalten wir diesen Hash „4717“. Wenn wir diesen Hash nehmen und ihn jemandem schicken und sagen: „Hier ist der Hash meines Geheimnisses – wenn du mein Geheimnis erraten kannst, gebe ich dir hundert Dollar“, wird er nicht einmal in die Nähe kommen.

Nehmen wir an, der Hash beginnt mit „4717“ und sie fangen an herumzuprobieren, um eine Übereinstimmung zu finden. Man kann nicht einfach kleine Zeichen ändern und näher herankommen – man hat es entweder oder man hat es nicht. Man muss es im Grunde durch Brute-Force erraten. Wenn sie zufällig „hello world“ erraten, erhalten sie die Antwort, aber wenn sie es nicht erraten, werden sie es nie herausfinden. Es gibt keine Möglichkeit zu erkennen, ob man der Lösung näher kommt.

Man wird bei der Kryptographie feststellen, dass es als Entwickler manchmal frustrierend ist, weil es entweder funktioniert oder nicht – man bekommt keine Hinweise darauf, ob man auf dem richtigen Weg ist. Aber das ist eine gute Sache. Das ist genau die Eigenschaft, die wir von einer Hashfunktion erwarten.

### Zusammenfassung der Eigenschaften von Hashfunktionen (3:43) {#summary-of-hash-function-properties-343}

Wir haben also: Alles von beliebiger Größe kann in eine Hashfunktion eingespeist werden, und sie wird einen exakten 64-stelligen hexadezimalen Fingerabdruck dieser Daten ausspucken. Sie ist deterministisch. Sie ist unidirektional – man kann nicht den umgekehrten Weg gehen. Es ist wirklich einfach, einen Hash zu erstellen, aber wirklich schwer, das Geheimnis des Hashes zu erraten.

### Merkle-Bäume und das Kombinieren von Hashes (4:06) {#merkle-trees-and-combining-hashes-406}

Was wir damit machen können, sind einige wirklich tolle Sachen, wie ein Merkle-Baum. Wir haben unsere drei Eingaben, und wir könnten diese zusammenfügen. Wir können all diese Hashes kombinieren und dann die Kombination hashen.

Diese Farbe hier – dieses Lila – repräsentiert den Hash all dieser Hashes. Wenn ich „hello world“ in „hello world one“ ändere, wird sich dieses Lila ändern. Jede kleine Änderung an einer dieser Eingaben wird dazu führen, dass sich der endgültige Hash ändert. Man kann alle möglichen Daten auf alle möglichen Arten einbringen – sogar einen Baum von Hashes, einen Merkle-Baum, haben – oder eine Reihe von Blöcken hintereinander haben, und dieser endgültige Hash wird auf all diesen Dingen basieren. Wenn sich irgendwo auf dem Weg auch nur eine Kleinigkeit ändert, wird sich der endgültige Hash ändern.

### Wichtigste Erkenntnis (5:53) {#key-takeaway-553}

Die wichtigste Erkenntnis ist, dass eine Hashfunktion im Grunde wie ein Fingerabdruck ist. Wenn ich etwas eintippe, wird sie mir deterministisch die Ausgabe geben, die ich erwarte. Das ist eine Hashfunktion – willkommen bei ETH.BUILD. Lass uns ein paar coole Sachen machen und dabei eine Menge lernen.