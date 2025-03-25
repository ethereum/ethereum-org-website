---
title: Rollups optimistas
description: 'Una introducción a los rollups optimistas: una solución de escalabilidad utilizada por la comunidad Ethereum.'
lang: es
---

Los rollups optimistas son protocolos de capa 2 (L2) diseñados para ampliar el rendimiento de la capa base de Ethereum. Reducen el cómputo en la cadena principal de Ethereum al procesar las transacciones fuera de la cadena, ofreciendo mejoras significativas en la velocidad de procesamiento. A diferencia de otras soluciones de escalabilidad, como [cadenas laterales](/developers/docs/scaling/sidechains/), los rollups optimistas derivan la seguridad de la red principal publicando los resultados de las transacciones en cadena, o [cadenas de plasma](/developers/docs/scaling/plasma/), que también verifican las transacciones en Ethereum con pruebas de fraude, pero almacenan los datos de las transacciones en otros lugares.

Como la computación es la parte lenta y costosa del uso de Ethereum, los rollups optimistas pueden ofrecer mejoras de hasta 10-100x en la escalabilidad. Los rollups optimistas también escriben transacciones en Ethereum como `calldata` o en [blobs](/roadmap/danksharding/), lo que reduce los costos de gas para los usuarios.

## Requisitos previos {#prerequisites}

Debería haber leído y entendido nuestras páginas sobre [escalabilidad de Ethereum](/developers/docs/scaling/) y [capa 2](/layer-2/).

## ¿Qué es un rollup optimista? {#what-is-an-optimistic-rollup}

Un rollup optimista es un enfoque para escalar Ethereum que implica pasar la computación y el almacenamiento de estado fuera de la cadena. Los rollups optimistas ejecutan transacciones fuera de Ethereum, pero publican los datos de las transacciones en la Red principal como `calldata` o en [blobs](/roadmap/danksharding/).

Los operadores de rollup optimistas agrupan múltiples transacciones fuera de la cadena en grandes lotes antes de enviarlas a Ethereum. Este enfoque permite distribuir los costes fijos entre múltiples transacciones en cada lote, reduciendo así las tarifas para los usuarios finales. Los rollups optimistas también utilizan técnicas de compresión para reducir la cantidad de datos publicados en Ethereum.

