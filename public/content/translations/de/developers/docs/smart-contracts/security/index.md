---
title: Smart Contract – Sicherheit
description: Sicherheitserwägungen für Ethereum-Entwickler
lang: de
---

Ethereum-Smart-Contracts sind extrem flexibel und in der Lage, sowohl große Mengen an Token (oft über $1B) zu halten, als auch unveränderliche Logik auf der Grundlage von zuvor eingesetztem Smart-Contract-Code auszuführen. Während das ein lebendiges und kreatives Ökosystem vernetzter Smart Contracts geschaffen hat, das ohne Vertrauen auskommt, ist es auch das perfekte Ökosystem, um Angreifer anzulocken, die davon profitieren, Schwachstellen in Smart Contracts und unerwartetem Verhalten in Ethereum auszunutzen. Code in Smart Contracts kann _normalerweise_ nicht geändert werden, um Sicherheitslücken zu schließen. Assets die aus Smart Contracts gestohlen wurden, können nicht zurück geholt werden und gestohlene Assets sind sehr schwer nachzuverfolgen. Die Gesamtsumme gestohlener oder verlorener Werte infolge von Problemen mit Smart Contracts beläuft sich auf weit über 1 Milliarde Dollar. Einige der größeren Codefehlern in Smart Contracts beinhalten:

