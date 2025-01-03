---
title: Staking-Produkte oder -Services hinzufügen
description: Richtlinien, die wir beim Hinzufügen von Staking-Produkten oder -Dienstleistungen zu ethereum.org anwenden
lang: de
---

# Staking-Produkte oder -Services hinzufügen {#adding-staking-products-or-services}

Wir möchten sicherstellen, dass wir die bestmöglichen Ressourcen auflisten und gleichzeitig die Sicherheit und das Vertrauen der Nutzer gewährleisten.

Jeder kann ein Staking-Produkt oder einen Service zur Hinzufügung auf ethereum.org vorschlagen. Wenn wir ein Produkt übersehen haben, **[dann schlagen Sie es bitte vor](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml).**

Auf den folgenden Seiten finden Sie eine Liste der Staking-Produkte und Services, die wir derzeit anbieten:

- [Solo-Staking](/staking/solo/)
- [Staking als Dienstleistung](/staking/saas/)
- [Staking-Pool](/staking/pools/)

Der Proof-of-Stake wurde am 1. Dezember 2020 auf der Beacon Chain eingeführt. Das Staking ist ein noch relativ neues Verfahren. Dennoch haben wir versucht, einen fairen und transparenten Rahmen für die Berücksichtigung auf ethereum.org zu schaffen. Die Kriterien für die Auflistung werden sich jedoch im Laufe der Zeit ändern und weiterentwickeln und liegen letztendlich im Ermessen des ethereum.org-Website-Teams.

## Der Entscheidungsrahmen {#the-decision-framework}

Die Entscheidung, ein Produkt auf ethereum.org zu listen, ist von mehrern Faktoren abhängig. Mehrer Kriterien werden bei der Entscheidung über die Aufnahme eines Produkts oder einer Dienstleistung gemeinsam berücksichtigt. Je mehr dieser Kriterien erfüllt sind, umso wahrscheinlicher ist eine Aufnahme in die Liste.

**Erstens: Um welche Art von Produkt oder Dienstleistung handelt es sich?**

- Node- oder Client-Tool
- Schlüsselverwaltung
- Staking als Dienstleistung (SaaS)
- Staking-Pool

Derzeit sind nur Produkte oder Dienstleistungen in diesen Kategorien aufgeführt.

### Aufnahmekriterien {#criteria-for-inclusion}

Die eingereichten Staking-Produkte oder Services werden anhand von folgenden Kriterien bewertet:

**Wann wurde das Projekt oder der Service gestartet?**

- Gibt es Belege dafür, wann das Produkt oder der Service der Öffentlichkeit zugänglich gemacht wurde?
- Auf dieser Grundlage wird ermittelt, wie bewährt ein Produkt ist.

**Wird das Projekt aktiv verwaltet?**

- Gibt es ein aktives Team, das aktuell an der Entwicklung des Projekts arbeitet? Wer sind die Beteiligten?
- Es werden nur aktiv verwaltete Produkte berücksichtigt.

**Ist das Produkt oder der Service frei von vertrauenswürdigen/menschlichen Vermittlern?**

- Für welche Schritte der Benutzererfahrung ist es erforderlich, dass Vertrauen in die Menschen gesetzt wird, die entweder die Schlüssel zu ihren Geldern halten oder die Belohnungen richtig verteilen?
- Damit wird die "Vertrauenswürdigkeit" des Produkts oder Services ermittelt.

**Liefert das Projekt genaue und zuverlässige Informationen?**

- Es ist von entscheidender Bedeutung, dass die Website des Produkts aktuelle, genaue und nicht irreführende Informationen enthält, insbesondere wenn sie sich auf das Ethereum-Protokoll oder andere verwandte Technologien beziehen.
- Beiträge, die Fehlinformationen, veraltete Details oder potenziell irreführende Aussagen über Ethereum oder andere relevante Themen enthalten, werden nicht aufgelistet oder werden entfernt, wenn sie bereits aufgelistet sind.

**Welche Plattformen werden unterstützt?**

- z. B. Linux, macOS, Windows, iOS, Android

#### Software und Smart Contracts {#software-and-smart-contracts}

Für jegliche benutzerdefinierte Software oder Smart Contracts:

**Ist alles Open Source?**

- Open-Source-Projekte sollten über ein öffentlich zugängliches Quellcode-Repository verfügen.
- Das wird verwendet, um die "Open-Source"-Bewertung des Produkts zu bestimmen.

**Ist die _Beta-Entwicklung_ für das Produkt abgeschlossen?**

- Wo befindet sich das Produkt in seinem Entwicklungszyklus?
- Produkte in der Betaphase werden nicht für die Aufnahme auf ethereum.org berücksichtigt.

**Wurde die Software einem externen Sicherheitsaudit unterzogen?**

- Wenn nicht, ist eine externe Prüfung geplant?
- Auf diese Weise wird die "Prüfungsbewertung" des Produkts ermittelt.

**Hat das Projekt ein Bug-Bounty-Programm?**

- Wenn nicht, ist die Zahlung einer Prämie für entdeckte Sicherheitslücken geplant?
- Das wird verwendet, um die "Bug Bounty"-Punktzahl des Produkts zu ermitteln.

#### Node- oder Client-Tool {#node-or-client-tooling}

Für Softwareprodukte im Zusammenhang mit der Einrichtung, Verwaltung oder Migration von Nodes oder Clients:

