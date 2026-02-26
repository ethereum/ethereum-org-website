---
title: Orakel
description: "Orakel ermöglichen Ethereum-Smart-Contracts den Zugang zu Daten aus der realen Welt, was mehr Anwendungsfälle und einen größeren Nutzen für die Benutzer freischaltet."
lang: de
---

Oracles sind Anwendungen, die Datenfeeds erstellen, um Off-Chain-Datenquellen für Smart Contracts auf der Blockchain verfügbar zu machen. Dies ist notwendig, da Ethereum-basierte Smart Contracts standardmäßig nicht auf Informationen zugreifen können, die außerhalb des Blockchain-Netzwerks gespeichert sind.

Durch die Möglichkeit, dass Smart Contracts mit Off-Chain-Daten ausgeführt werden können, wird die Nützlichkeit und der Wert dezentralisierter Anwendungen erweitert. Zum Beispiel stützen sich On-Chain-Prognosemärkte auf Orakel, um Informationen über Ergebnisse bereitzustellen, die sie zur Überprüfung von Benutzervorhersagen verwenden. Angenommen, Alice setzt 20 ETH darauf, wer der nächste US-Präsident wird. Präsident. In diesem Fall benötigt die Vorhersage-Markt-Dapp ein Orakel, um die Wahlergebnisse zu bestätigen und zu ermitteln, ob Alice für eine Auszahlung in Frage kommt.

## Voraussetzungen {#prerequisites}

