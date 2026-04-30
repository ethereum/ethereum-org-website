---
title: "Presentación principal: el VERDADERO estado de las l2"
description: "Una charla sobre el estado actual de las soluciones de capa 2 (l2), que examina la brecha entre las promesas de seguridad de los rollup y la realidad, y propone un camino hacia la verdadera descentralización."
lang: es
youtubeId: "ik2JxmHDmyw"
uploadDate: 2024-11-13
duration: "0:26:15"
educationLevel: advanced
topic:
  - "scaling-and-layer-2"
  - "rollups"
  - "layer-2"
format: presentation
author: Ethereum Foundation
breadcrumb: "Estado de las L2"
---

Una presentación principal de **Bartek Kiepuszewski**, fundador de L2BEAT, en Devcon SEA que examina el estado actual de las soluciones de capa 2 (l2), la brecha entre las promesas de seguridad de los rollup y la realidad, las nuevas categorías de evaluación y el compromiso de L2BEAT de destinar recursos significativos a la verificación de sistemas de prueba durante el próximo año.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=ik2JxmHDmyw) publicada por la Fundación Ethereum. Ha sido ligeramente editada para facilitar su lectura.*

#### Introducción (0:00) {#introduction-000}

Al ser fundador de L2BEAT, tengo la oportunidad única de trabajar con prácticamente todos los equipos de l2 que existen, y hemos estado trabajando con ellos desde los inicios de este espacio, lo cual fue hace como cuatro años. Eso es increíble. El tiempo pasa muy rápido. Hemos trabajado con los primeros pioneros en tecnología de conocimiento cero (ZK), hemos trabajado con el Plasma Group que pasó a llamarse Optimism, hemos trabajado con Arbitrum. Y desde este escenario quiero reconocer a todos estos equipos, porque sin su apoyo ciertamente no estaríamos aquí. Como L2BEAT, estamos sumamente agradecidos por todo el apoyo que nos brinda la comunidad.

Así que echemos un vistazo a lo que hemos logrado. En primer lugar, hemos logrado lanzar casi 50 rollup y más de 50 otras l2. Es un logro increíble: son muchos sistemas, y tenemos casi la misma cantidad por lanzar en los próximos meses. También hemos puesto mucho valor, mucho valor total bloqueado (TVL), en estos sistemas, y si miran los gráficos, todos van en aumento.

El asunto es que, con todo ese crecimiento también viene mucha responsabilidad. Necesitamos entender que los usuarios finales que utilizan estos sistemas están poniendo dinero en estos rollup porque creen que los rollup heredan la seguridad de Ethereum. Al darnos cuenta de esto, en mi opinión, necesitamos empezar a tomarnos en serio la seguridad.

#### Escalando Ethereum (2:10) {#scaling-ethereum-210}

También hemos logrado escalar Ethereum. Ethereum funcionaba bastante bien, pero empezó a volverse muy lento para la demanda y las tarifas se estaban volviendo muy altas. Así que sin duda estamos escalando: estos números también suben. Esto es increíble.

Sin embargo, hay un "pero". Ya saben, chicos, siempre hay un "pero", ¿verdad? Y solo estoy aquí para ser honesto con todos ustedes. Realmente quiero que este espacio se vuelva serio, y esta es mi oportunidad para pedir su apoyo y asegurarnos de que no fracasemos, de que no defraudemos las expectativas de la comunidad. Necesitamos empezar a ser realmente serios sobre la seguridad de lo que estamos construyendo.

Porque, ya saben, hemos estado usando rueditas de entrenamiento por demasiado tiempo. Si eres un adulto usando rueditas de entrenamiento (y repito, han pasado cuatro años), entonces eres realmente inmaduro. Está bien usar rueditas de entrenamiento si eres un niño. No está bien usarlas si eres un adulto. Y creo que es hora de que todos dejemos de ser tímidos al respecto. Todos deberíamos alzar la voz, y no deberíamos sufrir del síndrome del traje nuevo del emperador.

#### El gran "pero": la falta de sistemas de prueba (4:30) {#the-big-but-missing-proof-systems-430}

Entonces, ¿cuál es este gran "pero"? Bueno, en primer lugar, la mayoría de las l2 hoy en día no tienen un sistema de prueba, lo cual es un poco sorprendente porque los primeros pioneros como StarkNet, zkSync, Aztec (hace cuatro años, cuando lanzaban sus primeros rollup específicos de aplicaciones) sí tenían sistemas de prueba. Así que sí, hoy puedes lanzar una l2 con solo hacer clic en un botón. Sin embargo, ¿es eso realmente una l2? ¿Es realmente un rollup? Lo que estás haciendo es lanzar algo que está asegurado por una multifirma. No creo que eso sea lo suficientemente bueno.

El estado del ecosistema hoy en día es más o menos como en este diagrama. A la izquierda pueden ver las l2 actuales con un sistema de prueba. A la derecha pueden ver las l2 actuales sin un sistema de prueba. Y apostaría a que la gran mayoría de las próximas l2 no tendrán un sistema de prueba. Eso incluiría esencialmente a cada cadena de OP Stack excepto OP Mainnet y Base (y felicitaciones a ellos, por cierto, son como campeones). Sin embargo, ninguna otra cadena de OP Stack tiene simplemente un sistema de prueba.

Ese gráfico de la derecha también incluirá todos los stacks de Orbit, que sí tienen un sistema de prueba, sin embargo, en realidad está detrás de una lista blanca con permisos a menudo muy corta. A veces esta lista blanca es solo un actor: es el mismo que el proponente de estado. Es esencialmente el proponente de estado y solo ellos pueden desafiarse a sí mismos. O sea, ¿qué? En serio.

#### Consejos de seguridad (6:00) {#security-councils-600}

Ahora bien, la mayoría de las l2 no utilizan consejos de seguridad. ¿A qué nos referimos con un consejo de seguridad? Un consejo de seguridad es esencialmente una multifirma que consta de al menos ocho participantes y requiere un umbral de consenso del 75%. Así que pueden pensar en ello como una gran multifirma, pero no se trata solo del tamaño: se trata del hecho de que queremos que los participantes estén geográficamente descentralizados. Es posible que ayer hayan escuchado una presentación increíble sobre la necesidad de la diversificación geográfica. Eso es lo que queremos de estas estructuras. Y esencialmente, queremos que los participantes, lo que es más importante, provengan de diferentes empresas y diferentes jurisdicciones. Eso es súper importante, y les voy a mostrar algunos ejemplos de por qué.

Piensen en los consejos de seguridad como estas multifirmas sobrealimentadas. Hay una capa social muy importante detrás de ellos. Así que este es el estado actual de las cosas, y de nuevo, es muy malo. Solo tenemos consejos de seguridad en Arbitrum, Optimism, Polygon, zkSync (y sé que StarkNet, Scroll e interesantemente Fuel se están lanzando con un consejo de seguridad). Todos los demás son esencialmente una multifirma muy pequeña, interna, a menudo privada, y francamente es extremadamente difícil notar la diferencia entre estas multifirmas y simples EOA (cuentas de propiedad externa).

#### Supuestos de confianza de disponibilidad de datos (7:25) {#data-availability-trust-assumptions-725}

El tercer gran elemento que hicimos mal es que la mayoría de las l2 que no son rollup están configuradas con supuestos de confianza de disponibilidad de datos (DA) abismales. Y uso la palabra "abismal": A, porque me gusta, y B, porque es realmente, realmente malo.