**Welche Clients auf Konsensebene (d. h. Lighthouse, Teku, Nimbus, Prysm) werden unterstützt?**

- Welche Clients werden unterstützt? Kann der Nutzer wählen?
- Das wird zur Ermittlung der "Multi-Client"-Bewertung des Produkts verwendet.

#### Staking als Service {#staking-as-a-service}

Für [Staking-as-a-Service-Listings](/staking/saas/) (d. h. delegierter Node-Betrieb):

**Wie hoch sind die Gebühren für die Nutzung des Services?**

- Wie ist die Gebührenstruktur, gibt es z. B. eine monatliche Gebühr für den Service?
- Gibt es zusätzliche Staking-Anforderungen?

**Müssen sich die Nutzer für ein Konto registrieren?**

- Kann jemand den Service ohne Genehmigung oder KYC nutzen?
- Auf diese Weise wird der Aspekt der "Berechtigungsfreiheit" für das Produkt bewertet.

**Wer hat die Singatur- und Abhebungsschlüssel?**

- Auf welche Schlüssel hat der Benutzer Zugriff? Auf welche Schlüssel hat der Service Zugriff?
- Das wird zur Ermittlung der "Vertrauenswürdigkeit" des Produkts herangezogen.

**Wie groß ist die Kundenvielfalt der betriebenen Knoten?**

- Wie viel Prozent der Validierungsschlüssel werden von einem Client der Konsensebene (CL) ausgeführt?
- Seit der letzten Bearbeitung wird vowiegend Prysm als Konsensebenen-Client von den Knotenbetreibern verwendet. Das ist gefährlich für Netzwerk. Wenn ein CL-Client derzeit von mehr als 33 % des Netzes genutzt wird, fordern wir Daten zur Nutzung an.
- Auf dieser Grundlage wird für das Produkt der Aspekt "Diverse Clients" bewertet.

#### Staking-Pool {#staking-pool}

Für [Staking-Services im Pool](/Staking/pools/):

**Wie hoch ist die Mindest-ETH, die für einen Einsatz erforderlich ist?**

- z. B. 0,01 ETH

**Wie hoch sind die Gebühren oder die Anforderungen für bzw. an das Staking?**

- Wie viel Prozent der Prämien werden als Gebühren abgezogen?
- Gibt es zusätzliche Staking-Anforderungen?

**Gibt es einen Liquiditäts-Token?**

- Um welche Token handelt es sich? Wie funktionieren sie? Wie lauten die Vertragsadressen?
- Das wird zur Ermittlung der "Liquiditäts-Token"-Bewertung des Produkts verwendet.

**Können Nutzer als Knotenbetreiber teilnehmen?**

- Was ist erforderlich, um Validator-Clients mit den gepoolten Mitteln zu betreiben?
- Ist hierfür die Genehmigung einer Einzelperson, eines Unternehmens oder einer DAO erforderlich?
- Auf diese Weise wird der Aspekt "berechtigungsfreie Knoten" für das Produkt bewertet.

**Wie groß ist die Kundenvielfalt bei den Betreibern der Poolknoten?**

- Wie viel Prozent der Knotenbetreiber verwenden einen Mehrheits-Client der Konsensebene (CL)?
- Seit der letzten Bearbeitung wird vowiegend Prysm als Konsensebenen-Client von den Knotenbetreibern verwendet. Das ist gefährlich für Netzwerk. Wenn ein CL-Client derzeit von mehr als 33 % des Netzes genutzt wird, fordern wir Daten zur Nutzung an.
- Auf dieser Grundlage wird für das Produkt der Aspekt "Diverse Clients" bewertet.

### Weitere Kriterien: optionale Aspekte {#other-criteria}

**Welche Benutzeroberflächen werden unterstützt?**

- z. B. Browser-Anwendung, Desktop-Anwendung, mobile Anwendung, CLI

**Bietet die Software für das Knoten-Tooling eine einfache Möglichkeit, zwischen den Clients zu wechseln?**

- Kann der Benutzer mit dem Tool einfach und sicher zwischen Clients wechseln?

**Bei SaaS: Wie viele Validatoren werden derzeit von dem Service betrieben?**

- Das gibt uns einen Eindruck von der bisherigen Reichweite Ihres Services.

## So erfolgt die Anzeige von Ergebnissen {#product-ordering}

Die [Kriterien für die Aufnahme](#criteria-for-inclusion) werden verwendet, um eine kumulative Punktzahl für jedes Produkt oder jeden Service zu berechnen. Das dient dazu, Produkte, die bestimmte objektive Kriterien erfüllen, zu sortieren und zu präsentieren. Je mehr Kriterien belegt werden, desto höher fällt die Bewertung eines Produkts aus. Gleichstände werden dabei nach dem Zufallsprinzip gewertet.

Die Codelogik und die Gewichtungen für diese Kriterien sind derzeit in [dieser JavaScript-Komponente](https://github.com/ethereum/ethereum-org-website/blob/dev/src/components/Staking/StakingProductsCardGrid.js#L350) in unserem Repo enthalten.

## Ihr Produkt oder Ihren Service hinzufügen {#add-product}

Wenn Sie ein Staking-Produkt oder einen Staking-Service zu ethereum.org hinzufügen möchten, erstellen Sie einen Eintrag auf GitHub.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml">
  Eintrag erstellen
</ButtonLink>
