---
title: "Pruebas de conocimiento cero explicadas en 5 niveles de dificultad"
description: "Un científico informático explica las pruebas de conocimiento cero en cinco niveles diferentes de complejidad, desde un niño hasta un experto."
lang: es
youtubeId: "fOGdb1CTu5c"
uploadDate: 2021-12-13
duration: "0:18:19"
educationLevel: beginner
topic:
  - "privacidad-y-seguridad"
  - "pruebas-de-conocimiento-cero"
  - "criptografia"
format: explainer
author: WIRED
breadcrumb: "Pruebas de conocimiento cero"
---

El científico informático **Amit Sahai**, profesor de la Escuela de Ingeniería Samueli de la UCLA, explica las pruebas de conocimiento cero en cinco niveles de complejidad, desde un niño hasta un experto, en esta producción de **WIRED**. El concepto se demuestra a través de analogías físicas y se discute con una profundidad técnica cada vez mayor, haciendo que uno de los conceptos más importantes de la criptografía sea accesible para todos.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=fOGdb1CTu5c) publicada por WIRED. Ha sido ligeramente editada para facilitar su lectura.*

#### Introducción (0:00) {#introduction-000}

**Amit Sahai:** Hola, mi nombre es Amit Sahai y soy profesor de ciencias de la computación en la Escuela de Ingeniería Samueli de la UCLA. Hoy me han pedido que explique las pruebas de conocimiento cero en cinco niveles de complejidad creciente.

Una prueba de conocimiento cero es una forma en que un probador convence a un verificador de que una afirmación es verdadera, y sin embargo no revela ninguna información adicional más allá del hecho de que la afirmación es verdadera. Las pruebas de conocimiento cero se están utilizando en cadenas de bloques y criptomonedas. Los criptógrafos están entusiasmados con el conocimiento cero debido a sus asombrosas propiedades matemáticas, pero también por su increíble aplicabilidad a tantos escenarios diferentes.

#### Nivel 1: niño (0:41) {#level-1-child-041}

**Amit Sahai:** ¿Cuál es tu materia favorita?

**Chelsea:** Diría que las matemáticas. Algunos de los problemas pequeños pueden ser en realidad muy grandes y complicados. Es como un rompecabezas.

**Amit Sahai:** Me encantan las matemáticas por la misma razón. Hoy te voy a hablar de una cosa llamada prueba de conocimiento cero. En una prueba de conocimiento cero, hay dos personas: hay un probador y un verificador. Quiero probarte que algo es verdad, pero lo raro es que quiero probarte que es verdad sin decirte ninguna razón de por qué. Recuerdo que cuando escuché hablar de ello por primera vez, pensé: espera, ¿qué? ¿Cómo puede ser eso posible?

Entonces, ¿qué ves en esta foto?

**Chelsea:** Muchos pingüinos.

**Amit Sahai:** Sí. Escondido entre todos estos pingüinos hay un frailecillo. ¿Quieres intentar buscarlo? ¿Ves dónde está? Yo sé dónde está, pero no quiero decírtelo. ¿Me crees?

**Chelsea:** Sí.

**Amit Sahai:** Pero, ¿y si pudiera probarte que sé dónde está el frailecillo sin revelarte dónde está? Déjame mostrarte. Tomé esa foto y la puse detrás de este póster aquí. ¿Por qué no echas un vistazo a través de ese agujero?

**Chelsea:** Veo el frailecillo.

**Amit Sahai:** Así que cuando miras este tablero, no sabemos dónde estaba la foto, ¿verdad? ¿Estaba la foto con la esquina aquí, en cuyo caso el frailecillo estaría completamente de este lado? ¿O estaba la foto con la esquina aquí, en cuyo caso el frailecillo estaría del otro lado? Así que este es un ejemplo muy simple de una prueba de conocimiento cero. Te convencí de que sabía dónde estaba el frailecillo, pero no aprendiste nada más.

