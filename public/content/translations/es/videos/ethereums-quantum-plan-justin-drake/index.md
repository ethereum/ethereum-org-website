---
title: "El plan cuántico de Ethereum antes del Día Q con Justin Drake"
description: "Una entrevista con Justin Drake, investigador de la Fundación Ethereum, que cubre la hoja de ruta poscuántica de Ethereum, la hoja de ruta de Lean Ethereum y una discusión honesta sobre los riesgos existenciales."
lang: es
youtubeId: "wURmzLKhJco"
uploadDate: 2025-07-15
duration: "1:12:30"
educationLevel: advanced
topic:
  - "roadmap-and-priorities"
format: interview
author: Bankless
breadcrumb: "Justin Drake"
---

Una entrevista con **Justin Drake**, investigador de la Fundación Ethereum, que cubre la hoja de ruta poscuántica de Ethereum, la visión de Lean Ethereum, los avances en la verificación formal y una discusión sincera sobre el riesgo existencial de la IA.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=wURmzLKhJco) publicada por Bankless. Ha sido ligeramente editada para facilitar su lectura.*

#### Introducción y la amenaza cuántica (0:00) {#introduction-and-the-quantum-threat-000}

**Justin Drake:** Un cambio de mentalidad interesante para mí en los últimos meses es que he dejado de pensar en la era poscuántica como un obstáculo que tenemos que superar y lo veo más como una oportunidad. Es una oportunidad para que Ethereum se destaque como el primer sistema financiero global con seguridad poscuántica, no solo en relación con sus competidores como Bitcoin y demás, sino también en relación con el dinero fíat y las finanzas tradicionales (TradFi). Y creo que enviaría un mensaje muy fuerte y sería una especie de argumento de venta de seguridad muy natural para que el mundo migre a Ethereum.

**Ryan Sean Adams:** Nación Bankless, una vez más nos acompaña Justin Drake. Vamos a hablar sobre la computación cuántica y su relación con las cripto, Bitcoin y también Ethereum. Justin, bienvenido de nuevo al podcast.

**Justin Drake:** Hola chicos. Gracias por invitarme de nuevo.

**David Hoffman:** Así que lo cuántico se ha convertido en una gran amenaza inminente para nuestra industria. Siempre lo hemos sabido de alguna manera. Ha sido en gran medida teórico. Durante los últimos seis meses más o menos, lo cuántico ha pasado firmemente de ser teórico a ser algo que impacta materialmente a nuestra industria. Empezando solo con el precio de Bitcoin, porque los gestores de fondos —incluso BlackRock ha publicado artículos sobre la amenaza de lo cuántico para la seguridad y, por lo tanto, el valor de Bitcoin. Así que, anecdóticamente, hemos visto a personas reducir la ponderación de Bitcoin en sus portafolios. Quizás eso también esté suprimiendo el precio de todos los demás activos de la industria.

No solo para hablar de precio, sino que, según entendemos, lo cuántico realmente impacta la forma en que funcionan las cadenas de bloques. Así que este parece ser un problema fundamental de nuestra industria en su conjunto. Un obstáculo que nuestra industria tiene que superar: cuando las cripto y la cadena de bloques se crearon en primer lugar, no estábamos equipados para volvernos poscuánticos como industria. Entonces, tal vez para empezar con algo de contexto, ¿cuál es el cronograma aquí? ¿Cuándo llegará este obstáculo? He oído que a esto lo llaman el Día Q (Q-Day). ¿Cuándo es el Día Q? ¿Cuánto tiempo tenemos para superar este obstáculo cuántico?

**Justin Drake:** Sí. Solo quiero retroceder un poco y enfatizar lo que dijiste, que es que en los últimos 6 a 12 meses, hemos tenido grandes avances. Uno de ellos es esta noción de corrección de errores. Somos capaces de pasar de los llamados cúbits físicos, que son muy ruidosos y propensos a errores, a cúbits perfectamente lógicos. En este momento, básicamente podemos fabricar un cúbit lógico, pero sigue siendo un momento de cero a uno muy importante y ahora se trata de escalarlo a múltiples cúbits lógicos. Otro gran avance se da en el lado algorítmico. Anteriormente pensábamos que tomaría millones, de hecho decenas de millones de cúbits físicos para romper nuestra amada criptografía. Pero el año pasado hubo un artículo que logró una mejora de 10 veces, reduciéndolo a 1 millón de cúbits físicos. Y este año tenemos otra mejora de 10 veces, reduciéndolo a 100.000 cúbits.

Así que la meta se acerca cada vez más, y tienes esta doble exponencial en cierto sentido que eventualmente se cruzará. Y luego otra cosa que ha sucedido es en el lado de la inversión: muchas de las empresas emergentes cuánticas han estado recaudando miles de millones de dólares. El año pasado creo que estamos hablando del orden de 5.000 millones de dólares, lo cual no tiene precedentes. Anteriormente hablábamos de cientos de millones. Y creo que la culminación de todas estas cosas realmente ha energizado al público y ha llevado a esta narrativa que, de hecho, ha impactado potencialmente el precio de Bitcoin y ether.

Ahora, proyectando hacia el futuro, mi Día Q personal es en 2032. Esta es una perspectiva un poco optimista en el sentido de que es posible que lleguen un poco más tarde, pero debemos estar preparados para el peor de los casos. Así que diría que hay al menos un 1 % de probabilidad de que el Día Q sea en 2032, y lo más probable es que sea un porcentaje de dos dígitos. Varios expertos te dirán que en algún momento entre 2031 y 2038. Uno de mis amigos en la industria, Steve Bryley, fundador y director ejecutivo de una de las empresas de corrección de errores cuánticos más grandes del mundo, que casualmente tiene su sede en Cambridge, donde yo estoy: su Día Q personal era 2032, pero ha mantenido esta fecha durante 15 años

#### ¿Cuándo es el Día Q y cómo nos preparamos? (5:08) {#when-is-q-day-and-how-do-we-prepare-508}

y siempre se ha mantenido igual.

**Ryan Sean Adams:** Vaya, es una continuidad impresionante.

**Justin Drake:** Y básicamente, solo necesitas extrapolar las exponenciales y ahí es donde terminas. Así que lo que estamos intentando hacer con Ethereum es asegurarnos de tener todo resuelto mucho antes de 2032. Y mi fecha de finalización para que Ethereum sea completamente seguro a nivel poscuántico es 2029.

**David Hoffman:** Hace un año te tuvimos aquí con Scott Aaronson, quien es una especie de padrino en este espacio. Hicimos algunas preguntas sobre el Día Q. ¿Es una buena definición del Día Q el día en que las computadoras cuánticas puedan romper nuestros esquemas de firma como ECDSA? ¿Es eso lo que realmente significa el Día Q?

**Justin Drake:** Sí, exactamente. Así que tenemos este nuevo término llamado CRQC: computadora cuántica criptográficamente relevante (por sus siglas en inglés). Si entrecierras un poco los ojos, la Q del medio se convierte en una O y es como un cocodrilo, "croc". Ahí es cuando se vuelve relevante para nosotros. Es posible que haya otras aplicaciones que hagan que las computadoras cuánticas sean útiles para la química o la física, pero eso vendrá un poco más tarde.

**David Hoffman:** Recuerdo que dijo que estaba siendo algo cauteloso en ese momento. Esto fue hace un año, en enero de 2025, y dijo que en 10 años deberíamos tener computadoras cuánticas útiles y tolerantes a fallas, pero tuvo mucho cuidado en decir que eso no significaba que seríamos capaces de romper ECDSA. No quiso comprometerse con una fecha porque dijo que era un problema de ingeniería asombrosamente difícil. He notado que su tono ha cambiado durante el último año y, de hecho, se ha unido a algunas organizaciones y fundaciones para ayudar a las criptomonedas a navegar el panorama cuántico. ¿Se debe esto a las tres razones que enfatizas: avances en algoritmos, corrección de fallas que nos permite escalar los cúbits lógicos y, luego, los miles de millones en financiamiento de capital de riesgo invertidos en ello? ¿Ha cambiado su opinión?

**Justin Drake:** No puedo hablar por él, pero una cosa que debemos tener en cuenta es que Scott es principalmente un teórico. Durante mucho tiempo estuvo trabajando en la teoría, no tanto en el día a día de las computadoras cuánticas, y creo que esa fue en parte la razón por la que fue tan cauteloso. Lo que está sucediendo cada vez más es que hay empresas reales, emprendedores reales construyendo estas cosas y él tiene una visión desde adentro. Básicamente está asimilando toda esta información. Una de las cosas que dijo recientemente es que el gobierno de los EE. UU. está comenzando a intervenir en la publicación de ideas. Así que tenemos empresas y académicos que podrían idear mejoras para el algoritmo de Shor, y estas no se están divulgando por completo, potencialmente por razones de seguridad nacional.

#### Qubits físicos, qubits lógicos y cómo romper ECDSA (10:11) {#physical-qubits-logical-qubits-and-breaking-ecdsa-1011}

**David Hoffman:** Vaya. De acuerdo. Parece que los gobiernos se están involucrando en esto. En realidad, no estamos seguros de todo el trabajo que se está llevando a cabo entre bastidores; por ahora solo somos conscientes del trabajo comercialmente viable. Sobre el tema de los qubits lógicos, dijiste que ahora mismo tenemos un qubit lógico. Hay qubits físicos y qubits lógicos, y lo que hay que escalar son los qubits lógicos. Para romper ECDSA, ¿cuántos qubits lógicos necesitamos realmente? Esa es una métrica que estoy observando, pero ¿es siquiera el número correcto? He oído a gente hablar de que se necesitan mil, o tal vez 1.500. ¿Es este un número al que deberíamos prestar atención?

**Justin Drake:** Sí, hay múltiples métricas relevantes. Está el número total de qubits físicos, el número total de qubits lógicos y también el número total de pasos que se necesitan para ejecutar el algoritmo. Y esto tiene un impacto real porque va a determinar si se tarda un minuto en romper una clave, un día, una semana, un mes o un año.

**David Hoffman:** ¿Y cuáles son los factores de escala para cada uno de ellos: físicos, lógicos y luego el tiempo para ejecutar el algoritmo?

**Justin Drake:** En términos generales, el número de qubits físicos para obtener un qubit lógico hoy en día es de unos pocos cientos, digamos mil. Lo que debería ocurrir es que la calidad de los qubits físicos, las llamadas fidelidades, debería aumentar, y también deberíamos idear mejores códigos de codificación de borrado que mejoren esta proporción. Así que es posible que en el futuro solo necesitemos 100 qubits físicos por cada uno lógico, o tal vez solo 10.

