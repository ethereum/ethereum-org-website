---
title: Oracoli
description: Gli oracoli aiutano a inserire dati del mondo reale in un'applicazione Ethereum perché gli Smart Contract non possono interrogare autonomamente i dati del mondo reale.
lang: it
incomplete: true
---

Gli oracoli sono feed di dati che collegano Ethereum a informazioni del mondo reale esternamente alla catena, in modo da poter interrogare i dati negli Smart Contract. Ad esempio, le dapp dei mercati predittivi utilizzano gli oracoli per effettuare i pagamenti in base a eventi. Un mercato predittivo potrebbe chiedere di puntare ETH sul prossimo presidente degli Stati Uniti. Userà un oracolo per confermare l'esito e pagare i vincitori.

## Prerequisiti {#prerequisites}

È necessario avere familiarità con [nodi](/developers/docs/nodes-and-clients/), [meccanismi di consenso](/developers/docs/consensus-mechanisms/) e [anatomia degli Smart Contract](/developers/docs/smart-contracts/anatomy/), in particolare eventi.

## Cos'è un oracolo {#what-is-an-oracle}

Un oracolo è un ponte tra la blockchain e il mondo reale. Agisce come API sulla catena, che è possibile interrogare per ottenere informazioni da inserire negli Smart Contract. Si può trattare di qualsiasi cosa, da informazioni sui prezzi a previsioni meteo. Gli oracoli possono anche essere bidirezionali ed essere usati per "inviare" i dati al mondo reale.

Guarda Patrick spiegare gli oracoli:

<YouTube id="ZJfkNzyO7-U" start="10" />

## Perché sono necessari? {#why-are-they-needed}

Con una blockchain come Ethereum, necessiti di ogni nodo nella rete per riprodurre ogni transazione e terminare con lo stesso risultato, garantito. Le API introducono dati potenzialmente variabili. Se stavi inviando ETH in base a un valore stabilito in $USD usando un'API per i prezzi, la query restituirà un risultato diverso da un giorno all'altro. Per non parlare del fatto che l'API potrebbe essere oggetto di attacchi o diventare obsoleta. In tal caso, i nodi della rete non sarebbero in grado di combaciare con lo stato corrente di Ethereum e, di fatto, verrebbe meno il [consenso](/developers/docs/consensus-mechanisms/).

Gli oracoli risolvono questo problema pubblicando i dati sulla blockchain. Quindi ogni nodo che riproduce la transazione utilizzerà gli stessi dati immutabili che vengono pubblicati affinché siano visibili a tutti. A questo scopo, un oracolo in genere è costituito da uno smart contract e da alcuni componenti esterni alla catena che possono interrogare le API e poi inviare periodicamente transazioni per aggiornare i dati dello smart contract.

### Il problema dell'oracolo {#oracle-problem}

Come menzionato, le transazioni di Ethereum non possono accedere direttamente ai dati esterni alla catena. Allo stesso tempo, basarsi su una singola fonte di verità per fornire i dati è insicuro e invalida la decentralizzazione di uno smart contract. Questo è noto come il problema dell'oracolo.

Possiamo evitarlo usando un oracolo decentralizzato che attinge da più fonti di dati; se una fonte di dati viene hackerata o non funziona, lo smart contract funzionerà comunque come previsto.

### Sicurezza {#security}

