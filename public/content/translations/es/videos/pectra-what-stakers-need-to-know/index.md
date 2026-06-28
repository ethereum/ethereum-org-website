---
title: "Actualización Pectra de Ethereum: lo que deben saber quienes hacen staking"
description: "Explicación de la actualización Pectra desde la perspectiva de quienes hacen staking, cubriendo los impactos prácticos en los validadores, las operaciones de staking y las EIP clave que afectan el staking en el protocolo Ethereum."
lang: es
youtubeId: "_UpAFpC7X6Y"
uploadDate: 2025-01-22
duration: "0:09:14"
educationLevel: intermediate
topic:
  - "roadmap"
  - "pectra"
  - "staking"
format: explainer
author: Blockdaemon
breadcrumb: "Pectra para quienes hacen staking"
---

Un seminario web organizado por **Blockdaemon** con la ingeniera de cadena de bloques Julia Schmidt (Alluvial) y Freddy Tänzer (Blockdaemon) en el que se analiza cómo la actualización Pectra afecta el staking de ETH. El seminario web cubre los retiros activables desde la capa de ejecución, los aumentos del saldo efectivo máximo, la consolidación de validadores y las implicaciones del staking líquido.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=_UpAFpC7X6Y) publicada por Blockdaemon. Ha sido ligeramente editada para facilitar su lectura.*

#### Introducción (0:00) {#introduction-000}

**Presentador:** Hola y bienvenidos a este seminario web organizado por Blockdaemon centrado en la próxima actualización Pectra de Ethereum. Hoy nos acompañan Julia Schmidt, ingeniera de cadena de bloques en Alluvial, y Freddy Tänzer, líder del ecosistema de Ethereum en Blockdaemon, para hablar sobre cómo los cambios de Pectra afectarán el staking de ETH, la red en su conjunto, los servicios de staking líquido y más. Para empezar, Freddy, ¿podrías darnos una breve descripción general de la actualización Pectra y cuál será su impacto para quienes hacen staking?

#### Qué es Pectra (1:28) {#what-is-pectra-128}

**Freddy Tänzer:** Pectra es una actualización de Ethereum que está programada para finales del primer trimestre de 2025, alrededor de marzo, aunque podría retrasarse un poco, tal vez hasta abril más o menos. En un principio se suponía que sería una pequeña bifurcación, y luego se fueron añadiendo más y más cosas, por lo que ahora la han dividido en dos.

La primera parte contiene muchas cosas, por ejemplo, con respecto a las cuentas inteligentes, la abstracción de cuentas y cosas por el estilo, pero quiero centrarme realmente en las cosas que son relevantes para nuestra audiencia en términos de los cambios en el staking. Hay principalmente dos grandes cambios.

El primero es el hecho de que puedes activar retiros y salidas de tu validador a través de la capa de ejecución (las credenciales de retiro), eliminando básicamente la dependencia del operador del nodo. El segundo, posiblemente aún mayor en su efecto, es que el saldo efectivo máximo de un validador ahora puede cambiar. Antes solía ser solo de 32 ETH como cantidad fija, y ahora puede ser de cualquier valor entre 32 y 2.048 ETH.

También hay uno más pequeño que básicamente hace que los depósitos sean mucho más rápidos (registrados en cadena de unas 14 horas a menos de una hora), pero creo que esos dos son los más relevantes para nuestra discusión aquí.

#### EIP-7002: salidas activables desde la capa de ejecución (2:58) {#eip-7002-execution-layer-triggerable-exits-258}

**Presentador:** En cuanto al primer cambio importante, Julia, ¿podrías explicar cómo cambiará el proceso después de Pectra en comparación con las formas actuales en que se inician los retiros en el ecosistema de staking de Ethereum?

**Julia Schmidt:** Para proponer y dar fe de los bloques, el validador debe estar constantemente en línea y tener un saldo en staking de 32 ETH. Cuando configuras un validador para participar en el mecanismo de consenso, configuras dos claves. Una es la clave del validador, que se utiliza para realizar las tareas del validador: firmar las atestaciones de bloques. La segunda es la clave de retiro, que representa la propiedad de los ETH en staking.

Tienes dos formas de hacer staking: staking en solitario, o configuraciones multicustodia como con Blockdaemon y como lo estamos haciendo en Liquid Collective, donde puedes elegir a tu operador de nodo para que realice todas las tareas y operaciones del validador en tu nombre. Eso les da la clave del validador, y tú solo tienes acceso a la clave de retiro.

El mensaje real para la salida de un validador solo se puede enviar desde la clave del validador que está controlada por el operador del nodo. Eso requiere que confíes en tu operador de nodo, que dependas de él para que realice la salida de tu validador por ti. Si lo hacen, es genial, pero siempre tienes que depender de este tercero.

Lo que sucedía anteriormente era que aceptabas prefirmar mensajes de salida cuando configurabas esta estructura de staking multicustodia. Obtenías un mensaje que podías usar más tarde para la salida de tu validador, pero no sabías si el mensaje de salida realmente funcionaría. Cada vez que había una actualización en Ethereum que cambiaba el número de versión, tu mensaje de salida podría dejar de funcionar.

En la última actualización Dencun, una nueva EIP cambió el tiempo de expiración de estos mensajes de salida, pero solo estaba tratando el síntoma, no resolviendo el problema. El problema real es que el propietario de los ETH en staking no puede activar el retiro. Los fondos pueden ser esencialmente tomados como rehenes por el operador del nodo.

Esto ahora se resuelve con la EIP-7002, que permite que tanto la clave del validador como la clave de retiro activen la salida desde la capa de ejecución, simplemente enviando una transacción a un contrato de retiro especial donde envías una solicitud de retiro y especificas una salida completa del validador o un retiro parcial del saldo en staking.

#### EIP-7251: saldo efectivo máximo (4:15) {#eip-7251-max-effective-balance-415}

**Presentador:** Freddy, ¿podrías darnos una descripción general del saldo efectivo máximo en el futuro a partir de Pectra, y cómo esto afectará a las personas que actualmente hacen staking?

**Freddy Tänzer:** Solo para agregar: para nuestros clientes institucionales, esta dependencia del operador del nodo generalmente se abordaba con mensajes de salida prefirmados, principalmente para abordar las preocupaciones de los reguladores o las preocupaciones de continuidad del negocio. También tenían que mantener seguros esos mensajes de salida. Así que hay una clara simplificación del proceso, eliminando esa dependencia.

Ahora, sobre el saldo efectivo máximo: muchas cosas no cambian, y todo esto es opcional. No tienes que cambiar nada. El objetivo de los desarrolladores principales de Ethereum y del ecosistema en general es reducir la cantidad de validadores en la red. Ahora tenemos más de un millón de validadores, y cada uno tiene que comunicarse con los demás sobre las atestaciones y el consenso. Eso es mucho tráfico de red; las pruebas han demostrado que llegar a dos millones de validadores podría ser un problema.

El objetivo es reducir el número de validadores sin afectar la seguridad de la red, ya que la cantidad total de ETH en staking se mantendría constante, solo habría más ETH por validador en promedio.

Para el cliente, esto significa principalmente que debe decidir si usar el nuevo tipo de validador o el antiguo. Esto depende de sus necesidades de liquidez. En la configuración actual con validadores de 32 ETH, las recompensas de tu protocolo se enviarán a tus credenciales de retiro cada nueve o diez días, lo que te brinda liquidez regular.

Pero muchas configuraciones asumen que las recompensas se utilizan para capitalizar la participación. En el pasado, al capitalizar, tenías que esperar hasta tener 32 ETH en recompensas para lanzar manualmente un nuevo validador. Con el nuevo tipo de validador, tus recompensas se capitalizan automáticamente: eso significa más recompensas y menos trabajo.

La desventaja es que no obtienes recompensas de forma regular y necesitas configurar un proceso para recuperarlas. Los activadores de retiro ahora son transacciones regulares que incurren en una tarifa de gas, en lugar de recibir recompensas de forma gratuita en el modelo antiguo.

También hay buenas noticias sobre el recorte: la penalización inicial por recorte se reducirá drásticamente, en aproximadamente 128 veces. Con un validador de 32 ETH, la penalización inicial era de un ETH. Después de Pectra, será una fracción de un ETH, tal vez $20 o $25. Esto tiene efectos secundarios positivos en el staking en solitario, lo que obviamente es importante para la neutralidad creíble de Ethereum.

El beneficio de la capitalización automática beneficia principalmente a cantidades más pequeñas de participación. Si tienes mil validadores, podrías lanzar manualmente uno nuevo cada mes. Pero si solo tienes un validador, prácticamente tendrías que esperar 32 años para capitalizar.

#### Implicaciones del staking líquido (11:25) {#liquid-staking-implications-1125}

