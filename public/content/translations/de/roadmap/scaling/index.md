---
title: Skalierung von Ethereum
description: "Rollups fassen Transaktionen Off-Chain zusammen und senken so die Kosten für den Nutzer. Die Art und Weise, wie Rollups derzeit Daten nutzen, ist jedoch zu teuer, was die Kostensenkung von Transaktionen einschränkt. Proto-Danksharding behebt dieses Problem."
lang: de
image: /images/roadmap/roadmap-transactions.png
alt: "Ethereum-Roadmap"
template: roadmap
---

Ethereum wird mithilfe von [Ebene 2](/layer-2/#rollups) (auch bekannt als Rollups) skaliert, die Transaktionen zusammenfassen und die Ausgabe an Ethereum senden. Obwohl Rollups bis zu achtmal günstiger sind als das Ethereum-Mainnet, ist es möglich, Rollups weiter zu optimieren, um die Kosten für Endnutzer zu senken. Rollups stützen sich auch auf einige zentralisierte Komponenten, die Entwickler entfernen können, wenn die Rollups ausgereifter sind.

<Alert variant="update" className="mb-8">
<AlertContent>
<AlertTitle className="mb-4">
  Transaktionskosten
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Heutige Rollups sind <strong>\~5-20x</strong> günstiger als Ethereum-Ebene 1</li>
    <li>Zero-Knowledge Rollups werden die Gebühren bald um das <strong>\~40-100-fache</strong> senken</li>
    <li>Kommende Änderungen an Ethereum werden eine weitere Skalierung um das <strong>\~100-1000-fache</strong> ermöglichen</li>
    <li style={{ marginBottom: 0 }}>Nutzer sollten von Transaktionen profitieren, die <strong>weniger als 0,001 $ kosten</strong></li>
  </ul>
</AlertContent>
</Alert>

## Daten günstiger machen {#making-data-cheaper}

Rollups sammeln eine große Anzahl von Transaktionen, führen sie aus und übermitteln die Ergebnisse an Ethereum. Dies erzeugt eine Menge Daten, die offen verfügbar sein müssen, damit jeder die Transaktionen selbst ausführen und überprüfen kann, ob der Rollup-Betreiber ehrlich war. Wenn jemand eine Unstimmigkeit feststellt, kann er diese anfechten.

### Proto-Danksharding {#proto-danksharding}

Rollup-Daten wurden in der Vergangenheit dauerhaft auf Ethereum gespeichert, was teuer ist. Über 90 % der Transaktionskosten, die Nutzer bei Rollups zahlen, sind auf diese Datenspeicherung zurückzuführen. Um die Transaktionskosten zu senken, können wir die Daten in einen neuen temporären „Blob“-Speicher verschieben. Blobs sind günstiger, weil sie nicht dauerhaft sind; sie werden von Ethereum gelöscht, sobald sie nicht mehr benötigt werden. Die langfristige Speicherung von Rollup-Daten liegt in der Verantwortung der Personen, die sie benötigen, wie z. B. Rollup-Betreiber, Börsen, Indexierungsdienste usw. Das Hinzufügen von Blob-Transaktionen zu Ethereum ist Teil eines Upgrades, das als „Proto-Danksharding“ bekannt ist.

Mit Proto-Danksharding ist es möglich, Ethereum-Blöcken viele Blobs hinzuzufügen. Dies ermöglicht eine weitere erhebliche (>100-fache) Skalierung des Durchsatzes von Ethereum und eine Senkung der Transaktionskosten.

### Danksharding {#danksharding}

Die zweite Stufe der Erweiterung von Blob-Daten ist kompliziert, da sie neue Methoden zur Überprüfung der Verfügbarkeit von Rollup-Daten im Netzwerk erfordert und darauf angewiesen ist, dass [Validatoren](/glossary/#validator) ihre Verantwortlichkeiten für die Erstellung von [Blöcken](/glossary/#block) und das Vorschlagen von Blöcken trennen. Es erfordert auch eine Möglichkeit, kryptografisch nachzuweisen, dass Validatoren kleine Teilmengen der Blob-Daten verifiziert haben.

Dieser zweite Schritt ist als ["Danksharding"](/roadmap/danksharding/) bekannt. Die Implementierungsarbeiten werden fortgesetzt, wobei Fortschritte bei den Voraussetzungen wie der [Trennung von Block-Erstellung und Block-Vorschlag](/roadmap/pbs) und neuen Netzwerkdesigns erzielt werden, die es dem Netzwerk ermöglichen, effizient zu bestätigen, dass Daten verfügbar sind, indem zufällig jeweils einige Kilobyte abgetastet werden, was als [Data Availability Sampling (DAS)](/developers/docs/data-availability) bekannt ist.

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Mehr zu Danksharding</ButtonLink>

## Dezentralisierung von Rollups {#decentralizing-rollups}

[Rollups](/layer-2) skalieren Ethereum bereits. Ein [reichhaltiges Ökosystem von Rollup-Projekten](https://l2beat.com/scaling/tvs) ermöglicht es Nutzern, schnell und günstig Transaktionen durchzuführen, mit einer Reihe von Sicherheitsgarantien. Rollups wurden jedoch mit zentralisierten Sequencern (Computer, die die gesamte Transaktionsverarbeitung und -aggregation durchführen, bevor sie an Ethereum übermittelt werden) gestartet. Dies ist anfällig für Zensur, da die Sequencer-Betreiber sanktioniert, bestochen oder anderweitig kompromittiert werden können. Gleichzeitig [unterscheiden sich Rollups](https://l2beat.com/scaling/summary) in der Art und Weise, wie sie eingehende Daten validieren. Der beste Weg ist, dass „Prover“ (Beweiser) [Betrugsnachweise](/glossary/#fraud-proof) oder Validitätsnachweise einreichen, aber noch nicht alle Rollups sind so weit. Selbst die Rollups, die Validitäts-/Betrugsnachweise verwenden, nutzen einen kleinen Pool bekannter Prover. Daher ist der nächste entscheidende Schritt bei der Skalierung von Ethereum, die Verantwortung für den Betrieb von Sequencern und Provern auf mehr Menschen zu verteilen.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Mehr zu Rollups</ButtonLink>

## Aktueller Fortschritt {#current-progress}

Proto-Danksharding wurde im März 2024 als Teil des Cancun-Deneb-Netzwerk-Upgrades („Dencun“) erfolgreich implementiert. Seit seiner Implementierung haben Rollups begonnen, Blob-Speicher zu nutzen, was zu geringeren Transaktionskosten für die Nutzer und Millionen von in Blobs verarbeiteten Transaktionen geführt hat.

Die Arbeit am vollständigen Danksharding wird fortgesetzt, wobei Fortschritte bei den Voraussetzungen wie PBS (Proposer-Builder Separation) und DAS (Data Availability Sampling) erzielt werden. Die Dezentralisierung der Rollup-Infrastruktur ist ein schrittweiser Prozess – es gibt viele verschiedene Rollups, die leicht unterschiedliche Systeme aufbauen und sich in unterschiedlichem Tempo vollständig dezentralisieren werden.

[Mehr über das Dencun-Netzwerk-Upgrade und seine Auswirkungen](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />