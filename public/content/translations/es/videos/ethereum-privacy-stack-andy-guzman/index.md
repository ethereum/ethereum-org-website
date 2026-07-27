---
title: "El stack de privacidad de Ethereum: lecturas privadas, redes y la fuga oculta"
description: "Andy Guzman explica cómo se filtran los metadatos cuando las billeteras leen datos de Ethereum, y cómo la investigación sobre redes y lecturas privadas de la hoja de ruta de privacidad cierra la fuga en la capa de acceso."
lang: es
youtubeId: "tvAqDJXCBaA"
uploadDate: 2026-02-16
duration: "0:27:00"
educationLevel: intermediate
topic:
  - "privacy"
  - "roadmap-and-priorities"
format: presentation
author: EthBoulder
breadcrumb: "Stack de privacidad de Ethereum"
---

Una charla de **Andy Guzman**, líder del equipo Privacy Stewards of Ethereum (PSE) en la Fundación Ethereum, en EthBoulder 2026. Expone un gran punto ciego en la privacidad de Ethereum: incluso los usuarios que nunca firman una transacción filtran datos de comportamiento detallados a través de consultas cotidianas. Presenta el stack de privacidad de Ethereum, que cubre lecturas privadas (PIR), privacidad del tráfico (enrutamiento cebolla y mixnets) y trabajo de rendimiento como árboles binarios unificados y estado verificable por ZK.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=tvAqDJXCBaA) publicada por EthBoulder. Ha sido ligeramente editada para facilitar su lectura.*

#### La carta ficticia del proveedor de RPC (0:12) {#the-fictional-rpc-provider-letter-012}

Hola a todos, soy Andy, y quería presentar un tema que no se discute a menudo en el ecosistema de Ethereum y que es extremadamente importante. Como habrán notado por la diapositiva y la introducción, está relacionado con la privacidad, y cómo estamos desprotegidos sin siquiera darnos cuenta.

Permítanme comenzar con una carta que alguien les escribió.

"Estimado usuario valioso, gracias por las 847 consultas que realizó este mes. Realmente disfrutamos conocerlo. Sabemos que tiene ETH en tres billeteras diferentes. Sabemos que revisó el precio de ETH 94 veces el martes pasado. Fue un día muy difícil para todos, así que no lo juzgamos. También revisó el precio de BTC, lo cual es interesante, porque no tiene ningún Bitcoin. ¿Está pensando en diversificar? Eso quedará entre nosotros y, por supuesto, nuestros socios de análisis. También está observando muy de cerca dos pools de Uniswap, y revisó su factor de salud en Aave 14 veces la semana pasada. Tal vez quiera relajarse, o simplemente agregar algo de colateral. El jueves lo revisó tres veces en 12 minutos, y estaba muy preocupado. Buscó cuatro nombres de ENS diferentes, así que o está comenzando un nuevo proyecto o está teniendo una crisis de identidad. Y siempre se queda en silencio entre las 11 p.m. y las 7 a.m., hora de la montaña."

#### Cómo filtra datos sin firmar transacciones (1:34) {#how-you-leak-data-without-signing-transactions-134}

"Así que estamos bastante seguros de que reside en Boulder, o cerca. Nunca firmó una sola transacción a través de nosotros. Nunca tuvo que hacerlo. Su curiosidad nos dijo todo. Afectuosamente, su proveedor de RPC."

Por supuesto, esta es una carta ficticia, pero describe algo que realmente filtramos todos los días. Incluso si no está haciendo una sola transacción o ninguna acción en cadena, básicamente le está contando todo a cualquier empresa de análisis a la que le encantaría tener en sus manos esos datos y sus comportamientos.

#### Escrituras privadas vs. lecturas privadas (2:07) {#private-writes-vs-private-reads-207}

