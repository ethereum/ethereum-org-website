---
title: "Cómo crear una l2 de guerrilla"
description: "Fatemeh Fannizadeh y Melanie Premsyl hablan sobre la construcción de redes de capa 2 (l2) como herramientas para la privacidad, la libertad y la resistencia, reimaginando la infraestructura de la cadena de bloques a través de una lente cypherpunk y activista."
lang: es
youtubeId: "WlsICV2OPAE"
uploadDate: 2025-11-23
duration: "0:15:55"
educationLevel: intermediate
topic:
  - "privacidad-y-seguridad"
  - "escalabilidad-y-capa-2"
  - "privacidad"
  - "capa-2"
format: interview
author: Web3Privacy Now
breadcrumb: "L2 de guerrilla"
---

**Fatemeh Fannizadeh** y **Melanie Premsyl** presentan en el Ethereum Cypherpunk Congress (ECC#2) en Buenos Aires sobre la construcción de redes de capa 2 (l2) como herramientas para la privacidad, la libertad y la resistencia, reimaginando la infraestructura de la cadena de bloques a través de una lente cypherpunk y activista, con una exploración detallada de la intersección entre la filosofía anarquista y la arquitectura de la cadena de bloques.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=WlsICV2OPAE) publicada por Web3Privacy Now. Ha sido ligeramente editada para facilitar su lectura.*

#### Introducción y filosofía anarquista (0:05) {#introduction-and-anarchist-philosophy-005}

**Fatemeh Fannizadeh:** [Aplausos] Bueno, gracias por estar aquí. Sé que Vitalik está hablando ahora. Es realmente un honor tener a algunos de ustedes aquí y no en la fila del matcha de allá. Hoy vamos a tener una conversación sobre las l2 de guerrilla, y creo que profundizaremos en eso, pero les presento a Melanie Premsyl, filósofa y anarquista francesa, que nos hace el honor de acompañarnos aquí. ¿Quieres hacer una pequeña introducción sobre ti?

**Melanie Premsyl:** Sí. Hola a todos. Soy una filósofa francesa. Estudio la anarquía y la tecnología, y al principio estaba más del lado del territorio. Como en el centro de Francia, por ejemplo, no sé si conocen Tarnac, o todo ese tipo de grupos que son más violentos. El principal problema que encontré fue que necesitamos estar conectados con otras personas en el mundo, y muchos grupos anarquistas son muy limitados. Necesitamos una forma de comunicarnos con más personas de América o Sudamérica. Y es por eso que ahora estamos intentando crear un puente con las cripto y con todos los que intentan encontrar nuevas formas de luchar contra la falta de privacidad, la falta de libertad y la violencia del estado.

#### El juicio de los hermanos MEV (1:52) {#the-mev-brothers-trial-152}

**Fatemeh Fannizadeh:** Increíble. Básicamente, nos conocimos hace un par de semanas en Nueva York. Ambas asistíamos a un juicio que se estaba llevando a cabo en Manhattan, donde estos dos hermanos, conocidos como los hermanos MEV, estaban siendo procesados porque hicieron un ataque sándwich a unos bots sándwich. Fui al tribunal a ver el juicio y vi a esta persona aquí leyendo a Spinoza en francés, y me dio mucha curiosidad saber qué estaba pasando. ¡No había nadie en el público excepto nosotras dos! Así que me dio mucha curiosidad saber qué te llevó, siendo ante todo una anarquista y filósofa en lugar de una tecnóloga, a asistir básicamente a este juicio en particular, pero también a pensar en la gobernanza de Ethereum y en todo el sistema de validación y el juicio que estaba ocurriendo en Nueva York. 

**Melanie Premsyl:** Creo que solo estaba intentando entender si hay alguna forma en que Estados Unidos esté intentando controlar Ethereum. Porque en Europa estamos muy fuera del juego con las cripto en el sentido de que no tenemos una legislación, y solo estaba investigando. 

**Fatemeh Fannizadeh:** Entonces, ¿crees que Estados Unidos está intentando controlar Ethereum? 

**Melanie Premsyl:** Creo que es una gran pregunta. Creo que Estados Unidos está intentando controlar a todo el mundo. 

**Fatemeh Fannizadeh:** De acuerdo. Sí, me parece justo. Para aquellos que no han seguido el juicio, después de unas tres o cuatro semanas, fue declarado nulo. El jurado no pudo llegar a un veredicto unánime y decidir si estos dos hermanos eran culpables o no de violar las reglas de la cadena de bloques, lo cual creo que es un resultado bastante positivo para las cripto, que un tribunal o un jurado no decida qué está bien y qué está mal en cadena. 

#### Creando puentes entre la cadena de bloques y otras comunidades (4:06) {#bridging-blockchain-with-other-communities-406}

**Fatemeh Fannizadeh:** Pero bueno, si damos un paso atrás sobre lo que dijiste de los anarquistas que investigan esta tecnología para, básicamente, crear un puente entre diferentes grupos. 

**Melanie Premsyl:** Sí. Creo que estoy aquí solo con un propósito. No soy una chica tecnológica, ni soy parte del juego cripto, pero lo que estaba observando desde otro punto de vista es que la cadena de bloques tiene un poder realmente disruptivo, pero no es capaz de llegar a otras comunidades que están más territorializadas. Creo que uno de los propósitos es crear una cadena de bloques colorida, como por qué queremos hablar de las l2, cómo crear nuevas comunidades con otros orígenes, con otra imaginación e imaginarios.

**Fatemeh Fannizadeh:** Quiero decir, para ser honesta, es realmente increíble para mí tenerte aquí en Devconnect, porque aportas este tipo de perspectiva fresca sobre esta comunidad, lo que estamos haciendo y nuestros eventos. Ayer pasamos mucho tiempo saltando de un evento a otro, y recibí tus comentarios, algo que ya no estoy capacitada para ver, porque hemos estado lidiando con este teatro, básicamente, durante muchos años. Todos somos amigos, así que todos somos muy amables entre nosotros. Pero esta perspectiva crítica es increíble. Creo que podemos beneficiarnos de esto, especialmente porque me emocionó mucho ver que los anarquistas o tal vez las personas más de izquierda todavía están realmente interesados en nuestra tecnología. Aunque, a pesar de las peleas que haya en el Twitter cripto, tal vez sea mejor que no estés al tanto de todo este lado de la comunidad. Pero las peleas sobre si Ethereum es una tecnología comunista, ¿te parece cierto? ¿Crees que está bien decir que Ethereum es una tecnología comunista? 

**Melanie Premsyl:** Sí, me gustaría decir eso, pero no estoy segura, porque sabes que hay mucha gente que necesita ganar dinero, así que ese también es su propósito principal. Pero creo que podríamos usarlo como una red comunista, que solo una parte podría ser ese tipo de sueño. Creo que es un pastel de ensueño que se puede hacer, pero necesitamos tener herramientas y diseños que ayuden a las personas a salir del pensamiento técnico, muy de ingeniería, para entender cómo es.

#### Descentralización y capas 2 (6:55) {#decentralization-and-layer-2s-655}

**Fatemeh Fannizadeh:** Eso me recuerda mucho a las organizaciones autónomas descentralizadas (DAO) hace unos años. No sé ustedes, pero yo estaba muy emocionada, pensaba que las DAO estaban revolucionando la forma en que nos organizamos como grupos y comunidades en cadena y la libertad que tenemos. Y al final, todo esto simplemente fracasó. No creo que se haya manifestado en absoluto. Simplemente se centró más en el sistema de votación, no es realmente democrático, se trata de obtener ganancias. Toda esta idea que teníamos de las DAO como una herramienta social realmente no se manifestó. 

**Fatemeh Fannizadeh:** Pero creo que recientemente hemos hablado mucho sobre estas herramientas que nos brinda la cadena de bloques y cómo podemos imaginar la evolución de la cadena de bloques en cinco a diez años, y se está hablando mucho de que Ethereum se vuelva privado. Creo que este es definitivamente el camino a seguir: que la l1 sea una l1 centrada en la privacidad. Y también está la hoja de ruta centrada en los rollups. Entonces, cómo las l2 y los rollups se convertirán en los principales usuarios de Ethereum en lugar de los usuarios finales. Los usuarios finales pasarán entonces, en lugar de ser parte de las DAO en la l1, a ser parte de varios rollups o l2. Entonces, ¿cómo podemos proyectar esencialmente nuestra imaginación en este tipo de futuro de Ethereum para construir lo que dijiste, este espacio de libertad anarquista subcomunista? 

**Melanie Premsyl:** Bueno, soy francesa. Este es un gran problema. Al ser franceses, somos una nación muy estatista. Así que siempre estoy pensando de una manera pedagógica y muy de arriba hacia abajo. Y creo que la l2 crea una forma en que todos pueden crear mini cadenas de bloques, y están aseguradas por la capa 1 (l1). Me gustaría ver si la gente puede crear ayuda pedagógica para todos para algo que es gratuito. Creo que muchos grupos, como las asociaciones, podrían crear su propia cadena de bloques, y será una forma... como sabes, el federalismo es el gran tema principal del anarquismo. Cómo la gente puede arreglárselas para odiarse tal vez, pero hablar entre sí. Así que necesitamos tener este tipo de federalismo en la cadena de bloques. Todos tienen una capa 2 (l2) con su propio valor, y así hablamos con la misma infraestructura. 

#### Anarquía, libertad y creación de herramientas (9:53) {#anarchy-freedom-and-building-tooling-953}

**Fatemeh Fannizadeh:** Sí, me gusta mucho lo que dijiste sobre básicamente odiarnos pero seguir comunicándonos, como no ser tóxicos a pesar de nuestras diferencias. Y el hecho de que haya como una l1 en este escenario, que sería Ethereum, también se dice a menudo que es fascista porque todos tenemos que estar de acuerdo con este único conjunto de reglas. Así que es este único sistema que es igual para todos, y básicamente tienes que someterte a esta l1 o puedes irte, esa es otra cuestión completamente distinta. Pero si podemos descentralizar esto en un ecosistema variado de pequeños rollups y l2, entonces podemos recuperar la disonancia y el desacuerdo dentro de esta infraestructura común. 

**Melanie Premsyl:** Sí, claro. Creo que son geniales. Creo que hay una gran responsabilidad para las personas del sector tecnológico que tienen una verdadera forma de pensar. Ustedes son los únicos hoy en día que están intentando hacer algo bueno, y por lo tanto no pueden estar solo en su propia imaginación. Y como dices, tal vez el problema del fascismo... como somos solo uno, tienen una gran responsabilidad. No se trata solo de usar Ethereum o solo de la privacidad, es como si estuviéramos creando el nuevo mundo tecnológico y tenemos que elegir entre si solo habrá personas del sector tecnológico, o si las personas del sector tecnológico estarán vinculadas con todos los que quieren más libertad.

**Fatemeh Fannizadeh:** Así que mencionamos mucho el comunismo y el anarquismo, y siento que son casi como malas palabras en el mundo cripto. Ya sabes, está tan manchado y recibes críticas instantáneas si mencionas este concepto. Y no sé, tal vez me equivoque, pero cuando me uní a las cripto, había más hackers y la estética anarquista estaba más presente. El ambiente era más... era genial ser así, por lo que mucha gente se identificaba con eso. Hoy en día siento que todavía hay muchos por ahí, pero tal vez más en el armario. Por ejemplo, ¿hay algún anarquista de clóset en la sala? ¡No lo sé! Creo que los hay. Así que diría que tal vez demos un paso atrás, si puedes definir realmente qué es el comunismo o el anarquismo.

**Melanie Premsyl:** Sí. No, creo que el anarquismo no es muy conocido en el sentido de que es muy simple. Es solo cuando logramos tener una autoorganización. Así que cuando hay focos de libertad, focos de anarquía, como cuando la gente simplemente habla con amigos, con una asociación, en el trabajo también, y no necesitan que alguien sea el jefe, la cabeza para entender y decidir. Porque al final, el problema humano es que la gente quiere tener un jefe. El anarquismo solo intenta luchar contra ese profundo deseo de ser controlado por el otro. ¿Realmente queremos ser libres? Esa es la pregunta, y ¿cómo podemos lograr hacerlo juntos? 

**Fatemeh Fannizadeh:** Algo que dijiste ayer también que fue muy relevante, creo, es que todos viven la anarquía en sus vidas. Algunas personas dicen: "Oh, anarquía, estamos muy lejos de eso. Solo eres reaccionario, antisistema, antiestado". Pero en realidad, todos, ya sea en su familia, en sus amistades, en alguna forma de relación, están navegando por un reino de una especie de anarquía, de falta de leyes, donde las reglas se crean a través de la dinámica interpersonal. Así que todos tienen algún nivel de anarquía en su vida, y creo que empezando por ahí, tal vez se vuelva más tangible también hablar de ello.

**Melanie Premsyl:** Sí. Sí. Es por eso que creo que la cadena de bloques es verdaderamente anarquista, en esa forma de pensar. 

**Fatemeh Fannizadeh:** De acuerdo. Increíble. Creo que esta es la frase perfecta tal vez para terminar. La cadena de bloques es anarquista. Y también para concluir con esto, creo que lo que es realmente importante o lo que realmente me encantaría ver en la cadena de bloques sería más herramientas. Porque me resulta difícil imaginar que grupos anarquistas o grupos soberanos más autónomos vengan y simplemente sean usuarios de un producto. No hay necesariamente un ajuste de mercado en ese sentido. Es muy poco probable que simplemente adopten un producto completamente terminado. Más bien, si les das la materia prima para construir el suyo propio. Así que es más como hazlo tú mismo (DIY), construye tus propias herramientas, tu propio rollup de l2, como quieras llamarlo. Creo que eso haría que las cripto estuvieran aún más alineadas con nosotros. Merci beaucoup. [Aplausos]