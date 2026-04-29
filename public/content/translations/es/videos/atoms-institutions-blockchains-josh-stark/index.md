---
title: "Átomos, instituciones, cadenas de bloques"
description: "Josh Stark propone un nuevo marco para entender qué son las cadenas de bloques, introduciendo el concepto de 'dureza' como la propiedad compartida que conecta a los átomos, las instituciones y las cadenas de bloques como materiales de construcción de la civilización."
lang: es
youtubeId: "zI07mqNdxzA"
uploadDate: 2024-04-06
duration: "0:29:13"
educationLevel: beginner
topic:
  - "cómo funciona Ethereum"
  - "cadena de bloques"
  - "ethereum"
format: presentation
author: ETHGlobal
breadcrumb: "Átomos, instituciones, cadenas de bloques"
---

Una presentación filosófica de **Josh Stark** de la Fundación Ethereum en Pragma Denver 2024, que propone un nuevo marco para entender las cadenas de bloques. La charla introduce el concepto de "dureza" (hardness) como la propiedad compartida que conecta a los átomos, las instituciones y las cadenas de bloques como los materiales de construcción de la civilización.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=zI07mqNdxzA) publicada por ETHGlobal. Ha sido ligeramente editada para facilitar su lectura.*

#### ¿Por qué no podemos explicar las cadenas de bloques? (0:00) {#why-cant-we-explain-blockchains-000}

Hola a todos, gracias por estar aquí en Pragma en Denver. Mi nombre es Josh. Trabajo en la Fundación Ethereum; he estado en la EF durante unos cinco años. Me gusta bromear diciendo que mi trabajo es descubrir cuál debería ser mi trabajo, y eso cambia cada seis meses.

He hecho muchas cosas diferentes en mi carrera en el sector cripto. Trabajé en una de las primeras billeteras de Bitcoin. Construí —bueno, compré— un cajero automático de Bitcoin en Toronto y lo administré durante aproximadamente un año en 2015. En 2017 cofundé ETHGlobal, así como una empresa llamada L4 que trabajaba en las primeras soluciones de escalabilidad de capa 2 (L2). Y a lo largo de los años he escrito un montón de publicaciones de blog.

A pesar de todo esto, todavía no podía explicar realmente qué estábamos haciendo o por qué. Tenía la sensación de que esto era muy importante, de que iba a cambiar el mundo. No me malinterpreten: puedo hablar sobre aplicaciones individuales. Podemos explicar Bitcoin, los NFT, Uniswap, ENS. Todas estas cosas en sus pequeños silos no son tan difíciles de explicar. Pero cuando intentamos hablar del panorama general —lo que significa que haya una tecnología que permita todas estas cosas— empezamos a tropezar. Hacemos gimnasia mental, lanzamos palabras de moda a la gente, intentando explicar las cosas.

Realmente necesitamos llegar al meollo del asunto, y no creo que estemos tan cerca. ¡Es un problema! Si podemos hablar de estas aplicaciones individuales pero no podemos articular lo que comparten, hay algo que nos estamos perdiendo. Hay un nivel de explicación que aún no se ha encontrado, y creo que es importante. Mi sensación es que una vez que lo encontremos, parecerá obvio.

Así que esto comenzó como una pregunta muy específica que tenía: ¿cuál es la tecnología de propósito general? ¿Cuál es esta capacidad fundamental? Y se convirtió en algo que me parece mucho más interesante.

#### Claude Shannon y la idea de la información (4:00) {#claude-shannon-and-the-idea-of-information-400}

Déjenme contarles una historia. En las décadas de 1930 y 1940, Claude Shannon estaba rodeado por los inicios de una nueva era. En los Laboratorios Bell, trabajó en sistemas de control de tiro y criptografía durante la guerra, y comenzó a pensar en un enfoque más general de la información. Al principio no lo llamó información; en 1939 le escribió a un colega que estaba pensando en la "transmisión de inteligencia". La palabra información tenía un significado diferente en ese entonces.

En 1948 publicó "La teoría matemática de la comunicación", un artículo fundamental que allanó el camino para la era de la información. Lo más importante para nosotros es que introdujo por primera vez una idea abstracta de la información: una definición no ligada a la música, el habla, la literatura o los códigos. Este es el artículo que introdujo el bit: la unidad irreductible de información que se podía medir en cualquier contexto.

Antes de este momento, nadie tenía realmente este concepto de la información como algo universal y general. Eso podría parecer una locura ahora: hemos estado usando tecnología de la información durante miles de años. Está inextricablemente ligada a lo que significa ser humano, al uso del habla y el lenguaje. Pero no nombramos la propiedad subyacente común a todas estas cosas hasta hace muy poco.

