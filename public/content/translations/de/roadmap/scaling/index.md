---
title: Ethereum zu skalieren
description: Rollups fassen Transaktionen off-chain zusammen und senken so die Kosten für den Nutzer. Die derzeitige Art und Weise, wie Rollups Daten verwenden, ist jedoch zu teuer und schränkt ein, wie günstig Transaktionen sein könnten. Proto-Danksharding behebt das.
lang: de
image: /images/roadmap/roadmap-transactions.png
alt: "Ethereum-Roadmap"
template: roadmap
---

Ethereum wird mit Hilfe von [Layer 2s](/layer-2/#rollups) (auch bekannt als Rollups) skaliert, die Transaktionen zusammenfassen und den Output an Ethereum senden. Obwohl Rollups bis zu achtmal günstiger sind als das Ethereum Mainnet, kann man Rollups noch weiter optimieren, um die Kosten für die Endnutzer zu senken. Rollups stützen sich auch auf einige zentralisierte Komponenten, die mit zunehmender Reife der Rollups von den Entwicklern entfernt werden können.

<InfoBanner mb={8} title="Transaktionskosten">
  <ul style={{ marginBottom: 0 }}>
    <li>Die Rollups von heute sind etwa <strong>5- bis 20-mal</strong> günstiger als die Ethereum-Layer-1</li>
    <li>ZK-Rollups werden bald die Gebühren um <strong>~40-100x</strong> senken</li>
    <li>Bevorstehende Änderungen an Ethereum werden eine weitere <strong>~100-1000-fache</strong> Skalierung ermöglichen</li>
    <li style={{ marginBottom: 0 }}>Benutzer könnten von Transaktionskosten <strong>unter $0.001 </strong>profitieren</li>
  </ul>
</InfoBanner>

## Daten günstiger machen {#making-data-cheaper}

Rollups sammeln eine große Anzahl von Transaktionen, führen sie aus und übermitteln die Ergebnisse an Ethereum. Dabei entstehen viele Daten, die offen zugänglich sein müssen, damit jeder die Transaktionen selbst durchführen und überprüfen kann, ob der Rollup-Betreiber ehrlich war. Wenn jemand eine Unstimmigkeit feststellt, kann er eine Beschwerde einreichen.

### Proto-Danksharding {#proto-danksharding}

Rollup-Daten wurden in der Vergangenheit dauerhaft auf Ethereum gespeichert, was teuer ist. Über 90 % der Transaktionskosten, die die Nutzer für Rollups zahlen, sind auf diese Datenspeicherung zurückzuführen. Um die Transaktionskosten zu senken, können wir die Daten in einen neuen temporären "Blob"-Speicher verschieben. Blobs sind billiger, weil sie nicht dauerhaft sind; sie werden aus Ethereum gelöscht, sobald sie nicht mehr benötigt werden. Die langfristige Speicherung von Rollup-Daten liegt in der Veranwortung derjenigen, die sie benötigen, wie z. B. Rollup-Betreibern, Börsen, Indexierungsdiensten usw. Das Hinzufügen von Blob-Transaktionen zu Ethereum ist Teil eines Upgrades, das als "Proto-Danksharding" bekannt ist.

Mit Proto-Danksharding lassen sich viele Blobs zu Ethereum-Blöcken hinzufügen. Dadurch wird eine weitere signifikante (>100x) Erhöhung des Ethereum-Durchsatzes und eine deutliche Reduzierung der Transaktionskosten möglich.

### Danksharding {#danksharding}

Die zweite Stufe der Erweiterung von Blob-Daten ist kompliziert, weil dafür neue Methoden zur Überprüfung der Verfügbarkeit von Rollup-Daten im Netz erforderlich sind. Außerdem wird dafür vorausgesetzt, dass [Validatoren](/glossary/#validator) ihre Verantwortung für [Block](/glossary/#block)-Bau und Blockvorschläge auseinanderhalten. Außerdem muss kryptografisch nachgewiesen werden, dass die Validatoren kleine Teilmengen der Blobdaten überprüft haben.

Dieser zweite Schritt ist bekannt unter dem Namen [“Danksharding”](/roadmap/danksharding/). **Es wird wahrscheinlich noch einige Jahre dauern, bis es zu einer vollständigen Umsetzung kommt**. Danksharding stützt sich auf andere Entwicklungen wie die [Trennung von Blockbildung und Blockvorschlag](/roadmap/pbs) und neue Netzwerkdesigns, die es dem Netzwerk ermöglichen, die Verfügbarkeit von Daten effizient zu bestätigen, indem jeweils einige Kilobyte zufällig abgetastet werden, was als [data availability sampling (DAS)](/developers/docs/data-availability) bekannt ist.

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Mehr zu Danksharding</ButtonLink>

## Rollups dezentralisieren {#decentralizing-rollups}

[Rollups](/layer-2) sind bereits dabei, Ethereum zu skalieren. Ein [reichhaltiges Ökosystem von Rollup-Projekten](https://l2beat.com/scaling/tvl) ermöglicht es den Nutzern, schnell und kostengünstig Transaktionen durchzuführen und dabei eine Reihe von Sicherheitsgarantien zu bieten. Rollups wurden jedoch mit zentralisierten Sequenzern (Computer, die die gesamte Transaktionsverarbeitung und -aggregation durchführen, bevor sie an Ethereum übermittelt werden) gebootet. Dies ist anfällig für Zensur, da die Betreiber der Sequenzer sanktioniert, bestochen oder anderweitig kompromittiert werden können. Gleichzeitig unterscheiden sich [Rollups](https://l2beat.com) in der Art und Weise, wie sie die eingehenden Daten validieren. Am besten ist es, wenn die „Prüfer“ [Betrugsnachweise](/glossary/#fraud-proof) oder Gültigkeitsnachweise einreichen, aber noch sind nicht alle Rollups so weit. Selbst die Rollups, die Gültigkeits-/Betrugsnachweise verwenden, nutzen einen kleinen Pool von bekannten Prüfern. Daher besteht der nächste kritische Schritt bei der Skalierung von Ethereum darin, die Verantwortung für den Betrieb von Sequenzern und Prüfern auf mehr Personen zu verteilen.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Mehr zu Rollups</ButtonLink>

## Aktueller Fortschritt {#current-progress}

Proto-Danksharding ist das erste dieser Roadmap-Elemente, das im Rahmen des Netzwerk-Upgrades Cancun-Deneb („Dencun“) im März 2024 implementiert wird. **Zur vollständigen Umsetzung von Danksharding kommt es wahrscheinlich erst in einigen Jahren**, da hierfür zunächst mehrere andere Roadmap-Elemente abgeschlossen werden müssen. Die Dezentralisierung der Rollup-Infrastruktur wird wahrscheinlich ein schrittweiser Prozess sein - es gibt viele verschiedene Rollups, die leicht unterschiedliche Systeme aufbauen und in unterschiedlichem Tempo vollständig dezentralisieren werden.

[Weitere Informationen zum Dencun-Netzwerk-Upgrade](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />
