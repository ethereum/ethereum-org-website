---
title: Oráculos
description: Los oráculos ayudan a proporcionar datos del mundo real a tu aplicación de Ethereum, ya que los contratos inteligentes, por sí solos, no pueden consultar información del mundo real.
lang: es
incomplete: true
---

Los oráculos son feeds de datos que conectan Ethereum a información del mundo real, externa a la blockchain (off-chain) para que puedas consultar datos en tus contratos inteligentes. Por ejemplo, las dapps de mercados de predicciones utilizan oráculos para establecer pagos basados en eventos. Un mercado de predicción podría pedirte que apostases tu ETH sobre el próximo presidente de los Estados Unidos. Utilizarán un oráculo para confirmar el resultado y pagar a los ganadores.

## Pre requisitos {#prerequisites}

Asegúrate de estar familiarizado con los [nodos](/developers/docs/nodes-and-clients/), [los mecanismos de consenso](/developers/docs/consensus-mechanisms/) y la [anatomía de los contratos inteligentes](/developers/docs/smart-contracts/anatomy/), especialmente con los eventos.

## ¿Qué es un oráculo? {#what-is-an-oracle}

Un oráculo es un puente entre la blockchain y el mundo real. Los oráculos actúan como API internas a la cadena de bloques (on-chain), que puedes consultar a fin de aportar información a los contratos inteligentes. Esta información podría ser muy variada: desde datos de precios hasta informes climáticos. Los oráculos pueden también ser bidireccionales y usarse para "enviar" datos al mundo real.

Ver explicación de Patrick sobre los oráculos:

<YouTube id="ZJfkNzyO7-U" start="10" />

## ¿Por qué son necesarios? {#why-are-they-needed}

En una cadena de bloques como Ethereum, es necesario que cada nodo de la red sea capaz de replicar cada transacción y obtener el mismo resultado de manera garantizada. Las API introducen información potencialmente variable. Si le enviara una cierta cantidad de ETH a alguien según un valor de $USD acordado y para ello utilizara una API, la consulta arrojaría un resultado diferente de un día para otro. Esto sin mencionar que la API podría ser hackeada o tornarse obsoleta. Si esto ocurriera, los nodos de la red no podrán lograr un acuerdo sobre el estado actual de Ethereum, lo que llevaría a una ruptura del [consenso](/developers/docs/consensus-mechanisms/).

Los oráculos resuelven este problema publicando la información en la cadena de bloques. Así, cualquier nodo que replique la transacción usará los mismos datos inmutables que se publicaron en la red. Para ello, un oráculo típicamente constará de un contrato inteligente y algunos componentes externos a la cadena que consultan diversas API y posteriormente envían transacciones para actualizar los datos de los contratos inteligentes.

### El problema de los oráculos {#oracle-problem}

Como hemos mencionado, las transacciones de Ethereum no pueden acceder a información fuera de la cadena directamente. Al mismo tiempo, confiar en una sola fuente de confianza para proporcionar la información es inseguro e invalida la descentralización de un contrato inteligente. Esto es conocido como el problema de los oráculos.

Podemos evitar este problema usando un oráculo descentralizado que extraiga información de diferentes fuentes; si una fuente de información es hackeada o falla, el contrato inteligente continuará funcionando según lo previsto.

### Seguridad {#security}

