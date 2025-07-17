---
title: Zero-knowledge Rollups
description: 'Introducción a las pruebas de conocimiento cero: una solución de escalabilidad que utiliza la comunidad de Ethereum.'
lang: es
---

Las pruebas de conocimiento cero (ZK-rollups) son soluciones [soluciones de escalabilidad](/developers/docs/scaling/) de segunda capa que incrementan el rendimiento de la red principal de Ethereum, gracias a que mueven la gran mayoría del trabajo computacional y el almacenamiento fuera de la cadena principal. Los ZK-rollups pueden procesar miles de transacciones en un lote y luego pasar solo algunos de los datos mínimos y necesarios hacia la red principal. Estos datos en resúmen, definen los cambios que deben hacerse en Ethereum,  y realizar pruebas criptográficas de que esos cambios y resultados finales son correctos.

## Requisitos previos {#prerequisites}

Debe haber leído y comprendido el tema [Escalamiento de Ethereum](/developers/docs/scaling/) y [capa 2](/layer-2).

## ¿Qué son las pruebas de conocimiento cero (ZK)? {#what-are-zk-rollups}

**Pruebas de conocimiento cero (ZK-rollups)** son paquetes acumulativos que «enrollan» las transacciones para que se ejecuten fuera de la cadena principal. La computación fuera de la cadena principal reduce la cantidad de datos que tienen que procesarse en la cadena de bloques. Los operadores de ZK-rollups presentan un resumen de los cambios necesarios para representar todas las transacciones en un lote en lugar de enviar cada transacción individualmente. También llevan a cabo [pruebas de su validez](/glossary/#validity-proof) para demostrar la exactitud de sus cambios y resultados finales.

El estado de los ZK-rollups se mantendrá en un contrato inteligente desplegado en la red Ethereum. Para actualizar este estado, los nodos desplegables de ZK-rollup deberán presentar una prueba de su validez para la verificación. Como se ha mencionado, la prueba de validez es una garantía criptográfica de que el cambio de estado propuesto por el rollup es realmente el resultado verdadero de la ejecución de las transacciones. Esto significa que los ZK-rollups solo necesitan proporcionar pruebas de validez para llevar a cabo y completar las transacciones en Ethereum, en lugar de publicar todo el historial en la cadena principal como los [rollups optimistas](/developers/docs/scaling/optimistic-rollups/).

La ejecucíon tardará poco tiempo, ya que cuando se mueven los activos de un ZK-rollup a Ethereum, las transacciones se ejecutan una vez validada y verificada su validez. Por el contrario, retirar fondos de los  Rollups Optimistas está sujeto a un retraso para permitir a cualquiera desafiar la transacción a  [prueba de fraude](/glossary/#fraud-proof).

Los ZK-rollups escriben transacciones en Ethereum como `calldata` (o datos de llamada). En los `calldata` se almacenan los datos incluidos en las llamadas externas a funciones del contrato inteligente. La información en `calldata` se publica en la cadena de bloques, permitiendo que cualquiera reconstruya el estado del rollup de forma independiente. Los ZK-rollup utilizan técnicas de compresión para reducir los datos de las transacciones: por ejemplo, las cuentas están representadas por un índice en lugar de una dirección, que ahorra unos 28 bytes en datos. La publicación de datos dentro de la cadena tiene un coste significativo para los rollups, por lo que la compresión de datos puede reducir las tarifas para los usuarios.

## ¿Cómo interactúan los ZK-rollups con Ethereum? {#zk-rollups-and-ethereum}

Los ZK-rollup tienen un protocolo que se encuentra fuera de la cadena y que funciona apoyándose en la cadena de bloque de Ethereum, la cual ese gestiona mdiante contratos inteligentes dentro de la misma cadena de bloque. Los ZK-rollups ejecutan transacciones fuera de la red principal, aunque realizan lotes de transacciones periódicamente fuera de la cadena a un contrato de rollup dentro de la cadena. Este registro de transacciones es inmutable, al igual que ocurre en la cadena de bloque de Ethereum y forma la cadena de ZK-rollups.

La arquitectura central de los ZK-rollups está compuesta por los siguientes componentes:

1. **Contratos en cadena**: Tal y como se ha mencionado, el protocolo ZK-rollup está controlado por contratos inteligentes que se ejecutan en Ethereum. Esto incluye el contrato principal que almacena los bloques acumulables, realiza un seguimiento de los depósitos y supervisa las actualizaciones del estado. Otro contrato en cadena (el contrato de verificación) verifica las pruebas de conocimiento cero presentadas por los productores en bloque. Por lo tanto, Ethereum sirve como capa base o «capa 1» para el ZK-rollup.

2. **Máquina virtual fuera de la cadena (VM)**: Mientras que el protocolo ZK-rollup vive en Ethereum, la ejecución de transacciones y el almacenamiento de estado ocurren en una máquina virtual separada independiente de la [EVM](/developers/docs/evm/). Esta máquina virtual fuera de la cadena es el entorno de ejecución para las transacciones en el ZK-rollup y sirve de capa secundaria o «capa 2» para el protocolo ZK-rollup. Las pruebas de validez verificadas en la red principal de Ethereum garantizan la corrección de las transiciones de estado en la máquina virtual fuera de la cadena.

Los ZK-rollups son «soluciones híbridas de escalabilidad», protocolos fuera de la cadena que operan de forma independiente pero derivan seguridad de Ethereum. Específicamente, la red Ethereum impone la validez de las actualizaciones de estado en el ZK-rollup y garantiza la disponibilidad de datos detrás de cada actualización del estado del rollup. Como resultado, los ZK-rollups se consideran más seguros que puras soluciones de escalabilidad fuera de la cadena, como [cadenas laterales](/developers/docs/scaling/sidechains/), que son responsables de sus propiedades de seguridad, o [validiums](/developers/docs/scaling/validium/), que también verifican las transacciones en Ethereum con pruebas de validez, pero almacenan los datos de las transacciones en otro.

Los ZK-rollups se basan en el protocolo principal de Ethereum para lo siguiente:

### Disponibilidad de datos {#data-availability}

Los ZK-rollups publican datos de estado para cada transacción procesada fuera de la cadena a Ethereum. Con estos datos, es posible que las personas o las empresas reproduzcan el estado del rollup y validen la cadena por sí mismas. Ethereum pone estos datos a disposición de todos los participantes de la red como `calldata`.

Los ZK-rollups no necesitan publicar muchos datos de transacciones en cadena, porque las pruebas de validez ya verifican la autenticidad de las transiciones de estado. Sin embargo, el almacenamiento de datos en cadena sigue siendo importante, porque permite una verificación independiente y sin autorización del estado de la cadena L2, lo que a su vez permite a cualquier persona enviar lotes de transacciones, evitando que operadores maliciosos censuren o congelen la cadena.

Se requiere en cadena para que los usuarios interactúen con el rollup. Sin acceso a los datos de estado, los usuarios no pueden consultar el saldo de su cuenta o iniciar transacciones (por ejemplo, retiradas) que se basen en la información sobre el estado.

### Finalidad de la transacción {#transaction-finality}

Ethereum actúa como una capa de liquidación para los ZK-rollups: las transacciones L2 se finalizan solo si el contrato L1 acepta la prueba de validez. Esto elimina el riesgo de que los operadores maliciosos corrompan la cadena (por ejemplo, el robo de fondos rollup), ya que cada transacción debe aprobarse en la red principal. Además, Ethereum garantiza que las operaciones de los usuarios no se pueden revertir una vez finalizadas en L1.

### Resistencia a la censura {#censorship-resistance}

La mayoría de los ZK-rollups utilizan un «supernodo» (el operador) para ejecutar transacciones, producir lotes y enviar bloques a L1. Si bien esto garantiza la eficiencia, aumenta el riesgo de censura: los operadores maliciosos de ZK-rollup pueden censurar a los usuarios al negarse a incluir sus transacciones en lotes.

Como medida de seguridad, los ZK-rollups permiten a los usuarios enviar transacciones directamente al contrato de rollup en la red principal si creen que están siendo censurados por el operador. Esto permite a los usuarios forzar una salida del ZK-rollup a Ethereum sin tener que depender del permiso del operador.

## ¿Cómo funcionan los ZK-rollups? {#how-do-zk-rollups-work}

### Transacciones {#transactions}

Los usuarios del ZK-rollup firman las transacciones y las envían a los operadores de L2 para su procesamiento e inclusión en el siguiente lote. En algunos casos, el operador es una entidad centralizada, llamada secuenciador, que ejecuta transacciones, las añade en lotes y las envía a L1. El secuenciador de este sistema es la única entidad a la que se le permite producir bloques L2 y añadir transacciones acumuladas al contrato de ZK-rollup.

Otros ZK-rollups pueden rotar el rol de operador utilizando un conjunto de validadores [prueba de participación](/developers/docs/consensus-mechanisms/pos/). Los posibles operadores depositan fondos en el contrato de rollup. El tamaño de cada participación influye en las posibilidades que el participante tiene de ser seleccionado para producir el próximo lote de rollup. La participación del operador se puede reducir si actúa de forma maliciosa, lo que los incentiva a publicar bloques válidos.

#### Cómo los ZK-rollups publican datos de transacciones en Ethereum {#how-zk-rollups-publish-transaction-data-on-ethereum}

Tal y como se ha explicado, los datos de las transacciones se publican en Ethereum como `calldata` (o datos de llamada). `Calldata` es un área de datos en un contrato inteligente que se utiliza para pasar argumentos a una función y se comporta de manera similar a una [memoria](/developers/docs/smart-contracts/anatomy/#memory). Si bien los `calldata` no se almacenan como parte del estado de Ethereum, persisten en la cadena como parte de los [registros de historial de la cadena Ethereum](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs). `Calldata` no afecta al estado de Ethereum, por lo que es una forma barata de almacenar datos en cadena.

La palabra clave `calldata` a menudo identifica el método de contrato inteligente que llama una transacción y contiene entradas para el método en forma de una secuencia arbitraria de bytes. Los ZK-rollups utilizan los `calldata` para publicar datos de transacciones comprimidas en cadena; el operador rollup simplemente añade un nuevo lote llamando a la función requerida en el contrato rollup y pasa los datos comprimidos como argumentos de función. Esto ayuda a reducir los costes de los usuarios, ya que gran parte de las tarifas de los rollups se destinan al almacenamiento de datos de transacciones en la cadena.

### Compromisos de estado {#state-commitments}

El estado del ZK-rollup, que incluye cuentas y saldos L2, se representa como un [árbol de Merkle](/whitepaper/#merkle-trees). Un hash criptográfico de la raíz del árbol Merkle (raíz Merkle) se almacena en el contrato en cadena, lo que permite que el protocolo rollup realice un seguimiento de los cambios en el estado del ZK rollup.

Las transacciones del rollup pasan a un nuevo estado después de la ejecución de un nuevo conjunto de transacciones. El operador que inició la transición de estado debe calcular una nueva raíz de estado y someterse al contrato en cadena. Si el contrato de verificador autentica la prueba de validez asociada con el lote, la nueva raíz de Merkle se convierte en la raíz de estado canónico del ZK-rollup.

Además de calcular las raíces de estado, el operador ZK-rollup también crea una raíz de lote, la raíz de un árbol de Merkle que comprende todas las transacciones en un lote. Cuando se envía un nuevo lote, el contrato acumulable almacena la raíz del lote, lo que permite a los usuarios probar que una transacción (por ejemplo, una solicitud de retirada) se ha incluido en el lote. Los usuarios tendrán que proporcionar los detalles de la transacción, la raíz del lote y una [prueba de Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) que muestre la ruta de inclusión.

### Pruebas de validez {#validity-proofs}

La nueva raíz de estado que el operador de ZK-rollup envía al contrato L1 es el resultado de las actualizaciones del estado del rollup. Digamos que Alice envía 10 tókenes a Bob, el operador simplemente disminuye el saldo de Alice en 10 e incrementa el saldo de Bob en otros 10. A continuación, el operador hace un hash de los datos actualizados de la cuenta, reconstruye el árbol de Merkle del rollup y envía la nueva raíz de Merkle al contrato en cadena.

Pero el contrato de rollup no aceptará automáticamente el compromiso de estado propuesto hasta que el operador demuestre que la nueva raíz de Merkle es resultante de las actualizaciones correctas del estado del rollup. El operador de ZK-rollup hace esto produciendo una prueba de validez, un compromiso criptográfico sucinto que verifica la exactitud de las transacciones por lotes.

Las pruebas de validez permiten a las partes probar la exactitud de una declaración sin revelar la declaración en sí, por lo tanto, también se llaman pruebas de conocimiento cero. Los ZK-rollups utilizan pruebas de validez para confirmar la corrección de las transiciones de estado fuera de la cadena sin tener que volver a ejecutar transacciones en Ethereum. Estas pruebas pueden venir en forma de un [ZK-SNARK](https://arxiv.org/abs/2202.06877) (Argumento de conocimiento no interactivo sucinto de conocimiento cero) o [ZK-STARK](https://eprint.iacr.org/2018/046) (argumento de conocimiento transparente escalable de conocimiento cero).

Tanto los SNARK como los STARK ayudan a dar fe de la integridad de la computación fuera de la cadena en los ZK-rollups, aunque cada tipo de prueba tiene sus propias características.

**ZK-SNARK**

Para que el protocolo ZK-SNARK funcione, es necesario crear una cadena de referencia común (CRS): el CRS proporciona parámetros públicos para probar y verificar las pruebas de validez. La seguridad del sistema de pruebas depende de la configuración del CRS; si la información utilizada para crear parámetros públicos cae en posesión de operadores maliciosos, pueden ser capaces de generar pruebas de falsa validez.

Algunos ZK-rollups intentan resolver este problema mediante el uso de una [ceremonia de cálculo multipartidista (MPC)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), que involucra a personas de confianza para generar parámetros públicos para el circuito ZK-SNARK. Cada parte contribuye con cierta aleatoriedad (conocido como «residuo tóxico») a la construcción del CRS, que deben destruir inmediatamente.

Las configuraciones de confianza se utilizan porque aumentan la seguridad de la configuración de CRS. Mientras un participante honesto destruya su aportación, la seguridad del sistema ZK-SNARK está garantizada. Aún así, este enfoque requiere confiar en los involucrados para eliminar la aleatoriedad de su muestra y no socavar las garantías de seguridad del sistema.

Dejando a un lado las suposiciones de confianza, los ZK-SNARK son populares por sus pequeños tamaños de prueba y su verificación en tiempo constante. Como la verificación de pruebas en L1 constituye el mayor coste a la hora de operar un ZK-rollup, los L2 utilizan ZK-SNARKs para generar pruebas que se pueden verificar de forma rápida y económica en la red principal.

**ZK-STARK**

Al igual que los ZK-SNARK, los ZK-STARK demuestran la validez del cálculo fuera de la cadena sin revelar las entradas. Sin embargo, los ZK-STARK se consideran una mejora de los ZK-SNARK debido a su escalabilidad y transparencia.

Los ZK-STARK son «transparentes», ya que pueden funcionar sin la configuración de confianza de una cadena de referencia común (CRS). En su lugar, los ZK-STARK se basan en la aleatoriedad verificable públicamente para establecer parámetros para generar y verificar pruebas.

Los ZK-STARK también proporcionan más escalabilidad, ya que el tiempo necesario para probar y verificar las pruebas de validez aumenta _cuasilíneamente_ en relación con la complejidad del cálculo subyacente. Con ZK-SNARK, los tiempos de prueba y verificación escalan _linealmente_ en relación con el tamaño del cálculo subyacente. Esto significa que los ZK-STARK requieren menos tiempo que los ZK-SNARK para probar y verificar cuando se trata de grandes conjuntos de datos, lo que los hace útiles para aplicaciones de gran volumen.

Los ZK-STARK también son seguros contra los ordenadores cuánticos, mientras que se cree que la criptografía de curva elíptica (ECC) utilizada en los ZK-SNARK es susceptible a los ataques de computación cuántica. La desventaja de los ZK-STARK es que producen unos tamaños de prueba más grandes que son más caros de verificar en Ethereum.

#### ¿Cómo funcionan las pruebas de validez en los ZK-rollups? {#validity-proofs-in-zk-rollups}

##### Generación de pruebas

Antes de aceptar transacciones, el operador realizará las comprobaciones habituales. Esto incluye confirmar que:

- Las cuentas del remitente y del receptor son parte del árbol de estado.
- El remitente tiene fondos suficientes para procesar la transacción.
- La transacción es correcta y coincide con la clave pública del remitente en el rollup.
- El nonce del remitente es correcto, etc.

Una vez que el nodo ZK-rollup tiene suficientes transacciones, las añade en un lote y compila las entradas para que el circuito de prueba se compile en una breve prueba de ZK. Esto incluye:

- Una raíz de árbol de Merkle que comprende todas las transacciones del lote.
- Pruebas de Merkle para transacciones que demuestren su inclusión en el lote.
- Pruebas de Merkle para cada par remitente-receptor en las transacciones para demostrar que esas cuentas son parte del árbol del estado del rollup.
- Un conjunto de raíces de estado intermedio, derivadas de la actualización de la raíz de estado después de aplicar actualizaciones de estado para cada transacción (es decir, disminución de las cuentas de remitente y aumento de las cuentas de destinatario).

El circuito de prueba calcula la prueba de validez «en bucle» sobre cada transacción y realiza las mismas comprobaciones que el operador completó antes de procesar la transacción. En primer lugar, verifica que la cuenta del remitente sea parte de la raíz de estado existente utilizando la prueba de Merkle proporcionada. Luego reduce el saldo del remitente, aumenta su nonce, hace un hash de los datos actualizados de la cuenta y los combina con la prueba de Merkle para generar una nueva raíz de Merkle.

Esta raíz de Merkle refleja el único cambio en el estado del ZK-rollup: un cambio en el equilibrio y el nonce del remitente. Esto es posible porque la prueba de Merkle utilizada para probar la existencia de la cuenta se utiliza para derivar la nueva raíz de estado.

El circuito de prueba realiza el mismo proceso en la cuenta del receptor. Comprueba si la cuenta del receptor existe bajo la raíz de estado intermedio (utilizando la prueba de Merkle), aumenta su saldo, repite los datos de la cuenta y los combina con la prueba de Merkle para generar una nueva raíz de estado.

El proceso se repite para cada transacción; cada «bucle» crea una nueva raíz de estado al actualizar la cuenta del remitente y una nueva raíz posterior al actualizar la cuenta del receptor. Tal y como se ha explicado, cada actualización de la raíz de estado representa una parte del cambio del árbol de estado del rollup.

El circuito de prueba ZK se repite en todo el lote de transacciones, verificando la secuencia de actualizaciones que dan como resultado una raíz de estado final después de que se ejecute la última transacción. La última raíz de Merkle calculada se convierte en la raíz de estado canónica más reciente del ZK-rollup.

##### Verificación de la prueba

Después de que el circuito de prueba verifique la exactitud de las actualizaciones de estado, el operador L2 presenta la prueba de validez calculada al contrato de verificación en L1. El circuito de verificación del contrato verifica la validez de la prueba y también comprueba las entradas públicas que forman parte de la prueba:

- **Raíz de preestado**: La antigua raíz de estado del ZK-rollup (es decir, antes de que se ejecutaran las transacciones por lotes), que refleja el último estado válido conocido de la cadena L2.

- **Raíz de posestado**: La nueva raíz de estado de ZK-rollup (es decir, después de la ejecución de transacciones por lotes), que refleja el estado más reciente de la cadena L2. La raíz posterior al estado es la raíz final derivada después de aplicar actualizaciones de estado en el circuito de prueba.

- **Raíz del lote**: La raíz de Merkle del lote, derivada de _merklizing_ transacciones en el lote y el hash de la raíz del árbol.

- **Entradas de transacción**: Datos asociados con las transacciones ejecutadas como parte del lote enviado.

Si la prueba satisface el circuito (es decir, es válida), significa que existe una secuencia de transacciones válidas que hacen la transición del rollup del estado anterior (criptada criptográficamente por la raíz preestado) a un nuevo estado (criptada criptográficamente por la raíz posterior al estado). Si la raíz de preestado coincide con la raíz almacenada en el contrato de rollup, y la prueba es válida, el contrato de rollup toma la raíz de posestado de la prueba y actualiza su árbol de estado para reflejar el estado cambiado del rollup.

### Entradas y salidas {#entries-and-exits}

Los usuarios entran en el ZK-rollup depositando tókenes en el contrato del rollup desplegado en la cadena L1. Esta transacción se pone en la cola, ya que solo los operadores pueden enviar transacciones al contrato de rollup.

Si la cola de depósitos pendientes comienza a llenarse, el operador de ZK-rollup tomará las transacciones de depósito y las enviará al contrato de rollup. Una vez que los fondos del usuario estén en el rollup, puede comenzar a realizar transacciones enviándolas al operador para que las procese. Los usuarios pueden verificar los saldos en el rollup haciendo hash de los datos de su cuenta, enviando el hash al contrato del rollup y proporcionando una prueba de Merkle para verificar con la raíz del estado actual.

Una retirada de un ZK-rollup a L1 es sencillo. El usuario inicia la transacción de salida enviando sus activos en el rollup a una cuenta específica para que se quemen. Si el operador incluye la transacción en el siguiente lote, el usuario puede enviar una solicitud de retirada al contrato en cadena. Esta solicitud de retirada incluirá lo siguiente:

- Prueba de Merkle que demuestra la inclusión de la transacción del usuario en la cuenta de quema en un lote de transacciones

- Datos de la transacción

- Raíz de lote

- Dirección L1 para recibir fondos depositados

El contrato rollup hace un hash de los datos de la transacción, comprueba si la raíz del lote existe y utiliza la prueba de Merkle para comprobar si el hash de la transacción es parte de la raíz del lote. Después, el contrato ejecuta la transacción de salida y envía los fondos a la dirección elegida por el usuario en L1.

## ZK-rollups y compatibilidad con EVM {#zk-rollups-and-evm-compatibility}

A diferencia de los rollups optimistas, los ZK-rollups no son fácilmente compatibles con la [Máquina Virtual Ethereum (EVM)](/developers/docs/evm/). Es más difícil demostrar el cálculo EVM de propósito general en circuitos y requiere más recursos que demostrar cálculos sencillos (como la transferencia de tókenes descrita anteriormente).

Sin embargo, [los avances en la tecnología de conocimiento cero](https://hackmd.io/@yezhang/S1_KMMbGt#Why-possible-now) están desperdiciando un renovado interés en envolver el cálculo EVM en pruebas de conocimiento cero. Estos esfuerzos están orientados a crear una implementación de EVM de conocimiento cero (zkEVM) que pueda verificar de manera eficiente la corrección de la ejecución del programa. Un zkEVM recrea los códigos de operación EVM existentes para la prueba/verificación en los circuitos, lo que permite ejecutar contratos inteligentes.

Al igual que el EVM, zkEVM transita entre estados después de que se realice el cálculo en algunas entradas. La diferencia es que el zkEVM también crea pruebas de conocimiento cero para verificar la corrección de cada paso de la ejecución del programa. Las pruebas de validez podrían verificar la exactitud de las operaciones que tocan el estado de la máquina virtual (memoría, pila, almacenamiento) y el cálculo en sí (es decir, ¿la operación utilizó los códigos de operación correctos y los ejecutó correctamente?).

Se espera que la introducción de los ZK-rollups compatibles con EVM ayude a los desarrolladores a aprovechar las garantías de escalabilidad y seguridad de las pruebas de conocimiento cero. Lo que es más importante, la compatibilidad con la infraestructura nativa de Ethereum significa que los desarrolladores pueden crear dapps compatibles con ZK utilizando herramientas e idiomas familiares (y probados en la práctica).

## ¿Cómo funcionan las tarifas de ZK-rollup? {#how-do-zk-rollup-fees-work}

La cantidad que los usuarios pagan por las transacciones en los ZK-rollups depende de la tarifa de gas, al igual que en la red principal de Ethereum. Sin embargo, las tarifas de gas funcionan de manera diferente en L2 y están influidas por los siguientes costes:

1. **Escritura de estado**: Hay un costo fijo por escribir al estado de Ethereum (es decir, enviar una transacción en la cadena de bloques de Ethereum). Los ZK-rollups reducen este coste al agrupar las transacciones y distribuir los costes fijos entre múltiples usuarios.

2. **Publicación de datos**: los ZK-rollups publican datos de estado para cada transacción a Ethereum como `calldata`. Los costes de `calldata` se rigen actualmente por [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), que estipula un coste de 16 de gas para bytes distintos de cero y 4 de gas para cero bytes de `calldata`, respectivamente. El coste pagado en cada transacción está influenciado por la cantidad de `calldata` que deben publicarse en la cadena para ello.

3. **Tarifas del operador de Capa 2**: Esta es la cantidad pagada al operador de rollup como compensación por los costos computacionales incurridos en el procesamiento de transacciones, al igual que las [tarifas de prioridad de transacción (propinas)](/developers/docs/gas/#how-are-gas-fees-calculated) en la Red principal de Ethereum.

4. **Generación y verificación de pruebas**: Los operadores de ZK-rollup deben producir pruebas de validez para los lotes de transacciones, lo que requiere muchos recursos. Verificar las pruebas de conocimiento cero en la red principal también cuesta gas (~ 500.000 gas).

Además de las transacciones por lotes, los ZK-rollups reducen las tarifas para los usuarios al comprimir los datos de las transacciones. Puede [ver una visión general en tiempo real](https://l2fees.info/) de lo que cuesta usar los ZK-rollups en Ethereum.

## ¿Cómo se escalan los ZK-rollups a Ethereum? {#scaling-ethereum-with-zk-rollups}

### Compresión de datos de transacción {#transaction-data-compression}

Los ZK-rollups amplían el rendimiento en la capa base de Ethereum tomando el cálculo fuera de la cadena, aunque el verdadero impulso para la escalabilidad proviene de la compresión de los datos de las transacciones. El [tamaño del bloque](/developers/docs/blocks/#block-size) de Ethereum limita los datos que cada bloque puede contener y, por extensión, el número de transacciones procesadas por bloque. Al comprimir los datos relacionados con las transacciones, los ZK-rollups aumentan significativamente el número de transacciones procesadas por bloque.

Los ZK-rollups pueden comprimir los datos de las transacciones mejor que los rollups optimistas, ya que no tienen que publicar todos los datos necesarios para validar cada transacción. Solo tienen que publicar los datos mínimos necesarios para reconstruir el último estado de las cuentas y los saldos en la lista acumulada.

### Pruebas recursivas {#recursive-proofs}

Una ventaja de las pruebas de conocimiento cero es que las pruebas pueden verificar otras pruebas. Por ejemplo, un solo ZK-SNARK puede verificar otros ZK-SNARK. Tales «pruebas de prueba» se llaman pruebas recursivas y aumentan drásticamente el rendimiento en los ZK-rollups.

Actualmente, las pruebas de validez se generan bloque por bloque y se envían al contrato L1 para su verificación. Sin embargo, la verificación de las pruebas de un solo bloque limita el rendimiento que pueden lograr los ZK-rollups, ya que solo se puede finalizar un bloque cuando el operador presenta una prueba.

Sin embargo, las pruebas recursivas permiten finalizar varios bloques con una prueba de validez. Esto se debe a que el circuito de prueba agrega recursivamente múltiples pruebas de bloque hasta que se crea una prueba final. El operador de L2 presenta esta prueba recursiva, y si el contrato la acepta, todos los bloques relevantes se finalizarán al instante. Con las pruebas recursivas, aumenta el número de transacciones de ZK-rollup que se pueden finalizar en Ethereum a intervalos.

### Pros y contras de los ZK-rollups {#zk-rollups-pros-and-cons}

| Ventajas                                                                                                                                                                                                                    | Desventajas                                                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Las pruebas de validez garantizan la exactitud de las transacciones fuera de la cadena y evitan que los operadores ejecuten transiciones de estado no válidas.                                                              | El coste asociado con el cálculo y la verificación de las pruebas de validez es sustancial y puede aumentar las tarifas para los usuarios de rollup.                                                                            |
| Ofrece una finalización de transacción más rápida, ya que las actualizaciones del estado se aprueban una vez que se verifican las pruebas de validez en L1.                                                                 | Construir ZK-rollups compatibles con EVM es difícil debido a la complejidad de la tecnología de conocimiento cero.                                                                                                              |
| Se basa en mecanismos criptográficos sin confianza para la seguridad, no en la honestidad de los actores incentivados como con [rollups optimistas](/developers/docs/scaling/optimistic-rollups/#optimistic-pros-and-cons). | La producción de pruebas de validez requiere hardware especializado, que puede fomentar el control centralizado de la cadena por parte de algunas partes.                                                                       |
| Almacena los datos necesarios para recuperar el estado fuera de la cadena en L1, lo que garantiza la seguridad, la resistencia a la censura y la descentralización.                                                         | Los operadores centralizados (secuenciadores) pueden influir en el orden de las transacciones.                                                                                                                                  |
| Los usuarios se benefician de una mayor eficiencia de capital y pueden retirar fondos de L2 sin demoras.                                                                                                                    | Los requisitos de hardware pueden reducir el número de participantes que pueden obligar a la cadena a progresar, aumentando el riesgo de que los operadores maliciosos congelen el estado del rollup y censuren a los usuarios. |
| No depende de las suposiciones de vitalidad y los usuarios no tienen que validar la cadena para proteger sus fondos.                                                                                                        | Algunos sistemas de prueba (por ejemplo, ZK-SNARK) requieren una configuración de confianza que, si se maneja mal, podría comprometer el modelo de seguridad de un ZK-rollup.                                                   |
| Una mejor compresión de datos puede ayudar a reducir los costes de publicación de `calldata` en Ethereum y minimizar las tarifas de aumento de datos para los usuarios.                                                     |                                                                                                                                                                                                                                 |

### Explicación visual de los ZK-rollups {#zk-video}

Vea una explicación de Finematics de los ZK-rollups:

<YouTube id="7pWxCklcNsU" start="406" />

## ¿Quién está trabajando en un zkEVM? {#zkevm-projects}

Los proyectos que trabajan en zkEVM incluyen:

- **[zkEVM](https://github.com/privacy-scaling-explorations/zkevm-specs)**_: zkEVM es un proyecto financiado por la Ethereum Foundation para desarrollar un rollup de ZK compatible con la EVM y un mecanismo para generar pruebas de validez para los bloques de Ethereum. _

- **[Polygon zkEVM](https://polygon.technology/solutions/polygon-zkevm)**: _es un ZK Rollup descentralizado en la red principal de Ethereum que trabaja en una máquina virtual Ethereum de conocimiento cero (zkEVM) que ejecuta transacciones de Ethereum de una manera transparente, incluidos contratos inteligentes con validaciones a prueba de conocimiento cero. _

- **[Scroll](https://scroll.io/blog/zkEVM)**: _Scroll es una empresa impulsada por la tecnología que trabaja en la construcción de una solución nativa zkEVM Layer 2 para Ethereum. _

- **[Taiko](https://taiko.xyz)**: _Taiko es un complemento ZK descentralizado y equivalente a Ethereum (un [Tipo 1 ZK-EVM](https://vitalik.eth.limo/general/2022/08/04/zkevm.html)). _

- **[ZKsync](https://docs.zksync.io/)**_: ZKsync Era es un rollup de ZK compatible con la EVM creado por Matter Labs, impulsado por su propio zkEVM. _

- **[Starknet](https://starkware.co/starknet/)**_: StarkNet es una solución de escalabilidad de capa 2 compatible con la EVM creada por StarkWare. _

- **[Morph](https://www.morphl2.io/)**_: Morph es una solución de escalado de rollups híbrida que utiliza la prueba de ZK para abordar el problema del desafío del estado de la capa 2. _

## Bibliografía para profundizar sobre los ZK-rollups {#further-reading-on-zk-rollups}

- [¿Qué son los rollups de conocimiento cero (ZK)?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [¿Qué son las pruebas de conocimiento cero (ZK)?](https://alchemy.com/blog/zero-knowledge-rollups)
- [STARK frente a SNARK](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [¿Qué es un zkEVM?](https://www.alchemy.com/overviews/zkevm)
- [Tipos ZK-EVM: equivalente a Ethereum, equivalente a EVM, Tipo 1, Tipo 4 y otras palabras de moda crípticas](https://taiko.mirror.xyz/j6KgY8zbGTlTnHRFGW6ZLVPuT0IV0_KmgowgStpA0K4)
- [Introducción a zkEVM](https://hackmd.io/@yezhang/S1_KMMbGt)
- [Recursos increíbles de zkEVM](https://github.com/LuozhuZhang/awesome-zkevm)
- [ZK-SNARKS bajo el capó](https://vitalik.eth.limo/general/2017/02/01/zk_snarks.html)
- [¿Cómo son posibles los SNARK?](https://vitalik.eth.limo/general/2021/01/26/snarks.html)
