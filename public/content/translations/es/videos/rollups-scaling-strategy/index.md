---
title: "Rollups: ¿la estrategia definitiva de escalabilidad de Ethereum?"
description: "Un análisis detallado de los rollups como la estrategia principal de escalabilidad de Ethereum. Este video explica cómo funcionan los rollups optimistas (Arbitrum, Optimism) y los rollups de conocimiento cero."
lang: es
youtubeId: "7pWxCklcNsU"
uploadDate: 2021-04-14
duration: "0:16:37"
educationLevel: intermediate
topic:
  - "scaling"
  - "rollups"
  - "optimistic-rollups"
  - "zk-rollups"
format: explainer
author: Finematics
breadcrumb: "Rollups"
---

Un video explicativo de **Finematics** que cubre los rollups como la estrategia principal de escalabilidad de Ethereum. El video compara los rollups optimistas (Arbitrum, Optimism) con los ZK rollups, y examina por qué los rollups se han convertido en el método dominante para escalar Ethereum.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=7pWxCklcNsU) publicada por Finematics. Ha sido ligeramente editada para facilitar su lectura.*

#### Capa 2 (1:17) {#layer-2-117}

La escalabilidad de Ethereum ha sido uno de los temas más discutidos en el mundo cripto. El debate sobre la escalabilidad suele intensificarse durante períodos de alta actividad en la red, como la locura de CryptoKitties en 2017, el verano de las finanzas descentralizadas (DeFi) de 2020 o el mercado alcista de las cripto a principios de 2021. Durante estos períodos, la demanda sin precedentes de la red Ethereum resultó en tarifas de gas extremadamente altas, lo que hizo que fuera costoso para los usuarios cotidianos pagar por sus transacciones.

Para abordar este problema, la búsqueda de la solución de escalabilidad definitiva ha sido una de las principales prioridades para múltiples equipos y para la comunidad de Ethereum en su conjunto.

En general, hay tres formas principales de escalar Ethereum (o, de hecho, la mayoría de las otras cadenas de bloques): escalar la propia cadena de bloques (escalabilidad de capa 1), construir sobre la capa 1 (escalabilidad de capa 2) y construir al lado de la capa 1 (cadenas laterales).

#### Fuera de la capa 1 (1:58) {#outside-of-layer-1-158}

En lo que respecta a la capa 1, Eth2 es la solución elegida para escalar la cadena de bloques de Ethereum. Eth2 se refiere a un conjunto de cambios interconectados, como la migración a la prueba de participación (PoS), la fusión del estado de la cadena de bloques de prueba de trabajo (PoW) en la nueva cadena de prueba de participación, y la fragmentación. La fragmentación, en particular, puede aumentar drásticamente la capacidad de procesamiento de la red Ethereum, especialmente cuando se combina con los rollups.

En cuanto a la escalabilidad fuera de la capa 1, se han probado múltiples soluciones de escalabilidad diferentes con resultados mixtos. Por un lado, tenemos soluciones de capa 2, como los canales, que están completamente aseguradas por Ethereum pero que solo funcionan bien para un conjunto específico de aplicaciones. Las cadenas laterales, por otro lado, suelen ser compatibles con la EVM y pueden escalar aplicaciones de propósito general. El principal inconveniente es que son menos seguras que las soluciones de capa 2 al no depender de la seguridad de Ethereum y, en su lugar, tener sus propios modelos de consenso.

La mayoría de los rollups tienen como objetivo lograr lo mejor de estos dos mundos mediante la creación de una solución de escalabilidad de propósito general mientras siguen dependiendo completamente de la seguridad de Ethereum. Este es el santo grial de la escalabilidad, ya que permite implementar todos los contratos inteligentes existentes presentes en Ethereum en un rollup con pocos o ningún cambio sin sacrificar la seguridad. No es de extrañar que los rollups sean probablemente la solución de escalabilidad más esperada de todas.

Un rollup es un tipo de solución de escalabilidad que funciona ejecutando transacciones fuera de la cadena pero publicando los datos de la transacción en la capa 1. Esto permite que el rollup escale la red y siga derivando su seguridad del consenso de Ethereum. Mover la computación fuera de la cadena permite esencialmente procesar más transacciones en total, ya que solo una parte de los datos de las transacciones del rollup tiene que caber en los bloques de Ethereum.

