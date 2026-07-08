---
title: Hinzufügen von Staking-Produkten oder -Diensten
description: Die Richtlinie, die wir beim Hinzufügen von Staking-Produkten oder -Diensten zu ethereum.org anwenden
lang: de
---

Wir möchten sicherstellen, dass wir die bestmöglichen Ressourcen auflisten und gleichzeitig die Sicherheit und das Vertrauen der Nutzer wahren.

Jeder kann vorschlagen, ein Staking-Produkt oder einen Staking-Dienst auf ethereum.org hinzuzufügen. Wenn wir eines übersehen haben, **[schlage es bitte vor](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml)!**

Wir listen derzeit Staking-Produkte und -Dienste auf den folgenden Seiten auf:

- [Solo Staking](/staking/solo/)
- [Staking as a Service](/staking/saas/)
- [Staking-Pools](/staking/pools/)

Proof-of-Stake (PoS) auf der Beacon Chain ist seit dem 1. Dezember 2020 live. Obwohl Staking noch relativ neu ist, haben wir versucht, einen fairen und transparenten Rahmen für die Berücksichtigung auf ethereum.org zu schaffen. Die Aufnahmekriterien werden sich jedoch im Laufe der Zeit ändern und weiterentwickeln und liegen letztendlich im Ermessen des Website-Teams von ethereum.org.

## Der Entscheidungsrahmen {#the-decision-framework}

Die Entscheidung, ein Produkt auf ethereum.org aufzulisten, hängt nicht von einem einzigen Faktor ab. Bei der Entscheidung, ein Produkt oder einen Dienst aufzulisten, werden mehrere Kriterien zusammen berücksichtigt. Je mehr dieser Kriterien erfüllt sind, desto wahrscheinlicher ist eine Auflistung.

**Erstens: Um welche Kategorie von Produkt oder Dienst handelt es sich?**

- Knoten- oder Client-Tools
- Schlüsselverwaltung
- Staking as a Service (SaaS)
- Staking-Pool

Derzeit listen wir nur Produkte oder Dienste in diesen Kategorien auf.

### Aufnahmekriterien {#criteria-for-inclusion}

Einreichungen von Staking-Produkten oder -Diensten werden nach den folgenden Kriterien bewertet:

**Wann wurde das Projekt oder der Dienst gestartet?**

- Gibt es Nachweise darüber, wann das Produkt oder der Dienst der Öffentlichkeit zugänglich gemacht wurde?
- Dies wird verwendet, um den „Battle-Tested“-Wert (Praxiserprobung) des Produkts zu bestimmen.

**Wird das Projekt aktiv gepflegt?**

- Gibt es ein aktives Team, das das Projekt entwickelt? Wer ist daran beteiligt?
- Es werden nur aktiv gepflegte Produkte berücksichtigt.

**Ist das Produkt oder der Dienst frei von vertrauenswürdigen/menschlichen Vermittlern?**

- Welche Schritte in der Nutzererfahrung erfordern das Vertrauen in Menschen, die entweder die Schlüssel zu ihren Geldern halten oder Belohnungen ordnungsgemäß verteilen?
- Dies wird verwendet, um den Wert für „vertrauenslos“ des Produkts oder Dienstes zu bestimmen.

**Stellt das Projekt genaue und zuverlässige Informationen bereit?**

- Es ist von entscheidender Bedeutung, dass die Website des Produkts aktuelle, genaue und nicht irreführende Informationen enthält, insbesondere wenn sie sich auf das Ethereum-Protokoll oder andere verwandte Technologien beziehen.
- Einreichungen, die Fehlinformationen, veraltete Details oder potenziell irreführende Aussagen über Ethereum oder andere relevante Themen enthalten, werden nicht aufgelistet oder entfernt, falls sie bereits aufgelistet sind.

**Welche Plattformen werden unterstützt?**

- d. h. Linux, macOS, Windows, iOS, Android

#### Software und Smart Contracts {#software-and-smart-contracts}

Für jede beteiligte benutzerdefinierte Software oder Smart Contracts:

**Ist alles Open Source?**

- Open-Source-Projekte sollten über ein öffentlich zugängliches Quellcode-Repository verfügen.
- Dies wird verwendet, um den „Open-Source“-Wert des Produkts zu bestimmen.

**Hat das Produkt die _Beta_-Entwicklungsphase verlassen?**

- Wo befindet sich das Produkt in seinem Entwicklungszyklus?
- Produkte in der Beta-Phase werden für die Aufnahme auf ethereum.org nicht berücksichtigt.

**Wurde die Software einem externen Sicherheitsaudit unterzogen?**

- Wenn nicht, gibt es Pläne, ein externes Audit durchzuführen?
- Dies wird verwendet, um den „Audited“-Wert (geprüft) des Produkts zu bestimmen.

**Verfügt das Projekt über ein Bug-Bounty-Programm?**

- Wenn nicht, gibt es Pläne, ein Sicherheits-Bug-Bounty-Programm zu erstellen?
- Dies wird verwendet, um den „Bug-Bounty“-Wert des Produkts zu bestimmen.

#### Knoten- oder Client-Tools {#node-or-client-tooling}

Für Softwareprodukte im Zusammenhang mit der Einrichtung, Verwaltung oder Migration von Knoten oder Clients:

**Welche Clients der Konsensschicht (d. h. Lighthouse, Teku, Nimbus, Prysm, Grandine) werden unterstützt?**

