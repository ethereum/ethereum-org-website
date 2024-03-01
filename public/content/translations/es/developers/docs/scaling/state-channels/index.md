---
title: Canales de estado
description: Introducción a los canales de estado y a los canales de pago como solución de escalado actualmente utilizada por la comunidad de Ethereum.
lang: es
sidebarDepth: 3
---

Los "canales de estado" permiten a los participantes hacer transacciones seguras fuera de la cadena mientras siguen manteniendo interacción con la Red principal de Ethereum a un nivel mínimo. Los pares de un canal puede realizar un número arbitrario de transacciones fuera de la cadena solamente enviando dos transacciones en cadena, una para abrir y otra para cerrar el canal. Esto permite una alta velocidad en el número de transacciones y conlleva un menor costo para los usuarios.

## Requisitos previos {#prerequisites}

Debería haber leído y entendido nuestras páginas sobre [escalabilidad de Ethereum](/developers/docs/scaling/) y [capa 2](/layer-2/).

## ¿Qué son los canales? {#what-are-channels}

Las cadenas de bloques públicas, como Ethereum, enfrentan desafíos de escalabilidad debido a su arquitectura distrubuida: todas las transacciones hechas dentro de la cadena deben ser ejecutadas por todos los nodos. Los nodos deben ser capaces de manejar el volumen de transacciones en un solo bloque usando equipos de cómputo modestos, lo cual limita el volumen de transacciones para mantener la red descentralizada. Los canales de la cadena de bloques resuelven este problema permitiendo a los usuarios hacer interacciones fuera de la cadena a la vez que pueden confiar en la seguridad de la cadena principal para la liquidación final.

