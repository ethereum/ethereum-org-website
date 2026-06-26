---
title: "El juego de las reorganizaciones en la prueba de participación de Ethereum"
description: "Caspar Schwarz-Schilling presenta una investigación sobre los ataques de reorganización de bloques en la prueba de participación de Ethereum, cubriendo vectores de ataque, mecanismos de defensa y las mitigaciones a nivel de protocolo implementadas."
lang: es
youtubeId: "xcPxwhrg3Ao"
uploadDate: 2022-11-29
duration: "0:18:41"
educationLevel: advanced
topic:
  - "consensus"
  - "pos"
  - "security"
format: presentation
author: LisCon
breadcrumb: "Reorganizaciones en PoS"
---

Esta presentación explora los tipos de reorganizaciones de bloques posibles en la prueba de participación (PoS) de Ethereum y las mitigaciones diseñadas para prevenirlas. Caspar Schwarz-Schilling, investigador del Grupo de Incentivos Robustos de la Fundación Ethereum, explica la mecánica de las reorganizaciones ex-post y ex-ante, comparando el panorama de seguridad entre la prueba de trabajo (PoW) y la prueba de participación.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=xcPxwhrg3Ao) publicada por LisCon. Ha sido ligeramente editada para facilitar su lectura.*

#### Introducción y antecedentes (0:03) {#introduction-and-background-003}

Bienvenidos. Hoy voy a hablar sobre las reorganizaciones que son posibles en la prueba de participación (PoS) de Ethereum.

Recientemente me uní a la Fundación Ethereum, en particular al Grupo de Incentivos Robustos. Básicamente somos un equipo de investigación centrado en todo lo relacionado con incentivos. Seré breve: esta charla está repleta de información y pueden encontrar la mayor parte de nuestro trabajo en GitHub.

#### Dos tipos de reorganizaciones (0:44) {#two-types-of-reorgs-044}

Hoy quiero hablar sobre las reorganizaciones, y en particular quiero esbozar dos tipos diferentes de reorganizaciones que son posibles en el ámbito de la prueba de participación de Ethereum.

Por un lado tenemos las **reorganizaciones ex-post** y por otro lado las **reorganizaciones ex-ante**. Perdónenme los nombres en latín un poco pretenciosos, pero cumplen su función.

Las reorganizaciones ex-post son más o menos en lo que solemos pensar cuando hablamos de reorganizaciones. El adversario ve un bloque; si es valioso, podría intentar reorganizarlo. Así que en el diagrama de aquí vemos que el bloque N+1 es el bloque que el atacante quiere eliminar mediante una reorganización, y al construir sobre el mismo bloque padre N, si funciona, el bloque N+3 se construye entonces sobre el bloque N+2. Eso es lo habitual.

Ahora bien, las reorganizaciones ex-ante son ligeramente diferentes. La idea es que el atacante necesita iniciar el ataque antes incluso de saber qué bloque va a eliminar mediante la reorganización. ¿Cómo funciona esto a grandes rasgos? A un nivel muy general, el bloque N+1 se construye sobre N pero no se publica inmediatamente. Los nodos honestos ni siquiera saben que N+1 existe, por lo que seguirán construyendo sobre N. Luego, a través de algún mecanismo, N+1 se publica y N+3 puede ver que N+1 va en cabeza y construir sobre él, de modo que N+2 es efectivamente eliminado por la reorganización.

Se preguntarán por qué alguien querría hacer este tipo de reorganización. Bueno, todavía hay MEV por capturar. Si tienen suerte, el bloque N+2 tiene mucho MEV; pueden capturarlo simplemente copiando y pegando lo que sea que tenga ese bloque. En el peor de los casos, tienen básicamente transacciones equivalentes a dos slots para escuchar.

#### Reorganizaciones ex-post en la prueba de trabajo (2:49) {#ex-post-reorgs-in-proof-of-work-249}

Antes de profundizar en las reorganizaciones ex-ante, que es el tema principal de esta charla, permítanme repasar brevemente las reorganizaciones ex-post y, en especial, comenzar con el contexto de la prueba de trabajo (PoW).

Básicamente es un resumen de la publicación del blog de los sospechosos habituales: Georgios y Vitalik. Vayan a leerlo, es genial.

En pocas palabras, en la prueba de trabajo de Ethereum, las reorganizaciones ex-post son difíciles pero no inviables. Un minero con el 10 % tiene una probabilidad relativamente buena de minar algunos bloques seguidos, y si el incentivo es lo suficientemente alto (imaginen que hay un bloque con 100 ETH de MEV para capturar), entonces tal vez una tasa de éxito del uno por ciento pueda ser suficiente para que valga la pena intentar la reorganización.

#### Reorganizaciones ex-post en la prueba de participación (3:39) {#ex-post-reorgs-in-proof-of-stake-339}

