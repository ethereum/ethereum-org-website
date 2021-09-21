---
title: Oracles
description: Los oráculos ayudan a proporcionar datos del mundo real a tu aplicación de Ethereum, ya que los contratos inteligentes, por sí solos, no pueden consultar información del mundo real.
lang: es
sidebar: true
incomplete: true
---

Los oráculos son feeds de datos que conectan Ethereum a información del mundo real, externa a la blockchain (off-chain) para que puedas consultar datos en tus contratos inteligentes. Por ejemplo, las dapps de mercados de predicciones utilizan oráculos para establecer pagos basados en eventos. Un mercado de predicción podría pedirte que apostases tu ETH sobre el próximo presidente de los Estados Unidos. Utilizarán un oráculo para confirmar el resultado y pagar a los ganadores.

## Requisitos previos {#prerequisites}

Asegúrate de estar familiarizado con los [nodos](/developers/docs/nodes-and-clients/), [los mecanismos de consenso](/developers/docs/consensus-mechanisms/) y la [anatomía de los contratos inteligentes](/developers/docs/smart-contracts/anatomy/), especialmente con los eventos.

## ¿Qué es un oráculo? {#what-is-an-oracle}

Un oráculo es un puente entre la blockchain y el mundo real. Los oráculos actúan como API internas a la cadena de bloques (on-chain), que puedes consultar a fin de aportar información a los contratos inteligentes. Esta información podría ser muy variada: desde datos de precios hasta informes climáticos.

## ¿Por qué son necesarios? {#why-are-they-needed}

En una blockchain como Ethereum, es necesario que cada nodo de la red sea capaz de replicar cada transacción y obtener el mismo resultado de manera garantizada. Las API introducen información potencialmente variable. Si le mandaras una cierta cantidad de ETH a alguien según un valor de $USD acordado y para ello utilizaras una API, la consulta (query) arrojaría un resultado diferente de un día para otro. Esto sin mecionar que la API podría ser hackeada o tornarse obsoleta. Si esto ocurriera, los nodos de la red no serían capaces de lograr un acuerdo sobre el estado actual de Ethereum, lo que llevaría a una ruptura del [consenso](/developers/docs/consensus-mechanisms/).

Los oráculos resuelven este problema por medio de la publicación de información en la blockchain. De modo que cualquier nodo que replique la transacción usará los mismos datos inmutables que se publicaron en la red. Para ello, un oráculo típicamente constará de un contrato inteligente y algunos componentes externos a la cadena de bloques (off-chain) que consultan diversas API y posteriormente envían transacciones para actualizar los datos de los contratos inteligentes.

<!-- ## Oracle architecture {#oracle-architecture}

To understand how an oracle works, let's play through a scenario where your smart contract needs to know who won the superbowl. This is an example of how it could work:

1. Your smart contract requests information from an oracle smart contract.
2. The oracle smart contract emits an [event](/developers/docs/smart-contracts/anatomy/#events-and-logs).
3. Off-chain oracle nodes listen for events and upon hearing one, they query an API.
4. The API returns a JSON response to the nodes.
5. The nodes call on the oracle smart contract.
6. The oracle smart contract returns the data to your smart contract. -->

### Seguridad {#security}

Un oráculo es tan seguro como las fuentes de datos que utiliza. Si una dapp utiliza Uniswap como oráculo para su fuente de precios del par ETH/DAI, es posible que un atacante altere el precio de Uniswap para manipular el entendimiento del precio actual que posee la dapp. Un ejemplo de cómo contrarrestar esta situación es [un sistema de feed](https://developer.makerdao.com/feeds/), como el utilizado por MakerDAO, que recopila información de precios proveniente de numerosos feeds de precio externos en lugar de simplemente apoyarse en una única fuente.

## Uso {#usage}

### Oracles como un servicio {#oracles-as-a-service}

Servicios como Chainlink ofrecen oracles-as-a-service (oráculos como un servicio), que puedes utilizar. Este tipo de servicios cuentan con la infraestructura para realizar actividades como las siguientes:

- [Obtener feeds de precio de criptomonedas en tu contrato inteligente](https://chain.link/solutions/defi)
- [Generar números aleatorios verificables (útiles para gaming)](https://chain.link/solutions/chainlink-vrf)
- [Hacer llamadas a API externas](https://docs.chain.link/docs/request-and-receive-data): Un caso de uso novedoso de esto es[ revisar reservas de wBTC](https://cointelegraph.com/news/1b-in-wrapped-bitcoin-now-being-audited-using-chainlink-s-proof-of-reserve)

Aquí se presenta un ejemplo de cómo obtener el precio más reciente mediante tu contrato inteligente con ayuda de un feed de precios de Chainlink:

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

[Ver la documentación](https://docs.chain.link/docs/get-the-latest-price)

#### Servicios de oráculo {#other-services}

- [Chainlink](https://chain.link/)
- [Witnet](https://witnet.io/)
- [Provable](https://provable.xyz/)

### Construir un contrato inteligente de oráculo {#build-an-oracle-smart-contract}

Aquí se presenta un ejemplo de un contrato inteligente de oráculos diseñado por Pedro Costa. Puedes encontrar anotaciones adicionales en su artículo: [ Implementación de un Oracle de la blockchain de Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e).

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

_Nos encantaría tener más documentación sobre la creación de un contrato inteligente de oráculos. Si puedes colaborar, crea una PR._

## Más información {#further-reading}

- [Oráculos descentralizados: una visión general completa](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) –_Thevenard Julien_
- [Implementación de un Oráculo de Blockchain en Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) –_Pedro Costa_
- [Oráculos](https://docs.ethhub.io/built-on-ethereum/oracles/what-are-oracles/) –_Ethub_