Entonces, ¿qué está pasando realmente ahora mismo en el mundo de la privacidad? Veo que ponemos mucho énfasis en la privacidad en cadena, o lo que en PSE llamamos escrituras privadas: todas las acciones que realiza en cadena. Y tiene sentido, ¿verdad? Esas acciones quedan registradas para siempre y se transmiten por todo el mundo, por lo que tiene sentido no filtrar su dirección con una acción específica. También ponemos mucho énfasis en las herramientas: fuentes de datos, pruebas, DSL y lenguajes que podemos usar para brindar a los desarrolladores más herramientas para expresar y construir aplicaciones más sólidas que tengan más privacidad en cadena.

Pero quiero argumentar en esta presentación que no ponemos casi suficiente atención y esfuerzo en estos otros dominios: lo que llamamos lecturas privadas, porque cada vez que consulta datos de una cadena de bloques está filtrando mucha información, y redes privadas, porque incluso antes de que algo llegue en cadena, todo su tráfico se está filtrando.

Para ponernos un poco más técnicos: todas las llamadas RPC, como eth_getBalance, eth_call y eth_getLogs, son solicitudes en texto plano que van a los proveedores de RPC y se correlacionan con su IP.

#### Por qué más actividad aumenta el riesgo de creación de perfiles (3:20) {#why-more-activity-increases-profiling-risk-320}

Con esta información, se vuelve muy fácil crear perfiles de personas, segmentarlas y modelar comportamientos. Y esto puede usarse en su contra. Como imaginará, la información es poder, y cuanta más información tenga la gente sobre usted y su comportamiento, más poder tendrán sobre usted.

La mayoría de las personas no se dan cuenta de esto. La mayoría dirá, de acuerdo, bueno, realmente no importa porque esta no es información crítica. O podrían pensar: cuanta más actividad haya, más protegido estaré. Esto es completamente falso y contraintuitivo. Para las acciones en cadena, dondequiera que haya conjuntos de anonimato, sí ayuda: cuantos más usuarios, más privacidad y más fácil es pasar desapercibido. Pero con las lecturas es lo contrario, porque las consultas no son intercambiables. Cuanta más actividad transmita, cuantas más acciones realice, más rica será la superficie de correlación y más fácil será construir un perfil de sus acciones.

Así que cada vez que hay una manía por las finanzas descentralizadas (DeFi) o locura por los NFT, la gente se vuelve más descuidada. La seguridad operativa (OpSec), por supuesto, se tira por la ventana, y se vuelve mucho, mucho más fácil desanonimizar a las personas basándose en los patrones de actividad en los que cae la mayoría.

#### Presentación del stack de privacidad de Ethereum (4:43) {#introducing-the-ethereum-privacy-stack-443}

Quiero comenzar con el panorama: dónde deberíamos atacar, qué se necesita y quién está trabajando en qué. Esta charla profundizará en algunos temas más técnicos y otros conceptuales de más alto nivel, para que todos puedan sacar algo de valor de ella.

Quiero presentar lo que llamo el stack de privacidad de Ethereum, o las capas del stack de privacidad de Ethereum, y creo que es útil para razonar al respecto. Si realmente queremos privacidad, no solo necesitamos privacidad en cadena; también necesitamos privacidad en todas estas capas del stack, similar al ciclo de vida de una transacción, o al modelo OSI y sus capas tecnológicas. Yo argumentaría que podríamos crear un estándar, o algún tipo de reconocimiento en todo el ecosistema, de que estas capas existen. Tal vez esta no sea la forma final, pero creo que podría decirse que ya es útil.

#### Capa por capa: dónde se filtra información (5:41) {#layer-by-layer-where-you-leak-541}

La parte superior es la capa de aplicación. Cada vez que visita un sitio web, por supuesto, está filtrando lo que está visitando, y la gente puede comenzar a crear perfiles: conjuntos de anonimato, credenciales, vinculando su IP a lo que está visitando, incluso si no hace nada.