Miren estos ejemplos a la izquierda: Arbitrum, StarkEx, Immutable X. Sin embargo, casi todos los demás están literalmente publicando la DA en su servidor en el sótano o lo que sea. No tenemos idea. Literalmente no tenemos idea. El punto es que son realmente malos y no parece importarles. Así que tal vez a los usuarios no les importe, no lo sabemos. Pero necesitamos mirar realmente esos datos y decirle a todos, oigan, eso no es un comité de disponibilidad de datos (DAC).

Un comité de disponibilidad de datos fue creado y promovido originalmente por StarkWare para las implementaciones de StarkEx y por Arbitrum. Pero ese no era el punto: que puedas decir "Tengo un servidor en mi sótano, puedo llamarlo un comité de disponibilidad de datos". Ese no era el objetivo de ese ejercicio.

Así que en conjunto, lamento decirlo, pero en este momento en la mayoría de las l2, los operadores con permisos pueden robar o congelar sus fondos. Estamos aquí para que todos sean conscientes de eso. Siento decirlo, pero necesitamos cambiar la actitud.

#### Por qué importan los sistemas de prueba (8:40) {#why-proof-systems-matter-840}

¿Por qué deberían importarnos los sistemas de prueba? Hay al menos tres buenas razones en nuestra opinión por las que todos deberíamos tener un sistema de prueba funcional.

Una es que en realidad permite una salida sin permisos en caso de que todos los operadores estén inactivos (y pueden estar inactivos por cualquier motivo). Tuvimos hace muy poco un caso en el que dYdX se cayó. Advirtieron a los usuarios, muchos usuarios no salieron. Sin embargo, si tienes un sistema de prueba, puedes hacer que el sistema funcione de manera que, sin permisos, alguien tome el control, o puedes construir un mecanismo de salida para que los usuarios puedan sacar sus fondos. Eso es súper importante. Sin un sistema de prueba simplemente no puedes hacer eso: es imposible.

La segunda razón es que en realidad puedes mejorar los supuestos de confianza del consejo de seguridad (asumiendo, por supuesto, que tienes uno). Y la razón de esto tiene bastantes matices. Lo que puedes hacer ahora es esto: en lugar de la situación en la que un proponente malicioso (y este es el diagrama que muestra el rollup optimista básico sin un sistema de prueba, que puedes ver en muchos OP Stacks hoy en día) hay una multifirma muy fuerte que puede anular la raíz de estado, y hay un proponente que propone raíces de estado. Si esa propuesta es maliciosa, todo lo que necesitan hacer es sobornar a una minoría de los miembros del consejo de seguridad para que miren hacia otro lado (no para que hagan algo malicioso, sino simplemente para que no hagan nada), en cuyo caso la propuesta maliciosa realmente se aprobará y robarán los fondos.

Una vez que introduces un sistema de prueba, la situación es mucho más difícil para el proponente malicioso, porque ahora necesitan sobornar a la **mayoría** del consejo de seguridad. No solo tienen que sobornar a la mayoría, sino que en realidad tienen que hacer que hagan algo malicioso, no simplemente mirar hacia otro lado. Esa es una propuesta muy diferente. Hacer que alguien mire hacia otro lado es decir: "Oye, si te doy 10 millones de dólares, simplemente pierdes tus llaves o te vas a un largo vuelo internacional". Si quieres hacer que alguien haga algo malicioso, esa es una propuesta completamente diferente. Creemos que esto cambia fundamentalmente los supuestos de confianza, especialmente con un consejo de seguridad público.

Finalmente, los sistemas de prueba (si estás en la Etapa 2) te permiten eliminar cualquier intermediario en absoluto. No necesitas un consejo de seguridad, o si lo tienes, es solo para situaciones de emergencia. Así que eso en realidad puede tener profundas implicaciones regulatorias. Es posible que desees lanzar tu l2 como un sistema de Etapa 2 desde el principio. Eso es posible, pero por supuesto necesitas tener un sistema de prueba; idealmente, podrías querer tener más de uno. Ya hay algunos anuncios de sistemas que hacen eso, como el reciente anuncio del equipo de Nethermind que está construyendo un rollup destinado a ser de Etapa 2 en su lanzamiento.

