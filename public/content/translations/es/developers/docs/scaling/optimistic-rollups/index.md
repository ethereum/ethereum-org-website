---
title: Rollups optimistas
description: Una introducción a los rollups optimistas, una solución de escalado utilizada por la comunidad de Ethereum.
lang: es
---

Los rollups optimistas son protocolos de capa 2 (L2) diseñados para ampliar la capacidad de procesamiento de la capa base de Ethereum. Reducen la computación en la cadena principal de [Ethereum](/) al procesar transacciones fuera de la cadena, lo que ofrece mejoras significativas en las velocidades de procesamiento. A diferencia de otras soluciones de escalado, como las [cadenas laterales](/developers/docs/scaling/sidechains/), los rollups optimistas derivan su seguridad de la Red principal al publicar los resultados de las transacciones en cadena, o las [cadenas Plasma](/developers/docs/scaling/plasma/), que también verifican las transacciones en Ethereum con pruebas de fraude, pero almacenan los datos de las transacciones en otro lugar.

Dado que la computación es la parte lenta y costosa de usar Ethereum, los rollups optimistas pueden ofrecer mejoras de escalabilidad de hasta 10 a 100 veces. Los rollups optimistas también escriben transacciones en Ethereum como `calldata` o en [blobs](/roadmap/danksharding/), lo que reduce los costos de gas para los usuarios.

## Requisitos previos {#prerequisites}

Debería haber leído y comprendido nuestras páginas sobre el [escalado de Ethereum](/developers/docs/scaling/) y la [capa 2](/layer-2/).

## ¿Qué es un rollup optimista? {#what-is-an-optimistic-rollup}

Un rollup optimista es un enfoque para escalar Ethereum que implica mover la computación y el almacenamiento del estado fuera de la cadena. Los rollups optimistas ejecutan transacciones fuera de Ethereum, pero publican los datos de las transacciones en la Red principal como `calldata` o en [blobs](/roadmap/danksharding/).

Los operadores de rollups optimistas agrupan múltiples transacciones fuera de la cadena en grandes lotes antes de enviarlas a Ethereum. Este enfoque permite distribuir los costos fijos entre múltiples transacciones en cada lote, lo que reduce las tarifas para los usuarios finales. Los rollups optimistas también utilizan técnicas de compresión para reducir la cantidad de datos publicados en Ethereum.

