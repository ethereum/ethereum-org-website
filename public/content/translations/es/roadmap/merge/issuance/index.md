---
title: "Cómo La Fusión impactó el suministro de ETH"
description: "Desglose de cómo La Fusión impactó el suministro de ETH"
lang: es
---

La Fusión representó la transición de la red [Ethereum](/) de prueba de trabajo (PoW) a prueba de participación (PoS), la cual ocurrió en septiembre de 2022. La forma en que se emitía ETH experimentó cambios en el momento de esa transición. Anteriormente, el nuevo ETH se emitía desde dos fuentes: la capa de ejecución (es decir, la Red principal) y la capa de consenso (es decir, la cadena de balizas). Desde La Fusión, la emisión en la capa de ejecución es ahora cero. Analicemos esto en detalle.

## Componentes de la emisión de ETH {#components-of-eth-issuance}

Podemos dividir el suministro de ETH en dos fuerzas principales: la emisión y la quema.

La **emisión** de ETH es el proceso de crear ETH que no existía previamente. La **quema** de ETH es cuando el ETH existente se destruye, eliminándolo de la circulación. La tasa de emisión y quema se calcula en función de varios parámetros, y el equilibrio entre ellos determina la tasa de inflación/deflación resultante del ether.

<Card
emoji=":chart_decreasing:"
title="Resumen de la emisión de ETH">

- Antes de la transición a la prueba de participación, se emitían aproximadamente 13.000 ETH/día a los mineros.
- Se emiten aproximadamente 1.700 ETH/día a quienes hacen staking, basándose en un total de alrededor de 14 millones de ETH en participación.
- La emisión exacta por staking fluctúa según la cantidad total de ETH en participación.
- **Desde La Fusión, solo se mantienen los ~1.700 ETH/día, lo que reduce la emisión total de nuevo ETH en un ~88 %.**
- La quema: Esta fluctúa de acuerdo con la demanda de la red. _Si_ se observa un precio del gas promedio de al menos 16 Gwei para un día determinado, esto compensa efectivamente los ~1.700 ETH que se emiten a los validadores y lleva la inflación neta de ETH a cero o menos para ese día.

</Card>

## Antes de La Fusión (histórico) {#pre-merge}

### Emisión en la capa de ejecución {#el-issuance-pre-merge}

