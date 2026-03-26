---
title: Orakel
description: "Orakel bieten Ethereum-Smart-Contracts Zugriff auf reale Daten, was mehr Anwendungsfälle und einen größeren Wert für die Nutzer erschließt."
lang: de
---

Orakel sind Anwendungen, die Daten-Feeds erzeugen, welche Off-Chain-Datenquellen für Smart Contracts auf der Blockchain verfügbar machen. Dies ist notwendig, da Ethereum-basierte Smart Contracts standardmäßig nicht auf Informationen zugreifen können, die außerhalb des Blockchain-Netzwerks gespeichert sind.

Smart Contracts die Fähigkeit zu geben, unter Verwendung von Off-Chain-Daten ausgeführt zu werden, erweitert den Nutzen und Wert dezentralisierter Anwendungen. Beispielsweise sind Prognosemärkte auf der Blockchain auf Orakel angewiesen, um Informationen über Ergebnisse bereitzustellen, die sie zur Validierung von Nutzerprognosen verwenden. Angenommen, Alice wettet 20 ETH darauf, wer der nächste US-Präsident wird. In diesem Fall benötigt die Prognosemarkt-Dapp ein Orakel, um die Wahlergebnisse zu bestätigen und festzustellen, ob Alice Anspruch auf eine Auszahlung hat.

## Voraussetzungen {#prerequisites}