**Presentador:** Julia, ¿cómo se compara la consolidación de validadores más grandes con los beneficios del staking líquido? ¿Cómo sopesarán estas decisiones en la mente de quienes hacen staking después de Pectra?

**Julia Schmidt:** En Alluvial, hemos estado siguiendo de cerca estos cambios y queremos ofrecer ambas soluciones. Las solicitudes de consolidación en Pectra son una solución provisional que no debería afectar el tiempo de ganancia de tu saldo efectivo: no tendrá que pasar por una cola de activación nuevamente al consolidar múltiples validadores. El proceso es bastante fluido.

El hecho de que se haya reducido la penalización inicial por recorte reduce el riesgo de ejecutar validadores de alto saldo. El impulso de la Fundación Ethereum es realmente consolidar todo lo que podamos para reducir la carga de la red. Hay una pequeña desventaja: en el caso muy raro de que un validador de saldo efectivo máximo de 2.048 ETH sufra un recorte, entraría en la cola de salida y tus fondos quedarían bloqueados por más tiempo; sería como si 64 validadores sufrieran un recorte a la vez. Por lo tanto, intentaríamos ofrecer límites máximos de validadores flexibles de acuerdo con el apetito de riesgo del cliente.

Por el lado de la utilidad, un token de staking líquido (LST) obviamente agrega liquidez; incluso con retiros parciales desde la capa de ejecución, no será instantáneo. Envías la transacción, se pone en cola, luego está la época de salida y la época de retiro. Los tokens de staking líquido aún ofrecen liquidez instantánea que los retiros parciales no pueden ofrecer.

#### Próximos pasos para quienes hacen staking (16:20) {#next-steps-for-stakers-1620}

**Freddy Tänzer:** Lo que vemos es que las instituciones financieras normalmente harían staking de entre el 65 % y el 85 % de sus ETH bajo custodia, porque necesitan el resto como un margen de liquidez para los reembolsos. Con el staking líquido, puedes aumentar potencialmente la cantidad de ETH en staking, lo que genera mayores recompensas.

Ambas partes se benefician de Pectra: el staking líquido obtiene la opción de retiros desde la capa de ejecución, y el staking tradicional obtiene la eliminación del problema del incremento de 32 ETH, particularmente para participaciones más pequeñas.

**Julia Schmidt:** Con el protocolo Liquid Collective, no solo ofrecemos staking a un operador de nodo: tenemos un consorcio de diferentes operadores de nodos a los que asignamos participaciones en un enfoque de turnos (round-robin). Eso aumenta la descentralización de los ETH en staking. Y estos operadores de nodos siguen el NORS (Estándar de Riesgo del Operador de Nodo), por lo que también garantizamos cobertura en caso de recorte.

Una ventaja clave que aún no he mencionado son los retiros parciales: ahora que puedes retirar ETH en staking desde la capa de ejecución, esto abre nuevas vías para que protocolos como EigenLayer activen retiros y salidas. Hay un gran aumento en la funcionalidad y la interoperabilidad que las finanzas descentralizadas (DeFi) ahora pueden incorporar mejor en todo el ciclo de vida del validador, desde el depósito hasta la salida. Como ingeniera de cadena de bloques, es emocionante poder automatizar todo el flujo de trabajo.

#### Cierre (19:50) {#closing-1950}

**Presentador:** Julia, ¿dónde puede ir la gente para obtener más información sobre Liquid Collective y Alluvial?

**Julia Schmidt:** Pueden seguir a Alluvial y Liquid Collective en Twitter, en X, en LinkedIn o en el sitio web de Alluvial. Compartiremos un artículo que detalla los cambios con respecto a la actualización Pectra y cómo afectarán el panorama de Ethereum.

**Presentador:** Freddy, ¿alguna novedad para compartir sobre Pectra?

**Freddy Tänzer:** Tenemos mucho por venir. Vamos a tener una página dedicada en nuestro sitio web, blockdaemon.com; será el centro principal de todos los recursos. Tendremos una publicación de blog, preguntas frecuentes y algunas recomendaciones de orientación y modelado con respecto a qué tipo de validador elegir y de qué tamaño. Ya sea que desees un validador de 2.000 ETH, o dos de 1.000, o cuatro de 500, todos estos son generalmente posibles, y hay decisiones de compromiso que tomar. Ayudaremos a nuestros clientes a navegar por esto.

**Presentador:** Fantástico. Freddy, Julia, muchas gracias por su tiempo hoy: una discusión fascinante y una excelente introducción a Pectra.