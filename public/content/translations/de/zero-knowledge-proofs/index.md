---
title: Zero-Knowledge-Beweise
description: "Eine nicht-technische Einführung in Zero-Knowledge-Beweise für Anfänger."
lang: de
---

# Was sind Zero-Knowledge-Beweise? {#what-are-zk-proofs}

Ein Zero-Knowledge-Beweis ist eine Methode, um die Gültigkeit einer Aussage zu beweisen, ohne die Aussage selbst preiszugeben. Der „Beweiser“ (Prover) ist die Partei, die versucht, eine Behauptung zu beweisen, während der „Verifizierer“ (Verifier) für die Validierung der Behauptung verantwortlich ist.

Zero-Knowledge-Beweise tauchten erstmals 1985 in einem Papier mit dem Titel „[The knowledge complexity of interactive proof systems](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)“ auf, das eine heute weit verbreitete Definition von Zero-Knowledge-Beweisen liefert:

> Ein Zero-Knowledge-Protokoll ist eine Methode, mit der eine Partei (der Beweiser) einer anderen Partei (dem Verifizierer) **beweisen kann, dass etwas wahr ist, ohne irgendwelche Informationen preiszugeben**, abgesehen von der Tatsache, dass diese spezifische Aussage wahr ist.

Zero-Knowledge-Beweise wurden im Laufe der Jahre verbessert und werden nun in verschiedenen realen Anwendungen eingesetzt.

<YouTube id="fOGdb1CTu5c" />

## Warum brauchen wir Zero-Knowledge-Beweise? {#why-zero-knowledge-proofs-are-important}

Zero-Knowledge-Beweise stellten einen Durchbruch in der angewandten Kryptografie dar, da sie versprachen, die Informationssicherheit für Einzelpersonen zu verbessern. Stellen Sie sich vor, wie Sie einer anderen Partei (z. B. einem Dienstleister) eine Behauptung beweisen könnten (z. B. „Ich bin Bürger des Landes X“). Sie müssten „Beweise“ vorlegen, um Ihre Behauptung zu untermauern, wie z. B. einen nationalen Reisepass oder einen Führerschein.

Dieser Ansatz bringt jedoch Probleme mit sich, vor allem den Mangel an Privatsphäre. Personenbezogene Daten (Personally Identifiable Information, PII), die mit Drittanbietern geteilt werden, werden in zentralen Datenbanken gespeichert, die anfällig für Hackerangriffe sind. Da Identitätsdiebstahl zu einem kritischen Problem wird, werden Forderungen nach datenschutzfreundlicheren Methoden zum Teilen sensibler Informationen laut.

Zero-Knowledge-Beweise lösen dieses Problem, indem sie **die Notwendigkeit beseitigen, Informationen preiszugeben, um die Gültigkeit von Behauptungen zu beweisen**. Das Zero-Knowledge-Protokoll verwendet die Aussage (als „Zeuge“ oder „Witness“ bezeichnet) als Eingabe, um einen prägnanten Beweis für ihre Gültigkeit zu generieren. Dieser Beweis bietet starke Garantien dafür, dass eine Aussage wahr ist, ohne die Informationen preiszugeben, die bei ihrer Erstellung verwendet wurden.

Um auf unser früheres Beispiel zurückzukommen: Der einzige Beweis, den Sie benötigen, um Ihre Staatsbürgerschaft zu beweisen, ist ein Zero-Knowledge-Beweis. Der Verifizierer muss nur überprüfen, ob bestimmte Eigenschaften des Beweises zutreffen, um davon überzeugt zu sein, dass auch die zugrunde liegende Aussage zutrifft.

## Anwendungsfälle für Zero-Knowledge-Beweise {#use-cases-for-zero-knowledge-proofs}

### Anonyme Zahlungen {#anonymous-payments}

Kreditkartenzahlungen sind oft für mehrere Parteien sichtbar, einschließlich des Zahlungsanbieters, der Banken und anderer interessierter Parteien (z. B. Regierungsbehörden). Während die finanzielle Überwachung Vorteile bei der Identifizierung illegaler Aktivitäten bietet, untergräbt sie auch die Privatsphäre normaler Bürger.

Kryptowährungen sollten den Nutzern eine Möglichkeit bieten, private Peer-to-Peer-Transaktionen durchzuführen. Die meisten Kryptowährungs-Transaktionen sind jedoch auf öffentlichen Blockchains offen sichtbar. Benutzeridentitäten sind oft pseudonym und entweder absichtlich mit realen Identitäten verknüpft (z. B. durch die Angabe von ETH-Adressen in Twitter- oder GitHub-Profilen) oder können mithilfe grundlegender Datenanalysen auf der Blockchain und Off-Chain mit realen Identitäten in Verbindung gebracht werden.

