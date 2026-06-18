---
title: Exploradores de bloques
description: Una introducción a los exploradores de bloques, su portal al mundo de los datos de la cadena de bloques, donde puede consultar información sobre transacciones, cuentas, contratos y más.
lang: es
sidebarDepth: 3
---

Los exploradores de bloques son su portal a los datos de Ethereum. Puede usarlos para ver datos en tiempo real sobre bloques, transacciones, validadores, cuentas y otra actividad en cadena.

## Requisitos previos {#prerequisites}

Debe comprender los conceptos básicos de Ethereum para poder dar sentido a los datos que le proporciona un explorador de bloques. Comience con [una introducción a Ethereum](/developers/docs/intro-to-ethereum/).

## Herramientas de código abierto {#open-source-tools}

- [3xpl](https://3xpl.com/ethereum): un explorador de Ethereum sin anuncios que permite descargar sus conjuntos de datos (núcleo abierto: los módulos principales son de código abierto)
- [Beaconcha.in](https://beaconcha.in/)
- [Blockscout](https://eth.blockscout.com/)
- [lazy-etherscan](https://github.com/woxjro/lazy-etherscan)
- [Otterscan](https://otterscan.io/)

## Servicios {#services}

- [Blockchair](https://blockchair.com/ethereum): explorador privado de Ethereum. También para ordenar y filtrar datos (mempool). Disponible en español, francés, italiano, holandés, portugués, ruso, chino y farsi.
- [Chainlens](https://www.chainlens.com/)
- [Explorador de bloques DexGuru](https://ethereum.dex.guru/)
- [Etherchain](https://www.etherchain.org/)
- [Etherscan](https://etherscan.io/): también disponible en chino, coreano, ruso y japonés.
- [Ethplorer](https://ethplorer.io/): un explorador de bloques centrado en tokens. También disponible en chino, español, francés, turco, ruso, coreano y vietnamita.
- [Ethseer](https://ethseer.io)
- [EthVM](https://www.ethvm.com/)
- [OKLink](https://www.oklink.com/eth)

## Datos {#data}

Ethereum es transparente por diseño, por lo que todo es verificable. Los exploradores de bloques proporcionan una interfaz para obtener esta información. Y esto es tanto para la Red principal de Ethereum como para las redes de prueba, en caso de que necesite esos datos. Los datos se dividen en datos de ejecución y datos de consenso. Los datos de ejecución se refieren a las transacciones que se han ejecutado en un bloque específico. Los datos de consenso se refieren a los bloques en sí y a los validadores que los propusieron.

Aquí hay un resumen de los tipos de datos que puede obtener de un explorador de bloques.

### Datos de ejecución {#execution-data}

Se añaden nuevos bloques a Ethereum cada 12 segundos (a menos que un proponente de bloque pierda su turno), por lo que se añade un flujo casi constante de datos a los exploradores de bloques. Los bloques contienen muchos datos importantes que pueden resultarle útiles:

**Datos estándar**

- Altura del bloque: el número de bloque y la longitud de la cadena de bloques (en bloques) en el momento de la creación del bloque actual.
- Marca de tiempo: la hora a la que se propuso un bloque.
- Transacciones: el número de transacciones incluidas dentro del bloque.
- Destinatario de la tarifa: la dirección que recibió las propinas de las tarifas de gas de las transacciones.
- Recompensa de bloque: la cantidad de ETH otorgada al validador que propuso el bloque.
- Tamaño: el tamaño de los datos dentro del bloque (medido en bytes).
- Gas utilizado: el total de unidades de gas utilizadas por las transacciones en el bloque.
- Límite de gas: los límites de gas totales establecidos por las transacciones en el bloque.
- Tarifa base por gas: el multiplicador mínimo requerido para que una transacción se incluya en un bloque.
- Tarifas quemadas: cuánto ETH se quema en el bloque.
- Datos adicionales: cualquier dato adicional que el constructor haya incluido en el bloque.

**Datos avanzados**

- Hash: el hash criptográfico que representa el encabezado del bloque (el identificador único del bloque).
- Hash principal: el hash del bloque que precedió al bloque actual.
- StateRoot: el hash raíz del trie de Merkle que almacena todo el estado del sistema.

### Gas {#gas}

Los exploradores de bloques no solo le darán datos sobre el uso de gas en transacciones y bloques, sino que algunos le darán información sobre los precios del gas actuales de la red. Esto le ayudará a comprender el uso de la red, enviar transacciones seguras y no gastar de más en gas. Busque API que puedan ayudarle a obtener esta información en la interfaz de su producto. Los datos específicos del gas cubren:

- Unidades estimadas de gas necesarias para una transacción segura pero lenta (+ precio y duración estimados).
- Unidades estimadas de gas necesarias para una transacción promedio (+ precio y duración estimados).
- Unidades estimadas de gas necesarias para una transacción rápida (+ precio y duración estimados).
- Tiempo promedio de confirmación basado en el precio del gas.
- Contratos que están consumiendo gas; en otras palabras, productos populares que están experimentando mucho uso en la red.
- Cuentas que están gastando gas; en otras palabras, usuarios frecuentes de la red.

### Transacciones {#transactions}

Los exploradores de bloques se han convertido en un lugar común para que las personas rastreen el progreso de sus transacciones. Eso se debe a que el nivel de detalle que puede obtener proporciona una certeza adicional. Los datos de la transacción incluyen:

**Datos estándar**

- Hash de transacción: un hash generado cuando se envía la transacción.
- Estado: una indicación de si la transacción está pendiente, fallida o es un éxito.
- Bloque: el bloque en el que se ha incluido la transacción.
- Marca de tiempo: la hora a la que se incluyó una transacción en un bloque propuesto por un validador.
- De (From): la dirección de la cuenta que envió la transacción.
- Para (To): la dirección del destinatario o contrato inteligente con el que interactúa la transacción.
- Tokens transferidos: una lista de tokens que se transfirieron como parte de la transacción.
- Valor: el valor total de ETH que se transfiere.
- Tarifa de transacción: la cantidad pagada al validador para procesar la transacción (calculada por el precio del gas \* gas utilizado).

**Datos avanzados**

- Límite de gas: el número máximo de unidades de gas que esta transacción puede consumir.
- Gas utilizado: la cantidad real de unidades de gas que consumió la transacción.
- Precio del gas: el precio establecido por unidad de gas.
- Nonce: el número de transacción para la dirección `from` (tenga en cuenta que esto comienza en 0, por lo que un nonce de `100` sería en realidad la 101.ª transacción enviada por esta cuenta).
- Datos de entrada: cualquier información adicional requerida por la transacción.

### Cuentas {#accounts}

Hay muchos datos a los que puede acceder sobre una cuenta. Es por esto que a menudo se recomienda usar múltiples cuentas para que sus activos y valor no puedan ser rastreados fácilmente. También se están desarrollando algunas soluciones para hacer que las transacciones y la actividad de la cuenta sean más privadas. Pero aquí están los datos que están disponibles para las cuentas:

**Cuentas de usuario**

- Dirección de la cuenta: la dirección pública que puede usar para enviar fondos.
- Saldo de ETH: la cantidad de ETH asociada con esa cuenta.
- Valor total de ETH: el valor del ETH.
- Tokens: los tokens asociados con la cuenta y su valor.
- Historial de transacciones: una lista de todas las transacciones en las que esta cuenta fue el remitente o el destinatario.

**Contratos inteligentes**

Las cuentas de contratos inteligentes tienen todos los datos que tendrá una cuenta de usuario, pero algunos exploradores de bloques incluso mostrarán también información del código. Algunos ejemplos incluyen:

- Creador del contrato: la dirección que desplegó el contrato en la Red principal.
- Transacción de creación: la transacción que incluyó el despliegue en la Red principal.
- Código fuente: el código Solidity o Vyper del contrato inteligente.
- ABI del contrato: la interfaz binaria de aplicación del contrato (las llamadas que hace el contrato y los datos recibidos).
- Código de creación del contrato: el código de bytes compilado del contrato inteligente (creado cuando compila un contrato inteligente escrito en Solidity o Vyper, etc.).
- Eventos del contrato: un historial de los métodos llamados en el contrato inteligente (básicamente una forma de ver cómo se está utilizando el contrato y con qué frecuencia).

### Tokens {#tokens}

Los tokens son un tipo de contrato, por lo que tendrán datos similares a los de un contrato inteligente. Pero debido a que tienen valor y se pueden intercambiar, tienen puntos de datos adicionales:

- Tipo: si son un ERC-20, ERC-721 u otro estándar de token.
- Precio: si son un ERC-20, tendrán un valor de mercado actual.
- Capitalización de mercado: si son un ERC-20, tendrán una capitalización de mercado (calculada por el precio \* suministro total).
- Suministro total: el número de tokens en circulación.
- Titulares: el número de direcciones que poseen el token.
- Transferencias: el número de veces que el token se ha transferido entre cuentas.
- Historial de transacciones: un historial de todas las transacciones que incluyen el token.
- Dirección del contrato: la dirección del token que se desplegó en la Red principal.
- Decimales: los tokens ERC-20 son divisibles y tienen lugares decimales.

### Red {#network}

Algunos datos de bloques se refieren a la salud de Ethereum de manera más holística.

- Transacciones totales: el número de transacciones desde que se creó Ethereum.
- Transacciones por segundo: el número de transacciones procesables en un segundo.
- Precio de ETH: las valoraciones actuales de 1 ETH.
- Suministro total de ETH: número de ETH en circulación (recuerde que se crea nuevo ETH con la creación de cada bloque en forma de recompensas de bloque).
- Capitalización de mercado: cálculo del precio \* suministro.

## Datos de la capa de consenso {#consensus-layer-data}

### Época {#epoch}

Por razones de seguridad, se crean comités aleatorios de validadores al final de cada época (cada 6,4 minutos). Los datos de la época incluyen:

- Número de época
- Estado finalizado: si la época se ha finalizado (Sí/No).
- Hora: la hora en que terminó la época.
- Atestaciones: el número de atestaciones en la época (votos por bloques dentro de los slots).
- Depósitos: el número de depósitos de ETH incluidos en la época (los validadores deben hacer staking de ETH para convertirse en validadores).
- Recortes (slashings): número de penalizaciones otorgadas a los proponentes de bloques o atestadores.
- Participación en la votación: la cantidad de ETH en staking utilizada para atestar bloques.
- Validadores: número de validadores activos para la época.
- Saldo promedio del validador: saldo promedio para los validadores activos.
- Slots: número de slots incluidos en la época (los slots incluyen un bloque válido).

### Slot {#slot}

Los slots son oportunidades para la creación de bloques, los datos disponibles para cada slot incluyen:

- Época: la época en la que el slot es válido.
- Número de slot
- Estado: el estado del slot (Propuesto/Perdido).
- Hora: la marca de tiempo del slot.
- Proponente: el validador que propuso el bloque para el slot.
- Raíz del bloque: la raíz del árbol hash (hash-tree-root) del bloque baliza (BeaconBlock).
- Raíz principal: el hash del bloque que precedió.
- Raíz de estado: la raíz del árbol hash del estado baliza (BeaconState).
- Firma
- Revelación RANDAO
- Grafiti: un proponente de bloque puede incluir un mensaje de 32 bytes de longitud en su propuesta de bloque.
- Datos de ejecución
  - Hash del bloque
  - Recuento de depósitos
  - Raíz de depósito
- Atestaciones: número de atestaciones para el bloque en este slot.
- Depósitos: el número de depósitos durante este slot.
- Salidas voluntarias: el número de validadores que se fueron durante el slot.
- Recortes (slashings): número de penalizaciones otorgadas a los proponentes de bloques o atestadores.
- Votos: los validadores que votaron por el bloque en este slot.

### Bloques {#blocks-1}

La prueba de participación (PoS) divide el tiempo en slots y épocas. ¡Así que eso significa nuevos datos!

- Proponente: el validador que fue elegido algorítmicamente para proponer el nuevo bloque.
- Época: la época en la que se propuso el bloque.
- Slot: el slot en el que se propuso el bloque.
- Atestaciones: el número de atestaciones incluidas en el slot (las atestaciones son como votos que indican que el bloque está listo para ir a la cadena de balizas).

### Validadores {#validators}

Los validadores son responsables de proponer bloques y atestarlos dentro de los slots.

- Número de validador: número único que representa al validador.
- Saldo actual: el saldo del validador, incluidas las recompensas.
- Saldo efectivo: el saldo del validador que se utiliza para hacer staking.
- Ingresos: las recompensas o penalizaciones recibidas por el validador.
- Estado: si el validador está actualmente en línea y activo o no.
- Efectividad de la atestación: el tiempo promedio que tardan las atestaciones del validador en incluirse en la cadena.
- Elegibilidad para la activación: fecha (y época) en que el validador estuvo disponible para validar.
- Activo desde: fecha (y época) en que el validador se activó.
- Bloques propuestos: el bloque que el validador ha propuesto.
- Atestaciones: las atestaciones que el validador ha proporcionado.
- Depósitos: la dirección de origen, el hash de transacción, el número de bloque, la marca de tiempo, la cantidad y el estado del depósito de staking realizado por el validador.

### Atestaciones {#attestations}

Las atestaciones son votos afirmativos para incluir bloques en la cadena. Sus datos se relacionan con un registro de la atestación y los validadores que atestaron.

- Slot: el slot en el que tuvo lugar la atestación.
- Índice del comité: el índice del comité en el slot dado.
- Bits de agregación: representa la atestación agregada de todos los validadores participantes en la atestación.
- Validadores: los validadores que proporcionaron atestaciones.
- Raíz del bloque baliza: apunta al bloque que los validadores están atestando.
- Origen: apunta a la última época justificada.
- Destino: apunta al último límite de época.
- Firma

### Red {#network-1}

Los datos de nivel superior de la capa de consenso incluyen lo siguiente:

- Época actual
- Slot actual
- Validadores activos: número de validadores activos.
- Validadores pendientes: número de validadores que esperan ser activados.
- ETH en staking: cantidad de ETH en staking en la red.
- Saldo promedio: saldo promedio de ETH de los validadores.

## Lecturas adicionales {#further-reading}

_¿Conoce algún recurso de la comunidad que le haya ayudado? ¡Edite esta página y añádalo!_

## Temas relacionados {#related-topics}

- [Transacciones](/developers/docs/transactions/)
- [Cuentas](/developers/docs/accounts/)
- [Redes](/developers/docs/networks/)