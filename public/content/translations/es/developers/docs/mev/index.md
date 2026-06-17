---
title: Valor máximo extraíble (MEV)
description: Una introducción al valor máximo extraíble (MEV)
lang: es
---

El valor máximo extraíble (MEV) se refiere al valor máximo que se puede extraer de la producción de bloques por encima de la recompensa de bloque estándar y las tarifas de gas al incluir, excluir y cambiar el orden de las transacciones en un bloque.

## Valor máximo extraíble {#maximal-extractable-value}

El valor máximo extraíble se aplicó por primera vez en el contexto de la [prueba de trabajo (PoW)](/developers/docs/consensus-mechanisms/pow/), y al principio se denominaba "valor extraíble del minero". Esto se debe a que en la prueba de trabajo, los mineros controlan la inclusión, exclusión y el orden de las transacciones. Sin embargo, desde la transición a la prueba de participación (PoS) a través de [La Fusión](/roadmap/merge), los validadores han sido responsables de estos roles, y la minería ya no forma parte del protocolo [Ethereum](/). Sin embargo, los métodos de extracción de valor aún existen, por lo que ahora se utiliza el término "Valor máximo extraíble" en su lugar.

## Requisitos previos {#prerequisites}

Asegúrese de estar familiarizado con las [transacciones](/developers/docs/transactions/), los [bloques](/developers/docs/blocks/), la [prueba de participación](/developers/docs/consensus-mechanisms/pos) y el [gas](/developers/docs/gas/). También es útil estar familiarizado con las [aplicaciones descentralizadas (dapps)](/apps/) y las [finanzas descentralizadas (DeFi)](/defi/).

## Extracción de MEV {#mev-extraction}

En teoría, el MEV se acumula en su totalidad para los validadores porque son la única parte que puede garantizar la ejecución de una oportunidad de MEV rentable. En la práctica, sin embargo, una gran parte del MEV es extraída por participantes independientes de la red denominados "buscadores". Los buscadores ejecutan algoritmos complejos en los datos de la cadena de bloques para detectar oportunidades de MEV rentables y tienen bots para enviar automáticamente esas transacciones rentables a la red.

De todos modos, los validadores obtienen una parte de la cantidad total de MEV porque los buscadores están dispuestos a pagar altas tarifas de gas (que van al validador) a cambio de una mayor probabilidad de inclusión de sus transacciones rentables en un bloque. Suponiendo que los buscadores sean económicamente racionales, la tarifa de gas que un buscador está dispuesto a pagar será una cantidad de hasta el 100 % del MEV del buscador (porque si la tarifa de gas fuera mayor, el buscador perdería dinero).

