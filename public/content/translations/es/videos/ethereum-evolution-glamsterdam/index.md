---
title: "La evolución de Ethereum: Fusaka, Glamsterdam y más allá"
description: "Preston Van Loon habla sobre las próximas actualizaciones del protocolo de Ethereum, cubriendo los hitos de la hoja de ruta de Fusaka y Glamsterdam, y la evolución a largo plazo del protocolo."
lang: es
youtubeId: "GgKveVMLnoo"
uploadDate: 2025-03-01
duration: "0:21:34"
educationLevel: intermediate
topic:
  - "hoja-de-ruta-y-prioridades"
  - "hoja-de-ruta"
  - "actualizaciones"
format: presentation
author: ETHDenver
breadcrumb: "Evolución de Ethereum"
---

Una presentación de **Preston Van Loon** de Offchain Labs y Prysm, realizada en ETHDenver. Preston cubre la reciente velocidad de actualización de Ethereum y lo que le espera a la red, incluyendo Pectra, Fusaka, PeerDAS, Glamsterdam, FOCIL, tiempos de slot más cortos y una finalidad más rápida.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=GgKveVMLnoo) publicada por ETHDenver. Ha sido ligeramente editada para facilitar su lectura.*

#### Introducción (0:07) {#introduction-007}

**Presentador:** Muy bien, todos. Sigamos adelante. Vamos a hablar sobre la evolución de Ethereum con Preston Van Loon. Adelante.

**Preston Van Loon:** Muy bien. Gracias. GM (buenos días): ya saben que es GM en cualquier momento, de día o de noche, sea o no de mañana. Así que veo GM todo el día y toda la noche. Quiero hablar sobre la evolución de Ethereum, así que comencemos.

Hay una narrativa que probablemente hayan escuchado antes: Ethereum es demasiado lento para lanzar actualizaciones. Sé que lo han escuchado. Yo lo he escuchado. Lo han escuchado muchas veces. La gente decía: "¿Cuándo es The Merge? ¿No pueden hacer algo los desarrolladores? Otras cadenas avanzan rápido. ¿Por qué Ethereum avanza tan lento?". Estoy aquí para decirles que esa narrativa está muerta.

Trabajo en el cliente de consenso Prysm. Es uno de los componentes clave de la cadena de balizas de Ethereum. Y estuve en las trincheras durante las actualizaciones más recientes: Pectra, Fusaka. Por lo que vi desde adentro, esto no fue la burocracia lenta que la gente ha afirmado que es Ethereum durante muchos años. En realidad, fue una máquina de alta velocidad y bien ejecutada que entregó algunas de las actualizaciones más grandes que jamás hayamos visto en la historia de Ethereum.

#### Lanzamiento de tres actualizaciones en un año (1:18) {#shipping-three-upgrades-in-one-year-118}

Lo que lanzamos en 2025 fueron tres actualizaciones importantes en un año. Primero, Pectra en mayo de 2025. Esto introdujo la abstracción de cuentas nativa, un aumento en el saldo efectivo máximo del validador que permite consolidaciones, y diez EIP más. En mayo, esta fue la actualización más grande en términos de EIP que Ethereum había visto jamás.

Pero luego, solo siete meses después, lanzamos Fusaka, una actualización aún mayor en términos de EIP. Esta tuvo trece, con una innovación llamada PeerDAS, que es realmente emocionante. Pero solo seis días después, nos actualizamos nuevamente con una bifurcación BPO1, y BPO2 le siguió poco después, aumentando la capacidad de blob de Ethereum.

Esto es un testimonio de la capacidad de entrega de Ethereum. Esta es una colaboración entre cinco o seis clientes de consenso, cinco clientes de ejecución, muchos investigadores (más de cien personas involucradas en el desarrollo central de Ethereum) y todos están lanzando actualizaciones en coordinación al mismo tiempo.

#### Escalado con PeerDAS (2:22) {#peerdas-scaling-222}