La siguiente es la capa de la billetera. Cada vez que realiza una acción, no solo filtra información a la capa de la aplicación, sino también a las puertas de enlace (gateways). Las billeteras en este momento son muy complejas, se integran con muchos otros sistemas y servicios, y usted filtra mucha más información de la que imagina. Incluso si solo abre su billetera y esta consulta el precio de ETH o su saldo, lo está filtrando todo.

Luego tiene las puertas de enlace: los RPC, los proxies, los retransmisores (relayers). Vuelve a filtrar más metadatos. Luego, lo que la gente imaginaría como el elemento en cadena, que es cada vez que se consultan cosas en la EVM, como el estado o los patrones de ejecución. Por ejemplo, consultar el saldo de algo o el estado de un contrato inteligente. Y finalmente el consenso, donde están todos los validadores. Dependiendo de si está escribiendo en cadena o leyendo en cadena, también podría tocar la mempool.

Y hay otra vertical, que es lo que llamamos redes, que es transversal y atraviesa todas estas capas. Por ejemplo: ahora mismo visita un sitio web y el servidor conoce su IP. Pero, ¿qué pasaría si visitara ese sitio web a través de Tor u otra red anónima? Usted conocería la dirección IP del sitio web, pero ellos no conocerían la suya. ¿Y qué pasaría si ese sitio web estuviera alojado en un país que recientemente comenzó a censurar todas las cosas cripto? Ese sitio web y esa empresa también querrían ocultar su IP, y querrían ocultar su dominio detrás de un dominio cebolla (onion).

Esos son los tipos de cosas que tienen sentido: necesitamos ir capa por capa, fortaleciendo todo, analizando a través de la lente de un atacante muy disruptivo que quiere censurar todo. Incluso si no lo hacemos, y decimos que vivimos en un estado lo suficientemente bueno, esta información se registra ahora y será alojada para siempre por muchas personas que ni siquiera conoce, empresas que comienzan a vender sus datos. Eventualmente, en cinco años, alguien podría prohibir las cripto y decir: "cualquiera que haya usado Uniswap en los últimos cinco años, soy el IRS, voy a empezar a tocar puertas y meterlos en la cárcel", o lo que sea. Estos escenarios distópicos ocurren en diferentes países de todo el mundo en este momento.

#### Lecturas privadas y redes privadas (8:24) {#private-reads-and-private-networking-824}

Bien, entonces tenemos el stack de privacidad de Ethereum. ¿Dónde deberíamos enfocarnos? En esta presentación quiero hablar sobre estas dos áreas. Lecturas privadas: cada vez que accede al estado desde la cadena, toca todas estas capas, desde la aplicación, digamos que quiero consultar el precio de ETH, hasta la billetera, las puertas de enlace, un nodo que ejecuta Ethereum y la EVM, y luego de regreso. Básicamente un proveedor de RPC o un índice. Y redes privadas, que son todas las acciones que ocurren en la capa de red. Esto es lo que queremos fortalecer.

#### Tres pilares: datos, tráfico, rendimiento (9:05) {#three-pillars-data-traffic-performance-905}

Hay tres pilares que creo que son críticos para que logremos esto. Queremos ocultar y hacer privados los datos en sí. Queremos ocultar y hacer privado el tráfico en sí. Y luego queremos que sea de alto rendimiento, útil, práctico y barato. Esto resume mucha información sobre las cosas que suceden en el ecosistema, pero creo que es útil para pintar el panorama e identificar los puntos de apalancamiento donde podemos acelerar.

#### Ocultar datos: de proxies a PIR (9:39) {#hiding-data-from-proxies-to-pir-939}

Entonces, los datos. ¿Qué es lo que queremos proteger? Queremos ocultar qué información le está pidiendo a estos servidores, y queremos ocultar los patrones de cómo accede a estos datos. No solo el contenido, sino también los patrones.

