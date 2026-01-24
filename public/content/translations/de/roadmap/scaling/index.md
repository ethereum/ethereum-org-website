---
title: Ethereum zu skalieren
description: Durch das Bündeln von Transaktionen off-chain verringern Rollups die Kosten für den Anwender. Die derzeitige Art und Weise, wie Rollups Daten verwenden, ist jedoch zu teuer und schränkt ein, wie günstig Transaktionen sein könnten. Proto-Danksharding behebt das.
lang: de
image: /images/roadmap/roadmap-transactions.png
alt: "Ethereum-Roadmap"
template: roadmap
---

Ethereum wird mit Hilfe von Layer 2s (auch bekannt als Rollups) skaliert, die Transaktionen zusammenfassen und den Output an Ethereum senden. Obwohl Rollups bis zu achtmal günstiger sind als das Ethereum Mainnet, kann man Rollups noch weiter optimieren, um die Kosten für die Endnutzer zu senken. Rollups stützen sich auch auf einige zentralisierte Komponenten, die mit zunehmender Reife der Rollups von den Entwicklern entfernt werden können.

<Alert variant="update" className="mb-8">
<AlertContent>
<AlertTitle className="mb-4">
  Transaktionskosten
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Die Rollups von heute sind etwa <strong>5- bis 20-mal</strong> günstiger als die Ethereum-Layer-1</li>
    <li>ZK-Rollups werden bald die Gebühren um <strong>~40-100x</strong> senken</li>
    <li>Bevorstehende Änderungen an Ethereum werden eine weitere <strong>~100-1000-fache</strong> Skalierung ermöglichen</li>
    <li style={{ marginBottom: 0 }}>Benutzer könnten von Transaktionskosten <strong>unter $0.001 </strong>profitieren</li>
  </ul>
</AlertContent>
</Alert>

## Daten günstiger machen {#making-data-cheaper}

Rollups sammeln eine große Anzahl von Transaktionen, führen sie aus und übermitteln die Ergebnisse an Ethereum. Dabei entstehen viele Daten, die offen zugänglich sein müssen, damit jeder die Transaktionen selbst durchführen und überprüfen kann, ob der Rollup-Betreiber ehrlich war. Wenn jemand eine Unstimmigkeit feststellt, kann er eine Beschwerde einreichen.

### Proto-Danksharding {#proto-danksharding}

Rollup-Daten wurden in der Vergangenheit dauerhaft auf Ethereum gespeichert, was teuer ist. Über 90 % der Transaktionskosten, die die Nutzer für Rollups zahlen, sind auf diese Datenspeicherung zurückzuführen. Um die Transaktionskosten zu senken, können wir die Daten in einen neuen temporären "Blob"-Speicher verschieben. Blobs sind billiger, weil sie nicht dauerhaft sind; sie werden aus Ethereum gelöscht, sobald sie nicht mehr benötigt werden. Die langfristige Speicherung von Rollup-Daten liegt in der Veranwortung derjenigen, die sie benötigen, wie z. B. Rollup-Betreibern, Börsen, Indexierungsdiensten usw. Das Hinzufügen von Blob-Transaktionen zu Ethereum ist Teil eines Upgrades, das als "Proto-Danksharding" bekannt ist.

Mit Proto-Danksharding lassen sich viele Blobs zu Ethereum-Blöcken hinzufügen. Dies ermöglicht eine weitere erhebliche (>100x) Steigerung des Ethereum-Durchsatzes und Senkung der Transaktionskosten.

### Danksharding {#danksharding}

Die zweite Stufe der Erweiterung von Blob-Daten ist kompliziert, weil sie neue Methoden zur Überprüfung der Verfügbarkeit von Rollup-Daten im Netzwerk erfordert und davon abhängt, dass [Validatoren](/glossary/#validator) ihre Zuständigkeiten für die [Block](/glossary/#block)bildung und den Blockvorschlag voneinander trennen. Außerdem muss kryptografisch nachgewiesen werden, dass die Validatoren kleine Teilmengen der Blobdaten überprüft haben.

Dieser zweite Schritt ist als ["Danksharding"](/roadmap/danksharding/) bekannt. Die Implementierungsarbeiten werden fortgesetzt, wobei Fortschritte bei Voraussetzungen wie der [Trennung von Blockerstellung und Blockvorschlag](/roadmap/pbs) und bei neuen Netzwerkdesigns gemacht werden, die es dem Netzwerk ermöglichen, die Datenverfügbarkeit durch zufälliges Abtasten einiger Kilobytes auf einmal effizient zu bestätigen, bekannt als [Data Availability Sampling (DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Mehr zu Danksharding</ButtonLink>

## Dezentralisierung von Rollups {#decentralizing-rollups}

[Rollups](/layer-2) skalieren bereits Ethereum. Ein [reichhaltiges Ökosystem von Rollup-Projekten](https://l2beat.com/scaling/tvs) ermöglicht es Nutzern, mit einer Reihe von Sicherheitsgarantien schnell und kostengünstig Transaktionen durchzuführen. Rollups wurden jedoch mit zentralisierten Sequenzern (Computer, die die gesamte Transaktionsverarbeitung und -aggregation durchführen, bevor sie an Ethereum übermittelt werden) gebootet. Dies ist anfällig für Zensur, da die Betreiber der Sequenzer sanktioniert, bestochen oder anderweitig kompromittiert werden können. Gleichzeitig [variieren Rollups](https://l2beat.com/scaling/summary) in der Art und Weise, wie sie eingehende Daten validieren. Am besten ist es, wenn "Prover" [Betrugsbeweise](/glossary/#fraud-proof) oder Gültigkeitsnachweise einreichen, aber noch sind nicht alle Rollups so weit. Selbst die Rollups, die Gültigkeits-/Betrugsnachweise verwenden, nutzen einen kleinen Pool von bekannten Prüfern. Daher besteht der nächste kritische Schritt bei der Skalierung von Ethereum darin, die Verantwortung für den Betrieb von Sequenzern und Prüfern auf mehr Personen zu verteilen.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Mehr über Rollups</ButtonLink>

## Aktueller Fortschritt {#current-progress}

Mit dem Netzwerk-Upgrade Cancun-Deneb („Dencun“) im März 2024 erfolgte die erfolgreiche Einführung von Proto-Danksharding. Seit seiner Implementierung haben Rollups begonnen, Blob-Speicher zu nutzen, was zu geringeren Transaktionskosten für Nutzer und Millionen von in Blobs verarbeiteten Transaktionen geführt hat.

Die Arbeiten an Full Danksharding werden fortgesetzt, und es werden Fortschritte bei dessen Voraussetzungen wie PBS (Proposer-Builder Separation) und DAS (Data Availability Sampling) erzielt. Die Dezentralisierung der Rollup-Infrastruktur ist ein schrittweiser Prozess – es gibt viele verschiedene Rollups, die geringfügig unterschiedliche Systeme aufbauen und sich in unterschiedlichem Tempo vollständig dezentralisieren werden.

[Mehr über das Dencun-Netzwerk-Upgrade und seine Auswirkungen](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />
