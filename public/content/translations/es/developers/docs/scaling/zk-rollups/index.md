---
title: Rollups de conocimiento cero
description: "Una introducción a los rollups de conocimiento cero: una solución de escalabilidad utilizada por la comunidad de Ethereum."
lang: es
---

Los rollups de conocimiento cero (ZK-rollups) son [soluciones de escalabilidad](/developers/docs/scaling/) de capa 2 (l2) que aumentan la capacidad de procesamiento en la [red principal de Ethereum](/) al trasladar la computación y el almacenamiento de estado fuera de la cadena. Los ZK-rollups pueden procesar miles de transacciones en un lote y luego solo publicar algunos datos de resumen mínimos en la Red principal. Estos datos de resumen definen los cambios que deben realizarse en el estado de Ethereum y alguna prueba criptográfica de que esos cambios son correctos.

## Requisitos previos {#prerequisites}

Debería haber leído y comprendido nuestra página sobre [escalabilidad de Ethereum](/developers/docs/scaling/) y la [capa 2 (l2)](/layer-2).

## ¿Qué son los rollups de conocimiento cero? {#what-are-zk-rollups}

Los **rollups de conocimiento cero (ZK-rollups)** agrupan (o 'enrollan') transacciones en lotes que se ejecutan fuera de la cadena. La computación fuera de la cadena reduce la cantidad de datos que deben publicarse en la cadena de bloques. Los operadores de ZK-rollups envían un resumen de los cambios requeridos para representar todas las transacciones en un lote en lugar de enviar cada transacción individualmente. También producen [pruebas de validez](/glossary/#validity-proof) para demostrar la exactitud de sus cambios.

El estado del ZK-rollup es mantenido por un contrato inteligente implementado en la red de Ethereum. Para actualizar este estado, los nodos del ZK-rollup deben enviar una prueba de validez para su verificación. Como se mencionó, la prueba de validez es una garantía criptográfica de que el cambio de estado propuesto por el rollup es realmente el resultado de ejecutar el lote de transacciones dado. Esto significa que los ZK-rollups solo necesitan proporcionar pruebas de validez para finalizar transacciones en Ethereum en lugar de publicar todos los datos de las transacciones en cadena como los [rollups optimistas](/developers/docs/scaling/optimistic-rollups/).

No hay demoras al mover fondos de un ZK-rollup a Ethereum porque las transacciones de salida se ejecutan una vez que el contrato del ZK-rollup verifica la prueba de validez. Por el contrario, el retiro de fondos de los rollups optimistas está sujeto a una demora para permitir que cualquiera impugne la transacción de salida con una [prueba de fraude](/glossary/#fraud-proof).

Los ZK-rollups escriben transacciones en Ethereum como `calldata`. `calldata` es donde se almacenan los datos que se incluyen en llamadas externas a funciones de contratos inteligentes. La información en `calldata` se publica en la cadena de bloques, lo que permite a cualquiera reconstruir el estado del rollup de forma independiente. Los ZK-rollups utilizan técnicas de compresión para reducir los datos de las transacciones; por ejemplo, las cuentas se representan mediante un índice en lugar de una dirección, lo que ahorra 28 bytes de datos. La publicación de datos en cadena es un costo significativo para los rollups, por lo que la compresión de datos puede reducir las tarifas para los usuarios.

## ¿Cómo interactúan los ZK-rollups con Ethereum? {#zk-rollups-and-ethereum}

Una cadena de ZK-rollup es un protocolo fuera de la cadena que opera sobre la cadena de bloques de Ethereum y es administrado por contratos inteligentes de Ethereum en cadena. Los ZK-rollups ejecutan transacciones fuera de la Red principal, pero periódicamente envían lotes de transacciones fuera de la cadena a un contrato de rollup en cadena. Este registro de transacciones es inmutable, al igual que la cadena de bloques de Ethereum, y forma la cadena del ZK-rollup.

La arquitectura central del ZK-rollup se compone de los siguientes componentes:

1. **Contratos en cadena**: Como se mencionó, el protocolo del ZK-rollup está controlado por contratos inteligentes que se ejecutan en Ethereum. Esto incluye el contrato principal que almacena bloques del rollup, rastrea depósitos y monitorea actualizaciones de estado. Otro contrato en cadena (el contrato verificador) verifica las pruebas de conocimiento cero enviadas por los productores de bloques. Por lo tanto, Ethereum sirve como la capa base o "capa 1 (l1)" para el ZK-rollup.

2. **Máquina virtual (VM) fuera de la cadena**: Si bien el protocolo del ZK-rollup vive en Ethereum, la ejecución de transacciones y el almacenamiento de estado ocurren en una máquina virtual separada e independiente de la [EVM](/developers/docs/evm/). Esta VM fuera de la cadena es el entorno de ejecución para las transacciones en el ZK-rollup y sirve como la capa secundaria o "capa 2 (l2)" para el protocolo del ZK-rollup. Las pruebas de validez verificadas en la red principal de Ethereum garantizan la exactitud de las transiciones de estado en la VM fuera de la cadena.

Los ZK-rollups son "soluciones de escalabilidad híbridas": protocolos fuera de la cadena que operan de forma independiente pero derivan su seguridad de Ethereum. Específicamente, la red de Ethereum hace cumplir la validez de las actualizaciones de estado en el ZK-rollup y garantiza la disponibilidad de los datos detrás de cada actualización del estado del rollup. Como resultado, los ZK-rollups son considerablemente más seguros que las soluciones de escalabilidad puramente fuera de la cadena, como las [cadenas laterales](/developers/docs/scaling/sidechains/), que son responsables de sus propias propiedades de seguridad, o los [validiums](/developers/docs/scaling/validium/), que también verifican transacciones en Ethereum con pruebas de validez, pero almacenan los datos de las transacciones en otro lugar.

Los ZK-rollups dependen del protocolo principal de Ethereum para lo siguiente:

### Disponibilidad de datos {#data-availability}

Los ZK-rollups publican datos de estado para cada transacción procesada fuera de la cadena en Ethereum. Con estos datos, es posible que individuos o empresas reproduzcan el estado del rollup y validen la cadena por sí mismos. Ethereum pone estos datos a disposición de todos los participantes de la red como `calldata`.

Los ZK-rollups no necesitan publicar muchos datos de transacciones en cadena porque las pruebas de validez ya verifican la autenticidad de las transiciones de estado. Sin embargo, almacenar datos en cadena sigue siendo importante porque permite la verificación independiente y sin permisos del estado de la cadena de L2, lo que a su vez permite a cualquiera enviar lotes de transacciones, evitando que operadores maliciosos censuren o congelen la cadena.

Estar en cadena es necesario para que los usuarios interactúen con el rollup. Sin acceso a los datos de estado, los usuarios no pueden consultar el saldo de su cuenta ni iniciar transacciones (por ejemplo, retiros) que dependan de la información del estado.

### Finalidad de la transacción {#transaction-finality}

Ethereum actúa como una capa de liquidación para los ZK-rollups: las transacciones de L2 se finalizan solo si el contrato de L1 acepta la prueba de validez. Esto elimina el riesgo de que operadores maliciosos corrompan la cadena (por ejemplo, robando fondos del rollup) ya que cada transacción debe ser aprobada en la Red principal. Además, Ethereum garantiza que las operaciones de los usuarios no se pueden revertir una vez finalizadas en L1.

### Resistencia a la censura {#censorship-resistance}

La mayoría de los ZK-rollups utilizan un "supernodo" (el operador) para ejecutar transacciones, producir lotes y enviar bloques a L1. Si bien esto garantiza la eficiencia, aumenta el riesgo de censura: los operadores maliciosos de ZK-rollups pueden censurar a los usuarios al negarse a incluir sus transacciones en los lotes.

Como medida de seguridad, los ZK-rollups permiten a los usuarios enviar transacciones directamente al contrato del rollup en la Red principal si creen que están siendo censurados por el operador. Esto permite a los usuarios forzar una salida del ZK-rollup a Ethereum sin tener que depender del permiso del operador.

## ¿Cómo funcionan los ZK-rollups? {#how-do-zk-rollups-work}

### Transacciones {#transactions}

Los usuarios en el ZK-rollup firman transacciones y las envían a los operadores de L2 para su procesamiento e inclusión en el siguiente lote. En algunos casos, el operador es una entidad centralizada, llamada secuenciador, que ejecuta transacciones, las agrega en lotes y las envía a L1. El secuenciador en este sistema es la única entidad autorizada para producir bloques de L2 y agregar transacciones del rollup al contrato del ZK-rollup.

Otros ZK-rollups pueden rotar el rol de operador utilizando un conjunto de validadores de [prueba de participación (PoS)](/developers/docs/consensus-mechanisms/pos/). Los posibles operadores depositan fondos en el contrato del rollup, y el tamaño de cada participación influye en las posibilidades del participante de ser seleccionado para producir el siguiente lote del rollup. La participación del operador puede sufrir un recorte si actúa de forma maliciosa, lo que lo incentiva a publicar bloques válidos.

#### Cómo publican los ZK-rollups los datos de las transacciones en Ethereum {#how-zk-rollups-publish-transaction-data-on-ethereum}

Como se explicó, los datos de las transacciones se publican en Ethereum como `calldata`. `calldata` es un área de datos en un contrato inteligente que se utiliza para pasar argumentos a una función y se comporta de manera similar a la [memoria](/developers/docs/smart-contracts/anatomy/#memory). Si bien `calldata` no se almacena como parte del estado de Ethereum, persiste en cadena como parte de los [registros históricos](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) de la cadena de Ethereum. `calldata` no afecta el estado de Ethereum, lo que lo convierte en una forma económica de almacenar datos en cadena.

La palabra clave `calldata` a menudo identifica el método del contrato inteligente que está siendo llamado por una transacción y contiene las entradas al método en forma de una secuencia arbitraria de bytes. Los ZK-rollups utilizan `calldata` para publicar datos de transacciones comprimidos en cadena; el operador del rollup simplemente agrega un nuevo lote llamando a la función requerida en el contrato del rollup y pasa los datos comprimidos como argumentos de la función. Esto ayuda a reducir los costos para los usuarios, ya que una gran parte de las tarifas del rollup se destina a almacenar datos de transacciones en cadena.

### Compromisos de estado {#state-commitments}

El estado del ZK-rollup, que incluye cuentas y saldos de L2, se representa como un [árbol de Merkle](/whitepaper/#merkle-trees). Un hash criptográfico de la raíz del árbol de Merkle (raíz de Merkle) se almacena en el contrato en cadena, lo que permite al protocolo del rollup rastrear los cambios en el estado del ZK-rollup.

El rollup transita a un nuevo estado después de la ejecución de un nuevo conjunto de transacciones. El operador que inició la transición de estado debe calcular una nueva raíz de estado y enviarla al contrato en cadena. Si la prueba de validez asociada con el lote es autenticada por el contrato verificador, la nueva raíz de Merkle se convierte en la raíz de estado canónica del ZK-rollup.

Además de calcular las raíces de estado, el operador del ZK-rollup también crea una raíz de lote: la raíz de un árbol de Merkle que comprende todas las transacciones en un lote. Cuando se envía un nuevo lote, el contrato del rollup almacena la raíz del lote, lo que permite a los usuarios demostrar que una transacción (por ejemplo, una solicitud de retiro) se incluyó en el lote. Los usuarios deberán proporcionar los detalles de la transacción, la raíz del lote y una [prueba de Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) que muestre la ruta de inclusión.

### Pruebas de validez {#validity-proofs}

La nueva raíz de estado que el operador del ZK-rollup envía al contrato de L1 es el resultado de las actualizaciones del estado del rollup. Supongamos que Alice envía 10 tokens a Bob, el operador simplemente disminuye el saldo de Alice en 10 e incrementa el saldo de Bob en 10. Luego, el operador aplica un hash a los datos de la cuenta actualizados, reconstruye el árbol de Merkle del rollup y envía la nueva raíz de Merkle al contrato en cadena.

Pero el contrato del rollup no aceptará automáticamente el compromiso de estado propuesto hasta que el operador demuestre que la nueva raíz de Merkle resultó de actualizaciones correctas al estado del rollup. El operador del ZK-rollup hace esto produciendo una prueba de validez, un compromiso criptográfico sucinto que verifica la exactitud de las transacciones procesadas por lotes.

Las pruebas de validez permiten a las partes demostrar la exactitud de una afirmación sin revelar la afirmación en sí; por lo tanto, también se denominan pruebas de conocimiento cero. Los ZK-rollups utilizan pruebas de validez para confirmar la exactitud de las transiciones de estado fuera de la cadena sin tener que volver a ejecutar las transacciones en Ethereum. Estas pruebas pueden presentarse en forma de un [ZK-SNARK](https://arxiv.org/abs/2202.06877) (Argumento de conocimiento sucinto no interactivo de conocimiento cero) o un [ZK-STARK](https://eprint.iacr.org/2018/046) (Argumento de conocimiento transparente escalable de conocimiento cero).

Tanto los SNARKs como los STARKs ayudan a dar fe de la integridad de la computación fuera de la cadena en los ZK-rollups, aunque cada tipo de prueba tiene características distintivas.

**ZK-SNARKs**

Para que el protocolo ZK-SNARK funcione, es necesario crear una Cadena de Referencia Común (CRS, por sus siglas en inglés): la CRS proporciona parámetros públicos para probar y verificar las pruebas de validez. La seguridad del sistema de prueba depende de la configuración de la CRS; si la información utilizada para crear parámetros públicos cae en posesión de actores maliciosos, es posible que puedan generar pruebas de validez falsas.

Algunos ZK-rollups intentan resolver este problema utilizando una [ceremonia de computación multiparte (MPC)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), que involucra a personas de confianza, para generar parámetros públicos para el circuito ZK-SNARK. Cada parte aporta cierta aleatoriedad (llamada "desecho tóxico") para construir la CRS, que deben destruir de inmediato.

Las configuraciones confiables se utilizan porque aumentan la seguridad de la configuración de la CRS. Siempre que un participante honesto destruya su entrada, la seguridad del sistema ZK-SNARK está garantizada. Aun así, este enfoque requiere confiar en que los involucrados eliminen su aleatoriedad muestreada y no socaven las garantías de seguridad del sistema.

Dejando a un lado los supuestos de confianza, los ZK-SNARKs son populares por sus pequeños tamaños de prueba y su verificación en tiempo constante. Dado que la verificación de pruebas en L1 constituye el mayor costo de operar un ZK-rollup, las L2 utilizan ZK-SNARKs para generar pruebas que se pueden verificar de manera rápida y económica en la Red principal.

**ZK-STARKs**

Al igual que los ZK-SNARKs, los ZK-STARKs demuestran la validez de la computación fuera de la cadena sin revelar las entradas. Sin embargo, los ZK-STARKs se consideran una mejora con respecto a los ZK-SNARKs debido a su escalabilidad y transparencia.

Los ZK-STARKs son 'transparentes', ya que pueden funcionar sin la configuración confiable de una Cadena de Referencia Común (CRS). En cambio, los ZK-STARKs dependen de una aleatoriedad verificable públicamente para configurar los parámetros para generar y verificar pruebas.

Los ZK-STARKs también proporcionan más escalabilidad porque el tiempo necesario para probar y verificar las pruebas de validez aumenta de forma _cuasilineal_ en relación con la complejidad de la computación subyacente. Con los ZK-SNARKs, los tiempos de prueba y verificación escalan de forma _lineal_ en relación con el tamaño de la computación subyacente. Esto significa que los ZK-STARKs requieren menos tiempo que los ZK-SNARKs para probar y verificar cuando se trata de grandes conjuntos de datos, lo que los hace útiles para aplicaciones de alto volumen.

Los ZK-STARKs también son seguros contra computadoras cuánticas, mientras que se cree ampliamente que la criptografía de curva elíptica (ECC) utilizada en los ZK-SNARKs es susceptible a ataques de computación cuántica. La desventaja de los ZK-STARKs es que producen tamaños de prueba más grandes, que son más costosos de verificar en Ethereum.

#### ¿Cómo funcionan las pruebas de validez en los ZK-rollups? {#validity-proofs-in-zk-rollups}

##### Generación de pruebas {#}

Antes de aceptar transacciones, el operador realizará las comprobaciones habituales. Esto incluye confirmar que:

- Las cuentas del remitente y del receptor forman parte del árbol de estado.
- El remitente tiene fondos suficientes para procesar la transacción.
- La transacción es correcta y coincide con la clave pública del remitente en el rollup.
- El nonce del remitente es correcto, etc.

Una vez que el nodo del ZK-rollup tiene suficientes transacciones, las agrega en un lote y compila las entradas para que el circuito de prueba las compile en una prueba ZK sucinta. Esto incluye:

- Una raíz del árbol de Merkle que comprende todas las transacciones en el lote.
- Pruebas de Merkle para las transacciones para demostrar su inclusión en el lote.
- Pruebas de Merkle para cada par remitente-receptor en las transacciones para demostrar que esas cuentas forman parte del árbol de estado del rollup.
- Un conjunto de raíces de estado intermedias, derivadas de la actualización de la raíz de estado después de aplicar las actualizaciones de estado para cada transacción (es decir, disminuir las cuentas de los remitentes y aumentar las cuentas de los receptores).

El circuito de prueba calcula la prueba de validez "iterando" sobre cada transacción y realizando las mismas comprobaciones que el operador completó antes de procesar la transacción. Primero, verifica que la cuenta del remitente forme parte de la raíz de estado existente utilizando la prueba de Merkle proporcionada. Luego reduce el saldo del remitente, aumenta su nonce, aplica un hash a los datos de la cuenta actualizados y los combina con la prueba de Merkle para generar una nueva raíz de Merkle.

Esta raíz de Merkle refleja el único cambio en el estado del ZK-rollup: un cambio en el saldo y el nonce del remitente. Esto es posible porque la prueba de Merkle utilizada para demostrar la existencia de la cuenta se utiliza para derivar la nueva raíz de estado.

El circuito de prueba realiza el mismo proceso en la cuenta del receptor. Comprueba si la cuenta del receptor existe bajo la raíz de estado intermedia (utilizando la prueba de Merkle), aumenta su saldo, vuelve a aplicar un hash a los datos de la cuenta y los combina con la prueba de Merkle para generar una nueva raíz de estado.

El proceso se repite para cada transacción; cada "iteración" crea una nueva raíz de estado a partir de la actualización de la cuenta del remitente y una nueva raíz posterior a partir de la actualización de la cuenta del receptor. Como se explicó, cada actualización de la raíz de estado representa el cambio de una parte del árbol de estado del rollup.

El circuito de prueba ZK itera sobre todo el lote de transacciones, verificando la secuencia de actualizaciones que dan como resultado una raíz de estado final después de que se ejecuta la última transacción. La última raíz de Merkle calculada se convierte en la raíz de estado canónica más reciente del ZK-rollup.

##### Verificación de pruebas {#}

Después de que el circuito de prueba verifica la exactitud de las actualizaciones de estado, el operador de L2 envía la prueba de validez calculada al contrato verificador en L1. El circuito de verificación del contrato verifica la validez de la prueba y también comprueba las entradas públicas que forman parte de la prueba:

- **Raíz de estado previo**: La antigua raíz de estado del ZK-rollup (es decir, antes de que se ejecutaran las transacciones por lotes), que refleja el último estado válido conocido de la cadena de L2.

- **Raíz de estado posterior**: La nueva raíz de estado del ZK-rollup (es decir, después de la ejecución de las transacciones por lotes), que refleja el estado más reciente de la cadena de L2. La raíz de estado posterior es la raíz final derivada después de aplicar las actualizaciones de estado en el circuito de prueba.

- **Raíz del lote**: La raíz de Merkle del lote, derivada al _merklizar_ las transacciones en el lote y aplicar un hash a la raíz del árbol.

- **Entradas de transacciones**: Datos asociados con las transacciones ejecutadas como parte del lote enviado.

Si la prueba satisface el circuito (es decir, es válida), significa que existe una secuencia de transacciones válidas que hacen la transición del rollup desde el estado anterior (con huella criptográfica mediante la raíz de estado previo) a un nuevo estado (con huella criptográfica mediante la raíz de estado posterior). Si la raíz de estado previo coincide con la raíz almacenada en el contrato del rollup, y la prueba es válida, el contrato del rollup toma la raíz de estado posterior de la prueba y actualiza su árbol de estado para reflejar el estado modificado del rollup.

### Entradas y salidas {#entries-and-exits}

Los usuarios ingresan al ZK-rollup depositando tokens en el contrato del rollup implementado en la cadena de L1. Esta transacción se pone en cola ya que solo los operadores pueden enviar transacciones al contrato del rollup.

Si la cola de depósitos pendientes comienza a llenarse, el operador del ZK-rollup tomará las transacciones de depósito y las enviará al contrato del rollup. Una vez que los fondos del usuario están en el rollup, pueden comenzar a realizar transacciones enviándolas al operador para su procesamiento. Los usuarios pueden verificar los saldos en el rollup aplicando un hash a los datos de su cuenta, enviando el hash al contrato del rollup y proporcionando una prueba de Merkle para verificar contra la raíz de estado actual.

El retiro de un ZK-rollup a L1 es sencillo. El usuario inicia la transacción de salida enviando sus activos en el rollup a una cuenta especificada para quemar. Si el operador incluye la transacción en el siguiente lote, el usuario puede enviar una solicitud de retiro al contrato en cadena. Esta solicitud de retiro incluirá lo siguiente:

- Prueba de Merkle que demuestra la inclusión de la transacción del usuario a la cuenta de quema en un lote de transacciones

- Datos de la transacción

- Raíz del lote

- Dirección de L1 para recibir los fondos depositados

El contrato del rollup aplica un hash a los datos de la transacción, comprueba si existe la raíz del lote y utiliza la prueba de Merkle para comprobar si el hash de transacción forma parte de la raíz del lote. Posteriormente, el contrato ejecuta la transacción de salida y envía los fondos a la dirección elegida por el usuario en L1.

## ZK-rollups y compatibilidad con la EVM {#zk-rollups-and-evm-compatibility}

A diferencia de los rollups optimistas, los ZK-rollups no son fácilmente compatibles con la [Máquina Virtual de Ethereum (EVM)](/developers/docs/evm/). Demostrar la computación de propósito general de la EVM en circuitos es más difícil y requiere más recursos que demostrar cálculos simples (como la transferencia de tokens descrita anteriormente).

Sin embargo, los [avances en la tecnología de conocimiento cero](https://hackmd.io/@yezhang/S1_KMMbGt#Why-possible-now) están despertando un renovado interés en envolver la computación de la EVM en pruebas de conocimiento cero. Estos esfuerzos están orientados a crear una implementación de zkEVM que pueda verificar de manera eficiente la exactitud de la ejecución del programa. Una zkEVM recrea los códigos de operación (opcodes) existentes de la EVM para su prueba/verificación en circuitos, lo que permite ejecutar contratos inteligentes.

Al igual que la EVM, una zkEVM transita entre estados después de que se realiza la computación en algunas entradas. La diferencia es que la zkEVM también crea pruebas de conocimiento cero para verificar la exactitud de cada paso en la ejecución del programa. Las pruebas de validez podrían verificar la exactitud de las operaciones que tocan el estado de la VM (memoria, pila, almacenamiento) y la computación en sí (es decir, ¿la operación llamó a los opcodes correctos y los ejecutó correctamente?).

Se espera que la introducción de ZK-rollups compatibles con la EVM ayude a los desarrolladores a aprovechar las garantías de escalabilidad y seguridad de las pruebas de conocimiento cero. Más importante aún, la compatibilidad con la infraestructura nativa de Ethereum significa que los desarrolladores pueden crear aplicaciones descentralizadas (dapps) amigables con ZK utilizando herramientas y lenguajes familiares (y probados en batalla).

## ¿Cómo funcionan las tarifas de los ZK-rollups? {#how-do-zk-rollup-fees-work}

Cuánto pagan los usuarios por las transacciones en los ZK-rollups depende de la tarifa de gas, al igual que en la red principal de Ethereum. Sin embargo, las tarifas de gas funcionan de manera diferente en L2 y están influenciadas por los siguientes costos:

1. **Escritura de estado**: Hay un costo fijo por escribir en el estado de Ethereum (es decir, enviar una transacción en la cadena de bloques de Ethereum). Los ZK-rollups reducen este costo mediante el procesamiento por lotes de transacciones y distribuyendo los costos fijos entre múltiples usuarios.

2. **Publicación de datos**: Los ZK-rollups publican datos de estado para cada transacción en Ethereum como `calldata`. Los costos de `calldata` se rigen actualmente por [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), que estipula un costo de 16 de gas para bytes distintos de cero y 4 de gas para bytes cero de `calldata`, respectivamente. El costo pagado en cada transacción está influenciado por la cantidad de `calldata` que debe publicarse en cadena para ella.

3. **Tarifas del operador de L2**: Esta es la cantidad pagada al operador del rollup como compensación por los costos computacionales incurridos en el procesamiento de transacciones, de manera muy similar a las ["tarifas de prioridad (propinas)" de las transacciones](/developers/docs/gas/#how-are-gas-fees-calculated) en la red principal de Ethereum.

4. **Generación y verificación de pruebas**: Los operadores de ZK-rollups deben producir pruebas de validez para los lotes de transacciones, lo que requiere muchos recursos. Verificar pruebas de conocimiento cero en la Red principal también cuesta gas (~ 500.000 de gas).

Aparte del procesamiento por lotes de transacciones, los ZK-rollups reducen las tarifas para los usuarios al comprimir los datos de las transacciones. Puede [ver una descripción general en tiempo real](https://l2fees.info/) de cuánto cuesta usar los ZK-rollups de Ethereum.

## ¿Cómo escalan los ZK-rollups a Ethereum? {#scaling-ethereum-with-zk-rollups}

### Compresión de datos de transacciones {#transaction-data-compression}

Los ZK-rollups amplían la capacidad de procesamiento en la capa base de Ethereum al llevar la computación fuera de la cadena, pero el verdadero impulso para la escalabilidad proviene de la compresión de los datos de las transacciones. El [tamaño del bloque](/developers/docs/blocks/#block-size) de Ethereum limita los datos que cada bloque puede contener y, por extensión, el número de transacciones procesadas por bloque. Al comprimir los datos relacionados con las transacciones, los ZK-rollups aumentan significativamente el número de transacciones procesadas por bloque.

Los ZK-rollups pueden comprimir los datos de las transacciones mejor que los rollups optimistas, ya que no tienen que publicar todos los datos necesarios para validar cada transacción. Solo tienen que publicar los datos mínimos requeridos para reconstruir el último estado de las cuentas y los saldos en el rollup.

### Pruebas recursivas {#recursive-proofs}

Una ventaja de las pruebas de conocimiento cero es que las pruebas pueden verificar otras pruebas. Por ejemplo, un solo ZK-SNARK puede verificar otros ZK-SNARKs. Estas "pruebas de pruebas" se denominan pruebas recursivas y aumentan drásticamente la capacidad de procesamiento en los ZK-rollups.

Actualmente, las pruebas de validez se generan bloque por bloque y se envían al contrato de L1 para su verificación. Sin embargo, verificar pruebas de un solo bloque limita la capacidad de procesamiento que pueden lograr los ZK-rollups, ya que solo se puede finalizar un bloque cuando el operador envía una prueba.

Las pruebas recursivas, sin embargo, hacen posible finalizar varios bloques con una sola prueba de validez. Esto se debe a que el circuito de prueba agrega recursivamente múltiples pruebas de bloques hasta que se crea una prueba final. El operador de L2 envía esta prueba recursiva y, si el contrato la acepta, todos los bloques relevantes se finalizarán al instante. Con las pruebas recursivas, aumenta el número de transacciones de ZK-rollups que se pueden finalizar en Ethereum a intervalos.

### Pros y contras de los ZK-rollups {#zk-rollups-pros-and-cons}

| Pros                                                                                                                                                                                                   | Contras                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Las pruebas de validez garantizan la exactitud de las transacciones fuera de la cadena y evitan que los operadores ejecuten transiciones de estado no válidas.                                                                           | El costo asociado con el cálculo y la verificación de las pruebas de validez es sustancial y puede aumentar las tarifas para los usuarios del rollup.                                                                            |
| Ofrece una finalidad de la transacción más rápida, ya que las actualizaciones de estado se aprueban una vez que las pruebas de validez se verifican en L1.                                                                                              | Construir ZK-rollups compatibles con la EVM es difícil debido a la complejidad de la tecnología de conocimiento cero.                                                                                                    |
| Depende de mecanismos criptográficos sin necesidad de confianza para la seguridad, no de la honestidad de actores incentivados como ocurre con los [rollups optimistas](/developers/docs/scaling/optimistic-rollups/#optimistic-pros-and-cons). | Producir pruebas de validez requiere hardware especializado, lo que puede fomentar el control centralizado de la cadena por parte de unas pocas partes.                                                                    |
| Almacena los datos necesarios para recuperar el estado fuera de la cadena en L1, lo que garantiza la seguridad, la resistencia a la censura y la descentralización.                                                                       | Los operadores centralizados (secuenciadores) pueden influir en el orden de las transacciones.                                                                                                                     |
| Los usuarios se benefician de una mayor eficiencia del capital y pueden realizar el retiro de fondos de L2 sin demoras.                                                                                                           | Los requisitos de hardware pueden reducir el número de participantes que pueden forzar a la cadena a progresar, lo que aumenta el riesgo de que operadores maliciosos congelen el estado del rollup y censuren a los usuarios. |
| No depende de suposiciones de vitalidad (liveness) y los usuarios no tienen que validar la cadena para proteger sus fondos.                                                                                              | Algunos sistemas de prueba (por ejemplo, ZK-SNARK) requieren una configuración confiable que, si se maneja mal, podría comprometer potencialmente el modelo de seguridad de un ZK-rollup.                                                     |
| Una mejor compresión de datos puede ayudar a reducir los costos de publicar `calldata` en Ethereum y minimizar las tarifas del rollup para los usuarios.                                                                             |                                                                                                                                                                                                    |

### Una explicación visual de los ZK-rollups {#zk-video}

Vea a Finematics explicar los ZK-rollups:

<VideoWatch slug="rollups-scaling-strategy" startTime="406" />


## ¿Quién está trabajando en una zkEVM? {#zkevm-projects}

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>zkEVM para L2 frente a L1</AlertTitle>
<AlertDescription>
Los proyectos a continuación utilizan la tecnología zkEVM para construir rollups de capa 2 (l2). También hay investigaciones sobre el uso de zkEVM para la [verificación de bloques de L1](/roadmap/zkevm/), lo que permitiría a los validadores verificar bloques de Ethereum sin volver a ejecutar las transacciones.
</AlertDescription>
</AlertContent>
</Alert>

Los proyectos que trabajan en zkEVMs incluyen:

- **[zkEVM](https://github.com/privacy-scaling-explorations/zkevm-specs)**: _zkEVM es un proyecto financiado por la Fundación Ethereum para desarrollar un ZK-rollup compatible con la EVM y un mecanismo para generar pruebas de validez para los bloques de Ethereum._

- **[Polygon zkEVM](https://polygon.technology/solutions/polygon-zkevm)**: _es un ZK-rollup descentralizado en la red principal de Ethereum que trabaja en una Máquina Virtual de Ethereum de conocimiento cero (zkEVM) que ejecuta transacciones de Ethereum de manera transparente, incluidos contratos inteligentes con validaciones de pruebas de conocimiento cero._

- **[Scroll](https://scroll.io/blog/zkEVM)**: _Scroll es una empresa impulsada por la tecnología que trabaja en la construcción de una solución nativa de capa 2 (l2) de zkEVM para Ethereum._

- **[Taiko](https://taiko.xyz)**: _Taiko es un ZK-rollup descentralizado y equivalente a Ethereum (una [ZK-EVM de Tipo 1](https://vitalik.eth.limo/general/2022/08/04/zkevm.html))._

- **[ZKsync](https://docs.zksync.io/)**: _ZKsync Era es un ZK-rollup compatible con la EVM construido por Matter Labs, impulsado por su propia zkEVM._

- **[Starknet](https://starkware.co/starknet/)**: _Starknet es una solución de escalabilidad de capa 2 (l2) compatible con la EVM construida por StarkWare._

- **[Morph](https://www.morphl2.io/)**: _Morph es una solución de escalabilidad de rollup híbrido que utiliza pruebas ZK para abordar el problema del desafío de estado de la capa 2 (l2)._

- **[Linea](https://linea.build)**: _Linea es una capa 2 (l2) de zkEVM equivalente a Ethereum construida por ConsenSys, totalmente alineada con el ecosistema de Ethereum._

## Lecturas adicionales sobre los ZK-rollups {#further-reading-on-zk-rollups}

- [¿Qué son los rollups de conocimiento cero?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [¿Qué son los rollups de conocimiento cero?](https://alchemy.com/blog/zero-knowledge-rollups)
- [La guía práctica de los rollups de Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [STARKs frente a SNARKs](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [¿Qué es una zkEVM?](https://www.alchemy.com/overviews/zkevm)
- [Tipos de ZK-EVM: equivalente a Ethereum, equivalente a EVM, Tipo 1, Tipo 4 y otras palabras de moda crípticas](https://taiko.mirror.xyz/j6KgY8zbGTlTnHRFGW6ZLVPuT0IV0_KmgowgStpA0K4)
- [Introducción a zkEVM](https://hackmd.io/@yezhang/S1_KMMbGt)
- [¿Qué son las L2 de ZK-EVM?](https://linea.mirror.xyz/qD18IaQ4BROn_Y40EBMTUTdJHYghUtdECscSWyMvm8M)
- [Recursos de Awesome-zkEVM](https://github.com/LuozhuZhang/awesome-zkevm)
- [ZK-SNARKs a nivel interno](https://vitalik.eth.limo/general/2017/02/01/zk_snarks.html)
- [¿Cómo son posibles los SNARKs?](https://vitalik.eth.limo/general/2021/01/26/snarks.html)

## Tutoriales: Privacidad y conocimiento cero en Ethereum {#tutorials}

- [Uso de conocimiento cero para un estado secreto](/developers/tutorials/secret-state/) _– Cómo usar pruebas ZK y componentes de servidor fuera de la cadena para mantener el estado secreto del juego en cadena._
- [Uso de direcciones ocultas](/developers/tutorials/stealth-addr/) _– Cómo las direcciones ocultas de ERC-5564 permiten transferencias anónimas de ETH utilizando la derivación de claves criptográficas._
- [Uso de Ethereum para la autenticación Web2](/developers/tutorials/ethereum-for-web2-auth/) _– Cómo integrar firmas de billeteras de Ethereum con sistemas de autenticación Web2 basados en SAML._