Echemos un vistazo a la estrella de Fusaka: PeerDAS. PeerDAS es una solución de escalado increíble. Antes de PeerDAS, teníamos Pectra, y con Pectra tenías que (como operador de nodo o validador) descargar cada blob que venía con un bloque. Esto apuntaba a seis blobs por bloque. Todos tenían que descargarlo, y eso es realmente un cuello de botella para el escalado. Si quieres aumentar eso, le estás pidiendo a los operadores de nodos que aumenten proporcionalmente su uso de ancho de banda para los blobs.

Ahora con Fusaka, tenemos blobs codificados por borrado (erasure-coded) y pedimos a los validadores que solo custodien una parte de eso. Solo necesitas custodiar un octavo de los blobs. Y con cualquier 50% de los blobs, puedes reconstruir todo. Así que, con esto distribuido por la red, se asegura la disponibilidad de datos y que haya una menor carga para los stakers en solitario. Esto nos da una reducción inmediata de casi el 90% en el uso de ancho de banda de la red para los blobs.

Mirando los números: para Pectra, teníamos un objetivo de seis y un máximo de nueve blobs con un límite de gas de 36 millones. Consideramos esto como la línea base para el uso de blobs: eso era 768 kilobytes por bloque. Ahora, entre Pectra y Fusaka, tuvimos una actualización fuera de banda donde se aumentó el límite de gas. Este fue un proceso de gobernanza en cadena donde los validadores simplemente emitieron su voto sobre cuál creían que debería ser el límite del bloque: pasó de 36 a 45 millones. Y luego, más adelante en el año, llegamos a Fusaka, que no cambió el objetivo ni el máximo de blobs, pero volvió a aumentar el límite de gas.

Y luego obtuvimos esa gran disminución en el ancho de banda donde cada bloque con un objetivo de seis blobs ahora es de solo 96 kilobytes de datos de blob que un validador tenía que almacenar. Luego, nuevamente con BPO1, la bifurcación de solo parámetros de blob, aumentamos el objetivo a 10 y el máximo a 15. BPO2, que ocurrió solo un mes después, pasó a 14 y 21, lo que es el doble de lo que teníamos en Pectra, pero aún así un 71% menos de uso de ancho de banda en blobs para los stakers en solitario.

#### Lo que viene en Glamsterdam (4:30) {#whats-coming-in-glamsterdam-430}

¿Qué sigue en Glamsterdam? Hay tres cosas realmente clave y una que todavía está en investigación activa.

La primera es ePBS: separación proponente-constructor (PBS) consagrada. En la forma en que se realiza la producción de bloques hoy en día, muchas personas están subcontratando su oportunidad de construir un bloque a través de MEV-Boost a constructores muy sofisticados. Esa es la mayoría de la red. El problema es que tienes que confiar en un retransmisor (relay), y hay mucha confianza en que el constructor realmente presentará el bloque por el que había ofertado. ePBS introduce un mecanismo dentro del protocolo para que haya mucha menos confianza requerida, y es una implementación muy limpia de la misma idea.

Lo siguiente que tenemos son las listas de acceso a nivel de bloque. Esta es una innovación genial donde cada bloque vendrá con una lista que dice en qué parte del estado estaba leyendo o escribiendo datos. Lo que eso significa es que puedes procesar bloques en paralelo. Hoy en día tienes que procesar los bloques secuencialmente. Si quieres procesar el bloque 10, primero tienes que procesar el 9 y el 8, y así sucesivamente. Ahora, si tienes una colección de bloques y ninguno de ellos entra en conflicto con la información de acceso al estado, puedes procesar los ocho en paralelo. Tal vez tengas ocho núcleos: eso hace que Ethereum sea más eficiente y más rápido para procesar bloques.

La tercera cosa es la revalorización del gas. Ha habido pruebas de rendimiento a través de este EIP que mostraron que algunos códigos de operación tenían un precio excesivo y otros un precio inferior. Ahora vamos a actualizar las tarifas que pagas por cada código de operación para reflejar la realidad, haciendo que Ethereum sea más seguro y más eficiente.

#### El papel en evolución de las capa 2 (l2) (6:14) {#the-evolving-role-of-l2s-614}

