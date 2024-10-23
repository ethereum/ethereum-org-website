---
title: Exploradores de bloques
description: Una introducción sobre los exploradores de bloques, tu portal en el mundo de los datos de la blockchain, en el que puedes consultar información sobre las transacciones, las cuentas, los contratos, etc.
lang: es
sidebarDepth: 3
---

Los exploradores de bloques son tu portal de acceso a los datos de Ethereum. Puede usarlos para ver datos en tiempo real sobre bloques, transacciones, validadores, cuentas y otras actividades en la cadena.

## Requisitos previos {#prerequisites}

Es necesario que comprenda los conceptos básicos de Ethereum para poder entender los datos que le ofrece un explorador de bloques. Empiece con [una introducción a Ethereum](/developers/docs/intro-to-ethereum/).

## Servicios {#services}

- [Etherscan:](https://etherscan.io/) _También disponible en chino, coreano, ruso y japonés_
- [3xpl](https://3xpl.com/ethereum)
- [Beaconcha.in](https://beaconcha.in/)
- [Blockchair:](https://blockchair.com/ethereum) _También disponible en inglés, francés, italiano, neerlandés, portugués, ruso, chino y farsi_
- [Blockscout](https://eth.blockscout.com/)
- [Chainlens](https://www.chainlens.com/)
- [Explorador de bloques DexGuru](https://ethereum.dex.guru/)
- [Etherchain](https://www.etherchain.org/)
- [Ethernow](https://www.ethernow.xyz/)
- [Ethplorer:](https://ethplorer.io/) _También disponible en chino, español, francés, turco, ruso, coreano y vietnamita_
- [EthVM](https://www.ethvm.com/)
- [OKLink](https://www.oklink.com/eth)
- [Rantom](https://rantom.app/)

## Herramientas de código abierto {#open-source-tools}

- [Otterscan](https://otterscan.io/)
- [lazy-etherscan](https://github.com/woxjro/lazy-etherscan)

## Datos {#data}

El diseño de Ethereum es transparente para que todo su contenido sea verificable. Los exploradores de bloques proporcionan una interfaz para obtener esta información. Y, en caso de que necesites información, esto es así tanto para la red principal de Ethereum como para las redes de pruebas. Los datos se dividen en datos de ejecución y datos de consenso. Los datos de ejecución se refieren a las transacciones que fueron ejecutadas en un bloque específico. Los datos de consenso se refieren a los propios bloques y a los validadores que los propusieron.

A continuación se incluye un resumen de los tipos de datos que puedes obtener en el explorador de bloques.

### Datos de ejecución {#execution-data}

Nuevos bloques se agregan cada 12 segundos a Ethereum (a menos que quien propone el bloque pierda su turno), por ende de forma constante se va agregando un flojo de datos a los exploradores de bloques. Los bloques contienen mucha información importante que puede resultarte útil:

**Datos estándar**

- Altura del bloque: El número de bloque y altura de la cadena de bloques (en bloques) en la creación del bloque actual
- Marca de tiempo: Momento en el cual fue propuesto el bloque
- Transacciones: El número de transacciones incluidas en el bloque
- Destinatario de comisión: La dirección que recibió las propinas de gas por las transacciones
- Recompensa del bloque: La cantidad de ETH conseguida por el validador que propuso el bloque
- Tamaño: El tamaño de los datos en el bloque (representados en bytes)
- Gas usado: Las unidades totales de gas usadas por las transacciones en el bloque
- Límite de gas: El límite total de gas establecido por las transacciones en el bloque
- Tarifa base por gas: El multiplicador mínimo de gas requerido para que una transacción sea incluida en el bloque
- Comisiones quemadas: Cuánto ETH se quema en el bloque
- Datos adicionales: Cualquier dato adicional que el constructor haya incluido en el bloque

**Datos avanzados**

- Hash: El hash criptografico que representa el encabezado del bloque (el identificador único del bloque)
- Hash principal: El hash del bloque anterior al bloque actual
- StateRoot: El hash raíz del Merkle trie que guarda el estado entero del sistema

### Gas {#gas}

Los exploradores de bloques no solo le ofrecerán datos sobre el uso de gas en las transacciones y los bloques, sino que también le proporcionarán información sobre los precios del gas actuales de la red. Esto le servirá de ayuda para comprender el uso de la red, enviar transacciones seguras y no realizar un gasto demasiado alto de gas. Busque API que lo ayuden a obtener esta información en la interfaz de sus productos. Los datos específicos del gas incluyen:

- Unidades estimadas de gas necesarias para realizar una transacción segura pero lenta (+ duración y precio estimados)
- Unidades estimadas de gas necesarias para realizar una transacción normal (+ duración y precio estimados)
- Unidades estimadas de gas necesarias para realizar una transacción rápida (+ duración y precio estimados)
- Tiempo de confirmación medio basado en el precio del gas
- Contratos que consumen gas: en otras palabras, productos populares muy utilizados en la red
- Cuentas que usan gas: en otras palabras, usuarios frecuentes de la red

### Transacciones {#transactions}

Los exploradores de bloques se han convertido en un lugar común para que las personas puedan seguir el progreso de sus transacciones. Esto se debe a que el nivel de detalle que puede obtener proporciona certezas adicionales. Los datos de las transacciones incluyen:

**Datos estándar**

- Hash de la transacción: El hash generado cuando la transacción es enviada
- Estado: El indicador que señala si la transacción está pendiente, falló o fue completada
- Bloque: El bloque en el cual la transacción fue incluida
- Marca de tiempo: El momento en el que se incluyó una transacción en un bloque propuesto por un validador
- Desde: La dirección de la cuenta que envió la transacción
- Hacia: La dirección del receptor o contrato inteligente con el que interactúa la transacción
- Tokens transferidos: Todos los tokens que fueron transferidos como parte de la transacción
- Valor: El valor total de ETH transferidos
- Tarifa de transacción: La cantidad pagada al validador para procesar la transacción (calculada por el precio del gas\*gas utilizado)

**Datos avanzados**

- Límite de gas: El número máximo de unidades de gas que esta transaccion puede consumir
- Gas usado: La cantidad real de unidades de gas que consumió la transacción
- Precio del gas: El precio establecido por unidad de gas
- Nonce: El número de transacción de la dirección `from` (tenga en cuenta que empieza en 0, por ende, un nonce de `100` actualmente sería la transacción número 101 enviada por esta cuenta
- Datos de entrada: Cualquier información extra requerida por la transacción

### Cuentas {#accounts}

Se puede acceder a una gran cantidad de datos sobre las cuentas. Por eso, se suele recomendar utilizar varias cuentas para que sus activos y valores no se puedan rastrear con facilidad. Además, se están desarrollando varias soluciones para que las transacciones y la actividad de la cuenta tengan mayor privacidad. De todos modos, estos son los datos disponibles sobre las cuentas:

**Cuentas de usuario**

- Dirección de la cuenta: La dirección pública que puede usar para enviar fondos
- Saldo de ETH: La cantidad de ETH asociada a esa cuenta
- Valor total ETH: El valor total de ETH
- Tokens: Los tokens asociados a la cuenta con su valor
- Historial de transacciones: La lista de todas las transacciones donde la cuenta fue el enviador o receptor

**Contratos inteligentes**

Las cuentas de contratos inteligentes tienen todos los datos que tendrá una cuenta de usuario, pero algunos exploradores de bloques también mostrarán información sobre el código. Los ejemplos incluyen:

- Creador del contrato: La dirección que implementó el contrato en la red principal
- Transacción de creación: La transacción que incluyó la implementación en la red principal
- Código fuente: El código escrito en Solidity o Vypee del contrato inteligente
- ABI del contracto: La Interfaz Binaria de la Aplicación del contrato; las llamadas que el contrato hace y los datos que recibe
- Código de creación de contrato: El bytecode compilado del contrato inteligente (creado cuando compila un contrato inteligente escrito en Solidity o Viper, etc.)
- Eventos del contrato: Historial de los métodos invocados en el contrato inteligente; básicamente una forma de ver cómo el contrato está siendo usado y con qué frecuencia

### Tokens {#tokens}

Los tokens son un tipo de contrato, por lo que van a tener datos similares a un contrato inteligente. Sin embargo, como tienen valor y se pueden comercializar, tienen puntos de datos adicionales:

- Tipo: Ya sean ERC-20, ERC-721 o cualquier otro tipo de estándar
- Precio: Si son ERC-20, tendrán un valor de mercado
- Capitalización de mercado: Si son ERC-20 van a tener una capitalización de mercado (precio\*suministro total)
- Suministro total: El número total de tokens en circulación
- Poseedores: El número de direcciónes que poseen el token
- Transferencia: El número de veces que el token ha sido transferido entre cuentas
- Historial de transacciones: El historial de todas las transacciones que incluyen el token
- Dirección del contrato: La dirección del token que fue implementado en la red principal
- Decimales: Los tokens ERC-20 son divisibles y tienen decimales

### Red {#network}

Algunos datos de bloque refieren a la salud de Ethereum de manera más integral.

- Total de transacciones: El número de transacciones desde que Ethereum fue creado
- Transacciones por segundo: El número de transacciones procesables en un segundo
- Precio de ETH: El valor actual de 1 ETH
- Suministro total de ETH: Número de ETH en circulación; recordemos que se crean nuevos ETH con la creación de cada bloque en forma de recompensa de bloques
- Capitalización de mercado: Precio\*Suministro

## Datos de la capa de consenso {#consensus-layer-data}

### Epoch {#epoch}

Por razones de seguridad, se crean comités de validadores aleatorizados al final de cada época (epoch) (cada 6,4 minutos). Los datos de época incluyen:

- Número de época
- Estado finalizado: Indica si se finalizó la época (Sí/No)
- Hora: Momento en que terminó la época
- Atestaciones: El número de atestaciones en la época (votos por bloques dentro de las ranuras)
- Depósitos: El número de depósitos de ETH incluidos en la época (los validadores tienen que apostar ETH para convertirse en validadores)
- Slashings: El número de penalizaciones a quienes proponen bloques o atestadores
- Participación de votos: El número de ETH apostado usado para certificar bloques
- Validadores: El número de validadores activos para la época
- Saldo promedio de validadores: El saldo promedio de los validadores activos
- Ranuras (slots): Número de slots includos en la época (las ranuras incluyen un bloque válido)

### Ranura {#slot}

Las ranuras son oportunidades para crear bloques; los datos disponibles para cada ranura incluyen:

- Época: La época en que la ranura es válida
- Número de ranura
- Estado: El estado de la ranura (propuesto/perdido)
- Hora: La marca de tiempo de la ranura
- Proponente: El validador que propuso el bloque en la ranura
- Raíz de bloque: La hash-tree-root del BeaconBlockHash
- Raíz principal: El hash del bloque anterior
- Raíz de estado: La hash-tree-root del BeaconState
- Firma
- Revelación de Randao
- Graffiti: Quien propone el bloque puede incluir un mensaje de 32 bytes en su propuesta de bloque
- Datos de ejecución
  - Hash del bloque
  - Cantidad de depósitos
  - Raíz de depósito
- Atestaciones: Número de atestaciones para el bloque en esta ranura
- Depósitos: Número de depósitos durante esta ranura
- Salidas voluntarias: El número de validadores que se retiraron durante la ranura
- Slashings: El número de penalizaciones a quienes proponen bloques o atestadores
- Votos: Los validadores que votaron por el bloque en esta ranura

### Bloques {#blocks-1}

La prueba de participación divide el tiempo entre ranuras y épocas. Esto significa datos nuevos.

- Proponente: El validador que fue algorítmicamente elegido para proponer el bloque nuevo
- Época: La época en la que el bloque fue propuesto
- Ranura: La ranura en la cual el bloque fue propuesto
- Atestaciones: El número de atestaciones incluidas en la ranura; las atestaciones son como votos que indican que el bloque está listo para ir hacia la Cadena de Baliza

### Validadores {#validators}

Los validadores son los responsables de proponer bloques y certificarlos dentro de las ranuras.

- Número de validador: El número único que representa al validador
- Saldo actual: El balance del validador incluyendo las recompensas
- Saldo efectivo: El saldo del validador que se usa para el staking
- Ingresos: Las recompensas o penalizaciones recibidas por el validador
- Estado: Si el validador está actualmente online y activo, o no
- Efectividad de atestaciones: El tiempo promedio que toman las atestaciones del validador para ser incluídas en la cadena
- Elegibilidad para activación: Fecha (y época) en que el validador estará disponible para poder validar
- Activo desde: Fecha (y época) en que el validador comenzó a estar activo
- Bloques propuestos: Los bloques que el validador ha propuesto
- Atestaciones: El número de atestaciones que el validador ha proporcionado
- Depósitos: Dirección desde, hash de transacción, número de bloque, marca de tiempo, cantidad y estado del depósito de staking hecho por el validador

### Atestaciones {#attestations}

Las atestaciones (o certificaciones) son votos positivos ("sí") para incluir bloques en la cadena. Sus datos están relacionados con un registro de la certificación y con los validadores que la realizaron.

- Ranura: La ranura en la que tuvo lugar la atestación
- Índice del comité: El índice del comité en la ranura dada
- Bits de agregación: Representan las atestaciones agregadas por todos los validadores participantes en la atestación
- Validadores: Los validadores que propusieron las atestaciones
- Raíz del bloque de Baliza: Apunta al bloque al cual los validadores están atestando
- Fuente: Apunta a la época justificada más reciente
- Target: Apunta al límite de época más reciente
- Firma

### Red {#network-1}

Los datos de nivel superior de la capa de consenso incluyen lo siguiente:

- Época actual
- Ranura actual
- Validadores activos: Número de validadores activos
- Validadores pendientes: Número de validadores esperando ser activos
- ETH apostado: Cantidad de ETH en staking en la red
- Saldo promedio: Saldo promedio de ETH de los validadores

## Exploradores de bloques {#block-explorers}

- [Etherscan](https://etherscan.io/): Un explorador de bloques que puede usar para buscar datos de la red principal de Ethereum y la red de pruebas Goerli
- [3xpl](https://3xpl.com/ethereum): Un explorador de Ethereum de código abierto sin anuncios que permite descargar sus conjuntos de datos
- [Beaconcha.in](https://beaconcha.in/): Un explorador de bloques de código abierto para la red principal de Ethereum y la red de pruebas Goerli
- [Blockchair](https://blockchair.com/ethereum): El explorador de Ethereum más privado. También para clasificación y filtrado de datos (mempool)
- [Etherchain](https://www.etherchain.org/): Un explorador de bloques para la red principal de Ethereum
- [Ethplore](https://ethplorer.io/): Un explorador de bloques con enfoque en tokens para la red principal de Ethereum y la red de pruebas Kovan
- [Rantom](https://rantom.app/): Un visor de código abierto y fácil de usar de información detallada de transaccinoes DeFI y NFT
- [Ethernow](https://www.ethernow.xyz/): Un explorador de transacciones en tiempo real que le permite ver la capa previa a la cadena de la Red principal de Ethereum

## Para seguir leyendo {#further-reading}

_¿Conoce algún recurso comunitario que le haya sido de ayuda? Edite la página y añádalo._

## Temas relacionados {#related-topics}

- [Transacciones](/developers/docs/transactions/)
- [Cuentas](/developers/docs/accounts/)
- [Redes](/developers/docs/networks/)