Para lograr esto, las transacciones del rollup se ejecutan en una cadena separada que incluso puede ejecutar una versión de la EVM específica para el rollup. El siguiente paso después de ejecutar transacciones en un rollup es agruparlas y publicarlas en la cadena principal de Ethereum. Todo el proceso esencialmente ejecuta transacciones, toma los datos, los comprime y los enrolla (del inglés "rolls it up") a la cadena principal en un solo lote; de ahí el nombre "rollup".

Cada rollup implementa un conjunto de contratos inteligentes en la capa 1 que son responsables de procesar depósitos y retiros, y de verificar pruebas. Las pruebas también son donde entra en juego la principal distinción entre los diferentes tipos de rollups. Los rollups optimistas utilizan pruebas de fraude, mientras que los ZK rollups utilizan pruebas de validez.

#### Rollups optimistas (4:26) {#optimistic-rollups-426}

Los rollups optimistas publican datos en la capa 1 y asumen que son correctos; de ahí el nombre "optimista". Si los datos publicados son válidos, estamos en el camino ideal y no hay que hacer nada más. El rollup optimista se beneficia de no tener que hacer ningún trabajo adicional en el escenario optimista.

En caso de una transacción inválida, el sistema tiene que ser capaz de identificarla, recuperar el estado correcto y penalizar a la parte que envía dicha transacción. Para lograr esto, los rollups optimistas implementan un sistema de resolución de disputas que es capaz de verificar pruebas de fraude, detectar transacciones fraudulentas y desincentivar a los malos actores de enviar otras transacciones inválidas o pruebas de fraude incorrectas.

En la mayoría de las implementaciones de rollups optimistas, la parte que es capaz de enviar lotes de transacciones a la capa 1 tiene que proporcionar una fianza, generalmente en forma de ETH. Cualquier otro participante de la red puede enviar una prueba de fraude si detecta una transacción incorrecta. Después de que se envía una prueba de fraude, el sistema entra en el modo de resolución de disputas. En este modo, la transacción sospechosa se ejecuta de nuevo, esta vez en la cadena principal de Ethereum. Si la ejecución demuestra que la transacción fue efectivamente fraudulenta, la parte que envió esta transacción es castigada, generalmente mediante el recorte de su ETH en fianza.

Para evitar que los malos actores inunden la red con pruebas de fraude incorrectas, las partes que deseen enviar pruebas de fraude generalmente también tienen que proporcionar una fianza que puede estar sujeta a recortes.

Para poder ejecutar una transacción de rollup en la capa 1, los rollups optimistas tienen que implementar un sistema que sea capaz de reproducir una transacción con el estado exacto que estaba presente cuando la transacción se ejecutó originalmente en el rollup. Esta es una de las partes complicadas de los rollups optimistas y generalmente se logra creando un contrato administrador separado que reemplaza ciertas llamadas a funciones con un estado del rollup.

El sistema puede funcionar como se espera y detectar fraudes incluso si solo hay una parte honesta que monitorea el estado del rollup y envía pruebas de fraude si es necesario. Debido a los incentivos correctos dentro del sistema de rollup, entrar en el proceso de resolución de disputas debería ser una situación excepcional y no algo que suceda todo el tiempo.

En lo que respecta a los ZK rollups, no hay resolución de disputas en absoluto. Esto es posible aprovechando una ingeniosa pieza de criptografía llamada pruebas de conocimiento cero; de ahí el nombre ZK rollups. En este modelo, cada lote publicado en la capa 1 incluye una prueba criptográfica llamada ZK-SNARK. La prueba puede ser verificada rápidamente por el contrato de la capa 1 cuando se envía el lote de transacciones, y los lotes inválidos pueden ser rechazados de inmediato.

#### Otras diferencias (7:28) {#other-differences-728}

Debido a la naturaleza del proceso de resolución de disputas, los rollups optimistas tienen que dar suficiente tiempo a todos los participantes de la red para enviar pruebas de fraude antes de finalizar una transacción en la capa 1. Este período suele ser bastante largo, para asegurarse de que incluso en el peor de los casos, las transacciones fraudulentas aún puedan ser disputadas. Esto hace que los retiros de los rollups optimistas sean bastante largos, ya que los usuarios tienen que esperar hasta una o dos semanas para poder retirar sus fondos de vuelta a la capa 1.

