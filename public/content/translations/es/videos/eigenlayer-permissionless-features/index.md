---
title: "EigenLayer: adición de características sin permisos a Ethereum"
description: "Sreeram Kannan presenta el enfoque de EigenLayer para la adición de características sin permisos en Ethereum."
lang: es
youtubeId: "-V-fG4J1N_M"
uploadDate: 2023-02-10
duration: "0:24:11"
educationLevel: advanced
topic:
  - "restaking"
  - "eigenlayer"
  - "seguridad"
format: presentation
author: a16z crypto
breadcrumb: "EigenLayer"
---

Una charla de investigación de **Sreeram Kannan** (Universidad de Washington / EigenLayer) en un evento de investigación cripto de a16z, que explica cómo EigenLayer tiene como objetivo permitir la innovación sin permisos en Ethereum al permitir a los participantes comprometer el mismo capital en participación a condiciones de recorte adicionales a cambio de proporcionar nuevos servicios como oráculos, puentes, capas de disponibilidad de datos y entornos de ejecución alternativos.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=-V-fG4J1N_M) publicada por a16z crypto. Ha sido ligeramente editada para facilitar su lectura.*

#### Introducción (0:00) {#introduction-000}

Hoy voy a hablar sobre uno de los productos que estamos construyendo, que también es una idea llamada EigenLayer. Llamamos a EigenLayer el colectivo de restaking, pero lo que hace es permitir que cualquiera agregue nuevas características a Ethereum.

Como presentó Tim, soy profesor asociado en la Universidad de Washington en Seattle, donde hemos estado trabajando en cadenas de bloques, consenso y otras áreas durante los últimos cuatro años y medio. Durante el último año, he estado fundando la startup EigenLayer Labs. Hemos trabajado mucho en protocolos de consenso: tuvimos un artículo llamado "Everything is a Race" (Todo es una carrera) que analiza las condiciones bajo las cuales los protocolos del tipo de cadena más larga de prueba de trabajo (PoW), prueba de participación (PoS) y prueba de espacio son seguros. Construimos sobre parte de esa comprensión; por ejemplo, un artículo llamado Prism, que es un protocolo de prueba de trabajo con muy baja latencia. También realizamos un trabajo llamado PoSAT sobre cómo crear un protocolo de prueba de participación dinámicamente disponible, donde su protocolo continúa funcionando bajo una participación variable.

#### Cuándo son responsables las cadenas de bloques (1:31) {#when-are-blockchains-accountable-131}

También exploramos cuándo las cadenas de bloques son responsables. Una heurística es que cuando tienes cuórums y firmas, si un grupo de participantes firma dos veces un bloque, esas cadenas de bloques son responsables. Pero hay sutilezas: por ejemplo, un protocolo como Algorand, que también usa cuórums, no es responsable porque depende de suposiciones de tiempo donde puedes crear violaciones de seguridad al no decir nada.

#### Consenso de múltiples recursos (2:11) {#multi-resource-consensus-211}

Los dos trabajos más recientes tratan sobre el consenso de múltiples recursos: supongamos que desea construir un protocolo que utilice prueba de participación, prueba de espacio y prueba de trabajo, todo combinado en un solo protocolo. Desea que funcione incluso si la mayoría de los mineros de prueba de trabajo son maliciosos, siempre que una fracción muy pequeña de los mineros de prueba de participación sea honesta. Hemos caracterizado las regiones de compensación a través de múltiples recursos.

También trabajamos en el diseño de topología entre pares: ¿cómo se asegura de que en la red entre pares de una cadena de bloques, el protocolo de consenso respete el orden de los mensajes? Una de las cosas que ocurre de manera desenfrenada en las cadenas de bloques es el front-running. Para evitar el front-running no dirigido, donde simplemente desea adelantarse a todos los demás porque tiene una ventaja de precio, tenemos un artículo llamado Themis que le da a la cadena de bloques una propiedad nativa de primero en entrar, primero en salir (FIFO).

Además del consenso, existen soluciones de escalado como la fragmentación. Tuvimos un par de artículos, Coded Merkle Tree y Free2Shard, sobre eso.

Una cosa que encontramos como una fricción importante en la cadena de bloques es que la tasa de innovación en las capas centrales (en el consenso, la fragmentación o entre pares) es mucho menor que la tasa de innovación en la capa de aplicación. Las aplicaciones se pueden desplegar sin permisos: cualquiera puede desplegar una aplicación sobre una cadena de bloques existente como Ethereum. Mientras que las actualizaciones del protocolo central son con permisos en un sentido muy profundo. Esto ha estancado bastante nuestro espacio.

#### Desacoplando la confianza y la innovación (8:30) {#decoupling-trust-and-innovation-830}

Remontando la historia a 2008-2009: Bitcoin fue pionero en la confianza descentralizada a través de la minería de prueba de trabajo. Además de la minería, hay un protocolo de consenso (la cadena más larga o la cadena más pesada) que decide la cadena válida. Además de eso, Bitcoin Script establece la semántica de ejecución. Así que tenemos una capa de confianza en la base, una capa de consenso en la parte superior y una capa de ejecución por encima de eso.

Pero Bitcoin también era una cadena de bloques específica para una aplicación, diseñada para una sola aplicación: el intercambio de Bitcoin entre clientes. Volviendo a 2011, cualquier nueva aplicación que necesitara construirse en una cadena de bloques necesitaba su propia red de confianza. Por ejemplo, alguien quería construir un sistema de nombres de dominio descentralizado llamado Namecoin. La capa de scripting de Bitcoin no ofrecía suficiente programabilidad, por lo que había que crear una nueva capa de scripting y una nueva red de confianza. No había forma de compartir la confianza entre Namecoin y Bitcoin.

La idea central construida por Ethereum fue el desacoplamiento de la confianza y la innovación. Tomaron la capa de scripting de Bitcoin y la reemplazaron con una capa de programación de propósito general Turing completa: la Máquina Virtual de Ethereum (EVM). Esta fue una pequeña actualización técnica en un sentido básico, pero lo que creó fue la modularidad de la confianza. Ahora cualquiera puede venir y construir aplicaciones descentralizadas (dapps) sobre el sistema. La persona que construyó ENS no tuvo nada que ver con la red de confianza. La confianza de la red Ethereum se convirtió en un módulo que se puede suministrar a cualquier aplicación distribuida.

#### Innovación abierta (10:23) {#open-innovation-1023}

Esto condujo a una aceleración masiva de la economía seudónima. Cualquiera que cree estas aplicaciones no es de confianza en sí mismo, simplemente está aportando innovación. Se te ocurre una idea, puedes ser un don nadie, no necesitas que confíen en ti, simplemente escribes tu código, lo pones en Ethereum y todos confían en que Ethereum continuará ejecutando las condiciones tal como se establecen.

Una forma de modelar esto: las capas base (la red de confianza, el consenso y la máquina virtual) se agrupan en una red de confianza que produce confianza. La cadena de bloques de Ethereum es un productor de confianza. Las aplicaciones distribuidas son consumidores de confianza. El intercambio de valor es: las dapps obtienen confianza de Ethereum y, a cambio, pagan tarifas. Al igual que el capital de riesgo fue el desacoplamiento del capital y la innovación, Ethereum desacopló la confianza y la innovación.

Pero las barreras a la innovación abierta continúan persistiendo. Si tengo una idea de cómo actualizar el protocolo de consenso de Ethereum (digamos que es 2019 y se me ocurrió el protocolo de consenso de Avalanche), no hay forma de desplegarlo en Ethereum. Entonces, ¿qué hago? Voy y creo mi propio mundo entero. Esta es la era de las cadenas de bloques alternativas de capa 1 (l1): cada una con diferentes protocolos de consenso, diferentes máquinas virtuales, pero cada una teniendo que construir sus propias redes de confianza.

Esta imagen se ve exactamente como la imagen de 2011 de Bitcoin y Namecoin. Las innovaciones a nivel de dapp simplemente pueden construirse sobre Ethereum, pero las innovaciones que van más profundo y tocan el corazón de la pila tecnológica tienen que crear ecosistemas de confianza fragmentados.

