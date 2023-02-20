---
title: Valor máximo extraíble (MEV)
description: Introducción al valor máximo extraíble (MEV)
lang: es
---

El valor máximo extraíble (MEV) se refiere al valor máximo que se puede extraer de la producción de bloques por encima de la recompensa de bloques y las tarifas de gas estándares incluyendo, excluyendo y cambiando el orden de las transacciones en un bloque.

### Valor extraíble del minero

Este concepto se aplicó por primera vez en el contexto de [prueba de trabajo](/developers/docs/consensus-mechanisms/pow/) e inicialmente se denominaba "valor extraíble del minero". Esto es porque en la prueba de trabajo, los mineros controlan la inclusión, la exclusión y el orden de las transacciones. Sin embargo, después del paso a la prueba de participación mediante [La fusión](/upgrades/merge), los validadores serán responsables de estas funciones y ya no se aplicará el minado. Los métodos de extracción de valor aquí presentes seguirán estando después de esta transición, y por lo tanto se necesitaba un cambio de nombre. Para mantener el mismo acrónimo para la continuidad manteniendo el mismo significado fundamental, el "valor extraíble máximo" ahora se usa como un reemplazo más inclusivo.

## Pre requisitos {#prerequisites}

Asegúrese de estar familiarizado con las [transacciones](/developers/docs/transactions/), los [bloques](/developers/docs/blocks/), el [gas](/developers/docs/gas/) y el [minado](/developers/docs/consensus-mechanisms/pow/mining/). Familiarizarse con las [dApps](/dapps/) y [DeFi](/defi/) también le será muy útil.

## Extracción de MEV {#mev-extraction}

En teoría, el MEV recae totalmente en los mineros debido a que los mineros son la única parte que puede garantizar la ejecución de una oportunidad de MEV rentable (al menos en la cadena de prueba de trabajo actual; esto cambiará luego de [La fusión](/upgrades/merge/)). De cualquier manera, en la práctica, una gran porción del MEV es extraído por participantes de la red independientes conocidos como "buscadores". Los buscadores ejecutan algoritmos complejos en datos de la cadena de bloques para detectar oportunidades rentables de MEV y tienen bots que en automático envían esas transacciones rentables a la red.

Los mineros obtienen una porción del MEV total de cualquier forma, ya que los buscadores están dispuestos a pagar altas tarifas de gas (que van al minero) a cambio de una mayor probabilidad de inclusión de sus transacciones rentables en un bloque. Asumiendo que los buscadores son económicamente racionales, la tarifa de gas que estarán dispuestos a pagar será de un monto hasta un 100% del MEV del buscador ( porque si la tarifa de gas fuera más alta, el buscador estaría perdiendo dinero).