Cuando observas el algoritmo para romper el logaritmo discreto y ECDSA, en términos generales es un pequeño múltiplo del número de bits en la curva. Estamos trabajando con esta curva llamada secp256k1. El 256 significa 256 bits. Así que tomas este número y lo multiplicas por cinco o seis, y eso te dará aproximadamente el número de qubits lógicos que necesitas, así que digamos 1.500. Como hoy estamos en un qubit lógico, en cierto sentido estamos a tres órdenes de magnitud de distancia, como tres 10x para llegar allí. Pero, de nuevo, vamos a tener mejoras en el lado de la corrección de errores que reducirán esa proporción, y mejoras en el lado algorítmico que reducirán el número de qubits lógicos necesarios.

Ahora, en cuanto a los tiempos de ejecución, esto es bastante interesante porque hay dos tipos de computadoras cuánticas: de reloj rápido y de reloj lento. El reloj rápido funciona muy rápido, casi a la velocidad de la luz. Tienes las computadoras cuánticas superconductoras y las computadoras cuánticas fotónicas; las fotónicas, como su nombre indica, usan fotones, luz, lo que explica por qué son tan rápidas. Luego tienes el reloj lento: iones atrapados y átomos neutros. Los nombres no importan realmente, pero en términos generales operan mil veces más lento. Cada arquitectura y modalidad tiene sus propias ventajas y desventajas. Así que es muy posible que al principio veamos que una modalidad de reloj lento se imponga en el sentido de que serán los primeros en romper una clave, pero les llevará mucho tiempo: podría llevarles una semana o un mes. Así que, en cierto sentido, el Día Q no es totalmente blanco o negro; habrá un período en el que estará algo roto, pero solo para las direcciones de mayor valor.

**David Hoffman:** Interesante. Pero el Día Q también podría ocurrir entre bastidores sin que sepamos lo avanzados que estamos realmente.

**Justin Drake:** Sí. Y si de hecho va a ser un estado nación el que tenga acceso a estas computadoras cuánticas primero, a menos que las cripto jueguen un papel sistémico importante en el mundo, lo más probable es que usen sus poderes para atacar cosas de manera sigilosa, por ejemplo, espiar a sus adversarios. Así que eso juega a nuestro favor. Pero si estás tratando con una entidad puramente racional motivada por el dinero, de hecho podrían ir a por Bitcoin o Ethereum.

#### Centros de datos cuánticos y el escenario de ataque del Día Q (15:10) {#quantum-data-centers-and-the-q-day-attack-scenario-1510}

**David Hoffman:** Última pregunta sobre los cúbits. ¿Se están construyendo centros de datos de computación cuántica en este momento? Tenemos esta construcción masiva de centros de datos para la IA. ¿Está empezando a ocurrir algo similar con las computadoras cuánticas?

**Justin Drake:** Sí. Estaba leyendo este comunicado de prensa de Continuum. Están construyendo una computadora cuántica basada en fotónica y son muy sigilosos. Recaudaron mucho dinero (miles de millones de dólares, en parte del gobierno australiano) y de alguna manera quieren crear computadoras cuánticas de un solo golpe. Gran parte de lo que hacen otras empresas es construir pequeñas pruebas de concepto y luego escalar, pero ellos quieren construir todo desde el primer día. Así que están construyendo este centro de datos masivo. Creo que esto se debe a la modalidad: la fotónica no requiere las temperaturas realmente frías que requieren otras modalidades como la superconductividad. Así que puedes tomar un centro de datos de aspecto mucho más tradicional y poner tu computadora cuántica allí.

**Ryan Sean Adams:** Acabas de hablar de cómo el Día Q no es realmente blanco o negro. Hay un montón de cosas diferentes sobre una cadena de bloques que son relevantes para lo cuántico, cada una con un nivel diferente de susceptibilidad cuántica. Pero quiero tomar la postura de que en realidad el Día Q es un evento específico y agudo: es cuando ocurre el ataque real y, como resultado, algo se rompe. Tal vez eso sea diferente para distintas cadenas de bloques porque los perfiles de riesgo de las diferentes cadenas de bloques no son uniformes. Pero podemos hablar sobre el Día Q para Bitcoin bajo la suposición de que Bitcoin no hace nada. Si asumimos que Bitcoin no se adapta, hay un día específico en el que Bitcoin es atacado. ¿Cómo se vería eso? ¿Qué pasaría ese día? ¿Cuál es el objetivo más fácil para que una computadora cuántica ataque a Bitcoin?

**Justin Drake:** Básicamente, tienes que observar los incentivos para atacar. El movimiento racional para un atacante es ir a buscar las direcciones más grandes y, de hecho, tal vez incluso antes de eso, ir a buscar direcciones donde haya privacidad perfecta o direcciones donde haya negación plausible. Permíteme repasar esto uno por uno. El primer objetivo probablemente será Zcash, porque si atacas Zcash puedes acuñar un número arbitrario de ZEC y nadie lo sabrá. Así que el Día Q no se hará público.

**David Hoffman:** Espera, solo para ser claros: ¿Zcash no es seguro a nivel poscuántico en este momento? ¿A pesar de que está usando ZK-SNARKs y todo esto?

**Justin Drake:** Sí, está usando SNARKs que se basan en curvas que son susceptibles de ser rotas por computadoras cuánticas.

**David Hoffman:** De acuerdo. Y luego, un posible grupo de víctimas podrían ser personas que han muerto y simplemente perdieron sus monedas. Si alguien roba sus monedas, nadie se va a quejar: hay un cierto grado de negación plausible.

**Ryan Sean Adams:** Pero nos daríamos cuenta de eso, quiero decir, si empezáramos a ver monedas de personas...

**Justin Drake:** Sí y no, porque ya lo estamos viendo hoy. Cada trimestre más o menos hay alguna dirección zombi que no se ha movido en 13 años, y resucitan, y nadie sabe la verdadera razón.

**Ryan Sean Adams:** ¿Verdad? Es como una billetera de Bitcoin de 13 años que no ha tenido una transacción desde que minaron los 50 bitcoins hace una eternidad, y hace su primera transacción en 13 años. Ya sea que esa persona siga viva y simplemente esté despertando una billetera inactiva o que sea un ataque de computación cuántica, un espectador ingenuo que solo mire la cadena de bloques de Bitcoin no puede notar la diferencia.

**Justin Drake:** Exactamente. Sí. Y luego probablemente irías a atacar al pez más gordo, que podría ser algún exchange que no ha implementado la infraestructura correcta para protegerse. Resulta que hay una mitigación muy fácil para las computadoras cuánticas, al menos para las primeras: no reutilices tus direcciones. Cuando reutilizas tu dirección, reutilizas la clave pública, y eso significa que un atacante tiene tiempo para descifrar la clave privada correspondiente y luego robar tus fondos la segunda vez que usas la dirección. Así que la mejor práctica debería ser que si mantienes fondos en almacenamiento en frío a largo plazo, debería ser una dirección limpia para la cual la clave pública correspondiente nunca se haya revelado. Solo para dejar esto muy claro: lo que una computadora cuántica te permite

#### Direcciones vulnerables de Bitcoin y las monedas de Satoshi (20:08) {#vulnerable-bitcoin-addresses-and-the-satoshi-coins-2008}

hacer es pasar de la clave pública de vuelta a la clave privada. Así que realmente pone en peligro los cimientos de la propiedad.

**Ryan Sean Adams:** Así que las monedas inactivas durante mucho tiempo, sin importar en qué cadena de bloques estén, que hayan tenido su clave pública expuesta —que no son todas las monedas inactivas, pero sí un gran porcentaje— están en riesgo. Estas son las monedas de Satoshi. Satoshi tiene sus monedas en una billetera que la gente conoce. Por eso las llamamos las monedas de Satoshi, porque sabemos dónde están. ¿Qué porcentaje de bitcoins son susceptibles a esto?

**Justin Drake:** Sí, hay una página web llamada "Qisk List" —escrita con Q en lugar de C— de esta empresa llamada Project 11, donde tienen este panel que te da una vista en vivo de las direcciones vulnerables. Creo que es del orden del 35 %.

**David Hoffman:** El 35 % de los bitcoins.

**Justin Drake:** Sí. Así que millones de Bitcoin, digamos seis o siete millones. Sí, eso son cientos de miles de millones de dólares. Y tienes razón en que incluye el millón aproximado de BTC que posee Satoshi. Ahora, una de las características interesantes de los BTC de Satoshi es que todos están en incrementos de 50 Bitcoin, porque esa era la recompensa de bloque y él usaba una dirección nueva cada vez que minaba. Así es como estaba programado el software por defecto en aquel entonces. Si toma, digamos, un día o incluso 10 minutos hackear una clave pública, verás que las monedas de Satoshi se drenan aproximadamente al mismo ritmo al que fueron minadas en ese entonces: una vez cada 10 minutos más o menos.

Será un proceso extendido en el tiempo. Y una consecuencia interesante es que si eres un pez pequeño y tienes significativamente menos de 50 bitcoins en tu dirección, entonces estás bien. Estás de alguna manera protegido por Satoshi antes que tú.

**David Hoffman:** ¿Verdad?

**Justin Drake:** Sí. Exactamente.

**Ryan Sean Adams:** En la analogía de huir de los zombis, solo necesitas no ser el más lento. En este caso, necesitamos no tener las billeteras más grandes que sean cuánticamente inseguras, porque simplemente irán a por las billeteras más grandes.

**Justin Drake:** Exactamente.

**David Hoffman:** Así que el Día Q ocurre en un escenario de Justin Drake: tal vez Zcash sea el primero en sufrir algún tipo de ataque, luego podrías ver algunas direcciones en cadena que no son muy notorias porque el atacante no querrá llamar la atención. Algunas direcciones en Bitcoin, pero luego el atacante intensificaría las cosas e iría a por fuentes de tesoros cada vez más grandes. Ahora, según tengo entendido por los artículos de Nick Carter, hay una parte del suministro de Bitcoin en el escenario de monedas perdidas: ya sea que el individuo haya fallecido, haya perdido sus claves privadas o sea el propio Satoshi. Creo que Nick estimó el umbral mínimo en 1,7 millones de Bitcoin, lo que sería el 8,6 % del suministro minado. Esto es menos del 35 % susceptible a ataques. Las personas que intenten mantenerse un paso por delante del ataque zombi se moverán a direcciones no susceptibles. Pero si las monedas están perdidas, si no hay acceso a las claves privadas, no puedes moverlas. Y luego otras estimaciones dicen que podría llegar a ser hasta el 15 % de Bitcoin susceptible. ¿Qué números has visto?

