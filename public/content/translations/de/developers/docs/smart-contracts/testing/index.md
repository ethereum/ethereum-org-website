---
title: Testen von Smart Contracts
description: "Ein Überblick über Techniken und Überlegungen zum Testen von Ethereum-Smart-Contracts."
lang: de
---

Öffentliche Blockchains wie Ethereum sind unveränderlich, was es schwierig macht, den Code eines Smart Contracts nach der Bereitstellung zu ändern. Es gibt [Muster für Vertragsaktualisierungen](/developers/docs/smart-contracts/upgrading/) zur Durchführung „virtueller Upgrades“, aber diese sind schwer zu implementieren und erfordern sozialen Konsens. Darüber hinaus kann ein Upgrade einen Fehler nur beheben, _nachdem_ er entdeckt wurde – wenn ein Angreifer die Schwachstelle zuerst entdeckt, ist Ihr Smart Contract dem Risiko eines Exploits ausgesetzt.

Aus diesen Gründen ist das Testen von Smart Contracts vor der [Bereitstellung](/developers/docs/smart-contracts/deploying/) im Mainnet eine Mindestanforderung für die [Sicherheit](/developers/docs/smart-contracts/security/). Es gibt viele Techniken zum Testen von Verträgen und zur Bewertung der Code-Korrektheit; welche Sie wählen, hängt von Ihren Anforderungen ab. Dennoch ist eine Test-Suite, die aus verschiedenen Tools und Ansätzen besteht, ideal, um sowohl kleinere als auch größere Sicherheitslücken im Vertragscode zu finden.

## Voraussetzungen {#prerequisites}

Diese Seite erklärt, wie man Smart Contracts testet, bevor man sie im Ethereum-Netzwerk bereitstellt. Es wird vorausgesetzt, dass Sie mit [Smart Contracts](/developers/docs/smart-contracts/) vertraut sind.

## Was ist das Testen von Smart Contracts? {#what-is-smart-contract-testing}

Das Testen von Smart Contracts ist der Prozess der Überprüfung, ob der Code eines Smart Contracts wie erwartet funktioniert. Tests sind nützlich, um zu überprüfen, ob ein bestimmter Smart Contract die Anforderungen an Zuverlässigkeit, Benutzerfreundlichkeit und Sicherheit erfüllt.

