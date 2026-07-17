---
title: Canales de estado
description: "Una introducción a los canales de estado y canales de pago como una solución de escalabilidad utilizada actualmente por la comunidad de Ethereum."
lang: es
sidebarDepth: 3
---

Los canales de estado permiten a los participantes realizar transacciones de forma segura fuera de la cadena mientras mantienen la interacción con la [red principal de Ethereum](/) al mínimo. Los pares del canal pueden realizar un número arbitrario de transacciones fuera de la cadena mientras solo envían dos transacciones en cadena para abrir y cerrar el canal. Esto permite una capacidad de procesamiento de transacciones extremadamente alta y resulta en menores costos para los usuarios.

## Requisitos previos {#prerequisites}

Debería haber leído y comprendido nuestras páginas sobre [escalabilidad de Ethereum](/developers/docs/scaling/) y la [capa 2 (l2)](/layer-2/).

## ¿Qué son los canales? {#what-are-channels}

Las cadenas de bloques públicas, como Ethereum, se enfrentan a desafíos de escalabilidad debido a su arquitectura distribuida: las transacciones en cadena deben ser ejecutadas por todos los nodos. Los nodos tienen que ser capaces de manejar el volumen de transacciones en un bloque utilizando hardware modesto, lo que impone un límite en la capacidad de procesamiento de transacciones para mantener la red descentralizada. Los canales de la cadena de bloques resuelven este problema al permitir a los usuarios interactuar fuera de la cadena mientras siguen dependiendo de la seguridad de la cadena principal para la liquidación final.

