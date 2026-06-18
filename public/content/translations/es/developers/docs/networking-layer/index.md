---
title: Capa de red
description: Una introducción a la capa de red de Ethereum.
lang: es
sidebarDepth: 2
---

[Ethereum](/) es una red entre pares con miles de nodos que deben poder comunicarse entre sí utilizando protocolos estandarizados. La "capa de red" es la pila de protocolos que permite a esos nodos encontrarse e intercambiar información. Esto incluye la difusión de información mediante el protocolo gossip (comunicación de uno a muchos) a través de la red, así como el intercambio de solicitudes y respuestas entre nodos específicos (comunicación de uno a uno). Cada nodo debe adherirse a reglas de red específicas para garantizar que envían y reciben la información correcta.

Hay dos partes en el software del cliente (clientes de ejecución y clientes de consenso), cada una con su propia pila de red distinta. Además de comunicarse con otros nodos de Ethereum, los clientes de ejecución y de consenso tienen que comunicarse entre sí. Esta página ofrece una explicación introductoria de los protocolos que permiten esta comunicación.

Los clientes de ejecución difunden transacciones mediante el protocolo gossip a través de la red entre pares de la capa de ejecución. Esto requiere comunicación cifrada entre pares autenticados. Cuando se selecciona un validador para proponer un bloque, las transacciones del pool de transacciones local del nodo se pasarán a los clientes de consenso a través de una conexión RPC local, que se empaquetarán en bloques baliza. Los clientes de consenso luego difundirán los bloques baliza mediante el protocolo gossip a través de su red entre pares. Esto requiere dos redes entre pares separadas: una que conecta a los clientes de ejecución para la difusión de transacciones y otra que conecta a los clientes de consenso para la difusión de bloques.

## Requisitos previos {#prerequisites}

Tener algo de conocimiento sobre los [nodos y clientes](/developers/docs/nodes-and-clients/) de Ethereum será útil para entender esta página.

## La capa de ejecución {#execution-layer}

Los protocolos de red de la capa de ejecución se dividen en dos pilas:

- la pila de descubrimiento: construida sobre UDP y permite a un nuevo nodo encontrar pares a los que conectarse

- la pila devp2p: se asienta sobre TCP y permite a los nodos intercambiar información

Ambas pilas funcionan en paralelo. La pila de descubrimiento introduce nuevos participantes en la red, y la pila devp2p permite sus interacciones.

### Descubrimiento {#discovery}

El descubrimiento es el proceso de encontrar otros nodos en la red. Esto se inicia utilizando un pequeño conjunto de nodos de arranque (nodos cuyas direcciones están [codificadas de forma rígida](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go) en el cliente para que puedan encontrarse inmediatamente y conectar el cliente a los pares). Estos nodos de arranque solo existen para presentar un nuevo nodo a un conjunto de pares; este es su único propósito, no participan en tareas normales del cliente como la sincronización de la cadena, y solo se utilizan la primera vez que se inicia un cliente.

