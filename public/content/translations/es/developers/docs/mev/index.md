---
title: Valor máximo extraíble (MEV)
description: Introducción al valor máximo extraíble (MEV)
lang: es
---

El valor máximo extraíble (MEV) se refiere al valor máximo que se puede extraer de la producción de bloques por encima de la recompensa de bloques y las tarifas de gas estándares incluyendo, excluyendo y cambiando el orden de las transacciones en un bloque.

## Valor máximo extraíble {#maximal-extractable-value}

El valor máximo extraíble se aplicó por primera vez en el contexto de [prueba de trabajo](/developers/docs/consensus-mechanisms/pow/), e inicialmente se refería a él como "valor extraíble de minero". Esto es porque en la prueba de trabajo, los mineros controlan la inclusión, la exclusión y el orden de las transacciones. No obstante, desde la transición a la prueba de participación a través de [La Fusión](/roadmap/merge), los validadores han sido responsables de estas funciones, y la minería ya no forma parte del protocolo Ethereum. Como los métodos de extracción de valor todavía existen, se utiliza en su lugar el término "valor máximo extraíble" actualmente.

## Requisitos previos {#prerequisites}

Asegúrese de estar familiarizado con las [transacciones](/developers/docs/transactions/), los [bloques](/developers/docs/blocks/), la [prueba de participación](/developers/docs/consensus-mechanisms/pos) y el [gas](/developers/docs/gas/). Familiarizarse con las [dApps](/dapps/) y [DeFi](/defi/) también le será muy útil.

## Extracción de MEV {#mev-extraction}

En teoría, el MEV se acumula por completo en los validadores porque son la única parte que puede garantizar la ejecución de una oportunidad rentable de MEV. De cualquier manera, en la práctica, una gran porción del MEV es extraído por participantes de la red independientes conocidos como "buscadores". Los buscadores ejecutan algoritmos complejos en datos de la cadena de bloques para detectar oportunidades rentables de MEV y tienen bots que en automático envían esas transacciones rentables a la red.

Los validadores obtienen una parte de la cantidad total de MEV de todos modos porque los buscadores están dispuestos a pagar altas tarifas de gas (que van al validador) a cambio de una mayor probabilidad de incluir sus transacciones rentables en un bloque. Asumiendo que los buscadores son económicamente racionales, la tarifa de gas que estarán dispuestos a pagar será de un monto hasta un 100% del MEV del buscador ( porque si la tarifa de gas fuera más alta, el buscador estaría perdiendo dinero).