**Chelsea:** ¿Por qué estudias la prueba de conocimiento cero?

**Amit Sahai:** Cuando aprendí sobre ellas por primera vez, simplemente pensé que eran geniales. Pero resulta que también son muy útiles, no solo para encontrar frailecillos. Si simplemente escribes tu contraseña y el hacker piratea la computadora, puede obtener tu contraseña. ¿Qué pasaría si, en cambio, pudiéramos usar de alguna manera una prueba de conocimiento cero para iniciar sesión? Simplemente podrías probar que eres Chelsea, sin revelarles nada. Si pudieras hacer eso, entonces sería increíble, porque incluso si el hacker pirateara la computadora, no aprendería nada, porque ni siquiera la computadora aprende nada.

Entonces Chelsea, en tus propias palabras, ¿qué es una prueba de conocimiento cero?

**Chelsea:** La prueba de conocimiento cero es la prueba de una afirmación. No les muestras el porqué ni el qué. Solo les muestras un pequeño segmento, o simplemente haces una especie de truco de magia raro que en realidad no es un truco de magia, y se convencerán. Y no les mostraste por qué, ni nada por el estilo.

#### Nivel 2: adolescente (3:31) {#level-2-teen-331}

**Amit Sahai:** Entonces, ¿alguna vez has escuchado el término prueba de conocimiento cero antes?

**Adolescente:** No, no lo he hecho.

**Amit Sahai:** Es una forma en que un probador convence a un verificador de que algo es verdad sin revelar nada sobre por qué es verdad, lo cual suena totalmente extraño. Lo que quiero hacer es probarte que conozco esta combinación sin revelarte la combinación. Y lo que podrías hacer es escribir una pequeña nota, un secreto que definitivamente yo no sabría. Dóblala, métela aquí. Y luego, si conozco la combinación, debería poder abrirla y decirte lo que escribiste.

Muy bien. "Mi perro se llama Doug".

**Adolescente:** ¿Averiguaste cuál era la combinación?

**Amit Sahai:** No. Así que en ninguna parte de esta interacción viste información que no supieras ya. Y sin embargo, te convencí de que conozco la combinación.

**Adolescente:** Entonces, ¿cuál es el propósito exacto de una prueba de conocimiento cero? ¿Es como probar algo pero sin dar suficiente información que pueda poner en peligro lo que sea que estés probando?

**Amit Sahai:** Las personas no confían entre sí. Y si yo pudiera probarle a alguien que he hecho algo correctamente sin tener que revelar mis secretos, entonces esa persona confiaría más en mí.

**Adolescente:** ¿Cómo se relaciona esto con la tecnología informática? ¿Es una interacción en persona?

**Amit Sahai:** Supongamos que quisieras intercambiar mensajes con alguien que conoces. Probablemente primero se reunirían y descubrirían algún código secreto, ¿verdad? Y luego se escribirían mensajes en ese código. Pero, ¿y si nunca antes has conocido a la persona? ¿Qué pasa si quieres intercambiar mensajes secretos conmigo y nunca nos hemos conocido antes? ¿Cómo podríamos hacer eso?

**Adolescente:** No tengo idea.

**Amit Sahai:** Suena imposible, ¿verdad? Pero no lo es. No usarías un candado físico o una caja física. En su lugar, usaríamos las matemáticas para hacer este tipo de cosas. Podrías tomar un mensaje y cifrarlo usando matemáticas. Y luego yo podría probarte que conozco la clave, abrirlo y enviártelo de vuelta. De esa manera te estaría probando que conozco la clave matemática de la caja de seguridad matemática.

Entonces, basándonos en lo que hemos discutido hoy, en tus propias palabras, ¿qué es una prueba de conocimiento cero?

**Adolescente:** Es como si tuvieras este secreto realmente importante que quieres que alguien sepa, pero no quieres contarle todo. Puedes usar una prueba de conocimiento cero para probarles ese secreto, pero sin revelarlo todo.

