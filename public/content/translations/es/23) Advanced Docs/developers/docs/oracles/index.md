---
title: Oráculos
description: Los oráculos proporcionan a los contratos inteligentes de Ethereum acceso a los datos del mundo real para aprovechar más casos de uso y otorgar mayor valor a los usuarios.
lang: es
---

Los oráculos son aplicaciones que producen fuentes de datos que ponen a disposición de la cadena de bloques fuentes de datos fuera de cadena para contratos inteligentes. Se necesitan, ya que los contratos inteligentes basados en Ethereum no pueden, por defecto, acceder a información almacenada fuera de la red de cadena de bloques.

Proporcionar a los contratos inteligentes la capacidad de ejecutarse usando datos de fuera de la cadena extiende la utilidad y el valor de las aplicaciones descentralizadas. Por ejemplo, los mercados de predicción en cadena dependen de los oráculos para proporcionar información sobre los resultados usados para validad las predicciones del usuario. Supongamos que Alice apuesta 20 ETH sobre quién será el próximo presidente de EE.UU. En ese caso, la dapp del mercado de predicciones necesita un oráculo para confirmar los resultados de las elecciones y determinar si Alice puede recibir el pago.

## Requisitos previos {#prerequisites}

Esta página asume que el lector está familiarizado con los fundamentos de Ethereum, incluyendo [nodos](/developers/docs/nodes-and-clients/), [mecanismos de consenso](/developers/docs/consensus-mechanisms/)y la [EVM](/developers/docs/evm/). También debe tener un buen entendimiento de [contratos inteligentes](/developers/docs/smart-contracts/) y [anatomía de un contrato inteligente](/developers/docs/smart-contracts/anatomy/), especialmente [eventos](/glossary/#events).

## ¿Qué es un oráculo de la cadena de bloques? {#what-is-a-blockchain-oracle}

Los oráculos son aplicaciones que consiguen, verifican y transmiten información externa (es decir, información almacenada fuera de la cadena) a contratos inteligentes que se ejecutan en la cadena de bloques. Además de extraer la información fuera de la cadena y transmitirla en Ethereum, los oráculos también envían información desde la cadena de bloques a sistemas externos, por ejemplo, desbloqueando un bloqueo inteligente cuando el usuario envía una comisión a través de una transacción de Ethereum.

Sin un oráculo, un contrato inteligente estaría limitado completamente a la información que se encuentra en la cadena.

Los oráculos difieren en función de la fuente de datos (una o varias fuentes), los modelos de confianza (centralizados o descentralizados) y la arquitectura del sistema (inmediato-lectura, publicación-suscripción y solicitud-respuesta). También podemos distinguir entre oráculos basados en si recuperan datos externos para el uso de contratos en cadena (oráculos de entrada), envían información de la cadena de bloques a aplicaciones fuera de la cadena (oráculos de salida) o realizan tareas computacionales fuera de la cadena (oráculos computacionales).

## ¿Por qué los contratos inteligentes necesitan oráculos? {#why-do-smart-contracts-need-oracles}

Muchos desarrolladores ven a los contratos inteligentes como código ejecutándose en direcciones específicas en la cadena de bloques. Sin embargo, una visión [ más general de los contratos inteligentes](/smart-contracts/) es que son programas informáticos autoejecutables, con la capacidad de hacer cumplir acuerdos entre varias partes, una vez que se cumplan las condiciones, por eso se denominan «contratos inteligentes».

Pero usar contratos inteligentes para hacer cumplir acuerdos entre personas no es fácil, dado que Ethereum es determinista. Un [sistema determinista](https://en.wikipedia.org/wiki/Deterministic_algorithm) es un sistema que siempre produce los mismos resultados dado un estado inicial y una entrada en particular, lo que indica no hay aleatoriedad ni variación en el proceso de cálculo de resultados a partir de entradas.

Para lograr la ejecución determinista, las cadenas de bloques limitan los nodos a alcanzar un consenso sobre preguntas binarias simples (verdadero/falso) usando _solo_ datos almacenados en la propia cadena de bloques. Ejemplos de estas preguntas incluyen:

- “¿Firmó el propietario de la cuenta (identificado por una clave pública) esta transacción con la clave privada emparejada?”
- “¿Esta cuenta tiene fondos suficientes para cubrir la transacción?”
- “¿Es esta transacción válida en el contexto de este contrato inteligente?”, etc.

Si las cadenas de bloques han recibido información de fuentes externas (como por ejemplo, del mundo real), el determinismo sería imposible de lograr, lo que evitaría que los nodos se pusieran de acuerdo sobre la validez de los cambios en el estado de la cadena de bloques. Tomemos por ejemplo un contrato inteligente que ejecuta una transacción basada en el tipo de cambio actual ETH-USD obtenido de una API de precios tradicional. Es probable que esta figura cambie con frecuencia (por no mencionar que la API puede quedar obsoleta o hackeada), significando que los nodos ejecutando el mismo código de contrato pueden llegar a resultados diferentes.

Para una cadena de bloques pública como Ethereum, con miles de nodos alrededor del mundo procesando transacciones, el determinismo es crítico. Sin una autoridad central funcionando como una fuente de la verdad, los nodos necesitan mecanismos para llegar al mismo estado luego de aplicar las mismas transacciones. Un caso en el que el nodo A ejecuta el código de un contrato inteligente y obtiene "3" como resultado, mientras que el nodo B obtiene "7" después de ejecutar la misma transacción causaría que el consenso se rompa y eliminaría el valor de Ethereum como plataforma de computación descentralizada.

Esta situación también pone de relevancia un problema con el diseño de cadenas de bloques para extraer información de fuentes externas. Sin embargo, los oráculas resuelven este problema tomando información de fuentes fuera de la cadena y almacenándola en la cadena de bloques para que los contratos inteligentes la consumen. Puesto que la información almacenada en la cadena es inalterable y está disponible públicamente, los nodos de Ethereum pueden usar de forma segura los datos fuera de la cadena importados por el oráculo para calcular los cambios de estado sin romper el consenso.

Para ello, un oráculo se compone típicamente de un contrato inteligente que corre en la cadena y algunos componentes fuera de la cadena. El contrato en cadena recibe solicitudes de datos de otros contratos inteligentes, que pasa al componente fuera de la cadena (llamado nodo oráculo). Este nodo de oráculo puede consultar fuentes de datos (usando interfaces de programación de aplicaciones, por ejemplo) y enviar transacciones para almacenar los datos solicitados en el almacenamiento del contrato inteligente.

Esencialmente, un oráculo de cadena de bloques es un puente entre la brecha de información entre la cadena de bloques y el entorno externo, lo que crea “contratos inteligentes híbridos”. Un contrato inteligente híbrido funciona en función de una combinación de código de contrato en cadena e infraestructura fuera de la cadena. Los mercados de predicción descentralizados son un excelente ejemplo de contratos inteligentes híbridos. Otros ejemplos podrían ser los contratos inteligentes de seguros de cosechas que pagan cuando un conjunto de oráculos determinan que se han producido ciertas condiciones meteorológicas.

## ¿Cuál es el problema de los oráculos? {#the-oracle-problem}

Los oráculos solucionan un problema importante, aunque también introducen algunas complicaciones, como por ejemplo:

- ¿Cómo verificamos si la información inyectada se extrajo de la fuente correcta o si fue manipulada?

- ¿Cómo garantizamos que estos datos estén siempre disponibles y se actualicen regularmente?

El llamado "problema de los oráculos" demuestra los problemas que conlleva el uso de oráculos de cadenas de bloques para enviar entradas a contratos inteligentes. Los datos de un oráculo deben ser correctos para que un contrato inteligente se ejecute correctamente. Además, el tener que «confiar» en que los operadores de oráculos proporcionen información precisa socava la «falta de confianza» de los contratos inteligentes.

Diferentes oráculos ofrecen diferentes soluciones al problema del oráculo, que exploraremos más adelante. Los oráculos suelen ser evaluados sobre lo bien que manejan los siguientes desafíos:

1. **Corrección**: Un oráculo no debe causar que los contratos inteligentes provoquen cambios de estado con base en datos no válidos fuera de la cadena. Un oráculo debe garantizar la _autenticidad_ e _integridad_ de los datos. La autenticidad significa que los datos se obtuvieron de la fuente correcta, mientras que la integridad significa que los datos permanecieron intactos (es decir, que no se alteraron) antes de enviarse en cadena.

2. **Disponibilidad**: Un oráculo no debe retrasar o impedir que los contratos inteligentes ejecuten acciones y activen cambios de estado. Esto significa que los datos de un oráculo deben estar _disponibles a petición_ sin interrupción.

3. **Compatibilidad con incentivos**: Un oráculo debe fomentar que proveedores de datos fuera de la cadena envíen información correcta a los contratos inteligentes. La compatibilidad con incentivos implica _atribuibilidad_ y _responsabilidad_. La atribuibilidad permite vincular una información externa a su proveedor, mientras que la rendición de cuentas vincula a los proveedores de datos con la información que proporcionan, para que puedan ser recompensados o penalizados en función de la calidad de la información proporcionada.

## ¿Cómo funciona un servicio de oráculo de cadena de bloques? {#how-does-a-blockchain-oracle-service-work}

### Usuarios {#users}

Los usuarios son entidades (es decir, contratos inteligentes) que necesitan información externa a la cadena de bloques para completar acciones específicas. El flujo de trabajo básico de un servicio de oráculo comienza con un usuario que envía una solicitud de datos al contrato del oráculo. Las solicitudes de datos generalmente responderán algunas o todas las siguientes preguntas:

1. ¿Qué fuentes pueden consultar los nodos fuera de la cadena para obtener la información solicitada?

2. ¿Cómo procesan los informantes la información de fuentes de datos y extraen puntos de datos útiles?

3. ¿Cuántos nodos de oráculos pueden participar en la recuperación de los datos?

4. ¿Cómo deben manejarse las discrepancias en los informes de oráculos?

5. ¿Qué método se debe aplicar para filtrar las presentaciones y agregar o resumir los informes en un único valor?

### Contrato de oráculo {#oracle-contract}

El contrato de oráculo es el componente en cadena para el servicio del oráculo. Escucha las solicitudes de datos de otros contratos, retransmite las consultas de datos a los nodos del oráculo y transmite los datos devueltos a los contratos de los clientes. Este contrato también puede realizar algunos cálculos en los puntos de datos devueltos para producir un valor añadido que enviar al contrato solicitante.

El contrato de oráculo expone algunas funciones que los contratos de cliente invocan al realizar una solicitud de datos. Tras recibir una nueva consulta, el contrato inteligente emitirá un [evento de registro](/developers/docs/smart-contracts/anatomy/#events-and-logs) con detalles de la solicitud de datos. Esto notifica a los nodos fuera de cadena suscritos al registro (generalmente usando algo como el comando JSON-RPC `eth_subscribe`), que proceden a recuperar los datos definidos en el evento de registro.

A continuación se muestra un [ejemplo de contrato de oráculo](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) proporcionado por Pedro Costa. Este es un simple servicio de oráculo que puede consultar API fuera de la cadena a petición de otros contratos inteligentes y almacenar la información solicitada en la cadena de bloques:

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
    mapping(uint => string) answers;     //answers provided by the oracles
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
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //iterate through oracle list and check if enough oracles(minimum quorum)
      //have voted the same answer as the current one
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

### Nodos de oráculos {#oracle-nodes}

El nodo del oráculo es el componente fuera de la cadena del servicio del oráculo. Extrae información de fuentes externas, como API alojadas en servidores de terceros y la pone en la cadena para que la utilicen los contratos inteligentes. Los nodos de oráculo escuchan los eventos del contrato de oráculo en cadena y proceden a completar la tarea descrita en el registro.

Una tarea común de los nodos de oráculo es enviar una solicitud [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) a un servicio de API, analizar la respuesta para extraer datos relevantes, formatearla en una salida legible para la cadena de bloques y enviarla en cadena incluyéndola en una transacción al contrato de oráculo. También se le podría solicitar al nodo de oráculo que certifique la validez e integridad de la información enviada utilizando “pruebas de autenticidad”, las cuales exploraremos más adelante.

Los oráculos computacionales también dependen de los nodos fuera de la cadena para realizar tareas computacionales que no serían prácticas de ejecutar en cadena, dado el coste del gas y los límites de tamaño de los bloques. Por ejemplo, el nodo de oráculo podría tener la tarea de generar una figura verificablemente aleatoria (por ejemplo, para juegos basados en la cadena de bloques).

## Patrones de diseño de los oráculos {#oracle-design-patterns}

Los oráculos son de diferentes tipos, incluyendo _inmediato-lectura_,_publicar-suscribir_ y_solicitud-respuesta_, siendo los dos últimos los más populares entre los contratos inteligentes de Ethereum. Aquí describimos brevemente los modelos de publicación-suscripción y solicitud-respuesta.

### Oráculos publicar-suscribir {#publish-subscribe-oracles}

Este tipo de oráculo expone una «fuente de datos» que otros contratos pueden leer regularmente para obtener información. En este caso se espera que los datos cambien frecuentemente, por lo que los contratos de los clientes deben estar atentos a las actualizaciones de los datos en el almacenamiento del oráculo. Un ejemplo es un oráculo que proporciona la última información de precios de ETH-USD a los usuarios.

### Oráculos solicitud-respuesta {#request-response-oracles}

Una configuración de solicitud-respuesta permite que el contrato del cliente solicite datos arbitrarios distintos de los proporcionados por un oráculo publicación-suscripción. Los oráculos de solicitud-respuesta son idóneos cuando el conjunto de datos es demasiado grande para almacenarse en el almacenamiento de un contrato inteligente, y/o los usuarios solo van a nacesitar una pequeña parte de los datos en cualquier momento.

Aunque son más complejos que los modelos de publicación-suscripción, los oráculos del tipo solicitud-respuesta son basicamente lo que describimos en la sección anterior. El oráculo tendrá un componente en la cadena que recibe una solicitud de datos y la pasa a un nodo fuera de la cadena para procesarla.

Los usuarios que inician la consulta de datos deben cubrir el costo de recuparar la información de la fuente fuera de la cadena. El contrato del cliente también debe de proporcionar fondos para cubrir los costos del gas incurridos por el contrato del oráculo para devolver la respuesta a través de la función callback especificada en la solicitud.

## Oráculos centralizados frente a descentralizados {#types-of-oracles}

### Oráculos centralizados {#centralized-oracles}

Un oráculo centralizado está controlado por una sola entidad responsable de agregar información fuera de la cadena y actualizar los datos del oráculo según se solicite. Los oráculos centralizados son eficientes, ya que se basan en una única fuente de verdad. Pueden funcionar mejor en los casos en que el propietario publica directamente los conjuntos de datos en propiedad con una firma ampliamente aceptada. Sin embargo, también tienen desventajas:

#### Bajas garantías de corrección {#low-correctness-guarantees}

Con los oráculos centralizados, no hay forma de confirmar si la información proporcionada es correcta o no. Incluso los proveedores «de buena reputación» pueden ser malos actores o verse pirateados. Si el oráculo se corrompe, los contratos inteligentes se ejecutarán en función de datos incorrectos.

#### Poca disponibilidad {#poor-availability}

No se garantiza que los oráculos centralizados siempre hagan que los datos fuera de la cadena estén disponibles para otros contratos inteligentes. Si el proveedor decide apagar el servicio o un hacker secuestra el componente fuera de la cadena del oráculo, su contrato inteligente corre el riesgo de sufrir un ataque de negación de servicio (DoS).

#### Mala compatibilidad con incentivos {#poor-incentive-compatibility}

Los oráculos centralizados a menudo tienen incentivos mal diseñados o inexistentes para que el proveedor de datos envíe información precisa e inalterada. Pagar a un oráculo por información precisa o correcta no garantiza honestidad. Este problema aumenta a medida que se incrementa la cantidad de valor que controlan los contratos inteligentes.

### Oráculos descentralizados {#decentralized-oracles}

Los oráculos descentralizados están diseñados para superar las limitaciones de los oráculos centralizados mediante la eliminación de puntos únicos de falla. Un servicio de oráculo descentralizado consta de múltiples participantes en una red entre pares que forman un consenso sobre datos fuera de la cadena antes de enviarlos a un contrato inteligente.

Un oráculo descentralizado debería (idealmente) no tener permiso, no necesitar confianza y estar libre de la administración de una parte central; en realidad, la descentralización entre los oráculos está en un espectro. Existen redes de oráculos semidescentralizadas en las que cualquiera puede participar, pero con un "propietario" que aprueba y elimina nodos en función del rendimiento histórico. Tambien existen redes de oráculos totalmente descentralizadas: por lo general, se ejecutan como cadenas de bloques independientes y tienen mecanismos de consenso definidos para coordinar nodos y castigar el mal comportamiento.

El uso de oráculos descentralizados tiene los siguientes beneficios:

### Altas garantías de corrección {#high-correctness-guarantees}

Los oráculos descentralizados intentan lograr la corrección de los datos utilizando diferentes enfoques. Esto incluye el uso de pruebas que acrediten la autenticidad y la integridad de la información devuelta y el requisito de que varias entidades acuerden colectivamente la validez de los datos fuera de la cadena.

#### Pruebas de autenticidad {#authenticity-proofs}

Las pruebas de autenticidad son mecanismos criptográficos que permiten la verificación independiente de la información recuperada de fuentes externas. Estas pruebas pueden validar la fuente de la información y detectar posibles alteraciones en los datos despues de la recuperación.

Ejemplos de pruebas de autenticidad incluyen:

**Pruebas de Seguridad de la Capa de Transporte (TLS)**: Los nodos de oráculo a menudo recuperan datos de fuentes externas mediante una conexión HTTP segura basada en el protocolo de Seguridad de la Capa de Transporte (TLS). Algunos oráculos descentralizados utilizan pruebas de autenticidad para verificar las sesiones TLS (es decir, confirmar el intercambio de información entre un nodo y un servidor específico) y confirmar que el contenido de la sesión no se haya alterado.

**Certificaciones de Entorno de Ejecución de Confianza (TEE)**: Un [entorno de ejecución de confianza](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) es un entorno computacional que está aislado de los procesos operativos de su sistema host. Los TEE garantizan que cualquier código de aplicación o datos almacenados/utilizados en el entorno informático conserven la integridad, la confidencialidad y la inmutabilidad. Los usuarios tambien pueden generar una certificación para demostrar que una instancia de la aplicación se está corriendo dentro del entorno de ejecución de confianza.

Ciertas clases de oráculos descentralizados requieren que los operadores de nodos de oráculo proporcionen certificaciones de TEE. Esto le confirma a un usuario que el operador del nodo está ejecutando una instancia del oráculo del cliente en un entrono de ejecución confiable. Los TEE evitan que los procesos externos alteren o lean el código y los datos de una aplicación; por lo tanto, esas certificaciones prueban que el nodo del oráculo ha mantenido la información intacta y confidencial.

#### Validación de información basada en el consenso {#consensus-based-validation-of-information}

Los oráculos centralizados se basan en una única fuente de verdad cuando proporcionan datos a contratos inteligentes, lo que introduce la posibilidad de publicar información inexacta. Los oráculos descentralizados resuelven este problema al confiar en múltiples nodos de oráculo para consultar información fuera de la cadena. Al comparar datos de múltiples fuentes, los oráculos descentralizados reducen el riesgo de pasar información no válida a los contratos en cadena.

Los oráculos descentralizados, sin embargo, deben de lidiar con las discrepancias en la información recuperada de múltiples fuentes fuera de la cadena. Para minimizar las diferencias en la información y garantizar que los datos pasados al contrato del oráculo reflejen la opinión coletiva de los nodos de oráculo, los oráculos descentralizados utilizan los siguientes mecanismos:

##### Votar/apostar por la precisión de los datos

Algunas redes de oráculos descentralizados requieren que los participantes voten o apuesten por la precisión de las respuestas a las consultas de datos (por ejemplo., "¿Quién ganó las elecciones estadounidenses de 2020?") utilizando el token nativo de la red. Luego, un protocolo de agregación agrega los votos, las apuestas y toma la respuesta apoyada por la mayoría como la válida.

Los nodos cuyas respuestas se desvían de la respuesta mayoritaria son penalizados con la distribución de sus tokens a otros que proporcionen valores más correctos. Obligar a los nodos a proporcionar un vínculo antes de proporcionar datos incentiva las respuestas honestas, ya que se supone que son actores económicos racionales que intentan maximizar los rendimientos.

El staking/la votación también protegen a los oráculos descentralizados de los [ataques Sybil](/glossary/#sybil-attack) donde los actores maliciosos crean múltiples identidades para engañar al sistema de consenso. Sin embargo, apostar no puede prevenir "la carga gratuita" (nodos de oráculos que copian datos de otros) y "la validación diferida" (o "lazy validation", nodos de oráculos que siguen a la mayoría sin verificar la información ellos mismos).

##### Mecanismos de punto de Schelling

[Punto de Shelling](https://en.wikipedia.org/wiki/Focal_point_(game_theory)) es un concepto de la teoría de juegos que asume que múltiples entidades siempre darán por defecto una solución común a un problema en ausencia de cualquier comunicación. Los mecanismos de punto de Shelling se utilizan a menudo en redes de oráculos descentralizados para permitir que los nodos lleguen a un consenso sobre las respuestas a las solicitudes de datos.

Una explicación dada en un principio era la [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/), una fuente de datos propuesta en la que los participantes envían respuestas a preguntas «escalar» (preguntas cuyas respuestas se describen por magnitud, por ejemplo, "¿cuál es el precio de ETH?), junto con un depósito. Los usuarios que proporcionen valores entre el [percentil](https://en.wikipedia.org/wiki/Percentile) 25 y 75 son recompensados, mientras que aquellos cuyos valores se desvíen de la media son penalizados.

Si bien SchellingCon no existe en la actualidad, un número de oraculos descentralizados —principalmente los [Oráculos del Protocolo Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module)— usan el mecanismo de punto de Schelling para mejorar la precisión los datos de los oráculos. Cada oráculo Maker consta de una red de nodos P2P fuera de la cadena ("relayers" y "feeds") que suministran precios de mercado para activos colaterales y un contrato "Mediador" en cadena que calcula el promedio de todos los valores proporcionados. Una vez que el periodo de atraso especificado termina, el valor medio se vuelve el nuevo precio de referencia del activo asociado.

Otros ejemplos de oráculos que utilizan mecanismos de puntos de Schelling incluyen [Chainlink Off-Chain Reporting](https://docs.chain.link/docs/off-chain-reporting/) y [Witnet](https://witnet.io/). En ambos sistemas, las respuestas de los nodos de oráculo en la red peer-to-peef son agregados en un único valor agregado, como una media o promedio. Los nodos son recompensados o castigados de acuerdo con la medida en que sus respuestas se alinean o se desvían del valor agregado.

Los mecanismos de punto de Schelling son atractivos porque minimizan la huella en la cadena (solo se necesita enviar una transacción), al tiempo que garantizan la descentralización. Esta última es posible porque los nodos deben firmar la lista de respuestas enviadas antes de que se introduzcan en el algoritmo que produce el valor medio/mediana.

### Disponibilidad {#availability}

Los servicios descentralizados de oráculos garantizan una alta disponibilidad de los datos fuera de la cadena para los contratos inteligentes. Esto se logra descentralizando tanto la fuente de información fuera de la cadena como los nodos responsables de transferir la información en la cadena.

Esto garantiza la tolerancia a fallas, ya que el contrato de oráculo puede confiar en múltiples nodos (que también usan múltiples fuentes de datos) para ejecutar consultas de otros contratos. La descentralización a nivel de la fuente _y_ de nodo-operador es crucial: una red de nodos de oráculo que sirvan información recuperada de la misma fuente se encontrará con el mismo problema que un oráculo centralizado.

También es posible que los oráculos basados en participación puedan reducir los operadores de nodos que no responden rápidamente a las solicitudes de datos. Esto incentiva significativamente a los nodos de oráculo a invertir en infraestructura tolerante a fallas y a proporcionar datos de manera oportuna.

### Buena compatibilidad con incentivos {#good-incentive-compatibility}

Los oráculos descentralizados implementan varios diseños de incentivos para evitar el comportamiento [Bizantino](https://en.wikipedia.org/wiki/Byzantine_fault) entre los nodos del oráculo. Específicamente, logran _atribuibilidad_ y _responsabilidad_:

1. A menudo se requiere que los nodos de oráculo descentralizados firmen los datos que proporcionan en respuesta a las solicitudes de datos. Esta información ayuda a evaluar el rendimiento histórico de los nodos de oráculo, de modo que los usuarios pueden filtrar los nodos de oráculo poco fiables al hacer solicitudes de datos. Un ejemplo es el [Sistema de Reputación Algorítmica de Witnet](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system).

2. Los oráculos descentralizados, como se explicó anteriormente, pueden requerir que los nodos pongan una participación o apuesta en su confianza en la veracidad de los datos que envían. Si la reclamación se comprueba, esta participación se puede devolver junto con recompensas por un servicio honesto. Pero también se puede acuchillar en caso de que la información sea incorrecta, lo que hace que se tenga responsabilidad.

## Aplicaciones de los oráculos en los contratos inteligentes {#applications-of-oracles-in-smart-contracts}

Los siguientes son casos de uso comunes de oráculos en Ethereum:

### Recuperación de datos financieros {#retrieving-financial-data}

Las aplicaciones de [finanzas descentralizadas](/defi/) (DeFi) permiten el préstamo, la toma de préstamos y el comercio de activos entre pares. Para ello, se suele requerir información financiera diferente, incluidos datos de tipos de cambio (para calcular el valor fiduciario de las criptomonedas o comparar los precios de los tókenes) y datos de los mercados de capital (para calcular el valor de los activos tokenizados, como el oro o el dólar estadounidense).

Un protocolo de préstamo DeFi, por ejemplo, necesita consultar los precios actuales del mercado de los activos (por ejemplo, ETH) depositados como garantía. Esto permite que el contrato determine el valor de los activos colaterales y determine cuánto puede pedir prestado del sistema.

«Oráculos de precios» populares (como se les suele llamar) en DeFi incluyen Chainlink Price Feeds, [Open Price Feed](https://compound.finance/docs/prices) de Compound Protocol, [Time-Weighted Average Prices (TWAP)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) de Uniswap y [Maker Oracles](https://docs.makerdao.com/smart-contract-modules/oracle-module).

Los constructores deben entender las advertencias que traen estos oráculos de precios antes de integrarlos en su proyecto. Este [artículo](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/) proporciona un análisis detallado de lo que se debe tener en cuenta cuando se planea utilizar cualquiera de los oráculos de precio mencionados.

A continuación se muestra un ejemplo de cómo puede recuperar el último precio de ETH en su contrato inteligente utilizando una fuente de precios de Chainlink:

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

### Generar aleatoriedad verificable {#generating-verifiable-randomness}

Ciertas aplicaciones de cadena de bloques, como los juegos basados en la cadena de bloques o los esquemas de lotería, requieren un alto nivel de imprevisibilidad y aleatoriedad para funcionar de manera efectiva. No obstante, la ejecución determinista de las cadenas de bloques elimina cualquier aleatoriedad.

El enfoque original era usar funciones criptográficas pseudoaleatorias, como `blockhash`, pero estas podían ser [manipuladas por los mineros](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.) resolviendo el algoritmo de prueba de trabajo. Además, el [cambio de Ethereum a la prueba de participación](/roadmap/merge/) significa que los desarrolladores ya no pueden depender del `blockhash` para la aleatoriedad en la cadena. El [mecanismo RANDAO](https://eth2book.info/altair/part2/building_blocks/randomness) de la cadena de Baliza proporciona una fuente alternativa de aleatoriedad.

Es posible generar el valor aleatorio fuera de la cadena y enviarlo por la cadena, pero hacerlo impone altos requisitos de confianza a los usuarios. Deben creer que el valor se generó realmente a través de mecanismos impredecibles y no se alteró en el tránsito.

Los oráculos diseñados para el cálculo fuera de la cadena resuelven este problema generando de forma segura resultados aleatorios fuera de la cadena que se transmiten por la cadena junto con pruebas criptográficas que dan fe de la imprevisibilidad del proceso. Un ejemplo es [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/) (función aleatoria verificable), que es un generador de números aleatorios (RNG) de equidad demostrable y a prueba de manipulaciones, útil para crear contratos inteligentes fiables para aplicaciones que dependen de resultados impredecibles. Otro ejemplo es [API3 QRNG](https://docs.api3.org/explore/qrng/), que sirve de generación de números aleatorios cuánticos (QRNG); es un método público de RNG en Web3 basado en fenómenos cuánticos, facilitado por cortesía de la Universidad Nacional de Australia (ANU).

### Obtener resultados para los eventos {#getting-outcomes-for-events}

Con los oráculos, es fácil crear contratos inteligentes que respondan a eventos del mundo real. Los servicios del oráculo lo hacen posible, ya que permiten que los contratos se conecten a API externas a través de componentes fuera de la cadena y utilicen información de esas fuentes de datos. Por ejemplo, la DApp de predicción mencionada anteriormente puede solicitar a un oráculo que muestre resultados de las elecciones de una fuente fuera de la cadena fiable (por ejemplo, Associated Press).

El uso de oráculos para recuperar datos basados en resultados del mundo real permite otros nuevos casos de uso; por ejemplo, un producto de seguro descentralizado necesita información precisa sobre el clima, los desastres, etc. para funcionar de manera efectiva.

### Automatización de contratos inteligentes {#automating-smart-contracts}

Los contratos inteligentes no se ejecutan automáticamente; más bien, una cuenta de propiedad externa (EOA), u otra cuenta de contrato debe activar las funciones correctas para ejecutar el código del contrato. En la mayoría de los casos, la mayor parte de las funciones del contrato son públicas y pueden ser invocadas por las EOA y otros contratos.

Pero también hay _funciones privadas_ dentro de un contrato que son inaccesibles para otros, pero que son fundamentales para la funcionalidad general de una DApp. Los ejemplos incluyen una función `mintERC721Token()` que acuña periódicamente nuevos NFT para los usuarios, una función para otorgar pagos en un mercado de predicción o una función para desbloquear tókenes en participación en un DEX.

Los desarrolladores tendrán que activar dichas funciones a diferentes intervalos para mantener el funcionamiento de la aplicación. No obstante, esto podría llevar a que se pierdan más horas en tareas mundanas para los desarrolladores, por lo que la automatización de la ejecución de contratos inteligentes es atractiva.

Algunas redes de oráculo descentralizadas ofrecen servicios de automatización que permiten que los nodos de oráculo fuera de la cadena activen funciones de contratos inteligentes de acuerdo con parámetros definidos por el usuario. Por lo general, esto requiere «registrar» el contrato de destino en el servicio de oráculo, proporcionar fondos para pagar al operador del oráculo y especificar las condiciones o los tiempos para activar el contrato.

La [red de Keeper](https://chain.link/keepers) de Chainlink ofrece opciones para que los contratos inteligentes externalicen las tareas de mantenimiento regulares de una manera de confianza minimizada y descentralizada. Lea la [documentación oficial de Keeper](https://docs.chain.link/docs/chainlink-keepers/introduction/) para obtener información sobre cómo hacer que su contrato sea compatible con Keeper y usar el servicio Upkeep.

## Cómo usar los oráculos de cadena de bloques {#use-blockchain-oracles}

Hay múltiples aplicaciones de oráculo que puede integrar en su DApp de Ethereum:

**[Chainlink:](https://chain.link/)** _Las redes de oráculos descentralizadas de Chainlink proporcionan entradas, salidas y cálculos a prueba de manipulaciones para brindar respaldo a contratos inteligentes avanzados en cualquier cadena de bloques. _

**[Chronicle](https://chroniclelabs.org/)**: _Chronicle supera las limitaciones actuales de la transferencia de datos en cadena mediante el desarrollo de óraculos verdaderamente escalables, rentables, descentralizados y verificables. _

**[Witnet:](https://witnet.io/)** _Witnet es un oráculo sin permiso, descentralizado y resistente a la censura que ayuda a los contratos inteligentes a reaccionar ante eventos del mundo real con sólidas garantías criptoeconómicas. _

**[UMA Oracle:](https://uma.xyz)** _el oráculo optimista de UMA permite que los contratos inteligentes envíen y reciban rápidamente cualquier tipo de datos para diferentes aplicaciones, incluidos los seguros, los derivados financieros y los mercados de predicción. _

**[Tellor:](https://tellor.io/)** _Tellor es un protocolo de oráculo transparente y sin permisos para que su contrato inteligente obtenga fácilmente cualquier dato cuando lo necesite. _

**[Band Protocol:](https://bandprotocol.com/)** _el Band Protocol es una plataforma de oráculo de datos multicadena que añade y conecta datos del mundo real y API con contratos inteligentes. _

**[Paralink:](https://paralink.network/)** _Paralink proporciona una plataforma de oráculos de código abierto y descentralizada para contratos inteligentes que se ejecutan en Ethereum y otras cadenas de bloques populares._

**[Pyth Network:](https://pyth.network/)** _la red Pyth es una red de oráculos financieros de primera parte diseñada para publicar datos continuos del mundo real en cadena en un entorno a prueba de manipulación, descentralizado y autosostenible. _

**[DAO API3:](https://www.api3.org/)** _una DAO API3 ofrece soluciones de oráculo de primera parte que ofrecen mayor transparencia, seguridad y escalabilidad de la fuente en una solución descentralizada para contratos inteligentes._

**[Supra](https://supra.com/)**: Un conjunto de herramientas integrado verticalmente de soluciones multicadena que interrelacionan todas las cadenas de bloques, públicas (L1 y L2) o privadas (empresas), proporcionando feeds de precios de oráculos descentralizados que se pueden utilizar para casos de uso en cadena y fuera de la cadena.

## Para profundizar sobre el tema {#further-reading}

**Artículos**

- [¿Qué es un oráculo de cadena de bloques?](https://chain.link/education/blockchain-oracles), _Chainlink_
- [¿Qué es un oráculo de cadena de bloques?](https://betterprogramming.pub/what-is-a-blockchain-oracle-f5ccab8dbd72), _Patrick Collins_
- [Oráculos descentralizados: descripción detallada](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841), _Julien Thevenard_
- [Implementación de un oráculo de cadena de bloques en Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e), _Pedro Costa_
- [¿Por qué los contratos inteligentes no pueden hacer llamadas de API?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls), _StackExchange_
- [¿Por qué necesitamos oráculos descentralizados](https://newsletter.banklesshq.com/p/why-we-need-decentralized-oracles), _Bankless_
- [Así que quiere usar un oráculo de precios](https://samczsun.com/so-you-want-to-use-a-price-oracle/), _samczsun_

**Vídeos**

- [Oráculos y la expansión de la utilidad de la cadena de bloques](https://youtu.be/BVUZpWa8vpw), _Real Vision Finance_
- [Las diferencias entre los oráculos de primera parte y de terceros](https://blockchainoraclesummit.io/first-party-vs-third-party-oracles/), _Blockchain Oracle Summit_

**Tutoriales**

- [¿Cómo obtener el precio actual de Ethereum en Solidity?](https://blog.chain.link/fetch-current-crypto-price-data-solidity/), _Chainlink_
- [Consumo de datos de oráculos](https://docs.chroniclelabs.org/Developers/tutorials/Remix): _Chronicle_

**Proyectos de ejemplo**

- [Proyecto de inicio completo de Chainlink para Ethereum en Solidity](https://github.com/hackbg/chainlink-fullstack), _HackBG_
