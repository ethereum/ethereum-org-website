---
title: Smart Contracts testen
description: "Ein Überblick über Techniken und Überlegungen zum Testen von Ethereum Smart Contracts."
lang: de
---

Öffentliche Blockchains wie Ethereum sind unveränderlich, was es schwierig macht, den Code von Smart Contracts nach der Veröffentlichung zu verändern. [Upgrade-Muster für Verträge](/developers/docs/smart-contracts/upgrading/) zur Durchführung von „virtuellen Upgrades“ existieren, aber deren Implementierung ist schwierig und erfordert sozialen Konsens. Zudem kann ein Upgrade einen Fehler nur beheben, _nachdem_ er entdeckt wurde – wenn ein Angreifer die Schwachstelle zuerst entdeckt, besteht für Ihren Smart Contract das Risiko eines Exploits.

Aus diesen Gründen ist das Testen von Smart Contracts vor dem [Bereitstellen](/developers/docs/smart-contracts/deploying/) auf dem Mainnet eine Mindestanforderung für die [Sicherheit](/developers/docs/smart-contracts/security/). Es gibt viele Techniken zum Testen von Verträgen und zur Bewertung der Korrektheit des Codes. Für welche davon Sie sich entscheiden, hängt von Ihren Anforderungen ab. Nichtsdestotrotz ist eine Test-Suite, die sich aus verschiedenen Werkzeugen und Ansätzen zusammensetzt, ideal für das Aufspüren sowohl kleinerer als auch größerer Sicherheitslücken im Vertragscode.

## Voraussetzungen {#prerequisites}

Auf dieser Seite wird erklärt, wie Smart Contracts vor ihrer Veröffentlichung im Ethereum-Netzwerk getestet werden können. Dabei wird davon ausgegangen, dass Sie mit [Smart Contracts](/developers/docs/smart-contracts/) vertraut sind.

## Was sind Smart-Contract-Tests? {#what-is-smart-contract-testing}

Beim Testen von Smart Contracts wird überprüft, ob der Code eines Smart Contracts wie erwartet funktioniert. Die Tests sind nützlich, um zu prüfen, ob ein bestimmter Smart Contract die Anforderungen an Zuverlässigkeit, Benutzerfreundlichkeit und Sicherheit erfüllt.