Un oráculo es tan seguro como las fuentes de datos que utiliza. Si una dapp usa Uniswap como oráculo para el feed de precio ETH/DAI, un atacante podría modificar dicho precio en Uniswap para manipular la comprensión de precio actual de la dapp. Un ejemplo de cómo combatir esto es [un sistema de feed](https://developer.makerdao.com/feeds/) como el utilizado por MakerDAO, el cual coteja precios desde muchos feeds de datos externos en vez de confiar solo en una fuente de datos.

### Arquitectura {#architecture}

Este es un ejemplo de una arquitectura simple de un oráculo, pero hay más formas de activar el cálculo fuera de la cadena.

1. Emite un registro con su [evento de contrato inteligente](/developers/docs/smart-contracts/anatomy/#events-and-logs).
2. Un servicio fuera de cadena se suscribió (generalmente usando algo como el comando JSON-RPC `eth_subscribe`) a estos registros específicos.
3. El servicio fuera de cadena realiza algunas tareas según se define en el registro.
4. El servicio fuera de cadena responde con los datos solicitados en una transacción secundaria al contrato inteligente.

Esta es la forma de obtener datos de una manera de 1 a 1. Sin embargo, para mejorar la seguridad, es posible que desee descentralizar la forma en que recopila sus datos fuera de cadena.

El siguiente paso podría ser tener una red de estos nodos haciendo estas llamadas a diferentes API y fuentes, y agregando los datos en cadena.

[Off-Chain Reporting de Chainlink](https://blog.chain.link/off-chain-reporting-live-on-mainnet/) (Chainlink OCR) ha mejorado esta metodología haciendo que la red de oráculos fuera de cadena se comunique entre sí. firmen criptográficamente sus respuestas, agreguen sus respuestas fuera de cadena y envíen solo una transacción en cadena con el resultado. De esta manera, se consume menos gas, pero aún obtiene la garantía de datos descentralizados, ya que cada nodo ha firmado su parte de la transacción, lo que hace que el nodo que envía la transacción no pueda modificarla. La política de escalamiento entra en acción si el nodo no realiza transacciones y lo hace el siguiente nodo.

## Uso {#usage}

Usando servicios como Chainlink, puede referenciar datos descentralizados en cadena que se hayan sacado del mundo real y agregado. Algo así como un patrimonio público, pero para datos descentralizados. También puede crear sus propias redes de oráculos modulares para obtener cualquier dato personalizado que esté buscando. Además, puede hacer cómputo fuera de la cadena y enviar información al mundo real también. Chainlink tiene infraestructura para:

- [Obtener feeds de precios de criptomonedas en su contrato](https://chain.link/solutions/defi)
- [Generar números aleatorios verificables (útiles para gaming)](https://chain.link/solutions/chainlink-vrf)
- [Hacer llamadas a API externas](https://docs.chain.link/docs/request-and-receive-data): un caso de uso novedoso de esto es [revisar reservas de wBTC](https://cointelegraph.com/news/1b-in-wrapped-bitcoin-now-being-audited-using-chainlink-s-proof-of-reserve)

Este es un ejemplo de cómo obtener el precio más reciente de ETH en su contrato inteligente usando un feed de precios de Chainlink:

### Feeds de datos de Chainlink {#chainlink-data-feeds}

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

[Puede probar esto en remix con este enlace](https://remix.ethereum.org/#version=soljson-v0.6.7+commit.b8d736ae.js&optimize=false&evmVersion=null&gist=0c5928a00094810d2ba01fd8d1083581)

[Ver la documentación](https://docs.chain.link/docs/get-the-latest-price)

### Chainlink FAV {#chainlink-vrf}

Chainlink FAV (del acrónimo en inglés de función aleatoria verificable) es una fuente justa y verificable de aleatoriedad diseñada para contratos inteligentes. Los desarrolladores de contratos inteligentes pueden utilizar Chainlink VRF como un generador de números aleatorios (GNA) a prueba de manipulaciones para crear contratos inteligentes confiables para cualquier aplicación que esté basada en resultados impredecibles:

- NFT y juegos de cadena de bloques
- Asignación aleatoria de tareas y recursos (por ejemplo, asignación aleatoria de jueces a casos)
- Elección de una muestra representativa para mecanismos de consenso

Los números aleatorios son difíciles de lograr porque las cadenas de bloques son deterministas.

El trabajo con oráculos de Chainlink fuera de los feeds de datos sigue el [ciclo de solicitud y recepción](https://docs.chain.link/docs/architecture-request-model) de trabajar con Chainlink. Utilizan el token LINK para enviar gas de oráculo a los proveedores de oráculos para mostrar respuestas. El token LINK está diseñado específicamente para funcionar con oráculos y se basa en el token ERC-677 actualizado, el cual ofrece compatibilidad con versiones anteriores de [ERC-20](/developers/docs/standards/tokens/erc-20/). El siguiente código, si se implementa en la red de prueba de Kovan, recuperará un número aleatorio comprobado de forma criptográfica. Para hacer la solicitud, financie el contrato con algún token LINK de la red de prueba, que puede obtener del [Faucet de LINK de Kovan](https://kovan.chain.link/).

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

### Chainlink Keepers {#chainlink-keepers}

Los contratos inteligentes no pueden activar o iniciar sus propias funciones en momentos arbitrarios o bajo condiciones arbitrarias. Los cambios de estado solo pueden ocurrir cuando otra cuenta inicia una transacción (como un usuario, un oráculo o un contrato). La [Red Chainlink Keepers](https://docs.chain.link/docs/chainlink-keepers/introduction/) proporciona opciones para contratos inteligentes a fin de externalizar tareas de mantenimiento regular de manera minimalizada y descentralizada.

Para usar Ckainlink Keepers, un contrato inteligente debe implementar [KeeperCompatibleInterface](https://docs.chain.link/docs/chainlink-keepers/compatible-contracts/), que consta de dos funciones:

- `checkUpkeep`: verifica si el contrato requiere trabajo.
- `performUpkeep`: realiza el trabajo en el contrato, si se lo indica checkUpkeep.

El siguiente ejemplo es un contrato de contador simple. La variable `counter` se incrementa en uno por cada llamada a `performUpkeep`. Puede [revisar el siguiente código usando Remix](https://remix.ethereum.org/#url=https://docs.chain.link/samples/Keepers/KeepersCounter.sol)

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
        // We don't use the checkData in this example. Los datos de verificación se definen cuando se registró el Upkeep.
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        lastTimeStamp = block.timestamp;
        counter = counter + 1;
        // We don't use the performData in this example. Los datos de rendimiento son generados por la llamada de Keeper a su función checkUpkeep
    }
}
```

Después de implementar un contrato compatible con Keeper, debe registrar el contrato para [Upkeep](https://docs.chain.link/docs/chainlink-keepers/register-upkeep/) y depositar fondos con LINK para notificar a la Red de Keepers sobre su contrato, de modo que su trabajo se realice continuamente.

### Proyectos de Keepers {#keepers}

- [Chainlink Keepers](https://keepers.chain.link/)
- [Red Keep3r](https://docs.keep3r.network/)

### Llamada a la API de Chainlink {#chainlink-api-call}

Las [llamadas a la API de Chainlink](https://docs.chain.link/docs/make-a-http-get-request) son la forma más fácil de obtener datos del mundo fuera de la cadena en la forma tradicional en que funciona la Web: llamadas a la API. Una sola instancia de esto y teniendo un solo oráculo hacen que el proceso sea centralizado por naturaleza. Para mantener una verdadera descentralización, una plataforma de contratos inteligentes necesitaría usar numerosos nodos encontrados en un [mercado externo de datos](https://market.link/).

[Implementar el siguiente código en remix en la red kovan para probar](https://remix.ethereum.org/#version=soljson-v0.6.7+commit.b8d736ae.js&optimize=false&evmVersion=null&gist=8a173a65099261582a652ba18b7d96c1)

Esto también sigue el ciclo de solicitud y recepción de los oráculos y necesita que el contrato reciba fondos de Kovan LINK (el gas de los oráculos) para funcionar.

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

Puede obtener más información acerca de las aplicaciones de Chainlink leyendo el [blog para desarrolladores de Chainlink](https://blog.chain.link/tag/developers/).

## Servicios de oráculos {#other-services}

- [Chainlink](https://chain.link/)
- [Witnet](https://witnet.io/)
- [Provable](https://provable.xyz/)
- [Paralink](https://paralink.network/)
- [Dos.Network](https://dos.network/)

### Creación de un contrato inteligente de oráculo {#build-an-oracle-smart-contract}

Este es un ejemplo de un contrato inteligente de oráculo diseñado por Pedro Costa. Puede encontrar anotaciones adicionales en su artículo: [ Implementación de un oráculo de cadena de bloques en Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e).

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

_Nos encantaría tener más documentación sobre la creación de un contrato inteligente de oráculo. Si puede colaborar, cree una PR._

## Para profundizar sobre el tema {#further-reading}

**Artículos**

- [¿Qué es un oráculo de cadena de bloques?](https://chain.link/education/blockchain-oracles) - _Chainlink_
- [Oráculos](https://docs.ethhub.io/built-on-ethereum/oracles/what-are-oracles/) - _EthHub_
- [¿Qué es un oráculo de cadena de bloques?](https://betterprogramming.pub/what-is-a-blockchain-oracle-f5ccab8dbd72) - _Patrick Collins_
- [Oráculos descentralizados: descripción completa](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) – _Julien Thevenard_
- [Implementación de un oráculo de cadena de bloques en Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [¿Por qué los contratos inteligentes no pueden hacer llamadas a API?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) - _StackExchange_
- [¿Por qué necesitamos oráculos descentralizados](https://newsletter.banklesshq.com/p/why-we-need-decentralized-oracles) - _Bankless_
- [Así que quiere usar un oráculo de precios](https://samczsun.com/so-you-want-to-use-a-price-oracle/) - _samczsun_

**Videos**

- [Oráculos y la expansión de la utilidad de la cadena de bloques](https://youtu.be/BVUZpWa8vpw) -_Real Vision Finance_

**Tutoriales**

- [Como obtener el precio actual de Ethereum en Solidity](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) - _Chainlink_