Hay una cosa de la que quiero hablar que Vitalik mencionó recientemente. Dijo en un tuit hace un par de semanas que la visión original de las capa 2 (l2) y su papel en Ethereum ya no tiene sentido. Acaparó muchos titulares, y creo que mucha gente sacó la conclusión equivocada de esto.

Déjenme decirles lo que significa desde la perspectiva de alguien que está adentro. Ethereum está escalando más rápido de lo esperado. Las tarifas son más bajas que nunca. Nunca pensé que estaría pagando tarifas de gas de menos de un Gwei en la Red principal, pero aquí estamos. Los blobs son abundantes: tenemos muchos. Estamos escalando los blobs más rápido de lo esperado. E incluso las tarifas de las capa 2 (l2) son realmente bajas.

Así que la idea de que necesitamos capa 2 (l2) de propósito general (es decir, capa 2 (l2) que son simplemente la misma EVM que tenemos en la capa 1 (l1), solo copiadas y pegadas un montón de veces y que lo único que hacen es ir más rápido) ya no es la visión. Estas capa 2 (l2) prosperarán con la especialización. Algunas de ellas se centrarán en cosas como la privacidad, los juegos, aspectos específicos de las finanzas descentralizadas (DeFi) o extensiones de la EVM. Pero si son simplemente una copia clonada de la capa 1 (l1), no son parte de la hoja de ruta donde inicialmente imaginamos este tipo de paradigma fragmentado (sharded) a través de las capa 2 (l2).

#### FOCIL: resistencia a la censura a nivel de protocolo (7:25) {#focil-protocol-level-censorship-resistance-725}

Más allá de Glamsterdam, hay tres cosas realmente geniales en desarrollo e investigación activa. La primera es FOCIL: Listas de Inclusión Aplicadas por Elección de Bifurcación (Fork-Choice Enforced Inclusion Lists).

El problema que pretende resolver es que los constructores de bloques tienen una opción. Ellos deciden qué transacciones se incluyen en el bloque. Pueden preferir algunas o no preferir otras: tal vez sea por una ventaja de MEV, tal vez sea por presión regulatoria. Pero en cualquier caso, pueden censurar las transacciones como deseen, y no hay nada que nadie pueda hacer al respecto.

FOCIL cambia la dinámica de poder. En lugar de decir que los constructores de bloques pueden elegir todas las transacciones en un bloque, hay un comité aleatorio que selecciona (basado en sus heurísticas locales) algunas transacciones que creen que deben incluirse en el siguiente bloque. No son todas las transacciones del siguiente bloque. Los constructores todavía tienen mucha libertad, pero hay un subconjunto que deben incluir. El proponente de bloque tomará esta lista corta (tal vez unas ocho transacciones) y la pondrá al final del bloque, y se ejecutarán con el bloque.

Esto se aplica a través de la elección de bifurcación. Los validadores que vean un bloque no emitirán una atestación para él a menos que tenga una lista de inclusión adjunta en la parte inferior. Si ven uno sin la lista, considerarán que ese bloque es inválido y simplemente lo ignorarán: no lo propagarán, no emitirán su voto sobre él. Esto sigue siendo una investigación activa con algunos parámetros aún por decidir, pero la dirección es clara: Ethereum va a incluir resistencia a la censura a nivel de protocolo.

#### Tiempos de slot más cortos (9:24) {#shorter-slot-times-924}

Lo siguiente realmente emocionante son los tiempos de slot más cortos. Con Hegata (la bifurcación después de Glamsterdam) estamos considerando si podemos incluir tiempos de slot más cortos o slots rápidos. Eso no quiere decir que saltemos directamente a slots de seis segundos o incluso más rápidos, sino construir los rieles para hacerlo posible.