#### Nivel 3: estudiante universitario (6:13) {#level-3-college-student-613}

**Amit Sahai:** ¿Qué estás estudiando?

**Estudiante universitario:** Soy estudiante de primer año de ciencias de la computación en USC Viterbi. Me interesan todas las cosas como datos, internet, cadena de bloques y criptomonedas.

**Amit Sahai:** ¿Alguna vez has oído hablar de las pruebas de conocimiento cero?

**Estudiante universitario:** Solo de pasada.

**Amit Sahai:** En realidad, el espacio de la cadena de bloques es uno de los espacios donde estamos viendo que se implementan las pruebas de conocimiento cero, y creo que es solo el comienzo. En su núcleo, una prueba de conocimiento cero es una interacción entre dos personas. Debería poder convencerte de que alguna afirmación es verdadera, pero no tendrás idea de por qué es verdadera.

La forma en que vamos a abordar esto es a través de algo llamado completitud NP. Un problema NP-completo es un problema que es realmente difícil de resolver. Pero si puedes resolverlo, puedes resolver cualquier problema que esté en la clase NP, y eso incluye una gran cantidad de problemas. Vamos a usar un problema NP-completo para probar realmente una increíble variedad de afirmaciones a través de una prueba de conocimiento cero. El problema NP-completo específico que vamos a ver se llama coloración de mapas con tres colores.

Aquí tenemos un mapa con un montón de países, organizados de manera que ningún país que tenga el mismo color comparta una frontera. Eso es lo que hace que un mapa como este esté coloreado de manera válida. Resulta que si un mapa puede o no ser coloreado con tres colores de esta manera es un ejemplo de un problema NP-completo.

Tal vez lo que realmente quieres hacer es dar una prueba de conocimiento cero de que tienes al menos 0.3 Bitcoin, sin revelar la dirección de tu cuenta. Resulta que puedo tomar esa afirmación y convertirla en un mapa de países. Ese mapa de países podrá colorearse con tres colores solo si tienes al menos 0.2 Bitcoin.

**Estudiante universitario:** ¿Cómo convertiríamos algo como esto en una prueba de conocimiento cero?

**Amit Sahai:** Por supuesto, el primer paso es que tenemos que borrar todos los colores. He puesto un color dentro de cada uno de estos sobres. Ahora, ¿cómo sabes que es una coloración válida? No lo sabes. Tienes que elegir dos países vecinos cualesquiera; puedes elegirlos como quieras, al azar.

**Estudiante universitario:** ¿Puedo tomar estos dos?

**Amit Sahai:** Aquí tenemos verde, y por aquí tenemos azul. Como puedes ver, son dos colores diferentes. Así que tienes un poco de confianza en que he logrado colorear esto correctamente, pero no tanta confianza, porque solo te he mostrado dos de los países. Una forma de obtener más confianza es abrir más de ellos, pero eso sería revelarte información. No quiero hacer eso.

Así que, en cambio, te voy a pedir que por favor te des la vuelta. Y ahora, cambiemos estos colores.

¿Puedes elegir dos países al azar, y revelaremos dos de los colores nuevamente?

**Estudiante universitario:** Tomaré este y este.

**Amit Sahai:** Es inteligente de tu parte comprobar con el mismo que ya tenías. Pero como verás, ahora no es verde, es azul. Y este, por otro lado, es verde. Los colores que te mostré la última vez no funcionan con estos nuevos colores. Pero funciona para esta coloración que te estoy mostrando ahora mismo. Así que lo que hemos hecho es hacer que sea imposible para ti juntar las piezas. Y si haces esto mil veces, y te muestro correctamente colores diferentes cada vez, estarías realmente convencido. Y eso es todo, esa es toda la prueba de conocimiento cero.

**Estudiante universitario:** Entonces, ¿es como una prueba probabilística?

**Amit Sahai:** Sí. En las implementaciones reales no usaríamos sobres, usarías cifrado. Pero este es el protocolo.

