---
title: "Ninguna llave\nBloque el texto del elemento (div)\nXpath: /div[@id=front-matter]/ul/li[1]/div[2]"
description: Introducción a la capa de red de Ethereum.
lang: es
sidebarDepth: 2
---

Ethereum es una red de pares, o peer-to-peer, con miles de nodos que deben poder comunicarse entre sí utilizando protocolos estandarizados. La "capa de red" es la serie de protocolos que permiten que esos nodos se encuentren entre sí e intercambien información. Esto incluye el "gossiping" (comunicación uno a muchos) en la red, así como el intercambio de peticiones y respuestas entre nodos específicos (comunicación uno a uno). Cada nodo debe cumplir reglas específicas de red para asegurarse de enviar y recibir la información correcta.

Hay dos partes en el software cliente (cliente de ejecución y cliente de consenso), cada una con su propia pila de red. Además de comunicarse con otros nodos de Ethereum, los clientes de ejecución y de consenso tienen que comunicarse entre sí. Esta página ofrece una explicación introductoria de los protocolos que permiten esta comunicación.

Los clientes de ejecución gossipean transacciones sobre la red peer-to-peer de capa de ejecución. Esto requiere una comunicación encriptada entre pares autenticados. Cuando un validador es elegido para proponer un bloque, las transacciones del pool de transacciones local del nodo serán enviadas a los clientes de consenso a través de una conexión RPC local, que se empaquetará en bloques Beacon. Los clientes de consenso luego gossipearán bloques Beacon a través de su red p2p. Esto requiere dos redes p2p separadas: una que conecta clientes de ejecución para el gossiping de transacciones y otra que conecta clientes de consenso para el gossiping de bloques.

## Requisitos previos {#prerequisites}

Tener algún conocimiento sobre [nodos y clientes](/developers/docs/nodes-and-clients/) de Ethereum será útil para entender esta página.

## Capa de ejecución {#execution-layer}

Los protocolos de red de la capa de ejecución se dividen en dos pilas:

- la pila de descubrimiento: construida sobre UDP, permite que un nuevo nodo encuentre pares a los que conectarse

- la pila DevP2P: se asienta sobre TCP y permite a los nodos intercambiar información

Ambas pilas funcionan en paralelo. La pila de descubrimiento alimenta nuevos participantes en la red, y la pila DevP2P permite sus interacciones.

### Descubrimiento {#discovery}

El descubrimiento es el proceso de encontrar otros nodos en la red. Esto se inicia utilizando un pequeño conjunto de nodos de arranque o bootnodes (nodos cuyas direcciones están [incrustadas](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go) en el cliente para que se puedan encontrar inmediatamente y conectar el cliente a los pares). Estos nodos de arranque solo existen para presentar un nuevo nodo a un conjunto de pares: este es su único propósito, no participan en tareas normales del cliente, como la sincronización de la cadena, y solo se utilizan la primera vez que se activa un cliente.