Lo que quiero que saquen de esto: hubo un tiempo antes de que tuviéramos la idea de la información y un tiempo después. ¿Qué pasaría si de manera similar nos estuviéramos perdiendo algo tan fundamental? Esa es mi hipótesis.

#### Tres pistas (7:00) {#three-clues-700}

Mientras lucho por explicar las cadenas de bloques, sigo encontrándome con estas cosas raras que creo que son pistas hacia algo más grande.

**Pista número uno**: describimos las cadenas de bloques como algo sin necesidad de confianza y, al mismo tiempo, digno de confianza. Eso es extraño. En el libro blanco de Satoshi hablamos de eliminar la necesidad de confianza. Pero en el libro blanco de Ethereum hablamos de usar Ethereum para hacer que las aplicaciones sean más confiables. The Economist llamó a las cadenas de bloques una "máquina de confianza". Queremos decir algo real cuando decimos que las cadenas de bloques funcionan sin necesidad de confianza, y queremos decir algo real cuando decimos que son confiables. Nuestro lenguaje no se ha puesto al día. Siempre vale la pena prestar atención a estas aparentes contradicciones: a veces revelan una brecha en nuestras abstracciones.

**Pista número dos**: hablamos mucho sobre cómo las cadenas de bloques son diferentes de las instituciones centralizadas (Bitcoin frente a los bancos centrales, ENS frente a DNS). Pero rara vez hablamos de lo que tienen en común. Pueden ser sustitutos entre sí. Si alguna vez has cambiado dinero fiduciario por Bitcoin, los has sustituido el uno por el otro. Deben tener algo en común para que esa sustitución se produzca con tanta regularidad.

Con los coches, hablábamos de "carruajes sin caballos", pero al menos podíamos nombrar lo que eran: vehículos. Con los registros digitales, hablábamos de medios "sin papel", pero conocíamos la categoría: información. Parece que hemos inventado una tecnología antes de haber inventado la categoría a la que pertenece.

**Pista número tres**: el artículo de Satoshi comienza con estas palabras: "el comercio en Internet ha llegado a depender casi exclusivamente de instituciones financieras que sirven como terceros de confianza". Satoshi estaba comparando Bitcoin con instituciones, no con otro software. Hay algo ahí.

#### Introduciendo la dureza (11:00) {#introducing-hardness-1100}

Aquí está mi respuesta a lo que va en esa caja. Lo llamo **dureza**. Aquí está la historia en cinco sencillos pasos, y luego profundizaremos más.

Primero: nuestra civilización depende de infraestructura social como el dinero y la ley y muchas otras cosas, y necesitan ser confiables. Necesitan comportarse como esperamos que se comporten, al menos la mayor parte del tiempo, para que nos sean útiles. De lo contrario, no dependeríamos de ellos; no se convertirían en dinero.

Segundo: es muy difícil lograr ese nivel necesario de confiabilidad. Hasta ahora, en realidad solo hay tres formas en las que lo hemos hecho: usando átomos, usando instituciones y, ahora, usando cadenas de bloques.

Tercero: hay una propiedad no reconocida común a los tres, que llamo dureza. La dureza es la capacidad, el poder, de permitirnos hacer que el futuro sea más predecible en las formas realmente específicas que requerimos para juegos de coordinación complejos.

Cuarto: que estas tres fuentes de dureza tienen cada una propiedades diferentes que las hacen útiles en diferentes contextos.

Y quinto: podemos usarlas juntas y sustituirlas entre sí.

La tasa de inflación del oro es confiable debido a las propiedades físicas de nuestro planeta: tiene dureza atómica. Un contrato es confiable porque las instituciones vendrán y se llevarán tus cosas si no cumples con tus compromisos. Un contrato inteligente funcionará porque está asegurado por un protocolo criptoeconómico con miles de millones de dólares en juego.

Puedes pensar en los átomos, las instituciones y las cadenas de bloques como materiales de construcción, como la madera, el hormigón y el acero. Son diferentes, pero forman parte de una categoría compartida. Y usamos estas cosas no para construir edificios, sino para construir una civilización. Tal vez con mejores materiales, podamos construir una civilización más grande, mejor y más fuerte que la que tenemos ahora.

#### ¿Qué es la dureza? (14:00) {#what-is-hardness-1400}

