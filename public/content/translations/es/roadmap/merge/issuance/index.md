---
title: Cómo La Fusión impactó en el suministro de ETH
description: Explicación de cómo La Fusión impactó en el suministro de ETH
lang: es
---

# Cómo afectó la Fusión al suministro de ETH {#how-the-merge-impacts-ETH-supply}

La Fusión representó la transición de la red de Ethereum de prueba de trabajo a prueba de participación, que ocurrió en septiembre de 2022. La forma en la que se emitieron ETH sufrió cambios en el momento de la transición. Anteriormente, el nuevo ETH se emitía desde dos fuentes: la capa de ejecución (es decir, la red principal) y la capa de consenso (es decir, la Cadena de baliza). Desde La Fusión, la emisión en la capa de ejecución está ahora en cero. Veamos esto por partes.

## Componentes de la emisión de ETH {#components-of-eth-issuance}

Podemos analizar el suministro de ETH en dos fuerzas principales: la emisión y la quema.

La **emisión** de ETH es el proceso de crear ETH que no existía previamente. La **quema** de ETH es cuando el ETH existente se destruye, eliminándolo de la circulación. La tasa de emisión y quema se calcula basándose en varios parámetros, y el equilibrio entre ellos determina la tasa de inflación/deflación del ether.

<Card
emoji=":chart_decreasing:"
title="Resumen: emisión de ETH">

- Antes de la transición a la prueba de participación, a los mineros se les emitían aproximadamente 13.000 ETH/día
- A los participantes se les emiten aproximadamente 1.700 ETH/día, sobre la base de un total de unos 14 millones de ETH en staking.
- La emisión exacta del staking fluctúa en función de la cantidad total de ETH en staking.
- **Desde la Fusión, solo se mantienen los ~1.700 ETH/día, lo que reduce la emisión total de nuevos ETH en un ~88 %**
- La quema: fluctúa según la demanda de la red. _Si_ se observa un precio medio de gas de al menos 16 gwei en un día determinado, esto compensa efectivamente los ~1.700 ETH que emiten los validadores y baja la inflación neta de ETH a cero o menos en ese día.

</Card>

## Antes de la Fusión (histórico) {#pre-merge}

### Emisión de la capa de ejecución {#el-issuance-pre-merge}

