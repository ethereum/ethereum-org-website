---
title: Häufig gestellte Fragen zum Übersetzungsprogramm (FAQ)
lang: de
description: Häufig gestellte Fragen zum Übersetzungprogramm von ethereum.org
---

# Übersetzungsanleitung für ethereum.org {#translating-ethereum-guide}

Wenn Sie neu im Übersetzungsprogramm sind und zögern, sich einzubringen, finden Sie hier einige FAQs, die Ihnen den Einstieg erleichtern können. Sie finden in diesem Leitfaden Antworten auf häufig gestellte Fragen.

## Werde ich dafür bezahlt, wenn ich für ethereum.org übersetze? {#compensation}

Ethereum.org ist eine Open-Source-Website. Das bedeutet das jeder mitmachen und einen Beitrag dazu leisten kann.

Das Übersetzungprogramm von ethereum.org ist eine Ergänzung dazu. Dahinter steht eine ähnliche Philosophie.

Ziel des Übersetzungsprogramms ist es, Ethereum für jeden zugänglich zu machen, unabhängig davon welche Sprache man spricht. Zudem haben Personen, die mehrere Sprachen sprechen, damit die Möglichkeit, sich in das Ethereum-Ökosystem einzubringen und einen Beitrag zur Barrierefreiheit zu leisten.

Daher ist das Übersetzungsprogramm offen zugänglich. Die Mitarbeit erfolgt auf freiwilliger Basis und unbezahlt. Würden Übersetzer für die von ihnen übersetzten Wörter bezahlt, könnten wir nur Übersetzer mit ausreichend Erfahrung (also professionelle Übersetzer) dazu einladen, an dem Übersetzungsprogramm teilzunehmen. Damit würde das Übersetzungsprogramm Personen ausschließen und das steht der allgemeinen Zielsetzung entgegen: Jeder soll die Möglichkeit haben, teilzunehmen und sich am Ökosystem zu beteiligen.