**Justin Drake:** Sí, así que el número aproximado que tengo en mente está en línea con esos. Son unos 2 millones de Bitcoin, digamos el 10 %. Tenemos el millón de Satoshi y luego aproximadamente otro millón que no se ha movido durante mucho tiempo. Necesitamos descontar parte de eso porque algunas direcciones zombis son legítimas y revivirán, pero también deberíamos aumentarlo porque podría haber algunas direcciones gastadas recientemente que se perderán. Así que del 5 al 15 % es el rango correcto. Yo apostaría por alrededor del 10-12 %, lo cual es muy considerable: definitivamente en los cientos de miles de millones de dólares.

#### El debate entre quemar o rescatar para Bitcoin (25:24) {#the-burn-vs-salvage-debate-for-bitcoin-2524}

Uno podría analizar la teoría de juegos aquí. La opción A es intentar quemar las monedas. La ventaja es que no tienes los cientos de miles de millones de dólares de presión de venta. Si analizas esto con una visión a corto plazo, es el movimiento racional. Pero toda la historia de Bitcoin se basa en fuertes derechos de propiedad, así que si tienes una visión a más largo plazo, no deberías querer quemar las monedas. Es muy difícil saber qué camino tomará la comunidad. Es posible que, en última instancia, la decisión la tomen los grandes tenedores, por ejemplo, Michael Saylor y MicroStrategy. Porque estos grandes tenedores recibirán una copia de ambas versiones de Bitcoin (la que tiene la quema y la que no) y pueden elegir deshacerse de la que no les gusta. Y sabemos que Saylor está a favor de quemar, por lo que él solo podría manipular el mercado y obtener el resultado que desea.

**Ryan Sean Adams:** ¿Podemos aclarar a qué te refieres? ¿Dos opciones para quién? Así que tenemos un escenario posterior al Día Q (si crees que el Día Q se acerca, tendremos, digamos, el 10 % de todo el suministro de Bitcoin que puede ser atacado por quien tenga la mejor computadora cuántica). Pueden entrar y obtener los Bitcoin durante días, semanas y tal vez meses, vaciando estas direcciones una por una. Y ese 10 % puede ser tomado por alguien. Estás diciendo que la comunidad de Bitcoin tiene opciones sobre qué hacer con ese 10 % en la capa social, la capa de la bifurcación dura. Esas opciones son dos.

O bien pueden quemar o congelar las monedas (efectivamente decir que estas son direcciones muertas, sabemos que están muertas, no queremos que sean susceptibles a ataques cuánticos, así que haremos una bifurcación dura y diremos que estas monedas nunca se moverán). Son 21 millones menos el 10 % que se congeló. Esa es una opción.

La otra opción es que simplemente dejen ese 10 % a quien pueda crear la computadora cuántica para que vaya a reclamarlo. Casi como rescatar un naufragio: quien construya el submarino para obtener el oro puede reclamarlo. Pero esas son opciones forzadas. Pase lo que pase, si ocurre el Día Q, la comunidad de Bitcoin tiene que elegir una de esas dos. Ya sea intervenir, quemar y congelar, o dejárselo a cualquier fuerza comercial geopolítica que tenga la capacidad de desarrollar computadoras cuánticas y vaya a reclamar el premio. ¿Es eso lo que estamos diciendo?

**Justin Drake:** Sí, está muy bien dicho. Pero una pequeña corrección: esto no tiene que suceder en el Día Q o después del Día Q. Puede suceder antes. En cualquier momento, la comunidad de Bitcoin o algún subconjunto de ella puede proponer hacer una bifurcación. En el número de bloque de la bifurcación habría dos versiones del activo Bitcoin, al igual que en la bifurcación de Bitcoin Cash. Y, en última instancia, esto lo decide el mercado. Los exchanges configurarán las dos versiones del activo y el mercado decidirá cuál es el verdadero Bitcoin. Y es posible que solo debido a la dinámica de liquidez a corto plazo, la versión que quema las monedas, potencialmente antes del Día Q, sea la que gane.

#### El escenario de Michael Saylor y los puntos de Schelling (30:29) {#the-michael-saylor-scenario-and-schelling-points-3029}

**Ryan Sean Adams:** Cierto. Digamos que soy Michael Saylor, poseo el 2-3% del suministro de Bitcoin, especialmente el suministro líquido. Obtengo ambas copias. Estamos bifurcando la cadena de bloques de Bitcoin al igual que en las guerras de bifurcación de Bitcoin de 2017. Quiero preservar mi valor, así que vendo todos los bitcoins que son susceptibles a ataques cuánticos y conservo todos los bitcoins en la versión que quemó las monedas susceptibles a ataques cuánticos. El precio de la cadena de bloques intacta baja. El precio de la versión con la quema se mantiene alto porque nadie la está vendiendo: Saylor no vende, BlackRock no vende. Entonces estás diciendo que el precio del Bitcoin con el problema cuántico resuelto será más alto y, por las fuerzas del mercado, se convertirá en el Bitcoin canónico.

**Justin Drake:** Sí. Y Michael incluso podría decidir comprar la versión con la quema usando las ganancias de la versión vulnerable y pasar del 5% al cinco y medio por ciento.

**David Hoffman:** ¿Verdad? Pero, ¿no significa esto que debe haber algún nivel de coordinación de arriba hacia abajo sobre qué billeteras se congelan? Claramente podemos etiquetar las monedas de Satoshi y congelarlas, pero luego tenemos que congelar algunas más. Hay algunas billeteras de las que podemos estar bastante seguros: esa persona está muerta. Pero en realidad no sabemos dónde trazar la línea sobre qué billeteras es válido congelar y cuáles son realmente propiedad de humanos que simplemente están inactivas. ¿Existe una línea clara?

**Justin Drake:** Bueno, hay un concepto llamado el punto de Schelling: en ausencia de un coordinador central, ¿cómo se llega a un consenso? Para Bitcoin, el punto de Schelling podría ser el bloque donde ocurre un halving. Podrías elegir el primer halving, el segundo halving o el tercer halving. Eso parece razonablemente y creíblemente neutral: cualquier moneda que no se haya movido desde el segundo halving se considera quemada.

**David Hoffman:** Así que simplemente elegimos una fecha y decimos, oye, si dejas tus bitcoins en una billetera cuánticamente insegura para esta fecha, vamos a quemar tus monedas en esta cadena de bloques secundaria que vamos a bifurcar.

**Justin Drake:** Sí, hay un espacio de diseño relativamente amplio y algunas personas han intentado ser creativas. Por ejemplo, algunas personas están intentando resolver dos problemas de una sola vez (tanto el cuántico como el problema del presupuesto de seguridad), donde la propuesta es tomar los 2 millones de monedas y, en lugar de quemarlas, agregarlas a la emisión. Eso patea el problema del presupuesto de seguridad para más adelante.

**David Hoffman:** Apuesto a que eso se vuelve aún más ambicioso en términos de coordinación de Bitcoin. No sé si quieras sobrecargar la capacidad de coordinación de Bitcoin.

**Justin Drake:** Sí. Si fuera un hombre de apuestas, simplemente apostaría por la quema muy simple, digamos, después del segundo halving.

**David Hoffman:** De acuerdo.

**Ryan Sean Adams:** Sin embargo, esto es muy difícil, porque volviendo a tu punto anterior, Justin, esto destruye la narrativa de incorruptibilidad, la narrativa de los derechos de propiedad. Cualquier decisión sobre un congelamiento o una quema destruye en cierta medida la naturaleza pura de lo que es Bitcoin. Así que Nick Carter en sus ensayos plantea una historia diferente: no un escenario de quema y congelamiento, sino el escenario de salvamento. En su escenario, un laboratorio cuántico privado rompe ECDSA antes de lo previsto. Resulta que tienen sede en EE. UU. El gobierno de EE. UU. los nacionaliza rápidamente en secreto. Comienzan a adquirir el Bitcoin, coordinan con la Tesorería, coordinan con los grandes proveedores de ETF, BlackRock, los Michael Saylor del mundo. Y al final, EE. UU. termina con el 10% del suministro de Bitcoin en la Tesorería. Él repasa gráficos de precios ficticios: cuando la gente se da cuenta de que la red Bitcoin está bajo un ataque cuántico, el precio se desploma un 73%. Pero luego, cuando se revela que el gobierno de EE. UU. lo tiene y que están usando leyes de salvamento marítimo para confiscarlo legalmente, el mercado se recupera porque EE. UU. tiene esta tesorería de reserva estratégica de Bitcoin. Así que ese es su otro escenario. ¿Te parece plausible? Porque al menos en ese escenario no estás violando ningún derecho de propiedad.

Ciertamente es increíble que esto le haya pasado a una red de varios billones de dólares con semejante botín de recompensa. No tiene precedentes. Pero eso también podría suceder, y tal vez sea un mejor resultado para Bitcoin.

#### Prueba de frase semilla y el problema del tamaño de la firma poscuántica (35:06) {#proof-of-seed-phrase-and-the-post-quantum-signature-size-problem-3506}

**Justin Drake:** Sí. Tengo un par de ideas. La primera es que hay una forma bastante sofisticada de demostrar la propiedad de Bitcoin sin pasar por la clave privada. Esto se conoce como prueba de frase semilla. La forma en que se deriva una dirección de Bitcoin consta de tres pasos: paso uno, generas tu frase semilla; paso dos, haces algunas manipulaciones en la frase semilla, incluyendo el hashing, para derivar tu clave privada; luego, a partir de la clave privada, derivas la clave pública, que es la dirección que va en cadena. Ahora, lamentablemente, la clave privada ya no es algo que pueda demostrar la propiedad. Pero debido al paso de hashing, si conoces tu frase semilla, eso sigue siendo una prueba de propiedad. Así que una cosa que podría suceder —y técnicamente hablando es el camino más sólido a seguir— es congelar los Bitcoin pero permitir que cualquiera reviva sus Bitcoin con una prueba de frase semilla.