Además, Ethereum solo suministra confianza a las dapps para la creación de bloques: el ordenamiento de transacciones y la ejecución de transacciones. Eso es todo. Si las dapps quisieran confianza en cualquier otra cosa (leer datos de Internet, leer datos de otra cadena de bloques, ejecutar un motor de ejecución diferente, ejecutar un motor de juegos, ejecutar un sistema de autenticación), tienen que crear su propia red de confianza. Chainlink es un gran ejemplo: es un protocolo de oráculo que ayuda a obtener datos de Internet hacia la cadena de bloques, pero Chainlink tiene su propia red de confianza. Su confianza no es prestada de los participantes de Ethereum.

#### Problema microeconómico (16:28) {#microeconomic-problem-1628}

El problema microeconómico: si está ejecutando un middleware (digamos, un sistema de almacenamiento de datos), tiene que crear su propio mecanismo de staking. Necesita una alta seguridad económica, lo que significa mucho capital en participación, y luego tiene el costo de oportunidad del capital. Por ejemplo, desea 10 mil millones de dólares en participación en su capa de almacenamiento de datos. Tiene que pagar una tasa anual del 5% o 10% sobre ese capital en un mundo no especulativo. El costo dominante no es el costo operativo de almacenar datos: es el costo de alimentar una base de capital económico masiva.

Si observa cualquier ecosistema de prueba de participación: el 94% de las recompensas van a la persona que posee el capital, y solo el 6% va a la persona que realmente realiza las operaciones. Así que incluso si se le ocurre una idea innovadora para reducir los costos operativos en 10 veces, el 94% permanece sin cambios. Su estructura de costos está limitada por el costo del capital.

Si usted es una dapp, el problema microeconómico es que está pagando una tarifa muy alta a una gran red de confianza como Ethereum, pero está limitado por la confianza más débil de la que depende. Si tuviera un oráculo o un puente que no fuera tan confiable, podría ser explotado allí. Su seguridad es siempre el mínimo común denominador.

#### Problema económico (19:52) {#economic-problem-1952}

Para la cadena de bloques central, si la propuesta de valor central es proveer confianza descentralizada y obtener ingresos de ella, Ethereum solo es capaz de proveer confianza descentralizada en la creación de bloques, no en todas las demás cosas requeridas para ejecutar un servicio descentralizado. Otros middleware están creando islas de confianza descentralizada, y en lugar de que los ingresos se alineen y creen una red de confianza masiva, los ingresos se fragmentan en islas más pequeñas.

#### EigenLayer (20:44) {#eigenlayer-2044}

En realidad, es una idea ridículamente simple que resuelve todos estos problemas a la vez.

EigenLayer es un mecanismo para aprovechar una red de confianza existente para hacer otras cosas para las que no estaba destinada. Ethereum suministra confianza en el ordenamiento y la ejecución. EigenLayer es una serie de contratos inteligentes en Ethereum, y la palabra operativa central es restaking.

¿Qué es el restaking? En el Ethereum de prueba de participación, ya hay varias decenas de miles de millones de dólares en participación en la cadena de balizas. EigenLayer es un mecanismo mediante el cual los participantes hacen restaking: ponen el mismo capital en un riesgo adicional. Bloquean su participación en Ethereum, y la misma participación se compromete a condiciones de recorte adicionales. El recorte es un mecanismo mediante el cual se le puede quitar su participación, pero ahora agrega razones adicionales por las que puede ser penalizado, además de los contratos inteligentes de EigenLayer.

La propiedad que queremos: la misma participación asume un riesgo adicional. ¿Riesgo adicional en qué? En proporcionar cualquier servicio nuevo que se haya construido sobre EigenLayer: alguien quiere construir un oráculo, un puente, una capa de disponibilidad de datos, un nuevo protocolo de consenso. Cualquiera de estos se puede construir sobre EigenLayer. Si usted es un participante que opta por participar, también especifica a qué subconjunto de servicios se está inscribiendo, y de ese modo obtiene ingresos al mismo tiempo que asume un riesgo de recorte adicional.