Hay diferentes niveles de técnica. El primero es nada: simplemente lo filtra todo. Cada vez que conecta su billetera, vincula su dirección IP al contrato que está consultando, a un eth_getBalance específico para una dirección específica, y eso es todo. Incluso si está utilizando un protocolo de privacidad, digamos Tornado Cash, y desea consultar el estado del árbol de Merkle, o tiene que descargar todo el árbol, lo cual no tiene mucho rendimiento, o filtra qué ruta y hojas está consultando, reduciendo su conjunto de anonimato. Por lo tanto, incluso usar un protocolo de privacidad sólido como Tornado Cash no es suficiente si no protege su red y sus patrones de acceso a los datos.

El siguiente nivel es algún tipo de proxies o retransmisores: muchas máquinas que no saben de dónde proviene la solicitud y eventualmente recuperan los datos. Eso no es muy práctico y no es muy sin necesidad de confianza.

Luego tiene los TEE (Entornos de Ejecución Confiables), que son un paso adelante, y aquí es donde algunos equipos y empresas ofrecen servicios. Creo que este es un buen paso adelante, pero no es suficiente, nuevamente porque el costo de atacar y corromper los TEE está cayendo mucho. Para ciertos casos de uso críticos esto no es suficiente; para muchos del día a día podría serlo.

Hay otros equipos trabajando en OMAP, patrones de acceso a mapas ajenos (oblivious map access patterns), y ORAM, RAM ajena (Oblivious RAM). Estas son técnicas similares que intentan ofuscar a qué partes del conjunto de datos está intentando acceder. En lugar de decir "Quiero el saldo de esta dirección de ETH", está accediendo aleatoriamente a diferentes cosas, por lo que el servidor no lo sabe.

Y yo argumentaría que el objetivo final de estos será PIR, recuperación de información privada (private information retrieval), lo que significa que el servidor no sabe qué está consultando y no aprende nada al respecto.

#### Explicación de la recuperación de información privada (12:03) {#private-information-retrieval-explained-1203}

La recuperación de información privada es una técnica súper poderosa en criptografía, y se va a usar mucho. Hay dos variantes: PIR de índice, que puede usar si tiene datos estructurados bajo un índice, y PIR de palabras clave, donde, como su nombre lo indica, consulta por palabra clave. Es muy difícil tener un esquema que funcione para todo.

El estado de Ethereum es enorme y muy variado. Los registros (logs), según aprendí ayer, son de solo adición, pero el modelo de cuenta es diferente: parte del estado se actualiza con mucha frecuencia, otra parte no. Dependiendo de cómo lo divida y analice, puede tener megabytes, gigabytes o terabytes de datos, con patrones de acceso muy diferentes.

#### Una arquitectura PIR multiagente (12:48) {#a-multi-agent-pir-architecture-1248}

La propuesta en la que estamos trabajando dentro de PSE, y aquí voy a hablar conceptualmente y luego sobre proyectos específicos que estamos haciendo en PSE y otras cosas que estoy viendo en el ecosistema, es una arquitectura multiagente. No hay un solo esquema que sea perfecto para todo el estado de Ethereum. Pero si podemos dividir el estado de Ethereum por tipo o por patrón de acceso, podemos encontrar esquemas muy buenos para cada uno de ellos.

¿Qué pasaría si tuviéramos un servicio que ejecute esta arquitectura multiagente y, dependiendo del tipo de consultas y de dónde podrían estar ubicadas en el estado de Ethereum, ejecute un esquema u otro? Eso ya nos acerca mucho a algo que es factible, capaz de producirse y ofrecerse al ecosistema. Esto requerirá algo así como una API unificada, para que las billeteras, los indexadores, los usuarios y los desarrolladores de aplicaciones descentralizadas (dapp) no tengan que preocuparse por qué esquema se utiliza y cómo llamarlo. Simplemente tiene la API estándar, y alguien más se preocupa por los detalles de implementación.

Ya estamos haciendo esto e implementando dos esquemas diferentes. Abriremos subvenciones y estamos tratando de coordinar a más personas en el ecosistema para abordar algunos de estos y ver cuáles son los más necesarios para Ethereum.