En la prueba de participación es una historia completamente diferente. Estamos hablando de una cantidad absurda de participación requerida. Voy a explicarles cómo se podría llevar a cabo solo para enfatizar lo ridículamente difícil que es.

Quizás algunos conceptos básicos primero. El tiempo en la prueba de participación de Ethereum avanza en slots. Cada slot dura 12 segundos. En cada slot hay dos roles: hay un proponente (exactamente un proponente) y un comité de miles de atestadores que se supone que deben emitir una atestación para los bloques que escuchan en la capa P2P. Ellos determinan la cabeza de la cadena ejecutando la elección de bifurcación, que es básicamente una función que toma el árbol de bloques como entrada y te da la cabeza de la cadena.

Se supone que debes emitir una atestación para los bloques si escuchas un bloque válido, o a los cuatro segundos de iniciado un slot, lo que ocurra primero. Así que si por alguna razón el proponente del bloque N+1 está desconectado y no hay ningún bloque a los cuatro segundos del slot, emites una atestación para el bloque N. Si lo escuchas a tiempo, emites una atestación para el bloque N+1. Sencillo.

Todas estas atestaciones dan peso a los bloques, y este peso es utilizado por la elección de bifurcación para determinar cuál es la cabeza más reciente.

Ahora repasemos una reorganización de un bloque. Al principio, todo transcurre con normalidad: todos emiten una atestación para el bloque N, incluso el atacante. Luego, N+1 se construye sobre N, y como el atacante no quiere darle peso al bloque que está intentando eliminar mediante la reorganización, en su lugar emite una atestación para el bloque N. El bloque N está ganando mucho peso porque el atacante tiene dos tercios del comité, lo que significa que necesita controlar, a grandes rasgos, dos tercios de toda la participación.

Un tercio de las personas honestas emitió una atestación para N+1, dos tercios para N. Ahora viene el bloque N+2: obviamente el atacante lo construye sobre N, y emite una atestación para su propio bloque. Desde el punto de vista de los validadores honestos, N+1 sigue liderando en términos de peso porque tanto N+1 como N+2 heredan todo el peso del bloque N, pero N+1 también tiene este tercio de atestaciones del que carece N+2.

Si hacemos el recuento: el bloque N+1 tiene atestaciones por valor de un tercio más un tercio, lo que da dos tercios, y el bloque N+2 también tiene dos tercios. Para simplificar, supongamos que el desempate favorece al atacante. Entonces N+3 verá a N+2 como líder y se construirá sobre él.

Para darles una idea de lo ridículas que son estas suposiciones: incluso si tuvieran un participante con el 65 % de la participación, para controlar dos tercios del comité en cualquier slot dado tienen una probabilidad del 0,05 %. Esto demuestra que el poder de las atestaciones paralelas es real: las reorganizaciones ex-post son increíblemente difíciles, si no virtualmente imposibles, en la prueba de participación de Ethereum.

#### Mecánica del ataque de reorganización ex-ante (7:34) {#ex-ante-reorg-attack-mechanics-734}

Ahora voy a hablar sobre las reorganizaciones ex-ante. Este ataque se basa en un artículo de Neuder y otros. Recientemente hemos mejorado este ataque de manera significativa. También escribimos un artículo al respecto y logramos subirlo a arXiv justo a tiempo.

También quiero adelantarles: no se preocupen, hay mitigaciones. Se integrarán antes de La Fusión.

¿Cómo funciona un ataque de reorganización ex-ante? Inicialmente, el bloque N: todo normal, todos emiten una atestación para él. Ahora ustedes son el proponente de N+1. Lo proponen y emiten una atestación de forma privada con un solo validador. Es importante destacar que lo mantienen en privado: no lo publican y no lo propagan en la capa P2P.

Lo que sucede es que las personas honestas no ven el bloque N+1, por lo que emitirán una atestación para el bloque N. Ese es el truco: heredan ese peso y no tienen que luchar realmente contra él.

Supongamos latencia cero por el momento. En el slot N+2, lo que hacemos como atacantes es publicar el bloque N+1 y la atestación privada al mismo tiempo. Los validadores honestos en el slot N+2 necesitan emitir una atestación para un bloque. Desde su punto de vista, ven el bloque N+2 y el bloque N+1 con esta única atestación privada. Si ejecutan la elección de bifurcación, encontrarán que el bloque N+1 tiene más peso que el bloque N+2, porque N+1 tiene la atestación privada que N+2 no tiene. Incluso todos los validadores honestos emitirán una atestación para el bloque N+1. En N+3, de forma trivial, N+1 será visto como la cabeza de la cadena.

#### Latencia de la red y el ataque (10:25) {#network-latency-and-the-attack-1025}

Supuse latencia cero, que obviamente no es como funciona. Hay latencia: toma tiempo propagar bloques y mensajes en la capa P2P.