El protocolo utilizado para las interacciones nodo-nodo de arranque es una forma modificada de [Kademlia](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f), que utiliza una [tabla de hash distribuida](https://en.wikipedia.org/wiki/Distributed_hash_table) para compartir listas de nodos. Cada nodo tiene una versión de esta tabla que contiene la información necesaria para conectarse a sus pares más cercanos. Esta "cercanía" no es geográfica; la distancia se define por la similitud del ID del nodo. La tabla de cada nodo se actualiza regularmente como una función de seguridad. Por ejemplo, en el [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5), los nodos del protocolo de descubrimiento también pueden enviar "anuncios" que muestran los subprotocolos que el cliente admite, lo que permite a los pares negociar sobre los protocolos que ambos pueden usar para comunicarse.

El descubrimiento comienza con un juego de PING-PONG. Un PING-PONG exitoso "vincula" el nuevo nodo a un nodo de arranque. El mensaje inicial que alerta a un nodo de arranque de la existencia de un nuevo nodo que entra en la red es un `PING`. Este `PING` incluye información con hash sobre el nuevo nodo, el nodo de arranque y una marca de tiempo de caducidad. El nodo de arranque recibe el `PING` y devuelve un `PONG` que contiene el hash `PING`. Si los hashes `PING` y `PONG` coinciden, entonces se verifica la conexión entre el nuevo nodo y el nodo de arranque, y se dice que están "vinculados".

Una vez unidos, el nuevo nodo puede enviar una solicitud `FIND-NEIGHBOURS` al nodo de arranque. Los datos devueltos por el nodo de arranque incluyen una lista de pares a los que el nuevo nodo puede conectarse. Si los nodos no se vinculan, la solicitud `FIND-NEIGHBOURS` fallará, por lo que el nuevo nodo no podrá entrar en la red.

Una vez que el nuevo nodo recibe una lista de vecinos del nodo de arranque, comienza un intercambio PING-PONG con cada uno de ellos. Los PING-PONG exitosos vinculan el nuevo nodo con sus vecinos, lo que permite el intercambio de mensajes.

```
start client --> connect to bootnode --> bond to bootnode --> find neighbours --> bond to neighbours
```

Los clientes de ejecución están utilizando actualmente el protocolo de descubrimiento [Discv4](https://github.com/ethereum/devp2p/blob/master/discv4.md), y hay una iniciativa activa para migrar al protocolo [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5).

#### ENR: Registros de nodos de Ethereum {#enr}

El [Registro de nodos de Ethereum (ENR)](/developers/docs/networking-layer/network-addresses/) es un objeto que contiene tres elementos básicos: una firma (hash del contenido del registro hecho de acuerdo con algún esquema de identidad acordado), un número de secuencia que rastrea los cambios en el registro y una lista arbitraria de pares clave:valor. Este es un formato a prueba de futuro que permite un intercambio más fácil de información de identificación entre nuevos pares y es el formato preferido de [dirección de red](/developers/docs/networking-layer/network-addresses) para los nodos de Ethereum.

#### ¿Por qué el descubrimiento se basa en UDP? {#why-udp}

UDP no admite ninguna comprobación de errores, el reenvío de paquetes fallidos ni la apertura y cierre dinámicos de conexiones; en su lugar, solo dispara un flujo continuo de información a un objetivo, independientemente de si se recibe con éxito. Esta funcionalidad mínima también se traduce en una sobrecarga mínima, lo que hace que este tipo de conexión sea muy rápida. Para el descubrimiento, donde un nodo simplemente quiere dar a conocer su presencia para luego establecer una conexión formal con un par, UDP es suficiente. Sin embargo, para el resto de la pila de redes, UDP no es apto para el propósito. El intercambio de información entre los nodos es bastante complejo y, por lo tanto, necesita un protocolo más completo que pueda admitir el reenvío, la comprobación de errores, etc. La sobrecarga adicional asociada con TCP hace da valor a la funcionalidad adicional o hace que tenga sentido. Por lo tanto, la mayoría de la pila P2P opera a través de TCP.

### DevP2P {#devp2p}

DevP2P es en sí mismo toda una pila de protocolos que Ethereum implementa para establecer y mantener la red entre pares. Después de que nuevos nodos entran en la red, sus interacciones se rigen por protocolos de la pila [DevP2P](https://github.com/ethereum/devp2p). Todos estos se basan en TCP e incluyen el protocolo de transporte RLPx, el protocolo de cable y varios subprotocolos. [RLPx](https://github.com/ethereum/devp2p/blob/master/rlpx.md) es el protocolo que rige el inicio, la autenticación y el mantenimiento de sesiones entre nodos. RLPx codifica los mensajes utilizando RLP (Prefijo de Longitud Recursiva), que es un método muy eficiente en el uso de espacio para codificar los datos en una estructura mínima para el envío entre nodos.

Una sesión RLPx entre dos nodos comienza con un apretón de manos criptográfico inicial. Esto implica que el nodo envíe un mensaje de autenticación, que luego es verificado por el par. Una vez que la verificación es exitosa, el par genera un mensaje de confirmación de autenticación para mostrar al nodo iniciador. Este es un proceso de intercambio de claves que permite a los nodos comunicarse de forma privada y segura. Un apretón de manos criptográfico exitoso hace que ambos nodos envíen un mensaje de "hola" el uno al otro "en el cable". El protocolo de cable se inicia mediante un intercambio exitoso de mensajes de saludo.

Los mensajes de saludo contienen:

- versión del protocolo
- ID del cliente
- puerto
- ID del nodo
- lista de subprotocolos compatibles

Esta es la información necesaria para una interacción exitosa porque define qué capacidades se comparten entre ambos nodos y configura la comunicación. Hay un proceso de negociación de subprotocolos en el que se comparan las listas de subprotocolos compatibles con cada nodo y los que son comunes a ambos nodos se pueden utilizar en la sesión.

Junto con los mensajes de saludo, el protocolo de cable también puede enviar un mensaje de "desconexión" que avisa a un par que la conexión se cerrará. El protocolo de cable también incluye mensajes PING y PONG que se envían periódicamente para mantener una sesión abierta. Por lo tanto, los intercambios entre RLPx y el protocolo de cable establecen los cimientos de la comunicación entre los nodos, proporcionando el andamiaje para que se intercambie información útil de acuerdo con un subprotocolo específico.

### Subprotocolos {#sub-protocols}

#### Protocolo de cable {#wire-protocol}

Una vez que los pares están conectados y se ha iniciado una sesión RLPx, el protocolo de cable define cómo se comunican los pares. Inicialmente, el protocolo de cable definía tres tareas principales: sincronización de la cadena, propagación de bloques e intercambio de transacciones. Sin embargo, una vez que Ethereum cambió a la prueba de participación, la propagación de bloques y la sincronización de cadenas se convirtieron en parte de la capa de consenso. El intercambio de transacciones todavía está en el ámbito de los clientes de ejecución. El intercambio de transacciones se refiere al intercambio de transacciones pendientes entre nodos para que los constructores de bloques puedan seleccionar algunas de ellas para su inclusión en el siguiente bloque. Hay información detallada sobre estas tareas [aquí](https://github.com/ethereum/devp2p/blob/master/caps/eth.md). Los clientes que admiten estos subprotocolos los exponen a través del [JSON-RPC](/developers/docs/apis/json-rpc/).

#### les (subprotocolo ligero de ethereum) {#les}

Este es un protocolo mínimo para sincronizar clientes ligeros. Tradicionalmente, este protocolo rara vez se ha utilizado porque los nodos completos deben servir datos a los clientes ligeros sin ser incentivados. El comportamiento predeterminado de los clientes de ejecución no es servir datos de clientes ligeros sobre les. Hay más información disponible en la [especificación de Ies](https://github.com/ethereum/devp2p/blob/master/caps/les.md).

#### Snap {#snap}

El [protocolo snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md#ethereum-snapshot-protocol-snap) es una extensión opcional que permite a los pares intercambiar instantáneas de estados recientes, lo que les permite verificar los datos de la cuenta y el almacenamiento sin tener que descargar nodos intermedios de Merkle trie.

#### Wit (protocolo testigo) {#wit}

El [protocolo testigo](https://github.com/ethereum/devp2p/blob/master/caps/wit.md#ethereum-witness-protocol-wit) es una extensión opcional que permite el intercambio de testigos de estado entre pares, ayudando a sincronizar los clientes con la punta de la cadena.

#### Whisper {#whisper}

Whisper era un protocolo que tenía como objetivo ofrecer mensajes seguros entre pares sin escribir ninguna información en la cadena de bloques. Era parte del protocolo de cable DevP2P, pero ahora está obsoleto. Existen otros [proyectos relacionados](https://wakunetwork.com/) con objetivos similares.

## La capa de consenso {#consensus-layer}

Los clientes de consenso participan en una red separada entre pares con una especificación diferente. Los clientes de consenso necesitan participar en el gossiping de bloques para que puedan recibir nuevos bloques de sus pares y transmitirlos cuando sea su turno de proponer bloques. Como sucede con la capa de ejecución, esto primero requiere un protocolo de descubrimiento para que un nodo pueda encontrar pares y establecer sesiones seguras para intercambiar bloques, atestaciones, etc.

### Descubrimiento {#consensus-discovery}

Al igual que los clientes de ejecución, los clientes de consenso usan [discv5](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#the-discovery-domain-discv5) sobre UDP para encontrar pares. La implementación de la capa de consenso de discv5 difiere de la de los clientes de ejecución solo en que incluye un adaptador que conecta el discov5 a una pila [libP2P](https://libp2p.io/), dejando obsoleto DevP2P. Las sesiones RLPx de la capa de ejecución están obsoletas en favor del apretón de manos del canal seguro de ruido de libP2P.

### ENR {#consensus-enr}

El registro de nodos de Ethereum (ENR) de los nodos de consenso incluye la clave pública del nodo, la dirección IP, los puertos UDP y TCP y dos campos específicos de consenso: el bitfield de la subred de certificación y la clave `eth2`. El primero hace que sea más fácil para los nodos encontrar pares que participen en subredes de gossiping de certificación específicas. La clave `eth2` contiene información sobre qué versión de bifurcación de Ethereum está usando el nodo, lo que garantiza que los pares se conecten al Ethereum correcto.

### libP2P {#libp2p}

La pila libP2P admite todas las comunicaciones después del descubrimiento. Los clientes pueden marcar y escuchar en IPv4 y/o IPv6 como se define en su ENR. Los protocolos de la capa libP2P se pueden subdividir en los dominios gossip y req/resp.

### Gossip {#gossip}

El dominio de gossip incluye toda la información que tiene que difundirse rápidamente por toda la red. Esto incluye bloques de baliza (beacon), pruebas, certificaciones, salidas y salidas forzadas (slashings). Esto se transmite utilizando libP2P gossipsub v1 y se basa en varios metadatos que se almacenan localmente en cada nodo, incluido el tamaño máximo de las cargas útiles de gossip para recibir y transmitir. La información detallada sobre el dominio de gossip está disponible [aquí](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#the-gossip-domain-gossipsub).

### Solicitud-respuesta {#request-response}

El dominio de solicitud-respuesta (request-response) contiene protocolos para los clientes que solicitan información específica de sus pares. Algunos ejemplos incluyen solicitar a bloques de baliza específicos que coincidan con ciertos hashes raíz o dentro de un rango de ranuras. Las respuestas siempre se devuelven como bytes codificados SSZ con compresión rápida.

## ¿Por qué el cliente de consenso prefiere SSZ en lugar de RLP? {#ssz-vs-rlp}

SSZ significa serialización simple. Utiliza desplazamientos fijos que facilitan la decodificación de partes individuales de un mensaje codificado sin tener que decodificar toda la estructura, lo que es muy útil para el cliente de consenso, ya que puede extraer de manera eficiente partes específicas de información de los mensajes codificados. También está diseñado específicamente para integrarse con los protocolos de Merkle, con ventajas de eficiencia relacionadas para la Merkleización. Dado que todos los hashes en la capa de consenso son raíces de Merkle, esto contribuye a la mejora significativa. SSZ también garantiza representaciones únicas de valores.

## Conexión de los clientes de ejecución y de consenso {#connecting-clients}

Tanto los clientes de consenso como los de ejecución se ejecutan en paralelo. Necesitan estar conectados para que el cliente de consenso pueda proporcionar instrucciones al cliente de ejecución, y el cliente de ejecución pueda pasar paquetes de transacciones al cliente de consenso para incluirlos en los bloques de Baliza. La comunicación entre los dos clientes se puede lograr utilizando una conexión local de RPC. Una API conocida como [Engine-API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) define las instrucciones enviadas entre los dos clientes. Dado que ambos clientes están detrás de una sola identidad de red, comparten un ENR (registro de nodos de Ethereum) que contiene una clave separada para cada cliente (clave eth1 y clave eth2).

A continuación se muestra un resumen del flujo de control, con la pila de red relevante entre paréntesis.

### Cuando el cliente de consenso no es productor de bloques: {#when-consensus-client-is-not-block-producer}

- El cliente de consenso recibe un bloque a través del protocolo de gossiping de bloques (p2p de consenso)
- El cliente de consenso valida previamente el bloque, es decir, se asegura de que llegue de un remitente válido con los metadatos correctos
- Las transacciones en el bloque se envían a la capa de ejecución como una carga útil de ejecución (conexión local de RPC)
- La capa de ejecución ejecuta las transacciones y valida el estado en el encabezado del bloque (es decir, comprueba la coincidencia de los hashes)
- La capa de ejecución pasa los datos de validación a la capa de consenso, bloque que ahora se considera validado (conexión local RPC)
- La capa de consenso añade un bloque a la cabeza de su propia cadena de bloques y hace una verificación, transmitiendo la verificación en la red (p2p de consenso)

### Cuando el cliente de consenso es productor de bloques: {#when-consensus-client-is-block-producer}

- El cliente de consenso recibe un aviso de que es el próximo productor de bloques (p2p de consenso)
- La capa de consenso invoca el método `create block` en el cliente de ejecución (RPC local)
- La capa de ejecución accede a la zona de espera (mempool) completada por el protocolo de gossiping de la transacción (p2p de ejecución)
- El cliente de ejecución agrupa las transacciones en un bloque, ejecuta las transacciones y genera un hash de bloques
- El cliente de consenso agarra las transacciones y el hash de bloques del cliente de ejecución y los agrega al bloque de baliza (RPC local)
- El cliente de consenso transmite el bloque a través del protocolo de gossiping de bloque (p2p de consenso)
- Otros clientes reciben el bloque propuesto a través del protocolo de gossiping de bloque y lo validan como se describió anteriormente (p2p de consenso)

Una vez que el bloque ha sido certificado por suficientes validadores, se añade a la cabeza de la cadena, se justifica y finalmente se finaliza.

![](cons_client_net_layer.png) ![](exe_client_net_layer.png)

Esquema de capa de red para clientes de consenso y ejecución, de [ethresear.ch](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)

## Más información {#further-reading}

[DevP2P](https://github.com/ethereum/devp2p) [LibP2p](https://github.com/libp2p/specs) [Especificaciones de red de capa de consenso](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#enr-structure) [kademlia a discv5](https://vac.dev/kademlia-to-discv5) [kademlia paper](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf) [Introducción a Ethereum p2p](https://p2p.paris/en/talks/intro-ethereum-networking/) [Relación eth1/eth2](http://ethresear.ch/t/eth1-eth2-client-relationship/7248) [Video con detalles sobre La fusión y el cliente eth2](https://www.youtube.com/watch?v=zNIrIninMgg)
