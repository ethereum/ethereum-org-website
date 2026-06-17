---
title: Prueba de participación vs. prueba de trabajo
description: Una comparación entre el mecanismo de consenso basado en prueba de participación y el basado en prueba de trabajo de Ethereum
lang: es
---

Cuando se lanzó [Ethereum](/), la prueba de participación (PoS) todavía necesitaba mucha investigación y desarrollo antes de que se pudiera confiar en ella para proteger Ethereum. La prueba de trabajo (PoW) era un mecanismo más simple que ya había sido probado por Bitcoin, lo que significaba que los desarrolladores principales podían implementarlo de inmediato para lanzar Ethereum. Tomó otros ocho años desarrollar la prueba de participación hasta el punto en que pudiera implementarse.

Esta página explica la lógica detrás del cambio de Ethereum de la prueba de trabajo a la prueba de participación y las ventajas y desventajas involucradas.

## Seguridad {#security}

Los investigadores de Ethereum consideran que la prueba de participación es más segura que la prueba de trabajo. Sin embargo, solo se ha implementado recientemente en la red principal de Ethereum real y está menos probada por el tiempo que la prueba de trabajo. Las siguientes secciones analizan los pros y los contras del modelo de seguridad de la prueba de participación en comparación con la prueba de trabajo.

### Costo de ataque {#cost-to-attack}

En la prueba de participación, se requiere que los validadores depositen en garantía ("hacer staking") al menos 32 ETH en un contrato inteligente. Ethereum puede destruir el ether en staking para castigar a los validadores que se comportan mal. Para llegar a un consenso, al menos el 66% del total de ether en staking tiene que votar a favor de un conjunto particular de bloques. Los bloques votados por >=66% de la participación quedan "finalizados", lo que significa que no pueden ser eliminados ni reorganizados.

Atacar la red puede significar evitar que la cadena alcance la finalidad o asegurar una cierta organización de bloques en la cadena canónica que de alguna manera beneficie a un atacante. Esto requiere que el atacante desvíe el camino del consenso honesto, ya sea acumulando una gran cantidad de ether y votando con él directamente o engañando a los validadores honestos para que voten de una manera particular. Dejando a un lado los ataques sofisticados y de baja probabilidad que engañan a los validadores honestos, el costo de atacar Ethereum es el costo de la participación que un atacante tiene que acumular para influir en el consenso a su favor.

El costo de ataque más bajo es >33% de la participación total. Un atacante que posea >33% de la participación total puede causar un retraso en la finalidad simplemente desconectándose. Este es un problema relativamente menor para la red, ya que existe un mecanismo conocido como "fuga por inactividad" que drena la participación de los validadores desconectados hasta que la mayoría en línea represente el 66% de la participación y pueda finalizar la cadena nuevamente. También es teóricamente posible que un atacante cause una doble finalidad con un poco más del 33% de la participación total al crear dos bloques en lugar de uno cuando se le pide que sea un productor de bloques y luego vote doblemente con todos sus validadores. Cada bifurcación solo requiere que el 50% de los validadores honestos restantes vean cada bloque primero, por lo que si logran sincronizar sus mensajes correctamente, es posible que puedan finalizar ambas bifurcaciones. Esto tiene una baja probabilidad de éxito, pero si un atacante lograra causar una doble finalidad, la comunidad de Ethereum tendría que decidir seguir una bifurcación, en cuyo caso los validadores del atacante necesariamente sufrirían un recorte en la otra.

Con >33% de la participación total, un atacante tiene la posibilidad de tener un efecto menor (retraso en la finalidad) o más severo (doble finalidad) en la red Ethereum. Con más de 14.000.000 ETH en staking en la red y un precio representativo de $1000/ETH, el costo mínimo para montar estos ataques es `1000 x 14,000,000 x 0.33 = $4,620,000,000`. El atacante perdería este dinero a través de un recorte y sería expulsado de la red. Para atacar de nuevo, tendrían que acumular >33% de la participación (nuevamente) y quemarla (nuevamente). Cada intento de atacar la red costaría >$4.6 mil millones (a $1000/ETH y 14M ETH en staking). El atacante también es expulsado de la red cuando sufre un recorte, y tiene que unirse a una cola de activación para volver a unirse. Esto significa que la tasa de un ataque repetido está limitada no solo a la tasa a la que el atacante puede acumular >33% de la participación total, sino también al tiempo que lleva incorporar a todos sus validadores a la red. Cada vez que el atacante ataca, se vuelve mucho más pobre, y el resto de la comunidad se vuelve más rica, gracias al choque de oferta resultante.

Otros ataques, como los ataques del 51% o la reversión de la finalidad con el 66% de la participación total, requieren sustancialmente más ETH y son mucho más costosos para el atacante.

