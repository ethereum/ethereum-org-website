---
title: "Code is law? Smart Contracts erklärt"
description: "Erkundung des Konzepts 'Code is law' durch die Linse von Smart Contracts auf Ethereum und DeFi. Dieses Video behandelt, was Smart Contracts sind, wie sie funktionieren und die philosophische Frage, ob Code der ultimative Schiedsrichter sein sollte."
lang: de
youtubeId: "pWGLtjG-F5c"
uploadDate: 2020-11-18
duration: "0:15:25"
educationLevel: beginner
topic:
  - "smart-contracts"
format: explainer
author: Finematics
breadcrumb: "Smart Contracts"
---

Ein Erklärvideo von **Finematics**, das das Konzept „Code is law“ durch die Linse von Smart Contracts auf Ethereum erkundet und behandelt, was Smart Contracts sind, wie sie funktionieren, welche Vorteile sie gegenüber traditionellen Verträgen haben und warum sie die Bausteine der Dezentralisierten Finanzen (DeFi) sind.

*Dieses Transkript ist eine barrierefreie Kopie des [originalen Video-Transkripts](https://www.youtube.com/watch?v=pWGLtjG-F5c), das von Finematics veröffentlicht wurde. Es wurde zur besseren Lesbarkeit leicht bearbeitet.*

#### Einführung (0:00) {#introduction-000}

Haben Sie schon einmal den Ausdruck „Code is law“ gehört, bei dem Technologie eingesetzt wird, um Regeln durchzusetzen? Brauchen wir in diesem Fall überhaupt noch Anwälte? Oder vielleicht können wir in einer vollautomatisierten Welt leben, in der Code diktiert, was wir tun dürfen und was nicht. Mit der aktuellen Entwicklung von Smart Contracts könnte dieses futuristische Szenario näher sein, als wir denken.

Ein Smart Contract ist ein Stück Code, das automatisch und auf deterministische Weise ausgeführt werden kann. Der Code des Smart Contracts wird normalerweise auf der Blockchain gespeichert und ausgeführt, um ihn vertrauenslos und sicher zu machen. Smart Contracts haben auch die Fähigkeit, Gelder zu empfangen, zu speichern und zu senden – und sogar andere Smart Contracts aufzurufen. Sie folgen einer Wenn-Dann-Semantik, was sie relativ einfach zu programmieren macht.

Smart Contracts zielen darauf ab, den menschlichen Faktor aus der Entscheidungsfindung zu entfernen. Der menschliche Faktor erweist sich oft als das fehleranfälligste und unzuverlässigste Element von standardmäßigen traditionellen Verträgen.

Ein Verkaufsautomat wird sehr oft als gute Analogie für einen Smart Contract herangezogen, da er einige Ähnlichkeiten aufweist. Ein typischer Verkaufsautomat ist so programmiert, dass er bestimmte Aktionen und Zustandsübergänge basierend auf der Eingabe zulässt. Er arbeitet auch auf eine vollständig deterministische Weise. Wenn Sie zum Beispiel eine Dose Cola kaufen möchten, die zwei Dollar kostet, und Sie nur einen Dollar haben, werden Sie das Getränk nicht bekommen, egal wie oft Sie es versuchen. Wenn Sie hingegen drei Dollar einwerfen, gibt Ihnen der Automat eine Dose Cola und das entsprechende Wechselgeld. Sogar das herausgegebene Wechselgeld wird auf eine vordefinierte und programmierte Weise ausgewählt, basierend darauf, welche Münzen verfügbar sind und welche Münzen der Automat zuerst loswerden möchte.

Ein Smart Contract kann sich rein auf die Informationen verlassen, die auf der Blockchain verfügbar sind – zum Beispiel: „Wenn du mir zehn Token A gibst, gebe ich dir zehn Token B.“ Oder er kann sich auf eine externe Datenquelle verlassen, zum Beispiel auf den Preis von ETH oder dem S&P 500. Das letztere Beispiel macht Smart Contracts schwieriger, da sie realen Daten vertrauen müssen. Das benötigte Vertrauen kann durch die Nutzung von Orakel-Diensten minimiert werden, aber auch Orakel-Diensten muss vertraut werden. Es gibt bereits einige Projekte, die durch bestimmte Anreize die Wahrscheinlichkeit erhöhen, dass Orakel korrekte Daten liefern. Chainlink ist ein Projekt, das in dieser Kategorie deutlich heraussticht.

#### Ethereum Smart Contracts (3:09) {#ethereum-smart-contracts-309}

Ethereum ist eine Blockchain, die Smart Contracts unterstützt und es einem Programmierer ermöglicht, seine eigenen Smart Contracts zu implementieren. Ein Smart Contract kann in einer Programmiersprache namens Solidity geschrieben werden, die speziell für diesen Zweck entwickelt wurde. In Ethereum sind alle bereitgestellten Smart Contracts unveränderlich – das bedeutet, dass sie nach der Bereitstellung nicht mehr geändert werden können, was bestimmte Risiken birgt, die wir später besprechen werden.

Smart Contracts auf Ethereum sind zudem dezentral, was bedeutet, dass es keine einzelne Maschine gibt, die den Vertrag kontrolliert. Tatsächlich speichern alle Knoten im Ethereum-Netzwerk denselben Vertrag mit exakt demselben Zustand. Obwohl Ethereum derzeit die beliebteste Allzweck-Plattform für Smart Contracts ist, ist sie nicht die einzige und hat einige Konkurrenten, darunter Cardano, Tezos, EOS und Tron – aber nicht alle teilen dieselben Eigenschaften.

#### Definition von Smart Contracts (4:23) {#smart-contract-definition-423}

Der Begriff „Smart Contract“ wurde in den frühen 1990er Jahren von dem bekannten Kryptographen Nick Szabo geprägt. Der Name, obwohl nicht der selbsterklärendste, hat sich durchgesetzt und wird häufig verwendet, insbesondere in der Blockchain-Branche. Um die Vorteile von Smart Contracts zu sehen, vergleichen wir einen hypothetischen Smart Contract mit seinem Äquivalent im traditionellen Raum.

#### Beispiel für einen Smart Contract (4:46) {#smart-contract-example-446}

Nehmen wir an, wir möchten folgenden Vertrag schreiben: Wenn Alice eine Anzahl X von Token A sendet und Bob dieselbe Anzahl von Token B sendet, werden die Token getauscht – Alice erhält Bobs Token und Bob erhält Alices Token.

In einer Welt ohne Smart Contracts wäre eine Möglichkeit, dies zu erreichen, ohne dass Alice Bob vertrauen muss und Bob Alice vertrauen muss, die Erstellung eines Treuhandvertrags mit einer dritten Partei. Die dritte Partei würde Token A von Alice einsammeln, auf dieselbe Anzahl von Token B von Bob warten und Alice und Bob die jeweils getauschten Token senden.

#### Probleme von Smart Contracts (5:45) {#smart-contract-problems-545}

Dieser Ansatz zeigt bereits einige Probleme auf, mit denen Alice und Bob konfrontiert sein könnten:

- **Vertrauen in Vermittler** – es gibt keine Garantie, dass die dritte Partei nicht mit den Token davonläuft, nachdem sie Gelder von Alice und Bob erhalten hat. Wir müssen uns auf den Ruf des Vermittlers und eine mögliche Versicherung verlassen.
- **Nicht-deterministische Ergebnisse** – wenn etwas schiefgeht, kann es je nach mehreren Faktoren unterschiedliche Ausgänge geben, einschließlich der Gerichtsbarkeit, in der ein möglicher Fall verhandelt werden würde.

Andererseits würde ein Smart Contract auf eine vollautomatische und deterministische Weise funktionieren und sicherstellen, dass beide Parteien Gelder erhalten, wenn sie die anfänglichen Kriterien für die Einzahlung von Token erfüllen. Smart Contracts können auch selbst Gelder halten, was in der traditionellen Welt nicht möglich ist.

#### Geschwindigkeit (6:47) {#speed-647}

Je nach Vermittler müssen Alice und Bob möglicherweise sogar einige Tage oder Wochen warten, um die Übertragung der Token abzuwickeln. Was ist, wenn sie an einem Sonntag Token tauschen möchten und der Vermittler nicht arbeitet? Mit Smart Contracts verschwinden diese Art von Problemen, und der Vertrag kann Sekunden nach Erfüllung der anfänglichen Kriterien erfüllt werden.

#### Kosten (7:16) {#cost-716}

Traditionelle Verträge sind nicht nur wegen des Vermittlers teuer, der einen Gewinn erzielen muss – es besteht auch ein riesiges Risiko versteckter Kosten für Dinge wie Schlichtung und Durchsetzung, falls es Probleme mit dem Vertrag gibt.

Wiederverwendbarkeit ist ein weiterer Vorteil: Derselbe Smart Contract, der für den Tausch von Alices und Bobs Token verantwortlich ist, könnte von jedem anderen genutzt werden, der Token tauschen möchte. In der traditionellen Welt müssten sie alle separate Verträge unterzeichnen und die entsprechenden Gebühren an den Vermittler zahlen.

#### Betrug (7:58) {#fraud-758}

Betrug ist eine weitere versteckte Kostenquelle, diesmal für den Vermittler selbst. Der Vermittler müsste sicherstellen, dass sowohl Alices als auch Bobs Token legitim sind, bevor er einen Tausch initiiert. Betrug ist in der traditionellen Finanzwelt sehr verbreitet, und die meisten Unternehmen haben riesige Teams, die ausschließlich an der Betrugsprävention arbeiten. Mit Smart Contracts können die Token auf der Blockchain verifiziert werden, und durch digitale Signaturen ist sofort klar, ob sowohl Alice als auch Bob berechtigt sind, ihre Token auszugeben.

#### Anwendungsfälle (8:42) {#use-cases-842}

Smart Contracts haben eine wachsende Zahl von Anwendungsfällen, die von Zahlungen und Dezentralisierten Finanzen (DeFi) bis hin zu Lieferketten und Crowdfunding reichen. Smart Contracts sind auch die grundlegenden Bausteine für Dezentrale Anwendungen (Dapps).

#### DeFi (9:07) {#defi-907}

Dezentralisierte Finanzen (DeFi) ist eine der neuen Branchen, die stark auf Smart Contracts angewiesen ist. Einige der Dinge, die in diesem Bereich bereits aufgebaut wurden, umfassen:

- **Dezentrale Stablecoins** – durch den cleveren Einsatz von Smart Contracts und bestimmten Anreizen können wir einen an den US-Dollar gekoppelten Stablecoin erstellen, ohne Dollar in der realen Welt lagern zu müssen. MakerDAO ist eines der Projekte, das dies möglich macht.
- **Automatisierte Bereitstellung von Liquidität** – eine Reihe von Smart Contracts kann es Benutzern ermöglichen, Liquidität bereitzustellen und Token auf eine völlig erlaubnisfreie und dezentrale Weise zu tauschen. Uniswap und Kyber Network sind gute Beispiele für solche Protokolle.

#### Crowdfunding und Lieferketten (10:05) {#crowdfunding-and-supply-chains-1005}

Ein weiterer Anwendungsfall ist die Schaffung von mehr Transparenz in Lieferketten, wo Protokolle wie OriginTrail ins Spiel kommen. Beim Crowdfunding kann man sich einen Vertrag vorstellen, der Gelder freigibt, sobald bestimmte Ziele erreicht und von der Community verifiziert wurden.

#### Zukünftige Smart Contracts (10:29) {#future-smart-contracts-1029}

Was wäre, wenn Smart Contracts Dinge wie Mitfahrgelegenheiten, Wohnungsvermietungen und vieles mehr erleichtern könnten? Wie wäre es mit Wohltätigkeit? Man kann sich einen vollautomatisierten Fonds vorstellen, der Geld direkt an die Menschen sendet, die es am meisten brauchen, ohne jegliche Vermittler. Zum Beispiel könnte der Fonds feststellen, dass eine bestimmte Region von einem Hurrikan getroffen wurde, und Gelder in diesen Teil der Welt umleiten. Im Moment klingt das ziemlich unmöglich, aber alle notwendigen Elemente, um so etwas zu verwirklichen, werden genau in diesem Moment gebaut.

Die Anwendungsfälle für Smart Contracts sind fast unendlich, aber bevor wir all das erreichen können, müssen wir einige Probleme angehen:

- **Bugs** – eines der Hauptrisiken bei Smart Contracts ist etwas, das auch jede andere Software plagt. Das beste Beispiel ist der DAO-Hack, der zum Verlust von Ether im Wert von Millionen Dollar führte, da der Angreifer Gelder aus dem Smart Contract abziehen konnte. Dies führte zu einem Hard Fork bei Ethereum und sorgte für viel Uneinigkeit in der Ethereum-Community. Seit dem DAO-Hack hat die Ethereum-Community viele zusätzliche Sicherheitsmaßnahmen entwickelt. Heutzutage haben so gut wie alle beliebten Smart Contracts ein Sicherheitsaudit durchlaufen, oft von mehreren Teams. Es gibt auch einen Trend zur Nutzung von Methoden der Formalen Verifikation, um zu beweisen, dass sich bestimmte Verträge immer auf eine erwartete Weise verhalten werden.
- **Protokolländerungen** – selbst wenn ein Smart Contract keine Bugs hat und geprüft wurde, können wir immer noch nicht garantieren, dass eine Änderung auf Plattformebene keine Probleme verursacht. Ein Upgrade des Protokolls selbst kann dazu führen, dass sich bestimmte Smart Contracts anders als erwartet verhalten.
- **Reale Daten** – Orakel-Dienste können einen zuverlässigen Weg bieten, um Informationen aus der realen Welt in die Blockchain zu bringen. Aber stellen Sie sich vor, Sie haben eine Wohnung oder ein Auto gemietet und versehentlich einen Schaden verursacht. Wie sollte ein Smart Contract ohne menschliches Eingreifen jemals davon erfahren? Es gibt zahlreiche Beispiele, bei denen es schwer vorstellbar ist, wie etwas Unerwartetes, das in der realen Welt passiert, für einen Smart Contract sichtbar sein kann.

Abgesehen von den oben genannten Punkten gibt es auch Risiken im Zusammenhang mit Regulierung und Steuern, aber diese können letztendlich alle gelöst werden.

#### Können wir Anwälte ersetzen? (13:58) {#can-we-replace-lawyers-1358}

Können wir also tatsächlich Anwälte durch Code ersetzen? Nicht ganz – zumindest nicht im Moment. In der Zukunft werden wahrscheinlich immer mehr Verträge automatisiert, insbesondere im Finanzwesen. Aber selbst in einer vollautomatisierten Welt können Anwälte wertvolles Wissen einbringen, das in Code übersetzt werden kann. Es gibt auch viele regulatorische Herausforderungen rund um die Krypto-Branche, die Anwälte noch eine Weile sehr beschäftigen werden. Dennoch, wenn ich ein Anwalt wäre, würde ich anfangen, etwas über Smart Contracts und das Programmieren zu lernen, da sie in der Zukunft eine große Rolle spielen werden.

#### Zusammenfassung (14:53) {#summary-1453}

Vorteile von Smart Contracts:

- Vollautomatisiert
- Deterministische Ergebnisse
- Vertrauenslos
- Schnell, präzise und sicher
- Kosteneffizient und transparent

Nachteile von Smart Contracts:

- Software-Bugs
- Protokolländerungen
- Regulatorische und steuerliche Unsicherheit

Auch wenn Smart Contracts gewisse Risiken bergen, stehen wir noch ganz am Anfang, und die meisten der aktuellen Probleme sind lösbar.