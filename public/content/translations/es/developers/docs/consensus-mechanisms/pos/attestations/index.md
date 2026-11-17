---
title: Atestaciones
description: "Una descripción de las atestaciones en el modelo de prueba de participación (proof-of-stake) de Ethereum."
lang: es
---

Se espera que un validador cree, firme y difunda una atestación durante cada época. Esta página describe cómo son estas atestaciones y cómo se procesan y comunican entre los clientes de consenso.

## ¿Qué es una atestación? {#what-is-an-attestation}

Cada [época](/glossary/#epoch) (6,4 minutos), un validador difunde una atestación a la red. La atestación es para un slot específico en la época. El propósito de la atestación es votar a favor de la visión que tiene el validador de la cadena, en particular la cabeza de la cadena, el punto de control justificado más reciente y el punto de control al inicio de la época actual (conocidos como puntos de control `source` y `target`). Esta información se combina para todos los validadores participantes, lo que permite a la red alcanzar el consenso sobre el estado de la cadena de bloques.

Desde la actualización [Pectra](/roadmap/pectra/) ([EIP-7549](https://eips.ethereum.org/EIPS/eip-7549)), una atestación de un solo validador y una atestación agregada tienen formatos diferentes. La atestación de un solo validador contiene:

- `committee_index`: el comité al que pertenece el validador en el slot dado
- `attester_index`: el índice del validador
- `data`: detalles relacionados con la atestación, como se define a continuación
- `signature`: la firma BLS del validador sobre los `data`

La primera tarea para un validador que atesta es construir los `data`. Los `data` contienen la siguiente información:

- `slot`: El número de slot al que se refiere la atestación
- `index`: Establecido en `0` desde Pectra. El comité se identifica fuera de los `data` (por `committee_index`, o por `committee_bits` en un agregado) para que los votos de diferentes comités tengan `data` idénticos y puedan agregarse juntos. Antes de Pectra, este campo identificaba al comité
- `beacon_block_root`: Hash raíz del bloque que el validador ve en la cabeza de la cadena (el resultado de aplicar el algoritmo de elección de bifurcación)
- `source`: Parte del voto de finalidad que indica lo que los validadores ven como el punto de control justificado más reciente
- `target`: Parte del voto de finalidad que indica lo que los validadores ven como el punto de control al inicio de la época actual (el bloque en su primer slot, o el último bloque anterior a él si ese slot está vacío)

Una vez que se construyen los `data`, el validador los firma y difunde la atestación a la [subred](#aggregated-attestation) de su comité.

### Atestación agregada {#aggregated-attestation}

Existe una sobrecarga sustancial asociada con la transmisión de estos datos por la red para cada validador. Por lo tanto, las atestaciones de los validadores individuales se agregan dentro de las subredes antes de difundirse más ampliamente. Esto incluye agregar las firmas juntas para que una atestación que se difunde incluya los `data` de consenso y una sola firma formada al combinar las firmas de todos los validadores que están de acuerdo con esos `data`. Una atestación agregada contiene:

- `aggregation_bits`: una lista de bits con un bit por miembro de cada comité incluido, donde la posición se asigna a la posición del validador en su comité; el valor (0/1) indica si la firma de ese validador está incluida
- `data`: los datos de atestación que firmó cada validador incluido
- `signature`: una firma BLS que agrega las firmas de los validadores incluidos
- `committee_bits`: los miembros de qué comités están cubiertos por `aggregation_bits`

Cualquiera puede comprobar la firma agregada frente a las claves públicas combinadas de los validadores cuyos bits están establecidos.

En cada slot, se seleccionan unos 16 miembros de cada comité para ser sus `aggregators` (`TARGET_AGGREGATORS_PER_COMMITTEE`). Un validador sabe si fue seleccionado a partir de su propia firma sobre el número de slot. Los agregadores recopilan todas las atestaciones que escuchan en la subred de su comité que tienen los mismos `data` que los suyos, y las combinan, registrando al remitente de cada una en la `aggregation_bits`. Luego, los agregadores difunden el agregado a la red más amplia.

Cuando se selecciona a un validador para ser un proponente de bloque, este incluye atestaciones agregadas de slots recientes en el nuevo bloque. Desde Pectra, el proponente puede fusionar agregados de diferentes comités que comparten los mismos `data` en una sola atestación, y un bloque puede contener hasta 8 de ellos.

### Ciclo de vida de inclusión de la atestación {#attestation-inclusion-lifecycle}

1. Generación
2. Propagación
3. Agregación
4. Propagación
5. Inclusión

El ciclo de vida de la atestación se describe en el siguiente esquema:

<AttestationsDiagram />

## Recompensas {#rewards}

Los validadores son recompensados por enviar atestaciones. La recompensa de atestación depende de las banderas de participación (origen, destino y cabeza), la recompensa base y la tasa de participación.

Cada una de las banderas de participación puede ser verdadera o falsa, dependiendo de la atestación enviada y su retraso de inclusión.

El mejor escenario ocurre cuando las tres banderas son verdaderas, en cuyo caso un validador ganaría (por bandera correcta):

`reward += base reward * flag weight * flag attesting rate / 64`

La tasa de atestación de la bandera se mide utilizando la suma de los saldos efectivos de todos los validadores que atestan para la bandera dada en comparación con el saldo efectivo activo total.

### Recompensa base {#base-reward}

La recompensa base se calcula de acuerdo con el número de validadores que atestan y sus saldos efectivos de ether en participación:

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### Retraso de inclusión {#inclusion-delay}

En el momento en que los validadores votaron sobre la cabeza de la cadena (`block n`), `block n+1` aún no se había propuesto. Por lo tanto, las atestaciones se incluyen naturalmente **un bloque más tarde**, por lo que todas las atestaciones que votaron por `block n` como la cabeza de la cadena se incluyeron en `block n+1` y el **retraso de inclusión** es 1. El retraso de inclusión decide qué banderas de participación gana una atestación:

- `head`: solo si el retraso de inclusión es exactamente de 1 slot
- `source`: si el retraso de inclusión es como máximo de 5 slots (la raíz cuadrada entera de los 32 slots en una época)
- `target`: siempre que se incluya la atestación (desde la actualización Deneb, [EIP-7045](https://eips.ethereum.org/EIPS/eip-7045))

Así que una atestación incluida con dos slots de retraso pierde su recompensa de cabeza, pero aún gana las recompensas de origen y destino.

### Escenarios de atestación {#attestation-scenarios}

#### Validador votante ausente {#missing-voting-validator}

Una atestación se puede incluir en cualquier bloque desde el slot posterior a su creación hasta el final de la época siguiente. Si una atestación de la época 0 no se incluye en un bloque durante la época 0, aún se puede incluir en la época 1, con un retraso de inclusión mayor.

#### Agregador ausente {#missing-aggregator}

Cada comité tiene como objetivo unos 16 agregadores en cada slot, por lo que un agregador ausente rara vez impide que se agreguen las atestaciones de un comité. Por separado, cada nodo baliza permanece suscrito a **dos subredes durante 256 épocas** a la vez, elegidas a partir de su ID de nodo, lo que mantiene a cada subred bien conectada.

#### Proponente de bloque ausente {#missing-block-proposer}

Tenga en cuenta que, en algunos casos, un agregador afortunado también puede convertirse en el proponente de bloque. Si la atestación no se incluyó porque el proponente de bloque ha desaparecido, el siguiente proponente de bloque recogería la atestación agregada y la incluiría en el siguiente bloque. Sin embargo, el **retraso de inclusión** aumentará en uno.

## Más información {#further-reading}

- [Atestaciones en la especificación de consenso anotada de Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Atestaciones en eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)
- [Atestaciones en la especificación de consenso de Electra](https://github.com/ethereum/consensus-specs/blob/master/specs/electra/beacon-chain.md#attestation)

_¿Conoces algún recurso de la comunidad que te haya servido de ayuda? ¡Edita esta página y añádelo!_