Afortunadamente, hay algunos proyectos trabajando para mejorar esta situación proporcionando "salidas de liquidez" rápidas. Estos proyectos ofrecen retiros casi instantáneos de vuelta a la capa 1, a otra capa 2 o incluso a una cadena lateral, y cobran una pequeña tarifa por la conveniencia. Hop Protocol y Connext son los proyectos a tener en cuenta.

Los ZK rollups no tienen el problema de los retiros largos, ya que los fondos están disponibles para retiros tan pronto como el lote del rollup, junto con una prueba de validez, se envía a la capa 1.

Sin embargo, los ZK rollups vienen con sus propios inconvenientes. Debido a la complejidad de la tecnología, es mucho más difícil crear un ZK rollup compatible con la EVM, lo que hace que sea más difícil escalar aplicaciones de propósito general sin tener que reescribir la lógica de la aplicación. Dicho esto, zkSync está logrando un progreso significativo en esta área y es posible que puedan lanzar un ZK rollup compatible con la EVM muy pronto.

Los rollups optimistas lo tienen un poco más fácil con la compatibilidad con la EVM. Todavía tienen que ejecutar su propia versión de la EVM con algunas modificaciones, pero el 99 % de los contratos se pueden portar sin hacer ningún cambio. Los ZK rollups también requieren mucha más computación que los rollups optimistas, lo que significa que los nodos que calculan las pruebas ZK tienen que ser máquinas de altas especificaciones, lo que dificulta que otros usuarios los ejecuten.

#### Mejoras de escalabilidad (9:32) {#scaling-improvements-932}

En lo que respecta a las mejoras de escalabilidad, ambos tipos de rollups deberían ser capaces de escalar Ethereum desde alrededor de 15 a 45 transacciones por segundo (dependiendo del tipo de transacción) hasta unas 1000 a 4000 transacciones por segundo. Vale la pena señalar que es posible procesar aún más transacciones por segundo ofreciendo más espacio para los lotes de rollup en la capa 1.

Esta es también la razón por la que Eth2 puede crear una sinergia masiva con los rollups, ya que aumenta el espacio posible de disponibilidad de datos mediante la creación de múltiples fragmentos, cada uno de ellos capaz de almacenar una cantidad significativa de datos. La combinación de Eth2 y los rollups podría llevar la velocidad de transacción de Ethereum hasta unas 100 000 transacciones por segundo.

Optimism y Arbitrum son actualmente las opciones más populares en lo que respecta a los rollups optimistas. Optimism se ha implementado parcialmente en la red principal de Ethereum con un conjunto limitado de socios como Synthetix y Uniswap para garantizar que la tecnología funcione como se espera antes del lanzamiento completo. Arbitrum ya implementó su versión en la Red principal y comenzó la incorporación de diferentes proyectos a su ecosistema.

Algunos de los proyectos más notables que se lanzan en Arbitrum incluyen Uniswap, Sushi, Bancor, Augur, Chainlink, Aave y muchos más. Arbitrum también ha anunciado su asociación con Reddit, centrándose en el lanzamiento de una cadena de rollup separada para escalar su sistema de recompensas. Optimism se está asociando con MakerDAO para crear el puente Optimism Dai Bridge y permitir retiros rápidos de DAI y otros tokens de vuelta a la capa 1.

Aunque tanto Arbitrum como Optimism intentan lograr el mismo objetivo (construir soluciones de rollup optimista compatibles con la EVM), hay algunas diferencias en su diseño. Arbitrum tiene un modelo de resolución de disputas diferente. En lugar de volver a ejecutar una transacción completa en la capa 1 para verificar si la prueba de fraude es válida, han ideado un modelo interactivo de múltiples rondas que permite reducir el alcance de la disputa y potencialmente ejecutar solo unas pocas instrucciones en la capa 1 para comprobar si una transacción sospechosa es válida.

