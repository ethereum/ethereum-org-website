---
title: Bloques
description: Una descripción general de los bloques en la cadena de bloques de Ethereum: su estructura de datos, por qué son necesarios y cómo se crean.
lang: es
---

Los bloques son lotes de transacciones con un hash del bloque anterior en la cadena. Esto enlaza los bloques entre sí (en una cadena) porque los hashes se derivan criptográficamente de los datos del bloque. Esto previene el fraude, porque un cambio en cualquier bloque del historial invalidaría todos los bloques siguientes, ya que todos los hashes posteriores cambiarían y todos los que ejecutan la cadena de bloques se darían cuenta.

## Requisitos previos {#prerequisites}

Los bloques son un tema muy accesible para principiantes. Pero para ayudarle a comprender mejor esta página, le recomendamos que primero lea sobre [Cuentas](/developers/docs/accounts/), [Transacciones](/developers/docs/transactions/) y nuestra [introducción a Ethereum](/developers/docs/intro-to-ethereum/).

## ¿Por qué bloques? {#why-blocks}

Para garantizar que todos los participantes en la red [Ethereum](/) mantengan un estado sincronizado y estén de acuerdo con el historial preciso de las transacciones, agrupamos las transacciones en bloques. Esto significa que docenas (o cientos) de transacciones se comprometen, se acuerdan y se sincronizan todas a la vez.