#### Por qué consejos de seguridad, no multifirmas (11:29) {#why-security-councils-not-multisigs-1129}

Eso fue sobre los sistemas de prueba. Ahora, ¿por qué consejos de seguridad y no solo simples multifirmas? La razón es: no crean que las multifirmas son multifirmas. Esa es la razón, a menos que haya una capa social que realmente pueda convencerlos de que están fundamentalmente diversificadas.

Hemos tenido varios grandes eventos en nuestra historia. Tuvimos a Multichain que afirmaba que estaban muy descentralizados, y resultó que no, no lo estaban (y este es un reclamo que realmente no puedes verificar de forma independiente). Un ataque enorme, o un trabajo interno, o un robo (rug pull): no estamos seguros.

Luego tuvimos una situación con Oasis, donde fueron contactados por un tribunal del Reino Unido y tuvieron que usar la multifirma para extraer algunos fondos del protocolo. Habría sido imposible hacer eso si tuvieras un consejo de seguridad diversificado geopolíticamente, porque no hay orden judicial que realmente pueda alcanzar a todos.

Finalmente, hace muy poco tuvimos un ataque a una multifirma. No piensen ni por un segundo que las multifirmas no pueden ser atacadas. Eventualmente tenemos que deshacernos de todas ellas.

Así que para resumir: si tienes un rollup de Etapa 0 sin consejo de seguridad, esencialmente un operador malicioso puede hacer lo que quiera con tus fondos. Si eres un rollup de Etapa 0 con un consejo de seguridad, entonces un atacante necesita sobornar a una minoría del consejo de seguridad (tal vez algo difícil de hacer, pero mucho más fácil que sobornar a la mayoría del consejo de seguridad, lo cual necesitarías hacer si tu rollup tiene un sistema de prueba). Y finalmente, nadie puede robar tus fondos si estás en la Etapa 2. Esa es la promesa de llegar a la Etapa 2.

#### Reclasificación propuesta (13:10) {#proposed-reclassification-1310}

La pregunta es: ¿tenemos los incentivos adecuados para que a los proyectos realmente les importe? El problema es que lo único que podemos hacer (nosotros como L2BEAT y nosotros como la comunidad de Ethereum) es aplicar presión social. Vitalik dijo que a partir del próximo año planea mencionar públicamente solo a las l2 que sean de Etapa 1. Anteriormente incluso dijo que no va a llamar rollup a los sistemas si no son de Etapa 1.

Así que nos preguntábamos qué podemos hacer. Por el momento tenemos etapas para los rollup. No tenemos etapas para los Validium y los optimium. Nos preguntamos durante mucho tiempo: tal vez podríamos introducir la "Etapa 0+" para los sistemas que tienen sistemas de prueba pero que aún no son de Etapa 1. Pero después de meses de discusión, decidimos: no, es hora de madurar.

Lo que estamos proponiendo a la comunidad (y esto va a ir al foro para recibir comentarios de la comunidad) es esto. Primero, queremos crear una categoría separada para los sistemas. La principal diferencia es que tendrás que tener un sistema de prueba para ser de Etapa 0. Así que, por ejemplo, StarkNet hoy sería de Etapa 0 bajo esta clasificación. Todas las cadenas de OP Stack que no tienen un sistema de prueba (excepto Base y Optimism) no entrarán en esta categoría. Y por supuesto, daremos tiempo para que los sistemas se ajusten. Esa es la categoría principal, y debería ser como una súper liga de sistemas.

Luego tienes otra categoría de sistemas que no están utilizando la DA de Ethereum. Utilizan supuestos de confianza adicionales que vienen con la DA externa. Los llamamos "alt-DA" pero incluirían Validium, optimium y cualquier construcción híbrida que puedas crear. Sin embargo, tienen que darte garantías razonables de DA: ese no puede ser tu sótano. Tiene que ser un comité de disponibilidad de datos de tamaño razonable, o si estás usando Celestia o Avail, necesitas usar el puente.