Aquí hay algunos números sobre diferentes esquemas PIR: rendimientos, sobrecarga de comunicación, etc. Es difícil, porque diferentes aplicaciones tienen diferentes patrones de acceso. Algunas acceden a muchos recibos, otras quieren acceder a más del estado, como Rotki, y otras acceden a más transacciones, como Helios. No hay una solución mágica, y lo más probable es que una arquitectura mixta sea útil. También estamos haciendo una sistematización del conocimiento, así que si esto le interesa, podemos compartirlo. Y aquí están solo algunos de los equipos que trabajan en estas áreas. Perdónenme si son parte de un equipo y no los incluí; si alguien ve la grabación y falta, por favor hágamelo saber y puedo comenzar a agregarlos.

#### Ocultar el tráfico: enrutamiento cebolla y Tor (15:22) {#hiding-traffic-onion-routing-and-tor-1522}

Cubrimos los datos. El otro gran grupo es el tráfico. ¿Cómo ocultamos el tráfico y qué queremos ocultar? En términos muy simples, queremos ocultar las IP del cliente y del servidor entre sí, y del resto del mundo que podría estar husmeando en el tráfico. Tenemos diferentes técnicas: servicios cebolla, mixnets, VPN, DC-nets, y podría haber otras clasificaciones. Solo voy a hablar de las dos primeras.

Las técnicas de enrutamiento cebolla cifran en capas, y el tráfico también se descifra en capas. Las personas en el medio nunca pueden conocer el origen, algunas nunca pueden conocer el destino y otras nunca aprenden nada; simplemente actúan como enrutadores.

El resumen es: ¿qué pasaría si todo el tráfico del ecosistema de Ethereum pudiera enrutarse a través de la red Tor, por así decirlo? También hay otras opciones. Ayudaríamos a proteger la IP del remitente: su teléfono o su computadora portátil no se filtrarían cuando envíe transacciones o solicite información. Y, por supuesto, también protegeríamos al receptor, el servidor. Imagine que en Irán, China, Corea del Norte o Venezuela, alguien está tratando de alojar un protocolo DeFi o un servicio y está censurado por su país. Esta es una opción que podría proteger sus vidas. Evita la censura y también oculta el tráfico de los ISP, los proveedores de servicios de Internet, que todos sabemos que están intervenidos por agencias de inteligencia que husmean en todo.

El objetivo es tener un reemplazo directo: un SDK, para que las billeteras, los desarrolladores de dapp y los proveedores de infraestructura no tengan que preocuparse por los detalles de implementación. Simplemente saben que si usan este SDK, el tráfico se convierte en cebolla, se cifra y se fortalece.

Hay un equipo al que quiero felicitar, el equipo de Brume Wallet, que comenzó Echalote, una implementación de código abierto de Tor para la web. Esto existe en este momento: hay clientes de Tor, pero están escritos en C y necesitan ejecutarse en un navegador especial. ¿Qué pasa si quiero agregar esto a MetaMask, o a la billetera Kohaku, o a Ambire, Rabby y todas las demás? Necesitamos SDK de JavaScript, y eso es lo que comenzó Echalote.

Luego, el Proyecto Tor tiene una nueva implementación en desarrollo llamada Arti, la próxima generación de su cliente. Pero necesitamos un Arti integrado. Arti está basado en Rust y necesita compilarse en WASM para poder ejecutarse en su navegador, de modo que pueda importarlo muy fácilmente. Básicamente tenemos una colaboración con el equipo de Tor: llamadas todas las semanas y algunos proyectos y asociaciones juntos.

#### Mixnets para Ethereum (18:16) {#mixnets-for-ethereum-1816}

Por el lado de las mixnets, quiero felicitar a varios equipos que se acercan a esto: el equipo de Nym; HOPR, también uno de los primeros; VPN como Gnosis VPN; y un par de otros que eran nuevos para mí, como Anyone Protocol, y creo que alguien de ese equipo debería estar aquí en Denver, además de algunos otros nuevos. Hay muchos equipos trabajando en mixnets, VPN y otros enfoques.

