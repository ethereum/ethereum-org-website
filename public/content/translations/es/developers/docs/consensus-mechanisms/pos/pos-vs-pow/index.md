---
title: Prueba de participación frente a prueba de trabajo
description: Una comparación entre la prueba de participación de Ethereum y el mecanismo de consenso basado en la prueba de trabajo.
lang: es
---

Cuando se lanzó Ethereum, la prueba de participación todavía necesitaba mucha investigación y desarrollo antes de que se pudiera confiar en ella para proteger Ethereum. La prueba de trabajo era un mecanismo más simple que ya había probado Bitcoin, lo que significaba que los desarrolladores principales podrían implementarlo de inmediato para lanzar Ethereum. Llevó otros ocho años desarrollar la prueba de participación hasta el punto de que se pudiera implementar.

Esta página explica la razón detrás del cambio de Ethereum a la prueba de participación desde la prueba de trabajo y las compensaciones involucradas.

## Seguridad {#security}

Los investigadores de Ethereum consideran que la prueba de participación es más segura que la prueba de trabajo. Sin embargo, solo se ha implementado recientemente para la verdadera red principal de Ethereum y el tiempo aún no ha demostrado la eficacia de la prueba de trabajo. En las siguientes secciones se detallan las ventajas y desventajas del modelo de seguridad de prueba de participación con respecto a la prueba de trabajo.

### El coste del ataque {#cost-to-attack}

En la prueba de participación, los validadores están obligados a depositar («participar») al menos 32 ETH en un contrato inteligente. Ethereum puede destruir el ether en participación para castigar a los validadores que exhiban una mala conducta. Para llegar a un consenso, al menos el 66 % del total en participación tiene que votar a favor de un conjunto particular de bloques. Los bloques votados por el >=66 % de la participación se «finalizan», lo que significa que no se pueden eliminar ni reorganizar.

Atacar la red puede significar evitar que la cadena finalice o garantizar una cierta organización de bloques en la cadena predilecta que de alguna manera beneficie a un atacante. Esto requiere que el atacante se aparte del consenso honesto, ya sea acumulando una gran cantidad de ether y votando con él directamente, o engañando a los validadores honestos para que voten de una manera particular. Dejando a un lado los ataques sofisticados y de baja probabilidad que engañan a los validadores honestos, el coste de atacar Ethereum es el coste de la participación que un atacante tiene que acumular para influir en el consenso a su favor.

El coste más bajo de ataque es del >33 % de la participación total. Un atacante que tenga el >33 % de la participación total puede causar un retraso de finalidad simplemente al desconectarse. Este es un problema relativamente menor para la red, ya que hay un mecanismo conocido como la «pérdida de inactividad» que filtra la participación de los validadores fuera de línea hasta que la mayoría en línea representa el 66 % de la participación y puede finalizar la cadena de nuevo. También es teóricamente posible que un atacante cause doble finalidad con un poco más del 33 % de la participación total al crear dos bloques en lugar de uno cuando se le pide que sea un productor de bloques y luego duplique el voto con todos sus validadores. Cada bifurcación solo requiere que el 50 % de los validadores honestos restantes vean cada bloque primero, por tanto si logran cronometrar sus mensajes de la manera correcta, es posible que puedan finalizar ambas bifurcaciones. Esto tiene una baja probabilidad de éxito, pero si un atacante fuera capaz de causar doble finalidad, la comunidad de Ethereum tendría que optar por seguir una bifurcación, en cuyo caso los validadores del atacante se recortarían necesariamente en la otra.

