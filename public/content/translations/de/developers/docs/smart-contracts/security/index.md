---
title: Smart-Contract-Sicherheit
description: "Ein Überblick über die Richtlinien zur Erstellung sicherer Ethereum-Smart-Contracts"
lang: de
---

Smart Contracts sind extrem flexibel und in der Lage, große Mengen an Werten und Daten zu kontrollieren, während sie unveränderliche Logik ausführen, die auf Code basiert, der auf der Blockchain bereitgestellt wird. Dies hat ein lebendiges Ökosystem von vertrauenslosen und dezentralisierten Anwendungen geschaffen, die viele Vorteile gegenüber herkömmlichen Systemen bieten. Sie stellen jedoch auch Gelegenheiten für Angreifer dar, die durch die Ausnutzung von Schwachstellen in Smart Contracts profitieren wollen.

Öffentliche Blockchains wie [Ethereum](/) machen das Problem der Sicherung von Smart Contracts noch komplexer. Bereitgestellter Vertragscode kann _normalerweise_ nicht geändert werden, um Sicherheitslücken zu schließen, während aus Smart Contracts gestohlene Vermögenswerte extrem schwer zu verfolgen und aufgrund der Unveränderlichkeit meist unwiederbringlich sind.

Obwohl die Zahlen variieren, wird geschätzt, dass der Gesamtwert, der aufgrund von Sicherheitsmängeln in Smart Contracts gestohlen wurde oder verloren ging, leicht über 1 Milliarde US-Dollar liegt. Dazu gehören aufsehenerregende Vorfälle wie der [DAO-Hack](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/) (3,6 Millionen gestohlene ETH, nach heutigen Preisen über 1 Milliarde US-Dollar wert), der [Hack der Parity-Mehrfachsignatur-Wallet](https://www.coindesk.com/markets/2017/07/19/30-million-ether-reported-stolen-due-to-parity-wallet-breach) (30 Millionen US-Dollar an Hacker verloren) und das [Problem der eingefrorenen Parity-Wallet](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether) (über 300 Millionen US-Dollar in ETH für immer gesperrt).

Die oben genannten Probleme machen es für Entwickler zwingend erforderlich, Aufwand in die Entwicklung sicherer, robuster und widerstandsfähiger Smart Contracts zu investieren. Smart-Contract-Sicherheit ist eine ernste Angelegenheit, und jeder Entwickler tut gut daran, sich damit vertraut zu machen. Dieser Leitfaden behandelt Sicherheitsüberlegungen für Ethereum-Entwickler und untersucht Ressourcen zur Verbesserung der Smart-Contract-Sicherheit.

## Voraussetzungen {#prerequisites}

Stelle sicher, dass du mit den [Grundlagen der Smart-Contract-Entwicklung](/developers/docs/smart-contracts/) vertraut bist, bevor du dich mit dem Thema Sicherheit befasst.

## Richtlinien für die Erstellung sicherer Ethereum-Smart Contracts {#smart-contract-security-guidelines}

### 1. Entwerfen Sie angemessene Zugriffskontrollen {#design-proper-access-controls}

In Smart Contracts können Funktionen, die als `public` oder `external` markiert sind, von beliebigen extern verwalteten Konten (EOAs) oder Vertragskonten aufgerufen werden. Die Angabe der öffentlichen Sichtbarkeit für Funktionen ist notwendig, wenn Sie möchten, dass andere mit Ihrem Vertrag interagieren. Funktionen, die als `private` markiert sind, können jedoch nur von Funktionen innerhalb des Smart Contracts und nicht von externen Konten aufgerufen werden. Jedem Netzwerk-Teilnehmer Zugriff auf Vertragsfunktionen zu geben, kann Probleme verursachen, insbesondere wenn dies bedeutet, dass jeder sensible Operationen durchführen kann (z. B. das Prägen neuer Token).

Um die unbefugte Nutzung von Smart Contract-Funktionen zu verhindern, ist es notwendig, sichere Zugriffskontrollen zu implementieren. Zugriffskontrollmechanismen beschränken die Möglichkeit, bestimmte Funktionen in einem Smart Contract zu nutzen, auf genehmigte Entitäten, wie z. B. Konten, die für die Verwaltung des Vertrags verantwortlich sind. Das **Ownable-Muster** und die **rollenbasierte Kontrolle** sind zwei nützliche Muster zur Implementierung der Zugriffskontrolle in Smart Contracts:

#### Ownable-Muster {#ownable-pattern}

Beim Ownable-Muster wird während des Vertragserstellungsprozesses eine Adresse als „Eigentümer“ (Owner) des Vertrags festgelegt. Geschützten Funktionen wird ein `OnlyOwner`-Modifikator zugewiesen, der sicherstellt, dass der Vertrag die Identität der aufrufenden Adresse authentifiziert, bevor die Funktion ausgeführt wird. Aufrufe von geschützten Funktionen durch andere Adressen als den Vertragseigentümer werden immer rückgängig gemacht (revert), was unerwünschten Zugriff verhindert.

#### Rollenbasierte Zugriffskontrolle {#role-based-access-control}

Die Registrierung einer einzigen Adresse als `Owner` in einem Smart Contract birgt das Risiko der Zentralisierung und stellt einen Single Point of Failure dar. Wenn die Kontoschlüssel des Eigentümers kompromittiert werden, können Angreifer den entsprechenden Vertrag angreifen. Aus diesem Grund kann die Verwendung eines rollenbasierten Zugriffskontrollmusters mit mehreren administrativen Konten die bessere Option sein.

Bei der rollenbasierten Zugriffskontrolle wird der Zugriff auf sensible Funktionen auf eine Gruppe vertrauenswürdiger Teilnehmer verteilt. Beispielsweise kann ein Konto für das Prägen von Token verantwortlich sein, während ein anderes Konto Upgrades durchführt oder den Vertrag pausiert. Die Dezentralisierung der Zugriffskontrolle auf diese Weise eliminiert Single Points of Failure und reduziert die Vertrauensannahmen für die Benutzer.

##### Verwendung von Mehrfachsignatur-Wallets

Ein weiterer Ansatz zur Implementierung einer sicheren Zugriffskontrolle ist die Verwendung eines [Mehrfachsignatur-Kontos](/developers/docs/smart-contracts/#multisig) zur Verwaltung eines Vertrags. Im Gegensatz zu einem regulären extern verwalteten Konto (EOA) gehören Mehrfachsignatur-Konten mehreren Entitäten und erfordern Signaturen von einer Mindestanzahl von Konten – sagen wir 3 von 5 –, um Transaktionen auszuführen.

Die Verwendung einer Mehrfachsignatur für die Zugriffskontrolle führt eine zusätzliche Sicherheitsebene ein, da Aktionen auf dem Zielvertrag die Zustimmung mehrerer Parteien erfordern. Dies ist besonders nützlich, wenn die Verwendung des Ownable-Musters erforderlich ist, da es für einen Angreifer oder böswilligen Insider schwieriger wird, sensible Vertragsfunktionen für böswillige Zwecke zu manipulieren.

### 2. Verwenden Sie require()-, assert()- und revert()-Anweisungen, um Vertragsoperationen abzusichern {#use-require-assert-revert}

Wie bereits erwähnt, kann jeder öffentliche Funktionen in Ihrem Smart Contract aufrufen, sobald dieser auf der Blockchain bereitgestellt ist. Da Sie nicht im Voraus wissen können, wie externe Konten mit einem Vertrag interagieren werden, ist es ideal, vor der Bereitstellung interne Schutzmaßnahmen gegen problematische Operationen zu implementieren. Sie können korrektes Verhalten in Smart Contracts erzwingen, indem Sie die Anweisungen `require()`, `assert()` und `revert()` verwenden, um Ausnahmen auszulösen und Zustandsänderungen rückgängig zu machen, wenn die Ausführung bestimmte Anforderungen nicht erfüllt.

**`require()`**: `require` wird zu Beginn von Funktionen definiert und stellt sicher, dass vordefinierte Bedingungen erfüllt sind, bevor die aufgerufene Funktion ausgeführt wird. Eine `require`-Anweisung kann verwendet werden, um Benutzereingaben zu validieren, Zustandsvariablen zu überprüfen oder die Identität des aufrufenden Kontos zu authentifizieren, bevor mit einer Funktion fortgefahren wird.

**`assert()`**: `assert()` wird verwendet, um interne Fehler zu erkennen und auf Verletzungen von „Invarianten“ in Ihrem Code zu prüfen. Eine Invariante ist eine logische Behauptung über den Zustand eines Vertrags, die für alle Funktionsausführungen wahr bleiben sollte. Ein Beispiel für eine Invariante ist das maximale Gesamtangebot oder der Saldo eines Token-Vertrags. Die Verwendung von `assert()` stellt sicher, dass Ihr Vertrag niemals einen anfälligen Zustand erreicht, und falls doch, werden alle Änderungen an Zustandsvariablen rückgängig gemacht.

**`revert()`**: `revert()` kann in einer if-else-Anweisung verwendet werden, die eine Ausnahme auslöst, wenn die erforderliche Bedingung nicht erfüllt ist. Der folgende Beispielvertrag verwendet `revert()`, um die Ausführung von Funktionen abzusichern:

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Not enough Ether provided.");
        // Perform the purchase.
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. Testen Sie Smart Contracts und überprüfen Sie die Code-Korrektheit {#test-smart-contracts-and-verify-code-correctness}

Die Unveränderlichkeit von Code, der in der [Ethereum Virtual Machine](/developers/docs/evm/) ausgeführt wird, bedeutet, dass Smart Contracts während der Entwicklungsphase ein höheres Maß an Qualitätsbewertung erfordern. Das ausführliche Testen Ihres Vertrags und die Beobachtung auf unerwartete Ergebnisse wird die Sicherheit erheblich verbessern und Ihre Benutzer langfristig schützen.

Die übliche Methode besteht darin, kleine Unit-Tests mit Mock-Daten zu schreiben, die der Vertrag voraussichtlich von Benutzern erhalten wird. [Unit-Tests](/developers/docs/smart-contracts/testing/#unit-testing) eignen sich gut, um die Funktionalität bestimmter Funktionen zu testen und sicherzustellen, dass ein Smart Contract wie erwartet funktioniert.

Leider sind Unit-Tests isoliert betrachtet nur minimal effektiv zur Verbesserung der Smart Contract-Sicherheit. Ein Unit-Test könnte beweisen, dass eine Funktion für Mock-Daten ordnungsgemäß ausgeführt wird, aber Unit-Tests sind nur so effektiv wie die Tests, die geschrieben werden. Dies macht es schwierig, übersehene Randfälle und Schwachstellen zu erkennen, die die Sicherheit Ihres Smart Contracts gefährden könnten.

Ein besserer Ansatz ist die Kombination von Unit-Tests mit eigenschaftsbasierten Tests, die mittels [statischer und dynamischer Analyse](/developers/docs/smart-contracts/testing/#static-dynamic-analysis) durchgeführt werden. Die statische Analyse stützt sich auf Low-Level-Darstellungen wie [Kontrollflussgraphen](https://en.wikipedia.org/wiki/Control-flow_graph) und [abstrakte Syntaxbäume](https://deepsource.io/glossary/ast/), um erreichbare Programmzustände und Ausführungspfade zu analysieren. Währenddessen führen dynamische Analysetechniken, wie z. B. [Smart Contract Fuzzing](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry), Vertragscode mit zufälligen Eingabewerten aus, um Operationen zu erkennen, die Sicherheitseigenschaften verletzen.

Die [formale Verifizierung](/developers/docs/smart-contracts/formal-verification) ist eine weitere Technik zur Überprüfung von Sicherheitseigenschaften in Smart Contracts. Im Gegensatz zu regulären Tests kann die formale Verifizierung die Fehlerfreiheit in einem Smart Contract schlüssig beweisen. Dies wird erreicht, indem eine formale Spezifikation erstellt wird, die die gewünschten Sicherheitseigenschaften erfasst, und bewiesen wird, dass ein formales Modell der Verträge dieser Spezifikation entspricht.

### 4. Bitten Sie um eine unabhängige Überprüfung Ihres Codes {#get-independent-code-reviews}

Nach dem Testen Ihres Vertrags ist es ratsam, andere zu bitten, den Quellcode auf Sicherheitsprobleme zu überprüfen. Tests werden nicht jeden Fehler in einem Smart Contract aufdecken, aber eine unabhängige Überprüfung erhöht die Wahrscheinlichkeit, Schwachstellen zu entdecken.

#### Audits {#audits}

Die Beauftragung eines Smart Contract-Audits ist eine Möglichkeit, eine unabhängige Code-Überprüfung durchzuführen. Auditoren spielen eine wichtige Rolle dabei, sicherzustellen, dass Smart Contracts sicher und frei von Qualitätsmängeln und Designfehlern sind.

Dennoch sollten Sie vermeiden, Audits als Allheilmittel zu betrachten. Smart Contract-Audits werden nicht jeden Fehler finden und sind hauptsächlich dazu gedacht, eine zusätzliche Überprüfungsrunde zu bieten, die helfen kann, Probleme zu erkennen, die von Entwicklern während der anfänglichen Entwicklung und beim Testen übersehen wurden. Sie sollten auch Best Practices für die Zusammenarbeit mit Auditoren befolgen, wie z. B. die ordnungsgemäße Dokumentation des Codes und das Hinzufügen von Inline-Kommentaren, um den Nutzen eines Smart Contract-Audits zu maximieren.

- [Tipps & Tricks für Smart Contract-Audits](https://twitter.com/tinchoabbate/status/1400170232904400897) - _@tinchoabbate_
- [Machen Sie das Beste aus Ihrem Audit](https://inference.ag/blog/2023-08-14-tips/) - _Inference_

#### Bug-Bounties {#bug-bounties}

Die Einrichtung eines Bug-Bounty-Programms ist ein weiterer Ansatz zur Implementierung externer Code-Überprüfungen. Ein Bug-Bounty ist eine finanzielle Belohnung, die an Personen (normalerweise White-Hat-Hacker) vergeben wird, die Schwachstellen in einer Anwendung entdecken.

Bei richtiger Anwendung geben Bug-Bounties Mitgliedern der Hacker-Community einen Anreiz, Ihren Code auf kritische Fehler zu untersuchen. Ein reales Beispiel ist der „Infinite Money Bug“, der es einem Angreifer ermöglicht hätte, eine unbegrenzte Menge an Ether auf [Optimism](https://www.optimism.io/), einem [Ebene 2](/layer-2/)-Protokoll, das auf Ethereum läuft, zu erstellen. Glücklicherweise [entdeckte ein White-Hat-Hacker den Fehler](https://www.saurik.com/optimism.html) und benachrichtigte das Team, [wobei er eine hohe Auszahlung erhielt](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

Eine nützliche Strategie besteht darin, die Auszahlung eines Bug-Bounty-Programms im Verhältnis zu den auf dem Spiel stehenden Geldern festzulegen. Dieser Ansatz, der als „[skalierendes Bug-Bounty](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)“ beschrieben wird, bietet finanzielle Anreize für Einzelpersonen, Schwachstellen verantwortungsvoll offenzulegen, anstatt sie auszunutzen.

### 5. Befolgen Sie Best Practices bei der Smart Contract-Entwicklung {#follow-smart-contract-development-best-practices}

Die Existenz von Audits und Bug-Bounties entbindet Sie nicht von Ihrer Verantwortung, qualitativ hochwertigen Code zu schreiben. Eine gute Smart Contract-Sicherheit beginnt mit der Befolgung ordnungsgemäßer Design- und Entwicklungsprozesse:

- Speichern Sie den gesamten Code in einem Versionskontrollsystem wie Git

- Nehmen Sie alle Code-Änderungen über Pull-Requests vor

- Stellen Sie sicher, dass Pull-Requests mindestens einen unabhängigen Prüfer haben – wenn Sie alleine an einem Projekt arbeiten, sollten Sie in Erwägung ziehen, andere Entwickler zu finden und Code-Überprüfungen auszutauschen

- Verwenden Sie eine [Entwicklungsumgebung](/developers/docs/frameworks/) zum Testen, Kompilieren und Bereitstellen von Smart Contracts

- Führen Sie Ihren Code durch grundlegende Code-Analyse-Tools wie [Cyfrin Aderyn](https://github.com/Cyfrin/aderyn), Mythril und Slither. Idealerweise sollten Sie dies tun, bevor jeder Pull-Request zusammengeführt wird, und die Unterschiede in der Ausgabe vergleichen

- Stellen Sie sicher, dass Ihr Code fehlerfrei kompiliert wird und der Solidity-Compiler keine Warnungen ausgibt

- Dokumentieren Sie Ihren Code ordnungsgemäß (unter Verwendung von [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)) und beschreiben Sie Details zur Vertragsarchitektur in leicht verständlicher Sprache. Dies erleichtert es anderen, Ihren Code zu prüfen und zu überprüfen.

### 6. Implementieren Sie robuste Notfallwiederherstellungspläne {#implement-disaster-recovery-plans}

Das Entwerfen sicherer Zugriffskontrollen, die Implementierung von Funktionsmodifikatoren und andere Vorschläge können die Smart Contract-Sicherheit verbessern, aber sie können die Möglichkeit böswilliger Exploits nicht ausschließen. Der Aufbau sicherer Smart Contracts erfordert die „Vorbereitung auf den Fehlerfall“ und einen Fallback-Plan, um effektiv auf Angriffe reagieren zu können. Ein ordnungsgemäßer Notfallwiederherstellungsplan umfasst einige oder alle der folgenden Komponenten:

#### Vertrags-Upgrades {#contract-upgrades}

Während Ethereum-Smart Contracts standardmäßig unveränderlich sind, ist es möglich, durch die Verwendung von Upgrade-Mustern ein gewisses Maß an Veränderlichkeit zu erreichen. Das Aktualisieren von Verträgen ist in Fällen erforderlich, in denen ein kritischer Fehler Ihren alten Vertrag unbrauchbar macht und die Bereitstellung neuer Logik die praktikabelste Option ist.

Mechanismen für Vertrags-Upgrades funktionieren unterschiedlich, aber das „Proxy-Muster“ ist einer der beliebtesten Ansätze für das Upgrade von Smart Contracts. [Proxy-Muster](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern) teilen den Zustand und die Logik einer Anwendung auf _zwei_ Verträge auf. Der erste Vertrag (als „Proxy-Vertrag“ bezeichnet) speichert Zustandsvariablen (z. B. Benutzersalden), während der zweite Vertrag (als „Logik-Vertrag“ bezeichnet) den Code zur Ausführung von Vertragsfunktionen enthält.

Konten interagieren mit dem Proxy-Vertrag, der alle Funktionsaufrufe über den Low-Level-Aufruf [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries) an den Logik-Vertrag weiterleitet. Im Gegensatz zu einem regulären Nachrichtenaufruf stellt `delegatecall()` sicher, dass der Code, der an der Adresse des Logik-Vertrags ausgeführt wird, im Kontext des aufrufenden Vertrags ausgeführt wird. Dies bedeutet, dass der Logik-Vertrag immer in den Speicher des Proxys (anstelle seines eigenen Speichers) schreibt und die ursprünglichen Werte von `msg.sender` und `msg.value` erhalten bleiben.

Das Delegieren von Aufrufen an den Logik-Vertrag erfordert das Speichern seiner Adresse im Speicher des Proxy-Vertrags. Daher ist das Upgrade der Vertragslogik nur eine Frage der Bereitstellung eines weiteren Logik-Vertrags und der Speicherung der neuen Adresse im Proxy-Vertrag. Da nachfolgende Aufrufe an den Proxy-Vertrag automatisch an den neuen Logik-Vertrag weitergeleitet werden, hätten Sie den Vertrag „aktualisiert“, ohne den Code tatsächlich zu ändern.

[Mehr zum Upgrade von Verträgen](/developers/docs/smart-contracts/upgrading/).

#### Notstopps {#emergency-stops}

Wie bereits erwähnt, können umfangreiche Audits und Tests unmöglich alle Fehler in einem Smart Contract entdecken. Wenn nach der Bereitstellung eine Schwachstelle in Ihrem Code auftritt, ist das Patchen unmöglich, da Sie den Code, der an der Vertragsadresse ausgeführt wird, nicht ändern können. Außerdem kann die Implementierung von Upgrade-Mechanismen (z. B. Proxy-Muster) Zeit in Anspruch nehmen (sie erfordern oft die Genehmigung verschiedener Parteien), was Angreifern nur mehr Zeit gibt, um mehr Schaden anzurichten.

Die nukleare Option besteht darin, eine „Notstopp“-Funktion zu implementieren, die Aufrufe an anfällige Funktionen in einem Vertrag blockiert. Notstopps umfassen typischerweise die folgenden Komponenten:

1. Eine globale boolesche Variable, die angibt, ob sich der Smart Contract in einem gestoppten Zustand befindet oder nicht. Diese Variable wird beim Einrichten des Vertrags auf `false` gesetzt, ändert sich jedoch auf `true`, sobald der Vertrag gestoppten wird.

2. Funktionen, die bei ihrer Ausführung auf die boolesche Variable verweisen. Solche Funktionen sind zugänglich, wenn der Smart Contract nicht gestoppt ist, und werden unzugänglich, wenn die Notstopp-Funktion ausgelöst wird.

3. Eine Entität, die Zugriff auf die Notstopp-Funktion hat, welche die boolesche Variable auf `true` setzt. Um böswillige Aktionen zu verhindern, können Aufrufe dieser Funktion auf eine vertrauenswürdige Adresse (z. B. den Vertragseigentümer) beschränkt werden.

Sobald der Vertrag den Notstopp aktiviert, sind bestimmte Funktionen nicht mehr aufrufbar. Dies wird erreicht, indem ausgewählte Funktionen in einen Modifikator gewickelt werden, der auf die globale Variable verweist. Unten ist [ein Beispiel](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol), das eine Implementierung dieses Musters in Verträgen beschreibt:

```solidity
// Dieser Code wurde nicht professionell geprüft und macht keine Zusagen über Sicherheit oder Korrektheit. Verwendung auf eigene Gefahr.

contract EmergencyStop {

    bool isStopped = false;

    modifier stoppedInEmergency {
        require(!isStopped);
        _;
    }

    modifier onlyWhenStopped {
        require(isStopped);
        _;
    }

    modifier onlyAuthorized {
        // Hier die Autorisierung von msg.sender prüfen
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // Hier findet die Einzahlungslogik statt
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // Hier findet die Notabhebung statt
    }
}
```

Dieses Beispiel zeigt die grundlegenden Merkmale von Notstopps:

- `isStopped` ist ein boolescher Wert, der zu Beginn als `false` ausgewertet wird und `true` ist, wenn der Vertrag in den Notfallmodus wechselt.

- Die Funktionsmodifikatoren `onlyWhenStopped` und `stoppedInEmergency` überprüfen die Variable `isStopped`. `stoppedInEmergency` wird verwendet, um Funktionen zu steuern, die unzugänglich sein sollten, wenn der Vertrag anfällig ist (z. B. `deposit()`). Aufrufe dieser Funktionen werden einfach rückgängig gemacht.

`onlyWhenStopped` wird für Funktionen verwendet, die während eines Notfalls aufrufbar sein sollten (z. B. `emergencyWithdraw()`). Solche Funktionen können helfen, die Situation zu lösen, daher ihr Ausschluss aus der Liste der „eingeschränkten Funktionen“.

Die Verwendung einer Notstopp-Funktionalität bietet eine effektive Übergangslösung für den Umgang mit schwerwiegenden Schwachstellen in Ihrem Smart Contract. Es erhöht jedoch die Notwendigkeit für Benutzer, darauf zu vertrauen, dass Entwickler sie nicht aus eigennützigen Gründen aktivieren. Zu diesem Zweck sind die Dezentralisierung der Kontrolle über den Notstopp, indem er einem Abstimmungsmechanismus auf der Blockchain, einem Timelock oder der Genehmigung durch ein Mehrfachsignatur-Wallet unterworfen wird, mögliche Lösungen.

#### Ereignisüberwachung {#event-monitoring}

[Ereignisse (Events)](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events) ermöglichen es Ihnen, Aufrufe von Smart Contract-Funktionen zu verfolgen und Änderungen an Zustandsvariablen zu überwachen. Es ist ideal, Ihren Smart Contract so zu programmieren, dass er ein Ereignis ausgibt, wann immer eine Partei eine sicherheitskritische Aktion durchführt (z. B. das Abheben von Geldern).

Das Protokollieren von Ereignissen und deren Off-Chain-Überwachung bietet Einblicke in Vertragsoperationen und hilft bei der schnelleren Entdeckung böswilliger Aktionen. Dies bedeutet, dass Ihr Team schneller auf Hacks reagieren und Maßnahmen ergreifen kann, um die Auswirkungen auf die Benutzer zu mindern, wie z. B. das Pausieren von Funktionen oder die Durchführung eines Upgrades.

Sie können sich auch für ein handelsübliches Überwachungstool entscheiden, das automatisch Warnungen weiterleitet, wann immer jemand mit Ihren Verträgen interagiert. Diese Tools ermöglichen es Ihnen, benutzerdefinierte Warnungen basierend auf verschiedenen Auslösern zu erstellen, wie z. B. Transaktionsvolumen, Häufigkeit von Funktionsaufrufen oder den spezifischen beteiligten Funktionen. Beispielsweise könnten Sie eine Warnung programmieren, die eingeht, wenn der in einer einzigen Transaktion abgehobene Betrag einen bestimmten Schwellenwert überschreitet.

### 7. Entwerfen Sie sichere Governance-Systeme {#design-secure-governance-systems}

Möglicherweise möchten Sie Ihre Anwendung dezentralisieren, indem Sie die Kontrolle über zentrale Smart Contracts an Community-Mitglieder übergeben. In diesem Fall wird das Smart Contract-System ein Governance-Modul enthalten – einen Mechanismus, der es Community-Mitgliedern ermöglicht, administrative Aktionen über ein Governance-System auf der Blockchain zu genehmigen. Beispielsweise kann über einen Vorschlag zum Upgrade eines Proxy-Vertrags auf eine neue Implementierung von Token-Inhabern abgestimmt werden.

Dezentralisierte Governance kann vorteilhaft sein, insbesondere weil sie die Interessen von Entwicklern und Endbenutzern in Einklang bringt. Dennoch können Smart Contract-Governance-Mechanismen neue Risiken einführen, wenn sie falsch implementiert werden. Ein plausibles Szenario ist, wenn ein Angreifer durch die Aufnahme eines [Flash-Loans](/defi/#flash-loans) enorme Stimmrechte (gemessen an der Anzahl der gehaltenen Token) erwirbt und einen böswilligen Vorschlag durchsetzt.

Eine Möglichkeit, Probleme im Zusammenhang mit der Governance auf der Blockchain zu verhindern, ist die [Verwendung eines Timelocks](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/). Ein Timelock verhindert, dass ein Smart Contract bestimmte Aktionen ausführt, bis eine bestimmte Zeitspanne verstrichen ist. Andere Strategien umfassen die Zuweisung eines „Stimmgewichts“ zu jedem Token basierend darauf, wie lange er gesperrt war, oder die Messung der Stimmkraft einer Adresse zu einem historischen Zeitraum (zum Beispiel 2-3 Blöcke in der Vergangenheit) anstelle des aktuellen Blocks. Beide Methoden verringern die Möglichkeit, schnell Stimmrechte anzuhäufen, um Abstimmungen auf der Blockchain zu beeinflussen.

Mehr zum [Entwerfen sicherer Governance-Systeme](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), zu [verschiedenen Abstimmungsmechanismen in DAOs](https://hackernoon.com/governance-is-the-holy-grail-for-daos) und zu [den häufigen DAO-Angriffsvektoren, die DeFi nutzen](https://dacian.me/dao-governance-defi-attacks), in den geteilten Links.

### 8. Reduzieren Sie die Komplexität im Code auf ein Minimum {#reduce-code-complexity}

Traditionelle Softwareentwickler sind mit dem KISS-Prinzip („keep it simple, stupid“) vertraut, das davon abrät, unnötige Komplexität in das Software-Design einzuführen. Dies folgt dem lang gehegten Gedanken, dass „komplexe Systeme auf komplexe Weise scheitern“ und anfälliger für kostspielige Fehler sind.

Die Dinge einfach zu halten, ist beim Schreiben von Smart Contracts von besonderer Bedeutung, da Smart Contracts potenziell große Werte kontrollieren. Ein Tipp zur Erreichung von Einfachheit beim Schreiben von Smart Contracts ist die Wiederverwendung bestehender Bibliotheken, wie z. B. [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/), wo immer dies möglich ist. Da diese Bibliotheken von Entwicklern ausgiebig geprüft und getestet wurden, verringert ihre Verwendung die Wahrscheinlichkeit, Fehler einzuführen, indem neue Funktionen von Grund auf neu geschrieben werden.

Ein weiterer häufiger Ratschlag ist, kleine Funktionen zu schreiben und Verträge modular zu halten, indem die Geschäftslogik auf mehrere Verträge aufgeteilt wird. Das Schreiben von einfacherem Code reduziert nicht nur die Angriffsfläche in einem Smart Contract, sondern erleichtert es auch, über die Korrektheit des Gesamtsystems nachzudenken und mögliche Designfehler frühzeitig zu erkennen.

### 9. Verteidigen Sie sich gegen häufige Smart Contract-Schwachstellen {#mitigate-common-smart-contract-vulnerabilities}

#### Reentrancy (Wiedereintritt) {#reentrancy}

Die EVM erlaubt keine Nebenläufigkeit (Concurrency), was bedeutet, dass zwei an einem Nachrichtenaufruf beteiligte Verträge nicht gleichzeitig ausgeführt werden können. Ein externer Aufruf pausiert die Ausführung und den Speicher des aufrufenden Vertrags, bis der Aufruf zurückkehrt, woraufhin die Ausführung normal fortgesetzt wird. Dieser Prozess kann formal als Übertragung des [Kontrollflusses](https://www.computerhope.com/jargon/c/contflow.htm) an einen anderen Vertrag beschrieben werden.

Obwohl meist harmlos, kann die Übertragung des Kontrollflusses an nicht vertrauenswürdige Verträge Probleme verursachen, wie z. B. Reentrancy. Ein Reentrancy-Angriff tritt auf, wenn ein böswilliger Vertrag in einen anfälligen Vertrag zurückruft, bevor der ursprüngliche Funktionsaufruf abgeschlossen ist. Diese Art von Angriff lässt sich am besten an einem Beispiel erklären.

Betrachten Sie einen einfachen Smart Contract („Victim“), der es jedem ermöglicht, Ether einzuzahlen und abzuheben:

```solidity
// Dieser Contract ist verwundbar. Nicht in der Produktion verwenden

contract Victim {
    mapping (address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
        balances[msg.sender] = 0;
    }
}
```

Dieser Vertrag stellt eine `withdraw()`-Funktion zur Verfügung, um Benutzern das Abheben von zuvor in den Vertrag eingezahltem ETH zu ermöglichen. Bei der Verarbeitung einer Abhebung führt der Vertrag die folgenden Operationen durch:

1. Überprüft das ETH-Guthaben des Benutzers
2. Sendet Gelder an die aufrufende Adresse
3. Setzt ihr Guthaben auf 0 zurück, um zusätzliche Abhebungen durch den Benutzer zu verhindern

Die `withdraw()`-Funktion im `Victim`-Vertrag folgt einem „Checks-Interactions-Effects“-Muster. Sie _überprüft_ (checks), ob die für die Ausführung erforderlichen Bedingungen erfüllt sind (d. h. der Benutzer hat ein positives ETH-Guthaben), und führt die _Interaktion_ (interaction) durch, indem sie ETH an die Adresse des Aufrufers sendet, bevor sie die _Auswirkungen_ (effects) der Transaktion anwendet (d. h. das Guthaben des Benutzers reduziert).

Wenn `withdraw()` von einem extern verwalteten Konto (EOA) aufgerufen wird, wird die Funktion wie erwartet ausgeführt: `msg.sender.call.value()` sendet ETH an den Aufrufer. Wenn jedoch `msg.sender` ein Smart Contract-Konto ist, das `withdraw()` aufruft, wird das Senden von Geldern mit `msg.sender.call.value()` auch den an dieser Adresse gespeicherten Code zur Ausführung auslösen.

Stellen Sie sich vor, dies ist der Code, der an der Vertragsadresse bereitgestellt wird:

```solidity
 contract Attacker {
    function beginAttack() external payable {
        Victim(victim_address).deposit.value(1 ether)();
        Victim(victim_address).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(victim_address).withdraw();
        }
    }
}
```

Dieser Vertrag ist darauf ausgelegt, drei Dinge zu tun:

1. Eine Einzahlung von einem anderen Konto akzeptieren (wahrscheinlich das EOA des Angreifers)
2. 1 ETH in den Victim-Vertrag einzahlen
3. Die 1 ETH abheben, die im Smart Contract gespeichert sind

Daran ist nichts falsch, außer dass `Attacker` eine weitere Funktion hat, die `withdraw()` in `Victim` erneut aufruft, wenn das vom eingehenden `msg.sender.call.value` übrig gebliebene Gas mehr als 40.000 beträgt. Dies gibt `Attacker` die Möglichkeit, wieder in `Victim` einzutreten und mehr Gelder abzuheben, _bevor_ der erste Aufruf von `withdraw` abgeschlossen ist. Der Zyklus sieht so aus:

```solidity
- Attacker's EOA calls `Attacker.beginAttack()` with 1 ETH
- `Attacker.beginAttack()` deposits 1 ETH into `Victim`
- `Attacker` calls `withdraw() in `Victim`
- `Victim` checks `Attacker`’s balance (1 ETH)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function)
- `Attacker` calls `Victim.withdraw()` again (note that `Victim` hasn’t reduced `Attacker`’s balance from the first withdrawal)
- `Victim` checks `Attacker`’s balance (which is still 1 ETH because it hasn’t applied the effects of the first call)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function and allows `Attacker` to reenter the `withdraw` function)
- The process repeats until `Attacker` runs out of gas, at which point `msg.sender.call.value` returns without triggering additional withdrawals
- `Victim` finally applies the results of the first transaction (and subsequent ones) to its state, so `Attacker`’s balance is set to 0
```

Zusammenfassend lässt sich sagen, dass, da das Guthaben des Aufrufers erst auf 0 gesetzt wird, wenn die Funktionsausführung abgeschlossen ist, nachfolgende Aufrufe erfolgreich sein werden und es dem Aufrufer ermöglichen, sein Guthaben mehrmals abzuheben. Diese Art von Angriff kann verwendet werden, um einen Smart Contract von seinen Geldern zu leeren, wie es beim [DAO-Hack 2016](https://www.coindesk.com/learn/understanding-the-dao-attack) geschah. Reentrancy-Angriffe sind auch heute noch ein kritisches Problem für Smart Contracts, wie [öffentliche Auflistungen von Reentrancy-Exploits](https://github.com/pcaversaccio/reentrancy-attacks) zeigen.

##### Wie man Reentrancy-Angriffe verhindert

Ein Ansatz zum Umgang mit Reentrancy ist die Befolgung des [Checks-Effects-Interactions-Musters](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern). Dieses Muster ordnet die Ausführung von Funktionen so an, dass Code, der notwendige Überprüfungen durchführt, bevor er mit der Ausführung fortfährt, an erster Stelle steht, gefolgt von Code, der den Vertragszustand manipuliert, wobei Code, der mit anderen Verträgen oder EOAs interagiert, als letztes kommt.

Das Checks-Effects-Interactions-Muster wird in einer überarbeiteten Version des unten gezeigten `Victim`-Vertrags verwendet:

```solidity
contract NoLongerAVictim {
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
    }
}
```

Dieser Vertrag führt eine _Überprüfung_ (check) des Benutzerguthabens durch, wendet die _Auswirkungen_ (effects) der `withdraw()`-Funktion an (indem das Benutzerguthaben auf 0 zurückgesetzt wird) und fährt fort, die _Interaktion_ (interaction) durchzuführen (Senden von ETH an die Adresse des Benutzers). Dies stellt sicher, dass der Vertrag seinen Speicher vor dem externen Aufruf aktualisiert, wodurch die Reentrancy-Bedingung beseitigt wird, die den ersten Angriff ermöglichte. Der `Attacker`-Vertrag könnte immer noch in `NoLongerAVictim` zurückrufen, aber da `balances[msg.sender]` auf 0 gesetzt wurde, werden zusätzliche Abhebungen einen Fehler auslösen.

Eine weitere Option ist die Verwendung einer gegenseitigen Ausschluss-Sperre (allgemein als „Mutex“ beschrieben), die einen Teil des Zustands eines Vertrags sperrt, bis ein Funktionsaufruf abgeschlossen ist. Dies wird mithilfe einer booleschen Variablen implementiert, die vor der Ausführung der Funktion auf `true` gesetzt wird und nach Abschluss des Aufrufs wieder auf `false` zurückgesetzt wird. Wie im folgenden Beispiel zu sehen ist, schützt die Verwendung eines Mutex eine Funktion vor rekursiven Aufrufen, während der ursprüngliche Aufruf noch verarbeitet wird, wodurch Reentrancy effektiv gestoppt wird.

```solidity
pragma solidity ^0.7.0;

contract MutexPattern {
    bool locked = false;
    mapping(address => uint256) public balances;

    modifier noReentrancy() {
        require(!locked, "Blocked from reentrancy.");
        locked = true;
        _;
        locked = false;
    }
    // Diese Funktion ist durch einen Mutex geschützt, sodass reentrante Aufrufe aus `msg.sender.call` heraus `withdraw` nicht erneut aufrufen können.
    // Die `return`-Anweisung ergibt `true`, wertet aber dennoch die `locked = false`-Anweisung im Modifier aus
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "No balance to withdraw.");

        balances[msg.sender] -= _amount;
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

Sie können auch ein [Pull-Payments](https://docs.openzeppelin.com/contracts/5.x/api/utils#security#PullPayment)-System verwenden, das von Benutzern verlangt, Gelder aus den Smart Contracts abzuheben, anstelle eines „Push-Payments“-Systems, das Gelder an Konten sendet. Dies beseitigt die Möglichkeit, versehentlich Code an unbekannten Adressen auszulösen (und kann auch bestimmte Denial-of-Service-Angriffe verhindern).

#### Integer-Underflows und -Overflows {#integer-underflows-and-overflows}

Ein Integer-Overflow (Überlauf) tritt auf, wenn die Ergebnisse einer arithmetischen Operation außerhalb des akzeptablen Wertebereichs liegen, was dazu führt, dass sie auf den niedrigsten darstellbaren Wert „überrollen“. Beispielsweise kann ein `uint8` nur Werte bis zu 2^8-1=255 speichern. Arithmetische Operationen, die zu Werten über `255` führen, laufen über und setzen `uint` auf `0` zurück, ähnlich wie der Kilometerzähler eines Autos auf 0 zurückgesetzt wird, sobald er den maximalen Kilometerstand (999999) erreicht.

Integer-Underflows (Unterlauf) passieren aus ähnlichen Gründen: Die Ergebnisse einer arithmetischen Operation fallen unter den akzeptablen Bereich. Angenommen, Sie versuchen, `0` in einem `uint8` zu dekrementieren, würde das Ergebnis einfach auf den maximal darstellbaren Wert (`255`) überrollen.

Sowohl Integer-Overflows als auch -Underflows können zu unerwarteten Änderungen an den Zustandsvariablen eines Vertrags führen und eine ungeplante Ausführung zur Folge haben. Unten ist ein Beispiel, das zeigt, wie ein Angreifer einen arithmetischen Überlauf in einem Smart Contract ausnutzen kann, um eine ungültige Operation durchzuführen:

```
pragma solidity ^0.7.6;

// This contract is designed to act as a time vault.
// User can deposit into this contract but cannot withdraw for at least a week.
// User can also extend the wait time beyond the 1 week waiting period.

/*
1. Deploy TimeLock
2. Deploy Attack with address of TimeLock
3. Call Attack.attack sending 1 ether. You will immediately be able to
   withdraw your ether.

What happened?
Attack caused the TimeLock.lockTime to overflow and was able to withdraw
before the 1 week waiting period.
*/

contract TimeLock {
    mapping(address => uint) public balances;
    mapping(address => uint) public lockTime;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
        lockTime[msg.sender] = block.timestamp + 1 weeks;
    }

    function increaseLockTime(uint _secondsToIncrease) public {
        lockTime[msg.sender] += _secondsToIncrease;
    }

    function withdraw() public {
        require(balances[msg.sender] > 0, "Insufficient funds");
        require(block.timestamp > lockTime[msg.sender], "Lock time not expired");

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}

contract Attack {
    TimeLock timeLock;

    constructor(TimeLock _timeLock) {
        timeLock = TimeLock(_timeLock);
    }

    fallback() external payable {}

    function attack() public payable {
        timeLock.deposit{value: msg.value}();
        /*
        if t = current lock time then we need to find x such that
        x + t = 2**256 = 0
        so x = -t
        2**256 = type(uint).max + 1
        so x = type(uint).max + 1 - t
        */
        timeLock.increaseLockTime(
            type(uint).max + 1 - timeLock.lockTime(address(this))
        );
        timeLock.withdraw();
    }
}
```

##### Wie man Integer-Underflows und -Overflows verhindert

Ab Version 0.8.0 lehnt der Solidity-Compiler Code ab, der zu Integer-Underflows und -Overflows führt. Verträge, die mit einer niedrigeren Compiler-Version kompiliert wurden, sollten jedoch entweder Überprüfungen bei Funktionen durchführen, die arithmetische Operationen beinhalten, oder eine Bibliothek (z. B. [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)) verwenden, die auf Underflow/Overflow prüft.

#### Orakel-Manipulation {#oracle-manipulation}

[Orakel](/developers/docs/oracles/) beziehen Off-Chain-Informationen und senden sie auf die Blockchain, damit Smart Contracts sie nutzen können. Mit Orakeln können Sie Smart Contracts entwerfen, die mit Off-Chain-Systemen wie Kapitalmärkten interagieren, was ihre Anwendungsmöglichkeiten erheblich erweitert.

Wenn das Orakel jedoch korrumpiert ist und falsche Informationen auf die Blockchain sendet, werden Smart Contracts basierend auf fehlerhaften Eingaben ausgeführt, was Probleme verursachen kann. Dies ist die Grundlage des „Orakel-Problems“, das sich mit der Aufgabe befasst, sicherzustellen, dass Informationen von einem Blockchain-Orakel genau, aktuell und rechtzeitig sind.

Ein damit verbundenes Sicherheitsproblem ist die Verwendung eines Orakels auf der Blockchain, wie z. B. einer dezentralisierten Börse, um den Spotpreis für einen Vermögenswert zu erhalten. Kreditplattformen in der Branche der [dezentralisierten Finanzen (DeFi)](/defi/) tun dies häufig, um den Wert der Sicherheiten eines Benutzers zu bestimmen und festzulegen, wie viel er leihen kann.

DEX-Preise sind oft genau, was größtenteils Arbitrageuren zu verdanken ist, die die Parität auf den Märkten wiederherstellen. Sie sind jedoch anfällig für Manipulationen, insbesondere wenn das Orakel auf der Blockchain die Vermögenspreise basierend auf historischen Handelsmustern berechnet (wie es normalerweise der Fall ist).

Beispielsweise könnte ein Angreifer den Spotpreis eines Vermögenswerts künstlich in die Höhe treiben, indem er einen Flash-Loan aufnimmt, kurz bevor er mit Ihrem Kreditvertrag interagiert. Die Abfrage des Vermögenspreises bei der DEX würde einen überdurchschnittlich hohen Wert zurückgeben (da die große „Kauforder“ des Angreifers die Nachfrage nach dem Vermögenswert verzerrt), was es ihm ermöglicht, mehr zu leihen, als er sollte. Solche „Flash-Loan-Angriffe“ wurden genutzt, um die Abhängigkeit von Preis-Orakeln bei DeFi-Anwendungen auszunutzen, was Protokolle Millionen an verlorenen Geldern kostete.

##### Wie man Orakel-Manipulation verhindert

Die Mindestanforderung zur [Vermeidung von Orakel-Manipulation](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples) ist die Verwendung eines dezentralisierten Orakel-Netzwerks, das Informationen aus mehreren Quellen abfragt, um Single Points of Failure zu vermeiden. In den meisten Fällen verfügen dezentralisierte Orakel über integrierte kryptoökonomische Anreize, um Orakel-Knoten zu ermutigen, korrekte Informationen zu melden, was sie sicherer macht als zentralisierte Orakel.

Wenn Sie planen, ein Orakel auf der Blockchain nach Vermögenspreisen abzufragen, sollten Sie die Verwendung eines Orakels in Betracht ziehen, das einen zeitgewichteten Durchschnittspreis-Mechanismus (TWAP) implementiert. Ein [TWAP-Orakel](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) fragt den Preis eines Vermögenswerts zu zwei verschiedenen Zeitpunkten ab (die Sie ändern können) und berechnet den Spotpreis basierend auf dem ermittelten Durchschnitt. Die Wahl längerer Zeiträume schützt Ihr Protokoll vor Preismanipulationen, da große, kürzlich ausgeführte Aufträge die Vermögenspreise nicht beeinflussen können.

## Sicherheitsressourcen für Smart Contracts für Entwickler {#smart-contract-security-resources-for-developers}

### Tools zur Analyse von Smart Contracts und zur Überprüfung der Code-Korrektheit {#code-analysis-tools}

- **[Test-Tools und Bibliotheken](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** - _Sammlung von branchenüblichen Tools und Bibliotheken zur Durchführung von Unit-Tests, statischer Analyse und dynamischer Analyse von Smart Contracts._

- **[Tools zur formalen Verifizierung](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** - _Tools zur Überprüfung der funktionalen Korrektheit in Smart Contracts und zur Prüfung von Invarianten._

- **[Audit-Dienste für Smart Contracts](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** - _Liste von Organisationen, die Audit-Dienste für Smart Contracts für Ethereum-Entwicklungsprojekte anbieten._

- **[Bug-Bounty-Plattformen](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** - _Plattformen zur Koordinierung von Bug-Bounties und zur Belohnung der verantwortungsvollen Offenlegung kritischer Schwachstellen in Smart Contracts._

- **[Fork Checker](https://forkchecker.hashex.org/)** - _Ein kostenloses Online-Tool zur Überprüfung aller verfügbaren Informationen bezüglich eines geforkten Vertrags._

- **[ABI Encoder](https://abi.hashex.org/)** - _Ein kostenloser Online-Dienst zur Codierung Ihrer Solidity-Vertragsfunktionen und Konstruktorargumente._

- **[Aderyn](https://github.com/Cyfrin/aderyn)** - _Statischer Analysator für Solidity, der die abstrakten Syntaxbäume (AST) durchläuft, um vermutete Schwachstellen zu lokalisieren und Probleme in einem leicht verständlichen Markdown-Format auszugeben._

### Tools zur Überwachung von Smart Contracts {#smart-contract-monitoring-tools}

- **[Tenderly Real-Time Alerting](https://tenderly.co/monitoring)** - _Ein Tool, um Echtzeit-Benachrichtigungen zu erhalten, wenn ungewöhnliche oder unerwartete Ereignisse bei Ihren Smart Contracts oder Wallets auftreten._

### Tools zur sicheren Verwaltung von Smart Contracts {#smart-contract-administration-tools}

- **[Safe](https://safe.global/)** - _Ein auf Ethereum laufendes Smart Contract Wallet, das eine Mindestanzahl von Personen erfordert, um eine Transaktion zu genehmigen, bevor sie stattfinden kann (M-von-N)._

- **[OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/)** - _Vertragsbibliotheken zur Implementierung administrativer Funktionen, einschließlich Vertragsbesitz, Upgrades, Zugriffskontrollen, Governance, Pausierbarkeit und mehr._

### Audit-Dienste für Smart Contracts {#smart-contract-auditing-services}

- **[ConsenSys Diligence](https://diligence.consensys.io/)** - _Audit-Dienst für Smart Contracts, der Projekten im gesamten Blockchain-Ökosystem hilft, sicherzustellen, dass ihre Protokolle startklar sind und zum Schutz der Benutzer entwickelt wurden._

- **[CertiK](https://www.certik.com/)** - _Blockchain-Sicherheitsunternehmen, das Pionierarbeit beim Einsatz modernster formaler Verifizierungstechnologie für Smart Contracts und Blockchain-Netzwerke leistet._

- **[Trail of Bits](https://www.trailofbits.com/)** - _Cybersicherheitsunternehmen, das Sicherheitsforschung mit einer Angreifermentalität kombiniert, um Risiken zu reduzieren und Code zu stärken._

- **[PeckShield](https://peckshield.com/)** - _Blockchain-Sicherheitsunternehmen, das Produkte und Dienstleistungen für die Sicherheit, den Datenschutz und die Benutzerfreundlichkeit des gesamten Blockchain-Ökosystems anbietet._

- **[QuantStamp](https://quantstamp.com/)** - _Audit-Dienst, der die breite Akzeptanz der Blockchain-Technologie durch Sicherheits- und Risikobewertungsdienste erleichtert._

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)** - _Sicherheitsunternehmen für Smart Contracts, das Sicherheitsaudits für verteilte Systeme anbietet._

- **[Runtime Verification](https://runtimeverification.com/)** - _Sicherheitsunternehmen, das sich auf die formale Modellierung und Verifizierung von Smart Contracts spezialisiert hat._

- **[Hacken](https://hacken.io)** - _Web3-Cybersicherheitsauditor, der einen 360-Grad-Ansatz für die Blockchain-Sicherheit bietet._

- **[Nethermind](https://www.nethermind.io/smart-contract-audits)** - _Audit-Dienste für Solidity und Cairo, die die Integrität von Smart Contracts und die Sicherheit der Benutzer in Ethereum und Starknet gewährleisten._

- **[HashEx](https://hashex.org/)** - _HashEx konzentriert sich auf das Auditing von Blockchains und Smart Contracts, um die Sicherheit von Kryptowährungen zu gewährleisten, und bietet Dienstleistungen wie die Entwicklung von Smart Contracts, Penetrationstests und Blockchain-Beratung an._

- **[Code4rena](https://code4rena.com/)** - _Wettbewerbsorientierte Audit-Plattform, die Sicherheitsexperten für Smart Contracts dazu anregt, Schwachstellen zu finden und dazu beizutragen, Web3 sicherer zu machen._

- **[CodeHawks](https://codehawks.com/)** - _Wettbewerbsorientierte Audit-Plattform, die Audit-Wettbewerbe für Smart Contracts für Sicherheitsforscher veranstaltet._

- **[Cyfrin](https://cyfrin.io)** - _Web3-Sicherheitsunternehmen, das Krypto-Sicherheit durch Produkte und Audit-Dienste für Smart Contracts fördert._

- **[ImmuneBytes](https://immunebytes.com/smart-contract-audit/)** - _Web3-Sicherheitsfirma, die Sicherheitsaudits für Blockchain-Systeme durch ein Team erfahrener Auditoren und erstklassiger Tools anbietet._

- **[Oxorio](https://oxor.io/)** - _Audits für Smart Contracts und Blockchain-Sicherheitsdienste mit Expertise in EVM, Solidity, ZK und Cross-Chain-Technologie für Krypto-Firmen und DeFi-Projekte._

- **[Inference](https://inference.ag/)** - _Sicherheits-Audit-Unternehmen, das sich auf das Auditing von Smart Contracts für EVM-basierte Blockchains spezialisiert hat. Dank seiner erfahrenen Auditoren identifizieren sie potenzielle Probleme und schlagen umsetzbare Lösungen vor, um diese vor der Bereitstellung zu beheben._

### Bug-Bounty-Plattformen {#bug-bounty-platforms}

- **[Immunefi](https://immunefi.com/)** - _Bug-Bounty-Plattform für Smart Contracts und DeFi-Projekte, auf der Sicherheitsforscher Code überprüfen, Schwachstellen offenlegen, bezahlt werden und Krypto sicherer machen._

- **[HackerOne](https://www.hackerone.com/)** - _Plattform für Schwachstellenkoordination und Bug-Bounties, die Unternehmen mit Penetrationstestern und Cybersicherheitsforschern verbindet._

- **[HackenProof](https://hackenproof.com/)** - _Experten-Bug-Bounty-Plattform für Krypto-Projekte (DeFi, Smart Contracts, Wallets, CEX und mehr), auf der Sicherheitsexperten Triage-Dienste anbieten und Forscher für relevante, verifizierte Fehlerberichte bezahlt werden._

-  **[Sherlock](https://www.sherlock.xyz/)** - _Underwriter im Web3 für die Sicherheit von Smart Contracts, mit Auszahlungen für Auditoren, die über Smart Contracts verwaltet werden, um sicherzustellen, dass relevante Fehler fair bezahlt werden._

-  **[CodeHawks](https://www.codehawks.com/)** - _Wettbewerbsorientierte Bug-Bounty-Plattform, auf der Auditoren an Sicherheitswettbewerben und Herausforderungen sowie (bald) an ihren eigenen privaten Audits teilnehmen._

### Publikationen bekannter Schwachstellen und Exploits in Smart Contracts {#common-smart-contract-vulnerabilities-and-exploits}

- **[ConsenSys: Smart Contract Known Attacks](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/)** - _Anfängerfreundliche Erklärung der wichtigsten Vertragsschwachstellen, mit Beispielcode für die meisten Fälle._

- **[SWC Registry](https://swcregistry.io/)** - _Kuratierte Liste von Common Weakness Enumeration (CWE)-Einträgen, die für Ethereum Smart Contracts gelten._

- **[Rekt](https://rekt.news/)** - _Regelmäßig aktualisierte Publikation von hochkarätigen Krypto-Hacks und Exploits, zusammen mit detaillierten Post-Mortem-Berichten._

### Herausforderungen zum Erlernen der Sicherheit von Smart Contracts {#challenges-for-learning-smart-contract-security}

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** - _Kuratierte Liste von Blockchain-Sicherheits-Wargames, Herausforderungen und [Capture The Flag](https://www.webopedia.com/definitions/ctf-event/amp/)-Wettbewerben sowie Lösungsberichten._

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** - _Wargame zum Erlernen der offensiven Sicherheit von DeFi Smart Contracts und zum Aufbau von Fähigkeiten in der Fehlersuche und im Sicherheits-Auditing._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** - _Web3/Solidity-basiertes Wargame, bei dem jedes Level ein Smart Contract ist, der „gehackt“ werden muss._

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** - _Hacking-Herausforderung für Smart Contracts, angesiedelt in einem Fantasy-Abenteuer. Der erfolgreiche Abschluss der Herausforderung gewährt auch Zugang zu einem privaten Bug-Bounty-Programm._

### Best Practices zur Sicherung von Smart Contracts {#smart-contract-security-best-practices}

- **[ConsenSys: Ethereum Smart Contract Security Best Practices](https://consensys.github.io/smart-contract-best-practices/)** - _Umfassende Liste von Richtlinien zur Sicherung von Ethereum Smart Contracts._

- **[Nascent: Simple Security Toolkit](https://github.com/nascentxyz/simple-security-toolkit)** - _Sammlung praktischer, sicherheitsorientierter Leitfäden und Checklisten für die Entwicklung von Smart Contracts._

- **[Solidity Patterns](https://fravoll.github.io/solidity-patterns/)** - _Nützliche Zusammenstellung sicherer Muster und Best Practices für die Smart-Contract-Programmiersprache Solidity._

- **[Solidity Docs: Security Considerations](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** - _Richtlinien zum Schreiben sicherer Smart Contracts mit Solidity._

- **[Smart Contract Security Verification Standard](https://github.com/securing/SCSVS)** - _Vierzehnteilige Checkliste, die erstellt wurde, um die Sicherheit von Smart Contracts für Entwickler, Architekten, Sicherheitsprüfer und Anbieter zu standardisieren._

- **[Learn Smart Contract Security and Auditing](https://updraft.cyfrin.io/courses/security)** - _Ultimativer Kurs für Sicherheit und Auditing von Smart Contracts, erstellt für Smart-Contract-Entwickler, die ihre Sicherheits-Best-Practices verbessern und Sicherheitsforscher werden möchten._

### Tutorials zur Sicherheit von Smart Contracts {#tutorials-on-smart-contract-security}

- [Wie man sichere Smart Contracts schreibt](/developers/tutorials/secure-development-workflow/)

- [Wie man Slither verwendet, um Fehler in Smart Contracts zu finden](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [Wie man Manticore verwendet, um Fehler in Smart Contracts zu finden](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [Sicherheitsrichtlinien für Smart Contracts](/developers/tutorials/smart-contract-security-guidelines/)

- [Wie Sie Ihren Token-Vertrag sicher mit beliebigen Token integrieren](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft - Vollständiger Kurs zu Sicherheit und Auditing von Smart Contracts](https://updraft.cyfrin.io/courses/security)