**Estudiante universitario:** Entonces, ¿cuáles son las implicaciones más amplias de las pruebas de conocimiento cero? ¿Se supone que son más prácticas para la implementación, o se supone que prueban algo estructuralmente?

**Amit Sahai:** No se trata de hacer algo más eficiente. Se trata de hacer cosas que simplemente no sabíamos cómo hacer antes. De hecho, puedo probarte, sin revelar ninguno de mis secretos, que me estoy comportando honestamente. Podría probarte que firmé algún documento cifrado correctamente sin revelar cuál era ese documento secreto. Esa capacidad de cambiar las reglas del juego, de cambiar realmente lo que podemos hacer, es lo que el conocimiento cero aporta.

**Estudiante universitario:** ¿Dónde crees que podríamos construir más confianza usando pruebas de conocimiento cero?

**Amit Sahai:** Un gran ejemplo son las elecciones. Si pudieras probar que una elección se llevó a cabo correctamente (que cada voto fue contado y todo sumó para que una persona ganara con un total particular) en conocimiento cero, entonces no tienes que revelar los votos reales de ninguna persona. Y, sin embargo, todos podrían ver que se hizo correctamente.

#### Nivel 4: estudiante de posgrado (11:59) {#level-4-grad-student-1159}

**Amit Sahai:** Es genial tenerte aquí y hablar contigo, Eli. ¿Puedes contarme un poco sobre tu investigación?

**Eli:** Mi investigación es en criptografía. Específicamente, estoy trabajando en algunos protocolos de computación multiparte. En el que estoy trabajando ahora mismo es un sistema para calcular estadísticas agregadas, de modo que los proveedores de servicios como Google Chrome o Tesla puedan recopilar esas estadísticas sin aprender nada sobre los datos de los usuarios individuales. Yo, como usuario, no tengo que hacerle saber a Firefox que mi sitio web favorito es mylittlepony.com. Pero pueden saber cuántos usuarios visitan mylittlepony.com todos los días.

**Amit Sahai:** Eso es increíble. La computación multiparte es algo muy cercano y querido para mí. Obviamente, las pruebas de conocimiento cero se tratan de probar cosas a otra persona sin revelar los detalles de lo que estás probando. Pero en mi mente, el conocimiento cero en realidad va incluso más allá de eso. Es este concepto general que puedes ver mucho en la computación multiparte, donde quieres lograr alguna tarea sin revelar nada más que exactamente lo que necesitas para lograr esa tarea.

**Eli:** Correcto, y te permite probar que te has estado comportando honestamente, sin revelar ninguno de los secretos involucrados que usas para comportarte honestamente en realidad. Sabemos que las pruebas de conocimiento cero para lenguajes NP-completos juegan un papel muy importante en la criptografía. ¿Cómo fue tu primera experiencia con la completitud NP?

**Amit Sahai:** Mi primer encuentro fue en mi primera clase de algoritmos como estudiante universitario. Un lenguaje NP-completo es este problema asombroso que no solo te habla de sí mismo, sino que resolver este problema en realidad puede hablarte de toda una clase de problemas realmente interesantes.

**Eli:** Cuando empiezas a pensar en las pruebas como un juego interactivo en el que estamos hablando entre nosotros, ¿eso hizo posible el conocimiento cero?

**Amit Sahai:** Absolutamente. Y la idea de que la aleatoriedad podría ser útil para probar algo, de nuevo, parece tan contraintuitiva si pensamos en el ideal platónico de una prueba. No hay aleatoriedad, no hay no determinismo presente allí.

**Eli:** Tiene que ver con toda esta idea de darle la vuelta a una prueba. En una antigua prueba clásica, la aleatoriedad va específicamente en contra del objetivo de lo que estás tratando de hacer, porque estás tratando de hacer que todo sea obvio y revelar el flujo de información. Pero una vez que le das la vuelta a eso y ya no estás tratando de hacer eso, de repente todas las malas propiedades de la aleatoriedad se vuelven buenas.

