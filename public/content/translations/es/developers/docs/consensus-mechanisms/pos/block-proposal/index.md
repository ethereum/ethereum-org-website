---
title: Propuesta de bloque
description: Explicación de cómo se proponen los bloques en la prueba de participación de Ethereum.
lang: es
---

Los bloques son las unidades fundamentales de la cadena de bloques. Los bloques son unidades discretas de información que se pasan entre nodos, se acuerdan y se añaden a la base de datos de cada nodo. Esta página explica cómo se producen.

## Requisitos previos {#prerequisites}

La propuesta de bloque es parte del protocolo de prueba de participación. Para ayudar a entender esta página, le recomendamos que lea sobre la [prueba de participación](/developers/docs/consensus-mechanisms/pos/) y la [arquitectura de bloques](/developers/docs/blocks/).

## ¿Quién produce los bloques? {#who-produces-blocks}

Las cuentas de validadores proponen bloques. Las cuentas de validación slas administran operadores de nodos que ejecutan software de validación como parte de sus clientes de ejecución y consenso y han depositado al menos 32 ETH en el contrato de depósito. No obstante, cada validador solo es responsable ocasionalmente de proponer un bloque. Ethereum mide el tiempo en ranuras y épocas. Cada ranura es de doce segundos, y 32 ranuras (6,4 minutos) hacen una época. Cada ranura es una oportunidad de añadir un nuevo bloque en Ethereum.

### Selección aleatoria {#random-selection}

Un solo validador se elige pseudoaleatoriamente para proponer un bloque en cada ranura. No hay tal cosa como la verdadera aleatoriedad en una cadena de bloques, porque si cada nodo generara números genuinamente aleatorios, no podrían llegar a un consenso. En su lugar, el objetivo es hacer que el proceso de selección del validador sea impredecible. La aleatoriedad se logra en Ethereum utilizando un algoritmo llamado RANDAO que mezcla un hash del proponente de bloques con una semilla que se actualiza en cada bloque. Este valor sirve para seleccionar un validador específico del conjunto de validadores totales. La selección del validador se fija con dos épocas de antelación como una forma de protegerse contra ciertos tipos de manipulación de semillas.

Aunque los validadores se añaden a RANDAO en cada ranura, el valor global de RANDAO solo se actualiza una vez por época. Para calcular el índice del siguiente proponente de bloques, el valor de RANDAO se mezcla con el número de ranura para dar un valor único en cada ranura. La probabilidad de que se seleccione un validador individual no es simplemente `1/N` (donde `N` = total de validadores activos). En su lugar, se pondera por el saldo efectivo de ETH de cada validador. El saldo efectivo máximo es de 32 ETH (esto significa que `balance < 32 ETH` conduce a un peso más bajo que `balance == 32 ETH`, pero `balance > 32 ETH` no conduce a una ponderación más alta que `balance == 32 ETH`).

Solo se selecciona un proponente de bloque en cada ranura. En condiciones normales, un productor de un solo bloque crea y lanza un solo bloque en su ranura dedicada. Crear dos bloques para la misma ranura es una ofensa que se puede recortar, a menudo conocida como «equivocación».

## ¿Cómo se crea el bloque? {#how-is-a-block-created}

Se espera que el proponente de bloques transmita un bloque de baliza firmado que se construye sobre la cabeza más reciente de la cadena, de acuerdo con la vista de su propio algoritmo de elección de bifurcación de ejecución local. El algoritmo de elección de bifurcación aplica cualquier certificación en cola que quede de la ranura anterior, luego encuentra el bloque con el mayor peso acumulado de certificaciones en su historia. Ese bloque es el padre del nuevo bloque creado por el proponente.

El proponente de bloques crea un bloque recopilando datos de su propia base de datos local y vista de la cadena. El contenido del bloque se muestra en el siguiente fragmento:

