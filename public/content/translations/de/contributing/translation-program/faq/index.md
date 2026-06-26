---
title: Leitfaden zur Übersetzung von ethereum.org
metaTitle: Häufig gestellte Fragen (FAQ) zum Übersetzungsprogramm
lang: de
description: Häufig gestellte Fragen zum Übersetzungsprogramm von ethereum.org
---

Wenn du neu im Übersetzungsprogramm bist und zögerst, direkt loszulegen, findest du hier einige FAQs, die dir den Einstieg erleichtern können. Nutze diesen Leitfaden, um Antworten auf die häufigsten Fragen zu finden.

## Kann ich für die Übersetzung von ethereum.org vergütet werden? {#compensation}

Ethereum.org ist eine Open-Source-Website, was bedeutet, dass sich jeder einbringen und einen Beitrag leisten kann.

Das Übersetzungsprogramm von ethereum.org ist eine Erweiterung davon und wird mit einer ähnlichen Philosophie organisiert.

Das Ziel des Übersetzungsprogramms ist es, Ethereum-Inhalte für jeden zugänglich zu machen, unabhängig davon, welche Sprachen er spricht. Es ermöglicht auch jeder zweisprachigen Person, sich im Ethereum-Ökosystem zu engagieren und auf zugängliche Weise einen Beitrag zu leisten.

Aus diesem Grund ist das Übersetzungsprogramm offen und freiwillig, und die Teilnahme wird nicht vergütet. Wenn wir Übersetzer für die Anzahl der übersetzten Wörter vergüten würden, könnten wir nur diejenigen mit ausreichender Übersetzungserfahrung (professionelle Übersetzer) einladen, am Übersetzungsprogramm teilzunehmen. Dies würde das Übersetzungsprogramm exklusiv machen und uns daran hindern, die skizzierten Ziele zu erreichen, insbesondere: jedem die Teilnahme und das Engagement im Ökosystem zu ermöglichen.

