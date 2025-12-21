---
title: Atestaciones
description: Una descripción de las certificaciones sobre la prueba de participación de Ethereum.
lang: es
---

Se espera que un validador cree, firme y emita una certificación durante cada época. Esta página describe cómo se ven estas certificaciones y cómo se procesan y comunican entre clientes de consenso.

## ¿Qué es una certificación? {#what-is-an-attestation}

Cada [época](/glossary/#epoch) (6,4 minutos), un validador propone una atestación a la red. La certificación es para un espacio específico en la época. El propósito de la atestación es votar a favor de la visión de la cadena que tiene el validador; en particular, el bloque justificado más reciente y el primer bloque de la época actual (conocidos como puntos de control de `source` y `target`). Esta información se combina para todos los validadores participantes, lo que permite a la red llegar a un consenso sobre el estado de la cadena de bloques.

La certificación contiene los siguientes componentes:

- `aggregation_bits`: una lista de bits de validadores en la que la posición se asigna al índice del validador en su comité; el valor (0/1) indica si el validador firmó el `data` (es decir, si está activo y de acuerdo con el proponente del bloque).
- `data`: detalles relacionados con la atestación, como se define a continuación.
- `signature`: una firma BLS que agrega las firmas de los validadores individuales.

La primera tarea de un validador que atestigua es construir el `data`. El `data` contiene la siguiente información:

- `slot`: el número de slot al que se refiere la atestación.
- `index`: un número que identifica a qué comité pertenece el validador en un slot determinado.
- `beacon_block_root`: hash raíz del bloque que el validador ve en la cabecera de la cadena (el resultado de aplicar el algoritmo de elección de bifurcación).
- `source`: parte del voto de finalidad que indica lo que los validadores ven como el bloque justificado más reciente.
- `target`: parte del voto de finalidad que indica lo que los validadores ven como el primer bloque de la época actual.

Una vez construido el `data`, el validador puede cambiar el bit en `aggregation_bits` correspondiente a su propio índice de validador de 0 a 1 para demostrar que ha participado.

Por último, el validador firma la certificación y la transmite a la red.

### Atestación agregada {#aggregated-attestation}

Hay una sobrecarga sustancial asociada con el paso de estos datos por la red para cada validador. Por lo tanto, las certificaciones de validadores individuales se añaden dentro de las subredes antes de transmitirse más ampliamente. Esto incluye la agregación de firmas para que una atestación que se transmite incluya el `data` de consenso y una única firma formada por la combinación de las firmas de todos los validadores que están de acuerdo con ese `data`. Esto se puede comprobar utilizando `aggregation_bits` porque esto proporciona el índice de cada validador en su comité (cuyo ID se proporciona en `data`), que se puede utilizar para consultar firmas individuales.

En cada época, 16 validadores de cada subred son seleccionados para ser los `agregadores`. Los agregadores recopilan todas las atestaciones que escuchan en la red de gossip que tienen un `data` equivalente al suyo. El remitente de cada atestación coincidente se registra en los `aggregation_bits`. A continuación, los agregadores transmiten el agregado de atestaciones a la red más amplia.

Cuando se selecciona un validador para ser un proponente de bloques, este agrupa las certificaciones agregadas de las subredes hasta la última ranura en el nuevo bloque.

### Ciclo de vida de la inclusión de la atestación {#attestation-inclusion-lifecycle}

1. Generación
2. Propagación
3. Agregación
4. Propagación
5. Inclusión

El ciclo de vida de la certificación se describe en el siguiente esquema:

![ciclo de vida de la atestación](./attestation_schematic.png)

## Recompensas {#rewards}

Se recompensa a los validadores por presentar certificaciones. La recompensa de la certificación depende de las banderas de participación (fuente, objetivo y cabeza), la recompensa base y la tasa de participación.

Cada una de las banderas de participación puede ser verdadera o falsa, dependiendo de la certificación presentada y de su retraso en la inclusión.

La mejor situación se produce cuando las tres banderas son ciertas, en cuyo caso un validador ganaría (por bandera correcta):

`recompensa += recompensa base * peso de la bandera * tasa de atestación de la bandera / 64`

La tasa de certificación de la bandera se mide utilizando la suma de los saldos efectivos de todos los validadores de certificación para la bandera dada, en comparación con el saldo efectivo del activo total.

### Recompensa base {#base-reward}

La recompensa de base se calcula de acuerdo con el número de validadores de certificación y sus saldos de ether efectivo en participación:

`recompensa base = saldo efectivo del validador x 2^6 / SQRT(saldo efectivo de todos los validadores activos)`

#### Retraso de inclusión {#inclusion-delay}

En el momento en que los validadores votaron por la cabecera de la cadena (`bloque n`), el `bloque n+1` aún no se había propuesto. Por lo tanto, las atestaciones se incluyen de forma natural **un bloque después**, por lo que todas las atestaciones que votaron que el `bloque n` era la cabecera de la cadena se incluyeron en el `bloque n+1` y el **retraso de inclusión** es de 1. Si el retraso de inclusión se duplica a dos ranuras, la recompensa de certificación se reduce a la mitad, porque para calcular la recompensa de certificación, la recompensa de base se multiplica por el recíproco del retraso de inclusión.

### Escenarios de atestación {#attestation-scenarios}

#### Falta del validador votante {#missing-voting-validator}

Los validadores tienen un máximo de 1 época para presentar su certificación. Si la certificación se perdió en la época 0, pueden presentarla con un retraso de inclusión en la época 1.

#### Falta del agregador {#missing-aggregator}

Hay 16 agregadores por época en total. Además, los validadores aleatorios se suscriben a **dos subredes durante 256 épocas** y sirven como respaldo en caso de que falten los agregadores.

#### Falta del proponente de bloque {#missing-block-proposer}

Tenga en cuenta que en algunos casos un agregador afortunado también puede convertirse en el proponente de bloques. Si la certificación no se incluyó porque el proponente del bloque ha desaparecido, el siguiente proponente del bloque elegiría la certificación añadida y la incluiría en el siguiente bloque. Sin embargo, el **retraso de inclusión** aumentará en uno.

## Lecturas adicionales {#further-reading}

- [Atestaciones en la especificación de consenso anotada de Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Atestaciones en eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_¿Conoce algún recurso de la comunidad que le haya sido de ayuda? ¡Edite esta página y agréguela!_