La forma en que un atacante aún puede llevar a cabo este tipo de ataque es teniendo muchos nodos en diferentes ubicaciones de la topología P2P. Cuando el proponente honesto en el slot N+2 propone ese bloque, ustedes se enteran muy temprano en el proceso de propagación. Como resultado, pueden publicar su bloque privado desde todas estas ubicaciones diferentes de modo que la mayoría se entere del bloque N+1 antes de enterarse del bloque N+2, lo que significa que ven que el bloque N+1 lidera en peso y, de hecho, emitirán una atestación para él.

Para volver a enfatizar lo que está sucediendo aquí: tenemos un proponente con un solo atestador logrando llevar a cabo una reorganización de un bloque. No es lo ideal, por decir lo menos.

#### Estrategias de equilibrio para reorganizaciones más largas (11:42) {#balancing-strategies-for-longer-reorgs-1142}

Si quieren ser más sofisticados, pueden llevar a cabo reorganizaciones más largas utilizando una estrategia de equilibrio. La idea es dividir al comité honesto en diferentes vistas de la cadena.

Publican su bloque privado de tal manera que aproximadamente la mitad de los nodos honestos se enteren de su bloque privado y atestación antes de enterarse del bloque N+2, por lo que emiten una atestación para su bloque. Para la otra mitad, quieren que no escuchen su bloque antes de emitir una atestación para N+2.

Ahora tienen a la mitad del comité honesto emitiendo una atestación para N+1 y a la otra mitad emitiendo una atestación para N+2. ¿Cómo ayuda eso? El comité honesto ahora se anula entre sí, y ustedes como atacantes ni siquiera tienen que luchar contra ellos, lo que es básicamente el sueño hecho realidad de cualquier atacante.

Repasando el diagrama: el bloque N transcurre con normalidad, el bloque N+1 es la misma historia, no lo publican. Los validadores honestos emiten una atestación para el bloque N. Aparece el bloque N+2, se enteran temprano y publican el bloque N+1 con una atestación (el "voto decisivo") de tal manera que la mitad del comité honesto lo ve antes y la otra mitad después. La mitad emite su voto por N+1, la otra mitad por N+2. En realidad, buscan una división con una diferencia de uno, de modo que N+2 tenga una atestación más, para que N+3 se construya sobre N+2 y mantenga la reorganización en marcha.

Para llevar a su fin una reorganización de dos bloques: se propone el bloque N+3, lo escuchan temprano, publican el bloque N+1 y sus dos atestaciones restantes, inundando la capa P2P para que la mayoría de las personas honestas emitan su voto por el bloque N+1, de modo que tenga más peso que el bloque N+3 y N+4 se construya sobre N+1.

Si lo piensan, es relativamente barato hacer estas reorganizaciones bajo estas suposiciones. Incluso si no tienen divisiones perfectas, debido a que la capa P2P es tan grande, tienen una distribución de probabilidad a la que pueden apuntar de modo que el costo del ataque crezca en la raíz cuadrada del tamaño del comité.

#### Mitigación del impulso del proponente (15:17) {#proposer-boost-mitigation-1517}

Hablemos de la mitigación. ¿Cuál es la idea básica? Vamos a darle al proponente un poco más de poder. Si un bloque válido llega a tiempo, vamos a aumentar el peso de este bloque durante la duración del slot (impulso del proponente). Una vez que ese slot termina, reanudamos la puntuación habitual de LMD-GHOST y todo vuelve a la normalidad.

Así que si el bloque N+2 se propone a tiempo y es válido, este bloque tendrá un impulso, digamos del 80 % del tamaño del comité. Ahora esta pequeña y linda atestación N+1 del atacante no va a funcionar. De ninguna manera.

El tema del equilibrio tampoco funciona ya porque tienes una división 50/50 pero el impulso siempre lo inclina en una dirección. No hay forma de mantener esa división 50/50.

La idea es que con esta mitigación implementada, las atestaciones del adversario tienen que competir con el impulso para convencer a los validadores honestos de que emitan su voto según sus preferencias. Esto rompe las estrategias de equilibrio y prohíbe básicamente todas las reorganizaciones por completo. Buenas noticias: hay un PR abierto, así que básicamente se integrará antes de La Fusión.

#### Puntos clave (16:48) {#key-takeaways-1648}

Algunos puntos clave. He hablado sobre las diferencias entre las reorganizaciones ex-post y ex-ante. Esbocé brevemente los diferentes panoramas para las reorganizaciones en la prueba de trabajo frente a la prueba de participación. Les mostré cómo llevar a cabo una reorganización ex-ante, pero también, y más importante, cómo solucionarlo.

Si están interesados en esto, hay un artículo: mucho más detallado, con más matices. Las diapositivas se subirán. Vengan a hablar conmigo si les interesa, y también pueden encontrarme en Twitter.

Espero que esto les haya resultado interesante. Muchas gracias.