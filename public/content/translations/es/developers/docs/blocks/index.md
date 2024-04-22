---
title: Bloques
description: 'Una visión general de los bloques de la blockchain de Ethereum: su estructura de datos, por qué son necesarios y cómo se fabrican.'
lang: es
---

Los bloques son lotes de transacciones con un hash del bloque anterior en la cadena. Esta vincula bloques juntos (en una cadena) porque los hashes derivan criptográficamente de los datos del bloque. Esto previene el fraude, porque un cambio en cualquier bloque del historial invalidaría todos los siguientes bloques; asimismo, todos los hashes subsecuentes cambiarían y todos los que ejecutasen la blockchain lo notarían.

## Requisitos previos {#prerequisites}

Los bloques son muy fáciles de manejar incluso para los principiantes. Sin embargo, para ayudarle a comprender mejor esta página, le recomendamos leer primero las secciones de [Cuentas](/developers/docs/accounts/) y [Transacciones](/developers/docs/transactions/) y nuestra [introducción a Ethereum](/developers/docs/intro-to-ethereum/).

## ¿Por qué se usan los bloques? {#why-blocks}

Para asegurarse de que todos los participantes de la red Ethereum mantienen un estado sincronizado y aceptan el registro de transacciones, estas se organizan en bloques. Lo que significa que decenas (sino cientos) de transacciones se encuentran en curso, confirmadas y sincronizadas al mismo tiempo.

