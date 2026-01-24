---
title: Null-Wissen-Beweise
description: "Eine nicht-technische Einführung in Zero-Knowledge-Beweise für Anfänger."
lang: de
---

# Was sind Null-Wissen-Beweise? {#what-are-zk-proofs}

Ein Null-Wissen-Beweis ist eine Methode, um die Gültigkeit einer Aussage zu beweisen, ohne die Aussage selbst offenzulegen. Der „Beweisanführer“ ist die Partei, die versucht, eine Aussage zu beweisen, während der „Verifizierer“ für die Validierung der Aussage verantwortlich ist.

Zero-Knowledge-Beweise tauchten erstmals 1985 in einem Paper mit dem Titel „[The knowledge complexity of interactive proof systems](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)“ auf, das eine heute weit verbreitete Definition von Zero-Knowledge-Beweisen liefert:

> Ein Zero-Knowledge-Protokoll ist eine Methode, mit der eine Partei (der Beweisführer) einer anderen Partei (dem Verifizierer) **beweisen kann**, **dass etwas wahr ist, ohne irgendwelche Informationen preiszugeben**, außer der Tatsache, dass diese spezifische Aussage wahr ist.

Null-Wissen-Beweise haben sich im Laufe der Jahre verbessert und werden jetzt in mehreren realen Anwendungen eingesetzt.

<YouTube id="fOGdb1CTu5c" />

## Warum brauchen wir Null-Wissen-Beweise? {#why-zero-knowledge-proofs-are-important}

Null-Wissen-Beweise stellten einen Durchbruch in der angewandten Kryptografie dar, da sie versprachen, die Sicherheit von Informationen für Einzelpersonen zu verbessern. Überlegen Sie, wie Sie einen Anspruch (z. B. „Ich bin Bürger des Landes X“) gegenüber einer anderen Partei (z. B. einem Dienstleister) nachweisen könnten. Sie müssten „Beweise“ liefern, um Ihre Behauptung zu untermauern, wie zum Beispiel einen nationalen Reisepass oder einen Führerschein.

Aber es gibt Probleme mit diesem Ansatz, insbesondere dem Mangel an Privatsphäre. Persönlich identifizierbare Informationen (PII), die mit Drittanbieterdiensten geteilt werden, werden in zentralen Datenbanken gespeichert, die anfällig für Hacks sind. Da Identitätsdiebstahl zu einem ernsthaften Problem geworden ist, werden die Forderungen nach stärkeren Methoden zum Schutz der Privatsphäre bei der Weitergabe sensibler Informationen lauter.

Zero-Knowledge-Beweise lösen dieses Problem, indem sie **die Notwendigkeit beseitigen, Informationen preiszugeben, um die Gültigkeit von Behauptungen zu beweisen**. Das Null-Wissen-Protokoll betrachtet die Aussage (als „Zeuge“ bezeichnet) als Eingabe und generiert damit einen prägnanten Gültigkeitsbeweis. Dieser Beweis bietet starke Garantien dafür, dass eine Aussage wahr ist, ohne die Informationen offenzulegen, die zu ihrer Erstellung verwendet wurden.

Zurück zu unserem vorherigen Beispiel: Der einzige Beweis, den Sie benötigen, um Ihren Anspruch zu beweisen, dass sie eine bestimmte Staatsangehörigkeit haben, ist ein Null-Wissen-Beweis. Der Verifizierer muss nur prüfen, ob bestimmte Eigenschaften des Beweises zutreffen, um sich davon zu überzeugen, dass die zugrunde liegende Aussage auch zutrifft.

## Anwendungsfälle für Zero-Knowledge-Beweise {#use-cases-for-zero-knowledge-proofs}

### Anonyme Zahlungen {#anonymous-payments}

Kreditkartenzahlungen sind oft für mehrere Parteien sichtbar, einschließlich des Zahlungsanbieters, Banken und anderer interessierter Parteien (z. B. Regierungsbehörden). Obwohl die finanzielle Überwachung Vorteile hat, um illegale Aktivitäten zu identifizieren, untergräbt sie auch die Privatsphäre gewöhnlicher Bürger.

Kryptowährungen sollten Benutzern ermöglichen, private Transaktionen zwischen Gleichgesinnten durchzuführen. Die meisten Kryptowährungstransaktionen sind jedoch auf öffentlichen Blockchains für jeden sichtbar. Benutzeridentitäten sind oft pseudonym und werden entweder absichtlich mit realen Identitäten verknüpft (z. B. durch die Angabe von ETH-Adressen in Twitter- oder GitHub-Profilen) oder können mithilfe einfacher On- und Off-Chain-Datenanalysen mit realen Identitäten in Verbindung gebracht werden.