Con el >33 % de la participación total, un atacante tiene la oportunidad de tener un efecto menor (retraso de finalización) o más grave (doble finalidad) efecto en la red Ethereum. Con más de 14.000.000 ETH de participación en la red y un precio representativo de 1.000 USD/ETH, el coste mínimo para montar estos ataques es `1.000 x 14.000.000 x 0,33 = 4.62.000.000 USD`. El atacante perdería este dinero a través del recorte y sería expulsado de la red. Para atacar de nuevo, tendrían que acumular el >33 % de la participación (de nuevo) y quemarla (de nuevo). Cada intento de atacar la red costaría > 4.600 millones de dólares (a 1.000 USD/ETH y 14 millones de ETH en participación). El atacante también es expulsado de la red cuando se producen recortes y tiene que ponerse en la cola de activación si quiere volver a unirse. Esto significa que la tasa de un ataque repetido se limita no solo a la velocidad que el atacante puede acumular del >33 % de la participación total, sino también al tiempo que se tarda en incorporar todos sus validadores a la red. Cada vez que el atacante ataca, se vuelve mucho más pobre, y el resto de la comunidad se enriquece, gracias al choque de suministro resultante.

Otros ataques, como los ataques del 51 % o la reversión de la finalidad con el 66 % de la participación total, requieren sustancialmente mucho más ETH y son mucho más costosos para el atacante.