#### Cómo EigenLayer alinea el ecosistema (23:50) {#how-eigenlayer-aligns-the-ecosystem-2350}

Para el middleware: si un participante que ya ha hecho staking en Ethereum opta por proporcionar también servicios en un oráculo, no tiene un costo de capital adicional. Ya ha hecho staking en Ethereum y está ganando un APR. Al optar por EigenLayer, el costo marginal del capital es muy pequeño o teóricamente cero. Si sabe que como nodo honesto nunca sufrirá un recorte, el riesgo se minimiza. La ecuación se convierte en: ¿está el costo operativo justificado por los ingresos? La estructura de costos del middleware se transforma repentinamente de estar limitada por el capital a estar limitada por el costo operativo.

Para las dapps: especialmente los servicios populares en los que muchos participantes optan por participar proporcionan la misma confianza que el propio Ethereum. Si todos los participantes optaran potencialmente por participar, podría obtener la confianza central de Ethereum en servicios que no se construyeron de forma nativa en Ethereum.

También está alineado en valor con el ecosistema central. Los participantes que hicieron staking en Ethereum obtienen recompensas de bloque y tarifas de transacción, pero también pueden obtener tarifas de oráculo, tarifas de disponibilidad de datos, tarifas de ordenamiento, todas cosas que antes no estaban disponibles. El hecho de que haya fuentes adicionales de ingresos por hacer staking de ETH aumenta el valor del propio token.

EigenLayer es un mercado de dos lados. Un lado son los participantes que optan por participar. El otro lado son los middleware y servicios construidos sobre EigenLayer que optan por utilizar a estos participantes.

#### Sobreapalancamiento y gestión de riesgos (33:00) {#over-leveraging-and-risk-management-3300}

**Pregunta del público:** ¿Qué pasa si la participación se está sobreapalancando?

Digamos que hay diez dapps diferentes ejecutando sus propias cadenas, cada una con 1 millón de dólares en valor dependiendo del mismo cuórum de participantes de 2 millones de dólares: esa participación se sobreapalanca. EigenLayer también es la capa de gestión de riesgos. Modelamos esto como un problema de grafos: cada participante es un nodo, cada servicio depende de un grupo de participantes y hay un beneficio por corrupción para cada servicio. Luego, se calculan los cortes en este grafo para garantizar que el sistema nunca esté sobreapalancado.

Si el sistema se sobreapalanca, las tarifas suben, más personas optan por participar y el sistema vuelve a estar subapalancado. A medida que se inician más servicios, las oportunidades de rendimiento aumentan y se bloquea más capital: en lugar de que el 5% de ETH esté en participación, podría tener el 50%.

#### Economía del espacio de bloques (43:58) {#block-space-economics-4358}

El espacio de bloques está determinado por el límite del bloque: el tamaño máximo que puede acomodar un bloque. Todos los sistemas de cadena de bloques tienen una economía autoajustable en la que, a medida que el tamaño de su bloque se acerca al límite del bloque, los precios comienzan a dispararse.

El límite del bloque lo establece la infraestructura del nodo más débil. La filosofía de Ethereum es admitir un validador doméstico en Venezuela, tal vez de 1 megabyte por segundo. Así es como se establece el límite del bloque. Pero todos los participantes que se ejecutan en Amazon Web Services tienen conexiones de 10 gigabits: una diferencia de 10.000 veces con respecto al nodo más débil.

EigenLayer resuelve esto automáticamente creando un mercado libre donde estos participantes pueden prestar su espacio de bloques adicional para otros servicios. Alguien podría construir otra cadena con 15 giga-gas por bloque en lugar de 15 millones de gas. Obtienes algo así como el 60% de la seguridad de Ethereum, y eso ya es lo suficientemente bueno.

#### Heterogeneidad de los participantes (48:57) {#staker-heterogeneity-4857}

La heterogeneidad de los participantes se extiende más allá de las capacidades computacionales. Los participantes son muy heterogéneos en sus preferencias de riesgo y recompensa. Usted y yo podemos estar de acuerdo en que sufriremos un recorte si diferimos de la salida de una API de Coinbase, pero para otra persona eso es completamente inaceptable. Esto nunca se puede normalizar en un protocolo central, pero se puede externalizar en una capa de participación opcional.

