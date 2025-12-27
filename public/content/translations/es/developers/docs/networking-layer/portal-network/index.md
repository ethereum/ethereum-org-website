---
title: Portal Network
description: "Una visión general de Portal Network, una red en desarrollo diseñada para apoyar a clientes de bajos recursos."
lang: es
---

Ethereum es una red de ordenadores que ejecutan el software cliente de Ethereum. A cada uno de estos ordenadores se le llama «nodo». El software de cliente permite que un nodo envíe y reciba datos en la red Ethereum y verifica los datos con respecto a las reglas del protocolo de Ethereum. Los nodos guardan una gran cantidad de datos históricos en su almacenamiento en disco y se suman cuando reciben nuevos paquetes de información, conocidos como bloques, de otros nodos de la red. Esto es necesario para comprobar siempre que un nodo tenga información consistente con el resto de la red. Esto significa que ejecutar un nodo puede requerir mucho espacio en el disco. Algunas operaciones de nodo también pueden requerir mucha RAM.

Para evitar este problema de almacenamiento en el disco, se han desarrollado nodos «ligeros» que solicitan información de los nodos completos, en lugar de almacenarlo todo ellos mismos. Sin embargo, esto significa que el nodo ligero no está verificando la información de forma independiente y, en su lugar, confía en otro nodo. También significa que los nodos completos tienen que realizar un trabajo adicional para servir a esos nodos ligeros.

Portal Network es un nuevo diseño de red para Ethereum que tiene como objetivo resolver el problema de disponibilidad de datos para los nodos «ligeros» sin tener que confiar o ejercer una presión adicional en los nodos completos, compartiendo los datos necesarios en pequeños trozos a través de la red.

Más información sobre [nodos y clientes](/developers/docs/nodes-and-clients/)

## ¿Por qué necesitamos la red Portal? {#why-do-we-need-portal-network}

Los nodos de Ethereum almacenan su propia copia total o parcial de la cadena de bloques de Ethereum. Esta copia local se utiliza para validar las transacciones y garantizar que el nodo siga la cadena correcta. Estos datos almacenados localmente permiten a los nodos verificar de forma independiente que los datos entrantes son válidos y correctos sin necesidad de confiar en ninguna otra entidad.