Suena muy simple, como: "simplemente vayamos más rápido". Pero hay que pensar en la propagación de la red, los deberes de atestación de los validadores donde tienen una cantidad limitada de tiempo para actuar, y luego está la economía. Cuando experimenté por primera vez con esto, simplemente cambié el 12 a un 6 y de repente todos estaban obteniendo el doble de emisión (el doble de dinero), lo cual no es realmente la intención detrás de los tiempos de slot más cortos. Se trata de ir más rápido pero manteniendo todo lo demás igual. Así que es algo muy complejo, pero tiene la posibilidad de llegar allí en la etapa final de manera incremental.

#### Finalidad más rápida (10:20) {#faster-finality-1020}

La tercera cosa es una finalidad más rápida. Esto es realmente importante porque Ethereum se finaliza cada dos épocas (cada 13 minutos) y hay aplicaciones que realmente dependen de hacer la pregunta: ¿es permanente mi transacción? Si la transacción no ha estado en una época finalizada, entonces la respuesta es no: hay una pequeña posibilidad de que pueda ser reorganizada y la transacción deba enviarse nuevamente.

Ahora, si tenemos una finalidad rápida, cosas como los exchanges, los puentes o cualquier aplicación pueden estar seguros de que una transacción es definitiva. Primero, en lugar de dos épocas para la finalidad, hagámoslo en una. Luego podemos decir que en lugar de épocas que tienen 32 slots de duración, acortémoslas a cuatro slots. Ahora, si combinas esto con tiempos de slot de seis segundos, estás hablando de finalidad en menos de 30 segundos. Ese es un objetivo final realmente genial.

#### La estrella polar (11:15) {#the-north-star-1115}

Todo esto está integrado en la estrella polar, donde decimos que la capa 1 (l1) es rápida con finalización en segundos. ¿Cómo llegamos allí? Primero, comenzamos con PeerDAS, que ya se ha lanzado. Eso nos ha dado una capa escalable para la disponibilidad de datos. A continuación, tenemos Glamsterdam, que incluye principalmente ePBS, que es una implementación limpia para la separación proponente-constructor (PBS) y hace que cosas como FOCIL sean más impactantes. FOCIL entra con resistencia a la censura, lo cual es muy armonioso con ePBS. Con slots más rápidos, los tiempos de slot más rápidos hacen que una finalidad más rápida sea aún más impactante. Luego llegamos a este objetivo final donde realmente tenemos transacciones rápidas que son finalizadas en segundos.

#### Cierre (12:02) {#closing-1202}

Quiero que se imaginen cómo será la vida en dos años. Es un poco difícil de pensar porque el mundo cripto se mueve muy rápido. Esto podría ser una realidad en solo dos años: tiempos de confirmación de transacción de cuatro o seis segundos; finalidad medida en segundos, no en minutos; aplicación a nivel de protocolo para la resistencia a la censura; protecciones contra la criptografía poscuántica; y capa 2 (l2) compitiendo en características y nuevas innovaciones, no solo en ir más rápido. Todo esto conservando la virtud de que puedes usar una computadora portátil o hardware de nivel de consumidor para ejecutar un nodo completo en casa. Ethereum es accesible y seguirá siendo accesible para todos en el futuro.

La conclusión que quiero que se lleven es: la narrativa que les presenté al principio, realmente no hay evidencia que la respalde. Ethereum está lanzando actualizaciones rápido. En solo un año, hubo tres actualizaciones. Y en los próximos 24 meses, vienen aún más cosas, y llegarán aún más rápido.

Estos no son solo plazos de fantasía de cinco años. Son cosas reales con propuestas concretas que se están desarrollando en este momento. Hay cosas en la red de desarrollo en este momento. Hay personas trabajando mientras hablamos en estas implementaciones. Si estás construyendo en Ethereum hoy, estás construyendo en la cadena de bloques desarrollada más activamente del mundo.

Soy Preston Van Loon, desarrollador principal de Ethereum. Trabajo en el equipo de Prysm en Offchain Labs. Si quieres involucrarte, la mejor manera de estar en sintonía con lo que sucede en Ethereum es ayudar a construirlo tú mismo. Ven a hablar conmigo después. Ven a ver el repositorio de Prysm o cualquiera de los repositorios de especificaciones de consenso o de ejecución: realmente nos encantarían tus contribuciones. Gracias.