- [Parity Multi-Sig-Problem Nr. 1: 30 Millionen US-Dollar verloren](https://www.coindesk.com/30-million-ether-reported-stolen-parity-wallet-breach)
- [Parity Multi-Sig-Problem Nr. 2: 300 Millionen US-Dollar verschlossen (niemand hat Zugriff)](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether)
- [TheDAO-Hack, 3,6 Millionen ETH! Über 1 Milliarde US-Dollar in heutigen ETH-Werten](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/)

## Voraussetzungen {#prerequisites}

Im Folgenden wird die Sicherheit von Smart Contracts erläutert. Als Voraussetzung sollten Sie daher mit [Smart Contracts](/developers/docs/smart-contracts/) vertraut sein oder sich vertraut machen, bevor Sie sich dem Thema Sicherheit widmen.

## So schreiben Sie einen sicheren Smart-Contract-Code {#how-to-write-more-secure-smart-contract-code}

Bevor Sie Code im Ethereum-Mainnet einführen, ist es wichtig, ausreichende Vorsichtsmaßnahmen zu treffen, damit alle Vorgänge geschützt sind, die Werte betreffen und über den Smart Contract durchgeführt werden. In diesem Artikel werden wir einige spezielle Angriffe diskutieren, Ressourcen bereitstellen, um mehr über Angriffstypen zu erfahren. Außerdem erfahren Sie mehr über einige grundlegende Werkzeuge und Best Practices, um sicherzustellen, dass Ihre Verträge korrekt und sicher funktionieren.

## Audits sind keine Garantie {#audits-are-not-a-silver-bullet}

Vor Jahren waren die Tools zum Schreiben, Kompilieren, Testen und Bereitstellen von Smart Contracts noch unausgereift. Das führte dazu, dass viele Projekte willkürlichen Solidity-Code schreiben konnten und ihn an einen Auditor übergaben, der den Code auf seine klare Funktionsweise und deren Sicherheit untersuchte. Im Jahr 2020 sind die Entwicklungsprozesse und Tools, die das Programmieren in Solidity unterstützen, wesentlich besser. Wenn Sie die Best Practices umsetzen, stellen Sie damit sicher, dass Ihr Projekt leichter zu verwalten ist, und erfüllen viele Sicherheitsaspekte für Ihr Projekt. Den Smart Contract am Ende einem Audit zu unterziehen, reicht als einziger Sicherheitsaspekt für Ihr Projekt nicht mehr aus. Die Sicherheit beginnt vor dem Schreiben der ersten Zeile des Smart-Contract-Codes, **und zwar mit geeigneten Design- und Entwicklungsprozessen**.

## Prozess der Entwicklung von Smart Contracts {#smart-contract-development-process}

Mindestvoraussetzungen:

- Der gesammte Code wird in einem Versionskontrollsystem gespeichert, wie z. B. Git.
- Alle Codeänderungen erfolgen über Pull-Anforderungen.
- Für alle Pull-Anforderungen gibt es mindestens einen Prüfer. _Wenn Sie alleine an einem Solo-Projekt arbeiten, sollten Sie überlegen, einen weiteren Solo-Autor zu finden und Codeprüfungen gegenseitig durchzuführen._
- Ein einziger Befehl kompiliert, verteilt und führt eine Reihe von Tests für Ihren Code aus, und zwar mithilfe einer Ethereum-Entwicklungsumgebung (siehe: Truffle).
- Sie haben Ihren Code über grundlegende Codeanalysetools wie Mythril und Slither ausgeführt, idealerweise bevor die einzlenen Pull-Anforderungen zusammengeführt werden, um so Unterschiede in der Ausgabe zu vergleichen.
- Solidity zeigt KEINE Compiler-Warnungen an.
- Ihr Code ist gut dokumentiert.

Es gibt noch viele weitere Aspekte des Entwicklungsprozesses, die erläutert werden könnten, doch diese Liste ist ein guter Ausgangspunkt. Weitere Informationen und ausführliche Erklärungen finden Sie in der [Checkliste für Prozessqualität von DeFiSafety](https://docs.defisafety.com/review-process-documentation/process-quality-audit-process). [DefiSafety](https://defisafety.com/) ist eine inoffizielle Publikation von verschiedenen großen und öffentlichen Ethereum-dApps. Im Rahmen des DeFiSafety-Bewertungssystems wird überprüft, wie gut sich das Projekt an diese Prozessqualitätsprüfungsliste hält. Dabei werden folgende Prozesse eingehalten:

- Sie erzeugen sichereren Code durch reproduzierbare, automatisierte Tests.
- Auditoren können Ihr Projekt effektiver prüfen.
- Neue Entwickler können einfacher einsteigen.
- Bietet Entwicklern die Möglichkeit, schnell zu iterieren, testen und Feedback zu Änderungen zu erhalten.
- So kommt es wahrscheinlich zu weniger Rückschritten in Ihrem Projekt.

## Angriffe und Schwachstellen {#attacks-and-vulnerabilities}

Da Sie nun Solidity-Code unter Beachtung eines effizienten Entwicklungsprozesses schreiben, sollten Sie sich mit einigen gängigen Schwachstellen vertraut machen, um ein Bild davon zu bekommen, was schief gehen kann.

### Re-entrancy (Wiedereintritt) {#re-entrancy}

Re-entrancy ist eines der größten und bedeutendsten Sicherheitsprobleme, die bei der Entwicklung von Smart Contracts zu berücksichtigen sind. Da die EVM nicht mehrere Contracts gleichzeitig abwickeln kann, pausiert ein Vertrag, der einen anderen Contract aufruft, die Ausführung des Vertragsaufrufs und den Speicherzustand, bis der Aufruf zurückkehrt. An diesem Punkt läuft die Ausführung normal weiter. Durch dieses Pausieren und Neustarten kann eine Schwachstelle entstehen, die als "Re-entrancy" bekannt ist.

Im Folgenden sehen Sie eine einfache Vertragsversion, der anfällig für eine Re-entrancy ist:

```solidity
// DIESER CONTRACT ENTHÄLT ABSICHTLICHE VERWUNDBARKEITEN, NICHT VERWENDEN!
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

Um es einem Benutzer zu ermöglichen, ETH auszuzahlen, sind folgende Funktionen im Smart Contract gespeichert:

1. Lesen, wie viel Guthaben ein Benutzer hat
2. Dem Nutzer diesen Betrag in ETH senden
3. Das Guthaben auf 0 zurücksetzen, so dass das Guthaben des Nutzers nicht doppelt ausgezahlt werden kann

Bei einem Aufruf von einem regulären Konto (z. B. Ihrem eigenen MetaMask-Konto) funktioniert dies wie erwartet: msg.sender.call.value() sendet Ihrem Konto einfach ETH. Allerdings können Smart Contracts auch Aufrufe tätigen. Wenn ein benutzerdefinierter bösartiger Vertrag die Funktion `withdraw()` aufruft, sendet msg.sender.call.value() nicht nur `amount` von ETH, sondern ruft auch implizit den Vertrag auf, um mit der Codeausführung zu beginnen. Stellen Sie sich diesen böswilligen Vertrag vor:

```solidity
contract Attacker {
    function beginAttack() external payable {
        Victim(VICTIM_ADDRESS).deposit.value(1 ether)();
        Victim(VICTIM_ADDRESS).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(VICTIM_ADDRESS).withdraw();
        }
    }
}
```

Der Aufruf von Attacker.beginAttack() startet einen Zyklus, der ähnlich aussieht:

```
0.) EOA-Aufrufe des Attacker.beginAttack() mit 1 ETH
0.) Attacker.beginAttack() hinterlegt 1 ETH in Opferaccount

  1.) Angreifer -> Victim.withdraw()
  1.) Victim reads balances[msg.sender]
  1.) Opfer sendet ETH an den Angreifer (welcher die Standardfunktion ausführt)
    2.) Angreifer -> Victim.withdraw()
    2.) Victim reads balances[msg.sender]
    2.) Opfer sendet ETH an den Angreifer (welcher die Standardfunktion ausführt)
    3.) Angreifer -> Victim.withdraw()
    3.) Victim reads balances[msg.sender]
      3.) Opfer sendet ETH an den Angreifer (welcher die Standardfunktion ausführt)
    4.) Angreifer hat nicht mehr genug Gas, kehrt zurück ohne erneut aufzurufen
      3. saldo[msg.sender] = 0;
    2. Salden[msg.sender] = 0; (es war bereits 0)
  1.) Salden[msg.sender] = 0; (es war bereits 0)