![Un diagrama que muestra una transacción en un bloque, lo que provoca cambios de estado](./tx-block.png) _Diagrama adaptado de [Ethereum EVM ilustrado](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Al separar los commits (formación exitosa de una cadena), damos a todos los participantes de la red el tiempo suficiente para llegar a un consenso: aunque las solicitudes de transacción ocurren docenas de veces por segundo, los bloques en Ethereum se confirman aproximadamente una vez cada 15 segundos.

## ¿Cómo funcionan los bloques? {#how-blocks-work}

Para preservar el historial de transacciones, los bloques se ordenan estrictamente (cada nuevo bloque creado contiene una referencia a su bloque predecesor) y las transacciones dentro de los bloques también se ordenan de manera estricta. Excepto en casos raros o en un momento determinado, todos los participantes en la red están de acuerdo en el número exacto y en el historial de los bloques. Además, están trabajando para agrupar los requerimientos de transacción en tiempo real en el próximo bloque.

Cuando un validador seleccionado aleatoriamente completa un bloque en la red, este se propaga por el resto de la red. Todos los nodos añaden este nuevo bloque al final de sus cadenas de bloque y se selecciona a un nuevo validador para crear el siguiente bloque. El proceso exacto de ensamblaje de bloques y los procesos de compromiso/consenso se encuentran específicados en el protocolo de prueba de participación (PoS) de Ethereum.

## Protocolo de prueba de participación (PoS) {#proof-of-work-protocol}

La prueba de participación (PoS) consiste en lo siguiente:

- Cada nodo de validación deberá comprometer 32 ETH en un contrato de depósito colateral como garantía ante malos comportamientos. Esto favorece la protección de la red, ya que las muestras de conductas deshonestas desencadenarían la destrucción total o parcial del depósito de garantía.
- En cada intervalo (separados entre sí por doce segundos) se escoge a un validador de manera aleatoria para que proponga un bloque. Estos agrupan, ejecutan y determinan el nuevo estatus de las transacciones. Esta información se comprime en un bloque que se pasa a otros validadores.
- Otros validadores enterados de la existencia de este nuevo bloque vuelven a ejecutar las transacciones con el fin de mostrar que están de acuerdo con los cambios propuestos a la red en general. Tras asumir el bloque como válido, se añade a sus propias bases de datos.
- Cuando se informa a un validador sobre dos bloques que entran en conflicto para una misma ranura, entonces este ha de hacer uso del algoritmo de elección de bifurcación para elegir el bloque respaldado por los ETH más apostados.

[Más información sobre la prueba de participación](/developers/docs/consensus-mechanisms/pos)

## ¿Qué hay en un bloque? {#block-anatomy}

Hay mucha información contenida en un bloque. En los niveles más altos, un bloque contiene las siguientes características:

| Campo            | Descripción                                                         |
|:---------------- |:------------------------------------------------------------------- |
| `ranura`         | la ranura a la que pertenece el bloque                              |
| `proposer_index` | la ID del validador que propone el bloque                           |
| `parent_root`    | el hash del bloque anterior                                         |
| `state_root`     | el hash raíz del objeto de estado                                   |
| `cuerpo`         | un objeto que contiene varios campos, como se define a continuación |

El `cuerpo` del bloque contiene una serie de características:

| Campo                | Descripción                                                          |
|:-------------------- |:-------------------------------------------------------------------- |
| `randao_reveal`      | un valor utilizado para seleccionar el siguiente bloque propuesto    |
| `eth1_data`          | información sobre el contrato de depósito                            |
| `grafiti`            | datos arbitrarios usados para etiquetar bloques                      |
| `proposer_slashings` | lista de validadores por cortar                                      |
| `attester_slashings` | lista de validadores a cortar                                        |
| `certificaciones`    | lista de certificaciones a favor del bloque actual                   |
| `depósitos`          | lista de nuevos depósitos en el contrato de depósito                 |
| `voluntary_exits`    | lista de validadores que salen de la red                             |
| `sync_aggregate`     | subconjunto de validadores utilizados para servir a clientes ligeros |
| `execution_payload`  | transacciones pasadas desde el cliente de ejecución                  |

El campo `certificaciones` contiene una lista con todas las certificaciones del bloque. Las certificaciones poseen su propia tipología y contienen diversos tipos de información. Cada atestación contiene:

| Campo              | Descripción                                                         |
|:------------------ |:------------------------------------------------------------------- |
| `aggregation_bits` | una lista de los validadores que participaron en esta certificación |
| `datos`            | una terminal con múltiples subcampos                                |
| `firma`            | firma añadida de todos los validadores que certifican               |

El campo `datos` en la `certificación` contiene lo siguiente:

| Campo               | Descripción                                                |
|:------------------- |:---------------------------------------------------------- |
| `ranura`            | el ranura a la que se refiere la certificación             |
| `índice`            | índices para certificar validadores                        |
| `beacon_block_root` | el hash raíz del bloque de baliza que contiene este objeto |
| `fuente`            | el último puesto de control justificado                    |
| `target`            | el último bloque de límite de época                        |

Ejecutar transacciones en `execution_payload` actualizará el estado general. Todos los clientes vuelven a ejecutar las transacciones en `execution_payload` para asegurarse de que el nuevo estado coincide con el campo `state_root` del nuevo bloque. Esta es la forma en la que los clientes definen si un nuevo bloque es válido y seguro para añadirlo a sus cadenas de bloque. El parámetro de `execution payload` es en sí mismo un objeto con diferentes campos. También hay un `execution_payload_header` que contiene un compendio de información relevante sobre los datos de ejecución. Estas estructuras de datos se organizan de la siguiente manera:

El `execution_payload_header` contiene los siguientes campos:

| Campo               | Descripción                                                               |
|:------------------- |:------------------------------------------------------------------------- |
| `parent_hash`       | hash del bloque principal                                                 |
| `fee_recipient`     | dirección de cuenta para pagar comisiones de transacción a                |
| `state_root`        | hash raíz para el estado global después de aplicar cambios en este bloque |
| `receipts_root`     | hash de los recibos de transacción trie                                   |
| `logs_bloom`        | estructura de datos que contiene registros de eventos                     |
| `prev_randao`       | valor usado en la selección aleatoria del validador                       |
| `block_number`      | el número del bloque actual                                               |
| `gas_limit`         | gas máximo permitido en este bloque                                       |
| `gas_used`          | la cantidad real de gas utilizada en este bloque                          |
| `marca de tiempo`   | el tiempo del bloque                                                      |
| `extra_data`        | datos adicionales arbitrarios como bytes sin procesar                     |
| `base_fee_per_gas`  | el valor de la tarifa de base                                             |
| `block_hash`        | hash del bloque de ejecución                                              |
| `transactions_root` | hash raíz de las transacciones en la carga útil                           |
| `withdrawal_root`   | hash raíz de las retiradas en la carga útil                               |

El propio `execution_payload` contiene lo siguiente (observe que esto es idéntico al encabezamiento, excepto que en lugar del hash raíz de las transacciones incluye la lista real de transacciones e información de retiradas):

| Campo              | Descripción                                                               |
|:------------------ |:------------------------------------------------------------------------- |
| `parent_hash`      | hash del bloque padre                                                     |
| `fee_recipient`    | dirección de la cuenta para pagar las tarifas de transacción a            |
| `state_root`       | hash raíz para el estado global después de aplicar cambios en este bloque |
| `receipts_root`    | hash de los recibos de transacción trie                                   |
| `logs_bloom`       | estructura de datos que contiene registros de eventos                     |
| `prev_randao`      | valor utilizado en la selección aleatoria del validador                   |
| `block_number`     | el número del bloque actual                                               |
| `gas_limit`        | gas máximo permitido en este bloque                                       |
| `gas_used`         | la cantidad real de gas utilizada en este bloque                          |
| `marca de tiempo`  | el tiempo de bloqueo                                                      |
| `extra_data`       | datos adicionales arbitrarios como bytes sin procesar                     |
| `base_fee_per_gas` | el valor de la tarifa base                                                |
| `block_hash`       | Hash del bloque de ejecución                                              |
| `transacciones`    | lista de transacciones por ejecutar                                       |
| `retiradas`        | lista de objetos de retiradas                                             |

La lista de `retiradas` contiene objetos de `retirada` estructurados de la siguiente manera:

| Campo            | Descripción                                          |
|:---------------- |:---------------------------------------------------- |
| `dirección`      | dirección de la cuenta que ha realizado una retirada |
| `amount`         | cantidad de la retirada                              |
| `índice`         | valor del índice de la retirada                      |
| `validatorIndex` | valor del índice del validador                       |

## Tiempo del bloque {#block-time}

El tiempo del bloque se refiere al espacio de tiempo que separa los bloques entre sí. En Ethereum, el tiempo se divide en unidades de doce segundos llamadas «ranuras». En cada ranura se selecciona a un validador único para que proponga un bloque. Asumiendo que todos los validadores están en línea y operativos, habría un bloque en cada ranura, lo que significaría que el tiempo de un bloque es de 12 segundos. A pesar de ello, en algunas ocasiones, los validadores podrían encontrarse desconectados en el momento de solicitarles la propuesta de un nuevo bloque, lo que sugiere que algunas ranuras podrían estar vacías.

Esta implementación difiere de los sistemas basados en pruebas de trabajo cuyos tiempos de bloqueo son probabilísticos y ajustados por la dificultad de minería del protocolo. El [tiempo medio de bloque](https://etherscan.io/chart/blocktime) de Ethereum es un claro ejemplo de esto, donde la transición de la prueba de trabajo a la prueba de participación puede deducirse claramente según la consistencia del nuevo bloque de 12 horas.

## Tamaño del bloque {#block-size}

Un importante apunte final es que los bloques tienen limitaciones de tamaño. Cada bloque tiene un tamaño objetivo de 15 millones de gas, pero el tamaño de los bloques incrementará o disminuirá según las exigencias de la red, hasta el límite de 30 millones de gas por bloque (el doble del tamaño objetivo). La cantidad total de gas utilizada por todas las transacciones del bloque debe ser inferior al límite de gas del bloque. Esto es importante, porque garantiza que los bloques no pueden tener un tamaño arbitrario. Si los bloques pudieran ser del tamaño que quisiéramos, los nodos completos de menor rendimiento dejarían de adaptarse gradualmente a la red, debido a los requisitos de espacio y velocidad. Cuanto más grande sea el bloque, mayores serán los requerimientos de potencia informática para procesarlos a tiempo para la siguiente ranura. Esto constituye una fuerza centralizadora, limitada por el tamaño de los bloques.

## Más información {#further-reading}

_¿Conoce algún recurso de la comunidad que le haya servido de ayuda? Edite esta página y añádalo._

## Temas relacionados {#related-topics}

- [Transacciones](/developers/docs/transactions/)
- [Gas](/developers/docs/gas/)
- [Prueba de participación](/developers/docs/consensus-mechanisms/pos)
