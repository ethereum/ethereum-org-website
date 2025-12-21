---
title: Gas y tarifas
metaTitle: "Gas y tarifas de Ethereum: visión técnica"
description: Conozca las comisiones de gas en Ethereum, cómo se calculan y su papel en la seguridad de la red y el procesamiento de transacciones.
lang: es
---

El gas es esencial para la red de Ethereum. Se trata del combustible que le permite operar, de la misma manera que un vehículo necesita gasolina para funcionar.

## Requisitos previos {#prerequisites}

Para comprender mejor esta página, le recomendamos que primero lea sobre las [transacciones](/developers/docs/transactions/) y la [EVM](/developers/docs/evm/).

## ¿Qué es el gas? {#what-is-gas}

El gas hace referencia a la unidad que mide la cantidad de esfuerzo computacional requerida para ejecutar operaciones específicas en la red de Ethereum.

Dado que la ejecución de cada transacción en Ethereum requiere recursos informáticos, dichos recursos tienen que ser de pago para así poder asegurar que Ethereum no sea vulnerable al correo basura y no se pueda quedar atascado en un lapso computacional infinito. El pago por este recurso computacional se realiza en forma de tarifa de gas.

La tarifa de gas es **la cantidad de gas que se utiliza para realizar una operación, multiplicada por el coste por unidad de gas**. Al margen de que la transacción se procese de forma exitosa o fallida, se paga igualmente una tarifa.

