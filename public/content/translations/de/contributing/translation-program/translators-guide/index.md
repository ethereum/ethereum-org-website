---
title: "Leitfaden für Übersetzer"
lang: de
description: "Anweisungen und Tipps für Übersetzer von ethereum.org"
---

# Ethereum.org Übersetzungs-Styleguide {#style-guide}

Der Übersetzungs-Styleguide von ethereum.org enthält einige der wichtigsten Richtlinien, Anweisungen und Tipps für Übersetzer, die uns bei der Lokalisierung der Website helfen.

Dieses Dokument dient als allgemeiner Leitfaden und ist nicht auf eine bestimmte Sprache beschränkt.

Wenn Sie Fragen, Vorschläge oder Feedback haben, können Sie uns gerne unter translations@ethereum.org kontaktieren, eine Nachricht an @ethdotorg auf Crowdin senden oder [unserem Discord beitreten](https://discord.gg/ethereum-org), wo Sie uns im Kanal #translations eine Nachricht schreiben oder sich an ein beliebiges Teammitglied wenden können.

## Crowdin verwenden {#using-crowdin}

Grundlegende Anweisungen zur Teilnahme am Projekt in Crowdin und zur Verwendung des Crowdin-Online-Editors finden Sie auf der Seite [Übersetzungsprogramm](/contributing/translation-program/#how-to-translate).

Wenn Sie mehr über Crowdin und die Nutzung einiger seiner erweiterten Funktionen erfahren möchten, enthält die [Crowdin-Wissensdatenbank](https://support.crowdin.com/online-editor/) viele ausführliche Leitfäden und Übersichten über alle Crowdin-Funktionen.

## Die Essenz der Nachricht erfassen {#capturing-the-essence}

Vermeiden Sie bei der Übersetzung von Inhalten auf ethereum.org wörtliche Übersetzungen.

Es ist wichtig, dass die Übersetzungen die Essenz der Nachricht erfassen. Dies könnte bedeuten, bestimmte Phrasen umzuformulieren oder beschreibende Übersetzungen zu verwenden, anstatt den Inhalt Wort für Wort zu übersetzen.

Verschiedene Sprachen haben unterschiedliche Grammatikregeln, Konventionen und Wortstellungen. Achten Sie beim Übersetzen bitte darauf, wie Sätze in den Zielsprachen strukturiert sind, und vermeiden Sie es, den englischen Ausgangstext wörtlich zu übersetzen, da dies zu einer schlechten Satzstruktur und Lesbarkeit führen kann.

Anstatt den Ausgangstext Wort für Wort zu übersetzen, wird empfohlen, den gesamten Satz zu lesen und ihn an die Konventionen der Zielsprache anzupassen.

## Formell vs. informell {#formal-vs-informal}

Wir verwenden die formelle Anrede (Siezen), die immer höflich und für alle Besucher angemessen ist.

Die Verwendung der formellen Anrede ermöglicht es uns, nicht inoffiziell oder anstößig zu klingen, und funktioniert unabhängig von Alter und Geschlecht des Besuchers.

Die meisten indogermanischen und afroasiatischen Sprachen verwenden geschlechtsspezifische Personalpronomen der zweiten Person, die zwischen männlich und weiblich unterscheiden. Wenn wir den Benutzer ansprechen oder Possessivpronomen verwenden, können wir vermeiden, das Geschlecht des Besuchers vorauszusetzen, da die formelle Anrede allgemein anwendbar und konsistent ist, unabhängig davon, wie er sich identifiziert.

## Einfaches und klares Vokabular und Bedeutung {#simple-vocabulary}

Unser Ziel ist es, die Inhalte auf der Website für so viele Menschen wie möglich verständlich zu machen.

In den meisten Fällen lässt sich dies leicht durch die Verwendung kurzer und einfacher Wörter erreichen, die leicht verständlich sind. Wenn es in Ihrer Sprache mehrere mögliche Übersetzungen für ein bestimmtes Wort mit derselben Bedeutung gibt, ist die beste Option meistens das kürzeste Wort, das die Bedeutung klar widerspiegelt.

## Schriftsystem {#writing-system}

Ethereum.org ist in einer Reihe von Sprachen verfügbar, die alternative Schriftsysteme (oder Schriften) zum Lateinischen verwenden.

Der gesamte Inhalt sollte mit dem korrekten Schriftsystem für Ihre Sprache übersetzt werden und keine Wörter enthalten, die mit lateinischen Zeichen geschrieben sind.

Bei der Übersetzung der Inhalte sollten Sie sicherstellen, dass die Übersetzungen konsistent sind und keine lateinischen Zeichen enthalten.

Ein weit verbreiteter Irrglaube ist, dass Ethereum immer in lateinischer Schrift geschrieben werden sollte. Dies ist meistens falsch. Bitte verwenden Sie die Schreibweise von Ethereum, die in Ihrer Sprache üblich ist (z. B. 以太坊 auf Chinesisch, إيثيريوم auf Arabisch usw.).

**Das Obige gilt nicht für Sprachen, in denen Eigennamen in der Regel nicht übersetzt werden sollten.**

## Seiten-Metadaten übersetzen {#translating-metadata}

Einige Seiten enthalten Metadaten auf der Seite, wie 'title', 'lang', 'description', 'sidebar' usw.

Wir verbergen die Inhalte, die Übersetzer niemals übersetzen sollten, wenn wir neue Seiten auf Crowdin hochladen. Das bedeutet, dass alle Metadaten, die für Übersetzer in Crowdin sichtbar sind, übersetzt werden sollten.

Bitte seien Sie besonders achtsam, wenn Sie Zeichenfolgen übersetzen, bei denen der Ausgangstext 'en' lautet. Dies stellt die Sprache dar, in der die Seite verfügbar ist, und sollte in den [ISO-Sprachcode für Ihre Sprache](https://www.andiamo.co.uk/resources/iso-language-codes/) übersetzt werden. Diese Zeichenfolgen sollten immer mit lateinischen Zeichen übersetzt werden, nicht mit der in der Zielsprache üblichen Schrift.

Wenn Sie sich nicht sicher sind, welchen Sprachcode Sie verwenden sollen, können Sie das Translation Memory in Crowdin überprüfen oder den Sprachcode für Ihre Sprache in der URL der Seite im Crowdin-Online-Editor finden.

Einige Beispiele für Sprachcodes der am weitesten verbreiteten Sprachen:

- Arabisch - ar
- Vereinfachtes Chinesisch - zh
- Französisch - fr
- Hindi - hi
- Spanisch - es

## Titel externer Artikel {#external-articles}

Einige Zeichenfolgen enthalten Titel externer Artikel. Die meisten unserer Seiten mit Entwicklerdokumentationen enthalten Links zu externen Artikeln zum Weiterlesen. Die Zeichenfolgen, die Titel von Artikeln enthalten, müssen unabhängig von der Sprache des Artikels übersetzt werden, um den Besuchern, die die Seite in ihrer Sprache betrachten, ein konsistenteres Benutzererlebnis zu bieten.

Nachfolgend finden Sie einige Beispiele dafür, wie diese Zeichenfolgen für Übersetzer aussehen und wie Sie sie identifizieren können (Links zu Artikeln finden Sie meistens unten auf diesen Seiten im Abschnitt 'Weiterführende Literatur'):

![Article titles in sidebar.png](./article-titles-in-sidebar.png)
![Article titles in editor.png](./article-titles-in-editor.png)

## Crowdin-Warnungen {#crowdin-warnings}

Crowdin verfügt über eine integrierte Funktion, die Übersetzer warnt, wenn sie im Begriff sind, einen Fehler zu machen. Crowdin warnt Sie automatisch davor, bevor Sie Ihre Übersetzung speichern, wenn Sie vergessen, ein Tag aus dem Ausgangstext einzufügen, Elemente übersetzen, die nicht übersetzt werden sollten, mehrere aufeinanderfolgende Leerzeichen hinzufügen, Satzzeichen am Ende vergessen usw.
Wenn Sie eine solche Warnung sehen, gehen Sie bitte zurück und überprüfen Sie die vorgeschlagene Übersetzung noch einmal.

**Ignorieren Sie diese Warnungen niemals, da sie normalerweise bedeuten, dass etwas nicht stimmt oder dass in der Übersetzung ein wichtiger Teil des Ausgangstextes fehlt.**

Ein Beispiel für eine Crowdin-Warnung, wenn Sie vergessen, Ihrer Übersetzung ein Tag hinzuzufügen:
![Example of a Crowdin warning](./crowdin-warning-example.png)

## Umgang mit Tags und Code-Snippets {#dealing-with-tags}

Ein Großteil des Ausgangsinhalts enthält Tags und Variablen, die im Crowdin-Editor gelb hervorgehoben sind. Diese erfüllen unterschiedliche Funktionen und sollten richtig behandelt werden.

**Crowdin-Einstellungen**

Um die Verwaltung von Tags zu erleichtern und sie direkt aus der Quelle zu kopieren, empfehlen wir, Ihre Einstellungen im Crowdin-Editor zu ändern.

1. Öffnen Sie die Einstellungen
   ![How to open settings in the editor](./editor-settings.png)

2. Scrollen Sie nach unten zum Abschnitt 'HTML tags displaying' (HTML-Tags anzeigen)

3. Wählen Sie 'Hide' (Verbergen)
   ![Please select 'Hide'](./hide-tags.png)

4. Klicken Sie auf 'Save' (Speichern)

Wenn Sie diese Option auswählen, wird der vollständige Tag-Text nicht mehr angezeigt und durch eine Zahl ersetzt.
Beim Übersetzen wird durch Klicken auf dieses Tag automatisch das genaue Tag in das Übersetzungsfeld kopiert.

**Links**

Möglicherweise bemerken Sie vollständige Links zu Seiten auf ethereum.org oder anderen Websites.

Diese sollten mit der Quelle identisch sein und nicht geändert oder übersetzt werden. Wenn Sie einen Link übersetzen oder in irgendeiner Weise ändern, selbst wenn Sie nur einen Teil davon entfernen, wie z. B. einen Schrägstrich (/), führt dies zu fehlerhaften und unbrauchbaren Links.

Der beste Weg, mit Links umzugehen, besteht darin, sie direkt aus der Quelle zu kopieren, entweder indem Sie darauf klicken oder die Schaltfläche „Copy Source“ (Quelle kopieren) (Alt+C) verwenden.

![Example of link.png](./example-of-link.png)

Links erscheinen im Ausgangstext auch in Form von Tags (d. h. `<0>` `</0>`). Wenn Sie mit der Maus über das Tag fahren, zeigt der Editor seinen vollständigen Inhalt an – manchmal stellen diese Tags Links dar.

Es ist sehr wichtig, die Links aus der Quelle zu kopieren und ihre Reihenfolge nicht zu ändern.

Wenn die Reihenfolge der Tags geändert wird, ist der Link, den sie darstellen, fehlerhaft.

![Example of links inside tags.png](./example-of-links-inside-tags.png)

**Tags und Variablen**

Der Ausgangstext enthält viele verschiedene Arten von Tags, die immer aus der Quelle kopiert und niemals geändert werden sollten. Ähnlich wie oben sollte auch die Reihenfolge dieser Tags in der Übersetzung mit der Quelle übereinstimmen.

Tags enthalten immer ein öffnendes und ein schließendes Tag. In den meisten Fällen sollte der Text zwischen öffnenden und schließenden Tags übersetzt werden.

Beispiel: `<strong x-id="1">`dezentralisiert`</strong>`

`<strong x-id="1">` - _Öffnendes Tag, das den Text fett macht_

dezentralisiert - _Übersetzbarer Text_

`</strong>` - _Schließendes Tag_

![Example of 'strong' tags.png](./example-of-strong-tags.png)

Code-Snippets sollten etwas anders behandelt werden als die anderen Tags, da sie Code enthalten, der nicht übersetzt werden sollte.

Beispiel: `<code>`Nonce`</code>`

`<code>` - _Öffnendes Tag, das ein Code-Snippet enthält_

Nonce - _Nicht übersetzbarer Text_

`</code>` - _Schließendes Tag_

![Example of code snippets.png](./example-of-code-snippets.png)

Der Ausgangstext enthält auch verkürzte Tags, die nur Zahlen enthalten, was bedeutet, dass ihre Funktion nicht sofort ersichtlich ist. Sie können mit der Maus über diese Tags fahren, um genau zu sehen, welche Funktion sie erfüllen.

Im folgenden Beispiel können Sie sehen, dass das Bewegen der Maus über das `<0>`-Tag zeigt, dass es `<code>` darstellt und ein Code-Snippet enthält. Daher sollte der Inhalt innerhalb dieser Tags nicht übersetzt werden.

![Example of ambiguous tags.png](./example-of-ambiguous-tags.png)

## Kurz- vs. Vollformen/Abkürzungen {#short-vs-full-forms}

Auf der Website werden viele Abkürzungen verwendet, z. B. Dapps, NFT, DAO, DeFi usw. Diese Abkürzungen werden im Englischen häufig verwendet und die meisten Besucher der Website sind damit vertraut.

Da es für sie in anderen Sprachen normalerweise keine etablierten Übersetzungen gibt, ist der beste Weg, mit diesen und ähnlichen Begriffen umzugehen, eine beschreibende Übersetzung der Vollform bereitzustellen und die englische Abkürzung in Klammern hinzuzufügen.

Übersetzen Sie diese Abkürzungen nicht, da die meisten Menschen nicht damit vertraut wären und die lokalisierten Versionen für die meisten Besucher keinen großen Sinn ergeben würden.

Beispiel für die Übersetzung von Dapps:

- dezentralisierte Anwendungen (Dapps) → _Übersetzte Vollform (englische Abkürzung in Klammern)_

## Begriffe ohne etablierte Übersetzungen {#terms-without-established-translations}

Einige Begriffe haben möglicherweise keine etablierten Übersetzungen in anderen Sprachen und sind unter dem ursprünglichen englischen Begriff weithin bekannt. Solche Begriffe umfassen meist neuere Konzepte wie Proof-of-Work, Proof-of-Stake, Beacon Chain, Staking usw.

Obwohl die Übersetzung dieser Begriffe unnatürlich klingen kann, da die englische Version auch in anderen Sprachen häufig verwendet wird, wird dringend empfohlen, sie zu übersetzen.

Fühlen Sie sich bei der Übersetzung frei, kreativ zu werden, beschreibende Übersetzungen zu verwenden oder sie einfach wörtlich zu übersetzen.

**Der Grund, warum die meisten Begriffe übersetzt werden sollten, anstatt einige auf Englisch zu belassen, ist die Tatsache, dass diese neue Terminologie in Zukunft weiter verbreitet sein wird, wenn mehr Menschen anfangen, Ethereum und verwandte Technologien zu nutzen. Wenn wir mehr Menschen aus der ganzen Welt in diesen Bereich einführen wollen, müssen wir verständliche Terminologie in so vielen Sprachen wie möglich bereitstellen, auch wenn wir sie selbst erstellen müssen.**

## Schaltflächen & CTAs {#buttons-and-ctas}

Die Website enthält zahlreiche Schaltflächen, die anders übersetzt werden sollten als andere Inhalte.

Schaltflächentext kann identifiziert werden, indem man sich die Kontext-Screenshots ansieht, die mit den meisten Zeichenfolgen verbunden sind, oder indem man den Kontext im Editor überprüft, der das Wort „button“ enthält.

Die Übersetzungen für Schaltflächen sollten so kurz wie möglich sein, um Formatierungsfehler zu vermeiden. Darüber hinaus sollten Schaltflächenübersetzungen im Imperativ stehen, d. h. einen Befehl oder eine Aufforderung darstellen.

![How to find a button.png](./how-to-find-a-button.png)

## Inklusiv übersetzen {#translating-for-inclusivity}

Besucher von ethereum.org kommen aus der ganzen Welt und haben unterschiedliche Hintergründe. Die Sprache auf der Website sollte daher neutral, für alle einladend und nicht exklusiv sein.

Ein wichtiger Aspekt dabei ist die Geschlechtsneutralität. Dies lässt sich leicht erreichen, indem man die formelle Anrede verwendet und geschlechtsspezifische Wörter in den Übersetzungen vermeidet.

Eine weitere Form der Inklusivität ist der Versuch, für ein globales Publikum zu übersetzen, das nicht auf ein bestimmtes Land, eine bestimmte Ethnie oder Region beschränkt ist.

Schließlich sollte die Sprache für alle Zielgruppen und Altersgruppen geeignet sein.

## Sprachspezifische Übersetzungen {#language-specific-translations}

Beim Übersetzen ist es wichtig, die Grammatikregeln, Konventionen und Formatierungen zu befolgen, die in Ihrer Sprache verwendet werden, anstatt sie aus der Quelle zu kopieren. Der Ausgangstext folgt den englischen Grammatikregeln und Konventionen, was auf viele andere Sprachen nicht anwendbar ist.

Sie sollten sich der Regeln für Ihre Sprache bewusst sein und entsprechend übersetzen. Wenn Sie Hilfe benötigen, wenden Sie sich an uns, und wir helfen Ihnen, einige Ressourcen darüber zu finden, wie diese Elemente in Ihrer Sprache verwendet werden sollten.

Einige Beispiele dafür, worauf Sie besonders achten sollten:

### Zeichensetzung, Formatierung {#punctuation-and-formatting}

**Groß- und Kleinschreibung**

- Es gibt große Unterschiede bei der Groß- und Kleinschreibung in verschiedenen Sprachen.
- Im Englischen ist es üblich, alle Wörter in Titeln und Namen, Monaten und Tagen, Sprachnamen, Feiertagen usw. großzuschreiben. In vielen anderen Sprachen ist dies grammatikalisch falsch, da sie andere Regeln für die Groß- und Kleinschreibung haben.
- Einige Sprachen haben auch Regeln zur Großschreibung von Personalpronomen, Substantiven und bestimmten Adjektiven, die im Englischen nicht großgeschrieben werden.

**Abstände**

- Orthografieregeln definieren die Verwendung von Leerzeichen für jede Sprache. Da Leerzeichen überall verwendet werden, gehören diese Regeln zu den unterschiedlichsten, und Leerzeichen gehören zu den am häufigsten falsch übersetzten Elementen.
- Einige häufige Unterschiede bei den Abständen zwischen Englisch und anderen Sprachen:
  - Leerzeichen vor Maßeinheiten und Währungen (z. B. USD, EUR, kB, MB)
  - Leerzeichen vor Gradzeichen (z. B. °C, ℉)
  - Leerzeichen vor einigen Satzzeichen, insbesondere den Auslassungspunkten (…)
  - Leerzeichen vor und nach Schrägstrichen (/)

**Listen**

- Jede Sprache hat vielfältige und komplexe Regeln für das Schreiben von Listen. Diese können sich erheblich vom Englischen unterscheiden.
- In einigen Sprachen muss das erste Wort jeder neuen Zeile großgeschrieben werden, während in anderen neue Zeilen mit Kleinbuchstaben beginnen sollten. Viele Sprachen haben auch unterschiedliche Regeln zur Groß- und Kleinschreibung in Listen, abhängig von der Länge jeder Zeile.
- Das Gleiche gilt für die Zeichensetzung von Listenelementen. Das Satzzeichen am Ende von Listen kann je nach Sprache ein Punkt (**.**), ein Komma (**,**) oder ein Semikolon (**;**) sein.

**Anführungszeichen**

- Sprachen verwenden viele verschiedene Anführungszeichen. Das einfache Kopieren der englischen Anführungszeichen aus der Quelle ist oft falsch.
- Zu den häufigsten Arten von Anführungszeichen gehören:
  - „Beispieltext“
  - ‚Beispieltext’
  - »Beispieltext«
  - “Beispieltext”
  - ‘Beispieltext’
  - «Beispieltext»

**Bindestriche und Gedankenstriche**

- Im Englischen wird ein Bindestrich (-) verwendet, um Wörter oder verschiedene Teile eines Wortes zu verbinden, während ein Gedankenstrich (–) verwendet wird, um einen Bereich oder eine Pause anzuzeigen.
- Viele Sprachen haben unterschiedliche Regeln für die Verwendung von Bindestrichen und Gedankenstrichen, die beachtet werden sollten.

### Formate {#formats}

**Zahlen**

- Der Hauptunterschied beim Schreiben von Zahlen in verschiedenen Sprachen ist das Trennzeichen, das für Dezimalstellen und Tausender verwendet wird. Für Tausender kann dies ein Punkt, ein Komma oder ein Leerzeichen sein. Ebenso verwenden einige Sprachen einen Dezimalpunkt, während andere ein Dezimalkomma verwenden.
  - Einige Beispiele für große Zahlen:
    - Englisch – **1,000.50**
    - Spanisch – **1.000,50**
    - Französisch – **1 000,50**
- Ein weiterer wichtiger Aspekt bei der Übersetzung von Zahlen ist das Prozentzeichen. Es kann auf verschiedene Arten geschrieben werden: **100%**, **100 %** oder **%100**.
- Schließlich können negative Zahlen je nach Sprache unterschiedlich dargestellt werden: -100, 100-, (100) oder [100].

**Daten**

- Bei der Übersetzung von Daten gibt es je nach Sprache eine Reihe von Überlegungen und Unterschieden. Dazu gehören das Datumsformat, das Trennzeichen, die Groß- und Kleinschreibung und führende Nullen. Es gibt auch Unterschiede zwischen ausgeschriebenen und numerischen Daten.
  - Einige Beispiele für verschiedene Datumsformate:
    - Englisch UK (TT/MM/JJJJ) – 1st January, 2022
    - Englisch US (MM/TT/JJJJ) – January 1st, 2022
    - Chinesisch (JJJJ-MM-TT) – 2022 年 1 月 1 日
    - Französisch (TT/MM/JJJJ) – 1er janvier 2022
    - Italienisch (TT/MM/JJJJ) – 1º gennaio 2022
    - Deutsch (TT/MM/JJJJ) – 1. Januar 2022

**Währungen**

- Die Übersetzung von Währungen kann aufgrund der unterschiedlichen Formate, Konventionen und Umrechnungen eine Herausforderung sein. Als allgemeine Regel gilt: Bitte behalten Sie die Währungen wie in der Quelle bei. Sie können Ihre lokale Währung und die Umrechnung in Klammern hinzufügen, um dem Leser zu helfen.
- Die Hauptunterschiede beim Schreiben von Währungen in verschiedenen Sprachen umfassen die Platzierung von Symbolen, Dezimalkommas vs. Dezimalpunkte, Abstände und Abkürzungen vs. Symbole.
  - Platzierung von Symbolen: $100 oder 100$
  - Dezimalkommas vs. Dezimalpunkte: 100,50$ oder 100.50$
  - Abstände: 100$ oder 100 $
  - Abkürzungen vs. Symbole: 100 $ oder 100 USD

**Maßeinheiten**

- Als allgemeine Regel gilt: Bitte behalten Sie die Maßeinheiten gemäß der Quelle bei. Wenn Ihr Land ein anderes System verwendet, können Sie die Umrechnung in Klammern angeben.
- Abgesehen von der Lokalisierung von Maßeinheiten ist es auch wichtig, die Unterschiede in der Herangehensweise von Sprachen an diese Einheiten zu beachten. Der Hauptunterschied ist der Abstand zwischen der Zahl und der Einheit, der je nach Sprache unterschiedlich sein kann. Beispiele hierfür sind 100kB vs. 100 kB oder 50ºF vs. 50 ºF.

## Fazit {#conclusion}

Die Übersetzung von ethereum.org ist eine großartige Gelegenheit, mehr über die verschiedenen Aspekte von Ethereum zu erfahren.

Versuchen Sie beim Übersetzen, sich nicht zu beeilen. Lassen Sie es ruhig angehen und haben Sie Spaß!

Vielen Dank, dass Sie sich am Übersetzungsprogramm beteiligen und uns helfen, die Website einem breiteren Publikum zugänglich zu machen. Die Ethereum-Community ist global, und wir freuen uns, dass Sie ein Teil davon sind!