Así, en algunas oportunidades de MEV altamente competitivas, como el [arbitraje en DEX](#mev-examples-dex-arbitrage), los buscadores podría llegar a pagar un 90% o incluso más de los ingresos totales en MEV en tarifas de gas al minero, pues mucha gente quiere ejecutar la misma transacción de arbitraje rentable. Esto es porque la única manera de garantizar que esas transacciones de arbitraje se ejecuten es que envíen la transacción con el precio de gas más alto.

### Gas golfing {#mev-extraction-gas-golfing}

Está dinámica a hecho que ser bueno en el "gas golfing" —programar transacciones de manera que usen la menor cantidad de gas— sea una ventaja competitiva, pues permite a los buscadores fijar un precio de gas más alto, mientras mantienen sus tarifas de gas constantes (tarifas de gas = precio del gas \* gas usado).

Algunas de las técnicas más conocidas del gas golfing incluyen usar direcciones que comiencen con una larga cadena de ceros (p. ej., [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://etherscan.io/address/0x0000000000c521824eaff97eac7b73b084ef9306)), ya que usan menos espacio (y por lo tanto menos gas) de almacenamiento; y dejar saldos de tokens [ERC-20](/developers/docs/standards/tokens/erc-20/) pequeños en los contratos, ya que cuesta más gas inicializar un espacio de almacenamiento (si el saldo es 0) que actualizar un espacio de almacenamiento. Encontrar más técnicas para reducir el uso de gas es un área de investigación muy activa entre los investigadores.

### Frontrunners generalizados {#mev-extraction-generalized-frontrunners}

En vez de programar algoritmos complejos capaces de detectar oportunidades de MEV rentables, algunos buscadores ejecutan frontrunnes generalizados. Los frontrunnes generalizados son bots que observan la zona de espera, o mempool, para detectar transacciones rentables. El frontrunner copia el código de transacción potencialmente rentable, reemplaza las direcciones con la dirección del frontrunner y ejecuta la transacción localmente para verificar que la transacción modificada resulte en una ganancia para la dirección del frontrunner. Si la transacción es efectivamente rentable, el frontrunner entregará la transacción modificada con la dirección reemplazada y un precio de gas más alto eligiendo la transacción original ("frontrunning") y obteniendo el MEV del buscador original.

### Flashbots {#mev-extraction-flashbots}

Flashbots es un proyecto independiente que extiende el cliente go-ethereum con un servicio que permite a los buscadores enviar transacciones MEV a mineros sin revelarlas a la zona de espera pública. Esto evita el frontrunning por parte de los frontrunners generalizados.

Al momento de escribir este artículo, una parte significativa de las transacciones de MEV se enrutan mediante Flashbots, lo que significa que los frontrunners generalizados no son tan efectivos como lo solían ser.

## Ejemplos de MEV {#mev-examples}

El MEV surge en la cadena de bloques de varias formas.

### Arbitraje en DEX {#mev-examples-dex-arbitrage}

El arbitraje en [exchanges descentralizados](/glossary/#dex) (DEX) es la oportunidad más simple y conocida de MEV. Como resultado, también es la más competitiva.

Funciona así: si dos DEX ofrecen el mismo token a diferentes precios, alguien puede comprar el token en el DEX más barato y venderlo en el DEX de mayor precio en una sola transacción atómica. Gracias a las mecánicas de la cadena de bloques, esto es un verdadero arbitraje sin riesgos.

[Este es un ejemplo](https://etherscan.io/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) de una transacción de arbitraje rentable donde un buscador convirtió 1.000 ETH en 1,045 ETH aprovechando diferentes precios del par ETH/DAI en Uniswap vs. Sushiswap.

### Liquidaciones {#mev-examples-liquidations}

Las liquidaciones de protocolo de préstamo presentan otra muy conocida oportunidad de MEV.

Los protocolos de préstamo como Maker y Aavve funcionan requiriendo a los usuarios que depositen algún tipo de colateral (por ejemplo, ETH). Los usuarios pueden pedir prestados diferentes activos y tokens de otras personas dependiendo de lo que necesiten (por ejemplo, pueden pedir prestado MKR si quieren votar sobre una propuesta de gobernanza de MakerDAO o SUSHI si quieren ganar una porción de las comisiones de transacción en Sushiswap) hasta una cierta cantidad de su colateral depositado, por ejemplo, un 30% (el porcentaje de poder de préstamo exacto está determinado por el protocolo). Los usuarios a los que piden prestados los otros tokens funcionan como prestamistas en este caso.

Como el valor del colateral de quien pide el préstamo fluctúa, también lo hace su poder de préstamo. Si, debido a las fluctuaciones del mercado, el valor de los activos prestados excede, digamos, el 30% del valor de su colateral (nuevamente, el porcentaje exacto está determinado por el protocolo), el protocolo típicamente permite a cualquiera liquidar el colateral, pagando al instante a los prestamistas (esto es similar al funcionamiento de las [llamadas de margen](https://www.investopedia.com/terms/m/margincall.asp) en las finanzas tradicionales). Si se liquida el colateral, el prestatario generalmente tiene que pagar una tasa de liquidación importante, parte de la cual va al liquidador, que es donde entra en juego la oportunidad de MEV.

Los buscadores compiten para analizar datos de la cadena de bloques lo más rápido posible para determinar qué prestatarios pueden ser líquidados y ser los primeros en enviar una transacción de liquidación y hacerse de la tasa de liquidación.

### Intercambio sándwich {#mev-examples-sandwich-trading}

El intercambio sándwich es otro método común de extracción de MEV.

Para esta operación, un buscador intentará localizar operaciones grandes en DEX en la zona de espera. Por ejemplo, supongamos que alguien quiere comprar 10.000 UNI con DAI en Uniswap. Una operación de esta magnitud tendrá un efecto significativo en el par UNI/DAI, lo que podría aumentar significativamente el precio de UNI en relación con DAI.

Un buscador puede calcular el efecto de precio aproximado de esta gran operación en el par UNI/DAI y ejecutar una orden de compra óptima inmediatamente _antes_ de la gran transacción, comprando UNI barato y luego colocando una orden de venta inmediatamente _después_ de la gran transacción, vendiendo por el precio más alto causado por la orden grande.

Sin embargo, el sandwiching, es más arriesgado, ya que no es atómico (a diferencia del arbitraje en DEX, como se describió anteriormente) y es propenso a un [ataque de salmonela](https://github.com/Defi-Cartel/salmonella).

### MEV de NFT {#mev-examples-nfts}

El MEV en el espacio de NFT es un fenómeno emergente y no es necesariamente rentable.

Sin embargo, dado que las transacciones de NFT ocurren en la misma cadena de bloques compartida por todas las demás transacciones de Ethereum, los buscadores pueden utilizar técnicas similares a las utilizadas en oportunidades de MEV tradicionales en el mercado de NFT también.

Por ejemplo, si hay un drop de NFT popular y un buscador quiere un cierto NFT o conjunto de NFT, puede programar una transacción de tal forma que sea la primera persona en la fila para comprar el NFT o puede comprar todo el conjunto de NFT en una sola transacción. O si un NFT es [erróneamente listado a un bajo precio](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), un buscador puede adelantarse a otros compradores con frontrunning y llevárselo barato.

Un ejemplo prominente de MEV de NFT ocurrió cuando un buscador gastó USD 7 millones para [comprar](https://etherscan.io/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5) todos los Cryptopunks al precio mínimo. Un investigador de la cadena de bloques [explicó en Twitter](https://twitter.com/IvanBogatyy/status/1422232184493121538) cómo el comprador trabajó con un proveedor de MEV para mantener su compra en secreto.

### La cola larga {#mev-examples-long-tail}

El arbitraje en DEX, las liquidaciones y las operaciones sándwich son oportunidades muy conocidas de MEV y es poco probable que sean rentables para los nuevos buscadores. Sin embargo, existe una larga cola de oportunidades de MEV menos conocidas (el MEV de NFT es posiblemente una de esas oportunidades).

Los buscadores que acaben de iniciarse pueden encontrar más éxito buscando MEV en esta cola más larga. La [tabla de trabajo de MEV](https://github.com/flashbots/mev-job-board) de Flashbot muestra algunas oportunidades emergentes.

## Efectos del MEV {#effects-of-mev}

No todo sobre el MEV es malo: hay consecuencias tanto positivas como negativas para el MEV en Ethereum.

### Lo positivo {#effects-of-mev-the-good}

Muchos proyectos DeFi dependen de actores económicamente racionales para asegurar la utilidad y la estabilidad de sus protocolos. Por ejemplo, el arbitraje en DEX asegura que los usuarios obtengan los mejores y más correctos precios para sus tokens, y los protocolos de préstamo dependen de liquidaciones rápidas cuando los prestatarios caen por debajo de los ratios de colateralización para garantizar que los prestamistas reciban el pago.

Sin que los buscadores racionales busquen y corrijan ineficiencias económicas y aprovechen los incentivos económicos de los protocolos, los protocolos de DeFi y las dApps en general podrían no ser tan robustos como lo son hoy en día.

### Lo negativo {#effects-of-mev-the-bad}

En la capa de aplicación, algunas formas de MEV, como las transacciones sándwich, dan como resultado una experiencia rotundamente peor para los usuarios. Los usuarios hechos sándwich se enfrentan a un aumento en los deslizamientos y a una peor ejecución de sus transacciones.

En la capa de red, los frontrunners generalizados y las subastas de precio de gas en las que suelen participar (cuando dos o más frontrunners compiten para que su transacción se incluya en el siguiente bloque aumentando progresivamente el precio del gas de sus transacciones) dan como resultado congestión de la red y altos precios del gas para todos los demás que intentan realizar transacciones regulares.

Más allá de lo que suceda _dentro de_ los bloques, el MEV puede tener efectos perjudiciales _entre_ los bloques. Si el MEV disponible en un bloque excede significativamente la recompensa de bloque estándar, los mineros querer reminar bloques y capturar el MEV para ellos, causando la reorganización de la cadena de bloques y la inestabilidad del consenso.

Esta posibilidad de reorganización de la cadena de bloques se ha [explorado previamente en la cadena de bloques de Bitcoin](https://dl.acm.org/doi/10.1145/2976749.2978408). A medida que la recompensa de bloque de Bitcoin se reduce a la mitad y las comisiones de transacción componen una porción cada vez más grande de la recompensa de bloque, surgen situaciones en las que se vuelve económicamente racional que los mineros renuncien a la recompensa del siguiente bloque y en su lugar reminen bloques pasados con tarifas más altas. Con el crecimiento del MEV, podría ocurrir el mismo tipo de situación en Ethereum, lo que amenaza la integridad de la cadena de bloques.

## Estado del MEV {#state-of-mev}

La extracción del MEV se disparó a principios de 2021, lo que dio lugar a precios extremadamente altos del gas en los primeros meses del año. El surgimiento del relay de MEV de Flashbots ha reducido la efectividad de los frontrunners generalizados y ha quitado de la cadena las subastas de gas, lo que resultó en la baja de precios del gas para los usuarios corrientes.

Si bien muchos buscadores todavía están ganando mucho dinero con el MEV, a medida que las oportunidades se vuelvan más conocidas y cada vez más buscadores compitan por la misma oportunidad, los mineros captarán cada vez más ingresos de MEV totales (porque el mismo tipo de subastas de gas que se describió originalmente también ocurre en Flashbots, aunque de forma privada, y los mineros captarán los ingresos resultantes del gas). El MEV además no es exclusivo de Ethereum, y a medida que las oportunidades se vuelven más competitivas en Ethereum, los buscadores se están pasando a cadenas de bloques alternativas como Binance Smart Chain, donde existen oportunidades de MEV similares a las de Ethereum con menos competencia.

A medida que las DeFi crecen y aumentan en popularidad, el MEV pronto podría superar significativamente la recompensa de bloques base de Ethereum. Con ello surge una posibilidad creciente de reminado de bloques egoísta e inestabilidad del consenso. Algunos consideran que esto es una amenaza existencial para Ethereum, y la desincentivación del minado para uno mismo es un área de investigación activa en la teoría del protocolo Ethereum. Una solución que está siendo explorada actualmente es el [smoothing de recompensas de MEV](https://ethresear.ch/t/committee-driven-mev-smoothing/10408), es decir la reducción de la divergencia.

## Recursos relacionados {#related-resources}

- [Flashbots GitHub](https://github.com/flashbots/pm)
- [MEV-Explore](https://explore.flashbots.net/) _Panel de control y explorador de transacciones en vivo para transacciones MEV_

## Más información {#further-reading}

- [¿Qué es el valor extraíble del minero (MEV)?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV y yo](https://research.paradigm.xyz/MEV)
- [Ethereum es un bosque oscuro](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Escapar del bosque oscuro](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: frontrunning en la crisis de MEV](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [Hilos sobre MEV de @bertcmiller](https://twitter.com/bertcmiller/status/1402665992422047747)
