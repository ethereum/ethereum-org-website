---
title: Propuesta de bloques
description: "Explicación de cómo se proponen los bloques en la prueba de participación (PoS) de Ethereum."
lang: es
---

Los bloques son las unidades fundamentales de la cadena de bloques. Los bloques son unidades discretas de información que se transmiten entre nodos, se acuerdan y se añaden a la base de datos de cada nodo. Esta página explica cómo se producen.

## Requisitos previos {#prerequisites}

La propuesta de bloques es parte del protocolo de prueba de participación (PoS). Para ayudar a entender esta página, le recomendamos que lea sobre la [prueba de participación (PoS)](/developers/docs/consensus-mechanisms/pos/) y la [arquitectura de bloques](/developers/docs/blocks/).

## ¿Quién produce los bloques? {#who-produces-blocks}

Las cuentas de validador proponen bloques. Las cuentas de validador son administradas por operadores de nodos que ejecutan software de validador como parte de sus clientes de ejecución y consenso, y han depositado al menos 32 ETH en el contrato de depósito. Sin embargo, cada validador solo es responsable ocasionalmente de proponer un bloque. [Ethereum](/) mide el tiempo en slots y épocas. Cada slot dura doce segundos, y 32 slots (6,4 minutos) conforman una época. Cada slot es una oportunidad para añadir un nuevo bloque en Ethereum.

### Selección aleatoria {#random-selection}

Un único validador es elegido de forma pseudoaleatoria para proponer un bloque en cada slot. No existe la verdadera aleatoriedad en una cadena de bloques porque si cada nodo generara números genuinamente aleatorios, no podrían llegar a un consenso. En su lugar, el objetivo es hacer que el proceso de selección de validadores sea impredecible. La aleatoriedad se logra en Ethereum utilizando un algoritmo llamado RANDAO que mezcla un hash del proponente de bloque con una semilla que se actualiza en cada bloque. Este valor se utiliza para seleccionar un validador específico del conjunto total de validadores. La selección del validador se fija con dos épocas de antelación como una forma de protegerse contra ciertos tipos de manipulación de semillas.

Aunque los validadores añaden a RANDAO en cada slot, el valor global de RANDAO solo se actualiza una vez por época. Para calcular el índice del siguiente proponente de bloque, el valor de RANDAO se mezcla con el número de slot para dar un valor único en cada slot. La probabilidad de que se seleccione un validador individual no es simplemente `1/N` (donde `N` = total de validadores activos). En su lugar, se pondera por el saldo efectivo de ETH de cada validador. El saldo efectivo máximo es de 32 ETH (esto significa que `balance < 32 ETH` conduce a un peso menor que `balance == 32 ETH`, pero `balance > 32 ETH` no conduce a un peso mayor que `balance == 32 ETH`).

Solo se selecciona un proponente de bloque en cada slot. En condiciones normales, un único productor de bloques crea y publica un único bloque en su slot dedicado. Crear dos bloques para el mismo slot es una ofensa sujeta a recorte, a menudo conocida como "equivocación".

## ¿Cómo se crea el bloque? {#how-is-a-block-created}

Se espera que el proponente de bloque transmita un bloque baliza firmado que se construya sobre la cabeza más reciente de la cadena de acuerdo con la vista de su propio algoritmo de elección de bifurcación ejecutado localmente. El algoritmo de elección de bifurcación aplica cualquier atestación en cola sobrante del slot anterior, y luego encuentra el bloque con el mayor peso acumulado de atestaciones en su historial. Ese bloque es el padre del nuevo bloque creado por el proponente.

El proponente de bloque crea un bloque recopilando datos de su propia base de datos local y su vista de la cadena. El contenido del bloque se muestra en el siguiente fragmento:

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

El campo `randao_reveal` toma un valor aleatorio verificable que el proponente de bloque crea al firmar el número de época actual. `eth1_data` es un voto por la vista del proponente de bloque del contrato de depósito, incluyendo la raíz del trie de Merkle de depósitos y el número total de depósitos que permiten verificar nuevos depósitos. `graffiti` es un campo opcional que se puede utilizar para añadir un mensaje al bloque. `proposer_slashings` y `attester_slashings` son campos que contienen pruebas de que ciertos validadores han cometido ofensas sujetas a recorte según la vista de la cadena del proponente. `deposits` es una lista de nuevos depósitos de validadores de los que el proponente de bloque tiene conocimiento, y `voluntary_exits` es una lista de validadores que desean su salida de la que el proponente de bloque ha oído hablar en la red de chismes de la capa de consenso. El `sync_aggregate` es un vector que muestra qué validadores fueron asignados previamente a un comité de sincronización (un subconjunto de validadores que sirven datos de clientes ligeros) y participaron en la firma de datos.

El `execution_payload` permite que la información sobre las transacciones se transmita entre los clientes de ejecución y consenso. El `execution_payload` es un bloque de datos de ejecución que se anida dentro de un bloque baliza. Los campos dentro del `execution_payload` reflejan la estructura del bloque descrita en el Libro Amarillo de Ethereum, excepto que no hay ommers y `prev_randao` existe en lugar de `difficulty`. El cliente de ejecución tiene acceso a un grupo local de transacciones de las que ha oído hablar en su propia red de chismes. Estas transacciones se ejecutan localmente para generar un trie de estado actualizado conocido como post-estado. Las transacciones se incluyen en el `execution_payload` como una lista llamada `transactions` y el post-estado se proporciona en el campo `state-root`.

Todos estos datos se recopilan en un bloque baliza, se firman y se transmiten a los pares del proponente de bloque, quienes lo propagan a sus pares, etc.

Lea más sobre la [anatomía de los bloques](/developers/docs/blocks).

## ¿Qué le sucede al bloque? {#what-happens-to-blocks}

El bloque se añade a la base de datos local del proponente de bloque y se transmite a los pares a través de la red de chismes de la capa de consenso. Cuando un validador recibe el bloque, verifica los datos en su interior, lo que incluye comprobar que el bloque tiene el padre correcto, corresponde al slot correcto, que el índice del proponente es el esperado, que la revelación de RANDAO es válida y que el proponente no ha sufrido un recorte. El `execution_payload` se desagrega, y el cliente de ejecución del validador vuelve a ejecutar las transacciones de la lista para comprobar el cambio de estado propuesto. Suponiendo que el bloque pase todas estas comprobaciones, cada validador añade el bloque a su propia cadena canónica. El proceso comienza de nuevo en el siguiente slot.

## Recompensas de bloque {#block-rewards}

El proponente de bloque recibe un pago por su trabajo. Hay una `base_reward` calculada en función del número de validadores activos y sus saldos efectivos. El proponente de bloque recibe entonces una fracción de la `base_reward` por cada atestación válida incluida en el bloque; cuantos más validadores atestigüen el bloque, mayor será la recompensa del proponente de bloque. También hay una recompensa por informar sobre validadores que deberían sufrir un recorte, igual a `1/512 * effective balance` por cada validador recortado.

[Más sobre recompensas y penalizaciones](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)

## Lecturas adicionales {#further-reading}

- [Introducción a los bloques](/developers/docs/blocks/)
- [Introducción a la prueba de participación (PoS)](/developers/docs/consensus-mechanisms/pos/)
- [Especificaciones de consenso de Ethereum](https://github.com/ethereum/consensus-specs)
- [Introducción a Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)
- [Actualizando Ethereum](https://eth2book.info/)