Los rollups optimistas se consideran "optimistas" porque asumen que las transacciones fuera de la cadena son válidas y no publican pruebas de validez para los lotes de transacciones publicados en cadena. Esto separa a los rollups optimistas de los [rollups de conocimiento cero](/developers/docs/scaling/zk-rollups) que publican [pruebas de validez](/glossary/#validity-proof) criptográficas para las transacciones fuera de la cadena.

En su lugar, los rollups optimistas dependen de un esquema de prueba de fraude para detectar casos en los que las transacciones no se calculan correctamente. Después de que se envía un lote de rollup en Ethereum, hay un período de tiempo (llamado período de desafío) durante el cual cualquiera puede cuestionar los resultados de una transacción de rollup calculando una [prueba de fraude](/glossary/#fraud-proof).

Si la prueba de fraude tiene éxito, el protocolo del rollup vuelve a ejecutar la(s) transacción(es) y actualiza el estado del rollup en consecuencia. El otro efecto de una prueba de fraude exitosa es que el secuenciador responsable de incluir la transacción ejecutada incorrectamente en un bloque recibe una penalización.

Si el lote de rollup no es cuestionado (es decir, todas las transacciones se ejecutan correctamente) después de que transcurre el período de desafío, se considera válido y se acepta en Ethereum. Otros pueden continuar construyendo sobre un bloque de rollup no confirmado, pero con una advertencia: los resultados de las transacciones se revertirán si se basan en una transacción ejecutada incorrectamente publicada con anterioridad.

## ¿Cómo interactúan los rollups optimistas con Ethereum? {#optimistic-rollups-and-ethereum}

Los rollups optimistas son [soluciones de escalado fuera de la cadena](/developers/docs/scaling/#offchain-scaling) creadas para operar sobre Ethereum. Cada rollup optimista es administrado por un conjunto de contratos inteligentes desplegados en la red Ethereum. Los rollups optimistas procesan transacciones fuera de la cadena principal de Ethereum, pero publican las transacciones fuera de la cadena (en lotes) en un contrato de rollup en cadena. Al igual que la cadena de bloques de Ethereum, este registro de transacciones es inmutable y forma la "cadena de rollup optimista".

La arquitectura de un rollup optimista comprende las siguientes partes:

**Contratos en cadena**: La operación del rollup optimista está controlada por contratos inteligentes que se ejecutan en Ethereum. Esto incluye contratos que almacenan bloques de rollup, monitorean las actualizaciones de estado en el rollup y rastrean los depósitos de los usuarios. En este sentido, Ethereum sirve como la capa base o "capa 1" para los rollups optimistas.

**Máquina virtual (VM) fuera de la cadena**: Aunque los contratos que administran el protocolo del rollup optimista se ejecutan en Ethereum, el protocolo del rollup realiza la computación y el almacenamiento del estado en otra máquina virtual separada de la [Máquina Virtual de Ethereum](/developers/docs/evm/). La VM fuera de la cadena es donde residen las aplicaciones y se ejecutan los cambios de estado; sirve como la capa superior o "capa 2" para un rollup optimista.

Dado que los rollups optimistas están diseñados para ejecutar programas escritos o compilados para la EVM, la VM fuera de la cadena incorpora muchas especificaciones de diseño de la EVM. Además, las pruebas de fraude calculadas en cadena permiten a la red Ethereum hacer cumplir la validez de los cambios de estado calculados en la VM fuera de la cadena.

Los rollups optimistas se describen como 'soluciones de escalado híbridas' porque, aunque existen como protocolos separados, sus propiedades de seguridad se derivan de Ethereum. Entre otras cosas, Ethereum garantiza la exactitud de la computación fuera de la cadena de un rollup y la disponibilidad de los datos detrás de la computación. Esto hace que los rollups optimistas sean más seguros que los protocolos de escalado puramente fuera de la cadena (por ejemplo, las [cadenas laterales](/developers/docs/scaling/sidechains/)) que no dependen de Ethereum para su seguridad.

Los rollups optimistas dependen del protocolo principal de Ethereum para lo siguiente:

### Disponibilidad de datos {#data-availability}

Como se mencionó, los rollups optimistas publican datos de transacciones en Ethereum como `calldata` o [blobs](/roadmap/danksharding/). Dado que la ejecución de la cadena del rollup se basa en las transacciones enviadas, cualquiera puede usar esta información (anclada en la capa base de Ethereum) para ejecutar el estado del rollup y verificar la exactitud de las transiciones de estado.

La [disponibilidad de datos](/developers/docs/data-availability/) es fundamental porque, sin acceso a los datos del estado, los retadores no pueden construir pruebas de fraude para disputar operaciones de rollup no válidas. Al proporcionar Ethereum la disponibilidad de datos, se reduce el riesgo de que los operadores de rollups se salgan con la suya en actos maliciosos (por ejemplo, enviar bloques no válidos).

### Resistencia a la censura {#censorship-resistance}

Los rollups optimistas también dependen de Ethereum para la resistencia a la censura. En un rollup optimista, una entidad centralizada (el operador) es responsable de procesar las transacciones y enviar los bloques de rollup a Ethereum. Esto tiene algunas implicaciones:

- Los operadores de rollups pueden censurar a los usuarios desconectándose por completo o negándose a producir bloques que incluyan ciertas transacciones en ellos.

- Los operadores de rollups pueden evitar que los usuarios retiren los fondos depositados en el contrato del rollup al retener los datos de estado necesarios para las pruebas de Merkle de propiedad. Retener los datos de estado también puede ocultar el estado del rollup a los usuarios y evitar que interactúen con el rollup.

Los rollups optimistas resuelven este problema al obligar a los operadores a publicar los datos asociados con las actualizaciones de estado en Ethereum. Publicar los datos del rollup en cadena tiene los siguientes beneficios:

- Si un operador de rollup optimista se desconecta o deja de producir lotes de transacciones, otro nodo puede usar los datos disponibles para reproducir el último estado del rollup y continuar con la producción de bloques.

- Los usuarios pueden usar los datos de las transacciones para crear pruebas de Merkle que demuestren la propiedad de los fondos y retirar sus activos del rollup.

- Los usuarios también pueden enviar sus transacciones en la capa 1 (L1) en lugar de al secuenciador, en cuyo caso el secuenciador tiene que incluir la transacción dentro de un límite de tiempo determinado para continuar produciendo bloques válidos.

### Liquidación {#settlement}

Otro papel que juega Ethereum en el contexto de los rollups optimistas es el de una capa de liquidación. Una capa de liquidación ancla todo el ecosistema de la cadena de bloques, establece la seguridad y proporciona una finalidad objetiva si ocurre una disputa en otra cadena (rollups optimistas en este caso) que requiera arbitraje.

La red principal de Ethereum proporciona un centro para que los rollups optimistas verifiquen las pruebas de fraude y resuelvan disputas. Además, las transacciones realizadas en el rollup solo son definitivas _después_ de que el bloque del rollup sea aceptado en Ethereum. Una vez que una transacción de rollup se compromete en la capa base de Ethereum, no se puede revertir (excepto en el caso muy improbable de una reorganización de la cadena).

## ¿Cómo funcionan los rollups optimistas? {#how-optimistic-rollups-work}

### Ejecución y agregación de transacciones {#transaction-execution-and-aggregation}

Los usuarios envían transacciones a los "operadores", que son nodos responsables de procesar las transacciones en el rollup optimista. También conocido como "validador" o "agregador", el operador agrega transacciones, comprime los datos subyacentes y publica el bloque en Ethereum.

Aunque cualquiera puede convertirse en validador, los validadores de rollups optimistas deben proporcionar una fianza antes de producir bloques, de manera muy similar a un [sistema de prueba de participación (PoS)](/developers/docs/consensus-mechanisms/pos/). Esta fianza puede sufrir un recorte si el validador publica un bloque no válido o construye sobre un bloque antiguo pero no válido (incluso si su bloque es válido). De esta manera, los rollups optimistas utilizan incentivos criptoeconómicos para garantizar que los validadores actúen de manera honesta.

Se espera que otros validadores en la cadena del rollup optimista ejecuten las transacciones enviadas utilizando su copia del estado del rollup. Si el estado final de un validador es diferente del estado propuesto por el operador, pueden iniciar un desafío y calcular una prueba de fraude.

Algunos rollups optimistas pueden prescindir de un sistema de validadores sin permisos y usar un solo "secuenciador" para ejecutar la cadena. Al igual que un validador, el secuenciador procesa transacciones, produce bloques de rollup y envía transacciones de rollup a la cadena de capa 1 (L1) (Ethereum).

El secuenciador es diferente de un operador de rollup regular porque tiene un mayor control sobre el orden de las transacciones. Además, el secuenciador tiene acceso prioritario a la cadena del rollup y es la única entidad autorizada para enviar transacciones al contrato en cadena. Las transacciones de nodos que no son secuenciadores o de usuarios regulares simplemente se ponen en cola en una bandeja de entrada separada hasta que el secuenciador las incluye en un nuevo lote.

#### Envío de bloques de rollup a Ethereum {#submitting-blocks-to-ethereum}

Como se mencionó, el operador de un rollup optimista agrupa las transacciones fuera de la cadena en un lote y lo envía a Ethereum para su notarización. Este proceso implica comprimir los datos relacionados con las transacciones y publicarlos en Ethereum como `calldata` o en blobs.

`calldata` es un área no modificable y no persistente en un contrato inteligente que se comporta principalmente como la [memoria](/developers/docs/smart-contracts/anatomy/#memory). Si bien `calldata` persiste en cadena como parte de los [registros históricos](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) de la cadena de bloques, no se almacena como parte del estado de Ethereum. Debido a que `calldata` no toca ninguna parte del estado de Ethereum, es más barato que el estado para almacenar datos en cadena.

La palabra clave `calldata` también se usa en Solidity para pasar argumentos a una función de contrato inteligente en el momento de la ejecución. `calldata` identifica la función que se llama durante una transacción y contiene las entradas a la función en forma de una secuencia arbitraria de bytes.

En el contexto de los rollups optimistas, `calldata` se usa para enviar datos de transacciones comprimidos al contrato en cadena. El operador del rollup agrega un nuevo lote llamando a la función requerida en el contrato del rollup y pasando los datos comprimidos como argumentos de la función. El uso de `calldata` reduce las tarifas de los usuarios, ya que la mayoría de los costos en los que incurren los rollups provienen del almacenamiento de datos en cadena.

Aquí hay [un ejemplo](https://eth.blockscout.com/tx/0x9102bfce17c58b5fc1c974c24b6bb7a924fb5fbd7c4cd2f675911c27422a5591) del envío de un lote de rollup para mostrar cómo funciona este concepto. El secuenciador invocó el método `appendSequencerBatch()` y pasó los datos de la transacción comprimidos como entradas usando `calldata`.

Algunos rollups ahora usan blobs para publicar lotes de transacciones en Ethereum.

Los blobs son no modificables y no persistentes (al igual que `calldata`), pero se eliminan del historial después de ~18 días. Para obtener más información sobre los blobs, consulte [danksharding](/roadmap/danksharding).

### Compromisos de estado {#state-commitments}

En cualquier momento, el estado del rollup optimista (cuentas, saldos, código de contrato, etc.) se organiza como un [árbol de Merkle](/whitepaper/#merkle-trees) llamado "árbol de estado". La raíz de este árbol de Merkle (raíz de estado), que hace referencia al último estado del rollup, se somete a un hash y se almacena en el contrato del rollup. Cada transición de estado en la cadena produce un nuevo estado de rollup, al que un operador se compromete calculando una nueva raíz de estado.

El operador debe enviar tanto las raíces de estado antiguas como las nuevas al publicar lotes. Si la raíz de estado antigua coincide con la raíz de estado existente en el contrato en cadena, esta última se descarta y se reemplaza con la nueva raíz de estado.

El operador del rollup también debe comprometer una raíz de Merkle para el lote de transacciones en sí. Esto permite a cualquiera demostrar la inclusión de una transacción en el lote (en la capa 1 (L1)) presentando una [prueba de Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/).

Los compromisos de estado, especialmente las raíces de estado, son necesarios para demostrar la exactitud de los cambios de estado en un rollup optimista. El contrato del rollup acepta nuevas raíces de estado de los operadores inmediatamente después de que se publican, pero luego puede eliminar las raíces de estado no válidas para restaurar el rollup a su estado correcto.

### Prueba de fraude {#fraud-proving}

Como se explicó, los rollups optimistas permiten a cualquiera publicar bloques sin proporcionar pruebas de validez. Sin embargo, para garantizar que la cadena siga siendo segura, los rollups optimistas especifican un período de tiempo durante el cual cualquiera puede disputar una transición de estado. Por lo tanto, los bloques de rollup se denominan "afirmaciones", ya que cualquiera puede disputar su validez.

Si alguien disputa una afirmación, entonces el protocolo del rollup iniciará el cálculo de la prueba de fraude. Cada tipo de prueba de fraude es interactiva: alguien debe publicar una afirmación antes de que otra persona pueda cuestionarla. La diferencia radica en cuántas rondas de interacción se requieren para calcular la prueba de fraude.

Los esquemas de prueba interactiva de una sola ronda reproducen las transacciones en disputa en la capa 1 (L1) para detectar afirmaciones no válidas. El protocolo del rollup emula la reejecución de la transacción en disputa en la capa 1 (L1) (Ethereum) utilizando un contrato verificador, y la raíz de estado calculada determina quién gana el desafío. Si el reclamo del retador sobre el estado correcto del rollup es correcto, el operador es penalizado con un recorte de su fianza.

Sin embargo, volver a ejecutar transacciones en la capa 1 (L1) para detectar fraudes requiere publicar compromisos de estado para transacciones individuales y aumenta los datos que los rollups deben publicar en cadena. Reproducir transacciones también incurre en costos de gas significativos. Por estas razones, los rollups optimistas están cambiando a pruebas interactivas de múltiples rondas, que logran el mismo objetivo (es decir, detectar operaciones de rollup no válidas) con mayor eficiencia.

#### Prueba interactiva de múltiples rondas {#multi-round-interactive-proving}

La prueba interactiva de múltiples rondas implica un protocolo de ida y vuelta entre el afirmante y el retador supervisado por un contrato verificador de capa 1 (L1), que en última instancia decide cuál es la parte que miente. Después de que un nodo de capa 2 (L2) cuestiona una afirmación, se requiere que el afirmante divida la afirmación en disputa en dos mitades iguales. Cada afirmación individual en este caso contendrá tantos pasos de computación como la otra.

El retador luego elegirá qué afirmación quiere cuestionar. El proceso de división (llamado "protocolo de bisección") continúa hasta que ambas partes disputan una afirmación sobre un _solo_ paso de ejecución. En este punto, el contrato de capa 1 (L1) resolverá la disputa evaluando la instrucción (y su resultado) para atrapar a la parte fraudulenta.

Se requiere que el afirmante proporcione una "prueba de un solo paso" que verifique la validez de la computación de un solo paso en disputa. Si el afirmante no proporciona la prueba de un solo paso, o el verificador de capa 1 (L1) considera que la prueba no es válida, pierde el desafío.

Algunas notas sobre este tipo de prueba de fraude:

1. La prueba de fraude interactiva de múltiples rondas se considera eficiente porque minimiza el trabajo que la cadena de capa 1 (L1) debe hacer en el arbitraje de disputas. En lugar de reproducir toda la transacción, la cadena de capa 1 (L1) solo necesita volver a ejecutar un paso en la ejecución del rollup.

2. Los protocolos de bisección reducen la cantidad de datos publicados en cadena (no es necesario publicar compromisos de estado para cada transacción). Además, las transacciones de rollups optimistas no están limitadas por el límite de gas de Ethereum. Por el contrario, los rollups optimistas que vuelven a ejecutar transacciones deben asegurarse de que una transacción de capa 2 (L2) tenga un límite de gas más bajo para emular su ejecución dentro de una sola transacción de Ethereum.

3. Parte de la fianza del afirmante malicioso se otorga al retador, mientras que la otra parte se quema. El hecho de quemar evita la colusión entre validadores; si dos validadores se confabulan para iniciar desafíos falsos, aún perderán una parte considerable de toda la participación.

4. La prueba interactiva de múltiples rondas requiere que ambas partes (el afirmante y el retador) realicen movimientos dentro del período de tiempo especificado. Si no se actúa antes de que expire la fecha límite, la parte que incumple pierde el desafío.

#### Por qué las pruebas de fraude son importantes para los rollups optimistas {#fraud-proof-benefits}

Las pruebas de fraude son importantes porque facilitan la _finalidad sin necesidad de confianza_ en los rollups optimistas. La finalidad sin necesidad de confianza es una cualidad de los rollups optimistas que garantiza que una transacción (siempre que sea válida) finalmente se confirmará.

Los nodos maliciosos pueden intentar retrasar la confirmación de un bloque de rollup válido iniciando desafíos falsos. Sin embargo, las pruebas de fraude finalmente demostrarán la validez del bloque de rollup y harán que se confirme.

Esto también se relaciona con otra propiedad de seguridad de los rollups optimistas: la validez de la cadena depende de la existencia de _un_ nodo honesto. El nodo honesto puede hacer avanzar la cadena correctamente publicando afirmaciones válidas o disputando afirmaciones no válidas. Cualquiera que sea el caso, los nodos maliciosos que entren en disputas con el nodo honesto perderán sus participaciones durante el proceso de prueba de fraude.

### Interoperabilidad L1/L2 {#l1-l2-interoperability}

Los rollups optimistas están diseñados para la interoperabilidad con la red principal de Ethereum y permiten a los usuarios pasar mensajes y datos arbitrarios entre la capa 1 (L1) y la capa 2 (L2). También son compatibles con la EVM, por lo que puede migrar [aplicaciones descentralizadas (dapps)](/developers/docs/dapps/) existentes a rollups optimistas o crear nuevas dapps utilizando las herramientas de desarrollo de Ethereum.

#### 1. Movimiento de activos {#asset-movement}

##### Ingreso al rollup {#evm-compatibility}

Para usar un rollup optimista, los usuarios depositan ETH, tokens ERC-20 y otros activos aceptados en el contrato del [puente](/developers/docs/bridges/) del rollup en la capa 1 (L1). El contrato del puente transmitirá la transacción a la capa 2 (L2), donde se acuña una cantidad equivalente de activos y se envía a la dirección elegida por el usuario en el rollup optimista.

Las transacciones generadas por el usuario (como un depósito de L1 > L2) generalmente se ponen en cola hasta que el secuenciador las vuelve a enviar al contrato del rollup. Sin embargo, para preservar la resistencia a la censura, los rollups optimistas permiten a los usuarios enviar una transacción directamente al contrato de rollup en cadena si se ha retrasado más allá del tiempo máximo permitido.

Algunos rollups optimistas adoptan un enfoque más directo para evitar que los secuenciadores censuren a los usuarios. Aquí, un bloque se define por todas las transacciones enviadas al contrato de capa 1 (L1) desde el bloque anterior (por ejemplo, depósitos) además de las transacciones procesadas en la cadena del rollup. Si un secuenciador ignora una transacción de capa 1 (L1), publicará la raíz de estado (demostrablemente) incorrecta; por lo tanto, los secuenciadores no pueden retrasar los mensajes generados por el usuario una vez publicados en la capa 1 (L1).

##### Salida del rollup {#cross-chain-contract-calls}

El retiro de un rollup optimista a Ethereum es más difícil debido al esquema de prueba de fraude. Si un usuario inicia una transacción de L2 > L1 para retirar fondos en custodia en la capa 1 (L1), debe esperar hasta que transcurra el período de desafío, que dura aproximadamente siete días. Sin embargo, el proceso de retiro en sí es bastante sencillo.

Después de que se inicia la solicitud de retiro en el rollup de capa 2 (L2), la transacción se incluye en el siguiente lote, mientras que los activos del usuario en el rollup se queman. Una vez que el lote se publica en Ethereum, el usuario puede calcular una prueba de Merkle que verifique la inclusión de su transacción de salida en el bloque. Luego es cuestión de esperar a través del período de retraso para finalizar la transacción en la capa 1 (L1) y retirar los fondos a la Red principal.

Para evitar esperar una semana antes de retirar fondos a Ethereum, los usuarios de rollups optimistas pueden emplear a un **proveedor de liquidez** (LP). Un proveedor de liquidez asume la propiedad de un retiro pendiente de capa 2 (L2) y le paga al usuario en la capa 1 (L1) (a cambio de una tarifa).

Los proveedores de liquidez pueden verificar la validez de la solicitud de retiro del usuario (ejecutando la cadena ellos mismos) antes de liberar los fondos. De esta manera, tienen la seguridad de que la transacción se confirmará eventualmente (es decir, finalidad sin necesidad de confianza).

#### 2. Compatibilidad con la EVM {#how-do-optimistic-rollup-fees-work}

Para los desarrolladores, la ventaja de los rollups optimistas es su compatibilidad (o, mejor aún, equivalencia) con la [Máquina Virtual de Ethereum (EVM)](/developers/docs/evm/). Los rollups compatibles con la EVM cumplen con las especificaciones del [Libro Amarillo de Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf) y admiten la EVM a nivel de código de bytes.

La compatibilidad con la EVM en los rollups optimistas tiene los siguientes beneficios:

i. Los desarrolladores pueden migrar los contratos inteligentes existentes en Ethereum a cadenas de rollups optimistas sin tener que modificar las bases de código de manera extensiva. Esto puede ahorrar tiempo a los equipos de desarrollo al desplegar contratos inteligentes de Ethereum en la capa 2 (L2).

ii. Los desarrolladores y los equipos de proyectos que utilizan rollups optimistas pueden aprovechar la infraestructura de Ethereum. Esto incluye lenguajes de programación, bibliotecas de código, herramientas de prueba, software de cliente, infraestructura de despliegue, etc.

El uso de herramientas existentes es importante porque estas herramientas han sido auditadas, depuradas y mejoradas exhaustivamente a lo largo de los años. También elimina la necesidad de que los desarrolladores de Ethereum aprendan a construir con una pila de desarrollo completamente nueva.

#### 3. Llamadas a contratos intercadena {#scaling-ethereum-with-optimistic-rollups}

Los usuarios (cuentas de propiedad externa) interactúan con los contratos de capa 2 (L2) enviando una transacción al contrato del rollup o haciendo que un secuenciador o validador lo haga por ellos. Los rollups optimistas también permiten que las cuentas de contrato en Ethereum interactúen con los contratos de capa 2 (L2) utilizando contratos puente para transmitir mensajes y pasar datos entre la capa 1 (L1) y la capa 2 (L2). Esto significa que puede programar un contrato de capa 1 (L1) en la red principal de Ethereum para invocar funciones que pertenecen a contratos en un rollup optimista de capa 2 (L2).

Las llamadas a contratos intercadena ocurren de forma asíncrona, lo que significa que la llamada se inicia primero y luego se ejecuta en un momento posterior. Esto es diferente de las llamadas entre los dos contratos en Ethereum, donde la llamada produce resultados de inmediato.

Un ejemplo de una llamada a un contrato intercadena es el depósito de tokens descrito anteriormente. Un contrato en la capa 1 (L1) custodia los tokens del usuario y envía un mensaje a un contrato emparejado de capa 2 (L2) para acuñar una cantidad igual de tokens en el rollup.

Dado que las llamadas de mensajes intercadena dan como resultado la ejecución del contrato, generalmente se requiere que el remitente cubra los [costos de gas](/developers/docs/gas/) para la computación. Es aconsejable establecer un límite de gas alto para evitar que la transacción falle en la cadena de destino. El escenario del puente de tokens es un buen ejemplo; si el lado de la capa 1 (L1) de la transacción (depositar los tokens) funciona, pero el lado de la capa 2 (L2) (acuñar nuevos tokens) falla debido a la falta de gas, el depósito se vuelve irrecuperable.

Finalmente, debemos tener en cuenta que las llamadas de mensajes de L2 > L1 entre contratos deben tener en cuenta los retrasos (las llamadas de L1 > L2 generalmente se ejecutan después de unos minutos). Esto se debe a que los mensajes enviados a la Red principal desde el rollup optimista no se pueden ejecutar hasta que expire la ventana de desafío.

## ¿Cómo funcionan las tarifas de los rollups optimistas? {#optimistic-rollups-pros-and-cons}

Los rollups optimistas utilizan un esquema de tarifas de gas, muy parecido a Ethereum, para indicar cuánto pagan los usuarios por transacción. Las tarifas cobradas en los rollups optimistas dependen de los siguientes componentes:

1. **Escritura de estado**: Los rollups optimistas publican datos de transacciones y encabezados de bloques (que consisten en el hash del encabezado del bloque anterior, la raíz de estado, la raíz del lote) en Ethereum como un `blob`, u "objeto binario grande". [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) introdujo una solución rentable para incluir datos en cadena. Un `blob` es un nuevo campo de transacción que permite a los rollups publicar datos de transición de estado comprimidos en la capa 1 (L1) de Ethereum. A diferencia de `calldata`, que permanece permanentemente en cadena, los blobs son de corta duración y se pueden eliminar de los clientes después de [4096 épocas](https://github.com/ethereum/consensus-specs/blob/81f3ea8322aff6b9fb15132d050f8f98b16bdba4/configs/mainnet.yaml#L147) (aproximadamente 18 días). Al usar blobs para publicar lotes de transacciones comprimidas, los rollups optimistas pueden reducir significativamente el costo de escribir transacciones en la capa 1 (L1).

2. **Gas de blob utilizado**: Las transacciones que transportan blobs emplean un mecanismo de tarifa dinámica similar al introducido por [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559). La tarifa de gas para las transacciones de tipo 3 tiene en cuenta la tarifa base para los blobs, que está determinada por la red en función de la demanda de espacio de blobs y el uso de espacio de blobs de la transacción que se envía.

3. **Tarifas del operador de L2**: Esta es la cantidad pagada a los nodos del rollup como compensación por los costos computacionales incurridos en el procesamiento de transacciones, de manera muy similar a las tarifas de gas en Ethereum. Los nodos de rollup cobran tarifas de transacción más bajas, ya que las capas 2 (L2) tienen mayores capacidades de procesamiento y no se enfrentan a las congestiones de red que obligan a los validadores en Ethereum a priorizar las transacciones con tarifas más altas.

Los rollups optimistas aplican varios mecanismos para reducir las tarifas para los usuarios, incluido el procesamiento por lotes de transacciones y la compresión de `calldata` para reducir los costos de publicación de datos. Puede consultar el [rastreador de tarifas de L2](https://l2fees.info/) para obtener una descripción general en tiempo real de cuánto cuesta usar rollups optimistas basados en Ethereum.

## ¿Cómo escalan Ethereum los rollups optimistas? {#optimistic-video}

Como se explicó, los rollups optimistas publican datos de transacciones comprimidos en Ethereum para garantizar la disponibilidad de datos. La capacidad de comprimir los datos publicados en cadena es crucial para escalar la capacidad de procesamiento en Ethereum con rollups optimistas.

La cadena principal de Ethereum impone límites a la cantidad de datos que pueden contener los bloques, denominados en unidades de gas (el [tamaño promedio del bloque](/developers/docs/blocks/#block-size) es de 15 millones de gas). Si bien esto restringe la cantidad de gas que puede usar cada transacción, también significa que podemos aumentar las transacciones procesadas por bloque al reducir los datos relacionados con las transacciones, lo que mejora directamente la escalabilidad.

Los rollups optimistas utilizan varias técnicas para lograr la compresión de datos de transacciones y mejorar las tasas de TPS. Por ejemplo, este [artículo](https://vitalik.eth.limo/general/2021/01/05/rollup.html) compara los datos que genera una transacción de usuario básica (enviar ether) en la Red principal frente a la cantidad de datos que genera la misma transacción en un rollup:

| Parámetro | Ethereum (L1)          | Rollup (L2)   |
| --------- | ---------------------- | ------------- |
| Nonce     | ~3                     | 0             |
| Precio del gas  | ~8                     | 0-0.5         |
| Gas       | 3                      | 0-0.5         |
| Para        | 21                     | 4             |
| Valor     | 9                      | ~3            |
| Firma | ~68 (2 + 33 + 33)      | ~0.5          |
| De      | 0 (recuperado de la firma) | 4             |
| **Total** | **~112 bytes**         | **~12 bytes** |

Hacer algunos cálculos aproximados sobre estas cifras puede ayudar a mostrar las mejoras de escalabilidad que ofrece un rollup optimista:

1. El tamaño objetivo para cada bloque es de 15 millones de gas y cuesta 16 de gas verificar un byte de datos. Dividir el tamaño promedio del bloque por 16 de gas (15.000.000/16) muestra que el bloque promedio puede contener **937.500 bytes de datos**.
2. Si una transacción de rollup básica usa 12 bytes, entonces el bloque promedio de Ethereum puede procesar **78.125 transacciones de rollup** (937.500/12) o **39 lotes de rollup** (si cada lote contiene un promedio de 2.000 transacciones).
3. Si se produce un nuevo bloque en Ethereum cada 15 segundos, entonces las velocidades de procesamiento del rollup ascenderían a aproximadamente **5.208 transacciones por segundo**. Esto se hace dividiendo la cantidad de transacciones de rollup básicas que puede contener un bloque de Ethereum (**78.125**) por el tiempo de bloque promedio (**15 segundos**).

Esta es una estimación bastante optimista, dado que las transacciones de rollups optimistas no pueden comprender un bloque completo en Ethereum. Sin embargo, puede dar una idea aproximada de cuántas ganancias de escalabilidad pueden ofrecer los rollups optimistas a los usuarios de Ethereum (las implementaciones actuales ofrecen hasta 2.000 TPS).

Se espera que la introducción de la [fragmentación de datos](/roadmap/danksharding/) en Ethereum mejore la escalabilidad en los rollups optimistas. Debido a que las transacciones de rollup deben compartir el espacio del bloque con otras transacciones que no son de rollup, su capacidad de procesamiento está limitada por la capacidad de procesamiento de datos en la cadena principal de Ethereum. El danksharding aumentará el espacio disponible para que las cadenas de capa 2 (L2) publiquen datos por bloque, utilizando un almacenamiento de "blob" más barato e impermanente en lugar del costoso y permanente `CALLDATA`.

### Ventajas y desventajas de los rollups optimistas {#further-reading-on-optimistic-rollups}

| Ventajas                                                                                                                                                  | Desventajas                                                                                                                                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ofrece mejoras masivas en la escalabilidad sin sacrificar la seguridad o la ausencia de necesidad de confianza.                                                             | Retrasos en la finalidad de las transacciones debido a posibles desafíos de fraude.                                                                                   |
| Los datos de las transacciones se almacenan en la cadena de capa 1 (L1), lo que mejora la transparencia, la seguridad, la resistencia a la censura y la descentralización.                       | Los operadores de rollups centralizados (secuenciadores) pueden influir en el orden de las transacciones.                                                                       |
| La prueba de fraude garantiza la finalidad sin necesidad de confianza y permite que las minorías honestas aseguren la cadena.                                                         | Si no hay nodos honestos, un operador malicioso puede robar fondos publicando bloques y compromisos de estado no válidos.                                  |
| El cálculo de pruebas de fraude está abierto a los nodos regulares de capa 2 (L2), a diferencia de las pruebas de validez (utilizadas en los rollups ZK) que requieren hardware especial.                         | El modelo de seguridad se basa en al menos un nodo honesto que ejecute transacciones de rollup y envíe pruebas de fraude para cuestionar transiciones de estado no válidas. |
| Los rollups se benefician de la "vitalidad sin necesidad de confianza" (cualquiera puede forzar el avance de la cadena ejecutando transacciones y publicando afirmaciones).                    | Los usuarios deben esperar a que expire el período de desafío de una semana antes de retirar los fondos a Ethereum.                                              |
| Los rollups optimistas dependen de incentivos criptoeconómicos bien diseñados para aumentar la seguridad en la cadena.                                                 | Los rollups deben publicar todos los datos de las transacciones en cadena, lo que puede aumentar los costos.                                                                          |
| La compatibilidad con la EVM y Solidity permite a los desarrolladores migrar contratos inteligentes nativos de Ethereum a rollups o usar herramientas existentes para crear nuevas dapps. |

### Una explicación visual de los rollups optimistas {#tutorials}

¿Aprende mejor de forma visual? Vea a Finematics explicar los rollups optimistas:

<VideoWatch slug="rollups-scaling-strategy" startTime="263" />

## Lecturas adicionales sobre los rollups optimistas

- [Cómo funcionan los rollups optimistas (La guía completa)](https://www.alchemy.com/overviews/optimistic-rollups)
- [¿Qué es un rollup de cadena de bloques? Una introducción técnica](https://www.ethereum-ecosystem.com/blog/what-is-a-blockchain-rollup-a-technical-introduction)
- [La guía esencial de Arbitrum](https://www.bankless.com/the-essential-guide-to-arbitrum)
- [La guía práctica de los rollups de Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [El estado de las pruebas de fraude en las L2 de Ethereum](https://web.archive.org/web/20241124154627/https://research.2077.xyz/the-state-of-fraud-proofs-in-ethereum-l2s)
- [¿Cómo funciona realmente el rollup de Optimism?](https://www.paradigm.xyz/2021/01/how-does-optimism-s-rollup-really-work)
- [Análisis detallado de la OVM](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [¿Qué es la Máquina Virtual Optimista?](https://www.alchemy.com/overviews/optimistic-virtual-machine)

## Tutoriales: Rollups optimistas y puentes en Ethereum

- [Tutorial del contrato del puente estándar de Optimism](/developers/tutorials/optimism-std-bridge-annotated-code/) _– Un tutorial de código anotado del puente estándar de Optimism para mover activos entre la capa 1 (L1) y la capa 2 (L2)._