Permítanme dar más precisión a lo que quiero decir con dureza. Esta no es cualquier confiabilidad que cualquier cosa pueda tener. La dureza es un tipo específico. Lo primero que hay que notar es que es un tipo de confiabilidad que importa para la coordinación social. No solo, ya sabes, que esta mesa es confiablemente una mesa, sino que puedes pagar tu alquiler, que se hará cumplir un contrato, que una economía es fuerte. Para eso sirve la dureza.

¿Y cuál es exactamente el resultado? Lamentablemente, estoy introduciendo otra palabra nueva aquí, a la que llamo el **molde** (cast). Un molde es cualquier posible estado futuro del mundo que se hace seguro o certero utilizando la dureza. Pido disculpas por la jerga, pero la razón para tener una palabra aquí es que no creo que tengamos una que sea generalizable en todas las fuentes de dureza. Tal vez sea como el bit: necesitamos un concepto del que podamos hablar en muchos contextos diferentes y cambiar entre fuentes sin estar atados a una de ellas.

Un molde relacionado con un préstamo sería: si Alice no le paga a Bob, entonces las instituciones legales utilizarán amenazas y acciones cada vez más severas para obligarla a hacerlo. Este molde se endurece utilizando la dureza institucional. Un molde sobre el oro podría ser que una cierta cantidad de oro entrará al mercado cada año durante los próximos 20 años, hecho confiable por las propiedades físicas de nuestra Tierra. Y un molde sobre Ethereum podría ser un reclamo de que los activos solo se pueden transferir si posees la clave privada correspondiente a una cierta clave pública, endurecido por la dureza de la cadena de bloques.

En la práctica, generalmente interactuamos con paquetes de estas cosas, todas entrelazadas. Si posees oro y lo guardas en un banco, te importan muchas cosas: moldes sobre el suministro de oro en el futuro, moldes sobre la resistencia de la bóveda del banco, moldes sobre la solidez del acuerdo legal entre tú y tu banco, moldes sobre la confiabilidad del sistema legal de tu país que haría cumplir esas reglas si algo saliera mal.

En segundo lugar, se puede hablar de la dureza como una medida de seguridad. Siempre es medible en teoría, incluso si es difícil de hacer en la práctica. ¿Qué tan duro es este molde de que una cierta cantidad de oro entrará al mercado cada año durante los próximos 20 años? Una forma de verlo es a través de la probabilidad: mirar todos los datos e intentar predecir la probabilidad. O podrías verlo desde la perspectiva del costo: ¿cuánto le costaría a alguien romper ese molde? Si eres un estado nación, podrías usar los poderes de la guerra y la regulación internacional. O podrías ir por el otro camino y conseguir un asteroide del espacio con mucho oro, eludiendo las limitaciones físicas de la Tierra. Hay un precio para romper casi cualquier molde.

Y por último, la dureza proviene de ciertas fuentes: átomos, instituciones y cadenas de bloques. Cada una tiene propiedades diferentes que las hacen útiles en diferentes contextos.

Lo que me gusta de este marco es que nos permite hacer preguntas más profundas: no solo hablar sobre propiedades específicas de las cadenas de bloques, sino comparar todas estas cosas diferentes y pensar en dónde son apropiadas, cómo las usamos y en qué combinación.

#### Dureza atómica (19:00) {#atom-hardness-1900}

La dureza atómica se trata de cuando encontramos confiabilidad en la naturaleza que nos rodea: átomos físicos literales, pero también otras propiedades que ocurren naturalmente. Hacemos esto cuando usamos cuentas de oro como dinero, cuando usamos estructuras físicas para definir derechos de propiedad, o registramos derechos de propiedad en un objeto físico como una escritura.

Tiene muchas ventajas: cumplimiento automático, estado compartido, un conjunto de reglas universal. Es muy conveniente para la civilización humana que las reglas de la física se apliquen en todas partes por igual, al menos a las escalas macroscópicas que más nos importan.

Pero tiene debilidades. Estamos limitados a lo que podemos encontrar en el mundo. La dureza atómica es como un arquitecto que quiere construir una pared de roca en su casa: tienes que encontrar una que funcione. No puedes simplemente hacer una pared de roca. Puedes cambiarla un poco, pero dependes de encontrar una característica natural que se adapte a tu necesidad particular.

No podemos darle nuevas reglas. Tenemos oro, pero no podemos pedirle al universo que nos dé un nuevo tipo de oro con menor inflación, una distribución geográfica más justa, o tal vez solucionar el problema del peso. No podemos hacer esto. Y tiene una programabilidad muy limitada: solo hay ciertos tipos de cosas endurecidas que puedes hacer con la dureza atómica, principalmente dineros. No puedes hacer un acuerdo matrimonial con átomos. Necesitas algo más complejo, como una institución, para hacer eso.

