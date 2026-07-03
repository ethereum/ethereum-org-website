---
title: Gas y tarifas
metaTitle: "Gas y tarifas de Ethereum: descripción técnica general"
description: "Aprenda sobre las tarifas de gas de Ethereum, cómo se calculan y su papel en la seguridad de la red y el procesamiento de transacciones."
lang: es
---

El gas es esencial para la red [Ethereum](/). Es el combustible que le permite operar, de la misma manera que un automóvil necesita gasolina para funcionar.

## Requisitos previos {#prerequisites}

Para comprender mejor esta página, le recomendamos que primero lea sobre las [transacciones](/developers/docs/transactions/) y la [EVM](/developers/docs/evm/).

## ¿Qué es el gas? {#what-is-gas}

El gas se refiere a la unidad que mide la cantidad de esfuerzo computacional requerido para ejecutar operaciones específicas en la red Ethereum.

Dado que cada transacción de Ethereum requiere recursos computacionales para ejecutarse, esos recursos deben pagarse para garantizar que Ethereum no sea vulnerable al spam y no pueda quedarse atascado en bucles computacionales infinitos. El pago por la computación se realiza en forma de una tarifa de gas.

La tarifa de gas es **la cantidad de gas utilizada para realizar alguna operación, multiplicada por el costo por unidad de gas**. La tarifa se paga independientemente de si una transacción tiene éxito o falla.