Queremos ver: ¿qué pasaría si creamos una mixnet diseñada específicamente para Ethereum, donde podamos enrutar el tráfico RPC? Las mixnets tienen fuertes garantías, pero agregan mucha latencia. Para algunos casos de uso, eso está bien: no importa si toma un poco más de tiempo, siempre y cuando tenga privacidad. Pero para cosas como DeFi y el comercio (trading), es extremadamente improbable que se adopten si agregan latencia. Entonces, ¿qué es lo más rápido que podemos ejecutar con las mayores garantías de privacidad? Nuevamente, un saludo a algunos de estos equipos, y si alguien está trabajando en estas áreas y no lo he agregado, me encantaría charlar.

#### Rendimiento: árboles binarios unificados y aceleración de GPU (19:28) {#performance-unified-binary-trees-and-gpu-acceleration-1928}

Lo último de lo que quiero hablar, el tercer pilar para hacer esto realidad, es el rendimiento. Queremos que estas cosas se ejecuten de forma rápida y barata. Tengo un principio: estas cosas no se adoptarán si el costo es mayor que el beneficio. El costo significa experiencia del usuario, tiempo y esfuerzo para el usuario, pero también costo para los desarrolladores y la infraestructura: ¿es esto muy costoso de ejecutar? Necesitamos reducir el costo tanto como podamos, y hay dos iniciativas de alto nivel de las que puedo hablar.

Una es UBT (árboles binarios unificados). Dependiendo de cuánto esté involucrado en las EIP del protocolo, es posible que haya oído hablar de esto. En este momento tenemos el trie de Merkle Patricia, que es útil, pero no muy útil para ZK y otros tipos de criptografía. Hay una propuesta, EIP-7864, que no pasa a los árboles Verkle sino a los árboles binarios unificados. Esto es mucho más eficiente para consultar el estado y luego realizar operaciones criptográficas como ZK en la parte superior.

Tenemos un proyecto que hace un UBT verificable: agrega un sidecar a cualquier cliente de Ethereum, que, en lugar de ejecutar una base de datos MPT, tiene una base de datos de estado UBT, y luego demuestra que esta transformación de MPT a UBT es válida utilizando una zkVM. Esto ya es muy poderoso. Una vez que logremos hacer esto, los clientes ligeros podrían usarlo para aumentar su rendimiento, y cosas como PIR podrían ejecutarse mucho más rápido.

El otro aspecto es la aceleración de GPU. Podemos ejecutar estas cosas mucho más rápido si optimizamos los niveles inferiores del stack: la GPU es uno, o la aceleración de la CPU también. Estas cosas probablemente se ejecutarán en servidores, no en teléfonos, por lo que también es muy valioso comenzar a explorar cómo podemos crear estas bibliotecas de nivel inferior para que se ejecuten mucho más rápido.

Haciendo un resumen hasta ahora: tenemos estas cinco capas y queremos cubrir estos casos de uso. Hay tres pilares: datos, tráfico y rendimiento. Para los datos tenemos proxies, TEE, ORAM, OMAP y PIR. Para el tráfico tenemos mixnets, enrutamiento cebolla y otros. Para el rendimiento tenemos UBT y aceleración de GPU. Si desea leer más, al menos sobre las contribuciones que está haciendo PSE, puede ir a pse.dev/research.

#### Medir el éxito (22:15) {#measuring-success-2215}

Entonces, ¿qué es el éxito y cómo podemos medirlo? Volviendo a estas capas: si quiero poder afirmar que Ethereum es la cadena más privada, ¿cuál es el objetivo final? Necesitaría sentirme cómodo de que todas estas capas estén extremadamente fortalecidas. ¿Cómo lo mediría? Esperaría que más sitios web y frontends de dapp estuvieran alojados detrás de dominios cebolla. Me encantaría que las billeteras usaran de forma nativa el enrutamiento anónimo, y también las puertas de enlace, los proveedores de RPC y los indexadores. Y mediría un porcentaje.

