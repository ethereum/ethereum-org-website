---
title: Null-Wissen-Beweise
description: Eine nicht-technische Einführung in Null-Wissen-Beweise für Anfänger.
lang: de
---

## Was sind Null-Wissen-Beweise? {#what-are-zk-proofs}

Ein Null-Wissen-Beweis ist eine Methode, um die Gültigkeit einer Aussage zu beweisen, ohne die Aussage selbst offenzulegen. Der „Beweisanführer“ ist die Partei, die versucht, eine Aussage zu beweisen, während der „Verifizierer“ für die Validierung der Aussage verantwortlich ist.

Null-Wissen-Beweise erschienen erstmals 1985 in einem Artikel, „[Die Wissenskomplexität von Interactive Proof Systems](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)“, der eine Definition der heute weit verbreiteten Null-Wissen-Beweise enthält:

> Ein Null-Wissen-Protokoll ist eine Methode, mit der eine Partei (der Beweiser) einer anderen Partei (dem Verifizierer) beweisen kann, dass etwas wahr ist, ohne irgendwelche Informationen preiszugeben, abgesehen von der Tatsache, dass diese spezifische Aussage wahr ist.

Null-Wissen-Beweise haben sich im Laufe der Jahre verbessert und werden jetzt in mehreren realen Anwendungen eingesetzt.

## Warum brauchen wir Null-Wissen-Beweise? {#why-zero-knowledge-proofs-are-important}

Null-Wissen-Beweise stellten einen Durchbruch in der angewandten Kryptografie dar, da sie versprachen, die Sicherheit von Informationen für Einzelpersonen zu verbessern. Überlegen Sie, wie Sie einen Anspruch (z. B. „Ich bin Bürger des Landes X“) gegenüber einer anderen Partei (z. B. einem Diensteanbieter) nachweisen könnten. Sie müssten „Beweise“ liefern, um Ihre Behauptung zu untermauern, wie zum Beispiel einen nationalen Pass oder einen Führerschein.

Aber es gibt Probleme mit diesem Ansatz, insbesondere dem Mangel an Privatsphäre. Persönlich identifizierbare Informationen (PII), die mit Drittanbieterdiensten geteilt werden, werden in zentralen Datenbanken gespeichert, die anfällig für Hacks sind. Mit Identitätsdiebstahl, der zu einem ernsthaften Problem geworden ist, gibt es Forderungen nach stärkeren Methoden zum Schutz der Privatsphäre bei der Weitergabe sensibler Informationen.

Null-Wissen-Beweise lösen dieses Problem, indem sie die Notwendigkeit beseitigen, Informationen offenzulegen, um die Gültigkeit von Behauptungen zu beweisen. Das Null-Wissen-Protokoll verwendet die Aussage (als „Zeuge“ bezeichnet) als Eingabe, um einen prägnanten Beweis seiner Gültigkeit zu generieren. Dieser Beweis bietet starke Garantien dafür, dass eine Aussage wahr ist, ohne die Informationen offenzulegen, die zu ihrer Erstellung verwendet wurden.

Zurück zu unserem vorherigen Beispiel: Der einzige Beweis, den Sie benötigen, um Ihren Anspruch auf Staatsbürgerschaft zu beweisen, ist ein Null-Wissen-Beweis. Der Verifizierer muss nur prüfen, ob bestimmte Eigenschaften des Beweises zutreffen, um davon überzeugt zu sein, dass die zugrunde liegende Aussage auch zutrifft.

## Wie funktionieren die Null-Wissen-Beweise? {#how-do-zero-knowledge-proofs-work}

Ein Null-Wissen-Beweis ermöglicht es Ihnen, die Wahrheit einer Aussage zu beweisen, ohne den Inhalt der Aussage zu teilen oder zu enthüllen, wie Sie die Wahrheit entdeckt haben. Um dies zu ermöglichen, stützen sich Null-Wissen-Protokolle auf Algorithmen, die einige Daten als Eingabe verwenden und „wahr“ oder „falsch“ als Ausgabe zurückgeben.

Ein Null-Wissen-Protokoll muss folgende Kriterien erfüllen:

1. **Vollständigkeit**: Wenn die Eingabe gültig ist, gibt das Null-Wissen-Protokoll immer „wahr“ zurück. Wenn also die zugrunde liegende Aussage wahr ist und der Beweisführer und der Verifizierer ehrlich handeln, kann der Beweis akzeptiert werden.

2. **Zuverlässigkeit**: Wenn der Eingabewert ungültig ist, ist es theoretisch unmöglich, das Null-Wissen-Protokoll zu täuschen, um „wahr“ zurückzugeben. Daher kann ein lügender Beweisführer einen ehrlichen Verifizierer nicht dazu bringen, zu glauben, dass eine ungültige Aussage gültig ist (außer mit einem winzigen Wahrscheinlichkeitsspielraum).

3. **Null-Wissen**: Der Verifizierer erfährt nichts über eine Aussage außer deren Gültigkeit oder Falschheit (sie haben „Null-Wissen“ über die Aussage). Diese Anforderung hindert den Verifizierer auch daran, die ursprüngliche Eingabe (den Inhalt der Aussage) aus dem Beweis abzuleiten.

In der Grundform besteht ein Null-Wissen-Beweis aus drei Elementen: **Zeuge**, **Herausforderung** und **Antwort**.

- **Zeuge**: Mit einem Null-Wissen-Beweis möchte der Beweisführer die Kenntnis einiger verborgener Informationen beweisen. Die geheimen Informationen sind der „Zeuge“ für den Beweis, und die angenommene Kenntnis des Beweisführers über den Zeugen stellt eine Reihe von Fragen auf, die nur von einer Partei mit Kenntnis der Informationen beantwortet werden können. Somit beginnt der Beweisführer den Beweisprozess, indem er zufällig eine Frage auswählt, die Antwort berechnet und sie an den Prüfer sendet.

- **Herausforderung**: Der Prüfer wählt zufällig eine andere Frage aus dem Satz aus und bittet den Beweisführer, sie zu beantworten.

- **Antwort**: Der Beweisführer akzeptiert die Frage, berechnet die Antwort und sendet sie an den Prüfer zurück. Die Antwort des Beweisführers ermöglicht es dem Prüfer, zu überprüfen, ob ersterer wirklich Zugang zu dem Zeugen hat. Um sicherzustellen, dass der Beweisführer nicht blind rät und die richtigen Antworten zufällig erhält, wählt der Prüfer mehr Fragen aus, die er stellen möchte. Indem diese Interaktion viele Male wiederholt wird, sinkt die Wahrscheinlichkeit, dass der Beweisführer Wissen über den Zeugen vortäuscht, signifikant, bis der Prüfer zufrieden ist.

Das Obige beschreibt die Struktur eines „interaktiven Null-Wissen-Beweises“. Frühe Null-Wissen-Protokolle verwendeten interaktive Beweise, bei denen die Überprüfung der Gültigkeit einer Aussage eine hin- und hergehende Kommunikation zwischen Beweisführern und Verifizierern erforderte.

Ein gutes Beispiel dafür, wie interaktive Beweise funktionieren, ist die berühmte [Höhlengeschichte Ali Baba](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave) von Jean-Jacques Quisquater. In der Geschichte will Peggy (die Beweisführerin) Victor (dem Prüfer) beweisen, dass sie den geheimen Satz kennt, um eine magische Tür zu öffnen, ohne den Satz preiszugeben.

### Nicht-interaktive Null-Wissen-Beweise {#non-interactive-zero-knowledge-proofs}

Während die interaktive Prüfung revolutionär war, hatte sie nur begrenzten Nutzen, da sie erforderte, dass die beiden Parteien verfügbar waren und wiederholt interagierten. Selbst wenn ein Verifizierer von der Ehrlichkeit eines Beweisführers überzeugt wäre, wäre der Beweis für eine unabhängige Verifizierung nicht verfügbar (die Berechnung eines neuen Beweises erforderte einen neuen Satz von Nachrichten zwischen dem Beweisführer und dem Verifizierer).