Compare esto con la prueba de trabajo. El coste de lanzar un ataque a la prueba de trabajo de Ethereum fue el coste de poseer constantemente el >50 % de la tasa total de hash de la red. Esto equivalía a los costes de hardware y al funcionamiento de la potencia computacional suficiente para superar a otros mineros para calcular consistentemente las soluciones de prueba de trabajo. Ethereum se minaba principalmente utilizando GPU en lugar de ASIC, lo que mantuvo el coste bajo (aunque si Ethereum se hubiera mantenido en la prueba de trabajo, la minería ASIC podría haberse vuelto más popular). Un adversario tendría que comprar mucho hardware y pagar su consumo de electricidad para ejecutarlo si quería atacar una red Ethereum de prueba de trabajo, pero el coste total sería menor que el coste requerido para acumular suficiente ETH para lanzar un ataque. Un ataque del 51% es ~[20 veces menos](https://youtu.be/1m12zgJ42dI?T=1562) caro en la prueba de trabajo que en la prueba de participación. Si se detecta el ataque y la cadena se bifurca para eliminar sus cambios, el atacante podría usar repetidamente el mismo hardware para atacar la nueva bifurcación.

### Complejidad {#complexity}

La implementación de la prueba de participación es mucho más compleja que con la prueba de trabajo. Este podría ser un punto a favor de la prueba de trabajo, ya que es más difícil introducir errores o efectos no deseados en protocolos más simples accidentalmente. Sin embargo, la complejidad se ha ido mermando por efecto de la investigación y el desarrollo, por simulaciones e implementaciones en la red de prueba. El protocolo de prueba de participación lo han implementado de forma independiente cinco equipos separados (en cada una de las capas de ejecución y consenso) en cinco lenguajes de programación distintos, proporcionando resiliencia contra los errores del cliente.

Para desarrollar y probar de forma segura la lógica de consenso de prueba de participación, se lanzó la cadena de baliza dos años antes de que se implementara la prueba de participación en la red principal de Ethereum. La cadena de baliza actuó como proceso aislado de comprobación de la prueba de participación, ya que era una cadena de bloques en vivo que implementaba la lógica de consenso de prueba de participación, pero sin tocar las transacciones reales de Ethereum, efectivamente llegando a un consenso sobre sí misma. Una vez que esto había sido estable y libre de errores durante un tiempo suficiente, la Beacon Chain se "fusionó" con la red principal de Ethereum. Todo esto contribuyó a domar la complejidad de la prueba de participación hasta el punto de que el riesgo de consecuencias no deseadas o errores de los clientes era muy bajo.

### Superficie de ataque {#attack-surface}

La prueba de participación es más compleja que la prueba de trabajo, lo que significa que hay más vectores de ataque potenciales por manejar. En lugar de una red entre pares que conecta a los clientes, hay dos, cada uno de las cuales implementa un protocolo separado. Tener un validador específico preseleccionado para proponer un bloque en cada ranura crea el potencial de denegación de servicio en el que grandes cantidades de tráfico de red golpean a ese validador específico fuera de línea.

También hay formas en que los atacantes pueden programar cuidadosamente la liberación de sus bloqueos o certificaciones para que sean recibidos por una cierta proporción de la red honesta, influyéndo en ellos para que voten de ciertas maneras. Finalmente, un atacante puede simplemente acumular suficiente ETH para participar y dominar el mecanismo de consenso. Cada uno de estos [vectores de ataque tiene defensas asociadas](/developers/docs/consensus-mechanisms/pos/attack-and-defense), pero no existen para defenderse en la prueba de trabajo.

## Descentralización {#decentralization}

La prueba de participación es más descentralizada que la prueba de trabajo porque el hardware de mineros tiende a poner precio a las personas y a las pequeñas organizaciones. Si bien técnicamente cualquiera puede comenzar a minar con hardware modesto, su probabilidad de recibir cualquier recompensa es sorprendentemente pequeña en comparación con las operaciones mineras institucionales. Con la prueba de participación, el coste de la participación y el porcentaje de retorno de esa participación son los mismos para todos. Actualmente cuesta 32 ETH ejecutar un validador.

Por otro lado, la invención de los derivados de participación líquidos ha sembrado inquietudes acerca de la centralización, ya que unos cuantos proveedores de envergadura gestionan grandes cantidades de ETH en participaciones. Esto es un problema y debe corregirse lo antes posible, aunque también tiene más matices de los que parece. Los proveedores de participación centralizados no tienen necesariamente un control centralizado de los validadores; a menudo es solo una forma de crear un grupo central de ETH que muchos operadores de nodos independientes pueden colocar en participación sin que cada participante requiera 32 ETH propios.

La mejor opción para Ethereum es que los validadores se ejecuten localmente en ordenadores domésticos, maximizando así la descentralización. Por esta razón Ethereum se resiste a los cambios que aumentan los requisitos de hardware para ejecutar un nodo/validador.

## Sostenibilidad {#sustainability}

La prueba de participación es una forma barata de proteger la cadena de bloques. En la prueba de trabajo, los mineros compiten por el derecho a extraer un bloque. Los mineros tienen más éxito cuando pueden realizar cálculos más rápido, lo que incentiva la inversión en hardware y consumo de energía. Esto se observó en Ethereum antes de que cambiara a prueba de participación. Poco antes de la transición a la prueba de participación, Ethereum estaba consumiendo aproximadamente 78 TWh/año, tanto como un país pequeño. Sin embargo, el cambio a la prueba de participación redujo un ~99,98 % el gasto energético. La prueba de participación convirtió a Ethereum en una plataforma energéticamente eficiente y baja en carbono.

[Más información sobre el consumo energético de Ethereum](/energy-consumption)

## Emisión {#issuance}

La prueba de participación de Ethereum puede pagar por su seguridad emitiendo muchas menos monedas que la prueba de trabajo de Ethereum, porque los validadores no tienen que pagar altos costes de electricidad. Como resultado, el ETH puede reducir su inflación o incluso volverse deflacionario cuando se queman grandes cantidades de ETH. Bajos niveles de inflación significan que la seguridad de Ethereum es más barata de lo que era con la prueba de trabajo.

## ¿Es más bien de los que aprende viendo? {#visual-learner}

Mire este vídeo en el que Justin Drake explica los beneficios de la prueba de participación sobre la prueba de trabajo:

<YouTube id="1m12zgJ42dI" />

## Más información {#further-reading}

- [La filosofía de diseño de la prueba de participación de Vitalik](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [Preguntas frecuentes sobre la prueba de participación de Vitalik](https://vitalik.ca/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)
- [Vídeo «Una explicación sencilla» sobre la diferencia entre PoS y PoW](https://www.youtube.com/watch?v=M3EFi_POhps)