#### La categoría "otros" y el compromiso de L2BEAT (16:05) {#the-others-category-and-l2beats-pledge-1605}

¿Qué pasa con los demás? Los pondremos en una tercera categoría, que llamamos (y ahora estoy esperando los comentarios de la comunidad sobre cómo nombrar estos sistemas) nuestro nombre provisional es "otros". El punto es que están asegurados por multifirmas, y expondremos estas multifirmas por lo que son. Eso es lo que queremos hacer en nuestra interfaz de usuario.

La interfaz de usuario se verá más o menos así: verán este desglose: rollup, Validium y optimium, y otros. Y la clasificación predeterminada será por seguridad, no por TVL. No persigamos el TVL con mala seguridad: eso va a terminar muy mal.

Promoveremos los proyectos de Etapa 1 y Etapa 2. Veremos a los proyectos de Etapa 0 como contendientes. Para los "otros", estamos felices de incluirlos en la lista: seremos extremadamente liberales. Solo necesitas estar esencialmente alineado con Ethereum y obviamente tener un puente que te permita mover fondos. Sin embargo, analizaremos los supuestos de confianza y las multifirmas, y esperamos que lenta pero seguramente los sistemas pasen de "otros" a Validium/optimium o a rollup.

Así es como creemos que se vería la categoría "otros": estos son los datos reales en este momento, los sistemas reales que pueden caer en esta categoría si no introducen un sistema de prueba. Verán exactamente quién es el proponente, quién es el retador y quién es el actualizador. Lo curioso es que pueden ver eso hoy en L2BEAT: es solo que esta información está tan oculta en la página de detalles que apuesto a que solo los investigadores y entusiastas la revisan. Todo está disponible hoy. Sin embargo, sí queremos exponer los datos a los usuarios finales. Queremos que los usuarios finales sean verdaderamente conscientes de lo que está sucediendo, para que todos seamos responsables de los sistemas que estamos construyendo.

¿Es suficiente con solo decir "Tengo un sistema de prueba"? No. Nuestro compromiso con la comunidad como L2BEAT es que el próximo año vamos a destinar recursos significativos para analizar de manera muy exhaustiva y profunda estos sistemas de prueba para asegurarnos de que sean sólidos y completos. Analizaremos tanto los de conocimiento cero (ZK) como los optimistas. Entraremos en el código fuente, veremos cómo crearon su configuración confiable, miraremos sus circuitos y veremos qué se está verificando exactamente en cadena. Queremos hacer que todo sea súper transparente para que los supuestos de confianza se comuniquen claramente y, lo que es más importante, su sistema de prueba no pueda ocultarse detrás de una lista blanca irrazonablemente pequeña.

Estamos contratando investigadores. Haremos todo ese trabajo. Este es nuestro compromiso para el próximo año. Espero que el próximo año sea el año de las l2 y los rollup; sin embargo, no se trata de lanzar un rollup con un solo clic. El punto es que quieres poder lanzar un sistema con buena seguridad. Idealmente, quieres heredar tanta seguridad como sea posible de Ethereum. Hay mucho trabajo por hacer para que todos nosotros alcancemos eso. Pero si no lo hacemos, entonces todo lo que estamos haciendo es esencialmente crear miles de cadenas laterales inseguras. No queremos eso, creo, como comunidad.

#### Preguntas y respuestas (18:45) {#qa-1845}

**Presentador:** Pasemos a las preguntas y respuestas. ¿Es importante que los rollup tengan un secuenciador descentralizado, o son suficientes otros mecanismos de seguridad?