Bajo la prueba de trabajo, los mineros solo interactuaban con la capa de ejecución y se les compensaba con un bloque de recompensas, si eran los primeros mineros en resolver el siguiente bloque. Desde la [actualización de Constantinople](/ethereum-forks/#constantinople) en 2019, esta recompensa era de 2 ETH por bloque. Los mineros también eran recompensados por publicar bloques [ommer](/glossary/#ommer), que eran bloques válidos que no terminaban en la cadena más larga/canónica. Estas recompensas alcanzaban un máximo de 1,75 ETH por ommer y eran _adicionales_ a la recompensa emitida por el bloque canónico. El proceso de minería era una actividad económica intensa, que históricamente requería altos niveles de emisión de ETH para ser sostenible.

### Emisión de la capa de consenso {#cl-issuance-pre-merge}

La [Cadena de baliza](/ethereum-forks/#beacon-chain-genesis) se puso en marcha en 2020. En vez de mineros, está asegurada por validadores que usan pruebas de participación. Esta cadena era impulsada por usuarios de Ethereum que depositaban ETH unidireccionalmente en un contrato inteligente de red principal (la capa de ejecución), que la cadena de baliza escucha, acreditando al usuario una cantidad equivalente de ETH en la cadena nueva. Hasta que ocurrió La Fusión, los validadores de la cadena de baliza no estaban procesando transacciones y estaban principalmente llegando a consensos sobre el estado del grupo de validadores entre sí.

A los validadores de la cadena de baliza se les recompensaba con ETH por confirmar el estado de la cadena y proponer bloques. Las recompensas (o penalizaciones) se calculaban y distribuían en cada época (cada 6,4 minutos) en función del rendimiento del validador. Las recompensas de los validadores son **significativamente** menores que las recompensas de minería que se emitían anteriormente bajo la prueba de trabajo (2 ETH cada ~13,5 segundos), ya que operar un nodo validador no es tan intenso económicamente y, por lo tanto, no requiere ni justifica una recompensa tan alta.

### Desglose de la emisión antes de la Fusión {#pre-merge-issuance-breakdown}

Suministro total de ETH: **~120.520.000 ETH** (en el momento de la Fusión en septiembre de 2022)

**La emisión de la capa de ejecución:**

- Se estimó en 2,08 ETH por 13,3 segundos\*: **~4.930.000** ETH emitidos en un año
- Resultó en una tasa de inflación de **aproximadamente el 4,09 %** (4,93M por año / 120,5M en total)
- \*Esto incluye los 2 ETH por bloque predilecto, además de los 0,08 ETH en promedio a lo largo del tiempo en bloques ommer. También usa 13,3 segundos, el objetivo de tiempo de bloque de referencia sin ninguna influencia de una [bomba de dificultad](/glossary/#difficulty-bomb). ([Ver fuente](https://bitinfocharts.com/ethereum/))

**La emisión de la capa de consenso:**

- Con un total de 14.000.000 de ETH en staking, la tasa de emisión de ETH es de aproximadamente 1700 ETH/día ([Ver fuente](https://ultrasound.money/))
- Resulta en **~620.500** ETH emitidos en un año
- Resultó en una tasa de inflación de **aproximadamente 0,52 %** (620,5 K por año / 119,3 M en total)

<Alert variant="update">
<AlertContent>
<AlertDescription>
**Tasa de emisión anualizada total (antes de la Fusión): ~4,61 %** (4,09 % + 0,52 %)

El **~88,7 %** de la emisión se destinaba a los mineros en la capa de ejecución (4,09 / 4,61 \* 100)

El **~11,3 %** se emitía a los participantes en la capa de consenso (0,52 / 4,61 \* 100) </AlertDescription> </AlertContent> </Alert>

## Después de la Fusión (actualidad) {#post-merge}

### Emisión de la capa de ejecución {#el-issuance-post-merge}

La emisión de la capa de ejecución desde la Fusión es cero. La prueba de trabajo ya no es un medio válido para la producción de bloques según las reglas de consenso actualizadas. Toda la actividad de la capa de ejecución se empaqueta en «bloques de baliza», que publican y atestiguan los validadores de prueba de participación. Las recompensas por atestiguar y publicar bloques de baliza se contabilizan por separado en la capa de consenso.

### Emisión de la capa de consenso {#cl-issuance-post-merge}

La emisión de la capa de consenso continúa hoy como antes de la Fusión, con pequeñas recompensas para los validadores que atestiguan y proponen bloques. Las recompensas de los validadores se siguen acumulando en los _saldos de los validadores_ que se gestionan dentro de la capa de consenso. A diferencia de las cuentas actuales («cuentas de ejecución»), que pueden realizar transacciones en la red principal, estas son cuentas de Ethereum separadas que no pueden realizar transacciones libremente con otras cuentas de Ethereum. Los fondos de estas cuentas solo pueden retirarse a una única dirección de ejecución especificada.

Desde la actualización de Shanghai/Capella que tuvo lugar en abril de 2023, estos retiros han sido habilitados para los participantes. Se incentiva a los participantes a retirar sus _ganancias/recompensas (saldo superior a 32 ETH)_, ya que, de lo contrario, estos fondos no contribuyen a su peso de participación (cuyo máximo es de 32).

Los participantes también pueden optar por salir y retirar el saldo completo de su validador. Para garantizar que Ethereum sea estable, el número de validadores que salen simultáneamente está limitado.

Aproximadamente el 0,33 % del recuento total de validadores puede salir en un día determinado. Por defecto, cuatro (4) validadores pueden salir por época (cada 6,4 minutos, o 900 por día). Se permite la salida de un (1) validador adicional por cada 65.536 (2<sup>16</sup>) validadores adicionales por encima de 262.144 (2<sup>18</sup>). Por ejemplo, con más de 327.680 validadores, cinco (5) pueden salir por época (1.125 por día). Se permitirán seis (6) con un recuento total de validadores activos superior a 393.216, y así sucesivamente.

A medida que se retiran más validadores, el número máximo de validadores que pueden salir se reducirá gradualmente a un mínimo de cuatro para evitar intencionadamente que se retiren simultáneamente grandes cantidades desestabilizadoras de ETH en staking.

### Desglose de la inflación después de la Fusión {#post-merge-inflation-breakdown}

- Suministro total de ETH: **~120.520.000 ETH** (en el momento de la Fusión en septiembre de 2022)
- Emisión de la capa de ejecución: **0**
- Emisión de la capa de consenso: igual que antes, **~0,52 %** de tasa de emisión anualizada (con 14 millones de ETH totales en staking)

<Alert variant="update">
<AlertContent>
<AlertDescription>
Tasa de emisión anualizada total: **~0,52 %**

Reducción neta de la emisión anual de ETH: **~88,7 %** ((4,61 % - 0,52 %) / 4,61 % \* 100) </AlertDescription> </AlertContent> </Alert>

## <Emoji text=":fire:" size="1" /> La quema {#the-burn}

La fuerza opuesta a la emisión de ETH es la tasa a la cual se quema ETH. Para que se ejecute una transacción en Ethereum, se debe pagar una comisión mínima (conocida como «tarifa de base»), que fluctúa constantemente (bloque-a-bloque) dependiendo de la actividad de la red. La tarifa se paga en ETH y es _obligatoria_ para que la transacción se considere válida. Esta tarifa se _quema_ durante el proceso de la transacción, eliminándola de la circulación.

<Alert variant="update">
<AlertContent>
<AlertDescription>

La quema de tarifas se implementó con [la actualización London](/ethereum-forks/#london) en agosto de 2021 y se ha mantenido sin cambios desde la Fusión. </AlertDescription> </AlertContent> </Alert>

Además de la tarifa implementada en la actualización London, los validadores también pueden incurrir en penalizaciones por estar fuera de línea, o peor aún, se les puede recortar por romper las reglas específicas que amenazan la seguridad de la red. Estas penalizaciones ocasionan una reducción de ETH del saldo de los validadores, que no recompensa directamente ninguna otra cuenta, quemándolos/eliminándolos efectivamente de circulación.

### Cálculo del precio medio del gas para la deflación {#calculating-average-gas-price-for-deflation}

Como discutimos anteriormente, la cantidad de ETH emitida en un día determinado es dependiente del total de ETH apostado. Al cierre de la edición de este documento, roza los 1.700 ETH/día.

Para determinar el precio medio del gas requerido para compensar completamente esta emisión en un período de 24 horas, empezaremos calculando el número total de bloques en un día, dando un tiempo de bloque de 12 segundos:

- `(1 bloque / 12 segundos) * (60 segundos/minuto) = 5 bloques/minuto`
- `(5 bloques/minuto) * (60 minutos/hora) = 300 bloques/hora`
- `(300 bloques/hora) * (24 horas/día) = 7.200 bloques/día`

Cada bloque tiene como objetivo `15x10^6 de gas/bloque` ([más sobre el gas](/developers/docs/gas/)). Partiendo de estos datos, podemos entender el precio medio del gas (en unidades de gwei/gas) requerido para compensar la emisión, ya que la emisión total diaria es de 1.700 ETH:

- `7200 bloques/día * 15x10^6 gas/bloque * `**`Y gwei/gas`**` * 1 ETH/ 10^9 gwei = 1700 ETH/día`

Resolviendo para `Y`:

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (redondeando a solo dos cifras significativas)

Otra forma de reorganizar este último paso sería sustituir `1700` por una variable `X` que represente la emisión diaria de ETH, y simplificar el resto a:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Podemos simplificar y escribir esto como una función de `X`:

- `f(X) = X/108` donde `X` es la emisión diaria de ETH, y `f(X)` representa el precio en gwei/gas necesario para compensar todo el ETH recién emitido.

Así que, por ejemplo, si `X` (emisión diaria de ETH) sube a 1800 en función del total de ETH en staking, `f(X)` (gwei necesarios para compensar toda la emisión) sería entonces de `17 gwei` (usando 2 cifras significativas)

## Lecturas adicionales {#further-reading}

- [The Merge](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) - _Paneles disponibles para visualizar la emisión y la quema de ETH en tiempo real_
- [Gráfico de la emisión de Ethereum](https://www.attestant.io/posts/charting-ethereum-issuance/) - _Jim McDonald 2020_
