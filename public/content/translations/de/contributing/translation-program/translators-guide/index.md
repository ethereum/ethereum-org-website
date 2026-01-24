---
title: Übersetzungsleitfaden
lang: de
description: Anweisungen und Tipps für ethereum.org-Übersetzer
---

# Ethereum.org Übersetzungsleitfaden {#style-guide}

Der Übersetzungsleitfaden von ethereum.org enthält die wichtigsten Richtlinien, Anweisungen und Tipps für Übersetzer, die uns bei der Lokalisierung der Website helfen.

Dieses Dokument dient als allgemeiner Leitfaden und ist nicht spezifisch für eine bestimmte Sprache.

Wenn Sie Fragen, Vorschläge oder Feedback haben, erreichen Sie uns unter translations@ethereum.org, senden Sie eine Nachricht an @ethdotorg auf Crowdin oder [treten Sie unserem Discord bei](https://discord.gg/ethereum-org). Dort können Sie uns im Kanal #translations eine Nachricht senden oder sich an eines der Teammitglieder wenden.

## Crowdin verwenden {#using-crowdin}

Grundlegende Anweisungen, wie Sie dem Projekt in Crowdin beitreten und wie Sie den Online-Editor von Crowdin verwenden, finden Sie auf der [Seite des Übersetzungsprogramms](/contributing/translation-program/#how-to-translate).

Wenn Sie mehr über Crowdin und die Nutzung einiger seiner erweiterten Funktionen erfahren möchten, enthält die [Crowdin-Wissensdatenbank](https://support.crowdin.com/online-editor/) viele ausführliche Anleitungen und Übersichten über alle Crowdin-Funktionen.

## Die Essenz der Nachricht erfassen {#capturing-the-essence}

Vermeiden Sie bei der Übersetzung von ethereum.org-Inhalten wörtliche Übersetzungen.

Es ist wichtig, dass die Übersetzung das Wesentliche einer Botschaft wiedergibt. Dazu gehört, dass bestimmte Formulierungen umformuliert oder beschreibende Übersetzungen verwendet werden, anstatt den Inhalt Wort für Wort zu übersetzen.

Verschiedene Sprachen haben unterschiedliche Grammatikregeln, Konventionen und Wortfolgen. Achten Sie bei der Übersetzung darauf, wie die Sätze in den Zielsprachen aufgebaut sin. Vermeiden Sie eine wörtliche Übersetzung des englischen Quelltextes, da das zu einer ungewohnten Satzstruktur und schlechteren Lesbarkeit führen kann.

Anstatt den Ausgangstext Wort für Wort zu übersetzen, empfiehlt es sich, den gesamten Satz zu lesen und ihn an die Konventionen der Zielsprache anzupassen.

## Formell vs. informell {#formal-vs-informal}

Wir verwenden die förmliche Anrede, die für alle Besucher stets höflich und angemessen ist.

Durch die förmliche Anrede lässt sich vermeiden, dass Formulierungen inoffiziell oder beleidigend klingen. Zudem funktioniert sie unabhängig von Alter und Geschlecht des Besuchers.

Die meisten indoeuropäischen und afroasiatischen Sprachen verwenden geschlechtsspezifische Personalpronomen der zweiten Person, die zwischen männlich und weiblich unterscheiden. Bei der Anrede von Benutzerinnen und Benutzern oder der Verwendung von Possessivpronomen können wir vermeiden, das Geschlecht anzunehmen, da die formale Anrede im Allgemeinen anwendbar und konsistent ist, unabhängig davon, wie er/sie/es sich identifiziert.

## Einfaches und klares Vokabular und Bedeutung {#simple-vocabulary}

Unser Ziel ist es, die Inhalte der Website für so viele Menschen wie möglich verständlich zu machen.

In den meisten Fällen lässt sich das ganz einfach durch die Verwendung kurzer und einfacher Worte erreichen, die leicht verständlich sind. Wenn es für ein bestimmtes Wort in Ihrer Sprache mehrere mögliche Übersetzungen mit der gleichen Bedeutung gibt, ist die beste Option meist das kürzeste Wort, das die Bedeutung klar wiedergibt.

## Schriftsystem {#writing-system}

Ethereum.org ist in einer Reihe von Sprachen verfügbar, die alternative Schriftsysteme (oder Schreibschriften) zum Lateinischen verwenden.

Der gesamte Inhalt sollte unter Verwendung des korrekten Schriftsystems für Ihre Sprache übersetzt werden und keine Wörter enthalten, die mit lateinischen Buchstaben geschrieben sind.

Wenn Sie den Inhalt übersetzen, sollten Sie sicherstellen, dass die Übersetzungen einheitlich sind und keine lateinischen Zeichen enthalten.

Ein gängiger Irrtum ist, dass Ethereum immer in Latein geschrieben werden sollte. Dies ist meistens falsch. Bitte verwenden Sie die Schreibweise von Ethereum, die in Ihrer Sprache üblich ist (z. B. 以太坊 auf Chinesisch, إيثيريوم auf Arabisch usw.).

**Die obigen Ausführungen gelten nicht für Sprachen, in denen Eigennamen in der Regel nicht übersetzt werden sollten.**

## Übersetzen von Seitenmetadaten {#translating-metadata}

Einige Seiten enthalten Metadaten wie "title", "lang", "description", "sidebar" usw. auf der Seite.

Wir blenden beim Hochladen neuer Seiten in Crowdin die Inhalte aus, die Übersetzer nicht übersetzen sollen. Das bedeutet, dass alle Metadaten, die für Übersetzer in Crowdin sichtbar sind, auch übersetzt werden sollen.

Seien Sie besonders aufmerksam, wenn Sie eine Zeichenfolgen übersetzen, deren Ausgangstext mit 'en' gekennzeichnet ist. Dies repräsentiert die Sprache, in der die Seite verfügbar ist, und sollte in den [ISO-Sprachcode für Ihre Sprache](https://www.andiamo.co.uk/resources/iso-language-codes/) übersetzt werden. Diese Zeichenfolgen sollten immer mit lateinischen Buchstaben übersetzt werden, nicht mit der Schreibschrift der Zielsprache.

Wenn Sie sich nicht sicher sind, welchen Sprachcode Sie verwenden sollten, können Sie das Translation Memory in Crowdin überprüfen oder den Sprachcode für Ihre Sprache auf der URL-Seite im Crowdin-Online-Editor finden.

Einige Beispiele für Sprachcodes für die am weitesten verbreiteten Sprachen:

- Arabisch - ar
- Vereinfachtes Chinesisch - zh
- Französisch - fr
- Hindi - hi
- Spanisch - es

## Titel externer Artikel {#external-articles}

Einige Strings enthalten Titel externer Artikel. Die meisten unserer Dokumentationsseiten für Entwickler enthalten Links zu externen Artikeln, um weiterführende Informationen zu bieten. Die Zeichenketten, die die Titel der Artikel enthalten, müssen unabhängig von der Sprache des Artikels übersetzt werden, um eine einheitliche Benutzererfahrung für die Besucher zu gewährleisten, die die Seite in ihrer Sprache ansehen.

Im Folgenden finden Sie einige Beispiele dafür, wie diese Zeichenfolgen für Übersetzer aussehen und wie sie zu erkennen sind (Links zu den Artikeln finden Sie meist am Ende dieser Seiten im Abschnitt "Weiterführende Literatur"):

![Artikeltitel in der Seitenleiste.png](./article-titles-in-sidebar.png)
![Artikeltitel im Editor.png](./article-titles-in-editor.png)

## Crowdin-Warnungen {#crowdin-warnings}

Crowdin verfügt über eine eingebaute Funktion, die Übersetzer warnt, wenn sie im Begriff sind, einen Fehler zu machen. Crowdin warnt Sie automatisch, bevor Sie Ihre Übersetzung speichern, wenn Sie vergessen, ein Tag aus der Quelle einzubinden, Elemente übersetzen, die nicht übersetzt werden sollten, mehrere aufeinander folgende Leerzeichen hinzufügen, Ende-Satzzeichen vergessen usw.
Wenn Sie eine solche Warnung sehen, gehen Sie zurück und überprüfen Sie die vorgeschlagene Übersetzung nochmals.

**Ignorieren Sie diese Warnungen nicht, denn sie bedeuten in der Regel, dass etwas falsch ist oder dass in der Übersetzung ein wichtiger Teil des Ausgangstextes fehlt.**

Ein Beispiel für eine Crowdin-Warnung, wenn Sie vergessen, Ihrer Übersetzung ein Tag hinzuzufügen:
![Beispiel für eine Crowdin-Warnung](./crowdin-warning-example.png)

## Umgang mit Tags und Codeausschnitten {#dealing-with-tags}

Ein großer Teil des Quellinhalts enthält Tags und Variablen, die im Crowdin-Editor gelb hervorgehoben sind. Diese haben unterschiedliche Funktionen und sollten richtig angegangen werden.

**Crowdin-Einstellungen**

Um die Verwaltung von Tags zu erleichtern und diese direkt aus der Quelle zu kopieren, empfehlen wir Ihnen, Ihre Einstellungen im Crowdin-Editor zu ändern.

1. Einstellungen öffnen
   ![So öffnen Sie die Einstellungen im Editor](./editor-settings.png)

2. Scrollen Sie nach unten zum Abschnitt „HTML-Tags Anzeige"

3. 'Ausblenden' auswählen
   ![Bitte 'Ausblenden' auswählen](./hide-tags.png)

4. Klicken Sie auf „Speichern"

Durch Auswahl dieser Option wird der vollständige Tag-Text nicht mehr angezeigt und durch eine Zahl ersetzt.
Beim Übersetzen wird der exakte Tag automatisch in das Übersetzungsfeld kopiert, wenn der Tag angeklickt wird.

**Links**

Sie finden möglicherweise vollständige Links zu Seiten auf ethereum.org oder anderen Websites.

Sie sollten mit der Quelle identisch sein und nicht verändert oder übersetzt werden. Wenn Sie einen Link übersetzen oder ihn in irgendeiner Weise verändern, selbst wenn Sie nur einen Teil davon entfernen, wie z. B. einen Schrägstrich (/), führt das zu fehlerhaften und unbrauchbaren Links.

Am besten ist es, Links direkt aus der Quelle zu kopieren, entweder durch Anklicken oder mit der Schaltfläche „Copy Source" (Quelle kopieren) (Alt+C).

![Beispiel für einen Link.png](./example-of-link.png)

Links erscheinen im Quelltext auch in Form von Tags (d. h. `<0>` `</0>`). Wenn Sie mit dem Mauszeiger über das Tag fahren, zeigt der Editor den vollständigen Inhalt an. Manchmal stellen diese Tags auch Links dar.

Es ist sehr wichtig, die Links aus der Quelle zu kopieren und die Reihenfolge nicht zu verändern.

Wird die Reihenfolge der Tags geändert, wird damit die Verbindung, die sie darstellen, aufgebrochen.

![Beispiel für Links innerhalb von Tags.png](./example-of-links-inside-tags.png)

**Tags und Variablen**

Der Quelltext enthält viele verschiedene Arten von Tags, die immer aus der Quelle kopiert und nicht verändert werden sollten. Ähnlich wie oben sollte auch die Reihenfolge dieser Tags in der Übersetzung mit der Quelle übereinstimmen.

Tags enthalten immer einen öffnenden und einen schließenden Tag. In den meisten Fällen sollte der Text zwischen öffnenden und schließenden Tags übersetzt werden.

Beispiel: `<strong x-id="1">`Dezentralisiert`</strong>`

`<strong x-id="1">` - _Öffnender Tag, der den Text fett macht_

Dezentralisiert - _Übersetzbarer Text_

`</strong>` - _Schließender Tag_

![Beispiel für 'strong'-Tags.png](./example-of-strong-tags.png)

CodeAusschnitte sollten etwas anders behandelt werden als die anderen Tags, da sie Code enthalten, der nicht übersetzt werden sollte.

Beispiel: `<code>`nonce`</code>`

`<code>` - _Öffnender Tag, der einen Code-Ausschnitt enthält_

nonce - _Nicht übersetzbarer Text_

`</code>` - _Schließender Tag_

![Beispiel für Codeausschnitte.png](./example-of-code-snippets.png)

Der Quelltext enthält auch verkürzte Tags, die nur Zahlen enthalten. Ihre Funktion ist dadurch nicht direkt ersichtlich. Sie können mit dem Mauszeiger über diese Tags fahren, um genau zu sehen, welche Funktion sie haben.

Im Beispiel unten sehen Sie, dass das Tag `<0>` beim Darüberfahren anzeigt, dass es `<code>` darstellt und einen Code-Ausschnitt enthält. Daher sollte der Inhalt innerhalb dieser Tags nicht übersetzt werden.

![Beispiel für mehrdeutige Tags.png](./example-of-ambiguous-tags.png)

## Kurz- vs. Langformen/Abkürzungen {#short-vs-full-forms}

Auf der Website werden viele Abkürzungen verwendet, z. B. Dapps, NFT, DAO, DeFi usw. Diese Abkürzungen werden im Englischen häufig verwendet und sind den meisten Besuchern der Website bekannt.

Da es für diese und ähnliche Begriffe in der Regel keine etablierten Übersetzungen in anderen Sprachen gibt, ist es am besten, eine beschreibende Übersetzung der vollständigen Form anzugeben und die englische Abkürzung in Klammern hinzuzufügen.

Übersetzen Sie diese Abkürzungen nicht, da die meisten Menschen damit nicht vertraut sind und die lokalisierten Versionen für die meisten Besucher nicht viel Sinn ergeben würden.

Beispiel für die Übersetzung von dApps:

- Dezentralisierte Anwendungen (Dapps) → _Übersetzte Vollform (englische Abkürzung in Klammern)_

## Begriffe ohne etablierte Übersetzungen {#terms-without-established-translations}

Für einige Begriffe gibt es möglicherweise keine etablierten Übersetzungen in anderen Sprachen und sie sind weithin unter dem englischen Originalbegriff bekannt. Diese Begriffe umfassen meist neuere Konzepte wie Proof ofWork, Proof of Stake, Beacon Chain, Staking usw.

Die Übersetzung dieser Begriffe kann zwar unnatürlich klingen, da aber die englische Version auch in anderen Sprachen häufig verwendet wird, ist es sehr empfehlenswert, sie zu übersetzen.

Wenn Sie sie übersetzen, können Sie kreativ sein, beschreibende Übersetzungen verwenden oder einfach wörtlich übersetzen.

**Es ist sinnvoll, die meisten Begriffe zu übersetzen, anstatt sie auf Englisch zu belassen, da diese neue Terminologie sich zukünftig stärker verbreitet, wenn mehr Menschen Ethereum und zugehörige Technologien nutzen. Wenn wir mehr Menschen aus der ganzen Welt für diesen Bereich gewinnen wollen, müssen wir eine verständliche Terminologie in so vielen Sprachen wie möglich anbieten, auch wenn wir sie selbst erstellen müssen.**

## Schaltflächen & CTAs {#buttons-and-ctas}

Die Website enthält zahlreiche Schaltflächen, die anders übersetzt werden sollten als andere Inhalte.

Schaltflächentext kann identifiziert werden, indem Sie sich die zugehörigen Kontext-Screenshots ansehen oder den Kontext im Editor überprüfen, der den Ausdruck „Button“ enthält.

Die Übersetzungen für Schaltflächen sollten so kurz wie möglich sein, um Formatierungsfehler zu vermeiden. Zudem sollten Übersetzungen von Schaltflächen im Imperativ stehen, d. h. einen Befehl oder eine Aufforderung darstellen.

![So finden Sie eine Schaltfläche.png](./how-to-find-a-button.png)

## Inklusives Übersetzen {#translating-for-inclusivity}

Die Besucher von ethereum.org kommen aus der ganzen Welt und haben ganz unterschiedliche Hintergründe. Die Sprache auf der Website sollte daher neutral, einladend für alle und nicht ausschließend sein.

Ein wichtiger Aspekt dabei ist die Geschlechterneutralität. Das lässt sich leicht erreichen, indem die formale Anrede benutzt und geschlechtsspezifische Wörter in den Übersetzungen vermieden werden.

Eine andere Möglichkeit der Inklusion ist der Versuch, für ein globales Publikum zu übersetzen, das nicht auf ein Land, eine Rasse oder eine Region festgelegt ist.

Schließlich sollte die Sprache für jedes Publikum und Alter geeignet sein.

## Sprachspezifische Übersetzungen {#language-specific-translations}

Bei der Übersetzung ist es wichtig, die Grammatikregeln, Konventionen und die Formatierung in Ihrer Sprache zu befolgen und diese nicht von der Quelle zu übernehmen. Der Ausgangstext folgt den englischen Grammatikregeln und -konventionen, die in vielen anderen Sprachen nicht gelten.

Sie sollten mit den Regeln für Ihre Sprache vertraut sein und entsprechend übersetzen. Wenn Sie Hilfe benötigen, wende Sie sich an uns. Wir unterstützen Sie dabei, Ressourcen zu finden, wie diese Elemente in Ihrer Sprache einzusetzen sind.

Einige Beispiele dafür, worauf besonders zu achten ist:

### Zeichensetzung, Formatierung {#punctuation-and-formatting}

**Groß-/Kleinschreibung**

- Es gibt große Unterschiede in der Groß- und Kleinschreibung in verschiedenen Sprachen.
- Im Englischen ist es üblich, alle Wörter in Titeln und Namen, Monaten und Tagen, Sprachnamen, Feiertagen usw. groß zu schreiben. In vielen anderen Sprachen ist das grammatikalisch nicht korrekt, da es abweichende Regeln für die Groß- und Kleinschreibung gibt.
- Einige Sprachen haben auch Regeln für die Großschreibung von Personalpronomen, Substantiven und bestimmten Adjektiven, die im Englischen nicht großgeschrieben werden.

**Abstände**

- Die Rechtschreibregeln legen die Verwendung von Leerzeichen für jede Sprache fest. Leerzeichen werden überall verwendet und folgen in jeder Sprache anderen Regeln. Leerzeichen gehören zu den am häufigsten falsch übersetzten Elementen.
- Einige häufige Unterschiede in den Abständen zwischen dem Englischen und anderen Sprachen:
  - Leerzeichen vor Maßeinheiten und Währungen (z. B. USD, EUR, kB, MB)
  - Leerzeichen vor Gradzeichen (z. B. °C, ℉)
  - Leerzeichen vor einigen Satzzeichen, insbesondere vor der Ellipse (...)
  - Leerzeichen vor und nach Schrägstrichen (/)

**Listen**

- Jede Sprache hat vielfältige und komplexe Regeln für die Erstellung von Listen. Diese können sich erheblich vom Englischen unterscheiden.
- In einigen Sprachen muss das erste Wort jeder neuen Zeile groß geschrieben werden, während in anderen Sprachen neue Zeilen mit Kleinbuchstaben beginnen sollten. Viele Sprachen haben auch unterschiedliche Regeln für die Groß- und Kleinschreibung in Listen, je nach Länge der einzelnen Zeilen.
- Das Gleiche gilt für die Interpunktion von Zeilenelementen. Das abschließende Satzzeichen in Listen kann je nach Sprache ein Punkt (.), ein Komma (,) oder ein Semikolon (;) sein.

**Anführungszeichen**

- In den Sprachen werden viele verschiedene Anführungszeichen verwendet. Das einfache Kopieren der englischen Anführungszeichen aus der Quelle ist oft nicht korrekt.
- Zu den gängigsten Arten von Anführungszeichen gehören:
  - „Beispieltext“
  - ‚Beispieltext’
  - »Beispieltext«
  - “Beispieltext”
  - ‘Beispieltext’
  - «Beispieltext»

**Bindestriche und Gedankenstriche**

- Im Englischen wird ein Bindestrich (-) verwendet, um Wörter oder verschiedene Teile eines Wortes zu verbinden, während ein Gedankenstrich (–) verwendet wird, um einen Bereich abzugrenzen oder eine Pause zu signalisieren.
- Viele Sprachen haben unterschiedliche Regeln für die Verwendung von Bindestrichen und Gedankenstrichen, die es zu beachten gilt.

### Formate {#formats}

**Zahlen**

- Der Hauptunterschied bei der Schreibweise von Zahlen in verschiedenen Sprachen ist das Trennzeichen für Dezimalstellen und Tausender. Als Tausendertrennzeichen kann das ein Punkt, ein Komma oder ein Leerzeichen verwendet werden. Ebenso verwenden einige Sprachen einen Dezimalpunkt, andere ein Dezimalkomma.
  - Einige Beispiele für große Zahlen:
    - Englisch – **1,000.50**
    - Spanisch – **1.000,50**
    - Französisch – **1 000,50**
- Ebenfalls wichtig bei der Übersetzung von Zahlen ist das Prozentzeichen. Es kann auf verschiedene Weisen geschrieben werden: **100%**, **100 %** oder **%100**.
- Und abschließend können auch negative Zahlen je nach Sprache unterschiedlich dargestellt werden: -100, 100-, (100) oder [100].

**Datumsangaben**

- Bei der Übersetzung von Datumsangaben gibt es eine Reihe von Unterschieden und Überlegungen, die von der jeweiligen Sprache abhängen. Dazu gehören das Datumsformat, das Trennzeichen, die Großschreibung und führende Nullen. Es gibt auch Unterschiede zwischen den Datumsangaben in voller Länge und den numerischen Daten.
  - Einige Beispiele für verschiedene Datumsformate:
    - Englisch UK (dd/mm/yyyy) – 1st January, 2022
    - Englisch US (mm/dd/yyyy) – January 1st, 2022
    - Chinesisch (yyyy-mm-dd) – 2022 年 1 月 1 日
    - Französisch (dd/mm/yyyy) – 1er janvier 2022
    - Italienisch (dd/mm/yyyy) – 1º gennaio 2022
    - Deutsch (dd/mm/yyyy) – 1. Januar 2022

**Währungen**

- Die Übersetzung von Währungen kann aufgrund der unterschiedlichen Formate, Konventionen und Umrechnungen eine Herausforderung darstellen. In der Regel sollten die Währungen mit der Quelle übereinstimmen. Sie können Ihre Landeswährung und die Umrechnung in Klammern hinzufügen, um dem Leser mehr Informationen zu bieten.
- Zu den wichtigsten Unterschieden bei der Schreibweise von Währungen in verschiedenen Sprachen gehören die Platzierung von Symbolen, Kommas und Dezimalpunkten, Abstände und Abkürzungen oder die Verwendung von Symbolen.
  - Symbolplatzierung: $100 oder 100$
  - Dezimal-Kommas vs. Dezimal-Punkte: 100,50$ oder 100.50$
  - Abstände: 100$ oder 100 $
  - Abkürzungen oder Symbole: 100 $ oder 100 USD

**Maßeinheiten**

- Als allgemeine Regel gilt, dass die Maßeinheiten aus der Quelle beibehalten werden sollten. Wenn in Ihrem Land ein anderes System verwendet wird, können Sie die Umrechnung in Klammern angeben.
- Abgesehen von der Lokalisierung von Maßeinheiten sollte ebenfalls beachtet werden, wie unterschiedlich die Herangehensweise bei diesen Einheiten in den verschiedenen Sprachen ist. Der Hauptunterschied ist der Abstand zwischen der Zahl und der Einheit, der je nach Sprache unterschiedlich sein kann. Beispiele hierfür sind 100kB vs. 100 kB oder 50ºF vs. 50 ºF.

## Fazit {#conclusion}

Das Übersetzen von ethereum.org ist eine gute Gelegenheit, die verschiedenen Aspekte von Ethereum kennenzulernen.

Versuchen Sie, beim Übersetzen langsam vorzugehen. Bleiben Sie locker und haben Sie Spaß dabei.

Vielen Dank, dass Sie sich am Übersetzungsprogramm beteiligen und uns helfen, die Website einem breiteren Publikum zugänglich zu machen. Die Ethereum-Community ist global, und wir freuen uns, dass Sie ein Teil davon sind.
