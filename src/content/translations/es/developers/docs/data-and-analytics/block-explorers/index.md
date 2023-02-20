---
title: Exploradores de bloques
description: Una introducción sobre los exploradores de bloques, tu portal en el mundo de los datos de la blockchain, en el que puedes consultar información sobre las transacciones, las cuentas, los contratos, etc.
lang: es
sidebarDepth: 3
---

Los exploradores de bloques son tu portal de acceso a los datos de Ethereum. Puedes usarlos para ver datos de los bloques, las transacciones, loa mineros, las cuentas y otras actividades de la cadena en tiempo real.

## Requisitos previos {#prerequisites}

Es necesario que comprendas los conceptos básicos de Ethereum para poder entender los datos que te ofrece un explorador de bloques. Empieza con [una introducción a Ethereum](/developers/docs/intro-to-ethereum/).

## Servicios {#services}

- [Etherscan](https://etherscan.io/):_ También disponible en chino, coreano, ruso y japonés_
- [Etherchain](https://www.etherchain.org/)
- [Ethplorer](https://ethplorer.io/)
- [Blockchair](https://blockchair.com/ethereum):_ También disponible en español, francés, italiano, holandés, portugués, ruso, chino y farsi_
- [Blockscout](https://blockscout.com/)
- [OKLink](https://www.oklink.com/eth)

## Datos {#data}

El diseño de Ethereum es transparente para que todo su contenido sea verificable. Los exploradores de bloques proporcionan una interfaz para obtener esta información. Y, en caso de que necesites información, esto es así tanto para la red principal de Ethereum como para las redes de pruebas.

A continuación se incluye un resumen de los tipos de datos que puedes obtener en el explorador de bloques.

### Bloques {#blocks}

A Ethereum se añaden bloques nuevos aproximadamente cada 12 segundos (esto puede fluctuar). Por eso, hay un flujo de datos casi constante agregándose a los exploradores de bloques. Los bloques contienen mucha información importante que puede resultarte útil:

**Datos estándar**

- Altura del bloque: El número de bloque y la longitud de la blockchain (en bloques) durante la creación del bloque actual.
- Registro de tiempo: El tiempo durante el que un minero mina el bloque.
- Transacciones: El número de transacciones incluidas dentro del bloque.
- Minero: La dirección del minero que minó el bloque.
- Recompensa: La cantidad de ETH adjudicada al minero a cambio de agregar el bloque (la recompensa estándar es de 2 ETH + cualquier tarifa de transacción de las transacciones incluidas en el bloque).
- Dificultad: La dificultad relacionada con la minería del bloque.
- Tamaño: El tamaño de los datos que contiene el bloque (se mide en bytes).
- Gas utilizado: El total de unidades de gas que utilizan las transacciones incluidas en el bloque.
- Límite de gas: El límite total de gas establecido por las transacciones en el bloque.
- Datos extra: Cualquier dato adicional que el minero haya incluido en el bloque.

**Datos avanzados**

- Hash: El hash criptográfico que representa la cabecera del bloque (es el único identificador del bloque).
- Parent hash: El hash del bloque que precede al bloque actual.
- Sha3Uncles: El hash combinado de todos los bloque de tipo "uncle" para un determinado bloque de tipo "parent".
- StateRoot: El hash raíz del árbol Merkle, que almacena todo el estado del sistema.
- Nonce: Un valor utilizado para que el minero pueda demostrar la Prueba de trabajo de un bloque.

**Bloques de tipo "uncle"**

Los bloques de tipo "uncle" se crean cuando 2 mineros generan bloques casi al mismo tiempo; solo se puede validar un bloque por los nodos. Estos no se incluyen, pero siguen recibiendo una recompensa por el trabajo.

Los exploradores de bloques proporcionan la siguiente información acerca de los bloques de tipo "uncle":

- Un número de bloque de tipo "uncle".
- El momento en que sucedieron.
- La altura del bloque en el que se crearon.
- La identidad de quién lo minó.
- La recompensa de ETH.

### Gas {#gas}

Los exploradores de bloques no solo te ofrecerán datos sobre el uso de gas en las transacciones y los bloques, sino que te proporcionarán información sobre los precios del gas actual de la red. Esto te servirá de ayuda para comprender el uso de la red, enviar transacciones seguras y no realizar un gasto demasiado alto de gas. Busca las API que te ayuden a obtener esta información en la interfaz de tus productos. Coberturas de datos específicos de gas:

- Unidades estimadas de gas necesarias para realizar una transacción segura pero lenta (+ duración y precio estimado).
- Unidades estimadas de gas necesarias para realizar una transacción normal (+ duración y precio estimado).
- Unidades estimadas de gas necesarias para realizar una transacción rápida (+ duración y precio estimado).
- Tiempo de confirmación medio basado en el precio del gas.
- Los contratos están consumiendo gas, en otras palabras, productos populares que se están utilizando mucho en la red.
- Cuentas que están gastando gas, en otras palabras, usuarios frecuentes de la red.

### Transacciones {#transactions}

Los exploradores de bloques se han convertido en un lugar común para que las personas puedan seguir el progreso de sus transacciones. Esto se debe a que el nivel de detalle que puedes obtener proporciona certezas adicionales. Entre los datos de la transacción se incluyen:

**Datos estándar**

- Hash de la transacción: Un hash generado cuando la transacción se envía.
- Estado: Un indicador de si la transacción está pendiente, ha fallado o se ha realizado con éxito.
- Bloque: El bloque en el que se ha incluido la transacción.
- Registro de tiempo: La hora a la que un minero minó la transacción.
- Desde: La dirección de la cuenta que envió la transacción.
- Hacia: La dirección del destinatario o el contrato inteligente con el que interactúa la transacción.
- Tokens transferidos: Una lista de tokens que se transfirieron como parte de la transacción.
- Valor: El valor total de ETH que se transfiere.
- Tarifa por transacción: La cantidad pagada al minero para procesar la transacción (calculada según el precio del gas/\*gas utilizado).

**Datos avanzados**

- Límite de gas: El número máximo de unidades de gas que la transacción puede consumir.
- Gas utilizado: La cantidad actual de unidades de gas que la transacción ha consumido.
- Precio del gas: El precio establecido por unidad de gas.
- Nonce: El número de transacción de la dirección `Desde` (ten en mente que empieza desde 0, así que un nonce de `100` sería actualmente la transacción número 101 enviada por esta cuenta).
- Datos de entrada: Cualquier información adicional que requiere la transacción.

### Cuentas {#accounts}

Se puede acceder a una gran cantidad de datos sobre las cuentas. Por eso, se suele recomendar utilizar varias cuentas para que tus activos y valores no se puedan rastrear con facilidad. Además, se están desarrollando varias soluciones para que las transacciones y la actividad de la cuenta se mantengan con mayor privacidad. De todos modos, a continuación se indican los datos disponibles para las cuentas:

**Cuentas de usuario**

- Dirección de la cuenta: La dirección pública que puedes utilizar para enviar fondos.
- Saldo de ETH: La cantidad de ETH relacionado con la cuenta.
- Valor total de ETH: El valor de ETH.
- Tokens: Los tokens relacionados con la cuenta y su valor.
- Historial de transacciones: Una lista de todas las transacciones donde esta cuenta era el remitente o el destinatario.

**Contratos inteligentes**

Las cuentas de contratos inteligentes tienen todos los datos que tendrá la cuenta de usuario, pero algunos exploradores de bloques también mostrarán información sobre códigos. Los ejemplos incluyen:

- Creador del contrato: La dirección que implementó el contrato a la red principal.
- Transacción de creación: La transacción que incluye la implementación a la red principal.
- Código fuente: El código de tipo Solidity o Vyper del contrato inteligente.
- Contrato ABI: La interfaz binaria de la aplicación del contrato, es decir, las llamadas que el contrato hace y los datos que recibe.
- Código de creación del contrato: El bytecode compilado del contrato inteligente; se crea cuando se compila un contrato inteligente escrito en Solidity o Vyper, etc.
- Eventos del contrato: Un historial de los métodos que se utilizan en el contrato inteligente. Básicamente es una manera de ver cómo se está utilizando el contrato y con qué frecuencia.

### Tokens {#tokens}

Los tokens son un tipo de contrato así que incluirán datos similares a un contrato inteligente. Sin embargo, como tienen valor y se pueden intercambiar, tienen puntos de datos adicionales:

- Tipo: Puede tratarse de un ERC-20, ERC-721 u otro token estándar.
- Precio: Si se trata de un ERC-20, tendrá un valor de mercado actual.
- Capitalización de mercado: Si se trata de un ERC-20, tendrán una capitalización de mercado (calculado por precio/oferta total).
- Oferta total: El número de tokens en circulación.
- Portadores: El número de direcciones que tiene el token.
- Transferencias: El número de veces que el token se ha transferido entre cuentas.
- Historial de transacciones: Un historial de todas las transacciones que incluyen el token.
- Dirección del contrato: La dirección del token que se implementó en la red principal.
- Decimales: Tokens ERC-20 divisibles y con decimales.

### Red {#network}

Obviamente, existen algunos datos que hablan de la salud de la red. Estos son bastante específicos con respecto al mecanismo de consenso de la Prueba de trabajo de Ethereum. Cuando Ethereum pase a Eth2, algunos de estos datos serán redundantes:

- Dificultad: La dificultad actual de minería.
- Tasa de Hash: Una estimación de como algunos mineros de de Ethereum están generando hashes e intentando resolver el bloque actual de Ethereum o cualquier otro bloque.
- Total de transacciones: El número de transacciones realizadas desde la creación de Ethereum.
- Transacciones por segundo: El número de transacciones procesadas por segundo.
- Precio ETH: Las valoraciones actuales de 1 ETH.
- Suministro total de ETH: El número de ETH en circulación; recuerda que un nuevo ETH se genera con la creación de cada bloque en forma de recompensas en bloque.
- Capitalización de mercado: El cálculo del precio/demanda.

## Datos de Eth2 {#consensus-layer-data}

Las actualizaciones de Eth2 están todavía en desarrollo, pero vale la pena comentar algunos de los puntos de información que podrán proporcionarte los exploradores. De hecho, todos estos datos ya están disponibles para las redes de pruebas.

Si no estás familiarizado con Eth2, revisa [nuestra visión general de las actualizaciones de Eth2](/upgrades/).

### Epoch {#epoch}

La primera actualización de Eth2, la cadena de baliza, creará comités de validadores que se aleatorizan al final de cada epoch (cada 6,4 minutos) por razones de seguridad. Los datos de epoch incluyen:

- Número de epoch.
- Estado finalizado: Si el epoch ha sido finalizado (sí/no).
- Tiempo: La hora a la que el epoch ha finalizado.
- Certificados: El número de transacciones en el epoch (votos por bloques dentro de los slots).
- Depósitos: El número de depósitos de ETH incluidos en el epoch (los validadores deben apostar ETH para convertirse en validadores).
- Cortes: El número de sanciones impuestas a los usuarios que proponen bloques o certificadores.
- Participación de votación: Es la cantidad de ETH apostados que se utiliza para certificar bloques.
- Validadores: El número de validadores activos para el epoch.
- Saldo promedio del validador: El saldo promedio de los validadores activos.
- Slots: El número de slots incluidos en el epoch (slots incluidos en un bloque válido).

### Slot {#slot}

Los slots son oportunidades para crear bloques; los datos disponibles para cada slot incluyen:

- Epoch: El epoch en el que el slot es válido.
- Número de slot.
- Estado: El estado del slot (propuesto/perdido).
- Tiempo: El registro de tiempo del slot.
- Proponente: El validador que propuso el bloque para el slot.
- Raíz del bloque: La raíz del árbol hash del bloque de baliza.
- Raíz primaria: El hash del bloque que llegó antes.
- Raíz del estado: La raíz del árbol hash del estado de baliza.
- Firma.
- Revelación de fase RanDAO.
- Graffiti: Un usuario que propone bloques puede incluir un mensaje largo de 32 bytes a este bloque propuesto.
- Datos de Eth1.
  - Hash del bloque.
  - Cantidad de depósitos.
  - Depósito raíz.
- Certificaciones: El número de certificaciones del bloque en el slot.
- Depósitos: El número de depósitos durante este slot.
- Salidas voluntarias: El número de validadores que quedaron durante el slot.
- Cortes: El número de sanciones impuestas a los usuarios que proponen bloques o certificadores.
- Votos: Los validadores que han votado el bloque en este slot.

### Bloques {#blocks-1}

En Eth2 los bloques trabajan de manera diferente porque los mineros se sustituyen por validadores y la cadena de baliza introduce slots y epochs a Ethereum. Esto se traduce en datos nuevos.

- Proponente: El validador que se ha elegido algorítmicamente para proponer el nuevo bloque.
- Epoch: El epoch en el que se ha propuesto el bloque.
- Slot: El slot en el que se ha propuesto el bloque.
- Certificados: El número de certificados incluidos en el slot. Los certificados son como votos que indican que el bloque está listo para pasar a la cadena de baliza.

### Validadores {#validators}

Los validadores son los responsables de proponer bloques y certificarlos dentro de los slots.

- Número de validador: El número único que representa al validador.
- Saldo actual: El saldo del validador, que incluye las recompensas.
- Saldo efectivo: El saldo del validador que se utiliza para participar.
- Ingresos: Las recompensas o sanciones que recibe el validador.
- Estado: Si el validador está actualmente conectado y activo o no.
- Eficacia de la certificación: El tiempo promedio que tardan los certificados del validador en ser incluidos en la cadena.
- Elegibilidad para activación: La fecha (y epoch), en la que el validador estuvo disponible para validar.
- Activo desde: La fecha (y epoch), en la que el validador comenzó a estar activo.
- Bloques propuestos: El bloque que el validador ha propuesto.
- Certificaciones: Las certificaciones que el validador ha proporcionado.
- Depósitos: La dirección del remitente, el hash de la transacción, el número de bloque, el registro de tiempo, la cantidad y el estado del depósito de participación que ha realizado el validador.

### Certificaciones {#attestations}

Las certificaciones son votos positivos ("sí") para incluir votos en la cadena. Sus datos están relacionados con un registro de la certificación y con los validadores que la realizaron.

- Slot: El slot en el que se realizó la certificación.
- Índice del comité: El índice del comité en el slot indicado.
- Bits de agregación: Representa la certificación agregada de todos los validadores participantes en la certificación.
- Validadores: Los validadores que proporcionan certificaciones.
- Raíz del bloque Beacon: Los puntos del bloque en el que certifican los validadores.
- Fuente: Los puntos hasta la última epoch justificada.
- Meta: Los puntos hasta el último límite del epoch.
- Firma.

### Red {#network-1}

Los datos de Eth2 de nivel superior incluyen los siguientes:

- Epoch actual.
- Slot actual.
- Validadores activos: El número de validadores activos.
- Validadores pendientes: El número de validadores pendientes de activación.
- ETH apostado: La cantidad de ETH apostada en la red.
- Saldo promedio: El saldo promedio de ETH de los validadores.

## Exploradores de bloques {#block-explorers}

- [Etherscan](https://etherscan.io/): Puedes utilizar un explorador de bloques para obtener datos de la red principal de Ethereum, la red de pruebas Ropsten, la red de pruebas Kovan, la red de pruebas Rinkeby y la red de pruebas Goerli.
- [Blockscout](https://blockscout.com/): Se centra en las siguientes redes:
  - xDai: Combinación inteligente de la moneda estable DAI del MakerDAO, y la Sidechain y tecnología TokenBridge de POA.
  - POA: Sidechain y una red autónoma asegurada por un grupo de validadores de confianza. Todos los validadores de la red son notarios de los Estados Unidos, y su información está disponible públicamente.
  - Red de pruebas Sokol POA.
  - ARTIS: Blockchain compatible con Ethereum.
  - [LUKSO L14](https://blockscout.com/lukso/l14) – L14 funciona como la primera red de pruebas, permite a la comunidad LUKSO construir y probar una infraestructura común.
  - qDai.
- [Etherchain](https://www.etherchain.org/): Un explorador de bloques para la red principal de Ethereum.
- [Ethplorer](https://ethplorer.io/): Un explorador de bloques con un enfoque en tokens para la red principal de Ethereum y la red de pruebas de Kovan.
- [Blockchair](https://blockchair.com/ethereum): El explorador de Ethereum más privado. Además, puede ordenar y filtrar datos (mempool).

## Exploradores de bloques de Eth2 {#beacon-chain-block-explorers}

- [https://beaconcha.in/](https://beaconcha.in/)
- [https://beaconscan.com/](https://beaconscan.com/)
- [https://eth2stats.io/](https://eth2stats.io/medalla-testnet)

## Más información {#further-reading}

_¿Conoces algún recurso en la comunidad que te haya servido de ayuda? Edita esta página y añádelo._

## Temas relacionados {#related-topics}

- [Minería](/developers/docs/consensus-mechanisms/pow/mining/)
- [Transacciones](/developers/docs/transactions/)
- [Cuentas](/developers/docs/accounts/)
- [Redes](/developers/docs/networks/)