![A diagram showing transaction in a block causing state changes](./tx-block.png)
_Diagrama adaptado de [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Al espaciar los compromisos, damos a todos los participantes de la red tiempo suficiente para llegar a un consenso: aunque las solicitudes de transacciones ocurren docenas de veces por segundo, los bloques solo se crean y comprometen en Ethereum una vez cada doce segundos.

## Cómo funcionan los bloques {#how-blocks-work}

Para preservar el historial de transacciones, los bloques están estrictamente ordenados (cada nuevo bloque creado contiene una referencia a su bloque principal), y las transacciones dentro de los bloques también están estrictamente ordenadas. Excepto en casos raros, en cualquier momento dado, todos los participantes de la red están de acuerdo sobre el número exacto y el historial de los bloques, y están trabajando para agrupar las solicitudes de transacciones en vivo actuales en el siguiente bloque.

Una vez que un validador seleccionado al azar en la red arma un bloque, este se propaga al resto de la red; todos los nodos agregan este bloque al final de su cadena de bloques, y se selecciona un nuevo validador para crear el siguiente bloque. El proceso exacto de ensamblaje de bloques y el proceso de compromiso/consenso están especificados actualmente por el protocolo de "prueba de participación (PoS)" de Ethereum.

## Protocolo de prueba de participación (PoS) {#proof-of-stake-protocol}

La prueba de participación (PoS) significa lo siguiente:

- Los nodos validadores tienen que depositar en garantía 32 ETH en un contrato de depósito como colateral contra el mal comportamiento. Esto ayuda a proteger la red porque la actividad demostrablemente deshonesta conduce a que se destruya parte o la totalidad de esa participación.
- En cada slot (espaciados por doce segundos), se selecciona al azar un validador para que sea el proponente de bloque. Agrupan las transacciones, las ejecutan y determinan un nuevo 'estado'. Envuelven esta información en un bloque y la transmiten a otros validadores.
- Otros validadores que se enteran del nuevo bloque vuelven a ejecutar las transacciones para asegurarse de que están de acuerdo con el cambio propuesto al estado global. Suponiendo que el bloque sea válido, lo agregan a su propia base de datos.
- Si un validador se entera de dos bloques conflictivos para el mismo slot, utiliza su algoritmo de elección de bifurcación para elegir el que esté respaldado por la mayor cantidad de ETH en participación.

[Más sobre la prueba de participación (PoS)](/developers/docs/consensus-mechanisms/pos)

## ¿Qué hay en un bloque? {#block-anatomy}

Hay mucha información contenida dentro de un bloque. En el nivel más alto, un bloque contiene los siguientes campos:

| Campo            | Descripción                                           |
| :--------------- | :---------------------------------------------------- |
| `slot`           | el slot al que pertenece el bloque                         |
| `proposer_index` | el ID del validador que propone el bloque           |
| `parent_root`    | el hash del bloque anterior                       |
| `state_root`     | el hash raíz del objeto de estado                     |
| `body`           | un objeto que contiene varios campos, como se define a continuación |

El `body` del bloque contiene varios campos propios:

| Campo                | Descripción                                      |
| :------------------- | :----------------------------------------------- |
| `randao_reveal`      | un valor utilizado para seleccionar al siguiente proponente de bloque   |
| `eth1_data`          | información sobre el contrato de depósito           |
| `graffiti`           | datos arbitrarios utilizados para etiquetar bloques                |
| `proposer_slashings` | lista de validadores a los que se les aplicará un recorte                 |
| `attester_slashings` | lista de atestadores a los que se les aplicará un recorte                  |
| `attestations`       | lista de atestaciones realizadas contra slots anteriores |
| `deposits`           | lista de nuevos depósitos al contrato de depósito     |
| `voluntary_exits`    | lista de validadores que salen de la red           |
| `sync_aggregate`     | subconjunto de validadores utilizados para servir a clientes ligeros |
| `execution_payload`  | transacciones pasadas desde el cliente de ejecución    |

El campo `attestations` contiene una lista de todas las atestaciones en el bloque. Las atestaciones tienen su propio tipo de datos que contiene varios datos. Cada atestación contiene:

| Campo              | Descripción                                                    |
| :----------------- | :------------------------------------------------------------- |
| `aggregation_bits` | una lista de qué validadores participaron en esta atestación    |
| `data`             | un contenedor con múltiples subcampos                            |
| `signature`        | firma agregada de un conjunto de validadores contra la parte `data` |

El campo `data` en la `attestation` contiene lo siguiente:

| Campo               | Descripción                                                     |
| :------------------ | :-------------------------------------------------------------- |
| `slot`              | el slot al que se refiere la atestación                             |
| `index`             | índices para los validadores que atestan                                |
| `beacon_block_root` | el hash raíz del bloque baliza visto como la cabeza de la cadena |
| `source`            | el último punto de control justificado                                   |
| `target`            | el último bloque de límite de época                                 |

La ejecución de las transacciones en el `execution_payload` actualiza el estado global. Todos los clientes vuelven a ejecutar las transacciones en el `execution_payload` para asegurarse de que el nuevo estado coincida con el del campo `state_root` del nuevo bloque. Así es como los clientes pueden saber que un nuevo bloque es válido y seguro para agregarlo a su cadena de bloques. El `execution payload` en sí es un objeto con varios campos. También hay un `execution_payload_header` que contiene información resumida importante sobre los datos de ejecución. Estas estructuras de datos se organizan de la siguiente manera:

El `execution_payload_header` contiene los siguientes campos:

| Campo               | Descripción                                                         |
| :------------------ | :------------------------------------------------------------------ |
| `parent_hash`       | hash del bloque principal                                            |
| `fee_recipient`     | dirección de la cuenta a la que se pagan las tarifas de transacción                      |
| `state_root`        | hash raíz para el estado global después de aplicar los cambios en este bloque |
| `receipts_root`     | hash del trie de recibos de transacciones                               |
| `logs_bloom`        | estructura de datos que contiene registros de eventos                                |
| `prev_randao`       | valor utilizado en la selección aleatoria de validadores                            |
| `block_number`      | el número del bloque actual                                     |
| `gas_limit`         | gas máximo permitido en este bloque                                   |
| `gas_used`          | la cantidad real de gas utilizada en este bloque                         |
| `timestamp`         | el tiempo de bloque                                                      |
| `extra_data`        | datos adicionales arbitrarios como bytes sin procesar                              |
| `base_fee_per_gas`  | el valor de la tarifa base                                                  |
| `block_hash`        | Hash del bloque de ejecución                                             |
| `transactions_root` | hash raíz de las transacciones en la carga útil                        |
| `withdrawal_root`   | hash raíz de los retiros en la carga útil                         |

El `execution_payload` en sí contiene lo siguiente (tenga en cuenta que esto es idéntico al encabezado, excepto que en lugar del hash raíz de las transacciones incluye la lista real de transacciones y la información de retiro):

| Campo              | Descripción                                                         |
| :----------------- | :------------------------------------------------------------------ |
| `parent_hash`      | hash del bloque principal                                            |
| `fee_recipient`    | dirección de la cuenta a la que se pagan las tarifas de transacción                      |
| `state_root`       | hash raíz para el estado global después de aplicar los cambios en este bloque |
| `receipts_root`    | hash del trie de recibos de transacciones                               |
| `logs_bloom`       | estructura de datos que contiene registros de eventos                                |
| `prev_randao`      | valor utilizado en la selección aleatoria de validadores                            |
| `block_number`     | el número del bloque actual                                     |
| `gas_limit`        | gas máximo permitido en este bloque                                   |
| `gas_used`         | la cantidad real de gas utilizada en este bloque                         |
| `timestamp`        | el tiempo de bloque                                                      |
| `extra_data`       | datos adicionales arbitrarios como bytes sin procesar                              |
| `base_fee_per_gas` | el valor de la tarifa base                                                  |
| `block_hash`       | Hash del bloque de ejecución                                             |
| `transactions`     | lista de transacciones a ejecutar                                 |
| `withdrawals`      | lista de objetos de retiro                                          |

La lista `withdrawals` contiene objetos `withdrawal` estructurados de la siguiente manera:

| Campo            | Descripción                        |
| :--------------- | :--------------------------------- |
| `address`        | dirección de la cuenta que ha retirado |
| `amount`         | cantidad del retiro                  |
| `index`          | valor del índice de retiro             |
| `validatorIndex` | valor del índice del validador              |

## Tiempo de bloque {#block-time}

El tiempo de bloque se refiere al tiempo que separa los bloques. En Ethereum, el tiempo se divide en unidades de doce segundos llamadas 'slots'. En cada slot, se selecciona un solo validador para proponer un bloque. Suponiendo que todos los validadores estén en línea y sean completamente funcionales, habrá un bloque en cada slot, lo que significa que el tiempo de bloque es de 12 s. Sin embargo, ocasionalmente los validadores pueden estar desconectados cuando se les llama para proponer un bloque, lo que significa que los slots a veces pueden quedar vacíos.

Esta implementación difiere de los sistemas basados en prueba de trabajo (PoW), donde los tiempos de bloque son probabilísticos y se ajustan mediante la dificultad de minería objetivo del protocolo. El [tiempo de bloque promedio](https://etherscan.io/chart/blocktime) de Ethereum es un ejemplo perfecto de esto, por el cual la transición de la prueba de trabajo (PoW) a la prueba de participación (PoS) se puede inferir claramente en función de la consistencia del nuevo tiempo de bloque de 12 s.

## Tamaño del bloque {#block-size}

Una nota final importante es que los bloques en sí tienen un tamaño limitado. Cada bloque tiene un tamaño objetivo de 30 millones de gas, pero el tamaño de los bloques aumentará o disminuirá de acuerdo con las demandas de la red, hasta el límite de gas del bloque de 60 millones (2 veces el tamaño objetivo del bloque). El límite de gas del bloque se puede ajustar hacia arriba o hacia abajo en un factor de 1/1024 con respecto al límite de gas del bloque anterior. Como resultado, los validadores pueden cambiar el límite de gas del bloque a través del consenso. La cantidad total de gas gastada por todas las transacciones en el bloque debe ser menor que el límite de gas del bloque. Esto es importante porque garantiza que los bloques no puedan ser arbitrariamente grandes. Si los bloques pudieran ser arbitrariamente grandes, los nodos completos de menor rendimiento dejarían gradualmente de poder mantenerse al día con la red debido a los requisitos de espacio y velocidad. Cuanto más grande sea el bloque, mayor será la potencia informática necesaria para procesarlos a tiempo para el siguiente slot. Esta es una fuerza centralizadora, que se resiste limitando el tamaño de los bloques.

## Lecturas adicionales {#further-reading}

_¿Conoce algún recurso de la comunidad que le haya ayudado? ¡Edite esta página y agréguelo!_

## Temas relacionados {#related-topics}

- [Transacciones](/developers/docs/transactions/)
- [Gas](/developers/docs/gas/)
- [Prueba de participación (PoS)](/developers/docs/consensus-mechanisms/pos)