---
title: "La próxima actualización de Ethereum: espacio de blobs 101"
description: "Domothy explica el espacio de blobs, la nueva capa de disponibilidad de datos introducida por la actualización Dencun de Ethereum, cubriendo cómo funcionan las transacciones de blobs, por qué son importantes para el escalado de Ethereum y qué sigue para la disponibilidad de datos."
lang: es
youtubeId: "dFjyUY3e53Q"
uploadDate: 2024-02-27
duration: "1:02:31"
educationLevel: intermediate
topic:
  - "scaling"
  - "blobs"
  - "dencun"
  - "upgrades"
format: interview
author: Bankless
breadcrumb: "Espacio de blobs 101"
---

Esta entrevista cubre el recurso del espacio de blobs de Ethereum, introducido con el [EIP-4844 (Proto-Danksharding)](https://www.eip4844.com/). El investigador de Ethereum Domothy se une a David Hoffman y Ryan Sean Adams en el podcast Bankless para explicar la historia de la hoja de ruta centrada en los rollups, la mecánica técnica de los blobs y las implicaciones económicas de separar el espacio de bloques del espacio de blobs.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=dFjyUY3e53Q) publicada por Bankless. Ha sido ligeramente editada para facilitar su lectura.*

#### Introducción al espacio de blobs (0:00) {#introduction-to-blob-space-000}

**Ryan Sean Adams:** Bienvenidos a Bankless, donde exploramos la frontera del dinero y las finanzas de internet. Aquí te mostramos cómo empezar, cómo mejorar y cómo adelantarte a las oportunidades. Estoy aquí con David Hoffman, y estamos aquí para ayudarte a ser más "bankless". ¿Sabes que decimos que las cadenas de bloques venden bloques? Bueno, pronto Ethereum venderá algo más que bloques: también venderá blobs.

**David Hoffman:** Así es, blobs. Estamos a solo unos meses del mayor lanzamiento de Ethereum desde La Fusión, y creo que nadie ha trazado completamente las implicaciones de esto, pero va a ser enorme. Ethereum tendrá un nuevo producto para vender. Se llama espacio de blobs, y se suma al espacio de bloques. El costo de las transacciones en las capas 2 está a punto de caer casi a cero. La economía del gas de ETH y la quema están a punto de cambiar para siempre. Llamamos a esta actualización la actualización del espacio de blobs, EIP-4844, Proto-Danksharding. Queremos cubrir todo lo que necesitas saber sobre el espacio de blobs.

**Ryan Sean Adams:** Algunas conclusiones aquí. Número uno, repasamos qué es el espacio de blobs. Número dos, repasamos la historia de cómo llegamos realmente hasta aquí: esta hoja de ruta centrada en los rollups. Número tres, repasamos la economía. ¿Qué significa esto para la economía de Ethereum, para la acumulación de valor de ETH, para ETH como activo? David, ¿por qué fue significativo este episodio para ti?

**David Hoffman:** Creo que si hay algún sector de conversación que tú y yo realmente amamos, es la intersección de la criptografía y la economía, como los números y las manifestaciones económicas. Me encanta jugar con estos protocolos.

**Ryan Sean Adams:** Sí, ese es nuestro lenguaje del amor.

**David Hoffman:** Hemos hablado del EIP-4844, hemos hablado del Proto-Danksharding. Son lo mismo. Lo hemos definido varias veces en diferentes capacidades. Pero nunca nos hemos sumergido de lleno en la madriguera del conejo para salir por el otro lado respondiendo a la parte económica. Así que hemos escalado técnicamente la disponibilidad de datos a nivel técnico: esa es una mejora del protocolo. Pero, ¿cómo se conecta eso con el lado del mercado de Ethereum? El mercado único ahora se está fracturando en dos: el espacio de bloques y el espacio de blobs son ahora dos mercados independientes diferentes que están contenidos dentro de un bloque de Ethereum.

¿Qué significa eso para el ether? ¿Qué significa para los mercados que surgen en torno a estas cosas? ¿Cómo interactúa el equilibrio de la oferta y la demanda de cada uno? ¿Qué hace esto por la escalabilidad de la capa 2? ¿Qué hace esto por los casos de uso económico sobre las capas 2? Vamos a empezar con los conceptos básicos, pero luego saldremos por el otro lado de la madriguera hacia el lado económico de esta conversación.

Traigamos a nuestro invitado, Dom, también conocido como Domothy. Es investigador en la Fundación Ethereum y trabaja en la investigación y el desarrollo de actualizaciones clave de Ethereum que están en camino, incluido el EIP-4844 (el tema de hoy), el danksharding completo y la quema de MEV.

#### La historia de la hoja de ruta centrada en los rollups (10:00) {#the-history-of-the-rollup-centric-roadmap-1000}

**Ryan Sean Adams:** Entonces, Dom, para entender completamente cómo llegamos al espacio de blobs, creo que vale la pena hacer un viaje por el camino de los recuerdos para comprender la totalidad de la hoja de ruta de Ethereum, porque llegó a una conclusión muy lógica de blobs y espacio de blobs. ¿Puedes llevarnos al pasado? Porque en un momento dado, la hoja de ruta de Ethereum centrada en los rollups no existía. Teníamos esto llamado fragmentación de ejecución, que en realidad nunca obtuvimos. ¿En qué punto de la historia de la hoja de ruta de Ethereum es apropiado situarse para entender realmente el contexto completo del espacio de blobs?

**Domothy:** Claro. Incluso antes de que Ethereum se lanzara, ya había ideas sobre cómo escalarlo porque todos sabían, incluso en ese entonces, que una sola cadena de bloques con cada nodo ejecutando todo no sería suficiente. Así que inicialmente hubo un montón de ideas diferentes para la fragmentación. El primer intento de especificarlo realmente fue la fragmentación con ejecución, donde básicamente tienes, digamos, 64 cadenas independientes diferentes y tratan de comunicarse entre sí. Resulta que eso es difícil de hacer: hay mucha complejidad involucrada.

Se dividió en diferentes fases. Primero, vamos a lanzar una cadena de balizas, luego descubriremos cómo fusionarla realmente con la capa de ejecución actual. Luego haremos la Fase Uno, que es solo fragmentación de datos (sin ejecución, solo cadenas de bloques más pequeñas que contienen datos). Y luego descubriremos cómo hacer la fragmentación de ejecución. Fue mucho de ir descubriéndolo sobre la marcha, pero de manera segura para no hacer algo de lo que nos arrepintamos más tarde y romper toda la cadena de bloques, porque hay mucha actividad económica en ella.

**David Hoffman:** Para dar más detalles sobre la fragmentación de ejecución: es la mezcla aleatoria de validadores a través de distintos fragmentos de la cadena de bloques, donde cada fragmento es esencialmente su propia mini cadena de bloques que se ejecuta en paralelo a la cadena de balizas. Suena un poco a lo que tenemos hoy con los rollups, pero la diferencia aquí es que los fragmentos de Ethereum son en realidad parte del protocolo de la capa 1. El protocolo de la capa 1 determina cuáles son los fragmentos, mientras que los rollups están separados. Originalmente, iban a ser 64 de estos fragmentos operados, gestionados y producidos por el protocolo de la capa 1 de Ethereum. ¿Lo estoy articulando correctamente?

**Domothy:** Exactamente. Conseguir el escalado de ejecución de esta manera es más indirecto con los rollups y la fragmentación de datos, pero es como un truco desde la perspectiva de la investigación porque la capa 1 de Ethereum tiene muchas menos cosas que hacer y de las que preocuparse. El resto se descarga en los rollups, lo que en mi opinión es mejor que el plan original. En el plan original de fragmentos patrocinados por el estado, todo es igual: la misma cadena de bloques, la misma EVM, las mismas concesiones. Ahora, en lugar de eso, puedes tener rollups compitiendo entre sí para obtener el mejor entorno y las mejores concesiones. Si prefieres una súper velocidad sobre una súper seguridad, puedes ir a un rollup diferente. Tienes opciones, innovación y competencia en la capa 2.

**Ryan Sean Adams:** Toquemos el mundo modular en el que se encuentra Ethereum. Está la capa de consenso, la capa de disponibilidad de datos y la capa de ejecución. La capa de consenso define lo que es verdad: el orden de los bloques. La capa de disponibilidad de datos es lo que sucedió: la capa de datos. La capa exterior es la ejecución, donde la actividad está ocurriendo en este momento. Originalmente, Ethereum combinaba las tres en la cadena principal.

Ahora lo que estamos haciendo con la hoja de ruta centrada en los rollups es fragmentar la ejecución de la cadena principal hacia estos rollups. Pero para que los rollups estén completamente asegurados con garantías similares a las de la red principal de Ethereum, tienen que publicar sus datos de vuelta en la red principal de Ethereum. Cuando hacen eso, actualmente cuesta espacio de bloques, y cuesta mucho dinero. La razón del Proto-Danksharding (EIP-4844) es que la economía cambia de una manera muy favorable para los rollups. Dom, ¿algo que añadir ahí?

**Domothy:** Solo añadiría que en este momento la disponibilidad de datos es más implícita y se reduce a una verificación sin necesidad de confianza. Queremos que todos puedan verificar la cadena por sí mismos y no tener que depender de un tercero en el medio que diga "confía en mí, hermano". Ese es el cuello de botella. Necesitas poder verificar todo, lo que implícitamente significa que necesitas tener los datos disponibles para comprobar las transiciones de estado.

A finales de 2020, la gente se dio cuenta de que los rollups estaban empezando a ser increíblemente buenos y populares, y resolvieron nuestro problema de escalado de ejecución sin la necesidad de fragmentación de ejecución. Al optar por un ecosistema de rollups en lugar de intentar ser un maximalista de la capa 1, los rollups pueden hacer sus propias concesiones, crear sus propias cadenas de bloques y experimentar con cosas novedosas. Ethereum se encarga de la verificación: ese es el núcleo de lo que es una cadena de bloques.

#### ¿Qué es el espacio de blobs? (30:00) {#what-is-blob-space-3000}

**Ryan Sean Adams:** Ahora llévanos al estado actual, Dom. Tenemos muchos rollups que utilizan el espacio de bloques de la capa 1 de Ethereum, pagando altas tarifas de gas para publicar sus datos de estado para que cualquiera pueda verificarlos. Entonces, Dom, ¿qué es un blob?

**Domothy:** Un blob es solo un fragmento de datos, específicamente una gran matriz de números en bruto, esencialmente. Un blob en Ethereum en este momento tiene un tamaño fijo de aproximadamente 128 kilobytes. Son solo datos en bruto adjuntos a una transacción, conocida como transacción portadora de blobs, que envías a la capa 1.

La restricción de diseño crucial aquí es que la EVM (Máquina Virtual de Ethereum) de la capa 1 de Ethereum, el motor de ejecución, no tiene acceso a los datos dentro del blob. En los bloques estándar, los datos como los datos de llamada implican que el sistema observe qué funciones se están llamando, qué dinero se está moviendo y verifique los cambios de estado. La EVM accede a todo eso. Pero si el escalado de la capa 2 implica publicar los datos de los rollups precisamente para que un verificador *fuera de la cadena* pueda hacer el cálculo, entonces la *capa 1* de Ethereum funcionalmente no necesita mirarlos y ejecutarlos.

Es esencialmente un paquete sellado. La capa 1 lo toma, garantiza que todos tengan acceso a mirar dentro si quieren descargarlo físicamente, pero la capa de ejecución de procesamiento principal de Ethereum en sí no lee ni calcula activamente los datos. Debido a que no está leyendo ni calculando los datos en la EVM, requiere radicalmente menos recursos de procesamiento de los nodos. Por eso es mucho más barato.

**David Hoffman:** Así que para resumir: el espacio de bloques se preocupa por el cálculo, la ejecución del estado y el almacenamiento de la lógica. El espacio de blobs se preocupa exclusivamente por la disponibilidad de datos. A la capa 1 no le importa quién publica qué en estos blobs; lo único que le importa es recibir estos blobs y retenerlos durante la ventana de disponibilidad designada para que las partes interesadas (como los secuenciadores de rollups y los usuarios) puedan extraerlos, verificar que los datos no se retuvieron maliciosamente y seguir adelante.

**Domothy:** Exactamente. Y otra propiedad crítica de los blobs es que se podan automáticamente después de un período de tiempo (actualmente alrededor de 18 días). La razón por la que se podan es que, para garantizar una verificación sin necesidad de confianza, los individuos solo necesitan que esos datos estén disponibles para probar la finalidad y el consenso sobre el estado del rollup dentro de una ventana de desafío específica. No necesitas mil nodos guardando blobs de hace dos años para verificar tu transacción hoy. Cuando la ventana expira, ya no lo obtendrás de un nodo de Ethereum; lo obtienes de proveedores de historial, indexadores o los exploradores de bloques nativos del rollup. El almacenamiento en Ethereum es increíblemente caro para siempre. Eliminar el requisito de almacenamiento nos permite escalar la capacidad de procesamiento de blobs sin destruir los discos duros de los operadores de nodos.

#### Economía y danksharding completo (55:00) {#economics-and-full-danksharding-5500}

**Ryan Sean Adams:** Sabemos que el 4844 es el primer paso: lo que llamamos Proto-Danksharding. Establece el formato de blob y el mercado de tarifas aislado, pero el número objetivo real de blobs por bloque está restringido inicialmente para ser bastante seguro. ¿Cómo se ve esto escalando hacia el danksharding completo?

**Domothy:** En este momento, bajo el EIP-4844, apuntamos esencialmente a 3 blobs por bloque, con un máximo estricto de 6. Eso limita la capacidad de procesamiento de datos máxima absoluta en la capa 1 inmediatamente después de la actualización para evitar cualquier estrés en la red mientras vemos cómo funciona la característica en producción continua.

El danksharding completo escala esto drásticamente. Avanza hacia el muestreo de disponibilidad de datos (DAS). Con el DAS, los nodos completos ya no necesitan descargar individualmente cada blob para verificar que los datos se hicieron disponibles. Pueden muestrear estadísticamente pequeñas partes de los datos del blob. Si la muestra estadística resulta estar disponible, la probabilidad matemática de que un atacante esté ocultando datos se acerca efectivamente a cero (como una posibilidad entre mil millones). Una vez que no requieres la descarga completa de todo el blob, puedes escalar la capacidad de blobs a dos dígitos o más por bloque.

**David Hoffman:** Esto crea un mercado de tarifas fracturado dentro de un bloque de Ethereum. En este momento, un rollup de capa 2 tiene que competir con los comerciantes de Uniswap y OpenSea por los mismos recursos de espacio de bloques en un bloque de Ethereum. Pero estos son patrones de uso fundamentalmente diferentes. Si hay una locura por acuñar NFT en la L1 de Ethereum, el gas se dispara, y los rollups de capa 2 que intentan publicar su estado de datos de repente se enfrentan a gastos comerciales que se disparan solo para cumplir con sus deberes de seguridad necesarios.

Con un mercado de tarifas bidimensional (esencialmente una carretera aislada separada para que circulen los blobs), esa acuñación de NFT en la L1 de Ethereum dispara el gas de ejecución de la misma manera, pero no utiliza espacio de blobs. Los blobs permanecen completamente descongestionados y efectivamente cuestan centavos. Una acuñación de NFT multimillonaria en la cadena principal tiene un impacto nulo en el costo económico de finalizar transacciones en Arbitrum u Optimism.

**Domothy:** Sí, están completamente desconectados. Y lo contrario también es cierto. Si la capacidad de procesamiento de la capa 2 se dispara inmensamente y miles de rollups operan y congestionan el espacio de blobs, el aumento resultante en las tarifas base de los blobs no afectará el costo de hacer una transacción simple en la red principal de Ethereum. La tarifa base del blob opera exactamente como la tarifa base del EIP-1559, pero en su propia dimensión. Y a tu pregunta anterior sobre la quema: sí, la tarifa de blob genera ETH quemado para pagar la inclusión de datos en el espacio de blobs, totalmente separado de la quema de la tarifa base del espacio de bloques.

#### El futuro de la escalabilidad de Ethereum (75:00) {#the-future-of-ethereum-scalability-7500}

**Ryan Sean Adams:** Quiero llegar a lo que sucede específicamente en el lanzamiento del 4844. Inicialmente, obviamente hay una expectativa muy alta de que cuando la capacidad de blobs se desbloquee repentinamente, no habrá suficiente demanda de rollups en ese microsegundo exacto para llenarla por completo. El espacio de blobs será casi cómicamente barato en el lanzamiento. Pero, ¿no existe la ley de la demanda inducida? Si tienes recursos increíblemente baratos, las aplicaciones que consumen esos recursos explotan en volumen.

**Domothy:** La transición inicial reducirá las tarifas de la capa 2 esencialmente a casi cero, porque todos los rollups existentes que actualmente compiten por el costoso espacio de bloques harán una transición fluida a un grupo masivo casi vacío de espacio de blobs. Esa es una expansión de margen masiva e instantánea para las redes de capa 2, que se transmitirá directamente a los usuarios en el momento en que integren su nueva lógica de prueba con el 4844.

Pero tienes razón: el espacio de bloques barato impulsa el diseño de aplicaciones de alta velocidad. Cuando de repente puedes construir un juego en cadena que genera millones y millones de microtransiciones de estado por fracciones de centavo porque la sobrecarga de persistencia de datos ha desaparecido, clasificaciones de aplicaciones completamente nuevas se vuelven económicamente viables, las cuales no lo eran bajo las restricciones estándar.

Esto establece una dinámica económica interesante en cómo ETH acumula valor. Si las transacciones de la capa 2 explotan 10 o 100 veces debido a las nuevas aplicaciones posibles que se ejecutan con una disponibilidad de datos casi gratuita, el volumen agregado eventualmente comenzará a competir por el espacio de blobs. Entonces, la tarifa base del blob del EIP-1559 aumenta naturalmente hasta que el mercado alcanza el equilibrio, creando un ciclo continuo y compuesto de quemar ETH mientras se expande la utilidad de la capa 2.

**David Hoffman:** Representa el éxito y la maduración de la hoja de ruta centrada en los rollups. Ethereum, el entorno de ejecución monolítico, chocó contra un muro donde escalar la capacidad de procesamiento linealmente destruía su mandato de descentralización. Los rollups proporcionaron una forma de eludir el cuello de botella de ejecución, pero seguían atados al cuello de botella de datos de la capa 1. El espacio de blobs desbloquea el cuello de botella de datos de la misma manera que los rollups desbloquearon el cuello de botella de ejecución. Cuando se envíe esta actualización, Ethereum pasará completamente de procesar transacciones individuales a procesar redes de ejecución verificadas.

**Ryan Sean Adams:** Para resumir la línea de tiempo, el EIP-4844 llega de manera optimista para fines de año o principios del próximo, y el danksharding completo le sigue en el ciclo de desarrollo posterior. Realmente es el andamiaje de infraestructura requerido para que Ethereum incorpore al planeta, y estamos muy cerca de que opere en el mundo real. Dom, gracias por guiarnos a través de este desbloqueo masivo para la red.

**Domothy:** Gracias por invitarme.