La sicurezza di un oracolo è pari a quella della sua o delle sue fonti di dati. Se una dApp usa Uniswap come oracolo per il suo feed del prezzo di ETH/DAI, un malintenzionato può spostare il prezzo su Uniswap per manipolare la comprensione della dApp del prezzo corrente. Un esempio di come combattere ciò è [un sistema di feed](https://developer.makerdao.com/feeds/) come quello usato da MakerDAO, che raccoglie i dati sui prezzi da molti feed di prezzo esterni anziché basarsi soltanto su una singola fonte.

### Architettura {#architecture}

Questo è un esempio di un'architettura semplice di un oracolo, ma esistono altri modi per innescare il calcolo esterno alla catena.

1. Emetti un registro con il tuo [evento di smart contract](/developers/docs/smart-contracts/anatomy/#events-and-logs)
2. Un servizio esterno alla catena si è iscritto (solitamente usando qualcosa come il comando `eth_subscribe` di JSON-RPC) a questi registri specifici.
3. Il servizio esterno alla catena procede con l'esecuzione di alcune attività come definito dal registro.
4. Il servizio esterno alla catena risponde coi dati richiesti in una transazione secondaria allo smart contract.

È così che si ottengono dati in un rapporto 1 a 1, tuttavia, per migliorare la sicurezza è possibile decentralizzare la raccolta dei dati esterni alla catena.

Il prossimo passaggio potrebbe consistere nel far sì che una rete di questi nodi effettuino le chiamate ad API e fonti diverse e aggreghino i dati nella catena.

Il [Chainlink Off-Chain Reporting](https://blog.chain.link/off-chain-reporting-live-on-mainnet/) (Chainlink OCR) ha migliorato questo metodo facendo comunicare tra loro le reti dell'oracolo esterne alla catena, firmando crittograficamente le loro risposte, aggregandole all'esterno della catena e inviando solo una transazione con il risultato sulla catena. In questo modo si consuma meno carburante ma si ottiene comunque la garanzia di dati decentralizzati, poiché ogni nodo ha firmato la propria parte della transazione, redendola immutabile dal nodo che invia la transazione. La politica di escalation subentra se il nodo non effettua la transazione e quello successivo la invia.

## Utilizzo {#usage}

Usando servizi come Chainlink, è possibile fare riferimento ai dati decentralizzati sulla catena che sono già stati prelevati dal mondo reale e aggregati. Una sorta di bene comune e pubblico, ma per i dati decentralizzati. È possibile anche creare le proprie reti dell'oracolo modulari per ottenere tutti i dati personalizzati desiderati. Inoltre, si può anche effettuare calcoli esterni alla catena e inviare le informazioni al mondo reale. Chainlink dispone dell'infrastruttura per:

- [ricevere feed sul prezzo di una criptovaluta nel contratto](https://chain.link/solutions/defi)
- [generare numeri casuali verificabili (utili per il gioco)](https://chain.link/solutions/chainlink-vrf)
- [chiamare API esterne](https://docs.chain.link/docs/request-and-receive-data) – Un nuovo utilizzo riguarda il [Controllo delle riserve di wBTC](https://cointelegraph.com/news/1b-in-wrapped-bitcoin-now-being-audited-using-chainlink-s-proof-of-reserve)

Ecco un esempio di come ottenere l'ultimo prezzo di ETH nel proprio smart contract usando il feed del prezzo di Chainlink:

### Feed di dati di Chainlink {#chainlink-data-feeds}

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

[Puoi testarlo nel remix con questo link](https://remix.ethereum.org/#version=soljson-v0.6.7+commit.b8d736ae.js&optimize=false&evmVersion=null&gist=0c5928a00094810d2ba01fd8d1083581)

[Consulta la documentazione](https://docs.chain.link/docs/get-the-latest-price)

### Chainlink VRF {#chainlink-vrf}

Chainlink VRF (Funzione Casuale Verificabile) è una fonte di casualità provatamente equa e verificabile, progettata per gli smart contract. Gli sviluppatori degli smart contract possono usare Chainlink VRF come generazione di numeri casuali a prova di manomissione (RNG) per creare contratti intelligenti affidabili basati su risultati imprevedibili:

- Giochi e NFT della blockchain
- Assegnazione casuale di doveri e risorse (es. assegnazione casuale di giudici ai casi)
- Scelta di un campione rappresentativo per il meccanismo del consenso

I numeri casuali sono difficili perché le blockchain sono deterministiche.

Lavorare con gli oracoli di Chainlink al di fuori dei feed di dati segue il [ciclo di richiesta e ricezione](https://docs.chain.link/docs/architecture-request-model) di lavoro con Chainlink. Viene utilizzato il token LINK per inviare carburante dell'oracolo ai suoi fornitori per restituire le risposte. Il token LINK è progettato specificamente per funzionare con gli oracoli e si basa sul token ERC-677 aggiornato, retrocompatibile con l'[ERC-20](/developers/docs/standards/tokens/erc-20/). Il seguente codice, se sviluppato sulla testnet di Kovan recupererà un numero casuale provato crittograficamente. Per effettuare la richiesta, finanzia il contratto con token LINK della testnet che puoi ottenere da [Kovan LINK Faucet](https://kovan.chain.link/).

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

Gli smart contract non possono attivare o avviare le proprie funzioni in momenti arbitrari o in condizioni arbitrarie. I cambiamenti di stato avvengono solo quando un altro account inizia una transazione (come un utente, un oracolo o un contratto). La [Rete di Chainlink Keeper](https://docs.chain.link/docs/chainlink-keepers/introduction/) fornisce opzioni per gli smart contract per esternalizzare le regolari attività di manutenzione in modo minimizzato e decentralizzato.

Per usare i Chainlink Keeper, uno smart contract deve implementare [KeeperCompatibleInterface](https://docs.chain.link/docs/chainlink-keepers/compatible-contracts/), che consiste di due funzioni:

- `checkUpkeep` - Controlla se il contratto richiede l'esecuzione di un lavoro.
- `performUpkeep` - Esegue il lavoro sul contratto, se indicato da checkUpkeep.

L'esempio seguente è un semplice contratto Counter. La variabile `counter` è incrementata di uno a ogni chiamata a `performUpkeep`. [controllare il seguente codice usando Remix](https://remix.ethereum.org/#url=https://docs.chain.link/samples/Keepers/KeepersCounter.sol)

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
        // We don't use the checkData in this example. Il checkData è definito quando l'Upkeep è stato registrato.
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        lastTimeStamp = block.timestamp;
        counter = counter + 1;
        // We don't use the performData in this example. Il performData è generato dalla chiamata del Keeper alla propria funzione checkUpkeep
    }
}
```

Dopo aver distribuito un contratto compatibile con Keeper, è necessario registrarlo per [Upkeep](https://docs.chain.link/docs/chainlink-keepers/register-upkeep/) e finanziarlo con LINK, per informare la Rete di Keeper del proprio contratto, così che il tuo lavoro sia eseguito continuamente.

### Progetti dei Keeper {#keepers}

- [Chainlink Keeper](https://keepers.chain.link/)
- [Rete Keep3r](https://docs.keep3r.network/)

### Chiamata all'API di Chainlink {#chainlink-api-call}

Le [Chiamate all'API di Chainlink](https://docs.chain.link/docs/make-a-http-get-request) sono il metodo più facile per ottenere dati dal mondo esterno alla catena con il metodo tradizionale in cui funziona il web: le chiamate API. Eseguire una sola istanza e utilizzare un solo oracolo lo rende centralizzato per natura. Per mantenerlo veramente decentralizzato, una piattaforma di smart contract dovrebbe usare numerosi nodi trovati in un [mercato di dati esterni](https://market.link/).

[Distribuisci il seguente codice nel remix sulla rete di kovan per testarlo](https://remix.ethereum.org/#version=soljson-v0.6.7+commit.b8d736ae.js&optimize=false&evmVersion=null&gist=8a173a65099261582a652ba18b7d96c1)

Questo segue anche il ciclo di richiesta e ricezione degli oracoli e necessita del finanziamento del contratto con Kovan LINK (il carburante dell'oracolo) per funzionare.

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

Puoi scoprire di più sulle applicazioni di Chainlink leggendo il [blog degli sviluppatori di Chainlink](https://blog.chain.link/tag/developers/).

## Servizi per oracoli {#other-services}

- [Chainlink](https://chain.link/)
- [Witnet](https://witnet.io/)
- [Provable](https://provable.xyz/)
- [Paralink](https://paralink.network/)
- [Dos.Network](https://dos.network/)

### Creare uno smart contract oracolo {#build-an-oracle-smart-contract}

Ecco un esempio di contratto oracolo di Pedro Costa. Puoi trovare ulteriori commenti nel suo articolo: [Implementing a Blockchain Oracle on Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e).

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
    uint lenght = requests.push(Request(currentId, _urlToQuery, _attributeToFetch, ""));
    Request storage r = requests[lenght-1];

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

_Ci piacerebbe avere più documentazione sulla creazione di uno smart contract oracolo. Se vuoi contribuire, crea una PR!_

## Letture consigliate {#further-reading}

**Articoli**

- [What Is a Blockchain Oracle?](https://chain.link/education/blockchain-oracles) - _Chainlink_
- [Oracles](https://docs.ethhub.io/built-on-ethereum/oracles/what-are-oracles/) – _EthHub_
- [What is a Blockchain Oracle?](https://betterprogramming.pub/what-is-a-blockchain-oracle-f5ccab8dbd72) - _Patrick Collins_
- [Decentralised Oracles: a comprehensive overview](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) – _Julien Thevenard_
- [Implementing a Blockchain Oracle on Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Why can't smart contracts make API calls?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) - _StackExchange_
- [Why we need decentralized oracles](https://newsletter.banklesshq.com/p/why-we-need-decentralized-oracles) - _Bankless_
- [So you want to use a price oracle](https://samczsun.com/so-you-want-to-use-a-price-oracle/) -_samczsun_

**Video**

- [Oracoli ed espansione dell'utilità della blockchain](https://youtu.be/BVUZpWa8vpw) - _Real Vision Finance_

**Tutorial**

- [Come recuperare il prezzo corrente di Ethereum in Solidity](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) - _Chainlink_