Los canales son protocolos simples entre pares que permiten a dos partes realizar muchas transacciones entre sí y luego solo publicar los resultados finales en la cadena de bloques. El canal utiliza criptografía para demostrar que los datos resumidos que generan son verdaderamente el resultado de un conjunto válido de transacciones intermedias. Un contrato inteligente [«multifirma»](/developers/docs/smart-contracts/#multisig) garantiza que las transacciones sean firmadas por las partes correctas.

Con los canales, los cambios de estado son ejecutados y validados por las partes interesadas, minimizando la computación en la capa de ejecución de Ethereum. Esto disminuye la congestión en Ethereum y también aumenta las velocidades de procesamiento de transacciones para los usuarios.

Cada canal es gestionado por un [contrato inteligente multifirma](/developers/docs/smart-contracts/#multisig) que se ejecuta en Ethereum. Para abrir un canal, los participantes despliegan el contrato del canal en cadena y depositan fondos en él. Ambas partes firman colectivamente una actualización de estado para inicializar el estado del canal, después de lo cual pueden realizar transacciones de forma rápida y libre fuera de la cadena.

Para cerrar el canal, los participantes envían el último estado acordado del canal en cadena. Posteriormente, el contrato inteligente distribuye los fondos bloqueados de acuerdo con el saldo de cada participante en el estado final del canal.

Los canales entre pares son particularmente útiles para situaciones en las que algunos participantes predefinidos desean realizar transacciones con alta frecuencia sin incurrir en gastos generales visibles. Los canales de la cadena de bloques se dividen en dos categorías: **canales de pago** y **canales de estado**.

## Canales de pago {#payment-channels}

Un canal de pago se describe mejor como un «libro mayor bidireccional» mantenido colectivamente por dos usuarios. El saldo inicial del libro mayor es la suma de los depósitos bloqueados en el contrato en cadena durante la fase de apertura del canal. Las transferencias del canal de pago se pueden realizar instantáneamente y sin la participación de la propia cadena de bloques, a excepción de una creación inicial única en cadena y un eventual cierre del canal.

Las actualizaciones del saldo del libro mayor (es decir, el estado del canal de pago) requieren la aprobación de todas las partes en el canal. Una actualización del canal, firmada por todos los participantes del canal, se considera finalizada, de manera muy similar a una transacción en Ethereum.

Los canales de pago estuvieron entre las primeras soluciones de escalabilidad diseñadas para minimizar la costosa actividad en cadena de interacciones simples de los usuarios (por ejemplo, transferencias de ETH, intercambios atómicos, micropagos). Los participantes del canal pueden realizar una cantidad ilimitada de transacciones instantáneas y sin comisiones entre sí, siempre que la suma neta de sus transferencias no exceda los tokens depositados.

## Canales de estado {#state-channels}

Aparte de admitir pagos fuera de la cadena, los canales de pago no han demostrado ser útiles para manejar la lógica general de transición de estado. Los canales de estado se crearon para resolver este problema y hacer que los canales sean útiles para escalar la computación de propósito general.

Los canales de estado todavía tienen mucho en común con los canales de pago. Por ejemplo, los usuarios interactúan intercambiando mensajes firmados criptográficamente (transacciones), que los demás participantes del canal también deben firmar. Si una actualización de estado propuesta no está firmada por todos los participantes, se considera inválida.

Sin embargo, además de mantener los saldos de los usuarios, el canal también rastrea el estado actual del almacenamiento del contrato (es decir, los valores de las variables del contrato).

Esto hace posible ejecutar un contrato inteligente fuera de la cadena entre dos usuarios. En este escenario, las actualizaciones del estado interno del contrato inteligente requieren solo la aprobación de los pares que crearon el canal.

Si bien esto resuelve el problema de escalabilidad descrito anteriormente, tiene implicaciones para la seguridad. En Ethereum, la validez de las transiciones de estado es impuesta por el protocolo de consenso de la red. Esto hace que sea imposible proponer una actualización inválida al estado de un contrato inteligente o alterar la ejecución del contrato inteligente.

Los canales de estado no tienen las mismas garantías de seguridad. Hasta cierto punto, un canal de estado es una versión en miniatura de la Red principal. Con un conjunto limitado de participantes imponiendo reglas, aumenta la posibilidad de comportamiento malicioso (por ejemplo, proponer actualizaciones de estado inválidas). Los canales de estado derivan su seguridad de un sistema de arbitraje de disputas basado en [pruebas de fraude](/glossary/#fraud-proof).

## Cómo funcionan los canales de estado {#how-state-channels-work}

Básicamente, la actividad en un canal de estado es una sesión de interacciones que involucra a usuarios y un sistema de cadena de bloques. Los usuarios se comunican principalmente entre sí fuera de la cadena y solo interactúan con la cadena de bloques subyacente para abrir el canal, cerrar el canal o liquidar posibles disputas entre los participantes.

La siguiente sección describe el flujo de trabajo básico de un canal de estado:

### Apertura del canal {#opening-the-channel}

Abrir un canal requiere que los participantes comprometan fondos en un contrato inteligente en la Red principal. El depósito también funciona como una cuenta virtual, por lo que los actores participantes pueden realizar transacciones libremente sin necesidad de liquidar los pagos de inmediato. Solo cuando el canal se finaliza en cadena, las partes se liquidan entre sí y retiran lo que queda de su cuenta.

Este depósito también sirve como fianza para garantizar un comportamiento honesto de cada participante. Si los depositantes son declarados culpables de acciones maliciosas durante la fase de resolución de disputas, el contrato recorta su depósito.

Los pares del canal deben firmar un estado inicial, en el que todos estén de acuerdo. Esto sirve como la génesis del canal de estado, después de lo cual los usuarios pueden comenzar a realizar transacciones.

### Uso del canal {#using-the-channel}

Después de inicializar el estado del canal, los pares interactúan firmando transacciones y enviándoselas entre sí para su aprobación. Los participantes inician actualizaciones de estado con estas transacciones y firman las actualizaciones de estado de los demás. Cada transacción comprende lo siguiente:

- Un **nonce**, que actúa como un identificador único para las transacciones y previene ataques de repetición. También identifica el orden en que ocurrieron las actualizaciones de estado (lo cual es importante para la resolución de disputas)

- El estado antiguo del canal

- El nuevo estado del canal

- La transacción que desencadena la transición de estado (por ejemplo, Alice envía 5 ETH a Bob)

Las actualizaciones de estado en el canal no se transmiten en cadena como suele ser el caso cuando los usuarios interactúan en la Red principal, lo que se alinea con el objetivo de los canales de estado de minimizar la huella en cadena. Siempre que los participantes estén de acuerdo con las actualizaciones de estado, son tan definitivas como una transacción de Ethereum. Los participantes solo necesitan depender del consenso de la Red principal si surge una disputa.

### Cierre del canal {#closing-the-channel}

Cerrar un canal de estado requiere enviar el estado final y acordado del canal al contrato inteligente en cadena. Los detalles referenciados en la actualización de estado incluyen el número de movimientos de cada participante y una lista de transacciones aprobadas.

Después de verificar que la actualización de estado es válida (es decir, está firmada por todas las partes), el contrato inteligente finaliza el canal y distribuye los fondos bloqueados de acuerdo con el resultado del canal. Los pagos realizados fuera de la cadena se aplican al estado de Ethereum y cada participante recibe su porción restante de los fondos bloqueados.

El escenario descrito anteriormente representa lo que sucede en el caso ideal. A veces, los usuarios pueden ser incapaces de llegar a un acuerdo y finalizar el canal (el caso problemático). Cualquiera de las siguientes situaciones podría ser cierta:

- Los participantes se desconectan y no logran proponer transiciones de estado

- Los participantes se niegan a cofirmar actualizaciones de estado válidas

- Los participantes intentan finalizar el canal proponiendo una actualización de estado antigua al contrato en cadena

- Los participantes proponen transiciones de estado inválidas para que otros las firmen

Siempre que el consenso se rompe entre los actores participantes en un canal, la última opción es depender del consenso de la Red principal para imponer el estado final y válido del canal. En este caso, cerrar el canal de estado requiere liquidar disputas en cadena.

### Liquidación de disputas {#settling-disputes}

Típicamente, las partes en un canal acuerdan cerrar el canal de antemano y cofirman la última transición de estado, que envían al contrato inteligente. Una vez que la actualización se aprueba en cadena, la ejecución del contrato inteligente fuera de la cadena termina y los participantes salen del canal con su dinero.

Sin embargo, una parte puede enviar una solicitud en cadena para finalizar la ejecución del contrato inteligente y finalizar el canal, sin esperar la aprobación de su contraparte. Si ocurre alguna de las situaciones de ruptura de consenso descritas anteriormente, cualquiera de las partes puede activar el contrato en cadena para cerrar el canal y distribuir los fondos. Esto proporciona **ausencia de necesidad de confianza**, asegurando que las partes honestas puedan retirar sus depósitos en cualquier momento, independientemente de las acciones de la otra parte.

Para procesar la salida del canal, el usuario debe enviar la última actualización de estado válida de la aplicación al contrato en cadena. Si esto se verifica (es decir, lleva la firma de todas las partes), entonces los fondos se redistribuyen a su favor.

Hay, sin embargo, un retraso en la ejecución de las solicitudes de salida de un solo usuario. Si la solicitud para concluir el canal fue aprobada por unanimidad, entonces la transacción de salida en cadena se ejecuta de inmediato.

El retraso entra en juego en las salidas de un solo usuario debido a la posibilidad de acciones fraudulentas. Por ejemplo, un participante del canal puede intentar finalizar el canal en Ethereum enviando una actualización de estado más antigua en cadena.

Como contramedida, los canales de estado permiten a los usuarios honestos impugnar actualizaciones de estado inválidas enviando el último estado válido del canal en cadena. Los canales de estado están diseñados de tal manera que las actualizaciones de estado más nuevas y acordadas superan a las actualizaciones de estado más antiguas.

Una vez que un par activa el sistema de resolución de disputas en cadena, se requiere que la otra parte responda dentro de un límite de tiempo (llamado ventana de impugnación). Esto permite a los usuarios impugnar la transacción de salida, especialmente si la otra parte está aplicando una actualización obsoleta.

Cualquiera que sea el caso, los usuarios del canal siempre tienen fuertes garantías de finalidad: si la transición de estado en su poder fue firmada por todos los miembros y es la actualización más reciente, entonces tiene la misma finalidad que una transacción regular en cadena. Todavía tienen que impugnar a la otra parte en cadena, pero el único resultado posible es finalizar el último estado válido, que ellos poseen.

### ¿Cómo interactúan los canales de estado con Ethereum? {#how-do-state-channels-interact-with-ethereum}

Aunque existen como protocolos fuera de la cadena, los canales de estado tienen un componente en cadena: el contrato inteligente desplegado en Ethereum al abrir el canal. Este contrato controla los activos depositados en el canal, verifica las actualizaciones de estado y arbitra las disputas entre los participantes.

Los canales de estado no publican datos de transacciones ni compromisos de estado en la Red principal, a diferencia de las soluciones de escalabilidad de [capa 2 (l2)](/layer-2/). Sin embargo, están más conectados a la Red principal que, por ejemplo, las [cadenas laterales](/developers/docs/scaling/sidechains/), lo que los hace algo más seguros.

Los canales de estado dependen del protocolo principal de Ethereum para lo siguiente:

#### 1. Disponibilidad (Liveness) {#liveness}

El contrato en cadena desplegado al abrir el canal es responsable de la funcionalidad del canal. Si el contrato se está ejecutando en Ethereum, entonces el canal siempre está disponible para su uso. Por el contrario, una cadena lateral siempre puede fallar, incluso si la Red principal está operativa, poniendo en riesgo los fondos de los usuarios.

#### 2. Seguridad {#security}

Hasta cierto punto, los canales de estado dependen de Ethereum para proporcionar seguridad y proteger a los usuarios de pares maliciosos. Como se discutió en secciones posteriores, los canales utilizan un mecanismo de prueba de fraude que permite a los usuarios impugnar los intentos de finalizar el canal con una actualización inválida u obsoleta.

En este caso, la parte honesta proporciona el último estado válido del canal como una prueba de fraude al contrato en cadena para su verificación. Las pruebas de fraude permiten a partes que desconfían mutuamente realizar transacciones fuera de la cadena sin arriesgar sus fondos en el proceso.

#### 3. Finalidad {#finality}

Las actualizaciones de estado firmadas colectivamente por los usuarios del canal se consideran tan buenas como las transacciones en cadena. Aun así, toda la actividad dentro del canal solo logra una verdadera finalidad cuando el canal se cierra en Ethereum.

En el caso optimista, ambas partes pueden cooperar y firmar la actualización de estado final y enviarla en cadena para cerrar el canal, después de lo cual los fondos se distribuyen de acuerdo con el estado final del canal. En el caso pesimista, donde alguien intenta hacer trampa publicando una actualización de estado incorrecta en cadena, su transacción no se finaliza hasta que transcurre la ventana de impugnación.

## Canales de estado virtuales {#virtual-state-channels}

La implementación ingenua de un canal de estado sería desplegar un nuevo contrato cuando dos usuarios deseen ejecutar una aplicación fuera de la cadena. Esto no solo es inviable, sino que también anula la rentabilidad de los canales de estado (los costos de las transacciones en cadena pueden acumularse rápidamente).

Para resolver este problema, se crearon los «canales virtuales». A diferencia de los canales regulares que requieren transacciones en cadena para abrirse y terminarse, un canal virtual se puede abrir, ejecutar y finalizar sin interactuar con la cadena principal. Incluso es posible liquidar disputas fuera de la cadena utilizando este método.

Este sistema se basa en la existencia de los llamados «canales de libro mayor», que han sido financiados en cadena. Los canales virtuales entre dos partes se pueden construir sobre un canal de libro mayor existente, con el propietario (o propietarios) del canal de libro mayor sirviendo como intermediario.

Los usuarios en cada canal virtual interactúan a través de una nueva instancia de contrato, y el canal de libro mayor puede admitir múltiples instancias de contrato. El estado del canal de libro mayor también contiene más de un estado de almacenamiento de contrato, lo que permite la ejecución paralela de aplicaciones fuera de la cadena entre diferentes usuarios.

Al igual que los canales regulares, los usuarios intercambian actualizaciones de estado para hacer avanzar la máquina de estado. A menos que surja una disputa, solo se debe contactar al intermediario al abrir o terminar el canal.

### Canales de pago virtuales {#virtual-payment-channels}

Los canales de pago virtuales funcionan con la misma idea que los canales de estado virtuales: los participantes conectados a la misma red pueden pasar mensajes sin necesidad de abrir un nuevo canal en cadena. En los canales de pago virtuales, las transferencias de valor se enrutan a través de uno o más intermediarios, con garantías de que solo el destinatario previsto puede recibir los fondos transferidos.

## Aplicaciones de los canales de estado {#applications-of-state-channels}

### Pagos {#payments}

Los primeros canales de la cadena de bloques eran protocolos simples que permitían a dos participantes realizar transferencias rápidas y de bajas comisiones fuera de la cadena sin tener que pagar altas comisiones de transacción en la Red principal. Hoy en día, los canales de pago siguen siendo útiles para aplicaciones diseñadas para el intercambio y depósitos de ether y tokens.

Los pagos basados en canales tienen las siguientes ventajas:

1. **Capacidad de procesamiento**: La cantidad de transacciones fuera de la cadena por canal no está conectada a la capacidad de procesamiento de Ethereum, que está influenciada por varios factores, especialmente el tamaño del bloque y el tiempo de bloque. Al ejecutar transacciones fuera de la cadena, los canales de la cadena de bloques pueden lograr una mayor capacidad de procesamiento.

2. **Privacidad**: Debido a que los canales existen fuera de la cadena, los detalles de las interacciones entre los participantes no se registran en la cadena de bloques pública de Ethereum. Los usuarios del canal solo tienen que interactuar en cadena al financiar y cerrar canales o liquidar disputas. Por lo tanto, los canales son útiles para las personas que desean transacciones más privadas.

3. **Latencia**: Las transacciones fuera de la cadena realizadas entre los participantes del canal se pueden liquidar instantáneamente, si ambas partes cooperan, reduciendo los retrasos. Por el contrario, enviar una transacción en la Red principal requiere esperar a que los nodos procesen la transacción, produzcan un nuevo bloque con la transacción y alcancen el consenso. Los usuarios también pueden necesitar esperar más confirmaciones de bloques antes de considerar una transacción finalizada.

4. **Costo**: Los canales de estado son particularmente útiles en situaciones en las que un conjunto de participantes intercambiará muchas actualizaciones de estado durante un largo período. Los únicos costos incurridos son la apertura y el cierre del contrato inteligente del canal de estado; cada cambio de estado entre la apertura y el cierre del canal será más barato que el anterior, ya que el costo de liquidación se distribuye en consecuencia.

Implementar canales de estado en soluciones de capa 2 (l2), como los [rollups](/developers/docs/scaling/#rollups), podría hacerlos aún más atractivos para los pagos. Si bien los canales ofrecen pagos baratos, los costos de configurar el contrato en cadena en la Red principal durante la fase de apertura pueden volverse costosos, especialmente cuando las tarifas de gas se disparan. Los rollups basados en Ethereum ofrecen [tarifas de transacción más bajas](https://l2fees.info/) y pueden reducir los gastos generales para los participantes del canal al reducir las tarifas de configuración.

### Micropagos {#microtransactions}

Los micropagos son pagos de bajo valor (por ejemplo, inferiores a una fracción de dólar) que las empresas no pueden procesar sin incurrir en pérdidas. Estas entidades deben pagar a los proveedores de servicios de pago, lo que no pueden hacer si el margen de los pagos de los clientes es demasiado bajo para obtener ganancias.

Los canales de pago resuelven este problema al reducir los gastos generales asociados con los micropagos. Por ejemplo, un proveedor de servicios de Internet (ISP) puede abrir un canal de pago con un cliente, lo que le permite transmitir pequeños pagos cada vez que utiliza el servicio.

Más allá del costo de abrir y cerrar el canal, los participantes no incurren en costos adicionales en los micropagos (sin tarifas de gas). Esta es una situación en la que todos ganan, ya que los clientes tienen más flexibilidad en cuánto pagan por los servicios y las empresas no pierden micropagos rentables.

### Aplicaciones descentralizadas {#decentralized-applications}

Al igual que los canales de pago, los canales de estado pueden realizar pagos condicionales de acuerdo con los estados finales de la máquina de estado. Los canales de estado también pueden admitir lógica de transición de estado arbitraria, lo que los hace útiles para ejecutar aplicaciones genéricas fuera de la cadena.

Los canales de estado a menudo se limitan a aplicaciones simples basadas en turnos, ya que esto facilita la gestión de los fondos comprometidos en el contrato en cadena. Además, con un número limitado de partes actualizando el estado de la aplicación fuera de la cadena a intervalos, castigar el comportamiento deshonesto es relativamente sencillo.

La eficiencia de una aplicación de canal de estado también depende de su diseño. Por ejemplo, un desarrollador podría desplegar el contrato del canal de la aplicación en cadena una vez y permitir que otros jugadores reutilicen la aplicación sin tener que ir a la cadena. En este caso, el canal de la aplicación inicial sirve como un canal de libro mayor que admite múltiples canales virtuales, cada uno ejecutando una nueva instancia del contrato inteligente de la aplicación fuera de la cadena.

Un posible caso de uso para las aplicaciones de canales de estado son los juegos simples de dos jugadores, donde los fondos se distribuyen en función del resultado del juego. El beneficio aquí es que los jugadores no tienen que confiar entre sí (ausencia de necesidad de confianza) y el contrato en cadena, no los jugadores, controla la asignación de fondos y la liquidación de disputas (descentralización).

Otros posibles casos de uso para las aplicaciones de canales de estado incluyen la propiedad de nombres de ENS, libros mayores de NFT y muchos más.

### Transferencias atómicas {#atomic-transfers}

Los primeros canales de pago estaban restringidos a transferencias entre dos partes, lo que limitaba su usabilidad. Sin embargo, la introducción de canales virtuales permitió a las personas enrutar transferencias a través de intermediarios (es decir, múltiples canales entre pares) sin tener que abrir un nuevo canal en cadena.

Comúnmente descritos como «transferencias multisalto», los pagos enrutados son atómicos (es decir, todas las partes de la transacción tienen éxito o falla por completo). Las transferencias atómicas utilizan [contratos de bloqueo de tiempo con hash (HTLC)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts) para garantizar que el pago se libere solo si se cumplen ciertas condiciones, reduciendo así el riesgo de contraparte.

## Inconvenientes de usar canales de estado {#drawbacks-of-state-channels}

### Suposiciones de disponibilidad (Liveness) {#liveness-assumptions}

Para garantizar la eficiencia, los canales de estado imponen límites de tiempo a la capacidad de los participantes del canal para responder a las disputas. Esta regla asume que los pares siempre estarán en línea para monitorear la actividad del canal y contestar las impugnaciones cuando sea necesario.

En realidad, los usuarios pueden desconectarse por razones fuera de su control (por ejemplo, mala conexión a Internet, fallas mecánicas, etc.). Si un usuario honesto se desconecta, un par malicioso puede explotar la situación presentando estados intermedios antiguos al contrato adjudicador y robando los fondos comprometidos.

Algunos canales utilizan «torres de vigilancia», entidades responsables de observar los eventos de disputas en cadena en nombre de otros y tomar las medidas necesarias, como alertar a las partes interesadas. Sin embargo, esto puede aumentar los costos de usar un canal de estado.

### Indisponibilidad de datos {#data-unavailability}

Como se explicó anteriormente, impugnar una disputa inválida requiere presentar el último estado válido del canal de estado. Esta es otra regla basada en una suposición: que los usuarios tienen acceso al último estado del canal.

Aunque esperar que los usuarios del canal almacenen copias del estado de la aplicación fuera de la cadena es razonable, estos datos pueden perderse debido a un error o falla mecánica. Si el usuario no tiene una copia de seguridad de los datos, solo puede esperar que la otra parte no finalice una solicitud de salida inválida utilizando transiciones de estado antiguas en su poder.

Los usuarios de Ethereum no tienen que lidiar con este problema ya que la red impone reglas sobre la disponibilidad de datos. Los datos de las transacciones son almacenados y propagados por todos los nodos y están disponibles para que los usuarios los descarguen siempre que sea necesario.

### Problemas de liquidez {#liquidity-issues}

Para establecer un canal de la cadena de bloques, los participantes deben bloquear fondos en un contrato inteligente en cadena durante el ciclo de vida del canal. Esto reduce la liquidez de los usuarios del canal y también limita los canales a aquellos que pueden permitirse mantener los fondos bloqueados en la Red principal.

Sin embargo, los canales de libro mayor, operados por un proveedor de servicios fuera de la cadena (OSP), pueden reducir los problemas de liquidez para los usuarios. Dos pares conectados a un canal de libro mayor pueden crear un canal virtual, que pueden abrir y finalizar completamente fuera de la cadena, en cualquier momento que deseen.

Los proveedores de servicios fuera de la cadena también podrían abrir canales con múltiples pares, lo que los hace útiles para enrutar pagos. Por supuesto, los usuarios deben pagar tarifas a los OSP por sus servicios, lo que puede ser indeseable para algunos.

### Ataques de molestia (Griefing) {#griefing-attacks}

Los ataques de molestia (griefing) son una característica común de los sistemas basados en pruebas de fraude. Un ataque de molestia no beneficia directamente al atacante, pero causa molestia (es decir, daño) a la víctima, de ahí el nombre.

La prueba de fraude es susceptible a ataques de molestia porque la parte honesta debe responder a cada disputa, incluso a las inválidas, o arriesgarse a perder sus fondos. Un participante malicioso puede decidir publicar repetidamente transiciones de estado obsoletas en cadena, obligando a la parte honesta a responder con el estado válido. El costo de esas transacciones en cadena puede acumularse rápidamente, causando que las partes honestas pierdan en el proceso.

### Conjuntos de participantes predefinidos {#predefined-participant-sets}

Por diseño, el número de participantes que componen un canal de estado permanece fijo a lo largo de su vida útil. Esto se debe a que actualizar el conjunto de participantes complicaría la operación del canal, especialmente al financiar el canal o liquidar disputas. Agregar o eliminar participantes también requeriría actividad adicional en cadena, lo que aumenta los gastos generales para los usuarios.

Si bien esto hace que los canales de estado sean más fáciles de razonar, limita la utilidad de los diseños de canales para los desarrolladores de aplicaciones. Esto explica en parte por qué los canales de estado se han abandonado en favor de otras soluciones de escalabilidad, como los rollups.

### Procesamiento paralelo de transacciones {#parallel-transaction-processing}

Los participantes en el canal de estado envían actualizaciones de estado por turnos, por lo que funcionan mejor para «aplicaciones basadas en turnos» (por ejemplo, un juego de ajedrez de dos jugadores). Esto elimina la necesidad de manejar actualizaciones de estado simultáneas y reduce el trabajo que el contrato en cadena debe hacer para castigar a los que publican actualizaciones obsoletas. Sin embargo, un efecto secundario de este diseño es que las transacciones dependen unas de otras, lo que aumenta la latencia y disminuye la experiencia general del usuario.

Algunos canales de estado resuelven este problema utilizando un diseño «dúplex completo» que separa el estado fuera de la cadena en dos estados «símplex» unidireccionales, lo que permite actualizaciones de estado concurrentes. Dichos diseños mejoran la capacidad de procesamiento fuera de la cadena y disminuyen los retrasos en las transacciones.

## Uso de canales de estado {#use-state-channels}

Múltiples proyectos proporcionan implementaciones de canales de estado que puede integrar en sus aplicaciones descentralizadas (dapps):

- [Connext](https://connext.network/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Lecturas adicionales {#further-reading}

**Canales de estado**

- [Dando sentido a las soluciones de escalabilidad de capa 2 de Ethereum: canales de estado, Plasma y Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, 12 de febrero de 2018_
- [Canales de estado: una explicación](https://www.jeffcoleman.ca/state-channels/) _6 de noviembre de 2015 - Jeff Coleman_
- [Conceptos básicos de los canales de estado](https://unlock-protocol.github.io/ethhub/ethereum-roadmap/layer-2-scaling/state-channels/) _District0x_
- [Canales de estado de la cadena de bloques: estado del arte](https://ieeexplore.ieee.org/document/9627997)

_¿Conoce algún recurso de la comunidad que le haya servido de ayuda? ¡Edite esta página y añádalo!_