La pregunta es: de los frontends actuales del ecosistema de Ethereum, ¿cuántos están alojados detrás de un dominio cebolla? Yo diría que muy pocos, el 1% si acaso. Para sentirme bien y decir que lo logramos, probablemente necesitaríamos más del 80% en todas estas capas. ¿Cuántas billeteras en este momento están enrutando el tráfico a través de técnicas de enrutamiento anónimo? Muy, muy pocas. Lo mismo ocurre con los proveedores de RPC: ¿ofrecen estos proveedores PIR? No. Así que para mí, reclamar el éxito significa que los actores en todas estas capas adopten este tipo de tecnologías, al menos el 80% de los equipos, el tráfico o las consultas.

#### Comparación de nodos cebolla de Bitcoin (23:39) {#bitcoins-onion-node-comparison-2339}

Esta es una cosa por la que podemos estar celosos de Bitcoin. A pesar de todas las críticas que reciben, esta es una imagen de noviembre del año pasado: el 64% de sus nodos completos accesibles están ocultos detrás de dominios cebolla.

¿Podemos hacerlo nosotros mismos? Esta es una privacidad de nivel inferior, a nivel de consenso, pero ¿podríamos decir que nuestros nodos completos y nodos validadores están detrás de una red cebolla o mixnets? Definitivamente creo que deberíamos, y probablemente estemos en menos del 1%. Tenemos otros desafíos que ellos no tienen: nos ejecutamos mucho más rápido y nuestro consenso es diferente. Pero me encantaría tener paneles como este y decir que más del 80% de las billeteras han adoptado este tipo de tecnologías, y también los proveedores de RPC, exploradores, frontends, balanceadores de carga y SDK. Me encantaría que esta lista creciera.

#### Comparación de Ethereum con Monero y Zcash (24:55) {#comparing-ethereum-to-monero-and-zcash-2455}

Me tomé la libertad, anoche y la noche anterior, de comenzar a ver cómo, a través de esta lente de capas, el ecosistema de Ethereum se compara con cosas como Solana, Bitcoin, Zcash y Monero. Las cosas en amarillo son técnicas opcionales (opt-in), y creo que somos muy buenos en eso. Las cosas en azul son propuestas, algunas de ellas propuestas de protocolo. Las cosas en verde se aplican en la capa de protocolo.

Debido a nuestra historia de 10 años de ser una cadena pública, creo que será difícil alcanzar a Monero y Zcash en hacer que la privacidad sea nativa. Pero creo que podemos hacer un trabajo realmente bueno para lograr la adopción opcional e influir cultural y socialmente en los equipos y usuarios para que adopten más de estas técnicas. Bitcoin y Solana tienen sus propios desafíos, y creo que estarán más rezagados, al menos en estas cosas de privacidad.

#### El desafío: el ecosistema programable más privado (25:50) {#the-challenge-the-most-private-programmable-ecosystem-2550}

Mi objetivo, y el objetivo que quiero poner en su mente, es que Ethereum se convierta en el ecosistema más privado, sin permisos, sin necesidad de confianza y programable del mundo. Tenemos otras cadenas de pago privadas, y eso es genial, son muy buenas, pero creo que tendrán un trabajo mucho más difícil para volverse programables y crear el ecosistema que hemos creado.

Mi desafío para ustedes, y por supuesto para mí y mi equipo, es convertirnos, de los ecosistemas programables, en el más privado, sin permisos y sin necesidad de confianza. No podemos centrarnos solo en los elementos en cadena. Necesitamos centrarnos en todas estas capas.

Así que si está trabajando en lecturas privadas, redes, implementaciones de PIR, aceleración de GPU, estructuras de datos, UBT, infraestructura o validadores, me encantaría charlar con usted después. Muchas gracias. Ethereum es para la privacidad.