Con esto, para algunas oportunidades de MEV altamente competitivas, como el [arbitraje en DEX](#mev-examples-dex-arbitrage), los buscadores pueden tener que pagar el 90 % o incluso más de sus ingresos totales de MEV en tarifas de gas al validador porque muchas personas quieren ejecutar la misma operación de arbitraje rentable. Esto se debe a que la única forma de garantizar que se ejecute su transacción de arbitraje es si envían la transacción con el precio del gas más alto.

### Optimización de gas (Gas golfing) {#mev-extraction-gas-golfing}

Esta dinámica ha hecho que ser bueno en la "optimización de gas" (gas golfing) —programar transacciones para que utilicen la menor cantidad de gas— sea una ventaja competitiva, porque permite a los buscadores establecer un precio del gas más alto mientras mantienen constantes sus tarifas de gas totales (ya que tarifas de gas = precio del gas \* gas utilizado).

Algunas técnicas conocidas de optimización de gas incluyen: usar direcciones que comienzan con una larga cadena de ceros (por ejemplo, [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://eth.blockscout.com/address/0x0000000000C521824EaFf97Eac7B73B084ef9306)) ya que ocupan menos espacio (y por lo tanto gas) para almacenar; y dejar pequeños saldos de tokens [ERC-20](/developers/docs/standards/tokens/erc-20/) en los contratos, ya que cuesta más gas inicializar un slot de almacenamiento (el caso si el saldo es 0) que actualizar un slot de almacenamiento. Encontrar más técnicas para reducir el uso de gas es un área activa de investigación entre los buscadores.

### Frontrunners generalizados {#mev-extraction-generalized-frontrunners}

En lugar de programar algoritmos complejos para detectar oportunidades de MEV rentables, algunos buscadores ejecutan frontrunners generalizados. Los frontrunners generalizados son bots que observan la mempool para detectar transacciones rentables. El frontrunner copiará el código de la transacción potencialmente rentable, reemplazará las direcciones con la dirección del frontrunner y ejecutará la transacción localmente para verificar que la transacción modificada resulte en una ganancia para la dirección del frontrunner. Si la transacción es efectivamente rentable, el frontrunner enviará la transacción modificada con la dirección reemplazada y un precio del gas más alto, adelantándose ("frontrunning") a la transacción original y obteniendo el MEV del buscador original.

### Flashbots {#mev-extraction-flashbots}

Flashbots es un proyecto independiente que amplía los clientes de ejecución con un servicio que permite a los buscadores enviar transacciones de MEV a los validadores sin revelarlas a la mempool pública. Esto evita que las transacciones sean adelantadas por frontrunners generalizados.

## Ejemplos de MEV {#mev-examples}

El MEV surge en la cadena de bloques de varias maneras.

### Arbitraje en DEX {#mev-examples-dex-arbitrage}

El arbitraje en [exchanges descentralizados](/glossary/#dex) (DEX) es la oportunidad de MEV más simple y conocida. Como resultado, también es la más competitiva.

Funciona así: si dos DEX ofrecen un token a dos precios diferentes, alguien puede comprar el token en el DEX de menor precio y venderlo en el DEX de mayor precio en una sola transacción atómica. Gracias a la mecánica de la cadena de bloques, este es un arbitraje verdadero y sin riesgos.

[Aquí hay un ejemplo](https://eth.blockscout.com/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) de una transacción de arbitraje rentable donde un buscador convirtió 1.000 ETH en 1.045 ETH aprovechando los diferentes precios del par ETH/DAI en Uniswap frente a Sushiswap.

### Liquidaciones {#mev-examples-liquidations}

Las liquidaciones de protocolos de préstamos presentan otra oportunidad de MEV muy conocida.

Los protocolos de préstamos como MakerDAO y Aave requieren que los usuarios depositen algún colateral (por ejemplo, ETH). Este colateral depositado se utiliza luego para prestar a otros usuarios.

Los usuarios pueden entonces tomar préstamos de activos y tokens de otros dependiendo de lo que necesiten (por ejemplo, podría pedir prestado MKR si desea emitir un voto en una propuesta de gobernanza de MakerDAO) hasta un cierto porcentaje de su colateral depositado. Por ejemplo, si la cantidad de toma de préstamos es un máximo del 30 %, un usuario que deposita 100 DAI en el protocolo puede pedir prestado hasta el valor de 30 DAI de otro activo. El protocolo determina el porcentaje exacto de poder de endeudamiento.

A medida que fluctúa el valor del colateral de un prestatario, también lo hace su poder de endeudamiento. Si, debido a las fluctuaciones del mercado, el valor de los activos prestados supera, digamos, el 30 % del valor de su colateral (nuevamente, el porcentaje exacto lo determina el protocolo), el protocolo generalmente permite a cualquiera liquidar el colateral, pagando instantáneamente a los prestamistas (esto es similar a cómo funcionan las [llamadas de margen](https://www.investopedia.com/terms/m/margincall.asp) en las finanzas tradicionales). Si se liquida, el prestatario generalmente tiene que pagar una fuerte tarifa de liquidación, parte de la cual va al liquidador, que es donde entra la oportunidad de MEV.

Los buscadores compiten para analizar los datos de la cadena de bloques lo más rápido posible para determinar qué prestatarios pueden ser liquidados y ser los primeros en enviar una transacción de liquidación y cobrar la tarifa de liquidación para sí mismos.

### Trading de sándwich {#mev-examples-sandwich-trading}

El trading de sándwich es otro método común de extracción de MEV.

Para hacer un sándwich, un buscador observará la mempool en busca de grandes operaciones en DEX. Por ejemplo, supongamos que alguien quiere comprar 10.000 UNI con DAI en Uniswap. Una operación de esta magnitud tendrá un efecto significativo en el par UNI/DAI, elevando potencialmente de manera significativa el precio de UNI en relación con DAI.

Un buscador puede calcular el efecto aproximado en el precio de esta gran operación en el par UNI/DAI y ejecutar una orden de compra óptima inmediatamente _antes_ de la gran operación, comprando UNI a bajo precio, y luego ejecutar una orden de venta inmediatamente _después_ de la gran operación, vendiéndolo por el precio más alto causado por la gran orden.

Sin embargo, hacer un sándwich es más riesgoso ya que no es atómico (a diferencia del arbitraje en DEX, como se describió anteriormente) y es propenso a un [ataque de salmonela](https://github.com/Defi-Cartel/salmonella).

### MEV de NFT {#mev-examples-nfts}

El MEV en el espacio de los NFT es un fenómeno emergente y no es necesariamente rentable.

Sin embargo, dado que las transacciones de NFT ocurren en la misma cadena de bloques compartida por todas las demás transacciones de Ethereum, los buscadores también pueden usar técnicas similares a las utilizadas en las oportunidades de MEV tradicionales en el mercado de NFT.

Por ejemplo, si hay un lanzamiento popular de NFT y un buscador quiere un cierto NFT o conjunto de NFT, puede programar una transacción de tal manera que sea el primero en la fila para comprar el NFT, o puede comprar todo el conjunto de NFT en una sola transacción. O si un NFT se [lista por error a un precio bajo](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), un buscador puede adelantarse a otros compradores y adquirirlo a bajo precio.

Un ejemplo destacado de MEV de NFT ocurrió cuando un buscador gastó 7 millones de dólares para [comprar](https://eth.blockscout.com/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5?tab=txs) todos y cada uno de los Cryptopunks al precio mínimo. Un investigador de cadenas de bloques [explicó en Twitter](https://twitter.com/IvanBogatyy/status/1422232184493121538) cómo el comprador trabajó con un proveedor de MEV para mantener su compra en secreto.

### La larga cola {#mev-examples-long-tail}

El arbitraje en DEX, las liquidaciones y el trading de sándwich son oportunidades de MEV muy conocidas y es poco probable que sean rentables para los nuevos buscadores. Sin embargo, hay una larga cola de oportunidades de MEV menos conocidas (el MEV de NFT es posiblemente una de esas oportunidades).

Los buscadores que recién comienzan pueden encontrar más éxito buscando MEV en esta cola más larga. La [bolsa de trabajo de MEV](https://github.com/flashbots/mev-job-board) de Flashbots enumera algunas oportunidades emergentes.

## Efectos del MEV {#effects-of-mev}

El MEV no es del todo malo: hay consecuencias tanto positivas como negativas del MEV en Ethereum.

### Lo bueno {#effects-of-mev-the-good}

Muchos proyectos de finanzas descentralizadas (DeFi) dependen de actores económicamente racionales para garantizar la utilidad y estabilidad de sus protocolos. Por ejemplo, el arbitraje en DEX garantiza que los usuarios obtengan los mejores y más correctos precios para sus tokens, y los protocolos de préstamos dependen de liquidaciones rápidas cuando los prestatarios caen por debajo de los índices de colateralización para garantizar que los prestamistas reciban su pago.

Sin buscadores racionales que busquen y corrijan ineficiencias económicas y aprovechen los incentivos económicos de los protocolos, los protocolos DeFi y las aplicaciones descentralizadas (dapps) en general podrían no ser tan robustos como lo son hoy.

### Lo malo {#effects-of-mev-the-bad}

En la capa de aplicación, algunas formas de MEV, como el trading de sándwich, resultan en una experiencia inequívocamente peor para los usuarios. Los usuarios que son víctimas de un sándwich se enfrentan a un mayor deslizamiento y una peor ejecución en sus operaciones.

En la capa de red, los frontrunners generalizados y las subastas de precios de gas en las que a menudo participan (cuando dos o más frontrunners compiten para que su transacción se incluya en el siguiente bloque aumentando progresivamente el precio del gas de sus propias transacciones) resultan en congestión de la red y altos precios del gas para todos los demás que intentan ejecutar transacciones regulares.

Más allá de lo que sucede _dentro_ de los bloques, el MEV puede tener efectos perjudiciales _entre_ bloques. Si el MEV disponible en un bloque supera significativamente la recompensa de bloque estándar, los validadores pueden verse incentivados a reorganizar los bloques y capturar el MEV para sí mismos, causando una reorganización de la cadena de bloques y la inestabilidad del consenso.

Esta posibilidad de reorganización de la cadena de bloques ha sido [explorada previamente en la cadena de bloques de Bitcoin](https://dl.acm.org/doi/10.1145/2976749.2978408). A medida que la recompensa de bloque de Bitcoin se reduce a la mitad y las tarifas de transacción constituyen una porción cada vez mayor de la recompensa de bloque, surgen situaciones en las que se vuelve económicamente racional para los mineros renunciar a la recompensa del siguiente bloque y, en su lugar, volver a minar bloques pasados con tarifas más altas. Con el crecimiento del MEV, el mismo tipo de situación podría ocurrir en Ethereum, amenazando la integridad de la cadena de bloques.

## Estado del MEV {#state-of-mev}

La extracción de MEV se disparó a principios de 2021, lo que resultó en precios de gas extremadamente altos en los primeros meses del año. La aparición del relé de MEV de Flashbots ha reducido la eficacia de los frontrunners generalizados y ha llevado las subastas de precios de gas fuera de la cadena, reduciendo los precios del gas para los usuarios comunes.

Si bien muchos buscadores todavía ganan buen dinero con el MEV, a medida que las oportunidades se vuelven más conocidas y más y más buscadores compiten por la misma oportunidad, los validadores capturarán cada vez más ingresos totales de MEV (porque el mismo tipo de subastas de gas descritas originalmente también ocurren en Flashbots, aunque de forma privada, y los validadores capturarán los ingresos de gas resultantes). El MEV tampoco es exclusivo de Ethereum, y a medida que las oportunidades se vuelven más competitivas en Ethereum, los buscadores se están moviendo a cadenas de bloques alternativas como Binance Smart Chain, donde existen oportunidades de MEV similares a las de Ethereum con menos competencia.

Por otro lado, la transición de la prueba de trabajo a la prueba de participación y el esfuerzo continuo para escalar Ethereum utilizando rollups cambian el panorama del MEV de maneras que aún son algo inciertas. Todavía no se sabe bien cómo el hecho de tener proponentes de bloque garantizados conocidos con un poco de antelación cambia la dinámica de la extracción de MEV en comparación con el modelo probabilístico en la prueba de trabajo o cómo esto se verá interrumpido cuando se implementen la [elección de líder único y secreto (SSLE)](https://ethresear.ch/t/secret-non-single-leader-election/11789) y la [tecnología de validador distribuido (DVT)](/staking/dvt/). Del mismo modo, queda por ver qué oportunidades de MEV existen cuando la mayor parte de la actividad de los usuarios se traslade de Ethereum a sus rollups de capa 2 (l2) y fragmentos.

## MEV en la prueba de participación (PoS) de Ethereum {#mev-in-ethereum-proof-of-stake}

Como se explicó, el MEV tiene implicaciones negativas para la experiencia general del usuario y la seguridad de la capa de consenso. Pero la transición de Ethereum a un consenso de prueba de participación (denominado "La Fusión") introduce potencialmente nuevos riesgos relacionados con el MEV:

### Centralización de validadores {#validator-centralization}

En el Ethereum posterior a La Fusión, los validadores (habiendo realizado depósitos de seguridad de 32 ETH) llegan a un consenso sobre la validez de los bloques agregados a la cadena de balizas. Dado que 32 ETH pueden estar fuera del alcance de muchos, [unirse a un pool de staking](/staking/pools/) puede ser una opción más factible. Sin embargo, una distribución saludable de [stakers en solitario](/staking/solo/) es ideal, ya que mitiga la centralización de los validadores y mejora la seguridad de Ethereum.

Sin embargo, se cree que la extracción de MEV es capaz de acelerar la centralización de los validadores. Esto se debe en parte a que, como los validadores [ganan menos por proponer bloques](/roadmap/merge/issuance/#how-the-merge-impacts-ETH-supply) de lo que ganaban los mineros anteriormente, la extracción de MEV ha [influido enormemente en las ganancias de los validadores](https://github.com/flashbots/eth2-research/blob/main/notebooks/mev-in-eth2/eth2-mev-calc.ipynb) desde [La Fusión](/roadmap/merge/).

Los pools de staking más grandes probablemente tendrán más recursos para invertir en las optimizaciones necesarias para capturar oportunidades de MEV. Cuanto más MEV extraigan estos pools, más recursos tendrán para mejorar sus capacidades de extracción de MEV (y aumentar los ingresos generales), creando esencialmente [economías de escala](https://www.investopedia.com/terms/e/economiesofscale.asp#).

Con menos recursos a su disposición, los stakers en solitario pueden ser incapaces de beneficiarse de las oportunidades de MEV. Esto puede aumentar la presión sobre los validadores independientes para que se unan a poderosos pools de staking para aumentar sus ganancias, reduciendo la descentralización en Ethereum.

### Mempools con permisos {#permissioned-mempools}

En respuesta a los ataques de sándwich y frontrunning, los traders pueden comenzar a realizar acuerdos fuera de la cadena con los validadores para obtener privacidad en las transacciones. En lugar de enviar una posible transacción de MEV a la mempool pública, el trader la envía directamente al validador, quien la incluye en un bloque y divide las ganancias con el trader.

Los "dark pools" (fondos oscuros) son una versión más grande de este acuerdo y funcionan como mempools con permisos y de acceso exclusivo abiertas a los usuarios dispuestos a pagar ciertas tarifas. Esta tendencia disminuiría la naturaleza sin permisos y la ausencia de necesidad de confianza de Ethereum y potencialmente transformaría la cadena de bloques en un mecanismo de "pago por jugar" que favorece al mejor postor.

Las mempools con permisos también acelerarían los riesgos de centralización descritos en la sección anterior. Los grandes pools que ejecutan múltiples validadores probablemente se beneficiarán de ofrecer privacidad de transacciones a traders y usuarios, aumentando sus ingresos por MEV.

Combatir estos problemas relacionados con el MEV en el Ethereum posterior a La Fusión es un área central de investigación. Hasta la fecha, dos soluciones propuestas para reducir el impacto negativo del MEV en la descentralización y seguridad de Ethereum después de La Fusión son la [**separación proponente-constructor (PBS)**](/roadmap/pbs/) y la [**API del constructor**](https://github.com/ethereum/builder-specs).

### Separación proponente-constructor {#proposer-builder-separation}

Tanto en la prueba de trabajo como en la prueba de participación, un nodo que construye un bloque lo propone para su adición a la cadena a otros nodos que participan en el consenso. Un nuevo bloque se convierte en parte de la cadena canónica después de que otro minero construye sobre él (en PoW) o recibe atestaciones de la mayoría de los validadores (en PoS).

La combinación de los roles de productor de bloques y proponente de bloques es lo que introduce la mayoría de los problemas relacionados con el MEV descritos anteriormente. Por ejemplo, los nodos de consenso están incentivados a desencadenar reorganizaciones de la cadena en [ataques de bandidos del tiempo](https://www.mev.wiki/attack-examples/time-bandit-attack) para maximizar las ganancias de MEV.

La [separación proponente-constructor](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) (PBS) está diseñada para mitigar el impacto del MEV, especialmente en la capa de consenso. La característica principal de la PBS es la separación de las reglas del productor de bloques y del proponente de bloques. Los validadores siguen siendo responsables de proponer y votar sobre los bloques, pero una nueva clase de entidades especializadas, llamadas **constructores de bloques**, tienen la tarea de ordenar las transacciones y construir bloques.

Bajo la PBS, un constructor de bloques crea un paquete de transacciones y hace una oferta para su inclusión en un bloque de la cadena de balizas (como la "carga útil de ejecución"). El validador seleccionado para proponer el siguiente bloque luego verifica las diferentes ofertas y elige el paquete con la tarifa más alta. La PBS crea esencialmente un mercado de subastas, donde los constructores negocian con los validadores que venden espacio en los bloques.

Los diseños actuales de PBS utilizan un [esquema de compromiso-revelación](https://gitcoin.co/blog/commit-reveal-scheme-on-ethereum/) en el que los constructores solo publican un compromiso criptográfico con el contenido de un bloque (encabezado del bloque) junto con sus ofertas. Después de aceptar la oferta ganadora, el proponente crea una propuesta de bloque firmada que incluye el encabezado del bloque. Se espera que el constructor de bloques publique el cuerpo completo del bloque después de ver la propuesta de bloque firmada, y también debe recibir suficientes [atestaciones](/glossary/#attestation) de los validadores antes de que sea finalizado.

#### ¿Cómo mitiga la separación proponente-constructor el impacto del MEV? {#how-does-pbs-curb-mev-impact}

La separación proponente-constructor en el protocolo reduce el efecto del MEV en el consenso al eliminar la extracción de MEV del ámbito de los validadores. En su lugar, los constructores de bloques que ejecutan hardware especializado capturarán las oportunidades de MEV en el futuro.

Sin embargo, esto no excluye totalmente a los validadores de los ingresos relacionados con el MEV, ya que los constructores deben hacer ofertas altas para que los validadores acepten sus bloques. No obstante, dado que los validadores ya no se centran directamente en optimizar los ingresos de MEV, la amenaza de los ataques de bandidos del tiempo se reduce.

La separación proponente-constructor también reduce los riesgos de centralización del MEV. Por ejemplo, el uso de un esquema de compromiso-revelación elimina la necesidad de que los constructores confíen en que los validadores no robarán la oportunidad de MEV ni la expondrán a otros constructores. Esto reduce la barrera para que los stakers en solitario se beneficien del MEV; de lo contrario, los constructores tenderían a favorecer a los grandes pools con reputación fuera de la cadena y a realizar acuerdos fuera de la cadena con ellos.

Del mismo modo, los validadores no tienen que confiar en que los constructores no retendrán los cuerpos de los bloques o publicarán bloques no válidos porque el pago es incondicional. La tarifa del validador se procesa incluso si el bloque propuesto no está disponible o es declarado no válido por otros validadores. En este último caso, el bloque simplemente se descarta, lo que obliga al constructor de bloques a perder todas las tarifas de transacción y los ingresos de MEV.

### API del constructor {#builder-api}

Si bien la separación proponente-constructor promete reducir los efectos de la extracción de MEV, su implementación requiere cambios en el protocolo de consenso. Específicamente, la regla de [elección de bifurcación](/developers/docs/consensus-mechanisms/pos/#fork-choice) en la cadena de balizas tendría que actualizarse. La [API del constructor](https://github.com/ethereum/builder-specs) es una solución temporal destinada a proporcionar una implementación funcional de la separación proponente-constructor, aunque con mayores supuestos de confianza.

La API del constructor es una versión modificada de la [API del motor](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) utilizada por los clientes de la capa de consenso para solicitar cargas útiles de ejecución a los clientes de la capa de ejecución. Como se describe en la [especificación del validador honesto](https://github.com/ethereum/consensus-specs/blob/master/specs/bellatrix/validator.md), los validadores seleccionados para las tareas de propuesta de bloques solicitan un paquete de transacciones a un cliente de ejecución conectado, que incluyen en el bloque propuesto de la cadena de balizas.

La API del constructor también actúa como un middleware entre los validadores y los clientes de la capa de ejecución; pero es diferente porque permite a los validadores en la cadena de balizas obtener bloques de entidades externas (en lugar de construir un bloque localmente utilizando un cliente de ejecución).

A continuación se presenta una descripción general de cómo funciona la API del constructor:

1. La API del constructor conecta al validador a una red de constructores de bloques que ejecutan clientes de la capa de ejecución. Al igual que en la PBS, los constructores son partes especializadas que invierten en la construcción de bloques que requiere muchos recursos y utilizan diferentes estrategias para maximizar los ingresos obtenidos del MEV + propinas de prioridad.

2. Un validador (que ejecuta un cliente de la capa de consenso) solicita cargas útiles de ejecución junto con ofertas de la red de constructores. Las ofertas de los constructores contendrán el encabezado de la carga útil de ejecución (un compromiso criptográfico con el contenido de la carga útil) y una tarifa que se pagará al validador.

3. El validador revisa las ofertas entrantes y elige la carga útil de ejecución con la tarifa más alta. Utilizando la API del constructor, el validador crea una propuesta de bloque baliza "cegada" que incluye solo su firma y el encabezado de la carga útil de ejecución y la envía al constructor.

4. Se espera que el constructor que ejecuta la API del constructor responda con la carga útil de ejecución completa al ver la propuesta de bloque cegada. Esto permite al validador crear un bloque baliza "firmado", que propagan por toda la red.

5. Todavía se espera que un validador que utiliza la API del constructor construya un bloque localmente en caso de que el constructor de bloques no responda con prontitud, para que no se pierdan las recompensas de propuesta de bloque. Sin embargo, el validador no puede crear otro bloque utilizando las transacciones ahora reveladas u otro conjunto, ya que equivaldría a una _equivocación_ (firmar dos bloques dentro del mismo slot), lo cual es una ofensa penalizable (slashable).

Una implementación de ejemplo de la API del constructor es [MEV-Boost](https://github.com/flashbots/mev-boost), una mejora en el [mecanismo de subasta de Flashbots](https://docs.flashbots.net/flashbots-auction/overview) diseñado para frenar las externalidades negativas del MEV en Ethereum. La subasta de Flashbots permite a los validadores en la prueba de participación subcontratar el trabajo de construir bloques rentables a partes especializadas llamadas **buscadores**.
![A diagram showing the MEV flow in detail](./mev.png)

Los buscadores buscan oportunidades lucrativas de MEV y envían paquetes de transacciones a los proponentes de bloques junto con una [oferta de precio sellado](https://en.wikipedia.org/wiki/First-price_sealed-bid_auction) para su inclusión en el bloque. El validador que ejecuta mev-geth, una versión bifurcada del cliente Go Ethereum (Geth), solo tiene que elegir el paquete con la mayor ganancia e incluirlo como parte del nuevo bloque. Para proteger a los proponentes de bloques (validadores) del spam y las transacciones no válidas, los paquetes de transacciones pasan por **retransmisores** (relayers) para su validación antes de llegar al proponente.

MEV-Boost conserva el mismo funcionamiento de la subasta original de Flashbots, aunque con nuevas características diseñadas para el cambio de Ethereum a la prueba de participación. Los buscadores todavía encuentran transacciones de MEV rentables para su inclusión en bloques, pero una nueva clase de partes especializadas, llamadas **constructores**, son responsables de agregar transacciones y paquetes en bloques. Un constructor acepta ofertas de precio sellado de los buscadores y ejecuta optimizaciones para encontrar el orden más rentable.

El retransmisor sigue siendo responsable de validar los paquetes de transacciones antes de pasarlos al proponente. Sin embargo, MEV-Boost introduce **depósitos en garantía** (escrows) responsables de proporcionar [disponibilidad de datos](/developers/docs/data-availability/) almacenando los cuerpos de los bloques enviados por los constructores y los encabezados de los bloques enviados por los validadores. Aquí, un validador conectado a un relé solicita las cargas útiles de ejecución disponibles y utiliza el algoritmo de ordenamiento de MEV-Boost para seleccionar el encabezado de la carga útil con la oferta más alta + propinas de MEV.

#### ¿Cómo mitiga la API del constructor el impacto del MEV? {#how-does-builder-api-curb-mev-impact}

El beneficio principal de la API del constructor es su potencial para democratizar el acceso a las oportunidades de MEV. El uso de esquemas de compromiso-revelación elimina los supuestos de confianza y reduce las barreras de entrada para los validadores que buscan beneficiarse del MEV. Esto debería reducir la presión sobre los stakers en solitario para integrarse con grandes pools de staking con el fin de aumentar las ganancias de MEV.

La implementación generalizada de la API del constructor fomentará una mayor competencia entre los constructores de bloques, lo que aumenta la resistencia a la censura. A medida que los validadores revisan las ofertas de múltiples constructores, un constructor con la intención de censurar una o más transacciones de usuarios debe superar la oferta de todos los demás constructores que no censuran para tener éxito. Esto aumenta drásticamente el costo de censurar a los usuarios y desalienta la práctica.

Algunos proyectos, como MEV-Boost, utilizan la API del constructor como parte de una estructura general diseñada para proporcionar privacidad de transacciones a ciertas partes, como los traders que intentan evitar ataques de frontrunning/sándwich. Esto se logra proporcionando un canal de comunicación privado entre los usuarios y los constructores de bloques. A diferencia de las mempools con permisos descritas anteriormente, este enfoque es beneficioso por las siguientes razones:

1. La existencia de múltiples constructores en el mercado hace que la censura sea poco práctica, lo que beneficia a los usuarios. Por el contrario, la existencia de dark pools centralizados y basados en la confianza concentraría el poder en manos de unos pocos constructores de bloques y aumentaría la posibilidad de censura.

2. El software de la API del constructor es de código abierto, lo que permite a cualquiera ofrecer servicios de constructor de bloques. Esto significa que los usuarios no se ven obligados a utilizar ningún constructor de bloques en particular y mejora la neutralidad y la naturaleza sin permisos de Ethereum. Además, los traders que buscan MEV no contribuirán inadvertidamente a la centralización mediante el uso de canales de transacciones privados.

## Recursos relacionados {#related-resources}

- [Documentación de Flashbots](https://docs.flashbots.net/)
- [GitHub de Flashbots](https://github.com/flashbots/pm)
- [mevboost.org](https://www.mevboost.org/) - _Rastreador con estadísticas en tiempo real para relés de MEV-Boost y constructores de bloques_

## Más información {#further-reading}

- [¿Qué es el valor extraíble del minero (MEV)?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [El MEV y yo](https://www.paradigm.xyz/2021/02/mev-and-me)
- [Ethereum es un bosque oscuro](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Escapando del bosque oscuro](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: Adelantándose a la crisis del MEV](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [Hilos sobre MEV de @bertcmiller](https://twitter.com/bertcmiller/status/1402665992422047747)
- [MEV-Boost: Arquitectura de Flashbots lista para La Fusión](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177)
- [¿Qué es MEV-Boost?](https://www.alchemy.com/overviews/mev-boost)
- [¿Por qué ejecutar mev-boost?](https://writings.flashbots.net/writings/why-run-mevboost/)
- [La guía del autoestopista para Ethereum](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)