Ahora bien, la prueba de frase semilla es lamentablemente bastante complicada. Requiere un SNARK, una prueba de conocimiento cero, por lo que complicaría significativamente a Bitcoin. Pero mi predicción es que Bitcoin va a tener SNARKs para resolver el problema del tamaño de las firmas poscuánticas. Bitcoin es muy conocido por no querer aumentar el tamaño de su bloque. Desafortunadamente, las firmas poscuánticas son aproximadamente 10 veces más grandes que ECDSA. Para darte los números concretos: ECDSA es de 64 bytes, una firma minúscula. La firma poscuántica estandarizada por el NIST más pequeña es Falcon, que tiene 666 bytes, más de 10 veces más grande. Si ingenuamente cambias ECDSA por algo seguro a nivel poscuántico sin aumentar el tamaño del bloque, tu capacidad de procesamiento se reduce aproximadamente 10 veces. Tus TPS en Bitcoin pasarán de tres a 0.3, lo que en mi opinión es inviable.

Lo que estamos construyendo para Ethereum es esta sofisticada tecnología de agregación de firmas poscuánticas para que no pongas las firmas sin procesar en cadena, incluso si son grandes; solo pones esta prueba de agregación. Y mi apuesta es que Bitcoin va a adoptar la solución que desarrolle Ethereum, porque simplemente no hay otro camino técnicamente sólido a seguir.

**Ryan Sean Adams:** Entiendo. Y es por eso que apuestas en contra del escenario de rescate: porque crees que optarán por este enfoque, y si lo hacen, les da una forma de congelar los activos de manera más creíble y neutral. Si puedes demostrar la propiedad, puedes acceder a los antiguos Bitcoin heredados.

**Justin Drake:** Sí. Ahora, lamentablemente, si eres un maximalista de los derechos de propiedad, esto no es completamente satisfactorio.

**Ryan Sean Adams:** No.

**Justin Drake:** Y la razón es que hay un subconjunto de direcciones congeladas para las cuales no se conoce ninguna frase semilla. El estándar de la frase semilla solo llegó varios años después del bloque génesis. Así que todas las primeras direcciones —todas las direcciones de Satoshi, por ejemplo— no tendrán una frase semilla correspondiente. Y hay algunas billeteras, por ejemplo, las billeteras basadas en MPC, donde no hay una frase semilla correspondiente. Así que no es una solución perfecta, pero te resuelve el 80 %.

**David Hoffman:** Qué desastre. Esto es un desastre sin importar por dónde lo mires.

**Justin Drake:** Sí. La otra cosa que quería destacar es que mucha gente piensa que cuando robas Bitcoin, el precio de BTC se desplomará y el activo que has robado no valdrá nada.

Pero en realidad hay una forma de cubrirse contra el precio de Bitcoin, que es muy fácil: simplemente te pones en corto con BTC. Digamos que sabes con certeza que has descifrado la clave privada de una billetera que contiene 100,000 BTC. Te pones en corto con 100,000 BTC. Eso asegura tus ganancias. Y luego, sin importar lo que haga el precio de Bitcoin, has asegurado tus ganancias, que podrían ser decenas de miles de millones de dólares.

#### El desafío de la capa social de Bitcoin y la ventaja de Ethereum (40:07) {#bitcoins-social-layer-challenge-and-ethereums-advantage-4007}

**David Hoffman:** Ahora, quiero señalar que Justin, tú piensas de una manera particular, y tu forma de pensar es la razón por la que estás en Ethereum. Si fueras un bitcoiner, pensarías de otra manera. La forma de pensar de un bitcoiner es muy única, muy distinta: una especie de maximalista de los derechos de propiedad. Creo que lo que Justin haría si estuviera a cargo de Bitcoin es muy diferente de lo que haría el conjunto general de los bitcoiners. No tengo una pregunta concreta aquí, pero solo quiero resaltar eso.

**Ryan Sean Adams:** Oh, sí. Lo que hacen los bitcoiners probablemente no sea lo que tú vas a hacer. La acusación de Nick Carter es que, básicamente, lo que muchos de los desarrolladores principales de Bitcoin están haciendo es esconder la cabeza en la arena y decir que el Día Q (Q-Day) no es real o que no lo será hasta dentro de 20 o 30 años.

**Justin Drake:** Para ser claros, mi predicción de que la quema ganará es una predicción de lo que creo que es más probable. No es lo que yo haría: de hecho, no tocaría Bitcoin y respetaría los derechos de propiedad. No tengo esta preferencia temporal a corto plazo, y creo que muchos bitcoiners estarán de acuerdo conmigo. Pero, lamentablemente, Michael Saylor tiene una influencia tan fuerte que, en cierto sentido, Bitcoin se ha centralizado en la capa social, y eso conlleva un gran poder y una gran responsabilidad.

**Ryan Sean Adams:** De hecho, estoy de acuerdo contigo. Eso es lo que yo también haría. Dejaría que ocurriera la búsqueda del tesoro, que ocurriera el rescate. No tocaría nada. Esa es la clave de lo que hace Bitcoin, y simplemente dejaría que las cosas caigan por su propio peso. Sin embargo, déjame hacerte la misma pregunta. No es solo una parte del suministro de Bitcoin la que es insegura en la era poscuántica: Ethereum también tiene este problema, pero con un porcentaje diferente del suministro. ¿Puedes plantear ese mismo problema? Llegamos a un escenario posterior al Día Q. Alguien se está llevando los Bitcoin de Satoshi. ¿Qué está pasando en Ethereum en este momento? ¿Qué porcentaje del suministro sería susceptible? Digamos que Ethereum aún no ha resuelto el problema cuántico.

**Justin Drake:** Una ventaja que tiene Ethereum es que no existe ese 5% del suministro controlado por una sola persona, Satoshi, que se cree que está perdido. La otra ventaja es que Ethereum es menos antiguo y tuvo un precio desde el primer día. Así que había una razón para cuidar tu ether desde el principio, mientras que en los primeros días de Bitcoin, era solo dinero de Monopoly y la gente no tenía muy buena higiene con sus claves privadas. Por lo tanto, es mucho más probable que los 1,7 millones de BTC de Nick Carter estén realmente perdidos.

Cuando estaba en el proyecto Ultrasound, una de las cosas que intentábamos hacer era calcular la cantidad de monedas perdidas conocidas para agregarlas al panel de control además de la quema. Era una cantidad tan insignificante que ni siquiera nos molestamos.

**David Hoffman:** ¿Qué pasa con el hackeo de Parity? ¿No es una gran parte?

**Justin Drake:** Sí, muy buen punto. Ese era el elemento número uno en la lista. Pero resulta ser un contrato inteligente inutilizado que no es vulnerable a las computadoras cuánticas.

**David Hoffman:** Entonces el—

**Ryan Sean Adams:** En realidad, solo está atascado. No se trata de no tener las claves privadas. Está literalmente atascado.

**Justin Drake:** Está inutilizado. Sí. Exactamente. Y luego hay algunos estudios de casos de personas (si realmente investigas en las discusiones de Reddit encontrarás cosas), pero en el panorama general es un total de menos del 0,1%. Ese es el suministro perdido conocido. Pero siendo realistas, se revelará que algunas monedas están perdidas más cerca del Día Q. Si tuviera que adivinar, estaría en un solo dígito bajo: tal vez 2, 3, 4 o 5%.

**David Hoffman:** Entonces crees que como máximo entre el 2 y el 5% del suministro de Ethereum está tanto perdido como en direcciones vulnerables a ataques cuánticos.

**Justin Drake:** Exactamente. Sí. Si tuviera que hacer una predicción concreta, diría que alrededor del 2%, lo que es aproximadamente un orden de magnitud menos que Bitcoin. Y esta diferencia cuantitativa tiene consecuencias cualitativas: en el caso de Ethereum, yo abogaría firmemente por no hacer nada y realmente respetar los derechos de propiedad, porque al final del día, un 2% no es gran cosa. En el caso de Bitcoin, un 15% es un problema enorme.

#### La actualización poscuántica de tres capas de Ethereum (45:05) {#ethereums-three-layer-post-quantum-upgrade-4505}

**David Hoffman:** Así que Ethereum tendrá que tomar esta misma decisión. Digamos un 3 %: si congelar y quemar o simplemente dejar que sea una búsqueda del tesoro. Tu esperanza es que optemos por la opción de la búsqueda del tesoro, lo que significa que algún atacante cuántico se llevará ese 1-3 % de ether. Y si miras el panorama general, básicamente nos estamos moviendo hacia que el ether sea un dinero mucho mejor que BTC. Será no intervencionista, respetuoso con los derechos de propiedad, seguro a nivel cuántico y no tendrá el problema del presupuesto de seguridad que va a afectar a Bitcoin en un par de halvings. Así que creo que esta es una gran oportunidad para el activo.

**Ryan Sean Adams:** Bien. Hemos hablado del aspecto social. También tenemos que afrontar muchos retos técnicos. Quiero sacar a colación este tuit de Hasu Kareshi, amigo del programa. Estaba citando un tuit de Vitalik sobre la hoja de ruta cuántica de Ethereum y dijo: "Ethereum tiene una hoja de ruta más difícil para volverse poscuántico que Bitcoin; en realidad, hay muchas dependencias antes de poder abordar las EOA y las claves privadas debido a los tamaños de las pruebas poscuánticas". Así que su opinión es que los retos que le esperan a Ethereum son mucho más difíciles que los de Bitcoin. ¿Qué opinas?

**Justin Drake:** Hay dos problemas que resolver: el técnico y el social. En el aspecto técnico, Hasu tiene razón en que básicamente hay tres problemas que Ethereum tiene que resolver: cada una de las diferentes capas. Está la capa de consenso, donde tenemos BLS. Está la capa de datos, donde tenemos KZG. Y la capa de ejecución, donde tenemos ECDSA. Cada una de estas piezas de criptografía es vulnerable. Eso es un superconjunto de Bitcoin, que solo tiene el problema de ECDSA. Así que, en cierto sentido, tenemos tres veces más cosas que actualizar.

Pero cuando miras el panorama general, yo diría que el problema más grande, tal vez el 80 %, es social. Ya hemos tocado el tema de si quemar o no. Pero hay algo aún más fundamental: ¿aceptamos siquiera que esto es un problema? En el mundo de Bitcoin hay una respuesta inmunológica que básicamente rechaza cualquier narrativa que pueda ser mala para el precio. Tienes a personas como Adam Back diciendo que los ordenadores cuánticos están al menos a décadas de distancia. Así que el paso cero es algún tipo de aceptación de que hay un problema. Y es posible que Bitcoin llegue un poco tarde, lo que tendría consecuencias mucho mayores que en el lado tecnológico.

**David Hoffman:** Entonces, ¿crees que en general Bitcoin tendrá un problema más difícil porque su capa social simplemente no está reconociendo esta realidad y está menos dispuesta a participar?

