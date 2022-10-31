---
title: Consumo energético de Ethereum
description: La información básica que necesita saber para entender el consumo energético de Ethereum.
lang: es
---

# Consumo energético de Ethereum {#introduction}

El gasto energético actual de Ethereum con la [prueba de trabajo](/developers/docs/consensus-mechanisms/#proof-of-work) es demasiado alto e insostenible. Resolver los problemas de consumo energético sin que ello merme la seguridad y la descentralización es un reto técnico considerable y ha sido materia de investigación y desarrollo durante años. Analicemos por qué la creación de Ethereum ha tenido un impacto tan alto en el medio ambiente y cómo la siguiente actualización de la red a [prueba de participación](/developers/docs/consensus-mechanisms/pos) va a cambiar eso drásticamente.

## La energía protege la red {#energy-secures-the-network}

Los [mineros](/developers/docs/consensus-mechanisms/pow/mining) validan las transacciones en la cadena de bloques de Ethereum. Ellos agrupan las transacciones en bloques ordenados y los añaden a la cadena de bloques de Ethereum. Los nuevos bloques se transmiten a todos los demás operadores de nodos que realizan transacciones de manera independiente y verifican su validez. Cualquier falta de honestidad se muestra como una inconsistencia entre los diferentes nodos. Los bloques honestos se añaden a la cadena de bloques y se transforman en una parte inmutable de su historia.

La habilidad de cada minero para agregar nuevos bloques solo funciona si hay un costo asociado con la minería y la incapacidad para predecir en qué nodo específico se agregará el siguiente bloque. Estas condiciones se consiguen al imponer la prueba de trabajo (PoW, por sus siglas en inglés). Para poder añadir un bloque de transacciones, un minero debe resolver un rompecabezas computacional aleatorio más rápido que nadie. Resolver estos rompecabezas fomenta la competencia entre mineros y costes expresados en gasto energético. Para poder defraudar satisfactoriamente a la cadena de bloques, un minero debería ganar la carrera de prueba de trabajo sistemáticamente, lo cual es muy poco probable y demasiado costoso.

Ethereum ha utilizado la prueba de trabajo desde su inicio. Cambiar la prueba de trabajo por la prueba de participación ha sido siempre un objetivo fundamental de Ethereum. Sin embargo, desarrollar un sistema de prueba de participación que se adhiera a los principios básicos de seguridad y descentralización de Ethereum no resulta nada sencillo. Esta transición ha sido fruto de largas horas de investigación y avances en criptografía, criptoeconomía y diseño de mecanismos.

## Gastos energéticos de la prueba de trabajo {#proof-of-work}

La prueba de trabajo es una manera inquebrantable de asegurar la red y hacer cumplir cambios honestos en la cadena de bloques, aunque esta llega a ser problemática por varias razones. Dado que el derecho a minar un bloque requiere la resolución acertada de un rompecabezas computacional aleatorio, los mineros pueden aumentar sus probabilidades de éxito invirtiendo en un hardware más potente. Estos incentivos provocan una carrera de armamento en la que los mineros adquieren un equipo de minería que consume cada vez más energía. El protocolo actual de prueba de trabajo de Ethereum supone un consumo total de energía anual casi equivalente al de Finlandia <sup>[^1]</sup> y una huella de carbono similar a la de Suiza<sup>[^1]</sup>.

## Prueba de participación {#proof-of-stake}

Un futuro más ecológico para Ethereum se está materializando en forma de una [cadena de **prueba de participación (PoS, por sus siglas en inglés)**](/upgrades/beacon-chain/). Para optar a la [ prueba de participación](/developers/docs/consensus-mechanisms/pos/), es necesario resolver un rompecabezas aleatorio. Eliminar la resolución del rompecabezas reduce en gran medida el gasto energético necesario para asegurar la red. Los mineros se reemplazan por validadores que realizan la misma función salvo que, en lugar de gastar sus activos de antemano en forma de trabajo computacional, apuestan por ETH como garantía contra el comportamiento deshonesto. Si el validador es perezoso (no está en línea cuando se supone que debería cumplir con algún deber de validador), su ETH apostado puede perderse lentamente, mientras que el comportamiento deshonesto provoca que los activos apostados sean «recortados». Esto incentiva una participación activa y honesta para asegurar la red.

Como sucede con la prueba de trabajo, una entidad maliciosa requeriría al menos el 51% del total de ETH apostado en la red para ejecutar un [ataque del 51%](/glossary/#51-attack). Sin embargo —a diferencia de la prueba de trabajo, donde la pérdida potencial por un ataque fallido solo repercute en el coste de generar el poder de hash necesario para minar— en la prueba de participación, la posible pérdida por un ataque implica la cantidad total de ETH utilizado como garantía. Esta estructura disuasoria contempla la seguridad de la red con prueba de participación y elimina la necesidad de gastar energía en cálculos arbitrarios. Se pueden encontrar explicaciones detalladas de la seguridad de la red en la prueba de participación pulsando [aquí](/developers/docs/consensus-mechanisms/pos/) y [aquí](https://vitalik.ca/general/2017/12/31/pos_faq.html).

## La fusión {#the-merge}

Existe una cadena funcional basada en la prueba de participación llamada [cadena de baliza](/upgrades/beacon-chain/), que lleva ejecutándose desde diciembre de 2020 y ha demostrado la viabilidad del protocolo de la prueba de participación. La fusión hace referencia al momento en que Ethereum deja atrás la prueba de trabajo y adopta completamente la prueba de participación. Se espera que la fusión suceda durante el tercer/cuarto trimestre de 2022. [Más información sobre la fusión](/upgrades/merge/).

## Gasto energético de la prueba de participación {#proof-of-stake-energy}

Además de generar confianza en el mecanismo de la prueba de participación, la cadena de baliza también permite estimar el uso energético de Ethereum después de la fusión. Una [estimación reciente](https://blog.ethereum.org/2021/05/18/country-power-no-more/) sugirió que la fusión con la prueba de participación podría reducir un 99,95 % el uso total de la energía. La prueba de participación es ~2000 veces más eficiente en el uso de energía que la prueba de trabajo. El gasto energético de Ethereum será aproximadamente igual al coste de tener un ordenador doméstico para cada nodo de la red.

![imagen](energy_use_per_transaction.png)

<p style="text-align: center;"><small><i>Una estimación del consumo energético PoW por intercambio usado en la figura basada en <a href="https://blog.ethereum.org/2021/05/18/country-power-no-more/" target="_blank" rel="noopener noreferrer">datos de mayo de 2021</a>, el día en que se publicó, en la que la misma fuente sugería hasta <a href="https://digiconomist.net/ethereum-energy-consumption" target="_blank" rel="noopener noreferrer">175,6 Kwh</a></i></small></p>

Comparemos estos números con un servicio como Visa. Donde 100.000 transacciones de Visa usan 149 kWh de energía<sup>[^2]</sup>. Asumiendo que se ha implementado la fragmentación, la tasa de transacción actual de Ethereum (15 transacciones por segundo) se incrementará al menos 64 veces (el número de fragmentos), sin tener en cuenta la optimización adicional de acumulaciones (o «rollups»). Una estimación realista para la posfusión de Ethereum fragmentado con acumulaciones sería de [25.000 - 100.000](https://twitter.com/VitalikButerin/status/1312905884549300224?s=20) transacciones por segundo. Podemos utilizar esta información para estimar el gasto máximo y mínimo de energía por cada 100.000 transacciones.

- 25.000 transacciones por segundo.
- `100.000 / 25.000 = 4` segundos para procesar 100.000 transacciones.

También podemos estimar el gasto energético de Ethereum por segundo, haciendo una estimación moderada de que 10.000 validadores activos están asegurando la red (hay más de [250.000 validadores en la cadena de baliza](https://beaconscan.com/) en este momento, pero muchos validadores pueden operar en un solo nodo. Actualmente, se estima que hay entre 3.000 y 4.000 nodos individuales, por lo que 10.000 es una estimación moderada para la posfusión):

`1,44 kWh de uso diario * 10.000 nodos de red = 14.400 kWh` por día. Un día tiene 86.400 segundos, por lo tanto `14.400 / 86.400 = 0,1667 kWh` por segundo.

Si multiplicamos esa cifra por el tiempo que se tarda en procesar 100.000 transacciones: `0,1667 * 4 = 0,667 kWh`.

Esto es aproximadamente un 0,4 % de la energía utilizada por Visa para el mismo número de transacciones, o una reducción del gasto energético en un factor aproximado de 225, en comparación con la actual red de pruebas de trabajo de Ethereum.

Repitiendo el cálculo con el máximo de transacciones de 0,1667 kWh por segundo, que es alrededor del 0,1% del gasto energético de Visa, o una reducción de cerca de 894 veces.

_Nota: no es del todo preciso comparar basándose en el número de transacciones ya que el uso energético de Ethereum se basa en el tiempo. El consumo energético de Ethereum es el mismo en 1 minuto al margen de si realiza 1 o 1.000 transacciones._

_También debemos considerar que Ethereum no se limita a simples transacciones financieras, sino que también es una plataforma completa, construida para contratos inteligentes y aplicaciones descentralizadas._

## Un Ethereum más verde: Eth2 {#green-ethereum}

Mientras que el consumo energético de Ethereum siempre ha sido considerable, los desarrolladores han dedicado una parte importante de su tiempo y materia gris a la transición de la dependencia energética a la validación de bloques energéticamente eficientes. Según afirma [Bankless](http://podcast.banklesshq.com/), la mejor manera de reducir el consumo energético de la prueba de trabajo es simplemente «apagarla», que es el enfoque que Ethereum se ha comprometido a seguir.

<InfoBanner emoji=":evergreen_tree:">
  Si considera que estas estadísticas son incorrectas o pueden ser más exactas, cree una incidencia o PR. Estas son estimaciones realizadas por el equipo de ethereum.org utilizando información pública y el diseño actual de Eth2. Estas declaraciones no representan una promesa oficial por parte de la Fundación Ethereum. 
</InfoBanner>

## Más información {#further-reading}

- [El valor energético de un país; nada más](https://blog.ethereum.org/2021/05/18/country-power-no-more/) — _Carl Beekhuizen, 18 de mayo de 2021_
- [Consumo energético de Ethereum](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)
- [Emisiones de Ethereum Emissions: una estimación de menos a más](https://kylemcdonald.github.io/ethereum-emissions/) _ Kyle McDonald_
- [Índice de consumo energético de Ethereum](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/),_[@InsideTheSim](https://twitter.com/InsideTheSim)_

## Temas relacionados {#related-topics}

- [Visión de Ethereum](/upgrades/vision/)
- [La cadena de baliza](/upgrades/beacon-chain)
- [La fusión](/upgrades/merge/)
- [Fragmentación](/upgrades/beacon-chain/)

### Fuentes y pies de página {#footnotes-and-sources}

#### 1. Consumo energético de la prueba de trabajo de Ethereum {#fn-1}

[Consumo energético por país incluyendo Ethereum (TWh por año)](https://digiconomist.net/ethereum-energy-consumption)

#### 2. Consumo energético de Visa {#fn-2}

[Consumo energético promedio de la red Bitcoin por transacción, en comparación con la red VISA a partir de 2020, Statista](https://www.statista.com/statistics/881541/bitcoin-energy-consumption-transaction-comparison-visa/)

[Informe financiero de Visa, 4.º trimestre de 2020](https://s1.q4cdn.com/050606653/files/doc_financials/2020/q4/Visa-Inc.-Q4-2020-Operational-Performance-Data.pdf)
