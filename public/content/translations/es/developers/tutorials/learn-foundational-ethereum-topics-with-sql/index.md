---
title: Aprenda temas fundamentales de Ethereum con SQL
description: Este tutorial ayudará a los lectores a comprender conceptos fundamentales de Ethereum, incluyendo transacciones, bloques y gas consultando datos en cadena con Structured Query Language (SQL).
author: "Paul Apivat"
tags:
  - "SQL"
  - "Consultas"
  - "Transacciones"
skill: beginner
lang: es
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

Muchos tutoriales de Ethereum están dirigidos a desarrolladores, pero hacen falta recursos educativos para analistas de datos o para personas que quieren ver datos en cadena sin tener que ejecutar un cliente o nodo.

Este tutorial ayuda a los lectores a entender los conceptos fundamentals de Ethereum, incluyendo transacciones, bloques y gas consultando datos en la cadena con SQL a través de una interfaz proporcionada por [Dune Analytics](https://dune.xyz/home).

Los datos en cadena pueden ayudarnos a entender Ethereum, la red y como una economía para el poder computacional, y deberían servir como una base para entender los cambios a los que se enferenta Ethereum hoy en día (p. ej., el aumento de los costos de gas) y, lo que resulta más importante, discusiones en torno a las soluciones de escalabilidad.

### Transacciones {#transactions}

El recorrido de un usuario en Ethereum comienza con la inicialización de una cuenta controlada por el usuario o de una entidad con un saldo de ETH. Hay dos tipos de cuentas: las controladas por los usuarios o un contrato inteligente (ver [ethereum.org](/developers/docs/accounts/)).

Cualquier cuenta puede verse en un explorador de bloques como [Etherscan](https://etherscan.io/). Los exploradores de bloques son un portal a los datos de Ethereum. Muestran en tiempo real datos en bloques, transacciones, mineros, cuentas y otra actividad en la cadena (ver [aquí](/developers/docs/data-and-analytics/block-explorers/)).

De todos modos, un usuario podría desear consultar los datos directamente para conciliar la información brindada por los exploradores de bloques externos. [Dune Analytics](https://duneanalytics.com/) proporciona esta capacidad a cualquier persona con algún conocimiento de SQL.

Para referencia, la cuenta de contrato inteligente para la Ethereum Foundation (EF) puede consultarse en [Etherscan](https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae).

Una cosa a tener en cuenta es que todas las cuentas, incluidas las de la FE, tienen una dirección pública que se puede utilizar para enviar y recibir transacciones.

El saldo de la cuenta en Etherscan comprende transacciones regulares y transacciones internas. Las transacciones internas, a pesar de su nombre, no son _transacciones reales_ que cambian el estado de la cadena. Por el contrario, son transferencias de valor iniciadas al ejecutar un contrato ([fuente](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Dado que las transacciones internas no tienen firma, **no** se incluyen en la cadena de bloques y no se pueden consultar con Dune Analytics.

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

Esto generará la misma información que se proporciona en la página de transacciones de Etherscan. A modo de comparación, estas son las dos fuentes:

#### Etherscan {#etherscan}

![](./etherscan_view.png)

[Página de contrato de la EF en Etherscan.](https://etherscan.io/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![](./dune_view.png)

Puede encontrar el panel [aquí](https://duneanalytics.com/paulapivat/Learn-Ethereum). Haga clic en la tabla para ver la consulta (también ver arriba).

### Desglose de transacciones {#breaking_down_transactions}

Una transacción enviada incluye varios tipos de datos, incluyendo ([fuente](/developers/docs/transactions/)):

- **Receptor**: La dirección receptora (se consulta como "to")
- **Firma**: Mientras que las claves privadas del emisor firman una transacción, lo que podemos consultar con SQL es la dirección pública del emisor ("from").
- **Valor**: Esta es la cantidad de ETH transferida (ver la columna `ether`).
- **Datos**: Esta es la información arbitraria que ha sido hasheada (ver la columna `data`).
- **gasLimit**: Cantidad máxima de unidades de gas que puede consumir la transacción. Las unidades de gas representan pasos computacionales.
- **maxPriorityFeePerGas**: La cantidad máxima de gas que se incluirá como recompensa para el minero.
- **maxFeePerGas**: La cantidad máxima de gas que se pagará por la transacción (incluye el baseFeePerGas y el maxPriorityFeePerGas).

Podemos consultar estos datos específicos para transacciones a la dirección pública de la Ethereum Foundation:

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

Cada transacción cambiará el estado de la máquina virtual de Ethereum ([EVM](/developers/docs/evm/)) ([fuente](/developers/docs/transactions/)). Las transacciones son transmitidas a la red para ser verificadas e incluidas en un bloque. Cada transacción es asociada con un número de bloque. Para ver la información, podemos consultar un número de bloque específico: 12396854 (el bloque más reciente entre las transacciones de la Ethereum Foundation al momento de escribir este artículo, 5/11/21).

Además, cuando consultamos los dos siguientes bloques, podemos ver que cada bloque contiene el hash del anterior (hash principal o parent hash), lo que ilustra cómo se forma la cadena de bloques.

Cada bloque contiene una referencia a su bloque principal o parent. Esto se ve a continuación entre las columnas `hash` y `parent_hash` ([fuente](/developers/docs/blocks/)):

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

Podemos examinar un bloque consultando el momento, el número de bloque, la dificultad, el hash, el parent hash y el nonce.

Lo único no cubierto por esta consulta es la _lista de transacción_, que requiere una consulta por separado abajo y la _raíz de estado_. Un nodo completo o archivado almacenará todas las transacciones y transiciones de estado, permitiendo a los clientes consultar el estado de la cadena en cualquier momento. Como esto requiere gran espacio de almacenamiento, podemos separar la información de la cadena de la información del estado:

- Información de la cadena (listado de bloques, transacciones)
- Información de estado (resultado del estado de transición de cada transacción)

La raíz de estado entra en el segundo grupo y es información _implícita_ (no almacenada en la cadena), mientras que la información de la cadena es explícita y se almacena en la propia cadena ([fuente](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

Para este tutorial, nos enfocaremos en la información en la cadena que _puede_ ser consultada con SQL a través de Dune Analytics.

Como se mencionó anteriormente, cada bloque contiene un listado de transacciones, que podemos consultar filtrando por bloque específico. Probaremos el bloque más reciente, 12396854:

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

Aquí está el resultado de la consulta de SQL en Dune:

![](./list_of_txn.png)

La adición de este único bloque a la cadena cambia el estado de la máquina virtual de Ethereum ([EVM](/developers/docs/evm/)). Centenares de transacciones, a veces decenas, son verificadas a la vez. En este caso específico, se incluyeron 222 transacciones.

Para ver cuántas fueron exitosas, agregaríamos otro filtro para contar transacciones exitosas:

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

Para ver que se produce un bloque aproximadamente cada 15 segundos, podemos tomar el número de segundos en un día (86.400) dividido por 15 para obtener un promedio estimado del número de bloques por día (~ 5760).

El cuadro de bloques de Ethereum producidos por día (2016 - presente) es:

![](./daily_blocks.png)

El número promedio de bloques producidos a diario durante este periodo es ~5,874:

![](./avg_daily_blocks.png)

Las consultas son:

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

El número promedio de bloques producidos por día desde 2016 es ligeramente superior: 5874. Alternativamente, dividir 86.400 segundos por 5874 bloques promedio da como resultado 14,7 segundos o aproximadamente un bloque cada 15 segundos.

### Gas {#gas}

Los bloques están limitados en tamaño. El tamaño máximo de bloque es dinámico y varía de acuerdo a la demanda de la red entre 12.500.000 y 25.000.000 unidades. Los límites son necesarios para prevenir arbitrariamente los tamaños grandes de bloques, que ponen presión en los nodos completos en términos de espacio en disco y requisitos de velocidad ([fuente](/developers/docs/blocks/)).

Una manera de conceptualizar el límite de gas de un bloque es pensar en esto como el **suministro** de espacio de bloque disponible en el que se agrupan las transacciones. El límite de gas de los bloques puede ser consultado y visualizado desde 2016 hasta el presente:

![](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Luego está el gas real utilizado a diario para pagar por la computación realizada en la cadena de Ethereum (ej: enviar transacciones, llamar a un contrato inteligente, mintear un NFT). Esta es la **demanda** para el espacio de bloques disponible en Ethereum:

![](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

También podemos yuxtaponer estos dos gráficos para ver cómo **la demanda y el suministro** se alínean:

![gas_demand_supply](./gas_demand_supply.png)

Así, podemos comprender los precios del gas como una función de la demanda de espacio de bloques de Ethereum dado un suministro disponible.

Finalmente, puede que querramos consultar el promedio diario del precio del gas para la cadena de Ethereum; sin embargo, hacerlo puede resultar en un tiempo especialmente largo de consulta, por lo que filtraremos nuestra consulta a la cantidad promedio de gas pagado por transacción por la Ethereum Foundation.

![](./ef_daily_gas.png)

Podemos ver los precios de gas pagados por todas las transacciones hechas a la dirección de la Ethereum Foundation a lo largo de los años. Esta es la consulta:

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

Con este tutorial, podemos entender conceptos fundamentales de Ethereum y cómo funciona la cadena de bloques de Ethereum consultando y obteniendo una idea de datos en cadena.

El panel que contiene todo el código utilizado en este tutorial se puede encontrar [aquí](https://duneanalytics.com/paulapivat/Learn-Ethereum).

Para más usos de datos para explorar web3 [encuéntreme en Twitter](https://twitter.com/paulapivat).