Es gibt verschiedene Vorgehensweisen. Für die meisten Testmethoden ist es jedoch erforderlich, einen Smart Contract mit einer kleinen Stichprobe der Daten, die er voraussichtlich verarbeiten soll, auszuführen. Wenn der Vertrag korrekte Ergebnisse für die Beispieldaten liefert, wird davon ausgegangen, dass er ordnungsgemäß funktioniert. Die meisten Testwerkzeuge bieten Ressourcen zum Schreiben und Ausführen von [Testfällen](https://en.m.wikipedia.org/wiki/Test_case), um zu prüfen, ob die Ausführung eines Vertrags mit den erwarteten Ergebnissen übereinstimmt.

### Warum ist es wichtig, Smart Contracts zu testen? {#importance-of-testing-smart-contracts}

Da Smart Contracts oft hochwertige finanzielle Vermögenswerte verwalten, können bereits kleine Programmierfehler zu [massiven Verlusten für die Benutzer](https://rekt.news/leaderboard/) führen und tun dies auch häufig. Gründliches Testen kann jedoch dazu beitragen, Fehler und Probleme im Code eines Smart Contracts frühzeitig zu entdecken und zu beheben, bevor dieser im Mainnet veröffentlicht wird.

Es ist zwar möglich, einen Vertrag zu aktualisieren, wenn ein Bug entdeckt wird, aber Upgrades sind komplex und können bei unsachgemäßer Handhabung zu [Fehlern führen](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Durch die Aktualisierung eines Vertrags wird der Grundsatz der Unveränderlichkeit weiter ausgehebelt. Außerdem ist sie für die Benutzer mit zusätzlichen Vertrauensvorbehalten verbunden. Umgekehrt mindert ein umfassender Plan zum Testen Ihres Vertrags die Sicherheitsrisiken von Smart Contracts und reduziert die Notwendigkeit, nach der Veröffentlichung komplexe Logik-Upgrades durchzuführen.

## Methoden zum Testen von Smart Contracts {#methods-for-testing-smart-contracts}

Methoden zum Testen von Ethereum-Smart-Contracts lassen sich in zwei große Kategorien einteilen: **automatisiertes Testen** und **manuelles Testen**. Automatisierte Tests und manuelle Tests bieten einzigartige Vorteile, es müssen für sie aber auch Kompromisse eingegangen werden. Sie können beide Methoden kombinieren, um einen robusten Plan zur Analyse Ihrer Verträge zu entwerfen.

### Automatisiertes Testen {#automated-testing}

Beim automatisierten Testen werden Werkzeuge eingesetzt, die den Code eines Smart Contracts automatisch auf Fehler bei seiner Ausführung überprüfen. Der Vorteil des automatisierten Testens liegt in der Verwendung von [Skripten](https://www.techtarget.com/whatis/definition/script?amp=1), um die Evaluierung der Vertragsfunktionalitäten zu steuern. Skriptgesteuerte Tests können so geplant werden, dass sie mit minimalen menschlichen Eingriffen wiederholt ausgeführt werden. Dies bedeutet, dass automatisierte Tests effizienter sind als manuelle Testverfahren.

Automatisierte Tests sind vor allem in den folgenden Fällen sinnvoll: bei sich wiederholenden und zeitaufwändigen Tests; wenn sie manuell nur schwer durchführbar sind; bei Anfälligkeit für menschliche Fehler; bei der Bewertung kritischer Vertragsfunktionen. Aber automatisierte Testwerkzeuge können auch Nachteile haben – sie können bestimmte Bugs übersehen und viele [falsch-positive Ergebnisse](https://www.contrastsecurity.com/glossary/false-positive) produzieren. Daher ist es ideal, automatisierte Tests mit manuellen Tests für Smart Contracts zu kombinieren.

### Manuelles Testen {#manual-testing}

Manuelle Tests werden von Menschen durchgeführt, wobei jeder Testfall in Ihrer Test-Suite nacheinander ausgeführt wird, um die Korrektheit eines Smart Contracts zu analysieren. Dies steht im Gegensatz zu automatisierten Tests, bei denen Sie gleichzeitig mehrere isolierte Tests für einen Smart Contract durchführen können und einen Bericht mit allen fehlgeschlagenen und bestandenen Tests erhalten.

Manuelle Tests können von einer einzelnen Person gemäß eines schriftlichen Testplans durchgeführt werden, der verschiedene Testszenarien abdeckt. Im Rahmen manueller Tests können Sie auch mehrere Personen oder Gruppen über einen bestimmten Zeitraum mit einem Smart Contract interagieren lassen. Der Prüfer vergleicht das tatsächliche Verhalten des Smart Contracts mit dem erwarteten Verhalten und kennzeichnet jede Abweichung als Bug.

Effektive manuelle Tests erfordern erhebliche Ressourcen („Fähigkeiten“, „Zeit“, „Geld“ und „Aufwand“) und es kann – aufgrund menschlichen Irrtums – passieren, dass bestimmte Fehler bei der Ausführung von Tests übersehen werden. Aber auch manuelle Tests können von Vorteil sein – so kann ein menschlicher Tester (z. B. ein Auditor) mithilfe seiner Intuition Grenzfälle aufdecken, die ein automatisiertes Testwerkzeug übersehen würde.

## Automatisiertes Testen von Smart Contracts {#automated-testing-for-smart-contracts}

### Unit-Tests {#unit-testing-for-smart-contracts}

Beim Unit-Testing werden die Vertragsfunktionen separat bewertet und die korrekte Funktionsweise jeder Komponente überprüft. Gute Unit-Tests sollten einfach und schnell durchführbar sein und eine klare Vorstellung davon vermitteln, was falsch gelaufen ist, wenn Tests fehlschlagen.

Unit-Tests sind nützlich, um zu prüfen, ob Funktionen die erwarteten Werte zurückgeben und ob der Datenspeicher des Vertrags nach Ausführung der Funktion ordnungsgemäß aktualisiert wird. Darüber hinaus wird durch die Durchführung von Unit-Tests nach Änderungen an der Codebasis eines Vertrags sichergestellt, dass durch das Hinzufügen neuer Logik keine Fehler entstehen. Im Folgenden finden Sie einige Richtlinien für die Durchführung effektiver Unit-Tests:

#### Richtlinien für Unit-Tests von Smart Contracts {#unit-testing-guidelines}

##### 1. Die Geschäftslogik und den Arbeitsablauf Ihrer Smart Contracts verstehen

Bevor Sie Unit-Tests schreiben, ist es hilfreich zu wissen, welche Funktionalitäten ein Smart Contract bietet und wie die Benutzer auf diese Funktionen zugreifen und sie nutzen. Dies ist besonders nützlich für die Durchführung von [Happy-Path-Tests](https://en.m.wikipedia.org/wiki/Happy_path), mit denen festgestellt wird, ob Funktionen in einem Vertrag die richtige Ausgabe für gültige Benutzereingaben zurückgeben. Wir erklären dieses Konzept anhand dieses (gekürzten) Beispiels eines [Auktionsvertrags](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)

```solidity
constructor(
        uint biddingTime,
        address payable beneficiaryAddress
    ) {
        beneficiary = beneficiaryAddress;
        auctionEndTime = block.timestamp + biddingTime;
    }

function bid() external payable {

      if (block.timestamp > auctionEndTime)
            revert AuctionAlreadyEnded();

      if (msg.value <= highestBid)
            revert BidNotHighEnough(highestBid);

 if (highestBid != 0) {
    pendingReturns[highestBidder] += highestBid;
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

 function withdraw() external returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
           pendingReturns[msg.sender] = 0;

        if (!payable(msg.sender).send(amount)) {
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

function auctionEnd() external {
       if (block.timestamp < auctionEndTime)
            revert AuctionNotYetEnded();
        if (ended)
            revert AuctionEndAlreadyCalled();

        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        beneficiary.transfer(highestBid);
    }
}
```

Hierbei handelt es sich um einen einfachen Auktionsvertrag, der für die Entgegennahme von Geboten während der Gebotsfrist entworfen wurde. Wenn das `highestBid` steigt, erhält der vorherige Höchstbietende sein Geld zurück. Sobald die Gebotsfrist vorbei ist, ruft der `beneficiary` den Vertrag auf, um sein Geld zu erhalten.

Unit-Tests für einen Vertrag wie diesen würden verschiedene Funktionen abdecken, die ein Benutzer bei der Interaktion mit dem Vertrag aufrufen könnte. Ein Beispiel wäre ein Unit-Test, der prüft, ob ein Benutzer ein Gebot abgeben kann, während die Auktion läuft (d. h. Aufrufe von `bid()` sind erfolgreich), oder einer, der prüft, ob ein Benutzer ein höheres Gebot als das aktuelle `highestBid` abgeben kann.

Ein Verständnis des operativen Arbeitsablaufs von Verträgen hilft auch beim Schreiben von Unit-Tests, die prüfen, ob die Ausführung den Anforderungen entspricht. Der Auktionsvertrag legt zum Beispiel fest, dass Benutzer keine Gebote abgeben können, sobald die Auktion beendet ist (d. h. wenn `auctionEndTime` niedriger ist als `block.timestamp`). Ein Entwickler könnte also einen Unit-Test durchführen, der prüft, ob Aufrufe der `bid()`-Funktion erfolgreich sind oder fehlschlagen, wenn die Auktion beendet ist (d. h. wenn `auctionEndTime` > `block.timestamp`).

##### 2. Alle Annahmen im Zusammenhang mit der Vertragsausführung bewerten

Es ist wichtig, alle Annahmen über die Ausführung eines Vertrags zu dokumentieren und Unit-Tests zur Überprüfung der Korrektheit dieser Annahmen zu schreiben. Das Testen von Behauptungen bietet nicht nur Schutz vor unerwarteter Ausführung, sondern zwingt Sie auch dazu, über Vorgänge nachzudenken, die das Sicherheitsmodell eines Smart Contracts gefährden könnten. Ein nützlicher Tipp lautet, über „Glückliche-Benutzer-Tests“ hinauszugehen und negative Tests zu schreiben, die prüfen, ob eine Funktion bei falschen Eingaben fehlschlägt.

Viele Unit-Test-Frameworks ermöglichen das Aufstellen von Behauptungen – einfache Aussagen, die angeben, zu was ein Vertrag fähig ist und zu was nicht – und das Ausführen von Tests, um zu sehen, ob diese Behauptungen bei der Ausführung zutreffen. Ein Entwickler, der an dem oben beschriebenen Auktionsvertrag arbeitet, könnte vor der Ausführung negativer Tests die folgenden Behauptungen über sein Verhalten aufstellen:

- Benutzer können keine Gebote abgeben, wenn die Auktion beendet ist oder noch nicht begonnen hat.

- Der Auktionsvertrag bricht ab, wenn ein Gebot unter dem akzeptablen Schwellenwert liegt.

- Benutzer, die den Zuschlag nicht erhalten, bekommen ihr Geld wieder gutgeschrieben.

**Hinweis**: Eine weitere Möglichkeit, Annahmen zu testen, besteht darin, Tests zu schreiben, die [Funktionsmodifikatoren](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers) in einem Vertrag auslösen, insbesondere `require`-, `assert`- und `if…else`-Anweisungen.

##### 3. Codeabdeckung messen

[Codeabdeckung](https://en.m.wikipedia.org/wiki/Code_coverage) ist eine Testmetrik, die die Anzahl der Verzweigungen, Zeilen und Anweisungen in Ihrem Code verfolgt, die während der Tests ausgeführt werden. Tests sollten eine gute Code-Abdeckung haben, um das Risiko ungetesteter Schwachstellen zu minimieren. Ohne ausreichende Abdeckung könntest du fälschlicherweise annehmen, dass dein Vertrag sicher ist, weil alle Tests bestanden werden, während Schwachstellen in ungetesteten Code-Pfaden weiterhin bestehen. Der Nachweis einer hohen Code-Abdeckung gibt jedoch Gewissheit, dass alle Aussagen/Funktionen in einem Smart Contract ausreichend auf ihre Korrektheit getestet wurden.

##### 4. Gut entwickelte Test-Frameworks verwenden

Die Qualität der Werkzeuge, die für die Durchführung von Unit-Tests für Ihre Smart Contracts verwendet werden, ist entscheidend. Ein ideales Test-Framework ist eines, das regelmäßig gepflegt wird, nützliche Funktionen bietet (z. B. Protokollierungs- und Berichtsfunktionen) und von anderen Entwicklern ausgiebig genutzt und geprüft wurde.

Unit-Test-Frameworks für Solidity Smart Contracts liegen in verschiedenen Sprachen vor (hauptsächlich in JavaScript, Python und Rust). In den folgenden Anleitungen finden Sie Informationen darüber, wie Sie Unit-Tests mit verschiedenen Test-Frameworks durchführen können:

- **[Ausführen von Unit-Tests mit Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Ausführen von Unit-Tests mit Foundry](https://book.getfoundry.sh/forge/writing-tests)**
- **[Ausführen von Unit-Tests mit Waffle](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Ausführen von Unit-Tests mit Remix](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Ausführen von Unit-Tests mit Ape](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Ausführen von Unit-Tests mit Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[Ausführen von Unit-Tests mit Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### Integrationstests {#integration-testing-for-smart-contracts}

Bei Unit-Tests wird das Debugging für Vertragsfunktionen isoliert durchgeführt. Mithilfe von Integrationstests hingegen lassen sich die Komponenten eines Smart Contracts als Ganzes bewerten. Integrationstests können Probleme aufdecken, die sich aus vertragsübergreifenden Aufrufen oder Interaktionen zwischen verschiedenen Funktionen im selben Smart Contract ergeben. Integrationstests können beispielsweise dabei helfen zu prüfen, ob Dinge wie [Vererbung](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) und Dependency Injection ordnungsgemäß funktionieren.

Integrationstests sind nützlich, wenn dein Vertrag eine modulare Architektur verwendet oder während der Ausführung mit anderen Onchain-Verträgen interagiert. Eine Möglichkeit, Integrationstests durchzuführen, besteht darin, bei einer bestimmten Höhe einen [Fork der Blockchain zu erstellen](/glossary/#fork) (mit einem Tool wie [Forge](https://book.getfoundry.sh/forge/fork-testing) oder [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks)) und Interaktionen zwischen Ihrem Vertrag und den bereitgestellten Verträgen zu simulieren.

Die abgespaltete Blockchain verhält sich ähnlich wie das Mainnet und verfügt über Konten mit zugehörigen Zuständen und Guthaben. Sie fungiert jedoch nur als lokale Entwicklungsumgebung in einer Sandbox, d. h. Sie benötigen weder echte ETH für Transaktionen noch werden sich Ihre Änderungen auf das tatsächliche Ethereum-Protokoll auswirken.

### Eigenschaftsbasiertes Testen {#property-based-testing-for-smart-contracts}

Beim eigenschaftsbasierten Testen wird geprüft, ob ein Smart Contract eine bestimmte Eigenschaft erfüllt. Eigenschaften geben Fakten über das Verhalten eines Vertrags an, von denen erwartet wird, dass sie in verschiedenen Szenarien wahr bleiben. Ein Beispiel für eine Smart-Contract-Eigenschaft könnte sein: „Bei arithmetischen Operationen im Vertrag darf es niemals zu einem Über- oder Unterlauf kommen.“

**Statische Analyse** und **dynamische Analyse** sind zwei gängige Techniken zur Durchführung von eigenschaftsbasierten Tests. Mit beiden lässt sich verifizieren, dass der Code für ein Programm (in diesem Fall ein Smart Contract) eine vordefinierte Eigenschaft erfüllt. Für einige eigenschaftsbasierte Testwerkzeuge sind vordefinierte Regeln für erwartete Vertragseigenschaften festgelegt. Der Code wird dann anhand dieser Regeln geprüft. Andere Werkzeuge ermöglichen es Ihnen, benutzerdefinierte Eigenschaften für einen Smart Contract zu bestimmen.

#### Statische Analyse {#static-analysis}

Beim statischen Analyseprozess wird der Quellcode eines Smart Contracts als Eingabe verwendet. Die ausgegebenen Ergebnisse erklären, ob ein Vertrag eine Eigenschaft erfüllt oder nicht. Im Gegensatz zur dynamischen Analyse wird bei der statischen Analyse ein Vertrag nicht ausgeführt, um ihn auf seine Korrektheit zu prüfen. Bei der statischen Analyse werden stattdessen alle möglichen Pfade ermittelt, die ein Smart Contract während der Ausführung einschlagen könnte (d. h. sie untersucht die Struktur des Quellcodes, um festzustellen, was diese für den Betrieb des Vertrags während der Laufzeit bedeuten könnte).Laufzeit

[Linting](https://www.perforce.com/blog/qac/what-is-linting) und [statisches Testen](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis) sind gängige Methoden zur Durchführung statischer Analysen von Verträgen. Beide erfordern die Analyse von Low-Level-Darstellungen einer Vertragsausführung, wie z. B. [abstrakten Syntaxbäumen](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree) und [Kontrollflussgraphen](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/), die vom Compiler ausgegeben werden.

In den meisten Fällen ist die statische Analyse nützlich, um Sicherheitsprobleme wie die Verwendung unsicherer Konstrukte, Syntaxfehler oder Verstöße gegen Codierungsstandards in einem Vertragscode zu erkennen. Es ist jedoch bekannt, dass statische Analysen im Allgemeinen nicht dazu geeignet sind, tiefer liegende Schwachstellen zu erkennen, und dass sie zu viele falsch-positive Ergebnisse liefern können.

#### Dynamische Analyse {#dynamic-analysis}

Die dynamische Analyse generiert symbolische Eingaben (z. B. bei der [symbolischen Ausführung](https://en.m.wikipedia.org/wiki/Symbolic_execution)) oder konkrete Eingaben (z. B. beim [Fuzzing](https://owasp.org/www-community/Fuzzing)) für die Funktionen eines Smart Contracts, um zu sehen, ob eine oder mehrere Ausführungsspuren bestimmte Eigenschaften verletzen. Diese Form des eigenschaftsbasierten Testens unterscheidet sich von Unit-Tests dadurch, dass die Testfälle mehrere Szenarien abdecken und ein Programm die Erstellung der Testfälle übernimmt.

[Fuzzing](https://www.halborn.com/blog/post/what-is-fuzz-testing-fuzzing) ist ein Beispiel für eine dynamische Analysetechnik zur Verifizierung beliebiger Eigenschaften in Smart Contracts. Ein Fuzzer ruft Funktionen in einem Zielvertrag mit zufälligen oder missgebildeten Variationen eines definierten Eingabewerts auf. Wenn der Smart Contract in einen Fehlerzustand eintritt (z. B. wenn eine Behauptung fehlschlägt), wird das Problem gekennzeichnet, und die Eingaben, die die Ausführung in Richtung des anfälligen Pfads steuern, werden in einem Bericht aufgeführt.

Fuzzing ist nützlich, um den Mechanismus zur Eingabevalidierung von Smart Contracts zu bewerten, da eine unsachgemäße Handhabung unerwarteter Eingaben eine unbeabsichtigte Ausführung zur Folge und gefährliche Auswirkungen haben kann. Diese Form eigentumsbasierter Tests kann aus vielen Gründen ideal sein:

1. **Das Schreiben von Testfällen, die viele Szenarien abdecken, ist schwierig.** Für einen Eigenschaftstest müssen Sie lediglich ein Verhalten und einen Datenbereich festlegen, mit dem das Verhalten getestet werden soll. Das Programm generiert automatisch Testfälle auf der Grundlage der festgelegten Eigenschaft.

2. **Ihre Test-Suite deckt möglicherweise nicht alle möglichen Pfade innerhalb des Programms ausreichend ab.** Selbst bei einer 100-prozentigen Abdeckung ist es möglich, Grenzfälle zu übersehen.

3. **Unit-Tests beweisen, dass ein Vertrag für Beispieldaten korrekt ausgeführt wird, aber ob der Vertrag auch für Eingaben außerhalb der Stichprobe korrekt ausgeführt wird, bleibt unbekannt.** Eigenschaftstests führen einen Zielvertrag mit mehreren Variationen eines bestimmten Eingabewerts aus, um Ausführungsspuren zu finden, die zu Assertionsfehlern führen. Somit bietet ein Eigenschaftstest mehr Garantien, dass ein Vertrag für eine breite Klasse von Eingabedaten korrekt ausgeführt wird.

### Richtlinien für die Durchführung von eigenschaftsbasierten Tests für Smart Contracts {#running-property-based-tests}

Die Durchführung von eigenschaftsbasierten Tests beginnt in der Regel mit der Definition einer Eigenschaft (z. B. der Abwesenheit von [Ganzzahl-Überläufen](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow)) oder einer Sammlung von Eigenschaften, die Sie in einem Smart Contract überprüfen möchten. Möglicherweise müssen Sie beim Schreiben von Eigenschaftstests auch einen Wertebereich festlegen, innerhalb dessen das Programm Daten für Transaktionseingaben generieren kann.

Sobald das Eigenschafts-Testwerkzeug richtig konfiguriert ist, führt es Ihre Smart-Contract-Funktionen mit zufällig generierten Eingaben aus. Wenn irgendwelche Verstöße gegen Behauptungen vorliegen, sollten Sie einen Bericht mit konkreten Eingabedaten erhalten, die gegen die zu bewertende Eigenschaft verstoßen. In den folgenden Anleitungen finden Sie Informationen für den Einstieg in die Durchführung von eigenschaftsbasierten Tests mit verschiedenen Werkzeugen:

- **[Statische Analyse von Smart Contracts mit Slither](https://github.com/crytic/slither)**
- **[Statische Analyse von Smart Contracts mit Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[Eigenschaftsbasiertes Testen mit Brownie](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Fuzzing von Verträgen mit Foundry](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[Fuzzing von Verträgen mit Echidna](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Fuzzing von Verträgen mit Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[Symbolische Ausführung von Smart Contracts mit Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Symbolische Ausführung von Smart Contracts mit Mythril](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## Manuelles Testen von Smart Contracts {#manual-testing-for-smart-contracts}

Das manuelle Testen von Smart Contracts erfolgt oft erst später im Entwicklungszyklus, nachdem automatisierte Tests durchgeführt wurden. Bei dieser Form des Testens wird der Smart Contract als vollständig integriertes Produkt bewertet, um festzustellen, ob er die in den technischen Anforderungen festgelegten Leistungen erbringt.

### Testen von Verträgen auf einer lokalen Blockchain {#testing-on-local-blockchain}

Automatisierte Tests, die in einer lokalen Entwicklungsumgebung durchgeführt werden, können zwar nützliche Debugging-Informationen liefern. Für Sie ist es allerdings wichtig, zu wissen, wie sich Ihr Smart Contract in einer Produktionsumgebung verhält. Bei einer Veröffentlichung auf dem Ethereum-Mainnet fallen jedoch Gas-Gebühren an – ganz zu schweigen davon, dass Sie oder Ihre Benutzer echtes Geld verlieren können, wenn Ihr Smart Contract noch Fehler aufweist.

Das Testen Ihres Vertrags auf einer lokalen Blockchain (auch als [Entwicklungsnetzwerk](/developers/docs/development-networks/) bezeichnet) ist eine empfohlene Alternative zum Testen auf dem Mainnet. Eine lokale Blockchain ist eine Kopie der Ethereum-Blockchain, die lokal auf Ihrem Computer läuft und das Verhalten der Ausführungsebene von Ethereum simuliert. Dementsprechend können Sie Transaktionen so programmieren, dass sie mit einem Vertrag interagieren, ohne signifikante zusätzliche Kosten zu verursachen.

Die Ausführung von Verträgen auf einer lokalen Blockchain könnte als eine Form manueller Integrationstests nützlich sein. [Smart Contracts sind hochgradig komponierbar](/developers/docs/smart-contracts/composability/), was es Ihnen ermöglicht, sie mit bestehenden Protokollen zu integrieren – Sie müssen jedoch trotzdem sicherstellen, dass solch komplexe Onchain-Interaktionen die korrekten Ergebnisse liefern.

[Mehr über Entwicklungsnetzwerke.](/developers/docs/development-networks/)

### Testen von Verträgen auf Testnets {#testing-contracts-on-testnets}

Ein Testnetzwerk oder Testnet funktioniert genau wie das Ethereum-Mainnet, außer dass es Ether (ETH) verwendet, das keinen realen Wert hat. Das Bereitstellen Ihres Vertrags auf einem [Testnet](/developers/docs/networks/#ethereum-testnets) bedeutet, dass jeder damit interagieren kann (z. B. über das Frontend der Dapp), ohne Gelder zu riskieren.

Diese Form manueller Tests ist nützlich, um den End-to-End-Flow Ihrer Anwendung aus der Sicht des Benutzers zu bewerten. Hier können Beta-Tester auch Testläufe durchführen und etwaige Probleme mit der Geschäftslogik und der Gesamtfunktionalität des Vertrags melden.

Die Veröffentlichung in einem Testnetz nach dem Testen auf einer lokalen Blockchain ist ideal, da Ersteres eher dem Verhalten der Ethereum Virtual Machine entspricht. Daher ist es bei vielen Ethereum-nativen Projekten üblich, DApps in Testnetzen zu veröffentlichen, um so den Betrieb von Smart Contracts unter realen Bedingungen zu simulieren.

[Mehr über Ethereum-Testnets.](/developers/docs/development-networks/#public-beacon-testchains)

## Testen vs. formale Verifizierung {#testing-vs-formal-verification}

Zwar helfen Tests bei der Bestätigung, dass ein Vertrag für einige Dateneingaben die erwarteten Ergebnisse liefert. Sie können jedoch nicht schlüssig beweisen, dass dies auch für Eingaben gilt, die während der Tests nicht verwendet wurden. Das Testen eines Smart Contracts kann daher keine „funktionale Korrektheit“ garantieren (d. h. es kann nicht beweisen, dass sich ein Programm für _alle_ Sätze von Eingabewerten wie erforderlich verhält).

Die formale Verifizierung ist ein Ansatz zur Bewertung der Korrektheit von Software, indem geprüft wird, ob ein formales Modell des Programms mit der formalen Spezifikation übereinstimmt. Ein formales Modell ist eine abstrakte mathematische Darstellung eines Programms, wohingegen eine formale Spezifikation die Eigenschaften eines Programms definiert (d. h. logische Behauptungen über die Ausführung des Programms).

Da die Eigenschaften in mathematischen Begriffen geschrieben sind, ist es möglich, zu verifizieren, ob ein formales (mathematisches) Modell des Systems eine Spezifikation mithilfe logischer Inferenzregeln erfüllt. Daher liefern formale Verifizierungswerkzeuge angeblich einen „mathematischen Beweis“ für die Korrektheit eines Systems.

Im Gegensatz zum Testen kann die formale Verifizierung verwendet werden, um zu überprüfen, ob die Ausführung eines Smart Contracts eine formale Spezifikation für _alle_ Ausführungen erfüllt (d. h. keine Bugs aufweist), ohne sie mit Beispieldaten ausführen zu müssen. Dies reduziert nicht nur den Zeitaufwand für die Durchführung von Dutzenden von Unit-Tests, sondern ist auch effektiver beim Aufspüren versteckter Schwachstellen. Abgesehen davon liegen die formalen Verifizierungstechniken auf einem Spektrum, das sich nach der erforderlichen Rechenleistung der Implementierung und ihrer Nützlichkeit richtet.

[Mehr zur formalen Verifizierung von Smart Contracts.](/developers/docs/smart-contracts/formal-verification)

## Testen vs. Audits und Bug-Bounties {#testing-vs-audits-bug-bounties}

Wie bereits erwähnt, können strenge Tests nur selten das Fehlen von Bugs in einem Vertrag garantieren. Formale Verifizierungsansätze können eine stärkere Garantie für die Korrektheit bieten, sind aber derzeit schwierig anzuwenden und mit erheblichen Kosten verbunden.

Dennoch können Sie die Wahrscheinlichkeit weiter erhöhen, dass Schwachstellen im Vertrag entdeckt werden, indem Sie eine unabhängige Code-Prüfung durchführen lassen. [Smart-Contract-Audits](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/) und [Bug-Bounties](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7) sind zwei Möglichkeiten, um Ihre Verträge von anderen analysieren zu lassen.

Die Audits werden von Auditoren durchgeführt, die erfahren darin sind, Sicherheitslücken und schlechte Entwicklungspraktiken in Smart Contracts aufzudecken. Ein Audit umfasst in der Regel Tests (und möglicherweise eine formale Verifizierung) sowie eine manuelle Überprüfung der gesamten Codebasis.

Umgekehrt beinhaltet ein Bug-Bounty-Programm in der Regel das Anbieten einer finanziellen Belohnung für eine Person (allgemein als [White-Hat-Hacker](https://en.wikipedia.org/wiki/White_hat_\(computer_security\)>) beschrieben), die eine Schwachstelle in einem Smart Contract entdeckt und sie den Entwicklern offenlegt. Bug-Kopfgeld ähnelt insofern Audits, da seine Funktionsweise mit einschließt, dass andere gebeten werden, bei der Suche nach Fehlern in Smart Contracts zu helfen.

Der Hauptunterschied besteht darin, dass Bug-Kopfgeld-Programme der breiteren Entwickler-/Hacker-Community offenstehen und eine breite Klasse von ethischen Hackern und unabhängigen Sicherheitsexperten mit einzigartigen Fähigkeiten und einzigartiger Erfahrung ansprechen. Dies kann ein Vorteil gegenüber Audits von Smart Contracts sein, die sich hauptsächlich auf Teams stützen, die möglicherweise nur über begrenzte oder eingeschränkte Fachkenntnisse verfügen.

## Testwerkzeuge und -bibliotheken {#testing-tools-and-libraries}

### Unit-Test-Werkzeuge {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** – _Code-Abdeckungs-Tool für in Solidity geschriebene Smart Contracts._

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** – _Framework für die fortgeschrittene Entwicklung und das Testen von Smart Contracts (basiert auf ethers.js)_.

- **[Remix Tests](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** – _Tool zum Testen von Solidity Smart Contracts._ Arbeitet unter dem Remix IDE „Solidity Unit Testing“-Plug-in, das zum Schreiben und Ausführen von Testfällen für einen Vertrag verwendet wird._

- **[OpenZeppelin Test Helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** – _Assertionsbibliothek für das Testen von Ethereum Smart Contracts._ Stellen Sie sicher, dass sich Ihre Verträge wie erwartet verhalten!_

- **[Brownie Unit-Testing-Framework](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** - _Brownie nutzt Pytest, ein funktionsreiches Testframework, mit dem Sie kleine Tests mit minimalem Code schreiben können, das gut für große Projekte skaliert und in hohem Maße erweiterbar ist._

- **[Foundry Tests](https://github.com/foundry-rs/foundry/tree/master/crates/forge)** – _Foundry bietet mit Forge ein schnelles und flexibles Ethereum-Testframework an, das einfache Unit-Tests, Gas-Optimierungsprüfungen und Vertrags-Fuzzing durchführen kann._

- **[Hardhat Tests](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** – _Framework zum Testen von Smart Contracts, basierend auf ethers.js, Mocha und Chai._

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** – _Python-basiertes Entwicklungs- und Testframework für Smart Contracts, die auf die Ethereum Virtual Machine abzielen._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** – _Python-basiertes Framework für Unit-Tests und Fuzzing mit starken Debugging-Funktionen und Cross-Chain-Testunterstützung, das Pytest und Anvil für die beste Benutzererfahrung und Leistung nutzt._

### Eigenschaftsbasierte Testwerkzeuge {#property-based-testing-tools}

#### Werkzeuge für die statische Analyse {#static-analysis-tools}

- **[Slither](https://github.com/crytic/slither)** – _Python-basiertes Framework für die statische Analyse von Solidity zum Finden von Schwachstellen, zur Verbesserung des Code-Verständnisses und zum Schreiben benutzerdefinierter Analysen für Smart Contracts._

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** – _Linter zur Durchsetzung von Stil- und Sicherheits-Best-Practices für die Smart-Contract-Programmiersprache Solidity._

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** – _Rust-basiertes statisches Analysetool, das speziell für die Sicherheit und Entwicklung von Web3-Smart-Contracts konzipiert wurde._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** – _Python-basiertes Framework für statische Analyse mit Detektoren für Schwachstellen und Codequalität, Printern zum Extrahieren nützlicher Informationen aus dem Code und Unterstützung für das Schreiben benutzerdefinierter Submodule._

- **[Slippy](https://github.com/fvictorio/slippy)** – _Ein einfacher und leistungsstarker Linter für Solidity._

#### Werkzeuge für die dynamische Analyse {#dynamic-analysis-tools}

- **[Echidna](https://github.com/crytic/echidna/)** – _Schneller Vertrags-Fuzzer zum Aufspüren von Schwachstellen in Smart Contracts mithilfe von eigenschaftsbasierten Tests._

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** – _Automatisiertes Fuzzing-Werkzeug zum Aufspüren von Eigenschaftsverstößen im Smart-Contract-Code._

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** – _Dynamisches symbolisches Ausführungs-Framework zur Analyse von EVM-Bytecode._

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** – _EVM-Bytecode-Analysewerkzeug zum Aufspüren von Vertragsschwachstellen mithilfe von Taint-Analysen, concolischer Analyse und Kontrollflussprüfungen._

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** – _Scribble ist eine Spezifikationssprache und ein Laufzeit-Verifizierungstool, mit dem Sie Smart Contracts mit Eigenschaften versehen können, die es Ihnen ermöglichen, die Verträge automatisch mit Tools wie Diligence Fuzzing oder MythX zu testen._

## Verwandte Tutorials {#related-tutorials}

- [Ein Überblick und Vergleich verschiedener Testprodukte](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [Wie man Echidna zum Testen von Smart Contracts verwendet](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Wie man Manticore verwendet, um Smart-Contract-Fehler zu finden](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Wie man Slither verwendet, um Smart-Contract-Fehler zu finden](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Wie man Solidity-Verträge für Tests mockt](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Wie man Unit-Tests in Solidity mit Foundry durchführt](https://www.rareskills.io/post/foundry-testing-solidity)

## Weiterführende Lektüre {#further-reading}

- [Ein ausführlicher Leitfaden zum Testen von Ethereum Smart Contracts](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [Wie man Ethereum Smart Contracts testet](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [MolochDAOs Leitfaden für Unit-Tests für Entwickler](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [Wie man Smart Contracts wie ein Rockstar testet](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)