![Un diagrama que muestra dónde se necesita gas en las operaciones de la EVM](./gas.png)
_Diagrama adaptado de [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

La tarifa de gas tiene que pagarse en la moneda nativa de Ethereum, el ether (ETH). El precio del gas se suele expresar en gwei, el cual es una denominación del ETH. Cada gwei equivale a 1 billonésima fracción de ETH (0,000000001 ETH o 10<sup>-9</sup> ETH).

Por ejemplo, en lugar de decir que su gas cuesta 0,000000001 ether, puede decir que su gas cuesta 1 gwei.

La palabra «gwei» es una contracción de «giga-wei», que significa «mil millones de weis». Un gwei equivale a mil millones de weis. El wei (llamado así por [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), creador de [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) es la unidad más pequeña de ETH.

## ¿Cómo se calculan las tarifas de gas? {#how-are-gas-fees-calculated}

Se puede establecer la cantidad de gas que está dispuesto a pagar cuando envíe una transacción. Al ofrecer una cierta cantidad de gas, está pujando para que su transacción se incluya en el siguiente bloque. Si su oferta es insignificante, los validadores estarán menos dispuestos a optar por incluir su transacción, lo que significa que su transacción tal vez se ejecute luego, o no se ejecute del todo. Si su oferta es demasiado elevada, tal vez desperdicie algo de ETH. Entonces, ¿cómo puede saber cuánto debe pagar?

La cantidad total de gas que paga se divide en dos componentes: la `tarifa base` y la `tarifa de prioridad` (propina).

La `tarifa base` la establece el protocolo; debe pagar al menos esta cantidad para que su transacción se considere válida. La `tarifa de prioridad` es una propina que se añade a la tarifa base para que su transacción resulte atractiva para los validadores, de modo que la elijan para incluirla en el siguiente bloque.

Una transacción que solo paga la `tarifa base` es técnicamente válida, pero es poco probable que se incluya porque no ofrece ningún incentivo a los validadores para que la elijan por encima de cualquier otra transacción. La tarifa de `prioridad` «correcta» se determina por el uso de la red en el momento en que envía su transacción; si hay mucha demanda, es posible que tenga que establecer una tarifa de `prioridad` más alta, pero cuando hay menos demanda, puede pagar menos.

Por ejemplo, digamos que Jordan tiene que pagarle 1 ETH a Taylor. Una transferencia de ETH requiere 21.000 unidades de gas, y la tarifa base es 10 gwei. Jordan incluye una propina de 2 gwei.

La tarifa total equivale a:

`unidades de gas usadas * (tarifa básica + tarifa por prioridad)`

donde la `tarifa base` es un valor establecido por el protocolo y la `tarifa de prioridad` es un valor que establece el usuario como propina para el validador.

p. ej., `21.000 * (10 + 2) = 252.000 gwei` (0,000252 ETH).

Cuando Jordan envía el dinero, se deducirán 1,00231 ETH de la cuenta de Jordan. A Taylor se le abonarán 1,0000 ETH. El validador recibe una propina de 0,000042 ETH. La `tarifa base` de 0,00021 ETH se consume.

### Tarifa base {#base-fee}

Cada bloque tiene una tarifa base que funciona como precio de reserva. Para que se pueda incluir en un bloque, el precio por gas ofrecido debe ser por lo menos igual a la tarifa base. La tarifa base se calcula independientemente del bloque actual y, en su lugar, se determina por los bloques anteriores a este, lo que hace que las comisiones por transacción sean más predecibles para los usuarios. Cuando se crea el bloque, esta **tarifa base se «consume»**, eliminándola de la circulación.

La tarifa base se calcula mediante una fórmula que compara el tamaño del bloque anterior (la cantidad de gas utilizada para todas las transacciones) con el tamaño objetivo (la mitad del límite de gas). La tarifa base aumentará o disminuirá un máximo del 12,5 % por bloque si el tamaño del bloque objetivo está por encima o por debajo del objetivo, respectivamente. Este crecimiento exponencial hace que no sea económicamente rentable que el tamaño de los bloques permanezca elevado indefinidamente.

| Número de bloque | Gas incluido | Incremento de la tarifa | Tarifa de base actual |
| ---------------- | -----------: | ----------------------: | --------------------: |
| 1                |          18M |                     0 % |              100 gwei |
| 2                |          36M |                     0 % |              100 gwei |
| 3                |          36M |                  12,5 % |            112,5 gwei |
| 4                |          36M |                  12,5 % |            126,6 gwei |
| 5                |          36M |                  12,5 % |            142,4 gwei |
| 6                |          36M |                  12,5 % |            160,2 gwei |
| 7                |          36M |                  12,5 % |            180,2 gwei |
| 8                |          36M |                  12,5 % |            202,7 gwei |

En la tabla anterior, se muestra un ejemplo que utiliza 36 millones como límite de gas. Siguiendo este ejemplo, para crear una transacción en el bloque número 9, una billetera le informará al usuario con certeza de que la **tarifa base máxima** que se añadirá al siguiente bloque es `tarifa base actual * 112,5 %` o `202,7 gwei * 112,5 % = 228,1 gwei`.

También cabe saber que es improbable que veamos un pico de incremento de bloques llenos, debido a la velocidad con que la tarifa base aumenta antes de que este se llene.

| Número de bloque                                    |                                        Gas incluido | Incremento de la tarifa |                               Tarifa de base actual |
| --------------------------------------------------- | --------------------------------------------------: | ----------------------: | --------------------------------------------------: |
| 30                                                  |                                                 36M |                  12,5 % |                        2.705,6 gwei |
| ... | ... |                  12,5 % | ... |
| 50                                                  |                                                 36M |                  12,5 % |                       28.531,3 gwei |
| ... | ... |                  12,5 % | ... |
| 100                                                 |                                                 36M |                  12,5 % |   10.302.608,6 gwei |

### Tarifa de prioridad (propinas) {#priority-fee}

La tarifa de prioridad (propina) incentiva a los validadores a maximizar el número de transacciones en un bloque, limitado únicamente por el límite de gas del bloque. Sin propinas, un validador racional podría incluir menos transacciones, o incluso ninguna, sin ninguna penalización directa de la capa de ejecución o de la capa de consenso, ya que las recompensas de staking son independientes de la cantidad de transacciones que haya en un bloque. Además, las propinas permiten a los usuarios superar las ofertas de otros por la prioridad dentro del mismo bloque, lo que en la práctica indica urgencia.

### Tarifa máxima {#maxfee}

Para ejecutar una transacción en la red, los usuarios pueden especificar la máxima cantidad que están dispuestos a pagar para que su transacción se ejecute. Este parámetro opcional se conoce como `maxFeePerGas`. Para que una transacción se ejecute, la tarifa máxima debe ser superior a la suma de la tarifa de base y la propina. Al emisor de la transacción se le reembolsa la diferencia entre la tarifa máxima y la suma de la tarifa de base y la propina.

### Tamaño del bloque {#block-size}

Cada bloque tiene un tamaño objetivo de la mitad del límite de gas actual, pero el tamaño de los bloques aumentará o disminuirá en función de la demanda de la red, hasta que se alcance el límite del bloque (2 veces el tamaño del bloque objetivo). El protocolo alcanza un tamaño de bloque promedio de equilibrio en el objetivo a través del proceso de _tâtonnement_. Esto significa que si el tamaño del bloque es mayor que el esperado, el protocolo aumentará la tarifa de base para el siguiente bloque. De manera similar, el protocolo disminuirá la tarifa de base si el tamaño del bloque es menor que el tamaño esperado.

La cantidad que se toma de referencia para ajustar la tarifa de base es proporcional a la diferencia entre el tamaño del bloque actual y el tamaño esperado. Se trata de un cálculo lineal que va desde -12,5 % para un bloque vacío, 0 % en el tamaño objetivo, hasta +12,5 % para un bloque que alcanza el límite de gas. El límite de gas puede fluctuar con el tiempo en función de las señales de los validadores, así como a través de las actualizaciones de la red. Puede [ver los cambios en el límite de gas a lo largo del tiempo aquí](https://eth.blockscout.com/stats/averageGasLimit?interval=threeMonths).

[Más información sobre los bloques](/developers/docs/blocks/)

### Cálculo de las tarifas de gas en la práctica {#calculating-fees-in-practice}

Puede declarar explícitamente cuánto está dispuesto a pagar para hacer que su transacción se ejecute. Sin embargo, la mayoría de las carteras establecerán automáticamente una tarifa de transacción recomendada (tarifa básica + tarifa por prioridad recomendada) para solventar la complejidad de la transacción.

## ¿Por qué existen comisiones de gas? {#why-do-gas-fees-exist}

En resumen, las comisiones de gas ayudan a mantener la red de Ethereum segura. Al requerir una tarifa para cada cálculo computacional ejecutado en la red, evitamos que algunas personas envíen correo basura a la red. Para prevenir bucles infinitos provocados o accidentales
u otro despilfarro informático en el código, cada transacción
tiene que establecer un límite de cuántos pasos informáticos de ejecución
de código puede utilizar. La unidad fundamental del cálculo computacional es el gas.

Aunque una transacción incluye un límite, el gas que no se usa en una transacción se devuelve al usuario (p. ej., se devuelve `tarifa máxima - (tarifa base + propina)`).

![Diagrama que muestra cómo se reembolsa el gas no utilizado](../transactions/gas-tx.png)
_Diagrama adaptado de [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## ¿Cuál es el límite del gas? {#what-is-gas-limit}

El límite del gas se refiere a la cantidad máxima de gas que esté dispuesto a que se consuma en una transacción. Las transacciones más complicadas que involucran [contratos inteligentes](/developers/docs/smart-contracts/) requieren más trabajo computacional, por lo que necesitan un límite de gas mayor que un simple pago. Una transferencia estándar de ETH requiere un límite de gas de 21.000 unidades de gas.

Por ejemplo, si se pone un límite de gas de 50.000 para una simple transferencia ETH, la EVM consumiría 21.000 y recuperaría los 29.000. Sin embargo, si especifica muy poco gas, por ejemplo, un límite de gas de 20.000 para una simple transferencia de ETH, la transacción fallará durante la fase de validación. Se rechazará antes de incluirse en un bloque y no se consumirá gas. Por otro lado, si la transacción se queda sin gas durante la ejecución (p. ej., un contrato inteligente usa todo el gas en la mitad del proceso), la EVM revertirá cualquier cambio, pero aun así se consumirá el gas proporcionado debido al trabajo realizado.

## ¿Por qué las comisiones de gas son tan elevadas? {#why-can-gas-fees-get-so-high}

Las altas comisiones de gas se deben a la popularidad de Ethereum. Si hay mucha demanda, los usuarios deberán ofertar propinas más altas para tratar de superar las transacciones de los otros usuarios. Una propina más alta puede hacer que aumente la probabilidad de que su transacción llegue al siguiente bloque. Asimismo, los contratos inteligentes de aplicaciones más complejos realizarán más operaciones para poder soportar sus funciones, con el consiguiente e ingente consumo de gas.

## Iniciativas para reducir los costes de gas {#initiatives-to-reduce-gas-costs}

Las [actualizaciones de escalabilidad](/roadmap/) de Ethereum deberían, en última instancia, resolver algunos de los problemas de las tarifas de gas, lo que a su vez permitirá que la plataforma procese miles de transacciones por segundo y escale a nivel mundial.

La escalabilidad de la capa 2 es una iniciativa primordial para mejorar de manera considerable los costes del gas, la experiencia de usuario y la escalabilidad.

[Más información sobre la escalabilidad de capa 2](/developers/docs/scaling/#layer-2-scaling)

## Monitorización de las tarifas de gas {#monitoring-gas-fees}

Si desea supervisar las tarifas de gas, para poder enviar sus ETH por menos, puede usar diferentes herramientas, como:

- [Etherscan](https://etherscan.io/gastracker) _Estimador del precio del gas de las transacciones_
- [Blockscout](https://eth.blockscout.com/gas-tracker) _Estimador del precio del gas de las transacciones de código abierto_
- [ETH Gas Tracker](https://www.ethgastracker.com/) _Monitorice y siga los precios del gas de Ethereum y de la L2 para reducir las comisiones por transacción y ahorrar dinero_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Extensión de Chrome para la estimación de gas que admite tanto las transacciones heredadas de tipo 0 como las transacciones de tipo 2 EIP-1559._
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Calcule las tarifas de gas en su moneda local para diferentes tipos de transacción en la red principal, Arbitrum y Polygon._

## Herramientas relacionadas {#related-tools}

- [Blocknative's Gas Platform](https://www.blocknative.com/gas) _API de estimación de gas impulsada por la plataforma de datos de la zona de espera global de Blocknative_
- [Gas Network](https://gas.network) Oráculos de gas en cadena. Soporte para más de 35 cadenas.

## Lecturas adicionales {#further-reading}

- [Explicación del gas de Ethereum](https://defiprime.com/gas)
- [Cómo reducir el consumo de gas de sus contratos inteligentes](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Estrategias de optimización del gas para desarrolladores](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [Documentación de la EIP-1559](https://eips.ethereum.org/EIPS/eip-1559).
- [Recursos sobre la EIP-1559 de Tim Beiko](https://hackmd.io/@timbeiko/1559-resources)
- [EIP-1559: Separando mecanismos de memes](https://web.archive.org/web/20241126205908/https://research.2077.xyz/eip-1559-separating-mechanisms-from-memes)
