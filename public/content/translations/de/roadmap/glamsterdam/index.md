---
title: Glamsterdam
description: "Erfahren Sie mehr über das Glamsterdam Protokoll -Upgrade."
lang: de
---
# Glamsterdam {#glamsterdam}


<Alert variant="update">
<AlertContent>
<AlertTitle>
Glamsterdam ist ein bevorstehendes Ethereum-Upgrade, das für das erste Halbjahr 2026 geplant ist
</AlertTitle>
<AlertDescription>
Das Glamsterdam-Upgrade ist nur ein einziger Schritt in den langfristigen Entwicklungszielen von Ethereum. Erfahren Sie mehr über [die Protokoll Roadmap](/roadmap/) und [frühere Upgrades](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

Das bevorstehende Glamsterdam-Upgrade [von Ethereum](/) soll den Weg für die nächste Generation der Skalierung ebnen. Glamsterdam ist eine Kombination aus „Amsterdam“ (Upgrade der Ausführungsebene, benannt nach einem früheren Devconnect-Standort) und „Gloas“ (Upgrade der Konsensebene, benannt nach einem Stern).

Nach den Fortschritten bei der [Fusaka](/roadmap/fusaka/) -Aktualisierung konzentriert sich Glamsterdam auf die Skalierung der L1, indem es die Art und Weise, wie das Netzwerk Transaktionen verarbeitet und seine wachsende Datenbank verwaltet, neu organisiert und die Art und Weise, wie Ethereum Blöcke erstellt und verifiziert, grundlegend aktualisiert.

Während sich Fusaka auf grundlegende Verfeinerungen konzentrierte, fördert Glamsterdam die Ziele „Scale L1“ und „Scale Blobs“, indem es die Trennung der Aufgaben zwischen verschiedenen Netzwerk festschreibt und effizientere Methoden zur Datenverarbeitung einführt, um den [Zustand](/glossary/#state) für eine hochdurchsatzfähige Parallelisierung vorzubereiten. 

Diese Verbesserungen stellen sicher, dass Ethereum schnell, erschwinglich und dezentralisiert bleibt, während es mehr Aktivität verarbeitet und gleichzeitig die Hardwareanforderungen für Personen, die [Knoten](/glossary/#node) zu Hause betreiben, überschaubar bleiben.

<YouTube id="GgKveVMLnoo" />

## Verbesserungen für Glamsterdam in Betracht gezogen {#improvements-in-glamsterdam}

<Alert variant="info">
<AlertContent>
<AlertDescription>
Hinweis: Dieser Artikel beleuchtet derzeit eine Auswahl von EIPs, die für die Aufnahme in Glamsterdam in Betracht gezogen werden. Die neuesten Status-Updates finden Sie im [Glamsterdam-Upgrade auf Forkcast](https://forkcast.org/upgrade/glamsterdam). 

Wenn Sie einen EIP hinzufügen möchten, der für Glamsterdam in Betracht gezogen wird, aber noch nicht auf dieser Seite hinzugefügt wurde, [erfahren Sie hier, wie Sie zu ethereum.org beitragen können](/contributing/).
</AlertDescription>
</AlertContent>
</Alert>

Das Glamsterdam-Upgrade konzentriert sich auf drei Hauptziele:

- Beschleunigung der Verarbeitung (Parallelisierung): Neuorganisation der Art und Weise, wie das Netzwerk Datenabhängigkeiten erfasst, sodass es viele Transaktionen gleichzeitig und nicht in einer langsamen, sequenziellen Reihenfolge sicher verarbeiten kann.
- Kapazitätserweiterung: Die Aufteilung der Schwerarbeit bei der Erstellung und Verifizierung von Blöcke gibt dem Netzwerk mehr Zeit, größere Datenmengen zu übertragen, ohne sich zu verlangsamen.
- Verhinderung von Datenbank-Bloat (Nachhaltigkeit): Anpassung der Netzwerk, um die langfristigen Hardwarekosten für die Speicherung neuer Daten genau widerzuspiegeln, Aufhebung zukünftiger Gaslimit -Erhöhungen und gleichzeitige Verhinderung einer Verschlechterung der Hardwareleistung.

Kurz gesagt, Glamsterdam wird strukturelle Änderungen einführen, um sicherzustellen, dass das Netzwerk bei zunehmender Kapazität nachhaltig bleibt und die Leistung hoch bleibt.

## Skalierung L1 und parallele Verarbeitung {#scale-l1}

Eine sinnvolle L1- Skalierung erfordert die Abkehr von Off-Protocol-Vertrauensannahmen und seriellen Ausführungsbeschränkungen. Glamsterdam begegnet dem, indem es die Trennung bestimmter Blockbauaufgaben festschreibt und neue Datenstrukturen einführt, die es dem Netzwerk ermöglichen, sich auf die parallele Verarbeitung vorzubereiten.

### Vorschlag für das Hauptthema: Verankerte Trennung von Vorschlagenden und Erbauer (ePBS) {#epbs}

- Beseitigt vertrauensbasierte Annahmen außerhalb des Protokolls und die Abhängigkeit von Drittanbieter-Relays
- Ermöglicht L1-Skalierung durch wesentlich größere Nutzlasten über erweiterte Ausbreitungsfenster
- Führt vertrauenslose Builder-Zahlungen direkt in das Protokoll ein

Derzeit umfasst der Prozess des Vorschlagens und Erstellens von Blöcken eine Übergabe zwischen Block-Proposern und Block-Buildern. Die Beziehung zwischen Proposern und Buildern ist nicht Teil des Ethereum-Kernprotokolls, daher ist sie auf vertrauenswürdige Drittanbieter-Middleware, Software (Relays) und außerprotokollarisches Vertrauen zwischen Entitäten angewiesen.

Die außerprotokollarische Beziehung zwischen Proposern und Buildern erzeugt auch einen „Hot Path” während der Blockvalidierung, der [die Validatoren](/glossary/#validator) zwingt, die Transaktionsübertragung und -ausführung in einem engen 2-Sekunden-Fenster zu beschleunigen, was die Datenmenge begrenzt, die das Netzwerk verarbeiten kann.

**Die verankerte Trennung von Proposer und Builder (ePBS oder EIP-7732)** trennt formell die Aufgabe des Proposers (der den Konsensblock auswählt) von der des Builders (der die Ausführungsnutzlast zusammenstellt) und verankert diese Übergabe direkt im Protokoll.

Der vertrauenslose Austausch einer Block-Nutzlast gegen Zahlung direkt im Protokoll beseitigt die Notwendigkeit für Drittanbieter-Middleware (wie MEV-Boost). Allerdings könnten Builder und Proposer weiterhin außerprotokollarische Relays oder Middleware für komplexe Funktionen nutzen, die noch nicht Teil des Kernprotokolls sind.

Um den „Hot Path”-Engpass zu beheben, führt ePBS auch das Payload Timeliness Committee (PTC) und eine Dual-Deadline-Logik ein, die es Validatoren ermöglicht, den Konsensblock und die Pünktlichkeit der Ausführungsnutzlast separat zu attestieren, um den Durchsatz zu maximieren.

<YouTube id="u8XvkTrjITs" />

Die Trennung der Rollen von Proposer und Builder auf Protokollebene erweitert das Ausbreitungsfenster (oder die Zeit, die für die Verbreitung von Daten im Netzwerk zur Verfügung steht) von 2 Sekunden auf etwa 9 Sekunden.

Durch den Ersatz von außerprotokollarischer Middleware und Relays durch protokollinterne Mechanismen reduziert ePBS Vertrauensabhängigkeiten und ermöglicht es Ethereum, viel größere Datenmengen (wie mehr Blobs für [Ebene-2-Lösungen](/glossary/#layer-2)) sicher zu verarbeiten, ohne das Netzwerk zu belasten.

**Ressourcen**: [Technische Spezifikation von EIP-7732](https://eips.ethereum.org/EIPS/eip-7732)

### Vorschlag für ein Hauptthema: Zugriffslisten auf Blockebene (BALs) {#bals}

- Eliminiert Engpässe bei der sequenziellen Verarbeitung, indem eine Vorauswahl aller Transaktion bereitgestellt wird, die die Grundlage dafür bildet, dass Validatoren viele Transaktionen parallel statt einzeln verarbeiten können.
- Ermöglicht es den Knoten, ihre Aufzeichnungen durch Lesen der Endergebnisse zu aktualisieren, ohne jede Transaktion erneut abspielen zu müssen (ausführungslose Synchronisierung), was die Synchronisierung eines Knotens mit dem Netzwerk erheblich beschleunigt.
- Eliminiert das Rätselraten und ermöglicht es den Validatoren, alle notwendigen Daten auf einmal vorzuladen, anstatt sie Schritt für Schritt zu entdecken, was die Validierung erheblich beschleunigt. 

Das heutige Ethereum ist wie eine einspurige Straße. Da das Netzwerk nicht weiß, welche Daten eine Transaktion benötigen oder ändern wird (z. B. welche Konten eine Transaktion berühren wird), bis eine Transaktion ausgeführt wurde, müssen Validatoren Transaktionen einzeln in einer strengen, sequenziellen Reihenfolge verarbeiten. Wenn sie versuchen würden, die Transaktionen alle auf einmal zu verarbeiten, ohne diese Abhängigkeiten zu kennen, könnten zwei Transaktionen versehentlich versuchen, genau dieselben Daten gleichzeitig zu ändern, was zu Fehlern führen würde.

**Block-Level Access Lists (BALs oder EIP-7928)** sind wie eine Karte, die in jedem Block enthalten ist und dem Netzwerk mitteilt, auf welche Teile der Datenbank zugegriffen wird, bevor die Arbeit beginnt. BALs erfordern, dass jeder Block den Hash jeder Konto, die die Transaktionen berühren werden, zusammen mit den Endergebnissen dieser Änderungen (der Hash Datensatz aller Zustandszugriffe und Werte nach der Ausführung) enthält. 

Da sie sofortige Transparenz darüber geben, welche Transaktionen sich nicht überschneiden, ermöglichen BALs Knoten, parallele Festplattenlesevorgänge durchzuführen und Informationen für viele Transaktionen gleichzeitig abzurufen. Das Netzwerk kann nicht zusammenhängende Transaktionen sicher gruppieren und parallel verarbeiten. 

Da die BAL die Endergebnisse von Transaktionen (die Werte nach der Ausführung) enthält, können die Knoten des Netzwerks, wenn sie sich mit dem aktuellen Zustand des Netzwerks synchronisieren müssen, diese Endergebnisse kopieren, um ihre Aufzeichnungen zu aktualisieren. Validatoren müssen nicht mehr alle komplizierten Transaktionen von Grund auf neu abspielen, um zu wissen, was passiert ist, was es für neue Knoten schneller und einfacher macht, dem Netzwerk beizutreten. 

Die durch BALs ermöglichten parallelen Festplattenlesevorgänge werden ein wichtiger Schritt in Richtung einer Zukunft sein, in der Ethereum viele Transaktionen gleichzeitig verarbeiten kann, wodurch die Geschwindigkeit des Netzwerks erheblich erhöht wird.

#### eth/71 Block austauschen {#bale}

Der Block-Zugriffslisten-Austausch (eth/71 oder EIP-8159) ist das direkte Netzwerk-Pendant zu Block-Zugriffslisten. Während BALs die parallele Ausführung ermöglichen, aktualisiert eth/71 das Peer-to-Peer Protokoll, um Knoten die tatsächliche gemeinsame Nutzung dieser Listen über das Netzwerk zu ermöglichen. Die Implementierung des Block Zugriffslisten-Austauschs wird eine schnellere Synchronisierung ermöglichen und es Knoten erlauben, zustandslose Updates durchzuführen.

**Ressourcen**: 
- [Technische Spezifikation für EIP-7928](https://eips.ethereum.org/EIPS/eip-7928)
- [Technische Spezifikation von EIP-8159](https://eips.ethereum.org/EIPS/eip-8159)

## Nachhaltigkeit des Netzwerks {#network-sustainability}

Da das Ethereum- Netzwerk immer schneller wächst, ist es wichtig sicherzustellen, dass die Kosten für die Nutzung mit dem Verschleiß der Hardware, auf der Ethereum läuft, übereinstimmen. Das Netzwerk muss seine Gesamtkapazitätsgrenzen erhöhen, um mehr Transaktionen sicher zu skalieren und zu verarbeiten. 

### Erhöhung der Gas für die Erstellung von States {#state-creation-gas-cost-increase}

- Stellt sicher, dass die Gebühren für die Erstellung neuer Konten oder Smart Contracts die langfristige Belastung, die sie für die Datenbank von Ethereum darstellen, genau widerspiegeln.
- Passt diese Gebühren für die Datenerstellung automatisch an die Gesamtkapazität des Netzwerks an und zielt auf eine sichere und vorhersehbare Wachstumsrate ab, damit Standard-Hardware das Netzwerk weiterhin betreiben kann.
- Trennt die Abrechnung für diese spezifischen Gebühren in ein neues Reservoir, hebt alte Transaktion auf und ermöglicht Entwicklern die Bereitstellung größerer, komplexerer Anwendungen.

Das Hinzufügen neuer Konten, Token und [Smart Contracts](/glossary/#smart-contract) erzeugt permanente Daten (bekannt als „Zustand“), die jeder Computer, auf dem das Netzwerk läuft, auf unbestimmte Zeit speichern muss. Die aktuellen Gebühren für das Hinzufügen oder Lesen dieser Daten sind inkonsistent und spiegeln nicht unbedingt die tatsächliche, langfristige Speicherlast wider, die sie auf die Hardware des Netzwerks ausüben.

Einige Aktionen, die einen Zustand auf Ethereum erzeugen, wie das Erstellen neuer Konten oder das Bereitstellen großer Smart Contracts, waren im Vergleich zu dem permanenten Speicherplatz, den sie auf den Knoten des Netzwerks einnehmen, relativ kostengünstig. Beispielsweise ist die Bereitstellung von Verträgen pro Byte deutlich billiger als das Erstellen von Speicherplätzen. 

Ohne Anpassung könnte der Zustand von Ethereum um fast 200 GiB pro Jahr wachsen, wenn das Netzwerk auf ein Gaslimit von 100 Mio. skaliert, und schließlich die gängige Hardware übertreffen. 

**Die Erhöhung der Gas für die Erstellung von Zuständen (oder EIP-8037)** harmonisiert die Kosten, indem sie an die tatsächliche Größe der erstellten Daten gebunden werden, und aktualisiert die Gebühren so, dass sie proportional zur Menge der permanenten Daten sind, die eine Operation erstellt oder auf die sie zugreift. 

EIP-8037 führt auch ein Reservoir-Modell ein, um diese Kosten vorhersehbarer zu verwalten; State- Gas Gebühren werden zuerst aus dem `state_gas_reservoir` entnommen, und der `GAS`-Opcode gibt nur `gas_left` zurück, wodurch verhindert wird, dass Ausführungs-Frames das verfügbare Gas falsch berechnen.

Vor EIP-8037 teilen sich sowohl die Rechenarbeit (die aktive Verarbeitung) als auch die permanente Datenspeicherung (das Speichern des Smart Contract in der Datenbank des Netzwerks) dasselbe Gaslimit. Das Reservoir-Modell teilt die Abrechnung auf: das Gaslimit für die eigentliche Rechenarbeit der Transaktion (Verarbeitung) und für die langfristige Datenspeicherung (State Gas). Die Trennung der beiden hilft zu verhindern, dass die schiere Größe der Daten einer Anwendung das Gaslimit erreicht; solange Entwickler genügend Mittel bereitstellen, um das Reservoir für die Datenspeicherung zu füllen, können sie viel größere und komplexere Smart Contracts bereitstellen. 

Eine genauere und vorhersehbarere Preisgestaltung für die Datenspeicherung wird Ethereum dabei helfen, seine Geschwindigkeit und Kapazität sicher zu erhöhen, ohne die Datenbank aufzublähen. Diese Nachhaltigkeit wird es den Blockchain-Knoten ermöglichen, auch in den kommenden Jahren (relativ) erschwingliche Hardware zu verwenden, wodurch das Staking von zu Hause aus zugänglich bleibt und die Dezentralisierung des Netzwerks aufrechterhalten wird.

**Ressourcen**: [Technische Spezifikation EIP-8037](https://eips.ethereum.org/EIPS/eip-8037)

### Aktualisierung der Gaskosten für den Zustandszugriff {#state-access-gas-cost-update}

- Erhöht die Gas für Anwendungen, die Informationen lesen oder aktualisieren, die dauerhaft auf Ethereum gespeichert sind (State-Access-Opcodes), um die Rechenarbeit, die diese Befehle erfordern, genau abzugleichen.
- Stärkt die Netzwerkresilienz durch die Verhinderung von Denial-of-Service-Angriffen, die künstlich vergünstigte Datenleseoperationen ausnutzen

Da der Zustand von Ethereum gewachsen ist, ist das Suchen und Lesen alter Daten („Zustandszugriff“) für Knoten schwerer und langsamer geworden. Die Gebühren für diese Aktionen sind gleich geblieben, obwohl es jetzt etwas teurer ist, Informationen nachzuschlagen (in Bezug auf die Rechenleistung). 

Infolgedessen sind einige spezifische Befehle derzeit im Verhältnis zu der Arbeit, die sie einen Blockchain-Knoten zwingen zu tun, unterbewertet. `EXTCODESIZE` und `EXTCODECOPY` sind beispielsweise unterbewertet, da sie zwei separate Datenbanklesevorgänge erfordern – einen für das Konto und einen zweiten für die tatsächliche Codegröße oder den Bytecode.

**Die Aktualisierung der Gas für den Staatszugriff (oder EIP-8038)** erhöht die Gas für Opcodes mit Staatszugriff, wie z. B. das Nachschlagen von Konto und Vertragsdaten, um sie an die Leistung moderner Hardware und die Staatsgröße anzupassen. 

Die Angleichung der Kosten für den Staatszugriff trägt auch dazu bei, Ethereum widerstandsfähiger zu machen. Da diese rechenintensiven Datenlesevorgänge künstlich billig sind, könnte ein böswilliger Angreifer das Netzwerk mit Tausenden von komplexen Datenanfragen in einem einzigen Block spammen, bevor er das Gebührenlimit des Netzwerks erreicht, was möglicherweise dazu führen könnte, dass das Netzwerk ins Stocken gerät oder abstürzt (ein denial-of-service-Angriff). Selbst ohne böswillige Absicht werden Entwickler nicht wirtschaftlich dazu ermutigt, effiziente Anwendungen zu entwickeln, wenn das Lesen von Netzwerk zu billig ist.

Durch eine genauere Preisgestaltung von Aktionen mit staatlichem Zugriff kann Ethereum widerstandsfähiger gegen versehentliche oder absichtliche Verlangsamungen werden, während die Angleichung der Netzwerk an die Hardwarelast eine nachhaltigere Grundlage für zukünftige Gaslimit Erhöhungen darstellt.

**Ressourcen**: [Technische Spezifikation EIP-8038](https://eips.ethereum.org/EIPS/eip-8038)

## Netzwerkresilienz 

Verfeinerungen der Validator -Aufgaben und Austrittsprozesse gewährleisten die Netzwerk bei Massen-Slashing-Ereignissen und demokratisieren die Liquidität. Diese Verbesserungen machen das Netzwerk stabiler und stellen sicher, dass alle Teilnehmer, ob groß oder klein, fair behandelt werden.

### Slash- Validatoren von der Vorschlagserstellung ausschließen {#exclude-slashed-validators}

- Verhindert, dass für die Erstellung zukünftiger Blöcke Validatoren ausgewählt werden, die Strafen erhalten haben (Slashings), wodurch garantierte verpasste Slots eliminiert werden.
- Sorgt dafür, dass Ethereum reibungslos und zuverlässig läuft, und verhindert schwerwiegende Ausfälle im Falle eines Mass- Slashing -Ereignisses.

Derzeit kann es vorkommen, dass ein Validator, selbst wenn er geslasht wird (d. h. für Regelverstöße oder nicht erwartungsgemäße Funktionsweise bestraft wird), vom System in naher Zukunft erneut für die Führung eines Block ausgewählt wird, wenn es zukünftige Proposer-Lookaheads generiert. 

Da Blöcke von geslashten Proposern automatisch als ungültig abgelehnt werden, führt dies dazu, dass das Netzwerk Slots verpasst und die Netzwerk bei Massen- Slashing Ereignissen verzögert wird. 

**Ausgeschlossene Validatoren von der Vorschlagsstellung ausschließen (oder EIP-8045)** filtert ausgeschlossene Validatoren einfach aus, sodass sie nicht für zukünftige Aufgaben ausgewählt werden. Dies verbessert die Widerstandsfähigkeit der Kette, indem sichergestellt wird, dass nur gesunde Validatoren zur Vorschlagsstellung von Blöcke ausgewählt werden, wodurch die Servicequalität bei Netzwerk aufrechterhalten wird.

**Ressourcen**: [Technische Spezifikation EIP-8045](https://eips.ethereum.org/EIPS/eip-8045)

### Ausgänge sollen die Konsolidierungswarteschlange nutzen {#let-exits-use-the-consolidation-queue}

- Schließt eine Lücke, die es Validatoren mit hohem Guthaben ermöglicht, das Netzwerk über die Konsolidierungswarteschlange schneller zu verlassen als kleinere Validatoren. 
- Ermöglicht regelmäßigen Auszahlungen, in diese zweite Warteschlange überzugehen, wenn diese freie Kapazität hat, wodurch die Auszahlungszeiten für Staking Transaktionen in Zeiten mit hohem Volumen reduziert werden.
- Es werden strenge Sicherheitsmaßnahmen eingehalten, um eine Änderung der grundlegenden Sicherheitsparameter von Ethereum oder eine Schwächung des Netzwerk zu vermeiden.

Da das [Pectra-Upgrade](/roadmap/pectra) das maximal effektive Guthaben für Ethereum Validatoren von 32 ETH auf 2.048 ETH erhöht hat, ermöglicht eine technische Lücke, dass Validatoren mit hohem Guthaben das Netzwerk über die Konsolidierungswarteschlange schneller verlassen können als kleinere Validatoren.

**„Let exits use the consolidation queue (or EIP-8080)“** demokratisiert die Konsolidierungswarteschlange für alle Staking Exits und schafft eine einzige, faire Warteschlange für alle.  

So funktioniert das heute:

- Das Churn-Limit von Ethereum ist eine Sicherheitsgrenze für die Rate, mit der Validatoren ihre gestakten ETH einbringen, entziehen oder zusammenführen (konsolidieren) können, um sicherzustellen, dass die Sicherheit des Netzwerks niemals destabilisiert wird.
- Da eine Validator Konsolidierung eine aufwändigere Aktion mit mehr beweglichen Teilen ist als ein Standard- Validator Exit, verbraucht sie einen größeren Teil dieses Sicherheitsbudgets (Churn-Limit). 
- Insbesondere schreibt das Protokoll vor, dass die genauen Sicherheitskosten eines Standard-Ausstiegs zwei Drittel (2/3) der Kosten einer Konsolidierung betragen.

Fairere Exit-Warteschlangen ermöglichen es Standard-Exits, in Zeiten hoher Exit-Nachfrage ungenutzten Platz aus der Konsolidierungs-Warteschlange zu leihen, wobei ein „3-für-2“-Wechselkurs angewendet wird (für jeweils 2 ungenutzte Konsolidierungsplätze kann das Netzwerk sicher 3 Standard-Exits verarbeiten). Dieser 3/2-Umsatzfaktor gleicht die Nachfrage zwischen den Konsolidierungs- und Exit-Warteschlangen aus.

Die Demokratisierung des Zugangs zur Konsolidierungswarteschlange erhöht die Geschwindigkeit, mit der Nutzer ihre Einsatz in Zeiten hoher Nachfrage um bis zu das 2,5-fache auszahlen lassen können, ohne die Netzwerksicherheit zu beeinträchtigen.

**Ressourcen**: [Technische Spezifikation von EIP-8080](https://eips.ethereum.org/EIPS/eip-8080)

## Verbessern Sie die Benutzer- und Entwicklererfahrung {#improve-user-developer-experience}

Das Ethereum-Upgrade „Glamsterdam“ zielt darauf ab, die Benutzererfahrung zu verbessern, die Auffindbarkeit von Daten zu erhöhen und steigende Nachrichtengrößen zu bewältigen, um Synchronisationsfehler zu verhindern. Dies erleichtert die Nachverfolgung von Vorgängen auf der Blockchain und verhindert gleichzeitig technische Probleme, während das Netzwerk skaliert.

### Reduzieren Sie die intrinsischen Transaktion Gas {#reduce-intrinsic-transaction-gas-costs}

- Senkt die Grundgebühr für Transaktionen und reduziert so die Gesamtkosten einer einfachen nativen ETH-Zahlung. 
- Macht kleinere Überweisungen erschwinglicher und steigert so die Lebensfähigkeit von Ethereum als routinemäßiges Tauschmittel.

Alle Ethereum- Transaktionen haben heute eine feste Basis Gasgebühr, unabhängig davon, wie einfach oder komplex die Verarbeitung ist. **Reduce intrinsic Transaktion Gas (oder EIP-2780)** schlägt vor, diese Grundgebühr zu senken, um eine Standard-ETH-Überweisung zwischen bestehenden Konten um bis zu 71% günstiger zu machen. 

Reduzieren Sie den intrinsischen Transaktion, indem Sie die Gas so aufschlüsseln, dass sie nur die grundlegende, wesentliche Arbeit widerspiegelt, die die Computer, die das Netzwerk betreiben, tatsächlich leisten, wie z. B. die Überprüfung einer Digitale Signatur und die Aktualisierung eines Guthabens. Da eine einfache ETH-Zahlung keinen komplexen Code ausführt oder zusätzliche Daten überträgt, würde dieser Vorschlag die Gebühr an ihren geringen Ressourcenverbrauch anpassen. 

Der Vorschlag führt eine Ausnahme für die Erstellung brandneuer Konten ein, um zu verhindern, dass niedrigere Gebühren den Zustand des Netzwerks überlasten. Wenn eine Überweisung ETH an eine leere, nicht existierende Adresse sendet, muss das Netzwerk einen permanenten neuen Eintrag dafür erstellen. Für diese Konto wird ein Gas erhoben, um die langfristige Speicherung zu decken. 

Zusammen soll der EIP-2780 alltägliche Überweisungen zwischen bestehenden Konten erschwinglicher machen und gleichzeitig sicherstellen, dass das Netzwerk vor einer Überlastung der Datenbank geschützt ist, indem das tatsächliche Wachstum des Zustands genau bepreist wird.

**Ressourcen**: [Technische Spezifikation EIP-2780](https://eips.ethereum.org/EIPS/eip-2780)

### Deterministische Werk-Vorbereitstellung {#deterministic-factory-predeploy}

- Bietet Entwicklern eine native Möglichkeit, Anwendungen und Smart Contract -Wallets auf genau derselben Adresse über mehrere Chains hinweg bereitzustellen.
- Ermöglicht Benutzern, dieselbe Smart Wallet Adresse in mehreren Ebene-2-Netzwerken (L2) zu haben, wodurch die kognitive Belastung und Verwirrung reduziert und das Risiko eines versehentlichen Verlusts von Geldern verringert wird. 
- Ersetzt die Workarounds, die Entwickler derzeit verwenden, um diese Parität zu erreichen, und macht den Aufbau von Multi-Chain-Wallets und -Apps einfacher und sicherer.

Wenn ein Nutzer heute eine Smart Contract Wallet mit Konten auf mehreren EVM-kompatiblen Chains hat, erhält er oft eine völlig andere Adresse in verschiedenen Netzwerken. Dies ist nicht nur verwirrend, sondern kann auch zu einem versehentlichen Verlust von Geldern führen. 

**Deterministic Factory Predeploy (oder EIP-7997)** bietet Entwicklern eine native, integrierte Möglichkeit, ihre dezentralisiert Anwendungen und Smart Contract -Wallets auf exakt dieselbe Adresse über mehrere EVM-Chains hinweg zu deployen, einschließlich Ethereum Mainnet, Ebene-2-Netzwerke (L2) und mehr. Bei Annahme würde es Benutzern ermöglichen, auf jeder teilnehmenden Chain exakt dieselbe Adresse zu haben, was die kognitive Belastung und das Potenzial für Benutzerfehler erheblich reduziert.

Das deterministische Factory-Predeploy funktioniert, indem es ein minimales, spezialisiertes Factory-Programm an einer identischen Stelle (genauer gesagt, Adresse 0x12) auf jeder teilnehmenden EVM-kompatiblen Chain dauerhaft platziert. Sein Ziel ist es, einen universellen, standardmäßigen Factory-Vertrag bereitzustellen, der von jedem EVM-kompatiblen Netzwerk übernommen werden kann. Solange eine EVM-Chain an diesem Standard teilnimmt und ihn übernimmt, können Entwickler ihn verwenden, um ihre Smart Contracts an genau derselben Adresse in diesem Netzwerk bereitzustellen. 

Diese Standardisierung vereinfacht Entwicklern und dem gesamten Ökosystem das Erstellen und Verwalten von Cross-Chain-Anwendungen. Entwickler müssen keinen benutzerdefinierten, kettenspezifischen Code mehr erstellen, um ihre Software über verschiedene Netzwerke hinweg zu verknüpfen. Stattdessen verwenden sie diese universelle Factory, um überall exakt dieselbe Adresse für ihre Anwendung zu generieren. Darüber hinaus können Block-Explorer, Tracking-Dienste und Wallets diese Anwendungen und Konten über verschiedene Chains hinweg leichter identifizieren und verknüpfen, wodurch eine einheitlichere und nahtlosere Multi-Chain-Umgebung für alle Ethereum-basierten Teilnehmer entsteht.

**Ressourcen**: [Technische Spezifikation von EIP-7997](https://eips.ethereum.org/EIPS/eip-7997)

### ETH-Überweisungen und -Burns erzeugen ein Protokoll {#eth-transfers-and-burns-emit-a-log}

- Generiert automatisch einen permanenten Datensatz (Log), jedes Mal, wenn ETH übertragen oder verbrannt wird.
- Behebt eine historische Schwachstelle, die es Apps, Börsen und Brücken ermöglicht, die Einzahlungen von Nutzern zuverlässig zu erkennen, ohne dass Ad-hoc-Tracing-Tools erforderlich sind.

Im Gegensatz zu Token (ERC-20) erzeugen reguläre ETH-Überweisungen zwischen Smart Contracts keine eindeutige Quittung (Standardprotokoll), was es für Börsen und Apps schwierig macht, sie zu verfolgen.

ETH-Überweisungen und -Burns erzeugen ein Log (oder EIP-7708), das es für das Netzwerk zwingend erforderlich macht, jedes Mal ein Standard-Log-Ereignis auszugeben, wenn eine ETH-Menge ungleich Null verschoben oder verbrannt wird.

Dies wird es für Wallets, Börsen und kettenübergreifende Brücke -Betreiber wesentlich einfacher und zuverlässiger machen, Einzahlungen und Bewegungen ohne spezielle Tools genau zu verfolgen.

**Ressourcen**: [Technische Spezifikation von EIP-7708](https://eips.ethereum.org/EIPS/eip-7708)

### eth/70 partielle Block {#eth-70-partial-block-receipt-lists}

Wenn wir die Menge an Arbeit erhöhen, die Ethereum leisten kann, werden die Listen der Quittungen für diese Aktionen (die Datensätze dieser Transaktionen) so groß, dass sie möglicherweise dazu führen könnten, dass die Knoten des Netzwerks ausfallen, wenn sie versuchen, Daten miteinander zu synchronisieren. 

eth/70 partielle Block (oder EIP-7975) führt eine neue Methode für die Kommunikation zwischen Knoten ein (eth/70), die es ermöglicht, diese großen Listen in kleinere, besser handhabbare Teile zu zerlegen. eth/70 führt ein Paginierungssystem für das Protokoll des Netzwerks ein, das es Knoten ermöglicht, Block aufzuschlüsseln und die Daten sicher in kleineren, besser handhabbaren Blöcken anzufordern.

Diese Änderung würde Netzwerk Synchronisationsfehler während Zeiten hoher Aktivität verhindern. Letztendlich ebnet sie Ethereum den Weg, seine Block zu erhöhen und in Zukunft mehr Transaktionen pro Block zu verarbeiten, ohne die physische Hardware, die die Kette synchronisiert, zu überlasten.

**Ressourcen**: [Technische Spezifikation von EIP-7975](https://eips.ethereum.org/EIPS/eip-7975)

## Weiterführende Literatur {#further-reading}

- [Ethereum Roadmap](/roadmap/)
- [Forkcast: Glamsterdam](https://forkcast.org/upgrade/glamsterdam)
- [Glamsterdam Meta EIP](https://eips.ethereum.org/EIPS/eip-7773) 
- [Blogbeitrag zur Aktualisierung der Protokollprioritäten für 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Der Daily Gwei Refuel Podcast – Post-Quantum Ethereum, Glamsterdam kommt](https://www.youtube.com/watch?v=qx9sd50uQjQ) 

## Häufig gestellte Fragen {#faq}

### Wie kann ETH nach dem Glamsterdam-Hard Fork umgewandelt werden? {#how-can-eth-be-converted-after-the-hardfork}

- **Keine Maßnahmen für Ihr ETH erforderlich**: Es ist nicht erforderlich, Ihr ETH nach dem Glamsterdam-Upgrade zu konvertieren oder zu aktualisieren. Ihre Konto bleiben gleich und das ETH, das Sie derzeit besitzen, bleibt nach dem Hard Fork in seiner bestehenden Form zugänglich.
- **Vorsicht vor Betrug!**<Emoji text="⚠️" /> **Jeder, der Sie auffordert, Ihr ETH zu „upgraden“, versucht, Sie zu betrügen.** Sie müssen in Bezug auf dieses Upgrade nichts tun. Ihre Vermögenswerte bleiben völlig unberührt. Denken Sie daran, dass es die beste Verteidigung gegen Betrug ist, informiert zu bleiben.

[Mehr zum Erkennen und Vermeiden von Betrug](/security/)

### Betrifft das Glamsterdam-Upgrade alle Ethereum-Knoten und Validatoren? {#does-the-glamsterdam-upgrade-affect-all-ethereum-nodes-and-validators}

Ja, das Glamsterdam-Upgrade erfordert Updates sowohl für [Ausführungs-Clients als auch für Konsens-Clients](/developers/docs/nodes-and-clients/). Da dieses Upgrade die Enshrined Proposer-Builder Separation (ePBS) einführt, müssen Blockchain-Knoten sicherstellen, dass ihre Clients aktualisiert werden, um die neuen Methoden zu handhaben, mit denen Blöcke erstellt, validiert und vom Netzwerk bestätigt werden. 

Alle wichtigen Ethereum-Clients werden Versionen veröffentlichen, die den als hohe Priorität markierten Hard Fork unterstützen. Sie können sich darüber auf dem Laufenden halten, wann diese Versionen in den GitHub-Repos der Anwendung, ihren [Discord-Kanälen](https://ethstaker.org/support), dem [EthStaker Discord](https://dsc.gg/ethstaker) oder durch Abonnieren des Ethereum-Blogs für Protokoll Updates verfügbar sein werden. 

Um die Synchronisierung mit dem Ethereum- Netzwerk nach dem Upgrade aufrechtzuerhalten, müssen die Blockchain-Knoten sicherstellen, dass sie eine unterstützte Anwendung Version ausführen. Beachten Sie, dass die Informationen zu Anwendung Releases zeitkritisch sind und Benutzer die neuesten Updates für die aktuellsten Details konsultieren sollten.

### Was muss ich als Staker für das Glamsterdam-Upgrade tun? {#as-a-staker-what-do-i-need-to-do-for-the-glamsterdam-upgrade}

Wie bei jedem Netzwerk Upgrade sollten Sie Ihre Clients auf die neuesten Versionen aktualisieren, die mit Glamsterdam-Support gekennzeichnet sind. Verfolgen Sie Updates in der Mailingliste und [die Protokollankündigungen im EF-Blog,](https://blog.ethereum.org/category/protocol) um über Veröffentlichungen informiert zu werden.

Um Ihr Setup zu validieren, bevor Glamsterdam im Mainnet aktiviert wird, können Sie einen Validator in Testnets ausführen. Testnet-Forks werden auch in der Mailingliste und im Blog angekündigt.

### Welche Verbesserungen wird Glamsterdam für die L1-Skalierung vornehmen? {#what-improvements-will-glamsterdam-include-for-l1-scaling}

Das wichtigste Feature ist ePBS (EIP-7732), das die rechenintensive Aufgabe der Validierung von Transaktionen von der Aufgabe der Konsens trennt. Dadurch wird das Datenverbreitungsfenster von 2 Sekunden auf etwa 9 Sekunden erweitert, was die Fähigkeit von Ethereum erweitert, einen viel höheren Transaktion sicher zu verarbeiten und mehr Datenblobs für Ebene-2-Netzwerke aufzunehmen.

### Wird Glamsterdam die Gebühren für Ethereum (Layer 1) senken? {#will-glamsterdam-lower-fees-on-ethereum-layer-1}

Ja, Glamsterdam wird die Gebühren für alltägliche Nutzer höchstwahrscheinlich senken! Die Reduzierung des intrinsischen Transaktion Gas (oder EIP-2780) senkt die Grundgebühr für das Senden von ETH, wodurch die Nutzung von ETH für alltägliche Zahlungen viel billiger wird.

Darüber hinaus führt Glamsterdam für eine langfristige Nachhaltigkeit Block-Level Access Lists (BALs) ein. Dies ermöglicht eine parallele Verarbeitung und bereitet die L1 darauf vor, in Zukunft sicher höhere Gas zu handhaben, was die Gas pro Transaktion voraussichtlich senken wird, wenn die Kapazität wächst.

### Wird es nach Glamsterdam Änderungen an meinen bestehenden Smart Contracts geben? {#will-my-smart-contracts-change}

Bestehende Verträge werden auch nach Glamsterdam normal weiter funktionieren. Entwickler werden wahrscheinlich mehrere neue Tools erhalten und sollten ihren Gas überprüfen:
- Die Erhöhung der maximalen Vertragsgröße (oder EIP-7954) ermöglicht es Entwicklern, größere Anwendungen bereitzustellen, wodurch die maximale Vertragsgröße von etwa 24 KiB auf 32 KiB erhöht wird. 
- Deterministic Factory Predeploy (oder EIP-7997) führt einen universellen, integrierten Factory-Vertrag ein. Er ermöglicht es Entwicklern, ihre Anwendungen und Smart Contract -Wallets auf genau derselben Adresse über alle teilnehmenden EVM-Chains hinweg bereitzustellen.
- Wenn Ihre App auf komplexes Tracing angewiesen ist, um ETH-Überweisungen zu finden, können Sie für eine einfachere und zuverlässigere Bilanzierung auf die Verwendung von Logs umsteigen, da ETH-Überweisungen und -Burns ein Log (oder EIP-7708) ausgeben.
- Die Erhöhung der Gas für die Erstellung von Zuständen (oder EIP-8037) und die Aktualisierung der Gas für den Zugriff auf Zustände (oder EIP-8038) führen neue Nachhaltigkeitsmodelle ein, die bestimmte Kosten für die Bereitstellung von Verträgen ändern werden, da die Erstellung neuer Konten oder permanenter Speicher dynamisch angepasste Gebühren haben wird. 

### Wie wird sich Glamsterdam auf die Blockchain-Knoten und die Hardwareanforderungen auswirken? {#how-will-glamsterdam-affect-node-storage-and-hardware-requirements}

Mehrere EIPs, die für Glamsterdam in Betracht gezogen werden, Adresse sich mit dem Performance-Cliff des State-Wachstums: 
- Die Erhöhung der Gas Kosten für die Erstellung von States (oder EIP-8037) führt ein dynamisches Preismodell ein, um eine Wachstumsrate der State-Datenbank von 100 GiB/Jahr anzustreben und sicherzustellen, dass Standard-Hardware das Netzwerk weiterhin effizient betreiben kann. 
- eth/70 partial Block receipt lists (oder EIP-7975) ermöglicht es Knoten, paginierte Block Receipts anzufordern, wodurch datenintensive Block -Receipt-Listen in kleinere Abschnitte unterteilt werden, um Abstürze und Synchronisierungsprobleme zu verhindern, wenn Ethereum skaliert.

