---
title: Orakel
description: "Orakel bieten Ethereum-Smart-Contracts Zugang zu realen Daten, was mehr Anwendungsfälle und einen größeren Mehrwert für die Nutzer erschließt."
lang: de
authors: ["Patrick Collins"]
---

Orakel sind Anwendungen, die Daten-Feeds erstellen, welche offchain Datenquellen für die Blockchain und Smart Contracts verfügbar machen. Dies ist notwendig, da Ethereum-basierte Smart Contracts standardmäßig nicht auf Informationen zugreifen können, die außerhalb des Blockchain-Netzwerks gespeichert sind.

Smart Contracts die Fähigkeit zu geben, unter Verwendung von offchain Daten ausgeführt zu werden, erweitert den Nutzen und Wert von dezentralen Anwendungen (Dapps). Zum Beispiel sind Onchain-Prognosemärkte auf Orakel angewiesen, um Informationen über Ergebnisse bereitzustellen, die sie zur Validierung von Nutzerprognosen verwenden. Angenommen, Alice wettet 20 ETH darauf, wer der nächste US-Präsident wird. In diesem Fall benötigt die Prognosemarkt-Dapp ein Orakel, um die Wahlergebnisse zu bestätigen und festzustellen, ob Alice Anspruch auf eine Auszahlung hat.

## Voraussetzungen {#prerequisites}