```

Über den Aufruf von Attacker.beginAttack mit 1 ETH erfolgt ein Re-entrancy-Angriff auf das Opfer. Dadurch wird mehr ETH ausgezahlt, als in den Vertrag gegeben wurde (aus den Salden anderer Benutzer, was bewirkt, dass der Smart Contract des Ofers unterbesichert (under-collaterized) wird).

### So umgehen Sie Re-entrancy (der falsche Weg) {#how-to-deal-with-re-entrancy-the-wrong-way}

Sie könnten in Erwägung ziehen, die Re-entrancy zu unterbinden, indem Sie einfach verhindern, dass Smart Contracts mit Ihrem Code interagieren. Sie suchen stackoverflow und finden dieses Code-Snippet mit Tonnen von Upvotes:

```solidity
function isContract(address addr) internal returns (bool) {
  uint size;
  assembly { size := extcodesize(addr) }
  return size > 0;
}
```

Das scheint sinnvoll: Vertäge haben Code und wenn der Anrufer Code hat, erlauben Sie ihm keine Einzahlung. Fügen wir diesen Aspekt also hinzu:

```solidity
// DIESER CONTRACT ENTHÄLT ABSICHTLICHE VERWUNDBARKEITEN, NICHT VERWENDEN!
contract ContractCheckVictim {
    mapping (address => uint256) public balances;

    function isContract(address addr) internal returns (bool) {
        uint size;
        assembly { size := extcodesize(addr) }
        return size > 0;
    }

    function deposit() external payable {
        require(!isContract(msg.sender)); // <- NEW LINE
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

Wenn nun ETH eingezahlt werden soll, darf Ihre Adresse keinen Smart-Contract-Code enthalten. Das kann allerdings leicht mit dem folgenden Angreifervertrag ausgehebelt werden:

```solidity
contract ContractCheckAttacker {
    constructor() public payable {
        ContractCheckVictim(VICTIM_ADDRESS).deposit(1 ether); // <- New line
    }

    function beginAttack() external payable {
        ContractCheckVictim(VICTIM_ADDRESS).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(VICTIM_ADDRESS).withdraw();
        }
   }
}
```

Während sich der erste Angriff auf die Vertragslogik bezogen hat, liegt nun ein Angriff auf das Verhalten bei der Bereitstellung eines Ethereum-Vertrags vor. Bei der der Erstellung hat ein Vertrag seinen Code noch nicht zurückgegeben, der an seiner Adresse eingesetzt werden soll, doch er behält die volle EVM-Kontrolle WÄHREND dieses Prozesses.

Technisch kann verhindert werden, dass Smart Contracts Ihren Code aufrufen. Verwenden Sie dafür folgende Zeile:

```solidity
require(tx.origin == msg.sender)
```

Allerdings ist das noch immer keine gute Lösung. Einer der spannendsten Aspekte von Ethereum sind die Gestaltungsmöglichkeiten, wie sich Smart Contracts miteinander integrieren und aufeinander aufbauen. Wenn Sie die obige Zeile verwenden, beschränken Sie damit den Nutzen Ihres Projekts.

### So umgehen Sie Re-entrancy (der richtige Weg) {#how-to-deal-with-re-entrancy-the-right-way}

Wenn Sie ganz einfach die Reihenfolge der Speicheraktualisierung und des externen Aufrufs ändern, verhindern Sie die Re-entrancy, die den Angriff ermöglichte. Ein Rückruf in die Auszahlung wird dem Angreifer zwar möglich, doch das ist nutzlos, da die `balances` bereits auf 0 gesetzt sind.

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

Der obige Code folgt dem Designmuster "Prüfungen-Auswirkungen-Interaktionen", das zum Schutz vor Re-entrancy beiträgt. [Hier erfahren Sie mehr über Prüfungen-Auswirkungen-Interaktionen](https://fravoll.github.io/solidity-patterns/checks_effects_interactions.html).

### So umgehen Sie Re-entrancy (die nukleare Option) {#how-to-deal-with-re-entrancy-the-nuclear-option}

Jedes Mal, wenn Sie ETH an eine nicht vertrauenswürdige Adresse senden oder mit einem unbekannten Vertrag interagieren (wie beispielsweise das Aufrufen von `transfer()` einer von dir angegebenen Token-Adresse), eröffnet sich für Sie die Möglichkeit der RE-entrancy. **Durch die Gestaltung von Smart Contracts, die weder ETH senden noch nicht vertrauenswürdige Verträge aufrufen, verhindern Sie die Möglichkeit der Re-entrancy.**

## Weitere Angriffstypen {#more-attack-types}

Die obigen Angriffstypen beziehen sich auf Probleme mit Smart-Contract-Code (Re-entrancy) und Ethereum-Kuriositäten (Codeausführung innerhalb der Vertragskonstruktoren, bevor Code unter der Vertragsadresse verfügbar ist). Doch es gibt viele weitere Angriffstypen, sie Sie kennen sollten:

- Front-running (Vorweglaufen)
- ETH-Sendungsablehnung
- Ganzzahlüberlauf/-unterlauf

Weiterführende Informationen:

- [Consensys – Bekannte Smart-Contract-Angriffe](https://consensys.github.io/smart-contract-best-practices/attacks/) – Eine sehr gut lesbare Erklärung der wichtigsten Schwachstellen, mit Beispielcode für die meisten.
- [SWC Registry](https://swcregistry.io/docs/SWC-128) – Kuratierte Liste der CWEs, die für Ethereum und Smart Contracts gelten

## Sicherheitstools {#security-tools}

Es ist unumgänglich, dass Sie die Sicherheitsgrundlagen von Ethereum verstehen und mit einem professionellen Prüfer zusammenarbeiten. Doch für die Überprüfung Ihres Codes gibt es viele Tools, die helfen, mögliche Probleme in Ihrem Code zu beleuchten.

### Smart Contract – Sicherheit {#smart-contract-security}

**Slither –** **_In Python 3 geschriebener statischer Analyserahmen für Solidity_**

- [GitHub](https://github.com/crytic/slither)

**MythX –** **_Sicherheitsanalyse-API für Ethereum-Smart Contracts_**

- [mythx.io](https://mythx.io/)
- [Dokumentation](https://docs.mythx.io/)

**Mythril –** **_Sicherheitsanalyse für EVM-Bytecode_**

- [mythril](https://github.com/ConsenSys/mythril)
- [Dokumentation](https://mythril-classic.readthedocs.io/en/master/about.html)

** Manticore –** **_Eine Befehlszeilenschnittstelle, die ein symbolisches Ausführungswerkzeug für Smart Contracts und Binärdaten einsetzt_**

- [GitHub](https://github.com/trailofbits/manticore)
- [Dokumentation](https://github.com/trailofbits/manticore/wiki)

**Securify –** **_Sicherheitsscanner für Ethereum-Smart Contracts_**

- [securify.chainsecurity.com](https://securify.chainsecurity.com/)
- [Discord](https://discordapp.com/invite/nN77ckb)

**ERC20 Verifier –** **_Ein Verifizierungstool zur Prüfung der Übereinstimmung eines Vertrags mit dem ERC20-Standard_**

- [erc20-verifier.openzeppelin.com](https://erc20-verifier.openzeppelin.com)
- [Forum](https://forum.openzeppelin.com/t/online-erc20-contract-verifier/1575)

### Formale Verifizierung {#formal-verification}

**Informationen zur formalen Verifizierung**

- [How formal verification of smart-contacts works](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/) _20. Juli 2018 – Brian Marick_
- [How Formal Verification Can Ensure Flawless Smart Contracts](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1) _20. Januar 2018 – Bernard Mueller_

### Tools einsetzen {#using-tools}

Zwei der beliebtesten Tools für eine Smart-Contract-Sicherheitsanalyse sind:

- [Slither](https://github.com/crytic/slither) by [Trail of Bits](https://www.trailofbits.com/) (hosted version: [Crytic](https://crytic.io/))
- [Mythril](https://github.com/ConsenSys/mythril) von [ConsenSys](https://consensys.net/) (gehostete Version: [MythX](https://mythx.io/))

Beide Tools sind nützlich, um Ihren Code zu analysieren und Fehler zu melden. Für jedes Tool gibt es eine [commercial] gehostete Version, sie sind aber auch für den lokalen Betrieb verfügbar. Das folgende Beispiel ist ein schnelles Beispiel für die Ausführung von Slither, das in einem praktischen Docker-Image `trailofbits/eth-security-toolbox` zur Verfügung gestellt wird. Sofern noch nicht geschehen, sollten Sie [Node.js](https://nodejs.org/) installieren.

```bash
$ mkdir test-slither
$ curl https://gist.githubusercontent.com/epheph/460e6ff4f02c4ac582794a41e1f103bf/raw/9e761af793d4414c39370f063a46a3f71686b579/gistfile1.txt > bad-contract.sol
$ docker run -v `pwd`:/share  -it --rm trailofbits/eth-security-toolbox
docker$ cd /share
docker$ solc-select 0.5.11
docker$ slither bad-contract.sol
```

Folgende Ausgabe wird erstellt:

```bash
ethsec@1435b241ca60:/share$ slither bad-contract.sol
INFO:Detectors:
Reentrancy in Victim.withdraw() (bad-contract.sol#11-16):
    External calls:
    - (success) = msg.sender.call.value(amount)() (bad-contract.sol#13)
    State variables written after the call(s):
    - balances[msg.sender] = 0 (bad-contract.sol#15)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities
INFO:Detectors:
Low level call in Victim.withdraw() (bad-contract.sol#11-16):
    - (success) = msg.sender.call.value(amount)() (bad-contract.sol#13)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#low-level-calls
INFO:Slither:bad-contract.sol analyzed (1 contracts with 46 detectors), 2 result(s) found
INFO:Slither:Use https://crytic.io/ to get access to additional detectors and GitHub integration
```

Slither hat hier das Potenzial für eine Re-entrancy erkannt, identifiziert die Schlüsselzeilen, in denen das Problem auftreten könnte, und stellt einen Link für weitere Informationen zum Problem bereit:

> Referenz: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities

So werden Sie schnell über mögliche Probleme mit Ihrem Code informiert. Wie alle automatisierten Testwerkzeuge ist Slither nicht perfekt und es irrt sich manchmal, indem es zu viel rückmeldet. Es kann vor einer möglichen Re-entrancy warnen, selbst wenn keine ausbeutbare Schwachstelle vorhanden ist. Oft ist die Überprüfung des UNTERSCHIEDS in der Slither-Ausgabe zwischen Codeänderungen extrem aufschlussreich, denn es hilft bei der Entdeckung von Schwachstellen, die viel früher eingeführt wurden, anstatt zu warten, bis Ihr Projektcode vollständig ist.

## Weiterführende Informationen {#further-reading}

**Leitfaden für Best Practices zur Sicherheit von Smart Contracts**

- [consensys.github.io/smart-contract-best-practices/](https://consensys.github.io/smart-contract-best-practices/)
- [GitHub](https://github.com/ConsenSys/smart-contract-best-practices/)
- [Sammlung von Sicherheitsempfehlungen und Best Practices](https://github.com/guylando/KnowledgeLists/blob/master/EthereumSmartContracts.md)

**Standard für die Sicherheitsüberprüfung von Smart Contracts (SCSVS)**

- [securing.github.io/SCSVS/](https://securing.github.io/SCSVS/)

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu._

## Verwandte Tutorials {#related-tutorials}

- [Sicherer Entwicklungs-Workflow](/developers/tutorials/secure-development-workflow/)
- [So verwenden Sie Slither, um Fehler in Smart Contracts zu finden](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [So finden Sie mit Manticore Fehler in Smart Contract](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Sicherheitsrichtlinien](/developers/tutorials/smart-contract-security-guidelines/)
- [Token-Sicherheit](/developers/tutorials/token-integration-checklist/)