**Amit Sahai:** Exactamente. Lo aleatorio es impredecible, y eso es lo que queremos. Queremos que esa imprevisibilidad realmente oculte la información que queremos ocultar. ¿Cómo has usado el conocimiento cero en los proyectos en los que has trabajado? ¿Cuáles son los desafíos que encuentras?

**Eli:** Por lo general, la parte más difícil es averiguar exactamente cuál es el mejor lugar para usarlo. He escrito algunos artículos que han usado el conocimiento cero de una manera más teórica, pero cuando se trata de aplicaciones, algunas de las aplicaciones más emocionantes que he visto hasta ahora han sido en el espacio de la cadena de bloques.

**Amit Sahai:** ¿Cuáles son algunos de los cuellos de botella de eficiencia?

**Eli:** Una de las cosas más geniales de las pruebas de conocimiento cero es que hay muchos tipos; me gusta llamarlos sabores. En general, cuando usas pruebas de conocimiento cero en una aplicación, el cuello de botella principal tiende a recaer en el probador.

**Amit Sahai:** ¿Puedes tomar el trabajo del probador y dividirlo en muchos cálculos paralelos?

**Eli:** Esa es una pregunta muy divertida. Creo que todavía no sabemos la respuesta a eso como campo. Una de las cosas más geniales que he visto en los últimos tres o cuatro años es la transición de lo teórico a lo aplicado: ver cómo todos estos sistemas asombrosos en los que la gente ha pensado en los últimos 30 años comienzan a ser lo suficientemente eficientes como para ser creados.

**Amit Sahai:** Sin duda. Y especialmente con la computación en la nube: explotar el poder de la nube para habilitar pruebas de conocimiento cero sería increíble. También en el espacio de la cadena de bloques, si quieres acelerar la generación de pruebas, si eso pudiera hacerse de manera distribuida, sería genial. Una de las esperanzas que tengo es que el poder de la computación multiparte se trata de unir a personas que desconfían mutuamente. ¿Podemos tomar ese poder en la criptografía y usarlo para ayudar con el tremendo nivel de desconfianza que existe en la sociedad en este momento?

**Eli:** Creo que esa es una de las razones por las que me atrajo tanto la computación multiparte. Uno de los problemas más importantes del mundo es el hecho de que muchas personas no confían entre sí. Poder usar las matemáticas para crear tecnología que permita a las personas trabajar juntas sin tener que confiar entre sí es una misión realmente genial y asombrosa.

#### Nivel 5: experto (17:10) {#level-5-expert-1710}

**Amit Sahai:** Shang-Hua, es genial verte de nuevo. Creo que la última vez que nos vimos fue en 2017 o algo así.

**Shang-Hua:** Creo que hicimos un Zoom una vez durante la pandemia, pero es bueno verte en persona. En realidad, en el 86 estaba tomando una clase de cripto con el profesor Leonard Adleman, la A de RSA. Me asignó el artículo de Goldwasser, Micali y Charlie Rackoff sobre la prueba de conocimiento cero. Así que esa es de hecho mi primera presentación, en la historia, en este país: sobre el conocimiento cero.

**Amit Sahai:** Eso es increíble. Es un concepto casi hipnótico.

**Shang-Hua:** También es interesante cómo formular matemáticamente esos conceptos. Por ejemplo, tenemos datos. Eventualmente a partir de los datos, a través de la minería de datos, puedes obtener información. Y luego tienes esta palabra llamada "conocimiento". El conocimiento ha sido debatido durante mucho tiempo incluso en la filosofía. ¿Qué es el conocimiento? Pero aquí hay una forma muy fascinante en la que los matemáticos o los científicos informáticos quieren capturar este conocimiento. No decía "prueba de información cero". Entonces, ¿cuál es tu opinión sobre por qué "conocimiento" en lugar de "información", o "prueba de datos cero"? Claramente hay datos allí, por lo que no puede ser de datos cero.

