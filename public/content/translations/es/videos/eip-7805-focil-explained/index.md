---
title: "EIP-7805: Listas de inclusión aplicadas por elección de bifurcación (FOCIL)"
description: "Los investigadores de Ethereum Thomas Thiery y Julian Ma analizan la EIP-7805 (FOCIL), que utiliza listas de inclusión locales agregadas para garantizar que las transacciones válidas no puedan ser censuradas por los constructores de bloques."
lang: es
youtubeId: "cUGyLx-mf6I"
uploadDate: 2025-02-12
duration: "1:00:30"
educationLevel: advanced
topic:
  - "privacy"
  - "network-upgrades"
  - "roadmap-and-priorities"
format: presentation
author: ECH Institute
breadcrumb: "EIP-7805 (FOCIL)"
---

Episodio 141 de **PEEPanEIP** por los Ethereum Cat Herders. La presentadora Pooja Ranjan está acompañada por **Thomas Thiery** y **Julian Ma**, investigadores del Grupo de Incentivos Robustos de la Fundación Ethereum y coautores de la [EIP-7805](https://eips.ethereum.org/EIPS/eip-7805), para explicar las listas de inclusión aplicadas por elección de bifurcación (FOCIL): por qué Ethereum necesita resistencia a la censura a nivel de protocolo, cómo funciona el mecanismo y en qué estado se encuentra su implementación.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=cUGyLx-mf6I) publicada por los Ethereum Cat Herders. Ha sido ligeramente editada para facilitar su lectura.*

#### Introducción (0:35) {#introduction-035}

**Pooja Ranjan:** Hola y bienvenidos a PEEPanEIP, el único programa donde exploramos a fondo las Propuestas de Mejora de Ethereum y analizamos su impacto en el ecosistema. Este es el episodio 141, presentado por los Ethereum Cat Herders. Soy su anfitriona, Pooja Ranjan, y hoy hablaremos sobre la EIP-7805, Listas de inclusión impuestas por la elección de bifurcación (Fork-choice enforced Inclusion Lists).

Documentada en noviembre de 2024, la EIP-7805 es una propuesta principal de la vía de estándares que actualmente se encuentra en estado de borrador. Esta propuesta tiene como objetivo permitir que un comité de validadores fuerce la inclusión de un conjunto de transacciones en cada bloque. Coescrita por Thomas Thiery, Francesco D'Amato, Julian Ma, Barnabé Monnot, Terence Tsao, Jacob Kaufmann y Jihoon Song, la propuesta está en discusión activa para una futura actualización.

En este episodio, exploraremos los detalles de la EIP-7805, sus implicaciones y su impacto potencial en el ecosistema de Ethereum. Para hablar más sobre la propuesta, nos acompañan Thomas Thiery y Julian Ma. Bienvenidos a PEEPanEIP.

**Thomas Thiery:** Gracias por invitarnos.

**Julian Ma:** Sí, muchas gracias por invitarnos.

**Pooja Ranjan:** Estamos emocionados de conocer la descripción general de la propuesta, en qué estado se encuentra hoy y qué tan pronto podremos verla en la red principal de Ethereum. Pero antes de comenzar, a nuestra comunidad le encanta conocer a los investigadores y desarrolladores detrás del trabajo. ¿Podrían compartir un poco sobre ustedes, el proyecto en el que están involucrados actualmente y su trayectoria dentro del ecosistema de Ethereum?

#### Presentación de los invitados (2:14) {#guest-introductions-214}

**Julian Ma:** Claro, puedo empezar. Soy Julian, investigador en el Robust Incentives Group, al igual que Thomas, en la Fundación Ethereum. El Robust Incentives Group se ocupa de la economía del protocolo en términos muy generales. Algunos de nosotros hemos estado analizando los mecanismos de tarifas de transacción, como el EIP-1559, y otros han estado analizando los ataques a la capa de consenso, principalmente aquellos motivados por incentivos económicos.

Por mi parte, comencé con una pasantía analizando los derivados de la tarifa base, y después de eso me uní a tiempo completo. He estado trabajando principalmente en la separación proponente-constructor (PBS) y en temas relacionados con MEV, y ahora me estoy centrando en las listas de inclusión a través de FOCIL con este EIP, y espero con interés la separación atestiguador-proponente. Diría que lo que más me entusiasma es llevar la investigación a producción a través de este proceso de comenzar con un trabajo más teórico y llevarlo hacia un EIP que, con suerte, pueda proponerse e implementarse dentro de Ethereum.

**Thomas Thiery:** Soy Thomas. También trabajo en la Fundación Ethereum en el Robust Incentives Group, haciendo investigación. Mi formación es en realidad un doctorado en neurociencia, lo cual era muy diferente. Pero sentí curiosidad por las cadenas de bloques y los sistemas distribuidos, quería probar algo un poco diferente y me uní a una empresa de datos cripto llamada Dune. Me quedé allí un tiempo, pero luego extrañaba investigar, y tuve la suerte de poder unirme a la EF y al Robust Incentives Group, lo cual ha sido genial hasta ahora.

He trabajado en temas similares. El MEV era bastante importante cuando me uní. Curiosamente, mis primeras publicaciones de investigación fueron muy pequeñas, pero trataban sobre los retrasos en la inclusión y la resistencia a la censura. Realmente no profundicé en ello hasta hace poco. Durante los últimos seis meses a un año he estado más activo en el lado de la resistencia a la censura y la inclusión. Ha sido muy agradable poder comenzar con ideas de investigación, mejorar ideas anteriores que eran muy interesantes pero que no incluían algunos de los detalles de los que vamos a hablar, presentar una propuesta y ahora tener implementaciones y redes de desarrollo que la mayoría de las personas con las que he hablado creen que serían una buena adición a Ethereum.

**Pooja Ranjan:** Gracias por compartir. Siempre es inspirador conocer los antecedentes de los desarrolladores. Es interesante ver que provienen de diferentes dominios y, en última instancia, contribuyen al ecosistema de Ethereum. Entiendo que hoy tenemos una presentación aquí. Así que, sin más preámbulos, echemos un vistazo.

#### Presentación: objetivos de FOCIL (5:16) {#presentation-goals-of-focil-516}

**Julian Ma:** Perfecto, muchas gracias. Me gustaría comenzar con una pequeña presentación sobre cómo funciona EIP-7805, o FOCIL, y por qué exactamente queremos implementarlo. Su propósito es iniciar la conversación, por lo que no será demasiado profunda, para dejar algo de espacio para el debate posterior.

El objetivo principal de FOCIL es aumentar la neutralidad creíble de Ethereum. FOCIL lo hace eliminando el monopolio de inclusión que actualmente tiene un solo proponente o constructor de bloques dentro de un slot. En su lugar, FOCIL permite que múltiples validadores contribuyan a la construcción de un bloque al incluir transacciones en cada bloque.

El objetivo de más alto nivel es perseguir una propiedad que llamamos neutralidad de la cadena, lo que significa que cualquier transacción pendiente que pague tarifas debería incluirse si está disponible y si hay espacio para incluirla en cadena. Creemos que si esta propiedad se satisface lo suficiente, entonces aumentamos la neutralidad creíble de Ethereum.

#### ¿Por qué necesitamos FOCIL y por qué ahora? (6:09) {#why-do-we-need-focil-and-why-now-609}

**Julian Ma:** ¿Por qué necesitamos algo así? Actualmente, casi todos los validadores subcontratan la construcción de bloques a MEV-Boost, que es un mercado fuera del protocolo donde los constructores pujan por los derechos de construcción de bloques. En este mercado solo hay dos entidades que realmente dominan, y esto significa que el 90 % de los bloques son construidos por solo dos entidades.

Aquí vemos que Ethereum ya no puede obtener su neutralidad creíble de la construcción local de bloques. Alguna vez lo hizo. Comenzó teniendo proponentes ubicados en todo el mundo, cada uno construyendo sus bloques localmente, lo que significaba que se incluían todas las transacciones. Pero ahora que la construcción de bloques se subcontrata a estas entidades sofisticadas, esto ya no es suficiente. Por lo tanto, es necesario implementar medidas contra la censura más sólidas, y FOCIL es la forma más conocida de hacerlo.

¿Por qué deberíamos implementar FOCIL ahora? Se podría pensar que los constructores no están censurando tanto ahora, pero podrían empezar a censurar en cualquier momento, ya sea por razones regulatorias o económicas. Y la censura económica es definitivamente algo que no debe malinterpretarse. También es bueno introducir FOCIL cuando hay relativamente poca censura, porque entonces se introduce como una línea base y por defecto. Todos los validadores hacen listas de inclusión independientemente de su jurisdicción o incentivos económicos, y causa poca inestabilidad en el mercado. Mientras que si se introdujera FOCIL cuando todos los constructores están censurando, tal vez sería más difícil.

Además, los rollups basados se están volviendo más comunes hoy en día, y se apoyarán en la construcción de bloques de Ethereum. Si queremos proporcionar la secuenciación que tiene Ethereum, es necesario tener una neutralidad creíble aquí a través de FOCIL.

Y potencialmente FOCIL podría ayudar con el escalado, dependiendo de a quién se le pregunte. Hoy en día, Ethereum todavía obtiene su resistencia a la censura de la construcción local de bloques. Si Ethereum puede obtener resistencia a la censura de otro lugar, por ejemplo a través de FOCIL, entonces tal vez podamos aumentar las expectativas que tenemos de los constructores de bloques y permitir, por ejemplo, más blobs. Pero potencialmente esto también podría hacerse sin FOCIL. Por lo tanto, se ha propuesto que FOCIL se implemente en Fusaka.

#### Cómo funciona FOCIL (8:10) {#how-focil-works-810}

**Julian Ma:** Ahora les explicaré cómo funciona FOCIL. Comenzaremos con los conceptos básicos e iremos paso a paso hasta tener el mecanismo completo, y luego exploraremos cómo este mecanismo completo satisface las propiedades que queremos.

La idea básica de una lista de inclusión, que también ha sido propuesta por Mike Neuder anteriormente, es que hay una lista de transacciones que restringe el bloque de alguna manera. Así que hay, por ejemplo, una lista de inclusión que incluye las transacciones A y B, está firmada por alguien reconocido por el protocolo, y luego estas transacciones deben incluirse en algún bloque. FOCIL no cambia esto. Se basa en ello, y se trata más de quién crea esta lista y cómo se hace cumplir.

Entonces, ¿quién crea esta lista? Este es el primer paso de cómo funciona el protocolo FOCIL. En cada slot, se seleccionan 16 validadores como miembros del comité de la lista de inclusión. Cada uno de estos miembros del comité observa la mempool y construye su propia lista de inclusión. Una lista de inclusión debería tener alrededor de 8 kilobytes, o unas 20 transacciones promedio, lo que significa unas 320 transacciones promedio en total.

El segundo paso es distribuir estas listas de inclusión. Los miembros del comité de la lista de inclusión distribuyen sus listas de inclusión a través del tema global (global topic), y no las incluyen en un bloque ellos mismos. Deben hacerlo antes del segundo 9 del slot, momento en el cual los atestiguadores congelan su vista de las listas de inclusión locales. Como veremos en el siguiente paso, los atestiguadores son los que realmente hacen cumplir estas listas de inclusión, como sugiere el nombre: listas de inclusión aplicadas por la elección de bifurcación (fork-choice enforced inclusion lists). Congelan su vista de qué listas de inclusión harán cumplir en el segundo 9, y esto evita los ataques de vista dividida. El productor de bloques todavía tiene unos segundos adicionales para observar las listas de inclusión y asegurarse de que no se vea afectado negativamente por la falta de alguna lista de inclusión, por lo que el productor de bloques no corre ningún riesgo en este escenario.

Luego pasamos al paso final, que es la aplicación (enforcement). Como dije, la aplicación se realiza a través de la elección de bifurcación. Los atestiguadores solo votarán por un bloque si cumple con la condición de la lista de inclusión. Lo hacen observando las listas de inclusión que se enviaron en el tema global, haciendo una lista agregada de las transacciones que habían visto en estas listas de inclusión, y luego verificando si todas estas transacciones están en el bloque. Si esta verificación es exitosa, votan por el bloque. También podría darse el caso de que no todas las transacciones de las listas de inclusión estén en el bloque, pero el bloque esté lleno. En ese caso, los atestiguadores también votan por el bloque. Así que, a menos que el bloque no contenga las transacciones y no esté lleno, los atestiguadores votan por el bloque.

Para resumir el mecanismo completo: en cada slot, se seleccionan 16 miembros del comité como miembros del comité de la lista de inclusión. Observan la mempool y construyen objetos de lista de inclusión que distribuyen a través del tema global antes de una fecha límite, en este caso el segundo 9. El constructor observa estas listas de inclusión e incluye todas las transacciones que ha visto en su bloque. Luego, los atestiguadores verifican si todas las transacciones que habían visto antes del segundo 9 en las listas de inclusión están efectivamente en el bloque. Si esta verificación es exitosa, votan por el bloque, y pasamos al siguiente slot, donde ocurre nuevamente el mismo proceso.

#### IL Boost y la imposibilidad de saturación (11:07) {#il-boost-and-uncrowdability-1107}

**Julian Ma:** Una de las grandes preocupaciones sobre las listas de inclusión, expresada para la EIP anterior de Mike y durante el desarrollo posterior, es el "IL Boost", o la imposibilidad de saturación. Se refiere al hecho de que los proponentes de listas de inclusión podrían querer vender sus derechos para construir una lista de inclusión. Es una preocupación muy lógica, porque vemos que esto sucede con la construcción de bloques: vender este derecho conduce a un mercado centralizado de constructores sofisticados.

Sostenemos que FOCIL es robusto frente a estos mercados similares a MEV-Boost, o IL Boost como se les conoce coloquialmente, debido a las siguientes propiedades. FOCIL no garantiza ningún ordenamiento de las transacciones. Independientemente de dónde coloque su transacción en su lista de inclusión, se ordenará de la manera que el constructor de bloques considere adecuada. Si, por ejemplo, incluyera una transacción de arbitraje en la lista, es muy poco probable que el constructor coloque su transacción de arbitraje en la parte superior del bloque para que realmente ejecute el arbitraje. En cambio, es probable que el constructor lo haga por sí mismo.

Además, el flujo de órdenes privado no es posible. Estas listas de inclusión se distribuyen a través del tópico global, por lo que sus transacciones son públicas antes de que el constructor construya el bloque. No es posible que el flujo de órdenes privado ingrese al bloque a través de una lista de inclusión.

En tercer lugar, hay múltiples proponentes de listas de inclusión por slot. Incluso si hubiera algo valioso que vender, los 16 miembros del comité de la lista de inclusión tienen la misma posibilidad de construir esta lista de inclusión, por lo que la competencia entre esos proponentes de listas de inclusión reduciría el valor a cero.

Y finalmente, estas listas de inclusión se crean 3 segundos antes de que actúe el productor de bloques. Hay 3 segundos de información adicional, que suele ser extremadamente relevante para los tipos de transacciones MEV, que llegan después de que se compromete la lista de inclusión y antes de que actúe el productor de bloques, lo que significa que hay muy poca ventaja informativa. De hecho, hay una desventaja informativa para aquellos que intentan utilizar las listas de inclusión como un vehículo para el MEV.

Por estas razones, creemos que ningún proponente de lista de inclusión individual tiene poder de inclusión, ordenamiento o exclusión, lo cual es la definición fundamental de MEV. Por lo tanto, las listas de inclusión no deberían estar sujetas al MEV.

#### Resumen de la presentación (13:09) {#summary-of-the-presentation-1309}

**Julian Ma:** Para resumir esta breve presentación: FOCIL permite que múltiples validadores contribuyan a la construcción de bloques, evitando el monopolio de inclusión de un solo proponente y reforzando la neutralidad creíble de Ethereum. Creemos que es necesario implementar FOCIL ahora porque actualmente solo hay dos constructores dominantes que podrían comenzar a censurar en cualquier momento, y esto podría deberse a razones económicas de las que podrían beneficiarse. La construcción de bloques podría soportar una mayor carga porque los rollups basados querrán utilizar las propiedades de secuenciación de Ethereum. FOCIL se lanzará de manera mucho más fluida cuando haya pocas partes censuradoras: primero, porque significa que por defecto los validadores construirán listas de inclusión, y segundo, porque significa que hay menos inestabilidad de mercado entre los constructores que censuran y los constructores que no lo hacen. Y finalmente, FOCIL podría ayudar potencialmente con la escalabilidad, que es quizás un tema en el que podemos profundizar más.

Gracias por el tiempo para dar esta pequeña presentación. Solo quería mostrar el código QR, que lleva a la EIP, para las personas que estén interesadas.

**Pooja Ranjan:** Muchas gracias por esta breve presentación y la descripción general de la propuesta.

#### Preguntas y respuestas: ¿en qué se diferencia la EIP-7805 de la EIP-7547? (14:17) {#qa-how-does-eip-7805-differ-from-eip-7547-1417}

**Pooja Ranjan:** Me gustaría comenzar la sección de preguntas y respuestas con la primera pregunta, sobre la propuesta anterior que también se mencionó en su presentación: la propuesta 7547, listas de inclusión, de Mike Neuder. Quiero entender la diferencia básica entre esa propuesta y el FOCIL que tenemos con la EIP-7805. En su presentación tocaron parcialmente el tema del IL Boost y la imposibilidad de saturación (uncrowdability). ¿Les gustaría explicar un poco más al respecto?

**Julian Ma:** Quizás Thomas sea el más indicado para responder en qué se diferencia la EIP-7805 de la EIP-7547, pero puedo decir un poco al respecto. En primer lugar, FOCIL es para el mismo slot, mientras que la EIP-7547 era para el siguiente slot. La propiedad del mismo slot facilita algunas cosas, porque significa que la lista de inclusión no tiene que almacenarse en cadena.

Con respecto a la propiedad de imposibilidad de saturación, esta es muy interesante y sutil. Dentro de la EIP-7547, que fue una gran propuesta sobre la que se basa nuestra propuesta, la lista de inclusión se añade incondicionalmente al final del bloque y la hace una sola persona. Esto tiene algunas propiedades diferentes a las nuestras. En primer lugar, las transacciones están ordenadas. Podría ser que en el futuro sea muy valioso tener arbitraje al final del bloque, y de hecho, algunas de las investigaciones de Thomas han destacado que este podría ser un lugar valioso. Tener los derechos para construir la lista de inclusión significa que eres la última persona en actuar en el bloque, y para algunos casos esto podría ser valioso. En segundo lugar, la hace una sola persona, por lo que no existe este efecto de competencia entre los miembros del comité de la lista de inclusión. Un comité de una sola persona tiene todo el derecho de incluir transacciones al final del bloque, lo que también podría hacerlo más valioso. En tercer lugar, existe esta propiedad incondicional, lo que significa que, independientemente de lo que haga el productor de bloques, su transacción se incluirá en cadena de todos modos. Por lo tanto, tiene algunas garantías adicionales, más allá del mínimo necesario para la inclusión, que podrían hacerlo valioso hasta cierto punto.

**Thomas Thiery:** Una gran diferencia es también el número de proponentes de listas de inclusión que tenemos. En la propuesta anterior, había un mecanismo por el cual el proponente del slot n hace la lista de inclusión que el proponente del slot n+1 necesita aplicar. Las dos grandes cosas aquí: primero, hay un retraso de un slot, por lo que las transacciones en la lista de inclusión solo tienen que ser incluidas en el siguiente slot por el siguiente proponente. Y solo hay un proponente que realmente hace la lista de inclusión. Con FOCIL tenemos 16. Hace una gran diferencia, porque ahora solo necesitamos que uno de los 16 miembros del comité de IL sea honesto para que todo el mecanismo funcione según lo previsto. Multiplica tus posibilidades de tener realmente un buen mecanismo resistente a la censura, mientras que antes dependías de una sola parte.

Y luego algunos detalles más técnicos: había algunas incompatibilidades con la abstracción de cuentas, y era difícil lidiar con la equivocación de IL, es decir, alguien que envía dos listas de inclusión diferentes. La equivocación de bloques es algo conocido y está penalizada por el protocolo, pero como todo iba en cadena en la propuesta anterior, también tenías que lidiar con casos extremos extraños, y no era muy fácil acomodarlos. Con FOCIL, las listas de inclusión no van en cadena. Simplemente se transmiten a través de la red de la capa de consenso P2P. Es un poco técnico, pero hace una gran diferencia al lidiar con estos casos extremos causados por la abstracción de cuentas, o ataques donde divides la red en dos vistas con la equivocación de IL.

**Pooja Ranjan:** Muchas gracias. Para las personas que quieran aprender más sobre la propuesta 7547, tenemos un episodio grabado con Mike Neuder, el episodio 130 de PEEPanEIP, que proporciona una descripción general de alto nivel. Siempre me encanta ver propuestas que compiten, porque sé que es para mejorar el ecosistema y la cadena. Veo en el chat que hay algunas preguntas. Tal vez me gustaría invitar a Kataya a compartir su pregunta.

#### ¿Tiene el proponente que incluir las 16 listas? (19:05) {#does-the-proposer-have-to-include-all-16-lists-1905}

**Kataya:** Hola, gracias. Mi pregunta era: ¿recibe el proponente de bloque 16 listas de inclusión, cada una de un miembro del comité, y tiene que incluir todas las transacciones de estas listas?

**Thomas Thiery:** Sí, así es. Tomas la unión de todas las transacciones de todas las listas, en nuestro caso 16 listas. Obviamente, puede haber superposición, así que tomas la unión y eliminas los duplicados, pero sí, todas las transacciones de todas las listas deben incluirse en el bloque para que los atestiguadores lo consideren válido.

**Pooja Ranjan:** La siguiente pregunta en el chat es de Justin. Justin, ¿te gustaría leer tu pregunta para los invitados?

#### Transacciones de mempool privada en listas de inclusión (19:55) {#private-mempool-transactions-in-inclusion-lists-1955}

**Justin:** He estado haciendo muchas preguntas. Quería preguntar qué impide poner una transacción de una mempool privada en una lista de inclusión, y creo que se respondió bastante bien. Parece que está totalmente bien, considerando que el constructor esencialmente las va a ordenar como le parezca de todos modos, y tu transacción se vuelve pública cuando sale en la lista de inclusión (IL) también. Así que creo que tiene sentido. Gracias.

**Thomas Thiery:** Esa fue una consideración, como mencionó Julian. Realmente no queríamos que FOCIL y las listas de inclusión se usaran para incluir transacciones MEV, flujo de órdenes privado o preconfirmaciones, porque en última instancia lo que queremos es resistencia a la censura, y es muy fácil que un mecanismo se convierta en un vehículo para incluir transacciones valiosas si no se tiene cuidado. El hecho de que cuando incluyes tu transacción en una lista de inclusión se vuelve pública automáticamente, todos pueden verla, no tiene garantías de ordenamiento y puede ser incluida por el constructor en cualquier parte del bloque, hace que no sea muy adecuada para transacciones valiosas.

Así que, o tienes una transacción pública y simplemente la envías a la mempool pública para que se incluya en una lista de inclusión, o tienes transacciones privadas valiosas y entonces no pasarías por FOCIL, porque hay mejores formas de hacerlo. Contactarías al constructor directamente y la enviarías a través de canales privados.

**Pooja Ranjan:** Gracias por compartir. Veo que la siguiente pregunta es de Ladislaus.

#### FOCIL y escalabilidad (21:41) {#focil-and-scaling-2141}

**Ladislaus:** Hola chicos. Esto se refiere al punto que mencionaron en términos de FOCIL y escalabilidad. He visto algunas discusiones últimamente, como todos nosotros, sobre la escalabilidad de Ethereum, y como mencionaron con razón, existe este cuello de botella de unos pocos constructores por ahí. Personalmente, me gusta pensar en FOCIL como una forma de volver a empoderar la construcción local, y lo veo como una necesidad que debe integrarse en el protocolo antes de que aumentemos los requisitos de ancho de banda, o los requisitos de los nodos en general. Tal vez puedan dar más detalles sobre lo que piensan al respecto, y también sobre otras posibles formas de escalar, tal vez sin FOCIL, como mencionaron.

**Julian Ma:** Gracias por la pregunta. En primer lugar, el argumento a favor de escalar a través de FOCIL. Actualmente, el 90 % de los validadores subcontratan la construcción de bloques a través de MEV-Boost, y estas entidades sofisticadas obviamente tienen más ancho de banda que los requisitos mínimos de hardware. Podrían, por ejemplo, incluir más blobs en sus bloques sin causar ningún problema. Sin embargo, algo interesante es que Ethereum depende de la construcción local de bloques para lograr una neutralidad creíble, o resistencia a la censura, porque estas dos entidades sofisticadas no son sobre las que se puede construir la resistencia a la censura de Ethereum.

Por lo tanto, el protocolo de Ethereum aún debe diseñarse de manera que sea posible realizar la construcción local de bloques y, de hecho, lo diseñamos para que no sea poco rentable en comparación con MEV-Boost. Esto está en el diseño de Ethereum, pero en la práctica, por supuesto, MEV-Boost es mucho más rentable: primero porque estos constructores de bloques sofisticados tienen algoritmos más complejos, y segundo porque tienen mucho más flujo de órdenes privado. Recientemente hubo una investigación de Data Always que mostraba que los bloques de MEV-Boost contienen muchas más transacciones. Eso por sí solo genera más ganancias.

Aun así, el protocolo está diseñado para que no haya fuerzas dentro de las reglas del protocolo que hagan que un validador sea menos rentable que otro. Si queremos mantener esa regla, entonces FOCIL es necesario, porque así los constructores de bloques locales pueden contribuir a las listas de inclusión y, por lo tanto, mantener la resistencia a la censura. Sin embargo, también podríamos deshacernos de esta regla y básicamente decir que los constructores de bloques locales pueden incluir un cierto número de blobs, pero los constructores de bloques más sofisticados podrían incluir más blobs, hasta el punto de que los constructores de bloques locales no podrían manejar esa carga mientras crean un bloque ellos mismos. Así que, si queremos mantener la regla de que el máximo se establece en los requisitos de hardware más bajos, entonces necesitamos FOCIL. Si estamos de acuerdo con flexibilizar esa regla, entonces potencialmente no necesitamos FOCIL para escalar.

**Thomas Thiery:** Es muy similar, supongo, pero ahora mismo en Ethereum estamos en una posición extraña, porque dependemos de constructores sofisticados para construir la mayoría de los bloques, pero esos no son ideales para la resistencia a la censura, porque son solo dos partes. Si deciden censurar transacciones o algunas direcciones por alguna razón arbitraria, entonces básicamente no tenemos resistencia a la censura ni una naturaleza sin permisos, lo cual también es muy importante. Significa que pueden censurar o impedir que cualquier actor que deseen participe en cadena, lo cual es muy malo.

Y las propiedades de resistencia a la censura que mantenemos no son increíbles, ¿verdad? Dado que la mayoría de los bloques son construidos por estos dos constructores, básicamente tienes que esperar hasta que un constructor de bloques local sea elegido y proponga un bloque que incluya todas estas transacciones que normalmente son censuradas, lo cual no se siente muy bien. Significa que estos usuarios tendrán que esperar 10, 12, no sé, muchos bloques hasta que sus transacciones se incluyan realmente en cadena.

Así que realmente queremos mantener a los stakers domésticos y a los constructores de bloques locales, porque son ellos quienes preservan la resistencia a la censura. Al mismo tiempo, hoy en día, incluso usarlos no es ideal, porque todavía tienes que esperar mucho tiempo para que tu transacción sea incluida si es censurada por los dos constructores. Con FOCIL, pasas a un mundo donde los participantes que garantizan la resistencia a la censura, los miembros del comité de la lista de inclusión en nuestro caso, podrían ser diferentes de las personas que construyen los bloques. Creo que abre un panorama muy interesante, porque ahora no tenemos que depender exactamente del mismo participante para construir bloques valiosos y contribuir a la resistencia a la censura. FOCIL también puede considerarse un primer paso en esa importante dirección, porque tienes dos deberes muy diferentes, y hoy le pedimos exactamente a los mismos nodos validadores que hagan ambos, lo cual genera mucha tensión.

**Pooja Ranjan:** Muchas gracias. Creo que la siguiente pregunta es de Luis.

#### Criterios para seleccionar transacciones (26:46) {#criteria-for-selecting-transactions-2646}

**Luis Pinto:** Me uní unos minutos después del inicio, pero me parece que esto está descentralizando la selección de transacciones en la red en su conjunto. En mi opinión, eso es muy bueno; combate el MEV y la censura. Y definitivamente me gusta la parte de que los atestiguadores hagan este trabajo, porque en el futuro tendrán requisitos de hardware más bajos que los constructores, aún más con la ausencia de estado y los clientes sin estado. Dado que se podrá ejecutar esto con un hardware muy básico, hace que las cosas sean muy descentralizadas. Supongo que el principal desafío aquí es definir los criterios para la selección de transacciones de estas listas de inclusión, ya sea que se opte por tarifas de prioridad o por el número de blobs; hay muchísimas variables. ¿Han llegado a un conjunto de criterios que estén pensando en imponer?

**Thomas Thiery:** Es una gran pregunta. Tiene dos partes. La primera es muy importante, sobre tratar de separar a los atestiguadores de las personas que construyen o proponen el bloque. Esa es toda la línea de investigación de la separación atestiguador-proponente (APS); Julian ha trabajado bastante en esto. Lo llamamos desagregación de roles, para que coincidan más estrechamente con las funciones del protocolo. Escribí una publicación, que acabo de compartir, sobre una posible separación, que está muy abierta, y me encantaría recibir más opiniones de la gente. En esta publicación hago una separación entre atestiguadores, inclusores, que ahora son los miembros del comité de IL, y proponentes de ejecución, o constructores. Creo que esas son funciones fundamentalmente diferentes, y tal vez deberíamos tener roles distintos para ellas.

Luego, en cuanto a la regla de inclusión, es una muy buena pregunta. Lo pensamos bastante y creo que llegamos a dos conclusiones. La primera es que queremos una diversidad de reglas. No queremos una sola regla, por ejemplo, ordenar por tarifas de prioridad descendentes para todos los clientes, porque entonces se podría manipular el sistema e intentar reordenar la mempool para que solo tus transacciones se incluyan en las IL. Pero si tienes una diversidad de reglas, incluyendo una regla que también tenga en cuenta el tiempo que una transacción ha estado pendiente en la mempool, y diferentes clientes implementan diferentes reglas, todas del mismo estilo, principalmente en torno a las tarifas de prioridad y el tiempo pendiente en la mempool, entonces es muy, muy difícil de manipular, y hace que el protocolo sea aún más robusto. También es una buena manera, creo, de aprovechar la diversidad de clientes que tenemos en Ethereum hoy en día, y de permitir que los clientes tomen decisiones con criterio propio. Tenemos reglas en mente, pero creemos que los clientes también pueden elegir las mejores reglas para ellos. Mientras no todos tengan exactamente la misma regla ordenada por tarifas de prioridad, estaremos bien.

**Luis Pinto:** Bien, entonces también están distribuyendo estos criterios, dejando que los que construyen las listas de inclusión tengan sus propios criterios. ¿O esto va a ser parte del protocolo?

**Julian Ma:** La regla de inclusión no será parte del protocolo. En primer lugar, es muy difícil de imponer y, en segundo lugar, en realidad es mejor no imponer nada. Si permitimos que los miembros del comité decidan por sí mismos, o dejamos que los equipos de clientes actúen en su nombre sobre cómo incluyen las transacciones, entonces creamos cierta robustez en la red. Las personas con diferentes preferencias incluirán de diferentes maneras, lo que significa que es más difícil atacar el sistema.

**Luis Pinto:** De acuerdo, gracias.

#### Compatibilidad con EIP-7702, ePBS y PeerDAS (30:43) {#compatibility-with-eip-7702-epbs-and-peerdas-3043}

**Pooja Ranjan:** Muchas gracias. Según tengo entendido, esta propuesta ya se ha presentado para la actualización posterior a Pectra, Fusaka. Y dado que Fusaka puede o no incluir algunas otras EIP que están en progreso, me pregunto cuál es el estado de compatibilidad de FOCIL con respecto a propuestas como la 7702, que es para la abstracción de cuentas, ePBS y PeerDAS.

**Thomas Thiery:** Excelente pregunta. Tuvimos un poco de ventaja aquí debido al historial de las listas de inclusión. Como mencionamos, se consideró la inclusión de la 7547 y luego se rechazó debido a incompatibilidades. Así que tuvimos mucho cuidado en resolverlas antes de hacer una nueva propuesta, porque sabíamos que la gente la iba a analizar con las mismas dudas, lo cual tiene sentido.

Tenemos mucha confianza, porque también hablamos con los equipos de abstracción de cuentas, y hablamos mucho con Potuz y Terence. Terence nos ha estado ayudando activamente, y ha estado trabajando tanto en ePBS como en FOCIL, por lo que fue muy fácil para nosotros comprobar si también era compatible. Realmente no creo que haya incompatibilidades con ninguna de las otras EIP. Con ePBS, hay que tener cuidado con los tiempos de las cosas, porque se separa la carga útil de ejecución del bloque de consenso, por lo que cambia todo el tiempo del slot, y ahora también se añade la creación de las IL que deben hacerse antes de que se proponga la carga útil. Así que hay que tener cuidado con los tiempos, pero si no recuerdo mal, de la última vez que lo hablamos tanto con Potuz como con Terence, no había ninguna incompatibilidad crucial en absoluto. Creo que vamos por buen camino en lo que respecta a la compatibilidad.

**Pooja Ranjan:** Es bueno saberlo. Me di cuenta de que Jihoon también compartió un HackMD, que añadiremos a los recursos, para las personas que quieran aprender más sobre la compatibilidad con ePBS específicamente. Y sí, recuerdo de la última conversación con Mike, supongo que la propuesta no se incluyó debido a la incompatibilidad con la abstracción de cuentas. Así que es bueno saber que esto ya se ha solucionado.

#### FOCIL y el MEV multi-slot (33:04) {#focil-and-multi-slot-mev-3304}

**Pooja Ranjan:** Estuve revisando los documentos y los detalles añadidos al sitio web de FOCIL, meetfocil.eth.limo, y aprendí sobre un término llamado MEV multi-slot. Julian también mencionó que MEV-Boost en general es rentable, a pesar del deseo y los esfuerzos realizados por los desarrolladores para mantenerlo equilibrado. Me pregunto cómo FOCIL evitará esto.

**Julian Ma:** Gracias por tu pregunta. Primero, déjame decir algo sobre FOCIL y el MEV, y luego podemos pasar al MEV multi-slot. FOCIL no evita necesariamente el MEV, y esto es precisamente porque queremos separar las partes del MEV y las partes de inclusión. Desde nuestro punto de vista, es importante hacerlo, porque de lo contrario aparecerían este tipo de mercados como IL Boost. Siguiendo ese razonamiento, si la lista de inclusión pudiera limitar la cantidad de MEV que se puede extraer, entonces construir la lista de inclusión se volvería muy valioso, y la gente crearía mercados a su alrededor. Nuestro diseño está realmente ahí para proporcionar la garantía mínima de inclusión, lo que significa que no es tan valioso ser miembro del comité de la lista de inclusión, y hay 16 de ellos, lo que significa que no hay un mercado de productores sofisticados.

Luego, pasando al MEV multi-slot: FOCIL alivia algunos de los problemas, pero no los resuelve por completo. Esto se debe nuevamente a esta incompatibilidad entre proporcionar tanto resistencia a la censura como una solución al MEV. Lo que hace FOCIL es permitir que se incluya cualquier transacción siempre que pague las tarifas, lo que resuelve el MEV multi-slot hasta cierto punto. El MEV multi-slot aquí es cuando una parte puede extraer más MEV si controla dos bloques seguidos.

FOCIL alivia algunos de los problemas porque te permite insertar tu transacción. Por ejemplo, si necesitas insertar una transacción para liquidar una deuda incobrable en alguna posición en algún lugar, puedes hacerlo incluso si el proponente intenta censurarte y extraería MEV de ti en el siguiente bloque.

La razón por la que no resuelve todos los problemas es debido a la selección adversa, una propiedad económica donde una persona tiene más información que la otra. Un ejemplo de MEV multi-slot sería extraer arbitraje a lo largo de dos bloques, donde el constructor de bloques no extrae arbitraje en el primer bloque y sí lo hace en el segundo bloque. Hay algunos resultados teóricos que muestran que esto puede ser más rentable para el constructor de bloques que extraer arbitraje en ambos slots. Podrías pensar que FOCIL ayuda aquí, porque los arbitrajistas podrían, en principio, incluir su transacción en la lista de inclusión y, por lo tanto, forzar a que ocurra algún tipo de arbitraje. Si bien este es el caso, no es compatible con los incentivos que los arbitrajistas envíen su transacción a FOCIL, porque todavía hay 3 segundos entre el envío de su transacción y el momento en que el constructor de bloques puede actuar. Si estás intentando hacer arbitraje y el precio se mueve constantemente en algún mercado externo, no quieres comprometerte con 3 segundos de antelación, porque tienes mucha menos información que el constructor de bloques, que actúa después de ti. La selección adversa entra en juego porque el constructor tiene más información: te dejará ganar si es malo para ti, si el precio en el mercado externo se ha movido en tu contra en esos tres segundos adicionales, y se dejará ganar a sí mismo si es mejor para él ganar.

Así que FOCIL resuelve las partes del MEV multi-slot donde las transacciones no sufren selección adversa. Para las transacciones donde hay selección adversa, es un poco más complicado, pero alivia el problema hasta cierto punto. En principio, mejora las cosas en comparación con cómo están ahora, pero todavía hay un poco de trabajo por hacer.

**Pooja Ranjan:** Muy bien, muchas gracias por compartir eso. Entiendo que hay mucha investigación en curso para abordar el tema del MEV, así que es bueno saber que, al menos en principio, va a ayudar más que en el escenario actual.

#### Compensaciones y desafíos (36:44) {#trade-offs-and-challenges-3644}

**Pooja Ranjan:** Tengo una pregunta relacionada con lo que Thomas mencionó antes sobre la equivocación de IL. Noté que en la sección de consideraciones de seguridad de la propuesta, se mencionan bastantes puntos, como la vitalidad del consenso, la equivocación de IL y la construcción de la carga útil. ¿Cuál considerarías que es la mayor compensación, o algo que podría requerir más investigación y que podría evitar que esta propuesta se incluya en la próxima actualización tal como está?

**Thomas Thiery:** Para ser honesto, creo que la sección sobre consideraciones de seguridad fue principalmente una forma de mostrar que hemos pensado y abordado las preocupaciones sobre la seguridad. Es más eso que tener preguntas abiertas sobre aspectos de seguridad que desconocemos. No creo que haya grandes bloqueos o problemas en términos de consideraciones de seguridad.

En cuanto a las compensaciones: si se adopta una visión muy estricta, es cierto que FOCIL añade algunas tareas a los validadores, tanto cuando tienen que proponer una lista de inclusión, como para los atestadores, cuando tienen que comprobar una condición más para asegurarse de que el bloque es válido según las listas de inclusión. También añade una pequeña tarea para el proponente, porque ahora necesita asegurarse de que su carga útil realmente incluya las transacciones de las IL. Para mí, esa es la única compensación, y esas tareas no son pesadas ni sofisticadas. Un miembro del comité de IL simplemente monitorea la mempool pública e incluye transacciones en una lista que envían. No requiere ningún tipo de habilidad o sofisticación, lo cual creo que es bueno. Por otro lado, como dijimos, podría desbloquear algunas grandes mejoras de escalabilidad y una mejor separación entre los participantes y los deberes dentro del protocolo.

Puede que no sea objetivo, pero no veo grandes compensaciones. Sí creo que le da un giro de 180 grados a todo en lo que respecta a la resistencia a la censura. Ahora solo necesitas que básicamente el 15 % de la red sea honesta para que todas las transacciones, incluidas las que podrían ser censuradas por los constructores, se incluyan en el siguiente bloque, lo cual es una mejora muy grande. Sinceramente, no creo que se sacrifiquen muchas cosas ahí.

**Pooja Ranjan:** Es bueno saberlo. En la mayoría de las propuestas encontramos que la sección de consideraciones de seguridad no tiene información o tiene muy poca, así que es bueno saber que se ha investigado esa parte y que somos conscientes de las posibles consideraciones de seguridad. Me alegra saber que no es un obstáculo ni un desafío potencial para la implementación y adopción en el futuro.

#### Mecanismos de tarifa de transacción para listas de inclusión (39:50) {#transaction-fee-mechanisms-for-inclusion-lists-3950}

**Pooja Ranjan:** Tengo una pregunta sobre algunas cuestiones abiertas que encontré en el propio sitio web, acerca del mecanismo de tarifa de transacción. Me pregunto si hay alguna novedad, o si les gustaría compartir más sobre la mejor manera de cobrar tarifas y distribuir estas tarifas por la inclusión en la lista de inclusión.

**Thomas Thiery:** Tenemos una subvención en curso que está analizando específicamente esto y los mecanismos de incentivos para recompensar a los miembros del comité de IL (lista de inclusión). No es fácil. Es complicado, y no importa cómo se aborde, estos también son cambios muy grandes. Cambiar las tarifas en Ethereum, ya sea que se cambie una tarifa, se agregue una o se agregue una nueva emisión, todos estos son cambios importantes que necesitan mucha consideración y cuidado. Pero se está explorando, y las ideas en torno a la distribución de tarifas entre, por ejemplo, los miembros del comité que incluyen una transacción parecen ser buenas ideas. Tiene un poco las propiedades que queremos, porque queremos recompensar a las personas por incluir transacciones que otros podrían no querer incluir. Así que estamos pensando muy profundamente en esto, y tenemos una subvención en curso.

También existe la duda de si alguna vez querremos otorgar tarifas a los miembros del comité de IL, porque es notablemente muy difícil recompensar a los participantes más pequeños que están distribuidos por todo el mundo. No se desean ataques Sybil, y no se quiere que los grandes participantes con mucha participación desplacen al conjunto del comité de IL. ¿Cómo se previene eso? Es muy difícil. Así que hay muchas consideraciones de diseño a tener en cuenta.

Una de las perspectivas que he tenido últimamente es: ¿qué pasaría si agregamos algunas características geniales a FOCIL, como la privacidad, para que realmente no se pueda saber quién propuso una lista de transacciones determinada? Se sabe que fue alguien realmente seleccionado como miembro del comité de IL, pero no se sabe exactamente quién propuso qué lista, por lo que no se puede vincular a los miembros del comité de IL con el conjunto de transacciones en sus IL. Si podemos tener eso, y permitir que el rol del comité de IL sea opcional, entonces probablemente tendríamos participantes honestos en el protocolo, confiando en un comportamiento altruista, y tal vez no necesitaríamos establecer un mecanismo de tarifas en absoluto. Esa es una perspectiva muy reciente y personal, y se está explorando mucho en este momento. Todas estas son discusiones sobre el "futuro de FOCIL"; no se supone que deban incluirse en el EIP actual.

**Julian Ma:** Solo para agregar a eso, esa última parte también es muy importante: el EIP-7805 no incluye ningún mecanismo de tarifa de transacción, para que sea más fácil de implementar. Es básicamente la forma más pequeña posible en la que podemos proporcionar las propiedades de resistencia a la censura, pero es muy ampliable. Estamos investigando eso. Thomas ha trabajado bastante analizando tarifas de transacción separadas para los que incluyen y para los proponentes. Luego, como mencionó Thomas, tenemos una subvención en curso con un increíble investigador en Nethermind que está buscando crear un mecanismo de tarifa de transacción para FOCIL, y esto es muy prometedor. Y finalmente, se ha trabajado en un mecanismo de tarifa de transacción para una variante de FOCIL llamada AUCIL, un diseño de lista de inclusión basado en subastas propuesto por Sarisht Wadhwa, Fan Zhang y Kartik Nayak junto con varios de los autores de FOCIL, que busca formas de incentivar a los miembros del comité de la lista de inclusión.

Respecto al punto anterior de Luis, incentivar tiene mucho que ver con cómo se crean las listas de inclusión. Significa que el protocolo quiere dar una cierta visión de cómo deberían comportarse los miembros del comité de la lista de inclusión. Por lo general, a lo que esto se reduce es a que quiere que ciertos participantes hagan cosas diferentes. Por ejemplo, puede ordenar a los miembros del comité y asignarles ciertas transacciones a través de un equilibrio correlacionado, para seguir teniendo un comportamiento diferente entre los miembros del comité. Así que no es parte de la propuesta actual, pero definitivamente lo estamos investigando, y encaja dentro de la línea de extensibilidad de FOCIL.

**Pooja Ranjan:** Oh, eso es interesante. Así que deberíamos esperar algunas propuestas complementarias en el futuro para mejorar las características actuales de FOCIL.

#### Tamaño de la lista de inclusión (44:16) {#inclusion-list-size-4416}

**Pooja Ranjan:** Tengo otra pregunta. No estoy segura de si debería formar parte de la propuesta actual, pero tengo curiosidad por saber si hay alguna novedad sobre el tamaño de la IL (lista de inclusión). Es probable que las listas de inclusión deban tener un tamaño limitado para evitar un uso excesivo del ancho de banda. ¿Tenemos más investigaciones o novedades sobre cómo se puede determinar el tamaño óptimo de la lista de inclusión?

**Thomas Thiery:** Ahora tenemos un tamaño fijo en la especificación, y ha estado ahí por un tiempo: 8 kilobytes. Lo pusimos en kilobytes porque lo que FOCIL y las IL realmente consumen es ancho de banda, y eso es prácticamente todo. Si tomas el tamaño mediano de una transacción, llegamos a unas 40 transacciones por IL, y si todas las transacciones son únicas, son unas 640 transacciones que podrían combinarse entre los 16 miembros del comité.

No sé si hay mucha investigación por hacer sobre el tamaño óptimo exacto. Lo que elegimos: 16 veces 8 kilobytes es básicamente el tamaño de un blob, por lo que no es una cantidad enorme de ancho de banda combinado. Y dado que la combinación de transacciones en las IL es más grande que un bloque, no creo que tengamos problemas ahí.

Para el futuro, se podría aumentar el tamaño de la IL, pero también se podría considerar aumentar el número de miembros del comité de la IL. Eso permite tener aún más posibilidades de conseguir un miembro honesto en el comité de la IL si la mayor parte de la red decide empezar a censurar. Así que eso también es algo que podríamos hacer. Por ahora, parece que 16 estaría completamente bien y sería suficiente, pero definitivamente se puede jugar con estos parámetros en el futuro si la censura se vuelve muy extrema, o si necesitamos tomar más medidas.

#### Métricas para rastrear la adopción (46:39) {#metrics-to-track-adoption-4639}

**Pooja Ranjan:** Solo una pregunta de seguimiento aquí: ¿tienen en mente alguna métrica que podamos rastrear para entender la adopción o el éxito de esta propuesta?

**Julian Ma:** Esa es una gran pregunta. Déjame responder rápidamente y luego le paso el relevo a Thomas. Algunas métricas sencillas son simplemente cuántas listas de inclusión se proponen que no estén vacías. Y se podría pensar en paneles de control, como la serie ".pics" de Toni Wahrstätter, donde quizás haya más matices, asignando alguna medida de calidad a estas listas de inclusión. Sin embargo, en principio, solo una persona por slot necesita hacer una lista de inclusión adecuada para proporcionar resistencia a la censura.

Creo que es un punto tan importante que resulta fundamental implementar FOCIL pronto, porque ahora estamos en este régimen mágico donde los constructores de bloques no están censurando demasiado y los validadores tampoco están censurando demasiado. Yo diría que esto es muy frágil. Hasta ahora, los constructores de bloques han estado censurando durante mucho tiempo, y si introducimos FOCIL ahora, tenemos la posibilidad de hacer que sea la norma que todos estos validadores lo adopten y creen listas de inclusión que sean significativas. Debido a que los constructores de bloques no están censurando, no se crea inestabilidad en el mercado aquí. Si esperamos hasta que haya censura entre los constructores, entonces será mucho más difícil introducir FOCIL, y me imagino que todas las métricas que se usarían para medir la adopción serían mucho peores.

**Thomas Thiery:** Otra métrica clave a observar también es, literalmente, el retraso de inclusión para las transacciones de la mempool pública. Tomas todas las transacciones que están pendientes en la mempool pública y ves qué tan rápido se incluyen. Si FOCIL funciona, todas se incluirán en el siguiente bloque. Si no es así, eso significa que una gran proporción de validadores está censurando. Así que la otra métrica que podemos observar es quién está censurando y qué proporción de la red está censurando. Tendremos paneles de control y métricas muy transparentes para hacer un seguimiento de esto, porque es básicamente lo que se supone que debe hacer FOCIL. Si las transacciones públicas no se incluyen en el siguiente bloque, eso significa que una parte muy grande de la red en realidad está censurando estas transacciones.

**Pooja Ranjan:** Muy interesante. Así que tal vez sea algo para los investigadores: una posible lista de deseos para las actualizaciones, que los desarrolladores compartan paneles de control y rastreadores de métricas para una propuesta siempre que se incluya en una actualización de la red.

#### Estado de la implementación en los clientes (49:11) {#client-implementation-status-4911}

**Pooja Ranjan:** Como mencionó Julian, es posible que esta propuesta deba implementarse lo antes posible. Tengo curiosidad por entender en qué punto nos encontramos con la implementación en los clientes, porque recuerdo que en la última llamada sobre la red de prueba Paritosh mencionó que se añadiría algo de soporte con las redes de desarrollo. Entonces, ¿en qué punto estamos con eso?

**Thomas Thiery:** Vamos bastante bien. En primer lugar, ha sido genial ver cómo la gente asumió la parte de la implementación de FOCIL, porque no soy desarrollador, soy investigador. He estado trabajando con desarrolladores desde el principio, pero no soy yo quien implementa las cosas en los clientes.

Los que lo lideraron, los tres: tenemos a Terence de Prysm, y a Jihoon, que ha estado ayudando mucho a Terence en Prysm pero también ha trabajado en Geth. Así que ahora tenemos una red de desarrollo funcional para Prysm y Geth, lo cual es genial, y se están realizando muchas pruebas. Ahora también estamos intentando que FOCIL se muestre y sea visible en el explorador Dora. Luego está Jacob, que ha trabajado en Lighthouse y Reth, y sé que todavía se están haciendo algunos esfuerzos allí. Lodestar ha estado muy activo últimamente; creo que están muy cerca de tener una red de desarrollo en funcionamiento. Hoy tuvimos noticias de Nethermind de que tienen un prototipo, lo cual es fantástico. Siento que me olvido de algunos... Nimbus también se une, dice Jihoon. Eso es realmente genial.

En general, cada vez tenemos más redes de desarrollo listas y activas, redes de desarrollo locales, y cada vez más combinaciones entre clientes de la capa de ejecución y de la capa de consenso. Ha habido un progreso realmente bueno, y es agradable verlo, porque todos sabemos que los desarrolladores están bastante ocupados ahora con la llegada de Pectra, y ya están trabajando en PeerDAS y otras cosas. Ha sido realmente genial ver cómo la gente en Ethereum en general se preocupa bastante por la resistencia a la censura. La mayoría de los equipos a los que no había contactado específicamente simplemente se unieron al esfuerzo y ahora están trabajando en las redes de desarrollo y las pruebas.

**Pooja Ranjan:** Gracias por compartir eso. Espero con interés seguir las actualizaciones sobre las redes de desarrollo. No estoy segura de cuántas iteraciones de esta red de desarrollo habrá, pero me emociona ver que se acerca. Veo que Justin tiene una pregunta aquí. Justin, adelante, por favor.

#### ¿FOCIL en Fusaka o Glamsterdam? (52:07) {#focil-in-fusaka-or-glamsterdam-5207}

**Justin:** Vale, prepárate para esta. Has hecho una muy buena observación de que el mejor momento para abordar la censura es antes de que ocurra, ¿verdad? Entonces: ¿FOCIL en Fusaka, o puede esperar a Glamsterdam? ¿Y por cuál debería abogar como desarrollador?

**Thomas Thiery:** Hemos abierto el PR y se ha fusionado, proponiendo FOCIL para Fusaka. Creemos que debería incluirse en Fusaka. Parte del razonamiento es que algunos clientes ya han empezado a trabajar en ello y no han encontrado demasiados obstáculos. No es como otras propuestas que son mucho más difíciles de implementar e implican mucho más trabajo. Y tampoco es muy polémica. No creo que nadie esté abogando en contra de la resistencia a la censura, y todo el mundo está más o menos de acuerdo en que debe incluirse lo antes posible. Así que yo apostaría por Fusaka.

No sé si puede esperar o no. Las propuestas y actualizaciones siempre pueden esperar. Solo quiero evitar un mundo en el que no sea tan fácil implementar estos cambios. Las cosas pueden dar un vuelco muy rápidamente. Como vimos, ocurrió al revés: hace unos meses, uno de los principales constructores, de la nada, dejó de censurar. Preguntamos por qué, y fue como: "sí, simplemente decidimos no hacerlo". Fue bueno en ese caso, porque fue para bien, pero puede volver a cambiar por completo, y entonces podríamos tener a los dos constructores censurando algunas transacciones, y volveríamos a estar en una situación muy mala.

La otra cosa que quiero mencionar, porque creo que es importante: si avanzamos hacia algunas de las cosas de las que hablamos, como APS, donde realmente se puede separar al atestiguador y al proponente con algunos de los diseños en los que hemos trabajado, necesitamos tener FOCIL antes de eso, y necesitamos saber que FOCIL está funcionando. Necesitamos FOCIL en la red principal durante seis meses, un año, para estar realmente seguros de que está cumpliendo su propósito, que es mantener y mejorar las propiedades de resistencia a la censura de Ethereum. Así que otra urgencia, al menos para mí, es que si queremos proteger a los atestiguadores de los juegos de tiempo y algunas otras preocupaciones que queremos abordar con APS, necesitamos que FOCIL se incluya lo antes posible.

**Pooja Ranjan:** A veces es triste ver cuando las propuestas no son seleccionadas para la siguiente o más cercana actualización, pero solo un número limitado de propuestas pueden incluirse en una actualización. Realmente aprecio todo el arduo trabajo que se realiza detrás de la presentación de la propuesta, la preparación de la misma, así como las pruebas que conlleva. Así que muchas gracias por todo el trabajo que están haciendo por el ecosistema de Ethereum.

#### Preguntas rápidas (55:18) {#rapid-fire-5518}

**Pooja Ranjan:** Antes de terminar, tenemos una ronda de preguntas rápidas. La única condición es que la respuesta debe ser de una palabra o una oración, e intentaremos hacerlo con un temporizador, tal vez 30 segundos cada uno. Si están listos, sigamos adelante y comencemos con Julian. ¿Cuál es el problema más difícil en la investigación de la cadena de bloques en este momento?

**Julian Ma:** No seré muy de memes, así que responderé en serio. Diría que el problema más difícil es el futuro del staking: qué significa el futuro del staking, qué roles desempeñan los proveedores de servicios, cómo se les compensa por ello y cómo se relacionan entre sí.

**Pooja Ranjan:** ¿Cuál es un caso de uso de la cadena de bloques que no se ha explorado lo suficiente?

**Julian Ma:** Diría que FOCIL.

**Pooja Ranjan:** ¿Cuál es el mayor riesgo de seguridad para Ethereum hoy en día?

**Julian Ma:** Honestamente diría que la resistencia a la censura es muy crítica aquí, debido a cosas como el MEV de múltiples bloques que podrían plantear enormes riesgos de seguridad, por ejemplo para las L2.

**Pooja Ranjan:** ¿Debería el MEV minimizarse, adoptarse o algo intermedio?

**Julian Ma:** Estoy en gran parte de acuerdo con la postura de Flashbots aquí, de que debería democratizarse, lo que significa que debería maximizarse donde sea necesario y minimizarse en la capa de aplicación.

**Pooja Ranjan:** ¿La descentralización siempre vale la pena a pesar de las concesiones?

**Julian Ma:** Por lo general, vale la pena a pesar de las concesiones.

**Pooja Ranjan:** ¿Cuál es la mayor innovación que Ethereum ha aportado al mundo?

**Julian Ma:** Aquí me gustaría citar la charla de Mike Neuder en la Devcon sobre los derechos de propiedad digital. Diría que los derechos de propiedad digital resistentes a la censura que realmente están cambiando el mundo.

**Pooja Ranjan:** Muchas gracias, muy bien respondido. Mi siguiente serie de preguntas es para Thomas. Entonces, si Ethereum no existiera, ¿en qué cadena de bloques estarías trabajando?

**Thomas Thiery:** Creo que seré muy de memes, y Julian me jugó una mala pasada porque pensé que él iba a hacer lo mismo. La cadena de bloques sería FOCIL.

**Pooja Ranjan:** ¿Cuál es el caso de uso más sobrevalorado de la cadena de bloques?

**Thomas Thiery:** Ningún caso de uso merece tanto revuelo sin FOCIL.

**Pooja Ranjan:** ¿Qué es una cosa que Ethereum necesita mejorar lo antes posible?

**Thomas Thiery:** La resistencia a la censura, con FOCIL.

**Pooja Ranjan:** ¿Una palabra para describir la descentralización?

**Thomas Thiery:** FOCIL.

**Pooja Ranjan:** ¿Crees que Ethereum resolverá por completo la escalabilidad?

**Thomas Thiery:** Ethereum con FOCIL, sí.

**Pooja Ranjan:** Escalado de la capa 1 o escalado de la capa 2, ¿cuál gana?

**Thomas Thiery:** Capas infinitas, todas con FOCIL.

**Pooja Ranjan:** Muy bien hecho, muchas gracias, Thomas. Gracias por responder a todas estas preguntas. Ya que estamos terminando, me gustaría darles esta oportunidad: si tienen algún mensaje para la comunidad sobre la propuesta, o para la comunidad de Ethereum en general.

#### Mensajes para la comunidad (58:08) {#messages-to-the-community-5808}

**Thomas Thiery:** En realidad, ese es un punto muy importante, porque tenemos discusiones activas todo el tiempo y todo es público en Discord. Al principio hubo un esfuerzo para que todo fuera público, y la gente realmente lo está haciendo, así que estoy muy contento. Puedes seguir las discusiones y el progreso en el Discord público de I+D de Eth, en el canal inclusion-list. Ahí es básicamente donde está ocurriendo todo ahora mismo. Luego puedes contactarnos en Twitter, Telegram, en cualquier lugar. Siéntete libre de hacerlo.

Cuantas más personas hablemos y se involucren, mejor será el diseño y mejor será la implementación. Así que si puedes ayudar de alguna manera, contáctanos y estaremos encantados de ayudar en todos los aspectos, incluso en el lado de la investigación. Supongo que es aún más adecuado para nosotros trabajar con personas que quieran trabajar en el futuro de FOCIL. Mencionamos la privacidad, mencionamos los mecanismos de tarifa de transacción, y también nos vamos a centrar mucho en FOCIL para blobs. Todas estas cosas necesitan personas y esfuerzo de investigación. Si estás interesado, contáctanos. Muchas gracias por invitarnos, y gracias también por todo el trabajo que haces por Ethereum.

**Julian Ma:** Solo para añadir a eso, espero que hayamos entusiasmado a algunas personas con FOCIL. Si estás entusiasmado, por favor háznoslo saber. Y si todavía tienes algunas preguntas, estaremos encantados de responderlas, y con suerte podremos convencerte de que FOCIL es, de hecho, el camino a seguir. Muchas gracias. Fue un verdadero placer estar aquí, y gracias por organizar la sesión. Y también gracias a todos por asistir, por supuesto.

#### Palabras de cierre (59:52) {#closing-words-5952}

**Pooja Ranjan:** Gracias. Con esto concluimos. Muchísimas gracias a Thomas y Julian por acompañarnos hoy y compartir sus conocimientos sobre EIP-7805. Gracias a todos los participantes; sus preguntas son alentadoras e informativas. Gracias por sintonizarnos. Si disfrutaron de esta conversación, asegúrense de darle a me gusta, suscribirse y compartir este episodio con sus compañeros entusiastas de Ethereum. Les traeremos más EIP y avances de investigación en PEEPanEIP. Hasta la próxima, sigan ronroneando con el conocimiento y merodeando por Ethereum con los Ethereum Cat Herders. Que tengan un excelente resto del día.