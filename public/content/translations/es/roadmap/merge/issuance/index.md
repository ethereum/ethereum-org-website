---
title: Cómo La Fusión impactó en el suministro de ETH
description: Explicación de cómo La Fusión impactó en el suministro de ETH
lang: es
---

# Cómo La Fusión impactó en el suministro de ETH {#how-the-merge-impacts-ETH-supply}

La Fusión ocurrida en septiembre de 2022 representó la transición de las redes de Ethereum de prueba de trabajo a prueba de participación. La forma en la que se emitieron ETH sufrió cambios en el momento de la transición. Anteriormente, se emitieron nuevos ETH desde dos fuentes: la capa de ejecución (es decir, la red principal) y la capa de consenso (es decir, la cadena de baliza). Desde La Fusión, la emisión en la capa de ejecución está ahora en cero. Veamos esto por partes.

## Componentes de la emisión de ETH {#components-of-eth-issuance}

Podemos analizar el suministro de ETH en dos fuerzas principales: la emisión y la quema.

La **emisión** es el proceso de creación de ETH. La **quema** es la destrucción de los ETH existente y su consiguiente eliminación de la circulación. La tasa de emisión y quema se calcula basándose en varios parámetros, y el equilibrio entre ellos determina la tasa de inflación/deflación del ether.

<Card
emoji=":chart_decreasing:"
title="tldr emisión de ETH">

- Antes de la transición a la prueba de participación, los mineros emitían aproximadamente 13.000 ETH/día.
- Los participantes emiten aproximadamente 1.700 ETH/día, en función de una participación total de alrededor de 14 millones de ETH.
- La emisión exacta de participaciones fluctúa en función del total de ETH apostado.
- **Desde La Fusión, solo permanece ~1.700 ETH/día, reduciendo la emisión total de ETH a ~88%**.
- La quema: fluctúa dependiendo de la demanda de red. _Si_ se observa un precio medio de gas de al menos 16 gwei en un día determinado, esto compensa efectivamente los ~1.700 ETH que emiten los validadores y baja la inflación neta de ETH a cero o menos en ese día.

</Card>

## Antes de La Fusión (historia) {#pre-merge}

### La emisión de la capa de ejecución {#el-issuance-pre-merge}

