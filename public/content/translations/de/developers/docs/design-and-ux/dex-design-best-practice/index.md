---
title: "Best Practices für das Design dezentralisierter Börsen (DEX)"
description: "Ein Leitfaden, der UX/UI-Entscheidungen für das Tauschen von Token erklärt."
lang: de
---

Seit dem Start von Uniswap im Jahr 2018 wurden Hunderte von dezentralisierten Börsen auf Dutzenden verschiedener Chains gestartet.
Viele davon führten neue Elemente ein oder fügten ihre eigene Note hinzu, aber die Benutzeroberfläche ist im Allgemeinen gleich geblieben.

Ein Grund dafür ist [Jakobs Gesetz](https://lawsofux.com/jakobs-law/):

> Benutzer verbringen die meiste Zeit auf anderen Websites. Das bedeutet, dass Benutzer es bevorzugen, wenn Ihre Website genauso funktioniert wie all die anderen Websites, die sie bereits kennen.

Dank früher Innovatoren wie Uniswap, Pancakeswap und Sushiswap haben DeFi-Benutzer eine kollektive Vorstellung davon, wie eine DEX aussieht.
Aus diesem Grund entsteht nun so etwas wie eine „Best Practice“. Wir sehen, dass immer mehr Designentscheidungen über verschiedene Websites hinweg standardisiert werden. Man kann die Entwicklung von DEXes als ein riesiges Beispiel für Live-Tests betrachten. Dinge, die funktionierten, blieben; Dinge, die nicht funktionierten, wurden verworfen. Es gibt immer noch Raum für Persönlichkeit, aber es gibt bestimmte Standards, denen eine DEX entsprechen sollte.

Dieser Artikel ist eine Zusammenfassung darüber:
- was enthalten sein sollte
- wie man es so benutzerfreundlich wie möglich gestaltet
- die wichtigsten Möglichkeiten, das Design anzupassen

Alle Beispiel-Wireframes wurden speziell für diesen Artikel erstellt, obwohl sie alle auf realen Projekten basieren.

Das Figma-Kit ist ebenfalls unten verlinkt – fühlen Sie sich frei, es zu verwenden und Ihre eigenen Wireframes zu beschleunigen!

## Grundlegende Anatomie einer DEX {#basic-anatomy-of-a-dex}

Die Benutzeroberfläche (UI) enthält im Allgemeinen drei Elemente:
1. Hauptformular
2. Schaltfläche (Button)
3. Detailbereich

![Generische DEX-UI, die die drei Hauptelemente zeigt](./1.png)


## Variationen {#variations}

Dies wird ein wiederkehrendes Thema in diesem Artikel sein, aber es gibt verschiedene Möglichkeiten, wie diese Elemente organisiert werden können. Der „Detailbereich“ kann sich befinden:
- Über der Schaltfläche
- Unter der Schaltfläche
- Versteckt in einem Akkordeon-Panel
- Und/oder in einem „Vorschau“-Modal
  
Hinweis: Ein „Vorschau“-Modal ist optional, aber wenn Sie auf der Haupt-UI nur sehr wenige Details anzeigen, wird es unerlässlich.

## Struktur des Hauptformulars {#structure-of-the-main-form}

Dies ist das Feld, in dem Sie tatsächlich auswählen, welchen Token Sie tauschen möchten. Die Komponente besteht aus einem Eingabefeld und einer kleinen Schaltfläche in einer Reihe.

DEXes zeigen typischerweise zusätzliche Details in einer Reihe darüber und einer Reihe darunter an, obwohl dies auch anders konfiguriert werden kann.

![Eingabereihe mit einer Detailreihe darüber und darunter](./2.png)

## Variationen {#variations2}

Hier werden zwei UI-Variationen gezeigt; eine ohne jegliche Ränder, was ein sehr offenes Design schafft, und eine, bei der die Eingabereihe einen Rand hat, was den Fokus auf dieses Element lenkt.

![Zwei UI-Variationen des Hauptformulars](./3.png)

Diese Grundstruktur ermöglicht es, **vier wichtige Informationen** im Design anzuzeigen: eine in jeder Ecke. Wenn es nur eine obere/untere Reihe gibt, dann gibt es nur zwei Plätze.

Während der Entwicklung von DeFi wurden hier viele verschiedene Dinge integriert.

## Wichtige Informationen, die enthalten sein sollten {#key-info-to-include}

- Guthaben im Wallet
- Max-Schaltfläche
- Fiat-Gegenwert
- Preisauswirkung auf den „erhaltenen“ Betrag

In den frühen Tagen von DeFi fehlte oft der Fiat-Gegenwert. Wenn Sie irgendeine Art von Web3-Projekt entwickeln, ist es unerlässlich, dass ein Fiat-Gegenwert angezeigt wird. Benutzer denken immer noch in lokalen Währungen. Um also den mentalen Modellen der realen Welt zu entsprechen, sollte dies einbezogen werden.

Im zweiten Feld (in dem Sie den Token auswählen, in den Sie tauschen) können Sie auch die Preisauswirkung neben dem Fiat-Währungsbetrag anzeigen, indem Sie die Differenz zwischen dem Eingabebetrag und den geschätzten Ausgabebeträgen berechnen. Dies ist ein ziemlich nützliches Detail, das man einfügen sollte.

Prozent-Schaltflächen (z. B. 25 %, 50 %, 75 %) können eine nützliche Funktion sein, aber sie nehmen mehr Platz ein, fügen mehr Handlungsaufforderungen (Call-to-Actions) hinzu und erhöhen die mentale Belastung. Das Gleiche gilt für Prozent-Schieberegler. Einige dieser UI-Entscheidungen hängen von Ihrer Marke und Ihrem Benutzertyp ab.

Zusätzliche Details können unter dem Hauptformular angezeigt werden. Da diese Art von Informationen hauptsächlich für professionelle Benutzer gedacht ist, ist es sinnvoll, sie entweder:
- so minimal wie möglich zu halten, oder;
- in einem Akkordeon-Panel zu verstecken

![Details, die in den Ecken dieses Hauptformulars angezeigt werden](./4.png)

## Zusätzliche Informationen, die enthalten sein sollten {#extra-info-to-include}

- Token-Preis
- Slippage (Preisrutsch)
- Mindestens erhalten
- Erwartete Ausgabe
- Preisauswirkung
- Geschätzte Gaskosten
- Andere Gebühren
- Order-Routing

Man kann argumentieren, dass einige dieser Details optional sein könnten.

Order-Routing ist interessant, macht aber für die meisten Benutzer keinen großen Unterschied.

Einige andere Details geben einfach dasselbe auf unterschiedliche Weise wieder. Zum Beispiel sind „Mindestens erhalten“ und „Slippage“ zwei Seiten derselben Medaille. Wenn Sie die Slippage auf 1 % eingestellt haben, dann ist das Minimum, das Sie erwarten können zu erhalten = erwartete Ausgabe - 1 %. Einige UIs zeigen den erwarteten Betrag, den Mindestbetrag und die Slippage an… Was nützlich, aber möglicherweise übertrieben ist. 

Die meisten Benutzer werden ohnehin die Standard-Slippage beibehalten.

Die „Preisauswirkung“ wird oft in Klammern neben dem Fiat-Gegenwert im „An“-Feld angezeigt. Dies ist ein großartiges UX-Detail, das man hinzufügen kann, aber wenn es hier angezeigt wird, muss es dann wirklich unten noch einmal angezeigt werden? Und dann noch einmal auf einem Vorschaubildschirm?

Viele Benutzer (insbesondere diejenigen, die kleine Beträge tauschen) werden sich nicht um diese Details kümmern; sie werden einfach eine Zahl eingeben und auf Tauschen klicken.

![Einige Details zeigen dasselbe](./5.png)

Welche Details genau angezeigt werden, hängt von Ihrer Zielgruppe ab und davon, welches Gefühl die App vermitteln soll.

Wenn Sie die Slippage-Toleranz in den Detailbereich aufnehmen, sollten Sie sie auch direkt von hier aus bearbeitbar machen. Dies ist ein gutes Beispiel für einen „Beschleuniger“; ein raffinierter UX-Trick, der die Abläufe erfahrener Benutzer beschleunigen kann, ohne die allgemeine Benutzerfreundlichkeit der App zu beeinträchtigen.

![Slippage kann über den Detailbereich gesteuert werden](./6.png)

Es ist eine gute Idee, nicht nur über eine bestimmte Information auf einem Bildschirm sorgfältig nachzudenken, sondern über den gesamten Ablauf:
Eingabe von Zahlen im Hauptformular → Scannen der Details → Klicken auf den Vorschaubildschirm (falls Sie einen Vorschaubildschirm haben). 
Sollte der Detailbereich jederzeit sichtbar sein, oder muss der Benutzer darauf klicken, um ihn zu erweitern?
Sollten Sie Reibung erzeugen, indem Sie einen Vorschaubildschirm hinzufügen? Dies zwingt den Benutzer, langsamer zu werden und seinen Handel zu überdenken, was nützlich sein kann. Aber wollen sie all die gleichen Informationen noch einmal sehen? Was ist an diesem Punkt für sie am nützlichsten?

## Designoptionen {#design-options}

Wie bereits erwähnt, hängt vieles davon von Ihrem persönlichen Stil ab.
Wer ist Ihr Benutzer?
Was ist Ihre Marke?
Möchten Sie eine „Pro“-Benutzeroberfläche, die jedes Detail zeigt, oder möchten Sie minimalistisch sein?
Selbst wenn Sie auf die professionellen Benutzer abzielen, die alle möglichen Informationen wünschen, sollten Sie sich an Alan Coopers weise Worte erinnern:

> Egal wie schön, egal wie cool Ihre Benutzeroberfläche ist, es wäre besser, wenn es weniger davon gäbe.

### Struktur {#structure}

- Token auf der linken Seite oder Token auf der rechten Seite
- 2 Reihen oder 3
- Details über oder unter der Schaltfläche
- Details erweitert, minimiert oder nicht angezeigt

### Komponentenstil {#component-style}

- leer (empty)
- umrandet (outlined)
- gefüllt (filled)

Aus reiner UX-Sicht spielt der UI-Stil eine geringere Rolle, als Sie denken. Visuelle Trends kommen und gehen in Zyklen, und viele Vorlieben sind subjektiv.

Der einfachste Weg, ein Gefühl dafür zu bekommen – und über die verschiedenen Konfigurationen nachzudenken – ist, sich einige Beispiele anzusehen und dann selbst etwas zu experimentieren.

Das enthaltene Figma-Kit enthält leere, umrandete und gefüllte Komponenten.

Sehen Sie sich die folgenden Beispiele an, um verschiedene Möglichkeiten zu sehen, wie Sie alles zusammensetzen können:

![3 Reihen in einem gefüllten Stil](./7.png)

![3 Reihen in einem umrandeten Stil](./8.png)

![2 Reihen in einem leeren Stil](./9.png)

![3 Reihen in einem umrandeten Stil, mit einem Detailbereich](./10.png)

![3 Reihen mit der Eingabereihe in einem umrandeten Stil](./11.png)

![2 Reihen in einem gefüllten Stil](./12.png)

## Aber auf welche Seite sollte der Token kommen? {#but-which-side-should-the-token-go-on}

Unter dem Strich macht es wahrscheinlich keinen großen Unterschied für die Benutzerfreundlichkeit. Es gibt jedoch ein paar Dinge zu beachten, die Sie in die eine oder andere Richtung beeinflussen könnten.

Es war leicht interessant zu beobachten, wie sich die Mode mit der Zeit ändert. Uniswap hatte den Token anfangs auf der linken Seite, hat ihn aber inzwischen nach rechts verschoben. Sushiswap hat diese Änderung ebenfalls während eines Design-Upgrades vorgenommen. Die meisten, aber nicht alle Protokolle sind diesem Beispiel gefolgt.

Die finanzielle Konvention setzt das Währungssymbol traditionell vor die Zahl, z. B. $50, €50, £50, aber wir *sagen* 50 Dollar, 50 Euro, 50 Pfund.

Für den allgemeinen Benutzer – insbesondere für jemanden, der von links nach rechts und von oben nach unten liest – fühlt sich der Token auf der rechten Seite wahrscheinlich natürlicher an.

![Eine UI mit Token auf der linken Seite](./13.png)

Den Token auf die linke Seite und alle Zahlen auf die rechte Seite zu setzen, sieht angenehm symmetrisch aus, was ein Pluspunkt ist, aber es gibt einen weiteren Nachteil bei diesem Layout.

Das Gesetz der Nähe besagt, dass Elemente, die nahe beieinander liegen, als zusammengehörig wahrgenommen werden. Dementsprechend möchten wir zusammengehörige Elemente nebeneinander platzieren. Das Token-Guthaben steht in direktem Zusammenhang mit dem Token selbst und ändert sich, wenn ein neuer Token ausgewählt wird. Es macht daher etwas mehr Sinn, dass sich das Token-Guthaben neben der Token-Auswahlschaltfläche befindet. Es könnte unter den Token verschoben werden, aber das bricht die Symmetrie des Layouts.

Letztendlich gibt es für beide Optionen Vor- und Nachteile, aber es ist interessant, wie der Trend anscheinend zum Token auf der rechten Seite geht.

## Verhalten der Schaltfläche {#button-behavior}

Haben Sie keine separate Schaltfläche für das Genehmigen (Approve). Verlangen Sie auch keinen separaten Klick für das Genehmigen. Der Benutzer möchte tauschen, also schreiben Sie einfach „Tauschen“ auf die Schaltfläche und leiten Sie die Genehmigung als ersten Schritt ein. Ein Modal kann den Fortschritt mit einem Stepper oder einer einfachen Benachrichtigung „Tx 1 von 2 - Genehmigung läuft“ anzeigen.

![Eine UI mit separaten Schaltflächen für Genehmigen und Tauschen](./14.png)

![Eine UI mit einer Schaltfläche, auf der Genehmigen steht](./15.png)

### Schaltfläche als kontextbezogene Hilfe {#button-as-contextual-help}

Die Schaltfläche kann eine Doppelfunktion als Warnung erfüllen!

Dies ist eigentlich ein ziemlich ungewöhnliches Designmuster außerhalb von Web3, ist aber innerhalb davon zum Standard geworden. Dies ist eine gute Innovation, da sie Platz spart und die Aufmerksamkeit fokussiert hält.

Wenn die Hauptaktion – TAUSCHEN – aufgrund eines Fehlers nicht verfügbar ist, kann der Grund dafür mit der Schaltfläche erklärt werden, z. B.:

- Netzwerk wechseln
- Wallet verbinden
- verschiedene Fehler

Die Schaltfläche kann auch **der Aktion zugeordnet** werden, die ausgeführt werden muss. Wenn der Benutzer beispielsweise nicht tauschen kann, weil er sich im falschen Netzwerk befindet, sollte auf der Schaltfläche „Zu Ethereum wechseln“ stehen, und wenn der Benutzer auf die Schaltfläche klickt, sollte das Netzwerk zu Ethereum gewechselt werden. Dies beschleunigt den Benutzerfluss erheblich.

![Wichtige Aktionen, die vom Haupt-CTA initiiert werden](./16.png)

![Fehlermeldung, die innerhalb des Haupt-CTAs angezeigt wird](./17.png)

## Bauen Sie Ihre eigene mit dieser Figma-Datei {#build-your-own-with-this-figma-file}

Dank der harten Arbeit mehrerer Protokolle hat sich das DEX-Design stark verbessert. Wir wissen, welche Informationen der Benutzer benötigt, wie wir sie anzeigen sollten und wie wir den Ablauf so reibungslos wie möglich gestalten können.
Hoffentlich bietet dieser Artikel einen soliden Überblick über die UX-Prinzipien. 

Wenn Sie experimentieren möchten, können Sie gerne das Figma-Wireframe-Kit verwenden. Es ist so einfach wie möglich gehalten, bietet aber genug Flexibilität, um die Grundstruktur auf verschiedene Weise aufzubauen.

[Figma-Wireframe-Kit](https://www.figma.com/community/file/1393606680816807382/dex-wireframes-kit)

DeFi wird sich weiterentwickeln, und es gibt immer Raum für Verbesserungen. 

Viel Glück!