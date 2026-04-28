---
title: "Häufig gestellte Fragen (FAQ) zum Übersetzungsprogramm"
lang: de
description: "Häufig gestellte Fragen zum Übersetzungsprogramm von ethereum.org"
---

# Leitfaden zur Übersetzung von ethereum.org {#translating-ethereum-guide}

Wenn du neu im Übersetzungsprogramm bist und zögerst, direkt einzusteigen, findest du hier einige FAQs, die dir den Einstieg erleichtern können. Nutze diesen Leitfaden, um Antworten auf die häufigsten Fragen zu finden.

## Kann ich für die Übersetzung von ethereum.org vergütet werden? {#compensation}

Ethereum.org ist eine Open-Source-Website, was bedeutet, dass sich jeder beteiligen und einen Beitrag leisten kann.

Das Übersetzungsprogramm von ethereum.org ist eine Erweiterung davon und wird mit einer ähnlichen Philosophie organisiert.

Das Ziel des Übersetzungsprogramms ist es, Ethereum-Inhalte für jeden zugänglich zu machen, unabhängig davon, welche Sprachen er spricht. Es ermöglicht auch jeder zweisprachigen Person, sich im Ethereum-Ökosystem zu engagieren und auf zugängliche Weise einen Beitrag zu leisten.

Aus diesem Grund ist das Übersetzungsprogramm offen und freiwillig, und die Teilnahme wird nicht vergütet. Wenn wir Übersetzer für die Anzahl der übersetzten Wörter vergüten würden, könnten wir nur diejenigen mit ausreichender Übersetzungserfahrung (professionelle Übersetzer) einladen, dem Übersetzungsprogramm beizutreten. Dies würde das Übersetzungsprogramm exklusiv machen und uns daran hindern, die skizzierten Ziele zu erreichen, insbesondere: jedem die Teilnahme und das Engagement im Ökosystem zu ermöglichen.

