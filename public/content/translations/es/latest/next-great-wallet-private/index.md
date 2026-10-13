---
title: "La próxima gran billetera será privada"
description: "Tu billetera ve cada dirección que posees, cada aplicación descentralizada (dapp) a la que te conectas y cada solicitud que haces. Esa misma posición le permite protegerlo todo. Un vistazo práctico a las herramientas de privacidad, las configuraciones predeterminadas y las ideas aún no lanzadas que definirán la próxima generación de billeteras de Ethereum."
author: "Elliott Alexander"
team: ""
tags:
  - "privacidad"
  - "billeteras"
  - "pruebas de conocimiento cero"
published: 2026-07-02
image: /images/developers/blog/latest-post-header-1.png
breadcrumb: "La próxima gran billetera"
lang: es
---

Toma una captura de dos minutos que pasas en tu billetera. Abres la aplicación, echas un vistazo a tu saldo, te conectas a una aplicación descentralizada (dapp) que tenías intención de probar, apruebas la transacción que te presenta y le envías a un amigo los ETH que le debes del almuerzo.

Nada de esto se siente observado. Nadie te pidió tu nombre. Cierras la aplicación y sigues con tu día.

Ahora contemos lo que realmente se filtró. Al iniciar, antes de que hicieras nada, un conjunto de servicios de análisis descubrió tu dirección IP y que usas esta billetera. El servidor a través del cual tu billetera lee la cadena vio cada dirección que posees, consultada desde una sola IP: tu portafolio completo, cuidadosamente agrupado para quienquiera que guarde los registros. La dapp obtuvo tu dirección activa, que es todo lo que cualquiera necesita para buscar todo su historial. Y el pago a tu amigo es un registro público permanente que une tu billetera a la suya.

Cada una de esas filtraciones pasó por el mismo software. La billetera cargó los análisis, eligió ese servidor, entregó la dirección, construyó la transacción. Pero la misma posición funciona en ambos sentidos: la capa que ve todo es también la capa que puede proteger todo.

Muchas billeteras tienen modelos de negocio basados en la recopilación de esta información, pero hay formas de hacerlo sin poner en riesgo a los usuarios. Parte de lo que se necesita está acumulando polvo, funcionando y siendo ignorado. Otra parte aún nadie la ha resuelto. Ambas mitades representan la oportunidad, y quienquiera que las asuma está construyendo la próxima gran billetera.

## Lo que tu billetera revela en cadena {#what-your-wallet-gives-away-onchain}

Comencemos en cadena, con lo que es público sin importar qué billetera uses. Una dirección no lleva nombre, y ese simple hecho resulta muy reconfortante. Pero cada pago que has recibido, cada contrato que has tocado, el tamaño de tu saldo en este momento y la lista completa de todas las personas con las que has realizado una transacción están a la vista, disponibles para que cualquiera los consulte. El seudonimato solo significa que está archivado bajo un marcador de posición en lugar de tu nombre.

La defensa estándar es distribuir tu actividad en varias direcciones, y la mayoría de los usuarios experimentados lo hacen. Ayuda menos de lo que parece. Financia dos direcciones desde la misma fuente, o deja que se paguen entre sí una vez, y para cualquiera que ejecute un análisis de clústeres, colapsarán en una sola entidad.