**Bartek Kiepuszewski:** Esta es una pregunta muy buena e importante. Creo que hay diferentes diseños que veremos. No creo que descentralizar el secuenciador sea súper importante para la seguridad de los fondos de los usuarios, pero puede ser importante para la resistencia a la censura en tiempo real en ciertas situaciones. Vitalik dijo durante su presentación de apertura que el futuro podría ser que veamos rollup basados (aprovechando la infraestructura de Ethereum para combatir la resistencia a la censura en tiempo real), mientras que otros, como por ejemplo MegaETH, podrían tener en realidad un secuenciador muy centralizado y depender solo del mecanismo de salida. Podríamos ver construcciones híbridas. Creo que el espacio de diseño es enorme, y en este momento en L2BEAT realmente queremos ver qué va a pasar y cómo se va a desarrollar eso.

**Presentador:** ¿Se considerarán los sistemas de prueba basados en TEE como de Etapa 2 incluso si implican confianza en el fabricante del hardware?

**Bartek Kiepuszewski:** La respuesta corta es no, porque con las construcciones que vemos hoy, si estás usando SGX, Intel podría enviar una prueba y potencialmente podrían bloquear, robar o congelar lo que quisieran sin que nadie se diera cuenta realmente (y sin que Ethereum se diera cuenta). Sin embargo, con todo el trabajo que se está realizando para crear TEE sin necesidad de confianza y sin permisos... me dicen que este es en realidad un trabajo extremadamente emocionante. Pero la respuesta corta: hoy, no.

**Presentador:** ¿Por qué Optimism está clasificado como Etapa 1? Según la evaluación, no lo son: la Fundación controla el proceso de propuesta por completo.

**Bartek Kiepuszewski:** Esencialmente cumplen con todos los criterios. No se trata realmente del proceso de propuesta: se trata de quién controla los fondos. Puedes tener un proponente centralizado, sin embargo, hay un respaldo. Si se caen, entonces todo el sistema se vuelve más sin permisos. Creo que es importante reconocer cuál es el papel del consejo de seguridad. Queremos que los sistemas de Etapa 1 te permitan salir si el proponente centralizado se detiene. Por ejemplo, con dYdX, la propuesta estaba súper centralizada, sin embargo, cuando se detuvieron, la gente pudo salir. Así que no se trata de si estás centralizado o descentralizado: se trata de si realmente puedes salir de una manera sin permisos.

Cumplieron con todos los criterios. Estábamos refinando, por cierto: los criterios no son algo que esté escrito en piedra porque todos estos sistemas están evolucionando, así que necesitamos evolucionar con estos sistemas. Los criterios podrían estar cambiando un poco, y estamos observando muy de cerca tanto a Optimism como a Arbitrum porque claramente son los dos líderes. Hay muchos matices en los que no tengo tiempo de entrar. Pero no es como si tuvieras una designación de etapa para siempre: si hay nueva información o algo que podríamos haber omitido o pasado por alto, es muy posible que puedas perder esa designación.

**Presentador:** ¿Cuáles son las razones principales por las que los proyectos no construyen hacia la Etapa 1?

**Bartek Kiepuszewski:** Complejidad, tiempo, costo, talento. Es sorprendentemente costoso. Como dije, los pioneros hace cuatro años estaban esencialmente construyendo: dYdX fue literalmente uno de los primeros, si no el primer, rollup de conocimiento cero (ZK). Era específico de la aplicación, pero aún así fue el primero. Y si no fuera por pequeños matices, sería de Etapa 2: en realidad, es el proceso de gobernanza que requerimos para la Etapa 2 lo que está fallando. Pero para todos los efectos prácticos, es un sistema de Etapa 2. Fue construido hace cuatro años, así que no es como si fuera imposible.

Creo que lo que hace que sea súper difícil hoy en día para todos los rollup hacer esto realmente, francamente, es que la mayoría de los rollup no son construidos por los equipos: son lanzados por proveedores de rollup como servicio, y necesitamos incentivarlos para que realmente lo hagan mejor. Y es difícil. Nadie dijo que sería fácil.