**Justin Drake:** Sí. Déjame decir esto: estoy dispuesto a apostar una gran cantidad a que las tres capas de Ethereum se actualizarán antes que la única capa de Bitcoin.

**David Hoffman:** Cierto. Así que tenemos un problema tres veces mayor. Pero en el lado de Ethereum es solo un problema de ingeniería al fin y al cabo. Y no solo eso, es un problema de ingeniería que Ethereum está afrontando directamente. Mientras que el problema de ingeniería de Bitcoin es menor, es un problema social, un problema de coordinación, que es fundamentalmente más difícil de superar.

**Justin Drake:** Sí. Exactamente. E incluso en el aspecto técnico, este es un problema en el que hemos estado trabajando durante casi una década. Si retrocedes a 2018, le dimos una subvención de 5 millones de dólares a StarkWare para estudiar los SNARK poscuánticos basados en hash y sentar las bases con funciones hash compatibles con SNARK. De aquí es de donde surgió la función hash Poseidon. Más recientemente, en 2024, se anunció la Lean Consensus Chain, anteriormente conocida como Beam Chain. Tuvimos talleres poscuánticos en Cambridge el año pasado. Ahora tenemos un equipo poscuántico dedicado con Tom y Emil. Y tenemos esta hoja de ruta que

*(50:00)*

#### Actualización de la capa de ejecución: agregación de firmas (50:00) {#upgrading-the-execution-layer-signature-aggregation-5000}

realmente detalla algunos de los hitos clave para realizar estas actualizaciones.

**Ryan Sean Adams:** ¿Podemos hablar de cada uno de esos problemas uno por uno? Sé que Justin puede entrar en detalles extremos con la criptografía; querremos mantener esto a un nivel que David y yo podamos entender. Pero sí entendemos las diferentes capas de la pila de Ethereum. Tal vez podamos empezar con la capa de ejecución, porque eso ha sido de lo principal que hemos hablado. ECDSA es el esquema de firma detrás de las direcciones de Bitcoin y Ethereum; eso es lo que se descifraría en un mundo poscuántico. ¿Cuál es la ruta de actualización para ECDSA? Es una herramienta criptográfica de larga data, ¿tenemos algo que pueda reemplazarla?

**Justin Drake:** Sí. En primer lugar, permítanme destacar que esta es una tarea muy grande: estamos cambiando fundamentalmente los pilares de las cadenas de bloques, la criptografía base, y cambiándola por algo nuevo con propiedades completamente diferentes. Ahora, si fueras una persona inexperta, tu respuesta podría ser: "Es simple. Tenemos al NIST, el Instituto Nacional de Estándares y Tecnología. Han organizado una competencia de firmas poscuánticas y han seleccionado algunas, a saber, Falcon, Dilithium y SPHINCS+. Solo necesitamos elegir una o varias de estas opciones".

El problema es que el NIST no ha diseñado para el caso de uso de la cadena de bloques. Han diseñado para firmas individuales para mensajes individuales utilizados en internet. En el contexto de las cadenas de bloques, tienes lotes de transacciones (para Bitcoin, miles de transacciones por bloque). Y tenemos este problema de tamaño con las firmas poscuánticas que son al menos 10 veces más grandes, si no 100 veces más grandes. En mi opinión, es totalmente inviable considerar estas firmas individuales empaquetadas y concatenadas ingenuamente en bloques.

La única solución que veo se llama agregación de firmas, donde tomas múltiples firmas y las comprimes en una multifirma. Verificar esta multifirma maestra es lo mismo que verificar todos los componentes individuales. Cuando observas el espacio de diseño para las firmas poscuánticas agregables, no hay muchas opciones. Esencialmente hay una opción que es viable en mi opinión: hacer uso de SNARKs, específicamente SNARKs poscuánticos. Básicamente hay una familia principal: los SNARKs basados en hash.

La idea básica es que tomas firmas poscuánticas individuales y pruebas el conocimiento de todas ellas para terminar con una prueba SNARK final. Ahora, si vas a optar por SNARKs basados en hash, también podrías optar por firmas de hoja basadas en hash (las firmas sin procesar no agregadas). La razón es que esto te brinda beneficios de simplicidad y seguridad. Son las suposiciones de seguridad más mínimas que puedes tener: solo estás asumiendo que tu función hash es segura. En el mundo de las cadenas de bloques, las funciones hash son fundamentales. Las tenemos en todas partes: para construir bloques, árboles de Merkle, árboles de estado y cadenas de bloques donde el encadenamiento se realiza con hashes.

La Fundación Ethereum ha puesto mucho esfuerzo en comenzar con firmas basadas en hash y hacerlas lo más compatibles posible con SNARK para que el costo de agregación sea lo más bajo posible. Me complace informar que el rendimiento de este enfoque es en realidad lo suficientemente bueno para todas las cadenas de bloques. Cualquiera que sea la capacidad de procesamiento de tu cadena, puedes tener un agregador en un hardware razonable (por ejemplo, la CPU de una computadora portátil) agregando todas estas transacciones y produciendo una prueba final que se acompaña con el bloque.

Y una de las cosas irónicas de este enfoque es que en realidad es un aumento de escalabilidad en relación con lo que tenemos hoy. La razón es que no tienes el costo fijo de 64 bytes por transacción. Las transacciones tienen cero bytes de datos de firma, y luego tienes esta firma maestra que se amortiza en todas las transacciones del bloque.

#### Estableciendo el estándar de la industria con la colaboración de Bitcoin (55:28) {#setting-the-industry-standard-with-bitcoin-collaboration-5528}

**David Hoffman:** Bien. Así que esta es una actualización para muchas otras cadenas de bloques de contratos inteligentes derivadas de Ethereum, especialmente aquellas que se optimizan para la velocidad...

**Justin Drake:** No solo contratos inteligentes, Bitcoin también. ECDSA.

**David Hoffman:** Sí. Correcto. Así que lo que pensaba al empezar este episodio era que cadenas como Solana se verían sobrecargadas por firmas más pesadas, al igual que los TPS de Bitcoin se ralentizan a 0,3 transacciones por segundo. Solana se ralentizaría de manera similar porque las transacciones serían más pesadas en un mundo poscuántico. Pero estás diciendo que con esta tecnología eso no será cierto: en realidad permitirá que las cadenas en general se vuelvan más rápidas.

**Justin Drake:** Sí, exactamente. Al igual que Satoshi con ECDSA estableció un estándar de facto para toda la industria (básicamente copiamos incluso la curva secp256k1, lo cual es muy inusual. Nadie sabe por qué eligió esa curva, pero se convirtió en el estándar de facto). Creo que hay una oportunidad para que Ethereum sea pionero y establezca el estándar de facto.

La estrategia que estamos adoptando es colaborar con los bitcoiners. En el mundo de Bitcoin, hay un par de personas: Mikhail Komarov y Nick Jonas. Ambos son parte de Blockstream y ambos son expertos en firmas basadas en hash. Estamos trabajando con ellos para asegurarnos de que cualquier cosa que desarrollemos en el mundo de Ethereum también sea aplicable a Bitcoin. Y si Bitcoin y Ethereum usan ese estándar, entonces presumiblemente toda la industria también usará el estándar.

**Ryan Sean Adams:** Eso es fantástico. Así que tenemos una manera de resolver la actualización poscuántica de la capa de ejecución sin un impacto en el rendimiento. Pero déjame hacerte otra pregunta: ¿qué pasa con la seguridad? Esta es una criptografía más nueva en comparación con ECDSA, que ha existido desde siempre y tiene el efecto Lindy. ¿Deberíamos preocuparnos de que haya algún tipo de error oculto o vulnerabilidad de día cero que pueda destruir por completo lo que hemos construido?

**Justin Drake:** Tengo algunas ideas al respecto. Nos tomamos la seguridad extremadamente en serio y, en general, espero que la solución que despleguemos sea órdenes de magnitud más segura que lo que tenemos hoy con ECDSA. Déjame explicarte. ECDSA se basa en curvas elípticas: objetos matemáticos estructurados y sofisticados. Es posible que algún matemático inteligente invente un algoritmo para romper el logaritmo discreto usando algún truco matemático sofisticado del que la humanidad no era consciente. Esto ha sucedido en el pasado: tenemos algoritmos cada vez mejores para la factorización y para el logaritmo discreto. Y una posibilidad con la llegada de la IA es que tengamos matemáticos 100 veces más inteligentes que los matemáticos humanos que descubran estructuras ocultas en las curvas elípticas y puedan romper nuestra criptografía. Así que la criptografía que estamos construyendo no solo es poscuántica, también es pos-IA.

Volviendo a lo otro que dije: solo depende de funciones hash. Cualquier esquema de firma depende de dos cosas: la función hash y un supuesto de complejidad adicional opcional que podría ser el logaritmo discreto o, en el caso de las firmas basadas en retículos, retículos estructurados. Pero en el caso de las firmas basadas en hash, no existe este supuesto de complejidad adicional: son solo funciones hash. Si tu función hash es segura, estás bien. Así que, en ese sentido, espero que sea una mejora frente al statu quo.

Ahora hay dos salvedades que quiero destacar. La primera salvedad es que estamos tratando con objetos más complejos, y la solución que tenemos aquí es lo que llamamos verificación formal profunda de extremo a extremo.

#### Verificación formal, Poseidon y la capa de consenso (1:00:33) {#formal-verification-poseidon-and-the-consensus-layer-10033}

Tenemos nuestro objeto criptográfico y queremos demostrar matemáticamente que es sólido: que es imposible falsificar una firma. Y no solo queremos hacer esto para las matemáticas, sino también para el código. Si me hubieras preguntado hace 2 o 3 años si esto era factible, habría dicho que sí, pero era extremadamente laborioso y costoso. Lo que estamos viendo con la llegada de la IA es que este trabajo laborioso y costoso se puede hacer 100 veces más rápido y 100 veces más barato.

Estamos empezando a ver matemáticas de vanguardia a nivel mundial; por ejemplo, un resultado reciente que ganó la Medalla Fields, el equivalente al Premio Nobel de matemáticas. Ese resultado ha sido verificado formalmente por una IA en cinco días. Produjeron medio millón de líneas de código (una prueba verificable por máquina de que este es, de hecho, un teorema válido) y en el proceso encontraron todo tipo de errores tipográficos en el artículo escrito por humanos. Ese es el tipo de diligencia debida que queremos para evitar errores.

