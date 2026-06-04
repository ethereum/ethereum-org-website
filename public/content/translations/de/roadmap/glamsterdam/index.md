---
title: Glamsterdam
description: "Erfahre mehr über das Glamsterdam-Protokoll-Upgrade"
lang: de
---

# Glamsterdam {#glamsterdam}

<Alert variant="update">
<AlertContent>
<AlertTitle>
Glamsterdam ist ein bevorstehendes Ethereum-Upgrade, das für das zweite Halbjahr 2026 geplant ist
</AlertTitle>
<AlertDescription>
Das Glamsterdam-Upgrade ist nur ein einzelner Schritt in den langfristigen Entwicklungszielen von Ethereum. Erfahre mehr über [die Protokoll-Roadmap](/roadmap/) und [frühere Upgrades](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

[Ethereums](/) bevorstehendes Glamsterdam-Upgrade soll den Weg für die nächste Generation der Skalierung ebnen. Glamsterdam ist nach der Kombination aus „Amsterdam“ (Upgrade der Ausführungsschicht, benannt nach einem früheren Devconnect-Standort) und „Gloas“ (Upgrade der Konsensschicht, benannt nach einem Stern) benannt.

Aufbauend auf den Fortschritten des [Fusaka](/roadmap/fusaka/)-Upgrades konzentriert sich Glamsterdam auf die Skalierung von Layer 1 (L1), indem es neu organisiert, wie das Netzwerk Transaktionen verarbeitet und seine wachsende Datenbank verwaltet. Dabei wird grundlegend aktualisiert, wie Ethereum Blöcke erstellt und verifiziert.

Während sich Fusaka auf grundlegende Verfeinerungen konzentrierte, treibt Glamsterdam die Ziele „Scale L1“ und „Scale Blobs“ voran, indem es die Aufgabentrennung zwischen verschiedenen Netzwerkteilnehmern verankert und effizientere Methoden zur Datenverarbeitung einführt, um den [Zustand](/glossary/#state) auf eine Parallelisierung mit hohem Transaktionsdurchsatz vorzubereiten.

Diese Verbesserungen stellen sicher, dass Ethereum schnell, erschwinglich und dezentral bleibt, während es mehr Aktivität bewältigt, und halten gleichzeitig die Hardwareanforderungen für Personen, die [Knoten](/glossary/#node) zu Hause betreiben, überschaubar.

<VideoWatch slug="ethereum-evolution-glamsterdam" />

## Für Glamsterdam in Betracht gezogene Verbesserungen {#improvements-in-glamsterdam}

<Alert variant="info">
<AlertContent>
<AlertDescription>
Hinweis: Dieser Artikel hebt derzeit eine Auswahl von EIPs hervor, deren Aufnahme in Glamsterdam in Betracht gezogen wird. Weitere Vorschläge, die aktiv in Devnets getestet werden, umfassen EIP-7778, EIP-7843, EIP-7976, EIP-7981 und EIP-8024. Die neuesten Status-Updates findest du beim [Glamsterdam-Upgrade auf Forkcast](https://forkcast.org/upgrade/glamsterdam).

Wenn du ein EIP hinzufügen möchtest, das für Glamsterdam in Betracht gezogen wird, aber noch nicht auf dieser Seite steht, [erfahre hier, wie du zu ethereum.org beitragen kannst](/contributing/).
</AlertDescription>
</AlertContent>
</Alert>

Das Glamsterdam-Upgrade konzentriert sich auf drei Hauptziele:

- Beschleunigung der Verarbeitung (Parallelisierung): Neuorganisation der Art und Weise, wie das Netzwerk Datenabhängigkeiten aufzeichnet, sodass es viele Transaktionen sicher gleichzeitig verarbeiten kann, anstatt in einer langsamen, sequenziellen Reihenfolge.
- Erweiterung der Kapazität: Aufteilung der schweren Arbeit beim Erstellen und Verifizieren von Blöcken, wodurch das Netzwerk mehr Zeit erhält, größere Datenmengen zu verbreiten, ohne langsamer zu werden.
- Verhinderung von Datenbankaufblähung (Nachhaltigkeit): Anpassung der Netzwerkgebühren, um die langfristigen Hardwarekosten für die Speicherung neuer Daten genau widerzuspiegeln, was zukünftige Erhöhungen des Gaslimits ermöglicht und gleichzeitig Leistungseinbußen der Hardware verhindert.

Kurz gesagt wird Glamsterdam strukturelle Änderungen einführen, um sicherzustellen, dass das Netzwerk bei steigender Kapazität nachhaltig bleibt und die Leistung hoch bleibt.

## Layer 1 (L1) skalieren & parallele Verarbeitung {#scale-l1}

Eine sinnvolle Skalierung von Layer 1 (L1) erfordert die Abkehr von protokoll-externen Vertrauensannahmen und Einschränkungen durch serielle Ausführung. Glamsterdam geht dies an, indem es die Trennung bestimmter Aufgaben bei der Blockerstellung verankert und neue Datenstrukturen einführt, die es dem Netzwerk ermöglichen, sich auf die parallele Verarbeitung vorzubereiten.

### Hauptvorschlag: Verankerte Proposer-Builder-Trennung (ePBS) {#epbs}

- Beseitigt protokoll-externe Vertrauensannahmen und die Abhängigkeit von Relays von Drittanbietern
- Unterstützt die Skalierung von Layer 1 (L1), indem durch erweiterte Verbreitungsfenster viel größere Ausführungs-Payloads ermöglicht werden
- Führt vertrauenslose Zahlungen an Ersteller (Builder) direkt in das Protokoll ein 
- Erfordert Architektur-Updates für Staking-Pools, um eine vertrauenslose Überwachung zu ermöglichen, obwohl die allgemeine Benutzererfahrung beim Staking durch einen verfeinerten Auswahlprozess für Ersteller verbessert wird

Derzeit umfasst der Prozess des Vorschlagens und Erstellens von Blöcken eine Übergabe zwischen Block-Proposern und Block-Erstellern. Die Beziehung zwischen Proposern und Erstellern ist nicht Teil des Kernprotokolls von Ethereum, daher stützt sie sich auf vertrauenswürdige Middleware von Drittanbietern, Software (Relays) und protokoll-externes Vertrauen zwischen Entitäten.

Die protokoll-externe Beziehung zwischen Proposern und Erstellern schafft auch einen „Hot Path“ während der Blockvalidierung, der [Validatoren](/glossary/#validator) dazu zwingt, die Übertragung und Ausführung von Transaktionen in einem engen 2-Sekunden-Fenster durchzupeitschen, was die Datenmenge begrenzt, die das Netzwerk verarbeiten kann.

Die **verankerte Proposer-Builder-Trennung (ePBS oder EIP-7732)** trennt formell die Aufgabe des Proposers (der den Konsens-Block auswählt) von der des Erstellers (der die Ausführungs-Payload zusammenstellt) und verankert diese Übergabe direkt im Protokoll. 

Die Integration des vertrauenslosen Austauschs einer Block-Payload gegen Bezahlung direkt in das Protokoll beseitigt die Notwendigkeit von Middleware von Drittanbietern (wie MEV-Boost). Ersteller und Proposer können sich jedoch weiterhin dafür entscheiden, protokoll-externe Relays oder Middleware für komplexe Funktionen zu verwenden, die noch nicht Teil des Kernprotokolls sind. 

Um den „Hot Path“-Engpass zu beheben, führt ePBS auch das Payload Timeliness Committee (PTC) und eine Dual-Deadline-Logik ein, die es Validatoren ermöglicht, den Konsens-Block und die Pünktlichkeit der Ausführungs-Payload separat zu bestätigen, um den Transaktionsdurchsatz zu maximieren.

<VideoWatch slug="proposer-builder-separation" />

Die Trennung der Rollen von Proposer und Ersteller auf Protokollebene erweitert das Verbreitungsfenster (oder die Zeit, die zur Verfügung steht, um Daten im Netzwerk zu verteilen) von 2 Sekunden auf etwa 9 Sekunden.

Indem protokoll-externe Middleware und Relays durch protokoll-interne Mechanismen ersetzt werden, reduziert ePBS Vertrauensabhängigkeiten und ermöglicht es Ethereum, viel größere Datenmengen (wie mehr Blobs für [Layer 2 (L2)](/glossary/#layer-2)) sicher zu verarbeiten, ohne das Netzwerk zu belasten.

**Ressourcen**: [Technische Spezifikation zu EIP-7732](https://eips.ethereum.org/EIPS/eip-7732)

### Hauptvorschlag: Block-Level Access Lists (BALs) {#bals}

- Beseitigt Engpässe bei der sequenziellen Verarbeitung durch die Bereitstellung einer Vorab-Karte aller Transaktionsabhängigkeiten und schafft so die Voraussetzungen dafür, dass Validatoren viele Transaktionen parallel statt nacheinander verarbeiten können
- Ermöglicht es Knoten, ihre Aufzeichnungen durch das Lesen der Endergebnisse zu aktualisieren, ohne jede Transaktion erneut abspielen zu müssen (ausführungslose Synchronisierung), wodurch die Synchronisierung eines Knotens mit dem Netzwerk viel schneller wird
- Beseitigt das Rätselraten und ermöglicht es Validatoren, alle erforderlichen Daten auf einmal vorab zu laden, anstatt sie Schritt für Schritt zu entdecken, was die Validierung viel schneller macht

Das heutige Ethereum ist wie eine einspurige Straße; da das Netzwerk erst nach der Ausführung einer Transaktion weiß, welche Daten sie benötigt oder ändert (z. B. welche Konten eine Transaktion berührt), müssen Validatoren Transaktionen einzeln in einer strengen, sequenziellen Reihenfolge verarbeiten. Wenn sie versuchen würden, die Transaktionen alle auf einmal zu verarbeiten, ohne diese Abhängigkeiten zu kennen, könnten zwei Transaktionen versehentlich versuchen, genau dieselben Daten zur gleichen Zeit zu ändern, was zu Fehlern führen würde.

**Block-Level Access Lists (BALs oder EIP-7928)** funktionieren wie eine Karte für das Netzwerk, die detailliert aufzeigt, auf welche Teile der Datenbank zugegriffen wird, bevor die Arbeit beginnt. Die Ausführungsschicht speichert die vollständige Block Access List, einschließlich jeder Kontoänderung, die die Transaktionen berühren werden, zusammen mit den Endergebnissen dieser Änderungen (alle Zustandszugriffe und Werte nach der Ausführung). Um Blöcke leichtgewichtig zu halten, enthält der Block-Header ein neues Feld mit einem eindeutigen digitalen Fingerabdruck (dem Hash-Eintrag) dieser Liste.

Da sie sofortige Sichtbarkeit darüber bieten, welche Transaktionen sich nicht überschneiden, ermöglichen BALs den Knoten parallele Festplattenlesevorgänge, bei denen Informationen für viele Transaktionen gleichzeitig abgerufen werden. Das Netzwerk kann nicht zusammenhängende Transaktionen sicher gruppieren und parallel verarbeiten.

Da die BAL die Endergebnisse von Transaktionen (die Werte nach der Ausführung) enthält, können die Knoten des Netzwerks, wenn sie sich mit dem aktuellen Zustand des Netzwerks synchronisieren müssen, diese Endergebnisse kopieren, um ihre Aufzeichnungen zu aktualisieren. Validatoren müssen nicht mehr alle komplizierten Transaktionen von Grund auf neu abspielen, um zu wissen, was passiert ist, was es für neue Knoten schneller und einfacher macht, dem Netzwerk beizutreten.

Die durch BALs ermöglichten parallelen Festplattenlesevorgänge werden ein bedeutender Schritt in eine Zukunft sein, in der Ethereum viele Transaktionen auf einmal verarbeiten kann, was die Geschwindigkeit des Netzwerks erheblich erhöht.

#### eth/71 Block Access List Exchange {#bale}

Der Block Access List Exchange (eth/71 oder EIP-8159) ist das direkte Netzwerk-Pendant zu Block-Level Access Lists. Während BALs die parallele Ausführung freischalten, aktualisiert eth/71 das Peer-to-Peer-Protokoll, damit Knoten diese Listen tatsächlich über das Netzwerk teilen können. Der Block Access List Exchange, der nun für alle Clients der Ausführungsschicht erforderlich ist, wird eine schnellere Synchronisierung ermöglichen und es Knoten erlauben, ausführungslose Zustandsaktualisierungen durchzuführen.

**Ressourcen**:

- [Technische Spezifikation zu EIP-7928](https://eips.ethereum.org/EIPS/eip-7928)
- [Technische Spezifikation zu EIP-8159](https://eips.ethereum.org/EIPS/eip-8159)

## Netzwerk-Nachhaltigkeit {#network-sustainability}

Da das Ethereum-Netzwerk schneller wächst, ist es wichtig sicherzustellen, dass die Kosten für seine Nutzung dem Verschleiß der Hardware entsprechen, auf der Ethereum läuft. Das Netzwerk muss seine Gesamtkapazitätsgrenzen erhöhen, um sicher zu skalieren und mehr Transaktionen zu verarbeiten.

### Erhöhung der Gaskosten für die Zustandserstellung {#state-creation-gas-cost-increase}

- Stellt sicher, dass die Gebühren für die Erstellung neuer Konten oder Smart Contracts die langfristige Belastung, die sie für die Ethereum-Datenbank darstellen, genau widerspiegeln
- Legt feste **Kosten pro Zustands-Byte (CPSB)** fest, die auf eine sichere und vorhersehbare Wachstumsrate von 120 GiB/Jahr abzielen, um sicherzustellen, dass standardmäßige physische Hardware das Netzwerk weiterhin betreiben kann
- Trennt die Abrechnung für diese spezifischen Gebühren in ein neues Reservoir, wodurch alte Transaktionslimits aufgehoben werden und Entwickler größere, komplexere Anwendungen bereitstellen können

Das Hinzufügen neuer Konten, Token und [Smart Contracts](/glossary/#smart-contract) erzeugt permanente Daten (bekannt als „Zustand“), die jeder Computer, der das Netzwerk betreibt, auf unbestimmte Zeit speichern muss. Die aktuellen Gebühren für das Hinzufügen oder Lesen dieser Daten sind inkonsistent und spiegeln nicht unbedingt die tatsächliche, langfristige Speicherbelastung wider, die sie für die Hardware des Netzwerks darstellen.

Einige Aktionen, die auf Ethereum Zustand erzeugen, wie das Erstellen neuer Konten oder die Bereitstellung großer Smart Contracts, waren im Vergleich zu dem permanenten Speicherplatz, den sie auf den Knoten des Netzwerks einnehmen, relativ kostengünstig. Beispielsweise ist die Bereitstellung von Verträgen pro Byte deutlich günstiger als das Erstellen von Speicher-Slots.

Ohne Anpassung würde das Zustandswachstum von Ethereum unhaltbar werden, wenn das Netzwerk in Richtung der durch Glamsterdam ermöglichten Untergrenze des Gaslimits von 200 Millionen skaliert (wobei Entwickler derzeit mit einem Referenz-Block-Gaslimit von 150 Millionen testen, um eine genaue Zustandsbepreisung abzuleiten).

Die **Erhöhung der Gaskosten für die Zustandserstellung (oder EIP-8037)** harmonisiert die Kosten, indem sie an die tatsächliche Größe der erstellten Daten gebunden werden. Die Gebühren werden so aktualisiert, dass sie proportional zur Menge der permanenten Daten sind, die eine Operation erstellt oder auf die sie zugreift.

EIP-8037 führt außerdem ein Reservoir-Modell ein, um diese Kosten vorhersehbarer zu verwalten; Zustands-Gasgebühren werden zuerst aus dem `state_gas_reservoir` entnommen, und der Opcode `GAS` gibt nur `gas_left` zurück, was verhindert, dass Ausführungs-Frames das verfügbare Gas falsch berechnen. Um dies zu unterstützen, erhalten wesentliche Hintergrundaufgaben eine zusätzliche Gaszuteilung, die direkt in diese dedizierte Reserve fließt, um sicherzustellen, dass kritische Netzwerkoperationen nicht einfach deshalb fehlschlagen, weil die Speicherung permanenter Daten mehr Ressourcen erfordert.

Vor EIP-8037 teilten sich sowohl die Rechenarbeit (die aktive Verarbeitung) als auch die permanente Datenspeicherung (das Speichern des Smart Contracts in der Datenbank des Netzwerks) dasselbe Gaslimit. Das Reservoir-Modell teilt die Abrechnung auf: das Gaslimit für die eigentliche Rechenarbeit der Transaktion (Verarbeitung) und für die langfristige Datenspeicherung (Zustands-Gas). Die Trennung der beiden hilft zu verhindern, dass die schiere Größe der Daten einer Anwendung das Gaslimit ausschöpft; solange Entwickler genügend Mittel bereitstellen, um das Reservoir für die Datenspeicherung zu füllen, können sie viel größere und komplexere Smart Contracts bereitstellen.

Eine genauere und vorhersehbarere Bepreisung der Datenspeicherung wird Ethereum helfen, seine Geschwindigkeit und Kapazität sicher zu erhöhen, ohne die Datenbank aufzublähen. Diese Nachhaltigkeit wird es Knotenbetreibern ermöglichen, auch in den kommenden Jahren (relativ) erschwingliche Hardware zu verwenden, wodurch das Home-Staking zugänglich bleibt, um die Dezentralisierung des Netzwerks aufrechtzuerhalten.

**Ressourcen**: [Technische Spezifikation zu EIP-8037](https://eips.ethereum.org/EIPS/eip-8037)

### Aktualisierung der Gaskosten für den Zustandszugriff {#state-access-gas-cost-update}

- Erhöht die Gaskosten, wenn Anwendungen Informationen lesen oder aktualisieren, die dauerhaft auf Ethereum gespeichert sind (Zustandszugriffs-Opcodes), um genau der Rechenarbeit zu entsprechen, die diese Befehle erfordern
- Stärkt die Widerstandsfähigkeit des Netzwerks, indem Denial-of-Service-Angriffe verhindert werden, die künstlich billige Datenleseoperationen ausnutzen

Da der Zustand von Ethereum gewachsen ist, ist das Suchen und Lesen alter Daten („Zustandszugriff“) für Knoten schwerer und langsamer zu verarbeiten geworden. Die Gebühren für diese Aktionen sind gleich geblieben, obwohl es jetzt (in Bezug auf die Rechenleistung) etwas teurer ist, Informationen nachzuschlagen.

Infolgedessen sind einige spezifische Befehle derzeit im Verhältnis zu der Arbeit, zu der sie einen Knoten zwingen, zu niedrig bepreist. `EXTCODESIZE` und `EXTCODECOPY` sind beispielsweise zu niedrig bepreist, da sie zwei separate Datenbanklesevorgänge erfordern – einen für das Kontoobjekt und einen zweiten für die tatsächliche Codegröße oder den Bytecode.

Die **Aktualisierung der Gaskosten für den Zustandszugriff (oder EIP-8038)** erhöht die Gaskonstanten für Zustandszugriffs-Opcodes, wie das Nachschlagen von Konto- und Vertragsdaten, um sie an die moderne Hardwareleistung und Zustandsgröße anzupassen.

Die Anpassung der Kosten für den Zustandszugriff trägt auch dazu bei, Ethereum widerstandsfähiger zu machen. Da diese schweren Datenleseaktionen künstlich billig sind, könnte ein böswilliger Angreifer das Netzwerk in einem einzigen Block mit Tausenden von komplexen Datenanfragen spammen, bevor er das Gebührenlimit des Netzwerks erreicht, was möglicherweise dazu führt, dass das Netzwerk ins Stocken gerät oder abstürzt (ein Denial-of-Service-Angriff). Auch ohne böswillige Absicht werden Entwickler wirtschaftlich nicht dazu ermutigt, effiziente Anwendungen zu entwickeln, wenn das Lesen von Netzwerkdaten zu billig ist.

Durch eine genauere Bepreisung von Zustandszugriffsaktionen kann Ethereum widerstandsfähiger gegen versehentliche oder absichtliche Verlangsamungen sein, während die Anpassung der Netzwerkkosten an die Hardwareauslastung eine nachhaltigere Grundlage für zukünftige Erhöhungen des Gaslimits darstellt.

**Ressourcen**: [Technische Spezifikation zu EIP-8038](https://eips.ethereum.org/EIPS/eip-8038)

## Netzwerk-Widerstandsfähigkeit {#network-resilience}

Verfeinerungen der Validator-Aufgaben und Austrittsprozesse gewährleisten die Netzwerkstabilität bei Massen-Slashing-Ereignissen und demokratisieren die Liquidität. Diese Verbesserungen machen das Netzwerk stabiler und stellen sicher, dass alle Teilnehmer, ob groß oder klein, fair behandelt werden.

### Geslashte Validatoren vom Vorschlagen ausschließen {#exclude-slashed-validators}

- Verhindert, dass bestrafte (geslashte) Validatoren ausgewählt werden, um zukünftige Blöcke vorzuschlagen, wodurch garantiert verpasste Slots eliminiert werden
- Hält Ethereum reibungslos und zuverlässig am Laufen und verhindert schwere Ausfälle im Falle eines Massen-Slashing-Ereignisses

Derzeit kann das System einen Validator, selbst wenn er geslasht wird (bestraft für das Brechen der Regeln oder weil er nicht wie erwartet funktioniert), immer noch auswählen, um in naher Zukunft einen Block anzuführen, wenn es zukünftige Proposer-Vorausschauen generiert.

Da Blöcke von geslashten Proposern automatisch als ungültig abgelehnt werden, führt dies dazu, dass das Netzwerk Slots verpasst und die Netzwerkwiederherstellung bei Massen-Slashing-Ereignissen verzögert wird.

**Geslashte Validatoren vom Vorschlagen ausschließen (oder EIP-8045)** filtert geslashte Validatoren einfach heraus, sodass sie nicht für zukünftige Aufgaben ausgewählt werden. Dies verbessert die Widerstandsfähigkeit der Chain, indem sichergestellt wird, dass nur gesunde Validatoren ausgewählt werden, um Blöcke vorzuschlagen, wodurch die Servicequalität bei Netzwerkstörungen aufrechterhalten wird.

**Ressourcen**: [Technische Spezifikation zu EIP-8045](https://eips.ethereum.org/EIPS/eip-8045)

### Austritte die Konsolidierungswarteschlange nutzen lassen {#let-exits-use-the-consolidation-queue}

- Schließt ein Schlupfloch, das es Validatoren mit hohem Guthaben ermöglicht, das Netzwerk über die Konsolidierungswarteschlange schneller zu verlassen als kleinere Validatoren
- Ermöglicht es regulären Austritten, in diese zweite Warteschlange überzulaufen, wenn sie freie Kapazitäten hat, was die Zeiten für Staking-Abhebungen in Zeiten hohen Aufkommens reduziert
- Behält strenge Sicherheit bei, um zu vermeiden, dass die Kernsicherheitsgrenzen von Ethereum geändert oder das Netzwerk geschwächt wird

Seit das [Pectra-Upgrade](/roadmap/pectra) das maximale effektive Guthaben für Ethereum-Validatoren von 32 ETH auf 2.048 ETH erhöht hat, ermöglicht ein technisches Schlupfloch Validatoren mit hohem Guthaben, das Netzwerk über die Konsolidierungswarteschlange schneller zu verlassen als kleinere Validatoren.

**Austritte die Konsolidierungswarteschlange nutzen lassen (oder EIP-8080)** demokratisiert die Konsolidierungswarteschlange für alle Staking-Austritte und schafft eine einzige, faire Schlange für alle.

Um aufzuschlüsseln, wie das heute funktioniert:

- Das Churn-Limit von Ethereum ist ein Sicherheitslimit für die Rate, mit der Validatoren eintreten, austreten oder ihre gestakten ETH zusammenführen (konsolidieren) können, um sicherzustellen, dass die Sicherheit des Netzwerks niemals destabilisiert wird
- Da eine Validator-Konsolidierung eine schwerere Aktion mit mehr beweglichen Teilen ist als ein Standard-Validator-Austritt, verbraucht sie einen größeren Teil dieses Sicherheitsbudgets (Churn-Limit)
- Konkret schreibt das Protokoll vor, dass die genauen Sicherheitskosten eines Standard-Austritts zwei Drittel (2/3) der Kosten einer Konsolidierung betragen

Fairere Austrittswarteschlangen werden es Standard-Austritten ermöglichen, in Zeiten hoher Austrittsnachfrage ungenutzten Platz aus der Konsolidierungswarteschlange zu leihen, wobei ein „3 für 2“-Wechselkurs angewendet wird (für jeweils 2 ungenutzte Konsolidierungsplätze kann das Netzwerk sicher 3 Standard-Austritte verarbeiten). Dieser 3/2-Churn-Faktor gleicht die Nachfrage über die Konsolidierungs- und Austrittswarteschlangen hinweg aus.

Die Demokratisierung des Zugangs zur Konsolidierungswarteschlange wird die Geschwindigkeit, mit der Benutzer ihren Stake in Zeiten hoher Nachfrage abheben können, um das bis zu 2,5-fache erhöhen, ohne die Netzwerksicherheit zu beeinträchtigen.

**Ressourcen**: [Technische Spezifikation zu EIP-8080](https://eips.ethereum.org/EIPS/eip-8080)

## Verbesserung der Benutzer- und Entwicklererfahrung {#improve-user-developer-experience}

Das Glamsterdam-Upgrade von Ethereum zielt darauf ab, die Benutzererfahrung zu verbessern, die Auffindbarkeit von Daten zu erhöhen und steigende Nachrichtengrößen zu bewältigen, um Synchronisierungsfehler zu vermeiden. Dies macht es einfacher zu verfolgen, was Onchain passiert, und verhindert gleichzeitig technische Probleme, wenn das Netzwerk skaliert.

### Reduzierung der intrinsischen Transaktionsgaskosten {#reduce-intrinsic-transaction-gas-costs}

- Senkt die Grundgebühr für Transaktionen und reduziert so die Gesamtkosten einer einfachen nativen ETH-Zahlung
- Macht kleinere Transfers erschwinglicher und stärkt die Rentabilität von Ethereum als routinemäßiges Tauschmittel

Alle Ethereum-Transaktionen haben heute eine pauschale Gas-Grundgebühr, unabhängig davon, wie einfach oder komplex ihre Verarbeitung ist. **Reduzierung des intrinsischen Transaktionsgases (oder EIP-2780)** schlägt vor, diese Grundgebühr zu senken, um einen Standard-ETH-Transfer zwischen bestehenden Konten um bis zu **71 % günstiger** zu machen.

Die Reduzierung des intrinsischen Transaktionsgases funktioniert, indem die Transaktionsgebühr so aufgeschlüsselt wird, dass sie nur die grundlegende, wesentliche Arbeit widerspiegelt, die die Computer, die das Netzwerk betreiben, tatsächlich ausführen, wie die Überprüfung einer digitalen Signatur und die Aktualisierung eines Saldos. Da eine einfache ETH-Zahlung keinen komplexen Code ausführt oder zusätzliche Daten enthält, würde dieser Vorschlag ihre Gebühr reduzieren, um ihrem geringen Fußabdruck zu entsprechen.

Der Vorschlag führt eine Ausnahme für die Erstellung brandneuer Konten ein, um zu verhindern, dass niedrigere Gebühren den Zustand des Netzwerks überlasten. Wenn ein Transfer ETH an eine leere, nicht existierende Adresse sendet, muss das Netzwerk einen permanenten neuen Datensatz dafür erstellen. Für diese Kontoerstellung wird ein Gasaufschlag hinzugefügt, um die langfristige Speicherbelastung zu decken.

Zusammen zielt EIP-2780 darauf ab, alltägliche Transfers zwischen bestehenden Konten erschwinglicher zu machen und gleichzeitig sicherzustellen, dass das Netzwerk weiterhin vor Datenbankaufblähung geschützt ist, indem das wahre Zustandswachstum genau bepreist wird.

**Ressourcen**: [Technische Spezifikation zu EIP-2780](https://eips.ethereum.org/EIPS/eip-2780)

### Deterministisches Factory-Predeploy {#deterministic-factory-predeploy}

- Bietet Entwicklern eine native Möglichkeit, Anwendungen und Smart-Contract-Wallets auf genau derselben Adresse über mehrere Chains hinweg bereitzustellen
- Ermöglicht es Benutzern, dieselbe Smart-Wallet-Adresse in mehreren Layer-2-Netzwerken (L2) zu haben, was die kognitive Belastung, Verwirrung und das Risiko eines versehentlichen Verlusts von Geldern verringert
- Ersetzt die Workarounds, die Entwickler derzeit verwenden, um diese Parität zu erreichen, und macht es einfacher und sicherer, Multi-Chain-Wallets und -Apps zu erstellen

Wenn ein Benutzer heute eine Smart-Contract-Wallet mit Konten über mehrere mit der Ethereum Virtual Machine (EVM) kompatible Chains hinweg hat, erhält er oft eine völlig andere Adresse in verschiedenen Netzwerken. Dies ist nicht nur verwirrend, sondern kann auch zu einem versehentlichen Verlust von Geldern führen.

**Deterministisches Factory-Predeploy (oder EIP-7997)** bietet Entwicklern eine native, integrierte Möglichkeit, ihre dezentralen Anwendungen und Smart-Contract-Wallets auf genau derselben Adresse über mehrere EVM-Chains hinweg bereitzustellen, einschließlich des Ethereum Mainnet, Layer-2-Netzwerken (L2) und mehr. Bei Annahme würde es Benutzern ermöglichen, auf jeder teilnehmenden Chain genau dieselbe Adresse zu haben, was die kognitive Belastung und das Potenzial für Benutzerfehler erheblich reduziert.

Deterministisches Factory-Predeploy funktioniert, indem ein minimales, spezialisiertes Factory-Programm dauerhaft an einem identischen Ort (insbesondere Adresse 0x12) auf jeder teilnehmenden EVM-kompatiblen Chain platziert wird. Sein Ziel ist es, einen universellen Standard-Factory-Vertrag bereitzustellen, der von jedem EVM-kompatiblen Netzwerk übernommen werden kann; solange eine EVM-Chain teilnimmt und diesen Standard übernimmt, können Entwickler ihn verwenden, um ihre Smart Contracts auf genau derselben Adresse in diesem Netzwerk bereitzustellen.

Diese Standardisierung vereinfacht die Erstellung und Verwaltung kettenübergreifender Anwendungen für Entwickler und das breitere Ökosystem. Entwickler müssen keinen benutzerdefinierten, Chain-spezifischen Code mehr schreiben, um ihre Software über verschiedene Netzwerke hinweg miteinander zu verknüpfen, sondern verwenden stattdessen diese universelle Factory, um überall genau dieselbe Adresse für ihre Anwendung zu generieren. Darüber hinaus können Block-Explorer, Tracking-Dienste und Wallets diese Anwendungen und Konten über verschiedene Chains hinweg leichter identifizieren und verknüpfen, wodurch eine einheitlichere und nahtlosere Multi-Chain-Umgebung für alle Ethereum-basierten Teilnehmer geschaffen wird.

**Ressourcen**: [Technische Spezifikation zu EIP-7997](https://eips.ethereum.org/EIPS/eip-7997)

### ETH-Transfers und -Burns geben ein Log aus {#eth-transfers-and-burns-emit-a-log}

- Generiert automatisch einen permanenten Datensatz (Log), jedes Mal, wenn ETH transferiert oder verbrannt (burned) wird
- Behebt einen historischen blinden Fleck, der es Apps, Börsen und Brücken ermöglicht, Benutzereinzahlungen ohne Ad-hoc-Tracing-Tools zuverlässig zu erkennen

Im Gegensatz zu Token (ERC-20s) geben reguläre ETH-Transfers zwischen Smart Contracts keinen klaren Transaktionsbeleg (Standard-Log) aus, was es für Börsen und Apps schwierig macht, sie zu verfolgen.

Dass ETH-Transfers und -Burns ein Log ausgeben (oder EIP-7708), macht es für das Netzwerk obligatorisch, jedes Mal ein Standard-Log-Ereignis auszugeben, wenn ein ETH-Betrag ungleich Null bewegt oder verbrannt wird.

Dies wird es für Wallets, Börsen und Brückenbetreiber viel einfacher und zuverlässiger machen, Einzahlungen und Bewegungen ohne benutzerdefinierte Tools genau zu verfolgen.

**Ressourcen**: [Technische Spezifikation zu EIP-7708](https://eips.ethereum.org/EIPS/eip-7708)

### eth/70 partielle Block-Transaktionsbeleg-Listen {#eth-70-partial-block-receipt-lists}

Da wir die Menge an Arbeit erhöhen, die Ethereum leisten kann, werden die Listen der Transaktionsbelege für diese Aktionen (die Datensätze dieser Transaktionen) so groß, dass sie möglicherweise dazu führen könnten, dass die Knoten des Netzwerks ausfallen, wenn sie versuchen, Daten miteinander zu synchronisieren.

Die eth/70 partiellen Block-Transaktionsbeleg-Listen (oder EIP-7975), die nun eine Anforderung für alle Clients der Ausführungsschicht sind, führen eine neue Möglichkeit für Knoten ein, miteinander zu kommunizieren (eth/70), die es ermöglicht, diese großen Listen in kleinere, handlichere Teile zu zerlegen. eth/70 führt ein Paginierungssystem für das Kommunikationsprotokoll des Netzwerks ein, das es Knoten ermöglicht, Block-Transaktionsbeleg-Listen aufzuschlüsseln und die Daten sicher in kleineren, handlicheren Blöcken anzufordern.

Diese Änderung würde Synchronisierungsfehler im Netzwerk in Zeiten starker Aktivität verhindern. Letztendlich ebnet sie den Weg für Ethereum, seine Blockkapazität zu erhöhen und in Zukunft mehr Transaktionen pro Block zu verarbeiten, ohne die physische Hardware zu überlasten, die die Chain synchronisiert.

**Ressourcen**: [Technische Spezifikation zu EIP-7975](https://eips.ethereum.org/EIPS/eip-7975)

## Weiterführende Literatur {#further-reading}

- [Ethereum-Roadmap](/roadmap/)
- [Forkcast: Glamsterdam](https://forkcast.org/upgrade/glamsterdam)
- [Glamsterdam Meta-EIP](https://eips.ethereum.org/EIPS/eip-7773)
- [Blog-Ankündigung: Update der Protokollprioritäten für 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [The Daily Gwei Refuel Podcast – Post-Quantum-Ethereum, Glamsterdam kommt](https://www.youtube.com/watch?v=qx9sd50uQjQ)

## Häufig gestellte Fragen (FAQ) {#faq}

### Wie kann ETH nach dem Glamsterdam Hard Fork konvertiert werden? {#how-can-eth-be-converted-after-the-hardfork}

- **Keine Aktion für deine ETH erforderlich**: Es besteht keine Notwendigkeit, deine ETH nach dem Glamsterdam-Upgrade zu konvertieren oder zu aktualisieren. Deine Kontostände bleiben gleich, und die ETH, die du derzeit hältst, bleiben nach dem Hard Fork in ihrer bestehenden Form zugänglich.
- **Vorsicht vor Betrug!** <Emoji text="⚠️" /> **Jeder, der dich anweist, deine ETH zu „aktualisieren“, versucht, dich zu betrügen.** Du musst im Zusammenhang mit diesem Upgrade nichts tun. Deine Vermögenswerte bleiben völlig unberührt. Denke daran, dass es die beste Verteidigung gegen Betrug ist, informiert zu bleiben.

[Mehr zum Erkennen und Vermeiden von Betrug](/security/)

### Betrifft das Glamsterdam-Upgrade alle Ethereum-Knoten und -Validatoren? {#does-the-glamsterdam-upgrade-affect-all-ethereum-nodes-and-validators}

Ja, das Glamsterdam-Upgrade erfordert Updates sowohl für [Ausführungs-Clients als auch für Konsens-Clients](/developers/docs/nodes-and-clients/). Da dieses Upgrade die verankerte Proposer-Builder-Trennung (ePBS) einführt, müssen Knotenbetreiber sicherstellen, dass ihre Clients aktualisiert werden, um die neuen Methoden zu handhaben, mit denen Blöcke vom Netzwerk erstellt, validiert und bestätigt werden.

Alle wichtigen Ethereum-Clients werden Versionen veröffentlichen, die den Hard Fork unterstützen und als hohe Priorität markiert sind. Du kannst dich darüber auf dem Laufenden halten, wann diese Versionen verfügbar sein werden, indem du die GitHub-Repos der Clients, ihre [Discord-Kanäle](https://ethstaker.org/support), den [EthStaker Discord](https://dsc.gg/ethstaker) verfolgst oder den Ethereum-Blog für Protokoll-Updates abonnierst.

Um die Synchronisierung mit dem Ethereum-Netzwerk nach dem Upgrade aufrechtzuerhalten, müssen Knotenbetreiber sicherstellen, dass sie eine unterstützte Client-Version ausführen. Beachte, dass die Informationen zu Client-Releases zeitkritisch sind und Benutzer sich für die aktuellsten Details auf die neuesten Updates beziehen sollten.

### Was muss ich als Staker für das Glamsterdam-Upgrade tun? {#as-a-staker-what-do-i-need-to-do-for-the-glamsterdam-upgrade}

Wie bei jedem Netzwerk-Upgrade solltest du sicherstellen, dass du deine Clients auf die neuesten Versionen aktualisierst, die mit Glamsterdam-Unterstützung gekennzeichnet sind. Verfolge die Updates in der Mailingliste und den [Protokollankündigungen auf dem EF-Blog](https://blog.ethereum.org/category/protocol), um über Releases informiert zu werden.

Um dein Setup zu validieren, bevor Glamsterdam im Mainnet aktiviert wird, kannst du einen Validator in Testnetzen ausführen. Testnetz-Forks werden ebenfalls in der Mailingliste und im Blog angekündigt.

### Welche Verbesserungen wird Glamsterdam für die Skalierung von Layer 1 (L1) beinhalten? {#what-improvements-will-glamsterdam-include-for-l1-scaling}

Das Hauptmerkmal ist ePBS (EIP-7732), das die schwere Aufgabe der Validierung von Netzwerktransaktionen von der Aufgabe der Konsensfindung trennt. Dies erweitert das Datenverbreitungsfenster von 2 Sekunden auf etwa 9 Sekunden und ermöglicht es Ethereum, einen viel höheren Transaktionsdurchsatz sicher zu bewältigen und mehr Daten-Blobs für Layer-2-Netzwerke aufzunehmen.

### Wird Glamsterdam die Gebühren auf Ethereum (Layer 1) senken? {#will-glamsterdam-lower-fees-on-ethereum-layer-1}

Ja, Glamsterdam wird höchstwahrscheinlich die Gebühren für alltägliche Benutzer senken! Die Reduzierung des intrinsischen Transaktionsgases (oder EIP-2780) senkt die Grundgebühr für das Senden von ETH, wodurch die Nutzung von ETH für alltägliche Zahlungen viel günstiger wird.

Darüber hinaus führt Glamsterdam für die langfristige Nachhaltigkeit Block-Level Access Lists (BALs) ein. Dies ermöglicht eine parallele Verarbeitung und bereitet Layer 1 (L1) darauf vor, in Zukunft höhere Gesamt-Gaslimits sicher zu handhaben, was wahrscheinlich die Gaskosten pro Transaktion senken wird, wenn die Kapazität wächst.

### Wird es nach Glamsterdam Änderungen an meinen bestehenden Smart Contracts geben? {#will-my-smart-contracts-change}

Bestehende Verträge werden nach Glamsterdam weiterhin normal funktionieren. Entwickler werden wahrscheinlich mehrere neue Tools erhalten und sollten ihren Gasverbrauch überprüfen:

- Die Erhöhung der maximalen Vertragsgröße (oder EIP-7954) ermöglicht es Entwicklern, größere Anwendungen bereitzustellen, indem das Limit für die maximale Vertragsgröße von etwa 24 KiB auf 32 KiB angehoben wird.
- Das deterministische Factory-Predeploy (oder EIP-7997) führt einen universellen, integrierten Factory-Vertrag ein. Es ermöglicht Entwicklern, ihre Anwendungen und Smart-Contract-Wallets auf genau derselben Adresse über alle teilnehmenden EVM-Chains hinweg bereitzustellen.
- Wenn deine App auf komplexes Tracing angewiesen ist, um ETH-Transfers zu finden, wird dir die Tatsache, dass ETH-Transfers und -Burns ein Log ausgeben (oder EIP-7708), ermöglichen, für eine einfachere und zuverlässigere Abrechnung auf die Verwendung von Logs umzusteigen.
- Die Erhöhung der Gaskosten für die Zustandserstellung (oder EIP-8037) und die Aktualisierung der Gaskosten für den Zustandszugriff (oder EIP-8038) führen neue Nachhaltigkeitsmodelle ein, die bestimmte Kosten für die Bereitstellung von Verträgen ändern werden, da die Erstellung neuer Konten oder permanenten Speichers eine neue standardisierte feste Gebühr basierend auf der Größe der erstellten Daten haben wird.

### Wie wird sich Glamsterdam auf die Speicher- und Hardwareanforderungen von Knoten auswirken? {#how-will-glamsterdam-affect-node-storage-and-hardware-requirements}

Mehrere EIPs, die für Glamsterdam in Betracht gezogen werden, befassen sich mit dem Leistungseinbruch durch das Zustandswachstum:

- Die Erhöhung der Gaskosten für die Zustandserstellung (oder EIP-8037) führt ein Festkosten-Framework (CPSB) ein, um eine Wachstumsrate der Zustandsdatenbank von 120 GiB/Jahr anzustreben, wodurch sichergestellt wird, dass standardmäßige physische Hardware das Netzwerk weiterhin effizient betreiben kann.
- eth/70 partielle Block-Transaktionsbeleg-Listen (oder EIP-7975) ermöglichen es Knoten, paginierte Block-Transaktionsbelege anzufordern, was datenintensive Block-Transaktionsbeleg-Listen in kleinere Blöcke aufteilt, um Abstürze und Synchronisierungsprobleme bei der Skalierung von Ethereum zu verhindern.