Diese Seite setzt voraus, dass der Leser mit den Grundlagen von [Ethereum](/) vertraut ist, einschließlich [Blockchain-Knoten](/developers/docs/nodes-and-clients/), [Konsensmechanismen](/developers/docs/consensus-mechanisms/) und der [EVM](/developers/docs/evm/). Sie sollten auch ein gutes Verständnis von [Smart Contracts](/developers/docs/smart-contracts/) und der [Anatomie von Smart Contracts](/developers/docs/smart-contracts/anatomy/) haben, insbesondere von [Ereignissen](/glossary/#events).

## Was ist ein Blockchain-Orakel? {#what-is-a-blockchain-oracle}

Orakel sind Anwendungen, die externe Informationen (d. h. Off-Chain gespeicherte Informationen) beschaffen, verifizieren und an Smart Contracts übertragen, die auf der Blockchain laufen. Neben dem „Abrufen“ von Off-Chain-Daten und deren Übertragung auf Ethereum können Orakel auch Informationen von der Blockchain an externe Systeme „pushen“, z. B. das Entsperren eines intelligenten Schlosses, sobald der Nutzer eine Gebühr über eine Ethereum-Transaktion sendet.

Ohne ein Orakel wäre ein Smart Contract vollständig auf Daten auf der Blockchain beschränkt.

Orakel unterscheiden sich basierend auf der Datenquelle (eine oder mehrere Quellen), den Vertrauensmodellen (zentralisiert oder dezentralisiert) und der Systemarchitektur (Immediate-Read, Publish-Subscribe und Request-Response). Wir können Orakel auch danach unterscheiden, ob sie externe Daten zur Verwendung durch Verträge auf der Blockchain abrufen (Eingabe-Orakel), Informationen von der Blockchain an Off-Chain-Anwendungen senden (Ausgabe-Orakel) oder Rechenaufgaben Off-Chain ausführen (Rechen-Orakel).

## Warum benötigen Smart Contracts Orakel? {#why-do-smart-contracts-need-oracles}

Viele Entwickler betrachten Smart Contracts als Code, der an bestimmten Adressen auf der Blockchain ausgeführt wird. Eine [allgemeinere Sichtweise auf Smart Contracts](/smart-contracts/) ist jedoch, dass es sich um selbstausführende Softwareprogramme handelt, die in der Lage sind, Vereinbarungen zwischen Parteien durchzusetzen, sobald bestimmte Bedingungen erfüllt sind – daher der Begriff „Smart Contracts“.

Die Verwendung von Smart Contracts zur Durchsetzung von Vereinbarungen zwischen Menschen ist jedoch nicht einfach, da Ethereum deterministisch ist. Ein [deterministisches System](https://en.wikipedia.org/wiki/Deterministic_algorithm) ist ein System, das bei einem Anfangszustand und einer bestimmten Eingabe immer die gleichen Ergebnisse liefert, was bedeutet, dass es bei der Berechnung von Ausgaben aus Eingaben keine Zufälligkeit oder Variation gibt.

Um eine deterministische Ausführung zu erreichen, beschränken Blockchains Blockchain-Knoten darauf, einen Konsens über einfache binäre (wahr/falsch) Fragen zu erzielen, wobei _nur_ Daten verwendet werden, die auf der Blockchain selbst gespeichert sind. Beispiele für solche Fragen sind:

- „Hat der Kontoinhaber (identifiziert durch einen Public-Key) diese Transaktion mit dem zugehörigen Private-Key signiert?“
- „Verfügt dieses Konto über genügend Geldmittel, um die Transaktion zu decken?“
- „Ist diese Transaktion im Kontext dieses Smart Contracts gültig?“, usw.

Wenn Blockchains Informationen aus externen Quellen (d. h. aus der realen Welt) erhalten würden, wäre Determinismus unmöglich zu erreichen, was Blockchain-Knoten daran hindern würde, sich auf die Gültigkeit von Änderungen am Zustand der Blockchain zu einigen. Nehmen wir zum Beispiel einen Smart Contract, der eine Transaktion basierend auf dem aktuellen ETH-USD-Wechselkurs ausführt, der von einer traditionellen Preis-API bezogen wird. Dieser Wert ändert sich wahrscheinlich häufig (ganz zu schweigen davon, dass die API veraltet sein oder gehackt werden könnte), was bedeutet, dass Blockchain-Knoten, die denselben Vertragscode ausführen, zu unterschiedlichen Ergebnissen kommen würden.

Für eine öffentliche Blockchain wie Ethereum, bei der Tausende von Blockchain-Knoten auf der ganzen Welt Transaktionen verarbeiten, ist Determinismus von entscheidender Bedeutung. Da es keine zentrale Autorität gibt, die als Quelle der Wahrheit dient, benötigen Blockchain-Knoten Mechanismen, um nach der Anwendung derselben Transaktionen zum selben Zustand zu gelangen. Ein Fall, in dem Blockchain-Knoten A den Code eines Smart Contracts ausführt und als Ergebnis „3“ erhält, während Blockchain-Knoten B nach Ausführung derselben Transaktion „7“ erhält, würde dazu führen, dass der Konsens zusammenbricht und den Wert von Ethereum als dezentralisierte Rechenplattform zunichte macht.

Dieses Szenario verdeutlicht auch das Problem bei der Entwicklung von Blockchains, Informationen aus externen Quellen abzurufen. Orakel lösen dieses Problem jedoch, indem sie Informationen aus Off-Chain-Quellen beziehen und sie auf der Blockchain speichern, damit Smart Contracts sie nutzen können. Da auf der Blockchain gespeicherte Informationen unveränderlich und öffentlich zugänglich sind, können Ethereum-Knoten die vom Orakel importierten Off-Chain-Daten sicher verwenden, um Zustandsänderungen zu berechnen, ohne den Konsens zu brechen.

Um dies zu tun, besteht ein Orakel typischerweise aus einem Smart Contract, der auf der Blockchain läuft, und einigen Off-Chain-Komponenten. Der Vertrag auf der Blockchain empfängt Datenanfragen von anderen Smart Contracts, die er an die Off-Chain-Komponente (Orakel-Knoten genannt) weiterleitet. Dieser Orakel-Knoten kann Datenquellen abfragen – beispielsweise über Anwendungsprogrammierschnittstellen (APIs) – und Transaktionen senden, um die angeforderten Daten im Speicher des Smart Contracts zu speichern.

Im Wesentlichen überbrückt ein Blockchain-Orakel die Informationslücke zwischen der Blockchain und der externen Umgebung und schafft so „hybride Smart Contracts“. Ein hybrider Smart Contract funktioniert basierend auf einer Kombination aus Vertragscode auf der Blockchain und Off-Chain-Infrastruktur. Dezentralisierte Prognosemärkte sind ein hervorragendes Beispiel für hybride Smart Contracts. Weitere Beispiele könnten Smart Contracts für Ernteversicherungen sein, die auszahlen, wenn eine Reihe von Orakeln feststellt, dass bestimmte Wetterphänomene aufgetreten sind.

## Was ist das Orakel-Problem? {#the-oracle-problem}

Orakel lösen ein wichtiges Problem, bringen aber auch einige Komplikationen mit sich, z. B.:

- Wie überprüfen wir, ob die eingespeisten Informationen aus der richtigen Quelle stammen oder nicht manipuliert wurden?

- Wie stellen wir sicher, dass diese Daten immer verfügbar sind und regelmäßig aktualisiert werden?

Das sogenannte „Orakel-Problem“ zeigt die Schwierigkeiten auf, die mit der Verwendung von Blockchain-Orakeln zum Senden von Eingaben an Smart Contracts einhergehen. Daten von einem Orakel müssen korrekt sein, damit ein Smart Contract korrekt ausgeführt wird. Darüber hinaus untergräbt die Notwendigkeit, Orakel-Betreibern zu „vertrauen“, dass sie genaue Informationen liefern, den „vertrauenslosen“ (trustless) Aspekt von Smart Contracts.

Verschiedene Orakel bieten unterschiedliche Lösungen für das Orakel-Problem, die wir später untersuchen werden. Orakel werden typischerweise danach bewertet, wie gut sie die folgenden Herausforderungen bewältigen können:

1. **Korrektheit**: Ein Orakel sollte nicht dazu führen, dass Smart Contracts Zustandsänderungen basierend auf ungültigen Off-Chain-Daten auslösen. Ein Orakel muss die _Authentizität_ und _Integrität_ der Daten garantieren. Authentizität bedeutet, dass die Daten aus der richtigen Quelle stammen, während Integrität bedeutet, dass die Daten intakt geblieben sind (d. h. nicht verändert wurden), bevor sie auf die Blockchain gesendet wurden.

2. **Verfügbarkeit**: Ein Orakel sollte Smart Contracts nicht verzögern oder daran hindern, Aktionen auszuführen und Zustandsänderungen auszulösen. Dies bedeutet, dass Daten von einem Orakel ohne Unterbrechung _auf Anfrage verfügbar_ sein müssen.

3. **Anreizkompatibilität**: Ein Orakel sollte Off-Chain-Datenanbietern Anreize bieten, korrekte Informationen an Smart Contracts zu übermitteln. Anreizkompatibilität umfasst _Zurechenbarkeit_ und _Verantwortlichkeit_. Zurechenbarkeit ermöglicht es, eine externe Information mit ihrem Anbieter zu verknüpfen, während Verantwortlichkeit Datenanbieter an die von ihnen bereitgestellten Informationen bindet, sodass sie basierend auf der Qualität der bereitgestellten Informationen belohnt oder bestraft werden können.

## Wie funktioniert ein Blockchain-Orakel-Dienst? {#how-does-a-blockchain-oracle-service-work}

### Nutzer {#users}

Nutzer sind Entitäten (d. h. Smart Contracts), die Informationen außerhalb der Blockchain benötigen, um bestimmte Aktionen abzuschließen. Der grundlegende Arbeitsablauf eines Orakel-Dienstes beginnt damit, dass der Nutzer eine Datenanfrage an den Orakel-Vertrag sendet. Datenanfragen beantworten in der Regel einige oder alle der folgenden Fragen:

1. Welche Quellen können Off-Chain-Knoten für die angeforderten Informationen konsultieren?

2. Wie verarbeiten Reporter Informationen aus Datenquellen und extrahieren nützliche Datenpunkte?

3. Wie viele Orakel-Knoten können am Abrufen der Daten teilnehmen?

4. Wie sollen Diskrepanzen in Orakel-Berichten gehandhabt werden?

5. Welche Methode sollte beim Filtern von Einreichungen und beim Aggregieren von Berichten zu einem einzigen Wert implementiert werden?

### Orakel-Vertrag {#oracle-contract}

Der Orakel-Vertrag ist die Komponente auf der Blockchain für den Orakel-Dienst. Er lauscht auf Datenanfragen von anderen Verträgen, leitet Datenabfragen an Orakel-Knoten weiter und überträgt zurückgegebene Daten an Client-Verträge. Dieser Vertrag kann auch einige Berechnungen an den zurückgegebenen Datenpunkten durchführen, um einen aggregierten Wert zu erzeugen, der an den anfragenden Vertrag gesendet wird.

Der Orakel-Vertrag stellt einige Funktionen bereit, die Client-Verträge aufrufen, wenn sie eine Datenanfrage stellen. Nach Erhalt einer neuen Abfrage gibt der Smart Contract ein [Protokollereignis](/developers/docs/smart-contracts/anatomy/#events-and-logs) mit Details zur Datenanfrage aus. Dies benachrichtigt Off-Chain-Knoten, die das Protokoll abonniert haben (normalerweise mit etwas wie dem JSON-RPC-Befehl `eth_subscribe`), welche dann fortfahren, die im Protokollereignis definierten Daten abzurufen.

Unten ist ein [Beispiel für einen Orakel-Vertrag](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) von Pedro Costa. Dies ist ein einfacher Orakel-Dienst, der Off-Chain-APIs auf Anfrage anderer Smart Contracts abfragen und die angeforderten Informationen auf der Blockchain speichern kann:

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; // Liste der an den Vertrag gestellten Anfragen
  uint currentId = 0; // aufsteigende Anfrage-ID
  uint minQuorum = 2; // Mindestanzahl an Antworten, die empfangen werden müssen, bevor das Endergebnis deklariert wird
  uint totalOracleCount = 3; // Fest codierte Anzahl an Orakeln

  // definiert eine allgemeine API-Anfrage
  struct Request {
    uint id; // Anfrage-ID
    string urlToQuery; // API-URL
    string attributeToFetch; // JSON-Attribut (Schlüssel), das in der Antwort abgerufen werden soll
    string agreedValue; // Wert aus Schlüssel
    mapping(uint => string) answers; // von den Orakeln bereitgestellte Antworten
    mapping(address => uint) quorum; // Orakel, die die Antwort abfragen werden (1=Orakel hat nicht abgestimmt, 2=Orakel hat abgestimmt)
  }

  // Ereignis, das ein Orakel außerhalb der Blockchain auslöst
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  // wird ausgelöst, wenn es einen Konsens über das Endergebnis gibt
  event UpdatedRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch,
    string agreedValue
  );

  function createRequest (
    string memory _urlToQuery,
    string memory _attributeToFetch
  )
  public
  {
    uint length = requests.push(Request(currentId, _urlToQuery, _attributeToFetch, ""));
    Request storage r = requests[length-1];

    // Fest codierte Orakel-Adressen
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // ein Ereignis auslösen, das vom Orakel außerhalb der Blockchain erkannt wird
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // Anfrage-ID erhöhen
    currentId++;
  }

  // wird vom Orakel aufgerufen, um seine Antwort aufzuzeichnen
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    // prüfen, ob das Orakel in der Liste der vertrauenswürdigen Orakel ist
    // und ob das Orakel noch nicht abgestimmt hat
    if(currRequest.quorum[address(msg.sender)] == 1){

      // markiert, dass diese Adresse abgestimmt hat
      currRequest.quorum[msg.sender] = 2;

      // durch das "Array" der Antworten iterieren, bis eine Position frei ist, und den abgerufenen Wert speichern
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        // ersten leeren Platz finden
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      // durch die Orakel-Liste iterieren und prüfen, ob genügend Orakel (Mindestquorum)
      // für dieselbe Antwort wie die aktuelle abgestimmt haben
      for(uint i = 0; i < totalOracleCount; i++){
        bytes memory a = bytes(currRequest.answers[i]);
        bytes memory b = bytes(_valueRetrieved);

        if(keccak256(a) == keccak256(b)){
          currentQuorum++;
          if(currentQuorum >= minQuorum){
            currRequest.agreedValue = _valueRetrieved;
            emit UpdatedRequest (
              currRequest.id,
              currRequest.urlToQuery,
              currRequest.attributeToFetch,
              currRequest.agreedValue
            );
          }
        }
      }
    }
  }
}
```

### Orakel-Knoten {#oracle-nodes}

Der Orakel-Knoten ist die Off-Chain-Komponente des Orakel-Dienstes. Er extrahiert Informationen aus externen Quellen, wie z. B. APIs, die auf Servern von Drittanbietern gehostet werden, und stellt sie auf der Blockchain zur Nutzung durch Smart Contracts bereit. Orakel-Knoten lauschen auf Ereignisse vom Orakel-Vertrag auf der Blockchain und fahren fort, die im Protokoll beschriebene Aufgabe abzuschließen.

Eine häufige Aufgabe für Orakel-Knoten ist das Senden einer [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp)-Anfrage an einen API-Dienst, das Parsen der Antwort, um relevante Daten zu extrahieren, das Formatieren in eine Blockchain-lesbare Ausgabe und das Senden auf die Blockchain, indem sie in eine Transaktion an den Orakel-Vertrag aufgenommen wird. Der Orakel-Knoten kann auch aufgefordert werden, die Gültigkeit und Integrität der übermittelten Informationen mithilfe von „Authentizitätsnachweisen“ zu bestätigen, die wir später untersuchen werden.

Rechen-Orakel verlassen sich ebenfalls auf Off-Chain-Knoten, um Rechenaufgaben auszuführen, deren Ausführung auf der Blockchain angesichts von Gaskosten und Blockgrößenlimits unpraktisch wäre. Beispielsweise kann der Orakel-Knoten damit beauftragt werden, eine verifizierbar zufällige Zahl zu generieren (z. B. für Blockchain-basierte Spiele).

## Orakel-Entwurfsmuster {#oracle-design-patterns}

Orakel gibt es in verschiedenen Arten, einschließlich _Immediate-Read_, _Publish-Subscribe_ und _Request-Response_, wobei die letzteren beiden bei Ethereum-Smart-Contracts am beliebtesten sind. Hier beschreiben wir kurz die Publish-Subscribe- und Request-Response-Modelle.

### Publish-Subscribe-Orakel {#publish-subscribe-oracles}

Diese Art von Orakel stellt einen „Daten-Feed“ bereit, den andere Verträge regelmäßig auf Informationen lesen können. Es wird erwartet, dass sich die Daten in diesem Fall häufig ändern, sodass Client-Verträge auf Aktualisierungen der Daten im Speicher des Orakels lauschen müssen. Ein Beispiel ist ein Orakel, das den Nutzern die neuesten ETH-USD-Preisinformationen zur Verfügung stellt.

### Request-Response-Orakel {#request-response-oracles}

Ein Request-Response-Setup ermöglicht es dem Client-Vertrag, beliebige Daten anzufordern, die nicht von einem Publish-Subscribe-Orakel bereitgestellt werden. Request-Response-Orakel sind ideal, wenn der Datensatz zu groß ist, um im Speicher eines Smart Contracts gespeichert zu werden, und/oder Nutzer zu einem bestimmten Zeitpunkt nur einen kleinen Teil der Daten benötigen.

Obwohl sie komplexer als Publish-Subscribe-Modelle sind, sind Request-Response-Orakel im Grunde das, was wir im vorherigen Abschnitt beschrieben haben. Das Orakel verfügt über eine Komponente auf der Blockchain, die eine Datenanfrage empfängt und sie zur Verarbeitung an einen Off-Chain-Knoten weiterleitet.

Nutzer, die Datenabfragen initiieren, müssen die Kosten für das Abrufen von Informationen aus der Off-Chain-Quelle tragen. Der Client-Vertrag muss auch Geldmittel bereitstellen, um die Gaskosten zu decken, die dem Orakel-Vertrag bei der Rückgabe der Antwort über die in der Anfrage angegebene Callback-Funktion entstehen.

## Zentralisierte vs. dezentralisierte Orakel {#types-of-oracles}

### Zentralisierte Orakel {#centralized-oracles}

Ein zentralisiertes Orakel wird von einer einzigen Entität kontrolliert, die dafür verantwortlich ist, Off-Chain-Informationen zu aggregieren und die Daten des Orakel-Vertrags wie angefordert zu aktualisieren. Zentralisierte Orakel sind effizient, da sie sich auf eine einzige Quelle der Wahrheit verlassen. Sie funktionieren möglicherweise besser in Fällen, in denen proprietäre Datensätze direkt vom Eigentümer mit einer weithin akzeptierten Signatur veröffentlicht werden. Sie bringen jedoch auch Nachteile mit sich:

#### Geringe Korrektheitsgarantien {#low-correctness-guarantees}

Bei zentralisierten Orakeln gibt es keine Möglichkeit zu bestätigen, ob die bereitgestellten Informationen korrekt sind oder nicht. Selbst „seriöse“ Anbieter können bösartig handeln oder gehackt werden. Wenn das Orakel korrumpiert wird, werden Smart Contracts basierend auf fehlerhaften Daten ausgeführt.

#### Schlechte Verfügbarkeit {#poor-availability}

Bei zentralisierten Orakeln ist nicht garantiert, dass sie anderen Smart Contracts immer Off-Chain-Daten zur Verfügung stellen. Wenn der Anbieter beschließt, den Dienst abzuschalten, oder ein Hacker die Off-Chain-Komponente des Orakels kapert, ist Ihr Smart Contract dem Risiko eines Denial-of-Service-Angriffs (DoS) ausgesetzt.

#### Schlechte Anreizkompatibilität {#poor-incentive-compatibility}

Zentralisierte Orakel haben oft schlecht gestaltete oder nicht vorhandene Anreize für den Datenanbieter, genaue/unveränderte Informationen zu senden. Ein Orakel für Korrektheit zu bezahlen, garantiert keine Ehrlichkeit. Dieses Problem wird größer, je mehr Wert durch Smart Contracts kontrolliert wird.

### Dezentralisierte Orakel {#decentralized-oracles}

Dezentralisierte Orakel sind so konzipiert, dass sie die Einschränkungen zentralisierter Orakel überwinden, indem sie Single Points of Failure eliminieren. Ein dezentralisierter Orakel-Dienst umfasst mehrere Teilnehmer in einem Peer-to-Peer-Netzwerk, die einen Konsens über Off-Chain-Daten bilden, bevor sie diese an einen Smart Contract senden.

Ein dezentralisiertes Orakel sollte (idealerweise) erlaubnisfrei, vertrauenslos und frei von der Verwaltung durch eine zentrale Partei sein; in der Realität bewegt sich die Dezentralisierung bei Orakeln auf einem Spektrum. Es gibt semi-dezentralisierte Orakel-Netzwerke, an denen jeder teilnehmen kann, jedoch mit einem „Eigentümer“, der Blockchain-Knoten basierend auf der historischen Leistung genehmigt und entfernt. Es gibt auch vollständig dezentralisierte Orakel-Netzwerke: Diese laufen normalerweise als eigenständige Blockchains und haben definierte Konsensmechanismen zur Koordinierung von Blockchain-Knoten und zur Bestrafung von Fehlverhalten.

Die Verwendung dezentralisierter Orakel bietet die folgenden Vorteile:

### Hohe Korrektheitsgarantien {#high-correctness-guarantees}

Dezentralisierte Orakel versuchen, die Korrektheit von Daten mit verschiedenen Ansätzen zu erreichen. Dazu gehört die Verwendung von Nachweisen, die die Authentizität und Integrität der zurückgegebenen Informationen bestätigen, und die Anforderung, dass sich mehrere Entitäten kollektiv auf die Gültigkeit von Off-Chain-Daten einigen.

#### Authentizitätsnachweise {#authenticity-proofs}

Authentizitätsnachweise sind kryptografische Mechanismen, die eine unabhängige Überprüfung von Informationen ermöglichen, die aus externen Quellen abgerufen wurden. Diese Nachweise können die Quelle der Informationen validieren und mögliche Änderungen an den Daten nach dem Abruf erkennen.

Beispiele für Authentizitätsnachweise sind:

**Transport Layer Security (TLS)-Nachweise**: Orakel-Knoten rufen Daten aus externen Quellen häufig über eine sichere HTTP-Verbindung basierend auf dem Transport Layer Security (TLS)-Protokoll ab. Einige dezentralisierte Orakel verwenden Authentizitätsnachweise, um TLS-Sitzungen zu verifizieren (d. h. den Informationsaustausch zwischen einem Blockchain-Knoten und einem bestimmten Server zu bestätigen) und zu bestätigen, dass der Inhalt der Sitzung nicht verändert wurde.

**Trusted Execution Environment (TEE)-Bestätigungen**: Eine [Trusted Execution Environment](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) ist eine in einer Sandbox ausgeführte Rechenumgebung, die von den operativen Prozessen ihres Host-Systems isoliert ist. TEEs stellen sicher, dass jeglicher Anwendungscode oder Daten, die in der Rechenumgebung gespeichert/verwendet werden, ihre Integrität, Vertraulichkeit und Unveränderlichkeit behalten. Nutzer können auch eine Bestätigung generieren, um zu beweisen, dass eine Anwendungsinstanz innerhalb der Trusted Execution Environment ausgeführt wird.

Bestimmte Klassen dezentralisierter Orakel verlangen von Orakel-Knotenbetreibern die Bereitstellung von TEE-Bestätigungen. Dies bestätigt einem Nutzer, dass der Knotenbetreiber eine Instanz des Orakel-Clients in einer Trusted Execution Environment ausführt. TEEs verhindern, dass externe Prozesse den Code und die Daten einer Anwendung ändern oder lesen. Daher beweisen diese Bestätigungen, dass der Orakel-Knoten die Informationen intakt und vertraulich gehalten hat.

#### Konsensbasierte Validierung von Informationen {#consensus-based-validation-of-information}

Zentralisierte Orakel verlassen sich bei der Bereitstellung von Daten für Smart Contracts auf eine einzige Quelle der Wahrheit, was die Möglichkeit der Veröffentlichung ungenauer Informationen mit sich bringt. Dezentralisierte Orakel lösen dieses Problem, indem sie sich auf mehrere Orakel-Knoten verlassen, um Off-Chain-Informationen abzufragen. Durch den Vergleich von Daten aus mehreren Quellen verringern dezentralisierte Orakel das Risiko, ungültige Informationen an Verträge auf der Blockchain weiterzugeben.

Dezentralisierte Orakel müssen jedoch mit Diskrepanzen bei Informationen umgehen, die aus mehreren Off-Chain-Quellen abgerufen werden. Um Informationsunterschiede zu minimieren und sicherzustellen, dass die an den Orakel-Vertrag weitergegebenen Daten die kollektive Meinung der Orakel-Knoten widerspiegeln, verwenden dezentralisierte Orakel die folgenden Mechanismen:

##### Abstimmung/Staking über die Genauigkeit von Daten

Einige dezentralisierte Orakel-Netzwerke verlangen von den Teilnehmern, dass sie über die Genauigkeit von Antworten auf Datenabfragen (z. B. „Wer hat die US-Wahl 2020 gewonnen?“) unter Verwendung des nativen Tokens des Netzwerks abstimmen oder Staking betreiben. Ein Aggregationsprotokoll aggregiert dann die Stimmen und Einsätze und nimmt die von der Mehrheit unterstützte Antwort als die gültige an.

Blockchain-Knoten, deren Antworten von der Mehrheitsantwort abweichen, werden bestraft, indem ihre Token an andere verteilt werden, die korrektere Werte liefern. Die Verpflichtung von Blockchain-Knoten, eine Kaution zu hinterlegen, bevor sie Daten bereitstellen, schafft Anreize für ehrliche Antworten, da davon ausgegangen wird, dass sie rationale wirtschaftliche Akteure sind, die auf die Maximierung der Rendite bedacht sind.

Staking/Abstimmung schützt dezentralisierte Orakel auch vor [Sybil-Angriffen](/glossary/#sybil-attack), bei denen böswillige Akteure mehrere Identitäten erstellen, um das Konsenssystem auszutricksen. Staking kann jedoch „Trittbrettfahren“ (Orakel-Knoten kopieren Informationen von anderen) und „faule Validierung“ (Orakel-Knoten folgen der Mehrheit, ohne die Informationen selbst zu überprüfen) nicht verhindern.

##### Schelling-Punkt-Mechanismen

Der [Schelling-Punkt](<https://en.wikipedia.org/wiki/Focal_point_(game_theory)>) ist ein spieltheoretisches Konzept, das davon ausgeht, dass mehrere Entitäten in Abwesenheit jeglicher Kommunikation immer auf eine gemeinsame Lösung für ein Problem zurückgreifen. Schelling-Punkt-Mechanismen werden häufig in dezentralisierten Orakel-Netzwerken verwendet, um es Blockchain-Knoten zu ermöglichen, einen Konsens über Antworten auf Datenanfragen zu erzielen.

Eine frühe Idee dafür war [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed), ein vorgeschlagener Daten-Feed, bei dem Teilnehmer Antworten auf „skalare“ Fragen (Fragen, deren Antworten durch eine Größenordnung beschrieben werden, z. B. „Wie hoch ist der Preis von ETH?“) zusammen mit einer Einzahlung einreichen. Nutzer, die Werte zwischen dem 25. und 75. [Perzentil](https://en.wikipedia.org/wiki/Percentile) angeben, werden belohnt, während diejenigen, deren Werte stark vom Medianwert abweichen, bestraft werden.

Obwohl SchellingCoin heute nicht mehr existiert, verwenden eine Reihe dezentralisierter Orakel – insbesondere die [Orakel des Maker-Protokolls](https://docs.makerdao.com/smart-contract-modules/oracle-module) – den Schelling-Punkt-Mechanismus, um die Genauigkeit von Orakel-Daten zu verbessern. Jedes Maker-Orakel besteht aus einem Off-Chain-P2P-Netzwerk von Blockchain-Knoten („Relayers“ und „Feeds“), die Marktpreise für Sicherheitenwerte übermitteln, und einem „Medianizer“-Vertrag auf der Blockchain, der den Median aller bereitgestellten Werte berechnet. Sobald die angegebene Verzögerungszeit abgelaufen ist, wird dieser Medianwert zum neuen Referenzpreis für den zugehörigen Vermögenswert.

Weitere Beispiele für Orakel, die Schelling-Punkt-Mechanismen verwenden, sind [Chainlink Offchain Reporting](https://docs.chain.link/architecture-overview/off-chain-reporting) und [Witnet](https://witnet.io/). In beiden Systemen werden Antworten von Orakel-Knoten im Peer-to-Peer-Netzwerk zu einem einzigen aggregierten Wert, wie z. B. einem Mittelwert oder Median, aggregiert. Blockchain-Knoten werden danach belohnt oder bestraft, inwieweit ihre Antworten mit dem aggregierten Wert übereinstimmen oder davon abweichen.

Schelling-Punkt-Mechanismen sind attraktiv, weil sie den Fußabdruck auf der Blockchain minimieren (es muss nur eine Transaktion gesendet werden) und gleichzeitig Dezentralisierung garantieren. Letzteres ist möglich, weil Blockchain-Knoten die Liste der eingereichten Antworten abzeichnen müssen, bevor sie in den Algorithmus eingespeist wird, der den Mittelwert/Medianwert erzeugt.

### Verfügbarkeit {#availability}

Dezentralisierte Orakel-Dienste gewährleisten eine hohe Verfügbarkeit von Off-Chain-Daten für Smart Contracts. Dies wird erreicht, indem sowohl die Quelle der Off-Chain-Informationen als auch die Blockchain-Knoten, die für die Übertragung der Informationen auf die Blockchain verantwortlich sind, dezentralisiert werden.

Dies gewährleistet Fehlertoleranz, da sich der Orakel-Vertrag auf mehrere Blockchain-Knoten (die sich ebenfalls auf mehrere Datenquellen verlassen) verlassen kann, um Abfragen von anderen Verträgen auszuführen. Dezentralisierung auf der Ebene der Quelle _und_ der Knotenbetreiber ist entscheidend – ein Netzwerk von Orakel-Knoten, das Informationen bereitstellt, die aus derselben Quelle abgerufen wurden, wird auf dasselbe Problem stoßen wie ein zentralisiertes Orakel.

Es ist auch möglich, dass Stake-basierte Orakel Knotenbetreiber durch Slashing bestrafen, die nicht schnell auf Datenanfragen reagieren. Dies bietet Orakel-Knoten einen erheblichen Anreiz, in fehlertolerante Infrastruktur zu investieren und Daten zeitnah bereitzustellen.

### Gute Anreizkompatibilität {#good-incentive-compatibility}

Dezentralisierte Orakel implementieren verschiedene Anreizdesigns, um [byzantinisches](https://en.wikipedia.org/wiki/Byzantine_fault) Verhalten unter Orakel-Knoten zu verhindern. Insbesondere erreichen sie _Zurechenbarkeit_ und _Verantwortlichkeit_:

1. Dezentralisierte Orakel-Knoten müssen häufig die Daten signieren, die sie als Antwort auf Datenanfragen bereitstellen. Diese Informationen helfen bei der Bewertung der historischen Leistung von Orakel-Knoten, sodass Nutzer unzuverlässige Orakel-Knoten bei Datenanfragen herausfiltern können. Ein Beispiel ist das [Algorithmic Reputation System](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system) von Witnet.

2. Dezentralisierte Orakel können – wie bereits erläutert – von Blockchain-Knoten verlangen, einen Einsatz (Stake) auf ihr Vertrauen in die Wahrheit der von ihnen übermittelten Daten zu platzieren. Wenn sich die Behauptung als richtig erweist, kann dieser Einsatz zusammen mit Belohnungen für ehrlichen Service zurückgegeben werden. Er kann jedoch auch durch Slashing bestraft werden, falls die Informationen falsch sind, was ein gewisses Maß an Verantwortlichkeit bietet.

## Anwendungen von Orakeln in Smart Contracts {#applications-of-oracles-in-smart-contracts}

Im Folgenden sind häufige Anwendungsfälle für Orakel in Ethereum aufgeführt:

### Abrufen von Finanzdaten {#retrieving-financial-data}

Anwendungen für [Dezentralisierte Finanzen](/defi/) (DeFi) ermöglichen das Peer-to-Peer-Verleihen, -Ausleihen und -Handeln von Vermögenswerten. Dies erfordert häufig das Abrufen verschiedener Finanzinformationen, einschließlich Wechselkursdaten (zur Berechnung des Fiat-Werts von Kryptowährungen oder zum Vergleich von Token-Preisen) und Kapitalmarktdaten (zur Berechnung des Werts von tokenisierten Vermögenswerten wie Gold oder dem US-Dollar).

Ein DeFi-Kreditprotokoll muss beispielsweise aktuelle Marktpreise für Vermögenswerte (z. B. ETH) abfragen, die als Sicherheit hinterlegt sind. Dadurch kann der Vertrag den Wert der Sicherheitenwerte bestimmen und festlegen, wie viel er aus dem System leihen kann.

Beliebte „Preis-Orakel“ (wie sie oft genannt werden) in DeFi umfassen Chainlink Price Feeds, den [Open Price Feed](https://compound.finance/docs/prices) des Compound-Protokolls, die [Time-Weighted Average Prices (TWAPs)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) von Uniswap und [Maker-Orakel](https://docs.makerdao.com/smart-contract-modules/oracle-module).

Entwickler sollten die Vorbehalte verstehen, die mit diesen Preis-Orakeln einhergehen, bevor sie sie in ihr Projekt integrieren. Dieser [Artikel](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/) bietet eine detaillierte Analyse dessen, was bei der Planung der Verwendung eines der genannten Preis-Orakel zu beachten ist.

Unten ist ein Beispiel dafür, wie Sie den neuesten ETH-Preis in Ihrem Smart Contract mithilfe eines Chainlink-Preis-Feeds abrufen können:

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /* *
     * Netzwerk: Kovan
     * Aggregator: ETH/USD
     * Adresse: 0x9326BFA02ADD2366b30bacB125260Af641031331 */
    




    constructor() public {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /* *
     * Gibt den neuesten Preis zurück */
    


    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}
```