Los rollups optimistas se consideran «optimistas» porque asumen que las transacciones fuera de la cadena son válidas y no publican pruebas de validez para los lotes de transacciones publicados en la cadena. Esto separa los rollups optimistas de los [rollups de conocimiento cero](/developers/docs/scaling/zk-rollups) que publican [pruebas criptográficas de validez](/glossary/#validity-proof) para transacciones fuera de la cadena.

En cambio, los rollups optimistas se basan en un esquema de prueba de fraude para detectar casos en los que las transacciones no se calculan correctamente. Después de enviar un lote de rollup en Ethereum, hay una ventana de tiempo (llamada período de desafío) durante la cual cualquiera puede desafiar los resultados de una transacción rollup calculando una [prueba de fraude](/glossary/#fraud-proof).

Si la prueba de fraude tiene éxito, el protocolo rollup vuelve a ejecutar la(s) transacción(es) y actualiza el estado del rollup en consecuencia. El otro efecto de una prueba de fraude exitosa es que el secuenciador responsable de incluir la transacción ejecutada incorrectamente en un bloque reciba una penalización.

Si el lote de rollup permanece sin impugnar (es decir, todas las transacciones se ejecutan correctamente) después de que transcurra el período de desafío, se considera válido y aceptado en Ethereum. Otros pueden seguir construyendo sobre un bloque acumulable no confirmado, pero con una advertencia: los resultados de la transacción se revertirán si se basan en una transacción ejecutada incorrectamente publicada anteriormente.

## ¿Cómo interactúan los rollups optimistas con Ethereum? {#optimistic-rollups-and-Ethereum}

Los rollups optimistas son [soluciones de escalabilidad fuera de la cadena](/developers/docs/scaling/#off-chain-scaling) creadas para operar sobre Ethereum. Cada rollup optimista lo administra un conjunto de contratos inteligentes desplegados en la red Ethereum. Los rollups optimistas procesan las transacciones fuera de la cadena principal de Ethereum, pero publican las transacciones fuera de la cadena (en lotes) en un contrato rollup en cadena. Al igual que la cadena de bloques de Ethereum, este registro de transacciones es inmutable y forma la «cadena de rollup optimista».

La arquitectura de un rollup optimista comprende las siguientes partes:

**Contratos en cadena**: La operación de los rollups optimistas está controlada por contratos inteligentes que se ejecutan en Ethereum. Esto incluye contratos que almacenan bloques de rollup, monitorean las actualizaciones de estado en el rollup y rastrean los depósitos de los usuarios. En este sentido, Ethereum sirve como capa base o «capa 1» para los rollups optimistas.

**Máquina virtual fuera de cadena (VM)**: Aunque los contratos que gestionan el protocolo de rollup optimista se ejecutan en Ethereum, el protocolo rollup realiza el cálculo y el almacenamiento de estado en otra máquina virtual separada de la [Máquina virtual Ethereum](/developers/docs/evm/). En la máquina virtual fuera de la cadena se activan las aplicaciones y se ejecutan los cambios de estado; sirve de capa superior o «capa 2» para un rollup optimista.

Como los rollups optimistas están diseñados para ejecutar programas escritos o compilados para la EVM, la máquina virtual fuera de la cadena incorpora muchas especificaciones de diseño de la EVM. Además, las pruebas de fraude calculadas en cadena permiten que la red Ethereum refuerce el cumplimiento de la validez de los cambios de estado calculados en la máquina virtual fuera de la cadena VM.

Los rollups optimistas pueden definirse como «soluciones de escalado híbridas» porque, aunque existen como protocolos separados, sus propiedades de seguridad se derivan de Ethereum. Entre otras cosas, Ethereum garantiza la exactitud del cálculo fuera de cadena de un rollup y la disponibilidad de datos detrás del cálculo. Esto hace que los rollups optimistas sean más seguros que los protocolos de escalabilidad fuera de la cadena (por ejemplo, [cadenas laterales](/developers/docs/scaling/sidechains/)) cuya seguridad no depende de Ethereum.

Los rollups optimistas se basan en el protocolo principal de Ethereum para lo siguiente:

### Disponibilidad de datos {#data-availability}

Como se mencionó, los rollups optimistas publican datos de transacciones en Ethereum como `calldata` o [blobs](/roadmap/danksharding/). Dado que la ejecución de la cadena de rollup se basa en las transacciones enviadas, cualquier persona puede usar esta información, anclada en la capa base de Ethereum, para ejecutar el estado del acumulable y verificar la exactitud de las transiciones de estado.

[La disponibilidad de los datos](/developers/docs/data-availability/) es crítica porque sin acceso a los datos estatales, los retadores no pueden construir pruebas de fraude para disputar operaciones rollup no válidas. Al proporcionar Ethereum disponibilidad de datos, se reduce el riesgo de que los operadores de rollup se salgan con la suya mediante actos maliciosos (por ejemplo, la presentación de bloques no válidos).

### Resistencia a la censura {#censorship-resistance}

Los rollups optimistas también confían su resistencia a la censura a Ethereum. En un rollup optimista, una entidad centralizada (el operador) es responsable de procesar transacciones y enviar bloques de rollup a Ethereum. Esto tiene algunas implicaciones:

- Los operadores de rollup pueden censurar a los usuarios desconectándose por completo o negándose a producir bloques que incluyan ciertas transacciones en ellos.

- Los operadores de rollup pueden evitar que los usuarios retiren los fondos depositados en el contrato rollup reteniendo los datos del estado necesarios para las pruebas de propiedad de Merkle. La retención de datos de estado también puede ocultar el estado del rollup a los usuarios y evitar que interactúen con el rollup.

Los rollups optimistas resuelven este problema obligando a los operadores a publicar datos asociados con las actualizaciones de estado en Ethereum. La publicación de datos de rollup en cadena tiene los siguientes beneficios:

- Si un operador de rollup optimista se desconecta o deja de producir lotes de transacciones, otro nodo puede usar los datos disponibles para reproducir el último estado del rollup y continuar la producción de bloques.

- Los usuarios pueden utilizar los datos de las transacciones para crear pruebas de Merkle que demuestren la propiedad de los fondos y retirar sus activos del rollup.

- Los usuarios también pueden enviar sus transacciones en L1 en lugar del secuenciador, en cuyo caso el secuenciador tiene que incluir la transacción dentro de un cierto margen de tiempo para continuar produciendo bloques válidos.

### Resolución {#settlement}

Otro papel que desempeña Ethereum en el contexto de los rollups optimistas es el de capa de asentamiento. Una capa de liquidación ancla todo el ecosistema de la cadena de bloques, establece la seguridad y proporciona una finalidad objetiva si se produce una disputa en otra cadena (rollups optimistas en este caso) que requiera arbitraje.

La red principal de Ethereum proporciona un centro de rollups optimistas para verificar pruebas de fraude y resolver disputas. Además, las transacciones realizadas en el rollup solo son finales _después de_ que se acepte el bloque rollup en Ethereum. Una vez que una transacción rollup se compromete con la capa base de Ethereum, no se puede revertir (excepto en el caso altamente improbable de una reorganización de la cadena).

## ¿Cómo funcionan los rollups optimistas? {#how-optimistic-rollups-work}

### Ejecución de transacciones y agregación {#transaction-execution-and-aggregation}

Los usuarios envían transacciones a los «operadores», que son nodos responsables de procesar las transacciones en el rollup optimista. También conocido como «validador» o «agregador», el operador añade las transacciones, comprime los datos subyacentes y publica el bloque en Ethereum.

Aunque cualquiera puede convertirse en validador, los validadores de rollup optimistas deben proporcionar un vínculo antes de que bloques, al igual que un [sistema de prueba de participación](/developers/docs/consensus-mechanisms/pos/). Este enlace se puede recortar si el validador publica un bloque no válido o se basa en un bloque antiguo pero no válido (incluso si su bloque es válido). De esta manera, los rollups optimistas utilizan incentivos criptoeconómicos para garantizar que los validadores actúen con honestidad.

Se espera que otros validadores de la cadena de rollup optimista ejecuten las transacciones enviadas utilizando su copia del estado del rollup. Si el estado final de un validador es diferente del estado propuesto por un operador, puede empezar un proceso de cuestionamiento y computar una prueba de fraude.

Algunos rollups optimistas pueden renunciar a un sistema de validación sin autorización y usar un solo «secuenciador» para ejecutar la cadena. En calidad de validador, el secuenciador procesa las transacciones, produce bloques rollup y envía transacciones rollup a la cadena L1 (Ethereum).

El secuenciador es diferente de un operador de rollup regular, porque tienen un mayor control sobre el orden de las transacciones. Además, el secuenciador tiene acceso prioritario a la cadena de rollup y es la única entidad autorizada para enviar transacciones al contrato en cadena. Las transacciones de nodos no secuenciales o usuarios regulares simplemente se ponen en cola en una bandeja de entrada separada hasta que el secuenciador las incluya en un nuevo lote.

#### Envío de bloques de rollup a Ethereum {#submitting-blocks-to-ethereum}

Como se ha mencionado anteriormente, el operador de un rollup optimista agrupa las transacciones fuera de la cadena en un lote y las envía a Ethereum para su certificación notarial. Este proceso consiste en comprimir los datos relacionados con las transacciones y publicarlos en Ethereum como `calldata` o en blobs.

`Calldata` es un área no modificable y no persistente en un contrato inteligente que se comporta principalmente como [memoria](/developers/docs/smart-contracts/anatomy/#memory). Si bien `calldata` persiste en la cadena como parte de los [registros del historial de la cadena de bloques](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs), no se almacena como parte del estado de Ethereum. Debido a que `calldata` no toca ninguna parte del estado de Ethereum, es más barato que el estado para almacenar datos en la cadena.

La palabra clave `calldata` también se utiliza en Solidity para pasar argumentos a una función de contrato inteligente en el momento de la ejecución. `Calldata` identifica la función que se activa durante una transacción y le proporciona información a la función en forma de una secuencia arbitraria de bytes.

En el contexto de las rollups optimistas, `calldata` se utiliza para enviar datos de transacción comprimidos al contrato en cadena. El operador de rollup añade un nuevo lote llamando a la función requerida en el contrato de rollup y pasando los datos comprimidos como argumentos de función. El uso de `calldata` reduce las tarifas de usuario, ya que la mayoría de los costes en los que incurren provienen del almacenamiento de datos en cadena.

Aquí está [un ejemplo](https://etherscan.io/tx/0x9102bfce17c58b5fc1c974c24b6bb7a924fb5fbd7c4cd2f675911c27422a5591) de un envío de lotes de rollup para mostrar cómo funciona este concepto. El secuenciador invocó el método `appendSequencerBatch()` y pasó los datos comprimidos de la transacción como entradas usando `calldata`.

Algunos rollups ahora utilizan blobs para publicar lotes de transacciones en Ethereum.

Los blobs son no modificables y no persistentes (al igual que `calldata`), pero se podan del historial después de ~18 días. Para obtener más información sobre los blobs, consulte [Danksharding](/roadmap/danksharding).

### Compromisos de estado {#state-commitments}

En cualquier momento, el estado del rollup optimista (cuentas, saldos, código de contrato, etc.) se organiza como un [árbol de Merkle](/whitepaper/#merkle-trees) denominado «árbol de estado». La raíz de este árbol de Merkle (raíz de estado), que hace referencia al último estado del rollup, se agrupa y se almacena en el contrato de rollup. Cada transición de estado en la cadena produce un nuevo estado de rollup, con el que un operador se compromete calculando una nueva raíz de estado.

Al publicar lotes, el operador debe enviar tanto las antiguas raíces de estado como las nuevas raíces de estado. Si la raíz de estado anterior coincide con la raíz de estado existente en el contrato en cadena, esta última se descarta y se reemplaza con la nueva raíz de estado.

El operador de rollup también debe confirmar una raíz de Merkle para el propio lote de transacciones. Esto permite a cualquier persona probar la inclusión de una transacción en el lote (en L1) presentando una [prueba de Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/).

Los compromisos de estado, especialmente las raíces de estado, son necesarios para demostrar la corrección de los cambios de estado en un rollup optimista. El contrato de rollup acepta nuevas raíces de estado de los operadores inmediatamente después de que se publiquen, pero más tarde puede eliminar raíces de estado no válidas para restaurar el rollup a su estado correcto.

### Demostración de fraude {#fraud-proving}

Como se ha explicado anteriormente, los rollups optimistas permiten a cualquier persona publicar bloques sin proporcionar pruebas de validez. Sin embargo, para garantizar que la cadena siga siendo segura, los rollups optimistas especifican una ventana de tiempo durante la cual cualquiera puede disputar una transición de estado. Por lo tanto, a los bloques rollup se les denomina «afirmaciones», ya que cualquiera puede disputar su validez.

Si alguien disputa una afirmación, entonces el protocolo de rollup iniciará el cálculo de la prueba de fraude. Cada tipo de prueba de fraude es interactiva: alguien debe publicar una afirmación antes de que otra persona pueda impugnarla. La diferencia radica en la cantidad de rondas de interacción que se requieren para calcular la prueba de fraude.

Los esquemas de prueba interactivos de una sola ronda reproducen las transacciones en disputa en L1 para detectar aserciones no válidas. El protocolo rollup emula la reejecución de la transacción en disputa en L1 (Ethereum) utilizando un contrato de verificador, y la raíz de estado calculada determina quién gana el desafío. Si la afirmación del retador sobre el estado correcto del rollup es acertada, se le penaliza al operador por la reducción de su fianza.

Sin embargo, volver a ejecutar transacciones en L1 para detectar el fraude requiere la publicación de compromisos de estado para transacciones individuales y aumenta los datos de rollups que deben publicarse en cadena. La repetición de las transacciones también incurre en importantes costes de gas. Por estas razones, los rollups optimistas están cambiando a pruebas interactivas de varias rondas, lo que logra el mismo objetivo (es decir, detectar operaciones de rollup no válidas) con más eficiencia.

#### Demostración interactiva de varias rondas {#multi-round-interactive-proving}

La prueba interactiva de varias rondas implica un protocolo de ida y vuelta entre el afirmador y el retador, supervisado por un contrato de verificador L1, que en última instancia decide quién miente. Después de que un nodo L2 desafía una afirmación, se requiere que el afirmador divida la afirmación en disputa en dos mitades iguales. Cada afirmación individual en este caso contendrá tantos pasos de cálculo como la otra.

El retador elegirá entonces qué afirmación quiere desafiar. El proceso de división (llamado «protocolo de bisección») continúa hasta que ambas partes disputan una afirmación sobre un _único_ paso de ejecución. En este punto, el contrato L1 resolverá la disputa evaluando la instrucción (y su resultado) para pillar a la parte fraudulenta.

El afirmador debe proporcionar una «prueba de un solo paso» que verifique la validez del cálculo de un solo paso en disputa. Si el afirmador no proporciona la prueba de un solo paso, o el verificador L1 considera que la prueba no es válida, pierde el desafío.

Algunos apuntes sobre este tipo de prueba de fraude:

1. La prueba de fraude interactiva de varias rondas se considera eficiente porque minimiza el trabajo que la cadena L1 debe hacer en el arbitraje de disputas. En lugar de reproducir toda la transacción, la cadena L1 solo necesita volver a ejecutar un paso en la ejecución del rollup.

2. Los protocolos de bisección reducen la cantidad de datos publicados en la cadena (no es necesario publicar confirmaciones de estado para cada transacción). Además, las transacciones rollup optimistas no están limitadas por el límite de gas de Ethereum. Por el contrario, los rollups optimistas que vuelven a ejecutar transacciones deben asegurarse de que una transacción L2 tenga un límite de gas más bajo para emular su ejecución dentro de una sola transacción de Ethereum.

3. Parte del vínculo del afirmador malicioso se otorga al retador, mientras que la otra parte se quema. La quema evita la connivencia entre los validadores; si dos validadores conspiran para iniciar desafíos falsos, aún perderán una parte considerable de toda la participación.

4. La prueba interactiva de varias rondas requiere que ambas partes (el afirmador y el retador) hagan movimientos dentro de la ventana de tiempo especificada. El hecho de no actuar antes de que venza la fecha límite hace que la parte incumplida pierda el desafío.

#### ¿Por qué las pruebas de fraude son importantes para los rollups optimistas? {#fraud-proof-benefits}

Las pruebas de fraude son importantes porque facilitan la _finalidad sin confianza_ en los rollups optimistas. La finalidad sin confianza es una calidad de los rollups optimistas que garantiza que se confirme una transacción siempre y cuando sea válida.

Los nodos maliciosos pueden intentar retrasar la confirmación de un bloque de rollup válido iniciando desafíos falsos. Sin embargo, las pruebas de fraude demostrarán a la larga la validez del bloque de rollup y harán que se confirme.

Esto también se relaciona con otra propiedad de seguridad de los rollups optimistas: la validez de la cadena se basa en la existencia de _un_ nodo honesto. El nodo honesto puede avanzar en la cadena correctamente, ya sea publicando afirmaciones válidas o disputando afirmaciones no válidas. En cualquier caso, los nodos maliciosos que entran en disputas con el nodo honesto perderán sus participaciones durante el proceso de prueba de fraude.

### Interoperabilidad de L1/L2 {#l1-l2-interoperability}

Los rollups optimistas están diseñados para la interoperabilidad con la red principal de Ethereum y permiten a los usuarios pasar mensajes y datos arbitrarios entre L1 y L2. También son compatibles con la EVM, por lo que pueden portar [dapps](/developers/docs/dapps/) existentes a rollups optimistas o crear nuevas dapps utilizando las herramientas de desarrollo de Ethereum.

#### 1. Movimiento de activos {#asset-movement}

##### Claves para entrar en el rollup

Para usar un rollup optimista, los usuarios depositan ETH, tókenes ERC-20 y otros activos aceptados en el contrato [puente](/developers/docs/bridges/) de la lista acumulada en L1. El contrato puente transmitirá la transacción a L2, donde se acuña una cantidad equivalente de activos y se envía a la dirección elegida por el usuario en el rollup optimista.

Las transacciones generadas por el usuario (como un depósito L1 > L2) generalmente se ponen en la cola hasta que el secuenciador las vuelve a enviar al contrato de rollup. Sin embargo, para preservar la resistencia a la censura, los rollups optimistas permiten a los usuarios enviar una transacción directamente al contrato rollup en cadena si se ha retrasado más allá del tiempo máximo permitido.

Algunos rollups optimistas adoptan un enfoque más directo para evitar que los secuenciadores censuren a los usuarios. Aquí, un bloque se define por todas las transacciones enviadas al contrato L1 desde el bloque anterior (por ejemplo, depósitos), además de las transacciones procesadas en la cadena rollup. Si un secuenciador ignora una transacción L1, publicará la (probablemente) incorrecta raíz de estado; por lo tanto, los secuenciadores no pueden retrasar los mensajes generados por el usuario una vez publicados en L1.

##### Claves para salir del rollup

Retirarse de un rollup optimista a Ethereum es más difícil debido al esquema de prueba de fraude. Si un usuario inicia una transacción L2 > L1 para retirar fondos depositados en L1, debe esperar hasta que transcurra el período de desafío, que dura aproximadamente siete días. Sin embargo, el proceso de retirada en sí es bastante sencillo.

Después de que se inicie la solicitud de retiro en el rollup L2, la transacción se incluye en el siguiente lote, mientras que los activos del usuario en el rollup se queman. Una vez que el lote se publica en Ethereum, el usuario puede computar una prueba de Merkle que verifique la inclusión de su transacción de salida en el bloque. Entonces es cuestión de esperar a través del período de retraso para finalizar la transacción en L1 y retirar fondos a la red principal.

Para evitar esperar una semana antes de retirar fondos a Ethereum, los usuarios de rollups optimistas pueden emplear a un **proveedor de liquidez** (LP). Un proveedor de liquidez asume la propiedad de una retirada pendiente de L2 y paga al usuario en L1 (a cambio de una tarifa).

Los proveedores de liquidez pueden comprobar la validez de la solicitud de retirada del usuario (ejecutando la cadena ellos mismos) antes de liberar fondos. De esta manera, tienen la garantía de que la transacción se confirmará eventualmente (es decir, una finalidad sin confianza).

#### 2. Compatibilidad con la EVM {#evm-compatibility}

Para los desarrolladores, la ventaja de los rollups optimistas es su compatibilidad, o, mejor dicho, la equivalencia con la [Máquina Virtual de Ethereum (EVM)](/developers/docs/evm/). Los rollups compatibles con EVM cumplen con las especificaciones de la[Hoja amarilla de Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf) y admiten el EVM a nivel de código de bytes.

La compatibilidad con EVM en los rollups optimistas tiene los siguientes beneficios:

i. Los desarrolladores pueden migrar los contratos inteligentes existentes en Ethereum a cadenas de rollup optimistas sin tener que modificar ampliamente las bases de código. Esto puede ahorrar tiempo a los equipos de desarrollo al implementar contratos inteligentes de Ethereum en L2.

ii. Los desarrolladores y los equipos de proyecto que utilizan rollups optimistas pueden aprovechar la infraestructura de Ethereum. Esto incluye lenguajes de programación, bibliotecas de código, herramientas de prueba, software de cliente, infraestructura de implementación, y así sucesivamente.

Es importante utilizar las herramientas existentes, porque se han sometido a auditorías, depuraciones y optimizaciones a lo largo de los años. También elimina la necesidad de que los desarrolladores de Ethereum aprendan a construir con una pila de desarrollo completamente nueva.

#### 3. Llamadas de contrato entre cadenas {#cross-chain-contract-calls}

Los usuarios (cuentas de propiedad externa) interactúan con los contratos L2 enviando una transacción al contrato de rollup o haciendo que un secuenciador o validador lo haga por ellos. Los rollups optimistas también permiten que las cuentas de contratos en Ethereum interactúen con los contratos L2 utilizando contratos puente para transmitir mensajes y pasar datos entre L1 y L2. Esto significa que puede programar un contrato L1 en la red principal de Ethereum para invocar funciones que pertenecen a contratos en un rollup optimista L2.

Las llamadas de contrato de cadena cruzada ocurren de forma asíncrona, lo que significa que la llamada se inicia primero y luego se ejecuta en un momento posterior. Esto es diferente de las llamadas entre los dos contratos en Ethereum, donde la llamada produce resultados inmediatamente.

Un ejemplo de una llamada de contrato entre cadenas es el depósito de tókenes descrito anteriormente. Un contrato en L1 pone en garantía los tókenes del usuario y envía un mensaje a un contrato L2 emparejado para acuñar una cantidad igual de tókenes en el rollup.

A medida que las llamadas de mensajes entre cadenas ocasionan la ejecución del contrato, el remitente generalmente debe cubrir los [costes de gas](/developers/docs/gas/) para el cálculo. Es recomendable establecer un límite de gas alto para evitar que la transacción falle en la cadena deseada. Una situación de puenteo de tókenes es un buen ejemplo; si el lado L1 de la transacción (depositar los tókenes) funciona, pero el lado L2 (acuñar nuevos tókenes) falla debido a la baja cantidad de gas, el depósito se vuelve irrecuperable.

Por último, debemos tener en cuenta que las llamadas de mensajes L2 > L1 entre contratos deben tener en cuenta los retrasos (las llamadas L1 > L2 generalmente se ejecutan después de unos minutos). Esto se debe a que los mensajes enviados a la red principal desde el rollup optimista no se pueden ejecutar hasta que caduque la ventana de desafío.

## ¿Cómo funcionan las comisiones de rollups optimistas? {#how-do-optimistic-rollup-fees-work}

Los rollups optimistas utilizan un esquema de tarifas de gas, al igual que Ethereum, para indicar cuánto pagan los usuarios por transacción. Las tarifas cobradas en los rollups optimistas dependen de los siguientes componentes:

1. **Escritura de estado**: Los rollups optimistas publican datos de transacciones y encabezados de bloque (que constan de hash de encabezado de bloque anterior, raíz de estado, raíz por lotes) en Ethereum como un `blob`, u "objeto grande binario" (binary large object). [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) introdujo una solución rentable para incluir datos en cadena. Un `blob` es un nuevo campo de transacción que permite que los rollups publiquen datos de transición de estado comprimidos en la Capa 1 de Ethereum. A diferencia de `calldata`, que se queda permanentemente en la cadena, los blobs son de corta duración y se pueden podar de los clientes después de [4096 épocas](https://github.com/ethereum/consensus-specs/blob/81f3ea8322aff6b9fb15132d050f8f98b16bdba4/configs/mainnet.yaml#L147) (aproximadamente 18 días). Al usar blobs para publicar lotes de transacciones comprimidas, los rollups optimistas pueden reducir significativamente el costo de escribir transacciones en la Capa 1.

2. **Gas de blob utilizado**: Las transacciones que cargan blobs emplean un mecanismo de tarifas dinámico similar al introducido por [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559). La tarifa de gas para las transacciones de tipo 3 tiene en cuenta la tarifa base para los blobs, que es determinada por la red en función de la demanda de espacio de blobs y el uso de espacio de blobs de la transacción que se envía.

3. **Tarifas de operador L2**: Esta es la cantidad pagada a los nodos rollup como compensación por los costes computacionales incurridos en el procesamiento de transacciones, al igual que las tarifas de gas en Ethereum. Los nodos de rollups cobran comosiones de transacción más bajas, ya que los L2 tienen mayores capacidades de procesamiento y no se enfrentan a las congestiones de la red que obligan a los validadores de Ethereum a priorizar las transacciones con comisiones más altas.

Los rollups optimistas aplican varios mecanismos para reducir las tarifas a los usuarios, incluyendo el procesamiento por lotes de transacciones y la compresión de `calldata` para reducir los costes de publicación de datos. Puede consultar el [rastreador de comisiones L2](https://l2fees.info/) para obtener una visión general en tiempo real de cuánto cuesta usar los rollups optimistas basados en Ethereum.

## ¿Cómo escalan los rollups optimistas a Ethereum? {#scaling-ethereum-with-optimistic-rollups}

Como se explicó, los rollups optimistas publican datos de transacciones comprimidos en Ethereum para garantizar la disponibilidad de los datos. La capacidad de comprimir los datos publicados en cadena es crucial para escalar el rendimiento en Ethereum con aumentos de rollups optimistas.

La cadena principal de Ethereum pone límites a la cantidad de bloques de datos que pueden contener, denominados en unidades de gas (el [tamaño promedio del bloque](/developers/docs/blocks/#block-size) es de 15 millones de gas). Si bien esto restringe la cantidad de gas que puede usar cada transacción, también significa que podemos aumentar las transacciones procesadas por bloque reduciendo los datos relacionados con las transacciones, mejorando directamente la escalabilidad.

Los rollups optimistas utilizan varias técnicas para lograr la compresión de los datos de las transacciones y mejorar las tasas de TPS. Por ejemplo, este [artículo](https://vitalik.eth.limo/general/2021/01/05/rollup.html) compara los datos que una transacción básica de usuario (envío de ether) genera en la red principal con la cantidad de datos que genera la misma transacción en un rollup:

| Parámetro     | Ethereum (L1)           | Rollup (L2)   |
| ------------- | ----------------------- | ------------- |
| Nonce         | ~3                      | 0             |
| Precio de gas | ~8                      | 0-0,5         |
| Gas           | 3                       | 0-0,5         |
| A             | 21                      | 4             |
| Valor         | 9                       | ~3            |
| Firma         | ~68 (2 + 33 + 33)       | ~0,5          |
| De            | 0 (recuperado de firma) | 4             |
| **Total**     | **~112 bytes**          | **~12 bytes** |

Hacer algunos cálculos aproximados sobre estas cifras puede ayudar a mostrar las mejoras de escalabilidad que ofrece un rollup optimista:

1. El tamaño deseado para cada bloque es de 15 millones de gas y cuesta 16 gas verificar un byte de datos. Dividir el tamaño medio del bloque entre 16 gases (15.000.000/16) muestra que el bloque medio puede contener **937.500 bytes de datos**.
2. Si una transacción rollup básica utiliza 12 bytes, entonces el bloque medio de Ethereum puede procesar **78.125 transacciones de rollup** (937.5000/12) o **39 lotes rollup** (si cada lote tiene un promedio de 2.000 transacciones).
3. Si se produce un nuevo bloque en Ethereum cada 15 segundos, entonces las velocidades de procesamiento del rollup ascenderían a aproximadamente **5,208 transacciones por segundo**. Esto se hace dividiendo el número de transacciones de rollup básicas que un bloque de Ethereum puede contener (**78.125**) entre el tiempo promedio del bloque (**15 segundos**).

Esta es una estimación bastante optimista, dado que las transacciones rollup optimistas no pueden incluir un bloque completo en Ethereum. Sin embargo, puede dar una idea aproximada de la cantidad de ganancias de escalabilidad que los rollups optimistas pueden permitir a los usuarios de Ethereum (las implementaciones actuales ofrecen hasta 2.000 TPS).

Se espera que la introducción de la [fragmentación de datos](/roadmap/danksharding/) en Ethereum mejore la escalabilidad en los rollups optimistas. Debido a que las transacciones rollup deben compartir espacio de bloques con otras transacciones no acumuladas, su capacidad de procesamiento está limitada por el rendimiento de datos en la cadena principal de Ethereum. El Danksharding aumentará el espacio disponible de las cadenas L2 para publicar datos por bloque, utilizando almacenamiento «blob» más barato e impermanente en lugar de un costoso y permanente `CALLDATA`.

### Pros y contras de los rollups optimistas {#optimistic-rollups-pros-and-cons}

| Ventajas                                                                                                                                                                               | Desventajas                                                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ofrecen notables mejoras en la escalabilidad sin sacrificar la seguridad o la falta de confianza.                                                                                      | Retrasos en la finalidad de la transacción debido a posibles desafíos de fraude.                                                                                           |
| Los datos de las transacciones se almacenan en la cadena de capa 1, lo que mejora la transparencia, la seguridad, la resistencia a la censura y la descentralización.                  | Los operadores de rollup centralizados (secuenciadores) pueden influir en el orden de las transacciones.                                                                   |
| La prueba de fraude garantiza la finalidad sin confianza y permite a las minorías honestas asegurar la cadena.                                                                         | Si no hay nodos honestos, un operador malicioso puede robar fondos mediante la publicación de bloques y compromisos de estado no válidos.                                  |
| Las pruebas de fraude informáticas están abiertas al nodo L2 regular, a diferencia de las pruebas de validez (utilizadas en los ZK-rollups) que requieren hardware especial.           | El modelo de seguridad se basa en al menos un nodo honesto que ejecute transacciones rollup y envíe pruebas de fraude para impugnar las transiciones de estado no válidas. |
| Los rollups se benefician de la «vialidad sin confianza» (cualquiera puede obligar a la cadena a avanzar ejecutando transacciones y publicando afirmaciones)                           | Los usuarios deben esperar a que caduque el período de desafío de una semana antes de retirar los fondos de vuelta a Ethereum.                                             |
| Los rollups optimistas se basan en incentivos criptoeconómicos bien diseñados para aumentar la seguridad en la cadena.                                                                 | Los rollups deben publicar todos los datos de las transacciones en cadena, lo que puede aumentar los costes.                                                               |
| La compatibilidad con EVM y Solidity permite a los desarrolladores portar contratos inteligentes nativos de Ethereum a rollups o usar herramientas existentes para crear nuevas dapps. |                                                                                                                                                                            |

### Explicación visual de los rollups optimistas {#optimistic-video}

¿Retiene usted mejor las cosas cuando las ve? Vea una explicación de Finematics de los rollups optimistas:

<YouTube id="7pWxCklcNsU" start="263" />

## Bibliografía para profundizar sobre los rollups optimistas

- [¿Cómo funcionan los rollups optimistas? (La guía completa)](https://www.alchemy.com/overviews/optimistic-rollups)
- [¿Qué es un rollup de cadena de bloques?: introducción técnica](https://www.ethereum-ecosystem.com/blog/what-is-a-blockchain-rollup-a-technical-introduction)
- [Guía esencial sobre Arbitrum](https://newsletter.banklesshq.com/p/the-essential-guide-to-arbitrum)
- [¿Cómo funcionan realmente los rollup optimistas?](https://www.paradigm.xyz/2021/01/how-does-optimisms-rollup-really-work)
- [Análisis detallado de OVM](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [¿Qué es la máquina virtual optimista?](https://www.alchemy.com/overviews/optimistic-virtual-machine)