Los participantes también son heterogéneos en las preferencias de recompensa. En Ethereum, el espacio de bloques es una cantidad incolora: todas las transacciones son iguales y la única señal para distinguirlas es el precio. Es muy difícil construir una red social sobre Ethereum porque cada transacción de la red social compite con una transacción de finanzas descentralizadas (DeFi) que es mucho más rentable transacción por transacción. Nuestra solución: los participantes optan por diferentes subcadenas en las que tienen diferentes preferencias de recompensa.

#### Innovación democrática y ágil (51:01) {#democratic-and-agile-innovation-5101}

EigenLayer resuelve el problema de cómo diseñar una cadena de bloques que sea a la vez democrática y ágil en la innovación. Ethereum está gobernado de manera muy democrática, pero también es muy lento para responder. Todos los protocolos actuales hacen una concesión entre la agilidad y la gobernanza democrática. Ethereum más EigenLayer obtiene lo mejor de ambos mundos: una capa base que es democrática y se actualiza lentamente, sobre la cual EigenLayer permite a las personas construir innovaciones que responden rápidamente a las demandas del mercado de una manera completamente sin permisos.

#### EigenDA y cierre (52:56) {#eigenda-and-closing-5256}

Estamos explorando la construcción de puentes, automatización impulsada por eventos, servicios de ordenamiento justo, cadenas laterales y la integración de MEV, todo en EigenLayer. EigenLayer ya está en vivo en redes de prueba internas. Ya hemos construido el primer caso de uso: una capa de disponibilidad de datos a hiperescala para Ethereum llamada EigenDA. Es una capa de disponibilidad de datos que incorpora las mejores ideas en codificación de borrado y compromisos polinómicos. En nuestra red de prueba, la velocidad a la que se pueden escribir datos es de 12,4 megabytes por segundo, 10 veces mayor de lo que está programado que envíe Ethereum 2.0.

La idea clave es que con la codificación de borrado, el costo total de almacenar un archivo no depende de la cantidad de nodos que optaron por participar. Pero el precio que puede cobrar depende de la cantidad de nodos porque está brindando más seguridad económica. Hay una economía de autoescalado en la que cada vez más nodos optarán por participar porque pueden cobrar una prima de seguridad sin aumentar el costo operativo. La codificación de borrado rompe la compensación entre escalabilidad y descentralización: se obtiene una descentralización completa y una escalabilidad completa simultáneamente.

#### Aspectos destacados de preguntas y respuestas (58:00) {#qa-highlights-5800}

**Sobre las auditorías de middleware:** Al igual que hay un ecosistema de auditoría de contratos inteligentes, necesitamos ecosistemas de auditoría de middleware. La auditoría de contratos inteligentes sirve a los usuarios que se supone que no saben nada. La auditoría de middleware sirve a los participantes que se supone que saben algo. Si no podemos hacer que las auditorías de middleware funcionen, tampoco deberíamos confiar realmente en las auditorías de contratos inteligentes.

**Sobre el riesgo:** El ejemplo extremo: toda la participación optó por un sistema EigenLayer en el que podría sufrir un recorte incluso sin hacer nada malo, y luego sufrió un recorte y todo el protocolo está en riesgo. Es posible. Pero los participantes son los que pierden su dinero, por lo que deberían tener más cuidado al optar por participar. Facilitarles que tengan cuidado es en lo que nos estamos enfocando.

**Sobre el espacio de bloques de capa 1 (l1) frente a las cadenas laterales:** Puede ejecutar un sistema muy diferente (como una máquina virtual de Solana) sobre la red de confianza de Ethereum. La condición de recorte es simple: si firma dos veces un bloque en la misma profundidad, esa es una condición verificable en cadena y sufre un recorte. La estructura de costos funciona porque quienes hacen restaking no tienen un costo de capital adicional, y la diferencia entre una cadena lateral de EigenLayer y tener su propia cadena es que no necesita un nuevo token de valor y no necesita pagar para mantener el costo de capital de ese token.