### Generierung verifizierbarer Zufälligkeit {#generating-verifiable-randomness}

Bestimmte Blockchain-Anwendungen, wie z. B. Blockchain-basierte Spiele oder Lotteriesysteme, erfordern ein hohes Maß an Unvorhersehbarkeit und Zufälligkeit, um effektiv zu funktionieren. Die deterministische Ausführung von Blockchains eliminiert jedoch die Zufälligkeit.

Der ursprüngliche Ansatz bestand darin, pseudozufällige kryptografische Funktionen wie `blockhash` zu verwenden, aber diese konnten [von Minern manipuliert werden](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.), die den Proof-of-Work-Algorithmus lösten. Außerdem bedeutet Ethereums [Wechsel zu Proof-of-Stake](/roadmap/merge/), dass sich Entwickler für Zufälligkeit auf der Blockchain nicht mehr auf `blockhash` verlassen können. Der [RANDAO-Mechanismus](https://eth2book.info/altair/part2/building_blocks/randomness) der Beacon Chain bietet stattdessen eine alternative Quelle für Zufälligkeit.

Es ist möglich, den Zufallswert Off-Chain zu generieren und ihn auf die Blockchain zu senden, aber dies stellt hohe Vertrauensanforderungen an die Nutzer. Sie müssen glauben, dass der Wert wirklich über unvorhersehbare Mechanismen generiert und während der Übertragung nicht verändert wurde.

Orakel, die für Off-Chain-Berechnungen entwickelt wurden, lösen dieses Problem, indem sie Off-Chain sicher zufällige Ergebnisse generieren, die sie zusammen mit kryptografischen Nachweisen, die die Unvorhersehbarkeit des Prozesses bestätigen, auf die Blockchain übertragen. Ein Beispiel ist [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/) (Verifiable Random Function), ein nachweislich fairer und manipulationssicherer Zufallszahlengenerator (RNG), der nützlich ist, um zuverlässige Smart Contracts für Anwendungen zu erstellen, die auf unvorhersehbare Ergebnisse angewiesen sind.

### Ergebnisse für Ereignisse erhalten {#getting-outcomes-for-events}

Mit Orakeln ist die Erstellung von Smart Contracts, die auf reale Ereignisse reagieren, einfach. Orakel-Dienste machen dies möglich, indem sie es Verträgen erlauben, sich über Off-Chain-Komponenten mit externen APIs zu verbinden und Informationen aus diesen Datenquellen zu nutzen. Beispielsweise kann die zuvor erwähnte Prognose-Dapp ein Orakel anfordern, um Wahlergebnisse aus einer vertrauenswürdigen Off-Chain-Quelle (z. B. der Associated Press) zurückzugeben.

Die Verwendung von Orakeln zum Abrufen von Daten basierend auf realen Ergebnissen ermöglicht weitere neuartige Anwendungsfälle; beispielsweise benötigt ein dezentralisiertes Versicherungsprodukt genaue Informationen über Wetter, Katastrophen usw., um effektiv zu funktionieren.

### Automatisierung von Smart Contracts {#automating-smart-contracts}

Smart Contracts laufen nicht automatisch ab; vielmehr muss ein extern verwaltetes Konto (EOA) oder ein anderes Vertragskonto die richtigen Funktionen auslösen, um den Code des Vertrags auszuführen. In den meisten Fällen ist der Großteil der Funktionen des Vertrags öffentlich und kann von EOAs und anderen Verträgen aufgerufen werden.

Es gibt jedoch auch _private Funktionen_ innerhalb eines Vertrags, die für andere unzugänglich sind, aber für die Gesamtfunktionalität einer Dapp von entscheidender Bedeutung sind. Beispiele hierfür sind eine `mintERC721Token()`-Funktion, die regelmäßig neue NFTs für Nutzer prägt, eine Funktion zur Gewährung von Auszahlungen in einem Prognosemarkt oder eine Funktion zum Entsperren von gestakten Token in einer dezentralisierten Börse (DEX).

Entwickler müssen solche Funktionen in regelmäßigen Abständen auslösen, damit die Anwendung reibungslos läuft. Dies könnte jedoch dazu führen, dass Entwickler mehr Stunden mit alltäglichen Aufgaben verlieren, weshalb die Automatisierung der Ausführung von Smart Contracts attraktiv ist.

Einige dezentralisierte Orakel-Netzwerke bieten Automatisierungsdienste an, die es Off-Chain-Orakel-Knoten ermöglichen, Smart-Contract-Funktionen gemäß den vom Nutzer definierten Parametern auszulösen. Typischerweise erfordert dies die „Registrierung“ des Zielvertrags beim Orakel-Dienst, die Bereitstellung von Geldmitteln zur Bezahlung des Orakel-Betreibers und die Angabe der Bedingungen oder Zeiten zum Auslösen des Vertrags.

Das [Keeper Network](https://chain.link/keepers) von Chainlink bietet Optionen für Smart Contracts, um regelmäßige Wartungsaufgaben auf vertrauensminimierte und dezentralisierte Weise auszulagern. Lesen Sie die offizielle [Keeper-Dokumentation](https://docs.chain.link/docs/chainlink-keepers/introduction/) für Informationen darüber, wie Sie Ihren Vertrag Keeper-kompatibel machen und den Upkeep-Dienst nutzen können.

## Wie man Blockchain-Orakel verwendet {#use-blockchain-oracles}

Es gibt mehrere Orakel-Anwendungen, die Sie in Ihre Ethereum-Dapp integrieren können:

**[Chainlink](https://chain.link/)** – _Dezentralisierte Orakel-Netzwerke von Chainlink bieten manipulationssichere Eingaben, Ausgaben und Berechnungen zur Unterstützung fortschrittlicher Smart Contracts auf jeder Blockchain._

**[RedStone Oracles](https://redstone.finance/)** – _RedStone ist ein dezentralisiertes modulares Orakel, das gasoptimierte Daten-Feeds bereitstellt. Es ist darauf spezialisiert, Preis-Feeds für aufstrebende Vermögenswerte wie Liquid Staking Tokens (LSTs), Liquid Restaking Tokens (LRTs) und Bitcoin-Staking-Derivate anzubieten._

**[Chronicle](https://chroniclelabs.org/)** – _Chronicle überwindet die aktuellen Einschränkungen der Datenübertragung auf der Blockchain durch die Entwicklung wirklich skalierbarer, kosteneffizienter, dezentralisierter und verifizierbarer Orakel._

**[Witnet](https://witnet.io/)** – _Witnet ist ein erlaubnisfreies, dezentralisiertes und zensurresistentes Orakel, das Smart Contracts hilft, auf reale Ereignisse mit starken kryptoökonomischen Garantien zu reagieren._

**[UMA Oracle](https://uma.xyz)** – _Das optimistische Orakel von UMA ermöglicht es Smart Contracts, schnell jede Art von Daten für verschiedene Anwendungen zu empfangen, einschließlich Versicherungen, Finanzderivaten und Prognosemärkten._

**[Tellor](https://tellor.io/)** – _Tellor ist ein transparentes und erlaubnisfreies Orakel-Protokoll für Ihren Smart Contract, um problemlos alle Daten zu erhalten, wann immer er sie benötigt._

**[Band Protocol](https://bandprotocol.com/)** – _Band Protocol ist eine kettenübergreifende Daten-Orakel-Plattform, die reale Daten und APIs aggregiert und mit Smart Contracts verbindet._

**[Pyth Network](https://pyth.network/)** – _Das Pyth-Netzwerk ist ein First-Party-Finanz-Orakel-Netzwerk, das entwickelt wurde, um kontinuierliche reale Daten auf der Blockchain in einer manipulationssicheren, dezentralisierten und selbsterhaltenden Umgebung zu veröffentlichen._

**[API3 DAO](https://www.api3.org/)** – _API3 DAO liefert First-Party-Orakel-Lösungen, die eine größere Quellentransparenz, Sicherheit und Skalierbarkeit in einer dezentralisierten Lösung für Smart Contracts bieten._

**[Supra](https://supra.com/)** – Ein vertikal integriertes Toolkit kettenübergreifender Lösungen, das alle Blockchains, ob öffentlich (L1s und L2s) oder privat (Unternehmen), miteinander verbindet und dezentralisierte Orakel-Preis-Feeds bereitstellt, die für Anwendungsfälle auf der Blockchain und Off-Chain verwendet werden können. 

**[Gas Network](https://gas.network/)** – Eine verteilte Orakel-Plattform, die Echtzeit-Gaspreisdaten über Blockchains hinweg bereitstellt. Indem Daten von führenden Gaspreisdatenanbietern auf die Blockchain gebracht werden, trägt Gas Network dazu bei, die Interoperabilität voranzutreiben. Gas Network unterstützt Daten für über 35 Chains, einschließlich des Ethereum-Mainnets und vieler führender L2s.

**[DIA](https://www.diadata.org/)** – Ein kettenübergreifendes Orakel-Netzwerk, das verifizierbare Daten-Feeds für über 20.000 Vermögenswerte in allen wichtigen Anlageklassen liefert. DIA bezieht rohe Handelsdaten direkt von über 100 Primärmärkten und berechnet sie auf der Blockchain, wodurch vollständige Datentransparenz und Verifizierbarkeit mit benutzerdefinierten Konfigurationen für jeden Anwendungsfall gewährleistet werden.

**[Stork](https://stork.network)** – Stork liefert Preisdaten mit extrem niedriger Latenz und unterstützt eine breite Palette von Anwendungsfällen, einschließlich Perpetuals-Märkten, Kreditprotokollen und DeFi-Ökosystemen, wobei neue Vermögenswerte bei der Notierung schnell unterstützt werden.

## Weiterführende Literatur {#further-reading}

**Artikel**

- [What Is a Blockchain Oracle?](https://chain.link/education/blockchain-oracles) – _Chainlink_
- [What is a Blockchain Oracle?](https://medium.com/better-programming/what-is-a-blockchain-oracle-f5ccab8dbd72) – _Patrick Collins_
- [Decentralised Oracles: a comprehensive overview](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) – _Julien Thevenard_
- [Implementing a Blockchain Oracle on Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Why can't smart contracts make API calls?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) – _StackExchange_
- [So you want to use a price oracle](https://samczsun.com/so-you-want-to-use-a-price-oracle/) – _samczsun_

**Videos**

- [Oracles and the Expansion of Blockchain Utility](https://youtu.be/BVUZpWa8vpw) – _Real Vision Finance_

**Tutorials**

- [How to Fetch the Current Price of Ethereum in Solidity](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) – _Chainlink_
- [Consuming Oracle Data](https://docs.chroniclelabs.org/Developers/tutorials/Remix) – _Chronicle_ 

**Beispielprojekte**

- [Full Chainlink starter project for Ethereum in Solidity](https://github.com/hackbg/chainlink-fullstack) – _HackBG_