Ya en 2020, [un estudio](https://fc20.ifca.ai/preproceedings/31.pdf) de los primeros cuatro años de Ethereum ya podía agrupar el 17,9 % de todas las cuentas de propiedad externa activas, sacando a la luz más de 340.000 entidades que controlaban múltiples direcciones. Eso fue hace seis años y un auge de la IA. Tu cuidadosa separación está a unos pocos pasos de deshacerse.

Tarde o temprano, el clúster se vincula a una persona real. Registra un nombre de ENS que refleje tu nombre de usuario en redes sociales, realiza un retiro una vez desde un intercambio que tenga el escaneo de tu pasaporte, o recibe un pago de alguien que guarda direcciones etiquetadas en una hoja de cálculo, y el clúster deja de ser abstracto.

Las filtraciones de datos también hacen su parte: un correo electrónico filtrado junto con una dirección particular, que coincide con un nombre de ENS que se parece al correo electrónico. Nada de esto requiere ya una citación judicial o un especialista. La IA ha convertido la tarea de examinar millones de registros en busca de una buena coincidencia en un trabajo que se ejecuta de la noche a la mañana, y el costo está en constante declive.

## Lo que tu billetera revela antes de que realices una transacción {#what-your-wallet-gives-away-before-you-transact}

El rastro en cadena al menos requería que realizaras una transacción. El rastro fuera de la cadena comienza antes. A principios de 2026, un investigador [pasó trece billeteras populares por un analizador de paquetes](https://www.theopensourcepress.com/crypto-wallet-ip-exposure-scorecard-2026/) en un dispositivo limpio y registró lo que hacía cada una en el primer inicio, antes de que existiera ninguna cuenta. La billetera promedio contactó a unos catorce dominios. La peor contactó a 26 dominios a través de 41 direcciones IP, incluyendo llamadas de infraestructura de saldo a tres proveedores distintos, para un usuario que aún no había creado una billetera. Otra billetera en la prueba incluía un servicio de huella digital del dispositivo junto con ocho subdominios de atribución de marketing.

Todo esto son pilares comunes de las aplicaciones de consumo (análisis, informes de fallos, atribución de marketing), pero esto no es Candy Crush, es una aplicación cuya propuesta es la autosoberanía. La misma prueba encontró [una billetera](https://cakewallet.com/) que no envió absolutamente nada en el primer inicio: cero paquetes, cero solicitudes DNS. Nada en una billetera requiere ese parloteo.

Luego está la filtración que nunca se cierra. Tu billetera no guarda una copia de la cadena; cada vez que lee un saldo o envía una transacción, le pregunta a un servidor llamado proveedor de RPC (Llamada a Procedimiento Remoto). A menos que ejecutes tu propio nodo, cada solicitud pasa por uno de estos, y el proveedor predeterminado ve tu lista completa de direcciones, tu IP y el momento exacto de todo lo que haces. Relacionar esa IP con el nombre de un suscriptor es una solicitud de registros rutinaria para un gobierno.

Cuando el proveedor predeterminado de MetaMask [reconoció en 2022](https://www.coindesk.com/business/2022/12/06/consensys-to-update-metamask-crypto-wallet-in-response-to-privacy-backlash) que registraba las IP junto con las direcciones de las billeteras, la reacción negativa lo empujó a [reducir la retención a siete días](https://consensys.io/blog/consensys-data-retention-update). Hay que reconocer el mérito, pero ese remedio es una política, y la arquitectura subyacente no ha cambiado: un servidor sigue recibiendo cada solicitud que haces. Y un registro como ese no tiene que ser solicitado para causar daño; solo tiene que existir. Las bases de datos son vulneradas, vendidas y fusionadas silenciosamente con otras, y un registro que no significaba nada por sí solo puede conectarse contigo años después de haber sido escrito.

Lo que hay que notar sobre toda esta capa es que el usuario nunca ve nada de ella. Enviar dinero al menos te pone una pantalla de confirmación enfrente; los metadatos no tienen pantalla. Nadie aprueba que su lista de direcciones viaje con su IP, y ningún aviso de firma cubre los análisis.

Estas configuraciones predeterminadas surgieron del manual estándar de las aplicaciones de consumo (infraestructura sólida, informes de fallos útiles, métricas de crecimiento) aplicadas sin pensarlo mucho a una aplicación que guarda el dinero de las personas. Lo cual es la parte alentadora: cada filtración mencionada en esta sección se remonta a una decisión que un constructor de billeteras tiene la oportunidad de tomar.

## Quién está mirando {#whos-looking}

Comencemos con los espectadores que menos desearías. Los delincuentes han descubierto que un libro mayor público también funciona como un catálogo de personas a las que se les pueden quitar sus ahorros por la fuerza. Los ataques con llave inglesa (robos donde la clave se extrae mediante violencia o la amenaza de ella) [aumentaron un 75 % en 2025](https://www.coindesk.com/markets/2026/02/02/crypto-crime-is-getting-violent-wrench-attacks-jumped-75-in-2026), y las víctimas perdieron alrededor de [101 millones de dólares solo en los primeros cuatro meses de 2026](https://cointelegraph.com/news/europe-crypto-wrench-attacks-losses-101m-certik-report). Y el patrón ha cambiado hacia lo que los investigadores llaman selección de objetivos basada en datos, donde los atacantes perfilan las tenencias de una víctima en cadena antes de siquiera llamar a su puerta. En más de la mitad de los incidentes recientes, llegaron a un cónyuge, un hijo o un padre como medio de presión. Un saldo de billetera que se remonta a la puerta de tu casa es una invitación permanente para los delincuentes.

Luego están los espectadores con placas. Un libro mayor transparente es un sistema de vigilancia que ningún gobierno tiene que construir: un registro completo de quién pagó a quién, cuándo y cuánto, expuesto al público, a una consulta de distancia sin necesidad de citación judicial. Cuánto debería preocuparte eso depende de quién te gobierne, y para millones de personas la respuesta es un gobierno que castiga una donación al partido opositor, una suscripción a una VPN o los ahorros mantenidos en una moneda que el estado no puede imprimir.

Para esos usuarios, la exposición financiera es el modelo de amenaza, y las configuraciones predeterminadas de la billetera deciden qué tan expuestos están.

Ambos tipos de espectadores están recibiendo la misma mejora. La IA está haciendo que la vigilancia sea más barata cada año, y todo lo que se ha escrito en la cadena permanece escrito, disponible para cualquier nueva técnica de análisis que surja. Nada de esto es una acusación contra el libro mayor público; la transparencia es lo que permite a cualquiera verificar la cadena. La exposición vive en el rastro que conecta el registro contigo: los patrones de financiamiento, las direcciones reutilizadas, los registros del servidor.

Hasta ahora, las billeteras han dejado ese rastro en su lugar porque dejarlo es el camino de menor resistencia, tanto para el software como para el usuario. También es exactamente lo que una billetera está en posición de disolver.

## Por qué la billetera es donde se arregla la privacidad {#why-the-wallet-is-where-privacy-gets-fixed}

Es justo preguntarse por qué algo de esto es trabajo de la billetera. Hay [exploraciones activas hacia la privacidad](https://ethresear.ch/t/ethereum-privacy-the-road-to-self-sovereignty/22115) en la capa base de Ethereum, y el protocolo puede que eventualmente asuma parte de este peso. Pero la cadena se actualiza a través de bifurcaciones duras, dos al año en el mejor de los casos, y los cambios relevantes para la privacidad se extenderán a través de varias de ellas. Ese es un cronograma medido en años y decidido por un proceso que no debería apresurarse.

Mientras tanto, los individuos están decidiendo ahora mismo si es seguro recibir pagos en cadena, donar, mantener ahorros allí. Necesitan una privacidad que llegue más rápido de lo que el proceso de consenso social de Ethereum y el calendario de bifurcaciones pueden proporcionar.

La capa de aplicaciones tiene la forma equivocada para el problema. Incluso si cada aplicación descentralizada (dapp) lanzara su propia función de privacidad, cada una solo podría proteger la actividad dentro de sus propios muros, a su manera, con sus propias peculiaridades y secretos que el usuario debe gestionar. Lo que te expone son las conexiones que se ejecutan a través de todas ellas (las direcciones compartidas, los rastros de financiamiento, los enlaces hacia ti) y esas conexiones viven en el espacio entre las aplicaciones. Resolver la privacidad aplicación por aplicación significa resolverla en todas partes excepto donde realmente está el problema. Las dapps no son el lugar donde puede vivir la verdadera solución.

Eso nos deja con la billetera. Es el único software que ve cada dapp a la que te conectas, cada dirección que controlas y cada solicitud que haces. La misma visibilidad que hace que una billetera con filtraciones sea tan costosa es lo que permite a una cuidadosa coordinar la privacidad en todo lo que haces: elegir qué dirección se enfrenta a qué aplicación, enrutar las lecturas para que ningún servidor obtenga la imagen completa, llevar la contabilidad que exigen los protocolos de privacidad.

Y esos protocolos están más avanzados de lo que la mayoría de los constructores asumen. [Railgun](https://railgun.org/) ha procesado más de [5 mil millones de dólares en volumen acumulado](https://dune.com/railgun_project/railgun) y mantiene alrededor de [80 millones de dólares en la actualidad](https://defillama.com/protocol/railgun), las herramientas de direcciones ocultas como [Umbra](https://www.techflowpost.com/en-US/article/30477) han generado decenas de miles de direcciones de un solo uso, y según [un recuento](https://wublock.substack.com/p/ethereum-privacys-https-moment-from) más de 35 equipos están persiguiendo más de una docena de enfoques distintos para las transferencias privadas.

Nada de esto es convencional todavía, y genuinamente faltan piezas. Pero los protocolos funcionan, el dinero real se mueve a través de ellos, y lo que les falta es un lugar en el flujo principal del usuario. Ahí es donde interviene una billetera con visión de futuro.

## Lo que realmente hace una billetera que preserva la privacidad {#what-a-privacy-preserving-wallet-actually-does}

Quita la jerga y la mayor parte del trabajo de privacidad es contabilidad. Usa una dirección nueva aquí, enruta el depósito por allá, guarda esta nota, espera antes de realizar un retiro, nunca dejes que esas dos cuentas se toquen. Es una disciplina en la que los humanos son malos y para la que el software está construido, y hoy en día recae casi por completo en el usuario.

Una billetera que preserva la privacidad es aquella que hace la contabilidad por sí misma en lugar de imponérsela al usuario. El usuario decide qué hacer; la billetera se asegura de que hacerlo no deje ningún rastro hacia ellos.

Comencemos con lo que está en vivo. Los fondos blindados funcionan hoy en día: Railgun mantiene un saldo privado junto a tu saldo público, y una vez que los fondos están dentro, un pago saliente no revela nada sobre tus otras tenencias. Los costos son reales (tarifas más altas que una simple transferencia, generación de pruebas medida en segundos, cierta dependencia de los retransmisores), pero el protocolo ha movido miles de millones en volumen incluso con esas concesiones.

Combina eso con un hábito para el que no se necesita ningún protocolo: una dirección nueva para cada contraparte. Cuando el usuario se conecta a una nueva dapp, la billetera puede ofrecer una dirección dedicada para ella, financiada desde el saldo blindado, para que la aplicación vea una cuenta sin historial y sin cuentas hermanas. Las direcciones ocultas ([ERC-5564](https://eips.ethereum.org/EIPS/eip-5564)) extienden el mismo movimiento a la recepción de pagos. Los mezcladores como [Tornado Cash](https://tornadocash.eth.limo/) y [Privacy Pools](https://privacypools.com/) hacen un trabajo más simple y estrecho: los fondos entran desde una dirección y salen hacia otra, con el vínculo entre las dos cortado. Esa es la herramienta para financiar una dirección nueva que nadie pueda rastrear hasta ti, y la pieza que falta es la billetera produciendo dicha dirección a pedido en lugar de dejarle el ritual al usuario. Nada de esto espera una bifurcación dura o una subvención de investigación. Espera una billetera dispuesta a llevar la contabilidad en nombre de los usuarios.

El lado de la red se trata principalmente de decisiones. Lanzar un producto con cero análisis de terceros es una elección, y al menos una billetera en el mercado ya la ha tomado. En cuanto a la exposición de RPC, la mayoría de las billeteras ya te permiten intercambiar proveedores, por lo que la opcionalidad existe, escondida en una página de configuración que los usuarios avanzados visitan y que todos los demás nunca encuentran.

El movimiento aún no lanzado es la separación: asignar diferentes proveedores a diferentes direcciones para que ningún servidor vea la lista completa, y poner un proxy entre la billetera y el proveedor para que la IP y las direcciones nunca viajen juntas. Un cliente ligero como [Helios](https://github.com/a16z/helios) o [Colibri](https://github.com/corpus-core/colibri-stateless) permite a la billetera verificar las respuestas que obtiene en lugar de aceptarlas a ciegas. Cada uno de estos cuesta algo en infraestructura, latencia o tiempo de ingeniería, pero ninguno de ellos requiere nueva criptografía.

Luego está la frontera. Leer tus saldos hoy significa revelar tu conjunto de direcciones a quienquiera que atienda la consulta, y el trabajo para solucionar eso está ocurriendo ahora mismo: Entornos de Ejecución Confiables combinados con RAM Inconsciente (Oblivious RAM), recuperación de información privada y clientes ligeros que avanzan hacia lecturas completamente privadas. Nada de esto está lo suficientemente establecido como para copiarlo de una implementación de referencia todavía, que es exactamente lo que lo convierte en un terreno que vale la pena reclamar.

El lado de la escritura tiene la misma forma: la transmisión entre pares y las redes mixtas (mixnets) evitarían que una transacción lleve tu IP a un servidor. Las billeteras que implementen estas piezas primero son aquellas con las que se medirá el resto del sector.

Aquí está el estándar, y nota que es un estándar de experiencia de usuario en lugar de uno de criptografía novedosa. Toma la sección con la que se abrió este artículo (iniciar, conectar, aprobar, pagar) y mantenla reconociblemente como esa sesión. Habrá concesiones; una prueba tarda segundos en generarse, una transferencia blindada cuesta más, y un concepto nuevo o dos pueden necesitar un nombre en la interfaz.

Qué tan pequeñas se sientan esas diferencias es el arte de la integración, y separará a las billeteras que lo hacen bien de las que técnicamente lo ofrecen pero de formas que le complican la vida a los usuarios. Lo que tiene que cambiar por completo: ningún análisis se dispara al inicio, cada nueva dapp se encuentra con una dirección sin historial, y el pago a un amigo no revela nada sobre las cuentas detrás de él.

La privacidad que le pide al usuario que se convierta en una persona diferente nunca se propaga. Cuando llega dentro de una experiencia que los usuarios ya entienden, es simplemente una mejor billetera.

## Ideas que vale la pena robar {#ideas-worth-stealing}

Más allá de los fundamentos se encuentra una capa de características que, por lo que puedo decir, nadie ha lanzado. Solo algunas ideas, pero cada una es el tipo de cosa que podría hacer que una billetera sea la opción obvia.

Comencemos con el tiempo. Los conjuntos de anonimato necesitan tiempo para crecer entre pasos, y tus marcas de tiempo revelan silenciosamente más de lo que pensarías: cuándo estás despierto, qué zona horaria mantienes, qué días realizas transacciones. Una billetera podría poner en cola lo que no sea urgente y dispararlo a horas intempestivas: el depósito de blindaje se liquida durante la noche, los fondos están listos por la mañana y ningún ritmo de tu vida se forma jamás en cadena.

Luego, el botón fácil. Un usuario que aparece hoy está completamente expuesto: una frase semilla muy usada, años de historia detrás de ella. Permíteles ingresarla, y la billetera redacta un plan de migración para que lo aprueben: esta cantidad a Railgun, esta cantidad a Privacy Pools, ajusta la división como quieras. Más tarde, cuando se necesiten fondos a la vista, surgen listos y sin exposición: una dirección nueva, una hora intempestiva, una cantidad que no refleja lo que entró. Y a menudo no se necesita ninguna salida. Dentro del ecosistema de Railgun, un usuario puede transferir e intercambiar sin salir nunca a la superficie, ahorrando además las tarifas de salida. Un usuario que era un libro abierto el lunes es ilegible el viernes, y todo lo que hizo fue aprobar un plan.

Una billetera también podría analizar el código (lint) en busca de privacidad. Las heurísticas de agrupamiento en la primera mitad de este artículo son públicas, así que apúntalas a la propia transacción pendiente del usuario y advierte antes de la firma: este pago vinculará estas dos cuentas, este retiro coincide con tu depósito al centavo. Las billeteras ya simulan transacciones para detectar fondos drenados. Simular lo que aprende un espectador es el mismo movimiento dirigido a un riesgo diferente.

Y muéstrale a la gente lo que el observador ya ve. Un panel de control que ejecuta un análisis de clústeres en las propias cuentas del usuario convierte una amenaza abstracta en algo sobre lo que los usuarios sienten la necesidad de actuar: estas cinco direcciones son una sola entidad para un observador, esta cuenta está limpia, este nombre de ENS conecta las dos. También le da a la función del botón fácil mencionada anteriormente su antes y después.

## Pasos a seguir {#action-steps}

### Para constructores {#for-builders}

Cada sección de este artículo termina en el mismo lugar: una elección que la billetera tiene la oportunidad de tomar.

La forma de tomar esas decisiones es mediante configuraciones predeterminadas sensatas que el usuario pueda anular, todas y cada una de ellas. Establece por defecto la ruta privada, porque la configuración predeterminada es con la que vivirán la mayoría de los usuarios. Pero déjalo abierto a la opcionalidad dirigida por el usuario, porque a un usuario que no puede apuntar su billetera a un servidor RPC diferente, o a su propio nodo, no se le ha entregado realmente la soberanía.

No tienes que empezar desde cero. El [SDK de Kohaku](https://github.com/ethereum/kohaku) empaqueta varias de las primitivas de este artículo (saldos blindados, mezcladores, clientes ligeros) para que una billetera pueda adoptarlas sin reconstruir cada protocolo desde cero. Las piezas están en el estante. Algunas cosas importan mucho antes de que alguien las pida. Nadie vio a las masas pidiendo cifrado de extremo a extremo tampoco; se lanzó como predeterminado, miles de millones de personas lo obtuvieron sin darse cuenta ni importarles, y ahora una aplicación de mensajería sin él se siente rota y violatoria.

El dinero que no se puede usar para encontrarte, perfilarte o atacarte pertenece a la misma categoría. La billetera que lo trate de esa manera será la próxima gran billetera.

### Para usuarios {#for-users}

La billetera que usas es la que estás promoviendo como norma. Elige billeteras que se tomen en serio tu privacidad y seguridad. Esto puede significar sacrificar la interfaz más fluida por la más segura y privada. En este momento, esto probablemente significa mantenerse al día con lo último en [Walletbeat](https://www.walletbeat.fyi/), ver qué billeteras están haciendo un cambio hacia la habilitación de la privacidad del usuario y tomarse el tiempo para probarlas.

## Para mayor exploración {#for-further-exploration}

- [Tarjeta de puntuación de privacidad de billeteras](https://www.theopensourcepress.com/crypto-wallet-ip-exposure-scorecard-2026/): exposición de red en el primer inicio de 13 billeteras
- [ERC-5564: Direcciones ocultas](https://eips.ethereum.org/EIPS/eip-5564)
- [Railgun](https://railgun.org/), [Privacy Pools](https://privacypools.com/) y [Tornado Cash](https://tornadocash.eth.limo/)
- Clientes ligeros [Helios](https://github.com/a16z/helios) y [Colibri](https://github.com/corpus-core/colibri-stateless)
- [Kohaku](https://github.com/ethereum/kohaku): SDK de privacidad para constructores de billeteras
- [Walletbeat](https://www.walletbeat.fyi/): cómo se comparan las billeteras existentes