```rust
class BeaconBlockBody(Container):
    randao_reveal: BLSSignature
    eth1_data: Eth1Data
    graffiti: Bytes32
    proposer_slashings: List[ProposerSlashing, MAX_PROPOSER_SLASHINGS]
    attester_slashings: List[AttesterSlashing, MAX_ATTESTER_SLASHINGS]
    attestations: List[Attestation, MAX_ATTESTATIONS]
    deposits: List[Deposit, MAX_DEPOSITS]
    voluntary_exits: List[SignedVoluntaryExit, MAX_VOLUNTARY_EXITS]
    sync_aggregate: SyncAggregate
    execution_payload: ExecutionPayload
```

El campo `randao_reveal` toma un valor aleatorio verificable que el proponente de bloques crea al firmar el número de época actual. `eth1_data` es un voto por la vista del proponente del bloque sobre el contrato de depósito, incluida la raíz del depósito Merkle trie y el número total de depósitos que permiten verificar los nuevos depósitos. `graffiti` es un campo opcional que se puede utilizar para añadir un mensaje al bloque. `proposer_slashings` y `attester_slashings` son campos que contienen pruebas de que ciertos validadores han cometido delitos recortables de acuerdo con la opinión del proponente de la cadena. `deposits` es una lista de nuevos depósitos de validadores de los que el proponente de bloques es consciente, y `voluntary_exits` es una lista de validadores que desean salir de los que el proponente de bloques ha oído hablar en la red de intercambio de información de la capa de consenso. El `sync_aggregate` es un vector que muestra qué validadores se asignaron previamente a un comité de sincronización (un subconjunto de validadores que sirven datos de clientes ligeros) y participaron en la firma de datos.

El `execution_payload` permite que la información sobre las transacciones se transmita entre los clientes de ejecución y consenso. El `execution_payload` es un bloque de datos de ejecución que se anida dentro de un bloque de baliza. Los campos dentro de la `execution_payload` reflejan la estructura de bloques descrita en el protocolo de Ethereum, excepto que no hay ommers y `prev_randao` existe en lugar de `dificultad`. El cliente de ejecución tiene acceso a un grupo local de transacciones de las que ha oído hablar en su propia red de intercambio de información. Estas transacciones se ejecutan localmente para generar un estado trie actualizado conocido como «posestado». Las transacciones se incluyen en el `execution_payload` como una lista llamada `transacciones` y el posestado se proporciona en el campo `raíz-estado`.

Todos estos datos se recopilan en un bloque de baliza, se firman y se transmiten a los pares del proponente del bloque, que los propagan a sus pares, etc.

Más información sobre la [anatomía de los bloques](/developers/docs/blocks).

## ¿Qué pasa con el bloque? {#what-happens-to-blocks}

El bloque se añade a la base de datos local del proponente del bloque y se transmite a los pares a través de la red de intercambio de información de la capa de consenso. Cuando un validador recibe el bloque, verifica los datos dentro de él, incluida la verificación de que el bloque tiene el padre correcto, corresponde a la ranura indicada, el índice del proponente es el esperado, la revelación de RANDAO es válida y que el proponente no está recortado. El `execution_payload` se desagrupa, y el cliente de ejecución del validador vuelve a ejecutar las transacciones de la lista para comprobar el cambio de estado propuesto. Suponiendo que el bloque pase todas estas comprobaciones, cada validador añade el bloque a su propia cadena predilecta. El proceso comienza de nuevo en la siguiente ranura.

## Recompensas de bloque {#block-rewards}

El proponente de bloques recibe el pago por su trabajo. Hay una `base_reward` calculada en función del número de validadores activos y sus saldos efectivos. El proponente del bloque recibe entonces una fracción de `base_reward` por cada certificación válida incluida en el bloque; cuantos más validadores certifican el bloque, mayor será la recompensa del proponente del bloque. También hay una recompensa por los validadores de informes que deban ser recortados, igual a `1/512 * effective balance` por cada validador recortado.

[Más información sobre recompensas y penalizaciones](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)

## Más información {#further-reading}

- [Introducción a los bloques](/developers/docs/blocks/)
- [Introducción a la prueba de participación](/developers/docs/consensus-mechanisms/pos/)
- [Especificaciones de consenso de Ethereum](https://github.com/ethereum/consensus-specs)
- [Introducción a Gasper](/developers/docs/consensus-mechanisms/pos/)
- [Actualización de Ethereum](https://eth2book.info/)
