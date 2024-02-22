---
title: Aprende temas fundamentales de Ethereum con SQL
description: Este tutorial ayudara a los lectores a comprender conceptos fundamentales de Ethereum incluyendo transacciones, bloques y gas consultando datos en cadena con el lenguaje de consulta estructurada (SQL).
author: "Paul Apivat"
tags:
  - "SQL"
  - "Consultando"
  - "Transacciones"
skill: beginner
lang: es
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

Muchos tutoriales de Ethereum estan dirigidos a desarrolladores, pero hacen falta recursos educativos para analistas de datos o para personas que quieren ver datos on-chain sin tener que ejecutar un cliente o nodo.

Este tutorial ayuda a los lectores a entender los conceptos fundamentals de Ethereum, incluyendo transacciones, bloques y gas consultando datos on-chain con el lenguaje de consulta estructurada (SQL) a través de una interfaz proporcionada por [Dune Analytics](https://dune.xyz/home).

Los datos on-chain pueden ayudarnos a entender Ethereum, la red y como una económia para el poder compuacional y debería de servir como una base para entender los cambios a los que se enferenta Ethereum a dia de hoy (p.e. el aumento de los costos de gas) y, más importante, discuciones sobre soluciones de escalabilidad.

### Transacciones {#transactions}

El viaje de un usuario en Ethereum comienza con la inicialización de una cuenta controlada por el usuario o de una entidad con un saldo ETH. Hay dos tipos de cuentas - las controladas por los usuarios o un contrato inteligente (ver [ethereum.org](/developers/docs/accounts/)).

Cualquier cuenta puede ser vista en un explorador de bloques como [Etherscan](https://etherscan.io/). Los exploradores de bloques son un portal a los datos de Ethereum. Muestran en tiempo real datos en bloques, transacciones, mineros, cuentas y otra actividad on-chain. (Ver [here](/developers/docs/data-and-analytics/block-explorers/)).

De todos modos, un usuario puede desear consultar los datos directamente para conciliar la información brindada por los exploradores de bloques externos. [Dune Analytics](https://duneanalytics.com/) proporciona esta capacidad a cualquier persona con algún conocimiento de SQL.

Para referencia, la cuenta de contrato Inteligente para la Fundación Ethereum (FE) puede consultarse en [Etherscan](https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae).

Una cosa a tener en cuenta es que todas las cuentas, incluidas las FE's, tienen una dirección pública que se puede utilizar para enviar y recibir transacciones.

El saldo de la cuenta en Etherscan comprende transacciones regulares y transacciones internas. Las transacciones internas, a pesar de su nombre, no son _ transacciones reales_ que cambian el estado de la cadena. Son transferencias de valor iniciadas al ejecutar un contrato ([source](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Dado que las transacciones internas no tienen firma, **no están** incluidas en la cadena de bloques y no se pueden consultar con Dune Analytics.

Por lo tanto, este tutorial se centrará en las transacciones regulares. Esto puede ser consultado como tal:

```sql
WITH temp_table AS (
SELECT
    hash,
    block_number,
    block_time,
    "from",
    "to",
    value / 1e18 AS ether,
    gas_used,
    gas_price / 1e9 AS gas_price_gwei
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
)
SELECT
    hash,
    block_number,
    block_time,
    "from",
    "to",
    ether,
    (gas_used * gas_price_gwei) / 1e9 AS txn_fee
FROM temp_table
```

Esto generará la misma información que se proporciona en la página de transacciones de Etherscan. A modo de comparación, aquí están las dos fuentes:

#### Etherscan {#etherscan}

![](./etherscan_view.png)

[Página de contratos de EF's en Etherscan.](https://etherscan.io/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![](./dune_view.png)

Puedes encontrar el panel [aquí](https://duneanalytics.com/paulapivat/Learn-Ethereum). Haz click en la tabla para ver el comando (también ver arriba).

### Rompiendo transacciones {#breaking_down_transactions}

Una transacción enviada incluye varias piezas de información incluyendo ([fuente](/developers/docs/transactions/)):

- **Receptor**: La dirección receptora (identificada como "to")
- **Firma**: Mientras las claves privadas del emisor firman una transacción, lo que podemos consultar con SQL es la dirección pública del emisor ("from").
- **Valor**: Esta es la cantidad de ETH transferida (ver la columna `ether`).
- **Datos**: Esta es la información arbitraria que ha sido troceada (ver la columna `data`)
- **LímiteDeGas**: Cantidad máxima de unidades de gas que puede consumir la transacción. Las unidades de gas representan pasos computacionales
- **maxPriorityFeePerGas**: la cantidad máxima de gas que se incluirá como recompensa para el minero
- **maxFeePerGas** - la cantidad máxima de gas que se pagará para la transacción (inclusiva de baseFeePerGas y maxPriorityFeePerGas)

Podemos consultas esass piezas específicas de información para transacciones a la dirección pública de la Fundación Ethereum:

```sql
SELECT
    "to",
    "from",
    value / 1e18 AS ether,
    data,
    gas_limit,
    gas_price / 1e9 AS gas_price_gwei,
    gas_used,
    ROUND(((gas_used / gas_limit) * 100),2) AS gas_used_pct
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### Bloques {#blocks}

Cada transacción cambiará el estado de la máquina virtual de Ethereum ([EVM](/developers/docs/evm/)) ([fuente](/developers/docs/transactions/)). Las transacciones son transmitidas a la red para ser verificadas e incluidas en un bloque. Cada transacción es asociada con un número de bloque. Para ver la información, podemos consultar un número de bloque en específico: 12396854 (el bloque más reciente de las transacciones realizadas por la Fundación Ethereum al momento de escribir este artículo, 11/5/21).

Además, cuando consultamos los dos siguientes bloques,podemos ver que cada bloque contiene el hash del anterior (ej: hash padre), ilustrando cómo la cadena de bloques es formada.

Cada bloque contiene una referencia a su bloque padre. Esto es mostrado abajo entre las columnas de `hash` y `parent_hash` ([fuente](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

Esta es la [consulta](https://duneanalytics.com/queries/44856/88292) en Dune Analytics:

```sql
SELECT
   time,
   number,
   hash,
   parent_hash,
   nonce
FROM ethereum."blocks"
WHERE "number" = 12396854 OR "number" = 12396855 OR "number" = 12396856
LIMIT 10
```

Podemos examinar un bloque al consultar el tiempo, número de bloque, dificultad, hash, hash padre y el nonce.

Lo único no cubierto por esta consulta es la _lista de transacción_, que requiere una consulta por separado abajo y el _estado raíz_. Un nodo completo o archivado almacenará todas las transacciones y estado de transiciones, permitiendo a los clientes consultar el estado de la cadena en cualquier momento. Porque esto requiere un espacio amplio, poremos separar la información de la cadena de la información del estado:

- Información de la cadena (listado de bloques, transacciones)
- Información de estado (resultado del estado de transición de cada transacción)

El estado de raíz falla en esto último y es información _implícita_ (no almacenada en la cadena), mientras la información de la cadena es explícita y almacenada en la propia cadena ([fuente](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

Para este tutorial, nos enfocaremos en la información en la cadena que _puede_ ser consultada con SQL a través de Dune Analytics.

Como se mencionó anteriormente, cada bloque contiene un listado de transacciones, que podemos consultar al filtrar por un bloque en específico. Probaremos el bloque más reciente, 12396854:

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

Aquí está el resultado de la consulta en Dune:

![](./list_of_txn.png)

Al este único bloque ser agregado a la cadena, cambia el estado de la máquina virtual de Ethereum ([EVM](/developers/docs/evm/)). A veces docenas o centenares de transacciones son verificadas a la vez. En este caso en específico, 222 transacciones se incluyeron.

Para ver cuántas fueron exitosas, poremos agregar otro filtro al contador de transacciones exitosas:

```sql
WITH temp_table AS (
    SELECT * FROM ethereum."transactions"
    WHERE block_number = 12396854 AND success = true
    ORDER BY block_time DESC
)
SELECT
    COUNT(success) AS num_successful_txn
FROM temp_table
```

Para el bloque 12396854, de un total de 222 transacciones, 204 fueron verificadas con éxito:

![](./successful_txn.png)

Las solicitudes de transacciones ocurren docenas de veces por segundo, pero los bloques son consignados aproximadamente una vez cada 15 segundos ([fuente](/developers/docs/blocks/)).

Para ver que hay un bloque producido aproximadamente cada 15 segundos, podemos tomar el número de segundos en un día (86400) dividido entre 15 para obtener un promedio estimado del número de bloques por día (~ 5760).

El cuadro para los bloques de Ethereum producidos por día (2016 - presente) es:

![](./daily_blocks.png)

El número promedio de bloques producidos a diario durante este periodo es ~5,874:

![](./avg_daily_blocks.png)

Las consultas Sql son:

```sql
# query to visualize number of blocks produced daily since 2016

SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1

# average number of blocks produced per day

WITH temp_table AS (
SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
)
SELECT
    AVG(block_count) AS avg_block_count
FROM temp_table
```

El número promedio de bloques producidos por día desde 2016 es ligeramente superior que el número en 5,874. Alternativamente, dividiendo 86400 secundos por 5874 bloques promedio resulta en 14.7 segundos o aproximadamente un bloque cada 15 segundos.

### Gas {#gas}

Los bloques están delimitados en tamaño. El tamaño máximo de bloque es dinámico y varía de acuerdo a la demanda de la red entre 12,500,000 y 25,000,000 unidades. Los límites son requeridos para prevenir arbitrariamente los tamaños largos de bloques, lo que estresa a los nodos completos en términos de espacio en disco y requisitos de velocidad ([fuente](/developers/docs/blocks/)).

Una manera de conceptualizar el límite de gas de un bloque es pensar en esto como el **suministro** de espacio de bloques disponible en las transacciones grupales. El límite de gas de los bloques puede ser consultado y visualizado desde 2016 hasta el presente:

![](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Entonces ahí está el gas actual utilizado a diario para pagar por la computación realizada en la cadena de Ethereum (ej: enviando transacciones, llamando un contrato inteligente, minteando un NFT). Esta es la **demanda** para el espacio de bloques disponibles en Ethereum:

![](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

También podemos yuxtaponer estos dos gráficos juntos para ver cómo **la demanda y el suministro** se alínean:

![gas_demand_supply](./gas_demand_supply.png)

Por lo tanto, podemos comprender el precio de gas como una función de demanda para el espacio de bloques de Ethereum, de acuerdo al suministro disponible.

Finalmente, puede que queramos consultar el promedio diario del precio de gas para la cadena de Ethereum, sin embargo, hacerlo puede resultar en un tiempo especialmente largo de consulta, por lo que filtraremos nuestra consulta a la cantidad promedio de gas pagado por transacción por la Fundación Ethereum.

![](./ef_daily_gas.png)

Podemos ver los precios de gas pagados por todas las transacciones hechas a la dirección de la Fundación Ethereum a lo largo de los años. Aquí está la consulta:

```sql
SELECT
    block_time,
    gas_price / 1e9 AS gas_price_gwei,
    value / 1e18 AS eth_sent
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### Resumen {#summary}

Con este tutorial, compremdemos los conceptos fundamentales de Ethereum y cómo funciona el blockchain de Ethereum consultando y obteniendo una idea de datos on-chain.

El panel que contiene todo el código utilizado en este tutorial se puede encontrar [aquí](https://duneanalytics.com/paulapivat/Learn-Ethereum).

Para más usos de datos para explorar web3 [encuéntrame en Twitter](https://twitter.com/paulapivat).