Compare esto con la prueba de trabajo. El costo de lanzar un ataque en el Ethereum de prueba de trabajo era el costo de poseer consistentemente >50% de la tasa de hash total de la red. Esto equivalía al hardware y los costos operativos de suficiente poder de cómputo para superar a otros mineros y calcular soluciones de prueba de trabajo de manera consistente. Ethereum se minaba principalmente usando GPUs en lugar de ASIC, lo que mantenía el costo bajo (aunque si Ethereum se hubiera mantenido en la prueba de trabajo, la minería con ASIC podría haberse vuelto más popular). Un adversario tendría que comprar mucho hardware y pagar la electricidad para ejecutarlo y atacar una red Ethereum de prueba de trabajo, pero el costo total sería menor que el costo requerido para acumular suficiente ETH para lanzar un ataque. Un ataque del 51% es ~[20 veces menos](https://youtu.be/1m12zgJ42dI?t=1562) costoso en la prueba de trabajo que en la prueba de participación. Si se detectaba el ataque y la cadena realizaba una bifurcación dura para eliminar sus cambios, el atacante podría usar repetidamente el mismo hardware para atacar la nueva bifurcación.

### Complejidad {#complexity}

La prueba de participación es mucho más compleja que la prueba de trabajo. Esto podría ser un punto a favor de la prueba de trabajo, ya que es más difícil introducir errores o efectos no deseados accidentalmente en protocolos más simples. Sin embargo, la complejidad ha sido dominada por años de investigación y desarrollo, simulaciones e implementaciones en redes de prueba. El protocolo de prueba de participación ha sido implementado de forma independiente por cinco equipos separados (en cada una de las capas de ejecución y consenso) en cinco lenguajes de programación, proporcionando resiliencia contra errores del cliente.

Para desarrollar y probar de forma segura la lógica de consenso de la prueba de participación, la cadena de balizas se lanzó dos años antes de que la prueba de participación se implementara en la red principal de Ethereum. La cadena de balizas actuó como un entorno de pruebas para las pruebas de la prueba de participación, ya que era una cadena de bloques en vivo que implementaba la lógica de consenso de la prueba de participación pero sin tocar transacciones reales de Ethereum; efectivamente, solo llegaba a un consenso sobre sí misma. Una vez que esto fue estable y libre de errores durante un tiempo suficiente, la cadena de balizas se "fusionó" con la red principal de Ethereum. Todo esto contribuyó a dominar la complejidad de la prueba de participación hasta el punto de que el riesgo de consecuencias no deseadas o errores del cliente era muy bajo.

### Superficie de ataque {#attack-surface}

La prueba de participación es más compleja que la prueba de trabajo, lo que significa que hay más vectores de ataque potenciales que manejar. En lugar de una red entre pares que conecta a los clientes, hay dos, cada una implementando un protocolo separado. Tener un validador específico preseleccionado para proponer un bloque en cada slot crea el potencial de denegación de servicio donde grandes cantidades de tráfico de red desconectan a ese validador específico.

También hay formas en que los atacantes pueden sincronizar cuidadosamente la liberación de sus bloques o atestaciones para que sean recibidos por una cierta proporción de la red honesta, influyéndolos para que voten de ciertas maneras. Finalmente, un atacante puede simplemente acumular suficiente ETH para hacer staking y dominar el mecanismo de consenso. Cada uno de estos [vectores de ataque tiene defensas asociadas](/developers/docs/consensus-mechanisms/pos/attack-and-defense), pero no existen para ser defendidos bajo la prueba de trabajo.

## Descentralización {#decentralization}

La prueba de participación es más descentralizada que la prueba de trabajo porque las carreras armamentistas de hardware de minería tienden a excluir por precio a individuos y pequeñas organizaciones. Si bien cualquiera puede técnicamente comenzar a minar con hardware modesto, su probabilidad de recibir alguna recompensa es infinitamente pequeña en comparación con las operaciones mineras institucionales. Con la prueba de participación, el costo de hacer staking y el porcentaje de retorno de esa participación son los mismos para todos. Actualmente cuesta 32 ETH ejecutar un validador.

Por otro lado, la invención de los derivados de staking líquido ha generado preocupaciones de centralización porque unos pocos proveedores grandes administran grandes cantidades de ETH en staking. Esto es problemático y debe corregirse lo antes posible, pero también tiene más matices de lo que parece. Los proveedores de staking centralizados no necesariamente tienen un control centralizado de los validadores; a menudo es solo una forma de crear un fondo central de ETH que muchos operadores de nodos independientes pueden usar para hacer staking sin que cada participante requiera 32 ETH propios.

La mejor opción para Ethereum es que los validadores se ejecuten localmente en computadoras domésticas, maximizando la descentralización. Es por esto que Ethereum se resiste a los cambios que aumentan los requisitos de hardware para ejecutar un nodo/validador.

## Sostenibilidad {#sustainability}

La prueba de participación es una forma baja en carbono de asegurar la cadena de bloques. Bajo la prueba de trabajo, los mineros compiten por el derecho a minar un bloque. Los mineros tienen más éxito cuando pueden realizar cálculos más rápido, incentivando la inversión en hardware y el consumo de energía. Esto se observó en Ethereum antes de que cambiara a la prueba de participación. Poco antes de la transición a la prueba de participación, Ethereum consumía aproximadamente 78 TWh/año, tanto como un país pequeño. Sin embargo, el cambio a la prueba de participación redujo este gasto de energía en un ~99.98%. La prueba de participación convirtió a Ethereum en una plataforma energéticamente eficiente y baja en carbono.

[Más sobre el consumo de energía de Ethereum](/energy-consumption)

## Emisión {#issuance}

El Ethereum de prueba de participación puede pagar por su seguridad emitiendo muchas menos monedas que el Ethereum de prueba de trabajo porque los validadores no tienen que pagar altos costos de electricidad. Como resultado, ETH puede reducir su inflación o incluso volverse deflacionario cuando se queman grandes cantidades de ETH. Niveles de inflación más bajos significan que la seguridad de Ethereum es más barata de lo que era bajo la prueba de trabajo.

## ¿Aprende mejor de forma visual? {#visual-learner}


<VideoWatch slug="pow-vs-pos" />

## Lecturas adicionales {#further-reading}

- [Filosofía de diseño de la prueba de participación de Vitalik](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [Preguntas frecuentes sobre la prueba de participación de Vitalik](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)
- [Video "Simply Explained" sobre PoS vs. PoW](https://www.youtube.com/watch?v=M3EFi_POhps)