Y los moldes a menudo se ven socavados por nuestro creciente control humano sobre la naturaleza. Usar conchas como dinero está bien hasta que formas parte de una economía global que podría alterar radicalmente tus expectativas sobre la inflación de las conchas, y de repente tu economía es aniquilada. Usar oro como medio de intercambio podría enfrentar el mismo problema algún día siempre y cuando podamos obtener oro de asteroides y cambiar nuestras suposiciones sobre el suministro.

Pero es más sutil que eso. A veces tenemos moldes que ni siquiera nos damos cuenta de que existen, pero luego desaparecen porque algo cambió. Hubo un molde duro sobre la velocidad de las operaciones en los mercados financieros durante mucho tiempo: solo se podía hacer a un cierto ritmo, tal vez el ritmo al que alguien puede gritarse en el parqué. Este molde tenía dureza atómica: simplemente no podíamos comunicarnos más rápido que eso. Pero la nueva tecnología socavó por completo esas suposiciones. Nos dimos cuenta de que en realidad nos gustaba una versión de ese viejo molde y lo rehicimos a partir de instituciones: introduciendo regulaciones que limitan la velocidad de las operaciones y aplican interruptores de circuito.

#### Dureza institucional (22:00) {#institutional-hardness-2200}

La dureza institucional es una categoría muy amplia: cubre la mayoría de las cosas en las que podríamos pensar cuando pensamos en la civilización. Nuestros sistemas legales, legislaturas, fuerzas policiales, corporaciones, todo. Todas las instituciones que proporcionan dureza de algún tipo. Creamos moldes que dieron orden a nuestras sociedades, castigando el comportamiento antisocial. Creamos la dureza como plataforma, permitiendo que cualquiera cree sus propios moldes endurecidos por las instituciones si sigues ciertas reglas. Creamos moldes que generaron nuevos activos y proporcionaron fuentes de crédito a las economías en crecimiento.

La dureza institucional tiene muchas ventajas. Es muy programable: los seres humanos agrupados en organizaciones pueden recibir instrucciones realmente complejas o sutiles. Este es un espacio de diseño muy grande de posibles moldes. Y están hechas de personas, y las personas son buenas. Tal vez sea bueno que a veces alguien pueda intervenir y decir: "No voy a hacer cumplir eso porque creo que está mal". Es bueno que tal vez a veces haya una ruptura en el sistema para que alguien sea un denunciante o un rebelde.

Pero también tiene muchas debilidades. Está limitada por las fronteras: solo en ciertos países tienes realmente acceso a instituciones que hacen cumplir el estado de derecho. Está expuesta al fracaso político o estatal: si tu gobierno simplemente no puede ponerse de acuerdo en las cosas, o eres invadido por una nación beligerante, ciertas instituciones de las que dependes para el dinero o los contratos podrían simplemente desmoronarse. A menudo son opacas: es difícil saber si una institución es realmente dura o no hasta que algo sale mal. Tienen un alto costo inicial: no podemos crear fácilmente nuevas instituciones a la escala de la Reserva Federal o el sistema legal para iterar sobre ellas. Estamos un poco atrapados con las que tenemos.

Y están hechas de personas, y las personas son malas. La realidad en este país y en muchos otros es que muchas personas no han tenido realmente acceso a la dureza proporcionada por las instituciones. No pudieron obtener una hipoteca. No pudieron abrir una cuenta bancaria. Porque cuando llenas una institución de personas, está sujeta a sus maldades, sus prejuicios, sus ideologías. Y nuestra dependencia de la dureza institucional no hace más que aumentar. El problema de que el software se esté comiendo el mundo es que la mayor parte del software en realidad solo está hecho de una institución detrás de la pantalla, y como resultado les estamos dando cada vez más poder.

#### Dureza de la cadena de bloques (24:20) {#blockchain-hardness-2420}

La invención de Satoshi fue, por supuesto, más que solo Bitcoin: fue el núcleo de una técnica de propósito general para crear dureza digital en un entorno digital. Tiene muchas fortalezas: acceso global universal, está hecha de software y cualquiera puede escribir software, el grado de dureza puede ser transparente y auditable, bajo costo inicial, fácil de iterar y asegurada por incentivos de mercado (y los mercados son racionales).

Pero también tiene debilidades. Requiere una civilización tecnológica: no podríamos haber tenido cadenas de bloques antes de ahora debido a los requisitos, y una civilización en el futuro que no tenga lo que tenemos tampoco podrá usarlas. Está hecha de software, y el software puede estar mal escrito. El alcance de los moldes se limita a entornos en cadena. Y está asegurada por incentivos de mercado (y los mercados son irracionales).