El protocolo utilizado para las interacciones nodo-nodo de arranque es una forma modificada de [Kademlia](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f) que utiliza una [tabla hash distribuida](https://en.wikipedia.org/wiki/Distributed_hash_table) para compartir listas de nodos. Cada nodo tiene una versión de esta tabla que contiene la información requerida para conectarse a sus pares más cercanos. Esta 'cercanía' no es geográfica: la distancia se define por la similitud del ID del nodo. La tabla de cada nodo se actualiza regularmente como medida de seguridad. Por ejemplo, en [discv5](https://github.com/ethereum/devp2p/tree/master/discv5), los nodos del protocolo de descubrimiento también pueden enviar 'anuncios' que muestran los subprotocolos que admite el cliente, lo que permite a los pares negociar sobre los protocolos que ambos pueden usar para comunicarse.

El descubrimiento comienza con un juego de PING-PONG. Un PING-PONG exitoso "vincula" el nuevo nodo a un nodo de arranque. El mensaje inicial que alerta a un nodo de arranque sobre la existencia de un nuevo nodo que ingresa a la red es un `PING`. Este `PING` incluye información en formato hash sobre el nuevo nodo, el nodo de arranque y una marca de tiempo de caducidad. El nodo de arranque recibe el `PING` y devuelve un `PONG` que contiene el hash del `PING`. Si los hashes del `PING` y del `PONG` coinciden, entonces se verifica la conexión entre el nuevo nodo y el nodo de arranque y se dice que se han "vinculado".

Una vez vinculados, el nuevo nodo puede enviar una solicitud `FIND-NEIGHBOURS` al nodo de arranque. Los datos devueltos por el nodo de arranque incluyen una lista de pares a los que el nuevo nodo puede conectarse. Si los nodos no están vinculados, la solicitud `FIND-NEIGHBOURS` fallará, por lo que el nuevo nodo no podrá ingresar a la red.

Una vez que el nuevo nodo recibe una lista de vecinos del nodo de arranque, comienza un intercambio de PING-PONG con cada uno de ellos. Los PING-PONG exitosos vinculan el nuevo nodo con sus vecinos, permitiendo el intercambio de mensajes.

```
iniciar cliente --> conectar al nodo de arranque --> vincular al nodo de arranque --> encontrar vecinos --> vincular a los vecinos
```

Los clientes de ejecución utilizan actualmente el protocolo de descubrimiento [Discv4](https://github.com/ethereum/devp2p/blob/master/discv4.md) y hay un esfuerzo activo para migrar al protocolo [discv5](https://github.com/ethereum/devp2p/tree/master/discv5).

#### ENR: Registros de nodos de Ethereum {#enr}

El [Registro de nodo de Ethereum (ENR)](/developers/docs/networking-layer/network-addresses/) es un objeto que contiene tres elementos básicos: una firma (hash del contenido del registro realizado de acuerdo con algún esquema de identidad acordado), un número de secuencia que rastrea los cambios en el registro y una lista arbitraria de pares clave:valor. Este es un formato preparado para el futuro que permite un intercambio más fácil de información de identificación entre nuevos pares y es el formato de [dirección de red](/developers/docs/networking-layer/network-addresses) preferido para los nodos de Ethereum.

#### ¿Por qué el descubrimiento se basa en UDP? {#why-udp}

UDP no admite ninguna comprobación de errores, reenvío de paquetes fallidos ni apertura y cierre dinámicos de conexiones; en su lugar, simplemente dispara un flujo continuo de información a un objetivo, independientemente de si se recibe con éxito. Esta funcionalidad mínima también se traduce en una sobrecarga mínima, lo que hace que este tipo de conexión sea muy rápida. Para el descubrimiento, donde un nodo simplemente quiere dar a conocer su presencia para luego establecer una conexión formal con un par, UDP es suficiente. Sin embargo, para el resto de la pila de red, UDP no es adecuado. El intercambio de información entre nodos es bastante complejo y, por lo tanto, necesita un protocolo con más funciones que pueda admitir el reenvío, la comprobación de errores, etc. La sobrecarga adicional asociada con TCP vale la pena por la funcionalidad adicional. Por lo tanto, la mayor parte de la pila entre pares opera sobre TCP.

### devp2p {#devp2p}

devp2p es en sí mismo toda una pila de protocolos que Ethereum implementa para establecer y mantener la red entre pares. Después de que nuevos nodos ingresan a la red, sus interacciones se rigen por protocolos en la pila [devp2p](https://github.com/ethereum/devp2p). Todos estos se asientan sobre TCP e incluyen el protocolo de transporte RLPx, el protocolo de cable (wire protocol) y varios subprotocolos. [RLPx](https://github.com/ethereum/devp2p/blob/master/rlpx.md) es el protocolo que rige el inicio, la autenticación y el mantenimiento de sesiones entre nodos. RLPx codifica mensajes utilizando RLP (Prefijo de longitud recursiva), que es un método muy eficiente en cuanto a espacio para codificar datos en una estructura mínima para enviarlos entre nodos.

Una sesión RLPx entre dos nodos comienza con un apretón de manos criptográfico inicial. Esto implica que el nodo envíe un mensaje de autenticación que luego es verificado por el par. Tras una verificación exitosa, el par genera un mensaje de confirmación de autenticación para devolverlo al nodo iniciador. Este es un proceso de intercambio de claves que permite a los nodos comunicarse de forma privada y segura. Un apretón de manos criptográfico exitoso luego desencadena que ambos nodos se envíen un mensaje de "hola" entre sí "en el cable". El protocolo de cable se inicia mediante un intercambio exitoso de mensajes de hola.

Los mensajes de hola contienen:

- versión del protocolo
- ID del cliente
- puerto
- ID del nodo
- lista de subprotocolos compatibles

Esta es la información requerida para una interacción exitosa porque define qué capacidades se comparten entre ambos nodos y configura la comunicación. Hay un proceso de negociación de subprotocolos donde se comparan las listas de subprotocolos compatibles con cada nodo y aquellos que son comunes a ambos nodos se pueden usar en la sesión.

Junto con los mensajes de hola, el protocolo de cable también puede enviar un mensaje de "desconexión" que advierte a un par que la conexión se cerrará. El protocolo de cable también incluye mensajes PING y PONG que se envían periódicamente para mantener abierta una sesión. Por lo tanto, los intercambios de RLPx y del protocolo de cable establecen las bases de la comunicación entre los nodos, proporcionando el andamiaje para que se intercambie información útil de acuerdo con un subprotocolo específico.

### Subprotocolos {#sub-protocols}

#### Protocolo de cable {#wire-protocol}

Una vez que los pares están conectados y se ha iniciado una sesión RLPx, el protocolo de cable define cómo se comunican los pares. Inicialmente, el protocolo de cable definía tres tareas principales: sincronización de la cadena, propagación de bloques e intercambio de transacciones. Sin embargo, una vez que Ethereum cambió a la prueba de participación (PoS), la propagación de bloques y la sincronización de la cadena pasaron a formar parte de la capa de consenso. El intercambio de transacciones sigue siendo competencia de los clientes de ejecución. El intercambio de transacciones se refiere al intercambio de transacciones pendientes entre nodos para que los constructores de bloques puedan seleccionar algunas de ellas para su inclusión en el siguiente bloque. Hay información detallada sobre estas tareas disponible [aquí](https://github.com/ethereum/devp2p/blob/master/caps/eth.md). Los clientes que admiten estos subprotocolos los exponen a través de la [JSON-RPC](/developers/docs/apis/json-rpc/).

#### les (subprotocolo ligero de Ethereum) {#les}

Este es un protocolo mínimo para la sincronización de clientes ligeros. Tradicionalmente, este protocolo rara vez se ha utilizado porque se requiere que los nodos completos sirvan datos a los clientes ligeros sin recibir incentivos. El comportamiento predeterminado de los clientes de ejecución es no servir datos de clientes ligeros a través de les. Hay más información disponible en la [especificación](https://github.com/ethereum/devp2p/blob/master/caps/les.md) de les.

#### Snap {#snap}

El [protocolo snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md#ethereum-snapshot-protocol-snap) es una extensión opcional que permite a los pares intercambiar instantáneas de estados recientes, lo que permite a los pares verificar los datos de la cuenta y del almacenamiento sin tener que descargar nodos intermedios del trie de Merkle.

#### Wit (protocolo de testigos) {#wit}

El [protocolo de testigos](https://github.com/ethereum/devp2p/blob/master/caps/wit.md#ethereum-witness-protocol-wit) es una extensión opcional que permite el intercambio de testigos de estado entre pares, ayudando a la sincronización de los clientes con la punta de la cadena.

#### Whisper {#whisper}

Whisper era un protocolo que tenía como objetivo ofrecer mensajería segura entre pares sin escribir ninguna información en la cadena de bloques. Formaba parte del protocolo de cable devp2p, pero ahora está obsoleto. Existen otros [proyectos relacionados](https://wakunetwork.com/) con objetivos similares.

## La capa de consenso {#consensus-layer}

Los clientes de consenso participan en una red entre pares separada con una especificación diferente. Los clientes de consenso necesitan participar en el protocolo gossip de bloques para poder recibir nuevos bloques de los pares y transmitirlos cuando sea su turno de ser el proponente de bloque. De manera similar a la capa de ejecución, esto requiere primero un protocolo de descubrimiento para que un nodo pueda encontrar pares y establecer sesiones seguras para intercambiar bloques, atestaciones, etc.

### Descubrimiento {#consensus-discovery}

De manera similar a los clientes de ejecución, los clientes de consenso utilizan [discv5](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#the-discovery-domain-discv5) sobre UDP para encontrar pares. La implementación de la capa de consenso de discv5 difiere de la de los clientes de ejecución solo en que incluye un adaptador que conecta discv5 a una pila [libp2p](https://libp2p.io/), dejando obsoleto a devp2p. Las sesiones RLPx de la capa de ejecución están obsoletas en favor del apretón de manos de canal seguro noise de libp2p.

### ENR {#consensus-enr}

El ENR para los nodos de consenso incluye la clave pública del nodo, la dirección IP, los puertos UDP y TCP y dos campos específicos del consenso: el campo de bits de la subred de atestación y la clave `eth2`. El primero facilita que los nodos encuentren pares que participan en subredes específicas del protocolo gossip de atestación. La clave `eth2` contiene información sobre qué versión de la bifurcación de Ethereum está utilizando el nodo, asegurando que los pares se conecten al Ethereum correcto.

### libp2p {#libp2p}

La pila libp2p admite todas las comunicaciones después del descubrimiento. Los clientes pueden marcar y escuchar en IPv4 y/o IPv6 según lo definido en su ENR. Los protocolos en la capa libp2p se pueden subdividir en los dominios gossip y req/resp (solicitud/respuesta).

### Gossip {#gossip}

El dominio gossip incluye toda la información que tiene que propagarse rápidamente por toda la red. Esto incluye bloques baliza, pruebas, atestaciones, salidas y recortes (slashings). Esto se transmite utilizando gossipsub v1 de libp2p y depende de que se almacenen varios metadatos localmente en cada nodo, incluido el tamaño máximo de las cargas útiles de gossip para recibir y transmitir. Hay información detallada sobre el dominio gossip disponible [aquí](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#the-gossip-domain-gossipsub).

### Solicitud-respuesta {#request-response}

El dominio de solicitud-respuesta contiene protocolos para que los clientes soliciten información específica a sus pares. Los ejemplos incluyen solicitar bloques baliza específicos que coincidan con ciertos hashes raíz o dentro de un rango de ranuras (slots). Las respuestas siempre se devuelden como bytes codificados en SSZ y comprimidos con snappy.

## ¿Por qué el cliente de consenso prefiere SSZ a RLP? {#ssz-vs-rlp}

SSZ significa serialización simple. Utiliza desplazamientos fijos que facilitan la decodificación de partes individuales de un mensaje codificado sin tener que decodificar toda la estructura, lo cual es muy útil para el cliente de consenso, ya que puede obtener de manera eficiente piezas específicas de información de los mensajes codificados. También está diseñado específicamente para integrarse con los protocolos de Merkle, con las consiguientes ganancias de eficiencia para la merkleización. Dado que todos los hashes en la capa de consenso son raíces de Merkle, esto se suma a una mejora significativa. SSZ también garantiza representaciones únicas de valores.

## Conexión de los clientes de ejecución y de consenso {#connecting-clients}

Tanto los clientes de consenso como los de ejecución se ejecutan en paralelo. Necesitan estar conectados para que el cliente de consenso pueda proporcionar instrucciones al cliente de ejecución, y el cliente de ejecución pueda pasar paquetes de transacciones al cliente de consenso para incluirlos en los bloques baliza. La comunicación entre los dos clientes se puede lograr utilizando una conexión RPC local. Una API conocida como la ['Engine-API'](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) define las instrucciones enviadas entre los dos clientes. Dado que ambos clientes se encuentran detrás de una única identidad de red, comparten un ENR (Registro de nodo de Ethereum) que contiene una clave separada para cada cliente (clave Eth1 y clave Eth2).

Un resumen del flujo de control se muestra a continuación, con la pila de red relevante entre paréntesis.

### Cuando el cliente de consenso no es el productor de bloques: {#when-consensus-client-is-not-block-producer}

- El cliente de consenso recibe un bloque a través del protocolo gossip de bloques (p2p de consenso)
- El cliente de consenso prevalida el bloque, es decir, se asegura de que llegó de un remitente válido con los metadatos correctos
- Las transacciones en el bloque se envían a la capa de ejecución como una carga útil de ejecución (conexión RPC local)
- La capa de ejecución ejecuta las transacciones y valida el estado en el encabezado del bloque (es decir, comprueba que los hashes coincidan)
- La capa de ejecución devuelve los datos de validación a la capa de consenso, el bloque ahora se considera validado (conexión RPC local)
- La capa de consenso agrega el bloque a la cabeza de su propia cadena de bloques y lo atestigua, transmitiendo la atestación a través de la red (p2p de consenso)

### Cuando el cliente de consenso es el productor de bloques: {#when-consensus-client-is-block-producer}

- El cliente de consenso recibe un aviso de que es el próximo productor de bloques (p2p de consenso)
- La capa de consenso llama al método `create block` en el cliente de ejecución (RPC local)
- La capa de ejecución accede a la mempool de transacciones que ha sido poblada por el protocolo gossip de transacciones (p2p de ejecución)
- El cliente de ejecución agrupa las transacciones en un bloque, ejecuta las transacciones y genera un hash de bloque
- El cliente de consenso toma las transacciones y el hash del bloque del cliente de ejecución y los agrega al bloque baliza (RPC local)
- El cliente de consenso transmite el bloque a través del protocolo gossip de bloques (p2p de consenso)
- Otros clientes reciben el bloque propuesto a través del protocolo gossip de bloques y lo validan como se describió anteriormente (p2p de consenso)

Una vez que el bloque ha sido atestiguado por suficientes validadores, se agrega a la cabeza de la cadena, se marca como justificado y, finalmente, como finalizado.

![Diagram of the Ethereum consensus client networking layer](cons_client_net_layer.png)
![Diagram of the Ethereum execution client networking layer](exe_client_net_layer.png)

Esquema de la capa de red para los clientes de consenso y de ejecución, de [ethresear.ch](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)

## Más información {#further-reading}

[devp2p](https://github.com/ethereum/devp2p)
[libp2p](https://github.com/libp2p/specs)
[Especificaciones de red de la capa de consenso](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#enr-structure)
[De Kademlia a discv5](https://vac.dev/kademlia-to-discv5)
[Documento de Kademlia](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf)
[Introducción al p2p de Ethereum](https://p2p.paris/en/talks/intro-ethereum-networking/)
[Relación entre Eth1 y Eth2](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)
[Video sobre los detalles del cliente de La Fusión y Eth2](https://www.youtube.com/watch?v=zNIrIninMgg)