Es gibt spezielle „Privacy Coins“, die für völlig anonyme Transaktionen entwickelt wurden. Auf Datenschutz ausgerichtete Blockchains wie Zcash und Monero verbergen Transaktionsdetails, einschließlich Absender-/Empfängeradressen, Art des Vermögenswerts, Menge und den zeitlichen Ablauf der Transaktion.

Durch die Integration der Zero-Knowledge-Technologie in das Protokoll ermöglichen datenschutzorientierte [Blockchain](/glossary/#blockchain)-Netzwerke den [Blockchain-Knoten](/glossary/#node), Transaktionen zu validieren, ohne auf Transaktionsdaten zugreifen zu müssen. [EIP-7503](https://eips.ethereum.org/EIPS/eip-7503) ist ein Beispiel für ein vorgeschlagenes Design, das native private Wertübertragungen auf der [Ethereum](/)-Blockchain ermöglichen wird. Solche Vorschläge sind jedoch aufgrund einer Mischung aus Sicherheits-, Regulierungs- und UX-Bedenken schwer umzusetzen.  

**Zero-Knowledge-Beweise werden auch zur Anonymisierung von Transaktionen auf öffentlichen Blockchains eingesetzt**. Ein Beispiel ist Tornado Cash, ein dezentralisierter, nicht-verwahrungsbasierter Dienst, der es Benutzern ermöglicht, private Transaktionen auf Ethereum durchzuführen. Tornado Cash verwendet Zero-Knowledge-Beweise, um Transaktionsdetails zu verschleiern und finanzielle Privatsphäre zu garantieren. Da es sich hierbei um „Opt-in“-Datenschutztools handelt, werden sie leider oft mit illegalen Aktivitäten in Verbindung gebracht. Um dies zu überwinden, muss Datenschutz letztendlich zum Standard auf öffentlichen Blockchains werden. Erfahren Sie mehr über [Datenschutz auf Ethereum](/privacy/).

### Identitätsschutz {#identity-protection}

Aktuelle Identitätsmanagementsysteme gefährden persönliche Informationen. Zero-Knowledge-Beweise können Einzelpersonen dabei helfen, ihre Identität zu validieren und gleichzeitig sensible Details zu schützen.

Zero-Knowledge-Beweise sind besonders nützlich im Kontext der [dezentralisierten Identität](/decentralized-identity/). Die dezentralisierte Identität (auch als „selbstsouveräne Identität“ bezeichnet) gibt dem Einzelnen die Möglichkeit, den Zugriff auf persönliche Identifikatoren zu kontrollieren. Der Nachweis Ihrer Staatsbürgerschaft ohne Preisgabe Ihrer Steuer-ID oder Passdaten ist ein gutes Beispiel dafür, wie die Zero-Knowledge-Technologie dezentralisierte Identität ermöglicht.

<Alert variant="info">
  <AlertEmoji text="💡" />
  <AlertContent>
    <AlertTitle className="mb-2">
      ZKP + Identität in Aktion: Bhutans National Digital ID (NDI) auf Ethereum
    </AlertTitle>
    <AlertDescription>
      <p>
        Ein reales Beispiel für die Verwendung von ZKP für Identitätsmanagementsysteme ist das National Digital ID (NDI)-System des Königreichs Bhutan, das auf Ethereum aufbaut. Das NDI von Bhutan verwendet ZKPs, um es Bürgern zu ermöglichen, kryptografisch Fakten über sich selbst zu beweisen, wie z. B. „Ich bin Staatsbürger“ oder „Ich bin über 18“, ohne die sensiblen persönlichen Daten auf ihrem Ausweis preiszugeben.
      </p>
      <p>
        Erfahren Sie mehr über das NDI von Bhutan in der <a href="/decentralized-identity/#national-and-government-id">Fallstudie zur dezentralisierten Identität</a>.
      </p>
 
</AlertDescription>
 
</AlertContent>
</Alert>

### Proof of Humanity {#proof-of-humanity}

Eines der am weitesten verbreiteten Beispiele für Zero-Knowledge-Beweise in der Praxis ist heute das [World ID-Protokoll](https://world.org/blog/world/world-id-faqs), das man sich als „einen globalen digitalen Pass für das Zeitalter der KI“ vorstellen kann. Es ermöglicht Menschen zu beweisen, dass sie einzigartige Individuen sind, ohne persönliche Informationen preiszugeben. Dies wird durch ein Gerät namens Orb erreicht, das die Iris einer Person scannt und einen Iris-Code generiert. Der Iris-Code wird überprüft und verifiziert, um zu bestätigen, dass die Person ein biologisch einzigartiges menschliches Wesen ist. Nach der Verifizierung wird eine auf dem Gerät des Benutzers generierte Identitätsverpflichtung (die nicht mit den biometrischen Daten verknüpft oder daraus abgeleitet ist) zu einer sicheren Liste auf der Blockchain hinzugefügt. Wann immer der Benutzer dann beweisen möchte, dass er ein verifizierter Mensch ist – sei es, um sich anzumelden, abzustimmen oder andere Aktionen durchzuführen –, kann er einen Zero-Knowledge-Beweis generieren, der seine Mitgliedschaft in der Liste bestätigt. Das Schöne an der Verwendung eines Zero-Knowledge-Beweises ist, dass nur eine einzige Aussage preisgegeben wird: Diese Person ist einzigartig. Alles andere bleibt privat.

World ID basiert auf dem [Semaphore-Protokoll](https://docs.semaphore.pse.dev/), das vom [PSE-Team](https://pse.dev/) der Ethereum Foundation entwickelt wurde. Semaphore ist als leichtgewichtige, aber leistungsstarke Möglichkeit konzipiert, Zero-Knowledge-Beweise zu generieren und zu verifizieren. Es ermöglicht Benutzern zu beweisen, dass sie Teil einer Gruppe sind (in diesem Fall verifizierte Menschen), ohne zu zeigen, welches Mitglied der Gruppe sie sind. Semaphore ist zudem äußerst flexibel und ermöglicht die Erstellung von Gruppen basierend auf einer Vielzahl von Kriterien wie Identitätsprüfung, Teilnahme an Veranstaltungen oder dem Besitz von Anmeldeinformationen.

### Authentifizierung {#authentication}

Die Nutzung von Online-Diensten erfordert den Nachweis Ihrer Identität und Ihres Rechts auf Zugriff auf diese Plattformen. Dies erfordert oft die Angabe persönlicher Informationen wie Namen, E-Mail-Adressen, Geburtsdaten und so weiter. Möglicherweise müssen Sie sich auch lange Passwörter merken oder riskieren, den Zugriff zu verlieren.

Zero-Knowledge-Beweise können jedoch die Authentifizierung sowohl für Plattformen als auch für Benutzer vereinfachen. Sobald ein ZK-Beweis unter Verwendung öffentlicher Eingaben (z. B. Daten, die die Mitgliedschaft des Benutzers auf der Plattform belegen) und privater Eingaben (z. B. die Daten des Benutzers) generiert wurde, kann der Benutzer ihn einfach vorlegen, um seine Identität zu authentifizieren, wenn er auf den Dienst zugreifen muss. Dies verbessert die Benutzererfahrung und befreit Organisationen von der Notwendigkeit, riesige Mengen an Benutzerinformationen zu speichern.

### Verifizierbare Berechnung {#verifiable-computation}

Verifizierbare Berechnung ist eine weitere Anwendung der Zero-Knowledge-Technologie zur Verbesserung von Blockchain-Designs. Verifizierbares Rechnen ermöglicht es uns, Berechnungen an eine andere Entität auszulagern und gleichzeitig verifizierbare Ergebnisse beizubehalten. Die Entität reicht das Ergebnis zusammen mit einem Beweis ein, der verifiziert, dass das Programm korrekt ausgeführt wurde.

Verifizierbare Berechnung ist **entscheidend für die Verbesserung der Verarbeitungsgeschwindigkeiten auf Blockchains**, ohne die Sicherheit zu verringern. Um dies zu verstehen, muss man die Unterschiede in den vorgeschlagenen Lösungen zur Skalierung von Ethereum kennen.

[Skalierungslösungen auf der Blockchain](/developers/docs/scaling/#onchain-scaling), wie z. B. Sharding, erfordern umfangreiche Modifikationen der Basisebene der Blockchain. Dieser Ansatz ist jedoch hochkomplex und Fehler bei der Implementierung können das Sicherheitsmodell von Ethereum untergraben.

[Off-Chain-Skalierungslösungen](/developers/docs/scaling/#offchain-scaling) erfordern keine Neugestaltung des Kernprotokolls von Ethereum. Stattdessen stützen sie sich auf ein ausgelagertes Berechnungsmodell, um den Durchsatz auf der Basisebene von Ethereum zu verbessern.

So funktioniert das in der Praxis:

- Anstatt jede Transaktion zu verarbeiten, lagert Ethereum die Ausführung auf eine separate Chain aus.

- Nach der Verarbeitung von Transaktionen gibt die andere Chain die Ergebnisse zurück, die auf den Zustand von Ethereum angewendet werden sollen.

Der Vorteil hierbei ist, dass Ethereum keine Ausführung durchführen muss und nur Ergebnisse aus ausgelagerten Berechnungen auf seinen Zustand anwenden muss. Dies reduziert die Netzwerküberlastung und verbessert auch die Transaktionsgeschwindigkeiten (Off-Chain-Protokolle optimieren für eine schnellere Ausführung).

Die Chain benötigt eine Möglichkeit, Off-Chain-Transaktionen zu validieren, ohne sie erneut auszuführen, da sonst der Wert der Off-Chain-Ausführung verloren geht.

Hier kommt die verifizierbare Berechnung ins Spiel. Wenn ein Blockchain-Knoten eine Transaktion außerhalb von Ethereum ausführt, reicht er einen Zero-Knowledge-Beweis ein, um die Korrektheit der Off-Chain-Ausführung zu beweisen. Dieser Beweis (als [Validitätsnachweis](/glossary/#validity-proof) bezeichnet) garantiert, dass eine Transaktion gültig ist, sodass Ethereum das Ergebnis auf seinen Zustand anwenden kann – ohne darauf warten zu müssen, dass jemand es anficht.

[Zero-Knowledge Rollups](/developers/docs/scaling/zk-rollups) und [Validiums](/developers/docs/scaling/validium/) sind zwei Off-Chain-Skalierungslösungen, die Validitätsnachweise verwenden, um sichere Skalierbarkeit zu bieten. Diese Protokolle führen Tausende von Transaktionen Off-Chain aus und reichen Beweise zur Verifizierung auf Ethereum ein. Diese Ergebnisse können sofort angewendet werden, sobald der Beweis verifiziert ist, sodass Ethereum mehr Transaktionen verarbeiten kann, ohne die Berechnung auf der Basisebene zu erhöhen.

Über die Skalierung auf Ebene 2 hinaus können Zero-Knowledge-Beweise auch die Ausführung von Ethereum-L1-Blöcken selbst verifizieren. zkEVM für die L1-Verifizierung würde es Validatoren ermöglichen, Blöcke durch die Prüfung eines Beweises zu verifizieren, anstatt alle Transaktionen erneut auszuführen -- was höhere Gaslimits ermöglicht, ohne die Hardwareanforderungen für Validatoren zu erhöhen.

### Reduzierung von Bestechung und Absprachen bei Abstimmungen auf der Blockchain {#secure-blockchain-voting}

Blockchain-Abstimmungssysteme haben viele vorteilhafte Eigenschaften: Sie sind vollständig überprüfbar, sicher gegen Angriffe, zensurresistent und frei von geografischen Einschränkungen. Aber selbst Abstimmungssysteme auf der Blockchain sind nicht immun gegen das Problem von **Absprachen** (Collusion).

Definiert als „Koordination zur Einschränkung des offenen Wettbewerbs durch Täuschung, Betrug und Irreführung anderer“, können Absprachen die Form annehmen, dass ein böswilliger Akteur die Abstimmung durch das Anbieten von Bestechungsgeldern beeinflusst. Zum Beispiel könnte Alice von Bob ein Bestechungsgeld erhalten, um bei einer Abstimmung für `Option B` zu stimmen, auch wenn sie `Option A` bevorzugt.

Bestechung und Absprachen schränken die Wirksamkeit jedes Prozesses ein, der Abstimmungen als Signalmechanismus nutzt (insbesondere dort, wo Benutzer beweisen können, wie sie abgestimmt haben). Dies kann erhebliche Konsequenzen haben, insbesondere wenn die Stimmen für die Zuweisung knapper Ressourcen verantwortlich sind.

Zum Beispiel stützen sich [quadratische Finanzierungsmechanismen](https://www.radicalxchange.org/wiki/plural-funding/) auf Spenden, um die Präferenz für bestimmte Optionen unter verschiedenen Projekten für öffentliche Güter zu messen. Jede Spende zählt als „Stimme“ für ein bestimmtes Projekt, wobei Projekte, die mehr Stimmen erhalten, mehr Mittel aus dem Matching-Pool bekommen.

Die Verwendung von Abstimmungen auf der Blockchain macht die quadratische Finanzierung anfällig für Absprachen: Blockchain-Transaktionen sind öffentlich, sodass Bestechungswillige die Aktivitäten eines Bestochenen auf der Blockchain einsehen können, um zu sehen, wie er „abgestimmt“ hat. Auf diese Weise ist die quadratische Finanzierung kein wirksames Mittel mehr, um Mittel basierend auf den aggregierten Präferenzen der Community zuzuweisen.

Glücklicherweise verwenden neuere Lösungen wie MACI (Minimum Anti-Collusion Infrastructure) Zero-Knowledge-Beweise, um Abstimmungen auf der Blockchain (z. B. quadratische Finanzierungsmechanismen) resistent gegen Bestechung und Absprachen zu machen. MACI ist eine Reihe von Smart Contracts und Skripten, die es einem zentralen Administrator (als „Koordinator“ bezeichnet) ermöglichen, Stimmen zu aggregieren und Ergebnisse auszuzählen, _ohne_ Details darüber preiszugeben, wie jeder Einzelne abgestimmt hat. Dennoch ist es weiterhin möglich zu überprüfen, ob die Stimmen ordnungsgemäß gezählt wurden, oder zu bestätigen, dass eine bestimmte Person an der Abstimmungsrunde teilgenommen hat.

#### Wie funktioniert MACI mit Zero-Knowledge-Beweisen? {#how-maci-works-with-zk-proofs}

Zu Beginn stellt der Koordinator den MACI-Vertrag auf Ethereum bereit, woraufhin sich Benutzer für die Abstimmung anmelden können (indem sie ihren Public-Key im Smart Contract registrieren). Benutzer geben ihre Stimmen ab, indem sie mit ihrem Public-Key verschlüsselte Nachrichten an den Smart Contract senden (eine gültige Stimme muss unter anderem mit dem aktuellsten Public-Key signiert sein, der mit der Identität des Benutzers verknüpft ist). Danach verarbeitet der Koordinator alle Nachrichten, sobald der Abstimmungszeitraum endet, zählt die Stimmen aus und verifiziert die Ergebnisse auf der Blockchain.

In MACI werden Zero-Knowledge-Beweise verwendet, um die Korrektheit der Berechnung sicherzustellen, indem es dem Koordinator unmöglich gemacht wird, Stimmen falsch zu verarbeiten und Ergebnisse falsch auszuzählen. Dies wird erreicht, indem der Koordinator ZK-SNARK-Beweise generieren muss, die verifizieren, dass a) alle Nachrichten korrekt verarbeitet wurden und b) das Endergebnis der Summe aller _gültigen_ Stimmen entspricht.

Somit garantiert MACI, auch ohne eine Aufschlüsselung der Stimmen pro Benutzer zu teilen (wie es normalerweise der Fall ist), die Integrität der während des Auszählungsprozesses berechneten Ergebnisse. Diese Funktion ist nützlich, um die Wirksamkeit grundlegender Abspracheschemata zu verringern. Wir können diese Möglichkeit untersuchen, indem wir das vorherige Beispiel verwenden, in dem Bob Alice besticht, um für eine Option zu stimmen:

- Alice registriert sich für die Abstimmung, indem sie ihren Public-Key an einen Smart Contract sendet.
- Alice stimmt zu, im Austausch für ein Bestechungsgeld von Bob für `Option B` zu stimmen.
- Alice stimmt für `Option B`.
- Alice sendet heimlich eine verschlüsselte Transaktion, um den mit ihrer Identität verknüpften Public-Key zu ändern.
- Alice sendet eine weitere (verschlüsselte) Nachricht an den Smart Contract und stimmt mit dem neuen Public-Key für `Option A`.
- Alice zeigt Bob eine Transaktion, die zeigt, dass sie für `Option B` gestimmt hat (was ungültig ist, da der Public-Key im System nicht mehr mit Alices Identität verknüpft ist).
- Während der Verarbeitung von Nachrichten überspringt der Koordinator Alices Stimme für `Option B` und zählt nur die Stimme für `Option A`. Daher schlägt Bobs Versuch fehl, sich mit Alice abzusprechen und die Abstimmung auf der Blockchain zu manipulieren.

Die Verwendung von MACI erfordert _allerdings_ das Vertrauen, dass der Koordinator sich nicht mit Bestechungswilligen abspricht oder versucht, Wähler selbst zu bestechen. Der Koordinator kann Benutzernachrichten entschlüsseln (was für die Erstellung des Beweises erforderlich ist), sodass er genau überprüfen kann, wie jede Person abgestimmt hat.

Aber in Fällen, in denen der Koordinator ehrlich bleibt, stellt MACI ein leistungsstarkes Werkzeug dar, um die Unantastbarkeit von Abstimmungen auf der Blockchain zu garantieren. Dies erklärt seine Beliebtheit bei quadratischen Finanzierungsanwendungen (z. B. [clr.fund](https://clr.fund/#/about/maci)), die stark auf die Integrität der Abstimmungsentscheidungen jedes Einzelnen angewiesen sind.

[Erfahren Sie mehr über MACI](https://maci.pse.dev/).

## Wie funktionieren Zero-Knowledge-Beweise? {#how-do-zero-knowledge-proofs-work}

Ein Zero-Knowledge-Beweis ermöglicht es Ihnen, die Wahrheit einer Aussage zu beweisen, ohne den Inhalt der Aussage zu teilen oder preiszugeben, wie Sie die Wahrheit herausgefunden haben. Um dies zu ermöglichen, stützen sich Zero-Knowledge-Protokolle auf Algorithmen, die einige Daten als Eingabe nehmen und als Ausgabe „wahr“ oder „falsch“ zurückgeben.

Ein Zero-Knowledge-Protokoll muss die folgenden Kriterien erfüllen:

1. **Vollständigkeit** (Completeness): Wenn die Eingabe gültig ist, gibt das Zero-Knowledge-Protokoll immer „wahr“ zurück. Wenn also die zugrunde liegende Aussage wahr ist und der Beweiser und der Verifizierer ehrlich handeln, kann der Beweis akzeptiert werden.

2. **Stichhaltigkeit** (Soundness): Wenn die Eingabe ungültig ist, ist es theoretisch unmöglich, das Zero-Knowledge-Protokoll so zu täuschen, dass es „wahr“ zurückgibt. Daher kann ein lügender Beweiser einen ehrlichen Verifizierer nicht dazu bringen zu glauben, dass eine ungültige Aussage gültig ist (außer mit einer winzigen Wahrscheinlichkeitsmarge).

3. **Zero-Knowledge**: Der Verifizierer erfährt nichts über eine Aussage, das über ihre Gültigkeit oder Falschheit hinausgeht (er hat „Null Wissen“ über die Aussage). Diese Anforderung verhindert auch, dass der Verifizierer die ursprüngliche Eingabe (den Inhalt der Aussage) aus dem Beweis ableitet.

In seiner Grundform besteht ein Zero-Knowledge-Beweis aus drei Elementen: **Zeuge** (Witness), **Herausforderung** (Challenge) und **Antwort** (Response).

- **Zeuge** (Witness): Mit einem Zero-Knowledge-Beweis möchte der Beweiser die Kenntnis einiger verborgener Informationen beweisen. Die geheime Information ist der „Zeuge“ für den Beweis, und das angenommene Wissen des Beweisers über den Zeugen legt eine Reihe von Fragen fest, die nur von einer Partei beantwortet werden können, die Kenntnis von den Informationen hat. Somit beginnt der Beweiser den Beweisprozess, indem er zufällig eine Frage auswählt, die Antwort berechnet und sie an den Verifizierer sendet.

- **Herausforderung** (Challenge): Der Verifizierer wählt zufällig eine weitere Frage aus der Menge aus und bittet den Beweiser, sie zu beantworten.

- **Antwort** (Response): Der Beweiser akzeptiert die Frage, berechnet die Antwort und gibt sie an den Verifizierer zurück. Die Antwort des Beweisers ermöglicht es dem Verifizierer zu überprüfen, ob ersterer wirklich Zugriff auf den Zeugen hat. Um sicherzustellen, dass der Beweiser nicht blind rät und die richtigen Antworten durch Zufall erhält, wählt der Verifizierer weitere Fragen aus, die er stellen kann. Durch die vielfache Wiederholung dieser Interaktion sinkt die Wahrscheinlichkeit, dass der Beweiser das Wissen über den Zeugen vortäuscht, erheblich, bis der Verifizierer zufrieden ist.

Das Obige beschreibt die Struktur eines „interaktiven Zero-Knowledge-Beweises“. Frühe Zero-Knowledge-Protokolle verwendeten interaktives Beweisen, bei dem die Überprüfung der Gültigkeit einer Aussage eine Hin- und Her-Kommunikation zwischen Beweisern und Verifizierern erforderte.

Ein gutes Beispiel, das veranschaulicht, wie interaktive Beweise funktionieren, ist Jean-Jacques Quisquaters berühmte [Ali-Baba-Höhlengeschichte](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave). In der Geschichte möchte Peggy (die Beweiserin) Victor (dem Verifizierer) beweisen, dass sie den geheimen Satz kennt, um eine magische Tür zu öffnen, ohne den Satz preiszugeben.

### Nicht-interaktive Zero-Knowledge-Beweise {#non-interactive-zero-knowledge-proofs}

Obwohl revolutionär, war das interaktive Beweisen nur von begrenztem Nutzen, da es erforderte, dass die beiden Parteien verfügbar waren und wiederholt interagierten. Selbst wenn ein Verifizierer von der Ehrlichkeit eines Beweisers überzeugt war, stünde der Beweis nicht für eine unabhängige Verifizierung zur Verfügung (die Berechnung eines neuen Beweises erforderte einen neuen Satz von Nachrichten zwischen dem Beweiser und dem Verifizierer).

Um dieses Problem zu lösen, schlugen Manuel Blum, Paul Feldman und Silvio Micali die ersten [nicht-interaktiven Zero-Knowledge-Beweise](https://dl.acm.org/doi/10.1145/62212.62222) vor, bei denen der Beweiser und der Verifizierer einen gemeinsamen Schlüssel haben. Dies ermöglicht es dem Beweiser, sein Wissen über bestimmte Informationen (d. h. den Zeugen) zu demonstrieren, ohne die Informationen selbst bereitzustellen.

Im Gegensatz zu interaktiven Beweisen erforderten nicht-interaktive Beweise nur eine Kommunikationsrunde zwischen den Teilnehmern (Beweiser und Verifizierer). Der Beweiser übergibt die geheimen Informationen an einen speziellen Algorithmus, um einen Zero-Knowledge-Beweis zu berechnen. Dieser Beweis wird an den Verifizierer gesendet, der mithilfe eines anderen Algorithmus überprüft, ob der Beweiser die geheimen Informationen kennt.

Nicht-interaktives Beweisen reduziert die Kommunikation zwischen Beweiser und Verifizierer und macht ZK-Beweise effizienter. Darüber hinaus steht ein einmal generierter Beweis jedem anderen (mit Zugriff auf den gemeinsamen Schlüssel und den Verifizierungsalgorithmus) zur Verifizierung zur Verfügung.

Nicht-interaktive Beweise stellten einen Durchbruch für die Zero-Knowledge-Technologie dar und spornten die Entwicklung der heute verwendeten Beweissysteme an. Wir diskutieren diese Beweisarten im Folgenden:

### Arten von Zero-Knowledge-Beweisen {#types-of-zero-knowledge-proofs}

#### ZK-SNARKs {#zk-snarks}

ZK-SNARK ist ein Akronym für **Zero-Knowledge Succinct Non-Interactive Argument of Knowledge**. Das ZK-SNARK-Protokoll hat die folgenden Eigenschaften:

- **Zero-Knowledge**: Ein Verifizierer kann die Integrität einer Aussage validieren, ohne etwas anderes über die Aussage zu wissen. Das einzige Wissen, das der Verifizierer über die Aussage hat, ist, ob sie wahr oder falsch ist.

- **Prägnant** (Succinct): Der Zero-Knowledge-Beweis ist kleiner als der Zeuge und kann schnell verifiziert werden.

- **Nicht-interaktiv** (Non-Interactive): Der Beweis ist „nicht-interaktiv“, da der Beweiser und der Verifizierer nur einmal interagieren, im Gegensatz zu interaktiven Beweisen, die mehrere Kommunikationsrunden erfordern.

- **Argument**: Der Beweis erfüllt die Anforderung der „Stichhaltigkeit“ (Soundness), sodass Betrug extrem unwahrscheinlich ist.

- **(Of) Knowledge** (Des Wissens): Der Zero-Knowledge-Beweis kann nicht ohne Zugriff auf die geheimen Informationen (Zeuge) konstruiert werden. Es ist schwierig, wenn nicht gar unmöglich, für einen Beweiser, der den Zeugen nicht hat, einen gültigen Zero-Knowledge-Beweis zu berechnen.

Der zuvor erwähnte „gemeinsame Schlüssel“ bezieht sich auf öffentliche Parameter, auf deren Verwendung sich der Beweiser und der Verifizierer bei der Generierung und Verifizierung von Beweisen einigen. Die Generierung der öffentlichen Parameter (zusammenfassend als Common Reference String (CRS) bekannt) ist aufgrund ihrer Bedeutung für die Sicherheit des Protokolls ein sensibler Vorgang. Wenn die bei der Generierung des CRS verwendete Entropie (Zufälligkeit) in die Hände eines unehrlichen Beweisers gerät, kann dieser falsche Beweise berechnen.

[Multi-Party Computation (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) ist eine Möglichkeit, die Risiken bei der Generierung öffentlicher Parameter zu reduzieren. Mehrere Parteien nehmen an einer [Trusted Setup-Zeremonie](https://zkproof.org/2021/06/30/setup-ceremonies/amp/) teil, bei der jede Person einige Zufallswerte beisteuert, um das CRS zu generieren. Solange eine ehrliche Partei ihren Teil der Entropie zerstört, behält das ZK-SNARK-Protokoll seine rechnerische Stichhaltigkeit.

Trusted Setups erfordern, dass Benutzer den Teilnehmern an der Parametergenerierung vertrauen. Die Entwicklung von ZK-STARKs hat jedoch Beweisprotokolle ermöglicht, die mit einem nicht-vertrauenswürdigen Setup (Non-Trusted Setup) funktionieren.

#### ZK-STARKs {#zk-starks}

ZK-STARK ist ein Akronym für **Zero-Knowledge Scalable Transparent Argument of Knowledge**. ZK-STARKs ähneln ZK-SNARKs, mit der Ausnahme, dass sie Folgendes sind:

- **Skalierbar** (Scalable): ZK-STARK ist bei der Generierung und Verifizierung von Beweisen schneller als ZK-SNARK, wenn die Größe des Zeugen größer ist. Bei STARK-Beweisen steigen die Beweiser- und Verifizierungszeiten nur geringfügig an, wenn der Zeuge wächst (SNARK-Beweiser- und Verifiziererzeiten steigen linear mit der Zeugengröße).

- **Transparent**: ZK-STARK stützt sich auf öffentlich verifizierbare Zufälligkeit, um öffentliche Parameter für das Beweisen und Verifizieren zu generieren, anstatt auf ein Trusted Setup. Somit sind sie im Vergleich zu ZK-SNARKs transparenter.

ZK-STARKs erzeugen größere Beweise als ZK-SNARKs, was bedeutet, dass sie im Allgemeinen einen höheren Verifizierungsaufwand haben. Es gibt jedoch Fälle (wie das Beweisen großer Datensätze), in denen ZK-STARKs kostengünstiger sein können als ZK-SNARKs.

## Nachteile der Verwendung von Zero-Knowledge-Beweisen {#drawbacks-of-using-zero-knowledge-proofs}

### Hardwarekosten {#hardware-costs}

Die Generierung von Zero-Knowledge-Beweisen beinhaltet sehr komplexe Berechnungen, die am besten auf spezialisierten Maschinen durchgeführt werden. Da diese Maschinen teuer sind, sind sie für normale Einzelpersonen oft unerschwinglich. Darüber hinaus müssen Anwendungen, die die Zero-Knowledge-Technologie nutzen möchten, Hardwarekosten einkalkulieren – was die Kosten für Endbenutzer erhöhen kann.

### Kosten für die Beweisverifizierung {#proof-verification-costs}

Die Verifizierung von Beweisen erfordert ebenfalls komplexe Berechnungen und erhöht die Kosten für die Implementierung der Zero-Knowledge-Technologie in Anwendungen. Diese Kosten sind besonders im Kontext der Beweisberechnung relevant. Zum Beispiel zahlen ZK-Rollups ~ 500.000 Gas, um einen einzigen ZK-SNARK-Beweis auf Ethereum zu verifizieren, wobei ZK-STARKs noch höhere Gebühren erfordern.

### Vertrauensannahmen {#trust-assumptions}

In ZK-SNARK wird der Common Reference String (öffentliche Parameter) einmal generiert und steht Parteien, die am Zero-Knowledge-Protokoll teilnehmen möchten, zur Wiederverwendung zur Verfügung. Öffentliche Parameter werden über eine Trusted Setup-Zeremonie erstellt, bei der davon ausgegangen wird, dass die Teilnehmer ehrlich sind.

Aber es gibt für Benutzer wirklich keine Möglichkeit, die Ehrlichkeit der Teilnehmer zu beurteilen, und Benutzer müssen die Entwickler beim Wort nehmen. ZK-STARKs sind frei von Vertrauensannahmen, da die bei der Generierung des Strings verwendete Zufälligkeit öffentlich verifizierbar ist. In der Zwischenzeit arbeiten Forscher an nicht-vertrauenswürdigen Setups für ZK-SNARKs, um die Sicherheit von Beweismechanismen zu erhöhen.

### Bedrohungen durch Quantencomputing {#quantum-computing-threats}

ZK-SNARK verwendet elliptische Kurvenkryptografie zur Verschlüsselung. Während das Problem des diskreten Logarithmus auf elliptischen Kurven vorerst als unlösbar gilt, könnte die Entwicklung von Quantencomputern dieses Sicherheitsmodell in Zukunft brechen.

ZK-STARK gilt als immun gegen die Bedrohung durch Quantencomputing, da es sich für seine Sicherheit nur auf kollisionsresistente Hash-Funktionen stützt. Im Gegensatz zu Public-Private-Key-Paarungen, die in der elliptischen Kurvenkryptografie verwendet werden, ist kollisionsresistentes Hashing für Quantencomputing-Algorithmen schwerer zu brechen.

## Weiterführende Literatur {#further-reading}

- [Überblick über Anwendungsfälle für Zero-Knowledge-Beweise](https://pse.dev/projects) – _Privacy and Scaling Explorations Team_
- [SNARKs vs. STARKS vs. Rekursive SNARKs](https://www.alchemy.com/overviews/snarks-vs-starks) – _Alchemy Overviews_
- [Ein Zero-Knowledge-Beweis: Verbesserung der Privatsphäre auf einer Blockchain](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) – _Dmitry Lavrenov_
- [zk-SNARKs – Ein realistisches Zero-Knowledge-Beispiel und Deep Dive](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) – _Adam Luciano_
- [ZK-STARKs – Schaffen Sie verifizierbares Vertrauen, selbst gegen Quantencomputer](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) – _Adam Luciano_
- [Eine ungefähre Einführung, wie zk-SNARKs möglich sind](https://vitalik.eth.limo/general/2021/01/26/snarks.html) – _Vitalik Buterin_
- [Warum Zero-Knowledge-Beweise (ZKPs) ein Game Changer für selbstsouveräne Identität sind](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) – _Franklin Ohaegbulam_
- [EIP-7503 erklärt: Ermöglichung privater Transfers auf Ethereum mit ZK-Beweisen](https://research.2077.xyz/eip-7503-zero-knowledge-wormholes-for-private-ethereum-transactions#introduction) – _Emmanuel Awosika_
- [ZK Card Game: Spiel zum Erlernen von ZK-Grundlagen und realen Anwendungsfällen](https://github.com/ZK-card/zk-cards) – _ZK-Cards_