Ahora hay otra cosa que quiero destacar: la función hash en sí. Históricamente, las cadenas de bloques se han construido sobre SHA-256 en el caso de Bitcoin, o Keccak en el caso de Ethereum. Nuestra propuesta para el Ethereum poscuántico es introducir otra función hash llamada Poseidon, que es un tipo diferente de función hash porque es compatible con SNARK. Para cuando lancemos Poseidon, debería ser bastante segura: habrá sido analizada durante 10 años completos, habrá estado asegurando muchos miles de millones de dólares a través de las L2 y habrá pasado por el criptoanálisis de todos los principales expertos en el campo. También acabamos de anunciar un premio de 1 millón de dólares para intentar vulnerar Poseidon. Pero, de hecho, es posible que Poseidon pueda ser vulnerada.

Desafortunadamente, la forma en que se diseñan las funciones hash es que no se puede demostrar que sean seguras. Lo mejor que puedes hacer es la ausencia de un ataque: básicamente existe este tiempo de maduración. Y el orden de magnitud que tengo en mente es de ocho años. ¿Por qué ocho años? Porque cuando Satoshi eligió SHA-256 tenía ocho años. Cuando Vitalik eligió Keccak tenía ocho años, casualmente. Así que me gustaría que Poseidon tuviera al menos ocho años, lo cual será así cuando la despleguemos en Ethereum.

**Ryan Sean Adams:** De acuerdo. Así que esa es la capa de ejecución. Rápidamente, ¿podrías hablar sobre la capa de datos? KZG necesita ser actualizado a algo poscuántico, y la capa de consenso donde tenemos firmas BLS. ¿Es eso similar en nivel de esfuerzo a reemplazar ECDSA?

**Justin Drake:** Permíteme comenzar con la capa de consenso porque es una respuesta más sencilla. En una primera aproximación es básicamente un copiar y pegar. Tenemos un concepto similar donde los actores hacen firmas, hay muchas firmas, ocupan espacio y queremos comprimirlas. El problema en la capa de consenso es que tenemos muchas más firmas que en la capa de ejecución. La gente no se da cuenta de esto, pero tenemos un millón de validadores: eso es un millón de firmas por época, 32.000 firmas por slot, miles de firmas por segundo. Es más que Solana en términos de transacciones de voto.

Para desbloquear una cierta optimización de rendimiento solo disponible en la capa de consenso, tenemos esta noción de una firma con estado: los mensajes que firmas tienen un contador que aumenta cada vez. ¿No te recuerda eso a algo? El número de slot. En Ethereum, en la capa de consenso, solo firmarás un único mensaje por slot. Si firmas dos, recibes un recorte. Usamos esta restricción para tener firmas que son 10 veces más eficientes de agregar.

#### Lean VM, la hoja de ruta de Lean Consensus y el cronograma para 2029 (1:05:17) {#lean-vm-the-lean-consensus-roadmap-and-2029-timeline-10517}

Esta es la diferencia principal: funciones hash sin estado en la capa de ejecución frente a firmas con estado en la capa de consenso donde el número de slot se incrementa. La tecnología de agregación tiene un nombre: Lean VM, una zkVM mínima para criptografía basada en hash. Básicamente, Lean VM estaría probando que esta es una raíz de Merkle correcta. Lo principal de lo que aún no estamos completamente seguros es si este enfoque puede desbloquear lo que yo llamo la "frontera del tera gas": 1 gigagas por segundo en la l1, 10.000 TPS, pero de manera aún más ambiciosa, 1 teragas, 10 millones de transacciones por segundo en la l2 utilizando la disponibilidad de datos.

Estamos hablando de 1 gigabyte por segundo de disponibilidad de datos, y la pregunta es si la zkVM puede ser lo suficientemente eficiente como para procesar 1 GB de datos por segundo. Eso aún está por determinarse en función de futuras optimizaciones.

**David Hoffman:** Pero lo que sí sabemos con certeza es que Ethereum tendrá la DA (disponibilidad de datos) para tener 1 giga por segundo para la l1 más un puñado de l2.

**Ryan Sean Adams:** Así que creo que los oyentes podrían estar pensando en este punto: "Bien, parece que Ethereum tiene un plan para actualizarse a la era poscuántica. Están reconociendo que las computadoras cuánticas existirán y que hay un Día Q". Ahora se preguntan sobre el cronograma y el nivel de esfuerzo. Tomé el tuit de la hoja de ruta poscuántica de Vitalik, lo puse en Claude y le pregunté: "¿Cuál es el nivel de esfuerzo aquí?". Claude dijo: "Piensa en esto como un nueve sobre diez". Esta es una de las actualizaciones más significativas que Ethereum hará jamás. Lo comparamos con La Fusión, donde teníamos un avión en pleno vuelo y cambiamos el motor de prueba de trabajo (PoW) por el de prueba de participación (PoS). Ahora estamos cambiando gran parte de la criptografía central. ¿Puedes darnos una idea del alcance de esto? ¿Estaremos listos para 2032? ¿Qué tan difícil es esto? ¿Parece abrumador?

**Justin Drake:** Sí. La respuesta tiene dos partes. Primero, en realidad es incluso más ambicioso de lo que planteaste. El cambio en la criptografía es tan invasivo que es esencialmente una reescritura de la capa de consenso, al menos. Y si vamos a reescribir la capa de consenso, bien podríamos reescribirla adecuadamente: incluir todas las mejoras y limpiar toda la deuda técnica. Ese es el proyecto Lean Consensus, donde estamos agrupando múltiples reescrituras, incluyendo la finalidad de un solo slot con la actualización poscuántica.

Así que sí, es muy ambicioso. Estamos empezando desde cero y construyendo algo increíblemente hermoso, simple, eficiente y con seguridad demostrable. La buena noticia es que empezar desde cero es más simple en muchos sentidos porque no tienes toda la deuda técnica. Podemos reescribir la especificación para que sea lo más mínima y simple posible. De aquí proviene la terminología "lean" (esbelto/ligero): máxima simplicidad, donde toda la función de transición de estado es básicamente mil líneas de código Python que un estudiante de secundaria inteligente puede leer sin problemas.

En este momento tenemos redes de desarrollo para Lean Consensus. Y las especificaciones son tan fáciles de asimilar que hemos visto a unos 10 equipos implementarlas, unirse a la red de desarrollo y hacerlo sin siquiera contactar a la Fundación Ethereum. La barrera de entrada es relativamente baja. Estamos en este mundo donde el desarrollo de IA significa que, en gran medida, puedes programar tu cliente de forma intuitiva. Esa es una gran razón por la que tenemos tantos clientes: a menudo equipos de una sola persona, o equipos de dos o tres personas.

Creo que esto tendrá consecuencias interesantes tanto para la sostenibilidad como para la gobernanza. En cuanto a la gobernanza, la forma en que lo hacemos hoy es, a grandes rasgos,

#### La gobernanza de Ethereum y la fecha de finalización en 2029 (1:10:41) {#ethereum-governance-and-the-2029-completion-date-11041}

que tenemos cinco clientes de la capa de consenso y todos necesitan implementar la actualización para poder avanzar. En el futuro, cuando tengamos 10 o 15 clientes, simplemente podremos requerir el 80 % principal o el 80 % más rápido para poder avanzar. Esa es una competencia más darwiniana que nos permite avanzar mucho más rápido sin esperar al cliente más lento.

**David Hoffman:** Entonces, ¿estaremos listos para 2032? ¿En qué momento estaremos listos?

**Justin Drake:** Toda la hoja de ruta tiene todo planificado hasta 2029,

**David Hoffman:** Que es básicamente la misma hoja de ruta que diste en tu charla de DevCon donde presentaste la Beam Chain. Y en aquel entonces la gente la odió.

**Justin Drake:** Sí, fue mi diapositiva más odiada, porque se extendía a lo largo de cuatro años y medio. Históricamente he sido malo con los plazos: demasiado optimista. Pero a medida que envejezco y me salen canas, he ido mejorando con los plazos. Creo que fue un plazo realista y conservador lo que molestó a la gente. Pero así son las cosas.

**David Hoffman:** También solo para dar contexto, la gente se molestó en parte porque esto fue durante el pico de impulso de Solana frente a una falta percibida de impulso técnico en la hoja de ruta de Ethereum. No fue solo el plazo de cuatro años; también fue el contexto del momento.

**Justin Drake:** Exactamente. Así que ahora estamos a unos tres años de distancia. Estoy relativamente seguro de que podemos alcanzar el hito de 2029, y creo que incluso hay una oportunidad de avanzar más rápido gracias a la IA.

**David Hoffman:** Entonces, para 2029, todo esto estaría implementado si cumple con la hoja de ruta: todo de lo que acabamos de hablar.

**Justin Drake:** ¿Lo prometes? Todo.

**Ryan Sean Adams:** ¿No tengo algo en el fondo de mi cabeza sobre algún viejo desarrollador de software diciéndome que las reescrituras nunca funcionan? ¿Por qué eso no se aplica aquí?

**Justin Drake:** Una buena noticia es que ya hemos hecho este tipo de gran reescritura, como mencionaste, con La Fusión. Cambiamos por completo los cimientos de consenso de Ethereum de prueba de trabajo (PoW) a prueba de participación (PoS). Esa es una prueba de existencia de que se puede hacer. Ethereum no es ajeno a los proyectos ambiciosos: hemos tenido otras cosas muy ambiciosas como danksharding y el muestreo de disponibilidad de datos a una escala similar.

Otra buena noticia es que no tenemos opción. Tenemos que cambiar la criptografía. Es un mecanismo de presión muy fuerte, y eso por sí solo ya es una reescritura del 80 %.

Eso hace que la coordinación y llegar a un consenso sea mucho más simple.

#### Lo cuántico no es solo un problema cripto (1:15:06) {#quantum-isnt-just-a-crypto-problem-11506}

**David Hoffman:** Supongo que deberíamos enfatizar que no es solo Ethereum quien no tiene opción: nadie en el mundo cripto tiene una alternativa a esto. Todos en el sector cripto tienen que hacer una reescritura. Con Bitcoin es solo ECDSA, pero eso en sí mismo es suficiente.

**Justin Drake:** Sí. Es posible que Ethereum tenga que hacer una reescritura mayor que otras cadenas, y esto tiene que ver con el número de validadores. Si solo tienes 100 validadores, puedes absorber el costo de firmas 10 veces más grandes en la capa de consenso. Para la mayoría de las cadenas de prueba de participación (PoS), no necesitas la sofisticación que tenemos nosotros. Pero para Ethereum, esperamos tener decenas de miles de validadores votando en cada slot (miles de firmas por segundo) y tenemos que ser muy creativos.