Diese Seite setzt voraus, dass der Leser mit den Grundlagen von Ethereum vertraut ist, einschließlich [Nodes](/developers/docs/nodes-and-clients/), [Konsensmechanismen](/developers/docs/consensus-mechanisms/) und der [EVM](/developers/docs/evm/). Sie sollten auch ein gutes Verständnis von [Smart Contracts](/developers/docs/smart-contracts/) und der [Anatomie von Smart Contracts](/developers/docs/smart-contracts/anatomy/) haben, insbesondere von [Ereignissen](/glossary/#events).

## Was ist ein Blockchain-Orakel? {#what-is-a-blockchain-oracle}

Oracles sind Anwendungen, die externe Informationen (d. h. Offchain gespeicherte Informationen) beschaffen, überprüfen und an Smart Contracts übermitteln, die auf der Blockchain ausgeführt werden. Neben dem „Abrufen“ von Off-Chain-Daten und dem Übertragen auf Ethereum können Orakel auch Informationen von der Blockchain an externe Systeme „pushen“, z. B. ein Smart Lock entsperren, sobald der Benutzer eine Gebühr über eine Ethereum-Transaktion sendet.

Ohne ein Oracle wäre ein Smart Contract vollständig auf On-Chain-Daten beschränkt.

Orakles unterscheiden sich in Bezug auf die Datenquelle (eine oder mehrere Quellen), Vertrauensmodelle (zentralisiert oder dezentralisiert) und Systemarchitektur (sofort-lesen, publish-subscribe und request-response). Wir können auch zwischen Orakeln unterscheiden, je nachdem, ob sie externe Daten für die Nutzung durch On-Chain-Verträge abrufen (Input-Orakel), Informationen von der Blockchain zu Off-Chain-Anwendungen senden (Output-Orakel) oder rechnerische Aufgaben außerhalb der Blockchain ausführen (Computational-Orakel).

## Warum benötigen Smart Contracts Orakel? {#why-do-smart-contracts-need-oracles}

Viele Entwickler betrachten Smart Contracts als Code, der an spezifischen Adressen auf der Blockchain ausgeführt wird. Eine [allgemeinere Sichtweise auf Smart Contracts](/smart-contracts/) ist jedoch, dass es sich um selbstausführende Softwareprogramme handelt, die in der Lage sind, Vereinbarungen zwischen Parteien durchzusetzen, sobald bestimmte Bedingungen erfüllt sind – daher der Begriff „Smart Contracts“.

Die Verwendung von Smart Contracts zur Durchsetzung von Vereinbarungen zwischen Personen ist aufgrund der Deterministik von Ethereum nicht einfach. Ein [deterministisches System](https://en.wikipedia.org/wiki/Deterministic_algorithm) ist eines, das bei einem gegebenen Anfangszustand und einer bestimmten Eingabe immer die gleichen Ergebnisse liefert, was bedeutet, dass es bei der Berechnung von Ausgaben aus Eingaben keine Zufälligkeit oder Variation gibt.

Um eine deterministische Ausführung zu erreichen, beschränken Blockchains die Nodes darauf, einen Konsens über einfache binäre (wahr/falsch) Fragen zu erzielen, indem sie _ausschließlich_ Daten verwenden, die auf der Blockchain selbst gespeichert sind. Beispiele für solche Fragen umfassen:

- „Hat der Kontoinhaber (identifiziert durch einen öffentlichen Schlüssel) diese Transaktion mit dem zugehörigen privaten Schlüssel signiert?“
- „Verfügt dieses Konto über ausreichende Mittel, um die Transaktion abzudecken?“
- „Ist diese Transaktion im Kontext dieses Smart Contracts gültig?“, usw.

Wenn Blockchains Informationen von externen Quellen (d.h. aus der realen Welt) erhielten, wäre eine deterministische Ausführung unmöglich zu erreichen, was die Nodes daran hindern würde, sich über die Gültigkeit von Änderungen am Zustand der Blockchain einig zu werden. Nehmen Sie zum Beispiel einen Smart Contract, der eine Transaktion basierend auf dem aktuellen ETH-USD Wechselkurs ausführt, der von einer traditionellen Preis-API bezogen wird. Diese Zahl wird wahrscheinlich häufig ändern (ganz zu schweigen davon, dass die API veraltet oder gehackt werden könnte), was bedeutet, dass Knoten, die denselben Vertragscode ausführen, zu unterschiedlichen Ergebnissen kommen würden.

Für eine öffentliche Blockchain wie Ethereum, mit Tausenden von Nodes weltweit, die Transaktionen verarbeiten, ist Determinismus von entscheidender Bedeutung. Ohne eine zentrale Autorität als Quelle der Wahrheit benötigen Nodes Mechanismen, um nach der Anwendung derselben Transaktionen zum gleichen Zustand zu gelangen. Ein Fall, in dem Node A einen Smart Contract ausführt und als Ergebnis "3" erhält, während Node B "7" erhält, nachdem er dieselbe Transaktion ausgeführt hat, würde den Konsens zusammenbrechen lassen und den Wert von Ethereum als dezentralisierte Computing-Plattform zunichte machen.

Dieses Szenario hebt auch das Problem hervor, das mit dem Entwurf von Blockchains entsteht, um Informationen aus externen Quellen zu beziehen. Orakel lösen dieses Problem jedoch, indem sie Informationen aus Off-Chain-Quellen entnehmen und diese auf der Blockchain speichern, damit Smart Contracts sie nutzen können. Da auf der Blockchain gespeicherte Informationen unveränderlich und öffentlich zugänglich sind, können Ethereum-Nodes die vom Oracle importierten Off-Chain-Daten sicher verwenden, um Zustandsänderungen zu berechnen, ohne den Konsens zu brechen.

Um dies zu erreichen, besteht ein Oracle in der Regel aus einem Smart Contract, der auf der Blockchain läuft, und einigen Off-Chain-Komponenten. Der On-Chain-Vertrag erhält Anfragen nach Daten von anderen Smart Contracts, die er an die Off-Chain-Komponente (auch Oracle-Node genannt) weiterleitet. Dieser Oracle-Node kann Datenquellen abfragen – beispielsweise unter Verwendung von Anwendungsprogrammierschnittstellen (APIs) – und Transaktionen senden, um die angeforderten Daten im Speicher des Smart Contracts zu speichern.

Im Wesentlichen überbrückt ein Blockchain-Oracle die Informationslücke zwischen der Blockchain und der externen Umgebung, wodurch „hybride Smart Contracts“ entstehen. Ein hybrider Smart Contract ist einer, der auf einer Kombination aus On-Chain-Vertragscode und Off-Chain-Infrastruktur basiert. Dezentrale Prognosemärkte sind ein hervorragendes Beispiel für hybride Smart Contracts. Andere Beispiele könnten Smart Contracts für Ernteversicherungen sein, die eine Zahlung leisten, wenn eine Gruppe von Orakeln feststellt, dass bestimmte Wetterphänomene eingetreten sind.

## Was ist das Oracle-Problem? Das Oracle-Problem {#the-oracle-problem}

Orakel lösen ein wichtiges Problem, führen aber auch einige Komplikationen ein, zum Beispiel.,:

- Wie können wir überprüfen, dass die eingespeiste Information aus der richtigen Quelle extrahiert wurde oder nicht manipuliert wurde?

- Wie stellen wir sicher, dass diese Daten immer verfügbar sind und regelmäßig aktualisiert werden?

Das sogenannte "Orakle-Problem" zeigt die Probleme auf, die mit der Verwendung von Blockchain-Orakeln zur Übermittlung von Eingaben an Smart Contracts verbunden sind. Die Daten von einem Orakel müssen korrekt sein, damit ein Smart Contract korrekt ausgeführt wird. Darüber hinaus untergräbt das notwendige 'Vertrauen' in die Betreiber von Orakeln, genaue Informationen zu liefern, den 'vertrauenslosen' Aspekt von Smart Contracts.

Different oracles offer different solutions to the oracle problem, which we explore later. Orakel werden typischerweise danach bewertet, wie gut sie die folgenden Herausforderungen bewältigen können:

1. **Korrektheit**: Ein Oracle sollte nicht dazu führen, dass Smart Contracts Zustandsänderungen auf Basis ungültiger Off-Chain-Daten auslösen. Ein Orakel muss die _Authentizität_ und _Integrität_ der Daten gewährleisten. Authentizität bedeutet, dass die Daten aus der richtigen Quelle stammen, während Integrität bedeutet, dass die Daten intakt geblieben sind (d. h. nicht verändert wurden), bevor sie onchain gesendet wurden.

2. **Verfügbarkeit**: Ein Orakel sollte keine Verzögerungen verursachen oder die Ausführung von Aktionen und das Auslösen von Zustandsänderungen durch Smart Contracts verhindern. Das bedeutet, dass die Daten von einem Orakel _auf Anfrage_ ohne Unterbrechung verfügbar sein müssen.

3. **Anreizkompatibilität**: Ein Oracle sollte Off-Chain-Datenanbieter dazu anreizen, korrekte Informationen an Smart Contracts zu übermitteln. Anreizkompatibilität beinhaltet _Zurechenbarkeit_ und _Rechenschaftspflicht_. Zurechenbarkeit ermöglicht die Verknüpfung eines Stücks externer Information mit ihrem Anbieter, während Verantwortlichkeit die Datenanbieter an die von ihnen gelieferten Informationen bindet, sodass sie basierend auf der Qualität der bereitgestellten Informationen belohnt oder bestraft werden können.

## Wie funktioniert ein Blockchain-Orakel-Dienst? Wie funktioniert ein Blockchain-Oracle-Service? {#how-does-a-blockchain-oracle-service-work}

### Benutzer {#users}

Benutzer sind Entitäten (d.h. Smart Contracts), die Informationen benötigen, die extern zur Blockchain liegen, um bestimmte Aktionen abzuschließen. Der grundlegende Arbeitsablauf eines Orakel-Dienstes beginnt damit, dass der Benutzer eine Datenanfrage an den Orakel-Vertrag sendet. Datenanfragen werden gewöhnlich einige oder alle der folgenden Fragen beantworten:

1. Welche Quellen können Off-Chain-Nodes für die angeforderten Informationen konsultieren?

2. Wie verarbeiten Reporter Informationen aus Datenquellen und extrahieren nützliche Datenpunkte?

3. Wie viele Oracle Nodes können an der Datenabfrage teilnehmen?

4. Wie sollten Diskrepanzen in Berichten von Orakeln verwaltet werden?

5. Welche Methode sollte implementiert werden, um Einreichungen zu filtern und Berichte zu einem einzigen Wert zu aggregieren?

### Oracle-Vertrag {#oracle-contract}

Der Oracle-Vertrag ist die On-Chain-Komponente des Oracle-Dienstes. Der Oracle Contract ist die On-Chain-Komponente für den Oracle-Service. Dieser Vertrag kann auch einige Berechnungen auf den zurückgegebenen Datenpunkten durchführen, um einen aggregierten Wert zu erzeugen, der an den anfragenden Vertrag gesendet wird.

Der Orakelvertrag stellt einige Funktionen bereit, die von Client-Verträgen aufgerufen werden, wenn eine Datenanfrage gestellt wird. Nach Erhalt einer neuen Anfrage gibt der Smart Contract ein [Log-Ereignis](/developers/docs/smart-contracts/anatomy/#events-and-logs) mit den Details der Datenanfrage aus. Dies benachrichtigt Offchain-Nodes, die das Protokoll abonniert haben (normalerweise mit etwas wie dem JSON-RPC-Befehl `eth_subscribe`), die dann die im Log-Ereignis definierten Daten abrufen.

Nachfolgend finden Sie einen [Beispiel-Oracle-Vertrag](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) von Pedro Costa. Dies ist ein einfacher Oracle-Dienst, der auf Anfrage von anderen Smart Contracts Off-Chain-APIs abfragen und die angeforderten Informationen auf der Blockchain speichern kann:

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //Liste der an den Vertrag gestellten Anfragen
  uint currentId = 0; //ansteigende Anforderungs-ID
  uint minQuorum = 2; //Mindestanzahl der zu erhaltenden Antworten, bevor das Endergebnis deklariert wird
  uint totalOracleCount = 3; // Fest programmierte Oracle-Anzahl

  // definiert eine allgemeine API-Anfrage
  struct Request {
    uint id;                            //Anforderungs-ID
    string urlToQuery;                  //API-URL
    string attributeToFetch;            //JSON-Attribut (Schlüssel), das in der Antwort abgerufen werden soll
    string agreedValue;                 //Wert vom Schlüssel
    mapping(uint => string) answers;     //von den Oracles bereitgestellte Antworten
    mapping(address => uint) quorum;    //Oracles, die die Antwort abfragen (1=Oracle hat nicht abgestimmt, 2=Oracle hat abgestimmt)
  }

  //Ereignis, das das Oracle außerhalb der Blockchain auslöst
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //wird ausgelöst, wenn ein Konsens über das Endergebnis erzielt wird
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

    // Fest programmierte Oracle-Adressen
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // ein Ereignis auslösen, das vom Oracle außerhalb der Blockchain erkannt wird
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // Anforderungs-ID erhöhen
    currentId++;
  }

  //vom Oracle aufgerufen, um seine Antwort aufzuzeichnen
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
        //ersten leeren Slot finden
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //durch die Oracle-Liste iterieren und prüfen, ob genügend Oracles (Mindestquorum)
      //für dieselbe Antwort wie die aktuelle gestimmt haben
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

Der Oracle-Node ist die Off-Chain-Komponente des Oracle-Dienstes. Er extrahiert Informationen aus externen Quellen, wie zum Beispiel APIs, die auf Drittanbieterservern gehostet werden, und stellt diese On-Chain für die Nutzung durch Smart Contracts bereit. Oracle-Nodes hören auf Ereignisse aus dem On-Chain-Oracle-Vertrag und führen die in der Protokollmeldung beschriebene Aufgabe aus.

Eine häufige Aufgabe für Oracle-Nodes ist das Senden einer [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp)-Anfrage an einen API-Dienst, das Parsen der Antwort, um relevante Daten zu extrahieren, das Formatieren in eine Blockchain-lesbare Ausgabe und das Senden onchain durch Einbindung in eine Transaktion an den Oracle-Vertrag. Der Orakel-Node kann auch verpflichtet sein, die Gültigkeit und Integrität der eingereichten Informationen mit „Echtheitsbeweisen“ zu bestätigen, die wir später näher betrachten.

Auch Computations-Oracles verlassen sich auf Off-Chain-Nodes, um rechenintensive Aufgaben auszuführen, die aufgrund von Gas-Kosten und Blockgrößenbeschränkungen nicht praktikabel On-Chain durchgeführt werden könnten. Zum Beispiel kann der Oracle-Node damit beauftragt werden, eine nachweislich zufällige Zahl zu generieren (z.B. für blockchain-basierte Spiele).

## Oracle-Designmuster {#oracle-design-patterns}

Oracles gibt es in verschiedenen Typen, einschließlich _Immediate-Read_, _Publish-Subscribe_ und _Request-Response_, wobei die beiden letzteren bei Ethereum-Smart-Contracts am beliebtesten sind. Hier beschreiben wir kurz die Publish-Subscribe- und Request-Response-Modelle.

### Publish-Subscribe-Oracles {#publish-subscribe-oracles}

Dieser Typ von Oracle stellt einen "Datenfeed" zur Verfügung, den andere Verträge regelmäßig für Informationen abrufen können. In diesem Fall wird erwartet, dass sich die Daten häufig ändern, sodass die Client-Verträge auf Aktualisierungen der Daten im Speicher des Oracles achten müssen. Ein Beispiel ist ein Oracle, das Nutzern die neuesten ETH-USD-Preisinformationen zur Verfügung stellt.

### Request-Response-Oracles {#request-response-oracles}

Ein Request-Response-Setup ermöglicht es dem Client-Vertrag, beliebige Daten anzufordern, die über die von einem Publish-Subscribe-Oracle bereitgestellten Daten hinausgehen. Request-Response-Oracles sind ideal, wenn der Datensatz zu groß ist, um im Speicher eines Smart Contracts gespeichert zu werden, und/oder die Nutzer zu jedem Zeitpunkt nur einen kleinen Teil der Daten benötigen.

Obwohl komplexer als Publish-Subscribe-Modelle, sind Request-Response-Oracles im Grunde das, was wir im vorherigen Abschnitt beschrieben haben. Der Oracle wird eine On-Chain-Komponente haben, die eine Datenanfrage empfängt und diese an einen Off-Chain-Node zur Verarbeitung weiterleitet.

Benutzer, die Datenabfragen initiieren, müssen die Kosten für das Abrufen von Informationen aus der Off-Chain-Quelle übernehmen. Der Client-Vertrag muss auch Mittel bereitstellen, um die Gas-Kosten zu decken, die durch den Oracle-Vertrag beim Zurücksenden der Antwort über die in der Anfrage spezifizierte Callback-Funktion entstehen.

## Zentralisierte vs. dezentralisierte Oracles {#types-of-oracles}

### Zentralisierte Oracles {#centralized-oracles}

Ein zentralisierter Oracle wird von einer einzigen Entität kontrolliert, die für das Sammeln von Off-Chain-Informationen und das Aktualisieren der Daten im Oracle-Vertrag auf Anfrage verantwortlich ist. Zentralisierte Oracles sind effizient, da sie sich auf eine einzige Wahrheitsquelle stützen. Sie können besser funktionieren in Fällen, in denen proprietäre Datensätze direkt vom Besitzer mit einer weit akzeptierten Signatur veröffentlicht werden. Sie bringen jedoch auch Nachteile mit sich:

#### Geringe Korrektheitsgarantien {#low-correctness-guarantees}

Bei zentralisierten Orakeln gibt es keine Möglichkeit zu bestätigen, ob die bereitgestellten Informationen korrekt sind oder nicht. Selbst "renommierte" Anbieter können unzuverlässig werden oder gehackt werden. Wenn das Orakel korrupt wird, führen Smart Contracts Ausführungen auf Basis fehlerhafter Daten durch.

#### Schlechte Verfügbarkeit {#poor-availability}

Zentralisierte Oracles garantieren nicht, dass Off-Chain-Daten immer für andere Smart Contracts verfügbar gemacht werden. Wenn der Anbieter sich entscheidet, den Dienst abzuschalten, oder ein Hacker die Off-Chain-Komponente des Oracles übernimmt, besteht für deinen Smart Contract das Risiko eines Denial-of-Service (DoS)-Angriffs.

#### Schlechte Anreizkompatibilität {#poor-incentive-compatibility}

Zentralisierte Orakel haben oft schlecht konzipierte oder nicht vorhandene Anreize für den Datenanbieter, genaue/unveränderte Informationen zu senden. Die Bezahlung eines Orakels für Korrektheit garantiert nicht dessen Ehrlichkeit. Dieses Problem wird größer, je mehr Wert von Smart Contracts kontrolliert wird.

### Dezentralisierte Oracles {#decentralized-oracles}

Dezentralisierte Orakel sind darauf ausgelegt, die Einschränkungen zentralisierter Orakel zu überwinden, indem sie einzelne Ausfallpunkte beseitigen. Ein dezentraler Oracle-Dienst besteht aus mehreren Teilnehmern in einem Peer-to-Peer-Netzwerk, die vor dem Senden an einen Smart Contract ein Konsens über die Off-Chain-Daten bilden.

Ein dezentralisiertes Oracle sollte (idealerweise) erlaubnisfrei, vertrauenslos und frei von der Verwaltung durch eine zentrale Partei sein; in der Realität ist die Dezentralisierung bei Oracles ein Spektrum. Es gibt halb-dezentralisierte Orakel Netzwerke wo jeder Teilnehmen kann, aber mit einem "Besitzer" welcher Knoten nach historischer Leistung erlaubt und entfernt. Vollständig dezentralisierte Orakelnetzwerke existieren ebenfalls: Diese funktionieren in der Regel als eigenständige Blockchains und verfügen über definierte Konsensmechanismen zur Koordination der Nodes und zur Bestrafung von Fehlverhalten.

Die Nutzung dezentralisierter Orakel bietet folgende Vorteile:

### Hohe Korrektheitsgarantien {#high-correctness-guarantees}

Dezentralisierte Orakel versuchen, die Korrektheit von Daten durch verschiedene Ansätze zu gewährleisten. Dazu gehört die Verwendung von Nachweisen, die die Authentizität und Integrität der zurückgegebenen Informationen bestätigen, sowie die Notwendigkeit, dass mehrere Akteure kollektiv die Gültigkeit der Off-Chain-Daten bestätigen.

#### Authentizitätsnachweise {#authenticity-proofs}

Authentizitätsnachweise sind kryptografische Mechanismen, die eine unabhängige Überprüfung von Informationen ermöglichen, die aus externen Quellen abgerufen wurden. Diese Nachweise können die Quelle der Informationen validieren und mögliche Veränderungen der Daten nach deren Abruf erkennen.

Beispiele für Authentizitätsnachweise umfassen:

**Transport Layer Security (TLS)-Nachweise**: Oracle-Nodes rufen häufig Daten aus externen Quellen über eine sichere HTTP-Verbindung ab, die auf dem Transport Layer Security (TLS)-Protokoll basiert. Einige dezentralisierte Orakel verwenden Authentizitätsnachweise, um TLS-Sitzungen zu verifizieren (das heißt, den Informationsaustausch zwischen einem Node und einem bestimmten Server zu bestätigen) und um sicherzustellen, dass die Inhalte der Sitzung nicht verändert wurden.

**Trusted Execution Environment (TEE)-Attestierungen**: Eine [Trusted Execution Environment](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) ist eine abgeschottete Rechenumgebung, die von den Betriebsprozessen ihres Host-Systems isoliert ist. TEEs stellen sicher, dass jeglicher Anwendungscode oder Daten, die in der Rechenumgebung gespeichert oder verwendet werden, ihre Integrität, Vertraulichkeit und Unveränderlichkeit bewahren. Benutzer können auch eine Attestierung erstellen, um zu beweisen, dass eine Anwendungsinstanz innerhalb der Trusted Execution Environment läuft.

Bestimmte Klassen dezentralisierter Orakel erfordern, dass Betreiber von Orakel-Nodes TEE-Attestierungen bereitstellen. Dies bestätigt dem Benutzer, dass der Node-Betreiber eine Instanz des Orakel-Clients in einer Trusted Execution Environment ausführt. TEEs verhindern, dass externe Prozesse den Code und die Daten einer Anwendung ändern oder lesen. Daher beweisen diese Attestierungen, dass der Orakel-Node die Informationen unverändert und vertraulich gehalten hat.

#### Konsensbasierte Validierung von Informationen {#consensus-based-validation-of-information}

Zentralisierte Orakel stützen sich auf eine einzelne Quelle der Wahrheit, wenn sie Daten an Smart Contracts liefern, was die Möglichkeit der Veröffentlichung ungenauer Informationen mit sich bringt. Dezentrale Oracles lösen dieses Problem, indem sie auf mehrere Oracle-Nodes zurückgreifen, um Off-Chain-Informationen abzufragen. Durch den Vergleich von Daten aus mehreren Quellen reduzieren dezentrale Oracles das Risiko, ungültige Informationen an On-Chain-Verträge weiterzuleiten.

Dezentrale Oracles müssen jedoch mit Diskrepanzen in den von mehreren Off-Chain-Quellen abgerufenen Informationen umgehen. Um Unterschiede in den Informationen zu minimieren und sicherzustellen, dass die an den Orakel-Vertrag übergebenen Daten die kollektive Meinung der Orakel-Nodes widerspiegeln, verwenden dezentralisierte Orakel folgende Mechanismen:

##### Abstimmung/Einsatz bezüglich der Genauigkeit von Daten

Einige dezentralisierte Orakelnetzwerke erfordern, dass Teilnehmer über die Genauigkeit von Antworten auf Datenanfragen abstimmen oder Einsätze tätigen (z.B. "Wer hat die US-Wahl 2020 gewonnen?") unter Verwendung des nativen Tokens des Netzwerks. Ein Aggregationsprotokoll aggregiert dann die Stimmen und Einsätze und nimmt die von der Mehrheit unterstützte Antwort als die gültige an.

Ein Aggregationsprotokoll aggregiert dann die Stimmen und Einsätze und nimmt die von der Mehrheit unterstützte Antwort als die gültige an. Das Erfordern einer Kaution von den Nodes, bevor sie Daten bereitstellen, motiviert zu ehrlichen Antworten, da angenommen wird, dass sie rationale ökonomische Akteure sind, die darauf abzielen, ihre Erträge zu maximieren.

Staking/Abstimmungen schützen dezentrale Oracles auch vor [Sybil-Angriffen](/glossary/#sybil-attack), bei denen böswillige Akteure mehrere Identitäten erstellen, um das Konsenssystem zu manipulieren. Allerdings kann Staking „Trittbrettfahren“ (Nodes kopieren Informationen von anderen) und „faule Validierung“ (Nodes folgen der Mehrheit, ohne die Informationen selbst zu überprüfen) nicht verhindern.

##### Schelling-Punkt-Mechanismen

Ein [Schelling-Punkt](https://en.wikipedia.org/wiki/Focal_point_\(game_theory\)) ist ein spieltheoretisches Konzept, das davon ausgeht, dass mehrere Entitäten bei fehlender Kommunikation immer auf eine gemeinsame Lösung für ein Problem zurückgreifen. Schelling-Punkt-Mechanismen werden häufig in dezentralen Orakel-Netzwerken verwendet, um Nodes zu ermöglichen, einen Konsens über Antworten auf Datenanfragen zu erreichen.

Eine frühe Idee dafür war [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/), ein vorgeschlagener Datenfeed, bei dem die Teilnehmer Antworten auf „skalare“ Fragen (Fragen, deren Antworten durch eine Größenordnung beschrieben werden, z. B. „Wie hoch ist der Preis von ETH?“) zusammen mit einer Einlage einreichen. Benutzer, die Werte zwischen dem 25. und 75. [Perzentil](https://en.wikipedia.org/wiki/Percentile) angeben, werden belohnt, während diejenigen, deren Werte stark vom Medianwert abweichen, bestraft werden.

Obwohl es SchellingCoin heute nicht mehr gibt, nutzen eine Reihe dezentraler Oracles – insbesondere die [Oracles des Maker-Protokolls](https://docs.makerdao.com/smart-contract-modules/oracle-module) – den Schelling-Punkt-Mechanismus, um die Genauigkeit der Oracle-Daten zu verbessern. Jeder Maker-Oracle besteht aus einem Off-Chain-P2P-Netzwerk von Nodes ("Relayer" und "Feeds"), die Marktpreise für Sicherungsassets einreichen, sowie einem On-Chain-"Medianizer"-Vertrag, der den Median aller bereitgestellten Werte berechnet. Sobald die festgelegte Verzögerungszeit vorüber ist, wird dieser Medianwert zum neuen Referenzpreis für das zugehörige Asset.

Andere Beispiele für Oracles, die Schelling-Punkt-Mechanismen verwenden, sind [Chainlink Offchain Reporting](https://docs.chain.link/architecture-overview/off-chain-reporting) und [Witnet](https://witnet.io/). In beiden Systemen werden Antworten von Orakel-Nodes im Peer-to-Peer-Netzwerk zu einem einzigen aggregierten Wert wie einem Mittelwert oder Median zusammengefasst. Nodes werden entsprechend dem Grad belohnt oder bestraft, in dem ihre Antworten mit dem aggregierten Wert übereinstimmen oder von ihm abweichen.

Schelling-Punkt-Mechanismen sind attraktiv, da sie den On-Chain-Fußabdruck minimieren (es muss nur eine Transaktion gesendet werden), während gleichzeitig Dezentralisierung garantiert wird. Letzteres ist möglich, weil die Nodes die Liste der eingereichten Antworten signieren müssen, bevor sie in den Algorithmus eingespeist wird, der den Mittelwert/Medianwert berechnet.

### Verfügbarkeit {#availability}

Dezentrale Oracle-Dienste gewährleisten eine hohe Verfügbarkeit von Off-Chain-Daten für Smart Contracts. Dies wird erreicht, indem sowohl die Quelle der Off-Chain-Informationen als auch die Nodes, die für die Übertragung der Informationen On-Chain verantwortlich sind, dezentralisiert werden.

Dies gewährleistet Fehlertoleranz, da der Orakelvertrag sich auf mehrere Nodes (die sich auch auf mehrere Datenquellen stützen) verlassen kann, um Abfragen von anderen Verträgen auszuführen. Die Dezentralisierung auf der Ebene der Quelle _und_ des Node-Betreibers ist entscheidend – ein Netzwerk von Oracle-Nodes, das Informationen aus derselben Quelle bereitstellt, wird auf dasselbe Problem stoßen wie ein zentralisiertes Oracle.

Es ist auch möglich, dass stake-basierte Oracles die Node-Betreiber bestrafen, die nicht schnell auf Datenanfragen reagieren. Dies incentiviert Orakel-Nodes erheblich, in fehlertolerante Infrastruktur zu investieren und Daten rechtzeitig bereitzustellen.

### Gute Anreizkompatibilität {#good-incentive-compatibility}

Dezentralisierte Oracles implementieren verschiedene Anreizdesigns, um [byzantinisches](https://en.wikipedia.org/wiki/Byzantine_fault) Verhalten unter Oracle-Nodes zu verhindern. Insbesondere erreichen sie _Zurechenbarkeit_ und _Rechenschaftspflicht_:

1. Dezentralisierte Orakel-Nodes müssen häufig die Daten signieren, die sie als Antwort auf Datenanfragen bereitstellen. Diese Informationen helfen bei der Bewertung der historischen Leistung von Orakel-Nodes, sodass Nutzer unzuverlässige Orakel-Nodes bei Datenanfragen herausfiltern können. Ein Beispiel ist das [Algorithmische Reputationssystem](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system) von Witnet.

2. Dezentralisierte Orakel – wie zuvor erläutert – können verlangen, dass Nodes einen Einsatz auf ihre Überzeugung in die Wahrheit der von ihnen übermittelten Daten setzen. Wenn die Behauptung zutrifft, kann dieser Einsatz zusammen mit Belohnungen für ehrlichen Dienst zurückgegeben werden. But it can also be slashed in case the information is incorrect, which provides some measure of accountability.

## Anwendungen von Oracles in Smart Contracts {#applications-of-oracles-in-smart-contracts}

Die folgenden sind häufige Anwendungsfälle für Orakel in Ethereum:

### Abrufen von Finanzdaten {#retrieving-financial-data}

[Dezentralisierte Finanzen](/defi/) (DeFi) ermöglichen Peer-to-Peer-Kreditvergabe, -aufnahme und den Handel mit Vermögenswerten. Dies erfordert oft das Einholen verschiedener Finanzinformationen, einschließlich Wechselkursdaten (zur Berechnung des Fiat-Werts von Kryptowährungen oder zum Vergleich von Token-Preisen) und Kapitalmarktdaten (zur Berechnung des Werts tokenisierter Vermögenswerte, wie Gold oder US-Dollar).

Ein DeFi-Kreditprotokoll muss beispielsweise die aktuellen Marktpreise für als Sicherheit hinterlegte Vermögenswerte (z. B. ETH) abfragen. Dies ermöglicht es dem Vertrag, den Wert der Sicherheitsvermögenswerte zu bestimmen und festzulegen, wie viel er vom System leihen kann.

Beliebte „Preis-Oracles“ (wie sie oft genannt werden) in DeFi umfassen Chainlink Price Feeds, den [Open Price Feed](https://compound.finance/docs/prices) von Compound Protocol, die [zeitgewichteten Durchschnittspreise (TWAPs)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) von Uniswap und die [Maker Oracles](https://docs.makerdao.com/smart-contract-modules/oracle-module).

Entwickler sollten die Vorbehalte verstehen, die mit diesen Preis-Orakeln einhergehen, bevor sie sie in ihr Projekt integrieren. Dieser [Artikel](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/) bietet eine detaillierte Analyse dessen, was bei der Planung der Verwendung eines der genannten Preis-Oracles zu beachten ist.

Im Folgenden finden Sie ein Beispiel, wie Sie den aktuellen ETH-Preis in Ihrem Smart Contract unter Verwendung eines Chainlink-Preisfeeds abrufen können:

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

### Generierung nachweisbarer Zufälligkeit {#generating-verifiable-randomness}

Bestimmte Blockchain-Anwendungen, wie blockchain-basierte Spiele oder Lotteriesysteme, benötigen ein hohes Maß an Unvorhersehbarkeit und Zufälligkeit, um effektiv zu funktionieren. Jedoch eliminiert die deterministische Ausführung von Blockchains die Zufälligkeit.

Der ursprüngliche Ansatz war die Verwendung pseudozufälliger kryptografischer Funktionen wie `blockhash`, aber diese konnten von [Minern manipuliert werden](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.) Lösung des Proof-of-Work-Algorithmus. Außerdem bedeutet [Ethereums Umstellung auf Proof-of-Stake](/roadmap/merge/), dass Entwickler sich für die Onchain-Zufälligkeit nicht mehr auf `blockhash` verlassen können. Der [RANDAO-Mechanismus](https://eth2book.info/altair/part2/building_blocks/randomness) der Beacon Chain bietet stattdessen eine alternative Quelle für Zufälligkeit.

Es ist möglich, den Zufallswert Off-Chain zu generieren und ihn dann On-Chain zu senden, aber dies stellt hohe Vertrauensanforderungen an die Nutzer. Sie müssen glauben, dass der Wert tatsächlich durch unvorhersehbare Mechanismen erzeugt wurde und während der Übertragung nicht verändert wurde.

Oracles, die für Off-Chain-Berechnungen entwickelt wurden, lösen dieses Problem, indem sie zufällige Ergebnisse sicher Off-Chain generieren und diese zusammen mit kryptografischen Beweisen, die die Unvorhersehbarkeit des Prozesses bestätigen, On-Chain übertragen. Ein Beispiel ist [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/) (Verifiable Random Function), ein nachweislich fairer und manipulationssicherer Zufallszahlengenerator (RNG), der für die Erstellung zuverlässiger Smart Contracts für Anwendungen nützlich ist, die auf unvorhersehbaren Ergebnissen beruhen.

### Ergebnisse für Ereignisse erhalten {#getting-outcomes-for-events}

Mit Orakeln ist es einfach, Smart Contracts zu erstellen, die auf reale Ereignisse reagieren. Oracle-Dienste machen dies möglich, indem sie Verträgen erlauben, sich über Off-Chain-Komponenten mit externen APIs zu verbinden und Informationen aus diesen Datenquellen zu nutzen. Zum Beispiel könnte die zuvor erwähnte Vorhersage-App ein Oracle anfordern, um Wahlergebnisse von einer vertrauenswürdigen Off-Chain-Quelle (z. B. der Associated Press) zurückzuliefern.

Die Verwendung von Orakeln, um Daten basierend auf realen Ergebnissen abzurufen, ermöglicht andere neuartige Anwendungsfälle; beispielsweise benötigt ein dezentralisiertes Versicherungsprodukt genaue Informationen über Wetter, Katastrophen usw., um effektiv zu funktionieren.

### Automatisierung von Smart Contracts {#automating-smart-contracts}

Smart Contracts werden nicht automatisch ausgeführt; vielmehr muss ein externes Eigentümerkonto (EOA) oder ein anderes Vertragskonto die richtigen Funktionen auslösen, um den Code des Vertrags auszuführen. In den meisten Fällen sind der Großteil der Funktionen des Vertrags öffentlich und können von externen Eigentümerkonten (EOAs) und anderen Verträgen aufgerufen werden.

Es gibt aber auch _private Funktionen_ innerhalb eines Vertrags, die für andere unzugänglich sind, aber für die allgemeine Funktionalität einer Dapp entscheidend sind. Beispiele hierfür sind eine `mintERC721Token()`-Funktion, die regelmäßig neue NFTs für Benutzer prägt, eine Funktion zur Auszahlung von Gewinnen in einem Prognosemarkt oder eine Funktion zum Freischalten von gestaketen Token in einer DEX.

Entwickler müssen solche Funktionen in Intervallen auslösen, um die Anwendung reibungslos laufen zu lassen. Dies kann jedoch zu mehr verlorenen Stunden bei routinemäßigen Aufgaben für Entwickler führen, weshalb die Automatisierung der Ausführung von Smart Contracts attraktiv ist.

Einige dezentrale Oracle-Netzwerke bieten Automatisierungsdienste an, die es Off-Chain-Oracle-Nodes ermöglichen, Smart-Contract-Funktionen gemäß von den Nutzern definierten Parametern auszulösen. Üblicherweise erfordert dies die "Registrierung" des Zielvertrags beim Orakeldienst, die Bereitstellung von Mitteln zur Bezahlung des Orakelbetreibers und die Festlegung der Bedingungen oder Zeiten zum Auslösen des Vertrags.

Das [Keeper Network](https://chain.link/keepers) von Chainlink bietet Optionen für Smart Contracts, um regelmäßige Wartungsaufgaben auf eine vertrauensminimierte und dezentralisierte Weise auszulagern. Lesen Sie die offizielle [Keeper-Dokumentation](https://docs.chain.link/docs/chainlink-keepers/introduction/) für Informationen darüber, wie Sie Ihren Vertrag Keeper-kompatibel machen und den Upkeep-Service nutzen können.

## Wie man Blockchain-Oracles verwendet {#use-blockchain-oracles}

Es gibt mehrere Oracle Anwendungen, die du in den Ethereum Dapp integrieren kannst:

**[Chainlink](https://chain.link/)** – _Dezentrale Oracle-Netzwerke von Chainlink bieten manipulationssichere Eingaben, Ausgaben und Berechnungen zur Unterstützung fortschrittlicher Smart Contracts auf jeder Blockchain._

**[RedStone Oracles](https://redstone.finance/)** – _RedStone ist ein dezentrales, modulares Oracle, das gasoptimierte Datenfeeds bereitstellt. Er spezialisiert sich darauf, Preisfeeds für aufstrebende Assets anzubieten, wie zum Beispiel Liquid-Staking-Token (LSTs), Liquid-Restaking-Token (LRTs) und Bitcoin-Staking-Derivate._

**[Chronicle](https://chroniclelabs.org/)** – _Chronicle überwindet die aktuellen Einschränkungen bei der Übertragung von Daten onchain durch die Entwicklung wirklich skalierbarer, kosteneffizienter, dezentraler und verifizierbarer Oracles._

**[Witnet](https://witnet.io/)** – _Witnet ist ein erlaubnisfreies, dezentrales und zensurresistentes Oracle, das Smart Contracts dabei hilft, auf Ereignisse in der realen Welt mit starken krypto-ökonomischen Garantien zu reagieren._

**[UMA Oracle](https://uma.xyz)** – _Das optimistische Oracle von UMA ermöglicht es Smart Contracts, schnell jede Art von Daten für verschiedene Anwendungen zu empfangen, einschließlich Versicherungen, Finanzderivaten und Prognosemärkten._

**[Tellor](https://tellor.io/)** – _Tellor ist ein transparentes und erlaubnisfreies Oracle-Protokoll, mit dem Ihr Smart Contract problemlos alle Daten abrufen kann, wann immer er sie benötigt._

**[Band Protocol](https://bandprotocol.com/)** – _Band Protocol ist eine kettenübergreifende Daten-Oracle-Plattform, die reale Daten und APIs aggregiert und mit Smart Contracts verbindet._

**[Pyth Network](https://pyth.network/)** – _Das Pyth-Netzwerk ist ein First-Party-Finanz-Oracle-Netzwerk, das darauf ausgelegt ist, kontinuierlich Daten aus der realen Welt onchain in einer manipulationssicheren, dezentralen und autarken Umgebung zu veröffentlichen._

**[API3 DAO](https://www.api3.org/)** – _API3 DAO liefert First-Party-Oracle-Lösungen, die eine größere Quellentransparenz, Sicherheit und Skalierbarkeit in einer dezentralen Lösung für Smart Contracts bieten_

**[Supra](https://supra.com/)** – Ein vertikal integriertes Toolkit mit kettenübergreifenden Lösungen, das alle Blockchains, ob öffentlich (L1s und L2s) oder privat (Unternehmen), miteinander verbindet und dezentrale Oracle-Preis-Feeds bereitstellt, die für Onchain- und Offchain-Anwendungsfälle genutzt werden können.

**[Gas Network](https://gas.network/)** – Eine dezentrale Oracle-Plattform, die Echtzeit-Gaspreisdaten über die Blockchain hinweg bereitstellt. Indem es Daten von führenden Gaspreis-Datenanbietern onchain bereitstellt, trägt das Gas Network zur Förderung der Interoperabilität bei. Das Gas Network unterstützt Daten für über 35 Chains, einschließlich des Ethereum Mainnets und vieler führender L2s.

## Weiterführende Lektüre {#further-reading}

**Artikel**

- [Was ist ein Blockchain-Oracle?](https://chain.link/education/blockchain-oracles) – _Chainlink_
- [Was ist ein Blockchain-Oracle?](https://medium.com/better-programming/what-is-a-blockchain-oracle-f5ccab8dbd72) – _Patrick Collins_
- [Dezentrale Oracles: ein umfassender Überblick](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) – _Julien Thevenard_
- [Implementierung eines Blockchain-Oracles auf Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Warum können Smart Contracts keine API-Aufrufe tätigen?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) – _StackExchange_
- [Sie möchten also ein Preis-Oracle verwenden](https://samczsun.com/so-you-want-to-use-a-price-oracle/) – _samczsun_

**Videos**

- [Oracles und die Erweiterung des Nutzens der Blockchain](https://youtu.be/BVUZpWa8vpw) – _Real Vision Finance_

**Tutorials**

- [Wie man den aktuellen Preis von Ethereum in Solidity abruft](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) – _Chainlink_
- [Oracle-Daten konsumieren](https://docs.chroniclelabs.org/Developers/tutorials/Remix) – _Chronicle_

**Beispielprojekte**

- [Vollständiges Chainlink-Starterprojekt für Ethereum in Solidity](https://github.com/hackbg/chainlink-fullstack) – _HackBG_