Bajo la prueba de trabajo, los mineros solo interactuaban con la capa de ejecución y recibían recompensas de bloque si eran el primer minero en resolver el siguiente bloque. Desde la actualización de [Constantinopla](/ethereum-forks/#constantinople) en 2019, esta recompensa era de 2 ETH por bloque. Los mineros también recibían recompensas por publicar bloques [ommer](/glossary/#ommer), que eran bloques válidos que no terminaban en la cadena más larga/canónica. Estas recompensas alcanzaban un máximo de 1,75 ETH por ommer, y eran _adicionales a_ la recompensa emitida por el bloque canónico. El proceso de minería era una actividad económicamente intensiva, que históricamente requería altos niveles de emisión de ETH para sostenerse.

### Emisión en la capa de consenso {#cl-issuance-pre-merge}

La [cadena de balizas](/ethereum-forks/#beacon-chain-genesis) se lanzó en 2020. En lugar de mineros, está asegurada por validadores que utilizan la prueba de participación. Esta cadena fue iniciada por usuarios de Ethereum que depositaron ETH de forma unidireccional en un contrato inteligente en la Red principal (la capa de ejecución), que la cadena de balizas escucha, acreditando al usuario con una cantidad igual de ETH en la nueva cadena. Hasta que ocurrió La Fusión, los validadores de la cadena de balizas no procesaban transacciones y esencialmente llegaban a un consenso sobre el estado del propio grupo de validadores.

Los validadores en la cadena de balizas son recompensados con ETH por dar fe del estado de la cadena y proponer bloques. Las recompensas (o penalizaciones) se calculan y distribuyen en cada época (cada 6,4 minutos) según el rendimiento del validador. Las recompensas de los validadores son **significativamente** menores que las recompensas de minería que se emitían anteriormente bajo la prueba de trabajo (2 ETH cada ~13,5 segundos), ya que operar un nodo validador no es tan económicamente intenso y, por lo tanto, no requiere ni justifica una recompensa tan alta.

### Desglose de la emisión antes de La Fusión {#pre-merge-issuance-breakdown}

Suministro total de ETH: **\~120.520.000 ETH** (en el momento de La Fusión en septiembre de 2022)

**Emisión en la capa de ejecución:**

- Se estimaba en 2,08 ETH cada 13,3 segundos\*: **\~4.930.000** ETH emitidos en un año
- Resultaba en una tasa de inflación de **aproximadamente 4,09 %** (4,93 M por año / 120,5 M en total)
- \*Esto incluye los 2 ETH por bloque canónico, más un promedio de 0,08 ETH a lo largo del tiempo de los bloques ommer. También utiliza 13,3 segundos, el objetivo de tiempo de bloque base sin ninguna influencia de una [bomba de dificultad](/glossary/#difficulty-bomb). ([Ver fuente](https://bitinfocharts.com/ethereum/))

**Emisión en la capa de consenso:**

- Utilizando 14.000.000 de ETH en participación total, la tasa de emisión de ETH es de aproximadamente 1.700 ETH/día ([Ver fuente](https://ultrasound.money/))
- Resulta en **\~620.500** ETH emitidos en un año
- Resultaba en una tasa de inflación de **aproximadamente 0,52 %** (620,5 K por año / 119,3 M en total)

<Alert variant="update">
<AlertContent>
<AlertDescription>
**Tasa de emisión anualizada total (antes de La Fusión): ~4,61 %** (4,09 % + 0,52 %)

**\~88,7 %** de la emisión se destinaba a los mineros en la capa de ejecución (4,09 / 4,61 * 100)

**\~11,3 %** se emitía a quienes hacían staking en la capa de consenso (0,52 / 4,61 * 100)
</AlertDescription>
</AlertContent>
</Alert>

## Después de La Fusión (actualidad) {#post-merge}

### Emisión en la capa de ejecución {#el-issuance-post-merge}

La emisión en la capa de ejecución desde La Fusión es cero. La prueba de trabajo ya no es un medio válido de producción de bloques bajo las reglas de consenso actualizadas. Toda la actividad de la capa de ejecución se empaqueta en "bloques de baliza", que son publicados y atestiguados por validadores de prueba de participación. Las recompensas por dar fe y publicar bloques de baliza se contabilizan por separado en la capa de consenso.

### Emisión en la capa de consenso {#cl-issuance-post-merge}

La emisión en la capa de consenso continúa hoy como antes de La Fusión, con pequeñas recompensas para los validadores que dan fe y proponen bloques. Las recompensas de los validadores continúan acumulándose en los _saldos de los validadores_ que se gestionan dentro de la capa de consenso. A diferencia de las cuentas actuales (cuentas de "ejecución"), que pueden realizar transacciones en la Red principal, estas son cuentas de Ethereum separadas que no pueden realizar transacciones libremente con otras cuentas de Ethereum. Los fondos en estas cuentas solo se pueden retirar a una única dirección de ejecución especificada.

Desde la actualización de Shanghái/Capella que tuvo lugar en abril de 2023, estos retiros se han habilitado para quienes hacen staking. Se incentiva a quienes hacen staking a retirar sus _ganancias/recompensas (saldo superior a 32 ETH)_, ya que de lo contrario estos fondos no contribuyen a su peso de participación (que tiene un máximo de 32).

Quienes hacen staking también pueden optar por la salida y retirar todo su saldo de validador. Para garantizar que Ethereum sea estable, el número de validadores que salen simultáneamente está limitado.

Aproximadamente el 0,33 % del recuento total de validadores puede salir en un día determinado. De forma predeterminada, cuatro (4) validadores pueden salir por época (cada 6,4 minutos, o 900 por día). Se permite la salida de un (1) validador adicional por cada 65.536 (2<sup>16</sup>) validadores adicionales por encima de 262.144 (2<sup>18</sup>). Por ejemplo, con más de 327.680 validadores, cinco (5) pueden salir por época (1.125 por día). Se permitirán seis (6) con un recuento total de validadores activos superior a 393.216, y así sucesivamente.

A medida que más validadores se retiran, el número máximo de validadores que salen se reducirá gradualmente a un mínimo de cuatro para evitar intencionalmente que se retiren simultáneamente grandes cantidades desestabilizadoras de ETH en participación.

### Desglose de la inflación después de La Fusión {#post-merge-inflation-breakdown}

- [Suministro total de ETH](/eth/supply/): **\~120.520.000 ETH** (en el momento de La Fusión en septiembre de 2022)
- Emisión en la capa de ejecución: **0**
- Emisión en la capa de consenso: Igual que arriba, **\~0,52 %** de tasa de emisión anualizada (con 14 millones de ETH en participación total)

<Alert variant="update">
<AlertContent>
<AlertDescription>
Tasa de emisión anualizada total: **\~0,52 %**

Reducción neta en la emisión anual de ETH: **\~88,7 %** ((4,61 % - 0,52 %) / 4,61 % * 100)
</AlertDescription>
</AlertContent>
</Alert>

## <Emoji text=":fire:" size="1" /> La quema {#the-burn}

La fuerza opuesta a la emisión de ETH es la tasa a la que se quema ETH. Para que una transacción se ejecute en Ethereum, se debe pagar una tarifa mínima (conocida como "tarifa base"), que fluctúa continuamente (de bloque a bloque) dependiendo de la actividad de la red. La tarifa se paga en ETH y es _necesaria_ para que la transacción se considere válida. Esta tarifa se _quema_ durante el proceso de la transacción, eliminándola de la circulación.

<Alert variant="update">
<AlertContent>
<AlertDescription>

La quema de tarifas se lanzó con [la actualización de Londres](/ethereum-forks/#london) en agosto de 2021, y permanece sin cambios desde La Fusión.
</AlertDescription>
</AlertContent>
</Alert>

Además de la quema de tarifas implementada por la actualización de Londres, los validadores también pueden incurrir en penalizaciones por estar desconectados, o peor aún, pueden sufrir un recorte por romper reglas específicas que amenazan la seguridad de la red. Estas penalizaciones resultan en una reducción de ETH del saldo de ese validador, que no se recompensa directamente a ninguna otra cuenta, quemándolo/eliminándolo efectivamente de la circulación.

### Cálculo del precio del gas promedio para la deflación {#calculating-average-gas-price-for-deflation}

Como se discutió anteriormente, la cantidad de ETH emitida en un día determinado depende del total de ETH en participación. En el momento de escribir este artículo, esto es aproximadamente 1.700 ETH/día.

Para determinar el precio del gas promedio requerido para compensar completamente esta emisión en un período de 24 horas, comenzaremos calculando el número total de bloques en un día, dado un tiempo de bloque de 12 segundos:

- `(1 block / 12 seconds) * (60 seconds/minute) = 5 blocks/minute`
- `(5 blocks/minute) * (60 minutes/hour) = 300 blocks/hour`
- `(300 blocks/hour) * (24 hours/day) = 7200 blocks/day`

Cada bloque tiene como objetivo `15x10^6 gas/block` ([más sobre el gas](/developers/docs/gas/)). Usando esto, podemos resolver el precio del gas promedio (en unidades de Gwei/gas) requerido para compensar la emisión, dada una emisión diaria total de ETH de 1.700 ETH:

- `7200 blocks/day * 15x10^6 gas/block * `**`Y gwei/gas`**` * 1 ETH/ 10^9 gwei = 1700 ETH/day`

Resolviendo para `Y`:

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (redondeando a solo dos dígitos significativos)

Otra forma de reorganizar este último paso sería reemplazar `1700` con una variable `X` que represente la emisión diaria de ETH, y simplificar el resto a:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Podemos simplificar y escribir esto como una función de `X`:

- `f(X) = X/108` donde `X` es la emisión diaria de ETH, y `f(X)` representa el precio en Gwei/gas requerido para compensar todo el ETH recién emitido.

Así que, por ejemplo, si `X` (emisión diaria de ETH) aumenta a 1.800 según el total de ETH en participación, `f(X)` (Gwei requerido para compensar toda la emisión) sería entonces `17 gwei` (usando 2 dígitos significativos).

## Más información {#further-reading}

- [La Fusión](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/): _paneles disponibles para visualizar la emisión y quema de ETH en tiempo real_
- [Gráficos de la emisión de Ethereum](https://www.attestant.io/posts/charting-ethereum-issuance/): _Jim McDonald 2020_
