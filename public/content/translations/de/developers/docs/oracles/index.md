---
title: Oracles
description: Oracles helfen dabei, Daten aus der realen Welt in Ihre Ethereum-Anwendung zu bringen, da Smart Contracts die realen Daten nicht allein abfragen können.
lang: de
---

Oracles sind Anwendungen, die Datenfeeds bereitstellen und Offchain-Datenquellen für die Blockchain und Smart Contracts verfügbar machen. Das ist notwendig, weil Ethereum-basierte Smart Contracts standardmäßig keinen Zugriff auf Informationen außerhalb des Blockchain-Netzwerks haben.

Indem Smart Contracts die Möglichkeit erhalten, mit Offchain-Daten zu arbeiten, wird der Nutzen und Wert dezentraler Anwendungen erheblich gesteigert. Beispielsweise verlassen sich Onchain-Vorhersagemärkte auf Oracles, um Informationen über Ereignisse zu liefern, die zur Validierung von Nutzerprognosen verwendet werden. Wenn Alice zum Beispiel 20 ETH darauf wettet, wer der nächste US-Präsident wird, benötigt die Vorhersagemarkt-dApp ein Oracle, um das Wahlergebnis zu bestätigen und zu bestimmen, ob Alice eine Auszahlung erhält.

## Voraussetzungen {#prerequisites}

