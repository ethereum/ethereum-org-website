---
title: Gas y tarifas
description:
lang: es
---

El gas es esencial para la red de Ethereum. Se trata del combustible que le permite operar, de la misma manera que un vehículo necesita gasolina para funcionar.

## Requisitos previos {#prerequisites}

Para comprender mejor esta página, le recomendamos que en primer lugar obtenga información sobre [las transacciones](/developers/docs/transactions/) y [la EVM](/developers/docs/evm/).

## ¿Qué es el gas? {#what-is-gas}

El gas hace referencia a la unidad que mide la cantidad de esfuerzo computacional requerida para ejecutar operaciones específicas en la red de Ethereum.

Dado que la ejecución de cada transacción en Ethereum requiere recursos informáticos, dichos recursos tienen que ser de pago para así poder asegurar que Ethereum no sea vulnerable al correo basura y no se pueda quedar atascado en un lapso computacional infinito. El pago por este recurso computacional se realiza en forma de tarifa de gas.

La tarifa de gas es ** la cantidad de gas usado para hacer alguna operación, multiplicado por el coste unitario del gas**. Al margen de que la transacción se procese de forma exitosa o fallida, se paga igualmente una tarifa.

![Un diagrama que muestra dónde se precisa el gas en las operaciones de la EVM.](./gas.png) _Diagrama adaptado de [Ethereum EVM ilustrado](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

La tarifa de gas tiene que pagarse en la moneda nativa de Ethereum, el ether (ETH). El precio del gas se suele expresar en gwei, el cual es una denominación del ETH. Cada gwei equivale a 1 billonésima fracción de ETH (0,000000001 ETH o 10<sup>-9</sup> ETH).

Por ejemplo, en lugar de decir que su gas cuesta 0,000000001 ether, puede decir que su gas cuesta 1 gwei.

La palabra «gwei» es una contracción de «giga-wei», que significa «mil millones de weis». Un gwei equivale a mil millones de weis. Wei (nombre acuñado en honor a [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), el creador de [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) es la unidad más pequeña de ETH.

## ¿Cómo se calculan las tarifas de gas? {#how-are-gas-fees-calculated}

Se puede establecer la cantidad de gas que está dispuesto a pagar cuando envíe una transacción. Al ofrecer una cierta cantidad de gas, está pujando para que su transacción se incluya en el siguiente bloque. Si su oferta es insignificante, los validadores estarán menos dispuestos a optar por incluir su transacción, lo que significa que su transacción tal vez se ejecute luego, o no se ejecute del todo. Si su oferta es demasiado elevada, tal vez desperdicie algo de ETH. Entonces, ¿cómo puede saber cuánto debe pagar?

La cantidad total de gas que paga se divide entre dos componentes: la `tarifa base` y la `tarifa prioritaria` (propina).

La `tarifa base` la establece el protocolo, indicándole que al menos tiene que pagar esa cantidad para que su transacción se considere como válida. La `tarifa prioritaria` es la propina que le añade a la tarifa base para que los validadores vean de forma atractiva su transacción y acaben por incluirla en el siguiente bloque.

Una transacción que solo pague la `tarifa base` es técnicamente válida, pero es improbable que se incluya, ya que el validador no ve ningún incentivo para escogerla por encima de cualquier otra transacción. La `tarifa` «correcta» prioritaria viene determinada por el uso de la red en el momento de enviar la transacción: si hay mucha demanda, entonces debería pensar en establecer una `tarifa` prioritaria más alta, pero si hay poca demanda, puede pagar menos.

Por ejemplo, digamos que Jordan tiene que pagarle 1 ETH a Taylor. Una transferencia de ETH requiere 21.000 unidades de gas, y la tarifa base es 10 gwei. Jordan incluye una propina de 2 gwei.

La tarifa total equivale a:

`unidades de gas usadas * (tarifa básica + tarifa por prioridad)`

donde el valor de la `tarifa base` viene establecido por el protocolo y el valor de la `tarifa prioritaria` la establece el propio usuario como propina para el validador.

es decir: `21.000 * (10 + 2) = 252.000 gwei` (0,000252 ETH).

Cuando Jordan envía el dinero, se deducirán 1,00231 ETH de la cuenta de Jordan. A Taylor se le abonarán 1,0000 ETH. El validador recibe una propina de 0,000042 ETH. La `tarifa base` de 0,00021 ETH se consume.

### Tarifa base {#base-fee}

Cada bloque tiene una tarifa base que funciona como precio de reserva. Para que se pueda incluir en un bloque, el precio por gas ofrecido debe ser por lo menos igual a la tarifa base. La tarifa base se calcula independientemente del bloque actual y viene a su vez determinada por los bloques anteriores a este, lo cual hace que las tarifas por transacción sean más predecibles para los usuarios. Cuando se crea el bloque, esta **tarifa base se «consume»**, es decir, se elimina de la circulación.

La tarifa base se calcula mediante una fórmula que compara el tamaño del bloque anterior (la cantidad de gas usado para todas las transacciones) con el tamaño esperado. La tarifa base aumentará un máximo de 12,5 % por bloque si se supera el tamaño esperado del mismo. Este crecimiento exponencial hace que no sea económicamente rentable que el tamaño de los bloques permanezca elevado indefinidamente.

| Número de bloque | Gas incluido | Incremento de la tarifa | Tarifa de base actual |
| ---------------- | ------------:| -----------------------:| ---------------------:|
| 1                |         15 M |                     0 % |              100 gwei |
| 2                |         30 M |                     0 % |              100 gwei |
| 3                |         30 M |                  12,5 % |            112,5 gwei |
| 4                |         30 M |                  12,5 % |            126,6 gwei |
| 5                |         30 M |                  12,5 % |            142,4 gwei |
| 6                |         30 M |                  12,5 % |            160,2 gwei |
| 7                |         30 M |                  12,5 % |            180,2 gwei |
| 8                |         30 M |                  12,5 % |            202,7 gwei |

Siguiendo la tabla anterior, para crear una transacción en el bloque número 9, una cartera informará al usuario con certeza de que la **tarifa de base máxima** que se añadirá al siguiente bloque es la `tarifa de base corriente * 112,5 %` o `202,7 gwei * 112,5 % = 228,1 gwei`.

También cabe saber que es improbable que veamos un pico de incremento de bloques llenos, debido a la velocidad con que la tarifa base aumenta antes de que este se llene.

| Número de bloque | Gas incluido | Incremento de comisión | Comisión base actual |
| ---------------- | ------------:| ----------------------:| --------------------:|
| 30               |         30 M |                 12,5 % |         2.705,6 gwei |
| ...              |          ... |                 12,5 % |                  ... |
| 50               |         30 M |                 12,5 % |        28.531,3 gwei |
| ...              |          ... |                 12,5 % |                  ... |
| 100              |         30 M |                 12,5 % |    10.302.608,6 gwei |

### Tarifa prioritaria (propinas) {#priority-fee}

La tarifa prioritaria (propina) incentiva al validador a incluir una transacción en el bloque. Sin propinas, los validadores encontrarían económicamente viable el minar bloques vacíos, dado que ellos recibirían la misma recompensa por bloque. Una pequeña propina le daría un incentivo mínimo al validador para que incluya una transacción. Para que una transacción se ejecute de forma preferencial por encima de otra transacción en el mismo bloque, se puede añadir una propina alta para superar las ofertas de las demás transacciones.

### Tarifa máxima {#maxfee}

Para ejecutar una transacción en la red, los usuarios pueden especificar la máxima cantidad que están dispuestos a pagar para que su transacción se ejecute. Este parámetro opcional se conoce como `maxFeePerGas`. Para que una transacción se ejecute, la tarifa máxima debe ser superior a la suma de la tarifa de base y la propina. Al emisor de la transacción se le reembolsa la diferencia entre la tarifa máxima y la suma de la tarifa de base y la propina.

### Tamaño del bloque {#block-size}

Cada bloque tiene un tamaño esperado de 15 millones de gas, pero el tamaño de los bloques aumentará o disminuirá de acuerdo con la demanda de la red, hasta alcanzar el límite por bloque de 30 millones de gas (el doble del tamaño esperado del bloque). El protocolo alcanza un tamaño de equilibrio del bloque en torno a 15 millones de media, a través del proceso de _«tâtonnement»_ (o tanteo). Esto significa que si el tamaño del bloque es mayor que el esperado, el protocolo aumentará la tarifa de base para el siguiente bloque. De manera similar, el protocolo disminuirá la tarifa de base si el tamaño del bloque es menor que el tamaño esperado. La cantidad que se toma de referencia para ajustar la tarifa de base es proporcional a la diferencia entre el tamaño del bloque actual y el tamaño esperado. [Más información sobre bloques](/developers/docs/blocks/).

### Cómo calcular las tarifas de gas en la práctica {#calculating-fees-in-practice}

Puede declarar explícitamente cuánto está dispuesto a pagar para hacer que su transacción se ejecute. Sin embargo, la mayoría de las carteras establecerán automáticamente una tarifa de transacción recomendada (tarifa básica + tarifa por prioridad recomendada) para solventar la complejidad de la transacción.

## ¿Por qué existen comisiones de gas? {#why-do-gas-fees-exist}

En resumen, las comisiones de gas ayudan a mantener la red de Ethereum segura. Al requerir una tarifa para cada cálculo computacional ejecutado en la red, evitamos que algunas personas envíen correo basura a la red. Para prevenir bucles infinitos provocados o accidentales u otro despilfarro informático en el código, cada transacción tiene que establecer un límite de cuántos pasos informáticos de ejecución de código puede utilizar. La unidad fundamental del cálculo computacional es el gas.

Aunque una transacción incluye un límite, cualquier gas no utilizado en una transacción se devuelve al usuario (o sea, `tarifa máxima: (tarifa de base + prop)` se devuelve).

![Diagrama que muestra la devolución del gas no utilizado.](../transactions/gas-tx.png) _Diagrama adaptado de [Ethereum EVM ilustrado](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## ¿Cuál es el límite del gas? {#what-is-gas-limit}

El límite del gas se refiere a la cantidad máxima de gas que esté dispuesto a que se consuma en una transacción. Las transacciones más complicadas que implican [contratos inteligentes](/developers/docs/smart-contracts/) requieren más trabajo informático, por eso comportan un límite de gas más alto que un pago sencillo. Una transferencia estándar de ETH requiere un límite de gas de 21.000 unidades de gas.

Por ejemplo, si se pone un límite de gas de 50.000 para una simple transferencia ETH, la EVM consumiría 21.000 y recuperaría los 29.000. Sin embargo, si especifica un límite de gas muy bajo, por ejemplo, un límite de gas de 20.000 para una transacción sencilla de ETH, la EVM consumirá sus 20.000 unidades de gas para intentar completar la transacción, pero no se completará. La EVM entonces revierte cualquier cambio, pero dado que el validador ya se hizo con 20.000 unidades de gas por su trabajo, el gas se consume.

## ¿Por qué las comisiones de gas son tan elevadas? {#why-can-gas-fees-get-so-high}

Las altas comisiones de gas se deben a la popularidad de Ethereum. Si hay mucha demanda, los usuarios deberán ofertar propinas más altas para tratar de superar las transacciones de los otros usuarios. Una propina más alta puede hacer que aumente la probabilidad de que su transacción llegue al siguiente bloque. Asimismo, los contratos inteligentes de aplicaciones más complejos realizarán más operaciones para poder soportar sus funciones, con el consiguiente e ingente consumo de gas.

## Iniciativas para reducir los costes del gas {#initiatives-to-reduce-gas-costs}

Las [mejoras de escalabilidad](/roadmap/) de Ethereum deberían abordar algunos de los problemas de las comisiones de gas, lo que a su vez permitiría que la plataforma procesase miles de transacciones por segundo y a escala global.

La escalabilidad de la capa 2 es una iniciativa primordial para mejorar de manera considerable los costes del gas, la experiencia de usuario y la escalabilidad. [Más información sobre la escalabilidad de la capa 2](/developers/docs/scaling/#layer-2-scaling).

## ¿Qué fue la actualización London/EIP-1559? {#what-was-the-london-upgrade-eip-1559}

Antes de la actualización London, Ethereum tenía bloques de tamaño fijo. En momentos de alta demanda de la red, estos bloques operaban a capacidad total. Como consecuencia, los usuarios a menudo tenían que esperar que la alta demanda disminuyera para ser incluidos en un bloque, lo cual se traducía en una deficiente experiencia de usuario. La actualización London introdujo los bloques de tamaño variable en Ethereum.

La forma en la que se calcularon las comisiones de transacción de la red de Ethereum cambió con [la actualización de Londres](/history/#london) en agosto del 2021. Antes de la actualización London, las comisiones se calculaban sin separar la tarifa `base` de la tarifa `prioritaria`, por ejemplo:

Supongamos que Alice tiene que pagar 1 ETH a Bob. En la transacción, el límite de gas es de 21.000 unidades y el precio del gas es de 200 gwei.

La tarifa total vendría a ser ` unidades de gas (límite) * Precio unitario del gas` eso es: `21.000 * 200 = 4.200.000 gwei` o 0,0042 ETH

La implementación de [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) en la actualización London hizo que el mecanismo de la tarifa de transacción fuera más complejo, aunque más predecible la tarifa de gas, dando como resultado un mercado más eficiente en términos de tarifas de transacción. Los usuarios pueden enviar transacciones con una `maxFeePerGas` correspondiente a la cantidad que están dispuestos a pagar por transacción para que esta se ejecute, sabiendo que no pagarán más que el precio de mercado por el gas (`baseFeePerGas`), y que se les reembolsará la cantidad adicional menos su propina.

Este vídeo explica el EIP-1559 y los beneficios que conlleva:

<YouTube id="MGemhK9t44Q" />

## Vigilar las tarifas de gas {#moitoring-gas-fees}

Si desea supervisar las tarifas de gas, para poder enviar sus ETH por menos, puede usar diferentes herramientas, como:

- [Etherscan](https://etherscan.io/gastracker) _Calculador de precios del gas_
- [Calculadora de gas de ETH de Blocknative](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm)_Extensión de Chrome para el cálculo de gas compatible con ambas transacciones tradicionales Tipo 0 y transacciones EIP-1559 Tipo 2._
- [Calculadora de tarifas de gas Cryptoneur](https://www.cryptoneur.xyz/gas-fees-calculator) _Calcule las tarifas de gas en su moneda local para diferentes tipos de transacciones en la red principal, Arbitrum y Polygon._

## Herramientas relacionadas {#related-tools}

- [Plataforma de gas de bloques nativos](https://www.blocknative.com/gas)_Estimación de gas API alimentada por la plataforma de datos de la zona de espera mundial de Blocknative_

## Más información {#further-reading}

- [Explicación sobre el gas de Ethereum](https://defiprime.com/gas)
- [Reducir el consumo de gas de sus contratos inteligentes](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Prueba de participación frente a prueba de trabajo](https://blockgeeks.com/guides/proof-of-work-vs-proof-of-stake/)
- [Estrategias de optimización de gas para desarrolladores](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [Documentacion sobre EIP-1559](https://eips.ethereum.org/EIPS/eip-1559).
- [ Recursos de Time Beiko sobre EIP-1559](https://hackmd.io/@timbeiko/1559-resources).
