---
title: "Die Privatsphäre-Roadmap für Ethereum"
description: "Ethereum arbeitet daran, Privatsphäre durch Upgrades zu einer erstklassigen Eigenschaft des Netzwerks zu machen. Diese Upgrades schützen die Privatsphäre von Transaktionen, sichern den Zugriff auf Benutzerdaten und ermöglichen eine verifizierbare, aber private Identität."
lang: de
image: /images/roadmap/roadmap-security.png
alt: "Ethereum-Roadmap"
template: roadmap
---

**Privatsphäre auf Ethereum entwickelt sich von einer optionalen Erweiterung zu einem Standard auf Netzwerkebene.** Die vorgeschlagenen Privatsphäre-Roadmaps von Ethereum zielen auf spezifische, anfällige Verbindungspunkte ab, an denen heute Benutzerdaten durchsickern können. Die Forschung im gesamten Ökosystem zielt darauf ab, Ethereum zu einer Plattform zu machen, auf der Privatsphäre strukturell verankert ist und nicht erst aktiviert werden muss (Opt-in).

Forscher der Ethereum Foundation haben [drei zentrale Roadmap-Prioritäten](https://pse.dev/blog/pse-roadmap-2025) aus der verteilten Forschung des gesamten Ökosystems zusammengefasst:

- **Private Lesezugriffe (Private Reads)** - Ethereum abfragen und durchsuchen, ohne preiszugeben, auf welche Adressen, Smart Contracts oder Daten ein Benutzer zugreift. Der Schutz von Lesezugriffen verhindert, dass Daten gesammelt werden, noch bevor eine Transaktion überhaupt signiert ist.
- **Private Schreibzugriffe (Private Writes)** - Transaktionen senden, die resistent gegen Zensur und das Durchsickern von Metadaten sind, von der Aufnahme in den Mempool bis zur endgültigen Abwicklung. Der Schutz von Schreibzugriffen stellt sicher, dass private Transaktionen nicht zensiert oder zu ihrem Ursprung zurückverfolgt werden können.
- **Privates Beweisen (Private Proving)** - Identität, Berechtigung oder Daten verifizieren, ohne die zugrunde liegenden persönlichen Informationen preiszugeben, unter Verwendung effizienter Zero-Knowledge-Beweise. Privates Beweisen ermöglicht es Benutzern, am Netzwerk teilzunehmen und sich gleichzeitig dafür zu entscheiden, nur die minimal erforderlichen Informationen preiszugeben (selektive Offenlegung).

Zusammen bilden diese drei Bereiche ein End-to-End-Privatsphäre-Modell. Das Ziel ist **rechnerische Souveränität (computational sovereignty)**, um sicherzustellen, dass Ethereum eine Plattform ist, auf der Einzelpersonen und Institutionen weltweit interagieren, sich koordinieren und Transaktionen durchführen können, ohne ungenehmigte Datensammlung, Überwachung oder zentralisierte Zensur.

**Warum ist Privatsphäre wichtig?** Erfahren Sie mehr über Privatsphäre, wie Sie Ihre Privatsphäre online schützen und wie Sie Ihre Privatsphäre auf Ethereum heute schützen können.

<ButtonLink variant="outline" href="/privacy/">Mehr zum Thema Privatsphäre</ButtonLink>

## Private Lesezugriffe schützen Benutzerabfragen und Zugriffsdaten {#private-reads}

Bevor eine Transaktion jemals signiert wird, muss ein Benutzer Daten aus der Blockchain lesen. Um einen Kontostand zu überprüfen, Gas zu schätzen oder den Zustand eines Smart Contracts zu verifizieren, sendet die Wallet-Software Abfragen an einen Knoten-Anbieter. Diese standardmäßigen **Remote Procedure Call (RPC)**-Abfragen legen eine immense Menge an Metadaten offen.

Der Knoten-Anbieter kann die IP-Adresse des Benutzers, den Geräte-Fingerabdruck, spezifische abgefragte Adressen sowie den Zeitpunkt und die Häufigkeit seiner Aktivitäten sehen. Selbst wenn ein Benutzer danach eine private Transaktion sendet, hat der Infrastrukturanbieter bereits Zugriff auf eine detaillierte Karte seiner Absichten.

<VideoWatch slug="ethereum-privacy-stack-andy-guzman" />

Das Durchsickern von Metadaten auf der Zugriffsebene ist eines der hartnäckigsten Privatsphäre-Probleme in allen Blockchain-Systemen. Ethereum zielt darauf ab, das Durchsickern von Metadaten durch Privatsphäre beim Ursprung (Verbergen, wer gefragt hat), Privatsphäre beim Inhalt (Verbergen, was gefragt wurde) und die Verifizierung der Richtigkeit der zurückgegebenen Informationen zu beheben.

**Ursprungs-Privatsphäre (Origin privacy)** nutzt [anonyme RPCs](https://privreads.ethereum.foundation/feed/anon-rpc/) und anonyme Netzwerklösungen, um die Entität zu verschleiern, die die Daten anfordert. **Inhalts-Privatsphäre (Content privacy)** verwendet Taktiken wie Private Information Retrieval und [Oblivious RAM](https://en.wikipedia.org/wiki/Oblivious_RAM), um die abgefragten Daten zu verbergen, während die **Verifizierung der Richtigkeit** Light Clients verwendet, um zu beweisen, dass die zurückgegebenen Daten korrekt sind.

Der kryptographische Baustein hinter der Inhalts-Privatsphäre ist [**Private Information Retrieval (PIR)**](https://en.wikipedia.org/wiki/Private_information_retrieval), eine kryptographische Technik, die es einem Client ermöglicht, eine Datenbank abzufragen und eine spezifische Information abzurufen, ohne dem Server preiszugeben, auf welches Element zugegriffen wurde. Der Server verarbeitet die Anfrage blind und gibt eine verschlüsselte Antwort zurück, die nur die abfragende Wallet entschlüsseln kann.

PIR arbeitet auf der Zugriffsebene und sitzt zwischen der Wallet-Software und den Knoten-Anbietern. Wenn PIR-Implementierungen ausgereifter werden, werden sie in Software Development Kits (SDKs) für Wallets und bei Infrastrukturanbietern integriert, sodass Benutzer das Netzwerk abfragen können, ohne ihre Aktivitäten zentralisierten Vermittlern preiszugeben.

Private Lesezugriffe reduzieren auch die Anfälligkeit für Front-Running und Angriffe auf die Transaktionsreihenfolge. Wenn ein Infrastrukturanbieter nicht sehen kann, welchen Smart Contract oder welche Adresse ein Benutzer abfragt, kann er diese Informationen nicht an Akteure verkaufen, die davon profitieren, Onchain-Aktivitäten vorherzusehen.

## Private Schreibzugriffe verhindern Zensur und das Durchsickern von Transaktionen {#private-writes}

Sobald eine Transaktion gesendet wird, durchläuft sie die Netzwerkinfrastruktur, die sie beobachten oder blockieren kann, bevor sie Onchain aufgezeichnet wird. Hier scheitern viele Privatsphäre-Protokolle in der Praxis. Große, zentralisierte Block-Builder überwachen den Mempool und können Transaktionen, die von Privatsphäre-Tools stammen, stillschweigend beiseiteschieben oder zensieren. Selbst wenn die zugrunde liegende Kryptographie solide ist, bietet eine Transaktion, die niemals in einen Block aufgenommen wird, keinen Schutz.

Zwei Upgrades auf Protokollebene gehen dieses Problem gemeinsam an:

[**EIP-8141 (Frame-Transaktionen)**](https://eips.ethereum.org/EIPS/eip-8141) führt einen neuen Transaktionstyp ein, der Transaktionen in Segmente für die Signaturvalidierung und Gebührenautorisierung sowie für die eigentlichen Transaktionsanweisungen aufteilt. Frame-Transaktionen ermöglichen es [Smart Accounts](/roadmap/account-abstraction/), ihre eigenen Signaturschemata zu definieren und externe Smart Contracts zu nutzen, um Gasgebühren zu decken. Strenge Sandboxing-Regeln im Mempool verhindern, dass diese Transaktionen das Netzwerk für Denial-of-Service-Angriffe öffnen.

Frame-Transaktionen werden für Ethereums [Hegotá-Upgrade](https://forkcast.org/upgrade/hegota/) in Betracht gezogen, das nächste Netzwerk-Upgrade nach dem bevorstehenden [Glamsterdam-Upgrade](/roadmap/glamsterdam/). Dasselbe Upgrade wird es Smart Accounts auch ermöglichen, [quantensichere Signaturen](/roadmap/security/quantum-resistance/) zu übernehmen, bevor der vollständige Post-Quanten-Netzwerkübergang abgeschlossen ist.

<ExpandableCard title="Wie ermöglichen Frame-Transaktionen (EIP-8141) Privatsphäre?" eventCategory="/roadmap/privacy" eventName="clicked how do frame transactions enable privacy?">

Frame-Transaktionen ermöglichen es Konten, ihre eigene Signaturverifizierungsmethode zu wählen. Für die Privatsphäre bedeutet dies, dass Benutzer privatsphäreschonende Signaturschemata übernehmen können, ohne auf eine groß angelegte, netzwerkweite Migration warten zu müssen. Frame-Transaktionen ermöglichen auch die Abstraktion von Gasgebühren, sodass Privatsphäre-Tools Transaktionskosten decken können, ohne Benutzeradressen Onchain preiszugeben.

</ExpandableCard>

[**EIP-7805 (Fork-Choice Enforced Inclusion Lists, oder FOCIL)**](https://eips.ethereum.org/EIPS/eip-7805) bietet den Durchsetzungsmechanismus für private Schreibzugriffe. Block-Proposer sind durch Konsensregeln verpflichtet, Transaktionen aus aggregierten lokalen Inklusionslisten, die Transaktionen aus mehreren Quellen sammeln, in ihre Blöcke aufzunehmen. Wenn ein Block-Builder versucht, eine Transaktion zu zensieren, die auf den Inklusionslisten stand, lehnen attestierende Knoten den vorgeschlagenen Block vollständig ab. FOCIL wird derzeit für das [Hegotá-Upgrade](https://forkcast.org/upgrade/hegota/) in Betracht gezogen.

Frame-Transaktionen geben Benutzern die Flexibilität, privatsphäreschonende Transaktionen mit benutzerdefinierten Signaturschemata zu erstellen, während FOCIL sicherstellt, dass diese Transaktionen nicht selektiv zensiert werden können, sobald sie in den Mempool gelangen. Zusammen adressieren sie zwei verschiedene Fehlerpunkte: Der eine ermöglicht das Format privater Transaktionen, der andere garantiert deren Aufnahme. Kein zentraler Akteur kann einen gültigen privaten Transfer blockieren.

<VideoWatch slug="eip-7805-focil-explained" />

Ein zweiter anfälliger Punkt für die Privatsphäre der Benutzer ist die Art und Weise, wie Ethereum die Reihenfolge von Transaktionen verfolgt, das sogenannte sequentielle Nonce-System. Im standardmäßigen Ethereum-Kontomodell verwendet jedes Konto einen einzigen, linear inkrementierenden Zähler. Wenn sich eine private Transaktion im Mempool verzögert, stauen sich alle nachfolgenden Transaktionen von diesem Konto dahinter. Die Nonce-Sequenz ermöglicht es Netzwerkbeobachtern auch, mehrere Transaktionen auf dasselbe Ursprungskonto zurückzuführen, was die Privatsphäre untergräbt.

[**EIP-8250 (Keyed Nonces für Frame-Transaktionen)**](https://eips.ethereum.org/EIPS/eip-8250), das derzeit für Hegotá in Betracht gezogen wird, löst dies, indem es einem einzigen Konto ermöglicht, mehrere parallele Transaktionssequenzen gleichzeitig zu verwalten. Benutzer können viele private Transaktionen über verschiedene Kontexte hinweg zur gleichen Zeit ausführen, und Beobachter können unterschiedliche Aktivitäten nicht mehr zuverlässig mit demselben übergeordneten Konto korrelieren.

### Private Zahlungen und Werttransfers {#private-payments}

Über das Transaktionsrouting und das Nonce-Management hinaus erfordert der Schutz von Schreibzugriffen die Abschirmung der an einem Transfer beteiligten Identitäten und Vermögenswerte. Selbst wenn ein Benutzer privat abfragt und eine Transaktion ohne Zensur sendet, bleiben die Onchain aufgezeichneten Transaktionsdaten öffentlich sichtbar. Jeder kann sehen, wer wie viel an wen gesendet hat, und Chain-Analysefirmen aggregieren diese Daten zu durchsuchbaren Profilen, die auf unbestimmte Zeit bestehen bleiben.

[**EIP-8182 (Private ETH- und ERC-20-Transfers)**](https://eips.ethereum.org/EIPS/eip-8182), das für das Hegotá-Upgrade vorgeschlagen wurde, führt einen nativen, gemeinsamen abgeschirmten Pool (Shielded Pool) direkt in das Ethereum-Protokoll für ETH- und ERC-20-Transfers ein. Privacy Pools nutzen kryptographisches Mischen, um die Verbindung zwischen Einzahlung und Abhebung zu trennen, sind heute jedoch nur über Privatsphäre-Apps, Wallets und Layer-2-Netzwerke verfügbar.

In der Vergangenheit haben Privatsphäre-Lösungen auf App-Ebene die Liquidität fragmentiert und unter kleinen Anonymitätsmengen (Anonymity Sets) gelitten. EIP-8182 konsolidiert abgeschirmte Transfers auf Protokollebene und ermöglicht es Benutzern, Gelder über verborgene Zustellungsschlüssel (Delivery Keys) weiterzuleiten, ohne spezielle Wallet-Architekturen zu benötigen oder mit fragmentierten Opt-in-Anwendungen interagieren zu müssen.

Andere Forschungsansätze, die für die Transaktionsprivatsphäre vorangetrieben werden, umfassen Beweise, die es Benutzern ermöglichen, zu demonstrieren, dass Transaktionsbeträge gültig sind, ohne die tatsächlichen Werte preiszugeben (wie Bulletproofs und Range Proofs). Die Forschung zu **vertraulichen Transaktionen (Confidential Transactions)** zielt darauf ab, Beträge zu verbergen und dem Netzwerk dennoch zu ermöglichen, zu verifizieren, dass kein Wert geschaffen oder zerstört wird.

Diese Lösungen auf der Zahlungsebene bauen auf der zuvor in diesem Abschnitt beschriebenen Infrastruktur auf. PIR schützt die Vorbereitungsphase, Frame-Transaktionen und FOCIL stellen sicher, dass private Zahlungen den Mempool ohne Zensur erreichen, und zkVMs ermöglichen die komplexe Kryptographie, die für das Verbergen von Werten erforderlich ist, während die Sicherheitsgarantien des Netzwerks aufrechterhalten werden.

## Privates Beweisen und Identitätsschutz {#private-proving}

Bei Privatsphäre geht es nicht um totale Verheimlichung. Es geht um **selektive Offenlegung**, also die Entscheidung, welche Informationen wem und unter welchen Bedingungen preisgegeben werden. Ethereum unterstützt selektive Offenlegung durch [**Zero-Knowledge-Beweise (ZKPs)**](/zero-knowledge-proofs/), die es einer Partei ermöglichen, zu beweisen, dass eine Aussage wahr ist, ohne die zugrunde liegenden Daten preiszugeben. Zum Beispiel der Nachweis der Staatsbürgerschaft ohne Preisgabe von Passdetails oder der Nachweis einer Altersgrenze ohne Preisgabe des genauen Geburtsdatums.

Privates Beweisen knüpft an die Privatsphäre-Roadmap an, indem es eine verifizierbare Identität ohne Datenoffenlegung auf Protokollebene ermöglicht. Während private Lese- und Schreibzugriffe Transaktionsmetadaten schützen, stellt privates Beweisen sicher, dass die für die reale Teilnahme erforderlichen Identitäts- und Berechtigungsprüfungen nicht die Herausgabe persönlicher Daten an zentralisierte Verifizierungssysteme erfordern.

Auf der Privatsphäre-Roadmap von Ethereum wird privates Beweisen durch komplementäre Infrastrukturpfade unterstützt: einen auf der Ausführungsschicht, um private Berechnungen auf Protokollebene zu ermöglichen, und einen auf der Zugriffsebene, der private Berechnungen auf Endgeräten praktikabel macht.

**Zero-Knowledge Virtual Machines (zkVMs)** ermöglichen es Smart Contracts, ihre Logik auszuführen und einen kryptographischen Beweis zu generieren, dass die Arbeit korrekt ausgeführt wurde. Wenn dieser Beweis wirklich Zero-Knowledge ist, verrät er nichts über die Eingaben, den Zwischenzustand oder die Ausgaben, was private Berechnungen auf Netzwerkebene freischaltet.

Der Name „zkVM“ birgt eine Nuance; die meisten Systeme, die heute als zkVMs bezeichnet werden, sind eher prägnant (succinct) als Zero-Knowledge. Ihre Beweise sind klein und schnell zu verifizieren, verbergen aber nicht zwangsläufig die Daten, die zu ihrer Generierung verwendet wurden. Heute bieten nur eine Handvoll Beweissysteme die Verbergungseigenschaft, auf die Privatsphäre-Anwendungen angewiesen sind. Die [Client-Side Proving-Benchmarks](https://ethproofs.org/csp-benchmarks) verfolgen, welche zkVMs auf tatsächliches Zero-Knowledge in ihren Systemeigenschaften analysiert wurden. Diese Lücke zu schließen, ist Teil der Arbeit am privaten Beweisen auf der Roadmap.

Frame-Transaktionen (EIP-8141) sind ebenfalls mit der Implementierung von zkVMs verbunden. Sie können benutzerdefinierte Verifizierungsschemata verwenden, um beweisverifizierte Zustandsübergänge einzureichen. Dies ermöglicht es Apps, private Ausführungsumgebungen anzubieten und den kryptographischen Beweis an das öffentliche Ethereum-Netzwerk zu übermitteln, dass die Aktion korrekt ausgeführt wurde, ohne die Transaktionsdaten selbst preiszugeben.

Zero-Knowledge-Beweise eignen sich hervorragend, um Einzelpersonen den Nachweis zu ermöglichen, dass ihre Daten gültig sind, während sie gleichzeitig privat bleiben. Sie können jedoch nicht ohne Weiteres Smart Contracts verwalten, bei denen mehrere Benutzer gleichzeitig mit einem gemeinsamen Pool geheimer Daten interagieren müssen.

Um diese Lücke zu schließen, integriert die Roadmap von Ethereum **Fully Homomorphic Encryption (FHE)**. FHE ermöglicht es Smart Contracts, Berechnungen direkt auf verschlüsselten Daten auszuführen, ohne die zugrunde liegenden Informationen jemals entschlüsseln oder preisgeben zu müssen. Die Integration von FHE-Bausteinen und spezialisierten kryptographischen Coprozessoren in Ethereum ist unerlässlich für dezentrale Anwendungen, die auf einem gemeinsamen „verborgenen Zustand“ (hidden state) basieren, wie private Automated Market Maker (AMMs), vertrauliche Pools zur Kreditvergabe oder Auktionen mit verdeckten Geboten, bei denen die Eingaben aller interagieren müssen, während sie völlig geheim bleiben.

**Client-seitiges Beweisen (Client-side proving)** macht die Generierung dieser Privatsphäre-Beweise auf alltäglichen Geräten praktikabel. Das Client-Side Proving-Projekt unterhält eine öffentliche Benchmark-Suite, die Beweissysteme und zkVMs auf Consumer-Hardware vergleicht und die Ergebnisse auf [ethproofs.org](https://ethproofs.org) veröffentlicht. Die technische Forschung zielt auf transparente, [Post-Quanten](/roadmap/security/quantum-resistance/)-Beweise mit direkter Onchain-Verifizierung ab, was private Berechnungen schneller, einfacher direkt im Ethereum-Netzwerk zu verifizieren und auf mobilen Geräten realisierbar macht.

Die [**zkID-Initiative**](https://pse.dev/projects/zk-id) hat eine Open-Source-Infrastruktur hervorgebracht, die auf globale Identitäts-Frameworks abgestimmt ist, einschließlich der European Digital Identity (EUDI) Wallet. Das Open Anonymous Credentials (OpenAC)-System bietet Unverknüpfbarkeit (Unlinkability) für ausgestellte Anmeldeinformationen und stellt sicher, dass mehrere Beweise, die von demselben Benutzer auf verschiedenen Plattformen generiert wurden, nicht mit einem einzigen Profil korreliert werden können.

Im Governance-Bereich bietet das [**Minimal Anti-Collusion Infrastructure (MACI)**](https://maci.pse.dev/)-Protokoll **Belegfreiheit (receipt-freeness)**, was es kryptographisch unmöglich macht, zu beweisen, wie ein Konto abgestimmt hat. Da Wähler keinen Beleg vorlegen können, der ihre Wahl zeigt, verlieren Stimmenkauf und Nötigung ihren wirtschaftlichen Anreiz. MACI sichert seit 2020 reale Finanzierungsentscheidungen durch [clr.fund](https://clr.fund/), das Millionen von Dollar an quadratischer Finanzierung für Öffentliche Güter auf Ethereum verteilt hat.

Privatsphäreschonende Abstimmungen schützen bereits echte Wähler in Situationen mit hohem Risiko. [Rarimos Freedom Tool](https://docs.rarimo.com/freedom-tool/) nutzt die Zero-Knowledge-Passverifizierung, um Bürgern zu ermöglichen, ihre Wahlberechtigung nachzuweisen, ohne preiszugeben, wer sie sind. Es hat anonyme Schattenwahlen und Oppositionsumfragen in Ländern wie Russland (die Oppositionsabstimmung [Russia2024](https://rarimo.medium.com/russian-opposition-use-rarimos-freedom-tool-to-launch-surveillance-free-voting-app-0d73ebea5e8a)), Georgien (die Umfrage-App United Space) und dem Iran (das Projekt Iranians Vote) ermöglicht, wo die Sicherheit der Wähler vom kryptographischen Wahlgeheimnis abhängt.

Privates Beweisen ermöglicht auch **Compliance-bewusste Privatsphäre**. Privatsphäre-Lösungen wie Privacy Pools akzeptieren Einzahlungen frei, verlangen aber von den Benutzern, Zero-Knowledge-Beweise zu generieren, dass ihre Gelder sich nicht mit bekannten bösartigen Adressen überschneiden, bevor sie eine Abhebung vornehmen. Das programmierbare Compliance-Modell trennt den Akt der Abschirmung von Transaktionen vom Akt des Nachweises der Einhaltung gesetzlicher Vorschriften, sodass alltägliche Benutzer privat Transaktionen durchführen können, während sie gleichzeitig institutionelle Anforderungen erfüllen.

zkEVMs können diese Compliance-Prüfungen privat ausführen und den regulatorischen Status verifizieren, ohne Transaktionsdetails oder Benutzeridentitäten preiszugeben.

## Aktueller Fortschritt der Roadmap {#current-progress}

Die Richtung der Privatsphäre-Entwicklung auf Ethereum wird eher durch eine ökosystemweite Abstimmung als durch eine einzelne Organisation geprägt. Die Roadmap von [strawmap.org](https://strawmap.org/) sammelt vorgeschlagene Upgrades aus dem gesamten Ökosystem, um zu verfolgen und vorzuschlagen, wo die Community einen Konsens erreicht hat. Forscher der Ethereum Foundation helfen dabei, eine parallele Forschungs- und Entwicklungs-Roadmap im gesamten Forschungsökosystem zu steuern, die sich auf die Weiterentwicklung von Privatsphäre-Tools auf der Zugriffsebene, Identitätsinfrastruktur und Compliance-bewussten Systemen konzentriert. Beide Beispiele spiegeln dieselbe zugrunde liegende Priorität wider, Privatsphäre auf Ethereum strukturell und nicht optional zu machen.

Die Forschung und Entwicklung im Bereich Privatsphäre auf Ethereum erstreckt sich über Dutzende von Teams im gesamten Ökosystem. Die Arbeit an Protokoll-Upgrades, Lösungen auf der Zugriffsebene, Identitätsinfrastruktur und Compliance-bewussten Tools schreitet voran.

**Protokoll-Upgrades**: EIP-8141 (Frame-Transaktionen), EIP-7805 (FOCIL), EIP-8250 (Keyed Nonces) und EIP-8182 (Abgeschirmte Pools auf Protokollebene) befinden sich in aktiver Entwicklung und werden für das [Hegotá-Upgrade](https://forkcast.org/upgrade/hegota/) in Betracht gezogen, das nächste Netzwerk-Upgrade nach [Glamsterdam](/roadmap/glamsterdam/). EIP-8025 (optionale Ausführungsbeweise) und Verkle-Bäume sind ebenfalls für Hegotá vorgesehen und bilden die Grundlage für zkEVM-basierte private Berechnungen im Ethereum Mainnet. Parallel dazu reift die Forschung rund um FHE-Coprozessoren, um verschlüsselte Smart Contracts für mehrere Parteien zu ermöglichen.

**Zugriffsebene**: Die PIR-Forschung schreitet voran, wobei aktive Implementierungen von Infrastrukturteams getestet werden. Das Kohaku Wallet SDK befindet sich als Open-Source-Referenz für privatsphäreschonende Wallets in der Entwicklung.

**Client-seitiges Beweisen**: Teams nutzen aktiv Benchmark-gesteuerte Testergebnisse, um zu optimieren, wie Zero-Knowledge-Beweise auf Standardgeräten ausgeführt werden. Projekte wie Spartan-WHIR treiben sichere, quantenresistente Beweise voran, die leicht direkt im Ethereum-Netzwerk verifiziert werden können. Forschungsinitiativen wie leanVM bieten eine leichtgewichtige zkVM, die darauf ausgelegt ist, mehrere kryptographische Signaturen zu bündeln, wodurch die Datengröße quantensicherer Signaturen um das 250-fache verringert wird, um Platz zu sparen und Netzwerkkosten zu senken.

**Identität und Beweisen**: Die zkID-Initiative entwickelt optimierte Beweisschemata für mobile Geräte. MACI sichert weiterhin Runden für quadratische Finanzierung und DAO-Governance, Tools wie Rarimos Freedom Tool bringen Zero-Knowledge-Abstimmungen in reale Wahlen, und die laufende Forschung zu privatsphäreschonenden Identitätsstandards wird fortgesetzt.

Kein Teil dieser Arbeit ist abgeschlossen. Zeitpläne sind Ziele, keine Garantien, und Ethereums [konsensbasierter Governance-Prozess](/governance/) bedeutet, dass sich die Roadmap ändern kann, wenn die Forschung voranschreitet. Aber der Umfang der aktiven Entwicklung und die Anzahl der Teams, die an Privatsphäre arbeiten, stellen ein klares Bekenntnis dar, Ethereum standardmäßig extraktionsresistent zu machen.

## Weiterführende Literatur {#further-reading}

- [Privatsphäre auf Ethereum](/privacy/)
- [PSE-Roadmap: 2025 und darüber hinaus](https://pse.dev/blog/pse-roadmap-2025)
- [Das Mandat der Ethereum Foundation](/foundation/mandate/)
- [strawmap.org](https://strawmap.org/)
- [Zero-Knowledge-Beweise](/zero-knowledge-proofs/)
- [Dezentrale Identität](/decentralized-identity/)
- [Kohaku-Roadmap](https://notes.ethereum.org/@niard/KohakuRoadmap)
- [Client-Side Proving-Benchmarks](https://ethproofs.org/csp-benchmarks)
- [zkEVM in Zahlen](https://zkevm.ethereum.foundation/)