---
title: Oráculos
description: Los oráculos proporcionan a los contratos inteligentes de Ethereum acceso a datos del mundo real, lo que desbloquea más casos de uso y un mayor valor para los usuarios.
lang: es
authors: ["Patrick Collins"]
---

Los oráculos son aplicaciones que producen fuentes de datos que ponen las fuentes de datos fuera de la cadena a disposición de la cadena de bloques para los contratos inteligentes. Esto es necesario porque los contratos inteligentes basados en Ethereum no pueden, por defecto, acceder a la información almacenada fuera de la red de la cadena de bloques.

Dar a los contratos inteligentes la capacidad de ejecutarse utilizando datos fuera de la cadena amplía la utilidad y el valor de las aplicaciones descentralizadas. Por ejemplo, los mercados de predicción en cadena dependen de los oráculos para proporcionar información sobre los resultados que utilizan para validar las predicciones de los usuarios. Supongamos que Alice apuesta 20 ETH sobre quién será el próximo presidente de los EE. UU. En ese caso, la aplicación descentralizada (dapp) de mercado de predicción necesita un oráculo para confirmar los resultados de las elecciones y determinar si Alice es elegible para un pago.

## Requisitos previos {#prerequisites}

Esta página asume que el lector está familiarizado con los fundamentos de [Ethereum](/), incluyendo los [nodos](/developers/docs/nodes-and-clients/), los [mecanismos de consenso](/developers/docs/consensus-mechanisms/) y la [EVM](/developers/docs/evm/). También debe tener una buena comprensión de los [contratos inteligentes](/developers/docs/smart-contracts/) y la [anatomía de los contratos inteligentes](/developers/docs/smart-contracts/anatomy/), especialmente los [eventos](/glossary/#events).

## ¿Qué es un oráculo de blockchain? {#what-is-a-blockchain-oracle}

Los oráculos son aplicaciones que obtienen, verifican y transmiten información externa (es decir, información almacenada fuera de la cadena) a los contratos inteligentes que se ejecutan en la cadena de bloques. Además de «extraer» datos fuera de la cadena y transmitirlos en Ethereum, los oráculos también pueden «enviar» información desde la cadena de bloques a sistemas externos, por ejemplo, desbloqueando una cerradura inteligente una vez que el usuario envía una tarifa a través de una transacción de Ethereum.

Sin un oráculo, un contrato inteligente estaría limitado por completo a los datos en cadena.

Los oráculos difieren según la fuente de datos (una o múltiples fuentes), los modelos de confianza (centralizados o descentralizados) y la arquitectura del sistema (lectura inmediata, publicación-suscripción y solicitud-respuesta). También podemos distinguir entre los oráculos en función de si recuperan datos externos para su uso por contratos en cadena (oráculos de entrada), envían información desde la cadena de bloques a las aplicaciones fuera de la cadena (oráculos de salida) o realizan tareas computacionales fuera de la cadena (oráculos computacionales).

## ¿Por qué los contratos inteligentes necesitan oráculos? {#why-do-smart-contracts-need-oracles}

Muchos desarrolladores ven los contratos inteligentes como código que se ejecuta en direcciones específicas en la cadena de bloques. Sin embargo, una [visión más general de los contratos inteligentes](/smart-contracts/) es que son programas de software autoejecutables capaces de hacer cumplir acuerdos entre las partes una vez que se cumplen condiciones específicas, de ahí el término «contratos inteligentes».

Pero usar contratos inteligentes para hacer cumplir acuerdos entre personas no es sencillo, dado que Ethereum es determinista. Un [sistema determinista](https://en.wikipedia.org/wiki/Deterministic_algorithm) es aquel que siempre produce los mismos resultados dado un estado inicial y una entrada particular, lo que significa que no hay aleatoriedad ni variación en el proceso de calcular salidas a partir de entradas.

Para lograr una ejecución determinista, las cadenas de bloques limitan a los nodos a alcanzar un consenso sobre preguntas binarias simples (verdadero/falso) utilizando _solo_ datos almacenados en la propia cadena de bloques. Ejemplos de tales preguntas incluyen:

- «¿El propietario de la cuenta (identificado por una clave pública) firmó esta transacción con la clave privada emparejada?»
- «¿Tiene esta cuenta suficientes fondos para cubrir la transacción?»
- «¿Es válida esta transacción en el contexto de este contrato inteligente?», etc.

Si las cadenas de bloques recibieran información de fuentes externas (es decir, del mundo real), el determinismo sería imposible de lograr, lo que impediría que los nodos se pusieran de acuerdo sobre la validez de los cambios en el estado de la cadena de bloques. Tomemos, por ejemplo, un contrato inteligente que ejecuta una transacción basada en el tipo de cambio actual de ETH-USD obtenido de una API de precios tradicional. Es probable que esta cifra cambie con frecuencia (sin mencionar que la API podría quedar obsoleta o ser pirateada), lo que significa que los nodos que ejecutan el mismo código de contrato llegarían a resultados diferentes.

Para una cadena de bloques pública como Ethereum, con miles de nodos en todo el mundo procesando transacciones, el determinismo es fundamental. Sin una autoridad central que sirva como fuente de la verdad, los nodos necesitan mecanismos para llegar al mismo estado después de aplicar las mismas transacciones. Un caso en el que el nodo A ejecuta el código de un contrato inteligente y obtiene «3» como resultado, mientras que el nodo B obtiene «7» después de ejecutar la misma transacción, provocaría la ruptura del consenso y eliminaría el valor de Ethereum como plataforma informática descentralizada.

Este escenario también resalta el problema de diseñar cadenas de bloques para extraer información de fuentes externas. Los oráculos, sin embargo, resuelven este problema tomando información de fuentes fuera de la cadena y almacenándola en la cadena de bloques para que los contratos inteligentes la consuman. Dado que la información almacenada en cadena es inalterable y está disponible públicamente, los nodos de Ethereum pueden usar de manera segura los datos fuera de la cadena importados por el oráculo para calcular los cambios de estado sin romper el consenso.

Para hacer esto, un oráculo generalmente se compone de un contrato inteligente que se ejecuta en cadena y algunos componentes fuera de la cadena. El contrato en cadena recibe solicitudes de datos de otros contratos inteligentes, que pasa al componente fuera de la cadena (llamado nodo de oráculo). Este nodo de oráculo puede consultar fuentes de datos (utilizando interfaces de programación de aplicaciones (API), por ejemplo) y enviar transacciones para almacenar los datos solicitados en el almacenamiento del contrato inteligente.

Esencialmente, un oráculo de blockchain cierra la brecha de información entre la cadena de bloques y el entorno externo, creando «contratos inteligentes híbridos». Un contrato inteligente híbrido es aquel que funciona en base a una combinación de código de contrato en cadena e infraestructura fuera de la cadena. Los mercados de predicción descentralizados son un excelente ejemplo de contratos inteligentes híbridos. Otros ejemplos podrían incluir contratos inteligentes de seguros de cosechas que pagan cuando un conjunto de oráculos determina que han ocurrido ciertos fenómenos meteorológicos.

## ¿Qué es el problema del oráculo? {#the-oracle-problem}

Los oráculos resuelven un problema importante, pero también introducen algunas complicaciones, por ejemplo:

- ¿Cómo verificamos que la información inyectada se extrajo de la fuente correcta o no ha sido manipulada?

- ¿Cómo nos aseguramos de que estos datos estén siempre disponibles y se actualicen periódicamente?

El llamado «problema del oráculo» demuestra los problemas que surgen al usar oráculos de blockchain para enviar entradas a los contratos inteligentes. Los datos de un oráculo deben ser correctos para que un contrato inteligente se ejecute correctamente. Además, tener que «confiar» en los operadores de oráculos para proporcionar información precisa socava el aspecto sin necesidad de confianza de los contratos inteligentes.

Diferentes oráculos ofrecen diferentes soluciones al problema del oráculo, que exploraremos más adelante. Los oráculos generalmente se evalúan en función de qué tan bien pueden manejar los siguientes desafíos:

1. **Corrección**: Un oráculo no debe hacer que los contratos inteligentes desencadenen cambios de estado basados en datos fuera de la cadena no válidos. Un oráculo debe garantizar la _autenticidad_ y la _integridad_ de los datos. La autenticidad significa que los datos se obtuvieron de la fuente correcta, mientras que la integridad significa que los datos permanecieron intactos (es decir, no fueron alterados) antes de enviarse en cadena.

2. **Disponibilidad**: Un oráculo no debe retrasar ni impedir que los contratos inteligentes ejecuten acciones y desencadenen cambios de estado. Esto significa que los datos de un oráculo deben estar _disponibles a pedido_ sin interrupción.

3. **Compatibilidad de incentivos**: Un oráculo debe incentivar a los proveedores de datos fuera de la cadena a enviar información correcta a los contratos inteligentes. La compatibilidad de incentivos implica _atribuibilidad_ y _responsabilidad_. La atribuibilidad permite vincular una pieza de información externa a su proveedor, mientras que la responsabilidad vincula a los proveedores de datos a la información que brindan, para que puedan ser recompensados o penalizados en función de la calidad de la información proporcionada.

## ¿Cómo funciona un servicio de oráculo de blockchain? {#how-does-a-blockchain-oracle-service-work}

### Usuarios {#users}

Los usuarios son entidades (es decir, contratos inteligentes) que necesitan información externa a la cadena de bloques para completar acciones específicas. El flujo de trabajo básico de un servicio de oráculo comienza cuando el usuario envía una solicitud de datos al contrato del oráculo. Las solicitudes de datos generalmente responderán a algunas o todas las siguientes preguntas:

1. ¿Qué fuentes pueden consultar los nodos fuera de la cadena para obtener la información solicitada?

2. ¿Cómo procesan los informantes la información de las fuentes de datos y extraen puntos de datos útiles?

3. ¿Cuántos nodos de oráculo pueden participar en la recuperación de los datos?

4. ¿Cómo deben gestionarse las discrepancias en los informes de los oráculos?

5. ¿Qué método debe implementarse para filtrar los envíos y agregar los informes en un solo valor?

### Contrato de oráculo {#oracle-contract}

El contrato de oráculo es el componente en cadena para el servicio de oráculo. Escucha las solicitudes de datos de otros contratos, transmite las consultas de datos a los nodos de oráculo y transmite los datos devueltos a los contratos de los clientes. Este contrato también puede realizar algunos cálculos en los puntos de datos devueltos para producir un valor agregado para enviar al contrato solicitante.

El contrato de oráculo expone algunas funciones que los contratos de los clientes llaman al realizar una solicitud de datos. Al recibir una nueva consulta, el contrato inteligente emitirá un [evento de registro](/developers/docs/smart-contracts/anatomy/#events-and-logs) con los detalles de la solicitud de datos. Esto notifica a los nodos fuera de la cadena suscritos al registro (generalmente usando algo como el comando JSON-RPC `eth_subscribe`), quienes proceden a recuperar los datos definidos en el evento de registro.

A continuación se muestra un [ejemplo de contrato de oráculo](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) de Pedro Costa. Este es un servicio de oráculo simple que puede consultar las API fuera de la cadena a pedido de otros contratos inteligentes y almacenar la información solicitada en la cadena de bloques:

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //lista de solicitudes hechas al contrato
  uint currentId = 0; //id de solicitud incremental
  uint minQuorum = 2; //número mínimo de respuestas a recibir antes de declarar el resultado final
  uint totalOracleCount = 3; // cantidad de oráculos codificada

  // define una solicitud de API general
  struct Request {
    uint id;                            //id de solicitud
    string urlToQuery;                  //url de la API
    string attributeToFetch;            //atributo json (clave) a recuperar en la respuesta
    string agreedValue;                 //valor de la clave
    mapping(uint => string) answers;     //respuestas proporcionadas por los oráculos
    mapping(address => uint) quorum;    //oráculos que consultarán la respuesta (1=el oráculo no ha votado, 2=el oráculo ha votado)
  }

  //evento que activa el oráculo fuera de la cadena de bloques
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //se activa cuando hay un consenso sobre el resultado final
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

    // dirección de oráculos codificada
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // lanzar un evento para ser detectado por el oráculo fuera de la cadena de bloques
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // incrementar id de solicitud
    currentId++;
  }

  //llamado por el oráculo para registrar su respuesta
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //comprobar si el oráculo está en la lista de oráculos de confianza
    //y si el oráculo aún no ha votado
    if(currRequest.quorum[address(msg.sender)] == 1){

      //marcando que esta dirección ha votado
      currRequest.quorum[msg.sender] = 2;

      //iterar a través del "array" de respuestas hasta que una posición esté libre y guardar el valor recuperado
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //encontrar el primer espacio vacío
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //iterar a través de la lista de oráculos y comprobar si hay suficientes oráculos (cuórum mínimo)
      //han votado la misma respuesta que la actual
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

### Nodos de oráculo {#oracle-nodes}

El nodo de oráculo es el componente fuera de la cadena del servicio de oráculo. Extrae información de fuentes externas, como las API alojadas en servidores de terceros, y la pone en cadena para que la consuman los contratos inteligentes. Los nodos de oráculo escuchan los eventos del contrato de oráculo en cadena y proceden a completar la tarea descrita en el registro.

Una tarea común para los nodos de oráculo es enviar una solicitud [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) a un servicio de API, analizar la respuesta para extraer datos relevantes, formatearla en una salida legible por la cadena de bloques y enviarla en cadena incluyéndola en una transacción al contrato de oráculo. También se puede requerir que el nodo de oráculo atestigüe la validez y la integridad de la información enviada utilizando «pruebas de autenticidad», que exploraremos más adelante.

Los oráculos computacionales también dependen de nodos fuera de la cadena para realizar tareas computacionales que serían poco prácticas de ejecutar en cadena, dados los costos de gas y los límites de tamaño de bloque. Por ejemplo, se le puede asignar al nodo de oráculo la tarea de generar una cifra verificablemente aleatoria (por ejemplo, para juegos basados en la cadena de bloques).

## Patrones de diseño de oráculos {#oracle-design-patterns}

Los oráculos vienen en diferentes tipos, que incluyen _lectura inmediata_, _publicación-suscripción_ y _solicitud-respuesta_, siendo los dos últimos los más populares entre los contratos inteligentes de Ethereum. Aquí describimos brevemente los modelos de publicación-suscripción y solicitud-respuesta.

### Oráculos de publicación-suscripción {#publish-subscribe-oracles}

Este tipo de oráculo expone una «fuente de datos» que otros contratos pueden leer regularmente para obtener información. Se espera que los datos en este caso cambien con frecuencia, por lo que los contratos de los clientes deben escuchar las actualizaciones de los datos en el almacenamiento del oráculo. Un ejemplo es un oráculo que proporciona la información de precios más reciente de ETH-USD a los usuarios.

### Oráculos de solicitud-respuesta {#request-response-oracles}

Una configuración de solicitud-respuesta permite que el contrato del cliente solicite datos arbitrarios distintos de los proporcionados por un oráculo de publicación-suscripción. Los oráculos de solicitud-respuesta son ideales cuando el conjunto de datos es demasiado grande para almacenarse en el almacenamiento de un contrato inteligente, y/o los usuarios solo necesitarán una pequeña parte de los datos en un momento dado.

Aunque son más complejos que los modelos de publicación-suscripción, los oráculos de solicitud-respuesta son básicamente lo que describimos en la sección anterior. El oráculo tendrá un componente en cadena que recibe una solicitud de datos y la pasa a un nodo fuera de la cadena para su procesamiento.

Los usuarios que inician consultas de datos deben cubrir el costo de recuperar información de la fuente fuera de la cadena. El contrato del cliente también debe proporcionar fondos para cubrir los costos de gas incurridos por el contrato de oráculo al devolver la respuesta a través de la función de devolución de llamada especificada en la solicitud.

## Oráculos centralizados frente a descentralizados {#types-of-oracles}

### Oráculos centralizados {#centralized-oracles}

Un oráculo centralizado está controlado por una sola entidad responsable de agregar información fuera de la cadena y actualizar los datos del contrato de oráculo según lo solicitado. Los oráculos centralizados son eficientes ya que dependen de una única fuente de la verdad. Pueden funcionar mejor en los casos en que los conjuntos de datos patentados son publicados directamente por el propietario con una firma ampliamente aceptada. Sin embargo, también traen desventajas:

#### Bajas garantías de corrección {#low-correctness-guarantees}

Con los oráculos centralizados, no hay forma de confirmar si la información proporcionada es correcta o no. Incluso los proveedores «de buena reputación» pueden volverse deshonestos o ser pirateados. Si el oráculo se corrompe, los contratos inteligentes se ejecutarán en base a datos incorrectos.

#### Poca disponibilidad {#poor-availability}

No se garantiza que los oráculos centralizados siempre pongan los datos fuera de la cadena a disposición de otros contratos inteligentes. Si el proveedor decide apagar el servicio o un pirata informático secuestra el componente fuera de la cadena del oráculo, su contrato inteligente corre el riesgo de sufrir un ataque de denegación de servicio (DoS).

#### Poca compatibilidad de incentivos {#poor-incentive-compatibility}

Los oráculos centralizados a menudo tienen incentivos mal diseñados o inexistentes para que el proveedor de datos envíe información precisa/inalterada. Pagar a un oráculo por la corrección no garantiza la honestidad. Este problema se agrava a medida que aumenta la cantidad de valor controlado por los contratos inteligentes.

### Oráculos descentralizados {#decentralized-oracles}

Los oráculos descentralizados están diseñados para superar las limitaciones de los oráculos centralizados al eliminar los puntos únicos de falla. Un servicio de oráculo descentralizado comprende múltiples participantes en una red entre pares que forman consenso sobre los datos fuera de la cadena antes de enviarlos a un contrato inteligente.

Un oráculo descentralizado debería (idealmente) ser sin permisos, sin necesidad de confianza y libre de la administración de una parte central; en realidad, la descentralización entre los oráculos se encuentra en un espectro. Existen redes de oráculos semidescentralizadas donde cualquiera puede participar, pero con un «propietario» que aprueba y elimina nodos en función del rendimiento histórico. También existen redes de oráculos totalmente descentralizadas: estas generalmente se ejecutan como cadenas de bloques independientes y tienen mecanismos de consenso definidos para coordinar nodos y castigar el mal comportamiento.

El uso de oráculos descentralizados conlleva los siguientes beneficios:

### Altas garantías de corrección {#high-correctness-guarantees}

Los oráculos descentralizados intentan lograr la corrección de los datos utilizando diferentes enfoques. Esto incluye el uso de pruebas que atestigüen la autenticidad y la integridad de la información devuelta y requerir que múltiples entidades acuerden colectivamente la validez de los datos fuera de la cadena.

#### Pruebas de autenticidad {#authenticity-proofs}

Las pruebas de autenticidad son mecanismos criptográficos que permiten la verificación independiente de la información recuperada de fuentes externas. Estas pruebas pueden validar la fuente de la información y detectar posibles alteraciones en los datos después de la recuperación.

Ejemplos de pruebas de autenticidad incluyen:

**Pruebas de seguridad de la capa de transporte (TLS)**: Los nodos de oráculo a menudo recuperan datos de fuentes externas utilizando una conexión HTTP segura basada en el protocolo de seguridad de la capa de transporte (TLS). Algunos oráculos descentralizados utilizan pruebas de autenticidad para verificar las sesiones TLS (es decir, confirmar el intercambio de información entre un nodo y un servidor específico) y confirmar que el contenido de la sesión no fue alterado.

**Atestaciones de entorno de ejecución confiable (TEE)**: Un [entorno de ejecución confiable](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) es un entorno computacional aislado que está separado de los procesos operativos de su sistema anfitrión. Los TEE garantizan que cualquier código de aplicación o datos almacenados/utilizados en el entorno de cálculo conserven su integridad, confidencialidad e inmutabilidad. Los usuarios también pueden generar una atestación para demostrar que una instancia de aplicación se está ejecutando dentro del entorno de ejecución confiable.

Ciertas clases de oráculos descentralizados requieren que los operadores de nodos de oráculo proporcionen atestaciones TEE. Esto confirma a un usuario que el operador del nodo está ejecutando una instancia del cliente de oráculo en un entorno de ejecución confiable. Los TEE evitan que procesos externos alteren o lean el código y los datos de una aplicación, por lo tanto, esas atestaciones prueban que el nodo de oráculo ha mantenido la información intacta y confidencial.

#### Validación de información basada en el consenso {#consensus-based-validation-of-information}

Los oráculos centralizados dependen de una única fuente de la verdad al proporcionar datos a los contratos inteligentes, lo que introduce la posibilidad de publicar información inexacta. Los oráculos descentralizados resuelven este problema al depender de múltiples nodos de oráculo para consultar información fuera de la cadena. Al comparar datos de múltiples fuentes, los oráculos descentralizados reducen el riesgo de pasar información no válida a los contratos en cadena.

Los oráculos descentralizados, sin embargo, deben lidiar con discrepancias en la información recuperada de múltiples fuentes fuera de la cadena. Para minimizar las diferencias en la información y garantizar que los datos pasados al contrato de oráculo reflejen la opinión colectiva de los nodos de oráculo, los oráculos descentralizados utilizan los siguientes mecanismos:

##### Votación/staking sobre la precisión de los datos {#availability}

Algunas redes de oráculos descentralizadas requieren que los participantes voten o hagan staking sobre la precisión de las respuestas a las consultas de datos (por ejemplo, «¿Quién ganó las elecciones estadounidenses de 2020?») utilizando el token nativo de la red. Un protocolo de agregación luego agrega los votos y las participaciones y toma la respuesta respaldada por la mayoría como la válida.

Los nodos cuyas respuestas se desvían de la respuesta de la mayoría son penalizados al distribuir sus tokens a otros que proporcionan valores más correctos. Obligar a los nodos a proporcionar una fianza antes de proporcionar datos incentiva respuestas honestas, ya que se asume que son actores económicos racionales con la intención de maximizar los rendimientos.

El staking/votación también protege a los oráculos descentralizados de los [ataques Sybil](/glossary/#sybil-attack) donde actores maliciosos crean múltiples identidades para manipular el sistema de consenso. Sin embargo, el staking no puede evitar el «aprovechamiento» (nodos de oráculo que copian información de otros) y la «validación perezosa» (nodos de oráculo que siguen a la mayoría sin verificar la información ellos mismos).

##### Mecanismos de punto de Schelling {#good-incentive-compatibility}

El [punto de Schelling](<https://en.wikipedia.org/wiki/Focal_point_(game_theory)>) es un concepto de la teoría de juegos que asume que múltiples entidades siempre optarán por una solución común a un problema en ausencia de cualquier comunicación. Los mecanismos de punto de Schelling se utilizan a menudo en redes de oráculos descentralizadas para permitir que los nodos alcancen un consenso sobre las respuestas a las solicitudes de datos.

Una idea temprana para esto fue [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed), una fuente de datos propuesta donde los participantes envían respuestas a preguntas «escalares» (preguntas cuyas respuestas se describen por magnitud, por ejemplo, «¿cuál es el precio de ETH?»), junto con un depósito. Los usuarios que proporcionan valores entre el [percentil](https://en.wikipedia.org/wiki/Percentile) 25 y 75 son recompensados, mientras que aquellos cuyos valores se desvían en gran medida del valor mediano son penalizados.

Si bien SchellingCoin no existe en la actualidad, varios oráculos descentralizados, en particular los [oráculos del protocolo Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module), utilizan el mecanismo de punto de Schelling para mejorar la precisión de los datos del oráculo. Cada oráculo de Maker consta de una red P2P fuera de la cadena de nodos («retransmisores» y «fuentes») que envían precios de mercado para activos colaterales y un contrato «Medianizer» en cadena que calcula la mediana de todos los valores proporcionados. Una vez que finaliza el período de retraso especificado, este valor mediano se convierte en el nuevo precio de referencia para el activo asociado.

Otros ejemplos de oráculos que utilizan mecanismos de punto de Schelling incluyen [Chainlink Offchain Reporting](https://docs.chain.link/architecture-overview/off-chain-reporting) y [Witnet](https://witnet.io/). En ambos sistemas, las respuestas de los nodos de oráculo en la red entre pares se agregan en un solo valor agregado, como una media o mediana. Los nodos son recompensados o castigados de acuerdo con la medida en que sus respuestas se alinean o se desvían del valor agregado.

Los mecanismos de punto de Schelling son atractivos porque minimizan la huella en cadena (solo se debe enviar una transacción) al tiempo que garantizan la descentralización. Esto último es posible porque los nodos deben aprobar la lista de respuestas enviadas antes de que se introduzca en el algoritmo que produce el valor medio/mediano.

### Disponibilidad {#applications-of-oracles-in-smart-contracts}

Los servicios de oráculos descentralizados garantizan una alta disponibilidad de datos fuera de la cadena para los contratos inteligentes. Esto se logra descentralizando tanto la fuente de información fuera de la cadena como los nodos responsables de transferir la información en cadena.

Esto garantiza la tolerancia a fallas, ya que el contrato de oráculo puede depender de múltiples nodos (que también dependen de múltiples fuentes de datos) para ejecutar consultas de otros contratos. La descentralización en la fuente _y_ a nivel de operador de nodo es crucial: una red de nodos de oráculo que sirve información recuperada de la misma fuente se encontrará con el mismo problema que un oráculo centralizado.

También es posible que los oráculos basados en staking apliquen un recorte a los operadores de nodos que no responden rápidamente a las solicitudes de datos. Esto incentiva significativamente a los nodos de oráculo a invertir en infraestructura tolerante a fallas y proporcionar datos de manera oportuna.

### Buena compatibilidad de incentivos {#retrieving-financial-data}

Los oráculos descentralizados implementan varios diseños de incentivos para prevenir el comportamiento [bizantino](https://en.wikipedia.org/wiki/Byzantine_fault) entre los nodos de oráculo. Específicamente, logran _atribuibilidad_ y _responsabilidad_:

1. A menudo se requiere que los nodos de oráculo descentralizados firmen los datos que proporcionan en respuesta a las solicitudes de datos. Esta información ayuda a evaluar el rendimiento histórico de los nodos de oráculo, de modo que los usuarios puedan filtrar los nodos de oráculo poco confiables al realizar solicitudes de datos. Un ejemplo es el [sistema de reputación algorítmica](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system) de Witnet.

2. Los oráculos descentralizados, como se explicó anteriormente, pueden requerir que los nodos hagan staking sobre su confianza en la veracidad de los datos que envían. Si el reclamo se verifica, esta participación se puede devolver junto con recompensas por un servicio honesto. Pero también puede sufrir un recorte en caso de que la información sea incorrecta, lo que proporciona cierta medida de responsabilidad.

## Aplicaciones de los oráculos en los contratos inteligentes {#generating-verifiable-randomness}

Los siguientes son casos de uso comunes para los oráculos en Ethereum:

### Recuperación de datos financieros {#getting-outcomes-for-events}

Las aplicaciones de [finanzas descentralizadas (DeFi)](/defi/) permiten el préstamo, la toma de préstamos y el comercio de activos entre pares. Esto a menudo requiere obtener diferente información financiera, incluidos datos de tipos de cambio (para calcular el valor fiduciario de las criptomonedas o comparar precios de tokens) y datos de mercados de capitales (para calcular el valor de los activos tokenizados, como el oro o el dólar estadounidense).

Un protocolo de préstamos DeFi, por ejemplo, necesita consultar los precios de mercado actuales de los activos (por ejemplo, ETH) depositados como colateral. Esto permite que el contrato determine el valor de los activos colaterales y determine cuánto puede pedir prestado del sistema.

Las «fuentes de precios» populares (como se les suele llamar) en DeFi incluyen Chainlink Price Feeds, el [Open Price Feed](https://compound.finance/docs/prices) del protocolo Compound, los [precios promedio ponderados en el tiempo (TWAP)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) de Uniswap y los [oráculos de Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module).

Los constructores deben comprender las advertencias que conllevan estas fuentes de precios antes de integrarlas en su proyecto. Este [artículo](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/) proporciona un análisis detallado de lo que se debe considerar al planificar el uso de cualquiera de las fuentes de precios mencionadas.

A continuación se muestra un ejemplo de cómo puede recuperar el último precio de ETH en su contrato inteligente utilizando una fuente de precios de Chainlink:

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Red: Kovan
     * Agregador: ETH/USD
     * Dirección: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /**
     * Devuelve el último precio
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

### Generación de aleatoriedad verificable {#automating-smart-contracts}

Ciertas aplicaciones de la cadena de bloques, como los juegos basados en la cadena de bloques o los esquemas de lotería, requieren un alto nivel de imprevisibilidad y aleatoriedad para funcionar de manera efectiva. Sin embargo, la ejecución determinista de las cadenas de bloques elimina la aleatoriedad.

El enfoque original era utilizar funciones criptográficas pseudoaleatorias, como `blockhash`, pero estas podían ser [manipuladas por los mineros](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.) que resolvían el algoritmo de prueba de trabajo (PoW). Además, el [cambio de Ethereum a la prueba de participación (PoS)](/roadmap/merge/) significa que los desarrolladores ya no pueden depender de `blockhash` para la aleatoriedad en cadena. El [mecanismo RANDAO](https://eth2book.info/altair/part2/building_blocks/randomness) de la cadena de balizas proporciona una fuente alternativa de aleatoriedad en su lugar.

Es posible generar el valor aleatorio fuera de la cadena y enviarlo en cadena, pero hacerlo impone altos requisitos de confianza a los usuarios. Deben creer que el valor se generó realmente a través de mecanismos impredecibles y no se alteró en tránsito.

Los oráculos diseñados para el cálculo fuera de la cadena resuelven este problema generando de forma segura resultados aleatorios fuera de la cadena que transmiten en cadena junto con pruebas criptográficas que atestiguan la imprevisibilidad del proceso. Un ejemplo es [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/) (función aleatoria verificable), que es un generador de números aleatorios (RNG) demostrablemente justo y a prueba de manipulaciones, útil para crear contratos inteligentes confiables para aplicaciones que dependen de resultados impredecibles.

### Obtención de resultados para eventos {#use-blockchain-oracles}

Con los oráculos, crear contratos inteligentes que respondan a eventos del mundo real es fácil. Los servicios de oráculos hacen esto posible al permitir que los contratos se conecten a API externas a través de componentes fuera de la cadena y consuman información de esas fuentes de datos. Por ejemplo, la aplicación descentralizada (dapp) de predicción mencionada anteriormente puede solicitar a un oráculo que devuelva los resultados de las elecciones de una fuente confiable fuera de la cadena (por ejemplo, Associated Press).

El uso de oráculos para recuperar datos basados en resultados del mundo real permite otros casos de uso novedosos; por ejemplo, un producto de seguro descentralizado necesita información precisa sobre el clima, desastres, etc. para funcionar de manera efectiva.

### Automatización de contratos inteligentes {#further-reading}

Los contratos inteligentes no se ejecutan automáticamente; más bien, una cuenta de propiedad externa (EOA), u otra cuenta de contrato, debe activar las funciones correctas para ejecutar el código del contrato. En la mayoría de los casos, la mayor parte de las funciones del contrato son públicas y pueden ser invocadas por EOA y otros contratos.

Pero también hay _funciones privadas_ dentro de un contrato que son inaccesibles para otros, pero que son críticas para la funcionalidad general de una dapp. Los ejemplos incluyen una función `mintERC721Token()` que acuña periódicamente nuevos NFT para los usuarios, una función para otorgar pagos en un mercado de predicción o una función para desbloquear tokens en staking en un DEX.

Los desarrolladores deberán activar dichas funciones a intervalos para mantener la aplicación funcionando sin problemas. Sin embargo, esto podría llevar a más horas perdidas en tareas mundanas para los desarrolladores, por lo que la automatización de la ejecución de contratos inteligentes es atractiva.

Algunas redes de oráculos descentralizadas ofrecen servicios de automatización, que permiten a los nodos de oráculo fuera de la cadena activar funciones de contratos inteligentes de acuerdo con los parámetros definidos por el usuario. Por lo general, esto requiere «registrar» el contrato de destino con el servicio de oráculo, proporcionar fondos para pagar al operador del oráculo y especificar las condiciones o los momentos para activar el contrato.

La [red Keeper](https://chain.link/keepers) de Chainlink proporciona opciones para que los contratos inteligentes subcontraten tareas de mantenimiento regulares de una manera descentralizada y con confianza minimizada. Lea la [documentación oficial de Keeper](https://docs.chain.link/docs/chainlink-keepers/introduction/) para obtener información sobre cómo hacer que su contrato sea compatible con Keeper y usar el servicio Upkeep.

## Cómo usar oráculos de blockchain

Hay múltiples aplicaciones de oráculos que puede integrar en su dapp de Ethereum:

**[Chainlink](https://chain.link/)**: _Las redes de oráculos descentralizadas de Chainlink proporcionan entradas, salidas y cálculos a prueba de manipulaciones para admitir contratos inteligentes avanzados en cualquier cadena de bloques._

**[RedStone Oracles](https://redstone.finance/)**: _RedStone es un oráculo modular descentralizado que proporciona fuentes de datos optimizadas para el gas. Se especializa en ofrecer fuentes de precios para activos emergentes, como tokens de staking líquido (LST), tokens de restaking líquido (LRT) y derivados de staking de Bitcoin._

**[Chronicle](https://chroniclelabs.org/)**: _Chronicle supera las limitaciones actuales de la transferencia de datos en cadena mediante el desarrollo de oráculos verdaderamente escalables, rentables, descentralizados y verificables._

**[Witnet](https://witnet.io/)**: _Witnet es un oráculo sin permisos, descentralizado y resistente a la censura que ayuda a los contratos inteligentes a reaccionar a eventos del mundo real con sólidas garantías criptoeconómicas._

**[UMA Oracle](https://uma.xyz)**: _El oráculo optimista de UMA permite que los contratos inteligentes reciban rápidamente cualquier tipo de datos para diferentes aplicaciones, incluidos seguros, derivados financieros y mercados de predicción._

**[Tellor](https://tellor.io/)**: _Tellor es un protocolo de oráculo transparente y sin permisos para que su contrato inteligente obtenga fácilmente cualquier dato cuando lo necesite._

**[Band Protocol](https://bandprotocol.com/)**: _Band Protocol es una plataforma de oráculo de datos intercadena que agrega y conecta datos del mundo real y API a contratos inteligentes._

**[Pyth Network](https://pyth.network/)**: _La red Pyth es una red de oráculos financieros de primera parte diseñada para publicar datos continuos del mundo real en cadena en un entorno resistente a la manipulación, descentralizado y autosostenible._

**[API3 DAO](https://www.api3.org/)**: _API3 DAO ofrece soluciones de oráculos de primera parte que brindan una mayor transparencia de origen, seguridad y escalabilidad en una solución descentralizada para contratos inteligentes._

**[Supra](https://supra.com/)**: Un conjunto de herramientas integrado verticalmente de soluciones intercadena que interconectan todas las cadenas de bloques, públicas (L1 y L2) o privadas (empresas), proporcionando fuentes de precios de oráculos descentralizados que se pueden utilizar para casos de uso en cadena y fuera de la cadena. 

**[Gas Network](https://gas.network/)**: Una plataforma de oráculo distribuida que proporciona datos de precios del gas en tiempo real a través de la cadena de bloques. Al llevar los datos de los principales proveedores de datos de precios del gas a la cadena, Gas Network está ayudando a impulsar la interoperabilidad. Gas Network admite datos para más de 35 cadenas, incluida la red principal de Ethereum y muchas L2 líderes.

**[DIA](https://www.diadata.org/)**: Una red de oráculos intercadena que ofrece fuentes de datos verificables para más de 20 000 activos en todas las clases de activos principales. DIA obtiene datos comerciales sin procesar directamente de más de 100 mercados primarios y los calcula en cadena, lo que garantiza una transparencia y verificabilidad completas de los datos con configuraciones personalizadas para cualquier caso de uso.

**[Stork](https://stork.network)**: Stork ofrece datos de precios con una latencia ultrabaja, lo que admite una amplia gama de casos de uso, incluidos mercados perpetuos, protocolos de préstamos y ecosistemas DeFi, con nuevos activos admitidos rápidamente en el momento de su inclusión.

## Lecturas adicionales

**Artículos**

- [¿Qué es un oráculo de blockchain?](https://chain.link/education/blockchain-oracles) — _Chainlink_
- [¿Qué es un oráculo de blockchain?](https://medium.com/better-programming/what-is-a-blockchain-oracle-f5ccab8dbd72) — _Patrick Collins_
- [Oráculos descentralizados: una descripción general completa](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) — _Julien Thevenard_
- [Implementación de un oráculo de blockchain en Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [¿Por qué los contratos inteligentes no pueden realizar llamadas a la API?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) — _StackExchange_
- [Así que quieres usar un oráculo de precios](https://samczsun.com/so-you-want-to-use-a-price-oracle/) — _samczsun_

**Videos**

- [Los oráculos y la expansión de la utilidad de la cadena de bloques](https://youtu.be/BVUZpWa8vpw) — _Real Vision Finance_

**Tutoriales**

- [Cómo obtener el precio actual de Ethereum en Solidity](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) — _Chainlink_
- [Consumo de datos de oráculos](https://docs.chroniclelabs.org/Developers/tutorials/Remix) — _Chronicle_
- [Desafío de oráculos](https://speedrunethereum.com/challenge/oracles) - _Speedrun Ethereum_

**Proyectos de ejemplo**

- [Proyecto inicial completo de Chainlink para Ethereum en Solidity](https://github.com/hackbg/chainlink-fullstack) — _HackBG_