- Welche Clients werden unterstützt? Kann der Nutzer wählen?
- Dies wird verwendet, um den „Multi-Client“-Wert des Produkts zu bestimmen.

#### Staking as a Service {#staking-as-a-service}

Für [Staking-as-a-Service-Einträge](/staking/saas/) (d. h. delegierter Knotenbetrieb):

**Welche Gebühren sind mit der Nutzung des Dienstes verbunden?**

- Wie ist die Gebührenstruktur, gibt es z. B. eine monatliche Gebühr für den Dienst?
- Gibt es zusätzliche Staking-Anforderungen?

**Müssen sich Nutzer für ein Konto registrieren?**

- Kann jemand den Dienst erlaubnisfrei oder ohne KYC nutzen?
- Dies wird verwendet, um den Wert für „erlaubnisfrei“ des Produkts zu bestimmen.

**Wer hält die Schlüssel zum Signieren und die Schlüssel für die Abhebung?**

- Auf welche Schlüssel behält der Nutzer Zugriff? Auf welche Schlüssel erhält der Dienst Zugriff?
- Dies wird verwendet, um den Wert für „vertrauenslos“ des Produkts zu bestimmen.

**Wie ist die Client-Diversität der betriebenen Knoten?**

- Wie viel Prozent der Validator-Schlüssel werden von einem Mehrheits-Client der Konsensschicht (CL) ausgeführt?
- Zum Zeitpunkt der letzten Bearbeitung ist Prysm der Client der Konsensschicht, der von der Mehrheit der Knotenbetreiber ausgeführt wird, was für das Netzwerk gefährlich ist. Wenn ein CL-Client derzeit von über 33 % des Netzwerks verwendet wird, fordern wir Daten zu seiner Nutzung an.
- Dies wird verwendet, um den Wert für „Client-Diversität“ des Produkts zu bestimmen.

#### Staking-Pool {#staking-pool}

Für [Pooled-Staking-Dienste](/staking/pools/):

**Was ist das Minimum an ETH, das zum Staken erforderlich ist?**

- z. B. 0,01 ETH

**Welche Gebühren oder Staking-Anforderungen sind damit verbunden?**

- Welcher Prozentsatz der Belohnungen wird als Gebühren abgezogen?
- Gibt es zusätzliche Staking-Anforderungen?

**Gibt es einen Liquiditäts-Token?**

- Welche Token sind beteiligt? Wie funktionieren sie? Wie lauten die Vertragsadressen?
- Dies wird verwendet, um den „Liquiditäts-Token“-Wert des Produkts zu bestimmen.

**Können Nutzer als Knotenbetreiber teilnehmen?**

- Was ist erforderlich, um Validator-Clients mit den gepoolten Geldern auszuführen?
- Ist dafür die Erlaubnis einer Einzelperson, eines Unternehmens oder einer DAO erforderlich?
- Dies wird verwendet, um den Wert für „erlaubnisfreie Knoten“ des Produkts zu bestimmen.

**Wie ist die Client-Diversität der Pool-Knotenbetreiber?**

- Wie viel Prozent der Knotenbetreiber führen einen Mehrheits-Client der Konsensschicht (CL) aus?
- Zum Zeitpunkt der letzten Bearbeitung ist Prysm der Client der Konsensschicht, der von der Mehrheit der Knotenbetreiber ausgeführt wird, was für das Netzwerk gefährlich ist. Wenn ein CL-Client derzeit von über 33 % des Netzwerks verwendet wird, fordern wir Daten zu seiner Nutzung an.
- Dies wird verwendet, um den Wert für „Client-Diversität“ des Produkts zu bestimmen.

### Weitere Kriterien: Die Nice-to-haves {#other-criteria}

**Welche Benutzeroberflächen werden unterstützt?**

- d. h. Browser-App, Desktop-App, mobile App, CLI

**Bietet die Software bei Knoten-Tools eine einfache Möglichkeit, zwischen Clients zu wechseln?**

- Kann der Nutzer mit dem Tool einfach und sicher den Client wechseln?

**Wie viele Validatoren werden bei SaaS derzeit von dem Dienst betrieben?**

- Dies gibt uns eine Vorstellung von der bisherigen Reichweite deines Dienstes.

## Wie wir Ergebnisse anzeigen {#product-ordering}

Die oben genannten [Aufnahmekriterien](#criteria-for-inclusion) werden verwendet, um eine kumulative Punktzahl für jedes Produkt oder jeden Dienst zu berechnen. Dies dient als Mittel zum Sortieren und Präsentieren von Produkten, die bestimmte objektive Kriterien erfüllen. Je mehr Kriterien nachgewiesen werden, desto höher wird ein Produkt einsortiert, wobei bei Gleichstand beim Laden zufällig sortiert wird.

Die Code-Logik und die Gewichtungen für diese Kriterien sind derzeit in [dieser JavaScript-Komponente](https://github.com/ethereum/ethereum-org-website/blob/dev/src/components/Staking/StakingProductsCardGrid/index.tsx#L350) in unserem Repo enthalten.

## Füge dein Produkt oder deinen Dienst hinzu {#add-product}

Wenn du ein Staking-Produkt oder einen Staking-Dienst zu ethereum.org hinzufügen möchtest, erstelle ein Issue auf GitHub.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml">
  Issue erstellen
</ButtonLink>