#### Por qué esto importa (25:10) {#why-this-matters-2510}

Entonces, ¿qué significa esto? ¿Qué nos aporta? ¿Por qué es esto más que un simple interés académico?

Muchas cosas empiezan a tener mucho más sentido cuando se ven a través de esta lente. Una es la pregunta con la que empezamos: ¿por qué decimos que las cadenas de bloques funcionan sin necesidad de confianza y, al mismo tiempo, son dignas de confianza? La explicación es esta: cuando decimos que las cadenas de bloques funcionan sin necesidad de confianza, lo que realmente queremos decir es que su dureza no depende de una persona o institución. Y cuando decimos que son confiables, simplemente queremos decir que sí tienen dureza, solo que de un tipo diferente. Nuestra incapacidad para hacer esa distinción es lo que causa este lenguaje confuso.

Explica por qué las cadenas de bloques privadas o centralizadas no son interesantes. Una cadena de bloques que no es descentralizada simplemente colapsa y vuelve a ser una institución. Si está controlada por tres bancos o un puñado de validadores financiados todos por la misma organización, entonces es solo una EVM asegurada por la dureza institucional. Lo más interesante de las cadenas de bloques no es la EVM: es que hay una fuente diferente de dureza que no está correlacionada ni sujeta a las mismas fallas y limitaciones que las instituciones. Por eso es diferente. Por eso importa.

También ayuda a entender el espectro de posibilidades y las ideologías predeterminadas en las que cae la gente en el espacio de las cadenas de bloques. Muchas personas están muy enfocadas en usar la dureza de la cadena de bloques para competir con o reemplazar la dureza institucional: de esto se trata gran parte de la comunidad de Bitcoin, de esto se tratan gran parte de las finanzas descentralizadas (DeFi). Incluso ENS está intentando reemplazar o competir con DNS de alguna manera. Pero luego también hay personas que ven que la dureza de la cadena de bloques puede hacer cosas que la dureza institucional no puede: ideas que nadie ha intentado antes porque nunca tuvimos esta capacidad, este cierto sabor de dureza. Y ahora podemos explorar esas cosas. Tal vez los NFT estén ahí, o juegos como Dark Forest, o el movimiento en torno a los mundos autónomos.

#### Elevando nuestras ambiciones (27:00) {#raising-our-ambitions-2700}

Lo más importante es que creo que este marco eleva nuestras ambiciones. Personalmente, esto es lo que me importa, y tal vez resuene contigo: no estoy aquí solo por estas aplicaciones individuales. No soy alguien a quien solo le importe realmente Bitcoin o solo DeFi o solo los NFT. Tal vez ese también seas tú. Hay algo más grande sucediendo aquí.

Honestamente, podemos fijar nuestra mirada más alto que el dinero. Podemos fijar nuestra mirada más alto que las finanzas. Hay un panorama mucho más amplio. Creo que esto realmente ayuda a definir una visión que se siente adecuada en escala a los desafíos que enfrentamos y a las oportunidades que ofrecen las cadenas de bloques.

La misión no es solo reemplazar a la Reserva Federal. La misión es mejorar y expandir los mismos materiales que hemos usado para construir nuestra civilización: reducir el costo de estas herramientas para que todos en la Tierra tengan acceso a ellas, para permitir que ocurran más cambios. Y por cierto, ese costo será más bajo pronto.

Ayudar a la humanidad a seguir jugando a este juego infinito permitiendo que más personas cambien las reglas. Muy pocas personas pueden promulgar una ley, pero cualquiera puede escribir un contrato inteligente. Estamos expandiendo esa capacidad.

Creo que muchas personas en muchos países diferentes y de muchas ideologías sienten que estamos atascados: que las reglas del juego ya no son lo que deberían ser, pero somos impotentes para cambiarlas. Estamos atascados de muchas maneras en este máximo local, e intuimos que eso está mal. Las cadenas de bloques no solucionan eso, pero creo que pueden ayudar. Abren un nuevo espacio para la experimentación. Permiten que más personas cambien las reglas, escriban nuevas reglas, contribuyan a ese juego infinito. No podemos escribir leyes, pero podemos escribir un contrato inteligente.

Quiero terminar con esta nota: si han visto charlas de personas de la EF antes, saben que somos aficionados al libro *Juegos finitos e infinitos*. Una de las máximas de este libro es que solo lo que puede cambiar puede continuar. No podemos quedarnos atascados en este máximo local. Tenemos que cambiar las cosas. Y creo que las cadenas de bloques nos ayudan a hacerlo. Muchas gracias.