Con eso, para algunas oportunidades de MEV altamente competitivas, como [arbitraje de DEX](#mev-examples-dex-arbitrage), los buscadores pueden tener que pagar el 90% o incluso más de sus ingresos totales de MEV en tarifas de gas al validador porque muchas personas quieren ejecutar la misma transacción de arbitraje rentable. Esto es porque la única manera de garantizar que esas transacciones de arbitraje se ejecuten es que envíen la transacción con el precio de gas más alto.

### Gas golfing {#mev-extraction-gas-golfing}

Está dinámica ha hecho que ser bueno en el "gas golfing" —programar transacciones de manera que usen la menor cantidad de gas— sea una ventaja competitiva, pues permite a los buscadores fijar un precio de gas más alto, mientras mantienen sus tarifas de gas constantes (tarifas de gas = precio del gas \* gas usado).

Algunas de las técnicas más conocidas del gas golfing incluyen usar direcciones que comiencen con una larga cadena de ceros (p. ej., [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://etherscan.io/address/0x0000000000c521824eaff97eac7b73b084ef9306)), ya que usan menos espacio (y por lo tanto menos gas) de almacenamiento; y dejar saldos de tokens [ERC-20](/developers/docs/standards/tokens/erc-20/) pequeños en los contratos, ya que cuesta más gas inicializar un espacio de almacenamiento (si el saldo es 0) que actualizar un espacio de almacenamiento. Encontrar más técnicas para reducir el uso de gas es un área de investigación muy activa entre los investigadores.

### Frontrunners generalizados {#mev-extraction-generalized-frontrunners}

En vez de programar algoritmos complejos capaces de detectar oportunidades de MEV rentables, algunos buscadores ejecutan frontrunnes generalizados. Los frontrunnes generalizados son bots que observan la zona de espera, o mempool, para detectar transacciones rentables. El frontrunner copia el código de transacción potencialmente rentable, reemplaza las direcciones con la dirección del frontrunner y ejecuta la transacción localmente para verificar que la transacción modificada resulte en una ganancia para la dirección del frontrunner. Si la transacción es efectivamente rentable, el frontrunner entregará la transacción modificada con la dirección reemplazada y un precio de gas más alto eligiendo la transacción original ("frontrunning") y obteniendo el MEV del buscador original.

### Flashbots {#mev-extraction-flashbots}

Flashbots es un proyecto independiente que amplía los clientes de ejecución con un servicio que permite a los buscadores enviar transacciones de MEV a los validadores sin revelarlas a la zona de espera o mempool pública. Esto evita el frontrunning por parte de los frontrunners generalizados.

## Ejemplos de MEV {#mev-examples}

El MEV surge en la cadena de bloques de varias formas.

### Arbitraje en DEX {#mev-examples-dex-arbitrage}

El arbitraje en [exchanges descentralizados](/glossary/#dex) (DEX) es la oportunidad más simple y conocida de MEV. Como resultado, también es la más competitiva.

Funciona así: si dos DEX ofrecen el mismo token a diferentes precios, alguien puede comprar el token en el DEX más barato y venderlo en el DEX de mayor precio en una sola transacción atómica. Gracias a las mecánicas de la cadena de bloques, esto es un verdadero arbitraje sin riesgos.

[Este es un ejemplo](https://etherscan.io/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) de una transacción de arbitraje rentable donde un buscador convirtió 1.000 ETH en 1,045 ETH aprovechando diferentes precios del par ETH/DAI en Uniswap vs. Sushiswap.

### Liquidaciones {#mev-examples-liquidations}

Las liquidaciones del protocolo de préstamos presentan otra muy conocida oportunidad de MEV.

Los protocolos de préstamo como Maker y Aave requieren que los usuarios depositen alguna garantía o colateral (por ejemplo, ETH). Este colateral depositado se utiliza para luego hacer un préstamo a otros usuarios.

Los usuarios pueden pedir prestados activos y tokens de otros dependiendo de lo que necesiten (por ejemplo, puede pedir prestado MKR si desea votar en una propuesta de gobernanza de MakerDAO) hasta un cierto porcentaje de la garantía depositada. Por ejemplo, si la cantidad del préstamo es de un máximo del 30%, un usuario que deposite 100 DAI en el protocolo puede pedir prestado por un valor de hasta 30 DAI de otro activo. El protocolo determina el porcentaje exacto de poder de endeudamiento, o préstamo.

Como el valor del colateral de quien pide el préstamo fluctúa, también lo hace su poder de préstamo. Si, debido a las fluctuaciones del mercado, el valor de los activos prestados excede, digamos, el 30% del valor de su colateral (nuevamente, el porcentaje exacto está determinado por el protocolo), el protocolo típicamente permite a cualquiera liquidar el colateral, pagando al instante a los prestamistas (esto es similar al funcionamiento de las [llamadas de margen](https://www.investopedia.com/terms/m/margincall.asp) en las finanzas tradicionales). Si se liquida el colateral, el prestatario generalmente tiene que pagar una tasa de liquidación importante, parte de la cual va al liquidador, que es donde entra en juego la oportunidad de MEV.

Los buscadores compiten para analizar datos de la cadena de bloques lo más rápido posible para determinar qué prestatarios pueden ser líquidados y ser los primeros en enviar una transacción de liquidación y hacerse de la tasa de liquidación.

### Sandwich trading {#mev-examples-sandwich-trading}

El sandwich trading es otro método común de extracción de MEV.

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

### Lo bueno {#effects-of-mev-the-good}

Muchos proyectos DeFi dependen de actores económicamente racionales para asegurar la utilidad y la estabilidad de sus protocolos. Por ejemplo, el arbitraje en DEX asegura que los usuarios obtengan los mejores y más correctos precios para sus tokens, y los protocolos de préstamo dependen de liquidaciones rápidas cuando los prestatarios caen por debajo de los ratios de colateralización para garantizar que los prestamistas reciban el pago.

Sin que los buscadores racionales busquen y corrijan ineficiencias económicas y aprovechen los incentivos económicos de los protocolos, los protocolos de DeFi y las dApps en general podrían no ser tan robustos como lo son hoy en día.

### Lo malo {#effects-of-mev-the-bad}

En la capa de aplicación, algunas formas de MEV, como las transacciones sándwich, dan como resultado una experiencia rotundamente peor para los usuarios. Los usuarios hechos sándwich se enfrentan a un aumento en los deslizamientos y a una peor ejecución de sus transacciones.

En la capa de red, los frontrunners generalizados y las subastas de precio de gas en las que suelen participar (cuando dos o más frontrunners compiten para que su transacción se incluya en el siguiente bloque aumentando progresivamente el precio del gas de sus transacciones) dan como resultado congestión de la red y altos precios del gas para todos los demás que intentan realizar transacciones regulares.

Más allá de lo que suceda _dentro de_ los bloques, el MEV puede tener efectos perjudiciales _entre_ los bloques. Si el MEV disponible en un bloque excede significativamente la recompensa de bloque estándar, se puede incentivar a los validadores a reorganzar los bloques y capturar el MEV para ellos mismos, causando la reorganización de la cadena de bloques y la inestabilidad del consenso.

Esta posibilidad de reorganización de la cadena de bloques se ha [explorado previamente en la cadena de bloques de Bitcoin](https://dl.acm.org/doi/10.1145/2976749.2978408). A medida que la recompensa de bloque de Bitcoin se reduce a la mitad y las comisiones de transacción componen una porción cada vez más grande de la recompensa de bloque, surgen situaciones en las que se vuelve económicamente racional que los mineros renuncien a la recompensa del siguiente bloque y en su lugar reminen bloques pasados con tarifas más altas. Con el crecimiento del MEV, podría ocurrir el mismo tipo de situación en Ethereum, lo que amenaza la integridad de la cadena de bloques.

## Estado del MEV {#state-of-mev}

La extracción del MEV se disparó a principios de 2021, lo que dio lugar a precios extremadamente altos del gas en los primeros meses del año. El surgimiento del relay de MEV de Flashbots ha reducido la efectividad de los frontrunners generalizados y ha quitado de la cadena las subastas de gas, lo que resultó en la baja de precios del gas para los usuarios corrientes.

Si bien muchos buscadores todavía están ganando buen dinero con el MEV, a medida que las oportunidades se vuelven más conocidas y más y más buscadores compiten por la misma oportunidad, los validadores capturarán más y más ingresos totales de MEV (porque el mismo tipo de subastas de gas que se describió originalmente anteriormente también ocurren en Flashbots, aunque de forma privada, y los validadores capturarán el ingreso resultante del gas). El MEV además no es exclusivo de Ethereum, y a medida que las oportunidades se vuelven más competitivas en Ethereum, los buscadores se están pasando a cadenas de bloques alternativas como Binance Smart Chain, donde existen oportunidades de MEV similares a las de Ethereum con menos competencia.

Por otro lado, la transición de prueba de trabajo a prueba de participación y el esfuerzo continuo para escalar Ethereum utilizando rollups cambian el panorama de MEV de maneras que todavía no están claras. Todavía no es bien sabido cómo tener proponentes de bloques garantizados conocidos ligeramente de antemano cambia la dinámica de extracción de MEV en comparación con el modelo probabilístico en la prueba de trabajo o cómo esto se alterará cuando se implementen la [elección de líder secreto único](https://ethresear.ch/t/secret-non-single-leader-election/11789) y [tecnología de validador distribuido](/staking/dvt/). Del mismo modo, queda por ver qué oportunidades de MEV existen cuando la mayor parte de la actividad de los usuarios se aleje de Ethereum y se lleve a sus rollups y shards de capa 2.

## MEV en la Prueba de Participación (PoS) de Ethereum {#mev-in-ethereum-proof-of-stake}

Como se explicó, el MEV tiene implicaciones negativas para la experiencia general del usuario y la seguridad de la capa de consenso. Pero la transición de Ethereum a un consenso de prueba de participación (apodado "La Fusión") potencialmente introduce nuevos riesgos relacionados con el MEV:

### Centralización de validadores {#validator-centralization}

En Ethereum posterior a la Fusión, los validadores (habiendo hecho depósitos de seguridad de 32 ETH) llegan a un consenso sobre la validez de los bloques añadidos a la cadena de Baliza. Dado que 32 ETH pueden estar fuera del alcance de muchos, [unirse a un grupo de staking o participación](/staking/pools/) puede ser una opción más factible. No obstante, una distribución saludable de [participantes en solitario](/staking/solo/) es ideal, ya que mitiga la centralización de los validadores y mejora la seguridad de Ethereum.

Sin embargo, se cree que la extracción de MEV es capaz de acelerar la centralización de los validadores. Esto se debe en parte a que, como los validadores [ganan menos por proponer bloques](/roadmap/merge/issuance/#how-the-merge-impacts-ETH-supply) que los mineros anteriormente, la extracción de MEV ha [influido en gran medida en las ganancias de los validadores](https://github.com/flashbots/eth2-research/blob/main/notebooks/mev-in-eth2/eth2-mev-calc.ipynb) desde La Fusión.

Es probable que los grupos de participación más grandes tengan más recursos para invertir en las optimizaciones necesarias para capturar oportunidades de MEV. Cuanto más MEV extraen estos grupos, más recursos tienen para mejorar sus capacidades de extracción de MEV (y aumentar los ingresos generales), esencialmente creando [economías de escala](https://www.investopedia.com/terms/e/economiesofscale.asp#).

Con menos recursos a su disposición, los participantes en solitario pueden no poder beneficiarse de las oportunidades de MEV. Esto puede aumentar la presión sobre los validadores independientes para que se unan a poderosos grupos de participación para aumentar sus ganancias, reduciendo la descentralización en Ethereum.

### Zonas de espera con permisos {#permissioned-mempools}

En respuesta a los ataques de sandwiching y frontrunning, los operadores podrían comenzar a realizar acuerdos fuera de la cadena con validadores para la privacidad de las transacciones. En lugar de enviar una posible transacción de MEV a la zona de espera o mempool pública, el trader la envía directamente al validador, que la incluye en un bloque y divide las ganancias con el trader.

Los "pools o grupos oscuros" son una versión más grande de este arreglo y funcionan como zonas de espera con permiso y de solo acceso abiertas a los usuarios dispuestos a pagar ciertas tarifas. Esta tendencia disminuiría la falta de permisos y la no necesidad de confianza de Ethereum, y potencialmente transformaría la cadena de bloques en un mecanismo de "pago para jugar" que favorezca al mejor postor.

Las zonas de espera con permisos también acelerarían los riesgos de centralización descritos en la sección anterior. Los grandes grupos que ejecutan múltiples validadores probablemente se beneficiarán de ofrecer privacidad de transacciones a los traders y los usuarios, aumentando sus ingresos de MEV.

Combatir estos problemas relacionados con el MEV después de la Fusión de Ethereum es un área central de investigación. Hasta la fecha, dos soluciones propuestas para reducir el impacto negativo del MEV en la descentralización y la seguridad de Ethereum después de la Fusión son **Proposer-Builder Separation (PBS)** y la **Builder API**.

### Separación Proponente-Constructor {#proposer-builder-separation}

Tanto en la prueba de trabajo como en la prueba de participación, un nodo que construye un bloque lo propone para su adición a la cadena a otros nodos que participan en el consenso. Un nuevo bloque se convierte en parte de la cadena canónica después de que otro minero construye sobre él (en PoW) o recibe certificaciones de la mayoría de los validadores (en PoS).

La combinación de roles de productor de bloques y proponente de bloques es lo que introduce la mayoría de los problemas relacionados con el MEV descritos anteriormente. Por ejemplo, los nodos de consenso son incentivados a desencadenar reorganizaciones de la cadena en ataques de bandidos de tiempo (time-bandit) para maximizar las ganancias de MEV.

[La separación proponente-constructor](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) (PBS) está diseñada para mitigar el impacto del MEV, especialmente en la capa de consenso. La principal característica de PBS es la separación de las reglas del productor de bloques y el proponente de bloques. Los validadores siguen siendo responsables de proponer y votar sobre los bloques, pero una nueva clase de entidades especializadas, llamadas **constructores de bloques**, tienen la tarea de ordenar transacciones y construir construcción.

Bajo PBS, un constructor de bloques crea un paquete de transacciones y hace una oferta por su inclusión en un bloque de la Cadena de Baliza (como la "carga útil de ejecución"). El validador seleccionado para proponer el siguiente bloque luego comprueba las diferentes ofertas y elige el paquete con la tarifa más alta. PBS esencialmente crea un mercado de subastas, donde los constructores negocian con los validadores que venden espacio de bloques.

Los diseños actuales de PBS utilizan un [esquema commit-reveal](https://gitcoin.co/blog/commit-reveal-scheme-on-ethereum/) en el que los constructores solo publican un compromiso criptográfico con el contenido de un bloque (encabezado de bloque) junto con sus ofertas. Después de aceptar la oferta ganadora, el proponente crea una propuesta de bloque firmada que incluye el encabezado del bloque. Se espera que el constructor de bloques publique el cuerpo completo del bloque después de ver la propuesta de bloque firmada, y también debe recibir suficientes [atestaciones](/glossary/#attestation) de los validadores antes de que se finalice.

#### ¿Cómo mitiga la separación proponente-constructor el impacto del MEV? {#how-does-pbs-curb-mev-impact}

La separación entre proponentes y constructores en el protocolo reduce el efecto del MEV en el consenso eliminando la extracción del MEV del ámbito de los validadores. En su lugar, los constructores de bloques que ejecuten hardware especializado capturarán las oportunidades de MEV en el futuro.

Esto no excluye totalmente a los validadores de los ingresos relacionados con MEV no obstante, ya que los constructores deben pujar alto para que sus bloques sean aceptados por los validadores. De todas maneras, si los validadores ya no se centran directamente en optimizar los ingresos de MEV, la amenaza de ataques time-bandit se reduce.

La separación entre proponentes y constructores también reduce los riesgos de centralización de MEV. Por ejemplo, el uso de un esquema commit-reveal elimina la necesidad de que los constructores confíen en que los validadores no robarán la oportunidad de MEV o la expondrán a otros constructores. Esto reduce la barrera para que los participantes en solitario se beneficien del MEV; de lo contrario, los constructores tenderían a favorecer grandes pools con reputación fuera de la cadena y a realizar acuerdos fuera de la cadena con ellos.

Del mismo modo, los validadores no tienen que confiar en los constructores para que no retengan cuerpos de bloques o publiquen bloques no válidos porque el pago es incondicional. La tarifa del validador todavía se procesa incluso si el bloque propuesto no está disponible o es declarado no válido por otros validadores. En este último caso, el bloque simplemente se descarta, lo que obliga al constructor de bloques a perder todas las tarifas de transacción y los ingresos de MEV.

### Builder API {#builder-api}

Si bien la separación proponente-constructor promete reducir los efectos de la extracción de MEV, su implementación requiere cambios en el protocolo de consenso. Específicamente, la regla de [elección de bifurcación](/developers/docs/consensus-mechanisms/pos/#fork-choice) en la Cadena de Baliza tendría que actualizarse. La [Builder API](https://github.com/ethereum/builder-specs), de constructor, es una solución temporal destinada a proporcionar una implementación que funcione de la separación proponente-constructor, aunque con mayores suposiciones de confianza.

La Builder API es una versión modificada de la [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) utilizada por los clientes de capa de consenso para solicitar cargas útiles de ejecución a los clientes de la capa de ejecución. Como se describe en la [especificación del validador honesto](https://github.com/ethereum/consensus-specs/blob/dev/specs/bellatrix/validator.md), los validadores seleccionados para las tareas de propuesta de bloques solicitan un paquete de transacciones de un cliente de ejecución conectado, que incluyen en el bloque de la Cadena de Baliza propuesto.

La Builder API también actúa como middleware entre los validadores y los clientes de la capa de ejecución; pero es diferente porque permite a los validadores de la Cadena de Baliza obtener bloques de entidades externas (en lugar de construir un bloque localmente utilizando un cliente de ejecución).

A continuación se muestra una descripción general de cómo funciona la Builder API:

1. La Builder API conecta al validador con una red de constructores de bloques que ejecutan clientes de capa de ejecución. Al igual que en PBS, los constructores son partes especializadas que invierten en la construcción de bloques que consumen muchos recursos y utilizan diferentes estrategias para maximizar los ingresos obtenidos de MEV + propina de prioridad.

2. Un validador (que ejecuta un cliente de capa de consenso) solicita cargas útiles de ejecución junto con ofertas de la red de constructores. Las ofertas de los constructores contendrán el encabezado de la carga útil de ejecución —un compromiso criptográfico con el contenido de la carga útil— y una tarifa que se pagará al validador.

3. El validador revisa las ofertas entrantes y elige la carga útil de ejecución con la tarifa más alta. Usando la Builder API, el validador crea una propuesta de bloque de baliza "ciega" que incluye solo su firma y el encabezado de carga útil de ejecución, y la envía al constructor.

4. Se espera que el constructor que ejecuta la Builder API responda con la carga útil de ejecución completa al ver la propuesta de bloque ciega. Esto permite al validador crear un bloque de baliza "firmado", que propaga por toda la red.

5. Aún se espera que un validador que utilice la Builder API construya un bloque localmente en caso de que el constructor de bloques no responda con prontitud, para que no se pierdan las recompensas de la propuesta de bloque. Sin embargo, el validador no puede crear otro bloque utilizando las transacciones ahora reveladas u otro conjunto, ya que equivaldría a _equivocación_ (firmar dos bloques dentro de la misma ranura), lo que es una ofensa que se puede acuchillar.

Un ejemplo de implementación de la Builder API es [MEV Boost](https://github.com/flashbots/mev-boost), una mejora del [mecanismo de subasta de Flashbots](https://docs.flashbots.net/Flashbots-auction/overview/) diseñado para reducir las externalidades negativas de MEV en Ethereum. La subasta de Flashbots permite a los validadores en prueba de participación subcontratar el trabajo de construcción de bloques rentables a terceros especializados llamados **buscadores**.

Los buscadores intentan dar con oportunidades lucrativas de MEV y envían paquetes de transacciones a los proponentes de bloques junto con una [oferta de precio sellado](https://en.wikipedia.org/wiki/First-price_sealed-bid_auction) para su inclusión en el bloque. El validador que ejecuta mev-geth, una versión bifurcada del cliente go-ethereum (Geth) solo tiene que elegir el paquete con más beneficios e incluirlo como parte del nuevo bloque. Para proteger a los proponentes de bloques (validadores) del spam y las transacciones no válidas, los paquetes de transacciones pasan por **relayers** para su validación antes de llegar al proponente.

MEV Boost conserva el mismo funcionamiento de la subasta original de Flashbots, aunque con nuevas funciones diseñadas para el cambio de Ethereum a prueba de participación. Los buscadores todavía encuentran transacciones de MEV rentables para su inclusión en bloques, pero una nueva clase de partes especializadas, llamadas **constructores**, son responsables de agregar transacciones y paquetes en bloques. Un constructor acepta ofertas de precio sellado de los buscadores y ejecuta optimizaciones para encontrar la orden más rentable.

El relayer sigue siendo responsable de validar los paquetes de transacciones antes de pasarlos al proponente. Sin embargo, MEV Boost introduce **escrows** responsables de proporcionar [disponibilidad de datos](/developers/docs/data-availability/) mediante el almacenamiento de cuerpos de bloques enviados por constructores y encabezados de bloque enviados por validadores. Aquí, un validador conectado a un relay solicita las cargas útiles de ejecución disponibles y utiliza el algoritmo de ordenación de MEV Boost para seleccionar el encabezado de la carga útil con la puja + propinas de MEV más valiosas.

#### ¿Cómo mitiga la Builder API el impacto del MEV? {#how-does-builder-api-curb-mev-impact}

El principal beneficio de la Builder API es su potencial para democratizar el acceso a las oportunidades de MEV. El uso de esquemas commit-reveal elimina las suposiciones de confianza y reduce las barreras de entrada para los validadores que buscan beneficiarse del MEV. Esto debería reducir la presión sobre los participantes en solitario para que se integren a grandes grupos de participación con el fin de aumentar las ganancias de MEV.

La implementación generalizada de la Builder API fomentará una mayor competencia entre los constructores de bloques, lo que aumenta la resistencia a la censura. A medida que los validadores revisan las ofertas de varios constructores, el intento de un constructor de censurar una o más transacciones de usuario debe superar a todos los demás constructores sin censura para tener éxito. Esto aumenta drásticamente el costo de censurar a los usuarios y desalienta la práctica.

Algunos proyectos, como MEV Boost, utilizan la Builder API como parte de una estructura general diseñada para proporcionar privacidad de las transacciones a ciertas partes, como los traders que intentan evitar los ataques de frontrunning/sandwiching. Esto se logra proporcionando un canal de comunicación privado entre los usuarios y los constructores de bloques. A diferencia de las zonas de espera o mempools con permisos descritas anteriormente, este enfoque es beneficioso por las siguientes razones:

1. La existencia de múltiples constructores en el mercado hace que la censura sea poco práctica, lo que beneficia a los usuarios. Por el contrario, la existencia de pools oscuros centralizados y basadas en la confianza concentraría el poder en manos de unos pocos constructores de bloques y aumentaría la posibilidad de censura.

2. El software de la Builder API es de código abierto, lo que permite a cualquier persona ofrecer servicios de creación de bloques. Esto significa que los usuarios no se ven obligados a usar ningún constructor de bloques en particular y mejora la neutralidad y la no necesidad de permisos de Ethereum. Además, los traders que buscan MEV no contribuirán inadvertidamente a la centralización mediante el uso de canales de transacciones privados.

## Recursos relacionados {#related-resources}

- [Documentos de Flashbots](https://docs.flashbots.net/)
- [Flashbots GitHub](https://github.com/flashbots/pm)
- [MEV-Explore:](https://explore.flashbots.net/) _Explorador del Panel de control y de transacciones en vivo para transacciones de MEV_
- [mevboost.org:](https://www.mevboost.org/) _Rastreador con estadísticas en tiempo real para relays de MEV-Boost y constructores de bloques_

## Más información {#further-reading}

- [¿Qué es el valor extraíble del minero (MEV)?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV y yo](https://www.paradigm.xyz/2021/02/mev-and-me)
- [Ethereum es un bosque oscuro](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Escapar del bosque oscuro](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: frontrunning en la crisis de MEV](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [Hilos sobre MEV de @bertcmiller](https://twitter.com/bertcmiller/status/1402665992422047747)
- [MEV-Boost: Fusionar la arquitectura de Flashbots lista](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177)
- [¿Qué es el impulso de MEV?](https://www.alchemy.com/overviews/mev-boost)
- [¿Por qué ejecutar mev-boost?](https://writings.flashbots.net/writings/why-run-mevboost/)
- [La guía del autoestopista de Ethereum](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)