Wir unternehmen alle Anstrengungen, um unseren Mitwirkenden den Erfolg im Ethereum-Ökosystem zu ermöglichen; es gibt viele nicht-monetäre Anreize, wie zum Beispiel: [das Anbieten von POAPs](/contributing/translation-program/acknowledgements/#poap) und einem [Übersetzerzertifikat](/contributing/translation-program/acknowledgements/#certificate), sowie die Organisation der [Übersetzungs-Bestenlisten](/contributing/translation-program/acknowledgements/) und [die Auflistung all unserer Übersetzer auf der Website](/contributing/translation-program/contributors/).

## Wie übersetze ich Zeichenfolgen mit `<HTML-Tags>`? {#tags}

Nicht jede Zeichenfolge ist in reiner Textform geschrieben. Es gibt einige Zeichenfolgen, die aus gemischten Skripten wie HTML-Tags (`<0>`, `</0>`) bestehen. Dies ist normalerweise für Hyperlinks oder alternative Formatierungen in der Mitte eines Satzes der Fall.

- Übersetze den Text innerhalb der Tags, aber nicht die Tags selbst. Alles in den `<` und `>` darf nicht übersetzt oder entfernt werden.
- Um die Zeichenfolge sicher zu halten, empfehlen wir dir, unten links auf die Schaltfläche „Copy Source“ (Quelle kopieren) zu klicken. Dadurch wird die ursprüngliche Zeichenfolge kopiert und in das Textfeld eingefügt. So kannst du klären, wo sich die Tags befinden, und Fehler vermeiden.

![Crowdin-Benutzeroberfläche mit hervorgehobener Schaltfläche zum Kopieren der Quelle](./html-tag-strings.png)

Du kannst die Position der Tags innerhalb der Zeichenfolge verschieben, damit es in deiner Sprache natürlicher klingt – achte nur darauf, das gesamte Tag zu verschieben.

Weitere detaillierte Informationen zum Umgang mit Tags und Code-Snippets findest du im [Übersetzungs-Styleguide von ethereum.org](/contributing/translation-program/translators-guide/#dealing-with-tags).

## Wo befinden sich die Zeichenfolgen? {#strings}

Oft reichen die Quellzeichenfolgen allein möglicherweise nicht aus, um eine genaue Übersetzung zu liefern.

- Sieh dir „Screenshots“ und „Context“ (Kontext) für weitere Informationen an. Im Abschnitt der Quellzeichenfolge siehst du das angehängte Screenshot-Bild, das dir zeigt, wie wir die Zeichenfolge im Kontext verwenden.
- Wenn du dir immer noch unsicher bist, melde dies im „Comment section“ (Kommentarbereich). [Du bist dir nicht sicher, wie man einen Kommentar hinterlässt?](#comment)

![Zeigt, wie Kontext für eine Zeichenfolge mit einem Screenshot bereitgestellt werden kann](./source-string.png)

![Ein Beispiel-Screenshot, der als Kontext hinzugefügt wurde](./source-string-2.png)

## Wie kann ich Kommentare hinterlassen oder Fragen stellen? Ich möchte ein Problem oder Tippfehler melden... {#comment}

Wenn du auf eine bestimmte Zeichenfolge aufmerksam machen möchtest, die Beachtung erfordert, kannst du gerne einen Kommentar abgeben.

- Klicke auf die zweite Schaltfläche in der oberen rechten Leiste. Die versteckte Registerkarte wird auf der rechten Seite angezeigt. Hinterlasse einen neuen Kommentar und aktiviere unten das Kontrollkästchen „Issue“ (Problem). Du kannst die Art des Problems angeben, indem du eine der Optionen aus dem Dropdown-Menü auswählst.
- Sobald es eingereicht wurde, wird es unserem Team gemeldet. Wir werden das Problem beheben und dich informieren, indem wir auf deinen Kommentar antworten und das Problem schließen.
- Wenn du eine falsche Übersetzung meldest, werden die Übersetzung und deine vorgeschlagene Alternative bei der nächsten Überprüfung von einem Muttersprachler überprüft.

![Zeigt, wie man Kommentare und Probleme erstellt](./comment-issue.png)

## Was ist ein Translation Memory (TM)? {#translation-memory}

Das Translation Memory (TM) ist eine Funktion von Crowdin, die alle zuvor übersetzten Zeichenfolgen auf ethereum.org speichert. Wenn eine Zeichenfolge übersetzt wird, wird sie automatisch in unserem Projekt-TM gespeichert. Dies kann ein nützliches Werkzeug sein, um dir Zeit zu sparen!

- Schau dir den Abschnitt „TM and MT Suggestions“ (TM- und MT-Vorschläge) an und du wirst sehen, wie andere Übersetzer dieselbe oder eine ähnliche Zeichenfolge übersetzt haben. Wenn du einen Vorschlag mit einer hohen Übereinstimmungsrate findest, kannst du die Übersetzung gerne übernehmen, indem du darauf klickst.
- Wenn nichts auf der Liste steht, kannst du das TM nach zuvor erstellten Übersetzungen durchsuchen und diese aus Gründen der Konsistenz wiederverwenden.

![Ein Screenshot des Translation Memory](./translation-memory.png)

## Wie verwende ich das Crowdin-Glossar? {#glossary}

Die Ethereum-Terminologie ist ein weiterer entscheidender Teil unserer Übersetzungsarbeit, da neue technische Begriffe oft noch nicht in viele Sprachen lokalisiert sind. Außerdem gibt es Begriffe, die in verschiedenen Kontexten unterschiedliche Bedeutungen haben. [Mehr zur Übersetzung der Ethereum-Terminologie](#terminology)

Das Crowdin-Glossar ist der beste Ort zur Klärung von Begriffen und Definitionen. Es gibt zwei Möglichkeiten, auf das Glossar zuzugreifen.

- Erstens: Wenn du in der Quellzeichenfolge einen unterstrichenen Begriff findest, kannst du mit der Maus darüber fahren und eine kurze Definition davon sehen.

![Eine beispielhafte Glossardefinition](./glossary-definition.png)

- Zweitens: Wenn du einen Begriff siehst, der dir nicht vertraut ist, aber nicht unterstrichen ist, kannst du in der Registerkarte „Glossary“ (die dritte Schaltfläche in der rechten Spalte) danach suchen. Dort findest du Erklärungen zu bestimmten Begriffen und solchen, die im Projekt häufig verwendet werden.

![Ein Screenshot, der zeigt, wo die Registerkarte Glossar in Crowdin zu finden ist](./glossary-tab.png)

- Wenn du ihn immer noch nicht finden kannst, ist das deine Chance, einen neuen Begriff hinzuzufügen! Wir ermutigen dich, ihn in einer Suchmaschine nachzuschlagen und die Beschreibung zum Glossar hinzuzufügen. Es wird anderen Übersetzern eine große Hilfe sein, den Begriff besser zu verstehen.

![Ein Screenshot, der zeigt, wie man einen Glossarbegriff zu Crowdin hinzufügt](./add-glossary-term.png)

### Richtlinie zur Übersetzung von Terminologie {#terminology}

_Für Namen (Marken, Unternehmen, Personen) und neue technische Begriffe (Beacon Chain, Shard-Ketten usw.)_

Ethereum präsentiert viele neue Begriffe, die erst kürzlich geprägt wurden. Einige Begriffe variieren von Übersetzer zu Übersetzer, da es in ihrer jeweiligen Sprache keine offizielle Übersetzung gibt. Solche Inkonsistenzen können zu Missverständnissen führen und die Lesbarkeit verringern.

Aufgrund der sprachlichen Vielfalt und der unterschiedlichen Standardisierungen in jeder Sprache war es nahezu unmöglich, eine einheitliche Richtlinie zur Übersetzung von Terminologie zu entwickeln, die in allen unterstützten Sprachen angepasst werden kann.

Nach reiflicher Überlegung sind wir zu dem Entschluss gekommen, die am häufigsten verwendete Terminologie euch, den Übersetzern, zu überlassen.

Hier ist unser Vorschlag, wenn du einen Begriff findest, der dir unbekannt ist:

- Konsultiere das [Glossar der Begriffe](#glossary), dort findest du möglicherweise, wie andere Übersetzer ihn zuvor übersetzt haben. Wenn du der Meinung bist, dass der zuvor übersetzte Begriff nicht angemessen ist, kannst du gerne deine Übersetzung wiederherstellen, indem du einen neuen Begriff zum Crowdin-Glossar hinzufügst.
- Wenn eine solche vorherige Übersetzung im Glossar nicht existiert, ermutigen wir dich, in einer Suchmaschine oder einem Medienartikel nachzuschlagen, der zeigt, wie der Begriff in deiner Community tatsächlich verwendet wird.
- Wenn du überhaupt keine Referenzen findest, vertraue ruhig deiner Intuition und schlage eine neue Übersetzung für deine Sprache vor!
- Wenn du dich dabei weniger sicher fühlst, lass den Begriff unübersetzt. Manchmal sind englische Begriffe mehr als ausreichend, um genaue Definitionen zu liefern.

Wir empfehlen dir, Namen von Marken, Unternehmen und Personen unübersetzt zu lassen, da eine Übersetzung unnötige Verwirrung und SEO-Schwierigkeiten verursachen könnte.

## Wie funktioniert der Überprüfungsprozess? {#review-process}

Um ein gewisses Maß an Qualität und Konsistenz in unseren Übersetzungen zu gewährleisten, arbeiten wir mit [Acolad](https://www.acolad.com/) zusammen, einem der weltweit größten Sprachdienstleister. Acolad verfügt über 20.000 professionelle Linguisten, was bedeutet, dass sie für jede Sprache und Art von Inhalten, die wir benötigen, professionelle Prüfer bereitstellen können.

Der Überprüfungsprozess ist unkompliziert; sobald eine Reihe von Inhalten zu 100 % übersetzt ist, geben wir eine Überprüfung für diesen Inhaltsbereich in Auftrag. Der Überprüfungsprozess findet direkt in Crowdin statt. Sobald die Überprüfung abgeschlossen ist, aktualisieren wir die Website mit den übersetzten Inhalten.

## Wie füge ich Inhalte in meiner Sprache hinzu? {#adding-foreign-language-content}

Derzeit werden alle nicht-englischen Inhalte direkt aus den englischen Quellinhalten übersetzt, und Inhalte, die nicht auf Englisch existieren, können nicht in anderen Sprachen hinzugefügt werden.

Um neue Inhalte für ethereum.org vorzuschlagen, kannst du ein [Issue auf GitHub erstellen](https://github.com/ethereum/ethereum-org-website/issues). Wenn der Inhalt hinzugefügt wird, wird er auf Englisch verfasst und über Crowdin in andere Sprachen übersetzt.

Wir planen, in naher Zukunft Unterstützung für das Hinzufügen nicht-englischer Inhalte anzubieten.

## Nimm Kontakt auf {#contact}

Vielen Dank, dass du dir das alles durchgelesen hast. Wir hoffen, dass dir dies den Einstieg in unser Programm erleichtert. Tritt gerne unserem [Discord-Übersetzungskanal](https://discord.gg/ethereum-org) bei, um Fragen zu stellen und mit anderen Übersetzern zusammenzuarbeiten, oder kontaktiere uns unter translations@ethereum.org!