Diese Seite setzt voraus, dass Sie mit den Grundlagen von Ethereum vertraut sind, einschließlich [Nodes](/developers/docs/nodes-and-clients/), [Konsensmechanismen](/developers/docs/consensus-mechanisms/) und der [EVM](/developers/docs/evm/). Sie sollten außerdem ein gutes Verständnis von [Smart Contracts](/developers/docs/smart-contracts/) und [Smart Contract Anatomie](/developers/docs/smart-contracts/anatomy/), insbesondere von [Events](/glossary/#events), haben.

## Was ist ein Blockchain-Oracle? {#what-is-a-blockchain-oracle}

Oracles sind Anwendungen, die externe Informationen (d.h. Offchain-Daten) beschaffen, verifizieren und an Smart Contracts auf der Blockchain übermitteln. Neben dem "Abrufen" von Offchain-Daten und deren Veröffentlichung auf Ethereum können Oracles auch Informationen von der Blockchain an externe Systeme "senden", z. B. das Öffnen eines Smart Locks, nachdem ein Nutzer eine Gebühr per Ethereum-Transaktion bezahlt hat.

Ohne ein Oracle wären Smart Contracts ausschließlich auf Onchain-Daten beschränkt.

Oracles unterscheiden sich je nach Datenquelle (einzelne oder mehrere Quellen), Vertrauensmodell (zentralisiert oder dezentralisiert) und Systemarchitektur (Sofortabfrage, Publish-Subscribe, Request-Response). Außerdem kann man zwischen Oracles unterscheiden, die externe Daten für Onchain-Verträge bereitstellen (Input-Oracles), Informationen von der Blockchain an Offchain-Anwendungen senden (Output-Oracles) oder Offchain-Berechnungen durchführen (Computational Oracles).

## Warum brauchen Smart Contracts Oracles? {#why-do-smart-contracts-need-oracles}

Viele Entwickler sehen Smart Contracts als Code, der an bestimmten Adressen auf der Blockchain läuft. Allgemeiner betrachtet sind Smart Contracts jedoch [selbstausführende Softwareprogramme](/smart-contracts/), die Vereinbarungen zwischen Parteien automatisch durchsetzen, sobald bestimmte Bedingungen erfüllt sind – daher der Begriff "Smart Contract".

Die Nutzung von Smart Contracts zur Durchsetzung von Vereinbarungen ist jedoch nicht trivial, da Ethereum deterministisch ist. Ein [deterministisches System](https://en.wikipedia.org/wiki/Deterministic_algorithm) liefert bei gleichem Anfangszustand und gleicher Eingabe immer das gleiche Ergebnis – es gibt keine Zufälligkeit oder Variation im Prozess der Berechnung von Ausgaben aus Eingaben.

Um deterministische Ausführung zu gewährleisten, beschränken Blockchains die Nodes darauf, Konsens nur auf Basis von Onchain-Daten über einfache Ja/Nein-Fragen zu erzielen. Beispiele:

- "Hat der Kontoinhaber (identifiziert durch einen Public Key) diese Transaktion mit dem zugehörigen Private Key signiert?"
- "Hat dieses Konto genügend Guthaben für die Transaktion?"
- "Ist diese Transaktion im Kontext dieses Smart Contracts gültig?"

Wenn Blockchains Informationen aus externen Quellen beziehen würden, wäre Determinismus nicht mehr möglich, und die Nodes könnten sich nicht mehr auf die Gültigkeit von Statusänderungen einigen. Ein Beispiel: Ein Smart Contract, der eine Transaktion auf Basis des aktuellen ETH-USD-Kurses aus einer traditionellen Preis-API ausführt. Dieser Wert ändert sich häufig (und die API könnte veraltet oder kompromittiert werden), sodass Nodes, die denselben Contract-Code ausführen, zu unterschiedlichen Ergebnissen kommen könnten.

Für eine öffentliche Blockchain wie Ethereum, mit Tausenden von Nodes weltweit, ist Determinismus entscheidend. Ohne zentrale Autorität als Wahrheitsquelle benötigen die Nodes Mechanismen, um nach denselben Transaktionen zum gleichen Status zu gelangen. Wenn Node A den Code eines Smart Contracts ausführt und "3" erhält, während Node B "7" erhält, würde der Konsens zusammenbrechen und Ethereum seinen Wert als dezentrale Plattform verlieren.

Dieses Szenario zeigt auch das Problem, wenn Blockchains selbstständig Informationen aus externen Quellen abrufen würden. Oracles lösen dieses Problem, indem sie Informationen aus Offchain-Quellen nehmen und auf der Blockchain speichern, sodass Smart Contracts sie nutzen können. Da Onchain-Daten unveränderlich und öffentlich sind, können Ethereum-Nodes die von Oracles importierten Offchain-Daten sicher verwenden, ohne den Konsens zu gefährden.

Dazu besteht ein Oracle typischerweise aus einem Onchain-Smart-Contract und einigen Offchain-Komponenten. Der Onchain-Contract erhält Datenanfragen von anderen Smart Contracts und leitet sie an die Offchain-Komponente (das Oracle-Node) weiter. Dieses kann Datenquellen abfragen (z. B. per API) und Transaktionen senden, um die angeforderten Daten im Smart Contract zu speichern.

Im Wesentlichen überbrückt ein Blockchain-Oracle die Informationslücke zwischen Blockchain und externer Welt und ermöglicht sogenannte "hybride Smart Contracts", die sowohl Onchain-Code als auch Offchain-Infrastruktur nutzen. Dezentrale Vorhersagemärkte sind ein gutes Beispiel für hybride Smart Contracts. Weitere Beispiele sind etwa Versicherungsverträge, die bei bestimmten Wetterereignissen automatisch auszahlen.

## Das Oracle-Problem {#the-oracle-problem}

Oracles lösen ein wichtiges Problem, bringen aber auch neue Herausforderungen mit sich, z. B.:

- Wie kann man sicherstellen, dass die eingefügten Informationen aus der richtigen Quelle stammen und nicht manipuliert wurden?
- Wie kann man gewährleisten, dass diese Daten immer verfügbar und regelmäßig aktualisiert werden?

Das sogenannte "Oracle-Problem" beschreibt die Schwierigkeiten, die mit der Nutzung von Oracles für Smart Contracts einhergehen. Die von einem Oracle gelieferten Daten müssen korrekt sein, damit ein Smart Contract korrekt ausgeführt wird. Zudem untergräbt das Vertrauen in Oracle-Betreiber das "Trustless"-Prinzip von Smart Contracts.

Verschiedene Oracles bieten unterschiedliche Lösungen für das Oracle-Problem, die wir später betrachten. Oracles werden typischerweise danach bewertet, wie gut sie folgende Herausforderungen meistern:

1. **Korrektheit**: Ein Oracle sollte keine Statusänderungen auf Basis ungültiger Offchain-Daten auslösen. Es muss die _Authentizität_ und _Integrität_ der Daten garantieren. Authentizität bedeutet, dass die Daten aus der richtigen Quelle stammen, Integrität, dass sie vor der Onchain-Übertragung nicht verändert wurden.
2. **Verfügbarkeit**: Ein Oracle sollte Smart Contracts nicht daran hindern, Aktionen auszuführen. Die Daten müssen _auf Anfrage_ ohne Unterbrechung verfügbar sein.
3. **Anreizkompatibilität**: Ein Oracle sollte Offchain-Datenanbieter dazu motivieren, korrekte Informationen zu liefern. Dazu gehören _Zurechenbarkeit_ und _Verantwortlichkeit_.

## Wie funktioniert ein Blockchain-Oracle-Service? {#how-does-a-blockchain-oracle-service-work}

### Nutzer (Users) {#users}

Nutzer sind Entitäten (z. B. Smart Contracts), die externe Informationen benötigen, um bestimmte Aktionen auszuführen. Der grundlegende Ablauf eines Oracle-Services beginnt damit, dass der Nutzer eine Datenanfrage an den Oracle-Contract sendet. Datenanfragen beantworten meist folgende Fragen:

1. Welche Quellen können Offchain-Nodes für die angeforderten Informationen konsultieren?
2. Wie verarbeiten Reporter die Informationen aus den Datenquellen und extrahieren relevante Datenpunkte?
3. Wie viele Oracle-Nodes können an der Datenbeschaffung teilnehmen?
4. Wie werden Abweichungen in den Oracle-Berichten gehandhabt?
5. Welche Methode wird zur Filterung und Aggregation der Berichte verwendet?

### Oracle-Contract {#oracle-contract}

Der Oracle-Contract ist die Onchain-Komponente des Oracle-Services. Er hört auf Datenanfragen anderer Contracts, leitet Datenanfragen an Oracle-Nodes weiter und gibt die zurückgegebenen Daten an die Client-Contracts weiter. Der Contract kann auch Berechnungen an den zurückgegebenen Daten durchführen, um einen aggregierten Wert zu liefern.

Der Oracle-Contract stellt Funktionen bereit, die von Client-Contracts bei einer Datenanfrage aufgerufen werden. Nach Eingang einer neuen Anfrage löst der Smart Contract ein [Log-Event](/developers/docs/smart-contracts/anatomy/#events-and-logs) aus, das Offchain-Nodes benachrichtigt (meist per JSON-RPC `eth_subscribe`), die dann die im Log-Event definierten Daten abrufen.

Hier ist ein [Beispiel-Oracle-Contract](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) von Pedro Costa. Dies ist ein einfacher Oracle-Service, der auf Anfrage anderer Smart Contracts Offchain-APIs abfragen und die angeforderten Informationen auf der Blockchain speichern kann:

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //Liste der an den Contract gestellten Anfragen
  uint currentId = 0; //steigende Anfrage-ID
  uint minQuorum = 2; //minimale Anzahl von Antworten, die empfangen werden müssen, bevor das Endergebnis festgelegt wird
  uint totalOracleCount = 3; //Fest codierte Anzahl der Oracles

  //definiert eine allgemeine API-Anfrage
  struct Request {
    uint id;                            //Anfrage-ID
    string urlToQuery;                  //API-URL
    string attributeToFetch;            //JSON-Attribut (Schlüssel), das in der Antwort abgerufen werden soll
    string agreedValue;                 //Wert aus dem Schlüssel
    mapping(uint => string) answers;     //von den Oracles bereitgestellte Antworten
    mapping(address => uint) quorum;    //Oracles, die die Antwort abfragen werden (1=Oracle hat nicht abgestimmt, 2=Oracle hat abgestimmt)
  }

  //Event, das das Oracle außerhalb der Blockchain auslöst
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //wird ausgelöst, wenn ein Konsens über das Endergebnis besteht
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

    //Fest codierte Oracle-Adressen
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    //Event auslösen, das vom Oracle außerhalb der Blockchain erkannt wird
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    //Anfrage-ID erhöhen
    currentId++;
  }

  //wird vom Oracle aufgerufen, um seine Antwort zu registrieren
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //prüfen, ob das Oracle in der Liste der vertrauenswürdigen Oracles ist
    //und ob das Oracle noch nicht abgestimmt hat
    if(currRequest.quorum[address(msg.sender)] == 1){

      //markieren, dass diese Adresse abgestimmt hat
      currRequest.quorum[msg.sender] = 2;

      //durch das "Array" der Antworten iterieren, bis eine Position frei ist, und den abgerufenen Wert speichern
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //erste leere Position finden
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //durch die Oracle-Liste iterieren und prüfen, ob genügend Oracles (minimales Quorum)
      //für die gleiche Antwort wie die aktuelle gestimmt haben
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

### Oracle-Nodes {#oracle-nodes}

Das Oracle-Node ist die Offchain-Komponente des Oracle-Services. Es extrahiert Informationen aus externen Quellen (z. B. APIs von Drittanbietern) und bringt sie Onchain, damit Smart Contracts sie nutzen können. Oracle-Nodes hören auf Events des Onchain-Oracle-Contracts und führen die im Log beschriebenen Aufgaben aus.

Eine typische Aufgabe für Oracle-Nodes ist das Senden einer [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp)-Anfrage an einen API-Service, das Parsen der Antwort, das Formatieren in ein blockchain-lesbares Format und das Onchain-Senden per Transaktion an den Oracle-Contract. Das Oracle-Node kann auch verpflichtet sein, die Gültigkeit und Integrität der eingereichten Informationen durch "Authentizitätsnachweise" zu belegen.

Computational Oracles verlassen sich ebenfalls auf Offchain-Nodes, um Berechnungen durchzuführen, die Onchain zu teuer oder zu aufwendig wären (z. B. die Generierung verifizierbarer Zufallszahlen für Blockchain-Spiele).

## Oracle-Designmuster {#oracle-design-patterns}

Es gibt drei Haupttypen von Oracles: Sofortabfrage, Publish-Subscribe und Request-Response. Die letzten beiden werden am häufigsten in Ethereum-Smart-Contracts verwendet.

### Veröffentlichungs-Abonnement-Oracles {#publish-subscribe-oracles}

Diese Art von Oracle bietet "Datenfeeds" an, die von anderen Contracts regelmäßig gelesen werden können. Die Daten ändern sich häufig, und Client-Contracts müssen auf Datenaktualisierungen hören. Ein Beispiel ist ein ETH-USD-Preis-Oracle.

### Anfrage-Antwort-Oracles {#request-response-oracles}

Ein Anfrage-Antwort-Setup ermöglicht es dem Client-Contract, beliebige Daten anzufordern, die nicht von einem Veröffentlichungs-Abonnement-Oracle bereitgestellt werden. Anfrage-Antwort-Oracles sind ideal, wenn der Datensatz zu groß ist, um im Speicher eines Smart Contracts gespeichert zu werden, und/oder Benutzer zu jedem Zeitpunkt nur einen kleinen Teil der Daten benötigen.

Obwohl komplexer als Veröffentlichungs-Abonnement-Modelle, sind Anfrage-Antwort-Oracles im Wesentlichen das, was wir im vorherigen Abschnitt beschrieben haben. Das Oracle hat eine Onchain-Komponente, die eine Datenanfrage empfängt und an einen Offchain-Node zur Verarbeitung weiterleitet.

Benutzer, die Datenabfragen initiieren, müssen die Kosten für das Abrufen von Informationen aus der Offchain-Quelle tragen. Der Client-Contract muss auch Mittel bereitstellen, um die Gas-Kosten zu decken, die durch den Oracle-Contract bei der Rückgabe der Antwort über die in der Anfrage angegebene Callback-Funktion entstehen.

## Zentralisierte und dezentralisierte Oracles {#types-of-oracles}

### Zentralisierte Oracles {#centralized-oracles}

Werden von einer einzelnen Entität kontrolliert, die für die Aggregation von Offchain-Informationen und die Aktualisierung der Onchain-Daten verantwortlich ist. Zentralisierte Oracles sind effizient, da sie sich auf eine einzige Wahrheitsquelle verlassen. Sie funktionieren möglicherweise besser in Fällen, in denen proprietäre Datensätze direkt vom Eigentümer mit einer allgemein akzeptierten Signatur veröffentlicht werden. Es gibt jedoch auch Nachteile:

#### Geringe Korrektheitsgarantien {#low-correctness-guarantees}

Bei zentralisierten Oracles gibt es keine Möglichkeit zu überprüfen, ob die bereitgestellten Informationen korrekt sind oder nicht. Selbst "renommierte" Anbieter können sich ändern oder gehackt werden. Wenn das Oracle korrupt wird, werden Smart Contracts auf Basis falscher Daten ausgeführt.

#### Schlechte Verfügbarkeit {#poor-availability}

Zentralisierte Oracles garantieren nicht, dass Offchain-Daten immer für andere Smart Contracts verfügbar sind. Wenn der Anbieter beschließt, den Service abzuschalten oder ein Hacker die Offchain-Komponente des Oracles übernimmt, ist Ihr Smart Contract einem Denial-of-Service (DoS)-Angriff ausgesetzt.

#### Schlechte Anreizkompatibilität {#poor-incentive-compatibility}

Zentralisierte Oracles haben oft schlecht gestaltete oder nicht existierende Anreize für den Datenanbieter, genaue/unveränderte Informationen zu senden. Die Bezahlung eines Oracles für Korrektheit garantiert keine Ehrlichkeit. Dieses Problem wird größer, je mehr Wert von Smart Contracts kontrolliert wird.

### Dezentralisierte Oracles {#decentralized-oracles}

Dezentralisierte Oracles sind so konzipiert, dass sie die Einschränkungen zentralisierter Oracles überwinden, indem sie Single Points of Failure eliminieren. Ein dezentralisierter Oracle-Dienst besteht aus mehreren Teilnehmern in einem Peer-to-Peer-Netzwerk, die einen Konsens über Offchain-Daten bilden, bevor diese an einen Smart Contract gesendet werden.

Ein dezentralisiertes Oracle sollte (im Idealfall) erlaubnisfrei, vertrauenslos und frei von Verwaltung durch eine zentrale Partei sein; in der Realität liegt die Dezentralisierung bei Oracles auf einem Spektrum. Es gibt halb-dezentralisierte Oracle-Netzwerke, an denen jeder teilnehmen kann, aber mit einem "Eigentümer", der Nodes basierend auf ihrer historischen Leistung genehmigt und entfernt. Es existieren auch vollständig dezentralisierte Oracle-Netzwerke: Diese laufen in der Regel als eigenständige Blockchains und haben definierte Konsensmechanismen für die Koordination von Nodes und die Bestrafung von Fehlverhalten.

Die Verwendung dezentralisierter Oracles bietet folgende Vorteile:

### Hohe Korrektheitsgarantien {#high-correctness-guarantees}

Dezentralisierte Oracles versuchen, die Korrektheit der Daten durch verschiedene Ansätze zu gewährleisten. Dazu gehören der Einsatz von Nachweisen, die die Authentizität und Integrität der zurückgegebenen Informationen belegen, sowie die Anforderung, dass mehrere Entitäten gemeinsam über die Gültigkeit von Offchain-Daten entscheiden.

#### Authentizitätsnachweise {#authenticity-proofs}

Authentizitätsnachweise sind kryptographische Mechanismen, die eine unabhängige Überprüfung von Informationen aus externen Quellen ermöglichen. Diese Nachweise können die Quelle der Informationen validieren und mögliche Änderungen an den Daten nach dem Abruf erkennen.

Beispiele für Authentizitätsnachweise sind:

**Transport Layer Security (TLS)-Nachweise**: Oracle-Nodes rufen häufig Daten aus externen Quellen über eine sichere HTTP-Verbindung ab, die auf dem Transport Layer Security (TLS)-Protokoll basiert. Einige dezentralisierte Oracles verwenden Authentizitätsnachweise, um TLS-Sitzungen zu verifizieren (d.h. den Informationsaustausch zwischen einem Node und einem bestimmten Server zu bestätigen) und zu bestätigen, dass die Inhalte der Sitzung nicht verändert wurden.

**Trusted Execution Environment (TEE)-Nachweise**: Ein [Trusted Execution Environment](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) ist eine abgeschottete Rechenumgebung, die von den Betriebsprozessen des Host-Systems isoliert ist. TEEs stellen sicher, dass Anwendungscode oder Daten, die in der Rechenumgebung gespeichert/verwendet werden, ihre Integrität, Vertraulichkeit und Unveränderlichkeit behalten. Benutzer können auch einen Nachweis generieren, um zu beweisen, dass eine Anwendungsinstanz innerhalb der vertrauenswürdigen Ausführungsumgebung läuft.

Bestimmte Klassen von dezentralisierten Oracles erfordern von Oracle-Node-Betreibern die Bereitstellung von TEE-Nachweisen. Dies bestätigt einem Benutzer, dass der Node-Betreiber eine Instanz des Oracle-Clients in einer vertrauenswürdigen Ausführungsumgebung betreibt. TEEs verhindern, dass externe Prozesse den Code und die Daten einer Anwendung verändern oder lesen können. Daher beweisen diese Nachweise, dass der Oracle-Node die Informationen intakt und vertraulich gehalten hat.

#### Konsensbasierte Validierung von Informationen {#consensus-based-validation-of-information}

Zentralisierte Oracles verlassen sich bei der Bereitstellung von Daten für Smart Contracts auf eine einzige Wahrheitsquelle, was die Möglichkeit der Veröffentlichung ungenauer Informationen mit sich bringt. Dezentralisierte Oracles lösen dieses Problem, indem sie sich auf mehrere Oracle-Nodes verlassen, um Offchain-Informationen abzufragen. Durch den Vergleich von Daten aus mehreren Quellen reduzieren dezentralisierte Oracles das Risiko, ungültige Informationen an Onchain-Contracts weiterzugeben.

Dezentralisierte Oracles müssen jedoch mit Diskrepanzen in den Informationen umgehen, die aus mehreren Offchain-Quellen abgerufen werden. Um Unterschiede in den Informationen zu minimieren und sicherzustellen, dass die an den Oracle-Contract übergebenen Daten die kollektive Meinung der Oracle-Nodes widerspiegeln, verwenden dezentralisierte Oracles die folgenden Mechanismen:

##### Abstimmung/Staking über die Genauigkeit von Daten

Einige dezentralisierte Oracle-Netzwerke erfordern von den Teilnehmern, über die Genauigkeit von Antworten auf Datenanfragen (z.B. "Wer hat die US-Wahl 2020 gewonnen?") unter Verwendung des nativen Tokens des Netzwerks abzustimmen oder zu staken. Ein Aggregationsprotokoll sammelt dann die Stimmen und Stakes und nimmt die von der Mehrheit unterstützte Antwort als gültige an.

Nodes, deren Antworten von der Mehrheitsantwort abweichen, werden bestraft, indem ihre Tokens an andere verteilt werden, die korrektere Werte liefern. Die Verpflichtung der Nodes, eine Sicherheit zu hinterlegen, bevor sie Daten bereitstellen, motiviert zu ehrlichen Antworten, da sie als rationale wirtschaftliche Akteure angenommen werden, die ihre Rendite maximieren wollen.

Staking/Abstimmung schützt dezentralisierte Oracles auch vor [Sybil-Angriffen](/glossary/#sybil-attack), bei denen böswillige Akteure mehrere Identitäten erstellen, um das Konsenssystem zu manipulieren. Staking kann jedoch "Trittbrettfahren" (Oracle-Nodes kopieren Informationen von anderen) und "faules Validieren" (Oracle-Nodes folgen der Mehrheit ohne eigene Überprüfung der Informationen) nicht verhindern.

##### Schelling-Punkt-Mechanismen

Der [Schelling-Punkt](<https://en.wikipedia.org/wiki/Focal_point_(game_theory)>) ist ein spieltheoretisches Konzept, das davon ausgeht, dass mehrere Entitäten in Abwesenheit jeglicher Kommunikation immer zu einer gemeinsamen Lösung eines Problems tendieren. Schelling-Punkt-Mechanismen werden häufig in dezentralisierten Oracle-Netzwerken verwendet, um Nodes zu ermöglichen, einen Konsens über Antworten auf Datenanfragen zu erreichen.

Eine frühe Idee dafür war [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/), ein vorgeschlagener Datenfeed, bei dem Teilnehmer Antworten auf "skalare" Fragen (Fragen, deren Antworten durch Größe beschrieben werden, z.B. "Was ist der Preis von ETH?") zusammen mit einer Einlage einreichen. Benutzer, die Werte zwischen dem 25. und 75. [Perzentil](https://en.wikipedia.org/wiki/Percentile) liefern, werden belohnt, während diejenigen, deren Werte stark vom Medianwert abweichen, bestraft werden.

Obwohl SchellingCoin heute nicht existiert, verwenden eine Reihe von dezentralisierten Oracles—insbesondere [Maker Protocol's Oracles](https://docs.makerdao.com/smart-contract-modules/oracle-module)—den Schelling-Punkt-Mechanismus, um die Genauigkeit der Oracle-Daten zu verbessern. Jedes Maker Oracle besteht aus einem Offchain-P2P-Netzwerk von Nodes ("Relayers" und "Feeds"), die Marktpreise für Sicherheiten-Assets einreichen, und einem Onchain-"Medianizer"-Contract, der den Median aller bereitgestellten Werte berechnet. Sobald die festgelegte Verzögerungszeit abgelaufen ist, wird dieser Medianwert zum neuen Referenzpreis für das zugehörige Asset.

Andere Beispiele für Oracles, die Schelling-Punkt-Mechanismen verwenden, sind [Chainlink Offchain Reporting](https://docs.chain.link/docs/offchain-reporting/) und [Witnet](https://witnet.io/). In beiden Systemen werden Antworten von Oracle-Nodes im Peer-to-Peer-Netzwerk zu einem einzigen Aggregatwert zusammengefasst, wie z.B. einem Mittelwert oder Median. Nodes werden je nachdem belohnt oder bestraft, inwieweit ihre Antworten mit dem Aggregatwert übereinstimmen oder davon abweichen.

Schelling-Punkt-Mechanismen sind attraktiv, weil sie den Onchain-Fußabdruck minimieren (nur eine Transaktion muss gesendet werden), während sie gleichzeitig Dezentralisierung garantieren. Letzteres ist möglich, weil Nodes die Liste der eingereichten Antworten unterzeichnen müssen, bevor sie in den Algorithmus eingespeist wird, der den Mittelwert/Medianwert erzeugt.

### Verfügbarkeit {#availability}

Dezentralisierte Oracle-Dienste gewährleisten eine hohe Verfügbarkeit von Offchain-Daten für Smart Contracts. Dies wird durch die Dezentralisierung sowohl der Quelle der Offchain-Informationen als auch der Nodes erreicht, die für die Übertragung der Informationen Onchain verantwortlich sind.

Dies gewährleistet Fehlertoleranz, da der Oracle-Contract sich auf mehrere Nodes verlassen kann (die sich auch auf mehrere Datenquellen verlassen), um Abfragen von anderen Contracts auszuführen. Dezentralisierung auf der Quellen- _und_ Node-Betreiber-Ebene ist entscheidend—ein Netzwerk von Oracle-Nodes, das Informationen aus derselben Quelle bereitstellt, wird auf das gleiche Problem stoßen wie ein zentralisiertes Oracle.

Es ist auch möglich, dass Stake-basierte Oracles Node-Betreiber bestrafen, die nicht schnell genug auf Datenanfragen reagieren. Dies motiviert Oracle-Nodes erheblich, in fehlertolerante Infrastruktur zu investieren und Daten zeitnah bereitzustellen.

### Gute Anreizkompatibilität {#good-incentive-compatibility}

Dezentralisierte Oracles implementieren verschiedene Anreizdesigns, um [byzantinisches](https://en.wikipedia.org/wiki/Byzantine_fault) Verhalten unter Oracle-Nodes zu verhindern. Konkret erreichen sie _Zurechenbarkeit_ und _Verantwortlichkeit_:

1. Dezentralisierte Oracle-Nodes müssen oft die Daten signieren, die sie als Antwort auf Datenanfragen bereitstellen. Diese Informationen helfen bei der Bewertung der historischen Leistung von Oracle-Nodes, sodass Benutzer unzuverlässige Oracle-Nodes bei Datenanfragen herausfiltern können. Ein Beispiel ist Witnets [Algorithmisches Reputationssystem](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system).

2. Dezentralisierte Oracles—wie bereits erklärt—können von Nodes verlangen, dass sie einen Stake auf ihre Überzeugung von der Richtigkeit der von ihnen eingereichten Daten setzen. Wenn sich die Behauptung als richtig erweist, kann dieser Stake zusammen mit Belohnungen für ehrlichen Service zurückgegeben werden. Er kann aber auch gekürzt werden, falls die Informationen falsch sind, was ein gewisses Maß an Verantwortlichkeit bietet.

## Anwendungen von Oracles in Smart Contracts {#applications-of-oracles-in-smart-contracts}

Die folgenden sind häufige Anwendungsfälle für Oracles in Ethereum:

### Finanzdaten abrufen {#retrieving-financial-data}

[Dezentralisierte Finanzanwendungen](/defi/) (DeFi) ermöglichen Peer-to-Peer-Kredite, Kreditaufnahme und Handel mit Assets. Dies erfordert oft den Zugriff auf verschiedene Finanzinformationen, einschließlich Wechselkursdaten (zur Berechnung des Fiat-Werts von Kryptowährungen oder zum Vergleich von Token-Preisen) und Kapitalmarktdaten (zur Berechnung des Werts von tokenisierten Assets wie Gold oder US-Dollar).

Ein DeFi-Kreditprotokoll muss beispielsweise aktuelle Marktpreise für als Sicherheit hinterlegte Assets (z.B. ETH) abfragen. Dies ermöglicht es dem Contract, den Wert der Sicherheiten-Assets zu bestimmen und festzulegen, wie viel aus dem System geliehen werden kann.

Beliebte "Preis-Oracles" (wie sie oft genannt werden) in DeFi sind Chainlink Price Feeds, Compound Protocol's [Open Price Feed](https://compound.finance/docs/prices), Uniswap's [Time-Weighted Average Prices (TWAPs)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) und [Maker Oracles](https://docs.makerdao.com/smart-contract-modules/oracle-module).

Entwickler sollten die Einschränkungen dieser Preis-Oracles verstehen, bevor sie sie in ihr Projekt integrieren. Dieser [Artikel](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/) bietet eine detaillierte Analyse dessen, was bei der Planung der Verwendung eines der genannten Preis-Oracles zu beachten ist.

Hier ist ein Beispiel, wie Sie den neuesten ETH-Preis in Ihrem Smart Contract mit einem Chainlink-Preis-Feed abrufen können:

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /**
     * Returns the latest price
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

### Verifizierbare Zufallszahlen generieren {#generating-verifiable-randomness}

Bestimmte Blockchain-Anwendungen, wie Blockchain-basierte Spiele oder Lotteriesysteme, benötigen ein hohes Maß an Unvorhersehbarkeit und Zufälligkeit, um effektiv zu funktionieren. Die deterministische Ausführung von Blockchains eliminiert jedoch die Zufälligkeit.

Der ursprüngliche Ansatz war die Verwendung pseudozufälliger kryptographischer Funktionen wie `blockhash`, aber diese konnten von [Miner manipuliert werden](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.), die den Proof-of-Work-Algorithmus lösen. Außerdem bedeutet Ethereums [Umstellung auf Proof-of-Stake](/roadmap/merge/), dass Entwickler sich nicht mehr auf `blockhash` für Onchain-Zufälligkeit verlassen können. Der [RANDAO-Mechanismus](https://eth2book.info/altair/part2/building_blocks/randomness) der Beacon Chain bietet stattdessen eine alternative Quelle für Zufälligkeit.

Es ist möglich, den Zufallswert Offchain zu generieren und Onchain zu senden, aber dies erfordert ein hohes Maß an Vertrauen von den Benutzern. Sie müssen glauben, dass der Wert wirklich durch unvorhersehbare Mechanismen generiert wurde und nicht während der Übertragung verändert wurde.

Oracles, die für Offchain-Berechnungen konzipiert sind, lösen dieses Problem, indem sie Zufallsergebnisse Offchain sicher generieren und diese Onchain zusammen mit kryptographischen Nachweisen senden, die die Unvorhersehbarkeit des Prozesses belegen. Ein Beispiel ist [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/) (Verifiable Random Function), ein nachweislich faires und manipulationssicheres Zufallszahlengeneratorsystem (RNG), das nützlich ist für den Aufbau zuverlässiger Smart Contracts für Anwendungen, die auf unvorhersehbare Ergebnisse angewiesen sind. Ein weiteres Beispiel ist [API3 QRNG](https://docs.api3.org/explore/qrng/), das Quanten-Zufallszahlengenerierung (QRNG) als öffentliche Methode der Web3-Zufallszahlengenerierung basierend auf Quantenphänomenen anbietet, bereitgestellt mit freundlicher Genehmigung der Australian National University (ANU).

### Ereignisergebnisse abrufen {#getting-outcomes-for-events}

Mit Oracles ist es einfach, Smart Contracts zu erstellen, die auf Ereignisse in der realen Welt reagieren. Oracle-Dienste machen dies möglich, indem sie Contracts erlauben, über Offchain-Komponenten mit externen APIs zu verbinden und Informationen aus diesen Datenquellen zu konsumieren. Zum Beispiel könnte die zuvor erwähnte Vorhersage-dApp ein Oracle anfordern, Wahlergebnisse aus einer vertrauenswürdigen Offchain-Quelle (z.B. Associated Press) zurückzugeben.

Die Verwendung von Oracles zum Abrufen von Daten basierend auf Ergebnissen aus der realen Welt ermöglicht andere neuartige Anwendungsfälle; zum Beispiel benötigt ein dezentralisiertes Versicherungsprodukt genaue Informationen über Wetter, Katastrophen usw., um effektiv zu funktionieren.

### Automatisierung von Smart Contracts {#automating-smart-contracts}

Smart Contracts laufen nicht automatisch; vielmehr muss ein externes Konto (EOA) oder ein anderer Contract-Account die richtigen Funktionen auslösen, um den Contract-Code auszuführen. In den meisten Fällen sind die meisten Funktionen des Contracts öffentlich und können von EOAs und anderen Contracts aufgerufen werden.

Es gibt aber auch _private Funktionen_ innerhalb eines Contracts, die für andere unzugänglich sind, aber für die Gesamtfunktionalität einer dApp kritisch sind. Beispiele sind eine `mintERC721Token()`-Funktion, die periodisch neue NFTs für Benutzer prägt, eine Funktion für die Auszahlung in einem Vorhersagemarkt oder eine Funktion zum Entsperren gestaketer Tokens in einer DEX.

Entwickler müssen solche Funktionen in regelmäßigen Abständen auslösen, um die Anwendung reibungslos laufen zu lassen. Dies kann jedoch zu mehr verlorenen Stunden für routinemäßige Aufgaben führen, weshalb die Automatisierung der Ausführung von Smart Contracts attraktiv ist.

Einige dezentralisierte Oracle-Netzwerke bieten Automatisierungsdienste an, die es Offchain-Oracle-Nodes ermöglichen, Smart-Contract-Funktionen gemäß den vom Benutzer definierten Parametern auszulösen. Typischerweise erfordert dies die "Registrierung" des Ziel-Contracts beim Oracle-Dienst, die Bereitstellung von Mitteln zur Bezahlung des Oracle-Betreibers und die Angabe der Bedingungen oder Zeiten für die Auslösung des Contracts.

Chainlinks [Keeper Network](https://chain.link/keepers) bietet Optionen für Smart Contracts, regelmäßige Wartungsaufgaben auf vertrauensminimierte und dezentralisierte Weise auszulagern. Lesen Sie die offizielle [Keeper-Dokumentation](https://docs.chain.link/docs/chainlink-keepers/introduction/), um Informationen darüber zu erhalten, wie Sie Ihren Contract Keeper-kompatibel machen und den Upkeep-Dienst nutzen können.

## Wie man Blockchain-Oracles verwendet {#use-blockchain-oracles}

Im Ethereum-Ökosystem stehen verschiedene Oracle-Dienste zur Integration zur Verfügung:

**[Chainlink](https://chain.link/)** - _Chainlink dezentralisierte Oracle-Netzwerke bieten manipulationssichere Eingaben, Ausgaben und Berechnungen zur Unterstützung fortgeschrittener Smart Contracts auf jeder Blockchain._

**[RedStone Oracles](https://redstone.finance/)** - _RedStone ist ein dezentralisiertes modulares Oracle, das gas-optimierte Datenfeeds bereitstellt. Es spezialisiert sich auf die Bereitstellung von Preis-Feeds für aufstrebende Assets wie Liquid Staking Tokens (LSTs), Liquid Restaking Tokens (LRTs) und Bitcoin Staking-Derivate._

**[Chronicle](https://chroniclelabs.org/)** - _Chronicle überwindet die aktuellen Einschränkungen bei der Übertragung von Daten Onchain durch die Entwicklung wirklich skalierbarer, kosteneffizienter, dezentralisierter und verifizierbarer Oracles._

**[Witnet](https://witnet.io/)** - _Witnet ist ein erlaubnisfreies, dezentralisiertes und zensurresistentes Oracle, das Smart Contracts hilft, auf Ereignisse in der realen Welt mit starken kryptoökonomischen Garantien zu reagieren._

**[UMA Oracle](https://uma.xyz)** - _UMAs optimistisches Oracle ermöglicht es Smart Contracts, schnell jede Art von Daten für verschiedene Anwendungen zu erhalten, einschließlich Versicherungen, Finanzderivate und Vorhersagemärkte._

**[Tellor](https://tellor.io/)** - _Tellor ist ein transparentes und erlaubnisfreies Oracle-Protokoll, mit dem Ihr Smart Contract jederzeit leicht auf Daten zugreifen kann._

**[Band Protocol](https://bandprotocol.com/)** - _Band Protocol ist eine Cross-Chain-Datenoracle-Plattform, die reale Daten und APIs mit Smart Contracts aggregiert und verbindet._

**[Paralink](https://paralink.network/)** - _Paralink bietet eine Open-Source- und dezentralisierte Oracle-Plattform für Smart Contracts, die auf Ethereum und anderen beliebten Blockchains laufen._

**[Pyth Network](https://pyth.network/)** - _Das Pyth-Netzwerk ist ein First-Party-Finanzoracle-Netzwerk, das darauf ausgelegt ist, kontinuierliche Daten aus der realen Welt in einer manipulationssicheren, dezentralisierten und selbsttragenden Umgebung Onchain zu veröffentlichen._

**[API3 DAO](https://www.api3.org/)** - _API3 DAO liefert First-Party-Oracle-Lösungen, die in einer dezentralisierten Lösung für Smart Contracts größere Quellentransparenz, Sicherheit und Skalierbarkeit bieten._

**[Supra](https://supra.com/)** - Ein vertikal integriertes Toolkit von Cross-Chain-Lösungen, das alle Blockchains, öffentliche (L1s und L2s) oder private (Unternehmen), miteinander verbindet und dezentralisierte Oracle-Preis-Feeds bereitstellt, die für Onchain- und Offchain-Anwendungsfälle verwendet werden können.

## Weiterführende Informationen {#further-reading}

**Artikel**

- [Was ist ein Blockchain-Oracle?](https://chain.link/education/blockchain-oracles) - _Chainlink_
- [Was ist ein Blockchain-Oracle?](https://betterprogramming.pub/what-is-a-blockchain-oracle-f5ccab8dbd72) - _Patrick Collins_
- [Dezentralisierte Oracle: Ein umfassender Überblick](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) - _Julien Thevenard_
- [Implementieren eines Blockchain-Oracles auf Ethereum](https://medium.com/@pedrodc/implementieren-ein-blockchain-orakel-auf-ethereum-cedc7e26b49e) - _Pedro Costa_
- [Warum können Smart Contracts keine API-Aufrufe tätigen?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) - _StackExchange_
- [Sie wollen also ein Preis-Oracle benutzen](https://samczsun.com/so-you-want-to-use-a-price-oracle/) -_samczsun_

**Videos**

- [Oracles und die Erweiterung der Blockchain-Nützlichkeit](https://youtu.be/BVUZpWa8vpw) — Real Vision Finance
- [Der Unterschied zwischen First-Party- und Third-Party-Oracles](https://blockchainoraclesummit.io/first-party-vs-third-party-oracles/) - Blockchain Oracle Summit

**Tutorials**

- [Wie man den aktuellen Ethereum-Preis in Solidity abruft](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) — Chainlink
- [Oracle-Daten konsumieren](https://docs.chroniclelabs.org/Developers/tutorials/Remix) — Chronicle

**Beispielprojekte**

- [Chainlink Ethereum Full-Stack-Starter-Projekt](https://github.com/hackbg/chainlink-fullstack) — HackBG
