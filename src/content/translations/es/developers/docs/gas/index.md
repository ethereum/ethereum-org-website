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

Como cada transacción de Ethereum requiere recursos computacionales para ejecutarse, cada transacción requiere una comisión. El gas hace referencia a la comisión necesaria para llevar a cabo una transacción en Ethereum con éxito.

![Un diagrama que muestra dónde se precisa el gas en las operaciones de la EVM.](./gas.png) _Diagrama adaptado de [Ethereum EVM ilustrado](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

En esencia, las comisiones de gas son pagadas en la moneda nativa de Ethereum, es decir, el ether (ETH). Los precios del gas están indicados en Gwei, que es una denominación de ETH; cada Gwei equivale a 0,000000001 ETH (10<sup>-9</sup> ETH). Por ejemplo, en lugar de decir que el gas cuesta 0,000000001 Ether, puedes decir que cuesta 1 Gwei. La palabra «gwei» significa «giga-wei» y es que igual a 1.000.000.000 wei. Wei (nombre acuñado en honor a [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), el creador de [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) es la unidad más pequeña de ETH.

## Antes de la actualización de Londres {#pre-london}

La forma en la que se calcularon las comisiones de transacción de la red de Ethereum cambió con [la actualización de Londres](/history/#london) en agosto del 2021. A continuación, podrá ver un resumen de cómo funcionaba antes:

Supongamos que Alice tiene que pagar 1 ETH a Bob. En la transacción, el límite de gas es de 21.000 unidades y el precio del gas es de 200 gwei.

El coste total hubiera sido de: `Gas units (limit) * Gas price per unit`, es decir, `21,000 * 200 = 4,200,000 gwei` o 0,0042 ETH

Cuando Alice enviase el dinero, se deducirían 1,0042 ETH de la cuenta de Alice. A Bob se le acreditaría 1,0000 ETH. El minero recibiría 0,0042 ETH.

En este vídeo se proporciona un breve resumen sobre qué es el gas y por qué existe:

<YouTube id="AJvzNICwcwc" />

## Después de la actualización de Londres {#post-london}

[La actualización de Londres](/history/#london) se implementó el 5 de agosto de 2021 con el objetivo de hacer que las transacciones en Ethereum fuesen más predecibles para los usuarios mediante la revisión del mecanismo de comisión de transacción de Ethereum. Los beneficios de alto nivel introducidos gracias a este cambio incluyen una mejor estimación de las comisiones de transacción; normalmente, la inclusión más rápida de las transacciones; y la compensación de la emisión ETH al quemar un porcentaje de las comisiones por transacción.

Desde la actualización de la red de Londres, cada bloque tiene una comisión base, el precio mínimo por unidad de gas para la inclusión en este bloque, la cual se calcula mediante la red en función de los requisitos de espacio del bloque. Debido a que la comisión base está quemada, se espera que los usuarios establezcan también una propina (comisión por prioridad) en sus transacciones. La propina compensa a los mineros por ejecutar y propagar las transacciones de los usuarios en los bloques correspondientes y se espera que se establezca automáticamente en la mayoría de las carteras.

El cálculo del total de la comisión por transacción funciona como sigue: `Gas units (limit) * (Base fee + Tip)`

Supongamos que Jordan debe pagar a Taylor 1 ETH. En la transacción, el límite de gas es de 21.000 unidades y la comisión base es 100 gwei. Jordan incluye una propina de 10 gwei.

Utilizando la fórmula anterior podemos calcular esto como `21,000 * (100 + 10) = 2,310,000 gwei` o 0,00231 ETH.

Cuando Jordan envía el dinero, se deducirán 1,00231 ETH de la cuenta de Jordan. A Taylor se le acreditarán 1,0000 ETH. El minero recibe la propina de 0,00021 ETH. Se aplica una comisión base de 0,0021 ETH.

Asimismo, Jordan también puede establecer una comisión máxima (`maxFeePerGas`) para esa transacción. La diferencia entre la comisión máxima y la comisión real se le reintegra a Jordan, es decir, `refund = max fee - (base fee + priority fee)`. Jordan puede establecer una cantidad máximo a pagar para que la transacción se ejecute, sin preocuparse de pagar una cantidad superior a la comisión base cuando se ejecute la transacción.

### Tamaño del bloque {#block-size}

Antes de la actualización de Londres, Ethereum tenía bloques de tamaño fijo. En momentos de alta demanda de la red, estos bloques operaban a capacidad total. Como consecuencia, los usuarios a menudo tenían que esperar que la alta demanda disminuyera en un bloque, lo cual se traducía en una deficiente experiencia de usuario.

La actualización de Londres introdujo los bloques de tamaño variable en Ethereum. Cada bloque tiene un tamaño esperado de 15 millones de gas, pero el tamaño de los bloques aumentará o se reducirá de acuerdo con la demanda de la red, hasta alcanzar el límite por bloque de 30 millones de gas (el doble del tamaño esperado del bloque). El protocolo alcanza un punto de equilibrio alrededor del tamaño de bloque de 15 millones promedio, a través del proceso de _tâtonnement_. Esto significa que si el tamaño del bloque es mayor que el tamaño esperado, el protocolo aumentará la comisión base para el siguiente bloque. De manera similar, el protocolo disminuirá la comisión base si el tamaño del bloque es menor que el tamaño esperado. La cantidad con respecto a la que se ajusta la comisión base es proporcional a la diferencia entre el tamaño del bloque actual y el tamaño esperado. [Más información sobre bloques](/developers/docs/blocks/).

### Comisión base {#base-fee}

Cada bloque tiene una comisión base que funciona como precio de reserva. Para que se pueda incluir en un bloque, el precio por gas ofrecido debe ser por lo menos igual a la comisión base. La comisión base se calcula independientemente del bloque actual y, en lugar de ello, se determina según los bloques anteriores a este, lo cual hace que las comisiones por transacción sean más predecibles para los usuarios. Una vez que se mina el bloque, esta comisión base se «quema», con lo que se retira de la circulación.

La comisión base se calcula mediante una fórmula que compara el tamaño del bloque anterior (la cantidad de gas usada para todas las transacciones) con el tamaño esperado. La comisión base se incrementará por un máximo de 12,5 % por bloque si se supera el tamaño esperado del bloque. Este crecimiento exponencial hace que no sea económicamente viable que el tamaño de los bloques permanezca alto indefinidamente.

| Número de bloque | Gas incluido | Incremento de comisión | Comisión base actual |
| ---------------- | -----------: | ---------------------: | -------------------: |
| 1                |         15 M |                    0 % |             100 gwei |
| 2                |         30 M |                    0 % |             100 gwei |
| 3                |         30 M |                 12,5 % |           112,5 gwei |
| 4                |         30 M |                 12,5 % |           126,6 gwei |
| 5                |         30 M |                 12,5 % |           142,4 gwei |
| 6                |         30 M |                 12,5 % |           160,2 gwei |
| 7                |         30 M |                 12,5 % |           180,2 gwei |
| 8                |         30 M |                 12,5 % |           202,7 gwei |

En relación con el mercado de subastas de gas prelondinense, este cambio del mecanismo de comisiones de transacción hace que la predicción de las comisiones sea más fiable. Siguiendo la tabla anterior, para crear una transacción en el bloque número 9, una cartera informará al usuario con certeza de que la **comisión base máxima** que se añadirá al siguiente bloque es `current base fee * 112.5%` o `202.8 gwei * 112.5% = 228.1 gwei`.

También es importante tener en cuenta que es poco probable que veamos picos prolongados de bloques completos debido a la velocidad a la que la comisión base incrementa la continuación de un bloque completo.

| Número de bloque | Gas incluido | Incremento de comisión | Comisión base actual |
| ---------------- | -----------: | ---------------------: | -------------------: |
| 30               |         30 M |                 12,5 % |         2.705,6 gwei |
| ...              |          ... |                 12,5 % |                  ... |
| 50               |         30 M |                 12,5 % |        28.531,3 gwei |
| ...              |          ... |                 12,5 % |                  ... |
| 100              |         30 M |                 12,5 % |    10.302.608,6 gwei |

### Comisión de prioridad (propinas) {#priority-fee}

Antes de la actualización de Londres, los mineros recibían el total de la comisión de gas de cada transacción incluida en un bloque.

Con la novedad de que la comisión base se quema, la actualización de Londres introdujo la comisión de prioridad (propina) para incentivar a los mineros a incluir las transacciones en los bloques. Sin las propinas, los mineros encontrarían económicamente viable minar bloques vacíos, debido a que recibirían la misma recompensa por bloque. En condiciones normales, una pequeña propina proporciona a los mineros un pequeño incentivo para incluir la transacción. Para transacciones que preferencialmente se deben realizar antes de otras transacciones del mismo bloque, se necesitará una propina mayor para intentar presentar una mejor oferta que las otras transacciones.

### Comisión máxima {#maxfee}

Para ejecutar una transacción en la red, los usuarios pueden especificar la máxima cantidad que están dispuestos a pagar por que su transacción se ejecute. Este parámetro opcional se conoce como el `maxFeePerGas`. Para que una transacción se ejecute, la comisión máxima debe ser superior a la suma de la comisión base y la propina. Al emisor de la transacción se le reembolsa la diferencia entre la comisión máxima y la suma de la comisión base y la propina.

### Cálculo de comisiones {#calculating-fees}

Uno de los principales beneficios de la actualización de Londres es la mejora de la experiencia de usuario a la hora de establecer comisiones de transacción. En el caso de las carteras que respaldan la actualización, en lugar de especificar explícitamente cuánto están dispuestos a pagar para que su transacción se procese, los proveedores de carteras establecerán automáticamente una comisión de transacción recomendada (comisión base + comisión de prioridad recomendada) para restar complejidad al proceso.

## EIP-1559 {#eip-1559}

La implementación de [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md) en la actualización de Londres hizo que el mecanismo de comisiones de transacción fuera más complejo que el anterior de subasta del precio del gas, pero tiene la ventaja de hacer más predecibles las comisiones de gas, lo cual genera un mercado de comisiones de transacción más eficiente. Los usuarios pueden enviar transacciones con una `maxFeePerGas` correspondiente a la cantidad que están dispuestos a pagar por transacción para que esta se ejecute, sabiendo que no pagarán más que el precio de mercado por el gas (`comisión base por gas`), y que se les reembolsará la cantidad adicional menos su propina.

En este vídeo se explica el EIP-1559 y los beneficios que brinda:

<YouTube id="MGemhK9t44Q" />

Si está interesado/a, puede leer las [especificaciones exactas de EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md).

Continúe aprendiendo más con estos [recursos de EIP-1559](https://hackmd.io/@timbeiko/1559-resources).

## ¿Por qué existen comisiones de gas? {#why-do-gas-fees-exist}

En resumen, las comisiones de gas ayudan a mantener la seguridad de la red de Ethereum. Al requerir una comisión por cada operación ejecutada en la red, prevenimos que los actores maliciosos envíen spam a la red. Para prevenir la generación de bucles hostiles infinitos o accidentales, así como de otros desperdicios computacionales generados en el código, cada transacción debe establecer un límite del número de pasos computacionales de ejecución de código que puede utilizar. La unidad fundamental del cálculo computacional es el gas.

Aunque una transacción incluye un límite, el gas no utilizado en una transacción se devuelve al usuario (es decir, se devuelve `max fee - (base fee + tip)`).

![Diagrama en el que se muestra cómo se devuelve el gas no utilizado](../transactions/gas-tx.png) _Diagrama adaptado de [Ethereum EVM ilustrado](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## ¿Qué es el límite de gas? {#what-is-gas-limit}

El límite de gas se refiere a la cantidad máxima de gas que está dispuesto a pagar en una transacción. Las transacciones más complicadas que implican [contratos inteligentes](/developers/docs/smart-contracts/) requieren mayor trabajo computacional, por tanto, requieren un límite de gas más elevado que un simple pago. Una transferencia estándar de ETH requiere un límite de gas de 21.000 unidades de gas.

Por ejemplo, si pone un límite de gas de 50.000 para una simple transacción de ETH, la EVM consumirá 21.000, y recuperará los 29.000 restantes. Sin embargo, si especifica un límite de gas muy bajo, por ejemplo, un límite de gas de 20.000 para una transacción simple de ETH, la EVM consumirá sus 20.000 unidades de gas para intentar completar la transacción, pero no se completará. La EVM revierte cualquier cambio, pero ya que el minero ya ha realizado las 20.000 unidades de trabajo, ese gas se consume.

## ¿Por qué las comisiones de gas son tan elevadas? {#why-can-gas-fees-get-so-high}

Las altas comisiones de gas se deben a la popularidad de Ethereum. Realizar cualquier operación en Ethereum requiere consumo de gas y el espacio de gas está limitado por bloque. Las comisiones incluyen cálculos, almacenamiento o manipulación de datos, transferencia de tokens u consumo de diferentes cantidades de unidades de gas. Conforme las funcionalidades de las dapps crecen se vuelven más complejas, el número de operaciones que un contrato inteligente puede realizar también aumenta, lo que significa que cada transacción ocupa más espacio en un bloque de tamaño limitado. Si hay mucha demanda, los usuarios deberán ofrecer una propina más alta para tratar de superar las transacciones de otros usuarios. Una propina más alta puede hacer que aumente la probabilidad de que su transacción llegue al siguiente bloque.

El precio del gas por sí solo no determina cuánto tenemos que pagar por una determinada transacción. Para calcular la comisión por transacción, tenemos que multiplicar el gas usado por la comisión de la transacción, que se mide en gwei.

## Iniciativas para reducir los costes del gas {#initiatives-to-reduce-gas-costs}

Las [mejoras de escalabilidad](/upgrades/) de Ethereum deberían abordar algunos de los problemas de las comisiones de gas, lo que a su vez permitiría que la plataforma procesase cientos de transacciones por segundo y a escala global.

La escala de la capa 2 es una iniciativa primaria para mejorar de manera considerable los costes del gas, la experiencia de usuario y la escalabilidad. [Más información sobre la escala de la capa 2](/developers/docs/scaling/#layer-2-scaling).

El nuevo modelo de prueba de participación, introducido en la cadena de baliza, debería reducir el alto consumo de energía y la dependencia de hardware especializado. Esta cadena permitirá que la red descentralizada de Ethereum se acepte y mantenga la seguridad de la red, al tiempo que limita el consumo de energía al requerir, en cambio, un compromiso financiero.

Cualquier persona con al menos 32 ETH puede realizar una apuesta y convertirse en validador responsable de procesar transacciones, validar bloques y proponer añadir nuevos bloques a la cadena. Los usuarios que tienen menos de 32 ETH pueden unirse a los grupos de apuestas.

## Estrategias para reducir los costes del gas {#strategies-for-you-to-reduce-gas-costs}

Si está intentando reducir el coste del gas de su ETH, puede establecer una propina para indicar el nivel de prioridad de su transacción. Los mineros «trabajarán» y ejecutarán las transacciones que ofrecen la mayor propina por gas, ya que ellos se quedan con esa cantidad; son menos propensos a ejecutar transacciones con propinas menores.

Si desea supervisar los precios del gas, para poder enviar su ETH por menos, puede usar diferentes herramientas, como:

- [Etherscan](https://etherscan.io/gastracker) _Calculador de precios del gas_
- [Calculador de gas de ETH de Blocknative](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm)_Extensión de chrome para el cálculo de gas compatible con ambas transacciones tradicionales Tipo0 y transacciones EIP-1559 Tipo2._

- [Estación de gas ETH](https://ethgasstation.info/) _Mediciones orientadas al consumidor para el mercado del gas de Ethereum_
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Calculate gas fees in your local currency for different transaction types on Mainnet, Arbitrum, and Polygon._

## Herramientas relacionadas {#related-tools}

- [Análisis de gas Bloxy](https://stat.bloxy.info/superset/dashboard/gas/?standalone=true)_Estadísticas de gas de la red de Ethereum_
- [Plataforma de gas de bloques nativos](https://www.blocknative.com/gas)_Estimación de gas API alimentada por la plataforma de datos de la zona de espera mundial de Blocknative_

## Más información {#further-reading}

- [Explicación sobre el gas de Ethereum](https://defiprime.com/gas)
- [¿Es más caro usar Ethereum cuando el precio sube?](https://docs.ethhub.io/questions-about-ethereum/is-ethereum-more-expensive-to-use-as-price-rises/)
- [Reducir el consumo de gas de sus contratos inteligentes](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Prueba de participación frente a prueba de trabajo](https://blockgeeks.com/guides/proof-of-work-vs-proof-of-stake/)

## Temas relacionados {#related-topics}

- [Minado](/developers/docs/consensus-mechanisms/pow/mining/)
