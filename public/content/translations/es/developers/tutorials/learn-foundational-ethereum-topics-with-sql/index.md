---
title: Aprenda temas fundamentales de Ethereum con SQL
description: Este tutorial ayuda a los lectores a comprender conceptos fundamentales de Ethereum, incluyendo transacciones, bloques y gas, consultando datos en cadena con el lenguaje de consulta estructurado (SQL).
author: "Paul Apivat"
tags: ["SQL", "consultas", "transacciones", "datos y análisis"]
skill: beginner
breadcrumb: Ethereum con SQL
lang: es
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

Muchos tutoriales de Ethereum están dirigidos a desarrolladores, pero faltan recursos educativos para analistas de datos o para personas que desean ver datos en cadena sin ejecutar un cliente o nodo.

Este tutorial ayuda a los lectores a comprender conceptos fundamentales de Ethereum, incluyendo transacciones, bloques y gas, consultando datos en cadena con el lenguaje de consulta estructurado (SQL) a través de una interfaz proporcionada por [Dune Analytics](https://dune.com/).

Los datos en cadena pueden ayudarnos a comprender Ethereum, la red, y como una economía para el poder de cómputo, y deberían servir como base para comprender los desafíos que enfrenta Ethereum hoy en día (es decir, el aumento de los precios del gas) y, lo que es más importante, las discusiones en torno a las soluciones de escalado.

### Transacciones {#transactions}

El viaje de un usuario en Ethereum comienza con la inicialización de una cuenta controlada por el usuario o una entidad con un saldo de ETH. Hay dos tipos de cuentas: controladas por el usuario o un contrato inteligente (consulte [ethereum.org](/developers/docs/accounts/)).

Cualquier cuenta se puede ver en un explorador de bloques como [Etherscan](https://etherscan.io/) o [Blockscout](https://eth.blockscout.com/). Los exploradores de bloques son un portal a los datos de Ethereum. Muestran, en tiempo real, datos sobre bloques, transacciones, mineros, cuentas y otra actividad en cadena (consulte [aquí](/developers/docs/data-and-analytics/block-explorers/)).

Sin embargo, un usuario puede desear consultar los datos directamente para conciliar la información proporcionada por exploradores de bloques externos. [Dune Analytics](https://dune.com/) proporciona esta capacidad a cualquier persona con algún conocimiento de SQL.

Como referencia, la cuenta de contrato inteligente de la Fundación Ethereum (EF) se puede ver en [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe).

Una cosa a tener en cuenta es que todas las cuentas, incluida la de la EF, tienen una dirección pública que se puede usar para enviar y recibir transacciones.

El saldo de la cuenta en Etherscan comprende transacciones regulares y transacciones internas. Las transacciones internas, a pesar del nombre, no son transacciones _reales_ que cambian el estado de la cadena. Son transferencias de valor iniciadas mediante la ejecución de un contrato ([fuente](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Dado que las transacciones internas no tienen firma, **no** se incluyen en la cadena de bloques y no se pueden consultar con Dune Analytics.

Por lo tanto, este tutorial se centrará en las transacciones regulares. Esto se puede consultar de la siguiente manera:

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

Esto arrojará la misma información que se proporciona en la página de transacciones de Etherscan. Para comparar, aquí están las dos fuentes:

#### Etherscan {#etherscan}

![Screenshot of Etherscan transaction explorer view](./etherscan_view.png)

[Página del contrato de la EF en Blockscout.](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![Screenshot of a Dune Analytics query dashboard](./dune_view.png)

Puede encontrar el panel de control [aquí](https://dune.com/paulapivat/Learn-Ethereum). Haga clic en la tabla para ver la consulta (también consulte arriba).

### Desglose de transacciones {#breaking-down-transactions}

Una transacción enviada incluye varias piezas de información, entre ellas ([fuente](/developers/docs/transactions/)):

- **Destinatario**: La dirección receptora (consultada como "to")
- **Firma**: Aunque las claves privadas de un remitente firman una transacción, lo que podemos consultar con SQL es la dirección pública de un remitente ("from").
- **Valor**: Esta es la cantidad de ETH transferida (consulte la columna `ether`).
- **Datos**: Se trata de datos arbitrarios que han sido sometidos a un hash (consulte la columna `data`)
- **gasLimit** – la cantidad máxima de unidades de gas que puede consumir la transacción. Las unidades de gas representan pasos computacionales
- **maxPriorityFeePerGas** - la cantidad máxima de gas que se incluirá como tarifa de prioridad para el minero
- **maxFeePerGas** - la cantidad máxima de gas que se está dispuesto a pagar por la transacción (incluyendo baseFeePerGas y maxPriorityFeePerGas)

Podemos consultar estas piezas específicas de información para las transacciones a la dirección pública de la Fundación Ethereum:

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

Cada transacción cambiará el estado de la máquina virtual de Ethereum ([EVM](/developers/docs/evm/)) ([fuente](/developers/docs/transactions/)). Las transacciones se transmiten a la red para ser verificadas e incluidas en un bloque. Cada transacción está asociada a un número de bloque. Para ver los datos, podríamos consultar un número de bloque específico: 12396854 (el bloque más reciente entre las transacciones de la Fundación Ethereum al momento de escribir este artículo, 11/5/21).

Además, cuando consultamos los dos bloques siguientes, podemos ver que cada bloque contiene el hash del bloque anterior (es decir, el hash padre), lo que ilustra cómo se forma la cadena de bloques.

Cada bloque contiene una referencia a su bloque padre. Esto se muestra a continuación entre las columnas `hash` y `parent_hash` ([fuente](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

Aquí está la [consulta](https://dune.com/queries/44856/88292) en Dune Analytics:

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

Podemos examinar un bloque consultando el tiempo, el número de bloque, la dificultad, el hash, el hash padre y el nonce.

Lo único que esta consulta no cubre es la _lista de transacciones_, que requiere una consulta separada a continuación, y la _raíz de estado_. Un nodo completo o de archivo almacenará todas las transacciones y transiciones de estado, lo que permite a los clientes consultar el estado de la cadena en cualquier momento. Debido a que esto requiere un gran espacio de almacenamiento, podemos separar los datos de la cadena de los datos de estado:

- Datos de la cadena (lista de bloques, transacciones)
- Datos de estado (resultado de la transición de estado de cada transacción)

La raíz de estado entra en esta última categoría y son datos _implícitos_ (no almacenados en cadena), mientras que los datos de la cadena son explícitos y se almacenan en la propia cadena ([fuente](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

Para este tutorial, nos centraremos en los datos en cadena que _pueden_ consultarse con SQL a través de Dune Analytics.

Como se indicó anteriormente, cada bloque contiene una lista de transacciones, podemos consultar esto filtrando por un bloque específico. Probaremos con el bloque más reciente, 12396854:

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

Aquí está el resultado de SQL en Dune:

![Screenshot of a list of Ethereum transactions](./list_of_txn.png)

Este único bloque que se agrega a la cadena cambia el estado de la máquina virtual de Ethereum ([EVM](/developers/docs/evm/)). A veces docenas, cientos de transacciones se verifican a la vez. En este caso específico, se incluyeron 222 transacciones.

Para ver cuántas fueron realmente exitosas, agregaríamos otro filtro para contar las transacciones exitosas:

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

Para el bloque 12396854, de un total de 222 transacciones, 204 se verificaron con éxito:

![Screenshot of a successful Ethereum transaction](./successful_txn.png)

Las solicitudes de transacciones ocurren docenas de veces por segundo, pero los bloques se confirman aproximadamente una vez cada 15 segundos ([fuente](/developers/docs/blocks/)).

Para ver que se produce un bloque aproximadamente cada 15 segundos, podríamos tomar el número de segundos en un día (86400) dividido por 15 para obtener un número promedio estimado de bloques por día (~ 5760).

El gráfico de los bloques de Ethereum producidos por día (2016 - presente) es:

![Chart showing daily Ethereum block production](./daily_blocks.png)

El número promedio de bloques producidos diariamente durante este período de tiempo es de ~5,874:

![Chart showing daily Ethereum block production](./avg_daily_blocks.png)

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

El número promedio de bloques producidos por día desde 2016 está ligeramente por encima de ese número en 5,874. Alternativamente, dividir 86400 segundos por 5874 bloques promedio da como resultado 14.7 segundos o aproximadamente un bloque cada 15 segundos.

### Gas {#gas}

Los bloques tienen un tamaño limitado. El tamaño máximo del bloque es dinámico y varía según la demanda de la red entre 12,500,000 y 25,000,000 de unidades. Se requieren límites para evitar que tamaños de bloque arbitrariamente grandes ejerzan presión sobre los nodos completos en términos de espacio en disco y requisitos de velocidad ([fuente](/developers/docs/blocks/)).

Una forma de conceptualizar el límite de gas del bloque es pensar en él como la **oferta** de espacio de bloque disponible en el que agrupar transacciones. El límite de gas del bloque se puede consultar y visualizar desde 2016 hasta la actualidad:

![Chart showing average Ethereum gas limit over time](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Luego está el gas real utilizado diariamente para pagar la computación realizada en la cadena de Ethereum (es decir, enviar una transacción, llamar a un contrato inteligente, la acuñación de un NFT). Esta es la **demanda** de espacio de bloque de Ethereum disponible:

![Chart showing daily Ethereum gas used](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

También podemos yuxtaponer estos dos gráficos para ver cómo se alinean la **oferta y la demanda**:

![gas_demand_supply](./gas_demand_supply.png)

Por lo tanto, podemos entender los precios del gas como una función de la demanda de espacio de bloque de Ethereum, dada la oferta disponible.

Finalmente, es posible que deseemos consultar los precios promedio diarios del gas para la cadena de Ethereum; sin embargo, hacerlo resultará en un tiempo de consulta especialmente largo, por lo que filtraremos nuestra consulta a la cantidad promedio de gas pagada por transacción por la Fundación Ethereum.

![Chart showing Ethereum Foundation daily gas usage](./ef_daily_gas.png)

Podemos ver los precios del gas pagados por todas las transacciones realizadas a la dirección de la Fundación Ethereum a lo largo de los años. Aquí está la consulta:

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

Con este tutorial, comprendemos los conceptos fundamentales de Ethereum y cómo funciona la cadena de bloques de Ethereum al consultar y familiarizarnos con los datos en cadena.

El panel de control que contiene todo el código utilizado en este tutorial se puede encontrar [aquí](https://dune.com/paulapivat/Learn-Ethereum).

Para más usos de datos para explorar la Web3, [encuéntrame en Twitter](https://twitter.com/paulapivat).