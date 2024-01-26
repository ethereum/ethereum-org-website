---
title: Oracles
description: Oracles helfen dabei, Daten aus der realen Welt in Ihre Ethereum-Anwendung zu bringen, da Smart Contracts die realen Daten nicht allein abfragen können.
lang: de
incomplete: true
---

Oracles sind Datenleitungen, die Ethereum mit Offchain-Informationen in der realen Welt verbinden, so dass Sie Daten in Ihren Smart Contracts abfragen können. Zum Beispiel nutzen Vorhersagemarkt-dApps Oracles zur Begleichung von Zahlungen auf der Grundlage von Events. Ein Vorhersagemarkt könnte Sie fragen, Ihre ETH auf den nächsten Präsidenten der Vereinigten Staaten zu wetten. Sie werden ein Oracle verwenden, um das Ergebnis zu bestätigen und entsprechend an die Gewinner zu zahlen.

## Voraussetzungen {#prerequisites}

Stellen Sie sicher, dass Sie mit [Knotenpunkten](/developers/docs/nodes-and-clients/), [Konsensmechanismen](/developers/docs/consensus-mechanisms/)und [Smart Contract-Anatomie](/developers/docs/smart-contracts/anatomy/)vertraut sind, im speziellen Smart Contract-Events.

## Was ist ein Oracle {#what-is-an-oracle}

Ein Oracle ist eine Brücke zwischen der Blockchain und der realen Welt. Sie fungieren als on-chain APIs, die Sie abfragen können, um Informationen für Ihre Smart Contracts zu bekommen. Dies könnte theoretisch alles sein, von Preisinformationen bis hin zu Wetterberichten. Oracles können auch bidirektional sein, um Daten in die reale Welt zu „senden".

Schauen Sie sich an, wie Patrick Oracles erklärt:

<YouTube id="ZJfkNzyO7-U" start="10" />

## Warum werden sie benötigt? {#why-are-they-needed}

Bei einer Blockchain wie Ethereum muss jeder Knotenpunkt im Netzwerk jede Transaktion wiederholen und am Ende garantiert das gleiche Ergebnis erzielen. APIs führen potenziell variable Daten ein. Wenn Sie ETH auf Basis eines vereinbarten $USD-Werts über eine Preis-API senden würden, würde die Abfrage von einem Tag auf den anderen ein anderes Ergebnis liefern. Nicht zu vergessen, die API könnte gehackt oder veraltet sein. Wenn dies geschieht, könnten sich die Knotenpunkte im Netzwerk nicht auf den aktuellen Zustand von Ethereum einigen und damit den [Konsens](/developers/docs/consensus-mechanisms/) brechen.

Oracles lösen dieses Problem, indem die Daten auf der Blockchain veröffentlicht werden. Jeder Knotenpunkt, der die Transaktion wiedergibt, verwendet also die gleichen unveränderlichen Daten, die für alle sichtbar sind. Dazu besteht ein Oracle in der Regel aus einem Smart Contract und einigen Off-Chain-Komponenten, die APIs abfragen können. Es werden regelmäßig Transaktionen gesendet, um die Daten des Smart Contract zu aktualisieren.

### Das Oracle-Problem {#oracle-problem}

Wie wir bereits erwähnt haben, können Ethereum-Transaktionen nicht direkt auf Off-Chain-Daten zugreifen. Gleichzeitig ist es unsicher, sich bei der Bereitstellung von Daten auf eine einzige Quelle der Wahrheit zu verlassen, und es macht die Dezentralisierung eines Smart Contract zunichte. Dies ist als Oracle-Problem bekannt.

Wir können das Oracle-Problem vermeiden, indem wir ein dezentrales Oracle verwenden, das Daten aus mehreren Quellen schöpft. Wenn eine Datenquelle gehackt wird oder ausfällt, funktioniert der Smart Contract trotzdem wie vorgesehen.

### Sicherheit {#security}