Es gibt spezielle „Privatsphäre-Münzen“, die für vollständig anonyme Transaktionen entwickelt wurden. Datenschutzorientierte Blockchains wie Zcash und Monero schützen Transaktionsdetails, einschließlich Sender-/Empfängeradressen, Asset-Typ, Menge und den Transaktionszeitplan.

Durch das Einbetten von Zero-Knowledge-Technologie in das Protokoll ermöglichen datenschutzorientierte [Blockchain](/glossary/#blockchain)-Netzwerke, dass [Nodes](/glossary/#node) Transaktionen validieren, ohne auf Transaktionsdaten zugreifen zu müssen. [EIP-7503](https://eips.ethereum.org/EIPS/eip-7503) ist ein Beispiel für einen vorgeschlagenen Entwurf, der native private Wertübertragungen auf der Ethereum-Blockchain ermöglichen wird. Aufgrund einer Mischung aus Sicherheits-, Regulierungs- und UX-Bedenken sind solche Vorschläge jedoch schwer umzusetzen.

**Null-Wissen-Beweise werden auch angewandt, um Transaktionen auf öffentlichen Blockchains zu anonymisieren**. Ein Beispiel ist Tornado Cash, ein dezentraler, nicht depotführender Dienst, der es Benutzern ermöglicht, private Transaktionen auf Ethereum durchzuführen. Tornado Cash verwendet Null-Wissen-Beweise, um Transaktionsdetails zu verschleiern und die finanzielle Privatsphäre zu gewährleisten. Da es sich hierbei um „Opt-in“-Datenschutz-Tools handelt, werden sie leider mit illegalen Aktivitäten in Verbindung gebracht. Um dies zu überwinden, muss der Datenschutz schließlich zum Standard auf öffentlichen Blockchains werden. Erfahre mehr über [Datenschutz auf Ethereum](/privacy/).

### Identitätsschutz {#identity-protection}

Aktuelle Identitätsmanagementsysteme setzen persönliche Informationen einem Risiko aus. Null-Wissen-Beweise können Einzelpersonen dabei helfen, Identitäten zu validieren und gleichzeitig vertrauliche Details zu schützen.

Zero-Knowledge-Beweise sind besonders nützlich im Kontext der [dezentralen Identität](/decentralized-identity/). Dezentralisierte Identität (auch als „selbstbestimmte Identität“ bezeichnet) gibt dem Individuum die Möglichkeit, den Zugriff auf persönliche Identifikatoren zu kontrollieren. Die Möglichkeit, seine Staatsbürgerschaft nachzuweisen, ohne seine Steuer-ID oder Passdetails preiszugeben, ist ein gutes Beispiel dafür, wie die Null-Wissen-Technologie eine dezentralisierte Identität ermöglicht.

<Alert variant="info">
  <AlertEmoji text="💡" />
  <AlertContent>
    <AlertTitle className="mb-2">
      ZKP + Identität in Aktion: Bhutan National Digital ID (NDI) auf Ethereum
    </AlertTitle>
    <AlertDescription>
      <p>
        Ein reales Beispiel für die Verwendung von ZKP für Identitätsmanagementsysteme ist das National Digital ID (NDI)-System des Königreichs Bhutan, das auf Ethereum aufbaut. Bhutans NDI verwendet ZKPs, um es den Bürgern zu ermöglichen, Fakten über sich selbst kryptografisch zu beweisen, wie z. B. \"Ich bin Staatsbürger\" oder \"Ich bin über 18\", ohne die sensiblen persönlichen Daten auf ihrem Ausweis preiszugeben.
      </p>
      <p>
        Erfahre mehr über Bhutan NDI in der <a href=\"/decentralized-identity/#national-and-government-id\">Fallstudie zur dezentralen Identität</a>.
      </p>
</AlertDescription>
</AlertContent>
</Alert>

### Proof of Humanity {#proof-of-humanity}

Eines der heute am häufigsten verwendeten Beispiele für Zero-Knowledge-Beweise in Aktion ist das [World ID protocol](https://world.org/blog/world/world-id-faqs), das man sich als „einen globalen digitalen Pass für das Zeitalter der KI“ vorstellen kann. Es ermöglicht Menschen, ihre Identität als einzigartige Individuen nachzuweisen, ohne persönliche Informationen preiszugeben. Dies wird durch ein Gerät namens „ORB“ erreicht, das die Iris einer Person scannt und einen Iris code generiert. Der Iris code wird überprüft und verifiziert, um zu bestätigen, dass es sich bei der Person um einen biologisch einzigartigen Menschen handelt. Nach der Überprüfung wird eine auf dem Gerät des Benutzers generierte Identitätszusage (die nicht mit den biometrischen Daten verknüpft oder daraus abgeleitet ist) zu einer sicheren Liste in der Blockchain hinzugefügt. Wenn der Benutzer dann nachweisen möchte, dass er ein verifizierter Mensch ist – sei es bei der Anmeldung, beim Abstimmen oder bei anderen Aktionen – kann er einen Zero-Knowledge-Beweis generieren, der seine Mitgliedschaft in der Liste bestätigt. Das Schöne an der Verwendung eines Zero Knowledge Beweises ist, dass nur eine Aussage offengelegt wird: Diese Person ist einzigartig. Alles andere bleibt privat.

World ID stützt sich auf das [Semaphore protocol](https://docs.semaphore.pse.dev/), das vom [PSE team](https://pse.dev/) bei der Ethereum Foundation entwickelt wurde. Semaphore ist als einfache und dennoch leistungsstarke Methode zum Generieren und Überprüfen von Zero Knowledge Beweisen konzipiert. Damit können Benutzer nachweisen, dass sie Teil einer Gruppe sind (in diesem Fall verifizierte Menschen), ohne zu zeigen, welches Mitglied der Gruppe sie sind. Semaphore ist außerdem äußerst flexibel und ermöglicht die Erstellung von Gruppen auf Grundlage einer Vielzahl von Kriterien wie Identitätsprüfung, Teilnahme an Veranstaltungen oder Besitz von Anmeldeinformationen.

### Authentifizierung {#authentication}

Die Nutzung von Online-Diensten erfordert den Nachweis Ihrer Identität und Ihres Rechts, auf diese Plattformen zuzugreifen. Dies erfordert oft die Angabe von persönlichen Informationen wie Namen, E-Mail-Adressen, Geburtsdaten und so weiter. Sie müssen möglicherweise auch lange Passwörter auswendig lernen oder riskieren, den Zugriff zu verlieren.

Null-Wissen-Beweise können jedoch die Authentifizierung sowohl für Plattformen als auch für Benutzer vereinfachen. Sobald ein ZK-Beweis unter Verwendung öffentlicher Eingaben (z. B. Daten, die die Mitgliedschaft des Benutzers auf der Plattform bestätigen) und privater Eingaben (z. B. die Benutzerdetails) generiert wurde, kann der Benutzer diesen einfach vorlegen, um seine Identität bei Zugriff auf den Dienst zu authentifizieren. Dies verbessert die Erfahrung für Benutzer und befreit Organisationen von der Notwendigkeit, große Mengen an Benutzerinformationen zu speichern.

### Verifizierbare Berechnung {#verifiable-computation}

Verifizierbare Berechnung ist eine weitere Anwendung der Null-Wissen-Technologie zur Verbesserung des Blockchain Designs. Verifizierbare Berechnung ermöglicht es uns, Berechnungen an eine andere Einheit auszulagern, während wir verifizierbare Ergebnisse aufrechterhalten. Die Entität reicht das Ergebnis zusammen mit einem Beweis ein, der bestätigt, dass das Programm korrekt ausgeführt wurde.

Verifizierbare Berechnung ist **entscheidend für die Verbesserung der Verarbeitungsgeschwindigkeiten auf Blockchains**, ohne die Sicherheit zu verringern. Um dies zu verstehen, müssen Sie die Unterschiede in den vorgeschlagenen Lösungen für die Skalierung von Ethereum kennen.

[On-Chain-Skalierungslösungen](/developers/docs/scaling/#onchain-scaling) wie Sharding erfordern eine umfassende Änderung der Basisschicht der Blockchain. Dieser Ansatz ist jedoch sehr komplex und Fehler bei der Implementierung können das Sicherheitsmodell von Ethereum untergraben.

[Off-Chain-Skalierungslösungen](/developers/docs/scaling/#offchain-scaling) erfordern keine Neugestaltung des Kernprotokolls von Ethereum. Stattdessen setzen sie auf ein Outsourcing-Computing-Modell, um die Durchsatzrate auf der Basisschicht von Ethereum zu verbessern.

So funktioniert das in der Praxis:

- Anstatt jede Transaktion zu verarbeiten, lagert Ethereum die Ausführung auf eine separate Kette aus.

- Nach der Verarbeitung der Transaktionen gibt die andere Kette die Ergebnisse zurück, die auf den Zustand von Ethereum angewendet werden sollen.

Der Vorteil hierbei ist, dass Ethereum keine Ausführung durchführen muss und nur Ergebnisse aus der ausgelagerten Berechnung auf seinen Status anwenden muss. Dies reduziert die Netzwerküberlastung und verbessert auch die Transaktionsgeschwindigkeit (Offchain Protokolle optimieren für eine schnellere Ausführung).

Die Kette benötigt eine Möglichkeit, Offchain Transaktionen zu validieren, ohne sie erneut auszuführen, da sonst der Wert der Offchain Ausführung verloren geht.

Hier kommt verifizierbare Berechnung ins Spiel. Wenn ein Knoten eine Transaktion außerhalb von Ethereum ausführt, übermittelt er einen Zero-Knowledge-Beweis, um die Richtigkeit der Offchain Ausführung nachzuweisen. Dieser Beweis (ein sogenannter [Gültigkeitsnachweis](/glossary/#validity-proof)) garantiert, dass eine Transaktion gültig ist, und ermöglicht es Ethereum, das Ergebnis auf seinen Zustand anzuwenden – ohne darauf zu warten, dass jemand ihn anficht.

[Zero-Knowledge-Rollups](/developers/docs/scaling/zk-rollups) und [Validiums](/developers/docs/scaling/validium/) sind zwei Off-Chain-Skalierungslösungen, die Gültigkeitsnachweise verwenden, um eine sichere Skalierbarkeit zu gewährleisten. Diese Protokolle führen Tausende von Transaktionen außerhalb der Kette aus und übermitteln Beweise zur Überprüfung an Ethereum. Sobald der Nachweis verifiziert ist, können diese Ergebnisse sofort angewendet werden, was Ethereum ermöglicht, mehr Transaktionen zu verarbeiten, ohne die Berechnung auf der Basisschicht zu erhöhen.

### Reduzierung von Bestechung und Kollusion bei On-Chain-Abstimmungen {#secure-blockchain-voting}

Blockchain-Abstimmungssysteme haben viele vorteilhafte Eigenschaften: Sie sind vollständig überprüfbar, sicher gegen Angriffe, widerstandsfähig gegen Zensur und frei von geografischen Einschränkungen. Aber selbst On-Chain-Abstimmungssysteme sind nicht immun gegen das Problem der **Kollusion**.

Definiert als „Koordinierung zur Begrenzung offener Konkurrenz durch Täuschung, Betrug und Irreführung anderer“ kann Kollusion in Form eines bösartigen Akteurs auftreten, der die Abstimmung durch Angebot von Bestechungsgeldern beeinflusst. Zum Beispiel könnte Alice von Bob bestochen werden, um bei einer Abstimmung für `option B` zu stimmen, obwohl sie `option A` bevorzugt.

Bestechung und Kollusion beschränken die Effektivität jedes Prozesses, der Abstimmung als Signalisierungsmechanismus verwendet (insbesondere dort, wo Benutzer beweisen können, wie sie abgestimmt haben). Dies kann erhebliche Auswirkungen haben, insbesondere wenn die Abstimmungen für die Zuteilung knapper Ressourcen verantwortlich sind.

Zum Beispiel stützen sich [quadratische Finanzierungsmechanismen](https://www.radicalxchange.org/wiki/plural-funding/) auf Spenden, um die Präferenz für bestimmte Optionen bei verschiedenen Projekten für öffentliche Güter zu messen. Jede Spende zählt als „Stimme“ für ein bestimmtes Projekt, wobei Projekte, die mehr Stimmen erhalten, mehr Gelder aus dem Matching-Pool erhalten.

Durch die Verwendung von Offchain Voting ist die quadratische Finanzierung anfällig für Absprachen: Blockchain-Transaktionen sind öffentlich, sodass bestecher die Offchain Aktivitäten eines Bestechlichen überprüfen können, um zu sehen, wie dieser „abgestimmt“ hat. Auf diese Weise ist die quadratische Finanzierung kein effektives Mittel mehr, um Gelder auf der Grundlage der aggregierten Präferenzen der Gemeinschaft zuzuweisen.

Glücklicherweise verwenden neuere Lösungen wie MACI (Minimum Anti-Collusion Infrastructure) Zero-Knowledge-Beweise, um On-Chain-Abstimmungen (z. B. quadratische Finanzierungsmechanismen) resistent gegen Bestechung und Kollusion zu machen. MACI ist ein Satz von Smart Contracts und Skripten, die es einem zentralen Administrator (genannt \"Koordinator\") ermöglichen, Stimmen zu sammeln und Ergebnisse zusammenzuzählen, _ohne_ Details darüber preiszugeben, wie jede einzelne Person abgestimmt hat. Trotzdem ist es immer noch möglich zu überprüfen, ob die Stimmen korrekt gezählt wurden, oder zu bestätigen, dass eine bestimmte Person an der Abstimmungsrunde teilgenommen hat.

#### Wie arbeitet MACI mit Null-Wissen-Beweisen? {#how-maci-works-with-zk-proofs}

Zu Beginn stellt der Koordinator den MACI-Vertrag auf Ethereum bereit, danach können sich Benutzer für die Abstimmung anmelden (indem sie ihren öffentlichen Schlüssel im Smart Contract registrieren). Benutzer geben Stimmen ab, indem sie mit ihrem öffentlichen Schlüssel verschlüsselte Nachrichten an den Smart Contract senden (eine gültige Stimme muss unter anderem mit dem neuesten öffentlichen Schlüssel signiert werden, der mit der Identität des Benutzers verknüpft ist). Anschließend verarbeitet der Koordinator nach Ablauf der Abstimmungsphase alle Nachrichten, zählt die Stimmen und überprüft die Ergebnisse in der Kette.

Bei MACI werden Null-Wissen-Beweise verwendet, um die Korrektheit der Berechnung sicherzustellen, indem es dem Koordinator unmöglich gemacht wird, Stimmen falsch zu verarbeiten und Ergebnisse auszuwerten. Dies wird erreicht, indem der Koordinator ZK-SNARK-Beweise erstellen muss, die verifizieren, dass a) alle Nachrichten korrekt verarbeitet wurden und b) das Endergebnis der Summe aller _gültigen_ Stimmen entspricht.

Somit garantiert MACI auch ohne eine Aufschlüsselung der Stimmen pro Benutzer (wie es normalerweise der Fall ist) die Integrität der Ergebnisse, die während des Auszählungsprozesses berechnet werden. Dieses Merkmal ist nützlich, um die Effektivität grundlegender geheimer Absprachen zu reduzieren. Wir können diese Möglichkeit untersuchen, indem wir das vorherige Beispiel von Bob verwenden, der Alice besticht, um für eine Option zu stimmen:

- Alice registriert sich für die Abstimmung, indem sie ihren öffentlichen Schlüssel an einen Smart Contract sendet.
- Alice willigt ein, im Austausch für eine Bestechung von Bob für `option B` zu stimmen.
- Alice stimmt für `option B`.
- Alice sendet heimlich eine verschlüsselte Transaktion, um den öffentlichen Schlüssel zu ändern, der ihrer Identität zugeordnet ist.
- Alice sendet eine weitere (verschlüsselte) Nachricht an den Smart Contract, um mit dem neuen öffentlichen Schlüssel für `option A` zu stimmen.
- Alice zeigt Bob eine Transaktion, die belegt, dass sie für `option B` gestimmt hat (was ungültig ist, da der öffentliche Schlüssel nicht mehr mit Alices Identität im System verknüpft ist).
- Während der Verarbeitung der Nachrichten überspringt der Koordinator Alices Stimme für `option B` und zählt nur die Stimme für `option A`. Daher scheitert Bobs Versuch, mit Alice zu kollaborieren und die Offchain Abstimmung zu manipulieren.

Die Verwendung von MACI erfordert _jedoch_ das Vertrauen, dass der Koordinator nicht mit Bestechenden konspiriert oder selbst versucht, Wähler zu bestechen. Der Koordinator kann Benutzernachrichten entschlüsseln (notwendig für die Erstellung des Beweises), damit er genau überprüfen kann, wie jede Person abgestimmt hat.

Aber in Fällen, in denen der Koordinator ehrlich bleibt, stellt MACI ein mächtiges Werkzeug dar, um die Unantastbarkeit der Offchain Abstimmung zu gewährleisten. Dies erklärt seine Beliebtheit bei Anwendungen für quadratische Finanzierung (z.B. [clr.fund](https://clr.fund/#/about/maci)), die stark von der Integrität der Wahlentscheidungen jedes Einzelnen abhängen.

[Erfahre mehr über MACI](https://maci.pse.dev/).

## Wie funktionieren Null-Wissen-Beweise? {#how-do-zero-knowledge-proofs-work}

Ein Null-Wissen-Beweis ermöglicht es Ihnen, die Wahrheit einer Aussage zu beweisen, ohne den Inhalt der Aussage zu teilen oder zu enthüllen, wie Sie die Wahrheit entdeckt haben. Um dies zu ermöglichen, stützen sich Null-Wissen-Protokolle auf Algorithmen, die einige Daten als Eingabe verwenden und „wahr“ oder „falsch“ als Ausgabe zurückgeben.

Ein Null-Wissen-Protokoll muss folgende Kriterien erfüllen:

1. **Vollständigkeit**: Wenn die Eingabe gültig ist, gibt das Zero-Knowledge-Protokoll immer „wahr“ zurück. Wenn also die zugrunde liegende Aussage wahr ist und der Beweisführer und der Verifizierer ehrlich handeln, kann der Beweis akzeptiert werden.

2. **Korrektheit**: Wenn die Eingabe ungültig ist, ist es theoretisch unmöglich, das Zero-Knowledge-Protokoll dazu zu bringen, „wahr“ zurückzugeben. Daher kann ein lügender Beweisführer einen ehrlichen Verifizierer nicht dazu bringen, zu glauben, dass eine ungültige Aussage gültig ist (außer mit einem winzigen Wahrscheinlichkeitsspielraum).

3. **Zero-Knowledge**: Der Verifizierer erfährt nichts über eine Aussage über ihre Gültigkeit oder Falschheit hinaus (er hat „Zero-Knowledge“ über die Aussage). Diese Anforderung hindert den Verifizierer auch daran, die ursprüngliche Eingabe (den Inhalt der Aussage) aus dem Beweis abzuleiten.

In seiner Grundform besteht ein Zero-Knowledge-Beweis aus drei Elementen: **Zeuge**, **Herausforderung** und **Antwort**.

- **Zeuge**: Mit einem Zero-Knowledge-Beweis möchte der Beweisführer Kenntnisse über einige verborgene Informationen nachweisen. Die geheimen Informationen sind der „Zeuge“ für den Beweis, und die angenommene Kenntnis des Beweisführers über den Zeugen stellt eine Reihe von Fragen auf, die nur von einer Partei mit Kenntnis der Informationen beantwortet werden können. Somit beginnt der Beweisführer den Beweisprozess, indem er zufällig eine Frage auswählt, die Antwort berechnet und sie an den Prüfer sendet.

- **Herausforderung**: Der Verifizierer wählt zufällig eine weitere Frage aus der Menge aus und bittet den Beweisführer, sie zu beantworten.

- **Antwort**: Der Beweisführer nimmt die Frage an, berechnet die Antwort und gibt sie an den Verifizierer zurück. Die Antwort des Beweisführers ermöglicht es dem Prüfer, zu überprüfen, ob ersterer wirklich Zugang zu dem Zeugen hat. Um sicherzustellen, dass der Beweisführer nicht blind rät und die richtigen Antworten zufällig erhält, wählt der Prüfer mehr Fragen aus, die er stellen möchte. Indem diese Interaktion viele Male wiederholt wird, sinkt die Wahrscheinlichkeit, dass der Beweisführer Wissen über den Zeugen vortäuscht, signifikant, bis der Prüfer zufrieden ist.

Das Obige beschreibt die Struktur eines „interaktiven Null-Wissen-Beweises“. Frühe Null-Wissen-Protokolle verwendeten interaktive Beweise, bei denen die Überprüfung der Gültigkeit einer Aussage eine hin- und hergehende Kommunikation zwischen Beweisführern und Verifizierern erforderte.

Ein gutes Beispiel, das veranschaulicht, wie interaktive Beweise funktionieren, ist die berühmte [Ali-Baba-Höhlengeschichte](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave) von Jean-Jacques Quisquater. In der Geschichte will Peggy (die Beweisführerin) Victor (dem Prüfer) beweisen, dass sie den geheimen Satz kennt, um eine magische Tür zu öffnen, ohne den Satz preiszugeben.

### Nicht-interaktive Zero-Knowledge-Beweise {#non-interactive-zero-knowledge-proofs}

Während die interaktive Prüfung revolutionär war, hatte sie nur begrenzten Nutzen, da sie erforderte, dass die beiden Parteien verfügbar waren und wiederholt interagierten. Selbst wenn ein Verifizierer von der Ehrlichkeit eines Beweisführers überzeugt wäre, wäre der Beweis für eine unabhängige Verifizierung nicht verfügbar (die Berechnung eines neuen Beweises erforderte einen neuen Satz von Nachrichten zwischen dem Beweisführer und dem Verifizierer).

Um dieses Problem zu lösen, schlugen Manuel Blum, Paul Feldman und Silvio Micali die ersten [nicht-interaktiven Zero-Knowledge-Beweise](https://dl.acm.org/doi/10.1145/62212.62222) vor, bei denen Beweisführer und Verifizierer einen gemeinsamen Schlüssel haben. Dies ermöglicht es dem Beweisführer, sein Wissen über einige Informationen (d. h. Zeugen) zu demonstrieren, ohne die Informationen selbst bereitzustellen.

Im Gegensatz zu interaktiven Beweisen erforderten nicht-interaktive Beweise nur eine Kommunikationsrunde zwischen den Teilnehmern (Beweiser und Verifizierer). Der Beweisführer übergibt die geheime Information an einen speziellen Algorithmus, um einen Null-Wissen-Beweis zu berechnen. Dieser Beweis wird an den Prüfer geschickt, der mit einem anderen Algorithmus überprüft, ob der Beweisführer die geheime Information kennt.

Die nicht-interaktive Beweisführung reduziert die Kommunikation zwischen Beweisführer und Prüfer und macht damit Null-Wissen-Beweise effizienter. Außerdem ist ein einmal generierter Beweis für jeden verfügbar (der Zugriff auf den gemeinsamen Schlüssel und den Verifikationsalgorithmus hat), um ihn zu überprüfen.

Nicht-interaktive Beweise stellten einen Durchbruch für die Null-Wissen-Technologie dar und förderten die Entwicklung von Beweissystemen, die heute verwendet werden. Wir diskutieren im Folgenden diese Beweistypen:

### Arten von Zero-Knowledge-Beweisen {#types-of-zero-knowledge-proofs}

#### ZK-SNARKs {#zk-snarks}

ZK-SNARK ist ein Akronym für **Zero-Knowledge Succinct Non-Interactive Argument of Knowledge**. Das ZK-SNARK-Protokoll hat folgende Eigenschaften:

- **Zero-Knowledge**: Ein Verifizierer kann die Integrität einer Aussage validieren, ohne etwas anderes über die Aussage zu wissen. Das einzige Wissen, das der Prüfer von der Aussage hat, ist, ob sie wahr oder falsch ist.

- **Prägnant**: Der Zero-Knowledge-Beweis ist kleiner als der Zeuge und kann schnell verifiziert werden.

- **Nicht interaktiv**: Der Beweis ist „nicht interaktiv“, da Beweisführer und Verifizierer nur einmal interagieren, im Gegensatz zu interaktiven Beweisen, die mehrere Kommunikationsrunden erfordern.

- **Argument**: Der Beweis erfüllt die Anforderung der „Korrektheit“, sodass Betrug extrem unwahrscheinlich ist.

- **(des) Wissens**: Der Zero-Knowledge-Beweis kann ohne Zugang zu den geheimen Informationen (dem Zeugen) nicht konstruiert werden. Es ist schwierig, wenn nicht unmöglich, für einen Beweisführer, der keinen Zeugen hat, einen gültigen Null-Wissen-Beweis zu berechnen.

Der zuvor erwähnte „gemeinsame Schlüssel“ bezieht sich auf öffentliche Parameter, auf die sich der Beweisführer und der Prüfer zur Generierung und Überprüfung von Beweisen einigen. Die Generierung der öffentlichen Parameter (zusammen als Common Reference String (CRS) bekannt) ist eine sensible Operation aufgrund ihrer Bedeutung für die Sicherheit des Protokolls. Wenn die Entropie (Zufälligkeit), die bei der Erzeugung des CRS verwendet wird, in die Hände eines unehrlichen Beweises gelangt, können sie falsche Beweise berechnen.

[Multi-Party Computation (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) ist eine Möglichkeit, die Risiken bei der Erzeugung öffentlicher Parameter zu reduzieren. Mehrere Parteien nehmen an einer [vertrauenswürdigen Setup-Zeremonie](https://zkproof.org/2021/06/30/setup-ceremonies/amp/) teil, bei der jede Person einige Zufallswerte zur Erzeugung des CRS beiträgt. Solange eine ehrliche Partei ihren Anteil an der Entropie zerstört, behält das ZK-SNARK-Protokoll seine rechnerische Solidität.

Vertrauenswürdige Einrichtungen erfordern, dass Benutzer den Teilnehmern in der Parametererzeugung vertrauen. Die Entwicklung von ZK-STARKs hat jedoch die Entwicklung von Beweisprotokollen ermöglicht, die ohne vertrauenswürdige Einrichtungen auskommen.

#### ZK-STARKs {#zk-starks}

ZK-STARK ist ein Akronym für **Zero-Knowledge Scalable Transparent Argument of Knowledge**. ZK-STARKs ähneln ZK-SNARKs, außer dass sie Folgendes sind:

- **Skalierbar**: ZK-STARK ist bei der Erzeugung und Verifizierung von Beweisen schneller als ZK-SNARK, wenn der Zeuge größer ist. Bei STARK-Beweisen steigen die Beweis- und Verifikationszeiten nur geringfügig an, wenn das Geheimnis wächst (im Gegensatz zu SNARK-Beweisen, bei denen die Beweis- und Verifikationszeiten linear mit der Größe des Geheimnisses ansteigen).

- **Transparent**: ZK-STARK stützt sich auf öffentlich nachprüfbare Zufälligkeit, um öffentliche Parameter für die Beweiserstellung und Verifizierung zu generieren, anstatt auf ein vertrauenswürdiges Setup. Dadurch sind sie im Vergleich zu ZK-SNARKs transparenter.

ZK-STARKs erzeugen größere Beweise als ZK-SNARKs, was in der Regel zu höheren Verifikationsaufwänden führt. Es gibt jedoch Fälle (wie z. B. der Nachweis großer Datensätze), in denen ZK-STARKs im Vergleich zu ZK-SNARKs kosteneffektiver sein können.

## Nachteile der Verwendung von Zero-Knowledge-Beweisen {#drawbacks-of-using-zero-knowledge-proofs}

### Hardware-Kosten {#hardware-costs}

Das Generieren von Null-Wissen-Beweisen setzt sehr komplexe Berechnungen voraus, die am besten auf spezialisierten Maschinen durchgeführt werden. Da diese Maschinen teuer sind, sind sie oft für Einzelpersonen nicht erschwinglich. Darüber hinaus müssen Anwendungen, die Null-Wissen-Technologie verwenden möchten, Hardwarekosten einkalkulieren – was die Kosten für Endbenutzer erhöhen kann.

### Kosten für die Beweisverifizierung {#proof-verification-costs}

Die Überprüfung von Beweisen erfordert auch komplexe Berechnungen und erhöht die Kosten für die Implementierung von Null-Wissen-Technologie in Anwendungen. Diese Kosten sind besonders relevant im Zusammenhang mit dem Nachweis von Berechnungen. Beispielsweise zahlen ZK-Rollups ~500.000 Gas, um einen einzelnen ZK-SNARK-Beweis auf Ethereum zu verifizieren, wobei für ZK-STARKs noch höhere Gebühren anfallen.

### Vertrauensannahmen {#trust-assumptions}

In ZK-SNARK wird der Common Reference String (öffentliche Parameter) einmal generiert und steht Parteien zur Wiederverwendung zur Verfügung, die am Null-Wissen-Protokoll teilnehmen möchten. Öffentliche Parameter werden im Rahmen einer vertrauenswürdigen Einrichtungszeremonie erstellt, bei der von den Teilnehmern angenommen wird, dass sie ehrlich sind.

Aber es gibt für die Benutzer nicht wirklich eine Möglichkeit, die Ehrlichkeit der Teilnehmer einzuschätzen. Die Benutzer müssen die Entwickler beim Wort nehmen. Für ZK-STARKs sind keine Vertrauensannahmen erforderlich, da die Zeichenfolge zufällig generiert und öffentlich verifizierbar ist. Inzwischen arbeiten Forscher an nicht vertrauenswürdigen Setups für ZK-SNARKs, um die Sicherheit von Nachweismechanismen zu erhöhen.

### Bedrohungen durch Quantencomputing {#quantum-computing-threats}

ZK-SNARK nutzt Elliptische-Kurven-Kryptografie für die Verschlüsselung. Obwohl das Problem diskreter Logarithmen in Bezug auf elliptische Kurven bis jetzt als unlösbar gilt, könnte die Entwicklung von Quantencomputern dieses Sicherheitsmodell vor ernsthafte Probleme stellen.

ZK-STARK gilt als immun gegen die Bedrohung durch Quantencomputer, da es für seine Sicherheit nur auf kollisionsresistente Hashfunktionen angewiesen ist. Im Gegensatz zu öffentlich-privaten Schlüsselpaaren, die in der Elliptische-Kurven-Kryptografie zum Einsatz kommen, ist kollisionsresistentes Hashing für Quantencomputing-Algorithmen schwieriger zu knacken.

## Weiterführende Lektüre {#further-reading}

- [Übersicht über Anwendungsfälle für Zero-Knowledge-Beweise](https://pse.dev/projects) – _Privacy and Scaling Explorations Team_
- [SNARKs vs. STARKs vs. rekursive SNARKs](https://www.alchemy.com/overviews/snarks-vs-starks) – _Alchemy Overviews_
- [A Zero-Knowledge Proof: Improving Privacy on a Blockchain](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) – _Dmitry Lavrenov_
- [zk-SNARKs — A Realistic Zero-Knowledge Example and Deep Dive](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) – _Adam Luciano_
- [ZK-STARKs — Create Verifiable Trust, even against Quantum Computers](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) – _Adam Luciano_
- [An approximate introduction to how zk-SNARKs are possible](https://vitalik.eth.limo/general/2021/01/26/snarks.html) – _Vitalik Buterin_
- [Why Zero Knowledge Proofs (ZKPs) is a Game Changer for Self-Sovereign Identity](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) – _Franklin Ohaegbulam_
- [EIP-7503 Explained: Enabling Private Transfers On Ethereum With ZK Proofs](https://research.2077.xyz/eip-7503-zero-knowledge-wormholes-for-private-ethereum-transactions#introduction) – _Emmanuel Awosika_
- [ZK Card Game: game to learn ZK fundamentals and real-life use cases](https://github.com/ZK-card/zk-cards) – _ZK-Cards_
