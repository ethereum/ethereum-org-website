---
title: Sicherheit von Smart Contracts
description: Ein Überblick über die Richtlinien für die Erstellung sicherer Ethereum Smart Contracts
lang: de
---

Smart Contracts sind äußerst flexibel und in der Lage, große Mengen an Werten und Daten zu kontrollieren, während sie eine unveränderliche Logik auf der Grundlage von auf der Blockchain bereitgestelltem Code ausführen. So ist ein lebendiges Ökosystem aus vertrauenswürdigen und dezentralisierten Applikationen entstanden, das viele Vorteile gegenüber den alten Systemen bietet. Sie bieten auch eine Chance für Angreifer, die durch die Ausnutzung von Schwachstellen in Smart Contracts Profit machen wollen.

Öffentliche Blockchains wie Ethereum erschweren das Problem der Sicherung von Smart Contracts zusätzlich. Der Code des veröffentlichten Vertrags _kann in der Regel _ nicht geändert werden, um Sicherheitslücken zu schließen, während die aus Smart Contracts gestohlenen Vermögenswerte aufgrund der Unveränderlichkeit extrem schwer nachzuverfolgen und meist nicht wiederherzustellen sind.

Obwohl die Zahlen variieren, wird geschätzt, dass der Gesamtbetrag des gestohlenen oder verlorenen Werts aufgrund von Sicherheitsmängeln in Smart Contracts weit über 1 Milliarde US-Dollar beträgt. Dies beinhaltet hochkarätige Vorfälle, wie den [DAO-Hack](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/) (3,6 Mio. ETH gestohlen, nach heutigen Preisen über 1 Milliarde US-Dollar wert), den [Parity Multi-Sig Wallet-Hack](https://www.coindesk.com/30-million-ether-reported-stolen-parity-wallet-breach) (30 Mio. US-Dollar von Hackern verloren) und das [Problem mit den eingefrorenen Parity-Wallets](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether) (über 300 Mio. US-Dollar in ETH gesperrt).

Die oben genannten Probleme machen es für Entwickler zwingend erforderlich, in die Entwicklung sicherer, robuster und widerstandsfähiger Smart Contracts zu investieren. Die Sicherheit von Smart Contracts ist eine ernste Angelegenheit, die jeder Entwickler lernen sollte. In diesem Ratgeber werden Sicherheitsüberlegungen für Ethereum-Entwickler behandelt und Ressourcen zur Verbesserung der Smart Contract-Sicherheit vorgestellt.

## Voraussetzungen {#prerequisites}

Stellen Sie sicher, dass Sie mit den [Grundlagen der Smart Contract-Entwicklung](/developers/docs/smart-contracts/) vertraut sind, bevor Sie sich mit der Sicherheit befassen.

## Richtlinien für die Erstellung sicherer Ethereum Smart Contracts {#smart-contract-security-guidelines}

### 1. Gestaltung geeigneter Zugriffskontrollen {#design-proper-access-controls}

Bei Smart Contracts können Funktionen, die als `public` oder `external` markiert sind, von beliebigen extern verwalteten Konten (EOAs) oder Vertragskonten aufgerufen werden. Die Festlegung der öffentlichen Sichtbarkeit von Funktionen ist notwendig, wenn Sie möchten, dass andere Personen mit Ihrem Vertrag interagieren können. Funktionen, die als `private` gekennzeichnet sind, können jedoch nur von Funktionen innerhalb des Smart Contracts aufgerufen werden, nicht von externen Accounts. Jedem Netzwerkteilnehmer Zugang zu Vertragsfunktionen zu gewähren, kann zu Problemen führen, insbesondere wenn dies bedeutet, dass jeder Nutzer sensible Operationen durchführen kann (z. B. das Minting neuer Token).

Um die unbefugte Nutzung von Smart Contract-Funktionen zu verhindern, müssen sichere Zugriffskontrollen implementiert werden. Die Zugriffskontrolle beschränkt die Möglichkeit, bestimmte Funktionen in einem Smart Contract zu nutzen, auf zugelassene Stellen, wie z. B. die für die Verwaltung des Vertrags zuständigen Konten. Das **Ownable-Modell** und **Rollenbasierte Kontrolle** sind zwei Parameter, die für die Implementierung der Zugriffskontrolle in Smart Contracts nützlich sind:

#### Ownable-Modell {#ownable-pattern}

Beim Ownable-Modell wird während der Vertragserstellung eine Adresse als „Eigentümer“ des Vertrags festgelegt. Geschützten Funktionen wird ein `OnlyOwner`-Modifikator zugewiesen, der sicherstellt, dass der Vertrag die Identität der aufrufenden Adresse authentifiziert, bevor die Funktion ausgeführt wird. Aufrufe geschützter Funktionen von anderen Adressen als der des Vertragseigentümers werden immer zurückgewiesen, um unerwünschte Zugriffe zu verhindern.

#### Rollenbasierte Zugriffskontrolle {#role-based-access-control}

Die Registrierung einer einzigen Adresse als `Eigentümer` in einem Smart Contract birgt das Risiko der Zentralisierung und stellt einen einzelnen Ausfallpunkt dar. Wenn die Kontoschlüssel des Eigentümers gefährdet sind, können Angreifer den entsprechenden Vertrag angreifen. Aus diesem Grund kann die Verwendung eines rollenbasierten Zugriffskontrollmusters mit mehreren administrativen Konten eine bessere Option sein.

Bei der rollenbasierten Zugriffskontrolle wird der Zugriff auf sensible Funktionen auf eine Reihe von vertrauenswürdigen Teilnehmern verteilt. So kann beispielsweise ein Konto für das Minting von Token zuständig sein, während ein anderes Konto Upgrades durchführt oder den Vertrag pausiert. Durch diese dezentrale Zugriffskontrolle werden „einzelne Ausfallpunkte“ eliminiert und die Vertrauensvoraussetzungen für Benutzer reduziert.

##### Verwendung von Wallets mit Multi-Signature-Option

Ein weiterer Ansatz für die Implementierung einer sicheren Zugriffskontrolle ist die Verwendung eines [Multi-Signatur-Kontos](/developers/docs/smart-contracts/#multisig) zur Verwaltung eines Vertrags. Im Gegensatz zu einem regulären EOA sind Multi-Signatur-Konten das Eigentum von mehreren Instanzen und erfordern Signaturen von einer Mindestanzahl von Konten, beispielsweise 3 von 5, um Transaktionen auszuführen.

Die Verwendung einer Mehrfachsignatur für die Zugriffskontrolle führt eine zusätzliche Sicherheitsebene ein, da Aktionen auf dem Zielvertrag die Zustimmung von mehreren Parteien erfordern. Dies ist besonders nützlich, wenn die Verwendung der Ownable-Funktion erforderlich ist, da es für einen Angreifer oder einen böswilligen Insider schwieriger ist, sensible Vertragsfunktionen für böswillige Zwecke zu manipulieren.

### 2. Verwenden Sie die Anweisungen require(), assert() und revert(), um Vertragsoperationen zu schützen. {#use-require-assert-revert}

Wie bereits erwähnt, kann jeder Nutzer öffentliche Funktionen in Ihrem Smart Contract aufrufen, sobald dieser auf der Blockchain veröffentlicht wurde. Da Sie nicht im Voraus wissen können, wie externe Konten mit einem Vertrag interagieren werden, ist es ideal, interne Schutzmaßnahmen gegen problematische Funktionen zu implementieren, bevor Sie sie Veröffentlichen. Sie können korrektes Verhalten in Smart Contracts durch die Verwendung der Anweisungen `require()`, `assert()` und `revert()` erzwingen, um Ausnahmen auszulösen und Zustandsänderungen rückgängig zu machen, wenn die Ausführung bestimmte Anforderungen nicht erfüllt.

**`require()`**: `require` werden am Anfang von Funktionen definiert und stellen sicher, dass vordefinierte Bedingungen erfüllt sind, bevor die aufgerufene Funktion ausgeführt wird. Eine `require`-Anweisung kann verwendet werden, um Nutzereingaben zu validieren, Zustandsvariablen zu überprüfen oder die Identität des aufrufenden Accounts zu authentifizieren, bevor eine Funktion ausgeführt wird.

**`assert()`**: `assert()` wird verwendet, um interne Fehler zu erkennen und Verletzungen von „Invarianten“ in Ihrem Code zu überprüfen. Eine Invariante ist eine logische Behauptung über den Zustand eines Vertrags, die für alle Funktionsausführungen gelten soll. Ein Beispiel für eine Invariante ist das maximale Gesamtangebot oder der maximale Saldo eines Token-Vertrags. Die Verwendung von `assert()` stellt sicher, dass Ihr Vertrag niemals einen verwundbaren Zustand erreicht, und falls doch, werden alle Änderungen an den Zustandsvariablen zurückgesetzt.

**`revert()`**: `revert()` kann in einer if-else-Anweisung verwendet werden, die eine Ausnahme auslöst, wenn die erforderliche Bedingung nicht erfüllt ist. Der folgende Mustervertrag verwendet `revert()`, um die Ausführung von Funktionen zu überwachen:

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

### 3. Testen Sie Smart Contracts und überprüfen Sie die Richtigkeit des Codes {#test-smart-contracts-and-verify-code-correctness}

Die Unveränderlichkeit des Codes, der auf der [Ethereum Virtual Machine](/developers/docs/evm/) läuft, bedeutet, dass Smart Contracts ein höheres Maß an Qualitätsbewertung während der Entwicklungsphase erfordern. Wenn Sie Ihren Vertrag ausgiebig testen und auf unerwartete Ergebnisse achten, verbessern Sie die Sicherheit erheblich und schützen Ihre Nutzer auf lange Sicht.

Die übliche Methode besteht darin, kleine Unit-Tests mit Scheindaten zu schreiben, die der Vertrag von den Nutzern erhalten würde. [Unit-Testing](/developers/docs/smart-contracts/testing/#unit-testing) ist gut, um die Funktionalität bestimmter Funktionen zu testen und sicherzustellen, dass ein Smart Contract wie erwartet funktioniert.

Leider sind Unit-Tests für die Verbesserung der Sicherheit von Smart Contracts nur wenig effektiv, wenn sie nur isoliert angewendet werden. Ein Unit-Test kann beweisen, dass eine Funktion bei Mock-Daten korrekt ausgeführt wird, Unit-Tests sind jedoch nur so effektiv wie die Tests, die verfasst werden. Das macht es schwierig, unentdeckte Sonderfälle und Schwachstellen zu erkennen, die die Sicherheit Ihres Smart Contracts gefährden könnten.

Ein besserer Ansatz besteht darin, Unit-Tests mit eigenschaftsbasierten Tests zu kombinieren, die mit [statischer und dynamischer Analyse](/developers/docs/smart-contracts/testing/#static-dynamic-analysis) durchgeführt werden. Die statische Analyse stützt sich auf Low-Level-Darstellungen, wie [Kontrollflussdiagramme](https://en.wikipedia.org/wiki/Control-flow_graph) und [abstrakte Syntaxstrukturen](https://deepsource.io/glossary/ast/), um die erreichbaren Programmzustände und Ausführungspfade zu analysieren. In der Zwischenzeit führen dynamische Analysetechniken wie etwa [Smart Contract Fuzzing](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry) Contract-Code mit zufälligen Eingabewerten aus, um Operationen zu erkennen, die Sicherheitseigenschaften verletzen.

[Die formale Verifizierung](/developers/docs/smart-contracts/formal-verification) ist eine weitere Technik zur Überprüfung der Sicherheitseigenschaften von Smart Contracts. Im Gegensatz zu regulären Tests kann die formale Verifizierung schlüssig beweisen, dass ein Smart Contract keine Fehler enthält. Dies wird erreicht, indem eine formale Spezifikation erstellt wird, die die gewünschten Sicherheitseigenschaften festhält, um dann zu gewährleisten, dass ein Formmodell des Vertrags mit dieser Spezifikation übereinstimmt.

### 4. Bitten Sie um eine unabhängige Überprüfung Ihres Codes {#get-independent-code-reviews}

Nachdem Sie Ihren Vertrag getestet haben, sollten Sie andere bitten, den Quellcode auf Sicherheitsprobleme zu prüfen. Beim Testen werden nicht alle Schwachstellen in einem Smart Contract aufgedeckt, eine unabhängige Überprüfung erhöht jedoch die Wahrscheinlichkeit, dass Schwachstellen entdeckt werden.

#### Audits (Prüfungen) {#audits}

Die Beauftragung eines Smart Contract-Audits ist eine Möglichkeit zur Durchführung einer unabhängigen Code-Überprüfung. Prüfer spielen eine wichtige Rolle, wenn es darum geht sicherzustellen, dass Smart Contracts sicher und frei von Qualitätsmängeln und Planungsfehlern sind.

Dennoch sollten Sie Audits nicht als Wunderwaffe betrachten. Smart Contract-Audits können nicht jeden Fehler aufspüren und sind hauptsächlich dazu gedacht, eine zusätzliche Runde von Überprüfungen durchzuführen, die dazu beitragen können, Probleme zu entdecken, die von den Entwicklern während der anfänglichen Entwicklung und Tests übersehen wurden. Sie sollten auch die Best Practices für die Zusammenarbeit mit Prüfern befolgen, z. B. den Code ordnungsgemäß dokumentieren und Inline-Kommentare hinzufügen, um den Nutzen eines Smart Contract-Audits zu maximieren.

- [Tipps und Tricks zum Smart-Contract-Auditing](https://twitter.com/tinchoabbate/status/1400170232904400897) – _@tinchoabbate_
- [Holen Sie das Beste aus Ihrem Audit heraus](https://inference.ag/blog/2023-08-14-tips/) – _Inference_

#### Aufdecken von Fehlern {#bug-bounties}

Die Einrichtung eines Prämienprogramms für das Aufdecken von Fehlern (Bug Bounty Program) ist ein weiterer Ansatz zur Durchführung externer Codeüberprüfungen. Ein Bug Bounty ist eine finanzielle Belohnung für Personen (in der Regel Whitehat-Hacker), die Schwachstellen in einer Applikation entdecken.

Wenn sie richtig eingesetzt werden, geben Bug Bounties den Mitgliedern der Hacker-Community einen Anreiz, Ihren Code auf kritische Fehler zu untersuchen. Ein reales Beispiel ist der „Infinite Money Bug“, der es einem Angreifer ermöglicht hätte, eine unbegrenzte Menge an Ether auf [Optimism](https://www.optimism.io/), einem [Layer 2](/layer-2/)-Protokoll, das auf Ethereum läuft, zu erzeugen. Glücklicherweise entdeckte ein Whitehat-Hacker [den Fehler](https://www.saurik.com/optimism.html) und meldete ihn dem Team, [und erhielt dafür eine hohe Belohnung](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

Eine sinnvolle Strategie besteht darin, die Auszahlung eines Bug-Bounty-Programms im Verhältnis zur Höhe der auf dem Spiel stehenden Mittel festzulegen. Dieser als „[Skalierung zum Aufdecken von Fehlern](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)“ bezeichnete Ansatz bietet finanzielle Anreize für Einzelpersonen, Schwachstellen verantwortungsbewusst offenzulegen, anstatt sie auszunutzen.

### 5. Befolgen Sie bei der Entwicklung von Smart Contracts die bewährten Methoden {#follow-smart-contract-development-best-practices}

Die Verfügbarkeit von Audits und Bug Bounties entbindet Sie nicht von Ihrer Verantwortung, qualitativ hochwertigen Code zu schreiben. Die Sicherheit von Smart Contracts beginnt mit der Einhaltung geeigneter Planungs- und Entwicklungsprozesse:

- Speichern Sie den gesamten Code in einem Versionskontrollsystem, z. B. Git

- Nehmen Sie alle Codeänderungen über Pull Requests vor

- Stellen Sie sicher, dass Pull-Requests mindestens einen unabhängigen Reviewer haben. Wenn Sie alleine an einem Projekt arbeiten, sollten Sie überlegen, ob Sie nicht andere Entwickler finden und mit diesen Code-Reviews austauschen

- Verwendung einer [Entwicklungsumgebung](/developers/docs/frameworks/) zum Testen, Kompilieren und Bereitstellen von Smart Contracts

- Führen Sie Ihren Code in grundlegenden Code-Analysewerkzeugen wie [Cyfrin Awderyn](https://github.com/Cyfrin/aderyn), Mythril und Slither aus. Idealerweise sollten Sie dies tun, noch bevor eine Pull-Anfrage eingebunden wird, und die Unterschiede in der Ergebnisausgabe vergleichen

- Stellen Sie sicher, dass Ihr Code ohne Fehler kompiliert wird und der Solidity-Compiler keine Warnungen ausgibt

- Dokumentieren Sie Ihren Code ordnungsgemäß (unter Verwendung von [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)) und beschreiben Sie Einzelheiten der Vertragsarchitektur in leicht verständlicher Sprache. Dies erleichtert es anderen, Ihren Code zu überprüfen und zu kontrollieren.

### 6. Umsetzung solider Pläne für die Notfallwiederherstellung {#implement-disaster-recovery-plans}

Die Entwicklung sicherer Zugriffskontrollen, die Implementierung von Funktionsmodifikatoren und andere Vorschläge können die Sicherheit von Smart Contracts verbessern, jedoch können sie die Möglichkeit böswilliger Angriffe nicht ausschließen. Der Aufbau sicherer Smart Contracts erfordert eine „Vorbereitung auf Fehler“ und einen Notfallplan, um wirksam auf Angriffe reagieren zu können. Ein angemessener Notfallwiederherstellungsplan umfasst einige oder alle der folgenden Komponenten:

#### Aktualisierungen von Verträgen {#contract-upgrades}

Obwohl Ethereum Smart Contracts standardmäßig unveränderlich sind, ist es möglich, durch die Verwendung von Upgrade-Mustern einen gewissen Grad an Veränderbarkeit zu erreichen. Die Aktualisierung von Verträgen ist dann erforderlich, wenn ein kritischer Fehler Ihren alten Vertrag unbrauchbar macht und die Einführung einer neuen Logik die sinnvollste Option darstellt.

Die Mechanismen zur Aktualisierung von Verträgen funktionieren unterschiedlich, wobei jedoch das „Proxy-Muster“ einer der beliebtesten Ansätze für die Aktualisierung von Smart Contracts ist. [Proxy-Muster](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern) teilen den Status und die Logik einer Anwendung auf _zwei_ Contracts auf. Der erste Vertrag (ein so genannter „Proxy-Vertrag“) speichert Zustandsvariablen (z. B. Benutzerguthaben), während der zweite Vertrag (ein so genannter „Logik-Vertrag“) den Code für die Ausführung von Vertragsfunktionen enthält.

Konten interagieren mit dem Proxy-Vertrag, der alle Funktionsaufrufe über den [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries) ein Low-Level-Aufruf, an den Logik-Vertrag weiterleitet. Im Gegensatz zu einem normalen Aufruf stellt `delegatecall()` sicher, dass der Code, welcher unter der Adresse des logischen Vertrags läuft, im Kontext des aufrufenden Vertrags ausgeführt wird. Das bedeutet, dass der Logikvertrag immer in den Speicher des Proxys schreibt (anstatt in seinen eigenen Speicher) und die ursprünglichen Werte von `msg.sender` und `msg.value` erhalten bleiben.

Die Übertragung von Aufrufen an den Logikvertrag erfordert die Speicherung seiner Adresse im Speicher des Proxy-Vertrags. Um die Logik des Vertrags zu aktualisieren, muss daher nur ein anderer Logikvertrag eingesetzt und die neue Adresse im Proxy-Vertrag gespeichert werden. Da nachfolgende Aufrufe des Proxy-Vertrags automatisch an den neuen Logik-Vertrag weitergeleitet werden, hätten Sie den Vertrag „aktualisiert“, ohne den Code tatsächlich zu ändern.

[Mehr zum Thema Aktualisieren von Verträgen](/developers/docs/smart-contracts/upgrading/).

#### Notausschalter {#emergency-stops}

Wie bereits erwähnt, können umfangreiche Prüfungen und Tests unmöglich alle Fehler in einem Smart Contract aufdecken. Wenn eine Schwachstelle in Ihrem Code nach der Veröffentlichung auftritt, ist es unmöglich, sie zu beheben, da Sie den Code, der unter der Vertragsadresse läuft, nicht ändern können. Außerdem kann die Implementierung von Upgrade-Mechanismen (z. B. Proxy-Muster) einige Zeit in Anspruch nehmen (sie erfordern oft die Zustimmung verschiedener Parteien), was den Angreifern nur mehr Zeit gibt, um mehr Schaden anzurichten.

Die einzige Möglichkeit besteht darin, eine „Not-Aus“-Funktion zu implementieren, die Aufrufe anfälliger Funktionen in einem Vertrag blockiert. Notausschalter bestehen in der Regel aus den folgenden Komponenten:

1. Eine globale Boolesche Variable, die angibt, ob sich der Smart Contract in einem gestoppten Zustand befindet oder nicht. Diese Variable wird bei der Einrichtung des Vertrags auf `false` gesetzt, schaltet aber auf `true` um, sobald der Vertrag gestoppt wird.

2. Funktionen, die bei ihrer Ausführung auf die boolesche Variable verweisen. Auf diese Funktionen kann zugegriffen werden, wenn der Smart Contract in Betrieb ist, und sie werden unzugänglich, wenn die Notausfunktion ausgelöst wird.

3. Eine Person, die Zugriff auf die Notausfunktion hat, die die Boolesche Variable auf `true` schaltet. Um böswillige Aktionen zu verhindern, kann der Aufruf dieser Funktion auf eine vertrauenswürdige Adresse (z. B. den Vertragsinhaber) beschränkt werden.

Sobald der Vertrag den Notausschalter aktiviert, sind bestimmte Funktionen nicht mehr aufrufbar. Dies wird erreicht, indem die ausgewählten Funktionen in einen Modifikator verpackt werden, der auf die globale Variable verweist. Im Folgenden wird [ein Beispiel](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol) für die Umsetzung dieses Konzepts in einem Vertrag beschrieben:

```solidity
// This code has not been professionally audited and makes no promises about safety or correctness. Use at your own risk.

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
        // Check for authorization of msg.sender here
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // Deposit logic happening here
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // Emergency withdraw happening here
    }
}
```

Dieses Beispiel zeigt die grundlegenden Merkmale von Notstopps:

- `isStopped` ist ein Boolescher Wert, der zu Beginn `false` ergibt und `true`, wenn der Vertrag in den Notfallmodus wechselt.

- Die Funktionsmodifikatoren `onlyWhenStopped` und `stoppedInEmergency` überprüfen die Variable `isStopped`. `stoppedInEmergency` wird verwendet, um Funktionen zu steuern, die nicht zugänglich sein sollten, wenn der Vertrag gefährdet ist (z. B. `deposit()`). Aufrufe dieser Funktionen werden einfach zurückgewiesen.

`onlyWhenStopped` wird für Funktionen verwendet, die in einem Notfall aufrufbar sein sollten (z. B. `emergencyWithdraw()`). Diese Funktionen können zur Lösung des Problems beitragen, weshalb sie nicht in der Liste der „eingeschränkten Funktionen“ aufgeführt sind.

Die Verwendung einer Notstopp-Funktion ist eine wirksame Notlösung für den Umgang mit schwerwiegenden Schwachstellen in Ihrem Smart Contract. Allerdings müssen die Nutzer darauf vertrauen können, dass die Entwickler sie nicht aus eigennützigen Gründen aktivieren. Zu diesem Zweck kann die Kontrolle über den Notstopp dezentralisiert werden, indem er entweder einem On-Chain-Abstimmungsmechanismus, einer Zeitsperre oder der Genehmigung durch eine Multisig-Wallet unterworfen wird.

#### Überwachung von Ereignissen {#event-monitoring}

[Ereignisse](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events) ermöglichen es Ihnen, Aufrufe von Smart Contract-Funktionen zu verfolgen und Änderungen an Zustandsvariablen zu überwachen. Ideal ist es, wenn Sie Ihren Smart Contract so programmieren, dass er immer dann ein Ereignis auslöst, wenn eine Partei eine sicherheitskritische Aktion durchführt (z. B. das Abheben von Guthaben).

Die Protokollierung von Ereignissen und deren Überwachung off-chain bietet Einblicke in Vertragsvorgänge und hilft, böswillige Handlungen schneller zu entdecken. Das bedeutet, dass Ihr Team schneller auf Hacks reagieren und Maßnahmen ergreifen kann, um die Auswirkungen auf die Benutzer zu minimieren, z. B. das Anhalten von Funktionen oder die Durchführung eines Upgrades.

Sie können sich auch für ein handelsübliches Überwachungsprogramm entscheiden, das automatisch Warnmeldungen weiterleitet, sobald jemand mit Ihren Verträgen interagiert. Mit diesen Tools können Sie benutzerdefinierte Warnmeldungen erstellen, die auf verschiedenen Auslösern basieren, z. B. dem Transaktionsvolumen, der Häufigkeit von Funktionsaufrufen oder den spezifischen Funktionen. Sie könnten zum Beispiel eine Warnung programmieren, die eingeht, wenn der in einer einzigen Transaktion abgehobene Betrag einen bestimmten Schwellenwert überschreitet.

### 7. Sichere Governance-Systeme (Verwaltungssysteme) entwerfen {#design-secure-governance-systems}

Vielleicht möchten Sie Ihre Anwendung dezentralisieren, indem Sie die Kontrolle über die wichtigsten Smart Contracts an Community-Mitglieder übergeben. In diesem Fall wird das Smart Contract-System ein Governance-Modul enthalten – einen Mechanismus, der es den Community-Mitgliedern ermöglicht, administrative Maßnahmen über ein On-Chain-Governance-System zu genehmigen. So können die Token-Inhaber beispielsweise über einen Vorschlag abstimmen, einen Proxy-Vertrag auf eine neue Implementierung zu aktualisieren.

Eine dezentrale Verwaltung kann von Vorteil sein, insbesondere weil sie die Interessen von Entwicklern und Endnutzern in Einklang bringt. Dennoch können die Mechanismen zur Steuerung von Smart Contracts bei falscher Umsetzung neue Risiken mit sich bringen. Ein plausibles Szenario ist, dass ein Angreifer durch die Aufnahme eines [Flash-Darlehens](/defi/#flash-loans) enorme Stimmkraft (gemessen an der Anzahl der gehaltenen Token) erlangt und einen böswilligen Vorschlag durchsetzt.

Eine Möglichkeit zur Vermeidung von Problemen im Zusammenhang mit der On-Chain-Governance besteht darin, [eine Zeitsperre zu nutzen](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/). Eine Zeitsperre verhindert, dass ein Smart Contract bestimmte Aktionen ausführt, bis eine bestimmte Zeitspanne verstrichen ist. Andere Strategien bestehen darin, jedem Token ein „Stimmgewicht“ zuzuweisen, das sich danach richtet, wie lange er gesperrt war, oder die Stimmkraft einer Adresse in einem historischen Zeitraum (z. B. 2-3 Blöcke in der Vergangenheit) anstelle des aktuellen Blocks zu messen. Beide Methoden verringern die Möglichkeit, schnell Stimmrechte anzuhäufen, um On-Chain-Abstimmungen zu beeinflussen.

Weitere Informationen zu [der Gestaltung sicherer Governance-Systeme](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), [verschiedenen Abstimmungsmechanismen in DAOs](https://hackernoon.com/governance-is-the-holy-grail-for-daos) und [den gängigen DAO-Angriffsvektoren, die DeFi nutzen](https://dacian.me/dao-governance-defi-attacks), finden Sie unter den geteilten Links.

### 8. Reduzierung der Komplexität des Codes auf ein Minimum {#reduce-code-complexity}

Traditionelle Softwareentwickler sind mit dem KISS-Prinzip („Keep it simple, stupid“) vertraut, das davon abrät, unnötige Komplexität in das Softwaredesign einzubringen. Dies entspricht der seit langem vertretenen Auffassung, dass „komplexe Systeme auf komplexe Weise versagen“ und anfälliger für kostspielige Fehler sind.

Beim Schreiben von Smart Contracts ist es besonders wichtig, die Inhalte einfach zu halten, da Smart Contracts potenziell große Wertbeträge kontrollieren. Ein Tipp zur Vereinfachung beim Schreiben von intelligenten Verträgen ist die Wiederverwendung bestehender Bibliotheken, wie [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/4.x/), wo immer möglich. Da diese Bibliotheken von den Entwicklern ausgiebig geprüft und getestet wurden, verringert sich durch ihre Verwendung die Wahrscheinlichkeit, dass durch das Schreiben neuer Funktionen von Grund auf Fehler eingeführt werden.

Ein weiterer allgemeiner Ratschlag lautet, kleine Funktionen zu schreiben und Verträge modulartig zu halten, indem die Logik auf mehrere Verträge aufgeteilt wird. Das Schreiben von einfacherem Code verringert nicht nur die Angriffsfläche in einem Smart Contract, sondern macht es auch einfacher, Rückschlüsse auf die Korrektheit des Gesamtsystems zu ziehen und mögliche Planungsfehler frühzeitig zu erkennen.

### 9. Schutz vor häufigen Schwachstellen in Smart Contracts {#mitigate-common-smart-contract-vulnerabilities}

#### Wiederholungsangriffe {#reentrancy}

Die EVM erlaubt keine Nebenläufigkeit, was bedeutet, dass zwei Verträge, die an einem Nachrichtenaufruf beteiligt sind, nicht gleichzeitig ausgeführt werden können. Ein externer Aufruf unterbricht die Ausführung und den Speicher des aufrufenden Vertrags, bis der Aufruf erwidert wird, woraufhin die Ausführung normal fortgesetzt wird. Dieser Vorgang kann formal als Übertragung des [Kontrollflusses](https://www.computerhope.com/jargon/c/contflow.htm) auf einen anderen Vertrag beschrieben werden.

Die Übertragung des Kontrollflusses an nicht vertrauenswürdige Verträge ist zwar meist harmlos, kann aber Probleme verursachen, wie z. B. Wiederholungsangriffe. Ein Wiederholungsangriff liegt vor, wenn ein böswilliger Vertrag in einen gefährdeten Vertrag eingreift, bevor der ursprüngliche Funktionsaufruf abgeschlossen ist. Diese Art des Angriffs lässt sich am besten anhand eines Beispiels erklären.

Nehmen wir einen einfachen Smart Contract („Opfer“), der es jedem erlaubt, Ether einzuzahlen und abzuheben:

```solidity
// This contract is vulnerable. Do not use in production

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

Dieser Vertrag stellt eine `withdraw()`-Funktion zur Verfügung, die es den Nutzern ermöglicht, zuvor in den Vertrag eingezahlte ETH abzuheben. Bei der Bearbeitung einer Abhebung führt der Vertrag die folgenden Vorgänge durch:

1. Überprüft das ETH-Guthaben des Nutzers
2. Sendet Guthaben an die anrufende Adresse
3. Setzt das Guthaben auf 0 zurück und verhindert so weitere Abhebungen durch den Nutzer

Die Funktion `withdraw()` im `Victim`-Vertrag folgt einem „Prüfungen-Auswirkungen-Interaktionen“-Modell. Sie _prüft_, ob die für die Ausführung notwendigen Bedingungen erfüllt sind (d. h. der Nutzer hat ein positives ETH-Guthaben) und führt die _Interaktion_ durch, indem sie ETH an die Adresse des Aufrufers sendet, bevor sie die _Auswirkungen_ der Transaktion anwendet (d. h. das Guthaben des Nutzers reduziert).

Wenn `withdraw()` von einem extern betriebenen Konto (EOA) aufgerufen wird, wird die Funktion wie erwartet ausgeführt: `msg.sender.call.value()` sendet ETH an den Aufrufer. Wenn `msg.sender` jedoch ein Smart Contract-Konto ist, welches `withdraw()` aufruft, wird das Senden von Geldmitteln mit `msg.sender.call.value()` auch die Ausführung von Code auslösen, der unter dieser Adresse gespeichert ist.

Stellen Sie sich vor, dass dies der Code ist, der an der Vertragsadresse veröffentlicht wird:

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

1. Eine Einzahlung von einem anderen Konto akzeptieren (wahrscheinlich von der EOA des Angreifers)
2. 1 ETH in den Vertrag des Opfers einzahlen
3. Die im Smart Contract gespeicherten 1 ETH abheben

Hier ist nichts verkehrt, außer dass `Attacker` eine weitere Funktion hat, die `withdraw()` im `Victim` erneut aufruft, wenn das Gas, das vom eingehenden `msg.sender.call.value` übrig bleibt, mehr als 40.000 beträgt. Dies gibt `Attacker` die Möglichkeit, `Victim` erneut zu betreten und mehr Geld abzuheben, _bevor_ der erste Aufruf von `withdraw` abgeschlossen ist. Der Kreislauf sieht folgendermaßen aus:

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

Da das Guthaben des Aufrufers nicht auf 0 gesetzt wird, bevor die Funktion ausgeführt wurde, können nachfolgende Aufrufe erfolgreich sein und dem Aufrufer ermöglichen, sein Guthaben mehrmals abzuheben. Diese Art von Angriff kann genutzt werden, um einem Smart Contract das Kapital zu entziehen, wie es beim [2016 DAO-Hack](https://www.coindesk.com/learn/2016/06/25/understanding-the-dao-attack/) geschehen ist. Wiederholungsangriffe sind auch heute noch ein kritisches Thema für Smart Contracts, wie [öffentliche Auflistungen von Reentrancy-Exploits](https://github.com/pcaversaccio/reentrancy-attacks) zeigen.

##### So verhindert man Wiederholungsangriffe

Ein Ansatz für den Umgang mit Wiederholungsangriffen ist das [Prüfungen-Auswirkungen-Interaktionen-Modell](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern). Dieses Modell ordnet die Ausführung von Funktionen so an, dass Code, der vor der Ausführung notwendige Überprüfungen durchführt, zuerst kommt, gefolgt von Code, der den Vertragsstatus manipuliert, und Code, der mit anderen Verträgen oder EOAs interagiert, als letztes erfolgt.

Das „Prüfungen-Auswirkungen-Interaktionen“-Modell wird in einer überarbeiteten Version des `Victim`-Vertrags verwendet, wie unten gezeigt:

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

Dieser Vertrag führt eine _Überprüfung_ des Guthabens des Nutzers durch, wendet die _Auswirkungen_ der `withdraw()`-Funktion an (indem das Guthaben des Nutzers auf 0 zurückgesetzt wird) und fährt mit der _Interaktion_ (Senden von ETH an die Adresse des Nutzers) fort. Auf diese Weise wird sichergestellt, dass der Vertrag seinen Speicher vor dem externen Aufruf aktualisiert und die Bedingung der Wiederverknüpfung, die den ersten Angriff ermöglichte, beseitigt. Der `Attacker`-Vertrag könnte immer noch zurück in `NoLongerAVictim` aufrufen, aber da `balances[msg.sender]` auf 0 gesetzt wurde, werden zusätzliche Abhebungen einen Fehler auslösen.

Eine andere Möglichkeit ist die Verwendung einer gegenseitigen Ausschlusssperre (allgemein als „Mutex“ bezeichnet), die einen Teil des Vertragsstatus sperrt, bis ein Funktionsaufruf abgeschlossen ist. Dies wird durch eine Boolesche Variable realisiert, die vor der Ausführung der Funktion auf `true` gesetzt wird und nach Beendigung des Aufrufs wieder auf `false` zurückkehrt. Wie im folgenden Beispiel zu sehen ist, schützt die Verwendung einer „Mutex“ eine Funktion vor wiederholten Aufrufen, während der ursprüngliche Aufruf noch in Bearbeitung ist, wodurch Wiederholungsangriffe effektiv verhindert werden.

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
    // This function is protected by a mutex, so reentrant calls from within `msg.sender.call` cannot call `withdraw` again.
    //  The `return` statement evaluates to `true` but still evaluates the `locked = false` statement in the modifier
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "No balance to withdraw.");

        balances[msg.sender] -= _amount;
        bool (success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

Sie können auch ein [Pull-Zahlungssystem](https://docs.openzeppelin.com/contracts/4.x/api/security#PullPayment) verwenden, bei dem die Nutzer Geld von den Smart Contracts abheben müssen, anstelle eines „Push-Zahlungssystems“, das Guthaben an Konten sendet. Dies verhindert die Möglichkeit, unbeabsichtigt Code an unbekannten Adressen auszulösen (und kann auch bestimmte Denial-of-Service-Angriffe verhindern).

#### Integer-Unterläufe und -Überläufe {#integer-underflows-and-overflows}

Ein Integer-Überlauf tritt auf, wenn das Ergebnis einer arithmetischen Operation außerhalb des zulässigen Wertebereichs liegt, so dass es auf den niedrigsten darstellbaren Wert „überläuft“. Zum Beispiel kann ein `uint8` nur Werte bis zu 2^8-1=255 speichern. Arithmetische Operationen, die zu höheren Werten als `255` führen, führen zu einem Überlauf und setzen `uint` auf `0` zurück, ähnlich wie der Kilometerzähler eines Autos auf 0 zurückgesetzt wird, wenn er den maximalen Kilometerstand (999999) erreicht hat.

Integer-Unterläufe treten aus ähnlichen Gründen auf: Die Ergebnisse einer arithmetischen Operation liegen unterhalb des zulässigen Bereichs. Angenommen, Sie versuchen, `0` in einem `uint8` zu dekrementieren, würde das Ergebnis einfach auf den maximal darstellbaren Wert (`255`) übergehen.

Sowohl Integer-Überläufe als auch -Unterläufe können zu unerwarteten Änderungen an den Zustandsvariablen eines Vertrags führen und eine ungeplante Ausführung zur Folge haben. Das folgende Beispiel zeigt, wie ein Angreifer einen arithmetischen Überlauf in einem Smart Contract ausnutzen kann, um eine ungültige Operation durchzuführen:

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

##### Wie man Integer-Unterläufe und -Überläufe verhindert

Ab Version 0.8.0 weist der Solidity-Compiler Code zurück, der zu Integer-Unterläufen und -Überläufen führt. Verträge, die mit einer niedrigeren Compiler-Version kompiliert wurden, sollten jedoch entweder Überprüfungen für Funktionen durchführen, die arithmetische Operationen beinhalten, oder eine Bibliothek (z. B. [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)) verwenden, die auf Unterlauf/Überlauf prüft.

#### Oracle-Manipulation {#oracle-manipulation}

[Oracles](/developers/docs/oracles/) beziehen Off-Chain-Informationen und senden sie on-chain, damit Smart Contracts diese nutzen können. Mit Orakeln können Sie Smart Contracts entwerfen, die mit Off-Chain-Systemen wie z. B. Kapitalmärkten interagieren, was ihre Anwendung erheblich erweitert.

Wenn das Orakel jedoch beschädigt ist und falsche Informationen on-chain sendet, werden Smart Contracts auf der Grundlage falscher Informationen ausgeführt, was zu Problemen führen kann. Dies ist die Grundlage des „Orakelproblems“, bei dem es darum geht sicherzustellen, dass die Informationen aus einem Blockchain-Orakel korrekt, aktuell und zeitnah sind.

Ein damit zusammenhängendes Sicherheitsproblem ist die Verwendung eines On-Chain-Orakels, z. B. einer dezentralen Börse, um den Spotpreis für ein Asset zu ermitteln. Leihplattformen in der [dezentralen Finanzbranche (DeFi)](/defi/) tun dies oft, um den Wert der Beleihungsobjekte eines Nutzers zu ermitteln, anhand derer er bestimmen kann, wie viel er leihen kann.

Die DEX-Preise sind häufig korrekt, was vor allem darauf zurückzuführen ist, dass Arbitrageure die Gleichheit auf den Märkten wiederherstellen. Sie sind jedoch anfällig für Manipulationen, insbesondere wenn das On-Chain-Orakel die Preise von Assets auf der Grundlage historischer Handelsdaten berechnet (was normalerweise der Fall ist).

So könnte ein Angreifer beispielsweise den Spotpreis eines Assets künstlich in die Höhe treiben, indem er einen Blitzkredit aufnimmt, kurz bevor er mit Ihrem Kreditvertrag interagiert. Die Abfrage der DEX nach dem Preis des Assets würde einen höheren als den normalen Wert ergeben (da die große „Kaufbestellung“ des Angreifers die Nachfrage nach dem Asset verzerrt), so dass er mehr Geld leihen kann, als er sollte. Solche „Flash-Darlehensangriffe“ wurden genutzt, um das Vertrauen in Preis-Orakel bei DeFi-Anwendungen auszunutzen, was Protokolle Millionen an verlorenen Guthaben gekostet hat.

##### So verhindert man Orakelmanipulation

Die Mindestanforderung, um [Oracle-Manipulation zu vermeiden](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples), besteht darin, ein dezentrales Oracle-Netzwerk zu verwenden, das Informationen aus mehreren Quellen abfragt, um einzelne Ausfallpunkte zu vermeiden. In den meisten Fällen verfügen dezentrale Orakel über eingebaute kryptoökonomische Anreize, die die Nodes des Orakels dazu bringen, korrekte Informationen zu melden, was sie sicherer macht als zentralisierte Orakel.

Wenn Sie vorhaben, ein On-Chain-Orakel für Asset-Preise abzufragen, sollten Sie ein Orakel verwenden, das einen Mechanismus für zeitgewichtete Durchschnittspreise (TWAP) implementiert. Ein [TWAP-Orakel](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) fragt den Preis eines Assets zu zwei verschiedenen Zeitpunkten ab (die Sie ändern können) und berechnet den Spotpreis auf der Grundlage des erhaltenen Durchschnitts. Die Wahl längerer Zeiträume schützt Ihr Protokoll vor Preismanipulationen, da große Aufträge, die erst kürzlich ausgeführt wurden, keinen Einfluss auf die Preise der Assets haben können.

## Ressourcen zur Sicherheit von Smart Contracts für Entwickler {#smart-contract-security-resources-for-developers}

### Tools für die Analyse von Smart Contracts und die Überprüfung der Korrektheit des Codes {#code-analysis-tools}

- **[Testing-Tools und -Bibliotheken](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** - _Sammlung von branchenüblichen Tools und Bibliotheken zur Durchführung von Unit-Tests, statischer Analyse und dynamischer Analyse von Smart Contracts._

- **[Formale Verifizierungstools](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** - _Tools zur Verifizierung der funktionalen Korrektheit in Smart Contracts und zur Überprüfung von Invarianten._

- **[Smart Contract-Auditing-Dienste](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** - _Liste von Organisationen, die Smart Contract-Auditing-Dienste für Ethereum-Entwicklungsprojekte anbieten._

- **[Plattformen zum Aufdecken von Fehlern](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** - _Plattformen zur Koordinierung des Aufdeckens von Fehlern und zur Belohnung der verantwortungsvollen Offenlegung kritischer Schwachstellen in Smart Contracts._

- **[Fork Checker](https://forkchecker.hashex.org/)** - _Ein kostenloses Tool zur Überprüfung aller verfügbaren Informationen bezüglich Fork-Verträgen._

- **[ABI Encoder](https://abi.hashex.org/)** - _Ein frei nutzbarer Online-Service zum Kodieren Ihrer Solidity-Vertragsfunktionen und Konstruktor-Argumente._

- **[Aderyn](https://github.com/Cyfrin/aderyn)** – _Solidity-Statikanalyse-Tool, das die abstrakten Syntaxbäume (AST) durchläuft, um vermutete Schwachstellen zu identifizieren und Probleme in einem leicht konsumierbaren Markdown-Format auszugeben._

### Tools für die Überwachung von Smart Contracts {#smart-contract-monitoring-tools}

- **[OpenZeppelin Defender Sentinels](https://docs.openzeppelin.com/defender/v1/sentinel)** – _ein Tool zur automatischen Überwachung und Reaktion auf Ereignisse, Funktionen und Transaktionsparameter in Ihren Smart Contracts._v

- **[Tenderly Real-Time Alerting](https://tenderly.co/alerting/)** - _Ein Tool, um Echtzeit-Benachrichtigungen zu erhalten, wenn ungewöhnliche oder unerwartete Ereignisse auf Ihren Smart Contracts oder Wallets auftreten._

### Tools für die sichere Verwaltung von Smart Contracts {#smart-contract-administration-tools}

- **[OpenZeppelin Defender Admin](https://docs.openzeppelin.com/defender/v1/admin)** – _Schnittstelle für die Verwaltung von Smart Contracts, einschließlich Zugriffskontrollen, Upgrades und Pausen._

- **[Safe](https://safe.global/)** - _Smart Contract-Wallet auf Ethereum, die eine Mindestanzahl von Personen benötigt, um eine Transaktion zu genehmigen, bevor sie stattfinden kann (M-of-N)._

- **[OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/4.x/)** - _Vertragsbibliotheken für die Implementierung von Verwaltungsfunktionen, einschließlich Vertragseigentum, Upgrades, Zugriffskontrollen, Governance, Pausierbarkeit und mehr._

### Dienstleistungen zur Prüfung von Smart Contracts {#smart-contract-auditing-services}

- **[ConsenSys Diligence](https://consensys.net/diligence/)** - _Audit-Dienst für Smart Contracts, der Projekten im gesamten Blockchain-Ökosystem dabei hilft sicherzustellen, dass ihre Protokolle zur Veröffentlichung bereit sind und dem Schutz der Nutzer dienen._

- **[CertiK](https://www.certik.com/)** - _Blockchain-Sicherheitsunternehmen, das Pionierarbeit beim Einsatz modernster formaler Verifizierungstechnologie für Smart Contracts und Blockchain-Netzwerke leistet._

- **[Trail of Bits](https://www.trailofbits.com/)** - _Cybersicherheitsunternehmen, das Sicherheitsforschung mit der Mentalität von Angreifern kombiniert, um Risiken zu verringern und Code zu stärken._

- **[PeckShield](https://peckshield.com/)** - _Blockchain-Sicherheitsunternehmen, das Produkte und Dienstleistungen für die Sicherheit, den Datenschutz und die Nutzbarkeit des gesamten Blockchain-Ökosystems bietet._

- **[QuantStamp](https://quantstamp.com/)** - _Audit-Dienst, der die allgemeine Einführung der Blockchain-Technologie durch Sicherheits- und Risikobewertungsdienste erleichtert._

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)** - _Sicherheitsunternehmen für Smart Contracts, das Sicherheitsprüfungen für verteilte Systeme durchführt._

- **[Runtime Verification](https://runtimeverification.com/)** - _Sicherheitsunternehmen, spezialisiert auf die formale Modellierung und Verifizierung von Smart Contracts._

- **[Hacken](https://hacken.io)** - _Web3 Cybersicherheitsauditor mit 360-Grad-Ansatz für die Sicherheit der Blockchain._

- **[](https://nethermind.io/smart-contracts-audits)** - _Solidity und Cairo Audit-Dienste sorgen für Datenintegrität der Smart Contracts und Sicherheit der Nutzer im Ethereum- und Starknet-Ökosystem._

- **[HashEx](https://hashex.org/)** - _HashEx konzentriert sich auf die Prüfung von Blockchain und Smart Contracts, um die Sicherheit von Kryptowährungen zu gewährleisten, und bietet Dienstleistungen wie die Entwicklung von Smart Contracts, Penetrationstests und Blockchain-Beratung._

- **[Code4rena](https://code4rena.com/)** - _Eine wettbewerbsorientierte Plattform, die Anreize für Sicherheitsexperten zum Aufspüren von Schwachstellen bietet, um das Web3 sicherer zu machen._

- **[CodeHawks](https://codehawks.com/)** – _Plattform für Wettbewerbs-Audits, die Wettbewerbe zum Auditing von Smart Contracts für Sicherheitsforscher veranstaltet._

- **[Cyfrin](https://cyfrin.io)** – _Web3-Sicherheits-Kraftwerk, das Krypto-Sicherheit durch Produkte und Smart-Contract-Audit-Dienste fördert._

- **[ImmuneBytes](https://www.immunebytes.com//smart-contract-audit/)** – _Web3-Sicherheitsunternehmen, das Sicherheits-Audits für Blockchain-Systeme durch ein Team erfahrener Prüfer und erstklassige Tools anbietet._

- **[Oxorio](https://oxor.io/)** – _Smart-Contract-Audits und Blockchain-Sicherheitsdienste mit Expertise in EVM, Solidity, ZK und Cross-Chain-Technologien für Krypto-Unternehmen und DeFi-Projekte._

- **[Inference](https://inference.ag/)** – _Sicherheits-Audit-Unternehmen, spezialisiert auf Smart-Contract-Audits für EVM-basierte Blockchains. Dank der fachkundigen Prüfer werden potenzielle Probleme identifiziert und umsetzbare Lösungen vorgeschlagen, um diese Probleme vor der Bereitstellung zu beheben._

### Plattformen zum Aufdecken von Fehlern {#bug-bounty-platforms}

- **[Immunefi](https://immunefi.com/)** - _Bug-Bounty-Plattform für Smart Contracts und DeFi-Projekte, auf der Sicherheitsforscher Code überprüfen, Schwachstellen aufdecken, bezahlt werden und Krypto sicherer machen._

- **[HackerOne](https://www.hackerone.com/)** - _Schwachstellen-Koordinations- und Bug-Bounty-Plattform, die Unternehmen mit Penetrationstestern und Cybersecurity-Forschern zusammenbringt._

- **[HackenProof](https://hackenproof.com/)** - _Experten-Bug-Bounty-Plattform für Krypto-Projekte (DeFi, Smart Contracts, Wallets, CEX und mehr), auf der Sicherheitsexperten Triage-Dienste anbieten und Forscher für relevante, verifizierte Fehlerberichte bezahlt werden._

-  **[Sherlock](https://www.sherlock.xyz/)** – _Underwriter in Web3 für die Sicherheit von Smart Contracts, mit Auszahlungen für Prüfer, die über Smart Contracts verwaltet werden, um sicherzustellen, dass relevante Bugs fair bezahlt werden._

-  **[CodeHawks](https://www.codehawks.com/)** – _Bug-Bounty-Plattform für Wettbewerb, auf der Prüfer an Sicherheitswettbewerben und -herausforderungen sowie (bald) an ihren eigenen privaten Audits teilnehmen können._

### Veröffentlichungen bekannter Schwachstellen und Exploits von Smart Contracts {#common-smart-contract-vulnerabilities-and-exploits}

- **[ConsenSys: Smart Contract Known Attacks](https://consensys.github.io/smart-contract-best-practices/attacks/)** - _Einsteigerfreundliche Erklärung der wichtigsten Vertragsschwachstellen, mit Beispielcode für die meisten Fälle._

- **[SWC Registry](https://swcregistry.io/)** - _Ausgewählte Liste von Common Weakness Enumeration (CWE) Elementen, die auf Ethereum Smart Contracts zutreffen._

- **[Rekt](https://rekt.news/)** - _Regelmäßig aktualisierte Veröffentlichung von hochkarätigen Krypto-Hacks und Exploits, zusammen mit detaillierten Post-Mortem-Berichten._

### Herausforderungen beim Erlernen der Sicherheit von Smart Contracts {#challenges-for-learning-smart-contract-security}

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** - _Ausgewählte Liste von Blockchain Security War Games, Challenges und [Capture The Flag](https://www.webopedia.com/definitions/ctf-event/amp/) Wettbewerben und Lösungsbeschreibungen._

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** - _War Game zum Erlernen der offensiven Sicherheit von DeFi Smart Contracts und zum Aufbau von Fähigkeiten in der Fehlersuche und Sicherheitsprüfung._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** - _Web3/Solidity-basiertes War Game, bei dem jedes Level ein Smart Contract ist, der „gehackt“ werden muss._

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** – _Smart-Contract-Hacking-Herausforderung in einem Fantasy-Abenteuer. Der erfolgreiche Abschluss der Herausforderung bietet außerdem Zugang zu einem privaten Bug-Bounty-Programm._

### Bewährte Praktiken für die Sicherung von Smart Contracts {#smart-contract-security-best-practices}

- **[ConsenSys: Ethereum Smart Contract Security Best Practices](https://consensys.github.io/smart-contract-best-practices/)** - _Umfassende Liste von Richtlinien zur Sicherung von Ethereum Smart Contracts._

- **[Nascent: Simple Security Toolkit](https://github.com/nascentxyz/simple-security-toolkit)** - _Sammlung praktischer, sicherheitsorientierter Anleitungen und Checklisten für die Entwicklung von Smart Contracts._

- **[Solidity Patterns](https://fravoll.github.io/solidity-patterns/)** - _Nützliche Zusammenstellung von sicheren Modellen und Best Practices für die Smart Contract-Programmiersprache Solidity._

- **[Solidity Docs: Security Considerations](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** - _Richtlinien zum Schreiben sicherer Smart Contracts mit Solidity._

- **[Smart Contract Security Verification Standard](https://github.com/securing/SCSVS)** - _Vierzehnteilige Checkliste zur Standardisierung der Sicherheit von Smart Contracts für Entwickler, Architekten, Sicherheitsüberprüfer und Anbieter._

- **[Smart-Contract-Sicherheit und -Auditing erlernen](https://updraft.cyfrin.io/courses/security)** – _der ultimative Kurs für Smart-Contract-Sicherheit und -Auditing, der für Smart-Contract-Entwickler erstellt wurde, die ihre Best Practices zur Sicherheit verbessern und Sicherheitsforscher werden möchten._

### Tutorials zur Sicherheit von Smart Contracts {#tutorials-on-smart-contract-security}

- [So schreibt man sichere Smart Contracts](/developers/tutorials/secure-development-workflow/)

- [So verwenden Sie Slither, um Bugs in Smart Contracts zu finden](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [So finden Sie mit Manticore Fehler in Smart Contract](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [Smart-Contract-Sicherheitsrichtlinien](/developers/tutorials/smart-contract-security-guidelines/)

- [Wie Sie Ihren Token-Vertrag sicher in beliebige Token integrieren](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft – vollständiger Kurs zu Smart-Contract-Sicherheit und -Auditing](https://updraft.cyfrin.io/courses/security)