Los canales son simples protocolos entre pares que permiten a dos entidades hacer cuantas transacciones requieran entre ellos y, al finalizar, solamente publicar el resultado final en la cadena de bloques. El canal usa criptografía para demostrar que los datos de resumen que generan son el verdadero resultado de un conjunto válido de transacciones intermedias. Un contrato inteligente ["multifirma"](/developers/docs/smart-contracts/#multisig) asegura que las transacciones sean firmadas por las entidades correctas.

Con los canales, los cambios de estado son ejecutados y validados por las partes interesadas, minimizando el nivel de cómputo requerido en la capa de ejecución de Ethereum. Esto disminuye la congestión en Ethereum a la vez que incrementa la velocidad de procesamiento de transacciones para los usuarios.

Cada canal es administrado por un [contrato inteligente multifirma](/developers/docs/smart-contracts/#multisig) que corre en Ethereum. Para abrir un canal, los participantes implementan el contrato del canal en la cadena y depositan fondos en él. Ambas entidades firman colectivamente una actualización de estado para iniciar el estado del canal, después de lo cual pueden transaccionar rápida y libremente fuera de la cadena.

Para cerrar un canal, los participantes deben enviar el estado final acordado del canal en la cadena. Después el contrato inteligente distribuye los fondos bloqueados de acuerdo al saldo de cada uno de los participantes indicado en el estado final del canal.

Los canales entre pares son particularmente útiles en situaciones donde un definido número de participantes deseen hacer transacciones con alta frecuencia sin incurrir grandes gastos. Los canales de la cadena de bloques se dividen en dos categorías: **canales de pago** y **canales de estado**.

## Canales de pago {#payment-channels}

Un canal de pago podría describirse mejor como un "libro mayor de dos vías" mantenido de manera colectiva por dos usuarios. El saldo inicial del libro mayor es la suma de los depósitos enviados al contrato en cadena durante la fase de apertura del canal. Las transaferencias de los canales de pago pueden ocurrir de manera instantánea y sin involucrar a la cadena de bloques en sí, exceptuando la transacción inicial para la creación del canal u el eventual cierre del canal.

Las actualizaciones del saldo del libro mayor (es decir, el estado del canal de pago) requieren la aprobación de todas las partes del canal. Una actualización del canal, firmada por todos los participantes del canal, se considera finalizada, al igual que una transacción en Ethereum.

Los canales de pago fueron algunas de las primeras soluciones de escalado diseñadas para minimizar la costosa actividad en cadena de las interacciones simples de los usuarios (por ejemplo, transferencias de ETH, intercambios o swaps atómicos o micropagos). Los participantes del canal pueden realizar una cantidad ilimitada de transacciones instantáneas entre sí, siempre y cuando la suma neta de sus transferencias no exceda los tokens depositados.

## Canales de estado {#state-channels}

Aparte de permitir los pagos fuera de la cadena, los canales de pago no han demostrado ser útiles para manejar lógica general de transición de estados. Los canales de estado se crearon para resolver este problema y hacer que los canales fueran útiles para escalar los cálculos de uso general.

Los canales de estado todavía tienen mucho en común con los canales de pago. Por ejemplo, los usuarios interactúan intercambiando mensajes firmados criptográficamente (transacciones), que los otros participantes del canal también deben firmar. Si una actualización de estado propuesta no está firmada por todos los participantes, se considera no válida.

Sin embargo, además de mantener los saldos de los usuarios, el canal también realiza un seguimiento del estado actual del almacenamiento del contrato (es decir, los valores de las variables del contrato).

Esto hace posible ejecutar un contrato inteligente fuera de la cadena entre dos usuarios. En este escenario, las actualizaciones del estado interno del contrato inteligente solo requieren la aprobación de los pares que crearon el canal.

Si bien esto resuelve el problema de escalabilidad descrito anteriormente, tiene implicaciones para la seguridad. En Ethereum, la validez de las transiciones de estado en Ethereum es impuesta por el protocolo de consenso de la red. Esto hace que sea imposible proponer una actualización no válida del estado de un contrato inteligente o alterar la ejecución de un contrato inteligente.

Los canales de estado no tienen las mismas garantías de seguridad. Hasta cierto punto, un canal de estado es una versión en miniatura de la red principal. Dado un conjunto limitado de participantes que aplican las reglas, aumenta la posibilidad de comportamiento malicioso (por ejemplo, proponer actualizaciones de estado no válidas). Los canales de estado derivan su seguridad de un sistema de arbitraje de disputas basado en [pruebas de fraude](/glossary/#fraud-proof).

## Cómo funcionan los canales de estado {#how-state-channels-work}

Básicamente, la actividad en un canal de estado es una sesión de interacciones que involucra usuarios y el sistema de la cadena de bloques. Los usuarios se comunican entre ellos mayormente fuera de la cadena y solo interactuán con la cadena de bloques subyacente para abrir el canal, cerrar el canal o resolver alguna disputa que pudiera ocurrir entre los participantes.

La siguiente sección describe el flujo básico de los canales de estado:

### Apertura del canal {#opening-the-channel}

Abrir un canal requiere que los participantes comprometan sus fondos a un contrato inteligente en la Red principal. El depóstio también funciona como una cuenta virtual, así que los participantes pueden transaccionar libremente sin necesidad de liquidar los pagos de inmediato. Solo cuando el canal está finalizado en la cadena, las partes liquidan entre sí y retiran lo que queda de su cuenta.

Este depósito también sirve como fianza para garantizar el comportamiento honesto de cada participante. Si los depositantes son declarados culpables de acciones maliciosas durante la fase de resolución de disputas, el contrato acuchilla o elimina su depósito.

Los pares del canal deben firmar un estado inicial, con el que todos están de acuerdo. Esto sirve como génesis del canal de estado, después de lo cual los usuarios pueden comenzar a realizar transacciones.

### Uso del canal {#using-the-channel}

Después de inicializar el estado del canal, los pares interactúan firmando transacciones y enviándoselas entre sí para su aprobación. Los participantes inician actualizaciones de estado con estas transacciones y firman actualizaciones de estado de otros. Cada transacción consta de lo siguiente:

- Un **nonce**, que actúa como un ID único para las transacciones y evita los ataques de repetición (replay). También identifica el orden en el que se produjeron las actualizaciones de estado (lo cual es importante para la resolución de disputas)

- El antiguo estado del canal

- El nuevo estado del canal

- La transacción que desencadena la transición de estado (por ejemplo, Alice envía 5 ETH a Bob)

Las actualizaciones de estado en el canal no se transmiten en cadena, como suele ser el caso cuando los usuarios interactúan en la red principal, lo que se alinea con el objetivo de los canales de estado de minimizar la huella en cadena. Siempre y cuando los participantes estén de acuerdo con las actualizaciones de estado, son tan definitivas como una transacción de Ethereum. Los participantes solo tienen que depender del consenso de la red principal si surge una disputa.

### Cerrar el canal {#closing-the-channel}

Cerrar un canal de estado requiere enviar el estado final y acordado del canal al contrato inteligente en cadena. Los detalles a los que se hace referencia en la actualización de estado incluyen el número de movimientos de cada participante y una lista de transacciones aprobadas.

Después de verificar que la actualización de estado es válida (es decir, está firmada por todas las partes), el contrato inteligente finaliza el canal y distribuye los fondos bloqueados de acuerdo con el resultado del canal. Los pagos realizados fuera de la cadena se aplican al estado de Ethereum y cada participante recibe su parte restante de los fondos bloqueados.

El escenario descrito anteriormente representa lo que sucede en el caso feliz. A veces, es posible que los usuarios no puedan llegar a un acuerdo y finalizan el canal (el caso triste). Cualquiera de los siguientes podría ser cierto en la situación:

- Los participantes se desconectan y no proponen transiciones de estado.

- Los participantes se niegan a firmar conjuntamente actualizaciones de estado válidas.

- Los participantes intentan finalizar el canal proponiendo una antigua actualización de estado en el contrato en cadena.

- Los participantes proponen transiciones de estado no válidas para que otros las firmen.

Siempre que se rompa el consenso entre los actores participantes en un canal, la última opción es confiar en el consenso de la red principal para hacer cumplir el estado final y válido del canal. En este caso, el cierre del canal de estado requiere resolver disputas en cadena.

### Resolver disputas {#settling-disputes}

Por lo general, las partes de un canal acuerdan cerrar el canal de antemano y firmar conjuntamente la última transición de estado, que envían al contrato inteligente. Una vez que se aprueba la actualización en cadena, la ejecución del contrato inteligente fuera de la cadena termina y los participantes salen del canal con su dinero.

Sin embargo, una de las partes puede presentar una solicitud en cadena para finalizar la ejecución del contrato inteligente y finalizar el canal, sin esperar la aprobación de su contraparte. Si se produce alguna de las situaciones de ruptura de consenso descritas anteriormente, cualquiera de las partes puede activar el contrato en cadena para cerrar el canal y distribuir fondos. Esto proporciona **no necesidad de confianza**, asegurando que las partes honestas puedan salir de sus depósitos en cualquier momento, independientemente de las acciones de la otra parte.

Para procesar la salida del canal, el usuario debe enviar la última actualización de estado válida de la solicitud al contrato en cadena. Si esto se comprueba (es decir, lleva la firma de todas las partes), los fondos se redistribuyen a su favor.

Sin embargo, hay un retraso en la ejecución de solicitudes de salida de un solo usuario. Si la solicitud para concluir el canal fue aprobada por unanimidad, la transacción de salida en cadena se ejecuta inmediatamente.

El retraso entra en juego en las salidas de un solo usuario debido a la posibilidad de acciones fraudulentas. Por ejemplo, un participante del canal puede intentar finalizar el canal en Ethereum enviando una actualización de estado más antigua en la cadena.

Como contramedida, los canales de estado permiten a los usuarios honestos impugnar las actualizaciones de estado no válidas mediante el envío del estado válido más reciente del canal en cadena. Los canales de estado están diseñados de tal manera que las actualizaciones de estado más nuevas y acordadas superen a las actualizaciones de estado más antiguas.

Una vez que un par activa el sistema de resolución de disputas en cadena, se requiere que la otra parte responda dentro de un límite de tiempo (llamado ventana de desafío). Esto permite a los usuarios impugnar la transacción de salida, especialmente si la otra parte está aplicando una actualización obsoleta.

Cualquiera que sea el caso, los usuarios del canal siempre tienen fuertes garantías de finalidad: si la transición de estado en su poder fue firmada por todos los miembros y es la actualización más reciente, entonces es de igual finalidad con una transacción regular en cadena. Todavía tienen que desafiar a la otra parte en cadena, pero el único resultado posible es finalizar el último estado válido, que tienen.

### ¿Cómo interactúan los canales de estado con Ethereum? {#how-do-state-channels-interact-with-ethereum}

Aunque existen como protocolos fuera de la cadena, los canales de estado tienen un componente en cadena: el contrato inteligente implementado en Ethereum al abrir el canal. Este contrato controla los activos depositados en el canal, verifica las actualizaciones de estado y arbitra las disputas entre los participantes.

Los canales de estado no publican datos de transacciones ni compromisos de estado en la red principal, a diferencia de las soluciones de escalado de [capa 2](/layer-2/). Sin embargo, están más conectados a la red principal que, por ejemplo, [cadenas laterales](/developers/docs/scaling/sidechains/), lo que los hace algo más seguros.

Los canales de estado se basan en el protocolo de Ethereum principal para lo siguiente:

#### 1. Vitalidad {#liveness}

El contrato en cadena implementado al abrir el canal es responsable de la funcionalidad del canal. Si el contrato se ejecuta en Ethereum, el canal siempre está disponible para su uso. Por el contrario, una cadena lateral siempre puede fallar, incluso si la red principal está operativa, lo que pone en riesgo los fondos de los usuarios.

#### 2. Seguridad {#security}

Hasta cierto punto, los canales de estado usan Ethereum para proporcionar seguridad y proteger a los usuarios de pares maliciosos. Como vimos en secciones posteriores, los canales utilizan un mecanismo de prueba de fraude que permite a los usuarios desafiar los intentos de finalizar el canal con una actualización no válida u obsoleta.

En este caso, la parte honesta proporciona el último estado válido del canal como prueba de fraude al contrato en cadena para su verificación. Las pruebas de fraude permiten a las partes que no confían entre sí llevar a cabo transacciones fuera de la cadena sin arriesgar sus fondos en el proceso.

#### 3. Finalidad {#finality}

Las actualizaciones de estado firmadas colectivamente por los usuarios del canal se consideran tan buenas como las transacciones en cadena. Aun así, toda la actividad en el canal solo logra una verdadera finalidad cuando se cierra el canal en Ethereum.

En el caso optimista, ambas partes pueden cooperar y firmar la actualización de estado final y presentarla en cadena para cerrar el canal, después de lo cual los fondos se distribuyen de acuerdo con el estado final del canal. En el caso pesimista, cuando alguien intenta hacer trampa publicando una actualización de estado incorrecta en la cadena, su transacción no finaliza hasta que transcurre la ventana de desafío.

## Canales de estado virtuales {#virtual-state-channels}

La implementación ingenua de un canal de estado sería implementar un nuevo contrato cuando dos usuarios deseen ejecutar una aplicación fuera de la cadena. Esto no solo es inviable, sino que también niega la rentabilidad de los canales de estado (los costos de transacción en cadena pueden acumularse rápidamente).

Para resolver este problema, se crearon "canales virtuales". A diferencia de los canales regulares que requieren que las transacciones en cadena se abran y terminen, un canal virtual se puede abrir, ejecutar y finalizar sin interactuar con la cadena principal. Incluso es posible resolver disputas fuera de la cadena utilizando este método.

Este sistema se basa en la existencia de los llamados "canales de libro mayor", que han sido financiados en cadena. Los canales virtuales entre dos partes se pueden construir sobre un canal del libro mayor existente; el(los) propietario(s) del canal del libro mayor sirven de intermediarios.

Los usuarios de cada canal virtual interactúan a través de una nueva instancia de contrato; el canal del libro mayor puede admitir múltiples instancias de contrato. El estado del canal del libro mayor también contiene más de un estado de almacenamiento de contrato, lo que permite la ejecución paralela de aplicaciones fuera de la cadena entre diferentes usuarios.

Al igual que los canales normales, los usuarios intercambian actualizaciones de estado para avanzar en la máquina de estado. A menos que surja una disputa, solo hay que ponerse en contacto con el intermediario al abrir o cerrar el canal.

### Canales de pago virtuales {#virtual-payment-channels}

Los canales de pago virtuales funcionan con el mismo principio que los canales de estado virtuales: los participantes conectados a la misma red pueden pasar mensajes sin necesidad de abrir un nuevo canal en cadena. En los canales de pago virtuales, las transferencias de valor se enrutan a través de uno o más intermediarios, con garantía de que solo el destinatario previsto pueda recibir los fondos transferidos.

## Aplicaciones de los canales de estado {#applications-of-state-channels}

### Pagos {#payments}

Los primeros canales de cadena de bloques eran protocolos simples que permitían a dos participantes realizar transferencias rápidas y de baja tarifa fuera de la cadena sin tener que pagar altas tarifas de transacción en la cadena principal. Hoy en día, los canales de pago siguen siendo útiles para aplicaciones diseñadas para el intercambio y los depósitos de ether y tokens.

Los pagos basados en canales tienen las siguientes ventajas:

1. **Throughput**: La cantidad de transacciones fuera de la cadena por canal no está conectada con el rendimiento de Ethereum, que está influenciado por varios factores, especialmente el tamaño del bloque y el tiempo de bloque. Al ejecutar transacciones fuera de la cadena, los canales de cadenas de bloques pueden lograr un mayor rendimiento o capacidad de procesamiento de transacciones.

2. **Privacidad**: Debido a que los canales existen fuera de la cadena, los detalles de las interacciones entre los participantes no se registran en la cadena de bloques pública de Ethereum. Los usuarios del canal solo tienen que interactuar en cadena cuando financian y cierran canales o resuelven disputas. Por lo tanto, los canales son útiles para las personas que desean transacciones más privadas.

3. **Latencia**: Las transacciones fuera de la cadena realizadas entre los participantes del canal se pueden liquidar al instante, si ambas partes cooperan, lo que reduce los retrasos. Por el contrario, el envío de una transacción en la red principal requiere esperar a que los nodos procesen la transacción, produzcan un nuevo bloque con la transacción y lleguen a un consenso. Es posible que los usuarios también tengan que esperar más confirmaciones de bloqueo antes de considerar una transacción finalizada.

4. **Costo**: Los canales de estado son particularmente útiles en situaciones en las que un conjunto de participantes intercambiará muchas actualizaciones de estado durante un largo período de tiempo. Los únicos costos incurridos son la apertura y el cierre del contrato inteligente del canal de estado; cada cambio de estado entre la apertura y el cierre del canal será más barato que el anterior, ya que el costo de liquidación se distribuye en consecuencia.

La implementación de canales de estado en soluciones de capa 2, como [rollups](/developers/docs/scaling/#rollups), podría hacerlos aún más atractivos para los pagos. Si bien los canales ofrecen pagos baratos, los costos de establecer el contrato en cadena en la red principal durante la fase de apertura pueden ser altos, especialmente cuando las tarifas de gas aumentan. Los rollups basados en Ethereum ofrecen [tarifas de transacción más bajas](https://l2fees.info/) y pueden reducir los gastos generales para los participantes del canal al reducir las tarifas de configuración.

### Microtransacciones {#microtransactions}

Las microtransacciones son pagos de bajo valor (por ejemplo, menos de una fracción de un dólar) que las empresas no pueden procesar sin incurrir en pérdidas. Estas entidades deben pagar a los proveedores de servicios de pago, lo que no pueden hacer si el margen en los pagos de los clientes es demasiado bajo para obtener ganancias.

Los canales de pago resuelven este problema reduciendo los gastos generales asociados con las microtransacciones. Por ejemplo, un proveedor de servicios de Internet (ISP) puede abrir un canal de pago con un cliente, lo que le permite transmitir pequeños pagos cada vez que utiliza el servicio.

Más allá del costo de abrir y cerrar el canal, los participantes no incurren en costos adicionales en microtransacciones (no hay tarifas de gas). Esta es una situación en la que todos ganan, ya que los clientes tienen más flexibilidad en lo que refiere a cuánto pagan por los servicios y las empresas no pierden en microtransacciones rentables.

### Aplicaciones descentralizadas {#decentralized-applications}

Al igual que los canales de pago, los canales de estado pueden hacer pagos condicionales de acuerdo con los estados finales de la máquina de estado. Los canales de estado también pueden permitir una lógica de transición de estado arbitraria, lo que los hace útiles para ejecutar aplicaciones genéricas fuera de la cadena.

Los canales de estado a menudo se limitan a aplicaciones simples por turnos, ya que esto facilita la gestión de los fondos comprometidos con el contrato en cadena. Además, con un número limitado de partes que actualizan el estado de la aplicación fuera de la cadena a intervalos, castigar el comportamiento deshonesto es relativamente sencillo.

La eficiencia de una aplicación de canal de estado también depende de su diseño. Por ejemplo, un desarrollador podría implementar el contrato del canal de la aplicación en cadena una vez y permitir que otros participantes reutilicen la aplicación sin tener que meterse en la cadena. En este caso, el canal inicial de la aplicación sirve como un canal de libro mayor que admite múltiples canales virtuales, cada uno de los cuales ejecuta una nueva instancia del contrato inteligente de la aplicación fuera de la cadena.

Un caso de uso potencial para las aplicaciones de canales de estado son los juegos simples para dos jugadores, donde los fondos se distribuyen en función del resultado del juego. El beneficio aquí es que los jugadores no tienen que confiar el uno en el otro (no necesidad de confianza) y el contrato en cadena, no los jugadores, controla la asignación de fondos y la resolución de disputas (descentralización).

Otros posibles casos de uso para las aplicaciones de canales de estado incluyen la propiedad del nombre de ENS, los libros mayores de NFT y muchos más.

### Transferencias atómicas {#atomic-transfers}

Los primeros canales de pago se restringían a las transferencias entre dos partes, lo que limitaba su usabilidad. Sin embargo, la introducción de canales virtuales permitió a las personas enrutar las transferencias a través de intermediarios (es decir, múltiples canales p2p) sin tener que abrir un nuevo canal en cadena.

Comúnmente descrito como "transferencias de salto múltiple", los pagos enrutados son atómicos (es decir, todas las partes de la transacción tienen éxito o esta falla por completo). Las transferencias atómicas utilizan [Contratos de bloqueo de tiempo hasheados (HTLC)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts) para garantizar que el pago se libere solo si se cumplen ciertas condiciones, reduciendo así el riesgo de contraparte.

## Inconvenientes del uso de canales de estado {#drawbacks-of-state-channels}

### Suposiciones de vitalidad {#liveness-assumptions}

Para garantizar la eficiencia, los canales de estado establecen límites de tiempo en la capacidad de los participantes del canal para responder a las disputas. Esta regla asume que los pares siempre estarán en línea para monitorear la actividad del canal y los desafíos de los concursos cuando sea necesario.

En realidad, los usuarios pueden desconectarse por razones fuera de su control (por ejemplo, mala conexión a Internet, falla mecánica, etc.). Si un usuario honesto se desconecta, un par malicioso puede explotar la situación presentando antiguos estados intermedios al contrato del adjudicador y robando los fondos comprometidos.

Algunos canales utilizan "torres de vigilancia", entidades responsables de ver los eventos de disputa en cadena en nombre de otros y tomar las medidas necesarias, como alertar a las partes interesadas. Sin embargo, esto puede aumentar los costos de uso de un canal de estado.

### No disponibilidad de datos {#data-unavailability}

Como se explicó anteriormente, impugnar una disputa no válida requiere presentar el último estado válido del canal de estado. Esta es otra regla basada en una suposición: que los usuarios tienen acceso al último estado del canal.

Aunque es razonable esperar que los usuarios del canal almacenen copias del estado de la aplicación fuera de la cadena, estos datos pueden perderse debido a un error o una falla mecánica. Si el usuario no tiene una copia de seguridad de los datos, solo puede esperar que la otra parte no finalice una solicitud de salida no válida utilizando transiciones de estado antiguas en su poder.

Los usuarios de Ethereum no tienen que lidiar con este problema, ya que la red hace cumplir reglas sobre la disponibilidad de datos. Los datos de las transacciones se almacenan y propagan en todos los nodos y están disponibles para que los usuarios los descarguen si y cuando sea necesario.

### Problemas de liquidez {#liquidity-issues}

Para establecer un canal de cadena de bloques, los participantes deben bloquear los fondos en un contrato inteligente en cadena para el ciclo de vida del canal. Esto reduce la liquidez de los usuarios del canal y también limita los canales a aquellos que pueden permitirse el lujo de mantener los fondos bloqueados en la red principal.

Sin embargo, los canales de libro mayor, operados por un proveedor de servicios fuera de la cadena (OSP), pueden reducir los problemas de liquidez para los usuarios. Dos pares conectados a un canal de libro mayor pueden crear un canal virtual, que pueden abrir y finalizar completamente fuera de la cadena, en cualquier momento.

Los proveedores de servicios fuera de la cadena también podrían abrir canales con múltiples pares, haciéndolos útiles para el enrutamiento de pagos. Por supuesto, los usuarios deben pagar tarifas a los OSP por sus servicios, lo que puede no ser deseable para algunos.

### Ataques de griefing {#griefing-attacks}

Los ataques de griefing son una característica común de los sistemas basados en pruebas de fraude. Un ataque de griefing no beneficia directamente al atacante, sino que causa daño a la víctima, de ahí el nombre en inglés (grief: daño, inconveniente).

Las pruebas de fraude son susceptibles a ataques de griefing porque la parte honesta debe responder a todas las disputas, incluso a las no válidas, o se arriesga a perder sus fondos. Un participante malicioso puede decidir publicar repetidamente transiciones de estado obsoleto en cadena, lo que obliga a la parte honesta a responder con el estado válido. El costo de esas transacciones en cadena puede aumentar rápidamente, lo que hace que las partes honestas pierdan en el proceso.

### Conjuntos de participantes predefinidos {#predefined-participant-sets}

Por diseño, el número de participantes que componen un canal de estado permanece fijo a lo largo de su vida útil. Esto se debe a que actualizar el conjunto de participantes complicaría el funcionamiento del canal, especialmente al financiar el canal o resolver disputas. Agregar o eliminar participantes también requeriría actividad adicional en la cadena, lo que aumenta los costos para los usuarios.

Si bien esto hace que sea más fácil razonar sobre los canales de estado, limita la utilidad de los diseños de canales para los desarrolladores de aplicaciones. Esto explica en parte por qué los canales de estado se han dejade de usar en favor de otras soluciones de escalado, como los rollups.

### Procesamiento de transacciones en paralelo {#parallel-transaction-processing}

Los participantes en el canal de estado envían actualizaciones de estado por turnos, por lo que funcionan mejor para las "aplicaciones basadas en turnos" (por ejemplo, un juego de ajedrez para dos jugadores). Esto elimina la necesidad de manejar actualizaciones de estado simultáneas y reduce el trabajo que el contrato en cadena debe hacer para castigar a quienes publican actualizaciones obsoletas. Sin embargo, un efecto secundario de este diseño es que las transacciones dependen entre sí, lo que aumenta la latencia y disminuye la experiencia general del usuario.

Algunos canales de estado resuelven este problema utilizando un diseño "full-duplex" que separa el estado fuera de la cadena en dos estados "simples" unidireccionales, lo que permite actualizaciones de estado simultáneas. Dichos diseños mejoran el rendimiento fuera de la cadena y disminuyen los retrasos en las transacciones.

## Uso de los canales de estado {#use-state-channels}

Múltiples proyectos proporcionan implementaciones de canales de estado que se pueden integrar en sus dApps:

- [Connext](https://connext.network/)
- [Kchannels](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Para seguir leyendo {#further-reading}

**Canales de estado**

- [Explicación de las soluciones de escalado de capa 2 de Ethereum: canales de estado, Plasma y Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– 12 de febrero de 2018, Josh Stark_
- [Explicación de los canales de estado](https://www.jeffcoleman.ca/state-channels/) _6 de noviembre de 2015, Jeff Coleman_
- [Aspectos básicos sobre los canales de estado](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_
- [Canales de estado de cadena de bloques: un estado avanzado](https://ieeexplore.ieee.org/document/9627997)

_¿Conoce algún recurso en la comunidad que le ayudara? ¡Edite la página y añádala!_