Obwohl die Ansätze variieren, erfordern die meisten Testmethoden die Ausführung eines Smart Contracts mit einer kleinen Stichprobe der Daten, die er verarbeiten soll. Wenn der Vertrag korrekte Ergebnisse für die Beispieldaten liefert, wird davon ausgegangen, dass er ordnungsgemäß funktioniert. Die meisten Test-Tools bieten Ressourcen zum Schreiben und Ausführen von [Testfällen](https://en.m.wikipedia.org/wiki/Test_case), um zu überprüfen, ob die Ausführung eines Vertrags mit den erwarteten Ergebnissen übereinstimmt.

### Warum ist es wichtig, Smart Contracts zu testen? {#importance-of-testing-smart-contracts}

Da Smart Contracts oft hochwertige finanzielle Vermögenswerte verwalten, können kleinere Programmierfehler zu [massiven Verlusten für Benutzer](https://rekt.news/leaderboard/) führen und tun dies auch oft. Rigoroses Testen kann Ihnen jedoch helfen, Fehler und Probleme im Code eines Smart Contracts frühzeitig zu entdecken und zu beheben, bevor er im Mainnet gestartet wird.

Während es möglich ist, einen Vertrag zu aktualisieren, wenn ein Fehler entdeckt wird, sind Upgrades komplex und können bei unsachgemäßer Handhabung [zu Fehlern führen](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Die Aktualisierung eines Vertrags negiert zudem das Prinzip der Unveränderlichkeit und belastet die Benutzer mit zusätzlichen Vertrauensannahmen. Umgekehrt mindert ein umfassender Plan zum Testen Ihres Vertrags die Sicherheitsrisiken von Smart Contracts und reduziert die Notwendigkeit, nach der Bereitstellung komplexe Logik-Upgrades durchzuführen.

## Methoden zum Testen von Smart Contracts {#methods-for-testing-smart-contracts}

Methoden zum Testen von Ethereum-Smart-Contracts fallen in zwei breite Kategorien: **automatisiertes Testen** und **manuelles Testen**. Automatisiertes Testen und manuelles Testen bieten einzigartige Vorteile und Kompromisse, aber Sie können beide kombinieren, um einen robusten Plan zur Analyse Ihrer Verträge zu erstellen.

### Automatisiertes Testen {#automated-testing}

Automatisiertes Testen verwendet Tools, die den Code eines Smart Contracts automatisch auf Ausführungsfehler überprüfen. Der Vorteil des automatisierten Testens liegt in der Verwendung von [Skripten](https://www.techtarget.com/whatis/definition/script?amp=1) zur Steuerung der Bewertung von Vertragsfunktionen. Skriptbasierte Tests können so geplant werden, dass sie wiederholt mit minimalem menschlichen Eingreifen ausgeführt werden, was automatisiertes Testen effizienter macht als manuelle Testansätze.

Automatisiertes Testen ist besonders nützlich, wenn Tests repetitiv und zeitaufwändig sind, manuell schwer durchzuführen sind, anfällig für menschliche Fehler sind oder die Bewertung kritischer Vertragsfunktionen beinhalten. Aber automatisierte Test-Tools können Nachteile haben – sie übersehen möglicherweise bestimmte Fehler und produzieren viele [falsch positive Ergebnisse](https://www.contrastsecurity.com/glossary/false-positive). Daher ist die Kombination von automatisiertem Testen mit manuellem Testen für Smart Contracts ideal.

### Manuelles Testen {#manual-testing}

Manuelles Testen wird von Menschen unterstützt und beinhaltet die Ausführung jedes Testfalls in Ihrer Test-Suite nacheinander bei der Analyse der Korrektheit eines Smart Contracts. Dies unterscheidet sich vom automatisierten Testen, bei dem Sie gleichzeitig mehrere isolierte Tests für einen Vertrag ausführen und einen Bericht erhalten können, der alle fehlgeschlagenen und bestandenen Tests anzeigt.

Manuelles Testen kann von einer einzelnen Person durchgeführt werden, die einem schriftlichen Testplan folgt, der verschiedene Testszenarien abdeckt. Sie könnten auch mehrere Personen oder Gruppen über einen bestimmten Zeitraum im Rahmen des manuellen Testens mit einem Smart Contract interagieren lassen. Tester vergleichen das tatsächliche Verhalten des Vertrags mit dem erwarteten Verhalten und markieren jeden Unterschied als Fehler.

Effektives manuelles Testen erfordert erhebliche Ressourcen (Fähigkeiten, Zeit, Geld und Aufwand), und es ist möglich – aufgrund menschlicher Fehler –, bestimmte Fehler bei der Ausführung von Tests zu übersehen. Aber manuelles Testen kann auch vorteilhaft sein – zum Beispiel kann ein menschlicher Tester (z. B. ein Prüfer) Intuition nutzen, um Randfälle zu erkennen, die ein automatisiertes Test-Tool übersehen würde.

## Automatisiertes Testen für Smart Contracts {#automated-testing-for-smart-contracts}

### Unit-Testing {#unit-testing-for-smart-contracts}

Unit-Testing bewertet Vertragsfunktionen separat und überprüft, ob jede Komponente korrekt funktioniert. Gute Unit-Tests sollten einfach sein, schnell ausgeführt werden können und eine klare Vorstellung davon vermitteln, was schiefgelaufen ist, wenn Tests fehlschlagen.

Unit-Tests sind nützlich, um zu überprüfen, ob Funktionen erwartete Werte zurückgeben und ob der Vertragsspeicher nach der Funktionsausführung ordnungsgemäß aktualisiert wird. Darüber hinaus stellt die Ausführung von Unit-Tests nach Änderungen an der Codebasis eines Vertrags sicher, dass das Hinzufügen neuer Logik keine Fehler einführt. Im Folgenden finden Sie einige Richtlinien für die Ausführung effektiver Unit-Tests:

#### Richtlinien für das Unit-Testing von Smart Contracts {#unit-testing-guidelines}

##### 1. Verstehen Sie die Geschäftslogik und den Workflow Ihres Vertrags

Bevor Sie Unit-Tests schreiben, ist es hilfreich zu wissen, welche Funktionalitäten ein Smart Contract bietet und wie Benutzer auf diese Funktionen zugreifen und sie nutzen werden. Dies ist besonders nützlich für die Ausführung von [Happy-Path-Tests](https://en.m.wikipedia.org/wiki/Happy_path), die bestimmen, ob Funktionen in einem Vertrag die korrekte Ausgabe für gültige Benutzereingaben zurückgeben. Wir erklären dieses Konzept anhand dieses (gekürzten) Beispiels eines [Auktionsvertrags](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)

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

Dies ist ein einfacher Auktionsvertrag, der darauf ausgelegt ist, Gebote während der Bietzeit zu empfangen. Wenn das `highestBid` steigt, erhält der vorherige Höchstbietende sein Geld zurück; sobald die Bietzeit abgelaufen ist, ruft der `beneficiary` den Vertrag auf, um sein Geld zu erhalten.

Unit-Tests für einen solchen Vertrag würden verschiedene Funktionen abdecken, die ein Benutzer bei der Interaktion mit dem Vertrag aufrufen könnte. Ein Beispiel wäre ein Unit-Test, der überprüft, ob ein Benutzer ein Gebot abgeben kann, während die Auktion läuft (d. h. Aufrufe von `bid()` sind erfolgreich), oder einer, der überprüft, ob ein Benutzer ein höheres Gebot als das aktuelle `highestBid` abgeben kann.

Das Verständnis des operativen Workflows eines Vertrags hilft auch beim Schreiben von Unit-Tests, die überprüfen, ob die Ausführung den Anforderungen entspricht. Zum Beispiel legt der Auktionsvertrag fest, dass Benutzer keine Gebote abgeben können, wenn die Auktion beendet ist (d. h. wenn `auctionEndTime` niedriger als `block.timestamp` ist). Daher könnte ein Entwickler einen Unit-Test ausführen, der überprüft, ob Aufrufe der Funktion `bid()` erfolgreich sind oder fehlschlagen, wenn die Auktion vorbei ist (d. h. wenn `auctionEndTime` > `block.timestamp`).

##### 2. Bewerten Sie alle Annahmen im Zusammenhang mit der Vertragsausführung

Es ist wichtig, alle Annahmen über die Ausführung eines Vertrags zu dokumentieren und Unit-Tests zu schreiben, um die Gültigkeit dieser Annahmen zu überprüfen. Abgesehen vom Schutz vor unerwarteter Ausführung zwingt Sie das Testen von Zusicherungen (Assertions) dazu, über Operationen nachzudenken, die das Sicherheitsmodell eines Smart Contracts brechen könnten. Ein nützlicher Tipp ist, über „Happy-User-Tests“ hinauszugehen und negative Tests zu schreiben, die überprüfen, ob eine Funktion bei falschen Eingaben fehlschlägt.

Viele Unit-Testing-Frameworks ermöglichen es Ihnen, Zusicherungen zu erstellen – einfache Aussagen, die angeben, was ein Vertrag tun kann und was nicht – und Tests auszuführen, um zu sehen, ob diese Zusicherungen bei der Ausführung Bestand haben. Ein Entwickler, der an dem zuvor beschriebenen Auktionsvertrag arbeitet, könnte vor der Ausführung negativer Tests die folgenden Zusicherungen über dessen Verhalten machen:

- Benutzer können keine Gebote abgeben, wenn die Auktion beendet ist oder noch nicht begonnen hat.

- Der Auktionsvertrag wird rückgängig gemacht (reverts), wenn ein Gebot unter dem akzeptablen Schwellenwert liegt.

- Benutzern, die den Zuschlag nicht erhalten, werden ihre Gelder gutgeschrieben.

**Hinweis**: Eine weitere Möglichkeit, Annahmen zu testen, besteht darin, Tests zu schreiben, die [Funktionsmodifikatoren](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers) in einem Vertrag auslösen, insbesondere `require`-, `assert`- und `if…else`-Anweisungen.

##### 3. Messen Sie die Codeabdeckung

[Codeabdeckung](https://en.m.wikipedia.org/wiki/Code_coverage) (Code Coverage) ist eine Testmetrik, die die Anzahl der Zweige, Zeilen und Anweisungen in Ihrem Code verfolgt, die während der Tests ausgeführt werden. Tests sollten eine gute Codeabdeckung aufweisen, um das Risiko ungetesteter Schwachstellen zu minimieren. Ohne ausreichende Abdeckung könnten Sie fälschlicherweise annehmen, dass Ihr Vertrag sicher ist, weil alle Tests bestanden wurden, während in ungetesteten Codepfaden weiterhin Schwachstellen existieren. Die Aufzeichnung einer hohen Codeabdeckung gibt jedoch die Gewissheit, dass alle Anweisungen/Funktionen in einem Smart Contract ausreichend auf Korrektheit getestet wurden.

##### 4. Verwenden Sie gut entwickelte Test-Frameworks

Die Qualität der Tools, die zur Ausführung von Unit-Tests für Ihre Smart Contracts verwendet werden, ist entscheidend. Ein ideales Test-Framework ist eines, das regelmäßig gewartet wird, nützliche Funktionen bietet (z. B. Protokollierungs- und Berichtsfunktionen) und von anderen Entwicklern ausgiebig genutzt und geprüft wurde.

Unit-Testing-Frameworks für Solidity-Smart-Contracts gibt es in verschiedenen Sprachen (hauptsächlich JavaScript, Python und Rust). In einigen der folgenden Leitfäden finden Sie Informationen darüber, wie Sie mit der Ausführung von Unit-Tests mit verschiedenen Test-Frameworks beginnen können:

- **[Ausführen von Unit-Tests mit Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Ausführen von Unit-Tests mit Foundry](https://book.getfoundry.sh/forge/writing-tests)**
- **[Ausführen von Unit-Tests mit Waffle](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Ausführen von Unit-Tests mit Remix](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Ausführen von Unit-Tests mit Ape](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Ausführen von Unit-Tests mit Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[Ausführen von Unit-Tests mit Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### Integrationstests {#integration-testing-for-smart-contracts}

Während Unit-Testing Vertragsfunktionen isoliert debuggt, bewerten Integrationstests die Komponenten eines Smart Contracts als Ganzes. Integrationstests können Probleme erkennen, die sich aus vertragsübergreifenden Aufrufen oder Interaktionen zwischen verschiedenen Funktionen im selben Smart Contract ergeben. Zum Beispiel können Integrationstests helfen zu überprüfen, ob Dinge wie [Vererbung](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) und Dependency Injection ordnungsgemäß funktionieren.

Integrationstests sind nützlich, wenn Ihr Vertrag eine modulare Architektur annimmt oder während der Ausführung mit anderen Verträgen auf der Blockchain (onchain) interagiert. Eine Möglichkeit, Integrationstests durchzuführen, besteht darin, einen [Fork](/glossary/#fork) der Blockchain auf einer bestimmten Höhe zu erstellen (mit einem Tool wie [Forge](https://book.getfoundry.sh/forge/fork-testing) oder [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks)) und Interaktionen zwischen Ihrem Vertrag und bereitgestellten Verträgen zu simulieren.

Die geforkte Blockchain verhält sich ähnlich wie das Mainnet und verfügt über Konten mit zugehörigen Zuständen und Salden. Sie fungiert jedoch nur als isolierte lokale Entwicklungsumgebung (Sandbox), was bedeutet, dass Sie beispielsweise keine echten ETH für Transaktionen benötigen und Ihre Änderungen das echte Ethereum-Protokoll nicht beeinflussen.

### Eigenschaftsbasiertes Testen {#property-based-testing-for-smart-contracts}

Eigenschaftsbasiertes Testen ist der Prozess der Überprüfung, ob ein Smart Contract eine bestimmte definierte Eigenschaft erfüllt. Eigenschaften behaupten Fakten über das Verhalten eines Vertrags, von denen erwartet wird, dass sie in verschiedenen Szenarien wahr bleiben – ein Beispiel für eine Smart-Contract-Eigenschaft könnte sein: „Arithmetische Operationen im Vertrag führen niemals zu einem Überlauf oder Unterlauf.“

**Statische Analyse** und **dynamische Analyse** sind zwei gängige Techniken zur Ausführung von eigenschaftsbasiertem Testen, und beide können überprüfen, ob der Code für ein Programm (in diesem Fall ein Smart Contract) eine vordefinierte Eigenschaft erfüllt. Einige Tools für eigenschaftsbasiertes Testen verfügen über vordefinierte Regeln zu erwarteten Vertragseigenschaften und überprüfen den Code anhand dieser Regeln, während andere es Ihnen ermöglichen, benutzerdefinierte Eigenschaften für einen Smart Contract zu erstellen.

#### Statische Analyse {#static-analysis}

Ein statischer Analysator nimmt den Quellcode eines Smart Contracts als Eingabe und gibt Ergebnisse aus, die erklären, ob ein Vertrag eine Eigenschaft erfüllt oder nicht. Im Gegensatz zur dynamischen Analyse beinhaltet die statische Analyse nicht die Ausführung eines Vertrags, um ihn auf Korrektheit zu analysieren. Die statische Analyse argumentiert stattdessen über alle möglichen Pfade, die ein Smart Contract während der Ausführung nehmen könnte (d. h. durch Untersuchung der Struktur des Quellcodes, um zu bestimmen, was dies für den Betrieb des Vertrags zur Laufzeit bedeuten würde).

[Linting](https://www.perforce.com/blog/qac/what-is-linting) und [statisches Testen](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis) sind gängige Methoden zur Durchführung statischer Analysen von Verträgen. Beide erfordern die Analyse von Low-Level-Darstellungen der Ausführung eines Vertrags, wie z. B. [abstrakte Syntaxbäume](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree) und [Kontrollflussgraphen](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/), die vom Compiler ausgegeben werden.

In den meisten Fällen ist die statische Analyse nützlich, um Sicherheitsprobleme wie die Verwendung unsicherer Konstrukte, Syntaxfehler oder Verstöße gegen Codierungsstandards im Code eines Vertrags zu erkennen. Es ist jedoch bekannt, dass statische Analysatoren im Allgemeinen unzuverlässig bei der Erkennung tieferer Schwachstellen sind und übermäßig viele falsch positive Ergebnisse produzieren können.

#### Dynamische Analyse {#dynamic-analysis}

Die dynamische Analyse generiert symbolische Eingaben (z. B. bei der [symbolischen Ausführung](https://en.m.wikipedia.org/wiki/Symbolic_execution)) oder konkrete Eingaben (z. B. beim [Fuzzing](https://owasp.org/www-community/Fuzzing)) für die Funktionen eines Smart Contracts, um zu sehen, ob Ausführungsspuren bestimmte Eigenschaften verletzen. Diese Form des eigenschaftsbasierten Testens unterscheidet sich von Unit-Tests dadurch, dass Testfälle mehrere Szenarien abdecken und ein Programm die Generierung von Testfällen übernimmt.

[Fuzzing](https://www.halborn.com/blog/post/what-is-fuzz-testing-fuzzing) ist ein Beispiel für eine dynamische Analysetechnik zur Überprüfung beliebiger Eigenschaften in Smart Contracts. Ein Fuzzer ruft Funktionen in einem Zielvertrag mit zufälligen oder fehlerhaften Variationen eines definierten Eingabewerts auf. Wenn der Smart Contract in einen Fehlerzustand übergeht (z. B. einen, bei dem eine Zusicherung fehlschlägt), wird das Problem markiert und Eingaben, die die Ausführung in Richtung des anfälligen Pfads treiben, werden in einem Bericht ausgegeben.

Fuzzing ist nützlich zur Bewertung des Eingabevalidierungsmechanismus eines Smart Contracts, da eine unsachgemäße Handhabung unerwarteter Eingaben zu einer unbeabsichtigten Ausführung führen und gefährliche Auswirkungen haben kann. Diese Form des eigenschaftsbasierten Testens kann aus vielen Gründen ideal sein:

1. **Das Schreiben von Testfällen zur Abdeckung vieler Szenarien ist schwierig.** Ein Eigenschaftstest erfordert nur, dass Sie ein Verhalten und einen Datenbereich definieren, mit dem das Verhalten getestet werden soll – das Programm generiert automatisch Testfälle basierend auf der definierten Eigenschaft.

2. **Ihre Test-Suite deckt möglicherweise nicht alle möglichen Pfade innerhalb des Programms ausreichend ab.** Selbst bei 100 % Abdeckung ist es möglich, Randfälle zu übersehen.

3. **Unit-Tests beweisen, dass ein Vertrag für Beispieldaten korrekt ausgeführt wird, aber ob der Vertrag für Eingaben außerhalb der Stichprobe korrekt ausgeführt wird, bleibt unbekannt.** Eigenschaftstests führen einen Zielvertrag mit mehreren Variationen eines bestimmten Eingabewerts aus, um Ausführungsspuren zu finden, die Fehler bei Zusicherungen verursachen. Somit bietet ein Eigenschaftstest mehr Garantien dafür, dass ein Vertrag für eine breite Klasse von Eingabedaten korrekt ausgeführt wird.

### Richtlinien für die Ausführung von eigenschaftsbasiertem Testen für Smart Contracts {#running-property-based-tests}

Die Ausführung von eigenschaftsbasiertem Testen beginnt typischerweise mit der Definition einer Eigenschaft (z. B. Fehlen von [Integer-Überläufen](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow)) oder einer Sammlung von Eigenschaften, die Sie in einem Smart Contract überprüfen möchten. Möglicherweise müssen Sie auch einen Wertebereich definieren, innerhalb dessen das Programm Daten für Transaktionseingaben generieren kann, wenn Sie Eigenschaftstests schreiben.

Sobald es richtig konfiguriert ist, führt das Tool für Eigenschaftstests die Funktionen Ihres Smart Contracts mit zufällig generierten Eingaben aus. Wenn es Verletzungen von Zusicherungen gibt, sollten Sie einen Bericht mit konkreten Eingabedaten erhalten, die die zu bewertende Eigenschaft verletzen. In einigen der folgenden Leitfäden erfahren Sie, wie Sie mit der Ausführung von eigenschaftsbasiertem Testen mit verschiedenen Tools beginnen können:

- **[Statische Analyse von Smart Contracts mit Slither](https://github.com/crytic/slither)**
- **[Statische Analyse von Smart Contracts mit Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[Eigenschaftsbasiertes Testen mit Brownie](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Fuzzing von Verträgen mit Foundry](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[Fuzzing von Verträgen mit Echidna](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Fuzzing von Verträgen mit Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[Symbolische Ausführung von Smart Contracts mit Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Symbolische Ausführung von Smart Contracts mit Mythril](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## Manuelles Testen für Smart Contracts {#manual-testing-for-smart-contracts}

Das manuelle Testen von Smart Contracts erfolgt oft später im Entwicklungszyklus nach der Ausführung automatisierter Tests. Diese Form des Testens bewertet den Smart Contract als ein vollständig integriertes Produkt, um zu sehen, ob er wie in den technischen Anforderungen spezifiziert funktioniert.

### Testen von Verträgen auf einer lokalen Blockchain {#testing-on-local-blockchain}

Während automatisiertes Testen in einer lokalen Entwicklungsumgebung nützliche Debugging-Informationen liefern kann, möchten Sie wissen, wie sich Ihr Smart Contract in einer Produktionsumgebung verhält. Die Bereitstellung auf der Haupt-Ethereum-Chain verursacht jedoch Gasgebühren – ganz zu schweigen davon, dass Sie oder Ihre Benutzer echtes Geld verlieren können, wenn Ihr Smart Contract noch Fehler aufweist.

Das Testen Ihres Vertrags auf einer lokalen Blockchain (auch bekannt als [Entwicklungsnetzwerk](/developers/docs/development-networks/)) ist eine empfohlene Alternative zum Testen im Mainnet. Eine lokale Blockchain ist eine Kopie der Ethereum-Blockchain, die lokal auf Ihrem Computer läuft und das Verhalten der Ausführungsebene von Ethereum simuliert. Als solches können Sie Transaktionen programmieren, um mit einem Vertrag zu interagieren, ohne erheblichen Mehraufwand zu verursachen.

Die Ausführung von Verträgen auf einer lokalen Blockchain könnte als eine Form des manuellen Integrationstests nützlich sein. [Smart Contracts sind hochgradig zusammensetzbar](/developers/docs/smart-contracts/composability/), was es Ihnen ermöglicht, sie in bestehende Protokolle zu integrieren – aber Sie müssen dennoch sicherstellen, dass solch komplexe Interaktionen auf der Blockchain (onchain) die korrekten Ergebnisse liefern.

[Mehr über Entwicklungsnetzwerke.](/developers/docs/development-networks/)

### Testen von Verträgen in Testnets {#testing-contracts-on-testnets}

Ein Testnetzwerk oder Testnet funktioniert genau wie das Ethereum-Mainnet, außer dass es Ether (ETH) ohne realen Wert verwendet. Die Bereitstellung Ihres Vertrags in einem [Testnet](/developers/docs/networks/#ethereum-testnets) bedeutet, dass jeder damit interagieren kann (z. B. über das Frontend der Dapp), ohne Gelder zu gefährden.

Diese Form des manuellen Testens ist nützlich zur Bewertung des End-to-End-Ablaufs Ihrer Anwendung aus der Sicht eines Benutzers. Hier können Beta-Tester auch Probeläufe durchführen und Probleme mit der Geschäftslogik und der allgemeinen Funktionalität des Vertrags melden.

Die Bereitstellung in einem Testnet nach dem Testen auf einer lokalen Blockchain ist ideal, da ersteres dem Verhalten der Ethereum Virtual Machine näher kommt. Daher ist es für viele Ethereum-native Projekte üblich, Dapps in Testnets bereitzustellen, um den Betrieb eines Smart Contracts unter realen Bedingungen zu bewerten.

[Mehr über Ethereum-Testnets.](/developers/docs/development-networks/#public-beacon-testchains)

## Testen vs. formale Verifikation {#testing-vs-formal-verification}

Während das Testen hilft zu bestätigen, dass ein Vertrag die erwarteten Ergebnisse für einige Dateneingaben zurückgibt, kann es dies nicht schlüssig für Eingaben beweisen, die während der Tests nicht verwendet wurden. Das Testen eines Smart Contracts kann daher keine „funktionale Korrektheit“ garantieren (d. h. es kann nicht zeigen, dass sich ein Programm für _alle_ Sätze von Eingabewerten wie erforderlich verhält).

Die formale Verifikation ist ein Ansatz zur Bewertung der Korrektheit von Software, indem überprüft wird, ob ein formales Modell des Programms mit der formalen Spezifikation übereinstimmt. Ein formales Modell ist eine abstrakte mathematische Darstellung eines Programms, während eine formale Spezifikation die Eigenschaften eines Programms definiert (d. h. logische Zusicherungen über die Ausführung des Programms).

Da Eigenschaften in mathematischen Begriffen geschrieben sind, wird es möglich zu überprüfen, ob ein formales (mathematisches) Modell des Systems eine Spezifikation unter Verwendung logischer Schlussfolgerungsregeln erfüllt. Daher wird gesagt, dass formale Verifikations-Tools einen „mathematischen Beweis“ für die Korrektheit eines Systems liefern.

Im Gegensatz zum Testen kann die formale Verifikation verwendet werden, um zu überprüfen, ob die Ausführung eines Smart Contracts eine formale Spezifikation für _alle_ Ausführungen erfüllt (d. h. er hat keine Fehler), ohne ihn mit Beispieldaten ausführen zu müssen. Dies reduziert nicht nur die Zeit, die für die Ausführung von Dutzenden von Unit-Tests aufgewendet wird, sondern ist auch effektiver beim Aufspüren versteckter Schwachstellen. Allerdings liegen formale Verifikationstechniken auf einem Spektrum, abhängig von ihrer Schwierigkeit bei der Implementierung und ihrer Nützlichkeit.

[Mehr über formale Verifikation für Smart Contracts.](/developers/docs/smart-contracts/formal-verification)

## Testen vs. Audits und Bug-Bounties {#testing-vs-audits-bug-bounties}

Wie bereits erwähnt, kann rigoroses Testen selten die Abwesenheit von Fehlern in einem Vertrag garantieren; formale Verifikationsansätze können stärkere Zusicherungen der Korrektheit bieten, sind aber derzeit schwierig zu verwenden und verursachen erhebliche Kosten.

Dennoch können Sie die Wahrscheinlichkeit, Vertragsschwachstellen zu finden, weiter erhöhen, indem Sie eine unabhängige Codeüberprüfung durchführen lassen. [Smart-Contract-Audits](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/) und [Bug-Bounties](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7) sind zwei Möglichkeiten, andere dazu zu bringen, Ihre Verträge zu analysieren.

Audits werden von Prüfern durchgeführt, die Erfahrung darin haben, Fälle von Sicherheitslücken und schlechten Entwicklungspraktiken in Smart Contracts zu finden. Ein Audit umfasst in der Regel Tests (und möglicherweise formale Verifikation) sowie eine manuelle Überprüfung der gesamten Codebasis.

Umgekehrt beinhaltet ein Bug-Bounty-Programm in der Regel das Anbieten einer finanziellen Belohnung für eine Person (allgemein als [White-Hat-Hacker](<https://en.wikipedia.org/wiki/White_hat_(computer_security)>) bezeichnet), die eine Schwachstelle in einem Smart Contract entdeckt und sie den Entwicklern offenlegt. Bug-Bounties ähneln Audits, da sie beinhalten, andere zu bitten, bei der Suche nach Fehlern in Smart Contracts zu helfen.

Der Hauptunterschied besteht darin, dass Bug-Bounty-Programme der breiteren Entwickler-/Hacker-Community offenstehen und eine breite Klasse von ethischen Hackern und unabhängigen Sicherheitsexperten mit einzigartigen Fähigkeiten und Erfahrungen anziehen. Dies kann ein Vorteil gegenüber Smart-Contract-Audits sein, die sich hauptsächlich auf Teams stützen, die möglicherweise über begrenzte oder enge Fachkenntnisse verfügen.

## Test-Tools und Bibliotheken {#testing-tools-and-libraries}

### Unit-Testing-Tools {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** – _Codeabdeckungs-Tool für in Solidity geschriebene Smart Contracts._

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** – _Framework für fortgeschrittene Smart-Contract-Entwicklung und -Tests (basierend auf ethers.js)._

- **[Remix Tests](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** – _Tool zum Testen von Solidity-Smart-Contracts. Funktioniert unter dem Remix-IDE-Plugin „Solidity Unit Testing“, das zum Schreiben und Ausführen von Testfällen für einen Vertrag verwendet wird._

- **[OpenZeppelin Test Helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** – _Zusicherungsbibliothek (Assertion Library) für das Testen von Ethereum-Smart-Contracts. Stellen Sie sicher, dass sich Ihre Verträge wie erwartet verhalten!_

- **[Brownie Unit-Testing-Framework](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** – _Brownie nutzt Pytest, ein funktionsreiches Test-Framework, mit dem Sie kleine Tests mit minimalem Code schreiben können, das gut für große Projekte skaliert und hochgradig erweiterbar ist._

- **[Foundry Tests](https://github.com/foundry-rs/foundry/tree/master/crates/forge)** – _Foundry bietet Forge, ein schnelles und flexibles Ethereum-Test-Framework, das in der Lage ist, einfache Unit-Tests, Gasoptimierungsprüfungen und Vertrags-Fuzzing auszuführen._

- **[Hardhat Tests](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** – _Framework zum Testen von Smart Contracts basierend auf ethers.js, Mocha und Chai._

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** – _Python-basiertes Entwicklungs- und Test-Framework für Smart Contracts, das auf die Ethereum Virtual Machine abzielt._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** – _Python-basiertes Framework für Unit-Testing und Fuzzing mit starken Debugging-Funktionen und Unterstützung für Cross-Chain-Tests, das pytest und Anvil für beste Benutzererfahrung und Leistung nutzt._

### Tools für eigenschaftsbasiertes Testen {#property-based-testing-tools}

#### Tools für statische Analyse {#static-analysis-tools}

- **[Slither](https://github.com/crytic/slither)** – _Python-basiertes Framework zur statischen Analyse von Solidity zum Finden von Schwachstellen, zur Verbesserung des Codeverständnisses und zum Schreiben benutzerdefinierter Analysen für Smart Contracts._

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** – _Linter zur Durchsetzung von Stil- und Sicherheits-Best-Practices für die Programmiersprache Solidity für Smart Contracts._

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** – _Rust-basierter statischer Analysator, der speziell für die Sicherheit und Entwicklung von Web3-Smart-Contracts entwickelt wurde._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** – _Python-basiertes Framework zur statischen Analyse mit Detektoren für Schwachstellen und Codequalität, Druckern zum Extrahieren nützlicher Informationen aus Code und Unterstützung für das Schreiben benutzerdefinierter Submodule._

- **[Slippy](https://github.com/fvictorio/slippy)** – _Ein einfacher und leistungsstarker Linter für Solidity._

#### Tools für dynamische Analyse {#dynamic-analysis-tools}

- **[Echidna](https://github.com/crytic/echidna/)** – _Schneller Vertrags-Fuzzer zur Erkennung von Schwachstellen in Smart Contracts durch eigenschaftsbasiertes Testen._

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** – _Automatisiertes Fuzzing-Tool, das nützlich ist, um Eigenschaftsverletzungen im Smart-Contract-Code zu erkennen._

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** – _Framework zur dynamischen symbolischen Ausführung zur Analyse von EVM-Bytecode._

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** – _EVM-Bytecode-Bewertungstool zur Erkennung von Vertragsschwachstellen mithilfe von Taint-Analyse, concolic Analyse und Kontrollflussprüfung._

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** – _Scribble ist eine Spezifikationssprache und ein Laufzeit-Verifikations-Tool, mit dem Sie Smart Contracts mit Eigenschaften annotieren können, die es Ihnen ermöglichen, die Verträge automatisch mit Tools wie Diligence Fuzzing oder MythX zu testen._

## Verwandte Tutorials {#related-tutorials}

- [Ein Überblick und Vergleich verschiedener Testprodukte](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [Wie man Echidna verwendet, um Smart Contracts zu testen](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Wie man Manticore verwendet, um Fehler in Smart Contracts zu finden](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Wie man Slither verwendet, um Fehler in Smart Contracts zu finden](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Wie man Solidity-Verträge für Tests mockt](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Wie man Unit-Tests in Solidity mit Foundry ausführt](https://www.rareskills.io/post/foundry-testing-solidity)

## Weiterführende Literatur {#further-reading}

- [Ein ausführlicher Leitfaden zum Testen von Ethereum-Smart-Contracts](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [Wie man Ethereum-Smart-Contracts testet](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [MolochDAOs Unit-Testing-Leitfaden für Entwickler](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [Wie man Smart Contracts wie ein Rockstar testet](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)

## Tutorials: Testen von Smart Contracts auf Ethereum {#tutorials}

- [Wie man eine Dapp in einem lokalen Multi-Client-Testnet entwickelt und testet](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– Anleitung zur Bereitstellung eines Smart Contracts in einem lokalen Testnet und zur Durchführung von Tests._
- [Wie man Solidity-Smart-Contracts für Tests mockt](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/) _– Fortgeschrittenes Tutorial zur Verwendung von Mock-Daten und zur Implementierung von Unit-Testing._
- [Wie man Echidna verwendet, um Smart Contracts zu testen](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/) _– Fortgeschrittene Ansätze für Fuzzing und das Testen von Smart Contracts._