En lo que estaría de acuerdo contigo es en que tiene que haber un cambio muy grande para todas las cadenas de bloques en la capa de ejecución. Pero la buena noticia para otras cadenas es que Ethereum está haciendo toda la tarea. Estamos construyendo Lean VM, vamos a verificar formalmente todo el sistema, y ellos simplemente pueden copiar y pegar. En gran medida, es un trabajo fácil de integrar.

**Ryan Sean Adams:** Nick Carter tuiteó: "Una de las falacias más tontas es que la gente piense que su moneda va a ganar si tan solo Bitcoin muere, como la gente de Zcash peleando con Bitcoin por lo cuántico. Es precisamente lo contrario. Si Bitcoin muere, nadie volverá a confiar en el dinero de internet. Todas las monedas se benefician del éxito de Bitcoin". ¿Cuál es tu reacción a este sentimiento?

**Justin Drake:** No estoy de acuerdo con Nick Carter. Nick siempre se ha molestado cuando tuiteo sobre el presupuesto de seguridad. Él piensa que es destructivo para toda la industria hablar de esto, a pesar de que los fundamentos se alinean con lo que digo. Irónicamente, él está haciendo lo mismo con lo cuántico que yo estoy haciendo con el presupuesto de seguridad: intentar forzar la discusión y forzar el cambio.

**Ryan Sean Adams:** Sin embargo, ¿qué pasa con la perspectiva general? Digamos que llegamos a 2032, Ethereum es seguro a nivel cuántico, Bitcoin no lo es, Bitcoin es atacado de algunas de las formas que hemos descrito: hay una búsqueda del tesoro en marcha y la incertidumbre del mercado. Lo que Nick está diciendo es que no nos alegremos por eso porque va a ser malo para todas las cadenas en el sector cripto. Él dice que como le vaya a Bitcoin, le irá a todos. Si quieres un meme de dinero de internet como reserva de valor, Bitcoin tiene que liderar esa carga. No existe un escenario de "sorpasso" (flipping) donde Ethereum pueda decir: "Nuestra cadena es segura a nivel poscuántico y no tenemos los problemas que tiene Bitcoin". Él dice que esto hundirá a todo el espacio cripto, al menos desde la perspectiva del dinero de internet como reserva de valor.

**Justin Drake:** No estoy de acuerdo. Solo tienes que mirar el análisis histórico: las conchas marinas fueron reemplazadas por la sal, luego por la plata, luego por el oro, y ahora potencialmente Bitcoin está reemplazando al oro. Solo porque el oro falle no significa que lo siguiente también tenga que fallar. Yo diría que Ethereum es el sucesor muy natural de Bitcoin como dinero de internet. Y solo porque Bitcoin falle no significa que Ethereum tenga que fallar. Estoy de acuerdo en que podría haber algo de dolor a corto plazo, pero también estamos hablando de ganancias a largo plazo.

#### La oportunidad poscuántica y el ajuste de cuentas del presupuesto de seguridad (1:20:27) {#the-post-quantum-opportunity-and-security-budget-reckoning-12027}

**David Hoffman:** Entonces, ¿qué obtenemos al final de esto? En 2030, Ethereum es seguro a nivel poscuántico porque Justin lo prometió. ¿En qué se convierte Ethereum? ¿Es el único en su clase, o esperas que otras cadenas de bloques sigan su ejemplo y también logren la seguridad poscuántica? ¿Puedes describir el sistema que tendremos en 2030 si todo esto se hace realidad?

**Justin Drake:** Un cambio de mentalidad interesante para mí en los últimos meses es que he dejado de pensar en lo poscuántico como un obstáculo a superar. Lo veo más como una oportunidad. Es una oportunidad para que Ethereum se destaque como el primer sistema financiero global que es seguro a nivel poscuántico, no solo en relación con competidores como Bitcoin, sino también en relación con el dinero fiduciario y las finanzas tradicionales (TradFi). Creo que enviaría un mensaje muy fuerte y sería un argumento de venta de seguridad muy natural para que el mundo migre a Ethereum.

No solo es una oportunidad para que Ethereum se distinga de sus pares, sino que también es una oportunidad para que Ethereum se convierta en la mejor versión de sí mismo. Esto nos remite a la idea de que el paso a lo poscuántico es esencialmente una reescritura y que es una oportunidad enorme para empezar desde cero y eliminar la deuda técnica.

Un dato interesante: la cadena de balizas original se lanzó en 2020, y el diseño se congeló un año antes, en 2019. Así que cuando lancemos la cadena de balizas ligera (Lean Beacon Chain) en 2029, estaremos actualizando algo que tiene 10 años. En el mundo cripto, 10 años es una eternidad. Hemos aprendido tanto que la cadena de balizas ligera será muy diferente de la cadena de balizas original. Puedes pensar en ella como una prueba de participación (PoS) 2.0.

**Ryan Sean Adams:** Estamos en un momento muy interesante con respecto a la informática. Parece haber tres plataformas y paradigmas informáticos en la frontera: la IA, de la que todo el mundo es consciente; la computación cuántica, que tal vez esté donde estaba la IA en 2018; y las cripto y la criptografía, ejemplificadas por cadenas de bloques como Ethereum y Bitcoin. Casi parece que estamos entrando en una singularidad de estas tres cosas, donde la IA está acelerando lo cuántico y la criptografía, y la criptografía va a ser un contrapeso para algunos de los vectores de centralización de la IA. ¿Qué opinas de todo esto?

**Justin Drake:** Es muy difícil de predecir, pero como dijiste, existe esta coincidencia muy extraña en la que 2032 parece ser el año en que la informática en general alcance la singularidad. La gente ha estado hablando de la singularidad de la IA potencialmente incluso antes de 2032. Está el famoso artículo sobre la IA en 2027. No creo que tengamos superinteligencia en 2027, pero creo que es probable para 2032.

Ya estamos empezando a ver —justo ayer, Dario Amodei, uno de los pioneros de la IA, comenzó a hacer que la IA se mejore a sí misma de forma recursiva y autónoma, lo cual es extremadamente aterrador. Esto es básicamente lo que debería iniciar el crecimiento exponencial hacia la superinteligencia.

#### La crisis del presupuesto de seguridad de Bitcoin y el ajuste de cuentas de 2032 (1:25:12) {#bitcoins-security-budget-crisis-and-the-2032-reckoning-12512}

Tenemos 2032 como el potencial Día Q (Q-Day), y también tenemos 2032 donde Bitcoin tendrá lo que creo que es su último *halving* (reducción a la mitad). Podrías llamarlo el Día B: el día de Bitcoin en el que habrá una especie de ajuste de cuentas, porque la emisión será demasiado baja para asegurarlo.

En dos años tendremos un *halving*, y en seis años, en 2032, tendremos otro. La historia de seguridad de Bitcoin durante los últimos 15 o 16 años ha sido que las tarifas de transacción reemplazarán a la emisión. Te invito a mirar los datos: simplemente no está sucediendo. Las tarifas de transacción hoy en día son el 0.6 % de la emisión. Así que olvídate de las tarifas de transacción.

Vamos a tener una decadencia exponencial de la seguridad de Bitcoin. Hoy en día, Bitcoin está asegurado por aproximadamente 10 gigavatios. Y aquí hay una estadística alucinante: cada día, China despliega un gigavatio, principalmente de energía solar. Así que 10 días de despliegue en China son suficientes para realizar un ataque del 51% a Bitcoin.

**David Hoffman:** En términos de costo de energía (esta cosa que protege a Bitcoin), China está produciendo tanta energía como la que se necesita para asegurar Bitcoin cada 10 días.

**Justin Drake:** En términos de consumo de energía, Bitcoin está consumiendo 10 gigavatios. Un gigavatio es aproximadamente una planta nuclear, así que 10 plantas nucleares. China está desplegando el equivalente a una planta nuclear cada día. Y ese es uno de los principales cuellos de botella. El otro cuello de botella es el hardware: un millón de equipos de minería (*rigs*). Costaría alrededor de 10 mil millones de dólares llevarlo a cabo, lo cual, en el gran esquema de las cosas, es una miseria absoluta, tanto en relación con la capitalización de mercado de Bitcoin como para un atacante a nivel de Estado-nación.

**David Hoffman:** Cuando hablas de esta manera sobre Bitcoin, casi me hace pensar que ya no crees que Bitcoin deba ser la vanguardia de las cripto. El planteamiento es que Bitcoin tiene fallas desde la perspectiva del presupuesto de seguridad y cuántica, y que Ethereum va a liderar las cripto después.

**Justin Drake:** Sigo siendo optimista sobre la computación cuántica; en última instancia, es un desafío técnico que se puede superar. El problema mayor es el presupuesto de seguridad, porque eso afecta el ADN central de Bitcoin: el límite de 21 millones y la prueba de trabajo (PoW). No veo cómo se puede combinar la prueba de trabajo y un límite de 21 millones. Tienes que renunciar a uno.

Existe la posibilidad de que BTC como activo pueda desacoplarse de la cadena de Bitcoin y vivir en una cadena más segura, por ejemplo, como un token ERC-20 en Ethereum. Pero decir esas palabras... los *bitcoiners* no piensan así.

**David Hoffman:** No, no lo hacen.

**Justin Drake:** Y si dijera palabras diferentes como: "Simplemente vamos a eliminar el límite de 21 millones porque el presupuesto de seguridad no es suficiente", los *bitcoiners* tampoco piensan así. Se dirigen muy rápido hacia un muro, y 2032 es el día del ajuste de cuentas.

#### Cosechar ahora, descifrar después: riesgos cuánticos más allá de las cripto (1:30:09) {#harvest-now-decrypt-later-quantum-risks-beyond-crypto-13009}

**Ryan Sean Adams:** ¿Qué pasa con lo cuántico en relación con el resto de la sociedad? Este no es solo un problema del mundo cripto. Las cadenas de bloques son singularmente susceptibles, pero otros componentes de la sociedad también lo son. ¿Hasta qué punto representa un Ethereum poscuántico una herramienta para que la sociedad resuelva y prevenga cosas en un mundo poscuántico y pos-IA?

**Justin Drake:** Básicamente hay dos tipos de criptografía. Está la criptografía en tiempo real, donde firmas mensajes en tiempo real sin un impacto material en las acciones pasadas. Actualizarse a la tecnología poscuántica debería ser relativamente sencillo para la mayor parte de internet. Hay algunas excepciones; por ejemplo, los satélites que ya se han desplegado y que, literalmente, no se pueden actualizar.

