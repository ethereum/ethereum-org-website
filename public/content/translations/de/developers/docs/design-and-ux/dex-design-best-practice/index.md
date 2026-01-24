---
title: Bewährte Praktiken für das Design von dezentralen Börsen (DEX)
description: Ein Leitfaden, der UX/UI-Entscheidungen für das Tauschen von Tokens erklärt.
lang: de
---

Seit dem Start von Uniswap im Jahr 2018 wurden Hunderte von dezentralen Börsen auf Dutzenden von verschiedenen Chains gestartet.
Viele von ihnen führten neue Elemente ein oder fügten ihre eigene Note hinzu, aber die Benutzeroberfläche ist im Allgemeinen gleich geblieben.

Ein Grund dafür ist [Jakobs Gesetz](https://lawsofux.com/jakobs-law/):

> Benutzer verbringen die meiste Zeit auf anderen Websites. Das bedeutet, dass Benutzer es vorziehen, dass Ihre Website auf die gleiche Weise funktioniert wie alle anderen Websites, die sie bereits kennen.

Dank früher Innovatoren wie Uniswap, Pancakeswap und Sushiswap haben DeFi-Benutzer eine kollektive Vorstellung davon, wie eine DEX aussieht.
Aus diesem Grund bildet sich jetzt so etwas wie eine „Best Practice“ heraus. Wir sehen, dass immer mehr Design-Entscheidungen über Websites hinweg standardisiert werden. Man kann die Entwicklung von DEXs als ein riesiges Beispiel für Live-Tests sehen. Dinge, die funktionierten, blieben, Dinge, die nicht funktionierten, wurden verworfen. Es gibt immer noch Raum für Persönlichkeit, aber es gibt bestimmte Standards, denen eine DEX entsprechen sollte.

Dieser Artikel ist eine Zusammenfassung von:

- was man einbeziehen sollte
- wie man es so benutzerfreundlich wie möglich gestaltet
- die wichtigsten Möglichkeiten, das Design anzupassen

Alle Beispiel-Wireframes wurden speziell für diesen Artikel erstellt, obwohl sie alle auf realen Projekten basieren.

Das Figma-Kit ist ebenfalls am Ende enthalten – Sie können es gerne verwenden und Ihre eigenen Wireframes beschleunigen!

## Grundlegende Anatomie einer DEX {#basic-anatomy-of-a-dex}

Die Benutzeroberfläche enthält im Allgemeinen drei Elemente:

1. Hauptformular
2. Schaltfläche
3. Detailbereich

![Generische DEX-Benutzeroberfläche, die die drei Hauptelemente zeigt](./1.png)

## Variationen {#variations}

Dies wird ein wiederkehrendes Thema in diesem Artikel sein, aber es gibt verschiedene Möglichkeiten, diese Elemente zu organisieren. Der „Detailbereich“ kann sein:

- Über der Schaltfläche
- Unter der Schaltfläche
- In einem Akkordeon-Panel versteckt
- Und/oder in einem „Vorschau“-Modal

N.B. Ein „Vorschau“-Modal ist optional, aber wenn Sie nur sehr wenige Details auf der Hauptbenutzeroberfläche anzeigen, wird es unerlässlich.

## Struktur des Hauptformulars {#structure-of-the-main-form}

Dies ist das Feld, in dem Sie tatsächlich auswählen, welchen Token Sie tauschen möchten. Die Komponente besteht aus einem Eingabefeld und einer kleinen Schaltfläche in einer Reihe.

DEXs zeigen normalerweise zusätzliche Details in einer Reihe darüber und einer Reihe darunter an, obwohl dies auch anders konfiguriert werden kann.

![Eingabezeile mit einer Detailzeile darüber und darunter](./2.png)

## Variationen {#variations2}

Hier werden zwei UI-Variationen gezeigt; eine ohne Ränder, die ein sehr offenes Design erzeugt, und eine, bei der die Eingabezeile einen Rand hat, was den Fokus auf dieses Element legt.

![Zwei UI-Variationen des Hauptformulars](./3.png)

Diese Grundstruktur ermöglicht es, **vier wichtige Informationen** im Design anzuzeigen: eine in jeder Ecke. Wenn es nur eine obere/untere Reihe gibt, dann gibt es nur zwei Plätze.

Im Laufe der Entwicklung von DeFi wurden hier viele verschiedene Dinge integriert.

## Wichtige Informationen, die enthalten sein sollten {#key-info-to-include}

- Guthaben in der Wallet
- Max-Schaltfläche
- Fiat-Äquivalent
- Preisauswirkung auf den „erhaltenen“ Betrag

In den Anfängen von DeFi fehlte oft das Fiat-Äquivalent. Wenn Sie irgendeine Art von Web3-Projekt entwickeln, ist es unerlässlich, dass ein Fiat-Äquivalent angezeigt wird. Benutzer denken immer noch in lokalen Währungen, daher sollte dies einbezogen werden, um den realen mentalen Modellen zu entsprechen.

Im zweiten Feld (dem, in dem Sie den Token auswählen, zu dem Sie tauschen) können Sie auch die Preisauswirkung neben dem Fiat-Währungsbetrag angeben, indem Sie die Differenz zwischen dem eingegebenen Betrag und den geschätzten Ausgabebeträgen berechnen. Dies ist ein recht nützliches Detail, das man einbeziehen sollte.

Prozent-Schaltflächen (z. B. 25 %, 50 %, 75 %) können eine nützliche Funktion sein, aber sie nehmen mehr Platz ein, fügen mehr Handlungsaufforderungen hinzu und erhöhen die mentale Belastung. Dasselbe gilt für Prozentregler. Einige dieser UI-Entscheidungen hängen von Ihrer Marke und Ihrem Benutzertyp ab.

Zusätzliche Details können unter dem Hauptformular angezeigt werden. Da diese Art von Informationen hauptsächlich für Profi-Benutzer gedacht ist, ist es sinnvoll, sie entweder:

- so minimal wie möglich zu halten, oder;
- in einem Akkordeon-Panel zu verstecken

![Details, die in den Ecken des Hauptformulars angezeigt werden](./4.png)

## Zusätzliche Informationen, die enthalten sein sollten {#extra-info-to-include}

- Token-Preis
- Slippage
- Mindestens erhaltener Betrag
- Erwartete Ausgabe
- Preisauswirkung
- Gas-Kostenschätzung
- Andere Gebühren
- Order-Routing

Man könnte argumentieren, dass einige dieser Details optional sein könnten.

Order-Routing ist interessant, macht aber für die meisten Benutzer keinen großen Unterschied.

Einige andere Details geben einfach dasselbe auf unterschiedliche Weise wieder. Zum Beispiel sind „mindestens erhaltener Betrag“ und „Slippage“ zwei Seiten derselben Medaille. Wenn Sie die Slippage auf 1 % eingestellt haben, dann ist der Mindestbetrag, den Sie erwarten können = erwartete Ausgabe - 1 %. Einige Benutzeroberflächen zeigen den erwarteten Betrag, den Mindestbetrag und die Slippage an … Was nützlich, aber möglicherweise übertrieben ist.

Die meisten Benutzer werden die Standard-Slippage ohnehin beibehalten.

Die „Preisauswirkung“ wird oft in Klammern neben dem Fiat-Äquivalent im „An“-Feld angezeigt. Dies ist ein großartiges UX-Detail, aber wenn es hier angezeigt wird, muss es dann wirklich noch einmal unten angezeigt werden? Und dann noch einmal auf einem Vorschaubildschirm?

Viele Benutzer (insbesondere diejenigen, die kleine Beträge tauschen) werden sich nicht um diese Details kümmern; sie werden einfach eine Zahl eingeben und auf Tauschen klicken.

![Einige Details zeigen dasselbe](./5.png)

Welche Details genau angezeigt werden, hängt von Ihrer Zielgruppe und dem Gefühl ab, das Ihre App vermitteln soll.

Wenn Sie die Slippage-Toleranz im Detailbereich anzeigen, sollten Sie sie auch direkt von hier aus bearbeitbar machen. Dies ist ein gutes Beispiel für einen „Beschleuniger“; ein netter UX-Trick, der die Abläufe erfahrener Benutzer beschleunigen kann, ohne die allgemeine Benutzerfreundlichkeit der App zu beeinträchtigen.

![Die Slippage kann über den Detailbereich gesteuert werden](./6.png)

Es ist eine gute Idee, nicht nur über eine bestimmte Information auf einem Bildschirm nachzudenken, sondern über den gesamten Ablauf:
Zahlen im Hauptformular eingeben → Details scannen → Zum Vorschaubildschirm klicken (falls Sie einen haben).
Sollte der Detailbereich jederzeit sichtbar sein, oder muss der Benutzer darauf klicken, um ihn zu erweitern?
Sollten Sie durch das Hinzufügen eines Vorschaubildschirms Reibung erzeugen? Dies zwingt den Benutzer, langsamer zu machen und seinen Handel zu überdenken, was nützlich sein kann. Aber wollen sie all die gleichen Informationen noch einmal sehen? Was ist für sie an diesem Punkt am nützlichsten?

## Design-Optionen {#design-options}

Wie bereits erwähnt, hängt vieles von Ihrem persönlichen Stil ab
Wer ist Ihr Benutzer?
Was ist Ihre Marke?
Wollen Sie eine „Profi“-Oberfläche, die jedes Detail anzeigt, oder wollen Sie minimalistisch sein?
Selbst wenn Sie auf Profi-Benutzer abzielen, die alle möglichen Informationen wollen, sollten Sie sich dennoch an Alan Coopers weise Worte erinnern:

> Egal wie schön, egal wie cool Ihre Benutzeroberfläche ist, es wäre besser, wenn es weniger davon gäbe.

### Struktur {#structure}

- Tokens links oder Tokens rechts
- 2 oder 3 Reihen
- Details über oder unter der Schaltfläche
- Details erweitert, minimiert oder nicht angezeigt

### Komponentenstil {#component-style}

- leer
- umrandet
- gefüllt

Aus reiner UX-Sicht ist der UI-Stil weniger wichtig, als Sie denken. Visuelle Trends kommen und gehen in Zyklen, und viele Vorlieben sind subjektiv.

Der einfachste Weg, ein Gefühl dafür zu bekommen – und über die verschiedenen Konfigurationen nachzudenken – ist, sich einige Beispiele anzusehen und dann selbst ein wenig zu experimentieren.

Das enthaltene Figma-Kit enthält leere, umrandete und gefüllte Komponenten.

Schauen Sie sich die folgenden Beispiele an, um verschiedene Möglichkeiten zu sehen, wie Sie alles zusammensetzen können:

![3 Reihen in einem gefüllten Stil](./7.png)

![3 Reihen in einem umrandeten Stil](./8.png)

![2 Reihen in einem leeren Stil](./9.png)

![3 Reihen in einem umrandeten Stil, mit einem Detailbereich](./10.png)

![3 Reihen, bei denen die Eingabezeile einen umrandeten Stil hat](./11.png)

![2 Reihen in einem gefüllten Stil](./12.png)

## Aber auf welche Seite sollte der Token? {#but-which-side-should-the-token-go-on}

Das Fazit ist, dass es wahrscheinlich keinen großen Unterschied für die Benutzerfreundlichkeit macht. Es gibt jedoch ein paar Dinge zu beachten, die Sie in die eine oder andere Richtung beeinflussen könnten.

Es war mäßig interessant zu sehen, wie sich die Mode im Laufe der Zeit verändert hat. Uniswap hatte den Token anfangs auf der linken Seite, hat ihn aber inzwischen auf die rechte Seite verschoben. Sushiswap hat diese Änderung ebenfalls während eines Design-Upgrades vorgenommen. Die meisten, aber nicht alle Protokolle sind diesem Beispiel gefolgt.

Finanzielle Konventionen setzen traditionell das Währungssymbol vor die Zahl, z. B. $50, €50, £50, aber wir _sagen_ 50 Dollar, 50 Euro, 50 Pfund.

Für den allgemeinen Benutzer – insbesondere für jemanden, der von links nach rechts und von oben nach unten liest – fühlt sich der Token auf der rechten Seite wahrscheinlich natürlicher an.

![Eine Benutzeroberfläche mit Tokens auf der linken Seite](./13.png)

Den Token auf die linke Seite und alle Zahlen auf die rechte Seite zu setzen, sieht angenehm symmetrisch aus, was ein Pluspunkt ist, aber es gibt einen weiteren Nachteil bei diesem Layout.

Das Gesetz der Nähe besagt, dass Elemente, die nahe beieinander liegen, als zusammengehörig wahrgenommen werden. Dementsprechend wollen wir zusammengehörige Elemente nebeneinander platzieren. Das Token-Guthaben ist direkt mit dem Token selbst verbunden und ändert sich, wann immer ein neuer Token ausgewählt wird. Es ist daher etwas sinnvoller, das Token-Guthaben neben der Token-Auswahlschaltfläche zu platzieren. Es könnte unter den Token verschoben werden, aber das bricht die Symmetrie des Layouts.

Letztendlich gibt es für beide Optionen Vor- und Nachteile, aber es ist interessant, wie der Trend zum Token auf der rechten Seite zu gehen scheint.

## Verhalten der Schaltfläche {#button-behavior}

Haben Sie keine separate Schaltfläche für „Genehmigen“. Haben Sie auch keinen separaten Klick für „Genehmigen“. Der Benutzer möchte tauschen, also sagen Sie einfach „Tauschen“ auf der Schaltfläche und initiieren Sie die Genehmigung als ersten Schritt. Ein Modal kann den Fortschritt mit einem Stepper oder einer einfachen „Tx 1 von 2 – genehmigt“-Benachrichtigung anzeigen.

![Eine Benutzeroberfläche mit separaten Schaltflächen für Genehmigen und Tauschen](./14.png)

![Eine Benutzeroberfläche mit einer Schaltfläche, die „Genehmigen“ anzeigt](./15.png)

### Schaltfläche als kontextbezogene Hilfe {#button-as-contextual-help}

Die Schaltfläche kann auch als Warnung dienen!

Dies ist eigentlich ein ziemlich ungewöhnliches Designmuster außerhalb von Web3, hat sich aber darin zum Standard entwickelt. Dies ist eine gute Innovation, da sie Platz spart und die Aufmerksamkeit fokussiert hält.

Wenn die Hauptaktion – TAUSCHEN – aufgrund eines Fehlers nicht verfügbar ist, kann der Grund mit der Schaltfläche erklärt werden, z. B.:

- Netzwerk wechseln
- Wallet verbinden
- verschiedene Fehler

Die Schaltfläche kann auch **der auszuführenden Aktion zugeordnet werden**. Wenn der Benutzer zum Beispiel nicht tauschen kann, weil er sich im falschen Netzwerk befindet, sollte auf der Schaltfläche „Zu Ethereum wechseln“ stehen, und wenn der Benutzer auf die Schaltfläche klickt, sollte das Netzwerk auf Ethereum umgeschaltet werden. Dies beschleunigt den Benutzerfluss erheblich.

![Schlüsselaktionen, die vom Haupt-CTA initiiert werden](./16.png)

![Fehlermeldung, die im Haupt-CTA angezeigt wird](./17.png)

## Erstellen Sie Ihre eigene mit dieser Figma-Datei {#build-your-own-with-this-figma-file}

Dank der harten Arbeit mehrerer Protokolle hat sich das DEX-Design stark verbessert. Wir wissen, welche Informationen der Benutzer benötigt, wie wir sie anzeigen sollten und wie wir den Ablauf so reibungslos wie möglich gestalten können.
Hoffentlich bietet dieser Artikel einen soliden Überblick über die UX-Prinzipien.

Wenn Sie experimentieren möchten, können Sie gerne das Figma-Wireframe-Kit verwenden. Es ist so einfach wie möglich gehalten, bietet aber genügend Flexibilität, um die Grundstruktur auf verschiedene Weisen aufzubauen.

[Figma Wireframe-Kit](https://www.figma.com/community/file/1393606680816807382/dex-wireframes-kit)

DeFi wird sich weiterentwickeln, und es gibt immer Raum für Verbesserungen.

Viel Erfolg!