Wir unternehmen alle Anstrengungen, um unseren Mitwirkenden den Erfolg im Ethereum-Ökosystem zu ermöglichen; es gibt viele nicht-monetäre Anreize, wie zum Beispiel: [das Anbieten von POAPs](/contributing/translation-program/acknowledgements/#poap) und einem [Übersetzerzertifikat](/contributing/translation-program/acknowledgements/#certificate), sowie die Organisation der [Übersetzungs-Bestenlisten](/contributing/translation-program/acknowledgements/) und [die Auflistung all unserer Übersetzer auf der Website](/contributing/translation-program/contributors/).

## Wie übersetze ich Zeichenfolgen mit `<HTML tags>`? {#tags}

Nicht jede Zeichenfolge ist in reiner Textform geschrieben. Es gibt einige Zeichenfolgen, die aus gemischten Skripten wie HTML-Tags (`<0>`, `</0>`) bestehen. Dies dient normalerweise für Hyperlinks oder alternative Formatierungen mitten in einem Satz.

- Übersetze den Text innerhalb der Tags, aber nicht die Tags selbst. Alles in `<` und `>` darf nicht übersetzt oder entfernt werden.
- Um die Zeichenfolge sicher zu halten, empfehlen wir dir, unten links auf die Schaltfläche „Copy Source“ (Quelle kopieren) zu klicken. Dadurch wird die ursprüngliche Zeichenfolge kopiert und in das Textfeld eingefügt. So kannst du klären, wo sich die Tags befinden, und Fehler vermeiden.

![Crowdin interface with copy source button highlighted](./html-tag-strings.png)

Du kannst die Position der Tags innerhalb der Zeichenfolge verschieben, damit sie in deiner Sprache natürlicher klingt – achte nur darauf, das gesamte Tag zu verschieben.

Weitere detaillierte Informationen zum Umgang mit Tags und Code-Snippets findest du im [Übersetzungs-Styleguide von ethereum.org](/contributing/translation-program/translators-guide/#dealing-with-tags).

## Wo befinden sich die Zeichenfolgen? {#strings}

Oft reichen die Quellzeichenfolgen allein möglicherweise nicht aus, um eine genaue Übersetzung zu liefern.

- Sieh dir „Screenshots“ und „Context“ (Kontext) für weitere Informationen an. Im Abschnitt der Quellzeichenfolge siehst du das angehängte Screenshot-Bild, das dir zeigt, wie wir die Zeichenfolge im Kontext verwenden.
- Wenn du dir immer noch unsicher bist, melde dies im „Comment section“ (Kommentarbereich). [Du bist dir nicht sicher, wie man einen Kommentar hinterlässt?](#comment)

![Showing how context can be provided for a string with a screenshot](./source-string.png)

![An example screenshot added for context](./source-string-2.png)

## Wie kann ich Kommentare hinterlassen oder Fragen stellen? Ich möchte ein Problem oder Tippfehler melden... {#comment}

Wenn du auf eine bestimmte Zeichenfolge aufmerksam machen möchtest, die überprüft werden muss, kannst du gerne einen Kommentar abgeben.

- Klicke auf die zweite Schaltfläche in der Leiste oben rechts. Der versteckte Tab wird auf der rechten Seite angezeigt. Hinterlasse einen neuen Kommentar und aktiviere unten das Kontrollkästchen „Issue“ (Problem). Du kannst die Art des Problems angeben, indem du eine der Optionen aus dem Dropdown-Menü auswählst.
- Sobald es eingereicht wurde, wird es an unser Team gemeldet. Wir werden das Problem beheben und dich informieren, indem wir auf deinen Kommentar antworten und das Problem schließen.
- Wenn du eine falsche Übersetzung meldest, werden die Übersetzung und deine vorgeschlagene Alternative bei der nächsten Überprüfung von einem Muttersprachler geprüft.

![Showing how to make comments and issues](./comment-issue.png)

## Was ist ein Translation Memory (TM)? {#translation-memory}

Das Translation Memory (TM) ist eine Funktion von Crowdin, die alle zuvor übersetzten Zeichenfolgen von ethereum.org speichert. Wenn eine Zeichenfolge übersetzt wird, wird sie automatisch in unserem Projekt-TM gespeichert. Dies kann ein nützliches Werkzeug sein, um dir Zeit zu sparen!

- Schau dir den Abschnitt „TM and MT Suggestions“ (TM- und MT-Vorschläge) an und du wirst sehen, wie andere Übersetzer dieselbe oder eine ähnliche Zeichenfolge übersetzt haben. Wenn du einen Vorschlag mit einer hohen Übereinstimmungsrate findest, kannst du diese Übersetzung gerne übernehmen, indem du darauf klickst.
- Wenn nichts auf der Liste steht, kannst du das TM nach zuvor erstellten Übersetzungen durchsuchen und diese aus Gründen der Konsistenz wiederverwenden.

![A screenshot of the translation memory](./translation-memory.png)

## Wie verwende ich das Crowdin-Glossar? {#glossary}

Die Ethereum-Terminologie ist ein weiterer entscheidender Teil unserer Übersetzungsarbeit, da neue technische Begriffe in vielen Sprachen oft noch nicht lokalisiert sind. Außerdem gibt es Begriffe, die in verschiedenen Kontexten unterschiedliche Bedeutungen haben. [Mehr zur Übersetzung der Ethereum-Terminologie](#terminology)

Das Crowdin-Glossar ist der beste Ort zur Klärung von Begriffen und Definitionen. Es gibt zwei Möglichkeiten, auf das Glossar zuzugreifen.

- Erstens: Wenn du in der Quellzeichenfolge einen unterstrichenen Begriff findest, kannst du mit der Maus darüberfahren und eine kurze Definition davon sehen.

![An example glossary definition](./glossary-definition.png)

- Zweitens: Wenn du einen Begriff siehst, der dir nicht vertraut, aber nicht unterstrichen ist, kannst du im Glossar-Tab (die dritte Schaltfläche in der rechten Spalte) danach suchen. Dort findest du Erklärungen zu bestimmten Begriffen und solchen, die im Projekt häufig verwendet werden.

![A screenshot showing where to find the glossary tab in Crowdin](./glossary-tab.png)

- Wenn du ihn immer noch nicht finden kannst, ist das deine Chance, einen neuen Begriff hinzuzufügen! Wir ermutigen dich, ihn in einer Suchmaschine nachzuschlagen und die Beschreibung zum Glossar hinzuzufügen. Es wird anderen Übersetzern eine große Hilfe sein, den Begriff besser zu verstehen.

![A screenshot showing how to add a glossary term to Crowdin](./add-glossary-term.png)

### Richtlinie zur Übersetzung von Terminologie {#terminology}

_Für Namen (Marken, Unternehmen, Personen) und neue technische Begriffe (Beacon Chain, Shard-Chains usw.)_

Ethereum bringt viele neue Begriffe mit sich, die erst kürzlich geprägt wurden. Einige Begriffe variieren von Übersetzer zu Übersetzer, da es in ihrer jeweiligen Sprache keine offizielle Übersetzung gibt. Solche Inkonsistenzen können zu Missverständnissen führen und die Lesbarkeit verringern.

Aufgrund der sprachlichen Vielfalt und der unterschiedlichen Standardisierungen in jeder Sprache war es nahezu unmöglich, eine einheitliche Richtlinie zur Übersetzung von Terminologie zu entwickeln, die in allen unterstützten Sprachen angewendet werden kann.

Nach reiflicher Überlegung sind wir zu dem Entschluss gekommen, die am häufigsten verwendete Terminologie euch, den Übersetzern, zu überlassen.

Hier ist unser Vorschlag, wenn du auf einen Begriff stößt, der dir unbekannt ist:

- Konsultiere das [Glossar der Begriffe](#glossary), dort findest du möglicherweise, wie andere Übersetzer ihn zuvor übersetzt haben. Wenn du der Meinung bist, dass der zuvor übersetzte Begriff nicht passend ist, kannst du gerne deine Übersetzung wiederherstellen, indem du dem Crowdin-Glossar einen neuen Begriff hinzufügst.
- Wenn eine solche vorherige Übersetzung im Glossar nicht existiert, empfehlen wir dir, in einer Suchmaschine oder einem Medienartikel nachzuschlagen, um zu sehen, wie der Begriff in deiner Community tatsächlich verwendet wird.
- Wenn du überhaupt keine Referenzen findest, vertraue ruhig deiner Intuition und schlage eine neue Übersetzung für deine Sprache vor!
- Wenn du dir dabei unsicher bist, lass den Begriff unübersetzt. Manchmal sind englische Begriffe mehr als ausreichend, um genaue Definitionen zu liefern.

Wir empfehlen, Namen von Marken, Unternehmen und Personen unübersetzt zu lassen, da eine Übersetzung unnötige Verwirrung und SEO-Schwierigkeiten verursachen könnte.

## Wie funktioniert der Überprüfungsprozess? {#review-process}

Um ein gewisses Maß an Qualität und Konsistenz in unseren Übersetzungen zu gewährleisten, arbeiten wir mit [Acolad](https://www.acolad.com/) zusammen, einem der weltweit größten Sprachdienstleister. Acolad verfügt über 20.000 professionelle Linguisten, was bedeutet, dass sie für jede Sprache und Art von Inhalten, die wir benötigen, professionelle Prüfer bereitstellen können.

Der Überprüfungsprozess ist unkompliziert; sobald eine Gruppe von Inhalten zu 100 % übersetzt ist, geben wir eine Überprüfung für diesen Inhaltsbereich in Auftrag. Der Überprüfungsprozess findet direkt in Crowdin statt. Sobald die Überprüfung abgeschlossen ist, aktualisieren wir die Website mit den übersetzten Inhalten.

## Wie füge ich Inhalte in meiner Sprache hinzu? {#adding-foreign-language-content}

Derzeit werden alle nicht-englischen Inhalte direkt aus den englischen Quellinhalten übersetzt, und Inhalte, die nicht auf Englisch existieren, können nicht in anderen Sprachen hinzugefügt werden.

Um neue Inhalte für ethereum.org vorzuschlagen, kannst du ein [Issue auf GitHub erstellen](https://github.com/ethereum/ethereum-org-website/issues). Wenn der Inhalt hinzugefügt wird, wird er auf Englisch verfasst und mithilfe von Crowdin in andere Sprachen übersetzt.

Wir planen, in naher Zukunft die Unterstützung für das Hinzufügen nicht-englischer Inhalte einzuführen.

## Nimm Kontakt auf {#contact}

Vielen Dank, dass du dir das alles durchgelesen hast. Wir hoffen, dies hilft dir beim Einstieg in unser Programm. Tritt gerne unserem [Discord-Übersetzungskanal](https://discord.gg/ethereum-org) bei, um Fragen zu stellen und mit anderen Übersetzern zusammenzuarbeiten, oder kontaktiere uns unter translations@ethereum.org!