Ein Oracle ist nur so sicher wie seine Datenquelle(n). Wenn ein dApp Uniswap als Oracle für seinen ETH/DAI-Preis-Feed verwendet, kann ein Angreifer den Preis auf Uniswap verschieben, um das Verständnis des dApps für den aktuellen Preis zu manipulieren. Ein Beispiel dafür, wie man dem entgegenwirken kann, ist ein [Feed-System](https://developer.makerdao.com/feeds/) wie das von MakerDAO, das Preisdaten aus vielen externen Preis-Feeds zusammenführt, anstatt sich nur auf eine einzige Quelle zu verlassen.

### Architektur {#architecture}

Dies ist ein Beispiel für eine einfache Oracle-Architektur, aber es gibt noch mehr Möglichkeiten, um Berechnungen außerhalb der Kette auszulösen.

1. Senden Sie ein Protokoll mit Ihrem [Smart-Contract-Event](/developers/docs/smart-contracts/anatomy/#events-and-logs) aus
2. Ein Off-Chain-Dienst hat diese spezifischen Logs abonniert (normalerweise mit dem JSON-RPC `eth_subscribe` Befehl).
3. Der Off-Chain-Dienst führt einige Aufgaben aus, die im Protokoll festgelegt sind.
4. Der Off-Chain-Dienst gibt mit den angeforderten Daten in einer Sekundärtransaktion eine Antwort an den Smart Contract.

Auf diese Weise erhalten Sie die Daten 1 zu 1. Um die Sicherheit zu erhöhen, sollten Sie jedoch dezentralisieren, wie Sie Ihre Off-Chain-Daten sammeln.

Der nächste Schritt könnte ein Netzwerk mit diesen Knotenpunkten sein, die diese Aufrufe an verschiedene APIs und Quellen tätigen und die Daten in der Kette zusammenführen.

[Chainlink Off-Chain Reporting](https://blog.chain.link/off-chain-reporting-live-on-mainnet/) (Chainlink OCR) hat diese Methode verbessert, indem die Off-Chain-Oracles des Netzwerks miteinander kommunizieren, ihre Antworten kryptographisch signieren, ihre Antworten off-chain zusammenfassen und nur eine Transaktion mit dem Ergebnis on-chain senden. Auf diese Weise wird weniger Gas verbraucht, aber Sie erhalten trotzdem die Garantie dezentraler Daten, da jeder Knotenpunkt seinen Teil der Transaktion signiert hat, so dass er von dem Knotenpunkt, der die Transaktion sendet, nicht mehr geändert werden kann. Die Eskalationsrichtlinie tritt in Kraft, wenn der Knotenpunkt keine Transaktion durchführt, und der nächste Knotenpunkt eine Transaktion sendet.

## Verwendung {#usage}

Mit Diensten wie Chainlink können Sie dezentrale Daten auf der Kette referenzieren, die bereits aus der realen Welt gezogen und aggregiert wurden. Eine Art öffentliches Gemeingut, aber für dezentralisierte Daten. Sie können auch Ihre eigenen modularen Oracle Netzwerke aufbauen, um alle gewünschten Daten zu erhalten. Darüber hinaus können Sie auch Berechnungen außerhalb der Blockchain durchführen und Informationen an die reale Welt senden. Chainlink verfügt über die nötige Infrastruktur:

- [Erhalten Sie Krypto-Preis-Feeds in Ihrem Vertrag](https://chain.link/solutions/defi)
- [Generieren Sie überprüfbare zufällige Zahlen (nützlich zum Spielen)](https://chain.link/solutions/chainlink-vrf)
- [Aufruf externer APIs](https://docs.chain.link/docs/request-and-receive-data) – Eine neuartige Anwendung dieser Methode ist die [Überprüfung der wBTC-Reserven](https://cointelegraph.com/news/1b-in-wrapped-bitcoin-now-being-audited-using-chainlink-s-proof-of-reserve)

Hier ist ein Beispiel dafür, wie Sie den neuesten ETH-Preis in Ihrem Smart Contract mithilfe eines Chainlink-Preis-Feeds erhalten:

### Chainlink-Datenleitungen {#chainlink-data-feeds}

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

[Sie können dies in Remix mit diesem Link testen](https://remix.ethereum.org/#version=soljson-v0.6.7+commit.b8d736ae.js&optimize=false&evmVersion=null&gist=0c5928a00094810d2ba01fd8d1083581)

[Dokumentation ansehen](https://docs.chain.link/docs/get-the-latest-price)

### Chainlink-VRF {#chainlink-vrf}

Chainlink-VRF (Verifiable Random Function) ist eine nachweislich faire und überprüfbare Zufallsquelle, die für Smart Contracts entwickelt wurde. Entwickler von Smart Contracts können Chainlink-VRF als manipulationssichere Zufallszahlengenerierung (RNG) verwenden, um zuverlässige Smart Contracts für alle Anwendungen zu erstellen, die auf unvorhersehbare Ergebnisse angewiesen sind:

- Blockchain-Spiele und NFTs
- Zufällige Zuweisung von Aufgaben und Ressourcen (z. B. zufällige Zuweisung von Richtern zu Fällen)
- Auswahl einer repräsentativen Stichprobe für Konsensmechanismen

Zufallszahlen sind schwierig, weil Blockchains deterministisch sind.

Die Arbeit mit Chainlink Oracles außerhalb von Datenleitungen folgt dem [Anfrage- und Empfangszyklus](https://docs.chain.link/docs/architecture-request-model) der Arbeit mit Chainlink. Sie verwenden den LINK-Token, um Oracle-Anbietern Oracle-Gas für Antworten zu senden. Der LINK-Token wurde speziell für die Arbeit mit Oracles entwickelt und basiert auf dem aktualisierten ERC-677 Token, der mit [ERC-20](/developers/docs/standards/tokens/erc-20/) rückwärts kompatibel ist. Der folgende Code, falls er im Kovan-Testnet eingesetzt wird, wird eine kryptographisch erwiesene Zufallsnummer abrufen. Um den Antrag zu stellen, finanzieren Sie den Vertrag mit einem Testnet LINK-Token, den Sie über den [Kovan LINK Faucet](https://kovan.chain.link/) erhalten können.

```javascript

pragma solidity 0.6.6;

import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";

contract RandomNumberConsumer is VRFConsumerBase {

    bytes32 internal keyHash;
    uint256 internal fee;

    uint256 public randomResult;

    /**
     * Constructor inherits VRFConsumerBase
     *
     * Network: Kovan
     * Chainlink VRF Coordinator address: 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9
     * LINK token address:                0xa36085F69e2889c224210F603D836748e7dC0088
     * Key Hash: 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4
     */
    constructor()
        VRFConsumerBase(
            0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9, // VRF Coordinator
            0xa36085F69e2889c224210F603D836748e7dC0088  // LINK Token
        ) public
    {
        keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
        fee = 0.1 * 10 ** 18; // 0.1 LINK (varies by network)
    }

    /**
     * Requests randomness from a user-provided seed
     */
    function getRandomNumber(uint256 userProvidedSeed) public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        return requestRandomness(keyHash, fee, userProvidedSeed);
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        randomResult = randomness;
    }
}
```

### Chainlink Keeper {#chainlink-keepers}

Smart Contracts können ihre eigenen Funktionen nicht zu beliebigen Zeiten oder unter beliebigen Bedingungen auslösen oder initiieren. Zustandsänderungen treten nur auf, wenn ein anderes Konto eine Transaktion initiiert (z. B. ein Benutzer, ein Oracle oder ein Vertrag). Das [Chainlink Keeper Netzwerk](https://docs.chain.link/docs/chainlink-keepers/introduction/) bietet Optionen für Smart Contracts, um regelmäßige Wartungsaufgaben auf eine vertrauensminimierte und dezentralisierte Weise auszulagern.

Um Chainlink Keeper zu verwenden, muss ein Smart Contract das [Keeper-Compatible Interface](https://docs.chain.link/docs/chainlink-keepers/compatible-contracts/) implementieren, das aus zwei Funktionen besteht:

- `checkUpkeep` - Prüft, ob der Vertrag Arbeiten erfordert.
- `performUpkeep` - Führt die Arbeit an dem Vertrag aus, wenn er von checkUpkeep angewiesen wurde.

Das folgende Beispiel ist ein einfacher Gegenvertrag. Die Variable `Counter` wird bei jeder Abfrage von `performUpkeep` um eins erhöht. Sie können den folgenden Code [mit Remix](https://remix.ethereum.org/#url=https://docs.chain.link/samples/Keepers/KeepersCounter.sol) ausprobieren

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

// KeeperCompatible.sol imports the functions from both ./KeeperBase.sol and
// ./interfaces/KeeperCompatibleInterface.sol
import "@chainlink/contracts/src/v0.7/KeeperCompatible.sol";

contract Counter is KeeperCompatibleInterface {
    /**
    * Public counter variable
    */
    uint public counter;

    /**
    * Use an interval in seconds and a timestamp to slow execution of Upkeep
    */
    uint public immutable interval;
    uint public lastTimeStamp;

    constructor(uint updateInterval) {
      interval = updateInterval;
      lastTimeStamp = block.timestamp;

      counter = 0;
    }

    function checkUpkeep(bytes calldata /* checkData */) external override returns (bool upkeepNeeded, bytes memory /* performData */) {
        upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
        // We don't use the checkData in this example. Die checkData werden bei der Registrierung des Upkeep definiert.
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        lastTimeStamp = block.timestamp;
        counter = counter + 1;
        // We don't use the performData in this example. Das performData wird durch die Abfrage der Funktion checkUpkeep durch den Keeper erzeugt
    }
}
```

Nachdem Sie einen Keeper-kompatiblen Vertrag eingerichtet haben, müssen Sie den Vertrag für [Upkeep](https://docs.chain.link/docs/chainlink-keepers/register-upkeep/) registrieren und mit LINK finanzieren, um das Keeper-Netzwerk über Ihren Vertrag zu informieren, damit Ihre Arbeit kontinuierlich ausgeführt wird.

### Keeper-Projekte {#keepers}

- [Chainlink Keeper](https://keepers.chain.link/)
- [Keep3r Netzwerk](https://docs.keep3r.network/)

### Chainlink API Aufruf {#chainlink-api-call}

[Chainlink API Calls](https://docs.chain.link/docs/make-a-http-get-request) sind der einfachste Weg, um Daten aus der Off-Chain-Welt auf die traditionelle Art und Weise zu erhalten, wie das Web funktioniert: API-Aufrufe. Da es nur eine einzige Instanz und nur ein Oracle gibt, ist es von Natur aus zentralisiert. Um wirklich dezentralisiert zu sein, müsste eine Smart-Contract-Plattform zahlreiche Knotenpunkte in einem [externen Datenmarkt](https://market.link/) verwenden.

[Setzen Sie den folgenden Code in Remix auf dem Kovan-Netzwerk ein, um ihn zu testen](https://remix.ethereum.org/#version=soljson-v0.6.7+commit.b8d736ae.js&optimize=false&evmVersion=null&gist=8a173a65099261582a652ba18b7d96c1)

Auch dies folgt dem Anfrage- und Empfangszyklus von Oracles und setzt voraus, dass der Vertrag mit Kovan LINK (dem Oracle-Gas) finanziert wird, um zu funktionieren.

```javascript
pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract APIConsumer is ChainlinkClient {

    uint256 public volume;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    /**
     * Network: Kovan
     * Oracle: 0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e
     * Job ID: 29fa9aa13bf1468788b7cc4a500a45b8
     * Fee: 0.1 LINK
     */
    constructor() public {
        setPublicChainlinkToken();
        oracle = 0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e;
        jobId = "29fa9aa13bf1468788b7cc4a500a45b8";
        fee = 0.1 * 10 ** 18; // 0.1 LINK
    }

    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data, then multiply by 1000000000000000000 (to remove decimal places from data).
     */
    function requestVolumeData() public returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        // Set the URL to perform the GET request on
        request.add("get", "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD");

        // Set the path to find the desired data in the API response, where the response format is:
        // {"RAW":
        //   {"ETH":
        //    {"USD":
        //     {
        //      "VOLUME24HOUR": xxx.xxx,
        //     }
        //    }
        //   }
        //  }
        request.add("path", "RAW.ETH.USD.VOLUME24HOUR");

        // Multiply the result by 1000000000000000000 to remove decimals
        int timesAmount = 10**18;
        request.addInt("times", timesAmount);

        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    /**
     * Receive the response in the form of uint256
     */
    function fulfill(bytes32 _requestId, uint256 _volume) public recordChainlinkFulfillment(_requestId)
    {
        volume = _volume;
    }
}
```

Sie können mehr über die Anwendungen von Chainlink erfahren, indem Sie den [Chainlink-Entwickler-Blog](https://blog.chain.link/tag/developers/) lesen.

## Oracle-Dienste {#other-services}

- [Chainlink](https://chain.link/)
- [Witnet](https://witnet.io/)
- [Provable](https://provable.xyz/)
- [Paralink](https://paralink.network/)
- [Dos.Netzwerk](https://dos.network/)

### Erstellen Sie einen Oracle-Smart-Contract {#build-an-oracle-smart-contract}

Hier ist ein Oracle-Beispielvertrag von Pedro Costa. Weitere Anmerkungen finden Sie in seinem Artikel: [Implementierung eines Blockchain Oracles auf Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e).

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //list of requests made to the contract
  uint currentId = 0; //increasing request id
  uint minQuorum = 2; //minimum number of responses to receive before declaring final result
  uint totalOracleCount = 3; // Hardcoded oracle count

  // defines a general api request
  struct Request {
    uint id;                            //request id
    string urlToQuery;                  //API url
    string attributeToFetch;            //json attribute (key) to retrieve in the response
    string agreedValue;                 //value from key
    mapping(uint => string) anwers;     //answers provided by the oracles
    mapping(address => uint) quorum;    //oracles which will query the answer (1=oracle hasn't voted, 2=oracle has voted)
  }

  //event that triggers oracle outside of the blockchain
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //triggered when there's a consensus on the final result
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

    // Hardcoded oracles address
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // launch an event to be detected by oracle outside of blockchain
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // increase request id
    currentId++;
  }

  //called by the oracle to record its answer
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //check if oracle is in the list of trusted oracles
    //and if the oracle hasn't voted yet
    if(currRequest.quorum[address(msg.sender)] == 1){

      //marking that this address has voted
      currRequest.quorum[msg.sender] = 2;

      //iterate through "array" of answers until a position if free and save the retrieved value
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //find first empty slot
        if(bytes(currRequest.anwers[tmpI]).length == 0){
          found = true;
          currRequest.anwers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //iterate through oracle list and check if enough oracles(minimum quorum)
      //have voted the same answer has the current one
      for(uint i = 0; i < totalOracleCount; i++){
        bytes memory a = bytes(currRequest.anwers[i]);
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

_Wir würden gerne mehr Dokumentation über die Erstellung eines Oracle-Smart-Contract erhalten. Wenn Sie helfen können, erstellen Sie bitte eine PR!_

## Weiterführende Informationen {#further-reading}

**Artikel**

- [Was ist ein Blockchain-Oracle?](https://chain.link/education/blockchain-oracles) - _Chainlink_
- [Was ist ein Blockchain-Oracle?](https://betterprogramming.pub/what-is-a-blockchain-oracle-f5ccab8dbd72) - _Patrick Collins_
- [Dezentralisierte Oracle: Ein umfassender Überblick](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) - _Julien Thevenard_
- [Implementieren eines Blockchain-Oracles auf Ethereum](https://medium.com/@pedrodc/implementieren-ein-blockchain-orakel-auf-ethereum-cedc7e26b49e) - _Pedro Costa_
- [Warum können Smart Contracts keine API-Aufrufe tätigen?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) - _StackExchange_
- [Warum wir dezentralisierte Oracles brauchen](https://newsletter.banklesshq.com/p/why-we-need-decentralized-oracles) - _Banklos_
- [Sie wollen also ein Preis-Oracle benutzen](https://samczsun.com/so-you-want-to-use-a-price-oracle/) -_samczsun_

**Videos**

- [Oracle und die Ausweitung der Blockchain-Nutzung](https://youtu.be/BVUZpWa8vpw) - _Real Vision Finance_

**Lernprogramme**

- [Wie man den aktuellen Preis von Ethereum in Solidity abrufen kann](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) - _Chainlink_