Luego hay otro problema con el cifrado: si el material se ha cifrado hoy y no estás utilizando un cifrado seguro poscuántico, esos datos se podrán descifrar en el futuro. Existe toda esta clase de ataque llamado "cosechar ahora, descifrar después". Creo que es realista pensar que vamos a tener descifrados masivos en la sociedad: montones de mensajes de Signal, mensajes de Telegram o tesoros de mensajes de Gmail, todos siendo descifrados simultáneamente. Eso podría tener un impacto muy significativo en la sociedad.

#### Ethereum como aceleracionismo defensivo y el riesgo existencial de la IA (1:30:09) {#ethereum-as-defensive-accelerationism-and-ai-existential-risk-13009}

**Ryan Sean Adams:** Justin, cuando hablábamos de estas tres tecnologías de computación, da la sensación de que la que más destaca es la IA. Hablabas de que 2032 sería una especie de momento tipo AGI. Una pregunta general: como criptógrafo extremadamente talentoso, tú no eres una AGI. La preocupación es que a medida que entramos en la singularidad computacional, todo puede pasar. Todos los planes bien trazados que hagamos en 2026 para que nuestras cadenas de bloques sean resistentes a la computación cuántica... ¿qué pasa si la AGI descubre cómo descifrar nuestra criptografía resistente a la computación cuántica de alguna otra manera? Como criptógrafo, ¿te preocupan las incógnitas desconocidas de la inteligencia artificial general y las cosas que podría descifrar? ¿Qué pasa si estamos preparados para un mundo poscuántico pero no para un mundo pos-AGI?

**Justin Drake:** En cuanto a la criptografía, tengo bastante confianza en su solidez. La razón es que puedes demostrar matemáticamente que tu criptografía es correcta. La criptografía es una rama de las matemáticas. Por lo general, calibras estos problemas difíciles para que, si alguien fuera a descifrarlos computacionalmente, usaría más energía de la que hay en el sistema solar.

Volviendo a los fundamentos criptográficos que estamos sugiriendo para el Ethereum poscuántico (los hashes), no hay nada más fuerte que eso. Esta es la criptografía más débil que podrías esperar tener. Esta es una de las razones por las que soy cauteloso a la hora de poner los cimientos del internet del valor sobre retículos. El NIST tiene dos variantes principales de firmas poscuánticas: las basadas en hash y las basadas en retículos. Lo basado en retículos recuerda mucho a las curvas elípticas: objetos altamente estructurados. Es plausible que alguna AGI o incluso ASI (súper inteligencia artificial), miles de veces más inteligente que toda la humanidad combinada, pueda descifrarlo. Pero las funciones hash... hay razones para creer que son fuertes.

Aunque no me preocupa demasiado la criptografía, sí me preocupa algo mucho más profundo. Si miras el panorama general, cada vez me preocupa más el riesgo existencial para la humanidad. Más personas están empezando a entender lo que Eliezer intentaba decir en Bankless hace no mucho tiempo.

Creo que es plausible que, si la humanidad sobrevive, Ethereum juegue un papel clave en que eso suceda. La metáfora que tengo es que la humanidad conduce un coche a 100 millas por hora. Existe esta trampa de Moloch en la que los grandes estados nación, TSMC, Nvidia, OpenAI... todos están pisando el acelerador. Y el coche no tiene frenos, ni cinturón de seguridad, ni airbag. Hoy podemos maniobrar con relativa comodidad a 100 mph. El año que viene estaremos a 200, luego a 300. Eventualmente, conduciremos a una velocidad irresponsable y chocaremos.

Trabajar en Ethereum ha cobrado un significado completamente nuevo para mí en los últimos meses. En su mayor parte ignoraba la IA, en parte porque estaba obsesionado con las cosas de la cadena de bloques, pero también porque hace no mucho era un juguete. Pero a través de mi trabajo, especialmente con la verificación formal y el desarrollo

#### El significado de trabajar en Ethereum en la era de la IA (1:35:08) {#the-meaning-of-working-on-ethereum-in-the-age-of-ai-13508}

y programando, estoy viendo lo poderoso que es todo esto. En las últimas semanas y meses me he obsesionado con la IA, aprendiendo todo lo que puedo. De ninguna manera soy un experto, y tal vez esto sea solo una fase por la que pasa la gente cuando abre la caja de Pandora. Pero para mí, trabajar en Ethereum ahora se trata de aceleracionismo defensivo.

No veo a otras partes de la sociedad trabajando en el sistema de frenos: todo es acelerador. La buena noticia es que Ethereum tiene gran parte del pensamiento y las herramientas que podrían aportar algunas de las soluciones. Desde el primer día, asumimos la adversariedad. Desde el primer día, hacemos uso de tecnología como la criptografía que empodera a los débiles y asegura que incluso los arbitrariamente fuertes no puedan romper ciertas cosas. Estamos intentando ser una fuente de verdad, ser descentralizados, dar soberanía a la gente.

Creo que es posible que en los próximos meses y años tengamos una especie de despertar en el que la sociedad diga: "Oh, mierda". Y podría convertirse en un imperativo moral empezar a trabajar en el aceleracionismo defensivo. Podríamos tener a algunas de las mentes más brillantes acercándose naturalmente a Ethereum como una posible solución, parte de un conjunto de soluciones que necesitamos para abordar esto.

**Ryan Sean Adams:** Me encanta que estés pensando en eso, y parece que tu trabajo en Ethereum te da un propósito. Tengo otra pregunta. Siendo obviamente un gran fan de Ethereum, una preocupación que tengo si el destino de la IA se hace realidad es que, a cierto nivel, sí, es una tecnología aceleracionista defensiva: descentralizada, sin permisos, que transfiere el poder a los pequeños en lugar de a los grandes. Pero a otro nivel, es digital. Hemos creado un sistema de derechos de propiedad, y parece posible que alguna AGI o ASI pueda aprovechar nuestra computadora mundial inmutable y que no se puede apagar para cosas que la humanidad no quiere. ¿Te preocupa en algún nivel que simplemente use Ethereum —"Oye humanidad, gracias por el sistema de derechos de propiedad, nosotros nos encargamos a partir de aquí"— y que en realidad hayas acelerado una tecnología que va en contra de la humanidad?

**Justin Drake:** Creo que es un punto muy válido. En última instancia, Ethereum es una herramienta que podría ser utilizada tanto por humanos como por IA. Tal vez esto sea un consuelo, pero si eliminas a Ethereum, no parece haber muchos otros productos alternativos en el espacio del aceleracionismo defensivo. Es casi todo aceleracionista. Así que sí, tal vez Ethereum acelere algunas cosas, pero es una de las únicas esperanzas que tenemos para la aceleración defensiva. Como tal, creo que sigue siendo racional cumplir con la hoja de ruta para 2029 y hacer todo lo posible para asegurarme de que Ethereum esté listo para una era de súper inteligencia artificial.

**Ryan Sean Adams:** Solo una última pregunta mientras vamos terminando. Esto ha sido absolutamente fantástico. Tal vez sea una pregunta personal, ya que has tenido un despertar sobre la IA en los últimos meses. Ahora noto que estás matizando con "si la humanidad sobrevive": "Ethereum juega un papel clave si la humanidad sobrevive". Esas palabras me resultan difíciles de decir. La posibilidad real de que el aceleracionismo tecnológico signifique que la humanidad no sobreviva. ¿Cómo lidias con eso a nivel personal?

**Justin Drake:** Estoy relativamente zen al respecto. He llegado a un punto en el que estoy feliz de morir. He vivido una vida muy feliz.

#### Reflexiones finales sobre la probabilidad de catástrofe (1:40:04) {#closing-thoughts-on-probability-of-doom-14004}

**Ryan Sean Adams:** ¿Qué?

**David Hoffman:** Esto nos dejó en shock.

**Ryan Sean Adams:** Esa no era la respuesta que esperaba.

**Justin Drake:** Creo que simplemente hay que mantener la esperanza. Tienes que dejar a un lado la llamada P(doom), la probabilidad de catástrofe. Mi P(doom) ahora es relativamente alta. Creo que es más del 50 %. Pero no quiero decir esto en voz alta. No quiero...

**Ryan Sean Adams:** No quieres vivir en ese pesimismo.

**Justin Drake:** Exacto. No quiero desanimarme y amargarme la vida. Y quizás lo más importante, no quiero desanimar a otras personas y hacer que pierdan la esperanza. Creo que deberíamos estar haciendo lo mejor que podemos con lo que tenemos. El futuro es muy impredecible. Aunque mi P(doom) subió muchísimo en las últimas semanas y meses, esta es una opinión firme pero flexible. Quiero que personas muy inteligentes den un paso al frente y me digan por qué no debería estar tan asustado y ser más optimista y esperanzado.

Como dije, solo he estado pensando en esto durante literalmente semanas y meses. Apenas estoy arañando la superficie. La gran llamada de atención para mí fue Opus 4.5, donde Emil me dijo: "A partir de este momento, la IA realmente me está ayudando a ser más productivo". Antes de eso, en términos netos, lo estaba retrasando. Y luego, lo que hemos visto en las últimas semanas son resultados más impresionantes. Hace aproximadamente un mes, uno de los lemas clave en los SNARK basados en hash, el lema de Polyshakes-Spielman, fue verificado formalmente en 8 horas, con un costo de $200. Algo que habría costado 100 veces más si lo hubiera hecho un humano y habría tomado 100 veces más tiempo.

También mencioné el resultado de la Medalla Fields, que solo tomó 5 días para generar una prueba de 500.000 líneas. Es bastante obvio hacia dónde va esto: vamos a tener todos los teoremas matemáticos conocidos comprobados y verificados por IA, con todos los errores tipográficos corregidos. Para un pequeño subconjunto de "teoremas", en realidad tendremos una demostración de que son incorrectos con contraejemplos. La programación ya está resuelta en gran medida, luego resolveremos el progreso científico. Las cosas se vuelven filosóficas extremadamente rápido; tal vez eso sea para otro episodio.

**Ryan Sean Adams:** Creo que eso es para otro episodio. Sin embargo, es una respuesta fantástica. Agradezco tu perspectiva de abordar esto con cierto nivel de estoicismo y luego con agencia: trabajando en cosas que son significativas para ti. Esperamos, si la humanidad sobrevive, hacer muchos más de estos podcasts contigo en el futuro. Siempre es un placer tenerte, Justin Drake. Muchas gracias.

**Justin Drake:** Gracias.