Diese Seite setzt voraus, dass der Leser mit den Grundlagen von [Ethereum](/) vertraut ist, einschließlich [Knoten](/developers/docs/nodes-and-clients/), [Konsensmechanismen](/developers/docs/consensus-mechanisms/) und der [EVM](/developers/docs/evm/). Sie sollten auch ein gutes Verständnis von [Smart Contracts](/developers/docs/smart-contracts/) und der [Anatomie von Smart Contracts](/developers/docs/smart-contracts/anatomy/) haben, insbesondere von [Ereignissen](/glossary/#events).

## Was ist ein Blockchain-Orakel? {#what-is-a-blockchain-oracle}

Orakel sind Anwendungen, die externe Informationen (d. h. offchain gespeicherte Informationen) beschaffen, verifizieren und an Smart Contracts übertragen, die auf der Blockchain laufen. Neben dem „Abrufen“ von offchain Daten und deren Übertragung auf Ethereum können Orakel auch Informationen von der Blockchain an externe Systeme „pushen“, z. B. das Entsperren eines intelligenten Schlosses, sobald der Nutzer eine Gebühr über eine Ethereum-Transaktion sendet.

Ohne ein Orakel wäre ein Smart Contract vollständig auf Onchain-Daten beschränkt.

Orakel unterscheiden sich basierend auf der Datenquelle (eine oder mehrere Quellen), den Vertrauensmodellen (zentralisiert oder dezentral) und der Systemarchitektur (Immediate-Read, Publish-Subscribe und Request-Response). Wir können Orakel auch danach unterscheiden, ob sie externe Daten zur Verwendung durch Onchain-Verträge abrufen (Eingabe-Orakel), Informationen von der Blockchain an die offchain Anwendungen senden (Ausgabe-Orakel) oder Rechenaufgaben offchain ausführen (Rechen-Orakel).

## Warum benötigen Smart Contracts Orakel? {#why-do-smart-contracts-need-oracles}

Viele Entwickler betrachten Smart Contracts als Code, der an bestimmten Adressen auf der Blockchain ausgeführt wird. Eine [allgemeinere Sichtweise auf Smart Contracts](/smart-contracts/) ist jedoch, dass es sich um selbstausführende Softwareprogramme handelt, die in der Lage sind, Vereinbarungen zwischen Parteien durchzusetzen, sobald bestimmte Bedingungen erfüllt sind – daher der Begriff „Smart Contracts“.

Die Verwendung von Smart Contracts zur Durchsetzung von Vereinbarungen zwischen Menschen ist jedoch nicht einfach, da Ethereum deterministisch ist. Ein [deterministisches System](https://en.wikipedia.org/wiki/Deterministic_algorithm) ist ein System, das bei einem anfänglichen Zustand und einer bestimmten Eingabe immer die gleichen Ergebnisse liefert, was bedeutet, dass es bei der Berechnung von Ausgaben aus Eingaben keine Zufälligkeit oder Variation gibt.

Um eine deterministische Ausführung zu erreichen, beschränken Blockchains Knoten darauf, einen Konsens über einfache binäre (wahr/falsch) Fragen zu erzielen, wobei _nur_ Daten verwendet werden, die auf der Blockchain selbst gespeichert sind. Beispiele für solche Fragen sind:

- „Hat der Kontoinhaber (identifiziert durch einen öffentlichen Schlüssel) diese Transaktion mit dem zugehörigen privaten Schlüssel signiert?“
- „Verfügt dieses Konto über genügend Guthaben, um die Transaktion zu decken?“
- „Ist diese Transaktion im Kontext dieses Smart Contracts gültig?“, usw.

Wenn Blockchains Informationen aus externen Quellen (d. h. aus der realen Welt) erhalten würden, wäre Determinismus unmöglich zu erreichen, was Knoten daran hindern würde, sich über die Gültigkeit von Änderungen am Zustand der Blockchain zu einigen. Nehmen wir zum Beispiel einen Smart Contract, der eine Transaktion basierend auf dem aktuellen ETH-USD-Wechselkurs ausführt, der von einer traditionellen Preis-API bezogen wird. Dieser Wert ändert sich wahrscheinlich häufig (ganz zu schweigen davon, dass die API veraltet sein oder gehackt werden könnte), was bedeutet, dass Knoten, die denselben Vertrags-Code ausführen, zu unterschiedlichen Ergebnissen kommen würden.

Für eine öffentliche Blockchain wie Ethereum, bei der Tausende von Knoten auf der ganzen Welt Transaktionen verarbeiten, ist Determinismus entscheidend. Da es keine zentrale Autorität gibt, die als Quelle der Wahrheit dient, benötigen Knoten Mechanismen, um nach der Anwendung derselben Transaktionen zum selben Zustand zu gelangen. Ein Fall, in dem Knoten A den Code eines Smart Contracts ausführt und als Ergebnis „3“ erhält, während Knoten B nach Ausführung derselben Transaktion „7“ erhält, würde dazu führen, dass der Konsens zusammenbricht und den Wert von Ethereum als dezentrale Rechenplattform zunichte macht.

Dieses Szenario verdeutlicht auch das Problem bei der Gestaltung von Blockchains, Informationen aus externen Quellen abzurufen. Orakel lösen dieses Problem jedoch, indem sie Informationen aus offchain Quellen beziehen und sie auf der Blockchain speichern, damit Smart Contracts sie nutzen können. Da Onchain gespeicherte Informationen Unveränderlichkeit aufweisen und öffentlich zugänglich sind, können Ethereum-Knoten die vom Orakel importierten offchain Daten sicher verwenden, um Zustandsänderungen zu berechnen, ohne den Konsens zu brechen.

Dazu besteht ein Orakel typischerweise aus einem Smart Contract, der Onchain läuft, und einigen offchain Komponenten. Der Onchain-Vertrag empfängt Datenanfragen von anderen Smart Contracts, die er an die offchain Komponente (Orakel-Knoten genannt) weiterleitet. Dieser Orakel-Knoten kann Datenquellen abfragen – zum Beispiel über APIs – und Transaktionen senden, um die angeforderten Daten im Speicher des Smart Contracts zu hinterlegen.

Im Wesentlichen überbrückt ein Blockchain-Orakel die Informationslücke zwischen der Blockchain und der externen Umgebung und schafft so „hybride Smart Contracts“. Ein hybrider Smart Contract funktioniert basierend auf einer Kombination aus Onchain-Vertragscode und offchain Infrastruktur. Dezentrale Prognosemärkte sind ein hervorragendes Beispiel für hybride Smart Contracts. Weitere Beispiele könnten Ernteversicherungs-Smart-Contracts sein, die auszahlen, wenn eine Reihe von Orakeln feststellt, dass bestimmte Wetterphänomene aufgetreten sind.

## Was ist das Orakel-Problem? {#the-oracle-problem}

Orakel lösen ein wichtiges Problem, bringen aber auch einige Komplikationen mit sich, z. B.:

- Wie überprüfen wir, ob die eingespeisten Informationen aus der richtigen Quelle stammen oder nicht manipuliert wurden?

- Wie stellen wir sicher, dass diese Daten immer verfügbar sind und regelmäßig aktualisiert werden?

Das sogenannte „Orakel-Problem“ veranschaulicht die Probleme, die mit der Verwendung von Blockchain-Orakeln zur Übermittlung von Eingaben an Smart Contracts einhergehen. Daten von einem Orakel müssen korrekt sein, damit ein Smart Contract korrekt ausgeführt wird. Darüber hinaus untergräbt die Notwendigkeit, Orakel-Betreibern zu „vertrauen“, dass sie genaue Informationen liefern, den vertrauenslosen Aspekt von Smart Contracts.

Verschiedene Orakel bieten unterschiedliche Lösungen für das Orakel-Problem, die wir später untersuchen werden. Orakel werden typischerweise danach bewertet, wie gut sie die folgenden Herausforderungen bewältigen können:

1. **Korrektheit**: Ein Orakel sollte nicht dazu führen, dass Smart Contracts Zustandsänderungen basierend auf ungültigen offchain Daten auslösen. Ein Orakel muss die _Authentizität_ und _Integrität_ der Daten garantieren. Authentizität bedeutet, dass die Daten aus der richtigen Quelle stammen, während Integrität bedeutet, dass die Daten intakt geblieben sind (d. h. nicht verändert wurden), bevor sie Onchain gesendet wurden.

2. **Verfügbarkeit**: Ein Orakel sollte Smart Contracts nicht verzögern oder daran hindern, Aktionen auszuführen und Zustandsänderungen auszulösen. Dies bedeutet, dass Daten von einem Orakel ohne Unterbrechung _auf Anfrage verfügbar_ sein müssen.

3. **Anreizkompatibilität**: Ein Orakel sollte offchain Datenanbietern Anreize bieten, korrekte Informationen an Smart Contracts zu übermitteln. Anreizkompatibilität umfasst _Zurechenbarkeit_ und _Verantwortlichkeit_. Zurechenbarkeit ermöglicht es, eine externe Information mit ihrem Anbieter zu verknüpfen, während Verantwortlichkeit Datenanbieter an die von ihnen bereitgestellten Informationen bindet, sodass sie basierend auf der Qualität der bereitgestellten Informationen belohnt oder bestraft werden können.

## Wie funktioniert ein Blockchain-Orakel-Dienst? {#how-does-a-blockchain-oracle-service-work}

### Nutzer {#users}

Nutzer sind Entitäten (d. h. Smart Contracts), die Informationen außerhalb der Blockchain benötigen, um bestimmte Aktionen abzuschließen. Der grundlegende Arbeitsablauf eines Orakel-Dienstes beginnt damit, dass der Nutzer eine Datenanfrage an den Orakel-Vertrag sendet. Datenanfragen beantworten in der Regel einige oder alle der folgenden Fragen:

1. Welche Quellen können offchain Knoten für die angeforderten Informationen konsultieren?

2. Wie verarbeiten Reporter Informationen aus Datenquellen und extrahieren nützliche Datenpunkte?

3. Wie viele Orakel-Knoten können an der Datenabfrage teilnehmen?

4. Wie sollen Diskrepanzen in Orakel-Berichten gehandhabt werden?

5. Welche Methode sollte bei der Filterung von Einreichungen und der Aggregation von Berichten zu einem einzigen Wert implementiert werden?

### Orakel-Vertrag {#oracle-contract}

Der Orakel-Vertrag ist die Onchain-Komponente für den Orakel-Dienst. Er lauscht auf Datenanfragen von anderen Verträgen, leitet Datenabfragen an Orakel-Knoten weiter und überträgt zurückgegebene Daten an Client-Verträge. Dieser Vertrag kann auch einige Berechnungen an den zurückgegebenen Datenpunkten durchführen, um einen aggregierten Wert zu erzeugen, der an den anfragenden Vertrag gesendet wird.

Der Orakel-Vertrag stellt einige Funktionen bereit, die Client-Verträge aufrufen, wenn sie eine Datenanfrage stellen. Nach Erhalt einer neuen Abfrage gibt der Smart Contract ein [Log-Ereignis](/developers/docs/smart-contracts/anatomy/#events-and-logs) mit Details zur Datenanfrage aus. Dies benachrichtigt offchain Knoten, die das Log abonniert haben (normalerweise mit etwas wie dem JSON-RPC-Befehl `eth_subscribe`), welche dann fortfahren, die im Log-Ereignis definierten Daten abzurufen.

Unten ist ein [Beispiel-Orakel-Vertrag](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) von Pedro Costa. Dies ist ein einfacher Orakel-Dienst, der auf Anfrage anderer Smart Contracts offchain APIs abfragen und die angeforderten Informationen auf der Blockchain speichern kann:

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //Liste der Anfragen, die an den Vertrag gestellt wurden
  uint currentId = 0; //Aufsteigende Anfrage-ID
  uint minQuorum = 2; //Mindestanzahl an Antworten, die empfangen werden müssen, bevor das Endergebnis deklariert wird
  uint totalOracleCount = 3; // Fest codierte Orakel-Anzahl

  // Definiert eine allgemeine API-Anfrage
  struct Request {
    uint id;                            //Anfrage-ID
    string urlToQuery;                  //API-URL
    string attributeToFetch;            //JSON-Attribut (Schlüssel), das in der Antwort abgerufen werden soll
    string agreedValue;                 //Wert des Schlüssels
    mapping(uint => string) answers;     //Von den Orakeln bereitgestellte Antworten
    mapping(address => uint) quorum;    //Orakel, die die Antwort abfragen werden (1=Orakel hat nicht abgestimmt, 2=Orakel hat abgestimmt)
  }

  //Ereignis, das ein Orakel außerhalb der Blockchain auslöst
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //Wird ausgelöst, wenn ein Konsens über das Endergebnis besteht
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

    // Fest codierte Orakel-Adresse
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // Ein Ereignis auslösen, das von einem Orakel außerhalb der Blockchain erkannt wird
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // Anfrage-ID erhöhen
    currentId++;
  }

  //Wird vom Orakel aufgerufen, um seine Antwort aufzuzeichnen
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //Prüfen, ob das Orakel in der Liste der vertrauenswürdigen Orakel ist
    //und ob das Orakel noch nicht abgestimmt hat
    if(currRequest.quorum[address(msg.sender)] == 1){

      //Markierung, dass diese Adresse abgestimmt hat
      currRequest.quorum[msg.sender] = 2;

      //Durch das "Array" der Antworten iterieren, bis eine Position frei ist, und den abgerufenen Wert speichern
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //Ersten leeren Platz finden
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //Durch die Orakel-Liste iterieren und prüfen, ob genügend Orakel (Mindestquorum)
      //für dieselbe Antwort wie die aktuelle abgestimmt haben
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

Der Orakel-Knoten ist die offchain Komponente des Orakel-Dienstes. Er extrahiert Informationen aus externen Quellen, wie z. B. APIs, die auf Servern von Drittanbietern gehostet werden, und stellt sie Onchain zur Nutzung durch Smart Contracts bereit. Orakel-Knoten lauschen auf Ereignisse vom Onchain-Orakel-Vertrag und fahren fort, die im Log beschriebene Aufgabe abzuschließen.

Eine häufige Aufgabe für Orakel-Knoten ist das Senden einer [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp)-Anfrage an einen API-Dienst, das Parsen der Antwort, um relevante Daten zu extrahieren, das Formatieren in eine Blockchain-lesbare Ausgabe und das Senden Onchain, indem sie in eine Transaktion an den Orakel-Vertrag aufgenommen wird. Der Orakel-Knoten kann auch aufgefordert werden, die Gültigkeit und Integrität der übermittelten Informationen mithilfe von „Authentizitätsnachweisen“ zu attestieren, die wir später untersuchen.

Rechen-Orakel verlassen sich ebenfalls auf offchain Knoten, um Rechenaufgaben auszuführen, die angesichts der Gas-Kosten und Blockgrößenbeschränkungen unpraktisch Onchain auszuführen wären. Zum Beispiel kann der Orakel-Knoten damit beauftragt werden, eine verifizierbar zufällige Zahl zu generieren (z. B. für Blockchain-basierte Spiele).

## Orakel-Entwurfsmuster {#oracle-design-patterns}

Orakel gibt es in verschiedenen Typen, einschließlich _Immediate-Read_, _Publish-Subscribe_ und _Request-Response_, wobei die beiden letzteren bei Ethereum-Smart-Contracts am beliebtesten sind. Hier beschreiben wir kurz die Publish-Subscribe- und Request-Response-Modelle.

### Publish-Subscribe-Orakel {#publish-subscribe-oracles}

Diese Art von Orakel stellt einen „Daten-Feed“ bereit, den andere Verträge regelmäßig auf Informationen lesen können. Es wird erwartet, dass sich die Daten in diesem Fall häufig ändern, sodass Client-Verträge auf Aktualisierungen der Daten im Speicher des Orakels lauschen müssen. Ein Beispiel ist ein Orakel, das Nutzern die neuesten ETH-USD-Preisinformationen zur Verfügung stellt.

### Request-Response-Orakel {#request-response-oracles}

Ein Request-Response-Setup ermöglicht es dem Client-Vertrag, beliebige Daten anzufordern, die nicht von einem Publish-Subscribe-Orakel bereitgestellt werden. Request-Response-Orakel sind ideal, wenn der Datensatz zu groß ist, um im Speicher eines Smart Contracts gespeichert zu werden, und/oder Nutzer zu einem bestimmten Zeitpunkt nur einen kleinen Teil der Daten benötigen.

Obwohl sie komplexer als Publish-Subscribe-Modelle sind, sind Request-Response-Orakel im Grunde das, was wir im vorherigen Abschnitt beschrieben haben. Das Orakel verfügt über eine Onchain-Komponente, die eine Datenanfrage empfängt und sie zur Verarbeitung an einen offchain Knoten weiterleitet.

Nutzer, die Datenabfragen initiieren, müssen die Kosten für den Abruf von Informationen aus der offchain Quelle tragen. Der Client-Vertrag muss auch Mittel bereitstellen, um die Gas-Kosten zu decken, die dem Orakel-Vertrag bei der Rückgabe der Antwort über die in der Anfrage angegebene Callback-Funktion entstehen.

## Zentralisierte vs. dezentrale Orakel {#types-of-oracles}

### Zentralisierte Orakel {#centralized-oracles}

Ein zentralisiertes Orakel wird von einer einzigen Entität kontrolliert, die dafür verantwortlich ist, offchain Informationen zu aggregieren und die Daten des Orakel-Vertrags wie angefordert zu aktualisieren. Zentralisierte Orakel sind effizient, da sie sich auf eine einzige Quelle der Wahrheit verlassen. Sie funktionieren möglicherweise besser in Fällen, in denen proprietäre Datensätze direkt vom Eigentümer mit einer weithin akzeptierten Signatur veröffentlicht werden. Sie bringen jedoch auch Nachteile mit sich:

#### Geringe Korrektheitsgarantien {#low-correctness-guarantees}

Bei zentralisierten Orakeln gibt es keine Möglichkeit zu bestätigen, ob die bereitgestellten Informationen korrekt sind oder nicht. Selbst „seriöse“ Anbieter können bösartig handeln oder gehackt werden. Wenn das Orakel korrumpiert wird, werden Smart Contracts basierend auf fehlerhaften Daten ausgeführt.

#### Schlechte Verfügbarkeit {#poor-availability}

Zentralisierte Orakel garantieren nicht, dass offchain Daten immer für andere Smart Contracts verfügbar gemacht werden. Wenn der Anbieter beschließt, den Dienst abzuschalten, oder ein Hacker die offchain Komponente des Orakels kapert, ist Ihr Smart Contract dem Risiko eines Denial-of-Service-Angriffs (DoS) ausgesetzt.

#### Schlechte Anreizkompatibilität {#poor-incentive-compatibility}

Zentralisierte Orakel haben oft schlecht gestaltete oder nicht vorhandene Anreize für den Datenanbieter, genaue/unveränderte Informationen zu senden. Ein Orakel für Korrektheit zu bezahlen, garantiert keine Ehrlichkeit. Dieses Problem wird größer, je mehr Wert durch Smart Contracts kontrolliert wird.

### Dezentrale Orakel {#decentralized-oracles}

Dezentrale Orakel sind so konzipiert, dass sie die Einschränkungen zentralisierter Orakel überwinden, indem sie Single Points of Failure eliminieren. Ein dezentraler Orakel-Dienst umfasst mehrere Teilnehmer in einem Peer-to-Peer-Netzwerk, die einen Konsens über offchain Daten bilden, bevor sie diese an einen Smart Contract senden.

Ein dezentrales Orakel sollte (idealerweise) erlaubnisfrei, vertrauenslos und frei von der Verwaltung durch eine zentrale Partei sein; in der Realität befindet sich die Dezentralisierung bei Orakeln auf einem Spektrum. Es gibt semi-dezentrale Orakel-Netzwerke, an denen jeder teilnehmen kann, jedoch mit einem „Eigentümer“, der Knoten basierend auf der historischen Leistung genehmigt und entfernt. Es gibt auch vollständig dezentrale Orakel-Netzwerke: Diese laufen normalerweise als eigenständige Blockchains und haben definierte Konsensmechanismen zur Koordinierung von Knoten und zur Bestrafung von Fehlverhalten.

Die Verwendung dezentraler Orakel bietet folgende Vorteile:

### Hohe Korrektheitsgarantien {#high-correctness-guarantees}

Dezentrale Orakel versuchen, die Korrektheit von Daten mit verschiedenen Ansätzen zu erreichen. Dazu gehört die Verwendung von Nachweisen, die die Authentizität und Integrität der zurückgegebenen Informationen attestieren, und die Anforderung, dass sich mehrere Entitäten kollektiv auf die Gültigkeit von offchain Daten einigen.

#### Authentizitätsnachweise {#authenticity-proofs}

Authentizitätsnachweise sind kryptografische Mechanismen, die eine unabhängige Überprüfung von Informationen ermöglichen, die aus externen Quellen abgerufen wurden. Diese Nachweise können die Quelle der Informationen validieren und mögliche Änderungen an den Daten nach dem Abruf erkennen.

Beispiele für Authentizitätsnachweise sind:

**Transport Layer Security (TLS)-Nachweise**: Orakel-Knoten rufen Daten aus externen Quellen häufig über eine sichere HTTP-Verbindung basierend auf dem Transport Layer Security (TLS)-Protokoll ab. Einige dezentrale Orakel verwenden Authentizitätsnachweise, um TLS-Sitzungen zu verifizieren (d. h. den Informationsaustausch zwischen einem Knoten und einem bestimmten Server zu bestätigen) und zu bestätigen, dass der Inhalt der Sitzung nicht verändert wurde.

**Trusted Execution Environment (TEE)-Attestierungen**: Eine [Trusted Execution Environment](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) ist eine Sandbox-Rechenumgebung, die von den operativen Prozessen ihres Host-Systems isoliert ist. TEEs stellen sicher, dass jeglicher Anwendungscode oder Daten, die in der Rechenumgebung gespeichert/verwendet werden, ihre Integrität, Vertraulichkeit und Unveränderlichkeit behalten. Nutzer können auch eine Attestierung generieren, um zu beweisen, dass eine Anwendungsinstanz innerhalb der Trusted Execution Environment ausgeführt wird.

Bestimmte Klassen dezentraler Orakel verlangen von Orakel-Knotenbetreibern die Bereitstellung von TEE-Attestierungen. Dies bestätigt einem Nutzer, dass der Knotenbetreiber eine Instanz des Orakel-Clients in einer Trusted Execution Environment ausführt. TEEs verhindern, dass externe Prozesse den Code und die Daten einer Anwendung ändern oder lesen. Daher beweisen diese Attestierungen, dass der Orakel-Knoten die Informationen intakt und vertraulich gehalten hat.

#### Konsensbasierte Validierung von Informationen {#consensus-based-validation-of-information}

Zentralisierte Orakel verlassen sich bei der Bereitstellung von Daten für Smart Contracts auf eine einzige Quelle der Wahrheit, was die Möglichkeit der Veröffentlichung ungenauer Informationen mit sich bringt. Dezentrale Orakel lösen dieses Problem, indem sie sich auf mehrere Orakel-Knoten verlassen, um offchain Informationen abzufragen. Durch den Vergleich von Daten aus mehreren Quellen verringern dezentrale Orakel das Risiko, ungültige Informationen an Onchain-Verträge weiterzugeben.

Dezentrale Orakel müssen jedoch mit Diskrepanzen bei Informationen umgehen, die aus mehreren offchain Quellen abgerufen wurden. Um Informationsunterschiede zu minimieren und sicherzustellen, dass die an den Orakel-Vertrag weitergegebenen Daten die kollektive Meinung der Orakel-Knoten widerspiegeln, verwenden dezentrale Orakel die folgenden Mechanismen:

##### Abstimmen/Staking über die Genauigkeit von Daten

Einige dezentrale Orakel-Netzwerke verlangen von den Teilnehmern, dass sie mit dem nativen Token des Netzwerks über die Genauigkeit von Antworten auf Datenabfragen (z. B. „Wer hat die US-Wahl 2020 gewonnen?“) abstimmen oder staken. Ein Aggregationsprotokoll aggregiert dann die Stimmen und Stakes und nimmt die von der Mehrheit unterstützte Antwort als die gültige an.

Knoten, deren Antworten von der Mehrheitsantwort abweichen, werden bestraft, indem ihre Token an andere verteilt werden, die korrektere Werte liefern. Knoten zu zwingen, eine Kaution zu hinterlegen, bevor sie Daten bereitstellen, schafft Anreize für ehrliche Antworten, da davon ausgegangen wird, dass sie rationale wirtschaftliche Akteure sind, die auf die Maximierung der Rendite bedacht sind.

Staking/Abstimmen schützt dezentrale Orakel auch vor [Sybil-Angriffen](/glossary/#sybil-attack), bei denen böswillige Akteure mehrere Identitäten erstellen, um das Konsenssystem auszutricksen. Staking kann jedoch „Trittbrettfahren“ (Orakel-Knoten kopieren Informationen von anderen) und „faule Validierung“ (Orakel-Knoten folgen der Mehrheit, ohne die Informationen selbst zu überprüfen) nicht verhindern.

##### Schelling-Punkt-Mechanismen

Ein [Schelling-Punkt](<https://en.wikipedia.org/wiki/Focal_point_(game_theory)>) ist ein spieltheoretisches Konzept, das davon ausgeht, dass mehrere Entitäten in Abwesenheit jeglicher Kommunikation immer auf eine gemeinsame Lösung für ein Problem zurückgreifen. Schelling-Punkt-Mechanismen werden häufig in dezentralen Orakel-Netzwerken verwendet, um es Knoten zu ermöglichen, einen Konsens über Antworten auf Datenanfragen zu erzielen.

Eine frühe Idee dafür war [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed), ein vorgeschlagener Daten-Feed, bei dem Teilnehmer Antworten auf „skalare“ Fragen (Fragen, deren Antworten durch eine Größenordnung beschrieben werden, z. B. „Wie hoch ist der Preis von ETH?“) zusammen mit einer Einzahlung einreichen. Nutzer, die Werte zwischen dem 25. und 75. [Perzentil](https://en.wikipedia.org/wiki/Percentile) angeben, werden belohnt, während diejenigen, deren Werte stark vom Medianwert abweichen, bestraft werden.

Obwohl SchellingCoin heute nicht mehr existiert, verwenden eine Reihe dezentraler Orakel – insbesondere die [Orakel des Maker-Protokolls](https://docs.makerdao.com/smart-contract-modules/oracle-module) – den Schelling-Punkt-Mechanismus, um die Genauigkeit von Orakel-Daten zu verbessern. Jedes Maker-Orakel besteht aus einem offchain P2P-Netzwerk von Knoten („Relayer“ und „Feeds“), die Marktpreise für Sicherheiten einreichen, und einem Onchain-„Medianizer“-Vertrag, der den Median aller bereitgestellten Werte berechnet. Sobald die angegebene Verzögerungszeit abgelaufen ist, wird dieser Medianwert zum neuen Referenzpreis für den zugehörigen Vermögenswert.

Weitere Beispiele für Orakel, die Schelling-Punkt-Mechanismen verwenden, sind [Chainlink Offchain Reporting](https://docs.chain.link/architecture-overview/off-chain-reporting) und [Witnet](https://witnet.io/). In beiden Systemen werden Antworten von Orakel-Knoten im Peer-to-Peer-Netzwerk zu einem einzigen aggregierten Wert zusammengefasst, z. B. einem Mittelwert oder Median. Knoten werden belohnt oder bestraft, je nachdem, inwieweit ihre Antworten mit dem aggregierten Wert übereinstimmen oder davon abweichen.

Schelling-Punkt-Mechanismen sind attraktiv, weil sie den Onchain-Fußabdruck minimieren (es muss nur eine Transaktion gesendet werden) und gleichzeitig Dezentralisierung garantieren. Letzteres ist möglich, weil Knoten die Liste der eingereichten Antworten abzeichnen müssen, bevor sie in den Algorithmus eingespeist wird, der den Mittelwert/Medianwert erzeugt.

### Verfügbarkeit {#availability}

Dezentrale Orakel-Dienste gewährleisten eine hohe Verfügbarkeit von offchain Daten für Smart Contracts. Dies wird erreicht, indem sowohl die Quelle der offchain Informationen als auch die Knoten, die für die Übertragung der Informationen Onchain verantwortlich sind, dezentralisiert werden.

Dies gewährleistet Fehlertoleranz, da sich der Orakel-Vertrag auf mehrere Knoten (die sich ebenfalls auf mehrere Datenquellen verlassen) verlassen kann, um Abfragen von anderen Verträgen auszuführen. Dezentralisierung auf der Ebene der Quelle _und_ der Knotenbetreiber ist entscheidend – ein Netzwerk von Orakel-Knoten, das Informationen bereitstellt, die aus derselben Quelle abgerufen wurden, wird auf dasselbe Problem stoßen wie ein zentralisiertes Orakel.

Es ist auch möglich, dass Stake-basierte Orakel Knotenbetreiber durch Slashing bestrafen, die nicht schnell auf Datenanfragen reagieren. Dies schafft einen erheblichen Anreiz für Orakel-Knoten, in fehlertolerante Infrastruktur zu investieren und Daten zeitnah bereitzustellen.

### Gute Anreizkompatibilität {#good-incentive-compatibility}

Dezentrale Orakel implementieren verschiedene Anreizdesigns, um [byzantinisches](https://en.wikipedia.org/wiki/Byzantine_fault) Verhalten unter Orakel-Knoten zu verhindern. Insbesondere erreichen sie _Zurechenbarkeit_ und _Verantwortlichkeit_:

1. Dezentrale Orakel-Knoten müssen häufig die Daten signieren, die sie als Antwort auf Datenanfragen bereitstellen. Diese Informationen helfen bei der Bewertung der historischen Leistung von Orakel-Knoten, sodass Nutzer unzuverlässige Orakel-Knoten bei Datenanfragen herausfiltern können. Ein Beispiel ist das [Algorithmische Reputationssystem](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system) von Witnet.

2. Dezentrale Orakel können – wie bereits erläutert – von Knoten verlangen, einen Stake auf ihr Vertrauen in die Wahrheit der von ihnen übermittelten Daten zu platzieren. Wenn sich die Behauptung als richtig erweist, kann dieser Stake zusammen mit Belohnungen für ehrlichen Dienst zurückgegeben werden. Er kann jedoch auch durch Slashing bestraft werden, falls die Informationen falsch sind, was ein gewisses Maß an Verantwortlichkeit bietet.

## Anwendungen von Orakeln in Smart Contracts {#applications-of-oracles-in-smart-contracts}

Im Folgenden sind häufige Anwendungsfälle für Orakel in Ethereum aufgeführt:

### Abrufen von Finanzdaten {#retrieving-financial-data}

[Dezentralisierte Finanzen](/defi/) (DeFi)-Anwendungen ermöglichen Peer-to-Peer-Kreditvergabe, Kreditaufnahme und den Handel mit Vermögenswerten. Dies erfordert häufig die Beschaffung verschiedener Finanzinformationen, einschließlich Wechselkursdaten (zur Berechnung des Fiat-Werts von Kryptowährungen oder zum Vergleich von Token-Preisen) und Kapitalmarktdaten (zur Berechnung des Werts von tokenisierten Vermögenswerten wie Gold oder dem US-Dollar).

Ein DeFi-Kreditvergabeprotokoll muss beispielsweise aktuelle Marktpreise für Vermögenswerte (z. B. ETH) abfragen, die als Sicherheit hinterlegt sind. Dadurch kann der Vertrag den Wert der Sicherheiten bestimmen und festlegen, wie viel er vom System leihen kann.

Beliebte „Preis-Orakel“ (wie sie oft genannt werden) im DeFi-Bereich sind Chainlink Price Feeds, der [Open Price Feed](https://compound.finance/docs/prices) des Compound-Protokolls, die [Time-Weighted Average Prices (TWAPs)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) von Uniswap und [Maker-Orakel](https://docs.makerdao.com/smart-contract-modules/oracle-module).

Entwickler sollten die Vorbehalte verstehen, die mit diesen Preis-Orakeln einhergehen, bevor sie sie in ihr Projekt integrieren. Dieser [Artikel](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/) bietet eine detaillierte Analyse dessen, was bei der Planung der Verwendung eines der genannten Preis-Orakel zu beachten ist.

Unten finden Sie ein Beispiel dafür, wie Sie den neuesten ETH-Preis in Ihrem Smart Contract mithilfe eines Chainlink-Preis-Feeds abrufen können:

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Netzwerk: Kovan
     * Aggregator: ETH/USD
     * Adresse: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /**
     * Gibt den neuesten Preis zurück
     */
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

Bestimmte Blockchain-Anwendungen, wie Blockchain-basierte Spiele oder Lotteriesysteme, erfordern ein hohes Maß an Unvorhersehbarkeit und Zufälligkeit, um effektiv zu funktionieren. Die deterministische Ausführung von Blockchains eliminiert jedoch die Zufälligkeit.

Der ursprüngliche Ansatz bestand darin, pseudozufällige kryptografische Funktionen wie `blockhash` zu verwenden, aber diese konnten von Minern [manipuliert werden](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.), die den Proof-of-Work-Algorithmus lösten. Außerdem bedeutet Ethereums [Wechsel zu Proof-of-Stake](/roadmap/merge/), dass sich Entwickler für Onchain-Zufälligkeit nicht mehr auf `blockhash` verlassen können. Der [RANDAO-Mechanismus](https://eth2book.info/altair/part2/building_blocks/randomness) der Beacon Chain bietet stattdessen eine alternative Quelle für Zufälligkeit.

Es ist möglich, den Zufallswert offchain zu generieren und ihn Onchain zu senden, aber dies stellt hohe Vertrauensanforderungen an die Nutzer. Sie müssen glauben, dass der Wert wirklich über unvorhersehbare Mechanismen generiert und während der Übertragung nicht verändert wurde.

Orakel, die für offchain Berechnungen entwickelt wurden, lösen dieses Problem, indem sie sicher zufällige Ergebnisse offchain generieren, die sie zusammen mit kryptografischen Nachweisen, die die Unvorhersehbarkeit des Prozesses attestieren, Onchain übertragen. Ein Beispiel ist [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/) (Verifiable Random Function), ein nachweislich fairer und manipulationssicherer Zufallszahlengenerator (RNG), der nützlich ist, um zuverlässige Smart Contracts für Anwendungen zu erstellen, die auf unvorhersehbare Ergebnisse angewiesen sind.

### Ergebnisse für Ereignisse abrufen {#getting-outcomes-for-events}

Mit Orakeln ist es einfach, Smart Contracts zu erstellen, die auf reale Ereignisse reagieren. Orakel-Dienste machen dies möglich, indem sie es Verträgen ermöglichen, sich über offchain Komponenten mit externen APIs zu verbinden und Informationen aus diesen Datenquellen zu nutzen. Zum Beispiel kann die zuvor erwähnte Prognose-Dapp ein Orakel anfordern, um Wahlergebnisse aus einer vertrauenswürdigen offchain Quelle (z. B. der Associated Press) zurückzugeben.

Die Verwendung von Orakeln zum Abrufen von Daten basierend auf realen Ergebnissen ermöglicht weitere neuartige Anwendungsfälle; beispielsweise benötigt ein dezentrales Versicherungsprodukt genaue Informationen über Wetter, Katastrophen usw., um effektiv zu funktionieren.

### Automatisierung von Smart Contracts {#automating-smart-contracts}

Smart Contracts laufen nicht automatisch; vielmehr muss ein Externally Owned Account (EOA) oder ein anderes Contract-Konto die richtigen Funktionen auslösen, um den Code des Vertrags auszuführen. In den meisten Fällen ist der Großteil der Funktionen des Vertrags öffentlich und kann von EOAs und anderen Verträgen aufgerufen werden.

Es gibt jedoch auch _private Funktionen_ innerhalb eines Vertrags, die für andere unzugänglich sind, aber für die Gesamtfunktionalität einer Dapp entscheidend sind. Beispiele hierfür sind eine `mintERC721Token()`-Funktion, die regelmäßig neue NFTs für Nutzer prägt, eine Funktion zur Gewährung von Auszahlungen in einem Prognosemarkt oder eine Funktion zum Entsperren von gestakten Token in einer DEX.

Entwickler müssen solche Funktionen in regelmäßigen Abständen auslösen, damit die Anwendung reibungslos läuft. Dies könnte jedoch dazu führen, dass Entwickler mehr Stunden mit alltäglichen Aufgaben verlieren, weshalb die Automatisierung der Ausführung von Smart Contracts attraktiv ist.

Einige dezentrale Orakel-Netzwerke bieten Automatisierungsdienste an, die es offchain Orakel-Knoten ermöglichen, Smart-Contract-Funktionen gemäß den vom Nutzer definierten Parametern auszulösen. Typischerweise erfordert dies die „Registrierung“ des Zielvertrags beim Orakel-Dienst, die Bereitstellung von Mitteln zur Bezahlung des Orakel-Betreibers und die Angabe der Bedingungen oder Zeiten zum Auslösen des Vertrags.

Das [Keeper-Netzwerk](https://chain.link/keepers) von Chainlink bietet Optionen für Smart Contracts, um regelmäßige Wartungsaufgaben auf vertrauensminimierte und dezentrale Weise auszulagern. Lesen Sie die offizielle [Keeper-Dokumentation](https://docs.chain.link/docs/chainlink-keepers/introduction/) für Informationen darüber, wie Sie Ihren Vertrag Keeper-kompatibel machen und den Upkeep-Dienst nutzen können.

## Wie man Blockchain-Orakel verwendet {#use-blockchain-oracles}

Es gibt mehrere Orakel-Anwendungen, die Sie in Ihre Ethereum-Dapp integrieren können:

**[Chainlink](https://chain.link/)** - _Dezentrale Orakel-Netzwerke von Chainlink bieten manipulationssichere Eingaben, Ausgaben und Berechnungen zur Unterstützung fortschrittlicher Smart Contracts auf jeder Blockchain._

**[RedStone Oracles](https://redstone.finance/)** - _RedStone ist ein dezentrales modulares Orakel, das gasoptimierte Daten-Feeds bereitstellt. Es ist darauf spezialisiert, Preis-Feeds für aufstrebende Vermögenswerte wie Liquid-Staking-Token (LSTs), Liquid-Restaking-Token (LRTs) und Bitcoin-Staking-Derivate anzubieten._

**[Chronicle](https://chroniclelabs.org/)** - _Chronicle überwindet die aktuellen Einschränkungen bei der Übertragung von Daten Onchain durch die Entwicklung wirklich skalierbarer, kosteneffizienter, dezentraler und verifizierbarer Orakel._

**[Witnet](https://witnet.io/)** - _Witnet ist ein erlaubnisfreies, dezentrales und zensurresistentes Orakel, das Smart Contracts hilft, mit starken kryptoökonomischen Garantien auf reale Ereignisse zu reagieren._

**[UMA Oracle](https://uma.xyz)** - _Das optimistische Orakel von UMA ermöglicht es Smart Contracts, schnell jede Art von Daten für verschiedene Anwendungen zu empfangen, einschließlich Versicherungen, Finanzderivaten und Prognosemärkten._

**[Tellor](https://tellor.io/)** - _Tellor ist ein transparentes und erlaubnisfreies Orakel-Protokoll für Ihren Smart Contract, um jederzeit problemlos beliebige Daten zu erhalten._

**[Band Protocol](https://bandprotocol.com/)** - _Band Protocol ist eine kettenübergreifende Daten-Orakel-Plattform, die reale Daten und APIs aggregiert und mit Smart Contracts verbindet._

**[Pyth Network](https://pyth.network/)** - _Das Pyth-Netzwerk ist ein First-Party-Finanz-Orakel-Netzwerk, das entwickelt wurde, um kontinuierliche reale Daten Onchain in einer manipulationssicheren, dezentralen und selbsttragenden Umgebung zu veröffentlichen._

**[API3 DAO](https://api3.org/)** - _API3 DAO liefert First-Party-Orakel-Lösungen, die eine größere Quellentransparenz, Sicherheit und Skalierbarkeit in einer dezentralen Lösung für Smart Contracts bieten._

**[Supra](https://supra.com/)** - Ein vertikal integriertes Toolkit kettenübergreifender Lösungen, das alle Blockchains, ob öffentlich (L1s und L2s) oder privat (Unternehmen), miteinander verbindet und dezentrale Orakel-Preis-Feeds bereitstellt, die für Onchain- und offchain Anwendungsfälle genutzt werden können. 

**[Gas Network](https://gas.network/)** - Eine verteilte Orakel-Plattform, die Echtzeit-Gaspreisdaten über Blockchains hinweg bereitstellt. Indem Daten von führenden Gaspreisdatenanbietern Onchain gebracht werden, trägt Gas Network dazu bei, die Interoperabilität voranzutreiben. Gas Network unterstützt Daten für über 35 Chains, einschließlich Ethereum Mainnet und vielen führenden L2s.

**[DIA](https://www.diadata.org/)** - Ein kettenübergreifendes Orakel-Netzwerk, das verifizierbare Daten-Feeds für über 20.000 Vermögenswerte in allen wichtigen Anlageklassen liefert. DIA bezieht rohe Handelsdaten direkt von über 100 Primärmärkten und berechnet sie Onchain, wodurch vollständige Datentransparenz und Verifizierbarkeit mit benutzerdefinierten Konfigurationen für jeden Anwendungsfall gewährleistet werden.

**[Stork](https://stork.network)** - Stork liefert Preisdaten mit extrem niedriger Latenz und unterstützt eine Vielzahl von Anwendungsfällen, einschließlich Perpetuals-Märkten, Kreditvergabeprotokollen und DeFi-Ökosystemen, wobei neue Vermögenswerte bei der Listung schnell unterstützt werden.

## Weiterführende Literatur {#further-reading}

**Artikel**

- [Was ist ein Blockchain-Orakel?](https://chain.link/education/blockchain-oracles) — _Chainlink_
- [Was ist ein Blockchain-Orakel?](https://medium.com/better-programming/what-is-a-blockchain-oracle-f5ccab8dbd72) — _Patrick Collins_
- [Dezentrale Orakel: ein umfassender Überblick](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) — _Julien Thevenard_
- [Implementierung eines Blockchain-Orakels auf Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Warum können Smart Contracts keine API-Aufrufe tätigen?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) — _StackExchange_
- [Sie möchten also ein Preis-Orakel verwenden](https://samczsun.com/so-you-want-to-use-a-price-oracle/) — _samczsun_

**Videos**

- [Orakel und die Erweiterung des Blockchain-Nutzens](https://youtu.be/BVUZpWa8vpw) — _Real Vision Finance_

**Tutorials**

- [Wie man den aktuellen Preis von Ethereum in Solidity abruft](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) — _Chainlink_
- [Nutzung von Orakel-Daten](https://docs.chroniclelabs.org/Developers/tutorials/Remix) — _Chronicle_
- [Orakel-Herausforderung](https://speedrunethereum.com/challenge/oracles) - _Speedrun Ethereum_

**Beispielprojekte**

- [Vollständiges Chainlink-Starterprojekt für Ethereum in Solidity](https://github.com/hackbg/chainlink-fullstack) — _HackBG_
