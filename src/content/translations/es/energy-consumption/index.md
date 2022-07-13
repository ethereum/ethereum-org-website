---
title: Consumo energético de Ethereum
description: La información básica que necesitas para entender el consumo de energía de Ethereum.
lang: es
sidebar: true
---

# Consumo energético de Ethereum {#introduction}

El gasto actual de energía de Ethereum con [prueba de trabajo](/developers/docs/consensus-mechanisms/#proof-of-work) es demasiado alto e insostenible. Resolver los problemas de consumo energético sin sacrificar la seguridad y la descentralización es un reto técnico importante y ha sido foco de investigación y desarrollo durante años. Exploremos por qué la construcción de Ethereum ha tenido un impacto tan alto en el medio ambiente y como la siguiente actualización de la red a [prueba de participación](/developers/docs/consensus-mechanisms/pos) va a cambiarlo drásticamente.

## La energía protege la red {#energy-secures-the-network}

Las transacciones en la Blockchain de Ethereum son validadas por [mineros](/developers/docs/consensus-mechanisms/pow/mining). Los mineros unen transacciones formando bloques ordenados y los añaden a la Blockchain de Ethereum. Los nuevos bloques son transmitidos a todos los demás operadores de nodos que realizan transacciones de manera independiente y verifican que sean válidas. Cualquier deshonestidad o engaño se muestra inmediatamente como una inconsistencia entre los diferentes nodos. Los bloques honestos (o correctos) son incluidos a la Blockchain y se transforman en una parte inmutable de su historia.

La habilidad de cada minero para agregar nuevos bloques solo funciona si hay un costo asociado con la minería y la incapacidad para predecir en que nodo específico se agregará el siguiente bloque. Estas condiciones se consiguen al imponer la prueba de trabajo (PoW, por sus siglas en inglés). Para ser elegido para poder agregar un bloque de transacciones, quien esté minando debe resolver un puzzle computacional aleatorio más rápido que cualquier otro/a minero/a. Resolver los puzzles crea una competencia entre los/las mineros/as y costos en la forma de gasto energético. Para poder satisfactoriamente defraudar la Blockchain, un/a minero/a debería consistentemente ganar la carrera de la prueba de trabajo, lo cual es bastante poco probable y prohibitivamente costoso.

Ethereum ha utilizado la prueba-de-trabajo desde el inicio. Migrar desde la prueba-de-trabajo y hacia la prueba-de-participacion ha sido siempre un objetivo fundamental de Ethereum. Sin embargo, desarrollar un sistema de prueba-de-participacion que se adhiera a los principios básicos de seguridad y descentralización de Ethereum no es trivial. Ha requerido mucha investigación y avances en criptografía, criptoeconomía y diseño de mecanismos para llegar a un punto en que la transición es posible.

## Gastos energéticos de la prueba-de-trabajo {#proof-of-work}

La prueba-de-trabajo es una manera robusta de asegurar la red y hacer cumplir cambios honestos en el blockchain, pero es problemática por varias razones. Dado que el derecho a minar un bloque requiere resolver un rompecabezas computacional arbitrario, Los mineros pueden aumentar sus probabilidades de éxito invirtiendo en hardware más potente. Estos incentivos provocan una carrera armamentista en la que los mineros adquieren equipo minero que necesita cada vez más poder. El protocolo de prueba-de-trabajo de Ethereum tiene actualmente un consumo de energía anual total aproximadamente igual al de Finlandia <sup>[^1]</sup> y huella de carbono similar a Suiza<sup>[^1]</sup>.

## Prueba de participación {#proof-of-stake}

Ya se está construyendo un futuro más verde para Ethereum en forma de una cadena a [** prueba-de-participacion (PoS por sus siglas en inglés)**](/eth2/beacon-chain/). Bajo la [ prueba-de-participacion](/developers/docs/consensus-mechanisms/pos/), la resolución de rompecabezas arbitrarios es innecesaria. Eliminar la resolución de problemas reduce drásticamente el gasto energético necesario para asegurar la red. Los mineros son reemplazados por validadores que realizan la misma función excepto que en lugar de gastar sus activos de antemano en forma de trabajo computacional, comprometen ETH como garantía contra el comportamiento deshonesto. Si el validador es perezoso (fuera de linea cuando se supone que deben cumplir con algún deber de validador) su ETH comprometido puede perderse lentamente, mientras que el comportamiento deshonesto resulta en que los activos en juego sean "recortados". Esto incentiva una participación activa y honesta en la seguridad de la red con fuerza.

Del mismo modo a la prueba de trabajo, una entidad maliciosa requeriría al menos el 51% del total de ETH apostado en la red para ejecutar un ataque del [51%](/glossary/#51-attack). Sin embargo, a diferencia de la prueba de trabajo, donde la pérdida potencial de un ataque fallido es sólo el costo de generar el poder de hash necesario para minar, en la prueba de participación, la posible pérdida de un ataque es la cantidad total de ETH. utilizado como garantía. Esta estructura de desincentivo permite la seguridad de la red con prueba de participación y elimina la necesidad de gastar energía en cálculos arbitrarios. Se pueden encontrar explicaciones detalladas de la seguridad de la red bajo prueba de participación [ aquí ](/developers/docs/consensus-mechanisms/pos/) y [ aquí ](https://vitalik.ca/general/2017/12/31/pos_faq.html).

## La fusión {#the-merge}

There is a functional proof-of-stake chain called the [Beacon Chain](/eth2/beacon-chain/) that has been running since December 2020 that is demonstrating the viability of the proof-of-stake protocol. The merge refers to the point in time when Ethereum leaves proof-of-work behind and fully adopts proof-of-stake. The merge is expected to happen ~Q2 2022. [Más información sobre la fusión](/eth2/merge/).

## Proof-of-stake energy expenditure {#proof-of-stake-energy}

As well as building confidence in the proof-of-stake mechanism, the Beacon Chain also enables estimates of Ethereum's post-merge energy usage. A [recent estimate](https://blog.ethereum.org/2021/05/18/country-power-no-more/) suggested that the merge to proof-of-stake could result in a 99.95% reduction in total energy use, with proof-of-stake being ~2000x more energy-efficient than proof-of-work. The energy expenditure of Ethereum will be roughly equal to the cost of running a home computer for each node on the network.

![imagen](energy_use_per_transaction.png)

<p style="text-align: center;"><small><i>Estimate of PoW energy consumption per tx used in figure based on <a href="https://blog.ethereum.org/2021/05/18/country-power-no-more/" target="_blank" rel="noopener noreferrer">May 2021 data</a>, at time of writing the same source suggested up to <a href="https://digiconomist.net/ethereum-energy-consumption" target="_blank" rel="noopener noreferrer">175.56 Kwh</a></i></small></p>

Let's compare these numbers to a service such as Visa. 100.000 transacciones de Visa usan 149 kWh de energía<sup>[^2]</sup>. Assuming sharding has been implemented, Ethereum's current transaction rate (15 transactions per second) will be increased by at least 64x (the number of shards), not accounting for additional optimization from rollups. A realistic estimate for post-merge, sharded Ethereum with rollups is [25,000 - 100,000](https://twitter.com/VitalikButerin/status/1312905884549300224?s=20) transactions per second. We can use this information to estimate maximum and minimum energy expenditure per 100,000 transactions.

- 25,000 transactions per second.
- `100,000 / 25,000 = 4` seconds to process 100,000 transactions.

We can also estimate Ethereum's energy expenditure per second, making a conservative estimate that 10,000 active validators are securing the network (there are over [250,000 validators on the Beacon Chain](https://beaconscan.com/) at the moment, but many validators can operate on a single node. Currently, there are estimated to be 3,000-4,000 individual nodes, so 10,000 is a conservative estimate for post-merge):

`1,44kWh uso diario * 10.000 nodos de red = 14.400kWh` por día. There are 86,400 seconds in a day, so `14,400 / 86,400 = 0.1667 kWh` per second.

If we multiply that by the amount of time it takes to process 100,000 transaction: `0.1667 * 4 = 0.667 kWh`.

This is ~0.4% of the energy used by Visa for the same number of transactions, or a reduction in energy expenditure by a factor of ~225 compared to Ethereum's current proof-of-work network.

Repeating the calculation with the maximum transactions-per-second yields 0.1667 kWh per second which is about 0.1% of the energy expenditure of Visa, or a reduction of ~894x.

_Note: it's not entirely accurate to compare based on number of transactions as Ethereum's energy usage is time-based. The energy usage of Ethereum is the same in 1 minute regardless if it does 1 or 1,000 transactions._

_We must also consider that Ethereum isn't limited to simple financial transactions but is also a complete platform built for smart contracts and decentralized applications._

## A greener Ethereum {#green-ethereum}

While Ethereum's energy consumption has historically been substantial, there has been a major investment of developer time and intellect into transitioning from energy-hungry to energy-efficient block validation. To quote [Bankless](http://podcast.banklesshq.com/), the best way to reduce the energy consumed by proof-of-work is simply to "turn it off", which is the approach Ethereum has committed to take.

<InfoBanner emoji=":evergreen_tree:">
  Si cree que estas estadísticas son incorrectas o pueden ser más exactas, cree un asunto o una solicitud de extracción. These are estimates by the ethereum.org team made using publicly accessible information and the current Ethereum roadmap. These statements don't represent an official promise from the Ethereum Foundation. 
</InfoBanner>

## Más información {#further-reading}

- [A country's worth of power, no more](https://blog.ethereum.org/2021/05/18/country-power-no-more/) – _Carl Beekhuizen, 18 de mayo de 2021_
- [Ethereum Emissions: A Bottom-up Estimate](https://kylemcdonald.github.io/ethereum-emissions/) _ Kyle McDonald_
- [Ethereum Energy Consumption Index](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) — *[@InsideTheSim](https://twitter.com/InsideTheSim)*

## Temas relacionados {#related-topics}

- [Ethereum's vision](/eth2/vision/)
- [La cadena de baliza](/eth2/beacon-chain)
- [La fusión](/eth2/merge/)
- [Fragmentación](/eth2/beacon-chain/)

### Fuentes y pies de página {#footnotes-and-sources}

#### 1. Ethereum proof-of-work energy consumption {#fn-1}

[Energy Consumption by Country inc. Ethereum (Annualized TWh)](https://digiconomist.net/ethereum-energy-consumption)

#### 2. Consumo de energía de Visa {#fn-2}

[Bitcoin network average energy consumption per transaction compared to VISA network as of 2020, Statista](https://www.statista.com/statistics/881541/bitcoin-energy-consumption-transaction-comparison-visa/)

[Visa financials report Q4 2020](https://s1.q4cdn.com/050606653/files/doc_financials/2020/q4/Visa-Inc.-Q4-2020-Operational-Performance-Data.pdf)