Otra diferencia importante es el enfoque para manejar el ordenamiento de transacciones y el MEV. Arbitrum ejecutará inicialmente un secuenciador responsable de ordenar las transacciones, pero quieren descentralizarlo a largo plazo. Optimism prefiere otro enfoque en el que el ordenamiento de las transacciones (y, por lo tanto, el MEV) se puede subastar a otras partes durante un cierto período de tiempo.

#### ZK rollups (13:10) {#zk-rollups-1310}

Aunque parece que la comunidad de Ethereum se está centrando principalmente en los rollups optimistas (al menos a corto plazo), los proyectos que trabajan en ZK rollups también están progresando extremadamente rápido.

Loopring utiliza la tecnología de ZK rollup para escalar su protocolo de intercambio y pago. Hermez y ZKTube están trabajando en escalar los pagos utilizando ZK rollups, y Hermez también está construyendo un ZK rollup compatible con la EVM. Aztec se está centrando en incorporar características de privacidad a su tecnología de ZK rollup.

Los rollups basados en StarkWare ya son ampliamente utilizados por proyectos como DeversiFi, Immutable X y dYdX. Como se mencionó anteriormente, zkSync está trabajando en una máquina virtual compatible con la EVM que podrá soportar completamente cualquier contrato inteligente arbitrario escrito en Solidity.

#### DeFi (14:02) {#defi-1402}

Los rollups también deberían tener un gran impacto en las finanzas descentralizadas (DeFi). Los usuarios que antes no podían realizar transacciones en Ethereum debido a las altas tarifas de transacción podrán permanecer en el ecosistema la próxima vez que la actividad de la red sea alta. Los rollups también permitirán una nueva generación de aplicaciones que requieren transacciones más baratas y un tiempo de confirmación más rápido, todo mientras están completamente aseguradas por el consenso de Ethereum. Parece que los rollups pueden desencadenar otro período de alto crecimiento para las DeFi.

#### Desafíos (14:29) {#challenges-1429}

Sin embargo, hay algunos desafíos en lo que respecta a los rollups. La composabilidad es uno de ellos: para componer una transacción que utilice múltiples protocolos, todos ellos tendrían que estar implementados en el mismo rollup.

Otro desafío es la liquidez fracturada. Sin la entrada de dinero nuevo en el ecosistema de Ethereum en su conjunto, la liquidez existente presente en la capa 1 en protocolos como Uniswap o Aave se compartirá entre la capa 1 y múltiples implementaciones de rollups. Una menor liquidez generalmente significa un mayor deslizamiento y una peor ejecución de las operaciones.

Esto también significa que, naturalmente, habrá ganadores y perdedores. En este momento, el ecosistema de Ethereum existente no es lo suficientemente grande como para hacer uso de todas las soluciones de escalabilidad. Esto puede cambiar (y probablemente lo hará) a largo plazo, pero a corto plazo, es posible que veamos algunos rollups y otras soluciones de escalabilidad convertirse en pueblos fantasma. En el futuro, también es posible que veamos a usuarios viviendo completamente dentro de un ecosistema de rollup y sin interactuar con la cadena principal de Ethereum y otras soluciones de escalabilidad durante largos períodos de tiempo.

#### Amenaza para las cadenas laterales (15:44) {#threat-to-sidechains-1544}

Una pregunta que surge muy a menudo cuando se habla de rollups es si son una amenaza para las cadenas laterales. Las cadenas laterales seguirán teniendo su lugar en el ecosistema de Ethereum. Aunque el costo de las transacciones en la capa 2 será mucho menor que en la capa 1, lo más probable es que siga siendo lo suficientemente alto como para excluir por precio a ciertos tipos de aplicaciones, como juegos y otras aplicaciones de alto volumen. Esto puede cambiar cuando Ethereum introduzca la fragmentación, pero para entonces las cadenas laterales pueden crear suficiente efecto de red para sobrevivir a largo plazo.

Además, las tarifas en los rollups son más altas que en las cadenas laterales porque cada lote de rollup todavía tiene que pagar por el espacio de bloque de Ethereum. La comunidad de Ethereum pone un gran enfoque en los rollups dentro de la estrategia de escalabilidad de Ethereum, al menos a corto y medio plazo, y potencialmente incluso más tiempo.