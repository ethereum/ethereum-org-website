---
title: Oracoli
description: Gli oracoli aiutano a inserire dati del mondo reale in un'applicazione Ethereum perché gli Smart Contract non possono interrogare autonomamente i dati del mondo reale.
lang: it
sidebar: true
incomplete: true
isOutdated: true
---

Gli oracoli sono feed di dati che collegano Ethereum a informazioni del mondo reale esternamente alla catena, in modo da poter interrogare i dati negli Smart Contract. Ad esempio, le dapp dei mercati predittivi utilizzano gli oracoli per effettuare i pagamenti in base a eventi. Un mercato predittivo potrebbe chiedere di puntare ETH sul prossimo presidente degli Stati Uniti. Userà un oracolo per confermare l'esito e pagare i vincitori.

## Prerequisiti {#prerequisites}

È necessario avere familiarità con [nodi](/developers/docs/nodes-and-clients/), [meccanismi di consenso](/developers/docs/consensus-mechanisms/) e [anatomia degli Smart Contract](/developers/docs/smart-contracts/anatomy/), in particolare eventi.

## Cos'è un oracolo {#what-is-an-oracle}

Un oracolo è un ponte tra la blockchain e il mondo reale. Agisce come API sulla catena, che è possibile interrogare per ottenere informazioni da inserire negli Smart Contract. Si può trattare di qualsiasi cosa, da informazioni sui prezzi a previsioni meteo.

## Perché sono necessari? {#why-are-they-needed}

Con una blockchain come Ethereum è necessario che ogni nodo della rete sia in grado di riprodurre ogni transazione e ottenere lo stesso risultato, garantito. Le API introducono dati potenzialmente variabili. Se hai inviato a qualcuno una quantità di ETH basata su un valore concordato in $USD utilizzando un'API per i prezzi, la query restituirà un risultato diverso ogni giorno. Per non parlare del fatto che l'API potrebbe venire compromessa o essere obsoleta. In tal caso, i nodi della rete non sarebbero in grado di concordare lo stato corrente di Ethereum e, di fatto, verrebbe meno il [consenso](/developers/docs/consensus-mechanisms/).

Gli oracoli risolvono questo problema pubblicando i dati sulla blockchain. Quindi ogni nodo che riproduce la transazione utilizzerà gli stessi dati immutabili che vengono pubblicati affinché siano visibili a tutti. A questo scopo, un oracolo in genere è costituito da uno Smart Contract e da alcuni componenti esterni alla catena che possono interrogare le API e poi inviare periodicamente transazioni per aggiornare i dati dello Smart Contract.

### Sicurezza {#security}

La sicurezza di un oracolo è pari a quella delle sue origini sue fonte(i) di dati. Se una dapp utilizza Uniswap come oracolo per il suo feed di prezzo ETH/DAI, è possibile per un aggressore spostare il prezzo su Uniswap al fine di manipolare la conoscenza della dapp del prezzo corrente. Un esempio per contrastare questa situazione ciò è [un sistema di feed](https://developer.makerdao.com/feeds/) come quello usato da MakerDAO, che raccoglie i dati sui prezzi da una serie di feed di prezzo esterni anziché fare affidamento su una sola origine.

## Utilizzo {#usage}

### Oracoli come servizio {#oracles-as-a-service}

Servizi come Chainlink offrono gli oracoli sotto forma di servizio. Hanno già l'infrastruttura, ad esempio, per:

- [ricevere feed sul prezzo di una criptovaluta nel contratto](https://chain.link/solutions/defi)
- [generare numeri casuali verificabili (utili per il gioco)](https://chain.link/solutions/chainlink-vrf)
- [chiamare API esterne](https://docs.chain.link/docs/request-and-receive-data) – un nuovo uso in questo senso è per [controllare le riserve wBTC](https://cointelegraph.com/news/1b-in-wrapped-bitcoin-now-being-audited-using-chainlink-s-proof-of-reserve)

Questo è un esempio di come ottenere il prezzo più aggiornato degli ETH in uno Smart Contract utilizzando un feed di prezzo Chainlink:

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

[Consulta la documentazione](https://docs.chain.link/docs/get-the-latest-price)

#### Servizi per oracoli {#other-services}

- [Chainlink](https://chain.link/)
- [Witnet](https://witnet.io/)
- [Provable](https://provable.xyz/)

### Creare uno Smart Contract oracolo {#build-an-oracle-smart-contract}

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

_Ci piacerebbe avere più documentazione sulla creazione di uno Smart Contract oracolo. Se vuoi dare il tuo aiuto, crea una PR!_

## Letture consigliate {#further-reading}

- [Decentralised Oracles: a comprehensive overview](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) –_Julien Thevenard_
- [Implementing a Blockchain Oracle on Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) –_Pedro Costa_
- [Oracles](https://docs.ethhub.io/built-on-ethereum/oracles/what-are-oracles/) –_EthHub_