Esta copia local de la cadena de bloques y los datos de estado y recibo asociados ocupan mucho espacio en el disco duro del nodo. Por ejemplo, se recomienda un disco duro de 2 TB para ejecutar un nodo que use [Geth](https://geth.ethereum.org) emparejado con un cliente de consenso. Usando snap sync, que solo almacena datos de la cadena de un conjunto de bloques relativamente reciente, Geth normalmente ocupa alrededor de 650 Gb de espacio en disco, pero aumenta alrededor de 14 Gb/semana (puede reducir el nodo de nuevo a 650 Gb periódicamente).

Esto significa que ejecutar nodos puede ser caro, ya que se tiene que dedicar una gran cantidad de espacio en disco a Ethereum. Existen varias soluciones a este problema en la hoja de ruta de Ethereum, entre las que se incluyen la [caducidad del historial](/roadmap/statelessness/#history-expiry), la [caducidad del estado](/roadmap/statelessness/#state-expiry) y la [ausencia de estado](/roadmap/statelessness/). Sin embargo, es probable que su implementación aún tarde varios años. También existen [nodos ligeros](/developers/docs/nodes-and-clients/light-clients/) que no guardan su propia copia de los datos de la cadena, sino que solicitan los datos que necesitan a nodos completos. Sin embargo, esto significa que los nodos ligeros tienen que confiar en los nodos completos para proporcionar datos honestos, y también hace hincapié en los nodos completos que tienen que servir nodos ligeros a los datos que los necesiten.

Portal Network tiene como objetivo proporcionar una forma alternativa para que los nodos ligeros obtengan sus datos que no requieren confiar o agregar significativamente al trabajo que tienen que hacer los nodos completos. Esto se hace introduciendo una nueva forma para que los nodos de Ethereum compartan datos a través de la red.

## ¿Cómo funciona Portal Network? {#how-does-portal-network-work}

Los nodos de Ethereum tienen protocolos estrictos que definen cómo se comunican entre sí. Los clientes de ejecución se comunican utilizando un conjunto de subprotocolos conocidos como [DevP2P](/developers/docs/networking-layer/#devp2p), mientras que los clientes de consenso utilizan una pila diferente de subprotocolos llamada [libP2P](/developers/docs/networking-layer/#libp2p). Estos definen los tipos de datos que se pueden pasar entre nodos.

![devP2P y libP2P](portal-network-devp2p-libp2p.png)

Los nodos también pueden servir datos específicos a través de la [API de JSON-RPC](/developers/docs/apis/json-rpc/), que es la forma en que las aplicaciones y billeteras intercambian información con los nodos de Ethereum. Sin embargo, ninguno de estos son protocolos es idóneo para servir datos a los clientes ligeros.

Actualmente, los clientes ligeros no pueden solicitar datos específicos de la cadena a través de DevP2P o libP2p, porque esos protocolos solo están diseñados para permitir la sincronización de la cadena y el intercambio de bloques y transacciones. Los clientes ligeros no quieren descargar esta información porque eso les impediría ser «ligeros».

La API JSON-RPC tampoco es una opción ideal para solicitudes de datos de clientes ligeros, porque se basa en una conexión a un nodo completo específico o a un proveedor RPC centralizado que puede servir los datos. Esto significa que el cliente ligero tiene que confiar en que ese nodo/proveedor específico sea honesto, y también el nodo completo podría tener que manejar muchas solicitudes de muchos clientes ligeros, lo que se suma a sus requisitos de ancho de banda.

El objetivo de Portal Network es replantear todo el diseño, creado específicamente para la ligereza, fuera de las restricciones de diseño de los clientes existentes de Ethereum.

La idea central de la red Portal es tomar las mejores partes de la pila de redes actual, permitiendo que la información que necesitan los clientes ligeros, como los datos históricos y la identidad de la cabecera actual de la cadena, se sirva a través de una red descentralizada entre pares de estilo DevP2P ligera que utiliza una [DHT](https://en.wikipedia.org/wiki/Distributed_hash_table) (similar a Bittorrent).

La idea es añadir pequeñas partes del total de los datos históricos de Ethereum y algunas responsabilidades específicas de los nodos a cada nodo. Luego, las solicitudes se atienden buscando los nodos que almacenan los datos específicos que se solicitaron y recuperándolos de ellos.

Esto invierte el modelo normal de nodos ligeros que encuentran un solo nodo y les piden que filtren y sirvan grandes volúmenes de datos; en su lugar, filtran rápidamente una gran red de nodos. Cada uno de ellos maneja pequeñas cantidades de datos.

El objetivo es permitir que una red descentralizada de clientes ligeros del portal:

- rastree la cabeza de la cadena
- sincronice datos recientes e históricos de la cadena
- recupere los datos de estado
- transmita transacciones
- ejecutar transacciones utilizando la [EVM](/developers/docs/evm/)

Los beneficios de este diseño de red son:

- reducir la dependencia de los proveedores centralizados
- reducir el uso del ancho de banda de Internet
- sincronización minimizada o cero
- Accesible para dispositivos con recursos limitados (\<1 GB de RAM, \<100 MB de espacio en disco, 1 CPU)

La tabla siguiente muestra las funciones de los clientes existentes que puede ofrecer la red Portal, permitiendo a los usuarios acceder a estas funciones en dispositivos con muy pocos recursos.

### Las redes del portal

| Cliente ligero de baliza | Red de estado                   | Gossip de transacciones | Historial de la red |
| ------------------------ | ------------------------------- | ----------------------- | ------------------- |
| Cadena ligera de baliza  | Cuenta y contrato de almacenaje | Zona de espera ligera   | Encabezados         |
| Datos del protocolo      |                                 |                         | Cuerpos de bloque   |
|                          |                                 |                         | Recibos             |

## Diversidad de clientes por defecto {#client-diversity-as-default}

Los desarrolladores de la red Portal también tomaron la decisión de diseño de crear cuatro clientes de la red Portal separados desde el primer día.

Los clientes de Portal Network son:

- [Trin](https://github.com/ethereum/trin): escrito en Rust
- [Fluffy](https://fluffy.guide): escrito en Nim
- [Ultralight](https://github.com/ethereumjs/ultralight): escrito en Typescript
- [Shisui](https://github.com/zen-eth/shisui): escrito en Go

Tener múltiples implementaciones de clientes independientes mejora la resiliencia y la descentralización de la red Ethereum.

Si un cliente experimenta problemas o vulnerabilidades, otros clientes pueden seguir funcionando sin problemas, evitando un solo punto de fallo. Además, diversas implementaciones de clientes fomentan la innovación y la competencia, impulsando mejoras y reduciendo el riesgo de monocultivo dentro del ecosistema.

## Lecturas adicionales {#further-reading}

- [La red Portal (Piper Merriam en Devcon Bogotá)](https://www.youtube.com/watch?v=0stc9jnQLXA).
- [Discord de la red Portal](https://discord.gg/CFFnmE7Hbs)
- [Sitio web de la red Portal](https://www.ethportal.net/)