![A diagram showing where gas is needed in EVM operations](./gas.png)
_Diagrama adaptado de [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Las tarifas de gas deben pagarse en la moneda nativa de Ethereum, el ether (ETH). Los precios del gas generalmente se cotizan en Gwei, que es una denominación de ETH. Cada Gwei es igual a una milmillonésima parte de un ETH (0.000000001 ETH o 10<sup>-9</sup> ETH).

Por ejemplo, en lugar de decir que su gas cuesta 0.000000001 ether, puede decir que su gas cuesta 1 Gwei.

La palabra 'Gwei' es una contracción de 'giga-wei', que significa 'mil millones de Wei'. Un Gwei es igual a mil millones de Wei. El Wei en sí (llamado así por [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), creador de [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) es la unidad más pequeña de ETH.

## ¿Cómo se calculan las tarifas de gas? {#how-are-gas-fees-calculated}

Puede establecer la cantidad de gas que está dispuesto a pagar cuando envía una transacción. Al ofrecer una cierta cantidad de gas, está pujando para que su transacción se incluya en el siguiente bloque. Si ofrece muy poco, es menos probable que los validadores elijan su transacción para su inclusión, lo que significa que su transacción puede ejecutarse tarde o no ejecutarse en absoluto. Si ofrece demasiado, podría desperdiciar algo de ETH. Entonces, ¿cómo puede saber cuánto pagar?

El gas total que paga se divide en dos componentes: la `base fee` y la `priority fee` (tarifa de prioridad).

La `base fee` es establecida por el protocolo: debe pagar al menos esta cantidad para que su transacción se considere válida. La `priority fee` es una tarifa de prioridad que agrega a la tarifa base para que su transacción sea atractiva para los validadores y la elijan para su inclusión en el siguiente bloque.

Una transacción que solo paga la `base fee` es técnicamente válida, pero es poco probable que se incluya porque no ofrece ningún incentivo a los validadores para elegirla sobre cualquier otra transacción. La tarifa de `priority` 'correcta' está determinada por el uso de la red en el momento en que envía su transacción: si hay mucha demanda, es posible que deba establecer su tarifa de `priority` más alta, pero cuando hay menos demanda puede pagar menos.

Por ejemplo, digamos que Jordan tiene que pagarle a Taylor 1 ETH. Una transferencia de ETH requiere 21.000 unidades de gas, y la tarifa base es de 10 Gwei. Jordan incluye una tarifa de prioridad de 2 Gwei.

La tarifa total ahora sería igual a:

`units of gas used * (base fee + priority fee)`

donde la `base fee` es un valor establecido por el protocolo y la `priority fee` es un valor establecido por el usuario como una tarifa de prioridad para el validador.

p. ej., `21,000 * (10 + 2) = 252,000 gwei` (0.000252 ETH).

Cuando Jordan envía el dinero, se deducirán 1.000252 ETH de la cuenta de Jordan. A Taylor se le acreditará 1.0000 ETH. El validador recibe la tarifa de prioridad de 0.000042 ETH. La `base fee` de 0.00021 ETH se quema.

### Tarifa base {#base-fee}

Cada bloque tiene una tarifa base que actúa como un precio de reserva. Para ser elegible para su inclusión en un bloque, el precio ofrecido por gas debe ser al menos igual a la tarifa base. La tarifa base se calcula independientemente del bloque actual y, en su lugar, está determinada por los bloques anteriores, lo que hace que las tarifas de transacción sean más predecibles para los usuarios. Cuando se crea el bloque, esta **tarifa base se "quema"**, eliminándola de la circulación.

La tarifa base se calcula mediante una fórmula que compara el tamaño del bloque anterior (la cantidad de gas utilizada para todas las transacciones) con el tamaño objetivo (la mitad del límite de gas). La tarifa base aumentará o disminuirá en un máximo del 12,5 % por bloque si el tamaño del bloque objetivo está por encima o por debajo del objetivo, respectivamente. Este crecimiento exponencial hace que sea económicamente inviable que el tamaño del bloque se mantenga alto indefinidamente.

| Número de bloque | Gas incluido | Aumento de tarifa | Tarifa base actual |
| ------------ | -----------: | -----------: | ---------------: |
| 1            |          18M |           0% |         100 Gwei |
| 2            |          36M |           0% |         100 Gwei |
| 3            |          36M |        12.5% |       112.5 Gwei |
| 4            |          36M |        12.5% |       126.6 Gwei |
| 5            |          36M |        12.5% |       142.4 Gwei |
| 6            |          36M |        12.5% |       160.2 Gwei |
| 7            |          36M |        12.5% |       180.2 Gwei |
| 8            |          36M |        12.5% |       202.7 Gwei |

En la tabla anterior, se demuestra un ejemplo utilizando 36 millones como límite de gas. Siguiendo este ejemplo, para crear una transacción en el bloque número 9, una billetera le informará al usuario con certeza que la **tarifa base máxima** que se agregará al siguiente bloque es `current base fee * 112.5%` o `202.7 gwei * 112.5% = 228.1 gwei`.

También es importante tener en cuenta que es poco probable que veamos picos prolongados de bloques llenos debido a la velocidad a la que aumenta la tarifa base antes de un bloque lleno.

| Número de bloque | Gas incluido | Aumento de tarifa | Tarifa base actual |
| ------------ | -----------: | -----------: | ---------------: |
| 30           |          36M |        12.5% |      2705.6 Gwei |
| ...          |          ... |        12.5% |              ... |
| 50           |          36M |        12.5% |     28531.3 Gwei |
| ...          |          ... |        12.5% |              ... |
| 100          |          36M |        12.5% |  10302608.6 Gwei |

### Tarifa de prioridad {#priority-fee}

La tarifa de prioridad incentiva a los validadores a maximizar el número de transacciones en un bloque, limitados únicamente por el límite de gas del bloque. Sin tarifas de prioridad, un validador racional podría incluir menos transacciones, o incluso cero, sin ninguna penalización directa en la capa de ejecución o la capa de consenso, ya que las recompensas de staking son independientes de cuántas transacciones haya en un bloque. Además, las tarifas de prioridad permiten a los usuarios superar las ofertas de otros para obtener prioridad dentro del mismo bloque, lo que indica urgencia de manera efectiva. 

### Tarifa máxima {#maxfee}

Para ejecutar una transacción en la red, los usuarios pueden especificar un límite máximo que están dispuestos a pagar para que se ejecute su transacción. Este parámetro opcional se conoce como `maxFeePerGas`. Para que se ejecute una transacción, la tarifa máxima debe superar la suma de la tarifa base y la tarifa de prioridad. Al remitente de la transacción se le reembolsa la diferencia entre la tarifa máxima y la suma de la tarifa base y la tarifa de prioridad.

### Tamaño del bloque {#block-size}

Cada bloque tiene un tamaño objetivo de la mitad del límite de gas actual, pero el tamaño de los bloques aumentará o disminuirá de acuerdo con la demanda de la red, hasta que se alcance el límite del bloque (2 veces el tamaño del bloque objetivo). El protocolo logra un tamaño de bloque promedio de equilibrio en el objetivo a través del proceso de _tâtonnement_ (tanteo). Esto significa que si el tamaño del bloque es mayor que el tamaño del bloque objetivo, el protocolo aumentará la tarifa base para el siguiente bloque. De manera similar, el protocolo disminuirá la tarifa base si el tamaño del bloque es menor que el tamaño del bloque objetivo.

La cantidad en la que se ajusta la tarifa base es proporcional a qué tan lejos está el tamaño del bloque actual del objetivo. Este es un cálculo lineal desde -12,5 % para un bloque vacío, 0 % en el tamaño objetivo, hasta +12,5 % para un bloque que alcanza el límite de gas. El límite de gas puede fluctuar con el tiempo en función de las señales de los validadores, así como a través de actualizaciones de la red. Puede [ver los cambios en el límite de gas a lo largo del tiempo aquí](https://eth.blockscout.com/stats/averageGasLimit?interval=threeMonths).

[Más sobre bloques](/developers/docs/blocks/)

### Cálculo de las tarifas de gas en la práctica {#calculating-fees-in-practice}

Puede indicar explícitamente cuánto está dispuesto a pagar para que se ejecute su transacción. Sin embargo, la mayoría de los proveedores de billeteras establecerán automáticamente una tarifa de transacción recomendada (tarifa base + tarifa de prioridad recomendada) para reducir la cantidad de complejidad que recae sobre sus usuarios.

## ¿Por qué existen las tarifas de gas? {#why-do-gas-fees-exist}

En resumen, las tarifas de gas ayudan a mantener segura la red Ethereum. Al requerir una tarifa por cada computación ejecutada en la red, evitamos que los malos actores envíen spam a la red. Para evitar bucles infinitos accidentales u hostiles u otro desperdicio computacional en el código, se requiere que cada transacción establezca un límite de cuántos pasos computacionales de ejecución de código puede usar. La unidad fundamental de computación es el "gas".

Aunque una transacción incluye un límite, cualquier gas no utilizado en una transacción se devuelve al usuario (p. ej., se devuelve `max fee - (base fee + tip)`).

![Diagram showing how unused gas is refunded](../transactions/gas-tx.png)
_Diagrama adaptado de [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## ¿Qué es el límite de gas? {#what-is-gas-limit}

El límite de gas se refiere a la cantidad máxima de gas que está dispuesto a consumir en una transacción. Las transacciones más complicadas que involucran [contratos inteligentes](/developers/docs/smart-contracts/) requieren más trabajo computacional, por lo que requieren un límite de gas más alto que un pago simple. Una transferencia estándar de ETH requiere un límite de gas de 21.000 unidades de gas.

Por ejemplo, si pone un límite de gas de 50.000 para una transferencia simple de ETH, la EVM consumiría 21.000 y se le devolverían los 29.000 restantes. Sin embargo, si especifica muy poco gas, por ejemplo, un límite de gas de 20.000 para una transferencia simple de ETH, la transacción fallará durante la fase de validación. Será rechazada antes de ser incluida en un bloque y no se consumirá gas. Por otro lado, si una transacción se queda sin gas durante la ejecución (p. ej., un contrato inteligente agota todo el gas a la mitad), la EVM revertirá cualquier cambio, pero todo el gas proporcionado se consumirá por el trabajo realizado.

## ¿Por qué las tarifas de gas pueden llegar a ser tan altas? {#why-can-gas-fees-get-so-high}

Las altas tarifas de gas se deben a la popularidad de Ethereum. Si hay demasiada demanda, los usuarios deben ofrecer montos de tarifa de prioridad más altos para intentar superar las transacciones de otros usuarios. Una tarifa de prioridad más alta puede hacer que sea más probable que su transacción ingrese al siguiente bloque. Además, las aplicaciones de contratos inteligentes más complejas podrían estar realizando muchas operaciones para respaldar sus funciones, lo que hace que consuman mucho gas.

## Iniciativas para reducir los costos de gas {#initiatives-to-reduce-gas-costs}

Las [actualizaciones de escalabilidad](/roadmap/) de Ethereum deberían abordar en última instancia algunos de los problemas de las tarifas de gas, lo que, a su vez, permitirá a la plataforma procesar miles de transacciones por segundo y escalar a nivel mundial.

El escalado de capa 2 (l2) es una iniciativa principal para mejorar en gran medida los costos de gas, la experiencia del usuario y la escalabilidad.

[Más sobre el escalado de capa 2 (l2)](/developers/docs/scaling/#layer-2-scaling)

## Monitoreo de las tarifas de gas {#monitoring-gas-fees}

Si desea monitorear los precios del gas, para poder enviar su ETH por menos, puede usar muchas herramientas diferentes, como:

- [Etherscan](https://etherscan.io/gastracker) _Estimador del precio del gas de transacciones_
- [Blockscout](https://eth.blockscout.com/gas-tracker) _Estimador de código abierto del precio del gas de transacciones_
- [ETH Gas Tracker](https://www.ethgastracker.com/) _Monitoree y rastree los precios del gas de Ethereum y la capa 2 (l2) para reducir las tarifas de transacción y ahorrar dinero_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Extensión de Chrome para la estimación de gas que admite tanto transacciones heredadas de Tipo 0 como transacciones EIP-1559 de Tipo 2._
- [Cryptoneur Gas Fees Calculator](https://cryptoneur.xyz/en/gas-fees-calculator) _Calcule las tarifas de gas en su moneda local para diferentes tipos de transacciones en la Red principal, Arbitrum y Polygon._

## Herramientas relacionadas {#related-tools}

- [Blocknative's Gas Platform](https://www.blocknative.com/gas) _API de estimación de gas impulsada por la plataforma global de datos de mempool de Blocknative_
- [Gas Network](https://gas.network) Oráculos de gas en cadena. Soporte para más de 35 cadenas. 

## Lecturas adicionales {#further-reading}

- [Explicación del gas de Ethereum](https://defiprime.com/gas)
- [Reducción del consumo de gas de sus contratos inteligentes](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Estrategias de optimización de gas para desarrolladores](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [Documentación de EIP-1559](https://eips.ethereum.org/EIPS/eip-1559).
- [Recursos de EIP-1559 de Tim Beiko](https://hackmd.io/@timbeiko/1559-resources)
- [EIP-1559: Separando los mecanismos de los memes](https://web.archive.org/web/20241126205908/https://research.2077.xyz/eip-1559-separating-mechanisms-from-memes)