**Amit Sahai:** Absolutamente. No creo que todavía tengamos una respuesta completamente satisfactoria a esa pregunta. Lo que fue una idea tan hermosa es la idea de que el conocimiento cero sea algo que ya puedes predecir. Si ya puedes predecir la respuesta, entonces no debes estar obteniendo ningún conocimiento de esa interacción. Esta idea, de poder predecir el futuro con precisión y que eso sea evidencia de una falta de conocimiento nuevo, fue una idea tan hermosa y asombrosa.

**Shang-Hua:** Bueno, aquí no hay información cero. Fundamentalmente, desde una perspectiva de computación y seguridad, lo que importa es cuánto conocimiento estás obteniendo, más que cuánta información has obtenido y cuántos datos tienes. Los datos no implican inmediatamente conocimiento. Pero la gente no siempre puede distinguirlo.

**Amit Sahai:** Correcto. Por ejemplo, en la investigación médica: ¿qué tan increíble sería tener un medicamento y probar que funciona en este modelo, sin tener que revelar la estructura del compuesto?

**Shang-Hua:** ¿Cuáles dirías que son las próximas direcciones en este espacio?

**Amit Sahai:** Este concepto de programas de conocimiento cero te permitiría llevar a cabo cálculos completamente arbitrarios de una manera de conocimiento cero, sin ninguna interacción. Simplemente puedo tomar el programa, convertirlo en un programa de conocimiento cero (o un programa ofuscado) y luego simplemente enviártelo. Puedes ejecutarlo y obtener el beneficio de ese cálculo sin tener que hablar más conmigo.

**Shang-Hua:** Así es. Hay una naturaleza no interactiva. Pero hay verificabilidad en ello. En la cadena de bloques, también comenzaron a incorporar una prueba de conocimiento cero más general en el libro mayor.

**Amit Sahai:** Definitivamente estamos en este momento ahora donde el conocimiento cero se va a usar cada vez más. Hay tantas conferencias y reuniones en el espacio del conocimiento cero a las que tú y yo no estamos invitados, porque es para las personas que están desarrollando, las personas que están programando, no nosotros los matemáticos. Y creo que eso es una señal. Es una señal de que nuestro bebé ha crecido y es hora de que se desarrolle.

**Shang-Hua:** Creo que profundamente, los estudiantes a menudo me preguntan cuáles son las direcciones futuras, tanto en términos de cripto, prueba de conocimiento cero, en el mundo real y en la computación matemática.

**Amit Sahai:** Es una gran pregunta. Ojalá pudiera ver el futuro. No puedo, pero déjame intentarlo. Creo que hemos hecho mucho en criptografía en las últimas décadas, pero entendemos muy poco. El aspecto más fundamental es comprender la dificultad: ¿cómo obtenemos problemas difíciles? ¿Cómo construimos realmente problemas matemáticamente difíciles para que luego podamos usarlos para construir programas y pruebas de conocimiento cero eficientes?

**Shang-Hua:** Supongo que también, en la computación cuántica, necesitas problemas aún más difíciles.

**Amit Sahai:** En efecto. Ahora que tenemos el espectro de la computación cuántica acercándose a nosotros, todos sabemos que las computadoras cuánticas pueden romper muchos sistemas criptográficos. Es un desafío profundo. Entonces, ¿podemos encontrar nuevas fuentes de dificultad que sean resistentes a los ataques cuánticos, que ni siquiera las computadoras cuánticas puedan romper? Eso es algo en lo que he estado trabajando durante los últimos años.

**Shang-Hua:** Pero estoy seguro de que motivarán hermosas matemáticas.

**Amit Sahai:** Sí, así es. Una de las grandes cosas del mundo real es que las personas en el mundo real tienen demandas. Y esas demandas a menudo suenan imposibles. Y ahí es donde entramos nosotros: es nuestro trabajo hacer posible lo imposible.