Um dieses Problem zu lösen, schlugen Manuel Blum, Paul Feldman und Silvio Micali die ersten [nicht-interaktiven Null-Wissen-Beweise](https://dl.acm.org/doi/10.1145/62212.62222) vor, wobei der Beweisführer und der Verifizierer einen gemeinsamen Schlüssel haben. Dies ermöglicht es dem Beweisführer, sein Wissen über einige Informationen (d. h. Zeugen) zu demonstrieren, ohne die Informationen selbst bereitzustellen.

Im Gegensatz zu interaktiven Beweisen erforderten nicht-interaktive Beweise nur eine Kommunikationsrunde zwischen den Teilnehmern (Beweiser und Verifizierer). Der Beweisführer übergibt die geheime Information an einen speziellen Algorithmus, um einen Null-Wissen-Beweis zu berechnen. Dieser Beweis wird an den Prüfer geschickt, der mit einem anderen Algorithmus überprüft, ob der Beweisführer die geheime Information kennt.

Die nicht-interaktive Beweisführung reduziert die Kommunikation zwischen Beweisführer und Prüfer und macht damit Null-Wissen-Beweise effizienter. Außerdem ist ein einmal generierter Beweis für jeden verfügbar (der Zugriff auf den gemeinsamen Schlüssel und den Verifikationsalgorithmus hat), um ihn zu überprüfen.

Nicht-interaktive Beweise stellten einen Durchbruch für die Null-Wissen-Technologie dar und förderten die Entwicklung von Beweissystemen, die heute verwendet werden. Wir diskutieren im Folgenden diese Beweistypen:

### Arten von Null-Wissen-Beweisen {#types-of-zero-knowledge-proofs}

#### ZK-SNARKs {#zk-snarks}

ZK-SNARK ist ein Akronym für **Zero-Knowledge Succinct Non-Interactive Argument of Knowledge**. Das ZK-SNARK-Protokoll hat folgende Eigenschaften:

- **Null-Wissen**: Ein Prüfer kann die Integrität einer Aussage validieren, ohne irgendetwas anderes über die Aussage zu wissen. Das einzige Wissen, das der Prüfer von der Aussage hat, ist, ob sie wahr oder falsch ist.

- **Prägnant**: Der Null-Wissen-Beweis ist kleiner als der Zeuge und lässt sich schnell verifizieren.

- **Nicht interaktiv**: Der Beweis ist „nicht interaktiv“, da der Beweisführer und der Prüfer nur einmal interagieren, im Gegensatz zu interaktiven Beweisen, die mehrere Kommunikationsrunden erfordern.

- **Argument**: Der Beweis erfüllt die Anforderung der „Solidität“, daher ist ein Betrug äußerst unwahrscheinlich.

- **(Des) Wissens**: Der Null-Wissen-Beweis kann ohne Zugang zu den geheimen Informationen (Zeuge) nicht konstruiert werden. Es ist schwierig, wenn nicht unmöglich, für einen Beweisführer, der keinen Zeugen hat, einen gültigen Null-Wissen-Beweis zu berechnen.

Der zuvor erwähnte „gemeinsame Schlüssel“ bezieht sich auf öffentliche Parameter, auf die sich der Beweisführer und der Prüfer zur Generierung und Überprüfung von Beweisen einigen. Die Generierung der öffentlichen Parameter (zusammen als Common Reference String (CRS) bekannt) ist eine sensible Operation aufgrund ihrer Bedeutung für die Sicherheit des Protokolls. Wenn die Entropie (Zufälligkeit), die bei der Erzeugung des CRS verwendet wird, in die Hände eines unehrlichen Beweises gelangt, können sie falsche Beweise berechnen.

[Multi-Party-Computation (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) ist eine Möglichkeit, die Risiken bei der Generierung öffentlicher Parameter zu verringern. Mehrere Parteien nehmen an einer [vertrauenswürdigen Einrichtungszeremonie](https://zkproof.org/2021/06/30/setup-ceremonies/amp/) teil, bei der jede Person einige zufällige Werte beisteuert, um die CRS zu generieren. Solange eine ehrliche Partei ihren Anteil an der Entropie zerstört, behält das ZK-SNARK-Protokoll seine rechnerische Solidität.

Vertrauenswürdige Einrichtungen erfordern, dass Benutzer den Teilnehmern in der Parametererzeugung vertrauen. Die Entwicklung von ZK-STARKs hat jedoch die Entwicklung von Beweisprotokollen ermöglicht, die ohne vertrauenswürdige Einrichtungen auskommen.

#### ZK-STARKs {#zk-starks}

ZK-STARK ist ein Akronym für **Zero-Knowledge Scalable Transparent Argument of Knowledge**. ZK-STARKs ähneln ZK-SNARKs, außer dass sie Folgendes sind:

- **Skalierbar**: ZK-STARK ist schneller als ZK-SNARK beim Generieren und Verifizieren von Beweisen, wenn die Größe des Zeugen größer ist. Bei STARK-Beweisen steigen die Beweis- und Verifikationszeiten nur geringfügig an, wenn das Geheimnis wächst (im Gegensatz zu SNARK-Beweisen, bei denen die Beweis- und Verifikationszeiten linear mit der Größe des Geheimnisses ansteigen).

- **Transparent**: ZK-STARK verlässt sich auf öffentlich überprüfbare Zufälligkeit, um öffentliche Parameter zum Nachweisen und Verifizieren anstelle eines vertrauenswürdigen Setups zu generieren. Dadurch sind sie im Vergleich zu ZK-SNARKs transparenter.

ZK-STARKs erzeugen größere Beweise als ZK-SNARKs, was in der Regel zu höheren Verifikationsaufwänden führt. Es gibt jedoch Fälle (wie z. B. der Nachweis großer Datensätze), in denen ZK-STARKs im Vergleich zu ZK-SNARKs kosteneffektiver sein können.

## Anwendungsfälle für Null-Wissen-Beweise {#use-cases-for-zero-knowledge-proofs}

### Anonyme Zahlungen {#anonymous-payments}

Kreditkartenzahlungen sind oft für mehrere Parteien sichtbar, einschließlich des Zahlungsanbieters, Banken und anderer interessierter Parteien (z. B. Regierungsbehörden). Obwohl die finanzielle Überwachung Vorteile hat, um illegale Aktivitäten zu identifizieren, untergräbt sie auch die Privatsphäre gewöhnlicher Bürger.

Kryptowährungen sollten Benutzern ermöglichen, private Transaktionen zwischen Gleichgesinnten durchzuführen. Die meisten Kryptowährungstransaktionen sind jedoch auf öffentlichen Blockchains für jeden sichtbar. Benutzeridentitäten sind oft pseudonym und entweder absichtlich mit realen Identitäten verknüpft (z. B. indem ETH-Adressen in Twitter- oder GitHub-Profilen aufgenommen werden) oder können durch grundlegende On- und Off-Rhein-Datenanalyse mit realen Identitäten in Verbindung gebracht werden.

Es gibt spezielle „Privatsphäre-Münzen“, die für vollständig anonyme Transaktionen entwickelt wurden. Datenschutzorientierte Blockchains wie Zcash und Monero schützen Transaktionsdetails, einschließlich Sender-/Empfängeradressen, Asset-Typ, Menge und den Transaktionszeitplan.

Durch die Integration von Null-Wissen-Technologie in das Protokoll ermöglichen es Datenschutz-Blockchains den Nodes, Transaktionen zu validieren, ohne auf Transaktionsdaten zugreifen zu müssen.

Null-Wissen-Beweise werden auch auf die Anonymisierung von Transaktionen auf öffentlichen Blockchains angewendet. Ein Beispiel ist Tornado Cash, ein dezentraler, nicht depotführender Dienst, der es Benutzern ermöglicht, private Transaktionen auf Ethereum durchzuführen. Tornado Cash verwendet Null-Wissen-Beweise, um Transaktionsdetails zu verschleiern und die finanzielle Privatsphäre zu gewährleisten. Da es sich hierbei um „Opt-in“-Datenschutz-Tools handelt, werden sie leider mit illegalen Aktivitäten in Verbindung gebracht. Um dies zu überwinden, muss der Datenschutz schließlich zum Standard auf öffentlichen Blockchains werden.

### Identitätsschutz {#identity-protection}

Aktuelle Identitätsmanagementsysteme setzen persönliche Informationen einem Risiko aus. Null-Wissen-Beweise können Einzelpersonen dabei helfen, Identitäten zu validieren und gleichzeitig vertrauliche Details zu schützen.

Null-Wissen-Beweise sind besonders nützlich im Zusammenhang mit [dezentraler Identität](/decentralized-identity/). Dezentralisierte Identität (auch als „selbstbestimmte Identität“ bezeichnet) gibt dem Individuum die Möglichkeit, den Zugriff auf persönliche Identifikatoren zu kontrollieren. Die Möglichkeit, seine Staatsbürgerschaft nachzuweisen, ohne seine Steuer-ID oder Passdetails preiszugeben, ist ein gutes Beispiel dafür, wie die Null-Wissen-Technologie eine dezentralisierte Identität ermöglicht.

### Authentifizierung {#authentication}

Die Nutzung von Online-Diensten erfordert den Nachweis Ihrer Identität und Ihres Rechts, auf diese Plattformen zuzugreifen. Dies erfordert oft die Angabe von persönlichen Informationen wie Namen, E-Mail-Adressen, Geburtsdaten und so weiter. Sie müssen möglicherweise auch lange Passwörter auswendig lernen oder riskieren, den Zugriff zu verlieren.

Null-Wissen-Beweise können jedoch die Authentifizierung sowohl für Plattformen als auch für Benutzer vereinfachen. Sobald ein ZK-Beweis unter Verwendung öffentlicher Eingaben (z. B. Daten, die die Mitgliedschaft des Benutzers auf der Plattform bestätigen) und privater Eingaben (z. B. die Benutzerdetails) generiert wurde, kann der Benutzer diesen einfach vorlegen, um seine Identität bei Zugriff auf den Dienst zu authentifizieren. Dies verbessert die Erfahrung für Benutzer und befreit Organisationen von der Notwendigkeit, große Mengen an Benutzerinformationen zu speichern.

### Verifizierbare Berechnung {#verifiable-computation}

Verifizierbare Berechnung ist eine weitere Anwendung der Null-Wissen-Technologie zur Verbesserung des Blockchain Designs. Verifizierbare Berechnung ermöglicht es uns, Berechnungen an eine andere Einheit auszulagern, während wir verifizierbare Ergebnisse aufrechterhalten. Die Entität reicht das Ergebnis zusammen mit einem Beweis ein, der bestätigt, dass das Programm korrekt ausgeführt wurde.

Verifizierbare Berechnungen sind entscheidend, um die Verarbeitungsgeschwindigkeit auf Blockchains zu verbessern, ohne die Sicherheit zu verringern. Um dies zu verstehen, müssen Sie die Unterschiede in den vorgeschlagenen Lösungen für die Skalierung von Ethereum kennen.

[On-Chain-Skalierungslösungen](/developers/docs/scaling/#on-chain-scaling), wie z. B. Sharding, erfordern umfangreiche Modifikationen der Basisschicht der Blockchain. Dieser Ansatz ist jedoch sehr komplex und Fehler bei der Implementierung können das Sicherheitsmodell von Ethereum untergraben.

[Off-Chain-Skalierungslösungen](/developers/docs/scaling/#off-chain-scaling) erfordern keine Neugestaltung des Ethereum-Kernprotokolls. Stattdessen setzen sie auf ein Outsourcing-Computing-Modell, um die Durchsatzrate auf der Basisschicht von Ethereum zu verbessern.

So funktioniert das in der Praxis:

- Anstatt jede Transaktion zu verarbeiten, lagert Ethereum die Ausführung auf eine separate Kette aus.

- Nach der Verarbeitung der Transaktionen gibt die andere Kette die Ergebnisse zurück, die auf den Zustand von Ethereum angewendet werden sollen.

Der Vorteil hierbei ist, dass Ethereum keine Ausführung durchführen muss und nur Ergebnisse aus der ausgelagerten Berechnung auf seinen Status anwenden muss. Das reduziert Netzwerkstaus und verbessert auch die Transaktionsgeschwindigkeiten (Off-Chain-Protokolle sind darauf optimiert, eine schnellere Ausführung zu ermöglichen).

Die Blockchain benötigt eine Möglichkeit, Off-Chain-Transaktionen zu validieren, ohne sie erneut auszuführen, sonst geht der Vorteil der Off-Chain-Ausführung verloren.

Hier kommt verifizierbare Berechnung ins Spiel. Wenn ein Node außerhalb von Ethereum eine Transaktion ausführt, sendet er einen Null-Wissen-Beweis, um die Korrektheit der Off-Chain-Ausführung zu beweisen. Dieser Beweis (als [Gültigkeitsnachweis](/glossary/#validity-proof) bezeichnet) garantiert, dass eine Transaktion gültig ist, und ermöglicht es Ethereum, das Ergebnis auf ihren Zustand anzuwenden – ohne darauf zu warten, dass jemand dies anzweifelt.

[Null-Wissen-Rollups](/developers/docs/scaling/zk-rollups) und [Validiums](/developers/docs/scaling/validium/) sind zwei Skalierungslösungen außerhalb der Blockchain, die Gültigkeitsnachweise verwenden, um eine sichere Skalierbarkeit zu ermöglichen. Diese Protokolle führen tausende von Transaktionen außerhalb von Ethereum aus und reichen Nachweise zur Überprüfung auf Ethereum ein. Sobald der Nachweis verifiziert ist, können diese Ergebnisse sofort angewendet werden, was Ethereum ermöglicht, mehr Transaktionen zu verarbeiten, ohne die Berechnung auf der Basisschicht zu erhöhen.

### Verringerung von Bestechung und Kollusion bei On-Chain-Abstimmungen {#secure-blockchain-voting}

Blockchain-Abstimmungssysteme haben viele vorteilhafte Eigenschaften: Sie sind vollständig überprüfbar, sicher gegen Angriffe, widerstandsfähig gegen Zensur und frei von geografischen Einschränkungen. Aber selbst On-Chain-Wahlsysteme sind nicht immun gegen das Problem der **Absprachen**.

Definiert als „Koordinierung zur Begrenzung offener Konkurrenz durch Täuschung, Betrug und Irreführung anderer“ kann Kollusion in Form eines bösartigen Akteurs auftreten, der die Abstimmung durch Angebot von Bestechungsgeldern beeinflusst. Zum Beispiel könnte Alice Bestechungsgelder von Bob erhalten, um auf einem Stimmzettel für `Option B` zu stimmen, selbst wenn sie `Option A` bevorzugt.

Bestechung und Kollusion beschränken die Effektivität jedes Prozesses, der Abstimmung als Signalisierungsmechanismus verwendet (insbesondere dort, wo Benutzer beweisen können, wie sie abgestimmt haben). Dies kann erhebliche Auswirkungen haben, insbesondere wenn die Abstimmungen für die Zuteilung knapper Ressourcen verantwortlich sind.

Zum Beispiel verlassen sich [quadratische Finanzierungsmechanismen](https://www.radicalxchange.org/concepts/plural-funding/) auf Spenden, um die Präferenz für bestimmte Optionen unter verschiedenen öffentlichen Wohlfahrtsprojekten zu messen. Jede Spende zählt als „Stimme“ für ein bestimmtes Projekt, wobei Projekte, die mehr Stimmen erhalten, mehr Gelder aus dem Matching-Pool erhalten.

Die Verwendung von On-Chain-Abstimmungen macht quadratische Finanzierungen anfällig für Absprachen: Blockchain-Transaktionen sind öffentlich, sodass Bestechungsgelder die On-Chain-Aktivitäten eines Bestechungsgeldes überprüfen können, um zu sehen, wie sie „abgestimmt“ haben. Auf diese Weise ist die quadratische Finanzierung kein effektives Mittel mehr, um Gelder auf der Grundlage der aggregierten Präferenzen der Gemeinschaft zuzuweisen.

Glücklicherweise verwenden neuere Lösungen wie MACI (Minimum Anti-Collusion Infrastructure) Null-Wissen-Beweise, um On-Chain-Abstimmungen (z. B. quadratische Finanzierungsmechanismen) widerstandsfähig gegen Bestechung und Absprachen zu machen. MACI ist eine Reihe von intelligenten Verträgen und Skripten, die es einem zentralen Administrator (als „Koordinator“ bezeichnet) ermöglichen, Stimmen zusammenzufassen und Ergebnisse zu zählen, _ohne_ Einzelheiten darüber preiszugeben, wie jeder Einzelne abgestimmt hat. Trotzdem ist es immer noch möglich zu überprüfen, ob die Stimmen korrekt gezählt wurden, oder zu bestätigen, dass eine bestimmte Person an der Abstimmungsrunde teilgenommen hat.

#### Wie arbeitet MACI mit Null-Wissen-Beweisen? {#how-maci-works-with-zk-proofs}

Zu Beginn stellt der Koordinator den MACI-Vertrag auf Ethereum bereit, danach können sich Benutzer für die Abstimmung anmelden (indem sie ihren öffentlichen Schlüssel im Smart Contract registrieren). Benutzer geben Stimmen ab, indem sie mit ihrem öffentlichen Schlüssel verschlüsselte Nachrichten an den Smart Contract senden (eine gültige Stimme muss unter anderem mit dem neuesten öffentlichen Schlüssel signiert werden, der mit der Identität des Benutzers verknüpft ist). Anschließend verarbeitet der Koordinator alle Nachrichten nach Ablauf der Abstimmungsperiode, zählt die Stimmen aus und verifiziert die Ergebnisse in der Kette.

Bei MACI werden Null-Wissen-Beweise verwendet, um die Korrektheit der Berechnung sicherzustellen, indem es dem Koordinator unmöglich gemacht wird, Stimmen falsch zu verarbeiten und Ergebnisse auszuwerten. Dies wird erreicht, indem der Koordinator aufgefordert wird, ZK-SNARK-Beweise zu erstellen, die verifizieren, dass a) alle Nachrichten korrekt verarbeitet wurden, b) das Endergebnis der Summe aller _gültigen_ Stimmen entspricht.

Somit garantiert MACI auch ohne eine Aufschlüsselung der Stimmen pro Benutzer (wie es normalerweise der Fall ist) die Integrität der Ergebnisse, die während des Auszählungsprozesses berechnet werden. Dieses Merkmal ist nützlich, um die Effektivität grundlegender geheimer Absprachen zu reduzieren. Wir können diese Möglichkeit untersuchen, indem wir das vorherige Beispiel von Bob verwenden, der Alice besticht, um für eine Option zu stimmen:

- Alice registriert sich für die Abstimmung, indem sie ihren öffentlichen Schlüssel an einen Smart Contract sendet.
- Alice willigt ein, für `Option B` zu stimmen, im Austausch für ein Bestechungsgeld von Bob.
- Alice stimmt für `Option B`.
- Alice sendet heimlich eine verschlüsselte Transaktion, um den öffentlichen Schlüssel zu ändern, der ihrer Identität zugeordnet ist.
- Alice sendet eine weitere (verschlüsselte) Nachricht an den Smart Contract, der für `Option A` abstimmt, unter Verwendung des neuen öffentlichen Schlüssels.
- Alice zeigt Bob eine Transaktion, aus der hervorgeht, dass sie für `Option B` gestimmt hat (was ungültig ist, da der öffentliche Schlüssel nicht mehr mit Alices Identität im System verknüpft ist)
- Während der Verarbeitung von Nachrichten überspringt der Koordinator Alices Stimme für `Option B` und zählt nur die Stimme für `Option A`. Daher schlägt Bobs Versuch fehl, mit Alice zusammenzuarbeiten und die Abstimmung in der Kette zu manipulieren.

Die Verwendung von MACI _erfordert_ das Vertrauen in den Koordinator, dass er sich nicht mit Bestechern zusammentut oder selbst versucht, Wähler zu bestechen. Der Koordinator kann Benutzernachrichten entschlüsseln (notwendig für die Erstellung des Beweises), damit er genau überprüfen kann, wie jede Person abgestimmt hat.

Aber in Fällen, in denen der Koordinator ehrlich bleibt, stellt MACI ein mächtiges Werkzeug dar, um die Unversehrtheit der Abstimmung in der Kette zu gewährleisten. Dies erklärt seine Beliebtheit bei quadratischen Finanzierungsanträgen (z. B. [clr.fund](https://clr.fund/#/about/maci)), die sich stark auf die Integrität der Abstimmungsentscheidungen jedes Einzelnen verlassen.

[Erfahren Sie mehr über MACI](https://privacy-scaling-explorations.github.io/maci/).

## Nachteile der Verwendung von Null-Wissen-Beweisen {#drawbacks-of-using-zero-knowledge-proofs}

### Kosten für Hardware {#hardware-costs}

Das Generieren von Null-Wissen-Beweisen beinhaltet sehr komplexe Berechnungen, die am besten auf spezialisierten Maschinen durchgeführt werden. Da diese Maschinen teuer sind, sind sie oft nicht erschwinglich für Einzelpersonen. Darüber hinaus müssen Anwendungen, die Null-Wissen-Technologie verwenden möchten, Hardwarekosten einkalkulieren – was die Kosten für Endbenutzer erhöhen kann.

### Kosten der Nachweisprüfung {#proof-verification-costs}

Die Überprüfung von Beweisen erfordert auch komplexe Berechnungen und erhöht die Kosten für die Implementierung von Zero-Knowledge-Technologie in Anwendungen. Diese Kosten sind besonders relevant im Zusammenhang mit dem Nachweis von Berechnungen. Beispielsweise zahlen ZK-Rollups ~500.000 Gas, um einen einzelnen ZK-SNARK-Beweis auf Ethereum zu verifizieren, wobei ZK-STARKs noch höhere Gebühren verlangen.

### Vertrauensannahme {#trust-assumptions}

In ZK-SNARK wird der Common Reference String (öffentliche Parameter) einmal generiert und steht zur Wiederverwendung für Parteien zur Verfügung, die am Null-Wissen-Protokoll teilnehmen möchten. Öffentliche Parameter werden über eine vertrauenswürdige Einrichtungszeremonie erstellt, bei der von den Teilnehmern angenommen wird, dass sie ehrlich sind.

Aber es gibt wirklich keine Möglichkeit für Benutzer, die Ehrlichkeit der Teilnehmer einzuschätzen. Die Benutzer müssen die Entwickler beim Wort nehmen. ZK-STARKs sind frei von Vertrauensannahmen, da die bei der Generierung der Zeichenfolge verwendete Zufälligkeit öffentlich überprüfbar ist. Inzwischen arbeiten Forscher an nicht vertrauenswürdigen Setups für ZK-SNARKs, um die Sicherheit von Nachweismechanismen zu erhöhen.

### Bedrohungen durch Quantencomputing {#quantum-computing-threats}

ZK-SNARK verwendet Elliptische-Kurven-Kryptografie ([ECDSA](/glossary/#ecdsa)) zur Verschlüsselung. Während der ECDSA-Algorithmus vorerst sicher ist, könnte die Entwicklung von Quantencomputern sein Sicherheitsmodell in Zukunft durchbrechen.

ZK-STARK gilt als immun gegen die Bedrohung durch Quantencomputer, da es kollisionsresistente Hashes zur Verschlüsselung verwendet. Im Gegensatz zu öffentlich-privaten Schlüsselpaaren, die in der Elliptischen-Kurven-Kryptografie verwendet werden, ist kollisionsresistentes Hashing für Quantencomputing-Algorithmen schwieriger zu knacken.

## Weiterführende Informationen {#further-reading}

- [Informatiker erklärt ein Konzept in 5 Schwierigkeitsgraden | WIRED](https://www.youtube.com/watch?v=fOGdb1CTu5c) – _Wired YouTube-Kanal_
- [Übersicht der Anwendungsfälle für Zero-Knowledge Proofs](https://pse.dev/projects) – _Team für Datenschutz- und Skalierungsuntersuchungen_
- [SNARKs vs. STARKS vs. Rekursive SNARKs](https://www.alchemy.com/overviews/snarks-vs-starks) – _Alchemy-Übersichten_
- [Ein Null-Wissen-Beweis: Verbesserung des Datenschutzes auf einer Blockchain](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitri Lawrenow_
- [zk-SNARKs – Ein realistisches Null-Wissen-Beispiel mit Tiefgang](https://medium.com/coinmonks/zk-snarks-ein-realistisches-Zero-Knowledge-Beispiel-und-Deep-Dive-c5e6eaa7131c) – _Adam Luciano_
- [An approximate introduction to how zk-SNARKs are possible (Eine Näherungseinführung in die Realisierbarkeit von zk-SNARKs](https://vitalik.eth.limo/general/2021/01/26/snarks.html) – _Vitalik Buterin_
- [Was ist Null-Wissen-Beweis und seine Rolle in der Blockchain?](https://www.leewayhertz.com/zero-knowledge-proof-and-blockchain/) — _LeewayHertz_