Bajo la prueba de trabajo, los mineros solo interactuaban con la capa de ejecución y se les compensaba con un bloque de recompensas, si eran los primeros mineros en resolver el siguiente bloque. Desde la [actualización Constantinople](/history/#constantinople) en 2019, esta recompensa era de 2 ETH por bloque. Los mineros también recibían recompensas por publicaciones de bloques [ommer](/glossary/#ommer), que eran bloques válidos que no acababan en la cadena más larga/predilecta. Estas recompensas eran de un máximo 1,75 ETH por ommer, y suponían _un extra_ a la recompensa emitida desde el bloque predilecto. El proceso de minería era una actividad económica intensa, que históricamente requería altos niveles de emisión de ETH para ser sostenible.

### La emisión de la capa de consenso {#cl-issuance-pre-merge}

La [cadena de baliza](/history/#beacon-chain-genesis) empezó en 2020. En vez de mineros, está asegurada por validadores que usan pruebas de participación. Esta cadena era impulsada por usuarios de Ethereum que depositaban ETH unidireccionalmente en un contrato inteligente de red principal (la capa de ejecución), que la cadena de baliza escucha, acreditando al usuario una cantidad equivalente de ETH en la cadena nueva. Hasta que ocurrió La Fusión, los validadores de la cadena de baliza no estaban procesando transacciones y estaban principalmente llegando a consensos sobre el estado del grupo de validadores entre sí.

A los validadores de la cadena de baliza se les recompensaba con ETH por confirmar el estado de la cadena y proponer bloques. Las recompensas (o penalizaciones) se calculaban y distribuían en cada época (cada 6,4 minutos) en función del rendimiento del validador. Las recompensas de los validadores son **considerablemente** inferiores a las recompensas de los mineros que se emitían anteriormente con la prueba de trabajo (2 ETH cada ~13,5 segundos), ya que el funcionamiento de un nodo de validador no supone un gasto tan elevado, ni requiere o garantiza una gran recompensa.

### Análisis de la emisión antes de La Fusión {#pre-merge-issuance-breakdown}

Suministro total de ETH: **~120.520.000 ETH** (en el momento de La Fusión en septiembre de 2020)

**La emisión de la capa de ejecución:**

- Se calculaba en 2,08 ETH por 13,3 segundos\*: **~4.930.000** ETH emitidos en un año
- Resultó en una tasa de inflación de **aproximadamente del 4,09%** (4,93 M por año / 120,5 M en total)
- \*Esto incluye los 2 ETH por bloque predilecto, además de los 0,08 ETH en promedio a lo largo del tiempo en bloques ommer. También utiliza 13,3 segundos, el objetivo de tiempo del bloque de referencia sin ninguna influencia de una [bomba de dificultad](/glossary/#difficulty-bomb). ([Ver fuente](https://bitinfocharts.com/ethereum/))

**La emisión de la capa de consenso:**

- Usando 14.000.000 del total de ETH participantes, la tasa de emisión de ETH es aproximadamente de 1700 ETH/día ([Ver fuente](https://ultrasound.money/))
- Lo que da como resultado **~620.500** ETH emitidos en un año.
- Lo que generó una tasa de inflación de **aproximadamente 0,52%** (620,5 K por año / 119,3 M en total).

<InfoBanner>
<strong>Tasa de emisión anual total (antes de La Fusión): ~4,61%</strong> (4,09% + 0,52%)<br/><br/>
<strong>~88,7%</strong> de la emisión iba a los mineros en la capa de ejecución (4,09 / 4,61 * 100)<br/><br/>
<strong>~11,3%</strong> era emitida para los participantes en la capa de consenso (0,52 / 4,61 * 100)
</InfoBanner>

## Después de La Fusión (Presente) {#post-merge}

### La emisión de la capa de ejecución {#el-issuance-post-merge}

La emisión de la capa de ejecución desde La Fusión es cero. La prueba de trabajo ya no es un medio válido de producción de bloques bajo las actualizaciones de las reglas del consenso. Toda la actividad de la capa de ejecución está agrupada en «bloques de baliza», que publicarán y certificarán validadores de prueba de participación. Las recompensas por certificar y publicar bloques de baliza se contabilizan por separado en la capa de consenso.

### La emisión de la capa de consenso {#cl-issuance-post-merge}

La emisión de la capa de consenso continúa hoy, como lo hacía antes de La Fusión, con pequeñas recompensas para validadores que certifican y proponen bloques. Las recompensas de validadores continúan acumulándose en los _balances del validador_ que se administran dentro de la capa de consenso. A diferencia de las cuentas corrientes (cuentas de «ejecución»), que pueden hacer transacciones en red principal, estas son cuentas de Ethereum separadas que no pueden hacer transacciones libremente con otras cuentas de Ethereum. Los fondos de estas cuentas solo pueden retirarse en una única dirección de ejecución específica.

Desde la actualización de Shanghai/Capella ocurrida en abril de 2023, se han habilitado estas retiradas para participantes. Se incentiva la retirada de _ganancias/recompensas (con balance mayor a 32 ETH)_ de los participantes, ya que de otra manera estos fondos no contribuyen a su peso de participación (que es de máximo 32).

Los participantes también pueden optar por salir y extraer su balance entero de validador. Para garantizar la estabilidad de Ethereum, se limita el número de validadores que pueden salir al mismo tiempo.

Aproximadamente el 0,33 % del total de validadores puede salir cada día. Por defecto, cuatro (4) validadores pueden salir por época (cada 6,4 minutos, o 900 por día). Un validador adicional (1) puede salir por cada 65.536 (2<sup>16</sup>) validadores adicionales sobre 262.144 (2<sup>18</sup>). Por ejemplo, con más de 327.680 validadores, cinco (5) pueden salir por época (1.125 por día). Se permitirán seis (6) con un total de validadores activos de 393,216, y así sucesivamente.

Cuantos más validadores salgan, más se irá reduciendo gradualmente el número máximo de validadores existentes hasta un mínimo de cuatro con la intención de evitar una desestabilización de los ETH apostados al producirse un valor alto de retirada simultánea.

### Análisis de la inflación después de La Fusión {#post-merge-inflation-breakdown}

- Suministro total de ETH: **~120.520.000 ETH** (en el momento de La Fusión en septiembre de 2020)
- La emisión de la capa de ejecución: **0**
- La emisión de la capa de consenso: igual a la anterior, **~0,52%** tasa emitida anualmente (con un total de 14 millones de ETH apostados)

<InfoBanner>
Tasa de emisión anual total: <strong>~0,52%</strong><br/><br/>
Reducción neta de la emisión anual de ETH: <strong>~88,7%</strong> ((4,61% - 0,52%) / 4,61% * 100)
</InfoBanner>

## <Emoji text=":fire:" size="1" />La quema {#the-burn}

La fuerza opuesta a la emisión de ETH es la tasa a la cual se quema ETH. Para que se ejecute una transacción en Ethereum, se debe pagar una comisión mínima (conocida como «tarifa de base»), que fluctúa constantemente (bloque-a-bloque) dependiendo de la actividad de la red. La tarifa se debe pagar en ETH y se _requiere_ para que se considere una transacción válida. La tarifa se _quema_ durante el proceso de la transacción, eliminándola de la circulación.

<InfoBanner>
La quema de la comisión empezó con <a href="/history/#london">la actualización London</a> en agosto del 2021, y no se le han implementado más cambios desde La Fusión.
</InfoBanner>

Además de la tarifa implementada en la actualización London, los validadores también pueden incurrir en penalizaciones por estar fuera de línea, o peor aún, se les puede recortar por romper las reglas específicas que amenazan la seguridad de la red. Estas penalizaciones ocasionan una reducción de ETH del saldo de los validadores, que no recompensa directamente ninguna otra cuenta, quemándolos/eliminándolos efectivamente de circulación.

### Cálculo del precio medio del gas en deflación {#calculating-average-gas-price-for-deflation}

Como discutimos anteriormente, la cantidad de ETH emitida en un día determinado es dependiente del total de ETH apostado. Al cierre de la edición de este documento, roza los 1.700 ETH/día.

Para determinar el precio medio del gas requerido para compensar completamente esta emisión en un período de 24 horas, empezaremos calculando el número total de bloques en un día, dando un tiempo de bloque de 12 segundos:

- `(1 bloque / 12 segundos) * (60 segundos/minuto) = 5 bloques/minuto`
- `(5 bloques/minuto) * (60 minutos/hora) = 300 bloques/hora`
- `(300 bloques/hora) * (24 horas/día) = 7.200 bloques/día`

Cada bloque apunta a `15x10^6 gas/bloque` ([más en gas](/developers/docs/gas/)). Partiendo de estos datos, podemos entender el precio medio del gas (en unidades de gwei/gas) requerido para compensar la emisión, ya que la emisión total diaria es de 1.700 ETH:

- `7200 bloques/día * 15x10^6 gas/bloque *`**`Y gwei/gas`**`* 1 ETH/ 10^9 gwei = 1700 ETH/día`

Partiendo de que `Y`:

- `Y = (1.700(10^9))/(7.200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (redondeando a solo dos dígitos significativos)

Otra forma de organizar este último paso sería reemplazando `1.700` por una variable `X` que representa la emisión diaria de ETH, y simplifica el resto a:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Podemos simplificar y escribir esto como la función de `X`:

- `f(X) = X/108` donde `X` es la emisión diaria de ETH, y `f(X)` representa el precio gwei/gas requerido para compensar toda la emisión nueva de ETH.

Así que, por ejemplo, si `X` (emisión diaria de ETH) aumenta a 1.800 en función del total de ETH apostado, `f(X)` (gwei requerido para compensar toda la emisión) entonces sería `17 gwei` (usando 2 dígitos significativos)

## Más información {#further-reading}

- [La Fusión](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/): _Tableros disponibles para visualizar la emisión y quema de ETH en tiempo real_
- [Registrando la emisión de Ethereum](https://www.attestant.io/posts/charting-ethereum-issuance/): _Jim McDonald 2020_