Wir setzen alles daran, unseren Mitwirkenden eine erfolgreiche Teilnahme am Ethereum-Ökosystem zu ermöglichen. Es gibt viele nicht-monetäre Anreize wie: [angebotene POAPs](/contributing/translation-program/acknowledgements/#poap) und ein [Übersetzungszertifikat](/contributing/translation-program/acknowledgements/#certificate) sowie [Übersetzungsranglisten](/contributing/translation-program/acknowledgements/) und [die Nennung all unserer Übersetzer auf der Site](/contributing/translation-program/contributors/).

## Wie kann ich Strings mit `<HTML-Tags>` übersetzen? {#tags}

Nicht jeder String wird in reiner Textform geschrieben. Einige Strings bestehen aus gemischten Skripten wie HTML-Tags (`<0>`, `</0>`). Diese werden in der Regel für Hyperlinks oder alternative Formatierungen in der Mitte eines Satzes verwendet.

- Übersetzen Sie den Text innerhalb der Tags, aber nicht die Tags selbst. Alles, was zwischen `<` und `>` steht, darf nicht übersetzt oder entfernt werden.
- Um die Strings zu schützen, empfehlen wir, unten links auf die Schaltfläche "Copy Source" (Quelle kopieren) zu klicken. Damit wird der ursprüngliche String kopiert und in das Textfeld zur Übersetzung eingefügt. Auf diese Weise können Sie die Tags sehen. Das hilft dabei, Fehler zu vermeiden.

![Crowdin-Oberfläche mit hervorgehobener Schaltfläche "Copy Source" (Quelle kopieren)](./html-tag-strings.png)

Sie können die Position der Tags innerhalb der Zeichenkette verschieben, um sie an die richtige Position für Ihre Sprache zu bringen. Achten Sie dabei aber darauf, dass das ganze Tag an andere Stelle gebracht wird.

Ausführlichere Informationen zum Umgang mit Tags und Code-Ausschnitten finden Sie im [Übersetzungsleitfaden von ethereum.org](/contributing/translation-program/translators-guide/#dealing-with-tags).

## Woher kommen die Strings? {#strings}

Oft reichen die Quelltexte allein nicht aus, um eine genaue Übersetzung zu erstellen.

- Weitere Informationen finden Sie unter "Screenshots" und "Context". Im Quelltext-Abschnitt sehen Sie einen Screenshot. Darauf können Sie sehen, in welchem Kontext der String verwendet wird.
- Wenn Sie immer noch unsicher sind, setzen Sie eine Kennzeichnung im Bereich "Comment Section". [Sind Sie unsicher, wie Sie einen Kommentar hinterlassen?](#comment)

![Zeigt, wie Kontext per Screenshot für einen String bereitgestellt werden kann](./source-string.png)

![Ein Beispiel-Screenshot, der zu Kontextzwecken hinzugefügt wurde](./source-string-2.png)

## Wie kann ich Kommentare hinterlassen oder Fragen stellen? Ich möchte ein Problem oder einen Tippfehler melden... {#comment}

Wenn Sie eine bestimmte Zeichenfolge markieren möchten, die Aufmerksamkeit erfordert, können Sie einen Kommentar dazu verfassen.

- Klicken Sie oben rechts auf die zweite Schaltfläche. Die versteckte Registerkarte erscheint auf der rechten Seite. Hinterlassen Sie einen neuen Kommentar und aktivieren Sie unten das Kontrollkästchen "Issue" (Probleme). Sie können die Art des Problems angeben, indem Sie eine der Optionen aus dem Dropdown-Menü auswählen.
- Wenn Sie das Problem übermittelt haben, wird es unserem Team gemeldet. Wir werden das Problem beheben und Sie darüber informieren, indem wir auf Ihren Kommentar antworten und das Problem schließen.
- Wenn Sie eine fehlerhafte Übersetzung melden, werden die Übersetzung und die von Ihnen vorgeschlagene Alternative bei der nächsten Prüfung von einem Muttersprachler überprüft.

![Zeigt, wie Kommentare geschrieben und Probleme gemeldet werden können](./comment-issue.png)

## Was ist Translation Memory (TM)? {#translation-memory}

Translation Memory (TM) ist eine Funktion von Crowdin, die alle zuvor übersetzten Zeichenketten in [ethereum.org](http://ethereum.org/) speichert. Wenn eine Zeichenkette übersetzt wird, wird sie automatisch in unserem Projekt-TM gespeichert. Das ist ein nützliches Werkzeug, mit dem sich beim Übersetzen Zeit sparen lässt.

- Im Abschnitt "TM and MT Suggestions" (TM und maschinell übersetzte Vorschläge) können Sie sehen, wie andere Übersetzer den gleichen oder einen ähnlichen Satz übersetzt haben. Wenn Sie einen Vorschlag mit einer hohen Übereinstimmungsrate finden, können Sie diese Übersetzung verwenden, indem Sie darauf klicken.
- Wenn die Liste keine Einträge zeigt, können Sie den Übersetzungsspeicher nach bereits erstellten Übersetzungen durchsuchen und sie wiederverwenden, um Einheitlichkeit zu gewährleisten.

![Ein Screenshot des Übersetzungsspeichers](./translation-memory.png)

## Wie benutze ich das Crowdin-Glossar? {#glossary}

Die Terminologie von Ethereum ist ein weiterer entscheidender Bestandteil unserer Übersetzungsarbeit, da neue technologische Begriffe in anderen Sprachen häufig noch nicht lokalisiert sind. Außerdem gibt es Begriffe, die in verschiedenen Kontexten unterschiedliche Bedeutungen haben. [Weitere Informationen zur Übersetzung der Ethereum-Terminologie](#terminology).

Das Crowding-Glossar ist der beste Ort, um Begriffe und Definitionen besser zu verstehen. Es gibt zwei Wege, um das Glossar zu nutzen.

- Erste Möglichkeit: Wenn ein Begriff im Quelltext unterstrichen ist, können Sie mit der Maus darüberfahren. Daraufhin wird eine kurze Definition angezeigt.

![Beispiel einer Glossardefinition](./glossary-definition.png)

- Zweite Möglichkeit: Wenn Sie einen Begriff sehen, der nicht unterstrichen und der Ihnen nicht geläufig ist, können Sie ihn über die Registerkarte "Glossary" (Glossar) (die dritte Schaltfläche in der rechten Spalte) suchen. Dort finden Sie Erklärungen zu bestimmten Begriffen, die im Rahmen des Projekts häufig verwendet werden.

![Ein Screenshot, der zeigt, wo die Registerkarte "Glossary" (Glossar) in Crowdin zu finden ist](./glossary-tab.png)

- Wenn Sie jedoch nichts finden können, dann ist das die Chance, einen neuen Begriff hinzuzufügen. Wir möchten Sie dazu ermuntern, den Begriff in einer Suchmaschine nachzuschlagen und die Beschreibung im Glossar hinzuzufügen. Das ist anderen Übersetzern eine große Hilfe, den Begriff besser zu verstehen.

![Ein Screenshot, der zeigt, wie Glossarbegriffe zu Crowdin hinzugefügt werden](./add-glossary-term.png)

### Übersetzungsrichtlinie für Eigennamen und Fachbegriffe {#terminology}

_Für Namen (Marken, Unternehmen, Personen) und neue technische Begriffe (Beacon Chain, Shard Chains etc.)_

Ethereum nutzt viele neue Begriffe, die erst in jüngster Zeit geprägt wurden. Einige Begriffe variieren von Übersetzer zu Übersetzer, da sich in ihrer jeweiligen Sprache noch keine offizielle Übersetzung etabliert hat. Diese Uneinheitlichkeit kann zu Missverständnissen führen und die Lesbarkeit beeinträchtigen.

Aufgrund der sprachlichen Vielfalt und unterschiedlichen Standardisierungen in jeder Sprache, ist es nahezu unmöglich eine einheitliche Übersetzungsrichtlinie für Terminologie zu entwickeln, die für alle unterstützten Sprachen angewendet werden kann.

Nach sorgfältiger Überlegung haben wir die Entscheidung getroffen, die am häufigsten verwendete Begriffe den Übersetzern zu überlassen.

Im Folgenden finden Sie die von uns vorgeschlagene Vorgehensweise, wenn Sie auf einen Begriff stoßen, der Ihnen nicht geläufig ist:

- Sehen Sie im [Glossar der Begriffe](#glossary) nach, wie andere Übersetzer den Begriff bereits übersetzt haben. Wenn Sie der Meinung sind, dass die Übersetzung des Begriffes nicht zutreffend ist, können Sie Ihre Übersetzung für den Begriff zum Crowdin-Glossar hinzufügen.
- Falls im Glossar noch keine Übersetzung vorhanden ist, empfehlen wir, den Begriff über eine Suchmaschine in öffentlichen Artikeln zu recherchieren, um herauszufinden, wie der Begriff in der Community tatsächlich verwendet wird.
- Wenn Sie keine Referenzen finden, vertrauen Sie auf Ihre Intuition und schlagen Sie eine neue Übersetzung in Ihrer Sprache vor.
- Wenn Sie sich das nicht zutrauen, dann belassen Sie den Begriff unübersetzt. Manchmal sind die englischen Begriffe für eine genaue Definition am passendsten.

Wir empfehlen, Namen von Marken, Unternehmen und Personen nicht zu übersetzen, da eine Übersetzung unnötige Verwirrung stiften und zu SEO-Schwierigkeiten führen kann.

## Wie funktioniert der Überprüfungsprozess? {#review-process}

Um ein bestimmtes Niveau und Konsistenz in unseren Überstzungen zu gewährleisten, arbeiten wir mit [Acolad](https://www.acolad.com/), einem der weltweit größten Übersetzungsdienstleister, zusammen. Acolad arbeitet mit mehr als 20.000 professionellen Sprachexperten zusammen. Das bedeutet, dass sie für jede Sprache und jede Art von Inhalten, die wir benötigen, professionelle Prüfer bereitstellen können.

Der Überprüfungsprozess ist unkompliziert. Sobald ein bestimmtes [Inhaltsgebiet](/contributing/translation-program/content-buckets) vollständig übersetzt ist, beauftragen wir die eine die Überprüfung dieser Inhalte. Der Überprüfungsprozess erfolgt direkt in Crowdin. Sobald die Überprüfung abgeschlossen ist aktualisieren wir die Website mit dem übersezten Inhalt.

## Wie kann ich Inhalte in meiner Sprache hinzufügen? {#adding-foreign-language-content}

Derzeit werden alle nicht-englischen Inhalte direkt vom englischen Quelltext übersetzt. Inhalte, die es nicht auf Englisch gibt, können nicht zu anderen Sprachen hinzugefügt werden.

Wenn Sie neue Inhalte für ethereum.org vorschlagen möchten, [erstellen Sie ein Thema](https://github.com/ethereum/ethereum-org-website/issues) auf GitHub. Wenn Sie hinzugefügt werden, dann wird der Inhalt auf Englisch geschrieben und über Crowdin in andere Sprachen übersetzt.

Wir planen, in naher Zukunft Unterstützung für nicht-englische Inhalte hinzuzufügen.

## Kontakt {#contact}

Vielen Dank, dass Sie sich die Inhalte oben angesehen haben. Wir hoffen, dass das hilfreich war, damit Sie sich an unserem Programm beteiligen können. Sie können unserem [Discord-Übersetzungskanal](https://discord.gg/XVepFu7sqR) beitreten, um Fragen zu stellen und mit anderen Übersetzern zusammenzuarbeiten. Sie können sich aber auch unter translations@ethereum.org an uns wenden.
